import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const BRAND_DIR = path.resolve('public/brand');

async function generate() {
  console.log('Generating Sentianis brand PNG assets with Sharp...');

  const avatarSvg = fs.readFileSync(path.join(BRAND_DIR, 'sentianis-avatar.svg'));

  // 1. High-Res Master Avatar (1080x1080)
  await sharp(avatarSvg)
    .resize(1080, 1080)
    .png({ quality: 100 })
    .toFile(path.join(BRAND_DIR, 'sentianis-avatar-1080.png'));
  console.log('✓ sentianis-avatar-1080.png (1080x1080)');

  // 2. LinkedIn Company Logo (400x400)
  await sharp(avatarSvg)
    .resize(400, 400)
    .png({ quality: 100 })
    .toFile(path.join(BRAND_DIR, 'sentianis-linkedin-logo.png'));
  console.log('✓ sentianis-linkedin-logo.png (400x400)');

  // 3. X / Twitter Profile (400x400)
  await sharp(avatarSvg)
    .resize(400, 400)
    .png({ quality: 100 })
    .toFile(path.join(BRAND_DIR, 'sentianis-x-profile.png'));
  console.log('✓ sentianis-x-profile.png (400x400)');

  // 4. YouTube Channel Profile (800x800)
  await sharp(avatarSvg)
    .resize(800, 800)
    .png({ quality: 100 })
    .toFile(path.join(BRAND_DIR, 'sentianis-youtube-profile.png'));
  console.log('✓ sentianis-youtube-profile.png (800x800)');

  // 5. YouTube Video Watermark (150x150)
  const watermarkSvg = fs.readFileSync(path.join(BRAND_DIR, 'sentianis-watermark-150.svg'));
  await sharp(watermarkSvg)
    .resize(150, 150)
    .png({ quality: 100 })
    .toFile(path.join(BRAND_DIR, 'sentianis-youtube-watermark.png'));
  console.log('✓ sentianis-youtube-watermark.png (150x150)');

  // 6. LinkedIn Company Banner (1584x396)
  const bannerLinkedinSvg = fs.readFileSync(path.join(BRAND_DIR, 'sentianis-banner-linkedin.svg'));
  await sharp(bannerLinkedinSvg)
    .resize(1584, 396)
    .png({ quality: 100 })
    .toFile(path.join(BRAND_DIR, 'sentianis-banner-linkedin.png'));
  console.log('✓ sentianis-banner-linkedin.png (1584x396)');

  // 7. Twitter / X Header Banner (1500x500)
  const bannerXSvg = fs.readFileSync(path.join(BRAND_DIR, 'sentianis-banner-x.svg'));
  await sharp(bannerXSvg)
    .resize(1500, 500)
    .png({ quality: 100 })
    .toFile(path.join(BRAND_DIR, 'sentianis-banner-x.png'));
  console.log('✓ sentianis-banner-x.png (1500x500)');

  // 8. YouTube Channel Banner (2048x1152)
  const bannerYtSvg = fs.readFileSync(path.join(BRAND_DIR, 'sentianis-banner-youtube.svg'));
  await sharp(bannerYtSvg)
    .resize(2048, 1152)
    .png({ quality: 100 })
    .toFile(path.join(BRAND_DIR, 'sentianis-banner-youtube.png'));
  console.log('✓ sentianis-banner-youtube.png (2048x1152)');

  // 9. Full Horizontal Logo Dark & Light (2400x700)
  const logoDarkSvg = fs.readFileSync(path.join(BRAND_DIR, 'sentianis-logo-dark.svg'));
  await sharp(logoDarkSvg)
    .resize(2400, 700)
    .png({ quality: 100 })
    .toFile(path.join(BRAND_DIR, 'sentianis-logo-dark.png'));
  console.log('✓ sentianis-logo-dark.png (2400x700)');

  const logoLightSvg = fs.readFileSync(path.join(BRAND_DIR, 'sentianis-logo-light.svg'));
  await sharp(logoLightSvg)
    .resize(2400, 700)
    .png({ quality: 100 })
    .toFile(path.join(BRAND_DIR, 'sentianis-logo-light.png'));
  console.log('✓ sentianis-logo-light.png (2400x700)');

  console.log('\nAll Sentianis social brand assets generated successfully!');
}

generate().catch(err => {
  console.error('Generation failed:', err);
  process.exit(1);
});
