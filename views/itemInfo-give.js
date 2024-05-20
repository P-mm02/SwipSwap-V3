

//ยังไม่รู้ว่าทำอะไร
//ยังไม่รู้ว่าทำอะไร
//ยังไม่รู้ว่าทำอะไร
//ยังไม่รู้ว่าทำอะไร
//ยังไม่รู้ว่าทำอะไร
//ยังไม่รู้ว่าทำอะไร

var itemInfoClickBack = document.getElementById('itemInfo-clickBack_give');
  // Add a click event listener to the image
  itemInfoClickBack.addEventListener('click', function() {
    // Perform the desired action when the image is clicked
    var itemInfoContainer_give = document.getElementById('itemInfoContainer_give');
    itemInfoContainer_give.style.display = 'none';
});

var clickOffer = document.getElementById('clickOffer_give');
  // Add a click event listener to the image
  clickOffer.addEventListener('click', function() {
    // Perform the desired action when the image is clicked
    var offerWindow = document.getElementById('offerWindow_give');
    offerWindow.style.display = 'block';
});

var clickOffer2 = document.getElementById('clickOffer2_give');
  // Add a click event listener to the image
  clickOffer2.addEventListener('click', function() {
    // Perform the desired action when the image is clicked
    alert('Successfully Offer!');
    var offerWindow = document.getElementById('offerWindow_give');
    offerWindow.style.display = 'none';
});

var clickOffer3 = document.getElementById('clickOffer3_give');
  // Add a click event listener to the image
  clickOffer3.addEventListener('click', function() {
    // Perform the desired action when the image is clicked
    var offerWindow = document.getElementById('offerWindow_give');
    offerWindow.style.display = 'none';
});
