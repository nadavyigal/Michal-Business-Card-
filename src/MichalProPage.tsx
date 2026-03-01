import React, { useState, useEffect, useRef } from 'react';
import { Phone, Mail, Globe, GraduationCap, Instagram, Building2 } from 'lucide-react';
import michalPhoto from '../michal-photo.jpg';
import { captureEvent, trackContactClick, withBusinessCardUtm } from './analytics/posthog';

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
const BG = '#f8f0e7';
const DARK = '#35586f';
const ACCENT = '#c68479';
const LIGHT = '#f3e5d6';
const DEEP = '#27465e';
const PAGE_NAME = 'michal_business_card';
const WEBSITE_HOME_URL = withBusinessCardUtm('https://www.michalslonim.com/', 'website_home');
const CLINIC_ORGS_URL = withBusinessCardUtm(
  'https://www.michalslonim.com/%D7%A7%D7%9C%D7%99%D7%A0%D7%99%D7%A7%D7%94-%D7%9C%D7%90%D7%A8%D7%92%D7%95%D7%A0%D7%99%D7%9D-1',
  'clinic_for_organizations'
);
const ONLINE_COURSE_URL = withBusinessCardUtm('https://www.michalslonim.com/webinar-registration', 'online_course');
const INSTAGRAM_URL = 'https://www.instagram.com/michal_slonim_life_coach?igsh=MTJwZjByd2xhdm5scw%3D%3D&utm_source=qr';
const ABOUT_HIGHLIGHT: React.CSSProperties = {
  background: 'linear-gradient(180deg, rgba(198,132,121,0.16) 0%, rgba(198,132,121,0.34) 100%)',
  color: BG,
  padding: '1px 5px 2px',
  borderRadius: 4,
  fontWeight: 700,
};

