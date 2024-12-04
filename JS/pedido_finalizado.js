document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM completamente carregado!");
  loadCartItems(); // Carrega os itens do carrinho
  updateTotal(); // Atualiza o total
});

function loadCartItems() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartTable = document.querySelector(".tabela_com_os_produtos");

  cartTable.innerHTML = ""; // Limpa a tabela antes de adicionar os novos itens

  // Adiciona os itens do carrinho
  cart.forEach((item, index) => {
    const cartItem = document.createElement("tr");
    cartItem.classList.add("cart-item");
    cartItem.innerHTML = `
          <div class="ajuste">
            <img src="${item.image}" alt="${
      item.name
    }" class="imagem_do_produto">
            <div class="dadosItens">
              <h3 class="nome_do_produto"><strong>${item.name}</strong></h3>
              <h4 class="preco_do_produto"><em>R$ ${item.price.toFixed(
                2
              )}</em></h4>
              <div class="quant_item">
                <div class="quantidade-container">
                  <input type="number" class="quantidade-input" value="${
                    item.quantity
                  }" min="0" data-index="${index}" readonly>
                </div>
              </div>
            </div>
          </div>
        `;
    cartTable.appendChild(cartItem);
  });

  updateTotal(); // Atualizar o total
}

function updateTotal() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const totalContainer = document.querySelector("#totalValue");
  if (totalContainer) {
    totalContainer.innerText = `R$ ${total.toFixed(2)}`;
  } else {
    console.error("Elemento de total não encontrado no DOM.");
  }
}

function clean() {
  localStorage.clear();
  window.location.href = "index.html";
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
  window.location.href = "compra.html";
}
