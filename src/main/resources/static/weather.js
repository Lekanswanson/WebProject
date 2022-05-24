//use $ sign to get elements by their id
var $ = function(id) 
{
    return document.getElementById(id);
}

//set some global variables to use for various functions
resultsA = {};
var myresultsA = [];
resultsB = {};
var myresultsB = [];
var lastcity;
var city;
var newcity;
var resetCity;
var unit = "";
var isempty = new Boolean(false);
var windspeed;

//function to search for weather info for any city
function getweather(city)
{
    var weather = new XMLHttpRequest(); //new xhr request using weather as variable
    var forecast = new XMLHttpRequest();//five day forecast
    city =  $("textCity").value;

    //check if input field is empty
    if(city==="")
    {
        //display error message if field empty
        $("errormsg").style.left = "0%";
        $("showhide").style.display = "none";
        $("errormsg").innerHTML = "<h5 id='myerr'>Enter a valid city.</h2>"
        $("textCity").value = "";
        isempty = true; 
    }
    else
    {
        lastcity = city;  //sets lastcity to city, used when changing metrics and input field is clear
        var url = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=" + unit + "&appid=0a7ec1a823791cdf5ad819bb1f34a26c"; //city and unit concatenated, allows user to input
        var url2 = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=" + unit + "&cnt=40&appid=0a7ec1a823791cdf5ad819bb1f34a26c"; //city and also change metrics
        $("errormsg").innerHTML = "";
        $("showhide").style.display = "initial";
        $("errormsg").style.left = "50%";           //clears error message
        $("textCity").value = "";
        isempty = false;

        if(isempty==false)
        {
            weather.onreadystatechange = function() //xhp inbuilt onreadystatechange function to send request to server
            {
                parseResponse(weather);  //the fucntion to parse the request if successful  
            }
    
            weather.open("GET", url, true);
            weather.send();
        }

        if(isempty==false)
        {
            forecast.onreadystatechange = function()
            {
                parseForecast(forecast);
            }
    
            forecast.open("GET", url2, true);   //open a GET request to server at url
            forecast.send(); //send request
        }
    }
}


function parseForecast(forecast)
{
    //if request state is 4 which signifies request is complete
    if(forecast.readyState==4)
    {
        if(forecast.status==200 || forecast.status==304)
        {
            fdata = JSON.parse(forecast.response); //parse the response
            showForecast(); //function to display forecast for 5 days
        }
        else if(forecast.status==400)
        {
            $("errormsg").style.left = "0%";
            $("showhide").style.display = "none";
            $("errormsg").innerHTML = "<h5 id='myerr'>Unable to find city.</h2>"
            $("textCity").value = "";
        } 
    }
}
function parseResponse(weather)
{
    if(weather.readyState==4)
    {
        if(weather.status==200 || weather.status==304)
        {
            var display = $("display");
            var widget = showCurrent(weather);
            display.innerHTML = widget;
        }
        else if(weather.status==400 || weather.status==404)
        {
            $("errormsg").style.left = "0%";
            $("showhide").style.display = "none";
            $("errormsg").innerHTML = "<h5 id='myerr'>Unable to find city.</h2>" //display error message if request fails
            $("textCity").value = "";
        }
    }
}

//get the number day of the week and converts it to the String day
function dayofweek(day)
{
    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    return weekday[day]; //returns the day in string format
}
function dayOne(range)
{   
    //get values from file, range value upates every 10 seconds. This is to show all 5day/3hour forecast
    var today = fdata.list[range].dt_txt;
    var img = fdata.list[range].weather[0].icon;
    var icon = "<img id='icon' src='http://openweathermap.org/img/w/" + img + ".png'>";
    const temp = fdata.list[range].main.temp;
    const weatherdescrip = fdata.list[range].weather[0].description;

    var currentday = new Date(today);
    var day = currentday.getDay();
    var stringday = dayofweek(day);

    //change the symbol when metric is changes
    if(unit=="metric")
    {
        unit="C";
    }
    else if (unit=="imperial")
    {
        unit="F"
    }
    else if(unit=="")
    {
        unit="K";
    }
    //return values
    return "<h4>" + stringday +"<br>"+ today +  "</h4>"+
           "<h4>" + icon + "</h4>"+
           "<h4> Temp: " + temp + "&#176;" + unit + "</h4>"+
           "<h4> Description: " + weatherdescrip + "</h4>";  
}

