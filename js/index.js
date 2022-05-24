// Called elements
let elList = $(".js-list");
let elForm = $(".form");
let elInput = $(".form_input");
let elInputRaiting = $(".form_input-reiting");
let elCategories = $(".js-Categories-select");
let elSort = $(".js-sort-select");
let elMovieTemplate = $("#movies-template").content;
movies.splice(200);


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
  $(".card-imdbRating", movieElement).textContent = movie.imdbRating;
  $(".card-language", movieElement).textContent = movie.language;
  $(".card-trailler", movieElement).href = movie.trailer;

  return movieElement;
}

let renderMovies = (movies) => {
  elList.innerHTML = "";
  let elResultFragment = document.createDocumentFragment();
  movies.forEach((movie) => {
    elResultFragment.append(createMoveiElement(movie));
    
  })
  
  elList.append(elResultFragment);
}

renderMovies(normalizedMovies);

elInput.addEventListener("input", (evt) => {
  evt.preventDefault();

  let searchMovie = new RegExp(elInput.value.trim(), "gi");

  let searchResult = normalizedMovies.filter((movie) => {
    if (movie.title.match(searchMovie)) {
      return movie.title.match(searchMovie);
    }
  })

  renderMovies(searchResult);
})


let numberCategoriy = [];
normalizedMovies.forEach((movi) => {
  
  movi.categories.split(", ").forEach((categoriy) => {
    if(!numberCategoriy.includes(categoriy)){
      numberCategoriy.push(categoriy);
    }
  })
})


numberCategoriy.forEach((a) => {
  let newOption = document.createElement("option");
  newOption.textContent = a;
  newOption.value = a;

  elCategories.append(newOption);
})

let newOption = document.createElement("option");
newOption.textContent = "All";
newOption.value = "All";

elCategories.prepend(newOption);


elCategories.addEventListener("change", (evt) => {
  evt.preventDefault();
  let categoryMovies = normalizedMovies.filter(function(movie) {
    
      if (movie.categories.includes(elCategories.value)){
       return movie.categories.includes(elCategories.value)
     }
  })
  if(elCategories.value == "All"){
    renderMovies(normalizedMovies);
  }else{
  renderMovies(categoryMovies)
}
})



elInputRaiting.addEventListener("change", (evt) => {
  evt.preventDefault();

  let reytingSearch = function(){
    let a = [];
    normalizedMovies.forEach((movie) => {
      if(movie.imdbRating >= elInputRaiting.value.trim()){
        a.push(movie);
      }
    })
    return a;
  }
  renderMovies(reytingSearch());
})




// SORTLASH
let newOptionArry = ["A-Z","Z-A","Reating=>","Reating<="];


newOptionArry.forEach((sort)=>{
  
  let newOption = createElement("option","",sort);
  newOption.textContent = sort;
  newOption.value = sort;
  
  elSort.append(newOption);
}) 

let sortMovies = []
if (elSort.value == newOptionArry[0]){
  sortMovies = normalizedMovies.sort((a,b)=> a.title.localeCompare(b.title))
}

elSort.addEventListener("change", (evt)=>{
  evt.preventDefault();
  elList.innerHTML = "";
  let sortMovies = [];
    if (elSort.value == newOptionArry[0]){
      sortMovies = normalizedMovies.sort((a,b)=> a.title.localeCompare(b.title))
    }
    if (elSort.value == newOptionArry[1]){
      sortMovies = normalizedMovies.sort((a,b)=> b.title.localeCompare(a.title))
    }
    if (elSort.value == newOptionArry[2]){
      sortMovies = normalizedMovies.sort((a,b)=> b.imdbRating - a.imdbRating)
    }
    if (elSort.value == newOptionArry[3]){
      sortMovies = normalizedMovies.sort((a,b)=> a.imdbRating - b.imdbRating)
    }
   
  renderMovies(sortMovies)
});
