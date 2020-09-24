
var btnHomePage = document.getElementById('btnHomePage');
btnHomePage.addEventListener('click', handleClick);

function handleClick(e){

}

// function renderData(){

//   var movieArray =

//   var btnGenerate = document.createElement('btn');
// }


$.ajax({
  url: 'https://api.themoviedb.org/3/movie/top_rated?api_key=b67aeeb26d6866b85c4c2077bf8bbfc0&language=en-US&page=1',
  method: 'GET',
  data:
  {
    "results": result;
    console.log("results", result)
  },
  success: function (data) {
    console.log(data)
  },
  error: function (data) {
    console.log(data)
  }
})
