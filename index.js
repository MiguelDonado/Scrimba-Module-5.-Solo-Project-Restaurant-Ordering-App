import { menuArray } from './data.js'

const menuEl = document.getElementById('menu')
const orderEl = document.getElementById('order')
const modalContainerEl = document.getElementById('modal-container')

let productsOrder = []

document.addEventListener('click',function(e){
    if (e.target.dataset.add){
        addProductToOrder(e.target.dataset.add)
        renderOrder(productsOrder)
    }else if (e.target.id === 'complete-order-btn'){
        renderModal()
    }
})

function addProductToOrder(productName){
    const targetProduct = menuArray.filter(item => item.name === productName)
    productsOrder.push(targetProduct[0])
}

function renderOrder(productsToRenderOrder){
    const productsToRenderOrderHtml = generateProductsToRenderOrderHtml(productsToRenderOrder)
    const totalPrice = calculateTotalPriceOrder(productsToRenderOrder)
    orderEl.innerHTML = `
        <div class="width-container-order">
            <h3>Your order</h3>
            <div class="product-order-container" id="product-order-container"></div>
            <div class="total-price-order">
                <h2>Total price:</h2>
                <h4 class="product-price-order">$${totalPrice}</h4>
            </div>
            <button id="complete-order-btn">Complete order</button>
        </div> 
    `
    document.getElementById("product-order-container").innerHTML = productsToRenderOrderHtml
}

function generateProductsToRenderOrderHtml(productsArray){
    return productsArray.map( product => {
        return `
        <div class="product-order">
            <h4 class="product-title-order">${product.name}</h4>
            <p>remove</p>
            <h4 class="product-price-order">$${product.price}</h4>
        </div>
        `
    }).join('')
}

function calculateTotalPriceOrder(productsArray){
    return productsArray.reduce((total,currentElement)=> total + currentElement.price,0)
}

function renderModal(){
    modalContainerEl.style.display = 'flex'
}
function renderMenu(menuItems){
    return menuItems.map( menuItem => {
        return `
        <div class="width-container">
            <div class="menu-item" id="menu-item">
                <div class="menu-item-icon">
                    <img src="images/${menuItem.image}">
                </div>
                <div class="menu-item-inner">
                    <div class="menu-item-letters">
                        <h4 class="menu-item-title">${menuItem.name}</h4>
                        <p class="menu-item-ingredients">${menuItem.ingredients.join(", ")}</p>
                        <h4 class="menu-item-price">\$${menuItem.price}</h4>
                    </div>
                    <button class="add-btn" id="add-btn" data-add="${menuItem.name}">+</button>
                </div>
            </div>
        </div>
   `
    }).join('')
}

menuEl.innerHTML = renderMenu(menuArray)