const STORAGE_KEY = 'myLifeDashboardV2';
const DAY_KEYS = ['sun','mon','tue','wed','thu','fri','sat'];
const DAY_LABELS = {sun:'Sunday',mon:'Monday',tue:'Tuesday',wed:'Wednesday',thu:'Thursday',fri:'Friday',sat:'Saturday'};
const DAY_START_MINUTES = 5 * 60;
const TYPE_LABELS = {
  free:'Free', uni:'Uni', gym:'Gym', ball:'Basketball', work:'Work', rehab:'Rehab', food:'Food', sleep:'Sleep', leave:'Leave home'
};
const SLEEP_STAGES = [
  '5:00am → 1:00pm','4:30am → 12:30pm','4:00am → 12:00pm','3:30am → 11:30am',
  '3:00am → 11:00am','2:30am → 10:30am','2:00am → 10:00am','1:30am → 9:30am'
];
const NIGHT_ITEMS = [
  '11:45pm — set up tomorrow',
  '12:00am — block scrolling apps',
  '12:15am — teeth + bathroom',
  '1:00am — get into bed / audiobook okay'
];
const MORNING_ITEMS = [
  'Wake at current stage target',
  'Water + daylight',
  'Breakfast',
  'Medication as prescribed'
];

function uid(){ return Math.random().toString(36).slice(2, 9); }
function ev(start,end,title,type='free',note='',optional=false){ return {id:uid(),start,end,title,type,note,optional}; }
function ex(name,sets,reps,category,note='',neutral=false,cuff=false,knee=false){ return {id:uid(),name,sets,reps,category,note,neutral,cuff,knee}; }

