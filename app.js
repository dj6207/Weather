// import fetch from "node-fetch";

let weather = {
  APIKey: "e16b16b75c147980728eee583fd7ad1b",
  weather: function (city) {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&appid=' + this.APIKey)
    .then(res => {
      if (res.ok) {
        console.log('Weather Found')
      } else {
        console.log('Weather Not Found')
      }
      return(res.json())
    })
    // .then(data => console.log(data));
    .then(data => this.showWeather(data));
  },
  showWeather: function (data) {
    const {name} = data;
    const {country} = data.sys;
    const {temp, temp_max, temp_min} = data.main;
    const {description} = data.weather[0];
    const {speed} = data.wind;
    document.querySelector(".location").innerText =name + ", " + country;
    document.querySelector(".description").innerText = this.upperCase(description);
    document.querySelector(".temperature").innerText = "Temperature: " + temp + "°F";
    document.querySelector(".high-low").innerText = "High: " + temp_max + "°F, Low: " + temp_min + "°F";
    document.querySelector(".wind").innerText = "Wind: " + speed + " mph";
    document.querySelector(".weather").classList.remove("loading");
  },
  search: function() {
    this.weather(document.querySelector(".search-bar").value);
  },
  upperCase: function(data) {
    const words = data.split(" ");
    for (let i = 0; i < words.length; i++) {
      words[i] = words[i][0].toUpperCase() + words[i].substring(1);
    }
    return words.join(" ");
  }
};

// -------------------------------------------------------------------------

const search = document.querySelector(".search")
const inputBox = document.querySelector("input")
const cities = document.querySelector(".autocomplete-box")

inputBox.onkeyup = (e) => {
  let userInput = e.target.value;
  let wordArray = [];
  if(userInput){
    wordArray = suggestions.filter((data)=>{
      return data.toLocaleLowerCase().startsWith(userInput.toLocaleLowerCase());
    });
    wordArray = wordArray.map((data)=>{
      return data = '<li>' + data + '</li>';
    });
    console.log(wordArray);
    search.classList.add("active");
    showCities(wordArray);
    let allList = cities.querySelectorAll("li");
    for (let i = 0; i < allList.length; i++) {
      allList[i].setAttribute("onclick", "select(this)");
    }
  }else{
    search.classList.remove("active");
  }
} 

function select(element) {
  let selectUserInput = element.textContent;
  inputBox.value = selectUserInput;
}

function showCities(list) {
  let listCities;
  if(!list.length){
    userInput = inputBox.value;
    listCities = '<li>' + userInput + '</li>';
  }else{
    listCities = list.join('');
  }
  cities.innerHTML = listCities;
}

// --------------------------------------------------------------------
// weather.weather('New York City')

document.querySelector(".search button").addEventListener("click", function() {
  weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function (e) {
  if (e.key == "Enter") {
    weather.search();
  }
});