// Pure generation/save contract: these sequences never depend on render quality.
import {seededRandom,hash2} from './systems.js';
export function islandSeed(id){if(id==='0,-1')return 4281;const [x,z]=id.split(',').map(Number);return Math.floor(hash2(x,z,9218)*999999);}
export function puzzleSequence(seed){const sequence=[0,1,2],rnd=seededRandom(seed^0x5e91);for(let i=2;i>0;i--){const k=Math.floor(rnd()*(i+1));[sequence[i],sequence[k]]=[sequence[k],sequence[i]];}return sequence;}
export function validExplorationProgress(collected){
  const ids=new Set(collected),islands=new Set(collected.filter(id=>/:explore:rune[0-2]$/.test(id)).map(id=>id.split(':')[0]));
  for(const id of islands){if(!ids.has(`${id}:explore:journal`))return false;const sequence=puzzleSequence(islandSeed(id)),count=sequence.filter(k=>ids.has(`${id}:explore:rune${k}`)).length;if(sequence.slice(0,count).some(k=>!ids.has(`${id}:explore:rune${k}`)))return false;}
  return true;
}
