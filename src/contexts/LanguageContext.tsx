import React, { createContext, useContext, ReactNode, useMemo, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export type Language = 'ru' | 'uz';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  ru: {
    // Meta
    'meta.title': 'Ферфер® — БАД с липосомальным железом | Узбекистан',
    'meta.description': 'Ферфер® — БАД с липосомальным железом 14 мг, витаминами C и B₁₂. Высокая биодоступность, без побочных эффектов. 30 саше в аптеках Узбекистана.',
    'meta.ogTitle': 'Ферфер® — БАД с липосомальным железом',
    'meta.ogDescription': 'БАД с липосомальным железом 14 мг, витаминами C и B₁₂. Высокая биодоступность, без побочных эффектов. 30 саше — в аптеках Узбекистана.',

    // Navigation
    'nav.home': 'Главная',
    'nav.about': 'О продукте',
    'nav.benefits': 'Преимущества',
    'nav.buy': 'Где купить',
    'nav.faq': 'ЧАВО',
    
    // Hero Section
    'hero.badge': 'Инновационная микрокапсулированная технология',
    'hero.title': 'Биологически активная добавка',
    'hero.brand': 'ФЕРФЕР',
    'hero.subtitle': 'Восполнение дефицита железа без дискомфорта. Быстро растворяется во рту, приятный апельсиновый вкус, не требует воды.',
    'hero.cta': 'Купить сейчас',
    'hero.instructions': 'Инструкция',
    'hero.sachets': '30 саше',
    'hero.instructions.title': 'Инструкция по применению',
    'hero.instructions.composition': 'Состав (на 1 саше, 1,5 г)',
    'hero.instructions.compositionText': 'Железо (в виде пирофосфата железа) — 14 мг\nВитамин С — 80 мг\nВитамин В₁₂ — 2,5 мкг',
    'hero.instructions.auxiliarySubstances': 'Вспомогательные вещества',
    'hero.instructions.auxiliarySubstancesText': 'Мальтодекстрин, маннит, декстроза безводная, дюраром со вкусом апельсина и сукралоза.',
    'hero.instructions.properties': 'Свойства',
    'hero.instructions.ironProperties': 'Железо:\n• поддерживает стабильный энергетический метаболизм\n• способствует нормальному транспорту кислорода в организме\n• способствует образованию гемоглобина\n• принимает участие в функции деления клеток\n• важно при планировании беременности\n• поддерживает оптимальное функционирование иммунной системы',
    'hero.instructions.vitaminCProperties': 'Витамин С:\n• улучшает усвоение железа\n• способствует синтезу коллагена\n• поддерживает иммунную функцию',
    'hero.instructions.vitaminB12Properties': 'Витамин В₁₂:\n• способствует эффективному образованию красных кровяных клеток\n• уменьшает усталость и утомляемость\n• способствует оптимальному функционированию нервной и иммунной системы\n• играет важную роль в процессе деления клеток\n• способствует нормальному энергетическому метаболизму',
    'hero.instructions.indication': 'Показания к применению',
    'hero.instructions.indicationText': 'Ferfer® — биологически активная добавка, содержащая железо в липосомальной форме. Липосомальная технология обеспечивает высокую биодоступность железа, защищая его от окисления в желудке и обеспечивая эффективное всасывание без типичных побочных эффектов.',
    'hero.instructions.dosage': 'Способ применения и дозы',
    'hero.instructions.dosageText': 'Дозировка для взрослых: 1–2 саше в день или по назначению врача. Принимать без воды. Откройте 1 пакетик и положите содержимое в рот, не растворяя в воде.',
    'hero.instructions.contraindications': 'Противопоказания',
    'hero.instructions.contraindicationsText': 'Повышенная чувствительность к солям железа, аскорбиновой кислоте (витамину С) или любой форме витамина В₁₂. Гемосидероз, гемохроматоз или анемии, отличные от железодефицитной анемии. Гипероксалурия.',
    'hero.instructions.sideEffects': 'Побочные эффекты',
    'hero.instructions.sideEffectsText': 'Возможны желудочно-кишечные расстройства (тошнота, запор, диарея). Благодаря липосомальной форме частота побочных эффектов значительно снижена по сравнению с традиционными формами железа.',
    'hero.instructions.specialInstructions': 'Особые указания',
    'hero.instructions.specialInstructionsText': 'Биологически активная добавка, не являющаяся лекарственным средством. Используйте в соответствии с рекомендациями врача. Не превышайте рекомендуемую суточную дозу. Храните в недоступном для детей месте. Беременные и кормящие женщины должны проконсультироваться с врачом перед применением.',
    'hero.instructions.storage': 'Условия хранения',
    'hero.instructions.storageText': 'Храните в недоступном для детей месте. Защищайте от света, тепла и влаги. Хранить при температуре ниже 30°C.',
    'hero.instructions.shelfLife': 'Срок годности',
    'hero.instructions.shelfLifeText': '24 месяца с даты производства.',
    'hero.instructions.package': 'Форма выпуска',
    'hero.instructions.packageText': '30 саше в упаковке.',
    'hero.instructions.manufacturer': 'Производитель',
    'hero.instructions.manufacturerText': 'PharmEvo (Pvt). Ltd. (Nutraceutical Division)',
    'hero.instructions.dispensing': 'Условия отпуска',
    'hero.instructions.dispensingText': 'Отпускается без рецепта.',
    
    // About Section
    'about.title': 'О продукте',
    'about.description1': 'Ferfer® — это биологически активная добавка, содержащая железо в микрокапсулированной липосомальной форме с витаминами C и B₁₂.',
    'about.description2': 'Инновационная технология позволяет железу лучше усваиваться, не раздражает желудочно-кишечный тракт и снижает риск типичных побочных эффектов.',
    
    'about.feature1.title': 'Железо — 14 мг',
    'about.feature1.desc': 'Микрокапсулированный пирофосфат железа в липосомальной оболочке. Защищён от разрушения в желудке.',
    
    'about.feature2.title': 'Витамин С — 80 мг',
    'about.feature2.desc': 'Усиливает всасывание железа, поддерживает синтез коллагена и укрепляет иммунитет.',
    
    'about.feature3.title': 'Витамин B₁₂ — 2,5 мкг',
    'about.feature3.desc': 'Участвует в кроветворении, снижает утомляемость и поддерживает нервную систему.',
    
    'about.feature4.title': 'Форма саше',
    'about.feature4.desc': '1,5 г гранул с апельсиновым вкусом. Растворяются во рту — не нужна вода.',
    
    'about.feature5.title': 'Дозировка',
    'about.feature5.desc': 'Взрослым и подросткам от 14 лет — 1–2 саше в день или по назначению врача.',
    
    'about.feature6.title': 'Хранение',
    'about.feature6.desc': 'При температуре до 30°C, в защищённом от света и влаги месте. Срок годности — 24 месяца.',
    
    // Benefits Section
    'benefits.title': 'Преимущества липосомальной формы',
    'benefits.subtitle': 'Почему Ferfer® переносится лучше обычных препаратов железа',
    
    'benefits.item1.title': 'Защита от окисления',
    'benefits.item1.desc': 'Липосомальная оболочка защищает железо от контакта с желудочным соком, исключая окисление и раздражение слизистой.',
    
    'benefits.item2.title': 'Нет металлического привкуса',
    'benefits.item2.desc': 'Традиционные формы железа оставляют неприятный вкус. Lipосомальная капсула полностью нейтрализует этот эффект.',
    
    'benefits.item3.title': 'Меньше побочных эффектов',
    'benefits.item3.desc': 'Обычное железо часто вызывает тошноту, запоры и диарею. Липосомальная технология значительно снижает их частоту.',
    
    'benefits.item4.title': 'Независимость от приёма пищи',
    'benefits.item4.desc': 'Ferfer® не взаимодействует с едой, чаем или кофе — принимайте в любое удобное время.',
    
    'benefits.liposomalIron': 'Липосомное железо',
    'benefits.microFormula': 'Микрокапсулированная формула',
    
    // Partners Section
    'partners.title': 'Где купить?',
    'partners.button': 'В аптеку',
    'partners.seeAll': 'Смотреть все',
    
    // FAQ Section
    'faq.title': 'Часто задаваемые вопросы',
    'faq.subtitle': 'Ответы на популярные вопросы о Ferfer®',
    
    'faq.q1': 'Что такое Ferfer®?',
    'faq.a1': 'Ferfer® — биологически активная добавка с железом 14 мг, витамином C 80 мг и витамином B₁₂ 2,5 мкг в форме саше с апельсиновым вкусом. Не является лекарственным средством.',
    
    'faq.q2': 'Как принимать Ferfer®?',
    'faq.a2': 'Откройте саше и высыпьте содержимое прямо в рот — гранулы растворятся самостоятельно. Вода не требуется. Рекомендуется 1–2 саше в день для взрослых и подростков от 14 лет.',
    
    'faq.q3': 'Какие противопоказания?',
    'faq.a3': 'Повышенная чувствительность к солям железа, витамину С или B₁₂. Гемосидероз, гемохроматоз и анемии, не связанные с дефицитом железа. При гипероксалурии также следует воздержаться от приёма.',
    
    'faq.q4': 'Можно ли принимать беременным?',
    'faq.a4': 'Беременным и кормящим женщинам перед началом приёма необходимо проконсультироваться с врачом.',
    
    'faq.q5': 'Ferfer® — это лекарство?',
    'faq.a5': 'Нет. Ferfer® является биологически активной добавкой к пище и не относится к лекарственным средствам.',
    
    // Certificates Section
    'certificates.title': 'Сертификаты качества',
    'certificates.subtitle': 'Ferfer® соответствует международным стандартам качества и безопасности',
    'certificates.cert1.title': 'Сертификат соответствия',
    'certificates.cert1.desc': 'Официальный сертификат соответствия требованиям технических регламентов.',
    'certificates.cert2.title': 'Регистрационное удостоверение',
    'certificates.cert2.desc': 'Государственная регистрация БАД в Республике Узбекистан.',
    'certificates.cert3.title': 'Сертификат GMP',
    'certificates.cert3.desc': 'Производство соответствует международным стандартам надлежащей производственной практики.',
    'certificates.view': 'Смотреть PDF',

    // Footer
    'footer.description': 'Ferfer® — инновационная биологически активная добавка для восполнения дефицита железа.',
    'footer.quickLinks': 'Быстрые ссылки',
    'footer.contact': 'Контакты',
    'footer.address': 'Ц-5 Киёт 68А, г. Ташкент, Узбекистан',
    'footer.rights': 'PharmEvo. Все права защищены.',
    'footer.warning': 'БАД не является лекарственным средством.',
    'footer.pharmevo': 'PharmEvo — Our dream, a healthier society',
    'footer.privacy': 'Политика конфиденциальности',
    'footer.terms': 'Условия использования',
    'footer.subscribe.title': 'Подпишитесь на новости',
    'footer.subscribe.placeholder': 'Укажите свой E-mail',
    'footer.subscribe.button': 'Подписаться',
    'footer.subscribe.disclaimer': 'Предложение действительно только для новых подписчиков. Нажимая на кнопку вы соглашаетесь с Политикой обработки данных.',
    'footer.subscribe.success': 'Вы успешно подписались!',
  },
  uz: {
    // Meta
    'meta.title': "Ferfer® — Liposomal temirli BFQ | O'zbekiston",
    'meta.description': "Ferfer® — 14 mg liposomal temir, vitamin C va B₁₂ bilan BFQ. Yuqori biokiraolishlik, nojo'ya ta'sirlarsiz. 30 sashe O'zbekiston dorixonalarida.",
    'meta.ogTitle': "Ferfer® — Liposomal temirli BFQ",
    'meta.ogDescription': "14 mg liposomal temir, vitamin C va B₁₂ bilan BFQ. Yuqori biokiraolishlik, nojo'ya ta'sirlarsiz. 30 sashe — O'zbekiston dorixonalarida.",

    // Navigation
    'nav.home': 'Bosh sahifa',
    'nav.about': 'Mahsulot haqida',
    'nav.benefits': 'Afzalliklar',
    'nav.buy': 'Qayerdan sotib olish',
    'nav.faq': 'FAQ',
    
    // Hero Section
    'hero.badge': 'Innovatsion mikrokapsulalangan texnologiya',
    'hero.title': "Biologik faol qo'shimcha",
    'hero.brand': 'FERFER',
    'hero.subtitle': "Temir tanqisligini noqulayliksiz to'ldirish. Og'izda tez eriydi, yoqimli apelsin ta'mi, suv talab qilmaydi.",
    'hero.cta': 'Hozir sotib olish',
    'hero.instructions': "Ko'rsatma",
    'hero.sachets': '30 sashe',
    'hero.instructions.title': "Qo'llash bo'yicha ko'rsatma",
    'hero.instructions.composition': 'Tarkibi (1 sashe, 1,5 g uchun)',
    'hero.instructions.compositionText': 'Temir (temir pirofosfat shaklida) — 14 mg\nVitamin C — 80 mg\nVitamin B₁₂ — 2,5 mkg',
    'hero.instructions.auxiliarySubstances': 'Yordamchi moddalar',
    'hero.instructions.auxiliarySubstancesText': "Maltodekstrin, mannit, suvsiz dekstroza, apelsin ta'mli durarom va sukraloza.",
    'hero.instructions.properties': 'Xususiyatlari',
    'hero.instructions.ironProperties': "Temir:\n• barqaror energiya almashinuvini qo'llab-quvvatlaydi\n• organizmda kislorodning normal tashilishiga yordam beradi\n• gemoglobin hosil bo'lishiga yordam beradi\n• hujayra bo'linishi funktsiyasida ishtirok etadi\n• homiladorlikni rejalashtirishda muhim\n• immunitet tizimining optimal ishlashini qo'llab-quvvatlaydi",
    'hero.instructions.vitaminCProperties': "Vitamin C:\n• temirning o'zlashtirilishini yaxshilaydi\n• kollagen sinteziga yordam beradi\n• immun funktsiyasini qo'llab-quvvatlaydi",
    'hero.instructions.vitaminB12Properties': "Vitamin B₁₂:\n• qizil qon hujayralarining samarali hosil bo'lishiga yordam beradi\n• charchoq va toliqishni kamaytiradi\n• asab va immun tizimining optimal ishlashiga yordam beradi\n• hujayra bo'linishi jarayonida muhim rol o'ynaydi\n• normal energiya almashinuviga yordam beradi",
    'hero.instructions.indication': "Qo'llash ko'rsatmalari",
    'hero.instructions.indicationText': "Ferfer® — liposomal shakldagi temirni o'z ichiga olgan biologik faol qo'shimcha. Liposomal texnologiya temirning yuqori biokiruvchanligini ta'minlab, uni oshqozonda oksidlanishdan himoya qiladi va odatiy nojo'ya ta'sirlarsiz samarali so'rilishini ta'minlaydi.",
    'hero.instructions.dosage': "Qo'llash usuli va dozasi",
    'hero.instructions.dosageText': "Kattalar uchun dozasi: kuniga 1–2 sashe yoki shifokor ko'rsatmasiga ko'ra. Suvsiz qabul qiling. 1 paketni oching va tarkibini og'izga qo'ying, suvda eritmasdan.",
    'hero.instructions.contraindications': "Qarshi ko'rsatmalar",
    'hero.instructions.contraindicationsText': "Temir tuzlariga, askorbin kislotasiga (vitamin C) yoki vitamin B₁₂ning har qanday shakliga yuqori sezuvchanlik. Gemosideroz, gemoxromatoz yoki temir tanqisligi anemiyasidan boshqa anemiyalar. Giperoksoluriya.",
    'hero.instructions.sideEffects': "Nojo'ya ta'sirlari",
    'hero.instructions.sideEffectsText': "Oshqozon-ichak buzilishlari (ko'ngil aynishi, qabziyat, diareya) kuzatilishi mumkin. Liposomal shakl tufayli nojo'ya ta'sirlar chastotasi an'anaviy temir shakllariga nisbatan sezilarli darajada kamaygan.",
    'hero.instructions.specialInstructions': "Maxsus ko'rsatmalar",
    'hero.instructions.specialInstructionsText': "Biologik faol qo'shimcha, dori vositasi emas. Shifokor tavsiyalariga muvofiq foydalaning. Tavsiya etilgan kunlik dozadan oshirmang. Bolalar qo'li yetmaydigan joyda saqlang. Homilador va emizikli ayollar qo'llashdan oldin shifokor bilan maslahatlashishlari lozim.",
    'hero.instructions.storage': 'Saqlash shartlari',
    'hero.instructions.storageText': "Bolalar qo'li yetmaydigan joyda saqlang. Yorug'lik, issiqlik va namlikdan himoya qiling. 30°C dan past haroratda saqlang.",
    'hero.instructions.shelfLife': 'Yaroqlilik muddati',
    'hero.instructions.shelfLifeText': 'Ishlab chiqarilgan sanadan boshlab 24 oy.',
    'hero.instructions.package': 'Chiqarish shakli',
    'hero.instructions.packageText': 'Qadoqda 30 ta sashe.',
    'hero.instructions.manufacturer': 'Ishlab chiqaruvchi',
    'hero.instructions.manufacturerText': 'PharmEvo (Pvt). Ltd. (Nutraceutical Division)',
    'hero.instructions.dispensing': 'Berilish shartlari',
    'hero.instructions.dispensingText': 'Retseptsiz beriladi.',
    
    // About Section
    'about.title': 'Mahsulot haqida',
    'about.description1': "Ferfer® — bu tarkibida temir, vitamin C va vitamin B₁₂ bo'lgan mikrokapsulalangan liposomal shakldagi biologik faol qo'shimcha.",
    'about.description2': "Innovatsion texnologiya temirning yaxshiroq so'rilishini ta'minlaydi, oshqozon-ichak traktini bezovta qilmaydi va odatiy nojo'ya ta'sirlar xavfini kamaytiradi.",
    
    'about.feature1.title': 'Temir — 14 mg',
    'about.feature1.desc': "Liposomal qobiqli mikrokapsulalangan temir pirofosfat. Oshqozonda parchalanishdan himoyalangan.",
    
    'about.feature2.title': 'Vitamin C — 80 mg',
    'about.feature2.desc': "Temirning so'rilishini kuchaytiradi, kollagen sintezini qo'llab-quvvatlaydi va immunitetni mustahkamlaydi.",
    
    'about.feature3.title': 'Vitamin B₁₂ — 2,5 mkg',
    'about.feature3.desc': "Qon yaratishda ishtirok etadi, charchoqni kamaytiradi va asab tizimini qo'llab-quvvatlaydi.",
    
    'about.feature4.title': 'Sashe shakli',
    'about.feature4.desc': "1,5 g apelsin ta'mli granulalar. Og'izda eriydi — suv kerak emas.",
    
    'about.feature5.title': 'Dozalash',
    'about.feature5.desc': "Kattalar va 14 yoshdan oshgan o'smirlar uchun — kuniga 1–2 sashe yoki shifokor ko'rsatmasiga ko'ra.",
    
    'about.feature6.title': 'Saqlash',
    'about.feature6.desc': "30°C gacha haroratda, yorug'lik va namlikdan himoyalangan joyda. Yaroqlilik muddati — 24 oy.",
    
    // Benefits Section
    'benefits.title': 'Liposomal shaklning afzalliklari',
    'benefits.subtitle': "Nima uchun Ferfer® oddiy temir preparatlaridan yaxshiroq o'zlashtiriladi",
    
    'benefits.item1.title': 'Oksidlanishdan himoya',
    'benefits.item1.desc': "Liposomal qobiq temirni oshqozon shirasi bilan kontaktdan himoya qiladi, oksidlanish va shilliq qavatni bezovta qilishni bartaraf etadi.",
    
    'benefits.item2.title': "Metall ta'mi yo'q",
    'benefits.item2.desc': "An'anaviy temir shakllari yoqimsiz ta'm qoldiradi. Liposomal kapsula bu ta'sirni to'liq yo'q qiladi.",
    
    'benefits.item3.title': "Kamroq nojo'ya ta'sirlar",
    'benefits.item3.desc': "Oddiy temir ko'pincha ko'ngil aynishi, qabziyat va diareya keltirib chiqaradi. Liposomal texnologiya ularning chastotasini sezilarli darajada kamaytiradi.",
    
    'benefits.item4.title': "Ovqatlanishdan mustaqil",
    'benefits.item4.desc': "Ferfer® oziq-ovqat, choy yoki qahva bilan ta'sir qilmaydi — qulay vaqtda qabul qiling.",
    
    'benefits.liposomalIron': 'Liposomal temir',
    'benefits.microFormula': 'Mikrokapsulalangan formula',
    
    // Partners Section
    'partners.title': 'Qayerdan sotib olish?',
    'partners.button': 'Dorixonaga',
    'partners.seeAll': "Hammasini ko'rish",
    
    // FAQ Section
    'faq.title': "Ko'p beriladigan savollar",
    'faq.subtitle': 'Ferfer® haqida mashhur savollarga javoblar',
    
    'faq.q1': 'Ferfer® nima?',
    'faq.a1': "Ferfer® — tarkibida 14 mg temir, 80 mg vitamin C va 2,5 mkg vitamin B₁₂ mavjud bo'lgan apelsin ta'mli sashe shaklidagi biologik faol qo'shimcha. Dori vositasi emas.",
    
    'faq.q2': 'Ferfer® qanday qabul qilinadi?',
    'faq.a2': "Sasheni oching va tarkibini to'g'ridan-to'g'ri og'izga soling — granulalar o'zi eriydi. Suv kerak emas. Kattalar va 14 yoshdan oshgan o'smirlar uchun kuniga 1–2 sashe tavsiya etiladi.",
    
    'faq.q3': "Qanday qarshi ko'rsatmalar bor?",
    'faq.a3': "Temir tuzlariga, vitamin C yoki B₁₂ ga yuqori sezuvchanlik. Gemosideroz, gemoxromatoz va temir tanqisligi bilan bog'liq bo'lmagan anemiyalar. Giperoksoluriya ham qabul qilishdan tiyilish sababidir.",
    
    'faq.q4': "Homilador ayollar qabul qilishi mumkinmi?",
    'faq.a4': "Homilador va emizikli ayollar qabul qilishdan oldin shifokor bilan maslahatlashishlari lozim.",
    
    'faq.q5': "Ferfer® dori vositasimi?",
    'faq.a5': "Yo'q. Ferfer® biologik faol qo'shimcha hisoblanadi va dori vositalariga kirmaydi.",
    
    // Certificates Section
    'certificates.title': 'Sifat sertifikatlari',
    'certificates.subtitle': 'Ferfer® xalqaro sifat va xavfsizlik standartlariga mos keladi',
    'certificates.cert1.title': 'Muvofiqlik sertifikati',
    'certificates.cert1.desc': 'Texnik reglamentlar talablariga muvofiqlikning rasmiy sertifikati.',
    'certificates.cert2.title': "Ro'yxatdan o'tish guvohnomasi",
    'certificates.cert2.desc': "O'zbekiston Respublikasida BFQ davlat ro'yxatidan o'tkazildi.",
    'certificates.cert3.title': 'GMP sertifikati',
    'certificates.cert3.desc': 'Ishlab chiqarish xalqaro GMP standartlariga mos keladi.',
    'certificates.view': "PDF ni ko'rish",

    // Footer
    'footer.description': "Ferfer® — temir tanqisligini to'ldirish uchun mo'ljallangan innovatsion biologik faol qo'shimcha.",
    'footer.quickLinks': 'Tezkor havolalar',
    'footer.contact': 'Aloqa',
    'footer.address': "C-5 Qiyot 68А, Toshkent shahri, O'zbekiston",
    'footer.rights': 'PharmEvo. Barcha huquqlar himoyalangan.',
    'footer.warning': "Biologik faol qo'shimcha dori vositasi hisoblanmaydi.",
    'footer.pharmevo': "PharmEvo — Bizning orzuimiz, sog'lom jamiyat",
    'footer.privacy': 'Maxfiylik siyosati',
    'footer.terms': 'Foydalanish shartlari',
    'footer.subscribe.title': 'Yangiliklarga obuna bo\'ling',
    'footer.subscribe.placeholder': 'E-mail manzilingizni kiriting',
    'footer.subscribe.button': 'Obuna bo\'lish',
    'footer.subscribe.disclaimer': 'Taklif faqat yangi obunachilar uchun amal qiladi. Tugmani bosish orqali siz Ma\'lumotlarni qayta ishlash siyosatiga rozilik bildirasiz.',
    'footer.subscribe.success': 'Siz muvaffaqiyatli obuna bo\'ldingiz!',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { lang } = useParams<{ lang: string }>();
  const navigate = useNavigate();
  
  const language: Language = lang === 'uz' ? 'uz' : 'ru';

  const setLanguage = useCallback((newLang: Language) => {
    const hash = window.location.hash;
    navigate(`/${newLang}${hash}`);
  }, [navigate]);

  const t = useCallback((key: string): string => {
    return translations[language][key] || key;
  }, [language]);

  const value = useMemo(() => ({ language, setLanguage, t }), [language, setLanguage, t]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
