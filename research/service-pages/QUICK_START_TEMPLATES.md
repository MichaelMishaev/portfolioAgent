# Service Page Quick-Start Templates

## Template Selection Guide

Choose your template based on these questions:

1. **What's your price point?**
   - Under $5K → Style 3 (Done-For-You)
   - $5K-$50K → Style 2 (Membership) or Style 3
   - Over $50K → Style 1 (Professional B2B)

2. **What's your sales cycle?**
   - Days/weeks → Style 3 (Done-For-You)
   - Weeks/months → Style 2 (Membership)
   - Months/years → Style 1 (Professional B2B)

3. **What's your value proposition?**
   - Community/connection → Style 2 (Membership)
   - Speed/simplicity → Style 3 (Done-For-You)
   - Expertise/methodology → Style 1 (Professional B2B)

---

## TEMPLATE 1: Professional B2B Services

### Complete Page Structure (HTML Outline)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>[Your Company] - [Primary Service Area]</title>
</head>
<body>

  <!-- Navigation -->
  <nav>
    <div class="logo">[Company Logo]</div>
    <ul class="nav-links">
      <li><a href="#services">Services</a></li>
      <li><a href="#industries">Industries</a></li>
      <li><a href="#insights">Insights</a></li>
      <li><a href="#about">About</a></li>
      <li><a href="#contact" class="cta-nav">Get in Touch</a></li>
    </ul>
  </nav>

  <!-- Hero Section -->
  <section class="hero hero-b2b">
    <div class="container">
      <h1>Transform your organization for lasting impact</h1>
      <p class="hero-subtext">
        Strategic advisory services for enterprise leaders
        navigating complex transformation.
      </p>
      <a href="#contact" class="btn-secondary">Start a Conversation</a>
    </div>
  </section>

  <!-- By the Numbers -->
  <section class="stats-section">
    <div class="container">
      <div class="stat-grid">
        <div class="stat-item">
          <span class="stat-number">75%</span>
          <p class="stat-label">of Fortune 500 companies</p>
        </div>
        <div class="stat-item">
          <span class="stat-number">$2.3B</span>
          <p class="stat-label">in value created for clients</p>
        </div>
        <div class="stat-item">
          <span class="stat-number">40+</span>
          <p class="stat-label">industries served globally</p>
        </div>
        <div class="stat-item">
          <span class="stat-number">Since 1995</span>
          <p class="stat-label">trusted advisory partner</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Services Grid -->
  <section id="services" class="services-section">
    <div class="container">
      <h2>Our Services</h2>
      <div class="service-grid">

        <div class="service-card">
          <div class="service-icon">[Icon]</div>
          <h3>Digital Transformation</h3>
          <p>Modernize operations and technology infrastructure
             for competitive advantage in digital markets.</p>
          <a href="#" class="link-arrow">Learn more →</a>
        </div>

        <div class="service-card">
          <div class="service-icon">[Icon]</div>
          <h3>Mergers & Acquisitions</h3>
          <p>Strategic M&A advisory from target identification
             through post-merger integration.</p>
          <a href="#" class="link-arrow">Learn more →</a>
        </div>

        <div class="service-card">
          <div class="service-icon">[Icon]</div>
          <h3>Organizational Change</h3>
          <p>Change management programs that align people,
             processes, and culture with strategic objectives.</p>
          <a href="#" class="link-arrow">Learn more →</a>
        </div>

        <div class="service-card">
          <div class="service-icon">[Icon]</div>
          <h3>Growth Strategy</h3>
          <p>Market entry strategies and expansion frameworks
             for sustainable revenue growth.</p>
          <a href="#" class="link-arrow">Learn more →</a>
        </div>

        <div class="service-card">
          <div class="service-icon">[Icon]</div>
          <h3>Operations Excellence</h3>
          <p>Process optimization and efficiency programs
             delivering measurable cost reduction.</p>
          <a href="#" class="link-arrow">Learn more →</a>
        </div>

        <div class="service-card">
          <div class="service-icon">[Icon]</div>
          <h3>Risk Management</h3>
          <p>Enterprise risk frameworks and compliance programs
             for complex regulatory environments.</p>
          <a href="#" class="link-arrow">Learn more →</a>
        </div>

      </div>
    </div>
  </section>

  <!-- Methodology -->
  <section class="methodology-section">
    <div class="container">
      <h2>Our Approach: The Impact Framework®</h2>
      <p class="section-intro">
        A proven methodology for sustainable transformation,
        refined over 30 years of client partnership.
      </p>
      <div class="methodology-steps">
        <div class="method-step">
          <span class="step-number">01</span>
          <h3>Discovery & Assessment</h3>
          <p>Comprehensive analysis of current state,
             opportunities, and organizational readiness.</p>
        </div>
        <div class="method-step">
          <span class="step-number">02</span>
          <h3>Strategy Design</h3>
          <p>Collaborative roadmap development with
             stakeholder alignment and prioritization.</p>
        </div>
        <div class="method-step">
          <span class="step-number">03</span>
          <h3>Implementation</h3>
          <p>Hands-on execution support with embedded
             teams and change management.</p>
        </div>
        <div class="method-step">
          <span class="step-number">04</span>
          <h3>Optimization</h3>
          <p>Continuous improvement processes and
             performance tracking for sustained results.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Case Studies -->
  <section class="case-studies-section">
    <div class="container">
      <h2>Client Results</h2>
      <div class="case-study-grid">

        <div class="case-study-card">
          <span class="case-industry">Financial Services</span>
          <h3>Global Bank Digital Transformation</h3>
          <p class="case-challenge">
            <strong>Challenge:</strong> Legacy systems hindering
            customer experience and operational efficiency.
          </p>
          <p class="case-result">
            <strong>Result:</strong> 40% reduction in processing time,
            $120M annual savings, 95% customer satisfaction increase.
          </p>
          <a href="#" class="link-arrow">Read case study →</a>
        </div>

        <div class="case-study-card">
          <span class="case-industry">Healthcare</span>
          <h3>Hospital Network Merger Integration</h3>
          <p class="case-challenge">
            <strong>Challenge:</strong> Integrating 12 hospitals
            across 3 states post-acquisition.
          </p>
          <p class="case-result">
            <strong>Result:</strong> Seamless 18-month integration,
            $85M synergies realized, zero service disruption.
          </p>
          <a href="#" class="link-arrow">Read case study →</a>
        </div>

        <div class="case-study-card">
          <span class="case-industry">Manufacturing</span>
          <h3>Supply Chain Resilience Program</h3>
          <p class="case-challenge">
            <strong>Challenge:</strong> Reducing supply chain
            vulnerabilities and costs.
          </p>
          <p class="case-result">
            <strong>Result:</strong> 60% reduction in lead times,
            25% cost savings, improved supplier relationships.
          </p>
          <a href="#" class="link-arrow">Read case study →</a>
        </div>

      </div>
    </div>
  </section>

  <!-- Thought Leadership -->
  <section class="insights-section">
    <div class="container">
      <h2>Latest Insights</h2>
      <div class="insights-grid">
        <article class="insight-card">
          <img src="insight1.jpg" alt="Report cover">
          <span class="insight-type">Research Report</span>
          <h3>2025 Digital Transformation Survey</h3>
          <p>Key findings from 500 enterprise leaders on
             digital transformation priorities and challenges.</p>
          <a href="#" class="link-arrow">Download report →</a>
        </article>
        <article class="insight-card">
          <img src="insight2.jpg" alt="Article image">
          <span class="insight-type">Article</span>
          <h3>The Future of Enterprise AI</h3>
          <p>How leading organizations are deploying AI
             for competitive advantage and operational excellence.</p>
          <a href="#" class="link-arrow">Read article →</a>
        </article>
      </div>
    </div>
  </section>

  <!-- Contact CTA -->
  <section id="contact" class="contact-section">
    <div class="container">
      <h2>Ready to Transform Your Organization?</h2>
      <p>Connect with our team to discuss your strategic priorities.</p>

      <form class="contact-form">
        <div class="form-row">
          <input type="text" placeholder="Full Name" required>
          <input type="email" placeholder="Email Address" required>
        </div>
        <div class="form-row">
          <input type="text" placeholder="Company" required>
          <input type="text" placeholder="Title" required>
        </div>
        <div class="form-row">
          <select required>
            <option value="">Select Industry</option>
            <option value="financial">Financial Services</option>
            <option value="healthcare">Healthcare</option>
            <option value="manufacturing">Manufacturing</option>
            <option value="technology">Technology</option>
            <option value="retail">Retail</option>
            <option value="other">Other</option>
          </select>
          <select required>
            <option value="">Primary Interest</option>
            <option value="digital">Digital Transformation</option>
            <option value="ma">Mergers & Acquisitions</option>
            <option value="change">Organizational Change</option>
            <option value="growth">Growth Strategy</option>
            <option value="operations">Operations Excellence</option>
            <option value="risk">Risk Management</option>
          </select>
        </div>
        <textarea placeholder="Tell us about your challenge or objective (optional)" rows="4"></textarea>
        <button type="submit" class="btn-primary">Submit Inquiry</button>
      </form>
    </div>
  </section>

  <!-- Footer -->
  <footer>
    <div class="container">
      <div class="footer-grid">
        <div class="footer-col">
          <h4>Services</h4>
          <ul>
            <li><a href="#">Digital Transformation</a></li>
            <li><a href="#">M&A Advisory</a></li>
            <li><a href="#">Organizational Change</a></li>
            <li><a href="#">Growth Strategy</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Industries</h4>
          <ul>
            <li><a href="#">Financial Services</a></li>
            <li><a href="#">Healthcare</a></li>
            <li><a href="#">Manufacturing</a></li>
            <li><a href="#">Technology</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Company</h4>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Leadership</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Connect</h4>
          <ul>
            <li><a href="#">LinkedIn</a></li>
            <li><a href="#">Twitter</a></li>
            <li><a href="#">Newsletter</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2025 [Your Company]. All rights reserved.</p>
        <ul class="footer-legal">
          <li><a href="#">Privacy Policy</a></li>
          <li><a href="#">Terms of Service</a></li>
        </ul>
      </div>
    </div>
  </footer>

