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

// Homepage rebate calculator: the public result calculates in place.
// Admin/backend can replace rebateRate after the final rebate structure is chosen.
window.JG_REBATE_CONFIG=window.JG_REBATE_CONFIG||{rebateRate:null};
(function(){
  const section=document.getElementById("homepage-rebate-calculator");
  if(!section)return;
  const inputs=[...section.querySelectorAll('input[type="number"],input[inputmode="numeric"],input[type="text"]')];
  const price=inputs.find(i=>/price|home|purchase/i.test((i.name||"")+" "+(i.id||"")+" "+(i.placeholder||"")))||inputs[0];
  const result=document.getElementById("homepageRebateResult");
  if(price){ price.setAttribute("step","10000"); price.setAttribute("inputmode","numeric"); }
  function calc(){
    if(!price||!result)return;
    const value=Number(String(price.value).replace(/[^0-9.]/g,""));
    const rate=window.JG_REBATE_CONFIG.rebateRate;
    if(!value){result.querySelector("strong").textContent="Enter a home price to estimate your rebate.";return}
    if(rate==null){result.querySelector("strong").textContent="Rebate program rate will be set in Admin.";return}
    result.querySelector("strong").textContent=(value*rate).toLocaleString("en-US",{style:"currency",currency:"USD"});
  }
  price?.addEventListener("input",calc);
})();
