function addSelectedClass() {
    const selectionAmountDeal1 = document.querySelectorAll('.material-symbols-outlined');
    for (const amount of selectionAmountDeal1) {
        amount.addEventListener('click', (e) => {
            removeSelectedClass();
            e.target.classList.add('selected');
            createPizzaDeal(e);
        })
    }
}

function removeSelectedClass() {
    const selectionAmountDeal1 = document.querySelectorAll('.material-symbols-outlined');
    for (const amount of selectionAmountDeal1) {
        if (amount.classList.contains('selected')) amount.classList.remove('selected');
    }
}


function createPizzaDeal(event) {
    const pizzaAmount = +event.target.classList[1];
    const container = event.target.closest('.containers > div');
    const dealContainer = container.querySelector('div:last-of-type');
    dealContainer.classList.add('deal-styled');
    dealContainer.textContent = '';
    const title = document.createElement('h4');
    title.textContent = 'Pizza Sizes (inches)';
    dealContainer.append(title);
    container.append(dealContainer);
    for (let i = 0; i < pizzaAmount; i++) {
        const pizzaContainer = document.createElement('div');
        dealContainer.append(pizzaContainer)
        const size = document.createElement('input');
        size.setAttribute('type', 'number');
        size.setAttribute('placeholder', '14')
        container.classList.contains('container-one') ? size.id = `deal-one-price-${i + 1}` : size.id = `deal-two-price-${i + 1}`
        const label = document.createElement('label');
        label.setAttribute('for', `${size.id}`);
        label.textContent = `Pizza ${i + 1}: `;
        pizzaContainer.append(label)
        pizzaContainer.append(size);
    }

    const priceHeading = document.createElement('h4');
    priceHeading.textContent = 'Deal Price (dollars)';
    dealContainer.append(priceHeading)
    const priceContainer = document.createElement('div');
    dealContainer.append(priceContainer);
    const dealPrice = document.createElement('input');
    dealPrice.setAttribute('type', 'number');
    dealPrice.setAttribute('placeholder', '0.00');
    dealPrice.setAttribute('step', '0.01');
    dealPrice.id = 'dealPrice'
    const dealLabel = document.createElement('label');
    dealLabel.setAttribute('for', `${dealPrice.id}`);
    dealLabel.textContent = `Price`;
    priceContainer.append(dealLabel);
    priceContainer.append(dealPrice);
}

addSelectedClass();