// ── Page ──────────────────────────────────────────────────────────────────────
export default function MichalProPage() {
  const [scrolled, setScrolled] = useState(false);

  const trackResourceLinkClick = (resource: 'website' | 'clinic_for_organizations' | 'online_course' | 'instagram', destinationUrl: string) => {
    captureEvent('resource_link_clicked', {
      page_name: PAGE_NAME,
      property: 'business_card',
      resource,
      destination_url: destinationUrl,
    });
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    captureEvent('business_card_page_viewed', {
      page_name: PAGE_NAME,
      property: 'business_card',
      page_path: window.location.pathname,
      page_url: window.location.href,
      page_title: document.title,
    });
  }, []);

  useEffect(() => {
    const sectionIds = ['about', 'experience', 'services', 'why', 'contact'];
    const seen = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = (entry.target as HTMLElement).id;
          if (!id || seen.has(id)) return;

          seen.add(id);
          captureEvent('section_viewed', {
            page_name: PAGE_NAME,
            property: 'business_card',
            section_id: id,
          });
        });
      },
      { threshold: 0.45 }
    );

    sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const milestones = [25, 50, 75, 100];
    const reachedMilestones = new Set<number>();

    const onScrollDepth = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return;

      const depth = Math.min(100, Math.round((window.scrollY / maxScroll) * 100));
      milestones.forEach((milestone) => {
        if (depth >= milestone && !reachedMilestones.has(milestone)) {
          reachedMilestones.add(milestone);
          captureEvent('scroll_depth_reached', {
            page_name: PAGE_NAME,
            property: 'business_card',
            depth_percent: milestone,
          });
        }
      });
    };

    window.addEventListener('scroll', onScrollDepth, { passive: true });
    window.addEventListener('resize', onScrollDepth);
    onScrollDepth();
    return () => {
      window.removeEventListener('scroll', onScrollDepth);
      window.removeEventListener('resize', onScrollDepth);
    };
  }, []);

  return (
    <div
      dir="rtl"
      style={{
        minHeight: '100vh',
        overflowX: 'hidden',
        background: 'linear-gradient(180deg, #faf3ea 0%, #f7ebdf 42%, #f8f0e7 100%)',
        color: DARK,
        fontFamily: "'Assistant', sans-serif",
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
        @keyframes floatSoft {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-10px) scale(1.03); }
        }

        .ha1 { animation: fadeUp 0.85s cubic-bezier(0.16,1,0.3,1) 0.1s both; }
        .ha2 { animation: fadeUp 0.85s cubic-bezier(0.16,1,0.3,1) 0.28s both; }
        .ha3 { animation: fadeUp 0.85s cubic-bezier(0.16,1,0.3,1) 0.44s both; }
        .ha4 { animation: fadeUp 0.85s cubic-bezier(0.16,1,0.3,1) 0.58s both; }
        .ha5 { animation: fadeUp 0.85s cubic-bezier(0.16,1,0.3,1) 0.72s both; }
        .bob { animation: bob 2.4s ease-in-out infinite; }

        /* Header contact link hover */
        .hdr-link { color: rgba(53,88,112,0.56); text-decoration: none; transition: color 0.2s; }
        .hdr-link:hover { color: ${ACCENT}; }

        /* CTA buttons */
        .btn-dark {
          display: inline-flex; align-items: center; gap: 8px;
          background: linear-gradient(140deg, ${DEEP} 0%, ${DARK} 100%); color: ${BG};
          padding: 15px 32px; border-radius: 999px;
          font-size: 15px; font-weight: 700; text-decoration: none;
          box-shadow: 0 14px 30px rgba(39,70,94,0.2);
          transition: all 0.25s ease;
        }
        .btn-dark:hover { background: ${DARK}; transform: translateY(-2px); }

        .btn-ghost {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(248,240,231,0.45); color: ${DEEP};
          border: 1px solid rgba(53,88,112,0.26);
          padding: 15px 32px; border-radius: 999px;
          font-size: 15px; font-weight: 700; text-decoration: none;
          transition: all 0.25s ease;
        }
        .btn-ghost:hover { background: rgba(248,240,231,0.7); transform: translateY(-2px); }

        /* Service row hover */
        .svc-row {
          display: flex; align-items: baseline; gap: 28px;
          padding: 28px 16px;
          border-bottom: 1px solid rgba(53,88,112,0.16);
          transition: background 0.22s ease, padding-inline-start 0.22s ease;
          border-radius: 12px; cursor: default;
        }
        .svc-row:hover {
          background: rgba(198,132,121,0.1);
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
          background: linear-gradient(140deg, ${DARK} 0%, ${DEEP} 100%); color: ${BG};
          padding: 17px 42px; border-radius: 999px;
          font-size: 15px; font-weight: 700; text-decoration: none;
          letter-spacing: 0.04em;
          box-shadow: 0 16px 32px rgba(39,70,94,0.25);
          transition: all 0.25s ease;
        }
        .hero-cta:hover {
          background: linear-gradient(140deg, ${ACCENT} 0%, #b57267 100%);
          transform: translateY(-2px);
          box-shadow: 0 20px 36px rgba(198,132,121,0.34);
        }
        .hero-orb {
          position: absolute;
          border-radius: 999px;
          filter: blur(18px);
          pointer-events: none;
          animation: floatSoft 8s ease-in-out infinite;
        }

        .resource-links {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          justify-content: center;
        }
        .resource-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 11px 18px;
          border-radius: 999px;
          text-decoration: none;
          font-size: 14px;
          font-weight: 700;
          color: rgba(39,70,94,0.9);
          background: rgba(248,240,231,0.48);
          border: 1px solid rgba(39,70,94,0.25);
          backdrop-filter: blur(3px);
          transition: all 0.24s ease;
        }
        .resource-link:hover {
          transform: translateY(-2px);
          background: rgba(248,240,231,0.74);
          border-color: rgba(39,70,94,0.42);
          color: ${DEEP};
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
          background: scrolled ? 'rgba(248,240,231,0.88)' : 'transparent',
          backdropFilter: scrolled ? 'blur(14px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(53,88,112,0.18)' : 'none',
          padding: scrolled ? '11px 0' : '22px 0',
          transition: 'all 0.45s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2 }}>
            <span style={{ fontFamily: "'Assistant', sans-serif", fontSize: 11, fontWeight: 900, letterSpacing: '0.32em', color: ACCENT, textTransform: 'uppercase' }}>
              SHINE
            </span>
            <span style={{ fontSize: 9, fontWeight: 400, color: 'rgba(53,88,112,0.45)', letterSpacing: '0.08em' }}>
              by Michal Slonim
            </span>
          </div>
          {/* Contact */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <a
              href="tel:052-6665061"
              className="hdr-link"
              style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, fontWeight: 500 }}
              onClick={() => trackContactClick('phone', 'header')}
            >
              <Phone size={12} strokeWidth={2.2} />
              052-6665061
            </a>
            <a
              href="mailto:michal@slonim.co.il"
              className="hdr-link email-link"
              style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13 }}
              onClick={() => trackContactClick('email', 'header')}
            >
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
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'row',
          overflow: 'hidden',
          position: 'relative',
          background: 'linear-gradient(165deg, #faf2e8 0%, #f7e8d8 52%, #f3dcc6 100%)',
        }}
      >
        {/* Text panel — RIGHT side (start in RTL) */}
        <div
          aria-hidden
          className="hero-orb"
          style={{
            top: '14%',
            right: '33%',
            width: 280,
            height: 280,
            background: 'radial-gradient(circle, rgba(198,132,121,0.3) 0%, rgba(198,132,121,0) 70%)',
          }}
        />
        <div
          aria-hidden
          className="hero-orb"
          style={{
            bottom: '10%',
            right: '54%',
            width: 220,
            height: 220,
            background: 'radial-gradient(circle, rgba(53,88,112,0.2) 0%, rgba(53,88,112,0) 72%)',
            animationDelay: '1.5s',
          }}
        />
        <div
          className="hero-text-panel"
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '130px 68px 90px',
            background: 'linear-gradient(180deg, rgba(248,240,231,0.95) 0%, rgba(248,240,231,0.82) 100%)',
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
              fontFamily: "'Assistant', sans-serif",
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

          {/* Focus line */}
          <p
            className="ha3"
            style={{
              fontSize: 12,
              letterSpacing: '0.08em',
              color: ACCENT,
              lineHeight: 1.55,
              marginBottom: 16,
              fontWeight: 700,
            }}
          >
            פיתוח מנהלים | עובדים | ארגון
          </p>

          {/* Tagline */}
          <p
            className="ha4"
            style={{
              fontSize: 'clamp(16px, 1.7vw, 21px)',
              color: 'rgba(53,88,112,0.75)',
              lineHeight: 1.55,
              maxWidth: 340,
              marginBottom: 36,
              fontWeight: 400,
            }}
          >
            מפתחת מנהלים ועובדים – מבפנים החוצה
          </p>

          {/* CTA */}
          <div className="ha5">
            <a
              href="#contact"
              className="hero-cta"
              onClick={() =>
                captureEvent('hero_cta_clicked', {
                  page_name: PAGE_NAME,
                  property: 'business_card',
                  target_section: 'contact',
                })
              }
            >
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
          <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to right, rgba(53,88,112,0.06) 0%, transparent 48%, ${BG} 100%)` }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(39,70,94,0.22), transparent 50%)' }} />
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
      <section
        id="about"
        style={{
          background: 'linear-gradient(155deg, #2b4c64 0%, #3f6178 48%, #4f738c 100%)',
          color: BG,
          padding: '0',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(circle at 14% 24%, rgba(247,215,191,0.16) 0%, rgba(247,215,191,0) 42%), radial-gradient(circle at 85% 74%, rgba(198,132,121,0.24) 0%, rgba(198,132,121,0) 46%)',
          }}
        />
        <div className="section-inner" style={{ maxWidth: 1100, margin: '0 auto', padding: '100px 48px', position: 'relative' }}>

          <Reveal>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(198,132,121,0.7)', marginBottom: 40 }}>
              מי אני
            </p>
          </Reveal>

          {/* Large pull quote — hero of this section */}
          <Reveal delay={80}>
            <blockquote
              style={{
                fontFamily: "'Assistant', sans-serif",
                fontSize: 'clamp(24px, 3.2vw, 46px)',
                fontWeight: 400,
                lineHeight: 1.4,
                color: ACCENT,
                maxWidth: 820,
                marginBottom: 64,
                borderInlineStart: `3px solid rgba(198,132,121,0.45)`,
                paddingInlineStart: 28,
              }}
            >
              אני לא מלמדת רק מיומנויות טכניות. אני עוזרת למנהלים להבין מה קורה להם ברגעי לחץ, לזהות היכן הם מופעלים, לווסת את עצמם ולפעול מתוך בהירות.
            </blockquote>
          </Reveal>

          {/* Two-column body */}
          <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 52, marginBottom: 64 }}>
            <Reveal delay={160}>
              <div style={{ display: 'grid', gap: 20 }}>
                <p style={{ fontSize: 17, lineHeight: 1.85, color: 'rgba(248,240,231,0.66)' }}>
                  אני <span style={ABOUT_HIGHLIGHT}>מלווה מנהלים ועובדים לפתח יציבות פנימית וכלים פרקטיים</span>, כדי להתמודד בצורה בוגרת, אחראית ואפקטיבית עם עומס, לחץ, קונפליקטים ואתגרי ניהול.
                </p>
                <p style={{ fontSize: 17, lineHeight: 1.85, color: 'rgba(248,240,231,0.66)' }}>
                  בעידן שבו ה-AI מחליף את הפעולות הטכניות והלוגיות, היתרון האנושי המרכזי שנותר למנהל הוא הדיוק שלו. הערך של מנהל נמדד היום ביכולת שלו לווסת את המערכת הפנימית שלו כדי לייצר חדות, ביטחון וביצועים בשטח.
                </p>
                <p style={{ fontSize: 17, lineHeight: 1.85, color: 'rgba(248,240,231,0.66)' }}>
                  מנהלים שלא <span style={ABOUT_HIGHLIGHT}>יפתחו מיומנויות של ויסות ודיוק כירורגי מול העובדים</span> שלהם, ימצאו את עצמם שחוקים ומנוהלים על ידי הסטרס.
                </p>
              </div>
            </Reveal>
            <Reveal delay={240}>
              <div style={{ display: 'grid', gap: 20 }}>
                <p style={{ fontSize: 17, lineHeight: 1.85, color: 'rgba(248,240,231,0.66)' }}>
                  העבודה שלי <span style={ABOUT_HIGHLIGHT}>מחברת בין מיומנויות ניהוליות לבין עומק בין־אישי ורגשי</span> – תחום שלרוב אינו מקבל מענה מספק בהכשרות מקצועיות.
                </p>
                <p style={{ fontSize: 17, lineHeight: 1.85, color: 'rgba(248,240,231,0.66)' }}>
                  השילוב בין מיומנויות בין־אישיות לבין כלים פרקטיים יוצר שינוי התנהגותי עמוק שמחלחל לתרבות הארגונית ומחזיק לאורך זמן.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Outcome strip — inline, no cards */}
          <Reveal delay={320}>
            <div style={{ borderTop: '1px solid rgba(248,240,231,0.1)', paddingTop: 40, display: 'flex', gap: 40, flexWrap: 'wrap' }}>
              {['מנהלים שמובילים בביטחון', 'צוותים שעובדים בשיתוף פעולה', 'ארגון שפועל מתוך בהירות, אחריות ומוטיבציה גבוהה'].map((item) => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 5, height: 5, borderRadius: '50%', background: ACCENT, flexShrink: 0 }} />
                  <span style={{ fontSize: 14, color: 'rgba(248,240,231,0.55)', fontWeight: 500 }}>{item}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={380}>
            <div
              style={{
                marginTop: 40,
                padding: '26px 30px',
                border: '1px solid rgba(248,240,231,0.2)',
                background: 'rgba(248,240,231,0.06)',
                borderRadius: 6,
              }}
            >
              <p style={{ fontSize: 16, lineHeight: 1.85, color: 'rgba(248,240,231,0.72)' }}>
                התוכנית מבוססת על מודל ר.ו.ב שפיתחתי (ראייה, ויסות, ביצוע) – פרוטוקול עבודה המלמד מנהלים איך לזהות ברגע האמת את מה שקורה "מתחת לפני השטח" מול העובד, מול עצמם ומול צרכי הארגון. המודל מאפשר למנהל לווסת תגובות אוטומטיות ותגובתיות, ולבחור מתוך בהירות את הפעולה המדויקת ביותר לביצוע.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          EXPERIENCE — editorial stats + timeline
      ══════════════════════════════════════════════════════════════ */}
      <section id="experience" style={{ background: 'linear-gradient(180deg, #f7efe5 0%, #faf4ec 100%)', padding: 0 }}>
        <div className="section-inner" style={{ maxWidth: 1100, margin: '0 auto', padding: '100px 48px' }}>

          <Reveal>
            <h2
              style={{
                fontFamily: "'Assistant', sans-serif",
                fontSize: 'clamp(38px, 5vw, 64px)',
                fontWeight: 900,
                lineHeight: 1.05,
                color: DARK,
                marginBottom: 72,
              }}
            >
              ניסיון מקצועי
            </h2>
          </Reveal>

          {/* Timeline */}
          <div style={{ maxWidth: 680 }}>
            {[
              { badge: '12 שנים', text: '12 שנים כסוכנת ביטוח ומנהלת סוכנות ביטוח גדולה (כ־20 עובדים ואלפי לקוחות) – ניהול עובדים, אסטרטגיה, פיתוח תהליכים ועבודה מול מנכ”לים ובכירים במשק' },
              { badge: 'מיזוג', text: 'ליווי מכירה, מיזוג והטמעת תהליכים לאחר מכירת הסוכנות.' },
              { badge: '12 שנים', text: 'מאמנת אישית וזוגית בשיטת סאטיה.' },
              { badge: 'דיגיטל', text: 'יוצרת הקורס הדיגיטלי “מחוברים מחדש” – תקשורת וניהול קונפליקטים.' },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 80}>
                <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', padding: '24px 0', borderBottom: i < 3 ? '1px solid rgba(53,88,112,0.07)' : 'none' }}>
                  <span style={{ flexShrink: 0, fontSize: 11, fontWeight: 700, color: ACCENT, minWidth: 64, paddingTop: 3, letterSpacing: '0.04em' }}>
                    {item.badge}
                  </span>
                  <p style={{ fontSize: 16, lineHeight: 1.75, color: 'rgba(53,88,112,0.72)' }}>{item.text}</p>
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
              <p style={{ fontFamily: "'Assistant', sans-serif", fontSize: 'clamp(17px, 2vw, 22px)', fontWeight: 500, color: DARK, lineHeight: 1.62 }}>
                השילוב בין ניסיון ניהולי־ארגוני עמוק לבין עבודה אימונית ורגשית מאפשר לי ליצור תהליכים שמובילים לשינוי אמיתי שנשאר.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          SERVICES — editorial numbered list (no cards)
      ══════════════════════════════════════════════════════════════ */}
      <section id="services" style={{ background: 'linear-gradient(180deg, #f5e8d9 0%, #f1dfcd 100%)', padding: 0 }}>
        <div className="section-inner" style={{ maxWidth: 1100, margin: '0 auto', padding: '100px 48px' }}>

          <Reveal>
            <h2
              style={{
                fontFamily: "'Assistant', sans-serif",
                fontSize: 'clamp(38px, 4.5vw, 60px)',
                fontWeight: 900,
                lineHeight: 1.1,
                color: DARK,
                marginBottom: 56,
              }}
            >
              תחומי פעילות
            </h2>
          </Reveal>

          {[
            { num: '01', title: 'סדנאות וליווי למנהלים ולעובדים', desc: 'התמודדות עם לחץ ועומס, ניהול כעסים, חיזוק מוטיבציה, הנעת עובדים' },
            { num: '02', title: 'חיבור בין ממשקים וצוותים', desc: 'שיפור תקשורת ושיתופי פעולה פנים־ארגוניים' },
            { num: '03', title: 'שירות מצוין מבפנים החוצה', desc: 'פיתוח תודעת שירות דרך ניהול מודע של תגובות ודפוסים' },
            { num: '04', title: 'ליווי אישי למנהלים', desc: 'ליווי אישי למנהלים' },
            { num: '05', title: 'תהליכי עבודה משותפים (לצמדים או ממשקים ניהוליים)', desc: 'ליווי ממוקד לשני עובדים או יוֹתר (שותפים לניהול, ממשקים לחוצים). פתרון "פלונטרים" בתקשורת ויצירת סנכרון שחוסך זמן ואנרגיה.' },
            { num: '06', title: 'הרצאות והשראה', desc: 'חיבור בין מנהיגות, ניהול ודינמיקות אנושיות בארגון' },
          ].map((item, i) => (
            <Reveal key={i} delay={i * 60}>
              <div className="svc-row">
                <span
                  style={{
                    fontFamily: "'Assistant', sans-serif",
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
                  <h3 style={{ fontFamily: "'Assistant', sans-serif", fontSize: 'clamp(19px, 2.2vw, 27px)', fontWeight: 700, color: DARK, marginBottom: 4 }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: 14, color: 'rgba(53,88,112,0.55)', lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          WHY ME — 2×2 bordered grid, no cards
      ══════════════════════════════════════════════════════════════ */}
      <section id="why" style={{ background: 'linear-gradient(180deg, #f9f1e8 0%, #f6e8d8 100%)', padding: 0 }}>
        <div className="section-inner" style={{ maxWidth: 1100, margin: '0 auto', padding: '100px 48px' }}>

          <Reveal>
            <span style={{ display: 'block', fontSize: 10, fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', color: ACCENT, marginBottom: 52 }}>
              למה לבחור בי
            </span>
          </Reveal>

          <div className="why-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
            {[
              { title: 'ניסיון רחב', desc: 'ניסיון ניהולי, ארגוני ואימוני רחב' },
              { title: 'שילוב ייחודי', desc: 'שילוב ייחודי של עומק רגשי עם פרקטיקה ניהולית' },
              { title: 'יישום והטמעה', desc: 'גישה ממוקדת יישום והטמעה בשטח' },
              { title: 'ראייה מערכתית', desc: 'ראייה מערכתית לצד פיתוח אישי – גם וגם' },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 80}>
                <div
                  className="why-cell"
                  style={{
                    borderBottom: i < 2 ? '1px solid rgba(53,88,112,0.08)' : 'none',
                    borderInlineEnd: i % 2 === 0 ? '1px solid rgba(53,88,112,0.08)' : 'none',
                  }}
                >
                  <h3 style={{ fontFamily: "'Assistant', sans-serif", fontSize: 'clamp(20px, 2.2vw, 28px)', fontWeight: 700, color: DARK, marginBottom: 14 }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: 15, color: 'rgba(53,88,112,0.58)', lineHeight: 1.75 }}>{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          CTA / FOOTER — terracotta, warm, confident
      ══════════════════════════════════════════════════════════════ */}
      <section
        id="contact"
        style={{
          background: 'linear-gradient(150deg, #efcfb4 0%, #deaa97 50%, #c68479 100%)',
          padding: 0,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Ghost "SHINE" watermark */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: "'Assistant', sans-serif",
            fontSize: 'clamp(120px, 22vw, 280px)',
            fontWeight: 900,
            color: 'rgba(39,70,94,0.1)',
            userSelect: 'none',
            pointerEvents: 'none',
            lineHeight: 1,
          }}
        >
          SHINE
        </div>

        <div className="section-inner" style={{ maxWidth: 780, margin: '0 auto', padding: '120px 40px 80px', textAlign: 'center', position: 'relative' }}>

          <Reveal>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(39,70,94,0.66)', marginBottom: 20 }}>
              SHINE By Michal Slonim
            </p>
            <h2
              style={{
                fontFamily: "'Assistant', sans-serif",
                fontSize: 'clamp(44px, 7vw, 96px)',
                fontWeight: 900,
                lineHeight: 0.95,
                marginBottom: 16,
                color: DARK,
              }}
            >
              בואו נעבוד יחד
            </h2>
            <p style={{ fontSize: 20, color: 'rgba(39,70,94,0.72)', marginBottom: 52, fontWeight: 400 }}>
              ביחד נאפשר לך ולארגון לזרוח
            </p>
          </Reveal>

          <Reveal delay={150}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
              <a href="tel:052-6665061" className="btn-dark" onClick={() => trackContactClick('phone', 'contact_section')}>
                <Phone size={15} strokeWidth={2.2} />
                052-6665061
              </a>
              <a href="mailto:michal@slonim.co.il" className="btn-ghost" onClick={() => trackContactClick('email', 'contact_section')}>
                <Mail size={15} strokeWidth={2.2} />
                michal@slonim.co.il
              </a>
            </div>
          </Reveal>

          <Reveal delay={230}>
            <div style={{ marginTop: 22, marginBottom: 8 }}>
              <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', color: 'rgba(39,70,94,0.7)', marginBottom: 14 }}>
                לעוד תוכן
              </p>
              <div className="resource-links">
                <a
                  href={WEBSITE_HOME_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="resource-link"
                  onClick={() => trackResourceLinkClick('website', WEBSITE_HOME_URL)}
                >
                  <Globe size={15} strokeWidth={2} />
                  אתר הבית
                </a>
                <a
                  href={CLINIC_ORGS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="resource-link"
                  onClick={() => trackResourceLinkClick('clinic_for_organizations', CLINIC_ORGS_URL)}
                >
                  <Building2 size={15} strokeWidth={2} />
                  קליניקה לארגונים
                </a>
                <a
                  href={ONLINE_COURSE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="resource-link"
                  onClick={() => trackResourceLinkClick('online_course', ONLINE_COURSE_URL)}
                >
                  <GraduationCap size={15} strokeWidth={2} />
                  מחוברים מחדש - קורס דיגיטלי
                </a>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="resource-link"
                  onClick={() => trackResourceLinkClick('instagram', INSTAGRAM_URL)}
                >
                  <Instagram size={15} strokeWidth={2} />
                  אינסטגרם
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={260}>
            <div style={{ marginTop: 80, paddingTop: 28, borderTop: '1px solid rgba(39,70,94,0.22)', color: 'rgba(39,70,94,0.56)', fontSize: 12, letterSpacing: '0.04em' }}>
              © 2025 מיכל סלונים · SHINE By Michal Slonim · michal@slonim.co.il
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
