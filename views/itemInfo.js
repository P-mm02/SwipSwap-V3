var allItems = document.querySelectorAll('.hotSwap');

  // Add onclick event to each items
  allItems.forEach(function(element) {
    element.onclick = function() {
        var itemInfoContainer = document.getElementById('itemInfoContainer');
        itemInfoContainer.style.visibility = 'visible';
    };
  });

var itemInfoClickBack = document.getElementById('itemInfo-clickBack');
  // Add a click event listener to the image
  itemInfoClickBack.addEventListener('click', function() {
    // Perform the desired action when the image is clicked
    var itemInfoContainer = document.getElementById('itemInfoContainer');
    itemInfoContainer.style.visibility = 'hidden';
});

var clickOffer = document.getElementById('clickOffer');
  // Add a click event listener to the image
  clickOffer.addEventListener('click', function() {
    // Perform the desired action when the image is clicked
    var offerWindow = document.getElementById('offerWindow');
    offerWindow.style.visibility = 'visible';
});

var clickOffer2 = document.getElementById('clickOffer2');
  // Add a click event listener to the image
  clickOffer2.addEventListener('click', function() {
    // Perform the desired action when the image is clicked
    alert('Successfully Offer!');
    var offerWindow = document.getElementById('offerWindow');
    offerWindow.style.visibility = 'hidden';
});

var clickOffer3 = document.getElementById('clickOffer3');
  // Add a click event listener to the image
  clickOffer3.addEventListener('click', function() {
    // Perform the desired action when the image is clicked
    var offerWindow = document.getElementById('offerWindow');
    offerWindow.style.visibility = 'hidden';
});


// Get all elements with the class "checkBoxOffer"
var checkBoxOffers = document.querySelectorAll('.checkBoxOffer');

// Add a click event listener to each "checkBoxOffer" element
checkBoxOffers.forEach(function (checkBoxOffer) {
    // Get the child img element
    var imgElement = checkBoxOffer.querySelector('img');
    // Add a click event listener to the img element
    imgElement.addEventListener('click', function () {
        // Perform the desired action when the image is clicked
        if (imgElement.src.endsWith('/img/items/img_itemInfo_offer_02.png')) {
            imgElement.src = '/img/items/img_itemInfo_offer_04.png';
        } else {
            imgElement.src = '/img/items/img_itemInfo_offer_02.png';
        }
    });
});


// var checkBoxOffer = document.querySelectorAll('.checkBoxOffer');
//   // Add a click event listener to the image
  
//   checkBoxOffer.addEventListener('click', function() {
//     // Perform the desired action when the image is clicked
//     alert('5555555555555555555');
//     if (checkBoxOffer.src.endsWith('/img/items/img_itemInfo_offer_02.png')) {
//         alert('kuyyyyyyyyyyyyyyyyyyyyyyyyy');
//         checkBoxOffer.src = '/img/items/img_itemInfo_offer_04.png'
//     } else {
//         alert('xxxxxxxxxxxxxx');
//         checkBoxOffer.src = '/img/items/img_itemInfo_offer_02.png'        
//     }
// });