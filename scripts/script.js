

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