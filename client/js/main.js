(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


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
    
    
    // Back to top button
    // $(window).scroll(function () {
    //     if ($(this).scrollTop() > 300) {
    //         $('.back-to-top').fadeIn('slow');
    //     } else {
    //         $('.back-to-top').fadeOut('slow');
    //     }
    // });
    // $('.back-to-top').click(function () {
    //     $('html, body').animate({scrollTop: 0}, 100, 'easeInOutExpo');
    //     return false;
    // });

    /*=============== BACK TO TOP ===============*/ 
        function backtotop(){
            const backtotop = document.getElementById('backtotop');
            // When the scroll is higher than 200 viewport height, add the show-scroll class to the a tag with the scroll-top class
            if(this.scrollY >= 200) backtotop.classList.add('show-scroll'); else backtotop.classList.remove('show-scroll')
        }
        window.addEventListener('scroll', backtotop)


    // Causes progress
    // $('.causes-progress').waypoint(function () {
    //     $('.progress .progress-bar').each(function () {
    //         $(this).css("width", $(this).attr("aria-valuenow") + '%');
    //     });
    // }, {offset: '80%'});


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: false,
        smartSpeed: 1000,
        center: true,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            }
        }
    });

    
})(jQuery);

    // Login/Register

    const containerforlogin=document.querySelector('.containerforlogin');
    const LoginLink=document.querySelector('.SignInLink')
    const RegisterLink=document.querySelector('.SignUpLink')
    RegisterLink.addEventListener('click',()=>{
        containerforlogin.classList.add('active');
    })
    LoginLink.addEventListener('click',()=>{
        containerforlogin.classList.remove('active');
    })

    //Popup Newsletter

/*=============== LIGHT DARK THEME ===============*/ 
const themeButton = document.getElementById('theme-button')
const lightTheme = 'light-theme'
const iconTheme = 'ri-sun-line'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the light-theme class
const getCurrentTheme = () => document.body.classList.contains(lightTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'ri-moon-line' : 'bx bx-sun'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the light
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](lightTheme)
  themeButton.classList[selectedIcon === 'bx bx-moon' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the light / icon theme
    document.body.classList.toggle(lightTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})


/*=============== LIGHT DARK THEME 2 near project surabhi===============*/ 
const themeButton2 = document.getElementById('theme-button2')
const lightTheme2 = 'light-theme'
const iconTheme2 = 'ri-sun-line'

// Previously selected topic (if user selected)
const selectedTheme2 = localStorage.getItem('selected-theme2')
const selectedIcon2 = localStorage.getItem('selected-icon2')

// We obtain the current theme that the interface has by validating the light-theme class
const getCurrentTheme2 = () => document.body.classList.contains(lightTheme2) ? 'dark' : 'light'
const getCurrentIcon2 = () => themeButton.classList.contains(iconTheme2) ? 'ri-moon-line' : 'bx bx-sun'

// We validate if the user previously chose a topic
if (selectedTheme2) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the light
  document.body.classList[selectedTheme2 === 'dark' ? 'add' : 'remove'](lightTheme2)
  themeButton2.classList[selectedIcon2 === 'bx bx-moon' ? 'add' : 'remove'](iconTheme2)
}

// Activate / deactivate the theme manually with the button
themeButton2.addEventListener('click', () => {
    // Add or remove the light / icon theme
    document.body.classList.toggle(lightTheme2)
    themeButton2.classList.toggle(iconTheme2)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme2', getCurrentTheme2())
    localStorage.setItem('selected-icon2', getCurrentIcon2())
})


// Donation system

let amount = 0;

function setAmount(amt) {
    amount = amt;
    document.getElementById('custom-amount').value = ''; // Clear custom amount when selecting a predefined option
}

function proceedToPayment() {
    const customAmount = document.getElementById('custom-amount').value;
    amount = customAmount ? customAmount : amount;

    if (!amount || amount <= 0) {
        alert('Please select or enter a valid donation amount.');
        return;
    }

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    if (!name || !email) {
        alert('Please fill in all the fields.');
        return;
    }

    const options = {
        "key": "YOUR_RAZORPAY_KEY_ID", // Enter your Razorpay Key ID here
        "amount": amount * 100, // Razorpay expects the amount in paise
        "currency": "INR",
        "name": name,
        "description": "Donation",
        "handler": function (response) {
            alert('Payment successful! Payment ID: ' + response.razorpay_payment_id);
            // Add your post-payment handling logic here
        },
        "prefill": {
            "name": name,
            "email": email
        },
        "theme": {
            "color": "#3399cc"
        }
    };

    const rzp1 = new Razorpay(options);
    rzp1.open();
}

// Contact application Popup 
    document.getElementById('job-application-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Show the popup message
    document.getElementById('contact-popup').style.display = 'flex';
});

// Close popup functionality
document.querySelector('.application-popup-btn').addEventListener('click', function() {
    document.getElementById('contact-popup').style.display = 'none';
});

// Close popup when clicking outside of the popup content
window.onclick = function(event) {
    if (event.target === document.getElementById('contact-popup')) {
        document.getElementById('contact-popup').style.display = 'none';
    }
}





      
