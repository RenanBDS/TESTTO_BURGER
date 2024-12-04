var dropdown = document.querySelector(".dropdown");
dropdown.addEventListener("click", function () {
  var dropdownContenT = document.querySelector(".dropdown-content");
  if (dropdownContenT.style.display === "block") {
    dropdownContenT.style.display = "none";
  } else {
    dropdownContenT.style.display = "block";
  }
});

window.onload = function () {
  var referrer = document.referrer;
  var voltarButton = document.querySelector(".voltarParaCompraFinalizada");
  if (referrer.includes("pedido_finalizado.html")) {
    voltarButton.style.display = "block";
  } else {
    voltarButton.style.display = "none";
  }
};

function voltarParaCompraFinalizada() {
  window.location.href = "pedido_finalizado.html";
}

function voltarParaPagina() {
  window.location.href = "index.html";
}
