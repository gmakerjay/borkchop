"use client";

import React, { useState, useEffect, useRef } from "react";

export default function RomanticFonPage() {
  // ---------------------------------------------------------------------------
  // Particle Canvas Engine (Floating Clouds & Cute Cat Particles)
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

    const symbols = ["🐱", "😻", "🐾", "☁️", "💖", "🌸", "✨", "🧋", "🍦"];
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
    }> = [];

    for (let i = 0; i < 45; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 24 + 14,
        speedY: -Math.random() * 0.9 - 0.4,
        speedX: Math.sin(Math.random() * Math.PI) * 0.6,
        symbol: symbols[Math.floor(Math.random() * symbols.length)],
        opacity: Math.random() * 0.6 + 0.35,
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 1.5,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotSpeed;

        if (p.y < -50) {
          p.y = height + 50;
          p.x = Math.random() * width;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = p.opacity;
        ctx.font = `${p.size}px sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(p.symbol, 0, 0);
        ctx.restore();
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
  // Playful Dodging Popup Speech Bubble (Mobile & Desktop Touch Optimized)
  // ---------------------------------------------------------------------------
  const cheekyPopups = [
    { text: "กดเข้ามาดูแบบนี้ แอบมีใจให้พี่แล้วป่ะเนี่ย? 😜", icon: "💬" },
    { text: "แชทตั้งนาน เดี๋ยวพาไปเลี้ยงชานมไข่มุกเลย! 🧋✨", icon: "🧋" },
    { text: "พี่จีบจริงจังนะเนี่ย ไม่ได้มาเล่นๆ! 🌸", icon: "💖" },
    { text: "น่ารักขนาดนี้ ไม่ให้พี่จีบได้ยังไง! 😻🐾", icon: "😻" },
    { text: "จับให้ได้สิคะ! ปุ่มนี้วาร์ปไวมากนะ 🏃‍♂️💨", icon: "🚀" },
    { text: "อ่านถึงตรงนี้ แอบอมยิ้มอยู่ใช่มั้ยล่ะ รู้นะ! 🙈", icon: "✨" },
    { text: "ถ้ากดจับปุ่มนี้ได้ พี่ยอมเลี้ยงบุฟเฟต์เลยเอ้า! 🍦✨", icon: "🍦" },
    { text: "ขอโอกาสให้พี่ดูแลหัวใจดวงนี้นะครับ 🙏💕", icon: "🌸" },
  ];

  const [dodgePos, setDodgePos] = useState<{ x: number; y: number } | null>(null);
  const [activePopupIndex, setActivePopupIndex] = useState(0);

  const handleDodge = () => {
    const padding = 20;
    const btnWidth = Math.min(320, window.innerWidth - 40);
    const btnHeight = 60;

    const maxX = window.innerWidth - btnWidth - padding;
    const maxY = window.innerHeight - btnHeight - padding;

    const randomX = Math.max(padding, Math.floor(Math.random() * maxX));
    const randomY = Math.max(padding, Math.floor(Math.random() * maxY));

    setDodgePos({ x: randomX, y: randomY });
    setActivePopupIndex((prev) => (prev + 1) % cheekyPopups.length);
    playPopSound();
  };

  // ---------------------------------------------------------------------------
  // Web Audio API Synthesizer & Autoplay
  // ---------------------------------------------------------------------------
  const [isPlayingMusic, setIsPlayingMusic] = useState(true);
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
      osc.frequency.setValueAtTime(450, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(900, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch {}
  };

  const startMusicLoop = () => {
    try {
      initAudio();
      const ctx = audioCtxRef.current;
      if (!ctx) return;

      if (ctx.state === "suspended") {
        ctx.resume();
      }

      if (musicIntervalRef.current) clearInterval(musicIntervalRef.current);

      const notes = [329.63, 392.0, 493.88, 587.33, 349.23, 440.0, 523.25, 659.25];
      let step = 0;

      musicIntervalRef.current = setInterval(() => {
        try {
          if (!audioCtxRef.current) return;
          const c = audioCtxRef.current;
          if (c.state === "suspended") c.resume();

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

      setIsPlayingMusic(true);
    } catch {}
  };

  useEffect(() => {
    startMusicLoop();

    const handleFirstInteraction = () => {
      if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
      }
      startMusicLoop();
      window.removeEventListener("touchstart", handleFirstInteraction);
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("scroll", handleFirstInteraction);
    };

    window.addEventListener("touchstart", handleFirstInteraction, { once: true });
    window.addEventListener("click", handleFirstInteraction, { once: true });
    window.addEventListener("scroll", handleFirstInteraction, { once: true });

    return () => {
      if (musicIntervalRef.current) clearInterval(musicIntervalRef.current);
      window.removeEventListener("touchstart", handleFirstInteraction);
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("scroll", handleFirstInteraction);
    };
  }, []);

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
      startMusicLoop();
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
        className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/80 backdrop-blur-md border border-sky-200 text-sky-700 font-medium text-xs sm:text-sm shadow-lg hover:bg-white hover:scale-105 transition-all cursor-pointer"
      >
        <span className={isPlayingMusic ? "animate-spin" : ""}>🎵</span>
        <span>{isPlayingMusic ? "กำลังเล่นเพลงพาสเทล ✨" : "เปิดเพลงพาสเทล ☁️"}</span>
      </button>

      {/* Main Glassmorphism Card */}
      <main className="relative z-10 w-full max-w-lg mx-auto my-auto">
        <div className="glass-cloud-card rounded-3xl sm:rounded-[40px] p-8 sm:p-12 text-center relative overflow-hidden transition-all duration-300">
          {/* Badge Header */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-sky-100/90 border border-sky-300/60 text-sky-800 text-xs sm:text-sm font-semibold mb-8 shadow-sm">
            <span className="animate-heart-pulse text-rose-500 text-base">😻</span>
            <span>ข้อความพิเศษส่งตรงถึง "น้องฝน"</span>
            <span className="animate-heart-pulse text-rose-500 text-base">😻</span>
          </div>

          {/* Big Main Headline */}
          <h1 className="font-['Mitr'] text-5xl sm:text-7xl md:text-8xl font-bold leading-tight mb-6 tracking-tight">
            <span className="text-sky-900 block mb-2">ฝนครับ</span>
            <span className="bg-gradient-to-r from-sky-600 via-rose-400 to-pink-500 bg-clip-text text-transparent animate-pulse-glow inline-block">
              พี่จีบนะครับ
            </span>{" "}
            😻✨
          </h1>

          {/* Cute Cat Cloud Graphic */}
          <div className="my-6 relative flex justify-center items-center">
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-gradient-to-tr from-sky-200 via-pink-100 to-sky-100 p-2 shadow-lg flex items-center justify-center animate-bounce-slow border-4 border-white/90">
              <span className="text-7xl sm:text-8xl">☁️😻</span>
            </div>
          </div>

          {/* Running Dodging Speech Bubble Toast (Full Mobile & Touch Support) */}
          <div className="mt-6 mb-4 min-h-[60px] flex items-center justify-center">
            <button
              onClick={handleDodge}
              onMouseEnter={handleDodge}
              onTouchStart={(e) => {
                e.preventDefault();
                handleDodge();
              }}
              onPointerDown={(e) => {
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
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-white/95 border-2 border-rose-300 text-rose-600 font-semibold text-xs sm:text-sm shadow-2xl hover:bg-white transition-all duration-200 cursor-pointer whitespace-nowrap animate-bounce active:scale-90 select-none"
            >
              <span className="text-base">{cheekyPopups[activePopupIndex].icon}</span>
              <span>{cheekyPopups[activePopupIndex].text}</span>
            </button>
          </div>

          {/* Footer Note */}
          <footer className="mt-8 pt-4 border-t border-sky-100 text-xs text-sky-600/80">
            Made with ☁️😻 for Fon ✨
          </footer>
        </div>
      </main>
    </div>
  );
}
