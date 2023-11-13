document.addEventListener("DOMContentLoaded", function() {
    // Get the <ul> element with class="drac-tabs"
    const tabs = document.querySelectorAll(".drac-tab");

    // Add a handler for all the tabs
    tabs.forEach(function(tab) {
        const tabLink = tab.querySelector(".drac-tab-link");
        tabLink.addEventListener("click", function(event) {
            // Avoid the default behavior of links
            event.preventDefault();

            // remove the 'drac-tab-active' class from all the tabs
            tabs.forEach(function(t) {
                t.classList.remove("drac-tab-active");
            });

            // add the 'drac-tab-active' class to the current tab parent
            tab.classList.add("drac-tab-active");
        });
    });



    // ############################ SCRIPT FOR THE NAVBAR ############################
    // Smooth Scrolling
     // Get the 'About' link from the href attribute
     const aboutLink = document.querySelector('a[href="#home"]');

     // add a click event listener to the link
     aboutLink.addEventListener("click", function(event) {
         // avoid the default behavior of links
         event.preventDefault();
 
         // scroll to the top of the page
         window.scrollTo({
             top: 0,
             behavior: "smooth" // smooth scroll
         });
     });


     // get skills link
     const skillsLink = document.querySelector('a[href="#skills"]');

     // add a click event listener to the link
     skillsLink.addEventListener("click", function(event) {
         // avoid the default behavior of links
         event.preventDefault();

         // get the skills section
         const skillsSection = document.getElementById('skills');

         // scroll to the skills section
         skillsSection.scrollIntoView({ behavior: "smooth" });
     });


    // get projects link
    const projectsLink = document.querySelector('a[href="#projects"]');

    // add a click event listener to the link
    projectsLink.addEventListener("click", function(event) {
        // avoid the default behavior of links
        event.preventDefault();

        // get the projects section
        const projectsSection = document.getElementById('projects');

        // scroll to the projects section
        projectsSection.scrollIntoView({ behavior: "smooth" });
    });

});


// ############################ SCRIPT FOR AUTOCHANGE SCROLL ############################
function findNearestSectionId() {
    const sections = document.querySelectorAll(".section"); // Selector para todas tus secciones
    let nearestSectionId = null;
    let nearestDistance = Infinity; // Inicializa con un valor grande

    sections.forEach(function(section) {
        const rect = section.getBoundingClientRect();
        const distance = Math.abs(rect.top);

        if (distance < nearestDistance) {
            nearestDistance = distance;
            nearestSectionId = section.id;
        }
    });

    return nearestSectionId;
}

function addActiveClassToNav(nearestSectionId) {
    const navLinks = document.querySelectorAll(".drac-tab-link"); // Selector de tus enlaces de navegación

    navLinks.forEach(function(navLink) {
        const href = navLink.getAttribute("href");
        const parentLi = navLink.parentElement;

        if (href === `#${nearestSectionId}`) {
            parentLi.classList.add("drac-tab-active");
        } else {
            parentLi.classList.remove("drac-tab-active");
        }
    });
}

// Scroll event listener
window.addEventListener("scroll", function() {
    const nearestSectionId = findNearestSectionId();
    addActiveClassToNav(nearestSectionId);
});



// ############################ SCRIPT FOR CONTROL TERMYNAL MUTATIONS ############################
function getHeight() {
    const element = document.getElementById('termynal');
    const height = element.offsetHeight;
    document.getElementById('termynal-container').style.height = height + 'px';
}

  // Observador de mutación para detectar cambios en el elemento
const termynalElem = document.getElementById('termynal');
const observer = new MutationObserver(getHeight);

// Configuración del observador
const config = { attributes: true, childList: true, subtree: true };

// Iniciar la observación del elemento
observer.observe(termynalElem, config);


// ############################ SCRIPT FOR VISIBLE ELEMENTS ANIMATIONS ############################
const animationsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        // This enable animation only the first time the element is visible
        if (entry.isIntersecting) {
            entry.target.classList.add("show-animation");
        }
        /* This enable animation every time the element is visible 
        if (entry.isIntersecting) {
            entry.target.classList.add("show-animation");
        }else{
            entry.target.classList.remove("show-animation");
        }
        */
    });
});

const elementsToAnimate = document.querySelectorAll(".animated");
elementsToAnimate.forEach((element) => animationsObserver.observe(element));