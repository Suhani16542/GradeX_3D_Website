import React from 'react';
import { Link } from 'react-router-dom';
import { brandConfig } from '../../data/brandConfig';
import { footerNavigation } from '../../data/navigationData';
import { Container } from '../ui/Container';
import { Mail, Phone, MapPin, Shield, Clock, ArrowRight } from 'lucide-react';

/**
 * Footer component with confirmed Western Australia business credentials and solutions
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#050D1A] border-t border-slate-800 text-slate-300">
      {/* Top CTA Banner */}
      <div className="border-b border-slate-800/80 bg-gradient-to-r from-[#0A192F] via-[#0E2442] to-[#0A192F] py-10">
        <Container className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20 mb-2 inline-block">
              Western Australia Commercial Service
            </span>
            <h3 className="text-2xl font-bold text-white mb-1">
              Ready to elevate your commercial kitchen compliance?
            </h3>
            <p className="text-sm text-slate-300">
              Speak directly with our Perth commercial kitchen hygiene and robotic duct specialists.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={brandConfig.contact.phoneHref}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm border border-slate-700 transition"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>{brandConfig.contact.phone}</span>
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm transition shadow-lg shadow-amber-500/20"
            >
              <span>Get a Commercial Quote</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </Container>
      </div>

      {/* Main Footer Directory */}
      <div className="py-14 sm:py-16">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
            {/* Brand column */}
            <div className="lg:col-span-2 space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center font-black text-slate-950 text-lg">
                  GX
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-white tracking-tight">
                    {brandConfig.companyName}
                  </span>
                  <span className="text-[10px] uppercase tracking-widest text-slate-400">
                    WA Commercial Cleaning & Robotic Hygiene
                  </span>
                </div>
              </div>

              <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
                Advanced commercial cleaning, robotic kitchen exhaust cleaning, and verified digital evidence reporting for commercial kitchens, hospitality venues, and facilities across Western Australia.
              </p>

              <div className="space-y-2.5 text-xs text-slate-300 pt-2">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>{brandConfig.contact.address.fullAddress}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                  <a href={brandConfig.contact.phoneHref} className="text-white hover:text-amber-300 font-semibold transition">
                    {brandConfig.contact.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                  <a href={brandConfig.contact.emailHref} className="hover:text-amber-300 transition">
                    {brandConfig.contact.email}
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{brandConfig.contact.operatingHours}</span>
                </div>
                <div className="flex items-center gap-2.5 pt-1 text-slate-400 text-[11px]">
                  <Shield className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span>ABN: {brandConfig.abn}</span>
                </div>
              </div>
            </div>

            {/* Solutions Links */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4 border-b border-amber-400/30 pb-2 inline-block">
                Hygiene Solutions
              </h4>
              <ul className="space-y-2.5 text-xs">
                <li><Link to="/services" className="text-slate-400 hover:text-amber-300 transition">Robotic Exhaust Cleaning</Link></li>
                <li><Link to="/services" className="text-slate-400 hover:text-amber-300 transition">Kitchen Exhaust Degreasing</Link></li>
                <li><Link to="/services" className="text-slate-400 hover:text-amber-300 transition">Canopy & Filter Exchange</Link></li>
                <li><Link to="/services" className="text-slate-400 hover:text-amber-300 transition">Equipment Deep Hygiene</Link></li>
                <li><Link to="/services" className="text-slate-400 hover:text-amber-300 transition">Grill & Fryer Boil-Outs</Link></li>
                <li><Link to="/services" className="text-slate-400 hover:text-amber-300 transition">Floor Scrubbing & Degreasing</Link></li>
              </ul>
            </div>

            {/* Technology & Compliance Links */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4 border-b border-amber-400/30 pb-2 inline-block">
                Technology & WHS
              </h4>
              <ul className="space-y-2.5 text-xs">
                {footerNavigation.company.map((item) => (
                  <li key={item.name}>
                    <Link to={item.path} className="text-slate-400 hover:text-amber-300 transition">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal & Inquiries */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4 border-b border-amber-400/30 pb-2 inline-block">
                Direct Contact
              </h4>
              <p className="text-xs text-slate-400 mb-3 leading-relaxed">
                Direct enquiries for Perth and Western Australian commercial operators:
              </p>
              <a
                href={brandConfig.contact.emailHref}
                className="inline-block text-xs font-mono text-amber-300 hover:underline mb-4"
              >
                {brandConfig.contact.email}
              </a>
              <ul className="space-y-2 text-xs">
                {footerNavigation.legal.map((item) => (
                  <li key={item.name}>
                    <Link to={item.path} className="text-slate-400 hover:text-amber-300 transition">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800/80 py-5 bg-[#030812] text-xs text-slate-400">
        <Container className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {currentYear} {brandConfig.companyName}. Western Australia. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="hover:text-slate-200 transition">Privacy Policy</Link>
            <Link to="/terms-conditions" className="hover:text-slate-200 transition">Terms & Conditions</Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}
