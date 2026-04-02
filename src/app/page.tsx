'use client'

import { useState, useEffect, useRef } from 'react'

// ─── Colours ───────────────────────────────────────────────────────────────────
const C = {
  bg: '#05080f',
  bg2: '#080c17',
  bg3: '#0b1020',
  navy: '#0d1426',
  gold: '#c9a84c',
  goldLight: '#e0bf76',
  goldDim: 'rgba(201,168,76,0.12)',
  goldBorder: 'rgba(201,168,76,0.25)',
  text: '#e8e4d8',
  muted: '#7a7870',
  divider: 'rgba(232,228,216,0.08)',
}

// ─── Demo Banner ───────────────────────────────────────────────────────────────
function DemoBanner() {
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999,
      background: C.gold, color: '#05080f',
      textAlign: 'center', padding: '8px',
      fontSize: '12px', fontWeight: 700,
      letterSpacing: '0.08em', textTransform: 'uppercase',
      fontFamily: "'Inter', Arial, sans-serif",
    }}>
      Demo Site — Built by Derry Digital &nbsp;|&nbsp; derrydigital.co.uk
    </div>
  )
}

// ─── Navigation ────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const links = ['Services', 'About', 'Our Team', 'Contact']

  return (
    <>
      <style>{`
        @media (min-width: 768px) { .harkin-hamburger { display: none !important; } }
        @media (max-width: 767px) { .harkin-desktop-links { display: none !important; } }
      `}</style>

      <nav style={{
        position: 'fixed', top: '40px', left: 0, right: 0, zIndex: 999,
        background: scrolled ? 'rgba(5,8,15,0.97)' : 'rgba(5,8,15,0.7)',
        backdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${scrolled ? C.goldBorder : 'transparent'}`,
        transition: 'background 0.3s, border-color 0.3s',
      }}>
        <div style={{
          maxWidth: '1200px', margin: '0 auto',
          padding: '0 24px', height: '72px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          {/* Logo */}
          <a href="#" style={{ textDecoration: 'none' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <div style={{
                fontFamily: 'Georgia, serif', fontWeight: 700,
                fontSize: '18px', color: C.text, letterSpacing: '0.03em',
              }}>
                Harkin <span style={{ color: C.gold }}>&amp;</span> Associates
              </div>
              <div style={{
                fontFamily: "'Inter', Arial, sans-serif",
                fontSize: '10px', color: C.muted,
                letterSpacing: '0.2em', textTransform: 'uppercase',
              }}>
                Solicitors · Derry
              </div>
            </div>
          </a>

          {/* Desktop links */}
          <div className="harkin-desktop-links" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {links.map(l => (
              <a
                key={l}
                href={`#${l.toLowerCase().replace(' ', '-')}`}
                style={{
                  fontFamily: "'Inter', Arial, sans-serif", fontSize: '13px',
                  color: C.muted, textDecoration: 'none',
                  padding: '8px 16px', letterSpacing: '0.04em',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = C.text)}
                onMouseLeave={e => (e.currentTarget.style.color = C.muted)}
              >
                {l}
              </a>
            ))}
            <a
              href="#contact"
              style={{
                fontFamily: "'Inter', Arial, sans-serif",
                fontSize: '13px', fontWeight: 600,
                color: '#05080f', background: C.gold,
                padding: '10px 24px', textDecoration: 'none',
                letterSpacing: '0.06em',
                transition: 'background 0.2s, transform 0.15s',
                marginLeft: '8px',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = C.goldLight; e.currentTarget.style.transform = 'translateY(-1px)' }}
              onMouseLeave={e => { e.currentTarget.style.background = C.gold; e.currentTarget.style.transform = 'none' }}
            >
              Free Consultation
            </a>
          </div>

          {/* Hamburger */}
          <button
            className="harkin-hamburger"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              padding: '8px', display: 'flex', flexDirection: 'column', gap: '5px', zIndex: 1001,
            }}
          >
            <span style={{
              display: 'block', width: '26px', height: '2px', background: open ? C.gold : C.text,
              transition: 'transform 0.3s, background 0.3s',
              transform: open ? 'translateY(7px) rotate(45deg)' : 'none',
            }} />
            <span style={{
              display: 'block', width: '26px', height: '2px', background: open ? C.gold : C.text,
              transition: 'opacity 0.3s, background 0.3s',
              opacity: open ? 0 : 1,
            }} />
            <span style={{
              display: 'block', width: '26px', height: '2px', background: open ? C.gold : C.text,
              transition: 'transform 0.3s, background 0.3s',
              transform: open ? 'translateY(-7px) rotate(-45deg)' : 'none',
            }} />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 998,
        background: '#05080f',
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-start',
        padding: '130px 40px 40px',
        opacity: open ? 1 : 0,
        transform: open ? 'none' : 'translateY(-16px)',
        transition: 'opacity 0.35s ease, transform 0.35s ease',
        pointerEvents: open ? 'all' : 'none',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {links.map((l, i) => (
            <a
              key={l}
              href={`#${l.toLowerCase().replace(' ', '-')}`}
              onClick={() => setOpen(false)}
              style={{
                fontFamily: 'Georgia, serif', fontWeight: 700,
                fontSize: 'clamp(36px, 7vw, 60px)', color: C.text,
                textDecoration: 'none', lineHeight: 1.1,
                letterSpacing: '-0.01em',
                borderBottom: `1px solid ${C.divider}`,
                paddingBottom: '16px', paddingTop: '16px',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = C.gold)}
              onMouseLeave={e => (e.currentTarget.style.color = C.text)}
            >
              {l}
            </a>
          ))}
        </div>
        <div style={{ marginTop: '40px', borderTop: `1px solid ${C.goldBorder}`, paddingTop: '28px' }}>
          <p style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: '12px', color: C.gold, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '8px' }}>Get in touch</p>
          <p style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: '15px', color: C.text }}>+44 28 7126 0000</p>
          <p style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: '15px', color: C.text }}>hello@harkinassociates.co.uk</p>
        </div>
      </div>
    </>
  )
}

