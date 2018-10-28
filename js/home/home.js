var loadData = ()=>{
    var token = {token:localStorage.getItem('access_token')}
    var xhr = new XMLHttpRequest()
    xhr.open('POST','http://localhost:8000/getUserByToken',true)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.onreadystatechange = ()=>{
        console.log(JSON.parse(xhr.responseText)._fisrt_name)
    if(JSON.parse(xhr.responseText)._fisrt_name === "default"){

             window.location = "file:///home/aymen/workspace/AppCallee/completeProfile.html"

    }
    
    
    
    }
    console.log(JSON.stringify(token))
    xhr.send(JSON.stringify(token))
}