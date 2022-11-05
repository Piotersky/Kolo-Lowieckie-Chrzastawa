var socket = io({
  extraHeaders: {
    subpage: "struktury",
  },
});

const parentDiv = document.getElementById('struktury');

socket.on("struktura", (data) => {
  number = data.number;

  if (data.rodzaj == 1) {
    text = "Ambona " + number;
  }
  if (data.rodzaj == 2) {
    text = "Zwyżka " + number;
  }
  if (data.rodzaj == 3) {
    text = "Wysiadka " + number;
  }

  if (!data.image) {
    parentDiv.innerHTML +=
      '<div class="struktura" id="div' +
      number +
      '" onmouseleave="leave(' +
      number +
      ', )" onmouseover="hover(' +
      number +
      ')"><p class="title" id="title' +
      number +
      '">' +
      text +
      '</p><p class="desc" id="desc' +
      number +
      '">🔢Numer: ' +
      data.number +
      "<br>📒Polowanie: " +
      data.polowanie +
      '</p><img id="img' +
      number +
      '" class="img" src="client/img/no_img.png"></div>';
    return;
  }

  parentDiv.innerHTML +=
    '<div class="struktura" id="div' +
    number +
    '" onmouseleave="leave(' +
    number +
    ', )" onmouseover="hover(' +
    number +
    ')"><p class="title" id="title' +
    number +
    '">' +
    text +
    '</p><p class="desc" id="desc' +
    number +
    '">🔢Numer: ' +
    data.number +
    "<br>📒Polowanie: " +
    data.polowanie +
    '</p><img id="img' +
    number +
    '" class="img" src="data:image/png;base64, ' +
    data.buffer +
    '"></div>';

  console.log(data);
});

//const struktury = document.querySelectorAll('.struktura');
var szukaj = document.getElementById("szukaj");

function hover(numer) {
  var div = document.getElementById("div" + numer);

  div.style.width = "500px";
  div.style.height = "500px";

  var img = document.getElementById("img" + numer);

  img.style.visibility = "hidden";

  var title = document.getElementById("title" + numer);

  title.style.visibility = "hidden";

  var desc = document.getElementById("desc" + numer);

  desc.style.visibility = "visible";
  desc.style.width = "100%";
  desc.style.height = "100%";
}

function leave(numer) {
  var div = document.getElementById("div" + numer);

  div.style.width = "350px";
  div.style.height = "350px";

  var img = document.getElementById("img" + numer);

  img.style.visibility = "visible";

  var title = document.getElementById("title" + numer);

  title.style.visibility = "visible";

  var desc = document.getElementById("desc" + numer);

  desc.style.visibility = "hidden";
  desc.style.width = "0%";
  desc.style.height = "0%";
}

szukaj.addEventListener("click", () => {
  const struktury = Array.from(document.getElementsByClassName('struktura'))

  struktury.forEach((div) => {
    div.remove();
  });

  ambony = document.getElementById("ambony").checked
  zwyżki = document.getElementById("zwyżki").checked
  wysiadki = document.getElementById("wysiadki").checked
  wszystkie = document.getElementById("wszystkie").checked

  /*array = [false, false, true, false]

  console.log(array[2])

  checked = "wszystkie"*/

  array = [ambony, zwyżki, wysiadki, wszystkie]

  search = {
    val: document.getElementById("znajdz").value,
    rodzaj: array,
  }

  socket.emit("search", search);
});

//window.location.reload()
