var movieArray; //pass data in global scope
var restaurantArray;

var container = document.querySelector('container');
var rowElt = document.querySelector('.row')

var btnHomePage = document.getElementById('btnHomePage');
btnHomePage.addEventListener('click', handleClick);

function handleClick(e) { //when button is clicked, ajax request is called
  //The Movie Database API
  $.ajax({
    url: 'https://api.themoviedb.org/3/movie/top_rated?api_key=b67aeeb26d6866b85c4c2077bf8bbfc0&language=en-US&page=1',
    method: 'GET',
    success: function (data) {
      movieArray = data.results
      renderMovie(data.results); //function with placeholder value (passing data as an argument to the function)
    },
    error: function (data) {
      console.log("TMDB Error:", data)
    }
  })

  //Zomato
  $.ajax({
    // url: 'https://developers.zomato.com/api/v2.1/search?entity_id=92677',
    url: 'https://developers.zomato.com/api/v2.1/search?entity_id=484&entity_type=city',
    method: 'GET',
    headers: {
      "user-key": "fc53565b99be0fd264e83e23e8ca9552",
    },
    success: function (data) {
      restaurantArray = data.restaurants
      renderRestaurant(data.restaurants)
      console.log("ZOMATO", data.restaurants)
    },
    error: function (data) {
      console.log("ZOMATO Error:", data)
    }
  })

  btnHomePage.innerHTML = "Regenerate"

}





//define function has a function keyword -- i.e. renderData
function renderMovie() {
  //--------WHY IS RANDOM MOVIE ALWAYS THE SAME
  var randomMovie = Math.floor(Math.random() * movieArray.length) //pick random number from length of array
  // var poster
  for (var i = 0; i < movieArray.length; i++) { //loop through movie array to match number with array items
    randomMovie = movieArray[i]
  }

  // var pEltTitle = document.createElement('p');
  // pEltTitle.textContent = randomMovie['original_title'];

  var randomPosterPath = randomMovie['poster_path']; //image path data
  // var randomMovieID = randomMovie['id']; //movie ID number


  //MOVIE - Get Image
  $.ajax({
    url: 'https://api.themoviedb.org/3/configuration?api_key=b67aeeb26d6866b85c4c2077bf8bbfc0',
    method: 'GET',
    success: function (data) {
      var imgUrl = data.images['base_url'];
      var createImg = document.createElement('img');
      createImg.src = imgUrl + 'w200' + randomPosterPath

      var rowMovie = document.getElementById('rowMovie');

      var pEltTitle = document.createElement('h2');
      pEltTitle.textContent = randomMovie['original_title'];

      rowMovie.appendChild(createImg)
      rowMovie.appendChild(pEltTitle)
    },
    error: function (data) {
      console.log("Movie Image Error:", data)
    }
  })

}

function renderRestaurant(){
  var randomPlace = Math.floor(Math.random() * restaurantArray.length)
  for(var i = 0; i < restaurantArray.length; i++){
    randomPlace = restaurantArray[i]
  }

  var placeImg = document.createElement('img');
  placeImg.src = randomPlace.restaurant['featured_image'];
  placeImg.setAttribute('width', '200');

  var pEltPlace = document.createElement('h2');
  pEltPlace.textContent = randomPlace.restaurant['name'];

  var pPlaceAddress = document.createElement('p');
  pPlaceAddress.textContent = randomPlace.restaurant.location['address']

  var pNumber = document.createElement('p');
  pNumber.textContent = randomPlace.restaurant['phone_numbers'];

  var pTime = document.createElement('p');
  pTime.textContent = randomPlace.restaurant['timings'];

  var rowPlace = document.getElementById('rowPlace');
  rowPlace.appendChild(placeImg);
  rowPlace.appendChild(pEltPlace);
  rowPlace.appendChild(pPlaceAddress)
  rowPlace.appendChild(pNumber);
  rowPlace.appendChild(pTime)

  // rowPlace.appendChild(pEltPlace)
  // container.appendChild(rowPlace)

  //------BUTTON TO REGENERATE
  // var btnGenerate = document.createElement('btn');
  // btnGenerate.setAttribute('class', 'btn');
  // btnGenerate.setAttribute('class', 'btn-outline-dark');
  // btnGenerate.innerHTML = 'Generate'

  // var spanBtnElt = document.createElement('span');
  // var divRow = document.createElement('div');
  // spanBtnElt.appendChild(btnGenerate);
  // divRow.appendChild(spanBtnElt);
  // container.appendChild(divRow)

}

function reset(){
  rowPlace.innerHTML = "";
  rowMovie.innerHTML = "";
}
