// NaipunyaEngine - Master State Machine for Advaya FM Training
// States: SELECT -> STORY -> THEORY -> XR -> QUIZ -> COMPLETE

const MODULE_META = [
    { id:1, title:'Foundations & Grooming', icon:'\u{1F454}', xrLoader:'loadXR_M1' },
    { id:2, title:'Digital Navigation', icon:'\u{1F4F1}', xrLoader:'loadXR_M2' },
    { id:3, title:'Elite Conduct & POSH', icon:'\u{1F6E1}', xrLoader:'loadXR_M3' },
    { id:4, title:'Vehicle Inspection', icon:'\u{1F697}', xrLoader:'loadXR_M4' },
    { id:5, title:'Defensive Driving I', icon:'\u{26A0}', xrLoader:'loadXR_M5' },
    { id:6, title:'City Mastery', icon:'\u{1F3D9}', xrLoader:'loadXR_M6' },
    { id:7, title:'Night & Weather Ops', icon:'\u{1F319}', xrLoader:'loadXR_M7' },
    { id:8, title:'Emergency Response', icon:'\u{1F6D1}', xrLoader:'loadXR_M8' }
];

const DIALOGUES = [
    { module:1, intro:"Namaste bhaiya. D Advaya FM Elite family mein aapka swagat hai. Aaj se aap sirf ek driver nahi, ek 'Corporate Pilot' hain.", body_1:"Yaad rakhiye, MNC executives ke liye punctuality sabse zaroori hai. Jab aap waqt par hote hain, tab aap unka bharosa jeet-te hain.", body_2:"Gaadi ke andar ka mahol hamesha silent aur comfortable hona chahiye. Aapki pehchaan aapke kaam se hai.", closing:"Aapka din shubh ho, Pilot. Hamesha savdhan rahein." },
    { module:2, intro:"Namaste. Mobile app dushman nahi, dost hai. Aaj hum 'Gulgul' interface ko samajhenge jo aapki kamayi aur rasta dono asaan banayega.", body_1:"Har trip se pehle app check karein. Sahi rasta chunne se fuel bachega aur passengers waqt par pahunchenge.", body_2:"Technology ka sahi istemal hi ek modern driver ko 'Elite Pilot' banata hai.", closing:"Digital baniye, aage badhiye." },
    { module:3, intro:"Bhaiya, izzat sabse badi daulat hai. D Advaya FM mein hum sabki dignity ki hifazat karte hain.", body_1:"Professional distance banaye rakhein. Agar aapko kuch bhi galat dikhe, toh 'Plan Hammer' ka istemal karein.", body_2:"Aapka vyavhar hi MNC clients mein humare standards ko define karta hai. Respect is non-negotiable.", closing:"Samman dein, samman payein." },
    { module:4, intro:"Gaadi ki hifazat, khud ki hifazat. Ek Elite Pilot apni machine ko hamesha fit rakhta hai.", body_1:"Rozana sirf 5 minute ka checkup aapko bade khatre se bachayega. Tire pressure aur oil level hamesha check karein.", body_2:"Brake pads aur fluid levels ki Vajra inspection zaroori hai. Aapki machine hi aapki livelihood hai.", closing:"Surakshit chalne ke liye taiyar rahein." },
    { module:5, intro:"Road par hamesha surprises hote hain. Savdhani hi aapka sabse bada insurance hai.", body_1:"Hazard detection ka matlab hai khatre ko pehle se pehchanna. Narrow lanes mein focus double rakhiye.", body_2:"Emergency braking tab asaan hoti hai jab aap control mein hon.", closing:"Soch samajh kar chalein, hamesha bachein." },
    { module:6, intro:"Bangalore traffic ek sabr ka imtihan hai. Lane discipline hi shehar ki raftaar hai.", body_1:"Bina matlab ke horn nahi, bina wajah lane change nahi. Mirrors ka sahi istemal aapko bheed mein alag banata hai.", body_2:"Indicators ka waqt par istemal karein. Dekhiye kaise ek professional traffic mein merge hota hai.", closing:"Sanyam rakhein, safar asaan banayein." },
    { module:7, intro:"Raat ke andhere mein aapki aankhein aur chamakni chahiye. Focus up, glare down.", body_1:"Baarish aur andhere mein glares se bachein. Anti-glare mirror ki settings hamesha sahi rakhein.", body_2:"Geeli sadkon par hydroplaning ka darr rehta hai. Raftar kam rakhein.", closing:"Raat ka safar, zimmedari ka safar." },
    { module:8, intro:"Mushkil waqt mein ghabrana nahi, lead karna hai. Aap ek Elite protector hain.", body_1:"Crisis mein passengers aapki taraf dekhte hain. Fire extinguisher ka sahi istemal aur emergency exits ki jankari lazmi hai.", body_2:"First aid aur fire safety mein hamesha lead karein. Aapki training hi logon ki jaan bacha sakti hai.", closing:"Aapka hausla hi sabki jeet hai. Jai Hind." }
];

