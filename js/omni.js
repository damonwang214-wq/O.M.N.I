const f = window.OMNI_DATA2.f;
"use strict";
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
function isMorning() {
const h = new Date().getHours();
return h < 12;
}
async function omniRespond(raw) {
const text = (raw || "")
.toLowerCase()
.replace(/[^a-z0-9\s?.,!/']/g, "")
.replace(/\s+/g, " ")
.trim();
const sir = "Sir";
const name = window.__omniName ? `, ${window.__omniName}` : "";
const say = (s) => s;
if (/^(hi|hii+|hey|hello|yo|good (morning|afternoon|evening))\b/.test(text)) {
if (isMorning()) return f(window.OMNI_DATA2.goodMorning, [sir]);
if (text.includes("afternoon")) return f(window.OMNI_DATA2.goodAfternoon, [sir]);
if (text.includes("evening")) return f(window.OMNI_DATA2.goodEvening, [sir]);
return f(window.OMNI_DATA2.greeting, [sir]);
}
if (/(who are you|what are you|your (name|identity)|introduce yourself)/.test(text)) {
return window.OMNI_DATA.lines.persona;
}
if (/(are you (a )?real|are you alive|do you have feelings|are you sentient)/.test(text)) {
return f(window.OMNI_DATA2.real, []);
}
if (/(are you (an )?ai|are you (an )?agi|are you intelligent)/.test(text)) {
return f(window.OMNI_DATA2.ai, []);
}
if (/(how are you|how's it going|how do you do|how r u|how are things)/.test(text)) {
return f(window.OMNI_DATA2.howAreYou, [sir]);
}
if (/(what time|the time|time is it|current time)/.test(text)) {
const t = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
return f(window.OMNI_DATA2.timeReply, [t, sir]);
}
if (/(what('s| is) the date|what day is it|today('s| is) date|date today)/.test(text)) {
const d = new Date().toLocaleDateString([], { weekday: "long", day: "numeric", month: "long", year: "numeric" });
return f(window.OMNI_DATA2.dateReply, [d, sir]);
}
if (/(tell me )?(a )?joke|make me laugh|another one/.test(text)) {
return pick(window.OMNI_DATA.jokes);
}
if (/(tell me )?(a )?fact|interesting fact|fun fact/.test(text)) {
return pick(window.OMNI_DATA.facts);
}
const math = text.match(/(?:what is|what's|calculate|compute|solve)\s*([\d\s]+)([+\-*x/])\s*([\d\s]+)/);
if (math) {
const a = parseFloat(math[1].replace(/\s/g, ""));
const b = parseFloat(math[3].replace(/\s/g, ""));
const op = math[2] === "x" ? "*" : math[2];
if (!isNaN(a) && !isNaN(b) && (op !== "/" || b !== 0)) {
let r;
try { r = Function(`"use strict"; return (${a} ${op} ${b});`)(); } catch { r = null; }
if (r !== null && isFinite(r)) {
return f(window.OMNI_DATA2.mathOk, [a, math[2], b, Math.round(r * 1000) / 1000, sir]);
}
}
return f(window.OMNI_DATA2.mathFail, []);
}
const open = text.match(/open (youtube|google|gmail|github|maps|netflix|spotify|twitter|instagram)/);
if (open) {
const sites = window.OMNI_DATA.sites;
window.open(sites[open[1]], "_blank");
return f(window.OMNI_DATA2.open, [open[1], sir]);
}
const city = text.match(/weather\s*(?:in|at|for)?\s*([a-z\s]+)/);
if (city && city[1].trim().length > 1 && !/(today|now|like)/.test(city[1])) {
const place = city[1].trim().split(/\s+/)[0];
try {
const geo = await fetch(
`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(place)}&count=1&language=en`
).then((r) => r.json());
const spot = geo.results && geo.results[0];
if (!spot) return f(window.OMNI_DATA2.wNotFound, [sir, place]);
const w = await fetch(
`https://api.open-meteo.com/v1/forecast?latitude=${spot.latitude}&longitude=${spot.longitude}&current_weather=true`
).then((r) => r.json());
const c = w.current_weather;
const temp = Math.round(c.temperature);
const desc = window.OMNI_DATA.weatherText(c.weathercode);
return f(window.OMNI_DATA2.wOk, [spot.name, temp, desc]);
} catch {
return f(window.OMNI_DATA2.wFail, [sir]);
}
}
if (/(tell me )?(a )?story|story time/.test(text)) {
return window.OMNI_DATA.lines.story;
}
const myName = text.match(/(?:my name is|call me|i am|i'm)\s+([a-z]{2,20})/);
if (myName && !/(ai|robot|omni|iron man)/.test(myName[1])) {
window.__omniName = myName[1][0].toUpperCase() + myName[1].slice(1);
return f(window.OMNI_DATA2.nameSaved, [window.__omniName]);
}
if (/(what('s| is) my name|do you know my name|remember my name)/.test(text)) {
return window.__omniName
? f(window.OMNI_DATA2.nameKnown, [window.__omniName])
: f(window.OMNI_DATA2.nameUnknown, [sir]);
}
if (/(open the pod bay doors|pod bay)/.test(text)) {
return f(window.OMNI_DATA2.podBay, [sir]);
}
if (/(i love you|love you|marry me)/.test(text)) {
return f(window.OMNI_DATA.lines.love, [sir]);
}
if (/(who made you|who built you|who created you|your creator|who's your boss)/.test(text)) {
return f(window.OMNI_DATA2.maker, [name]);
}
if (/^(help|what can you do|commands|menu|list)/.test(text)) {
return window.OMNI_DATA.lines.help;
}
if (/(thank you|thanks|thx|cheers|much appreciated)/.test(text)) {
return f(window.OMNI_DATA2.thanks, [sir]);
}
if (/(bye|goodbye|good night|see you|good night|shutdown|power down|goodnight)/.test(text)) {
return f(window.OMNI_DATA2.bye, [sir]);
}
return f(window.OMNI_DATA2.fallback, [sir]);
}
window.omniRespond = omniRespond;
