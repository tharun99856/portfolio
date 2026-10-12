# Video Optimization Guide

## Install FFmpeg

### Windows (via Chocolatey)
```powershell
choco install ffmpeg
```

### Windows (via Scoop)
```powershell
scoop install ffmpeg
```

### Manual Download
Download from https://ffmpeg.org/download.html

## Optimize Videos

Once ffmpeg is installed, run these commands from the `public/projects/` directory:

### 1. Edcore Recording (1.7MB → target <700KB)
```bash
ffmpeg -i "edcore recording.mp4" -vf "scale='min(1280,iw)':-2" -an -c:v libx264 -crf 28 -preset slow -movflags +faststart "edcore-recording.mp4"
ffmpeg -i "edcore recording.mp4" -vf "scale='min(1280,iw)':-2" -an -c:v libvpx-vp9 -crf 34 -b:v 0 -preset slow "edcore-recording.webm"
ffmpeg -i "edcore recording.mp4" -vf "scale='min(1280,iw)':-2" -frames:v 1 -q:v 2 "edcore-recording-poster.jpg"
```

### 2. Smartasset Recording (3MB → target <1MB)
```bash
ffmpeg -i "Smartasset recording .mp4" -vf "scale='min(1280,iw)':-2" -an -c:v libx264 -crf 28 -preset slow -movflags +faststart "smartasset-recording.mp4"
ffmpeg -i "Smartasset recording .mp4" -vf "scale='min(1280,iw)':-2" -an -c:v libvpx-vp9 -crf 34 -b:v 0 -preset slow "smartasset-recording.webm"
ffmpeg -i "Smartasset recording .mp4" -vf "scale='min(1280,iw)':-2" -frames:v 1 -q:v 2 "smartasset-recording-poster.jpg"
```

### 3. Nifty 50 Recording (1.6MB → target <600KB)
```bash
ffmpeg -i "Nifty 50 recording.mp4" -vf "scale='min(1280,iw)':-2" -an -c:v libx264 -crf 28 -preset slow -movflags +faststart "nifty-50-recording.mp4"
ffmpeg -i "Nifty 50 recording.mp4" -vf "scale='min(1280,iw)':-2" -an -c:v libvpx-vp9 -crf 34 -b:v 0 -preset slow "nifty-50-recording.webm"
ffmpeg -i "Nifty 50 recording.mp4" -vf "scale='min(1280,iw)':-2" -frames:v 1 -q:v 2 "nifty-50-recording-poster.jpg"
```

### 4. Canopy Recording (850KB → already good, but can optimize)
```bash
ffmpeg -i "canopy recording.mp4" -vf "scale='min(1280,iw)':-2" -an -c:v libx264 -crf 28 -preset slow -movflags +faststart "canopy-recording.mp4"
ffmpeg -i "canopy recording.mp4" -vf "scale='min(1280,iw)':-2" -an -c:v libvpx-vp9 -crf 34 -b:v 0 -preset slow "canopy-recording.webm"
ffmpeg -i "canopy recording.mp4" -vf "scale='min(1280,iw)':-2" -frames:v 1 -q:v 2 "canopy-recording-poster.jpg"
```

### 5. IITR Nexus Recording (226KB → already excellent!)
```bash
ffmpeg -i "iitr nexus recording.mp4" -vf "scale='min(1280,iw)':-2" -an -c:v libx264 -crf 28 -preset slow -movflags +faststart "iitr-nexus-recording.mp4"
ffmpeg -i "iitr nexus recording.mp4" -vf "scale='min(1280,iw)':-2" -an -c:v libvpx-vp9 -crf 34 -b:v 0 -preset slow "iitr-nexus-recording.webm"
ffmpeg -i "iitr nexus recording.mp4" -vf "scale='min(1280,iw)':-2" -frames:v 1 -q:v 2 "iitr-nexus-recording-poster.jpg"
```

### 6. Rune Recording (225KB → already excellent!)
```bash
ffmpeg -i "rune recording.mp4" -vf "scale='min(1280,iw)':-2" -an -c:v libx264 -crf 28 -preset slow -movflags +faststart "rune-recording.mp4"
ffmpeg -i "rune recording.mp4" -vf "scale='min(1280,iw)':-2" -an -c:v libvpx-vp9 -crf 34 -b:v 0 -preset slow "rune-recording.webm"
ffmpeg -i "rune recording.mp4" -vf "scale='min(1280,iw)':-2" -frames:v 1 -q:v 2 "rune-recording-poster.jpg"
```

## Parameters Explained

- `scale='min(1280,iw)':-2` - Cap width at 1280px (720p), maintain aspect ratio
- `-an` - Remove audio track (portfolio videos don't need sound)
- `-c:v libx264` - H.264 codec (MP4, broad compatibility)
- `-c:v libvpx-vp9` - VP9 codec (WebM, better compression)
- `-crf 28` - Constant Rate Factor 28 (good quality/size balance for MP4)
- `-crf 34` - CRF 34 for WebM (VP9 needs higher number for same quality)
- `-preset slow` - Slower encoding = better compression
- `-movflags +faststart` - Optimize for web streaming
- `-frames:v 1` - Extract first frame as poster
- `-q:v 2` - High quality JPEG for poster

## Update References

After optimization, update `app/page.tsx` to use the new filenames:

```typescript
// Before
media: { type: 'video', src: '/projects/edcore recording.mp4' }

// After
media: { type: 'video', src: '/projects/edcore-recording.mp4' }
```

The VideoPlayer component will automatically look for WebM versions.

## Expected Savings

- **Before**: ~7.7MB total
- **After**: ~3-4MB total (50% reduction)
- **With lazy loading**: Only ~300-800KB loaded initially (videos load on scroll)

## Convert Images to WebP

For the large PNG files:

```bash
# Install sharp-cli if not already
npm install -g sharp-cli

# Convert large PNGs
sharp -i "travelchecker logo.png" -o "travelchecker-logo.webp" -f webp -q 85
sharp -i "EDCORE.png" -o "edcore.webp" -f webp -q 85
sharp -i "EDCORE 1.png" -o "edcore-1.webp" -f webp -q 85
```

Expected savings: 703KB + 636KB + 553KB = ~1.9MB → ~400-500KB (75% reduction)
