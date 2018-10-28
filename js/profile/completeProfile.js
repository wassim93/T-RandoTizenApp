var CompleteProfile = (e)=>{
 e.preventDefault()


var token = {token:localStorage.getItem('access_token')}
var firstname = document.getElementById('firstname').value 
var lastname = document.getElementById('lastname').value
var phoneNumber = document.getElementById('phoneNumber').value
var adress = document.getElementById('adress').value

var user = {

    firstname :firstname,
    lastname:lastname,
    phoneNumber,phoneNumber,
    adress:adress,
    token:token
}
var xhr = new XMLHttpRequest()
xhr.open('POST','http://localhost:8000/CompleteProfile',true)
xhr.setRequestHeader('Content-Type', 'application/json')
xhr.onreadystatechange = ()=>{
console.log(xhr.responseText)
   if(xhr.status===201){
   window.location = "file:///home/aymen/workspace/AppCallee/blog.html"
   }else{

     document.getElementById("message").innerHTML = " error ocured please retry .. ! "
   }


}

xhr.send(JSON.stringify(user))
UploadFile()


}
var UploadFile = ()=>{
 
 
  var file = document.querySelector('input[type="file"]').files[0];
  getBase64(file).then(
    data => {
     
      var xhr = new XMLHttpRequest()
      xhr.open('PUT','http://localhost:8000/UpdateUser',true)
      xhr.setRequestHeader('Content-Type', 'application/json')
      xhr.onreadystatechange = ()=>{
      }

        xhr.send(JSON.stringify({image:data.split(',')[1],token:localStorage.getItem('access_token')}))
    }
  );

}
var getBase64 = (file) =>{
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}