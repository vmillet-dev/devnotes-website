const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const calm=matchMedia('(prefers-reduced-motion:reduce)').matches;
// Hero : recherche qui se tape seule et filtre les cartes
const q=$('#q');if(q){const cards=$$('.card'),qs=['#infra','sql','nginx','docker'];
 const filter=v=>cards.forEach(c=>c.classList.toggle('off',!!v&&!c.textContent.toLowerCase().includes(v.toLowerCase())));
 if(calm){q.textContent='#infra';filter('#infra')}else{let i=0,n=0,dir=1;
  const tick=()=>{const w=qs[i];n+=dir;q.textContent=w.slice(0,n);filter(q.textContent);
   let d=90;if(n==w.length&&dir>0){dir=-1;d=1800}else if(n==0){dir=1;i=(i+1)%qs.length;d=400}setTimeout(tick,d)};tick()}}
// Scrollytelling : l'étape visible pilote la scène
const steps=$$('.step');if(steps.length){const sc=$$('.scene');
 const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;const n=+e.target.dataset.i;
  steps.forEach((s,i)=>s.classList.toggle('on',i==n));sc.forEach((s,i)=>s.classList.toggle('on',i==n))}),{rootMargin:'-45% 0px -45% 0px'});
 steps.forEach(s=>io.observe(s))}
// Raccourcis : s'allument quand on appuie la vraie combinaison
addEventListener('keydown',e=>{if(!e.ctrlKey&&!e.altKey)return;const k=[e.ctrlKey&&'Ctrl',e.shiftKey&&'Maj',e.altKey&&'Alt',e.key.length==1&&e.key.toUpperCase()].filter(Boolean).join(' ');
 $$('.key').forEach(el=>{const m=el.dataset.k==k;el.classList.toggle('on',m);if(m)setTimeout(()=>el.classList.remove('on'),600)})});
// Docs
const art=$('article');if(art){const secs=$$('section',art),toc=$('.toc'),nav=$('.dnav'),inp=$('#s');
 toc.innerHTML=secs.map(s=>`<a href="#${s.id}">${$('h2',s).textContent}</a>`).join('');
 const spy=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&$$('a',toc).forEach(a=>a.classList.toggle('on',a.hash=='#'+e.target.id))),{rootMargin:'-20% 0px -70% 0px'});
 secs.forEach(s=>spy.observe(s));
 $$('pre',art).forEach(p=>{const b=document.createElement('button');b.className='cp';b.textContent='Copier';
  b.onclick=()=>{navigator.clipboard?.writeText(p.innerText.replace(/Copier\s*$/,'').trim());b.textContent='Copié';setTimeout(()=>b.textContent='Copier',1400)};p.append(b)});
 inp.oninput=()=>{const v=inp.value.toLowerCase();secs.forEach(s=>s.hidden=!!v&&!s.textContent.toLowerCase().includes(v));
  $$('a[href^="#"]',nav).forEach(a=>{const s=$(a.hash);a.hidden=!!s&&s.hidden})};
 $('#menu').onclick=()=>nav.classList.toggle('open');$$('a',nav).forEach(a=>a.onclick=()=>nav.classList.remove('open'));
 addEventListener('keydown',e=>{if(e.ctrlKey&&e.key.toLowerCase()=='k'){e.preventDefault();nav.classList.add('open');inp.focus()}})}
