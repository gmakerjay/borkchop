// ==========================================================================
// Romantic Single Page Logic - "ฝนครับพี่จีบนะครับ 💖"
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------------------------
    // 1. Canvas Particle System (Floating Hearts & Sparkles)
    // ----------------------------------------------------------------------
    const canvas = document.getElementById('heartCanvas');
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const heartSymbols = ['💖', '💕', '🌸', '✨', '💗', '❤️', '🌺'];

    class Particle {
        constructor(isBurst = false, x = 0, y = 0) {
            this.reset(isBurst, x, y);
        }

        reset(isBurst = false, x = 0, y = 0) {
            this.x = isBurst ? x : Math.random() * width;
            this.y = isBurst ? y : height + Math.random() * 50;
            this.size = Math.random() * 18 + 12;
            this.speedY = isBurst ? (Math.random() - 0.5) * 8 : -Math.random() * 1.5 - 0.8;
            this.speedX = isBurst ? (Math.random() - 0.5) * 8 : Math.sin(Math.random() * Math.PI) * 0.8;
            this.symbol = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
            this.opacity = isBurst ? 1 : Math.random() * 0.7 + 0.3;
            this.rotation = Math.random() * 360;
            this.rotSpeed = (Math.random() - 0.5) * 2;
            this.isBurst = isBurst;
            this.life = isBurst ? 100 : Infinity;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.rotation += this.rotSpeed;

            if (this.isBurst) {
                this.opacity -= 0.01;
                this.life--;
            } else {
                if (this.y < -40) {
                    this.reset();
                }
            }
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate((this.rotation * Math.PI) / 180);
            ctx.globalAlpha = Math.max(0, this.opacity);
            ctx.font = `${this.size}px sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(this.symbol, 0, 0);
            ctx.restore();
        }
    }

    // Populate initial particles
    for (let i = 0; i < 45; i++) {
        particles.push(new Particle());
    }

    function triggerFireworks() {
        for (let i = 0; i < 60; i++) {
            particles.push(new Particle(true, width / 2, height / 2));
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, width, height);

        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.update();
            p.draw();

            if (p.isBurst && (p.opacity <= 0 || p.life <= 0)) {
                particles.splice(i, 1);
            }
        }

        requestAnimationFrame(animateParticles);
    }

    animateParticles();

    // ----------------------------------------------------------------------
    // 2. Love Quotes Carousel
    // ----------------------------------------------------------------------
    const quotes = [
        '"รอยยิ้มของฝน ทำให้โลกของพี่น่าอยู่ขึ้นเยอะเลย 🌸"',
        '"ตั้งแต่วันแรกที่รู้จักฝน ทุกๆ วันของพี่ก็มีความหมายมากขึ้น 💕"',
        '"พี่ไม่ได้แค่อยากคุย... แต่อยากเป็นคนที่ฝนหันมาเมื่อไหร่ก็เจอ ✨"',
        '"ถ้าหัวใจของฝนยังว่าง ให้พี่เข้าไปจับจองได้ไหมครับ 🥺💖"'
    ];

    let currentQuoteIndex = 0;
    const quoteText = document.getElementById('quoteText');
    const dots = document.querySelectorAll('.dot');

    function updateQuote(index) {
        quoteText.style.opacity = '0';
        quoteText.style.transform = 'translateY(10px)';

        setTimeout(() => {
            currentQuoteIndex = index;
            quoteText.textContent = quotes[currentQuoteIndex];
            quoteText.style.opacity = '1';
            quoteText.style.transform = 'translateY(0)';

            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentQuoteIndex);
            });
        }, 300);
    }

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => updateQuote(i));
    });

    setInterval(() => {
        let nextIndex = (currentQuoteIndex + 1) % quotes.length;
        updateQuote(nextIndex);
    }, 5000);

    // ----------------------------------------------------------------------
    // 3. Playful Dodge Button ("ขอคิดดูก่อน 🙈")
    // ----------------------------------------------------------------------
    const dodgeBtn = document.getElementById('dodgeBtn');
    const dodgeBtnText = document.getElementById('dodgeBtnText');

    const dodgeMessages = [
        'กดผิดเปล่าคะ? 😜',
        'ให้โอกาสพี่หน่อยน้า 🥺',
        'แหน่ะ จะหนีไปไหน! 💖',
        'กดปุ่มสีชมพูเถอะน้า ✨',
        'พี่ตั้งใจจีบจริงๆ นะ 💕',
        'อย่าใจร้ายกับพี่เลย 😭',
        'ปุ่มนี้กดไม่ได้หรอกนะ! 🙈'
    ];

    let dodgeCount = 0;

    function moveDodgeButton() {
        dodgeCount++;
        
        // Change text playfully
        const randomMsg = dodgeMessages[dodgeCount % dodgeMessages.length];
        dodgeBtnText.textContent = randomMsg;

        // Calculate random coordinates inside window bounds
        const btnRect = dodgeBtn.getBoundingClientRect();
        const padding = 40;

        const maxX = window.innerWidth - btnRect.width - padding;
        const maxY = window.innerHeight - btnRect.height - padding;

        const randomX = Math.max(padding, Math.floor(Math.random() * maxX));
        const randomY = Math.max(padding, Math.floor(Math.random() * maxY));

        dodgeBtn.style.position = 'fixed';
        dodgeBtn.style.left = `${randomX}px`;
        dodgeBtn.style.top = `${randomY}px`;
        dodgeBtn.style.zIndex = '999';

        // Play small pop sound
        playPopSynth();
    }

    dodgeBtn.addEventListener('mouseenter', moveDodgeButton);
    dodgeBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        moveDodgeButton();
    });
    dodgeBtn.addEventListener('click', moveDodgeButton);

    // ----------------------------------------------------------------------
    // 4. Accept Button & Celebration Modal
    // ----------------------------------------------------------------------
    const acceptBtn = document.getElementById('acceptBtn');
    const successModal = document.getElementById('successModal');
    const closeModalBtn = document.getElementById('closeModalBtn');

    acceptBtn.addEventListener('click', () => {
        // Trigger Fireworks particle burst
        triggerFireworks();
        setInterval(triggerFireworks, 1200);

        // Show Modal
        successModal.classList.add('active');

        // Play victory melody
        playLoveChime();
    });

    closeModalBtn.addEventListener('click', () => {
        successModal.classList.remove('active');
    });

    // ----------------------------------------------------------------------
    // 5. Interactive Click Heart Burst Anywhere on Screen
    // ----------------------------------------------------------------------
    window.addEventListener('click', (e) => {
        // Don't trigger on dodge button or accept button specifically to avoid overlap
        if (e.target.closest('.btn') || e.target.closest('.music-toggle')) return;

        createClickHeart(e.clientX, e.clientY);
        
        // Add canvas burst at click location
        for (let i = 0; i < 8; i++) {
            particles.push(new Particle(true, e.clientX, e.clientY));
        }
    });

    function createClickHeart(x, y) {
        const heart = document.createElement('div');
        heart.className = 'click-heart';
        heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        heart.style.left = `${x}px`;
        heart.style.top = `${y}px`;
        document.body.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 1200);
    }

    // ----------------------------------------------------------------------
    // 6. Web Audio API Romantic Synthesizer (Zero External Dependencies)
    // ----------------------------------------------------------------------
    let audioCtx = null;
    let isMusicPlaying = false;
    let musicInterval = null;
    const musicBtn = document.getElementById('musicBtn');
    const musicText = document.getElementById('musicText');

    function initAudio() {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
    }

    function playPopSynth() {
        try {
            initAudio();
            if (audioCtx.state === 'suspended') audioCtx.resume();
            
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(440, audioCtx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.1);

            gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);

            osc.connect(gain);
            gain.connect(audioCtx.destination);

            osc.start();
            osc.stop(audioCtx.currentTime + 0.1);
        } catch (e) {}
    }

    function playLoveChime() {
        try {
            initAudio();
            if (audioCtx.state === 'suspended') audioCtx.resume();

            const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
            notes.forEach((freq, idx) => {
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();

                osc.type = 'triangle';
                osc.frequency.setValueAtTime(freq, audioCtx.currentTime + idx * 0.12);

                gain.gain.setValueAtTime(0, audioCtx.currentTime + idx * 0.12);
                gain.gain.linearRampToValueAtTime(0.2, audioCtx.currentTime + idx * 0.12 + 0.05);
                gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + idx * 0.12 + 0.8);

                osc.connect(gain);
                gain.connect(audioCtx.destination);

                osc.start(audioCtx.currentTime + idx * 0.12);
                osc.stop(audioCtx.currentTime + idx * 0.12 + 0.8);
            });
        } catch (e) {}
    }

    // Gentle Arpeggio Music Loop
    const melodyNotes = [
        329.63, 392.00, 493.88, 587.33, // E4, G4, B4, D5
        349.23, 440.00, 523.25, 659.25, // F4, A4, C5, E5
        392.00, 493.88, 587.33, 698.46, // G4, B4, D5, F5
        261.63, 329.63, 392.00, 523.25  // C4, E4, G4, C5
    ];

    let noteStep = 0;

    function playMusicStep() {
        if (!isMusicPlaying) return;
        try {
            const freq = melodyNotes[noteStep % melodyNotes.length];
            noteStep++;

            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

            gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.6);

            osc.connect(gain);
            gain.connect(audioCtx.destination);

            osc.start();
            osc.stop(audioCtx.currentTime + 0.6);
        } catch (e) {}
    }

    musicBtn.addEventListener('click', () => {
        initAudio();
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }

        isMusicPlaying = !isMusicPlaying;

        if (isMusicPlaying) {
            musicBtn.classList.add('playing');
            musicText.textContent = 'กำลังเล่นเพลงหวานๆ ✨';
            playLoveChime();
            musicInterval = setInterval(playMusicStep, 350);
        } else {
            musicBtn.classList.remove('playing');
            musicText.textContent = 'เปิดเพลงหวานๆ ✨';
            clearInterval(musicInterval);
        }
    });
});
