document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM completamente carregado!");
  loadCartItems(); // Carrega os itens do carrinho
  updateTotal(); // Atualiza o total
});

function loadCartItems() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartTable = document.querySelector(".tabela_com_os_produtos");
  const totalContainer = document.querySelector(".total-container");

  cartTable.innerHTML = ""; // Limpa a tabela antes de adicionar os novos itens

  cart.forEach((item, index) => {
    const cartItem = document.createElement("tr");
    cartItem.classList.add("cart-item");
    cartItem.innerHTML = `
            <td>${item.name}</td>
            <td>R$ ${item.price.toFixed(2)}</td>
            <td>
                <input class="product-qtd-input" type="number" value="${
                  item.quantity
                }" min="0" data-index="${index}">
            </td>
            <td>
                <button class="remove-product-button" data-index="${index}">Remover</button>
            </td>
        `;
    cartTable.appendChild(cartItem);
  });

  // Atualizar o total após a inserção dos itens
  updateTotal();
}

document.addEventListener("input", function (event) {
  if (event.target.classList.contains("product-qtd-input")) {
    const index = event.target.dataset.index;
    const newQuantity = parseInt(event.target.value);

    if (newQuantity === 0) {
      // Se a quantidade for zero, remove o item do carrinho
      removeItemFromCart(index);
    } else {
      // Caso contrário, atualiza a quantidade
      updateItemQuantity(index, newQuantity);
    }

    loadCartItems(); // Recarregar os itens
    updateTotal(); // Recalcular o total
  }
});

function setupCartListeners() {
  // Adiciona um ouvinte para o botão "Remover" de cada produto
  document.querySelectorAll(".remove-product-button").forEach((button) => {
    button.addEventListener("click", removeProduct);
  });

  // Adiciona um ouvinte para os campos de quantidade dos produtos
  document.querySelectorAll(".product-qtd-input").forEach((input) => {
    input.addEventListener("change", updateQuantity);
  });
}

document.addEventListener("click", function (event) {
  if (event.target.classList.contains("remove-product-button")) {
    const index = event.target.dataset.index; // Índice do item a ser removido
    removeItemFromCart(index);
    loadCartItems(); // Recarregar os itens do carrinho na página
    updateTotal(); // Recalcular o total após a remoção
  }
});

// Função para remover o item do carrinho no localStorage
function removeItemFromCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1); // Remove o item com o índice especificado
  localStorage.setItem("cart", JSON.stringify(cart)); // Atualiza o localStorage
}

document.addEventListener("input", function (event) {
  if (event.target.classList.contains("product-qtd-input")) {
    const index = event.target.dataset.index; // Índice do item no carrinho
    const newQuantity = parseInt(event.target.value); // Nova quantidade
    updateItemQuantity(index, newQuantity);
    updateTotal(); // Recalcular o total após a alteração
  }
});

// Função para atualizar a quantidade no localStorage
function updateItemQuantity(index, quantity) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart[index]) {
    cart[index].quantity = quantity;
    localStorage.setItem("cart", JSON.stringify(cart)); // Salvar novamente no localStorage
  }
}

function updateTotal() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const totalContainer = document.querySelector(".total-container #totalValue");
  if (totalContainer) {
    totalContainer.innerText = `R$ ${total.toFixed(2)}`;
  } else {
    console.error("Elemento de total não encontrado no DOM.");
  }
}

if (localStorage.getItem("cart")) {
  // Se o carrinho já estiver salvo, ele será carregado corretamente
  loadCartItems();
} else {
  // Caso contrário, o carrinho começa vazio
  console.log("Carrinho vazio, carregando inicial...");
  loadCartItems();
}

const letras_compras = document.querySelectorAll(".letras_compras");
letras_compras.forEach((button) => {
  button.addEventListener("click", () => {
    button.classList.toggle("verde");
  });
});