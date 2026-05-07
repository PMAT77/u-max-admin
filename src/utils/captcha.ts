/**
 * 验证码生成工具
 * 用于生成 Mock 验证码图片
 */
export interface CaptchaData {
  captchaId: string;
  captchaCode: string;
  image: string;
}

const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

function randomColor(min: number, max: number): string {
  const r = Math.floor(Math.random() * (max - min) + min);
  const g = Math.floor(Math.random() * (max - min) + min);
  const b = Math.floor(Math.random() * (max - min) + min);
  return `rgb(${r},${g},${b})`;
}

export function generateCaptcha(length = 4): CaptchaData {
  let code = '';
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  const captchaId = `captcha_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  const width = 120;
  const height = 40;
  const fontSize = 24;

  let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
    <rect fill="#f5f5f5" width="100%" height="100%" rx="4"/>`;

  for (let i = 0; i < length; i++) {
    svg += `<line x1="${Math.random() * width}" y1="${Math.random() * height}" 
                   x2="${Math.random() * width}" y2="${Math.random() * height}" 
                   stroke="${randomColor(100, 200)}" stroke-width="1"/>`;
  }

  for (let i = 0; i < 20; i++) {
    svg += `<circle cx="${Math.random() * width}" cy="${Math.random() * height}" 
                    r="1" fill="${randomColor(100, 200)}"/>`;
  }

  for (let i = 0; i < code.length; i++) {
    const x = 20 + i * 25;
    const y = 28 + Math.random() * 6 - 3;
    const rotate = Math.random() * 30 - 15;
    svg += `<text x="${x}" y="${y}" 
                  font-size="${fontSize}" 
                  font-family="Arial, sans-serif" 
                  font-weight="bold"
                  fill="${randomColor(30, 120)}"
                  transform="rotate(${rotate} ${x} ${y})">${code[i]}</text>`;
  }

  svg += '</svg>';

  const image = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`;

  return {
    captchaId,
    captchaCode: code,
    image,
  };
}