function freshData(){
  return {
    settings:{workDrive:20,gymDrive:10,ballDrive:15,workPrep:40,sportPrep:30},
    sundayGame:'17:30',
    currentSleep:0,
    lowEnergy:false,
    focus:{
      mon:'Gym + longest tutoring shift',
      tue:'Uni + optional basketball + tutoring',
      wed:'Main strength day + tutoring',
      thu:'Basketball + tutoring',
      fri:'Big uni day + rehab',
      sat:'Uni first, then recovery',
      sun:'Game day — protect energy and knees'
    },
    days:{
      mon:[
        ev('09:30','09:45','Wake','sleep','Water, daylight, medication as prescribed'),
        ev('10:00','10:25','Breakfast','food'),
        ev('10:30','11:45','MIS771 deep work','uni'),
        ev('11:45','12:10','Lunch','food'),
        ev('12:10','12:40','Get ready for gym','free','30 minutes'),
        ev('12:40','12:50','🚗 Leave home for gym','leave','10-minute drive'),
        ev('12:50','13:35','Gym A','gym','Upper/core dominant; conservative legs after Sunday game'),
        ev('13:35','13:45','Drive home','free'),
        ev('13:45','14:00','Quick shower','free'),
        ev('14:00','14:40','Get ready for work','free','Full 40 minutes'),
        ev('14:40','15:00','🚗 Leave home for work','leave','20-minute drive'),
        ev('15:00','19:00','Tutoring','work'),
        ev('19:00','19:20','Drive home','free'),
        ev('19:20','20:00','Dinner','food'),
        ev('20:00','21:15','MIS710 / light uni','uni','Admin or easier tasks'),
        ev('21:15','23:30','Free time','free'),
        ev('23:45','23:55','Tomorrow setup','free','Clothes, bag, medication, water'),
        ev('00:00','00:05','Block scrolling apps','sleep'),
        ev('00:15','00:45','Teeth / bathroom','sleep'),
        ev('01:00','01:30','Bed wind-down','sleep','Podcast / audiobook okay'),
        ev('01:30','01:31','Sleep target','sleep')
      ],
      tue:[
        ev('09:30','09:45','Wake','sleep'),
        ev('10:00','10:25','Breakfast','food'),
        ev('10:30','12:30','MIS771 deep work','uni'),
        ev('12:30','13:00','Lunch','food'),
        ev('13:00','13:30','Get ready for basketball','free', '', true),
        ev('13:30','13:45','🚗 Leave home for basketball','leave','15-minute drive',true),
        ev('13:45','14:30','Optional skills / shooting','ball','Skip if knees are unhappy',true),
        ev('14:30','14:45','Drive home','free','',true),
        ev('14:45','15:00','Shower + snack','food','',true),
        ev('15:00','15:40','Get ready for work','free'),
        ev('15:40','16:00','🚗 Leave home for work','leave','20-minute drive'),
        ev('16:00','17:00','Tutoring','work'),
        ev('17:00','17:20','Drive home','free'),
        ev('17:20','18:00','Dinner','food'),
        ev('18:00','20:00','MIS710 deep work','uni'),
        ev('20:00','23:30','Free time','free'),
        ev('23:45','23:55','Tomorrow setup','sleep'),
        ev('00:00','00:05','Block scrolling apps','sleep'),
        ev('01:00','01:30','Bed wind-down','sleep'),
        ev('01:30','01:31','Sleep target','sleep')
      ],
      wed:[
        ev('09:30','09:45','Wake','sleep'),
        ev('10:00','10:25','Breakfast','food'),
        ev('10:30','12:30','MIS771 deep work','uni'),
        ev('12:30','13:00','Lunch','food'),
        ev('13:00','13:30','Get ready for gym','free'),
        ev('13:30','13:40','🚗 Leave home for gym','leave','10-minute drive'),
        ev('13:40','14:55','Gym B — main strength / rehab','gym'),
        ev('14:55','15:05','Drive home','free'),
        ev('15:05','15:30','Shower + substantial snack','food'),
        ev('15:30','16:00','Easy uni / admin','uni'),
        ev('16:00','16:40','Get ready for work','free'),
        ev('16:40','17:00','🚗 Leave home for work','leave','20-minute drive'),
        ev('17:00','18:00','Tutoring','work'),
        ev('18:00','18:20','Drive home','free'),
        ev('18:20','19:00','Dinner','food'),
        ev('19:00','20:30','MIS710 / uni','uni'),
        ev('20:30','23:30','Free time','free'),
        ev('01:00','01:30','Bed wind-down','sleep'),
        ev('01:30','01:31','Sleep target','sleep')
      ],
      thu:[
        ev('09:30','09:45','Wake','sleep'),
        ev('10:00','10:25','Breakfast','food'),
        ev('10:30','11:15','Uni','uni'),
        ev('11:15','11:45','Get ready for basketball','free'),
        ev('11:45','12:00','🚗 Leave home for basketball','leave','15-minute drive'),
        ev('12:00','13:30','Basketball with friend','ball'),
        ev('13:30','13:45','Drive home','free'),
        ev('13:45','14:15','Shower / change','free'),
        ev('14:15','14:40','Lunch','food'),
        ev('14:40','15:00','Pack work things / admin','free'),
        ev('15:00','15:40','Get ready for work','free'),
        ev('15:40','16:00','🚗 Leave home for work','leave','20-minute drive'),
        ev('16:00','17:00','Tutoring','work'),
        ev('17:00','17:20','Drive home','free'),
        ev('17:20','18:00','Dinner','food'),
        ev('18:00','20:00','Uni','uni'),
        ev('20:00','23:30','Free / recovery','free'),
        ev('01:00','01:30','Bed wind-down','sleep'),
        ev('01:30','01:31','Sleep target','sleep')
      ],
      fri:[
        ev('09:30','09:45','Wake','sleep'),
        ev('10:00','10:25','Breakfast','food'),
        ev('10:30','12:30','Uni deep work #1','uni'),
        ev('12:30','13:15','Lunch + real break','food'),
        ev('13:15','15:15','Uni deep work #2','uni'),
        ev('15:15','15:45','Break + snack / walk','food'),
        ev('15:45','16:15','Rehab','rehab','Knee + ankle + hip work from proper rehab plan'),
        ev('16:15','16:45','Shower','free'),
        ev('16:45','17:45','Optional uni / admin','uni','Use only if useful',true),
        ev('17:45','23:30','Free night','free'),
        ev('01:00','01:30','Bed wind-down','sleep'),
        ev('01:30','01:31','Sleep target','sleep')
      ],
      sat:[
        ev('09:30','09:45','Wake','sleep'),
        ev('10:00','10:20','Breakfast','food'),
        ev('10:30','12:30','Uni','uni'),
        ev('12:30','13:30','Lunch / break','food'),
        ev('13:30','15:30','Uni','uni'),
        ev('15:30','15:50','Light mobility','rehab','Ankle / hip / easy recovery'),
        ev('15:50','23:30','Free time','free'),
        ev('01:00','01:30','Bed wind-down','sleep'),
        ev('01:30','01:31','Sleep target','sleep')
      ],
      sun:[]
    },
    uni:{
      MIS771:{
        name:'MIS771', due:'2026-09-11', progress:5,
        tasks:[
          {id:uid(),text:'Create assignment document / notebook and marking-criteria headings',done:false},
          {id:uid(),text:'Break assignment into concrete subtasks',done:false},
          {id:uid(),text:'Start first substantive section',done:false}
        ]
      },
      MIS710:{
        name:'MIS710', due:'2026-09-30', progress:0,
        tasks:[
          {id:uid(),text:'Read final assignment rubric carefully',done:false},
          {id:uid(),text:'Create notebook / document structure',done:false},
          {id:uid(),text:'Identify first analysis task',done:false}
        ]
      }
    },
    rehab:[
      {id:uid(),text:'Friday rehab session',done:false},
      {id:uid(),text:'Saturday light ankle / hip mobility',done:false},
      {id:uid(),text:'Track knee response after Thursday basketball',done:false},
      {id:uid(),text:'Track knee response after Sunday game',done:false}
    ],
    gym:{
      A:{
        focus:'Lighter lower-body load after Sunday basketball; upper body + core emphasis.',
        exercises:[
          ex('Upper-body machine','3','8–12','Upper body','Choose neutral-grip option when possible',true,false,false),
          ex('Supported row','3','8–12','Upper body','Neutral grip',true,true,false),
          ex('Core exercise','3','','Core','Forearm-supported or wrist-neutral',true,false,false)
        ]
      },
      B:{
        focus:'Main strength + rehab session; structured lower-body / tendon work plus upper-body machines.',
        exercises:[
          ex('Knee rehab / tendon strength','','','Rehab','Use physio-approved progression',false,false,true),
          ex('Hamstring / glute exercise','3','8–12','Lower body','',false,false,true),
          ex('Calf / soleus exercise','3','8–15','Lower body','',false,false,true),
          ex('Upper push or pull machine','3','8–12','Upper body','Neutral grip if possible',true,true,false)
        ]
      }
    },
    sleepChecks:{
      night:NIGHT_ITEMS.map(text => ({id:uid(),text,done:false})),
      morning:MORNING_ITEMS.map(text => ({id:uid(),text,done:false}))
    }
  };
}

