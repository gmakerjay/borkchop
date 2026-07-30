"use client";

import React, { useState, useEffect, useRef } from "react";

export default function RomanticFonPage() {
  // ---------------------------------------------------------------------------
  // 1. Particle Canvas Engine (Floating Clouds & Pastel Hearts)
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

    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 22 + 14,
        speedY: -Math.random() * 0.9 - 0.4,
        speedX: Math.sin(Math.random() * Math.PI) * 0.6,
        symbol: symbols[Math.floor(Math.random() * symbols.length)],
        opacity: Math.random() * 0.6 + 0.35,
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

  // ---------------------------------------------------------------------------
  // 2. Playful Dodge Button ("ขอคิดดูก่อน 🙈")
  // ---------------------------------------------------------------------------
  const [dodgePos, setDodgePos] = useState<{ x: number; y: number } | null>(null);
  const [dodgeTextIndex, setDodgeTextIndex] = useState(0);

  const dodgeMessages = [
    "จะใจร้ายหรอคะ? 🥺",
    "ให้โอกาสพี่หน่อยน้า ✨",
    "กดปุ่มสีชมพูเถอะน้า 💕",
    "พี่ตั้งใจจีบจริงๆ นะ 🌸",
    "เดี๋ยวเลี้ยงไอติมเลยน้า! 🍦",
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
  // 3. Modal & Celebration
  // ---------------------------------------------------------------------------
  const [showModal, setShowModal] = useState(false);

  const handleAccept = () => {
    setShowModal(true);
    playChimeSound();
  };

  // ---------------------------------------------------------------------------
  // 4. Web Audio API Synthesizer
  // ---------------------------------------------------------------------------
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const musicIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const initAudio = () => {
    if (!audioCtxRef.current) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
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

      {/* Decorative Flying Clouds Layer */}
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

      {/* Music Toggle Button */}
      <button
        onClick={toggleMusic}
        className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/80 backdrop-blur-md border border-sky-200 text-sky-700 font-medium text-xs sm:text-sm shadow-lg hover:bg-white hover:scale-105 transition-all"
      >
        <span className={isPlayingMusic ? "animate-spin" : ""}>🎵</span>
        <span>{isPlayingMusic ? "กำลังเล่นเพลงพาสเทล ✨" : "เปิดเพลงพาสเทล ☁️"}</span>
      </button>

      {/* Main Clean & Gorgeous Glassmorphism Card */}
      <main className="relative z-10 w-full max-w-lg mx-auto my-auto">
        <div className="glass-cloud-card rounded-3xl sm:rounded-[40px] p-8 sm:p-12 text-center relative overflow-hidden transition-all duration-300">
          {/* Badge Header */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-sky-100/90 border border-sky-300/60 text-sky-800 text-xs sm:text-sm font-semibold mb-8 shadow-sm">
            <span className="animate-heart-pulse text-rose-500 text-base">💖</span>
            <span>ข้อความพิเศษส่งตรงถึง "น้องฝน"</span>
            <span className="animate-heart-pulse text-rose-500 text-base">💖</span>
          </div>

          {/* Big Main Headline */}
          <h1 className="font-['Mitr'] text-4xl sm:text-6xl md:text-7xl font-bold leading-tight mb-8 tracking-tight">
            <span className="text-sky-900 block mb-1">ฝนครับ</span>
            <span className="bg-gradient-to-r from-sky-600 via-rose-400 to-pink-500 bg-clip-text text-transparent animate-pulse-glow inline-block">
              พี่จีบนะครับ
            </span>{" "}
            💖
          </h1>

          {/* Cloud Illustration Graphic */}
          <div className="my-8 relative flex justify-center items-center">
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-gradient-to-tr from-sky-200 via-pink-100 to-sky-100 p-2 shadow-lg flex items-center justify-center animate-bounce-slow border-4 border-white/90">
              <span className="text-6xl sm:text-7xl">☁️🌸</span>
            </div>
          </div>

          {/* Simple Courting Question */}
          <p className="font-['Mitr'] text-lg sm:text-2xl text-slate-800 font-semibold mb-8">
            ขอโอกาสให้พี่ได้ตั้งใจจีบฝนนะครับ 🥺🌸
          </p>

          {/* Interactive Button Group */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 min-h-[60px] relative">
            {/* Accept Button */}
            <button
              onClick={handleAccept}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-sky-500 to-rose-400 text-white font-semibold text-base sm:text-lg shadow-lg shadow-sky-300/50 hover:shadow-sky-400/70 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
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
              className="w-full sm:w-auto px-6 py-4 rounded-full bg-white/80 border border-slate-300 text-slate-600 font-semibold text-sm sm:text-base shadow-md hover:bg-white transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>🙈</span>
              <span>{dodgeMessages[dodgeTextIndex]}</span>
            </button>
          </div>

          {/* Footer Note */}
          <footer className="mt-10 pt-4 border-t border-sky-100 text-xs text-sky-600/80">
            Made with ☁️💖 for Fon | สัญญาว่าจะตั้งใจจีบให้ดีที่สุดครับ ✨
          </footer>
        </div>
      </main>

      {/* Success Celebration Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fadeIn">
          <div className="bg-white rounded-3xl p-8 sm:p-10 max-w-sm sm:max-w-md w-full text-center shadow-2xl border-4 border-sky-200 relative animate-scaleUp">
            <div className="text-6xl mb-4 animate-bounce">🥳🎉☁️</div>
            <h3 className="font-['Mitr'] text-2xl sm:text-3xl font-bold text-sky-800 mb-3">
              เย้~~~~! ขอบคุณน้า 💖
            </h3>
            <p className="text-slate-600 text-base leading-relaxed mb-6 font-normal">
              ขอบคุณมากๆ นะครับน้องฝน! พี่สัญญาว่าจะตั้งใจจีบอย่างดีที่สุดเลยครับ 🍦✨🌸
            </p>
            <div className="text-2xl mb-6">✨ ☁️ 🌸 💖 ✨</div>
            <button
              onClick={() => setShowModal(false)}
              className="w-full py-3.5 rounded-full bg-sky-500 hover:bg-sky-600 text-white font-semibold text-base shadow-md transition-all cursor-pointer"
            >
              ส่งรอยยิ้มให้พี่ ☺️💖
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
