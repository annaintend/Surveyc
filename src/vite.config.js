import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Custom plugin to handle figma:asset/ imports
function figmaAssetPlugin() {
  return {
    name: 'figma-asset-plugin',
    resolveId(id) {
      if (id.startsWith('figma:asset/')) {
        return id;
      }
    },
    load(id) {
      if (id.startsWith('figma:asset/')) {
        const assetPath = id.replace('figma:asset/', '');
        return `export default "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/${assetPath}"`;
      }
    }
  };
}

export default defineConfig({
  plugins: [react(), figmaAssetPlugin()],
  build: {
    outDir: 'build'
  }
});
