'use strict';
// Additional calculators extend the original CalcNest library without changing existing tools.
const extraCalculatorIds = new Set([
 'mortgage','investment','simple-interest','sales-tax','salary','retirement','gst','vat','margin','break-even',
 'time','timezone','date-calc','hours-minutes','pace','speed','distance','average','fraction','scientific',
 'area','volume','length','weight','temperature','age-difference','due-date','bmr','body-fat','ideal-weight'
]);
const E=(id)=>document.getElementById(id);
const exNum=id=>Number(E(id).value);
const exValue=id=>E(id).value;
const exValid=(ids,positive=false)=>ids.every(id=>E(id).value.trim()!==''&&Number.isFinite(exNum(id))&&(positive?exNum(id)>0:exNum(id)>=0));
const exFmt=(n,d=2)=>Number(n).toLocaleString('en-US',{maximumFractionDigits:d,minimumFractionDigits:d});
const exDate=new Date();
const exDay=local=>`${local.getFullYear()}-${String(local.getMonth()+1).padStart(2,'0')}-${String(local.getDate()).padStart(2,'0')}`;
const exUTC=d=>Date.UTC(d.getFullYear(),d.getMonth(),d.getDate());
const exDatePrint=d=>new Intl.DateTimeFormat('en-US',{year:'numeric',month:'long',day:'numeric',timeZone:'UTC'}).format(d);
function exIntro(text){return `<div class="extra-intro"><span class="extra-intro-symbol" aria-hidden="true">✦</span><p>${text}</p></div>`;}
function exShow(label,value,details=[],note=''){
 const output=E('output');output.replaceChildren();
 if(!Number.isFinite(typeof value==='number'?value:0)){error('The result is outside the supported numeric range. Try smaller values.');return;}
 const hero=document.createElement('div');hero.className='extra-result-hero';
 const small=document.createElement('span');small.className='extra-result-eyebrow';small.textContent=label;
 const big=document.createElement('strong');big.className='extra-result-number';big.textContent=String(value);
 hero.append(small,big);output.append(hero);
 if(details.length){const list=document.createElement('div');list.className='extra-result-details';details.forEach(([key,value])=>{
  const tile=document.createElement('div');tile.className='extra-result-tile';const k=document.createElement('span');k.textContent=key;const v=document.createElement('strong');v.textContent=String(value);tile.append(k,v);list.append(tile);
 });output.append(list);}
 if(note){const p=document.createElement('p');p.className='result-note extra-note';p.textContent=note;output.append(p);}
}
function exReady(fields,fn,button='Calculate',intro=''){
 body.innerHTML=exIntro(intro||'Enter your details to see a clear, instant breakdown.')+layout(fields,button);
 attach(fn);
}
function exFinanceNote(message='This is a simplified estimate, not a quote or financial advice. Taxes, fees and actual rates may change the outcome.'){return message;}
function exTaxCalculator(kind){
 const isVat=kind==='vat',isGST=kind==='gst',title=isVat?'VAT':isGST?'GST':'sales tax';
 exReady(select('mode','Price type',[['exclusive',`Before ${title}`],['inclusive',`Already includes ${title}`]],'exclusive')+
  f('price','Price / amount','number','100','min="0" step="any"')+
  f('rate',`${title.toUpperCase()} rate (%)`,'number',isVat?'20':isGST?'18':'8','min="0" step="any"'),()=>{
  if(!exValid(['price','rate'])||exNum('rate')>1000)return error('Enter a nonnegative price and a tax rate between 0% and 1,000%.');
  const rate=exNum('rate')/100,net=exValue('mode')==='inclusive'?exNum('price')/(1+rate):exNum('price'),tax=net*rate,gross=net+tax;
  exShow('Total including '+title,exFmt(gross),[['Base price',exFmt(net)], [`${title.charAt(0).toUpperCase()+title.slice(1)} amount`,exFmt(tax)],['Applied rate',`${exFmt(exNum('rate'),2)}%`]],`Enter the rate appropriate to your jurisdiction and product. This calculator does not determine tax obligations, exemptions or filing requirements.`);
 },`Calculate ${title}`,`Switch between prices before and after ${title} to reveal the tax amount.`);
}
function exDuration(total){const negative=total<0;const m=Math.abs(Math.round(total));return `${negative?'−':''}${Math.floor(m/60)}h ${String(m%60).padStart(2,'0')}m`;}
function exHM(hours,minutes){return Math.round(hours*60+minutes);}
function exNumberField(id,label,value,more=''){return f(id,label,'number',value,`step="any" ${more}`);}
function exWeightHeight(){return select('unit','Measurement system',[['metric','Metric · kg / cm'],['imperial','Imperial · lb / ft & in']],'metric')+
 exNumberField('weight','Weight (kg or lb)','70','min="0.01"')+exNumberField('height','Height (cm or total inches)','170','min="0.01"');}
