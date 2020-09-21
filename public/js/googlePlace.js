const googleBtnEl = $("#googleBtn");
const googleDivEl = $("#googleDiv");

$(googleBtnEl).on("click", function () {
    googleDivEl.empty();
    console.log("Google Map");

    $.ajax("/api/events/cars").done(function (response) {
        console.log(response);

        for (let i = 0; i < 10; i++) {

            const name = $("<h3>").text(i + 1 + ". " + response[i].name);
            googleDivEl.append(name);

            const address = $("<p>").text("*Address: " + response[i].formatted_address);
            googleDivEl.append(address);

            const userRatings = $("<p>").text("*User Ratings: " + response[i].user_ratings_total);
            const userRatingsCss = $(userRatings).css("font-style", "italic");
            googleDivEl.append(userRatingsCss);

            if (response[i].photos) {
                const bizInfoUrlSlice = response[i].photos[0].html_attributions[0].slice(9, 67);
                const bizInfoUrl = $("<a>").attr("href", bizInfoUrlSlice).attr("target", "_blank");
                bizInfoUrl.text("More Info About The Event");
                googleDivEl.append(bizInfoUrl);
            }
        }

    });

});


