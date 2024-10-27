// Fixed Navbar
$(window).scroll(function () {
    if ($(window).width() < 992) {
        if ($(this).scrollTop() > 45) {
            $('.fixed-top').addClass('bg-dark shadow');
        } else {
            $('.fixed-top').removeClass('bg-dark shadow');
        }
    } else {
        if ($(this).scrollTop() > 45) {
            $('.fixed-top').addClass('bg-dark shadow').css('top', -45);
        } else {
            $('.fixed-top').removeClass('bg-dark shadow').css('top', 0);
        }
    }
});

// Form Submission Functionality
document.getElementById('job-application-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Show the popup message
    document.getElementById('popup').style.display = 'flex';
});

// Close popup functionality
document.querySelector('.close-btn').addEventListener('click', function() {
    document.getElementById('popup').style.display = 'none';
});

// Close popup when clicking outside of the popup content
window.onclick = function(event) {
    if (event.target === document.getElementById('popup')) {
        document.getElementById('popup').style.display = 'none';
    }
}

// Spinner
var spinner = function () {
    setTimeout(function () {
        if ($('#spinner').length > 0) {
            $('#spinner').removeClass('show');
        }
    }, 1);
};
spinner();


/*=============== BACK TO TOP ===============*/ 
function backtotop(){
    const backtotop = document.getElementById('backtotop');
    // When the scroll is higher than 200 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if(this.scrollY >= 200) backtotop.classList.add('show-scroll'); else backtotop.classList.remove('show-scroll')
}
window.addEventListener('scroll', backtotop)


