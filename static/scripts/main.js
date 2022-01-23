document.addEventListener('DOMContentLoaded', function() {
    var checkPageButton = document.getElementById('checkPage');
    checkPageButton.addEventListener('click', function() {
        document.getElementById('Header1').innerText = "Button was clicked";
        

    }, false);
  }, false);