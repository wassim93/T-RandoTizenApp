var LoadData = ()=>{

    var xhr = new XMLHttpRequest()
    var id = localStorage.getItem("idpostdetail")
    xhr.open('GET', `http://localhost:8000/GetPostById/${id}`, false)
    xhr.onreadystatechange = () => {
        document.getElementById("desc").innerHTML = JSON.parse(xhr.responseText).content
    }

    xhr.send()

}

var UpdatePost = async(event)=>{
    event.preventDefault()
   
   
   var token = {token:localStorage.getItem('access_token')}
   var content = document.getElementById('desc').value 
   var file = document.getElementById('files').files[0];
 
   var base64String = await  getBase64(file)

   var post = {
   
       postid :localStorage.getItem("idpostdetail"),
       image:base64String.split(',')[1],
       message:content,
       token:token
   }
   var xhr = new XMLHttpRequest()
   xhr.open('POST','http://localhost:8000/UpdatePost',true)
   xhr.setRequestHeader('Content-Type', 'application/json')
   xhr.onreadystatechange = ()=>{
   console.log(xhr.responseText)
   
      window.location = "blog.html"
   }
      xhr.send(JSON.stringify(post))
   }
  
   var getBase64 = (file) =>{
     return new Promise((resolve, reject) => {
       const reader = new FileReader();
       reader.readAsDataURL(file);
       reader.onload = () => resolve(reader.result);
       reader.onerror = error => reject(error);
     });
   }