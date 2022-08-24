let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");

//open cart
cartIcon.onclick = () => {
    cart.classList.add("active");
}

//close cart
closeCart.onclick = () => {
    cart.classList.remove("active");
}

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() {
    //remove from cart
    var removeCartButtons = document.getElementsByClassName('cart-remove');

    for (let i = 0; i < removeCartButtons.length; i++) {
        let button = removeCartButtons[i];
        button.addEventListener('click', removeCartItem);
    }

    //quantity changes
    let quantityInput = document.getElementsByClassName('cart-quantity');
    for (let i = 0; i < quantityInput.length; i++) {
        let input = quantityInput[i];

        input.addEventListener('change', quantityChanged);
    }
    //add to cart
    let addToCart = document.getElementsByClassName('add-cart');
    for (let i = 0; i < addToCart.length; i++) {
        let btn = addToCart[i];
        btn.addEventListener('click', addToCartCLicked);

    }

    //buy button
    document.getElementsByClassName('btn-buy')[0].addEventListener("click", buyButtonClicked);
}

//buy button
const buyButtonClicked = (event) => {
    alert('Your Order is placed!');
    let cartContent = document.getElementsByClassName('cart-content')[0];

    while (cartContent.hasChildNodes()) {
        cartContent.removeChild(cartContent.firstChild);

    }
    updateTotal();

}
//add to cart button clicked
const addToCartCLicked = (event) => {
    let btn = event.target;

    let shopProducts = btn.parentElement;

    let productImg = shopProducts.getElementsByClassName('product-img')[0].src;
    let title = shopProducts.getElementsByClassName('product-title')[0].innerText;
    let price = shopProducts.getElementsByClassName('price')[0].innerText;

    addProductToCart(title, price, productImg);

    updateTotal();

}

//add product to cart
function addProductToCart(title, price, img) {
    let cartShopBox = document.createElement("div");
    cartShopBox.classList.add('cart-box');

    let cartItems = document.getElementsByClassName('cart-content')[0];

    let itemNames = cartItems.getElementsByClassName('cart-product-title');

    for (let i = 0; i < itemNames.length; i++) {
        if (itemNames[i].innerText == title) {
            alert("You have already add this item to cart");
            return;
        }

    }

    let cartBoxContent = ` <img src="${img}" alt="" class="cart-img">
                        <div class="detail-box">
                            <div class="cart-product-title">${title}</div>
                            <div class="cart-price">${price}</div>
                            <input type="number" value="1" class="cart-quantity">
                        </div>
                        <i class="bx bxs-trash-alt cart-remove"></i>`

    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);

    cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem);
    cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged);


}




//quantity changed
const quantityChanged = (event) => {

    let input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateTotal();

}

const removeCartItem = (event) => {
    let btn = event.target;
    btn.parentElement.remove();

    updateTotal();
}

const updateTotal = () => {
    let cartContent = document.getElementsByClassName('cart-content')[0];
    let cartBoxes = cartContent.getElementsByClassName('cart-box');
    var total = 0;

    for (let i = 0; i < cartBoxes.length; i++) {
        let cartBox = cartBoxes[i];

        let priceElement = cartBox.getElementsByClassName('cart-price')[0];
        var price = parseFloat(priceElement.innerText.replace("$", ""));

        let quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        var quantity = quantityElement.value;
        
        total = total + (price * quantity);

    }
    
    total = Math.round(total * 100) / 100;

    document.getElementsByClassName('total-price')[0].innerText = "$" + total;



}