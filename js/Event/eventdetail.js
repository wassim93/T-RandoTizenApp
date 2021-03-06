var retrievedObject;
retrievedObject = JSON.parse(localStorage.getItem("selectedEvent"));
var token = {
	    token: localStorage.getItem('access_token')
	}

//Bind hardware back button.
window.addEventListener('tizenhwkey', function onTizenHwKey(e) {
    if (e.keyName === 'back') {
    	window.history.back();
    }
});

function getEventDetail() {
    document.getElementById("imgprof").innerHTML = `<img class="profile-image" style="width:50px;height:50px;border-radius:50%" src="http://10.0.2.2:8000/image/${localStorage.getItem("profile_image")}" alt="profilepic" />`

    $("#eventTitle").html(retrievedObject["title"]);
    $("#depart").html('<i class="fa fa-map-marker" style="color: red;"></i>' + retrievedObject["point_depart"]);
    $("#destination").html('<i class="fa fa-map-marker" style="color: green;"></i>' + retrievedObject["point_arrive"]);
    $("#eventDesc").html(retrievedObject["description"]);
    $("#price").html(retrievedObject["prix"] + "DT");
    $("#phone").html(retrievedObject["contact"]);
    $("#date").html(retrievedObject["date"]);
    $("#places").html(retrievedObject["_nbr_places"] + "Places");
    if (retrievedObject["image"].length > 1) {
        showSlider(retrievedObject["image"]);
    } else {
        showOneImage(retrievedObject["image"]);
    }




    initMap();
    checkparticipate();
    LoadParticipant();
}

function showSlider(res) {
    var slider = document.getElementById("slider");

    for (var i = 0; i < res.length; i++) {
        var featureBox = document.createElement("div");
        featureBox.setAttribute("class", "col-md-12 features-box");
        var featureDetail = document.createElement("div");
        featureDetail.setAttribute("class", "features-detail");
        var image = document.createElement("img");
        image.setAttribute("src", "http://10.0.2.2:8088/trandobackend/web/bundles/images/" + res[i]["image"]);
        image.setAttribute("style", "height:270px;width:270px;");
        var a = document.createElement("a");
        a.setAttribute("href", "http://10.0.2.2:8088/trandobackend/web/bundles/images/" + res[i]["image"]);
        var i1 = document.createElement("i");
        i1.setAttribute("class", "fa fa-search");
        a.appendChild(i1);
        featureDetail.appendChild(image);
        featureDetail.appendChild(a);
        featureBox.appendChild(featureDetail);
        slider.appendChild(featureBox);


    }

    $("#slider").owlCarousel({
        loop: true,
        margin: 0,
        nav: true,
        dots: true,
        autoplay: true,
        responsive: {
            0: {
                items: 1
            },
            480: {
                items: 2
            },
            700: {
                items: 3
            },
            1200: {
                items: 4
            }
        }
    });
}

function showOneImage(res) {
    var slider = document.getElementById("slider");
    var featureBox = document.createElement("div");
    featureBox.setAttribute("class", "col-md-12 features-box");
    var featureDetail = document.createElement("div");
    featureDetail.setAttribute("class", "features-detail");
    var image = document.createElement("img");
    image.setAttribute("src", "http://10.0.2.2:8088/trandobackend/web/bundles/images/" + res[0]["image"]);
    image.setAttribute("style", "height:270px;width:270px;");
    var a = document.createElement("a");
    a.setAttribute("href", "http://10.0.2.2:8088/trandobackend/web/bundles/images/" + res[0]["image"]);
    var i1 = document.createElement("i");
    i1.setAttribute("class", "fa fa-search");
    a.appendChild(i1);
    featureDetail.appendChild(image);
    featureDetail.appendChild(a);
    featureBox.appendChild(featureDetail);
    slider.appendChild(featureBox);
}

