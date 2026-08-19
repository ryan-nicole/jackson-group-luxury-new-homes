
window.JG_REBATE_CONFIG={threshold:450000,lowerRate:0.0075,upperRate:0.01,startPrice:350000,priceStep:50000};

window.JGParsePrice=function(v){
  return Number(String(v??'').replace(/[^0-9.]/g,''))||0;
};
window.JGFormatPrice=function(v){
  const n=window.JGParsePrice(v);
  return n ? n.toLocaleString('en-US',{maximumFractionDigits:0}) : '';
};
window.JGFormatCurrency=function(v){
  return (Number(v)||0).toLocaleString('en-US',{
    style:'currency',currency:'USD',minimumFractionDigits:0,maximumFractionDigits:0
  });
};
window.JGCalculateRebate=function(v){
  const p=window.JGParsePrice(v);
  const rate=p<450000?0.0075:0.01;
  return {homePrice:p,rate:rate,rebate:p*rate};
};

function JGInitRebates(){
  document.querySelectorAll('[data-calculator],.simplified-estimator,.builder-rebate-card,.homepage-rebate-card').forEach(function(calc){
    let price=calc.querySelector('[data-price],input[type="number"],input[name*="price" i],input[data-rebate-price]');
    const result=calc.querySelector('[data-rebate-result],.builder-rebate-result strong,.premium-result strong,#homepageRebateResult strong');
    if(!price||!result)return;

    // Use text presentation so commas appear during manual entry.
    price.type='text';
    price.inputMode='numeric';
    price.setAttribute('data-rebate-price','true');
    price.value=window.JGFormatPrice(price.value || window.JG_REBATE_CONFIG.startPrice);

    function render(){
      const data=window.JGCalculateRebate(price.value);
      result.textContent=window.JGFormatCurrency(data.rebate);
    }
    function formatTyped(){
      const digits=String(price.value).replace(/\D/g,'');
      if(!digits){ price.value=''; render(); return; }
      price.value=Number(digits).toLocaleString('en-US');
      render();
    }
    price.addEventListener('input',formatTyped);
    price.addEventListener('blur',function(){
      if(!window.JGParsePrice(price.value)) price.value=window.JGFormatPrice(window.JG_REBATE_CONFIG.startPrice);
      else price.value=window.JGFormatPrice(price.value);
      render();
    });

    // Keep accessible +/- $50k keyboard/arrow behavior after changing to text.
    price.addEventListener('keydown',function(e){
      if(e.key==='ArrowUp'||e.key==='ArrowDown'){
        e.preventDefault();
        let n=window.JGParsePrice(price.value)||window.JG_REBATE_CONFIG.startPrice;
        n += e.key==='ArrowUp' ? window.JG_REBATE_CONFIG.priceStep : -window.JG_REBATE_CONFIG.priceStep;
        n=Math.max(0,n);
        price.value=window.JGFormatPrice(n);
        render();
      }
    });

    render();
  });

  // Remove the redundant rate sentence if older markup/scripts left it behind.
  document.querySelectorAll('[data-rebate-note]').forEach(function(el){el.remove();});
}
document.addEventListener('DOMContentLoaded',JGInitRebates);
if(document.readyState!=='loading')JGInitRebates();
