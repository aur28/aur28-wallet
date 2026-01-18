// preload.js
// Load simple config and expose to the renderer in a safe way.

const { contextBridge } = require('electron');
const fs = require('fs');
const path = require('path');

let config = {
  apiBaseUrl: 'https://wallet.aurum28.org',
  network: 'AUR28-Mainnet',
  demoMode: true,
};

try {
  const configPath = path.join(__dirname, 'config.json');
  if (fs.existsSync(configPath)) {
    const raw = fs.readFileSync(configPath, 'utf8');
    const parsed = JSON.parse(raw);
    config = { ...config, ...parsed };
  }
} catch (err) {
  console.error('Failed to load config.json:', err);
}

contextBridge.exposeInMainWorld('aur28', {
  version: '0.1-dev',
  config,
});
