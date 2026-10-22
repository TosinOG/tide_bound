import './style.css';
import { Game } from './game.js';

async function boot(){
  try {
    await Promise.all([document.fonts.load('400 14px Outfit'),document.fonts.load('400 30px Fraunces')]);
    const game = new Game();
    requestAnimationFrame(()=>requestAnimationFrame(()=>{const loading=document.getElementById('loading');loading.classList.add('done');setTimeout(()=>loading.remove(),700);}));
  } catch(error) {
    console.error('Tidebound Gold could not initialize:',error);
    const loading=document.getElementById('loading');loading.style.pointerEvents='auto';loading.innerHTML='<div class="error-content"><div class="loading-symbol">≈</div><h1>We couldn’t reach the water.</h1><p>Tidebound Gold needs a WebGL-capable browser. Try Chrome, Edge, or Firefox with hardware acceleration enabled, then reload.</p><code id="error-detail"></code><button class="button primary" onclick="location.reload()">Try again →</button></div>';
    document.getElementById('error-detail').textContent=error.message;
  }
}
boot();
