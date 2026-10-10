   // ── Navbar shadow on scroll ──
   window.addEventListener('scroll', () => {
    document.querySelector('.navbar').classList.toggle('scrolled', window.scrollY > 20);
  });
 
  // ── Scroll reveal ──
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
 
  // ── Contact form — Formspree ──
  const form        = document.getElementById('contactForm');
  const submitBtn   = document.getElementById('submitBtn');
  const btnText     = document.getElementById('btnText');
  const btnSpinner  = document.getElementById('btnSpinner');
  const formSuccess = document.getElementById('formSuccess');
  const formError   = document.getElementById('formError');
 
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
 
    // Reset alerts
    formSuccess.classList.add('d-none');
    formError.classList.add('d-none');
 
    // Bootstrap validation
    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return;
    }
 
    // Loading state
    btnText.classList.add('d-none');
    btnSpinner.classList.remove('d-none');
    submitBtn.disabled = true;
 
    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });
 
      if (response.ok) {
        formSuccess.classList.remove('d-none');
        form.reset();
        form.classList.remove('was-validated');
        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        const data = await response.json();
        console.error('Formspree error:', data);
        formError.classList.remove('d-none');
        formError.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    } catch (err) {
      console.error('Network error:', err);
      formError.classList.remove('d-none');
      formError.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } finally {
      btnText.classList.remove('d-none');
      btnSpinner.classList.add('d-none');
      submitBtn.disabled = false;
    }
  });