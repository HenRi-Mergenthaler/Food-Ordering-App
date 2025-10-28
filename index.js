import { menuArray } from "./data.js"

const productsListContainer = document.getElementById("products-list-container")
const orderMenuDiv = document.getElementById("order-checkout")
const orderProductsListContainer = document.getElementById("order-products-list-container")
const closeOrderMenuBtn = document.getElementById("order-checkout-close")
const openOrderMenuBtn = document.getElementById("open-cart-btn")

const cart = new Set()

closeOrderMenuBtn.addEventListener("click", () => {
    orderMenuDiv.classList.toggle("close")
    openOrderMenuBtn.style.display = "block"
})

openOrderMenuBtn.addEventListener("click", () => {
    orderMenuDiv.classList.toggle("close")
    openOrderMenuBtn.style.display = "none"
})

document.addEventListener("mousedown", event => {
    if(event.target.dataset.buttonId != undefined) {
        addToCart(event.target.dataset.buttonId)
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
}

function renderCartItems() {
    let htmlSnippet = ""
    cart.forEach(element => {
        htmlSnippet += `
        <div class="order-products-list">
            <h3>${menuArray.find(obj => obj.id == element).name}</h3>
            <button>remove</button>
            <h3 class="order-product-price">$${menuArray.find(obj => obj.id == element).price}</h3>
        </div>`
    })
    orderProductsListContainer.innerHTML = htmlSnippet
}