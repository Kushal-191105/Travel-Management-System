const fs = require('fs');
const path = require('path');

const files = [
  'index.html',
  'tours.html',
  'booking.html',
  'contact.html',
  'login.html',
  'register.html',
  'mybookings.html'
];

const newHeaderCSS = `
    /* --- Beautiful Navbar --- */
    header {
      background: linear-gradient(135deg, var(--teal) 0%, var(--teal-dark) 100%);
      padding: 14px 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: white;
      position: sticky;
      top: 0;
      z-index: 60;
      box-shadow: 0 4px 20px rgba(0, 128, 128, 0.25);
    }
    .logo { font-size: 1.4rem; font-weight: 800; letter-spacing: 0.5px; text-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    nav { display: flex; align-items: center; gap: 18px; }
    nav ul { list-style: none; display: flex; gap: 8px; align-items: center; margin:0; padding:0; }
    nav a {
      color: rgba(255, 255, 255, 0.9);
      text-decoration: none;
      padding: 8px 14px;
      border-radius: 8px;
      font-weight: 600;
      font-size: 0.95rem;
      transition: all 0.3s ease;
    }
    nav a:hover {
      background: rgba(255, 255, 255, 0.15);
      color: #fff;
      transform: translateY(-1px);
    }
    nav a.active {
      background: #ffffff;
      color: var(--teal-dark);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    .hamburger {
      display: none;
      width: 44px; height: 44px;
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.15);
      border: none;
      color: white;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background 0.3s ease;
    }
    .hamburger:hover { background: rgba(255, 255, 255, 0.25); }
`;

const newMediaCSS = `
    @media (max-width: 820px) {
      header { padding: 12px 16px; }
      nav ul {
        display: none;
        position: fixed;
        top: 68px; right: 16px;
        background: #ffffff;
        padding: 16px;
        box-shadow: 0 12px 40px rgba(0, 128, 128, 0.2);
        border-radius: 14px;
        flex-direction: column;
        width: 220px;
        gap: 6px;
        z-index: 100;
        border: 1px solid rgba(0,128,128,0.08);
      }
      nav ul.show { display: flex; animation: slideDown 0.3s ease; }
      nav ul a { color: var(--teal-dark); padding: 10px 14px; }
      nav ul a:hover { background: var(--soft, #eaf6f6); color: var(--teal-dark); transform: none; }
      nav ul a.active { background: var(--teal); color: #fff; box-shadow: 0 4px 12px rgba(0, 128, 128, 0.2); }
      .hamburger { display: flex; }
    }
    @keyframes slideDown {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
`;

files.forEach(f => {
  const p = path.join('c:\\Travel management website', f);
  if(!fs.existsSync(p)) return;
  let content = fs.readFileSync(p, 'utf8');
  
  // 1. Target the main header block
  const headerRegex = /(?:\/\*\s*Header[\s\S]*?\*\/\s*)?(?:header\s*\{[\s\S]*?\.hamburger\s*\{[\s\S]*?\}\s*)/i;
  content = content.replace(headerRegex, '/* NEW_HEADER_PLACEHOLDER */\n');
  
  // 2. Remove old nav ul inside media queries
  const mediaNavRegex = /(?:nav\s*ul\s*\{[\s\S]*?\}|nav\s*ul\.show\s*\{[\s\S]*?\}|nav\s*ul\s*a\s*\{[\s\S]*?\}|\.hamburger\s*\{[\s\S]*?\})\s*/gi;
  content = content.replace(mediaNavRegex, '');
  
  // 3. Insert the new CSS
  content = content.replace('/* NEW_HEADER_PLACEHOLDER */', newHeaderCSS.trim() + '\n' + newMediaCSS);
  
  fs.writeFileSync(p, content, 'utf8');
  console.log('Processed ' + f);
});
