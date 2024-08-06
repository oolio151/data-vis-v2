var darkMode = true;
document.getElementById("darknessButton").addEventListener("click", function(){
    alert("fdf");
    if(darkMode){
        darkMode = false;
        document.getElementById("body").style.backgroundColor = "#fff";
    } else {
        darkMode = true;
        document.getElementById("body").style.backgroundColor = "#212121"
    }
})