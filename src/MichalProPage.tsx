import React, { useState, useEffect } from 'react';
import {
  Users,
  Brain,
  Star,
  Mic,
  Heart,
  Phone,
  Mail,
  TrendingUp,
} from 'lucide-react';

// ─── Image paths ──────────────────────────────────────────────────────────────
// Add these two files to the /public folder:
//   public/michal-pro.jpg   ← the headshot photo
//   public/shine-logo.png   ← the SHINE sun logo
const MICHAL_PHOTO = '/michal-pro.jpg';
const SHINE_LOGO = '/shine-logo.png';

// ─── Sun Rays SVG ─────────────────────────────────────────────────────────────
function SunRays({
  className = '',
  color = '#c68a7b',
}: {
  className?: string;
  color?: string;
}) {
  const cx = 100,
    cy = 80,
    r = 22;
  const innerR = 22;
  const outerR = 66;
  const numRays = 11;

  const rays = Array.from({ length: numRays }, (_, i) => {
    // Spread evenly from 0° (right) → 180° (left), going through the top
    const angleDeg = (i / (numRays - 1)) * 180;
    const rad = (angleDeg * Math.PI) / 180;
    return {
      x1: (cx + innerR * Math.cos(rad)).toFixed(1),
      y1: (cy - innerR * Math.sin(rad)).toFixed(1), // SVG Y-axis inverted → "up"
      x2: (cx + outerR * Math.cos(rad)).toFixed(1),
      y2: (cy - outerR * Math.sin(rad)).toFixed(1),
    };
  });

  return (
    <svg
      viewBox="0 0 200 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      {/* Semicircle — flat edge bottom, arc going UP */}
      <path
        d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
        stroke={color}
        strokeWidth="1.5"
        fill="none"
      />
      {/* Rays */}
      {rays.map((ray, i) => (
        <line
          key={i}
          x1={ray.x1}
          y1={ray.y1}
          x2={ray.x2}
          y2={ray.y2}
          stroke={color}
          strokeWidth="1.2"
        />
      ))}
    </svg>
  );
}

// ─── Section Heading ──────────────────────────────────────────────────────────
function SectionHeading({
  children,
  light = false,
}: {
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <div className="mb-12 text-center">
      <SunRays
        className="w-16 h-8 mx-auto mb-4"
        color={light ? '#e8cfc9' : '#c68a7b'}
      />
      <h2
        className={`font-serif text-3xl md:text-4xl font-bold ${
          light ? 'text-white' : 'text-[#3d3431]'
        }`}
      >
        {children}
      </h2>
      <div
        className={`mt-4 w-10 h-0.5 mx-auto ${
          light ? 'bg-[#e8cfc9]' : 'bg-[#c68a7b]'
        }`}
      />
    </div>
  );
}

// ─── Service Card ─────────────────────────────────────────────────────────────
function ServiceCard({
  icon: Icon,
  title,
  desc,
}: {
  icon: React.ElementType;
  title: string;
  desc: string;
}) {
  return (
    <div className="group bg-white border border-[#e8cfc9] rounded-2xl p-6 hover:shadow-lg hover:shadow-[#c68a7b]/10 hover:-translate-y-1 transition-all duration-300">
      <div className="w-11 h-11 rounded-full bg-[#f8ebe7] flex items-center justify-center mb-4 group-hover:bg-[#c68a7b]/10 transition-colors">
        <Icon size={20} className="text-[#c68a7b]" />
      </div>
      <h3 className="font-semibold text-[#3d3431] text-base mb-2 leading-snug">
        {title}
      </h3>
      <p className="text-sm text-[#3d3431]/60 leading-relaxed">{desc}</p>
    </div>
  );
}

