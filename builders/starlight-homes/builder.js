document.querySelector('[data-builder-search]')?.addEventListener('click',()=>{
  const builder=document.querySelector('[data-idx-mount="builder"]')?.dataset.builder;
  alert('MLS/IDX search placeholder for '+builder+'. This becomes live when the approved IDX provider is connected.');
});

document.querySelectorAll('.page-number,.page-control').forEach(btn=>{
  btn.addEventListener('click',()=>{
    if(btn.disabled) return;
    document.querySelectorAll('.page-number').forEach(b=>b.classList.remove('active'));
    if(btn.classList.contains('page-number')) btn.classList.add('active');
    window.scrollTo({top:document.querySelector('.builder-homes-section').offsetTop-20,behavior:'smooth'});
  });
});