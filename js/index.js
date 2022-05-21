// Called elements
let elList = $(".js-list");
let elForm = $(".form");
let elInput = $(".form_input");
let elInputRaiting = $(".form_input-reiting");
let elCategories = $(".js-Categories-select");
let elSort = $(".js-sort-select");
let elMovieTemplate = $("#movies-template").content;
movies.splice(100);


let normalizedMovies = movies.map((movie) => {
  return {
    title: movie.Title.toString(),
    fulltitle: movie.fulltitle,
    movie_year: movie.movie_year,
    categories: movie.Categories.split("|").join(", "),
    summary: movie.summary,
    imdbRating: movie.imdb_rating,
    runtime: movie.runtime,
    language: movie.language,
    trailer: `https://www.youtube.com/watch?v=${movie.ytid}`,
    smallPoster: `http://i3.ytimg.com/vi/${movie.ytid}/hqdefault.jpg`,
  }

})

let createMoveiElement = (movie) => {
  elList.innerHTML = "";
  let movieElement = elMovieTemplate.cloneNode(true);

  $(".card-title", movieElement).textContent = movie.title;
  $(".card-fulltitle", movieElement).textContent = movie.fulltitle;
  $(".card-movieyear", movieElement).textContent = movie.movie_year;
  $(".card-Categories", movieElement).textContent = movie.categories;
  $(".card-summary", movieElement).textContent = movie.summary;
  $(".card-img-top", movieElement).src = movie.smallPoster;
  $(".card-img-top", movieElement).alt = movie.title;
  $(".card-imdbRating", movieElement).textContent = movie.imdb_rating;
  $(".card-language", movieElement).textContent = movie.language;
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

elInput.addEventListener("change", (evt) => {
  evt.preventDefault();

  let searchMovie = new RegExp(elInput.value.trim(), "gi");

  let searchResult = normalizedMovies.filter((movie) => {
    if (movie.title.match(searchMovie)) {
      return movie.title.match(searchMovie);
    }
  })

  renderMovies(searchResult);
})



normalizedMovies.forEach((movi) => {
  let newOption = createElement("option", "", "");
  newOption.textContent = movi.categories;
  newOption.option = movi.categories;
  elCategories.append(newOption);

})


elCategories.addEventListener("change", (evt) => {
  evt.preventDefault();
  let categoryMovies = normalizedMovies.filter(function(movie) {
    
      if (movie.categories.includes(elCategories.value)){
       return movie.categories.includes(elCategories.value)
     }
  })
  renderMovies(categoryMovies)
})



//Reyting boyicha qidirish funksiyasi
// elInputRaiting.addEventListener("change", (evt) => {
//   evt.preventDefault();

//   let reytingSearch = function(){
//     let a = [];
//     normalizedMovies.forEach((movie) => {
//       if(movie.movie_year >= elSearchReytingInput.value.trim()){
//         a.push(movie);
//       }
//     })
//     return a;
//   }
//   renderKinolar(reytingSearch());
// })




// Alifbo buyicha qidirish
let sortAlifboReytingCreatOption = function(){

  let elSortTitleOption = document.createElement("option");
  elSortTitleOption.textContent = "A-Z";
  elSortTitleOption.value = "A-Z";
  
  let elSortReversTitleOption = document.createElement("option");
  elSortReversTitleOption.textContent = "Z-A";
  elSortReversTitleOption.value = "Z-A";
  
  let elSortReytingOption = document.createElement("option");
  elSortReytingOption.textContent = "Reytingi =>";
  elSortReytingOption.value = "Reytingi =>";
  
  let elSortReverseReytingOption = document.createElement("option");
  elSortReverseReytingOption.textContent = "Reytingi <=";
  elSortReverseReytingOption.value = "Reytingi <=";
  
  elSort.append(elSortTitleOption, elSortReversTitleOption, elSortReytingOption, elSortReverseReytingOption);
}
  
  sortAlifboReytingCreatOption()
  
  
