(function(){
  // mobile nav
  var t=document.querySelector('.nav__toggle'),m=document.getElementById('mnav');
  if(t&&m){
    t.addEventListener('click',function(){var o=t.getAttribute('aria-expanded')==='true';t.setAttribute('aria-expanded',String(!o));t.setAttribute('aria-label',o?'打开菜单':'关闭菜单');m.hidden=o;});
    m.addEventListener('click',function(e){if(e.target.tagName==='A'){t.setAttribute('aria-expanded','false');m.hidden=true;}});
  }
  // reveal
  var els=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){var d=[].indexOf.call(e.target.parentNode.children,e.target)%4;e.target.style.transitionDelay=(d*70)+'ms';e.target.classList.add('in');io.unobserve(e.target);}})},{rootMargin:'0px 0px -8% 0px',threshold:.08});
    els.forEach(function(el){io.observe(el)});
  }else{els.forEach(function(el){el.classList.add('in')})}
  // count up
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var nums=document.querySelectorAll('[data-count]');
  if(!reduce&&'IntersectionObserver' in window){
    var cio=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;var el=e.target,n=+el.dataset.count,s=null;cio.unobserve(el);
      function step(ts){if(!s)s=ts;var p=Math.min((ts-s)/1200,1);el.textContent=Math.round(n*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(step);}
      requestAnimationFrame(step);})},{threshold:.5});
    nums.forEach(function(el){cio.observe(el)});
  }
  // tabs
  var tabs=[].slice.call(document.querySelectorAll('[role=tab]'));
  function sel(tab,focus){tabs.forEach(function(b){var on=b===tab;b.setAttribute('aria-selected',on);b.tabIndex=on?0:-1;document.getElementById(b.getAttribute('aria-controls')).hidden=!on;});if(focus)tab.focus();tab.scrollIntoView({block:'nearest',inline:'nearest',behavior:reduce?'auto':'smooth'});}
  tabs.forEach(function(b,i){b.addEventListener('click',function(){sel(b)});b.addEventListener('keydown',function(e){var k=e.key,j=null;if(k==='ArrowRight')j=(i+1)%tabs.length;if(k==='ArrowLeft')j=(i-1+tabs.length)%tabs.length;if(k==='Home')j=0;if(k==='End')j=tabs.length-1;if(j!==null){e.preventDefault();sel(tabs[j],true);}});});
  // mobile sticky cta
  var mc=document.querySelector('.mcta'),hero=document.querySelector('.hero'),ct=document.getElementById('contact');
  if(mc&&'IntersectionObserver' in window){var hv=true,cv=false;function upd(){mc.classList.toggle('show',!hv&&!cv)}
    new IntersectionObserver(function(es){hv=es[0].isIntersecting;upd()}).observe(hero);
    new IntersectionObserver(function(es){cv=es[0].isIntersecting;upd()}).observe(ct);}
  // mailto form
  var f=document.getElementById('cform');
  if(f){f.addEventListener('submit',function(e){e.preventDefault();var d=new FormData(f);
    var name=(d.get('name')||'').trim(),biz=(d.get('biz')||'').trim();
    var subject='预约 30 分钟 AI 流程沟通'+(biz?'｜'+biz:'');
    var body=['你好 Kevin，','','我想预约一次 30 分钟的初步沟通。','','称呼：'+(name||'（未填）'),'行业 / 生意类型：'+(biz||'（未填）'),'最想先改进的流程：'+d.get('flow'),'现在的做法：'+((d.get('desc')||'').trim()||'（未填）'),'','方便沟通的时间：',''].join('\n');
    window.location.href='mailto:contact@kevincui.com?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);});}
})();
