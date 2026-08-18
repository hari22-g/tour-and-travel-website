import { Link } from 'react-router-dom';
import temples from '../data/temples';

export default function TempleListPage() {
  return (
    <div className="min-h-screen bg-[#fffaf3] px-4 py-10 text-slate-800 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#f59e0b]">Pilgrimage journeys</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
            Discover Sacred Temples
          </h1>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {temples.map((temple) => (
            <div
              key={temple.id}
              className="group overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_15px_40px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_22px_50px_rgba(15,23,42,0.12)]"
            >
              <div className="relative">
                <img
                  src={temple.heroImage}
                  alt={temple.name}
                  className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-2 text-sm font-bold text-slate-800 shadow-md backdrop-blur-sm">
                  <span className="text-[#f59e0b]">★</span>
                  {temple.rating.toFixed(1)}
                </div>
              </div>

              <div className="p-5">
                <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">{temple.name}</h2>

                <div className="mt-6 flex items-center justify-end gap-3">
                  <Link
                    to={`/temple/${temple.slug}`}
                    className="inline-flex items-center justify-center rounded-full bg-[#f59e0b] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-[#f59e0b]/25 transition hover:-translate-y-0.5 hover:bg-[#e08a00]"
                  >
                    Explore More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
