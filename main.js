// //pass data in global scope
// var movieArray

// var btnHomePage = document.getElementById('btnHomePage');
// btnHomePage.addEventListener('click', handleClick);

// function handleClick(e){

// }


// //The Movie Database API
// $.ajax({
//   url: 'https://api.themoviedb.org/3/movie/top_rated?api_key=b67aeeb26d6866b85c4c2077bf8bbfc0&language=en-US&page=1',
//   method: 'GET',
//   success: function (data) {
//     movieArray = data.results
//     //passing data as an argument to the function
//     renderData(data.results); //function with placeholder value
//   },
//   error: function (data) {
//     console.log(data)
//   }
// })

//Zomato
$.ajax({
  url: 'https://developers.zomato.com/api/v2.1/search',
  method: 'GET',
  header: {
    "X-Access-Token": "fc53565b99be0fd264e83e23e8ca9552"
  },
  success: function (data) {
    console.log(data)
  },
  error: function (data) {
    console.log(data)
  }
})

// //define function has a function keyword

// function renderData(){
//   var randomMovie = Math.floor(Math.random() * movieArray.length)
//   var poster
//   for (var i = 0; i < movieArray.length; i++){
//     randomMovie = movieArray[i]
//   }
//   console.log("link", randomMovie['poster_path'])

//   randomPosterPath = randomMovie['poster_path'];
//   randomMovieID = randomMovie['id'];
//   console.log("randomMovieID", randomMovieID)

//   var image = document.createElement('img');
//   // image.src = 'https://api.themoviedb.org/3/movie/' + randomMovieID + randomPosterPath + ''
//   image.src = 'https://api.themoviedb.org/3/movie/' + randomMovieID + '/images?api_key=b67aeeb26d6866b85c4c2077bf8bbfc0&language=en-US'

//   console.log(image)




//   var btnGenerate = document.createElement('btn');
//   btnGenerate.classList.add()
// }

// //multiple math.random by length of the array
