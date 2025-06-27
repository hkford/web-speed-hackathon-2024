const fs = require('fs');
const path = require('path');

function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  // 使用されているフォントファイルのみをコピー
  const usedFonts = [
    'NotoSansJP-Regular.woff',
    'NotoSansJP-Medium.woff', 
    'NotoSansJP-Bold.woff'
  ];
  
  const items = fs.readdirSync(src);
  for (const item of items) {
    const srcPath = path.join(src, item);
    const destPath = path.join(dest, item);
    
    if (fs.statSync(srcPath).isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      // フォントファイルの場合は使用リストをチェック
      if (item.startsWith('NotoSansJP-') && item.endsWith('.woff')) {
        if (usedFonts.includes(item)) {
          fs.copyFileSync(srcPath, destPath);
          console.log(`Copied used font: ${item}`);
        } else {
          console.log(`Skipped unused font: ${item}`);
        }
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  }
}

// コマンドライン引数から src と dest を取得
const src = process.argv[2];
const dest = process.argv[3];

if (!src || !dest) {
  console.error('Usage: node copy-files.js <src> <dest>');
  process.exit(1);
}

try {
  copyDir(src, dest);
  console.log(`Copied ${src} to ${dest}`);
} catch (error) {
  console.error('Copy failed:', error.message);
  process.exit(1);
}