// check user participation on load to change button style 
function checkparticipate() {
    var xhr = new XMLHttpRequest();
    var url = "http://10.0.2.2:8000/checkparticipate";
    xhr.open("POST", url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            //change button style
            var btn = document.getElementById("submitBtn");

            var res = JSON.parse(xhr.responseText);
            changeButtonStyle(btn, res);


        }
    };
    var data = JSON.stringify({ "token": token, "idevent": retrievedObject["id"] });
    xhr.send(data);

}
function participate() {
    var xhr = new XMLHttpRequest();
    var url = "http://10.0.2.2:8000/participate";
    xhr.open("POST", url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            //change button style
            var btn = document.getElementById("submitBtn");

            var res = JSON.parse(xhr.responseText);
            if (res["response"] === "participer") {
                btn.setAttribute("class", "btn btn-danger");
                btn.innerHTML = "Cancel";
                btn.setAttribute("onclick", "cancelParticipate();");
                $("#participantDiv").attr("style", "display:block;");
                LoadParticipant();
            }


        }
    };
    var data = JSON.stringify({ "token": token, "idevent": retrievedObject["id"] });
    xhr.send(data);

}

function changeButtonStyle(btn, res) {
    if (res["response"] == "true") {
        btn.setAttribute("class", "btn btn-danger");
        btn.innerHTML = "Cancel";
        btn.setAttribute("onclick", "cancelParticipate();")
    }

    else if (res["response"] == "false") {
        btn.setAttribute("class", "btn btn-success");
        btn.innerHTML = "Participate";
        btn.setAttribute("onclick", "participate();")

    }

}
function cancelParticipate() {
    var xhr = new XMLHttpRequest();
    var url = "http://10.0.2.2:8000/deletepart";
    xhr.open("POST", url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            //change button style
            var btn = document.getElementById("submitBtn");

            var res = JSON.parse(xhr.responseText);
            if (res["response"] == "true") {
                btn.setAttribute("class", "btn btn-success");
                btn.innerHTML = "Participate";
                btn.setAttribute("onclick", "participate();")
                //$("#" + retrievedObject["user"]["username"]).remove();
                $('#participantDiv li:last-child').remove();
                if ($("#participantDiv li").length >= 1) {
                    LoadParticipant();

                } else {
                    $("#participantDiv").attr("style", "display:none;");

                }
            }

        }
    };
    var data = JSON.stringify({ "token": token, "idevent": retrievedObject["id"] });
    xhr.send(data);
}

function LoadParticipant() {

    var xhr = new XMLHttpRequest();
    var url = "http://10.0.2.2:8000/GetEventParticipant/" + retrievedObject["id"];
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            if (response.length != 0) {
                showParticipantList(response);

            } else {
                // no result
                $("#participantDiv").attr("style", "display:none;");
                //$("#Results").attr("style", "display:none;");
            }

        } else {
            console.log("err" + response);
        }
    };
    xhr.send();

}

function showParticipantList(res) {
    var ul = document.getElementById("listPar");
    $("#listPar").empty();
    for (var i = 0; i < res.length; i++) {
        var li = document.createElement("li");
        li.setAttribute("class", "col-md-6 no-padding");
        li.setAttribute("id", res[i]["username"]);
        var image = document.createElement("img");
        image.setAttribute("class", "thumbnail");
        image.setAttribute("style", "width: 60px;height: 60px;border-radius: 60px;");
        image.setAttribute("src", "http://10.0.2.2:8088/trandobackend/web/bundles/images/" + res[i]["_profile_pic_url"]);
        li.appendChild(image);
        ul.appendChild(li);
    }

}


function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: { lat: -34.397, lng: 150.644 }
    });
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    directionsDisplay.setMap(map);



    calculateAndDisplayRoute(retrievedObject, directionsService, directionsDisplay);

}


function calculateAndDisplayRoute(retrievedObject, directionsService, directionsDisplay) {


    directionsService.route({
        origin: retrievedObject["point_depart"],
        destination: retrievedObject["point_arrive"],
        optimizeWaypoints: true,
        travelMode: 'DRIVING'
    }, function (response, status) {
        if (status === 'OK') {
            directionsDisplay.setDirections(response);
            var route = response.routes[0];
            var summaryPanel = document.getElementById('directions-panel');
            summaryPanel.innerHTML = '';
            // For each route, display summary information.
            for (var i = 0; i < route.legs.length; i++) {
                summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
                summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
                summaryPanel.innerHTML += 'Estimated Distance :' + route.legs[i].distance.text + '<br>';
                summaryPanel.innerHTML += 'Estimated Duration :' + route.legs[i].duration.text;
            }
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}