function mins(t){
  if(!t || !/^\d\d:\d\d$/.test(t)) return null;
  const [h,m] = t.split(':').map(Number);
  return h * 60 + m;
}
function logicalMinutes(t){
  const m = mins(t);
  if(m == null) return 9999;
  return m < DAY_START_MINUTES ? m + 1440 : m;
}
function fmt(t){
  if(!t) return '';
  let [h,m] = t.split(':').map(Number);
  const ap = h >= 12 ? 'pm' : 'am';
  h = h % 12 || 12;
  return `${h}:${String(m).padStart(2,'0')}${ap}`;
}
function fmtRange(a,b){ return b && b !== a ? `${fmt(a)}–${fmt(b)}` : fmt(a); }
function nowMinutes(){ const d = new Date(); return d.getHours() * 60 + d.getMinutes(); }
function nowLogicalMinutes(){
  const current = nowMinutes();
  return current < DAY_START_MINUTES ? current + 1440 : current;
}
function uidDateKey(d=new Date()){
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}
function dayKeyFromDate(d=new Date()){ return DAY_KEYS[d.getDay()]; }
function escapeHtml(str){
  return String(str ?? '').replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
}
function daysUntil(dateStr){
  const target = new Date(`${dateStr}T12:00:00`);
  const now = new Date();
  now.setHours(12,0,0,0);
  return Math.ceil((target - now) / 86400000);
}
function doneKey(day,id){ return `done:${uidDateKey()}:${day}:${id}`; }

function load(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : freshData();
    return migrate(parsed);
  }catch{
    return freshData();
  }
}
function save(){ localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); }
function persist(msg){ save(); if(msg) showToast(msg); }
function migrate(d){
  const base = freshData();
  d.settings = {...base.settings, ...(d.settings || {})};
  d.focus = {...base.focus, ...(d.focus || {})};
  d.days = {...base.days, ...(d.days || {})};
  d.uni = d.uni || base.uni;
  d.rehab = Array.isArray(d.rehab) ? d.rehab : base.rehab;
  d.gym = d.gym || base.gym;
  d.sundayGame = d.sundayGame || base.sundayGame;
  d.currentSleep = Number.isInteger(d.currentSleep) ? d.currentSleep : 0;
  d.lowEnergy = !!d.lowEnergy;
  d.sleepChecks = d.sleepChecks || base.sleepChecks;
  if(!d.sleepChecks.night) d.sleepChecks.night = base.sleepChecks.night;
  if(!d.sleepChecks.morning) d.sleepChecks.morning = base.sleepChecks.morning;
  if(!d.days.sun || !d.days.sun.length) buildSunday(d);
  return d;
}

function buildSunday(targetData = data){
  const start = mins(targetData.sundayGame);
  const prep = start - 80;
  const leave = start - 40;
  const arrive = start - 25;
  const end = start + 60;
  const tm = (v) => {
    v = (v + 1440) % 1440;
    return `${String(Math.floor(v/60)).padStart(2,'0')}:${String(v%60).padStart(2,'0')}`;
  };
  targetData.days.sun = [
    ev('09:30','09:45','Wake','sleep'),
    ev('10:00','10:20','Breakfast','food'),
    ev('10:30','12:00','Light uni / weekly review','uni'),
    ev('12:00','12:45','Lunch','food'),
    ev('12:45',tm(prep),'Relax + recover','free'),
    ev(tm(start-180),tm(start-150),'Pre-game meal','food','Aim roughly 2.5–3 hours before tip'),
    ev(tm(prep),tm(leave),'Get dressed + hair + pack bag','free','40 minutes'),
    ev(tm(leave),tm(arrive),'🚗 Leave home for game','leave','~15-minute drive; arrive 25 minutes before tip'),
    ev(tm(arrive),targetData.sundayGame,'Warm up / stretch / shoot','ball'),
    ev(targetData.sundayGame,tm(end),'Basketball game','ball','Two 20-minute halves; you often play 35–40+ minutes'),
    ev(tm(end),tm(end+15),'Drive home','free'),
    ev(tm(end+15),tm(end+60),'Shower + dinner + recover','food'),
    ev('01:00','01:30','Bed wind-down','sleep'),
    ev('01:30','01:31','Sleep target','sleep')
  ];
}

let data = load();
let currentView = 'today';
let currentDay = dayKeyFromDate();
let currentSession = 'A';
let deferredPrompt = null;

