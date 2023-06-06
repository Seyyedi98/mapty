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

class App {
  #map;
  #mapEvent;

  constructor() {
    // These line run automaticly when class called
    this._getPosition();
    form.addEventListener('submit', this._newWorkout.bind(this)); // newWorkout this. key is pointing to dom element that attached (form), not the app. So we need to fix it
    inputType.addEventListener('change', this._toggleElevationField);
  }

  _getPosition() {
    // navigator takes two functions. forst for when getting coordinate is done, anothe one for fail
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this), //explained in S15E10 12:30
        function () {
          alert('Could not get your position');
        }
      );
  }

  _loadMap(position) {
    // Both these lines are the same
    const latiude = position.coords.latitude;
    const { longitude } = position.coords;
    const coords = [latiude, longitude];

    // loadMap is called by getCurrentPosition as a function not a method, and this. keyword is undefined in function. so we must manualy bind it.
    this.#map = L.map('map').setView(coords, 13); // 13 => zoom

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    // Handling clicks on map, we use map.on instead of addEventListener
    this.#map.on('click', this._showForm.bind(this)); // we attached event handler to map, so lets fix it. because #mapEvent does not work
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  _toggleElevationField() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _newWorkout(e) {
    e.preventDefault();

    // Clear input fields
    inputCadence.value =
      inputDistance.value =
      inputDuration.value =
      inputElevation.value =
        '';

    // Displat the marker
    const { lat, lng } = this.#mapEvent.latlng;
    L.marker([lat, lng])
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidt: 100,
          autoClose: false,
          closeOnClick: false,
          className: 'running-popup',
        })
      )
      .setPopupContent('Workout')
      .openPopup();
  }
}

const app = new App();
