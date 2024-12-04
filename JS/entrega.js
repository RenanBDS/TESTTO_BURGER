var dropdown = document.querySelector(".dropdown");
dropdown.addEventListener("click", function () {
  var dropdownContenT = document.querySelector(".dropdown-content");
  if (dropdownContenT.style.display === "block") {
    dropdownContenT.style.display = "none";
  } else {
    dropdownContenT.style.display = "block";
  }
});

function mensagemEnvio() {
  alert("Registro de localização feito com sucesso!");
  const campoUsuario = document.querySelector(".usuario");
  const campoDDD = document.querySelector(".ddd");
  const campoCelular = document.querySelector(".celular");

  campoUsuario.value = "";
  campoDDD.value = "";
  campoCelular.value = "";
}

function voltarParaPagina() {
  window.location.href = "index.html";
}
