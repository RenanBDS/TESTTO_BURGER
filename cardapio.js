document.querySelectorAll('.comprar_item').forEach((button) => {
  button.addEventListener('click', () => {
      const productElement = button.closest('.dados');
      const productName = productElement.querySelector('.nome_do_produto').innerText;
      const productDescricao = productElement.querySelector('.descricao').innerText;
      const productPrice = productElement.querySelector('.preco_do_produto').innerText;
      const productImage = productElement.previousElementSibling.src; // Obtém o src da imagem do produto

      // Converter o preço para número
      const product = {
          image: productImage, // Adiciona a URL da imagem
          name: productName,
          descricao: productDescricao,
          price: parseFloat(productPrice.replace('R$', '').trim()), // Converte o preço para número
          quantity: 1,
      };

      // Recuperar carrinho existente
      let cart = JSON.parse(localStorage.getItem('cart')) || [];

      // Verificar se o produto já está no carrinho
      const existingProductIndex = cart.findIndex((p) => p.name === product.name);
      if (existingProductIndex > -1) {
          cart[existingProductIndex].quantity += 1; // Incrementa a quantidade
      } else {
          cart.push(product); // Adiciona novo produto
      }

      localStorage.setItem('cart', JSON.stringify(cart)); // Salva no localStorage
      alert(`${product.name} foi adicionado ao carrinho!`);
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