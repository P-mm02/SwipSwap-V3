
var star1 = document.getElementById('star1');
var star2 = document.getElementById('star2');
var star3 = document.getElementById('star3');
var star4 = document.getElementById('star4');
var star5 = document.getElementById('star5');
var star11 = document.getElementById('star11');
var star22 = document.getElementById('star22');
var star33 = document.getElementById('star33');
var star44 = document.getElementById('star44');
var star55 = document.getElementById('star55');

document.getElementById('star1').addEventListener('click', function() {
    star1.style.color = '#fbc77f';
    star2.style.color = '#e4e6ed';
    star3.style.color = '#e4e6ed';
    star4.style.color = '#e4e6ed';
    star5.style.color = '#e4e6ed';

    star11.style.color = '#fbc77f';
    star22.style.color = '#e4e6ed';
    star33.style.color = '#e4e6ed';
    star44.style.color = '#e4e6ed';
    star55.style.color = '#e4e6ed';
  });
document.getElementById('star2').addEventListener('click', function() {
    star1.style.color = '#fbc77f';
    star2.style.color = '#fbc77f';
    star3.style.color = '#e4e6ed';
    star4.style.color = '#e4e6ed';
    star5.style.color = '#e4e6ed';

    star11.style.color = '#fbc77f';
    star22.style.color = '#fbc77f';
    star33.style.color = '#e4e6ed';
    star44.style.color = '#e4e6ed';
    star55.style.color = '#e4e6ed';
  });
document.getElementById('star3').addEventListener('click', function() {
    star1.style.color = '#fbc77f';
    star2.style.color = '#fbc77f';
    star3.style.color = '#fbc77f';
    star4.style.color = '#e4e6ed';
    star5.style.color = '#e4e6ed';

    star11.style.color = '#fbc77f';
    star22.style.color = '#fbc77f';
    star33.style.color = '#fbc77f';
    star44.style.color = '#e4e6ed';
    star55.style.color = '#e4e6ed';
  });
document.getElementById('star4').addEventListener('click', function() {
    star1.style.color = '#fbc77f';
    star2.style.color = '#fbc77f';
    star3.style.color = '#fbc77f';
    star4.style.color = '#fbc77f';
    star5.style.color = '#e4e6ed';

    star11.style.color = '#fbc77f';
    star22.style.color = '#fbc77f';
    star33.style.color = '#fbc77f';
    star44.style.color = '#fbc77f';
    star55.style.color = '#e4e6ed';
  });  
document.getElementById('star5').addEventListener('click', function() {
    star1.style.color = '#fbc77f';
    star2.style.color = '#fbc77f';
    star3.style.color = '#fbc77f';
    star4.style.color = '#fbc77f';
    star5.style.color = '#fbc77f';

    star11.style.color = '#fbc77f';
    star22.style.color = '#fbc77f';
    star33.style.color = '#fbc77f';
    star44.style.color = '#fbc77f';
    star55.style.color = '#fbc77f';
  });


  var acceptBtn = document.getElementById('acceptBtn');
  var unacceptBtn = document.getElementById('unacceptBtn');
  var IsReceived = document.getElementById('IsReceived');
  var ReceivedBtn = document.getElementById('ReceivedBtn');
  var UnReceivedBtn = document.getElementById('UnReceivedBtn');
  var confirmCon = document.getElementById('confirmCon');
  var confirmAction = document.getElementById('confirmAction');
  var closeConfirm = document.getElementById('closeConfirm');

  var userRatingCLick = document.getElementById('userRatingCLick');
  var userRatingCtn = document.getElementById('userRatingCtn');
  var confirmStar = document.getElementById('confirmStar');
  var userRatingHide = document.getElementsByClassName('userRatingCLick');



  // Add onclick event to each items
  acceptBtn.onclick = function() {
    confirmCon.style.display = 'block';
    confirmAction.onclick = function(){        
        acceptBtn.style.display = 'none';
        unacceptBtn.style.display = 'none';
        IsReceived.style.display = 'block';
        confirmCon.style.display = 'none';
    }
    closeConfirm.onclick = function() {                
      confirmCon.style.display = 'none';      
    };   
          
  };

  unacceptBtn.onclick = function() {
    confirmCon.style.display = 'block';
    confirmAction.onclick = function(){        
        acceptBtn.style.display = 'none';
        unacceptBtn.style.display = 'none';
        IsReceived.style.display = 'block';
        confirmCon.style.display = 'none';
        window.location.href = '/home';
    }
    closeConfirm.onclick = function() {                
      confirmCon.style.display = 'none';      
    };   
          
  };

  ReceivedBtn.onclick = function() {
    confirmCon.style.display = 'block';
    confirmAction.onclick = function(){   
        confirmStar.style.border = 'none';
        acceptBtn.style.display = 'none';
        unacceptBtn.style.display = 'none';
        IsReceived.style.display = 'block';
        confirmCon.style.display = 'none';
        userRatingCtn.style.display = 'block';
        confirmStar.onclick = function(){        
        window.location.href = '/home';
        }
    }
    closeConfirm.onclick = function() {                
      confirmCon.style.display = 'none';      
    };   
          
  };

  UnReceivedBtn.onclick = function() {
    confirmCon.style.display = 'block';
    confirmAction.onclick = function(){        
        acceptBtn.style.display = 'none';
        unacceptBtn.style.display = 'none';
        IsReceived.style.display = 'block';
        confirmCon.style.display = 'none';
        if(userRatingCLick){
          star1.style.display = 'none';
          star2.style.display = 'none';
          star3.style.display = 'none';
          star4.style.display = 'none';
          star5.style.display = 'none';
        }        
        thumbEdt.style.transform = 'rotateX(180deg)';
        thumbEdt.style.color = '#C97171';
        confirmStar.style.backgroundColor = '#C97171';
        confirmStar.style.border = 'none';
        confirmStar.classList.add('mt-4');
        confirmStar.textContent = 'Report';
        userRatingCtn.style.display = 'block';
        confirmStar.onclick = function(){        
        window.location.href = '/home';
        }
    }
    closeConfirm.onclick = function() {                
      confirmCon.style.display = 'none';      
    };   
          
  };
     
    