// Called elements
let elList = $(".js-list");
let elForm = $(".form");
let elInput = $(".form_input");
let elMovieTemplate = $("#movies-template").content;

kinolar.splice(100);


let normalizedMovies = kinolar.map((kino) => {
  return {
    title: kino.title,
    cast: kino.cast.join(", "),
    genres: kino.genres.join(", "),
    year: kino.year,
  }
  

})

let createMoveiElement = (movie) => {
  elList.innerHTML = "";
  let movieElement = elMovieTemplate.cloneNode(true);

  $(".card-title", movieElement).textContent = movie.title;
  $(".card-cast", movieElement).textContent = movie.year;
  $(".card-genres", movieElement).textContent = movie.cast;
  $(".card-year", movieElement).textContent = movie.genres;

  let newDiv = createElement("div")

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