</body>
</html>
```

### CSS Starter (Professional B2B Style)

```css
/* ==========================================================================
   Professional B2B Service Page Styles
   ========================================================================== */

/* Color Palette */
:root {
  /* Primary Colors */
  --color-navy: #0A1F44;
  --color-charcoal: #232326;
  --color-red-accent: #C8102E;

  /* Neutrals */
  --color-white: #FFFFFF;
  --color-gray-50: #F5F5F5;
  --color-gray-200: #E0E0E0;
  --color-gray-400: #999999;
  --color-gray-600: #666666;
  --color-gray-800: #333333;

  /* Spacing Scale */
  --space-xs: 8px;
  --space-sm: 16px;
  --space-md: 24px;
  --space-lg: 32px;
  --space-xl: 48px;
  --space-2xl: 64px;
  --space-3xl: 96px;
  --space-4xl: 128px;

  /* Typography */
  --font-body: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  --font-heading: Georgia, 'Times New Roman', serif;

  /* Transitions */
  --transition-base: 0.2s ease-in-out;
}

/* Global Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: var(--font-body);
  font-size: 16px;
  line-height: 1.6;
  color: var(--color-gray-800);
  background: var(--color-white);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-md);
}

/* Typography */
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
  line-height: 1.2;
  margin-bottom: var(--space-md);
  color: var(--color-charcoal);
}

h1 { font-size: 60px; font-weight: 700; }
h2 { font-size: 42px; font-weight: 600; }
h3 { font-size: 28px; font-weight: 600; }
h4 { font-size: 20px; font-weight: 600; }

p {
  margin-bottom: var(--space-md);
  font-size: 18px;
  line-height: 1.8;
  color: var(--color-gray-600);
}

/* Navigation */
nav {
  background: var(--color-white);
  padding: var(--space-md) 0;
  border-bottom: 1px solid var(--color-gray-200);
  position: sticky;
  top: 0;
  z-index: 100;
}

nav .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-links {
  display: flex;
  list-style: none;
  gap: var(--space-lg);
}

.nav-links a {
  text-decoration: none;
  color: var(--color-gray-800);
  font-weight: 500;
  transition: color var(--transition-base);
}

.nav-links a:hover {
  color: var(--color-red-accent);
}

.cta-nav {
  background: var(--color-red-accent);
  color: var(--color-white) !important;
  padding: var(--space-sm) var(--space-lg);
  border-radius: 4px;
}

/* Hero Section */
.hero-b2b {
  background: var(--color-navy);
  color: var(--color-white);
  padding: var(--space-4xl) 0 var(--space-3xl);
  text-align: center;
}

.hero-b2b h1 {
  color: var(--color-white);
  max-width: 900px;
  margin: 0 auto var(--space-lg);
}

.hero-subtext {
  font-size: 22px;
  color: rgba(255, 255, 255, 0.85);
  max-width: 700px;
  margin: 0 auto var(--space-xl);
}

/* Buttons */
.btn-primary,
.btn-secondary {
  display: inline-block;
  padding: var(--space-md) var(--space-xl);
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  border-radius: 4px;
  transition: all var(--transition-base);
  border: 2px solid transparent;
}

.btn-primary {
  background: var(--color-red-accent);
  color: var(--color-white);
}

.btn-primary:hover {
  background: #A10D26;
}

.btn-secondary {
  background: transparent;
  color: var(--color-white);
  border-color: var(--color-white);
}

.btn-secondary:hover {
  background: var(--color-white);
  color: var(--color-navy);
}

/* Stats Section */
.stats-section {
  background: var(--color-white);
  padding: var(--space-3xl) 0;
  border-bottom: 1px solid var(--color-gray-200);
}

.stat-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-xl);
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 64px;
  font-weight: 700;
  color: var(--color-red-accent);
  line-height: 1;
  margin-bottom: var(--space-sm);
}

.stat-label {
  font-size: 18px;
  color: var(--color-gray-600);
}

/* Services Grid */
.services-section {
  padding: var(--space-4xl) 0;
  background: var(--color-gray-50);
}

.services-section h2 {
  text-align: center;
  margin-bottom: var(--space-3xl);
}

.service-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-lg);
}

.service-card {
  background: var(--color-white);
  padding: var(--space-xl);
  border: 1px solid var(--color-gray-200);
  transition: box-shadow var(--transition-base);
}

.service-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.service-icon {
  width: 64px;
  height: 64px;
  background: var(--color-gray-50);
  margin-bottom: var(--space-md);
  border-radius: 8px;
}

.service-card h3 {
  margin-bottom: var(--space-sm);
}

.service-card p {
  font-size: 16px;
  margin-bottom: var(--space-md);
}

.link-arrow {
  color: var(--color-red-accent);
  text-decoration: none;
  font-weight: 600;
  transition: color var(--transition-base);
}

.link-arrow:hover {
  color: #A10D26;
}

/* Methodology Section */
.methodology-section {
  padding: var(--space-4xl) 0;
  background: var(--color-white);
}

.methodology-section h2 {
  text-align: center;
  margin-bottom: var(--space-md);
}

.section-intro {
  text-align: center;
  max-width: 700px;
  margin: 0 auto var(--space-3xl);
  font-size: 20px;
}

.methodology-steps {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-xl);
}

.method-step {
  text-align: center;
}

.step-number {
  display: block;
  font-size: 48px;
  font-weight: 300;
  color: var(--color-gray-200);
  margin-bottom: var(--space-md);
}

.method-step h3 {
  margin-bottom: var(--space-sm);
  font-size: 22px;
}

.method-step p {
  font-size: 16px;
}

/* Case Studies */
.case-studies-section {
  padding: var(--space-4xl) 0;
  background: var(--color-gray-50);
}

.case-studies-section h2 {
  text-align: center;
  margin-bottom: var(--space-3xl);
}

.case-study-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-lg);
}

.case-study-card {
  background: var(--color-white);
  padding: var(--space-xl);
  border: 1px solid var(--color-gray-200);
}

.case-industry {
  display: inline-block;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--color-red-accent);
  font-weight: 600;
  margin-bottom: var(--space-sm);
}

.case-study-card h3 {
  margin-bottom: var(--space-md);
}

.case-challenge,
.case-result {
  font-size: 16px;
  margin-bottom: var(--space-md);
}

/* Contact Form */
.contact-section {
  padding: var(--space-4xl) 0;
  background: var(--color-white);
  text-align: center;
}

.contact-section h2 {
  margin-bottom: var(--space-sm);
}

.contact-section > p {
  max-width: 600px;
  margin: 0 auto var(--space-3xl);
  font-size: 20px;
}

.contact-form {
  max-width: 800px;
  margin: 0 auto;
  text-align: left;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-md);
  margin-bottom: var(--space-md);
}

input,
select,
textarea {
  padding: var(--space-md);
  font-size: 16px;
  border: 1px solid var(--color-gray-200);
  border-radius: 4px;
  font-family: var(--font-body);
}

textarea {
  width: 100%;
  resize: vertical;
}

.contact-form button {
  width: 100%;
  margin-top: var(--space-md);
}

/* Footer */
footer {
  background: var(--color-charcoal);
  color: var(--color-white);
  padding: var(--space-3xl) 0 var(--space-lg);
}

.footer-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-xl);
  margin-bottom: var(--space-2xl);
}

.footer-col h4 {
  color: var(--color-white);
  font-size: 16px;
  margin-bottom: var(--space-md);
}

.footer-col ul {
  list-style: none;
}

.footer-col a {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  line-height: 2;
  transition: color var(--transition-base);
}

