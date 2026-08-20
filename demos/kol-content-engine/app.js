const pillars=[
  {name:"Skill proof",share:"30%",why:"Turn every review into inspectable evidence.",topics:["Field-test notes","Before / after","Coverage ledgers"]},
  {name:"Data + AI decisions",share:"30%",why:"Own the judgment layer around tools and methods.",topics:["Evaluation design","Governance","Decision quality"]},
  {name:"Builder practice",share:"25%",why:"Make the craft useful to people doing the work.",topics:["Walkthroughs","Failure recovery","Reusable templates"]},
  {name:"Human judgment",share:"15%",why:"Name where leadership, trust, and context still matter.",topics:["Tradeoffs","Adoption tension","Responsible use"]}
];

const ideas=[
  {title:"How to evaluate an agent Skill before installing it",kind:"Both · hub",stage:"Awareness",keyword:"evaluate agent skills",impact:9,fit:10,search:7,resource:8},
  {title:"Skill stars vs field proof: what each signal can tell you",kind:"Shareable · POV",stage:"Consideration",keyword:"agent skill quality",impact:9,fit:10,search:5,resource:9},
  {title:"Agent Skill review template: source, coverage, proof, limits",kind:"Searchable · template",stage:"Implementation",keyword:"agent skill review template",impact:8,fit:10,search:7,resource:8},
  {title:"The hidden maintenance cost of reusable agent instructions",kind:"Shareable · insight",stage:"Awareness",keyword:"agent skill drift",impact:8,fit:8,search:5,resource:8},
  {title:"Claude Code vs Codex Skills: a portability checklist",kind:"Both · comparison",stage:"Consideration",keyword:"Claude Code Codex skills",impact:8,fit:8,search:8,resource:6},
  {title:"How concept coverage changes an AI workflow review",kind:"Searchable · guide",stage:"Awareness",keyword:"AI workflow evaluation",impact:7,fit:9,search:6,resource:8},
  {title:"A transparent failed field test—and what it taught us",kind:"Shareable · meta",stage:"Decision",keyword:"",impact:7,fit:9,search:3,resource:8},
  {title:"Build your first evidence-backed Skill shortlist",kind:"Searchable · how-to",stage:"Implementation",keyword:"best agent skills workflow",impact:8,fit:9,search:7,resource:7}
].map(x=>({...x,score:(x.impact*.4+x.fit*.3+x.search*.2+x.resource*.1).toFixed(1)}));

const atoms=[
  {id:"linkedin",label:"LinkedIn story post",meta:"1,250–1,500 chars · link in comments",hook:"I stopped treating GitHub stars as a review.",copy:"Stars answer one question: did a repository attract attention?\n\nThey do not tell me whether a Skill changed the work.\n\nSo I built a stricter test:\n\n1. Read the source completely.\n2. Name its key concepts.\n3. Build something new with about 80% of them.\n4. Show the artifact.\n5. Publish three strengths—and three limits.\n\nPopularity still matters. It is a credibility gate, not the verdict.\n\nWhat evidence would make you trust an agent workflow?"},
  {id:"carousel",label:"LinkedIn carousel",meta:"10 slides · educational",hook:"A 10-slide proof sequence",copy:"01 Stars ≠ outcomes\n02 Start with the exact source\n03 Read the method completely\n04 Name the concept families\n05 Build from scratch\n06 Exercise ~80%\n07 Preserve the proof artifact\n08 Rate the field result\n09 Name 3 strengths + 3 limits\n10 Decide: publish, explore, or reject"},
  {id:"thread",label:"X tutorial thread",meta:"8 posts · one lesson each",hook:"A popular agent Skill can still fail your workflow.",copy:"1/ Here is the field-test loop I use before recommending one.\n\n2/ Verify the exact source. A familiar name is not provenance.\n\n3/ Read the Skill end to end. Summaries hide constraints.\n\n4/ Convert instructions into a concept checklist.\n\n5/ Build something new. Installation is not evidence.\n\n6/ Record what worked and what stayed out of scope.\n\n7/ Separate repository popularity from field rating.\n\n8/ Keep the artifact public enough to inspect."},
  {id:"video",label:"Short video",meta:"30 sec · 9:16 · original audio",hook:"Three simultaneous hooks in the first second",copy:"Stop choosing agent Skills by stars alone.",beats:["0–3s · Visual: star counter flips into a checklist | Audio: ‘Stars are not a field test’ | Text: STARS ≠ PROOF","3–10s · Show the exact Skill source and concept checklist","10–25s · Rapid cuts: build, coverage ledger, three strengths, three limits","25–30s · CTA: ‘Inspect the artifact before you adopt the method’","Captions: max 2 lines, 3–5 words per line; highlight PROOF"]},
  {id:"comment",label:"Conversation prompt",meta:"Post live · relationship-led",hook:"Useful disagreement beats applause.",copy:"When you evaluate an AI workflow, which signal carries the most weight: source reputation, visible output, reproducibility, safety review, or something else?\n\nI’m especially interested in the evidence that changed your mind after a tool looked promising."}
];