function exMetrics(){let weight=exNum('weight'),height=exNum('height');if(exValue('unit')==='imperial'){weight*=0.45359237;height*=2.54;}return {weight,height};}
function exMeterUnit(value,factors,from,to){return value*factors[from]/factors[to];}
function exConvert(kind){
 const groups={length:{unit:'m',choices:[['mm','Millimeters'],['cm','Centimeters'],['m','Meters'],['km','Kilometers'],['in','Inches'],['ft','Feet'],['yd','Yards'],['mi','Miles']],factors:{mm:.001,cm:.01,m:1,km:1000,in:.0254,ft:.3048,yd:.9144,mi:1609.344}},weight:{unit:'kg',choices:[['mg','Milligrams'],['g','Grams'],['kg','Kilograms'],['t','Metric tonnes'],['oz','Ounces'],['lb','Pounds']],factors:{mg:.000001,g:.001,kg:1,t:1000,oz:.028349523125,lb:.45359237}}};
 const group=groups[kind]||{choices:[['c','Celsius (°C)'],['f','Fahrenheit (°F)'],['k','Kelvin (K)']]};
 exReady(exNumberField('amount','Value to convert','1')+select('from','From unit',group.choices,kind==='temperature'?'c':group.unit)+select('to','To unit',group.choices,kind==='temperature'?'f':kind==='length'?'ft':'lb'),()=>{
 if(!exValid(['amount'])&&!(E('amount').value.trim()!==''&&Number.isFinite(exNum('amount'))))return error('Enter a valid number.');
 const n=exNum('amount'),from=exValue('from'),to=exValue('to');let converted;
 if(kind==='temperature'){const c=from==='c'?n:from==='f'?(n-32)*5/9:n-273.15;if(c< -273.15-1e-9)return error('Temperature cannot be lower than absolute zero.');converted=to==='c'?c:to==='f'?c*9/5+32:c+273.15;}
 else {if(n<0)return error('Enter a nonnegative measurement.');converted=exMeterUnit(n,group.factors,from,to);}
 exShow('Converted value',`${exFmt(converted,6)} ${to}`,[['Original value',`${exFmt(n,6)} ${from}`],['Conversion',`${from} → ${to}`]]);
 },'Convert measurement','Switch between units and see an instant, precise conversion.');
 E('from').addEventListener('change',()=>{if(exValue('from')===exValue('to')) E('to').selectedIndex=(E('from').selectedIndex+1)%group.choices.length;});
}
function exCalendarAdd(d,years,months,days){
 const startDay=d.getUTCDate();let shifted=new Date(Date.UTC(d.getUTCFullYear()+years,d.getUTCMonth()+months,1));
 const max=new Date(Date.UTC(shifted.getUTCFullYear(),shifted.getUTCMonth()+1,0)).getUTCDate();shifted.setUTCDate(Math.min(startDay,max));shifted.setUTCDate(shifted.getUTCDate()+days);return shifted;
}
function exCalcAge(d1,d2){
 // Calendar-aware borrow: clamp 29/30/31st anniversaries to month-end.
 const first=new Date(exUTC(d1)),last=exUTC(d2);
 let years=d2.getFullYear()-d1.getFullYear();
 if(exCalendarAdd(first,years,0,0).getTime()>last)years--;
 let months=0;
 while(months<11&&exCalendarAdd(first,years,months+1,0).getTime()<=last)months++;
 const days=Math.round((last-exCalendarAdd(first,years,months,0).getTime())/86400000);
 return {years,months,days};
}
const exZones=[['UTC','UTC'],['Asia/Karachi','Karachi · PKT'],['Asia/Dubai','Dubai · GST'],['Asia/Kolkata','India · IST'],['Asia/Singapore','Singapore · SGT'],['Asia/Tokyo','Tokyo · JST'],['Europe/London','London · UK'],['Europe/Paris','Paris · CET/CEST'],['America/New_York','New York · ET'],['America/Chicago','Chicago · CT'],['America/Los_Angeles','Los Angeles · PT'],['America/Toronto','Toronto · ET'],['Australia/Sydney','Sydney · AEST/AEDT'],['Pacific/Auckland','Auckland · NZST/NZDT']];
function exZoneParts(epoch,zone){let parts=new Intl.DateTimeFormat('en-GB',{timeZone:zone,year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(epoch);let x={};for(const part of parts)if(part.type!=='literal')x[part.type]=Number(part.value);return x;}
function exZonedEpoch(value,zone){
 const m=/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/.exec(value);if(!m)return null;
 const [,year,month,day,hour,minute]=m.map(Number),civil=Date.UTC(year,month-1,day,hour,minute);if(!Number.isFinite(civil))return null;
 let offsets=new Set();for(const probe of [civil-86400000,civil,civil+86400000]){const p=exZoneParts(probe,zone);offsets.add((Date.UTC(p.year,p.month-1,p.day,p.hour,p.minute)-probe)/60000);}
 const matches=[];for(const off of offsets){const stamp=civil-off*60000,p=exZoneParts(stamp,zone);if(p.year===year&&p.month===month&&p.day===day&&p.hour===hour&&p.minute===minute)matches.push(stamp);}
 return matches.length?{time:Math.min(...matches),ambiguous:matches.length>1}:null;
}
// A small parser for the scientific tool; no eval, Function or dynamic code execution.
function exScientific(expression,degrees){
 const source=expression.replace(/×/g,'*').replace(/÷/g,'/').replace(/π/g,'pi').replace(/−/g,'-').replace(/\s+/g,'');
 const tokens=source.match(/(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?|[a-zA-Z]+|[()+*/^%!,\-]/g)||[];
 if(tokens.join('')!==source||tokens.length>180)throw Error('Use only supported numbers, operators and functions.');let i=0;
 const peek=()=>tokens[i],take=t=>{if(peek()===t){i++;return true;}return false;};
 function primary(){if(take('(')){const x=add();if(!take(')'))throw Error('Missing closing parenthesis.');return x;}
  const t=peek();if(!t)throw Error('Enter an expression.');i++;
  if(t==='pi')return Math.PI;if(t==='e')return Math.E;
  if(/^(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?$/.test(t))return Number(t);
  if(['sin','cos','tan','sqrt','ln','log','abs'].includes(t)){if(!take('('))throw Error(`Use ${t}(value).`);const n=add();if(!take(')'))throw Error('Missing closing parenthesis.');const rad=degrees?n*Math.PI/180:n;return ({sin:()=>Math.sin(rad),cos:()=>Math.cos(rad),tan:()=>Math.tan(rad),sqrt:()=>Math.sqrt(n),ln:()=>Math.log(n),log:()=>Math.log10(n),abs:()=>Math.abs(n)})[t]();}
  throw Error(`Unsupported symbol: ${t}`);
 }
 function postfix(){let x=primary();while(peek()==='!'||peek()==='%'){if(take('%'))x/=100;else if(take('!')){if(!Number.isInteger(x)||x<0||x>170)throw Error('Factorials require a whole number between 0 and 170.');let p=1;for(let k=2;k<=x;k++)p*=k;x=p;}}return x;}
 function power(){let x=postfix();if(take('^'))x=Math.pow(x,unary());return x;}
 function unary(){if(take('+'))return unary();if(take('-'))return -unary();return power();}
 function multiply(){let x=unary();while(peek()==='*'||peek()==='/'){const op=tokens[i++],y=unary();if(op==='/'&&y===0)throw Error('Cannot divide by zero.');x=op==='*'?x*y:x/y;}return x;}
 function add(){let x=multiply();while(peek()==='+'||peek()==='-'){const op=tokens[i++],y=multiply();x=op==='+'?x+y:x-y;}return x;}
 const answer=add();if(i!==tokens.length)throw Error('Please check the expression.');if(!Number.isFinite(answer))throw Error('The result is undefined or outside the supported range.');return answer;
}
function showExtraTool(id){switch(id){
case 'mortgage': exReady(
 exNumberField('price','Home price','300000','min="0.01"')+exNumberField('down','Down payment','60000','min="0"')+
 exNumberField('rate','Annual interest (%)','6.5','min="0"')+exNumberField('years','Loan term (years)','30','min="0.01"')+
 exNumberField('tax','Annual property tax','3000','min="0"')+exNumberField('insurance','Annual insurance','1200','min="0"'),()=>{
 if(!exValid(['price','down','rate','years','tax','insurance'])||exNum('price')<=0||exNum('years')<=0||exNum('down')>=exNum('price')||exNum('years')>100)return error('Enter a positive home price and term (up to 100 years); down payment must be less than the price.');
 const loan=exNum('price')-exNum('down'),months=exNum('years')*12,r=exNum('rate')/1200,monthly=r?loan*r/(1-Math.pow(1+r,-months)):loan/months;
 exShow('Estimated monthly housing payment',exFmt(monthly+(exNum('tax')+exNum('insurance'))/12),[['Principal & interest',exFmt(monthly)],['Tax & insurance / month',exFmt((exNum('tax')+exNum('insurance'))/12)],['Loan principal',exFmt(loan)],['Total interest over loan',exFmt(monthly*months-loan)]],exFinanceNote('Fixed-rate monthly payment estimate. Excludes HOA fees, mortgage insurance, closing costs and rate changes.'));
 },'Calculate mortgage','Discover how down payment, interest and homeownership costs affect the monthly budget.');break;
case 'investment':exReady(exNumberField('start','Starting investment','10000','min="0"')+exNumberField('monthly','Monthly contribution','250','min="0"')+
 exNumberField('rate','Assumed annual return (%)','7','min="-99.9" max="1000"')+exNumberField('years','Investment period (years)','20','min="0.01"'),()=>{
 if(!exValid(['start','monthly','years'])||!Number.isFinite(exNum('rate'))||E('rate').value.trim()===''||exNum('rate')<=-100||exNum('rate')>1000||exNum('years')<=0||exNum('years')>100)return error('Enter valid contributions, a return above −100%, and a period up to 100 years.');
 const n=Math.round(exNum('years')*12),r=Math.pow(1+exNum('rate')/100,1/12)-1,initial=exNum('start'),contrib=exNum('monthly'),future=initial*Math.pow(1+r,n)+(r===0?contrib*n:contrib*(Math.pow(1+r,n)-1)/r),deposits=initial+contrib*n;
 if(!Number.isFinite(future))return error('The projection is outside the supported range.');
 exShow('Projected investment value',exFmt(future),[['Total contributions',exFmt(deposits)],['Projected gain / loss',exFmt(future-deposits)],['Investment period',`${exFmt(n/12,1)} years`]],exFinanceNote('Illustrative constant-return projection with deposits at month-end. Returns can fluctuate and may be negative; fees, inflation and taxes are excluded.'));
 },'Project growth','See how time, an initial deposit and regular contributions could shape your investment.');break;
case 'simple-interest':exReady(exNumberField('principal','Principal amount','10000','min="0"')+exNumberField('rate','Annual interest rate (%)','5','min="0"')+exNumberField('years','Time (years)','3','min="0"'),()=>{
 if(!exValid(['principal','rate','years'])||exNum('years')>1000)return error('Enter valid nonnegative amounts, rate and time.');const interest=exNum('principal')*exNum('rate')*exNum('years')/100;
 exShow('Simple interest',exFmt(interest),[['Principal',exFmt(exNum('principal'))],['Final amount',exFmt(exNum('principal')+interest)],['Interest per year',exFmt(exNum('principal')*exNum('rate')/100)]],exFinanceNote('Uses principal × annual rate × years. No compounding, additional payments, fees or tax effects.'));
 },'Calculate interest','A clear view of interest earned or charged without compounding.');break;
case 'sales-tax':exTaxCalculator('sales-tax');break;
case 'gst':exTaxCalculator('gst');break;
case 'vat':exTaxCalculator('vat');break;
case 'salary':exReady(select('mode','Convert from',[['hour','Hourly pay'],['annual','Annual salary']],'hour')+exNumberField('pay','Pay amount','25','min="0"')+
 exNumberField('hours','Hours per week','40','min="0.01"')+exNumberField('weeks','Paid weeks per year','52','min="0.01" max="53"'),()=>{
 if(!exValid(['pay','hours','weeks'])||exNum('hours')<=0||exNum('hours')>168||exNum('weeks')<=0||exNum('weeks')>53)return error('Enter valid pay, hours (up to 168/week), and paid weeks (up to 53/year).');
 const yearly=exValue('mode')==='hour'?exNum('pay')*exNum('hours')*exNum('weeks'):exNum('pay'),hourly=yearly/(exNum('hours')*exNum('weeks'));
 exShow('Estimated annual gross pay',exFmt(yearly),[['Hourly equivalent',exFmt(hourly)],['Weekly gross pay',exFmt(yearly/exNum('weeks'))],['Monthly average',exFmt(yearly/12)],['Hours / year',exFmt(exNum('hours')*exNum('weeks'),0)]],exFinanceNote('Gross earnings before tax, benefits, deductions and overtime premiums. Monthly pay is the annualized average, not necessarily a paycheck amount.'));
 },'Convert pay','Turn an hourly rate into a full-year estimate, or a salary into its hourly equivalent.');break;
case 'retirement':exReady(exNumberField('age','Current age','30','min="0"')+exNumberField('retire','Retirement age','65','min="1"')+
 exNumberField('savings','Current savings','20000','min="0"')+exNumberField('monthly','Monthly contributions','400','min="0"')+
 exNumberField('rate','Assumed annual return (%)','5','min="-99" max="100"')+exNumberField('inflation','Assumed inflation (%)','2.5','min="0" max="100"'),()=>{
 if(!exValid(['age','retire','savings','monthly','inflation'])||!Number.isFinite(exNum('rate'))||E('rate').value.trim()===''||exNum('retire')<=exNum('age')||exNum('retire')>110||exNum('rate')<=-100||exNum('rate')>100||exNum('inflation')>100)return error('Choose a retirement age after your current age, and enter valid savings, rates and contributions.');
 const years=exNum('retire')-exNum('age'),n=Math.round(years*12),r=Math.pow(1+exNum('rate')/100,1/12)-1,initial=exNum('savings'),deposit=exNum('monthly'),balance=initial*Math.pow(1+r,n)+(Math.abs(r)<1e-12?deposit*n:deposit*(Math.pow(1+r,n)-1)/r),present=balance/Math.pow(1+exNum('inflation')/100,years);
 if(!Number.isFinite(balance))return error('Try smaller values for this long-term projection.');
 exShow('Estimated savings at retirement',exFmt(balance),[["Today's-money equivalent",exFmt(present)],['Total deposited',exFmt(initial+deposit*n)],['Years until retirement',exFmt(years,1)]],exFinanceNote('Scenario only, not a prediction or a retirement adequacy assessment. Assumes stable returns, inflation and contributions; excludes taxes, fees and withdrawals.'));
 },'Estimate savings','Explore a retirement savings scenario, including a rough inflation-adjusted value.');break;
case 'margin':exReady(exNumberField('cost','Cost per unit','60','min="0"')+exNumberField('price','Selling price per unit','100','min="0.01"')+exNumberField('units','Units sold','100','min="0"'),()=>{
 if(!exValid(['cost','price','units'])||exNum('price')<=0)return error('Enter nonnegative costs and units, and a positive selling price.');
 const profit=exNum('price')-exNum('cost'),margin=100*profit/exNum('price'),markup=exNum('cost')>0?`${exFmt(100*profit/exNum('cost'))}%`:'N/A (zero cost)';
 exShow('Gross profit margin',`${exFmt(margin)}%`,[['Profit per unit',exFmt(profit)],['Markup on cost',markup],['Total gross profit',exFmt(profit*exNum('units'))]],'Gross margin is profit ÷ selling price; markup is profit ÷ cost. Overheads, taxes and other expenses are excluded.');
 },'Calculate margin','Compare selling price with cost and see the difference between markup and margin.');break;
case 'break-even':exReady(exNumberField('fixed','Fixed costs','10000','min="0"')+exNumberField('price','Selling price per unit','50','min="0.01"')+
 exNumberField('variable','Variable cost per unit','30','min="0"'),()=>{
 if(!exValid(['fixed','price','variable'])||exNum('price')<=0)return error('Enter valid fixed costs, selling price and variable cost.');
 const contribution=exNum('price')-exNum('variable');if(contribution<=0)return error('Selling price must exceed variable cost per unit to reach break-even with positive sales.');
 const units=Math.ceil(exNum('fixed')/contribution);
 exShow('Break-even sales volume',`${exFmt(units,0)} units`,[['Revenue at break-even',exFmt(units*exNum('price'))],['Contribution per unit',exFmt(contribution)],['Contribution margin',`${exFmt(100*contribution/exNum('price'))}%`]],'Assumes constant unit price and variable cost, all units sell, and one product; rounded up to a whole unit.');
 },'Find break-even point','Discover how many sales could cover fixed costs using your price and unit costs.');break;
case 'time':exReady(f('clock','Starting time','time','09:30')+select('operation','Operation',[['add','Add time'],['subtract','Subtract time']],'add')+
 exNumberField('hours','Hours','2','min="0"')+exNumberField('minutes','Minutes','45','min="0"'),()=>{
 const m=/^(\d\d):(\d\d)$/.exec(exValue('clock'));if(!m||!exValid(['hours','minutes'])||exNum('hours')>1e6||exNum('minutes')>1e6)return error('Enter a start time and valid nonnegative hours and minutes.');
 const base=Number(m[1])*60+Number(m[2]),change=exHM(exNum('hours'),exNum('minutes'))*(exValue('operation')==='add'?1:-1),total=base+change,minute=((total%1440)+1440)%1440,day=Math.floor(total/1440);
 exShow('Resulting clock time',`${String(Math.floor(minute/60)).padStart(2,'0')}:${String(minute%60).padStart(2,'0')}`,[['Date change',day===0?'Same day':day>0?`${day} day(s) later`:`${Math.abs(day)} day(s) earlier`],['Time changed',exDuration(change)]]);
 },'Calculate time','Add or subtract an hours-and-minutes duration from any clock time.');break;
case 'timezone':{
 const now=new Date();const stamp=`${exDay(now)}T${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
 exReady(f('dateTime','Date & time at source location','datetime-local',stamp)+select('from','From time zone',exZones,'Asia/Karachi')+select('to','To time zone',exZones,'America/New_York'),()=>{
  const zone=exValue('from'),target=exValue('to'),source=exZonedEpoch(exValue('dateTime'),zone);if(!source)return error('This local time does not exist in the source time zone (possibly a daylight-saving clock change), or the date is invalid. Choose another time.');
  const formatted=new Intl.DateTimeFormat('en-US',{timeZone:target,weekday:'short',year:'numeric',month:'short',day:'numeric',hour:'numeric',minute:'2-digit',timeZoneName:'short'}).format(source.time);
  const iso=new Intl.DateTimeFormat('en-GB',{timeZone:target,year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).format(source.time);
  exShow('Converted local time',formatted,[['Destination zone',target.replaceAll('_',' ')],['24-hour display',iso]],source.ambiguous?'The input occurs twice during a daylight-saving fallback. The first occurrence was used.':'Uses time-zone rules built into your browser, including seasonal daylight-saving changes where applicable.');
 },'Convert time','Convert a local date and time between major world cities, with daylight-saving changes accounted for.');break;}
case 'date-calc':exReady(f('start','Starting date','date',exDay(new Date()))+select('operation','Operation',[['add','Add to date'],['subtract','Subtract from date']],'add')+
 exNumberField('years','Years','0','min="0" step="1"')+exNumberField('months','Months','1','min="0" step="1"')+exNumberField('days','Days','7','min="0" step="1"'),()=>{
 const start=parseDate(exValue('start'));if(!start||!exValid(['years','months','days'])||!['years','months','days'].every(k=>Number.isInteger(exNum(k))&&exNum(k)<=50000))return error('Select a valid date and nonnegative whole-number offsets.');
 const sign=exValue('operation')==='add'?1:-1;const outcome=exCalendarAdd(new Date(Date.UTC(start.getFullYear(),start.getMonth(),start.getDate())),sign*exNum('years'),sign*exNum('months'),sign*exNum('days'));
 if(!Number.isFinite(outcome.valueOf())||outcome.getUTCFullYear()<1||outcome.getUTCFullYear()>9999)return error('Result is outside the supported date range.');
 exShow('Resulting date',exDatePrint(outcome),[['ISO date',outcome.toISOString().slice(0,10)],['Days from start',exFmt(Math.round((outcome-exUTC(start))/86400000),0)]],'When adding months to a date near month-end, the day is limited to the last day of the resulting month.');
 },'Calculate new date','Travel forward or backward on a calendar by years, months and days.');break;
case 'hours-minutes':exReady(exNumberField('h1','First duration · hours','2','min="0"')+exNumberField('m1','First duration · minutes','30','min="0"')+
 select('operation','Operation',[['add','Add durations'],['subtract','Subtract durations']],'add')+
 exNumberField('h2','Second duration · hours','1','min="0"')+exNumberField('m2','Second duration · minutes','45','min="0"'),()=>{
 if(!exValid(['h1','m1','h2','m2']))return error('Enter nonnegative hours and minutes for each duration.');
 const a=exHM(exNum('h1'),exNum('m1')),b=exHM(exNum('h2'),exNum('m2')),value=a+(exValue('operation')==='add'?b:-b);
 exShow('Combined duration',exDuration(value),[['Total minutes',exFmt(value,0)],['Decimal hours',exFmt(value/60,3)]]);
 },'Calculate duration','Add or subtract two durations, even when the result spans multiple days.');break;
case 'pace':exReady(exNumberField('distance','Distance (km)','5','min="0.001"')+exNumberField('hours','Time · hours','0','min="0"')+
 exNumberField('minutes','Time · minutes','25','min="0"')+exNumberField('seconds','Time · seconds','0','min="0"'),()=>{
 if(!exValid(['distance','hours','minutes','seconds'])||exNum('distance')<=0)return error('Enter a positive distance and a valid elapsed time.');
 const duration=exNum('hours')*3600+exNum('minutes')*60+exNum('seconds');if(duration<=0)return error('Elapsed time must be greater than zero.');
 const pace=duration/exNum('distance'),seconds=Math.round(pace),kmh=3600/pace;
 exShow('Average pace per kilometer',`${Math.floor(seconds/60)}:${String(seconds%60).padStart(2,'0')} /km`,[['Average speed',`${exFmt(kmh)} km/h`],['5 km at this pace',exDuration(pace*5/60)],['10 km at this pace',exDuration(pace*10/60)]],'This is an average across the full distance; terrain, weather and pauses can change actual segment pace.');
 },'Calculate pace','Find your average running or walking pace and projected 5 km / 10 km split times.');break;
case 'speed':exReady(exNumberField('distance','Distance (km)','100','min="0"')+exNumberField('hours','Elapsed hours','1','min="0"')+exNumberField('minutes','Additional minutes','30','min="0"'),()=>{
 if(!exValid(['distance','hours','minutes']))return error('Enter nonnegative distance and elapsed time.');const t=exNum('hours')+exNum('minutes')/60;if(t<=0)return error('Elapsed time must be positive.');const kmh=exNum('distance')/t;
 exShow('Average speed',`${exFmt(kmh)} km/h`,[['Miles per hour',`${exFmt(kmh/1.609344)} mph`],['Meters per second',`${exFmt(kmh/3.6)} m/s`],['Elapsed time',exDuration(t*60)]]);
 },'Calculate speed','Convert distance and elapsed time into average speed in three units.');break;
case 'distance':exReady(exNumberField('speed','Average speed (km/h)','60','min="0"')+exNumberField('hours','Travel hours','2','min="0"')+
 exNumberField('minutes','Additional minutes','30','min="0"'),()=>{
 if(!exValid(['speed','hours','minutes']))return error('Enter a nonnegative speed and travel time.');const hours=exNum('hours')+exNum('minutes')/60,km=exNum('speed')*hours;
 exShow('Estimated travel distance',`${exFmt(km)} km`,[['Miles',`${exFmt(km/1.609344)} mi`],['Meters',`${exFmt(km*1000)} m`],['Travel time',exDuration(hours*60)]],'Assumes constant average speed for the chosen duration.');
 },'Calculate distance','Estimate travel distance from average speed and elapsed time.');break;
case 'average':{
 body.innerHTML=exIntro('Paste a list of numbers to see their average and spread.')+layout(`<div class="field full"><label for="numbers">Numbers (commas, spaces or new lines)</label><textarea id="numbers" rows="4" placeholder="12, 18, 25, 35, 40">12, 18, 25, 35, 40</textarea></div>`,'Find average');
 attach(()=>{const source=exValue('numbers').trim();if(!source)return error('Enter at least one number.');const pieces=source.split(/[\s,;]+/).filter(Boolean),numbers=pieces.map(Number);if(pieces.length>5000||numbers.some(n=>!Number.isFinite(n)))return error('Enter up to 5,000 valid numbers, separated by commas or spaces.');
 const sorted=[...numbers].sort((a,b)=>a-b),sum=numbers.reduce((x,y)=>x+y,0),mean=sum/numbers.length,median=numbers.length%2?sorted[(numbers.length-1)/2]:(sorted[numbers.length/2-1]+sorted[numbers.length/2])/2;
 exShow('Arithmetic mean',exFmt(mean,5),[['Median',exFmt(median,5)],['Smallest / largest',`${exFmt(sorted[0],3)} / ${exFmt(sorted.at(-1),3)}`],['Sum',exFmt(sum,4)],['Number of values',String(numbers.length)]]);
 });break;}
case 'fraction':exReady(
 exNumberField('a','First numerator','1','step="1"')+exNumberField('b','First denominator','2','step="1"')+
 select('operation','Operation',[['+','Add (+)'],['-','Subtract (−)'],['*','Multiply (×)'],['/','Divide (÷)']],' +'.trim())+
 exNumberField('c','Second numerator','1','step="1"')+exNumberField('d','Second denominator','4','step="1"'),()=>{
 const ids=['a','b','c','d'];if(!ids.every(id=>E(id).value.trim()!==''&&Number.isSafeInteger(exNum(id))&&Math.abs(exNum(id))<=1e7)||exNum('b')===0||exNum('d')===0)return error('Use whole-number numerators and nonzero denominators (absolute values up to 10 million).');
 const [a,b,c,d]=ids.map(exNum),op=exValue('operation');if(op==='/'&&c===0)return error('Cannot divide by a fraction whose numerator is zero.');
 let top=op==='+'?a*d+c*b:op==='-'?a*d-c*b:op==='*'?a*c:a*d;
 let bottom=op==='+'||op==='-'?b*d:op==='*'?b*d:b*c;
 if(!Number.isSafeInteger(top)||!Number.isSafeInteger(bottom))return error('The result exceeds integer precision. Use smaller values.');
 if(bottom<0){bottom=-bottom;top=-top;}
 const gcd=(x,y)=>{x=Math.abs(x);y=Math.abs(y);while(y){[x,y]=[y,x%y];}return x||1;};const divisor=gcd(top,bottom);top/=divisor;bottom/=divisor;
 exShow('Simplified fraction',bottom===1?String(top):`${top} / ${bottom}`,[['Decimal equivalent',exFmt(top/bottom,8)],['Operation',`${a}/${b} ${op} ${c}/${d}`]],'Fractions are reduced to lowest terms. Decimal values are rounded for display.');
 },'Calculate fraction','Add, subtract, multiply or divide fractions and simplify the result.');break;
case 'scientific':{
 body.innerHTML=`<div class="scientific-shell"><div class="scientific-top"><span>SCIENTIFIC WORKSPACE</span>${select('angle','Angle units',[['deg','DEG'],['rad','RAD']],'deg')}</div><label class="science-label" for="expression">Expression</label><input id="expression" class="science-display" type="text" inputmode="text" spellcheck="false" autocomplete="off" placeholder="sin(30) + sqrt(16)" value="sin(30) + sqrt(16)" aria-label="Scientific expression"><div class="science-help">Try sin(30), log(100), sqrt(81), 2^8, pi or 5! · Functions need parentheses.</div><div class="science-keypad" aria-label="Scientific calculator keys"></div><button type="button" class="calculate-btn science-equals" id="scienceGo">Calculate result =</button><div id="output" aria-live="polite"></div></div>`;
 const keypad=E('toolBody').querySelector('.science-keypad');const keys=['sin(', 'cos(', 'tan(', 'sqrt(', 'ln(', 'log(', '(', ')', '7','8','9','/','4','5','6','*','1','2','3','-','0','.','pi','+','e','^','%','!','abs(','C','⌫'];
 keys.forEach(key=>{const button=document.createElement('button');button.type='button';button.textContent=key;button.className='science-key'+(['C','⌫'].includes(key)?' science-key-action':'')+('+-*/^='.includes(key)?' science-key-operator':'');button.setAttribute('aria-label',key==='⌫'?'Delete last character':key==='C'?'Clear expression':`Insert ${key}`);button.onclick=()=>{const input=E('expression');const start=input.selectionStart,end=input.selectionEnd;if(key==='C'){input.value='';}else if(key==='⌫'){const at=start===end?Math.max(0,start-1):start;input.setRangeText('',at,end,'end');}else input.setRangeText(key,start,end,'end');input.focus();};keypad.append(button);});
 function calculate(){const text=exValue('expression');if(!text.trim())return error('Enter an expression to calculate.');try{const n=exScientific(text,exValue('angle')==='deg');exShow('Calculated result',exFmt(n,10),[['Angle mode',exValue('angle')==='deg'?'Degrees':'Radians']]);}catch(e){error(e.message||'Invalid expression.');}}
 E('scienceGo').onclick=calculate;E('expression').addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();calculate();}});
 break;}
case 'area':{
 const shapes=[['rectangle','Rectangle'],['square','Square'],['triangle','Triangle'],['circle','Circle'],['trapezoid','Trapezoid']];
 function shapeFields(){const shape=exValue('shape');const defs={rectangle:[['width','Width',8],['height','Height',5]],square:[['side','Side length',5]],triangle:[['base','Base',8],['height','Perpendicular height',5]],circle:[['radius','Radius',5]],trapezoid:[['top','Parallel side A',5],['bottom','Parallel side B',8],['height','Perpendicular height',4]]};
 E('shapeFields').innerHTML=defs[shape].map(([id,name,defaultValue])=>exNumberField(id,name,String(defaultValue),'min="0.000001"')).join('');}
 body.innerHTML=exIntro('Pick a shape and enter dimensions in your chosen unit.')+layout(select('shape','2D shape',shapes,'rectangle')+select('unit','Length unit',[['cm','Centimeters (cm)'],['m','Meters (m)'],['in','Inches (in)'],['ft','Feet (ft)']],'cm')+'<div id="shapeFields" class="shape-fields"></div>','Calculate area');shapeFields();E('shape').onchange=()=>{shapeFields();E('output').replaceChildren();};
 attach(()=>{const shape=exValue('shape'),ids=shape==='rectangle'?['width','height']:shape==='square'?['side']:shape==='triangle'?['base','height']:shape==='circle'?['radius']:['top','bottom','height'];if(!exValid(ids,true))return error('Enter a positive dimension for every field.');
 const a=shape==='rectangle'?exNum('width')*exNum('height'):shape==='square'?Math.pow(exNum('side'),2):shape==='triangle'?exNum('base')*exNum('height')/2:shape==='circle'?Math.PI*Math.pow(exNum('radius'),2):(exNum('top')+exNum('bottom'))*exNum('height')/2;
 exShow('Calculated area',`${exFmt(a,5)} ${exValue('unit')}²`,[['Selected shape',shapes.find(([k])=>k===shape)[1]]],'Uses the standard geometric area formula for the chosen shape.');});break;}
case 'volume':{
 const shapes=[['box','Rectangular prism'],['cube','Cube'],['cylinder','Cylinder'],['sphere','Sphere'],['cone','Cone']];
 const fields={box:[['length','Length',6],['width','Width',4],['height','Height',3]],cube:[['side','Edge length',4]],cylinder:[['radius','Radius',2],['height','Height',6]],sphere:[['radius','Radius',3]],cone:[['radius','Radius',2],['height','Height',6]]};
 function shapeFields(){E('shapeFields').innerHTML=fields[exValue('shape')].map(([id,label,defaultValue])=>exNumberField(id,label,String(defaultValue),'min="0.000001"')).join('');}
 body.innerHTML=exIntro('Select a solid and enter its dimensions to calculate interior volume.')+layout(select('shape','3D shape',shapes,'box')+select('unit','Length unit',[['cm','Centimeters (cm)'],['m','Meters (m)'],['in','Inches (in)'],['ft','Feet (ft)']],'cm')+'<div id="shapeFields" class="shape-fields"></div>','Calculate volume');shapeFields();E('shape').onchange=()=>{shapeFields();E('output').replaceChildren();};
 attach(()=>{const shape=exValue('shape'),ids=fields[shape].map(([id])=>id);if(!exValid(ids,true))return error('Enter a positive dimension for every field.');
 const n=shape==='box'?exNum('length')*exNum('width')*exNum('height'):shape==='cube'?Math.pow(exNum('side'),3):shape==='cylinder'?Math.PI*exNum('radius')**2*exNum('height'):shape==='sphere'?4/3*Math.PI*exNum('radius')**3:Math.PI*exNum('radius')**2*exNum('height')/3;
 exShow('Calculated volume',`${exFmt(n,5)} ${exValue('unit')}³`,[['Selected solid',shapes.find(([k])=>k===shape)[1]]],'Uses the standard geometric volume formula for the chosen solid.');});break;}
case 'length':exConvert('length');break;
case 'weight':exConvert('weight');break;
case 'temperature':exConvert('temperature');break;
case 'age-difference':exReady(f('first','First birth date','date','1990-05-15')+f('second','Second birth date','date','2000-08-20'),()=>{
 let a=parseDate(exValue('first')),b=parseDate(exValue('second'));if(!a||!b||a>new Date()||b>new Date())return error('Choose valid birth dates no later than today.');if(a>b)[a,b]=[b,a];const age=exCalcAge(a,b),days=Math.round((exUTC(b)-exUTC(a))/86400000);
 exShow('Difference between birth dates',`${age.years} years`,[['Additional months & days',`${age.months} months, ${age.days} days`],['Total days apart',exFmt(days,0)],['Approximate total weeks',exFmt(days/7,1)]]);
 },'Calculate age difference','Compare two birth dates and see their age gap in years, months and days.');break;
case 'due-date':{
 const lastMonth=new Date();lastMonth.setDate(lastMonth.getDate()-56);
 exReady(f('lmp','First day of last menstrual period','date',exDay(lastMonth))+exNumberField('cycle','Typical cycle length (days)','28','min="21" max="35" step="1"'),()=>{
  const lmp=parseDate(exValue('lmp')),cycle=exNum('cycle');if(!lmp||!Number.isInteger(cycle)||cycle<21||cycle>35)return error('Enter a valid first day of your last menstrual period and a cycle of 21–35 days.');
  const daysSince=Math.floor((exUTC(new Date())-exUTC(lmp))/86400000);if(daysSince<0||daysSince>300)return error('Choose a period start date from the last 300 days, not a future date.');
  const date=new Date(exUTC(lmp));date.setUTCDate(date.getUTCDate()+280+(cycle-28));const difference=Math.ceil((date.getTime()-exUTC(new Date()))/86400000);
  exShow('Estimated due date',exDatePrint(date),[['Estimated time remaining',difference>=0?`${difference} days`:`${Math.abs(difference)} days past estimate`],['Cycle length used',`${cycle} days`],['Date (ISO)',date.toISOString().slice(0,10)]],'A due date is only an estimate based on the last menstrual period and cycle length. Ultrasound dating and your prenatal care clinician may determine a different date. Not for medical decisions.');
 },'Estimate due date','Get a calendar estimate from the first day of your last menstrual period.');break;}
case 'bmr':exReady(exWeightHeight()+exNumberField('age','Age (years)','30','min="1" max="120"')+
 select('sex','Sex used in the formula',[['male','Male'],['female','Female']],'male'),()=>{
 if(!exValid(['weight','height','age'],true)||exNum('age')>120)return error('Enter a positive weight, height and age (up to 120 years).');const {weight,height}=exMetrics(),bmr=10*weight+6.25*height-5*exNum('age')+(exValue('sex')==='male'?5:-161);
 if(bmr<=0)return error('These measurements are outside the valid range for this equation.');
 exShow('Estimated basal metabolic rate',`${exFmt(bmr,0)} kcal/day`,[['Estimated calories per hour',`${exFmt(bmr/24,0)} kcal`],['Equation','Mifflin–St Jeor']],'A population-based resting-energy estimate, not your total daily calorie need or a recommended calorie target. Individual needs can differ substantially.');
 },'Estimate BMR','Estimate daily resting energy using the Mifflin–St Jeor equation.');break;
case 'body-fat':{
 body.innerHTML=exIntro('This tape-measure estimate uses the U.S. Navy circumference method for adults.')+layout(
 select('sex','Measurement formula',[['male','Male'],['female','Female']],'male')+select('unit','Circumference units',[['cm','Centimeters'],['in','Inches']],'cm')+
 exNumberField('height','Height','175','min="0.01"')+exNumberField('neck','Neck circumference','38','min="0.01"')+
 exNumberField('waist','Waist circumference','85','min="0.01"')+exNumberField('hip','Hip circumference (female formula)','95','min="0.01"'),'Estimate body fat');
 attach(()=>{const sex=exValue('sex'),ids=sex==='male'?['height','neck','waist']:['height','neck','waist','hip'];if(!exValid(ids,true))return error('Enter valid positive measurements.');
  const scale=exValue('unit')==='cm'?1/2.54:1,h=exNum('height')*scale,neck=exNum('neck')*scale,waist=exNum('waist')*scale,hip=exNum('hip')*scale,measure=sex==='male'?waist-neck:waist+hip-neck;
  if(measure<=0)return error('The waist (and hip, where applicable) measurement must exceed the neck measurement.');
  const pct=sex==='male'?86.010*Math.log10(measure)-70.041*Math.log10(h)+36.76:163.205*Math.log10(measure)-97.684*Math.log10(h)-104.912;
  if(!Number.isFinite(pct)||pct<0||pct>75)return error('These inputs fall outside the useful range of the circumference equation. Please review the measurements.');
  exShow('Estimated body fat',`${exFmt(pct,1)}%`,[['Method','U.S. Navy circumference equation'],['Unit',exValue('unit')==='cm'?'Centimeters':'Inches']],'An approximate population-based measurement, not a diagnosis or an accurate substitute for a clinical body-composition assessment. Tape placement changes the result.');
 });break;}
case 'ideal-weight':{
 body.innerHTML=exIntro('See a height-based reference estimate; it is not a personal weight-loss target.')+layout(select('unit','Height unit',[['cm','Centimeters (cm)'],['in','Total inches (in)']],'cm')+
 exNumberField('height','Height','175','min="0.01"')+select('sex','Reference formula',[['male','Male'],['female','Female']],'male'),'Calculate reference weight');
 attach(()=>{if(!exValid(['height'],true))return error('Enter a valid positive height.');const inches=exValue('unit')==='cm'?exNum('height')/2.54:exNum('height');if(inches<60||inches>90)return error('The Devine adult reference formula is shown here for heights from 5 ft to 7 ft 6 in.');
  const kg=(exValue('sex')==='male'?50:45.5)+2.3*(inches-60);exShow('Reference weight (Devine formula)',`${exFmt(kg,1)} kg`,[['Pounds',`${exFmt(kg*2.2046226218,1)} lb`],['Height',`${exFmt(inches*2.54,1)} cm`]],'This historical medication-dosing reference is not a diagnosis or a healthy-weight target. It does not account for body composition, age or individual circumstances.');
 });break;}
default:body.innerHTML='<p class="error">This calculator is unavailable.</p>';
}}
