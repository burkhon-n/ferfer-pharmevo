import React, { useState, useEffect } from 'react';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import { Menu, X } from 'lucide-react';
import pharmevoLogo from '@/assets/pharmevo.png';

const Header: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { key: 'nav.home', href: `/${language}#home` },
    { key: 'nav.about', href: `/${language}#about` },
    { key: 'nav.benefits', href: `/${language}#benefits` },
    { key: 'nav.buy', href: `/${language}#partners` },
    { key: 'nav.faq', href: `/${language}#faq` },
  ];

  const languages: { code: Language; label: string }[] = [
    { code: 'uz', label: 'UZ' },
    { code: 'ru', label: 'RU' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-background/95 backdrop-blur-md border-b border-border/30' 
        : 'bg-background/95 backdrop-blur-md border-b border-border/30 md:bg-transparent md:backdrop-blur-none md:border-transparent'
    }`}>
      <div className="container-main">
        <div className={`flex items-center justify-between transition-all duration-300 h-16 ${
          isScrolled ? 'md:h-20' : 'md:h-28'
        }`}>
          {/* Logo */}
          <a href={`https://pharmevo.uz/${language}`} target="_blank" rel="noopener noreferrer" aria-label="PharmEvo" className="flex items-center ">
            <img 
              src={pharmevoLogo} 
              alt="PharmEvo" 
              className={`transition-all duration-300 w-auto h-20  ${
                isScrolled ? '' : 'lg:h-40 lg:py-4 lg:px-6 xl:h-48 xl:py-6 xl:px-8'
              }`}
            />
          </a>

          {/* Desktop Navigation */}
          <nav aria-label="Main navigation" className="hidden md:flex items-center gap-4 lg:gap-8">
            {navItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium text-xs md:text-sm whitespace-nowrap"
              >
                {t(item.key)}
              </a>
            ))}
          </nav>

          {/* Language Switcher */}
          <div className="flex items-center gap-1">
            {languages.map((lang, index) => (
              <React.Fragment key={lang.code}>
                <button
                  onClick={() => setLanguage(lang.code)}
                  className={`px-2 py-1 text-sm font-medium transition-colors duration-200 ${
                    language === lang.code
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {lang.label}
                </button>
                {index < languages.length - 1 && (
                  <span className="text-border">|</span>
                )}
              </React.Fragment>
            ))}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
              className="md:hidden p-2 ml-2 rounded-lg hover:bg-secondary transition-colors"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav id="mobile-navigation" aria-label="Mobile navigation" className="md:hidden py-4 border-t border-border/30 animate-fade-in">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-3 rounded-lg text-muted-foreground hover:text-primary hover:bg-secondary transition-colors duration-200 font-medium"
                >
                  {t(item.key)}
                </a>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
