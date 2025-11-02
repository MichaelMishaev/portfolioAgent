const fs = require('fs');
const path = require('path');

// Portfolio Elegance - Warm, gallery-focused design
const portfolioEleganceSVG = `
<svg width="1200" height="675" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#fff;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#faf8f5;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#e8dfd0;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#c9a87c;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <rect width="1200" height="675" fill="url(#bgGrad1)"/>
  
  <!-- Header -->
  <text x="600" y="120" text-anchor="middle" font-family="Arial, sans-serif" font-size="52" font-weight="300" fill="#2c2c2c" letter-spacing="3">CREATIVE STUDIO</text>
  <text x="600" y="160" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" font-weight="400" fill="#c9a87c" letter-spacing="6">INTERIOR DESIGN PORTFOLIO</text>
  
  <!-- Gallery Grid -->
  <rect x="150" y="220" width="280" height="187" rx="6" fill="url(#goldGrad)" opacity="0.9"/>
  <rect x="460" y="220" width="280" height="187" rx="6" fill="url(#goldGrad)" opacity="0.7"/>
  <rect x="770" y="220" width="280" height="187" rx="6" fill="url(#goldGrad)" opacity="0.8"/>
  <rect x="150" y="437" width="280" height="187" rx="6" fill="url(#goldGrad)" opacity="0.6"/>
  <rect x="460" y="437" width="280" height="187" rx="6" fill="url(#goldGrad)" opacity="0.85"/>
  <rect x="770" y="437" width="280" height="187" rx="6" fill="url(#goldGrad)" opacity="0.75"/>
</svg>
`;

// Professional Authority - Luxury corporate design
const professionalAuthoritySVG = `
<svg width="1200" height="675" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="darkGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#1a1a2e;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#2a2a3e;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <rect width="1200" height="675" fill="url(#darkGrad)"/>
  
  <!-- Navigation Bar -->
  <line x1="100" y1="100" x2="1100" y2="100" stroke="rgba(212,175,55,0.3)" stroke-width="1"/>
  <text x="100" y="75" font-family="Georgia, serif" font-size="28" font-weight="600" fill="#d4af37">EXECUTIVE</text>
  <text x="850" y="75" font-family="Arial, sans-serif" font-size="14" font-weight="400" fill="#f5f5f5" letter-spacing="2">ABOUT</text>
  <text x="940" y="75" font-family="Arial, sans-serif" font-size="14" font-weight="400" fill="#f5f5f5" letter-spacing="2">SERVICES</text>
  <text x="1050" y="75" font-family="Arial, sans-serif" font-size="14" font-weight="400" fill="#f5f5f5" letter-spacing="2">CONTACT</text>
  
  <!-- Hero Content -->
  <text x="100" y="240" font-family="Georgia, serif" font-size="68" font-weight="400" fill="#ffffff">Building</text>
  <text x="100" y="320" font-family="Georgia, serif" font-size="68" font-weight="400" fill="#d4af37">Excellence</text>
  <text x="100" y="400" font-family="Georgia, serif" font-size="68" font-weight="400" fill="#ffffff">Through Vision</text>
  
  <text x="100" y="470" font-family="Arial, sans-serif" font-size="20" fill="rgba(255,255,255,0.7)">Premium consulting services for enterprise clients.</text>
  <text x="100" y="505" font-family="Arial, sans-serif" font-size="20" fill="rgba(255,255,255,0.7)">Strategic solutions that drive measurable results.</text>
  
  <!-- CTA Button -->
  <rect x="100" y="540" width="280" height="55" rx="6" fill="#d4af37"/>
  <text x="240" y="575" text-anchor="middle" font-family="Arial, sans-serif" font-size="15" font-weight="600" fill="#1a1a2e" letter-spacing="1.5">SCHEDULE CONSULTATION</text>
</svg>
`;

