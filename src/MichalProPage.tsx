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
import michalPhoto from '../michal-photo.jpg';

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
    const angleDeg = (i / (numRays - 1)) * 180;
    const rad = (angleDeg * Math.PI) / 180;
    return {
      x1: (cx + innerR * Math.cos(rad)).toFixed(1),
      y1: (cy - innerR * Math.sin(rad)).toFixed(1),
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
      <path
        d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
        stroke={color}
        strokeWidth="1.5"
        fill="none"
      />
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

// ─── SHINE Logo (inline SVG wordmark) ─────────────────────────────────────────
function ShineLogo({
  className = '',
  light = false,
}: {
  className?: string;
  light?: boolean;
}) {
  const ink = light ? '#fff' : '#3d3431';
  const accent = '#c68a7b';
  const cx = 30, cy = 28, inner = 18, outer = 26;
  const rays = [0, 30, 60, 90, 120, 150, 180].map((deg) => {
    const rad = ((deg + 180) * Math.PI) / 180;
    return {
      x1: (cx + inner * Math.cos(rad)).toFixed(1),
      y1: (cy + inner * Math.sin(rad)).toFixed(1),
      x2: (cx + outer * Math.cos(rad)).toFixed(1),
      y2: (cy + outer * Math.sin(rad)).toFixed(1),
    };
  });

  return (
    <div className={`inline-flex flex-col items-center gap-0 ${className}`}>
      <svg
        viewBox="0 0 60 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-10 h-5"
      >
        <path d="M 6 28 A 24 24 0 0 1 54 28" stroke={accent} strokeWidth="1.8" fill="none" />
        {rays.map((ray, i) => (
          <line
            key={i}
            x1={ray.x1}
            y1={ray.y1}
            x2={ray.x2}
            y2={ray.y2}
            stroke={accent}
            strokeWidth="1.4"
          />
        ))}
      </svg>
      <span
        className="font-serif text-lg font-bold leading-none"
        style={{ color: ink, letterSpacing: '0.22em' }}
      >
        SHINE
      </span>
      <span
        className="font-sans text-[9px] font-medium uppercase mt-0.5"
        style={{
          color: light ? 'rgba(255,255,255,0.55)' : '#c68a7b',
          letterSpacing: '0.12em',
        }}
      >
        by Michal Slonim
      </span>
    </div>
  );
}

// ─── Wave Divider ──────────────────────────────────────────────────────────────
function WaveDivider({
  fromColor = '#ffffff',
  toColor = '#f8ebe7',
  flip = false,
}: {
  fromColor?: string;
  toColor?: string;
  flip?: boolean;
}) {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: '64px', marginTop: '-1px', background: toColor }}
    >
      <svg
        viewBox="0 0 1440 64"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full"
        style={{ transform: flip ? 'scaleX(-1)' : 'none' }}
      >
        <path d="M0,32 C360,64 1080,0 1440,32 L1440,0 L0,0 Z" fill={fromColor} />
      </svg>
    </div>
  );
}

// ─── Dot Grid (subtle background texture) ─────────────────────────────────────
function DotGrid({ className = '' }: { className?: string }) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        backgroundImage: 'radial-gradient(circle, #c68a7b 1px, transparent 1px)',
        backgroundSize: '28px 28px',
        opacity: 0.07,
      }}
      aria-hidden
    />
  );
}

