const form = document.querySelector('form');
const cname = document.getElementById('city');
const date = document.getElementById('date');
const temp = document.getElementById('temp');
const weather = document.getElementById('weather');
const min_max = document.getElementById('min_max');

const options = {weekday:"long", month:"short", day:"numeric", year:"numeric"};
const today = new Date();

function getWeather(city){

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=80538991ca1f89a36a902c5fdbae9949&units=metric`;

    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            cname.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${data.name}, ${data.sys.country}`;
            
            date.innerHTML = today.toLocaleDateString("en-US", options);

            temp.innerHTML = `${Math.round(data.main.temp)}<span>°C</span>`;

            min_max.innerText = `${Math.round(data.main.temp_min)}°C / ${Math.round(data.main.temp_max)}°C`;

            weather.innerText = data.weather[0].description.toUpperCase();
            getImage(data.weather[0].description);
            
        })
        .catch((err) => {
            cname.innerText = `Please enter a valid location!`
            date.innerHTML = "";
            temp.innerHTML = "";
            min_max.innerText = "";
            weather.innerText = "";
        });
}

function getImage(w){
    if (w.includes("clear")){
        document.body.style.backgroundImage = "url('https://media.istockphoto.com/photos/view-of-a-green-meadow-with-blue-flowers-on-a-sunny-day-picture-id173936056?b=1&k=20&m=173936056&s=170667a&w=0&h=-dyn96uJxXTHRaALnizqaxik4UHC9SbKphhf7I9B2d8=')";
    }
    else if(w.includes("overcast")){
        document.body.style.backgroundImage = "url('https://media.istockphoto.com/photos/dramatic-sky-picture-id904784522?b=1&k=20&m=904784522&s=170667a&w=0&h=dvcJZp9X09PZsZz5_-baxI8BKZhaA_UPh-KAz2uVFTI=')"
    }
    else if(w.includes("clouds")){
        document.body.style.backgroundImage = "url('https://media.istockphoto.com/photos/beautiful-summer-sky-picture-id482466808?b=1&k=20&m=482466808&s=170667a&w=0&h=ILkqIdeEZ8mbcb4meYl6Zwgbe0aZhsfyLbrqtOzw-JU=')";
    }
    else if(w.includes("haze")){
        document.body.style.backgroundImage = "url('https://images.unsplash.com/36/STzPBJUsSza3mzUxiplj_DSC09775.JPG?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80')";
    }
    else if(w.includes("mist")){
        document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1485236715568-ddc5ee6ca227?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bWlzdHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60')";
    }
    else if(w.includes("rain")){
        document.body.style.backgroundImage = "url('https://media.istockphoto.com/photos/transparent-umbrella-under-rain-against-water-drops-splash-background-picture-id1257951336?b=1&k=20&m=1257951336&s=170667a&w=0&h=N_dkdVEznSiN43vNpVzjnnk8xUi4lg1IFK19JXxo5Zg=')";
    }
    else if(w.includes("snow")){
        document.body.style.backgroundImage = "url('https://media.istockphoto.com/photos/winter-scene-snowfall-on-the-blurred-background-picture-id863513024?b=1&k=20&m=863513024&s=170667a&w=0&h=jfvMa1VP8OQ-1HwQfGqZv58PfuR1YZjRVGzyyJKdDzk=')";
    }
    else{
        document.body.style.backgroundImage = "url('https://media.istockphoto.com/photos/view-of-a-green-meadow-with-blue-flowers-on-a-sunny-day-picture-id173936056?b=1&k=20&m=173936056&s=170667a&w=0&h=-dyn96uJxXTHRaALnizqaxik4UHC9SbKphhf7I9B2d8=')";
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const city = form.elements[0].value;

    getWeather(city);

    form.elements[0].value = "";
})
