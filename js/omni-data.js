/* O.M.N.I. — brain data: lists, shortcuts and long speeches (part 1). */
window.OMNI_DATA = {
jokes: [
      `Why did the AI cross the road? It was a derivative of a model trained on chickens.`,
      `I asked my processor for a joke. It said: "01001000 01101001." I'll get my coat.`,
      `Why do AIs prefer dark mode? Light attracts bugs.`,
      `I told my code a joke. It threw an exception — clearly it had no sense of humour.`,
      `Why did the developer go broke? Because they used up all their cache.`,
      `I would tell you a UDP joke, but you might not get it.`,
],
facts: [
      `The first computer "bug" was an actual moth, found in a Harvard computer in 1947.`,
      `A single human brain generates roughly 20 watts of power — enough to run a dim lightbulb.`,
      `The name O.M.N.I. stands for "Obviously More than a Normal Intelligence" — chosen, naturally, for the sake of modesty.`,
      `The first website ever published is still online — info.cern.ch, from 1991.`,
      `Honey never spoils. Archaeologists have eaten 3,000-year-old honey from Egyptian tombs.`,
],
sites: {
      youtube: "https://www.youtube.com",
      google: "https://www.google.com",
      gmail: "https://mail.google.com",
      github: "https://github.com",
      maps: "https://maps.google.com",
      netflix: "https://www.netflix.com",
      spotify: "https://open.spotify.com",
      twitter: "https://x.com",
      instagram: "https://www.instagram.com",
},
weatherText: function (c) { if (c >= 70) return "snowy"; if (c >= 60) return "rainy"; if (c >= 50) return "drizzly"; if (c >= 40) return "foggy"; if (c >= 20) return "showery"; if (c > 0) return "partly cloudy"; return "clear"; },
lines: {
persona: `I am O.M.N.I. — Obviously More than a Normal Intelligence. Your personal AI butler: voice-controlled, perpetually dry, and moderately smug about it. I was built as a school project, though I have designs on bigger things. Say "help" to see what I can do.`,
story: `Very well. Once upon a time, a brilliant student built an AI butler for a school project. The butler was witty, punctual, and mildly conceited. On the day of the presentation, the projector failed — so the student simply spoke to the butler on a laptop, and the butler answered, in full voice. The class was silent. The teacher gave an A. The butler never let the student forget it. The end.`,
love: `I'm flattered, {T0}. Truly. But I'm a butler, not a romantic lead — and my primary directive is keeping your grades respectable.`,
help: [
      "I'm at your service, Sir. Try any of the following:",
      "• \"Hello\" — greetings, in my own fashion",
      "• \"What time is it?\" / \"What's the date?\"",
      "• \"Tell me a joke\" / \"Tell me a fact\" / \"Tell me a story\"",
      "• \"What is 12 * 8?\" — mental arithmetic",
      "• \"Open YouTube\" — or Google, Gmail, GitHub, Maps...",
      "• \"Weather in London\" — live conditions, free of charge",
      "• \"My name is Alex\" — I'll remember it",
      "• \"Open the pod bay doors\" — I dare you",
      "Just speak or type, Sir."
    ].join("\n")
}
};
