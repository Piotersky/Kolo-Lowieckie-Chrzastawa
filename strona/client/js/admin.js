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

/*data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfQAAAH0CAYAAADL1t+KAAAAAXNSR0IArs4c6QAAIABJREFUeF7t3XuUJVVh7/Fv9Qzg24igoMk1yYpRoya+kxs0ajSaRBNjfCDyMMaRme4eRgcECYoMKIgYQGF6hkG4Poio8YEmehWDRuMTjQ8wRom5JqxolAExEVCRma679pxqcuZMvXadOqera779D2vRtav2/uw9/avHrl0J/iiggAIKKKDAihdIVnwLbIACCiiggAIKYKA7CBRQQAEFFOiBgIHeg060CQoooIACChjojgEFFFBAAQV6IGCg96ATbYICCiiggAIGumNAAQUUUECBHggY6D3oRJuggAIKKKCAge4YUEABBRRQoAcCBnoPOtEmKKCAAgooYKA7BhRQQAEFFOiBgIHeg060CQoooIACChjojgEFFFBAAQV6IGCg96ATbYICCiiggAIGumNAAQUUUECBHggY6D3oRJuggAIKKKCAge4YUEABBRRQoAcCBnoPOtEmKKCAAgooYKA7BhRQQAEFFOiBgIHeg060CQoooIACChjojgEFFFBAAQV6IGCg96ATbYICCiiggAIGumNAAQUUUECBHggY6D3oRJuggAIKKKCAge4YUEABBRRQoAcCBnoPOtEmKKCAAgooYKA7BhRQQAEFFOiBgIHeg060CQoooIACChjojgEFFFBAAQV6IGCg96ATbYICCiiggAIGumNAAQUUUECBHggY6D3oRJuggAIKKKCAge4YUEABBRRQoAcCBnoPOtEmKKCAAgooYKA7BhRQQAEFFOiBgIHeg060CQoooIACChjojgEFFFBAAQV6IGCg96ATbYICCiiggAIGumNAAQUUUECBHggY6D3oRJuggAIKKKCAge4YUEABBRRQoAcCBnoPOtEmKKCAAgooYKA7BhRQQAEFFOiBgIHeg060CQoooIACChjojgEFFFBAAQV6IGCg96ATbYICCiiggAIGumNAAQUUUECBHggY6D3oRJuggAIKKKCAge4YUEABBRRQoAcCBnoPOtEmKKCAAgooYKA7BhRQQAEFFOiBgIHeg060CQoooIACChjojgEFFFBAAQV6IGCg96ATbYICCiiggAIGumNAAQUUUECBHggY6D3oRJuggAIKKKCAge4YUEABBRRQoAcCBnoPOtEmKKCAAgooYKA7BhRQQAEFFOiBgIHeg060CQoooIACChjojgEFFFBAAQV6IGCg96ATbYICCiiggAIGumNAAQUUUECBHggY6D3oRJuggAIKKKCAge4YUEABBRRQoAcCBnoPOtEmKKCAAgooYKA7BhRQQAEFFOiBgIHeg060CQoooIACChjojgEFFFBAAQV6IGCg96ATbYICCiiggAIGumNAAQUUUECBHggY6D3oRJuggAIKKKCAge4YUEABBRRQoAcCBnoPOtEmKKCAAgooYKA7BhRQQAEFFOiBgIHeg060CQoooIACChjojgEFFFBAAQV6IGCg96ATbYICCiiggAIGumNAAQUUUECBHggY6D3oRJuggAIKKKCAge4YUEABBRRQoAcCBnoPOtEmKKCAAgooYKA7BhRQQAEFFOiBgIHeg060CQoooIACChjojgEFFFBAAQV6IGCg96ATbYICCiiggAIGumNAAQUUUECBHggY6D3oRJuggAIKKKCAge4YUEABBRRQoAcCBnoPOtEmKKCAAgooYKA7BhRQQAEFFOiBgIHeg060CQoooIACChjojgEFFFBAAQV6IGCg96ATbYICCiiggAIGumNAAQUUUECBHggY6D3oRJuggAIKKKCAge4YUEABBRRQoAcCBnoPOtEmKKCAAgooYKA7BhRQQAEFFOiBgIHeg060CQoooIACChjojgEFFFBAAQV6IGCg96ATbYICCiiggAIGumNAAQUUUECBHggY6D3oRJuggAIKKKCAge4YUEABBRRQoAcCBnoPOtEmKKCAAgooYKA7BhRQQAEFFOiBgIHeg060CQoooIACChjojgEFFFBAAQV6IGCg96ATbYICCiiggAIGumNAAQUUUECBHggY6D3oRJuggAIKKKCAge4YUEABBRRQoAcCBnoPOtEmKKCAAgooYKA7BhRQQAEFFOiBgIHeg060CQoooIACChjojgEFFFBAAQV6IGCg96ATbYICCiiggAIGumNAAQUUUECBHggY6D3oRJuggAIKKKCAge4YUEABBRRQoAcCBnoPOtEmKKCAAgooYKA7BhRQQAEFFOiBgIHeg060CQoooIACChjojgEFFFBAAQV6IGCg96ATbYICCiiggAIGumNAAQUUUECBHggY6D3oRJuggAIKKKCAge4YUEABBRRQoAcCBnoPOtEmKKCAAgooYKA7BhRQQAEFFOiBgIHeg060CQoooIACChjojgEFFFBAAQV6IGCg96ATbYICCiiggAIGumNAAQUUUECBHggY6D3oRJuggAIKKKCAge4YUEABBRRQoAcCBnoPOtEmKKCAAgooYKA7BhRQQAEFFOiBgIHeg060CQoooIACChjojgEFFFBAAQV6IGCg96ATbYICCiiggAIGumNAAQUUUECBHggY6D3oRJuggAIKKKCAge4YUEABBRRQoAcCBnoPOtEmKKCAAgooYKA7BhRQQAEFFOiBgIHeg060CQoooIACChjojgEFFFBAAQV6IGCg96ATbYICCiiggAIGumNAAQUUUECBHggY6D3oRJuggAIKKKCAge4YUEABBRRQoAcCBnoPOtEmKKCAAgooYKA7BhRQQAEFFOiBgIHeg060CQoooIACChjojgEFFFBAAQV6IGCg96ATbYICCiiggAIGumNAAQUUUECBHggY6D3oRJuggAIKKKCAge4YUEABBRRQoAcCBnoPOtEmKKCAAgooYKA7BhRQQAEFFOiBgIHeg060CQoooIACChjojgEFFFBAAQV6IGCg96ATbYICCiiggAIGumNAAQUUUECBHggY6D3oRJuggAIKKKCAge4YUEABBRRQoAcCBnoPOtEmKKCAAgooYKA7BhRQQAEFFOiBgIHeg060CQoooIACChjojgEFFFBAAQV6IGCg96ATbYICCiiggAIGumNAAQUUUECBHggY6D3oRJuggAIKKKCAge4YUEABBRRQoAcCBnoPOtEmKKCAAgooYKA7BhRQQAEFFOiBgIHeg060CQoooIACChjojgEFFFBAAQV6IGCg96ATbYICCiiggAIGumNAAQUUUECBHggY6D3oRJuggAIKKKCAge4YUEABBRRQoAcCBnoPOtEmKKCAAgooYKA7BhRQQAEFFOiBgIHeg060CQoooIACChjojgEFFFBAAQV6IGCg96ATbYICCiiggAIGumNAAQUUUECBHggY6D3oRJuggAIKKKCAge4YUEABBRRQoAcCBnoPOtEmKKCAAgooYKA7BhRQQAEFFOiBgIHeg060CQoooIACChjojgEFFFBAAQV6IGCg96ATbYICCiiggAIGumNAAQUUUECBHggY6D3oRJuggAIKKKCAge4YUEABBRRQoAcCBnoPOtEmKKCAAgooYKA7BhRQQAEFFOiBgIHeg060CQoooIACChjo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*/
