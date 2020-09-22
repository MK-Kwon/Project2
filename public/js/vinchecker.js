let car = {};
let motorcycle = {};
const favoritesBtn = $(".add-to-favorites");
const favoritesMarker = $("#favoritesMarker");
const faveVehiclesEl = $("#listOfFaveVehicles");

let html;

$(".vin-search").click(function () {
    const data = $("#vin-input").val();
    console.log(data);
    vinchecker(data);
});

$("#modal-right").click(function() {
    $("#vehicle-display").empty();
    $("#vin-input").val("");
});

favoritesBtn.click(function () {
    postFavorite();
});

const vinchecker = function (vin) {
    const queryUrl = `https://cors-ut-bootcamp.herokuapp.com/https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/${vin}?format=json`;
    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function (response) {

        console.log(response);

        if (response.Results[13].Value !== "MOTORCYCLE") {

            let carSearch = {
                category: "Car",
                make: response.Results[6].Value,
                model: response.Results[8].Value,
                year: response.Results[9].Value,
                series: response.Results[11].Value,
                plant: response.Results[14].Value
            };
            html = `
            <style>
            table, th, td {
            border: 1px solid black;
            }
            table {
                font-family: 'Arial';
                margin: 25px auto;
                border-collapse: collapse;
                border: 1px solid #eee;
                border-bottom: 2px solid #00cccc;
                box-shadow: 0px 0px 20px rgba(0,0,0,0.10),
                   0px 10px 20px rgba(0,0,0,0.05),
                   0px 20px 20px rgba(0,0,0,0.05),
                   0px 30px 20px rgba(0,0,0,0.05);
                }
            th, td {
                color: #999;
                border: 1px solid #eee;
                padding: 12px 35px;
                border-collapse: collapse;
                }
            th {
                background: #00cccc;
                color: #fff;
                text-transform: uppercase;
                font-size: 12px;
                &.last {
                border-right: none;
                    }
                }
                   
            </style>
            <table>
            <tr>
            <th>Make</th>
            <th>Model</th>
            <th>Year</th>
            <th>Series</th>
            <th>Plant</th>
            </tr>
            <tr>
            <td id="vehicle-make">${carSearch.make}</td>
            <td id="vehicle-model">${carSearch.model}</td>
            <td id="vehicle-year">${carSearch.year}</td>
            <td id="vehicle-series">${carSearch.series}</td>
            <td id="vehicle-plant">${carSearch.plant}</td>
            </tr>
            </table>
            `;
            $("#vehicle-display").empty();
            $("#vehicle-display").append(html);
            car = carSearch;
            console.log(car);
        } else {
            console.log("It's a motorbike!");
            let bikeSearch = {

                category: "Motorbike",
                make: response.Results[6].Value,
                model: response.Results[8].Value,
                year: response.Results[9].Value,
                plant: response.Results[14].Value,
                series: response.Results[11].Value
            };
            html = `
            <style>
            table, th, td {
            border: 1px solid black;
            }
            table {
                font-family: 'Arial';
                margin: 25px auto;
                border-collapse: collapse;
                border: 1px solid #eee;
                border-bottom: 2px solid #00cccc;
                box-shadow: 0px 0px 20px rgba(0,0,0,0.10),
                   0px 10px 20px rgba(0,0,0,0.05),
                   0px 20px 20px rgba(0,0,0,0.05),
                   0px 30px 20px rgba(0,0,0,0.05);
                }
            th, td {
                color: #999;
                border: 1px solid #eee;
                padding: 12px 35px;
                border-collapse: collapse;
                }
            th {
                background: #00cccc;
                color: #fff;
                text-transform: uppercase;
                font-size: 12px;
                &.last {
                border-right: none;
                    }
                }
                   
            </style>
            <table>

            <tr>
            <th>Make</th>
            <th>Model</th>
            <th>Year</th>
            <th>Series</th>
            <th>Plant</th>
            </tr>

            <tr>
            <td id="vehicle-make">${bikeSearch.make}</td>
            <td id="vehicle-model">${bikeSearch.model}</td>
            <td id="vehicle-year">${bikeSearch.year}</td>
            <td id="vehicle-series">${bikeSearch.series}</td>
            <td id="vehicle-plant">${bikeSearch.plant}</td>
            </tr>

            </table>
            `;
            $("#vehicle-display").empty();
            $("#vehicle-display").append(html);
            motorcycle = bikeSearch;
            console.log(motorcycle);
        }
    }).then(function () {
        favoritesBtn.attr("style", "display: block");
    })
        .catch(function (err) {
            console.log(err);
        });
};

function postFavorite() {
    const fav = {
        category: $("#vehicle-category").text(),
        make: $("#vehicle-make").text(),
        model: $("#vehicle-model").text(),
        year: $("#vehicle-year").text(),
        plant: $("#vehicle-plant").text(),
        series: $("#vehicle-series").text()
    };
    console.log(fav);
    $.post("/api/favorites", fav)
        .then(function () {
            console.log("Favorite posted!");
        });
}

favoritesMarker.click(function() {
    console.log("Displaying Favorites On The Page");
    faveVehiclesEl.empty();
    $.get("/api/favorites", function(data, res) {
        console.log(res);
        for (var i = 0; i < data.length; i++) {

            
            html = `
            <style>
            table, th, td {
            border: 1px solid black;
            }
            table {
                font-family: 'Arial';
                margin: 25px auto;
                border-collapse: collapse;
                border: 1px solid #eee;
                border-bottom: 2px solid #00cccc;
                box-shadow: 0px 0px 20px rgba(0,0,0,0.10),
                   0px 10px 20px rgba(0,0,0,0.05),
                   0px 20px 20px rgba(0,0,0,0.05),
                   0px 30px 20px rgba(0,0,0,0.05);
                }
            th, td {
                color: #999;
                border: 1px solid #eee;
                padding: 12px 35px;
                border-collapse: collapse;
                }
            th {
                background: #00cccc;
                color: #fff;
                text-transform: uppercase;
                font-size: 12px;
                &.last {
                border-right: none;
                    }
                }
                   
            </style>
            <table>
            <tr>
            <th>Make</th>
            <th>Model</th>
            <th>Year</th>
            <th>Series</th>
            <th>Plant</th>
            </tr>
            <tr>
            <td>${data[i].make}</td>
            <td>${data[i].model}</td>
            <td>${data[i].year}</td>
            <td>${data[i].series}</td>
            <td>${data[i].plant}</td>
            </tr>
            </table>
            `;

            faveVehiclesEl.append(html);
        }
    });  
});

