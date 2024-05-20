

//ยังไม่รู้ว่าทำอะไร
//ยังไม่รู้ว่าทำอะไร
//ยังไม่รู้ว่าทำอะไร
//ยังไม่รู้ว่าทำอะไร
//ยังไม่รู้ว่าทำอะไร
//ยังไม่รู้ว่าทำอะไร

var itemInfoClickBack = document.getElementById('itemInfo-clickBack');
  // Add a click event listener to the image
  itemInfoClickBack.addEventListener('click', function() {
    // Perform the desired action when the image is clicked
    var itemInfoContainer = document.getElementById('itemInfoContainer');
    itemInfoContainer.style.display = 'none';
});

var clickOffer = document.getElementById('clickOffer');
  // Add a click event listener to the image
  clickOffer.addEventListener('click', function() {
    // Perform the desired action when the image is clicked
    var offerWindow = document.getElementById('offerWindow');
    offerWindow.style.display = 'block';
});

var clickOffer2 = document.getElementById('clickOffer2');
  // Add a click event listener to the image
  clickOffer2.addEventListener('click', function() {
    // Perform the desired action when the image is clicked
    alert('Successfully Offer!');
    var offerWindow = document.getElementById('offerWindow');
    offerWindow.style.display = 'none';
});

var clickOffer3 = document.getElementById('clickOffer3');
  // Add a click event listener to the image
  clickOffer3.addEventListener('click', function() {
    // Perform the desired action when the image is clicked
    var offerWindow = document.getElementById('offerWindow');
    offerWindow.style.display = 'none';
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
          document.querySelectorAll('.checkBoxOffer img').forEach(element => {
              element.src = '/img/items/img_itemInfo_offer_04.png';
            });
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