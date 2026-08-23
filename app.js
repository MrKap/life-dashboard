const STORAGE_KEY='myLifeDashboardV2';
const DAY_KEYS=['sun','mon','tue','wed','thu','fri','sat'];
const DAY_LABELS={sun:'Sunday',mon:'Monday',tue:'Tuesday',wed:'Wednesday',thu:'Thursday',fri:'Friday',sat:'Saturday'};
const sleepStages=['5:00am → 1:00pm','4:30am → 12:30pm','4:00am → 12:00pm','3:30am → 11:30am','3:00am → 11:00am','2:30am → 10:30am','2:00am → 10:00am','1:30am → 9:30am'];

function uid(){return Math.random().toString(36).slice(2,9)}
function ev(start,end,title,type='free',note='',optional=false){return {id:uid(),start,end,title,type,note,optional}}
function ex(name,sets,reps,category,note='',neutral=false,cuff=false,knee=false){return {id:uid(),name,sets,reps,category,note,neutral,cuff,knee}}
function freshData(){
 return {
  settings:{workDrive:20,gymDrive:10,ballDrive:15,workPrep:40,sportPrep:30},
  sundayGame:'17:30',currentSleep:0,lowEnergy:false,
  focus:{mon:'Gym + longest tutoring shift',tue:'Uni + optional basketball + tutoring',wed:'Main strength day + tutoring',thu:'Basketball + tutoring',fri:'Big uni day + rehab',sat:'Uni first, then recovery',sun:'Game day — protect energy and knees'},
  days:{
   mon:[ev('09:30','09:45','Wake','sleep','Water, daylight, medication as prescribed'),ev('10:00','10:25','Breakfast','food'),ev('10:30','11:45','MIS771 deep work','uni'),ev('11:45','12:10','Lunch','food'),ev('12:10','12:40','Get ready for gym','free','30 min'),ev('12:40','12:50','🚗 LEAVE HOME for gym','leave','10-minute drive'),ev('12:50','13:35','Gym A','gym','Upper/core dominant; conservative legs after Sunday game'),ev('13:35','13:45','Drive home'),ev('13:45','14:00','Quick shower'),ev('14:00','14:40','Get ready for work','free','Full 40 min'),ev('14:40','15:00','🚗 LEAVE HOME for work','leave','20-minute drive'),ev('15:00','19:00','Tutoring','work'),ev('19:00','19:20','Drive home'),ev('19:20','20:00','Dinner','food'),ev('20:00','21:15','MIS710 / light uni','uni','Admin or easier tasks'),ev('21:15','23:30','Free time'),ev('23:45','23:55','Tomorrow setup','free','Clothes, bag, medication, water'),ev('00:00','00:05','Block scrolling apps','sleep'),ev('00:15','00:45','Teeth / bathroom','sleep'),ev('01:00','01:30','Bed wind-down','sleep','Podcast/audiobook okay'),ev('01:30','01:31','Sleep target','sleep')],
   tue:[ev('09:30','09:45','Wake','sleep'),ev('10:00','10:25','Breakfast','food'),ev('10:30','12:30','MIS771 deep work','uni'),ev('12:30','13:00','Lunch','food'),ev('13:00','13:30','Get ready for basketball'),ev('13:30','13:45','🚗 LEAVE HOME for basketball','leave','15-minute drive',true),ev('13:45','14:30','Optional skills/shooting','ball','Skip if knees are unhappy',true),ev('14:30','14:45','Drive home','free','',true),ev('14:45','15:00','Shower + snack','food','',true),ev('15:00','15:40','Get ready for work'),ev('15:40','16:00','🚗 LEAVE HOME for work','leave','20-minute drive'),ev('16:00','17:00','Tutoring','work'),ev('17:00','17:20','Drive home'),ev('17:20','18:00','Dinner','food'),ev('18:00','20:00','MIS710 deep work','uni'),ev('20:00','23:30','Free time'),ev('23:45','23:55','Tomorrow setup','sleep'),ev('00:00','00:05','Block scrolling apps','sleep'),ev('01:00','01:30','Bed wind-down','sleep'),ev('01:30','01:31','Sleep target','sleep')],
   wed:[ev('09:30','09:45','Wake','sleep'),ev('10:00','10:25','Breakfast','food'),ev('10:30','12:30','MIS771 deep work','uni'),ev('12:30','13:00','Lunch','food'),ev('13:00','13:30','Get ready for gym'),ev('13:30','13:40','🚗 LEAVE HOME for gym','leave','10-minute drive'),ev('13:40','14:55','Gym B — main strength/rehab','gym'),ev('14:55','15:05','Drive home'),ev('15:05','15:30','Shower + substantial snack','food'),ev('15:30','16:00','Easy uni/admin','uni'),ev('16:00','16:40','Get ready for work'),ev('16:40','17:00','🚗 LEAVE HOME for work','leave','20-minute drive'),ev('17:00','18:00','Tutoring','work'),ev('18:00','18:20','Drive home'),ev('18:20','19:00','Dinner','food'),ev('19:00','20:30','MIS710 / uni','uni'),ev('20:30','23:30','Free time'),ev('01:00','01:30','Bed wind-down','sleep'),ev('01:30','01:31','Sleep target','sleep')],
   thu:[ev('09:30','09:45','Wake','sleep'),ev('10:00','10:25','Breakfast','food'),ev('10:30','11:15','Uni','uni'),ev('11:15','11:45','Get ready for basketball'),ev('11:45','12:00','🚗 LEAVE HOME for basketball','leave','15-minute drive'),ev('12:00','13:30','Basketball with friend','ball'),ev('13:30','13:45','Drive home'),ev('13:45','14:15','Shower / change'),ev('14:15','14:40','Lunch','food'),ev('14:40','15:00','Pack work things / admin'),ev('15:00','15:40','Get ready for work'),ev('15:40','16:00','🚗 LEAVE HOME for work','leave','20-minute drive'),ev('16:00','17:00','Tutoring','work'),ev('17:00','17:20','Drive home'),ev('17:20','18:00','Dinner','food'),ev('18:00','20:00','Uni','uni'),ev('20:00','23:30','Free / recovery'),ev('01:00','01:30','Bed wind-down','sleep'),ev('01:30','01:31','Sleep target','sleep')],
   fri:[ev('09:30','09:45','Wake','sleep'),ev('10:00','10:25','Breakfast','food'),ev('10:30','12:30','Uni deep work #1','uni'),ev('12:30','13:15','Lunch + real break','food'),ev('13:15','15:15','Uni deep work #2','uni'),ev('15:15','15:45','Break + snack / walk','food'),ev('15:45','16:15','Rehab','rehab','Knee + ankle + hip work from proper rehab plan'),ev('16:15','16:45','Shower'),ev('16:45','17:45','Optional uni/admin','uni','Use only if useful',true),ev('17:45','23:30','Free night'),ev('01:00','01:30','Bed wind-down','sleep'),ev('01:30','01:31','Sleep target','sleep')],
   sat:[ev('09:30','09:45','Wake','sleep'),ev('10:00','10:20','Breakfast','food'),ev('10:30','12:30','Uni','uni'),ev('12:30','13:30','Lunch / break','food'),ev('13:30','15:30','Uni','uni'),ev('15:30','15:50','Light mobility','rehab','Ankle / hip / easy recovery'),ev('15:50','23:30','Free time'),ev('01:00','01:30','Bed wind-down','sleep'),ev('01:30','01:31','Sleep target','sleep')],
   sun:[]
  },
  uni:{
   MIS771:{name:'MIS771',due:'2026-09-11',progress:5,tasks:[{id:uid(),text:'Create assignment document/notebook and marking-criteria headings',done:false},{id:uid(),text:'Break assignment into concrete subtasks',done:false},{id:uid(),text:'Start first substantive section',done:false}]},
   MIS710:{name:'MIS710',due:'2026-09-30',progress:0,tasks:[{id:uid(),text:'Read final assignment rubric carefully',done:false},{id:uid(),text:'Create notebook/document structure',done:false},{id:uid(),text:'Identify first analysis task',done:false}]}
  },
  rehab:[
   {id:uid(),text:'Friday rehab session',done:false},{id:uid(),text:'Saturday light ankle/hip mobility',done:false},{id:uid(),text:'Track knee response after Thursday basketball',done:false},{id:uid(),text:'Track knee response after Sunday game',done:false}
  ],
  gym:{
   A:{focus:'Lighter lower-body load after Sunday basketball; upper body + core emphasis.',exercises:[
    ex('Upper-body machine','3','8–12','Upper body','Choose neutral-grip option when possible',true,false,false),
    ex('Supported row','3','8–12','Upper body','Neutral grip',true,true,false),
    ex('Core exercise','3','','Core','Forearm-supported or wrist-neutral',true,false,false)
   ]},
   B:{focus:'Main strength + rehab session; structured lower-body/tendon work plus upper-body machines.',exercises:[
    ex('Knee rehab / tendon strength','','','Rehab','Use physio-approved progression',false,false,true),
    ex('Hamstring / glute exercise','3','8–12','Lower body','',false,false,true),
    ex('Calf / soleus exercise','3','8–15','Lower body','',false,false,true),
    ex('Upper push or pull machine','3','8–12','Upper body','Neutral grip if possible',true,true,false)
   ]}
  }
 };
}
let data=load();
let currentView='today', currentDay=null, currentSession='A', deferredPrompt=null;

