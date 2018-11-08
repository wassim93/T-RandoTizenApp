//Bind hardware back button.
window.addEventListener('tizenhwkey', function onTizenHwKey(e) {
    if (e.keyName === 'back') {
    	window.history.back();
    }
});
var LoadData = () => {
  document.getElementById("imgprof").innerHTML = `<img class="profile-image"  style="width:50px;height:50px;border-radius:50%" src="http://10.0.2.2:8000/image/${localStorage.getItem("profile_image")}" alt="profilepic" />`

  var xhr = new XMLHttpRequest()
  var id = localStorage.getItem("idpostdetail")
  xhr.open('GET', `http://10.0.2.2:8000/GetPostById/${id}`, false)
  xhr.onreadystatechange = () => {
    document.getElementById("desc").innerHTML = JSON.parse(xhr.responseText).content
  }

  xhr.send()

}

var UpdatePost = async (event) => {
  event.preventDefault()

  var base64String = " "

  var token = { token: localStorage.getItem('access_token') }
  var content = document.getElementById('desc').value
  if (document.getElementById('files').files[0] === undefined) {
    base64String = "null"
  } else {
    var file = document.getElementById('files').files[0];

    base64String = await getBase64(file).split(',')[1]
  }


  var post = {

    postid: localStorage.getItem("idpostdetail"),
    image: base64String,
    message: content,
    token: token
  }
  var xhr = new XMLHttpRequest()
  xhr.open('POST', 'http://10.0.2.2:8000/UpdatePost', true)
  xhr.setRequestHeader('Content-Type', 'application/json')
  xhr.onreadystatechange = () => {
    console.log(xhr.responseText)

    window.location = "blog.html"
  }
  xhr.send(JSON.stringify(post))
}

var getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}