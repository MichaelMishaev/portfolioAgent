'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { initAnimations, cleanupAnimations } from './animations';
import './styles.css';

export default function AboutMePage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize GSAP animations
    initAnimations();

    // Cleanup on unmount
    return () => {
      cleanupAnimations();
    };
  }, []);

  return (
    <div ref={containerRef} className="about-me-page">
      {/* Header */}
      <header className="fixed-header">
        <div className="header-container">
          <div className="header-content">
            <div className="logo">
              <a href="/">
                <Image src="/about-me-images/logo-white.5460c911.png" alt="Logo" width={120} height={28} />
              </a>
            </div>
            <div className="header-right">
              <a href="mailto:hello@gmail.com" className="email-link">
                hello@gmail.com
              </a>
              <button className="menu-button">
                <span>Menu</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <line x1="3" y1="12" x2="21" y2="12" stroke="white" strokeWidth="2"/>
                  <line x1="3" y1="6" x2="21" y2="6" stroke="white" strokeWidth="2"/>
                  <line x1="3" y1="18" x2="21" y2="18" stroke="white" strokeWidth="2"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="hero-content-wrapper">
            {/* Large Title */}
            <div className="hero-title-wrapper">
              <h1 className="hero-title tp-char-animation">
                Hello, I&apos;m Joris Brian
              </h1>
            </div>

            {/* Main Content Grid */}
            <div className="hero-grid">
              {/* Left Column - Text Info */}
              <div className="hero-left tp_fade_anim" data-delay="0.3">
                <div className="hero-arrow-button pp-about-me-btn">
                  <a href="#work">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </a>
                </div>
                <span className="hero-subtitle tp-split-text tp-split-right">
                  Freelance 3D<br/>
                  designer based<br/>
                  in London
                </span>
                <p className="hero-status">Open to work</p>
              </div>

              {/* Center Column - Image */}
              <div className="hero-center tp_fade_anim" data-delay="0.5">
                <div className="hero-image-wrapper pp-about-me-thumb">
                  <Image
                    src="/about-me-images/about-me-thumb-1.7c789974.png"
                    alt="Profile"
                    width={947}
                    height={530}
                    priority
                  />
                </div>
              </div>

              {/* Right Column - Social Links */}
              <div className="hero-right tp_fade_anim" data-delay="0.7">
                <div className="social-links tp-footer-widget-social">
                  <a href="https://dribbble.com" target="_blank" rel="noopener noreferrer" className="social-link">
                    <span>Dribbble</span>
                  </a>
                  <a href="https://behance.com" target="_blank" rel="noopener noreferrer" className="social-link">
                    <span>Behance</span>
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link">
                    <span>Instagram</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats/Brand Slider Section */}
      <div className="pp-brand-area ar-brand-style z-index-4" style={{ backgroundColor: '#FFF669' }}>
        {/* Decorative Hand Elements */}
        <div className="pp-about-me-shape">
          <div className="shape-left">
            <Image
              src="/about-me-images/about-me-hand-left.cbf862c3.png"
              alt="Left hand decoration"
              width={219}
              height={210}
            />
          </div>
          <div className="shape-right">
            <Image
              src="/about-me-images/about-me-hand-right.a3e9a7ec.png"
              alt="Right hand decoration"
              width={299}
              height={206}
            />
          </div>
        </div>

        {/* Brand/Stats Slider */}
        <div className="tp-brand-wrapper pp-about-me-brand-wrap z-index-1">
          <div className="stats-slider">
            <div className="slider-track">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="stat-item">
                  <span className="stat-number">86</span>
                  <span className="stat-separator">/</span>
                  <span className="stat-label">Satisfied Clients</span>
                  <span className="stat-separator">•</span>
                  <span className="stat-number">24</span>
                  <span className="stat-separator">/</span>
                  <span className="stat-label">Projects Finished</span>
                  <span className="stat-separator">•</span>
                  <span className="stat-number">95%</span>
                  <span className="stat-separator">/</span>
                  <span className="stat-label">Years of Experience</span>
                  <span className="stat-separator">•</span>
                  <span className="stat-number">86</span>
                  <span className="stat-separator">/</span>
                  <span className="stat-label">Client Retention Rate</span>
                  <span className="stat-separator">•</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <section className="about-section">
        <div className="about-container">
          <div className="about-grid">
            <div
              className="about-content"
            >
              <h2 className="about-title">
                I&apos;m a selectively skilled product designer with strong focus on producing high quality and impactful digital experience.
              </h2>
              <p className="about-text">
                I&apos;m a French digital designer and web developer with over 10 years of experience.
                At the crossroads of design, motion and web development, the diversity of my skills
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="skills-section">
        <div className="skills-container">
          <h2 className="skills-title">My Skills</h2>
          <div className="skills-grid">
            {[
              {
                category: 'Product Design',
                skills: ['UX/UI Design', 'Prototyping', 'Design System', 'Developer Handoff']
              },
              {
                category: 'Brand Design',
                skills: ['Logo Design', 'Brand Guidelines', 'Presentations', 'Digital & Print assets']
              },
              {
                category: 'Motion Design',
                skills: ['UI Animations', 'Logo Animations', 'Illustration Animations', 'Explainer Videos']
              },
              {
                category: 'Web Development',
                skills: ['Front-End Development', 'WordPress Theme', 'SEO']
              }
            ].map((group, i) => (
              <div
                key={i}
                className="skill-category"
              >
                <h3 className="category-title">{group.category}</h3>
                <div className="skill-tags">
                  {group.skills.map((skill, j) => (
                    <span key={j} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Toolbox Section */}
      <section className="toolbox-section">
        <div className="toolbox-container">
          <h2 className="toolbox-title">My Toolbox</h2>
          <div className="toolbox-grid">
            {[
              { name: 'Figma', percentage: 94 },
              { name: 'Sketch', percentage: 85 },
              { name: 'Photoshop', percentage: 74 },
              { name: 'Invision', percentage: 63 },
              { name: 'Framer', percentage: 69 },
              { name: 'Adobe XD', percentage: 55 },
              { name: 'HTML', percentage: 40 },
              { name: 'WordPress', percentage: 49 }
            ].map((tool, i) => (
              <div
                key={i}
                className="tool-item"
              >
                <div className="tool-icon">
                  <div className="tool-icon-placeholder">{tool.name[0]}</div>
                </div>
                <div className="tool-info">
                  <span className="tool-name">{tool.name}</span>
                  <span className="tool-percentage">{tool.percentage}%</span>
                </div>
                <div className="tool-bar">
                  <div
                    className="tool-bar-fill"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="experience-section">
        <div className="experience-container">
          <h2 className="experience-title">Experience</h2>
          <div className="experience-list">
            {[
              { period: 'Aug. 2025 - Present', role: 'Motion Designer', company: 'BarberShop Studio' },
              { period: 'Nov. 2018 - Mar. 2022', role: 'UI/UX Lead Designer', company: 'Amazon INC' },
              { period: 'Nov. 2018 - Mar. 2023', role: 'Digital Art Director', company: 'BarberShop Studio' },
              { period: 'Nov. 2018 - Mar. 2025', role: 'Product Designer (internship)', company: '' }
            ].map((exp, i) => (
              <div
                key={i}
                className="experience-item"
              >
                <span className="experience-period">{exp.period}</span>
                <div className="experience-details">
                  <h3 className="experience-role">{exp.role}</h3>
                  {exp.company && <span className="experience-company">{exp.company}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recognitions Section */}
      <section className="recognitions-section">
        <div className="recognitions-container">
          <h2 className="recognitions-title">Recognitions</h2>
          <div className="recognitions-grid">
            {[
              { title: '3x Site of the Day', image: 'award-1.8a1eb4fb.png' },
              { title: 'Site of the year', image: 'award-2.0883986f.png' },
              { title: '2x Site of the Day', image: 'award-3.0b770aad.png' }
            ].map((award, i) => (
              <div
                key={i}
                className="recognition-item"
              >
                <div className="recognition-badge">{award.title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="footer-cta">
        <div className="footer-cta-container">
          <div
            className="footer-cta-content"
          >
            <h2 className="footer-cta-title">Looking for a new talent</h2>
            <a href="mailto:hello@gmail.com" className="footer-cta-email">hello@gmail.com</a>
            <p className="footer-cta-text">Available for a full-time position</p>
            <p className="footer-credit">Made by Agntix</p>
          </div>
        </div>
      </section>

      {/* Back to Top */}
      <button
        className="back-to-top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        ↑
      </button>
    </div>
  );
}
