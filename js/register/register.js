var matches = null
var register = (e) => {

    e.preventDefault()
    if (checkPassword()) {
        var username = document.getElementById('usernamer').value
        var email = document.getElementById('email').value
        var passwordfirst = document.getElementById('passwordfirst').value
        var passwordsecond = document.getElementById('passwordsecond').value
        var message = document.getElementById('message1')
        message.innerHTML = "loading ...."
        var user = {
            "username": username,
            "email": email,
            "plainPassword": {
                "first": passwordfirst,
                "second": passwordsecond
            }
        }


        var xhr = new XMLHttpRequest()
        xhr.open('POST', 'http://localhost:8000/register', true)

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {

                switch (xhr.status) {
                    case 500:
                        message.innerHTML = "username or email already exist "
                        break;
                    case 200:
                         message.innerHTML = `<a class="w3l-register-p" href="file:///home/aymen/workspace/AppCallee/index.html>Successfully registred  proceed to login</a>`;
                         window.location = "file:///home/aymen/workspace/AppCallee/index.html"
                    break; 
                }
            }

        }
        xhr.send(JSON.stringify(user))

    }




}
var checkPassword = () => {

    if (document.getElementById('passwordfirst').value === document.getElementById('passwordsecond').value) {
        document.getElementById('messagecheck').innerHTML = `<p   style="color: green;font-style:16px;"  id="passwordCheck1">password match</p>`
        matches = true
    } else {
        document.getElementById('messagecheck').innerHTML = `<p   style="color: red;font-style:16px;" id="passwordCheck2">password do not match</p>`
        matches = false
    }
    console.log(matches)

    return matches;

}