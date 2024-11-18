const letras_compras = document.querySelectorAll('.letras_compras');
letras_compras.forEach(button => {
    button.addEventListener('click', () => {
        button.classList.toggle('verde');
    });
});

const removeProductButtons = document.getElementsByClassName("remove-product-button")
for (var i = 0; i < removeProductButtons.length; i++){
    removeProductButtons[i].addEventListener("click", function(event) {
        event.target.parentElement.parentElement.remove()
        updateTotal()
    })
}

function updateTotal() {
    let totalAmount = 0
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