//event listeners for add user and search city buttons
$(document).ready(function() {
  //adding event listeners and attaching functions
  $(document).on("click", "#add-user", addUser);
  $(document).on("click", "#search-btn", searchCity);
});

//initialize city to be an empty object
var city = {};

//autocomplete city search function
$(function () 
 {
   $("#f_elem_city").autocomplete({
    source: function (request, response) {
     $.getJSON(
      "http://gd.geobytes.com/AutoCompleteCity?callback=?&q="+request.term,
      function (data) {
       response(data);
      }
     );
    },
    minLength: 3,
    select: function (event, ui) {
     var selectedObj = ui.item;
     $("#f_elem_city").val(selectedObj.value);
    getcitydetails(selectedObj.value);
     return false;
    },
    open: function () {
     $(this).removeClass("ui-corner-all").addClass("ui-corner-top");
    },
    close: function () {
     $(this).removeClass("ui-corner-top").addClass("ui-corner-all");
    }
   });
   $("#f_elem_city").autocomplete("option", "delay", 100);
  });
//end autocomplete

function addUser(event) {
  //prevent page from refreshing by default
  event.preventDefault();

  //if both user name & password are not yet taken
  if (checkNewUserName() && checkNewPassword()) {
    //check if password matches the confirm password
    var pass = $("#new-password-input").val();
    var passConfirm = $("#new-password-confirm-input").val();
    if(pass === passConfirm){
      var User = {
        firstName : $("#first-name-input").val().trim(), 
        lastName : $("#last-name-input").val().trim(),
        email: $("#email-input").val().trim(),
        userName: $("#new-username-input").val().trim(),
        password: pass,
      };

      $.post("api/users", User, function() {
        window.location.href = "/search";
      });
    }
    console.log(User);
  }
}

function checkNewUserName() {
  //grab the new user name from the form
  var newUserName = $("#new-username-input").val().trim();

  //submit a get request to the server to check whether the user name is already taken
  
}

function checkNewPassword() {
  //grab the new password from the form
  var newPassword = $("#new-password-confirm-input").val();

  //submit a get request to the server to check whether the password is already taken

}

//grab lat and lng from autocomplete
function searchCity() {
  console.log(city);
  $.post("/search", city, function(data) {
    console.log(data);
    initMap(city.location, data.results)
  });
} //end searchCity

function getcitydetails(fqcn) {  
  if (typeof fqcn == "undefined") fqcn = jQuery("#f_elem_city").val();
  cityfqcn = fqcn;
  if (cityfqcn) {
    $.getJSON("http://gd.geobytes.com/GetCityDetails?callback=?&fqcn="+cityfqcn, function (data) {
      city = {
        location: {
          lat: data.geobyteslatitude, 
          lng: data.geobyteslongitude
        },
        name: data.geobytescity
      }
    });
  } //end if statement
} //end get city details