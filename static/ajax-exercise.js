'use strict';

// PART 1: SHOW A FORTUNE

function showFortune(evt) {
  // TODO: get the fortune and show it in the #fortune-text div
fetch('/fortune')
  .then((response) => response.text())
  .then((serverData) => {
    document.querySelector('#fortune-text').innerText = serverData;
  })
}

document.querySelector('#get-fortune-button').addEventListener('click', showFortune);

// PART 2: SHOW WEATHER

function showWeather(evt) {
  evt.preventDefault();

  const url = '/weather.json';
  const zipcode = document.querySelector('#zipcode-field').value;

  fetch(`/weather.json?zipcode=${zipcode}`)
    .then((response) => response.json())
    .then((responseJSON) => {
      // console.log(zipcode)
      // console.log(responseJSON)
      document.querySelector('#weather-info').innerHTML = responseJSON.forecast;
    });
  // TODO: request weather with that URL and show the forecast in #weather-info
}
document.querySelector('#weather-form').addEventListener('submit', showWeather);

// PART 3: ORDER MELONS

function orderMelons(evt) {
  evt.preventDefault();
  const formInputs ={
    melon_type: document.querySelector('#melon-type-field').value,
    qty: document.querySelector('#qty-field').value
  };
  
  fetch('/order-melons.json', {
    method: 'POST',
    body: JSON.stringify(formInputs),
    headers: {
      'Content-Type': 'application/json'
    },
  })
    .then((response) => response.json())
    .then((responseJSON) => {
      console.log(responseJSON)
      if (responseJSON.code == "ERROR") {
        document.querySelector('#order-status').classList.add('order-error')
      } else {
        document.querySelector('#order-status').classList.remove('order-error')
      }
      document.querySelector('#order-status').innerText = responseJSON.msg
    })
    
  // TODO: show the result message after your form
  // TODO: if the result code is ERROR, make it show up in red (see our CSS!)
}
document.querySelector('#order-form').addEventListener('submit', orderMelons);
