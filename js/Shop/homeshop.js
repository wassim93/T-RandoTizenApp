var selectedProduct;
var imgSrcs = [];
var token = {
  token: localStorage.getItem('access_token')
}

function getData() {

  document.getElementById("imgprof").innerHTML = `<img class="profile-image" style="width:50px;height:50px;border-radius:50%" src="http://10.0.2.2:8000/image/${localStorage.getItem("profile_image")}" alt="profilepic" />`

  var xhr = new XMLHttpRequest();
  var url = "http://10.0.2.2:8000/GetAllProduct";
  xhr.open("GET", url, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      if (response.length != 0) {
        appendData(response);
      } else {
        // no result
        $("#NoResult").attr("style", "display:block;");
        $("#Results").attr("style", "display:none;");
      }
    } else {
      console.log("err" + response);
    }
  };
  xhr.send();
}

var appendData = async(response) => {
	  var ul = document.getElementById("products");
	  for (var i = 0; i <= response.length; i++) {
	    var li = document.createElement("li");
	    li.setAttribute("id", response[i]["id"]);
	    li.setAttribute("name", response[i]["titre"]);
	    li.setAttribute("class", "product");
	 
	    var a = document.createElement("a");
	    a.setAttribute("href", "#");
	    //stringify all json object as an id
	    a.setAttribute("id", JSON.stringify(response[i]));
	    a.setAttribute("onclick", "showProductDetail(this.id);");
	    var img = document.createElement("img");
	    img.setAttribute(
	      "src",
	      "http://10.0.2.2:8088/trandobackend/web/bundles/images/" +
	      response[i]["images"][0]["image"]
	    );
	    img.setAttribute("style", "height:200px;width:200px");
	    var h3 = document.createElement("h3");
	    h3.innerHTML = response[i]["titre"];
	    a.appendChild(img);
	    a.appendChild(h3);
	    var a1 = document.createElement("a");
	    a1.setAttribute("href", "shop-detail.html");
	    a1.setAttribute("class", "addto-cart");
	    a1.setAttribute("title", "More Details");
	    a1.innerHTML = "More Details";
	    var div = document.createElement("div");
	    div.setAttribute("class", "wishlist-box");
	    var a2 = document.createElement("a");
	    a2.setAttribute("id", response[i]["id"]);
	    a2.setAttribute("onclick", "showDeleteModal(this.id);");
	    //a2.setAttribute("data-toggle", "modal");
	    //a2.setAttribute("data-target", "#confirm-delete");

	    var icdel = document.createElement("i");
	    icdel.setAttribute("class", "fa fa-trash");

	    var a3 = document.createElement("a");
	    a3.setAttribute("id", JSON.stringify(response[i]));
	    a3.setAttribute("onclick", "showUpdateModal(this.id);");
	    var icup = document.createElement("i");
	    icup.setAttribute("class", "fa fa-refresh");

	    a2.appendChild(icdel);
	    a3.appendChild(icup);
	    div.appendChild(a2);
	    div.appendChild(a3);
	    li.appendChild(a);
	    li.appendChild(div);

	    li.appendChild(a1);

	    ul.appendChild(li);

	       var res = await checkUserProduct(response[i]["id"]);
	         if(res.response==="true"){

	          div.setAttribute("style", "visibility:visible");

	         }else{
	          div.setAttribute("style", "visibility:hidden");


	         }
	  }
	}

function search(_this) {




  // Retrieve the input field text and reset the count to zero
  var filter = $(_this).val();

  // Loop through the comment list
  $("#prodlist ul li").each(function () {


    // If the list item does not contain the text phrase fade it out
    if ($(this).text().search(new RegExp(filter, "i")) < 0) {
      $(this).fadeOut();

      // Show the list item if the phrase matches and increase the count by 1
    } else {
      $(this).show();
    }
  });




}

function checkUserProduct(idprod) {
	  return new Promise((resolve,reject)=>{
	  var xhr = new XMLHttpRequest();
	  var url = "http://10.0.2.2:8000/checkproductuser";
	  xhr.open("POST", url, true);
	  xhr.onreadystatechange = function () {
	    if (xhr.readyState === 4 && xhr.status === 200) {
	      var jsonData = JSON.parse(xhr.responseText);

	              resolve(jsonData)

	      /*if (jsonData["response"] == "false") {
	        $(".wishlist-box").attr("style", "display:none;");
	      }*/


	    }
	  };
	  var data = JSON.stringify({ "token": token, "idprod": idprod });
	  xhr.send(data);
	})
	}