function getDayEvents(day){
  const list = [...(data.days[day] || [])];
  list.sort((a,b) => logicalMinutes(a.start) - logicalMinutes(b.start));
  return list;
}
function getVisibleEvents(day){
  return getDayEvents(day).filter(e => !(data.lowEnergy && e.optional));
}
function isDone(day,id){ return !!data[doneKey(day,id)]; }
function setDone(day,id,value){ data[doneKey(day,id)] = value; persist(); }
function progressText(day){
  const visible = getVisibleEvents(day);
  const done = visible.filter(e => isDone(day,e.id)).length;
  return `${done} / ${visible.length}`;
}
function currentSelectedDayIsToday(){ return currentDay === dayKeyFromDate(); }

function getNextEvent(day){
  const events = getVisibleEvents(day);
  if(!events.length) return null;
  if(currentSelectedDayIsToday()){
    const current = nowLogicalMinutes();
    return events.find(e => logicalMinutes(e.end || e.start) >= current) || null;
  }
  return events[0];
}
function getNextLeaveEvent(day){
  const leaveItems = getVisibleEvents(day).filter(e => e.type === 'leave');
  if(!leaveItems.length) return null;
  if(currentSelectedDayIsToday()){
    const current = nowLogicalMinutes();
    return leaveItems.find(e => logicalMinutes(e.end || e.start) >= current) || null;
  }
  return leaveItems[0];
}
function untilText(t){
  if(!currentSelectedDayIsToday()) return `Starts at ${fmt(t)}`;
  const diff = logicalMinutes(t) - nowLogicalMinutes();
  if(diff <= 0) return 'Coming up or in progress';
  const h = Math.floor(diff / 60);
  const m = diff % 60;
  const parts = [];
  if(h) parts.push(`${h}h`);
  if(m) parts.push(`${m}m`);
  return `Starts in ${parts.join(' ')}`;
}

function eventStatusText(event){
  if(!currentSelectedDayIsToday()) return 'Planned block';
  const now = nowLogicalMinutes();
  const start = logicalMinutes(event.start);
  const end = logicalMinutes(event.end || event.start);
  if(now < start) return untilText(event.start);
  if(now > end) return 'Earlier today';
  return 'In progress now';
}
function shorten(text, max=32){
  return text.length > max ? `${text.slice(0, max-1)}…` : text;
}

function switchView(view){
  currentView = view;
  document.querySelectorAll('.view').forEach(el => el.classList.toggle('active', el.id === `${view}View`));
  document.querySelectorAll('[data-view]').forEach(btn => btn.classList.toggle('active', btn.dataset.view === view));
  renderCurrentView();
  window.scrollTo({top:0, behavior:'smooth'});
}
function renderCurrentView(){
  if(currentView === 'today') renderToday();
  if(currentView === 'week') renderWeek();
  if(currentView === 'uni') renderUni();
  if(currentView === 'fitness') renderFitness();
  if(currentView === 'sleep') renderSleep();
  if(currentView === 'settings') renderSettings();
}

document.querySelectorAll('[data-view]').forEach(btn => btn.addEventListener('click', () => switchView(btn.dataset.view)));

function renderDayTabs(){
  const wrap = document.getElementById('todayTabs');
  wrap.innerHTML = '';
  DAY_KEYS.forEach(day => {
    const btn = document.createElement('button');
    btn.className = `dayChip ${currentDay === day ? 'active' : ''}`;
    btn.innerHTML = `<span>${DAY_LABELS[day]}</span><small>${progressText(day)}</small>`;
    btn.addEventListener('click', () => {
      currentDay = day;
      renderToday();
    });
    wrap.appendChild(btn);
  });
}

