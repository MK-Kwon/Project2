$(document).ready(function() {
    $("#nhtsa-btn").click(function() {
        const make = $("#userMake").val();
        const model = $("#userModel").val();
        const year = $("#userYear").val();
        recallSearch(make, model, year);
    });

    function recallSearch(make, model, year) {
        $.ajax({
            url: `https://cors-ut-bootcamp.herokuapp.com/https://one.nhtsa.gov/webapi/api/Recalls/vehicle/modelyear/${year}/make/${make}/model/${model}?format=json`,
            type: "GET"
        }).done(function(response) {
            $("#recallResults").empty();
            console.log(response);
            if(response.Count == 0) {

                $("#recallResults").text("Number Of Open Recalls: 0");

            } else {
                for(let i = 0; i < response.Results.length; i++) {
                    const recall = response.Results[i];
                    let recallSearch = `
                
                <style>
                span.textBox {
                    font-size: 16px;
                }
                </style>
                <h4>*Year: <span class="textBox">${recall.ModelYear}</span></h4>
                <h4>*Make: <span class="textBox">${recall.Make}</span></h4>
                <h4>*Model: <span class="textBox">${recall.Model}</span></h4>
                <h4>*Component: <span class="textBox">${recall.Component}</span></h4>
                <h4>*Summary: <span class="textBox">${recall.Summary}</span></h4>
                <h4>*Solution: <span class="textBox">>${recall.Remedy}</span></h4>
                
                    `;
                    $("#recallResults").append(recallSearch);
                }
            }
        });
    }
});