.footer-col a:hover {
  color: var(--color-white);
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: var(--space-lg);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-legal {
  display: flex;
  list-style: none;
  gap: var(--space-lg);
}

.footer-legal a {
  color: rgba(255, 255, 255, 0.5);
  text-decoration: none;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .stat-grid,
  .service-grid,
  .methodology-steps {
    grid-template-columns: repeat(2, 1fr);
  }

  .case-study-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  h1 { font-size: 40px; }
  h2 { font-size: 32px; }

  .stat-grid,
  .service-grid,
  .methodology-steps,
  .footer-grid {
    grid-template-columns: 1fr;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .nav-links {
    flex-direction: column;
  }
}
```

---

## TEMPLATE 2: Membership/Community Platform

### Complete Page Structure (HTML Outline)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>[Platform Name] - Build Your Community</title>
</head>
<body>

  <!-- Navigation -->
  <nav>
    <div class="logo">[Platform Logo]</div>
    <ul class="nav-links">
      <li><a href="#features">Features</a></li>
      <li><a href="#pricing">Pricing</a></li>
      <li><a href="#creators">Creators</a></li>
      <li><a href="#resources">Resources</a></li>
      <li><a href="#login">Log In</a></li>
      <li><a href="#signup" class="cta-nav">Start Free</a></li>
    </ul>
  </nav>

  <!-- Hero Section -->
  <section class="hero hero-community">
    <div class="container">
      <h1>Build a thriving community around what you create</h1>
      <p class="hero-subtext">
        The all-in-one platform for creators, educators, and community
        leaders to connect with their audience and monetize their expertise.
      </p>
      <div class="hero-ctas">
        <a href="#signup" class="btn-primary">Start Free Trial</a>
        <a href="#demo" class="btn-secondary">Watch Demo</a>
      </div>
      <p class="hero-note">No credit card required • 14-day free trial</p>
    </div>
  </section>

  <!-- Creator Showcase -->
  <section class="creators-section">
    <div class="container">
      <h2>Join 50,000+ creators building communities</h2>
      <div class="creator-grid">

        <div class="creator-card">
          <img src="creator1.jpg" alt="Creator name" class="creator-photo">
          <h3>Sarah Johnson</h3>
          <p class="creator-niche">Fitness Coach</p>
          <p class="creator-quote">
            "I grew from 0 to 5,000 members in 8 months. The engagement
            tools make it so easy to keep my community active."
          </p>
          <div class="creator-stats">
            <span>5.2K members</span>
            <span>$42K MRR</span>
          </div>
        </div>

        <div class="creator-card">
          <img src="creator2.jpg" alt="Creator name" class="creator-photo">
          <h3>Marcus Chen</h3>
          <p class="creator-niche">Creative Writing</p>
          <p class="creator-quote">
            "Finally, a platform where I own my audience. My students love
            the private community space."
          </p>
          <div class="creator-stats">
            <span>3.8K members</span>
            <span>$28K MRR</span>
          </div>
        </div>

        <div class="creator-card">
          <img src="creator3.jpg" alt="Creator name" class="creator-photo">
          <h3>Lisa Martinez</h3>
          <p class="creator-niche">Business Strategy</p>
          <p class="creator-quote">
            "The course + community combo is perfect. My members get
            value beyond just the content."
          </p>
          <div class="creator-stats">
            <span>2.4K members</span>
            <span>$15K MRR</span>
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- Platform Stats -->
  <section class="platform-stats">
    <div class="container">
      <div class="stat-row">
        <div class="stat-item">
          <span class="stat-number">50K+</span>
          <p>Active creators</p>
        </div>
        <div class="stat-item">
          <span class="stat-number">2.3M</span>
          <p>Community members</p>
        </div>
        <div class="stat-item">
          <span class="stat-number">15M</span>
          <p>Messages sent monthly</p>
        </div>
        <div class="stat-item">
          <span class="stat-number">99.9%</span>
          <p>Platform uptime</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Features Section -->
  <section id="features" class="features-section">
    <div class="container">
      <h2>Everything you need to build and monetize your community</h2>

      <div class="feature-grid">
        <div class="feature-item">
          <div class="feature-icon">[Icon]</div>
          <h3>Private Community Spaces</h3>
          <p>Create exclusive spaces for discussions, Q&A, and member connections.</p>
        </div>

        <div class="feature-item">
          <div class="feature-icon">[Icon]</div>
          <h3>Course Hosting</h3>
          <p>Upload and organize your courses with videos, PDFs, and quizzes.</p>
        </div>

        <div class="feature-item">
          <div class="feature-icon">[Icon]</div>
          <h3>Live Events</h3>
          <p>Host webinars, workshops, and live Q&A sessions directly in your community.</p>
        </div>

        <div class="feature-item">
          <div class="feature-icon">[Icon]</div>
          <h3>Membership Tiers</h3>
          <p>Create multiple membership levels with different access and benefits.</p>
        </div>

        <div class="feature-item">
          <div class="feature-icon">[Icon]</div>
          <h3>Payment Processing</h3>
          <p>Seamless subscriptions and one-time payments powered by Stripe.</p>
        </div>

        <div class="feature-item">
          <div class="feature-icon">[Icon]</div>
          <h3>Mobile Apps</h3>
          <p>Your members get iOS and Android apps with your branding.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- How It Works -->
  <section class="how-it-works">
    <div class="container">
      <h2>Start building in 3 simple steps</h2>
      <div class="steps-grid">

        <div class="step-card">
          <span class="step-number">1</span>
          <h3>Create Your Space</h3>
          <p>Set up your community in minutes with our easy onboarding.
             No technical skills required.</p>
          <img src="step1.png" alt="Dashboard screenshot">
        </div>

        <div class="step-card">
          <span class="step-number">2</span>
          <h3>Invite Your People</h3>
          <p>Import your email list or share your community link.
             Members can join instantly.</p>
          <img src="step2.png" alt="Invite screenshot">
        </div>

        <div class="step-card">
          <span class="step-number">3</span>
          <h3>Start Engaging</h3>
          <p>Post content, host events, and watch your community
             come to life.</p>
          <img src="step3.png" alt="Community screenshot">
        </div>

      </div>
    </div>
  </section>

  <!-- Pricing Section -->
  <section id="pricing" class="pricing-section">
    <div class="container">
      <h2>Choose your plan</h2>
      <p class="pricing-subtitle">14-day free trial • No credit card required • Cancel anytime</p>

      <div class="pricing-toggle">
        <span>Monthly</span>
        <label class="switch">
          <input type="checkbox" id="pricing-toggle">
          <span class="slider"></span>
        </label>
        <span>Annual <span class="savings-badge">Save 20%</span></span>
      </div>

      <div class="pricing-grid">

        <div class="pricing-card">
          <h3>Starter</h3>
          <div class="price">
            <span class="price-amount">$0</span>
            <span class="price-period">/month</span>
          </div>
          <p class="price-description">Perfect for testing and small groups</p>
          <ul class="feature-list">
            <li>Up to 100 members</li>
            <li>Unlimited posts</li>
            <li>Basic analytics</li>
            <li>Email support</li>
            <li>[Platform] branding</li>
          </ul>
          <a href="#signup" class="btn-outline">Start Free</a>
        </div>

        <div class="pricing-card featured">
          <span class="popular-badge">Most Popular</span>
          <h3>Creator</h3>
          <div class="price">
            <span class="price-amount">$39</span>
            <span class="price-period">/month</span>
          </div>
          <p class="price-description">For growing communities</p>
          <ul class="feature-list">
            <li>Up to 1,000 members</li>
            <li>Everything in Starter, plus:</li>
            <li>Custom branding</li>
            <li>Member profiles</li>
            <li>Advanced analytics</li>
            <li>Priority support</li>
            <li>3 membership tiers</li>
          </ul>
          <a href="#signup" class="btn-primary">Start Free Trial</a>
        </div>

        <div class="pricing-card">
          <h3>Professional</h3>
          <div class="price">
            <span class="price-amount">$119</span>
            <span class="price-period">/month</span>
          </div>
          <p class="price-description">For established communities</p>
          <ul class="feature-list">
            <li>Unlimited members</li>
            <li>Everything in Creator, plus:</li>
            <li>White-label mobile apps</li>
            <li>Custom domain</li>
            <li>API access</li>
            <li>Dedicated account manager</li>
            <li>Unlimited tiers</li>
          </ul>
          <a href="#signup" class="btn-outline">Start Free Trial</a>
        </div>

      </div>
    </div>
  </section>

  <!-- Social Proof - Testimonials -->
  <section class="testimonials-section">
    <div class="container">
      <h2>What creators are saying</h2>
      <div class="testimonials-grid">

        <div class="testimonial-card">
          <div class="testimonial-stars">★★★★★</div>
          <p class="testimonial-text">
            "This platform changed my business. I finally have a direct
            relationship with my audience without worrying about algorithms."
          </p>
          <div class="testimonial-author">
            <img src="avatar1.jpg" alt="Author">
            <div>
              <p class="author-name">Emily Rodriguez</p>
              <p class="author-title">Yoga Instructor • 4.2K members</p>
            </div>
          </div>
        </div>

        <div class="testimonial-card">
          <div class="testimonial-stars">★★★★★</div>
          <p class="testimonial-text">
            "The engagement in my community is 10x higher than my social
            media following. People actually show up and participate."
          </p>
          <div class="testimonial-author">
            <img src="avatar2.jpg" alt="Author">
            <div>
              <p class="author-name">James Park</p>
              <p class="author-title">Music Producer • 3.1K members</p>
            </div>
          </div>
        </div>

        <div class="testimonial-card">
          <div class="testimonial-stars">★★★★★</div>
          <p class="testimonial-text">
            "I love that I can host courses, events, and discussions all
            in one place. My members don't have to jump between platforms."
          </p>
          <div class="testimonial-author">
            <img src="avatar3.jpg" alt="Author">
            <div>
              <p class="author-name">Rachel Green</p>
              <p class="author-title">Career Coach • 2.8K members</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- Trust Signals -->
  <section class="trust-section">
    <div class="container">
      <div class="trust-grid">
        <div class="trust-item">
          <div class="trust-icon">[Icon]</div>
          <h4>99.9% Uptime</h4>
          <p>Reliable infrastructure your members can count on</p>
        </div>
        <div class="trust-item">
          <div class="trust-icon">[Icon]</div>
          <h4>SOC 2 Certified</h4>
          <p>Enterprise-grade security for your data</p>
        </div>
        <div class="trust-item">
          <div class="trust-icon">[Icon]</div>
          <h4>24/7 Support</h4>
          <p>Real humans ready to help whenever you need</p>
        </div>
        <div class="trust-item">
          <div class="trust-icon">[Icon]</div>
          <h4>30-Day Guarantee</h4>
          <p>Not satisfied? Get a full refund, no questions asked</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Final CTA -->
  <section class="cta-section">
    <div class="container">
      <h2>Ready to build your community?</h2>
      <p>Join 50,000+ creators who've found their home on [Platform]</p>
      <div class="cta-buttons">
        <a href="#signup" class="btn-primary-large">Start Your 14-Day Free Trial</a>
        <p class="cta-note">No credit card required • Setup in 5 minutes</p>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer>
    <div class="container">
      <div class="footer-grid">
        <div class="footer-col">
          <h4>Product</h4>
          <ul>
            <li><a href="#">Features</a></li>
            <li><a href="#">Pricing</a></li>
            <li><a href="#">Mobile Apps</a></li>
            <li><a href="#">Integrations</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Resources</h4>
          <ul>
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Community</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Webinars</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Company</h4>
          <ul>
            <li><a href="#">About</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">Press</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Connect</h4>
          <ul>
            <li><a href="#">Twitter</a></li>
            <li><a href="#">Facebook</a></li>
            <li><a href="#">Instagram</a></li>
            <li><a href="#">LinkedIn</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2025 [Platform Name]. All rights reserved.</p>
        <ul class="footer-legal">
          <li><a href="#">Privacy</a></li>
          <li><a href="#">Terms</a></li>
          <li><a href="#">Security</a></li>
        </ul>
      </div>
    </div>
  </footer>

</body>
</html>
```

### CSS Starter (Community Platform Style)

```css
/* ==========================================================================
   Community/Membership Platform Styles
   ========================================================================== */

/* Color Palette */
:root {
  /* Primary Colors */
  --color-primary: #00D0AD;  /* Vibrant teal */
  --color-secondary: #FA4D50;  /* Warm coral */
  --color-accent: #9B51E0;  /* Creative purple */

  /* Neutrals */
  --color-white: #FFFFFF;
  --color-gray-50: #FAFAFA;
  --color-gray-100: #F4F4F4;
  --color-gray-300: #D1D1D1;
  --color-gray-600: #666666;
  --color-gray-900: #1A1A1A;

  /* Spacing Scale */
  --space-xs: 8px;
  --space-sm: 16px;
  --space-md: 24px;
  --space-lg: 32px;
  --space-xl: 48px;
  --space-2xl: 64px;
  --space-3xl: 80px;
  --space-4xl: 120px;

  /* Typography */
  --font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;

  /* Shadows */
  --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.08);
  --shadow-lg: 0 10px 30px rgba(0, 0, 0, 0.12);

  /* Border Radius */
  --radius-sm: 6px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-full: 999px;

  /* Transitions */
  --transition: 0.2s ease-in-out;
}

/* Global Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: var(--font-family);
  font-size: 16px;
  line-height: 1.6;
  color: var(--color-gray-900);
  background: var(--color-white);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-md);
}

/* Typography */
h1, h2, h3, h4, h5, h6 {
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: var(--space-md);
  color: var(--color-gray-900);
}

h1 { font-size: 56px; }
h2 { font-size: 42px; }
h3 { font-size: 28px; }
h4 { font-size: 20px; }

p {
  margin-bottom: var(--space-md);
  font-size: 18px;
  line-height: 1.7;
  color: var(--color-gray-600);
}

/* Navigation */
nav {
  background: var(--color-white);
  padding: var(--space-md) 0;
  border-bottom: 1px solid var(--color-gray-100);
  position: sticky;
  top: 0;
  z-index: 1000;
}

nav .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-links {
  display: flex;
  list-style: none;
  gap: var(--space-lg);
  align-items: center;
}

.nav-links a {
  text-decoration: none;
  color: var(--color-gray-900);
  font-weight: 500;
  transition: color var(--transition);
}

.nav-links a:hover {
  color: var(--color-primary);
}

.cta-nav {
  background: var(--color-primary);
  color: var(--color-white) !important;
  padding: var(--space-sm) var(--space-md);
  border-radius: var(--radius-full);
}

/* Hero Section */
.hero-community {
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%);
  color: var(--color-white);
  padding: var(--space-4xl) 0;
  text-align: center;
}

.hero-community h1 {
  color: var(--color-white);
  max-width: 800px;
  margin: 0 auto var(--space-md);
}

.hero-subtext {
  font-size: 20px;
  color: rgba(255, 255, 255, 0.9);
  max-width: 650px;
  margin: 0 auto var(--space-xl);
  line-height: 1.6;
}

.hero-ctas {
  display: flex;
  gap: var(--space-md);
  justify-content: center;
  margin-bottom: var(--space-md);
}

.hero-note {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
}

/* Buttons */
.btn-primary,
.btn-secondary,
.btn-outline {
  display: inline-block;
  padding: 14px 32px;
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  border-radius: var(--radius-full);
  transition: all var(--transition);
  border: 2px solid transparent;
}

.btn-primary {
  background: var(--color-primary);
  color: var(--color-white);
}

.btn-primary:hover {
  background: #00B899;
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.2);
  color: var(--color-white);
  border-color: var(--color-white);
}

.btn-secondary:hover {
  background: var(--color-white);
  color: var(--color-primary);
}

.btn-outline {
  background: transparent;
  color: var(--color-primary);
  border-color: var(--color-primary);
}

.btn-outline:hover {
  background: var(--color-primary);
  color: var(--color-white);
}

.btn-primary-large {
  padding: 18px 48px;
  font-size: 18px;
}

/* Creator Showcase */
.creators-section {
  padding: var(--space-4xl) 0;
  background: var(--color-gray-50);
}

.creators-section h2 {
  text-align: center;
  margin-bottom: var(--space-3xl);
}

.creator-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-lg);
}

.creator-card {
  background: var(--color-white);
  padding: var(--space-xl);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  text-align: center;
  transition: transform var(--transition), box-shadow var(--transition);
}

.creator-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.creator-photo {
  width: 100px;
  height: 100px;
  border-radius: var(--radius-full);
  margin-bottom: var(--space-md);
  object-fit: cover;
}

.creator-niche {
  color: var(--color-primary);
  font-weight: 600;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: var(--space-sm);
}

.creator-quote {
  font-style: italic;
  font-size: 16px;
  margin-bottom: var(--space-md);
}

.creator-stats {
  display: flex;
  justify-content: center;
  gap: var(--space-md);
  font-size: 14px;
  font-weight: 600;
  color: var(--color-gray-600);
}

/* Platform Stats */
.platform-stats {
  background: var(--color-white);
  padding: var(--space-3xl) 0;
  border-top: 1px solid var(--color-gray-100);
  border-bottom: 1px solid var(--color-gray-100);
}

.stat-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-xl);
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 48px;
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: var(--space-sm);
}

.stat-item p {
  font-size: 16px;
  color: var(--color-gray-600);
}

/* Features Grid */
.features-section {
  padding: var(--space-4xl) 0;
  background: var(--color-white);
}

.features-section h2 {
  text-align: center;
  max-width: 700px;
  margin: 0 auto var(--space-3xl);
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-xl);
}

.feature-item {
  text-align: center;
}

.feature-icon {
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  border-radius: var(--radius-md);
  margin: 0 auto var(--space-md);
}

.feature-item h3 {
  margin-bottom: var(--space-sm);
  font-size: 20px;
}

.feature-item p {
  font-size: 16px;
}

/* How It Works */
.how-it-works {
  padding: var(--space-4xl) 0;
  background: var(--color-gray-50);
}

.how-it-works h2 {
  text-align: center;
  margin-bottom: var(--space-3xl);
}

.steps-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-xl);
}

.step-card {
  text-align: center;
}

.step-number {
  display: inline-block;
  width: 48px;
  height: 48px;
  background: var(--color-primary);
  color: var(--color-white);
  border-radius: var(--radius-full);
  font-size: 24px;
  font-weight: 700;
  line-height: 48px;
  margin-bottom: var(--space-md);
}

.step-card img {
  width: 100%;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
  margin-top: var(--space-md);
}

/* Pricing Section */
.pricing-section {
  padding: var(--space-4xl) 0;
  background: var(--color-white);
}

.pricing-section h2 {
  text-align: center;
  margin-bottom: var(--space-sm);
}

.pricing-subtitle {
  text-align: center;
  font-size: 18px;
  color: var(--color-gray-600);
  margin-bottom: var(--space-xl);
}

.pricing-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-md);
  margin-bottom: var(--space-3xl);
}

.savings-badge {
  background: var(--color-secondary);
  color: var(--color-white);
  padding: 4px 8px;
  border-radius: var(--radius-sm);
  font-size: 12px;
  font-weight: 600;
  margin-left: 8px;
}

.pricing-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-lg);
  max-width: 1100px;
  margin: 0 auto;
}

.pricing-card {
  background: var(--color-white);
  border: 2px solid var(--color-gray-100);
  border-radius: var(--radius-lg);
  padding: var(--space-xl);
  position: relative;
}

.pricing-card.featured {
  border-color: var(--color-primary);
  box-shadow: var(--shadow-lg);
  transform: scale(1.05);
}

.popular-badge {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--color-primary);
  color: var(--color-white);
  padding: 6px 16px;
  border-radius: var(--radius-full);
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
}

.pricing-card h3 {
  font-size: 24px;
  margin-bottom: var(--space-md);
}

.price {
  margin-bottom: var(--space-sm);
}

.price-amount {
  font-size: 48px;
  font-weight: 700;
  color: var(--color-gray-900);
}

.price-period {
  font-size: 18px;
  color: var(--color-gray-600);
}

.price-description {
  font-size: 16px;
  color: var(--color-gray-600);
  margin-bottom: var(--space-lg);
}

.feature-list {
  list-style: none;
  margin-bottom: var(--space-xl);
}

.feature-list li {
  padding: var(--space-sm) 0;
  border-bottom: 1px solid var(--color-gray-100);
}

.feature-list li:last-child {
  border-bottom: none;
}

.pricing-card a {
  display: block;
  text-align: center;
}

/* Testimonials */
.testimonials-section {
  padding: var(--space-4xl) 0;
  background: var(--color-gray-50);
}

.testimonials-section h2 {
  text-align: center;
  margin-bottom: var(--space-3xl);
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-lg);
}

.testimonial-card {
  background: var(--color-white);
  padding: var(--space-xl);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
}

.testimonial-stars {
  color: #FFB800;
  font-size: 20px;
  margin-bottom: var(--space-md);
}

.testimonial-text {
  font-size: 16px;
  line-height: 1.7;
  margin-bottom: var(--space-lg);
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: var(--space-md);
}

.testimonial-author img {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-full);
}

.author-name {
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 4px;
}

.author-title {
  font-size: 14px;
  color: var(--color-gray-600);
}

/* Trust Section */
.trust-section {
  padding: var(--space-3xl) 0;
  background: var(--color-white);
}

.trust-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-lg);
  text-align: center;
}

.trust-icon {
  width: 56px;
  height: 56px;
  background: var(--color-gray-100);
  border-radius: var(--radius-md);
  margin: 0 auto var(--space-md);
}

.trust-item h4 {
  font-size: 18px;
  margin-bottom: var(--space-sm);
}

.trust-item p {
  font-size: 14px;
}

/* CTA Section */
.cta-section {
  padding: var(--space-4xl) 0;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%);
  color: var(--color-white);
  text-align: center;
}

.cta-section h2 {
  color: var(--color-white);
  margin-bottom: var(--space-sm);
}

.cta-section > p {
  font-size: 20px;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: var(--space-xl);
}

.cta-note {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  margin-top: var(--space-md);
}

/* Footer */
footer {
  background: var(--color-gray-900);
  color: var(--color-white);
  padding: var(--space-3xl) 0 var(--space-lg);
}

.footer-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-xl);
  margin-bottom: var(--space-2xl);
}

.footer-col h4 {
  color: var(--color-white);
  font-size: 16px;
  margin-bottom: var(--space-md);
}

.footer-col ul {
  list-style: none;
}

.footer-col a {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  line-height: 2;
  transition: color var(--transition);
}

.footer-col a:hover {
  color: var(--color-white);
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: var(--space-lg);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-legal {
  display: flex;
  list-style: none;
  gap: var(--space-lg);
}

.footer-legal a {
  color: rgba(255, 255, 255, 0.5);
}

/* Responsive Design */
@media (max-width: 1024px) {
  .creator-grid,
  .feature-grid,
  .steps-grid,
  .pricing-grid,
  .testimonials-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .stat-row,
  .trust-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-lg);
  }
}

@media (max-width: 768px) {
  h1 { font-size: 36px; }
  h2 { font-size: 28px; }

  .creator-grid,
  .feature-grid,
  .steps-grid,
  .pricing-grid,
  .testimonials-grid,
  .stat-row,
  .trust-grid,
  .footer-grid {
    grid-template-columns: 1fr;
  }

  .pricing-card.featured {
    transform: scale(1);
  }

  .hero-ctas {
    flex-direction: column;
  }

  .nav-links {
    flex-direction: column;
    align-items: flex-start;
  }
}
```

---

## TEMPLATE 3: Done-For-You Productized Service

### HTML Structure (Complete)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>[Service Name] - Design Subscription for Everyone</title>
</head>
<body>

  <!-- Navigation -->
  <nav>
    <div class="logo">[Service Logo]</div>
    <ul class="nav-links">
      <li><a href="#work">Work</a></li>
      <li><a href="#services">Services</a></li>
      <li><a href="#pricing">Pricing</a></li>
      <li><a href="#faq">FAQ</a></li>
      <li><a href="mailto:hello@yourservice.com" class="cta-nav">Get Started</a></li>
    </ul>
  </nav>

  <!-- Hero Section -->
  <section class="hero hero-productized">
    <div class="container">
      <h1>Unlimited design requests for one flat monthly rate</h1>
      <p class="hero-subtext">
        Get professional design work delivered in 48 hours on average.
        Pause or cancel anytime. No contracts, no surprises.
      </p>
      <div class="hero-ctas">
        <a href="#pricing" class="btn-primary">See Plans</a>
        <a href="#booking" class="btn-secondary">Book a Call</a>
      </div>
      <p class="hero-note">
        Currently limited availability • Next opening: [Date]
      </p>
    </div>
  </section>

  <!-- How It Works -->
  <section class="how-it-works-simple">
    <div class="container">
      <div class="process-steps">

        <div class="process-step">
          <span class="process-number">1</span>
          <h3>Subscribe</h3>
          <p>Choose your plan and get instant access to your project dashboard.</p>
        </div>

        <div class="process-step">
          <span class="process-number">2</span>
          <h3>Request</h3>
          <p>Add unlimited design requests to your queue via Trello or email.</p>
        </div>

        <div class="process-step">
          <span class="process-number">3</span>
          <h3>Receive</h3>
          <p>Get your designs in 48 hours on average. Revise until perfect.</p>
        </div>

      </div>
    </div>
  </section>

  <!-- Benefits -->
  <section class="benefits-section">
    <div class="container">
      <h2>Why choose a design subscription?</h2>
      <div class="benefits-grid">

        <div class="benefit-card">
          <div class="benefit-icon">⚡</div>
          <h3>Lightning fast</h3>
          <p>Get your first design back within 48 hours on average.
             Much faster than hiring or working with agencies.</p>
        </div>

        <div class="benefit-card">
          <div class="benefit-icon">♾️</div>
          <h3>Unlimited requests</h3>
          <p>Add as many design requests to your queue as you'd like.
             We'll work through them one by one.</p>
        </div>

        <div class="benefit-card">
          <div class="benefit-icon">🔄</div>
          <h3>Unlimited revisions</h3>
          <p>Don't love it? No problem. We'll keep revising until
             you're 100% satisfied with the result.</p>
        </div>

        <div class="benefit-card">
          <div class="benefit-icon">⏸️</div>
          <h3>Pause anytime</h3>
          <p>Only need design work some months? Pause your subscription
             and resume whenever you're ready.</p>
        </div>

        <div class="benefit-card">
          <div class="benefit-icon">💰</div>
          <h3>Fixed monthly rate</h3>
          <p>No hourly billing surprises. Pay the same flat rate
             every month, no matter how much work you need.</p>
        </div>

        <div class="benefit-card">
          <div class="benefit-icon">👤</div>
          <h3>Dedicated designer</h3>
          <p>Work with the same designer who learns your brand
             and style preferences over time.</p>
        </div>

      </div>
    </div>
  </section>

  <!-- Portfolio Gallery -->
  <section id="work" class="portfolio-section">
    <div class="container">
      <h2>Recent work</h2>
      <p class="portfolio-intro">
        From startups to established brands, see the quality and
        range of work we deliver every week.
      </p>

      <div class="portfolio-filters">
        <button class="filter-btn active" data-filter="all">All Work</button>
        <button class="filter-btn" data-filter="web">Web Design</button>
        <button class="filter-btn" data-filter="branding">Branding</button>
        <button class="filter-btn" data-filter="social">Social Media</button>
        <button class="filter-btn" data-filter="marketing">Marketing</button>
      </div>

      <div class="portfolio-grid">
        <div class="portfolio-item" data-category="web">
          <img src="work1.jpg" alt="Project name">
          <div class="portfolio-overlay">
            <h4>E-commerce Website</h4>
            <p>Shopify store design</p>
          </div>
        </div>
        <div class="portfolio-item" data-category="branding">
          <img src="work2.jpg" alt="Project name">
          <div class="portfolio-overlay">
            <h4>Brand Identity</h4>
            <p>Logo, colors, typography</p>
          </div>
        </div>
        <div class="portfolio-item" data-category="social">
          <img src="work3.jpg" alt="Project name">
          <div class="portfolio-overlay">
            <h4>Social Media Graphics</h4>
            <p>Instagram templates</p>
          </div>
        </div>
        <!-- Add more portfolio items -->
      </div>

      <div class="portfolio-cta">
        <a href="https://figma.com/your-portfolio" target="_blank" class="btn-outline">
          View Full Portfolio on Figma
        </a>
      </div>
    </div>
  </section>

  <!-- Services Included -->
  <section id="services" class="services-included">
    <div class="container">
      <h2>Services included</h2>
      <p class="services-intro">
        One subscription covers all your design needs. No separate
        pricing for different project types.
      </p>

      <div class="services-columns">
        <div class="services-column">
          <h3>Digital</h3>
          <ul class="services-list">
            <li>Website design</li>
            <li>Landing pages</li>
            <li>Mobile app UI</li>
            <li>Email templates</li>
            <li>Social media graphics</li>
            <li>Display ads</li>
            <li>Infographics</li>
          </ul>
        </div>

        <div class="services-column">
          <h3>Branding</h3>
          <ul class="services-list">
            <li>Logo design</li>
            <li>Brand guidelines</li>
            <li>Business cards</li>
            <li>Letterheads</li>
            <li>Brand illustrations</li>
            <li>Icon design</li>
            <li>Typography systems</li>
          </ul>
        </div>

        <div class="services-column">
          <h3>Marketing</h3>
          <ul class="services-list">
            <li>Presentation decks</li>
            <li>Sales collateral</li>
            <li>Brochures & flyers</li>
            <li>Packaging design</li>
            <li>Merchandise</li>
            <li>Print materials</li>
            <li>Event graphics</li>
          </ul>
        </div>
      </div>

      <p class="services-note">
        Don't see what you need? Just ask. If it's design-related,
        we can probably help.
      </p>
    </div>
  </section>

  <!-- Pricing Section -->
  <section id="pricing" class="pricing-section-productized">
    <div class="container">
      <h2>Simple, transparent pricing</h2>
      <p class="pricing-subtitle">
        No hidden fees. Pause or cancel anytime.
      </p>

      <div class="pricing-card-single">
        <div class="pricing-header">
          <h3>Design Subscription</h3>
          <div class="price-large">
            <span class="currency">$</span>
            <span class="amount">4,995</span>
            <span class="period">/month</span>
          </div>
        </div>

        <div class="pricing-features">
          <h4>What's included:</h4>
          <ul>
            <li><strong>Unlimited design requests</strong> - Add as many to your queue as you need</li>
            <li><strong>Unlimited revisions</strong> - We'll revise until you're 100% satisfied</li>
            <li><strong>48-hour average turnaround</strong> - Most requests completed within 2 business days</li>
            <li><strong>Dedicated designer</strong> - Same designer learns your brand and style</li>
            <li><strong>No contracts</strong> - Month-to-month, cancel anytime</li>
            <li><strong>Pause anytime</strong> - Only pay for months you need us</li>
            <li><strong>All file formats</strong> - Source files, PDFs, PNGs, JPGs included</li>
            <li><strong>Async communication</strong> - Slack, Trello, or email - your choice</li>
            <li><strong>Stock photos included</strong> - Access to premium stock libraries</li>
          </ul>
        </div>

        <div class="pricing-ctas">
          <a href="#subscribe" class="btn-primary-large">Subscribe Now</a>
          <a href="#booking" class="btn-outline-large">Book Intro Call</a>
        </div>

        <p class="pricing-footnote">
          Try it risk-free for one week. Not satisfied? Get 75% back.
        </p>
      </div>

      <div class="pricing-comparison">
        <h3>How it compares</h3>
        <table class="comparison-table">
          <thead>
            <tr>
              <th></th>
              <th>Subscription</th>
              <th>Freelancer</th>
              <th>Agency</th>
              <th>In-house</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Monthly cost</td>
              <td><strong>$4,995</strong></td>
              <td>$5,000-$12,000</td>
              <td>$12,000-$25,000</td>
              <td>$6,000-$10,000</td>
            </tr>
            <tr>
              <td>Turnaround</td>
              <td><strong>48 hours avg</strong></td>
              <td>1-2 weeks</td>
              <td>2-4 weeks</td>
              <td>Varies</td>
            </tr>
            <tr>
              <td>Revisions</td>
              <td><strong>Unlimited</strong></td>
              <td>2-3 rounds</td>
              <td>3 rounds</td>
              <td>Unlimited</td>
            </tr>
            <tr>
              <td>Flexibility</td>
              <td><strong>Pause anytime</strong></td>
              <td>Project-based</td>
              <td>Contract required</td>
              <td>Full-time salary</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>

  <!-- Guarantees -->
  <section class="guarantees-section">
    <div class="container">
      <h2>Our guarantees</h2>
      <div class="guarantees-grid">

        <div class="guarantee-card">
          <div class="guarantee-icon">🏆</div>
          <h3>Quality Guarantee</h3>
          <p>Every design is created by experienced professionals,
             not outsourced or automated. You work directly with me.</p>
        </div>

        <div class="guarantee-card">
          <div class="guarantee-icon">💯</div>
          <h3>Satisfaction Guarantee</h3>
          <p>Not loving it after a week? You'll get 75% of your
             first month back, no questions asked.</p>
        </div>

        <div class="guarantee-card">
          <div class="guarantee-icon">⚡</div>
          <h3>Speed Guarantee</h3>
          <p>Most requests completed within 48 hours. If we're
             ever slow, your next month is discounted.</p>
        </div>

        <div class="guarantee-card">
          <div class="guarantee-icon">🔒</div>
          <h3>No Lock-In</h3>
          <p>Cancel anytime with one click. No penalties, no
             awkward conversations, no hard feelings.</p>
        </div>

      </div>
    </div>
  </section>

  <!-- Testimonials -->
  <section class="testimonials-productized">
    <div class="container">
      <h2>What clients say</h2>
      <div class="testimonials-grid-simple">

        <div class="testimonial-simple">
          <div class="testimonial-stars">★★★★★</div>
          <p class="testimonial-text">
            "We needed design work fast for a product launch. [Service]
            delivered 20+ graphics in a week. The quality was incredible
            and the unlimited revisions meant everything was pixel-perfect."
          </p>
          <div class="testimonial-author-simple">
            <strong>Jessica Moore</strong>
            <span>Head of Marketing, Teachable</span>
          </div>
        </div>

        <div class="testimonial-simple">
          <div class="testimonial-stars">★★★★★</div>
          <p class="testimonial-text">
            "This is so much better than hiring a full-time designer.
            I pause during slow months and resume when we're busy.
            Saved us over $40K this year."
          </p>
          <div class="testimonial-author-simple">
            <strong>David Park</strong>
            <span>Founder, SaaS Startup</span>
          </div>
        </div>

        <div class="testimonial-simple">
          <div class="testimonial-stars">★★★★★</div>
          <p class="testimonial-text">
            "The 48-hour turnaround is a game-changer. We can move
            fast on campaigns without waiting weeks for agency delays.
            Quality is consistently excellent."
          </p>
          <div class="testimonial-author-simple">
            <strong>Rachel Kim</strong>
            <span>Creative Director, Decathlon</span>
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- FAQ Section -->
  <section id="faq" class="faq-section">
    <div class="container">
      <h2>Frequently asked questions</h2>
      <div class="faq-list">

        <div class="faq-item">
          <h3 class="faq-question">How does the unlimited requests work?</h3>
          <div class="faq-answer">
            <p>Once subscribed, you can add as many design requests to your
            queue as you'd like. They'll be worked on one at a time and
            delivered sequentially. Most requests are completed within 48 hours,
            so you'll receive new designs every few days.</p>
          </div>
        </div>

        <div class="faq-item">
          <h3 class="faq-question">What's the average turnaround time?</h3>
          <div class="faq-answer">
            <p>Most requests are completed within two business days on average.
            Complex projects may take longer. I'll always give you an estimated
            timeline upfront so you know when to expect delivery.</p>
          </div>
        </div>

        <div class="faq-item">
          <h3 class="faq-question">How do unlimited revisions work?</h3>
          <div class="faq-answer">
            <p>After each design delivery, you can request as many revisions as
            needed until you're 100% satisfied. There's no limit on revision rounds.
            I want you to love the final result.</p>
          </div>
        </div>

        <div class="faq-item">
          <h3 class="faq-question">Can I pause my subscription?</h3>
          <div class="faq-answer">
            <p>Yes! You can pause your subscription at any time. When paused,
            your billing cycle is paused too. Resume whenever you're ready and
            pick up right where you left off. Perfect for seasonal businesses
            or when you don't need design work every month.</p>
          </div>
        </div>

        <div class="faq-item">
          <h3 class="faq-question">Who does the design work?</h3>
          <div class="faq-answer">
            <p>All design work is done by me personally - [Your Name]. I don't
            outsource to contractors or use design agencies. You're working
            directly with an experienced designer who will learn your brand
            and preferences over time.</p>
          </div>
        </div>

        <div class="faq-item">
          <h3 class="faq-question">What if I don't like the designs?</h3>
          <div class="faq-answer">
            <p>If you're not satisfied after the first week, you'll get 75% of
            your first month back. After that, you can cancel anytime if things
            aren't working out. But with unlimited revisions, we usually get to
            something you love.</p>
          </div>
        </div>

        <div class="faq-item">
          <h3 class="faq-question">How do I request designs?</h3>
          <div class="faq-answer">
            <p>You can request designs via Trello (visual board), Slack (direct
            messaging), or email - whatever works best for you. Just describe
            what you need, share any reference images, and I'll take it from there.</p>
          </div>
        </div>

        <div class="faq-item">
          <h3 class="faq-question">What file formats do I receive?</h3>
          <div class="faq-answer">
            <p>You'll receive all source files (Figma, Adobe), plus export formats
            like PDF, PNG, JPG, and SVG. Everything you need to use your designs
            across web, print, and social media.</p>
          </div>
        </div>

        <div class="faq-item">
          <h3 class="faq-question">Do you offer refunds?</h3>
          <div class="faq-answer">
            <p>Yes. If you're not happy after the first week, you'll receive 75%
            of your first month back. After that, you can cancel before your next
            billing cycle with no penalties.</p>
          </div>
        </div>

        <div class="faq-item">
          <h3 class="faq-question">Is there a limit to how many brands I can request designs for?</h3>
          <div class="faq-answer">
            <p>Nope! You can request designs for multiple brands, clients, or
            projects. Perfect for agencies, freelancers, and consultants managing
            multiple clients.</p>
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- Final CTA -->
  <section class="final-cta-productized">
    <div class="container">
      <h2>Ready to get started?</h2>
      <p>Subscribe today and get your first design back within 48 hours.</p>
      <div class="final-cta-buttons">
        <a href="#subscribe" class="btn-primary-xl">Subscribe Now</a>
        <a href="mailto:hello@yourservice.com" class="btn-outline-xl">Email Questions</a>
      </div>
      <p class="final-cta-note">
        ⚡ Limited availability • Currently booking [X] weeks out
      </p>
    </div>
  </section>

  <!-- Footer -->
  <footer class="footer-simple">
    <div class="container">
      <div class="footer-content">
        <div class="footer-brand">
          <div class="footer-logo">[Service Logo]</div>
          <p>Unlimited design requests for one flat monthly rate.</p>
        </div>
        <div class="footer-links">
          <a href="#work">Work</a>
          <a href="#services">Services</a>
          <a href="#pricing">Pricing</a>
          <a href="#faq">FAQ</a>
          <a href="mailto:hello@yourservice.com">Contact</a>
        </div>
      </div>
      <div class="footer-bottom-simple">
        <p>&copy; 2025 [Service Name]. All rights reserved.</p>
        <div class="footer-legal-links">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
        </div>
      </div>
    </div>
  </footer>

</body>
</html>
```

### CSS Starter (Productized Service Style)

```css
/* ==========================================================================
   Productized Done-For-You Service Styles
   ========================================================================== */

/* Color Palette */
:root {
  /* Primary Colors */
  --color-primary: #0099F6;  /* Friendly blue */
  --color-accent: #FF3366;  /* Vibrant pink/coral */
  --color-success: #6BCF7F;  /* Mint green */

  /* Neutrals */
  --color-white: #FFFFFF;
  --color-gray-50: #F9F9F9;
  --color-gray-100: #F4F4F4;
  --color-gray-300: #D1D1D1;
  --color-gray-600: #666666;
  --color-gray-900: #2D2D2D;

  /* Spacing */
  --space-xs: 8px;
  --space-sm: 16px;
  --space-md: 24px;
  --space-lg: 32px;
  --space-xl: 48px;
  --space-2xl: 64px;
  --space-3xl: 96px;
  --space-4xl: 120px;

  /* Typography */
  --font-family: 'Inter', -apple-system, sans-serif;

  /* Border Radius */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.06);
  --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.08);
  --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.12);
}

