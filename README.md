# React Library components
This is to create custom React components library for publishing as NPM package.
```bash

yarn create vite react-lib --template react-ts
# Create new React vite project by with Typescript

yarn add -D json @types/node vite-plugin-dts
# Add above dependencies
```
```javascript
// Add following command to package.json scripts
"prepack": "json -f package.json -I -e \"delete this.devDependencies; delete this.dependencies\"",
"npm-pack": "cp package.json package1.json && npm pack && rm package.json && cp package1.json package.json && rm package1.json"

// Add following to package.json
"main": "./dist/my-lib.umd.js",
"module": "./dist/my-lib.es.js",
"types": "./dist/index.d.ts",
"files": [
    "dist"
  ],
"peerDependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "styled-components": "^6.1.1"
  },
  "exports": {
    ".": {
      "import": "./dist/my-lib.es.js",
      "require": "./dist/my-lib.umd.js"
    }
  },
```

## update vite.config.ts
```javascript
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, 'src/lib/index.ts'),
      name: 'MyLib',
      formats: ['es', 'umd'],
      fileName: (format) => `my-lib.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'styled-components'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'styled-components': 'styled',
        },
      },
    },
  },
});
```
```bash
# Run the following command to build and package NPM
yarn build
yarn npm-pack

#To add TGZ local package using yarn 
yarn add file:/path/to/local/tarball.tgz