function load(){try{const raw=localStorage.getItem(STORAGE_KEY);return raw?JSON.parse(raw):freshData()}catch(e){return freshData()}}
function save(){localStorage.setItem(STORAGE_KEY,JSON.stringify(data))}
function esc(s){return String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]))}
function mins(t){if(!t||!/^\d\d:\d\d$/.test(t))return null;const [h,m]=t.split(':').map(Number);return h*60+m}
function fmt(t){if(!t)return'';let[h,m]=t.split(':').map(Number);const ap=h>=12?'pm':'am';h=h%12||12;return `${h}:${String(m).padStart(2,'0')}${ap}`}
function fmtRange(a,b){return b&&b!==a?`${fmt(a)}–${fmt(b)}`:fmt(a)}
function nowMinutes(){const n=new Date();return n.getHours()*60+n.getMinutes()}
function dayKeyFromDate(d=new Date()){return DAY_KEYS[d.getDay()]}
function localDateKey(d=new Date()){return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`}
function doneKey(day,id){return `done:${localDateKey()}:${day}:${id}`}
function isDone(day,id){return !!data[doneKey(day,id)]}
function setDone(day,id,v){data[doneKey(day,id)]=v;save()}
function sortEvents(day){data.days[day].sort((a,b)=>(mins(a.start)??9999)-(mins(b.start)??9999))}
function daysUntil(dateStr){const t=new Date(dateStr+'T12:00:00'),n=new Date();n.setHours(12,0,0,0);return Math.ceil((t-n)/86400000)}

function buildSunday(){
 const start=mins(data.sundayGame), prep=start-80, leave=start-40, arrive=start-25, end=start+60;
 function tm(v){v=(v+1440)%1440;return `${String(Math.floor(v/60)).padStart(2,'0')}:${String(v%60).padStart(2,'0')}`}
 data.days.sun=[
  ev('09:30','09:45','Wake','sleep'),ev('10:00','10:20','Breakfast','food'),ev('10:30','12:00','Light uni / weekly review','uni'),ev('12:00','12:45','Lunch','food'),
  ev('12:45',tm(prep),'Relax + recover'),ev(tm(start-180),tm(start-150),'Pre-game meal','food','Aim roughly 2.5–3 hours before tip'),
  ev(tm(prep),tm(leave),'Get dressed + hair + pack bag','free','40 minutes'),ev(tm(leave),tm(arrive),'🚗 LEAVE HOME for game','leave','~15 min drive; arrive 25 min before tip'),
  ev(tm(arrive),data.sundayGame,'Warm up / stretch / shoot','ball'),ev(data.sundayGame,tm(end),'Basketball GAME','ball','Two 20-minute halves; you often play 35–40+ minutes'),
  ev(tm(end),tm(end+15),'Drive home'),ev(tm(end+15),tm(end+60),'Shower + dinner + recover','food'),ev('01:00','01:30','Bed wind-down','sleep'),ev('01:30','01:31','Sleep target','sleep')
 ];
 save();
}
if(!data.days.sun||!data.days.sun.length) buildSunday();

function switchView(view){
 currentView=view;
 document.querySelectorAll('.view').forEach(v=>v.classList.toggle('active',v.id===view+'View'));
 document.querySelectorAll('[data-view]').forEach(b=>b.classList.toggle('active',b.dataset.view===view));
 if(view==='today')renderToday();
 if(view==='week')renderWeek();
 if(view==='uni')renderUni();
 if(view==='fitness')renderFitness();
 if(view==='sleep')renderSleep();
 if(view==='settings')renderSettings();
 window.scrollTo({top:0,behavior:'smooth'});
}
document.querySelectorAll('[data-view]').forEach(b=>b.addEventListener('click',()=>switchView(b.dataset.view)));

function renderToday(){
 currentDay=currentDay||dayKeyFromDate();
 const d=new Date();
 document.getElementById('todayDate').textContent=currentDay===dayKeyFromDate()?d.toLocaleDateString(undefined,{weekday:'long',day:'numeric',month:'long'}):DAY_LABELS[currentDay];
 document.getElementById('todayHeading').textContent=DAY_LABELS[currentDay];
 document.getElementById('todayFocus').textContent=data.focus[currentDay]||'';
 document.getElementById('lowEnergyToggle').checked=!!data.lowEnergy;
 const tl=document.getElementById('todayTimeline');tl.innerHTML='';
 sortEvents(currentDay);
 const visible=data.days[currentDay].filter(e=>!(data.lowEnergy&&e.optional));
 visible.forEach(e=>{
  const row=document.createElement('div');row.className=`event ${e.type||'free'}${e.optional?' optional':''}${isDone(currentDay,e.id)?' done':''}`;
  row.innerHTML=`<div class="eventTime">${esc(fmtRange(e.start,e.end))}</div>
    <div><div class="eventTitle">${esc(e.title)}</div>${e.note?`<div class="eventNote">${esc(e.note)}</div>`:''}</div>
    <div class="eventBtns"><button class="iconbtn doneBtn" title="Done">${isDone(currentDay,e.id)?'↩':'✓'}</button><button class="iconbtn editBtn" title="Edit">✏️</button><button class="iconbtn upBtn" title="Move earlier">↑</button><button class="iconbtn downBtn" title="Move later">↓</button></div>`;
  row.querySelector('.doneBtn').onclick=()=>{setDone(currentDay,e.id,!isDone(currentDay,e.id));renderToday()};
  row.querySelector('.editBtn').onclick=()=>openEvent(currentDay,e.id);
  row.querySelector('.upBtn').onclick=()=>nudgeEvent(e,-15);
  row.querySelector('.downBtn').onclick=()=>nudgeEvent(e,15);
  tl.appendChild(row);
 });
 renderNext(visible);
}
function nudgeEvent(e,delta){
 const sm=mins(e.start),em=mins(e.end);if(sm===null)return;
 const toT=m=>`${String(Math.floor(((m+1440)%1440)/60)).padStart(2,'0')}:${String(((m+1440)%1440)%60).padStart(2,'0')}`;
 e.start=toT(sm+delta);if(em!==null)e.end=toT(em+delta);save();renderToday();
}
function renderNext(events){
 if(currentDay!==dayKeyFromDate()){
  document.getElementById('nextTitle').textContent=`Viewing ${DAY_LABELS[currentDay]}`;
  document.getElementById('nextCountdown').textContent='Switch back to today by tapping the current day in Week.';
  document.getElementById('nextLeave').textContent='—';document.getElementById('nextLeaveCountdown').textContent='';return;
 }
 const now=nowMinutes();
 const upcoming=events.filter(e=>mins(e.start)!==null&&mins(e.start)>=now).sort((a,b)=>mins(a.start)-mins(b.start));
 const next=upcoming[0];
 if(next){const delta=mins(next.start)-now;document.getElementById('nextTitle').textContent=next.title;document.getElementById('nextCountdown').textContent=delta===0?'Starting now':`Starts in ${Math.floor(delta/60)?Math.floor(delta/60)+'h ':''}${delta%60}m · ${fmt(next.start)}`;}
 else{document.getElementById('nextTitle').textContent='Nothing else scheduled';document.getElementById('nextCountdown').textContent='You are done with today’s planned blocks.'}
 const leaves=upcoming.filter(e=>e.type==='leave');const leave=leaves[0];
 if(leave){const delta=mins(leave.start)-now;document.getElementById('nextLeave').textContent=`${fmt(leave.start)} — ${leave.title.replace('🚗 ','')}`;document.getElementById('nextLeaveCountdown').textContent=`${Math.floor(delta/60)?Math.floor(delta/60)+'h ':''}${delta%60}m from now`;}
 else{document.getElementById('nextLeave').textContent='No departure coming up';document.getElementById('nextLeaveCountdown').textContent='';}
}

function renderWeek(){
 const g=document.getElementById('weekGrid');g.innerHTML='';const today=dayKeyFromDate();
 ['mon','tue','wed','thu','fri','sat','sun'].forEach(k=>{
  const c=document.createElement('div');c.className='daycol'+(k===today?' todaycol':'');c.innerHTML=`<h3>${DAY_LABELS[k]}</h3>`;
  data.days[k].filter(e=>['uni','gym','ball','work','leave','rehab'].includes(e.type)).forEach(e=>{const m=document.createElement('div');m.className=`mini ${e.type}`;m.innerHTML=`<b>${esc(fmtRange(e.start,e.end))}</b>${esc(e.title)}`;c.appendChild(m)});
  c.onclick=()=>{currentDay=k;switchView('today')};g.appendChild(c);
 });
}

function renderUni(){
 const g=document.getElementById('uniGrid');g.innerHTML='';
 Object.entries(data.uni).forEach(([key,s])=>{
  const days=daysUntil(s.due);
  const c=document.createElement('div');c.className='card';
  c.innerHTML=`<div class="subjectHeader"><div><h2>${esc(s.name)}</h2><div class="muted">Due ${new Date(s.due+'T12:00:00').toLocaleDateString(undefined,{day:'numeric',month:'short'})} · ${days>=0?days+' days left':'past due'}</div></div><span class="badge">${s.progress}%</span></div>
  <div class="progress"><span style="width:${Math.max(0,Math.min(100,s.progress))}%"></span></div>
  <label style="margin-top:12px">Progress %</label><input type="number" min="0" max="100" value="${s.progress}" data-progress="${key}">
  <div class="taskList" data-task-list="${key}"></div>
  <div class="toolbar"><button class="btn" data-add-task="${key}">＋ Add next action</button></div>`;
  g.appendChild(c);
  const list=c.querySelector(`[data-task-list="${key}"]`);
  s.tasks.forEach(t=>{
    const row=document.createElement('div');row.className='taskRow';row.innerHTML=`<input type="checkbox" ${t.done?'checked':''}><div>${esc(t.text)}</div><button class="iconbtn">✏️</button>`;
    row.querySelector('input').onchange=e=>{t.done=e.target.checked;save()};
    row.querySelector('button').onclick=()=>{const v=prompt('Next action',t.text);if(v!==null&&v.trim()){t.text=v.trim();save();renderUni()}};
    list.appendChild(row);
  });
 });
 document.querySelectorAll('[data-progress]').forEach(i=>i.addEventListener('change',()=>{data.uni[i.dataset.progress].progress=Math.max(0,Math.min(100,Number(i.value)||0));save();renderUni()}));
 document.querySelectorAll('[data-add-task]').forEach(b=>b.addEventListener('click',()=>{const v=prompt('Add a concrete next action');if(v&&v.trim()){data.uni[b.dataset.addTask].tasks.push({id:uid(),text:v.trim(),done:false});save();renderUni()}}));
}

function renderFitness(){
 document.getElementById('sundayGame').value=data.sundayGame;
 renderGameCalc();renderRehab();renderGym();
}
function renderGameCalc(){
 const s=mins(data.sundayGame), toT=m=>`${String(Math.floor(((m+1440)%1440)/60)).padStart(2,'0')}:${String(((m+1440)%1440)%60).padStart(2,'0')}`;
 document.getElementById('gameCalc').innerHTML=`<b>For a ${fmt(data.sundayGame)} game:</b><br>Start getting ready <b>${fmt(toT(s-80))}</b> · Leave home <b>${fmt(toT(s-40))}</b> · Arrive about <b>${fmt(toT(s-25))}</b>.`;
}
document.getElementById('sundayGame').addEventListener('change',e=>{data.sundayGame=e.target.value;buildSunday();renderGameCalc();renderWeek()});
function renderRehab(){
 const box=document.getElementById('rehabChecklist');box.innerHTML='';
 data.rehab.forEach(r=>{const row=document.createElement('div');row.className='taskRow';row.innerHTML=`<input type="checkbox" ${r.done?'checked':''}><div>${esc(r.text)}</div><button class="iconbtn">✏️</button>`;row.querySelector('input').onchange=e=>{r.done=e.target.checked;save()};row.querySelector('button').onclick=()=>{const v=prompt('Rehab item',r.text);if(v&&v.trim()){r.text=v.trim();save();renderRehab()}};box.appendChild(row)});
}
function renderGym(){
 document.querySelectorAll('[data-session]').forEach(b=>b.classList.toggle('active',b.dataset.session===currentSession));
 const s=data.gym[currentSession];document.getElementById('gymFocus').innerHTML=`<b>${currentSession==='A'?'Monday · Gym A':'Wednesday · Gym B'}</b><br>${esc(s.focus)}`;
 const box=document.getElementById('exerciseList');box.innerHTML='';
 s.exercises.forEach((e,i)=>{
  const row=document.createElement('div');row.className='exercise';
  const flags=[e.neutral?'Neutral grip':null,e.cuff?'Cuff-friendly':null,e.knee?'Knee/rehab':null].filter(Boolean);
  row.innerHTML=`<div class="exerciseNum">${i+1}</div><div><div class="exerciseName">${esc(e.name)}</div><div class="exerciseMeta">${esc([e.sets?e.sets+' sets':'',e.reps?e.reps+' reps':'',e.category,e.note].filter(Boolean).join(' · '))}</div>${flags.length?`<div class="exerciseFlags">${flags.map(f=>`<span class="flag">${esc(f)}</span>`).join('')}</div>`:''}</div><div class="eventBtns"><button class="iconbtn editExercise">✏️</button><button class="iconbtn upExercise">↑</button><button class="iconbtn downExercise">↓</button></div>`;
  row.querySelector('.editExercise').onclick=()=>openExercise(e.id);row.querySelector('.upExercise').onclick=()=>moveExercise(i,-1);row.querySelector('.downExercise').onclick=()=>moveExercise(i,1);box.appendChild(row)
 });
}
document.querySelectorAll('[data-session]').forEach(b=>b.addEventListener('click',()=>{currentSession=b.dataset.session;renderGym()}));
function moveExercise(i,d){const a=data.gym[currentSession].exercises,j=i+d;if(j<0||j>=a.length)return;[a[i],a[j]]=[a[j],a[i]];save();renderGym()}
document.getElementById('addExerciseBtn').onclick=()=>openExercise(null);

function renderSleep(){
 const g=document.getElementById('sleepStages');g.innerHTML='';
 sleepStages.forEach((s,i)=>{const b=document.createElement('button');b.className='stage'+(data.currentSleep===i?' active':'');b.innerHTML=`<small>${i===0?'Start':i===7?'Target':'Step '+(i+1)}</small><strong>${s}</strong>`;b.onclick=()=>{data.currentSleep=i;save();renderSleep()};g.appendChild(b)});
 const night=['11:45pm — set up tomorrow','12:00am — block scrolling apps','12:15am — teeth + bathroom','1:00am — get into bed / audiobook okay'];
 const morning=['Wake at current stage target','Water + daylight','Breakfast','Medication as prescribed'];
 renderSimpleChecks('nightChecklist',night,'night');renderSimpleChecks('morningChecklist',morning,'morning');
}
function renderSimpleChecks(id,items,prefix){
 const b=document.getElementById(id);b.innerHTML='';
 items.forEach((t,i)=>{const k=`simple:${localDateKey()}:${prefix}:${i}`;const row=document.createElement('div');row.className='taskRow';row.innerHTML=`<input type="checkbox" ${data[k]?'checked':''}><div>${esc(t)}</div><span></span>`;row.querySelector('input').onchange=e=>{data[k]=e.target.checked;save()};b.appendChild(row)})
}

function renderSettings(){
 const s=data.settings;for(const k of ['workDrive','gymDrive','ballDrive','workPrep','sportPrep'])document.getElementById(k).value=s[k];
}
document.getElementById('saveSettings').onclick=()=>{for(const k of ['workDrive','gymDrive','ballDrive','workPrep','sportPrep'])data.settings[k]=Math.max(0,Number(document.getElementById(k).value)||0);save();alert('Settings saved. We can wire these into more automatic schedule calculations in the next version.')};

function openEvent(day,id=null){
 const dlg=document.getElementById('eventDialog'),e=id?data.days[day].find(x=>x.id===id):ev('12:00','12:30','','free');
 document.getElementById('eventDialogTitle').textContent=id?'Edit block':'Add block';
 document.getElementById('eventDay').value=day;document.getElementById('eventId').value=id||'';
 document.getElementById('eventStart').value=e.start;document.getElementById('eventEnd').value=e.end;document.getElementById('eventTitle').value=e.title;document.getElementById('eventType').value=e.type;document.getElementById('eventOptional').checked=!!e.optional;document.getElementById('eventNote').value=e.note||'';
 document.getElementById('deleteEvent').style.display=id?'inline-block':'none';dlg.showModal();
}
document.getElementById('addTodayBtn').onclick=()=>openEvent(currentDay,null);
document.getElementById('cancelEvent').onclick=()=>document.getElementById('eventDialog').close();
document.getElementById('eventForm').addEventListener('submit',e=>{
 e.preventDefault();const day=document.getElementById('eventDay').value,id=document.getElementById('eventId').value;
 const obj={id:id||uid(),start:document.getElementById('eventStart').value,end:document.getElementById('eventEnd').value,title:document.getElementById('eventTitle').value.trim(),type:document.getElementById('eventType').value,optional:document.getElementById('eventOptional').checked,note:document.getElementById('eventNote').value.trim()};
 if(!obj.title||!obj.start)return;
 if(id){const i=data.days[day].findIndex(x=>x.id===id);data.days[day][i]=obj}else data.days[day].push(obj);
 sortEvents(day);save();document.getElementById('eventDialog').close();renderToday();renderWeek();
});
document.getElementById('deleteEvent').onclick=()=>{const day=document.getElementById('eventDay').value,id=document.getElementById('eventId').value;if(!id)return;if(confirm('Delete this block?')){data.days[day]=data.days[day].filter(x=>x.id!==id);save();document.getElementById('eventDialog').close();renderToday();renderWeek()}};
document.getElementById('lowEnergyToggle').onchange=e=>{data.lowEnergy=e.target.checked;save();renderToday()};
document.getElementById('editDayFocusBtn').onclick=()=>{const v=prompt('Focus for '+DAY_LABELS[currentDay],data.focus[currentDay]||'');if(v!==null){data.focus[currentDay]=v.trim();save();renderToday()}};

function openExercise(id=null){
 const dlg=document.getElementById('exerciseDialog'),e=id?data.gym[currentSession].exercises.find(x=>x.id===id):ex('','3','8–12','Upper body');
 document.getElementById('exerciseDialogTitle').textContent=id?'Edit exercise':'Add exercise';document.getElementById('exerciseId').value=id||'';document.getElementById('exerciseName').value=e.name;document.getElementById('exerciseSets').value=e.sets;document.getElementById('exerciseReps').value=e.reps;document.getElementById('exerciseCategory').value=e.category;document.getElementById('exerciseNeutral').checked=!!e.neutral;document.getElementById('exerciseCuff').checked=!!e.cuff;document.getElementById('exerciseKnee').checked=!!e.knee;document.getElementById('exerciseNote').value=e.note||'';document.getElementById('deleteExercise').style.display=id?'inline-block':'none';dlg.showModal()
}
document.getElementById('cancelExercise').onclick=()=>document.getElementById('exerciseDialog').close();
document.getElementById('exerciseForm').addEventListener('submit',e=>{e.preventDefault();const id=document.getElementById('exerciseId').value,obj={id:id||uid(),name:document.getElementById('exerciseName').value.trim(),sets:document.getElementById('exerciseSets').value.trim(),reps:document.getElementById('exerciseReps').value.trim(),category:document.getElementById('exerciseCategory').value,neutral:document.getElementById('exerciseNeutral').checked,cuff:document.getElementById('exerciseCuff').checked,knee:document.getElementById('exerciseKnee').checked,note:document.getElementById('exerciseNote').value.trim()};if(!obj.name)return;if(id){const i=data.gym[currentSession].exercises.findIndex(x=>x.id===id);data.gym[currentSession].exercises[i]=obj}else data.gym[currentSession].exercises.push(obj);save();document.getElementById('exerciseDialog').close();renderGym()});
document.getElementById('deleteExercise').onclick=()=>{const id=document.getElementById('exerciseId').value;if(id&&confirm('Delete this exercise?')){data.gym[currentSession].exercises=data.gym[currentSession].exercises.filter(x=>x.id!==id);save();document.getElementById('exerciseDialog').close();renderGym()}};

document.getElementById('exportBtn').onclick=()=>{const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'}),a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`life-dashboard-backup-${localDateKey()}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)};
document.getElementById('importBtn').onclick=()=>document.getElementById('importFile').click();
document.getElementById('importFile').addEventListener('change',async e=>{const f=e.target.files[0];if(!f)return;try{const x=JSON.parse(await f.text());if(!x.days||!x.gym)throw 0;data=x;save();buildSunday();renderAll();alert('Backup restored.')}catch(err){alert('That does not look like a valid Life Dashboard backup.')}e.target.value=''});
document.getElementById('resetApp').onclick=()=>{if(confirm('Reset EVERYTHING in the app?')){data=freshData();buildSunday();save();renderAll();switchView('today')}};

window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredPrompt=e;document.getElementById('installBtn').hidden=false});
document.getElementById('installBtn').onclick=async()=>{if(!deferredPrompt)return;deferredPrompt.prompt();await deferredPrompt.userChoice;deferredPrompt=null;document.getElementById('installBtn').hidden=true};

if('serviceWorker' in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('./service-worker.js').catch(()=>{}));

function renderAll(){renderToday();renderWeek();renderUni();renderFitness();renderSleep();renderSettings()}
currentDay=dayKeyFromDate();renderAll();
setInterval(()=>{if(currentView==='today')renderToday()},60000);
