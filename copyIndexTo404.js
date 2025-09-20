import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Helper to get __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distPath = path.join(__dirname, 'dist');
const indexFile = path.join(distPath, 'index.html');
const targetFile = path.join(distPath, '404.html');

try {
  fs.copyFileSync(indexFile, targetFile);
  console.log('✅ 404.html created from index.html');
} catch (err) {
  console.error('❌ Failed to create 404.html:', err);
  process.exit(1);
}