// ─── Section Heading ──────────────────────────────────────────────────────────
function SectionHeading({
  children,
  light = false,
  subtitle,
}: {
  children: React.ReactNode;
  light?: boolean;
  subtitle?: string;
}) {
  return (
    <div className="mb-14 text-center">
      <SunRays
        className="w-20 h-10 mx-auto mb-5"
        color={light ? '#e8cfc9' : '#c68a7b'}
      />
      <h2
        className={`font-serif text-4xl md:text-5xl font-bold leading-tight ${
          light ? 'text-white' : 'text-[#3d3431]'
        }`}
      >
        {children}
      </h2>
      {subtitle && (
        <p className={`mt-3 text-base font-sans ${light ? 'text-white/55' : 'text-[#3d3431]/50'}`}>
          {subtitle}
        </p>
      )}
      <div className="mt-5 flex items-center justify-center gap-3">
        <div className={`w-8 h-px ${light ? 'bg-white/20' : 'bg-[#e8cfc9]'}`} />
        <div className={`w-2 h-2 rounded-full ${light ? 'bg-[#c68a7b]/60' : 'bg-[#c68a7b]'}`} />
        <div className={`w-8 h-px ${light ? 'bg-white/20' : 'bg-[#e8cfc9]'}`} />
      </div>
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
    <div className="group relative bg-white border border-[#e8cfc9] rounded-2xl p-6 hover:shadow-xl hover:shadow-[#c68a7b]/8 hover:-translate-y-1.5 transition-all duration-300 overflow-hidden">
      {/* Top accent gradient stripe */}
      <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-l from-transparent via-[#c68a7b]/60 to-transparent" />
      {/* Icon container */}
      <div className="w-12 h-12 rounded-2xl bg-[#f8ebe7] flex items-center justify-center mb-5 group-hover:bg-[#c68a7b] transition-colors duration-300">
        <Icon size={22} className="text-[#c68a7b] group-hover:text-white transition-colors duration-300" />
      </div>
      <h3 className="font-serif text-lg font-bold text-[#3d3431] mb-2 leading-snug">
        {title}
      </h3>
      <p className="text-sm text-[#3d3431]/55 leading-relaxed font-sans">{desc}</p>
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
    <div className="group relative bg-white rounded-2xl p-7 shadow-sm border border-[#e8cfc9] hover:border-[#c68a7b]/50 hover:shadow-lg transition-all duration-300 overflow-hidden">
      {/* Ghost number positioned absolutely behind content */}
      <div
        className="font-serif font-bold text-[#c68a7b]/10 group-hover:text-[#c68a7b]/18 transition-colors leading-none select-none absolute -top-3 -end-2 pointer-events-none"
        style={{ fontSize: '88px' }}
      >
        {num}
      </div>
      <div className="relative">
        {/* Small numbered badge */}
        <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#f8ebe7] text-[#c68a7b] font-bold text-xs mb-4 font-sans">
          {num}
        </div>
        <h3 className="font-serif text-xl font-bold text-[#3d3431] mb-2 leading-tight">
          {title}
        </h3>
        <p className="text-[#3d3431]/60 leading-relaxed text-sm font-sans">{desc}</p>
      </div>
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
          {/* Contact links — start side */}
          <div className="flex items-center gap-5 text-sm text-[#3d3431]/60">
            <a
              href="tel:052-6665061"
              className="flex items-center gap-1.5 hover:text-[#c68a7b] transition-colors font-medium font-sans"
            >
              <Phone size={13} />
              052-6665061
            </a>
            <a
              href="mailto:michal@slonim.co.il"
              className="hidden sm:flex items-center gap-1.5 hover:text-[#c68a7b] transition-colors font-sans"
            >
              <Mail size={13} />
              michal@slonim.co.il
            </a>
          </div>

          {/* SHINE Logo — end side */}
          <ShineLogo />
        </div>
      </header>

      {/* ══════════════════════════════════════════════════════════════
          HERO — full-height split panel
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col md:flex-row overflow-hidden">

        {/* Photo panel — end side (left in RTL), full height */}
        <div className="relative md:w-[45%] h-72 md:h-auto order-first md:order-last flex-shrink-0">
          <img
            src={michalPhoto}
            alt="מיכל סלונים"
            className="w-full h-full object-cover object-center"
          />
          {/* Gradient bleed toward the text panel */}
          <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-l from-transparent via-transparent to-[#faf6f3]/85" />
          {/* Dot grid texture overlay */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'radial-gradient(circle, #3d3431 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
            aria-hidden
          />
        </div>

        {/* Text panel — start side */}
        <div className="relative flex-1 flex flex-col justify-center px-8 md:px-14 lg:px-20 pt-28 md:pt-20 pb-16 bg-[#faf6f3]">
          {/* Decorative background blob */}
          <div className="absolute top-0 end-0 w-80 h-80 rounded-full bg-[#e8cfc9]/35 blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" aria-hidden />

          {/* Sun motif */}
          <SunRays className="w-24 h-12 mb-5" />

          {/* Eyebrow */}
          <span className="inline-block text-[#c68a7b] text-xs font-bold tracking-[0.2em] uppercase mb-4 font-sans">
            SHINE By Michal Slonim
          </span>

          {/* H1 — dramatic two-line display */}
          <h1 className="font-serif text-6xl sm:text-7xl lg:text-8xl font-bold leading-[1.03] mb-5 text-[#3d3431]">
            מיכל<br />סלונים
          </h1>

          {/* Tagline */}
          <p className="text-xl sm:text-2xl text-[#3d3431]/70 font-medium mb-8 leading-snug max-w-sm font-sans">
            מפתחת מנהלים ועובדים –{' '}
            <em className="font-serif not-italic text-[#c68a7b]">מבפנים החוצה</em>
          </p>

          {/* Specialty pills */}
          <div className="flex flex-wrap gap-2 mb-10">
            {['פיתוח מנהלים', 'פיתוח עובדים', 'תרבות ארגונית'].map((tag) => (
              <span
                key={tag}
                className="px-4 py-1.5 rounded-full bg-[#f8ebe7] border border-[#e8cfc9] text-[#c68a7b] text-sm font-semibold font-sans"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTA */}
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-[#c68a7b] text-white px-9 py-4 rounded-full text-base font-bold hover:bg-[#a8705f] transition-all duration-200 shadow-xl shadow-[#c68a7b]/25 hover:shadow-2xl hover:-translate-y-0.5 self-start font-sans"
          >
            בואו נדבר
          </a>
        </div>
      </section>

      {/* Wave: Hero → About */}
      <WaveDivider fromColor="#faf6f3" toColor="#ffffff" />

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

            {/* Pull quote — upgraded */}
            <div className="my-8 relative">
              <div
                className="absolute -top-4 end-2 font-serif leading-none text-[#c68a7b]/12 select-none pointer-events-none"
                style={{ fontSize: '96px' }}
                aria-hidden
              >
                "
              </div>
              <blockquote className="border-s-[3px] border-[#c68a7b] ps-7 py-4 pe-8 bg-gradient-to-l from-[#faf6f3] to-[#fde9df]/50 rounded-e-2xl">
                <p className="font-serif text-2xl text-[#3d3431] font-medium leading-relaxed">
                  אני לא מלמדת רק מיומנויות טכניות.
                </p>
                <p className="mt-2 text-sm text-[#3d3431]/50 font-sans tracking-wide">
                  — מיכל סלונים
                </p>
              </blockquote>
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

          {/* Outcome trio — with ghost number watermarks */}
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { label: 'מנהלים שמובילים בביטחון', icon: Star, num: '01' },
              { label: 'צוותים שעובדים בשיתוף פעולה', icon: Users, num: '02' },
              { label: 'ארגון שפועל מתוך בהירות ומוטיבציה', icon: TrendingUp, num: '03' },
            ].map(({ label, icon: Icon, num }) => (
              <div
                key={label}
                className="relative bg-[#faf6f3] border border-[#e8cfc9] rounded-2xl px-5 py-7 text-center overflow-hidden group hover:border-[#c68a7b]/40 hover:shadow-md transition-all duration-300"
              >
                <div className="absolute top-2 end-3 font-serif font-bold text-[#c68a7b]/8 select-none leading-none" style={{ fontSize: '48px' }}>
                  {num}
                </div>
                <Icon size={24} className="text-[#c68a7b] mx-auto mb-3" />
                <p className="text-sm font-semibold text-[#3d3431] leading-snug font-sans">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wave: About → Experience */}
      <WaveDivider fromColor="#ffffff" toColor="#f8ebe7" />

      {/* ══════════════════════════════════════════════════════════════
          EXPERIENCE — ניסיון מקצועי
      ══════════════════════════════════════════════════════════════ */}
      <section id="experience" className="py-20 bg-[#f8ebe7] relative overflow-hidden">
        <DotGrid />
        <div className="relative max-w-5xl mx-auto px-6">
          <SectionHeading>ניסיון מקצועי</SectionHeading>

          {/* 4-column stat grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-14">
            {[
              { num: '12+', label: 'שנות ניהול', sub: 'סוכנות ביטוח גדולה' },
              { num: '12+', label: 'שנות קואצ\'ינג', sub: 'ליווי אישי וזוגי' },
              { num: '20+', label: 'עובדים', sub: 'תחת ניהול ישיר' },
              { num: '∞', label: 'שינוי', sub: 'שנשאר לאורך זמן' },
            ].map((s) => (
              <div
                key={s.sub}
                className="bg-white rounded-2xl p-5 text-center shadow-sm border border-[#e8cfc9]"
              >
                <div className="font-serif text-5xl sm:text-6xl font-bold text-[#c68a7b] leading-none">
                  {s.num}
                </div>
                <div className="font-bold text-[#3d3431] text-sm mt-1.5 font-sans">{s.label}</div>
                <div className="text-xs text-[#3d3431]/45 mt-0.5 font-sans">{s.sub}</div>
              </div>
            ))}
          </div>

          {/* Styled timeline bullets */}
          <div className="space-y-4 max-w-3xl mx-auto">
            {[
              { badge: '12 שנים', text: '12 שנים כסוכנת ביטוח ומנהלת סוכנות ביטוח גדולה (כ-20 עובדים ואלפי לקוחות) – ניהול עובדים, אסטרטגיה, פיתוח תהליכים ועבודה מול מנכ"לים ובכירים במשק' },
              { badge: 'מיזוג', text: 'ליווי מכירה, מיזוג והטמעת תהליכים לאחר מכירת הסוכנות' },
              { badge: '12 שנים', text: '12 שנים מאמנת אישית וזוגית (שיטת סאטיה)' },
              { badge: 'קורס', text: 'יוצרת הקורס הדיגיטלי "מחוברים מחדש" – תקשורת וניהול קונפליקטים' },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-5 bg-white rounded-2xl px-6 py-5 shadow-sm border border-[#e8cfc9]/70 hover:border-[#c68a7b]/30 transition-colors"
              >
                <div className="flex-shrink-0 bg-[#f8ebe7] border border-[#e8cfc9] rounded-xl px-3 py-2 text-center min-w-[56px]">
                  <span className="font-serif text-sm font-bold text-[#c68a7b] leading-tight block">
                    {item.badge}
                  </span>
                </div>
                <p className="text-[#3d3431]/75 leading-relaxed text-base font-sans pt-1">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          {/* Summary callout */}
          <div className="mt-10 max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl p-7 border border-[#c68a7b]/25 text-center shadow-sm">
              <p className="font-serif text-xl text-[#3d3431] font-medium leading-relaxed">
                השילוב בין ניסיון ניהולי-ארגוני עמוק לבין עבודה אימונית ורגשית
                מאפשר לי לייצר תהליכים שמובילים לשינוי אמיתי שנשאר.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Wave: Experience → Services */}
      <WaveDivider fromColor="#f8ebe7" toColor="#ffffff" />

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

      {/* Wave: Services → Why Me */}
      <WaveDivider fromColor="#ffffff" toColor="#f8ebe7" />

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

      {/* Wave: Why Me → Footer */}
      <WaveDivider fromColor="#f8ebe7" toColor="#3d3431" />

      {/* ══════════════════════════════════════════════════════════════
          CTA / FOOTER
      ══════════════════════════════════════════════════════════════ */}
      <section
        id="contact"
        className="py-28 bg-[#3d3431] text-white relative overflow-hidden"
      >
        {/* Background glow blobs */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute top-1/2 end-0 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#c68a7b]/8 blur-3xl" />
          <div className="absolute top-0 start-1/4 w-64 h-64 rounded-full bg-[#c68a7b]/6 blur-3xl" />
        </div>
        <DotGrid />

        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <ShineLogo light className="mb-8" />

          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4 leading-tight">
            בואו נעבוד יחד
          </h2>
          <p className="text-white/45 text-xl mb-12 font-medium tracking-wide font-sans">
            לאפשר לעצמך לזרוח
          </p>

          {/* Contact buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <a
              href="tel:052-6665061"
              className="flex items-center gap-2.5 bg-white/6 hover:bg-white/12 border border-white/12 hover:border-white/25 text-white px-7 py-3.5 rounded-full transition-all duration-200 text-sm font-medium font-sans"
            >
              <Phone size={15} />
              052-6665061
            </a>
            <a
              href="mailto:michal@slonim.co.il"
              className="flex items-center gap-2.5 bg-white/6 hover:bg-white/12 border border-white/12 hover:border-white/25 text-white px-7 py-3.5 rounded-full transition-all duration-200 text-sm font-medium font-sans"
            >
              <Mail size={15} />
              michal@slonim.co.il
            </a>
          </div>

          {/* Primary CTA */}
          <a
            href="tel:052-6665061"
            className="inline-block bg-[#c68a7b] text-white px-12 py-4 rounded-full text-lg font-bold hover:bg-[#b87a6a] transition-all duration-200 shadow-2xl shadow-[#c68a7b]/25 hover:-translate-y-1 font-sans"
          >
            צרי קשר עכשיו
          </a>

          <div className="mt-16 pt-8 border-t border-white/10 text-white/30 text-xs tracking-wider font-sans">
            © 2025 מיכל סלונים &nbsp;·&nbsp; SHINE By Michal Slonim &nbsp;·&nbsp; michal@slonim.co.il
          </div>
        </div>
      </section>
    </div>
  );
}
