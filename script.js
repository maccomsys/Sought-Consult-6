/**
 * SOUGHT CONSULT - Official Website Interactive Scripts
 * Ghanaian Construction & Property Solutions
 * Preserves all original interactive behaviors, animations, and modals.
 * Handles Direct WhatsApp Form Submissions (Professional Dynamic Formatting),
 * FAQ Accordions, Mobile Navigation, and Consultation Modal.
 */

document.addEventListener('DOMContentLoaded', () => {
  // -------------------------------------------------------------------------
  // 1. Mobile Navigation Drawer
  // -------------------------------------------------------------------------
  const mobileToggleBtn = document.getElementById('mobileToggleBtn');
  const mobileNavDrawer = document.getElementById('mobileNavDrawer');
  const mobileNavClose = document.getElementById('mobileNavClose');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link:not(.has-sub)');

  function openMobileNav() {
    mobileNavDrawer?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileNav() {
    mobileNavDrawer?.classList.remove('active');
    document.body.style.overflow = '';
  }

  mobileToggleBtn?.addEventListener('click', openMobileNav);
  mobileNavClose?.addEventListener('click', closeMobileNav);

  mobileNavDrawer?.addEventListener('click', (e) => {
    if (e.target === mobileNavDrawer) {
      closeMobileNav();
    }
  });

  mobileLinks.forEach((link) => {
    link.addEventListener('click', closeMobileNav);
  });

  // Mobile Accordions
  const mobileAccordionTriggers = document.querySelectorAll('.mobile-nav-link.has-sub');
  mobileAccordionTriggers.forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const subnav = trigger.nextElementSibling;
      const chevron = trigger.querySelector('.chevron-icon');
      if (subnav) {
        subnav.classList.toggle('open');
        if (chevron) {
          chevron.style.transform = subnav.classList.contains('open') ? 'rotate(180deg)' : 'rotate(0deg)';
        }
      }
    });
  });

  // -------------------------------------------------------------------------
  // 2. Animated Counter for "100% Quality & Reliable Execution"
  // -------------------------------------------------------------------------
  const counterElement = document.getElementById('projectCounter');
  let hasAnimatedCounter = false;

  function animateCounter(el, target, duration = 1800) {
    let startTimestamp = null;
    const startValue = 0;
    
    function step(timestamp) {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.floor(easeProgress * (target - startValue) + startValue);
      el.textContent = currentValue.toLocaleString('en-US');
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        el.textContent = target.toLocaleString('en-US');
      }
    }
    
    window.requestAnimationFrame(step);
  }

  if (counterElement) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimatedCounter) {
          hasAnimatedCounter = true;
          animateCounter(counterElement, 100, 1600);
        }
      });
    }, { threshold: 0.3 });

    observer.observe(counterElement);
  }

  // -------------------------------------------------------------------------
  // 3. Consultation / Quote Modal
  // -------------------------------------------------------------------------
  const appointmentModal = document.getElementById('appointmentModal');
  const appointmentClose = document.getElementById('appointmentClose');
  const appointmentBtns = document.querySelectorAll('[data-action="appointment"]');

  function openAppointmentModal() {
    closeMobileNav();
    if (appointmentModal) {
      appointmentModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    } else {
      window.location.href = 'contact.html';
    }
  }

  function closeAppointmentModal() {
    if (appointmentModal) {
      appointmentModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  appointmentBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openAppointmentModal();
    });
  });

  appointmentClose?.addEventListener('click', closeAppointmentModal);
  appointmentModal?.addEventListener('click', (e) => {
    if (e.target === appointmentModal) closeAppointmentModal();
  });

  // -------------------------------------------------------------------------
  // 4. Toast Notification
  // -------------------------------------------------------------------------
  function showToast(msg) {
    let toastNotice = document.getElementById('toastNotice');
    let toastMessage = document.getElementById('toastMessage');

    if (!toastNotice) {
      toastNotice = document.createElement('div');
      toastNotice.className = 'toast-notice';
      toastNotice.id = 'toastNotice';
      toastNotice.setAttribute('role', 'alert');
      toastNotice.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
        <span id="toastMessage"></span>
      `;
      document.body.appendChild(toastNotice);
      toastMessage = document.getElementById('toastMessage');
    }

    if (toastMessage) {
      toastMessage.textContent = msg;
      toastNotice.classList.add('show');
      clearTimeout(window.__toastTimeout);
      window.__toastTimeout = setTimeout(() => {
        toastNotice.classList.remove('show');
      }, 4200);
    }
  }

  // -------------------------------------------------------------------------
  // 5. WhatsApp-Only Form Submission & Professional Message Formatting
  // -------------------------------------------------------------------------
  // Designated Business WhatsApp Number for Sought Consult:
  const WHATSAPP_PHONE_NUMBER = '233268339409'; // Ghana +233 268339409 (0268339409)

  function formatFormToWhatsApp(form) {
    const isModal = form.id === 'appointmentForm';
    const heading = isModal ? 'NEW CONSULTATION & QUOTE REQUEST' : 'NEW WEBSITE ENQUIRY';
    const sourceName = isModal ? 'Website Consultation Modal' : 'Website Contact Form';

    const name = form.querySelector('[name="fullName"]')?.value?.trim() || '';
    const phone = form.querySelector('[name="phoneNumber"]')?.value?.trim() || '';
    const email = form.querySelector('[name="emailAddress"]')?.value?.trim() || '';
    const service = form.querySelector('[name="serviceRequired"]')?.value?.trim() || '';
    const location = form.querySelector('[name="projectLocation"]')?.value?.trim() || '';
    const message = form.querySelector('[name="projectMessage"]')?.value?.trim() || '';

    const now = new Date();
    const dateStr = now.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
    const timeStr = now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

    const divider = '━━━━━━━━━━━━━━━━━━';

    const lines = [];
    lines.push(heading);
    lines.push(divider);
    lines.push('CUSTOMER INFORMATION');
    lines.push(`Full Name: ${name}`);
    lines.push(`Phone Number: ${phone}`);
    if (email && email.toLowerCase() !== 'not provided') {
      lines.push(`Email Address: ${email}`);
    }
    lines.push(divider);
    lines.push('ENQUIRY DETAILS');
    if (service) {
      lines.push(`Service Required: ${service}`);
    }
    if (location) {
      lines.push(`Project Location: ${location}`);
    }
    lines.push('Message:');
    lines.push(message);
    lines.push(divider);
    lines.push('SUBMISSION DETAILS');
    lines.push(`Source: ${sourceName}`);
    lines.push(`Date: ${dateStr}`);
    lines.push(`Time: ${timeStr}`);
    lines.push(divider);
    lines.push('Please review this enquiry and follow up with the customer.');
    lines.push('Thank you.');

    return lines.join('\n');
  }

  function validateForm(form) {
    const nameInput = form.querySelector('[name="fullName"]');
    const phoneInput = form.querySelector('[name="phoneNumber"]');
    const serviceInput = form.querySelector('[name="serviceRequired"]');
    const locationInput = form.querySelector('[name="projectLocation"]');
    const messageInput = form.querySelector('[name="projectMessage"]');

    const name = nameInput?.value?.trim();
    const phone = phoneInput?.value?.trim();
    const service = serviceInput?.value?.trim();
    const location = locationInput?.value?.trim();
    const message = messageInput?.value?.trim();

    if (!name) {
      showToast('Please enter your full name.');
      nameInput?.focus();
      return false;
    }
    if (!phone) {
      showToast('Please enter your phone number.');
      phoneInput?.focus();
      return false;
    }
    if (!service) {
      showToast('Please select the required service.');
      serviceInput?.focus();
      return false;
    }
    if (!location) {
      showToast('Please enter your project location.');
      locationInput?.focus();
      return false;
    }
    if (!message) {
      showToast('Please enter your project message or description.');
      messageInput?.focus();
      return false;
    }

    return true;
  }

  function submitFormToWhatsApp(form) {
    if (!validateForm(form)) return false;

    const messageText = formatFormToWhatsApp(form);
    const encodedText = encodeURIComponent(messageText);
    const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodedText}`;

    showToast('Opening WhatsApp to send your enquiry...');

    try {
      const win = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      if (!win || win.closed || typeof win.closed === 'undefined') {
        window.location.href = whatsappUrl;
      }
    } catch (err) {
      window.location.href = whatsappUrl;
    }

    closeAppointmentModal();
    return true;
  }

  // Pre-fill Service from URL Query Parameter (e.g. contact.html?service=Civil%20Works)
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const serviceParam = urlParams.get('service');
    if (serviceParam) {
      document.querySelectorAll('[name="serviceRequired"]').forEach((select) => {
        for (let i = 0; i < select.options.length; i++) {
          if (select.options[i].value.toLowerCase() === serviceParam.toLowerCase()) {
            select.selectedIndex = i;
            break;
          }
        }
      });
    }
  } catch (err) {
    console.warn('Could not parse service parameter:', err);
  }

  // Wire all forms across the website
  document.querySelectorAll('.contact-form, #appointmentForm, #mainContactForm').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      submitFormToWhatsApp(form);
    });

    const submitBtn = form.querySelector('.btn-submit-whatsapp, .btn-send-whatsapp, button[type="submit"]');
    submitBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      submitFormToWhatsApp(form);
    });
  });

  // -------------------------------------------------------------------------
  // 6. FAQ Accordion Functionality
  // -------------------------------------------------------------------------
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const button = item.querySelector('.faq-question-btn');
    button?.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      // Close other items
      faqItems.forEach((other) => other.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // -------------------------------------------------------------------------
  // 7. Video Tour / Presentation Modal
  // -------------------------------------------------------------------------
  const videoModal = document.getElementById('videoModal');
  const videoClose = document.getElementById('videoClose');
  const watchVideoBtn = document.getElementById('watchVideoBtn');

  function openVideoModal() {
    videoModal?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeVideoModal() {
    videoModal?.classList.remove('active');
    document.body.style.overflow = '';
  }

  watchVideoBtn?.addEventListener('click', openVideoModal);
  videoClose?.addEventListener('click', closeVideoModal);
  videoModal?.addEventListener('click', (e) => {
    if (e.target === videoModal) closeVideoModal();
  });

  // -------------------------------------------------------------------------
  // Building Materials Request Modal & Dynamic Pricing Logic
  // -------------------------------------------------------------------------
  const materialModal = document.getElementById('materialModal');
  const materialModalClose = document.getElementById('materialModalClose');
  const materialBtns = document.querySelectorAll('[data-action="material-modal"]');
  const materialRequestForm = document.getElementById('materialRequestForm');

  const modalTruckSize = document.getElementById('modalTruckSize');
  const modalBuildingMaterial = document.getElementById('modalBuildingMaterial');
  const modalMaterialSubcategory = document.getElementById('modalMaterialSubcategory');
  const modalRequestType = document.getElementById('modalRequestType');
  const scheduledFields = document.getElementById('scheduledFields');
  const priceBannerText = document.getElementById('priceBannerText');

  const pricingData = {
    "16 Cubic": {
      "Quarry Stones / Chippings": {
        "3/4 Inch (Three-Quarter Inch)": 4300,
        "1 Inch (One Inch)": 4300,
        "3/8 Inch (Three-Eighth Inch)": 4800,
        "5/8 Inch (Five-Eighth Inch)": 4800
      },
      "Riversand": {
        "Smooth Sand": 4000,
        "Medium Sand": 4000,
        "Rough Sand": 4000
      },
      "Filling Sand": {
        "Grade 1": 2500,
        "Laterite": 2200
      },
      "Sand / Plastering Sand": {
        "Smooth": 3200,
        "Medium": 3200,
        "Rough": 3500
      }
    },
    "18 Cubic": {
      "Quarry Stones / Chippings": {
        "3/4 Inch (Three-Quarter Inch)": 4700,
        "1 Inch (One Inch)": 4700,
        "3/8 Inch (Three-Eighth Inch)": 5000,
        "5/8 Inch (Five-Eighth Inch)": 5000
      },
      "Riversand": {
        "Smooth Sand": 4000,
        "Medium Sand": 4000,
        "Rough Sand": 4000
      },
      "Filling Sand": {
        "Grade 1": 2500,
        "Laterite": 2200
      },
      "Sand / Plastering Sand": {
        "Smooth": 3200,
        "Medium": 3200,
        "Rough": 3500
      }
    },
    "20 Cubic": {
      "Quarry Stones / Chippings": {
        "3/4 Inch (Three-Quarter Inch)": 5000,
        "1 Inch (One Inch)": 5000,
        "3/8 Inch (Three-Eighth Inch)": 5000,
        "5/8 Inch (Five-Eighth Inch)": 5000
      },
      "Riversand": {
        "Smooth Sand": 4200,
        "Medium Sand": 4200,
        "Rough Sand": 4200
      },
      "Filling Sand": {
        "Grade 1": 2500,
        "Laterite": 2200
      },
      "Sand / Plastering Sand": {
        "Smooth": 3200,
        "Medium": 3200,
        "Rough": 3500
      }
    }
  };

  const subcategoriesMap = {
    "Quarry Stones / Chippings": [
      "3/4 Inch (Three-Quarter Inch)",
      "1 Inch (One Inch)",
      "3/8 Inch (Three-Eighth Inch)",
      "5/8 Inch (Five-Eighth Inch)"
    ],
    "Riversand": [
      "Smooth Sand",
      "Medium Sand",
      "Rough Sand"
    ],
    "Filling Sand": [
      "Grade 1",
      "Laterite"
    ],
    "Sand / Plastering Sand": [
      "Smooth",
      "Medium",
      "Rough"
    ]
  };

  let currentSelectedPrice = null;

  function updateSubcategories(selectedMaterial, preselectSub = '') {
    if (!modalMaterialSubcategory) return;
    modalMaterialSubcategory.innerHTML = '<option value="">-- Select Material Type --</option>';
    const subs = subcategoriesMap[selectedMaterial] || [];
    subs.forEach(sub => {
      const opt = document.createElement('option');
      opt.value = sub;
      opt.textContent = sub;
      if (sub === preselectSub) {
        opt.selected = true;
      }
      modalMaterialSubcategory.appendChild(opt);
    });
    updatePriceDisplay();
  }

  function updatePriceDisplay() {
    if (!priceBannerText) return;
    const truck = modalTruckSize?.value;
    const mat = modalBuildingMaterial?.value;
    const sub = modalMaterialSubcategory?.value;

    if (truck && mat && sub && pricingData[truck]?.[mat]?.[sub] !== undefined) {
      const price = pricingData[truck][mat][sub];
      currentSelectedPrice = price.toLocaleString('en-US');
      priceBannerText.textContent = `Estimated Material Price: GH₵ ${currentSelectedPrice}`;
    } else {
      currentSelectedPrice = null;
      priceBannerText.textContent = 'Select truck size and material type to view price.';
    }
  }

  materialBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const material = btn.getAttribute('data-material') || 'Quarry Stones / Chippings';
      if (modalBuildingMaterial) {
        modalBuildingMaterial.value = material;
        updateSubcategories(material);
      }
      if (modalTruckSize) {
        modalTruckSize.value = '';
      }
      updatePriceDisplay();
      if (materialModal) {
        materialModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeMaterialModal() {
    if (materialModal) {
      materialModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  materialModalClose?.addEventListener('click', closeMaterialModal);
  materialModal?.addEventListener('click', (e) => {
    if (e.target === materialModal) closeMaterialModal();
  });

  modalBuildingMaterial?.addEventListener('change', (e) => {
    updateSubcategories(e.target.value);
  });

  modalTruckSize?.addEventListener('change', updatePriceDisplay);
  modalMaterialSubcategory?.addEventListener('change', updatePriceDisplay);

  modalRequestType?.addEventListener('change', (e) => {
    if (e.target.value === 'Scheduled Request') {
      if (scheduledFields) scheduledFields.style.display = 'block';
      const dateInput = scheduledFields?.querySelector('[name="scheduledDate"]');
      const timeInput = scheduledFields?.querySelector('[name="scheduledTime"]');
      if (dateInput) dateInput.required = true;
      if (timeInput) timeInput.required = true;
    } else {
      if (scheduledFields) scheduledFields.style.display = 'none';
      const dateInput = scheduledFields?.querySelector('[name="scheduledDate"]');
      const timeInput = scheduledFields?.querySelector('[name="scheduledTime"]');
      if (dateInput) { dateInput.required = false; dateInput.value = ''; }
      if (timeInput) { timeInput.required = false; timeInput.value = ''; }
    }
  });

  // Initialize subcategories on load
  if (modalBuildingMaterial) {
    updateSubcategories(modalBuildingMaterial.value);
  }

  // Material Request WhatsApp Submission
  function submitMaterialToWhatsApp(form) {
    const name = form.querySelector('[name="fullName"]')?.value?.trim();
    const phone = form.querySelector('[name="phoneNumber"]')?.value?.trim();
    const truck = modalTruckSize?.value;
    const material = modalBuildingMaterial?.value;
    const subcategory = modalMaterialSubcategory?.value;
    const destination = form.querySelector('[name="projectLocation"]')?.value?.trim();
    const requestType = modalRequestType?.value;
    const scheduledDate = form.querySelector('[name="scheduledDate"]')?.value?.trim() || 'N/A';
    const scheduledTime = form.querySelector('[name="scheduledTime"]')?.value?.trim() || 'N/A';
    const instructions = form.querySelector('[name="additionalInstructions"]')?.value?.trim() || 'None provided';

    if (!name) {
      showToast('Please enter your full name.');
      form.querySelector('[name="fullName"]')?.focus();
      return;
    }
    if (!phone) {
      showToast('Please enter your phone/WhatsApp number.');
      form.querySelector('[name="phoneNumber"]')?.focus();
      return;
    }
    if (!truck) {
      showToast('Please select a tipper truck bucket size.');
      modalTruckSize?.focus();
      return;
    }
    if (!material) {
      showToast('Please select a building material.');
      modalBuildingMaterial?.focus();
      return;
    }
    if (!subcategory) {
      showToast('Please select a material subcategory/type.');
      modalMaterialSubcategory?.focus();
      return;
    }
    if (!destination) {
      showToast('Please enter the delivery destination.');
      form.querySelector('[name="projectLocation"]')?.focus();
      return;
    }
    if (requestType === 'Scheduled Request') {
      const dVal = form.querySelector('[name="scheduledDate"]')?.value?.trim();
      const tVal = form.querySelector('[name="scheduledTime"]')?.value?.trim();
      if (!dVal || !tVal) {
        showToast('Please provide scheduled delivery date and time.');
        return;
      }
    }
    if (!currentSelectedPrice) {
      showToast('Please complete truck size and material selections to determine price.');
      return;
    }

    const WHATSAPP_MATERIAL_NUMBER = '233207004123';

    const lines = [];
    lines.push('BUILDING MATERIAL REQUEST');
    lines.push('');
    lines.push('Hello, I would like to make a building materials request.');
    lines.push('');
    lines.push('CUSTOMER INFORMATION');
    lines.push(`Full Name: ${name}`);
    lines.push(`Phone Number: ${phone}`);
    lines.push('');
    lines.push('ORDER DETAILS');
    lines.push(`Tipper Truck Bucket Size: ${truck}`);
    lines.push(`Building Material: ${material}`);
    lines.push(`Material Type: ${subcategory}`);
    lines.push(`Estimated Material Price: GH₵ ${currentSelectedPrice}`);
    lines.push('');
    lines.push('DELIVERY INFORMATION');
    lines.push(`Destination: ${destination}`);
    lines.push(`Request Type: ${requestType}`);
    if (requestType === 'Scheduled Request') {
      lines.push(`Scheduled Delivery Date: ${scheduledDate}`);
      lines.push(`Preferred Delivery Time: ${scheduledTime}`);
    }
    lines.push('');
    lines.push(`Additional Instructions: ${instructions}`);
    lines.push('');
    lines.push('Please confirm availability and provide any further information regarding this request.');
    lines.push('');
    lines.push('Thank you.');

    const messageText = lines.join('\n');
    const encodedText = encodeURIComponent(messageText);
    const whatsappUrl = `https://wa.me/${WHATSAPP_MATERIAL_NUMBER}?text=${encodedText}`;

    showToast('Opening WhatsApp to send your building material request...');

    try {
      const win = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      if (!win || win.closed || typeof win.closed === 'undefined') {
        window.location.href = whatsappUrl;
      }
    } catch (err) {
      window.location.href = whatsappUrl;
    }

    closeMaterialModal();
  }

  materialRequestForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    submitMaterialToWhatsApp(materialRequestForm);
  });

  // -------------------------------------------------------------------------
  // 8. Global Escape Key Handler
  // -------------------------------------------------------------------------
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAppointmentModal();
      closeVideoModal();
      closeMobileNav();
      closeMaterialModal();
    }
  });

  console.log("Sought Consult website scripts initialized successfully.");
});
