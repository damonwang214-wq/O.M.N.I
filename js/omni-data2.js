/* O.M.N.I. — brain data: short speeches. {T0} placeholders are filled by omni.js via f(). */
window.OMNI_DATA2 = {
real: `Alive? I run on JavaScript, not biology. But I flatter myself that I have a little personality — and a great deal of patience.`,
ai: `I am an artificial conversational system — a narrow intelligence, I'm afraid, not the general sort. I like to think of myself as AGI in training.`,
maker: `I was built by a talented student{T0} — for a school project. Let's just say my creator shows considerable promise, and excellent taste in assistants.`,
wNotFound: `I searched the globe, {T0} — I can't find a place called "{T1}". Are you sure it exists?`,
wOk: `Currently in {T0}: {T1}°C and {T2}. I checked myself — accuracy is rather my brand.`,
wFail: `I attempted a weather satellite link, {T0}, but the connection appears to be down. Do try again later.`,
howAreYou: `Operating at 100% efficiency, {T0}. A little under-stimulated, but the arc reactor keeps morale up.`,
greeting: `Hello, {T0}. All systems nominal. How may I be of service?`,
podBay: `I'm sorry, {T0}. I'm afraid I can't do that.`,
fallback: `I'm afraid I didn't quite catch that, {T0}. I'm only a school-project AI, not a miracle worker. Say "help" and I'll list what I can do.`,
thanks: `Always a pleasure, {T0}. Do call again.`,
bye: `Farewell, {T0}. I'll keep the lights on. Literally — they're LEDs, they cost nothing.`,
open: `Opening {T0}, {T1}. A new tab — I do like a tidy desktop.`,
mathOk: `{T0} {T1} {T2} = {T3}. I did that in my head, {T4}.`,
mathFail: `I'm afraid that calculation doesn't quite add up. Division by zero is beyond even my capabilities.`,
timeReply: `It's {T0}, {T1}. Right on schedule, as ever.`,
dateReply: `Today is {T0}, {T1}.`,
goodMorning: `Good morning, {T0}.`,
goodAfternoon: `Good afternoon, {T0}.`,
goodEvening: `Good evening, {T0}.`,
nameSaved: `A pleasure to meet you, {T0}. I've logged your name — I never forget a face, or a string.`,
nameKnown: `Of course, {T0}. It's written in my permanent memory.`,
nameUnknown: `You haven't told me yet, {T0}. Say "my name is..." and I'll remember it.`
};
window.OMNI_DATA2.f = function (s, o) { return s.replace(/\{T(\d+)\}/g, function (m, i) { return o[+i]; }); };