/* Global Reset */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: var(--font-family);
  font-size: 18px;
  line-height: 1.7;
  color: var(--color-gray-900);
  background: var(--color-white);
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 var(--space-md);
}

/* Typography */
h1, h2, h3, h4 {
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: var(--space-md);
  color: var(--color-gray-900);
}

h1 { font-size: 64px; }
h2 { font-size: 48px; }
h3 { font-size: 32px; }
h4 { font-size: 24px; }

p {
  margin-bottom: var(--space-md);
  color: var(--color-gray-600);
}

/* Navigation */
nav {
  background: var(--color-white);
  padding: var(--space-lg) 0;
  border-bottom: 1px solid var(--color-gray-100);
  position: sticky;
  top: 0;
  z-index: 1000;
}

nav .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-links {
  display: flex;
  list-style: none;
  gap: var(--space-xl);
  align-items: center;
}

.nav-links a {
  text-decoration: none;
  color: var(--color-gray-900);
  font-weight: 500;
  transition: color 0.2s;
}

.nav-links a:hover {
  color: var(--color-primary);
}

.cta-nav {
  background: var(--color-primary);
  color: var(--color-white) !important;
  padding: 12px 24px;
  border-radius: var(--radius-full);
}

/* Hero */
.hero-productized {
  padding: var(--space-4xl) 0;
  text-align: center;
}

