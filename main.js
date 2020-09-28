//To work on:
// - MOVIE: set img to left side and text to right side when on desktop view
// - MOVIE: center items
// - center loading spinner
// - feature image is not loading

var movieArray = null; //pass data in global scope
var restaurantArray = null;
var rowMovie = document.getElementById('rowMovie');
var rowPlace = document.getElementById('rowPlace');
var movieText = document.getElementById('movieText');
var placeText = document.getElementById('placeText');
var container = document.querySelector('container');
var rowElt = document.querySelector('.row');
var loadingModal = document.getElementById('loadingModal');
// var movieHeader = document.getElementById('movieHeaderDiv');
// var placeHeader = document.getElementById('placeHeaderDiv');

var btnHomePage = document.getElementById('btnHomePage');
btnHomePage.addEventListener('click', handleClick);

function handleClick(e) { //when button is clicked, ajax request is called
  //The Movie Database API
  reset();

  rowMovie.classList.add('class', 'border')
  rowMovie.classList.add('class', 'border-white')
  rowMovie.classList.add('class', 'rounded')
  rowMovie.classList.add('class', 'bg-white')

  rowPlace.classList.add('class', 'border')
  rowPlace.classList.add('class', 'border-white')
  rowPlace.classList.add('class', 'rounded')
  rowPlace.classList.add('class', 'bg-white')

  loadingModal.classList.remove('d-none');

  $.ajax({
    url: 'https://api.themoviedb.org/3/movie/top_rated?api_key=b67aeeb26d6866b85c4c2077bf8bbfc0&language=en-US&page=1',
    method: 'GET',
    success: function (data) {
      movieArray = data.results;
      renderMovie(data.results); //function with placeholder value (passing data as an argument to the function)
      //Zomato
      $.ajax({
        url: 'https://developers.zomato.com/api/v2.1/search?entity_id=484&entity_type=city',
        method: 'GET',
        headers: {
          "user-key": "fc53565b99be0fd264e83e23e8ca9552",
        },
        success: function (data) {
          restaurantArray = data.restaurants
          renderRestaurant(data.restaurants)

          loadingModal.classList.add('d-none');
        },
        error: function (data) {
          console.log("ZOMATO Error:", data)
        }
      })
    },
    error: function (data) {
      console.log("TMDB Error:", data)
    }
  })

  btnHomePage.textContent = "Regenerate"
}

function renderMovie() { //define function has a function keyword -- i.e. renderData
  var randomNumber = Math.floor(Math.random() * movieArray.length) //pick random number from length of array
  var randomMovie = movieArray[randomNumber]

  var randomPosterPath = randomMovie['poster_path']; //image path data

  var movieHeaderDiv = document.createElement('div');
  movieHeaderDiv.classList.add('col-6', 'col-sm-12', 'd-flex', 'justify-content-center', 'align-items-center')

  // var movieHeaderDiv = document.getElementById('movieHeaderDiv');

  var movieHeader = document.createElement('img');
  movieHeader.src = './images/watch-this.png'
  // movieHeader.setAttribute('width', 300)
  // movieHeader.setAttribute('class', 'mx-auto');
  // movieHeader.setAttribute('class', 'd-block');

  var createImg = document.createElement('img');
  createImg.src = 'https://image.tmdb.org/t/p/' + 'w200' + randomPosterPath
  createImg.classList.add('class', 'm-2')

  var pEltTitle = document.createElement('h2');
  pEltTitle.textContent = randomMovie.original_title;

  var pSummary = document.createElement('p');
  pSummary.textContent = 'Summary: ' +randomMovie.overview;


  rowMovie.appendChild(movieHeaderDiv);
  movieHeaderDiv.appendChild(movieHeader)
  rowMovie.appendChild(createImg);
  rowMovie.appendChild(movieText);
  movieText.append(pEltTitle, pSummary);
}

function renderRestaurant() {
  var randomNumber = Math.floor(Math.random() * restaurantArray.length)
  var randomPlace = restaurantArray[randomNumber]

  var placeHeaderDiv = document.createElement('div');
  placeHeaderDiv.classList.add('col-6', 'col-sm-12', 'd-flex', 'justify-content-center', 'align-items-center')

  // var placeHeaderDiv = document.getElementById('placeHeaderDiv');

  var placeHeader = document.createElement('img');
  placeHeader.src = './images/eat-this.png';
  // placeHeader.setAttribute('class', 'mx-auto');
  // placeHeader.setAttribute('class', 'd-block');

  var placeImg = document.createElement('img');
  if (randomPlace.restaurant['featured_image']) {
    placeImg.src = randomPlace.restaurant['featured_image'];
  } else {
    placeImg.src = './images/food-image.png'
  }
  placeImg.setAttribute('width', '200'); //use CSS

  //object with key for every type
  //split on comma and space (have an array of cuisine place)
  //loop over that
  //check if there is a key in object with that name

  var pEltPlace = document.createElement('h2');
  pEltPlace.textContent = randomPlace.restaurant.name;

  var pPlaceAddress = document.createElement('p');
  pPlaceAddress.textContent = randomPlace.restaurant.location.address

  var pNumber = document.createElement('p');
  pNumber.textContent = randomPlace.restaurant.phone_numbers;

  var pTime = document.createElement('p');
  pTime.textContent = randomPlace.restaurant.timings;

  rowPlace.appendChild(placeHeaderDiv);
  placeHeaderDiv.appendChild(placeHeader)
  rowPlace.append(placeImg, placeText);
  placeText.append(pEltPlace, pPlaceAddress, pNumber, pTime)
}

function reset() {
  rowPlace.innerHTML = "";
  placeText.innerHTML = "";
  rowMovie.innerHTML = "";
  movieText.innerHTML = "";
}