function deleteAction() {
  // delete li from list withoout refreshing
  var selected = document.getElementById(selectedProduct);
  selected.remove();
  hideModal();
  // count li number if equal zero show no result found
  var nb = countLiData();
  if (nb == 0) {
    // no result
    $("#NoResult").attr("style", "display:block;");
    $("#Results").attr("style", "display:none;");
  }

  // Delete a product
  var url = "http://10.0.2.2:8000/deleteProduct/" + selectedProduct;
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.onload = function () {
    if (xhr.readyState == 4 && xhr.status == "200") {
      console.log(response.length);
    } else {
      console.log(xhr.responseText);
    }
  };
  xhr.send();
}

// count li number in ul products
function countLiData() {
  var ul = document.getElementById("products");
  var liNodes = [];

  for (var i = 0; i < ul.childNodes.length; i++) {
    if (ul.childNodes[i].nodeName == "LI") {
      liNodes.push(ul.childNodes[i]);
    }
  }
  return liNodes.length;
}

function showDeleteModal(id) {
  $("#confirm-delete").modal("show");
  selectedProduct = id;
}

function hideModal() {
  $("#confirm-delete").modal("hide");
}


function showUpdateModal(res) {
  $("#update-prod").modal("show");
  res = JSON.parse(res);
  $("#uptitle").val(res["titre"]);
  $("#uptype").val(res["type"]);
  $("#updesc").val(res["description"]);
  $("#upprice").val(res["prix"]);
  $("#upphone").val(res["contact"]);
  selectedProduct = res["id"];


  //selectedProduct = id;
}

// validate form when update clicked before sending request

$(document).ready(function () {

  $('#update').click(function (e) {
    var isValid = true;
    verifTextarea();
    verifInputsWithoutFiles();

    if (isValid == false)
      e.preventDefault();
    else
      if ($("#upphone").val().length == 8) {
        //SaveProduct();
        updateProduct();

      } else {
        alert("error");
        $("#upphone").css({
          "border": "1px solid red",
          "background": "#FFCECE"
        })
      }
  });

  if (window.File && window.FileList && window.FileReader) {
    $("#upfiles").on("change", function (e) {
      var files = e.target.files,
        filesLength = files.length;
      for (var i = 0; i < filesLength; i++) {
        var f = files[i]
        var fileReader = new FileReader();
        fileReader.filename = files[i].name.split('.')[0];
        fileReader.onload = (function (e) {
          var file = e.target;

          // fill image array with 64 base images 
          //filter image base 64 from prefixes data:image/....
          var strImage = e.target.result.replace(/^data:image\/[a-z]+;base64,/, "");
          imgSrcs.push(JSON.parse(JSON.stringify({ "image": strImage })));

        });

        fileReader.readAsDataURL(f);
      }
    });
  } else { alert("Your browser doesn't support to File API") }
});


function updateProduct() {

  //loader show 
  $("#submitLoader").css("display", "block");
  var xhr = new XMLHttpRequest();
  var url = "http://10.0.2.2:8000/updateProduct";
  xhr.open("POST", url, true);
  xhr.setRequestHeader('Content-Type', 'application/json')
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      $("#submitLoader").css("display", "none");
      $("#msg").css("display", "block");
      $('#msg').fadeIn();
      $('#msg').fadeOut(2000, function () { window.location.href = "shop.html"; }
      );
    }
  };
  var data = JSON.stringify({ id: selectedProduct, "token": token, title: $("#uptitle").val(), type: $("#uptype").val(), description: $("#updesc").val(), prix: $("#upprice").val(), images: imgSrcs, contact: $("#upphone").val(), date: new Date() });
  xhr.send(data);
}

function hideUpdateModal() {
  $("#update-prod").modal("hide");
}

function showProductDetail(data) {
  localStorage.setItem("selectedProduct", data);
  window.location.href = "shop-detail.html";
}