.hero-productized h1 {
  max-width: 900px;
  margin: 0 auto var(--space-md);
}

.hero-subtext {
  font-size: 22px;
  color: var(--color-gray-600);
  max-width: 700px;
  margin: 0 auto var(--space-xl);
}

.hero-ctas {
  display: flex;
  gap: var(--space-md);
  justify-content: center;
  margin-bottom: var(--space-md);
}

.hero-note {
  font-size: 16px;
  color: var(--color-gray-600);
}

/* Buttons */
.btn-primary,
.btn-secondary,
.btn-outline,
.btn-primary-large,
.btn-outline-large,
.btn-primary-xl,
.btn-outline-xl {
  display: inline-block;
  padding: 16px 32px;
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  border-radius: var(--radius-full);
  transition: all 0.2s;
  border: 2px solid transparent;
}

.btn-primary,
.btn-primary-large,
.btn-primary-xl {
  background: var(--color-primary);
  color: var(--color-white);
}

.btn-primary:hover {
  background: #0088DD;
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.btn-secondary {
  background: var(--color-gray-100);
  color: var(--color-gray-900);
}

.btn-secondary:hover {
  background: var(--color-gray-300);
}

.btn-outline,
.btn-outline-large,
.btn-outline-xl {
  background: transparent;
  color: var(--color-primary);
  border-color: var(--color-primary);
}

.btn-outline:hover {
  background: var(--color-primary);
  color: var(--color-white);
}

.btn-primary-large,
.btn-outline-large {
  padding: 18px 40px;
  font-size: 18px;
}

.btn-primary-xl,
.btn-outline-xl {
  padding: 20px 48px;
  font-size: 20px;
}

/* Process Steps */
.how-it-works-simple {
  padding: var(--space-3xl) 0;
  background: var(--color-gray-50);
}

.process-steps {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-xl);
  text-align: center;
}

