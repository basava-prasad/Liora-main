const sharp = require('sharp');
const path = require('path');

const SRC_DIR = path.join(process.cwd(), 'public', 'images', 'hero');
const OUT_W = 480;
const OUT_H = 854; // ~9:16
const CROP_W = 405; // native-height crop width before mild upscale (720 -> 854 = 1.186x)
const CROP_H = 720;

const jobs = [
  // LIORA neon sign is centered around x=430-800 of the 1280px-wide source.
  { file: 'new1.jpeg', out: 'new1-mobile.jpg', left: 413, top: 0, width: CROP_W, height: CROP_H },
  // A full-height slice here is ~2/3 curtain texture with the chairs squeezed
  // into a thin bottom strip. Anchor to the bottom-left instead so the
  // foreground chair + table are the actual subject of the crop.
  { file: 'new3.jpeg', out: 'new3-mobile.jpg', left: 0, top: 112, width: 342, height: 608 },
];

(async () => {
  for (const job of jobs) {
    const input = path.join(SRC_DIR, job.file);
    const output = path.join(SRC_DIR, job.out);
    await sharp(input)
      .extract({ left: job.left, top: job.top, width: job.width, height: job.height })
      .resize(OUT_W, OUT_H, { fit: 'fill', kernel: 'lanczos3' })
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(output);
    const meta = await sharp(output).metadata();
    console.log(job.out, meta.width, meta.height);
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