function dayTwo(range)
{
    var today = fdata.list[range].dt_txt;
    var img = fdata.list[range].weather[0].icon;
    var icon = "<img id='icon' src='http://openweathermap.org/img/w/" + img + ".png'>";
    const temp = fdata.list[range].main.temp;
    const weatherdescrip = fdata.list[range].weather[0].description;

    var currentday = new Date(today);
    var day = currentday.getDay();
    var stringday = dayofweek(day);

    if(unit=="metric")
    {
        unit="C";
    }
    else if (unit=="imperial")
    {
        unit="F"
    }
    else if(unit=="")
    {
        unit="K";
    }

    return "<h4>" + stringday +"<br>"+ today +  "</h4>"+
           "<h4>" + icon + "</h4>"+
           "<h4> Temp: " + temp + "&#176;" + unit + "</h4>"+
           "<h4> Description: " + weatherdescrip + "</h4>";  
}

function dayThree(range)
{
    var today = fdata.list[range].dt_txt;
    var img = fdata.list[range].weather[0].icon;
    var icon = "<img id='icon' src='http://openweathermap.org/img/w/" + img + ".png'>";
    const temp = fdata.list[range].main.temp;
    const weatherdescrip = fdata.list[range].weather[0].description;

    var currentday = new Date(today);
    var day = currentday.getDay();
    var stringday = dayofweek(day);

    if(unit=="metric")
    {
        unit="C";
    }
    else if (unit=="imperial")
    {
        unit="F"
    }
    else if(unit=="")
    {
        unit="K";
    }

    return "<h4>" + stringday +"<br>"+ today +  "</h4>"+
           "<h4>" + icon + "</h4>"+
           "<h4> Temp: " + temp + "&#176;" + unit + "</h4>"+
           "<h4> Description: " + weatherdescrip + "</h4>";  

}
function dayFour(range)
{
    var today = fdata.list[range].dt_txt;
    var img = fdata.list[range].weather[0].icon;
    var icon = "<img id='icon' src='http://openweathermap.org/img/w/" + img + ".png'>";
    const temp = fdata.list[range].main.temp;
    const weatherdescrip = fdata.list[range].weather[0].description;

    var currentday = new Date(today);
    var day = currentday.getDay();
    var stringday = dayofweek(day);

    if(unit=="metric")
    {
        unit="C";
    }
    else if (unit=="imperial")
    {
        unit="F"
    }
    else if(unit=="")
    {
        unit="K";
    }

    return "<h4>" + stringday +"<br>"+ today +  "</h4>"+
           "<h4>" + icon + "</h4>"+
           "<h4> Temp: " + temp + "&#176;" + unit + "</h4>"+
           "<h4> Description: " + weatherdescrip + "</h4>";  

}
function dayFive(range)
{
    var today = fdata.list[range].dt_txt;
    var img = fdata.list[range].weather[0].icon;
    var icon = "<img id='icon' src='http://openweathermap.org/img/w/" + img + ".png'>";
    const temp = fdata.list[range].main.temp;
    const weatherdescrip = fdata.list[range].weather[0].description;

    var currentday = new Date(today);
    var day = currentday.getDay();
    var stringday = dayofweek(day);

    if(unit=="metric")
    {
        unit="C";
    }
    else if (unit=="imperial")
    {
        unit="F"
    }
    else if(unit=="")
    {
        unit="K";
    }

    return "<h4>" + stringday +"<br>"+ today +  "</h4>"+
           "<h4>" + icon + "</h4>"+
           "<h4> Temp: " + temp + "&#176;" + unit + "</h4>"+
           "<h4> Description: " + weatherdescrip + "</h4>";  
}

