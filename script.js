// --- DATABASE: Suspects & Questions ---
const suspectsData = [
    {
        name: "Julia", role: "Head Maid of the house", chars: "Royal, quiet, observant",
        speech: "I have worked in this place for over twenty years. That night, I went back to my room at 9 PM as usual. I heard footsteps near the garden around midnight, but I thought it was the cat. Lord Judas has a grey Persian and it often wanders at night.<br><br>Next day, I went inside Lord Judas's family bedrooms to wake all of them. Why I can get into their rooms? Ah, every staff in this house has accessed keys for every room. My Lord and his daughter were already downstairs, but she did not come down to breakfast. I found that unusual, because she had never missed a meal. As for the gardener, I noticed his light was still on. His cottage was outside near the garden entrance, and I could see it from the house's window. I asked Lord Judas whether I should tell that man to go outside and work or not, but my Lord refused it. Frankly, I wanted to tell my Lord that I saw him walked out Ann's room. However, I am just a maid. So, I remained silent.<br>That is all I have to say.",
        questions: [
            { q: `"..., but I thought it was the cat." "it" in this line refers to …`, options: ["A. footsteps", "B. the cat", "C. the garden"], ans: "A. footsteps" },
            { q: `"..., but she did not come down to breakfast." "she" in this line refers to …`, options: ["A. Julia", "B. Lilly", "C. Ann"], ans: "C. Ann" },
            { q: `"Frankly, I wanted to tell my Lord that I saw him walked out Ann's room..." "him" in this line refers to …`, options: ["A. the cottage", "B. Lord Judas", "C. Lucas"], ans: "C. Lucas" }
        ]
    },
    {
        name: "Ann", role: "Lilly's Stepmother", chars: "Arrogant, beautiful, determine",
        speech: "Yesterday? I was in my room the entire evening and did not join the dinner. My husband and I had an argument, so I quietly drank wine and cried alone. Around 10 p.m., I went to the kitchen to washed my wine glasses before going to bed. I did not hear anything. Actually, this house is always making strange sounds at night.<br><br>The diamond? Honestly, I never understood why he kept it out in the first place. It should have been locked away in a bank. I told him so many times, but he never listens . He is always reckless with anything valuable. Every staff, including the maid and the gardener, knows where the diamond is. Especially the one who works for a long time. She is the ONLY one who has all keys in this house and knows which place she can hide it after stealing. Instead of wasting time questioning me, go ask that arrogant maid about what she had done last night.",
        questions: [
            { q: `"My husband and I had an argument,..." "My husband" in this line refers to...`, options: ["A. Lucas", "B. Lord Judas", "C. Julia"], ans: "B. Lord Judas" },
            { q: `"Honestly, I never understood why he kept it out..." "it" in this line refers to...`, options: ["A. the maid", "B. the diamond", "C. the bank"], ans: "B. the diamond" },
            { q: `"Especially the one who works for a long time..." "the one" in this line refers to...`, options: ["A. Lilly", "B. Ann", "C. Julia"], ans: "C. Julia" }
        ]
    },
    {
        name: "Lilly", role: "Lucas's Daughter", chars: "Optimistic, generous, shy",
        speech: "Um, hi... I mean, I still can't really believe it happened. That diamond is a very important thing for my family. Dad always tells me to take care of it.<br><br>That night, I was reading books in the library until about 10.30. Then, I went to the kitchen to make hot tea because it helps me feel cozy. When I got there, the light was already on. I thought that Julia forgot to turn it off. Frankly speaking, I wasn't afraid of ghosts, so I made my tea and went back to my room. Ah… Before I got into my room, I heard a man voice from Ann's room. It was not my father, but it kinda… familiar? I didn't think it is the gardener because he mostly worked in the garden and never came inside our house. They sounded seriously. Or maybe excited? I’m not really sure. Her voice was low, so I couldn’t hear anything properly. I didn’t stay there because that would be rude. So, I just went on to bed after that. I honestly didn’t think it meant anything.",
        questions: [
            { q: `"... because it helps me feel cozy." "it" in this line refers to...`, options: ["A. the diamond", "B. the books", "C. the hot tea"], ans: "C. the hot tea" },
            { q: `"When I got there, the light was already on." "there" in this line refers to...`, options: ["A. the library", "B. the kitchen", "C. Lilly's room"], ans: "B. the kitchen" },
            { q: `"Her voice was low,..." "Her" in this line refers to...`, options: ["A. Lilly", "B. Ann", "C. Julia"], ans: "B. Ann" }
        ]
    },
    {
        name: "Lucas", role: "Gardener of the house", chars: "Serious, determined, hardworking",
        speech: "Yesterday, I came back to my cottage around 6.15 in the evening. I had dinner alone. After that, I decided to took a shower, put on my boots, and walked to the garden to water flowers. Yes, that is part of my responsibility. Around 8 P.M., I locked the garden's entrance before going to bed.<br><br>Oh! I think the alarm panel is broken. Its old sensor sometimes takes a moment to settle after the kitchen lights are switched on. I remember glancing at the window and saw the kitchen's light around 10 p.m. Nothing unusual enough to report. I am only trying to be precise.<br><br>I've worked here for two years. I respect Lord Judas and his family. I have been served these people for ten years. Even though Ann is my new mistress, I still adore and respect her. I swear I would never do anything to harm them. The diamond is a loss for all of us. I hope the police find it soon.",
        questions: [
            { q: `"Yes, that is part of my responsibility. " "that" in this line refers to...`, options: ["A. watering flowers", "B. walking to the garden", "C. going to bed"], ans: "A. watering flowers" },
            { q: `"Its old sensor sometimes takes a moment..." "its" in this line refers to...`, options: ["A. the kitchen lights", "B. the alarm panel", "C. the garden's entrance"], ans: "B. the alarm panel" },
            { q: `"I swear I would never do anything to harm them." "them" in this line refers to...`, options: ["A. The new mistress", "B. Ann and Lilly", "C. Lord Judas and his family"], ans: "C. Lord Judas and his family" }
        ]
    }
];