.process-number {
  display: inline-block;
  width: 56px;
  height: 56px;
  background: var(--color-primary);
  color: var(--color-white);
  border-radius: var(--radius-full);
  font-size: 28px;
  font-weight: 700;
  line-height: 56px;
  margin-bottom: var(--space-md);
}

.process-step h3 {
  margin-bottom: var(--space-sm);
}

/* Benefits Grid */
.benefits-section {
  padding: var(--space-4xl) 0;
}

.benefits-section h2 {
  text-align: center;
  margin-bottom: var(--space-3xl);
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-lg);
}

.benefit-card {
  padding: var(--space-xl);
  text-align: center;
}

.benefit-icon {
  font-size: 48px;
  margin-bottom: var(--space-md);
}

.benefit-card h3 {
  margin-bottom: var(--space-sm);
}

/* Portfolio */
.portfolio-section {
  padding: var(--space-4xl) 0;
  background: var(--color-gray-50);
}

.portfolio-section h2 {
  text-align: center;
  margin-bottom: var(--space-md);
}

.portfolio-intro {
  text-align: center;
  max-width: 700px;
  margin: 0 auto var(--space-xl);
}

.portfolio-filters {
  display: flex;
  justify-content: center;
  gap: var(--space-md);
  margin-bottom: var(--space-3xl);
}

