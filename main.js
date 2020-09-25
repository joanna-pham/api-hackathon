//pass data in global scope
var movieArray;
var container = document.querySelector('container');

var btnHomePage = document.getElementById('btnHomePage');
btnHomePage.addEventListener('click', handleClick);

function handleClick(e) {
}


//The Movie Database API
$.ajax({
  url: 'https://api.themoviedb.org/3/movie/top_rated?api_key=b67aeeb26d6866b85c4c2077bf8bbfc0&language=en-US&page=1',
  method: 'GET',
  success: function (data) {
    movieArray = data.results
    //passing data as an argument to the function
    // console.log(data.results)
    renderData(data.results); //function with placeholder value
  },
  error: function (data) {
    console.log(data)
  }
})

//Zomato
// $.ajax({
//   url: 'https://developers.zomato.com/api/v2.1/search?entity_id=92677',
//   method: 'GET',
//   headers: {
//     "user-key": "fc53565b99be0fd264e83e23e8ca9552",
//   },
//   success: function (data) {
//     console.log("ZOMATO", data)
//   },
//   error: function (data) {
//     console.log(data)
//   }
// })


//define function has a function keyword

function renderData() {
  //MOVIE INFO
  var randomMovie = Math.floor(Math.random() * movieArray.length) //pick random number from length of array
  // var poster
  for (var i = 0; i < movieArray.length; i++) { //loop through movie array to match number with array items
    randomMovie = movieArray[i]
  }

  var randomMovieTitle = randomMovie['original_title'] //title data
  var randomPosterPath = randomMovie['poster_path']; //image path data
  var randomMovieID = randomMovie['id']; //movie ID number

  //MOVIE - Get Image
  $.ajax({
    url: 'https://api.themoviedb.org/3/configuration?api_key=b67aeeb26d6866b85c4c2077bf8bbfc0',
    method: 'GET',
    success: function (data) {
      var imgUrl = data.images['base_url'];
      var createImg = document.createElement('img');
      createImg.src = imgUrl + 'w200' + randomPosterPath

      // ---------------got image link, works... how do I make it appear on the screen
    },
    error: function (data) {
      console.log(data)
    }
  })


  // var image = document.createElement('img');
  // image.src = 'https://api.themoviedb.org/3/movie/' + randomMovieID + randomPosterPath + ''
  // image.src = 'https://api.themoviedb.org/3/movie/' + randomMovieID + '/images?api_key=b67aeeb26d6866b85c4c2077bf8bbfc0&language=en-US'

  // var movieTitle = document.createElement('h3');
  // movieTitle.textContent = randomMovieTitle;
  // container.appendChild(movieTitle)


  //ZOMATO INFO




  var btnGenerate = document.createElement('btn');
  btnGenerate.classList.add()
}

//multiple math.random by length of the array