const GAS_URL = "https://script.google.com/macros/s/AKfycbzFaATyqxzmZ6PGrsaBX2xgT3Cce97GChuFNXGW_V5b4uTLTnuUjWWzBG5LpDyxZb7F0g/exec";

// --- STATE MANAGEMENT ---
let game = {
    team: "", players: [], avatar: "", totalScore: 0,
    mainTime: 420, voteTime: 420, timeUsed: 0,
    mainInterval: null, readInterval: null, voteInterval: null,
    currentPlayerIndex: null, currentQuestionIndex: 0,
    votedCulprit: ""
};

// --- DOM ELEMENTS ---
const screens = {
    lobby: document.getElementById('screen-lobby'),
    intro: document.getElementById('screen-intro'),
    hub: document.getElementById('screen-hub'),
    reading: document.getElementById('screen-reading'),
    questions: document.getElementById('screen-questions'),
    voting: document.getElementById('screen-voting'),
    result: document.getElementById('screen-result')
};

// --- INIT LOBBY ---
document.getElementById('btn-enter').addEventListener('click', () => {
    const tName = document.getElementById('team-name').value.trim();
    const p1 = document.getElementById('p1-name').value.trim();
    const p2 = document.getElementById('p2-name').value.trim();
    const p3 = document.getElementById('p3-name').value.trim();
    const p4 = document.getElementById('p4-name').value.trim();

    if(!tName || !p1 || !p2 || !p3 || !p4) {
        document.getElementById('error-msg').classList.remove('hidden');
        return;
    }
    
    game.team = tName;
    game.avatar = document.querySelector('input[name="avatar"]:checked').value;
    game.players = [
        { name: p1, suspect: suspectsData[0], status: 'Pending' },
        { name: p2, suspect: suspectsData[1], status: 'Pending' },
        { name: p3, suspect: suspectsData[2], status: 'Pending' },
        { name: p4, suspect: suspectsData[3], status: 'Pending' }
    ];

    switchScreen('intro');
});

document.getElementById('btn-start-inv').addEventListener('click', () => {
    switchScreen('hub');
    renderHub();
    startMainTimer();
});

// --- CORE FUNCTIONS ---
function switchScreen(id) {
    Object.values(screens).forEach(s => s.classList.remove('active'));
    screens[id].classList.add('active');
}

function renderHub() {
    document.getElementById('hub-team-name').textContent = `${game.team} ${game.avatar}`;
    const hubGrid = document.getElementById('suspect-hubs');
    hubGrid.innerHTML = '';
    
    let allDone = true;

    game.players.forEach((p, index) => {
        const card = document.createElement('div');
        card.className = `hub-card ${p.status === 'Done' ? 'done' : ''}`;
        card.innerHTML = `
            <h4>${p.name}</h4>
            <p>Target: <strong>${p.suspect.name}</strong></p>
            <span class="status-badge">${p.status}</span>
        `;
        if (p.status !== 'Done') {
            allDone = false;
            card.onclick = () => startReadingPhase(index);
        }
        hubGrid.appendChild(card);
    });

    if (allDone) {
        clearInterval(game.mainInterval);
        switchScreen('voting');
        startVotingTimer();
    }
}

