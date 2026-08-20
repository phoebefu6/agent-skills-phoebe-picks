window.dataLayer=window.dataLayer||[];
const sessionEvents=[];
let analyticsConsent=false;
const params=new URLSearchParams(location.search);
const campaign={
  source:(params.get('utm_source')||'direct').toLowerCase(),
  medium:(params.get('utm_medium')||'none').toLowerCase(),
  campaign:(params.get('utm_campaign')||'not_set').toLowerCase(),
  content:(params.get('utm_content')||'not_set').toLowerCase()
};
const eventLog=document.querySelector('#eventLog');
const qaList=document.querySelector('#qaList');
const consentState=document.querySelector('#consentState');
const consentToggle=document.querySelector('#consentToggle');
const dialog=document.querySelector('#proofDialog');

function safe(value){return String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');}
function track(event,properties={}){
  if(!analyticsConsent)return;
  const payload={event,...properties,...campaign,timestamp:new Date().toISOString()};
  window.dataLayer.push(payload);sessionEvents.push(payload);renderInspector();
}
function renderInspector(){
  eventLog.innerHTML=sessionEvents.length?sessionEvents.slice().reverse().map(item=>`<div class="log-item"><b>${safe(item.event)}</b><code>${safe(JSON.stringify(item,null,2))}</code></div>`).join(''):'<p class="empty-log">No optional analytics events recorded. Grant local demo consent, then interact with a CTA, method link, or FAQ.</p>';
  const names=sessionEvents.map(x=>x.event);
  const duplicatePage=names.filter(x=>x==='page_viewed').length>1;
  const hasPII=sessionEvents.some(x=>Object.keys(x).some(k=>/email|name|phone|address/i.test(k)));
  const tests=[
    ['Consistent lowercase object-action names',sessionEvents.every(x=>/^[a-z]+(?:_[a-z]+)+$/.test(x.event))],
    ['Required campaign properties populated',sessionEvents.every(x=>x.source&&x.medium&&x.campaign)],
    ['No duplicate page-view event',!duplicatePage],
    ['No personal-data properties',!hasPII],
    ['Optional events respect consent',!sessionEvents.length||analyticsConsent],
    ['CTA location distinguishes placements',sessionEvents.filter(x=>x.event==='cta_clicked').every(x=>['hero','final'].includes(x.cta_location))]
  ];
  qaList.innerHTML=tests.map(([label,pass])=>`<li${pass?'':' class="fail"'}>${safe(label)}${pass?'':' — check failed'}</li>`).join('');
}
function grantConsent(){analyticsConsent=!analyticsConsent;consentState.textContent=analyticsConsent?'Granted':'Denied';consentToggle.textContent=analyticsConsent?'Revoke local demo consent':'Grant local demo consent';if(analyticsConsent)track('page_viewed',{page:'/proof-to-action-lab',content_group:'field_test'});renderInspector();}

document.querySelector('#utmContext').textContent=`${campaign.source} / ${campaign.medium} / ${campaign.campaign} / ${campaign.content}`;
consentToggle.addEventListener('click',grantConsent);
document.querySelector('#clearEvents').addEventListener('click',()=>{sessionEvents.length=0;window.dataLayer.length=0;renderInspector();});
document.querySelectorAll('[data-cta]').forEach(button=>button.addEventListener('click',()=>{track('cta_clicked',{cta_text:button.textContent.trim(),cta_location:button.dataset.location});track('artifact_requested',{cta_location:button.dataset.location});dialog.showModal();}));
document.querySelector('[data-track-link]').addEventListener('click',()=>track('method_link_clicked',{link_location:'hero'}));
document.querySelectorAll('[data-faq]').forEach(item=>item.addEventListener('toggle',()=>{if(item.open&&!item.dataset.tracked){item.dataset.tracked='true';track('faq_opened',{faq_id:item.dataset.faq});}}));
document.querySelectorAll('[data-outbound]').forEach(link=>link.addEventListener('click',()=>track('outbound_link_clicked',{destination_type:link.dataset.outbound})));
document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close();});
renderInspector();
