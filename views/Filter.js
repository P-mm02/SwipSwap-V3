document.getElementById("Filter_HideMyProduct").addEventListener('click', function (event) {      
    document.querySelectorAll('.hotSwap, .hotGive').forEach(element => {
        let swapGiveInfoIdOwner = element.querySelector('.swapGiveInfoIdOwner');
        if (Filter_HideMyProduct.checked) {
            if(swapGiveInfoIdOwner.textContent !== document.getElementById("myID").textContent) {            
                element.style.display = 'block';
            } else {
                element.style.display = 'none';
            }
        } else {
            document.querySelectorAll('.hotSwap, .hotGive').forEach(element => {
                element.style.display = 'block'
            });
        }    
    });    
});
document.getElementById("Filter_Electronic").addEventListener('click', function (event) {      
    document.querySelectorAll('.hotSwap, .hotGive').forEach(element => {
        let itemInfoCategory = element.querySelector('.itemInfoCategory');
        if (Filter_Electronic.checked) {
            if(itemInfoCategory && itemInfoCategory.textContent === 'Electronic') {            
                element.style.display = 'block';
            } else {
                element.style.display = 'none';
            }
        } else {
            document.querySelectorAll('.hotSwap, .hotGive').forEach(element => {
                element.style.display = 'block'
            });
        }
    
    });
    
});
document.getElementById("Filter_Enjoyment").addEventListener('click', function (event) {      
    document.querySelectorAll('.hotSwap, .hotGive').forEach(element => {
        let itemInfoCategory = element.querySelector('.itemInfoCategory');
        if (Filter_Enjoyment.checked) {
            if(itemInfoCategory && itemInfoCategory.textContent === 'Enjoyment') {            
                element.style.display = 'block';
            } else {
                element.style.display = 'none';
            }
        } else {
            document.querySelectorAll('.hotSwap, .hotGive').forEach(element => {
                element.style.display = 'block'
            });
        }
    
    });
    
});
document.getElementById("Filter_Education").addEventListener('click', function (event) {      
    document.querySelectorAll('.hotSwap, .hotGive').forEach(element => {
        let itemInfoCategory = element.querySelector('.itemInfoCategory');
        if (Filter_Education.checked) {
            if(itemInfoCategory && itemInfoCategory.textContent === 'Education') {            
                element.style.display = 'block';
            } else {
                element.style.display = 'none';
            }
        } else {
            document.querySelectorAll('.hotSwap, .hotGive').forEach(element => {
                element.style.display = 'block'
            });
        }
    
    });
    
});
document.getElementById("Filter_Fashion").addEventListener('click', function (event) {      
    document.querySelectorAll('.hotSwap, .hotGive').forEach(element => {
        let itemInfoCategory = element.querySelector('.itemInfoCategory');
        if (Filter_Fashion.checked) {
            if(itemInfoCategory && itemInfoCategory.textContent === 'Fashion') {            
                element.style.display = 'block';
            } else {
                element.style.display = 'none';
            }
        } else {
            document.querySelectorAll('.hotSwap , .hotGive').forEach(element => {
                element.style.display = 'block'
            });
        }
    
    });
    
});
document.getElementById("Filter_Furniture").addEventListener('click', function (event) {      
    document.querySelectorAll('.hotSwap, .hotGive').forEach(element => {
        let itemInfoCategory = element.querySelector('.itemInfoCategory');
        if (Filter_Furniture.checked) {
            if(itemInfoCategory && itemInfoCategory.textContent === 'Furniture') {            
                element.style.display = 'block';
            } else {
                element.style.display = 'none';
            }
        } else {
            document.querySelectorAll('.hotSwap, .hotGive').forEach(element => {
                element.style.display = 'block'
            });
        }
    
    });
    
});
document.getElementById("Filter_General").addEventListener('click', function (event) {      
    document.querySelectorAll('.hotSwap, .hotGive').forEach(element => {
        let itemInfoCategory = element.querySelector('.itemInfoCategory');
        if (Filter_General.checked) {
            if(itemInfoCategory && itemInfoCategory.textContent === 'General') {            
                element.style.display = 'block';
            } else {
                element.style.display = 'none';
            }
        } else {
            document.querySelectorAll('.hotSwap, .hotGive').forEach(element => {
                element.style.display = 'block'
            });
        }
    
    });
    
});
