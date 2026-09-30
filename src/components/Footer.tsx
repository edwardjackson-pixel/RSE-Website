import Link from "next/link";
import { NAV_LINKS, OFFICES, PHONE, EMAIL, SITE_NAME } from "@/lib/constants";
import SiteLogo from "@/components/SiteLogo";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-stone-400" role="contentinfo">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block">
              <SiteLogo height={40} tone="light" />
            </Link>
            <p className="mt-4 text-sm leading-relaxed max-w-xs">
              Structural engineering for architecture that has to perform beautifully. Offices in Boston, New York, and Los Angeles.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs font-medium uppercase tracking-[0.15em] text-stone-500 mb-4">
              Navigation
            </h3>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="footer-link text-sm text-stone-400 hover:text-white transition-colors duration-200 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Offices */}
          <div>
            <h3 className="text-xs font-medium uppercase tracking-[0.15em] text-stone-500 mb-4">
              Offices
            </h3>
            <ul className="space-y-4">
              {OFFICES.map((office) => (
                <li key={office.label} className="text-sm leading-relaxed">
                  <span className="text-white text-xs font-medium uppercase tracking-wide">
                    {office.label}
                  </span>
                  <br />
                  {office.address}
                  <br />
                  {office.cityState}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-medium uppercase tracking-[0.15em] text-stone-500 mb-4">
              Contact
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href={`tel:${PHONE.replace(/[^+\d]/g, "")}`} className="footer-link hover:text-white transition-colors duration-200 inline-block">
                  {PHONE}
                </a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`} className="footer-link hover:text-white transition-colors duration-200 inline-block">
                  {EMAIL}
                </a>
              </li>
              <li className="pt-2">
                <a
                  href="https://www.linkedin.com/company/rse-associates"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link inline-flex items-center gap-2 text-sm hover:text-white transition-colors duration-200"
                  aria-label="RSE Associates on LinkedIn"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-stone-600">
            &copy; {currentYear} {SITE_NAME}. All rights reserved.
          </p>
          <p className="text-xs text-stone-600">
            Certified Minority Business Enterprise (MBE)
          </p>
        </div>
      </div>
    </footer>
  );
}
