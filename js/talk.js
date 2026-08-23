(function () {
"use strict";
const chatEl = document.getElementById("chat");
const formEl = document.getElementById("chat-form");
const inputEl = document.getElementById("chat-input");
const micBtn = document.getElementById("mic-btn");
const statusEl = document.getElementById("status");
const voiceToggle = document.getElementById("voice-status");
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let speechOn = true;
let listening = false;
let busy = false;
function setStatus(text, cls) {
statusEl.innerHTML = `<span class="${cls || "ok"}">${text}</span>`;
}
function addMessage(role, text) {
const wrap = document.createElement("div");
wrap.className = "msg " + role;
if (role === "omni") {
const av = document.createElement("div");
av.className = "avatar";
wrap.appendChild(av);
}
const bubble = document.createElement("div");
bubble.className = "bubble";
bubble.textContent = text;
wrap.appendChild(bubble);
chatEl.appendChild(wrap);
chatEl.scrollTop = chatEl.scrollHeight;
return bubble;
}
function typeText(el, text) {
const speed = text.length > 160 ? 6 : 12; 
let i = 0;
return new Promise((resolve) => {
(function step() {
i += 1;
el.textContent = text.slice(0, i);
chatEl.scrollTop = chatEl.scrollHeight;
if (i < text.length) setTimeout(step, speed);
else resolve();
})();
});
}
function typingIndicator() {
const wrap = document.createElement("div");
wrap.className = "msg omni";
const av = document.createElement("div");
av.className = "avatar";
const bubble = document.createElement("div");
bubble.className = "bubble";
bubble.innerHTML = '<span class="typing"><span></span><span></span><span></span></span>';
wrap.appendChild(av);
wrap.appendChild(bubble);
chatEl.appendChild(wrap);
chatEl.scrollTop = chatEl.scrollHeight;
return wrap;
}
function speak(text, bubbleEl) {
if (!speechOn || !("speechSynthesis" in window)) return;
window.speechSynthesis.cancel();
const u = new SpeechSynthesisUtterance(text.replace(/\n/g, " "));
u.rate = 1.02;
u.pitch = 0.72; 
const voices = window.speechSynthesis.getVoices();
const v =
voices.find((v) => /google uk english male/i.test(v.name)) ||
voices.find((v) => /daniel|george|arthur/i.test(v.name)) ||
voices.find((v) => v.lang === "en-GB");
if (v) u.voice = v;
u.onstart = () => { if (bubbleEl) bubbleEl.parentElement.classList.add("speaking"); };
u.onend = () => { if (bubbleEl) bubbleEl.parentElement.classList.remove("speaking"); };
window.speechSynthesis.speak(u);
}
async function sendMessage(text) {
text = text.trim();
if (!text || busy) return;
busy = true;
setStatus("Processing…");
inputEl.value = "";
addMessage("user", text);
const typing = typingIndicator();
const reply = await omniRespond(text);
typing.remove();
const bubble = addMessage("omni", "");
await typeText(bubble, reply);
speak(reply, bubble);
busy = false;
setStatus("Standing by");
}
formEl.addEventListener("submit", (e) => {
e.preventDefault();
sendMessage(inputEl.value);
});
function setupRecognition() {
if (!SpeechRecognition) {
micBtn.disabled = true;
micBtn.title = "Speech input needs Chrome or Edge";
setStatus("Speech input not supported here — type instead", "warn");
return;
}
const rec = new SpeechRecognition();
rec.lang = "en-US";
rec.interimResults = true;
rec.continuous = false;
rec.maxAlternatives = 1;
rec.onstart = () => {
listening = true;
micBtn.classList.add("listening");
setStatus("Listening…");
};
rec.onend = () => {
listening = false;
micBtn.classList.remove("listening");
if (!busy) setStatus("Standing by");
};
rec.onerror = (e) => {
micBtn.classList.remove("listening");
if (e.error === "not-allowed" || e.error === "service-not-allowed") {
setStatus("Microphone blocked — allow access, or type instead", "err");
} else if (e.error === "no-speech") {
setStatus("I didn't hear anything — try again", "warn");
} else {
setStatus("Speech hiccup — try again", "warn");
}
};
rec.onresult = (e) => {
let transcript = "";
for (const res of e.results) transcript += res[0].transcript;
inputEl.value = transcript;
if (e.results[0].isFinal) {
sendMessage(transcript);
}
};
micBtn.addEventListener("click", () => {
if (listening) { rec.stop(); return; }
try { rec.start(); } catch {  }
});
}
voiceToggle.addEventListener("click", () => {
speechOn = !speechOn;
voiceToggle.classList.toggle("off", !speechOn);
if (!speechOn) window.speechSynthesis && window.speechSynthesis.cancel();
});
setupRecognition();
sendMessage("Hello");
})();
