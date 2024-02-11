import { menuArray } from './data.js'

const menuEl = document.getElementById('menu')
const orderEl = document.getElementById('order')
const modalContainerEl = document.getElementById('modal-container')
const backdropEl = document.getElementById('backdrop')
const thanksCompletedEl = document.getElementById('thanks-completed')
const formModalEl = document.getElementById('form-modal')

let productsOrder = []

document.addEventListener('click',function(e){
    if (e.target.dataset.add){
        if (thanksCompletedEl){
            thanksCompletedEl.innerHTML=``
        }
        addProductToOrder(e.target.dataset.add)
        renderOrder(productsOrder)
    }else if (e.target.id === 'complete-order-btn'){
        renderModal()
    }else if (e.target.id === 'submit-btn'){
        if (manageSubmitForm(e)){
            e.target.form.reset()
        }
    }else if (e.target.dataset.remove){
        removeProductOrder(e.target.dataset.remove)
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
            <p data-remove="${product.name}">remove</p>
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
    backdropEl.style.display = 'flex'
}

function manageSubmitForm(e){
    e.preventDefault()
    if (!validateInputFields()){
        return
    }
    deactivateModal()
    deactivateOrder()
    const formModalData = new FormData(formModalEl)
    const name = formModalData.get('name')
    thanksMessage(name)
    productsOrder = []
    return 1
}

function validateInputFields(){
    const nameEl = document.getElementById('name')
    const cardEl = document.getElementById('card')
    const cvvEl = document.getElementById('cvv')
    const cardPattern = /^\d{16}$/
    const cvvPattern = /^\d{3}$/
    
    if (!nameEl.value){
        alert('Name is required')
        return
    }
    if (!cardEl.value || !cardPattern.test(cardEl.value)){
        alert('Card number must be 16 digits')
        return
    }
    if (!cvvEl.value || !cvvPattern.test(cvvEl.value)){
        alert('CVV must be 3 digits')
        return
    }
    return 1
}

function deactivateModal(){
    modalContainerEl.style.display = 'none'
    backdropEl.style.display = 'none'
}

function deactivateOrder(){
    orderEl.innerHTML=``
}
function thanksMessage(name){
    const thanksCompletedHtml = `
    <div class="width-container">
        <div class="width-container-thanks">
            <h2>Thanks, ${name}. Your order is on its way</h2>
        </div>
    </div>
    `
    thanksCompletedEl.innerHTML = thanksCompletedHtml
}

function removeProductOrder(productName){
    const index = productsOrder.findIndex(productOrder => productOrder.name === productName)
    productsOrder.splice(index, 1)
    if (productsOrder.length > 0){
        renderOrder(productsOrder)
    }else {
        orderEl.innerHTML=``
    }

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
                    <button id="add-btn" data-add="${menuItem.name}">+</button>
                </div>
            </div>
        </div>
   `
    }).join('')
}

menuEl.innerHTML = renderMenu(menuArray)