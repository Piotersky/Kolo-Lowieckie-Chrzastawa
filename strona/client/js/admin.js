var login_btn = document.getElementById("login_btn");
logged = false;

var socket = io.connect({
  extraHeaders: {
    subpage: "admin",
  },
});

login_btn.addEventListener("click", () => {
  var password = document.getElementById("password").value;

  socket.emit("login", password);
});

socket.on("Authenticated", (data) => {
  logged = true;

  var login = document.getElementById("login");

  login.style.visibility = "hidden";
  login.style.width = "0px";
  login.style.height = "0px";

  var main = document.querySelector("main");

  main.style.visibility = "visible";
  main.style.width = "100%";
  main.style.height = "100%";

  var polowanie = document.getElementById("polowanie");

  for (let i = 0; i < data.length; i++) {
    numer = data[i].substring(0, data[i].indexOf("."));

    let newOption = new Option(numer, numer);
    polowanie.add(newOption, undefined);
  }
});

/*function handleFiles() {

    let files = this.files

    const fileList = files;
    console.log(fileList.length)

    for (let i = 0; i < files.length; i++) {
        const file = files[i];

        const reader = new FileReader();
        reader.onload = (e) => { 
            console.log(e.target.result); };
        reader.readAsDataURL(file);
    }
}*/

var struktura_btn = document.getElementById("add_struktura_btn");
var file_input = document.getElementById("file");

file_input.addEventListener("change", function(){

  struktura_btn.addEventListener("click", () => {
    
    const reader = new FileReader()
    reader.addEventListener("load", () => {
        var uploaded_image = reader.result
        //console.log(uploaded_image)

        

        data = {
          img: uploaded_image,
          numer: document.getElementById("numer").value,
          rodzaj: document.getElementById("rodzaj").value,
          coord_x: document.getElementById("coord_x").value,
          coord_y: document.getElementById("coord_y").value,
          polowanie: document.getElementById("polowanie").value
        }

        console.log(data)

        socket.emit("add_struktura", data)
    })
    reader.readAsDataURL(this.files[0])
  
  });
})

setTimeout(() => {
  if (logged == false) {
    alert(
      "Upłynął czas na zalogowanie się.\nOdśwież stronę i spróbuj ponownie!"
    );
  }
}, 10 * 1000);