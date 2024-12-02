document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM completamente carregado!");
  loadCartItems(); // Carrega os itens do carrinho
  updateTotal(); // Atualiza o total
});

function loadCartItems() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartTable = document.querySelector('.tabela_com_os_produtos');

  cartTable.innerHTML = ''; // Limpa os itens do carrinho

  if (cart.length === 0) {
    cartTable.innerHTML = '<p>O carrinho está vazio!</p>';
    return;
  }

  cart.forEach((item, index) => {
    const cartItem = document.createElement('div');
    cartItem.classList.add('dados');

    cartItem.innerHTML = `
    <img src="${item.image}" alt="${item.name}" class="imagem_do_produto">
    <div class="dadosItens">
      <h3 class="nome_do_produto"><strong>${item.name}</strong></h3>
      <h6 class="descricao"><em>${item.descricao}</em></h6>
      <h4 class="preco_do_produto"><em>R$ ${item.price.toFixed(2)}</em></h4>
      <div class="quant_item">
        <div class="quantidade-container">
          <img src="Imagens_Editado/imagem_carrinho.png" class="carrinho">
          <button class="quantidade-btn" data-action="decrement" data-index="${index}">-</button>
          <input type="number" class="quantidade-input" value="${item.quantity}" min="0" data-index="${index}">
          <button class="quantidade-btn" data-action="increment" data-index="${index}">+</button>
        </div>
      </div>
      <button id="removeProduct" class="remove-product-button" data-index="${index}">Remover</button>
    </div>
    `;

    cartTable.appendChild(cartItem);
  });

  setupQuantityButtons();
  updateTotal();
}

function setupQuantityButtons() {
  document.querySelectorAll('.quantidade-container').forEach(container => {
    const decrementBtn = container.querySelector('[data-action="decrement"]');
    const incrementBtn = container.querySelector('[data-action="increment"]'); // Linha com erro
    const input = container.querySelector('.quantidade-input');

    decrementBtn.addEventListener('click', () => {
      const index = input.dataset.index;
      let currentValue = parseInt(input.value);
      if (currentValue > 0) {
        input.value = currentValue - 1;
        updateItemQuantity(index, parseInt(input.value)); // Atualiza a quantidade
        loadCartItems(); // Recarregar os itens visuais
      }

      // Remove o item se chegar a 0
      if (parseInt(input.value) === 0) {
        removeItemFromCart(index);
        loadCartItems(); // Recarrega os itens visuais
      }
    });

    incrementBtn.addEventListener('click', () => { // Linha com erro
      const index = input.dataset.index;
      let currentValue = parseInt(input.value);
      input.value = currentValue + 1;
      updateItemQuantity(index, parseInt(input.value)); // Atualiza a quantidade
      loadCartItems(); // Recarregar os itens visuais
    });

    input.addEventListener('input', () => {
      const index = input.dataset.index;
      const newQuantity = parseInt(input.value);

      if (newQuantity === 0) {
        removeItemFromCart(index);
        loadCartItems(); // Recarrega os itens visuais
      } else {
        updateItemQuantity(index, newQuantity); // Atualiza a quantidade
        loadCartItems(); // Recarregar os itens visuais
      }
    });
  });
}

incrementBtn.addEventListener('click', () => {
  const index = input.dataset.index;
  let currentValue = parseInt(input.value);
  input.value = currentValue + 1;
  updateItemQuantity(index, parseInt(input.value)); // Atualiza a quantidade
  updateTotal(); // Atualiza o total
});

decrementBtn.addEventListener('click', () => {
  const index = input.dataset.index;
  let currentValue = parseInt(input.value);
  if (currentValue > 0) {
    input.value = currentValue - 1;
    updateItemQuantity(index, parseInt(input.value)); // Atualiza a quantidade
  }

  // Remove o item se chegar a 0
  if (parseInt(input.value) === 0) {
    removeItemFromCart(index);
    loadCartItems(); // Recarrega os itens visuais
  }
  updateTotal(); // Atualiza o total
});

// Funções auxiliares
function removeItemFromCart(index) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.splice(index, 1); // Remove o item
  localStorage.setItem('cart', JSON.stringify(cart)); // Atualiza o localStorage
}

function updateItemQuantity(index, quantity) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (cart[index]) {
    cart[index].quantity = quantity; // Atualiza a quantidade no item
    localStorage.setItem('cart', JSON.stringify(cart)); // Salva no localStorage
  }
  updateTotal(); // Recalcula o total automaticamente
}

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
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.splice(index, 1); // Remove o item
  localStorage.setItem('cart', JSON.stringify(cart)); // Atualiza o localStorage
  updateTotal(); // Recalcula o total automaticamente
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
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const totalContainer = document.querySelector('#totalValue');
  if (totalContainer) {
    totalContainer.innerText = `R$ ${total.toFixed(2)}`;
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

document.addEventListener('DOMContentLoaded', () => {
  const addButton = document.querySelector('#addProduct');
  const removeButton = document.querySelector('#removeProduct');
  const container = document.querySelector('.tabela_com_os_produtos');

  // Verifica se os elementos existem
  if (addButton && removeButton && container) {
    addButton.addEventListener('click', () => {
      addItemToContainer('Produto Novo');
    });

    removeButton.addEventListener('click', () => {
      removeLastItemFromContainer();
    });
  } else {
    console.error('Elementos não encontrados no DOM.');
  }
});

const letras_compras = document.querySelectorAll(".letras_compras");
letras_compras.forEach((button) => {
  button.addEventListener("click", () => {
    // Remove a classe "verde" de todos os botões
    letras_compras.forEach((btn) => btn.classList.remove("verde"));
    // Adiciona a classe "verde" apenas ao botão clicado
    button.classList.add("verde");
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

console.log('Decrement Button:', decrementBtn);
console.log('Increment Button:', incrementBtn);