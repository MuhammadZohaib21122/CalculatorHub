'use strict';
const tools = [
{id:'calories',name:'Calorie Calculator',category:'Health',icon:'🔥',tone:'orange',description:'Estimate your daily calorie needs and weight goals.'},
{id:'sleep',name:'Sleep Calculator',category:'Health',icon:'☾',tone:'purple',description:'Plan restful bedtimes and wake-up times with flexible sleep schedules.'},
{id:'currency',name:'Currency Converter',category:'Finance',icon:'⇄',tone:'mint',description:'Convert currencies using the latest available rates.'},
{id:'bmi',name:'BMI Calculator',category:'Health',icon:'♡',tone:'pink',description:'Calculate your body mass index in seconds.'},
{id:'loan',name:'Loan Calculator',category:'Finance',icon:'⌂',tone:'blue',description:'Estimate monthly payments and total interest.'},
{id:'percentage',name:'Percentage Calculator',category:'Math',icon:'%',tone:'purple',description:'Find percentages, increases and decreases.'},
{id:'age',name:'Age Calculator',category:'Everyday',icon:'◷',tone:'orange',description:'Find your exact age in years, months and days.'},
{id:'unit',name:'Unit Converter',category:'Everyday',icon:'⇆',tone:'blue',description:'Convert length, weight and temperature units.'},
{id:'tip',name:'Tip Calculator',category:'Finance',icon:'♧',tone:'mint',description:'Split a bill and tip among your group.'},
{id:'discount',name:'Discount Calculator',category:'Finance',icon:'🏷',tone:'pink',description:'Calculate sale prices and total savings.'},
{id:'compound',name:'Compound Interest',category:'Finance',icon:'↗',tone:'purple',description:'Project the growth of your investment.'},
{id:'water',name:'Water Intake Calculator',category:'Health',icon:'💧',tone:'blue',description:'Get a simple daily hydration estimate.'},
{id:'macro',name:'Macro Calculator',category:'Health',icon:'◉',tone:'orange',description:'Split calorie goals into protein, carbs and fats.'},
{id:'date',name:'Date Difference',category:'Everyday',icon:'▦',tone:'purple',description:'Find the number of days between two dates.'},
{id:'fuel',name:'Fuel Cost Calculator',category:'Everyday',icon:'⛽',tone:'pink',description:'Estimate fuel required and total trip cost.'},
{id:'savings',name:'Savings Goal',category:'Finance',icon:'◎',tone:'mint',description:'Plan a monthly contribution toward your goal.'},
{id:'mortgage',name:'Mortgage Calculator',category:'Finance',icon:'⌂',tone:'blue',description:'See monthly mortgage costs, interest and payment breakdowns.'},
{id:'investment',name:'Investment Calculator',category:'Finance',icon:'↗',tone:'mint',description:'Estimate portfolio growth with monthly contributions.'},
{id:'simple-interest',name:'Simple Interest Calculator',category:'Finance',icon:'%',tone:'purple',description:'Calculate interest without compounding.'},
{id:'sales-tax',name:'Sales Tax Calculator',category:'Business',icon:'▤',tone:'orange',description:'Add or reverse sales tax for any rate.'},
{id:'salary',name:'Salary / Hourly Wage Calculator',category:'Finance',icon:'◷',tone:'blue',description:'Convert hourly, weekly, monthly and yearly pay.'},
{id:'retirement',name:'Retirement Calculator',category:'Finance',icon:'☀',tone:'mint',description:'Explore a savings projection for retirement.'},
{id:'gst',name:'GST Calculator',category:'Business',icon:'▤',tone:'purple',description:'Calculate GST-inclusive or GST-exclusive totals.'},
{id:'vat',name:'VAT Calculator',category:'Business',icon:'▤',tone:'pink',description:'Calculate net price, VAT and gross price.'},
{id:'margin',name:'Profit Margin Calculator',category:'Business',icon:'↗',tone:'mint',description:'Find profit, markup and margin on a product.'},
{id:'break-even',name:'Break-Even Calculator',category:'Business',icon:'◎',tone:'orange',description:'Find units needed to cover business costs.'},
{id:'time',name:'Time Calculator',category:'Time',icon:'◷',tone:'blue',description:'Add or subtract hours and minutes from a time.'},
{id:'timezone',name:'Time Zone Converter',category:'Time',icon:'◎',tone:'purple',description:'Convert a date and time between world time zones.'},
{id:'date-calc',name:'Date Calculator',category:'Time',icon:'▦',tone:'orange',description:'Add or subtract days, months and years from a date.'},
{id:'hours-minutes',name:'Hours & Minutes Calculator',category:'Time',icon:'◷',tone:'pink',description:'Add and subtract time durations.'},
{id:'pace',name:'Pace Calculator',category:'Health',icon:'↗',tone:'mint',description:'Find running pace, speed and split estimates.'},
{id:'speed',name:'Speed Calculator',category:'Everyday',icon:'↗',tone:'blue',description:'Calculate average speed from distance and time.'},
{id:'distance',name:'Distance Calculator',category:'Everyday',icon:'⇆',tone:'orange',description:'Estimate travel distance from speed and time.'},
{id:'average',name:'Average Calculator',category:'Math',icon:'◉',tone:'purple',description:'Find mean, median, range and sum.'},
{id:'fraction',name:'Fraction Calculator',category:'Math',icon:'½',tone:'pink',description:'Calculate and simplify fractions step by step.'},
{id:'scientific',name:'Scientific Calculator',category:'Math',icon:'π',tone:'blue',description:'Compute powers, roots, trigonometry and logarithms.'},
{id:'area',name:'Area Calculator',category:'Math',icon:'▱',tone:'mint',description:'Find area for circles, rectangles and more.'},
{id:'volume',name:'Volume Calculator',category:'Math',icon:'⬡',tone:'purple',description:'Find volume for common 3D shapes.'},
{id:'length',name:'Length Calculator',category:'Converters',icon:'⇄',tone:'blue',description:'Convert metric and imperial lengths.'},
{id:'weight',name:'Weight Calculator',category:'Converters',icon:'⇄',tone:'orange',description:'Convert kilograms, pounds, ounces and more.'},
{id:'temperature',name:'Temperature Calculator',category:'Converters',icon:'°',tone:'pink',description:'Convert Celsius, Fahrenheit and Kelvin.'},
{id:'age-difference',name:'Age Difference Calculator',category:'Time',icon:'◷',tone:'mint',description:'Compare two birth dates and find their age gap.'},
{id:'due-date',name:'Pregnancy Due Date Calculator',category:'Health',icon:'♡',tone:'pink',description:'Estimate a due date from the last menstrual period.'},
{id:'bmr',name:'BMR Calculator',category:'Health',icon:'🔥',tone:'orange',description:'Estimate calories used at rest each day.'},
{id:'body-fat',name:'Body Fat Calculator',category:'Health',icon:'◎',tone:'purple',description:'Estimate body fat using circumference measurements.'},
{id:'ideal-weight',name:'Ideal Weight Calculator',category:'Health',icon:'♡',tone:'mint',description:'Explore a height-based reference weight estimate.'},
];
// Hand-drawn, lightweight outline icons; no external icon library required.
const iconPaths={
 sleep:'<path d="M20.4 15.1A8.6 8.6 0 0 1 8.9 3.6 8.7 8.7 0 1 0 20.4 15.1Z"/><path d="M17.5 3v4m-2-2h4M20 8v3m-1.5-1.5h3"/>',
 calories:'<path d="M12 22c4-2.2 6.5-5.1 6.5-9 0-3.6-2.4-6.2-3.4-7.1-.4 2-1.7 3.2-2.4 3.5C11.9 5.8 10 3.1 8 2 8.2 5.5 6 7.5 5.2 10A9 9 0 0 0 12 22Z"/><path d="M12 21c2.1-1.3 3.1-3.2 3.1-5 0-1.2-.8-2.7-1.6-3.4-.3 1.5-1.1 2.1-1.5 2.4-.4-1.5-1.1-2.4-2.2-3.2 0 2.5-1.4 3.8-1.4 5.1 0 1.8 1.1 3.1 3.6 4.1Z"/>',
 currency:'<path d="m4 8 4-4 4 4M8 4v12M20 16l-4 4-4-4m4 4V8"/><path d="M4 20h6M14 4h6"/>',
 bmi:'<path d="M20.6 5.5a4.6 4.6 0 0 0-6.5 0L12 7.6 9.9 5.5a4.6 4.6 0 0 0-6.5 6.5L12 20.6l8.6-8.6a4.6 4.6 0 0 0 0-6.5Z"/><path d="M3.7 12.5H8l1.7-2.8 3.2 5.6 1.8-2.8h5.6"/>',
 loan:'<rect x="3" y="9" width="18" height="12" rx="2"/><path d="M3 13h18M7 9V6a5 5 0 0 1 10 0v3M7 17h4"/>',
 percentage:'<path d="m5 19 14-14"/><circle cx="7.5" cy="7.5" r="2.5"/><circle cx="16.5" cy="16.5" r="2.5"/>',
 age:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2M12 3V2"/>',
 unit:'<path d="M4 7h15m-4-4 4 4-4 4M20 17H5m4-4-4 4 4 4"/><path d="M8 10v4m8-4v4"/>',
 tip:'<path d="M3 8h18v11H3zM3 8l2-4h14l2 4M7 12h3M7 15h6M17 13v4m-2-2h4"/>',
 discount:'<path d="m3 12 9-9h8l1 9-9 9-9-9Z"/><circle cx="16.5" cy="7.5" r="1.2"/><path d="m8 16 8-8"/>',
 compound:'<path d="M4 20V4M4 20h16M7 15l4-4 3 2 6-7"/><path d="M16 6h4v4"/>',
 water:'<path d="M12 2c3.4 4.4 7 8 7 12a7 7 0 0 1-14 0c0-4 2.6-7.6 7-12Z"/><path d="M8 14a4 4 0 0 0 4 4"/>',
 macro:'<circle cx="12" cy="12" r="9"/><path d="M12 12V3m0 9 7.8 4.5M12 12l-5 7.5"/>',
 date:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4m10-4v4M3 10h18M8 14h3m-3 3h6"/>',
 fuel:'<path d="M4 21V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v16M2 21h15M4 12h11M7 6h5"/><path d="m15 9 3 3v6a2 2 0 0 0 4 0v-7l-3-3"/>',
 savings:'<rect x="3" y="7" width="18" height="14" rx="3"/><path d="M3 11h18M16 16h2M7 7V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2"/>'
};
const iconSVG=id=>iconPaths[id]?`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${iconPaths[id]}</svg>`:`<span class="glyph-icon" aria-hidden="true">${tools.find(tool=>tool.id===id)?.icon||'✦'}</span>`;
const $ = (s, root=document) => root.querySelector(s);
const grid=$('#calculatorGrid'), dialog=$('#toolDialog'), body=$('#toolBody');
let category='All', search='', activeTool=null, requestSequence=0;
const fmt=(n, digits=2)=>Number(n).toLocaleString('en-US',{maximumFractionDigits:digits,minimumFractionDigits:digits});
const clean=n=>Number(n).toLocaleString('en-US',{maximumFractionDigits:2});
function toast(message){const el=$('#toast');el.textContent=message;el.classList.add('show');clearTimeout(toast.timer);toast.timer=setTimeout(()=>el.classList.remove('show'),2800)}
function renderTabs(){const categories=['All','Health','Finance','Business','Math','Time','Converters','Everyday'];$('#categoryTabs').replaceChildren(...categories.map(c=>{const b=document.createElement('button');b.className='tab'+(category===c?' active':'');b.textContent=c;b.type='button';b.setAttribute('aria-pressed',String(category===c));b.onclick=()=>{category=c;renderTabs();renderCards()};return b}))}
function renderCards(){const found=tools.filter(t=>(category==='All'||category===t.category)&&(t.name+' '+t.description+' '+t.category).toLowerCase().includes(search));grid.replaceChildren(...found.map(t=>{const b=document.createElement('button');b.className='tool-card';b.type='button';b.innerHTML=`<span class="tool-icon tone-${t.tone}" aria-hidden="true">${iconSVG(t.id)}</span><h3>${t.name}</h3><p>${t.description}</p><span class="card-bottom"><span>${t.category.toUpperCase()}</span><span class="card-arrow" aria-hidden="true">↗</span></span>`;b.onclick=()=>openTool(t,b);return b}));$('#visibleCount').textContent=found.length;$('#emptyState').hidden=found.length!==0}
$('#searchInput').addEventListener('input',e=>{search=e.target.value.trim().toLowerCase();renderCards()});$('#resetFilters').onclick=()=>{search='';category='All';$('#searchInput').value='';renderTabs();renderCards()};document.addEventListener('keydown',e=>{if(e.key==='/'&&!dialog.open&&!['INPUT','TEXTAREA'].includes(document.activeElement.tagName)){e.preventDefault();$('#searchInput').focus()}});
const f=(id,label,type='number',value='',attrs='')=>`<div class="field"><label for="${id}">${label}</label><input id="${id}" type="${type}" value="${value}" ${attrs}></div>`;
const select=(id,label,choices,value)=>`<div class="field"><label for="${id}">${label}</label><select id="${id}">${choices.map(([v,l])=>`<option value="${v}" ${v===value?'selected':''}>${l}</option>`).join('')}</select></div>`;
const layout=(fields,button='Calculate',extra='')=>`<form id="calcForm" novalidate><div class="fields">${fields}</div><div class="calc-actions"><button class="calculate-btn" type="submit">${button}</button>${extra}</div></form><div id="output" aria-live="polite"></div>`;
const val=id=>Number($('#'+id).value), str=id=>$('#'+id).value;
const result=(label,value,detail='',note='')=>{$('#output').innerHTML=`<div class="result"><div class="result-label">${label}</div><div class="result-value">${value}</div><div class="result-detail">${detail}</div></div>${note?`<p class="result-note">${note}</p>`:''}`};
const error=msg=>{$('#output').innerHTML=`<p class="error" role="alert">${msg}</p>`};
const valid=(...ids)=>ids.every(id=>str(id).trim()!==''&&Number.isFinite(val(id)));
const nonnegative=(...ids)=>valid(...ids)&&ids.every(id=>val(id)>=0);
const positive=(...ids)=>valid(...ids)&&ids.every(id=>val(id)>0);
function attach(fn){$('#calcForm').addEventListener('submit',e=>{e.preventDefault();try{fn()}catch(err){console.error(err);error('Unable to calculate. Please check your entries.')}})}
function localISO(date){return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`}
function parseDate(s){if(!/^\d{4}-\d{2}-\d{2}$/.test(s))return null;const [y,m,d]=s.split('-').map(Number),date=new Date(y,m-1,d);return date.getFullYear()===y&&date.getMonth()===m-1&&date.getDate()===d?date:null}
function showTool(id){if(extraCalculatorIds.has(id))return showExtraTool(id);switch(id){
case 'calories':{
body.innerHTML=layout(
 select('weightUnit','Weight unit',[['kg','Kilograms (kg)'],['lb','Pounds (lb)']],'kg')+
 f('weight','Weight (kg)','number','70','min="0.01" step="any"')+
 select('heightUnit','Height unit',[['cm','Centimeters (cm)'],['ft','Feet and inches (ft / in)']],'cm')+
 `<div id="metricHeight">${f('height','Height (cm)','number','170','min="0.01" step="any"')}</div>`+
 `<div id="imperialHeight" hidden>${f('feet','Height (feet)','number','5','min="0" step="1"')}${f('inches','Height (inches)','number','7','min="0" max="11.99" step="any"')}</div>`+
 f('years','Age (years)','number','30','min="1" max="120"')+
 select('sex','Sex used in BMR equation',[['male','Male'],['female','Female']],'male')+
 select('activity','Activity level',[['1.2','Sedentary (little exercise)'],['1.375','Light (1–3 days/week)'],['1.55','Moderate (3–5 days/week)'],['1.725','Very active (6–7 days/week)'],['1.9','Extremely active']],'1.375')+
 select('goal','Goal',[['maintain','Maintain weight'],['lose','Lose weight (−500 kcal/day)'],['gain','Gain weight (+300 kcal/day)']],'maintain'),'Estimate calories');
 $('#weightUnit').onchange=()=>{const pounds=str('weightUnit')==='lb';const input=$('#weight');const current=Number(input.value);if(input.value.trim()!==''&&Number.isFinite(current))input.value=String(Number((pounds?current*2.2046226218:current/2.2046226218).toFixed(2)));document.querySelector('label[for="weight"]').textContent=pounds?'Weight (pounds)':'Weight (kg)'};
 $('#heightUnit').onchange=()=>{const imperial=str('heightUnit')==='ft';if(imperial){const cm=val('height');if(positive('height')){const totalInches=cm/2.54;const feet=Math.floor(totalInches/12);$('#feet').value=feet;$('#inches').value=Number((totalInches-feet*12).toFixed(2))}$('#metricHeight').hidden=true;$('#imperialHeight').hidden=false}else{if(nonnegative('feet','inches'))$('#height').value=Number(((val('feet')*12+val('inches'))*2.54).toFixed(2));$('#imperialHeight').hidden=true;$('#metricHeight').hidden=false}};
 attach(()=>{const weight=str('weightUnit')==='lb'?val('weight')*0.45359237:val('weight');const height=str('heightUnit')==='ft'?(val('feet')*12+val('inches'))*2.54:val('height');if(!positive('weight','years')||!Number.isFinite(height)||height<=0||val('years')>120||(str('heightUnit')==='ft'&&(!nonnegative('feet','inches')||!Number.isInteger(val('feet'))||val('inches')>=12)))return error('Enter a valid positive weight, height and age (1–120). Inches must be less than 12.');const bmr=10*weight+6.25*height-5*val('years')+(str('sex')==='male'?5:-161),maintenance=bmr*val('activity'),adjust=str('goal')==='lose'?-500:str('goal')==='gain'?300:0;result('Estimated daily target',`${clean(Math.max(0,Math.round(maintenance+adjust)))} kcal`,`Maintenance: ${clean(Math.round(maintenance))} kcal/day · Resting metabolism (BMR): ${clean(Math.round(bmr))} kcal/day`,'This is an estimate based on the Mifflin–St Jeor equation. The calculated target is not a personalized medical recommendation; very low targets should be reviewed with a qualified professional.')});break}
case 'sleep':{
 const initial=new Date();initial.setHours(7,0,0,0);
 const pad=n=>String(n).padStart(2,'0');
 const clockValue=d=>`${pad(d.getHours())}:${pad(d.getMinutes())}`;
 const asMinutes=t=>{if(!/^\d{2}:\d{2}$/.test(t))return NaN;const [h,m]=t.split(':').map(Number);return h<24&&m<60?h*60+m:NaN};
 const formatClock=(total,hour24)=>{const dayMinutes=((Math.round(total)%1440)+1440)%1440,h=Math.floor(dayMinutes/60),m=dayMinutes%60;if(hour24)return `${pad(h)}:${pad(m)}`;return `${h%12||12}:${pad(m)} ${h>=12?'PM':'AM'}`};
 const dayLabel=(minutes)=>minutes<0?'Previous day':minutes>=1440?'Next day':'Same day';
 const initialTime=clockValue(initial);
 body.innerHTML=`<div class="sleep-heading"><span class="sleep-moon" aria-hidden="true">☾</span><div><strong>Find your sleep rhythm</strong><p>Plan your night, one gentle step at a time.</p></div></div>`+
 layout(select('sleepMode','I want to…', [['wake','Wake up at a certain time'],['bed','Go to bed at a certain time'],['now','Go to sleep right now']],'wake')+
 `<div id="sleepTimeField">${f('sleepTime','Wake-up time','time',initialTime,'required')}</div>`+
 f('sleepLatency','Time to fall asleep (minutes)','number','15','min="0" max="120" step="1"')+
 select('sleepClock','Clock format',[['12','12-hour (AM/PM)'],['24','24-hour']],'12'),'Show my sleep times');
 const mode=$('#sleepMode'), timeLabel=$('label[for="sleepTime"]'), timeField=$('#sleepTimeField');
 const refresh=()=>{timeField.hidden=mode.value==='now';timeLabel.textContent=mode.value==='bed'?'Bedtime':'Wake-up time';};mode.addEventListener('change',refresh);refresh();
 attach(()=>{
 const latency=val('sleepLatency');if(!nonnegative('sleepLatency')||!Number.isInteger(latency)||latency>120)return error('Enter a whole number of minutes from 0 to 120.');
 const sleepMode=mode.value,now=new Date(),current=now.getHours()*60+now.getMinutes(),input=asMinutes(str('sleepTime'));
 if(sleepMode!=='now'&&!Number.isFinite(input))return error('Please choose a valid time.');
 const base=sleepMode==='now'?current:input,clock24=str('sleepClock')==='24';
 // In "now" mode, preserve the current calendar date and include minute precision.
 const cycles=[6,5,4,3],isWake=sleepMode==='wake';
 const rows=cycles.map(c=>{const duration=c*90,minutes=isWake?base-latency-duration:base+latency+duration;return {cycles:c,duration,minutes,good:c>=5}});
 const title=isWake?'Suggested bedtimes':'Suggested wake-up times';
 const anchor=sleepMode==='now'?`Right now · ${formatClock(base,clock24)}`:`${isWake?'Wake up at':'Go to bed at'} ${formatClock(base,clock24)}`;
 const cards=rows.map(item=>`<article class="sleep-option ${item.good?'sleep-option-highlight':''}"><div class="sleep-option-top"><span>${item.cycles} cycles · ${item.duration/60} hours asleep</span>${item.good?'<span class="sleep-badge">Fuller night</span>':''}</div><strong>${formatClock(item.minutes,clock24)}</strong><span class="sleep-option-day">${dayLabel(item.minutes)}</span></article>`).join('');
 $('#output').innerHTML=`<div class="sleep-results"><div class="sleep-results-heading"><span>YOUR SLEEP PLAN</span><h3>${title}</h3><p>${anchor} · ${latency} min to fall asleep</p></div><div class="sleep-options">${cards}</div><p class="sleep-footnote">These are approximate times based on 90-minute cycles, not exact predictions of sleep stages. Most adults need about 7–9 hours of sleep. A consistent schedule and enough total sleep matter more than timing a precise cycle boundary.</p></div>`;
 });break}
case 'currency':{
 const currencies=['USD','EUR','GBP','PKR','INR','AED','SAR','CAD','AUD','JPY','CNY','CHF','SGD','TRY','BDT','NZD','HKD','ZAR','SEK','NOK','DKK','KRW','THB','MYR','IDR','EGP','BRL','MXN'];const c=currencies.map(x=>[x,x]);
 body.innerHTML=layout(f('amount','Amount','number','100','step="any" min="0"')+select('from','From currency',c,'USD')+select('to','To currency',c,'PKR'),'Convert',`<button type="button" class="swap-btn" id="swapCurrency">⇄ Swap</button>`);
 $('#swapCurrency').onclick=()=>{const a=str('from');$('#from').value=str('to');$('#to').value=a;$('#calcForm').requestSubmit()};
 attach(async()=>{if(!nonnegative('amount'))return error('Enter a valid amount of zero or more.');const seq=++requestSequence,from=str('from'),to=str('to'),amount=val('amount');if(from===to)return result('Converted amount',`${fmt(amount)} ${to}`,'Identical currencies · Rate: 1');$('#output').innerHTML='<p class="result-note" role="status">Fetching the latest available exchange rate…</p>';
 const getJSON=async url=>{const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),10000);try{const response=await fetch(url,{signal:controller.signal});if(!response.ok)throw new Error(`HTTP ${response.status}`);return await response.json()}finally{clearTimeout(timer)}};
 let rate,date,provider;
 try{
   try{const data=await getJSON(`https://api.frankfurter.dev/v2/rate/${encodeURIComponent(from.toLowerCase())}/${encodeURIComponent(to.toLowerCase())}`);if(!Number.isFinite(data.rate)||data.rate<=0)throw new Error('This pair is not available from the primary provider');rate=data.rate;date=data.date;provider='Frankfurter'}
   catch(primaryError){const data=await getJSON(`https://open.er-api.com/v6/latest/${encodeURIComponent(from)}`);const fallbackRate=data.rates?.[to];if(data.result!=='success'||!Number.isFinite(fallbackRate)||fallbackRate<=0)throw new Error('This pair is not available from either rate provider');rate=fallbackRate;date=data.time_last_update_utc?.slice(0,16)||'Not provided';provider='ExchangeRate-API'}
   if(seq!==requestSequence||activeTool!=='currency')return;
   result('Converted amount',`${fmt(amount*rate)} ${to}`,`1 ${from} = ${fmt(rate,6)} ${to} · Rate date: ${date||'Not provided'} · Source: ${provider}`,'Reference exchange rates only, not guaranteed live transaction rates. Banks and payment providers may apply different rates and fees.');
 }catch(err){if(seq!==requestSequence||activeTool!=='currency')return;console.error('Both currency providers failed:',err);error('Could not retrieve an exchange rate from either provider. Please try again shortly. If you opened the website as a local file, try serving it over HTTPS or a local web server.')} });break}
