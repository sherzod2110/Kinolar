// Called elements
let elList = $(".js-list");

kinolar.splice(100);

kinolar.forEach(function (kino) {
  
  let newLiItem = createElement("li", "list-item", "");
  let newTitle = createElement("p", "item-name", kino.title.toUpperCase());
  let newYear = createElement("p", "item-year", kino.year);
  let newCast = createElement("p", "item-cast", kino.cast);
  let newGenres = createElement("p", "item-genres", kino.genres.toString());

  newGenres.textContent = kino.genres.join(", ");
  newCast.textContent = kino.cast.join(", ");
  
  newLiItem.append(newTitle, newYear, newCast, newGenres);
  elList.appendChild(newLiItem);
})