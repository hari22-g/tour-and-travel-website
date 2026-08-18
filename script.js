(() => {
  const jyotirlingas = [
    'Somnath', 'Mallikarjuna', 'Mahakaleshwar', 'Omkareshwar', 'Kedarnath',
    'Bhimashankar', 'Kashi Vishwanath', 'Trimbakeshwar', 'Vaidyanath',
    'Nageshwar', 'Rameshwaram', 'Grishneshwar'
  ];

  const videoMap = {
    Somnath: 'videos/Somnath.webm',
    Mallikarjuna: 'videos/Mallikarjuna.webm',
    Mahakaleshwar: 'videos/Mahakaleshwar.webm',
    Omkareshwar: 'videos/Omkareshwar.webm',
    Kedarnath: 'videos/Kedarnath.webm',
    Bhimashankar: 'videos/Bhimashankar.webm',
    'Kashi Vishwanath': 'videos/KashiVishwanath.webm',
    Trimbakeshwar: 'videos/Trimbakeshwar.webm',
    Vaidyanath: 'videos/Vaidyanath.webm',
    Nageshwar: 'videos/Nageshwar.webm',
    Rameshwaram: 'videos/Rameshwaram.webm',
    Grishneshwar: 'videos/Grishneshwar.webm'
  };

  const catalogData = {
    Somnath: {
      image: 'images/Somnath.jpg',
      description: 'The first and most revered Jyotirlinga, standing majestically on the shores of the Arabian Sea in Gujarat.',
      price: '₹950 <span>₹1200</span>',
      stars: '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i>'
    },
    Mallikarjuna: {
      image: 'images/Mallikarjuna.jpg',
      description: 'Nestled in the hills of Srisailam, Andhra Pradesh, symbolizing divine unity and eternal love.',
      price: '₹980 <span>₹1250</span>',
      stars: '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i>'
    },
    Mahakaleshwar: {
      image: 'images/Mahakaleshwar.jpg',
      description: 'Located in Ujjain, Madhya Pradesh, a sacred Jyotirlinga where Lord Shiva is worshipped as the eternal timekeeper.',
      price: '₹960 <span>₹1200</span>',
      stars: '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i>'
    },
    Omkareshwar: {
      image: 'images/Omkareshwar.jpg',
      description: 'Located on the sacred island shaped like the Om symbol in Madhya Pradesh.',
      price: '₹920 <span>₹1150</span>',
      stars: '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i>'
    },
    Kedarnath: {
      image: 'images/Kedarnath.jpg',
      description: 'Perched in the Himalayas of Uttarakhand, drawing pilgrims to its serene altitude.',
      price: '₹1500 <span>₹1800</span>',
      stars: '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i>'
    },
    Bhimashankar: {
      image: 'images/Bhimashankar.jpg',
      description: 'Nestled in the Sahyadri hills of Maharashtra, surrounded by lush forests.',
      price: '₹890 <span>₹1100</span>',
      stars: '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i>'
    },
    'Kashi Vishwanath': {
      image: 'images/kashi.jpg',
      description: 'One of the holiest Shiva shrines in the spiritual heart of Varanasi.',
      price: '₹970 <span>₹1200</span>',
      stars: '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i>'
    },
    Trimbakeshwar: {
      image: 'images/Trimbakeshwar.jpg',
      description: 'Near Nashik in Maharashtra, symbolizing the unity of creation, preservation, and destruction.',
      price: '₹900 <span>₹1200</span>',
      stars: '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i>'
    },
    Vaidyanath: {
      image: 'images/Vaidyanath.jpg',
      description: 'In Deoghar, Jharkhand, worshipped as the divine healer.',
      price: '₹990 <span>₹1250</span>',
      stars: '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i>'
    },
    Nageshwar: {
      image: 'images/Nageshwar.jpg',
      description: 'Near Dwarka in Gujarat, symbolizing divine strength and serenity.',
      price: '₹910 <span>₹1100</span>',
      stars: '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i>'
    },
    Rameshwaram: {
      image: 'images/Rameshwaram.jpg',
      description: 'On the serene island of Tamil Nadu, symbolizing devotion and redemption.',
      price: '₹1050 <span>₹1300</span>',
      stars: '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i>'
    },
    Grishneshwar: {
      image: 'images/Grishneshwar.jpg',
      description: 'Near Ellora Caves in Maharashtra, radiating divine grace.',
      price: '₹880 <span>₹1050</span>',
      stars: '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i>'
    }
  };

  const templeData = [
    { id: 'somnath', slug: 'somnath', name: 'Somnath', rating: 4.9, image: 'images/Somnath.jpg', description: 'Sea-facing Jyotirlinga known for its spiritual aura and divine coastal charm.', badge: 'Pilgrimage', packages: { low: { title: 'Low Budget', details: ['Stay: 1 night', 'Meals: simple vegetarian', 'Transport: shared cab'] }, medium: { title: 'Medium Budget', details: ['Stay: 2 nights', 'Meals: standard hotel', 'Transport: private local transfer'] }, high: { title: 'High Budget', details: ['Stay: 2 nights', 'Meals: premium dining', 'Transport: private SUV + guide'] } } },
    { id: 'mallikarjuna', slug: 'mallikarjuna', name: 'Mallikarjuna', rating: 4.8, image: 'images/Mallikarjuna.jpg', description: 'A serene temple in the hills of Srisailam surrounded by divine forest views.', badge: 'Hill Temple', packages: { low: { title: 'Low Budget', details: ['Stay: 1 night', 'Meals: local thali', 'Transport: local bus'] }, medium: { title: 'Medium Budget', details: ['Stay: 2 nights', 'Meals: comfortable meals', 'Transport: private cab'] }, high: { title: 'High Budget', details: ['Stay: 2 nights', 'Meals: premium meals', 'Transport: luxury cab + guide'] } } },
    { id: 'mahakaleshwar', slug: 'mahakaleshwar', name: 'Mahakaleshwar', rating: 5.0, image: 'images/Mahakaleshwar.jpg', description: 'One of the most revered Shiva temples famous for the Bhasma Aarti ritual.', badge: 'Sacred Ritual', packages: { low: { title: 'Low Budget', details: ['Stay: 1 night', 'Meals: simple vegetarian', 'Transport: train + cab'] }, medium: { title: 'Medium Budget', details: ['Stay: 2 nights', 'Meals: hotel dining', 'Transport: private transfer'] }, high: { title: 'High Budget', details: ['Stay: 2 nights', 'Meals: premium dining', 'Transport: private SUV + support'] } } },
    { id: 'omkareshwar', slug: 'omkareshwar', name: 'Omkareshwar', rating: 4.7, image: 'images/Omkareshwar.jpg', description: 'The divine island temple shaped like the sacred Om symbol on the Narmada.', badge: 'River Retreat', packages: { low: { title: 'Low Budget', details: ['Stay: 1 night', 'Meals: local meals', 'Transport: shared ride'] }, medium: { title: 'Medium Budget', details: ['Stay: 2 nights', 'Meals: family dining', 'Transport: private cab'] }, high: { title: 'High Budget', details: ['Stay: 2 nights', 'Meals: deluxe meals', 'Transport: luxury cab + guide'] } } },
    { id: 'kedarnath', slug: 'kedarnath', name: 'Kedarnath', rating: 4.9, image: 'images/Kedarnath.jpg', description: 'High-altitude Himalayan shrine known for its spiritual serenity and breathtaking mountain views.', badge: 'Mountain Pilgrimage', packages: { low: { title: 'Low Budget', details: ['Stay: 1 night', 'Meals: basic vegetarian meals', 'Transport: shared jeep'] }, medium: { title: 'Medium Budget', details: ['Stay: 2 nights', 'Meals: standard meals', 'Transport: private transfer'] }, high: { title: 'High Budget', details: ['Stay: 2 nights', 'Meals: premium dining', 'Transport: luxury cab + guide'] } } },
    { id: 'bhimashankar', slug: 'bhimashankar', name: 'Bhimashankar', rating: 4.8, image: 'images/Bhimashankar.jpg', description: 'A sacred temple in the Sahyadri hills surrounded by dense forest and divine calm.', badge: 'Forest Retreat', packages: { low: { title: 'Low Budget', details: ['Stay: 1 night', 'Meals: simple veg meals', 'Transport: shared cab'] }, medium: { title: 'Medium Budget', details: ['Stay: 2 nights', 'Meals: hotel dining', 'Transport: private cab'] }, high: { title: 'High Budget', details: ['Stay: 2 nights', 'Meals: premium dining', 'Transport: private SUV + guide'] } } },
    { id: 'kashi-vishwanath', slug: 'kashi-vishwanath', name: 'Kashi Vishwanath', rating: 5.0, image: 'images/kashi.jpg', description: 'The holiest Shiva shrine in Varanasi, glowing with devotion and spiritual energy.', badge: 'Spiritual Capital', packages: { low: { title: 'Low Budget', details: ['Stay: 1 night', 'Meals: local meals', 'Transport: local transit'] }, medium: { title: 'Medium Budget', details: ['Stay: 2 nights', 'Meals: hotel breakfast', 'Transport: private local transfer'] }, high: { title: 'High Budget', details: ['Stay: 2 nights', 'Meals: premium dining', 'Transport: private car + guide'] } } },
    { id: 'trimbakeshwar', slug: 'trimbakeshwar', name: 'Trimbakeshwar', rating: 4.7, image: 'images/Trimbakeshwar.jpg', description: 'A revered Jyotirlinga near Nashik, known for its sacred river and divine atmosphere.', badge: 'Sacred River', packages: { low: { title: 'Low Budget', details: ['Stay: 1 night', 'Meals: local meals', 'Transport: shared ride'] }, medium: { title: 'Medium Budget', details: ['Stay: 2 nights', 'Meals: comfortable meals', 'Transport: private cab'] }, high: { title: 'High Budget', details: ['Stay: 2 nights', 'Meals: premium dining', 'Transport: private SUV + guide'] } } },
    { id: 'vaidyanath', slug: 'vaidyanath', name: 'Vaidyanath', rating: 4.8, image: 'images/Vaidyanath.jpg', description: 'Divine healing shrine in Deoghar, known for its spiritual calm and serene surroundings.', badge: 'Healing Shrine', packages: { low: { title: 'Low Budget', details: ['Stay: 1 night', 'Meals: basic meals', 'Transport: local cab'] }, medium: { title: 'Medium Budget', details: ['Stay: 2 nights', 'Meals: standard dining', 'Transport: private transfer'] }, high: { title: 'High Budget', details: ['Stay: 2 nights', 'Meals: premium dining', 'Transport: private car + guide'] } } },
    { id: 'nageshwar', slug: 'nageshwar', name: 'Nageshwar', rating: 4.8, image: 'images/Nageshwar.jpg', description: 'A spiritually powerful temple near Dwarka symbolizing courage, protection, and devotion.', badge: 'Coastal Divine', packages: { low: { title: 'Low Budget', details: ['Stay: 1 night', 'Meals: simple veg meals', 'Transport: shared cab'] }, medium: { title: 'Medium Budget', details: ['Stay: 2 nights', 'Meals: family dining', 'Transport: private cab'] }, high: { title: 'High Budget', details: ['Stay: 2 nights', 'Meals: premium dining', 'Transport: private SUV + guide'] } } },
    { id: 'rameshwaram', slug: 'rameshwaram', name: 'Rameshwaram', rating: 4.9, image: 'images/Rameshwaram.jpg', description: 'A sacred island temple known for its union of devotion, peace, and coastal beauty.', badge: 'Island Blessing', packages: { low: { title: 'Low Budget', details: ['Stay: 1 night', 'Meals: local vegetarian dishes', 'Transport: shared ride'] }, medium: { title: 'Medium Budget', details: ['Stay: 2 nights', 'Meals: standard meals', 'Transport: private transfer'] }, high: { title: 'High Budget', details: ['Stay: 2 nights', 'Meals: premium dining', 'Transport: luxury cab + guide'] } } },
    { id: 'grishneshwar', slug: 'grishneshwar', name: 'Grishneshwar', rating: 4.7, image: 'images/Grishneshwar.jpg', description: 'A revered temple near Ellora known for sacred energy and timeless heritage.', badge: 'Heritage Temple', packages: { low: { title: 'Low Budget', details: ['Stay: 1 night', 'Meals: local food', 'Transport: shared ride'] }, medium: { title: 'Medium Budget', details: ['Stay: 2 nights', 'Meals: family dining', 'Transport: private cab'] }, high: { title: 'High Budget', details: ['Stay: 2 nights', 'Meals: premium dining', 'Transport: private SUV + guide'] } } }
  ];

  const placeSelect = document.getElementById('jyotirlingas');
  const catalogContainer = document.getElementById('catalog-container');
  const catalogImage = document.getElementById('catalog-image');
  const catalogTitle = document.getElementById('catalog-title');
  const catalogDescription = document.getElementById('catalog-description');
  const catalogStars = document.getElementById('catalog-stars');
  const catalogPrice = document.getElementById('catalog-price');
  const catalogQrBtn = document.getElementById('catalog-qr-btn');
  const videoPlayer = document.getElementById('videoPlayer');
  const videoSlider = document.getElementById('video-slider');
  const loginBtn = document.getElementById('login-btn');
  const loginFormContainer = document.querySelector('.login-form-container');
  const formClose = document.getElementById('form-close');
  const tabButtons = document.querySelectorAll('.tab-btn');
  const authForms = document.querySelectorAll('.auth-form');
  const signupToast = document.getElementById('signup-success-toast');
  const menuBar = document.getElementById('menu-bar');
  const navbar = document.querySelector('.navbar');
  const templeGrid = document.getElementById('templeGrid');
  const templeModal = document.getElementById('templeDetailModal');
  const modalImage = document.getElementById('modalImage');
  const modalBadge = document.getElementById('modalBadge');
  const modalTitle = document.getElementById('modalTitle');
  const modalDescription = document.getElementById('modalDescription');
  const packagePanel = document.getElementById('packagePanel');
  const closeTempleModal = document.getElementById('closeTempleModal');

  function displayCatalog(place) {
    if (!place || !catalogData[place]) return;
    if (!catalogContainer || !catalogImage || !catalogTitle || !catalogDescription || !catalogStars || !catalogPrice) return;

    const item = catalogData[place];
    catalogImage.src = item.image;
    catalogTitle.innerHTML = '<i class="fas fa-map-marker-alt"></i> ' + place;
    catalogDescription.textContent = item.description;
    catalogStars.innerHTML = item.stars;
    catalogPrice.innerHTML = item.price;
    catalogContainer.style.display = 'block';
    catalogContainer.classList.add('active');
  }

  function openPlaceVideo(place) {
    const name = (place || '').trim();
    if (!name || !videoPlayer) return;
    const source = videoMap[name] || `videos/${name.replace(/\s+/g, '')}.webm`;
    videoPlayer.src = source;
    videoPlayer.load();
    videoPlayer.style.display = 'block';
    videoPlayer.muted = true;
    videoPlayer.controls = true;
    videoPlayer.play().catch(() => {});
  }

  if (placeSelect) {
    placeSelect.addEventListener('change', (event) => {
      displayCatalog(event.target.value);
    });
  }

  if (catalogQrBtn) {
    catalogQrBtn.addEventListener('click', () => {
      const selected = placeSelect ? placeSelect.value : '';
      if (!selected) {
        alert('⚠️ Please select a place first.');
        return;
      }
      openPlaceVideo(selected);
    });
  }

  document.querySelectorAll('.gallery .btn[data-place]').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      openPlaceVideo(button.dataset.place);
    });
  });

  document.querySelectorAll('.vid-btn').forEach((button) => {
    button.addEventListener('click', () => {
      const active = document.querySelector('.controls .active');
      if (active) active.classList.remove('active');
      button.classList.add('active');
      if (videoSlider) {
        videoSlider.src = button.getAttribute('data-src');
        videoSlider.play().catch(() => {});
      }
    });
  });

  if (loginBtn && loginFormContainer) {
    loginBtn.addEventListener('click', () => {
      loginFormContainer.classList.add('active');
    });
  }

  if (formClose && loginFormContainer) {
    formClose.addEventListener('click', () => {
      loginFormContainer.classList.remove('active');
    });
  }

  tabButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const target = button.dataset.target;
      tabButtons.forEach((btn) => btn.classList.toggle('active', btn === button));
      authForms.forEach((form) => form.classList.toggle('active', form.id === target));
    });
  });

  document.querySelectorAll('#login-form, #signup-form').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (loginFormContainer) loginFormContainer.classList.remove('active');
      if (signupToast) {
        signupToast.classList.add('show');
        setTimeout(() => signupToast.classList.remove('show'), 2000);
      }
    });
  });

  if (menuBar && navbar) {
    menuBar.addEventListener('click', () => {
      menuBar.classList.toggle('fa-times');
      navbar.classList.toggle('active');
    });
  }

  function renderPackage(level, data) {
    if (!packagePanel || !data || !data.packages || !data.packages[level]) return;
    const item = data.packages[level];
    packagePanel.innerHTML = `<h4>${item.title}</h4><ul>${item.details.map((d) => `<li>• ${d}</li>`).join('')}</ul>`;
  }

  function openTempleModal(temple) {
    if (!templeModal || !modalImage || !modalBadge || !modalTitle || !modalDescription) return;
    modalImage.src = temple.image;
    modalBadge.textContent = temple.badge;
    modalTitle.textContent = temple.name;
    modalDescription.textContent = temple.description;
    renderPackage('medium', temple);

    const budgetButtons = document.querySelectorAll('.budget-btn');
    budgetButtons.forEach((button) => {
      const isActive = button.dataset.level === 'medium';
      button.classList.toggle('active', isActive);
      button.onclick = () => {
        budgetButtons.forEach((btn) => btn.classList.toggle('active', btn === button));
        renderPackage(button.dataset.level, temple);
      };
    });

    templeModal.classList.add('open');
    templeModal.setAttribute('aria-hidden', 'false');
  }

  function renderTempleGrid() {
    if (!templeGrid) return;
    templeGrid.innerHTML = templeData.map((temple) => `
      <article class="temple-card">
        <img src="${temple.image}" alt="${temple.name} Temple" />
        <div class="content">
          <div class="head">
            <h3>${temple.name}</h3>
            <span class="rating">★ ${temple.rating.toFixed(1)}</span>
          </div>
          <p>${temple.description}</p>
          <div class="actions">
            <a class="btn explore-btn" href="http://localhost:5175/temple/${temple.slug}">Explore More</a>
          </div>
        </div>
      </article>
    `).join('');
  }

  renderTempleGrid();

  if (closeTempleModal && templeModal) {
    closeTempleModal.addEventListener('click', () => {
      templeModal.classList.remove('open');
      templeModal.setAttribute('aria-hidden', 'true');
    });
  }

  if (templeModal) {
    templeModal.addEventListener('click', (event) => {
      if (event.target === templeModal) {
        templeModal.classList.remove('open');
        templeModal.setAttribute('aria-hidden', 'true');
      }
    });
  }

  if (window.Swiper) {
    new Swiper('.review-slider', {
      spaceBetween: 20,
      loop: true,
      autoplay: { delay: 2500, disableOnInteraction: false },
      breakpoints: { 640: { slidesPerView: 1 }, 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }
    });

    new Swiper('.brand-slider', {
      spaceBetween: 20,
      loop: true,
      autoplay: { delay: 2500, disableOnInteraction: false },
      breakpoints: { 450: { slidesPerView: 2 }, 768: { slidesPerView: 3 }, 991: { slidesPerView: 4 }, 1200: { slidesPerView: 5 } }
    });
  }
})();
