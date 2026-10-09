// A Teale Roofing interactions
(function(){
  const burger=document.getElementById('burger');
  const mmenu=document.getElementById('mmenu');
  if(burger&&mmenu){burger.addEventListener('click',e=>{e.preventDefault();mmenu.classList.toggle('open');});}

  // Counters
  const counters=document.querySelectorAll('[data-count]');
  const io=new IntersectionObserver(es=>{
    es.forEach(en=>{
      if(en.isIntersecting){
        const el=en.target; io.unobserve(el);
        const target=parseInt(el.dataset.count,10)||0;
        const suffix=el.dataset.suffix||'+';
        let cur=0; const step=Math.max(1,Math.round(target/60));
        const t=setInterval(()=>{
          cur+=step; if(cur>=target){cur=target;clearInterval(t);}
          el.textContent=cur+suffix;
        },30);
      }
    });
  },{threshold:.4});
  counters.forEach(c=>io.observe(c));

  // Testimonial slider (simple rotate)
  const track=document.getElementById('revTrack');
  const prev=document.getElementById('revPrev');
  const next=document.getElementById('revNext');
  if(track){
    let idx=0;
    const cards=[...track.children];
    function show(){
      cards.forEach((c,i)=>{
        c.style.display=(window.innerWidth<1020)?(i===idx?'flex':'none'):'flex';
      });
    }
    show(); window.addEventListener('resize',show);
    if(prev)prev.addEventListener('click',()=>{idx=(idx-1+cards.length)%cards.length;show();});
    if(next)next.addEventListener('click',()=>{idx=(idx+1)%cards.length;show();});
  }

  // Lightbox
  const lb=document.getElementById('lightbox');
  const lbImg=document.getElementById('lightboxImg');
  document.addEventListener('click',e=>{
    const a=e.target.closest('[data-lightbox]');
    if(a){e.preventDefault(); if(lb&&lbImg){lbImg.src=a.href; lb.classList.add('open');}}
    if(e.target.closest('#lightboxClose')||e.target.id==='lightbox'){ if(lb)lb.classList.remove('open'); }
  });
  document.addEventListener('keydown',e=>{ if(e.key==='Escape'&&lb)lb.classList.remove('open'); });

  // FAQ
  document.addEventListener('click',e=>{
    const b=e.target.closest('.faq > button');
    if(b){ b.parentElement.classList.toggle('open'); }
  });

  // To top
  const toTop=document.getElementById('toTop');
  window.addEventListener('scroll',()=>{
    if(toTop) toTop.style.display=(window.scrollY>600)?'block':'none';
  });
  if(toTop) toTop.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

  // Contact form demo validation + mailto fallback
  const form=document.getElementById('quoteForm');
  if(form){
    form.addEventListener('submit',e=>{
      e.preventDefault();
      const data=new FormData(form);
      const name=(data.get('name')||'').toString().trim();
      const phone=(data.get('phone')||'').toString().trim();
      const postcode=(data.get('postcode')||'').toString().trim();
      const msg=document.getElementById('formMsg');
      if(!name||!phone||!postcode){
        if(msg){msg.style.color='#9e181b';msg.textContent='Please fill in your name, telephone and postcode — these are required so we can arrange your free quote.';}
        return;
      }
      const type=(data.get('type')||'Repair').toString();
      const email=(data.get('email')||'').toString();
      const details=(data.get('details')||'').toString();
      const subject=encodeURIComponent('Website enquiry — '+type+' — '+name+' '+postcode);
      const body=encodeURIComponent(`Name: ${name}\nPhone: ${phone}\nPostcode: ${postcode}\nEmail: ${email}\nType: ${type}\n\nDetails:\n${details}`);
      if(msg){msg.style.color='#1a7a4c';msg.textContent='Thank you '+name+'! Opening your email app to send your enquiry to sales@atealeroofing.co.uk — or call 07813 113362 for a faster response.';}
      setTimeout(()=>{ window.location.href=`mailto:sales@atealeroofing.co.uk?subject=${subject}&body=${body}`; },800);
      form.reset();
    });
  }

  // Footer year
  const y=document.getElementById('year'); if(y) y.textContent=new Date().getFullYear();
})();
