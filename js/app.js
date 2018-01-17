$(document).ready(function(){
 $('#searchForm').on('submit', function(event){
    var searchText = $('#searchText').val();
    getMovies(searchText);
     event.preventDefault();


 });
});

function getMovies(searchText) {
axios.get('https://api.themoviedb.org/3/search/movie?api_key=fa155f635119344d33fcb84fb807649b&query='+searchText)
.then(function(response){
console.log(response)
var movies = response.data.results;
var output = '';
$.each(movies, function(index, movie) {
    output += `
    <div class ="col-md-3">
    <div class = "well text-center">
    <img  src= "http://image.tmdb.org/t/p/w500/${movie.poster_path}">
    <h5> ${movie.title}</h5>
    <a onclick="movieSelected('${movie.id}')" class="btn btn-primary" href="#">Movie Details </a>
    </div>
    </div>
    `;
});

$('#movies').html(output)
})
.catch(function(err){
    console.log(err);
})
};

function movieSelected(id){
    sessionStorage.setItem('movieId', id);
    window.location = 'views/movie.html';
    return false;

}

function getMovie () {
    var movieId = sessionStorage.getItem('movieId');
    axios.get('https://api.themoviedb.org/3/movie/'+movieId+'?api_key=fa155f635119344d33fcb84fb807649b')
.then(function(response){
console.log(response)
var movie = response.data;

var output = `
<div class="row">
<div class = "col-md-4">
 <img src ="http://image.tmdb.org/t/p/w500/${movie.poster_path}" class = "thumbnail">
</div>
<div class="col-md-8">
<h2>${movie.title}</h2>
<ul class ="list-group">
<li class="list-group-item"><strong> Genere: </strong> ${movie.genres[0].name}</li>
<li class="list-group-item"><strong> Released: </strong> ${movie.release_date}</li>
<li class="list-group-item"><strong> Original Title: </strong> ${movie.original_title}</li>
<li class="list-group-item"><strong> IMDB Rating: </strong> ${movie.popularity}</li>
<li class="list-group-item"><strong> Overview: </strong> ${movie.overview}</li>
<li class="list-group-item"><strong> Writer: </strong> ${movie.Writer}</li>
<li class="list-group-item"><strong> Time: </strong> ${movie.runtime}</li>
</ul>
</div>
</div>

<div class= "row">
<div class = "well">
<h3>Plot </h3>
${movie.Plot}
<hr>
<a href="http://imdb.com/title/${movie.imdb_id}" target = "_blank" class="btn btn-primary">View IMDB</a>
<a href="../index.html" class="btn btn-default">Go Back To Search</a>
</div>
</div>
`;
$('#movie').html(output);

})
.catch(function(err){
    console.log(err);
})
}