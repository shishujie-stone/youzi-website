'use strict';
const pet=document.querySelector('#pet'), dog=document.querySelector('#hero-dog'), speech=document.querySelector('#speech');
let greeting=0,reset;
pet.addEventListener('click',()=>{const lines=['汪！今天也陪着你。','摸摸收到啦，汪！','你忙你的，我就在这里。'];greeting=(greeting+1)%lines.length;speech.textContent=lines[greeting];dog.src=matchMedia('(prefers-reduced-motion: reduce)').matches?'assets/wave.webp':'assets/wave-animation.webp';clearTimeout(reset);reset=setTimeout(()=>{dog.src='assets/youzi.webp'},2600)});
if(matchMedia('(prefers-reduced-motion: reduce)').matches)document.querySelector('.motion-dog').src='assets/wave.webp';
const button=document.querySelector('#download-button'),status=document.querySelector('#download-status');
let manifest;
async function release(){if(manifest)return manifest;const r=await fetch('downloads/release.json');if(!r.ok)throw new Error('无法获取版本信息，请稍后重试。');manifest=await r.json();document.querySelector('#release').textContent=`v${manifest.version} · ${(manifest.size/1048576).toFixed(1)} MB · Apple 芯片 · macOS 14+`;return manifest;}
release().catch(()=>{});
button.addEventListener('click',async()=>{button.disabled=true;status.textContent='正在打开安装包下载…';try{const m=await release();const a=document.createElement('a');a.href=m.url;a.rel='noopener';document.body.append(a);a.click();a.remove();status.textContent='已打开 GitHub 安装包下载，请查看浏览器下载列表。';}catch(e){status.textContent=e.message||'下载暂时失败，请重试。';}finally{button.disabled=false;}});

const dailyResponse=document.querySelector('#daily-response');
document.querySelectorAll('[data-moment]').forEach(control=>control.addEventListener('click',()=>{
 const kind=control.dataset.moment;
 const messages={greet:'嗨，我是柚子！今天也给你一个小小的招手。',rest:'好呀，我们一起歇一会儿。你忙你的，我就在这里。',chat:'桌宠右键 → 聊天 → 设置自己的 DeepSeek API key，即可开始对话。聊天可选，接口费用由 DeepSeek 收取。'};
 dailyResponse.textContent=messages[kind];
 dailyResponse.classList.toggle('is-youzi',kind!=='chat');
 const picture=control.closest('article').querySelector('img');
 if(kind==='greet'&&!matchMedia('(prefers-reduced-motion: reduce)').matches){picture.src='assets/wave-animation.webp';setTimeout(()=>{picture.src='assets/wave.webp'},2600);}
}));
