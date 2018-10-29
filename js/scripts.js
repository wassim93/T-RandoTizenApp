/** add product scripts */
var isValid = true;

function verifTextarea() {
  $("textarea").each(function () {
    if ($.trim($(this).val()) == "") {
      isValid = false;
      $(this).css({
        border: "1px solid red",
        background: "#FFCECE"
      });
    } else {
      $(this).css({
        border: "",
        background: ""
      });
    }
  });
}

function verifInputs() {
  $("input").each(function () {
    if ($.trim($(this).val()) == "") {
      isValid = false;
      $(this).css({
        border: "1px solid red",
        background: "#FFCECE"
      });
    } else {
      $(this).css({
        border: "",
        background: ""
      });
    }
  });
}
function verifInputsWithoutFiles() {
  $("input[type=text]").each(function () {
    if ($.trim($(this).val()) == "") {
      isValid = false;
      $(this).css({
        border: "1px solid red",
        background: "#FFCECE"
      });
    } else {
      $(this).css({
        border: "border:1px solid #ccc",
        background: ""
      });
    }

  });
}
function checkFormValidation(e) {
  verifTextarea();
  verifInputs();

  if ($("#phone").val().length == 8 && isValid == true) {
    //getDataForm();
    // SaveProduct(title, type, desc, price, files, phone);
    alert("submitted");
  } else {
    alert("error");
    $("#phone").css({
      border: "1px solid red",
      background: "#FFCECE"
    });
  }
}