//initial values of each days weather, each panel displays 8(hours)
let i = 0;
let i2 = 8;
let i3 = 16;
let i4 = 24;
let i5 = 32;

//timer function to update values
function updateValue()
{
    setTimeout(function run() {
        i++;
        i2++;
        i3++
        i4++;
        i5++;

        if(i==8) //reset so values don't go out of index
        {
            i = 0;
            i2 = 8;
            i3 = 16;
            i4 = 24;
            i5 = 32;   
        }
    time = setTimeout(run, 10000); //recursive countdown timer, calls back on itself every 10 seconds
    }, 0);
}

//display the forcesat
function showForecast()
{
    setTimeout(function run() {
        var displayday1 = $("day1");
        var displayday2 = $("day2");
        var displayday3 = $("day3");
        var displayday4 = $("day4");
        var displayday5 = $("day5");
    
        var day1 = dayOne(i);
        displayday1.innerHTML = day1;
    
        var day2 = dayOne(i2);
        displayday2.innerHTML = day2;
    
        var day3 = dayOne(i3);
        displayday3.innerHTML = day3;
    
        var day4 = dayOne(i4);
        displayday4.innerHTML = day4;
    
        var day5 = dayOne(i5);
        displayday5.innerHTML = day5;
    setTimeout(run, 2000); //check to see if value has changed every 2 secinds
    }, 0);

}

//display the current weather for the city
function showCurrent(weather)
{
    data = JSON.parse(weather.response);

    var country = data.sys.country
    var name = data.name
    var main = data.weather[0].main
    var img = data.weather[0].icon
    var descrip = data.weather[0].description
    var temp = data.main.temp
    var min_temp = data.main.temp_min
    var max_temp = data.main.temp_max
    var humid = data.main.humidity
    var wspeed = data.wind.speed
    var wdeg = data.wind.deg
    var cloudiness = data.clouds.all

    var displayimg = "<img id='icon' src='http://openweathermap.org/img/w/" + img + ".png'>"

    resultsA.myresultsA = myresultsA;
   
    var tmp = temp;
    var mintemp = min_temp;
    var maxtemp = max_temp;
    var wind = wspeed;
    var humidity = humid;
    var clouds = cloudiness;

    var firstRes = {
    "Temp": tmp,
    "Min_Temp": mintemp,
    "Max_Temp": maxtemp,
    "wind_speed": wind,
    "Humidity": humidity/10,  //Values in percent so covert to base 10
    "Cloudiness": clouds/10,
    "Country": name //didnt realise i could have just dont this 
    }
    resultsA.myresultsA.push(firstRes);
    console.log(JSON.stringify(resultsA))
    localStorage.setItem('fileA', JSON.stringify(resultsA));

    if(unit=="metric")
    {
        unit="C";
        windspeed = "m/s";
    }
    else if (unit=="imperial")
    {
        unit="F"
        windspeed = "M/h";
    }
    else if(unit=="")
    {
        unit="K";
        windspeed = "m/s";
    }

    return"<h3 class='heading'> Displaying weather information for <br>" + name  + ", " + country + "</h3><br><br>"+
          "<h2>Weather:   " + main + displayimg + "</h2>"  +
          "<h2> Description:   " + descrip + "</h2>"+
          "<h2> Min Temperature:   " + min_temp + "&#176;" + unit + "</h2>"+
          "<h2> Max Temperature:   " + max_temp + "&#176;"+unit+"</h2>"+
          "<h2> Temperature:   " + temp + "&#176;"+unit+"</h2>"+
          "<h2> Humidity:   " + humid + "%</h2>"+
          "<h2> Cloudiness:   " + cloudiness + "%</h2>"+
          "<h2> Wind Speed:   " + wspeed + " " + windspeed +"</h2>"+
          "<h2> Wind Direction:   " + wdeg + "&#176;</h2>";
}