function renderToday(){
  renderDayTabs();
  const todayDateText = currentSelectedDayIsToday()
    ? new Date().toLocaleDateString(undefined, {weekday:'long', day:'numeric', month:'long'})
    : DAY_LABELS[currentDay];
  document.getElementById('todayDate').textContent = todayDateText;
  document.getElementById('todayHeading').textContent = DAY_LABELS[currentDay];
  document.getElementById('todayFocus').textContent = data.focus[currentDay] || 'No focus set yet';
  document.getElementById('todayFocusMini').textContent = shorten(data.focus[currentDay] || 'No focus');
  document.getElementById('todayProgress').textContent = progressText(currentDay);
  document.getElementById('lowEnergyToggle').checked = !!data.lowEnergy;

  const next = getNextEvent(currentDay);
  document.getElementById('nextTitle').textContent = next ? next.title : 'Nothing scheduled';
  document.getElementById('nextCountdown').textContent = next ? `${untilText(next.start)} · ${fmtRange(next.start,next.end)}` : 'Enjoy the breathing room';

  const leave = getNextLeaveEvent(currentDay);
  document.getElementById('nextLeave').textContent = leave ? `${fmt(leave.start)} — ${leave.title}` : 'No leave-home block';
  document.getElementById('nextLeaveCountdown').textContent = leave ? untilText(leave.start) : 'You can stay put for now';

  const wrap = document.getElementById('todayTimeline');
  wrap.innerHTML = '';
  const events = getVisibleEvents(currentDay);
  if(!events.length){
    wrap.innerHTML = '<div class="card"><p class="muted">No blocks scheduled for this day yet.</p></div>';
    return;
  }

  events.forEach((event, index) => {
    const done = isDone(currentDay, event.id);
    const row = document.createElement('div');
    row.className = `eventCard ${done ? 'done' : ''} ${event.optional ? 'optional' : ''}`;
    row.innerHTML = `
      <div class="eventTimePill">
        <strong>${escapeHtml(fmtRange(event.start,event.end))}</strong>
        <span>${eventStatusText(event)}</span>
      </div>
      <div class="eventBody">
        <div class="eventTopLine">
          <div class="eventTitle">${escapeHtml(event.title)}</div>
          <span class="typeBadge type-${escapeHtml(event.type || 'free')}">${escapeHtml(TYPE_LABELS[event.type] || 'Block')}</span>
          ${event.optional ? '<span class="flagBadge">Optional</span>' : ''}
        </div>
        ${event.note ? `<div class="eventNote">${escapeHtml(event.note)}</div>` : ''}
      </div>
      <div class="eventActions">
        <button class="iconBtn" title="Mark done">${done ? '↩' : '✓'}</button>
        <button class="iconBtn" title="Edit block">✏️</button>
        <button class="iconBtn" title="Move up">↑</button>
        <button class="iconBtn" title="Move down">↓</button>
      </div>
    `;
    const [doneBtn, editBtn, upBtn, downBtn] = row.querySelectorAll('.iconBtn');
    doneBtn.addEventListener('click', () => { setDone(currentDay, event.id, !done); renderToday(); });
    editBtn.addEventListener('click', () => openEventDialog(currentDay, event.id));
    upBtn.addEventListener('click', () => moveEvent(currentDay, index, -1));
    downBtn.addEventListener('click', () => moveEvent(currentDay, index, 1));
    wrap.appendChild(row);
  });
}

function moveEvent(day, index, delta){
  const sorted = getDayEvents(day);
  const target = index + delta;
  if(target < 0 || target >= sorted.length) return;
  [sorted[index], sorted[target]] = [sorted[target], sorted[index]];
  data.days[day] = sorted;
  persist('Block moved');
  renderToday();
  if(currentView === 'week') renderWeek();
}

function renderWeek(){
  const wrap = document.getElementById('weekGrid');
  wrap.innerHTML = '';
  DAY_KEYS.forEach(day => {
    const events = getVisibleEvents(day).filter(e => !['sleep','free'].includes(e.type)).slice(0,5);
    const all = getVisibleEvents(day);
    const card = document.createElement('div');
    card.className = `weekCard ${day === dayKeyFromDate() ? 'current' : ''}`;
    card.innerHTML = `
      <div class="weekCardHead">
        <div>
          <h3>${DAY_LABELS[day]}</h3>
          <div class="weekFocus">${escapeHtml(data.focus[day] || 'No focus set')}</div>
        </div>
        <div class="weekCount">${all.length} blocks</div>
      </div>
      <div class="weekList">
        ${events.map(ev => `
          <div class="weekItem">
            <span class="time">${escapeHtml(fmtRange(ev.start, ev.end))}</span>
            <span class="title">${escapeHtml(ev.title)}</span>
          </div>
        `).join('') || '<div class="weekItem"><span class="title">No key blocks yet</span></div>'}
      </div>
    `;
    card.addEventListener('click', () => {
      currentDay = day;
      switchView('today');
    });
    wrap.appendChild(card);
  });
}

function renderUni(){
  const wrap = document.getElementById('uniGrid');
  wrap.innerHTML = '';
  Object.keys(data.uni).forEach(code => {
    const subject = data.uni[code];
    const dueIn = daysUntil(subject.due);
    const doneTasks = subject.tasks.filter(t => t.done).length;
    const card = document.createElement('div');
    card.className = 'card subjectCard';
    card.innerHTML = `
      <div class="topLine">
        <div>
          <h3>${escapeHtml(subject.name)}</h3>
          <div class="subjectMeta">Due ${new Date(subject.due+'T12:00:00').toLocaleDateString(undefined,{month:'short',day:'numeric'})} · ${dueIn} days left</div>
        </div>
        <div class="progressBadge">${escapeHtml(String(subject.progress))}%</div>
      </div>
      <div class="progressBar"><span style="width:${Math.max(0,Math.min(100,subject.progress))}%"></span></div>
      <label>Progress %</label>
      <input type="number" min="0" max="100" value="${subject.progress}" data-code="${code}" class="subjectProgressInput">
      <div class="taskList">
        ${subject.tasks.map(task => `
          <div class="taskItem">
            <input type="checkbox" ${task.done ? 'checked' : ''} data-taskid="${task.id}" data-code="${code}" class="uniTaskToggle">
            <div class="taskText">${escapeHtml(task.text)}</div>
            <button class="iconBtn uniEditBtn" data-taskid="${task.id}" data-code="${code}">✏️</button>
          </div>
        `).join('')}
      </div>
      <div class="toolbar"><button class="btn ghost addUniTaskBtn" data-code="${code}">＋ Add next action</button></div>
      <div class="tinyNote">${doneTasks} of ${subject.tasks.length} task(s) done.</div>
    `;
    wrap.appendChild(card);
  });

  document.querySelectorAll('.subjectProgressInput').forEach(input => {
    input.addEventListener('change', () => {
      const code = input.dataset.code;
      data.uni[code].progress = Math.max(0, Math.min(100, Number(input.value) || 0));
      persist('Progress updated');
      renderUni();
    });
  });
  document.querySelectorAll('.uniTaskToggle').forEach(box => {
    box.addEventListener('change', () => {
      const task = data.uni[box.dataset.code].tasks.find(t => t.id === box.dataset.taskid);
      if(task){ task.done = box.checked; persist('Task updated'); renderUni(); }
    });
  });
  document.querySelectorAll('.uniEditBtn').forEach(btn => {
    btn.addEventListener('click', () => editUniTask(btn.dataset.code, btn.dataset.taskid));
  });
  document.querySelectorAll('.addUniTaskBtn').forEach(btn => {
    btn.addEventListener('click', () => addUniTask(btn.dataset.code));
  });
}

