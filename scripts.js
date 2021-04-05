/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
//setting up event listener for clicking Add to Cart for every item
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
const myCarts = document.querySelectorAll('.add_to_cart');
let totalPrice = 0; //this is internal var for cart price

for (let i = 0; i < myCarts.length; i++){
    myCarts[i].addEventListener('click', function(ev){

    //getting the price from the parent div of the clicked anchor.
    let parentDiv = ev.target.parentNode.children;
    let itemPrice = parentDiv[2].innerText; //its in [2]

    //internally calculating new total cart price
    itemPrice = parseInt(itemPrice.substring(1));
    totalPrice += itemPrice;

    //externally calculating new total cart price
    document.getElementById('price_total').innerText = '$' + totalPrice + '.00';

    //////UPDATING THE CART CHECKOUT INFORMATION//////
    //first making some temporary elements.
    let myTableBody = document.querySelector('tbody');
    let tempTableRow = document.createElement('tr');
    let tempTableData = document.createElement('td');

    //the X delete button to delete the row
    let deleteButton = document.createElement('button');
    deleteButton.innerText = 'X';
    tempTableData.appendChild(deleteButton);
    tempTableRow.appendChild(tempTableData);


    //////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////
    //MAKING A DELETE BUTTON AT THE CHECKOUT WINDOW
    //////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////
    deleteButton.addEventListener('click', function(ev){
        //first lets make an int out of the item price we are deleting
        let cashAboutToGoByeBye = ev.target.parentNode.parentNode.lastChild.innerText;
        cashAboutToGoByeBye = parseInt(cashAboutToGoByeBye.substring(1));

        //now lets make an int out of the total cart price
        let currentTotalPrice = document.getElementById('price_total').innerText;
        currentTotalPrice = parseInt(currentTotalPrice.substring(1));

        //subtract current total by item price
        currentTotalPrice -= cashAboutToGoByeBye;

        totalPrice = currentTotalPrice; //the internal global variable i defined at the beginning

        //update the price showing in the cart total as well as the nav bar.
        document.getElementById('price_total').innerText = '$' + currentTotalPrice + '.00';
        document.getElementById('price_total_checkout').innerText = '$' + currentTotalPrice + '.00';

        //Subtract one from the number of items in cart.
        let numberOfItems = parseInt(document.getElementById('num_in_cart').innerText);
        numberOfItems -= 1;
        document.getElementById('num_in_cart').innerText = numberOfItems;


        if (numberOfItems === 0){
            checkoutToggle.style.display = 'none';
        }
        //now formally remove the entire row 
        ev.target.parentNode.parentNode.remove();
       
    })
    //////////////////////////////////////////////////////
    //////////////////////////////////////////////////////
    //FILLING TABLE ENTRIES WITH THE PRODUCT INFORMATION//
    //////////////////////////////////////////////////////
    //////////////////////////////////////////////////////
    
    /*CANCEL THE PRODUCT IMAGE FOR NOW. NO ROOM

    //the product image
    let imgCheckout = document.createElement('span');
    imgCheckout.innerText = 'no image';
    tempTableData = document.createElement('td');
    tempTableData.appendChild(imgCheckout);
    tempTableRow.appendChild(tempTableData);
    */

    // the name of the product
    let nameCheckout = document.createElement('span');
    nameCheckout.innerText = parentDiv[1].innerText;
    tempTableData = document.createElement('td');
    tempTableData.appendChild(nameCheckout);
    tempTableRow.appendChild(tempTableData);

    //the price of the item
    let priceCheckout = document.createElement('span');
    priceCheckout.innerText = parentDiv[2].innerText;
    tempTableData = document.createElement('td');
    tempTableData.appendChild(priceCheckout);
    tempTableRow.appendChild(tempTableData);

    //total price of the cart span element
    let sumPriceCheckout = document.getElementById('price_total_checkout');
    sumPriceCheckout.innerText = '$' + totalPrice + '.00';
    
    //append this new table row to the DOM
    myTableBody.appendChild(tempTableRow);

    //if Add to Cart is clicked, add +1 to number of items in the cart.
    let numberOfItems = parseInt(document.getElementById('num_in_cart').innerText);
    numberOfItems += 1;
    document.getElementById('num_in_cart').innerText = numberOfItems;
})}


/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
//SHOPPING CART POP OUT DIV//
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
const checkoutToggle = document.querySelector('.dropdown');

//close button for the shopping cart.
document.getElementById('close_btn').addEventListener('click',() => checkoutToggle.style.display = 'none')

/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
//THE CLEAR CART BUTTON//
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
document.getElementById('clear_cart').addEventListener('click', function(){
    //delete the table body and append a fresh one with the same id.
    document.getElementById('table_body').remove();
    let newTBody = document.createElement('tbody');
    newTBody.id = 'table_body';
    document.getElementById('cart_table').appendChild(newTBody);

    //resetting the cart price totals.
    document.getElementById('price_total').innerText = '$0.00';
    document.getElementById('price_total_checkout').innerText = '$0.00';
    totalPrice = 0; //this is the js global price variable

    //resetting the number of items in cart to 0. close it.
    document.getElementById('num_in_cart').innerText = 0;
    checkoutToggle.style.display = 'none';
})

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//THE PURCHASE BUTTON//
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
document.getElementById('purchase_button').addEventListener('click', function(){
    //check if anything is in the cart first.
    if (document.querySelector('tbody > tr') === null){
        alert('Your cart is empty!');
        checkoutToggle.style.display = 'none';
        return false;
    }

    //delete the table body and append a fresh one with the same id.
    document.getElementById('table_body').remove();
    let newTBody = document.createElement('tbody');
    newTBody.id = 'table_body';
    document.getElementById('cart_table').appendChild(newTBody);

    //resetting the cart price totals.
    document.getElementById('price_total').innerText = '$0.00';
    document.getElementById('price_total_checkout').innerText = '$0.00';
    totalPrice = 0; //this is the js global price variable

    //resetting the number of items in cart to 0.
    document.getElementById('num_in_cart').innerText = 0;

    //close the window and give alert
    checkoutToggle.style.display = 'none';
    alert('Thank you for your order.')
})

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//the actual cart nav button this time. can toggle it 
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
document.getElementById('cart_btn').addEventListener('click', function(){

    //first check if cart is empty. prompt an alert.
    if (document.querySelector('tbody > tr') === null){
        alert('Your cart is empty!');
        checkoutToggle.style.display = 'none';
        return false;
    }

    //toggles hide and show cart checkout div
    if (checkoutToggle.style.display === 'none'){
        checkoutToggle.style.display = 'block';
    }
    else {
        checkoutToggle.style.display = 'none';
    }
});
