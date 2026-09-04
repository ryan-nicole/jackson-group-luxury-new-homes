function money(v){
  return new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(v||0)
}

function calculateJacksonRebate(homePrice){
  const p=Number(homePrice)||0;
  return p < 450000 ? p*0.0075 : (p*0.01)-350;
}

document.querySelectorAll('[data-calculator]').forEach(c=>{
  const price=c.querySelector('[data-price]');
  const result=c.querySelector('[data-rebate-result]');
  if(!price||!result)return;
  price.min='350000';
  price.step='50000';
  if(!price.value || Number(price.value)<350000) price.value='350000';
  function update(){result.textContent=money(calculateJacksonRebate(price.value));}
  price.addEventListener('input',update);
  update();
});

const b=document.getElementById('journeyContinue');
const msg=document.getElementById('journeyMessage');
if(b){
  b.addEventListener('click',()=>{
    const x=[...document.querySelectorAll('.journey-choice input:checked')].map(i=>i.value);
    if(!x.length){msg.textContent='Choose at least one option so we can guide you.';return;}
    if(x.includes('new-construction')&&x.includes('rebates')){location.href='register/index.html';return;}
    if(x.includes('sell-current')){location.href='sell/index.html';return;}
    if(x.includes('rebates')){location.href='rebates/index.html';return;}
    if(x.includes('new-construction')){location.href='homes/index.html#new-construction-search';return;}
    location.href='homes/index.html';
  });
}

window.JG_REBATE_CONFIG={threshold:450000,lowerRate:0.0075,upperRate:0.01,upperTierOffset:350,priceStep:50000,startPrice:350000};
window.JGCalculateRebate=function(homePrice){
  const p=Number(homePrice)||0;
  return {homePrice:p,rate:p<450000?0.0075:0.01,rebate:calculateJacksonRebate(p)};
};
window.JG_REBATE_START_PRICE=350000;

(function polishHomepage(){
  function apply(){
    /* Add lower price bands to the homepage search dropdown. */
    const priceSelect=document.querySelector('.option1-horizontal-search select[name="price"]');
    if(priceSelect && ![...priceSelect.options].some(o=>o.value==='100000-200000')){
      const any=priceSelect.querySelector('option[value=""]');
      const first=document.createElement('option');
      first.value='100000-200000'; first.textContent='$100K–$200K';
      const second=document.createElement('option');
      second.value='200000-300000'; second.textContent='$200K–$300K';
      any.after(second); any.after(first);
    }

    /* Simplify the builder-form section exactly as requested. */
    document.querySelector('.builder-form-home-actions')?.remove();

    /* Hold the Featured area for a future concept instead of showing filler. */
    document.querySelector('section.featured#featured')?.remove();

    /* Ensure homepage rebate input starts at the approved amount. */
    const rebateInput=document.querySelector('#homepage-rebate [data-price]');
    if(rebateInput){
      rebateInput.min='350000'; rebateInput.step='50000';
      if(Number(rebateInput.value)<350000) rebateInput.value='350000';
      rebateInput.dispatchEvent(new Event('input',{bubbles:true}));
    }
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',apply);
  else apply();
})();
