const fs = require('fs');
const path = require('path');

const i18nDir = path.join(__dirname, 'src/i18n');
const files = fs.readdirSync(i18nDir).filter(f => f.endsWith('.json') && f !== 'zh.json');

function removeEmojis(str) {
  if (typeof str !== 'string') return str;
  return str.replace(/[\u{1F300}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1FA70}-\u{1FAFF}\u{1F1E0}-\u{1F1FF}\u{2B50}\u{231A}\u{23F3}\u{23F0}\u{1F200}-\u{1F251}]/gu, '').trim();
}

function cleanObj(obj) {
  if (Array.isArray(obj)) {
    obj.forEach(cleanObj);
  } else if (obj !== null && typeof obj === 'object') {
    delete obj.icon;
    if (typeof obj.badge === 'string' && removeEmojis(obj.badge) === '') {
      delete obj.badge;
    }
    for (const key in obj) {
      if (typeof obj[key] === 'string') {
        obj[key] = removeEmojis(obj[key]);
      } else {
        cleanObj(obj[key]);
      }
    }
  }
}

for (const file of files) {
  const filePath = path.join(i18nDir, file);
  let data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  cleanObj(data);
  // Also remove star ratings from reviews to prevent errors
  if (data.reviews && data.reviews.items) {
    data.reviews.items.forEach(item => {
      delete item.rating;
    });
  }
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  console.log(file + ' updated');
}
