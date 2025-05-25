//Initializing all elements as const
const temperatureField = document.querySelector(".weather1");
const cityField = document.querySelector(".weather2 p");
const dateField = document.querySelector(".weather2 span");
const emojiField = document.querySelector(".weather3 img");
const weatherField = document.querySelector(".weather3 span");
const searchField = document.querySelector(".searchField");
const form = document.querySelector("form");
//adding event listner to the form
form.addEventListener("submit",search);

//defalut location
let target = "delhi" //we are passing the variable here coz when we come to search bar for searching any 
// location we just have to change the value of the target

//function to fetch data from weather api
const fetchData = async (target) =>{
try {
        //remember delhi is static here 
        const url = `https://api.weatherapi.com/v1/current.json?key=4aee6677b56847b9bf882908251204&q=${target}`

        const response = await fetch(url);
        const data = await response.json();
    
        // console.log(data);
    
        //doing destructuring of the data here
    
        const {current:{temp_c,
            condition:{
            text, icon},
        },
               location:{name,localtime},
              } = data;
        // updateDom(data.current.temp_c, data.location.name); //passing the current temperature and location name
        //calling update function here
        updateDom(temp_c,name,localtime,icon,text); //now after data destructuring we can simply pass the 
        // temperature and location name here
} 
catch (error) {
   
    alert("Location not found");

}

};
//function to update the DOM
function updateDom (temperature,city,time,emoji,text){
    const exactTime = time.split(" ")[1]; //spliting time here
    const exactDate = time.split(" ")[0]; 
    const exactDay = new Date(exactDate).getDay();//we know that 0 means sunday and 6 means sat in the day format here
    // console.log(exactTime);
    temperatureField.innerText = temperature;
    cityField.innerText = city;
    dateField.innerText = `${exactTime} - ${getDayFullName(exactDay)} ${exactDate }`;
    emojiField.src = emoji;
    weatherField.innerText = text;
};

fetchData(target);
//function to search the location
function search(e) {
    e.preventDefault();

    target = searchField.value;
   fetchData(target);
}
//function to get the name of the day
function getDayFullName (num){
    switch (num) {
        case 0:
            return "Sunday";
            break;
        case 1:
            return "Monday";
            break;
        case 2:
            return "Tuesday";
            break;
        case 3:
            return "Wednesday";
            break;
        case 4:
            return "Thursday";
            break;
        case 5:
            return "Friday";
            break;  
        case 6:
            return "Saturday";
            break;  
    
        default:
           return "Don't Know the day";
    }
}
