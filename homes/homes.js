document.querySelectorAll('.tab').forEach(tab=>{tab.addEventListener('click',()=>{document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));document.querySelectorAll('.search-panel').forEach(p=>p.classList.remove('active'));tab.classList.add('active');document.getElementById('tab-'+tab.dataset.tab)?.classList.add('active')})});
function updateResults(target,type,value){if(!target||!value)return;target.innerHTML=`<span>MLS / IDX Results</span><strong>${type}: ${value}</strong><small>Real matching homes will load here on this same page when IDX is connected.</small>`;target.scrollIntoView({behavior:'smooth',block:'start'})}
document.querySelectorAll('.idx-filter-button').forEach(btn=>btn.addEventListener('click',()=>{const type=btn.dataset.filterType;const id=type==='city'?'citySelect':type==='builder'?'builderSelect':'countySelect';updateResults(document.getElementById('primarySearchResults'),type,document.getElementById(id)?.value)}));
document.getElementById('subdivisionGo')?.addEventListener('click',()=>updateResults(document.getElementById('subdivisionResults'),'subdivision',document.getElementById('subdivisionBrowseSelect')?.value));

window.JG_HOME_GATE=window.JG_HOME_GATE||{freePropertyViews:3};
function openListingGate(){const g=document.getElementById("listingGate");if(!g)return;g.hidden=false;g.setAttribute("aria-hidden","false");document.body.style.overflow="hidden"}
function closeListingGate(){const g=document.getElementById("listingGate");if(!g)return;g.hidden=true;g.setAttribute("aria-hidden","true");document.body.style.overflow=""}
document.querySelectorAll("[data-close-gate]").forEach(e=>e.addEventListener("click",closeListingGate));
window.JGRequireAccountForSave=()=>openListingGate();
window.JGRecordPropertyView=function(){const k="jg-property-detail-views";const n=Number(sessionStorage.getItem(k)||0)+1;sessionStorage.setItem(k,String(n));if(n>Number(window.JG_HOME_GATE.freePropertyViews||3))openListingGate();return n};

(function(){
  function params(){
    return new URLSearchParams(window.location.search);
  }
  function hydrateFromHomepage(){
    const p=params();
    const map={location:'fullLocation',price:'fullPrice',beds:'fullBeds',baths:'fullBaths',builder:'fullBuilder',more:'fullMore'};
    Object.keys(map).forEach(k=>{
      const el=document.getElementById(map[k]);
      if(el && p.get(k)) el.value=p.get(k);
    });
  }
  function showFullResults(label){
    const box=document.getElementById('newConstructionResults');
    if(!box)return;
    box.innerHTML=`<div><span>MLS / IDX Results</span><strong>${label||'New Construction Homes'}</strong><small>Real matching listings will populate here when IDX is connected.</small></div>`;
    box.scrollIntoView({behavior:'smooth',block:'start'});
  }
  document.getElementById('fullNewSearch')?.addEventListener('click',()=>{
    const loc=document.getElementById('fullLocation')?.value||'';
    showFullResults(loc ? `New construction near ${loc}` : 'All New Construction');
  });
  hydrateFromHomepage();

  // Curated homepage links preselect their saved-search concept.
  const hash=window.location.hash;
  if(hash==='#recently-reduced') showFullResults('Recently Reduced New Homes');
  if(hash==='#quick-move-in') showFullResults('Quick Move-In Homes');
  if(hash==='#newly-listed') showFullResults('Newly Listed New Construction');
})();
