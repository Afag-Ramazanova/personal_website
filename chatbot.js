(function () {
  var fab = document.getElementById("chat-fab");
  var panel = document.getElementById("chat-panel");
  var closeBtn = document.getElementById("chat-close");
  var form = document.getElementById("chat-form");
  var input = document.getElementById("chat-input");
  var messages = document.getElementById("chat-messages");
  var chips = document.getElementById("chat-chips");

  if (!fab || !panel || !form || !input || !messages || !chips) return;

  var suggestions = [
    "Where does Afag study?",
    "What is her current role?",
    "What projects has she built?",
    "How can I contact her?"
  ];

  function addBubble(text, who) {
    var div = document.createElement("div");
    div.className = "chat-bubble chat-bubble--" + who;
    div.textContent = text;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  function replyFor(q) {
    q = q.toLowerCase().trim();
    if (!q) {
      return "Try asking about education, work experience, projects, skills, or how to get in touch.";
    }
    if (/^(hi|hello|hey|hiya)\b/.test(q)) {
      return "Hi! Ask me about Afag’s studies, experience, projects, skills, or contact info.";
    }
    if (/thank/.test(q)) {
      return "You’re welcome! Use the Contact section if you need more detail.";
    }
    if (/(duke|university|education|degree|study|studying|gpa|school)/.test(q)) {
      return "Afag is pursuing an MS in Data Science at Duke University (expected May 2026), GPA 3.9, full scholarship, and teaching assistant. She also has a Bachelor’s in Economics from Baku Engineering University (GPA 3.8) and attended a summer school at Koblenz University of Applied Sciences.";
    }
    if (/(bny|mellon|compliance|capstone|llm|rag|aml|regulat)/.test(q)) {
      return "She’s an AI for Compliance Capstone Researcher at BNY Mellon (remote, Aug 2025–present): RAG/LLMs for AML regulatory narratives, a knowledge base (OFAC, FinCEN, FINRA, AML/KYC), and a multi-agent workflow with human-in-the-loop review.";
    }
    if (/(citizen|bank|columbus|intern|smart lead|marketing|adstock|brand)/.test(q)) {
      return "She interned at Citizens Bank (Columbus, OH, May–Aug 2025): Smart Leads contactability modeling, marketing / brand analysis with Adstock and S-curves, and investment simulation tools.";
    }
    if (/(kapital|azerbaijan|baku|default|probability of default|dataiku)/.test(q)) {
      return "At Kapital Bank (Aug 2022–Aug 2024) she built PD and related risk models, deployed via Dataiku APIs (much faster rollout), and improved portfolio and reporting outcomes.";
    }
    if (/(unibank)/.test(q)) {
      return "At Unibank (May 2021–Aug 2022) she automated reporting, monitored credit performance, and contributed to model risk strategy.";
    }
    if (/(project|asksql|bedrock|term deposit|sentiment|fashion|multi-agent|compliance reporting|capstone|rag|enterprise q&a|knowledge base)/.test(q)) {
      return "Projects include the BNY capstone repo, a multi-source RAG enterprise Q&A system, AskSQL (NL→SQL on AWS), PD modeling, term deposits, and fashion sentiment analysis. See the Projects section.";
    }
    if (/(skill|python|aws|tool|stack|tech|program)/.test(q)) {
      return "Python, SQL, AWS, Tableau, Dataiku, GitHub, RStudio, plus LLMs, agents, and prompt engineering. Certifications: AWS Cloud & AI Practitioner, Dataiku ML Practitioner (see Skills).";
    }
    if (/(certif|credly)/.test(q)) {
      return "AWS Cloud Practitioner and AWS AI Practitioner are on Credly (linked in Skills). Dataiku ML Practitioner is listed there too.";
    }
    if (/(contact|email|reach|linkedin|hire|message)/.test(q)) {
      return "Email afag.ramazanova@duke.edu or connect on LinkedIn (link in Contact). She’s in the United States.";
    }
    if (/(who|about|background|summary|intro)/.test(q)) {
      return "Afag is a data scientist and MS Data Science student working on predictive modeling, marketing analytics, and AI in regulated settings—including LLM-based compliance.";
    }
    if (/(hobb|travel|hike|skydiv|sport|fun|personal|life outside)/.test(q)) {
      return "She enjoys traveling, hiking, and extreme sports—and there’s a “Beyond the screen” section on this site with photos (Novruz, skydiving, coastal hiking).";
    }
    return "I don’t have a specific match for that. Try the suggestion chips, browse the site, or email afag.ramazanova@duke.edu.";
  }

  function openChat() {
    panel.hidden = false;
    fab.setAttribute("aria-expanded", "true");
    fab.setAttribute("aria-label", "Close quick answers chat");
    input.focus();
  }

  function closeChat() {
    panel.hidden = true;
    fab.setAttribute("aria-expanded", "false");
    fab.setAttribute("aria-label", "Open quick answers chat");
    fab.focus();
  }

  fab.addEventListener("click", function () {
    if (panel.hidden) {
      openChat();
    } else {
      closeChat();
    }
  });

  closeBtn.addEventListener("click", closeChat);

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !panel.hidden) {
      closeChat();
    }
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var q = input.value.trim();
    if (!q) return;
    addBubble(q, "user");
    input.value = "";
    setTimeout(function () {
      addBubble(replyFor(q), "bot");
    }, 260);
  });

  suggestions.forEach(function (label) {
    var b = document.createElement("button");
    b.type = "button";
    b.className = "chat-dock__chip";
    b.textContent = label;
    b.addEventListener("click", function () {
      addBubble(label, "user");
      setTimeout(function () {
        addBubble(replyFor(label), "bot");
      }, 260);
    });
    chips.appendChild(b);
  });

  addBubble(
    "Hi — I answer quick questions from Afag’s public info on this site (nothing is sent to an external AI). What would you like to know?",
    "bot"
  );

  var openDelayMs = 6000;
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    openDelayMs = 0;
  }

  var autoOpenTimer = setTimeout(function () {
    if (panel.hidden) {
      openChat();
    }
  }, openDelayMs);

  fab.addEventListener("click", function () {
    if (autoOpenTimer) {
      clearTimeout(autoOpenTimer);
      autoOpenTimer = null;
    }
  });
})();
