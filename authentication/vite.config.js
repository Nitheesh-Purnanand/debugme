// import react from '@vitejs/plugin-react';
// import { defineConfig } from 'vite';
// import tailwindcss from '@tailwindcss/vite';
// export default defineConfig({
//   server: {
//     proxy: {
//       "/api": {
//         target: "http://localhost:5001",
//         changeOrigin: true,
//         secure: false,
//       },
//     },
//   },
//   plugins: [react(),
//     tailwindcss()
//   ],
// });

// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: import.meta.env.MODE ==="development"?'http://localhost:5001':"/",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [tailwindcss(),react()],
});