function addUniTask(code){
  const text = prompt(`Add the next action for ${code}:`);
  if(!text) return;
  data.uni[code].tasks.push({id:uid(), text:text.trim(), done:false});
  persist('Uni task added');
  renderUni();
}
function editUniTask(code, taskId){
  const task = data.uni[code].tasks.find(t => t.id === taskId);
  if(!task) return;
  const next = prompt(`Edit task for ${code}:`, task.text);
  if(next === null) return;
  if(!next.trim()){
    if(confirm('Delete this task?')){
      data.uni[code].tasks = data.uni[code].tasks.filter(t => t.id !== taskId);
      persist('Uni task deleted');
    }
  }else{
    task.text = next.trim();
    persist('Uni task updated');
  }
  renderUni();
}

function renderFitness(){
  document.getElementById('sundayGame').value = data.sundayGame;
  const start = mins(data.sundayGame);
  const prep = start - 80;
  const leave = start - 40;
  const arrive = start - 25;
  const tm = (v) => {
    v = (v + 1440) % 1440;
    return `${String(Math.floor(v/60)).padStart(2,'0')}:${String(v%60).padStart(2,'0')}`;
  };
  document.getElementById('gameCalc').innerHTML = `For a <strong>${fmt(data.sundayGame)}</strong> game:<br>Start getting ready <strong>${fmt(tm(prep))}</strong> · Leave home <strong>${fmt(tm(leave))}</strong> · Arrive about <strong>${fmt(tm(arrive))}</strong>`;

  const rehabWrap = document.getElementById('rehabChecklist');
  rehabWrap.innerHTML = '';
  data.rehab.forEach(item => {
    const row = document.createElement('div');
    row.className = 'taskItem';
    row.innerHTML = `
      <input type="checkbox" ${item.done ? 'checked' : ''}>
      <div class="taskText">${escapeHtml(item.text)}</div>
      <button class="iconBtn">✏️</button>
    `;
    const [box, edit] = row.querySelectorAll('input,button');
    box.addEventListener('change', () => { item.done = box.checked; persist('Rehab updated'); renderFitness(); });
    edit.addEventListener('click', () => {
      const next = prompt('Edit rehab item:', item.text);
      if(next === null) return;
      if(next.trim()) item.text = next.trim();
      persist('Rehab updated');
      renderFitness();
    });
    rehabWrap.appendChild(row);
  });

  document.querySelectorAll('.sessionChip').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.session === currentSession);
    btn.onclick = () => { currentSession = btn.dataset.session; renderFitness(); };
  });

  document.getElementById('gymFocus').textContent = data.gym[currentSession].focus;
  const exerciseWrap = document.getElementById('exerciseList');
  exerciseWrap.innerHTML = '';
  data.gym[currentSession].exercises.forEach((exercise, index) => {
    const row = document.createElement('div');
    row.className = 'exerciseCard';
    row.innerHTML = `
      <div class="exerciseNum">${index+1}</div>
      <div>
        <div class="exerciseName">${escapeHtml(exercise.name)}</div>
        <div class="exerciseMeta">${escapeHtml(exercise.sets || '—')} set(s) · ${escapeHtml(exercise.reps || '—')} rep(s) · ${escapeHtml(exercise.category || 'General')}</div>
        ${exercise.note ? `<div class="eventNote">${escapeHtml(exercise.note)}</div>` : ''}
        <div class="badgeRow">
          ${exercise.neutral ? '<span class="flagBadge">Neutral grip</span>' : ''}
          ${exercise.cuff ? '<span class="flagBadge">Cuff-friendly</span>' : ''}
          ${exercise.knee ? '<span class="flagBadge">Knee / rehab</span>' : ''}
        </div>
      </div>
      <div class="eventActions">
        <button class="iconBtn">✏️</button>
        <button class="iconBtn">↑</button>
        <button class="iconBtn">↓</button>
      </div>
    `;
    const [edit, up, down] = row.querySelectorAll('.iconBtn');
    edit.addEventListener('click', () => openExerciseDialog(exercise.id));
    up.addEventListener('click', () => moveExercise(index, -1));
    down.addEventListener('click', () => moveExercise(index, 1));
    exerciseWrap.appendChild(row);
  });
}
function moveExercise(index, delta){
  const list = data.gym[currentSession].exercises;
  const target = index + delta;
  if(target < 0 || target >= list.length) return;
  [list[index], list[target]] = [list[target], list[index]];
  persist('Exercise moved');
  renderFitness();
}

