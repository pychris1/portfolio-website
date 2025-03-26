// Contact form submission with fetch API
document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const responseElement = document.getElementById("response");

    fetch(form.action, {
        method: form.method,
        body: formData,
        headers: { 'Accept': 'application/json' }
    }).then(response => {
        if (response.ok) {
            responseElement.textContent = "🎉 Message sent successfully!";
            responseElement.className = "success"; // Apply success styling
            form.reset();
        } else {
            responseElement.textContent = "⚠️ Error sending message.";
            responseElement.className = "error"; // Apply error styling
        }
        
        responseElement.style.display = "block"; // Show the response message

        // Make it bounce in, then fade out after 3 seconds
        setTimeout(() => {
            responseElement.style.opacity = "0"; 
            setTimeout(() => {
                responseElement.style.display = "none"; // Hide after fade-out
                responseElement.style.opacity = "1";  // Reset opacity for next use
            }, 1000); // Matches transition time
        }, 3000);
        
    }).catch(error => {
        responseElement.textContent = "❌ Something went wrong.";
        responseElement.className = "error"; // Apply error styling
        responseElement.style.display = "block"; // Show the response message

        // Make it bounce in, then fade out after 3 seconds
        setTimeout(() => {
            responseElement.style.opacity = "0"; 
            setTimeout(() => {
                responseElement.style.display = "none"; 
                responseElement.style.opacity = "1";  
            }, 1000);
        }, 3000);
    });
});

// Menu toggle functionality
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar'); 

menuIcon.onclick = () => {
    menuIcon.classList.toggle('fa-xmark');
    navbar.classList.toggle('active');
}

// Navbar highlight on scroll
let sections = document.querySelectorAll('section');
let navlinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            navlinks.forEach(link => {
                link.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };
    });

    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    // Close the menu on scroll
    menuIcon.classList.remove('fa-xmark');
    navbar.classList.remove('active');
};

// Initialize ScrollReveal animations
ScrollReveal().reveal('.home-content', { origin: 'top', distance: '80px', duration: 2000, delay: 200 });
ScrollReveal().reveal('.home-img, .services-container, .portfolio-box, .contact form', { origin: 'bottom', distance: '80px', duration: 2000, delay: 200 });
ScrollReveal().reveal('.home-contact h1, .about img', { origin: 'left', distance: '80px', duration: 2000, delay: 200 });
ScrollReveal().reveal('.home-contact p, .about-content', { origin: 'right', distance: '80px', duration: 2000, delay: 200 });

// Initialize Typed.js for multiple text animation
const typed = new Typed('.multiple-text', {
    strings: ['Programmer', 'Developer', 'Engineer'],
    typeSpeed: 70,
    backSpeed: 70,
    backDelay: 1000,
    loop: true,
});



// Show button when scrolling down
window.addEventListener("scroll", function () {
    let button = document.getElementById("back-to-top");
    if (window.scrollY > 300) {
        button.style.display = "block";
    } else {
        button.style.display = "none";
    }
});

// Scroll to top when button is clicked
document.getElementById("back-to-top").addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
});







async function getBestResponse(userInputText) {
    try {
        const response = await fetch('http://localhost:3000/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: userInputText }),
        });

        if (!response.ok) {
            console.error("Server responded with an error:", response.status);
            return "Error: Unable to fetch response.";
        }

        const data = await response.json();
        console.log("Response from server:", data);
        return data.response || "I'm not sure about that.";
    } catch (error) {
        console.error("Fetch error:", error);
        return "Error: Could not connect to server.";
    }
}
