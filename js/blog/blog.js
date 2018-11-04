  
var loadData = () => {
    var LikedButtonColor = " "
    var xhr = new XMLHttpRequest()
    xhr.open('GET', 'http://localhost:8000/getAllPosts', false)

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
        
            
            JSON.parse(xhr.responseText).map(async x => {
             
              var ServerResp = await checkLike(x.id, localStorage.getItem("access_token"))
              if(JSON.parse(ServerResp).response === "true"){

                 LikedButtonColor = "red"
              }
              

                $('#myList').append(`<div class="type-post">
							<div class="entry-cover">
								<a href="#"><img src="http://localhost:8000/image/${x.image_path}" alt="Blog" /></a>
							</div>
							<div class="entry-meta">
								<div class="post-like" >
									<a href="#"><i style="color:${LikedButtonColor}"  class="fa fa-heart-o"></i> ${x.likes} L</a>
								</div>
								<div class="post-comment">
									<a href="#"><i  class="fa fa-comment-o"></i>${x.comments} C</a>
								</div>
								<div class="byline">
									Posted by <a href="#">${x.user._fisrt_name}</a>
								</div>
							</div>
							<div class="entry-content">
								<p>So this is the tale of our castaways they're here for a long long time. </p>
								<a href="#" title="read more" onclick="ShowDetail(${x.id},event)">read more</a>
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

var  ShowDetail = (id,event)=>{
event.preventDefault()
localStorage.setItem("idpostdetail",id)
window.location = "blog-single.html"
}
