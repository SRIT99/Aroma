import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaTiktok } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-[var(--line)] bg-[var(--bg)] text-[var(--ink)]">
      <div className="container-custom relative py-16">
        {/* Giant wordmark */}
        <h2 className="mb-16 select-none font-display text-[18vw] italic leading-none text-[var(--ink)]/[0.04] sm:text-[10vw]">
          Aroma
        </h2>

        <div className="mb-12 grid grid-cols-1 gap-10 md:grid-cols-4">
          <div>
            <h3 className="mb-4 font-display text-2xl font-semibold italic">Aroma</h3>
            <p className="text-sm text-[var(--smoke)]">
              A live-fire kitchen in Gauradaha, Jhapa. Serving smoke, char and authentic flavor since
              day one.
            </p>
            <div className="mt-5 flex gap-3">
              {[FaFacebookF, FaInstagram, FaTiktok].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] transition-colors hover:border-[var(--ember)] hover:text-[var(--ember-light)]"
                  data-cursor="hover"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-[var(--gold)]">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-[var(--smoke)]">
              <li><Link href="/" className="transition-colors hover:text-[var(--ink)]">Home</Link></li>
              <li><Link href="#menu" className="transition-colors hover:text-[var(--ink)]">Menu</Link></li>
              <li><Link href="#leaderboard" className="transition-colors hover:text-[var(--ink)]">Leaderboard</Link></li>
              <li><Link href="#contact" className="transition-colors hover:text-[var(--ink)]">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-[var(--gold)]">Hours</h4>
            <ul className="space-y-2 text-sm text-[var(--smoke)]">
              <li>Mon – Fri: 10 AM – 10 PM</li>
              <li>Sat – Sun: 10 AM – 11 PM</li>
              <li>Holidays: 11 AM – 9 PM</li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-[var(--gold)]">Contact</h4>
            <ul className="space-y-2 text-sm text-[var(--smoke)]">
              <li>+977-98XXXXXX</li>
              <li>info@aroma.com</li>
              <li>Gauradaha, Jhapa</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-[var(--line)] pt-8 sm:flex-row">
          <p className="text-sm text-[var(--smoke)]">
            © {currentYear} Aroma Restaurant. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-[var(--smoke)]">
            <Link href="#" className="transition-colors hover:text-[var(--ink)]">Privacy Policy</Link>
            <Link href="#" className="transition-colors hover:text-[var(--ink)]">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
