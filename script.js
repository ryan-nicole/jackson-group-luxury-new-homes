
function money(n){return new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(n||0)}
document.querySelectorAll('[data-calculator]').forEach(calc=>{
 const price=calc.querySelector('[data-price]'),commission=calc.querySelector('[data-commission]'),share=calc.querySelector('[data-share]');
 const rebate=calc.querySelector('[data-rebate-result]'),gross=calc.querySelector('[data-gross-result]');
 function update(){const g=Number(price.value||0)*(Number(commission.value||0)/100);const r=g*(Number(share.value||0)/100);rebate.textContent=money(r);gross.textContent='Based on estimated compensation of '+money(g)}
 [price,commission,share].forEach(el=>el.addEventListener('input',update));update();
});
const demo=document.querySelector('[data-demo-form]');
if(demo){demo.addEventListener('submit',e=>{e.preventDefault();demo.innerHTML='<div class="faq"><h2>Form preview complete.</h2><p>This demo does not send information anywhere yet. We will connect the finished form to Wise Agent CRM.</p></div>'})}
