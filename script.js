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
        container.classList.contains('deal-one') ? size.id = `deal-one-price-${i + 1}` : size.id = `deal-two-price-${i + 1}`;
        container.classList.contains('deal-one') ? size.classList.add('deal-one-price') : size.classList.add('deal-two-price');
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
    container.classList.contains('deal-one') ? dealPrice.id = 'deal-one-price' : dealPrice.id = 'deal-two-price';
    const dealLabel = document.createElement('label');
    dealLabel.setAttribute('for', `${dealPrice.id}`);
    dealLabel.textContent = `Price`;
    priceContainer.append(dealLabel);
    priceContainer.append(dealPrice);
}

function calculateDeal(deal, price) {
    const dealSizes = [...deal];
    console.log(dealSizes)
    const sumDeal = dealSizes.reduce((sum, current) => {
        return sum += (Math.PI * ((current.value / 2) ** 2))
    }, 0)
    const dealPizzaPerInch = (sumDeal / price.value)
    return dealPizzaPerInch
}

function displayResult(deal, firstDeal, secondDeal){
    const info = document.createElement('div');
    const resultContainer = document.querySelector('.result-container');
    resultContainer.textContent = `Deal ${deal} is Better!`;
    info.innerHTML = `Deal 1: <span class='deal-one-res'>${firstDeal.toFixed(2)}</span> inch<sup>2</sup> of pizza per dollar
Deal 2: <span class='deal-two-res'>${secondDeal.toFixed(2)}</span> inch<sup>2</sup> of pizza per dollar`;
    resultContainer.append(info);
    if(deal === 1){
    document.querySelector('.deal-two-res').style = 'color: red; font-weight: 400;';
    document.querySelector('.deal-one-res').style = 'color: green; font-weight: 400;';
    }
    else if (deal === 2){
        document.querySelector('.deal-two-res').style = 'color: green; font-weight: 400;';
        document.querySelector('.deal-one-res').style = 'color: red; font-weight: 400;';
    }
    else if(deal === 0){
        resultContainer.textContent = 'The Deals Are Exactly The Same!';
        info.innerHTML = `Deal 1: <span class='deal-one-res'>${firstDeal.toFixed(2)}</span> inch<sup>2</sup> of pizza per dollar
Deal 2: <span class='deal-two-res'>${secondDeal.toFixed(2)}</span> inch<sup>2</sup> of pizza per dollar`;
        resultContainer.append(info);
        document.querySelector('.deal-two-res').style = 'color: green; font-weight: 400;';
        document.querySelector('.deal-one-res').style = 'color: green; font-weight: 400;';
    }
}

function findBetterDeal() {
    const container = document.querySelector('.container');
    if (!document.querySelector('.result-container')) {
        const resultContainer = document.createElement('div');
        resultContainer.classList.add('result-container');
        container.append(resultContainer);
    }
    const resultContainer = document.querySelector('.result-container');
    resultContainer.style.whiteSpace = 'pre';
    try {
        const dealOne = calculateDeal(document.querySelectorAll('.deal-one-price'), document.querySelector('#deal-one-price'));
        const dealTwo = calculateDeal(document.querySelectorAll('.deal-two-price'), document.querySelector('#deal-two-price'));
        if(isNaN(dealOne) || isNaN(dealTwo) || dealOne === Infinity || dealTwo === Infinity) throw new Error('NaN Error');
        if (dealOne > dealTwo) {
            displayResult(1, dealOne, dealTwo);
        }
        else if (dealTwo > dealOne) {
            displayResult(2, dealOne, dealTwo);
        }
        else {
            displayResult(0, dealOne, dealTwo);
        }
    }
    catch (error) {
        console.log(error);
        resultContainer.style.whiteSpace = 'inherit';
        resultContainer.textContent = `ERROR: Both Pizza Deals Must Be Filled Out Correctly`;
    }
}
addSelectedClass();
document.querySelector('.submit-button').addEventListener('click', () => {
    findBetterDeal();
})