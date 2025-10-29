import { menuArray } from "./data.js"

const productsListContainer = document.getElementById("products-list-container")
const orderMenuDiv = document.getElementById("order-checkout")
const orderProductsListContainer = document.getElementById("order-products-list-container")
const orderMenuOutterContainer = document.getElementById("order-menu-outter-container")
const payForm = document.getElementById("pay-form")
const closeOrderMenuBtn = document.getElementById("order-checkout-close")
const openOrderMenuBtn = document.getElementById("open-cart-btn")
const completeOrderBtn = document.getElementById("complete-order-btn")
const orderMenuCloseBtn = document.getElementById("order-menu-close-btn")
const reloadBtn = document.getElementById("reload-btn")

const cart = new Set()

closeOrderMenuBtn.addEventListener("click", () => { toggleCartView(true) })

openOrderMenuBtn.addEventListener("click", () => { toggleCartView(false) })

completeOrderBtn.addEventListener("click", () => {
    if(!cart.size) {
        document.getElementById("complete-order-warning").style.display = "block"
    } else {
        document.getElementById("complete-order-warning").style.display = "none"
        orderMenuOutterContainer.style.display = "flex"
        toggleCartView(true)
    }
})

orderMenuCloseBtn.addEventListener("click", () => {
    orderMenuOutterContainer.style.display = "none"
})

payForm.addEventListener("submit", event => {
    document.getElementById("buy-message-container").style.display = "block"
    orderMenuOutterContainer.style.display = "none"
    event.preventDefault()
})

reloadBtn.addEventListener("click", () => {
    window.location.reload()
})

document.addEventListener("mousedown", event => {
    if(event.target.dataset.buttonId != undefined) {
        addToCart(event.target.dataset.buttonId)
    } else if ( event.target.dataset.removeBtn != undefined){
        removeFromCart(event.target.dataset.removeBtn)
    }
})

renderItems()

function renderItems() {
    let htmlSnippet = ""
    menuArray.forEach(element => {
        htmlSnippet += `
        <div class="product-container">
            <img src="${element.image}" alt="${element.name} image">
            <div class="product-container-text">
                <h3>${element.name}</h3>
                <p>${element.ingredients}</p>
                <h4>$${element.price}</h4>
            </div>
            <button data-button-id="${element.id}">+</button>
        </div>`
    });
    productsListContainer.innerHTML = htmlSnippet
}

function addToCart(productId) {
    cart.add(productId)
    renderCartItems()
    toggleCartView()
}

function toggleCartView(closed=false) {
    if(closed) {
        orderMenuDiv.classList.add("close")
        openOrderMenuBtn.style.display = "block"
    } else {
        orderMenuDiv.classList.remove("close")
        openOrderMenuBtn.style.display = "none"
    }
}

function removeFromCart(id) {
    cart.delete(id)
    renderCartItems()
}

function renderCartItems() {
    let htmlSnippet = ""
    cart.forEach(element => {
        htmlSnippet += `
        <div class="order-products-list">
            <h3>${menuArray.find(obj => obj.id == element).name}</h3>
            <button data-remove-btn="${element}">remove</button>
            <h3 class="order-product-price">$${menuArray.find(obj => obj.id == element).price}</h3>
        </div>`
    })
    orderProductsListContainer.innerHTML = htmlSnippet
}
