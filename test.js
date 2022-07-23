const a = document.getElementById("h");
document.addEventListener('click', (e) => {
    if(!a.contains(e.target)){
        console.log("outline");
        a.innerHTML="";
    }else{
        console.log("inline box")
    }
})

