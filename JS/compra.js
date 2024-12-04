document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM completamente carregado!");
  loadCartItems(); // Carrega os itens do carrinho
  updateTotal(); // Atualiza o total
});

function loadCartItems() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartTable = document.querySelector(".tabela_com_os_produtos");
  const wrapper = document.querySelector(".tabela_com_os_produtos-wrapper");

  cartTable.innerHTML = ""; // Limpa a tabela antes de adicionar os novos itens

  if (cart.length === 0) {
    wrapper.innerHTML = "<p>Seu carrinho está vazio!</p>";
    return;
  }

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
              <h6 class="descricao"><em>${item.descricao}</em></h6>
              <h4 class="preco_do_produto"><em>R$ ${item.price.toFixed(
                2
              )}</em></h4>
              <div class="quant_item">
                <div class="quantidade-container">
                  <img src="Imagens_Editado/imagem_carrinho.png" class="carrinho">
                  <button class="quantidade-btn" data-action="decrement" data-index="${index}">-</button>
                  <input type="number" class="quantidade-input" value="${
                    item.quantity
                  }" min="0" data-index="${index}">
                  <button class="quantidade-btn" data-action="increment" data-index="${index}">+</button>
                </div>
              </div>
              <button id="removeProduct" class="remove-product-button" data-index="${index}">Remover</button>
            </div>
          </div>
        `;
    cartTable.appendChild(cartItem);
  });

  updateTotal(); // Atualizar o total
}

document.addEventListener("click", function (event) {
  if (event.target.classList.contains("quantidade-btn")) {
    const index = event.target.dataset.index; // Obtém o índice do item
    const action = event.target.dataset.action; // Obtém a ação (increment ou decrement)

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (!cart[index]) return; // Verifica se o item existe no carrinho

    if (action === "increment") {
      cart[index].quantity += 1; // Incrementa a quantidade
    } else if (action === "decrement" && cart[index].quantity > 1) {
      cart[index].quantity -= 1; // Decrementa a quantidade (mínimo 1)
    } else if (action === "decrement" && cart[index].quantity === 1) {
      // Remove o item se a quantidade for 1 e o botão de decremento for pressionado
      cart.splice(index, 1);
    }

    localStorage.setItem("cart", JSON.stringify(cart)); // Atualiza o localStorage
    loadCartItems(); // Recarrega os itens no DOM
    updateTotal(); // Recalcula o total
  }
});

document.addEventListener("input", function (event) {
  if (event.target.classList.contains("quantidade-input")) {
    const index = event.target.dataset.index; // Índice do item no carrinho
    const newQuantity = parseInt(event.target.value); // Nova quantidade

    if (isNaN(newQuantity) || newQuantity <= 0) {
      // Se a quantidade for inválida ou zero, remove o item
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
  loadCartItems();
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

  const totalContainer = document.querySelector("#totalValue");
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

document.addEventListener("DOMContentLoaded", loadCartItems);

const letras_compras = document.querySelectorAll(".letras_compras");

letras_compras.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.classList.contains("verde")) {
      button.classList.remove("verde");
    } else {
      letras_compras.forEach((btn) => btn.classList.remove("verde"));
      button.classList.add("verde");
    }
  });
});

var dropdown = document.querySelector(".dropdown");
dropdown.addEventListener("click", function () {
  var dropdownContenT = document.querySelector(".dropdown-content");
  if (dropdownContenT.style.display === "block") {
    dropdownContenT.style.display = "none";
  } else {
    dropdownContenT.style.display = "block";
  }
});

function pedidoFinalizado() {
  const selectedPayment = document.querySelector(".letras_compras.verde");
  if (!selectedPayment) {
    alert(
      "Por favor, escolha uma forma de pagamento antes de finalizar a compra."
    );
    return;
  }
  const total = parseFloat(
    document.querySelector("#totalValue").innerText.replace("R$", "").trim()
  );
  if (total == 0) {
    alert("Carrinho vazio, adicione algum item!");
    return;
  }
  alert("Pagemento bem sucedido!");
  window.location.href = "pedido_finalizado.html";
}

function voltarParaPagina() {
  window.location.href = "cardapio.html";
}
