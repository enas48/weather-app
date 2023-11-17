$(document).ready(function () {
  $("#submit").click(function (e) {
    e.preventDefault();
    var validate = Validate();
    $("#result").html(validate);
    if (validate.length == 0) {
      loadImg($("#search").val());
      $.ajax({
        type: "POST",
        url:
          "https://api.weatherapi.com/v1/current.json?key=b0e209df6cd347af9a9173024231611&q=" +
          $("#search").val(),
        dataType: "json",
        success: function (result, status, xhr) {
          console.log(result);
          //   setInterval(getTime, 1000)

          var content = $("<div>");
          content.append(`<div class="temp-container desc-card ">
             
                     <div class="temp-content">
                     <span class="deg">${result.current.temp_c}°C</span>
                     <div class="temp">
                            <img src="${result.current.condition.icon}" /> 
                             <span>${result.current.condition.text}</span>
                         </div>
                     </div>         
                 </div>`);
          content.append(` <div class="temp-details">
                 <div class="desc-card">
                 
                 <span class="desc">
                 <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8,5H4A1,1,0,0,1,4,3H8A1,1,0,0,1,8,5ZM8,7H6A1,1,0,0,0,6,9H8A1,1,0,0,0,8,7Zm13,9a6,6,0,1,1-9-5.191V5a3,3,0,0,1,6,0v5.809A5.992,5.992,0,0,1,21,16Zm-3,0a2.99,2.99,0,0,0-2-2.816V5a1,1,0,0,0-2,0v8.184A2.995,2.995,0,1,0,18,16Z"/></svg>
                 <span> FEELS LIKE</span></span>
                 <span class="deg_2">${result.current.feelslike_c}°</span>
                 </div>
                 <div class="desc-card">
                 <span class="desc"><i class="fa-solid fa-wind"></i> WIND</span>
                 <span class="deg_2">${result.current.wind_mph} MPH</span> 
                         
                 </div>
                 <div class="desc-card">
                 <span class="desc"><i class="fa-solid fa-eye"></i> VISIBILITY</span>
                 <span class="deg_2">${result.current.vis_miles} mi</span>
                 </div>
                 <div class="desc-card">
                 <span class="desc">
                 <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M9 18.2c0-2.8 3-5.2 3-5.2s3 2.4 3 5.2c0 2-1.125 2.8-3 2.8s-3-.8-3-2.8zM6 3S3 5.4 3 8.2c0 2 1.125 2.8 3 2.8s3-.8 3-2.8C9 5.4 6 3 6 3zm12 0s-3 2.4-3 5.2c0 2 1.125 2.8 3 2.8s3-.8 3-2.8C21 5.4 18 3 18 3z"/></svg>
                 <span> HUMIDITY</span>
                 </span>
                 <span class="deg_2">${result.current.humidity}%</span>
                 </div>
               </div>
             `);
          content.append(`   
               <div class="desc-card time">
               <p><i class="fa-solid fa-location-dot" ></i> ${
                 result.location.name
               }, ${result.location.country} </p>
         
              <p >${getTime(result.location.localtime)}</p>
               <p class='date'>${getDate(result.location.localtime)}</p>
             </div>`);

          $("#result").html(content);
        },
        error: function (xhr, status, error) {
          $("#result").html("Result: " + "not found");
        },
      });
    }
  });

  $(document).ajaxStart(function () {
    $(".loading-container").show();
  });

  $(document).ajaxStop(function () {
    $(".loading-container").hide();
  });
  function loadImg(search) {
    const url = `https://api.unsplash.com/search/photos?query=${search}&per_page=20&client_id=947acf658be88481c212bf99e6314cf6a0c4942b1c7bbbf79ac2416d6a1ed5f0`;
    const imageDiv = $(".bg");

    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        imageDiv.html(`<img src=${data.results[0].urls.regular} >`);
      });
  }

  function getDate(date) {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    var d = new Date(date);
    let day = days[d.getDay()];
    let month = months[d.getMonth()];
    let currentdate = d.getDate();
    let year = d.getFullYear();
    let fulldate = `${day}, ${month} ${currentdate}, ${year}`;
    return fulldate;
  }

  function getTime(date) {
    var d = new Date(date);
    let time = d.toLocaleTimeString();
    return time;
  }



  function Validate() {
    var errorMessage = "";
    console.log($("#search").val());
    if ($("#search").val() == "") {
      errorMessage += "Enter City";
    }
    return errorMessage;
  }
});
