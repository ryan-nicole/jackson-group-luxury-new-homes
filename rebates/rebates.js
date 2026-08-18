function money(v){
  return new Intl.NumberFormat('en-US',{
    style:'currency',currency:'USD',maximumFractionDigits:0
  }).format(v||0);
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

window.JG_REBATE_CONFIG=window.JG_REBATE_CONFIG||{threshold:450000,lowerRate:0.0075,upperRate:0.01,priceStep:50000,startPrice:200000};
window.JGCalculateRebate=function(homePrice){
  const p=Number(homePrice)||0;
  const rate=p < 450000 ? 0.0075 : 0.01;
  return {homePrice:p,rate:rate,rebate:p*rate};
};
document.querySelectorAll('input[type="number"]').forEach(function(input){
  const context=((input.name||"")+" "+(input.id||"")+" "+(input.placeholder||"")+" "+(input.closest("section")?.textContent||"")).toLowerCase();
  if(context.includes("rebate")||context.includes("home price")||context.includes("purchase price")){
    input.step="50000";
    input.inputMode="numeric";
  }
});

window.JG_REBATE_START_PRICE=200000;
document.querySelectorAll('input[type="number"]').forEach(function(input){
  const context=((input.name||"")+" "+(input.id||"")+" "+(input.placeholder||"")+" "+(input.closest("section")?.textContent||"")).toLowerCase();
  if((context.includes("rebate")||context.includes("home price")||context.includes("purchase price")) && !input.value){
    input.min="200000";
    input.step="50000";
    input.value="200000";
    input.dispatchEvent(new Event("input",{bubbles:true}));
  }
});
