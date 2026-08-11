(() => {
  const root = document.documentElement;
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.querySelector('.overlay');
  const menuButton = document.querySelector('[data-menu]');
  const searchInput = document.querySelector('[data-search]');
  const results = document.querySelector('[data-results]');

  const BASE = '/docs/';
  const pages = [
    {title:'الرئيسية',desc:'بوابة وثائق HAKAMIQ',url:BASE},
    {title:'البدء',desc:'طريقة استخدام الوثائق والتنقل بينها',url:BASE+'getting-started/'},
    {title:'المحاكيات',desc:'أدلة المحاكيات والمنصات',url:BASE+'emulators/'},
    {title:'الأدوات',desc:'أدوات HAKAMIQ والمشاريع المساندة',url:BASE+'tools/'},
    {title:'الأسئلة الشائعة',desc:'إجابات مختصرة للمشاكل الشائعة',url:BASE+'faq/'}
  ];

  function setMenu(open){
    if (!sidebar || !overlay) return;
    sidebar.classList.toggle('open', open);
    overlay.classList.toggle('open', open);
    menuButton?.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  }
  menuButton?.addEventListener('click',()=>setMenu(!sidebar?.classList.contains('open')));
  overlay?.addEventListener('click',()=>setMenu(false));
  window.addEventListener('keydown',e=>{if(e.key==='Escape')setMenu(false)});
  sidebar?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));

  if(searchInput && results){
    searchInput.addEventListener('input',()=>{
      const q=searchInput.value.trim().toLowerCase();
      results.innerHTML='';
      if(!q){results.classList.remove('open');return}
      const found=pages.filter(p=>(p.title+' '+p.desc).toLowerCase().includes(q));
      results.innerHTML=found.length
        ? found.map(p=>`<a href="${p.url}"><b>${p.title}</b><span>${p.desc}</span></a>`).join('')
        : '<a><b>لا توجد نتائج</b><span>جرّب عبارة بحث أخرى</span></a>';
      results.classList.add('open');
    });
    document.addEventListener('click',e=>{
      if(!e.target.closest('.search')) results.classList.remove('open');
    });
  }
})();