const NaipunyaEngine = {
    currentModule: null,
    currentPhase: 'SELECT',
    storyPanel: 0,
    storyTimer: null,
    storyElapsed: 0,
    theorySeconds: 0,
    theoryTimer: null,
    quizAnswers: {},
    isPaused: false,
    pulseTimeout: null,
    lang: 'English',
    langMap: { 'English':'en-IN', 'Hindi':'hi-IN', 'Telugu':'te-IN' },

    // ============ INIT ============
    init() {
        this.renderLangBar();
        this.renderModuleGrid();
        this.setupVajraShield();
        // Preload TTS voices (voices load async on some browsers)
        if ('speechSynthesis' in window) {
            window.speechSynthesis.getVoices();
            window.speechSynthesis.onvoiceschanged = () => {
                window.speechSynthesis.getVoices();
            };
        }
    },

    postToFlutter(msg) {
        if (window.AdvayaEngine) window.AdvayaEngine.postMessage(msg);
        console.log('[Engine]', msg);
    },

    // ============ LANGUAGE ============
    renderLangBar() {
        const bar = document.getElementById('lang-bar');
        bar.innerHTML = ['English','Hindi','Telugu'].map(l =>
            `<button class="lang-btn ${l===this.lang?'active':''}" onclick="NaipunyaEngine.setLang('${l}')">${l.toUpperCase()}</button>`
        ).join('');
    },
    setLang(l) {
        this.lang = l;
        this.renderLangBar();
        this.renderModuleGrid();
    },

    // ============ MODULE GRID ============
    getProgress(mid) {
        try { return JSON.parse(localStorage.getItem('advaya_m' + mid)) || {}; } catch(e) { return {}; }
    },
    saveProgress(mid, data) {
        const existing = this.getProgress(mid);
        localStorage.setItem('advaya_m' + mid, JSON.stringify({...existing, ...data}));
    },
    isUnlocked(mid) {
        if (mid === 1) return true;
        const prev = this.getProgress(mid - 1);
        return !!prev.completedAt;
    },

    renderModuleGrid() {
        const grid = document.getElementById('module-grid');
        grid.innerHTML = MODULE_META.map(m => {
            const p = this.getProgress(m.id);
            const unlocked = this.isUnlocked(m.id);
            const completed = !!p.completedAt;
            const cls = completed ? 'completed' : (!unlocked ? 'locked' : '');
            const status = completed ? 'COMPLETED' : (!unlocked ? 'LOCKED' : 'AVAILABLE');
            const lockIcon = !unlocked ? '<span class="lock-icon">\u{1F512}</span>' : (completed ? '<span class="lock-icon">\u{2705}</span>' : '');
            return `<div class="module-card ${cls}" onclick="NaipunyaEngine.selectModule(${m.id})">
                ${lockIcon}
                <div class="m-num">M0${m.id}</div>
                <div class="m-title">${m.icon} ${m.title}</div>
                <div class="m-status">${status}</div>
            </div>`;
        }).join('');
    },

    selectModule(mid) {
        if (!this.isUnlocked(mid)) return;
        this.currentModule = mid;
        this.postToFlutter('MODULE_START:M' + mid);
        this.startStory();
    },

    // ============ VIEW MANAGEMENT ============
    showView(viewId) {
        ['view-select','view-story','view-theory','view-xr','view-quiz','view-complete'].forEach(id => {
            const el = document.getElementById(id);
            if (id === viewId) { el.style.display = 'flex'; el.classList.add('active'); }
            else { el.style.display = 'none'; el.classList.remove('active'); }
        });
    },

    goHome() {
        this.cleanup();
        this.currentPhase = 'SELECT';
        this.renderModuleGrid();
        this.showView('view-select');
        document.getElementById('header-timer').textContent = '';
        this.showPragatiForPhase('SELECT');
        this.setPragatiMessage('SELECT');
    },

    cleanup() {
        clearInterval(this.storyTimer);
        clearInterval(this.theoryTimer);
        clearTimeout(this.pulseTimeout);
        window.speechSynthesis.cancel();
        this.storyTimer = null;
        this.theoryTimer = null;
        const xrContainer = document.getElementById('xr-scene-container');
        xrContainer.innerHTML = '';
    },

    // ============ STORY PHASE (10 min) ============
    startStory() {
        this.currentPhase = 'STORY';
        this.storyPanel = 0;
        this.storyElapsed = 0;
        this.showView('view-story');
        this.renderStoryPanel();
        this.storyTimer = setInterval(() => {
            if (this.isPaused) return;
            this.storyElapsed++;
            const perPanel = 60; // 60s per panel = 10 min total
            const inPanel = this.storyElapsed % perPanel;
            document.getElementById('story-timer-fill').style.width = ((inPanel / perPanel) * 100) + '%';
            if (inPanel === 0 && this.storyElapsed > 0 && this.storyPanel < 9) {
                this.storyPanel++;
                this.renderStoryPanel();
            }
            // Vajra pulse at panels 3, 6, 9
            if (this.storyElapsed === 180 || this.storyElapsed === 360 || this.storyElapsed === 540) {
                this.triggerPulse();
            }
        }, 1000);
        this.showPragatiForPhase('STORY');
        this.setPragatiMessage('STORY_START');
        this.postToFlutter('PHASE_CHANGE:STORY:M' + this.currentModule);
    },

    renderStoryPanel() {
        const mid = this.currentModule;
        const panel = this.storyPanel;
        const imgPath = 'temp_storybooks/m' + mid + '_p' + (panel + 1) + '.webp';
        document.getElementById('story-image').src = imgPath;
        document.getElementById('story-progress').textContent = (panel + 1) + ' / 10';
        document.getElementById('story-timer-fill').style.width = '0%';

        // Dialogue mapping: panels 0-1=intro, 2-4=body_1, 5-7=body_2, 8-9=closing
        const d = DIALOGUES.find(x => x.module === mid);
        let text = d.intro;
        if (panel >= 2 && panel <= 4) text = d.body_1;
        else if (panel >= 5 && panel <= 7) text = d.body_2;
        else if (panel >= 8) text = d.closing;
        document.getElementById('story-dialogue-text').textContent = text;

        this.speak(text);
        document.getElementById('header-timer').textContent = 'STORY ' + (panel + 1) + '/10';

        // Update Pragati's contextual message
        if (panel >= 8) this.setPragatiMessage('STORY_END');
        else if (panel >= 4) this.setPragatiMessage('STORY_MID');
    },

    storyPrev() {
        if (this.storyPanel > 0) { this.storyPanel--; this.renderStoryPanel(); }
    },
    storyNext() {
        if (this.storyPanel < 9) {
            this.storyPanel++;
            this.renderStoryPanel();
        } else {
            clearInterval(this.storyTimer);
            this.startTheory();
        }
    },

    // ============ TTS ============
    speak(text) {
        if (!('speechSynthesis' in window)) return;
        try {
            window.speechSynthesis.cancel();
            const u = new SpeechSynthesisUtterance(text);
            u.lang = this.langMap[this.lang] || 'en-IN';
            u.rate = 0.95;
            u.volume = 1.0;
            u.pitch = 1.0;
            // Try to pick a voice matching the language
            const voices = window.speechSynthesis.getVoices();
            if (voices && voices.length) {
                const match = voices.find(v => v.lang.startsWith(u.lang.split('-')[0]));
                if (match) u.voice = match;
            }
            // Small delay helps on some mobile WebViews
            setTimeout(() => window.speechSynthesis.speak(u), 100);
        } catch(e) {
            console.log('TTS error:', e);
        }
    },

    // ============ THEORY PHASE (10 min) ============
    startTheory() {
        this.currentPhase = 'THEORY';
        this.theorySeconds = 0;
        this.showView('view-theory');
        const btn = document.getElementById('theory-next-btn');
        btn.disabled = true;

        // Render theory content
        const mid = this.currentModule;
        const theory = THEORY_DATA[mid];
        const container = document.getElementById('theory-content');
        if (!theory) {
            container.innerHTML = '<div class="theory-card"><h3>Content Loading...</h3><p>Theory content for this module is being prepared.</p></div>';
        } else {
            container.innerHTML = theory.sections.map(s =>
                `<div class="theory-card"><h3>${s.title}</h3><p>${s.content}</p>${s.points ? '<ul>' + s.points.map(p => '<li>' + p + '</li>').join('') + '</ul>' : ''}</div>`
            ).join('');
        }

        // Scroll to top
        container.scrollTop = 0;

        // 10-minute timer
        this.theoryTimer = setInterval(() => {
            if (this.isPaused) return;
            this.theorySeconds++;
            const rem = Math.max(0, 600 - this.theorySeconds);
            const m = Math.floor(rem / 60);
            const s = rem % 60;
            document.getElementById('theory-timer').textContent = m + ':' + String(s).padStart(2, '0');
            document.getElementById('header-timer').textContent = 'THEORY ' + m + ':' + String(s).padStart(2, '0');
            if (rem <= 0) {
                btn.disabled = false;
                btn.textContent = 'PROCEED TO SIMULATION';
                this.setPragatiMessage('THEORY_READY');
            }
        }, 1000);
        this.showPragatiForPhase('THEORY');
        this.setPragatiMessage('THEORY');
        this.postToFlutter('PHASE_CHANGE:THEORY:M' + this.currentModule);
    },

    theoryComplete() {
        clearInterval(this.theoryTimer);
        this.startXR();
    },

    // ============ XR PHASE (5 min) ============
    startXR() {
        this.currentPhase = 'XR';
        this.showView('view-xr');
        document.getElementById('header-timer').textContent = 'XR SIMULATION';

        const container = document.getElementById('xr-scene-container');
        container.innerHTML = '';

        // Create A-Frame scene
        const scene = document.createElement('a-scene');
        scene.setAttribute('embedded', '');
        scene.setAttribute('vr-mode-ui', 'enabled: false');
        scene.setAttribute('renderer', 'antialias: true');
        scene.style.width = '100%';
        scene.style.height = '100%';

        // Camera with cursor
        const cam = document.createElement('a-camera');
        cam.setAttribute('position', '0 1.6 0');
        const cursor = document.createElement('a-cursor');
        cursor.setAttribute('fuse', 'true');
        cursor.setAttribute('fuse-timeout', '1500');
        cursor.setAttribute('color', '#FFD700');
        cursor.setAttribute('raycaster', 'objects: .clickable');
        cam.appendChild(cursor);
        scene.appendChild(cam);

        // Sky
        const sky = document.createElement('a-sky');
        sky.setAttribute('color', '#1a1a2e');
        scene.appendChild(sky);

        // Ambient light
        const light = document.createElement('a-light');
        light.setAttribute('type', 'ambient');
        light.setAttribute('color', '#fff');
        light.setAttribute('intensity', '0.6');
        scene.appendChild(light);

        const dirLight = document.createElement('a-light');
        dirLight.setAttribute('type', 'directional');
        dirLight.setAttribute('position', '1 3 2');
        dirLight.setAttribute('intensity', '0.8');
        scene.appendChild(dirLight);

        // Module content container
        const content = document.createElement('a-entity');
        content.setAttribute('id', 'xr-content');
        scene.appendChild(content);

        container.appendChild(scene);

        // Load module-specific XR after scene is ready
        scene.addEventListener('loaded', () => {
            const loaders = {
                1: typeof loadXR_M1 === 'function' ? loadXR_M1 : null,
                2: typeof loadXR_M2 === 'function' ? loadXR_M2 : null,
                3: typeof loadXR_M3 === 'function' ? loadXR_M3 : null,
                4: typeof loadXR_M4 === 'function' ? loadXR_M4 : null,
                5: typeof loadXR_M5 === 'function' ? loadXR_M5 : null,
                6: typeof loadXR_M6 === 'function' ? loadXR_M6 : null,
                7: typeof loadXR_M7 === 'function' ? loadXR_M7 : null,
                8: typeof loadXR_M8 === 'function' ? loadXR_M8 : null
            };
            const loader = loaders[this.currentModule];
            if (loader) loader(scene, content, (result) => this.onXRComplete(result));
        });
        this.showPragatiForPhase('XR');
        this.setPragatiMessage('XR');
        this.postToFlutter('PHASE_CHANGE:XR:M' + this.currentModule);
    },

    onXRComplete(result) {
        document.getElementById('xr-status').textContent = result.passed ? 'SIMULATION PASSED' : 'SIMULATION FAILED';
        this.setPragatiMessage('XR_PASS');
        setTimeout(() => this.startQuiz(), 1500);
    },

    // ============ QUIZ PHASE (5 min) ============
    startQuiz() {
        this.currentPhase = 'QUIZ';
        this.quizAnswers = {};
        this.showView('view-quiz');
        document.getElementById('header-timer').textContent = 'ASSESSMENT';

        const mid = this.currentModule;
        const questions = QUIZ_DATA[mid] || [];
        const lang = this.lang;
        const container = document.getElementById('quiz-content');

        container.innerHTML = `<div class="quiz-header"><h2>Module ${mid} Assessment</h2><p>Answer all questions. You need 80% to pass.</p></div>` +
            questions.map((q, qi) =>
                `<div class="quiz-question" id="qq-${qi}">
                    <div class="q-num">QUESTION ${qi + 1}</div>
                    <div class="q-text">${q.q[lang] || q.q.English}</div>
                    ${q.options.map((o, oi) =>
                        `<button class="quiz-option" data-q="${qi}" data-o="${oi}" onclick="NaipunyaEngine.selectAnswer(${qi},${oi})">${o[lang] || o.English}</button>`
                    ).join('')}
                </div>`
            ).join('');

        document.getElementById('quiz-score').textContent = '0 / ' + questions.length + ' answered';
        document.getElementById('quiz-submit-btn').disabled = false;
        container.scrollTop = 0;
        this.showPragatiForPhase('QUIZ');
        this.setPragatiMessage('QUIZ');
        this.postToFlutter('PHASE_CHANGE:QUIZ:M' + this.currentModule);
    },

    selectAnswer(qi, oi) {
        this.quizAnswers[qi] = oi;
        // Visual update
        document.querySelectorAll(`[data-q="${qi}"]`).forEach(btn => btn.classList.remove('selected'));
        document.querySelector(`[data-q="${qi}"][data-o="${oi}"]`).classList.add('selected');
        const answered = Object.keys(this.quizAnswers).length;
        const total = (QUIZ_DATA[this.currentModule] || []).length;
        document.getElementById('quiz-score').textContent = answered + ' / ' + total + ' answered';
    },

    submitQuiz() {
        const mid = this.currentModule;
        const questions = QUIZ_DATA[mid] || [];
        let correct = 0;

        questions.forEach((q, qi) => {
            const userAnswer = this.quizAnswers[qi];
            const btns = document.querySelectorAll(`[data-q="${qi}"]`);
            btns.forEach(btn => {
                btn.style.pointerEvents = 'none';
                const oi = parseInt(btn.dataset.o);
                if (oi === q.correct) btn.classList.add('correct');
                if (userAnswer === oi && oi !== q.correct) btn.classList.add('wrong');
            });
            if (userAnswer === q.correct) correct++;
        });

        const score = Math.round((correct / questions.length) * 100);
        const passed = score >= 80;
        document.getElementById('quiz-score').textContent = `Score: ${score}% (${correct}/${questions.length})`;
        document.getElementById('quiz-submit-btn').disabled = true;

        this.postToFlutter(`QUIZ_RESULT:M${mid}:${score}:${passed ? 'PASS' : 'FAIL'}`);

        setTimeout(() => {
            if (passed) {
                this.setPragatiMessage('QUIZ_PASS');
                this.completeModule();
            } else {
                this.setPragatiMessage('QUIZ_FAIL');
                document.getElementById('quiz-score').textContent += ' - RETRY NEEDED (80% required)';
                document.getElementById('quiz-submit-btn').textContent = 'RETRY QUIZ';
                document.getElementById('quiz-submit-btn').disabled = false;
                document.getElementById('quiz-submit-btn').onclick = () => this.startQuiz();
            }
        }, 2000);
    },

    // ============ COMPLETION ============
    completeModule() {
        this.currentPhase = 'COMPLETE';
        const mid = this.currentModule;
        this.saveProgress(mid, { completedAt: new Date().toISOString() });
        this.showView('view-complete');
        document.getElementById('header-timer').textContent = '';

        const meta = MODULE_META.find(m => m.id === mid);
        document.getElementById('complete-title').textContent = meta.title + ' - COMPLETED!';
        document.getElementById('complete-msg').textContent = 'Congratulations, Pilot! You have mastered this module.';

        // Show next module button if available
        const nextBtn = document.getElementById('next-module-btn');
        if (mid < 8) {
            nextBtn.style.display = 'inline-block';
            nextBtn.textContent = 'START MODULE ' + (mid + 1);
        } else {
            nextBtn.style.display = 'none';
        }

        this.showPragatiForPhase('COMPLETE');
        this.setPragatiMessage('COMPLETE');
        this.postToFlutter('MODULE_COMPLETE:M' + mid);
        this.speak('Bahut badhiya, Pilot! Aapne yeh module safalta se pura kar liya.');
    },

    startNextModule() {
        const next = this.currentModule + 1;
        if (next <= 8) {
            this.cleanup();
            this.selectModule(next);
        }
    },

    // ============ VAJRA SHIELD (Tab Switch) ============
    setupVajraShield() {
        document.addEventListener('visibilitychange', () => {
            if (document.hidden && this.currentPhase !== 'SELECT') {
                this.isPaused = true;
                window.speechSynthesis.cancel();
                document.getElementById('vajra-shield').style.display = 'flex';
            }
        });
    },

    resumeFromShield() {
        document.getElementById('vajra-shield').style.display = 'none';
        this.isPaused = false;
    },

    // ============ PRAGATI ASSISTANT ============
    pragatiBubbleVisible: true,

    PRAGATI_MESSAGES: {
        SELECT: 'Namaste, Pilot! Main Pragati hoon, aapki personal career coach. Module select karein aur training shuru karein!',
        STORY_START: 'Chaliye, aaj ki training shuru karte hain! Har panel ko dhyan se dekhiye aur suniye.',
        STORY_MID: 'Bahut achha! Aage badhte rahiye. Har panel mein kuch naya seekhne ko milega.',
        STORY_END: 'Kahani khatam hui. Ab theory padhne ka waqt hai. Dhyan se padhiye!',
        THEORY: 'Yeh zaroori jaankari hai, Pilot. Poora padhiye - 10 minute ka samay diya gaya hai.',
        THEORY_READY: 'Bahut badhiya! Ab aap simulation ke liye taiyar hain. Button dabayein!',
        XR: 'Ab asli practice ka waqt hai! Screen par dikhai gaye tasks ko pura karein.',
        XR_PASS: 'Shabaash! Simulation pass ho gaya. Ab quiz ka samay hai!',
        QUIZ: 'Sawdhaani se jawab dein. 80% marks chahiye pass hone ke liye. All the best!',
        QUIZ_PASS: 'Bahut badhiya, Pilot! Aapne yeh module safalta se pura kar liya!',
        QUIZ_FAIL: 'Koi baat nahi, Pilot. Phir se try karein. Aap kar sakte hain!',
        COMPLETE: 'Mujhe garv hai aap par! Agle module ke liye taiyar ho jayein.'
    },

    setPragatiMessage(key, custom) {
        const msg = custom || this.PRAGATI_MESSAGES[key] || '';
        const el = document.getElementById('pragati-msg');
        const bubble = document.getElementById('pragati-bubble');
        const avatar = document.getElementById('pragati-avatar');
        if (el) el.textContent = msg;
        if (bubble) bubble.style.display = this.pragatiBubbleVisible ? 'block' : 'none';
        // Speaking animation when message changes
        if (avatar && msg) {
            avatar.classList.add('speaking');
            setTimeout(() => avatar.classList.remove('speaking'), 3000);
        }
    },

    togglePragati() {
        this.pragatiBubbleVisible = !this.pragatiBubbleVisible;
        const bubble = document.getElementById('pragati-bubble');
        if (bubble) bubble.style.display = this.pragatiBubbleVisible ? 'block' : 'none';
    },

    showPragatiForPhase(phase) {
        const assistant = document.getElementById('pragati-assistant');
        if (!assistant) return;
        // Show on all phases except when hidden by XR fullscreen
        assistant.classList.remove('hidden');
        if (phase === 'SELECT') {
            assistant.style.display = 'none'; // Pragati is already shown in the main select screen
        } else {
            assistant.style.display = 'flex';
        }

        // Brand watermark - show on story and XR (immersive phases)
        const watermark = document.getElementById('brand-watermark');
        if (watermark) {
            if (phase === 'STORY' || phase === 'XR') {
                watermark.style.display = 'flex';
            } else {
                watermark.style.display = 'none';
            }
        }
    },

    // ============ VAJRA PULSE (Liveness) ============
    triggerPulse() {
        this.isPaused = true;
        const pulse = document.getElementById('vajra-pulse');
        const x = Math.random() * (window.innerWidth - 100) + 50;
        const y = Math.random() * (window.innerHeight - 100) + 50;
        pulse.style.left = x + 'px';
        pulse.style.top = y + 'px';
        pulse.style.display = 'flex';
        this.pulseTimeout = setTimeout(() => {
            pulse.style.display = 'none';
            this.isPaused = false;
        }, 5000);
    },

    provePulse() {
        clearTimeout(this.pulseTimeout);
        document.getElementById('vajra-pulse').style.display = 'none';
        this.isPaused = false;
    }
};

// Boot
window.addEventListener('load', () => NaipunyaEngine.init());
