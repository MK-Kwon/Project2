function eventBrite() {
    $.ajax({
        url: "https://www.eventbrite.com/oauth/authorize?response_type=code&client_id=XRZT3J35M2JMHLMTMMNH&redirect_uri=https://www.eventbrite.com.au/d/australia/motorcycle-show/",
        methord: "GET"
    }).then(function(response) {
        console.log(response);
    });
}

eventBrite();

console.log(eventBrite());