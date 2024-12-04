document.querySelectorAll(".comprar_item").forEach((button) => {
  button.addEventListener("click", () => {
    const productElement = button.closest(".dados");
    const productImage = productElement.previousElementSibling.src;
    const productName =
      productElement.querySelector(".nome_do_produto").innerText;
    const productDescricao =
      productElement.querySelector(".descricao").innerText;
    const productPrice =
      productElement.querySelector(".preco_do_produto").innerText;

    const product = {
      image: productImage,
      name: productName,
      descricao: productDescricao,
      price: parseFloat(productPrice.replace("R$", "").trim()),
      quantity: 1,
    };

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingProductIndex = cart.findIndex((p) => p.name === product.name);
    if (existingProductIndex > -1) {
      cart[existingProductIndex].quantity += 1;
    } else {
      cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} foi adicionado ao carrinho!`);
  });
});

function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${product.name} foi adicionado ao carrinho!`);
}

var dropdown = document.querySelector(".dropdown");
dropdown.addEventListener("click", function () {
  var dropdownContenT = document.querySelector(".dropdown-content");
  if (dropdownContenT.style.display === "block") {
    dropdownContenT.style.display = "none";
  } else {
    dropdownContenT.style.display = "block";
  }
});

function voltarParaPagina() {
  window.location.href = "index.html";
}
