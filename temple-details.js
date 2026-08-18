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

const params = new URLSearchParams(window.location.search);
const slug = params.get('temple');
const temple = templeData.find((item) => item.slug === slug) || templeData[0];

const detailImage = document.getElementById('detailImage');
const detailBadge = document.getElementById('detailBadge');
const detailTitle = document.getElementById('detailTitle');
const detailDescription = document.getElementById('detailDescription');
const detailPackagePanel = document.getElementById('detailPackagePanel');

function renderPackage(level) {
  const item = temple.packages[level];
  detailPackagePanel.innerHTML = `<h4>${item.title}</h4><ul>${item.details.map((entry) => `<li>• ${entry}</li>`).join('')}</ul>`;
}

function applyTemple() {
  detailImage.src = temple.image;
  detailImage.alt = temple.name;
  detailBadge.textContent = temple.badge;
  detailTitle.textContent = temple.name;
  detailDescription.textContent = temple.description;
  renderPackage('medium');

  document.querySelectorAll('.budget-btn').forEach((button) => {
    const isActive = button.dataset.level === 'medium';
    button.classList.toggle('active', isActive);
    button.onclick = () => {
      document.querySelectorAll('.budget-btn').forEach((btn) => btn.classList.toggle('active', btn === button));
      renderPackage(button.dataset.level);
    };
  });
}

applyTemple();
