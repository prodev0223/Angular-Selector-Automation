import type { Configuration } from 'webpack';
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: { 
    background: { import: 'src/extension/background.ts', runtime: false },
    'content-script': { import: 'src/extension/content-script.ts', runtime: false } 
  },
  plugins: [
    // other plugins...
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/extension/manifest.json' },
        { from: 'src/extension/content-style.css' },
      ],
    }),
  ],
} as Configuration;
