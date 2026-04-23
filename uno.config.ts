import { defineConfig } from 'unocss'
import { presetAttributify, presetIcons, presetWind3 } from 'unocss'

export default defineConfig({
  presets: [presetWind3(), presetAttributify(), presetIcons()],
  safelist: [
    'order-1',
    'order-2',
    'lg:block',
    'md:flex',
    'hidden',
  ],
})