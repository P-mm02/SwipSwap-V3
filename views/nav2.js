// $(function(){
//     $("#navigation").load("nav2.ejs");    
//     $("body").css("margin-top", 200 + "px");
// });
// $(function(){
//     $("#profileWindow").load("profileWindow.ejs"); 
// });

$(function() {
    $.get('/navigation', function(data) {
        $('#navigation').html(data); // Load the navigation content into #navigation
        $("body").css("margin-top", 200 + "px");
    });

    $.get('/profileWindow', function(data) {
        $('#profileWindow').html(data); // Load the profile window content into #profileWindow
    });
});

 