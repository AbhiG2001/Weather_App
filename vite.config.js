import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import dotenv from 'dotenv'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  server:{
    host:'0.0.0.0',
    port: 3002
  }
  // define:{
  //   'import.meta.env.VITE_WEATHER_API_KEY': JSON.stringify(import.meta.env.VITE_WEATHER_API_KEY)
  // }
})
