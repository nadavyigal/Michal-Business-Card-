import React, { useState } from 'react';
import {
  ArrowLeft,
  Calendar,
  CheckCircle,
  Clock,
  Gift,
  Heart,
  MessageCircle,
  Shield,
  Star,
} from 'lucide-react';

import heroMain from '../תמונה של WhatsApp‏ 2025-12-01 בשעה 13.06.01_df5423a4.jpg';
import heroCouple from '../תמונה של WhatsApp‏ 2025-12-01 בשעה 13.07.13_a8a63e21.jpg';
import logo from '../מחוברים מחדש לוגו - חדש.jpg';
import michalPhoto from '../מחוברים מחדש השוות[2] - תמונה של מיכל .jpg';
import heartHands from '../1מחוברים מחדש[2].png';

const painPoints = [
  'נמאס לכם מהריבים שחוזרים על עצמם?',
  'מלהרגיש לבד בתוך הקשר, אפילו כשהכול "בסדר מבחוץ"?',
  'מהמקום שבו אתם נותנים, מסבירים, מדברים - וזה עדיין לא משתנה?',
  'אתם לא לבד. לרוב הזוגות זה קורה. לא בגלל שמשהו "דפוק" בקשר, אלא כי אף פעם לא לימדו אותנו אחרת.',
];

const fitList = [
  'המרחק גדל, הקרבה והקלות הלכו לאיבוד',
  'התקשורת מתוחה ושחוקה',
  'המאמץ נופל בעיקר עליו/עליה',
  'יש רצון לשפר מבפנים — בלי להכריח את בן/בת הזוג להצטרף',
  'כבר עבר את קורס "מחוברים מחדש" ורוצה להעמיק',
  'מבין שכדי לשנות את הזוגיות – לא חייבים לשנות את הפרטנר',
  'מוכן להביט פנימה, לרפא את המקומות שכבר מזמן מבקשים תשומת לב',
  'רוצה לא רק להפסיק לריב – אלא ליצור מחדש את הקשר שהוא באמת רוצה לחיות בו',
  'רוצה לקחת אחריות וליצור משהו חדש בזוגיות',
  'רוצה להתפתח ולגדול',
];

const details = [
  '7 מפגשים פרונטליים | כל מפגש 3 שעות',
  'ימי שלישי, 10:00-13:00 | 9/12/25 עד 13/1/26',
  'חלל קסום בתל אביב',
  'קבוצה קטנה, ליווי אישי, תמיכה, מרחב בטוח ואותנטי',
  'תהליך עומק אישי וקבוצתי – שילוב של כלים מעולם הסאטיה, האמגו, השמאניזם ועוד',
  'נבין מה מפעיל אותנו בזוגיות, נזהה את הדפוסים שחוזרים שוב ושוב',
  'נלמד איך ליצור תגובה אחרת, שמייצרת תוצאות שונות בזוגיות',
  'תנועה מהאשמה – לאחריות. מהישרדות – לחיים. מריחוק – לקרבה',
];

const modules = [
  {
    title: 'שיעור 1: הכרות, תפיסות עולם וחזון זוגי',
    points: ['מבוא עם תפיסות העולם שילווי אותנו בקורס- השתקפות, אחריות ועוד', 'בניית חזון זוגי ושלבים להגשמתו'],
  },
  {
    title: 'שיעור 2: מה החלק שלי בדינמיקה',
    points: ['תפיסת השתקפות- מה בי מושך את הדפוס הזה', 'הוויה שלי- את מי בן/בת הזוג שלי פוגשים', 'מה אני יכול/ה לעשות אחרת (לא מתוך אשמה אלא מתוך התפתחות)'],
  },
  {
    title: 'שיעור 3: פצעי ילדות- הכרות',
    points: ['איך פצעי הילדות משפיעים על הזוגיות', 'זיהוי פצעי הילדות', 'הסיפור שאני מספר/ת לעצמי', 'איפה הפצע מתקיים בזוגיות- איך לעצור את השחזור'],
  },
  {
    title: 'שיעור 4: פצעי ילדות- ריפוי',
    points: ['ריפוי ושחרור פצעי הילדות', 'תרגולים עם הילד/ה שהייתי', 'יצירת תגובות חדשות ומיטיבות'],
  },
  {
    title: 'שיעור 5: רגשות "קשים" ואיך לעבוד איתם',
    points: ['כעס, פחד, כאב, תסכול- לא אויבים אלא מורי דרך', 'איך להתמודד בלי להתפוצץ או לקפוא', 'איך להכיל רגש בלי להילחם בו'],
  },
  {
    title: 'שיעור 6: גבולות ותקשורת',
    points: ['מה זה גבול בריא ואיך לזהות אותו', 'איך לתקשר גבולות בלי לרצות ובלי לפגוע', 'סגנונות תקשורת'],
  },
  {
    title: 'שיעור 7: סיכום והטמעה',
    points: ['חידוד חזון וכלים', '"בנק שמירה עלי" -מה יתמוך בי להמשך הדרך'],
  },
];

