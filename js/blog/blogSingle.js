var loadData = () => {

    var xhr = new XMLHttpRequest()
    var id = localStorage.getItem("idpostdetail")
    xhr.open('GET', `http://localhost:8000/GetPostById/${id}`, false)
    xhr.onreadystatechange = async() => {

    var ServerResp = await checkLike(id, localStorage.getItem("access_token"))
    if(JSON.parse(ServerResp).response === "true"){

      document.getElementById("likeicon").style.color = "red"
     }
     
    document.getElementById("likes").innerHTML = JSON.parse(xhr.responseText).likes
    document.getElementById("nbrcomments").innerHTML = JSON.parse(xhr.responseText).comments
    document.getElementById("content").innerHTML = JSON.parse(xhr.responseText).content
    document.getElementById("profileimg").innerHTML = `<img src="http://localhost:8000/image/${JSON.parse(xhr.responseText).user._profile_pic_url}" id="imgprofile" style="width:100px;height:100px;border-radius:50%" alt="" srcset="">`
    document.getElementById("date").innerHTML = JSON.parse(xhr.responseText).date
    document.getElementById("imagePost").innerHTML = `<a href="#"><img src="http://localhost:8000/image/${JSON.parse(xhr.responseText).image_path}" alt="Blog" /></a>`
}
    xhr.send()
    loadComments(id)

}

var loadComments = (id) => {

    var xhr = new XMLHttpRequest()
    var id = localStorage.getItem("idpostdetail")
    xhr.open('GET', `http://localhost:8000/getcomments/${id}`, false)
    xhr.onreadystatechange = () => {
        var list = JSON.parse(xhr.responseText)
        list.map(async x => {
            var visibility = "hidden"
            var check = await checkComment(x.id)
            console.log(x.id)
            console.log(check)
            if (JSON.parse(check).response === "true") {
                visibility = "visible"
            }
            $("#comments").append(`
          <div class="comment-box">
        
                <div class="editbutt" align="right" style="visibility:${visibility}">
                  <i class="fas fa-cog"  onclick="edit(${x.id})">
                  </i>
                  <i class="fas fa-trash"  onclick="supprimer(${x.id})">
                  </i>
                </div>

               <img src="http://localhost:8000/image/${x.user._profile_pic_url}" alt="Comments"  style="width:50px;height:50px;border-radius:50%"/>
               <span>${x.user._fisrt_name} &nbsp ${x.user._last_name}</span>
               <p>${x.content}</p>

                <div align="right"> 
                 <span style="font-size:10px">${x.date}</span>
                </div>
          </div>
         <hr style="border:1 solid #555">
           `)


        })



    }
    xhr.send()



}
var checkComment = (idcomment) => {

    return new Promise((resolve, reject) => {
        var object = {
            idcomment: idcomment,
            token: localStorage.getItem("access_token")
        }
        var xhr = new XMLHttpRequest()
        xhr.open('POST', `http://localhost:8000/checkcommentuser`, true)
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.onload = () => {
            resolve(xhr.responseText)

        }
        xhr.send(JSON.stringify(object))

    })


}
var comment = () => {
    var token = localStorage.getItem("access_token")
    var comment = {
        postid: localStorage.getItem("idpostdetail"),
        token: token,
        message: document.getElementById("comment").value
    }

    var xhr = new XMLHttpRequest()
    xhr.open('POST', `http://localhost:8000/AddComment`, true)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.onreadystatechange = () => {
        $("#comments").html(" ")
        window.location = "blog-single.html"
    }

    xhr.send(JSON.stringify(comment))


}

var supprimer = (id)=>{
    var xhr = new XMLHttpRequest()
    xhr.open('GET', `http://localhost:8000/RemoveComment/${id}`, false)
    xhr.onreadystatechange = () => {
        $("#comments").html(" ")
        window.location = "blog-single.html"
    }

    xhr.send()

}
function edit(id) {
     //commentToEdit

    $("#update-comment").modal("show");
    localStorage.setItem("commentToEdit",id)
    var xhr = new XMLHttpRequest()
    xhr.open('GET', `http://localhost:8000/GetCommentById/${id}`, false)
    xhr.onreadystatechange = () => {
      document.getElementById("commentToEdit").value = JSON.parse(xhr.responseText).content
    }

    xhr.send()

  }
  
  var  hideModal = () => {
    $("#confirm-edit").modal("hide");
  }

  var UpdateComment = ()=>{

    var comment = {
        idcomment: localStorage.getItem("commentToEdit"),
        message: document.getElementById("commentToEdit").value
    }

    var xhr = new XMLHttpRequest()
    xhr.open('POST', `http://localhost:8000/UpdateComment`, true)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.onreadystatechange = () => {
        $("#comments").html(" ")
        window.location = "blog-single.html"
    }

    xhr.send(JSON.stringify(comment))


  }
  var checkLike = (idpost, token) => {
    return new Promise((resolve, reject) => {

        var xhr = new XMLHttpRequest()
        xhr.open('POST', 'http://localhost:8000/checkliked', true)

        xhr.onload = () => {
            if (xhr.readyState === 4) {
                resolve(xhr.responseText)

            }
        }
        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        };
        xhr.send(JSON.stringify({
            idpost: idpost,
            token: token
        }))


    })

}

var HitLike = (event)=>{
    event.preventDefault()
    var comment = {
        postid: localStorage.getItem("idpostdetail"),
        token: localStorage.getItem("access_token")
    }

    var xhr = new XMLHttpRequest()
    xhr.open('PUT', `http://localhost:8000/hitlike`, true)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.onreadystatechange = () => {
     if(JSON.parse(xhr.responseText).response==="liked"){
        document.getElementById("likeicon").style.color = "red"
        document.getElementById("likes").innerHTML =JSON.parse(xhr.responseText).like
     }else{
        document.getElementById("likeicon").style.color = "black"
        document.getElementById("likes").innerHTML =JSON.parse(xhr.responseText).like
     }
    }

    xhr.send(JSON.stringify(comment))



}