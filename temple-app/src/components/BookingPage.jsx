import { motion } from 'framer-motion';
import { useMemo, useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import temples from '../data/temples';

const packageMap = {
  low: { label: 'Low Budget', type: 'Low', price: 999 },
  medium: { label: 'Medium Budget', type: 'Medium', price: 1699 },
  high: { label: 'Premium', type: 'Premium', price: 2500 },
};

const addonOptions = [
  { id: 'vipDarshan', label: 'VIP Darshan', price: 1200 },
  { id: 'travelInsurance', label: 'Travel Insurance', price: 550 },
  { id: 'extraNightStay', label: 'Extra Night Stay', price: 1800 },
  { id: 'airportPickup', label: 'Airport Pickup', price: 900 },
  { id: 'localSightseeing', label: 'Local Sightseeing', price: 1100 },
  { id: 'specialPuja', label: 'Special Puja', price: 1500 },
  { id: 'mealUpgrade', label: 'Meal Upgrade', price: 700 },
];

const paymentOptions = ['UPI', 'Credit Card', 'Debit Card', 'Net Banking', 'Wallet', 'EMI'];
const departureCityOptions = ['Delhi', 'Mumbai', 'Jaipur', 'Ahmedabad', 'Varanasi', 'Hyderabad', 'Bengaluru'];
const pickupPointOptions = ['Railway Station', 'Bus Station', 'Airport', 'Hotel', 'Other'];
const trustPoints = [
  'Secure Payment',
  'Instant Confirmation',
  'Best Price Guarantee',
  '24×7 Customer Support',
  'Trusted by 10,000+ Travelers',
];

const blankTraveller = () => ({
  fullName: '',
  gender: '',
  dob: '',
  age: '',
  idNumber: '',
  idType: 'Aadhaar',
  emergencyName: '',
  emergencyContact: '',
});

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const isValidPhone = (phone) => /^\d{10}$/.test(phone);
const isValidAadhaar = (value) => /^\d{12}$/.test(value) || /^[A-Z0-9]{8,20}$/.test(value);

const getTodayISO = () => {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return now.toISOString().split('T')[0];
};

const addDaysToDate = (dateString, days) => {
  const date = new Date(dateString);
  date.setDate(date.getDate() + days);
  return date.toISOString().split('T')[0];
};

const formatCurrency = (value) => `₹${Math.round(value).toLocaleString('en-IN')}`;

const createDownload = (filename, content, type = 'text/plain') => {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
};

export default function BookingPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const temple = useMemo(
    () => temples.find((item) => item.slug === slug) || temples[0],
    [slug],
  );

  const selectedBudget = location.state?.selectedBudget || 'low';
  const currentPackage = packageMap[selectedBudget] || packageMap.low;

  const today = getTodayISO();

  const [form, setForm] = useState({
    fullName: '',
    mobile: '',
    email: '',
    whatsapp: '',
    adults: 2,
    children: 0,
    infants: 0,
    departureCity: '',
    pickupPoint: '',
    preferredDate: today,
    returnDate: addDaysToDate(today, 2),
    specialRequests: '',
    wheelchair: false,
    hotelType: 'Double Room',
    paymentMethod: 'UPI',
    couponCode: '',
    termsAccepted: false,
  });

  const [travellers, setTravellers] = useState(() =>
    Array.from({ length: 2 }, () => blankTraveller()),
  );
  const [addOns, setAddOns] = useState({});
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [bookingId, setBookingId] = useState('');
  const [isBooked, setIsBooked] = useState(false);
  const [couponMessage, setCouponMessage] = useState('');
  const [validationMessage, setValidationMessage] = useState('');

  const totalTravellers = form.adults + form.children + form.infants;
  const minReturnDate = form.preferredDate ? addDaysToDate(form.preferredDate, 2) : '';

  useEffect(() => {
    setTravellers((prev) => {
      const next = Array.from({ length: totalTravellers }, (_, index) => prev[index] || blankTraveller());
      return next.slice(0, totalTravellers);
    });
  }, [totalTravellers]);

  useEffect(() => {
    if (!form.preferredDate) return;

    const earliestReturnDate = addDaysToDate(form.preferredDate, 2);
    if (form.returnDate !== earliestReturnDate) {
      setForm((prev) => ({ ...prev, returnDate: earliestReturnDate }));
    }
  }, [form.preferredDate]);

  const selectedAddOns = useMemo(
    () => addonOptions.filter((option) => addOns[option.id]),
    [addOns],
  );

  const addOnTotal = useMemo(
    () => selectedAddOns.reduce((sum, item) => sum + item.price, 0),
    [selectedAddOns],
  );

  const packageTotal = currentPackage.price * totalTravellers;
  const gst = (packageTotal + addOnTotal) * 0.05;
  const subtotal = packageTotal + addOnTotal + gst;
  const grandTotal = Math.max(subtotal - couponDiscount, 0);

  const requiredTravellerFields = ['fullName', 'gender', 'dob', 'age', 'idNumber', 'emergencyName', 'emergencyContact'];

  const isFormValid = useMemo(() => {
    if (!form.fullName.trim() || !form.mobile.trim() || !form.email.trim() || !form.departureCity.trim() || !form.pickupPoint.trim() || !form.preferredDate || !form.returnDate || !form.termsAccepted) {
      return false;
    }

    const travellerValid = travellers.every((traveller) => {
      if (!traveller.fullName.trim() || !traveller.gender || !traveller.dob || !traveller.age || !traveller.idNumber || !traveller.emergencyName.trim() || !traveller.emergencyContact.trim()) {
        return false;
      }
      return true;
    });

    return travellerValid;
  }, [form, travellers]);

  const progressSteps = ['Package', 'Traveller Details', 'Payment', 'Confirmation'];

  const handleIncrement = (field) => {
    setForm((prev) => ({ ...prev, [field]: Math.max(0, Number(prev[field]) + 1) }));
  };

  const handleDecrement = (field) => {
    setForm((prev) => ({ ...prev, [field]: Math.max(0, Number(prev[field]) - 1) }));
  };

  const handleAddonChange = (id) => {
    setAddOns((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const applyCoupon = () => {
    const code = form.couponCode.trim().toUpperCase();
    if (!code) {
      setCouponMessage('Enter a coupon code');
      setCouponDiscount(0);
      return;
    }

    if (code === 'SAVE10') {
      const discount = Math.round((packageTotal + addOnTotal) * 0.1);
      setCouponDiscount(discount);
      setCouponMessage('Coupon applied');
      return;
    }

    setCouponMessage('Invalid coupon code');
    setCouponDiscount(0);
  };

  const handleProceed = () => {
    if (!isFormValid) {
      setValidationMessage('Please fill correct information');
      const firstInvalid = document.querySelector('[data-invalid="true"]') || document.getElementById('travel-details-section');
      if (firstInvalid) {
        firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setValidationMessage('');
    setBookingId(`TRV-${Date.now().toString().slice(-8)}`);
    setIsBooked(true);
  };

  const downloadTicket = () => {
    const content = `Booking ID: ${bookingId}\nTemple: ${temple.name}\nPackage: ${currentPackage.label}\nTraveller Count: ${totalTravellers}\nAmount: ${formatCurrency(grandTotal)}`;
    createDownload('ticket.pdf', content, 'application/pdf');
  };

  const downloadInvoice = () => {
    const content = `Invoice for ${temple.name}\nBooking ID: ${bookingId}\nGrand Total: ${formatCurrency(grandTotal)}`;
    createDownload('invoice.pdf', content, 'application/pdf');
  };

  const shareOnWhatsApp = () => {
    const text = encodeURIComponent(`Booking confirmed for ${temple.name}. Booking ID: ${bookingId}. Total: ${formatCurrency(grandTotal)}`);
    window.open(`https://wa.me/?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  const handleTravellerChange = (index, field, value) => {
    setTravellers((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const getFieldValidationState = (condition) => (condition ? 'true' : 'false');

  const summaryCard = (
    <div className="rounded-[24px] border border-slate-200 bg-white/80 p-4 shadow-[0_18px_40px_rgba(15,23,42,0.06)] backdrop-blur-sm">
      <div className="mb-4 overflow-hidden rounded-[18px] border border-slate-200">
        <img src={temple.heroImage} alt={temple.name} className="h-40 w-full object-cover" />
      </div>
      <div className="space-y-3 text-sm text-slate-600">
        <div className="flex items-center justify-between">
          <span className="text-slate-500">Destination</span>
          <span className="font-bold text-slate-900">{temple.name}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-500">Package</span>
          <span className="font-bold text-slate-900">{currentPackage.label}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-500">Type</span>
          <span className="font-bold text-slate-900">{currentPackage.type}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-500">Travel Date</span>
          <span className="font-bold text-slate-900">{form.preferredDate}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-500">Duration</span>
          <span className="font-bold text-slate-900">{form.returnDate ? '3 Nights / 4 Days' : '1 Day'}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-500">Pickup City</span>
          <span className="font-bold text-slate-900">{form.departureCity || 'Delhi'}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-500">Price / person</span>
          <span className="font-bold text-slate-900">{formatCurrency(currentPackage.price)}</span>
        </div>
        <div className="flex items-center justify-between border-t pt-3">
          <span className="text-slate-500">Total Price</span>
          <span className="text-xl font-black text-slate-900">{formatCurrency(packageTotal)}</span>
        </div>
      </div>
    </div>
  );

  if (isBooked) {
    return (
      <div className="min-h-screen bg-[#fffaf3] px-4 py-10">
        <div className="mx-auto max-w-5xl rounded-[30px] bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,0.08)] ring-1 ring-slate-200 md:p-10">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#f59e0b]">Booking Confirmed</p>
              <h1 className="mt-2 text-3xl font-black text-slate-900">Secure Payment Successful</h1>
            </div>
            <div className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-bold text-emerald-700">Confirmed</div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-5">
              <div className="rounded-[24px] border border-slate-200 bg-[#f8fafc] p-5">
                <div className="mb-3 text-sm font-medium text-slate-500">Booking ID</div>
                <div className="text-2xl font-black text-slate-900">{bookingId}</div>
              </div>

              <div className="rounded-[24px] border border-slate-200 bg-white p-5">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xl font-extrabold text-slate-900">Trip Summary</h2>
                  <span className="rounded-full bg-[#fef3c7] px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-[#a16207]">{currentPackage.type}</span>
                </div>
                <div className="space-y-3 text-sm text-slate-600">
                  <div className="flex justify-between"><span>Temple</span><strong className="text-slate-900">{temple.name}</strong></div>
                  <div className="flex justify-between"><span>Package</span><strong className="text-slate-900">{currentPackage.label}</strong></div>
                  <div className="flex justify-between"><span>Travel Date</span><strong className="text-slate-900">{form.preferredDate}</strong></div>
                  <div className="flex justify-between"><span>Guests</span><strong className="text-slate-900">{totalTravellers}</strong></div>
                  <div className="flex justify-between"><span>Total Amount</span><strong className="text-slate-900">{formatCurrency(grandTotal)}</strong></div>
                </div>
              </div>
            </div>

            <div className="rounded-[24px] border border-slate-200 bg-[#f8fafc] p-6 text-center">
              <div className="mx-auto mb-4 flex h-40 w-40 items-center justify-center rounded-2xl bg-white shadow-inner ring-1 ring-slate-200">
                <div className="text-center text-[10px] font-black uppercase tracking-[0.2em] text-slate-700">
                  <div className="mb-2 rounded-lg border border-slate-200 px-2 py-1">QR</div>
                  <div>{bookingId}</div>
                </div>
              </div>
              <div className="grid gap-3">
                <button type="button" onClick={downloadTicket} className="rounded-full bg-[#f59e0b] px-4 py-3 text-sm font-bold text-white">Download Ticket PDF</button>
                <button type="button" onClick={downloadInvoice} className="rounded-full border border-slate-300 bg-white px-4 py-3 text-sm font-bold text-slate-800">Download Invoice</button>
                <button type="button" onClick={shareOnWhatsApp} className="rounded-full border border-emerald-300 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700">WhatsApp Ticket</button>
                <button type="button" onClick={() => window.location.href = `mailto:${form.email}?subject=Booking%20Confirmation&body=Your%20booking%20for%20${temple.name}%20is%20confirmed.%20Booking%20ID%20${bookingId}` } className="rounded-full border border-blue-300 bg-blue-50 px-4 py-3 text-sm font-bold text-blue-700">Email Confirmation</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fffaf3] text-slate-800">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm hover:bg-slate-50"
          >
            ← Back
          </button>
          <div className="text-sm font-bold uppercase tracking-[0.2em] text-[#f59e0b]">Booking Details</div>
        </div>

        <div className="mb-8 overflow-hidden rounded-[24px] bg-white p-4 shadow-[0_18px_50px_rgba(15,23,42,0.06)] ring-1 ring-slate-200 md:p-5">
          <div className="grid gap-3 md:grid-cols-4">
            {progressSteps.map((step, index) => (
              <div key={step} className="flex items-center gap-3">
                <div className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-black ${index < 2 ? 'bg-[#f59e0b] text-white' : index === 2 ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-500'}`}>
                  {index + 1}
                </div>
                <span className={`text-sm font-bold ${index < 2 ? 'text-slate-900' : 'text-slate-500'}`}>{step}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-8 xl:grid-cols-[1.6fr_0.9fr]">
          <div className="space-y-6">
            {validationMessage && (
              <div className="rounded-[18px] border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                {validationMessage}
              </div>
            )}

            <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-[0_16px_40px_rgba(15,23,42,0.05)] md:p-7">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-2xl font-extrabold text-slate-900">Tour Summary</h2>
                <span className="rounded-full bg-[#fef3c7] px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-[#a16207]">{currentPackage.type}</span>
              </div>

              <div className="grid gap-5 md:grid-cols-[220px_1fr]">
                <img src={temple.heroImage} alt={temple.name} className="h-48 w-full rounded-[18px] object-cover md:h-full" />
                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-medium text-slate-500">Destination</div>
                    <div className="mt-1 text-3xl font-black text-slate-900">{temple.name}</div>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-[16px] bg-slate-50 p-3">
                      <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Package</div>
                      <div className="mt-1 font-bold text-slate-900">{currentPackage.label}</div>
                    </div>
                    <div className="rounded-[16px] bg-slate-50 p-3">
                      <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Travel Date</div>
                      <div className="mt-1 font-bold text-slate-900">{form.preferredDate}</div>
                    </div>
                    <div className="rounded-[16px] bg-slate-50 p-3">
                      <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Duration</div>
                      <div className="mt-1 font-bold text-slate-900">3 Nights / 4 Days</div>
                    </div>
                    <div className="rounded-[16px] bg-slate-50 p-3">
                      <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Pickup City</div>
                      <div className="mt-1 font-bold text-slate-900">{form.departureCity || 'Delhi'}</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-[0_16px_40px_rgba(15,23,42,0.05)] md:p-7">
              <h2 className="mb-5 text-2xl font-extrabold text-slate-900">Contact Information</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-700">Full Name</span>
                  <input value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none ring-0 transition focus:border-[#f59e0b]" placeholder="Enter full name" />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-700">Mobile Number</span>
                  <input value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value })} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-[#f59e0b]" placeholder="10-digit mobile" />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-700">Email Address</span>
                  <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-[#f59e0b]" placeholder="you@example.com" />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-700">WhatsApp Number (Optional)</span>
                  <input value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-[#f59e0b]" placeholder="Optional" />
                </label>
              </div>
            </motion.section>

            <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-[0_16px_40px_rgba(15,23,42,0.05)] md:p-7">
              <h2 className="mb-5 text-2xl font-extrabold text-slate-900">Traveller Details</h2>
              <div className="grid gap-4 md:grid-cols-3">
                {[
                  ['Adults', 'adults'],
                  ['Children', 'children'],
                  ['Infants', 'infants'],
                ].map(([label, field]) => (
                  <div key={field} className="rounded-[18px] border border-slate-200 bg-slate-50 p-4">
                    <div className="mb-3 text-sm font-semibold text-slate-600">{label}</div>
                    <div className="flex items-center justify-between">
                      <button type="button" onClick={() => handleDecrement(field)} className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl font-bold text-slate-700 shadow-sm">−</button>
                      <span className="text-2xl font-black text-slate-900">{form[field]}</span>
                      <button type="button" onClick={() => handleIncrement(field)} className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl font-bold text-slate-700 shadow-sm">+</button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-[18px] bg-[#fff8ec] p-4 font-bold text-[#a16207]">
                Total Travellers: {totalTravellers}
              </div>

              <div className="mt-6 space-y-5">
                {travellers.map((traveller, index) => (
                  <div key={`traveller-${index}`} className="rounded-[22px] border border-slate-200 bg-slate-50 p-4">
                    <div className="mb-4 text-lg font-extrabold text-slate-900">Traveller {index + 1}</div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <label className="block">
                        <span className="mb-2 block text-sm font-semibold text-slate-700">Full Name</span>
                        <input value={traveller.fullName} onChange={(e) => handleTravellerChange(index, 'fullName', e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3" />
                      </label>
                      <label className="block">
                        <span className="mb-2 block text-sm font-semibold text-slate-700">Gender</span>
                        <select value={traveller.gender} onChange={(e) => handleTravellerChange(index, 'gender', e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3">
                          <option value="">Select</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </label>
                      <label className="block">
                        <span className="mb-2 block text-sm font-semibold text-slate-700">Date of Birth</span>
                        <input type="date" value={traveller.dob} onChange={(e) => handleTravellerChange(index, 'dob', e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3" />
                      </label>
                      <label className="block">
                        <span className="mb-2 block text-sm font-semibold text-slate-700">Age</span>
                        <input type="number" min="0" value={traveller.age} onChange={(e) => handleTravellerChange(index, 'age', e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3" />
                      </label>
                      <label className="block md:col-span-2">
                        <span className="mb-2 block text-sm font-semibold text-slate-700">Aadhaar Number / Passport Number</span>
                        <input value={traveller.idNumber} onChange={(e) => handleTravellerChange(index, 'idNumber', e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3" />
                      </label>
                      <label className="block">
                        <span className="mb-2 block text-sm font-semibold text-slate-700">ID Proof Type</span>
                        <select value={traveller.idType} onChange={(e) => handleTravellerChange(index, 'idType', e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3">
                          <option value="Aadhaar">Aadhaar</option>
                          <option value="Passport">Passport</option>
                          <option value="Driving License">Driving License</option>
                        </select>
                      </label>
                      <label className="block">
                        <span className="mb-2 block text-sm font-semibold text-slate-700">Emergency Contact Name</span>
                        <input value={traveller.emergencyName} onChange={(e) => handleTravellerChange(index, 'emergencyName', e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3" />
                      </label>
                      <label className="block md:col-span-2">
                        <span className="mb-2 block text-sm font-semibold text-slate-700">Emergency Contact Number</span>
                        <input value={traveller.emergencyContact} onChange={(e) => handleTravellerChange(index, 'emergencyContact', e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3" />
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>

            <motion.section id="travel-details-section" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-[0_16px_40px_rgba(15,23,42,0.05)] md:p-7">
              <h2 className="mb-5 text-2xl font-extrabold text-slate-900">Travel Details</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="block" data-invalid={getFieldValidationState(!form.departureCity)}>
                  <span className="mb-2 block text-sm font-semibold text-slate-700">Departure City</span>
                  <select
                    value={form.departureCity}
                    onChange={(e) => setForm({ ...form, departureCity: e.target.value })}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
                  >
                    <option value="">Select city</option>
                    {departureCityOptions.map((city) => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </label>
                <label className="block" data-invalid={getFieldValidationState(!form.pickupPoint)}>
                  <span className="mb-2 block text-sm font-semibold text-slate-700">Pickup Point</span>
                  <select
                    value={form.pickupPoint}
                    onChange={(e) => setForm({ ...form, pickupPoint: e.target.value })}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
                  >
                    <option value="">Select pickup point</option>
                    {pickupPointOptions.map((point) => (
                      <option key={point} value={point}>{point}</option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-700">Preferred Travel Date</span>
                  <input
                    type="date"
                    min={today}
                    value={form.preferredDate}
                    onChange={(e) => setForm({ ...form, preferredDate: e.target.value })}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-700">Return Date</span>
                  <input
                    type="date"
                    value={form.returnDate}
                    min={minReturnDate}
                    readOnly
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-500"
                  />
                </label>
                <label className="block md:col-span-2">
                  <span className="mb-2 block text-sm font-semibold text-slate-700">Special Requests</span>
                  <textarea value={form.specialRequests} onChange={(e) => setForm({ ...form, specialRequests: e.target.value })} rows="4" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3" placeholder="Optional request" />
                </label>
                <label className="mt-2 flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 md:col-span-2">
                  <input type="checkbox" checked={form.wheelchair} onChange={(e) => setForm({ ...form, wheelchair: e.target.checked })} className="h-4 w-4 accent-[#f59e0b]" />
                  <span className="text-sm font-semibold text-slate-700">Wheelchair Requirement</span>
                </label>
              </div>
            </motion.section>

            <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-[0_16px_40px_rgba(15,23,42,0.05)] md:p-7">
              <h2 className="mb-5 text-2xl font-extrabold text-slate-900">Hotel Preferences</h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {['Single Room', 'Double Room', 'Triple Sharing', 'Extra Bed'].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setForm((prev) => ({ ...prev, hotelType: option }))}
                    className={`rounded-[18px] border px-4 py-3 text-sm font-bold transition ${form.hotelType === option ? 'border-[#f59e0b] bg-[#fff8ec] text-[#a16207]' : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300'}`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </motion.section>

            <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-[0_16px_40px_rgba(15,23,42,0.05)] md:p-7">
              <h2 className="mb-5 text-2xl font-extrabold text-slate-900">Optional Add-ons</h2>
              <div className="grid gap-3 md:grid-cols-2">
                {addonOptions.map((option) => (
                  <label key={option.id} className="flex cursor-pointer items-center justify-between rounded-[18px] border border-slate-200 bg-slate-50 px-4 py-3">
                    <span className="flex items-center gap-3">
                      <input type="checkbox" checked={!!addOns[option.id]} onChange={() => handleAddonChange(option.id)} className="h-4 w-4 accent-[#f59e0b]" />
                      <span className="font-semibold text-slate-700">{option.label}</span>
                    </span>
                    <span className="font-black text-slate-900">{formatCurrency(option.price)}</span>
                  </label>
                ))}
              </div>
            </motion.section>

            <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-[0_16px_40px_rgba(15,23,42,0.05)] md:p-7">
              <h2 className="mb-5 text-2xl font-extrabold text-slate-900">Coupon Code</h2>
              <div className="flex flex-col gap-3 sm:flex-row">
                <input value={form.couponCode} onChange={(e) => setForm({ ...form, couponCode: e.target.value })} className="flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3" placeholder="Enter coupon code" />
                <button type="button" onClick={applyCoupon} className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-bold text-white">Apply</button>
              </div>
              {couponMessage && <div className={`mt-3 text-sm font-medium ${couponMessage === 'Coupon applied' ? 'text-emerald-600' : 'text-red-600'}`}>{couponMessage}</div>}
            </motion.section>

            <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-[0_16px_40px_rgba(15,23,42,0.05)] md:p-7">
              <h2 className="mb-5 text-2xl font-extrabold text-slate-900">Payment Method</h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {paymentOptions.map((method) => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setForm((prev) => ({ ...prev, paymentMethod: method }))}
                    className={`rounded-[18px] border px-4 py-3 text-sm font-bold transition ${form.paymentMethod === method ? 'border-[#f59e0b] bg-[#fff8ec] text-[#a16207]' : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300'}`}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </motion.section>

            <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-[0_16px_40px_rgba(15,23,42,0.05)] md:p-7">
              <h2 className="mb-5 text-2xl font-extrabold text-slate-900">Terms & Conditions</h2>
              <label className="flex items-start gap-3 rounded-[18px] border border-slate-200 bg-slate-50 p-4">
                <input type="checkbox" checked={form.termsAccepted} onChange={(e) => setForm({ ...form, termsAccepted: e.target.checked })} className="mt-1 h-4 w-4 accent-[#f59e0b]" />
                <span className="text-sm text-slate-700">I agree to the Terms & Conditions and Cancellation Policy.</span>
              </label>
            </motion.section>
          </div>

          <aside className="xl:sticky xl:top-6 xl:self-start">
            <div className="space-y-5">
              {summaryCard}

              <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
                <div className="mb-4 text-lg font-extrabold text-slate-900">Price Summary</div>
                <div className="space-y-3 text-sm text-slate-600">
                  <div className="flex justify-between"><span>Package Price</span><strong className="text-slate-900">{formatCurrency(packageTotal)}</strong></div>
                  <div className="flex justify-between"><span>Add-ons</span><strong className="text-slate-900">{formatCurrency(addOnTotal)}</strong></div>
                  <div className="flex justify-between"><span>GST</span><strong className="text-slate-900">{formatCurrency(gst)}</strong></div>
                  <div className="flex justify-between"><span>Discount</span><strong className="text-slate-900">-{formatCurrency(couponDiscount)}</strong></div>
                  <div className="flex justify-between border-t border-slate-200 pt-3 text-base font-black text-slate-900"><span>Grand Total</span><span>{formatCurrency(grandTotal)}</span></div>
                </div>
              </div>

            </div>
          </aside>
        </div>
      </div>

      <div className="sticky bottom-0 z-30 border-t border-slate-200 bg-white/90 px-4 py-4 backdrop-blur-md shadow-[0_-8px_24px_rgba(15,23,42,0.06)]">
        <div className="mx-auto max-w-7xl">
          <button
            type="button"
            onClick={handleProceed}
            className="w-full rounded-full bg-[#f59e0b] px-6 py-4 text-lg font-black text-white shadow-[0_10px_30px_rgba(245,158,11,0.35)] transition hover:-translate-y-0.5 active:scale-[0.99]"
          >
            Proceed to Secure Payment
          </button>
        </div>
      </div>
    </div>
  );
}
