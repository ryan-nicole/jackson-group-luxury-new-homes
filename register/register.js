const form = document.getElementById('buyerRegistration');
const confirmation = document.getElementById('confirmationSection');
const formError = document.getElementById('formError');
const emailStatus = document.getElementById('emailStatus');

function fieldValue(data, name, fallback='—'){
  const value = (data.get(name) || '').toString().trim();
  return value || fallback;
}

function setText(id, value){
  const el = document.getElementById(id);
  if(el) el.textContent = value || '—';
}

function formatDate(){
  return new Intl.DateTimeFormat('en-US',{
    year:'numeric',
    month:'long',
    day:'numeric'
  }).format(new Date());
}

function collectRegistration(){
  const data = new FormData(form);
  const prefs = data.getAll('preferences');

  return {
    firstName: fieldValue(data,'firstName',''),
    lastName: fieldValue(data,'lastName',''),
    email: fieldValue(data,'email',''),
    phone: fieldValue(data,'phone',''),
    city: fieldValue(data,'city'),
    builder: fieldValue(data,'builder'),
    community: fieldValue(data,'community'),
    budget: fieldValue(data,'budget'),
    timeline: fieldValue(data,'timeline'),
    visited: fieldValue(data,'visited'),
    needsToSell: fieldValue(data,'needsToSell'),
    firstTimeBuyer: fieldValue(data,'firstTimeBuyer'),
    preferences: prefs.length ? prefs.join(', ') : '—',
    notes: fieldValue(data,'notes'),
    date: formatDate()
  };
}

function fillDocument(reg){
  setText('docName', `${reg.firstName} ${reg.lastName}`.trim());
  setText('docEmail', reg.email);
  setText('docPhone', reg.phone);
  setText('docDate', reg.date);
  setText('docCity', reg.city);
  setText('docBuilder', reg.builder);
  setText('docCommunity', reg.community);
  setText('docBudget', reg.budget);
  setText('docTimeline', reg.timeline);
  setText('docVisited', reg.visited);
  setText('docSell', reg.needsToSell);
  setText('docFirstTime', reg.firstTimeBuyer);
  setText('docPreferences', reg.preferences);
  setText('docNotes', reg.notes);
}

function validateForm(){
  formError.textContent = '';
  if(!form.checkValidity()){
    form.reportValidity();
    formError.textContent = 'Please complete the required fields before continuing.';
    return false;
  }
  return true;
}

form.addEventListener('submit', event=>{
  event.preventDefault();
  if(!validateForm()) return;

  const reg = collectRegistration();
  window.jacksonRegistration = reg;
  fillDocument(reg);

  confirmation.classList.remove('hidden');
  confirmation.scrollIntoView({behavior:'smooth',block:'start'});
});

document.getElementById('printFormBtn').addEventListener('click', ()=>{
  window.print();
});

document.getElementById('downloadPdfBtn').addEventListener('click', async ()=>{
  const reg = window.jacksonRegistration;
  if(!reg) return;

  if(!window.jspdf){
    emailStatus.textContent = 'PDF library is unavailable. Use Print My Form and choose “Save as PDF” instead.';
    return;
  }

  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF({unit:'pt',format:'letter'});
  const left = 54;
  let y = 54;

  pdf.setFont('times','bold');
  pdf.setFontSize(18);
  pdf.text('Jackson Group',left,y);
  y += 24;

  pdf.setFontSize(15);
  pdf.text('New Construction Buyer Registration',left,y);
  y += 18;

  pdf.setFont('helvetica','normal');
  pdf.setFontSize(9);
  pdf.text('Builder Visit Copy',left,y);
  y += 30;

  pdf.setDrawColor(201,163,92);
  pdf.line(left,y,558,y);
  y += 24;

  const rows = [
    ['Name',`${reg.firstName} ${reg.lastName}`.trim()],
    ['Email',reg.email],
    ['Phone',reg.phone],
    ['Registration Date',reg.date],
    ['City',reg.city],
    ['Builder',reg.builder],
    ['Community',reg.community],
    ['Budget',reg.budget],
    ['Move-In Timeline',reg.timeline],
    ['Visited Builder?',reg.visited],
    ['Needs to Sell Current Home',reg.needsToSell],
    ['First-Time Buyer',reg.firstTimeBuyer],
    ['Preferences',reg.preferences],
    ['Additional Notes',reg.notes]
  ];

  pdf.setFontSize(10);
  for(const [label,value] of rows){
    if(y > 700){
      pdf.addPage();
      y = 54;
    }
    pdf.setFont('helvetica','bold');
    pdf.text(label + ':',left,y);
    pdf.setFont('helvetica','normal');
    const lines = pdf.splitTextToSize(value || '—',350);
    pdf.text(lines,left+140,y);
    y += Math.max(18, lines.length*13);
  }

  y += 10;
  if(y > 620){ pdf.addPage(); y = 54; }

  pdf.setFillColor(244,236,223);
  pdf.rect(left,y,504,85,'F');
  pdf.setFont('times','bold');
  pdf.setFontSize(11);
  pdf.text('Representation Notice',left+12,y+20);
  pdf.setFont('helvetica','normal');
  pdf.setFontSize(9);
  const notice = 'This buyer has completed a Jackson Group new-construction registration and intends to work with Jackson Group in connection with their home search. Final representation and compensation are governed by applicable agreements and transaction documents.';
  pdf.text(pdf.splitTextToSize(notice,480),left+12,y+38);

  const filename = `Jackson-Group-Builder-Registration-${reg.firstName || 'Buyer'}-${reg.lastName || ''}.pdf`;
  pdf.save(filename);
});

document.getElementById('emailCopyBtn').addEventListener('click', ()=>{
  const reg = window.jacksonRegistration;
  if(!reg) return;

  emailStatus.textContent =
    `Email delivery is ready to connect. Once the secure backend is activated, this PDF will automatically be sent to ${reg.email}.`;
});
