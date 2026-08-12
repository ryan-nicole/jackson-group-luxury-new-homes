document.querySelectorAll('.tab').forEach(tab=>{
  tab.addEventListener('click',()=>{
    document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
    document.querySelectorAll('.search-panel').forEach(p=>p.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById('tab-'+tab.dataset.tab).classList.add('active');
  });
});

document.getElementById('cityGo').addEventListener('click',()=>{
  const city=document.getElementById('citySelect').value;
  if(city) window.location.href='../communities/'+city+'/index.html';
});

document.getElementById('builderGo').addEventListener('click',()=>{
  const builder=document.getElementById('builderSelect').value;
  if(builder) window.location.href='../builders/'+builder+'/index.html';
});

document.querySelectorAll('[data-goal]').forEach(btn=>{
  btn.addEventListener('click',()=>window.location.href=btn.dataset.goal);
});

document.getElementById('neighborhoodGo')?.addEventListener('click',()=>{
  const url=document.getElementById('neighborhoodSelect')?.value;
  if(url) window.location.href=url;
});
