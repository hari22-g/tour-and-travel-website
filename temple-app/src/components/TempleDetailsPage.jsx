import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import temples from '../data/temples';

const formatPrice = (value) => value || '₹0';

const budgetPackages = [
  {
    id: 'low',
    label: 'Low Budget',
    accent: 'bg-emerald-500 text-white',
    image: '/images/low budget/hotel.jpg',
    price: '₹999 per person / 1 day',
    includes: ['Bus', 'Hotel', 'Lunch', 'Dinner'],
    notIncluded: ['VIP Darshan', 'Private Cab', 'Luxury Upgrade'],
    quickNote: 'Affordable one-day spiritual trip',
    actions: ['View Itinerary', 'Book Now'],
    serviceItems: [
      { label: 'Bus', photos: ['/images/low budget/bus.jpg', '/images/low budget/bus 2.jpg'] },
      { label: 'Dinner', photos: ['/images/low budget/dinner.jpg', '/images/low budget/dinner 2.jpg'] },
      { label: 'Lunch', photos: ['/images/low budget/launch.jpg', '/images/low budget/launch 2.jpg'] },
      { label: 'Hotel', photos: ['/images/low budget/hotel.jpg', '/images/low budget/hotel 2.jpg'] },
    ],
  },
  {
    id: 'medium',
    label: 'Medium Budget',
    accent: 'bg-amber-400 text-slate-900',
    image: '/images/MEDIUM BUDGET/HOTEL.jpg',
    price: '₹1699 per person / 1 day',
    includes: ['Comfort Bus', 'Hotel', 'Lunch', 'Dinner'],
    notIncluded: ['VIP Darshan', 'Private Vehicle', 'Luxury Suite'],
    quickNote: 'Comfortable and balanced pilgrimage package',
    actions: ['Compare Package', 'Book Now'],
    serviceItems: [
      { label: 'Bus', photos: ['/images/MEDIUM BUDGET/bus.jpg', '/images/MEDIUM BUDGET/bus 2.jpg'] },
      { label: 'Dinner', photos: ['/images/MEDIUM BUDGET/dinner.jpg', '/images/MEDIUM BUDGET/dinner 2.jpg'] },
      { label: 'Lunch', photos: ['/images/MEDIUM BUDGET/launch.jpg', '/images/MEDIUM BUDGET/launch 2.jpg'] },
      { label: 'Hotel', photos: ['/images/MEDIUM BUDGET/HOTEL.jpg', '/images/MEDIUM BUDGET/hotel 2.jpg'] },
    ],
  },
  {
    id: 'high',
    label: 'High Budget',
    accent: 'bg-red-500 text-white',
    image: '/images/high budget/hotel.jpg',
    price: '₹2500 per person / 1 day',
    includes: ['Premium Bus', 'Luxury Hotel', 'Lunch', 'Dinner'],
    notIncluded: ['No major extra charges included'],
    quickNote: 'Premium experience with complete comfort',
    actions: ['Book Premium', 'Contact Expert'],
    serviceItems: [
      { label: 'Bus', photos: ['/images/high budget/bus.jpg', '/images/high budget/bus 2.jpg'] },
      { label: 'Dinner', photos: ['/images/high budget/dinner.jpg', '/images/high budget/dinnner 2.jpg'] },
      { label: 'Lunch', photos: ['/images/high budget/launch.jpg', '/images/high budget/launch 2.jpg'] },
      { label: 'Hotel', photos: ['/images/high budget/hotel.jpg', '/images/high budget/hotel 2.jpg'] },
    ],
  },
];

const getCurrentUser = () => {
  try {
    const stored = JSON.parse(localStorage.getItem('travel-current-user'));
    return stored || { name: 'Guest User', email: 'guest@example.com', wishlist: [] };
  } catch (error) {
    return { name: 'Guest User', email: 'guest@example.com', wishlist: [] };
  }
};

