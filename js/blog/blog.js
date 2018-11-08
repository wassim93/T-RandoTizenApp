var loadData = () => {


    CheckUserFirst()
    var LikedButtonColor = " "
    var upsuppbutt = " "
    var xhr = new XMLHttpRequest()
    xhr.open('GET', 'http://10.0.2.2:8000/getAllPosts', false)

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {


            JSON.parse(xhr.responseText).forEach(async x => {

                var ServerResp = await checkLike(x.id, localStorage.getItem("access_token"))
                if (JSON.parse(ServerResp).response === "true") {

                    LikedButtonColor = "red"
                }
                var checku = await checkUser(x.id, localStorage.getItem("access_token"))
                console.log(checku)
                if (JSON.parse(checku).response === "true") {
                    upsuppbutt = "visible"
                    	

                }else{
                	 upsuppbutt = "hidden"
                }

                $('#myList').append(
                    `<div class="type-post">
                   
                            <div style="visibility:${upsuppbutt}" align="right">
                            <i class="fas fa-cog"  onclick="edit(${x.id},event)">
                            </i>
                            <i class="fas fa-trash"  onclick="OpenConfirmDeleteDialg(${x.id})">
                            </i> 
                            </div>
							<div class="entry-cover">
								<a href="#"><img src="http://10.0.2.2:8000/image/${x.image_path}" alt="Blog" /></a>
							</div>
							<div class="entry-meta">
								<div class="post-like" >
									<a href="#"><i style="color:${LikedButtonColor}"  class="fa fa-heart"></i> ${x.likes} L</a>
								</div>
								<div class="post-comment">
									<a href="#"><i  class="fa fa-comment"></i>${x.comments} C</a>
								</div>
								<div class="byline">
									Posted by <a href="#">${x.user._fisrt_name}</a>
								</div>
							</div>
							<div class="entry-content">
								<p>${x.content} </p>
								<a href="#" title="read more" onclick="ShowDetail(${x.id},event)">more details</a>
							</div>

						</div>
     `)
                LikedButtonColor = " "
            })

        }

    }
    xhr.send()
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
var checkUser = (idpost, token) => {
    return new Promise((resolve, reject) => {

        var xhr = new XMLHttpRequest()
        xhr.open('POST', 'http://10.0.2.2:8000/checkPostuser', true)

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
var ShowDetail = (id, event) => {
    event.preventDefault()
    localStorage.setItem("idpostdetail", id)
    window.location = "blog-single.html"
}
var edit = (id, event) => {
    event.preventDefault()
    localStorage.setItem("idpostdetail", id)
    window.location = "EditPost.html"


}

var AddPost = () => {
    window.location = "addPost.html"
}

var supprimer = () => {
    var id = localStorage.getItem("idpostdelete")
    var xhr = new XMLHttpRequest()
    xhr.open('GET', `http://10.0.2.2:8000/Removepost/${id}`, false)

    xhr.onreadystatechange = () => {
        window.location = "blog.html"
    }
    xhr.send()
    localStorage.removeItem("idpostdelete")
}

var OpenConfirmDeleteDialg = (id) => {

    $("#Delete-Post").modal("show")
    localStorage.setItem("idpostdelete", id)
}

var CheckUserFirst = () => {

    //getUserByToken
    var xhr = new XMLHttpRequest()
    xhr.open('POST', `http://10.0.2.2:8000/getUserByToken`, true)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.onreadystatechange = () => {

        if (JSON.parse(xhr.responseText)._fisrt_name === "default") {
            window.location = "completeProfile.html"
        } else {
            localStorage.setItem("profile_image", JSON.parse(xhr.responseText)._profile_pic_url)
            document.getElementById("imgprof").innerHTML = `<img class="profile-image" style="width:50px;height:50px;border-radius:50%" src="http://10.0.2.2:8000/image/${JSON.parse(xhr.responseText)._profile_pic_url}" alt="profilepic" />`
        }
    }
    xhr.send(JSON.stringify({ token: localStorage.getItem("access_token") }))
}