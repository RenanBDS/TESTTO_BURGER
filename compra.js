const letras_compras = document.querySelectorAll(".letras_compras");
letras_compras.forEach((button) => {
  button.addEventListener("click", () => {
    button.classList.toggle("verde");
  });
});

function addProductToItens(event) {
  const button = event.target;
  const product = button.closest(".produto");
  const productTitle = product.querySelector(".nome_do_produto").innerText;
  const productPrice = product.querySelector(".preco_do_produto").innerText;
  const productImage = product.querySelector(".imagem_do_produto").src;

  // Cria um objeto com os dados do produto
  const productData = {
    title: productTitle,
    price: productPrice,
    image: productImage,
    quantity: 1,
  };

  // Verifica se o carrinho já existe no localStorage
  const itens = JSON.parse(localStorage.getItem("itens")) || [];

  // Verifica se o produto já está no carrinho
  const existingProduct = itens.find((item) => item.title === productData.title);
  if (existingProduct) {
    existingProduct.quantity += 1; // Incrementa a quantidade
  } else {
    itens.push(productData); // Adiciona novo produto ao carrinho
  }

  // Salva o carrinho atualizado no localStorage
  localStorage.setItem("itens", JSON.stringify(itens));

  alert("Produto adicionado ao carrinho!");
}

// Adiciona eventos de clique aos botões de "Comprar"
document.addEventListener("DOMContentLoaded", () => {
  const buyButtons = document.querySelectorAll(".comprar_item");
  buyButtons.forEach((button) => {
    button.addEventListener("click", addProductToItens);
  });
});

function loaditensItems() {
  const itens = JSON.parse(localStorage.getItem("itens")) || [];
  const itensTableBody = document.querySelector(".tabela_dos_itens tbody");
  const itensTotalElement = document.querySelector(".valor_dos_itens");
  let total = 0;

  itensTableBody.innerHTML = ""; // Limpa a tabela

  itens.forEach((item) => {
    const row = document.createElement("tr");
    row.classList.add("itens_product");

    row.innerHTML = `
            <td>
                <img src="${item.image}" alt="${item.title}" class="imagem_do_produto">
                <span>${item.title}</span>
            </td>
            <td>${item.price}</td>
            <td>
                <input type="number" value="${item.quantity}" min="1" class="product_qtd_input">
            </td>
            <td>
                <button class="botao_remover">Remover</button>
            </td>
        `;

    itensTableBody.appendChild(row);

    const priceNumber = parseFloat(
      item.price.replace("R$", "").replace(",", ".")
    );
    total += priceNumber * item.quantity;
  });

  itensTotalElement.innerText = `R$ ${total.toFixed(2).replace(".", ",")}`;

  setupRemoveButtons();
  setupQuantityInputs();
}

function setupRemoveButtons() {
  const removeButtons = document.querySelectorAll(".botao_remover");
  removeButtons.forEach((button) => {
    button.addEventListener("click", removeProduct);
  });
}

function removeProduct(event) {
  const button = event.target;
  const productRow = button.closest("tr");
  const productTitle = productRow.querySelector("span").innerText;

  let itens = JSON.parse(localStorage.getItem("itens")) || [];
  itens = itens.filter((item) => item.title !== productTitle);
  localStorage.setItem("itens", JSON.stringify(itens));

  loaditensItems();
}

function setupQuantityInputs() {
  const quantityInputs = document.querySelectorAll(".product_qtd_input");
  quantityInputs.forEach((input) => {
    input.addEventListener("change", updateQuantity);
  });
}

function updateQuantity(event) {
  const input = event.target;
  const productRow = input.closest("tr");
  const productTitle = productRow.querySelector("span").innerText;

  let itens = JSON.parse(localStorage.getItem("itens")) || [];
  const product = itens.find((item) => item.title === productTitle);

  if (input.value <= 0) {
    itens = itens.filter((item) => item.title !== productTitle);
  } else {
    product.quantity = parseInt(input.value);
  }

  localStorage.setItem("itens", JSON.stringify(itens));
  loaditensItems();
}

// Carrega os itens ao abrir a página
document.addEventListener("DOMContentLoaded", loaditensItems);

document.querySelector(".letras_ida_para_finalizacao").addEventListener("click", () => {
    alert("Compra finalizada! Obrigado pela preferência.");
    localStorage.removeItem("itens"); // Limpa o carrinho
    loaditensItems();
});