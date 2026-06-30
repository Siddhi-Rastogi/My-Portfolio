/* ============ Preloader ============ */
window.addEventListener('load', function () {
    var preloader = document.getElementById('preloader');
    setTimeout(function () {
        preloader.classList.add('loaded');
    }, 400);
});

/* ============ Tabs (Skills / Education / Certificates) ============ */
var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");
function opentab(tabname, evt) {
    for (var tablink of tablinks) {
        tablink.classList.remove("active-link");
    }
    for (var tabcontent of tabcontents) {
        tabcontent.classList.remove("active-tab");
    }
    var target = (evt && evt.currentTarget) ? evt.currentTarget : document.querySelector('[onclick*="' + tabname + '"]');
    if (target) target.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");
}

/* ============ Mobile menu ============ */
var sidemenu = document.getElementById("sidemenu");
var backdrop = document.getElementById("menu-backdrop");
function openmenu() {
    sidemenu.style.right = "0";
    if (backdrop) backdrop.classList.add('active');
}
function closemenu() {
    sidemenu.style.right = "-200px";
    if (backdrop) backdrop.classList.remove('active');
}

/* Close mobile menu after clicking a link */
document.querySelectorAll('#sidemenu a').forEach(function (link) {
    link.addEventListener('click', closemenu);
});

/* ============ Scroll progress bar ============ */
var progressBar = document.getElementById('scroll-progress');
function updateProgress() {
    var scrollTop = window.scrollY;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (progressBar) progressBar.style.width = pct + '%';
}

/* ============ Scrollspy: highlight active nav link ============ */
var sections = document.querySelectorAll('#header, #about, #services, #portfolio, #certificates-gallery, #contact');
var navLinks = document.querySelectorAll('.nav-link');
function updateActiveNav() {
    var scrollPos = window.scrollY + window.innerHeight / 3;
    sections.forEach(function (section) {
        if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
            var id = section.getAttribute('id');
            navLinks.forEach(function (link) {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + id) {
                    link.classList.add('active');
                }
            });
        }
    });
}

/* ============ Back to top button ============ */
var backToTop = document.getElementById('back-to-top');
function updateBackToTop() {
    if (!backToTop) return;
    if (window.scrollY > 500) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
}
if (backToTop) {
    backToTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

window.addEventListener('scroll', function () {
    updateProgress();
    updateActiveNav();
    updateBackToTop();
});
updateProgress();
updateActiveNav();
updateBackToTop();

/* ============ Reveal-on-scroll (Intersection Observer) ============ */
var revealEls = document.querySelectorAll('.reveal, .reveal-fade');
if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    revealEls.forEach(function (el) { revealObserver.observe(el); });
} else {
    revealEls.forEach(function (el) { el.classList.add('active'); });
}

/* ============ Typed rotating role text ============ */
var roles = ["Software Professional", "Java Developer", "Backend Engineer", "Problem Solver"];
var typedEl = document.getElementById('typed-role');
if (typedEl) {
    var roleIndex = 0, charIndex = 0, deleting = false;
    function typeLoop() {
        var current = roles[roleIndex];
        if (!deleting) {
            charIndex++;
            typedEl.textContent = current.substring(0, charIndex);
            if (charIndex === current.length) {
                deleting = true;
                setTimeout(typeLoop, 1400);
                return;
            }
        } else {
            charIndex--;
            typedEl.textContent = current.substring(0, charIndex);
            if (charIndex === 0) {
                deleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
            }
        }
        setTimeout(typeLoop, deleting ? 40 : 80);
    }
    setTimeout(typeLoop, 600);
}

/* ============ Tilt effect on cards ============ */
var tiltCards = document.querySelectorAll('.tilt-card');
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    tiltCards.forEach(function (card) {
        card.addEventListener('mousemove', function (e) {
            var rect = card.getBoundingClientRect();
            var x = e.clientX - rect.left;
            var y = e.clientY - rect.top;
            var rotateX = ((y - rect.height / 2) / rect.height) * -8;
            var rotateY = ((x - rect.width / 2) / rect.width) * 8;
            card.style.transform = 'perspective(800px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-6px)';
        });
        card.addEventListener('mouseleave', function () {
            card.style.transform = '';
        });
    });
}

/* ============ Cursor glow ============ */
var cursorGlow = document.getElementById('cursor-glow');
if (cursorGlow && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    document.addEventListener('mousemove', function (e) {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
        cursorGlow.classList.add('active');
    });
    document.addEventListener('mouseleave', function () {
        cursorGlow.classList.remove('active');
    });
}

/* ============ Certificate image fallback ============ */
function handleImgError(img) {
    img.classList.add('img-fallback');
    img.src = 'data:image/svg+xml;utf8,' + encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150">' +
        '<rect width="200" height="150" fill="none"/>' +
        '<g fill="#ff004f" opacity="0.6">' +
        '<path d="M100 25 L120 70 L168 75 L133 105 L143 152 L100 128 L57 152 L67 105 L32 75 L80 70 Z"/>' +
        '</g></svg>'
    );
}

/* ============ Lightbox ============ */
function openLightbox(imageSrc) {
    var lightbox = document.getElementById('lightbox');
    var lightboxImg = document.getElementById('lightbox-img');
    lightboxImg.src = imageSrc;
    lightbox.classList.add('active');
}
function closeLightbox() {
    var lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
}
document.getElementById('close-btn').addEventListener('click', closeLightbox);
document.getElementById('lightbox').addEventListener('click', function (e) {
    if (e.target === this) closeLightbox();
});
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeLightbox();
});

/* ============ Toast helper ============ */
var toast = document.getElementById('toast');
function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(function () { toast.classList.remove('show'); }, 3500);
}

/* ============ Contact form: validation + submission ============ */
var scriptURL = 'https://script.google.com/macros/s/AKfycbzoZOrR2NO0gyeYMdcz1KRmCOZC0EFnmbrYKEghce7oc6BJ2MZL1UHTRMVgOjb1YSwF/exec';
var form = document.getElementById('contact-form');
var msg = document.getElementById('msg');

function validateField(input) {
    var group = input.closest('.input-group');
    var valid = input.checkValidity() && input.value.trim() !== '';
    if (input.type === 'email') {
        valid = valid && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim());
    }
    group.classList.toggle('invalid', !valid);
    return valid;
}

if (form) {
    form.querySelectorAll('input, textarea').forEach(function (input) {
        input.addEventListener('blur', function () { validateField(input); });
        input.addEventListener('input', function () {
            if (input.closest('.input-group').classList.contains('invalid')) {
                validateField(input);
            }
        });
    });

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        var fields = form.querySelectorAll('input[required], textarea[required]');
        var allValid = true;
        fields.forEach(function (f) {
            if (!validateField(f)) allValid = false;
        });
        if (!allValid) {
            showToast('Please fix the highlighted fields.');
            return;
        }

        var submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        fetch(scriptURL, { method: 'POST', body: new FormData(form) })
            .then(function () {
                msg.innerHTML = "Message sent successfully!";
                showToast('Thanks! Your message has been sent.');
                setTimeout(function () { msg.innerHTML = ""; }, 5000);
                form.reset();
                form.querySelectorAll('.input-group').forEach(function (g) { g.classList.remove('invalid'); });
            })
            .catch(function (error) {
                console.error('Error!', error.message);
                showToast('Something went wrong. Please try again.');
            })
            .finally(function () {
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
            });
    });
}