// Tech Pioneer - Modern tech design
const techPioneerSVG = `
<svg width="1200" height="675" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="techGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0f172a;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#1e293b;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#06b6d4;stop-opacity:1" />
    </linearGradient>
    <radialGradient id="glow">
      <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:0.3" />
      <stop offset="70%" style="stop-color:#3b82f6;stop-opacity:0" />
    </radialGradient>
  </defs>
  
  <rect width="1200" height="675" fill="url(#techGrad)"/>
  
  <!-- Glow Effect -->
  <circle cx="950" cy="200" r="350" fill="url(#glow)"/>
  
  <!-- Logo -->
  <text x="80" y="70" font-family="Arial, sans-serif" font-size="24" font-weight="700" fill="#3b82f6">PIONEER</text>
  
  <!-- Hero Text -->
  <text x="80" y="200" font-family="Arial, sans-serif" font-size="58" font-weight="700" fill="#ffffff">Next-Gen</text>
  <text x="80" y="270" font-family="Arial, sans-serif" font-size="58" font-weight="700" fill="url(#blueGrad)">Technology</text>
  <text x="80" y="340" font-family="Arial, sans-serif" font-size="58" font-weight="700" fill="#ffffff">Solutions</text>
  
  <text x="80" y="390" font-family="Arial, sans-serif" font-size="18" fill="rgba(255,255,255,0.7)">Empowering businesses with cutting-edge AI and</text>
  <text x="80" y="420" font-family="Arial, sans-serif" font-size="18" fill="rgba(255,255,255,0.7)">cloud infrastructure. Build faster, scale smarter.</text>
  
  <!-- Feature Cards -->
  <rect x="80" y="470" width="220" height="90" rx="10" fill="rgba(59,130,246,0.1)" stroke="rgba(59,130,246,0.3)" stroke-width="1"/>
  <text x="95" y="505" font-family="Arial, sans-serif" font-size="16" font-weight="600" fill="#3b82f6">Cloud Native</text>
  <text x="95" y="530" font-family="Arial, sans-serif" font-size="13" fill="rgba(255,255,255,0.5)">Scalable infrastructure</text>
  
  <rect x="320" y="470" width="220" height="90" rx="10" fill="rgba(59,130,246,0.1)" stroke="rgba(59,130,246,0.3)" stroke-width="1"/>
  <text x="335" y="505" font-family="Arial, sans-serif" font-size="16" font-weight="600" fill="#3b82f6">AI Powered</text>
  <text x="335" y="530" font-family="Arial, sans-serif" font-size="13" fill="rgba(255,255,255,0.5)">Intelligent automation</text>
  
  <!-- Visual Grid on Right -->
  <rect x="700" y="200" width="420" height="340" rx="12" fill="rgba(59,130,246,0.08)" stroke="rgba(59,130,246,0.2)" stroke-width="2"/>
  
  <!-- Grid items -->
  <rect x="730" y="230" width="110" height="90" rx="8" fill="rgba(6,182,212,0.15)"/>
  <rect x="860" y="230" width="110" height="90" rx="8" fill="rgba(6,182,212,0.2)"/>
  <rect x="990" y="230" width="110" height="90" rx="8" fill="rgba(6,182,212,0.15)"/>
  
  <rect x="730" y="340" width="110" height="90" rx="8" fill="rgba(6,182,212,0.2)"/>
  <rect x="860" y="340" width="110" height="90" rx="8" fill="rgba(6,182,212,0.15)"/>
  <rect x="990" y="340" width="110" height="90" rx="8" fill="rgba(6,182,212,0.25)"/>
  
  <rect x="730" y="450" width="110" height="90" rx="8" fill="rgba(6,182,212,0.15)"/>
  <rect x="860" y="450" width="110" height="90" rx="8" fill="rgba(6,182,212,0.2)"/>
  <rect x="990" y="450" width="110" height="90" rx="8" fill="rgba(6,182,212,0.15)"/>
</svg>
`;

// Save SVG files
const outputDir = path.join(__dirname, 'public', 'previews');

fs.writeFileSync(path.join(outputDir, 'lin-portfolio-elegance.svg'), portfolioEleganceSVG.trim());
fs.writeFileSync(path.join(outputDir, 'lin-professional-authority.svg'), professionalAuthoritySVG.trim());
fs.writeFileSync(path.join(outputDir, 'lin-tech-pioneer.svg'), techPioneerSVG.trim());

console.log('✅ SVG previews created successfully!');
console.log('   - lin-portfolio-elegance.svg');
console.log('   - lin-professional-authority.svg');
console.log('   - lin-tech-pioneer.svg');
