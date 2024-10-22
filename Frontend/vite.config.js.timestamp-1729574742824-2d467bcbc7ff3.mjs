// vite.config.js
import path from "path";
import react from "file:///C:/Users/ydivy/Desktop/E-commerce/Frontend/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { defineConfig } from "file:///C:/Users/ydivy/Desktop/E-commerce/Frontend/node_modules/vite/dist/node/index.js";
import dotenv from "file:///C:/Users/ydivy/Desktop/E-commerce/Frontend/node_modules/dotenv/lib/main.js";
var __vite_injected_original_dirname = "C:\\Users\\ydivy\\Desktop\\E-commerce\\Frontend";
dotenv.config({
  path: "./.env"
});
var vite_config_default = defineConfig({
  server: {
    proxy: {
      "/api": {
        target: `${process.env.VITE_BACKEND_URL}`,
        changeOrigin: true,
        secure: false
      }
    }
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFx5ZGl2eVxcXFxEZXNrdG9wXFxcXEUtY29tbWVyY2VcXFxcRnJvbnRlbmRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXHlkaXZ5XFxcXERlc2t0b3BcXFxcRS1jb21tZXJjZVxcXFxGcm9udGVuZFxcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMveWRpdnkvRGVza3RvcC9FLWNvbW1lcmNlL0Zyb250ZW5kL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIlxuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiXG5pbXBvcnQgZG90ZW52IGZyb20gJ2RvdGVudidcblxuZG90ZW52LmNvbmZpZyh7XG4gIHBhdGggOiAnLi8uZW52J1xufSlcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcblxuICBzZXJ2ZXI6IHtcbiAgICBwcm94eToge1xuICAgICAgJy9hcGknOiB7XG4gICAgICAgIHRhcmdldDogYCR7cHJvY2Vzcy5lbnYuVklURV9CQUNLRU5EX1VSTH1gLCBcbiAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxuICAgICAgICBzZWN1cmU6IGZhbHNlLFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuXG4gIHBsdWdpbnM6IFtyZWFjdCgpXSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICBcIkBcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyY1wiKSxcbiAgICB9LFxuICB9LFxuICBcbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTRULE9BQU8sVUFBVTtBQUM3VSxPQUFPLFdBQVc7QUFDbEIsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxZQUFZO0FBSG5CLElBQU0sbUNBQW1DO0FBS3pDLE9BQU8sT0FBTztBQUFBLEVBQ1osTUFBTztBQUNULENBQUM7QUFFRCxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUUxQixRQUFRO0FBQUEsSUFDTixPQUFPO0FBQUEsTUFDTCxRQUFRO0FBQUEsUUFDTixRQUFRLEdBQUcsUUFBUSxJQUFJLGdCQUFnQjtBQUFBLFFBQ3ZDLGNBQWM7QUFBQSxRQUNkLFFBQVE7QUFBQSxNQUNWO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUVBLFNBQVMsQ0FBQyxNQUFNLENBQUM7QUFBQSxFQUNqQixTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLEtBQUssUUFBUSxrQ0FBVyxPQUFPO0FBQUEsSUFDdEM7QUFBQSxFQUNGO0FBRUYsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
