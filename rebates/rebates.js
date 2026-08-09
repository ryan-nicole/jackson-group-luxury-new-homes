function formatMoney(value){
  return new Intl.NumberFormat('en-US',{
    style:'currency',
    currency:'USD',
    maximumFractionDigits:0
  }).format(value || 0);
}

document.querySelectorAll('[data-center-calculator]').forEach(calc=>{
  const price = calc.querySelector('[data-center-price]');
  const commission = calc.querySelector('[data-center-commission]');
  const share = calc.querySelector('[data-center-share]');
  const result = calc.querySelector('[data-center-result]');
  const detail = calc.querySelector('[data-center-detail]');

  function update(){
    const homePrice = Number(price.value || 0);
    const commissionPct = Number(commission.value || 0) / 100;
    const rebatePct = Number(share.value || 0) / 100;

    const estimatedCompensation = homePrice * commissionPct;
    const estimatedRebate = estimatedCompensation * rebatePct;

    result.textContent = formatMoney(estimatedRebate);
    detail.textContent = 'Based on estimated compensation of ' + formatMoney(estimatedCompensation) + '.';
  }

  [price,commission,share].forEach(input=>input.addEventListener('input',update));
  update();
});
