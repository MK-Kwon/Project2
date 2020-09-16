$(document).ready(() => {

  const eventBriteBtnEl = $("#eventBriteBtn");
  // const eventFrameEl = $("#eventBriteFrame");
  // const eventBriteDivEl = $("#eventBriteDiv");

  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page

  $.get("/api/user_data").then((data) => {
    $(".member-name").text(data.email);
  });
  $(".slider").click(function () {
    $("#backgroundImageInDiv").toggleClass("active");
  });

  $(eventBriteBtnEl).on("click", () => {
    // console.log("Creating Event Frame");
    // eventFrameEl.attr("src", "https://www.eventbrite.com/oauth/authorize?response_type=code&client_id=XRZT3J35M2JMHLMTMMNH&redirect_uri=https://www.eventbrite.com.au/d/australia/motorcycle-show/");
    // eventBriteDivEl.append(eventFrameEl);
    eventBrite();
  });

  function eventBrite() {
    $.ajax({
      method: "GET",
      header: ("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept"),
      url: "https://cors-ut-bootcamp.herokuapp.com/https://www.eventbrite.com/oauth/authorize?response_type=code&client_id=XRZT3J35M2JMHLMTMMNH&redirect_uri=https://www.eventbrite.com.au/",
      headers: {
        "Authorization": "Bearer XRZT3J35M2JMHLMTMMNH",
      }
    }).then(function(response) {
      console.log(response);
    });
  }

});