export default function TempleDetailsPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [selectedBudget, setSelectedBudget] = useState('low');
  const [wishlistStatus, setWishlistStatus] = useState('');

  useEffect(() => {
    if (!wishlistStatus) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setWishlistStatus('');
    }, 2000);

    return () => window.clearTimeout(timer);
  }, [wishlistStatus]);

  const temple = useMemo(
    () => temples.find((item) => item.slug === slug) || temples[0],
    [slug],
  );

  const user = useMemo(() => getCurrentUser(), [slug]);

  if (!temple) {
    return (
      <div className="min-h-screen bg-[#fffaf3] p-8 text-center text-slate-700">
        Temple not found.
      </div>
    );
  }

  const activePackage = budgetPackages.find((option) => option.id === selectedBudget) || budgetPackages[0];

  const handleWishlist = () => {
    const currentUser = getCurrentUser();
    const savedList = Array.isArray(currentUser.wishlist) ? currentUser.wishlist : [];
    const item = `${temple.name} (${currentUser.name || 'Guest User'})`;
    const nextWishlist = [item, ...savedList.filter((entry) => entry !== item)];

    const updatedUser = {
      ...currentUser,
      wishlist: nextWishlist,
    };

    localStorage.setItem('travel-current-user', JSON.stringify(updatedUser));
    setWishlistStatus('Added successfully');
  };

  return (
    <div className="min-h-screen bg-[#fffaf3] text-slate-800">
      <div className="mx-auto max-w-7xl px-4 pb-28 pt-6 sm:px-6 lg:px-8">
        <div className="mb-5 flex items-center justify-start">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-800 shadow-[0_8px_22px_rgba(15,23,42,0.08)] ring-1 ring-slate-200 transition hover:-translate-y-0.5"
          >
            <span aria-hidden="true">←</span>
            Back
          </button>
        </div>

        <header className="mb-8 overflow-hidden rounded-[32px] bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)] ring-1 ring-slate-200/80">
          <div
            className="relative h-[420px] w-full overflow-hidden bg-slate-300 bg-cover bg-center sm:h-[500px]"
            style={{
              backgroundImage: `linear-gradient(90deg, rgba(22, 28, 36, 0.68) 0%, rgba(54, 58, 64, 0.38) 32%, rgba(148, 163, 184, 0.18) 100%), url(${temple.heroImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/65 via-slate-900/10 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-slate-800 shadow-md">
                  <span className="text-[#f59e0b]">★</span>
                  {temple.rating.toFixed(1)}
                </span>
              </div>
              <div className="mt-4 max-w-xl">
                <h1 className="text-4xl font-black tracking-tight text-white sm:text-6xl">
                  {temple.name}
                </h1>
                <div className="mt-3 flex items-center gap-2 text-base font-medium text-slate-100 sm:text-xl">
                  <span>📍</span>
                  <span>{temple.location}</span>
                </div>
                <p className="mt-4 max-w-lg text-sm text-slate-100 sm:text-base">
                  {temple.shortDescription}
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => navigate(`/booking/${slug}`, { state: { selectedBudget } })}
                  className="rounded-full bg-[#f59e0b] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#f59e0b]/30 transition hover:-translate-y-0.5 hover:bg-[#e08a00]"
                >
                  Book Now
                </button>
                <button
                  type="button"
                  onClick={handleWishlist}
                  className="rounded-full border border-white/80 bg-white/10 px-6 py-3 text-sm font-bold text-white backdrop-blur-md transition hover:bg-white/20"
                >
                  Add to Wishlist
                </button>
              </div>

              {wishlistStatus && (
                <div className="mt-4 rounded-2xl border border-white/30 bg-white/10 px-4 py-3 text-sm text-white/95 backdrop-blur-sm">
                  {wishlistStatus}
                </div>
              )}
            </div>
          </div>
        </header>

        <section className="mb-10 rounded-[28px] bg-white p-5 shadow-[0_15px_40px_rgba(15,23,42,0.06)] ring-1 ring-slate-200/80 sm:p-8">
          <div className="mb-5 flex items-center justify-between gap-3">
            <h2 className="text-2xl font-extrabold text-slate-800 sm:text-3xl">Image Gallery</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            {temple.gallery.map((image, index) => (
              <div
                key={image}
                className="group overflow-hidden rounded-[24px] border border-slate-200 bg-slate-100 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <img
                  src={image}
                  alt={`${temple.name} gallery ${index + 1}`}
                  className="h-40 w-full object-cover transition duration-300 group-hover:scale-105 md:h-52"
                />
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10 grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="rounded-[28px] bg-white p-6 shadow-[0_15px_40px_rgba(15,23,42,0.06)] ring-1 ring-slate-200/80 sm:p-8">
            <h2 className="mb-4 text-2xl font-extrabold text-slate-800 sm:text-3xl">About Temple</h2>
            <p className="mb-6 text-base leading-8 text-slate-600">{temple.description}</p>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="rounded-2xl bg-[#fff8ec] p-4 ring-1 ring-[#f7d9a2]">
                <h3 className="mb-2 text-lg font-bold text-[#a56200]">History</h3>
                <p className="text-sm leading-7 text-slate-600">{temple.history}</p>
              </div>
              <div className="rounded-2xl bg-[#fff8ec] p-4 ring-1 ring-[#f7d9a2]">
                <h3 className="mb-2 text-lg font-bold text-[#a56200]">Religious Significance</h3>
                <p className="text-sm leading-7 text-slate-600">{temple.significance}</p>
              </div>
              <div className="rounded-2xl bg-[#fff8ec] p-4 ring-1 ring-[#f7d9a2]">
                <h3 className="mb-2 text-lg font-bold text-[#a56200]">Architecture</h3>
                <p className="text-sm leading-7 text-slate-600">{temple.architecture}</p>
              </div>
              <div className="rounded-2xl bg-[#fff8ec] p-4 ring-1 ring-[#f7d9a2]">
                <h3 className="mb-2 text-lg font-bold text-[#a56200]">Interesting Facts</h3>
                <ul className="space-y-2 text-sm leading-7 text-slate-600">
                  {temple.facts.map((fact) => (
                    <li key={fact}>• {fact}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] bg-white p-6 shadow-[0_15px_40px_rgba(15,23,42,0.06)] ring-1 ring-slate-200/80 sm:p-8">
            <h2 className="mb-5 text-2xl font-extrabold text-slate-800">Temple Information</h2>
            <div className="space-y-4 text-sm">
              <div className="flex items-center justify-between gap-3 border-b border-slate-200 pb-3">
                <span className="text-slate-500">Opening Time</span>
                <strong className="font-bold text-slate-800">{temple.info.openingTime}</strong>
              </div>
              <div className="flex items-center justify-between gap-3 border-b border-slate-200 pb-3">
                <span className="text-slate-500">Closing Time</span>
                <strong className="font-bold text-slate-800">{temple.info.closingTime}</strong>
              </div>
              <div className="flex items-center justify-between gap-3 border-b border-slate-200 pb-3">
                <span className="text-slate-500">Aarti Timings</span>
                <strong className="font-bold text-slate-800">{temple.info.aartiTimings}</strong>
              </div>
              <div className="flex items-center justify-between gap-3 border-b border-slate-200 pb-3">
                <span className="text-slate-500">Best Time</span>
                <strong className="font-bold text-slate-800">{temple.info.bestTime}</strong>
              </div>
              <div className="flex items-center justify-between gap-3 border-b border-slate-200 pb-3">
                <span className="text-slate-500">Entry Fee</span>
                <strong className="font-bold text-slate-800">{temple.info.entryFee}</strong>
              </div>
              <div className="flex items-center justify-between gap-3 pb-2">
                <span className="text-slate-500">Dress Code</span>
                <strong className="font-bold text-slate-800 text-right">{temple.info.dressCode}</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-10 rounded-[28px] bg-white p-6 shadow-[0_15px_40px_rgba(15,23,42,0.06)] ring-1 ring-slate-200/80 sm:p-8">
          <h2 className="mb-6 text-2xl font-extrabold text-slate-800 sm:text-3xl">Package Details</h2>

          <div className="mb-6 flex flex-wrap gap-3">
            {budgetPackages.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setSelectedBudget(option.id)}
                className={`flex items-center gap-3 rounded-full px-3 py-2 text-sm font-bold transition ${
                  selectedBudget === option.id
                    ? option.accent
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <img
                  src={option.image}
                  alt={option.label}
                  className="h-10 w-10 rounded-full object-cover ring-2 ring-white/80"
                />
                {option.label}
              </button>
            ))}
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-[#fff7ed] p-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] ${activePackage.accent}`}>
                {activePackage.label}
              </span>
              <span className="text-sm font-medium text-slate-500">{activePackage.quickNote}</span>
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="text-sm font-medium text-slate-500">Price</div>
                <div className="text-3xl font-black text-slate-900">{activePackage.price}</div>
              </div>
              <div className="rounded-full bg-[#fef3c7] px-4 py-2 text-sm font-semibold text-[#a16207]">
                {activePackage.label === 'Low Budget' ? 'Best for pilgrims' : activePackage.label === 'Medium Budget' ? 'Balanced travel comfort' : 'Luxury spiritual trip'}
              </div>
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <div>
                <h3 className="mb-3 text-lg font-extrabold text-slate-800">Includes</h3>
                <ul className="space-y-2 text-sm text-slate-600">
                  {activePackage.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1 text-emerald-500">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-3 text-lg font-extrabold text-slate-800">{activePackage.id === 'low' ? 'Not Included' : activePackage.id === 'medium' ? 'Extra Benefits' : 'Premium Benefits'}</h3>
                <ul className="space-y-2 text-sm text-slate-600">
                  {activePackage.notIncluded.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1 text-[#f59e0b]">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {activePackage.serviceItems.map((service) => (
                <div key={service.label} className="rounded-[22px] border border-slate-200 bg-white p-3 shadow-sm">
                  <div className="mb-3 flex items-center justify-between">
                    <h4 className="text-base font-extrabold text-slate-800">{service.label}</h4>
                    <span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                      2 photos
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {service.photos.map((photo, photoIndex) => (
                      <img
                        key={`${service.label}-${photoIndex}`}
                        src={photo}
                        alt={`${activePackage.label} ${service.label} ${photoIndex + 1}`}
                        className="h-28 w-full rounded-xl object-cover"
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        <section className="mb-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-[28px] bg-white p-6 shadow-[0_15px_40px_rgba(15,23,42,0.06)] ring-1 ring-slate-200/80 sm:p-8">
            <h2 className="mb-6 text-2xl font-extrabold text-slate-800 sm:text-3xl">Itinerary</h2>
            <div className="space-y-5">
              <div>
                <h3 className="mb-3 text-lg font-extrabold text-[#a56200]">Day 1</h3>
                <ul className="space-y-2 text-sm text-slate-600">
                  {temple.itinerary.day1.map((item) => (
                    <li key={item} className="flex gap-2"><span>•</span><span>{item}</span></li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="mb-3 text-lg font-extrabold text-[#a56200]">Day 2</h3>
                <ul className="space-y-2 text-sm text-slate-600">
                  {temple.itinerary.day2.map((item) => (
                    <li key={item} className="flex gap-2"><span>•</span><span>{item}</span></li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] bg-white p-6 shadow-[0_15px_40px_rgba(15,23,42,0.06)] ring-1 ring-slate-200/80 sm:p-8">
            <h2 className="mb-6 text-2xl font-extrabold text-slate-800 sm:text-3xl">Facilities</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {temple.facilities.map((facility) => (
                <div key={facility} className="flex items-center gap-3 rounded-2xl bg-[#f8fafc] px-4 py-3 ring-1 ring-slate-200 text-sm font-semibold text-slate-700">
                  <span className="text-[#22c55e]">✓</span>
                  <span>{facility}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-10 rounded-[28px] bg-white p-6 shadow-[0_15px_40px_rgba(15,23,42,0.06)] ring-1 ring-slate-200/80 sm:p-8">
          <h2 className="mb-6 text-2xl font-extrabold text-slate-800 sm:text-3xl">Location & Map</h2>
          <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-slate-100">
              <iframe
                title={`${temple.name} map`}
                src={temple.map.embedUrl}
                className="h-[300px] w-full border-0"
                allowFullScreen
                loading="lazy"
              />
            </div>
            <div className="space-y-4">
              <div className="rounded-2xl bg-[#fff8ec] p-4 ring-1 ring-[#f7d9a2]">
                <div className="text-sm text-slate-500">Distance from Airport</div>
                <div className="mt-1 text-xl font-extrabold text-slate-800">{temple.map.airport}</div>
              </div>
              <div className="rounded-2xl bg-[#fff8ec] p-4 ring-1 ring-[#f7d9a2]">
                <div className="text-sm text-slate-500">Distance from Railway Station</div>
                <div className="mt-1 text-xl font-extrabold text-slate-800">{temple.map.railway}</div>
              </div>
              <div className="rounded-2xl bg-[#fff8ec] p-4 ring-1 ring-[#f7d9a2]">
                <div className="text-sm text-slate-500">Distance from Bus Stand</div>
                <div className="mt-1 text-xl font-extrabold text-slate-800">{temple.map.busStand}</div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-10 rounded-[28px] bg-white p-6 shadow-[0_15px_40px_rgba(15,23,42,0.06)] ring-1 ring-slate-200/80 sm:p-8">
          <h2 className="mb-6 text-2xl font-extrabold text-slate-800 sm:text-3xl">Reviews</h2>
          <div className="mb-6 flex items-center gap-2 text-2xl font-black text-slate-800">
            <span className="text-[#f59e0b]">★</span>
            <span>{temple.rating.toFixed(1)}</span>
            <span className="text-base font-semibold text-slate-500">Average Rating</span>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {temple.reviews.map((review) => (
              <div key={review.name} className="rounded-[24px] border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center gap-3">
                  <img src={review.photo} alt={review.name} className="h-12 w-12 rounded-full object-cover" />
                  <div>
                    <div className="font-bold text-slate-800">{review.name}</div>
                    <div className="text-[#f59e0b]">★★★★★</div>
                  </div>
                </div>
                <p className="mt-3 text-sm leading-7 text-slate-600">{review.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10 rounded-[28px] bg-white p-6 shadow-[0_15px_40px_rgba(15,23,42,0.06)] ring-1 ring-slate-200/80 sm:p-8">
          <h2 className="mb-6 text-2xl font-extrabold text-slate-800 sm:text-3xl">FAQ</h2>
          <div className="space-y-3">
            {temple.faq.map((item) => (
              <div key={item.q} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="font-bold text-slate-800">Q: {item.q}</div>
                <div className="mt-2 text-sm leading-7 text-slate-600">A: {item.a}</div>
              </div>
            ))}
          </div>
        </section>
      </div>

    </div>
  );
}
