const titles = {
  overview:'Overview',homepage:'Homepage',communities:'Communities',builders:'Builders',
  leads:'Leads',inventory:'Inventory',rebates:'Rebates',settings:'Settings'
};

function showView(name){
  document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(b=>b.classList.remove('active'));
  document.getElementById('view-'+name)?.classList.add('active');
  document.querySelector(`[data-view="${name}"]`)?.classList.add('active');
  document.getElementById('viewTitle').textContent=titles[name]||name;
}

document.querySelectorAll('[data-view]').forEach(btn=>btn.addEventListener('click',()=>showView(btn.dataset.view)));
document.querySelectorAll('[data-jump]').forEach(btn=>btn.addEventListener('click',()=>showView(btn.dataset.jump)));

const defaults = {
  community:'Georgetown',
  builder:'Highland Homes',
  announcement:'Register before your first builder tour.',
  hero:'Luxury New Homes Across Texas'
};

function loadHomepage(){
  const saved=JSON.parse(localStorage.getItem('jg-admin-homepage')||'{}');
  const data={...defaults,...saved};
  featuredCommunity.value=data.community;
  featuredBuilder.value=data.builder;
  homepageAnnouncement.value=data.announcement;
  heroHeadline.value=data.hero;
  updatePreview();
}
function updatePreview(){
  previewCommunity.textContent=featuredCommunity.value;
  previewBuilder.textContent=featuredBuilder.value;
  previewAnnouncement.textContent=homepageAnnouncement.value;
  overviewFeaturedCommunity.textContent=featuredCommunity.value;
  overviewFeaturedBuilder.textContent=featuredBuilder.value;
  overviewAnnouncement.textContent=homepageAnnouncement.value;
}
[featuredCommunity,featuredBuilder,homepageAnnouncement,heroHeadline].forEach(el=>el.addEventListener('input',updatePreview));

saveHomepage.addEventListener('click',()=>{
  localStorage.setItem('jg-admin-homepage',JSON.stringify({
    community:featuredCommunity.value,builder:featuredBuilder.value,
    announcement:homepageAnnouncement.value,hero:heroHeadline.value
  }));
  showToast('Homepage settings saved in this browser.');
});
resetHomepage.addEventListener('click',()=>{
  localStorage.removeItem('jg-admin-homepage'); loadHomepage(); showToast('Demo homepage settings reset.');
});

saveRebates.addEventListener('click',()=>{
  localStorage.setItem('jg-admin-rebates',JSON.stringify({
    commission:adminCommission.value,share:adminShare.value,disclaimer:adminDisclaimer.value
  }));
  showToast('Rebate defaults saved in this browser.');
});

publishButton.addEventListener('click',()=>{
  showToast('Prototype only — production publishing will write to the database and refresh the public site.');
});

const modal=document.getElementById('modal');
const modalTitle=document.getElementById('modalTitle');
const modalName=document.getElementById('modalName');
addCommunity.addEventListener('click',()=>openModal('Add Community'));
addBuilder.addEventListener('click',()=>openModal('Add Builder'));
function openModal(title){modalTitle.textContent=title;modalName.value='';modal.classList.remove('hidden');}
closeModal.addEventListener('click',()=>modal.classList.add('hidden'));
saveModal.addEventListener('click',()=>{modal.classList.add('hidden');showToast('Draft saved locally for prototype preview.');});

function showToast(text){
  toast.textContent=text;toast.classList.remove('hidden');
  setTimeout(()=>toast.classList.add('hidden'),2600);
}

loadHomepage();