case 'bmi':body.innerHTML=layout(f('weight','Weight (kg)','number','70','min="1" step="any"')+f('height','Height (cm)','number','170','min="1" step="any"'),'Calculate BMI');attach(()=>{if(!positive('weight','height'))return error('Enter a valid positive weight and height.');const bmi=val('weight')/Math.pow(val('height')/100,2),classification=bmi<18.5?'Underweight':bmi<25?'Healthy-weight range':bmi<30?'Overweight range':'Obesity range';result('Your BMI',fmt(bmi,1),`Adult BMI classification: ${classification}`,'BMI is a screening metric, not a diagnosis. Adult cutoffs are not appropriate for children or pregnancy and may not reflect body composition.')});break;
case 'loan':body.innerHTML=layout(f('principal','Loan amount','number','100000','min="1" step="any"')+f('rate','Annual interest rate (%)','number','8','min="0" step="any"')+f('term','Loan term (years)','number','5','min="0.01" step="any"'),'Calculate payment');attach(()=>{if(!positive('principal','term')||!nonnegative('rate'))return error('Enter positive loan amount and term, and a nonnegative interest rate.');const n=val('term')*12,r=val('rate')/1200,p=val('principal'),payment=r===0?p/n:p*r/(1-Math.pow(1+r,-n));if(!Number.isFinite(payment))return error('Unable to calculate using those numbers.');result('Estimated monthly payment',fmt(payment),`Total repayment: ${fmt(payment*n)} · Total interest: ${fmt(payment*n-p)}`,'Assumes fixed interest and equal monthly payments. Fees, taxes, and lender-specific terms are not included.')});break;
case 'percentage':body.innerHTML=layout(select('mode','Calculation',[['of','What is X% of Y?'],['fraction','X is what % of Y?'],['change','Percent change from X to Y']],'of')+f('x','First value (X)','number','20','step="any"')+f('y','Second value (Y)','number','200','step="any"'));attach(()=>{if(!valid('x','y'))return error('Enter both numbers.');const x=val('x'),y=val('y'),mode=str('mode');if(mode!=='of'&&y===0&&mode==='fraction'||mode==='change'&&x===0)return error('The reference value cannot be zero for this calculation.');if(mode==='of')result('Percentage result',clean(x/100*y),`${clean(x)}% of ${clean(y)}`);else if(mode==='fraction')result('Percentage result',`${fmt(x/y*100)}%`,`${clean(x)} is ${fmt(x/y*100)}% of ${clean(y)}`);else result('Percentage change',`${fmt((y-x)/Math.abs(x)*100)}%`,`From ${clean(x)} to ${clean(y)} · ${y>=x?'Increase':'Decrease'}: ${clean(Math.abs(y-x))}`)});break;
case 'age':body.innerHTML=layout(f('birthday','Date of birth','date','','max="'+localISO(new Date())+'"')+f('asof','Age on date','date',localISO(new Date())),'Calculate age');attach(()=>{let start=parseDate(str('birthday')),end=parseDate(str('asof'));if(!start||!end||start>end)return error('Choose a valid birth date that is not after the selected date.');let y=end.getFullYear()-start.getFullYear(),m=end.getMonth()-start.getMonth(),d=end.getDate()-start.getDate();if(d<0){m--;d+=new Date(end.getFullYear(),end.getMonth(),0).getDate()}if(m<0){y--;m+=12}const days=Math.round((Date.UTC(end.getFullYear(),end.getMonth(),end.getDate())-Date.UTC(start.getFullYear(),start.getMonth(),start.getDate()))/86400000);result('Your age',`${y} years`,`${m} months, ${d} days · ${clean(days)} total days`)});break;
case 'unit':{const units={Length:[['m','Meters'],['km','Kilometers'],['cm','Centimeters'],['mi','Miles'],['ft','Feet'],['in','Inches']],Weight:[['kg','Kilograms'],['g','Grams'],['lb','Pounds'],['oz','Ounces']],Temperature:[['c','Celsius'],['f','Fahrenheit'],['k','Kelvin']]},factors={m:1,km:1000,cm:.01,mi:1609.344,ft:.3048,in:.0254,kg:1,g:.001,lb:.45359237,oz:.028349523125};body.innerHTML=layout(select('kind','Measurement type',Object.keys(units).map(x=>[x,x]),'Length')+f('quantity','Value','number','1','step="any"')+select('sourceUnit','From unit',units.Length,'m')+select('targetUnit','To unit',units.Length,'ft'),'Convert');function refresh(){const opts=units[str('kind')];for(const id of ['sourceUnit','targetUnit']){$('#'+id).replaceChildren(...opts.map(([v,label])=>new Option(label,v)))}$('#targetUnit').selectedIndex=1}$('#kind').onchange=refresh;attach(()=>{if(!valid('quantity'))return error('Enter a valid value.');const n=val('quantity'),from=str('sourceUnit'),to=str('targetUnit');let converted;if(str('kind')==='Temperature'){let c=from==='c'?n:from==='f'?(n-32)*5/9:n-273.15;if(c< -273.15)return error('Temperature cannot be below absolute zero.');converted=to==='c'?c:to==='f'?c*9/5+32:c+273.15}else converted=n*factors[from]/factors[to];result('Converted value',`${fmt(converted,6)} ${to}`,`${clean(n)} ${from} = ${fmt(converted,6)} ${to}`)});break}
case 'tip':body.innerHTML=layout(f('bill','Bill amount','number','100','min="0" step="any"')+f('tip','Tip percentage (%)','number','15','min="0" step="any"')+f('people','Number of people','number','2','min="1" step="1"'),'Calculate split');attach(()=>{if(!nonnegative('bill','tip')||!Number.isInteger(val('people'))||!positive('people'))return error('Enter a valid bill, tip, and whole number of people.');const amount=val('bill'),tip=amount*val('tip')/100,total=amount+tip;result('Total per person',fmt(total/val('people')),`Bill + tip: ${fmt(total)} · Tip: ${fmt(tip)} · Tip per person: ${fmt(tip/val('people'))}`)});break;
case 'discount':body.innerHTML=layout(f('price','Original price','number','100','min="0" step="any"')+f('discount','Discount (%)','number','20','min="0" max="100" step="any"')+f('tax','Sales tax after discount (%)','number','0','min="0" step="any"'));attach(()=>{if(!nonnegative('price','discount','tax')||val('discount')>100)return error('Enter nonnegative values and a discount from 0% to 100%.');const savings=val('price')*val('discount')/100,subtotal=val('price')-savings;result('Final price',fmt(subtotal*(1+val('tax')/100)),`Savings: ${fmt(savings)} · After discount: ${fmt(subtotal)} · Tax: ${fmt(subtotal*val('tax')/100)}`)});break;
case 'compound':body.innerHTML=layout(f('principal','Starting amount','number','1000','min="0" step="any"')+f('monthly','Monthly contribution','number','100','min="0" step="any"')+f('apr','Annual interest rate (%)','number','5','min="0" step="any"')+f('years','Years','number','10','min="0" step="any"'),'Calculate growth');attach(()=>{if(!nonnegative('principal','monthly','apr','years')||val('years')>200)return error('Enter nonnegative values and a period no longer than 200 years.');const n=Math.round(val('years')*12),r=val('apr')/1200;let future=val('principal');for(let i=0;i<n;i++)future=future*(1+r)+val('monthly');const deposited=val('principal')+val('monthly')*n;result('Projected balance',fmt(future),`Total contributed: ${fmt(deposited)} · Estimated interest: ${fmt(future-deposited)}`,'Assumes monthly compounding and contributions at month-end. Interest is hypothetical, not guaranteed; fees and taxes are excluded.')});break;
case 'water':body.innerHTML=layout(f('weight','Body weight (kg)','number','70','min="1" step="any"')+select('activity','Daily activity',[['0','Low activity'],['0.5','Moderate activity'],['1','High activity']],'0'));attach(()=>{if(!positive('weight'))return error('Enter a positive weight.');const liters=val('weight')*.035+val('activity');result('Estimated daily fluid intake',`${fmt(liters,1)} liters`,`Approximately ${clean(liters*1000)} mL per day`,'A simplified planning estimate for a generally healthy adult, not a medical target. Food, weather, sweat losses, and health conditions change individual needs; avoid forcing excessive water intake.')});break;
case 'macro':body.innerHTML=layout(f('calories','Daily calorie target','number','2000','min="1" step="any"')+f('protein','Protein (%)','number','30','min="0" max="100" step="any"')+f('carbs','Carbohydrates (%)','number','40','min="0" max="100" step="any"')+f('fat','Fat (%)','number','30','min="0" max="100" step="any"'));attach(()=>{if(!positive('calories')||!nonnegative('protein','carbs','fat')||Math.abs(val('protein')+val('carbs')+val('fat')-100)>.001)return error('Enter a positive calorie goal and macro percentages adding up to 100%.');result('Daily macro targets',`${clean(val('calories'))} kcal`,`Protein: ${clean(val('calories')*val('protein')/400)} g · Carbs: ${clean(val('calories')*val('carbs')/400)} g · Fat: ${clean(val('calories')*val('fat')/900)} g`,'Uses 4 kcal/g for protein and carbohydrates, 9 kcal/g for fat. Macro splits are user-selected and not a personalized dietary prescription.')});break;
case 'date':body.innerHTML=layout(f('start','Start date','date',localISO(new Date()))+f('end','End date','date',localISO(new Date())));attach(()=>{const a=parseDate(str('start')),b=parseDate(str('end'));if(!a||!b)return error('Choose two valid dates.');const days=Math.round((Date.UTC(b.getFullYear(),b.getMonth(),b.getDate())-Date.UTC(a.getFullYear(),a.getMonth(),a.getDate()))/86400000);result('Days between dates',`${clean(Math.abs(days))} days`,`Signed difference: ${clean(days)} days · Approx. ${clean(Math.abs(days)/7)} weeks`,'Excludes the starting day; both dates are interpreted as calendar dates.')});break;
case 'fuel':body.innerHTML=layout(f('distance','Trip distance (km)','number','300','min="0" step="any"')+f('efficiency','Fuel consumption (L / 100 km)','number','7','min="0.01" step="any"')+f('price','Price per liter','number','250','min="0" step="any"'));attach(()=>{if(!nonnegative('distance','price')||!positive('efficiency'))return error('Enter a valid distance, fuel consumption and fuel price.');const liters=val('distance')*val('efficiency')/100;result('Estimated fuel cost',fmt(liters*val('price')),`Fuel needed: ${fmt(liters)} L · Distance: ${clean(val('distance'))} km`,'Enter a fuel price in your preferred currency. This is an estimate; real driving conditions can change fuel usage.')});break;
case 'savings':body.innerHTML=layout(f('goal','Savings goal','number','100000','min="0" step="any"')+f('current','Already saved','number','20000','min="0" step="any"')+f('months','Months to reach goal','number','12','min="1" step="1"'));attach(()=>{if(!nonnegative('goal','current')||!positive('months')||!Number.isInteger(val('months')))return error('Enter valid savings amounts and a positive whole number of months.');const remaining=Math.max(0,val('goal')-val('current'));result('Monthly savings needed',fmt(remaining/val('months')),`Remaining to save: ${fmt(remaining)} · Time available: ${clean(val('months'))} months`,'Assumes no interest or investment returns.')});break;
}}
// A shared-origin zoom: the dialog grows from the selected calculator and
// gently returns to that same card when closed (including Escape/backdrop).
const zoomMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
let openingAnimation=null, closingAnimation=null, originatingButton=null, zoomOffset={x:0,y:0};
function toolZoomOffset(button){
 if(!button || !button.isConnected)return {x:0,y:0};
 const from=button.getBoundingClientRect(), to=dialog.getBoundingClientRect();
 return {
  x:Math.max(-window.innerWidth*.48,Math.min(window.innerWidth*.48,from.left+from.width/2-to.left-to.width/2)),
  y:Math.max(-window.innerHeight*.48,Math.min(window.innerHeight*.48,from.top+from.height/2-to.top-to.height/2))
 };
}
function zoomFrames(offset, opening){
 const atCard=`translate3d(${offset.x}px,${offset.y}px,0) scale(.30) rotate(-2deg)`;
 const atRest='translate3d(0,0,0) scale(1) rotate(0deg)';
 return opening?[
  {offset:0,opacity:0,transform:atCard,filter:'blur(5px)'},
  {offset:.72,opacity:1,transform:'translate3d(0,-6px,0) scale(1.026) rotate(.3deg)',filter:'blur(0)'},
  {offset:1,opacity:1,transform:atRest,filter:'blur(0)'}
 ]:[
  {offset:0,opacity:1,transform:atRest,filter:'blur(0)'},
  {offset:.18,opacity:1,transform:'translate3d(0,-4px,0) scale(1.012) rotate(0deg)',filter:'blur(0)'},
  {offset:1,opacity:0,transform:atCard,filter:'blur(4px)'}
 ];
}
function openTool(tool,button){
 if(dialog.open)return;
 originatingButton=button||document.activeElement;
 activeTool=tool.id;requestSequence++;
 $('#dialogCategory').textContent=tool.category;
 $('#dialogTitle').textContent=tool.name;
 $('#dialogDescription').textContent=tool.description;
 $('#toolDisclaimer').textContent=tool.id==='currency'?'Internet connection required for currency conversion. Rates are reference values and may differ from provider quotes.':tool.category==='Health'?'Health-related results are general estimates, not a diagnosis, treatment plan or personal medical advice.':(tool.category==='Finance'||tool.category==='Business')?'Financial and tax figures are estimates based on your inputs and do not replace professional or jurisdiction-specific advice.':'Results are based on the values you enter. Check units, assumptions and precision before relying on them.';
 showTool(tool.id);
 if(!zoomMotion.matches)dialog.classList.add('dialog-opening');
 dialog.showModal();
 dialog.scrollTop=0;
 zoomOffset=toolZoomOffset(originatingButton);
 if(!zoomMotion.matches && typeof dialog.animate==='function'){
  openingAnimation=dialog.animate(zoomFrames(zoomOffset,true),{duration:460,easing:'cubic-bezier(.19,.78,.20,1)',fill:'both'});
  openingAnimation.finished.catch(()=>{}).then(()=>{openingAnimation=null;dialog.classList.remove('dialog-opening')});
 }else dialog.classList.remove('dialog-opening');
 $('#closeDialog').focus({preventScroll:true});
}
function finishClose(){
 if(!dialog.open)return;
 dialog.classList.remove('dialog-closing','dialog-opening');
 dialog.close();
 if(originatingButton && originatingButton.isConnected)originatingButton.focus({preventScroll:true});
 originatingButton=null;
}
function closeTool(){
 if(!dialog.open || closingAnimation)return;
 requestSequence++;activeTool=null;
 if(openingAnimation){openingAnimation.cancel();openingAnimation=null;}
 dialog.classList.remove('dialog-opening');
 if(zoomMotion.matches || typeof dialog.animate!=='function'){finishClose();return;}
 const destination=toolZoomOffset(originatingButton);
 dialog.classList.add('dialog-closing');
 closingAnimation=dialog.animate(zoomFrames(destination,false),{duration:345,easing:'cubic-bezier(.56,0,.84,.36)',fill:'both'});
 closingAnimation.finished.catch(()=>{}).then(()=>{
  closingAnimation=null;
  finishClose();
 });
}
$('#closeDialog').onclick=closeTool;
$('#backHome').onclick=closeTool;
dialog.addEventListener('click',e=>{if(e.target===dialog)closeTool()});
dialog.addEventListener('cancel',e=>{e.preventDefault();closeTool()});
dialog.addEventListener('close',()=>{requestSequence++;activeTool=null;dialog.classList.remove('dialog-opening','dialog-closing')});
// Popular shortcuts and discovery tiles use the same origin-aware animation.
document.querySelectorAll('[data-tool]').forEach(button=>button.addEventListener('click',()=>{
 const tool=tools.find(item=>item.id===button.dataset.tool);if(tool)openTool(tool,button);
}));
// Multiple jewel-toned palettes; the preference is saved when localStorage is available.
const palettes=['midnight','aurora','royal','amber'];
let chosenPalette='midnight';
try {const stored=localStorage.getItem('calcnest-palette');if(palettes.includes(stored))chosenPalette=stored;} catch(e) {}
function applyPalette(palette){
 if(!palettes.includes(palette))return;
 chosenPalette=palette;
 document.documentElement.dataset.theme='dark';
 document.documentElement.dataset.palette=palette;
 document.querySelectorAll('[data-palette-option]').forEach(button=>{
  const selected=button.dataset.paletteOption===palette;
  button.setAttribute('aria-pressed',String(selected));
 });
 const meta=document.querySelector('meta[name="theme-color"]');
 if(meta)meta.content={midnight:'#0b1020',aurora:'#071d23',royal:'#1a1026',amber:'#1f170f'}[palette];
}
applyPalette(chosenPalette);

