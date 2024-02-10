import { menuArray } from './data.js'

const menuEl = document.getElementById('menu')

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
                    <button class="add-btn">+</button>
                </div>
            </div>
        </div>
    </section>`
    }).join('')
}

menuEl.innerHTML = renderMenu(menuArray)