// ─── Why-Me Card ──────────────────────────────────────────────────────────────
function WhyCard({
  num,
  title,
  desc,
}: {
  num: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="group bg-white rounded-2xl p-7 shadow-sm border border-[#e8cfc9] hover:border-[#c68a7b]/40 hover:shadow-md transition-all duration-300">
      <div className="font-serif text-5xl font-bold text-[#c68a7b]/18 group-hover:text-[#c68a7b]/28 transition-colors mb-3 leading-none select-none">
        {num}
      </div>
      <h3 className="font-serif text-xl font-bold text-[#3d3431] mb-2">
        {title}
      </h3>
      <p className="text-[#3d3431]/65 leading-relaxed text-sm">{desc}</p>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function MichalProPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div dir="rtl" className="min-h-screen bg-[#faf6f3] text-[#3d3431] overflow-x-hidden">

      {/* ══════════════════════════════════════════════════════════════
          HEADER — fixed, transparent → white on scroll
      ══════════════════════════════════════════════════════════════ */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-sm shadow-sm py-3'
            : 'bg-[#faf6f3]/80 backdrop-blur-sm py-5'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          {/* Contact links — start side (right in RTL) already handled by dir */}
          <div className="flex items-center gap-5 text-sm text-[#3d3431]/60">
            <a
              href="tel:052-6665061"
              className="flex items-center gap-1.5 hover:text-[#c68a7b] transition-colors font-medium"
            >
              <Phone size={13} />
              052-6665061
            </a>
            <a
              href="mailto:michal@slonim.co.il"
              className="hidden sm:flex items-center gap-1.5 hover:text-[#c68a7b] transition-colors"
            >
              <Mail size={13} />
              michal@slonim.co.il
            </a>
          </div>

          {/* Logo — end side (left in RTL) */}
          <img
            src={SHINE_LOGO}
            alt="SHINE by Michal Slonim"
            className="h-11 w-auto"
          />
        </div>
      </header>

      {/* ══════════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative pt-28 pb-24 overflow-hidden">
        {/* Decorative background blobs */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute top-0 end-0 w-[500px] h-[500px] rounded-full bg-[#e8cfc9]/30 blur-3xl -translate-y-1/3 translate-x-1/4" />
          <div className="absolute bottom-0 start-0 w-[360px] h-[360px] rounded-full bg-[#f0ddd6]/40 blur-3xl translate-y-1/4 -translate-x-1/4" />
        </div>

        <div className="relative max-w-6xl mx-auto px-6">
          {/* Two-column layout — DOM: text first (RTL start = right), photo second (end = left) */}
          <div className="flex flex-col-reverse md:flex-row items-center gap-10 md:gap-16">

            {/* Photo — end side */}
            <div className="relative flex-shrink-0">
              {/* Slow-spinning dashed ring */}
              <div
                className="absolute inset-0 rounded-full border-2 border-dashed border-[#c68a7b]/20 scale-110"
                style={{ animation: 'spin 40s linear infinite' }}
              />
              {/* Photo frame */}
              <div className="relative w-60 h-60 sm:w-72 sm:h-72 rounded-full border border-[#c68a7b]/25 p-2.5">
                <div className="w-full h-full rounded-full overflow-hidden bg-[#e8cfc9]/40">
                  <img
                    src={MICHAL_PHOTO}
                    alt="מיכל סלונים"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
              {/* Small accent blobs */}
              <div className="absolute -top-2 start-10 w-5 h-5 rounded-full bg-[#c68a7b]/50" />
              <div className="absolute bottom-4 -end-3 w-9 h-9 rounded-full bg-[#f0ddd6]" />
            </div>

            {/* Text — start side */}
            <div className="flex-1 text-start">
              <SunRays className="w-20 h-10 mb-6" />
              <span className="inline-block text-[#c68a7b] text-xs font-bold tracking-[0.18em] uppercase mb-3">
                SHINE By Michal Slonim
              </span>
              <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-3">
                מיכל סלונים
              </h1>
              <p className="text-xl sm:text-2xl text-[#3d3431]/75 font-medium mb-5 leading-snug">
                מפתחת מנהלים ועובדים – מבפנים החוצה
              </p>
              <div className="flex flex-wrap gap-x-3 gap-y-1 items-center mb-8 text-[#c68a7b] font-semibold text-sm tracking-wide">
                <span>פיתוח מנהלים</span>
                <span className="text-[#c68a7b]/35">|</span>
                <span>עובדים</span>
                <span className="text-[#c68a7b]/35">|</span>
                <span>ארגון</span>
              </div>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 bg-[#c68a7b] text-white px-8 py-3.5 rounded-full text-base font-semibold hover:bg-[#b87a6a] transition-all duration-200 shadow-lg shadow-[#c68a7b]/25 hover:shadow-xl hover:shadow-[#c68a7b]/20 hover:-translate-y-0.5"
              >
                בואו נדבר
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          ABOUT — מי אני
      ══════════════════════════════════════════════════════════════ */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <SectionHeading>מי אני</SectionHeading>

          <div className="space-y-6 text-[#3d3431]/75 text-lg leading-[1.85]">
            <p>
              אני מלווה מנהלים ועובדים לפתח{' '}
              <strong className="text-[#3d3431] font-semibold">
                יציבות פנימית וכלים פרקטיים
              </strong>
              , כדי להתמודד בצורה בוגרת, אחראית ואפקטיבית עם עומס, לחץ,
              קונפליקטים ואתגרי ניהול.
            </p>

            {/* Pull quote */}
            <div className="border-s-4 border-[#c68a7b] ps-6 py-3 bg-[#faf6f3] rounded-e-xl">
              <p className="font-serif text-xl text-[#3d3431] font-medium">
                "אני לא מלמדת רק מיומנויות טכניות."
              </p>
            </div>

            <p>
              אני עוזרת למנהלים להבין מה קורה להם ברגעי לחץ, לזהות היכן הם
              מופעלים, לווסת את עצמם ולפעול מתוך{' '}
              <strong className="text-[#3d3431]">בהירות ולא מתוך סטרס</strong>.
            </p>

            <p>
              העבודה שלי מחברת בין מיומנויות ניהוליות לבין עומק בין-אישי ורגשי
              – תחום שלרוב אינו מקבל מענה מספק בהכשרות מקצועיות.
            </p>

            <p>
              השילוב בין מיומנויות בין-אישיות לבין כלים פרקטיים יוצר{' '}
              <strong className="text-[#3d3431]">
                שינוי התנהגותי עמוק
              </strong>{' '}
              שמחלחל לתרבות הארגונית ומחזיק לאורך זמן.
            </p>
          </div>

          {/* Outcome trio */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-5 text-center">
            {[
              { label: 'מנהלים שמובילים בביטחון', icon: Star },
              { label: 'צוותים שעובדים בשיתוף פעולה', icon: Users },
              { label: 'ארגון שפועל מתוך בהירות ומוטיבציה', icon: TrendingUp },
            ].map(({ label, icon: Icon }) => (
              <div
                key={label}
                className="bg-[#faf6f3] border border-[#e8cfc9] rounded-2xl px-5 py-6"
              >
                <Icon size={22} className="text-[#c68a7b] mx-auto mb-3" />
                <p className="text-sm font-semibold text-[#3d3431] leading-snug">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          EXPERIENCE — ניסיון מקצועי
      ══════════════════════════════════════════════════════════════ */}
      <section id="experience" className="py-20 bg-[#f8ebe7]">
        <div className="max-w-5xl mx-auto px-6">
          <SectionHeading>ניסיון מקצועי</SectionHeading>

          {/* Stat cards */}
          <div className="grid grid-cols-2 gap-4 mb-10 max-w-md mx-auto">
            {[
              { num: '12', label: 'שנים', sub: 'ניהול סוכנות ביטוח' },
              { num: '12', label: 'שנים', sub: 'ליווי וקואצ׳ינג אישי' },
            ].map((s) => (
              <div
                key={s.sub}
                className="bg-white rounded-2xl p-6 text-center shadow-sm border border-[#e8cfc9]"
              >
                <div className="font-serif text-5xl font-bold text-[#c68a7b]">
                  {s.num}
                </div>
                <div className="font-bold text-[#3d3431] text-lg">{s.label}</div>
                <div className="text-xs text-[#3d3431]/55 mt-1">{s.sub}</div>
              </div>
            ))}
          </div>

          {/* Experience bullet list */}
          <div className="space-y-3 max-w-3xl mx-auto">
            {[
              '12 שנים כסוכנת ביטוח ומנהלת סוכנות ביטוח גדולה (כ-20 עובדים ואלפי לקוחות) – ניהול עובדים, אסטרטגיה, פיתוח תהליכים ועבודה מול מנכ"לים ובכירים במשק',
              'ליווי מכירה, מיזוג והטמעת תהליכים לאחר מכירת הסוכנות',
              '12 שנים מאמנת אישית וזוגית (שיטת סאטיה)',
              'יוצרת הקורס הדיגיטלי "מחוברים מחדש" – תקשורת וניהול קונפליקטים',
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-4 bg-white rounded-xl px-5 py-4 shadow-sm border border-[#e8cfc9]/60"
              >
                <span className="flex-shrink-0 mt-2 w-2 h-2 rounded-full bg-[#c68a7b]" />
                <p className="text-[#3d3431]/75 leading-relaxed text-base">
                  {item}
                </p>
              </div>
            ))}
          </div>

          {/* Summary callout */}
          <div className="mt-10 max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl p-6 border border-[#c68a7b]/25 text-center shadow-sm">
              <p className="font-serif text-lg text-[#3d3431] font-medium leading-relaxed">
                השילוב בין ניסיון ניהולי-ארגוני עמוק לבין עבודה אימונית ורגשית
                מאפשר לי לייצר תהליכים שמובילים לשינוי אמיתי שנשאר.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          SERVICES — תחומי פעילות
      ══════════════════════════════════════════════════════════════ */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <SectionHeading>תחומי פעילות</SectionHeading>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <ServiceCard
              icon={Users}
              title="סדנאות וליווי למנהלים ולעובדים"
              desc="התמודדות עם לחץ ועומס, ניהול כעסים, חיזוק מוטיבציה והנעת עובדים"
            />
            <ServiceCard
              icon={Brain}
              title="חיבור בין ממשקים וצוותים"
              desc="שיפור תקשורת ושיתופי פעולה פנים-ארגוניים"
            />
            <ServiceCard
              icon={Star}
              title="שירות מצוין מבפנים החוצה"
              desc="פיתוח תודעת שירות דרך ניהול מודע של תגובות ודפוסים"
            />
            <ServiceCard
              icon={Heart}
              title="ליווי אישי למנהלים"
              desc="תהליך עומק אישי לפיתוח מנהיגות מתוך יציבות ובהירות"
            />
            <ServiceCard
              icon={Mic}
              title="הרצאות השראה"
              desc="חיבור בין מנהיגות, ניהול ודינמיקות אנושיות בארגון"
            />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          WHY ME — למה לבחור בי
      ══════════════════════════════════════════════════════════════ */}
      <section id="why" className="py-20 bg-[#f8ebe7]">
        <div className="max-w-4xl mx-auto px-6">
          <SectionHeading>למה לבחור בי</SectionHeading>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <WhyCard
              num="01"
              title="ניסיון רחב ומשולב"
              desc="ניסיון ניהולי, ארגוני ואימוני רחב – מהשטח ומהלב"
            />
            <WhyCard
              num="02"
              title="שילוב ייחודי"
              desc="עומק רגשי יחד עם פרקטיקה ניהולית – גישה שנדירה בתחום"
            />
            <WhyCard
              num="03"
              title="ממוקדת יישום"
              desc="גישה ממוקדת בהטמעה בשטח ולא רק בלמידה תיאורטית"
            />
            <WhyCard
              num="04"
              title="ראייה מערכתית"
              desc="ראייה מערכתית לצד פיתוח אישי – גם וגם"
            />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          CTA / FOOTER
      ══════════════════════════════════════════════════════════════ */}
      <section
        id="contact"
        className="py-24 bg-[#3d3431] text-white relative overflow-hidden"
      >
        {/* Background glow blobs */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute top-0 end-0 w-96 h-96 rounded-full bg-[#c68a7b]/12 blur-3xl" />
          <div className="absolute bottom-0 start-0 w-64 h-64 rounded-full bg-[#c68a7b]/8 blur-3xl" />
        </div>

        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <SunRays className="w-20 h-10 mx-auto mb-6" color="#c68a7b" />

          <img
            src={SHINE_LOGO}
            alt="SHINE by Michal Slonim"
            className="h-20 w-auto mx-auto mb-6 opacity-90"
          />

          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-3">
            בואו נעבוד יחד
          </h2>
          <p className="text-white/50 text-lg mb-10 font-medium tracking-wide">
            לאפשר לעצמך לזרוח
          </p>

          {/* Contact buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <a
              href="tel:052-6665061"
              className="flex items-center gap-2 bg-white/8 hover:bg-white/15 border border-white/15 text-white px-6 py-3 rounded-full transition-all duration-200 text-sm font-medium"
            >
              <Phone size={15} />
              052-6665061
            </a>
            <a
              href="mailto:michal@slonim.co.il"
              className="flex items-center gap-2 bg-white/8 hover:bg-white/15 border border-white/15 text-white px-6 py-3 rounded-full transition-all duration-200 text-sm font-medium"
            >
              <Mail size={15} />
              michal@slonim.co.il
            </a>
          </div>

          {/* Primary CTA */}
          <a
            href="tel:052-6665061"
            className="inline-block bg-[#c68a7b] text-white px-10 py-4 rounded-full text-lg font-bold hover:bg-[#b87a6a] transition-all duration-200 shadow-xl shadow-[#c68a7b]/30 hover:-translate-y-0.5"
          >
            צרי קשר עכשיו
          </a>

          {/* Footer line */}
          <div className="mt-14 pt-8 border-t border-white/10 text-white/35 text-xs tracking-wide">
            © 2025 מיכל סלונים &nbsp;|&nbsp; SHINE By Michal Slonim
            &nbsp;|&nbsp; michal@slonim.co.il
          </div>
        </div>
      </section>
    </div>
  );
}
