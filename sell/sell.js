const sellerForm = document.getElementById('sellerForm');
const sellerSuccess = document.getElementById('sellerSuccess');

if(sellerForm){
  sellerForm.addEventListener('submit',event=>{
    event.preventDefault();

    if(!sellerForm.checkValidity()){
      sellerForm.reportValidity();
      return;
    }

    sellerSuccess.classList.remove('hidden');
    sellerSuccess.scrollIntoView({behavior:'smooth',block:'center'});
  });
}
