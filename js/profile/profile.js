var loadData = ()=>{
var token = {token:localStorage.getItem('access_token')}
var xhr = new XMLHttpRequest()
xhr.open('POST','http://localhost:8000/getUserByToken',true)
xhr.setRequestHeader('Content-Type', 'application/json')
xhr.onreadystatechange = ()=>{
    
document.getElementById('fullname').innerHTML =  "&nbsp&nbsp"+JSON.parse(xhr.responseText)._fisrt_name + " "+ JSON.parse(xhr.responseText)._last_name 
document.getElementById('phone').innerHTML  =  "&nbsp&nbsp"+JSON.parse(xhr.responseText)._phone_number
document.getElementById('address').innerHTML  =  "&nbsp&nbsp"+JSON.parse(xhr.responseText)._address
document.getElementById('email').innerHTML  =  "&nbsp&nbsp"+JSON.parse(xhr.responseText).email
document.getElementById('profile-img').src = "http://localhost:8000/image/"+JSON.parse(xhr.responseText)._profile_pic_url 


}
console.log(JSON.stringify(token))
xhr.send(JSON.stringify(token))
}
var UploadFile = (e)=>{
 
 
    var file = document.querySelector('input[type="file"]').files[0];
    getBase64(file).then(
      data => {
       
        var xhr = new XMLHttpRequest()
        xhr.open('PUT','http://localhost:8000/UpdateUser',true)
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.onreadystatechange = ()=>{
             if(xhr.status === 200){
               
                 
         
                     
                document.getElementById('profile-img').src = "http://localhost:8000/image/"+JSON.parse(xhr.responseText).result+".png"

             }
         

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
  