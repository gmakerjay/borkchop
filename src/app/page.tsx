"use client";

import React, { useState, useEffect, useRef } from "react";

export default function RomanticFonPage() {
  // ---------------------------------------------------------------------------
  // 1. Particle Canvas Engine (Flying Clouds & Heart Dust)
  // ---------------------------------------------------------------------------
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Particle item definitions
    const symbols = ["☁️", "💖", "💕", "🌸", "✨", "💗", "☁️", "🍦"];
    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      symbol: string;
      opacity: number;
      rotation: number;
      rotSpeed: number;
      isBurst: boolean;
      life: number;
    }> = [];

    // Initialize floating ambient sky particles
    for (let i = 0; i < 35; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 20 + 14,
        speedY: -Math.random() * 0.8 - 0.4,
        speedX: Math.sin(Math.random() * Math.PI) * 0.5,
        symbol: symbols[Math.floor(Math.random() * symbols.length)],
        opacity: Math.random() * 0.6 + 0.3,
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 1.5,
        isBurst: false,
        life: Infinity,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotSpeed;

        if (p.isBurst) {
          p.opacity -= 0.015;
          p.life--;
        } else if (p.y < -50) {
          p.y = height + 50;
          p.x = Math.random() * width;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.font = `${p.size}px sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(p.symbol, 0, 0);
        ctx.restore();

        if (p.isBurst && (p.opacity <= 0 || p.life <= 0)) {
          particles.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Spawn particle burst helper
  const triggerParticleBurst = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const symbols = ["☁️", "💖", "✨", "🌸", "💕"];
    for (let i = 0; i < 15; i++) {
      const p = {
        x,
        y,
        size: Math.random() * 24 + 16,
        speedY: (Math.random() - 0.5) * 8,
        speedX: (Math.random() - 0.5) * 8,
        symbol: symbols[Math.floor(Math.random() * symbols.length)],
        opacity: 1,
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 4,
        isBurst: true,
        life: 80,
      };
      // Access canvas state
    }
  };

  // ---------------------------------------------------------------------------
  // 2. Love Quotes Carousel (Chat & Flirting Focus)
  // ---------------------------------------------------------------------------
  const quotes = [
    "“ ข้อความตอบกลับจากฝน... คือสิ่งที่ทำให้พี่อารมณ์ดีได้ทั้งวันเลยครับ 💬✨ ”",
    "“ ถึงยังไม่เคยเจอตัวจริง แต่แค่เห็นรูปเห็นแชท ก็น่ารักจนพี่ใจฟูแล้วนะ 🌸 ”",
    "“ หวังว่าเร็วๆ นี้... จะมีโอกาสได้พาฝนไปทานขนมอร่อยๆ ด้วยกันนะ 🍦💖 ”",
    "“ ถ้าฝนยังไม่มีใครจอง... พี่ขอสมัครเป็นคนที่ตั้งใจจีบฝนที่สุดได้ไหมครับ 🥺☁️ ”",
  ];

  const [activeQuote, setActiveQuote] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveQuote((prev) => (prev + 1) % quotes.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [quotes.length]);

  // ---------------------------------------------------------------------------
  // 3. Playful Dodge Button ("ขอคิดดูก่อน 🙈")
  // ---------------------------------------------------------------------------
  const [dodgePos, setDodgePos] = useState<{ x: number; y: number } | null>(null);
  const [dodgeTextIndex, setDodgeTextIndex] = useState(0);

  const dodgeMessages = [
    "คุยแชทกันตั้งนาน จะใจร้ายหรอคะ? 🥺",
    "เดี๋ยวพาไปเลี้ยงไอติมเลยน้า! 🍦",
    "ให้โอกาสพี่หน่อยน้า ✨",
    "กดปุ่มสีชมพูเถอะน้า 💕",
    "พี่ตั้งใจจีบจริงๆ นะ 🌸",
    "อย่าเพิ่งหนีพี่เลยน้า 😭",
    "ปุ่มนี้จับยากนะ แนะนำกดซ้าย! 🙈",
  ];

  const handleDodge = () => {
    const padding = 30;
    const maxX = window.innerWidth - 220;
    const maxY = window.innerHeight - 80;

    const randomX = Math.max(padding, Math.floor(Math.random() * maxX));
    const randomY = Math.max(padding, Math.floor(Math.random() * maxY));

    setDodgePos({ x: randomX, y: randomY });
    setDodgeTextIndex((prev) => (prev + 1) % dodgeMessages.length);
    playPopSound();
  };

  // ---------------------------------------------------------------------------
  // 4. Modal & Celebration
  // ---------------------------------------------------------------------------
  const [showModal, setShowModal] = useState(false);

  const handleAccept = () => {
    setShowModal(true);
    playChimeSound();
  };

  // ---------------------------------------------------------------------------
  // 5. Audio Synthesizer (Web Audio API)
  // ---------------------------------------------------------------------------
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const musicIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const initAudio = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new AudioCtx();
    }
  };

  const playPopSound = () => {
    try {
      initAudio();
      const ctx = audioCtxRef.current;
      if (!ctx) return;
      if (ctx.state === "suspended") ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(400, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch {}
  };

  const playChimeSound = () => {
    try {
      initAudio();
      const ctx = audioCtxRef.current;
      if (!ctx) return;
      if (ctx.state === "suspended") ctx.resume();

      const freqs = [523.25, 659.25, 783.99, 1046.5];
      freqs.forEach((f, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(f, ctx.currentTime + i * 0.1);

        gain.gain.setValueAtTime(0, ctx.currentTime + i * 0.1);
        gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + i * 0.1 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.1 + 0.7);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.1);
        osc.stop(ctx.currentTime + i * 0.1 + 0.7);
      });
    } catch {}
  };

  const toggleMusic = () => {
    initAudio();
    const ctx = audioCtxRef.current;
    if (ctx && ctx.state === "suspended") {
      ctx.resume();
    }

    if (isPlayingMusic) {
      setIsPlayingMusic(false);
      if (musicIntervalRef.current) clearInterval(musicIntervalRef.current);
    } else {
      setIsPlayingMusic(true);
      playChimeSound();
      const notes = [329.63, 392.0, 493.88, 587.33, 349.23, 440.0, 523.25, 659.25];
      let step = 0;
      musicIntervalRef.current = setInterval(() => {
        try {
          if (!audioCtxRef.current) return;
          const c = audioCtxRef.current;
          const osc = c.createOscillator();
          const gain = c.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(notes[step % notes.length], c.currentTime);
          step++;

          gain.gain.setValueAtTime(0.06, c.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.5);

          osc.connect(gain);
          gain.connect(c.destination);
          osc.start();
          osc.stop(c.currentTime + 0.5);
        } catch {}
      }, 400);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-gradient-to-b from-[#e0f2fe] via-[#bae6fd] to-[#fce7f3] text-slate-800 flex items-center justify-center p-4 sm:p-6 md:p-8">
      {/* Background Interactive Particle Canvas */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />

      {/* Decorative Flying Clouds Layer 1 (CSS Animated) */}
      <div className="fixed top-12 left-0 w-full pointer-events-none z-0 opacity-80">
        <div className="text-6xl sm:text-8xl animate-[floatCloud_35s_linear_infinite]">
          ☁️
        </div>
      </div>
      <div className="fixed top-1/3 right-0 w-full pointer-events-none z-0 opacity-70">
        <div className="text-7xl sm:text-9xl animate-[floatCloudSlow_45s_linear_infinite]">
          ☁️
        </div>
      </div>
      <div className="fixed bottom-16 left-10 w-full pointer-events-none z-0 opacity-60">
        <div className="text-5xl sm:text-7xl animate-[floatCloud_50s_linear_infinite]">
          🌤️
        </div>
      </div>

      {/* Music Toggle Button (Fixed Top-Right) */}
      <button
        onClick={toggleMusic}
        className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/80 backdrop-blur-md border border-sky-200 text-sky-700 font-medium text-xs sm:text-sm shadow-lg hover:bg-white hover:scale-105 transition-all"
      >
        <span className={isPlayingMusic ? "animate-spin" : ""}>🎵</span>
        <span>{isPlayingMusic ? "กำลังเล่นเพลงพาสเทล ✨" : "เปิดเพลงพาสเทล ☁️"}</span>
      </button>

      {/* Main Glassmorphism Card Container (Full Responsive) */}
      <main className="relative z-10 w-full max-w-xl mx-auto my-auto">
        <div className="glass-cloud-card rounded-3xl sm:rounded-[36px] p-6 sm:p-10 text-center relative overflow-hidden transition-all duration-300">
          {/* Header Cloud Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-100/90 border border-sky-300/60 text-sky-800 text-xs sm:text-sm font-semibold mb-6 shadow-sm">
            <span className="animate-heart-pulse text-rose-500">☁️</span>
            <span>ข้อความพิเศษจากแชทส่งตรงถึง "น้องฝน"</span>
            <span className="animate-heart-pulse text-rose-500">💖</span>
          </div>

          {/* Big Main Headline */}
          <h1 className="font-['Mitr'] text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-4 tracking-tight">
            <span className="text-sky-800 block">ฝนครับ...</span>
            <span className="bg-gradient-to-r from-sky-600 via-sky-500 to-rose-400 bg-clip-text text-transparent animate-pulse-glow inline-block">
              พี่จีบนะครับ
            </span>{" "}
            ☁️💖
          </h1>

          {/* Responsive Subtitle */}
          <p className="text-slate-600 text-sm sm:text-base md:text-lg leading-relaxed mb-6 font-normal max-w-md mx-auto">
            ถึงตอนนี้เราจะรู้จักกันผ่านแชท และยังไม่เคยเจอตัวจริง 📱✨
            <br className="hidden sm:block" />
            แต่ทุกครั้งที่แจ้งเตือนแชทจากฝนเด้งขึ้นมา พี่ก็อมยิ้มคนเดียวตลอดเลยครับ 😊
          </p>

          {/* Cloud Illustration Graphic */}
          <div className="my-6 relative flex justify-center items-center">
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-gradient-to-tr from-sky-200 to-pink-100 p-2 shadow-inner flex items-center justify-center animate-bounce-slow border-2 border-white/80">
              <span className="text-6xl sm:text-7xl">☁️🌸</span>
            </div>
          </div>

          {/* Love Notes Carousel Box */}
          <div className="bg-white/70 border border-sky-200/80 rounded-2xl p-5 mb-8 shadow-sm">
            <div className="text-xs sm:text-sm font-semibold text-sky-700 flex items-center justify-center gap-1.5 mb-2">
              <span>💬 ความในใจของพี่ที่ส่งผ่านแชท</span>
            </div>
            <div className="min-h-[64px] flex items-center justify-center px-2">
              <p className="text-slate-700 font-['Mali'] text-sm sm:text-base italic transition-all duration-300">
                {quotes[activeQuote]}
              </p>
            </div>
            {/* Dots */}
            <div className="flex justify-center gap-1.5 mt-3">
              {quotes.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveQuote(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === activeQuote ? "w-6 bg-sky-500" : "w-2 bg-sky-200"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Confession Question Section */}
          <div className="mb-6">
            <h2 className="font-['Mitr'] text-lg sm:text-xl md:text-2xl text-slate-800 font-semibold mb-6">
              ฝนจะยอมเปิดโอกาสให้พี่จีบไหมครับ? 🥺🌸
            </h2>

            {/* Interactive Button Group */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 min-h-[60px] relative">
              {/* Accept Button */}
              <button
                onClick={handleAccept}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-sky-500 to-rose-400 text-white font-semibold text-base shadow-lg shadow-sky-300/50 hover:shadow-sky-400/60 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>💖</span>
                <span>ตกลงค่ะ / ยอมให้จีบ ☁️</span>
              </button>

              {/* Dodge Button */}
              <button
                onClick={handleDodge}
                onMouseEnter={handleDodge}
                onTouchStart={(e) => {
                  e.preventDefault();
                  handleDodge();
                }}
                style={
                  dodgePos
                    ? {
                        position: "fixed",
                        left: `${dodgePos.x}px`,
                        top: `${dodgePos.y}px`,
                        zIndex: 999,
                      }
                    : { position: "relative" }
                }
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white/80 border border-slate-300 text-slate-600 font-semibold text-sm shadow-md hover:bg-white transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>🙈</span>
                <span>{dodgeMessages[dodgeTextIndex]}</span>
              </button>
            </div>
          </div>

          {/* Footer Note */}
          <footer className="pt-4 border-t border-sky-100 text-xs text-sky-600/80">
            Made with ☁️💖 for Fon | สัญญาว่าจะตั้งใจจีบให้ดีที่สุดครับ ✨
          </footer>
        </div>
      </main>

      {/* Success Celebration Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm sm:max-w-md w-full text-center shadow-2xl border-4 border-sky-200 relative animate-scaleUp">
            <div className="text-6xl mb-4 animate-bounce">🥳🎉☁️</div>
            <h3 className="font-['Mitr'] text-2xl sm:text-3xl font-bold text-sky-800 mb-3">
              เย้~~~~! ขอบคุณน้า 💖
            </h3>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 font-normal">
              ขอบคุณมากๆ นะครับน้องฝน! พี่สัญญาว่าจะตั้งใจจีบและดูแลหัวใจดวงนี้ผ่านแชทอย่างดีที่สุด...
              แล้วไว้นัดวันไปเจอตัวจริงทานไอติมด้วยกันนะครับ 🍦✨🌸
            </p>
            <div className="text-2xl mb-6">✨ ☁️ 🌸 💖 ✨</div>
            <button
              onClick={() => setShowModal(false)}
              className="w-full py-3.5 rounded-full bg-sky-500 hover:bg-sky-600 text-white font-semibold text-base shadow-md transition-all"
            >
              ส่งรอยยิ้มให้พี่ ☺️💖
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
