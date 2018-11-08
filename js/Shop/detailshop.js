//Bind hardware back button.
window.addEventListener('tizenhwkey', function onTizenHwKey(e) {
    if (e.keyName === 'back') {
    	window.history.back();
    }
});
function getProductDetails() {
  var retrievedObject = JSON.parse(localStorage.getItem("selectedProduct"));
  document.getElementById("imgprof").innerHTML = `<img class="profile-image" width="50px" heigth="50px" style="border-radius:50%" src="http://10.0.2.2:8000/image/${localStorage.getItem("profile_image")}" alt="profilepic" />`


  $("#prodTitle").html(retrievedObject["titre"]);
  if (retrievedObject["images"].length > 1) {
    showSlider(retrievedObject["images"]);
  } else {
    showOneImage(retrievedObject["images"]);
  }

  var span = document.getElementById("date");
  span.setAttribute("data-livestamp", retrievedObject["date"]);
  $("#phone").html("Contact: " + retrievedObject["contact"]);
  $("#type").html("Type: " + retrievedObject["type"]);
  $("#prodPrice").html(retrievedObject["prix"] + "DT");
  $("#prodDes").html(retrievedObject["description"]);
}

function showSlider(res) {
  var prodslides = document.getElementById("slideProd");

  for (var i = 0; i < res.length; i++) {
    var image = document.createElement("img");
    image.setAttribute(
      "src",
      "http://10.0.2.2:8088/trandobackend/web/bundles/images/" +
      res[i]["image"]
    );
    image.setAttribute("style", "height:280px;width:375px");

    prodslides.appendChild(image);
  }

  const mySiema = new Siema();
  document
    .querySelector(".prev")
    .addEventListener("click", () => mySiema.prev());
  document
    .querySelector(".next")
    .addEventListener("click", () => mySiema.next());
}

function showOneImage(res) {
  var image = document.getElementById("prodImg");
  image.setAttribute(
    "src",
    "http://10.0.2.2:8088/trandobackend/web/bundles/images/" + res[0]["image"]
  );
  image.setAttribute("style", "height:280px;width:375px;display:block;");

  //hide navigation buttons

  $(".prev").attr("style", "display:none;");
  $(".next").attr("style", "display:none;");
  //hide slider container
  $("#slideProd").attr("style", "display:none;");
}
