const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

const thumbnails = [
  'polaroid_hug',
  'hugging_younger_self',
  'cute_polaroid_pose',
  'past_present_handshake',
  'park_bench_conversation',
  'sunset_street_walk'
];

const width = 400;
const height = 600; // 3:2 aspect ratio

// Create thumbnails directory if it doesn't exist
const thumbnailsDir = path.join(__dirname, '../public/thumbnails');
if (!fs.existsSync(thumbnailsDir)) {
  fs.mkdirSync(thumbnailsDir, { recursive: true });
}

// Generate a random pastel color
function getRandomPastelColor() {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 70%, 85%)`;
}

thumbnails.forEach((name, index) => {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  
  // Fill with random pastel background
  ctx.fillStyle = getRandomPastelColor();
  ctx.fillRect(0, 0, width, height);
  
  // Add text
  ctx.fillStyle = '#333';
  ctx.font = '24px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(name.replace(/_/g, ' '), width / 2, height / 2);
  
  // Save to file
  const buffer = canvas.toBuffer('image/jpeg');
  fs.writeFileSync(path.join(thumbnailsDir, `${name}.jpeg`), buffer);
});

console.log(`Generated ${thumbnails.length} placeholder images in ${thumbnailsDir}`);