//to compare weather to another city
function compareCities(newcity)
{
    weatherCompare = new XMLHttpRequest();
    newcity =  $("city2").value;

    if(newcity==="")
    {
        $("city2").value = "";
        isempty = true;
    }
    else
    {
        var url3 = "http://api.openweathermap.org/data/2.5/weather?q=" + newcity + "&units=" + unit + "&appid=0a7ec1a823791cdf5ad819bb1f34a26c";
        resetCity=newcity;
        $("city2").value = "";
        isempty = false;
    }

    if(isempty==false)
    {
        weatherCompare.onreadystatechange = function()
        {
            parse(weatherCompare);
        }

        weatherCompare.open("GET", url3, true);
        weatherCompare.send();
    }
}
function parse(weatherCompare)
{
    if(weatherCompare.readyState==4)
    {
        if(weatherCompare.status==200 || weatherCompare.status==304)
        {
            var display = $("displayinfo");
            var widget = goCompare();
            
            display.innerHTML = widget;
        }
    }
}
function goCompare()
{
    var data = JSON.parse(weatherCompare.response);

    var country = data.sys.country
    var name = data.name
    var main = data.weather[0].main
    var img = data.weather[0].icon
    var descrip = data.weather[0].description
    var temp = data.main.temp
    var min_temp = data.main.temp_min
    var max_temp = data.main.temp_max
    var humid = data.main.humidity
    wspeedb = data.wind.speed
    var wdeg = data.wind.deg
    var cloudiness = data.clouds.all

    var displayimg = "<img id='icon' src='http://openweathermap.org/img/w/" + img + ".png'>"

    resultsB.myresultsB = myresultsB;
   
    var tmp = temp;
    var mintemp = min_temp;
    var maxtemp = max_temp;
    var wind = wspeedb;
    var humidity = humid;
    var clouds = cloudiness;
    var cc = name;

    var result = {
    "Temp": tmp,
    "Min_Temp": mintemp,
    "Max_Temp": maxtemp,
    "wind_speed": wind,
    "Humidity": humidity/10,  //Values in percent so covert to base 10
    "Cloudiness": clouds/10,
    "Country": cc
    }
    resultsB.myresultsB.push(result);
    console.log(JSON.stringify(resultsB))
    localStorage.setItem('file', JSON.stringify(resultsB));

    if(unit=="metric")
    {
        unit="C";
        windspeed = "m/s";
    }
    else if (unit=="imperial")
    {
        unit="F"
        windspeed = "M/h";
    }
    else if(unit=="")
    {
        unit="K";
        windspeed = "m/s";
    }

    return"<h3 class='headingCompare'> Displaying weather information for <br>" + name  + ", " + country + "</h3>"+
          "<h2 class='mainCompare'>Weather:   " + main + displayimg + "</h2>"  +
          "<h2 class='mainCompare'> Description:   " + descrip + "</h2>"+
          "<h2 class='mainCompare'> Min Temperature:   " + min_temp + "&#176;" + unit + "</h2>"+
          "<h2 class='mainCompare'> Max Temperature:   " + max_temp + "&#176;"+unit+"</h2>"+
          "<h2 class='mainCompare'> Temperature:   " + temp + "&#176;"+unit+"</h2>"+
          "<h2 class='mainCompare'> Humidity:   " + humid + "%</h2>"+
          "<h2 class='mainCompare'> Cloudiness:   " + cloudiness + "%</h2>"+
          "<h2 class='mainCompare'> Wind Speed:   " + wspeedb + " " + windspeed +"</h2>"+
          "<h2 class='mainCompare'> Wind Direction:   " + wdeg + "&#176;</h2>";
}


