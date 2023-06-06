'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

// navigator takes two functions. forst for when getting coordinate is done, anothe one for fail
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      // console.log(position);

      // Bouth these lines are the same
      const latiude = position.coords.latitude;
      const { longitude } = position.coords;

      const coords = [latiude, longitude];

      const map = L.map('map').setView(coords, 13); // 13 => zoom

      // You can change it by finding new open street tiles theme
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // L.marker(coords)
      //   .addTo(map)
      //   .bindPopup('A pretty CSS popup.<br> Easily customizable.')
      //   .openPopup();

      // Use map.on instead of addEventListener
      map.on('click', function (mapEvent) {
        const { lat, lng } = mapEvent.latlng;

        L.marker([lat, lng])
          .addTo(map)
          .bindPopup(
            L.popup({
              maxWidth: 250,
              minWidt: 100,
              autoClose: false,
              closeOnClick: false,
              className: 'running-popup',
            })
          )
          .openPopup();
      });
    },
    function () {
      alert('Could not get your position');
    }
  );
}