// Silk Aurora follows the mouse with three gently delayed color clouds.
// The animation sleeps once the lights reach their destination and stops
// immediately on tab hide, pointer exit, or a reduced-motion preference.
function setupCursorAura() {
 const aura = document.getElementById('cursorAura');
 const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
 const prefersLessMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
 if (!aura || !finePointer.matches || prefersLessMotion.matches) return;
 const layers = [
  {element:aura.querySelector('.cursor-aura-ribbon-one'),width:760,height:590,ease:.105,offsetX:-40,offsetY:-20,x:0,y:0},
  {element:aura.querySelector('.cursor-aura-ribbon-two'),width:880,height:700,ease:.055,offsetX:105,offsetY:50,x:0,y:0},
  {element:aura.querySelector('.cursor-aura-ribbon-three'),width:1010,height:760,ease:.032,offsetX:-120,offsetY:80,x:0,y:0}
 ];
 let targetX=0,targetY=0,active=false,animationFrame=0,lastFrame=0;
 function draw(now) {
  animationFrame=0;
  if (!active) return;
  // Frame-rate independent smoothing makes the trailing feel the same on
  // high-refresh monitors without forcing an endless animation loop.
  const frameScale=lastFrame?Math.min(2.5,Math.max(.3,(now-lastFrame)/16.667)):1;
  lastFrame=now;
  let stillMoving=false;
  for (const layer of layers) {
   const toX=targetX+layer.offsetX-layer.width/2;
   const toY=targetY+layer.offsetY-layer.height/2;
   const ease=1-Math.pow(1-layer.ease,frameScale);
   layer.x+=(toX-layer.x)*ease;
   layer.y+=(toY-layer.y)*ease;
   if(Math.abs(toX-layer.x)>.4||Math.abs(toY-layer.y)>.4)stillMoving=true;
   else {layer.x=toX;layer.y=toY;}
   layer.element.style.transform=`translate3d(${layer.x.toFixed(2)}px,${layer.y.toFixed(2)}px,0)`;
  }
  if(stillMoving)animationFrame=requestAnimationFrame(draw);
  else lastFrame=0;
 }
 function move(event) {
  if(event.pointerType!=='mouse'||!finePointer.matches||prefersLessMotion.matches||document.hidden)return;
  targetX=event.clientX;targetY=event.clientY;
  if(!active){
   active=true;
   // Spawn each cloud in place: no flash or travel from the corner on entry.
   for(const layer of layers){layer.x=targetX+layer.offsetX-layer.width/2;layer.y=targetY+layer.offsetY-layer.height/2;layer.element.style.transform=`translate3d(${layer.x}px,${layer.y}px,0)`;}
   aura.classList.add('is-active');
  }
  if(!animationFrame)animationFrame=requestAnimationFrame(draw);
 }
 function hide() {
  active=false;lastFrame=0;
  aura.classList.remove('is-active');
  if(animationFrame)cancelAnimationFrame(animationFrame);
  animationFrame=0;
 }
 document.addEventListener('pointermove',move,{passive:true});
 document.addEventListener('pointerout',event=>{if(!event.relatedTarget)hide()});
 window.addEventListener('blur',hide);
 document.addEventListener('visibilitychange',()=>{if(document.hidden)hide()});
 finePointer.addEventListener('change',event=>{if(!event.matches)hide()});
 prefersLessMotion.addEventListener('change',event=>{if(event.matches)hide()});
}
setupCursorAura();
document.querySelectorAll('[data-palette-option]').forEach(button=>button.addEventListener('click',()=>{
 applyPalette(button.dataset.paletteOption);
 try{localStorage.setItem('calcnest-palette',chosenPalette)}catch(e){}
 $('#themeMenu').open=false;
}));
document.addEventListener('pointerdown',event=>{
 const menu=$('#themeMenu');if(menu.open&&!menu.contains(event.target))menu.open=false;
});
document.addEventListener('keydown',event=>{if(event.key==='Escape')$('#themeMenu').open=false});

