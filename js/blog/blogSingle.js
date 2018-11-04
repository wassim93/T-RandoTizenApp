var loadData = () => {

    var xhr = new XMLHttpRequest()
    var id = localStorage.getItem("idpostdetail")
    xhr.open('GET', `http://localhost:8000/GetPostById/${id}`, false)
    xhr.onreadystatechange = () => {

    


    }
    xhr.send()
    loadComments(id)

}

var loadComments = (id) => {
    var xhr = new XMLHttpRequest()
    var id = localStorage.getItem("idpostdetail")
    xhr.open('GET', `http://localhost:8000/getcomments/${id}`, false)
    xhr.onreadystatechange = () => {
 
        JSON.parse(xhr.responseText).map(x => {
            
            $("#comments").append(`
          <div class="comment-box">
           <h4>
           <img src="http://localhost:8000/image/${x.user._profile_pic_url}" alt="Comments"  style="width:50px;height:50px;border-radius:50%"/>
           <span>${x.user._fisrt_name} &nbsp ${x.user._last_name}</span></h4>
           <p>${x.content}</p>
           <span>${x.date}</span>
          </div>
         
           `)
        })



    }
    xhr.send()

}
var comment= ()=>{
    var token = localStorage.getItem("access_token")
    var comment = {
        postid: localStorage.getItem("idpostdetail"),
        token : token,
        message: document.getElementById("comment").value
    }
    console.log(JSON.stringify(comment))
        var xhr = new XMLHttpRequest()
        xhr.open('POST', `http://localhost:8000/AddComment`, true)
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.onreadystatechange = () => {
            $("#comments").html(" ")
            loadComments()
    }

    xhr.send(JSON.stringify(comment))

    
}