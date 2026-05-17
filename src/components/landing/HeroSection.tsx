import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

// Product images for carousel
import ferferModel1 from '@/assets/products/ferfer-model-1.png';
import ferferModel2 from '@/assets/products/ferfer-model-2.png';
import ferferModel3 from '@/assets/products/ferfer-model-3.png';
import ferferModel4 from '@/assets/products/ferfer-model-4.png';

const productImages = [
  {
    src: ferferModel1,
    alt: 'Ferfer® — липосомальное железо в саше, упаковка 30 штук',
  },
  {
    src: ferferModel2,
    alt: 'Ferfer® — саше Ferfer с апельсиновым вкусом',
  },
  {
    src: ferferModel3,
    alt: 'Ferfer® — инновационная формула с апельсиновым вкусом',
  },
  {
    src: ferferModel4,
    alt: 'Ferfer® — биологически активная добавка для восполнения дефицита железа',
  },
];

const HeroSection: React.FC = () => {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isInstructionsOpen, setIsInstructionsOpen] = useState(false);

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % productImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const nextIndex = (currentSlide + 1) % productImages.length;
    const nextImage = productImages[nextIndex];
    const preloadNext = new Image();
    preloadNext.src = nextImage.src;
  }, [currentSlide]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const activeImage = productImages[currentSlide];
  const isInitialSlide = currentSlide === 0;

  return (
    <section id="home" aria-label="Ferfer® — главная секция" className="relative min-h-screen overflow-hidden bg-background px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
      {/* Background Product Images - Hidden on mobile, right side on desktop */}
      <div className="hidden md:block absolute inset-y-0 left-auto right-0 w-3/5 lg:w-1/2 xl:w-[55%] 2xl:w-[50%] pointer-events-none">
        <div className="relative h-full flex items-center justify-center">
          <div
            key={activeImage.src}
            className="absolute inset-0 flex items-center justify-center transition-all duration-700 ease-in-out animate-fade-in"
          >
            <img
              src={activeImage.src}
              alt={activeImage.alt}
              width={1350}
              height={1080}
              className="w-full h-auto max-h-[70vh] 2xl:max-h-[80vh] object-contain p-8 md:p-12 lg:p-16 2xl:p-20"
              loading="eager"
              fetchPriority={isInitialSlide ? 'high' : 'auto'}
              decoding="async"
            />
          </div>
          

          {/* Sachets badge - Bottom right of carousel on desktop */}
          <div className="absolute bottom-[15%] right-8 lg:right-12 2xl:right-16 3xl:right-20 z-20 pointer-events-auto animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <div className="bg-primary text-primary-foreground px-6 py-3 2xl:px-8 2xl:py-4 3xl:px-10 3xl:py-5 rounded-full font-bold shadow-pink text-base 2xl:text-lg 3xl:text-xl whitespace-nowrap">
              {t('hero.sachets')}
            </div>
          </div>
        </div>
      </div>

      <div className="container-main relative z-10 pt-20 lg:pt-24 2xl:pt-32 3xl:pt-40 pb-8 2xl:pb-16 3xl:pb-24 max-w-[2200px]">
        <div className="flex flex-col md:justify-center min-h-[calc(100vh-12rem)] md:min-h-[calc(100vh-10rem)]">
          {/* Mobile Carousel - Above text on mobile */}
          <div className="md:hidden relative mb-6">
            <div className="relative h-64 sm:h-80">
              <div
                key={activeImage.src}
                className="absolute inset-0 flex items-center justify-center transition-all duration-700 ease-in-out animate-fade-in"
              >
                <img
                  src={activeImage.src}
                  alt={activeImage.alt}
                  width={1350}
                  height={1080}
                  className="w-full h-full object-contain p-4"
                  loading="eager"
                  fetchPriority={isInitialSlide ? 'high' : 'auto'}
                  decoding="async"
                />
              </div>
              
              {/* Sachets badge - Bottom right of carousel on mobile */}
              <div className="absolute bottom-2 right-0 z-20 animate-fade-in" style={{ animationDelay: '0.5s' }}>
                <div className="bg-primary text-primary-foreground px-5 py-2.5 rounded-full font-bold shadow-pink text-sm whitespace-nowrap">
                  {t('hero.sachets')}
                </div>
              </div>
            </div>
            
            {/* Dots Indicator - Mobile below carousel */}
            <div className="flex gap-2 mt-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              {productImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? 'bg-primary w-8'
                      : 'bg-primary/30 hover:bg-primary/50 w-2.5'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

          </div>

          {/* Content - Left Side */}
          <div className="text-left w-full md:w-1/2 md:pr-8 lg:pr-12 2xl:pr-20 3xl:pr-28">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 2xl:px-6 2xl:py-3 3xl:px-8 3xl:py-4 rounded-full bg-secondary/90 backdrop-blur-sm border border-primary/20 mb-4 md:mb-6 2xl:mb-8 3xl:mb-10 animate-fade-in">
              <span className="text-xs sm:text-sm 2xl:text-base 3xl:text-lg font-medium text-primary">
                {t('hero.badge')}
              </span>
            </div>

            <h1 className="animate-fade-in text-foreground mb-4 md:mb-6 2xl:mb-8 3xl:mb-10" style={{ animationDelay: '0.1s' }}>
              <span className="block text-xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl 2xl:text-5xl 3xl:text-6xl font-bold leading-tight mb-2 2xl:mb-4 3xl:mb-6">
                {t('hero.title')}
              </span>
              <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl 2xl:text-7xl 3xl:text-8xl font-bold text-primary">
                {t('hero.brand')}
                <span className="text-base sm:text-lg md:text-xl 2xl:text-2xl 3xl:text-3xl align-super">®</span>
              </span>
            </h1>

            <p className="text-xs sm:text-sm md:text-base 2xl:text-lg 3xl:text-xl text-muted-foreground mb-6 md:mb-8 2xl:mb-10 3xl:mb-12 animate-fade-in text-balance leading-relaxed 2xl:max-w-xl 3xl:max-w-2xl" style={{ animationDelay: '0.2s' }}>
              {t('hero.subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 2xl:gap-5 3xl:gap-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <Button 
                className="btn-primary text-sm md:text-base 2xl:text-lg 3xl:text-xl 2xl:px-10 2xl:py-4 3xl:px-12 3xl:py-5 w-full sm:w-auto"
                asChild
              >
                <a href="https://arzonapteka.uz/en/search-medicines?q=%D1%84%D0%B5%D1%80%D1%84%D0%B5%D1%80" target="_blank" rel="noopener noreferrer">
                  {t('hero.cta')}
                </a>
              </Button>
              <Button 
                variant="outline" 
                className="btn-secondary text-sm md:text-base 2xl:text-lg 3xl:text-xl 2xl:px-10 2xl:py-4 3xl:px-12 3xl:py-5 w-full sm:w-auto"
                onClick={() => setIsInstructionsOpen(true)}
              >
                <FileText className="mr-2 w-4 h-4 md:w-5 md:h-5 2xl:w-6 2xl:h-6 3xl:w-7 3xl:h-7" />
                {t('hero.instructions')}
              </Button>
            </div>

            {/* Dots Indicator - Desktop only, left side */}
            <div className="hidden md:flex gap-2 2xl:gap-3 3xl:gap-4 mt-8 md:mt-10 2xl:mt-14 3xl:mt-16 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              {productImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2.5 2xl:h-3 3xl:h-4 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? 'bg-primary w-8 2xl:w-10 3xl:w-12'
                      : 'bg-primary/30 hover:bg-primary/50 w-2.5 2xl:w-3 3xl:w-4'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Instructions Modal */}
      <Dialog open={isInstructionsOpen} onOpenChange={setIsInstructionsOpen}>
        <DialogContent className="max-w-2xl w-[95vw] max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-primary">
              Ferfer® (Ферфер)
            </DialogTitle>
            <p className="text-sm text-muted-foreground">
              {t('hero.instructions.title')}
            </p>
          </DialogHeader>
          <div className="space-y-5 pt-4">
            {/* Composition */}
            <div>
              <h4 className="font-semibold text-foreground mb-2">{t('hero.instructions.composition')}</h4>
              <p className="text-sm text-muted-foreground whitespace-pre-line">{t('hero.instructions.compositionText')}</p>
            </div>

            {/* Auxiliary Substances */}
            <div>
              <h4 className="font-semibold text-foreground mb-2">{t('hero.instructions.auxiliarySubstances')}</h4>
              <p className="text-sm text-muted-foreground">{t('hero.instructions.auxiliarySubstancesText')}</p>
            </div>

            {/* Properties */}
            <div>
              <h4 className="font-semibold text-foreground mb-2">{t('hero.instructions.properties')}</h4>
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground whitespace-pre-line">{t('hero.instructions.ironProperties')}</p>
                <p className="text-sm text-muted-foreground whitespace-pre-line">{t('hero.instructions.vitaminCProperties')}</p>
                <p className="text-sm text-muted-foreground whitespace-pre-line">{t('hero.instructions.vitaminB12Properties')}</p>
              </div>
            </div>

            {/* Indications */}
            <div>
              <h4 className="font-semibold text-foreground mb-2">{t('hero.instructions.indication')}</h4>
              <p className="text-sm text-muted-foreground">{t('hero.instructions.indicationText')}</p>
            </div>

            {/* Dosage */}
            <div>
              <h4 className="font-semibold text-foreground mb-2">{t('hero.instructions.dosage')}</h4>
              <p className="text-sm text-muted-foreground">{t('hero.instructions.dosageText')}</p>
            </div>

            {/* Contraindications */}
            <div>
              <h4 className="font-semibold text-foreground mb-2">{t('hero.instructions.contraindications')}</h4>
              <p className="text-sm text-muted-foreground">{t('hero.instructions.contraindicationsText')}</p>
            </div>

            {/* Side Effects */}
            <div>
              <h4 className="font-semibold text-foreground mb-2">{t('hero.instructions.sideEffects')}</h4>
              <p className="text-sm text-muted-foreground">{t('hero.instructions.sideEffectsText')}</p>
            </div>

            {/* Special Instructions */}
            <div>
              <h4 className="font-semibold text-foreground mb-2">{t('hero.instructions.specialInstructions')}</h4>
              <p className="text-sm text-muted-foreground">{t('hero.instructions.specialInstructionsText')}</p>
            </div>

            {/* Storage */}
            <div>
              <h4 className="font-semibold text-foreground mb-2">{t('hero.instructions.storage')}</h4>
              <p className="text-sm text-muted-foreground">{t('hero.instructions.storageText')}</p>
            </div>

            {/* Shelf Life & Package */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-foreground mb-2">{t('hero.instructions.shelfLife')}</h4>
                <p className="text-sm text-muted-foreground">{t('hero.instructions.shelfLifeText')}</p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">{t('hero.instructions.package')}</h4>
                <p className="text-sm text-muted-foreground">{t('hero.instructions.packageText')}</p>
              </div>
            </div>

            {/* Manufacturer */}
            <div className="pt-2 border-t border-border">
              <h4 className="font-semibold text-foreground mb-2">{t('hero.instructions.manufacturer')}</h4>
              <p className="text-sm text-muted-foreground">{t('hero.instructions.manufacturerText')}</p>
            </div>

            {/* Dispensing */}
            <div>
              <h4 className="font-semibold text-foreground mb-2">{t('hero.instructions.dispensing')}</h4>
              <p className="text-sm text-muted-foreground">{t('hero.instructions.dispensingText')}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default HeroSection;