function renderSleep(){
  const stageWrap = document.getElementById('sleepStages');
  stageWrap.innerHTML = '';
  SLEEP_STAGES.forEach((stage, index) => {
    const btn = document.createElement('button');
    btn.className = `stageCard ${data.currentSleep === index ? 'active' : ''}`;
    btn.innerHTML = `<small>${index === 0 ? 'Start' : index === SLEEP_STAGES.length-1 ? 'Target' : `Step ${index+1}`}</small><strong>${escapeHtml(stage)}</strong>`;
    btn.addEventListener('click', () => { data.currentSleep = index; persist('Sleep stage updated'); renderSleep(); });
    stageWrap.appendChild(btn);
  });
  renderChecklist('nightChecklist', data.sleepChecks.night, 'night');
  renderChecklist('morningChecklist', data.sleepChecks.morning, 'morning');
}
function renderChecklist(id, items, type){
  const wrap = document.getElementById(id);
  wrap.innerHTML = '';
  items.forEach(item => {
    const row = document.createElement('div');
    row.className = 'taskItem';
    row.innerHTML = `<input type="checkbox" ${item.done ? 'checked' : ''}><div class="taskText">${escapeHtml(item.text)}</div><button class="iconBtn">✏️</button>`;
    const [box, editBtn] = row.querySelectorAll('input,button');
    box.addEventListener('change', () => { item.done = box.checked; persist('Checklist updated'); renderSleep(); });
    editBtn.addEventListener('click', () => {
      const next = prompt('Edit checklist item:', item.text);
      if(next === null) return;
      if(next.trim()) item.text = next.trim();
      persist('Checklist updated');
      renderSleep();
    });
    wrap.appendChild(row);
  });
}

function renderSettings(){
  document.getElementById('workDrive').value = data.settings.workDrive;
  document.getElementById('gymDrive').value = data.settings.gymDrive;
  document.getElementById('ballDrive').value = data.settings.ballDrive;
  document.getElementById('workPrep').value = data.settings.workPrep;
  document.getElementById('sportPrep').value = data.settings.sportPrep;
}

function openEventDialog(day, id){
  const dialog = document.getElementById('eventDialog');
  const item = id ? data.days[day].find(e => e.id === id) : null;
  document.getElementById('eventDialogTitle').textContent = item ? 'Edit block' : 'Add block';
  document.getElementById('eventDay').value = day;
  document.getElementById('eventId').value = item?.id || '';
  document.getElementById('eventStart').value = item?.start || '10:00';
  document.getElementById('eventEnd').value = item?.end || '';
  document.getElementById('eventTitle').value = item?.title || '';
  document.getElementById('eventType').value = item?.type || 'free';
  document.getElementById('eventOptional').checked = !!item?.optional;
  document.getElementById('eventNote').value = item?.note || '';
  document.getElementById('deleteEvent').style.display = item ? 'inline-flex' : 'none';
  dialog.showModal();
}

function openExerciseDialog(id){
  const dialog = document.getElementById('exerciseDialog');
  const item = id ? data.gym[currentSession].exercises.find(e => e.id === id) : null;
  document.getElementById('exerciseDialogTitle').textContent = item ? 'Edit exercise' : 'Add exercise';
  document.getElementById('exerciseId').value = item?.id || '';
  document.getElementById('exerciseName').value = item?.name || '';
  document.getElementById('exerciseSets').value = item?.sets || '';
  document.getElementById('exerciseReps').value = item?.reps || '';
  document.getElementById('exerciseCategory').value = item?.category || 'Upper body';
  document.getElementById('exerciseNeutral').checked = !!item?.neutral;
  document.getElementById('exerciseCuff').checked = !!item?.cuff;
  document.getElementById('exerciseKnee').checked = !!item?.knee;
  document.getElementById('exerciseNote').value = item?.note || '';
  document.getElementById('deleteExercise').style.display = item ? 'inline-flex' : 'none';
  dialog.showModal();
}

function showToast(msg){
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove('show'), 1800);
}

const eventDialog = document.getElementById('eventDialog');
const eventForm = document.getElementById('eventForm');
const exerciseDialog = document.getElementById('exerciseDialog');
const exerciseForm = document.getElementById('exerciseForm');

document.getElementById('addTodayBtn').addEventListener('click', () => openEventDialog(currentDay));
document.getElementById('editDayFocusBtn').addEventListener('click', () => {
  const next = prompt(`Main focus for ${DAY_LABELS[currentDay]}:`, data.focus[currentDay] || '');
  if(next === null) return;
  data.focus[currentDay] = next.trim();
  persist('Focus updated');
  renderToday();
  if(currentView === 'week') renderWeek();
});
document.getElementById('lowEnergyToggle').addEventListener('change', e => {
  data.lowEnergy = e.target.checked;
  persist('Low-energy mode updated');
  renderToday();
  if(currentView === 'week') renderWeek();
});

