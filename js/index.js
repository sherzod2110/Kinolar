// Called elements
let elList = $(".js-list");
let elForm = $(".form");
let elInput = $(".form_input");
let elMovieTemplate = $("#movies-template").content;

movies.splice(100);


let normalizedMovies = movies.map((movie) => {
  return {
    title: movie.Title.toString(),
    fulltitle: movie.fulltitle,
    categories: movie.Categories.split("|").join(", "),
    summary: movie.summary,
    imdbRating: movie.imdb_rating,
    runtime: movie.runtime,
    language: movie.language,
    trailer: `https://www.youtube.com/watch?v=${movie.ytid}`,
    smallPoster: `http://i3.ytimg.com/vi/${movie.ytid}/hqdefault.jpg`
  }

})


let createMoveiElement = (movie) => {
  elList.innerHTML = "";
  let movieElement = elMovieTemplate.cloneNode(true);

  $(".card-title", movieElement).textContent = movie.title;
  $(".card-img-top", movieElement).src = movie.smallPoster;
  $(".card-img-top", movieElement).alt = movie.title;
  $(".card-cast", movieElement).textContent = movie.summary;
  $(".card-genres", movieElement).textContent = movie.fulltitle;
  $(".card-year", movieElement).textContent = movie.runtime;
  $(".card-year", movieElement).textContent = movie.language;
  $(".card-trailler", movieElement).href = movie.trailer;

  return movieElement;

}

let renderMovies = (movies) => {

  let elResultFragment = document.createDocumentFragment();
  movies.forEach((movie) => {
    elResultFragment.append(createMoveiElement(movie));
    
  })
  
  elList.append(elResultFragment);
}

renderMovies(normalizedMovies);

elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  let searchMovie = new RegExp(elInput.value.trim(), "gi");

  let searchResult = normalizedMovies.filter((movie) => {
    if (movie.title.match(searchMovie)) {
      return movie.title.match(searchMovie);
    }
  })

  renderMovies(searchResult);
})