// ─── Hero ──────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section style={{
      minHeight: '100vh',
      background: `linear-gradient(to right, rgba(5,8,15,0.88) 0%, rgba(5,8,15,0.7) 40%, rgba(5,8,15,0.4) 70%, rgba(5,8,15,0.2) 100%), url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1600&q=80') center/cover no-repeat`,
      display: 'flex', alignItems: 'center',
      paddingTop: '112px',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Subtle gold radial accent */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `radial-gradient(ellipse 80% 60% at 70% 50%, rgba(201,168,76,0.05) 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />
      {/* Thin vertical line */}
      <div style={{
        position: 'absolute', top: 0, left: '8%',
        width: '1px', height: '100%',
        background: `linear-gradient(180deg, transparent 0%, ${C.goldBorder} 40%, transparent 100%)`,
      }} />

      <div style={{
        position: 'relative', zIndex: 1,
        maxWidth: '1200px', margin: '0 auto',
        padding: '80px 32px', width: '100%',
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: '80px', alignItems: 'center',
      }}>
        {/* Left */}
        <div>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            marginBottom: '32px',
          }}>
            <div style={{ width: '24px', height: '1px', background: C.gold }} />
            <span style={{
              fontFamily: "'Inter', Arial, sans-serif",
              fontSize: '11px', color: C.gold,
              letterSpacing: '0.25em', textTransform: 'uppercase',
            }}>Established 1998 · Derry, Northern Ireland</span>
          </div>

          <h1 style={{
            fontFamily: 'Georgia, serif', fontWeight: 400,
            fontSize: 'clamp(40px, 5vw, 68px)',
            color: C.text, lineHeight: 1.15,
            letterSpacing: '-0.01em', marginBottom: '24px',
          }}>
            Legal Advice You<br />
            <span style={{ color: C.gold, fontStyle: 'italic' }}>Can Rely On</span>
          </h1>

          <p style={{
            fontFamily: "'Inter', Arial, sans-serif",
            fontSize: '16px', color: C.muted,
            lineHeight: 1.75, marginBottom: '48px',
            maxWidth: '460px',
          }}>
            Harkin & Associates has served individuals, families and businesses across Derry and the North West for over 25 years. Clear advice. Practical outcomes. No jargon.
          </p>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <a
              href="#contact"
              style={{
                fontFamily: "'Inter', Arial, sans-serif",
                fontWeight: 600, fontSize: '13px',
                color: '#05080f', background: C.gold,
                padding: '16px 36px', textDecoration: 'none',
                letterSpacing: '0.06em',
                transition: 'background 0.2s, transform 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = C.goldLight; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.background = C.gold; e.currentTarget.style.transform = 'none' }}
            >
              Book a Free Consultation
            </a>
            <a
              href="#services"
              style={{
                fontFamily: "'Inter', Arial, sans-serif",
                fontWeight: 500, fontSize: '13px',
                color: C.text,
                padding: '16px 36px', textDecoration: 'none',
                letterSpacing: '0.06em',
                border: `1px solid ${C.divider}`,
                transition: 'border-color 0.2s, color 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = C.goldBorder; e.currentTarget.style.color = C.gold }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = C.divider; e.currentTarget.style.color = C.text }}
            >
              Our Services
            </a>
          </div>
        </div>

        {/* Right — photo + panel */}
        <div style={{ position: 'relative' }}>
          {/* Background photo */}
          <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
            <img
              src="https://images.unsplash.com/photo-1521791055366-0d553872952f?auto=format&fit=crop&w=900&q=80"
              alt="Legal library"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', opacity: 0.18 }}
            />
          </div>
          <div style={{
            background: 'rgba(8,12,23,0.88)',
            border: `1px solid ${C.goldBorder}`,
            padding: '48px',
            position: 'relative',
          }}>
            {/* Corner accents */}
            {[
              { top: '-1px', left: '-1px', borderRight: 'none', borderBottom: 'none' },
              { top: '-1px', right: '-1px', borderLeft: 'none', borderBottom: 'none' },
              { bottom: '-1px', left: '-1px', borderRight: 'none', borderTop: 'none' },
              { bottom: '-1px', right: '-1px', borderLeft: 'none', borderTop: 'none' },
            ].map((style, i) => (
              <div key={i} style={{
                position: 'absolute', width: '20px', height: '20px',
                border: `2px solid ${C.gold}`, ...style,
              }} />
            ))}

            <p style={{
              fontFamily: 'Georgia, serif', fontStyle: 'italic',
              fontSize: '20px', color: C.text, lineHeight: 1.6,
              marginBottom: '32px',
            }}>
              "We don't just tell you what the law says — we help you understand what it means for you, and what to do next."
            </p>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '16px',
              paddingTop: '24px', borderTop: `1px solid ${C.divider}`,
            }}>
              <div style={{
                width: '48px', height: '48px',
                border: `1px solid ${C.goldBorder}`,
                overflow: 'hidden', borderRadius: '4px',
                flexShrink: 0,
              }}>
                <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&w=100&q=80" alt="Pádraig Harkin" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }} />
              </div>
              <div>
                <div style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: '14px', fontWeight: 600, color: C.text }}>Pádraig Harkin</div>
                <div style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: '12px', color: C.muted }}>Senior Partner, Harkin & Associates</div>
              </div>
            </div>

            {/* Stats */}
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr',
              gap: '1px', background: C.divider,
              marginTop: '40px',
            }}>
              {[
                { n: '25+', label: 'Years of Practice' },
                { n: '3,000+', label: 'Cases Handled' },
                { n: '6', label: 'Qualified Solicitors' },
                { n: '98%', label: 'Client Satisfaction' },
              ].map(stat => (
                <div key={stat.n} style={{
                  background: C.bg3, padding: '20px',
                  textAlign: 'center',
                }}>
                  <div style={{
                    fontFamily: 'Georgia, serif', fontWeight: 700,
                    fontSize: '26px', color: C.gold, lineHeight: 1,
                    marginBottom: '4px',
                  }}>{stat.n}</div>
                  <div style={{
                    fontFamily: "'Inter', Arial, sans-serif",
                    fontSize: '10px', color: C.muted,
                    letterSpacing: '0.1em', textTransform: 'uppercase',
                  }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Practice Areas ────────────────────────────────────────────────────────────
const practiceAreas = [
  {
    num: 'I',
    title: 'Property Law',
    desc: 'Residential and commercial conveyancing, landlord and tenant disputes, boundary issues, and property transfers across Northern Ireland.',
    items: ['Residential Conveyancing', 'Commercial Property', 'Landlord & Tenant', 'Land Registry'],
  },
  {
    num: 'II',
    title: 'Family Law',
    desc: 'Sensitive support for divorce, separation, child arrangements, adoption, and domestic matters. We handle each case with discretion and care.',
    items: ['Divorce & Separation', 'Child Arrangements', 'Financial Settlements', 'Adoption'],
  },
  {
    num: 'III',
    title: 'Wills & Probate',
    desc: 'Helping you protect your estate and your family\'s future. We draft clear, legally sound wills and manage probate administration efficiently.',
    items: ['Will Drafting', 'Probate Administration', 'Powers of Attorney', 'Estate Planning'],
  },
  {
    num: 'IV',
    title: 'Employment Law',
    desc: 'Representing employees and employers alike in disputes, contracts, redundancy, discrimination claims, and workplace tribunal proceedings.',
    items: ['Unfair Dismissal', 'Discrimination Claims', 'Employment Contracts', 'Tribunal Representation'],
  },
  {
    num: 'V',
    title: 'Commercial Law',
    desc: 'Legal support for start-ups and established businesses — contracts, disputes, company formation, and ongoing business advisory.',
    items: ['Business Contracts', 'Company Formation', 'Commercial Disputes', 'Partnership Agreements'],
  },
  {
    num: 'VI',
    title: 'Personal Injury',
    desc: 'No-win, no-fee representation for road traffic accidents, workplace injuries, public liability, and medical negligence claims.',
    items: ['Road Traffic Accidents', 'Workplace Injuries', 'Public Liability', 'Medical Negligence'],
  },
]

function Services() {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section id="services" style={{
      background: C.bg2, padding: '120px 32px',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Section header */}
        <div style={{ marginBottom: '72px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{ width: '32px', height: '1px', background: C.gold }} />
            <span style={{
              fontFamily: "'Inter', Arial, sans-serif",
              fontSize: '11px', color: C.gold,
              letterSpacing: '0.25em', textTransform: 'uppercase',
            }}>Practice Areas</span>
          </div>
          <h2 style={{
            fontFamily: 'Georgia, serif', fontWeight: 400,
            fontSize: 'clamp(32px, 4vw, 52px)', color: C.text,
            lineHeight: 1.2, marginBottom: '16px',
          }}>
            How We Can <span style={{ color: C.gold, fontStyle: 'italic' }}>Help You</span>
          </h2>
          <p style={{
            fontFamily: "'Inter', Arial, sans-serif",
            fontSize: '15px', color: C.muted, lineHeight: 1.7,
            maxWidth: '540px',
          }}>
            Whether you're buying your first home, navigating a divorce, or protecting your business — we have the expertise to guide you through.
          </p>
        </div>

        {/* Cards grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '1px', background: C.divider,
        }}>
          {practiceAreas.map((area, i) => (
            <div
              key={i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: hovered === i ? C.bg3 : C.bg2,
                padding: '40px 36px',
                transition: 'background 0.2s',
                cursor: 'default',
              }}
            >
              <div style={{
                fontFamily: 'Georgia, serif', fontStyle: 'italic',
                fontSize: '13px', color: C.gold, letterSpacing: '0.15em',
                marginBottom: '20px', opacity: 0.8,
              }}>{area.num}</div>
              <h3 style={{
                fontFamily: 'Georgia, serif', fontWeight: 400,
                fontSize: '22px', color: hovered === i ? C.gold : C.text,
                marginBottom: '12px', transition: 'color 0.2s',
              }}>{area.title}</h3>
              <p style={{
                fontFamily: "'Inter', Arial, sans-serif",
                fontSize: '14px', color: C.muted, lineHeight: 1.7,
                marginBottom: '24px',
              }}>{area.desc}</p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {area.items.map(item => (
                  <li key={item} style={{
                    fontFamily: "'Inter', Arial, sans-serif",
                    fontSize: '12px', color: C.muted,
                    letterSpacing: '0.04em',
                    display: 'flex', alignItems: 'center', gap: '8px',
                  }}>
                    <span style={{ color: C.gold, fontSize: '8px' }}>◆</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── About ─────────────────────────────────────────────────────────────────────
function About() {
  const values = [
    { title: 'Clarity', desc: 'We communicate in plain English. No unnecessary legal jargon — just clear, honest advice.' },
    { title: 'Integrity', desc: 'We tell you what you need to hear, not just what you want to hear. Your best interests always come first.' },
    { title: 'Commitment', desc: 'We see every case through. From your first consultation to final resolution, we\'re with you every step.' },
    { title: 'Community', desc: 'Proudly rooted in Derry. We\'ve served families and businesses in this city and region for over 25 years.' },
  ]

  return (
    <section id="about" style={{
      background: C.bg, padding: '120px 32px',
    }}>
      <div style={{
        maxWidth: '1200px', margin: '0 auto',
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: '96px', alignItems: 'start',
      }}>
        {/* Left */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{ width: '32px', height: '1px', background: C.gold }} />
            <span style={{
              fontFamily: "'Inter', Arial, sans-serif",
              fontSize: '11px', color: C.gold,
              letterSpacing: '0.25em', textTransform: 'uppercase',
            }}>About the Firm</span>
          </div>
          <h2 style={{
            fontFamily: 'Georgia, serif', fontWeight: 400,
            fontSize: 'clamp(32px, 4vw, 48px)', color: C.text,
            lineHeight: 1.2, marginBottom: '32px',
          }}>
            A Derry Firm.<br />
            <span style={{ color: C.gold, fontStyle: 'italic' }}>Built on Trust.</span>
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <p style={{
              fontFamily: "'Inter', Arial, sans-serif",
              fontSize: '15px', color: C.muted, lineHeight: 1.75,
            }}>
              Founded in 1998 by Pádraig Harkin, we started as a single-solicitor practice in the Fountain Street area. Today we are a team of six qualified solicitors and four support staff, handling hundreds of cases each year.
            </p>
            <p style={{
              fontFamily: "'Inter', Arial, sans-serif",
              fontSize: '15px', color: C.muted, lineHeight: 1.75,
            }}>
              Our clients range from first-time buyers nervously signing their first mortgage, to business owners defending employment tribunal claims, to elderly clients ensuring their affairs are in order. Each one receives the same level of attention and care.
            </p>
            <p style={{
              fontFamily: "'Inter', Arial, sans-serif",
              fontSize: '15px', color: C.muted, lineHeight: 1.75,
            }}>
              We are proud members of the Law Society of Northern Ireland and regulated by the Solicitors Regulation Authority.
            </p>
          </div>

          {/* Accreditation badges */}
          <div style={{ display: 'flex', gap: '16px', marginTop: '40px', flexWrap: 'wrap' }}>
            {['Law Society NI', 'Legal 500', 'LSNI Regulated'].map(badge => (
              <div key={badge} style={{
                background: C.bg3, border: `1px solid ${C.goldBorder}`,
                padding: '12px 20px',
                fontFamily: "'Inter', Arial, sans-serif",
                fontSize: '11px', color: C.gold,
                letterSpacing: '0.1em', textTransform: 'uppercase',
              }}>{badge}</div>
            ))}
          </div>
        </div>

        {/* Right — values */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: C.divider }}>
          {values.map(v => (
            <div key={v.title} style={{
              background: C.bg, padding: '32px',
              display: 'flex', gap: '24px',
            }}>
              <div style={{
                width: '4px', flexShrink: 0,
                background: C.gold, alignSelf: 'stretch',
              }} />
              <div>
                <h4 style={{
                  fontFamily: 'Georgia, serif', fontWeight: 700,
                  fontSize: '18px', color: C.text,
                  marginBottom: '8px',
                }}>{v.title}</h4>
                <p style={{
                  fontFamily: "'Inter', Arial, sans-serif",
                  fontSize: '14px', color: C.muted, lineHeight: 1.65,
                }}>{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Team ──────────────────────────────────────────────────────────────────────
const team = [
  { image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&w=600&q=80', name: 'Pádraig Harkin', role: 'Senior Partner', specialisms: ['Property Law', 'Commercial Law'] },
  { image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&w=600&q=80', name: 'Sinéad McGrath', role: 'Partner', specialisms: ['Family Law', 'Wills & Probate'] },
  { image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&w=600&q=80', name: 'Arjun Sharma', role: 'Associate Solicitor', specialisms: ['Employment Law', 'Personal Injury'] },
  { image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&w=600&q=80', name: 'Niamh Doherty', role: 'Associate Solicitor', specialisms: ['Conveyancing', 'Property'] },
]

function Team() {
  return (
    <section id="our-team" style={{
      background: C.bg2, padding: '120px 32px',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '64px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{ width: '32px', height: '1px', background: C.gold }} />
            <span style={{
              fontFamily: "'Inter', Arial, sans-serif",
              fontSize: '11px', color: C.gold,
              letterSpacing: '0.25em', textTransform: 'uppercase',
            }}>Our Solicitors</span>
          </div>
          <h2 style={{
            fontFamily: 'Georgia, serif', fontWeight: 400,
            fontSize: 'clamp(32px, 4vw, 52px)', color: C.text,
            lineHeight: 1.2,
          }}>
            The Team Behind <span style={{ color: C.gold, fontStyle: 'italic' }}>Your Case</span>
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '24px',
        }}>
          {team.map((member, i) => (
            <div key={i}
              style={{
                position: 'relative',
                height: '420px',
                overflow: 'hidden',
                border: `1px solid ${C.divider}`,
                transition: 'border-color 0.3s',
                cursor: 'default',
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = C.goldBorder)}
              onMouseLeave={e => (e.currentTarget.style.borderColor = C.divider)}
            >
              {/* Photo — full card */}
              <img
                src={member.image}
                alt={member.name}
                style={{
                  position: 'absolute', inset: 0,
                  width: '100%', height: '100%',
                  objectFit: 'cover', objectPosition: 'top',
                  display: 'block',
                }}
              />

              {/* Gradient overlay — transparent top, solid dark bottom 30% */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to bottom, transparent 40%, rgba(5,8,15,0.7) 62%, rgba(5,8,15,0.97) 78%, rgba(5,8,15,1) 100%)',
              }} />

              {/* Details pinned to bottom */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                padding: '20px 24px 24px',
              }}>
                {/* Gold top accent line */}
                <div style={{ width: '28px', height: '2px', background: C.gold, marginBottom: '12px' }} />
                <h3 style={{
                  fontFamily: 'Georgia, serif', fontSize: '19px',
                  color: C.text, marginBottom: '3px', lineHeight: 1.2,
                }}>{member.name}</h3>
                <p style={{
                  fontFamily: "'Inter', Arial, sans-serif",
                  fontSize: '11px', color: C.gold,
                  letterSpacing: '0.12em', textTransform: 'uppercase',
                  marginBottom: '12px',
                }}>{member.role}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {member.specialisms.map(s => (
                    <div key={s} style={{
                      fontFamily: "'Inter', Arial, sans-serif",
                      fontSize: '12px', color: 'rgba(180,170,150,0.85)',
                      display: 'flex', alignItems: 'center', gap: '8px',
                    }}>
                      <span style={{ color: C.gold, fontSize: '7px', flexShrink: 0 }}>◆</span>
                      {s}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Testimonials ──────────────────────────────────────────────────────────────
const testimonials = [
  {
    quote: "Harkin & Associates handled our house purchase from start to finish. Pádraig kept us informed at every stage — we never felt in the dark. Would recommend without hesitation.",
    name: 'Aoife & Seán Doherty',
    context: 'Residential Conveyancing, Derry',
  },
  {
    quote: "Sinéad guided me through a very difficult divorce with real sensitivity. She was honest about realistic outcomes and helped me reach a fair settlement without going to court.",
    name: 'Claire McIntyre',
    context: 'Family Law',
  },
  {
    quote: "We've used Harkin & Associates for all our commercial contracts for eight years. Professional, responsive, and they actually understand how a business works.",
    name: 'Donncha Breslin',
    context: 'Commercial Law — Foyle Business Centre',
  },
]

function Testimonials() {
  const [active, setActive] = useState(0)
  const t = testimonials[active]

  return (
    <section style={{
      background: C.bg3, padding: '100px 32px',
      borderTop: `1px solid ${C.divider}`,
      borderBottom: `1px solid ${C.divider}`,
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{
          fontFamily: 'Georgia, serif', fontSize: '80px',
          color: C.gold, lineHeight: 0.7, marginBottom: '24px',
          opacity: 0.6,
        }}>&ldquo;</div>
        <blockquote style={{
          fontFamily: 'Georgia, serif', fontStyle: 'italic',
          fontSize: 'clamp(18px, 2.5vw, 26px)', color: C.text,
          lineHeight: 1.5, marginBottom: '40px',
        }}>
          {t.quote}
        </blockquote>
        <div style={{ width: '32px', height: '1px', background: C.gold, margin: '0 auto 16px' }} />
        <p style={{ fontFamily: "'Inter', Arial, sans-serif", fontWeight: 600, fontSize: '14px', color: C.gold }}>{t.name}</p>
        <p style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: '12px', color: C.muted, marginTop: '4px' }}>{t.context}</p>

        {/* Dots */}
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '32px' }}>
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{
                width: i === active ? '24px' : '8px', height: '8px',
                background: i === active ? C.gold : C.muted,
                border: 'none', cursor: 'pointer',
                transition: 'all 0.3s',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Contact ───────────────────────────────────────────────────────────────────
function Contact() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle')
  const [demoClicked, setDemoClicked] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')
    const form = e.currentTarget
    const data = new FormData(form)
    await fetch('https://api.web3forms.com/submit', { method: 'POST', body: data })
    setStatus('success')
    form.reset()
  }

  return (
    <section id="contact" style={{ background: C.bg, padding: '120px 32px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '64px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{ width: '32px', height: '1px', background: C.gold }} />
            <span style={{
              fontFamily: "'Inter', Arial, sans-serif",
              fontSize: '11px', color: C.gold,
              letterSpacing: '0.25em', textTransform: 'uppercase',
            }}>Get in Touch</span>
          </div>
          <h2 style={{
            fontFamily: 'Georgia, serif', fontWeight: 400,
            fontSize: 'clamp(32px, 4vw, 52px)', color: C.text,
            lineHeight: 1.2,
          }}>
            Book a <span style={{ color: C.gold, fontStyle: 'italic' }}>Free Consultation</span>
          </h2>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '64px',
          alignItems: 'start',
        }}>
          {/* Left — info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <p style={{
              fontFamily: "'Inter', Arial, sans-serif",
              fontSize: '15px', color: C.muted, lineHeight: 1.75,
            }}>
              Your first consultation is completely free and without obligation. Tell us what you need help with, and we'll give you an honest assessment and clear next steps.
            </p>

            {[
              { label: 'Address', value: '42 Bishop Street, Derry / Londonderry, BT48 6PR' },
              { label: 'Phone', value: '+44 28 7126 0000' },
              { label: 'Email', value: 'hello@harkinassociates.co.uk' },
              { label: 'Office Hours', value: 'Mon–Fri 9am–5:30pm · Sat by appointment' },
            ].map(item => (
              <div key={item.label}>
                <p style={{
                  fontFamily: "'Inter', Arial, sans-serif",
                  fontSize: '10px', color: C.gold,
                  letterSpacing: '0.2em', textTransform: 'uppercase',
                  marginBottom: '6px',
                }}>{item.label}</p>
                <p style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: '14px', color: C.text, lineHeight: 1.5 }}>{item.value}</p>
              </div>
            ))}
          </div>

          {/* Right — form */}
          {status === 'success' ? (
            <div style={{
              background: C.bg3, border: `1px solid ${C.goldBorder}`,
              padding: '64px', textAlign: 'center',
            }}>
              <div style={{ fontSize: '40px', marginBottom: '16px' }}>✓</div>
              <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '24px', color: C.gold, marginBottom: '12px' }}>Message Received</h3>
              <p style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: '14px', color: C.muted, lineHeight: 1.6 }}>
                Thank you for getting in touch. A member of our team will contact you within one working day to arrange your free consultation.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <input type="hidden" name="access_key" value="f40bb353-48e4-46e0-bc30-b3ca973a441e" />
              <input type="hidden" name="subject" value="New enquiry from Harkin & Associates demo site" />
              <input type="hidden" name="from_name" value="Harkin Solicitors Demo" />
              <input type="checkbox" name="botcheck" style={{ display: 'none' }} />

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {[
                  { name: 'first_name', placeholder: 'First Name' },
                  { name: 'last_name', placeholder: 'Last Name' },
                ].map(f => (
                  <input key={f.name} name={f.name} placeholder={f.placeholder} required
                    style={{
                      background: C.bg3, border: `1px solid ${C.divider}`,
                      color: C.text, padding: '14px 18px',
                      fontFamily: "'Inter', Arial, sans-serif", fontSize: '14px',
                      outline: 'none',
                    }}
                    onFocus={e => (e.target.style.borderColor = C.goldBorder)}
                    onBlur={e => (e.target.style.borderColor = C.divider)}
                  />
                ))}
              </div>

              {[
                { name: 'email', placeholder: 'Email Address', type: 'email' },
                { name: 'phone', placeholder: 'Phone Number (optional)', type: 'tel' },
              ].map(f => (
                <input key={f.name} name={f.name} placeholder={f.placeholder} type={f.type}
                  required={f.type === 'email'}
                  style={{
                    background: C.bg3, border: `1px solid ${C.divider}`,
                    color: C.text, padding: '14px 18px',
                    fontFamily: "'Inter', Arial, sans-serif", fontSize: '14px',
                    outline: 'none',
                  }}
                  onFocus={e => (e.target.style.borderColor = C.goldBorder)}
                  onBlur={e => (e.target.style.borderColor = C.divider)}
                />
              ))}

              <select name="area_of_law"
                style={{
                  background: C.bg3, border: `1px solid ${C.divider}`,
                  color: C.muted, padding: '14px 18px',
                  fontFamily: "'Inter', Arial, sans-serif", fontSize: '14px',
                  outline: 'none',
                }}
              >
                <option value="">Area of Law (optional)</option>
                {practiceAreas.map(a => <option key={a.title} value={a.title}>{a.title}</option>)}
              </select>

              <textarea name="message" placeholder="Brief description of your matter" rows={5} required
                style={{
                  background: C.bg3, border: `1px solid ${C.divider}`,
                  color: C.text, padding: '14px 18px',
                  fontFamily: "'Inter', Arial, sans-serif", fontSize: '14px',
                  outline: 'none', resize: 'vertical',
                }}
                onFocus={e => (e.target.style.borderColor = C.goldBorder)}
                onBlur={e => (e.target.style.borderColor = C.divider)}
              />

              <button
                type="button"
                onClick={() => setDemoClicked(true)}
                style={{
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: 'rgba(232,228,216,0.35)',
                  cursor: 'pointer', padding: '16px 40px', alignSelf: 'flex-start',
                  fontFamily: "'Inter', Arial, sans-serif",
                  fontWeight: 700, fontSize: '13px', letterSpacing: '0.08em',
                }}
              >
                Request Free Consultation
              </button>
              {demoClicked && (
                <p style={{
                  fontFamily: "'Inter', Arial, sans-serif",
                  fontSize: '13px', color: C.gold,
                  letterSpacing: '0.05em', marginTop: '4px',
                }}>
                  This is a Demo Site
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

// ─── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: '#030508', borderTop: `1px solid ${C.divider}` }}>
      <div style={{
        maxWidth: '1200px', margin: '0 auto',
        padding: '64px 32px 32px',
      }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '2fr 1fr 1fr',
          gap: '64px', marginBottom: '48px',
        }}>
          <div>
            <div style={{
              fontFamily: 'Georgia, serif', fontSize: '20px',
              color: C.text, marginBottom: '4px',
            }}>
              Harkin <span style={{ color: C.gold }}>&amp;</span> Associates
            </div>
            <div style={{
              fontFamily: "'Inter', Arial, sans-serif", fontSize: '11px',
              color: C.muted, letterSpacing: '0.2em', textTransform: 'uppercase',
              marginBottom: '20px',
            }}>Solicitors · Derry</div>
            <p style={{
              fontFamily: "'Inter', Arial, sans-serif", fontSize: '13px',
              color: C.muted, lineHeight: 1.65, maxWidth: '340px',
            }}>
              Trusted legal advice for individuals, families, and businesses across Derry and the North West since 1998.
            </p>
          </div>

          <div>
            <p style={{
              fontFamily: "'Inter', Arial, sans-serif", fontSize: '11px',
              color: C.gold, letterSpacing: '0.2em', textTransform: 'uppercase',
              marginBottom: '16px',
            }}>Practice Areas</p>
            {practiceAreas.slice(0, 4).map(a => (
              <div key={a.title} style={{
                fontFamily: "'Inter', Arial, sans-serif",
                fontSize: '13px', color: C.muted,
                marginBottom: '10px',
              }}>{a.title}</div>
            ))}
          </div>

          <div>
            <p style={{
              fontFamily: "'Inter', Arial, sans-serif", fontSize: '11px',
              color: C.gold, letterSpacing: '0.2em', textTransform: 'uppercase',
              marginBottom: '16px',
            }}>Contact</p>
            {[
              '42 Bishop Street',
              'Derry / Londonderry BT48 6PR',
              '+44 28 7126 0000',
              'hello@harkinassociates.co.uk',
            ].map(line => (
              <div key={line} style={{
                fontFamily: "'Inter', Arial, sans-serif",
                fontSize: '13px', color: C.muted,
                marginBottom: '8px',
              }}>{line}</div>
            ))}
          </div>
        </div>

        <div style={{
          borderTop: `1px solid ${C.divider}`,
          paddingTop: '24px',
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', flexWrap: 'wrap', gap: '12px',
        }}>
          <p style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: '12px', color: '#3a3830' }}>
            © {new Date().getFullYear()} Harkin & Associates Solicitors. Regulated by the Law Society of Northern Ireland.
          </p>
          <p style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: '12px', color: '#3a3830' }}>
            Demo site by{' '}
            <a href="https://derrydigital.co.uk" style={{ color: C.gold, textDecoration: 'none' }}>Derry Digital</a>
          </p>
        </div>
      </div>
    </footer>
  )
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function Page() {
  return (
    <>
      <DemoBanner />
      <Nav />
      <main>
        <Hero />
        <Services />
        <About />
        <Team />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
