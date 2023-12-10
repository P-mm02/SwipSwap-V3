var myProduct = document.getElementById('myProduct');
  // Add a click event listener to the image
  myProduct.addEventListener('click', function() {
    // Perform the desired action when the image is clicked
    var editProfile = document.getElementById('editProfile');
    myProduct.style.backgroundColor = '#fff';
    editProfile.style.backgroundColor = 'transparent';
    var myProductList = document.getElementById('myProductList');
    myProductList.style.display = 'block';
    var editProfileList = document.getElementById('editProfileList');
    editProfileList.style.display = 'none';
});
var editProfile = document.getElementById('editProfile');
  // Add a click event listener to the image
  editProfile.addEventListener('click', function() {
    // Perform the desired action when the image is clicked
    var myProduct = document.getElementById('myProduct');
    editProfile.style.backgroundColor = '#fff';
    myProduct.style.backgroundColor = 'transparent';
    var myProductList = document.getElementById('myProductList');
    myProductList.style.display = 'none';
    var editProfileList = document.getElementById('editProfileList');
    editProfileList.style.display = 'block';
    
});

// Get all navigation links
var profileContainer = document.getElementById('profileContainer a');

// Add click event listeners to each link
profileContainer.forEach(function(link) {
    link.addEventListener('click', function() {
        // Remove the 'active' class from all links
        profileContainer.forEach(function(innerLink) {
            innerLink.classList.remove('active');
        });

        // Add the 'active' class to the clicked link
        this.classList.add('active');
    });
});