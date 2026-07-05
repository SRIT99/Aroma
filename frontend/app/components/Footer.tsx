import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-secondary text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">Aroma</h3>
            <p className="text-white/80 text-sm">
              The finest dining destination in Gauradaha, Jhapa. Serving authentic cuisine since day one.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="#menu" className="hover:text-white transition-colors">Menu</Link></li>
              <li><Link href="#leaderboard" className="hover:text-white transition-colors">Leaderboard</Link></li>
              <li><Link href="#contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-semibold mb-4">Hours</h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li>Mon - Fri: 10 AM - 10 PM</li>
              <li>Sat - Sun: 10 AM - 11 PM</li>
              <li>Holidays: 11 AM - 9 PM</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li>📞 +977-98XXXXXX</li>
              <li>📧 info@aroma.com</li>
              <li>📍 Gauradaha, Jhapa</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/70 text-sm">
              © {currentYear} Aroma Restaurant. All rights reserved.
            </p>
            <div className="flex gap-4 text-sm text-white/70">
              <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