.filter-btn {
  padding: 12px 24px;
  background: var(--color-white);
  border: 2px solid var(--color-gray-300);
  border-radius: var(--radius-full);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.filter-btn:hover,
.filter-btn.active {
  background: var(--color-primary);
  color: var(--color-white);
  border-color: var(--color-primary);
}

.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-lg);
  margin-bottom: var(--space-xl);
}

.portfolio-item {
  position: relative;
  border-radius: var(--radius-md);
  overflow: hidden;
  aspect-ratio: 4/3;
}

.portfolio-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.portfolio-item:hover img {
  transform: scale(1.05);
}

.portfolio-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
  color: var(--color-white);
  padding: var(--space-lg);
  opacity: 0;
  transition: opacity 0.3s;
}

.portfolio-item:hover .portfolio-overlay {
  opacity: 1;
}

.portfolio-cta {
  text-align: center;
}

/* Services Included */
.services-included {
  padding: var(--space-4xl) 0;
  background: var(--color-white);
}

.services-included h2 {
  text-align: center;
  margin-bottom: var(--space-md);
}

.services-intro {
  text-align: center;
  max-width: 700px;
  margin: 0 auto var(--space-3xl);
}

.services-columns {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-2xl);
  margin-bottom: var(--space-xl);
}

.services-column h3 {
  margin-bottom: var(--space-md);
  color: var(--color-primary);
}

