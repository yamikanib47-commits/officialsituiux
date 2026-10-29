import React, { useState } from 'react';
import { AutoaceLogo } from './AutoaceLogo';
import { Menu, X, User, CircleDot, Tag, Sparkles, ChevronRight, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  onNavigateToHome?: () => void;
  onNavigateToBuy?: () => void;
  onNavigateToSell?: () => void;
  onNavigateToShowroom?: () => void;
  onNavigateToAdmin?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onNavigateToHome,
  onNavigateToBuy,
  onNavigateToSell,
  onNavigateToShowroom,
  onNavigateToAdmin,
}) => {

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'New', href: '#new', onClick: onNavigateToBuy },
    { label: 'Used', href: '#used', onClick: onNavigateToBuy },
    { label: 'Just Listed', href: '/showroom', onClick: onNavigateToShowroom },
    { label: 'Sell', href: '#sell', onClick: onNavigateToSell },
    { label: 'Leasing', href: '#leasing' },
    { label: 'Vans', href: '#vans' },
    { label: 'News', href: '#news' },
    { label: 'Reviews', href: '#reviews' },
  ];

  return (
    <>
      {/* Top Header Bar */}
      <header className="bg-[#111111] text-white sticky top-0 z-50 border-b border-neutral-800">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-18">
            {/* Left: Brand & Primary Desktop Nav */}
            <div className="flex items-center gap-8">
              <a
                href="/"
                onClick={(e) => {
                  if (onNavigateToHome) {
                    e.preventDefault();
                    onNavigateToHome();
                  }
                }}
                className="flex items-center hover:opacity-90 transition-opacity cursor-pointer py-1"
                title="Autoace Home"
              >
                <AutoaceLogo className="w-[150px] h-[150px] object-contain" variant="dark-mode" style={{ width: '150px', height: '150px', objectFit: 'contain' }} />
              </a>

              {/* Desktop Nav Links */}
              <nav className="hidden lg:flex items-center space-x-6 text-[14px] font-medium text-neutral-300">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => {
                      if (link.onClick) {
                        e.preventDefault();
                        link.onClick();
                      }
                    }}
                    className="hover:text-white transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[2px] after:bg-[#8574ff] after:transition-all cursor-pointer"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>

            {/* Right: Action Utilities */}
            <div className="flex items-center space-x-4 sm:space-x-6">
              {/* Buying Action */}
              <button
                type="button"
                onClick={onNavigateToBuy}
                className="flex flex-col items-center justify-center text-neutral-300 hover:text-white group px-2 py-1 transition-colors cursor-pointer"
                title="Buying options (/buyacar)"
              >
                <CircleDot className="w-5 h-5 group-hover:scale-110 transition-transform text-neutral-300 group-hover:text-white" />
                <span className="text-[11px] font-semibold tracking-wide mt-0.5">Buying</span>
              </button>

              {/* Selling Action */}
              <button
                type="button"
                onClick={onNavigateToSell}
                className="flex flex-col items-center justify-center text-neutral-300 hover:text-white group px-2 py-1 transition-colors cursor-pointer"
                title="Sell your car (/sellacar)"
              >
                <Tag className="w-5 h-5 group-hover:scale-110 transition-transform text-neutral-300 group-hover:text-white" />
                <span className="text-[11px] font-semibold tracking-wide mt-0.5">Selling</span>
              </button>

              {/* Showroom / Just Listed (visible on mobile / tablet) */}
              <button
                type="button"
                onClick={onNavigateToShowroom}
                className="flex md:hidden flex-col items-center justify-center text-neutral-300 hover:text-white group px-2 py-1 transition-colors cursor-pointer"
                title="Showroom Deals"
              >
                <Sparkles className="w-5 h-5 group-hover:scale-110 transition-transform text-[#8574ff]" />
                <span className="text-[11px] font-semibold tracking-wide mt-0.5">Showroom</span>
              </button>

              {/* Log In */}
              <button
                type="button"
                className="flex flex-col items-center justify-center text-neutral-300 hover:text-white group px-2 py-1 transition-colors"
                title="Log In"
              >
                <User className="w-5 h-5 group-hover:scale-110 transition-transform text-neutral-300 group-hover:text-white" />
                <span className="text-[11px] font-semibold tracking-wide mt-0.5">Log In</span>
              </button>

              {/* Admin Portal */}
              {onNavigateToAdmin && (
                <button
                  type="button"
                  onClick={onNavigateToAdmin}
                  className="flex flex-col items-center justify-center text-neutral-300 hover:text-[#8574ff] group px-2 py-1 transition-colors cursor-pointer"
                  title="Admin Dashboard (Analytics, CMS, CRM)"
                >
                  <ShieldCheck className="w-5 h-5 group-hover:scale-110 transition-transform text-neutral-300 group-hover:text-[#8574ff]" />
                  <span className="text-[11px] font-semibold tracking-wide mt-0.5">Admin</span>
                </button>
              )}

              {/* Menu Hamburger */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="flex flex-col items-center justify-center text-neutral-300 hover:text-white group px-2 py-1 transition-colors"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5 text-white" />
                ) : (
                  <Menu className="w-5 h-5 group-hover:scale-110 transition-transform text-neutral-300 group-hover:text-white" />
                )}
                <span className="text-[11px] font-semibold tracking-wide mt-0.5">Menu</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#181818] border-b border-neutral-800 px-4 pt-3 pb-6 animate-in fade-in slide-in-from-top-2 duration-150">
            <div className="grid grid-cols-2 gap-2 mb-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    if (link.onClick) {
                      e.preventDefault();
                      link.onClick();
                    }
                  }}
                  className="flex items-center justify-between p-3 rounded-lg bg-neutral-900/60 hover:bg-neutral-800 text-sm font-medium text-white cursor-pointer"
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-neutral-500" />
                </a>
              ))}
            </div>

            <div className="border-t border-neutral-800 pt-4 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onNavigateToShowroom) onNavigateToShowroom();
                }}
                className="w-full text-center py-2.5 px-4 bg-[#8574ff] hover:bg-[#7360f2] text-neutral-950 font-black rounded-lg text-sm transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-neutral-950" />
                <span>Open Showroom (87,521 Deals)</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onNavigateToSell) onNavigateToSell();
                }}
                className="w-full text-center py-2.5 px-4 bg-white/10 hover:bg-white/15 text-white font-medium rounded-lg text-sm transition-colors cursor-pointer"
              >
                Sell my car
              </button>
              {onNavigateToAdmin && (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigateToAdmin();
                  }}
                  className="w-full text-center py-2.5 px-4 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 font-semibold rounded-lg text-sm transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4 text-[#8574ff]" />
                  <span>Admin Dashboard (Analytics, CMS, CRM)</span>
                </button>
              )}
            </div>
          </div>
        )}

      </header>
    </>
  );
};
