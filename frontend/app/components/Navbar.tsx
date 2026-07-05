'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#today-special', label: 'Today Special' },
    { href: '#menu', label: 'Menu' },
    { href: '#leaderboard', label: 'Leaderboard' },
    { href: '#contact', label: 'Contact Us' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container-custom">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="font-serif text-2xl font-bold text-primary">
            Aroma
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-foreground transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </div>
          {/* Auth Buttons */}
          <div className="hidden items-center gap-4 md:flex">
            <Link
              href="/login"
              className="rounded-lg border border-primary px-4 py-2 text-primary transition-colors hover:bg-primary hover:text-white"
            >
              Login
            </Link>
            <Link href="/register" className="btn-primary">
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="flex flex-col gap-1 md:hidden">
            <span
              className={`h-0.5 w-6 bg-foreground transition-transform ${isOpen ? 'translate-y-2 rotate-45' : ''}`}
            ></span>
            <span
              className={`h-0.5 w-6 bg-foreground transition-opacity ${isOpen ? 'opacity-0' : ''}`}
            ></span>
            <span
              className={`h-0.5 w-6 bg-foreground transition-transform ${isOpen ? '-translate-y-2 -rotate-45' : ''}`}
            ></span>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="space-y-2 pb-4 md:hidden">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block rounded-lg px-4 py-2 text-foreground transition-colors hover:bg-primary hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex gap-2 pt-2">
              <Link
                href="/login"
                className="flex-1 rounded-lg border border-primary px-4 py-2 text-center text-sm text-primary transition-colors hover:bg-primary hover:text-white"
              >
                Login
              </Link>
              <Link href="/register" className="btn-primary flex-1 px-4 py-2 text-center text-sm">
                Sign Up
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
