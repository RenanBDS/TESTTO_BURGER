if (document.readyState = "loading"){
    document.addEventListener("DOMContentLoaded", ready)
} else{
    ready()
}

var totalAmount = "0,00"

function ready() {
    const removeProductButtons = document.getElementsByClassName("botao_remover")
    for (var i = 0; i < removeProductButtons.length; i++){
        removeProductButtons[i].addEventListener("click", removeProduct)
    }

    const quantityInputs = document.getElementsByClassName("product-qtd-input")
    for (var i = 0; i < quantityInputs.length; i++){
        quantityInputs[i].addEventListener("change", updateTotal)
    }

    const addToCartButtons = document.getElementsByClassName("button-hover-background")
    for (var i = 0; i < addToCartButtons.length; i++){
        addToCartButtons[i].addEventListener("click", addProductToCart)
    }

    const purchaseButtuns = document.getElementsByClassName("purchase-button")[0]
    purchaseButtuns.addEventListener("click", makePurchase)
}

function makePurchase() {
    if (totalAmount == "0,00"){
        alert("Seu carrinho está vazio!")
    } else{
        alert(
            `
                Obrigado pela sua compra!
                valor do pedido: ${totalAmount}
                Volte sempre :)
            `
        )
    }

    document.querySelector(".itens").innerHTML = ""
    updateTotal()
}

function checkIfInputIsNull(event) {
    if(event.target.value == "0") {
        event.target.value.parentElement.parentElement.remove()
    }
    
    updateTotal()
}

function removeProduct(event) {
    event.target.parentElement.parentElement.remove()
    updateTotal()
}

const letras_compras = document.querySelectorAll('.letras_compras');
letras_compras.forEach(button => {
    button.addEventListener('click', () => {
        button.classList.toggle('verde');
    });
});

function updateTotal() {
    totalAmount = 0
    const carProducts = document.getElementsByClassName("cart-product")
    for (var i = 0; i < carProducts.length; i++){
        const productPrice = carProducts[i].getElementsByClassName("cart-product-price")[0].innerText.replace("R$", "").replace(",", ".")
        const productQuantity = carProducts[i].getElementsByClassName("product-qtd-input")[0].value
    
        totalAmount += productPrice * productQuantity
    }
    totalAmount = totalAmount.toFixed(2)
    totalAmount = totalAmount.replace(".", ",")
    document.querySelector("cart-total-container span").innerText = "R$" + totalAmount
}

function addProductToCart(event) {
    const button = event.target
    const productInfos = button.parentElement.parentElement
    const productImage = productInfos.getElementsByClassName("imagem_do_produto")[0].src
    const productTitle = productInfos.getElementsByClassName("nome_do_produto")[0].innerText
    const productPrice = productInfos.getElementsByClassName("preco_do_produto")[0].innerText
    
    const productCarName = document.getElementsByClassName("cart-product-title")
    for (var i = 0; i < productCarName.length; i++){
        if (productCarName[i].innerText == productTitle){
            productCarName[i].parentElement.parentElement.getElementsByClassName("product-qtd-input")[0].value++
            return
        }
    }

    let newCartProduct = document.createElement("tr")
    newCartProduct.classList.add("cart-product")

    newCartProduct.innerHTML = 
    `
        <div>
            <img src="${productImage}" alt="${productTitle}" class="imagem_do_produto">
            <div class="dados">
                <h3 class="nome_do_produto"><strong>${productTitle}</strong></h3>
                <h4 class="preco_do_produto"><em>${productPrice}</em></h4>
                <input type="number" value="1" min="0" class="product-qtd-input">
                <button type="button" class="botao_remover">Remover</button>
            </div>
        </div>
    `

    const tableBody = document.querySelector(".cart-table tbody")
    tableBody.append(newCartProduct)

    updateTotal()
    newCartProduct.getElementsByClassName("product-qtd-input")[0].addEventListener("change", checkIfInputIsNull)
    newCartProduct.getElementsByClassName("botao_remover")[0].addEventListener("click", removeProduct)
}