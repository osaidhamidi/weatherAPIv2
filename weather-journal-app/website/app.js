// Personal API Key for OpenWeatherMap API
const key = '5b6ffda1d9089463f1851a105965a0f0&units=imperial'; 
const url = 'https://api.openweathermap.org/data/2.5/weather?zip=';

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

// Date
const d = new Date();

// +1 because for some reason i get the month -1 
const newDate =  (d.getMonth() + 1) + '.' + d.getDate() + '.' + d.getFullYear();

/* Function called by event listener */
function performAction(event) {

    const zip = document.getElementById('zip').value;

    const feel = document.getElementById('feelings').value;

    getData(zip)
        .then( function (data) {

            return postData('/add', { tempert: data.main.temp, 
                date: newDate,
                feel: feel 
            });
        })
        .then(function () { retrieveData() })

        .catch(function(error){ console.log('Error:', error);});
}

/* Function to GET Web API Data*/
const getData = async (zip) => {

    const response = await fetch(url+zip+',us&appid='+key);
    try {

        const data = await response.json();

        return data;

    } catch(error) {

        console.log('error', error);
    }
}

/* Function to POST data */
const postData = async (url = '', data = {}) => {

    const response = await fetch(url, {

        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await response.json();

        return newData;

    } catch(error) {

        console.log('error', error);

    }
}

/* Function to GET Project Data */
const retrieveData = async () => {

    const request = await fetch('/all');
    try {

        const allData = await request.json();
        console.log(allData)
        document.getElementById('temp').innerHTML = Math.round(allData.tempert)+ 'degrees';
        document.getElementById('content').innerHTML = allData.feel; 
        document.getElementById('date').innerHTML =allData.date;
    } catch(error) {
        console.log('error', error);
    }
}