// --- TIMERS ---
function formatTime(seconds) {
    let m = Math.floor(seconds / 60);
    let s = seconds % 60;
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
}

function startMainTimer() {
    game.mainInterval = setInterval(() => {
        game.mainTime--;
        game.timeUsed++;
        document.getElementById('main-timer').textContent = formatTime(game.mainTime);
        if(game.mainTime <= 0) {
            clearInterval(game.mainInterval);
            switchScreen('voting');
            startVotingTimer();
        }
    }, 1000);
}

// --- READING PHASE ---
function startReadingPhase(pIndex) {
    game.currentPlayerIndex = pIndex;
    const player = game.players[pIndex];
    player.status = 'Reading';
    
    document.getElementById('read-suspect-name').textContent = `File: ${player.suspect.name}`;
    document.getElementById('read-status').textContent = player.suspect.role;
    document.getElementById('read-chars').textContent = player.suspect.chars;
    document.getElementById('read-speech').innerHTML = `"${player.suspect.speech}"`;
    
    switchScreen('reading');
    
    let readTime = 60;
    document.getElementById('read-timer').textContent = formatTime(readTime);
    
    game.readInterval = setInterval(() => {
        readTime--;
        document.getElementById('read-timer').textContent = formatTime(readTime);
        if(readTime <= 0) {
            clearInterval(game.readInterval);
            startQuestionsPhase();
        }
    }, 1000);
}

document.getElementById('btn-skip-read').onclick = () => {
    clearInterval(game.readInterval);
    startQuestionsPhase();
};

// --- QUESTIONS PHASE ---
function startQuestionsPhase() {
    game.currentQuestionIndex = 0;
    switchScreen('questions');
    renderQuestion();
}

function renderQuestion() {
    const player = game.players[game.currentPlayerIndex];
    const qData = player.suspect.questions[game.currentQuestionIndex];
    
    document.getElementById('q-title').textContent = `Interrogation: Question ${game.currentQuestionIndex + 1}/3`;
    document.getElementById('q-text').textContent = qData.q;
    
    const optionsGrid = document.getElementById('q-options');
    optionsGrid.innerHTML = '';
    
    qData.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = opt;
        btn.onclick = () => handleAnswer(opt, qData.ans);
        optionsGrid.appendChild(btn);
    });
}

function handleAnswer(selected, correct) {
    if(selected === correct) game.totalScore++;
    
    game.currentQuestionIndex++;
    if(game.currentQuestionIndex < 3) {
        renderQuestion();
    } else {
        game.players[game.currentPlayerIndex].status = 'Done';
        switchScreen('hub');
        renderHub();
    }
}

// --- VOTING PHASE ---
function startVotingTimer() {
    game.voteInterval = setInterval(() => {
        game.voteTime--;
        game.timeUsed++;
        document.getElementById('vote-timer').textContent = formatTime(game.voteTime);
        if(game.voteTime <= 0) {
            clearInterval(game.voteInterval);
            submitFinalCase();
        }
    }, 1000);
}

document.querySelectorAll('.vote-card').forEach(card => {
    card.addEventListener('click', () => {
        document.querySelectorAll('.vote-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        game.votedCulprit = card.getAttribute('data-suspect');
        document.getElementById('btn-submit-case').classList.remove('disabled');
        document.getElementById('btn-submit-case').removeAttribute('disabled');
    });
});

document.getElementById('btn-submit-case').onclick = () => {
    clearInterval(game.voteInterval);
    submitFinalCase();
};

// --- SUBMIT TO GAS ---
function submitFinalCase() {
    switchScreen('result');
    document.getElementById('res-team').textContent = `${game.team} ${game.avatar}`;
    document.getElementById('res-score').textContent = game.totalScore;
    document.getElementById('res-culprit').textContent = game.votedCulprit || "No one (Time Out)";

    const payload = JSON.stringify({
        groupName: game.team,
        players: game.players.map(p => p.name).join(', '),
        avatar: game.avatar,
        score: game.totalScore,
        timeUsed: game.timeUsed,
        votedCulprit: game.votedCulprit || "None"
    });

    fetch(GAS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: payload
    })
    .then(() => {
        const msg = document.getElementById('loading-status');
        msg.textContent = "Data securely transmitted to headquarters!";
        msg.style.color = "#22c55e";
    })
    .catch(() => {
        const msg = document.getElementById('loading-status');
        msg.textContent = "Error transmitting data. Please screenshot this page for your teacher.";
        msg.style.color = "#ef4444";
    });
}