.services-list {
  list-style: none;
}

.services-list li {
  padding: var(--space-sm) 0;
  padding-left: var(--space-md);
  position: relative;
}

.services-list li:before {
  content: "✓";
  position: absolute;
  left: 0;
  color: var(--color-success);
  font-weight: 700;
}

.services-note {
  text-align: center;
  font-style: italic;
  color: var(--color-gray-600);
}

/* Pricing */
.pricing-section-productized {
  padding: var(--space-4xl) 0;
  background: var(--color-gray-50);
}

.pricing-section-productized h2 {
  text-align: center;
  margin-bottom: var(--space-sm);
}

.pricing-subtitle {
  text-align: center;
  color: var(--color-gray-600);
  margin-bottom: var(--space-3xl);
}

.pricing-card-single {
  max-width: 800px;
  margin: 0 auto var(--space-3xl);
  background: var(--color-white);
  border-radius: var(--radius-lg);
  padding: var(--space-2xl);
  box-shadow: var(--shadow-lg);
}

.pricing-header {
  text-align: center;
  padding-bottom: var(--space-xl);
  border-bottom: 2px solid var(--color-gray-100);
  margin-bottom: var(--space-xl);
}

.price-large {
  margin-top: var(--space-md);
}

.currency,
.period {
  font-size: 32px;
  color: var(--color-gray-600);
}

.amount {
  font-size: 72px;
  font-weight: 700;
  color: var(--color-gray-900);
}

.pricing-features h4 {
  margin-bottom: var(--space-md);
}

.pricing-features ul {
  list-style: none;
  margin-bottom: var(--space-xl);
}

.pricing-features li {
  padding: var(--space-md) 0;
  border-bottom: 1px solid var(--color-gray-100);
}

.pricing-ctas {
  display: flex;
  gap: var(--space-md);
  justify-content: center;
  margin-bottom: var(--space-md);
}

.pricing-footnote {
  text-align: center;
  font-size: 14px;
  color: var(--color-gray-600);
}

.pricing-comparison {
  max-width: 900px;
  margin: 0 auto;
}

.pricing-comparison h3 {
  text-align: center;
  margin-bottom: var(--space-lg);
}

.comparison-table {
  width: 100%;
  border-collapse: collapse;
  background: var(--color-white);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.comparison-table th,
.comparison-table td {
  padding: var(--space-md);
  text-align: left;
  border-bottom: 1px solid var(--color-gray-100);
}

.comparison-table th {
  background: var(--color-gray-50);
  font-weight: 700;
}

/* Guarantees */
.guarantees-section {
  padding: var(--space-4xl) 0;
  background: var(--color-white);
}

.guarantees-section h2 {
  text-align: center;
  margin-bottom: var(--space-3xl);
}

.guarantees-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-lg);
}

.guarantee-card {
  text-align: center;
  padding: var(--space-xl);
}

.guarantee-icon {
  font-size: 56px;
  margin-bottom: var(--space-md);
}

/* Testimonials */
.testimonials-productized {
  padding: var(--space-4xl) 0;
  background: var(--color-gray-50);
}

.testimonials-productized h2 {
  text-align: center;
  margin-bottom: var(--space-3xl);
}

.testimonials-grid-simple {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-lg);
}

.testimonial-simple {
  background: var(--color-white);
  padding: var(--space-xl);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
}

.testimonial-stars {
  color: #FFB800;
  font-size: 20px;
  margin-bottom: var(--space-md);
}

.testimonial-text {
  margin-bottom: var(--space-md);
  font-size: 16px;
  line-height: 1.6;
}

.testimonial-author-simple strong {
  display: block;
  font-weight: 600;
  margin-bottom: 4px;
}

.testimonial-author-simple span {
  font-size: 14px;
  color: var(--color-gray-600);
}

/* FAQ */
.faq-section {
  padding: var(--space-4xl) 0;
  background: var(--color-white);
}

.faq-section h2 {
  text-align: center;
  margin-bottom: var(--space-3xl);
}

.faq-list {
  max-width: 800px;
  margin: 0 auto;
}

.faq-item {
  margin-bottom: var(--space-lg);
  padding-bottom: var(--space-lg);
  border-bottom: 1px solid var(--color-gray-100);
}

.faq-question {
  margin-bottom: var(--space-md);
  cursor: pointer;
}

.faq-answer p {
  font-size: 16px;
}

/* Final CTA */
.final-cta-productized {
  padding: var(--space-4xl) 0;
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  color: var(--color-white);
  text-align: center;
}

.final-cta-productized h2 {
  color: var(--color-white);
  margin-bottom: var(--space-sm);
}

.final-cta-productized > p {
  font-size: 20px;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: var(--space-xl);
}

.final-cta-buttons {
  display: flex;
  gap: var(--space-md);
  justify-content: center;
  margin-bottom: var(--space-md);
}

.final-cta-note {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
}

/* Footer */
.footer-simple {
  background: var(--color-gray-900);
  color: var(--color-white);
  padding: var(--space-2xl) 0 var(--space-lg);
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-lg);
  padding-bottom: var(--space-lg);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-brand p {
  color: rgba(255, 255, 255, 0.7);
  margin-top: var(--space-sm);
}

.footer-links {
  display: flex;
  gap: var(--space-lg);
}

.footer-links a {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: color 0.2s;
}

.footer-links a:hover {
  color: var(--color-white);
}

.footer-bottom-simple {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-legal-links {
  display: flex;
  gap: var(--space-md);
}

.footer-legal-links a {
  color: rgba(255, 255, 255, 0.5);
  text-decoration: none;
}

/* Responsive */
@media (max-width: 1024px) {
  .process-steps,
  .benefits-grid,
  .portfolio-grid,
  .services-columns,
  .guarantees-grid,
  .testimonials-grid-simple {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  h1 { font-size: 40px; }
  h2 { font-size: 32px; }

  .process-steps,
  .benefits-grid,
  .portfolio-grid,
  .services-columns,
  .guarantees-grid,
  .testimonials-grid-simple {
    grid-template-columns: 1fr;
  }

  .hero-ctas,
  .pricing-ctas,
  .final-cta-buttons {
    flex-direction: column;
  }

  .footer-content {
    flex-direction: column;
    text-align: center;
  }

  .footer-links {
    flex-direction: column;
    margin-top: var(--space-md);
  }
}
```

---

## Implementation Checklist

### Before You Start Building

- [ ] Choose your service page style (1, 2, or 3)
- [ ] Audit existing content and identify gaps
- [ ] Gather all assets (logos, photos, portfolio items)
- [ ] Write or refine all copy (headlines, descriptions, testimonials)
- [ ] Define your color palette and design tokens
- [ ] Select font families and typography scale

### During Development

- [ ] Set up HTML structure from template
- [ ] Implement CSS with custom color palette
- [ ] Add responsive breakpoints and test on devices
- [ ] Optimize images (WebP format, lazy loading)
- [ ] Implement CTA tracking and analytics
- [ ] Add schema markup for SEO
- [ ] Test form submissions and payment flows
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)

### After Launch

- [ ] Set up A/B testing for key sections (hero, pricing, CTAs)
- [ ] Monitor conversion funnel with analytics
- [ ] Collect user feedback and testimonials
- [ ] Iterate on copy based on performance data
- [ ] Update portfolio/case studies regularly
- [ ] Monitor page speed and optimize

---

*Ready to build your service page? Choose your template and customize with your brand!*