const outcomes = [
  {
    title: 'חזון זוגי',
    text: 'מה החזון שלי - מפת דרכים להשיג אותו',
  },
  {
    title: 'ריפוי',
    text: 'הכרות עם פצעי הילדות - ריפוי ושחרור פצעי ילדות',
  },
  {
    title: 'גוף',
    text: 'הכרות עם מערכת החישה ותחושות הגוף שלי - כלים פרקטיים לעבודה איתה - מרכז פנימי יציב יותר - יכולת לנהל סיטואציה במקום להיגרר אחריה',
  },
  {
    title: 'תקשורת',
    text: 'יכולת לדבר אותי - להעביר מסר שצד השני ישמע - גם כשיש פערים, אי הסכמות וריחוק',
  },
  {
    title: 'פחות כעס והתפרצויות',
    text: 'תכעסו פחות - ואם תכעסו זה יחלוף מהר יותר',
  },
  {
    title: 'אחריות',
    text: 'פחות האשמה ותסכול ויותר אחריות ואונים',
  },
  {
    title: 'יכול להתמודד עם רגשות מאמללים',
    text: 'תלמדו לעבוד עם פחד, כאב, אכזבה',
  },
  {
    title: 'גבולות ברורים',
    text: 'תכירו את הגבולות שלכם - תדעו לתקשר אותם באופן ברור ומכבד',
  },
  {
    title: 'אהבה עצמית וחיבור לעצמכם',
    text: 'יותר אהבה עצמית - חיבור לעצמכם - מרכז יציב',
  },
  {
    title: 'בהירות לגבי הקשר שלכם',
    text: 'תהיו שלמים יותר',
  },
  {
    title: 'תחושת חיבור מחודשת',
    text: 'לעצמכם - לבני/בנות הזוג',
  },
];

const priceBlocks = [
  {
    label: 'הרשמה מוקדמת',
    price: '₪2,100',
    originalPrice: '₪2,800',
    savings: '₪700',
    featured: true,
    bonus: true,
    note: 'כולל הקורס הפרונטלי מלא',
    features: [
      '7 מפגשים פרונטליים × 3 שעות',
      'קבוצה קטנה עד 12 משתתפים',
      'חומרי לימוד דיגיטליים',
      'גישה לקהילה סגורה',
    ],
  },
  {
    label: 'מסלול עם אימון אישי',
    price: '₪3,150',
    breakdown: '₪2,100 + ₪1,050',
    originalPrice: '₪4,500',
    savings: '₪1,347',
    bonus: true,
    note: 'המסלול המלא עם ליווי אישי',
    features: [
      'כל מה שבמסלול הבסיסי',
      '7 אימונים אישיים (שווי ₪1,400)',
      'ליווי צמוד לאורך הקורס',
      'תוכנית התפתחות אישית',
    ],
  },
];

const stats = [
  { label: 'שעות לימוד', value: '21' },
  { label: 'שיעורים', value: '7' },
  { label: 'ימי שלישי', value: '10:00-13:00' },
];

