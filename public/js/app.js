console.log('client (public) app.js loaded')

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const msgOne = document.querySelector('#msg-one');
const msgTwo = document.querySelector('#msg-two');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;

    msgOne.textContent = 'Loading..';
    msgTwo.textContent = '';

    fetch(`/weather?address=${location}`)
        .then((response) => {
            response.json()
            .then(({error, location, forecast} = {}) => {
                if (error) {
                    msgTwo.textContent = '';    
                return msgOne.textContent = error;
                } 
                msgOne.textContent = location;
                msgTwo.textContent = forecast;
            })
        })
})
