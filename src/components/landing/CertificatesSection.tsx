import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { FileText, Award, Shield } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import gmpCertificate from '@/assets/certificates/gmp-certificate.jpg';
import ruxsatnoma from '@/assets/certificates/ruxsatnoma.jpg';
import sanitaryCertificate from '@/assets/certificates/sanitary-certificate.jpg';
import halalCert from '@/assets/certificates/halal-cert.png';
import gmpBadge from '@/assets/certificates/gmp-badge.png';
import isoBadge from '@/assets/certificates/iso-badge.png';

const CertificatesSection: React.FC = () => {
  const { t } = useLanguage();
  const [selectedCertificate, setSelectedCertificate] = useState<string | null>(null);

  const certificates = [
    {
      icon: Award,
      titleKey: 'certificates.cert1.title',
      descKey: 'certificates.cert1.desc',
      image: gmpCertificate,
    },
    {
      icon: Shield,
      titleKey: 'certificates.cert2.title',
      descKey: 'certificates.cert2.desc',
      image: ruxsatnoma,
    },
    {
      icon: FileText,
      titleKey: 'certificates.cert3.title',
      descKey: 'certificates.cert3.desc',
      image: sanitaryCertificate,
    },
  ];

  const handleViewCertificate = (image: string) => {
    setSelectedCertificate(image);
  };

  const handleCloseModal = () => {
    setSelectedCertificate(null);
  };

  // Prevent right-click context menu on the certificate viewer
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    return false;
  };

  return (
    <section id="certificates" aria-label="Сертификаты качества Ferfer®" className="section-padding bg-secondary/30">
      <div className="container-main">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('certificates.title')}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base mb-8">
            {t('certificates.subtitle')}
          </p>
          
          {/* Trust Badges */}
          <div className="flex items-center justify-center gap-6 sm:gap-10 md:gap-14 flex-wrap">
            {/* GMP Badge */}
            <div className="flex flex-col items-center gap-2 group">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-card border-2 border-border/50 flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:border-primary/30 transition-all duration-300 overflow-hidden p-1">
                <img src={gmpBadge} alt="GMP Quality Certification" className="w-full h-full object-contain" />
              </div>
              <span className="text-xs sm:text-sm font-medium text-muted-foreground">GMP</span>
            </div>

            {/* ISO Badge */}
            <div className="flex flex-col items-center gap-2 group">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-card border-2 border-border/50 flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:border-primary/30 transition-all duration-300 overflow-hidden p-2">
                <img src={isoBadge} alt="ISO Certification" className="w-full h-full object-contain" />
              </div>
              <span className="text-xs sm:text-sm font-medium text-muted-foreground">ISO</span>
            </div>

            {/* Halal Badge */}
            <div className="flex flex-col items-center gap-2 group">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-card border-2 border-border/50 flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:border-primary/30 transition-all duration-300 overflow-hidden p-1">
                <img src={halalCert} alt="Halal Certified" className="w-full h-full object-contain" />
              </div>
              <span className="text-xs sm:text-sm font-medium text-muted-foreground">Halal</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {certificates.map((cert, index) => {
            const Icon = cert.icon;
            return (
              <div
                key={index}
                className="bg-card rounded-2xl p-6 sm:p-8 shadow-md hover:shadow-lg transition-all duration-300 border border-border/30 flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2 sm:mb-3">
                  {t(cert.titleKey)}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t(cert.descKey)}
                </p>
                <button 
                  onClick={() => handleViewCertificate(cert.image)}
                  className="mt-4 sm:mt-6 text-primary font-medium text-sm hover:underline flex items-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  {t('certificates.view')}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Certificate Preview Modal */}
      <Dialog open={!!selectedCertificate} onOpenChange={handleCloseModal}>
        <DialogContent 
          className="max-w-4xl w-[95vw] h-[85vh] p-0 overflow-hidden"
          onContextMenu={handleContextMenu}
        >
          <DialogHeader className="p-4 pb-0">
            <DialogTitle className="text-lg font-semibold">
              {t('certificates.title')}
            </DialogTitle>
          </DialogHeader>
          <div 
            className="flex-1 w-full h-full min-h-0 p-4 pt-2 overflow-auto flex items-center justify-center"
            onContextMenu={handleContextMenu}
          >
            {selectedCertificate && (
              <div 
                className="relative w-full h-full flex items-center justify-center select-none"
                style={{ userSelect: 'none' }}
              >
                <img
                  src={selectedCertificate}
                  alt="Ferfer® quality certificate"
                  className="max-w-full max-h-[calc(85vh-80px)] object-contain rounded-lg pointer-events-none"
                  onContextMenu={handleContextMenu}
                  onDragStart={(e) => e.preventDefault()}
                  draggable={false}
                  style={{ 
                    userSelect: 'none',
                    WebkitUserSelect: 'none',
                    MozUserSelect: 'none',
                    msUserSelect: 'none',
                  }}
                />
                {/* Transparent overlay to prevent image interaction */}
                <div 
                  className="absolute inset-0" 
                  onContextMenu={handleContextMenu}
                  style={{ userSelect: 'none' }}
                />
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default CertificatesSection;
