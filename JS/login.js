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
  alert("Login feito com sucesso!");
  const campoUsuario = document.querySelector(".input-field-text");
  const campoSenha = document.querySelector(".input-field-password");

  campoUsuario.value = "";
  campoSenha.value = "";
}

function voltarParaPagina() {
  window.location.href = "index.html";
}