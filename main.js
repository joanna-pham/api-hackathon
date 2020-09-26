var movieArray = null; //pass data in global scope
var restaurantArray = null;
var rowMovie = document.getElementById('rowMovie');
var rowPlace = document.getElementById('rowPlace');

var container = document.querySelector('container');
var rowElt = document.querySelector('.row')

var btnHomePage = document.getElementById('btnHomePage');
btnHomePage.addEventListener('click', handleClick);

function handleClick(e) { //when button is clicked, ajax request is called
  //The Movie Database API
  reset();

  rowMovie.classList.add('class', 'border')
  rowMovie.classList.add('class', 'border-primary')
  rowMovie.classList.add('class', 'rounded')

  rowPlace.classList.add('class', 'border')
  rowPlace.classList.add('class', 'border-primary')
  rowPlace.classList.add('class', 'rounded')

  $.ajax({
    url: 'https://api.themoviedb.org/3/movie/top_rated?api_key=b67aeeb26d6866b85c4c2077bf8bbfc0&language=en-US&page=1',
    method: 'GET',
    success: function (data) {
      var spinner = document.createElement('img');
      spinner.src = './images/spinner-icon.gif';
      // spinner.classList.add('mx-auto');
      // spinner.classList.add('my-0');

      var header = document.querySelector('.header-tag')
      header.appendChild(spinner);

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

          spinner.classList.add('d-none')
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

  // var pEltTitle = document.createElement('p');
  // pEltTitle.textContent = randomMovie['original_title'];

  var randomPosterPath = randomMovie['poster_path']; //image path data

  var createImg = document.createElement('img');
  createImg.src = 'https://image.tmdb.org/t/p/' + 'w200' + randomPosterPath

  var pEltTitle = document.createElement('h2');
  pEltTitle.textContent = randomMovie['original_title'];

  rowMovie.appendChild(createImg)
  rowMovie.appendChild(pEltTitle)
}

function renderRestaurant() {
  var randomNumber = Math.floor(Math.random() * restaurantArray.length)
  var randomPlace = restaurantArray[randomNumber]

  var placeImg = document.createElement('img');
  if (randomPlace.restaurant['featured_image']) {
    placeImg.src = randomPlace.restaurant['featured_image'];
  } else {
    placeImg.src = './images/food-image.png'
  }
  placeImg.setAttribute('width', '200');

  var pEltPlace = document.createElement('h2');
  pEltPlace.textContent = randomPlace.restaurant.name;

  var pPlaceAddress = document.createElement('p');
  pPlaceAddress.textContent = randomPlace.restaurant.location.address

  var pNumber = document.createElement('p');
  pNumber.textContent = randomPlace.restaurant.phone_numbers;

  var pTime = document.createElement('p');
  pTime.textContent = randomPlace.restaurant['timings'];

  rowPlace.append(placeImg, pEltPlace, pPlaceAddress, pNumber, pTime);
  // rowPlace.appendChild(pEltPlace);
  // rowPlace.appendChild(pPlaceAddress)
  // rowPlace.appendChild(pNumber);
  // rowPlace.appendChild(pTime)
}

function reset() {
  rowPlace.innerHTML = "";
  rowMovie.innerHTML = "";
}
