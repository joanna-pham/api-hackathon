var movieArray; //pass data in global scope
var container = document.querySelector('container');
var rowElt = document.querySelector('.row')

var btnHomePage = document.getElementById('btnHomePage');
btnHomePage.addEventListener('click', handleClick);

function handleClick(e) { //when button is clicked, ajax request is called

  btnHomePage.classList.add('d-none')

  //The Movie Database API
  $.ajax({
    url: 'https://api.themoviedb.org/3/movie/top_rated?api_key=b67aeeb26d6866b85c4c2077bf8bbfc0&language=en-US&page=1',
    method: 'GET',
    success: function (data) {
      movieArray = data.results
      renderData(data.results); //function with placeholder value (passing data as an argument to the function)
    },
    error: function (data) {
      console.log("TMDB Error:", data)
    }
  })

  //Zomato
  $.ajax({
    url: 'https://developers.zomato.com/api/v2.1/search?entity_id=92677',
    method: 'GET',
    headers: {
      "user-key": "fc53565b99be0fd264e83e23e8ca9552",
    },
    success: function (data) {
      console.log("ZOMATO", data)
    },
    error: function (data) {
      console.log("ZOMATO Error:", data)
    }
  })

}





//define function has a function keyword -- i.e. renderData
function renderData() {
  //MOVIE INFO
  //--------WHY IS RANDOM MOVIE ALWAYS THE SAME
  var randomMovie = Math.floor(Math.random() * movieArray.length) //pick random number from length of array
  // var poster
  for (var i = 0; i < movieArray.length; i++) { //loop through movie array to match number with array items
    randomMovie = movieArray[i]
  }

  var pEltTitle = document.createElement('p');
  pEltTitle.textContent = randomMovie['original_title'];

  var randomPosterPath = randomMovie['poster_path']; //image path data
  var randomMovieID = randomMovie['id']; //movie ID number


  rowElt.appendChild(pEltTitle)

  //MOVIE - Get Image
  $.ajax({
    url: 'https://api.themoviedb.org/3/configuration?api_key=b67aeeb26d6866b85c4c2077bf8bbfc0',
    method: 'GET',
    success: function (data) {
      var imgUrl = data.images['base_url'];
      var createImg = document.createElement('img');
      createImg.src = imgUrl + 'w200' + randomPosterPath

      rowElt.appendChild(createImg)

    },
    error: function (data) {
      console.log("Movie Image Error:", data)
    }
  })

  //ZOMATO INFO



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

//multiple math.random by length of the array
