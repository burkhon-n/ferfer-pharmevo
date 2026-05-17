import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Mail, Phone, MapPin, Send, Instagram, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const Footer: React.FC = () => {
  const { language, t } = useLanguage();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navLinks = [
    { key: 'nav.home', href: `/${language}#home` },
    { key: 'nav.about', href: `/${language}#about` },
    { key: 'nav.benefits', href: `/${language}#benefits` },
    { key: 'nav.buy', href: `/${language}#partners` },
    { key: 'nav.faq', href: `/${language}#faq` },
  ];

  const socialLinks = [
    { icon: Instagram, href: 'https://www.instagram.com/meddec.uz?igsh=NXF4eXVvcWNsemRs', label: 'Instagram' },
    { icon: Send, href: '#', label: 'Telegram' },
  ];

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    
    setIsSubmitting(true);
    try {
      // TODO: Connect to Google Sheets via edge function
      await new Promise(resolve => setTimeout(resolve, 500));
      toast({ title: t('footer.subscribe.success') });
      setEmail('');
    } catch {
      toast({ title: 'Error', variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer role="contentinfo" aria-label="Ferfer® — контакты и информация" className="bg-foreground text-background relative overflow-hidden">
      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      <div className="container-main relative z-10 py-16 lg:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <a href="#home" className="inline-flex items-center gap-2 mb-6">
              <span className="text-2xl font-bold text-primary">Ферфер</span>
              <span className="text-2xl font-bold">®</span>
            </a>
            <p className="text-background/70 max-w-md mb-4 leading-relaxed">
              {t('footer.description')}
            </p>
            <p className="text-background/50 text-sm mb-6 italic">
              {t('footer.warning')}
            </p>
            <a
              href={`https://pharmevo.uz/${language}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary text-sm font-medium mb-6 inline-block hover:underline"
            >
              {t('footer.pharmevo')}
            </a>
            
            {/* Social links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-11 h-11 rounded-xl bg-background/10 hover:bg-primary hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-lg font-bold mb-6">{t('footer.quickLinks')}</h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    className="text-background/70 hover:text-background hover:translate-x-1 inline-block transition-all duration-200"
                  >
                    {t(link.key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="text-lg font-bold mb-6">{t('footer.contact')}</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5 text-primary" />
                <span className="text-background/70">{t('footer.address')}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary" />
                <a href="tel:+998942103322" className="text-background/70 hover:text-background transition-colors">
                  +998 94 210 33 22
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary" />
                <a href="mailto:info@meddec.uz" className="text-background/70 hover:text-background transition-colors">
                  info@meddec.uz
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Email Subscription */}
        <div className="mt-12 pt-8 border-t border-background/10">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="text-lg font-bold mb-4">{t('footer.subscribe.title')}</h3>
            <form onSubmit={handleSubscribe} className="flex gap-2 mb-3">
              <Input
                type="email"
                id="footer-email"
                aria-label="Email address"
                placeholder={t('footer.subscribe.placeholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-background/10 border-background/20 text-background placeholder:text-background/50 focus:border-primary"
                required
              />
              <Button type="submit" disabled={isSubmitting} className="bg-primary hover:bg-primary/90 text-primary-foreground whitespace-nowrap gap-2">
                {t('footer.subscribe.button')}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </form>
            <p className="text-background/40 text-xs">
              {t('footer.subscribe.disclaimer')}
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-8 border-t border-background/10">
          <div className="flex flex-col md:flex-row justify-center items-center gap-4">
            <p className="text-background/60 text-sm">
              © {new Date().getFullYear()} {t('footer.rights')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