function clearPlaceholder(x)
{
    x.placeholder = ""
}
function resetPlaceholder(x)
{
    x.placeholder = "...search weather from all around the world..."
}

//sidenav method from w3schools adapted for my need
function openNav() {
    document.getElementById("sideNav").style.width = "400px"; //makes the sidenav 400px bigger
    document.getElementById("maingrid").style.marginLeft = "400px"; //moves the page 400 px to the right
    document.getElementById("btnnav").style.display = "none";
    document.getElementById("maingrid").style.opacity = "0.5";
}
function closeNav() {
    document.getElementById("sideNav").style.width = "0";
    document.getElementById("maingrid").style.marginLeft = "0";
    document.getElementById("btnnav").style.display = "initial";
    document.getElementById("maingrid").style.opacity = "1";
}

function displayChart()
{
    canv = $("myChart").getContext('2d');

    var data = localStorage.getItem('file');
    var info = JSON.parse(data)

    var dataA = localStorage.getItem('fileA');
    var infoA = JSON.parse(dataA)

    var a = info.myresultsB[0].Temp
    var b = info.myresultsB[0].Max_Temp
    var c = info.myresultsB[0].Min_Temp
    var d = info.myresultsB[0].wind_speed
    var e = info.myresultsB[0].Humidity
    var f = info.myresultsB[0].Cloudiness
    var g = info.myresultsB[0].Country

    var a1 = infoA.myresultsA[0].Temp
    var b1 = infoA.myresultsA[0].Max_Temp
    var c1 = infoA.myresultsA[0].Min_Temp
    var d1 = infoA.myresultsA[0].wind_speed
    var e1 = infoA.myresultsA[0].Humidity
    var f1 = infoA.myresultsA[0].Cloudiness
    var g1 = infoA.myresultsA[0].Country

    var myChart = new Chart(canv, {
        type: 'radar',
        data: {
            labels: ['Min Temp','Max Temp','Temp','Humidity','Cloudiness','Wind-Speed'],
            datasets: 
            [
                {
                    label: g,
                    data: [c1, b1, a1, e1, f1, d1], 
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderWidth: 1,
                    borderColor: 'rgba(255, 99, 132, 1)',
                },
                {
                    label: g1,
                    data: [c, b, a, e, f, d],
                    backgroundColor: 'rgba(88, 129, 174, 0.2)',
                    borderWidth: 1,
                    borderColor: 'rgba(205, 129, 12, 1)',
                }
            ]      
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}

window.addEventListener('load', function() 
{
    displayChart();
});
  

window.onload = function()
{
    updateValue();
    
    $("btnSearch").onclick = function()
    {
        unit = "metric";
        getweather(city);
		return false;
    }
    $("compare").onclick = function()
    {
        unit = "metric"
        compareCities(newcity);
		return false;
    }

    //buttons for changing metrics
    $("Imperial").onclick = function()
    {
        unit = "imperial";
        $("textCity").value = lastcity;
        $("city2").value = resetCity;

        $("errormsg").innerHTML = "";
        $("showhide").style.display = "initial";
        $("errormsg").style.left = "50%";
        isempty = false;
        getweather(lastcity); 
        compareCities(resetCity, "imperial")
		return false;
    }
    $("Standard").onclick = function()
    {
        unit = "";
        $("textCity").value = lastcity;
        $("city2").value = resetCity;

        $("errormsg").innerHTML = "";
        $("showhide").style.display = "initial";
        $("errormsg").style.left = "50%";
        isempty = false;
        getweather(lastcity); 
        compareCities(resetCity,"")
		return false;
    }
    $("Metric").onclick = function()
    {
        unit = "metric";
        $("textCity").value = lastcity;
        $("city2").value = resetCity;

        $("errormsg").innerHTML = "";
        $("showhide").style.display = "initial";
        $("errormsg").style.left = "50%";
        isempty = false;
        getweather(lastcity); 
        compareCities(resetCity,"metric");
		return false;
    }
}