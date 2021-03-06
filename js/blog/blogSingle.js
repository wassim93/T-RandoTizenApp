//Bind hardware back button.
window.addEventListener('tizenhwkey', function onTizenHwKey(e) {
    if (e.keyName === 'back') {
    	window.history.back();
    }
});
var loadData = () => {


    document.getElementById("imgprof").innerHTML = `<img class="profile-image" style="width:50px;height:50px;border-radius:50%" src="http://10.0.2.2:8000/image/${localStorage.getItem("profile_image")}" alt="profilepic" />`
    var xhr = new XMLHttpRequest()
    var id = localStorage.getItem("idpostdetail")
    xhr.open('GET', `http://10.0.2.2:8000/GetPostById/${id}`, false)
    xhr.onreadystatechange = async () => {

        var ServerResp = await checkLike(id, localStorage.getItem("access_token"))
        if (JSON.parse(ServerResp).response === "true") {

            document.getElementById("likeicon").style.color = "red"
        }

        document.getElementById("likes").innerHTML = JSON.parse(xhr.responseText).likes
        document.getElementById("nbrcomments").innerHTML = JSON.parse(xhr.responseText).comments
        document.getElementById("content").innerHTML = JSON.parse(xhr.responseText).content
        document.getElementById("profileimg").innerHTML = `<img src="http://10.0.2.2:8000/image/${JSON.parse(xhr.responseText).user._profile_pic_url}" id="imgprofile" style="width:30px;height:30px;border-radius:50%" alt="" srcset="">`
        document.getElementById("date").innerHTML = JSON.parse(xhr.responseText).date
        document.getElementById("imagePost").innerHTML = `<a href="#"><img src="http://10.0.2.2:8000/image/${JSON.parse(xhr.responseText).image_path}" alt="Blog" /></a>`
    }
    xhr.send()
    loadComments()

}

var loadComments = () => {

    var xhr = new XMLHttpRequest()
    var id = localStorage.getItem("idpostdetail")
    xhr.open('GET', `http://10.0.2.2:8000/getcomments/${id}`, false)
    xhr.onreadystatechange = () => {

        var list = JSON.parse(xhr.responseText)
        if (list.length === 0) {

            document.getElementById("ctt").style.visibility = "hidden"
            document.getElementById("ctt").style.height = "0"
        }
        list.map(async x => {
            var visibility = "hidden"
            var check = await checkComment(x.id)
            console.log(x.id)
            //   console.log(check)
            if (JSON.parse(check).response === "true") {
                visibility = "visible"
            }
            $("#comments").append(`
          <div class="comment-box">
        
                <div class="editbutt" align="right" style="visibility:${visibility}">
                  <i class="fas fa-cog"  onclick="edit(${x.id})">
                  </i>
                  <i class="fas fa-trash"  onclick="OpenDeleteDialog(${x.id})">
                  </i>
                </div>

               <img src="http://10.0.2.2:8000/image/${x.user._profile_pic_url}" alt="Comments"  style="width:50px;height:50px;border-radius:50%"/>
               <span>${x.user._fisrt_name} &nbsp ${x.user._last_name}</span>
               <p>${x.content}</p>

                <div align="right"> 
                 <span style="font-size:10px">${x.date}</span>
                </div>
                <hr style="border:1 solid #555">
          </div>
    
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
        xhr.open('POST', `http://10.0.2.2:8000/checkcommentuser`, true)
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.onload = () => {
            resolve(xhr.responseText)

        }
        xhr.send(JSON.stringify(object))

    })


}
var comment = (e) => {
	e.preventDefault();
    var token = localStorage.getItem("access_token")
    var comment = {
        postid: localStorage.getItem("idpostdetail"),
        token: token,
        message: document.getElementById("comment").value
    }

    var xhr = new XMLHttpRequest()
    xhr.open('POST', `http://10.0.2.2:8000/AddComment`, true)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.getElementById("ctt").style.visibility = "visible"
            document.getElementById("ctt").style.height = "auto"
            document.getElementById("comment").value = " ";
            $(".comment-box").remove()
            loadComments()
        }

    }


    xhr.send(JSON.stringify(comment))


}

var supprimer = () => {
    var id = localStorage.getItem("idcommentdelete")
    var xhr = new XMLHttpRequest()
    xhr.open('GET', `http://10.0.2.2:8000/RemoveComment/${id}`, false)
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {

            $(".comment-box").remove()

            loadComments()
        }

    }
    localStorage.removeItem("idcommentdelete")
    $("#Delete-Post").modal("hide")
    xhr.send()

}
function edit(id) {
    //commentToEdit

    $("#update-comment").modal("show");
    localStorage.setItem("commentToEdit", id)
    var xhr = new XMLHttpRequest()
    xhr.open('GET', `http://10.0.2.2:8000/GetCommentById/${id}`, false)
    xhr.onreadystatechange = () => {

        document.getElementById("commentToEdit").value = JSON.parse(xhr.responseText).content
    }

    xhr.send()

}

var hideModal = () => {
    $("#confirm-edit").modal("hide");
}

var UpdateComment = () => {

    var comment = {
        idcomment: localStorage.getItem("commentToEdit"),
        message: document.getElementById("commentToEdit").value
    }

    var xhr = new XMLHttpRequest()
    xhr.open('POST', `http://10.0.2.2:8000/UpdateComment`, true)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            $(".comment-box").remove()

            loadComments()



        }
    }

    xhr.send(JSON.stringify(comment))
    $("#update-comment").modal("hide");

}
var checkLike = (idpost, token) => {
    return new Promise((resolve, reject) => {

        var xhr = new XMLHttpRequest()
        xhr.open('POST', 'http://10.0.2.2:8000/checkliked', true)

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

var HitLike = (event) => {
    event.preventDefault()
    var comment = {
        postid: localStorage.getItem("idpostdetail"),
        token: localStorage.getItem("access_token")
    }

    var xhr = new XMLHttpRequest()
    xhr.open('PUT', `http://10.0.2.2:8000/hitlike`, true)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.onreadystatechange = () => {
        if (JSON.parse(xhr.responseText).response === "liked") {
            document.getElementById("likeicon").style.color = "red"
            document.getElementById("likes").innerHTML = JSON.parse(xhr.responseText).like
            $(".comment-box").remove()

            loadComments()

        } else {
            document.getElementById("likeicon").style.color = "black"
            document.getElementById("likes").innerHTML = JSON.parse(xhr.responseText).like
            $(".comment-box").remove()

            loadComments()


        }
    }

    xhr.send(JSON.stringify(comment))



}

var OpenDeleteDialog = (id) => {

    $("#Delete-Post").modal("show")
    localStorage.setItem("idcommentdelete", id)


}

