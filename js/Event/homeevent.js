
function getData() {

    var xhr = new XMLHttpRequest();
    var url = "http://localhost:8000/GetAllEvent";
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            if (response.length != 0) {
                appendData(response);

            } else {
                // no result
                //$("#NoResult").attr("style", "display:block;");
                //$("#Results").attr("style", "display:none;");
            }
            loadEvents();

        } else {
            console.log("err" + response);
        }
    };
    xhr.send();
}






function appendData(res) {
    if (res.length > 1) {
        showSlider(res);
    } else {
        showOneEvent(res);
    }



}

function showSlider(res) {
    var slider = document.getElementById("slider");

    for (var i = 0; i < res.length; i++) {
        var featureBox = document.createElement("div");
        featureBox.setAttribute("class", "col-md-12 features-box");
        var featureDetail = document.createElement("div");
        featureDetail.setAttribute("class", "features-detail");
        var image = document.createElement("img");
        image.setAttribute("src", "http://localhost:8088/trandobackend/web/bundles/images/" + res[i]["image"][0]["image"]);
        image.setAttribute("style", "height:270px;width:270px;");
        var htext = document.createElement("h4");
        htext.innerHTML = res[i]["title"];
        var a = document.createElement("a");
        a.setAttribute("href", "images/feature-img1.jpg");
        var i1 = document.createElement("i");
        i1.setAttribute("class", "fa fa-search");
        a.appendChild(i1);
        featureDetail.appendChild(image);
        featureDetail.appendChild(htext);
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

function showOneEvent(res) {
    var slider = document.getElementById("slider");
    var featureBox = document.createElement("div");
    featureBox.setAttribute("class", "col-md-12 features-box");
    var featureDetail = document.createElement("div");
    featureDetail.setAttribute("class", "features-detail");
    var image = document.createElement("img");
    image.setAttribute("src", "http://localhost:8088/trandobackend/web/bundles/images/" + res[0]["image"][0]["image"]);
    image.setAttribute("style", "height:270px;width:270px;");
    var htext = document.createElement("h4");
    htext.innerHTML = res[0]["title"];
    var a = document.createElement("a");
    a.setAttribute("href", "images/feature-img1.jpg");
    var i1 = document.createElement("i");
    i1.setAttribute("class", "fa fa-search");
    a.appendChild(i1);
    featureDetail.appendChild(image);
    featureDetail.appendChild(htext);
    featureDetail.appendChild(a);
    featureBox.appendChild(featureDetail);
    slider.appendChild(featureBox);
}

function loadEvents() {
    var xhr = new XMLHttpRequest();
    var url = "http://localhost:8000/GetAllEvent";
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            if (response.length != 0) {
                appendAllEventsData(response);

            } else {
                // no result
                //$("#NoResult").attr("style", "display:block;");
                //$("#Results").attr("style", "display:none;");
            }
        } else {
            console.log("err" + response);
        }
    };
    xhr.send();
}

function appendAllEventsData(res) {
    var eventlist = document.getElementById("eventlist");

    /* <!-- Destination Box -->
                 <div  class="col-md-4 col-sm-6 col-xs-6 destination-box">
                     <div class="destination-content">
                         <img src="images/destination-1.jpg" alt="Destination" />
                         <h3><span>kathmandu</span></h3>
                         <div class="destination-content-box">
                             <h4>Nepal Travel<br> With Me </h4>
                             <h2>1999 DT <span>Per Person</span></h2>
                             <ul>
                                 <li><a href="#"><i class="fa fa-refresh"></i></a></li>
                                 <li><a href="#"><i class="fa fa-info"></i></a></li>
                                 <li><a href="#"><i class="fa fa-trash"></i></a></li>
                             </ul>
                         </div>
                     </div>
                 </div><!-- Destination Box /- -->
 
 */
    for (var i = 0; i < res.length; i++) {
        var destinationBox = document.createElement("div");
        destinationBox.setAttribute("class", "col-md-4 col-sm-6 col-xs-6 destination-box");
        var destinationContent = document.createElement("div");
        destinationContent.setAttribute("class", "destination-content");
        var image = document.createElement("img");
        image.setAttribute("src", "http://localhost:8088/trandobackend/web/bundles/images/" + res[i]["image"][0]["image"]);
        //image.setAttribute("style", "height:270px;width:270px;");
        var htext = document.createElement("h3");
        var span = document.createElement("span");
        span.innerHTML = res[i]["title"];
        htext.appendChild(span);
        var destinationContentBox = document.createElement("div");
        destinationContentBox.setAttribute("class", "destination-content-box");
        var h1text = document.createElement("h4");
        h1text.innerHTML = res[i]["title"];

        var h2text = document.createElement("h2");
        h2text.innerHTML = res[i]["prix"] + "DT";
        var span1 = document.createElement("span");
        span1.innerHTML = "Per Person";
        h2text.appendChild(span1);
        var ul = document.createElement("ul");
        var li1 = document.createElement("li");
        var a1 = document.createElement("a");
        a1.setAttribute("href", "#");
        var i1 = document.createElement("i");
        i1.setAttribute("class", "fa fa-refresh");
        a1.appendChild(i1);
        li1.appendChild(a1);

        var li2 = document.createElement("li");
        var a2 = document.createElement("a");
        a2.setAttribute("href", "#");
        var i2 = document.createElement("i");
        i2.setAttribute("class", "fa fa-info");
        a2.appendChild(i2);
        li2.appendChild(a2);

        var li3 = document.createElement("li");
        var a3 = document.createElement("a");
        a3.setAttribute("href", "#");
        var i3 = document.createElement("i");
        i3.setAttribute("class", "fa fa-trash");
        a3.appendChild(i3);
        li3.appendChild(a3);

        ul.appendChild(li1);
        ul.appendChild(li2);
        ul.appendChild(li3);




        destinationContentBox.appendChild(h1text);
        destinationContentBox.appendChild(h2text);
        destinationContentBox.appendChild(ul);

        destinationContent.appendChild(image);
        destinationContent.appendChild(htext);
        destinationContent.appendChild(destinationContentBox);

        destinationBox.appendChild(destinationContent);
        eventlist.appendChild(destinationBox);


    }

}

