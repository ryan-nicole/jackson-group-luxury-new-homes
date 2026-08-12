function money(v){
  return new Intl.NumberFormat('en-US',{
    style:'currency',currency:'USD',maximumFractionDigits:0
  }).format(v||0)
}

function getJacksonRebateSettings(){
  const defaults={commission:3,share:50};
  try{
    const stored=JSON.parse(localStorage.getItem('jg-admin-rebates')||'{}');
    return {
      commission:Number(stored.commission ?? defaults.commission),
      share:Number(stored.share ?? defaults.share)
    };
  }catch(e){
    return defaults;
  }
}

document.querySelectorAll('[data-calculator]').forEach(c=>{
  const price=c.querySelector('[data-price]');
  const result=c.querySelector('[data-rebate-result]');
  const note=c.querySelector('[data-rebate-note]');

  function update(){
    const settings=getJacksonRebateSettings();
    const homePrice=Number(price.value||0);
    const estimatedCompensation=homePrice*(settings.commission/100);
    const estimatedRebate=estimatedCompensation*(settings.share/100);
    result.textContent=money(estimatedRebate);
    if(note){
      note.textContent='Planning estimate based on current Jackson Group calculator settings.';
    }
  }

  price.addEventListener('input',update);
  window.addEventListener('storage',update);
  update();
});

const b=document.getElementById('journeyContinue');
const msg=document.getElementById('journeyMessage');
if(b){
  b.addEventListener('click',()=>{
    const x=[...document.querySelectorAll('.journey-choice input:checked')].map(i=>i.value);
    if(!x.length){
      msg.textContent='Choose at least one option so we can guide you.';
      return;
    }
    if(x.includes('new-construction')&&x.includes('rebates')){
      location.href='register/index.html';return;
    }
    if(x.includes('sell-current')){
      location.href='sell/index.html';return;
    }
    if(x.includes('rebates')){
      location.href='rebates/index.html';return;
    }
    if(x.includes('new-construction')){
      location.href='communities/index.html';return;
    }
    location.href='homes/index.html';
  });
}
