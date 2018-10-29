
function participate(_this) {
    if (_this.innerText === "PARTICIPATE") {
        _this.className = "btn btn-danger";
        _this.innerText = "Cancel";
    }
    else {
        _this.className = "btn btn-success";
        _this.innerText = "Participate";
    }

}