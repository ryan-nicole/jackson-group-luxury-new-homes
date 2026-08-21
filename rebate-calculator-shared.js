
window.JG_REBATE_CONFIG={threshold:450000,lowerRate:.0075,upperRate:.01,upperTierOffset:350,startPrice:350000,priceStep:50000};
window.JGParsePrice=v=>Number(String(v??'').replace(/[^0-9.]/g,''))||0;
window.JGFormatPrice=v=>{const n=JGParsePrice(v);return n?n.toLocaleString('en-US',{maximumFractionDigits:0}):''};
window.JGFormatCurrency=v=>(Number(v)||0).toLocaleString('en-US',{style:'currency',currency:'USD',minimumFractionDigits:0,maximumFractionDigits:0});
window.JGCalculateRebate=function(v){const p=JGParsePrice(v);const rebate=p<450000?p*.0075:(p*.01)-350;return{homePrice:p,rebate:Math.max(0,rebate)}};
function JGInitRebates(){
 document.querySelectorAll('[data-calculator],.simplified-estimator,.builder-rebate-card,.homepage-rebate-card').forEach(calc=>{
  const price=calc.querySelector('[data-price],input[type="number"],input[name*="price" i],input[data-rebate-price]');
  const result=calc.querySelector('[data-rebate-result],.builder-rebate-result strong,.premium-result strong,#homepageRebateResult strong');
  if(!price||!result)return;
  price.type='text';price.inputMode='numeric';price.setAttribute('data-rebate-price','true');
  price.value=JGFormatPrice(price.value||350000);
  const render=()=>{result.textContent=JGFormatCurrency(JGCalculateRebate(price.value).rebate)};
  price.addEventListener('input',()=>{const d=String(price.value).replace(/\D/g,'');price.value=d?Number(d).toLocaleString('en-US'):'';render()});
  price.addEventListener('blur',()=>{price.value=JGFormatPrice(price.value||350000);render()});
  price.addEventListener('keydown',e=>{if(e.key==='ArrowUp'||e.key==='ArrowDown'){e.preventDefault();let n=JGParsePrice(price.value)||350000;n+=e.key==='ArrowUp'?50000:-50000;price.value=JGFormatPrice(Math.max(0,n));render()}});
  render();
 });
 document.querySelectorAll('[data-rebate-note]').forEach(el=>el.remove());
}
document.addEventListener('DOMContentLoaded',JGInitRebates);if(document.readyState!=='loading')JGInitRebates();
