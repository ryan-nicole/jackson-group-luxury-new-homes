/* Builder-supplied inventory; separate from the future MLS/IDX feed. */
(async function(){
 const section=document.getElementById('builder-inventory'),grid=document.getElementById('builder-inventory-grid'),status=document.getElementById('builder-inventory-status');
 if(!section||!grid)return;
 try{
  const response=await fetch('../data/builder-inventory.json',{cache:'no-store'});
  if(!response.ok)throw Error('Inventory unavailable');
  const data=await response.json();const homes=Array.isArray(data.homes)?data.homes:[];
  const form=document.querySelector('.jg-search-unified-grid');
  const make=(tag,cls,txt)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(txt!==undefined)e.textContent=String(txt);return e;};
  function render(){
   grid.replaceChildren();const q=(form?.elements.location?.value||new URLSearchParams(location.search).get('location')||'').toLowerCase().trim();
   const shown=homes.filter(h=>h&&h.published===true&&['available','under-construction','move-in-ready'].includes(h.status)&&(!q||[h.address,h.city,h.community,h.builder,h.zip].some(v=>String(v||'').toLowerCase().includes(q))));
   if(!shown.length){status.textContent=homes.length?'No matching builder inventory is currently published. Please check back soon.':'Builder inventory is being prepared. Check back soon for available and under-construction homes.';return;}
   status.textContent=shown.length+' builder '+(shown.length===1?'home':'homes')+' available to explore. Pricing and availability should be confirmed with Jackson Group.';
   shown.forEach(h=>{
    const card=make('article','jg-builder-card');
    if(h.image){const img=make('img','jg-builder-card-image');img.src=h.image;img.alt=h.imageAlt||'Builder home exterior';img.loading='lazy';card.append(img);}
    const body=make('div','jg-builder-card-body');body.append(make('span','jg-builder-card-label',(h.builder||'New Construction')+' · '+(h.status==='move-in-ready'?'Move-in Ready':h.status==='under-construction'?'Under Construction':'Available')));
    body.append(make('h3','',h.address||h.community||'New Construction Home'));
    body.append(make('p','', [h.city,h.state||'TX',h.community].filter(Boolean).join(' · ')));
    if(Number.isFinite(Number(h.price))&&Number(h.price)>0)body.append(make('strong','jg-builder-card-price',Number(h.price).toLocaleString('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0})));
    body.append(make('p','',[h.beds? h.beds+' Beds':'',h.baths? h.baths+' Baths':'',h.sqft?Number(h.sqft).toLocaleString()+' Sq. Ft.':''].filter(Boolean).join(' · ')));
    const link=make('a','jg-builder-card-action','Ask About This Home →');link.href='../register/index.html';body.append(link);if(h.sourceUrl){const source=make('a','jg-builder-card-source','View builder details ↗');source.href=h.sourceUrl;source.target='_blank';source.rel='noopener noreferrer';body.append(source);}card.append(body);grid.append(card);
   });
  }
  render();form?.addEventListener('submit',()=>setTimeout(render,0));
 }catch(err){status.textContent='Builder inventory is temporarily unavailable. Please contact Jackson Group for current homes.';}
})();
