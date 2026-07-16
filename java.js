
// EDIT THIS SECTION when details change — one place only


const CENTRE_INFO = {
  whatsappNumber: "919093829095",
};


// ---- Smooth Scroll ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});


// ---- Counter Animation (fires when stats come into view) ----
const counters = document.querySelectorAll('.stat-num');

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counter = entry.target;
      const target = parseInt(counter.getAttribute('data-target'));

      let count = 0;
      const step = target / 60;

      const update = () => {
        count += step;
        if (count < target) {
          counter.innerText = Math.floor(count);
          requestAnimationFrame(update);
        } else {
          counter.innerText = target + "+";
        }
      };

      update();
      counterObserver.unobserve(counter); // run only once
    }
  });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));


// ---- Scroll Reveal for Sections ----
const sections = document.querySelectorAll("section");

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, { threshold: 0.1 });

sections.forEach(section => sectionObserver.observe(section));


// ---- Ripple Effect on Buttons ----
document.querySelectorAll('button').forEach(btn => {
  btn.addEventListener('click', e => {
    const circle = document.createElement('span');
    circle.classList.add('ripple');
    const rect = btn.getBoundingClientRect();
    circle.style.left = (e.clientX - rect.left) + 'px';
    circle.style.top  = (e.clientY - rect.top) + 'px';
    btn.appendChild(circle);
    setTimeout(() => circle.remove(), 600);
  });
});


// ---- WhatsApp Demo Form Submit ----
function sendToWhatsApp() {
  const name = document.getElementById('demo-name').value.trim();
  const phone = document.getElementById('demo-phone').value.trim();
  const cls = document.getElementById('demo-class').value;
  const subject = document.getElementById('demo-subject').value;

  if (!name || !phone || cls === 'Select class' || subject === 'Select subject') {
    alert('Please fill in all fields before submitting.');
    return;
  }

  const msg =
`Hello Sir,
I want to book a free demo class.

Name: ${name}
Phone: ${phone}
Class: ${cls}
Need help with: ${subject}`;

  window.open(
    `https://wa.me/${CENTRE_INFO.whatsappNumber}?text=${encodeURIComponent(msg)}`,
    '_blank'
  );
}