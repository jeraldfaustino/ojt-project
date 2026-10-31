(function(){
  var btn=document.getElementById('menuBtn'),links=document.getElementById('navLinks');
  btn.addEventListener('click',function(){var o=links.classList.toggle('open');btn.setAttribute('aria-expanded',o)});
  links.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){links.classList.remove('open');btn.setAttribute('aria-expanded',false)})});

  // skill filters
  var chips=document.querySelectorAll('.chip'),cards=document.querySelectorAll('.skill');
  chips.forEach(function(c){c.addEventListener('click',function(){
    chips.forEach(function(x){x.classList.remove('active');x.setAttribute('aria-selected',false)});
    c.classList.add('active');c.setAttribute('aria-selected',true);
    var f=c.dataset.filter;
    cards.forEach(function(k){k.classList.toggle('hide',f!=='all'&&k.dataset.cat!==f)});
  })});

  // progress bar + reveal on scroll
  var io=new IntersectionObserver(function(es){es.forEach(function(e){
    if(e.isIntersecting){
      e.target.classList.add('in');
      var f=e.target.querySelector('.bar-fill');if(f)f.style.width=f.dataset.pct+'%';
      io.unobserve(e.target);
    }})},{threshold:.15});
  document.querySelectorAll('.section .card,.metrics').forEach(function(el){el.classList.add('reveal');io.observe(el)});

  // active nav link
  var secs=document.querySelectorAll('main section[id]'),nav=document.querySelectorAll('.nav-links a');
  var so=new IntersectionObserver(function(es){es.forEach(function(e){
    if(e.isIntersecting){nav.forEach(function(a){a.classList.toggle('active',a.getAttribute('href')==='#'+e.target.id&&!a.classList.contains('nav-cta'))})}
  })},{rootMargin:'-45% 0px -50% 0px'});
  secs.forEach(function(s){so.observe(s)});

  // copy email
  var cb=document.getElementById('copyBtn');
  if(cb)cb.addEventListener('click',function(){
    var t='jerald.faustino@example.com';
    (navigator.clipboard?navigator.clipboard.writeText(t):Promise.reject()).then(function(){cb.textContent='Copied'}).catch(function(){cb.textContent='Press Ctrl+C'});
    setTimeout(function(){cb.textContent='Copy'},1800);
  });
})();
