var checkConnected = ()=>{

  if(localStorage.length >0 && localStorage.getItem("access_token") != ""){
    window.location = "file:///home/aymen/workspace/AppCallee/blog.html";

    }
}


var login = (e)=>{
e.preventDefault()
 document.getElementById('message').innerHTML = "loading ...."
 var username = document.getElementById('username').value 
 var password = document.getElementById('password').value   
 var crediential = {
     "username":username,
     "password":password
 }

 var xhr = new XMLHttpRequest()
  xhr.open('POST','http://localhost:8000/auth',true)

  xhr.onreadystatechange = ()=>{
    switch(xhr.status){
         case 201 :
         localStorage.setItem('access_token',getToken(username,password))
         window.location = "file:///home/aymen/workspace/AppCallee/blog.html";

         break; 
         case 204 :
         document.getElementById("message").innerHTML = "invalid password "
         break; 
         case 400 :
         document.getElementById("message").innerHTML = "invalid login and password"
         break; 


    }
   
  } 
  xhr.send(JSON.stringify(crediential))


}

var getToken = (username,password)=>{
    var token = null 
    var xhr = new XMLHttpRequest()
    xhr.open('GET',`http://localhost:8000/oauth/v2/token?grant_type=password&client_id=1_3bcbxd9e24g0gk4swg0kwgcwg4o8k8g4g888kwc44gcc0gwwk4&client_secret=4ok2x70rlfokc8g0wws8c8kwcokw80k44sg48goc0ok4w0so0k&username=${username}&password=${password}`,false)
  
    xhr.onreadystatechange = ()=>{
  
      if(xhr.readyState === 4 && xhr.status ===200){
  
      token = JSON.parse(xhr.responseText).access_token ; 

      }
    } 
    xhr.send()
    return token 

}