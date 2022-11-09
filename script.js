function addSelectedClass() {
    const selectionAmountDeal1 = document.querySelectorAll('.material-symbols-outlined');
    for (const amount of selectionAmountDeal1) {
        amount.addEventListener('click', (e) => {
            removeSelectedClass(e);
            e.target.classList.add('selected');
            createPizzaDeal(e);
            changePizzaSize();
        })
    }
}

function removeSelectedClass(e) {
    const selectionAmountDeal1 = e.target.parentNode.children;
    for (const amount of selectionAmountDeal1) {
        if (amount.classList.contains('selected')) amount.classList.remove('selected');
    }
}
function changePizzaSize(){
const sizeButtons = document.querySelectorAll('input[type="radio"]');
for(const size of sizeButtons){
    size.addEventListener('change', (e) => {
        console.log(size)
        changePizzaSizeInput(e);
    })
}
}
function changePizzaSizeInput(e){
    const container = e.target.closest('.containers > div');
    console.log(container)
    const pizzaContainer = e.target.closest('div.pizza-container');
    console.log(pizzaContainer)
    if(!pizzaContainer.querySelector('.size-container')){
    const sizeContainer = document.createElement('div');
    sizeContainer.classList.add('size-container');
    }
    if(e.target.value === 'circle'){
    const sizeContainer = pizzaContainer.querySelector('.size-container');
    sizeContainer.textContent = '';
    const sizeLabel = document.createElement('label');
    sizeLabel.textContent = 'Size(in)'
    const size = document.createElement('input');
    size.setAttribute('type', 'number');
    size.setAttribute('placeholder', '14');
    container.classList.contains('deal-one') ? size.id = `deal-one-size` : size.id = `deal-two-size`;
    container.classList.contains('deal-one') ? size.classList.add('deal-one-size') : size.classList.add('deal-two-size');
    sizeContainer.append(sizeLabel);
    sizeContainer.append(size);
    pizzaContainer.append(sizeContainer);
    }
    else if(e.target.value === 'square'){
        const sizeContainer = pizzaContainer.querySelector('.size-container');
        sizeContainer.textContent = '';
        const sizeLabel = document.createElement('label');
        sizeLabel.textContent = 'Size(in)'
        const pizzaWidth = document.createElement('input');
        const pizzaHeight = document.createElement('input');
        pizzaWidth.setAttribute('type', 'number');
        pizzaWidth.setAttribute('placeholder', '14');
        pizzaHeight.setAttribute('type', 'number');
        pizzaHeight.setAttribute('placeholder', '14');
        container.classList.contains('deal-one') ? pizzaWidth.id = `deal-one-size` : pizzaWidth.id = `deal-two-size`;
        pizzaWidth.classList.add('size-width')
        container.classList.contains('deal-one') ? pizzaHeight.id = `deal-one-size` : pizzaHeight.id = `deal-two-size`;
        pizzaHeight.classList.add('size-height');
        sizeContainer.append(sizeLabel);
        sizeContainer.append(pizzaWidth);
        sizeContainer.append(pizzaHeight)
        pizzaContainer.append(sizeContainer);
    }
}
function createPizzaDeal(event) {
    const pizzaAmount = +event.target.classList[2];
    const container = event.target.closest('.containers > div');
    const dealContainer = container.querySelector('div:last-of-type');
    dealContainer.classList.add('deal-styled');
    dealContainer.textContent = '';
    const title = document.createElement('h4');
    title.textContent = 'Pizza Shape and Size';
    dealContainer.append(title);
    container.append(dealContainer);
    for (let i = 0; i < pizzaAmount; i++) {
        const pizzaContainer = document.createElement('div');
        pizzaContainer.classList.add('pizza-container')
        dealContainer.append(pizzaContainer);
        const squareContainer = document.createElement('div');
        squareContainer.classList.add('square-container');
        const square = document.createElement('input');
        square.setAttribute('type', 'radio');
        square.setAttribute('value', 'square');
        console.log(container);
        container.classList.contains('deal-one') ? square.setAttribute('name', `deal-1-shape${i + 1}`) : square.setAttribute('name', `deal-2-shape${i + 1}`) ;
        square.value = 'square';
        const squareLabel = document.createElement('label');
        squareLabel.classList.add('material-symbols-outlined');
        squareLabel.textContent = 'crop_7_5';
        const circleContainer = document.createElement('div');
        circleContainer.classList.add('circle-container');
        const circle = document.createElement('input');
        circle.setAttribute('type', 'radio');
        circle.setAttribute('checked', 'true')
        circle.setAttribute('value', 'circle');
        container.classList.contains('deal-one') ? circle.setAttribute('name', `deal-1-shape${i + 1}`) : circle.setAttribute('name', `deal-2-shape${i + 1}`) ;
        const circleLabel = document.createElement('label');
        circleLabel.classList.add('material-symbols-outlined');
        circleLabel.textContent = 'circle';
        squareContainer.append(squareLabel);
        squareContainer.append(square);
        circleContainer.append(circleLabel);
        circleContainer.append(circle);
        const label = document.createElement('label');
        label.textContent = `Pizza ${i + 1}: `;
        pizzaContainer.append(label);
        pizzaContainer.append(circleContainer)
        pizzaContainer.append(squareContainer);
        const sizeContainer = document.createElement('div');
        sizeContainer.classList.add('size-container');
        const sizeLabel = document.createElement('label');
        sizeLabel.textContent = 'Size(in)'
        const size = document.createElement('input');
        size.setAttribute('type', 'number');
        size.setAttribute('placeholder', '14');
        container.classList.contains('deal-one') ? size.id = `deal-one-size-${i + 1}` : size.id = `deal-two-size-${i + 1}`;
        container.classList.contains('deal-one') ? size.classList.add('deal-one-size') : size.classList.add('deal-two-size');
        sizeContainer.append(sizeLabel)
        sizeContainer.append(size);
        pizzaContainer.append(sizeContainer);
    }

    const priceHeading = document.createElement('h4');
    priceHeading.textContent = 'Deal Price';
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
    dealLabel.textContent = `$`;
    dealLabel.style.fontSize = '24px';
    dealLabel.style.width = 'fit-content'
    dealLabel.style.marginRight = '5px'
    priceContainer.append(dealLabel);
    priceContainer.append(dealPrice);
}

function calculateDeal(deal, price, number) {
    const dealSizesRound = [...deal];
    console.log(dealSizesRound)
    const sumDeal = dealSizesRound.reduce((sum, current) => {
        return sum += (Math.PI * ((current.value / 2) ** 2))
    }, 0)
    const pizzas = [...number.querySelectorAll('.pizza-container')];
    let sumSquares = 0;
    for(const pizza of pizzas){
        if(pizza.querySelector('input[value="square"]').checked){
        sumSquares += (+pizza.querySelector('input.size-width').value * pizza.querySelector('input.size-height').value)
        }
    }
    const dealPizzaPerInch = ((sumDeal + sumSquares) / price.value)
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
        const dealOne = calculateDeal(document.querySelectorAll('.deal-one-size'), document.querySelector('#deal-one-price'), document.querySelector('.deal-one-container'));
        const dealTwo = calculateDeal(document.querySelectorAll('.deal-two-size'), document.querySelector('#deal-two-price'), document.querySelector('.deal-two-container'));
        if(isNaN(dealOne) || isNaN(dealTwo) || dealOne === Infinity || dealTwo === Infinity || dealOne === 0 || dealTwo === 0) throw new Error('NaN Error');
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