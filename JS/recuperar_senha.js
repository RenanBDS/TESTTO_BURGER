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
  alert("E-mail enviado para fazer a redefinição da senha!");
  const campoUsuario = document.querySelector(".input-field-text");

  campoUsuario.value = "";
}

function voltarParaPagina() {
  window.location.href = "login.html";
}
