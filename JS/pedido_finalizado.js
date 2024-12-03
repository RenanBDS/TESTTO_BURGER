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
            <img src="${item.image}" alt="${item.name}" class="imagem_do_produto">
            <div class="dadosItens">
              <h3 class="nome_do_produto"><strong>${item.name}</strong></h3>
              <h6 class="descricao"><em>${item.descricao}</em></h6>
              <h4 class="preco_do_produto"><em>R$ ${item.price.toFixed(2)}</em></h4>
              <div class="quant_item">
                <div class="quantidade-container">
                  <img src="Imagens_Editado/imagem_carrinho.png" class="carrinho">
                  <input type="number" class="quantidade-input" value="${item.quantity}" min="0" data-index="${index}">
                </div>
              </div>
            </div>
          </div>
        `;
    cartTable.appendChild(cartItem);
  });

  updateTotal(); // Atualizar o total
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
