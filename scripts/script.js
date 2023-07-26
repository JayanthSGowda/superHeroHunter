

// theme
let themeButton = document.getElementById("theme-btn");

themeButton.addEventListener("click",themeChanger);

// IIFE fuction which checks the localStorage and applies the presviously set theme
(function (){
     let currentTheme = localStorage.getItem("theme");
     if(currentTheme == null){
          root.setAttribute("color-scheme","light");
          themeButton.innerHTML = `<i class="fa-solid fa-moon"></i>`;
          themeButton.style.backgroundColor="#0D4C92";
          localStorage.setItem("theme","light");
          return;
     }

     switch(currentTheme){
          case "light":
               root.setAttribute("color-scheme","light");
               themeButton.innerHTML = `<i class="fa-solid fa-moon"></i>`;
               themeButton.style.backgroundColor="#0D4C92";
               break;
          case "dark":
               root.setAttribute("color-scheme","dark");
               themeButton.innerHTML = `<i class="fa-solid fa-sun"></i>`;
               themeButton.style.backgroundColor="#FB2576";
               themeButton.childNodes[0].style.color = "black";
               break;
     }
})();

// function for handeling theme button changes
function themeChanger(){
     let root = document.getElementById("root");
     if(root.getAttribute("color-scheme") == "light"){
          root.setAttribute("color-scheme","dark");
          themeButton.innerHTML = `<i class="fa-solid fa-sun"></i>`;
          themeButton.style.backgroundColor="#FB2576";
          themeButton.childNodes[0].style.color = "black";
          localStorage.setItem("theme","dark");
     }
     else if(root.getAttribute("color-scheme") == "dark"){
          root.setAttribute("color-scheme","light");
          themeButton.innerHTML = `<i class="fa-solid fa-moon"></i>`;
          themeButton.style.backgroundColor="#0D4C92";
          themeButton.childNodes[0].style.color = "white";
          localStorage.setItem("theme","light");
     }
}
//c40a69e80ee7da94c9293fd077523885 pub
//a8dc1dcf9c5d407c0e572d16ff0ca2c08bbd68c8 priv

// $ajax({
//      Url: "http://gateway.marvel.com/v1/public/comics",
//      Method: 'GET',
//      success: displayInfo,
//      params: {
//           apikey: "c40a69e80ee7da94c9293fd077523885",
//           ts: Date.now(),
//           hash: "your hash"
//      }

// })
// let ts = Date.now();
// let hash = ts + 'a8dc1dcf9c5d407c0e572d16ff0ca2c08bbd68c8' + 'c40a69e80ee7da94c9293fd077523885';
// console.log(CryptoJS.MD5(hash).toString());

// const httpRequest = new XMLHttpRequest();

// function handler() {
//      // Process the server response here.
//      console.log(JSON.parse(httpRequest.responseText).data);
//    }
   
// httpRequest.onreadystatechange = handler;
// // httpRequest.open("GET", "http://gateway.marvel.com/v1/public/characters?"+"ts="+ts+"&apikey=c40a69e80ee7da94c9293fd077523885&hash="+CryptoJS.MD5(hash).toString()
// // );
// // httpRequest.send();
let searchBar = document.getElementById("search-bar");
let searchResults = document.getElementById("search-results");
searchBar.addEventListener("input", () => searchHeros(searchBar.value));

async function searchHeros(textSearched) {

     let ts = Date.now();
let hash = ts + 'a8dc1dcf9c5d407c0e572d16ff0ca2c08bbd68c8' + 'c40a69e80ee7da94c9293fd077523885';
     if (textSearched.length == 0) {
          searchResults.innerHTML = ``;
          return;
     }


     await fetch(`https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${textSearched}&ts=${ts}&apikey=c40a69e80ee7da94c9293fd077523885&hash=${CryptoJS.MD5(hash).toString()}`)
          .then(res => res.json())
          .then(data => showSearchedResults(data.data.results)) 
}


function showSearchedResults(searchedHero) {

     let favouritesCharacterIDs = localStorage.getItem("favouritesCharacterIDs");
     if(favouritesCharacterIDs == null){
          favouritesCharacterIDs = new Map();
     }
     else if(favouritesCharacterIDs != null){
          favouritesCharacterIDs = new Map(JSON.parse(localStorage.getItem("favouritesCharacterIDs")));
     }

     searchResults.innerHTML = ``;
     let count = 1;

     for (const key in searchedHero) {
          if (count <= 5) {
               let hero = searchedHero[key];
               searchResults.innerHTML +=
                    `
               <li class="flex-row single-search-result">
                    <div class="flex-row img-info">
                         <img src="${hero.thumbnail.path+'/portrait_medium.' + hero.thumbnail.extension}" alt="">
                         <div class="hero-info">
                              <a class="character-info" href="./pages/more-info.html">
                                   <span class="hero-name">${hero.name}</span>
                              </a>
                         </div>
                    </div>
                    <div class="flex-col buttons">
                         <!-- <button class="btn"><i class="fa-solid fa-circle-info"></i> &nbsp; More Info</button> -->
                         <button class="btn add-to-fav-btn">${favouritesCharacterIDs.has(`${hero.id}`) ? "<i class=\"fa-solid fa-heart-circle-minus\"></i> &nbsp; Remove from Favourites" :"<i class=\"fa-solid fa-heart fav-icon\"></i> &nbsp; Add to Favourites</button>"}
                    </div>
                    <div style="display:none;">
                         <span>${hero.name}</span>
                         <span>${hero.description}</span>
                         <span>${hero.comics.available}</span>
                         <span>${hero.series.available}</span>
                         <span>${hero.stories.available}</span>
                         <span>${hero.thumbnail.path+'/portrait_uncanny.' + hero.thumbnail.extension}</span>
                         <span>${hero.id}</span>
                         <span>${hero.thumbnail.path+'/landscape_incredible.' + hero.thumbnail.extension}</span>
                         <span>${hero.thumbnail.path+'/standard_fantastic.' + hero.thumbnail.extension}</span>
                    </div>
               </li>
               `
          }
          count++;
     }

     events();
}


