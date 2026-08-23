  // ── EmailJS init ──
  emailjs.init('1OxbY7GuKjdokfBnv');
 
  // ── Navbar shadow on scroll ──
  window.addEventListener('scroll', () => {
    document.querySelector('.navbar').classList.toggle('scrolled', window.scrollY > 20);
  });
 
  // ── Scroll reveal ──
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
 
  // ── Contact form submission ──
  const form        = document.getElementById('contactForm');
  const submitBtn   = document.getElementById('submitBtn');
  const btnText     = document.getElementById('btnText');
  const btnSpinner  = document.getElementById('btnSpinner');
  const formSuccess = document.getElementById('formSuccess');
  const formError   = document.getElementById('formError');
 
  form.addEventListener('submit', function(e) {
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
 
    const firstName = document.getElementById('firstName').value.trim();
    const lastName  = document.getElementById('lastName').value.trim();
 
    const templateParams = {
      from_name:  `${firstName} ${lastName}`,
      from_email: document.getElementById('fromEmail').value.trim(),
      interest:   document.getElementById('interest').value || 'Not specified',
      message:    document.getElementById('message').value.trim(),
      to_name:    'Shikha',
    };
 
    emailjs.send('service_qiiz03m', 'template_blslbf8', templateParams)
      .then(() => {
        // Success
        formSuccess.classList.remove('d-none');
        form.reset();
        form.classList.remove('was-validated');
        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      })
      .catch((err) => {
        // Error
        console.error('EmailJS error:', err);
        formError.classList.remove('d-none');
        formError.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      })
      .finally(() => {
        // Restore button
        btnText.classList.remove('d-none');
        btnSpinner.classList.add('d-none');
        submitBtn.disabled = false;
      });
  });