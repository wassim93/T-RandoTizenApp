//Bind hardware back button.
window.addEventListener('tizenhwkey', function onTizenHwKey(e) {
    if (e.keyName === 'back') {
    	window.history.back();
    }
});
var loadData = () => {

    var token = {
        token: localStorage.getItem('access_token')
    }
    var xhr = new XMLHttpRequest()
    xhr.open('POST', 'http://10.0.2.2:8000/getUserByToken', true)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.onreadystatechange = () => {

        if (xhr.status === 200 && xhr.readyState === 4) {

            document.getElementById('firstname').value = JSON.parse(xhr.responseText)._fisrt_name
            document.getElementById('lastname').value = JSON.parse(xhr.responseText)._last_name
            document.getElementById('phoneNumber').value = JSON.parse(xhr.responseText)._phone_number
            document.getElementById('adress').value = JSON.parse(xhr.responseText)._address
        }


    }

    xhr.send(JSON.stringify(token))


}
var CompleteProfile = (e) => {
    e.preventDefault()


    var token = { token: localStorage.getItem('access_token') }
    var firstname = document.getElementById('firstname').value
    var lastname = document.getElementById('lastname').value
    var phoneNumber = document.getElementById('phoneNumber').value
    var adress = document.getElementById('adress').value

    var user = {

        firstname: firstname,
        lastname: lastname,
        phoneNumber, phoneNumber,
        adress: adress,
        token: token
    }
    var xhr = new XMLHttpRequest()
    xhr.open('POST', 'http://10.0.2.2:8000/CompleteProfile', true)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.onreadystatechange = () => {
        console.log(xhr.responseText)
        if (xhr.status === 201) {
            window.location = "profile.html"
        } else {

            document.getElementById("message").innerHTML = " error ocured please retry .. ! "
        }


    }

    xhr.send(JSON.stringify(user))



}