function events() {
     let favouriteButton = document.querySelectorAll(".add-to-fav-btn");
     favouriteButton.forEach((btn) => btn.addEventListener("click", addToFavourites));

     let characterInfo = document.querySelectorAll(".character-info");
     characterInfo.forEach((character) => character.addEventListener("click", addInfoInLocalStorage))
}


function addToFavourites() {

     if (this.innerHTML == '<i class="fa-solid fa-heart fav-icon"></i> &nbsp; Add to Favourites') {

          let heroInfo = {
               name: this.parentElement.parentElement.children[2].children[0].innerHTML,
               description: this.parentElement.parentElement.children[2].children[1].innerHTML,
               comics: this.parentElement.parentElement.children[2].children[2].innerHTML,
               series: this.parentElement.parentElement.children[2].children[3].innerHTML,
               stories: this.parentElement.parentElement.children[2].children[4].innerHTML,
               portraitImage: this.parentElement.parentElement.children[2].children[5].innerHTML,
               id: this.parentElement.parentElement.children[2].children[6].innerHTML,
               landscapeImage: this.parentElement.parentElement.children[2].children[7].innerHTML,
               squareImage: this.parentElement.parentElement.children[2].children[8].innerHTML
          }

          let favouritesArray = localStorage.getItem("favouriteCharacters");

          if (favouritesArray == null) {
               favouritesArray = [];
          } else {
               favouritesArray = JSON.parse(localStorage.getItem("favouriteCharacters"));
          }

          let favouritesCharacterIDs = localStorage.getItem("favouritesCharacterIDs");

          
          if (favouritesCharacterIDs == null) {
               favouritesCharacterIDs = new Map();
          } else {
               favouritesCharacterIDs = new Map(JSON.parse(localStorage.getItem("favouritesCharacterIDs")));
          }

          favouritesCharacterIDs.set(heroInfo.id, true);

          favouritesArray.push(heroInfo);

          localStorage.setItem("favouritesCharacterIDs", JSON.stringify([...favouritesCharacterIDs]));
          localStorage.setItem("favouriteCharacters", JSON.stringify(favouritesArray));

          this.innerHTML = '<i class="fa-solid fa-heart-circle-minus"></i> &nbsp; Remove from Favourites';
          
          document.querySelector(".fav-toast").setAttribute("data-visiblity","show");
          setTimeout(function(){
               document.querySelector(".fav-toast").setAttribute("data-visiblity","hide");
          },1000);
     }
     else{
          
          let idOfCharacterToBeRemoveFromFavourites = this.parentElement.parentElement.children[2].children[6].innerHTML;
          
          let favouritesArray = JSON.parse(localStorage.getItem("favouriteCharacters"));
          
          let favouritesCharacterIDs = new Map(JSON.parse(localStorage.getItem("favouritesCharacterIDs")));
          
          let newFavouritesArray = [];
          
          favouritesCharacterIDs.delete(`${idOfCharacterToBeRemoveFromFavourites}`);

          favouritesArray.forEach((favourite) => {
               if(idOfCharacterToBeRemoveFromFavourites != favourite.id){
                    newFavouritesArray.push(favourite);
               }
          });
          
          
          localStorage.setItem("favouriteCharacters",JSON.stringify(newFavouritesArray));
          localStorage.setItem("favouritesCharacterIDs", JSON.stringify([...favouritesCharacterIDs]));
          
          
          this.innerHTML = '<i class="fa-solid fa-heart fav-icon"></i> &nbsp; Add to Favourites';
          
          document.querySelector(".remove-toast").setAttribute("data-visiblity","show");
          setTimeout(function(){
               document.querySelector(".remove-toast").setAttribute("data-visiblity","hide");
          },1000);
     }     
}


function addInfoInLocalStorage() {

     let heroInfo = {
          name: this.parentElement.parentElement.parentElement.children[2].children[0].innerHTML,
          description: this.parentElement.parentElement.parentElement.children[2].children[1].innerHTML,
          comics: this.parentElement.parentElement.parentElement.children[2].children[2].innerHTML,
          series: this.parentElement.parentElement.parentElement.children[2].children[3].innerHTML,
          stories: this.parentElement.parentElement.parentElement.children[2].children[4].innerHTML,
          portraitImage: this.parentElement.parentElement.parentElement.children[2].children[5].innerHTML,
          id: this.parentElement.parentElement.parentElement.children[2].children[6].innerHTML,
          landscapeImage: this.parentElement.parentElement.parentElement.children[2].children[7].innerHTML,
          squareImage: this.parentElement.parentElement.parentElement.children[2].children[8].innerHTML
     }

     localStorage.setItem("heroInfo", JSON.stringify(heroInfo));
}