const LandingPage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const primaryCta = (
    <button
      onClick={() => scrollToSection('pricing')}
      className="group relative flex items-center justify-center gap-2 px-6 py-4 md:px-8 md:py-5 rounded-full bg-gradient-to-br from-[var(--brand-accent)] via-[var(--brand-accent-deep)] to-[var(--brand-burgundy)] text-white font-bold text-base md:text-lg shadow-2xl shadow-[var(--brand-accent)]/40 hover:shadow-[var(--brand-accent)]/60 hover:scale-[1.05] active:scale-[0.98] transition-all duration-300 overflow-hidden min-h-[44px] w-full sm:w-auto"
    >
      <span className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <span className="relative z-10">כן, אני רוצה לשפר את הזוגיות שלי!</span>
      <ArrowLeft className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
    </button>
  );

  return (
    <div
      dir="rtl"
      className="bg-[var(--brand-soft)] text-[var(--brand-ink)] font-sans overflow-x-hidden selection:bg-[var(--brand-cream)]"
    >
      {/* Sticky Mobile CTA Bar */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-50 p-4 bg-white/98 backdrop-blur-xl border-t border-[var(--brand-border)] shadow-2xl">
        <button
          onClick={() => scrollToSection('pricing')}
          className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-gradient-to-br from-[var(--brand-accent)] via-[var(--brand-accent-deep)] to-[var(--brand-burgundy)] text-white font-bold text-base shadow-xl active:scale-95 transition-all duration-200 min-h-[48px]"
        >
          <span>הצטרפו לקורס עכשיו</span>
          <ArrowLeft className="w-5 h-5" />
        </button>
      </div>

      <nav className="fixed inset-x-0 top-0 z-50 bg-white/95 backdrop-blur-2xl border-b border-[var(--brand-border)] shadow-lg shadow-[var(--brand-accent)]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-28">
            <div className="flex items-center gap-5">
              <img src={logo} alt="Shine by Michal Slonim" className="h-16 w-auto rounded-2xl shadow-xl border-2 border-[var(--brand-border)]" />
              <div className="hidden sm:flex flex-col leading-tight">
                <span className="font-display font-bold text-[var(--brand-ink)] text-xl">בחזרה לזוגיות שבחרתי</span>
                <span className="text-sm text-[var(--brand-accent)] font-medium">מסע עומק של 7 מפגשים להתפתחות אישית וזוגיות</span>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-10 space-x-reverse font-semibold text-[var(--brand-ink)]">
              <button onClick={() => scrollToSection('about')} className="relative group text-base">
                <span className="hover:text-[var(--brand-accent)] transition-colors duration-300">למה הקורס</span>
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[var(--brand-accent)] scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </button>
              <button onClick={() => scrollToSection('fit')} className="relative group text-base">
                <span className="hover:text-[var(--brand-accent)] transition-colors duration-300">למי מתאים</span>
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[var(--brand-accent)] scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </button>
              <button onClick={() => scrollToSection('program')} className="relative group text-base">
                <span className="hover:text-[var(--brand-accent)] transition-colors duration-300">תוכן עניינים</span>
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[var(--brand-accent)] scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </button>
              <button onClick={() => scrollToSection('faq')} className="relative group text-base">
                <span className="hover:text-[var(--brand-accent)] transition-colors duration-300">שאלות ותשובות</span>
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[var(--brand-accent)] scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </button>
              <button onClick={() => scrollToSection('pricing')} className="relative group text-base">
                <span className="hover:text-[var(--brand-accent)] transition-colors duration-300">מחירים</span>
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[var(--brand-accent)] scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </button>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <button
                onClick={() => scrollToSection('pricing')}
                className="text-[var(--brand-accent)] font-semibold hover:text-[var(--brand-accent-deep)] transition-colors"
              >
                הצטרפו לקורס
              </button>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-3 text-[#6a5d58] hover:text-[var(--brand-accent)] min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="פתח תפריט"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white/98 border-t border-[var(--brand-border)]/80 shadow-lg">
            <div className="px-6 py-4 space-y-3 text-right font-semibold text-[var(--brand-ink)]">
              <button onClick={() => scrollToSection('about')} className="block w-full text-right py-2 hover:text-[var(--brand-accent)] transition-colors text-base">
                למה הקורס
              </button>
              <button onClick={() => scrollToSection('fit')} className="block w-full text-right py-2 hover:text-[var(--brand-accent)] transition-colors text-base">
                למי מתאים
              </button>
              <button onClick={() => scrollToSection('program')} className="block w-full text-right py-2 hover:text-[var(--brand-accent)] transition-colors text-base">
                תוכן עניינים
              </button>
              <button onClick={() => scrollToSection('faq')} className="block w-full text-right py-2 hover:text-[var(--brand-accent)] transition-colors text-base">
                שאלות ותשובות
              </button>
              <button onClick={() => scrollToSection('pricing')} className="block w-full text-right py-2 hover:text-[var(--brand-accent)] transition-colors text-base">
                מחירים
              </button>
              <div className="pt-3">{primaryCta}</div>
            </div>
          </div>
        )}
      </nav>

      <header className="relative pt-36 pb-28 lg:pt-44 lg:pb-36 overflow-hidden grain-overlay">
        <div className="absolute inset-0">
          <div className="absolute inset-0 w-full h-full">
            <img src={heroMain} alt="זוג מול שקיעה" className="w-full h-full object-cover scale-105 blur-md opacity-40" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--brand-soft)]/60 via-[var(--brand-soft)]/70 to-[var(--brand-soft)]/95" />

          {/* Subtle decorative elements */}
          <div className="absolute -left-20 bottom-20 w-96 h-96 bg-[var(--brand-terracotta)]/10 blur-3xl blob" />
          <div className="absolute -right-20 top-20 w-80 h-80 bg-[var(--brand-accent)]/10 blur-3xl blob-alt" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10 text-[var(--brand-ink)]">
              <div className="inline-flex items-center gap-3 px-6 py-4 rounded-full bg-white/80 border-2 border-[var(--brand-border)] backdrop-blur-xl font-semibold shadow-lg animate-fade-in-up">
                <Clock className="w-6 h-6 text-[var(--brand-accent)]" />
                <span className="text-base">מסע עומק של 7 מפגשים להתפתחות אישית וזוגיות</span>
              </div>
              <h1 className="font-display font-bold leading-[1.15] animate-fade-in-up delay-100">
                בחזרה לזוגיות שבחרתי
                <span className="block text-[var(--brand-accent)] text-3xl md:text-4xl lg:text-5xl font-medium mt-6 leading-snug">
                  ליחידים בתוך זוגיות שרוצים קרבה, חיבור ומשמעות
                </span>
              </h1>
              <p className="text-xl md:text-2xl font-light max-w-2xl leading-relaxed animate-fade-in-up delay-200">
                זוגיות היא אחד הדברים הכי קסומים - וגם אחד הדברים הכי מאתגרים שנעשה בחיים.
                אבל עם הזמן… הקסם מתחלף לעיתים בשגרה, תפעול, מרחק, ריבים, עומס — ותחושה שמשהו כבר לא עובד כמו פעם.
              </p>
              <div className="flex flex-wrap gap-4 font-semibold animate-fade-in-up delay-300">
                {stats.map((stat, idx) => (
                  <span
                    key={stat.label}
                    className="inline-flex items-center gap-3 px-6 py-4 rounded-full bg-white/80 border-2 border-[var(--brand-border)] backdrop-blur-md text-base shadow-lg text-[var(--brand-ink)]"
                    style={{ animationDelay: `${0.3 + idx * 0.1}s` }}
                  >
                    <Heart className="w-6 h-6 text-[var(--brand-accent)]" />
                    <span>
                      {stat.value} · {stat.label}
                    </span>
                  </span>
                ))}
              </div>
              <div className="flex flex-col gap-4 animate-fade-in-up delay-400">
                {primaryCta}
                <button
                  onClick={() => scrollToSection('pricing')}
                  className="group flex items-center justify-center gap-2 px-6 py-4 md:px-8 md:py-5 rounded-full bg-white text-[var(--brand-ink)] font-bold text-base md:text-lg border-2 border-[var(--brand-accent)] shadow-xl hover:scale-[1.05] active:scale-95 transition-all duration-300 min-h-[44px] w-full sm:w-auto"
                >
                  <span>המסלול עם אימון אישי</span>
                  <Star className="w-5 h-5" />
                </button>
              </div>
              <button
                onClick={() => scrollToSection('cta')}
                className="group font-semibold text-[var(--brand-accent)] underline decoration-[var(--brand-accent)]/50 hover:decoration-[var(--brand-accent)] underline-offset-4 transition-all text-base animate-fade-in-up delay-500 min-h-[44px] flex items-center justify-center"
              >
                <MessageCircle className="w-5 h-5 inline-block ml-2" />
                אשמח לתאם שיחת יעוץ
              </button>
            </div>

            <div className="relative animate-fade-in-scale delay-200">
              {/* Decorative elements behind card */}
              <div className="absolute -inset-4 bg-gradient-to-br from-[var(--brand-gold)]/20 to-[var(--brand-terracotta)]/20 blur-2xl rounded-3xl opacity-60" />

              <div className="relative bg-white/98 backdrop-blur-2xl rounded-3xl shadow-2xl border-2 border-white overflow-hidden transform hover:scale-[1.03] hover:rotate-1 transition-all duration-700">
                <div className="h-80 relative overflow-hidden">
                  <img src={heroCouple} alt="זוג מחזיק ידיים" className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
                <div className="p-12 space-y-6 text-right grain-overlay">
                  <div className="flex items-center justify-between text-sm text-[var(--brand-accent)] font-semibold gap-6">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      <span>ימי שלישי · 9/12/25–13/1/26 · 10:00-13:00</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageCircle className="w-5 h-5" />
                      <span>קבוצה קטנה, מענה אישי</span>
                    </div>
                  </div>
                  <p className="text-2xl md:text-3xl font-display font-semibold text-[var(--brand-ink)] leading-snug">
                    "לא רק להבין מה קורה – אלא לחיות אחרת. לרפא את הפחדים, הפגיעויות ופצעי הילדות ולבחור מחדש בחיבור."
                  </p>
                  <div className="flex items-center gap-5 pt-4">
                    <img
                      src={michalPhoto}
                      alt="מיכל סלונים"
                      className="w-20 h-20 rounded-full object-cover border-3 border-[var(--brand-border)] shadow-xl"
                    />
                    <div className="text-base">
                      <div className="font-display font-bold text-[var(--brand-ink)] text-xl">מיכל סלונים</div>
                      <div className="font-medium text-[var(--brand-accent)]">מאמנת אישית וזוגית</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section id="about" className="relative py-24 sm:py-32 overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-[var(--brand-cream)]/30 to-white" />
        <div className="absolute top-20 right-10 w-96 h-96 bg-[var(--brand-terracotta)]/10 blur-3xl blob" />
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-[var(--brand-gold)]/10 blur-3xl blob-alt" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            <h2 className="font-display font-bold text-[var(--brand-ink)]">האם הסיטואציה מוכרת לכם?</h2>
            <p className="text-xl md:text-2xl text-[var(--brand-accent)] font-medium">כי אתם לא לבד</p>
          </div>

          <div className="mt-20 grid md:grid-cols-2 gap-8">
            {painPoints.map((item) => (
              <div
                key={item}
                className="group relative p-10 bg-white rounded-3xl shadow-lg border-2 border-[var(--brand-border)] transition-all duration-500 transform hover:-translate-y-4 hover:shadow-2xl hover:border-[var(--brand-accent)] grain-overlay"
              >
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[var(--brand-cream)]/50 via-transparent to-[var(--brand-terracotta)]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative flex items-start gap-5">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[var(--brand-accent)] to-[var(--brand-terracotta)] flex items-center justify-center shadow-lg">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-lg text-[var(--brand-ink)] leading-relaxed font-medium pt-1">{item}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="fit" className="relative py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--brand-soft)] via-white to-[var(--brand-cream)]/20" />
        <div className="absolute top-1/4 left-20 w-72 h-72 bg-[var(--brand-accent)]/8 blur-3xl blob-alt animate-pulse-glow" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-3 gap-16 items-start">
            <div className="lg:col-span-1 space-y-7">
              <p className="text-sm font-bold text-[var(--brand-accent)] uppercase tracking-[0.3em]">למי זה מתאים</p>
              <h2 className="font-display font-bold text-[var(--brand-ink)] leading-tight">למי שמרגיש ש...</h2>
              <p className="text-xl text-[var(--brand-ink)]/70 leading-relaxed">
                אם את.ה מרגיש.ה שהלב שלך מוכן לעומק נוסף – אם משהו בתוכך יודע שיש עוד שכבה לחקור, לרפא, ולבחור בה מחדש – אני מזמינה אותך להצטרף למסע הזה. לא בשביל לתקן – אלא כדי לחזור. לעצמך. ולזוגיות שבחרת.
              </p>
            </div>
            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-7">
              {fitList.map((item, idx) => (
                <div
                  key={item}
                  className="group relative p-9 bg-white rounded-3xl border-2 border-[var(--brand-border)] shadow-lg transition-all duration-500 transform hover:-translate-y-4 hover:shadow-2xl hover:border-[var(--brand-accent)] grain-overlay"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[var(--brand-accent)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative flex items-start gap-5">
                    <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-[var(--brand-accent)]/20 to-[var(--brand-terracotta)]/20 flex items-center justify-center border-2 border-[var(--brand-accent)]/30 group-hover:border-[var(--brand-accent)] transition-colors duration-300">
                      <Heart className="w-6 h-6 text-[var(--brand-accent)]" />
                    </div>
                    <p className="text-lg text-[var(--brand-ink)] leading-relaxed font-medium pt-2">{item}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28 bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto space-y-5">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-[var(--brand-ink)]">מה מחכה לך בקורס?</h2>
            <p className="text-xl md:text-2xl text-[#5a4f4b] font-light">שילוב של תהליך עומק אישי וקבוצתי, עם כלים מעולמות שונים</p>
          </div>
          <div className="mt-16 grid md:grid-cols-2 gap-8">
            {details.map((item) => (
              <div
                key={item}
                className="group p-8 bg-[var(--brand-surface)] rounded-3xl border-2 border-[var(--brand-border)] shadow-md transition-all duration-300 transform hover:-translate-y-3 hover:shadow-2xl hover:border-[var(--brand-accent)]/70"
              >
                <div className="flex items-start gap-4">
                  <Shield className="w-6 h-6 text-[var(--brand-accent)] mt-1 flex-shrink-0" />
                  <p className="text-lg text-[var(--brand-ink)] leading-relaxed font-medium">{item}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="program" className="relative py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-[var(--brand-cream)]/20 to-[var(--brand-soft)]" />
        <div className="absolute top-1/3 right-10 w-96 h-96 bg-[var(--brand-gold)]/10 blur-3xl blob animate-float" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 mb-20">
            <div className="space-y-6">
              <p className="text-sm font-bold text-[var(--brand-accent)] uppercase tracking-[0.3em]">מבנה הקורס</p>
              <h2 className="font-display font-bold text-[var(--brand-ink)] leading-tight">מבנה הקורס ותוכן עניינים</h2>
              <p className="text-xl text-[var(--brand-ink)]/70 leading-relaxed max-w-2xl">
                בקורס הזה נרד לעומק. לא רק נבין מה קורה – אלא איך אפשר לחיות אחרת, איך לרפא את המקומות שמנהלים את הקשר מתחת לפני השטח: הפחדים. הפגיעויות. דפוסי ההתקשרות. פצעי הילדות. ונלמד איך להתנהל אחרת – מעמדה חדשה של עוצמה, חמלה, קבלה ובחירה מחודשת.
              </p>
            </div>
            <div className="flex items-center gap-4 text-base font-semibold text-[var(--brand-accent)] bg-white px-8 py-5 rounded-full border-2 border-[var(--brand-border)] shadow-xl">
              <Clock className="w-6 h-6" />
              <span>21 שעות לימוד · חלל קסום בתל אביב</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {modules.map((module) => (
              <div
                key={module.title}
                className="group relative p-10 bg-white rounded-3xl shadow-lg border-2 border-[var(--brand-border)] transition-all duration-500 transform hover:-translate-y-4 hover:shadow-2xl hover:border-[var(--brand-accent)] grain-overlay"
              >
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[var(--brand-accent)]/5 via-transparent to-[var(--brand-gold)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative flex items-start justify-between mb-6 gap-4">
                  <h3 className="text-2xl font-display font-bold text-[var(--brand-ink)] leading-tight">{module.title}</h3>
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-[var(--brand-gold)]/30 to-[var(--brand-accent)]/30 flex items-center justify-center border-2 border-[var(--brand-accent)]/40 group-hover:scale-110 transition-transform duration-300">
                    <Star className="w-6 h-6 text-[var(--brand-accent)]" />
                  </div>
                </div>
                <ul className="relative space-y-4 text-base text-[var(--brand-ink)]/80">
                  {module.points.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-4">
                      <span className="mt-2 flex-shrink-0 w-2 h-2 rounded-full bg-gradient-to-br from-[var(--brand-accent)] to-[var(--brand-terracotta)]" />
                      <span className="leading-relaxed font-medium">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28 bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto space-y-5">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-[var(--brand-ink)]">תכלס... עם מה תצאו מהקורס</h2>
            <p className="text-xl md:text-2xl text-[#5a4f4b] font-light">11 שינויים משמעותיים שישאירו חותם אמיתי בחייכם</p>
          </div>
          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {outcomes.map((item, idx) => (
              <div
                key={item.title}
                className="group relative p-8 bg-[var(--brand-surface)] rounded-3xl border-2 border-[var(--brand-border)] shadow-md transition-all duration-300 transform hover:-translate-y-3 hover:shadow-2xl hover:border-[var(--brand-accent)]/80"
              >
                <div className="absolute top-4 left-4 w-12 h-12 rounded-full bg-gradient-to-br from-[var(--brand-cream)] to-[#f5d5c9] text-[var(--brand-accent)] font-bold text-lg flex items-center justify-center shadow-md">
                  {idx + 1}
                </div>
                <div className="pt-8 space-y-3">
                  <h3 className="text-xl font-bold text-[var(--brand-ink)] font-display">{item.title}</h3>
                  <p className="text-base text-[#4d413d] leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28 bg-gradient-to-b from-[var(--brand-soft)] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-display font-bold text-[var(--brand-ink)]">מיכל סלונים</h2>
              <p className="text-xl text-[#5a4f4b] leading-relaxed">
                שמי מיכל סלונים, מאמנת אישית וזוגית בשיטת סאטיה, מאמנת מנהלים וצוותים ומלווה ארגונים בתהליכי התפתחות והשבחת ההון האנושי.
              </p>
              <p className="text-xl text-[#5a4f4b] leading-relaxed">
                אני בעלת תואר ראשון במנהל עסקים, ובעברי סוכנת ביטוח במשך למעלה מעשור – עד שגיליתי את עולם האימון, והתאהבתי.
                החזון שלי הוא לאפשר לאנשים לפרוץ דרך במקומות שבהם הם מרגישים תקועים, ולהתחבר מחדש לעצמם – מתוך יציבות פנימית, אהבה וביטחון.
              </p>
              <p className="text-xl text-[#5a4f4b] leading-relaxed">
                את הקורס הזה יצרתי מתוך עשרות שיחות עם מתאמנים שמרגישים שהם "חיים ליד" – עם געגוע למה שהיה פעם, אבל לא יודעים איך לגשר על המרחק שנוצר.
                ראיתי שוב ושוב איך תקשורת נתקעת, איך פצעים ישנים מתעוררים, ואיך גם כשרק צד אחד בוחר להשתנות – משהו עמוק יכול לקרות בזוגיות.
                עם ניסיון של למעלה מעשור בעולם האימון ומאות שעות ליווי – אני מביאה לקורס הזה את כל מה שלמדתי, פגשתי וחוויתי.
                זה קורס שנולד מתוך החיים עצמם, מתוך ההקשבה למה שבאמת כואב – ומה שבאמת אפשרי.
              </p>
            </div>

            <div className="bg-[var(--brand-surface)] rounded-3xl shadow-2xl border-2 border-[var(--brand-border)] overflow-hidden transform hover:scale-[1.02] transition-transform duration-300">
              <div className="h-80">
                <img src={michalPhoto} alt="מיכל סלונים" className="w-full h-full object-cover" />
              </div>
              <div className="p-10 space-y-5">
                <div className="flex items-center gap-4 text-base text-[#5a4f4b] font-medium">
                  <Shield className="w-6 h-6 text-[var(--brand-accent)]" />
                  מאמנת אישית, זוגיות ופיתוח הון אנושי בארגון
                </div>
                <div className="text-xl text-[#4d413d] leading-relaxed font-display font-semibold">
                  "מה שבאמת אפשרי" הוא המצפן. לא עוד לחכות שהפרטנר ישתנה – אלא לבחור אחרת, מבפנים החוצה.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="relative py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-[var(--brand-cream)]/30 to-[var(--brand-soft)]" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-[var(--brand-accent)]/10 blur-3xl blob-alt" />
        <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-[var(--brand-gold)]/10 blur-3xl blob" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            <h2 className="font-display font-bold text-[var(--brand-ink)]">כמה זה עולה?</h2>
            <p className="text-xl md:text-2xl text-[var(--brand-accent)] font-medium">מחירים, בונוסים והזדמנות להעמיק עם אימון אישי.</p>
          </div>

          <div className="mt-20 grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {priceBlocks.map((block) => (
              <div
                key={block.label}
                className={`group relative p-8 md:p-10 rounded-3xl shadow-xl border-2 transition-all duration-500 transform hover:-translate-y-3 hover:shadow-2xl grain-overlay flex flex-col ${
                  block.featured
                    ? 'bg-gradient-to-br from-[var(--brand-accent)] to-[var(--brand-accent-deep)] border-[var(--brand-accent)] md:scale-105'
                    : 'bg-white border-[var(--brand-border)] hover:border-[var(--brand-accent)]'
                }`}
              >
                {block.featured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-[var(--brand-gold)] text-white font-bold text-sm rounded-full shadow-lg">
                    הכי פופולרי! 🔥
                  </div>
                )}

                {block.bonus && (
                  <div className="absolute -top-4 right-4 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-xs rounded-full shadow-lg flex items-center gap-1">
                    <Gift className="w-4 h-4" />
                    <span>בונוס במתנה</span>
                  </div>
                )}

                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                  block.featured ? 'from-white/10 to-transparent' : 'from-[var(--brand-cream)]/40 to-[var(--brand-gold)]/20'
                }`} />

                <div className="relative space-y-6">
                  <div>
                    <h3 className={`text-2xl md:text-3xl font-display font-bold mb-2 ${block.featured ? 'text-white' : 'text-[var(--brand-ink)]'}`}>
                      {block.label}
                    </h3>
                    <p className={`text-sm ${block.featured ? 'text-white/80' : 'text-[var(--brand-ink)]/60'}`}>
                      {block.note}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-end gap-3">
                      <div className={`text-5xl md:text-6xl font-black font-display ${block.featured ? 'text-white' : 'text-[var(--brand-ink)]'}`}>
                        {block.price}
                      </div>
                      {block.originalPrice && (
                        <div className={`text-2xl font-bold line-through mb-2 ${block.featured ? 'text-white/50' : 'text-[var(--brand-ink)]/40'}`}>
                          {block.originalPrice}
                        </div>
                      )}
                    </div>
                    {block.breakdown && (
                      <p className={`text-sm ${block.featured ? 'text-white/70' : 'text-[var(--brand-ink)]/60'}`}>
                        {block.breakdown}
                      </p>
                    )}
                    {block.savings && (
                      <div className={`inline-block px-4 py-2 rounded-full text-sm font-bold ${
                        block.featured ? 'bg-white/20 text-white' : 'bg-green-100 text-green-800'
                      }`}>
                        💰 חוסכים {block.savings}!
                      </div>
                    )}
                  </div>

                  <div className={`border-t pt-6 space-y-3 ${block.featured ? 'border-white/20' : 'border-[var(--brand-border)]'}`}>
                    {block.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-3">
                        <CheckCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${block.featured ? 'text-white' : 'text-[var(--brand-accent)]'}`} />
                        <span className={`text-base ${block.featured ? 'text-white/90' : 'text-[var(--brand-ink)]/80'}`}>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {block.bonus && (
                    <div className={`p-4 rounded-2xl border-2 border-dashed ${
                      block.featured ? 'bg-white/10 border-white/30' : 'bg-green-50 border-green-300'
                    }`}>
                      <div className="flex items-start gap-3">
                        <Gift className={`w-5 h-5 flex-shrink-0 ${block.featured ? 'text-white' : 'text-green-600'}`} />
                        <div className="flex-1">
                          <p className={`font-bold text-sm mb-1 ${block.featured ? 'text-white' : 'text-green-800'}`}>
                            בונוס מיוחד כלול במחיר!
                          </p>
                          <p className={`text-sm ${block.featured ? 'text-white/80' : 'text-green-700'}`}>
                            קורס "מחוברים מחדש" דיגיטלי במתנה (שווי ₪297)
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => scrollToSection('cta')}
                    className={`w-full py-5 px-6 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl ${
                      block.featured
                        ? 'bg-white text-[var(--brand-accent)] hover:bg-white/95'
                        : 'bg-gradient-to-br from-[var(--brand-accent)] to-[var(--brand-accent-deep)] text-white hover:shadow-2xl'
                    }`}
                  >
                    {block.featured ? 'הצטרפו עכשיו!' : 'הצטרפו למסלול המורחב'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-xl text-[var(--brand-accent)] text-center font-semibold bg-white/80 backdrop-blur-sm py-5 px-8 rounded-2xl border-2 border-[var(--brand-border)] shadow-lg">
            ⏰ הרשמה מוקדמת עד 29/11/25 - חיסכון עד ₪1,347!
          </div>

          <div className="mt-14 flex flex-col gap-4 max-w-2xl mx-auto">
            {primaryCta}
            <button
              onClick={() => scrollToSection('cta')}
              className="flex items-center justify-center gap-2 px-6 py-4 md:px-8 md:py-5 rounded-full bg-white text-[var(--brand-ink)] font-bold text-base md:text-lg border-2 border-[var(--brand-accent)] shadow-xl hover:scale-[1.05] active:scale-95 transition-all duration-300 min-h-[48px] w-full"
            >
              <span>המסלול עם אימון אישי</span>
              <Star className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollToSection('cta')}
              className="flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-white/95 text-[var(--brand-ink)] font-semibold text-base border-2 border-[var(--brand-border)] hover:bg-white hover:scale-[1.05] active:scale-95 transition-all duration-300 shadow-lg min-h-[48px] w-full"
            >
              <MessageCircle className="w-5 h-5" />
              <span>אשמח לתאם שיחת יעוץ</span>
            </button>
          </div>
        </div>
      </section>

      <section className="relative py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--brand-cream)]/40 via-white to-[var(--brand-soft)]" />
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-[var(--brand-accent)]/5 blur-3xl blob" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="absolute -inset-4 bg-gradient-to-br from-[var(--brand-accent)]/20 to-[var(--brand-gold)]/20 blur-2xl rounded-3xl opacity-60" />
              <img
                src={heartHands}
                alt="מחוברים מחדש"
                className="relative rounded-3xl shadow-2xl border-4 border-white w-full"
              />
            </div>

            <div className="order-1 lg:order-2 space-y-8">
              <div>
                <p className="text-sm font-bold text-[var(--brand-accent)] uppercase tracking-[0.3em] mb-4">
                  רוצים להתחיל בקורס דיגיטלי?
                </p>
                <h2 className="text-4xl md:text-5xl font-display font-bold text-[var(--brand-ink)] leading-tight mb-4">
                  קורס "מחוברים מחדש"
                </h2>
                <p className="text-xl text-[var(--brand-ink)]/70 leading-relaxed">
                  קורס דיגיטלי מקיף שיעזור לכם לחזור לקשר עם עצמכם ועם בן/בת הזוג. למדו בקצב שלכם, מהבית.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-[var(--brand-border)]">
                <div className="flex items-baseline gap-3 mb-6">
                  <div className="text-5xl font-black font-display text-[var(--brand-accent)]">₪297</div>
                  <div className="text-lg text-[var(--brand-ink)]/60">תשלום חד פעמי</div>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-[var(--brand-accent)]" />
                    <span className="text-base text-[var(--brand-ink)]/80">גישה מיידית לכל החומרים</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-[var(--brand-accent)]" />
                    <span className="text-base text-[var(--brand-ink)]/80">לימוד בקצב שלכם, בזמן שנוח לכם</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-[var(--brand-accent)]" />
                    <span className="text-base text-[var(--brand-ink)]/80">כלים מעשיים לשיפור הזוגיות</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-[var(--brand-accent)]" />
                    <span className="text-base text-[var(--brand-ink)]/80">תרגילים מודרכים ומעשיים</span>
                  </div>
                </div>

                <button
                  onClick={() => scrollToSection('cta')}
                  className="w-full py-5 px-6 rounded-full bg-gradient-to-br from-[var(--brand-accent)] to-[var(--brand-accent-deep)] text-white font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
                >
                  קנו את הקורס הדיגיטלי
                </button>

                <p className="text-sm text-[var(--brand-ink)]/60 text-center mt-4">
                  💡 הקורס הזה כלול במתנה בכל אחת מאפשרויות הקורס הפרונטלי
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="relative py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--brand-soft)] to-white" />
        <div className="absolute top-1/4 right-20 w-80 h-80 bg-[var(--brand-accent)]/8 blur-3xl blob" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-[var(--brand-ink)] mb-4">שאלות ותשובות</h2>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-3xl p-10 shadow-lg border-2 border-[var(--brand-border)] grain-overlay">
              <h3 className="text-xl font-bold text-[var(--brand-ink)] mb-4">
                האם הקורס מתאים גם אם הכל "בסך הכל בסדר", אבל יש ריבים קטנים או תחושת שחיקה?
              </h3>
              <p className="text-lg text-[var(--brand-ink)]/80 leading-relaxed">
                <strong>כן — ואפילו מומלץ.</strong><br />
                הקורס נותן כלים שמחזקים את הקשר לפני שהקשיים גדלים.
                זו הזדמנות לחדד גבולות, להעמיק תקשורת, לקבל כלים ולהחזיר חיבור- עוד לפני שמגיעים למשברים.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-10 shadow-lg border-2 border-[var(--brand-border)] grain-overlay">
              <h3 className="text-xl font-bold text-[var(--brand-ink)] mb-4">
                האם הקורס מתאים גם אם בן/בת הזוג לא משתתפים?
              </h3>
              <p className="text-lg text-[var(--brand-ink)]/80 leading-relaxed">
                <strong>בהחלט.</strong> הקורס לא מיועד לזוגות, אלא ליחידים בתוך זוגיות.<br />
                שינוי בזוגיות מתחיל בהבנה ובמודעות של מי שאנחנו. בריפוי פנימי, בעצירת האוטמטיים.<br />
                כשאחד משתנה — הדינמיקה כולה משתנה.<br />
                זה עובד פעם אחר פעם.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-10 shadow-lg border-2 border-[var(--brand-border)] grain-overlay">
              <h3 className="text-xl font-bold text-[var(--brand-ink)] mb-4">
                אין לי הרבה זמן. זה תובעני?
              </h3>
              <p className="text-lg text-[var(--brand-ink)]/80 leading-relaxed">
                <strong>ממש לא.</strong><br />
                הקורס בנוי לאנשים עם חיים מלאים: מפגשים ממוקדים, כלים פשוטים ליישום,
                ותהליכים שאפשר לשלב בשגרה בלי מאמץ :)
              </p>
            </div>

            <div className="bg-white rounded-3xl p-10 shadow-lg border-2 border-[var(--brand-border)] grain-overlay">
              <h3 className="text-xl font-bold text-[var(--brand-ink)] mb-4">
                אנחנו כבר בטיפול זוגי — זה עדיין רלוונטי?
              </h3>
              <p className="text-lg text-[var(--brand-ink)]/80 leading-relaxed">
                <strong>כן.</strong><br />
                הקורס נותן בסיס רגשי עמוק שמחזק כל תהליך זוגי.
                רבים מספרים שזה עשה סדר, שקט ובהירות.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-10 shadow-lg border-2 border-[var(--brand-border)] grain-overlay">
              <h3 className="text-xl font-bold text-[var(--brand-ink)] mb-4">
                ומה אם רק אני רוצה שינוי?
              </h3>
              <p className="text-lg text-[var(--brand-ink)]/80 leading-relaxed">
                <strong>זה מעולה.</strong> מספיק שאחד הצצדים עושה שינוי והכל משתנה.<br />
                כשהתקשורת משתנה — הצד השני מגיב אחרת, בלי לחץ או דרישה.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-10 shadow-lg border-2 border-[var(--brand-border)] grain-overlay">
              <h3 className="text-xl font-bold text-[var(--brand-ink)] mb-4">
                איפה זה ואם יש חניה?
              </h3>
              <p className="text-lg text-[var(--brand-ink)]/80 leading-relaxed">
                הקורס יהיה בחלל קסום בשכונת נוגה בתל אביב. יש ליד 2 חניונים בתשלום.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="cta" className="relative py-20 sm:py-28 pb-32 md:pb-28 overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroCouple} alt="" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#f6ddd6]/95 via-[#f9f2ef]/98 to-white/95" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-3 gap-12 items-center">
            <div className="lg:col-span-2 space-y-6">
              <p className="text-sm font-bold text-[var(--brand-accent)] uppercase tracking-[0.25em]">
                האם אתם מוכנים לצאת לדרך חדשה בזוגיות שלכם?
              </p>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-[var(--brand-ink)] leading-tight">
                להצטרף עכשיו וליצור חיבור עמוק יותר בזוגיות שלכם
              </h2>
              <p className="text-xl text-[#5a4f4b] leading-relaxed">
                מחכה לראותך אותך שם ♥
              </p>
              <div className="flex flex-wrap gap-4 text-base text-[var(--brand-ink)] font-medium">
                <span className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-white/90 border-2 border-[var(--brand-border)] shadow-md">
                  <CheckCircle className="w-5 h-5 text-[var(--brand-accent)]" />
                  7 שיעורים · 21 שעות לימוד
                </span>
                <span className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-white/90 border-2 border-[var(--brand-border)] shadow-md">
                  <Clock className="w-5 h-5 text-[var(--brand-accent)]" />
                  ימי שלישי 10:00-13:00 · ת"א
                </span>
                <span className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-white/90 border-2 border-[var(--brand-border)] shadow-md">
                  <Heart className="w-5 h-5 text-[var(--brand-accent)]" />
                  מרחב בטוח, קבוצה קטנה
                </span>
              </div>
            </div>
            <div className="bg-[var(--brand-surface)] rounded-3xl shadow-2xl border-2 border-[var(--brand-border)] p-8 space-y-5">
              <div className="flex items-center gap-3 text-base text-[#5a4f4b] font-medium">
                <MessageCircle className="w-6 h-6 text-[var(--brand-accent)]" />
                אני כאן לכל שאלה לפני תחילת המסע
              </div>
              {primaryCta}
              <button
                onClick={() => scrollToSection('pricing')}
                className="w-full py-5 px-6 rounded-full bg-white text-[var(--brand-ink)] font-bold text-base md:text-lg border-2 border-[var(--brand-accent)]/50 shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 min-h-[48px] flex items-center justify-center gap-2"
              >
                <span>המסלול עם אימון אישי</span>
                <Star className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollToSection('pricing')}
                className="w-full py-5 px-6 rounded-full bg-white/95 text-[var(--brand-ink)] font-semibold text-base md:text-lg border-2 border-[var(--brand-border)] hover:bg-white hover:scale-105 active:scale-95 transition-all duration-300 shadow-md min-h-[48px] flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                <span>אשמח לתאם שיחת יעוץ</span>
              </button>
              <p className="text-sm text-[#7a6e68] text-center font-medium leading-relaxed">
                הרשמה מוקדמת עד 29/11/25 · הקורס "מחוברים מחדש" במתנה לכל נרשם
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
