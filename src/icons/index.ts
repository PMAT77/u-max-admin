import 'virtual:svg-icons-register';
import SvgIcon from '@/components/common/SvgIcon.vue';
import type { App } from 'vue';

export function setupSvgIcon(app: App) {
  app.component('SvgIcon', SvgIcon);
}

export default SvgIcon;
