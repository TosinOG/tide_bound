(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function e(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(n){if(n.ep)return;n.ep=!0;const r=e(n);fetch(n.href,r)}})();const Uo="170",Hh=0,ll=1,Vh=2,Fc=1,zc=2,Pi=3,Qi=0,We=1,Ne=2,Ki=0,Yn=1,cl=2,hl=3,dl=4,Gh=5,mn=100,Wh=101,$h=102,Xh=103,qh=104,Yh=200,jh=201,Kh=202,Zh=203,Ba=204,Ha=205,Jh=206,Qh=207,td=208,ed=209,id=210,nd=211,sd=212,rd=213,ad=214,Va=0,Ga=1,Wa=2,Zn=3,$a=4,Xa=5,qa=6,Ya=7,Bc=0,od=1,ld=2,Zi=0,cd=1,hd=2,dd=3,Hc=4,ud=5,fd=6,pd=7,Vc=300,Jn=301,Qn=302,ja=303,Ka=304,Or=306,Cr=1e3,vn=1001,Za=1002,Ke=1003,md=1004,Bs=1005,fi=1006,Yr=1007,xn=1008,Ni=1009,Gc=1010,Wc=1011,Is=1012,No=1013,bn=1014,_i=1015,Ns=1016,ko=1017,Oo=1018,ts=1020,$c=35902,Xc=1021,qc=1022,ri=1023,Yc=1024,jc=1025,jn=1026,es=1027,Fo=1028,zo=1029,Kc=1030,Bo=1031,Ho=1033,Mr=33776,br=33777,Sr=33778,wr=33779,Ja=35840,Qa=35841,to=35842,eo=35843,io=36196,no=37492,so=37496,ro=37808,ao=37809,oo=37810,lo=37811,co=37812,ho=37813,uo=37814,fo=37815,po=37816,mo=37817,go=37818,vo=37819,xo=37820,yo=37821,Er=36492,_o=36494,Mo=36495,Zc=36283,bo=36284,So=36285,wo=36286,gd=3200,vd=3201,Jc=0,xd=1,Yi="",Ge="srgb",ss="srgb-linear",Fr="linear",he="srgb",Tn=7680,ul=519,yd=512,_d=513,Md=514,Qc=515,bd=516,Sd=517,wd=518,Ed=519,Eo=35044,fl="300 es",Di=2e3,Pr=2001;class rs{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const i=this._listeners;return i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const n=this._listeners[t];if(n!==void 0){const r=n.indexOf(e);r!==-1&&n.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const i=this._listeners[t.type];if(i!==void 0){t.target=this;const n=i.slice(0);for(let r=0,a=n.length;r<a;r++)n[r].call(this,t);t.target=null}}}const Oe=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let pl=1234567;const ws=Math.PI/180,Ds=180/Math.PI;function Li(){const s=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Oe[s&255]+Oe[s>>8&255]+Oe[s>>16&255]+Oe[s>>24&255]+"-"+Oe[t&255]+Oe[t>>8&255]+"-"+Oe[t>>16&15|64]+Oe[t>>24&255]+"-"+Oe[e&63|128]+Oe[e>>8&255]+"-"+Oe[e>>16&255]+Oe[e>>24&255]+Oe[i&255]+Oe[i>>8&255]+Oe[i>>16&255]+Oe[i>>24&255]).toLowerCase()}function Ue(s,t,e){return Math.max(t,Math.min(e,s))}function Vo(s,t){return(s%t+t)%t}function Td(s,t,e,i,n){return i+(s-t)*(n-i)/(e-t)}function Ad(s,t,e){return s!==t?(e-s)/(t-s):0}function Es(s,t,e){return(1-e)*s+e*t}function Rd(s,t,e,i){return Es(s,t,1-Math.exp(-e*i))}function Cd(s,t=1){return t-Math.abs(Vo(s,t*2)-t)}function Pd(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*(3-2*s))}function Id(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*s*(s*(s*6-15)+10))}function Dd(s,t){return s+Math.floor(Math.random()*(t-s+1))}function Ld(s,t){return s+Math.random()*(t-s)}function Ud(s){return s*(.5-Math.random())}function Nd(s){s!==void 0&&(pl=s);let t=pl+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function kd(s){return s*ws}function Od(s){return s*Ds}function Fd(s){return(s&s-1)===0&&s!==0}function zd(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function Bd(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function Hd(s,t,e,i,n){const r=Math.cos,a=Math.sin,o=r(e/2),l=a(e/2),h=r((t+i)/2),c=a((t+i)/2),u=r((t-i)/2),d=a((t-i)/2),p=r((i-t)/2),g=a((i-t)/2);switch(n){case"XYX":s.set(o*c,l*u,l*d,o*h);break;case"YZY":s.set(l*d,o*c,l*u,o*h);break;case"ZXZ":s.set(l*u,l*d,o*c,o*h);break;case"XZX":s.set(o*c,l*g,l*p,o*h);break;case"YXY":s.set(l*p,o*c,l*g,o*h);break;case"ZYZ":s.set(l*g,l*p,o*c,o*h);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+n)}}function ui(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function le(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}const Me={DEG2RAD:ws,RAD2DEG:Ds,generateUUID:Li,clamp:Ue,euclideanModulo:Vo,mapLinear:Td,inverseLerp:Ad,lerp:Es,damp:Rd,pingpong:Cd,smoothstep:Pd,smootherstep:Id,randInt:Dd,randFloat:Ld,randFloatSpread:Ud,seededRandom:Nd,degToRad:kd,radToDeg:Od,isPowerOfTwo:Fd,ceilPowerOfTwo:zd,floorPowerOfTwo:Bd,setQuaternionFromProperEuler:Hd,normalize:le,denormalize:ui};class xt{constructor(t=0,e=0){xt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,i=this.y,n=t.elements;return this.x=n[0]*e+n[3]*i+n[6],this.y=n[1]*e+n[4]*i+n[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Ue(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const i=Math.cos(e),n=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*i-a*n+t.x,this.y=r*n+a*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Vt{constructor(t,e,i,n,r,a,o,l,h){Vt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,n,r,a,o,l,h)}set(t,e,i,n,r,a,o,l,h){const c=this.elements;return c[0]=t,c[1]=n,c[2]=o,c[3]=e,c[4]=r,c[5]=l,c[6]=i,c[7]=a,c[8]=h,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,n=e.elements,r=this.elements,a=i[0],o=i[3],l=i[6],h=i[1],c=i[4],u=i[7],d=i[2],p=i[5],g=i[8],v=n[0],m=n[3],f=n[6],y=n[1],_=n[4],x=n[7],I=n[2],A=n[5],P=n[8];return r[0]=a*v+o*y+l*I,r[3]=a*m+o*_+l*A,r[6]=a*f+o*x+l*P,r[1]=h*v+c*y+u*I,r[4]=h*m+c*_+u*A,r[7]=h*f+c*x+u*P,r[2]=d*v+p*y+g*I,r[5]=d*m+p*_+g*A,r[8]=d*f+p*x+g*P,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[1],n=t[2],r=t[3],a=t[4],o=t[5],l=t[6],h=t[7],c=t[8];return e*a*c-e*o*h-i*r*c+i*o*l+n*r*h-n*a*l}invert(){const t=this.elements,e=t[0],i=t[1],n=t[2],r=t[3],a=t[4],o=t[5],l=t[6],h=t[7],c=t[8],u=c*a-o*h,d=o*l-c*r,p=h*r-a*l,g=e*u+i*d+n*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return t[0]=u*v,t[1]=(n*h-c*i)*v,t[2]=(o*i-n*a)*v,t[3]=d*v,t[4]=(c*e-n*l)*v,t[5]=(n*r-o*e)*v,t[6]=p*v,t[7]=(i*l-h*e)*v,t[8]=(a*e-i*r)*v,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,n,r,a,o){const l=Math.cos(r),h=Math.sin(r);return this.set(i*l,i*h,-i*(l*a+h*o)+a+t,-n*h,n*l,-n*(-h*a+l*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(jr.makeScale(t,e)),this}rotate(t){return this.premultiply(jr.makeRotation(-t)),this}translate(t,e){return this.premultiply(jr.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,i=t.elements;for(let n=0;n<9;n++)if(e[n]!==i[n])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const jr=new Vt;function th(s){for(let t=s.length-1;t>=0;--t)if(s[t]>=65535)return!0;return!1}function Ir(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function Vd(){const s=Ir("canvas");return s.style.display="block",s}const ml={};function Ms(s){s in ml||(ml[s]=!0,console.warn(s))}function Gd(s,t,e){return new Promise(function(i,n){function r(){switch(s.clientWaitSync(t,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:n();break;case s.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:i()}}setTimeout(r,e)})}function Wd(s){const t=s.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function $d(s){const t=s.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const ee={enabled:!0,workingColorSpace:ss,spaces:{},convert:function(s,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===he&&(s.r=Ui(s.r),s.g=Ui(s.g),s.b=Ui(s.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(s.applyMatrix3(this.spaces[t].toXYZ),s.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===he&&(s.r=Kn(s.r),s.g=Kn(s.g),s.b=Kn(s.b))),s},fromWorkingColorSpace:function(s,t){return this.convert(s,this.workingColorSpace,t)},toWorkingColorSpace:function(s,t){return this.convert(s,t,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Yi?Fr:this.spaces[s].transfer},getLuminanceCoefficients:function(s,t=this.workingColorSpace){return s.fromArray(this.spaces[t].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,t,e){return s.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}};function Ui(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Kn(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}const gl=[.64,.33,.3,.6,.15,.06],vl=[.2126,.7152,.0722],xl=[.3127,.329],yl=new Vt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),_l=new Vt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);ee.define({[ss]:{primaries:gl,whitePoint:xl,transfer:Fr,toXYZ:yl,fromXYZ:_l,luminanceCoefficients:vl,workingColorSpaceConfig:{unpackColorSpace:Ge},outputColorSpaceConfig:{drawingBufferColorSpace:Ge}},[Ge]:{primaries:gl,whitePoint:xl,transfer:he,toXYZ:yl,fromXYZ:_l,luminanceCoefficients:vl,outputColorSpaceConfig:{drawingBufferColorSpace:Ge}}});let An;class Xd{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{An===void 0&&(An=Ir("canvas")),An.width=t.width,An.height=t.height;const i=An.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),e=An}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Ir("canvas");e.width=t.width,e.height=t.height;const i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const n=i.getImageData(0,0,t.width,t.height),r=n.data;for(let a=0;a<r.length;a++)r[a]=Ui(r[a]/255)*255;return i.putImageData(n,0,0),e}else if(t.data){const e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(Ui(e[i]/255)*255):e[i]=Ui(e[i]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let qd=0;class eh{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:qd++}),this.uuid=Li(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},n=this.data;if(n!==null){let r;if(Array.isArray(n)){r=[];for(let a=0,o=n.length;a<o;a++)n[a].isDataTexture?r.push(Kr(n[a].image)):r.push(Kr(n[a]))}else r=Kr(n);i.url=r}return e||(t.images[this.uuid]=i),i}}function Kr(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?Xd.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Yd=0;class ze extends rs{constructor(t=ze.DEFAULT_IMAGE,e=ze.DEFAULT_MAPPING,i=vn,n=vn,r=fi,a=xn,o=ri,l=Ni,h=ze.DEFAULT_ANISOTROPY,c=Yi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Yd++}),this.uuid=Li(),this.name="",this.source=new eh(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=n,this.magFilter=r,this.minFilter=a,this.anisotropy=h,this.format=o,this.internalFormat=null,this.type=l,this.offset=new xt(0,0),this.repeat=new xt(1,1),this.center=new xt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Vt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=c,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Vc)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Cr:t.x=t.x-Math.floor(t.x);break;case vn:t.x=t.x<0?0:1;break;case Za:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Cr:t.y=t.y-Math.floor(t.y);break;case vn:t.y=t.y<0?0:1;break;case Za:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}ze.DEFAULT_IMAGE=null;ze.DEFAULT_MAPPING=Vc;ze.DEFAULT_ANISOTROPY=1;class be{constructor(t=0,e=0,i=0,n=1){be.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=n}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,n){return this.x=t,this.y=e,this.z=i,this.w=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,i=this.y,n=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*i+a[8]*n+a[12]*r,this.y=a[1]*e+a[5]*i+a[9]*n+a[13]*r,this.z=a[2]*e+a[6]*i+a[10]*n+a[14]*r,this.w=a[3]*e+a[7]*i+a[11]*n+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,n,r;const l=t.elements,h=l[0],c=l[4],u=l[8],d=l[1],p=l[5],g=l[9],v=l[2],m=l[6],f=l[10];if(Math.abs(c-d)<.01&&Math.abs(u-v)<.01&&Math.abs(g-m)<.01){if(Math.abs(c+d)<.1&&Math.abs(u+v)<.1&&Math.abs(g+m)<.1&&Math.abs(h+p+f-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const _=(h+1)/2,x=(p+1)/2,I=(f+1)/2,A=(c+d)/4,P=(u+v)/4,E=(g+m)/4;return _>x&&_>I?_<.01?(i=0,n=.707106781,r=.707106781):(i=Math.sqrt(_),n=A/i,r=P/i):x>I?x<.01?(i=.707106781,n=0,r=.707106781):(n=Math.sqrt(x),i=A/n,r=E/n):I<.01?(i=.707106781,n=.707106781,r=0):(r=Math.sqrt(I),i=P/r,n=E/r),this.set(i,n,r,e),this}let y=Math.sqrt((m-g)*(m-g)+(u-v)*(u-v)+(d-c)*(d-c));return Math.abs(y)<.001&&(y=1),this.x=(m-g)/y,this.y=(u-v)/y,this.z=(d-c)/y,this.w=Math.acos((h+p+f-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class jd extends rs{constructor(t=1,e=1,i={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new be(0,0,t,e),this.scissorTest=!1,this.viewport=new be(0,0,t,e);const n={width:t,height:e,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:fi,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const r=new ze(n,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);r.flipY=!1,r.generateMipmaps=i.generateMipmaps,r.internalFormat=i.internalFormat,this.textures=[];const a=i.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let n=0,r=this.textures.length;n<r;n++)this.textures[n].image.width=t,this.textures[n].image.height=e,this.textures[n].image.depth=i;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let i=0,n=t.textures.length;i<n;i++)this.textures[i]=t.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new eh(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Sn extends jd{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}}class ih extends ze{constructor(t=null,e=1,i=1,n=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:n},this.magFilter=Ke,this.minFilter=Ke,this.wrapR=vn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Kd extends ze{constructor(t=null,e=1,i=1,n=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:n},this.magFilter=Ke,this.minFilter=Ke,this.wrapR=vn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class as{constructor(t=0,e=0,i=0,n=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=n}static slerpFlat(t,e,i,n,r,a,o){let l=i[n+0],h=i[n+1],c=i[n+2],u=i[n+3];const d=r[a+0],p=r[a+1],g=r[a+2],v=r[a+3];if(o===0){t[e+0]=l,t[e+1]=h,t[e+2]=c,t[e+3]=u;return}if(o===1){t[e+0]=d,t[e+1]=p,t[e+2]=g,t[e+3]=v;return}if(u!==v||l!==d||h!==p||c!==g){let m=1-o;const f=l*d+h*p+c*g+u*v,y=f>=0?1:-1,_=1-f*f;if(_>Number.EPSILON){const I=Math.sqrt(_),A=Math.atan2(I,f*y);m=Math.sin(m*A)/I,o=Math.sin(o*A)/I}const x=o*y;if(l=l*m+d*x,h=h*m+p*x,c=c*m+g*x,u=u*m+v*x,m===1-o){const I=1/Math.sqrt(l*l+h*h+c*c+u*u);l*=I,h*=I,c*=I,u*=I}}t[e]=l,t[e+1]=h,t[e+2]=c,t[e+3]=u}static multiplyQuaternionsFlat(t,e,i,n,r,a){const o=i[n],l=i[n+1],h=i[n+2],c=i[n+3],u=r[a],d=r[a+1],p=r[a+2],g=r[a+3];return t[e]=o*g+c*u+l*p-h*d,t[e+1]=l*g+c*d+h*u-o*p,t[e+2]=h*g+c*p+o*d-l*u,t[e+3]=c*g-o*u-l*d-h*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,n){return this._x=t,this._y=e,this._z=i,this._w=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const i=t._x,n=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,h=o(i/2),c=o(n/2),u=o(r/2),d=l(i/2),p=l(n/2),g=l(r/2);switch(a){case"XYZ":this._x=d*c*u+h*p*g,this._y=h*p*u-d*c*g,this._z=h*c*g+d*p*u,this._w=h*c*u-d*p*g;break;case"YXZ":this._x=d*c*u+h*p*g,this._y=h*p*u-d*c*g,this._z=h*c*g-d*p*u,this._w=h*c*u+d*p*g;break;case"ZXY":this._x=d*c*u-h*p*g,this._y=h*p*u+d*c*g,this._z=h*c*g+d*p*u,this._w=h*c*u-d*p*g;break;case"ZYX":this._x=d*c*u-h*p*g,this._y=h*p*u+d*c*g,this._z=h*c*g-d*p*u,this._w=h*c*u+d*p*g;break;case"YZX":this._x=d*c*u+h*p*g,this._y=h*p*u+d*c*g,this._z=h*c*g-d*p*u,this._w=h*c*u-d*p*g;break;case"XZY":this._x=d*c*u-h*p*g,this._y=h*p*u-d*c*g,this._z=h*c*g+d*p*u,this._w=h*c*u+d*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const i=e/2,n=Math.sin(i);return this._x=t.x*n,this._y=t.y*n,this._z=t.z*n,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,i=e[0],n=e[4],r=e[8],a=e[1],o=e[5],l=e[9],h=e[2],c=e[6],u=e[10],d=i+o+u;if(d>0){const p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(c-l)*p,this._y=(r-h)*p,this._z=(a-n)*p}else if(i>o&&i>u){const p=2*Math.sqrt(1+i-o-u);this._w=(c-l)/p,this._x=.25*p,this._y=(n+a)/p,this._z=(r+h)/p}else if(o>u){const p=2*Math.sqrt(1+o-i-u);this._w=(r-h)/p,this._x=(n+a)/p,this._y=.25*p,this._z=(l+c)/p}else{const p=2*Math.sqrt(1+u-i-o);this._w=(a-n)/p,this._x=(r+h)/p,this._y=(l+c)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<Number.EPSILON?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Ue(this.dot(t),-1,1)))}rotateTowards(t,e){const i=this.angleTo(t);if(i===0)return this;const n=Math.min(1,e/i);return this.slerp(t,n),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const i=t._x,n=t._y,r=t._z,a=t._w,o=e._x,l=e._y,h=e._z,c=e._w;return this._x=i*c+a*o+n*h-r*l,this._y=n*c+a*l+r*o-i*h,this._z=r*c+a*h+i*l-n*o,this._w=a*c-i*o-n*l-r*h,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const i=this._x,n=this._y,r=this._z,a=this._w;let o=a*t._w+i*t._x+n*t._y+r*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=i,this._y=n,this._z=r,this;const l=1-o*o;if(l<=Number.EPSILON){const p=1-e;return this._w=p*a+e*this._w,this._x=p*i+e*this._x,this._y=p*n+e*this._y,this._z=p*r+e*this._z,this.normalize(),this}const h=Math.sqrt(l),c=Math.atan2(h,o),u=Math.sin((1-e)*c)/h,d=Math.sin(e*c)/h;return this._w=a*u+this._w*d,this._x=i*u+this._x*d,this._y=n*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),n=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(n*Math.sin(t),n*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class C{constructor(t=0,e=0,i=0){C.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Ml.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Ml.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,i=this.y,n=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*n,this.y=r[1]*e+r[4]*i+r[7]*n,this.z=r[2]*e+r[5]*i+r[8]*n,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,i=this.y,n=this.z,r=t.elements,a=1/(r[3]*e+r[7]*i+r[11]*n+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*n+r[12])*a,this.y=(r[1]*e+r[5]*i+r[9]*n+r[13])*a,this.z=(r[2]*e+r[6]*i+r[10]*n+r[14])*a,this}applyQuaternion(t){const e=this.x,i=this.y,n=this.z,r=t.x,a=t.y,o=t.z,l=t.w,h=2*(a*n-o*i),c=2*(o*e-r*n),u=2*(r*i-a*e);return this.x=e+l*h+a*u-o*c,this.y=i+l*c+o*h-r*u,this.z=n+l*u+r*c-a*h,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,i=this.y,n=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*n,this.y=r[1]*e+r[5]*i+r[9]*n,this.z=r[2]*e+r[6]*i+r[10]*n,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const i=t.x,n=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=n*l-r*o,this.y=r*a-i*l,this.z=i*o-n*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return Zr.copy(this).projectOnVector(t),this.sub(Zr)}reflect(t){return this.sub(Zr.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Ue(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y,n=this.z-t.z;return e*e+i*i+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){const n=Math.sin(e)*t;return this.x=n*Math.sin(i),this.y=Math.cos(e)*t,this.z=n*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),n=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=n,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Zr=new C,Ml=new as;class tn{constructor(t=new C(1/0,1/0,1/0),e=new C(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(ci.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(ci.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const i=ci.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const r=i.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,ci):ci.fromBufferAttribute(r,a),ci.applyMatrix4(t.matrixWorld),this.expandByPoint(ci);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Hs.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Hs.copy(i.boundingBox)),Hs.applyMatrix4(t.matrixWorld),this.union(Hs)}const n=t.children;for(let r=0,a=n.length;r<a;r++)this.expandByObject(n[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,ci),ci.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(hs),Vs.subVectors(this.max,hs),Rn.subVectors(t.a,hs),Cn.subVectors(t.b,hs),Pn.subVectors(t.c,hs),Bi.subVectors(Cn,Rn),Hi.subVectors(Pn,Cn),rn.subVectors(Rn,Pn);let e=[0,-Bi.z,Bi.y,0,-Hi.z,Hi.y,0,-rn.z,rn.y,Bi.z,0,-Bi.x,Hi.z,0,-Hi.x,rn.z,0,-rn.x,-Bi.y,Bi.x,0,-Hi.y,Hi.x,0,-rn.y,rn.x,0];return!Jr(e,Rn,Cn,Pn,Vs)||(e=[1,0,0,0,1,0,0,0,1],!Jr(e,Rn,Cn,Pn,Vs))?!1:(Gs.crossVectors(Bi,Hi),e=[Gs.x,Gs.y,Gs.z],Jr(e,Rn,Cn,Pn,Vs))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,ci).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(ci).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Ei[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Ei[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Ei[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Ei[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Ei[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Ei[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Ei[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Ei[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Ei),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const Ei=[new C,new C,new C,new C,new C,new C,new C,new C],ci=new C,Hs=new tn,Rn=new C,Cn=new C,Pn=new C,Bi=new C,Hi=new C,rn=new C,hs=new C,Vs=new C,Gs=new C,an=new C;function Jr(s,t,e,i,n){for(let r=0,a=s.length-3;r<=a;r+=3){an.fromArray(s,r);const o=n.x*Math.abs(an.x)+n.y*Math.abs(an.y)+n.z*Math.abs(an.z),l=t.dot(an),h=e.dot(an),c=i.dot(an);if(Math.max(-Math.max(l,h,c),Math.min(l,h,c))>o)return!1}return!0}const Zd=new tn,ds=new C,Qr=new C;class wn{constructor(t=new C,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const i=this.center;e!==void 0?i.copy(e):Zd.setFromPoints(t).getCenter(i);let n=0;for(let r=0,a=t.length;r<a;r++)n=Math.max(n,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(n),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;ds.subVectors(t,this.center);const e=ds.lengthSq();if(e>this.radius*this.radius){const i=Math.sqrt(e),n=(i-this.radius)*.5;this.center.addScaledVector(ds,n/i),this.radius+=n}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Qr.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(ds.copy(t.center).add(Qr)),this.expandByPoint(ds.copy(t.center).sub(Qr))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Ti=new C,ta=new C,Ws=new C,Vi=new C,ea=new C,$s=new C,ia=new C;class zr{constructor(t=new C,e=new C(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Ti)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Ti.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Ti.copy(this.origin).addScaledVector(this.direction,e),Ti.distanceToSquared(t))}distanceSqToSegment(t,e,i,n){ta.copy(t).add(e).multiplyScalar(.5),Ws.copy(e).sub(t).normalize(),Vi.copy(this.origin).sub(ta);const r=t.distanceTo(e)*.5,a=-this.direction.dot(Ws),o=Vi.dot(this.direction),l=-Vi.dot(Ws),h=Vi.lengthSq(),c=Math.abs(1-a*a);let u,d,p,g;if(c>0)if(u=a*l-o,d=a*o-l,g=r*c,u>=0)if(d>=-g)if(d<=g){const v=1/c;u*=v,d*=v,p=u*(u+a*d+2*o)+d*(a*u+d+2*l)+h}else d=r,u=Math.max(0,-(a*d+o)),p=-u*u+d*(d+2*l)+h;else d=-r,u=Math.max(0,-(a*d+o)),p=-u*u+d*(d+2*l)+h;else d<=-g?(u=Math.max(0,-(-a*r+o)),d=u>0?-r:Math.min(Math.max(-r,-l),r),p=-u*u+d*(d+2*l)+h):d<=g?(u=0,d=Math.min(Math.max(-r,-l),r),p=d*(d+2*l)+h):(u=Math.max(0,-(a*r+o)),d=u>0?r:Math.min(Math.max(-r,-l),r),p=-u*u+d*(d+2*l)+h);else d=a>0?-r:r,u=Math.max(0,-(a*d+o)),p=-u*u+d*(d+2*l)+h;return i&&i.copy(this.origin).addScaledVector(this.direction,u),n&&n.copy(ta).addScaledVector(Ws,d),p}intersectSphere(t,e){Ti.subVectors(t.center,this.origin);const i=Ti.dot(this.direction),n=Ti.dot(Ti)-i*i,r=t.radius*t.radius;if(n>r)return null;const a=Math.sqrt(r-n),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){const i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,n,r,a,o,l;const h=1/this.direction.x,c=1/this.direction.y,u=1/this.direction.z,d=this.origin;return h>=0?(i=(t.min.x-d.x)*h,n=(t.max.x-d.x)*h):(i=(t.max.x-d.x)*h,n=(t.min.x-d.x)*h),c>=0?(r=(t.min.y-d.y)*c,a=(t.max.y-d.y)*c):(r=(t.max.y-d.y)*c,a=(t.min.y-d.y)*c),i>a||r>n||((r>i||isNaN(i))&&(i=r),(a<n||isNaN(n))&&(n=a),u>=0?(o=(t.min.z-d.z)*u,l=(t.max.z-d.z)*u):(o=(t.max.z-d.z)*u,l=(t.min.z-d.z)*u),i>l||o>n)||((o>i||i!==i)&&(i=o),(l<n||n!==n)&&(n=l),n<0)?null:this.at(i>=0?i:n,e)}intersectsBox(t){return this.intersectBox(t,Ti)!==null}intersectTriangle(t,e,i,n,r){ea.subVectors(e,t),$s.subVectors(i,t),ia.crossVectors(ea,$s);let a=this.direction.dot(ia),o;if(a>0){if(n)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Vi.subVectors(this.origin,t);const l=o*this.direction.dot($s.crossVectors(Vi,$s));if(l<0)return null;const h=o*this.direction.dot(ea.cross(Vi));if(h<0||l+h>a)return null;const c=-o*Vi.dot(ia);return c<0?null:this.at(c/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ne{constructor(t,e,i,n,r,a,o,l,h,c,u,d,p,g,v,m){ne.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,n,r,a,o,l,h,c,u,d,p,g,v,m)}set(t,e,i,n,r,a,o,l,h,c,u,d,p,g,v,m){const f=this.elements;return f[0]=t,f[4]=e,f[8]=i,f[12]=n,f[1]=r,f[5]=a,f[9]=o,f[13]=l,f[2]=h,f[6]=c,f[10]=u,f[14]=d,f[3]=p,f[7]=g,f[11]=v,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ne().fromArray(this.elements)}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){const e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,i=t.elements,n=1/In.setFromMatrixColumn(t,0).length(),r=1/In.setFromMatrixColumn(t,1).length(),a=1/In.setFromMatrixColumn(t,2).length();return e[0]=i[0]*n,e[1]=i[1]*n,e[2]=i[2]*n,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*a,e[9]=i[9]*a,e[10]=i[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,i=t.x,n=t.y,r=t.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(n),h=Math.sin(n),c=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){const d=a*c,p=a*u,g=o*c,v=o*u;e[0]=l*c,e[4]=-l*u,e[8]=h,e[1]=p+g*h,e[5]=d-v*h,e[9]=-o*l,e[2]=v-d*h,e[6]=g+p*h,e[10]=a*l}else if(t.order==="YXZ"){const d=l*c,p=l*u,g=h*c,v=h*u;e[0]=d+v*o,e[4]=g*o-p,e[8]=a*h,e[1]=a*u,e[5]=a*c,e[9]=-o,e[2]=p*o-g,e[6]=v+d*o,e[10]=a*l}else if(t.order==="ZXY"){const d=l*c,p=l*u,g=h*c,v=h*u;e[0]=d-v*o,e[4]=-a*u,e[8]=g+p*o,e[1]=p+g*o,e[5]=a*c,e[9]=v-d*o,e[2]=-a*h,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){const d=a*c,p=a*u,g=o*c,v=o*u;e[0]=l*c,e[4]=g*h-p,e[8]=d*h+v,e[1]=l*u,e[5]=v*h+d,e[9]=p*h-g,e[2]=-h,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){const d=a*l,p=a*h,g=o*l,v=o*h;e[0]=l*c,e[4]=v-d*u,e[8]=g*u+p,e[1]=u,e[5]=a*c,e[9]=-o*c,e[2]=-h*c,e[6]=p*u+g,e[10]=d-v*u}else if(t.order==="XZY"){const d=a*l,p=a*h,g=o*l,v=o*h;e[0]=l*c,e[4]=-u,e[8]=h*c,e[1]=d*u+v,e[5]=a*c,e[9]=p*u-g,e[2]=g*u-p,e[6]=o*c,e[10]=v*u+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Jd,t,Qd)}lookAt(t,e,i){const n=this.elements;return qe.subVectors(t,e),qe.lengthSq()===0&&(qe.z=1),qe.normalize(),Gi.crossVectors(i,qe),Gi.lengthSq()===0&&(Math.abs(i.z)===1?qe.x+=1e-4:qe.z+=1e-4,qe.normalize(),Gi.crossVectors(i,qe)),Gi.normalize(),Xs.crossVectors(qe,Gi),n[0]=Gi.x,n[4]=Xs.x,n[8]=qe.x,n[1]=Gi.y,n[5]=Xs.y,n[9]=qe.y,n[2]=Gi.z,n[6]=Xs.z,n[10]=qe.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,n=e.elements,r=this.elements,a=i[0],o=i[4],l=i[8],h=i[12],c=i[1],u=i[5],d=i[9],p=i[13],g=i[2],v=i[6],m=i[10],f=i[14],y=i[3],_=i[7],x=i[11],I=i[15],A=n[0],P=n[4],E=n[8],S=n[12],M=n[1],R=n[5],V=n[9],O=n[13],N=n[2],D=n[6],U=n[10],L=n[14],B=n[3],q=n[7],Q=n[11],et=n[15];return r[0]=a*A+o*M+l*N+h*B,r[4]=a*P+o*R+l*D+h*q,r[8]=a*E+o*V+l*U+h*Q,r[12]=a*S+o*O+l*L+h*et,r[1]=c*A+u*M+d*N+p*B,r[5]=c*P+u*R+d*D+p*q,r[9]=c*E+u*V+d*U+p*Q,r[13]=c*S+u*O+d*L+p*et,r[2]=g*A+v*M+m*N+f*B,r[6]=g*P+v*R+m*D+f*q,r[10]=g*E+v*V+m*U+f*Q,r[14]=g*S+v*O+m*L+f*et,r[3]=y*A+_*M+x*N+I*B,r[7]=y*P+_*R+x*D+I*q,r[11]=y*E+_*V+x*U+I*Q,r[15]=y*S+_*O+x*L+I*et,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[4],n=t[8],r=t[12],a=t[1],o=t[5],l=t[9],h=t[13],c=t[2],u=t[6],d=t[10],p=t[14],g=t[3],v=t[7],m=t[11],f=t[15];return g*(+r*l*u-n*h*u-r*o*d+i*h*d+n*o*p-i*l*p)+v*(+e*l*p-e*h*d+r*a*d-n*a*p+n*h*c-r*l*c)+m*(+e*h*u-e*o*p-r*a*u+i*a*p+r*o*c-i*h*c)+f*(-n*o*c-e*l*u+e*o*d+n*a*u-i*a*d+i*l*c)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){const n=this.elements;return t.isVector3?(n[12]=t.x,n[13]=t.y,n[14]=t.z):(n[12]=t,n[13]=e,n[14]=i),this}invert(){const t=this.elements,e=t[0],i=t[1],n=t[2],r=t[3],a=t[4],o=t[5],l=t[6],h=t[7],c=t[8],u=t[9],d=t[10],p=t[11],g=t[12],v=t[13],m=t[14],f=t[15],y=u*m*h-v*d*h+v*l*p-o*m*p-u*l*f+o*d*f,_=g*d*h-c*m*h-g*l*p+a*m*p+c*l*f-a*d*f,x=c*v*h-g*u*h+g*o*p-a*v*p-c*o*f+a*u*f,I=g*u*l-c*v*l-g*o*d+a*v*d+c*o*m-a*u*m,A=e*y+i*_+n*x+r*I;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const P=1/A;return t[0]=y*P,t[1]=(v*d*r-u*m*r-v*n*p+i*m*p+u*n*f-i*d*f)*P,t[2]=(o*m*r-v*l*r+v*n*h-i*m*h-o*n*f+i*l*f)*P,t[3]=(u*l*r-o*d*r-u*n*h+i*d*h+o*n*p-i*l*p)*P,t[4]=_*P,t[5]=(c*m*r-g*d*r+g*n*p-e*m*p-c*n*f+e*d*f)*P,t[6]=(g*l*r-a*m*r-g*n*h+e*m*h+a*n*f-e*l*f)*P,t[7]=(a*d*r-c*l*r+c*n*h-e*d*h-a*n*p+e*l*p)*P,t[8]=x*P,t[9]=(g*u*r-c*v*r-g*i*p+e*v*p+c*i*f-e*u*f)*P,t[10]=(a*v*r-g*o*r+g*i*h-e*v*h-a*i*f+e*o*f)*P,t[11]=(c*o*r-a*u*r-c*i*h+e*u*h+a*i*p-e*o*p)*P,t[12]=I*P,t[13]=(c*v*n-g*u*n+g*i*d-e*v*d-c*i*m+e*u*m)*P,t[14]=(g*o*n-a*v*n-g*i*l+e*v*l+a*i*m-e*o*m)*P,t[15]=(a*u*n-c*o*n+c*i*l-e*u*l-a*i*d+e*o*d)*P,this}scale(t){const e=this.elements,i=t.x,n=t.y,r=t.z;return e[0]*=i,e[4]*=n,e[8]*=r,e[1]*=i,e[5]*=n,e[9]*=r,e[2]*=i,e[6]*=n,e[10]*=r,e[3]*=i,e[7]*=n,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],n=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,n))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const i=Math.cos(e),n=Math.sin(e),r=1-i,a=t.x,o=t.y,l=t.z,h=r*a,c=r*o;return this.set(h*a+i,h*o-n*l,h*l+n*o,0,h*o+n*l,c*o+i,c*l-n*a,0,h*l-n*o,c*l+n*a,r*l*l+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,n,r,a){return this.set(1,i,r,0,t,1,a,0,e,n,1,0,0,0,0,1),this}compose(t,e,i){const n=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,h=r+r,c=a+a,u=o+o,d=r*h,p=r*c,g=r*u,v=a*c,m=a*u,f=o*u,y=l*h,_=l*c,x=l*u,I=i.x,A=i.y,P=i.z;return n[0]=(1-(v+f))*I,n[1]=(p+x)*I,n[2]=(g-_)*I,n[3]=0,n[4]=(p-x)*A,n[5]=(1-(d+f))*A,n[6]=(m+y)*A,n[7]=0,n[8]=(g+_)*P,n[9]=(m-y)*P,n[10]=(1-(d+v))*P,n[11]=0,n[12]=t.x,n[13]=t.y,n[14]=t.z,n[15]=1,this}decompose(t,e,i){const n=this.elements;let r=In.set(n[0],n[1],n[2]).length();const a=In.set(n[4],n[5],n[6]).length(),o=In.set(n[8],n[9],n[10]).length();this.determinant()<0&&(r=-r),t.x=n[12],t.y=n[13],t.z=n[14],hi.copy(this);const h=1/r,c=1/a,u=1/o;return hi.elements[0]*=h,hi.elements[1]*=h,hi.elements[2]*=h,hi.elements[4]*=c,hi.elements[5]*=c,hi.elements[6]*=c,hi.elements[8]*=u,hi.elements[9]*=u,hi.elements[10]*=u,e.setFromRotationMatrix(hi),i.x=r,i.y=a,i.z=o,this}makePerspective(t,e,i,n,r,a,o=Di){const l=this.elements,h=2*r/(e-t),c=2*r/(i-n),u=(e+t)/(e-t),d=(i+n)/(i-n);let p,g;if(o===Di)p=-(a+r)/(a-r),g=-2*a*r/(a-r);else if(o===Pr)p=-a/(a-r),g=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=c,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,i,n,r,a,o=Di){const l=this.elements,h=1/(e-t),c=1/(i-n),u=1/(a-r),d=(e+t)*h,p=(i+n)*c;let g,v;if(o===Di)g=(a+r)*u,v=-2*u;else if(o===Pr)g=r*u,v=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*h,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*c,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=v,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,i=t.elements;for(let n=0;n<16;n++)if(e[n]!==i[n])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}}const In=new C,hi=new ne,Jd=new C(0,0,0),Qd=new C(1,1,1),Gi=new C,Xs=new C,qe=new C,bl=new ne,Sl=new as;class Mi{constructor(t=0,e=0,i=0,n=Mi.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=n}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,n=this._order){return this._x=t,this._y=e,this._z=i,this._order=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){const n=t.elements,r=n[0],a=n[4],o=n[8],l=n[1],h=n[5],c=n[9],u=n[2],d=n[6],p=n[10];switch(e){case"XYZ":this._y=Math.asin(Ue(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-c,p),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,h),this._z=0);break;case"YXZ":this._x=Math.asin(-Ue(c,-1,1)),Math.abs(c)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,h)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ue(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,p),this._z=Math.atan2(-a,h)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Ue(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,h));break;case"YZX":this._z=Math.asin(Ue(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-c,h),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-Ue(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,h),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-c,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return bl.makeRotationFromQuaternion(t),this.setFromRotationMatrix(bl,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Sl.setFromEuler(this),this.setFromQuaternion(Sl,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Mi.DEFAULT_ORDER="XYZ";class Go{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let tu=0;const wl=new C,Dn=new as,Ai=new ne,qs=new C,us=new C,eu=new C,iu=new as,El=new C(1,0,0),Tl=new C(0,1,0),Al=new C(0,0,1),Rl={type:"added"},nu={type:"removed"},Ln={type:"childadded",child:null},na={type:"childremoved",child:null};class Te extends rs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:tu++}),this.uuid=Li(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Te.DEFAULT_UP.clone();const t=new C,e=new Mi,i=new as,n=new C(1,1,1);function r(){i.setFromEuler(e,!1)}function a(){e.setFromQuaternion(i,void 0,!1)}e._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:n},modelViewMatrix:{value:new ne},normalMatrix:{value:new Vt}}),this.matrix=new ne,this.matrixWorld=new ne,this.matrixAutoUpdate=Te.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Te.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Go,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Dn.setFromAxisAngle(t,e),this.quaternion.multiply(Dn),this}rotateOnWorldAxis(t,e){return Dn.setFromAxisAngle(t,e),this.quaternion.premultiply(Dn),this}rotateX(t){return this.rotateOnAxis(El,t)}rotateY(t){return this.rotateOnAxis(Tl,t)}rotateZ(t){return this.rotateOnAxis(Al,t)}translateOnAxis(t,e){return wl.copy(t).applyQuaternion(this.quaternion),this.position.add(wl.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(El,t)}translateY(t){return this.translateOnAxis(Tl,t)}translateZ(t){return this.translateOnAxis(Al,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Ai.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?qs.copy(t):qs.set(t,e,i);const n=this.parent;this.updateWorldMatrix(!0,!1),us.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ai.lookAt(us,qs,this.up):Ai.lookAt(qs,us,this.up),this.quaternion.setFromRotationMatrix(Ai),n&&(Ai.extractRotation(n.matrixWorld),Dn.setFromRotationMatrix(Ai),this.quaternion.premultiply(Dn.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Rl),Ln.child=t,this.dispatchEvent(Ln),Ln.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(nu),na.child=t,this.dispatchEvent(na),na.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Ai.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Ai.multiply(t.parent.matrixWorld)),t.applyMatrix4(Ai),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Rl),Ln.child=t,this.dispatchEvent(Ln),Ln.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,n=this.children.length;i<n;i++){const a=this.children[i].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);const n=this.children;for(let r=0,a=n.length;r<a;r++)n[r].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(us,t,eu),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(us,iu,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let i=0,n=e.length;i<n;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let i=0,n=e.length;i<n;i++)e[i].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let i=0,n=e.length;i<n;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e){const i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const n=this.children;for(let r=0,a=n.length;r<a;r++)n[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const n={};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.castShadow===!0&&(n.castShadow=!0),this.receiveShadow===!0&&(n.receiveShadow=!0),this.visible===!1&&(n.visible=!1),this.frustumCulled===!1&&(n.frustumCulled=!1),this.renderOrder!==0&&(n.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(n.userData=this.userData),n.layers=this.layers.mask,n.matrix=this.matrix.toArray(),n.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(n.matrixAutoUpdate=!1),this.isInstancedMesh&&(n.type="InstancedMesh",n.count=this.count,n.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(n.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(n.type="BatchedMesh",n.perObjectFrustumCulled=this.perObjectFrustumCulled,n.sortObjects=this.sortObjects,n.drawRanges=this._drawRanges,n.reservedRanges=this._reservedRanges,n.visibility=this._visibility,n.active=this._active,n.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),n.maxInstanceCount=this._maxInstanceCount,n.maxVertexCount=this._maxVertexCount,n.maxIndexCount=this._maxIndexCount,n.geometryInitialized=this._geometryInitialized,n.geometryCount=this._geometryCount,n.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(n.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(n.boundingSphere={center:n.boundingSphere.center.toArray(),radius:n.boundingSphere.radius}),this.boundingBox!==null&&(n.boundingBox={min:n.boundingBox.min.toArray(),max:n.boundingBox.max.toArray()}));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?n.background=this.background.toJSON():this.background.isTexture&&(n.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(n.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){n.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let h=0,c=l.length;h<c;h++){const u=l[h];r(t.shapes,u)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(n.bindMode=this.bindMode,n.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),n.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,h=this.material.length;l<h;l++)o.push(r(t.materials,this.material[l]));n.material=o}else n.material=r(t.materials,this.material);if(this.children.length>0){n.children=[];for(let o=0;o<this.children.length;o++)n.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){n.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];n.animations.push(r(t.animations,l))}}if(e){const o=a(t.geometries),l=a(t.materials),h=a(t.textures),c=a(t.images),u=a(t.shapes),d=a(t.skeletons),p=a(t.animations),g=a(t.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),h.length>0&&(i.textures=h),c.length>0&&(i.images=c),u.length>0&&(i.shapes=u),d.length>0&&(i.skeletons=d),p.length>0&&(i.animations=p),g.length>0&&(i.nodes=g)}return i.object=n,i;function a(o){const l=[];for(const h in o){const c=o[h];delete c.metadata,l.push(c)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){const n=t.children[i];this.add(n.clone())}return this}}Te.DEFAULT_UP=new C(0,1,0);Te.DEFAULT_MATRIX_AUTO_UPDATE=!0;Te.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const di=new C,Ri=new C,sa=new C,Ci=new C,Un=new C,Nn=new C,Cl=new C,ra=new C,aa=new C,oa=new C,la=new be,ca=new be,ha=new be;class ni{constructor(t=new C,e=new C,i=new C){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,n){n.subVectors(i,e),di.subVectors(t,e),n.cross(di);const r=n.lengthSq();return r>0?n.multiplyScalar(1/Math.sqrt(r)):n.set(0,0,0)}static getBarycoord(t,e,i,n,r){di.subVectors(n,e),Ri.subVectors(i,e),sa.subVectors(t,e);const a=di.dot(di),o=di.dot(Ri),l=di.dot(sa),h=Ri.dot(Ri),c=Ri.dot(sa),u=a*h-o*o;if(u===0)return r.set(0,0,0),null;const d=1/u,p=(h*l-o*c)*d,g=(a*c-o*l)*d;return r.set(1-p-g,g,p)}static containsPoint(t,e,i,n){return this.getBarycoord(t,e,i,n,Ci)===null?!1:Ci.x>=0&&Ci.y>=0&&Ci.x+Ci.y<=1}static getInterpolation(t,e,i,n,r,a,o,l){return this.getBarycoord(t,e,i,n,Ci)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Ci.x),l.addScaledVector(a,Ci.y),l.addScaledVector(o,Ci.z),l)}static getInterpolatedAttribute(t,e,i,n,r,a){return la.setScalar(0),ca.setScalar(0),ha.setScalar(0),la.fromBufferAttribute(t,e),ca.fromBufferAttribute(t,i),ha.fromBufferAttribute(t,n),a.setScalar(0),a.addScaledVector(la,r.x),a.addScaledVector(ca,r.y),a.addScaledVector(ha,r.z),a}static isFrontFacing(t,e,i,n){return di.subVectors(i,e),Ri.subVectors(t,e),di.cross(Ri).dot(n)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,n){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[n]),this}setFromAttributeAndIndices(t,e,i,n){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,n),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return di.subVectors(this.c,this.b),Ri.subVectors(this.a,this.b),di.cross(Ri).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return ni.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return ni.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,n,r){return ni.getInterpolation(t,this.a,this.b,this.c,e,i,n,r)}containsPoint(t){return ni.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return ni.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const i=this.a,n=this.b,r=this.c;let a,o;Un.subVectors(n,i),Nn.subVectors(r,i),ra.subVectors(t,i);const l=Un.dot(ra),h=Nn.dot(ra);if(l<=0&&h<=0)return e.copy(i);aa.subVectors(t,n);const c=Un.dot(aa),u=Nn.dot(aa);if(c>=0&&u<=c)return e.copy(n);const d=l*u-c*h;if(d<=0&&l>=0&&c<=0)return a=l/(l-c),e.copy(i).addScaledVector(Un,a);oa.subVectors(t,r);const p=Un.dot(oa),g=Nn.dot(oa);if(g>=0&&p<=g)return e.copy(r);const v=p*h-l*g;if(v<=0&&h>=0&&g<=0)return o=h/(h-g),e.copy(i).addScaledVector(Nn,o);const m=c*g-p*u;if(m<=0&&u-c>=0&&p-g>=0)return Cl.subVectors(r,n),o=(u-c)/(u-c+(p-g)),e.copy(n).addScaledVector(Cl,o);const f=1/(m+v+d);return a=v*f,o=d*f,e.copy(i).addScaledVector(Un,a).addScaledVector(Nn,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const nh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Wi={h:0,s:0,l:0},Ys={h:0,s:0,l:0};function da(s,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?s+(t-s)*6*e:e<1/2?t:e<2/3?s+(t-s)*6*(2/3-e):s}class Et{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){const n=t;n&&n.isColor?this.copy(n):typeof n=="number"?this.setHex(n):typeof n=="string"&&this.setStyle(n)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ge){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ee.toWorkingColorSpace(this,e),this}setRGB(t,e,i,n=ee.workingColorSpace){return this.r=t,this.g=e,this.b=i,ee.toWorkingColorSpace(this,n),this}setHSL(t,e,i,n=ee.workingColorSpace){if(t=Vo(t,1),e=Ue(e,0,1),i=Ue(i,0,1),e===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+e):i+e-i*e,a=2*i-r;this.r=da(a,r,t+1/3),this.g=da(a,r,t),this.b=da(a,r,t-1/3)}return ee.toWorkingColorSpace(this,n),this}setStyle(t,e=Ge){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let n;if(n=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const a=n[1],o=n[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(n=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=n[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ge){const i=nh[t.toLowerCase()];return i!==void 0?this.setHex(i,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Ui(t.r),this.g=Ui(t.g),this.b=Ui(t.b),this}copyLinearToSRGB(t){return this.r=Kn(t.r),this.g=Kn(t.g),this.b=Kn(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ge){return ee.fromWorkingColorSpace(Fe.copy(this),t),Math.round(Ue(Fe.r*255,0,255))*65536+Math.round(Ue(Fe.g*255,0,255))*256+Math.round(Ue(Fe.b*255,0,255))}getHexString(t=Ge){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ee.workingColorSpace){ee.fromWorkingColorSpace(Fe.copy(this),e);const i=Fe.r,n=Fe.g,r=Fe.b,a=Math.max(i,n,r),o=Math.min(i,n,r);let l,h;const c=(o+a)/2;if(o===a)l=0,h=0;else{const u=a-o;switch(h=c<=.5?u/(a+o):u/(2-a-o),a){case i:l=(n-r)/u+(n<r?6:0);break;case n:l=(r-i)/u+2;break;case r:l=(i-n)/u+4;break}l/=6}return t.h=l,t.s=h,t.l=c,t}getRGB(t,e=ee.workingColorSpace){return ee.fromWorkingColorSpace(Fe.copy(this),e),t.r=Fe.r,t.g=Fe.g,t.b=Fe.b,t}getStyle(t=Ge){ee.fromWorkingColorSpace(Fe.copy(this),t);const e=Fe.r,i=Fe.g,n=Fe.b;return t!==Ge?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${n.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(n*255)})`}offsetHSL(t,e,i){return this.getHSL(Wi),this.setHSL(Wi.h+t,Wi.s+e,Wi.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(Wi),t.getHSL(Ys);const i=Es(Wi.h,Ys.h,e),n=Es(Wi.s,Ys.s,e),r=Es(Wi.l,Ys.l,e);return this.setHSL(i,n,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,i=this.g,n=this.b,r=t.elements;return this.r=r[0]*e+r[3]*i+r[6]*n,this.g=r[1]*e+r[4]*i+r[7]*n,this.b=r[2]*e+r[5]*i+r[8]*n,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Fe=new Et;Et.NAMES=nh;let su=0;class en extends rs{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:su++}),this.uuid=Li(),this.name="",this.blending=Yn,this.side=Qi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ba,this.blendDst=Ha,this.blendEquation=mn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Et(0,0,0),this.blendAlpha=0,this.depthFunc=Zn,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ul,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Tn,this.stencilZFail=Tn,this.stencilZPass=Tn,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const i=t[e];if(i===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const n=this[e];if(n===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}n&&n.isColor?n.set(i):n&&n.isVector3&&i&&i.isVector3?n.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Yn&&(i.blending=this.blending),this.side!==Qi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Ba&&(i.blendSrc=this.blendSrc),this.blendDst!==Ha&&(i.blendDst=this.blendDst),this.blendEquation!==mn&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Zn&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==ul&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Tn&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Tn&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Tn&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function n(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(e){const r=n(t.textures),a=n(t.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let i=null;if(e!==null){const n=e.length;i=new Array(n);for(let r=0;r!==n;++r)i[r]=e[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Ts extends en{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new Et(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Mi,this.combine=Bc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Ee=new C,js=new xt;class ye{constructor(t,e,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=Eo,this.updateRanges=[],this.gpuType=_i,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let n=0,r=this.itemSize;n<r;n++)this.array[t+n]=e.array[i+n];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)js.fromBufferAttribute(this,e),js.applyMatrix3(t),this.setXY(e,js.x,js.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)Ee.fromBufferAttribute(this,e),Ee.applyMatrix3(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)Ee.fromBufferAttribute(this,e),Ee.applyMatrix4(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)Ee.fromBufferAttribute(this,e),Ee.applyNormalMatrix(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)Ee.fromBufferAttribute(this,e),Ee.transformDirection(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=ui(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=le(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=ui(e,this.array)),e}setX(t,e){return this.normalized&&(e=le(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=ui(e,this.array)),e}setY(t,e){return this.normalized&&(e=le(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=ui(e,this.array)),e}setZ(t,e){return this.normalized&&(e=le(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=ui(e,this.array)),e}setW(t,e){return this.normalized&&(e=le(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=le(e,this.array),i=le(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,n){return t*=this.itemSize,this.normalized&&(e=le(e,this.array),i=le(i,this.array),n=le(n,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=n,this}setXYZW(t,e,i,n,r){return t*=this.itemSize,this.normalized&&(e=le(e,this.array),i=le(i,this.array),n=le(n,this.array),r=le(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=n,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Eo&&(t.usage=this.usage),t}}class sh extends ye{constructor(t,e,i){super(new Uint16Array(t),e,i)}}class rh extends ye{constructor(t,e,i){super(new Uint32Array(t),e,i)}}class se extends ye{constructor(t,e,i){super(new Float32Array(t),e,i)}}let ru=0;const Qe=new ne,ua=new Te,kn=new C,Ye=new tn,fs=new tn,Pe=new C;class ce extends rs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:ru++}),this.uuid=Li(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(th(t)?rh:sh)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new Vt().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}const n=this.attributes.tangent;return n!==void 0&&(n.transformDirection(t),n.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Qe.makeRotationFromQuaternion(t),this.applyMatrix4(Qe),this}rotateX(t){return Qe.makeRotationX(t),this.applyMatrix4(Qe),this}rotateY(t){return Qe.makeRotationY(t),this.applyMatrix4(Qe),this}rotateZ(t){return Qe.makeRotationZ(t),this.applyMatrix4(Qe),this}translate(t,e,i){return Qe.makeTranslation(t,e,i),this.applyMatrix4(Qe),this}scale(t,e,i){return Qe.makeScale(t,e,i),this.applyMatrix4(Qe),this}lookAt(t){return ua.lookAt(t),ua.updateMatrix(),this.applyMatrix4(ua.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(kn).negate(),this.translate(kn.x,kn.y,kn.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const i=[];for(let n=0,r=t.length;n<r;n++){const a=t[n];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new se(i,3))}else{for(let i=0,n=e.count;i<n;i++){const r=t[i];e.setXYZ(i,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new tn);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new C(-1/0,-1/0,-1/0),new C(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,n=e.length;i<n;i++){const r=e[i];Ye.setFromBufferAttribute(r),this.morphTargetsRelative?(Pe.addVectors(this.boundingBox.min,Ye.min),this.boundingBox.expandByPoint(Pe),Pe.addVectors(this.boundingBox.max,Ye.max),this.boundingBox.expandByPoint(Pe)):(this.boundingBox.expandByPoint(Ye.min),this.boundingBox.expandByPoint(Ye.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new wn);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new C,1/0);return}if(t){const i=this.boundingSphere.center;if(Ye.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){const o=e[r];fs.setFromBufferAttribute(o),this.morphTargetsRelative?(Pe.addVectors(Ye.min,fs.min),Ye.expandByPoint(Pe),Pe.addVectors(Ye.max,fs.max),Ye.expandByPoint(Pe)):(Ye.expandByPoint(fs.min),Ye.expandByPoint(fs.max))}Ye.getCenter(i);let n=0;for(let r=0,a=t.count;r<a;r++)Pe.fromBufferAttribute(t,r),n=Math.max(n,i.distanceToSquared(Pe));if(e)for(let r=0,a=e.length;r<a;r++){const o=e[r],l=this.morphTargetsRelative;for(let h=0,c=o.count;h<c;h++)Pe.fromBufferAttribute(o,h),l&&(kn.fromBufferAttribute(t,h),Pe.add(kn)),n=Math.max(n,i.distanceToSquared(Pe))}this.boundingSphere.radius=Math.sqrt(n),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.position,n=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new ye(new Float32Array(4*i.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let E=0;E<i.count;E++)o[E]=new C,l[E]=new C;const h=new C,c=new C,u=new C,d=new xt,p=new xt,g=new xt,v=new C,m=new C;function f(E,S,M){h.fromBufferAttribute(i,E),c.fromBufferAttribute(i,S),u.fromBufferAttribute(i,M),d.fromBufferAttribute(r,E),p.fromBufferAttribute(r,S),g.fromBufferAttribute(r,M),c.sub(h),u.sub(h),p.sub(d),g.sub(d);const R=1/(p.x*g.y-g.x*p.y);isFinite(R)&&(v.copy(c).multiplyScalar(g.y).addScaledVector(u,-p.y).multiplyScalar(R),m.copy(u).multiplyScalar(p.x).addScaledVector(c,-g.x).multiplyScalar(R),o[E].add(v),o[S].add(v),o[M].add(v),l[E].add(m),l[S].add(m),l[M].add(m))}let y=this.groups;y.length===0&&(y=[{start:0,count:t.count}]);for(let E=0,S=y.length;E<S;++E){const M=y[E],R=M.start,V=M.count;for(let O=R,N=R+V;O<N;O+=3)f(t.getX(O+0),t.getX(O+1),t.getX(O+2))}const _=new C,x=new C,I=new C,A=new C;function P(E){I.fromBufferAttribute(n,E),A.copy(I);const S=o[E];_.copy(S),_.sub(I.multiplyScalar(I.dot(S))).normalize(),x.crossVectors(A,S);const R=x.dot(l[E])<0?-1:1;a.setXYZW(E,_.x,_.y,_.z,R)}for(let E=0,S=y.length;E<S;++E){const M=y[E],R=M.start,V=M.count;for(let O=R,N=R+V;O<N;O+=3)P(t.getX(O+0)),P(t.getX(O+1)),P(t.getX(O+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new ye(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let d=0,p=i.count;d<p;d++)i.setXYZ(d,0,0,0);const n=new C,r=new C,a=new C,o=new C,l=new C,h=new C,c=new C,u=new C;if(t)for(let d=0,p=t.count;d<p;d+=3){const g=t.getX(d+0),v=t.getX(d+1),m=t.getX(d+2);n.fromBufferAttribute(e,g),r.fromBufferAttribute(e,v),a.fromBufferAttribute(e,m),c.subVectors(a,r),u.subVectors(n,r),c.cross(u),o.fromBufferAttribute(i,g),l.fromBufferAttribute(i,v),h.fromBufferAttribute(i,m),o.add(c),l.add(c),h.add(c),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(v,l.x,l.y,l.z),i.setXYZ(m,h.x,h.y,h.z)}else for(let d=0,p=e.count;d<p;d+=3)n.fromBufferAttribute(e,d+0),r.fromBufferAttribute(e,d+1),a.fromBufferAttribute(e,d+2),c.subVectors(a,r),u.subVectors(n,r),c.cross(u),i.setXYZ(d+0,c.x,c.y,c.z),i.setXYZ(d+1,c.x,c.y,c.z),i.setXYZ(d+2,c.x,c.y,c.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)Pe.fromBufferAttribute(t,e),Pe.normalize(),t.setXYZ(e,Pe.x,Pe.y,Pe.z)}toNonIndexed(){function t(o,l){const h=o.array,c=o.itemSize,u=o.normalized,d=new h.constructor(l.length*c);let p=0,g=0;for(let v=0,m=l.length;v<m;v++){o.isInterleavedBufferAttribute?p=l[v]*o.data.stride+o.offset:p=l[v]*c;for(let f=0;f<c;f++)d[g++]=h[p++]}return new ye(d,c,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new ce,i=this.index.array,n=this.attributes;for(const o in n){const l=n[o],h=t(l,i);e.setAttribute(o,h)}const r=this.morphAttributes;for(const o in r){const l=[],h=r[o];for(let c=0,u=h.length;c<u;c++){const d=h[c],p=t(d,i);l.push(p)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const h=a[o];e.addGroup(h.start,h.count,h.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const h in l)l[h]!==void 0&&(t[h]=l[h]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const i=this.attributes;for(const l in i){const h=i[l];t.data.attributes[l]=h.toJSON(t.data)}const n={};let r=!1;for(const l in this.morphAttributes){const h=this.morphAttributes[l],c=[];for(let u=0,d=h.length;u<d;u++){const p=h[u];c.push(p.toJSON(t.data))}c.length>0&&(n[l]=c,r=!0)}r&&(t.data.morphAttributes=n,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone(e));const n=t.attributes;for(const h in n){const c=n[h];this.setAttribute(h,c.clone(e))}const r=t.morphAttributes;for(const h in r){const c=[],u=r[h];for(let d=0,p=u.length;d<p;d++)c.push(u[d].clone(e));this.morphAttributes[h]=c}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let h=0,c=a.length;h<c;h++){const u=a[h];this.addGroup(u.start,u.count,u.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Pl=new ne,on=new zr,Ks=new wn,Il=new C,Zs=new C,Js=new C,Qs=new C,fa=new C,tr=new C,Dl=new C,er=new C;class Yt extends Te{constructor(t=new ce,e=new Ts){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const n=e[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=n.length;r<a;r++){const o=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){const i=this.geometry,n=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;e.fromBufferAttribute(n,t);const o=this.morphTargetInfluences;if(r&&o){tr.set(0,0,0);for(let l=0,h=r.length;l<h;l++){const c=o[l],u=r[l];c!==0&&(fa.fromBufferAttribute(u,t),a?tr.addScaledVector(fa,c):tr.addScaledVector(fa.sub(e),c))}e.add(tr)}return e}raycast(t,e){const i=this.geometry,n=this.material,r=this.matrixWorld;n!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Ks.copy(i.boundingSphere),Ks.applyMatrix4(r),on.copy(t.ray).recast(t.near),!(Ks.containsPoint(on.origin)===!1&&(on.intersectSphere(Ks,Il)===null||on.origin.distanceToSquared(Il)>(t.far-t.near)**2))&&(Pl.copy(r).invert(),on.copy(t.ray).applyMatrix4(Pl),!(i.boundingBox!==null&&on.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,on)))}_computeIntersections(t,e,i){let n;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,h=r.attributes.uv,c=r.attributes.uv1,u=r.attributes.normal,d=r.groups,p=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,v=d.length;g<v;g++){const m=d[g],f=a[m.materialIndex],y=Math.max(m.start,p.start),_=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let x=y,I=_;x<I;x+=3){const A=o.getX(x),P=o.getX(x+1),E=o.getX(x+2);n=ir(this,f,t,i,h,c,u,A,P,E),n&&(n.faceIndex=Math.floor(x/3),n.face.materialIndex=m.materialIndex,e.push(n))}}else{const g=Math.max(0,p.start),v=Math.min(o.count,p.start+p.count);for(let m=g,f=v;m<f;m+=3){const y=o.getX(m),_=o.getX(m+1),x=o.getX(m+2);n=ir(this,a,t,i,h,c,u,y,_,x),n&&(n.faceIndex=Math.floor(m/3),e.push(n))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,v=d.length;g<v;g++){const m=d[g],f=a[m.materialIndex],y=Math.max(m.start,p.start),_=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let x=y,I=_;x<I;x+=3){const A=x,P=x+1,E=x+2;n=ir(this,f,t,i,h,c,u,A,P,E),n&&(n.faceIndex=Math.floor(x/3),n.face.materialIndex=m.materialIndex,e.push(n))}}else{const g=Math.max(0,p.start),v=Math.min(l.count,p.start+p.count);for(let m=g,f=v;m<f;m+=3){const y=m,_=m+1,x=m+2;n=ir(this,a,t,i,h,c,u,y,_,x),n&&(n.faceIndex=Math.floor(m/3),e.push(n))}}}}function au(s,t,e,i,n,r,a,o){let l;if(t.side===We?l=i.intersectTriangle(a,r,n,!0,o):l=i.intersectTriangle(n,r,a,t.side===Qi,o),l===null)return null;er.copy(o),er.applyMatrix4(s.matrixWorld);const h=e.ray.origin.distanceTo(er);return h<e.near||h>e.far?null:{distance:h,point:er.clone(),object:s}}function ir(s,t,e,i,n,r,a,o,l,h){s.getVertexPosition(o,Zs),s.getVertexPosition(l,Js),s.getVertexPosition(h,Qs);const c=au(s,t,e,i,Zs,Js,Qs,Dl);if(c){const u=new C;ni.getBarycoord(Dl,Zs,Js,Qs,u),n&&(c.uv=ni.getInterpolatedAttribute(n,o,l,h,u,new xt)),r&&(c.uv1=ni.getInterpolatedAttribute(r,o,l,h,u,new xt)),a&&(c.normal=ni.getInterpolatedAttribute(a,o,l,h,u,new C),c.normal.dot(i.direction)>0&&c.normal.multiplyScalar(-1));const d={a:o,b:l,c:h,normal:new C,materialIndex:0};ni.getNormal(Zs,Js,Qs,d.normal),c.face=d,c.barycoord=u}return c}class nn extends ce{constructor(t=1,e=1,i=1,n=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:n,heightSegments:r,depthSegments:a};const o=this;n=Math.floor(n),r=Math.floor(r),a=Math.floor(a);const l=[],h=[],c=[],u=[];let d=0,p=0;g("z","y","x",-1,-1,i,e,t,a,r,0),g("z","y","x",1,-1,i,e,-t,a,r,1),g("x","z","y",1,1,t,i,e,n,a,2),g("x","z","y",1,-1,t,i,-e,n,a,3),g("x","y","z",1,-1,t,e,i,n,r,4),g("x","y","z",-1,-1,t,e,-i,n,r,5),this.setIndex(l),this.setAttribute("position",new se(h,3)),this.setAttribute("normal",new se(c,3)),this.setAttribute("uv",new se(u,2));function g(v,m,f,y,_,x,I,A,P,E,S){const M=x/P,R=I/E,V=x/2,O=I/2,N=A/2,D=P+1,U=E+1;let L=0,B=0;const q=new C;for(let Q=0;Q<U;Q++){const et=Q*R-O;for(let pt=0;pt<D;pt++){const qt=pt*M-V;q[v]=qt*y,q[m]=et*_,q[f]=N,h.push(q.x,q.y,q.z),q[v]=0,q[m]=0,q[f]=A>0?1:-1,c.push(q.x,q.y,q.z),u.push(pt/P),u.push(1-Q/E),L+=1}}for(let Q=0;Q<E;Q++)for(let et=0;et<P;et++){const pt=d+et+D*Q,qt=d+et+D*(Q+1),Y=d+(et+1)+D*(Q+1),tt=d+(et+1)+D*Q;l.push(pt,qt,tt),l.push(qt,Y,tt),B+=6}o.addGroup(p,B,S),p+=B,d+=L}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new nn(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function is(s){const t={};for(const e in s){t[e]={};for(const i in s[e]){const n=s[e][i];n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)?n.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=n.clone():Array.isArray(n)?t[e][i]=n.slice():t[e][i]=n}}return t}function Ve(s){const t={};for(let e=0;e<s.length;e++){const i=is(s[e]);for(const n in i)t[n]=i[n]}return t}function ou(s){const t=[];for(let e=0;e<s.length;e++)t.push(s[e].clone());return t}function ah(s){const t=s.getRenderTarget();return t===null?s.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ee.workingColorSpace}const lu={clone:is,merge:Ve};var cu=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,hu=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class pi extends en{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=cu,this.fragmentShader=hu,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=is(t.uniforms),this.uniformsGroups=ou(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const n in this.uniforms){const a=this.uniforms[n].value;a&&a.isTexture?e.uniforms[n]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[n]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[n]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[n]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[n]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[n]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[n]={type:"m4",value:a.toArray()}:e.uniforms[n]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const i={};for(const n in this.extensions)this.extensions[n]===!0&&(i[n]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}}class oh extends Te{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ne,this.projectionMatrix=new ne,this.projectionMatrixInverse=new ne,this.coordinateSystem=Di}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const $i=new C,Ll=new xt,Ul=new xt;class ei extends oh{constructor(t=50,e=1,i=.1,n=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=n,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Ds*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(ws*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Ds*2*Math.atan(Math.tan(ws*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){$i.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set($i.x,$i.y).multiplyScalar(-t/$i.z),$i.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set($i.x,$i.y).multiplyScalar(-t/$i.z)}getViewSize(t,e){return this.getViewBounds(t,Ll,Ul),e.subVectors(Ul,Ll)}setViewOffset(t,e,i,n,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=n,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(ws*.5*this.fov)/this.zoom,i=2*e,n=this.aspect*i,r=-.5*n;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,h=a.fullHeight;r+=a.offsetX*n/l,e-=a.offsetY*i/h,n*=a.width/l,i*=a.height/h}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+n,e,e-i,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const On=-90,Fn=1;class du extends Te{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const n=new ei(On,Fn,t,e);n.layers=this.layers,this.add(n);const r=new ei(On,Fn,t,e);r.layers=this.layers,this.add(r);const a=new ei(On,Fn,t,e);a.layers=this.layers,this.add(a);const o=new ei(On,Fn,t,e);o.layers=this.layers,this.add(o);const l=new ei(On,Fn,t,e);l.layers=this.layers,this.add(l);const h=new ei(On,Fn,t,e);h.layers=this.layers,this.add(h)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[i,n,r,a,o,l]=e;for(const h of e)this.remove(h);if(t===Di)i.up.set(0,1,0),i.lookAt(1,0,0),n.up.set(0,1,0),n.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Pr)i.up.set(0,-1,0),i.lookAt(-1,0,0),n.up.set(0,-1,0),n.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const h of e)this.add(h),h.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:n}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,h,c]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const v=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,n),t.render(e,r),t.setRenderTarget(i,1,n),t.render(e,a),t.setRenderTarget(i,2,n),t.render(e,o),t.setRenderTarget(i,3,n),t.render(e,l),t.setRenderTarget(i,4,n),t.render(e,h),i.texture.generateMipmaps=v,t.setRenderTarget(i,5,n),t.render(e,c),t.setRenderTarget(u,d,p),t.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class lh extends ze{constructor(t,e,i,n,r,a,o,l,h,c){t=t!==void 0?t:[],e=e!==void 0?e:Jn,super(t,e,i,n,r,a,o,l,h,c),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class uu extends Sn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},n=[i,i,i,i,i,i];this.texture=new lh(n,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:fi}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},n=new nn(5,5,5),r=new pi({name:"CubemapFromEquirect",uniforms:is(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:We,blending:Ki});r.uniforms.tEquirect.value=e;const a=new Yt(n,r),o=e.minFilter;return e.minFilter===xn&&(e.minFilter=fi),new du(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e,i,n){const r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,i,n);t.setRenderTarget(r)}}const pa=new C,fu=new C,pu=new Vt;class xi{constructor(t=new C(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,n){return this.normal.set(t,e,i),this.constant=n,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){const n=pa.subVectors(i,e).cross(fu.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(n,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const i=t.delta(pa),n=this.normal.dot(i);if(n===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/n;return r<0||r>1?null:e.copy(t.start).addScaledVector(i,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const i=e||pu.getNormalMatrix(t),n=this.coplanarPoint(pa).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-n.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ln=new wn,nr=new C;class Br{constructor(t=new xi,e=new xi,i=new xi,n=new xi,r=new xi,a=new xi){this.planes=[t,e,i,n,r,a]}set(t,e,i,n,r,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(i),o[3].copy(n),o[4].copy(r),o[5].copy(a),this}copy(t){const e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=Di){const i=this.planes,n=t.elements,r=n[0],a=n[1],o=n[2],l=n[3],h=n[4],c=n[5],u=n[6],d=n[7],p=n[8],g=n[9],v=n[10],m=n[11],f=n[12],y=n[13],_=n[14],x=n[15];if(i[0].setComponents(l-r,d-h,m-p,x-f).normalize(),i[1].setComponents(l+r,d+h,m+p,x+f).normalize(),i[2].setComponents(l+a,d+c,m+g,x+y).normalize(),i[3].setComponents(l-a,d-c,m-g,x-y).normalize(),i[4].setComponents(l-o,d-u,m-v,x-_).normalize(),e===Di)i[5].setComponents(l+o,d+u,m+v,x+_).normalize();else if(e===Pr)i[5].setComponents(o,u,v,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),ln.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),ln.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(ln)}intersectsSprite(t){return ln.center.set(0,0,0),ln.radius=.7071067811865476,ln.applyMatrix4(t.matrixWorld),this.intersectsSphere(ln)}intersectsSphere(t){const e=this.planes,i=t.center,n=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(i)<n)return!1;return!0}intersectsBox(t){const e=this.planes;for(let i=0;i<6;i++){const n=e[i];if(nr.x=n.normal.x>0?t.max.x:t.min.x,nr.y=n.normal.y>0?t.max.y:t.min.y,nr.z=n.normal.z>0?t.max.z:t.min.z,n.distanceToPoint(nr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function ch(){let s=null,t=!1,e=null,i=null;function n(r,a){e(r,a),i=s.requestAnimationFrame(n)}return{start:function(){t!==!0&&e!==null&&(i=s.requestAnimationFrame(n),t=!0)},stop:function(){s.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){s=r}}}function mu(s){const t=new WeakMap;function e(o,l){const h=o.array,c=o.usage,u=h.byteLength,d=s.createBuffer();s.bindBuffer(l,d),s.bufferData(l,h,c),o.onUploadCallback();let p;if(h instanceof Float32Array)p=s.FLOAT;else if(h instanceof Uint16Array)o.isFloat16BufferAttribute?p=s.HALF_FLOAT:p=s.UNSIGNED_SHORT;else if(h instanceof Int16Array)p=s.SHORT;else if(h instanceof Uint32Array)p=s.UNSIGNED_INT;else if(h instanceof Int32Array)p=s.INT;else if(h instanceof Int8Array)p=s.BYTE;else if(h instanceof Uint8Array)p=s.UNSIGNED_BYTE;else if(h instanceof Uint8ClampedArray)p=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+h);return{buffer:d,type:p,bytesPerElement:h.BYTES_PER_ELEMENT,version:o.version,size:u}}function i(o,l,h){const c=l.array,u=l.updateRanges;if(s.bindBuffer(h,o),u.length===0)s.bufferSubData(h,0,c);else{u.sort((p,g)=>p.start-g.start);let d=0;for(let p=1;p<u.length;p++){const g=u[d],v=u[p];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++d,u[d]=v)}u.length=d+1;for(let p=0,g=u.length;p<g;p++){const v=u[p];s.bufferSubData(h,v.start*c.BYTES_PER_ELEMENT,c,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function n(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=t.get(o);l&&(s.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const c=t.get(o);(!c||c.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const h=t.get(o);if(h===void 0)t.set(o,e(o,l));else if(h.version<o.version){if(h.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(h.buffer,o,l),h.version=o.version}}return{get:n,remove:r,update:a}}class ns extends ce{constructor(t=1,e=1,i=1,n=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:n};const r=t/2,a=e/2,o=Math.floor(i),l=Math.floor(n),h=o+1,c=l+1,u=t/o,d=e/l,p=[],g=[],v=[],m=[];for(let f=0;f<c;f++){const y=f*d-a;for(let _=0;_<h;_++){const x=_*u-r;g.push(x,-y,0),v.push(0,0,1),m.push(_/o),m.push(1-f/l)}}for(let f=0;f<l;f++)for(let y=0;y<o;y++){const _=y+h*f,x=y+h*(f+1),I=y+1+h*(f+1),A=y+1+h*f;p.push(_,x,A),p.push(x,I,A)}this.setIndex(p),this.setAttribute("position",new se(g,3)),this.setAttribute("normal",new se(v,3)),this.setAttribute("uv",new se(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ns(t.width,t.height,t.widthSegments,t.heightSegments)}}var gu=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,vu=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,xu=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,yu=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,_u=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Mu=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,bu=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Su=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,wu=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Eu=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Tu=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Au=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Ru=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Cu=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Pu=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Iu=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Du=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Lu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Uu=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Nu=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,ku=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Ou=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Fu=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,zu=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Bu=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Hu=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Vu=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Gu=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Wu=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,$u=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Xu="gl_FragColor = linearToOutputTexel( gl_FragColor );",qu=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Yu=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,ju=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Ku=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Zu=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Ju=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Qu=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,tf=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,ef=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,nf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,sf=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,rf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,af=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,of=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lf=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,cf=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,hf=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,df=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,uf=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,ff=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,pf=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,mf=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,gf=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,vf=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,xf=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,yf=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,_f=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Mf=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,bf=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Sf=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,wf=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Ef=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Tf=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Af=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Rf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Cf=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Pf=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,If=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Df=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Lf=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Uf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Nf=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,kf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Of=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ff=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,zf=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Bf=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Hf=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Vf=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Gf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Wf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,$f=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Xf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,qf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Yf=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,jf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Kf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Zf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Jf=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Qf=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,tp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,ep=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,ip=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,np=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,sp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,rp=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,ap=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,op=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,lp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,cp=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,hp=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,dp=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,up=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,fp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,pp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,mp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const gp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,vp=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,xp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,yp=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,_p=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Mp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,bp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Sp=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,wp=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Ep=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Tp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Ap=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Rp=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Cp=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Pp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Ip=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Dp=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Lp=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Up=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Np=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,kp=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Op=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Fp=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,zp=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Bp=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Hp=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Vp=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Gp=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Wp=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,$p=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Xp=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,qp=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Yp=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,jp=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,$t={alphahash_fragment:gu,alphahash_pars_fragment:vu,alphamap_fragment:xu,alphamap_pars_fragment:yu,alphatest_fragment:_u,alphatest_pars_fragment:Mu,aomap_fragment:bu,aomap_pars_fragment:Su,batching_pars_vertex:wu,batching_vertex:Eu,begin_vertex:Tu,beginnormal_vertex:Au,bsdfs:Ru,iridescence_fragment:Cu,bumpmap_pars_fragment:Pu,clipping_planes_fragment:Iu,clipping_planes_pars_fragment:Du,clipping_planes_pars_vertex:Lu,clipping_planes_vertex:Uu,color_fragment:Nu,color_pars_fragment:ku,color_pars_vertex:Ou,color_vertex:Fu,common:zu,cube_uv_reflection_fragment:Bu,defaultnormal_vertex:Hu,displacementmap_pars_vertex:Vu,displacementmap_vertex:Gu,emissivemap_fragment:Wu,emissivemap_pars_fragment:$u,colorspace_fragment:Xu,colorspace_pars_fragment:qu,envmap_fragment:Yu,envmap_common_pars_fragment:ju,envmap_pars_fragment:Ku,envmap_pars_vertex:Zu,envmap_physical_pars_fragment:cf,envmap_vertex:Ju,fog_vertex:Qu,fog_pars_vertex:tf,fog_fragment:ef,fog_pars_fragment:nf,gradientmap_pars_fragment:sf,lightmap_pars_fragment:rf,lights_lambert_fragment:af,lights_lambert_pars_fragment:of,lights_pars_begin:lf,lights_toon_fragment:hf,lights_toon_pars_fragment:df,lights_phong_fragment:uf,lights_phong_pars_fragment:ff,lights_physical_fragment:pf,lights_physical_pars_fragment:mf,lights_fragment_begin:gf,lights_fragment_maps:vf,lights_fragment_end:xf,logdepthbuf_fragment:yf,logdepthbuf_pars_fragment:_f,logdepthbuf_pars_vertex:Mf,logdepthbuf_vertex:bf,map_fragment:Sf,map_pars_fragment:wf,map_particle_fragment:Ef,map_particle_pars_fragment:Tf,metalnessmap_fragment:Af,metalnessmap_pars_fragment:Rf,morphinstance_vertex:Cf,morphcolor_vertex:Pf,morphnormal_vertex:If,morphtarget_pars_vertex:Df,morphtarget_vertex:Lf,normal_fragment_begin:Uf,normal_fragment_maps:Nf,normal_pars_fragment:kf,normal_pars_vertex:Of,normal_vertex:Ff,normalmap_pars_fragment:zf,clearcoat_normal_fragment_begin:Bf,clearcoat_normal_fragment_maps:Hf,clearcoat_pars_fragment:Vf,iridescence_pars_fragment:Gf,opaque_fragment:Wf,packing:$f,premultiplied_alpha_fragment:Xf,project_vertex:qf,dithering_fragment:Yf,dithering_pars_fragment:jf,roughnessmap_fragment:Kf,roughnessmap_pars_fragment:Zf,shadowmap_pars_fragment:Jf,shadowmap_pars_vertex:Qf,shadowmap_vertex:tp,shadowmask_pars_fragment:ep,skinbase_vertex:ip,skinning_pars_vertex:np,skinning_vertex:sp,skinnormal_vertex:rp,specularmap_fragment:ap,specularmap_pars_fragment:op,tonemapping_fragment:lp,tonemapping_pars_fragment:cp,transmission_fragment:hp,transmission_pars_fragment:dp,uv_pars_fragment:up,uv_pars_vertex:fp,uv_vertex:pp,worldpos_vertex:mp,background_vert:gp,background_frag:vp,backgroundCube_vert:xp,backgroundCube_frag:yp,cube_vert:_p,cube_frag:Mp,depth_vert:bp,depth_frag:Sp,distanceRGBA_vert:wp,distanceRGBA_frag:Ep,equirect_vert:Tp,equirect_frag:Ap,linedashed_vert:Rp,linedashed_frag:Cp,meshbasic_vert:Pp,meshbasic_frag:Ip,meshlambert_vert:Dp,meshlambert_frag:Lp,meshmatcap_vert:Up,meshmatcap_frag:Np,meshnormal_vert:kp,meshnormal_frag:Op,meshphong_vert:Fp,meshphong_frag:zp,meshphysical_vert:Bp,meshphysical_frag:Hp,meshtoon_vert:Vp,meshtoon_frag:Gp,points_vert:Wp,points_frag:$p,shadow_vert:Xp,shadow_frag:qp,sprite_vert:Yp,sprite_frag:jp},lt={common:{diffuse:{value:new Et(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Vt},alphaMap:{value:null},alphaMapTransform:{value:new Vt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Vt}},envmap:{envMap:{value:null},envMapRotation:{value:new Vt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Vt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Vt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Vt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Vt},normalScale:{value:new xt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Vt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Vt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Vt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Vt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Et(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Et(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Vt},alphaTest:{value:0},uvTransform:{value:new Vt}},sprite:{diffuse:{value:new Et(16777215)},opacity:{value:1},center:{value:new xt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Vt},alphaMap:{value:null},alphaMapTransform:{value:new Vt},alphaTest:{value:0}}},yi={basic:{uniforms:Ve([lt.common,lt.specularmap,lt.envmap,lt.aomap,lt.lightmap,lt.fog]),vertexShader:$t.meshbasic_vert,fragmentShader:$t.meshbasic_frag},lambert:{uniforms:Ve([lt.common,lt.specularmap,lt.envmap,lt.aomap,lt.lightmap,lt.emissivemap,lt.bumpmap,lt.normalmap,lt.displacementmap,lt.fog,lt.lights,{emissive:{value:new Et(0)}}]),vertexShader:$t.meshlambert_vert,fragmentShader:$t.meshlambert_frag},phong:{uniforms:Ve([lt.common,lt.specularmap,lt.envmap,lt.aomap,lt.lightmap,lt.emissivemap,lt.bumpmap,lt.normalmap,lt.displacementmap,lt.fog,lt.lights,{emissive:{value:new Et(0)},specular:{value:new Et(1118481)},shininess:{value:30}}]),vertexShader:$t.meshphong_vert,fragmentShader:$t.meshphong_frag},standard:{uniforms:Ve([lt.common,lt.envmap,lt.aomap,lt.lightmap,lt.emissivemap,lt.bumpmap,lt.normalmap,lt.displacementmap,lt.roughnessmap,lt.metalnessmap,lt.fog,lt.lights,{emissive:{value:new Et(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:$t.meshphysical_vert,fragmentShader:$t.meshphysical_frag},toon:{uniforms:Ve([lt.common,lt.aomap,lt.lightmap,lt.emissivemap,lt.bumpmap,lt.normalmap,lt.displacementmap,lt.gradientmap,lt.fog,lt.lights,{emissive:{value:new Et(0)}}]),vertexShader:$t.meshtoon_vert,fragmentShader:$t.meshtoon_frag},matcap:{uniforms:Ve([lt.common,lt.bumpmap,lt.normalmap,lt.displacementmap,lt.fog,{matcap:{value:null}}]),vertexShader:$t.meshmatcap_vert,fragmentShader:$t.meshmatcap_frag},points:{uniforms:Ve([lt.points,lt.fog]),vertexShader:$t.points_vert,fragmentShader:$t.points_frag},dashed:{uniforms:Ve([lt.common,lt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:$t.linedashed_vert,fragmentShader:$t.linedashed_frag},depth:{uniforms:Ve([lt.common,lt.displacementmap]),vertexShader:$t.depth_vert,fragmentShader:$t.depth_frag},normal:{uniforms:Ve([lt.common,lt.bumpmap,lt.normalmap,lt.displacementmap,{opacity:{value:1}}]),vertexShader:$t.meshnormal_vert,fragmentShader:$t.meshnormal_frag},sprite:{uniforms:Ve([lt.sprite,lt.fog]),vertexShader:$t.sprite_vert,fragmentShader:$t.sprite_frag},background:{uniforms:{uvTransform:{value:new Vt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:$t.background_vert,fragmentShader:$t.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Vt}},vertexShader:$t.backgroundCube_vert,fragmentShader:$t.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:$t.cube_vert,fragmentShader:$t.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:$t.equirect_vert,fragmentShader:$t.equirect_frag},distanceRGBA:{uniforms:Ve([lt.common,lt.displacementmap,{referencePosition:{value:new C},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:$t.distanceRGBA_vert,fragmentShader:$t.distanceRGBA_frag},shadow:{uniforms:Ve([lt.lights,lt.fog,{color:{value:new Et(0)},opacity:{value:1}}]),vertexShader:$t.shadow_vert,fragmentShader:$t.shadow_frag}};yi.physical={uniforms:Ve([yi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Vt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Vt},clearcoatNormalScale:{value:new xt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Vt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Vt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Vt},sheen:{value:0},sheenColor:{value:new Et(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Vt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Vt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Vt},transmissionSamplerSize:{value:new xt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Vt},attenuationDistance:{value:0},attenuationColor:{value:new Et(0)},specularColor:{value:new Et(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Vt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Vt},anisotropyVector:{value:new xt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Vt}}]),vertexShader:$t.meshphysical_vert,fragmentShader:$t.meshphysical_frag};const sr={r:0,b:0,g:0},cn=new Mi,Kp=new ne;function Zp(s,t,e,i,n,r,a){const o=new Et(0);let l=r===!0?0:1,h,c,u=null,d=0,p=null;function g(y){let _=y.isScene===!0?y.background:null;return _&&_.isTexture&&(_=(y.backgroundBlurriness>0?e:t).get(_)),_}function v(y){let _=!1;const x=g(y);x===null?f(o,l):x&&x.isColor&&(f(x,1),_=!0);const I=s.xr.getEnvironmentBlendMode();I==="additive"?i.buffers.color.setClear(0,0,0,1,a):I==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,a),(s.autoClear||_)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function m(y,_){const x=g(_);x&&(x.isCubeTexture||x.mapping===Or)?(c===void 0&&(c=new Yt(new nn(1,1,1),new pi({name:"BackgroundCubeMaterial",uniforms:is(yi.backgroundCube.uniforms),vertexShader:yi.backgroundCube.vertexShader,fragmentShader:yi.backgroundCube.fragmentShader,side:We,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(I,A,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),cn.copy(_.backgroundRotation),cn.x*=-1,cn.y*=-1,cn.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(cn.y*=-1,cn.z*=-1),c.material.uniforms.envMap.value=x,c.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,c.material.uniforms.backgroundBlurriness.value=_.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(Kp.makeRotationFromEuler(cn)),c.material.toneMapped=ee.getTransfer(x.colorSpace)!==he,(u!==x||d!==x.version||p!==s.toneMapping)&&(c.material.needsUpdate=!0,u=x,d=x.version,p=s.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null)):x&&x.isTexture&&(h===void 0&&(h=new Yt(new ns(2,2),new pi({name:"BackgroundMaterial",uniforms:is(yi.background.uniforms),vertexShader:yi.background.vertexShader,fragmentShader:yi.background.fragmentShader,side:Qi,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),Object.defineProperty(h.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(h)),h.material.uniforms.t2D.value=x,h.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,h.material.toneMapped=ee.getTransfer(x.colorSpace)!==he,x.matrixAutoUpdate===!0&&x.updateMatrix(),h.material.uniforms.uvTransform.value.copy(x.matrix),(u!==x||d!==x.version||p!==s.toneMapping)&&(h.material.needsUpdate=!0,u=x,d=x.version,p=s.toneMapping),h.layers.enableAll(),y.unshift(h,h.geometry,h.material,0,0,null))}function f(y,_){y.getRGB(sr,ah(s)),i.buffers.color.setClear(sr.r,sr.g,sr.b,_,a)}return{getClearColor:function(){return o},setClearColor:function(y,_=1){o.set(y),l=_,f(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(y){l=y,f(o,l)},render:v,addToRenderList:m}}function Jp(s,t){const e=s.getParameter(s.MAX_VERTEX_ATTRIBS),i={},n=d(null);let r=n,a=!1;function o(M,R,V,O,N){let D=!1;const U=u(O,V,R);r!==U&&(r=U,h(r.object)),D=p(M,O,V,N),D&&g(M,O,V,N),N!==null&&t.update(N,s.ELEMENT_ARRAY_BUFFER),(D||a)&&(a=!1,x(M,R,V,O),N!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(N).buffer))}function l(){return s.createVertexArray()}function h(M){return s.bindVertexArray(M)}function c(M){return s.deleteVertexArray(M)}function u(M,R,V){const O=V.wireframe===!0;let N=i[M.id];N===void 0&&(N={},i[M.id]=N);let D=N[R.id];D===void 0&&(D={},N[R.id]=D);let U=D[O];return U===void 0&&(U=d(l()),D[O]=U),U}function d(M){const R=[],V=[],O=[];for(let N=0;N<e;N++)R[N]=0,V[N]=0,O[N]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:R,enabledAttributes:V,attributeDivisors:O,object:M,attributes:{},index:null}}function p(M,R,V,O){const N=r.attributes,D=R.attributes;let U=0;const L=V.getAttributes();for(const B in L)if(L[B].location>=0){const Q=N[B];let et=D[B];if(et===void 0&&(B==="instanceMatrix"&&M.instanceMatrix&&(et=M.instanceMatrix),B==="instanceColor"&&M.instanceColor&&(et=M.instanceColor)),Q===void 0||Q.attribute!==et||et&&Q.data!==et.data)return!0;U++}return r.attributesNum!==U||r.index!==O}function g(M,R,V,O){const N={},D=R.attributes;let U=0;const L=V.getAttributes();for(const B in L)if(L[B].location>=0){let Q=D[B];Q===void 0&&(B==="instanceMatrix"&&M.instanceMatrix&&(Q=M.instanceMatrix),B==="instanceColor"&&M.instanceColor&&(Q=M.instanceColor));const et={};et.attribute=Q,Q&&Q.data&&(et.data=Q.data),N[B]=et,U++}r.attributes=N,r.attributesNum=U,r.index=O}function v(){const M=r.newAttributes;for(let R=0,V=M.length;R<V;R++)M[R]=0}function m(M){f(M,0)}function f(M,R){const V=r.newAttributes,O=r.enabledAttributes,N=r.attributeDivisors;V[M]=1,O[M]===0&&(s.enableVertexAttribArray(M),O[M]=1),N[M]!==R&&(s.vertexAttribDivisor(M,R),N[M]=R)}function y(){const M=r.newAttributes,R=r.enabledAttributes;for(let V=0,O=R.length;V<O;V++)R[V]!==M[V]&&(s.disableVertexAttribArray(V),R[V]=0)}function _(M,R,V,O,N,D,U){U===!0?s.vertexAttribIPointer(M,R,V,N,D):s.vertexAttribPointer(M,R,V,O,N,D)}function x(M,R,V,O){v();const N=O.attributes,D=V.getAttributes(),U=R.defaultAttributeValues;for(const L in D){const B=D[L];if(B.location>=0){let q=N[L];if(q===void 0&&(L==="instanceMatrix"&&M.instanceMatrix&&(q=M.instanceMatrix),L==="instanceColor"&&M.instanceColor&&(q=M.instanceColor)),q!==void 0){const Q=q.normalized,et=q.itemSize,pt=t.get(q);if(pt===void 0)continue;const qt=pt.buffer,Y=pt.type,tt=pt.bytesPerElement,rt=Y===s.INT||Y===s.UNSIGNED_INT||q.gpuType===No;if(q.isInterleavedBufferAttribute){const st=q.data,Tt=st.stride,Dt=q.offset;if(st.isInstancedInterleavedBuffer){for(let zt=0;zt<B.locationSize;zt++)f(B.location+zt,st.meshPerAttribute);M.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=st.meshPerAttribute*st.count)}else for(let zt=0;zt<B.locationSize;zt++)m(B.location+zt);s.bindBuffer(s.ARRAY_BUFFER,qt);for(let zt=0;zt<B.locationSize;zt++)_(B.location+zt,et/B.locationSize,Y,Q,Tt*tt,(Dt+et/B.locationSize*zt)*tt,rt)}else{if(q.isInstancedBufferAttribute){for(let st=0;st<B.locationSize;st++)f(B.location+st,q.meshPerAttribute);M.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=q.meshPerAttribute*q.count)}else for(let st=0;st<B.locationSize;st++)m(B.location+st);s.bindBuffer(s.ARRAY_BUFFER,qt);for(let st=0;st<B.locationSize;st++)_(B.location+st,et/B.locationSize,Y,Q,et*tt,et/B.locationSize*st*tt,rt)}}else if(U!==void 0){const Q=U[L];if(Q!==void 0)switch(Q.length){case 2:s.vertexAttrib2fv(B.location,Q);break;case 3:s.vertexAttrib3fv(B.location,Q);break;case 4:s.vertexAttrib4fv(B.location,Q);break;default:s.vertexAttrib1fv(B.location,Q)}}}}y()}function I(){E();for(const M in i){const R=i[M];for(const V in R){const O=R[V];for(const N in O)c(O[N].object),delete O[N];delete R[V]}delete i[M]}}function A(M){if(i[M.id]===void 0)return;const R=i[M.id];for(const V in R){const O=R[V];for(const N in O)c(O[N].object),delete O[N];delete R[V]}delete i[M.id]}function P(M){for(const R in i){const V=i[R];if(V[M.id]===void 0)continue;const O=V[M.id];for(const N in O)c(O[N].object),delete O[N];delete V[M.id]}}function E(){S(),a=!0,r!==n&&(r=n,h(r.object))}function S(){n.geometry=null,n.program=null,n.wireframe=!1}return{setup:o,reset:E,resetDefaultState:S,dispose:I,releaseStatesOfGeometry:A,releaseStatesOfProgram:P,initAttributes:v,enableAttribute:m,disableUnusedAttributes:y}}function Qp(s,t,e){let i;function n(h){i=h}function r(h,c){s.drawArrays(i,h,c),e.update(c,i,1)}function a(h,c,u){u!==0&&(s.drawArraysInstanced(i,h,c,u),e.update(c,i,u))}function o(h,c,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,h,0,c,0,u);let p=0;for(let g=0;g<u;g++)p+=c[g];e.update(p,i,1)}function l(h,c,u,d){if(u===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<h.length;g++)a(h[g],c[g],d[g]);else{p.multiDrawArraysInstancedWEBGL(i,h,0,c,0,d,0,u);let g=0;for(let v=0;v<u;v++)g+=c[v]*d[v];e.update(g,i,1)}}this.setMode=n,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function tm(s,t,e,i){let n;function r(){if(n!==void 0)return n;if(t.has("EXT_texture_filter_anisotropic")===!0){const P=t.get("EXT_texture_filter_anisotropic");n=s.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function a(P){return!(P!==ri&&i.convert(P)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(P){const E=P===Ns&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(P!==Ni&&i.convert(P)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&P!==_i&&!E)}function l(P){if(P==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let h=e.precision!==void 0?e.precision:"highp";const c=l(h);c!==h&&(console.warn("THREE.WebGLRenderer:",h,"not supported, using",c,"instead."),h=c);const u=e.logarithmicDepthBuffer===!0,d=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),p=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),g=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=s.getParameter(s.MAX_TEXTURE_SIZE),m=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),f=s.getParameter(s.MAX_VERTEX_ATTRIBS),y=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),_=s.getParameter(s.MAX_VARYING_VECTORS),x=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),I=g>0,A=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:h,logarithmicDepthBuffer:u,reverseDepthBuffer:d,maxTextures:p,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:y,maxVaryings:_,maxFragmentUniforms:x,vertexTextures:I,maxSamples:A}}function em(s){const t=this;let e=null,i=0,n=!1,r=!1;const a=new xi,o=new Vt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const p=u.length!==0||d||i!==0||n;return n=d,i=u.length,p},this.beginShadows=function(){r=!0,c(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){e=c(u,d,0)},this.setState=function(u,d,p){const g=u.clippingPlanes,v=u.clipIntersection,m=u.clipShadows,f=s.get(u);if(!n||g===null||g.length===0||r&&!m)r?c(null):h();else{const y=r?0:i,_=y*4;let x=f.clippingState||null;l.value=x,x=c(g,d,_,p);for(let I=0;I!==_;++I)x[I]=e[I];f.clippingState=x,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=y}};function h(){l.value!==e&&(l.value=e,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function c(u,d,p,g){const v=u!==null?u.length:0;let m=null;if(v!==0){if(m=l.value,g!==!0||m===null){const f=p+v*4,y=d.matrixWorldInverse;o.getNormalMatrix(y),(m===null||m.length<f)&&(m=new Float32Array(f));for(let _=0,x=p;_!==v;++_,x+=4)a.copy(u[_]).applyMatrix4(y,o),a.normal.toArray(m,x),m[x+3]=a.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,m}}function im(s){let t=new WeakMap;function e(a,o){return o===ja?a.mapping=Jn:o===Ka&&(a.mapping=Qn),a}function i(a){if(a&&a.isTexture){const o=a.mapping;if(o===ja||o===Ka)if(t.has(a)){const l=t.get(a).texture;return e(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const h=new uu(l.height);return h.fromEquirectangularTexture(s,a),t.set(a,h),a.addEventListener("dispose",n),e(h.texture,a.mapping)}else return null}}return a}function n(a){const o=a.target;o.removeEventListener("dispose",n);const l=t.get(o);l!==void 0&&(t.delete(o),l.dispose())}function r(){t=new WeakMap}return{get:i,dispose:r}}class hh extends oh{constructor(t=-1,e=1,i=1,n=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=n,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,n,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=n,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,n=(this.top+this.bottom)/2;let r=i-t,a=i+t,o=n+e,l=n-e;if(this.view!==null&&this.view.enabled){const h=(this.right-this.left)/this.view.fullWidth/this.zoom,c=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=h*this.view.offsetX,a=r+h*this.view.width,o-=c*this.view.offsetY,l=o-c*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const qn=4,Nl=[.125,.215,.35,.446,.526,.582],gn=20,ma=new hh,kl=new Et;let ga=null,va=0,xa=0,ya=!1;const fn=(1+Math.sqrt(5))/2,zn=1/fn,Ol=[new C(-fn,zn,0),new C(fn,zn,0),new C(-zn,0,fn),new C(zn,0,fn),new C(0,fn,-zn),new C(0,fn,zn),new C(-1,1,-1),new C(1,1,-1),new C(-1,1,1),new C(1,1,1)];class Fl{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,i=.1,n=100){ga=this._renderer.getRenderTarget(),va=this._renderer.getActiveCubeFace(),xa=this._renderer.getActiveMipmapLevel(),ya=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,i,n,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Hl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Bl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(ga,va,xa),this._renderer.xr.enabled=ya,t.scissorTest=!1,rr(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Jn||t.mapping===Qn?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),ga=this._renderer.getRenderTarget(),va=this._renderer.getActiveCubeFace(),xa=this._renderer.getActiveMipmapLevel(),ya=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:fi,minFilter:fi,generateMipmaps:!1,type:Ns,format:ri,colorSpace:ss,depthBuffer:!1},n=zl(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=zl(t,e,i);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=nm(r)),this._blurMaterial=sm(r,t,e)}return n}_compileMaterial(t){const e=new Yt(this._lodPlanes[0],t);this._renderer.compile(e,ma)}_sceneToCubeUV(t,e,i,n){const o=new ei(90,1,e,i),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],c=this._renderer,u=c.autoClear,d=c.toneMapping;c.getClearColor(kl),c.toneMapping=Zi,c.autoClear=!1;const p=new Ts({name:"PMREM.Background",side:We,depthWrite:!1,depthTest:!1}),g=new Yt(new nn,p);let v=!1;const m=t.background;m?m.isColor&&(p.color.copy(m),t.background=null,v=!0):(p.color.copy(kl),v=!0);for(let f=0;f<6;f++){const y=f%3;y===0?(o.up.set(0,l[f],0),o.lookAt(h[f],0,0)):y===1?(o.up.set(0,0,l[f]),o.lookAt(0,h[f],0)):(o.up.set(0,l[f],0),o.lookAt(0,0,h[f]));const _=this._cubeSize;rr(n,y*_,f>2?_:0,_,_),c.setRenderTarget(n),v&&c.render(g,o),c.render(t,o)}g.geometry.dispose(),g.material.dispose(),c.toneMapping=d,c.autoClear=u,t.background=m}_textureToCubeUV(t,e){const i=this._renderer,n=t.mapping===Jn||t.mapping===Qn;n?(this._cubemapMaterial===null&&(this._cubemapMaterial=Hl()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Bl());const r=n?this._cubemapMaterial:this._equirectMaterial,a=new Yt(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=t;const l=this._cubeSize;rr(e,0,0,3*l,2*l),i.setRenderTarget(e),i.render(a,ma)}_applyPMREM(t){const e=this._renderer,i=e.autoClear;e.autoClear=!1;const n=this._lodPlanes.length;for(let r=1;r<n;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=Ol[(n-r-1)%Ol.length];this._blur(t,r-1,r,a,o)}e.autoClear=i}_blur(t,e,i,n,r){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,i,n,"latitudinal",r),this._halfBlur(a,t,i,i,n,"longitudinal",r)}_halfBlur(t,e,i,n,r,a,o){const l=this._renderer,h=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const c=3,u=new Yt(this._lodPlanes[n],h),d=h.uniforms,p=this._sizeLods[i]-1,g=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*gn-1),v=r/g,m=isFinite(r)?1+Math.floor(c*v):gn;m>gn&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${gn}`);const f=[];let y=0;for(let P=0;P<gn;++P){const E=P/v,S=Math.exp(-E*E/2);f.push(S),P===0?y+=S:P<m&&(y+=2*S)}for(let P=0;P<f.length;P++)f[P]=f[P]/y;d.envMap.value=t.texture,d.samples.value=m,d.weights.value=f,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:_}=this;d.dTheta.value=g,d.mipInt.value=_-i;const x=this._sizeLods[n],I=3*x*(n>_-qn?n-_+qn:0),A=4*(this._cubeSize-x);rr(e,I,A,3*x,2*x),l.setRenderTarget(e),l.render(u,ma)}}function nm(s){const t=[],e=[],i=[];let n=s;const r=s-qn+1+Nl.length;for(let a=0;a<r;a++){const o=Math.pow(2,n);e.push(o);let l=1/o;a>s-qn?l=Nl[a-s+qn-1]:a===0&&(l=0),i.push(l);const h=1/(o-2),c=-h,u=1+h,d=[c,c,u,c,u,u,c,c,u,u,c,u],p=6,g=6,v=3,m=2,f=1,y=new Float32Array(v*g*p),_=new Float32Array(m*g*p),x=new Float32Array(f*g*p);for(let A=0;A<p;A++){const P=A%3*2/3-1,E=A>2?0:-1,S=[P,E,0,P+2/3,E,0,P+2/3,E+1,0,P,E,0,P+2/3,E+1,0,P,E+1,0];y.set(S,v*g*A),_.set(d,m*g*A);const M=[A,A,A,A,A,A];x.set(M,f*g*A)}const I=new ce;I.setAttribute("position",new ye(y,v)),I.setAttribute("uv",new ye(_,m)),I.setAttribute("faceIndex",new ye(x,f)),t.push(I),n>qn&&n--}return{lodPlanes:t,sizeLods:e,sigmas:i}}function zl(s,t,e){const i=new Sn(s,t,e);return i.texture.mapping=Or,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function rr(s,t,e,i,n){s.viewport.set(t,e,i,n),s.scissor.set(t,e,i,n)}function sm(s,t,e){const i=new Float32Array(gn),n=new C(0,1,0);return new pi({name:"SphericalGaussianBlur",defines:{n:gn,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:n}},vertexShader:Wo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Ki,depthTest:!1,depthWrite:!1})}function Bl(){return new pi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Wo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Ki,depthTest:!1,depthWrite:!1})}function Hl(){return new pi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Wo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ki,depthTest:!1,depthWrite:!1})}function Wo(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function rm(s){let t=new WeakMap,e=null;function i(o){if(o&&o.isTexture){const l=o.mapping,h=l===ja||l===Ka,c=l===Jn||l===Qn;if(h||c){let u=t.get(o);const d=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==d)return e===null&&(e=new Fl(s)),u=h?e.fromEquirectangular(o,u):e.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),u.texture;if(u!==void 0)return u.texture;{const p=o.image;return h&&p&&p.height>0||c&&p&&n(p)?(e===null&&(e=new Fl(s)),u=h?e.fromEquirectangular(o):e.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),o.addEventListener("dispose",r),u.texture):null}}}return o}function n(o){let l=0;const h=6;for(let c=0;c<h;c++)o[c]!==void 0&&l++;return l===h}function r(o){const l=o.target;l.removeEventListener("dispose",r);const h=t.get(l);h!==void 0&&(t.delete(l),h.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:i,dispose:a}}function am(s){const t={};function e(i){if(t[i]!==void 0)return t[i];let n;switch(i){case"WEBGL_depth_texture":n=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":n=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":n=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":n=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:n=s.getExtension(i)}return t[i]=n,n}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){const n=e(i);return n===null&&Ms("THREE.WebGLRenderer: "+i+" extension not supported."),n}}}function om(s,t,e,i){const n={},r=new WeakMap;function a(u){const d=u.target;d.index!==null&&t.remove(d.index);for(const g in d.attributes)t.remove(d.attributes[g]);for(const g in d.morphAttributes){const v=d.morphAttributes[g];for(let m=0,f=v.length;m<f;m++)t.remove(v[m])}d.removeEventListener("dispose",a),delete n[d.id];const p=r.get(d);p&&(t.remove(p),r.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function o(u,d){return n[d.id]===!0||(d.addEventListener("dispose",a),n[d.id]=!0,e.memory.geometries++),d}function l(u){const d=u.attributes;for(const g in d)t.update(d[g],s.ARRAY_BUFFER);const p=u.morphAttributes;for(const g in p){const v=p[g];for(let m=0,f=v.length;m<f;m++)t.update(v[m],s.ARRAY_BUFFER)}}function h(u){const d=[],p=u.index,g=u.attributes.position;let v=0;if(p!==null){const y=p.array;v=p.version;for(let _=0,x=y.length;_<x;_+=3){const I=y[_+0],A=y[_+1],P=y[_+2];d.push(I,A,A,P,P,I)}}else if(g!==void 0){const y=g.array;v=g.version;for(let _=0,x=y.length/3-1;_<x;_+=3){const I=_+0,A=_+1,P=_+2;d.push(I,A,A,P,P,I)}}else return;const m=new(th(d)?rh:sh)(d,1);m.version=v;const f=r.get(u);f&&t.remove(f),r.set(u,m)}function c(u){const d=r.get(u);if(d){const p=u.index;p!==null&&d.version<p.version&&h(u)}else h(u);return r.get(u)}return{get:o,update:l,getWireframeAttribute:c}}function lm(s,t,e){let i;function n(d){i=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function l(d,p){s.drawElements(i,p,r,d*a),e.update(p,i,1)}function h(d,p,g){g!==0&&(s.drawElementsInstanced(i,p,r,d*a,g),e.update(p,i,g))}function c(d,p,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,p,0,r,d,0,g);let m=0;for(let f=0;f<g;f++)m+=p[f];e.update(m,i,1)}function u(d,p,g,v){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let f=0;f<d.length;f++)h(d[f]/a,p[f],v[f]);else{m.multiDrawElementsInstancedWEBGL(i,p,0,r,d,0,v,0,g);let f=0;for(let y=0;y<g;y++)f+=p[y]*v[y];e.update(f,i,1)}}this.setMode=n,this.setIndex=o,this.render=l,this.renderInstances=h,this.renderMultiDraw=c,this.renderMultiDrawInstances=u}function cm(s){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(e.calls++,a){case s.TRIANGLES:e.triangles+=o*(r/3);break;case s.LINES:e.lines+=o*(r/2);break;case s.LINE_STRIP:e.lines+=o*(r-1);break;case s.LINE_LOOP:e.lines+=o*r;break;case s.POINTS:e.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function n(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:n,update:i}}function hm(s,t,e){const i=new WeakMap,n=new be;function r(a,o,l){const h=a.morphTargetInfluences,c=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=c!==void 0?c.length:0;let d=i.get(o);if(d===void 0||d.count!==u){let M=function(){E.dispose(),i.delete(o),o.removeEventListener("dispose",M)};var p=M;d!==void 0&&d.texture.dispose();const g=o.morphAttributes.position!==void 0,v=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,f=o.morphAttributes.position||[],y=o.morphAttributes.normal||[],_=o.morphAttributes.color||[];let x=0;g===!0&&(x=1),v===!0&&(x=2),m===!0&&(x=3);let I=o.attributes.position.count*x,A=1;I>t.maxTextureSize&&(A=Math.ceil(I/t.maxTextureSize),I=t.maxTextureSize);const P=new Float32Array(I*A*4*u),E=new ih(P,I,A,u);E.type=_i,E.needsUpdate=!0;const S=x*4;for(let R=0;R<u;R++){const V=f[R],O=y[R],N=_[R],D=I*A*4*R;for(let U=0;U<V.count;U++){const L=U*S;g===!0&&(n.fromBufferAttribute(V,U),P[D+L+0]=n.x,P[D+L+1]=n.y,P[D+L+2]=n.z,P[D+L+3]=0),v===!0&&(n.fromBufferAttribute(O,U),P[D+L+4]=n.x,P[D+L+5]=n.y,P[D+L+6]=n.z,P[D+L+7]=0),m===!0&&(n.fromBufferAttribute(N,U),P[D+L+8]=n.x,P[D+L+9]=n.y,P[D+L+10]=n.z,P[D+L+11]=N.itemSize===4?n.w:1)}}d={count:u,texture:E,size:new xt(I,A)},i.set(o,d),o.addEventListener("dispose",M)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",a.morphTexture,e);else{let g=0;for(let m=0;m<h.length;m++)g+=h[m];const v=o.morphTargetsRelative?1:1-g;l.getUniforms().setValue(s,"morphTargetBaseInfluence",v),l.getUniforms().setValue(s,"morphTargetInfluences",h)}l.getUniforms().setValue(s,"morphTargetsTexture",d.texture,e),l.getUniforms().setValue(s,"morphTargetsTextureSize",d.size)}return{update:r}}function dm(s,t,e,i){let n=new WeakMap;function r(l){const h=i.render.frame,c=l.geometry,u=t.get(l,c);if(n.get(u)!==h&&(t.update(u),n.set(u,h)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),n.get(l)!==h&&(e.update(l.instanceMatrix,s.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,s.ARRAY_BUFFER),n.set(l,h))),l.isSkinnedMesh){const d=l.skeleton;n.get(d)!==h&&(d.update(),n.set(d,h))}return u}function a(){n=new WeakMap}function o(l){const h=l.target;h.removeEventListener("dispose",o),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:r,dispose:a}}class dh extends ze{constructor(t,e,i,n,r,a,o,l,h,c=jn){if(c!==jn&&c!==es)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&c===jn&&(i=bn),i===void 0&&c===es&&(i=ts),super(null,n,r,a,o,l,c,i,h),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=o!==void 0?o:Ke,this.minFilter=l!==void 0?l:Ke,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const uh=new ze,Vl=new dh(1,1),fh=new ih,ph=new Kd,mh=new lh,Gl=[],Wl=[],$l=new Float32Array(16),Xl=new Float32Array(9),ql=new Float32Array(4);function os(s,t,e){const i=s[0];if(i<=0||i>0)return s;const n=t*e;let r=Gl[n];if(r===void 0&&(r=new Float32Array(n),Gl[n]=r),t!==0){i.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,s[a].toArray(r,o)}return r}function Re(s,t){if(s.length!==t.length)return!1;for(let e=0,i=s.length;e<i;e++)if(s[e]!==t[e])return!1;return!0}function Ce(s,t){for(let e=0,i=t.length;e<i;e++)s[e]=t[e]}function Hr(s,t){let e=Wl[t];e===void 0&&(e=new Int32Array(t),Wl[t]=e);for(let i=0;i!==t;++i)e[i]=s.allocateTextureUnit();return e}function um(s,t){const e=this.cache;e[0]!==t&&(s.uniform1f(this.addr,t),e[0]=t)}function fm(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Re(e,t))return;s.uniform2fv(this.addr,t),Ce(e,t)}}function pm(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(s.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Re(e,t))return;s.uniform3fv(this.addr,t),Ce(e,t)}}function mm(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Re(e,t))return;s.uniform4fv(this.addr,t),Ce(e,t)}}function gm(s,t){const e=this.cache,i=t.elements;if(i===void 0){if(Re(e,t))return;s.uniformMatrix2fv(this.addr,!1,t),Ce(e,t)}else{if(Re(e,i))return;ql.set(i),s.uniformMatrix2fv(this.addr,!1,ql),Ce(e,i)}}function vm(s,t){const e=this.cache,i=t.elements;if(i===void 0){if(Re(e,t))return;s.uniformMatrix3fv(this.addr,!1,t),Ce(e,t)}else{if(Re(e,i))return;Xl.set(i),s.uniformMatrix3fv(this.addr,!1,Xl),Ce(e,i)}}function xm(s,t){const e=this.cache,i=t.elements;if(i===void 0){if(Re(e,t))return;s.uniformMatrix4fv(this.addr,!1,t),Ce(e,t)}else{if(Re(e,i))return;$l.set(i),s.uniformMatrix4fv(this.addr,!1,$l),Ce(e,i)}}function ym(s,t){const e=this.cache;e[0]!==t&&(s.uniform1i(this.addr,t),e[0]=t)}function _m(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Re(e,t))return;s.uniform2iv(this.addr,t),Ce(e,t)}}function Mm(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Re(e,t))return;s.uniform3iv(this.addr,t),Ce(e,t)}}function bm(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Re(e,t))return;s.uniform4iv(this.addr,t),Ce(e,t)}}function Sm(s,t){const e=this.cache;e[0]!==t&&(s.uniform1ui(this.addr,t),e[0]=t)}function wm(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Re(e,t))return;s.uniform2uiv(this.addr,t),Ce(e,t)}}function Em(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Re(e,t))return;s.uniform3uiv(this.addr,t),Ce(e,t)}}function Tm(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Re(e,t))return;s.uniform4uiv(this.addr,t),Ce(e,t)}}function Am(s,t,e){const i=this.cache,n=e.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n);let r;this.type===s.SAMPLER_2D_SHADOW?(Vl.compareFunction=Qc,r=Vl):r=uh,e.setTexture2D(t||r,n)}function Rm(s,t,e){const i=this.cache,n=e.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n),e.setTexture3D(t||ph,n)}function Cm(s,t,e){const i=this.cache,n=e.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n),e.setTextureCube(t||mh,n)}function Pm(s,t,e){const i=this.cache,n=e.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n),e.setTexture2DArray(t||fh,n)}function Im(s){switch(s){case 5126:return um;case 35664:return fm;case 35665:return pm;case 35666:return mm;case 35674:return gm;case 35675:return vm;case 35676:return xm;case 5124:case 35670:return ym;case 35667:case 35671:return _m;case 35668:case 35672:return Mm;case 35669:case 35673:return bm;case 5125:return Sm;case 36294:return wm;case 36295:return Em;case 36296:return Tm;case 35678:case 36198:case 36298:case 36306:case 35682:return Am;case 35679:case 36299:case 36307:return Rm;case 35680:case 36300:case 36308:case 36293:return Cm;case 36289:case 36303:case 36311:case 36292:return Pm}}function Dm(s,t){s.uniform1fv(this.addr,t)}function Lm(s,t){const e=os(t,this.size,2);s.uniform2fv(this.addr,e)}function Um(s,t){const e=os(t,this.size,3);s.uniform3fv(this.addr,e)}function Nm(s,t){const e=os(t,this.size,4);s.uniform4fv(this.addr,e)}function km(s,t){const e=os(t,this.size,4);s.uniformMatrix2fv(this.addr,!1,e)}function Om(s,t){const e=os(t,this.size,9);s.uniformMatrix3fv(this.addr,!1,e)}function Fm(s,t){const e=os(t,this.size,16);s.uniformMatrix4fv(this.addr,!1,e)}function zm(s,t){s.uniform1iv(this.addr,t)}function Bm(s,t){s.uniform2iv(this.addr,t)}function Hm(s,t){s.uniform3iv(this.addr,t)}function Vm(s,t){s.uniform4iv(this.addr,t)}function Gm(s,t){s.uniform1uiv(this.addr,t)}function Wm(s,t){s.uniform2uiv(this.addr,t)}function $m(s,t){s.uniform3uiv(this.addr,t)}function Xm(s,t){s.uniform4uiv(this.addr,t)}function qm(s,t,e){const i=this.cache,n=t.length,r=Hr(e,n);Re(i,r)||(s.uniform1iv(this.addr,r),Ce(i,r));for(let a=0;a!==n;++a)e.setTexture2D(t[a]||uh,r[a])}function Ym(s,t,e){const i=this.cache,n=t.length,r=Hr(e,n);Re(i,r)||(s.uniform1iv(this.addr,r),Ce(i,r));for(let a=0;a!==n;++a)e.setTexture3D(t[a]||ph,r[a])}function jm(s,t,e){const i=this.cache,n=t.length,r=Hr(e,n);Re(i,r)||(s.uniform1iv(this.addr,r),Ce(i,r));for(let a=0;a!==n;++a)e.setTextureCube(t[a]||mh,r[a])}function Km(s,t,e){const i=this.cache,n=t.length,r=Hr(e,n);Re(i,r)||(s.uniform1iv(this.addr,r),Ce(i,r));for(let a=0;a!==n;++a)e.setTexture2DArray(t[a]||fh,r[a])}function Zm(s){switch(s){case 5126:return Dm;case 35664:return Lm;case 35665:return Um;case 35666:return Nm;case 35674:return km;case 35675:return Om;case 35676:return Fm;case 5124:case 35670:return zm;case 35667:case 35671:return Bm;case 35668:case 35672:return Hm;case 35669:case 35673:return Vm;case 5125:return Gm;case 36294:return Wm;case 36295:return $m;case 36296:return Xm;case 35678:case 36198:case 36298:case 36306:case 35682:return qm;case 35679:case 36299:case 36307:return Ym;case 35680:case 36300:case 36308:case 36293:return jm;case 36289:case 36303:case 36311:case 36292:return Km}}class Jm{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=Im(e.type)}}class Qm{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Zm(e.type)}}class tg{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){const n=this.seq;for(let r=0,a=n.length;r!==a;++r){const o=n[r];o.setValue(t,e[o.id],i)}}}const _a=/(\w+)(\])?(\[|\.)?/g;function Yl(s,t){s.seq.push(t),s.map[t.id]=t}function eg(s,t,e){const i=s.name,n=i.length;for(_a.lastIndex=0;;){const r=_a.exec(i),a=_a.lastIndex;let o=r[1];const l=r[2]==="]",h=r[3];if(l&&(o=o|0),h===void 0||h==="["&&a+2===n){Yl(e,h===void 0?new Jm(o,s,t):new Qm(o,s,t));break}else{let u=e.map[o];u===void 0&&(u=new tg(o),Yl(e,u)),e=u}}}class Tr{constructor(t,e){this.seq=[],this.map={};const i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let n=0;n<i;++n){const r=t.getActiveUniform(e,n),a=t.getUniformLocation(e,r.name);eg(r,a,this)}}setValue(t,e,i,n){const r=this.map[e];r!==void 0&&r.setValue(t,i,n)}setOptional(t,e,i){const n=e[i];n!==void 0&&this.setValue(t,i,n)}static upload(t,e,i,n){for(let r=0,a=e.length;r!==a;++r){const o=e[r],l=i[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,n)}}static seqWithValue(t,e){const i=[];for(let n=0,r=t.length;n!==r;++n){const a=t[n];a.id in e&&i.push(a)}return i}}function jl(s,t,e){const i=s.createShader(t);return s.shaderSource(i,e),s.compileShader(i),i}const ig=37297;let ng=0;function sg(s,t){const e=s.split(`
`),i=[],n=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=n;a<r;a++){const o=a+1;i.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return i.join(`
`)}const Kl=new Vt;function rg(s){ee._getMatrix(Kl,ee.workingColorSpace,s);const t=`mat3( ${Kl.elements.map(e=>e.toFixed(4))} )`;switch(ee.getTransfer(s)){case Fr:return[t,"LinearTransferOETF"];case he:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",s),[t,"LinearTransferOETF"]}}function Zl(s,t,e){const i=s.getShaderParameter(t,s.COMPILE_STATUS),n=s.getShaderInfoLog(t).trim();if(i&&n==="")return"";const r=/ERROR: 0:(\d+)/.exec(n);if(r){const a=parseInt(r[1]);return e.toUpperCase()+`

`+n+`

`+sg(s.getShaderSource(t),a)}else return n}function ag(s,t){const e=rg(t);return[`vec4 ${s}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function og(s,t){let e;switch(t){case cd:e="Linear";break;case hd:e="Reinhard";break;case dd:e="Cineon";break;case Hc:e="ACESFilmic";break;case fd:e="AgX";break;case pd:e="Neutral";break;case ud:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+s+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const ar=new C;function lg(){ee.getLuminanceCoefficients(ar);const s=ar.x.toFixed(4),t=ar.y.toFixed(4),e=ar.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function cg(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(bs).join(`
`)}function hg(s){const t=[];for(const e in s){const i=s[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function dg(s,t){const e={},i=s.getProgramParameter(t,s.ACTIVE_ATTRIBUTES);for(let n=0;n<i;n++){const r=s.getActiveAttrib(t,n),a=r.name;let o=1;r.type===s.FLOAT_MAT2&&(o=2),r.type===s.FLOAT_MAT3&&(o=3),r.type===s.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:s.getAttribLocation(t,a),locationSize:o}}return e}function bs(s){return s!==""}function Jl(s,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Ql(s,t){return s.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const ug=/^[ \t]*#include +<([\w\d./]+)>/gm;function To(s){return s.replace(ug,pg)}const fg=new Map;function pg(s,t){let e=$t[t];if(e===void 0){const i=fg.get(t);if(i!==void 0)e=$t[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return To(e)}const mg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function tc(s){return s.replace(mg,gg)}function gg(s,t,e,i){let n="";for(let r=parseInt(t);r<parseInt(e);r++)n+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return n}function ec(s){let t=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?t+=`
#define HIGH_PRECISION`:s.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function vg(s){let t="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===Fc?t="SHADOWMAP_TYPE_PCF":s.shadowMapType===zc?t="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===Pi&&(t="SHADOWMAP_TYPE_VSM"),t}function xg(s){let t="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case Jn:case Qn:t="ENVMAP_TYPE_CUBE";break;case Or:t="ENVMAP_TYPE_CUBE_UV";break}return t}function yg(s){let t="ENVMAP_MODE_REFLECTION";return s.envMap&&s.envMapMode===Qn&&(t="ENVMAP_MODE_REFRACTION"),t}function _g(s){let t="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case Bc:t="ENVMAP_BLENDING_MULTIPLY";break;case od:t="ENVMAP_BLENDING_MIX";break;case ld:t="ENVMAP_BLENDING_ADD";break}return t}function Mg(s){const t=s.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:i,maxMip:e}}function bg(s,t,e,i){const n=s.getContext(),r=e.defines;let a=e.vertexShader,o=e.fragmentShader;const l=vg(e),h=xg(e),c=yg(e),u=_g(e),d=Mg(e),p=cg(e),g=hg(r),v=n.createProgram();let m,f,y=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(bs).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(bs).join(`
`),f.length>0&&(f+=`
`)):(m=[ec(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(bs).join(`
`),f=[ec(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.envMap?"#define "+c:"",e.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Zi?"#define TONE_MAPPING":"",e.toneMapping!==Zi?$t.tonemapping_pars_fragment:"",e.toneMapping!==Zi?og("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",$t.colorspace_pars_fragment,ag("linearToOutputTexel",e.outputColorSpace),lg(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(bs).join(`
`)),a=To(a),a=Jl(a,e),a=Ql(a,e),o=To(o),o=Jl(o,e),o=Ql(o,e),a=tc(a),o=tc(o),e.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",e.glslVersion===fl?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===fl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const _=y+m+a,x=y+f+o,I=jl(n,n.VERTEX_SHADER,_),A=jl(n,n.FRAGMENT_SHADER,x);n.attachShader(v,I),n.attachShader(v,A),e.index0AttributeName!==void 0?n.bindAttribLocation(v,0,e.index0AttributeName):e.morphTargets===!0&&n.bindAttribLocation(v,0,"position"),n.linkProgram(v);function P(R){if(s.debug.checkShaderErrors){const V=n.getProgramInfoLog(v).trim(),O=n.getShaderInfoLog(I).trim(),N=n.getShaderInfoLog(A).trim();let D=!0,U=!0;if(n.getProgramParameter(v,n.LINK_STATUS)===!1)if(D=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(n,v,I,A);else{const L=Zl(n,I,"vertex"),B=Zl(n,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+n.getError()+" - VALIDATE_STATUS "+n.getProgramParameter(v,n.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+V+`
`+L+`
`+B)}else V!==""?console.warn("THREE.WebGLProgram: Program Info Log:",V):(O===""||N==="")&&(U=!1);U&&(R.diagnostics={runnable:D,programLog:V,vertexShader:{log:O,prefix:m},fragmentShader:{log:N,prefix:f}})}n.deleteShader(I),n.deleteShader(A),E=new Tr(n,v),S=dg(n,v)}let E;this.getUniforms=function(){return E===void 0&&P(this),E};let S;this.getAttributes=function(){return S===void 0&&P(this),S};let M=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=n.getProgramParameter(v,ig)),M},this.destroy=function(){i.releaseStatesOfProgram(this),n.deleteProgram(v),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=ng++,this.cacheKey=t,this.usedTimes=1,this.program=v,this.vertexShader=I,this.fragmentShader=A,this}let Sg=0;class wg{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,i=t.fragmentShader,n=this._getShaderStage(e),r=this._getShaderStage(i),a=this._getShaderCacheForMaterial(t);return a.has(n)===!1&&(a.add(n),n.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){const e=this.shaderCache;let i=e.get(t);return i===void 0&&(i=new Eg(t),e.set(t,i)),i}}class Eg{constructor(t){this.id=Sg++,this.code=t,this.usedTimes=0}}function Tg(s,t,e,i,n,r,a){const o=new Go,l=new wg,h=new Set,c=[],u=n.logarithmicDepthBuffer,d=n.vertexTextures;let p=n.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(S){return h.add(S),S===0?"uv":`uv${S}`}function m(S,M,R,V,O){const N=V.fog,D=O.geometry,U=S.isMeshStandardMaterial?V.environment:null,L=(S.isMeshStandardMaterial?e:t).get(S.envMap||U),B=L&&L.mapping===Or?L.image.height:null,q=g[S.type];S.precision!==null&&(p=n.getMaxPrecision(S.precision),p!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",p,"instead."));const Q=D.morphAttributes.position||D.morphAttributes.normal||D.morphAttributes.color,et=Q!==void 0?Q.length:0;let pt=0;D.morphAttributes.position!==void 0&&(pt=1),D.morphAttributes.normal!==void 0&&(pt=2),D.morphAttributes.color!==void 0&&(pt=3);let qt,Y,tt,rt;if(q){const oe=yi[q];qt=oe.vertexShader,Y=oe.fragmentShader}else qt=S.vertexShader,Y=S.fragmentShader,l.update(S),tt=l.getVertexShaderID(S),rt=l.getFragmentShaderID(S);const st=s.getRenderTarget(),Tt=s.state.buffers.depth.getReversed(),Dt=O.isInstancedMesh===!0,zt=O.isBatchedMesh===!0,xe=!!S.map,Qt=!!S.matcap,Se=!!L,H=!!S.aoMap,Ze=!!S.lightMap,jt=!!S.bumpMap,Kt=!!S.normalMap,Ct=!!S.displacementMap,pe=!!S.emissiveMap,At=!!S.metalnessMap,T=!!S.roughnessMap,b=S.anisotropy>0,G=S.clearcoat>0,K=S.dispersion>0,J=S.iridescence>0,j=S.sheen>0,bt=S.transmission>0,ht=b&&!!S.anisotropyMap,mt=G&&!!S.clearcoatMap,te=G&&!!S.clearcoatNormalMap,it=G&&!!S.clearcoatRoughnessMap,gt=J&&!!S.iridescenceMap,It=J&&!!S.iridescenceThicknessMap,Ut=j&&!!S.sheenColorMap,vt=j&&!!S.sheenRoughnessMap,Zt=!!S.specularMap,Gt=!!S.specularColorMap,ue=!!S.specularIntensityMap,k=bt&&!!S.transmissionMap,ct=bt&&!!S.thicknessMap,X=!!S.gradientMap,Z=!!S.alphaMap,ft=S.alphaTest>0,dt=!!S.alphaHash,Bt=!!S.extensions;let _e=Zi;S.toneMapped&&(st===null||st.isXRRenderTarget===!0)&&(_e=s.toneMapping);const ke={shaderID:q,shaderType:S.type,shaderName:S.name,vertexShader:qt,fragmentShader:Y,defines:S.defines,customVertexShaderID:tt,customFragmentShaderID:rt,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:p,batching:zt,batchingColor:zt&&O._colorsTexture!==null,instancing:Dt,instancingColor:Dt&&O.instanceColor!==null,instancingMorph:Dt&&O.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:st===null?s.outputColorSpace:st.isXRRenderTarget===!0?st.texture.colorSpace:ss,alphaToCoverage:!!S.alphaToCoverage,map:xe,matcap:Qt,envMap:Se,envMapMode:Se&&L.mapping,envMapCubeUVHeight:B,aoMap:H,lightMap:Ze,bumpMap:jt,normalMap:Kt,displacementMap:d&&Ct,emissiveMap:pe,normalMapObjectSpace:Kt&&S.normalMapType===xd,normalMapTangentSpace:Kt&&S.normalMapType===Jc,metalnessMap:At,roughnessMap:T,anisotropy:b,anisotropyMap:ht,clearcoat:G,clearcoatMap:mt,clearcoatNormalMap:te,clearcoatRoughnessMap:it,dispersion:K,iridescence:J,iridescenceMap:gt,iridescenceThicknessMap:It,sheen:j,sheenColorMap:Ut,sheenRoughnessMap:vt,specularMap:Zt,specularColorMap:Gt,specularIntensityMap:ue,transmission:bt,transmissionMap:k,thicknessMap:ct,gradientMap:X,opaque:S.transparent===!1&&S.blending===Yn&&S.alphaToCoverage===!1,alphaMap:Z,alphaTest:ft,alphaHash:dt,combine:S.combine,mapUv:xe&&v(S.map.channel),aoMapUv:H&&v(S.aoMap.channel),lightMapUv:Ze&&v(S.lightMap.channel),bumpMapUv:jt&&v(S.bumpMap.channel),normalMapUv:Kt&&v(S.normalMap.channel),displacementMapUv:Ct&&v(S.displacementMap.channel),emissiveMapUv:pe&&v(S.emissiveMap.channel),metalnessMapUv:At&&v(S.metalnessMap.channel),roughnessMapUv:T&&v(S.roughnessMap.channel),anisotropyMapUv:ht&&v(S.anisotropyMap.channel),clearcoatMapUv:mt&&v(S.clearcoatMap.channel),clearcoatNormalMapUv:te&&v(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:it&&v(S.clearcoatRoughnessMap.channel),iridescenceMapUv:gt&&v(S.iridescenceMap.channel),iridescenceThicknessMapUv:It&&v(S.iridescenceThicknessMap.channel),sheenColorMapUv:Ut&&v(S.sheenColorMap.channel),sheenRoughnessMapUv:vt&&v(S.sheenRoughnessMap.channel),specularMapUv:Zt&&v(S.specularMap.channel),specularColorMapUv:Gt&&v(S.specularColorMap.channel),specularIntensityMapUv:ue&&v(S.specularIntensityMap.channel),transmissionMapUv:k&&v(S.transmissionMap.channel),thicknessMapUv:ct&&v(S.thicknessMap.channel),alphaMapUv:Z&&v(S.alphaMap.channel),vertexTangents:!!D.attributes.tangent&&(Kt||b),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!D.attributes.color&&D.attributes.color.itemSize===4,pointsUvs:O.isPoints===!0&&!!D.attributes.uv&&(xe||Z),fog:!!N,useFog:S.fog===!0,fogExp2:!!N&&N.isFogExp2,flatShading:S.flatShading===!0,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:Tt,skinning:O.isSkinnedMesh===!0,morphTargets:D.morphAttributes.position!==void 0,morphNormals:D.morphAttributes.normal!==void 0,morphColors:D.morphAttributes.color!==void 0,morphTargetsCount:et,morphTextureStride:pt,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:S.dithering,shadowMapEnabled:s.shadowMap.enabled&&R.length>0,shadowMapType:s.shadowMap.type,toneMapping:_e,decodeVideoTexture:xe&&S.map.isVideoTexture===!0&&ee.getTransfer(S.map.colorSpace)===he,decodeVideoTextureEmissive:pe&&S.emissiveMap.isVideoTexture===!0&&ee.getTransfer(S.emissiveMap.colorSpace)===he,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===Ne,flipSided:S.side===We,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:Bt&&S.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Bt&&S.extensions.multiDraw===!0||zt)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return ke.vertexUv1s=h.has(1),ke.vertexUv2s=h.has(2),ke.vertexUv3s=h.has(3),h.clear(),ke}function f(S){const M=[];if(S.shaderID?M.push(S.shaderID):(M.push(S.customVertexShaderID),M.push(S.customFragmentShaderID)),S.defines!==void 0)for(const R in S.defines)M.push(R),M.push(S.defines[R]);return S.isRawShaderMaterial===!1&&(y(M,S),_(M,S),M.push(s.outputColorSpace)),M.push(S.customProgramCacheKey),M.join()}function y(S,M){S.push(M.precision),S.push(M.outputColorSpace),S.push(M.envMapMode),S.push(M.envMapCubeUVHeight),S.push(M.mapUv),S.push(M.alphaMapUv),S.push(M.lightMapUv),S.push(M.aoMapUv),S.push(M.bumpMapUv),S.push(M.normalMapUv),S.push(M.displacementMapUv),S.push(M.emissiveMapUv),S.push(M.metalnessMapUv),S.push(M.roughnessMapUv),S.push(M.anisotropyMapUv),S.push(M.clearcoatMapUv),S.push(M.clearcoatNormalMapUv),S.push(M.clearcoatRoughnessMapUv),S.push(M.iridescenceMapUv),S.push(M.iridescenceThicknessMapUv),S.push(M.sheenColorMapUv),S.push(M.sheenRoughnessMapUv),S.push(M.specularMapUv),S.push(M.specularColorMapUv),S.push(M.specularIntensityMapUv),S.push(M.transmissionMapUv),S.push(M.thicknessMapUv),S.push(M.combine),S.push(M.fogExp2),S.push(M.sizeAttenuation),S.push(M.morphTargetsCount),S.push(M.morphAttributeCount),S.push(M.numDirLights),S.push(M.numPointLights),S.push(M.numSpotLights),S.push(M.numSpotLightMaps),S.push(M.numHemiLights),S.push(M.numRectAreaLights),S.push(M.numDirLightShadows),S.push(M.numPointLightShadows),S.push(M.numSpotLightShadows),S.push(M.numSpotLightShadowsWithMaps),S.push(M.numLightProbes),S.push(M.shadowMapType),S.push(M.toneMapping),S.push(M.numClippingPlanes),S.push(M.numClipIntersection),S.push(M.depthPacking)}function _(S,M){o.disableAll(),M.supportsVertexTextures&&o.enable(0),M.instancing&&o.enable(1),M.instancingColor&&o.enable(2),M.instancingMorph&&o.enable(3),M.matcap&&o.enable(4),M.envMap&&o.enable(5),M.normalMapObjectSpace&&o.enable(6),M.normalMapTangentSpace&&o.enable(7),M.clearcoat&&o.enable(8),M.iridescence&&o.enable(9),M.alphaTest&&o.enable(10),M.vertexColors&&o.enable(11),M.vertexAlphas&&o.enable(12),M.vertexUv1s&&o.enable(13),M.vertexUv2s&&o.enable(14),M.vertexUv3s&&o.enable(15),M.vertexTangents&&o.enable(16),M.anisotropy&&o.enable(17),M.alphaHash&&o.enable(18),M.batching&&o.enable(19),M.dispersion&&o.enable(20),M.batchingColor&&o.enable(21),S.push(o.mask),o.disableAll(),M.fog&&o.enable(0),M.useFog&&o.enable(1),M.flatShading&&o.enable(2),M.logarithmicDepthBuffer&&o.enable(3),M.reverseDepthBuffer&&o.enable(4),M.skinning&&o.enable(5),M.morphTargets&&o.enable(6),M.morphNormals&&o.enable(7),M.morphColors&&o.enable(8),M.premultipliedAlpha&&o.enable(9),M.shadowMapEnabled&&o.enable(10),M.doubleSided&&o.enable(11),M.flipSided&&o.enable(12),M.useDepthPacking&&o.enable(13),M.dithering&&o.enable(14),M.transmission&&o.enable(15),M.sheen&&o.enable(16),M.opaque&&o.enable(17),M.pointsUvs&&o.enable(18),M.decodeVideoTexture&&o.enable(19),M.decodeVideoTextureEmissive&&o.enable(20),M.alphaToCoverage&&o.enable(21),S.push(o.mask)}function x(S){const M=g[S.type];let R;if(M){const V=yi[M];R=lu.clone(V.uniforms)}else R=S.uniforms;return R}function I(S,M){let R;for(let V=0,O=c.length;V<O;V++){const N=c[V];if(N.cacheKey===M){R=N,++R.usedTimes;break}}return R===void 0&&(R=new bg(s,M,S,r),c.push(R)),R}function A(S){if(--S.usedTimes===0){const M=c.indexOf(S);c[M]=c[c.length-1],c.pop(),S.destroy()}}function P(S){l.remove(S)}function E(){l.dispose()}return{getParameters:m,getProgramCacheKey:f,getUniforms:x,acquireProgram:I,releaseProgram:A,releaseShaderCache:P,programs:c,dispose:E}}function Ag(){let s=new WeakMap;function t(a){return s.has(a)}function e(a){let o=s.get(a);return o===void 0&&(o={},s.set(a,o)),o}function i(a){s.delete(a)}function n(a,o,l){s.get(a)[o]=l}function r(){s=new WeakMap}return{has:t,get:e,remove:i,update:n,dispose:r}}function Rg(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.material.id!==t.material.id?s.material.id-t.material.id:s.z!==t.z?s.z-t.z:s.id-t.id}function ic(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.z!==t.z?t.z-s.z:s.id-t.id}function nc(){const s=[];let t=0;const e=[],i=[],n=[];function r(){t=0,e.length=0,i.length=0,n.length=0}function a(u,d,p,g,v,m){let f=s[t];return f===void 0?(f={id:u.id,object:u,geometry:d,material:p,groupOrder:g,renderOrder:u.renderOrder,z:v,group:m},s[t]=f):(f.id=u.id,f.object=u,f.geometry=d,f.material=p,f.groupOrder=g,f.renderOrder=u.renderOrder,f.z=v,f.group=m),t++,f}function o(u,d,p,g,v,m){const f=a(u,d,p,g,v,m);p.transmission>0?i.push(f):p.transparent===!0?n.push(f):e.push(f)}function l(u,d,p,g,v,m){const f=a(u,d,p,g,v,m);p.transmission>0?i.unshift(f):p.transparent===!0?n.unshift(f):e.unshift(f)}function h(u,d){e.length>1&&e.sort(u||Rg),i.length>1&&i.sort(d||ic),n.length>1&&n.sort(d||ic)}function c(){for(let u=t,d=s.length;u<d;u++){const p=s[u];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:i,transparent:n,init:r,push:o,unshift:l,finish:c,sort:h}}function Cg(){let s=new WeakMap;function t(i,n){const r=s.get(i);let a;return r===void 0?(a=new nc,s.set(i,[a])):n>=r.length?(a=new nc,r.push(a)):a=r[n],a}function e(){s=new WeakMap}return{get:t,dispose:e}}function Pg(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new C,color:new Et};break;case"SpotLight":e={position:new C,direction:new C,color:new Et,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new C,color:new Et,distance:0,decay:0};break;case"HemisphereLight":e={direction:new C,skyColor:new Et,groundColor:new Et};break;case"RectAreaLight":e={color:new Et,position:new C,halfWidth:new C,halfHeight:new C};break}return s[t.id]=e,e}}}function Ig(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new xt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new xt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new xt,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[t.id]=e,e}}}let Dg=0;function Lg(s,t){return(t.castShadow?2:0)-(s.castShadow?2:0)+(t.map?1:0)-(s.map?1:0)}function Ug(s){const t=new Pg,e=Ig(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)i.probe.push(new C);const n=new C,r=new ne,a=new ne;function o(h){let c=0,u=0,d=0;for(let S=0;S<9;S++)i.probe[S].set(0,0,0);let p=0,g=0,v=0,m=0,f=0,y=0,_=0,x=0,I=0,A=0,P=0;h.sort(Lg);for(let S=0,M=h.length;S<M;S++){const R=h[S],V=R.color,O=R.intensity,N=R.distance,D=R.shadow&&R.shadow.map?R.shadow.map.texture:null;if(R.isAmbientLight)c+=V.r*O,u+=V.g*O,d+=V.b*O;else if(R.isLightProbe){for(let U=0;U<9;U++)i.probe[U].addScaledVector(R.sh.coefficients[U],O);P++}else if(R.isDirectionalLight){const U=t.get(R);if(U.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){const L=R.shadow,B=e.get(R);B.shadowIntensity=L.intensity,B.shadowBias=L.bias,B.shadowNormalBias=L.normalBias,B.shadowRadius=L.radius,B.shadowMapSize=L.mapSize,i.directionalShadow[p]=B,i.directionalShadowMap[p]=D,i.directionalShadowMatrix[p]=R.shadow.matrix,y++}i.directional[p]=U,p++}else if(R.isSpotLight){const U=t.get(R);U.position.setFromMatrixPosition(R.matrixWorld),U.color.copy(V).multiplyScalar(O),U.distance=N,U.coneCos=Math.cos(R.angle),U.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),U.decay=R.decay,i.spot[v]=U;const L=R.shadow;if(R.map&&(i.spotLightMap[I]=R.map,I++,L.updateMatrices(R),R.castShadow&&A++),i.spotLightMatrix[v]=L.matrix,R.castShadow){const B=e.get(R);B.shadowIntensity=L.intensity,B.shadowBias=L.bias,B.shadowNormalBias=L.normalBias,B.shadowRadius=L.radius,B.shadowMapSize=L.mapSize,i.spotShadow[v]=B,i.spotShadowMap[v]=D,x++}v++}else if(R.isRectAreaLight){const U=t.get(R);U.color.copy(V).multiplyScalar(O),U.halfWidth.set(R.width*.5,0,0),U.halfHeight.set(0,R.height*.5,0),i.rectArea[m]=U,m++}else if(R.isPointLight){const U=t.get(R);if(U.color.copy(R.color).multiplyScalar(R.intensity),U.distance=R.distance,U.decay=R.decay,R.castShadow){const L=R.shadow,B=e.get(R);B.shadowIntensity=L.intensity,B.shadowBias=L.bias,B.shadowNormalBias=L.normalBias,B.shadowRadius=L.radius,B.shadowMapSize=L.mapSize,B.shadowCameraNear=L.camera.near,B.shadowCameraFar=L.camera.far,i.pointShadow[g]=B,i.pointShadowMap[g]=D,i.pointShadowMatrix[g]=R.shadow.matrix,_++}i.point[g]=U,g++}else if(R.isHemisphereLight){const U=t.get(R);U.skyColor.copy(R.color).multiplyScalar(O),U.groundColor.copy(R.groundColor).multiplyScalar(O),i.hemi[f]=U,f++}}m>0&&(s.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=lt.LTC_FLOAT_1,i.rectAreaLTC2=lt.LTC_FLOAT_2):(i.rectAreaLTC1=lt.LTC_HALF_1,i.rectAreaLTC2=lt.LTC_HALF_2)),i.ambient[0]=c,i.ambient[1]=u,i.ambient[2]=d;const E=i.hash;(E.directionalLength!==p||E.pointLength!==g||E.spotLength!==v||E.rectAreaLength!==m||E.hemiLength!==f||E.numDirectionalShadows!==y||E.numPointShadows!==_||E.numSpotShadows!==x||E.numSpotMaps!==I||E.numLightProbes!==P)&&(i.directional.length=p,i.spot.length=v,i.rectArea.length=m,i.point.length=g,i.hemi.length=f,i.directionalShadow.length=y,i.directionalShadowMap.length=y,i.pointShadow.length=_,i.pointShadowMap.length=_,i.spotShadow.length=x,i.spotShadowMap.length=x,i.directionalShadowMatrix.length=y,i.pointShadowMatrix.length=_,i.spotLightMatrix.length=x+I-A,i.spotLightMap.length=I,i.numSpotLightShadowsWithMaps=A,i.numLightProbes=P,E.directionalLength=p,E.pointLength=g,E.spotLength=v,E.rectAreaLength=m,E.hemiLength=f,E.numDirectionalShadows=y,E.numPointShadows=_,E.numSpotShadows=x,E.numSpotMaps=I,E.numLightProbes=P,i.version=Dg++)}function l(h,c){let u=0,d=0,p=0,g=0,v=0;const m=c.matrixWorldInverse;for(let f=0,y=h.length;f<y;f++){const _=h[f];if(_.isDirectionalLight){const x=i.directional[u];x.direction.setFromMatrixPosition(_.matrixWorld),n.setFromMatrixPosition(_.target.matrixWorld),x.direction.sub(n),x.direction.transformDirection(m),u++}else if(_.isSpotLight){const x=i.spot[p];x.position.setFromMatrixPosition(_.matrixWorld),x.position.applyMatrix4(m),x.direction.setFromMatrixPosition(_.matrixWorld),n.setFromMatrixPosition(_.target.matrixWorld),x.direction.sub(n),x.direction.transformDirection(m),p++}else if(_.isRectAreaLight){const x=i.rectArea[g];x.position.setFromMatrixPosition(_.matrixWorld),x.position.applyMatrix4(m),a.identity(),r.copy(_.matrixWorld),r.premultiply(m),a.extractRotation(r),x.halfWidth.set(_.width*.5,0,0),x.halfHeight.set(0,_.height*.5,0),x.halfWidth.applyMatrix4(a),x.halfHeight.applyMatrix4(a),g++}else if(_.isPointLight){const x=i.point[d];x.position.setFromMatrixPosition(_.matrixWorld),x.position.applyMatrix4(m),d++}else if(_.isHemisphereLight){const x=i.hemi[v];x.direction.setFromMatrixPosition(_.matrixWorld),x.direction.transformDirection(m),v++}}}return{setup:o,setupView:l,state:i}}function sc(s){const t=new Ug(s),e=[],i=[];function n(c){h.camera=c,e.length=0,i.length=0}function r(c){e.push(c)}function a(c){i.push(c)}function o(){t.setup(e)}function l(c){t.setupView(e,c)}const h={lightsArray:e,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:n,state:h,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function Ng(s){let t=new WeakMap;function e(n,r=0){const a=t.get(n);let o;return a===void 0?(o=new sc(s),t.set(n,[o])):r>=a.length?(o=new sc(s),a.push(o)):o=a[r],o}function i(){t=new WeakMap}return{get:e,dispose:i}}class kg extends en{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=gd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Og extends en{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const Fg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,zg=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Bg(s,t,e){let i=new Br;const n=new xt,r=new xt,a=new be,o=new kg({depthPacking:vd}),l=new Og,h={},c=e.maxTextureSize,u={[Qi]:We,[We]:Qi,[Ne]:Ne},d=new pi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new xt},radius:{value:4}},vertexShader:Fg,fragmentShader:zg}),p=d.clone();p.defines.HORIZONTAL_PASS=1;const g=new ce;g.setAttribute("position",new ye(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new Yt(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Fc;let f=this.type;this.render=function(A,P,E){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||A.length===0)return;const S=s.getRenderTarget(),M=s.getActiveCubeFace(),R=s.getActiveMipmapLevel(),V=s.state;V.setBlending(Ki),V.buffers.color.setClear(1,1,1,1),V.buffers.depth.setTest(!0),V.setScissorTest(!1);const O=f!==Pi&&this.type===Pi,N=f===Pi&&this.type!==Pi;for(let D=0,U=A.length;D<U;D++){const L=A[D],B=L.shadow;if(B===void 0){console.warn("THREE.WebGLShadowMap:",L,"has no shadow.");continue}if(B.autoUpdate===!1&&B.needsUpdate===!1)continue;n.copy(B.mapSize);const q=B.getFrameExtents();if(n.multiply(q),r.copy(B.mapSize),(n.x>c||n.y>c)&&(n.x>c&&(r.x=Math.floor(c/q.x),n.x=r.x*q.x,B.mapSize.x=r.x),n.y>c&&(r.y=Math.floor(c/q.y),n.y=r.y*q.y,B.mapSize.y=r.y)),B.map===null||O===!0||N===!0){const et=this.type!==Pi?{minFilter:Ke,magFilter:Ke}:{};B.map!==null&&B.map.dispose(),B.map=new Sn(n.x,n.y,et),B.map.texture.name=L.name+".shadowMap",B.camera.updateProjectionMatrix()}s.setRenderTarget(B.map),s.clear();const Q=B.getViewportCount();for(let et=0;et<Q;et++){const pt=B.getViewport(et);a.set(r.x*pt.x,r.y*pt.y,r.x*pt.z,r.y*pt.w),V.viewport(a),B.updateMatrices(L,et),i=B.getFrustum(),x(P,E,B.camera,L,this.type)}B.isPointLightShadow!==!0&&this.type===Pi&&y(B,E),B.needsUpdate=!1}f=this.type,m.needsUpdate=!1,s.setRenderTarget(S,M,R)};function y(A,P){const E=t.update(v);d.defines.VSM_SAMPLES!==A.blurSamples&&(d.defines.VSM_SAMPLES=A.blurSamples,p.defines.VSM_SAMPLES=A.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new Sn(n.x,n.y)),d.uniforms.shadow_pass.value=A.map.texture,d.uniforms.resolution.value=A.mapSize,d.uniforms.radius.value=A.radius,s.setRenderTarget(A.mapPass),s.clear(),s.renderBufferDirect(P,null,E,d,v,null),p.uniforms.shadow_pass.value=A.mapPass.texture,p.uniforms.resolution.value=A.mapSize,p.uniforms.radius.value=A.radius,s.setRenderTarget(A.map),s.clear(),s.renderBufferDirect(P,null,E,p,v,null)}function _(A,P,E,S){let M=null;const R=E.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(R!==void 0)M=R;else if(M=E.isPointLight===!0?l:o,s.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0){const V=M.uuid,O=P.uuid;let N=h[V];N===void 0&&(N={},h[V]=N);let D=N[O];D===void 0&&(D=M.clone(),N[O]=D,P.addEventListener("dispose",I)),M=D}if(M.visible=P.visible,M.wireframe=P.wireframe,S===Pi?M.side=P.shadowSide!==null?P.shadowSide:P.side:M.side=P.shadowSide!==null?P.shadowSide:u[P.side],M.alphaMap=P.alphaMap,M.alphaTest=P.alphaTest,M.map=P.map,M.clipShadows=P.clipShadows,M.clippingPlanes=P.clippingPlanes,M.clipIntersection=P.clipIntersection,M.displacementMap=P.displacementMap,M.displacementScale=P.displacementScale,M.displacementBias=P.displacementBias,M.wireframeLinewidth=P.wireframeLinewidth,M.linewidth=P.linewidth,E.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const V=s.properties.get(M);V.light=E}return M}function x(A,P,E,S,M){if(A.visible===!1)return;if(A.layers.test(P.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&M===Pi)&&(!A.frustumCulled||i.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(E.matrixWorldInverse,A.matrixWorld);const O=t.update(A),N=A.material;if(Array.isArray(N)){const D=O.groups;for(let U=0,L=D.length;U<L;U++){const B=D[U],q=N[B.materialIndex];if(q&&q.visible){const Q=_(A,q,S,M);A.onBeforeShadow(s,A,P,E,O,Q,B),s.renderBufferDirect(E,null,O,Q,A,B),A.onAfterShadow(s,A,P,E,O,Q,B)}}}else if(N.visible){const D=_(A,N,S,M);A.onBeforeShadow(s,A,P,E,O,D,null),s.renderBufferDirect(E,null,O,D,A,null),A.onAfterShadow(s,A,P,E,O,D,null)}}const V=A.children;for(let O=0,N=V.length;O<N;O++)x(V[O],P,E,S,M)}function I(A){A.target.removeEventListener("dispose",I);for(const E in h){const S=h[E],M=A.target.uuid;M in S&&(S[M].dispose(),delete S[M])}}}const Hg={[Va]:Ga,[Wa]:qa,[$a]:Ya,[Zn]:Xa,[Ga]:Va,[qa]:Wa,[Ya]:$a,[Xa]:Zn};function Vg(s,t){function e(){let k=!1;const ct=new be;let X=null;const Z=new be(0,0,0,0);return{setMask:function(ft){X!==ft&&!k&&(s.colorMask(ft,ft,ft,ft),X=ft)},setLocked:function(ft){k=ft},setClear:function(ft,dt,Bt,_e,ke){ke===!0&&(ft*=_e,dt*=_e,Bt*=_e),ct.set(ft,dt,Bt,_e),Z.equals(ct)===!1&&(s.clearColor(ft,dt,Bt,_e),Z.copy(ct))},reset:function(){k=!1,X=null,Z.set(-1,0,0,0)}}}function i(){let k=!1,ct=!1,X=null,Z=null,ft=null;return{setReversed:function(dt){if(ct!==dt){const Bt=t.get("EXT_clip_control");ct?Bt.clipControlEXT(Bt.LOWER_LEFT_EXT,Bt.ZERO_TO_ONE_EXT):Bt.clipControlEXT(Bt.LOWER_LEFT_EXT,Bt.NEGATIVE_ONE_TO_ONE_EXT);const _e=ft;ft=null,this.setClear(_e)}ct=dt},getReversed:function(){return ct},setTest:function(dt){dt?st(s.DEPTH_TEST):Tt(s.DEPTH_TEST)},setMask:function(dt){X!==dt&&!k&&(s.depthMask(dt),X=dt)},setFunc:function(dt){if(ct&&(dt=Hg[dt]),Z!==dt){switch(dt){case Va:s.depthFunc(s.NEVER);break;case Ga:s.depthFunc(s.ALWAYS);break;case Wa:s.depthFunc(s.LESS);break;case Zn:s.depthFunc(s.LEQUAL);break;case $a:s.depthFunc(s.EQUAL);break;case Xa:s.depthFunc(s.GEQUAL);break;case qa:s.depthFunc(s.GREATER);break;case Ya:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}Z=dt}},setLocked:function(dt){k=dt},setClear:function(dt){ft!==dt&&(ct&&(dt=1-dt),s.clearDepth(dt),ft=dt)},reset:function(){k=!1,X=null,Z=null,ft=null,ct=!1}}}function n(){let k=!1,ct=null,X=null,Z=null,ft=null,dt=null,Bt=null,_e=null,ke=null;return{setTest:function(oe){k||(oe?st(s.STENCIL_TEST):Tt(s.STENCIL_TEST))},setMask:function(oe){ct!==oe&&!k&&(s.stencilMask(oe),ct=oe)},setFunc:function(oe,oi,Si){(X!==oe||Z!==oi||ft!==Si)&&(s.stencilFunc(oe,oi,Si),X=oe,Z=oi,ft=Si)},setOp:function(oe,oi,Si){(dt!==oe||Bt!==oi||_e!==Si)&&(s.stencilOp(oe,oi,Si),dt=oe,Bt=oi,_e=Si)},setLocked:function(oe){k=oe},setClear:function(oe){ke!==oe&&(s.clearStencil(oe),ke=oe)},reset:function(){k=!1,ct=null,X=null,Z=null,ft=null,dt=null,Bt=null,_e=null,ke=null}}}const r=new e,a=new i,o=new n,l=new WeakMap,h=new WeakMap;let c={},u={},d=new WeakMap,p=[],g=null,v=!1,m=null,f=null,y=null,_=null,x=null,I=null,A=null,P=new Et(0,0,0),E=0,S=!1,M=null,R=null,V=null,O=null,N=null;const D=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let U=!1,L=0;const B=s.getParameter(s.VERSION);B.indexOf("WebGL")!==-1?(L=parseFloat(/^WebGL (\d)/.exec(B)[1]),U=L>=1):B.indexOf("OpenGL ES")!==-1&&(L=parseFloat(/^OpenGL ES (\d)/.exec(B)[1]),U=L>=2);let q=null,Q={};const et=s.getParameter(s.SCISSOR_BOX),pt=s.getParameter(s.VIEWPORT),qt=new be().fromArray(et),Y=new be().fromArray(pt);function tt(k,ct,X,Z){const ft=new Uint8Array(4),dt=s.createTexture();s.bindTexture(k,dt),s.texParameteri(k,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(k,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let Bt=0;Bt<X;Bt++)k===s.TEXTURE_3D||k===s.TEXTURE_2D_ARRAY?s.texImage3D(ct,0,s.RGBA,1,1,Z,0,s.RGBA,s.UNSIGNED_BYTE,ft):s.texImage2D(ct+Bt,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,ft);return dt}const rt={};rt[s.TEXTURE_2D]=tt(s.TEXTURE_2D,s.TEXTURE_2D,1),rt[s.TEXTURE_CUBE_MAP]=tt(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),rt[s.TEXTURE_2D_ARRAY]=tt(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),rt[s.TEXTURE_3D]=tt(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),st(s.DEPTH_TEST),a.setFunc(Zn),jt(!1),Kt(ll),st(s.CULL_FACE),H(Ki);function st(k){c[k]!==!0&&(s.enable(k),c[k]=!0)}function Tt(k){c[k]!==!1&&(s.disable(k),c[k]=!1)}function Dt(k,ct){return u[k]!==ct?(s.bindFramebuffer(k,ct),u[k]=ct,k===s.DRAW_FRAMEBUFFER&&(u[s.FRAMEBUFFER]=ct),k===s.FRAMEBUFFER&&(u[s.DRAW_FRAMEBUFFER]=ct),!0):!1}function zt(k,ct){let X=p,Z=!1;if(k){X=d.get(ct),X===void 0&&(X=[],d.set(ct,X));const ft=k.textures;if(X.length!==ft.length||X[0]!==s.COLOR_ATTACHMENT0){for(let dt=0,Bt=ft.length;dt<Bt;dt++)X[dt]=s.COLOR_ATTACHMENT0+dt;X.length=ft.length,Z=!0}}else X[0]!==s.BACK&&(X[0]=s.BACK,Z=!0);Z&&s.drawBuffers(X)}function xe(k){return g!==k?(s.useProgram(k),g=k,!0):!1}const Qt={[mn]:s.FUNC_ADD,[Wh]:s.FUNC_SUBTRACT,[$h]:s.FUNC_REVERSE_SUBTRACT};Qt[Xh]=s.MIN,Qt[qh]=s.MAX;const Se={[Yh]:s.ZERO,[jh]:s.ONE,[Kh]:s.SRC_COLOR,[Ba]:s.SRC_ALPHA,[id]:s.SRC_ALPHA_SATURATE,[td]:s.DST_COLOR,[Jh]:s.DST_ALPHA,[Zh]:s.ONE_MINUS_SRC_COLOR,[Ha]:s.ONE_MINUS_SRC_ALPHA,[ed]:s.ONE_MINUS_DST_COLOR,[Qh]:s.ONE_MINUS_DST_ALPHA,[nd]:s.CONSTANT_COLOR,[sd]:s.ONE_MINUS_CONSTANT_COLOR,[rd]:s.CONSTANT_ALPHA,[ad]:s.ONE_MINUS_CONSTANT_ALPHA};function H(k,ct,X,Z,ft,dt,Bt,_e,ke,oe){if(k===Ki){v===!0&&(Tt(s.BLEND),v=!1);return}if(v===!1&&(st(s.BLEND),v=!0),k!==Gh){if(k!==m||oe!==S){if((f!==mn||x!==mn)&&(s.blendEquation(s.FUNC_ADD),f=mn,x=mn),oe)switch(k){case Yn:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case cl:s.blendFunc(s.ONE,s.ONE);break;case hl:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case dl:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",k);break}else switch(k){case Yn:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case cl:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case hl:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case dl:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",k);break}y=null,_=null,I=null,A=null,P.set(0,0,0),E=0,m=k,S=oe}return}ft=ft||ct,dt=dt||X,Bt=Bt||Z,(ct!==f||ft!==x)&&(s.blendEquationSeparate(Qt[ct],Qt[ft]),f=ct,x=ft),(X!==y||Z!==_||dt!==I||Bt!==A)&&(s.blendFuncSeparate(Se[X],Se[Z],Se[dt],Se[Bt]),y=X,_=Z,I=dt,A=Bt),(_e.equals(P)===!1||ke!==E)&&(s.blendColor(_e.r,_e.g,_e.b,ke),P.copy(_e),E=ke),m=k,S=!1}function Ze(k,ct){k.side===Ne?Tt(s.CULL_FACE):st(s.CULL_FACE);let X=k.side===We;ct&&(X=!X),jt(X),k.blending===Yn&&k.transparent===!1?H(Ki):H(k.blending,k.blendEquation,k.blendSrc,k.blendDst,k.blendEquationAlpha,k.blendSrcAlpha,k.blendDstAlpha,k.blendColor,k.blendAlpha,k.premultipliedAlpha),a.setFunc(k.depthFunc),a.setTest(k.depthTest),a.setMask(k.depthWrite),r.setMask(k.colorWrite);const Z=k.stencilWrite;o.setTest(Z),Z&&(o.setMask(k.stencilWriteMask),o.setFunc(k.stencilFunc,k.stencilRef,k.stencilFuncMask),o.setOp(k.stencilFail,k.stencilZFail,k.stencilZPass)),pe(k.polygonOffset,k.polygonOffsetFactor,k.polygonOffsetUnits),k.alphaToCoverage===!0?st(s.SAMPLE_ALPHA_TO_COVERAGE):Tt(s.SAMPLE_ALPHA_TO_COVERAGE)}function jt(k){M!==k&&(k?s.frontFace(s.CW):s.frontFace(s.CCW),M=k)}function Kt(k){k!==Hh?(st(s.CULL_FACE),k!==R&&(k===ll?s.cullFace(s.BACK):k===Vh?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):Tt(s.CULL_FACE),R=k}function Ct(k){k!==V&&(U&&s.lineWidth(k),V=k)}function pe(k,ct,X){k?(st(s.POLYGON_OFFSET_FILL),(O!==ct||N!==X)&&(s.polygonOffset(ct,X),O=ct,N=X)):Tt(s.POLYGON_OFFSET_FILL)}function At(k){k?st(s.SCISSOR_TEST):Tt(s.SCISSOR_TEST)}function T(k){k===void 0&&(k=s.TEXTURE0+D-1),q!==k&&(s.activeTexture(k),q=k)}function b(k,ct,X){X===void 0&&(q===null?X=s.TEXTURE0+D-1:X=q);let Z=Q[X];Z===void 0&&(Z={type:void 0,texture:void 0},Q[X]=Z),(Z.type!==k||Z.texture!==ct)&&(q!==X&&(s.activeTexture(X),q=X),s.bindTexture(k,ct||rt[k]),Z.type=k,Z.texture=ct)}function G(){const k=Q[q];k!==void 0&&k.type!==void 0&&(s.bindTexture(k.type,null),k.type=void 0,k.texture=void 0)}function K(){try{s.compressedTexImage2D.apply(s,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function J(){try{s.compressedTexImage3D.apply(s,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function j(){try{s.texSubImage2D.apply(s,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function bt(){try{s.texSubImage3D.apply(s,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function ht(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function mt(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function te(){try{s.texStorage2D.apply(s,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function it(){try{s.texStorage3D.apply(s,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function gt(){try{s.texImage2D.apply(s,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function It(){try{s.texImage3D.apply(s,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Ut(k){qt.equals(k)===!1&&(s.scissor(k.x,k.y,k.z,k.w),qt.copy(k))}function vt(k){Y.equals(k)===!1&&(s.viewport(k.x,k.y,k.z,k.w),Y.copy(k))}function Zt(k,ct){let X=h.get(ct);X===void 0&&(X=new WeakMap,h.set(ct,X));let Z=X.get(k);Z===void 0&&(Z=s.getUniformBlockIndex(ct,k.name),X.set(k,Z))}function Gt(k,ct){const Z=h.get(ct).get(k);l.get(ct)!==Z&&(s.uniformBlockBinding(ct,Z,k.__bindingPointIndex),l.set(ct,Z))}function ue(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),a.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),c={},q=null,Q={},u={},d=new WeakMap,p=[],g=null,v=!1,m=null,f=null,y=null,_=null,x=null,I=null,A=null,P=new Et(0,0,0),E=0,S=!1,M=null,R=null,V=null,O=null,N=null,qt.set(0,0,s.canvas.width,s.canvas.height),Y.set(0,0,s.canvas.width,s.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:st,disable:Tt,bindFramebuffer:Dt,drawBuffers:zt,useProgram:xe,setBlending:H,setMaterial:Ze,setFlipSided:jt,setCullFace:Kt,setLineWidth:Ct,setPolygonOffset:pe,setScissorTest:At,activeTexture:T,bindTexture:b,unbindTexture:G,compressedTexImage2D:K,compressedTexImage3D:J,texImage2D:gt,texImage3D:It,updateUBOMapping:Zt,uniformBlockBinding:Gt,texStorage2D:te,texStorage3D:it,texSubImage2D:j,texSubImage3D:bt,compressedTexSubImage2D:ht,compressedTexSubImage3D:mt,scissor:Ut,viewport:vt,reset:ue}}function rc(s,t,e,i){const n=Gg(i);switch(e){case Xc:return s*t;case Yc:return s*t;case jc:return s*t*2;case Fo:return s*t/n.components*n.byteLength;case zo:return s*t/n.components*n.byteLength;case Kc:return s*t*2/n.components*n.byteLength;case Bo:return s*t*2/n.components*n.byteLength;case qc:return s*t*3/n.components*n.byteLength;case ri:return s*t*4/n.components*n.byteLength;case Ho:return s*t*4/n.components*n.byteLength;case Mr:case br:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case Sr:case wr:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case Qa:case eo:return Math.max(s,16)*Math.max(t,8)/4;case Ja:case to:return Math.max(s,8)*Math.max(t,8)/2;case io:case no:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case so:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case ro:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case ao:return Math.floor((s+4)/5)*Math.floor((t+3)/4)*16;case oo:return Math.floor((s+4)/5)*Math.floor((t+4)/5)*16;case lo:return Math.floor((s+5)/6)*Math.floor((t+4)/5)*16;case co:return Math.floor((s+5)/6)*Math.floor((t+5)/6)*16;case ho:return Math.floor((s+7)/8)*Math.floor((t+4)/5)*16;case uo:return Math.floor((s+7)/8)*Math.floor((t+5)/6)*16;case fo:return Math.floor((s+7)/8)*Math.floor((t+7)/8)*16;case po:return Math.floor((s+9)/10)*Math.floor((t+4)/5)*16;case mo:return Math.floor((s+9)/10)*Math.floor((t+5)/6)*16;case go:return Math.floor((s+9)/10)*Math.floor((t+7)/8)*16;case vo:return Math.floor((s+9)/10)*Math.floor((t+9)/10)*16;case xo:return Math.floor((s+11)/12)*Math.floor((t+9)/10)*16;case yo:return Math.floor((s+11)/12)*Math.floor((t+11)/12)*16;case Er:case _o:case Mo:return Math.ceil(s/4)*Math.ceil(t/4)*16;case Zc:case bo:return Math.ceil(s/4)*Math.ceil(t/4)*8;case So:case wo:return Math.ceil(s/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Gg(s){switch(s){case Ni:case Gc:return{byteLength:1,components:1};case Is:case Wc:case Ns:return{byteLength:2,components:1};case ko:case Oo:return{byteLength:2,components:4};case bn:case No:case _i:return{byteLength:4,components:1};case $c:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}function Wg(s,t,e,i,n,r,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new xt,c=new WeakMap;let u;const d=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(T,b){return p?new OffscreenCanvas(T,b):Ir("canvas")}function v(T,b,G){let K=1;const J=At(T);if((J.width>G||J.height>G)&&(K=G/Math.max(J.width,J.height)),K<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){const j=Math.floor(K*J.width),bt=Math.floor(K*J.height);u===void 0&&(u=g(j,bt));const ht=b?g(j,bt):u;return ht.width=j,ht.height=bt,ht.getContext("2d").drawImage(T,0,0,j,bt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+J.width+"x"+J.height+") to ("+j+"x"+bt+")."),ht}else return"data"in T&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+J.width+"x"+J.height+")."),T;return T}function m(T){return T.generateMipmaps}function f(T){s.generateMipmap(T)}function y(T){return T.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?s.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function _(T,b,G,K,J=!1){if(T!==null){if(s[T]!==void 0)return s[T];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let j=b;if(b===s.RED&&(G===s.FLOAT&&(j=s.R32F),G===s.HALF_FLOAT&&(j=s.R16F),G===s.UNSIGNED_BYTE&&(j=s.R8)),b===s.RED_INTEGER&&(G===s.UNSIGNED_BYTE&&(j=s.R8UI),G===s.UNSIGNED_SHORT&&(j=s.R16UI),G===s.UNSIGNED_INT&&(j=s.R32UI),G===s.BYTE&&(j=s.R8I),G===s.SHORT&&(j=s.R16I),G===s.INT&&(j=s.R32I)),b===s.RG&&(G===s.FLOAT&&(j=s.RG32F),G===s.HALF_FLOAT&&(j=s.RG16F),G===s.UNSIGNED_BYTE&&(j=s.RG8)),b===s.RG_INTEGER&&(G===s.UNSIGNED_BYTE&&(j=s.RG8UI),G===s.UNSIGNED_SHORT&&(j=s.RG16UI),G===s.UNSIGNED_INT&&(j=s.RG32UI),G===s.BYTE&&(j=s.RG8I),G===s.SHORT&&(j=s.RG16I),G===s.INT&&(j=s.RG32I)),b===s.RGB_INTEGER&&(G===s.UNSIGNED_BYTE&&(j=s.RGB8UI),G===s.UNSIGNED_SHORT&&(j=s.RGB16UI),G===s.UNSIGNED_INT&&(j=s.RGB32UI),G===s.BYTE&&(j=s.RGB8I),G===s.SHORT&&(j=s.RGB16I),G===s.INT&&(j=s.RGB32I)),b===s.RGBA_INTEGER&&(G===s.UNSIGNED_BYTE&&(j=s.RGBA8UI),G===s.UNSIGNED_SHORT&&(j=s.RGBA16UI),G===s.UNSIGNED_INT&&(j=s.RGBA32UI),G===s.BYTE&&(j=s.RGBA8I),G===s.SHORT&&(j=s.RGBA16I),G===s.INT&&(j=s.RGBA32I)),b===s.RGB&&G===s.UNSIGNED_INT_5_9_9_9_REV&&(j=s.RGB9_E5),b===s.RGBA){const bt=J?Fr:ee.getTransfer(K);G===s.FLOAT&&(j=s.RGBA32F),G===s.HALF_FLOAT&&(j=s.RGBA16F),G===s.UNSIGNED_BYTE&&(j=bt===he?s.SRGB8_ALPHA8:s.RGBA8),G===s.UNSIGNED_SHORT_4_4_4_4&&(j=s.RGBA4),G===s.UNSIGNED_SHORT_5_5_5_1&&(j=s.RGB5_A1)}return(j===s.R16F||j===s.R32F||j===s.RG16F||j===s.RG32F||j===s.RGBA16F||j===s.RGBA32F)&&t.get("EXT_color_buffer_float"),j}function x(T,b){let G;return T?b===null||b===bn||b===ts?G=s.DEPTH24_STENCIL8:b===_i?G=s.DEPTH32F_STENCIL8:b===Is&&(G=s.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===bn||b===ts?G=s.DEPTH_COMPONENT24:b===_i?G=s.DEPTH_COMPONENT32F:b===Is&&(G=s.DEPTH_COMPONENT16),G}function I(T,b){return m(T)===!0||T.isFramebufferTexture&&T.minFilter!==Ke&&T.minFilter!==fi?Math.log2(Math.max(b.width,b.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?b.mipmaps.length:1}function A(T){const b=T.target;b.removeEventListener("dispose",A),E(b),b.isVideoTexture&&c.delete(b)}function P(T){const b=T.target;b.removeEventListener("dispose",P),M(b)}function E(T){const b=i.get(T);if(b.__webglInit===void 0)return;const G=T.source,K=d.get(G);if(K){const J=K[b.__cacheKey];J.usedTimes--,J.usedTimes===0&&S(T),Object.keys(K).length===0&&d.delete(G)}i.remove(T)}function S(T){const b=i.get(T);s.deleteTexture(b.__webglTexture);const G=T.source,K=d.get(G);delete K[b.__cacheKey],a.memory.textures--}function M(T){const b=i.get(T);if(T.depthTexture&&(T.depthTexture.dispose(),i.remove(T.depthTexture)),T.isWebGLCubeRenderTarget)for(let K=0;K<6;K++){if(Array.isArray(b.__webglFramebuffer[K]))for(let J=0;J<b.__webglFramebuffer[K].length;J++)s.deleteFramebuffer(b.__webglFramebuffer[K][J]);else s.deleteFramebuffer(b.__webglFramebuffer[K]);b.__webglDepthbuffer&&s.deleteRenderbuffer(b.__webglDepthbuffer[K])}else{if(Array.isArray(b.__webglFramebuffer))for(let K=0;K<b.__webglFramebuffer.length;K++)s.deleteFramebuffer(b.__webglFramebuffer[K]);else s.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&s.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&s.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let K=0;K<b.__webglColorRenderbuffer.length;K++)b.__webglColorRenderbuffer[K]&&s.deleteRenderbuffer(b.__webglColorRenderbuffer[K]);b.__webglDepthRenderbuffer&&s.deleteRenderbuffer(b.__webglDepthRenderbuffer)}const G=T.textures;for(let K=0,J=G.length;K<J;K++){const j=i.get(G[K]);j.__webglTexture&&(s.deleteTexture(j.__webglTexture),a.memory.textures--),i.remove(G[K])}i.remove(T)}let R=0;function V(){R=0}function O(){const T=R;return T>=n.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+n.maxTextures),R+=1,T}function N(T){const b=[];return b.push(T.wrapS),b.push(T.wrapT),b.push(T.wrapR||0),b.push(T.magFilter),b.push(T.minFilter),b.push(T.anisotropy),b.push(T.internalFormat),b.push(T.format),b.push(T.type),b.push(T.generateMipmaps),b.push(T.premultiplyAlpha),b.push(T.flipY),b.push(T.unpackAlignment),b.push(T.colorSpace),b.join()}function D(T,b){const G=i.get(T);if(T.isVideoTexture&&Ct(T),T.isRenderTargetTexture===!1&&T.version>0&&G.__version!==T.version){const K=T.image;if(K===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(K.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Y(G,T,b);return}}e.bindTexture(s.TEXTURE_2D,G.__webglTexture,s.TEXTURE0+b)}function U(T,b){const G=i.get(T);if(T.version>0&&G.__version!==T.version){Y(G,T,b);return}e.bindTexture(s.TEXTURE_2D_ARRAY,G.__webglTexture,s.TEXTURE0+b)}function L(T,b){const G=i.get(T);if(T.version>0&&G.__version!==T.version){Y(G,T,b);return}e.bindTexture(s.TEXTURE_3D,G.__webglTexture,s.TEXTURE0+b)}function B(T,b){const G=i.get(T);if(T.version>0&&G.__version!==T.version){tt(G,T,b);return}e.bindTexture(s.TEXTURE_CUBE_MAP,G.__webglTexture,s.TEXTURE0+b)}const q={[Cr]:s.REPEAT,[vn]:s.CLAMP_TO_EDGE,[Za]:s.MIRRORED_REPEAT},Q={[Ke]:s.NEAREST,[md]:s.NEAREST_MIPMAP_NEAREST,[Bs]:s.NEAREST_MIPMAP_LINEAR,[fi]:s.LINEAR,[Yr]:s.LINEAR_MIPMAP_NEAREST,[xn]:s.LINEAR_MIPMAP_LINEAR},et={[yd]:s.NEVER,[Ed]:s.ALWAYS,[_d]:s.LESS,[Qc]:s.LEQUAL,[Md]:s.EQUAL,[wd]:s.GEQUAL,[bd]:s.GREATER,[Sd]:s.NOTEQUAL};function pt(T,b){if(b.type===_i&&t.has("OES_texture_float_linear")===!1&&(b.magFilter===fi||b.magFilter===Yr||b.magFilter===Bs||b.magFilter===xn||b.minFilter===fi||b.minFilter===Yr||b.minFilter===Bs||b.minFilter===xn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(T,s.TEXTURE_WRAP_S,q[b.wrapS]),s.texParameteri(T,s.TEXTURE_WRAP_T,q[b.wrapT]),(T===s.TEXTURE_3D||T===s.TEXTURE_2D_ARRAY)&&s.texParameteri(T,s.TEXTURE_WRAP_R,q[b.wrapR]),s.texParameteri(T,s.TEXTURE_MAG_FILTER,Q[b.magFilter]),s.texParameteri(T,s.TEXTURE_MIN_FILTER,Q[b.minFilter]),b.compareFunction&&(s.texParameteri(T,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(T,s.TEXTURE_COMPARE_FUNC,et[b.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===Ke||b.minFilter!==Bs&&b.minFilter!==xn||b.type===_i&&t.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||i.get(b).__currentAnisotropy){const G=t.get("EXT_texture_filter_anisotropic");s.texParameterf(T,G.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,n.getMaxAnisotropy())),i.get(b).__currentAnisotropy=b.anisotropy}}}function qt(T,b){let G=!1;T.__webglInit===void 0&&(T.__webglInit=!0,b.addEventListener("dispose",A));const K=b.source;let J=d.get(K);J===void 0&&(J={},d.set(K,J));const j=N(b);if(j!==T.__cacheKey){J[j]===void 0&&(J[j]={texture:s.createTexture(),usedTimes:0},a.memory.textures++,G=!0),J[j].usedTimes++;const bt=J[T.__cacheKey];bt!==void 0&&(J[T.__cacheKey].usedTimes--,bt.usedTimes===0&&S(b)),T.__cacheKey=j,T.__webglTexture=J[j].texture}return G}function Y(T,b,G){let K=s.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(K=s.TEXTURE_2D_ARRAY),b.isData3DTexture&&(K=s.TEXTURE_3D);const J=qt(T,b),j=b.source;e.bindTexture(K,T.__webglTexture,s.TEXTURE0+G);const bt=i.get(j);if(j.version!==bt.__version||J===!0){e.activeTexture(s.TEXTURE0+G);const ht=ee.getPrimaries(ee.workingColorSpace),mt=b.colorSpace===Yi?null:ee.getPrimaries(b.colorSpace),te=b.colorSpace===Yi||ht===mt?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,b.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,b.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,te);let it=v(b.image,!1,n.maxTextureSize);it=pe(b,it);const gt=r.convert(b.format,b.colorSpace),It=r.convert(b.type);let Ut=_(b.internalFormat,gt,It,b.colorSpace,b.isVideoTexture);pt(K,b);let vt;const Zt=b.mipmaps,Gt=b.isVideoTexture!==!0,ue=bt.__version===void 0||J===!0,k=j.dataReady,ct=I(b,it);if(b.isDepthTexture)Ut=x(b.format===es,b.type),ue&&(Gt?e.texStorage2D(s.TEXTURE_2D,1,Ut,it.width,it.height):e.texImage2D(s.TEXTURE_2D,0,Ut,it.width,it.height,0,gt,It,null));else if(b.isDataTexture)if(Zt.length>0){Gt&&ue&&e.texStorage2D(s.TEXTURE_2D,ct,Ut,Zt[0].width,Zt[0].height);for(let X=0,Z=Zt.length;X<Z;X++)vt=Zt[X],Gt?k&&e.texSubImage2D(s.TEXTURE_2D,X,0,0,vt.width,vt.height,gt,It,vt.data):e.texImage2D(s.TEXTURE_2D,X,Ut,vt.width,vt.height,0,gt,It,vt.data);b.generateMipmaps=!1}else Gt?(ue&&e.texStorage2D(s.TEXTURE_2D,ct,Ut,it.width,it.height),k&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,it.width,it.height,gt,It,it.data)):e.texImage2D(s.TEXTURE_2D,0,Ut,it.width,it.height,0,gt,It,it.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){Gt&&ue&&e.texStorage3D(s.TEXTURE_2D_ARRAY,ct,Ut,Zt[0].width,Zt[0].height,it.depth);for(let X=0,Z=Zt.length;X<Z;X++)if(vt=Zt[X],b.format!==ri)if(gt!==null)if(Gt){if(k)if(b.layerUpdates.size>0){const ft=rc(vt.width,vt.height,b.format,b.type);for(const dt of b.layerUpdates){const Bt=vt.data.subarray(dt*ft/vt.data.BYTES_PER_ELEMENT,(dt+1)*ft/vt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,X,0,0,dt,vt.width,vt.height,1,gt,Bt)}b.clearLayerUpdates()}else e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,X,0,0,0,vt.width,vt.height,it.depth,gt,vt.data)}else e.compressedTexImage3D(s.TEXTURE_2D_ARRAY,X,Ut,vt.width,vt.height,it.depth,0,vt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Gt?k&&e.texSubImage3D(s.TEXTURE_2D_ARRAY,X,0,0,0,vt.width,vt.height,it.depth,gt,It,vt.data):e.texImage3D(s.TEXTURE_2D_ARRAY,X,Ut,vt.width,vt.height,it.depth,0,gt,It,vt.data)}else{Gt&&ue&&e.texStorage2D(s.TEXTURE_2D,ct,Ut,Zt[0].width,Zt[0].height);for(let X=0,Z=Zt.length;X<Z;X++)vt=Zt[X],b.format!==ri?gt!==null?Gt?k&&e.compressedTexSubImage2D(s.TEXTURE_2D,X,0,0,vt.width,vt.height,gt,vt.data):e.compressedTexImage2D(s.TEXTURE_2D,X,Ut,vt.width,vt.height,0,vt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Gt?k&&e.texSubImage2D(s.TEXTURE_2D,X,0,0,vt.width,vt.height,gt,It,vt.data):e.texImage2D(s.TEXTURE_2D,X,Ut,vt.width,vt.height,0,gt,It,vt.data)}else if(b.isDataArrayTexture)if(Gt){if(ue&&e.texStorage3D(s.TEXTURE_2D_ARRAY,ct,Ut,it.width,it.height,it.depth),k)if(b.layerUpdates.size>0){const X=rc(it.width,it.height,b.format,b.type);for(const Z of b.layerUpdates){const ft=it.data.subarray(Z*X/it.data.BYTES_PER_ELEMENT,(Z+1)*X/it.data.BYTES_PER_ELEMENT);e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,Z,it.width,it.height,1,gt,It,ft)}b.clearLayerUpdates()}else e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,it.width,it.height,it.depth,gt,It,it.data)}else e.texImage3D(s.TEXTURE_2D_ARRAY,0,Ut,it.width,it.height,it.depth,0,gt,It,it.data);else if(b.isData3DTexture)Gt?(ue&&e.texStorage3D(s.TEXTURE_3D,ct,Ut,it.width,it.height,it.depth),k&&e.texSubImage3D(s.TEXTURE_3D,0,0,0,0,it.width,it.height,it.depth,gt,It,it.data)):e.texImage3D(s.TEXTURE_3D,0,Ut,it.width,it.height,it.depth,0,gt,It,it.data);else if(b.isFramebufferTexture){if(ue)if(Gt)e.texStorage2D(s.TEXTURE_2D,ct,Ut,it.width,it.height);else{let X=it.width,Z=it.height;for(let ft=0;ft<ct;ft++)e.texImage2D(s.TEXTURE_2D,ft,Ut,X,Z,0,gt,It,null),X>>=1,Z>>=1}}else if(Zt.length>0){if(Gt&&ue){const X=At(Zt[0]);e.texStorage2D(s.TEXTURE_2D,ct,Ut,X.width,X.height)}for(let X=0,Z=Zt.length;X<Z;X++)vt=Zt[X],Gt?k&&e.texSubImage2D(s.TEXTURE_2D,X,0,0,gt,It,vt):e.texImage2D(s.TEXTURE_2D,X,Ut,gt,It,vt);b.generateMipmaps=!1}else if(Gt){if(ue){const X=At(it);e.texStorage2D(s.TEXTURE_2D,ct,Ut,X.width,X.height)}k&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,gt,It,it)}else e.texImage2D(s.TEXTURE_2D,0,Ut,gt,It,it);m(b)&&f(K),bt.__version=j.version,b.onUpdate&&b.onUpdate(b)}T.__version=b.version}function tt(T,b,G){if(b.image.length!==6)return;const K=qt(T,b),J=b.source;e.bindTexture(s.TEXTURE_CUBE_MAP,T.__webglTexture,s.TEXTURE0+G);const j=i.get(J);if(J.version!==j.__version||K===!0){e.activeTexture(s.TEXTURE0+G);const bt=ee.getPrimaries(ee.workingColorSpace),ht=b.colorSpace===Yi?null:ee.getPrimaries(b.colorSpace),mt=b.colorSpace===Yi||bt===ht?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,b.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,b.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,mt);const te=b.isCompressedTexture||b.image[0].isCompressedTexture,it=b.image[0]&&b.image[0].isDataTexture,gt=[];for(let Z=0;Z<6;Z++)!te&&!it?gt[Z]=v(b.image[Z],!0,n.maxCubemapSize):gt[Z]=it?b.image[Z].image:b.image[Z],gt[Z]=pe(b,gt[Z]);const It=gt[0],Ut=r.convert(b.format,b.colorSpace),vt=r.convert(b.type),Zt=_(b.internalFormat,Ut,vt,b.colorSpace),Gt=b.isVideoTexture!==!0,ue=j.__version===void 0||K===!0,k=J.dataReady;let ct=I(b,It);pt(s.TEXTURE_CUBE_MAP,b);let X;if(te){Gt&&ue&&e.texStorage2D(s.TEXTURE_CUBE_MAP,ct,Zt,It.width,It.height);for(let Z=0;Z<6;Z++){X=gt[Z].mipmaps;for(let ft=0;ft<X.length;ft++){const dt=X[ft];b.format!==ri?Ut!==null?Gt?k&&e.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ft,0,0,dt.width,dt.height,Ut,dt.data):e.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ft,Zt,dt.width,dt.height,0,dt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Gt?k&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ft,0,0,dt.width,dt.height,Ut,vt,dt.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ft,Zt,dt.width,dt.height,0,Ut,vt,dt.data)}}}else{if(X=b.mipmaps,Gt&&ue){X.length>0&&ct++;const Z=At(gt[0]);e.texStorage2D(s.TEXTURE_CUBE_MAP,ct,Zt,Z.width,Z.height)}for(let Z=0;Z<6;Z++)if(it){Gt?k&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,gt[Z].width,gt[Z].height,Ut,vt,gt[Z].data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,Zt,gt[Z].width,gt[Z].height,0,Ut,vt,gt[Z].data);for(let ft=0;ft<X.length;ft++){const Bt=X[ft].image[Z].image;Gt?k&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ft+1,0,0,Bt.width,Bt.height,Ut,vt,Bt.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ft+1,Zt,Bt.width,Bt.height,0,Ut,vt,Bt.data)}}else{Gt?k&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,Ut,vt,gt[Z]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,Zt,Ut,vt,gt[Z]);for(let ft=0;ft<X.length;ft++){const dt=X[ft];Gt?k&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ft+1,0,0,Ut,vt,dt.image[Z]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ft+1,Zt,Ut,vt,dt.image[Z])}}}m(b)&&f(s.TEXTURE_CUBE_MAP),j.__version=J.version,b.onUpdate&&b.onUpdate(b)}T.__version=b.version}function rt(T,b,G,K,J,j){const bt=r.convert(G.format,G.colorSpace),ht=r.convert(G.type),mt=_(G.internalFormat,bt,ht,G.colorSpace),te=i.get(b),it=i.get(G);if(it.__renderTarget=b,!te.__hasExternalTextures){const gt=Math.max(1,b.width>>j),It=Math.max(1,b.height>>j);J===s.TEXTURE_3D||J===s.TEXTURE_2D_ARRAY?e.texImage3D(J,j,mt,gt,It,b.depth,0,bt,ht,null):e.texImage2D(J,j,mt,gt,It,0,bt,ht,null)}e.bindFramebuffer(s.FRAMEBUFFER,T),Kt(b)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,K,J,it.__webglTexture,0,jt(b)):(J===s.TEXTURE_2D||J>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&J<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,K,J,it.__webglTexture,j),e.bindFramebuffer(s.FRAMEBUFFER,null)}function st(T,b,G){if(s.bindRenderbuffer(s.RENDERBUFFER,T),b.depthBuffer){const K=b.depthTexture,J=K&&K.isDepthTexture?K.type:null,j=x(b.stencilBuffer,J),bt=b.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ht=jt(b);Kt(b)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,ht,j,b.width,b.height):G?s.renderbufferStorageMultisample(s.RENDERBUFFER,ht,j,b.width,b.height):s.renderbufferStorage(s.RENDERBUFFER,j,b.width,b.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,bt,s.RENDERBUFFER,T)}else{const K=b.textures;for(let J=0;J<K.length;J++){const j=K[J],bt=r.convert(j.format,j.colorSpace),ht=r.convert(j.type),mt=_(j.internalFormat,bt,ht,j.colorSpace),te=jt(b);G&&Kt(b)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,te,mt,b.width,b.height):Kt(b)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,te,mt,b.width,b.height):s.renderbufferStorage(s.RENDERBUFFER,mt,b.width,b.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function Tt(T,b){if(b&&b.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(s.FRAMEBUFFER,T),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const K=i.get(b.depthTexture);K.__renderTarget=b,(!K.__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),D(b.depthTexture,0);const J=K.__webglTexture,j=jt(b);if(b.depthTexture.format===jn)Kt(b)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,J,0,j):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,J,0);else if(b.depthTexture.format===es)Kt(b)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,J,0,j):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,J,0);else throw new Error("Unknown depthTexture format")}function Dt(T){const b=i.get(T),G=T.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==T.depthTexture){const K=T.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),K){const J=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,K.removeEventListener("dispose",J)};K.addEventListener("dispose",J),b.__depthDisposeCallback=J}b.__boundDepthTexture=K}if(T.depthTexture&&!b.__autoAllocateDepthBuffer){if(G)throw new Error("target.depthTexture not supported in Cube render targets");Tt(b.__webglFramebuffer,T)}else if(G){b.__webglDepthbuffer=[];for(let K=0;K<6;K++)if(e.bindFramebuffer(s.FRAMEBUFFER,b.__webglFramebuffer[K]),b.__webglDepthbuffer[K]===void 0)b.__webglDepthbuffer[K]=s.createRenderbuffer(),st(b.__webglDepthbuffer[K],T,!1);else{const J=T.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,j=b.__webglDepthbuffer[K];s.bindRenderbuffer(s.RENDERBUFFER,j),s.framebufferRenderbuffer(s.FRAMEBUFFER,J,s.RENDERBUFFER,j)}}else if(e.bindFramebuffer(s.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=s.createRenderbuffer(),st(b.__webglDepthbuffer,T,!1);else{const K=T.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,J=b.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,J),s.framebufferRenderbuffer(s.FRAMEBUFFER,K,s.RENDERBUFFER,J)}e.bindFramebuffer(s.FRAMEBUFFER,null)}function zt(T,b,G){const K=i.get(T);b!==void 0&&rt(K.__webglFramebuffer,T,T.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),G!==void 0&&Dt(T)}function xe(T){const b=T.texture,G=i.get(T),K=i.get(b);T.addEventListener("dispose",P);const J=T.textures,j=T.isWebGLCubeRenderTarget===!0,bt=J.length>1;if(bt||(K.__webglTexture===void 0&&(K.__webglTexture=s.createTexture()),K.__version=b.version,a.memory.textures++),j){G.__webglFramebuffer=[];for(let ht=0;ht<6;ht++)if(b.mipmaps&&b.mipmaps.length>0){G.__webglFramebuffer[ht]=[];for(let mt=0;mt<b.mipmaps.length;mt++)G.__webglFramebuffer[ht][mt]=s.createFramebuffer()}else G.__webglFramebuffer[ht]=s.createFramebuffer()}else{if(b.mipmaps&&b.mipmaps.length>0){G.__webglFramebuffer=[];for(let ht=0;ht<b.mipmaps.length;ht++)G.__webglFramebuffer[ht]=s.createFramebuffer()}else G.__webglFramebuffer=s.createFramebuffer();if(bt)for(let ht=0,mt=J.length;ht<mt;ht++){const te=i.get(J[ht]);te.__webglTexture===void 0&&(te.__webglTexture=s.createTexture(),a.memory.textures++)}if(T.samples>0&&Kt(T)===!1){G.__webglMultisampledFramebuffer=s.createFramebuffer(),G.__webglColorRenderbuffer=[],e.bindFramebuffer(s.FRAMEBUFFER,G.__webglMultisampledFramebuffer);for(let ht=0;ht<J.length;ht++){const mt=J[ht];G.__webglColorRenderbuffer[ht]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,G.__webglColorRenderbuffer[ht]);const te=r.convert(mt.format,mt.colorSpace),it=r.convert(mt.type),gt=_(mt.internalFormat,te,it,mt.colorSpace,T.isXRRenderTarget===!0),It=jt(T);s.renderbufferStorageMultisample(s.RENDERBUFFER,It,gt,T.width,T.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ht,s.RENDERBUFFER,G.__webglColorRenderbuffer[ht])}s.bindRenderbuffer(s.RENDERBUFFER,null),T.depthBuffer&&(G.__webglDepthRenderbuffer=s.createRenderbuffer(),st(G.__webglDepthRenderbuffer,T,!0)),e.bindFramebuffer(s.FRAMEBUFFER,null)}}if(j){e.bindTexture(s.TEXTURE_CUBE_MAP,K.__webglTexture),pt(s.TEXTURE_CUBE_MAP,b);for(let ht=0;ht<6;ht++)if(b.mipmaps&&b.mipmaps.length>0)for(let mt=0;mt<b.mipmaps.length;mt++)rt(G.__webglFramebuffer[ht][mt],T,b,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+ht,mt);else rt(G.__webglFramebuffer[ht],T,b,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+ht,0);m(b)&&f(s.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(bt){for(let ht=0,mt=J.length;ht<mt;ht++){const te=J[ht],it=i.get(te);e.bindTexture(s.TEXTURE_2D,it.__webglTexture),pt(s.TEXTURE_2D,te),rt(G.__webglFramebuffer,T,te,s.COLOR_ATTACHMENT0+ht,s.TEXTURE_2D,0),m(te)&&f(s.TEXTURE_2D)}e.unbindTexture()}else{let ht=s.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(ht=T.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(ht,K.__webglTexture),pt(ht,b),b.mipmaps&&b.mipmaps.length>0)for(let mt=0;mt<b.mipmaps.length;mt++)rt(G.__webglFramebuffer[mt],T,b,s.COLOR_ATTACHMENT0,ht,mt);else rt(G.__webglFramebuffer,T,b,s.COLOR_ATTACHMENT0,ht,0);m(b)&&f(ht),e.unbindTexture()}T.depthBuffer&&Dt(T)}function Qt(T){const b=T.textures;for(let G=0,K=b.length;G<K;G++){const J=b[G];if(m(J)){const j=y(T),bt=i.get(J).__webglTexture;e.bindTexture(j,bt),f(j),e.unbindTexture()}}}const Se=[],H=[];function Ze(T){if(T.samples>0){if(Kt(T)===!1){const b=T.textures,G=T.width,K=T.height;let J=s.COLOR_BUFFER_BIT;const j=T.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,bt=i.get(T),ht=b.length>1;if(ht)for(let mt=0;mt<b.length;mt++)e.bindFramebuffer(s.FRAMEBUFFER,bt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+mt,s.RENDERBUFFER,null),e.bindFramebuffer(s.FRAMEBUFFER,bt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+mt,s.TEXTURE_2D,null,0);e.bindFramebuffer(s.READ_FRAMEBUFFER,bt.__webglMultisampledFramebuffer),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,bt.__webglFramebuffer);for(let mt=0;mt<b.length;mt++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(J|=s.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(J|=s.STENCIL_BUFFER_BIT)),ht){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,bt.__webglColorRenderbuffer[mt]);const te=i.get(b[mt]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,te,0)}s.blitFramebuffer(0,0,G,K,0,0,G,K,J,s.NEAREST),l===!0&&(Se.length=0,H.length=0,Se.push(s.COLOR_ATTACHMENT0+mt),T.depthBuffer&&T.resolveDepthBuffer===!1&&(Se.push(j),H.push(j),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,H)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,Se))}if(e.bindFramebuffer(s.READ_FRAMEBUFFER,null),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),ht)for(let mt=0;mt<b.length;mt++){e.bindFramebuffer(s.FRAMEBUFFER,bt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+mt,s.RENDERBUFFER,bt.__webglColorRenderbuffer[mt]);const te=i.get(b[mt]).__webglTexture;e.bindFramebuffer(s.FRAMEBUFFER,bt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+mt,s.TEXTURE_2D,te,0)}e.bindFramebuffer(s.DRAW_FRAMEBUFFER,bt.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.resolveDepthBuffer===!1&&l){const b=T.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[b])}}}function jt(T){return Math.min(n.maxSamples,T.samples)}function Kt(T){const b=i.get(T);return T.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function Ct(T){const b=a.render.frame;c.get(T)!==b&&(c.set(T,b),T.update())}function pe(T,b){const G=T.colorSpace,K=T.format,J=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||G!==ss&&G!==Yi&&(ee.getTransfer(G)===he?(K!==ri||J!==Ni)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",G)),b}function At(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(h.width=T.naturalWidth||T.width,h.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(h.width=T.displayWidth,h.height=T.displayHeight):(h.width=T.width,h.height=T.height),h}this.allocateTextureUnit=O,this.resetTextureUnits=V,this.setTexture2D=D,this.setTexture2DArray=U,this.setTexture3D=L,this.setTextureCube=B,this.rebindTextures=zt,this.setupRenderTarget=xe,this.updateRenderTargetMipmap=Qt,this.updateMultisampleRenderTarget=Ze,this.setupDepthRenderbuffer=Dt,this.setupFrameBufferTexture=rt,this.useMultisampledRTT=Kt}function $g(s,t){function e(i,n=Yi){let r;const a=ee.getTransfer(n);if(i===Ni)return s.UNSIGNED_BYTE;if(i===ko)return s.UNSIGNED_SHORT_4_4_4_4;if(i===Oo)return s.UNSIGNED_SHORT_5_5_5_1;if(i===$c)return s.UNSIGNED_INT_5_9_9_9_REV;if(i===Gc)return s.BYTE;if(i===Wc)return s.SHORT;if(i===Is)return s.UNSIGNED_SHORT;if(i===No)return s.INT;if(i===bn)return s.UNSIGNED_INT;if(i===_i)return s.FLOAT;if(i===Ns)return s.HALF_FLOAT;if(i===Xc)return s.ALPHA;if(i===qc)return s.RGB;if(i===ri)return s.RGBA;if(i===Yc)return s.LUMINANCE;if(i===jc)return s.LUMINANCE_ALPHA;if(i===jn)return s.DEPTH_COMPONENT;if(i===es)return s.DEPTH_STENCIL;if(i===Fo)return s.RED;if(i===zo)return s.RED_INTEGER;if(i===Kc)return s.RG;if(i===Bo)return s.RG_INTEGER;if(i===Ho)return s.RGBA_INTEGER;if(i===Mr||i===br||i===Sr||i===wr)if(a===he)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===Mr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===br)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Sr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===wr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===Mr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===br)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Sr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===wr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Ja||i===Qa||i===to||i===eo)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===Ja)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Qa)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===to)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===eo)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===io||i===no||i===so)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(i===io||i===no)return a===he?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===so)return a===he?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===ro||i===ao||i===oo||i===lo||i===co||i===ho||i===uo||i===fo||i===po||i===mo||i===go||i===vo||i===xo||i===yo)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(i===ro)return a===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===ao)return a===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===oo)return a===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===lo)return a===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===co)return a===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===ho)return a===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===uo)return a===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===fo)return a===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===po)return a===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===mo)return a===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===go)return a===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===vo)return a===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===xo)return a===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===yo)return a===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Er||i===_o||i===Mo)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(i===Er)return a===he?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===_o)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Mo)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Zc||i===bo||i===So||i===wo)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(i===Er)return r.COMPRESSED_RED_RGTC1_EXT;if(i===bo)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===So)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===wo)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===ts?s.UNSIGNED_INT_24_8:s[i]!==void 0?s[i]:null}return{convert:e}}class Xg extends ei{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class kt extends Te{constructor(){super(),this.isGroup=!0,this.type="Group"}}const qg={type:"move"};class Ma{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new kt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new kt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new C,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new C),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new kt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new C,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new C),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let n=null,r=null,a=null;const o=this._targetRay,l=this._grip,h=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(h&&t.hand){a=!0;for(const v of t.hand.values()){const m=e.getJointPose(v,i),f=this._getHandJoint(h,v);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}const c=h.joints["index-finger-tip"],u=h.joints["thumb-tip"],d=c.position.distanceTo(u.position),p=.02,g=.005;h.inputState.pinching&&d>p+g?(h.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!h.inputState.pinching&&d<=p-g&&(h.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(n=e.getPose(t.targetRaySpace,i),n===null&&r!==null&&(n=r),n!==null&&(o.matrix.fromArray(n.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,n.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(n.linearVelocity)):o.hasLinearVelocity=!1,n.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(n.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(qg)))}return o!==null&&(o.visible=n!==null),l!==null&&(l.visible=r!==null),h!==null&&(h.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const i=new kt;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}}const Yg=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,jg=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Kg{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,i){if(this.texture===null){const n=new ze,r=t.properties.get(n);r.__webglTexture=e.texture,(e.depthNear!=i.depthNear||e.depthFar!=i.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,i=new pi({vertexShader:Yg,fragmentShader:jg,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Yt(new ns(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Zg extends rs{constructor(t,e){super();const i=this;let n=null,r=1,a=null,o="local-floor",l=1,h=null,c=null,u=null,d=null,p=null,g=null;const v=new Kg,m=e.getContextAttributes();let f=null,y=null;const _=[],x=[],I=new xt;let A=null;const P=new ei;P.viewport=new be;const E=new ei;E.viewport=new be;const S=[P,E],M=new Xg;let R=null,V=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let tt=_[Y];return tt===void 0&&(tt=new Ma,_[Y]=tt),tt.getTargetRaySpace()},this.getControllerGrip=function(Y){let tt=_[Y];return tt===void 0&&(tt=new Ma,_[Y]=tt),tt.getGripSpace()},this.getHand=function(Y){let tt=_[Y];return tt===void 0&&(tt=new Ma,_[Y]=tt),tt.getHandSpace()};function O(Y){const tt=x.indexOf(Y.inputSource);if(tt===-1)return;const rt=_[tt];rt!==void 0&&(rt.update(Y.inputSource,Y.frame,h||a),rt.dispatchEvent({type:Y.type,data:Y.inputSource}))}function N(){n.removeEventListener("select",O),n.removeEventListener("selectstart",O),n.removeEventListener("selectend",O),n.removeEventListener("squeeze",O),n.removeEventListener("squeezestart",O),n.removeEventListener("squeezeend",O),n.removeEventListener("end",N),n.removeEventListener("inputsourceschange",D);for(let Y=0;Y<_.length;Y++){const tt=x[Y];tt!==null&&(x[Y]=null,_[Y].disconnect(tt))}R=null,V=null,v.reset(),t.setRenderTarget(f),p=null,d=null,u=null,n=null,y=null,qt.stop(),i.isPresenting=!1,t.setPixelRatio(A),t.setSize(I.width,I.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){r=Y,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){o=Y,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return h||a},this.setReferenceSpace=function(Y){h=Y},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return n},this.setSession=async function(Y){if(n=Y,n!==null){if(f=t.getRenderTarget(),n.addEventListener("select",O),n.addEventListener("selectstart",O),n.addEventListener("selectend",O),n.addEventListener("squeeze",O),n.addEventListener("squeezestart",O),n.addEventListener("squeezeend",O),n.addEventListener("end",N),n.addEventListener("inputsourceschange",D),m.xrCompatible!==!0&&await e.makeXRCompatible(),A=t.getPixelRatio(),t.getSize(I),n.renderState.layers===void 0){const tt={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(n,e,tt),n.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),y=new Sn(p.framebufferWidth,p.framebufferHeight,{format:ri,type:Ni,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let tt=null,rt=null,st=null;m.depth&&(st=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,tt=m.stencil?es:jn,rt=m.stencil?ts:bn);const Tt={colorFormat:e.RGBA8,depthFormat:st,scaleFactor:r};u=new XRWebGLBinding(n,e),d=u.createProjectionLayer(Tt),n.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),y=new Sn(d.textureWidth,d.textureHeight,{format:ri,type:Ni,depthTexture:new dh(d.textureWidth,d.textureHeight,rt,void 0,void 0,void 0,void 0,void 0,void 0,tt),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),h=null,a=await n.requestReferenceSpace(o),qt.setContext(n),qt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(n!==null)return n.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function D(Y){for(let tt=0;tt<Y.removed.length;tt++){const rt=Y.removed[tt],st=x.indexOf(rt);st>=0&&(x[st]=null,_[st].disconnect(rt))}for(let tt=0;tt<Y.added.length;tt++){const rt=Y.added[tt];let st=x.indexOf(rt);if(st===-1){for(let Dt=0;Dt<_.length;Dt++)if(Dt>=x.length){x.push(rt),st=Dt;break}else if(x[Dt]===null){x[Dt]=rt,st=Dt;break}if(st===-1)break}const Tt=_[st];Tt&&Tt.connect(rt)}}const U=new C,L=new C;function B(Y,tt,rt){U.setFromMatrixPosition(tt.matrixWorld),L.setFromMatrixPosition(rt.matrixWorld);const st=U.distanceTo(L),Tt=tt.projectionMatrix.elements,Dt=rt.projectionMatrix.elements,zt=Tt[14]/(Tt[10]-1),xe=Tt[14]/(Tt[10]+1),Qt=(Tt[9]+1)/Tt[5],Se=(Tt[9]-1)/Tt[5],H=(Tt[8]-1)/Tt[0],Ze=(Dt[8]+1)/Dt[0],jt=zt*H,Kt=zt*Ze,Ct=st/(-H+Ze),pe=Ct*-H;if(tt.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(pe),Y.translateZ(Ct),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert(),Tt[10]===-1)Y.projectionMatrix.copy(tt.projectionMatrix),Y.projectionMatrixInverse.copy(tt.projectionMatrixInverse);else{const At=zt+Ct,T=xe+Ct,b=jt-pe,G=Kt+(st-pe),K=Qt*xe/T*At,J=Se*xe/T*At;Y.projectionMatrix.makePerspective(b,G,K,J,At,T),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}}function q(Y,tt){tt===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(tt.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(n===null)return;let tt=Y.near,rt=Y.far;v.texture!==null&&(v.depthNear>0&&(tt=v.depthNear),v.depthFar>0&&(rt=v.depthFar)),M.near=E.near=P.near=tt,M.far=E.far=P.far=rt,(R!==M.near||V!==M.far)&&(n.updateRenderState({depthNear:M.near,depthFar:M.far}),R=M.near,V=M.far),P.layers.mask=Y.layers.mask|2,E.layers.mask=Y.layers.mask|4,M.layers.mask=P.layers.mask|E.layers.mask;const st=Y.parent,Tt=M.cameras;q(M,st);for(let Dt=0;Dt<Tt.length;Dt++)q(Tt[Dt],st);Tt.length===2?B(M,P,E):M.projectionMatrix.copy(P.projectionMatrix),Q(Y,M,st)};function Q(Y,tt,rt){rt===null?Y.matrix.copy(tt.matrixWorld):(Y.matrix.copy(rt.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(tt.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(tt.projectionMatrix),Y.projectionMatrixInverse.copy(tt.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=Ds*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(d===null&&p===null))return l},this.setFoveation=function(Y){l=Y,d!==null&&(d.fixedFoveation=Y),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=Y)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(M)};let et=null;function pt(Y,tt){if(c=tt.getViewerPose(h||a),g=tt,c!==null){const rt=c.views;p!==null&&(t.setRenderTargetFramebuffer(y,p.framebuffer),t.setRenderTarget(y));let st=!1;rt.length!==M.cameras.length&&(M.cameras.length=0,st=!0);for(let Dt=0;Dt<rt.length;Dt++){const zt=rt[Dt];let xe=null;if(p!==null)xe=p.getViewport(zt);else{const Se=u.getViewSubImage(d,zt);xe=Se.viewport,Dt===0&&(t.setRenderTargetTextures(y,Se.colorTexture,d.ignoreDepthValues?void 0:Se.depthStencilTexture),t.setRenderTarget(y))}let Qt=S[Dt];Qt===void 0&&(Qt=new ei,Qt.layers.enable(Dt),Qt.viewport=new be,S[Dt]=Qt),Qt.matrix.fromArray(zt.transform.matrix),Qt.matrix.decompose(Qt.position,Qt.quaternion,Qt.scale),Qt.projectionMatrix.fromArray(zt.projectionMatrix),Qt.projectionMatrixInverse.copy(Qt.projectionMatrix).invert(),Qt.viewport.set(xe.x,xe.y,xe.width,xe.height),Dt===0&&(M.matrix.copy(Qt.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),st===!0&&M.cameras.push(Qt)}const Tt=n.enabledFeatures;if(Tt&&Tt.includes("depth-sensing")){const Dt=u.getDepthInformation(rt[0]);Dt&&Dt.isValid&&Dt.texture&&v.init(t,Dt,n.renderState)}}for(let rt=0;rt<_.length;rt++){const st=x[rt],Tt=_[rt];st!==null&&Tt!==void 0&&Tt.update(st,tt,h||a)}et&&et(Y,tt),tt.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:tt}),g=null}const qt=new ch;qt.setAnimationLoop(pt),this.setAnimationLoop=function(Y){et=Y},this.dispose=function(){}}}const hn=new Mi,Jg=new ne;function Qg(s,t){function e(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function i(m,f){f.color.getRGB(m.fogColor.value,ah(s)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function n(m,f,y,_,x){f.isMeshBasicMaterial||f.isMeshLambertMaterial?r(m,f):f.isMeshToonMaterial?(r(m,f),u(m,f)):f.isMeshPhongMaterial?(r(m,f),c(m,f)):f.isMeshStandardMaterial?(r(m,f),d(m,f),f.isMeshPhysicalMaterial&&p(m,f,x)):f.isMeshMatcapMaterial?(r(m,f),g(m,f)):f.isMeshDepthMaterial?r(m,f):f.isMeshDistanceMaterial?(r(m,f),v(m,f)):f.isMeshNormalMaterial?r(m,f):f.isLineBasicMaterial?(a(m,f),f.isLineDashedMaterial&&o(m,f)):f.isPointsMaterial?l(m,f,y,_):f.isSpriteMaterial?h(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,e(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,e(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===We&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,e(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===We&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,e(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,e(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,e(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);const y=t.get(f),_=y.envMap,x=y.envMapRotation;_&&(m.envMap.value=_,hn.copy(x),hn.x*=-1,hn.y*=-1,hn.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(hn.y*=-1,hn.z*=-1),m.envMapRotation.value.setFromMatrix4(Jg.makeRotationFromEuler(hn)),m.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,e(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,e(f.aoMap,m.aoMapTransform))}function a(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,e(f.map,m.mapTransform))}function o(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function l(m,f,y,_){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*y,m.scale.value=_*.5,f.map&&(m.map.value=f.map,e(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function h(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,e(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function c(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function u(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function d(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,e(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,e(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,y){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,e(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,e(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,e(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,e(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,e(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===We&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,e(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,e(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=y.texture,m.transmissionSamplerSize.value.set(y.width,y.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,e(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,e(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,e(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,e(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,e(f.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,f){f.matcap&&(m.matcap.value=f.matcap)}function v(m,f){const y=t.get(f).light;m.referencePosition.value.setFromMatrixPosition(y.matrixWorld),m.nearDistance.value=y.shadow.camera.near,m.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:n}}function t0(s,t,e,i){let n={},r={},a=[];const o=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function l(y,_){const x=_.program;i.uniformBlockBinding(y,x)}function h(y,_){let x=n[y.id];x===void 0&&(g(y),x=c(y),n[y.id]=x,y.addEventListener("dispose",m));const I=_.program;i.updateUBOMapping(y,I);const A=t.render.frame;r[y.id]!==A&&(d(y),r[y.id]=A)}function c(y){const _=u();y.__bindingPointIndex=_;const x=s.createBuffer(),I=y.__size,A=y.usage;return s.bindBuffer(s.UNIFORM_BUFFER,x),s.bufferData(s.UNIFORM_BUFFER,I,A),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,_,x),x}function u(){for(let y=0;y<o;y++)if(a.indexOf(y)===-1)return a.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(y){const _=n[y.id],x=y.uniforms,I=y.__cache;s.bindBuffer(s.UNIFORM_BUFFER,_);for(let A=0,P=x.length;A<P;A++){const E=Array.isArray(x[A])?x[A]:[x[A]];for(let S=0,M=E.length;S<M;S++){const R=E[S];if(p(R,A,S,I)===!0){const V=R.__offset,O=Array.isArray(R.value)?R.value:[R.value];let N=0;for(let D=0;D<O.length;D++){const U=O[D],L=v(U);typeof U=="number"||typeof U=="boolean"?(R.__data[0]=U,s.bufferSubData(s.UNIFORM_BUFFER,V+N,R.__data)):U.isMatrix3?(R.__data[0]=U.elements[0],R.__data[1]=U.elements[1],R.__data[2]=U.elements[2],R.__data[3]=0,R.__data[4]=U.elements[3],R.__data[5]=U.elements[4],R.__data[6]=U.elements[5],R.__data[7]=0,R.__data[8]=U.elements[6],R.__data[9]=U.elements[7],R.__data[10]=U.elements[8],R.__data[11]=0):(U.toArray(R.__data,N),N+=L.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,V,R.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function p(y,_,x,I){const A=y.value,P=_+"_"+x;if(I[P]===void 0)return typeof A=="number"||typeof A=="boolean"?I[P]=A:I[P]=A.clone(),!0;{const E=I[P];if(typeof A=="number"||typeof A=="boolean"){if(E!==A)return I[P]=A,!0}else if(E.equals(A)===!1)return E.copy(A),!0}return!1}function g(y){const _=y.uniforms;let x=0;const I=16;for(let P=0,E=_.length;P<E;P++){const S=Array.isArray(_[P])?_[P]:[_[P]];for(let M=0,R=S.length;M<R;M++){const V=S[M],O=Array.isArray(V.value)?V.value:[V.value];for(let N=0,D=O.length;N<D;N++){const U=O[N],L=v(U),B=x%I,q=B%L.boundary,Q=B+q;x+=q,Q!==0&&I-Q<L.storage&&(x+=I-Q),V.__data=new Float32Array(L.storage/Float32Array.BYTES_PER_ELEMENT),V.__offset=x,x+=L.storage}}}const A=x%I;return A>0&&(x+=I-A),y.__size=x,y.__cache={},this}function v(y){const _={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(_.boundary=4,_.storage=4):y.isVector2?(_.boundary=8,_.storage=8):y.isVector3||y.isColor?(_.boundary=16,_.storage=12):y.isVector4?(_.boundary=16,_.storage=16):y.isMatrix3?(_.boundary=48,_.storage=48):y.isMatrix4?(_.boundary=64,_.storage=64):y.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",y),_}function m(y){const _=y.target;_.removeEventListener("dispose",m);const x=a.indexOf(_.__bindingPointIndex);a.splice(x,1),s.deleteBuffer(n[_.id]),delete n[_.id],delete r[_.id]}function f(){for(const y in n)s.deleteBuffer(n[y]);a=[],n={},r={}}return{bind:l,update:h,dispose:f}}class e0{constructor(t={}){const{canvas:e=Vd(),context:i=null,depth:n=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:h=!1,powerPreference:c="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:d=!1}=t;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=a;const g=new Uint32Array(4),v=new Int32Array(4);let m=null,f=null;const y=[],_=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Ge,this.toneMapping=Zi,this.toneMappingExposure=1;const x=this;let I=!1,A=0,P=0,E=null,S=-1,M=null;const R=new be,V=new be;let O=null;const N=new Et(0);let D=0,U=e.width,L=e.height,B=1,q=null,Q=null;const et=new be(0,0,U,L),pt=new be(0,0,U,L);let qt=!1;const Y=new Br;let tt=!1,rt=!1;const st=new ne,Tt=new ne,Dt=new C,zt=new be,xe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Qt=!1;function Se(){return E===null?B:1}let H=i;function Ze(w,F){return e.getContext(w,F)}try{const w={alpha:!0,depth:n,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:h,powerPreference:c,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Uo}`),e.addEventListener("webglcontextlost",Z,!1),e.addEventListener("webglcontextrestored",ft,!1),e.addEventListener("webglcontextcreationerror",dt,!1),H===null){const F="webgl2";if(H=Ze(F,w),H===null)throw Ze(F)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(w){throw console.error("THREE.WebGLRenderer: "+w.message),w}let jt,Kt,Ct,pe,At,T,b,G,K,J,j,bt,ht,mt,te,it,gt,It,Ut,vt,Zt,Gt,ue,k;function ct(){jt=new am(H),jt.init(),Gt=new $g(H,jt),Kt=new tm(H,jt,t,Gt),Ct=new Vg(H,jt),Kt.reverseDepthBuffer&&d&&Ct.buffers.depth.setReversed(!0),pe=new cm(H),At=new Ag,T=new Wg(H,jt,Ct,At,Kt,Gt,pe),b=new im(x),G=new rm(x),K=new mu(H),ue=new Jp(H,K),J=new om(H,K,pe,ue),j=new dm(H,J,K,pe),Ut=new hm(H,Kt,T),it=new em(At),bt=new Tg(x,b,G,jt,Kt,ue,it),ht=new Qg(x,At),mt=new Cg,te=new Ng(jt),It=new Zp(x,b,G,Ct,j,p,l),gt=new Bg(x,j,Kt),k=new t0(H,pe,Kt,Ct),vt=new Qp(H,jt,pe),Zt=new lm(H,jt,pe),pe.programs=bt.programs,x.capabilities=Kt,x.extensions=jt,x.properties=At,x.renderLists=mt,x.shadowMap=gt,x.state=Ct,x.info=pe}ct();const X=new Zg(x,H);this.xr=X,this.getContext=function(){return H},this.getContextAttributes=function(){return H.getContextAttributes()},this.forceContextLoss=function(){const w=jt.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){const w=jt.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return B},this.setPixelRatio=function(w){w!==void 0&&(B=w,this.setSize(U,L,!1))},this.getSize=function(w){return w.set(U,L)},this.setSize=function(w,F,W=!0){if(X.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}U=w,L=F,e.width=Math.floor(w*B),e.height=Math.floor(F*B),W===!0&&(e.style.width=w+"px",e.style.height=F+"px"),this.setViewport(0,0,w,F)},this.getDrawingBufferSize=function(w){return w.set(U*B,L*B).floor()},this.setDrawingBufferSize=function(w,F,W){U=w,L=F,B=W,e.width=Math.floor(w*W),e.height=Math.floor(F*W),this.setViewport(0,0,w,F)},this.getCurrentViewport=function(w){return w.copy(R)},this.getViewport=function(w){return w.copy(et)},this.setViewport=function(w,F,W,$){w.isVector4?et.set(w.x,w.y,w.z,w.w):et.set(w,F,W,$),Ct.viewport(R.copy(et).multiplyScalar(B).round())},this.getScissor=function(w){return w.copy(pt)},this.setScissor=function(w,F,W,$){w.isVector4?pt.set(w.x,w.y,w.z,w.w):pt.set(w,F,W,$),Ct.scissor(V.copy(pt).multiplyScalar(B).round())},this.getScissorTest=function(){return qt},this.setScissorTest=function(w){Ct.setScissorTest(qt=w)},this.setOpaqueSort=function(w){q=w},this.setTransparentSort=function(w){Q=w},this.getClearColor=function(w){return w.copy(It.getClearColor())},this.setClearColor=function(){It.setClearColor.apply(It,arguments)},this.getClearAlpha=function(){return It.getClearAlpha()},this.setClearAlpha=function(){It.setClearAlpha.apply(It,arguments)},this.clear=function(w=!0,F=!0,W=!0){let $=0;if(w){let z=!1;if(E!==null){const nt=E.texture.format;z=nt===Ho||nt===Bo||nt===zo}if(z){const nt=E.texture.type,ut=nt===Ni||nt===bn||nt===Is||nt===ts||nt===ko||nt===Oo,yt=It.getClearColor(),_t=It.getClearAlpha(),Ot=yt.r,Ht=yt.g,Mt=yt.b;ut?(g[0]=Ot,g[1]=Ht,g[2]=Mt,g[3]=_t,H.clearBufferuiv(H.COLOR,0,g)):(v[0]=Ot,v[1]=Ht,v[2]=Mt,v[3]=_t,H.clearBufferiv(H.COLOR,0,v))}else $|=H.COLOR_BUFFER_BIT}F&&($|=H.DEPTH_BUFFER_BIT),W&&($|=H.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),H.clear($)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",Z,!1),e.removeEventListener("webglcontextrestored",ft,!1),e.removeEventListener("webglcontextcreationerror",dt,!1),mt.dispose(),te.dispose(),At.dispose(),b.dispose(),G.dispose(),j.dispose(),ue.dispose(),k.dispose(),bt.dispose(),X.dispose(),X.removeEventListener("sessionstart",tl),X.removeEventListener("sessionend",el),sn.stop()};function Z(w){w.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),I=!0}function ft(){console.log("THREE.WebGLRenderer: Context Restored."),I=!1;const w=pe.autoReset,F=gt.enabled,W=gt.autoUpdate,$=gt.needsUpdate,z=gt.type;ct(),pe.autoReset=w,gt.enabled=F,gt.autoUpdate=W,gt.needsUpdate=$,gt.type=z}function dt(w){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function Bt(w){const F=w.target;F.removeEventListener("dispose",Bt),_e(F)}function _e(w){ke(w),At.remove(w)}function ke(w){const F=At.get(w).programs;F!==void 0&&(F.forEach(function(W){bt.releaseProgram(W)}),w.isShaderMaterial&&bt.releaseShaderCache(w))}this.renderBufferDirect=function(w,F,W,$,z,nt){F===null&&(F=xe);const ut=z.isMesh&&z.matrixWorld.determinant()<0,yt=Fh(w,F,W,$,z);Ct.setMaterial($,ut);let _t=W.index,Ot=1;if($.wireframe===!0){if(_t=J.getWireframeAttribute(W),_t===void 0)return;Ot=2}const Ht=W.drawRange,Mt=W.attributes.position;let ie=Ht.start*Ot,fe=(Ht.start+Ht.count)*Ot;nt!==null&&(ie=Math.max(ie,nt.start*Ot),fe=Math.min(fe,(nt.start+nt.count)*Ot)),_t!==null?(ie=Math.max(ie,0),fe=Math.min(fe,_t.count)):Mt!=null&&(ie=Math.max(ie,0),fe=Math.min(fe,Mt.count));const me=fe-ie;if(me<0||me===1/0)return;ue.setup(z,$,yt,W,_t);let $e,re=vt;if(_t!==null&&($e=K.get(_t),re=Zt,re.setIndex($e)),z.isMesh)$.wireframe===!0?(Ct.setLineWidth($.wireframeLinewidth*Se()),re.setMode(H.LINES)):re.setMode(H.TRIANGLES);else if(z.isLine){let St=$.linewidth;St===void 0&&(St=1),Ct.setLineWidth(St*Se()),z.isLineSegments?re.setMode(H.LINES):z.isLineLoop?re.setMode(H.LINE_LOOP):re.setMode(H.LINE_STRIP)}else z.isPoints?re.setMode(H.POINTS):z.isSprite&&re.setMode(H.TRIANGLES);if(z.isBatchedMesh)if(z._multiDrawInstances!==null)re.renderMultiDrawInstances(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount,z._multiDrawInstances);else if(jt.get("WEBGL_multi_draw"))re.renderMultiDraw(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount);else{const St=z._multiDrawStarts,wi=z._multiDrawCounts,ae=z._multiDrawCount,li=_t?K.get(_t).bytesPerElement:1,En=At.get($).currentProgram.getUniforms();for(let Xe=0;Xe<ae;Xe++)En.setValue(H,"_gl_DrawID",Xe),re.render(St[Xe]/li,wi[Xe])}else if(z.isInstancedMesh)re.renderInstances(ie,me,z.count);else if(W.isInstancedBufferGeometry){const St=W._maxInstanceCount!==void 0?W._maxInstanceCount:1/0,wi=Math.min(W.instanceCount,St);re.renderInstances(ie,me,wi)}else re.render(ie,me)};function oe(w,F,W){w.transparent===!0&&w.side===Ne&&w.forceSinglePass===!1?(w.side=We,w.needsUpdate=!0,zs(w,F,W),w.side=Qi,w.needsUpdate=!0,zs(w,F,W),w.side=Ne):zs(w,F,W)}this.compile=function(w,F,W=null){W===null&&(W=w),f=te.get(W),f.init(F),_.push(f),W.traverseVisible(function(z){z.isLight&&z.layers.test(F.layers)&&(f.pushLight(z),z.castShadow&&f.pushShadow(z))}),w!==W&&w.traverseVisible(function(z){z.isLight&&z.layers.test(F.layers)&&(f.pushLight(z),z.castShadow&&f.pushShadow(z))}),f.setupLights();const $=new Set;return w.traverse(function(z){if(!(z.isMesh||z.isPoints||z.isLine||z.isSprite))return;const nt=z.material;if(nt)if(Array.isArray(nt))for(let ut=0;ut<nt.length;ut++){const yt=nt[ut];oe(yt,W,z),$.add(yt)}else oe(nt,W,z),$.add(nt)}),_.pop(),f=null,$},this.compileAsync=function(w,F,W=null){const $=this.compile(w,F,W);return new Promise(z=>{function nt(){if($.forEach(function(ut){At.get(ut).currentProgram.isReady()&&$.delete(ut)}),$.size===0){z(w);return}setTimeout(nt,10)}jt.get("KHR_parallel_shader_compile")!==null?nt():setTimeout(nt,10)})};let oi=null;function Si(w){oi&&oi(w)}function tl(){sn.stop()}function el(){sn.start()}const sn=new ch;sn.setAnimationLoop(Si),typeof self<"u"&&sn.setContext(self),this.setAnimationLoop=function(w){oi=w,X.setAnimationLoop(w),w===null?sn.stop():sn.start()},X.addEventListener("sessionstart",tl),X.addEventListener("sessionend",el),this.render=function(w,F){if(F!==void 0&&F.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(I===!0)return;if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),X.enabled===!0&&X.isPresenting===!0&&(X.cameraAutoUpdate===!0&&X.updateCamera(F),F=X.getCamera()),w.isScene===!0&&w.onBeforeRender(x,w,F,E),f=te.get(w,_.length),f.init(F),_.push(f),Tt.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),Y.setFromProjectionMatrix(Tt),rt=this.localClippingEnabled,tt=it.init(this.clippingPlanes,rt),m=mt.get(w,y.length),m.init(),y.push(m),X.enabled===!0&&X.isPresenting===!0){const nt=x.xr.getDepthSensingMesh();nt!==null&&qr(nt,F,-1/0,x.sortObjects)}qr(w,F,0,x.sortObjects),m.finish(),x.sortObjects===!0&&m.sort(q,Q),Qt=X.enabled===!1||X.isPresenting===!1||X.hasDepthSensing()===!1,Qt&&It.addToRenderList(m,w),this.info.render.frame++,tt===!0&&it.beginShadows();const W=f.state.shadowsArray;gt.render(W,w,F),tt===!0&&it.endShadows(),this.info.autoReset===!0&&this.info.reset();const $=m.opaque,z=m.transmissive;if(f.setupLights(),F.isArrayCamera){const nt=F.cameras;if(z.length>0)for(let ut=0,yt=nt.length;ut<yt;ut++){const _t=nt[ut];nl($,z,w,_t)}Qt&&It.render(w);for(let ut=0,yt=nt.length;ut<yt;ut++){const _t=nt[ut];il(m,w,_t,_t.viewport)}}else z.length>0&&nl($,z,w,F),Qt&&It.render(w),il(m,w,F);E!==null&&(T.updateMultisampleRenderTarget(E),T.updateRenderTargetMipmap(E)),w.isScene===!0&&w.onAfterRender(x,w,F),ue.resetDefaultState(),S=-1,M=null,_.pop(),_.length>0?(f=_[_.length-1],tt===!0&&it.setGlobalState(x.clippingPlanes,f.state.camera)):f=null,y.pop(),y.length>0?m=y[y.length-1]:m=null};function qr(w,F,W,$){if(w.visible===!1)return;if(w.layers.test(F.layers)){if(w.isGroup)W=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(F);else if(w.isLight)f.pushLight(w),w.castShadow&&f.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||Y.intersectsSprite(w)){$&&zt.setFromMatrixPosition(w.matrixWorld).applyMatrix4(Tt);const ut=j.update(w),yt=w.material;yt.visible&&m.push(w,ut,yt,W,zt.z,null)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||Y.intersectsObject(w))){const ut=j.update(w),yt=w.material;if($&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),zt.copy(w.boundingSphere.center)):(ut.boundingSphere===null&&ut.computeBoundingSphere(),zt.copy(ut.boundingSphere.center)),zt.applyMatrix4(w.matrixWorld).applyMatrix4(Tt)),Array.isArray(yt)){const _t=ut.groups;for(let Ot=0,Ht=_t.length;Ot<Ht;Ot++){const Mt=_t[Ot],ie=yt[Mt.materialIndex];ie&&ie.visible&&m.push(w,ut,ie,W,zt.z,Mt)}}else yt.visible&&m.push(w,ut,yt,W,zt.z,null)}}const nt=w.children;for(let ut=0,yt=nt.length;ut<yt;ut++)qr(nt[ut],F,W,$)}function il(w,F,W,$){const z=w.opaque,nt=w.transmissive,ut=w.transparent;f.setupLightsView(W),tt===!0&&it.setGlobalState(x.clippingPlanes,W),$&&Ct.viewport(R.copy($)),z.length>0&&Fs(z,F,W),nt.length>0&&Fs(nt,F,W),ut.length>0&&Fs(ut,F,W),Ct.buffers.depth.setTest(!0),Ct.buffers.depth.setMask(!0),Ct.buffers.color.setMask(!0),Ct.setPolygonOffset(!1)}function nl(w,F,W,$){if((W.isScene===!0?W.overrideMaterial:null)!==null)return;f.state.transmissionRenderTarget[$.id]===void 0&&(f.state.transmissionRenderTarget[$.id]=new Sn(1,1,{generateMipmaps:!0,type:jt.has("EXT_color_buffer_half_float")||jt.has("EXT_color_buffer_float")?Ns:Ni,minFilter:xn,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ee.workingColorSpace}));const nt=f.state.transmissionRenderTarget[$.id],ut=$.viewport||R;nt.setSize(ut.z,ut.w);const yt=x.getRenderTarget();x.setRenderTarget(nt),x.getClearColor(N),D=x.getClearAlpha(),D<1&&x.setClearColor(16777215,.5),x.clear(),Qt&&It.render(W);const _t=x.toneMapping;x.toneMapping=Zi;const Ot=$.viewport;if($.viewport!==void 0&&($.viewport=void 0),f.setupLightsView($),tt===!0&&it.setGlobalState(x.clippingPlanes,$),Fs(w,W,$),T.updateMultisampleRenderTarget(nt),T.updateRenderTargetMipmap(nt),jt.has("WEBGL_multisampled_render_to_texture")===!1){let Ht=!1;for(let Mt=0,ie=F.length;Mt<ie;Mt++){const fe=F[Mt],me=fe.object,$e=fe.geometry,re=fe.material,St=fe.group;if(re.side===Ne&&me.layers.test($.layers)){const wi=re.side;re.side=We,re.needsUpdate=!0,sl(me,W,$,$e,re,St),re.side=wi,re.needsUpdate=!0,Ht=!0}}Ht===!0&&(T.updateMultisampleRenderTarget(nt),T.updateRenderTargetMipmap(nt))}x.setRenderTarget(yt),x.setClearColor(N,D),Ot!==void 0&&($.viewport=Ot),x.toneMapping=_t}function Fs(w,F,W){const $=F.isScene===!0?F.overrideMaterial:null;for(let z=0,nt=w.length;z<nt;z++){const ut=w[z],yt=ut.object,_t=ut.geometry,Ot=$===null?ut.material:$,Ht=ut.group;yt.layers.test(W.layers)&&sl(yt,F,W,_t,Ot,Ht)}}function sl(w,F,W,$,z,nt){w.onBeforeRender(x,F,W,$,z,nt),w.modelViewMatrix.multiplyMatrices(W.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),z.onBeforeRender(x,F,W,$,w,nt),z.transparent===!0&&z.side===Ne&&z.forceSinglePass===!1?(z.side=We,z.needsUpdate=!0,x.renderBufferDirect(W,F,$,z,w,nt),z.side=Qi,z.needsUpdate=!0,x.renderBufferDirect(W,F,$,z,w,nt),z.side=Ne):x.renderBufferDirect(W,F,$,z,w,nt),w.onAfterRender(x,F,W,$,z,nt)}function zs(w,F,W){F.isScene!==!0&&(F=xe);const $=At.get(w),z=f.state.lights,nt=f.state.shadowsArray,ut=z.state.version,yt=bt.getParameters(w,z.state,nt,F,W),_t=bt.getProgramCacheKey(yt);let Ot=$.programs;$.environment=w.isMeshStandardMaterial?F.environment:null,$.fog=F.fog,$.envMap=(w.isMeshStandardMaterial?G:b).get(w.envMap||$.environment),$.envMapRotation=$.environment!==null&&w.envMap===null?F.environmentRotation:w.envMapRotation,Ot===void 0&&(w.addEventListener("dispose",Bt),Ot=new Map,$.programs=Ot);let Ht=Ot.get(_t);if(Ht!==void 0){if($.currentProgram===Ht&&$.lightsStateVersion===ut)return al(w,yt),Ht}else yt.uniforms=bt.getUniforms(w),w.onBeforeCompile(yt,x),Ht=bt.acquireProgram(yt,_t),Ot.set(_t,Ht),$.uniforms=yt.uniforms;const Mt=$.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(Mt.clippingPlanes=it.uniform),al(w,yt),$.needsLights=Bh(w),$.lightsStateVersion=ut,$.needsLights&&(Mt.ambientLightColor.value=z.state.ambient,Mt.lightProbe.value=z.state.probe,Mt.directionalLights.value=z.state.directional,Mt.directionalLightShadows.value=z.state.directionalShadow,Mt.spotLights.value=z.state.spot,Mt.spotLightShadows.value=z.state.spotShadow,Mt.rectAreaLights.value=z.state.rectArea,Mt.ltc_1.value=z.state.rectAreaLTC1,Mt.ltc_2.value=z.state.rectAreaLTC2,Mt.pointLights.value=z.state.point,Mt.pointLightShadows.value=z.state.pointShadow,Mt.hemisphereLights.value=z.state.hemi,Mt.directionalShadowMap.value=z.state.directionalShadowMap,Mt.directionalShadowMatrix.value=z.state.directionalShadowMatrix,Mt.spotShadowMap.value=z.state.spotShadowMap,Mt.spotLightMatrix.value=z.state.spotLightMatrix,Mt.spotLightMap.value=z.state.spotLightMap,Mt.pointShadowMap.value=z.state.pointShadowMap,Mt.pointShadowMatrix.value=z.state.pointShadowMatrix),$.currentProgram=Ht,$.uniformsList=null,Ht}function rl(w){if(w.uniformsList===null){const F=w.currentProgram.getUniforms();w.uniformsList=Tr.seqWithValue(F.seq,w.uniforms)}return w.uniformsList}function al(w,F){const W=At.get(w);W.outputColorSpace=F.outputColorSpace,W.batching=F.batching,W.batchingColor=F.batchingColor,W.instancing=F.instancing,W.instancingColor=F.instancingColor,W.instancingMorph=F.instancingMorph,W.skinning=F.skinning,W.morphTargets=F.morphTargets,W.morphNormals=F.morphNormals,W.morphColors=F.morphColors,W.morphTargetsCount=F.morphTargetsCount,W.numClippingPlanes=F.numClippingPlanes,W.numIntersection=F.numClipIntersection,W.vertexAlphas=F.vertexAlphas,W.vertexTangents=F.vertexTangents,W.toneMapping=F.toneMapping}function Fh(w,F,W,$,z){F.isScene!==!0&&(F=xe),T.resetTextureUnits();const nt=F.fog,ut=$.isMeshStandardMaterial?F.environment:null,yt=E===null?x.outputColorSpace:E.isXRRenderTarget===!0?E.texture.colorSpace:ss,_t=($.isMeshStandardMaterial?G:b).get($.envMap||ut),Ot=$.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,Ht=!!W.attributes.tangent&&(!!$.normalMap||$.anisotropy>0),Mt=!!W.morphAttributes.position,ie=!!W.morphAttributes.normal,fe=!!W.morphAttributes.color;let me=Zi;$.toneMapped&&(E===null||E.isXRRenderTarget===!0)&&(me=x.toneMapping);const $e=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,re=$e!==void 0?$e.length:0,St=At.get($),wi=f.state.lights;if(tt===!0&&(rt===!0||w!==M)){const Je=w===M&&$.id===S;it.setState($,w,Je)}let ae=!1;$.version===St.__version?(St.needsLights&&St.lightsStateVersion!==wi.state.version||St.outputColorSpace!==yt||z.isBatchedMesh&&St.batching===!1||!z.isBatchedMesh&&St.batching===!0||z.isBatchedMesh&&St.batchingColor===!0&&z.colorTexture===null||z.isBatchedMesh&&St.batchingColor===!1&&z.colorTexture!==null||z.isInstancedMesh&&St.instancing===!1||!z.isInstancedMesh&&St.instancing===!0||z.isSkinnedMesh&&St.skinning===!1||!z.isSkinnedMesh&&St.skinning===!0||z.isInstancedMesh&&St.instancingColor===!0&&z.instanceColor===null||z.isInstancedMesh&&St.instancingColor===!1&&z.instanceColor!==null||z.isInstancedMesh&&St.instancingMorph===!0&&z.morphTexture===null||z.isInstancedMesh&&St.instancingMorph===!1&&z.morphTexture!==null||St.envMap!==_t||$.fog===!0&&St.fog!==nt||St.numClippingPlanes!==void 0&&(St.numClippingPlanes!==it.numPlanes||St.numIntersection!==it.numIntersection)||St.vertexAlphas!==Ot||St.vertexTangents!==Ht||St.morphTargets!==Mt||St.morphNormals!==ie||St.morphColors!==fe||St.toneMapping!==me||St.morphTargetsCount!==re)&&(ae=!0):(ae=!0,St.__version=$.version);let li=St.currentProgram;ae===!0&&(li=zs($,F,z));let En=!1,Xe=!1,ls=!1;const ge=li.getUniforms(),mi=St.uniforms;if(Ct.useProgram(li.program)&&(En=!0,Xe=!0,ls=!0),$.id!==S&&(S=$.id,Xe=!0),En||M!==w){Ct.buffers.depth.getReversed()?(st.copy(w.projectionMatrix),Wd(st),$d(st),ge.setValue(H,"projectionMatrix",st)):ge.setValue(H,"projectionMatrix",w.projectionMatrix),ge.setValue(H,"viewMatrix",w.matrixWorldInverse);const Fi=ge.map.cameraPosition;Fi!==void 0&&Fi.setValue(H,Dt.setFromMatrixPosition(w.matrixWorld)),Kt.logarithmicDepthBuffer&&ge.setValue(H,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),($.isMeshPhongMaterial||$.isMeshToonMaterial||$.isMeshLambertMaterial||$.isMeshBasicMaterial||$.isMeshStandardMaterial||$.isShaderMaterial)&&ge.setValue(H,"isOrthographic",w.isOrthographicCamera===!0),M!==w&&(M=w,Xe=!0,ls=!0)}if(z.isSkinnedMesh){ge.setOptional(H,z,"bindMatrix"),ge.setOptional(H,z,"bindMatrixInverse");const Je=z.skeleton;Je&&(Je.boneTexture===null&&Je.computeBoneTexture(),ge.setValue(H,"boneTexture",Je.boneTexture,T))}z.isBatchedMesh&&(ge.setOptional(H,z,"batchingTexture"),ge.setValue(H,"batchingTexture",z._matricesTexture,T),ge.setOptional(H,z,"batchingIdTexture"),ge.setValue(H,"batchingIdTexture",z._indirectTexture,T),ge.setOptional(H,z,"batchingColorTexture"),z._colorsTexture!==null&&ge.setValue(H,"batchingColorTexture",z._colorsTexture,T));const cs=W.morphAttributes;if((cs.position!==void 0||cs.normal!==void 0||cs.color!==void 0)&&Ut.update(z,W,li),(Xe||St.receiveShadow!==z.receiveShadow)&&(St.receiveShadow=z.receiveShadow,ge.setValue(H,"receiveShadow",z.receiveShadow)),$.isMeshGouraudMaterial&&$.envMap!==null&&(mi.envMap.value=_t,mi.flipEnvMap.value=_t.isCubeTexture&&_t.isRenderTargetTexture===!1?-1:1),$.isMeshStandardMaterial&&$.envMap===null&&F.environment!==null&&(mi.envMapIntensity.value=F.environmentIntensity),Xe&&(ge.setValue(H,"toneMappingExposure",x.toneMappingExposure),St.needsLights&&zh(mi,ls),nt&&$.fog===!0&&ht.refreshFogUniforms(mi,nt),ht.refreshMaterialUniforms(mi,$,B,L,f.state.transmissionRenderTarget[w.id]),Tr.upload(H,rl(St),mi,T)),$.isShaderMaterial&&$.uniformsNeedUpdate===!0&&(Tr.upload(H,rl(St),mi,T),$.uniformsNeedUpdate=!1),$.isSpriteMaterial&&ge.setValue(H,"center",z.center),ge.setValue(H,"modelViewMatrix",z.modelViewMatrix),ge.setValue(H,"normalMatrix",z.normalMatrix),ge.setValue(H,"modelMatrix",z.matrixWorld),$.isShaderMaterial||$.isRawShaderMaterial){const Je=$.uniformsGroups;for(let Fi=0,zi=Je.length;Fi<zi;Fi++){const ol=Je[Fi];k.update(ol,li),k.bind(ol,li)}}return li}function zh(w,F){w.ambientLightColor.needsUpdate=F,w.lightProbe.needsUpdate=F,w.directionalLights.needsUpdate=F,w.directionalLightShadows.needsUpdate=F,w.pointLights.needsUpdate=F,w.pointLightShadows.needsUpdate=F,w.spotLights.needsUpdate=F,w.spotLightShadows.needsUpdate=F,w.rectAreaLights.needsUpdate=F,w.hemisphereLights.needsUpdate=F}function Bh(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return P},this.getRenderTarget=function(){return E},this.setRenderTargetTextures=function(w,F,W){At.get(w.texture).__webglTexture=F,At.get(w.depthTexture).__webglTexture=W;const $=At.get(w);$.__hasExternalTextures=!0,$.__autoAllocateDepthBuffer=W===void 0,$.__autoAllocateDepthBuffer||jt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),$.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(w,F){const W=At.get(w);W.__webglFramebuffer=F,W.__useDefaultFramebuffer=F===void 0},this.setRenderTarget=function(w,F=0,W=0){E=w,A=F,P=W;let $=!0,z=null,nt=!1,ut=!1;if(w){const _t=At.get(w);if(_t.__useDefaultFramebuffer!==void 0)Ct.bindFramebuffer(H.FRAMEBUFFER,null),$=!1;else if(_t.__webglFramebuffer===void 0)T.setupRenderTarget(w);else if(_t.__hasExternalTextures)T.rebindTextures(w,At.get(w.texture).__webglTexture,At.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){const Mt=w.depthTexture;if(_t.__boundDepthTexture!==Mt){if(Mt!==null&&At.has(Mt)&&(w.width!==Mt.image.width||w.height!==Mt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");T.setupDepthRenderbuffer(w)}}const Ot=w.texture;(Ot.isData3DTexture||Ot.isDataArrayTexture||Ot.isCompressedArrayTexture)&&(ut=!0);const Ht=At.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(Ht[F])?z=Ht[F][W]:z=Ht[F],nt=!0):w.samples>0&&T.useMultisampledRTT(w)===!1?z=At.get(w).__webglMultisampledFramebuffer:Array.isArray(Ht)?z=Ht[W]:z=Ht,R.copy(w.viewport),V.copy(w.scissor),O=w.scissorTest}else R.copy(et).multiplyScalar(B).floor(),V.copy(pt).multiplyScalar(B).floor(),O=qt;if(Ct.bindFramebuffer(H.FRAMEBUFFER,z)&&$&&Ct.drawBuffers(w,z),Ct.viewport(R),Ct.scissor(V),Ct.setScissorTest(O),nt){const _t=At.get(w.texture);H.framebufferTexture2D(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_CUBE_MAP_POSITIVE_X+F,_t.__webglTexture,W)}else if(ut){const _t=At.get(w.texture),Ot=F||0;H.framebufferTextureLayer(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0,_t.__webglTexture,W||0,Ot)}S=-1},this.readRenderTargetPixels=function(w,F,W,$,z,nt,ut){if(!(w&&w.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let yt=At.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&ut!==void 0&&(yt=yt[ut]),yt){Ct.bindFramebuffer(H.FRAMEBUFFER,yt);try{const _t=w.texture,Ot=_t.format,Ht=_t.type;if(!Kt.textureFormatReadable(Ot)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Kt.textureTypeReadable(Ht)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=w.width-$&&W>=0&&W<=w.height-z&&H.readPixels(F,W,$,z,Gt.convert(Ot),Gt.convert(Ht),nt)}finally{const _t=E!==null?At.get(E).__webglFramebuffer:null;Ct.bindFramebuffer(H.FRAMEBUFFER,_t)}}},this.readRenderTargetPixelsAsync=async function(w,F,W,$,z,nt,ut){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let yt=At.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&ut!==void 0&&(yt=yt[ut]),yt){const _t=w.texture,Ot=_t.format,Ht=_t.type;if(!Kt.textureFormatReadable(Ot))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Kt.textureTypeReadable(Ht))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(F>=0&&F<=w.width-$&&W>=0&&W<=w.height-z){Ct.bindFramebuffer(H.FRAMEBUFFER,yt);const Mt=H.createBuffer();H.bindBuffer(H.PIXEL_PACK_BUFFER,Mt),H.bufferData(H.PIXEL_PACK_BUFFER,nt.byteLength,H.STREAM_READ),H.readPixels(F,W,$,z,Gt.convert(Ot),Gt.convert(Ht),0);const ie=E!==null?At.get(E).__webglFramebuffer:null;Ct.bindFramebuffer(H.FRAMEBUFFER,ie);const fe=H.fenceSync(H.SYNC_GPU_COMMANDS_COMPLETE,0);return H.flush(),await Gd(H,fe,4),H.bindBuffer(H.PIXEL_PACK_BUFFER,Mt),H.getBufferSubData(H.PIXEL_PACK_BUFFER,0,nt),H.deleteBuffer(Mt),H.deleteSync(fe),nt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(w,F=null,W=0){w.isTexture!==!0&&(Ms("WebGLRenderer: copyFramebufferToTexture function signature has changed."),F=arguments[0]||null,w=arguments[1]);const $=Math.pow(2,-W),z=Math.floor(w.image.width*$),nt=Math.floor(w.image.height*$),ut=F!==null?F.x:0,yt=F!==null?F.y:0;T.setTexture2D(w,0),H.copyTexSubImage2D(H.TEXTURE_2D,W,0,0,ut,yt,z,nt),Ct.unbindTexture()},this.copyTextureToTexture=function(w,F,W=null,$=null,z=0){w.isTexture!==!0&&(Ms("WebGLRenderer: copyTextureToTexture function signature has changed."),$=arguments[0]||null,w=arguments[1],F=arguments[2],z=arguments[3]||0,W=null);let nt,ut,yt,_t,Ot,Ht,Mt,ie,fe;const me=w.isCompressedTexture?w.mipmaps[z]:w.image;W!==null?(nt=W.max.x-W.min.x,ut=W.max.y-W.min.y,yt=W.isBox3?W.max.z-W.min.z:1,_t=W.min.x,Ot=W.min.y,Ht=W.isBox3?W.min.z:0):(nt=me.width,ut=me.height,yt=me.depth||1,_t=0,Ot=0,Ht=0),$!==null?(Mt=$.x,ie=$.y,fe=$.z):(Mt=0,ie=0,fe=0);const $e=Gt.convert(F.format),re=Gt.convert(F.type);let St;F.isData3DTexture?(T.setTexture3D(F,0),St=H.TEXTURE_3D):F.isDataArrayTexture||F.isCompressedArrayTexture?(T.setTexture2DArray(F,0),St=H.TEXTURE_2D_ARRAY):(T.setTexture2D(F,0),St=H.TEXTURE_2D),H.pixelStorei(H.UNPACK_FLIP_Y_WEBGL,F.flipY),H.pixelStorei(H.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),H.pixelStorei(H.UNPACK_ALIGNMENT,F.unpackAlignment);const wi=H.getParameter(H.UNPACK_ROW_LENGTH),ae=H.getParameter(H.UNPACK_IMAGE_HEIGHT),li=H.getParameter(H.UNPACK_SKIP_PIXELS),En=H.getParameter(H.UNPACK_SKIP_ROWS),Xe=H.getParameter(H.UNPACK_SKIP_IMAGES);H.pixelStorei(H.UNPACK_ROW_LENGTH,me.width),H.pixelStorei(H.UNPACK_IMAGE_HEIGHT,me.height),H.pixelStorei(H.UNPACK_SKIP_PIXELS,_t),H.pixelStorei(H.UNPACK_SKIP_ROWS,Ot),H.pixelStorei(H.UNPACK_SKIP_IMAGES,Ht);const ls=w.isDataArrayTexture||w.isData3DTexture,ge=F.isDataArrayTexture||F.isData3DTexture;if(w.isRenderTargetTexture||w.isDepthTexture){const mi=At.get(w),cs=At.get(F),Je=At.get(mi.__renderTarget),Fi=At.get(cs.__renderTarget);Ct.bindFramebuffer(H.READ_FRAMEBUFFER,Je.__webglFramebuffer),Ct.bindFramebuffer(H.DRAW_FRAMEBUFFER,Fi.__webglFramebuffer);for(let zi=0;zi<yt;zi++)ls&&H.framebufferTextureLayer(H.READ_FRAMEBUFFER,H.COLOR_ATTACHMENT0,At.get(w).__webglTexture,z,Ht+zi),w.isDepthTexture?(ge&&H.framebufferTextureLayer(H.DRAW_FRAMEBUFFER,H.COLOR_ATTACHMENT0,At.get(F).__webglTexture,z,fe+zi),H.blitFramebuffer(_t,Ot,nt,ut,Mt,ie,nt,ut,H.DEPTH_BUFFER_BIT,H.NEAREST)):ge?H.copyTexSubImage3D(St,z,Mt,ie,fe+zi,_t,Ot,nt,ut):H.copyTexSubImage2D(St,z,Mt,ie,fe+zi,_t,Ot,nt,ut);Ct.bindFramebuffer(H.READ_FRAMEBUFFER,null),Ct.bindFramebuffer(H.DRAW_FRAMEBUFFER,null)}else ge?w.isDataTexture||w.isData3DTexture?H.texSubImage3D(St,z,Mt,ie,fe,nt,ut,yt,$e,re,me.data):F.isCompressedArrayTexture?H.compressedTexSubImage3D(St,z,Mt,ie,fe,nt,ut,yt,$e,me.data):H.texSubImage3D(St,z,Mt,ie,fe,nt,ut,yt,$e,re,me):w.isDataTexture?H.texSubImage2D(H.TEXTURE_2D,z,Mt,ie,nt,ut,$e,re,me.data):w.isCompressedTexture?H.compressedTexSubImage2D(H.TEXTURE_2D,z,Mt,ie,me.width,me.height,$e,me.data):H.texSubImage2D(H.TEXTURE_2D,z,Mt,ie,nt,ut,$e,re,me);H.pixelStorei(H.UNPACK_ROW_LENGTH,wi),H.pixelStorei(H.UNPACK_IMAGE_HEIGHT,ae),H.pixelStorei(H.UNPACK_SKIP_PIXELS,li),H.pixelStorei(H.UNPACK_SKIP_ROWS,En),H.pixelStorei(H.UNPACK_SKIP_IMAGES,Xe),z===0&&F.generateMipmaps&&H.generateMipmap(St),Ct.unbindTexture()},this.copyTextureToTexture3D=function(w,F,W=null,$=null,z=0){return w.isTexture!==!0&&(Ms("WebGLRenderer: copyTextureToTexture3D function signature has changed."),W=arguments[0]||null,$=arguments[1]||null,w=arguments[2],F=arguments[3],z=arguments[4]||0),Ms('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(w,F,W,$,z)},this.initRenderTarget=function(w){At.get(w).__webglFramebuffer===void 0&&T.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?T.setTextureCube(w,0):w.isData3DTexture?T.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?T.setTexture2DArray(w,0):T.setTexture2D(w,0),Ct.unbindTexture()},this.resetState=function(){A=0,P=0,E=null,Ct.reset(),ue.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Di}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=ee._getDrawingBufferColorSpace(t),e.unpackColorSpace=ee._getUnpackColorSpace()}}class $o{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new Et(t),this.density=e}clone(){return new $o(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class i0 extends Te{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Mi,this.environmentIntensity=1,this.environmentRotation=new Mi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class n0{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=Eo,this.updateRanges=[],this.version=0,this.uuid=Li()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,i){t*=this.stride,i*=e.stride;for(let n=0,r=this.stride;n<r;n++)this.array[t+n]=e.array[i+n];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Li()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(e,this.stride);return i.setUsage(this.usage),i}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Li()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const He=new C;class Dr{constructor(t,e,i,n=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=i,this.normalized=n}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,i=this.data.count;e<i;e++)He.fromBufferAttribute(this,e),He.applyMatrix4(t),this.setXYZ(e,He.x,He.y,He.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)He.fromBufferAttribute(this,e),He.applyNormalMatrix(t),this.setXYZ(e,He.x,He.y,He.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)He.fromBufferAttribute(this,e),He.transformDirection(t),this.setXYZ(e,He.x,He.y,He.z);return this}getComponent(t,e){let i=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(i=ui(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=le(i,this.array)),this.data.array[t*this.data.stride+this.offset+e]=i,this}setX(t,e){return this.normalized&&(e=le(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=le(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=le(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=le(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=ui(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=ui(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=ui(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=ui(e,this.array)),e}setXY(t,e,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=le(e,this.array),i=le(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this}setXYZ(t,e,i,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=le(e,this.array),i=le(i,this.array),n=le(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=n,this}setXYZW(t,e,i,n,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=le(e,this.array),i=le(i,this.array),n=le(n,this.array),r=le(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=n,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let i=0;i<this.count;i++){const n=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[n+r])}return new ye(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new Dr(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let i=0;i<this.count;i++){const n=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[n+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class gh extends en{static get type(){return"SpriteMaterial"}constructor(t){super(),this.isSpriteMaterial=!0,this.color=new Et(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let Bn;const ps=new C,Hn=new C,Vn=new C,Gn=new xt,ms=new xt,vh=new ne,or=new C,gs=new C,lr=new C,ac=new xt,ba=new xt,oc=new xt;class s0 extends Te{constructor(t=new gh){if(super(),this.isSprite=!0,this.type="Sprite",Bn===void 0){Bn=new ce;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new n0(e,5);Bn.setIndex([0,1,2,0,2,3]),Bn.setAttribute("position",new Dr(i,3,0,!1)),Bn.setAttribute("uv",new Dr(i,2,3,!1))}this.geometry=Bn,this.material=t,this.center=new xt(.5,.5)}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Hn.setFromMatrixScale(this.matrixWorld),vh.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),Vn.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Hn.multiplyScalar(-Vn.z);const i=this.material.rotation;let n,r;i!==0&&(r=Math.cos(i),n=Math.sin(i));const a=this.center;cr(or.set(-.5,-.5,0),Vn,a,Hn,n,r),cr(gs.set(.5,-.5,0),Vn,a,Hn,n,r),cr(lr.set(.5,.5,0),Vn,a,Hn,n,r),ac.set(0,0),ba.set(1,0),oc.set(1,1);let o=t.ray.intersectTriangle(or,gs,lr,!1,ps);if(o===null&&(cr(gs.set(-.5,.5,0),Vn,a,Hn,n,r),ba.set(0,1),o=t.ray.intersectTriangle(or,lr,gs,!1,ps),o===null))return;const l=t.ray.origin.distanceTo(ps);l<t.near||l>t.far||e.push({distance:l,point:ps.clone(),uv:ni.getInterpolation(ps,or,gs,lr,ac,ba,oc,new xt),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function cr(s,t,e,i,n,r){Gn.subVectors(s,e).addScalar(.5).multiply(i),n!==void 0?(ms.x=r*Gn.x-n*Gn.y,ms.y=n*Gn.x+r*Gn.y):ms.copy(Gn),s.copy(t),s.x+=ms.x,s.y+=ms.y,s.applyMatrix4(vh)}class xh extends ze{constructor(t=null,e=1,i=1,n,r,a,o,l,h=Ke,c=Ke,u,d){super(null,a,o,l,h,c,n,r,u,d),this.isDataTexture=!0,this.image={data:t,width:e,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class lc extends ye{constructor(t,e,i,n=1){super(t,e,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=n}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const Wn=new ne,cc=new ne,hr=[],hc=new tn,r0=new ne,vs=new Yt,xs=new wn;class a0 extends Yt{constructor(t,e,i){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new lc(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let n=0;n<i;n++)this.setMatrixAt(n,r0)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new tn),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,Wn),hc.copy(t.boundingBox).applyMatrix4(Wn),this.boundingBox.union(hc)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new wn),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,Wn),xs.copy(t.boundingSphere).applyMatrix4(Wn),this.boundingSphere.union(xs)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const i=e.morphTargetInfluences,n=this.morphTexture.source.data.data,r=i.length+1,a=t*r+1;for(let o=0;o<i.length;o++)i[o]=n[a+o]}raycast(t,e){const i=this.matrixWorld,n=this.count;if(vs.geometry=this.geometry,vs.material=this.material,vs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),xs.copy(this.boundingSphere),xs.applyMatrix4(i),t.ray.intersectsSphere(xs)!==!1))for(let r=0;r<n;r++){this.getMatrixAt(r,Wn),cc.multiplyMatrices(i,Wn),vs.matrixWorld=cc,vs.raycast(t,hr);for(let a=0,o=hr.length;a<o;a++){const l=hr[a];l.instanceId=r,l.object=this,e.push(l)}hr.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new lc(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const i=e.morphTargetInfluences,n=i.length+1;this.morphTexture===null&&(this.morphTexture=new xh(new Float32Array(n*this.count),n,this.count,Fo,_i));const r=this.morphTexture.source.data.data;let a=0;for(let h=0;h<i.length;h++)a+=i[h];const o=this.geometry.morphTargetsRelative?1:1-a,l=n*t;r[l]=o,r.set(i,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class Xo extends en{static get type(){return"LineBasicMaterial"}constructor(t){super(),this.isLineBasicMaterial=!0,this.color=new Et(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Lr=new C,Ur=new C,dc=new ne,ys=new zr,dr=new wn,Sa=new C,uc=new C;class yh extends Te{constructor(t=new ce,e=new Xo){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[0];for(let n=1,r=e.count;n<r;n++)Lr.fromBufferAttribute(e,n-1),Ur.fromBufferAttribute(e,n),i[n]=i[n-1],i[n]+=Lr.distanceTo(Ur);t.setAttribute("lineDistance",new se(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const i=this.geometry,n=this.matrixWorld,r=t.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),dr.copy(i.boundingSphere),dr.applyMatrix4(n),dr.radius+=r,t.ray.intersectsSphere(dr)===!1)return;dc.copy(n).invert(),ys.copy(t.ray).applyMatrix4(dc);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,h=this.isLineSegments?2:1,c=i.index,d=i.attributes.position;if(c!==null){const p=Math.max(0,a.start),g=Math.min(c.count,a.start+a.count);for(let v=p,m=g-1;v<m;v+=h){const f=c.getX(v),y=c.getX(v+1),_=ur(this,t,ys,l,f,y);_&&e.push(_)}if(this.isLineLoop){const v=c.getX(g-1),m=c.getX(p),f=ur(this,t,ys,l,v,m);f&&e.push(f)}}else{const p=Math.max(0,a.start),g=Math.min(d.count,a.start+a.count);for(let v=p,m=g-1;v<m;v+=h){const f=ur(this,t,ys,l,v,v+1);f&&e.push(f)}if(this.isLineLoop){const v=ur(this,t,ys,l,g-1,p);v&&e.push(v)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const n=e[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=n.length;r<a;r++){const o=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function ur(s,t,e,i,n,r){const a=s.geometry.attributes.position;if(Lr.fromBufferAttribute(a,n),Ur.fromBufferAttribute(a,r),e.distanceSqToSegment(Lr,Ur,Sa,uc)>i)return;Sa.applyMatrix4(s.matrixWorld);const l=t.ray.origin.distanceTo(Sa);if(!(l<t.near||l>t.far))return{distance:l,point:uc.clone().applyMatrix4(s.matrixWorld),index:n,face:null,faceIndex:null,barycoord:null,object:s}}const fc=new C,pc=new C;class o0 extends yh{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[];for(let n=0,r=e.count;n<r;n+=2)fc.fromBufferAttribute(e,n),pc.fromBufferAttribute(e,n+1),i[n]=n===0?0:i[n-1],i[n+1]=i[n]+fc.distanceTo(pc);t.setAttribute("lineDistance",new se(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class ks extends en{static get type(){return"PointsMaterial"}constructor(t){super(),this.isPointsMaterial=!0,this.color=new Et(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const mc=new ne,Ao=new zr,fr=new wn,pr=new C;class Vr extends Te{constructor(t=new ce,e=new ks){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const i=this.geometry,n=this.matrixWorld,r=t.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),fr.copy(i.boundingSphere),fr.applyMatrix4(n),fr.radius+=r,t.ray.intersectsSphere(fr)===!1)return;mc.copy(n).invert(),Ao.copy(t.ray).applyMatrix4(mc);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,h=i.index,u=i.attributes.position;if(h!==null){const d=Math.max(0,a.start),p=Math.min(h.count,a.start+a.count);for(let g=d,v=p;g<v;g++){const m=h.getX(g);pr.fromBufferAttribute(u,m),gc(pr,m,l,n,t,e,this)}}else{const d=Math.max(0,a.start),p=Math.min(u.count,a.start+a.count);for(let g=d,v=p;g<v;g++)pr.fromBufferAttribute(u,g),gc(pr,g,l,n,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const n=e[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=n.length;r<a;r++){const o=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function gc(s,t,e,i,n,r,a){const o=Ao.distanceSqToPoint(s);if(o<e){const l=new C;Ao.closestPointToPoint(s,l),l.applyMatrix4(i);const h=n.ray.origin.distanceTo(l);if(h<n.near||h>n.far)return;r.push({distance:h,distanceToRay:Math.sqrt(o),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:a})}}class _h extends ze{constructor(t,e,i,n,r,a,o,l,h){super(t,e,i,n,r,a,o,l,h),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Oi{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const i=this.getUtoTmapping(t);return this.getPoint(i,e)}getPoints(t=5){const e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return e}getSpacedPoints(t=5){const e=[];for(let i=0;i<=t;i++)e.push(this.getPointAt(i/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let i,n=this.getPoint(0),r=0;e.push(0);for(let a=1;a<=t;a++)i=this.getPoint(a/t),r+=i.distanceTo(n),e.push(r),n=i;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const i=this.getLengths();let n=0;const r=i.length;let a;e?a=e:a=t*i[r-1];let o=0,l=r-1,h;for(;o<=l;)if(n=Math.floor(o+(l-o)/2),h=i[n]-a,h<0)o=n+1;else if(h>0)l=n-1;else{l=n;break}if(n=l,i[n]===a)return n/(r-1);const c=i[n],d=i[n+1]-c,p=(a-c)/d;return(n+p)/(r-1)}getTangent(t,e){let n=t-1e-4,r=t+1e-4;n<0&&(n=0),r>1&&(r=1);const a=this.getPoint(n),o=this.getPoint(r),l=e||(a.isVector2?new xt:new C);return l.copy(o).sub(a).normalize(),l}getTangentAt(t,e){const i=this.getUtoTmapping(t);return this.getTangent(i,e)}computeFrenetFrames(t,e){const i=new C,n=[],r=[],a=[],o=new C,l=new ne;for(let p=0;p<=t;p++){const g=p/t;n[p]=this.getTangentAt(g,new C)}r[0]=new C,a[0]=new C;let h=Number.MAX_VALUE;const c=Math.abs(n[0].x),u=Math.abs(n[0].y),d=Math.abs(n[0].z);c<=h&&(h=c,i.set(1,0,0)),u<=h&&(h=u,i.set(0,1,0)),d<=h&&i.set(0,0,1),o.crossVectors(n[0],i).normalize(),r[0].crossVectors(n[0],o),a[0].crossVectors(n[0],r[0]);for(let p=1;p<=t;p++){if(r[p]=r[p-1].clone(),a[p]=a[p-1].clone(),o.crossVectors(n[p-1],n[p]),o.length()>Number.EPSILON){o.normalize();const g=Math.acos(Ue(n[p-1].dot(n[p]),-1,1));r[p].applyMatrix4(l.makeRotationAxis(o,g))}a[p].crossVectors(n[p],r[p])}if(e===!0){let p=Math.acos(Ue(r[0].dot(r[t]),-1,1));p/=t,n[0].dot(o.crossVectors(r[0],r[t]))>0&&(p=-p);for(let g=1;g<=t;g++)r[g].applyMatrix4(l.makeRotationAxis(n[g],p*g)),a[g].crossVectors(n[g],r[g])}return{tangents:n,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class Mh extends Oi{constructor(t=0,e=0,i=1,n=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=i,this.yRadius=n,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(t,e=new xt){const i=e,n=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=n;for(;r>n;)r-=n;r<Number.EPSILON&&(a?r=0:r=n),this.aClockwise===!0&&!a&&(r===n?r=-n:r=r-n);const o=this.aStartAngle+t*r;let l=this.aX+this.xRadius*Math.cos(o),h=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const c=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=l-this.aX,p=h-this.aY;l=d*c-p*u+this.aX,h=d*u+p*c+this.aY}return i.set(l,h)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class l0 extends Mh{constructor(t,e,i,n,r,a){super(t,e,i,i,n,r,a),this.isArcCurve=!0,this.type="ArcCurve"}}function qo(){let s=0,t=0,e=0,i=0;function n(r,a,o,l){s=r,t=o,e=-3*r+3*a-2*o-l,i=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,h){n(a,o,h*(o-r),h*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,h,c,u){let d=(a-r)/h-(o-r)/(h+c)+(o-a)/c,p=(o-a)/c-(l-a)/(c+u)+(l-o)/u;d*=c,p*=c,n(a,o,d,p)},calc:function(r){const a=r*r,o=a*r;return s+t*r+e*a+i*o}}}const mr=new C,wa=new qo,Ea=new qo,Ta=new qo;class bh extends Oi{constructor(t=[],e=!1,i="centripetal",n=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=i,this.tension=n}getPoint(t,e=new C){const i=e,n=this.points,r=n.length,a=(r-(this.closed?0:1))*t;let o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let h,c;this.closed||o>0?h=n[(o-1)%r]:(mr.subVectors(n[0],n[1]).add(n[0]),h=mr);const u=n[o%r],d=n[(o+1)%r];if(this.closed||o+2<r?c=n[(o+2)%r]:(mr.subVectors(n[r-1],n[r-2]).add(n[r-1]),c=mr),this.curveType==="centripetal"||this.curveType==="chordal"){const p=this.curveType==="chordal"?.5:.25;let g=Math.pow(h.distanceToSquared(u),p),v=Math.pow(u.distanceToSquared(d),p),m=Math.pow(d.distanceToSquared(c),p);v<1e-4&&(v=1),g<1e-4&&(g=v),m<1e-4&&(m=v),wa.initNonuniformCatmullRom(h.x,u.x,d.x,c.x,g,v,m),Ea.initNonuniformCatmullRom(h.y,u.y,d.y,c.y,g,v,m),Ta.initNonuniformCatmullRom(h.z,u.z,d.z,c.z,g,v,m)}else this.curveType==="catmullrom"&&(wa.initCatmullRom(h.x,u.x,d.x,c.x,this.tension),Ea.initCatmullRom(h.y,u.y,d.y,c.y,this.tension),Ta.initCatmullRom(h.z,u.z,d.z,c.z,this.tension));return i.set(wa.calc(l),Ea.calc(l),Ta.calc(l)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const n=t.points[e];this.points.push(n.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){const n=this.points[e];t.points.push(n.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const n=t.points[e];this.points.push(new C().fromArray(n))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function vc(s,t,e,i,n){const r=(i-t)*.5,a=(n-e)*.5,o=s*s,l=s*o;return(2*e-2*i+r+a)*l+(-3*e+3*i-2*r-a)*o+r*s+e}function c0(s,t){const e=1-s;return e*e*t}function h0(s,t){return 2*(1-s)*s*t}function d0(s,t){return s*s*t}function As(s,t,e,i){return c0(s,t)+h0(s,e)+d0(s,i)}function u0(s,t){const e=1-s;return e*e*e*t}function f0(s,t){const e=1-s;return 3*e*e*s*t}function p0(s,t){return 3*(1-s)*s*s*t}function m0(s,t){return s*s*s*t}function Rs(s,t,e,i,n){return u0(s,t)+f0(s,e)+p0(s,i)+m0(s,n)}class g0 extends Oi{constructor(t=new xt,e=new xt,i=new xt,n=new xt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=i,this.v3=n}getPoint(t,e=new xt){const i=e,n=this.v0,r=this.v1,a=this.v2,o=this.v3;return i.set(Rs(t,n.x,r.x,a.x,o.x),Rs(t,n.y,r.y,a.y,o.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class v0 extends Oi{constructor(t=new C,e=new C,i=new C,n=new C){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=i,this.v3=n}getPoint(t,e=new C){const i=e,n=this.v0,r=this.v1,a=this.v2,o=this.v3;return i.set(Rs(t,n.x,r.x,a.x,o.x),Rs(t,n.y,r.y,a.y,o.y),Rs(t,n.z,r.z,a.z,o.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class x0 extends Oi{constructor(t=new xt,e=new xt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new xt){const i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new xt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class y0 extends Oi{constructor(t=new C,e=new C){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new C){const i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new C){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class _0 extends Oi{constructor(t=new xt,e=new xt,i=new xt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new xt){const i=e,n=this.v0,r=this.v1,a=this.v2;return i.set(As(t,n.x,r.x,a.x),As(t,n.y,r.y,a.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Sh extends Oi{constructor(t=new C,e=new C,i=new C){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new C){const i=e,n=this.v0,r=this.v1,a=this.v2;return i.set(As(t,n.x,r.x,a.x),As(t,n.y,r.y,a.y),As(t,n.z,r.z,a.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class M0 extends Oi{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new xt){const i=e,n=this.points,r=(n.length-1)*t,a=Math.floor(r),o=r-a,l=n[a===0?a:a-1],h=n[a],c=n[a>n.length-2?n.length-1:a+1],u=n[a>n.length-3?n.length-1:a+2];return i.set(vc(o,l.x,h.x,c.x,u.x),vc(o,l.y,h.y,c.y,u.y)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const n=t.points[e];this.points.push(n.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){const n=this.points[e];t.points.push(n.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const n=t.points[e];this.points.push(new xt().fromArray(n))}return this}}var b0=Object.freeze({__proto__:null,ArcCurve:l0,CatmullRomCurve3:bh,CubicBezierCurve:g0,CubicBezierCurve3:v0,EllipseCurve:Mh,LineCurve:x0,LineCurve3:y0,QuadraticBezierCurve:_0,QuadraticBezierCurve3:Sh,SplineCurve:M0});class Gr extends ce{constructor(t=1,e=1,i=1,n=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:i,radialSegments:n,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};const h=this;n=Math.floor(n),r=Math.floor(r);const c=[],u=[],d=[],p=[];let g=0;const v=[],m=i/2;let f=0;y(),a===!1&&(t>0&&_(!0),e>0&&_(!1)),this.setIndex(c),this.setAttribute("position",new se(u,3)),this.setAttribute("normal",new se(d,3)),this.setAttribute("uv",new se(p,2));function y(){const x=new C,I=new C;let A=0;const P=(e-t)/i;for(let E=0;E<=r;E++){const S=[],M=E/r,R=M*(e-t)+t;for(let V=0;V<=n;V++){const O=V/n,N=O*l+o,D=Math.sin(N),U=Math.cos(N);I.x=R*D,I.y=-M*i+m,I.z=R*U,u.push(I.x,I.y,I.z),x.set(D,P,U).normalize(),d.push(x.x,x.y,x.z),p.push(O,1-M),S.push(g++)}v.push(S)}for(let E=0;E<n;E++)for(let S=0;S<r;S++){const M=v[S][E],R=v[S+1][E],V=v[S+1][E+1],O=v[S][E+1];(t>0||S!==0)&&(c.push(M,R,O),A+=3),(e>0||S!==r-1)&&(c.push(R,V,O),A+=3)}h.addGroup(f,A,0),f+=A}function _(x){const I=g,A=new xt,P=new C;let E=0;const S=x===!0?t:e,M=x===!0?1:-1;for(let V=1;V<=n;V++)u.push(0,m*M,0),d.push(0,M,0),p.push(.5,.5),g++;const R=g;for(let V=0;V<=n;V++){const N=V/n*l+o,D=Math.cos(N),U=Math.sin(N);P.x=S*U,P.y=m*M,P.z=S*D,u.push(P.x,P.y,P.z),d.push(0,M,0),A.x=D*.5+.5,A.y=U*.5*M+.5,p.push(A.x,A.y),g++}for(let V=0;V<n;V++){const O=I+V,N=R+V;x===!0?c.push(N,N+1,O):c.push(N+1,N,O),E+=3}h.addGroup(f,E,x===!0?1:2),f+=E}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Gr(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Wr extends Gr{constructor(t=1,e=1,i=32,n=1,r=!1,a=0,o=Math.PI*2){super(0,t,e,i,n,r,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:i,heightSegments:n,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(t){return new Wr(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Yo extends ce{constructor(t=[],e=[],i=1,n=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:i,detail:n};const r=[],a=[];o(n),h(i),c(),this.setAttribute("position",new se(r,3)),this.setAttribute("normal",new se(r.slice(),3)),this.setAttribute("uv",new se(a,2)),n===0?this.computeVertexNormals():this.normalizeNormals();function o(y){const _=new C,x=new C,I=new C;for(let A=0;A<e.length;A+=3)p(e[A+0],_),p(e[A+1],x),p(e[A+2],I),l(_,x,I,y)}function l(y,_,x,I){const A=I+1,P=[];for(let E=0;E<=A;E++){P[E]=[];const S=y.clone().lerp(x,E/A),M=_.clone().lerp(x,E/A),R=A-E;for(let V=0;V<=R;V++)V===0&&E===A?P[E][V]=S:P[E][V]=S.clone().lerp(M,V/R)}for(let E=0;E<A;E++)for(let S=0;S<2*(A-E)-1;S++){const M=Math.floor(S/2);S%2===0?(d(P[E][M+1]),d(P[E+1][M]),d(P[E][M])):(d(P[E][M+1]),d(P[E+1][M+1]),d(P[E+1][M]))}}function h(y){const _=new C;for(let x=0;x<r.length;x+=3)_.x=r[x+0],_.y=r[x+1],_.z=r[x+2],_.normalize().multiplyScalar(y),r[x+0]=_.x,r[x+1]=_.y,r[x+2]=_.z}function c(){const y=new C;for(let _=0;_<r.length;_+=3){y.x=r[_+0],y.y=r[_+1],y.z=r[_+2];const x=m(y)/2/Math.PI+.5,I=f(y)/Math.PI+.5;a.push(x,1-I)}g(),u()}function u(){for(let y=0;y<a.length;y+=6){const _=a[y+0],x=a[y+2],I=a[y+4],A=Math.max(_,x,I),P=Math.min(_,x,I);A>.9&&P<.1&&(_<.2&&(a[y+0]+=1),x<.2&&(a[y+2]+=1),I<.2&&(a[y+4]+=1))}}function d(y){r.push(y.x,y.y,y.z)}function p(y,_){const x=y*3;_.x=t[x+0],_.y=t[x+1],_.z=t[x+2]}function g(){const y=new C,_=new C,x=new C,I=new C,A=new xt,P=new xt,E=new xt;for(let S=0,M=0;S<r.length;S+=9,M+=6){y.set(r[S+0],r[S+1],r[S+2]),_.set(r[S+3],r[S+4],r[S+5]),x.set(r[S+6],r[S+7],r[S+8]),A.set(a[M+0],a[M+1]),P.set(a[M+2],a[M+3]),E.set(a[M+4],a[M+5]),I.copy(y).add(_).add(x).divideScalar(3);const R=m(I);v(A,M+0,y,R),v(P,M+2,_,R),v(E,M+4,x,R)}}function v(y,_,x,I){I<0&&y.x===1&&(a[_]=y.x-1),x.x===0&&x.z===0&&(a[_]=I/2/Math.PI+.5)}function m(y){return Math.atan2(y.z,-y.x)}function f(y){return Math.atan2(-y.y,Math.sqrt(y.x*y.x+y.z*y.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Yo(t.vertices,t.indices,t.radius,t.details)}}class $r extends Yo{constructor(t=1,e=0){const i=(1+Math.sqrt(5))/2,n=1/i,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-n,-i,0,-n,i,0,n,-i,0,n,i,-n,-i,0,-n,i,0,n,-i,0,n,i,0,-i,0,-n,i,0,-n,-i,0,n,i,0,n],a=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,a,t,e),this.type="DodecahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new $r(t.radius,t.detail)}}class Nr extends ce{constructor(t=.5,e=1,i=32,n=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:i,phiSegments:n,thetaStart:r,thetaLength:a},i=Math.max(3,i),n=Math.max(1,n);const o=[],l=[],h=[],c=[];let u=t;const d=(e-t)/n,p=new C,g=new xt;for(let v=0;v<=n;v++){for(let m=0;m<=i;m++){const f=r+m/i*a;p.x=u*Math.cos(f),p.y=u*Math.sin(f),l.push(p.x,p.y,p.z),h.push(0,0,1),g.x=(p.x/e+1)/2,g.y=(p.y/e+1)/2,c.push(g.x,g.y)}u+=d}for(let v=0;v<n;v++){const m=v*(i+1);for(let f=0;f<i;f++){const y=f+m,_=y,x=y+i+1,I=y+i+2,A=y+1;o.push(_,x,A),o.push(x,I,A)}}this.setIndex(o),this.setAttribute("position",new se(l,3)),this.setAttribute("normal",new se(h,3)),this.setAttribute("uv",new se(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Nr(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class Os extends ce{constructor(t=1,e=32,i=16,n=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:n,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));const l=Math.min(a+o,Math.PI);let h=0;const c=[],u=new C,d=new C,p=[],g=[],v=[],m=[];for(let f=0;f<=i;f++){const y=[],_=f/i;let x=0;f===0&&a===0?x=.5/e:f===i&&l===Math.PI&&(x=-.5/e);for(let I=0;I<=e;I++){const A=I/e;u.x=-t*Math.cos(n+A*r)*Math.sin(a+_*o),u.y=t*Math.cos(a+_*o),u.z=t*Math.sin(n+A*r)*Math.sin(a+_*o),g.push(u.x,u.y,u.z),d.copy(u).normalize(),v.push(d.x,d.y,d.z),m.push(A+x,1-_),y.push(h++)}c.push(y)}for(let f=0;f<i;f++)for(let y=0;y<e;y++){const _=c[f][y+1],x=c[f][y],I=c[f+1][y],A=c[f+1][y+1];(f!==0||a>0)&&p.push(_,x,A),(f!==i-1||l<Math.PI)&&p.push(x,I,A)}this.setIndex(p),this.setAttribute("position",new se(g,3)),this.setAttribute("normal",new se(v,3)),this.setAttribute("uv",new se(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Os(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class jo extends ce{constructor(t=new Sh(new C(-1,-1,0),new C(-1,1,0),new C(1,1,0)),e=64,i=1,n=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:i,radialSegments:n,closed:r};const a=t.computeFrenetFrames(e,r);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;const o=new C,l=new C,h=new xt;let c=new C;const u=[],d=[],p=[],g=[];v(),this.setIndex(g),this.setAttribute("position",new se(u,3)),this.setAttribute("normal",new se(d,3)),this.setAttribute("uv",new se(p,2));function v(){for(let _=0;_<e;_++)m(_);m(r===!1?e:0),y(),f()}function m(_){c=t.getPointAt(_/e,c);const x=a.normals[_],I=a.binormals[_];for(let A=0;A<=n;A++){const P=A/n*Math.PI*2,E=Math.sin(P),S=-Math.cos(P);l.x=S*x.x+E*I.x,l.y=S*x.y+E*I.y,l.z=S*x.z+E*I.z,l.normalize(),d.push(l.x,l.y,l.z),o.x=c.x+i*l.x,o.y=c.y+i*l.y,o.z=c.z+i*l.z,u.push(o.x,o.y,o.z)}}function f(){for(let _=1;_<=e;_++)for(let x=1;x<=n;x++){const I=(n+1)*(_-1)+(x-1),A=(n+1)*_+(x-1),P=(n+1)*_+x,E=(n+1)*(_-1)+x;g.push(I,A,E),g.push(A,P,E)}}function y(){for(let _=0;_<=e;_++)for(let x=0;x<=n;x++)h.x=_/e,h.y=x/n,p.push(h.x,h.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new jo(new b0[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}}class S0 extends en{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new Et(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Et(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Jc,this.normalScale=new xt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Mi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class wh extends Te{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Et(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class w0 extends wh{constructor(t,e,i){super(t,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Te.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Et(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const Aa=new ne,xc=new C,yc=new C;class E0{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new xt(512,512),this.map=null,this.mapPass=null,this.matrix=new ne,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Br,this._frameExtents=new xt(1,1),this._viewportCount=1,this._viewports=[new be(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,i=this.matrix;xc.setFromMatrixPosition(t.matrixWorld),e.position.copy(xc),yc.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(yc),e.updateMatrixWorld(),Aa.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Aa),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Aa)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class T0 extends E0{constructor(){super(new hh(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class A0 extends wh{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Te.DEFAULT_UP),this.updateMatrix(),this.target=new Te,this.shadow=new T0}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}const _c=new ne;class R0{constructor(t,e,i=0,n=1/0){this.ray=new zr(t,e),this.near=i,this.far=n,this.camera=null,this.layers=new Go,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return _c.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(_c),this}intersectObject(t,e=!0,i=[]){return Ro(t,this,i,e),i.sort(Mc),i}intersectObjects(t,e=!0,i=[]){for(let n=0,r=t.length;n<r;n++)Ro(t[n],this,i,e);return i.sort(Mc),i}}function Mc(s,t){return s.distance-t.distance}function Ro(s,t,e,i){let n=!0;if(s.layers.test(t.layers)&&s.raycast(t,e)===!1&&(n=!1),n===!0&&i===!0){const r=s.children;for(let a=0,o=r.length;a<o;a++)Ro(r[a],t,e,!0)}}const gr=new tn;class C0 extends o0{constructor(t,e=16776960){const i=new Uint16Array([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7]),n=new Float32Array(24),r=new ce;r.setIndex(new ye(i,1)),r.setAttribute("position",new ye(n,3)),super(r,new Xo({color:e,toneMapped:!1})),this.object=t,this.type="BoxHelper",this.matrixAutoUpdate=!1,this.update()}update(t){if(t!==void 0&&console.warn("THREE.BoxHelper: .update() has no longer arguments."),this.object!==void 0&&gr.setFromObject(this.object),gr.isEmpty())return;const e=gr.min,i=gr.max,n=this.geometry.attributes.position,r=n.array;r[0]=i.x,r[1]=i.y,r[2]=i.z,r[3]=e.x,r[4]=i.y,r[5]=i.z,r[6]=e.x,r[7]=e.y,r[8]=i.z,r[9]=i.x,r[10]=e.y,r[11]=i.z,r[12]=i.x,r[13]=i.y,r[14]=e.z,r[15]=e.x,r[16]=i.y,r[17]=e.z,r[18]=e.x,r[19]=e.y,r[20]=e.z,r[21]=i.x,r[22]=e.y,r[23]=e.z,n.needsUpdate=!0,this.geometry.computeBoundingSphere()}setFromObject(t){return this.object=t,this.update(),this}copy(t,e){return super.copy(t,e),this.object=t.object,this}dispose(){this.geometry.dispose(),this.material.dispose()}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Uo}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Uo);const yn=Object.freeze({title:"Tidebound Gold",version:"1.2.0",saveVersion:2}),wt={wood:{name:"Driftwood",icon:"wood",color:"#b78351",description:"Sun-bleached timber. The beginning of a home.",stack:99},plastic:{name:"Plastic",icon:"plastic",color:"#80bbba",description:"A little ocean waste, a lot of possibility.",stack:99},leaf:{name:"Palm leaf",icon:"leaf",color:"#86a361",description:"Weave into rope, sails, and shelter.",stack:99},scrap:{name:"Scrap metal",icon:"scrap",color:"#a6aaa7",description:"Weathered metal from another life.",stack:99},rope:{name:"Rope",icon:"rope",color:"#d4ba82",description:"Twisted palm fibers. Holds things together.",stack:99},vine:{name:"Wild vine",icon:"vine",color:"#75925e",description:"Research this island plant to unlock collection nets.",stack:99,research:"net"},copper:{name:"Copper ore",icon:"ore",color:"#b57b5c",description:"Found on islands. Research it to unlock a signal beacon.",stack:99,research:"beacon"},signal:{name:"Signal fragment",icon:"signal",color:"#dfb85d",description:"A salvaged radio component. Find three to call for rescue.",stack:3},resin:{name:"Palm resin",icon:"leaf",color:"#cda365",description:"A palm-cay discovery. Study it after vines for rain collection and hearty meals.",stack:99,research:"rainCollector"},coral:{name:"Sea glass coral",icon:"ore",color:"#b4cfc3",description:"Reef-hardened material. Study it after copper for protective raft plating.",stack:99,research:"armor"},relic:{name:"Navigator’s lens",icon:"compass",color:"#cba96d",description:"A rare outpost instrument. Study it after copper for a windcatcher.",stack:99,research:"windcatcher"},heartyMeal:{name:"Island stew",icon:"cookedFish",color:"#d1a16c",description:"+45 hunger, +15 thirst. Fish and coconut, made to go a little further.",hunger:45,thirst:15,stack:20,consumable:!0},hook:{name:"Salvage hook",icon:"hook",color:"#d8bc7a",description:"Hold to charge. Release to cast. Click again to reel in.",stack:1,tool:!0},hammer:{name:"Building hammer",icon:"hammer",color:"#b58b61",description:"Select a structure, point at your raft, and build.",stack:1,tool:!0},spear:{name:"Wooden spear",icon:"spear",color:"#b89c71",description:"Repel the shark during its charge. Also a good fishing companion.",stack:1,tool:!0},fishingRod:{name:"Fishing rod",icon:"fishing",color:"#b3946d",description:"Cast into the sea. When the float dips, click to catch a fish.",stack:1,tool:!0},paddle:{name:"Paddle",icon:"paddle",color:"#ad7d4f",description:"Click the ocean to paddle in that direction. G: take the helm.",stack:1,tool:!0},rawFish:{name:"Raw fish",icon:"fish",color:"#92b5bb",description:"+10 hunger, −5 health. Better cooked over a fire.",hunger:10,health:-5,stack:20,consumable:!0},cookedFish:{name:"Grilled fish",icon:"cookedFish",color:"#d78d5d",description:"+30 hunger. A little comfort, a long way from land.",hunger:30,stack:20,consumable:!0},water:{name:"Fresh water",icon:"water",color:"#75bfc9",description:"+40 thirst. Purify seawater or collect it during rain.",thirst:40,stack:20,consumable:!0},coconut:{name:"Coconut",icon:"coconut",color:"#aa8461",description:"+15 hunger, +15 thirst. Found beneath island palms.",hunger:15,thirst:15,stack:20,consumable:!0}},Nt={foundation:{name:"Foundation",icon:"foundation",description:"One square meter of solid ground. Expands your home.",cost:{wood:2,plastic:1},hp:100,buoyant:!0,wooden:!0,mass:22},floor:{name:"Upper floor",icon:"floor",description:"A new level. Requires a wall or stairs underneath.",cost:{wood:3},hp:80,wooden:!0,mass:12},wall:{name:"Wooden wall",icon:"wall",description:"A little shelter from the open sea. Supports a floor above.",cost:{wood:3,leaf:2},hp:80,wooden:!0,mass:10},stairs:{name:"Stairs",icon:"stairs",description:"Build up, not just out. Connects the next level.",cost:{wood:4,rope:1},hp:100,wooden:!0,mass:18},workbench:{name:"Workbench",icon:"workbench",description:"The heart of your workshop. Craft within four meters.",cost:{wood:6,scrap:2},hp:120,wooden:!0,station:!0,mass:20},purifier:{name:"Water purifier",icon:"purifier",description:"F: start purifying seawater. Uses one piece of driftwood.",cost:{wood:4,plastic:4},hp:100,wooden:!0,station:!0,mass:14},grill:{name:"Small grill",icon:"grill",description:"F: cook raw fish with one piece of driftwood.",cost:{wood:4,scrap:3},hp:100,wooden:!0,station:!0,mass:16},net:{name:"Collection net",icon:"net",description:"Automatically catches nearby floating salvage. Research a vine first.",cost:{wood:3,rope:3},hp:70,wooden:!0,buoyant:!0,research:"vine",mass:10},sail:{name:"Sail",icon:"sail",description:"F: unfurl the canvas and let the trade winds carry you.",cost:{wood:5,leaf:8,rope:2},hp:100,wooden:!0,station:!0,mass:25},rainCollector:{name:"Rain collector",icon:"purifier",description:"Automatically collects one fresh water every 35 seconds of rain. No fuel; pauses when your water reserve reaches 30.",cost:{wood:4,plastic:3,rope:1},hp:100,wooden:!0,station:!0,research:"resin",mass:12},armor:{name:"Raft plating",icon:"foundation",description:"Build over a foundation. Halves shark damage to that foundation and protects it from reef scrapes.",cost:{wood:2,scrap:3,coral:1},hp:140,research:"coral",mass:24},windcatcher:{name:"Windcatcher",icon:"compass",description:"An outpost instrument that improves manual sailing and charted courses by 20%. One is enough.",cost:{wood:4,rope:2,copper:2,relic:1},hp:100,wooden:!0,station:!0,research:"relic",mass:16},beacon:{name:"Signal beacon",icon:"beacon",description:"Your way home. Three signal fragments, one clear frequency.",cost:{wood:6,scrap:8,copper:3,signal:3},hp:150,station:!0,research:"copper",mass:20}},_n={vine:{title:"A better way to gather",unlock:"net",requires:[],description:"Strong fibers become collection nets: more time exploring, less time chasing driftwood."},copper:{title:"A voice across the water",unlock:"beacon",requires:[],description:"Copper carries a current. Three island signal fragments can become your way home."},resin:{title:"Provisioned by the palms",unlock:"rainCollector",requires:["vine"],description:"Waterproof lashings unlock automatic rain collection and nourishing island stew."},coral:{title:"A home with stronger edges",unlock:"armor",requires:["copper"],description:"Reef-hardened plates halve shark bites and stop reef scraping on the foundation below."},relic:{title:"Read the trade winds",unlock:"windcatcher",requires:["copper"],description:"An old navigator’s lens unlocks a windcatcher: 20% faster helming and charted sailing."}},Ra=[{title:"A place to begin",description:"Big things start with small discoveries."},{title:"Beyond the horizon",description:"There is more out here than open water."},{title:"Someone is listening",description:"A little courage travels a long way."}],Co=[{id:"salvage",chapter:0,title:"Bring in floating salvage",counter:"salvaged",target:4,tip:"Hold & release your hook near debris",reward:{wood:2}},{id:"expand",chapter:0,title:"Give your raft room to grow",counter:"built",target:1,tip:"Select the hammer · build on an edge",reward:{plastic:1}},{id:"water",chapter:0,title:"Make a little fresh water",counter:"water",target:1,tip:"F beside your water purifier",reward:{coconut:1}},{id:"shore",chapter:1,title:"Set foot on a new shore",counter:"islands",target:1,tip:"M: open the chart and set a course",reward:{rope:1}},{id:"signal",chapter:1,title:"Recover signal fragments",counter:"caches",target:3,tip:"One finite supply cache on each island"},{id:"frequency",chapter:1,title:"Research the signal beacon",research:"copper",target:1,tip:"Find copper · research at your workbench"},{id:"home",chapter:2,title:"Send a signal home",counter:"rescued",target:1,tip:"Build a beacon, then press F beside it"},{id:"curiosity",optional:!0,title:"Discover an island landmark",counter:"poi",target:1,tip:"Look for a spring, wrecked skiff, or old observatory",reward:{coconut:2}},{id:"trail-reader",optional:!0,title:"Read a keeper’s trail journal",counter:"journals",target:1,tip:"Follow the island trail to an elevated overlook",reward:{water:1}},{id:"hidden-share",optional:!0,title:"Recover a hidden provision chest",counter:"secrets",target:1,tip:"Find the grotto beyond the overlook; some latches answer carved waystones",reward:{leaf:4}},{id:"provisions",optional:!0,title:"Let the rain provide",research:"resin",target:1,tip:"Find palm resin; study vines, then resin",reward:{rope:2}},{id:"fortify",optional:!0,title:"Learn from the reef",research:"coral",target:1,tip:"Find sea glass coral; study copper, then coral",reward:{scrap:2}},{id:"navigator",optional:!0,title:"Read an older compass",research:"relic",target:1,tip:"Find a navigator’s lens at an outpost",reward:{wood:3}}],Xi=[{id:"rope",name:"Palm-fiber rope",output:"rope",amount:2,ingredients:{leaf:2},seconds:2,category:"essentials",description:"Twist palm leaves into something stronger."},{id:"water",name:"Fresh water",output:"water",amount:1,ingredients:{wood:1},seconds:8,category:"food",station:"purifier",description:"A clean drink, distilled from the sea."},{id:"cookedFish",name:"Grilled fish",output:"cookedFish",amount:1,ingredients:{rawFish:1,wood:1},seconds:8,category:"food",station:"grill",description:"A proper meal. Restores thirty hunger."},{id:"spear",name:"Wooden spear",output:"spear",amount:1,ingredients:{wood:5,rope:2,scrap:1},seconds:5,category:"tools",description:"The ocean has teeth. Now you do, too."},{id:"fishingRod",name:"Fishing rod",output:"fishingRod",amount:1,ingredients:{wood:4,rope:3},seconds:5,category:"tools",description:"There is always something beneath the surface."},{id:"paddle",name:"Wooden paddle",output:"paddle",amount:1,ingredients:{wood:4,plastic:2},seconds:3,category:"tools",description:"A little more say in where you end up."},{id:"heartyMeal",name:"Island stew",output:"heartyMeal",amount:1,ingredients:{rawFish:1,coconut:1,wood:1},seconds:8,category:"food",station:"grill",research:"resin",description:"A more sustaining meal: +45 hunger and +15 thirst."},...Object.entries(Nt).map(([s,t])=>({id:`build_${s}`,name:t.name,output:s,block:s,amount:1,ingredients:t.cost,seconds:0,category:"building",research:t.research,description:t.description}))],Ca=[{id:"palm",name:"Tropical paradise",sand:15784362,grass:6330971,rock:9214349,special:"resin",poi:{id:"spring",name:"Tidal spring",kind:"spring",icon:"water",loot:{water:2,resin:1},story:"Among the palms, someone lined a shallow spring with river stones. A little fresh water; a little proof that you are not the first to rest here."},treeCount:12,resources:["coconut","vine","wood","copper"]},{id:"reef",name:"Coral atoll",sand:15390902,grass:9546355,rock:9018269,special:"coral",poi:{id:"wreck",name:"Wrecked skiff",kind:"wreck",icon:"paddle",loot:{coral:2,scrap:3},story:"The old skiff never made it across the reef. Its weathered plates and sea glass carry the lesson onward: a home needs strong edges."},treeCount:7,resources:["copper","scrap","coconut","vine"]},{id:"ruins",name:"Jungle ruins",sand:14535071,grass:5014616,rock:9607311,special:"relic",poi:{id:"observatory",name:"Navigator’s temple",kind:"observatory",icon:"compass",loot:{relic:1,copper:2},story:"A brass lens still points into the trade winds. The keeper measured currents here, not days. Perhaps a way forward can be learned from what they left behind."},treeCount:9,resources:["copper","vine","scrap","coconut"]},{id:"pirate",legacyIndex:0,name:"Pirate hideout",sand:15123854,grass:6852439,rock:8687747,special:"resin",treeCount:18,resources:["coconut","vine","wood","copper"],poi:{id:"spring",name:"Quartermaster’s shelter",kind:"camp",icon:"backpack",loot:{water:2,resin:1},story:"A sailcloth roof, a marked chart, a share of provisions. The quartermaster left fresh water and palm resin for the next crew to find this sheltered shore."}},{id:"volcano",legacyIndex:1,name:"Volcanic terraces",sand:7831930,grass:7967083,rock:5332830,special:"coral",treeCount:10,resources:["copper","scrap","coconut","vine"],poi:{id:"wreck",name:"Basalt survey camp",kind:"camp",icon:"ore",loot:{coral:2,scrap:3},story:"The survey crew carried reef glass up to the cool basalt terraces to test their instruments. Copper in the scarps and sheltered palms still reward a patient landing."}},{id:"outpost",legacyIndex:2,name:"Overgrown research outpost",sand:14339499,grass:6198635,rock:8558737,special:"relic",treeCount:20,resources:["copper","vine","scrap","coconut"],poi:{id:"observatory",name:"Overgrown field station",kind:"observatory",icon:"research",loot:{relic:1,copper:2},story:"Vines have reclaimed the shutters, but a brass current-reader survives beneath the roof. The keeper’s measurements point to steady trade winds and a way to make your raft travel farther."}}],si={clear:{label:"Clear skies",icon:"sun",amplitude:1,fog:.0018,rain:0,duration:180,wind:6.4},rain:{label:"Passing rain",icon:"rain",amplitude:1.5,fog:.004,rain:.6,duration:110,wind:11.2},fog:{label:"Sea mist",icon:"fog",amplitude:.8,fog:.013,rain:0,duration:95,wind:3.8},storm:{label:"Storm warning",icon:"storm",amplitude:4,fog:.007,rain:1,duration:100,wind:24.6}},Eh=["hook","hammer","spear","cookedFish","water","fishingRod","paddle",null],Th={wood:12,plastic:8,leaf:10,scrap:5,rope:3,hook:1,hammer:1,spear:1,fishingRod:1,paddle:1,rawFish:2,cookedFish:2,water:3},bc=["Pelican Cay","Whisper Key","Morrow Atoll","Driftwood Reach","Lantern Isle","The Quiet Shore","Copperhead Cay","Saltwind Key","Sunspoke Island","Lost Letter Atoll"],Sc=[{title:"A letter, never sent",text:"If you are reading this, the currents brought us to the same place. There is copper in the cliffs, and an old signal component in every outpost. Three of them might be enough. Keep the fire lit. Someone is listening."},{title:"The keeper’s log",text:"Day 41. We stopped counting the miles. Mira says the ocean is not empty; it is simply keeping its own time. We left a radio component for the next traveler. May your seas be kinder than ours."},{title:"A frequency in the blue",text:"Frequency 104.8. At dawn, the static almost sounds like a voice. We have planted a palm beside the old station. By the time you find this, it should be tall enough to offer a little shade."}];class Ah{constructor(){this.listeners=new Map}on(t,e){return this.listeners.has(t)||this.listeners.set(t,new Set),this.listeners.get(t).add(e),()=>this.listeners.get(t)?.delete(e)}emit(t,e){this.listeners.get(t)?.forEach(i=>i(e))}}const dn=s=>Number.isSafeInteger(s)&&s>=0,pn=s=>Object.hasOwn(wt,s);class P0{constructor(t,e=Th){if(this.bus=t,this.items={},!e||typeof e!="object"||Array.isArray(e))throw new TypeError("Invalid inventory");for(const[i,n]of Object.entries(e)){if(!pn(i)||!dn(n))throw new TypeError(`Invalid inventory entry: ${i}`);this.items[i]=n}}count(t){return pn(t)&&this.items[t]||0}has(t){return!!t&&typeof t=="object"&&!Array.isArray(t)&&Object.entries(t).every(([e,i])=>pn(e)&&dn(i)&&i>0&&this.count(e)>=i)}add(t,e=1){return!pn(t)||!dn(e)||e===0||!dn(this.count(t)+e)?!1:(this.items[t]=this.count(t)+e,this.bus.emit("inventory",{id:t,amount:e}),!0)}grant(t){if(!t||typeof t!="object"||Array.isArray(t)||Object.entries(t).some(([e,i])=>!pn(e)||!dn(i)||i===0||!dn(this.count(e)+i)))return!1;for(const[e,i]of Object.entries(t))this.items[e]=this.count(e)+i;return Object.keys(t).length&&this.bus.emit("inventory",{}),!0}remove(t,e=1){return!pn(t)||!dn(e)||e===0||this.count(t)<e?!1:(this.items[t]=this.count(t)-e,this.bus.emit("inventory",{id:t,amount:-e}),!0)}spend(t){if(!this.has(t))return!1;for(const[e,i]of Object.entries(t))this.items[e]-=i;return this.bus.emit("inventory",{}),!0}toJSON(){return{...this.items}}}class I0{constructor(t,e={}){this.bus=t,this.health=e.health??100,this.hunger=e.hunger??92,this.thirst=e.thirst??88,this.stung=e.stung??0,this.alive=this.health>0,this._tick=0}update(t,e=!1){if(this.alive){if(this.stung=Math.max(0,this.stung-t),!e){this.thirst=Math.max(0,this.thirst-.5*t),this.hunger=Math.max(0,this.hunger-.2*t);let i=(this.thirst<=0?2:0)+(this.hunger<=0?.5:0);i?this.damage(i*t):this.thirst>80&&this.hunger>80&&(this.health=Math.min(100,this.health+t))}this._tick+=t,this._tick>.2&&(this._tick=0,this.bus.emit("stats",this))}}consume(t,e){const i=wt[t];return!i?.consumable||!e.remove(t)?!1:(this.hunger=Math.min(100,Math.max(0,this.hunger+(i.hunger||0))),this.thirst=Math.min(100,Math.max(0,this.thirst+(i.thirst||0))),this.health=Math.min(100,Math.max(0,this.health+(i.health||0))),this.bus.emit("stats",this),this.checkDeath(),!0)}damage(t){!Number.isFinite(t)||t<0||(this.health=Math.max(0,this.health-t),t>=2&&this.bus.emit("damage",t),this.checkDeath())}checkDeath(){this.health<=0&&this.alive&&(this.alive=!1,this.bus.emit("death"))}sting(){this.damage(5),this.stung=10,this.bus.emit("sting")}toJSON(){return{health:this.health,hunger:this.hunger,thirst:this.thirst,stung:this.stung,alive:this.alive}}}const Ae=(s,t,e)=>`${s},${t},${e}`,D0=[[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]];class Rh{constructor(t){this.bus=t,this.blocks=new Map,this.sequence=0}at(t,e,i){return this.blocks.get(Ae(t,e,i))}neighbors(t){return D0.map(([e,i,n])=>this.at(t.x+e,t.y+i,t.z+n)).filter(Boolean)}canPlace(t,e,i,n,r=new Set){const a=Nt[t];if(!a)return{valid:!1,reason:"Unknown structure"};if(![e,i,n].every(Number.isInteger))return{valid:!1,reason:"Use the one-meter building grid"};if(this.blocks.size>=2e3)return{valid:!1,reason:"Raft structure limit reached (2000)"};if(this.at(e,i,n))return{valid:!1,reason:"This space is occupied"};if(a.research&&!r.has(a.research))return{valid:!1,reason:`Research ${wt[a.research].name.toLowerCase()} first`};if(Math.abs(e)>35||Math.abs(n)>35||i>8||i<0)return{valid:!1,reason:"Outside the building area"};if(t==="foundation"||t==="net"){if(i!==0)return{valid:!1,reason:"Foundations belong at sea level"};const h=[[1,0],[-1,0],[0,1],[0,-1]].some(([c,u])=>{const d=this.at(e+c,0,n+u);return d&&Nt[d.type].buoyant});return{valid:h,reason:h?"Ready to build":"Connect to an existing foundation"}}const o=this.at(e,i-1,n);if(t==="armor")return{valid:!!o&&!!Nt[o.type].buoyant,reason:o&&Nt[o.type].buoyant?"Ready to build":"Place plating directly over a foundation"};if(t==="floor"){const h=o&&["wall","stairs"].includes(o.type),c=[[1,0],[-1,0],[0,1],[0,-1]].some(([u,d])=>this.at(e+u,i,n+d)?.type==="floor");return{valid:!!(h||i>0&&c),reason:h||c?"Ready to build":"Requires a wall or stairs below"}}const l=!!o&&["foundation","floor","net"].includes(o.type);return{valid:l,reason:l?"Ready to build":"Needs a supporting floor"}}add(t,e,i,n,r=!1,a=null,o={}){if(!Object.hasOwn(Nt,t)||![e,i,n].every(Number.isInteger)||this.at(e,i,n))throw new TypeError("Invalid or occupied grid cell");const l={id:++this.sequence,type:t,x:e,y:i,z:n,core:!!r,hp:a??Nt[t].hp,rotation:o.rotation||0,production:o.production||0};return this.blocks.set(Ae(e,i,n),l),this.bus.emit("blockAdded",l),l}connectedKeys(t=null){const e=new Set,i=[],n=r=>{if(!r)return;const a=Ae(r.x,r.y,r.z);a!==t&&!e.has(a)&&(e.add(a),i.push(r))};for(const r of this.blocks.values())r.core&&r.hp>0&&r.y===0&&Nt[r.type].buoyant&&n(r);for(let r=0;r<i.length;r++){const a=i[r];if(a.y===0&&Nt[a.type].buoyant)for(const[l,h]of[[1,0],[-1,0],[0,1],[0,-1]]){const c=this.at(a.x+l,0,a.z+h);c&&Nt[c.type].buoyant&&n(c)}else if(a.type==="floor")for(const[l,h]of[[1,0],[-1,0],[0,1],[0,-1]]){const c=this.at(a.x+l,a.y,a.z+h);c?.type==="floor"&&n(c)}const o=this.at(a.x,a.y+1,a.z);o&&(o.type==="floor"&&["wall","stairs"].includes(a.type)?n(o):o.type==="armor"?a.y===0&&Nt[a.type].buoyant&&n(o):!Nt[o.type].buoyant&&o.type!=="floor"&&["foundation","net","floor"].includes(a.type)&&n(o))}return e}previewRemoval(t){if(!t)return[];const e=Ae(t.x,t.y,t.z),i=this.connectedKeys(e);return[...this.blocks.values()].filter(n=>Ae(n.x,n.y,n.z)!==e&&!i.has(Ae(n.x,n.y,n.z)))}remove(t,e,i,n=!0){const r=Ae(t,e,i),a=this.blocks.get(r);return a?(this.blocks.delete(r),this.bus.emit("blockRemoved",a),n?[a,...this.checkIntegrity()]:[a]):[]}checkIntegrity(){const t=this.connectedKeys(),e=[];for(const[i,n]of this.blocks)t.has(i)||(this.blocks.delete(i),e.push(n),this.bus.emit("blockDetached",n));return e}damage(t,e){!t||!Number.isFinite(e)||e<0||this.at(t.x,t.y,t.z)!==t||(t.hp=Math.max(0,t.hp-e),this.bus.emit("blockDamaged",t),t.hp<=0&&this.remove(t.x,t.y,t.z))}exposedFoundations(){return[...this.blocks.values()].filter(t=>Nt[t.type].buoyant&&[[1,0],[-1,0],[0,1],[0,-1]].some(([e,i])=>!this.at(t.x+e,0,t.z+i)))}toJSON(){return[...this.blocks.values()].map(({mesh:t,...e})=>e)}}class L0{constructor(t,e){this.inventory=t,this.bus=e,this.job=null,this.research=new Set}start(t,e=!0,i=null){return!t||!pn(t.output)||!Number.isFinite(t.seconds)||t.seconds<=0?{ok:!1,reason:"Select a craftable recipe"}:this.job?{ok:!1,reason:"Your workbench is already busy"}:t.research&&!this.research.has(t.research)?{ok:!1,reason:"Research the required item first"}:(i===null&&this.resolveStation&&(i=this.resolveStation(t),e=e&&!!i),e?t.block?{ok:!1,reason:"Select this structure in build mode"}:this.inventory.spend(t.ingredients)?(this.job={recipe:t,elapsed:0,stationKey:i},this.bus.emit("craftStarted",this.job),{ok:!0}):{ok:!1,reason:"Not enough materials"}:{ok:!1,reason:`Stand near a ${t.station||"workbench"}`})}update(t){if(!(!this.job||!Number.isFinite(t)||t<=0)&&(this.job.elapsed+=t,this.job.elapsed>=this.job.recipe.seconds)){const{recipe:e}=this.job;this.job=null,this.inventory.add(e.output,e.amount)?this.bus.emit("craftComplete",e):(this.inventory.grant(e.ingredients),this.bus.emit("craftCancelled"))}}cancel(){if(!this.job)return!1;const{recipe:t}=this.job;return this.job=null,this.inventory.grant(t.ingredients),this.bus.emit("craftCancelled"),!0}canResearch(t){const e=_n[t];return!!e&&this.inventory.count(t)>0&&!this.research.has(t)&&e.requires.every(i=>this.research.has(i))}researchItem(t){return this.canResearch(t)?(this.research.add(t),this.bus.emit("researched",t),!0):!1}}class U0{constructor(t=1/30,e=8,i=.25){this.step=t,this.maxSteps=e,this.maxFrame=i,this.accumulator=0,this.droppedSeconds=0,this.totalSteps=0,this.lastSteps=0}reset(){this.accumulator=0,this.lastSteps=0}advance(t,e){if(!Number.isFinite(t)||t<0)return this.reset(),0;const i=Math.min(t,this.maxFrame);this.droppedSeconds+=t-i,this.accumulator+=i;let n=0;for(;this.accumulator+1e-9>=this.step&&n<this.maxSteps;)e(this.step),this.accumulator-=this.step,n++;if(this.accumulator<0&&(this.accumulator=0),this.accumulator>=this.step){const r=this.accumulator-this.accumulator%this.step;this.droppedSeconds+=r,this.accumulator%=this.step}return this.lastSteps=n,this.totalSteps+=n,n*this.step}}class Ch{constructor(t,e=0,i=()=>{}){this.create=t,this.free=[],this.active=new Set,this.onRelease=i;for(let n=0;n<e;n++)this.free.push(t())}acquire(){const t=this.free.pop()||this.create();return this.active.add(t),t.visible=!0,t}release(t){this.active.delete(t)&&(t.visible=!1,this.onRelease(t),this.free.push(t))}releaseAll(){for(const t of[...this.active])this.release(t)}}class N0{constructor(t,e={}){this.bus=t,this.elapsed=e.elapsed??270,this.weather=e.weather||"clear",this.weatherTime=e.weatherTime??0,this.dayLength=1200,this.dynamic=!0}update(t){if(this.elapsed+=t,this.weatherTime+=t,this.dynamic&&this.weatherTime>(this.weather==="clear"?180:105)){const e=this.weather==="clear"?["rain","fog","clear","storm"]:["clear","clear","rain"];this.setWeather(e[Math.floor(Math.random()*e.length)])}}setWeather(t){if(!["clear","rain","fog","storm"].includes(t))return!1;this.weather=t,this.weatherTime=0,this.bus.emit("weather",t)}get day(){return 1+Math.floor(this.elapsed/this.dayLength)}get fraction(){return(this.elapsed/this.dayLength+.18)%1}get clock(){const t=this.fraction*24;return`${String(Math.floor(t)).padStart(2,"0")}:${String(Math.floor(t%1*60)).padStart(2,"0")}`}toJSON(){return{elapsed:this.elapsed,weather:this.weather,weatherTime:this.weatherTime}}}function Ar(s,t,e=7341){let i=Math.imul(s^e,374761393)+Math.imul(t,668265263);return i=Math.imul(i^i>>>13,1274126177),((i^i>>>16)>>>0)/4294967295}function ki(s){return()=>{s|=0,s=s+1831565813|0;let t=Math.imul(s^s>>>15,1|s);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}function ve(s,t,e){return Math.max(t,Math.min(e,s))}function De(s,t,e){const i=ve((e-s)/(t-s),0,1);return i*i*(3-2*i)}function k0(s,t=!1){const e=s[0].index!==null,i=new Set(Object.keys(s[0].attributes)),n=new Set(Object.keys(s[0].morphAttributes)),r={},a={},o=s[0].morphTargetsRelative,l=new ce;let h=0;for(let c=0;c<s.length;++c){const u=s[c];let d=0;if(e!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+c+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const p in u.attributes){if(!i.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+c+'. All geometries must have compatible attributes; make sure "'+p+'" attribute exists among all geometries, or in none of them.'),null;r[p]===void 0&&(r[p]=[]),r[p].push(u.attributes[p]),d++}if(d!==i.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+c+". Make sure all geometries have the same number of attributes."),null;if(o!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+c+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const p in u.morphAttributes){if(!n.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+c+".  .morphAttributes must be consistent throughout all geometries."),null;a[p]===void 0&&(a[p]=[]),a[p].push(u.morphAttributes[p])}if(t){let p;if(e)p=u.index.count;else if(u.attributes.position!==void 0)p=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+c+". The geometry must have either an index or a position attribute"),null;l.addGroup(h,p,c),h+=p}}if(e){let c=0;const u=[];for(let d=0;d<s.length;++d){const p=s[d].index;for(let g=0;g<p.count;++g)u.push(p.getX(g)+c);c+=s[d].attributes.position.count}l.setIndex(u)}for(const c in r){const u=wc(r[c]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+c+" attribute."),null;l.setAttribute(c,u)}for(const c in a){const u=a[c][0].length;if(u===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[c]=[];for(let d=0;d<u;++d){const p=[];for(let v=0;v<a[c].length;++v)p.push(a[c][v][d]);const g=wc(p);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+c+" morphAttribute."),null;l.morphAttributes[c].push(g)}}return l}function wc(s){let t,e,i,n=-1,r=0;for(let h=0;h<s.length;++h){const c=s[h];if(t===void 0&&(t=c.array.constructor),t!==c.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=c.itemSize),e!==c.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(i===void 0&&(i=c.normalized),i!==c.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(n===-1&&(n=c.gpuType),n!==c.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=c.count*e}const a=new t(r),o=new ye(a,e,i);let l=0;for(let h=0;h<s.length;++h){const c=s[h];if(c.isInterleavedBufferAttribute){const u=l/e;for(let d=0,p=c.count;d<p;d++)for(let g=0;g<e;g++){const v=c.getComponent(d,g);o.setComponent(d+u,g,v)}}else a.set(c.array,l);l+=c.count*e}return n!==void 0&&(o.gpuType=n),o}const Pa=new Map,Ia=new Map,Da=new Map;function bi(s,t){if(!Ia.has(s)){const e=t();e.userData.shared=!0,Ia.set(s,e)}return Ia.get(s)}function we(s,t={}){const e=String(s)+":"+Object.keys(t).sort().map(i=>`${i}=${t[i]?.isTexture?t[i].uuid:t[i]}`).join(";");if(!Pa.has(e)){const i=new S0({color:s,roughness:.84,...t});i.userData.shared=!0,Pa.set(e,i)}return Pa.get(e)}function ot(s,t,e,i,n=0,r=0,a=0,o={}){const l=new Yt(bi("box",()=>new nn(1,1,1)),we(i,o));return l.scale.set(s,t,e),l.position.set(n,r,a),l.castShadow=!0,l.receiveShadow=!0,l}function Pt(s,t,e,i,n=0,r=0,a=0,o=8){const l=s/t,h=new Yt(bi(`cylinder:${l}:${o}`,()=>new Gr(l,1,1,o)),we(i));return h.scale.set(t,e,t),h.position.set(n,r,a),h.castShadow=!0,h.receiveShadow=!0,h}function de(s,t,e=0,i=0,n=0,r=10){const a=new Yt(bi(`sphere:${r}`,()=>new Os(1,r,Math.max(5,r/2))),we(t));return a.scale.setScalar(s),a.position.set(e,i,n),a.castShadow=!0,a}function Rt(s,t,e,i,n=7){const r=new C(...s),a=new C(...t),o=a.clone().sub(r),l=Pt(e,e,o.length(),i,...r.clone().add(a).multiplyScalar(.5).toArray(),n);return l.quaternion.setFromUnitVectors(new C(0,1,0),o.normalize()),l}function Ph(s){const t=new Set,e=new Set;s.traverse(i=>{i.isInstancedMesh&&i.dispose(),i.geometry&&!i.geometry.userData.shared&&t.add(i.geometry);for(const n of Array.isArray(i.material)?i.material:[i.material])n&&!n.userData.shared&&e.add(n)});for(const i of t)i.dispose();for(const i of e)i.dispose()}function Be(s,t=!1){s.updateMatrixWorld(!0);const e=s.matrixWorld.clone().invert(),i=new Map,n=new Set;s.traverse(r=>{if(!r.isMesh||Array.isArray(r.material))return;const a=r.material,o={roughness:a.roughness,metalness:a.metalness,side:a.side,transparent:a.transparent,opacity:a.opacity,vertexColors:!0};a.map&&(o.map=a.map),a.emissive?.getHex()&&(o.emissive=a.emissive.getHex(),o.emissiveIntensity=a.emissiveIntensity);const l=we(16777215,o),h=l.uuid;i.has(h)||i.set(h,{material:l,geos:[]});const c=r.geometry.clone();c.applyMatrix4(e.clone().multiply(r.matrixWorld)),a.map||c.deleteAttribute("uv");const u=c.attributes.position.count,d=new Float32Array(u*3),p=c.attributes.color;for(let g=0;g<u;g++)d[g*3]=a.color.r*(p?p.getX(g):1),d[g*3+1]=a.color.g*(p?p.getY(g):1),d[g*3+2]=a.color.b*(p?p.getZ(g):1);c.setAttribute("color",new ye(d,3)),c.index||c.setIndex(Array.from({length:u},(g,v)=>v)),i.get(h).geos.push(c),r.geometry.userData.shared||n.add(r.geometry)}),s.clear();for(const r of i.values()){const a=k0(r.geos,!1);if(!a)throw new Error("Incompatible static geometry");a.userData.shared=t,a.computeBoundingSphere();const o=new Yt(a,r.material);o.castShadow=!0,o.receiveShadow=!0,s.add(o);for(const l of r.geos)l.dispose()}for(const r of n)r.dispose();return s}const ji=[11237193,12355671,13079650,11960657,13277544];function O0(){const s=document.createElement("canvas");s.width=256,s.height=64;const t=s.getContext("2d");t.fillStyle="#ffffff",t.fillRect(0,0,256,64);const e=ki(892);for(let n=0;n<85;n++){t.strokeStyle=`rgba(65,36,15,${e()*.13+.015})`,t.lineWidth=.3+e()*1.2,t.beginPath();const r=e()*64;t.moveTo(e()*30,r),t.bezierCurveTo(80,r+e()*5,180,r-3,256,r+e()*4),t.stroke()}const i=new _h(s);return i.colorSpace=Ge,i.wrapS=i.wrapT=Cr,i}let La;function F0(s=!1){La||(La=O0());const t=new kt;if(s){t.add(ot(1,.16,.1,ji[1],0,.17,-.45),ot(1,.16,.1,ji[1],0,.17,.45),ot(.1,.16,.8,ji[2],-.45,.17,0),ot(.1,.16,.8,ji[2],.45,.17,0));for(let e=-3;e<=3;e++)t.add(Rt([e*.12,.11,-.4],[e*.12,.11,.4],.009,13945247,4),Rt([-.4,.11,e*.12],[.4,.11,e*.12],.009,13945247,4))}else for(let e=0;e<4;e++){t.add(ot(.974,.13,.226,ji[e%5],0,.19,(e-1.5)*.243,{map:La}));for(const i of[-.4,.4])t.add(Pt(.012,.012,.003,4936013,i,.258,(e-1.5)*.243,5))}for(const e of[-.31,.31]){const i=Pt(.092,.092,.95,7361593,0,-.015,e,8);i.rotation.z=Math.PI/2,t.add(i)}return t.add(ot(.14,.12,.99,7954495,-.32,.05,0),ot(.14,.12,.99,7954495,.32,.05,0)),t}function z0(s){if(s==="foundation"||s==="net")return F0(s==="net");const t=new kt;if(s==="floor"){for(let e=0;e<4;e++)t.add(ot(.97,.1,.23,ji[e],0,.03,(e-1.5)*.245));t.add(ot(.1,.14,.95,8413502,-.36,-.04,0),ot(.1,.14,.95,8413502,.36,-.04,0))}if(s==="wall"){for(let e=0;e<5;e++)t.add(ot(.18,.94,.07,ji[e],(e-2)*.196,.48,-.43));t.add(ot(.98,.08,.1,7361082,0,.12,-.43),ot(.98,.08,.1,7361082,0,.83,-.43))}if(s==="stairs"){for(let e=0;e<5;e++)t.add(ot(.82,.12,.23,ji[e%5],0,.1+e*.2,-.4+e*.2));t.add(Rt([-.35,0,-.5],[-.35,1,.5],.055,7950904),Rt([.35,0,-.5],[.35,1,.5],.055,7950904))}if(s==="workbench"){for(const n of[-.34,.34])for(const r of[-.26,.26])t.add(ot(.09,.55,.09,9332034,n,.27,r));t.add(ot(.93,.1,.69,13081451,0,.58,0),ot(.78,.08,.48,9334088,0,.17,0));const e=ot(.25,.013,.34,14209453,-.16,.64,0);e.rotation.y=.2,t.add(e),t.add(ot(.15,.08,.14,6649717,.26,.67,-.12),Rt([.27,.7,-.12],[.27,.83,-.12],.02,9411473));const i=Pt(.07,.06,.15,7773069,.25,.69,.16);t.add(i,Rt([.25,.76,.16],[.23,.99,.14],.013,9199936),Rt([.25,.76,.16],[.29,.96,.19],.013,7760464))}if(s==="purifier"){for(const i of[-.29,.29])for(const n of[-.24,.24])t.add(Rt([i,0,n],[i*.8,.7,n*.8],.022,9005891));t.add(Pt(.29,.22,.19,6515555,0,.14,0,12),Pt(.24,.24,.018,6534330,0,.24,0,16));const e=ot(.7,.025,.64,15063221,0,.7,0);e.rotation.z=.15,t.add(e),t.add(Pt(.07,.07,.14,8829106,.28,.36,.25))}if(s==="grill"){for(const i of[-.22,.22])for(const n of[-.2,.2])t.add(Rt([i,0,n],[i*.8,.4,n*.8],.023,6055262));t.add(Pt(.33,.24,.22,5070169,0,.4,0,12),Pt(.29,.29,.01,14252601,0,.5,0,12));for(let i=-2;i<=2;i++)t.add(Rt([-.28,.52,i*.1],[.28,.52,i*.1],.011,3623233,5));const e=Ih(!0);e.scale.setScalar(.5),e.position.set(0,.56,0),t.add(e)}if(s==="sail"){t.add(Pt(.043,.065,2.9,10977364,0,1.45,0),Rt([-.9,.75,.02],[.9,.75,.02],.035,9795662));const e=[],i=[];for(let h=0;h<=8;h++){const c=h/8,u=.83*(1-c);for(let d=0;d<=8;d++){const p=d/8;e.push((p*2-1)*u,.8+c*1.85,.18*Math.sin(p*Math.PI)*Math.sin((c+.2)*Math.PI)),i.push(p,c)}}const n=[];for(let h=0;h<8;h++)for(let c=0;c<8;c++){const u=h*9+c;n.push(u,u+1,u+9,u+1,u+10,u+9)}const r=new ce;r.setAttribute("position",new se(e,3)),r.setAttribute("uv",new se(i,2)),r.setIndex(n),r.computeVertexNormals();const a=new Yt(r,we(15787978,{side:Ne}));a.castShadow=!0,a.name="sail-cloth",t.add(a);const o=ot(.43,.11,.012,11889480,0,1.38,.18);t.add(o);const l=new ce().setFromPoints([new C(0,2.85,0),new C(.47,2.72,0),new C(0,2.6,0)]);l.setIndex([0,1,2]),l.computeVertexNormals(),t.add(new Yt(l,we(12938056,{side:Ne})))}if(s==="rainCollector"){for(const e of[-.3,.3])for(const i of[-.3,.3])t.add(Rt([e,0,i],[e,.85,i],.025,10256469));t.add(Pt(.4,.23,.12,7968909,0,.87,0,12),Pt(.22,.22,.5,8891557,0,.3,0,12),Pt(.19,.19,.02,7520196,0,.56,0,12)),t.add(Rt([0,.85,0],[0,.6,0],.04,13155734))}if(s==="armor"){t.add(ot(.98,.055,.98,7968141,0,.045,0),ot(.95,.17,.05,11188133,0,.08,-.46),ot(.95,.17,.05,11188133,0,.08,.46));for(const e of[-.38,.38])for(const i of[-.38,.38])t.add(Pt(.035,.035,.02,13092266,e,.085,i,6))}if(s==="windcatcher"){t.add(ot(.6,.12,.6,9205841,0,.08,0),Pt(.035,.045,1.65,10261873,0,.9,0),Rt([-.45,1.55,0],[.45,1.55,0],.018,12759422));const e=ot(.35,.2,.025,13077089,.25,1.55,0);e.rotation.y=.3,t.add(e,de(.12,9088674,0,1.85,0,8))}if(s==="beacon"){t.add(ot(.6,.25,.5,6190964,0,.14,0),ot(.33,.15,.02,13547124,0,.17,.26),Pt(.025,.025,2.3,10399652,0,1.4,0));for(const i of[.8,1.25,1.8])t.add(Rt([-.45,i,0],[.45,i,0],.018,8427149));const e=de(.09,15316311,0,2.6,0);e.material=we(15316311,{emissive:15316311,emissiveIntensity:2}),t.add(e)}return t}function Ec(s){if(!Da.has(s)){const e=z0(s);s!=="sail"?Be(e,!0):e.traverse(i=>{i.geometry&&(i.geometry.userData.shared=!0)}),Da.set(s,e)}const t=Da.get(s).clone(!0);return s==="sail"&&(t.userData.sail=t.getObjectByName("sail-cloth")),t}function Ih(s=!1){const t=new kt,e=de(.23,s?12946263:8167849);e.scale.multiply(new C(1.7,.5,.65)),t.add(e);const i=new Yt(bi("fish-tail",()=>new Wr(.15,.23,3)),we(s?10053693:7114142));return i.rotation.z=-Math.PI/2,i.position.x=-.4,t.add(i),t.add(de(.015,3161399,.25,.06,.08)),t}function B0(s){const t=new kt;if(s==="wood"&&(t.add(ot(.95,.09,.16,12095071),ot(.62,.07,.13,13081964,.08,-.035,.08)),t.rotation.y=.7),s==="leaf"){const e=Dh(.88,.23,8232296);e.rotation.x=Math.PI/2,e.position.z=-.4,t.add(e)}if(s==="plastic"){const e=Pt(.09,.1,.4,10078660,0,0,0,8);e.rotation.z=1.3,t.add(e);const i=Pt(.045,.045,.12,13688778,.22,.06,0,7);i.rotation.z=1.3,t.add(i)}if(s==="scrap"){const e=ot(.45,.07,.36,9346452);e.rotation.z=.1,t.add(e,ot(.13,.1,.14,11971717,.1,.05,.07))}if(s==="barrel"){t.add(Pt(.29,.27,.63,11237197,0,0,0,12));for(const e of[-.22,.22])t.add(Pt(.305,.305,.055,5729122,0,e,0,12));for(let e=0;e<6;e++){const i=e*Math.PI/3;t.add(Rt([Math.cos(i)*.281,-.27,Math.sin(i)*.281],[Math.cos(i)*.281,.27,Math.sin(i)*.281],.006,8412479,4))}t.add(Pt(.07,.07,.01,6314046,.1,.32,0,8)),t.rotation.z=.34}return t.userData.type=s,t}const Ua=new Map;function H0(s){return Ua.has(s)||Ua.set(s,Be(B0(s),!0)),Ua.get(s).clone(!0)}function Tc(){const s=new kt,t=new bh([new C(0,.19,0),new C(0,0,0),new C(0,-.12,0),new C(-.1,-.18,0),new C(-.2,-.1,0),new C(-.16,-.02,0)]);return s.add(new Yt(bi("hook",()=>new jo(t,16,.023,6,!1)),we(8886415,{metalness:.55,roughness:.35}))),s.add(Pt(.036,.036,.17,12425058,0,.17,0)),s}function V0(){const s=new kt;return s.add(Pt(.025,.025,1.2,10121286,0,.4,0),ot(.21,.46,.035,12290640,0,-.4,0)),s}function G0(){const s=new kt;return s.add(Pt(.018,.027,1.7,10914658,0,.6,0)),s.add(new Yt(bi("spear-tip",()=>new Wr(.06,.27,4)),we(11123377))),s.children[1].position.y=1.57,s}function W0(){const s=new kt,t=new kt;s.add(t),s.userData.body=t,t.add(ot(.36,.43,.23,6066055,0,.95,0),ot(.35,.21,.24,12819041,0,.66,0));const e=de(.18,14003587,0,1.37,0,12);e.scale.y*=1.12,t.add(e),t.add(de(.18,5981749,0,1.45,-.035));const i=Pt(.31,.32,.035,14731161,0,1.56,0,14),n=Pt(.185,.2,.14,14269574,0,1.64,0,12);t.add(i,n,Pt(.202,.203,.04,10840647,0,1.6,0,12));for(const o of[-.064,.064])t.add(de(.016,3687743,o,1.39,.153));t.add(ot(.28,.3,.12,12088652,0,1.02,-.17),ot(.32,.04,.14,13738860,0,1.17,-.17));const r=[],a=[];for(const o of[-.24,.24]){const l=new kt;l.position.set(o,1.11,0),l.add(Pt(.063,.052,.33,6657931,0,-.12,0),Pt(.05,.044,.23,13871744,0,-.36,0),de(.052,13871744,0,-.49,0)),t.add(l),r.push(l)}for(const o of[-.105,.105]){const l=new kt;l.position.set(o,.61,0),l.add(Pt(.078,.055,.53,13673340,0,-.27,0),ot(.12,.09,.22,6707779,0,-.56,.035)),t.add(l),a.push(l)}return s.userData.arms=r,s.userData.legs=a,s.userData.tool=new kt,s.userData.tool.position.set(0,-.45,.06),r[1].add(s.userData.tool),s}function Dh(s=2.6,t=.44,e=7181404){const i=bi("palm-leaf",()=>{const r=[],a=[];for(let h=0;h<=8;h++){const c=h/8,u=Math.sin(Math.pow(c,.7)*Math.PI),d=-c*c*.33+.045*Math.sin(c*Math.PI);r.push(-u,d,c,0,d+.017,c,u,d,c)}for(let h=0;h<8;h++){const c=h*3;a.push(c,c+3,c+1,c+1,c+3,c+4,c+1,c+4,c+2,c+2,c+4,c+5)}const l=new ce;return l.setAttribute("position",new se(r,3)),l.setIndex(a),l.computeVertexNormals(),l}),n=new Yt(i,we(e,{side:Ne,roughness:.9}));return n.scale.set(t,s,s),n.castShadow=!0,n}function Ac(s=Math.random,t=1,e=10003348){const i=new Yt(bi("rock",()=>new $r(1,0)),we(e,{flatShading:!0}));return i.scale.set((1+s()*.5)*t,(.6+s()*.8)*t,(.7+s()*.6)*t),i.rotation.set(s(),s()*6,s()*.2),i.castShadow=!0,i.receiveShadow=!0,i}function $0(){const s=new kt,t=de(.45,6917262,0,-.35,0,14);t.scale.multiply(new C(.77,.7,2.6)),s.add(t);const e=de(.33,7904411,0,-.34,.9,10);e.scale.multiply(new C(.8,.6,1.6)),s.add(e);const i=de(.35,12963771,0,-.53,.1,12);i.scale.multiply(new C(.8,.35,2.7)),s.add(i);function n(a,o){const l=new ce().setFromPoints(a.map(h=>new C(...h)));return l.setIndex([0,1,2]),l.computeVertexNormals(),new Yt(l,we(o,{side:Ne}))}s.add(n([[0,-.15,-.3],[0,.58,-.45],[0,-.08,.3]],6455169)),s.add(n([[-.2,-.4,.4],[-1,-.45,-.18],[-.2,-.4,-.3]],7837593),n([[.2,-.4,.4],[1,-.45,-.18],[.2,-.4,-.3]],7837593));const r=new kt;r.position.z=-1.18,r.add(n([[0,-.35,0],[0,.15,-.66],[0,-.4,-.42]],7179408),n([[0,-.35,0],[0,-.88,-.56],[0,-.4,-.42]],7179408)),s.add(r),s.userData.tail=r;for(const a of[-.235,.235]){s.add(de(.045,2505276,a,-.27,1.02,6));for(let o=0;o<3;o++){const l=Rt([a*1.3,-.18,.45-o*.11],[a*1.3,-.48,.39-o*.11],.012,5009521,4);s.add(l)}}return s}let Na;function X0(){if(!Na){const s=new kt;s.add(new Yt(bi("jelly-dome",()=>new Os(.24,10,6,0,Math.PI*2,0,Math.PI*.55)),we(11064526,{transparent:!0,opacity:.7,emissive:4295313,emissiveIntensity:.35})));for(let t=0;t<6;t++){const e=t*Math.PI/3;s.add(Rt([Math.cos(e)*.12,0,Math.sin(e)*.12],[Math.cos(e+.3)*.12,-.45,Math.sin(e+.3)*.12],.009,11785934))}Na=Be(s,!0)}return Na.clone(!0)}function q0(){const s=new kt,t=bi("bird-wing",()=>new ce().setFromPoints([new C(0,0,.12),new C(-.7,.05,0),new C(-.25,0,-.15)]));t.setIndex([0,1,2]),t.computeVertexNormals();const e=new Yt(t,we(15001816,{side:Ne})),i=e.clone();return i.scale.x=-1,s.add(e,i),s.userData.wings=[e,i],s.add(de(.07,15198424,0,0,0,6)),s}function Y0(s){if(s==="0,-1")return 4281;const[t,e]=s.split(",").map(Number);return Math.floor(Ar(t,e,9218)*999999)}function Lh(s){const t=[0,1,2],e=ki(s^24209);for(let i=2;i>0;i--){const n=Math.floor(e()*(i+1));[t[i],t[n]]=[t[n],t[i]]}return t}function j0(s){const t=new Set(s),e=new Set(s.filter(i=>/:explore:rune[0-2]$/.test(i)).map(i=>i.split(":")[0]));for(const i of e){if(!t.has(`${i}:explore:journal`))return!1;const n=Lh(Y0(i)),r=n.filter(a=>t.has(`${i}:explore:rune${a}`)).length;if(n.slice(0,r).some(a=>!t.has(`${i}:explore:rune${a}`)))return!1}return!0}const Rc=Math.PI*2,Cc={palm:{shape:"cove",height:6.8,beach:2.6,trees:46,undergrowth:220,water:6410166,flower:15774058},reef:{shape:"atoll",height:3.9,beach:2,trees:22,undergrowth:105,water:5821905,flower:15974574},ruins:{shape:"ridge",height:7.8,beach:1.8,trees:66,undergrowth:290,water:6667176,flower:13213146},pirate:{shape:"hook",height:6.1,beach:2.5,trees:40,undergrowth:185,water:4964281,flower:15180643},volcano:{shape:"caldera",height:9.2,beach:1.5,trees:20,undergrowth:100,water:6666175,flower:14917998},outpost:{shape:"headland",height:6.9,beach:2.2,trees:47,undergrowth:230,water:6931634,flower:14995850}};function Uh(s,t,e,i){const n=i.x-e.x,r=i.z-e.z,a=n*n+r*r,o=a?ve(((s-e.x)*n+(t-e.z)*r)/a,0,1):0;return{distance:Math.hypot(s-e.x-n*o,t-e.z-r*o),t:o}}function Cs(s,t,e){let i=1/0;for(const n of s.routes)for(let r=1;r<n.length;r++)i=Math.min(i,Uh(t,e,n[r-1],n[r]).distance);return i}function K0(s,t,e,i=""){const n=ki(s^5357735),r=Cc[e.id]||Cc.palm,a=Math.min(24,t*1.46),o=a*1.42,l=i==="0,-1"?-.43:n()*Rc,h=Math.cos(l),c=Math.sin(l),u=n()*Rc,d=r.height*(.88+n()*.18),p=n(),g={seed:s,biome:e,profile:r,radius:a,baseRadius:t,extent:o,angle:l,height:d,phase:u,variation:p,routes:[],pads:[],segments:64};g.toLocal=(E,S)=>({x:(E*h+S*c)*a,z:(-E*c+S*h)*a}),g.normalized=(E,S)=>({u:(E*h-S*c)/a,v:(E*c+S*h)/a}),g.signedDistance=(E,S)=>{const{u:M,v:R}=g.normalized(E,S),V=Math.atan2(R,M),O=r.shape;let N=.97+.074*Math.sin(V*3+u)+.052*Math.cos(V*5-u*.8)+.035*Math.sin(V*7+u*.4);(O==="ridge"||O==="headland")&&(N+=.065*Math.cos(V*2+.4)),O==="hook"&&(N+=.1*Math.sin(V*2-1.1));let D=(N-Math.hypot(M,R))*a;if(O==="cove"||O==="hook"){const U=O==="hook"?-.14:0,L=O==="hook"?.56:.7,B=O==="hook"?.43:.405,q=O==="hook"?.61:.65;D=Math.min(D,(Math.hypot((M-U)/B,(R-L)/q)-1)*Math.min(B,q)*a)}else O==="atoll"&&(D=Math.min(D,(Math.hypot(M/.43,(R-.025)/.405)-1)*a*.405),D=Math.min(D,Math.max(Math.abs(M)-.145,.23-R)*a));return D},g.rawHeight=(E,S)=>{const{u:M,v:R}=g.normalized(E,S),V=g.signedDistance(E,S);if(V<0)return Math.max(-5,V*.59-.035);const O=De(r.beach*.6,r.beach*1.75,V),N=r.shape;let D;if(N==="atoll")D=d*(.22+.7*Math.exp(-((M+.48)**2/.07+(R+.5)**2/.16))+.38*Math.exp(-((M-.65)**2/.08+(R+.1)**2/.22)));else if(N==="caldera"){const B=Math.hypot(M*.98,(R+.23)*1.09);D=.6+d*(.87*Math.exp(-(((B-.34)/.18)**2))+.26*Math.exp(-((M+.5)**2/.14+(R-.1)**2/.3)))}else N==="ridge"?D=.5+d*(.88*Math.exp(-((M+.23)**2/.16+(R+.31)**2/.32))+.52*Math.exp(-((M-.47)**2/.09+(R+.18)**2/.22))):N==="headland"?D=.55+d*(.95*Math.exp(-((M+.38)**2/.13+(R+.34)**2/.31))+.25*Math.exp(-((M-.4)**2/.14+(R+.12)**2/.18))):D=.4+d*(.95*Math.exp(-((M+.18)**2/.3+(R+.43)**2/.14))+.28*Math.exp(-((M-.6)**2/.07+(R-.1)**2/.2)));const U=1.7+De(1.45,2.15,D)*1.15+De(3.25,3.85,D)*1.45+Math.max(0,D-4.1)*.7;D=Me.lerp(D,U,.38);const L=(Math.sin(M*12+u)*Math.cos(R*10-u)*.14+Math.sin(M*21+R*15+u)*.065)*O;return .065+Math.min(V,2)*.065+O*D+L};const m=r.shape==="atoll"?[[.79,.39],[.78,-.04],[.6,-.55],[.14,-.76],[-.38,-.67],[-.73,-.18],[-.75,.3]]:[[.71,.53],[.65,.1],[.34,-.22],[.03,-.39],[-.34,-.57],[-.62,-.28],[-.68,.06]],f=m.map(([E,S],M)=>{M>0&&M<m.length-1&&(E+=(n()-.5)*.045,S+=(n()-.5)*.045);const R=g.toLocal(E,S);return{...R,y:Math.max(.24,g.rawHeight(R.x,R.z))}});f[0].y=.24;for(let E=1;E<f.length;E++){const S=Math.hypot(f[E].x-f[E-1].x,f[E].z-f[E-1].z);f[E].y=Math.min(f[E].y,f[E-1].y+S*.34)}for(let E=f.length-2;E>=0;E--){const S=Math.hypot(f[E].x-f[E+1].x,f[E].z-f[E+1].z);f[E].y=Math.min(f[E].y,f[E+1].y+S*.34)}g.routes.push(f),g.landing={...f[0]},g.landmark={...f[2]},g.viewpoint={...f[4]},g.grotto={...f[6]};for(const[E,S]of[["landing",1.4],["landmark",4.6],["viewpoint",2.8],["grotto",3.1]])g.pads.push({...g[E],radius:S,name:E});g.waterfall=["palm","ruins","outpost"].includes(e.id)&&(i==="0,-1"||s%4===0)?{...g.toLocal(.02,-.27),bottom:Math.max(.35,f[2].y-1.65)}:null,g.heightAt=(E,S)=>{let M=g.rawHeight(E,S),R=1/0,V=M;if(g.waterfall){const O=g.waterfall,N=E-O.x,D=S-O.z,U=N*h-D*c,L=N*c+D*h,B=(1-De(1.2,2.7,Math.abs(U)))*(1-De(2.4,4,Math.abs(L)));M=Me.lerp(M,O.bottom+3.4*(1-De(-.55,.45,L)),B);const q=Math.hypot(U/.95,(L-1.55)/.82);q<1.25&&(M=Me.lerp(M,O.bottom-.13,1-De(.5,1.25,q)))}for(const O of g.routes)for(let N=1;N<O.length;N++){const D=O[N-1],U=O[N],L=Uh(E,S,D,U);L.distance<R&&(R=L.distance,V=Me.lerp(D.y,U.y,L.t))}R<2.05&&(M=Me.lerp(M,V,1-De(.78,2.05,R)));for(const O of g.pads){const N=Math.hypot(E-O.x,S-O.z);N<O.radius+.85&&(M=Me.lerp(M,O.y,1-De(O.radius*(O.name==="grotto"?.6:.76),O.radius+.85,N)))}return M};const y=g.segments,_=new Float32Array((y+1)*(y+1));for(let E=0;E<=y;E++)for(let S=0;S<=y;S++)_[E*(y+1)+S]=g.heightAt((S/y*2-1)*o,(E/y*2-1)*o);g.heights=_,g.sample=(E,S)=>{if(Math.abs(E)>o||Math.abs(S)>o)return-5;const M=ve((E/o*.5+.5)*y,0,y-1e-6),R=ve((S/o*.5+.5)*y,0,y-1e-6),V=Math.floor(M),O=Math.floor(R),N=M-V,D=R-O,U=O*(y+1)+V,L=_[U],B=_[U+1],q=_[U+y+1],Q=_[U+y+2];return N+D<=1?L+(B-L)*N+(q-L)*D:Q+(q-Q)*(1-N)+(B-Q)*(1-D)};for(const E of[...Object.values({landing:g.landing,landmark:g.landmark,viewpoint:g.viewpoint,grotto:g.grotto}),...f])E.y=g.sample(E.x,E.z);const x=f[1],I=x.x-g.landing.x,A=x.z-g.landing.z,P=Math.hypot(I,A);return g.navigationLanding={x:g.landing.x+I/P*1.65,z:g.landing.z+A/P*1.65},g}function Z0(s,t,e,i=24){const n=ve((t/s.extent*.5+.5)*i,0,i-1e-6),r=ve((e/s.extent*.5+.5)*i,0,i-1e-6),a=Math.floor(n),o=Math.floor(r),l=n-a,h=r-o,c=(v,m)=>s.sample((v/i*2-1)*s.extent,(m/i*2-1)*s.extent),u=c(a,o),d=c(a+1,o),p=c(a,o+1),g=c(a+1,o+1);return l+h<=1?u+(d-u)*l+(p-u)*h:g+(p-g)*(1-l)+(d-g)*(1-h)}function Pc(s,t=64){const e=[],i=[],n=[],r=new Et(s.biome.sand),a=new Et(s.biome.grass),o=new Et(s.biome.rock),l=r.clone().lerp(new Et(7511697),.28),h=new Et(s.biome.id==="volcano"?9275248:12891784),c=s.extent;for(let d=0;d<=t;d++)for(let p=0;p<=t;p++){const g=(p/t*2-1)*c,v=(d/t*2-1)*c,m=s.sample(g,v),f=(s.sample(g+.28,v)-s.sample(g-.28,v))/.56,y=(s.sample(g,v+.28)-s.sample(g,v-.28))/.56,_=Math.hypot(f,y),x=l.clone();x.lerp(r,De(-.12,.28,m)),x.lerp(a,De(.27,1,m)*(1-De(.65,1.15,_))),x.lerp(o,De(.55,1.25,_)*De(.45,1.2,m)),s.biome.id==="volcano"&&x.lerp(o,De(3,5,m)*.65);const I=Cs(s,g,v);x.lerp(h,(1-De(.3,.87,I))*De(.35,.85,m)*(.22+.48*De(3,11,Math.hypot(g-s.grotto.x,v-s.grotto.z))));const A=.94+.045*Math.sin(g*1.7+v*.9+s.seed)+.025*Math.sin(v*3.5-g*.8);x.multiplyScalar(A),e.push(g,m,v),i.push(x.r,x.g,x.b)}for(let d=0;d<t;d++)for(let p=0;p<t;p++){const g=d*(t+1)+p;n.push(g,g+t+1,g+1,g+1,g+t+1,g+t+2)}const u=new ce;return u.setAttribute("position",new se(e,3)),u.setAttribute("color",new se(i,3)),u.setIndex(n),u.computeVertexNormals(),u.computeBoundingSphere(),u}function J0(s,t=()=>!0){const e=s.segments,i=e+1,n=s.extent*2/e,r=new Uint8Array(i*i),a=new Int32Array(i*i);a.fill(-2);const o=u=>({x:(u%i/e*2-1)*s.extent,z:(Math.floor(u/i)/e*2-1)*s.extent,y:s.heights[u]});for(let u=0;u<r.length;u++){const d=o(u);r[u]=d.y>=-.1&&t(d.x,d.y,d.z)?1:0}const l=(u,d=!1)=>{let p=-1,g=1/0;for(let v=0;v<r.length;v++)if(r[v]&&(!d||a[v]!==-2)){const m=o(v),f=(u.x-m.x)**2+(u.z-m.z)**2;f<g&&(g=f,p=v)}return p},h=l(s.navigationLanding||s.landing),c=[];h>=0&&(a[h]=-1,c.push(h));for(let u=0;u<c.length;u++){const d=c[u],p=d%i,g=Math.floor(d/i);for(const[v,m]of[[1,0],[-1,0],[0,1],[0,-1]]){const f=p+v,y=g+m,_=y*i+f;if(f<0||f>e||y<0||y>e||!r[_]||a[_]!==-2||Math.abs(s.heights[_]-s.heights[d])>n*.98)continue;const x=o(d),I=o(_);let A=!0;for(const P of[.25,.5,.75])if(!t(x.x+(I.x-x.x)*P,x.y+(I.y-x.y)*P,x.z+(I.z-x.z)*P)){A=!1;break}A&&(a[_]=d,c.push(_))}}return{parents:a,walkable:r,point:o,root:h,reachable:c,step:n,closest:l,pathTo(u){const d=l(u,!0);if(d<0)return[];const p=[];for(let g=d;g>=0;g=a[g])p.push(o(g));return p.reverse()}}}const _s=new C;function ti(s,t,e,i,n,r){const a=2*Math.PI*n/4,o=Math.max(r-2*n,0),l=Math.PI/4;_s.copy(t),_s[i]=0,_s.normalize();const h=.5*a/(a+o),c=1-_s.angleTo(s)/l;return Math.sign(_s[e])===1?c*h:o/(a+o)+h+h*(1-c)}class Q0 extends nn{constructor(t=1,e=1,i=1,n=2,r=.1){if(n=n*2+1,r=Math.min(t/2,e/2,i/2,r),super(1,1,1,n,n,n),n===1)return;const a=this.toNonIndexed();this.index=null,this.attributes.position=a.attributes.position,this.attributes.normal=a.attributes.normal,this.attributes.uv=a.attributes.uv;const o=new C,l=new C,h=new C(t,e,i).divideScalar(2).subScalar(r),c=this.attributes.position.array,u=this.attributes.normal.array,d=this.attributes.uv.array,p=c.length/6,g=new C,v=.5/n;for(let m=0,f=0;m<c.length;m+=3,f+=2)switch(o.fromArray(c,m),l.copy(o),l.x-=Math.sign(l.x)*v,l.y-=Math.sign(l.y)*v,l.z-=Math.sign(l.z)*v,l.normalize(),c[m+0]=h.x*Math.sign(o.x)+l.x*r,c[m+1]=h.y*Math.sign(o.y)+l.y*r,c[m+2]=h.z*Math.sign(o.z)+l.z*r,u[m+0]=l.x,u[m+1]=l.y,u[m+2]=l.z,Math.floor(m/p)){case 0:g.set(1,0,0),d[f+0]=ti(g,l,"z","y",r,i),d[f+1]=1-ti(g,l,"y","z",r,e);break;case 1:g.set(-1,0,0),d[f+0]=1-ti(g,l,"z","y",r,i),d[f+1]=1-ti(g,l,"y","z",r,e);break;case 2:g.set(0,1,0),d[f+0]=1-ti(g,l,"x","z",r,t),d[f+1]=ti(g,l,"z","x",r,i);break;case 3:g.set(0,-1,0),d[f+0]=1-ti(g,l,"x","z",r,t),d[f+1]=1-ti(g,l,"z","x",r,i);break;case 4:g.set(0,0,1),d[f+0]=1-ti(g,l,"x","y",r,t),d[f+1]=1-ti(g,l,"y","x",r,e);break;case 5:g.set(0,0,-1),d[f+0]=ti(g,l,"x","y",r,t),d[f+1]=1-ti(g,l,"y","x",r,e);break}}}const Ls={time:{value:0},strength:{value:1}},ai=new Map,ka=new Map;function tv(s,t=!1){const e=s.uuid+":"+t;if(!ka.has(e)){const i=s.clone();i.userData={shared:!0},i.onBeforeCompile=n=>{n.uniforms.islandTime=Ls.time,n.uniforms.islandWindStrength=Ls.strength,n.uniforms.islandWindHeight={value:t?.9:7},n.vertexShader=`uniform float islandTime, islandWindStrength, islandWindHeight; varying float vIslandFoliageMask;
`+n.vertexShader,n.fragmentShader=`varying float vIslandFoliageMask;
`+n.fragmentShader,n.fragmentShader=n.fragmentShader.replace("#include <clipping_planes_fragment>",`#include <clipping_planes_fragment>
        float nearVisibility=mix(1.,smoothstep(.35,1.75,length(vViewPosition)),vIslandFoliageMask);
        if(nearVisibility<fract(dot(floor(gl_FragCoord.xy),vec2(.754877666,.569840296))))discard;`),n.vertexShader=n.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
        vIslandFoliageMask=${t?"1.":"step(3.2,position.y)"};
        float phase=0.;
        #ifdef USE_INSTANCING
          phase=instanceMatrix[3].x*.17+instanceMatrix[3].z*.13;
        #endif
        float weight=pow(clamp(position.y/islandWindHeight,0.,1.),1.7);
        transformed.x+=(sin(islandTime*1.15+phase)*.16+sin(islandTime*1.9+position.z*1.6+phase)*.035)*weight*islandWindStrength;
        transformed.z+=cos(islandTime*.85+phase)*.105*weight*islandWindStrength;`)},i.customProgramCacheKey=()=>"island-foliage-wind-2:"+t,ka.set(e,i)}return ka.get(e)}function ii(s,t,e,i,n,r,a,o=-.17){const l=Dh(s,t,e);return l.position.set(i,n,r),l.rotation.set(o,a,0),l}function ev(s,t,e=!1){const i=new kt,n=ki(8619+t*173+(s==="broad"?900:0)),r=s==="broad"?4.8+t*.6:5.3+t*1,a=s==="broad"?.25:.65+t*.22,o=e?3:5;for(let h=0;h<o;h++){const c=h/o,u=(h+1)/o;i.add(Rt([a*c*c,r*c,Math.sin(c)*.08],[a*u*u,r*u,Math.sin(u)*.08],.135-c*.035,h%2?10190935:11770472,7)),h>0&&i.add(Pt(.148-c*.035,.148-c*.035,.045,8614993,a*c*c,r*c,Math.sin(c)*.08,7))}const l=s==="broad"?[3636812,5150293,7251803]:[4556622,6923094,9222755];if(s==="broad")for(let h=0;h<(e?3:5);h++){const c=h*Math.PI*2/(e?3:5)+.2,u=r-.55+h%2*.25,d=Math.sin(c)*1,p=Math.cos(c)*1;i.add(Rt([a,r-1,0],[a+d,u,p],.055,9599057));for(let g=0;g<3;g++)i.add(ii(1.65+n()*.55,.72,l[(h+g)%3],a+d,u,p,c+g*.8-.6,-.26))}else{for(let h=0;h<(e?6:9);h++)i.add(ii(2.4+n()*.8,.36+n()*.12,l[h%3],a,r,0,h*Math.PI*2/(e?6:9)+(n()-.5)*.16,-.12+n()*.15));for(let h=0;h<(e?1:3);h++)i.add(de(.13,9136963,a+Math.cos(h*2)*.19,r-.17,Math.sin(h*2)*.19,6))}return i}function iv(s,t){const e=new kt,i=[4161872,5805658,8170082],n=t%3;if(s==="fern")for(let r=0;r<7;r++){const a=r*Math.PI*2/7;e.add(ii(.65+r%3*.13,.15,i[(r+n)%3],0,.08,0,a,-.45));for(let o=1;o<4;o++){const l=o/4,h=Math.sin(a)*l*.55,c=Math.cos(a)*l*.55;e.add(ii(.25,.12,i[n],h,.12+l*.06,c,a+.9,-.4),ii(.25,.12,i[(n+1)%3],h,.12+l*.06,c,a-.9,-.4))}}else if(s==="broadleaf")for(let r=0;r<6;r++){const a=r*Math.PI/3;e.add(Rt([0,0,0],[Math.sin(a)*.13,.35+r%2*.18,Math.cos(a)*.13],.015,7247200,5)),e.add(ii(.85,.38,i[(r+n)%3],Math.sin(a)*.13,.35+r%2*.18,Math.cos(a)*.13,a,-.35))}else if(s==="bush")for(let r=0;r<9;r++){const a=r*2.39996,o=.1+Math.sqrt(r/9)*.42;e.add(ii(.72,.31,i[(r+n)%3],Math.sin(a)*o,.22+r%3*.13,Math.cos(a)*o,a,-.45))}else if(s==="flower"){const r=[15774058,14394819,15979908];for(let a=0;a<3;a++){const o=(a-1)*.16,l=a%2*.1,h=.34+a%2*.16;e.add(Rt([o,0,l],[o,h,l],.012,7181402,4));for(let c=0;c<5;c++){const u=c*Math.PI*2/5,d=de(.065,r[n],o+Math.sin(u)*.07,h,l+Math.cos(u)*.07,5);d.scale.y=.35,e.add(d)}e.add(de(.035,15320171,o,h+.025,l,5))}}else if(s==="grass")for(let r=0;r<7;r++){const a=r*2.4;e.add(ii(.35+r%3*.12,.035,i[(r+n)%3],Math.cos(a)*.12,0,Math.sin(a)*.12,a,-1.05))}else if(s==="rock"){const r=new $r(1,0);r.userData.shared=!0;const a=new Yt(r,we([8557446,7440523,6187368][n],{flatShading:!0}));a.position.y=.32,a.scale.set(.58,.5,.48),e.add(a)}else if(s==="log"){const r=Pt(.17,.19,1.8,9205329,0,.18,0,8);r.rotation.z=Math.PI/2,e.add(r);for(const a of[-.91,.91]){const o=Pt(.14,.14,.015,12887159,a,.18,0,8);o.rotation.z=Math.PI/2,e.add(o)}}else if(s==="coral"){const r=[13141913,15251593,8435373];for(let a=0;a<5;a++){const o=a*2.4,l=Math.cos(o)*.2,h=Math.sin(o)*.2,c=.27+a%3*.12;e.add(Rt([0,0,0],[l,c,h],.06,r[n],5),Rt([l,c*.7,h],[l+.12,c+.12,h+.09],.035,r[n],5))}e.add(de(.18,10598562,0,.07,0,6))}return e}function Po(s,t=0,e=!1){const i=s+":"+t+(e?":low":"");if(!ai.has(i)){const n=["palm","broad"].includes(s)?ev(s,t,e):iv(s,t);Be(n,!0),["palm","broad","fern","broadleaf","bush","grass","flower"].includes(s)&&n.traverse(r=>{r.isMesh&&(r.material=tv(r.material,!["palm","broad"].includes(s)))}),ai.set(i,n)}return ai.get(i)}function nv(){for(const s of["palm","broad","fern","broadleaf","bush","flower","grass","rock","log","coral"])for(let t=0;t<(s==="palm"||s==="rock"||s==="flower"||s==="coral"?3:s==="broad"?2:1);t++)Po(s,t)}function Ic(s,t,e,i){if(!i.length)return[];const n=Po(t,e),r=[],a=new ne,o=new as,l=new C,h=new C(0,1,0);for(const c of n.children){const u=new a0(c.geometry,c.material,i.length);u.name=`island-${t}-${e}`,u.castShadow=!1,u.receiveShadow=!1,(t==="palm"||t==="broad")&&(u.userData.nearGeometry=c.geometry,u.userData.farGeometry=Po(t,e,!0).children[r.length].geometry),i.forEach((d,p)=>{o.setFromAxisAngle(h,d.yaw||0),l.setScalar(d.scale||1),a.compose(new C(d.x,d.y,d.z),o,l),u.setMatrixAt(p,a),u.setColorAt(p,new Et().setRGB(d.shade||1,d.shade||1,d.shade||1))}),u.instanceMatrix.needsUpdate=!0,u.computeBoundingBox(),u.computeBoundingSphere(),u.boundingSphere.radius+=.5,s.add(u),r.push(u)}return r}function Oa(s=1,t=!1){const e="chest:"+t;if(ai.has(e)){const a=ai.get(e).clone(!0);return a.scale.setScalar(s),a}const i=new kt,n=t?8677181:11569748;i.add(ot(.82,.49,.55,n,0,.245,0),ot(.86,.12,.59,12950115,0,.525,0));for(const a of[-.28,.28])i.add(ot(.07,.58,.59,6651248,a,.295,0));i.add(ot(.13,.16,.035,14861164,0,.43,.31)),Be(i,!0),ai.set(e,i);const r=i.clone(!0);return r.scale.setScalar(s),r}function Io(s,t,e,i,n){for(const r of[-1,1]){const a=ot(t*.56,.1,e,n,r*t*.245,i,0);a.rotation.z=r*-.3,s.add(a);for(let o=0;o<5;o++)s.add(Rt([r*.04,i+.08,-e*.5+o*e*.25],[r*t*.5,i-.24,-e*.5+o*e*.25],.025,11836269))}}function sv(s,t=9016454){const e=new kt,i=[],n=(r,a,o,l,h,c,u=!1)=>i.push({x:r,y:a,z:o,w:l,h,d:c,walkable:u});if(s==="spring"){e.add(Pt(1.15,1.3,.22,t,0,.08,0,14),Pt(.96,.96,.045,6733224,0,.22,0,20));for(let a=0;a<12;a++){const o=a*Math.PI/6,l=de(.22,t,Math.cos(o)*1.14,.22,Math.sin(o)*1.14,6);l.scale.y=.7,e.add(l)}for(const a of[-1.5,1.5])e.add(Rt([a,0,-.65],[a,2.1,-.65],.06,9599825));e.add(Rt([-1.5,2.1,-.65],[1.5,2.1,-.65],.065,9599825));const r=ot(3.15,.045,1.3,8758636,0,2.12,-.65);r.rotation.x=.08,e.add(r),n(0,.12,0,2.5,.24,2.5,!0)}else if(s==="wreck"){e.add(ot(2.1,.3,4.4,8742207,0,.15,0));for(const a of[-1.02,1.02])for(let o=0;o<7;o++){if(a>0&&o>0&&o<6)continue;const l=-1.95+o*.63,h=1-Math.abs(l)/3.3,c=1.05-o%3*.13;e.add(Rt([a*h,.3,l],[a*h*1.12,.3+c,l],.075,10386254),ot(.11,.25,.65,11767646,a*h,.78,l)),n(a*h*1.06,.3+c*.5,l,Math.abs(a*h)*.12+.15,c,.65)}for(let a=0;a<9;a++)e.add(ot(1.9,.06,.29,12360552,0,.33,-1.8+a*.45));e.add(Rt([.15,.2,-.9],[.65,3.1,-.65],.085,9204299),Rt([.65,2.8,-.65],[-.85,2,-.5],.045,9204299));const r=ot(.73,1.1,.025,14206878,-.15,2.12,-.58);r.rotation.z=.35,e.add(r),e.add(ot(1.65,.4,.35,10189137,0,.8,1.94)),n(0,.18,0,2.1,.36,4.4,!0),n(.4,1.65,-.775,.7,3.1,.42),n(0,.8,1.94,1.65,.4,.35)}else if(s==="temple"){e.add(ot(5.4,.28,4.2,t,0,.06,0));for(const r of[-2.12,2.12])for(const a of[-1.45,1.45])e.add(ot(.65,2.8,.66,t,r,1.5,a),ot(.84,.2,.83,10726024,r,2.95,a),ot(.81,.18,.8,8031604,r,.28,a)),n(r,1.55,a,.7,2.9,.72);e.add(ot(5.35,.43,4.15,t,0,3.24,0),ot(4.75,.3,3.6,8360566,0,3.58,0),ot(3.9,.28,2.9,t,0,3.85,0)),n(0,3.55,0,5.4,1,4.25,!0),n(0,.08,0,5.4,.28,4.2,!0);for(const r of[-1.5,-.75,0,.75,1.5])e.add(ot(.28,.23,.06,12759676,r,3.24,2.1));n(0,.93,-1.65,1.1,1.45,.4),n(0,.34,-.65,.78,.35,.78,!0),e.add(ot(1.1,1.45,.4,6519910,0,.93,-1.65),Pt(.3,.39,.35,10724484,0,.34,-.65,8));for(let r=0;r<6;r++)e.add(ii(1.1,.24,5145685,[-2.1,2.1][r%2],3.8,-1.4+r%3*1.4,r*.9,.1))}else if(s==="camp"){for(const r of[-1.65,1.65])for(const a of[-1.25,1.25])e.add(Rt([r,0,a],[r,2.5,a],.075,9269577)),n(r,1.25,a,.17,2.5,.17);Io(e,3.9,3.2,2.65,12557414),n(0,2.65,0,3.9,.25,3.2,!0),n(-.65,.43,-.4,1.3,.86,.75,!0),e.add(ot(1.3,.12,.75,10059086,-.65,.8,-.4));for(const r of[-1.16,-.14])e.add(Rt([r,0,-.4],[r,.8,-.4],.04,8416069));e.add(ot(.5,.02,.36,14732192,-.55,.88,-.3),Pt(.18,.15,.25,9007955,.85,.15,-.8,8));for(let r=0;r<6;r++){const a=r*Math.PI/3;e.add(de(.13,8095872,.8+Math.cos(a)*.38,.09,.6+Math.sin(a)*.38,6))}e.add(Rt([.5,.12,.5],[1.1,.12,.7],.055,6903869))}else{for(const r of[-1.65,1.65])for(const a of[-1.3,1.3])e.add(Rt([r,0,a],[r,2.6,a],.07,9543826)),n(r,1.3,a,.17,2.6,.17);Io(e,4,3.2,2.7,8362640),n(0,2.7,0,4,.25,3.2,!0);for(const r of[-1.65,1.65])e.add(ot(.12,1,2.6,10201224,r,.65,0));e.add(ot(3.3,1,.12,10201224,0,.65,-1.3)),n(-1.65,.65,0,.12,1,2.6),n(1.65,.65,0,.12,1,2.6),n(0,.65,-1.3,3.3,1,.12),n(0,.46,-.65,1.65,.92,.6,!0),n(0,.8,0,.55,1.6,.55);for(const r of[-.66,.66])for(const a of[-.86,-.44])e.add(Rt([r,0,a],[r,.84,a],.035,10259299));e.add(ot(1.65,.1,.6,12166520,0,.88,-.65),Pt(.1,.14,1,12627320,0,.55,0),de(.27,9421240,0,1.3,0,10),Rt([1.05,.3,-.8],[1.05,4.6,-.8],.035,10597282),Rt([.4,3.7,-.8],[1.7,3.7,-.8],.025,10597282)),e.add(ot(.65,.025,.4,14667942,0,.95,-.6))}if(s==="observatory")for(let r=0;r<9;r++)e.add(ii(1,.24,5998940,-1.5+r%3*1.3,2.7+r%2*.15,-1.2+Math.floor(r/3)*.9,r*.8,.4));return s==="camp"&&e.add(Rt([1.65,2.5,1.25],[1.65,3.8,1.25],.028,9074e3),ot(.8,.43,.025,12351840,1.98,3.47,1.25)),Be(e),{group:e,colliders:i}}const Nh=new Q0(1,1,1,1,.14);Nh.userData.shared=!0;function Do(s,t,e,i,n=0,r=0,a=0){const o=new Yt(Nh,we(i));return o.scale.set(s,t,e),o.position.set(n,r,a),o.castShadow=!0,o.receiveShadow=!0,o}function vr(s,t,e,i,n=0,r=0,a=0,o=0){const l=new nn(1,1,1,2,2,2),h=l.attributes.position,c=new Float32Array(h.count*3);for(let d=0;d<h.count;d++){const p=h.getX(d),g=h.getY(d),v=h.getZ(d),m=(Math.abs(p)>.4)+(Math.abs(g)>.4)+(Math.abs(v)>.4),f=Math.sin(p*23+g*31+v*17+o*1.7),y=m===3?.81:m===2?.91:1;h.setXYZ(d,p*y,g*y,v*y);const _=.88+f*.055+g*.07;c.set([_,_,_],d*3)}l.setAttribute("color",new ye(c,3)),l.computeVertexNormals();const u=new Yt(l,we(i,{flatShading:!0,vertexColors:!0}));return u.scale.set(s,t,e),u.position.set(n,r,a),u}function rv(s=8491139,t="palm"){const e=new kt;for(const n of[-1,1]){e.add(vr(1.4,2.8,3.5,s,n*1.82,1.3,0,n+4));for(let r=0;r<3;r++)e.add(vr(.68,.75,1.15,s,n*(1.83+r%2*.07),.55+r*.69,.7-r%2*1.6,r+5))}e.add(vr(4.5,1.25,3.7,s,0,3.12,0,9),vr(4.5,3,.6,s,0,1.2,-1.7,11));for(let n=0;n<5;n++){const r=-1+n*.45;e.add(Pt(.01,.15,.38,s,r,2.37,-.8+n%2*.4,5))}for(const n of[-1,1]){e.add(Rt([n*.92,0,.4],[n*.92,.25,.4],.025,7907469));const r=de(.1,8571321,n*.92,.28,.4,6);r.scale.y=.45,r.material=we(8571321,{emissive:2973520,emissiveIntensity:.35}),e.add(r)}if(t==="pirate"&&e.add(Pt(.25,.28,.48,10255183,-.84,.25,-.6,8),Pt(.26,.26,.035,7571581,-.84,.27,-.6,8)),t==="ruins")for(const n of[-.85,.85])for(let r=0;r<3;r++)e.add(Do(.16,.15,.05,12694395,n,.48+r*.32,-1.375));if(t==="volcano")for(let n=0;n<4;n++){const r=Pt(.005,.1,.42,13804659,-1.12+n*.74,2.35,.85,5);r.rotation.x=Math.PI,e.add(r)}for(let n=0;n<9;n++)e.add(ii(.55+n%3*.25,.16,6590049,-1.8+n*.45,3.5,1.3+n%2*.1,n*.8,1));Be(e);const i=[{x:-1.82,y:1.3,z:0,w:1.4,h:2.8,d:3.5},{x:1.82,y:1.3,z:0,w:1.4,h:2.8,d:3.5},{x:0,y:3.12,z:0,w:4.5,h:1.25,d:3.7,walkable:!0},{x:0,y:1.2,z:-1.7,w:4.5,h:3,d:.6}];return t==="pirate"&&i.push({x:-.84,y:.25,z:-.6,w:.56,h:.5,d:.56,walkable:!0,scenery:!0}),{group:e,colliders:i}}function av(s=9148553){const t=new kt;for(const e of[-1,1])for(let i=0;i<3;i++){const n=Do(1.48,1.7,2.12,s,e*(2.25-i*.06),.72+i*1.55,0);n.rotation.z=e*(i-1)*.025,t.add(n)}for(let e=0;e<5;e++){const i=(e-2)*1.02;t.add(Do(1.2,1.1+e%2*.16,2.15,s,i,4.93+Math.cos(e-2)*.16,0))}for(let e=0;e<7;e++)t.add(ii(.72,.22,6590049,-2+e*.66,5.5,0,e*.85,.2));return Be(t),{group:t,colliders:[{x:-2.2,y:2.35,z:0,w:1.55,h:4.9,d:2.2},{x:2.2,y:2.35,z:0,w:1.55,h:4.9,d:2.2},{x:0,y:5,z:0,w:5.5,h:1.3,d:2.2,walkable:!0}]}}function ov(){const s=new kt;for(const t of[-1,1])for(const e of[-1,1])s.add(Rt([t*1.25,0,e*1.25],[t,4.7,e],.09,9336400));for(const t of[-1.1,1.1])s.add(Rt([-1.2,0,t],[1,4.3,t],.035,8943183),Rt([1.2,0,t],[-1,4.3,t],.035,8943183));s.add(ot(2.8,.15,2.8,11506531,0,4.5,0));for(const t of[-1.3,1.3])s.add(ot(.08,.75,2.7,9337941,t,4.95,0));Io(s,3.4,3.4,6.1,11903601);for(const t of[-1.15,1.15])s.add(Rt([t,4.5,-1.15],[t,6,-1.15],.05,9206097));for(const t of[-.28,.28])s.add(Rt([t,0,1.3],[t,3.2,1.3],.025,9073744));for(let t=0;t<7;t++)s.add(Rt([-.28,t*.4,1.3],[.28,t*.4,1.3],.02,10192215));return Be(s),{group:s,colliders:[...[-1,1].flatMap(t=>[-1,1].map(e=>({x:t*1.15,y:2.3,z:e*1.15,w:.25,h:4.6,d:.25}))),{x:0,y:4.5,z:0,w:2.8,h:.15,d:2.8,walkable:!0}]}}function lv(){if(ai.has("journal"))return ai.get("journal").clone(!0);const s=new kt;s.add(ot(.6,.15,.48,9213310,0,.075,0),ot(.35,.035,.29,14602401,0,.1675,.04));for(let t=0;t<4;t++)s.add(ot(.21,.004,.012,10326893,0,.187,-.04+t*.045));return Be(s,!0),ai.set("journal",s),s.clone(!0)}function cv(s){const t="rune:"+s;if(ai.has(t)){const a=ai.get(t).clone(!0);return{group:a,glyph:a.children.at(-1)}}const e=new kt;e.add(ot(.48,.8,.32,8624006,0,.4,0),ot(.55,.13,.4,10857866,0,.86,0));const i=new kt,n=s===0?15122796:s===1?7980736:14073741;if(s===0){i.add(de(.12,n,0,.48,.19,8));for(let a=0;a<8;a++){const o=a*Math.PI/4;i.add(Rt([Math.sin(o)*.16,.48+Math.cos(o)*.16,.19],[Math.sin(o)*.21,.48+Math.cos(o)*.21,.19],.014,n,4))}}else if(s===1)for(let a=0;a<3;a++){const o=Rt([-.17,.37+a*.1,.19],[.17,.4+a*.1,.19],.018,n,5);i.add(o)}else for(let a=0;a<5;a++){const o=a*Math.PI*2/5;i.add(Rt([0,.48,.19],[Math.sin(o)*.19,.48+Math.cos(o)*.19,.19],.025,n,4))}Be(e,!0),Be(i,!0),e.add(i),ai.set(t,e);const r=e.clone(!0);return{group:r,glyph:r.children.at(-1)}}const Rr=C,Fa=["sun","tide","star"];function kh(s,t,e,i,n=.24,r=1.6,a=!0){if(s.disabled||a&&r>=1&&s.walkable&&s.y+s.h*.5-e<=.45||e>=s.y+s.h*.5-.035||e+r<=s.y-s.h*.5+.025)return!1;const o=t-s.x,l=i-s.z,h=s._cos??(s._cos=Math.cos(s.yaw)),c=s._sin??(s._sin=Math.sin(s.yaw)),u=o*h-l*c,d=o*c+l*h;return Math.abs(u)<s.w*.5+n&&Math.abs(d)<s.d*.5+n}function Ji(s,t,e,i,n=.24,r=1.6,a=null,o=!0){return s.colliders.some(l=>l.resourceId!==a&&kh(l,t,e,i,n,r,o||!(l.scenery||l.resourceId)))}function hv(s){const e=Math.ceil(s.plan.extent/4)+4,i=e*2+1,n=new Map;for(const r of s.colliders){if(r.disabled)continue;const a=r._cos??(r._cos=Math.cos(r.yaw)),o=r._sin??(r._sin=Math.sin(r.yaw)),l=(Math.abs(a)*r.w+Math.abs(o)*r.d)*.5+.31,h=(Math.abs(o)*r.w+Math.abs(a)*r.d)*.5+.31;for(let c=Math.floor((r.x-l)/4);c<=Math.floor((r.x+l)/4);c++)for(let u=Math.floor((r.z-h)/4);u<=Math.floor((r.z+h)/4);u++){const d=(c+e)*i+u+e;n.has(d)||n.set(d,[]),n.get(d).push(r)}}return J0(s.plan,(r,a,o)=>!n.get((Math.floor(r/4)+e)*i+Math.floor(o/4)+e)?.some(h=>kh(h,r,a,o,.3,1.72,!(h.scenery||h.resourceId))))}function dv(s,t,e,i=1/0){let n=-1/0;for(const r of s.colliders){if(r.disabled||!r.walkable||r.y+r.h*.5>i+.46)continue;const a=t-r.x,o=e-r.z,l=r._cos??(r._cos=Math.cos(r.yaw)),h=r._sin??(r._sin=Math.sin(r.yaw));Math.abs(a*l-o*h)<=r.w*.5&&Math.abs(a*h+o*l)<=r.d*.5&&(n=Math.max(n,r.y+r.h*.5))}return n}function xr(s,t,e,i=0){const n=t.group;n.position.set(e.x,e.y,e.z),n.rotation.y=i,s.structures.add(n);const r=Math.cos(i),a=Math.sin(i);for(const o of t.colliders||[])s.colliders.push({...o,x:e.x+o.x*r+o.z*a,y:e.y+o.y,z:e.z-o.x*a+o.z*r,yaw:i});for(const o of t.colliders||[]){const l=o.y-o.h*.5;if(o.h<.8||l>.24)continue;let h=1/0;for(const c of[-o.w*.5,o.w*.5])for(const u of[-o.d*.5,o.d*.5]){const d=e.x+(o.x+c)*r+(o.z+u)*a,p=e.z-(o.x+c)*a+(o.z+u)*r;h=Math.min(h,s.plan.sample(d,p))}if(h<e.y+l+.3){const c=l+.045,u=h-e.y-.35,d=c-u;n.add(ot(o.w+.025,d,o.d+.025,s.biome.rock,o.x,u+d*.5,o.z)),s.colliders.push({x:e.x+o.x*r+o.z*a,y:e.y+u+d*.5,z:e.z-o.x*a+o.z*r,w:o.w,h:d,d:o.d,yaw:i,walkable:!1,foundation:!0})}}return n}const gi=(s,t,e,i)=>({x:s.x+t*Math.cos(i)+e*Math.sin(i),z:s.z-t*Math.sin(i)+e*Math.cos(i)});function un(s,t,{id:e,type:i,name:n,point:r,mesh:a,amount:o,loot:l,story:h,icon:c,action:u="gather",index:d,gate:p=!1,parent:g}){const v=t.plan.sample(r.x,r.z),m=g||a;g||(a.position.set(r.x,v,r.z),t.pickups.add(a));const f=s.collected.has(e);a.visible=!f;const y={id:e,type:i,name:n,mesh:a,root:m,position:new Rr(t.x+r.x,v,t.z+r.z),local:{x:r.x,z:r.z},collected:f,action:u};return o!==void 0&&(y.amount=o),l&&(y.loot={...l}),h&&(y.story=h),c&&(y.icon=c),d!==void 0&&(y.index=d),p&&(y.gate=!0),t.resources.push(y),i==="rune"&&Xr(y),y}function Dc(s){if(s==="copper")return Ac(ki(409),.28,12555121);if(s==="coconut")return de(.17,9860173,0,.16,0,8);if(s==="vine"){const e=new kt;for(let i=0;i<3;i++)e.add(Rt([i*.09-.1,0,0],[i*.06-.1,.55+i*.13,.04],.025,6457164),de(.095,8430684,i*.06-.08,.25+i*.13,.04,5));return Be(e),e}if(s==="relic"){const e=new kt;return e.add(Pt(.18,.18,.06,13219192,0,.03,0,10),de(.13,9288886,0,.14,0,8)),Be(e),e}if(s==="resin"||s==="coral")return Ac(ki(409),.23,s==="resin"?14069605:10669499);const t=new kt;return t.add(ot(.53,.11,.2,s==="scrap"?9939613:12031333,0,.055,0),ot(.38,.1,.15,s==="scrap"?8887956:13281401,.05,.15,.03)),Be(t),t}function uv(s){nv();const{plan:t}=s,e=ki(s.seed^122633),i=t.profile,n=new Map,r=[],a=s.resources.map(u=>({x:u.local.x,z:u.local.z,r:u.type==="treasure"?1.1:.9})),o=(u,d,p)=>{const g=u+":"+d;n.has(g)||n.set(g,{kind:u,variant:d,points:[]}),n.get(g).points.push(p)};for(let u=0;u<2400&&r.length<i.trees;u++){const d=(e()*2-1)*t.radius*1.08,p=(e()*2-1)*t.radius*1.08,g=t.sample(d,p);if(g<.48||Cs(t,d,p)<2.15||t.pads.some(_=>Math.hypot(d-_.x,p-_.z)<_.radius+1.35)||a.some(_=>Math.hypot(d-_.x,p-_.z)<_.r+1)||r.some(_=>Math.hypot(d-_.x,p-_.z)<1.65)||t.waterfall&&Math.hypot(d-t.waterfall.x,p-t.waterfall.z)<3||Math.hypot(t.sample(d+.35,p)-t.sample(d-.35,p),t.sample(d,p+.35)-t.sample(d,p-.35))>.85)continue;const m=["ruins","outpost"].includes(s.biome.id)&&e()<.62?"broad":"palm",f=Math.floor(e()*(m==="palm"?3:2)),y={x:d,y:g-.015,z:p,scale:.76+e()*.28,yaw:e()*Math.PI*2,shade:.91+e()*.13};r.push(y),o(m,f,y),s.colliders.push({x:d,z:p,y:g+2.6,w:.27,h:5.2,d:.27,yaw:0,tree:!0})}const l=["fern","broadleaf","bush","grass","flower","grass","rock","log"];let h=0;for(let u=0;u<i.undergrowth*12&&h<i.undergrowth;u++){const d=(e()*2-1)*t.radius*1.1,p=(e()*2-1)*t.radius*1.1,g=t.sample(d,p);if(g<.3||Cs(t,d,p)<1.14||t.pads.some(x=>Math.hypot(d-x.x,p-x.z)<x.radius+.45)||a.some(x=>Math.hypot(d-x.x,p-x.z)<x.r)||Ji(s,d,g,p,.4,.8))continue;const v=l[Math.floor(e()*l.length)],m=["flower","rock"].includes(v)?Math.floor(e()*3):0,f=v==="log"?1.15:v==="rock"?.8:0;if(f&&(Cs(t,d,p)<2.25||Ji(s,d,g,p,f,.9)||a.some(x=>Math.hypot(d-x.x,p-x.z)<x.r+f))||Math.hypot(t.sample(d+.28,p)-t.sample(d-.28,p),t.sample(d,p+.28)-t.sample(d,p-.28))>.65)continue;const _={x:d,y:g-.005,z:p,scale:v==="log"?.65+e()*.4:.65+e()*.6,yaw:e()*Math.PI*2,shade:.9+e()*.14};if(v==="log"){const x=Math.cos(_.yaw),I=Math.sin(_.yaw),A=[];for(const P of[-1.15*_.scale,0,1.15*_.scale])for(const E of[-.45*_.scale,.45*_.scale])A.push(t.sample(d+P*x+E*I,p-P*I+E*x));if(Math.max(...A)-Math.min(...A)>.075)continue;_.y=Math.min(...A)}o(v,m,_),(v==="rock"||v==="log")&&s.colliders.push({x:d,z:p,y:_.y+(v==="rock"?.4:.19)*_.scale,w:(v==="rock"?1.1:1.8)*_.scale,h:(v==="rock"?.8:.38)*_.scale,d:(v==="rock"?.96:.4)*_.scale,yaw:_.yaw,walkable:!0,scenery:!0}),h++}s.foliage=[];for(const u of n.values())s.foliage.push({kind:u.kind,variant:u.variant,meshes:Ic(s.land,u.kind,u.variant,u.points),count:u.points.length,canopy:["palm","broad"].includes(u.kind)});for(const u of s.foliage)if(u.canopy)for(const d of u.meshes){const p=new Float32Array(d.instanceMatrix.array),g=new Float32Array(p);for(let v=0;v<u.count;v++){const m=p[v*16+12],f=p[v*16+14];g[v*16+13]+=Z0(t,m,f)-t.sample(m,f)}d.userData.nearMatrices=p,d.userData.farMatrices=g,d.userData.coastLOD="near",d.boundingSphere.radius+=1.2}s.vegetation={trees:r.length,undergrowth:h};const c=[[],[],[]];for(let u=0;u<70&&c.flat().length<23;u++){const d=e()*Math.PI*2,p=t.radius*(.9+e()*.3),g=Math.cos(d)*p,v=Math.sin(d)*p,m=t.sample(g,v);m>-.45||m<-3||c[u%3].push({x:g,y:m,z:v,scale:.7+e()*.7,yaw:e()*Math.PI*2,shade:.9+e()*.18})}s.reefMeshes=c.flatMap((u,d)=>Ic(s.reef,"coral",d,u))}function fv(s){const t=s.plan,e=t.waterfall;if(!e)return;const i=[],n=[],r=[],a=20,o=Math.cos(t.angle),l=Math.sin(t.angle);for(let y=0;y<=a;y++){const _=-1.15+y/a*3.25;for(const x of[-.39,.39]){const I=e.x+x*o+_*l,A=e.z-x*l+_*o;i.push(I,t.sample(I,A)+.055,A),n.push((x+.39)/.78,y/a)}}for(let y=0;y<a;y++){const _=y*2;r.push(_,_+2,_+1,_+1,_+2,_+3)}const h=new ce;h.setAttribute("position",new se(i,3)),h.setAttribute("uv",new se(n,2)),h.setIndex(r),h.computeVertexNormals();const c=new pi({transparent:!0,depthWrite:!1,side:Ne,uniforms:{time:Ls.time,daylight:{value:1}},vertexShader:"varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",fragmentShader:`uniform float time,daylight;varying vec2 vUv;void main(){float edge=smoothstep(0.,.14,vUv.x)*smoothstep(1.,.86,vUv.x);float streak=pow(.5+.5*sin(vUv.x*35.+sin(vUv.y*21.-time*4.)),4.);float rush=.5+.5*sin(vUv.y*68.-time*11.);vec3 c=mix(vec3(.29,.76,.73),vec3(.86,.98,.90),streak*.55+rush*.22);gl_FragColor=vec4(c*(.35+.65*daylight),edge*.77);#include <tonemapping_fragment>
#include <colorspace_fragment>
}`.replace(";#include",`;
#include`)}),u=new Yt(h,c);u.name="spring-cascade",u.renderOrder=8,s.effects.add(u),s.waterfall=u;const d=gi(e,0,1.55,t.angle),p=t.sample(d.x,d.z)+.13,g=Pt(.87,.87,.025,7849648,d.x,p,d.z,20);g.scale.z=.82,s.structures.add(g);const v=new Float32Array(54);for(let y=0;y<18;y++)v[y*3]=d.x+Math.sin(y*2.4)*.65,v[y*3+1]=p+.1+y%5*.1,v[y*3+2]=d.z+Math.cos(y*2.4)*.6;const m=new ce;m.setAttribute("position",new ye(v,3));const f=new Vr(m,new ks({color:13496030,size:.12,transparent:!0,opacity:.3,depthWrite:!1}));s.effects.add(f),s.mist=f}function pv(s,t,e,i,n,r,a){const o=Ca[r]||Ca[0],l=o.legacyIndex??r%3,h=Ca[l],c=K0(a,n,o,t),u=new kt;u.position.set(e,0,i);const d={id:t,x:e,z:i,radius:c.radius,baseRadius:n,seed:a,biome:o,legacyBiome:h,group:u,plan:c,land:new kt,structures:new kt,pickups:new kt,reef:new kt,effects:new kt,resources:[],colliders:[],jellies:[],name:t==="0,-1"?"Pelican Cay":bc[a%(bc.length-1)+1]};u.name="island-"+t,d.land.name="foliage",d.structures.name="landmarks",d.pickups.name="finite-supplies",d.effects.name="island-atmosphere",u.add(d.structures,d.land,d.pickups,d.reef,d.effects);const p=we(16777215,{vertexColors:!0,roughness:1,flatShading:!1});d.terrain=new Yt(Pc(c,64),p),d.terrain.name="canonical-walk-surface",d.terrain.receiveShadow=!0,d.terrain.castShadow=!1,d.farTerrain=new Yt(Pc(c,24),p),d.farTerrain.name="distant-island-lod",d.farTerrain.visible=!1,u.add(d.terrain,d.farTerrain);const g=o.id==="ruins"?"temple":o.id==="pirate"?"camp":o.poi.kind;xr(d,sv(g,o.rock),c.landmark,c.angle);const v=Math.atan2(c.routes[0][5].x-c.grotto.x,c.routes[0][5].z-c.grotto.z);xr(d,rv(o.rock,o.id),c.grotto,v),d.cave={...c.grotto,yaw:v};const m=gi(c.landmark,g==="spring"||g==="wreck"?0:g==="temple"?-1.2:-2.55,g==="wreck"||g==="temple"?3:g==="spring"?2:1.5,c.angle);un(s,d,{id:`${t}:cache`,type:"cache",name:"Weathered supply cache",point:gi(c.landing,.1,.03,c.angle),mesh:Oa()});const f=gi(c.landing,1.1,.3,c.angle),y=c.sample(f.x,f.z);d.structures.add(Rt([f.x,y,f.z],[f.x,y+2.2,f.z],.028,9863250),ot(.5,.28,.025,12946524,f.x+.23,y+1.92,f.z));const _=o.poi;un(s,d,{id:`${t}:poi:${h.poi.id}`,type:"poi",name:_.name,point:m,mesh:Oa(.68),loot:_.loot,story:_.story,icon:_.icon,action:"explore"});for(let D=0;D<6;D++){const U=1+D%5,L=c.routes[0][U-1],B=c.routes[0][U],q=.35+(a+D*13)%31/100,Q=B.x-L.x,et=B.z-L.z,pt=Math.hypot(Q,et),qt=D%2?1:-1,Y={x:Me.lerp(L.x,B.x,q)+et/pt*qt*.9,z:Me.lerp(L.z,B.z,q)-Q/pt*qt*.9},tt=h.resources[D%h.resources.length];un(s,d,{id:`${t}:resource${D}`,type:tt,name:tt==="copper"?"Copper deposit":tt==="vine"?"Wild vine":tt==="coconut"?"Ripe coconut":tt==="scrap"?"Outpost scrap":"Driftwood bundle",point:Y,mesh:Dc(tt)})}const x=gi(c.routes[0][3],.6,-.2,c.angle);un(s,d,{id:`${t}:special`,type:h.special,name:h.special==="resin"?"Amber palm resin":h.special==="coral"?"Sea glass coral":"Navigator’s lens",point:x,mesh:Dc(h.special),amount:h.special==="relic"?1:2});const I=a%3===0||t==="0,-1",A=Lh(a);d.puzzle={enabled:I,sequence:A};const P=gi(c.viewpoint,0,.75,c.angle),E=`${o.id==="pirate"?"The quartermaster hid a share for whoever followed the headland trail.":o.id==="volcano"?"The black terraces were here long before our camp. The sheltered shore still has vines and copper.":o.id==="ruins"?"The old stone gateway frames the same stars we steered by. No ruin is silent if you know where to look.":"Follow the worn path past the overlook. A sheltered opening lies beyond the last bend."} ${I?`The latch answers three carved stones: ${A.map(D=>Fa[D]).join(", then ")}. Read them in that order. Their light will lead you back to the grotto.`:"The keeper left a provision chest in the grotto beyond the overlook. There is no lock, only a path easy to miss."} Three signal fragments still carry the rescue frequency: 104.8.`;if(un(s,d,{id:`${t}:explore:journal`,type:"journal",name:o.id==="pirate"?"Quartermaster’s journal":"Keeper’s trail journal",point:P,mesh:lv(),story:E,icon:"book",action:"read"}),I)for(let D=0;D<3;D++){const U=c.routes[0][1+D*2],L=gi(U,D%2?1.25:-1.25,.2,c.angle),B=cv(D),q=c.sample(L.x,L.z);B.group.position.set(L.x,q,L.z),B.group.rotation.y=c.angle,d.pickups.add(B.group),un(s,d,{id:`${t}:explore:rune${D}`,type:"rune",name:`${Fa[D][0].toUpperCase()+Fa[D].slice(1)} waystone`,point:L,mesh:B.glyph,parent:B.group,index:D,action:"touch"})}const S=gi(c.grotto,0,-.4,v);if(un(s,d,{id:`${t}:explore:treasure`,type:"treasure",name:I?"Sealed keeper’s chest":"Hidden provision chest",point:S,mesh:Oa(.82,!0),gate:I,loot:{[h.special]:1,scrap:3,cookedFish:2,rope:1},story:"A dry parcel, carefully wrapped. Someone planned for another traveler. You leave the old shelter a little more certain of the next horizon.",icon:"backpack",action:I?"inspect":"open"}),o.id==="reef"||o.id==="ruins"||t==="0,-1"||a%5===0){const D=gi(c.viewpoint,0,-1.8,c.angle);D.y=c.sample(D.x,D.z),xr(d,av(o.rock),D,c.angle),d.rareLandmark="Sea gate"}else if(o.id==="pirate"){const D=gi(c.viewpoint,1.8,-1.5,c.angle);D.y=c.sample(D.x,D.z),xr(d,ov(),D,c.angle),d.rareLandmark="Broken lookout"}if(o.id==="volcano"){const D=c.toLocal(0,-.24),U=new Float32Array(72);for(let q=0;q<24;q++){const Q=q*2.4,et=.4+q%5*.18;U.set([D.x+Math.cos(Q)*et,c.sample(D.x,D.z)+.5+q*.1,D.z+Math.sin(Q)*et],q*3)}const L=new ce;L.setAttribute("position",new ye(U,3));const B=new Vr(L,new ks({color:12240571,size:.27,opacity:.28,transparent:!0,depthWrite:!1}));d.effects.add(B),d.fumarole=B}for(let D=0;D<d.resources.length;D++){const U=d.resources[D],L=d.resources.slice(0,D),B={...U.local};let q=U.local;const Q=et=>c.sample(et.x,et.z)>=.12&&!Ji(d,et.x,c.sample(et.x,et.z),et.z,.24,1.6)&&L.every(pt=>Math.hypot(pt.local.x-et.x,pt.local.z-et.z)>.85);if(!Q(q))for(let et=0;et<70;et++){const pt=et*2.39996,qt=.6+Math.floor(et/10)*.38,Y={x:B.x+Math.cos(pt)*qt,z:B.z+Math.sin(pt)*qt};if(Q(Y)){q=Y;break}}if(q!==U.local){const et=c.sample(q.x,q.z);U.root.position.x+=q.x-U.local.x,U.root.position.z+=q.z-U.local.z,U.root.position.y+=et-U.position.y,U.local={...q},U.position.set(e+q.x,et,i+q.z)}if(["rune","cache","treasure","poi"].includes(U.type)){const et=U.mesh.scale.x,pt=U.type==="rune"?.925:.585*et,qt=U.type==="rune"?.55:.86*et,Y=U.type==="rune"?.42:.655*et;U.collider={x:U.local.x,z:U.local.z,y:U.position.y+pt*.5,w:qt,h:pt,d:Y,yaw:U.type==="rune"?c.angle:0,walkable:!0,resourceId:U.id,disabled:!1},d.colliders.push(U.collider)}}fv(d),uv(d);const M=()=>hv(d);d.nav=M(),d.placementRepairs=0;const R=(D,U,L)=>{const B=new Rr(e+U.x,L,i+U.z);for(const q of d.nav.reachable){const Q=d.nav.point(q);if(Math.hypot(Q.x-U.x,Q.z-U.z,(Q.y-L)*.65)>2.05||Math.abs(Q.y-L)>1.55||Ji(d,Q.x,Q.y,Q.z,.29,1.72))continue;const pt=new Rr(e+Q.x,Q.y,i+Q.z);if(s.interactionClear(d,pt,B,D.id))return!0}return!1},V=(D,U)=>d.resources.every(L=>L===D||Math.hypot(L.local.x-U.x,L.local.z-U.z)>.85);for(let D=0;D<3;D++){let U=!1;for(const L of d.resources){const B=rt=>{if(L.type!=="treasure")return!0;const st=rt.x-c.grotto.x,Tt=rt.z-c.grotto.z,Dt=Math.cos(v),zt=Math.sin(v);return Math.abs(st*Dt-Tt*zt)<.72&&st*zt+Tt*Dt>-.94&&st*zt+Tt*Dt<.8},q=(rt,st)=>B(rt)&&st>=.12&&V(L,rt)&&!Ji(d,rt.x,st,rt.z,L.type==="rune"?.34:L.collider?.47:.29,.7,L.id)&&R(L,rt,st);if(q(L.local,L.position.y))continue;const Q=d.nav.reachable.map(rt=>d.nav.point(rt)).sort((rt,st)=>(rt.x-L.local.x)**2+(rt.z-L.local.z)**2-(st.x-L.local.x)**2-(st.z-L.local.z)**2),et=L.collider?{x:L.collider.x,y:L.collider.y,z:L.collider.z}:null;let pt=null;for(const rt of Q)if(!(L.type==="rune"&&Cs(c,rt.x,rt.z)<.95)&&(L.collider&&(L.collider.x=rt.x,L.collider.z=rt.z,L.collider.y=rt.y+L.collider.h*.5),q(rt,rt.y))){pt=rt;break}if(et&&Object.assign(L.collider,et),!pt)throw new Error(`No accessible placement for ${L.id} (${d.nav.reachable.length} reachable cells)`);const qt=pt.x-L.local.x,Y=pt.z-L.local.z,tt=pt.y-L.position.y;L.root.position.x+=qt,L.root.position.z+=Y,L.root.position.y+=tt,L.local={x:pt.x,z:pt.z},L.position.set(e+pt.x,pt.y,i+pt.z),L.collider&&(L.collider.x+=qt,L.collider.y+=tt,L.collider.z+=Y),d.placementRepairs++,U=!0}if(!U)break;d.nav=M()}for(const D of d.resources){if(D.navKey=d.nav.closest(D.local,!0),!R(D,D.local,D.position.y))throw new Error("Inaccessible island resource: "+D.id);Xr(D)}d.resources.some(D=>D.collected&&D.collider)&&(d.nav=M());const O=new Rr(c.landing.x,0,c.landing.z).normalize();let N=c.landing;for(let D=3;D<=12;D+=.5){const U={x:c.landing.x+O.x*D,z:c.landing.z+O.z*D};if(c.sample(U.x,U.z)<-1.2){N=U;break}}d.dock={x:e+N.x,z:i+N.z,radius:2.3};for(let D=0;D<5;D++){const U=D*2.39996+a,L=Math.cos(U)*c.radius*1.32,B=Math.sin(U)*c.radius*1.32,q=X0();q.position.set(L,-.3,B),u.add(q),d.jellies.push(q)}return Be(d.structures),d}function mv(s,t,e){const i=Math.hypot(t.x-s.x,t.z-s.z),n=i<s.radius+Math.max(e.islandNearDistance??32,e.foliageDistance??34,e.resourceDistance??34),r=i<e.viewDistance+s.radius;s.group.visible=r,s.terrain.visible=n,s.farTerrain.visible=!n;const a=i<s.radius+(e.foliageDistance??34),o=e.foliage??.65;s.land.visible=r;for(const l of s.foliage)for(const h of l.meshes)if(h.visible=l.canopy?(a||l.variant===0)&&i<e.viewDistance+s.radius:a,h.count=l.canopy?a?l.count:Math.min(l.count,Math.max(3,Math.round(l.count*o*.8))):["rock","log"].includes(l.kind)?l.count:Math.round(l.count*o),l.canopy){h.geometry=!a||e.label==="Low"?h.userData.farGeometry:h.userData.nearGeometry;const c=n?"near":"far";c!==h.userData.coastLOD&&(h.instanceMatrix.array.set(n?h.userData.nearMatrices:h.userData.farMatrices),h.instanceMatrix.needsUpdate=!0,h.userData.coastLOD=c)}s.pickups.visible=i<s.radius+(e.resourceDistance??34);for(const l of s.resources)Xr(l);s.reef.visible=a;for(const l of s.reefMeshes)l.count=Math.max(0,Math.round(l.instanceMatrix.count*o));s.effects.visible=a,s.mist&&s.mist.geometry.setDrawRange(0,Math.round(18*o)),s.fumarole&&s.fumarole.geometry.setDrawRange(0,Math.round(24*o));for(const l of s.jellies)l.visible=i<e.entityDistance+s.radius*2}function Xr(s){if(s.collider&&s.type!=="rune"&&(s.collider.disabled=s.collected),s.type!=="rune"){s.mesh.visible=!s.collected;return}s.mesh.visible=!0,s.collected&&!s.mesh.userData.activated&&(s.mesh.userData.activated=!0,s.mesh.traverse(t=>{t.isMesh&&(t.material=we(12968628,{vertexColors:!0,emissive:3961170,emissiveIntensity:.45}))}))}function gv(s,t,e){const i=Math.hypot(t.x-s.x,t.z-s.z),n=Math.min(1,240/Math.max(i,.01)),r={x:s.x+(t.x-s.x)*n,z:s.z+(t.z-s.z)*n},a=(N,D)=>{const U=Math.hypot(D.x-N.x,D.z-N.z),L=Math.max(1,Math.ceil(U/1.8));for(let B=1;B<=L;B++)if(!e(N.x+(D.x-N.x)*B/L,N.z+(D.z-N.z)*B/L))return!1;return!0};if(a(s,r))return[r];const o=4,l=Math.min(s.x,r.x)-48,h=Math.min(s.z,r.z)-48,c=Math.ceil((Math.abs(s.x-r.x)+96)/o)+1,u=Math.ceil((Math.abs(s.z-r.z)+96)/o)+1,d=c*u;if(d>12e3)return[];const p=new Int8Array(d),g=new Float32Array(d),v=new Int32Array(d);g.fill(1/0),v.fill(-1);const m=N=>({x:l+N%c*o,z:h+Math.floor(N/c)*o}),f=N=>{if(N<0||N>=d)return!1;if(!p[N]){const D=m(N);p[N]=e(D.x,D.z)?1:-1}return p[N]>0},y=N=>{let D=-1,U=1/0;for(let L=0;L<d;L++){const B=m(L),q=(B.x-N.x)**2+(B.z-N.z)**2;q<U&&f(L)&&(U=q,D=L)}return D},_=y(s),x=y(r);if(_<0||x<0)return[];const I=[];function A(N,D){let U=I.length;for(I.push({k:N,f:D});U;){const L=U-1>>1;if(I[L].f<=D)break;I[U]=I[L],U=L}I[U]={k:N,f:D}}function P(){const N=I[0],D=I.pop();if(I.length){let U=0;for(;U*2+1<I.length;){let L=U*2+1;if(L+1<I.length&&I[L+1].f<I[L].f&&L++,D.f<=I[L].f)break;I[U]=I[L],U=L}I[U]=D}return N.k}g[_]=0,A(_,0);let E=0,S=!1;for(;I.length&&E++<12e3;){const N=P();if(p[N]===2)continue;if(p[N]=2,N===x){S=!0;break}const D=N%c,U=Math.floor(N/c);for(let L=-1;L<=1;L++)for(let B=-1;B<=1;B++){if(!B&&!L)continue;const q=D+B,Q=U+L,et=Q*c+q;if(q<0||q>=c||Q<0||Q>=u||!f(et)||p[et]===2||B&&L&&(!f(U*c+q)||!f(Q*c+D)))continue;const pt=g[N]+(B&&L?1.4142:1);pt>=g[et]||(g[et]=pt,v[et]=N,A(et,pt+Math.hypot(q-x%c,Q-Math.floor(x/c))))}}if(!S)return[];const M=[];for(let N=x;N>=0;N=v[N])M.push(m(N));M.reverse(),a(M.at(-1),r)&&M.push(r);const R=[];let V=s,O=0;for(;O<M.length;){let N=O;for(let D=O+1;D<M.length;D++)a(V,M[D])&&(N=D);if(R.push(M[N]),V=M[N],O=N+1,R.length>64)return[]}return R}function vi(s,t,e,i=1){return i*(Math.sin(s*.55+t*.2+e*1.1)*.075+Math.sin(-s*.28+t*.7+e*1.45)*.045+Math.sin(s*1.35+t*.4-e*1.8)*.017+Math.sin(s*2.1-t*1.4+e*2.4)*.008)}class vv{constructor(t){this.atlasSize=65,this.coastPixels=new Uint8Array(4225*4*4),this.coastTexture=new xh(this.coastPixels,65,260,ri),this.coastTexture.minFilter=this.coastTexture.magFilter=fi,this.coastTexture.generateMipmaps=!1,this.coastTexture.needsUpdate=!0,this.coastKey="",this.uniforms={coastAtlas:{value:this.coastTexture},coastColors:{value:Array.from({length:4},()=>new Et(5228468))},microDetail:{value:1},time:{value:0},amplitude:{value:1},sunDirection:{value:new C(-.5,.8,-.3).normalize()},sunColor:{value:new Et(16772299)},deepColor:{value:new Et(1535623)},shallowColor:{value:new Et(6798768)},fogColor:{value:new Et(12245204)},fogDensity:{value:.0018},daylight:{value:1},islands:{value:Array.from({length:4},()=>new C(1e4,1e4,0))}};const e=new pi({uniforms:this.uniforms,transparent:!0,depthWrite:!1,vertexShader:`
      uniform float time, amplitude;
      varying vec3 vWorld, vNormal; varying float vHeight;
      void main(){
        vec3 p=(modelMatrix*vec4(position,1.)).xyz;
        float a=p.x*.55+p.z*.2+time*1.1;
        float b=-p.x*.28+p.z*.7+time*1.45;
        float c=p.x*1.35+p.z*.4-time*1.8;
        float d=p.x*2.1-p.z*1.4+time*2.4;
        float h=(sin(a)*.075+sin(b)*.045+sin(c)*.017+sin(d)*.008)*amplitude;
        float dx=(cos(a)*.075*.55-cos(b)*.045*.28+cos(c)*.017*1.35+cos(d)*.008*2.1)*amplitude;
        float dz=(cos(a)*.075*.2+cos(b)*.045*.7+cos(c)*.017*.4-cos(d)*.008*1.4)*amplitude;
        p.y=h; vWorld=p;vHeight=h;vNormal=normalize(vec3(-dx,1.,-dz));
        gl_Position=projectionMatrix*viewMatrix*vec4(p,1.);
      }`,fragmentShader:`
      uniform float time, amplitude, fogDensity, daylight, microDetail;
      uniform sampler2D coastAtlas;uniform vec3 coastColors[4];
      uniform vec3 sunDirection,sunColor,deepColor,shallowColor,fogColor;
      uniform vec3 islands[4];
      varying vec3 vWorld,vNormal;varying float vHeight;
      void main(){
        float dist=length(cameraPosition-vWorld),detail=(1.-smoothstep(16.,85.,dist))*microDetail;
        vec3 n=normalize(vNormal+vec3(sin(vWorld.x*4.+time)*.018,0.,cos(vWorld.z*4.3+time*.8)*.018)*detail);
        vec3 viewDir=normalize(cameraPosition-vWorld);
        float fresnel=pow(1.-max(dot(n,viewDir),0.),3.);
        float bed=-5.;vec3 shoreTint=shallowColor;
        for(int i=0;i<4;i++){
          vec2 local=(vWorld.xz-islands[i].xy)/max(islands[i].z*2.,.01)+.5;
          if(local.x>=0.&&local.x<=1.&&local.y>=0.&&local.y<=1.){
            vec2 uv=vec2((local.x*64.+.5)/65.,(local.y*64.+.5+float(i)*65.)/260.);
            vec4 packed=texture2D(coastAtlas,uv);float h=(packed.r*65280.+packed.g*255.)/65535.*16.-5.;
            if(h>bed){bed=h;shoreTint=coastColors[i];}
          }
        }
        float depth=max(0.,vWorld.y-bed),shallow=1.-smoothstep(.25,4.1,depth);
        float shore=(1.-smoothstep(.035,.32,abs(depth-(.10+.045*sin(time*1.5+vWorld.x*.5)))))*(.72+.28*sin(vWorld.z*4.-time*2.));
        float pattern=sin(vWorld.x*.42+vWorld.z*.3+time*.4)*sin(vWorld.z*.33-time*.45)*.018;
        vec3 color=mix(deepColor,shoreTint,clamp(shallow*.95+pattern,0.,1.));
        float caustic=pow(max(0.,sin(vWorld.x*2.6+sin(vWorld.z*2.)+time*.8)*sin(vWorld.z*2.7-time*.6)),5.);
        color+=vec3(.08,.12,.06)*caustic*shallow*detail*(1.-shore);
        color=mix(color,fogColor,fresnel*.30);
        float spec=pow(max(dot(reflect(-sunDirection,n),viewDir),0.),140.);
        float sparkle=pow(max(dot(reflect(-sunDirection,n),viewDir),0.),850.);
        color+=sunColor*(spec*.35+sparkle*.40*detail)*daylight;
        float crest=smoothstep(.115,.148,vHeight/max(amplitude,.1))*smoothstep(.3,.9,sin(vWorld.x*3.+vWorld.z*1.2+time)*.5+.5)*.19;
        color=mix(color,vec3(.82,.94,.87),clamp(crest+shore*.72,0.,.65));
        color*=.33+.67*daylight;
        float fog=1.-exp(-pow(dist*fogDensity,2.));
        color=mix(color,fogColor,clamp(fog,0.,1.));
        float alpha=clamp(mix(.43,.99,smoothstep(.12,3.1,depth))+fresnel*.17+shore*.22,.43,1.);
        gl_FragColor=vec4(color,alpha);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`}),i=new ns(1500,1500,80,80);i.rotateX(-Math.PI/2),this.geometries=new Map([[80,i]]),this.mesh=new Yt(i,e),this.mesh.frustumCulled=!1,this.mesh.renderOrder=3,this.mesh.position.y=-.03,t.add(this.mesh)}setQuality(t){if(this.uniforms.microDetail.value=t<=48?.45:1,!this.geometries.has(t)){const e=new ns(1500,1500,t,t);e.rotateX(-Math.PI/2),this.geometries.set(t,e)}this.mesh.geometry=this.geometries.get(t)}update(t,e,i,n,r,a=1/60){this.uniforms.time.value=t,this.uniforms.amplitude.value=Me.lerp(this.uniforms.amplitude.value,si[i].amplitude,1-Math.exp(-a*.8)),this.uniforms.daylight.value=n,this.uniforms.fogDensity.value=si[i].fog,this.mesh.position.x=Math.round(e.x/100)*100,this.mesh.position.z=Math.round(e.z/100)*100;const o=this.uniforms.islands.value,l=[...r].sort((c,u)=>Math.hypot(c.x-e.x,c.z-e.z)-Math.hypot(u.x-e.x,u.z-e.z)).slice(0,4),h=l.map(c=>c.id).join("|");if(h!==this.coastKey){this.coastKey=h,this.coastPixels.fill(0),l.forEach((c,u)=>{const d=c.plan?.extent??c.radius*1.42;o[u].set(c.x,c.z,d),this.uniforms.coastColors.value[u].set(c.plan?.profile.water??6408116);for(let p=0;p<65;p++)for(let g=0;g<65;g++){const v=(g/64*2-1)*d,m=(p/64*2-1)*d,f=c.plan?c.plan.sample(v,m):-5,y=Math.round(ve((f+5)/16,0,1)*65535),_=((u*65+p)*65+g)*4;this.coastPixels[_]=y>>8,this.coastPixels[_+1]=y&255,this.coastPixels[_+3]=255}});for(let c=l.length;c<4;c++)o[c].set(1e4,1e4,0);this.coastTexture.needsUpdate=!0}}}class xv{constructor(t,e,i={}){this.scene=t,this.bus=e,this.chunks=new Map,this.islands=[],this.chunkSize=100,this.collected=new Set(i.collected||[]),this.discovered=new Set(i.discovered||[]),this.palms=[],this.lastChunk="",this.pending=[],this.needed=new Set,this.quality=null}update(t,e=1/0){const i=Math.floor(t.x/100),n=Math.floor(t.z/100),r=`${i},${n}`;if(r!==this.lastChunk){this.lastChunk=r,this.needed=new Set;const o=[];for(let l=i-1;l<=i+1;l++)for(let h=n-1;h<=n+1;h++){const c=`${l},${h}`;this.needed.add(c),this.chunks.has(c)||o.push([l,h])}this.pending=o.sort((l,h)=>Math.hypot(l[0]-i,l[1]-n)-Math.hypot(h[0]-i,h[1]-n));for(const[l,h]of this.chunks)this.needed.has(l)||(h.island&&(this.scene.remove(h.island.group),this.islands=this.islands.filter(c=>c!==h.island),Ph(h.island.group)),this.chunks.delete(l))}let a=0;for(;this.pending.length&&a<e;){const[o,l]=this.pending.shift();this.needed.has(`${o},${l}`)&&!this.chunks.has(`${o},${l}`)&&(this.loadChunk(o,l),a++)}a&&this.bus.emit("chunks",this.chunks.size);for(const o of this.islands)Math.hypot(t.x-o.x,t.z-o.z)<o.radius+18&&!this.discovered.has(o.id)&&(this.discovered.add(o.id),this.bus.emit("islandDiscovered",o))}setDetail(t,e){this.quality=e;for(const i of this.islands){if(i.plan){mv(i,t,e);continue}const n=Math.hypot(t.x-i.x,t.z-i.z);i.group.visible=n<e.viewDistance+i.radius,i.land.visible=n<e.detailDistance+i.radius;for(const r of i.resources)r.mesh.visible=!r.collected&&n<e.detailDistance+i.radius;for(const r of i.jellies)r.visible=n<e.entityDistance+i.radius*2}}loadChunk(t,e){let i=null;if(t===0&&e===-1)i=this.generateIsland("0,-1",28,-61,12.5,0,4281);else if(!(t===0&&e===0)&&Ar(t,e)>.37){const n=Math.floor(Ar(t,e,9218)*999999),r=ki(n);i=this.generateIsland(`${t},${e}`,(t+.5)*100+(r()-.5)*32,(e+.5)*100+(r()-.5)*32,10+r()*6,Math.floor(r()*3)+(Ar(t,e,6631)>.55?3:0),n)}this.chunks.set(`${t},${e}`,{island:i}),i&&(this.islands.push(i),this.scene.add(i.group))}generateIsland(t,e,i,n,r,a){return pv(this,t,e,i,n,r,a)}localHeight(t,e,i){if(t.plan)return t.plan.sample(e,i);const n=Math.atan2(i,e),r=1+Math.sin(n*3+t.seed)*.07+Math.cos(n*5+t.seed*.3)*.05,a=Math.hypot(e,i)/(t.radius*r);if(a>1.12)return-2;const o=[[0,3.2],[.2,3.8],[.42,2.7],[.64,1.25],[.78,.38],[.94,.12],[1.02,-.2],[1.12,-1.5]];let l=-1;for(let h=1;h<o.length;h++)if(a<=o[h][0]){const[c,u]=o[h-1],[d,p]=o[h];l=Me.lerp(u,p,(a-c)/(d-c));break}return l+Math.sin(e*.7+t.seed)*Math.cos(i*.6)*.1*Math.max(0,1-a)}groundAt(t,e,i=-1/0){for(const n of this.islands){const r=n.plan?.extent??n.radius*1.12;if(Math.abs(t-n.x)>r||Math.abs(e-n.z)>r)continue;const a=t-n.x,o=e-n.z,l=this.localHeight(n,a,o);if(l>-.15)return{height:n.plan?Math.max(l,dv(n,a,o,i)):l,island:n}}return null}nearestResource(t,e=2.4){let i=null,n=e;for(const r of this.islands)for(const a of r.resources)if(!a.collected){const o=t.x-a.position.x,l=t.z-a.position.z,h=t.y-a.position.y,c=Math.hypot(o,l,h*.65);c<n&&Math.abs(h)<1.8&&this.interactionClear(r,t,a.position,a.id)&&(n=c,i={...a,island:r,original:a},a.type==="treasure"&&a.gate&&r.puzzle.sequence.every(u=>this.collected.has(`${r.id}:explore:rune${u}`))&&(i.name="Keeper’s provision chest",i.action="open"))}return i}interactionClear(t,e,i,n=null){if(!t.plan)return!0;const r=new C(e.x-t.x,e.y+1.1,e.z-t.z),a=new C(i.x-t.x,i.y+.3,i.z-t.z),o=a.clone().sub(r),l=o.length();for(let h=.18;h<l-.2;h+=.22){const c=r.clone().addScaledVector(o,h/l);if(t.plan.sample(c.x,c.z)>c.y-.04||Ji(t,c.x,c.y,c.z,.015,.04,n))return!1}return!0}terrainHeight(t,e){let i=-5;for(const n of this.islands)Math.abs(t-n.x)<n.plan.extent&&Math.abs(e-n.z)<n.plan.extent&&(i=Math.max(i,n.plan.sample(t-n.x,e-n.z)));return i}boatContact(t,e){for(const i of e)if(this.terrainHeight(t.x+i.x,t.z+i.z)>-.38)return!0;return!1}seaClear(t,e,i=3.5){if(this.terrainHeight(t,e)>-.42)return!1;for(let n=0;n<8;n++){const r=n*Math.PI/4;if(this.terrainHeight(t+Math.cos(r)*i,e+Math.sin(r)*i)>-.42)return!1}return!0}dockFor(t,e=3.5){const i=t.plan.landing,n=Math.hypot(i.x,i.z),r=i.x/n,a=i.z/n;for(let o=3;o<e*2+28;o+=.5){const l={x:t.x+i.x+r*o,z:t.z+i.z+a*o};if(this.seaClear(l.x,l.z,e+1))return l}return{x:t.x+r*(t.radius+e+12),z:t.z+a*(t.radius+e+12)}}seaRoute(t,e,i=3.5){return gv(t,e,(n,r)=>this.seaClear(n,r,i+.65))}resolveMovement(t,e,i=!1){const n=(r,a)=>{for(const o of this.islands){if(!o.plan||Math.hypot(r-o.x,a-o.z)>o.plan.extent*1.42)continue;const l=r-o.x,h=a-o.z,c=o.plan.sample(l,h);if(c>Math.max(t.y+.46,i?.35:-1/0))return!1;const u=c-t.y,d=Math.hypot(r-t.x,a-t.z);if(!i&&u>.015&&d>.001&&u/d>1.05||Ji(o,l,t.y,h,.28,1.72))return!1}return!0};n(e.x,e.z)||(n(t.x,e.z)?e.x=t.x:(n(e.x,t.z)||(e.x=t.x),e.z=t.z))}cameraClip(t,e){const i=e.clone().sub(t),n=i.length();if(!n)return e;for(let r=.55;r<n;r+=.23){const a=t.clone().addScaledVector(i,r/n);let o=!1;for(const l of this.islands)if(l.plan&&Math.abs(a.x-l.x)<l.plan.extent&&Math.abs(a.z-l.z)<l.plan.extent){const h=a.x-l.x,c=a.z-l.z;if(l.plan.sample(h,c)>a.y-.2||Ji(l,h,a.y-.1,c,.13,.2)){o=!0;break}}if(o)return e.copy(t).addScaledVector(i,Math.max(.4,r-.25)/n)}return e}ceilingAt(t,e){for(const i of this.islands)if(i.plan)for(const n of i.colliders){const r=t.x-i.x-n.x,a=t.z-i.z-n.z,o=Math.cos(n.yaw),l=Math.sin(n.yaw),h=n.y-n.h*.5;if(Math.abs(r*o-a*l)<n.w*.5+.18&&Math.abs(r*l+a*o)<n.d*.5+.18&&e+1.72<=h+.02&&t.y+1.72>h)return h-1.72}return null}animate(t,e=1,i=1){Ls.time.value=t%4096,Ls.strength.value=(this.quality?.foliage??.65)*i;for(const n of this.islands)n.waterfall&&(n.waterfall.material.uniforms.daylight.value=e),n.mist&&(n.mist.position.y=Math.sin(t*.9+n.seed)*.08,n.mist.material.opacity=.15+.15*e),n.fumarole&&(n.fumarole.position.y=Math.sin(t*.45+n.seed)*.2,n.fumarole.material.opacity=.12+.16*e)}navigationPath(t,e){return t.nav?.pathTo({x:e.position.x-t.x,z:e.position.z-t.z}).map(i=>new C(i.x+t.x,i.y,i.z+t.z))||[]}collect(t,e=null){const i=t?.original,n=t?.island;if(!i||!this.islands.includes(n)||!n.resources.includes(i)||i.collected||this.collected.has(i.id)||e&&(Math.hypot(e.x-i.position.x,e.z-i.position.z,(e.y-i.position.y)*.65)>2.6||Math.abs(e.y-i.position.y)>1.8)||e&&!this.interactionClear(n,e,i.position,i.id))return!1;if(i.type==="rune"){if(!this.collected.has(`${n.id}:explore:journal`))return this.bus.emit("islandHint","The worn symbols need a clue. A journal waits on the overlook."),!1;const r=n.puzzle.sequence.filter(a=>this.collected.has(`${n.id}:explore:rune${a}`)).length;if(n.puzzle.sequence[r]!==i.index)return this.bus.emit("islandHint","The stone is quiet. Check the journal for the next symbol."),!1}return i.type==="treasure"&&i.gate&&!n.puzzle.sequence.every(r=>this.collected.has(`${n.id}:explore:rune${r}`))?(this.bus.emit("islandHint","Three carved waystones are tied to this latch. Follow the trail to the keeper’s journal."),!1):(i.collected=!0,Xr(i),this.collected.add(i.id),this.bus.emit("resourceCollected",{type:i.type,island:n,resource:i}),!0)}toJSON(){return{generationVersion:3,collected:[...this.collected],discovered:[...this.discovered]}}}class yv{constructor(t){this.scene=t,this.pools={},this.active=[],this.spawnTimer=0,this.frustum=new Br,this.matrix=new ne;const e={wood:22,leaf:15,plastic:12,scrap:8,barrel:7};for(const[i,n]of Object.entries(e))this.pools[i]=new Ch(()=>{const r=H0(i);return r.visible=!1,t.add(r),r},n);this.entityDistance=65,this.types=["wood","wood","wood","leaf","leaf","plastic","plastic","scrap","barrel"]}spawn(t,e,i){const n=this.pools[t].acquire(),r={type:t,mesh:n,x:e,z:i,phase:Math.random()*6.28,rotation:Math.random()*6.28,hooked:!1};return n.position.set(e,0,i),this.active.push(r),r}seed(t){for(let e=0;e<43;e++){const i=e*2.39996,n=5+Math.sqrt(e/43)*29;this.spawn(this.types[e%this.types.length],t.x+Math.cos(i)*n,t.z+Math.sin(i)*n)}this.spawn("barrel",t.x+2.6,t.z+4.7),this.spawn("wood",t.x-1.7,t.z+4.3)}update(t,e,i,n,r=1){this.spawnTimer+=t;for(let a=this.active.length-1;a>=0;a--){const o=this.active[a];o.hooked||(o.x+=t*.035,o.z+=t*.1,o.mesh.position.set(o.x,vi(o.x,o.z,e,r)+.03,o.z),o.mesh.rotation.y=o.rotation+Math.sin(e*.3+o.phase)*.12,o.mesh.rotation.x=Math.sin(e*.8+o.phase)*.07);const l=Math.hypot(o.x-i.x,o.z-i.z);o.mesh.visible=o.hooked||l<this.entityDistance,l>65&&!o.hooked&&this.release(o)}if(this.spawnTimer>.6&&this.active.length<48){this.spawnTimer=0,this.matrix.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this.frustum.setFromProjectionMatrix(this.matrix);for(let a=0;a<10;a++){const o=Math.random()*6.28,l=30+Math.random()*13,h=i.x+Math.cos(o)*l,c=i.z+Math.sin(o)*l;if(!this.frustum.containsPoint(new C(h,0,c))){this.spawn(this.types[Math.floor(Math.random()*this.types.length)],h,c);break}}}}release(t){this.pools[t.type].release(t.mesh);const e=this.active.indexOf(t);e>=0&&this.active.splice(e,1)}nearest(t,e=1){let i=null,n=e;for(const r of this.active){if(r.hooked)continue;const a=r.mesh.position.distanceTo(t);a<n&&(n=a,i=r)}return i}}class _v{constructor(t,e){this.pool=new Ch(()=>{const i=$0();return t.add(i),i},1),this.mesh=this.pool.acquire(),this.bus=e,this.state="circling",this.timer=0,this.angle=1.8,this.health=100,this.target=null,this.attackCooldown=65,this.position=this.mesh.position,this.position.set(12,0,12),this.biteCooldown=0}update(t,e,i,n,r){if(r&&["targeting","attacking"].includes(this.state)&&(this.state="circling",this.timer=0,this.target=null),this.timer+=t,this.biteCooldown=Math.max(0,this.biteCooldown-t),!this.mesh.visible){this.timer>55&&(this.mesh=this.pool.acquire(),this.position=this.mesh.position,this.position.copy(i.position).add(new C(14,0,14)),this.health=100,this.state="circling",this.timer=0,this.target=null);return}this.mesh.userData.tail.rotation.y=Math.sin(e*4.5)*.32;const a=new C;let o=2.4;if(this.state==="circling"){if(this.angle+=t*.11,a.set(i.position.x+Math.cos(this.angle)*13,0,i.position.z+Math.sin(this.angle)*13),this.timer>this.attackCooldown&&!r){const c=n.exposedFoundations();if(c.length){const u=c.filter(p=>n.at(p.x,p.y+1,p.z)?.type!=="armor"),d=u.length?u:c;this.target=d[Math.floor(Math.random()*d.length)],this.state="targeting",this.timer=0,this.bus.emit("sharkWarning",this.target)}}}else if(this.state==="targeting"){if(!this.target||n.at(this.target.x,this.target.y,this.target.z)!==this.target){this.state="circling",this.timer=0;return}const c=this.position.clone().sub(i.position).setY(0);c.lengthSq()<1e-6?c.set(1,0,0):c.normalize(),a.copy(i.position).addScaledVector(c,8),o=1.3,this.timer>5&&(this.state="attacking",this.timer=0,this.bus.emit("sharkCharge"))}else if(this.state==="attacking"){if(!this.target||n.at(this.target.x,this.target.y,this.target.z)!==this.target){this.state="circling",this.timer=0;return}if(a.set(this.target.x,.1,this.target.z),i.localToWorld(a),a.y=0,o=6,this.position.distanceTo(a)<1){const c=n.at(this.target.x,this.target.y+1,this.target.z);this.lastBiteDamage=c?.type==="armor"?10:20,n.damage(this.target,this.lastBiteDamage),c?.type==="armor"&&n.damage(c,4),this.bus.emit("sharkBite",this.target),this.state="fleeing",this.timer=0}}else if(this.state==="fleeing"||this.state==="stunned"){const c=this.position.clone().sub(i.position).setY(0);c.lengthSq()<1e-6?c.set(1,0,0):c.normalize(),a.copy(i.position).addScaledVector(c,28),o=this.state==="stunned"?.5:5,this.state==="stunned"&&this.timer>.7&&(this.state="fleeing",this.timer=0),this.timer>10&&(this.state="circling",this.timer=0,this.attackCooldown=38)}a.y=vi(this.position.x,this.position.z,e);const l=a.sub(this.position);l.y=0;const h=l.length();if(h>.1){const c=Math.atan2(l.x,l.z);this.mesh.rotation.y+=Me.euclideanModulo(c-this.mesh.rotation.y+Math.PI,Math.PI*2)-Math.PI,this.position.addScaledVector(l.normalize(),Math.min(o*t,h))}this.position.y=vi(this.position.x,this.position.z,e)}hit(){return!this.mesh.visible||this.health<=0||this.state==="stunned"&&this.timer<.3?!1:(this.health-=15,this.state="stunned",this.timer=0,this.bus.emit("sharkHit"),this.health<=0&&(this.pool.release(this.mesh),this.timer=0,this.bus.emit("sharkDefeated")),!0)}toJSON(t){const e=this.target&&t.at(this.target.x,this.target.y,this.target.z)===this.target?this.target:null;return{state:this.mesh.visible?!e&&["targeting","attacking"].includes(this.state)?"circling":this.state:"defeated",position:this.position.toArray(),health:this.mesh.visible?Math.max(0,this.health):0,timer:this.timer,angle:this.angle,attackCooldown:this.attackCooldown,biteCooldown:this.biteCooldown,targetKey:e?`${e.x},${e.y},${e.z}`:null}}restore(t,e){if(t){for(const i of["state","health","timer","angle","attackCooldown","biteCooldown"])this[i]=t[i];this.position.fromArray(t.position),this.target=t.targetKey?e.blocks.get(t.targetKey):null,t.state==="defeated"&&this.pool.release(this.mesh)}}}class Mv{constructor(t,e=280){this.count=e,this.limit=e,this.factor=1,this.cursor=0,this.data=Array.from({length:e},()=>({life:0,v:new C})),this.positions=new Float32Array(e*3),this.colors=new Float32Array(e*3),this.positions.fill(-1e3);const i=new ce;i.setAttribute("position",new ye(this.positions,3)),i.setAttribute("color",new ye(this.colors,3)),this.mesh=new Vr(i,new ks({size:.095,vertexColors:!0,transparent:!0,opacity:.82,depthWrite:!1})),this.mesh.frustumCulled=!1,t.add(this.mesh)}setQuality(t){this.factor=t,this.limit=Math.max(1,Math.round(this.count*t)),this.mesh.geometry.setDrawRange(0,this.limit);for(let e=this.limit;e<this.count;e++)this.data[e].life=0,this.positions[e*3+1]=-1e3;this.mesh.geometry.attributes.position.needsUpdate=!0}burst(t,e=14215381,i=16,n=1){i=Math.max(1,Math.round(i*this.factor));const r=new Et(e);for(let a=0;a<i;a++){const o=this.cursor++%this.limit,l=this.data[o];l.life=.45+Math.random()*.5,l.v.set((Math.random()-.5)*n,Math.random()*n+.3,(Math.random()-.5)*n),this.positions[o*3]=t.x,this.positions[o*3+1]=t.y,this.positions[o*3+2]=t.z,this.colors.set([r.r,r.g,r.b],o*3)}this.mesh.geometry.attributes.color.needsUpdate=!0}update(t){for(let e=0;e<this.limit;e++){const i=this.data[e];if(!(i.life<=0)){if(i.life-=t,i.life<=0){this.positions[e*3+1]=-1e3;continue}i.v.y-=t*1.5,this.positions[e*3]+=i.v.x*t,this.positions[e*3+1]+=i.v.y*t,this.positions[e*3+2]+=i.v.z*t}}this.mesh.geometry.attributes.position.needsUpdate=!0}}class bv{constructor(t){this.scene=t;const e=new pi({side:We,depthWrite:!1,uniforms:{top:{value:new Et(9420234)},bottom:{value:new Et(13033174)},daylight:{value:1}},vertexShader:"varying vec3 vP;void main(){vP=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",fragmentShader:`varying vec3 vP;uniform vec3 top,bottom;uniform float daylight;void main(){float h=normalize(vP).y;vec3 col=mix(bottom,top,smoothstep(0.,.65,h));col=mix(vec3(.035,.075,.12),col,daylight);gl_FragColor=vec4(col,1.);#include <tonemapping_fragment>
#include <colorspace_fragment>
}`});e.fragmentShader=e.fragmentShader.replace(";#include",`;
#include`),this.sky=new Yt(new Os(850,24,16),e),t.add(this.sky),this.sun=new A0(16772561,3),this.sun.position.set(-30,60,30),this.sun.castShadow=!0,this.sun.shadow.mapSize.set(1024,1024),this.sun.shadow.camera.left=-24,this.sun.shadow.camera.right=24,this.sun.shadow.camera.top=24,this.sun.shadow.camera.bottom=-24,this.sun.shadow.camera.near=.5,this.sun.shadow.camera.far=150,this.sun.shadow.bias=-7e-4,this.sun.shadow.normalBias=.02,t.add(this.sun,this.sun.target),this.hemi=new w0(13099232,5076848,2.2),t.add(this.hemi),this.clouds=new kt,t.add(this.clouds);const i=ki(441),n=document.createElement("canvas");n.width=512,n.height=256;const r=n.getContext("2d");for(let c=0;c<24;c++){const u=75+i()*360,d=105+i()*40,p=32+i()*45,g=r.createRadialGradient(u,d,0,u,d,p);g.addColorStop(0,"rgba(250,250,235,.72)"),g.addColorStop(.65,"rgba(250,250,235,.55)"),g.addColorStop(1,"rgba(250,250,235,0)"),r.fillStyle=g,r.beginPath(),r.arc(u,d,p,0,Math.PI*2),r.fill()}const a=new _h(n);a.colorSpace=Ge;for(let c=0;c<17;c++){const u=c/17*Math.PI*2,d=190+i()*170,p=new s0(new gh({map:a,color:15331040,transparent:!0,opacity:.82,depthWrite:!1,fog:!0}));p.position.set(Math.cos(u)*d,14+i()*13,Math.sin(u)*d),p.scale.set(45+i()*30,12+i()*8,1),this.clouds.add(p)}this.birds=[];for(let c=0;c<8;c++){const u=q0();t.add(u),this.birds.push(u)}const o=950;this.rainCount=o;const l=new Float32Array(o*3);for(let c=0;c<o;c++)l[c*3]=(i()-.5)*50,l[c*3+1]=i()*30,l[c*3+2]=(i()-.5)*50;const h=new ce;h.setAttribute("position",new ye(l,3)),this.rain=new Vr(h,new ks({color:13427420,size:.035,transparent:!0,opacity:0,depthWrite:!1})),this.rain.frustumCulled=!1,t.add(this.rain),t.fog=new $o(12245204,.0018),this.lightningTimer=20,this.flash=0}setQuality(t){this.clouds.children.forEach((i,n)=>i.visible=n<t.clouds),this.birds.forEach((i,n)=>i.visible=n<t.birds),this.rainCount=t.rain,this.rain.geometry.setDrawRange(0,this.rainCount);const e=t.shadowSize||256;this.sun.shadow.mapSize.x!==e&&(this.sun.shadow.map?.dispose(),this.sun.shadow.map=null,this.sun.shadow.mapSize.set(e,e),this.sun.shadow.needsUpdate=!0),this.sun.castShadow=t.shadows}update(t,e,i,n,r){const a=Math.sin((n.fraction-.25)*Math.PI*2),o=ve((a+.16)*2.3,.08,1),l=r==="storm"?.55:r==="rain"?.8:1;this.sky.position.copy(i),this.sky.material.uniforms.daylight.value=o*l,this.sun.intensity=(2.8*o+.05)*l+this.flash*8,this.hemi.intensity=(1.75*o+.25)*l,this.sun.color.setHex(a<.35?16767151:16773334),this.sun.position.copy(i).add(new C(-Math.cos((n.fraction-.25)*Math.PI*2)*55,Math.max(7,a*65),30)),this.sun.target.position.copy(i),this.clouds.position.x=i.x+Math.sin(e*.002)*8,this.clouds.position.z=i.z;const h=new Et(12245204).multiplyScalar(.25+.75*o*l);this.scene.fog.color.copy(h),this.scene.fog.density=si[r].fog;for(let c=0;c<this.birds.length;c++){const u=this.birds[c];if(!u.visible)continue;const d=e*.07+c*.9;u.position.set(i.x+Math.cos(d)*(18+c*2),7+Math.sin(e*.3+c)*1.4,i.z-12+Math.sin(d)*15),u.rotation.y=-d,u.userData.wings[0].rotation.z=Math.sin(e*4+c)*.3,u.userData.wings[1].rotation.z=-Math.sin(e*4+c)*.3}if(this.rain.position.set(i.x,0,i.z),this.rain.material.opacity=Me.lerp(this.rain.material.opacity,si[r].rain*.5,.03),this.rain.material.opacity>.01){const c=this.rain.geometry.attributes.position.array;for(let u=0;u<this.rainCount*3;u+=3)c[u]+=.8*t,c[u+1]-=15*t,c[u+1]<0&&(c[u+1]=30),c[u]>25&&(c[u]=-25);this.rain.geometry.attributes.position.needsUpdate=!0}return this.flash=Math.max(0,this.flash-t*4),this.lightningTimer-=t,r==="storm"&&this.lightningTimer<0?(this.lightningTimer=12+Math.random()*18,this.flash=1,{daylight:o,fog:h,lightning:!0}):{daylight:o,fog:h,lightning:!1}}}class Sv{constructor(){this.context=null,this.volume=.35,this.enabled=!0,this.master=null}init(){if(this.context){this.context.resume().catch(()=>{});return}try{this.context=new(window.AudioContext||window.webkitAudioContext),this.master=this.context.createGain(),this.master.gain.value=this.enabled?this.volume:0,this.master.connect(this.context.destination);const t=this.context.createBuffer(1,this.context.sampleRate*4,this.context.sampleRate),e=t.getChannelData(0);let i=0;for(let h=0;h<e.length;h++){const c=Math.random()*2-1;i=(i+.02*c)/1.02,e[h]=i*3.5}const n=this.context.createBufferSource();n.buffer=t,n.loop=!0;const r=this.context.createBiquadFilter();r.type="lowpass",r.frequency.value=850;const a=this.context.createGain();a.gain.value=.16,n.connect(r),r.connect(a),a.connect(this.master),n.start();const o=this.context.createOscillator(),l=this.context.createGain();o.frequency.value=.075,l.gain.value=.045,o.connect(l),l.connect(a.gain),o.start()}catch{this.context=null}}setVolume(t){this.volume=t,this.master&&this.master.gain.setTargetAtTime(this.enabled?t:0,this.context.currentTime,.1)}toggle(){return this.enabled=!this.enabled,this.setVolume(this.volume),this.enabled}tone(t,e=.15,i="sine",n=.13,r=0){if(!this.context||!this.enabled)return;const a=this.context.currentTime+r,o=this.context.createOscillator(),l=this.context.createGain();o.type=i,o.frequency.value=t,l.gain.setValueAtTime(0,a),l.gain.linearRampToValueAtTime(n,a+.01),l.gain.exponentialRampToValueAtTime(1e-4,a+e),o.connect(l),l.connect(this.master),o.start(a),o.stop(a+e+.01)}play(t){this.context&&(t==="collect"||t==="craft"?(this.tone(523,.24,"sine",.1),this.tone(783,.3,"sine",.07,.08)):t==="build"?(this.tone(165,.15,"triangle",.25),this.tone(110,.12,"triangle",.16,.08)):t==="hook"?(this.tone(420,.12,"triangle",.055),this.tone(290,.19,"sine",.07,.06)):t==="damage"?this.tone(75,.23,"sawtooth",.15):t==="click"?this.tone(620,.05,"sine",.025):t==="discover"?[392,523,659,784].forEach((e,i)=>this.tone(e,.7,"sine",.06,i*.13)):t==="splash"?(this.tone(180,.2,"sine",.08),this.tone(95,.3,"triangle",.05,.04)):t==="warning"?(this.tone(196,.4,"triangle",.1),this.tone(185,.5,"triangle",.08,.4)):t==="rescue"&&[523,659,784,1047].forEach((e,i)=>this.tone(e,1.2,"sine",.08,i*.18)))}}const Lc={hook:'<path d="M17 3v12a5 5 0 0 1-10 0v-3l4 3"/><path d="M14 3h6M17 6h2"/>',hammer:'<path d="m6 20 8-11m-5-2 4-4 7 5-4 5-7-6Z"/><path d="m4 19 3 2 2-3"/>',spear:'<path d="m4 21 12-14m-2 1 3-6 4 1-1 4-6 3"/><path d="m11 11 2 2"/>',fish:'<path d="M5 12c4-8 12-8 15 0-3 8-11 8-15 0Z"/><path d="m5 12-4-4v8l4-4Zm8-5v10"/><circle cx="16" cy="11" r=".8" fill="currentColor"/>',cookedFish:'<path d="M5 14c4-6 10-6 14 0-4 6-10 6-14 0Z"/><path d="m5 14-4-3v6l4-3Zm6-3-2 5m6-5-2 5M8 3c-2 2 2 3 0 5m5-6c-2 2 2 3 0 5m5-4c-2 2 2 3 0 5"/>',water:'<path d="M12 3S5 11 5 15a7 7 0 0 0 14 0c0-4-7-12-7-12Z"/><path d="M8 15a4 4 0 0 0 4 4"/>',fishing:'<path d="M5 22 13 3c1-2 3-2 4 0l2 4v8a3 3 0 0 1-6 0v-2"/><path d="m5 17 4 2m1-13 4 2"/>',paddle:'<path d="m14 10 7-8M13 9l3 3-5 8-5 2-3-3 1-5 9-5Z"/><path d="m7 15 3 3"/>',wood:'<path d="m3 9 12-6 7 5v9l-13 5-6-5V9Z"/><path d="m3 9 6 6 13-7M9 15v7m4-10 6-3m-5 8 5-2"/>',plastic:'<path d="M9 2h6v4l2 3v12H7V9l2-3V2Z"/><path d="M9 5h6m-8 7h10M7 17h10"/>',leaf:'<path d="M20 3C8 1 1 9 5 17c8 5 16-2 15-14Z"/><path d="M3 22 17 7m-7 7V9m3 2h5m-9 5h5"/>',scrap:'<path d="m7 3 14 4-3 14L3 16 7 3Z"/><path d="m7 3 4 7 10-3m-10 3-2 9m2-9 7 11M5 9l5 1"/>',rope:'<path d="M7 18C-2 5 18-2 21 8c3 10-13 16-17 7C1 8 15 3 17 9c2 7-8 11-10 6-2-4 6-7 7-3 1 2-2 4-3 2"/><path d="m7 18-3 4m3-1-2-1"/>',vine:'<path d="M11 22c-5-9 9-13 3-21M12 16C4 16 4 9 4 9c7-1 9 4 8 7Zm3-9c2-6 7-5 7-5 0 6-4 8-7 5Z"/>',ore:'<path d="m3 16 4-10 8-3 6 9-4 9H7l-4-5Z"/><path d="m7 6 4 7 10-1m-10 1-4 8m4-8 6 8"/>',signal:'<path d="M5 13h14v8H5v-8Zm3 0 3-9m1 13h4M4 4a11 11 0 0 1 16 0M7 7a7 7 0 0 1 10 0m-7 3a3 3 0 0 1 4 0"/>',coconut:'<circle cx="12" cy="13" r="9"/><path d="m5 18 5-5L8 5m2 8 10-3"/><circle cx="14" cy="8" r=".6"/><circle cx="17" cy="8" r=".6"/>',foundation:'<path d="m2 9 10-6 10 6v7l-10 6-10-6V9Z"/><path d="m2 9 10 6 10-6m-10 6v7M6 7l10 6M10 5l10 6"/>',floor:'<path d="m2 11 10-6 10 6-10 7-10-7Zm0 4 10 7 10-7M6 9l10 7m-6-9 10 7"/>',wall:'<path d="M4 3h16v18H4V3Zm5 0v18m6-18v18M4 8h16M4 16h16"/>',stairs:'<path d="M3 21v-5h6v-5h6V6h6v15H3Z"/><path d="m3 16 6 5m0-10 6 6m0-11 6 6"/>',workbench:'<path d="M2 8h20v4H2V8Zm3 4v10m14-10v10M4 18h16M8 8V3h8v5m-5-5v5"/>',purifier:'<path d="M4 10h16l-2 11H6L4 10Zm2-3h12l-6-5-6 5Zm6 6v5m-3-2h6"/>',grill:'<path d="M3 12h18a9 9 0 0 1-18 0ZM7 20l-2 3m12-3 2 3M6 4c-2 3 2 3 0 6m6-8c-2 3 2 3 0 6m6-4c-2 3 2 3 0 6"/>',net:'<path d="M3 4h18v16H3V4Zm0 5h18M3 14h18M9 4v16m6-16v16m-12-2 4 2m14-2-4 2"/>',sail:'<path d="M12 2v20M10 4 3 16h7V4Zm4 0v12h8L14 4ZM2 20c5 3 15 3 20-1"/>',beacon:'<path d="m9 21 3-16 3 16M7 21h10M9 15h6M4 4a11 11 0 0 1 16 0M7 7a7 7 0 0 1 10 0m-7 3a3 3 0 0 1 4 0"/>',health:'<path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6V3Z"/>',hunger:'<path d="M13 4c4-3 9 2 6 6l-6 6-6-6 6-6Zm-5 9-5 5m0 0a2 2 0 1 0 2 2m-2-2a2 2 0 1 1-2-2"/>',sun:'<circle cx="12" cy="12" r="4"/><path d="M12 1v3m0 16v3M1 12h3m16 0h3M4 4l2 2m12 12 2 2M4 20l2-2M18 6l2-2"/>',moon:'<path d="M20 15A9 9 0 0 1 9 3a9 9 0 1 0 11 12Z"/>',rain:'<path d="M5 14a5 5 0 1 1 2-9 6 6 0 0 1 11 2 4 4 0 1 1 1 8M7 17l-2 4m8-4-2 4m8-4-2 4"/>',fog:'<path d="M4 8a4 4 0 0 1 4-5 6 6 0 0 1 10 3 3 3 0 0 1 2 5M2 12h15M6 16h16M2 20h14"/>',storm:'<path d="M5 14a5 5 0 1 1 2-9 6 6 0 0 1 11 2 4 4 0 1 1 1 8m-7-4-5 7h5l-2 6 7-9h-5l2-4"/>',wind:'<path d="M2 8h13a3 3 0 1 0-3-3M2 12h17a3 3 0 1 1-3 3M2 16h7a3 3 0 1 1-3 3"/>',compass:'<circle cx="12" cy="12" r="10"/><path d="m16 8-3 5-5 3 3-5 5-3Z"/>',island:'<path d="M2 21c6-4 14-4 20 0M12 18 15 7M8 7c2-5 5-5 7 0-5-1-7 0-9 3m9-3c1-5 5-5 8-2-5-1-6 0-8 2m0 0c5-1 7 1 7 5-3-3-5-4-7-5"/>',backpack:'<path d="M8 7V5a4 4 0 0 1 8 0v2M5 7h14l2 14H3L5 7Zm2 7h10v5H7v-5Zm1-7v4m8-4v4"/>',book:'<path d="M12 5C8 2 4 2 2 3v16c4-2 7-1 10 2 3-3 6-4 10-2V3c-2-1-6-1-10 2v16ZM5 7h4m-4 4h4m6-4h4m-4 4h4"/>',map:'<path d="m2 5 6-3 8 3 6-3v17l-6 3-8-3-6 3V5Zm6-3v17m8-14v17"/>',settings:'<path d="m10 2 4 0 1 3 3 1 3 0 1 4-3 2 0 3 1 3-3 3-3-1-3 0-2 2-4-2v-3l-2-2H2v-4l3-1 1-3-1-2 3-3 2 1Z"/><circle cx="12" cy="12" r="3"/>',sound:'<path d="m3 9 5 0 6-5v16l-6-5H3V9Zm14-2a7 7 0 0 1 0 10m3-13a11 11 0 0 1 0 16"/>',mute:'<path d="m3 9 5 0 6-5v16l-6-5H3V9Zm14 0 5 6m0-6-5 6"/>',pause:'<path d="M6 4h4v16H6V4Zm8 0h4v16h-4V4Z"/>',play:'<path d="m7 3 15 9-15 9V3Z"/>',close:'<path d="m6 6 12 12M18 6 6 18"/>',arrow:'<path d="M3 12h18m-6-6 6 6-6 6"/>',check:'<path d="m5 12 4 4L20 5"/>',plus:'<path d="M12 5v14M5 12h14"/>',lock:'<path d="M7 10V7a5 5 0 0 1 10 0v3M5 10h14v12H5V10Zm7 4v4"/>',flag:'<path d="M4 23V2m0 1c7-4 9 5 17 1v11c-8 4-10-5-17-1"/>',save:'<path d="M4 3h13l4 4v14H3V3h1Zm3 0v7h10V3M7 21v-7h10v7"/>',fullscreen:'<path d="M3 9V3h6m6 0h6v6M3 15v6h6m6 0h6v-6"/>',anchor:'<circle cx="12" cy="5" r="3"/><path d="M12 8v14M7 11h10M3 14v4c4 5 14 5 18 0v-4m-21 0 3-2 3 2m12 0 3-2 3 2"/>',info:'<circle cx="12" cy="12" r="10"/><path d="M12 10v7m0-11v1"/>',lightning:'<path d="m13 2-9 12h7l-1 8 10-13h-7l1-7Z"/>',heart:'<path d="M12 21 3 12c-6-8 5-14 9-7 4-7 15-1 9 7l-9 9Z"/>',research:'<path d="M8 2h8M10 2v7L3 20c-1 2 19 2 18 0L14 9V2M7 14h10m-7 3h1m4 2h1"/>',eye:'<path d="M1 12C7 2 17 2 23 12 17 22 7 22 1 12Z"/><circle cx="12" cy="12" r="3"/>',repair:'<path d="M21 3a6 6 0 0 1-8 8L5 21l-3-3 9-9a6 6 0 0 1 8-8l-4 4 4 2 2-4Z"/>',chevron:'<path d="m9 5 7 7-7 7"/>'};function at(s,t="",e=24){return`<svg class="icon ${t}" width="${e}" height="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.55" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${Lc[s]||Lc.wood}</svg>`}function Uc(){return'<svg viewBox="0 0 44 44" width="44" height="44" fill="none" aria-hidden="true"><path d="m22 3 17 9v20L22 42 5 32V12L22 3Z" stroke="currentColor" stroke-width="1.2"/><path d="M22 9v20m-6-13h12M11 26c4 6 18 6 22 0m-22 0 1 7m21-7-1 7M18 34h8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><circle cx="22" cy="12" r="2.5" fill="var(--cream)" stroke="currentColor"/></svg>'}const Ie=s=>String(s).replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),Xt=(s,t,e="button",i="")=>`<button class="${e}" data-action="${t}" ${i}>${s}</button>`,Ft=s=>`<kbd>${s}</kbd>`;class wv{constructor(t){this.game=t,this.modal=null,this.inventoryTab="crafting",this.category="all",this.recipeId="rope",this.selectedItem="wood",this.savedAt=0,this.lastQuest="",this.previousStats={},this.build(),this.bind()}build(){const t=document.getElementById("hud");t.innerHTML=`
      <div class="screen-vignette"></div><div class="grain"></div>
      <header class="game-header">
        <a class="wordmark" href="#" aria-label="Tidebound Gold field guide" data-action="help"><span class="brand-mark">${Uc()}</span><span><strong><span class="brand-owner">TOSIN’S</span>TIDEBOUND<span class="brand-period">.</span><span class="gold-edition">GOLD</span></strong><small>A LIFE BETWEEN THE WAVES</small></span></a>
        <div class="compass-hud"><div class="voyage-time"><span id="day-label">DAY 01</span><i></i><span id="clock-label">09:43</span><i></i><span id="weather-label">CLEAR SKIES</span></div><div class="compass-wrap"><span class="compass-caret">▾</span><div id="compass-scale"></div></div><div id="heading-label" class="heading-label">327° NW</div></div>
        <nav class="header-tools" aria-label="Game menu">${Xt(at("book"),"help","tool-button",'title="Field guide (?)" aria-label="Open field guide"')}${Xt(at("sound"),"sound","tool-button",'id="sound-button" title="Toggle ambient audio" aria-label="Toggle ambient audio"')}${Xt(at("fullscreen"),"fullscreen","tool-button desktop-tool",'title="Fullscreen" aria-label="Toggle fullscreen"')}<span class="tool-divider"></span>${Xt(at("pause"),"pause","tool-button pause-button",'title="Pause (Esc)" aria-label="Pause game"')}</nav>
      </header>
      <section class="vitals-panel" aria-label="Survival statistics"><div class="panel-eyebrow">THE IMPORTANT THINGS <span class="tiny-plus">+</span></div>
      ${[["health","health","Health"],["hunger","hunger","Hunger"],["thirst","water","Thirst"]].map(([e,i,n])=>`<div class="vital ${e}"><span class="vital-icon">${at(i)}</span><div class="vital-body"><div class="vital-label"><span>${n}</span><strong id="${e}-value">100<em>/100</em></strong></div><div class="vital-track" role="progressbar" aria-label="${n}" aria-valuemin="0" aria-valuemax="100" id="${e}-bar"><span></span></div></div></div>`).join("")}
        <div class="vitals-status"><span class="status-dot"></span><span id="vitals-status">A GOOD DAY TO BE ALIVE</span></div>
      </section>
      <div class="resources-panel"><div class="panel-eyebrow">POCKETS OF POSSIBILITY</div><div id="resource-counts"></div></div>
      <aside class="navigation-panel"><button class="radar-button" data-action="map" aria-label="Open ocean chart" title="Ocean chart (M)"><canvas id="radar" width="280" height="280"></canvas><span class="radar-corner tl"></span><span class="radar-corner tr"></span><span class="radar-corner bl"></span><span class="radar-corner br"></span><span class="radar-map-label">${at("map","",12)} OCEAN CHART ${Ft("M")}</span></button><div class="wind-readout">${at("wind","",17)}<span>ENE <strong id="wind-speed">6.4</strong><small>KN</small></span><span id="wind-arrow">↙</span></div></aside>
      <aside id="quest-panel" class="quest-panel"></aside>
      <div id="discovery-banner" class="discovery-banner" aria-live="polite"></div>
      <div id="threat-banner" class="threat-banner hidden"></div>
      <section id="welcome-card" class="welcome-card"><div class="panel-eyebrow"><span class="little-line"></span> A NEW HORIZON</div><h1>Make yourself<br><em>at sea.</em></h1><p>A little raft. An endless ocean.<br>And a whole new way to call somewhere home.</p>${Xt("Begin your voyage "+at("arrow","",19),"begin","button primary begin-button")}<button class="text-button guide-link" data-action="help">First time adrift? <span>Read the field guide ${at("chevron","",12)}</span></button><div class="welcome-coordinate">EST. 00° 00′ N &nbsp; / &nbsp; SOMEWHERE IN THE BLUE</div></section>
      <div id="movement-hints" class="movement-hints hidden"><div><span class="wasd">${Ft("W")}<br>${Ft("A")}${Ft("S")}${Ft("D")}</span><span>Make your way<br><small>SPACE to jump · SHIFT to run</small></span></div><div class="hint-divider"></div><p>Drag right mouse to look around<br><span>${Ft("G")} take the helm &nbsp; ${Ft("M")} chart a course</span></p></div>
      <div id="interaction-prompt" class="interaction-prompt hidden"></div><div id="action-prompt" class="action-prompt"></div><div id="charge-meter" class="charge-meter hidden"><span></span><small>CAST STRENGTH</small></div>
      <div id="build-bar" class="build-bar hidden"></div><div id="dismantle-hint" class="dismantle-hint hidden"></div>
      <div class="quickbar-dock"><div id="equipped-label" class="equipped-label">SALVAGE HOOK <span>01 / 08</span></div><div id="quickbar" class="quickbar" role="toolbar" aria-label="Quick access inventory"></div><div class="quickbar-hint">SCROLL TO SWITCH <span>·</span> ${Ft("Q")} ${Ft("E")} <span>·</span> A LITTLE OF EVERYTHING</div></div>
      <div class="bottom-right"><button class="inventory-shortcut" data-action="inventory">${at("backpack","",22)}<span>BACKPACK <small>& CRAFTING</small></span>${Ft("TAB")}</button><div class="ocean-label"><span class="status-dot"></span><span id="ocean-label">OPEN WATER</span><span>24°C</span></div></div>
      <div class="bottom-left"><span class="ocean-mark">≈</span><span id="location-label">THE OPEN OCEAN</span><span id="save-label">SAVED ON THIS DEVICE</span></div>
      <div id="craft-indicator" class="craft-indicator hidden"></div><div id="toasts" class="toasts" aria-live="polite"></div><div id="damage-overlay" class="damage-overlay"></div>
      <div class="mobile-controls"><div id="joystick" class="joystick"><span></span></div><div class="mobile-actions">${Xt("↑","jump","touch-action",'aria-label="Jump"')}${Xt(at("hook"),"use","touch-action main-touch",'aria-label="Use equipped item"')}${Xt("F","interact","touch-action",'aria-label="Interact"')}</div></div>
    `,document.getElementById("modal-root").innerHTML='<div id="modal-overlay" class="modal-overlay hidden"><section id="modal-panel" class="modal-panel" role="dialog" aria-modal="true" aria-label="Game menu"></section></div>',this.dom={},["health","hunger","thirst"].forEach(e=>{this.dom[e+"Value"]=document.getElementById(e+"-value"),this.dom[e+"Bar"]=document.getElementById(e+"-bar")}),this.radar=document.getElementById("radar"),this.radarCtx=this.radar.getContext("2d"),this.renderQuickbar(),this.updateResources(),this.renderQuests(),this.game.saved&&(document.querySelector(".welcome-card h1").innerHTML="The sea<br><em>remembers.</em>",document.querySelector(".welcome-card p").innerHTML="Your little home is right where you left it.<br>There’s still a whole horizon out there.",document.querySelector(".begin-button").innerHTML="Continue your voyage "+at("arrow","",19))}bind(){document.addEventListener("click",a=>{const o=a.target.closest("[data-action]");o&&(a.preventDefault(),this.handleAction(o.dataset.action,o))}),document.getElementById("modal-overlay").addEventListener("click",a=>{a.target.id==="modal-overlay"&&this.modal!=="death"&&this.closeModal()}),document.addEventListener("change",a=>{const o=a.target.dataset.setting;o&&this.changeSetting(o,a.target.type==="checkbox"?a.target.checked:a.target.value)}),document.addEventListener("input",a=>{a.target.dataset.setting==="volume"&&this.changeSetting("volume",a.target.value)});const t=document.getElementById("joystick"),e=t.querySelector("span");let i=null;const n=a=>{if(i!==a.pointerId)return;const o=t.getBoundingClientRect(),l=ve((a.clientX-o.left-o.width/2)/35,-1,1),h=ve((a.clientY-o.top-o.height/2)/35,-1,1);this.game.touchMove={x:l,y:h},e.style.transform=`translate(${l*25}px,${h*25}px)`};t.addEventListener("pointerdown",a=>{i=a.pointerId,t.setPointerCapture(i),this.game.start(),n(a)}),t.addEventListener("pointermove",n);const r=()=>{i=null,this.game.touchMove={x:0,y:0},e.style.transform="translate(0,0)"};t.addEventListener("pointerup",r),t.addEventListener("pointercancel",r),this.resetTouch=r}handleAction(t,e){const i=this.game;if(i.audio.init(),i.audio.play("click"),t.startsWith("slot:"))return i.selectSlot(+t.split(":")[1]);if(t.startsWith("build:"))return i.chooseBuild(t.split(":")[1]);if(t.startsWith("category:")){this.category=t.split(":")[1];const n=Xi.find(r=>r.category===this.category);return n&&(this.recipeId=n.id),this.renderInventory()}if(t.startsWith("recipe:"))return this.recipeId=t.split(":")[1],this.renderInventory();if(t.startsWith("tab:"))return this.inventoryTab=t.split(":")[1],this.renderInventory();if(t.startsWith("item:"))return this.selectedItem=t.split(":")[1],this.renderInventory();if(t.startsWith("research:")){const n=t.split(":")[1];if(!_n[n])return;if(!i.hasStation()){this.toast("Stand within four meters of a workbench","workbench","warning");return}if(!i.crafting.researchItem(n)){const r=_n[n].requires.filter(a=>!i.crafting.research.has(a));this.toast(i.crafting.research.has(n)?"This discovery is already in your notebook":r.length?`Study ${r.map(a=>wt[a].name).join(", ")} first`:`Find ${wt[n].name.toLowerCase()} on an island first`,"research","warning")}return}if(t.startsWith("cancel-station:")){i.cancelStationJob(+t.split(":")[1]),this.renderInventory();return}if(t.startsWith("course:")){const n=i.world.islands.find(r=>r.id===t.slice(7));if(!i.player.onRaft){this.toast("Return to your raft before setting sail","sail","warning");return}n&&i.setCourse(n);return}if(t.startsWith("note:")){const n=i.notebook[+t.slice(5)];return this.showLore(n,n.island)}switch(t){case"begin":i.start();break;case"close":case"resume":this.closeModal();break;case"pause":case"help":case"inventory":case"map":case"journal":case"settings":this.openModal(t);break;case"sound":i.audio.toggle(),document.getElementById("sound-button").innerHTML=at(i.audio.enabled?"sound":"mute"),this.toast(i.audio.enabled?"Ocean ambience on":"Ocean ambience muted",i.audio.enabled?"sound":"mute");break;case"fullscreen":document.fullscreenElement?document.exitFullscreen?.():document.documentElement.requestFullscreen?.().catch(()=>this.toast("Fullscreen is not allowed in this preview. Open the game in a new tab.","fullscreen"));break;case"craft":{const n=Xi.find(a=>a.id===this.recipeId);if(n.block){i.chooseBuild(n.block),i.start();break}const r=i.beginCraft(n);r.ok?(i.start(),this.closeModal(),this.toast(`Making ${n.name.toLowerCase()} · ${n.seconds}s`,"workbench")):this.toast(r.reason,"info","warning");break}case"cancel-craft":i.crafting.cancel(),this.renderInventory(),this.toast("Crafting cancelled · materials returned","backpack");break;case"equip":{const n=this.selectedItem,r=i.quickbar.indexOf(n);r>=0?i.selectSlot(r):(i.quickbar[7]=n,i.selectSlot(7)),this.closeModal(),i.start(),this.toast(`${wt[n].name} equipped`,wt[n].icon);break}case"consume":i.stats.consume(this.selectedItem,i.inventory)&&(this.toast(`${wt[this.selectedItem].name} consumed`,wt[this.selectedItem].icon,"success"),this.renderInventory());break;case"performance":i.monitor.toggle();break;case"confirm-import":i.commitImport();break;case"restore-backup":i.restoreBackup();break;case"save":i.save(!0);break;case"export":i.exportSave();break;case"import":{const n=document.createElement("input");n.type="file",n.accept=".json,application/json",n.onchange=()=>{n.files[0]&&i.importSave(n.files[0])},n.click();break}case"new":this.openModal("confirm-new");break;case"confirm-new":i.newGame();break;case"revive":i.revive();break;case"anchor":i.anchored=!i.anchored,i.autopilot=null,i.anchored&&(i.helming=!1,i.raftVelocity.set(0,0,0)),this.toast(i.anchored?"Anchor dropped · a moment to breathe":"Anchor raised · onward","anchor"),this.renderMap();break;case"use":i.start(),i.equipped==="hook"&&i.hook.state==="idle"?(i.hook.charge=.8,i.castHook()):i.primaryAction();break;case"jump":i.start(),i.keys.add(" "),setTimeout(()=>i.keys.delete(" "),150);break;case"interact":i.start(),i.interact();break}}start(){document.getElementById("welcome-card").classList.add("departed"),document.getElementById("movement-hints").classList.toggle("hidden",!this.game.settings.showHints),document.body.classList.add("voyage-started"),setTimeout(()=>document.getElementById("welcome-card").classList.add("hidden"),450)}renderQuickbar(){document.getElementById("quickbar").innerHTML=this.game.quickbar.map((e,i)=>`<button class="quick-slot ${i===this.game.selectedSlot?"selected":""} ${e&&!this.game.inventory.count(e)?"empty-item":""}" data-action="slot:${i}" title="${e?wt[e]?.name:"Empty slot"} (${i+1})" aria-label="Slot ${i+1}: ${e?wt[e]?.name:"empty"}" aria-pressed="${i===this.game.selectedSlot}"><span class="slot-index">${i+1}</span>${e?`<span class="slot-icon item-${e}" style="--item-color:${wt[e]?.color}">${at(wt[e]?.icon||e,"",30)}</span>${wt[e]?.tool?"":`<span class="slot-count">${this.game.inventory.count(e)}</span>`}`:'<span class="empty-slot-mark">+</span>'}${i===this.game.selectedSlot?'<span class="slot-selected-dot"></span>':""}</button>`).join("");const t=this.game.equipped;document.getElementById("equipped-label").innerHTML=`${t?wt[t]?.name.toUpperCase():"EMPTY HANDS"} <span>0${this.game.selectedSlot+1} / 08</span>`}updateResources(){const t=document.getElementById("resource-counts");t&&(t.innerHTML=["wood","leaf","plastic","scrap"].map(e=>`<span title="${wt[e].name}">${at(wt[e].icon,"",19)}<b>${this.game.inventory.count(e)}</b></span>`).join(""))}renderBuildBar(){const t=this.game.equipped==="hammer";document.body.classList.toggle("is-building",t);const e=document.getElementById("build-bar");e.classList.toggle("hidden",!t),t&&(e.innerHTML=`<div class="build-label">BUILD<br><small>R TO ROTATE</small></div>${Object.entries(Nt).map(([i,n])=>`<button class="build-option ${this.game.buildType===i?"active":""} ${n.research&&!this.game.crafting.research.has(n.research)?"locked":""}" data-action="build:${i}" title="${n.name} · ${Object.entries(n.cost).map(([r,a])=>`${a} ${wt[r].name}`).join(", ")}" aria-label="Build ${n.name}">${at(n.icon,"",25)}<span>${n.name}</span></button>`).join("")}`)}quests(t=!1){return this.game.quests.entries(this.game.progress,this.game.crafting.research).filter(e=>t||!e.optional)}renderQuests(){const t=this.quests();let e=Ra.findIndex((o,l)=>t.some(h=>h.chapter===l&&h.current<h.target));e<0&&(e=Ra.length-1);const i=t.filter(o=>o.chapter===e),n=i.filter(o=>o.current>=o.target).length,r=JSON.stringify(t.map(o=>[o.current,o.claimed]));if(r===this.lastQuest)return;this.lastQuest=r;const a=Ra[e];document.getElementById("quest-panel").innerHTML=`<div class="quest-topline"><span class="chapter-number">0${e+1}</span><span class="panel-eyebrow">YOUR ${e===0?"FIRST ":""}CHAPTER</span>${Xt(at("book","",17),"journal","quest-journal",'title="Open your journal (J)" aria-label="Open journal"')}</div><h2>${a.title}</h2><p>${a.description}</p><div class="quest-list">${i.map(o=>`<div class="quest-line ${o.current>=o.target?"done":""}" title="${Ie(o.tip)}"><span class="quest-check">${o.current>=o.target?at("check","",12):""}</span><span>${o.title}</span><small>${Math.min(o.current,o.target)}<em>/${o.target}</em></small></div>`).join("")}</div><div class="quest-progress"><span style="width:${n/i.length*100}%"></span></div><button class="quest-footer" data-action="journal">ONE STEP AT A TIME ${at("arrow","",14)}</button>`}update(t=!1){const e=this.game;for(const v of["health","hunger","thirst"]){const m=Math.max(0,Math.ceil(e.stats[v]));this.dom[v+"Value"].innerHTML=`${m}<em>/100</em>`,this.dom[v+"Bar"].firstElementChild.style.width=m+"%",this.dom[v+"Bar"].setAttribute("aria-valuenow",m),this.dom[v+"Bar"].closest(".vital").classList.toggle("critical",m<20)}document.getElementById("day-label").textContent=`DAY ${String(e.time.day).padStart(2,"0")}`,document.getElementById("clock-label").textContent=e.time.clock,document.getElementById("weather-label").textContent=si[e.time.weather].label.toUpperCase(),document.getElementById("wind-speed").textContent=si[e.time.weather].wind.toFixed(1);const i=e.stats.stung>0?"STUNG · MOVEMENT REDUCED":e.stats.thirst<20?"FIND FRESH WATER SOON":e.stats.hunger<20?"A MEAL WOULD DO YOU GOOD":e.stats.health<35?"TAKE CARE OF YOURSELF":"A GOOD DAY TO BE ALIVE";document.getElementById("vitals-status").textContent=i;const n=(360-e.cameraYaw*180/Math.PI%360)%360;document.getElementById("heading-label").textContent=`${Math.round(n)}° ${["N","NE","E","SE","S","SW","W","NW"][Math.round(n/45)%8]}`;let r="";for(let v=-5;v<=5;v++){const m=(Math.round(n/15)+v)*15,f=(m%360+360)%360,y=(m-n)*2.3,_=f%90===0?["N","E","S","W"][f/90]:f%30===0?f:"";r+=`<span class="compass-tick ${f%90===0?"major":""}" style="left:calc(50% + ${y}px)"><i></i>${_}</span>`}document.getElementById("compass-scale").innerHTML=r;const a=this.context(),o=document.getElementById("interaction-prompt");o.innerHTML=a?`${Ft("F")} ${a}`:"",o.classList.toggle("hidden",!a||!e.started||e.paused);let l="";if(e.helming)l=`${at("sail","",17)} AT THE HELM <span>${Ft("W")}${Ft("A")}${Ft("S")}${Ft("D")} steer · ${Ft("G")} let go</span>`;else if(e.autopilot)l=`${at("compass","",17)} SAILING TO ${Ie(e.autopilot.name.toUpperCase())} <span>${Math.round(Math.hypot(e.autopilot.x-e.raft.position.x,e.autopilot.z-e.raft.position.z))}m · ${Ft("G")} manual steering</span>`;else if(e.equipped==="hammer"){const v=Nt[e.buildType];l=`${at("hammer","",17)} ${v.name.toUpperCase()} <span>${e.ghostReason||"Point at an edge to build"} · ${Ft("R")} rotate</span>`}else e.equipped==="hook"?l=e.hook.state==="idle"||e.hook.state==="charging"?'<span class="mouse-outline"></span> HOLD TO CAST <span>release to throw · click to reel in</span>':`${at("hook","",17)} ${e.hook.caught?"SALVAGE ON THE LINE":"HOOK IN THE WATER"} <span>click to reel in</span>`:e.equipped==="fishingRod"?l=`${at("fishing","",17)} ${e.fishing.state==="bite"?"A BITE! CLICK NOW":e.fishing.state==="waiting"?"WAIT FOR A BITE":"CAST A LINE"} <span>${e.fishing.state==="waiting"?"patience is a fine fishing companion":"click to fish"}</span>`:e.equipped==="paddle"?l=`${at("paddle","",17)} A LITTLE DIRECTION <span>click the ocean to paddle · ${Ft("G")} take the helm</span>`:wt[e.equipped]?.consumable?l=`${at(wt[e.equipped].icon,"",17)} ${wt[e.equipped].name.toUpperCase()} <span>click to consume · ${wt[e.equipped].description.split(".")[0]}</span>`:e.equipped==="spear"&&(l=`${at("spear","",17)} READY WHEN YOU ARE <span>click to thrust · strike a charging shark to repel it</span>`);document.getElementById("action-prompt").innerHTML=l,document.getElementById("action-prompt").classList.toggle("hidden",!e.started||e.paused);const h=document.getElementById("charge-meter");h.classList.toggle("hidden",e.hook.state!=="charging"),h.firstElementChild.style.width=e.hook.charge*100+"%";const c=document.getElementById("threat-banner");c.classList.toggle("hidden",!e.started||!["targeting","attacking"].includes(e.shark.state));const u=e.shark.target;c.innerHTML=at("spear","",16)+(e.shark.state==="attacking"?"SHARK CHARGING · STRIKE TO INTERRUPT":`SHARK LINING UP · ${Math.max(0,Math.ceil(5-e.shark.timer))}s TO CHARGE`)+(u?` · FOUNDATION ${u.x}, ${u.z} · ${Math.ceil(u.hp)} HP`:"");const d=document.getElementById("dismantle-hint"),p=e.dismantleTarget;if(d.classList.toggle("hidden",!p||e.paused||!e.started),p){const v=e.removalStatus(p),m=e.dismantle?Math.min(100,(performance.now()-e.dismantle.start)/e.dismantle.duration*100):0;d.innerHTML=`${Ft("X")} ${p.core?"CORE FOUNDATION · PROTECTED":`${e.dismantle?"KEEP HOLDING":"HOLD"} TO DISMANTLE · ${Ie(v.reason)}`}<i style="width:${m}%"></i>`}const g=document.getElementById("craft-indicator");if(g.classList.toggle("hidden",!e.crafting.job),e.crafting.job){const v=e.crafting.job;g.innerHTML=`${at("workbench","",18)}<span>Making ${Ie(v.recipe.name)}<small>${Math.ceil(v.recipe.seconds-v.elapsed)}s remaining</small></span><i style="--progress:${v.elapsed/v.recipe.seconds*100}%"></i>`}document.getElementById("ocean-label").textContent=e.player.swimming?"TAKE A LITTLE SWIM":e.anchored?"AT ANCHOR":e.helming?"UNDER YOUR COMMAND":si[e.time.weather].label.toUpperCase(),document.getElementById("location-label").textContent=e.world.groundAt(e.player.position.x,e.player.position.z)?.island.name.toUpperCase()||"THE OPEN OCEAN",document.getElementById("save-label").textContent=performance.now()-this.savedAt<3500&&this.savedAt?"VOYAGE SAVED ✓":e.settings.relaxed?"CALM SEAS MODE":e.storageAvailable?e.savingBlocked?"LOCAL SAVE PROTECTED":"AUTOSAVES ON THIS DEVICE":"EXPORT TO KEEP YOUR VOYAGE",this.renderQuests(),this.drawRadar(),this.modal==="map"&&this.drawMap()}context(){const t=this.game,e=t.world.nearestResource(t.player.position);if(e)return Ie(e.name)+" <small>· "+Ie(e.action||"gather")+"</small>";if(t.nearFire())return"Extinguish fire <small>· 1 fresh water</small>";const n=t.nearStation();if(!n)return null;if(t.crafting.job?.stationKey===`${n.x},${n.y},${n.z}`)return"Making "+Ie(t.crafting.job.recipe.name)+" <small>· work in progress</small>";if(t.jobs.some(r=>r.blockId===n.id)){const r=t.jobs.find(a=>a.blockId===n.id);return`${n.type==="purifier"?"Purifying":"Grilling"} <small>· ${Math.ceil(r.recipe.seconds-r.time)}s</small>`}return{workbench:"Open your workbench",sail:t.sailOpen?"Furl the sail":"Unfurl the sail",purifier:["rain","storm"].includes(t.time.weather)?"Collect rainwater <small>· no fuel needed</small>":"Purify seawater <small>· 1 driftwood</small>",grill:"Grill a fish <small>· 1 raw fish + 1 driftwood</small>",rainCollector:"Rain collector <small>· automatic during rain · 35s / water</small>",windcatcher:"Take the helm <small>· 20% sailing bonus</small>",beacon:"Send your signal home"}[n.type]}drawRadar(){const t=this.radarCtx,e=this.game,i=280,n=140,r=124;t.clearRect(0,0,i,i),t.save(),t.beginPath(),t.arc(n,n,r,0,Math.PI*2),t.clip();const a=t.createRadialGradient(n,n,0,n,n,r);a.addColorStop(0,"#28555b"),a.addColorStop(1,"#193e46"),t.fillStyle=a,t.fillRect(0,0,i,i),t.strokeStyle="#d8e5cf20",t.lineWidth=1;for(const l of[40,80,120])t.beginPath(),t.arc(n,n,l,0,Math.PI*2),t.stroke();t.beginPath(),t.moveTo(n,0),t.lineTo(n,280),t.moveTo(0,n),t.lineTo(280,n),t.stroke();const o=1.35;for(const l of e.world.islands){const h=n+(l.x-e.raft.position.x)*o,c=n+(l.z-e.raft.position.z)*o;Math.hypot(h-n,c-n)>r+15||(t.fillStyle="#a2b996",t.beginPath(),t.ellipse(h,c,l.radius*o,l.radius*o*.7,-.3,0,Math.PI*2),t.fill(),t.strokeStyle="#d5d2a666",t.lineWidth=2,t.stroke(),t.fillStyle="#e1c175",t.beginPath(),t.arc(h,c,3,0,Math.PI*2),t.fill())}t.fillStyle="#b8c4af80";for(const l of e.debris.active){const h=n+(l.x-e.raft.position.x)*o,c=n+(l.z-e.raft.position.z)*o;t.fillRect(h,c,2,2)}e.autopilot&&(t.strokeStyle="#dfba75",t.setLineDash([3,5]),t.beginPath(),t.moveTo(n,n),t.lineTo(n+(e.autopilot.x-e.raft.position.x)*o,n+(e.autopilot.z-e.raft.position.z)*o),t.stroke(),t.setLineDash([])),t.save(),t.translate(n,n),t.rotate(Math.PI-e.player.heading),t.fillStyle="#f0e9ce",t.beginPath(),t.moveTo(0,-9),t.lineTo(6,7),t.lineTo(0,4),t.lineTo(-6,7),t.closePath(),t.fill(),t.restore(),t.restore(),t.strokeStyle="#eee6c675",t.lineWidth=1.5,t.beginPath(),t.arc(n,n,r,0,Math.PI*2),t.stroke(),t.fillStyle="#e4c67d",t.font="500 16px Outfit",t.textAlign="center",t.fillText("N",n,37),t.fillStyle="#a8bdb4",t.font="12px Outfit",t.fillText("S",n,259),t.fillText("W",24,n+4),t.fillText("E",257,n+4)}openModal(t){if(this.game.contextLost&&t!=="context-lost")return;this.previousFocus=document.activeElement,this.modal=t,this.game.setPaused(!0),document.getElementById("modal-overlay").classList.remove("hidden"),document.body.classList.add("menu-open");const e=document.getElementById("modal-panel");e.className="modal-panel "+(["pause","death","victory","confirm-new","confirm-import","context-lost","lore"].includes(t)?"compact-modal":""),t==="inventory"?this.renderInventory():t==="map"?this.renderMap():t==="help"?this.renderHelp():t==="journal"?this.renderJournal():t==="settings"?this.renderSettings():t==="pause"?this.renderPause():t==="context-lost"?e.innerHTML=`${this.modalHeading("The graphics took a breath.","VOYAGE SAFELY PAUSED")}<div class="simple-content"><p>Your graphics context was lost. The game is paused and a save was attempted. Waiting for the browser to restore it… If it does not recover, reload after exporting a backup.</p>${Xt(at("save")+" Export voyage","export","button secondary full-width")}</div>`:t==="confirm-new"&&(e.innerHTML=`${this.modalHeading("A fresh horizon","START A NEW VOYAGE")}<div class="simple-content"><p>Your current local voyage will be replaced. Export a save first if you’d like to come back.</p>${Xt(at("save")+" Export current voyage","export","button secondary full-width")}${Xt("Start a new voyage "+at("arrow"),"confirm-new","button primary full-width")}${Xt("Not just yet","pause","text-button full-width")}</div>`),requestAnimationFrame(()=>e.querySelector("button")?.focus({preventScroll:!0}))}closeModal(){if(this.game.contextLost){this.toast("Waiting for the graphics context to recover","info","warning");return}if(this.modal==="confirm-import"&&(this.game.pendingImport=null),!this.game.stats.alive){this.modal!=="death"&&this.death();return}this.modal=null,document.getElementById("modal-overlay").classList.add("hidden"),document.body.classList.remove("menu-open"),this.game.setPaused(!1)}modalHeading(t,e,i=""){return`<header class="modal-header"><div><span class="panel-eyebrow">${e}</span><h2>${t}</h2></div><div class="modal-header-right">${i}${Xt(at("close"),"close","close-button",'aria-label="Close menu" title="Close (Esc)"')}</div></header>`}renderInventory(){if(this.modal!=="inventory")return;const t=this.game;document.getElementById("modal-panel").innerHTML=`${this.modalHeading("Good things, made by hand.","YOUR FLOATING WORKSHOP",`<span class="station-status ${t.hasStation()?"available":""}"><i></i>${t.hasStation()?"WORKBENCH IN REACH":"MOVE NEAR A WORKBENCH"}</span>`)}<div class="inventory-tabs">${[["crafting","hammer","Crafting"],["backpack","backpack","Backpack"],["research","research","Research"]].map(([e,i,n])=>Xt(at(i,"",18)+n,`tab:${e}`,`inventory-tab ${this.inventoryTab===e?"active":""}`)).join("")}<span>THE OCEAN CAN WAIT. GAME PAUSED.</span></div><div id="inventory-content">${this.inventoryTab==="crafting"?this.craftingContent():this.inventoryTab==="backpack"?this.backpackContent():this.researchContent()}</div><footer class="modal-footer"><span>${at("anchor","",15)} ${[...t.grid.blocks.values()].filter(e=>e.y===0).length}m² OF HOME <i>·</i> DAY ${t.time.day}</span><span>${Ft("TAB")} BACK TO THE BLUE</span></footer>`}craftingContent(){const t=this.game,e=Xi.find(l=>l.id===this.recipeId)||Xi[0],i=Xi.filter(l=>this.category==="all"||l.category===this.category),n=!e.research||t.crafting.research.has(e.research),r=t.inventory.has(e.ingredients),a=t.hasStation(e.station||"workbench"),o=e.block?n:n&&r&&a&&!t.crafting.job;return`<div class="crafting-layout"><aside class="crafting-sidebar"><div class="panel-eyebrow">A FEW GOOD IDEAS</div>${[["all","backpack","All recipes"],["essentials","rope","Essentials"],["tools","spear","Tools & equipment"],["food","cookedFish","Food & water"],["building","foundation","Raft & shelter"]].map(([l,h,c])=>Xt(at(h,"",20)+c+`<small>${Xi.filter(u=>l==="all"||u.category===l).length}</small>`,`category:${l}`,`category-button ${this.category===l?"active":""}`)).join("")}<div class="sidebar-tip">${at("info","",18)}<p>Find something new?<br>Bring it to your workbench.<br><strong>Curiosity opens doors.</strong></p></div></aside><div class="recipe-area"><div class="recipe-section-title"><h3>${{all:"A little ingenuity goes a long way.",essentials:"Little things. Big possibilities.",tools:"Ready for what’s out there.",food:"Keep your spirits up.",building:"Make a little more home."}[this.category]}</h3><span>${i.length} RECIPES</span></div><div class="recipe-grid">${i.map(l=>{const h=l.block?Nt[l.block].icon:wt[l.output]?.icon,c=l.research&&!t.crafting.research.has(l.research);return`<button class="recipe-card ${e.id===l.id?"selected":""} ${c?"locked":""}" data-action="recipe:${l.id}"><span class="recipe-illustration">${at(h,"",43)}</span><strong>${l.name}</strong><small>${c?at("lock","",10)+" RESEARCH REQUIRED":l.block?"BUILDABLE STRUCTURE":`${l.amount} ${l.amount>1?"ITEMS":"ITEM"} · ${l.seconds}s`}</small>${e.id===l.id?'<span class="recipe-check">'+at("check","",12)+"</span>":""}</button>`}).join("")}</div></div><aside class="recipe-detail"><div class="detail-illustration">${at(e.block?Nt[e.block].icon:wt[e.output]?.icon,"",78)}<span class="illustration-ring"></span></div><span class="panel-eyebrow">${e.block?"A SOLID FOUNDATION FOR TOMORROW":"SOMETHING WORTH MAKING"}</span><h3>${e.name}</h3><p>${e.description}</p><div class="ingredients-title">YOU’LL NEED <span>HAVE / NEED</span></div><div class="ingredients">${Object.entries(e.ingredients).map(([l,h])=>`<div class="ingredient ${t.inventory.count(l)<h?"missing":""}">${at(wt[l].icon,"",21)}<span>${wt[l].name}</span><strong>${t.inventory.count(l)} <em>/ ${h}</em></strong></div>`).join("")}</div>${n?!a&&!e.block?`<div class="craft-warning">${at("workbench","",15)} Requires a nearby ${e.station||"workbench"}.</div>`:t.crafting.job?'<div class="craft-warning">A craft is in progress. Close the menu to let time pass.</div>':"":`<div class="craft-warning">${at("lock","",15)} Research ${wt[e.research].name.toLowerCase()} first.</div>`}<button class="button primary craft-button" data-action="craft" ${o?"":"disabled"}>${at(e.block?"hammer":"plus","",18)} ${e.block?"Select & build":`Craft ${e.amount>1?e.amount+"× ":""}${e.name}`}<span>${e.block?"→":e.seconds+"s"}</span></button>${t.crafting.job?Xt("Cancel current craft & refund","cancel-craft","text-button cancel-craft"):""}${t.jobs.map(l=>Xt("Cancel "+Ie(l.recipe.name)+" & refund",`cancel-station:${l.blockId}`,"text-button cancel-craft")).join("")}<div class="detail-footnote">A LITTLE RESOURCEFULNESS GOES A LONG WAY.</div></aside></div>`}backpackContent(){const t=this.game,e=Object.keys(wt).filter(n=>t.inventory.count(n)>0),i=wt[this.selectedItem]||wt.wood;return`<div class="backpack-layout"><div><div class="backpack-heading"><h3>Everything you’ve brought along.</h3><span>${e.length} KINDS OF POSSIBILITY</span></div><div class="backpack-grid">${e.map(n=>`<button class="backpack-item ${n===this.selectedItem?"selected":""}" data-action="item:${n}"><span style="color:${wt[n].color}">${at(wt[n].icon,"",42)}</span><strong>${wt[n].name}</strong><small>×${t.inventory.count(n)}</small></button>`).join("")}</div></div><aside class="backpack-detail"><div class="detail-illustration">${at(i.icon,"",80)}</div><span class="panel-eyebrow">${i.tool?"A TRUSTY COMPANION":i.consumable?"A LITTLE NOURISHMENT":"SALVAGED FROM THE SEA"}</span><h3>${i.name}</h3><p>${i.description}</p><div class="item-quantity">IN YOUR BACKPACK <strong>${t.inventory.count(this.selectedItem)}</strong></div>${i.tool||i.consumable?Xt(at("plus","",18)+" Put on quickbar","equip","button primary full-width"):""}${i.consumable?Xt(at(i.icon,"",18)+" Consume one","consume","button secondary full-width",t.inventory.count(this.selectedItem)?"":"disabled"):""}${i.research?Xt(at("research","",18)+" Research this discovery",`research:${this.selectedItem}`,"button secondary full-width"):""}<small class="backpack-tip">Tools have no durability. Your quickbar is your pocket; the rest stays safely in your backpack.</small></aside></div>`}researchContent(){const t=this.game;return`<div class="research-content"><div class="research-intro"><span class="panel-eyebrow">LET CURIOSITY LEAD</span><h3>The world still has a few things to teach you.</h3><p>Bring a discovery to your workbench. Research documents it without consuming it. Explore the palms, reefs, and old outposts for three useful branches; none are required to send your rescue signal.</p></div><div class="research-grid">${Object.entries(_n).map(([e,i])=>{const n=t.crafting.research.has(e),r=i.requires.filter(o=>!t.crafting.research.has(o)),a=t.crafting.canResearch(e)&&t.hasStation();return`<article class="research-card"><div class="research-art">${at(wt[e].icon,"",70)}<span>→</span>${at(Nt[i.unlock].icon,"",65)}</div><span class="panel-eyebrow">${n?"DISCOVERY DOCUMENTED":i.requires.length?"RESEARCH BRANCH":"ISLAND DISCOVERY"}</span><h3>${i.title}</h3><p>${i.description}</p><div class="research-requirement">${at(wt[e].icon,"",19)} ${wt[e].name}<span>${t.inventory.count(e)>0?"IN YOUR BACKPACK":"YET TO BE FOUND"}</span></div>${r.length?`<div class="craft-warning">Study ${r.map(o=>wt[o].name).join(", ")} first.</div>`:""}${Xt(at(n?"check":"research","",18)+(n?"Researched":`Study ${wt[e].name.toLowerCase()}`),`research:${e}`,`button ${n?"secondary":"primary"} full-width`,a?"":"disabled")}</article>`}).join("")}</div></div>`}renderMap(){if(this.modal!=="map")return;const t=this.game,e=[...t.world.islands].sort((i,n)=>Math.hypot(i.x-t.raft.position.x,i.z-t.raft.position.z)-Math.hypot(n.x-t.raft.position.x,n.z-t.raft.position.z));document.getElementById("modal-panel").innerHTML=`${this.modalHeading("A whole horizon out there.","YOUR OCEAN CHART",'<span class="chart-scale">100 METERS PER CHUNK</span>')}<div class="map-layout"><div class="chart-canvas-wrap"><canvas id="world-map" width="1200" height="900" aria-label="Ocean chart showing your raft and nearby procedural islands"></canvas><div class="chart-legend"><span><i class="legend-raft"></i> YOUR LITTLE HOME</span><span><i class="legend-island"></i> NEARBY SHORE</span><span>≈ THE REST IS UP TO YOU</span></div><div class="chart-stamp">TIDEBOUND<br>GOLD<small>DEPARTMENT OF GETTING LOST</small></div></div><aside class="map-sidebar"><div class="panel-eyebrow">NEARBY PLACES TO BE</div><div class="map-island-list">${e.map(i=>`<article class="map-island"><span class="island-list-icon">${at("island","",24)}</span><div><small>${t.world.discovered.has(i.id)?"CHARTED SHORE":"AN UNFAMILIAR SHORE"}</small><h3>${i.name}</h3><p>${i.biome.name} <span>·</span> ${Math.round(Math.hypot(i.x-t.raft.position.x,i.z-t.raft.position.z))}m away</p><p class="landmark-map-note">${Ie(i.biome.poi.name)} · ${i.resources.find(n=>n.type==="poi")?.collected?"explored":"unexplored"}</p>${Xt("Set a course "+at("arrow","",14),`course:${i.id}`,"course-button")}</div></article>`).join("")}</div><button class="button secondary full-width" data-action="anchor">${at("anchor","",18)} ${t.anchored?"Raise the anchor":"Drop the anchor"}</button><p class="map-tip">Setting a course sails your raft automatically. ${Ft("G")} lets you take the helm at any time.</p></aside></div><footer class="modal-footer"><span>${at("compass","",15)} NORTH IS UP <i>·</i> YOUR WORLD KEEPS GOING</span><span>${Ft("M")} OCEAN CHART</span></footer>`,requestAnimationFrame(()=>this.drawMap())}drawMap(){const t=document.getElementById("world-map");if(!t)return;const e=t.getContext("2d"),i=this.game,n=1200,r=900,a=3,o=600,l=450;e.fillStyle="#bad2c8",e.fillRect(0,0,n,r),e.strokeStyle="#789e952b",e.lineWidth=1;const h=(-i.raft.position.x*a%100+100)%100,c=(-i.raft.position.z*a%100+100)%100;for(let u=h;u<n;u+=100)e.beginPath(),e.moveTo(u,0),e.lineTo(u,r),e.stroke();for(let u=c;u<r;u+=100)e.beginPath(),e.moveTo(0,u),e.lineTo(n,u),e.stroke();e.strokeStyle="#73978b23";for(let u=150;u<800;u+=150)e.beginPath(),e.arc(o,l,u,0,Math.PI*2),e.stroke();for(const u of i.world.islands){const d=o+(u.x-i.raft.position.x)*a,p=l+(u.z-i.raft.position.z)*a,g=u.radius*a;e.fillStyle="#90b6a080",e.beginPath(),e.ellipse(d,p,g*1.28,g*1.1,-.1,0,Math.PI*2),e.fill(),e.fillStyle="#ded1aa",e.beginPath();for(let v=0;v<40;v++){const m=v/40*6.283,f=1+Math.sin(m*3+u.seed)*.13,y=d+Math.cos(m)*g*f,_=p+Math.sin(m)*g*f*.85;v?e.lineTo(y,_):e.moveTo(y,_)}e.closePath(),e.fill(),e.strokeStyle="#839a74",e.lineWidth=1.5,e.stroke(),e.fillStyle="#8da77d",e.beginPath(),e.ellipse(d,p,g*.66,g*.51,-.3,0,Math.PI*2),e.fill(),e.fillStyle="#3a5952",e.textAlign="center",e.font="500 19px Outfit",e.fillText(u.name.toUpperCase(),d,p+g+27),e.font="13px DM Mono",e.fillStyle="#668278",e.fillText(i.world.discovered.has(u.id)?"CHARTED SHORE":"UNFAMILIAR SHORE",d,p+g+47)}i.autopilot&&(e.setLineDash([8,8]),e.strokeStyle="#b56c46",e.lineWidth=2,e.beginPath(),e.moveTo(o,l),e.lineTo(o+(i.autopilot.x-i.raft.position.x)*a,l+(i.autopilot.z-i.raft.position.z)*a),e.stroke(),e.setLineDash([])),e.save(),e.translate(o,l),e.rotate(Math.PI-i.player.heading),e.fillStyle="#ba714f",e.strokeStyle="#f8f0d5",e.lineWidth=3,e.beginPath(),e.moveTo(0,-17),e.lineTo(11,13),e.lineTo(0,7),e.lineTo(-11,13),e.closePath(),e.fill(),e.stroke(),e.restore(),e.fillStyle="#385a50",e.font="500 16px Outfit",e.textAlign="center",e.fillText("YOU ARE HERE",o,l+42),e.save(),e.translate(90,95),e.strokeStyle="#496d5f",e.lineWidth=1.5,e.beginPath(),e.moveTo(0,-25),e.lineTo(0,25),e.moveTo(-25,0),e.lineTo(25,0),e.stroke(),e.fillStyle="#3a5a4d",e.font="500 20px Outfit",e.fillText("N",0,-38),e.restore()}renderHelp(){document.getElementById("modal-panel").innerHTML=`${this.modalHeading("A field guide to finding your feet.","A LITTLE KNOW-HOW GOES A LONG WAY")}<div class="guide-content"><div class="guide-intro"><div class="guide-art">${at("island","",90)}<span>01 / THE ART OF STAYING AFLOAT</span></div><h3>You don’t have to conquer the ocean.<br>Just make a little home on it.</h3><p>Gather what the currents bring. Build one square at a time. Keep yourself fed and watered. Then follow your curiosity beyond the horizon.</p></div><div class="guide-sections"><article><span class="guide-number">01</span><div><h3>Bring the sea a little closer.</h3><p>Select your hook ${Ft("1")}. Aim near floating debris. Hold left click to charge, release to throw. Your hook catches nearby salvage and reels it home. Click again to recall a missed cast.</p></div></article><article><span class="guide-number">02</span><div><h3>Put down a few roots.</h3><p>Select your hammer ${Ft("2")}. Choose a structure above the quickbar. A green ghost means you’re good to go. Click or right-click to build. ${Ft("R")} rotates, ${Ft("T")} repairs, hold ${Ft("X")} to dismantle the highlighted target. Release to cancel; structures supporting others need a longer hold. Keep everything connected to a core foundation.</p></div></article><article><span class="guide-number">03</span><div><h3>Look after the person on board.</h3><p>Thirst falls faster than hunger. ${Ft("F")} by your purifier makes fresh water from driftwood; your grill turns raw fish into a meal. Select food or water and click to consume it. Use your rod ${Ft("6")} to catch dinner.</p></div></article><article><span class="guide-number">04</span><div><h3>There’s more beyond the blue.</h3><p>${Ft("M")} opens the ocean chart. Set a course for an island, or ${Ft("G")} takes the helm for manual sailing. Swim ashore and ${Ft("F")} to gather rare supplies. Research vines and copper at your workbench. Palm resin unlocks rain collection; reef sea glass unlocks plating; an outpost lens unlocks faster sailing. Three island signal fragments can become a way home.</p></div></article><article><span class="guide-number">05</span><div><h3>Respect what lives here.</h3><p>A shark circles your home. Keep your spear ${Ft("3")} ready and strike during its charge. Reefs scrape foundations; jellyfish slow swimmers. Storms bring stronger waves and lightning. Fresh water extinguishes a nearby fire.</p></div></article><article><span class="guide-number">06</span><div><h3>Take the trail less charted.</h3><p>Every shore has a landing trail, an elevated overlook, a keeper’s journal and a sheltered grotto. Read the journal with ${Ft("F")}; some describe an order of sun, tide and star waystones. Follow the side trail and open the hidden chest for one-time useful supplies. ${Ft("J")} lets you reread the clue. These adventures are optional: the original three-fragment rescue route still works.</p></div></article></div></div><div class="controls-footer"><span>${Ft("W")}${Ft("A")}${Ft("S")}${Ft("D")} move</span><span>${Ft("SPACE")} jump</span><span>RIGHT DRAG look</span><span>${Ft("TAB")} craft & backpack</span><span>${Ft("ESC")} pause</span><span>${Ft("F3")} performance</span><span>GAMEPAD SUPPORTED</span></div>`}renderJournal(){const t=this.quests(!0),e=this.game;document.getElementById("modal-panel").innerHTML=`${this.modalHeading("The things we carry forward.","YOUR VOYAGE JOURNAL",`<span class="chart-scale">DAY ${String(e.time.day).padStart(2,"0")}</span>`)}<div class="journal-layout"><section class="journal-chapters"><span class="panel-eyebrow">ONE STEP AT A TIME</span><h3>From a raft to a refuge.</h3><div class="journal-timeline">${t.map((i,n)=>`<article class="${i.current>=i.target?"complete":""}"><span class="timeline-dot">${i.current>=i.target?at("check","",15):"0"+(n+1)}</span><div><h4>${i.title}</h4><p>${i.optional?"OPTIONAL · ":""}${i.tip}${i.reward?" · Reward: "+Object.entries(i.reward).map(([r,a])=>`${a} ${wt[r].name}`).join(", "):""}</p></div><strong>${Math.min(i.current,i.target)} / ${i.target}</strong></article>`).join("")}</div></section><aside class="journal-notes"><span class="panel-eyebrow">MESSAGES LEFT BEHIND</span><h3>Other lives, other tides.</h3>${e.notebook.length?e.notebook.map((i,n)=>`<button class="notebook-note" data-action="note:${n}">${at("book","",22)}<span><strong>${Ie(i.title)}</strong><small>FOUND ON ${Ie(i.island.toUpperCase())}</small></span>${at("chevron","",17)}</button>`).join(""):`<div class="empty-notes">${at("book","",47)}<p>Every shore has a story.<br>Follow a shore trail to a keeper’s journal<br>and look beyond the overlook.</p></div>`}<div class="journey-totals"><span><strong>${e.progress.salvaged}</strong>SALVAGE GATHERED</span><span><strong>${e.progress.islands}</strong>SHORES DISCOVERED</span><span><strong>${e.progress.built}</strong>STRUCTURES BUILT</span><span><strong>${e.progress.journals||0}</strong>TRAIL JOURNALS</span><span><strong>${e.progress.secrets||0}</strong>HIDDEN CHESTS</span></div></aside></div>`}renderPause(){this.game,document.getElementById("modal-panel").innerHTML=`<div class="pause-art">${Uc()}<span>THE OCEAN CAN WAIT.</span></div>${this.modalHeading("A moment of calm.","YOUR VOYAGE IS PAUSED")}<div class="pause-content">${Xt(at("play","",18)+" Back to the blue "+at("arrow","",18),"resume","button primary full-width")}${Xt(at("save","",18)+" Save your voyage <small>LOCAL TO THIS DEVICE</small>","save","pause-menu-item")}${Xt(at("book","",18)+" Open the field guide","help","pause-menu-item")}${Xt(at("settings","",18)+" Make yourself comfortable","settings","pause-menu-item")}${Xt(at("map","",18)+" Start a new voyage","new","pause-menu-item subtle")}<p class="pause-footnote">Take your time. Your raft isn’t going anywhere.</p><span class="prototype-label">${Ie(yn.title.toUpperCase())} · BROWSER SURVIVAL · V${yn.version}</span></div>`}renderSettings(){const t=this.game.settings;document.getElementById("modal-panel").innerHTML=`${this.modalHeading("Make yourself comfortable.","TIDEBOUND GOLD · SETTINGS")}<div class="settings-content"><div class="settings-column"><h3>The sound of being here.</h3><label class="setting-row"><span>Ocean ambience<small>Wind, water, and the little things.</small></span><div class="range-wrap"><input type="range" data-setting="volume" min="0" max="1" step=".01" value="${t.volume}" aria-label="Ambient audio volume"><b id="volume-value">${Math.round(t.volume*100)}%</b></div></label><h3>A view worth keeping.</h3>
      <label class="setting-row"><span>Quality preset<small>Geometry, shadows, distance detail,<br>clouds, rain, and particle budgets.</small></span><select data-setting="quality" aria-label="Visual quality">${[["low","Low · lighter"],["medium","Medium · balanced"],["high","High · detailed"]].map(([e,i])=>`<option value="${e}" ${t.quality===e?"selected":""}>${i}</option>`).join("")}</select></label>
      <label class="setting-row"><span>Adaptive quality<small>Steps down during sustained slow frames;<br>recovers gradually when there is headroom.</small></span><input type="checkbox" class="toggle" data-setting="adaptiveQuality" ${t.adaptiveQuality?"checked":""} aria-label="Adaptive quality"></label>
      <label class="setting-row"><span>Pixel ratio limit<small>A maximum; your device, preset, or<br>adaptive quality may render lower.</small></span><select data-setting="pixelRatio" aria-label="Pixel ratio limit">${[.5,.75,1,1.25,1.5,2].map(e=>`<option value="${e}" ${t.pixelRatio===e?"selected":""}>${e.toFixed(2)}×</option>`).join("")}</select></label>
      <label class="setting-row"><span>Weather<small>Change the mood, or let the ocean decide.</small></span><select data-setting="weather" aria-label="Weather"><option value="dynamic" ${t.dynamicWeather?"selected":""}>Changing with the wind</option>${Object.entries(si).map(([e,i])=>`<option value="${e}" ${!t.dynamicWeather&&this.game.time.weather===e?"selected":""}>${i.label}</option>`).join("")}</select></label>
      ${Xt("F3 · Toggle performance monitor","performance","button secondary full-width")}
      </div><div class="settings-column"><h3>Your kind of adventure.</h3><label class="setting-row"><span>Calm seas mode<small>No hunger, thirst, or shark damage.<br>Just you and your imagination.</small></span><input class="toggle" type="checkbox" data-setting="relaxed" ${t.relaxed?"checked":""} aria-label="Calm seas mode"></label><label class="setting-row"><span>A little guidance<small>Show movement hints on screen.</small></span><input class="toggle" type="checkbox" data-setting="showHints" ${t.showHints?"checked":""} aria-label="Show movement hints"></label><h3>A voyage to keep.</h3><p class="settings-save-note">Autosaves every twenty simulated seconds. Pausing and changing tabs stops simulation; no offline hunger penalty. Export a file for a portable backup. Imports are validated before confirmation; a local backup is kept. Original Tidebreak v1 saves migrate without spending or refunding ingredients again.</p><div class="save-actions">${Xt(at("save","",17)+" Export save","export","button secondary")}${Xt(at("backpack","",17)+" Import save","import","button secondary")}</div>${Xt("Restore a local backup","restore-backup","text-button full-width",this.game.getBackup()?"":"disabled")}<p class="settings-save-note">${this.game.savingBlocked?"The unreadable local save is protected from overwrite. Restore or import a valid backup.":this.game.storageAvailable?"Version 2 saves include raft motion, player states, work-in-progress reservations, discoveries, and quest rewards.":"Storage is unavailable in this preview. Export to keep your progress."}</p></div></div><footer class="modal-footer"><span>NO ACCOUNTS. NO NETWORK. JUST THE OCEAN.</span>${Xt("Back to the blue "+at("arrow","",15),"close","text-button")}</footer>`}changeSetting(t,e){const i=this.game;if(t==="volume"){i.settings.volume=ve(Number(e),0,1),i.audio.setVolume(i.settings.volume);const n=document.getElementById("volume-value");n&&(n.textContent=Math.round(i.settings.volume*100)+"%")}else if(t==="quality"){if(e==="auto")i.settings.quality="medium",i.settings.adaptiveQuality=!0;else if(["low","medium","high"].includes(e))i.settings.quality=e;else return;i.quality.configure()}else if(t==="adaptiveQuality")i.settings.adaptiveQuality=!!e,i.quality.configure();else if(t==="pixelRatio"){const n=Number(e);if(!Number.isFinite(n)||n<.5||n>2)return;i.settings.pixelRatio=n,i.applyQuality()}else if(t==="weather"){if(e!=="dynamic"&&!si[e])return;i.settings.dynamicWeather=e==="dynamic",i.time.dynamic=e==="dynamic",e!=="dynamic"&&i.time.setWeather(e)}else t==="relaxed"?(i.settings.relaxed=!!e,e&&["attacking","targeting"].includes(i.shark.state)&&(i.shark.state="circling",i.shark.timer=0,i.shark.target=null),this.toast(e?"Calm seas mode on. Take your time.":"Survival mode on. Keep an eye on your needs.","heart")):t==="showHints"&&(i.settings.showHints=!!e,document.getElementById("movement-hints").classList.toggle("hidden",!e||!i.started));i.renderNeeded=!0,i.save()}confirmImport(t,e=!1,i=0){this.openModal("confirm-import");const n=1+Math.floor(t.time.elapsed/1200),r=t.stationJobs.length+(t.crafting?1:0);document.getElementById("modal-panel").innerHTML=`${this.modalHeading(e?"Return to an earlier tide?":"Bring this voyage aboard?","VALIDATED VERSION 2 SAVE")}<div class="simple-content"><p>Day ${n} · ${t.blocks.length} structures · ${t.world.discovered.length} charted shores · ${r} reserved craft${r===1?"":"s"}.${i?`<br><br>${i} unsupported V1 structure(s) were converted back into their full building materials.`:""}<br><br>This will replace the current voyage after confirmation. A valid current voyage is backed up in this browser. Export a file too if it matters to you.</p>${Xt("Confirm & load voyage "+at("arrow"),"confirm-import","button primary full-width")}${Xt("Keep my current voyage","close","button secondary full-width")}</div>`}showLore(t,e){t&&(this.openModal("lore"),document.getElementById("modal-panel").innerHTML=`${this.modalHeading(Ie(t.title),"A MESSAGE LEFT BEHIND")}<div class="lore-content">${at("book","",43)}<blockquote>${Ie(t.text)}</blockquote><span class="panel-eyebrow">FOUND ON ${Ie(e.toUpperCase())}</span>${Xt("Keep it in your journal "+at("arrow","",18),"close","button primary full-width")}</div>`)}death(){this.openModal("death"),document.getElementById("modal-panel").innerHTML=`${this.modalHeading("The sea is a patient teacher.","TAKE ANOTHER BREATH")}<div class="simple-content"><div class="outcome-icon">${at("heart","",60)}</div><p>Your voyage doesn’t have to end here. Wake up aboard your raft with your tools, a little less salvage, and another chance.</p>${Xt("Find your feet again "+at("arrow","",18),"revive","button primary full-width")}${Xt("A fresh start instead","new","text-button full-width")}</div>`}victory(){this.openModal("victory"),document.getElementById("modal-panel").innerHTML=`${this.modalHeading("Someone heard you.","A VOICE ACROSS THE BLUE")}<div class="simple-content victory-content"><div class="outcome-icon">${at("signal","",65)}</div><p>Through the static, a voice. Through the endless blue, a light. You made a home on the ocean—and found your way back to the world.</p><div class="victory-numbers"><span><b>${this.game.time.day}</b>DAYS AT SEA</span><span><b>${this.game.progress.islands}</b>NEW SHORES</span><span><b>${this.game.progress.built}</b>THINGS BUILT</span></div>${Xt("Stay a little longer "+at("arrow","",18),"resume","button primary full-width")}<small>The ocean is still endless. Your adventure can be, too.</small></div>`}toast(t,e="info",i="info",n=3800){const r=document.getElementById("toasts"),a=document.createElement("div");for(a.className=`toast toast-${i}`,a.innerHTML=`<span class="toast-icon">${at(e,"",20)}</span><span>${Ie(t)}</span>`,r.appendChild(a);r.children.length>3;)r.firstElementChild.remove();setTimeout(()=>{a.classList.add("leaving"),setTimeout(()=>a.remove(),300)},n)}discover(t){const e=document.getElementById("discovery-banner");e.innerHTML=`<span>A NEW SHORE. A NEW STORY.</span><strong>${Ie(t.name)}</strong><small>${Ie(t.biome.name.toUpperCase())} <i>·</i> ADDED TO YOUR OCEAN CHART</small>`,e.classList.add("visible"),clearTimeout(this.discoveryTimer),this.discoveryTimer=setTimeout(()=>e.classList.remove("visible"),6500)}damageFlash(){const t=document.getElementById("damage-overlay");t.classList.remove("flash"),t.offsetWidth,t.classList.add("flash")}toggleHUD(){document.body.classList.toggle("hide-hud")}resize(){}}const Us="tidebound.save.v2",kr="tidebreak.save.v1",Ko="tidebound.save.previous.v2",Zo="tidebound.save.backup.v2",Jo=2*1024*1024;class Qo extends Error{constructor(t){super(t),this.name="SaveError"}}const Lt=s=>{throw new Qo(s)},Xn=(s,t)=>typeof t=="string"&&Object.hasOwn(s,t),Le=(s,t)=>((!s||typeof s!="object"||Array.isArray(s))&&Lt(`Invalid ${t}.`),s),Jt=(s,t,e=-1e7,i=1e7)=>((typeof s!="number"||!Number.isFinite(s)||s<e||s>i)&&Lt(`Invalid ${t}.`),s),Ii=(s,t,e=0,i=Number.MAX_SAFE_INTEGER)=>(Jt(s,t,e,i),Number.isSafeInteger(s)||Lt(`Invalid ${t}.`),s),je=(s,t)=>(typeof s!="boolean"&&Lt(`Invalid ${t}.`),s),Ss=(s,t,e=2e3)=>((typeof s!="string"||s.length>e)&&Lt(`Invalid ${t}.`),s),qi=(s,t,e=2e4)=>((!Array.isArray(s)||s.length>e)&&Lt(`Invalid ${t}.`),s),$n=(s,t,e=1e7)=>(qi(s,t,3),s.length!==3&&Lt(`Invalid ${t}.`),s.map(i=>Jt(i,t,-e,e))),Nc=/^-?\d{1,7},-?\d{1,7}$/,Ev=/^-?\d{1,7},-?\d{1,7}:(cache|resource\d{1,3}|special|poi:(spring|wreck|observatory)|explore:(journal|treasure|rune[0-2]))$/,Tv=/^-?\d{1,2},[0-8],-?\d{1,2}$/,yr=(s,t,e,i)=>{const n=qi(s,t,i);return(n.some(r=>typeof r!="string"||!e(r))||new Set(n).size!==n.length)&&Lt(`Invalid ${t}.`),[...n]};function kc(s){Le(s,"inventory");const t={};for(const[e,i]of Object.entries(s))Xn(wt,e)||Lt(`Unknown inventory item: ${e}.`),t[e]=Ii(i,`${e} quantity`);return t}function Oh(s,t=0){if(t>30&&Lt("Save nesting is too deep."),s&&typeof s=="object")for(const[e,i]of Object.entries(s))["__proto__","prototype","constructor"].includes(e)&&Lt("Unsafe save property."),Oh(i,t+1)}function Av(s={}){Le(s,"settings");let t=s.quality??"medium";const e=s.adaptiveQuality??t==="auto";return t==="auto"&&(t="medium"),["low","medium","high"].includes(t)||Lt("Unknown quality preset."),{volume:Jt(s.volume??.35,"audio volume",0,1),quality:t,adaptiveQuality:je(e,"adaptive quality"),pixelRatio:Jt(s.pixelRatio??1.25,"pixel ratio",.5,2),relaxed:je(s.relaxed??!1,"calm seas setting"),dynamicWeather:je(s.dynamicWeather??!0,"dynamic weather"),showHints:je(s.showHints??!0,"hint setting")}}function Rv(s){Le(s,"progress");const t={};for(const e of["salvaged","built","crafted","water","islands","caches","poi","secrets","journals","puzzles","sharks"])t[e]=Ii(s[e]??0,`${e} progress`);return t.rescued=je(s.rescued??!1,"rescue progress"),t}function Lo(s){const t=Xi.find(e=>e.id===s.recipeId&&!e.block);return t||Lt("Unknown crafting recipe."),s.variant==="rain"?(t.id!=="water"&&Lt("Invalid rainwater recipe."),{...t,ingredients:{},name:"Collected rainwater"}):(s.variant&&s.variant!=="default"&&Lt("Unknown crafting variant."),t)}function Oc(s,t,e,i){Le(s,e);const n=Lo(s),r=Ss(s.stationKey,`${e} station`,32),a=t.get(r);(!a||a.type!==(n.station||"workbench"))&&Lt(`${e} is missing its workstation.`);const o=Jt(s[i],`${e} time`,0,n.seconds);return o>=n.seconds&&Lt(`${e} was already completed.`),{recipeId:n.id,stationKey:r,[i]:o,variant:s.variant==="rain"?"rain":"default"}}function Mn(s){let t=s;if(typeof t=="string"){new TextEncoder().encode(t).length>Jo&&Lt("Save files must be smaller than 2 MB.");try{t=JSON.parse(t)}catch{Lt("This file is not valid JSON.")}}Le(t,"save"),Oh(t),t.version!==1&&t.version!==yn.saveVersion&&Lt(t.version>yn.saveVersion?"This save is from a newer version. Your current voyage was not changed.":"Unsupported save version. Your current voyage was not changed.");const e=t.version===1,i={version:yn.saveVersion,game:"tosins-tidebound",savedAt:Jt(t.savedAt??0,"save date",0,1e15),simTime:Jt(t.simTime??0,"simulation time",0,1e12),inventory:kc(t.inventory)},n=Le(t.stats,"survival statistics");i.stats={health:Jt(n.health,"health",Number.MIN_VALUE,100),hunger:Jt(n.hunger,"hunger",0,100),thirst:Jt(n.thirst,"thirst",0,100),stung:Jt(n.stung??0,"sting timer",0,10),alive:!0},n.alive!==void 0&&n.alive!==!0&&Lt("This save has no living player."),i.blocks=qi(t.blocks,"raft structures",2e3).map(f=>{Le(f,"structure"),Xn(Nt,f.type)||Lt("Unknown structure type.");const y={type:f.type,x:Ii(f.x,"grid X",-35,35),y:Ii(f.y,"grid height",0,8),z:Ii(f.z,"grid Z",-35,35),hp:Jt(f.hp,"structure health",Number.MIN_VALUE,Nt[f.type].hp),core:je(f.core??!1,"core marker"),rotation:Ii(f.rotation??0,"structure rotation",0,3),production:Jt(f.production??0,"production timer",0,35)};return y.core&&(y.type!=="foundation"||y.y!==0||![0,1].includes(y.x)||![0,1].includes(y.z))&&Lt("Invalid core foundation."),Nt[y.type].buoyant&&y.y!==0&&Lt("A floating foundation must be at sea level."),y}),(!i.blocks.length||!i.blocks.some(f=>f.core))&&Lt("A raft needs at least one original core foundation.");const r=new Rh(new Ah);for(const f of i.blocks)r.at(f.x,f.y,f.z)&&Lt("Two structures occupy the same grid cell."),r.add(f.type,f.x,f.y,f.z,f.core,f.hp,{rotation:f.rotation,production:f.production});const a=r.connectedKeys();if(a.size!==i.blocks.length){const f=new Set,y=[];for(const x of r.blocks.values())x.core&&(f.add(Ae(x.x,x.y,x.z)),y.push(x));for(let x=0;x<y.length;x++)for(const I of r.neighbors(y[x])){const A=Ae(I.x,I.y,I.z);f.has(A)||(f.add(A),y.push(I))}(!e||f.size!==i.blocks.length)&&Lt("The raft contains disconnected or unsupported structures. No items were changed.");const _=[];for(const x of i.blocks)if(a.has(Ae(x.x,x.y,x.z)))_.push(x);else for(const[I,A]of Object.entries(Nt[x.type].cost))i.inventory[I]=Ii((i.inventory[I]||0)+A,`${I} migration refund`);i.blocks=_}const o=new Map(i.blocks.map(f=>[Ae(f.x,f.y,f.z),f]));i.research=yr(t.research??[],"research discoveries",f=>Xn(_n,f),100),i.research.some(f=>_n[f].requires.some(y=>!i.research.includes(y)))&&Lt("A research prerequisite is missing.");const l=Le(t.time??{},"world clock"),h=l.weather??"clear";Xn(si,h)||Lt("Unknown weather."),i.time={elapsed:Jt(l.elapsed??270,"world time",0,1e12),weather:h,weatherTime:Jt(l.weatherTime??0,"weather timer",0,1e4)},i.settings=Av(t.settings),i.progress=Rv(t.progress??{});const c=Le(t.world??{},"world progress");c.generationVersion!==void 0&&![1,2,3].includes(c.generationVersion)&&Lt("Unsupported island generation. Your voyage was not changed."),i.world={generationVersion:c.generationVersion===3?3:2,collected:yr(c.collected??[],"collected resources",f=>Ev.test(f),2e4),discovered:yr(c.discovered??[],"charted islands",f=>Nc.test(f),2e4)},j0(i.world.collected)||Lt("Invalid waystone sequence or missing trail journal."),i.notebook=qi(t.notebook??[],"journal",1e4).map(f=>(Le(f,"journal entry"),{title:Ss(f.title,"journal title",160),text:Ss(f.text,"journal message",4e3),island:Ss(f.island,"journal island",160)})),i.quickbar=qi(t.quickbar??Eh,"quickbar",8).map(f=>(f!==null&&!Xn(wt,f)&&Lt("Unknown quickbar item."),f)),i.quickbar.length!==8&&Lt("The quickbar must have eight slots.");const u=e?{}:Le(t.raft,"raft state");let d=u.autopilot??null;d!==null&&(Le(d,"charted course"),Nc.test(d.id)||Lt("Invalid destination."),d={id:d.id,name:Ss(d.name,"destination name",160),x:Jt(d.x,"destination X"),z:Jt(d.z,"destination Z"),radius:Jt(d.radius,"island radius",1,30),dock:je(d.dock??!1,"sheltered approach")}),i.raft={position:$n(e?t.raftPosition:u.position,"raft position"),rotation:$n(u.rotation??[0,0,0],"raft rotation",Math.PI*2),velocity:$n(u.velocity??[0,0,-.12],"raft velocity",12),verticalVelocity:Jt(u.verticalVelocity??0,"raft vertical velocity",-30,30),anchored:je(u.anchored??!1,"anchor state"),sailOpen:je(u.sailOpen??!0,"sail state"),helming:je(u.helming??!1,"helm state"),autopilot:d};const p=e?{}:Le(t.player,"player state");if(i.player={position:$n(e?t.playerPosition:p.position,"player position"),velocity:$n(p.velocity??[0,0,0],"player velocity",30),heading:Jt(p.heading??2.8,"player heading",-1e4,1e4),grounded:je(p.grounded??!0,"grounded state"),onRaft:je(p.onRaft??!0,"deck state"),swimming:je(p.swimming??!1,"swimming state"),jumpCooldown:Jt(p.jumpCooldown??0,"jump cooldown",0,1),stingCooldown:Jt(p.stingCooldown??0,"sting cooldown",0,10),attackCooldown:Jt(p.attackCooldown??0,"attack cooldown",0,2)},e){const f=Math.round(i.player.position[0]-i.raft.position[0]),y=Math.round(i.player.position[2]-i.raft.position[2]),_=o.get(Ae(f,0,y));i.player.onRaft=!!_&&Nt[_.type].buoyant&&Math.abs(i.player.position[1]-i.raft.position[1]-.27)<.5,i.player.swimming=!i.player.onRaft&&i.player.position[1]<-.1,i.player.grounded=i.player.onRaft||!i.player.swimming&&i.player.position[1]>=0}i.player.onRaft&&i.player.swimming&&Lt("A player cannot be on deck and swimming at the same time."),Math.hypot(i.player.position[0]-i.raft.position[0],i.player.position[2]-i.raft.position[2])>250&&Lt("The player is too far from their raft.");const g=Le(t.camera??{},"camera state");i.camera={yaw:Jt(g.yaw??-.35,"camera yaw",-1e6,1e6),pitch:Jt(g.pitch??.3,"camera pitch",.12,1.2),distance:Jt(g.distance??10.5,"camera distance",5,22),selectedSlot:Ii(g.selectedSlot??0,"selected slot",0,7),buildType:g.buildType??"foundation",buildRotation:Ii(g.buildRotation??0,"building rotation",0,3)},Xn(Nt,i.camera.buildType)||Lt("Unknown selected structure."),i.crafting=e||!t.crafting?null:Oc(t.crafting,o,"Crafting job","elapsed"),i.stationJobs=e?[]:qi(t.stationJobs??[],"workstation jobs",2e3).map(f=>Oc(f,o,"Workstation job","time"));const v=new Set;for(const f of[i.crafting,...i.stationJobs].filter(Boolean))v.has(f.stationKey)&&Lt("A workstation has duplicate reservations."),v.add(f.stationKey);i.fires=e?[]:qi(t.fires??[],"fires",2e3).map(f=>(Le(f,"fire"),(!Tv.test(f.key)||!o.has(f.key)||!Nt[o.get(f.key).type].wooden)&&Lt("A fire is missing its wooden structure."),{key:f.key,timer:Jt(f.timer,"fire timer",0,60)})),new Set(i.fires.map(f=>f.key)).size!==i.fires.length&&Lt("Duplicate fires."),i.salvage=e?[]:qi(t.salvage??[],"reclaimed salvage",2e3).map(f=>(Le(f,"salvage"),["wood","leaf","plastic","scrap","barrel"].includes(f.type)||Lt("Unknown salvage type."),{type:f.type,x:Jt(f.x,"salvage X"),z:Jt(f.z,"salvage Z"),loot:kc(f.loot)}));const m=e?Co.filter(f=>(f.research?i.research.includes(f.research)?1:0:Number(i.progress[f.counter]||0))>=f.target).map(f=>f.id):t.quests?.completed??[];if(i.quests={completed:yr(m,"quest completions",f=>Co.some(y=>y.id===f),100)},i.shark=null,!e&&t.shark){const f=Le(t.shark,"shark state");["circling","targeting","attacking","fleeing","stunned","defeated"].includes(f.state)||Lt("Unknown shark behavior.");const y=f.targetKey??null;y!==null&&!o.has(y)&&Lt("The shark targets a missing structure."),i.shark={state:f.state,position:$n(f.position,"shark position"),health:Jt(f.health,"shark health",0,100),timer:Jt(f.timer,"shark timer",0,1e4),angle:Jt(f.angle,"shark angle",-1e9,1e9),attackCooldown:Jt(f.attackCooldown,"shark cooldown",0,600),biteCooldown:Jt(f.biteCooldown,"swim bite cooldown",0,10),targetKey:y},["targeting","attacking"].includes(f.state)&&y===null&&Lt("The shark is missing its target."),f.state==="defeated"!=f.health<=0&&Lt("Inconsistent shark health.")}return i}function Cv(s){try{const t=s.getItem(Us),e=t===null?s.getItem(kr):null;if(t===null&&e===null)return{data:null};const i=Mn(t??e),n=JSON.parse(t??e);return{data:i,migrated:n.version===1,compensatedBlocks:n.version===1?n.blocks.length-i.blocks.length:0,source:t===null?kr:Us}}catch(t){return{data:null,error:t.message,unavailable:!(t instanceof Qo)}}}function za(s,t,{importing:e=!1}={}){const i=Mn(t),n=JSON.stringify(i),r=s.getItem(Us);if(new TextEncoder().encode(n).length>Jo&&Lt("This voyage exceeds the 2 MB save limit. Export a backup and reduce the raft/journal size."),r)try{Mn(r),s.setItem(e?Zo:Ko,r)}catch(a){if(!(a instanceof Qo))throw a}return s.setItem(Us,n),i}function Pv(s){for(const t of[Zo,Ko,kr])try{const e=s.getItem(t);if(e)return{data:Mn(e),key:t}}catch{}return null}const Ps=Object.freeze({low:{label:"Low",foliage:.38,foliageDistance:24,islandNearDistance:28,resourceDistance:28,maxPixelRatio:.75,shadows:!1,shadowSize:0,oceanSegments:48,particles:.35,rain:180,birds:2,clouds:5,detailDistance:65,viewDistance:145,entityDistance:43},medium:{label:"Medium",foliage:.68,foliageDistance:36,islandNearDistance:36,resourceDistance:40,maxPixelRatio:1.25,shadows:!0,shadowSize:512,oceanSegments:80,particles:.65,rain:450,birds:4,clouds:9,detailDistance:100,viewDistance:190,entityDistance:53},high:{label:"High",foliage:1,foliageDistance:50,islandNearDistance:48,resourceDistance:55,maxPixelRatio:1.75,shadows:!0,shadowSize:1024,oceanSegments:128,particles:1,rain:950,birds:8,clouds:17,detailDistance:155,viewDistance:245,entityDistance:65}}),_r=["low","medium","high"];class Iv{constructor(t){this.game=t,this.current=t.settings.quality,this.scale=1,this.window=0,this.frames=0,this.cooldown=4,this.goodWindows=0,this.apply(this.current)}apply(t=this.current){const e=this.game,i=Ps[t]||Ps.medium;this.current=Ps[t]?t:"medium",e.activeQuality=this.current;const n=Math.max(.5,Math.min(globalThis.devicePixelRatio||1,e.settings.pixelRatio,i.maxPixelRatio)*this.scale);e.renderer.setPixelRatio(n),e.renderer.shadowMap.enabled=i.shadows,e.renderer.shadowMap.needsUpdate=!0,e.ocean.setQuality(i.oceanSegments),e.atmosphere.setQuality(i),e.particles.setQuality(i.particles),e.debris.entityDistance=i.entityDistance,e.world.setDetail(e.player.position,i),e.resize(),e.renderNeeded=!0}configure(){this.scale=1,this.window=0,this.frames=0,this.cooldown=5,this.goodWindows=0,this.apply(this.game.settings.quality)}update(t,e=!0){if(!this.game.settings.adaptiveQuality||!e||!Number.isFinite(t)||t<=0){this.window=0,this.frames=0;return}if(this.window+=t,this.frames++,this.cooldown=Math.max(0,this.cooldown-t),this.window<4)return;const i=this.frames/this.window;if(this.window=0,this.frames=0,this.cooldown>0)return;const n=_r.indexOf(this.current),r=_r.indexOf(this.game.settings.quality);i<28?(this.goodWindows=0,n>0?this.apply(_r[n-1]):this.scale>.65&&(this.scale=Math.max(.65,this.scale-.15),this.apply()),this.cooldown=8):i>55?(this.goodWindows++,this.goodWindows>=3&&(this.goodWindows=0,this.scale<1?(this.scale=Math.min(1,this.scale+.15),this.apply()):n<r&&this.apply(_r[n+1]),this.cooldown=12)):this.goodWindows=0}}class Dv{constructor(t){this.game=t,this.samples=new Float32Array(240),this.index=0,this.count=0,this.visible=!1,this.lastPaint=-1/0,this.paintCount=0,this.element=document.createElement("aside"),this.element.id="performance-monitor",this.element.hidden=!0,this.element.setAttribute("aria-label","Performance monitor"),this.element.innerHTML='<header><strong>PERFORMANCE</strong><span>F3 TO CLOSE</span></header><div class="perf-live"><b data-perf="fps">—</b><span>FPS</span><strong data-perf="ms">— ms</strong></div><div class="perf-summary" data-perf="summary"></div><canvas width="256" height="68" aria-label="Rolling frame-time graph, last 240 frames"></canvas><div class="perf-caption">FRAME TIME · LAST 240 FRAMES</div><dl><div><dt>Draw calls / triangles</dt><dd data-perf="draws"></dd></div><div><dt>GPU geometries / textures</dt><dd data-perf="assets"></dd></div><div><dt>Quality / pixel ratio</dt><dd data-perf="quality"></dd></div><div><dt>Simulation steps / frame</dt><dd data-perf="steps"></dd></div><div data-perf="memory-row" hidden><dt>JS heap (browser API)</dt><dd data-perf="memory"></dd></div></dl>',document.body.appendChild(this.element),this.fields=Object.fromEntries([...this.element.querySelectorAll("[data-perf]")].map(e=>[e.dataset.perf,e])),this.canvas=this.element.querySelector("canvas"),this.ctx=this.canvas.getContext("2d")}toggle(){return this.visible=!this.visible,this.element.hidden=!this.visible,this.lastPaint=-1/0,this.visible}resetWindow(){this.index=0,this.count=0}recordFrame(t,e,i=!0){i&&Number.isFinite(t)&&t>0&&(this.samples[this.index]=t*1e3,this.index=(this.index+1)%this.samples.length,this.count=Math.min(this.samples.length,this.count+1)),this.visible&&e-this.lastPaint>=250&&(this.lastPaint=e,this.paint(e))}snapshot(){let t=0,e=1/0,i=0;for(let r=0;r<this.count;r++){const a=this.samples[r];t+=a,e=Math.min(e,a),i=Math.max(i,a)}const n=this.count?this.samples[(this.index+this.samples.length-1)%this.samples.length]:0;return{currentFPS:n?1e3/n:0,averageFPS:t?1e3*this.count/t:0,minFPS:i?1e3/i:0,maxFPS:e<1/0?1e3/e:0,frameMs:n,averageFrameMs:this.count?t/this.count:0,samples:this.count,minMs:e<1/0?e:0,maxMs:i}}paint(){this.paintCount++;const t=this.game,e=this.snapshot(),i=this.fields;i.fps.textContent=e.samples?e.currentFPS.toFixed(1):"—",i.ms.textContent=e.samples?e.frameMs.toFixed(1)+" ms":"No active frames",i.summary.textContent=`AVG ${e.averageFPS.toFixed(1)} · MIN ${e.minFPS.toFixed(1)} · MAX ${e.maxFPS.toFixed(1)} FPS`,i.draws.textContent=`${t.renderer.info.render.calls} / ${t.renderer.info.render.triangles.toLocaleString()}`,i.assets.textContent=`${t.renderer.info.memory.geometries} / ${t.renderer.info.memory.textures}`,i.quality.textContent=`${Ps[t.activeQuality].label}${t.settings.adaptiveQuality?" · adaptive":""} / ${t.renderer.getPixelRatio().toFixed(2)}×`,i.steps.textContent=`${t.clock.lastSteps} / 8 max${t.paused?" · paused":""}`;try{const l=performance.memory,h=!!l&&Number.isFinite(l.usedJSHeapSize);i["memory-row"].hidden=!h,h&&(i.memory.textContent=(l.usedJSHeapSize/1048576).toFixed(1)+" MB")}catch{i["memory-row"].hidden=!0}const n=this.ctx,r=this.canvas.width,a=this.canvas.height,o=Math.max(33.334,e.maxMs);n.clearRect(0,0,r,a),n.fillStyle="#0b252a",n.fillRect(0,0,r,a),n.strokeStyle="#759b8940",n.lineWidth=1;for(const l of[16.667,33.334]){const h=a-3-l/o*(a-6);n.beginPath(),n.moveTo(0,h),n.lineTo(r,h),n.stroke()}n.strokeStyle="#a7d5b9",n.lineWidth=1.5,n.beginPath();for(let l=0;l<this.count;l++){const h=(this.index-this.count+l+this.samples.length)%this.samples.length,c=l/(this.samples.length-1)*r,u=a-3-this.samples[h]/o*(a-6);l===0?n.moveTo(c,u):n.lineTo(c,u)}n.stroke()}}class Lv{constructor(t,e,i={}){this.bus=t,this.inventory=e,this.completed=new Set(i.completed||[])}entries(t,e){return Co.map(i=>({...i,current:i.research?e.has(i.research)?1:0:Number(t[i.counter]||0),claimed:this.completed.has(i.id)}))}update(t,e){for(const i of this.entries(t,e))i.current>=i.target&&!this.completed.has(i.id)&&(this.completed.add(i.id),this.inventory.grant(i.reward||{}),this.bus.emit("questComplete",i))}toJSON(){return{completed:[...this.completed]}}}const Wt=C;class Uv{constructor(){this.bus=new Ah,this.saved=this.readSave(),this.started=!1,this.paused=!1,this.ready=!1,this.simTime=this.saved?.simTime||0,this.lastFrame=null,this.performanceWindow=0,this.performanceFrames=0,this.autoLow=!1,this.accumulator=0,this.clock=new U0,this.contextLost=!1,this.renderNeeded=!0,this.savingBlocked=!!this.loadStatus?.error&&!this.loadStatus?.unavailable,this.storageAvailable=!this.loadStatus?.unavailable,this.frameCount=0,this.fps=60,this.saveTimer=0,this.statsTimer=0,this.weatherNotice=0,this.settings={volume:.35,quality:"medium",adaptiveQuality:!0,pixelRatio:1.25,relaxed:!1,dynamicWeather:!0,showHints:!0,...this.saved?.settings},this.scene=new i0,this.renderer=new e0({antialias:!0,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(devicePixelRatio,1.25)),this.renderer.setSize(innerWidth,innerHeight),this.renderer.shadowMap.enabled=this.settings.quality!=="low",this.renderer.shadowMap.type=zc,this.renderer.toneMapping=Hc,this.renderer.toneMappingExposure=1.14,this.renderer.outputColorSpace=Ge,this.renderer.domElement.id="ocean-canvas",this.renderer.domElement.setAttribute("aria-label",yn.title+" 3D survival game. Use WASD to move and click to use your equipped tool."),this.renderer.domElement.tabIndex=0,document.getElementById("stage").appendChild(this.renderer.domElement),this.camera=new ei(48,innerWidth/innerHeight,.08,1200),this.cameraYaw=this.saved?.camera.yaw??-.35,this.cameraPitch=this.saved?.camera.pitch??.3,this.cameraDistance=this.saved?.camera.distance??10.5,this.cameraTarget=new Wt(.5,.7,.5),this.camera.position.set(7,6,10),this.raycaster=new R0,this.pointer=new xt(.12,.05),this.pointerScreen={x:innerWidth*.56,y:innerHeight*.52},this.aimPoint=new Wt(3,0,6),this.oceanPlane=new xi(new Wt(0,1,0),0),this.keys=new Set,this.mouse={down:!1,right:!1,dragged:!1,startX:0,startY:0},this.touchMove={x:0,y:0},this.gamepadButtons={},this.gamepadMove={x:0,y:0},this.inventory=new P0(this.bus,this.saved?.inventory||Th),this.stats=new I0(this.bus,this.saved?.stats),this.grid=new Rh(this.bus),this.crafting=new L0(this.inventory,this.bus),this.crafting.research=new Set(this.saved?.research||[]),this.time=new N0(this.bus,this.saved?.time),this.time.dynamic=this.settings.dynamicWeather,this.quickbar=[...this.saved?.quickbar||Eh],this.selectedSlot=this.saved?.camera.selectedSlot??0,this.buildType=this.saved?.camera.buildType??"foundation",this.buildRotation=this.saved?.camera.buildRotation??0,this.toolVisuals=new Map,this.dismantle=null,this.dismantleTarget=null,this.ghost=null,this.ghostCell=null,this.ghostValid=!1,this.helming=this.saved?.raft.helming??!1,this.anchored=this.saved?.raft.anchored??!1,this.autopilot=this.saved?.raft.autopilot??null,this.sailOpen=this.saved?.raft.sailOpen??!0,this.raftVelocity=new Wt().fromArray(this.saved?.raft.velocity??[0,0,-.12]),this.raftVerticalVelocity=this.saved?.raft.verticalVelocity??0,this.jobs=[],this.fires=new Map,this.reefDamageTimer=0,this.lightningCooldown=0,this.progress={salvaged:0,built:0,crafted:0,water:0,islands:0,caches:0,poi:0,secrets:0,journals:0,puzzles:0,sharks:0,rescued:!1,...this.saved?.progress},this.notebook=[...this.saved?.notebook||[]],this.quests=new Lv(this.bus,this.inventory,this.saved?.quests),this.ocean=new vv(this.scene),this.atmosphere=new bv(this.scene),this.world=new xv(this.scene,this.bus,this.saved?.world),this.debris=new yv(this.scene),this.particles=new Mv(this.scene),this.shark=new _v(this.scene,this.bus),this.audio=new Sv,this.audio.volume=this.settings.volume,this.raft=new kt,this.raft.position.fromArray(this.saved?.raft.position||[0,0,0]),this.saved&&this.raft.rotation.set(...this.saved.raft.rotation),this.scene.add(this.raft),this.blockMeshes=new Map,this.setupEvents(),this.createRaft(),this.player={position:new Wt().fromArray(this.saved?.player.position||[.5,.3,.8]),velocity:new Wt().fromArray(this.saved?.player.velocity||[0,0,0]),grounded:this.saved?.player.grounded??!0,onRaft:this.saved?.player.onRaft??!0,swimming:this.saved?.player.swimming??!1,heading:this.saved?.player.heading??2.8,anim:0,action:0,jumpCooldown:this.saved?.player.jumpCooldown??0,stingCooldown:this.saved?.player.stingCooldown??0,attackCooldown:this.saved?.player.attackCooldown??0},this.avatar=W0(),this.avatar.position.copy(this.player.position),this.avatar.rotation.y=this.player.heading,this.scene.add(this.avatar),this.crafting.resolveStation=e=>{const i=this.nearStation(e.station||"workbench",4);return i&&!this.jobs.some(n=>n.blockId===i.id)?Ae(i.x,i.y,i.z):null},this.equipVisual(),this.hook={mesh:Tc(),state:"idle",velocity:new Wt,time:0,charge:0,caught:null,origin:new Wt,target:new Wt},this.scene.add(this.hook.mesh),this.hook.mesh.visible=!1;const t=new ce;t.setAttribute("position",new ye(new Float32Array(99),3)),this.rope=new yh(t,new Xo({color:14207396,transparent:!0,opacity:.9})),this.rope.frustumCulled=!1,this.rope.visible=!1,this.scene.add(this.rope),this.fishing={state:"idle",time:0,biteAt:0,position:new Wt,float:new kt},this.fishing.float.add(de(.06,13003851,0,.02,0,8),de(.065,15328200,0,-.04,0,8)),this.fishing.float.visible=!1,this.scene.add(this.fishing.float),this.aimRing=new Yt(new Nr(.34,.365,48),new Ts({color:15329224,transparent:!0,opacity:.65,side:Ne,depthWrite:!1})),this.aimRing.rotation.x=-Math.PI/2,this.scene.add(this.aimRing),this.createGhost(),this.dismantleOutline=new C0(void 0,15252608),this.dismantleOutline.visible=!1,this.dismantleOutline.material.depthTest=!1,this.dismantleOutline.renderOrder=20,this.scene.add(this.dismantleOutline),this.threatRing=new Yt(new Nr(.58,.66,24),new Ts({color:13927265,transparent:!0,opacity:.9,depthWrite:!1,side:Ne})),this.threatRing.rotation.x=-Math.PI/2,this.threatRing.visible=!1,this.scene.add(this.threatRing),this.world.update(this.raft.position),this.reconcileIslandUpgrade(),this.debris.seed(this.raft.position),this.restoreReservations(),this.shark.restore(this.saved?.shark,this.grid);for(const e of this.saved?.salvage||[]){const i=this.debris.spawn(e.type,e.x,e.z);i.loot={...e.loot}}this.ui=new wv(this),this.monitor=new Dv(this),this.quality=new Iv(this),this.bindInput(),this.resize(),this.ready=!0,this.renderCamera(1),this.ui.update(!0),this.frame=this.frame.bind(this),requestAnimationFrame(this.frame),window.tidebound=this,window.tidebreak=this}setupEvents(){this.bus.on("blockAdded",e=>{this.hullDirty=!0;const i=Ec(e.type);i.position.set(e.x,e.y===0?0:.26+e.y-1,e.z),i.rotation.y=e.rotation*Math.PI/2,i.userData.block=e,i.traverse(n=>n.userData.block=e),e.mesh=i,e.type==="sail"&&(i.userData.sail.visible=this.sailOpen),this.blockMeshes.set(e.id,i),this.raft.add(i)});const t=e=>{if(this.hullDirty=!0,this.cancelReservationsFor(e),this.fires.delete(e.id),this.raft.remove(e.mesh),this.blockMeshes.delete(e.id),Ph(e.mesh),this.ready){const i=this.raft.localToWorld(new Wt(e.x,.2,e.z));this.particles.burst(i,12688231,20,1.5),e.dismantled||(this.dropReclaimed(e,i),this.ui.toast(`${Nt[e.type].name} broke away`,"foundation","warning"))}};this.bus.on("blockRemoved",t),this.bus.on("blockDetached",t),this.bus.on("blockRemoved",()=>{this.ready&&this.stats.alive&&![...this.grid.blocks.values()].some(e=>e.core)&&this.stats.damage(100)}),this.bus.on("blockDamaged",e=>{e.hp/Nt[e.type].hp<.6&&e.mesh&&e.mesh.traverse(i=>{i.isMesh&&!i.userData.damaged&&(i.userData.baseMaterial=i.material,i.material=i.material.clone(),i.material.userData={owned:!0},i.userData.baseColor=i.material.color.clone(),i.material.color.lerp(new Et(7687742),.26),i.userData.damaged=!0)})}),this.bus.on("damage",()=>{this.audio.play("damage"),this.ui?.damageFlash()}),this.bus.on("death",()=>{this.paused=!0,this.ui.death()}),this.bus.on("sting",()=>this.ui.toast("Jellyfish sting · movement slowed for 10s","lightning","warning")),this.bus.on("craftStarted",()=>this.audio.play("click")),this.bus.on("craftComplete",e=>{this.progress.crafted++,e.output==="water"&&this.progress.water++,this.audio.play("craft"),this.ui.toast(`${e.name} is ready`,wt[e.output]?.icon||"check","success"),this.ui.renderInventory()}),this.bus.on("researched",e=>{this.audio.play("discover"),this.ui.toast(`${Nt[_n[e].unlock].name} unlocked`,"research","success"),this.ui.renderInventory()}),this.bus.on("questComplete",e=>{this.ready&&(this.ui.toast(`${e.title} · journal updated`,"check","success"),this.ui.renderQuests())}),this.bus.on("weather",e=>{this.ready&&(this.ui.toast(si[e].label,e==="storm"?"storm":si[e].icon,e==="storm"?"warning":"info"),e==="storm"&&this.audio.play("warning"))}),this.bus.on("islandDiscovered",e=>{this.progress.islands++,this.ready&&(this.audio.play("discover"),this.ui.discover(e))}),this.bus.on("sharkWarning",()=>{this.audio.play("warning"),this.ui.toast("A shark is eyeing your foundations. Ready your spear.","spear","warning",6e3)}),this.bus.on("sharkCharge",()=>this.ui.toast("Shark charging! Strike now with your spear.","spear","warning",4e3)),this.bus.on("sharkBite",e=>{this.audio.play("damage"),this.particles.burst(this.raft.localToWorld(new Wt(e.x,.2,e.z)),13165784,22,2),this.ui.toast(`A foundation took ${this.shark.lastBiteDamage||20} damage · T to repair`,"repair","warning")}),this.bus.on("sharkHit",()=>{this.audio.play("damage"),this.ui.toast("Good hit! The shark is retreating.","spear","success")}),this.bus.on("sharkDefeated",()=>{this.progress.sharks++,this.inventory.grant({rawFish:3,scrap:1,...Math.random()<.3?{coral:1}:{}}),this.ui.toast("Shark repelled · +3 raw fish, +1 scrap, sometimes sea glass","fish","success")}),this.bus.on("inventory",()=>{this.ui?.renderQuickbar(),this.ui?.updateResources()}),this.bus.on("islandHint",e=>this.ui?.toast(e,"book","info",6500)),this.bus.on("resourceCollected",({type:e,island:i,resource:n})=>{if(this.audio.play("collect"),e==="cache"){this.inventory.grant({signal:1,copper:2,vine:3,wood:4,coconut:2}),this.progress.caches++;const r=Sc[(this.progress.caches-1)%Sc.length];this.notebook.push({...r,island:i.name}),this.ui.toast("Supply cache found · signal fragment + rare supplies","signal","success",6500),this.ui.showLore(r,i.name)}else if(e==="rune"){const r=i.puzzle.sequence.filter(a=>this.world.collected.has(`${i.id}:explore:rune${a}`)).length;this.ui.toast(`${n.name} answered · ${r} / 3`,"sun","success"),r===3&&(this.progress.puzzles++,this.ui.toast("The grotto latch opens. Return beyond the overlook.","backpack","success",7e3))}else if(e==="journal"||e==="treasure"){n.loot&&this.inventory.grant(n.loot),e==="journal"?this.progress.journals++:this.progress.secrets++;const r={title:n.name,text:n.story};this.notebook.push({...r,island:i.name}),this.ui.toast(e==="journal"?"Trail journal recorded":"Hidden provisions recovered",e==="journal"?"book":"backpack","success"),this.ui.showLore(r,i.name)}else if(e==="poi"){this.inventory.grant(n.loot),this.progress.poi++;const r={title:n.name,text:n.story};this.notebook.push({...r,island:i.name}),this.ui.toast(`${n.name} · a finite discovery`,"compass","success"),this.ui.showLore(r,i.name)}else{const r=n.amount??(e==="copper"?2:e==="vine"?3:e==="wood"?4:2);this.inventory.add(e,r),this.ui.toast(`+${r} ${wt[e].name}`,wt[e].icon,"success")}})}createRaft(){if(this.saved?.blocks?.length)for(const i of this.saved.blocks)this.grid.add(i.type,i.x,i.y,i.z,i.core,i.hp,{rotation:i.rotation||0,production:i.production||0});else{for(let i=-1;i<=2;i++)for(let n=-1;n<=2;n++)this.grid.add("foundation",i,0,n,(i===0||i===1)&&(n===0||n===1));this.grid.add("sail",-1,1,-1),this.grid.add("workbench",2,1,-1),this.grid.add("purifier",-1,1,2),this.grid.add("grill",2,1,2)}const t=new kt;for(const[i,n]of[[-1.45,-1.45],[2.45,-1.45],[-1.45,2.45],[2.45,2.45]])t.add(Pt(.027,.038,.42,8873798,i,.38,n),Pt(.045,.045,.035,13810571,i,.51,n));const e=ot(.4,.13,.025,14075292,.5,.4,2.46);t.add(e),this.raft.add(t);for(const i of this.grid.blocks.values())i.type==="sail"&&(i.mesh.userData.sail.visible=this.sailOpen)}start(){this.started||(this.started=!0,this.clock.reset(),this.lastFrame=null,this.audio.init(),this.ui.start(),this.ui.toast(this.saved?"Welcome back, castaway. Your raft is just as you left it.":"Welcome aboard. Hold the mouse to cast your hook.","anchor","info",5e3),this.loadStatus?.migrated&&this.ui.toast("Original voyage migrated safely. The old save is retained as a backup.","save","success",7e3),this.loadStatus?.compensatedBlocks&&this.ui.toast(`${this.loadStatus.compensatedBlocks} unsupported old structure(s) converted back into their full building materials.`,"backpack","success",9e3),this.savingBlocked?this.ui.toast("The local save could not be read. It will not be overwritten. Use Settings to restore a backup or import.","save","warning",1e4):this.storageAvailable||this.ui.toast("Browser storage is unavailable in this preview. Export your voyage to keep it.","save","warning",8e3))}readSave(){try{this.loadStatus=Cv(localStorage)}catch(t){this.loadStatus={data:null,unavailable:!0,error:t.message}}return this.loadStatus.data}snapshot(){const t=new Map([...this.grid.blocks.values()].map(i=>[i.id,i])),e=(i,n)=>{const r=i.blockId?t.get(i.blockId):this.grid.blocks.get(i.stationKey)||[...this.grid.blocks.values()].find(a=>a.type===(i.recipe.station||"workbench"));return{recipeId:i.recipe.id,stationKey:r?Ae(r.x,r.y,r.z):"",variant:i.recipe.id==="water"&&!Object.keys(i.recipe.ingredients).length?"rain":"default",[n]:i[n]}};return Mn({version:yn.saveVersion,game:"tosins-tidebound",savedAt:Date.now(),simTime:this.simTime,inventory:this.inventory.toJSON(),stats:this.stats.toJSON(),blocks:this.grid.toJSON(),research:[...this.crafting.research],time:this.time.toJSON(),raft:{position:this.raft.position.toArray(),rotation:[this.raft.rotation.x,this.raft.rotation.y,this.raft.rotation.z],velocity:this.raftVelocity.toArray(),verticalVelocity:this.raftVerticalVelocity,anchored:this.anchored,sailOpen:this.sailOpen,helming:this.helming,autopilot:this.autopilot},player:{position:this.player.position.toArray(),velocity:this.player.velocity.toArray(),heading:this.player.heading,grounded:this.player.grounded,onRaft:this.player.onRaft,swimming:this.player.swimming,jumpCooldown:this.player.jumpCooldown,stingCooldown:this.player.stingCooldown,attackCooldown:this.player.attackCooldown},camera:{yaw:this.cameraYaw,pitch:this.cameraPitch,distance:this.cameraDistance,selectedSlot:this.selectedSlot,buildType:this.buildType,buildRotation:this.buildRotation},crafting:this.crafting.job?e(this.crafting.job,"elapsed"):null,stationJobs:this.jobs.map(i=>e(i,"time")),fires:[...this.fires].filter(([i])=>t.has(i)).map(([i,n])=>{const r=t.get(i);return{key:Ae(r.x,r.y,r.z),timer:n.timer}}),salvage:this.debris.active.filter(i=>i.loot).map(i=>({type:i.type,x:i.x,z:i.z,loot:{...i.loot}})),shark:this.shark.toJSON(this.grid),world:this.world.toJSON(),progress:{...this.progress},quests:this.quests.toJSON(),notebook:this.notebook,quickbar:[...this.quickbar],settings:{...this.settings}})}save(t=!1){if(this.suppressUnloadSave||!this.started||!this.stats.alive)return!1;let e;try{e=this.snapshot()}catch(i){return t&&this.ui.toast(`Save was not changed: ${i.message}`,"save","warning",8e3),console.warn("Save validation:",i.message),!1}if(this.savingBlocked)return t&&this.ui.toast("Your unreadable save is protected. Export this temporary voyage or restore/import a backup.","save","warning"),e;try{za(localStorage,e),this.storageAvailable=!0,this.ui.savedAt=performance.now(),t&&this.ui.toast("Voyage saved on this device","save","success")}catch{this.storageAvailable=!1,t&&this.ui.toast("Storage is unavailable or full. Export your save instead.","save","warning")}return e}newGame(){this.suppressUnloadSave=!0;try{for(const t of[Us,kr,Ko,Zo])localStorage.removeItem(t)}catch{}location.reload()}exportSave(){const t=this.save(!1);if(!t){this.ui.toast("Begin a living voyage before saving","save");return}const e=new Blob([JSON.stringify(t,null,2)],{type:"application/json"}),i=URL.createObjectURL(e),n=document.createElement("a");n.href=i,n.download="tosins-tidebound-voyage-v2.json",n.click(),setTimeout(()=>URL.revokeObjectURL(i),1e3)}async importSave(t){try{if(t.size>Jo)throw Error("Save files must be smaller than 2 MB.");const e=await t.text();this.pendingImport=Mn(e);const i=JSON.parse(e),n=i.version===1?i.blocks.length-this.pendingImport.blocks.length:0;return this.ui.confirmImport(this.pendingImport,!1,n),!0}catch(e){return this.pendingImport=null,this.ui.toast(`Import rejected: ${e.message}`,"save","warning",8e3),!1}}commitImport(){try{const t=Mn(this.pendingImport);if(this.started&&this.stats.alive&&!this.savingBlocked){const e=this.snapshot();za(localStorage,e)}return za(localStorage,t,{importing:!0}),this.pendingImport=null,this.suppressUnloadSave=!0,location.reload(),!0}catch(t){return this.ui.toast(`Import was not applied: ${t.message}`,"save","warning",8e3),!1}}getBackup(){try{return Pv(localStorage)}catch{return null}}restoreBackup(){const t=this.getBackup();return t?(this.pendingImport=t.data,this.ui.confirmImport(t.data,!0),!0):(this.ui.toast("No valid local backup was found","save","warning"),!1)}restoreReservations(){const t=this.saved;if(t){t.crafting&&(this.crafting.job={recipe:Lo(t.crafting),elapsed:t.crafting.elapsed,stationKey:t.crafting.stationKey});for(const e of t.stationJobs){const i=this.grid.blocks.get(e.stationKey);this.jobs.push({blockId:i.id,recipe:Lo(e),time:e.time})}for(const e of t.fires){const i=this.grid.blocks.get(e.key);this.fires.set(i.id,{timer:e.timer})}}}beginCraft(t){const e=this.nearStation(t.station||"workbench",4);return e&&this.jobs.some(i=>i.blockId===e.id)?{ok:!1,reason:"That workstation is already busy"}:this.crafting.start(t,!!e,e?Ae(e.x,e.y,e.z):null)}cancelStationJob(t,e=!0){const i=this.jobs.findIndex(r=>r.blockId===t);if(i<0)return!1;const[n]=this.jobs.splice(i,1);return this.inventory.grant(n.recipe.ingredients),e&&this.ui?.toast("Work interrupted · reserved ingredients returned","backpack"),!0}cancelReservationsFor(t){const e=Ae(t.x,t.y,t.z);this.crafting.job?.stationKey===e&&(this.crafting.cancel(),this.ui?.toast("Workbench removed · crafting ingredients returned","backpack")),this.cancelStationJob(t.id,this.ready)}dropReclaimed(t,e){const i=this.debris.active.filter(r=>r.loot);let n=i.length>=12?i[0]:this.debris.spawn("wood",e.x,e.z);n.loot??(n.loot={});for(const[r,a]of Object.entries(Nt[t.type].cost))n.loot[r]=(n.loot[r]||0)+Math.max(1,Math.floor(a/2))}clearInput(){this.keys.clear(),this.mouse.down=!1,this.mouse.right=!1,this.mouse.dragged=!1,this.touchMove={x:0,y:0},this.gamepadMove={x:0,y:0},this.gamepadButtons={},this.gamepadRequireNeutral=!0,this.touchCameraStart=null,this.dismantle=null,this.ui?.resetTouch?.(),this.hook?.state==="charging"&&(this.hook.state="idle")}suspend(){this.clearInput(),this.clock.reset(),this.lastFrame=null,this.monitor?.resetWindow(),this.started&&!this.paused&&(this.save(),this.ui.openModal("pause"))}setPaused(t){this.contextLost&&!t||(this.renderNeeded=!0,this.paused=t,this.clearInput(),this.clock.reset(),this.lastFrame=null,t||this.renderer.domElement.focus({preventScroll:!0}))}applyQuality(t=this.activeQuality){this.quality?.apply(t)}selectSlot(t){this.selectedSlot=(t+8)%8,this.hook?.state==="charging"&&(this.hook.state="idle"),this.cancelFishing(),this.equipVisual(),this.ui.renderQuickbar(),this.ui.renderBuildBar(),this.audio.play("click")}get equipped(){return this.quickbar[this.selectedSlot]}equipVisual(){if(!this.avatar)return;const t=this.avatar.userData.tool;if(t.clear(),this.toolVisuals.has(this.equipped)){t.add(this.toolVisuals.get(this.equipped));return}let e;switch(this.equipped){case"hook":e=Tc(),e.rotation.z=.4;break;case"hammer":e=new kt,e.add(Pt(.025,.025,.4,10318924),ot(.22,.13,.11,8295046,0,.2,0));break;case"spear":e=G0(),e.scale.setScalar(.7),e.rotation.x=.6;break;case"paddle":e=V0(),e.scale.setScalar(.7),e.rotation.x=.2;break;case"fishingRod":e=new kt,e.add(Pt(.012,.02,1.35,12296564,0,.5,0)),e.rotation.x=.5;break;case"water":e=Pt(.065,.065,.19,8630702);break;case"cookedFish":e=Ih(!0),e.scale.setScalar(.45);break;case"coconut":e=de(.12,10650969);break}e&&(this.toolVisuals.set(this.equipped,e),t.add(e))}bindInput(){const t=this.renderer.domElement;window.addEventListener("resize",()=>this.resize()),window.addEventListener("blur",()=>this.suspend()),document.addEventListener("visibilitychange",()=>{document.hidden?this.suspend():(this.clock.reset(),this.lastFrame=null)}),t.addEventListener("webglcontextlost",e=>{e.preventDefault(),this.contextLost=!0,this.suspend(),this.ui.openModal("context-lost")}),t.addEventListener("webglcontextrestored",()=>{this.contextLost=!1,this.applyQuality(),this.clock.reset(),this.lastFrame=null,this.ui.openModal("pause"),this.ui.toast("Graphics context restored. Your voyage is safe; resume when ready.","check","success")}),window.addEventListener("keydown",e=>{if(e.target.closest?.('input,textarea,select,[contenteditable]:not([contenteditable="false"])'))return;const i=e.key.toLowerCase();if([" ","tab","arrowup","arrowdown","arrowleft","arrowright"].includes(i)&&e.preventDefault(),!e.repeat){if(i==="f3"){e.preventDefault(),this.monitor.toggle();return}if(i==="tab"||i==="i"){this.ui.modal==="inventory"?this.ui.closeModal():this.ui.openModal("inventory");return}if(i==="escape"){this.ui.modal?this.ui.closeModal():this.ui.openModal("pause");return}if(i==="m"){this.ui.openModal("map");return}if(i==="j"){this.ui.openModal("journal");return}if(i==="h"){this.ui.toggleHUD();return}if(i==="?"||i==="f1"){e.preventDefault(),this.ui.openModal("help");return}if(!this.paused){if(this.start(),this.keys.add(i),/^[1-8]$/.test(i)){this.selectSlot(Number(i)-1);return}i==="q"&&this.selectSlot(this.selectedSlot-1),i==="e"&&this.selectSlot(this.selectedSlot+1),i==="r"&&(this.buildRotation=(this.buildRotation+1)%4,this.ghost&&(this.ghost.rotation.y=this.buildRotation*Math.PI/2)),i==="f"&&this.interact(),i==="g"&&this.toggleHelm(),i==="x"&&this.removeTargetBlock(),i==="t"&&this.repairBlock(),(i==="+"||i==="=")&&(this.cameraDistance=ve(this.cameraDistance-1,5,20)),i==="-"&&(this.cameraDistance=ve(this.cameraDistance+1,5,20))}}}),window.addEventListener("keyup",e=>{this.keys.delete(e.key.toLowerCase()),e.key.toLowerCase()==="x"&&(this.dismantle=null)}),t.addEventListener("pointercancel",()=>this.clearInput()),t.addEventListener("contextmenu",e=>e.preventDefault()),t.addEventListener("pointerdown",e=>{this.paused||(this.start(),this.audio.init(),t.focus({preventScroll:!0}),this.updatePointer(e),this.mouse.startX=e.clientX,this.mouse.startY=e.clientY,this.mouse.dragged=!1,e.button===2?this.mouse.right=!0:e.button===0&&(this.mouse.down=!0,this.equipped==="hook"&&this.hook.state==="idle"?(this.hook.state="charging",this.hook.charge=.22):this.primaryAction()),e.pointerType==="touch"&&(this.touchCameraStart={x:e.clientX,y:e.clientY}))}),window.addEventListener("pointermove",e=>{if((e.target===t||this.mouse.right)&&this.updatePointer(e),this.mouse.right&&!this.paused){const i=e.clientX-this.mouse.startX,n=e.clientY-this.mouse.startY;Math.abs(i)+Math.abs(n)>3&&(this.mouse.dragged=!0),this.cameraYaw-=i*.006,this.cameraPitch=ve(this.cameraPitch+n*.004,.12,1.2),this.mouse.startX=e.clientX,this.mouse.startY=e.clientY}if(e.pointerType==="touch"&&this.mouse.down&&e.target===t&&this.touchCameraStart){const i=e.clientX-this.touchCameraStart.x,n=e.clientY-this.touchCameraStart.y;Math.abs(i)+Math.abs(n)>8&&(this.cameraYaw-=i*.004,this.cameraPitch=ve(this.cameraPitch+n*.003,.12,1.1),this.touchCameraStart={x:e.clientX,y:e.clientY},this.mouse.dragged=!0)}}),window.addEventListener("pointerup",e=>{e.button===2?(this.mouse.right&&!this.mouse.dragged&&!this.paused&&this.equipped==="hammer"&&this.placeBlock(),this.mouse.right=!1):e.button===0&&(this.hook.state==="charging"&&(!this.paused&&!this.mouse.dragged?this.castHook():this.hook.state="idle"),this.mouse.down=!1,this.touchCameraStart=null)}),t.addEventListener("wheel",e=>{e.preventDefault(),!this.paused&&(e.shiftKey?this.cameraDistance=ve(this.cameraDistance+e.deltaY*.008,5,22):this.selectSlot(this.selectedSlot+(e.deltaY>0?1:-1)))},{passive:!1}),window.addEventListener("beforeunload",()=>this.save())}updatePointer(t){this.pointerScreen={x:t.clientX,y:t.clientY},this.pointer.set(t.clientX/innerWidth*2-1,-t.clientY/innerHeight*2+1)}resize(){this.camera.aspect=innerWidth/innerHeight,this.camera.updateProjectionMatrix(),this.renderer.setSize(innerWidth,innerHeight),this.renderNeeded=!0,this.ui?.resize()}primaryAction(){if(this.paused)return;const t=this.equipped;t==="hook"?this.hook.state!=="idle"&&(this.hook.state="reeling"):t==="hammer"?this.placeBlock():t==="spear"?this.attack():t==="paddle"?this.paddle():t==="fishingRod"?this.fish():wt[t]?.consumable?this.stats.consume(t,this.inventory)?(this.player.action=.5,this.audio.play("collect"),this.ui.toast(`${wt[t].name} · ${wt[t].thirst?`+${wt[t].thirst} thirst`:`+${wt[t].hunger} hunger`}`,wt[t].icon,"success")):this.ui.toast(`No ${wt[t].name.toLowerCase()} left. Open crafting with Tab.`,wt[t].icon,"warning"):this.ui.toast("Select a tool or consumable from your quickbar","info")}castHook(){const t=this.hook;this.avatar.userData.tool.getWorldPosition(t.origin),t.mesh.position.copy(t.origin),t.target.copy(this.aimPoint),t.target.y=.02;const e=t.target.clone().sub(t.origin);e.y=0;const i=7+t.charge*20;e.length()>i&&t.target.copy(t.origin).add(e.normalize().multiplyScalar(i)).setY(.02);let n=1.65;for(const o of this.debris.active){const l=Math.hypot(o.x-t.target.x,o.z-t.target.z);l<n&&t.origin.distanceTo(o.mesh.position)<i+1&&(n=l,t.target.copy(o.mesh.position))}const r=Math.hypot(t.target.x-t.origin.x,t.target.z-t.origin.z),a=ve(r/12,.4,1.7);t.velocity.copy(t.target).sub(t.origin).divideScalar(a),t.velocity.y+=.5*8*a,t.state="flying",t.time=0,t.mesh.visible=!0,this.rope.visible=!0,this.avatar.userData.tool.visible=!1,this.player.action=.5,this.audio.play("hook")}updateHook(t){const e=this.hook;if(e.state==="charging"){e.charge=ve(e.charge+t*.6,.22,1);return}if(e.state==="idle")return;e.time+=t;const i=this.avatar.userData.tool.getWorldPosition(new Wt);if(e.state==="flying"){e.velocity.y-=8*t,e.mesh.position.addScaledVector(e.velocity,t),e.mesh.rotation.z+=t*5;const n=this.debris.nearest(e.mesh.position,.85);n?(e.caught=n,n.hooked=!0,e.state="reeling",this.audio.play("splash"),this.particles.burst(n.mesh.position,14215637,10,.9)):e.mesh.position.y<=vi(e.mesh.position.x,e.mesh.position.z,this.simTime)+.03&&(e.mesh.position.y=.06,e.state="floating",e.time=0,this.audio.play("splash"),this.particles.burst(e.mesh.position,14872032,8,.8)),e.mesh.position.distanceTo(i)>28&&(e.state="reeling")}if(e.state==="floating"){e.mesh.position.y=vi(e.mesh.position.x,e.mesh.position.z,this.simTime)+.05;const n=this.debris.nearest(e.mesh.position,1.2);n&&(e.caught=n,n.hooked=!0,e.state="reeling"),e.time>.75&&(e.state="reeling")}if(e.state==="reeling"){const n=i.clone().sub(e.mesh.position),r=n.length();e.mesh.position.addScaledVector(n.normalize(),Math.min(t*12,r)),e.caught&&(e.caught.mesh.position.copy(e.mesh.position).add(new Wt(0,-.08,0)),e.caught.x=e.mesh.position.x,e.caught.z=e.mesh.position.z),r<.5&&(e.caught&&this.collectDebris(e.caught),e.caught=null,e.state="idle",e.mesh.visible=!1,this.rope.visible=!1,this.avatar.userData.tool.visible=!0)}e.state!=="idle"&&this.updateRope(i,e.mesh.position,e.state==="reeling"?.12:.5)}collectDebris(t,e=!1){if(!this.debris.active.includes(t))return!1;if(t.loot)this.inventory.grant(t.loot),this.ui.toast("Reclaimed supplies from your raft","wood","success");else if(t.type==="barrel")this.inventory.grant({wood:3,plastic:2,scrap:2,[Math.random()>.5?"leaf":"rawFish"]:2}),this.ui.toast("Supply barrel · timber, plastic, scrap + a little extra","backpack","success");else{const i=t.type==="wood"?3:2;this.inventory.add(t.type,i),this.ui.toast(`+${i} ${wt[t.type].name}`,wt[t.type].icon,"success")}this.progress.salvaged++,this.particles.burst(t.mesh.position,14996642,12,.7),this.debris.release(t),this.audio.play("collect")}updateRope(t,e,i){const n=this.rope.geometry.attributes.position.array;for(let r=0;r<=32;r++){const a=r/32;n[r*3]=Me.lerp(t.x,e.x,a),n[r*3+1]=Me.lerp(t.y,e.y,a)-Math.sin(a*Math.PI)*i,n[r*3+2]=Me.lerp(t.z,e.z,a)}this.rope.geometry.attributes.position.needsUpdate=!0}fish(){const t=this.fishing;if(t.state==="idle"){if(this.hook.state!=="idle"){this.ui.toast("Reel your hook in first","hook");return}t.position.copy(this.aimPoint);const e=t.position.clone().sub(this.player.position);e.y=0,e.length()>12&&t.position.copy(this.player.position).addScaledVector(e.normalize(),12),t.position.y=.02,t.state="waiting",t.time=0,t.biteAt=4+Math.random()*5,t.float.visible=!0,t.float.position.copy(t.position),this.rope.visible=!0,this.audio.play("splash"),this.ui.toast("Line cast. Wait for the float to dip…","fishing")}else t.state==="bite"?(this.inventory.add("rawFish",1),this.audio.play("collect"),this.ui.toast("A fine catch! +1 raw fish","fish","success"),this.particles.burst(t.float.position,13165262,14,1),this.cancelFishing()):(this.ui.toast("Nothing on the line yet. Try again.","fishing"),this.cancelFishing())}updateFishing(t){const e=this.fishing;e.state!=="idle"&&(e.time+=t,e.float.position.copy(e.position),e.float.position.y=vi(e.position.x,e.position.z,this.simTime)+.07+(e.state==="bite"?Math.sin(this.simTime*22)*.07:0),e.state==="waiting"&&e.time>=e.biteAt?(e.state="bite",e.time=0,this.ui.toast("A bite! Click now to reel it in.","fish","success",3e3),this.audio.play("collect")):e.state==="bite"&&e.time>3&&(this.ui.toast("That one got away. Cast again.","fish"),this.cancelFishing()),e.state!=="idle"&&(this.rope.visible=!0,this.updateRope(this.avatar.userData.tool.getWorldPosition(new Wt),e.float.position,.2)))}cancelFishing(){this.fishing&&(this.fishing.state="idle",this.fishing.float.visible=!1,this.hook?.state==="idle"&&(this.rope.visible=!1))}attack(){if(this.player.attackCooldown>0)return!1;if(this.player.attackCooldown=.65,this.player.action=.55,this.audio.play("hook"),this.player.position.distanceTo(this.shark.position)<4.2&&this.shark.mesh.visible){if(!this.shark.hit())return!1;this.particles.burst(this.shark.position.clone().add(new Wt(0,.2,0)),14804942,18,1.7)}else this.ui.toast("Spear thrust · get closer to the shark","spear","info",1400)}paddle(){if(!this.player.onRaft){this.ui.toast("Climb aboard your raft to paddle","paddle");return}this.anchored=!1,this.autopilot=null;const t=this.aimPoint.clone().sub(this.raft.position).setY(0).normalize();this.raftVelocity.addScaledVector(t,1.2),this.raftVelocity.length()>2.8&&this.raftVelocity.setLength(2.8),this.player.action=.55,this.audio.play("splash"),this.particles.burst(this.player.position.clone().setY(.1),13887705,9,.7)}toggleHelm(){if(!this.player.onRaft){this.ui.toast("Return to your raft to take the helm","sail");return}this.helming=!this.helming,this.autopilot=null,this.anchored=!1,this.ui.toast(this.helming?"At the helm · WASD to steer · G to let go":"Back on deck · the currents are in charge","sail")}hull(){if(!this.hullDirty&&this.hullSamples)return this.hullSamples;const t=new Map,e=Math.cos(this.raft.rotation.y),i=Math.sin(this.raft.rotation.y),n=(r,a)=>{const o={x:r*e+a*i,z:a*e-r*i};t.set(`${r},${a}`,o)};for(const r of this.grid.blocks.values())if(Nt[r.type].buoyant){n(r.x,r.z);for(const[a,o]of[[-.48,-.48],[.48,-.48],[-.48,.48],[.48,.48]])n(r.x+a,r.z+o)}return this.hullSamples=[...t.values()],this.hullRadius=this.hullSamples.reduce((r,a)=>Math.max(r,Math.hypot(a.x,a.z)),1),this.hullDirty=!1,this.hullSamples}reconcileIslandUpgrade(){if(!(!this.saved||this.saved.world.generationVersion>=3)){if(this.hull(),this.islandRecovery={raft:!1,player:!1},this.world.boatContact(this.raft.position,this.hullSamples)){const t=[...this.world.islands].sort((i,n)=>Math.hypot(i.x-this.raft.position.x,i.z-this.raft.position.z)-Math.hypot(n.x-this.raft.position.x,n.z-this.raft.position.z))[0],e=t&&this.world.dockFor(t,this.hullRadius+1);if(e){const i=new Wt(e.x-this.raft.position.x,0,e.z-this.raft.position.z);this.raft.position.add(i),this.player.onRaft&&this.player.position.add(i),this.raftVelocity.set(0,0,0),this.anchored=!0,this.raft.updateMatrixWorld(!0),this.islandRecovery.raft=!0}}if(!this.player.onRaft){const t=this.player.position,e=this.world.islands.find(i=>Math.hypot(t.x-i.x,t.z-i.z)<i.radius*1.3);if(e&&!this.player.swimming){const i=e.nav.closest({x:t.x-e.x,z:t.z-e.z},!0);if(i>=0){const n=e.nav.point(i);t.set(e.x+n.x,n.y,e.z+n.z),this.player.velocity.set(0,0,0),this.player.grounded=!0,this.player.swimming=!1,this.islandRecovery.player=!0}}}if(this.autopilot){const t=this.world.islands.find(e=>e.id===this.autopilot.id);if(t){const e=this.world.dockFor(t,this.hullRadius);Object.assign(this.autopilot,e,{radius:1,dock:!0})}}this.avatar.position.copy(this.player.position)}}setCourse(t){this.hull();const e=this.world.dockFor(t,this.hullRadius);this.autopilot={id:t.id,name:t.name,x:e.x,z:e.z,radius:1,dock:!0},this.helming=!1,this.anchored=!1,this.ui.closeModal(),this.ui.toast(`Course set for ${t.name} · following a sheltered approach · G for manual steering`,"compass","success",5500)}interact(){const t=this.nearFire();if(t){this.inventory.remove("water")?(this.fires.delete(t.id),this.ui.toast("Fire extinguished","water","success")):this.ui.toast("You need fresh water to put out this fire","water","warning");return}const e=this.world.nearestResource(this.player.position);if(e){this.world.collect(e,this.player.position);return}const i=this.nearStation();if(i){if(i.type==="sail")this.setSailOpen(!this.sailOpen),this.ui.toast(this.sailOpen?"Sail unfurled · following the trade winds":"Sail furled · drifting slowly","sail");else if(i.type==="workbench")this.ui.openModal("inventory");else if(i.type==="purifier"||i.type==="grill"){if(this.jobs.some(o=>o.blockId===i.id)||this.crafting.job?.stationKey===Ae(i.x,i.y,i.z)){this.ui.toast("Still working. Give it a few seconds.","sun");return}const n=Xi.find(o=>o.id===(i.type==="purifier"?"water":"cookedFish")),r=i.type==="purifier"&&["rain","storm"].includes(this.time.weather),a=r?{...n,ingredients:{},name:"Collected rainwater"}:n;if(!this.inventory.spend(a.ingredients)){this.ui.toast(i.type==="grill"?"You need one raw fish and one driftwood":"You need one driftwood to light the purifier","wood","warning");return}this.jobs.push({blockId:i.id,recipe:a,time:0}),this.audio.play("build"),this.ui.toast(r?"Collecting rainwater · ready in 8 seconds":i.type==="purifier"?"Purifying seawater · ready in 8 seconds":"Fish on the grill · ready in 8 seconds",i.type,"info")}else i.type==="windcatcher"?this.toggleHelm():i.type==="rainCollector"?this.ui.toast("Rain collector · one water per 35 seconds of rain · reserve limit 30","water"):i.type==="beacon"&&this.rescue();return}this.ui.toast("F interacts with nearby workstations and island supplies","info")}setSailOpen(t){this.sailOpen=!!t;for(const e of this.grid.blocks.values())e.type==="sail"&&(e.mesh.userData.sail.visible=this.sailOpen)}nearStation(t=null,e=1.9){let i=null,n=e;for(const r of this.grid.blocks.values()){if(!Nt[r.type].station||t&&r.type!==t)continue;const o=this.raft.localToWorld(new Wt(r.x,.5,r.z)).distanceTo(this.player.position);o<n&&(n=o,i=r)}return i}hasStation(t="workbench",e=4){return!!this.nearStation(t,e)}nearFire(){for(const[t]of this.fires){const e=[...this.grid.blocks.values()].find(i=>i.id===t);if(e&&this.raft.localToWorld(new Wt(e.x,0,e.z)).distanceTo(this.player.position)<2)return e}return null}createGhost(){this.ghost&&this.scene.remove(this.ghost),this.ghostMaterial??(this.ghostMaterial=new Ts({color:9423792,transparent:!0,opacity:.48,depthWrite:!1})),this.ghost=Ec(this.buildType),this.ghost.traverse(t=>{t.isMesh&&(t.material=this.ghostMaterial,t.castShadow=!1,t.receiveShadow=!1)}),this.ghost.visible=!1,this.scene.add(this.ghost)}chooseBuild(t){this.buildType=t,this.createGhost(),this.equipped!=="hammer"&&this.selectSlot(1),this.ui.renderBuildBar(),this.ui.closeModal()}targetBlock(){this.raft.updateMatrixWorld(!0),this.raycaster.setFromCamera(this.pointer,this.camera);const t=this.raycaster.intersectObjects([...this.blockMeshes.values()],!0).find(n=>n.object.userData.block),e=new Wt,i=new xi(new Wt(0,1,0),-(this.raft.position.y+.26));if(this.raycaster.ray.intersectPlane(i,e)){const n=e.clone().sub(this.raft.position),r=this.grid.at(Math.round(n.x),0,Math.round(n.z));if(r&&Nt[r.type].buoyant&&(!t||t.distance>this.raycaster.ray.origin.distanceTo(e)+.08))return r}return t?.object.userData.block||null}updateBuilding(){if(this.ghost.visible=this.equipped==="hammer"&&!this.paused&&this.started,!this.ghost.visible)return;this.raycaster.setFromCamera(this.pointer,this.camera);const t=new xi(new Wt(0,1,0),-(this.raft.position.y+.26)),e=new Wt;if(!this.raycaster.ray.intersectPlane(t,e))return;const i=e.clone().sub(this.raft.position);let n=Math.round(i.x),r=Math.round(i.z),a=0;if(Nt[this.buildType].buoyant){if(this.grid.at(n,0,r)){const h=i.x-n,c=i.z-r;Math.abs(h)>Math.abs(c)?n+=h>0?1:-1:r+=c>0?1:-1}}else{const h=this.targetBlock();h?(n=h.x,r=h.z,a=h.y+1,Nt[h.type].station&&(a=h.y)):a=1}this.ghostCell={x:n,y:a,z:r};const l=this.grid.canPlace(this.buildType,n,a,r,this.crafting.research);this.ghostValid=l.valid&&this.inventory.has(Nt[this.buildType].cost)&&this.player.position.distanceTo(this.raft.position.clone().add(new Wt(n,0,r)))<8,this.ghostReason=l.valid?this.inventory.has(Nt[this.buildType].cost)?this.ghostValid?"Ready to build":"Too far from the raft":"Not enough materials":l.reason,this.ghost.position.set(this.raft.position.x+n,this.raft.position.y+(a===0?0:.26+a-1),this.raft.position.z+r),this.ghost.rotation.y=this.buildRotation*Math.PI/2,this.ghostMaterial.color.setHex(this.ghostValid?9227689:14383459)}placeBlock(){if(this.paused||this.equipped!=="hammer")return!1;if(!this.ghostCell){this.ui.toast("Point at an edge of your raft to build","hammer");return}if(this.updateBuilding(),!this.ghostValid){this.ui.toast(this.ghostReason||"Find a connected, empty space","hammer","warning");return}const{x:t,y:e,z:i}=this.ghostCell;this.inventory.spend(Nt[this.buildType].cost)&&(this.grid.add(this.buildType,t,e,i,!1,null,{rotation:this.buildRotation}),this.progress.built++,this.audio.play("build"),this.particles.burst(this.ghost.position.clone().add(new Wt(0,.3,0)),14272153,16,.9),this.ui.toast(`${Nt[this.buildType].name} built`,"hammer","success",2e3))}removalStatus(t){if(!t)return{ok:!1,reason:"Point at a structure to dismantle it"};if(this.equipped!=="hammer")return{ok:!1,reason:"Equip the hammer before dismantling"};if(t.core)return{ok:!1,reason:"Core foundation · protected"};if(this.raft.localToWorld(new Wt(t.x,t.y,t.z)).distanceTo(this.player.position)>4)return{ok:!1,reason:"Move within four meters to dismantle"};const e=this.grid.previewRemoval(t);return{ok:!0,detached:e,reason:e.length?`${e.length} connected structure${e.length===1?"":"s"} will detach`:"Some materials will be returned",duration:e.length?1600:950}}removeTargetBlock(){const t=this.targetBlock(),e=this.removalStatus(t);return e.ok?(this.dismantle={id:t.id,key:Ae(t.x,t.y,t.z),start:performance.now(),duration:e.duration,detached:e.detached.length},this.ui.toast(`Keep holding X · ${e.reason}`,"hammer",e.detached.length?"warning":"info",2200),!0):(this.ui.toast(e.reason,"hammer","warning"),!1)}updateDismantle(t){const i=this.started&&!this.paused&&this.equipped==="hammer"?this.targetBlock():null;if(this.dismantleTarget=i,this.dismantleOutline.visible=!!i,i&&(this.dismantleOutline.setFromObject(i.mesh),this.dismantleOutline.material.color.setHex(i.core?8635824:15252608)),!!this.dismantle){if(!this.keys.has("x")||!i||i.id!==this.dismantle.id||!this.removalStatus(i).ok){this.dismantle=null;return}t-this.dismantle.start>=this.dismantle.duration&&(i.dismantled=!0,this.dismantle=null,this.grid.remove(i.x,i.y,i.z),this.inventory.grant(Object.fromEntries(Object.entries(Nt[i.type].cost).map(([n,r])=>[n,Math.max(1,Math.floor(r/2))]))),this.audio.play("build"),this.ui.toast("Dismantled safely · partial materials returned; detached supplies float nearby","hammer","success"))}}repairBlock(){const t=this.targetBlock();if(t){if(this.raft.localToWorld(new Wt(t.x,t.y,t.z)).distanceTo(this.player.position)>4){this.ui.toast("Move within four meters to repair","repair","warning");return}if(t.hp>=Nt[t.type].hp){this.ui.toast("This structure is in good shape","repair");return}if(!this.inventory.remove("wood")){this.ui.toast("One driftwood needed for repairs","wood","warning");return}t.hp=Nt[t.type].hp,t.mesh?.traverse(e=>{e.isMesh&&e.userData.baseColor&&(e.userData.baseMaterial?(e.material.dispose(),e.material=e.userData.baseMaterial,delete e.userData.baseMaterial):e.material.color.copy(e.userData.baseColor),e.userData.damaged=!1,delete e.userData.baseColor)}),this.audio.play("build"),this.ui.toast(`${Nt[t.type].name} repaired`,"repair","success")}}updateRaft(t){const e=this.raft.position.clone(),i=[...this.grid.blocks.values()].some(m=>m.type==="windcatcher")?1.2:1,n=[...this.grid.blocks.values()].some(m=>m.type==="sail");let r=new Wt(0,0,this.sailOpen&&n?-.4:-.12);if(this.anchored&&r.set(0,0,0),this.autopilot){const m=this.autopilot;this.hull();const f=Math.hypot(m.x-this.raft.position.x,m.z-this.raft.position.z),y=m.dock?2.4:m.radius+5;if(f<y)this.ui.toast(`Anchor down at ${m.name}. Swim ashore to explore.`,"island","success",6e3),this.autopilot=null,this.anchored=!0,this.raftVelocity.set(0,0,0),r.set(0,0,0);else{for((!m._route?.length||m._chunk!==this.world.lastChunk)&&(m._route=this.world.seaRoute(this.raft.position,m,this.hullRadius),m._chunk=this.world.lastChunk);m._route?.length>1&&Math.hypot(m._route[0].x-this.raft.position.x,m._route[0].z-this.raft.position.z)<1.5;)m._route.shift();const _=m._route?.[0]||m,x=new Wt(_.x-this.raft.position.x,0,_.z-this.raft.position.z),I=x.length();m._route?.length===1&&I<1.5&&f>y+1&&(m._route=null),r.copy(x.normalize().multiplyScalar(2.4*i*ve(I/5,.3,1)))}}if(this.helming){const m=(this.keys.has("d")?1:0)-(this.keys.has("a")?1:0)+this.touchMove.x+this.gamepadMove.x,f=(this.keys.has("s")?1:0)-(this.keys.has("w")?1:0)+this.touchMove.y+this.gamepadMove.y;r.set(Math.cos(this.cameraYaw)*m+Math.sin(this.cameraYaw)*f,0,-Math.sin(this.cameraYaw)*m+Math.cos(this.cameraYaw)*f).multiplyScalar(2.2*i),r.length()>2.5*i&&r.setLength(2.5*i)}this.raftVelocity.lerp(r,1-Math.exp(-t*.38)),this.raft.position.addScaledVector(this.raftVelocity,t);const a=this.hull();if(this.world.boatContact(this.raft.position,a)){const m=this.raft.position.x;if(this.raft.position.z,this.raft.position.x=e.x,this.world.boatContact(this.raft.position,a)&&(this.raft.position.x=m,this.raft.position.z=e.z,this.world.boatContact(this.raft.position,a)&&this.raft.position.set(e.x,this.raft.position.y,e.z)),this.raftVelocity.multiplyScalar(.2),this.autopilot&&(this.autopilot._route=null),this.reefDamageTimer+=t,this.reefDamageTimer>1&&!this.settings.relaxed){this.reefDamageTimer=0;const f=this.grid.exposedFoundations().filter(y=>this.grid.at(y.x,y.y+1,y.z)?.type!=="armor");f.length&&this.grid.damage(f[Math.floor(Math.random()*f.length)],5),this.ui.toast("Reef scraping the raft · steer into deeper water","foundation","warning")}}const o=this.ocean.uniforms.amplitude.value;let l=0,h=0,c=0,u=0,d=0,p=0;for(const m of this.grid.blocks.values())if(Nt[m.type].buoyant)for(const[f,y]of[[-.4,-.4],[.4,-.4],[-.4,.4],[.4,.4],[0,0]]){const _=m.x+f,x=m.z+y,I=vi(this.raft.position.x+_,this.raft.position.z+x,this.simTime,o);l+=I,h++,c+=_*I,u+=x*I,d+=_*_,p+=x*x}const g=h?l/h:0;this.raftVerticalVelocity+=(g-this.raft.position.y)*12*t-this.raftVerticalVelocity*4.2*t,this.raft.position.y+=this.raftVerticalVelocity*t,this.raft.rotation.z=Me.lerp(this.raft.rotation.z,ve(d?c/d:0,-.12,.12),t*2),this.raft.rotation.x=Me.lerp(this.raft.rotation.x,ve(p?-u/p:0,-.12,.12),t*2),this.raft.updateMatrixWorld(!0);const v=this.raft.position.clone().sub(e);this.player.onRaft&&this.player.position.add(v);for(const m of this.grid.blocks.values())if(m.type==="net"){const f=this.raft.localToWorld(new Wt(m.x,.1,m.z)),y=this.debris.nearest(f,.8);y&&this.collectDebris(y,!0)}}raftGround(t){const e=Math.round(t.x-this.raft.position.x),i=Math.round(t.z-this.raft.position.z);let n=null;for(let r=0;r<9;r++){const a=this.grid.at(e,r,i);if(!a)continue;let o;if(r===0&&Nt[a.type].buoyant)o=this.raft.position.y+.27;else if(a.type==="floor")o=this.raft.position.y+.34+r-1;else if(a.type==="stairs"){const l=t.x-this.raft.position.x-e,h=t.z-this.raft.position.z-i,c=a.rotation*Math.PI/2,u=l*Math.sin(c)+h*Math.cos(c);o=this.raft.position.y+.34+(r-1)+ve(u+.5,0,1)}o!==void 0&&o<=t.y+.46&&(!n||o>n.height)&&(n={height:o,block:a})}return n}updatePlayer(t){const e=this.player;e.action=Math.max(0,e.action-t),e.attackCooldown=Math.max(0,e.attackCooldown-t),e.jumpCooldown=Math.max(0,e.jumpCooldown-t),e.stingCooldown=Math.max(0,e.stingCooldown-t);const i=e.position.clone();let n=(this.keys.has("d")?1:0)-(this.keys.has("a")?1:0)+this.touchMove.x+this.gamepadMove.x,r=(this.keys.has("s")?1:0)-(this.keys.has("w")?1:0)+this.touchMove.y+this.gamepadMove.y;this.helming&&(n=0,r=0);const a=new Wt(Math.cos(this.cameraYaw)*n+Math.sin(this.cameraYaw)*r,0,-Math.sin(this.cameraYaw)*n+Math.cos(this.cameraYaw)*r);a.length()>1&&a.normalize();const o=a.length()>.05,l=(this.keys.has("shift")?4.3:2.65)*(e.swimming?.62:1)*(this.stats.stung>0?.7:1);e.velocity.x=Me.lerp(e.velocity.x,a.x*l,t*12),e.velocity.z=Me.lerp(e.velocity.z,a.z*l,t*12),e.position.x+=e.velocity.x*t,e.position.z+=e.velocity.z*t;const h=e.position.clone().sub(this.raft.position);for(const m of this.grid.blocks.values()){if(!["workbench","purifier","grill","wall","rainCollector","windcatcher"].includes(m.type))continue;const f=h.x-m.x,y=h.z-m.z,_=m.rotation*Math.PI/2,x=f*Math.cos(_)-y*Math.sin(_),I=f*Math.sin(_)+y*Math.cos(_),A=m.type==="wall",P=A?.55:.46,E=A?.16:.42,S=A?-.43:0,M=this.raft.position.y+.26+m.y-1;if(e.position.y<M+.9&&e.position.y+1.4>M&&Math.abs(x)<P&&Math.abs(I-S)<E){e.position.x=i.x,e.position.z=i.z;break}}this.world.resolveMovement(i,e.position,e.swimming);let c=this.raftGround(e.position),u=this.world.groundAt(e.position.x,e.position.z,e.position.y),d=c?.height??u?.height??-100;const p=e.swimming;this.keys.has(" ")&&e.jumpCooldown<=0&&(e.grounded||e.swimming)&&(e.velocity.y=e.swimming?3.5:4.7,e.grounded=!1,e.jumpCooldown=.6,e.swimming&&(e.position.y+=.15),this.audio.play("hook")),e.velocity.y-=12*t,e.position.y+=e.velocity.y*t;const g=this.world.ceilingAt(e.position,i.y);if(g!==null&&(e.position.y=g,e.velocity.y=Math.min(0,e.velocity.y)),e.grounded=!1,e.onRaft=!1,e.swimming=!1,e.position.y<=d&&e.velocity.y<=0)e.position.y=d,e.velocity.y=0,e.grounded=!0,e.onRaft=!!c;else{const m=vi(e.position.x,e.position.z,this.simTime,this.ocean.uniforms.amplitude.value)-.68;e.position.y<=m&&e.velocity.y<0&&(e.position.y=m,e.velocity.y=0,e.swimming=!0,p||this.audio.play("splash"))}if(e.swimming&&c&&e.jumpCooldown<.3&&(e.position.y=c.height,e.grounded=!0,e.onRaft=!0,e.swimming=!1),o){const m=Math.atan2(a.x,a.z);e.heading+=(Me.euclideanModulo(m-e.heading+Math.PI,Math.PI*2)-Math.PI)*Math.min(1,t*12)}else if(this.mouse.down||e.action>0){const m=Math.atan2(this.aimPoint.x-e.position.x,this.aimPoint.z-e.position.z);e.heading+=(Me.euclideanModulo(m-e.heading+Math.PI,Math.PI*2)-Math.PI)*Math.min(1,t*10)}e.anim+=t*(o?l*4:1.1),this.avatar.position.copy(e.position),this.avatar.rotation.y=e.heading,this.avatar.userData.body.position.y=o?Math.sin(e.anim*2)*.016:Math.sin(this.simTime*1.4)*.01;const v=o?Math.sin(e.anim)*(e.swimming?.7:.42):0;this.avatar.userData.legs[0].rotation.x=v,this.avatar.userData.legs[1].rotation.x=-v,this.avatar.userData.arms[0].rotation.x=-v*.7,this.avatar.userData.arms[1].rotation.x=v*.7-(e.action>0?Math.sin(e.action/.55*Math.PI)*1.2:0),this.hook.state==="charging"&&(this.avatar.userData.arms[1].rotation.x=-1.1),e.swimming?(this.avatar.rotation.x=.25,this.shark.mesh.visible&&e.position.distanceTo(this.shark.position)<2.7&&this.shark.biteCooldown<=0&&!this.settings.relaxed&&(this.stats.damage(10),this.shark.biteCooldown=5,this.ui.toast("Shark nearby! Get back to the raft.","spear","warning"))):this.avatar.rotation.x=0;for(const m of this.world.islands)for(const f of m.jellies){f.position.y=-.28+Math.sin(this.simTime*1.5+f.position.x)*.1;const y=f.getWorldPosition(new Wt);e.swimming&&e.position.distanceTo(y)<.7&&e.stingCooldown<=0&&(e.stingCooldown=10,this.stats.sting())}e.position.distanceTo(this.raft.position)>230&&(e.position.copy(this.raft.position).add(new Wt(.5,.5,.5)),this.ui.toast("The current carried you home. Stay within sight of your raft.","anchor"))}updateJobs(t){const e=new Map([...this.grid.blocks.values()].map(i=>[i.id,i]));for(let i=this.jobs.length-1;i>=0;i--){const n=this.jobs[i];if(!e.has(n.blockId)){this.cancelStationJob(n.blockId);continue}n.time+=t,n.time+1e-9>=n.recipe.seconds&&(this.jobs.splice(i,1),this.inventory.add(n.recipe.output,n.recipe.amount),n.recipe.output==="water"&&this.progress.water++,this.progress.crafted++,this.ui.toast(`${n.recipe.name} is ready`,wt[n.recipe.output].icon,"success"),this.audio.play("craft"))}for(const i of this.grid.blocks.values())i.type==="rainCollector"&&["rain","storm"].includes(this.time.weather)&&this.inventory.count("water")<30&&(i.production+=t,i.production+1e-9>=35&&(i.production=0,this.inventory.add("water",1),this.progress.water++,this.ui.toast("Rain collector · +1 fresh water","water","success")));for(const[i,n]of this.fires){const r=e.get(i);if(!r){this.fires.delete(i);continue}n.timer+=t,this.grid.damage(r,3*t),Math.random()<t*14&&this.particles.burst(this.raft.localToWorld(new Wt(r.x,.55+r.y,r.z)),14983250,2,.7),n.timer>18&&this.fires.delete(i)}}renderCamera(t){const e=(this.player?.position||new Wt(.5,0,.5)).clone().add(new Wt(0,.8,0));this.helming&&e.copy(this.raft.position).add(new Wt(.5,.8,.5)),this.cameraTarget.lerp(e,1-Math.exp(-t*5));const i=Math.cos(this.cameraPitch),n=Math.sin(this.cameraPitch),r=this.cameraDistance*ve(1/this.camera.aspect,1,1.6);this.camera.position.set(this.cameraTarget.x+Math.sin(this.cameraYaw)*r*i,this.cameraTarget.y+n*r,this.cameraTarget.z+Math.cos(this.cameraYaw)*r*i),this.world?.cameraClip(this.cameraTarget,this.camera.position),this.camera.lookAt(this.cameraTarget),this.camera.updateMatrixWorld(),this.raycaster.setFromCamera(this.pointer,this.camera),this.raycaster.ray.intersectPlane(this.oceanPlane,this.aimPoint)||this.aimPoint.copy(this.player.position).add(new Wt(0,0,-10));const a=40;if(this.aimPoint.distanceTo(this.player.position)>a){const o=this.aimPoint.clone().sub(this.player.position).normalize();this.aimPoint.copy(this.player.position).addScaledVector(o,a),this.aimPoint.y=0}}gamepad(t){let e;try{e=navigator.getGamepads?.()}catch{return}const i=e&&[...e].find(Boolean);if(this.gamepadMove={x:0,y:0},!i)return;if(this.gamepadRequireNeutral){if(i.buttons.some(o=>o.pressed)||i.axes.some(o=>Math.abs(o)>.17))return;this.gamepadRequireNeutral=!1}const n=o=>Math.abs(o)>.17?o:0,r=(o,l)=>{const h=!!i.buttons[o]?.pressed;h&&!this.gamepadButtons[o]&&l(),this.gamepadButtons[o]=h};if(r(3,()=>this.ui.modal?this.ui.closeModal():this.ui.openModal("inventory")),r(9,()=>this.ui.modal?this.ui.closeModal():this.ui.openModal("pause")),this.paused){const o=l=>{const h=[...document.querySelectorAll("#modal-panel button:not(:disabled),#modal-panel select,#modal-panel input")],c=Math.max(0,h.indexOf(document.activeElement));h[(c+l+h.length)%h.length]?.focus({preventScroll:!1})};r(12,()=>o(-1)),r(13,()=>o(1)),r(14,()=>o(-1)),r(15,()=>o(1)),r(0,()=>{document.activeElement?.closest("#modal-panel")&&document.activeElement.click()}),r(1,()=>this.ui.closeModal()),this.gamepadButtons[7]=!!i.buttons[7]?.pressed;return}this.gamepadMove.x=n(i.axes[0]),this.gamepadMove.y=n(i.axes[1]),this.cameraYaw-=n(i.axes[2]||0)*t*2,this.cameraPitch=ve(this.cameraPitch+n(i.axes[3]||0)*t,.12,1.2),(this.gamepadMove.x||this.gamepadMove.y||n(i.axes[2]||0)||n(i.axes[3]||0))&&this.pointer.set(0,.25),r(0,()=>{this.keys.add(" "),setTimeout(()=>this.keys.delete(" "),150),this.start()}),r(1,()=>this.toggleHelm()),r(4,()=>this.selectSlot(this.selectedSlot-1)),r(5,()=>this.selectSlot(this.selectedSlot+1)),r(2,()=>this.interact()),r(6,()=>{this.equipped==="hammer"&&this.placeBlock()});const a=!!i.buttons[7]?.pressed;a&&!this.gamepadButtons[7]&&(this.start(),this.pointer.set(0,.25),this.equipped==="hook"&&this.hook.state==="idle"?(this.hook.state="charging",this.hook.charge=.22):this.primaryAction()),!a&&this.gamepadButtons[7]&&this.hook.state==="charging"&&this.castHook(),this.gamepadButtons[7]=a}rescue(){if(this.progress.rescued){this.ui.toast("Your signal is still out there. Keep exploring.","signal","success");return}this.progress.rescued=!0,this.audio.play("rescue"),this.paused=!0,this.ui.victory(),this.save()}revive(){this.stats.health=100,this.stats.hunger=65,this.stats.thirst=65,this.stats.alive=!0;for(const t of["wood","leaf","plastic","scrap"])this.inventory.items[t]=Math.ceil(this.inventory.count(t)*.7);if(![...this.grid.blocks.values()].some(t=>t.core))for(let t=0;t<=1;t++)for(let e=0;e<=1;e++)this.grid.add("foundation",t,0,e,!0);this.player.position.copy(this.raft.position).add(new Wt(.5,.4,.5)),this.player.velocity.set(0,0,0),this.player.onRaft=!0,this.ui.closeModal(),this.ui.toast("A new breath. Some supplies were lost to the sea.","heart")}simulate(t){if(this.paused||!this.stats.alive||(this.simTime+=t,this.time.update(t),this.stats.update(t,this.settings.relaxed),!this.stats.alive))return;const e=this.crafting.job;e?.stationKey&&!this.grid.blocks.has(e.stationKey)&&this.crafting.cancel(),this.crafting.update(t),this.updateRaft(t),this.updatePlayer(t),this.updateHook(t),this.updateFishing(t),this.updateJobs(t),this.debris.update(t,this.simTime,this.raft.position,this.camera,this.ocean.uniforms.amplitude.value),this.shark.update(t,this.simTime,this.raft,this.grid,this.settings.relaxed),this.particles.update(t),this.questTimer=(this.questTimer||0)+t,this.questTimer>=.25&&(this.questTimer=0,this.quests.update(this.progress,this.crafting.research)),this.saveTimer+=t,this.saveTimer>20&&(this.saveTimer=0,this.save())}updatePresentation(t,e){const i=this.atmosphere.update(t,this.simTime,this.player.position,this.time,this.time.weather);if(this.ocean.uniforms.fogColor.value.copy(i.fog),this.ocean.uniforms.sunDirection.value.copy(this.atmosphere.sun.position).sub(this.player.position).normalize(),this.ocean.update(this.simTime,this.player.position,this.time.weather,i.daylight,this.world.islands,t),this.world.setDetail(this.player.position,Ps[this.activeQuality]),this.world.animate(this.simTime,i.daylight,this.time.weather==="storm"?2:this.time.weather==="rain"?1.35:1),i.lightning&&e&&(this.audio.play("damage"),!this.settings.relaxed&&Math.random()<.6)){const n=[...this.grid.blocks.values()].filter(a=>Nt[a.type].wooden),r=n[Math.floor(Math.random()*n.length)];r&&(this.fires.set(r.id,{timer:0}),this.ui.toast("Lightning struck! Use fresh water nearby to put out the fire.","storm","warning",6e3))}}frame(t){const e=this.lastFrame===null?0:Math.max(0,(t-this.lastFrame)/1e3);if(this.lastFrame=t,this.frameCount++,e>0&&(this.fps=Me.lerp(this.fps,1/e,.05)),!document.hidden&&!this.contextLost){this.gamepad(Math.min(e,.1));const i=this.started&&!this.paused&&this.stats.alive;let n=0;if(!this.paused){if(i)this.world.update(this.raft.position,1),n=this.clock.advance(e,a=>this.simulate(a));else{const a=Math.min(e,.1);this.introTime=(this.introTime||0)+a,n=a,this.avatar.userData.body.position.y=Math.sin((this.simTime+this.introTime)*1.4)*.01,this.saved||(this.simTime+=a,this.raft.position.y=vi(this.raft.position.x,this.raft.position.z,this.simTime)*.15,this.debris.update(a,this.simTime,this.raft.position,this.camera),this.shark.update(a,this.simTime,this.raft,this.grid,!0))}this.updatePresentation(n,i)}this.renderCamera(Math.min(e,.1)),this.updateBuilding(),this.updateDismantle(t),this.aimRing.visible=this.started&&!this.paused&&["hook","fishingRod","paddle"].includes(this.equipped),this.aimRing.position.set(this.aimPoint.x,vi(this.aimPoint.x,this.aimPoint.z,this.simTime)+.025,this.aimPoint.z),this.aimRing.scale.setScalar(this.hook.state==="charging"?1+this.hook.charge*.35:1);const r=this.shark.target;this.threatRing.visible=!this.paused&&!!r&&["targeting","attacking"].includes(this.shark.state)&&this.grid.at(r.x,r.y,r.z)===r,this.threatRing.visible&&(this.threatRing.position.copy(this.raft.localToWorld(new Wt(r.x,.29,r.z))),this.threatRing.material.opacity=.55+Math.sin(this.simTime*7)*.35),this.statsTimer+=e,this.statsTimer>=.1&&(!this.paused||this.renderNeeded)&&(this.statsTimer=0,this.ui.update()),(!this.paused||this.renderNeeded)&&(this.renderer.render(this.scene,this.camera),this.renderNeeded=!1),this.quality.update(e,i&&this.lastFrame!==null),this.monitor.recordFrame(e,t,!this.paused&&this.lastFrame!==null)}else this.clock.reset(),this.monitor.recordFrame(0,t,!1);this.animationFrameId=requestAnimationFrame(this.frame)}}async function Nv(){try{await Promise.all([document.fonts.load("400 14px Outfit"),document.fonts.load("400 30px Fraunces")]);const s=new Uv;requestAnimationFrame(()=>requestAnimationFrame(()=>{const t=document.getElementById("loading");t.classList.add("done"),setTimeout(()=>t.remove(),700)}))}catch(s){console.error("Tidebound Gold could not initialize:",s);const t=document.getElementById("loading");t.style.pointerEvents="auto",t.innerHTML='<div class="error-content"><div class="loading-symbol">≈</div><h1>We couldn’t reach the water.</h1><p>Tidebound Gold needs a WebGL-capable browser. Try Chrome, Edge, or Firefox with hardware acceleration enabled, then reload.</p><code id="error-detail"></code><button class="button primary" onclick="location.reload()">Try again →</button></div>',document.getElementById("error-detail").textContent=s.message}}Nv();