// Progressive enhancement: content stays visible when JavaScript or animation APIs are unavailable.
const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
if('IntersectionObserver' in window && !reducedMotion.matches){
 const revealObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');revealObserver.unobserve(entry.target)}});
 },{threshold:0.08,rootMargin:'0px 0px 36px 0px'});
 const watchReveals=()=>{
  document.querySelectorAll('.reveal-on-scroll:not(.is-visible)').forEach(el=>{
   // Never hide an element already in the viewport, including dynamically filtered cards.
   const box=el.getBoundingClientRect();
   if(box.top<window.innerHeight-24&&box.bottom>0)el.classList.add('is-visible');
   else revealObserver.observe(el);
  });
 };
 document.querySelectorAll('.popular-heading,.popular-card,.discovery-intro,.discovery-tile,.section-head,.toolbar,.about-panel,.tool-card').forEach((el,index)=>{
  el.classList.add('reveal-on-scroll');
  if(el.matches('.popular-card,.discovery-tile,.tool-card'))el.style.setProperty('--reveal-delay',`${(index%4)*65}ms`);
 });
 document.documentElement.classList.add('motion-ready');
 watchReveals();
 new MutationObserver(records=>{
  if(!records.some(record=>record.addedNodes.length))return;
  document.querySelectorAll('.tool-card:not(.reveal-on-scroll)').forEach((el,index)=>{
   el.classList.add('reveal-on-scroll');el.style.setProperty('--reveal-delay',`${(index%4)*55}ms`);
  });
  watchReveals();
 }).observe(grid,{childList:true});
 window.addEventListener('pageshow',watchReveals);
}
// Scroll position indicator and quiet parallax, updated at most once per animation frame.
let scrollQueued=false;
function onScrollFrame(){
 const doc=document.documentElement;
 const travel=Math.max(1,doc.scrollHeight-window.innerHeight);
 doc.style.setProperty('--scroll-progress',`${Math.min(100,window.scrollY/travel*100)}%`);
 doc.style.setProperty('--hero-shift',`${Math.min(52,window.scrollY*.075)}px`);
 $('.site-header').classList.toggle('is-scrolled',window.scrollY>36);
 $('#backToTop').classList.toggle('is-active',window.scrollY>520);
 scrollQueued=false;
}
window.addEventListener('scroll',()=>{
 if(!scrollQueued){scrollQueued=true;requestAnimationFrame(onScrollFrame)}
},{passive:true});
window.addEventListener('resize',()=>{if(!scrollQueued){scrollQueued=true;requestAnimationFrame(onScrollFrame)}});
onScrollFrame();
$('#copyrightYear').textContent=new Date().getFullYear();renderTabs();renderCards();
