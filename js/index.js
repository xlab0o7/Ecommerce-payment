//Cart open and close 
let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart');

//Open cart
cartIcon.onclick = () => {
    cart.classList.add("active");
    console.log('cartIcon is pressed')
};
//Close cart
closeCart.onclick = () => {
    cart.classList.remove('active');
}

//adding items to cart
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

//function for removing items from cart
function ready() {
    var removeCartButton = document.getElementsByClassName('cart-remove');
    for (var i = 0; i < removeCartButton.length; i++) {
        let buttonId = removeCartButton[i];
        buttonId.addEventListener('click', removeCartItem);
    }

    let quantityInputs = document.getElementsByClassName('cart-quantity');
    for (var j = 0; j < quantityInputs.length; j++) {
        //Add EventListener To Quantity Inputs For Updating Cart Totals On Change
        let input = quantityInputs[j]
        input.addEventListener('change', quantityChanged);
    }
    // Add to cart
    var addCart = document.getElementsByClassName('add-cart');
    for (var k = 0; k < addCart.length; k++) {
        let addToCartBtn = addCart[k];
        addToCartBtn.addEventListener('click', addCartClicked);
    }

    // loadCartItems();
}
function addCartClicked(event) {
    let button = event.target;
    var shopProducts = button.parentElement;
    let title = shopProducts.getElementsByClassName("product-title")[0].innerText;
    let price = shopProducts.getElementsByClassName("price")[0].innerText;
    let productImg = shopProducts.getElementsByClassName("product-img")[0].src;
    addProductToCart(title, price, productImg);
    updateTotal();

    // saveCartItems();
};
function addProductToCart(title, price, productImg) {
    let cartShopBox = document.createElement('div');
    cartShopBox.classList.add('cart-box');
    let cartItems = document.getElementsByClassName("cart-content")[0];
    let cartItemsName = cartItems.getElementsByClassName('cart-product-title');
    for (let i = 0; i < cartItemsName.length; i++) {
        if (cartItemsName[i].innerText == title) {
            alert("you have already added this item to cart");
            return;
        }
    }
    let cartBoxContent =
        ` <img src="${productImg}" alt="" class="cart-img" />
            <div class="detail-box">
                <div class="cart-product-title">${title}</div>
                <div class="cart-price">${price}</div>
                <input type="number" name="" id="" value="1" class="cart-quantity"/>
            </div> 
            <!-- removal of items -->
        <i class='bx bxs-trash cart-remove' ></i> `;
    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox.getElementsByClassName('cart-remove')[0]
        .addEventListener('click', removeCartItem);
    cartShopBox.getElementsByClassName('cart-quantity')[0]
        .addEventListener('change', quantityChanged);

    // saveCartItems();

}
// For removing items from cart
function removeCartItem(event) {
    let buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateTotal();

    // saveCartItems();
}

function quantityChanged(event) {
    let input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateTotal();

    // saveCartItems();
}
// Update Total
function updateTotal() {
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName('cart-box');
    let total = 0;
    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName('cart-price')[0];
        console.log(priceElement);
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        var price = parseFloat(priceElement.innerText.replace('$', ''));
        var quantity = quantityElement.value;
        total += price * quantity;
    }
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('total-price')[0].innerText = '$' + total;
    // saving items

    // localStorage.setItem('cartTotal', total);
}
// to keep items inside the cart even refreshing
// function saveCartItems() {
//     var cartContent = document.getElementsByClassName('cart-content')[0];
//     var cartBoxes = cartContent.getElementsByClassName('cart-box');
//     var cartItems = [];

//     for (var i = 0; i < cartBoxes.length; i++) {
//         cartBox = cartBoxes[i];
//         var titleElement = cartBox.getElementsByClassName('cart-product-title')[0];
//         var priceElement = cart.getElementsByClassName('cart-price')[0];
//         var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
//         var productImg = cartBox.getElementsByClassName('cart-img')[0].src;

//         var item = {
//             title: titleElement.innerText,
//             price: priceElement.innerText,
//             quantity: quantityElement.value,
//             productImg: productImg,
//         }
//         cartItems.push(item);
//     }
//     localStorage.setItem('cartItems', JSON.stringify(cartItems));
// }
// Loads in Cart
// function loadCartItems() {
//     var cartItems = localStorage.getItem('cartItems');
//     if (cartItems) {
//         cartItems = JSON.parse(cartItems);

//         for (var i = 0; i < cartItems.length; i++) {
//             var item = cartItems[i];
//             addProductToCart(item.title, item.price, item.productImg);

//             var cartBoxes = document.getElementsByClassName("cart-box");
//             var cartBox = cartBoxes[cartBoxes.length - 1];
//             var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
//             quantityElement.value = item.quantity;
//         }
//     }
//     var cartTotal = localStorage.getItem('cartTotal');
//     if (cartTotal) {
//         document.getElementsByClassName("total-price")[0].innerText = "$" + cartTotal;
//     }
// }