document.addEventListener("DOMContentLoaded", function () {
    const addItemForm = document.getElementById("addItemForm");
    const itemList = document.getElementById("itemList");

    addItemForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const itemName = document.getElementById("itemName").value;
        const description = document.getElementById("description").value;
        const price = parseFloat(document.getElementById("price").value);
        const quantity = parseInt(document.getElementById("quantity").value);

        if (itemName && description && !isNaN(price) && !isNaN(quantity)) {
            addItemToInventory(itemName, description, price, quantity);
            addItemForm.reset();
        }
    });

    itemList.addEventListener("click", function (e) {
        if (e.target.classList.contains("buy-button")) {
            const listItem = e.target.closest("li");
            const quantitySpan = listItem.querySelector(".quantity");
            let currentQuantity = parseInt(quantitySpan.textContent);
            
            if (e.target.dataset.amount === "1" && currentQuantity >= 1) {
                currentQuantity--;
            } else if (e.target.dataset.amount === "2" && currentQuantity >= 2) {
                currentQuantity -= 2;
            } else if (e.target.dataset.amount === "3" && currentQuantity >= 3) {
                currentQuantity -= 3;
            }

            quantitySpan.textContent = currentQuantity;
        } else if (e.target.classList.contains("delete-button")) {
            const listItem = e.target.closest("li");
            listItem.remove();
        }
    });

    function addItemToInventory(itemName, description, price, quantity) {
        const li = document.createElement("li");
        li.innerHTML = `
            <h3>${itemName}</h3>
            <p>${description}</p>
            <p>Price: Rs.${price.toFixed(2)}</p>
            <p class="quantity">${quantity}</p>
            <button class="buy-button" data-amount="1">BUY1</button>
            <button class="buy-button" data-amount="2">BUY2</button>
            <button class="buy-button" data-amount="3">BUY3</button>
            <button class="delete-button">Delete</button>
        `;
        itemList.appendChild(li);
    }
});
