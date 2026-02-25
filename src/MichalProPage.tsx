import React, { useState, useEffect, useRef } from 'react';
import { Phone, Mail } from 'lucide-react';
import michalPhoto from '../michal-photo.jpg';

// ── Scroll-reveal hook ────────────────────────────────────────────────────────
function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

// ── Reveal wrapper ────────────────────────────────────────────────────────────
function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(26px)',
        transition: `opacity 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ── Color tokens ──────────────────────────────────────────────────────────────
const BG    = '#faf6f3';
const DARK  = '#3d3431';
const ACCENT = '#c68a7b';
const LIGHT = '#f0e8e2';

// ── Page ──────────────────────────────────────────────────────────────────────
export default function MichalProPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      dir="rtl"
      style={{
        minHeight: '100vh',
        overflowX: 'hidden',
        background: BG,
        color: DARK,
        fontFamily: "'Heebo', sans-serif",
      }}
    >
      {/* ── Global styles + keyframes ── */}
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes bob {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(8px); }
        }

        .ha1 { animation: fadeUp 0.85s cubic-bezier(0.16,1,0.3,1) 0.1s both; }
        .ha2 { animation: fadeUp 0.85s cubic-bezier(0.16,1,0.3,1) 0.28s both; }
        .ha3 { animation: fadeUp 0.85s cubic-bezier(0.16,1,0.3,1) 0.44s both; }
        .ha4 { animation: fadeUp 0.85s cubic-bezier(0.16,1,0.3,1) 0.58s both; }
        .ha5 { animation: fadeUp 0.85s cubic-bezier(0.16,1,0.3,1) 0.72s both; }
        .bob { animation: bob 2.4s ease-in-out infinite; }

        /* Header contact link hover */
        .hdr-link { color: rgba(61,52,49,0.5); text-decoration: none; transition: color 0.2s; }
        .hdr-link:hover { color: ${ACCENT}; }

        /* CTA buttons */
        .btn-dark {
          display: inline-flex; align-items: center; gap: 8px;
          background: ${DARK}; color: ${BG};
          padding: 15px 32px; border-radius: 3px;
          font-size: 15px; font-weight: 700; text-decoration: none;
          transition: all 0.25s ease;
        }
        .btn-dark:hover { background: #2a2320; transform: translateY(-2px); }

        .btn-ghost {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(61,52,49,0.1); color: ${DARK};
          border: 1px solid rgba(61,52,49,0.22);
          padding: 15px 32px; border-radius: 3px;
          font-size: 15px; font-weight: 700; text-decoration: none;
          transition: all 0.25s ease;
        }
        .btn-ghost:hover { background: rgba(61,52,49,0.18); transform: translateY(-2px); }

        /* Service row hover */
        .svc-row {
          display: flex; align-items: baseline; gap: 28px;
          padding: 28px 16px;
          border-bottom: 1px solid rgba(61,52,49,0.12);
          transition: background 0.22s ease, padding-inline-start 0.22s ease;
          border-radius: 4px; cursor: default;
        }
        .svc-row:hover {
          background: rgba(198,138,123,0.06);
          padding-inline-start: 26px;
        }

        /* Why grid cell hover */
        .why-cell {
          padding: 52px 44px;
          transition: background 0.25s ease;
        }
        .why-cell:hover { background: ${LIGHT}; }

        /* Hero CTA button */
        .hero-cta {
          display: inline-flex; align-items: center; gap: 10px;
          background: ${DARK}; color: ${BG};
          padding: 17px 40px; border-radius: 3px;
          font-size: 15px; font-weight: 700; text-decoration: none;
          letter-spacing: 0.04em;
          box-shadow: 0 8px 28px rgba(61,52,49,0.18);
          transition: all 0.25s ease;
        }
        .hero-cta:hover {
          background: ${ACCENT};
          transform: translateY(-2px);
          box-shadow: 0 14px 36px rgba(198,138,123,0.3);
        }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .hero-wrap { flex-direction: column !important; }
          .hero-photo-panel {
            width: 100% !important;
            height: 52vw !important;
            min-height: 260px;
            order: -1;
          }
          .hero-photo-panel img { object-position: center 20%; }
          .hero-text-panel {
            padding: 48px 24px 64px !important;
          }
          .hero-h1 { font-size: clamp(64px, 20vw, 100px) !important; }
          .about-grid   { grid-template-columns: 1fr !important; gap: 28px !important; }
          .stats-strip  { flex-direction: column !important; }
          .stats-strip > div {
            border-inline-end: none !important;
            border-bottom: 1px solid rgba(61,52,49,0.1) !important;
          }
          .why-grid { grid-template-columns: 1fr !important; }
          .why-cell {
            border-inline-end: none !important;
            padding: 36px 24px !important;
          }
          .section-inner { padding: 72px 24px !important; }
          .email-link { display: none !important; }
        }
      `}</style>

      {/* ══════════════════════════════════════════════════════════════
          HEADER
      ══════════════════════════════════════════════════════════════ */}
      <header
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 50,
          background: scrolled ? 'rgba(250,246,243,0.93)' : 'transparent',
          backdropFilter: scrolled ? 'blur(14px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(198,138,123,0.14)' : 'none',
          padding: scrolled ? '11px 0' : '22px 0',
          transition: 'all 0.45s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2 }}>
            <span style={{ fontFamily: "'Frank Ruhl Libre', serif", fontSize: 11, fontWeight: 900, letterSpacing: '0.32em', color: ACCENT, textTransform: 'uppercase' }}>
              SHINE
            </span>
            <span style={{ fontSize: 9, fontWeight: 400, color: 'rgba(61,52,49,0.45)', letterSpacing: '0.08em' }}>
              by Michal Slonim
            </span>
          </div>
          {/* Contact */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <a href="tel:052-6665061" className="hdr-link" style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, fontWeight: 500 }}>
              <Phone size={12} strokeWidth={2.2} />
              052-6665061
            </a>
            <a href="mailto:michal@slonim.co.il" className="hdr-link email-link" style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13 }}>
              <Mail size={12} strokeWidth={2.2} />
              michal@slonim.co.il
            </a>
          </div>
        </div>
      </header>

      {/* ══════════════════════════════════════════════════════════════
          HERO — full-height editorial split
      ══════════════════════════════════════════════════════════════ */}
      <section
        className="hero-wrap"
        style={{ minHeight: '100vh', display: 'flex', flexDirection: 'row', overflow: 'hidden', position: 'relative' }}
      >
        {/* Text panel — RIGHT side (start in RTL) */}
        <div
          className="hero-text-panel"
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '130px 68px 90px',
            background: BG,
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* Eyebrow */}
          <div
            className="ha1"
            style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', color: ACCENT, marginBottom: 28 }}
          >
            SHINE By Michal Slonim
          </div>

          {/* Name — dramatic display */}
          <h1
            className="ha2 hero-h1"
            style={{
              fontFamily: "'Frank Ruhl Libre', serif",
              fontSize: 'clamp(76px, 10.5vw, 148px)',
              fontWeight: 900,
              lineHeight: 0.92,
              color: DARK,
              marginBottom: 22,
              letterSpacing: '-0.025em',
            }}
          >
            מיכל<br />סלונים
          </h1>

          {/* Accent line */}
          <div className="ha3" style={{ width: 44, height: 2, background: ACCENT, marginBottom: 20 }} />

          {/* Tagline */}
          <p
            className="ha3"
            style={{
              fontSize: 'clamp(16px, 1.7vw, 21px)',
              color: 'rgba(61,52,49,0.62)',
              lineHeight: 1.55,
              maxWidth: 340,
              marginBottom: 36,
              fontWeight: 400,
            }}
          >
            מפתחת מנהלים ועובדים —{' '}
            <em style={{ fontFamily: "'Frank Ruhl Libre', serif", fontStyle: 'normal', color: ACCENT, fontWeight: 700 }}>
              מבפנים החוצה
            </em>
          </p>

          {/* Specialty tags */}
          <div className="ha4" style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 44 }}>
            {['פיתוח מנהלים', 'פיתוח עובדים', 'תרבות ארגונית'].map((tag) => (
              <span
                key={tag}
                style={{
                  padding: '5px 15px',
                  borderRadius: 2,
                  border: '1px solid rgba(198,138,123,0.32)',
                  color: ACCENT,
                  fontSize: 12,
                  fontWeight: 600,
                  background: 'rgba(198,138,123,0.07)',
                  letterSpacing: '0.02em',
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div className="ha5">
            <a href="#contact" className="hero-cta">
              בואו נדבר
            </a>
          </div>
        </div>

        {/* Photo panel — LEFT side (end in RTL) */}
        <div
          className="hero-photo-panel"
          style={{ width: '42%', position: 'relative', overflow: 'hidden', flexShrink: 0 }}
        >
          <img
            src={michalPhoto}
            alt="מיכל סלונים"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
          />
          {/* Fade toward text panel (physical right side) */}
          <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to right, transparent 45%, ${BG})` }} />
        </div>

        {/* Scroll cue */}
        <div
          className="bob"
          style={{
            position: 'absolute',
            bottom: 28,
            left: '50%',
            transform: 'translateX(-50%)',
            opacity: 0.25,
            fontSize: 20,
            color: DARK,
            animation: 'fadeUp 0.85s cubic-bezier(0.16,1,0.3,1) 1.1s both, bob 2.4s ease-in-out 2s infinite',
          }}
        >
          ↓
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          ABOUT — dark contrast section
      ══════════════════════════════════════════════════════════════ */}
      <section id="about" style={{ background: DARK, color: BG, padding: '0' }}>
        <div className="section-inner" style={{ maxWidth: 1100, margin: '0 auto', padding: '100px 48px' }}>

          <Reveal>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(198,138,123,0.7)', marginBottom: 40 }}>
              מי אני
            </p>
          </Reveal>

          {/* Large pull quote — hero of this section */}
          <Reveal delay={80}>
            <blockquote
              style={{
                fontFamily: "'Frank Ruhl Libre', serif",
                fontSize: 'clamp(24px, 3.2vw, 46px)',
                fontWeight: 400,
                lineHeight: 1.4,
                color: ACCENT,
                maxWidth: 820,
                marginBottom: 64,
                borderInlineStart: `3px solid rgba(198,138,123,0.45)`,
                paddingInlineStart: 28,
              }}
            >
              "אני לא מלמדת רק מיומנויות טכניות — אני עוזרת לאנשים לזהות מה עוצר אותם ולפעול מתוך בהירות."
            </blockquote>
          </Reveal>

          {/* Two-column body */}
          <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 52, marginBottom: 64 }}>
            <Reveal delay={160}>
              <p style={{ fontSize: 17, lineHeight: 1.85, color: 'rgba(250,246,243,0.62)' }}>
                אני מלווה מנהלים ועובדים לפתח{' '}
                <strong style={{ color: BG, fontWeight: 600 }}>יציבות פנימית וכלים פרקטיים</strong>
                {' '}— להתמודד בצורה בוגרת, אחראית ואפקטיבית עם עומס, לחץ, קונפליקטים ואתגרי ניהול.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <p style={{ fontSize: 17, lineHeight: 1.85, color: 'rgba(250,246,243,0.62)' }}>
                השילוב בין מיומנויות בין-אישיות לבין כלים פרקטיים יוצר{' '}
                <strong style={{ color: BG, fontWeight: 600 }}>שינוי התנהגותי עמוק</strong>
                {' '}שמחלחל לתרבות הארגונית ומחזיק לאורך זמן.
              </p>
            </Reveal>
          </div>

          {/* Outcome strip — inline, no cards */}
          <Reveal delay={320}>
            <div style={{ borderTop: '1px solid rgba(250,246,243,0.1)', paddingTop: 40, display: 'flex', gap: 40, flexWrap: 'wrap' }}>
              {['מנהלים שמובילים בביטחון', 'צוותים שעובדים בשיתוף פעולה', 'ארגון שפועל מתוך בהירות'].map((item) => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 5, height: 5, borderRadius: '50%', background: ACCENT, flexShrink: 0 }} />
                  <span style={{ fontSize: 14, color: 'rgba(250,246,243,0.55)', fontWeight: 500 }}>{item}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          EXPERIENCE — editorial stats + timeline
      ══════════════════════════════════════════════════════════════ */}
      <section id="experience" style={{ background: BG, padding: 0 }}>
        <div className="section-inner" style={{ maxWidth: 1100, margin: '0 auto', padding: '100px 48px' }}>

          <Reveal>
            <span style={{ display: 'block', fontSize: 10, fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', color: ACCENT, marginBottom: 16 }}>
              ניסיון מקצועי
            </span>
            <h2
              style={{
                fontFamily: "'Frank Ruhl Libre', serif",
                fontSize: 'clamp(38px, 5vw, 64px)',
                fontWeight: 900,
                lineHeight: 1.05,
                color: DARK,
                marginBottom: 72,
              }}
            >
              שנים של שטח.{' '}
              <span style={{ color: 'rgba(61,52,49,0.28)' }}>לא רק תיאוריה.</span>
            </h2>
          </Reveal>

          {/* Stats — horizontal editorial strip */}
          <Reveal delay={100}>
            <div
              className="stats-strip"
              style={{
                display: 'flex',
                borderTop: '1px solid rgba(61,52,49,0.1)',
                borderBottom: '1px solid rgba(61,52,49,0.1)',
                marginBottom: 72,
              }}
            >
              {[
                { num: '12+', label: 'שנות ניהול', sub: 'סוכנות ביטוח גדולה' },
                { num: '12+', label: "שנות קואצ'ינג", sub: 'ליווי אישי וזוגי' },
                { num: '20+', label: 'עובדים', sub: 'תחת ניהול ישיר' },
              ].map((s, i) => (
                <div
                  key={s.sub}
                  style={{
                    flex: 1,
                    padding: '44px 32px',
                    textAlign: 'center',
                    borderInlineEnd: i < 2 ? '1px solid rgba(61,52,49,0.1)' : 'none',
                  }}
                >
                  <div style={{ fontFamily: "'Frank Ruhl Libre', serif", fontSize: 'clamp(52px, 7vw, 92px)', fontWeight: 900, color: DARK, lineHeight: 1 }}>
                    {s.num}
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: DARK, marginTop: 8 }}>{s.label}</div>
                  <div style={{ fontSize: 12, color: 'rgba(61,52,49,0.45)', marginTop: 4 }}>{s.sub}</div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Timeline */}
          <div style={{ maxWidth: 680 }}>
            {[
              { badge: '12 שנים', text: 'כסוכנת ביטוח ומנהלת סוכנות ביטוח גדולה – ניהול כ-20 עובדים ואלפי לקוחות, אסטרטגיה, פיתוח תהליכים ועבודה מול מנכ"לים ובכירים במשק.' },
              { badge: 'מיזוג', text: 'ליווי מכירה, מיזוג והטמעת תהליכים לאחר מכירת הסוכנות.' },
              { badge: '12 שנים', text: 'מאמנת אישית וזוגית בשיטת סאטיה.' },
              { badge: 'דיגיטל', text: 'יוצרת הקורס הדיגיטלי "מחוברים מחדש" – תקשורת וניהול קונפליקטים.' },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 80}>
                <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', padding: '24px 0', borderBottom: i < 3 ? '1px solid rgba(61,52,49,0.07)' : 'none' }}>
                  <span style={{ flexShrink: 0, fontSize: 11, fontWeight: 700, color: ACCENT, minWidth: 64, paddingTop: 3, letterSpacing: '0.04em' }}>
                    {item.badge}
                  </span>
                  <p style={{ fontSize: 16, lineHeight: 1.75, color: 'rgba(61,52,49,0.72)' }}>{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Summary callout */}
          <Reveal delay={200}>
            <div
              style={{
                marginTop: 56,
                padding: '28px 36px',
                background: LIGHT,
                borderRadius: 4,
                borderInlineStart: `3px solid ${ACCENT}`,
              }}
            >
              <p style={{ fontFamily: "'Frank Ruhl Libre', serif", fontSize: 'clamp(17px, 2vw, 22px)', fontWeight: 500, color: DARK, lineHeight: 1.62 }}>
                השילוב בין ניסיון ניהולי-ארגוני עמוק לבין עבודה אימונית ורגשית מאפשר לי לייצר תהליכים שמובילים לשינוי אמיתי שנשאר.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          SERVICES — editorial numbered list (no cards)
      ══════════════════════════════════════════════════════════════ */}
      <section id="services" style={{ background: LIGHT, padding: 0 }}>
        <div className="section-inner" style={{ maxWidth: 1100, margin: '0 auto', padding: '100px 48px' }}>

          <Reveal>
            <span style={{ display: 'block', fontSize: 10, fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', color: ACCENT, marginBottom: 16 }}>
              תחומי פעילות
            </span>
            <h2
              style={{
                fontFamily: "'Frank Ruhl Libre', serif",
                fontSize: 'clamp(38px, 4.5vw, 60px)',
                fontWeight: 900,
                lineHeight: 1.1,
                color: DARK,
                marginBottom: 56,
              }}
            >
              מה אני מציעה
            </h2>
          </Reveal>

          {[
            { num: '01', title: 'סדנאות וליווי למנהלים ועובדים', desc: 'התמודדות עם לחץ ועומס, ניהול כעסים, חיזוק מוטיבציה והנעת עובדים' },
            { num: '02', title: 'חיבור בין ממשקים וצוותים', desc: 'שיפור תקשורת ושיתופי פעולה פנים-ארגוניים' },
            { num: '03', title: 'שירות מצוין מבפנים החוצה', desc: 'פיתוח תודעת שירות דרך ניהול מודע של תגובות ודפוסים' },
            { num: '04', title: 'ליווי אישי למנהלים', desc: 'תהליך עומק אישי לפיתוח מנהיגות מתוך יציבות ובהירות' },
            { num: '05', title: 'הרצאות השראה', desc: 'חיבור בין מנהיגות, ניהול ודינמיקות אנושיות בארגון' },
          ].map((item, i) => (
            <Reveal key={i} delay={i * 60}>
              <div className="svc-row">
                <span
                  style={{
                    fontFamily: "'Frank Ruhl Libre', serif",
                    fontSize: 12,
                    color: ACCENT,
                    fontWeight: 700,
                    minWidth: 28,
                    letterSpacing: '0.04em',
                    flexShrink: 0,
                  }}
                >
                  {item.num}
                </span>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontFamily: "'Frank Ruhl Libre', serif", fontSize: 'clamp(19px, 2.2vw, 27px)', fontWeight: 700, color: DARK, marginBottom: 4 }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: 14, color: 'rgba(61,52,49,0.55)', lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          WHY ME — 2×2 bordered grid, no cards
      ══════════════════════════════════════════════════════════════ */}
      <section id="why" style={{ background: BG, padding: 0 }}>
        <div className="section-inner" style={{ maxWidth: 1100, margin: '0 auto', padding: '100px 48px' }}>

          <Reveal>
            <span style={{ display: 'block', fontSize: 10, fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', color: ACCENT, marginBottom: 52 }}>
              למה לבחור בי
            </span>
          </Reveal>

          <div className="why-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
            {[
              { title: 'ניסיון רחב ומשולב', desc: 'ניסיון ניהולי, ארגוני ואימוני רחב – מהשטח ומהלב. לא מלמדת את מה שלא חייתי.' },
              { title: 'שילוב ייחודי', desc: 'עומק רגשי יחד עם פרקטיקה ניהולית – גישה שנדירה בתחום ומייצרת תוצאות שנשארות.' },
              { title: 'ממוקדת יישום', desc: 'גישה ממוקדת בהטמעה בשטח ולא רק בלמידה תיאורטית. השינוי קורה כאן ועכשיו.' },
              { title: 'ראייה מערכתית', desc: 'ראייה מערכתית לצד פיתוח אישי – גם וגם, ולא בחירה בין השניים.' },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 80}>
                <div
                  className="why-cell"
                  style={{
                    borderBottom: i < 2 ? '1px solid rgba(61,52,49,0.08)' : 'none',
                    borderInlineEnd: i % 2 === 0 ? '1px solid rgba(61,52,49,0.08)' : 'none',
                  }}
                >
                  <h3 style={{ fontFamily: "'Frank Ruhl Libre', serif", fontSize: 'clamp(20px, 2.2vw, 28px)', fontWeight: 700, color: DARK, marginBottom: 14 }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: 15, color: 'rgba(61,52,49,0.58)', lineHeight: 1.75 }}>{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          CTA / FOOTER — terracotta, warm, confident
      ══════════════════════════════════════════════════════════════ */}
      <section id="contact" style={{ background: ACCENT, padding: 0, position: 'relative', overflow: 'hidden' }}>
        {/* Ghost "SHINE" watermark */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: "'Frank Ruhl Libre', serif",
            fontSize: 'clamp(120px, 22vw, 280px)',
            fontWeight: 900,
            color: 'rgba(61,52,49,0.055)',
            userSelect: 'none',
            pointerEvents: 'none',
            lineHeight: 1,
          }}
        >
          SHINE
        </div>

        <div className="section-inner" style={{ maxWidth: 780, margin: '0 auto', padding: '120px 40px 80px', textAlign: 'center', position: 'relative' }}>

          <Reveal>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(61,52,49,0.55)', marginBottom: 20 }}>
              SHINE By Michal Slonim
            </p>
            <h2
              style={{
                fontFamily: "'Frank Ruhl Libre', serif",
                fontSize: 'clamp(44px, 7vw, 96px)',
                fontWeight: 900,
                lineHeight: 0.95,
                marginBottom: 16,
                color: DARK,
              }}
            >
              בואו נעבוד יחד
            </h2>
            <p style={{ fontSize: 20, color: 'rgba(61,52,49,0.62)', marginBottom: 52, fontWeight: 400 }}>
              לאפשר לעצמך לזרוח
            </p>
          </Reveal>

          <Reveal delay={150}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
              <a href="tel:052-6665061" className="btn-dark">
                <Phone size={15} strokeWidth={2.2} />
                052-6665061
              </a>
              <a href="mailto:michal@slonim.co.il" className="btn-ghost">
                <Mail size={15} strokeWidth={2.2} />
                michal@slonim.co.il
              </a>
            </div>
          </Reveal>

          <Reveal delay={260}>
            <div style={{ marginTop: 80, paddingTop: 28, borderTop: '1px solid rgba(61,52,49,0.15)', color: 'rgba(61,52,49,0.42)', fontSize: 12, letterSpacing: '0.04em' }}>
              © 2025 מיכל סלונים · SHINE By Michal Slonim · michal@slonim.co.il
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
