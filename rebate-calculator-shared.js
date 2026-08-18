
window.JG_REBATE_CONFIG={threshold:450000,lowerRate:0.0075,upperRate:0.01,startPrice:200000,priceStep:50000};
window.JGFormatCurrency=function(v){return (Number(v)||0).toLocaleString('en-US',{style:'currency',currency:'USD',minimumFractionDigits:0,maximumFractionDigits:0})};
window.JGCalculateRebate=function(v){
  const p=Number(String(v??'').replace(/[^0-9.]/g,''))||0;
  const rate=p<450000?0.0075:0.01;
  return {homePrice:p,rate:rate,rebate:p*rate};
};
function JGInitRebates(){
  document.querySelectorAll('[data-calculator],.simplified-estimator,.builder-rebate-card').forEach(function(calc){
    const price=calc.querySelector('[data-price],input[type="number"]');
    const result=calc.querySelector('[data-rebate-result],.builder-rebate-result strong,.premium-result strong,#homepageRebateResult strong');
    if(!price||!result)return;
    price.min='200000'; price.step='50000'; price.inputMode='numeric';
    if(!price.value||Number(price.value)<200000) price.value='200000';
    const render=function(){
      const d=JGCalculateRebate(price.value);
      result.textContent=JGFormatCurrency(d.rebate);
      const note=calc.querySelector('[data-rebate-note]');
      if(note){
        const pct=(d.rate*100).toFixed(2).replace(/\.00$/,'');
        note.textContent=`Estimated at ${pct}% based on a ${JGFormatCurrency(d.homePrice)} home price.`;
      }
    };
    price.addEventListener('input',render);
    price.addEventListener('change',render);
    render();
  });
}
document.addEventListener('DOMContentLoaded',JGInitRebates);
if(document.readyState!=='loading')JGInitRebates();
