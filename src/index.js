import * as PIXI from 'pixi.js';
import { GridManager } from './GridManager';
import { sound } from '@pixi/sound';

/*

prototype: https://claude.site/artifacts/457878a7-91f3-448d-8689-eaddea499c43

*/

// Background color shared between HTML (index.html <style>) and PixiJS canvas.
// Both must match (#FAF9F6) so page transitions appear seamless — no white/grey flash.
const BG_COLOR = 0xFAF9F6;
const BG_COLOR_HEX = '#FAF9F6';

// Detect if we arrived here via a blocked bypass attempt (/?ns).
// Used to coordinate the dots + "No shortcuts" fade-in animation.
const isNoShortcuts = new URLSearchParams(window.location.search).has('ns');

// If this is a "no shortcuts" redirect, hide the canvas initially so dots
// can fade in together with the message instead of popping in abruptly.
if (isNoShortcuts) {
  const container = document.querySelector('#pixi-container');
  if (container) container.style.opacity = '0';
}

// Initialize audio context immediately
sound.init();
sound.context.autoPause = false;

async function preloadSounds() {
    const audioFiles = {
        'line1': '/1.wav',
        'line2': '/2.wav',
        'line3': '/3.wav',
        'line4': '/4.wav',
        'line5': '/5.wav',
        'error': '/Error.wav'
    };

    // Load all audio files
    for (const [key, url] of Object.entries(audioFiles)) {
        await sound.add(key, {
            url: url,
            preload: true,
            loaded: (err, sound) => {
                if (err) {
                    console.error('Error loading sound:', err);
                } else {
                    console.log(`Sound ${key} loaded successfully`);
                }
            }
        });
    }
    
    console.log('All sounds loaded');
}

async function init() {
    // Set HTML background color
    document.body.style.backgroundColor = BG_COLOR_HEX;
    document.body.style.margin = '0';  // Remove default margins

    try {
        // Force preload all sounds before continuing
        await preloadSounds();
    } catch (error) {
        console.error('Error preloading sounds:', error);
    }

    const containerElement = document.querySelector('#pixi-container')

    const app = new PIXI.Application();
    await app.init({ 
      backgroundColor: BG_COLOR,  // Set PIXI background color
      antialias: true, 
      autoDensity: true,
      resolution: window.devicePixelRatio || 1,
    });
    containerElement.appendChild(app.canvas);

    const gridManager = new GridManager(app)
    function update() {
      gridManager.update()

      requestAnimationFrame(update)
    }
    update()

    // Add resize listener
    window.addEventListener('resize', handleResize);
    handleResize()
    function handleResize() {
        if (window.innerWidth < 500) {
            // Small screen: fixed width with auto height
            app.renderer.resize(500, 500);
            app.canvas.style.height = 'auto';
        } else {
            // Large screen: full width and height
            app.renderer.resize(window.innerWidth, window.innerHeight);
            app.canvas.style.height = '100%';
        }
  
        if(gridManager) gridManager.resize();
    }
}

init().then(() => {
  // "No shortcuts" bypass response:
  // When a user tries to skip the puzzle by typing /landing-page, /home, etc.,
  // they get server-redirected (dev) or client-redirected (prod) to /?ns.
  // We clean the URL, then fade in BOTH the dots and the message together
  // so it feels like they never left the puzzle page.
  if (isNoShortcuts) {
    history.replaceState(null, '', '/');

    // Inject fade-in/out keyframes for the message
    const ks = document.createElement('style');
    ks.textContent = '@keyframes nsPulse{0%{opacity:0}30%{opacity:1}70%{opacity:1}100%{opacity:0}}';
    document.head.appendChild(ks);

    // "No shortcuts" text — fades in, holds, fades out
    const msg = document.createElement('div');
    msg.textContent = 'No shortcuts';
    msg.style.cssText = "position:fixed;top:28%;left:0;width:100%;text-align:center;font-family:'Georgia',serif;font-size:2.2rem;color:#FFB7C5;opacity:0;z-index:10;pointer-events:none;animation:nsPulse 2.8s ease forwards";
    document.body.appendChild(msg);
    msg.addEventListener('animationend', () => msg.remove());

    // Fade the dots (PixiJS canvas) in at the same pace as the message
    const container = document.querySelector('#pixi-container');
    if (container) {
      container.style.transition = 'opacity 0.84s ease';  // 30% of 2.8s = 0.84s, matches message fade-in
      container.style.opacity = '1';
    }
  }
});