eventForm.addEventListener('submit', e => {
  e.preventDefault();
  const day = document.getElementById('eventDay').value;
  const id = document.getElementById('eventId').value;
  const payload = {
    id: id || uid(),
    start: document.getElementById('eventStart').value,
    end: document.getElementById('eventEnd').value,
    title: document.getElementById('eventTitle').value.trim(),
    type: document.getElementById('eventType').value,
    optional: document.getElementById('eventOptional').checked,
    note: document.getElementById('eventNote').value.trim()
  };
  if(!payload.title || !payload.start) return;
  if(id){
    data.days[day] = data.days[day].map(item => item.id === id ? payload : item);
  }else{
    data.days[day].push(payload);
  }
  persist('Block saved');
  eventDialog.close();
  renderCurrentView();
});
document.getElementById('cancelEvent').addEventListener('click', () => eventDialog.close());
document.getElementById('deleteEvent').addEventListener('click', () => {
  const day = document.getElementById('eventDay').value;
  const id = document.getElementById('eventId').value;
  if(!id) return;
  if(confirm('Delete this block?')){
    data.days[day] = data.days[day].filter(item => item.id !== id);
    persist('Block deleted');
    eventDialog.close();
    renderCurrentView();
  }
});

exerciseForm.addEventListener('submit', e => {
  e.preventDefault();
  const id = document.getElementById('exerciseId').value;
  const payload = {
    id: id || uid(),
    name: document.getElementById('exerciseName').value.trim(),
    sets: document.getElementById('exerciseSets').value.trim(),
    reps: document.getElementById('exerciseReps').value.trim(),
    category: document.getElementById('exerciseCategory').value,
    neutral: document.getElementById('exerciseNeutral').checked,
    cuff: document.getElementById('exerciseCuff').checked,
    knee: document.getElementById('exerciseKnee').checked,
    note: document.getElementById('exerciseNote').value.trim()
  };
  if(!payload.name) return;
  const list = data.gym[currentSession].exercises;
  if(id){
    data.gym[currentSession].exercises = list.map(item => item.id === id ? payload : item);
  }else{
    data.gym[currentSession].exercises.push(payload);
  }
  persist('Exercise saved');
  exerciseDialog.close();
  renderFitness();
});
document.getElementById('cancelExercise').addEventListener('click', () => exerciseDialog.close());
document.getElementById('deleteExercise').addEventListener('click', () => {
  const id = document.getElementById('exerciseId').value;
  if(!id) return;
  if(confirm('Delete this exercise?')){
    data.gym[currentSession].exercises = data.gym[currentSession].exercises.filter(item => item.id !== id);
    persist('Exercise deleted');
    exerciseDialog.close();
    renderFitness();
  }
});

document.getElementById('addExerciseBtn').addEventListener('click', () => openExerciseDialog());
document.getElementById('sundayGame').addEventListener('change', e => {
  data.sundayGame = e.target.value;
  buildSunday();
  persist('Sunday game time updated');
  renderFitness();
  if(currentDay === 'sun') renderToday();
  if(currentView === 'week') renderWeek();
});

document.getElementById('saveSettings').addEventListener('click', () => {
  data.settings.workDrive = Number(document.getElementById('workDrive').value) || 0;
  data.settings.gymDrive = Number(document.getElementById('gymDrive').value) || 0;
  data.settings.ballDrive = Number(document.getElementById('ballDrive').value) || 0;
  data.settings.workPrep = Number(document.getElementById('workPrep').value) || 0;
  data.settings.sportPrep = Number(document.getElementById('sportPrep').value) || 0;
  persist('Settings saved');
});

document.getElementById('resetApp').addEventListener('click', () => {
  if(confirm('Reset all app data on this device?')){
    data = freshData();
    buildSunday();
    persist('App reset');
    renderCurrentView();
  }
});

document.getElementById('exportBtn').addEventListener('click', () => {
  const blob = new Blob([JSON.stringify(data, null, 2)], {type:'application/json'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'life-dashboard-backup.json';
  a.click();
  URL.revokeObjectURL(a.href);
});
document.getElementById('importBtn').addEventListener('click', () => document.getElementById('importFile').click());
document.getElementById('importFile').addEventListener('change', async (e) => {
  const file = e.target.files?.[0];
  if(!file) return;
  try{
    const text = await file.text();
    data = migrate(JSON.parse(text));
    persist('Backup restored');
    renderCurrentView();
  }catch{
    alert('Could not restore that backup file.');
  }
  e.target.value = '';
});

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  document.getElementById('installBtn').hidden = false;
});
document.getElementById('installBtn').addEventListener('click', async () => {
  if(!deferredPrompt) return;
  deferredPrompt.prompt();
  await deferredPrompt.userChoice;
  deferredPrompt = null;
  document.getElementById('installBtn').hidden = true;
});
if('serviceWorker' in navigator){
  window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));
}

renderCurrentView();