const week=[
  {day:"MON",name:"Flagship POV",note:"LinkedIn story; reply live in first hour."},
  {day:"TUE",name:"Evidence thread",note:"X tutorial; add a live industry response."},
  {day:"WED",name:"Proof carousel",note:"LinkedIn document; optimize for saves."},
  {day:"THU",name:"30-sec video",note:"Reels / Shorts; test value hook."},
  {day:"FRI",name:"Conversation",note:"Ask one research question; synthesize replies."}
];

const esc=v=>String(v).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;");
const tabs=[...document.querySelectorAll('[data-room]')];
const panels=[...document.querySelectorAll('[data-panel]')];
const pillarRoot=document.querySelector('#pillarGrid');
const ideaRoot=document.querySelector('#ideaTable');
const range=document.querySelector('#scoreRange');
const output=document.querySelector('#scoreOutput');
const filterRoot=document.querySelector('#atomFilters');
const preview=document.querySelector('#atomPreview');
let activeAtom='linkedin';

pillarRoot.innerHTML=pillars.map(p=>`<article class="pillar"><span class="share">${p.share}</span><h3>${esc(p.name)}</h3><p>${esc(p.why)}</p><ul>${p.topics.map(t=>`<li>${esc(t)}</li>`).join('')}</ul></article>`).join('');

function renderIdeas(){const min=Number(range.value);output.value=min.toFixed(1);const visible=ideas.filter(x=>Number(x.score)>=min).sort((a,b)=>b.score-a.score);ideaRoot.innerHTML=`<div class="idea-row header"><span>Score</span><span>Topic</span><span>Type</span><span>Stage</span><span>Keyword</span></div>`+visible.map(x=>`<article class="idea-row"><strong>${x.score}</strong><b>${esc(x.title)}</b><span>${esc(x.kind)}</span><span>${esc(x.stage)}</span><span>${esc(x.keyword||'Demand creation')}</span></article>`).join('');}

function renderAtom(){filterRoot.innerHTML=atoms.map(a=>`<button class="${a.id===activeAtom?'is-active':''}" data-atom="${a.id}">${esc(a.label)}</button>`).join('');const a=atoms.find(x=>x.id===activeAtom);preview.innerHTML=`<div class="atom-meta"><span>${esc(a.label)}</span><span>${esc(a.meta)}</span></div><h3>${esc(a.hook)}</h3><div class="atom-copy">${esc(a.copy)}</div>${a.beats?`<div class="video-beats">${a.beats.map(b=>`<div><b>${esc(b.split(' · ')[0])}</b><span>${esc(b.split(' · ').slice(1).join(' · '))}</span></div>`).join('')}</div>`:''}`;}

document.querySelector('#calendar').innerHTML=week.map(d=>`<article class="day"><b>${d.day}</b><span>${esc(d.name)}</span><p>${esc(d.note)}</p></article>`).join('');
function setRoom(room){tabs.forEach(x=>{const on=x.dataset.room===room;x.classList.toggle('is-active',on);x.setAttribute('aria-pressed',String(on));});panels.forEach(p=>{const on=p.dataset.panel===room;p.hidden=!on;p.classList.toggle('is-active',on);});}
tabs.forEach(btn=>btn.addEventListener('click',()=>setRoom(btn.dataset.room)));
range.addEventListener('input',renderIdeas);
filterRoot.addEventListener('click',e=>{const btn=e.target.closest('[data-atom]');if(!btn)return;activeAtom=btn.dataset.atom;renderAtom();});
const initialRoom=location.hash==='#social'?'distribution':location.hash==='#content-strategy'?'strategy':'strategy';
setRoom(initialRoom);renderIdeas();renderAtom();
if(initialRoom==='distribution')requestAnimationFrame(()=>window.scrollTo({top:document.querySelector('.tabs').offsetTop,behavior:'auto'}));
