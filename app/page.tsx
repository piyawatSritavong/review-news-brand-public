"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Phone,
  Play,
  ChevronRight,
  ChevronLeft,
  Heart,
  User,
  MoreHorizontal,
  MessageCircle,
  Send,
  ChevronRightCircle,
  Moon,
  Sun,
  Search,
  Zap,
} from "lucide-react";
import Image from "next/image";

type FeedItem = {
  id: string;
  title?: string;
  user: string;
  time?: string;
  likes?: string;
  comments?: string;
  image?: string;
  content: string;
};

type PromoItem = {
  name: string;
  value: string;
  img: string;
  isHighlight?: boolean;
};

const TickerContent = () => (
  <div className="flex items-center gap-8 px-10">
    {[
      "KP GROUP",
      "ARCHITECTURE",
      "INTERIOR DESIGN",
      "WELLNESS SPA",
      "MEDICAL EQUIPMENT",
      "MODERN LIVING",
      "PREMIUM SERVICE",
    ].map((text, idx) => (
      <React.Fragment key={idx}>
        <span className="text-black text-xl md:text-2xl font-black italic uppercase mx-10 tracking-tighter whitespace-nowrap">
          {text}
        </span>
        <div className="bg-black w-2.5 h-2.5 rotate-45 shrink-0" />
      </React.Fragment>
    ))}
  </div>
);

const slides = [
  {
    id: "kphouse",
    titleTop: "KP",
    titleBottom: "HOUSE 101",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
    bgColor: "bg-[#1a0000]",
    accentColor: "#FF0000",
    tagline: "PREMIUM LIVING",
    description:
      "สัมผัสประสบการณ์การอยู่อาศัยระดับพรีเมียมด้วยการออกแบบที่ทันสมัยจาก KP HOUSE 101",
  },
  {
    id: "meaura",
    titleTop: "ME AURA",
    titleBottom: "SPA 101",
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070&auto=format&fit=crop",
    bgColor: "bg-[#1a1a00]",
    accentColor: "#FFFF00",
    tagline: "WELLNESS & RELAX",
    description:
      "ค้นพบความผ่อนคลายที่สมบูรณ์แบบและการปรนนิบัติร่างกายอย่างเหนือระดับที่ ME AURA SPA 101",
  },
  {
    id: "manas",
    titleTop: "มนัส",
    titleBottom: "การแพทย์",
    image:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2070&auto=format&fit=crop",
    bgColor: "bg-[#000a1a]",
    accentColor: "#0066FF",
    tagline: "MANAS MEDICAL SERVICE",
    description:
      "บริการเครื่องมือแพทย์ที่ทันสมัยและมีมาตรฐานระดับสากล เพื่อยกระดับการดูแลสุขภาพโดยมนัสการแพทย์",
  },
];

const promoCreatedAt = new Date().toLocaleTimeString("th-TH", {
  hour: "2-digit",
  minute: "2-digit",
});

const promoList1: PromoItem[] = [
  {
    name: "3.3 วันลดกระหน่ำ",
    value: promoCreatedAt,
    img: slides[0].image,
  },
  {
    name: "วันที่ 3 เดือน 3 เจอกัน 20 ทุ่ม",
    value: promoCreatedAt,
    img: slides[1].image,
    isHighlight: true,
  },
  {
    name: "Flash Sale 2 ชั่วโมงเท่านั้น",
    value: promoCreatedAt,
    img: slides[2].image,
  },
  {
    name: "โค้ดลับ: KP333 ลดเพิ่ม",
    value: promoCreatedAt,
    img: slides[0].image,
  },
  {
    name: "ส่งฟรีทั่วไทย วันนี้เท่านั้น",
    value: promoCreatedAt,
    img: slides[1].image,
  },
  {
    name: "ลดเพิ่มเมื่อชำระก่อนเที่ยงคืน",
    value: promoCreatedAt,
    img: slides[2].image,
  },
  {
    name: "สมาชิกใหม่รับคูปองทันที",
    value: promoCreatedAt,
    img: slides[0].image,
  },
  {
    name: "ดีลพิเศษเฉพาะ 100 ออเดอร์แรก",
    value: promoCreatedAt,
    img: slides[1].image,
  },
];

const promoList2: PromoItem[] = [
  {
    name: "โปร 1 แถม 1 เฉพาะออนไลน์",
    value: promoCreatedAt,
    img: slides[2].image,
  },
  {
    name: "ลดสูงสุด 70% เริ่มแล้ว",
    value: promoCreatedAt,
    img: slides[1].image,
  },
  {
    name: "ดีลรายชั่วโมง รีบกดก่อนหมด",
    value: promoCreatedAt,
    img: slides[0].image,
  },
  {
    name: "3.3 Midnight Deal 00:00",
    value: promoCreatedAt,
    img: slides[2].image,
    isHighlight: true,
  },
  {
    name: "ของแถมจัดเต็ม เฉพาะวันนี้",
    value: promoCreatedAt,
    img: slides[0].image,
  },
  {
    name: "Live แจกโค้ดลดเพิ่ม 21:00",
    value: promoCreatedAt,
    img: slides[1].image,
  },
  {
    name: "แพ็กคู่สุดคุ้ม ราคาพิเศษ",
    value: promoCreatedAt,
    img: slides[2].image,
  },
  {
    name: "ส่งด่วนภายใน 24 ชม. (กทม.)",
    value: promoCreatedAt,
    img: slides[0].image,
  },
];

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/+$/, "") ||
  "http://localhost:8080/api";

const USE_MOCK_API =
  process.env.NEXT_PUBLIC_USE_MOCK === "true" ||
  !process.env.NEXT_PUBLIC_API_BASE_URL ||
  API_BASE_URL.includes("localhost") ||
  API_BASE_URL.includes("127.0.0.1");

const MOCK_POSTS: FeedItem[] = [
  {
    id: "mock-1",
    user: "KP Group",
    time: "เมื่อสักครู่",
    likes: "128",
    comments: "14",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
    content:
      "รีวิวบ้านสไตล์โมเดิร์นที่เน้นแสงธรรมชาติ ✨\n\nจุดที่ชอบที่สุดคือโถงกลางสูงโปร่งและหน้าต่างบานใหญ่ ทำให้บ้านดูโล่งขึ้นทันที\n\nทริคเล็ก ๆ: ใช้โทนสีอ่อน + งานไม้ จะทำให้ภาพรวมดูอบอุ่นแบบพรีเมียมมากขึ้น",
  },
  {
    id: "mock-2",
    user: "KP House 101",
    time: "1 ชม.",
    likes: "96",
    comments: "8",
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=2070&auto=format&fit=crop",
    content:
      "ไอเดียจัดพื้นที่ห้องเล็กให้ดูกว้างขึ้น\n\n1) ตู้สูงชนเพดาน\n2) เฟอร์นิเจอร์ Multi-function\n3) เลือกไฟ warm + แสงซ่อน\n\nทำครบ 3 ข้อนี้ ห้องจะดูเป็นสตูดิโอหรูขึ้นทันทีครับ",
  },
  {
    id: "mock-3",
    user: "ME AURA",
    time: "2 ชม.",
    likes: "211",
    comments: "22",
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070&auto=format&fit=crop",
    content:
      "สปาแบบ ‘เงียบจริง’ คือดีต่อใจมาก\n\nห้องทรีตเมนต์ที่ใช้กลิ่นอโรม่าเบา ๆ + เพลงบรรเลง ทำให้โฟกัสกับการผ่อนคลายได้สุด ๆ\n\nใครเครียดจากงาน ลองให้รางวัลตัวเองสัก 90 นาที แล้วจะเข้าใจคำว่ารีเซ็ตพลังครับ",
  },
  {
    id: "mock-4",
    user: "มนัสการแพทย์",
    time: "เมื่อวาน",
    likes: "64",
    comments: "5",
    image:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2070&auto=format&fit=crop",
    content:
      "อัปเดตเบื้องต้น: เลือกอุปกรณ์ที่ ‘มาตรฐานชัด’ ก่อนสเปกแรง\n\n- เอกสารรับรองต้องครบ\n- การซ่อมบำรุงต้องมีทีมรองรับ\n- อะไหล่ต้องหาได้\n\nของดีคือของที่ใช้งานได้ยาว ๆ และดูแลต่อได้ง่ายครับ",
  },
  {
    id: "mock-5",
    user: "KP Group",
    time: "2 วันที่แล้ว",
    likes: "320",
    comments: "41",
    image:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=2070&auto=format&fit=crop",
    content:
      "Mood & Tone ที่ทำให้โปรเจกต์ดูแพงขึ้น\n\n• สีหลัก 1 สี + สีรอง 1 สี\n• ใช้ฟอนต์ Bold กับหัวข้อ และ Medium กับเนื้อหา\n• เว้นพื้นที่ว่างให้หายใจ\n\nดีไซน์ที่ดูพรีเมียมมักไม่ได้ใส่เยอะ แต่ใส่ ‘ถูกจุด’ ครับ",
  },
  {
    id: "mock-6",
    user: "ME AURA",
    time: "3 วันที่แล้ว",
    likes: "152",
    comments: "11",
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=2070&auto=format&fit=crop",
    content:
      "ไอเดียมุมพักผ่อนในบ้านแบบสปา\n\nจัดมุมเล็ก ๆ ใกล้หน้าต่าง + ต้นไม้ 1 กระถาง + โคมไฟ warm\n\nแค่นี้ก็ได้พื้นที่ชาร์จพลังทุกเย็นแล้วครับ",
  },
  {
    id: "mock-7",
    user: "KP House 101",
    time: "1 สัปดาห์",
    likes: "88",
    comments: "9",
    image:
      "https://images.unsplash.com/photo-1501183638710-841dd1904471?q=80&w=2070&auto=format&fit=crop",
    content:
      "Checklist ก่อนรีโนเวท\n\n- วัดพื้นที่จริง (และเผื่อ tolerance)\n- วางตำแหน่งปลั๊ก/สวิตช์ให้พอ\n- เลือกวัสดุที่ทำความสะอาดง่าย\n\nทำการบ้านก่อน เริ่มงานจริงจะไหลลื่นกว่าเดิมมากครับ",
  },
  {
    id: "mock-8",
    user: "มนัสการแพทย์",
    time: "2 สัปดาห์",
    likes: "45",
    comments: "3",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop",
    content:
      "ความปลอดภัยของผู้ใช้งานมาก่อนเสมอ\n\nถ้าต้องเลือกระหว่าง ‘ถูก’ กับ ‘มาตรฐาน’ — ให้เลือกมาตรฐาน\n\nเพราะสุดท้ายต้นทุนที่แพงที่สุดคือความเสี่ยงครับ",
  },
];


// --- Sub-components ---
const PromoCard = ({ item }: { item: PromoItem }) => {
  const isHighlight = item.isHighlight;

  return (
    <div
      className={`flex items-center gap-4 border rounded-2xl p-3 min-w-70 shadow-xl transition-all duration-300 ${
        isHighlight
          ? "rainbow-bg animate-rainbow-flow border-white/50 scale-105 z-10 shadow-[0_10px_20px_rgba(0,0,0,0.2)]"
          : "bg-linear-to-r from-[#121231] to-[#0a0a25] border-blue-500/20"
      }`}
    >
      <div
        className={`relative w-14 h-14 rounded-xl overflow-hidden border shrink-0 ${
          isHighlight
            ? "border-white shadow-[0_0_15px_rgba(255,255,255,0.4)]"
            : "border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.4)]"
        }`}
      >
        <Image
          src={item.img}
          alt={item.name}
          fill
          sizes="56px"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col">
        <span
          className={`font-black text-sm uppercase tracking-tight italic ${
            isHighlight
              ? "text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
              : "text-white"
          }`}
        >
          {item.name}
        </span>
        <span
          className={`font-bold text-xs ${
            isHighlight
              ? "text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]"
              : "text-blue-400"
          }`}
        >
          {item.value}
        </span>
      </div>
    </div>
  );
};

const ConfettiOverlay = ({ active }: { active: boolean }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const piecesRef = useRef<any[]>([]);
  const mxRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // If not active, stop & clear
    if (!active) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      piecesRef.current = [];
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }

    const COUNT = 900;
    const SPEED = 2.75;

    let w = 0;
    let h = 0;
    let dpr = Math.min(2, window.devicePixelRatio || 1);

    const palette: [number, number, number][] = [
      [255, 214, 102],
      [255, 107, 107],
      [116, 185, 255],
      [120, 224, 143],
      [235, 235, 235],
    ];

    const rand = (a: number, b: number) => a + Math.random() * (b - a);
    const pick = <T,>(arr: T[]) => arr[(Math.random() * arr.length) | 0];

    const spriteCache = new Map<string, { img: HTMLCanvasElement; ox: number; oy: number }>();

    const spriteKey = (r: number, g: number, b: number, bw: number, bh: number, blur: number) =>
      `${r},${g},${b}|${bw}x${bh}|${blur}`;

    const makeSprite = (r: number, g: number, b: number, bw: number, bh: number, blur: number) => {
      const pad = blur ? Math.ceil(blur * 3 + 6) : 2;
      const c = document.createElement("canvas");
      c.width = bw + pad * 2;
      c.height = bh + pad * 2;
      const cctx = c.getContext("2d");
      if (!cctx) return { img: c, ox: pad + bw / 2, oy: pad + bh / 2 };

      cctx.clearRect(0, 0, c.width, c.height);

      if (blur) {
        cctx.shadowColor = `rgb(${r},${g},${b})`;
        cctx.shadowBlur = blur;
      }

      cctx.fillStyle = `rgb(${r},${g},${b})`;
      cctx.fillRect(pad, pad, bw, bh);
      cctx.shadowBlur = 0;

      // Subtle paper grain
      const dots = Math.max(18, Math.floor((bw * bh) / 9));
      for (let i = 0; i < dots; i++) {
        const x = (pad + Math.random() * bw) | 0;
        const y = (pad + Math.random() * bh) | 0;
        const v = (Math.random() * 60 - 30) | 0;
        const rr = Math.max(0, Math.min(255, r + v));
        const gg = Math.max(0, Math.min(255, g + v));
        const bb = Math.max(0, Math.min(255, b + v));
        cctx.globalAlpha = 0.14 + Math.random() * 0.26;
        cctx.fillStyle = `rgb(${rr},${gg},${bb})`;
        cctx.fillRect(x, y, 1, 1);
      }
      cctx.globalAlpha = 1;

      return { img: c, ox: pad + bw / 2, oy: pad + bh / 2 };
    };

    const getSprite = (r: number, g: number, b: number, bw: number, bh: number, blur: number) => {
      const key = spriteKey(r, g, b, bw, bh, blur);
      const cached = spriteCache.get(key);
      if (cached) return cached;
      const spr = makeSprite(r, g, b, bw, bh, blur);
      spriteCache.set(key, spr);
      return spr;
    };

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onPointerMove = (e: PointerEvent) => {
      mxRef.current = (e.clientX / Math.max(1, w)) * 2 - 1;
    };

    const makePiece = (init: boolean) => {
      const z = Math.random();
      const layer = z < 0.5 ? 0 : z < 0.85 ? 1 : 2;

      const hero = layer === 2 && Math.random() < 0.35;
      const ultra = layer === 2 && Math.random() < 0.05;
      const floaty = Math.random() < 0.22;

      const insaneFlip = Math.random() < 0.06;
      const fastFlip = !insaneFlip && Math.random() < 0.22;

      const base =
        layer === 0
          ? rand(2, 4)
          : layer === 1
            ? rand(4, 7)
            : ultra
              ? rand(34, 55)
              : hero
                ? rand(18, 28)
                : rand(12, 20);

      const x = rand(-140, w + 140);
      const y = init ? rand(-80, h + 80) : rand(-260, -60);

      const vy =
        layer === 0 ? rand(0.35, 0.85) : layer === 1 ? rand(0.7, 1.35) : rand(1.05, 2.0);

      const vx =
        layer === 0 ? rand(0.1, 0.28) : layer === 1 ? rand(0.16, 0.42) : rand(0.22, 0.62);

      const rgb = pick(palette);
      const r = Math.round(rgb[0] * 0.72);
      const g = Math.round(rgb[1] * 0.72);
      const b = Math.round(rgb[2] * 0.72);

      const aspect = floaty ? rand(1.15, 1.75) : rand(1.0, 1.55);
      const bw = Math.max(2, Math.round(base * rand(0.85, 1.25)));
      const bh = Math.max(3, Math.round(bw * aspect));

      let flipSpeed: number;
      if (insaneFlip) flipSpeed = rand(0.14, 0.26);
      else if (fastFlip) flipSpeed = rand(0.06, 0.12);
      else flipSpeed = rand(0.02, 0.05);

      const blur = ultra ? 3 : 0;
      const spr = getSprite(r, g, b, bw, bh, blur);

      return {
        x,
        y,
        layer,
        hero,
        ultra,
        floaty,
        spr,
        vx,
        vy,
        rot: rand(0, Math.PI * 2),
        vr: rand(-0.02, 0.02) * (layer + 1),
        sway: rand(0, Math.PI * 2),
        swaySpeed: rand(0.01, 0.02),
        drift: rand(0.2, 0.6),
        flip: rand(0, Math.PI * 2),
        flipSpeed,
      };
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove);

    // Seed pieces
    piecesRef.current = Array.from({ length: COUNT }, () => makePiece(true));

    let last = performance.now();

    const draw = (now: number) => {
      const dt = Math.min(0.033, (now - last) / 1000);
      last = now;

      ctx.clearRect(0, 0, w, h);

      const t = now * 0.001;
      const wind = 0.5 + Math.sin(t * 0.35) * 0.18 + mxRef.current * 0.3;

      const pieces = piecesRef.current;

      for (let i = 0; i < pieces.length; i++) {
        const p = pieces[i];
        const depth = p.layer === 0 ? 0.55 : p.layer === 1 ? 0.85 : 1.0;

        p.sway += p.swaySpeed * 60 * dt * SPEED;
        p.flip += p.flipSpeed * 60 * dt * SPEED;

        const floatDrift = Math.sin(p.sway) * p.drift * (p.floaty ? 1.15 : 1.0);
        const fall = p.floaty ? 0.52 + 0.24 * Math.sin(p.sway * 0.9) : 0.85;

        p.x += (wind * depth + floatDrift + p.vx) * 60 * dt * SPEED;
        p.y += p.vy * fall * 60 * dt * SPEED;
        p.rot += p.vr * 60 * dt * SPEED;

        if (p.x < -300) p.x = w + 300;
        if (p.x > w + 300) p.x = -300;
        if (p.y > h + 340) pieces[i] = makePiece(false);

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.scale(0.06 + 0.94 * Math.abs(Math.sin(p.flip)), 1);
        ctx.globalAlpha =
          p.layer === 0 ? 0.16 : p.layer === 1 ? 0.42 : p.ultra ? 0.95 : p.hero ? 0.9 : 0.72;
        ctx.drawImage(p.spr.img, -p.spr.ox, -p.spr.oy);
        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      piecesRef.current = [];
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [active]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-9999 transition-opacity duration-300 ${active ? "opacity-100" : "opacity-0"}`}
    />
  );
};

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [baseFeeds, setBaseFeeds] = useState<FeedItem[]>([]);
  const [loopCount, setLoopCount] = useState(1);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [isFacebookPinned, setIsFacebookPinned] = useState(false);
  const [activeBgImage, setActiveBgImage] = useState<string>(slides[0].image);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [score, setScore] = useState(0);
  const [showFireworks, setShowFireworks] = useState(false);
  const [toastMsg, setToastMsg] = useState<string>("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const facebookSectionRef = useRef<HTMLElement | null>(null);
  const feedEndRef = useRef<HTMLDivElement | null>(null);
  const energyBaseDistanceRef = useRef<number>(0);
  const lastGoodFeedsRef = useRef<FeedItem[]>([]);
  const lastFeedSignatureRef = useRef<string>("");
  const isFetchingMoreRef = useRef(false);
  const [energyOverride, setEnergyOverride] = useState<number | null>(null);
  const energyOverrideRef = useRef<number | null>(null);
  const didTriggerEnergyFullRef = useRef(false);

  const fireworksTimersRef = useRef<{
    hide?: ReturnType<typeof setTimeout>;
    reset?: ReturnType<typeof setTimeout>;
    release?: ReturnType<typeof setTimeout>;
    toast?: ReturnType<typeof setTimeout>;
  }>({});

  const clearFireworksTimers = () => {
    const t = fireworksTimersRef.current;
    if (t.hide) clearTimeout(t.hide);
    if (t.reset) clearTimeout(t.reset);
    if (t.release) clearTimeout(t.release);
    if (t.toast) clearTimeout(t.toast);
    fireworksTimersRef.current = {};
  };

  const setEnergyOverrideSafe = (v: number | null) => {
    energyOverrideRef.current = v;
    setEnergyOverride(v);
  };

  const resetEnergyCycleFromCurrentScroll = () => {
    const el = facebookSectionRef.current;
    if (!el) {
      energyBaseDistanceRef.current = 0;
      setScrollProgress(0);
      didTriggerEnergyFullRef.current = false;
      setEnergyOverrideSafe(null);
      return;
    }

    const rect = el.getBoundingClientRect();
    const pinThreshold = 96;
    const isPinnedNow = rect.top <= pinThreshold;

    if (!isPinnedNow) {
      energyBaseDistanceRef.current = 0;
      setScrollProgress(0);
      didTriggerEnergyFullRef.current = false;
      setEnergyOverrideSafe(null);
      return;
    }

    const currentDistance = Math.abs(rect.top - pinThreshold);
    energyBaseDistanceRef.current = currentDistance;
    setScrollProgress(0);
    didTriggerEnergyFullRef.current = false;
    setEnergyOverrideSafe(null);
  };

  useEffect(() => {
    const onScroll = () => {
      const el = facebookSectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const pinThreshold = 96;

      const isPinned = rect.top <= pinThreshold;
      setIsFacebookPinned(isPinned);

      if (isPinned) {
        const scrolledDistance = Math.abs(rect.top - pinThreshold);
        const sectionHeight = el.scrollHeight;
        const visibleHeight = window.innerHeight;

        const totalScrollableInSection = Math.max(1, sectionHeight - visibleHeight);
        const adjustedDistance = Math.max(0, scrolledDistance - energyBaseDistanceRef.current);
        const progress = Math.min(
          Math.max((adjustedDistance / totalScrollableInSection) * 100, 0),
          100,
        );
        if (energyOverrideRef.current === null) setScrollProgress(progress);
      } else {
        energyBaseDistanceRef.current = 0;
        if (energyOverrideRef.current === null) setScrollProgress(0);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(
      () => setCurrentSlide((p) => (p + 1) % slides.length),
      6000,
    );
    return () => {
      clearInterval(timer);
    };
  }, []);



  // Fetch posts from API (keep old if empty, detect changes)
  const fetchPosts = async () => {
    if (isFetchingMoreRef.current) return;
    isFetchingMoreRef.current = true;
    setIsLoadingPosts(true);

    try {
      if (USE_MOCK_API) {
        // Early return with mock data
        const signature = MOCK_POSTS.map((p) => p.id).join("|");
        lastFeedSignatureRef.current = signature;
        lastGoodFeedsRef.current = MOCK_POSTS;
        setBaseFeeds(MOCK_POSTS);
        setLoopCount(1);
        if (MOCK_POSTS[0]?.image) setActiveBgImage(MOCK_POSTS[0].image);
        return;
      }

      const res = await fetch(`${API_BASE_URL}/posts`, { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      const list = Array.isArray(data)
        ? data
        : Array.isArray(data?.posts)
          ? data.posts
          : [];

      const normalized: FeedItem[] = list
        .filter(Boolean)
        .map((p: any) => ({
          id: typeof p?.id === "string" ? p.id : p?.id?.toString?.() || "",
          title: typeof p?.title === "string" ? p.title : undefined,
          user: String(p?.user ?? ""),
          time: typeof p?.time === "string" ? p.time : undefined,
          likes: p?.likes != null ? String(p.likes) : undefined,
          comments: p?.comments != null ? String(p.comments) : undefined,
          image: p?.image != null ? String(p.image) : undefined,
          content: String(p?.content ?? ""),
        }))
        .filter((p) => p.id && (p.content || p.image));

      // If API returns empty, keep baseFeeds unchanged
      if (normalized.length === 0) {
        // keep baseFeeds unchanged
        return;
      }

      // Detect if content changed (by IDs)
      const signature = normalized.map((p) => p.id).join("|");
      const isNew = signature !== lastFeedSignatureRef.current;

      if (isNew) {
        lastFeedSignatureRef.current = signature;
        lastGoodFeedsRef.current = normalized;
        setBaseFeeds(normalized);
        setLoopCount(1);
        if (normalized[0]?.image) setActiveBgImage(normalized[0].image);
      }
      // If not new, do nothing — caller will extend the loop
    } catch (err: unknown) {
      console.error("❌ โหลดโพสต์จาก API ไม่สำเร็จ", err);
      // keep baseFeeds unchanged
    } finally {
      setIsLoadingPosts(false);
      isFetchingMoreRef.current = false;
    }
  };

  useEffect(() => {
    // Initial load
    if (USE_MOCK_API) {
      const signature = MOCK_POSTS.map((p) => p.id).join("|");
      lastFeedSignatureRef.current = signature;
      lastGoodFeedsRef.current = MOCK_POSTS;
      setBaseFeeds(MOCK_POSTS);
      setLoopCount(1);
      if (MOCK_POSTS[0]?.image) setActiveBgImage(MOCK_POSTS[0].image);
      // Do not call fetchPosts() in mock mode
      return;
    }
    (async () => {
      await fetchPosts();
      // If first fetch had no data, keep empty (will retry on scroll)
    })();
  }, []);

  // When user scrolls to the end of the current feed, try fetching new posts.
  // If there are no new posts, extend the loop so the same content repeats.
  useEffect(() => {
    const el = feedEndRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      async (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;

        // If we have no content yet, try loading.
        if (baseFeeds.length === 0) {
          await fetchPosts();
          // If still empty, keep waiting (will re-trigger)
          return;
        }

        // MOCK mode: loop the same 8 items forever with a short loading delay
        if (USE_MOCK_API) {
          setIsLoadingPosts(true);
          setTimeout(() => {
            setIsLoadingPosts(false);
            resetEnergyCycleFromCurrentScroll();
            setLoopCount((c) => c + 1);
          }, 650);
          return;
        }

        const before = lastFeedSignatureRef.current;
        await fetchPosts();
        const after = lastFeedSignatureRef.current;

        // If nothing new came in, loop the same content again (simulate loading)
        if (before === after) {
          setIsLoadingPosts(true);
          setTimeout(() => {
            setIsLoadingPosts(false);
            resetEnergyCycleFromCurrentScroll();
            setLoopCount((c) => c + 1);
          }, 650);
        }
      },
      {
        root: null,
        rootMargin: "600px 0px", // prefetch/extend before hitting the very bottom
        threshold: 0.01,
      },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [baseFeeds.length]);

  const handleFeedInView = (img?: string) => {
    if (img) setActiveBgImage(img);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const renderPostContent = (text: string) => {
    const clean = (text ?? "").replace(/\r\n/g, "\n");
    const paragraphs = clean
      .split(/\n{2,}/g)
      .map((p) => p.trim())
      .filter(Boolean);

    return paragraphs.map((para, idx) => {
      const lines = para.split(/\n/g);
      return (
        <p key={idx} className="mb-4 last:mb-0 whitespace-pre-wrap">
          {lines.map((line, i) => (
            <React.Fragment key={i}>
              {line}
              {i < lines.length - 1 ? <br /> : null}
            </React.Fragment>
          ))}
        </p>
      );
    });
  };

  const repeatedFeeds = baseFeeds.length
    ? Array.from({ length: loopCount }, (_, copyIdx) =>
        baseFeeds.map((post) => ({ post, key: `${post.id}__${copyIdx}` })),
      ).flat()
    : [];

  const energyProgress = energyOverride !== null ? energyOverride : scrollProgress;

  useEffect(() => {
    // Trigger once when energy reaches 100% then reset back to 0%
    if (energyProgress >= 100 && !didTriggerEnergyFullRef.current) {
      didTriggerEnergyFullRef.current = true;

      // Clear any previous timers so we don't get stuck in an active state
      clearFireworksTimers();

      // Optional UI feedback
      setToastMsg("พลังงานเต็ม 100% — รีเซ็ตใหม่!");
      setShowFireworks(true);

      // Force the bar to 100% momentarily, then reset to 0%
      setEnergyOverrideSafe(100);

      // Capture current scroll distance as baseline so next cycle starts from 0 smoothly
      const el = facebookSectionRef.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const pinThreshold = 96;
        const currentDistance = Math.abs(rect.top - pinThreshold);
        energyBaseDistanceRef.current = currentDistance;
      }

      // IMPORTANT: Do NOT return a cleanup tied to energyProgress changes.
      // EnergyProgress will change several times during the reset sequence.
      fireworksTimersRef.current.hide = setTimeout(() => setShowFireworks(false), 2200);
      fireworksTimersRef.current.reset = setTimeout(() => setEnergyOverrideSafe(0), 2300);
      fireworksTimersRef.current.release = setTimeout(() => setEnergyOverrideSafe(null), 3000);
      fireworksTimersRef.current.toast = setTimeout(() => setToastMsg(""), 3200);
    }

    // Allow triggering again after we've reset and energy is low
    if (energyProgress <= 5 && didTriggerEnergyFullRef.current) {
      didTriggerEnergyFullRef.current = false;
    }
  }, [energyProgress]);

  useEffect(() => {
    return () => {
      clearFireworksTimers();
    };
  }, []);

  return (
    <div
      className={`min-h-screen bg-white transition-colors duration-1000 text-black font-sans overflow-x-hidden selection:bg-black selection:text-white`}
    >
      {/* --- Header --- */}
      <header className="absolute top-0 left-0 w-full z-100 flex items-center justify-between px-6 py-6 md:px-12">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-black tracking-tighter uppercase leading-none">
            <span className="font-light">REVIEW</span>
            <span className="px-1">NEWS</span>
            <span className="font-light">BRAND</span>
          </span>
        </div>

        <div className="flex items-center gap-4">
          <button className="bg-white/10 backdrop-blur-md p-2.5 rounded-full border border-white/20">
            <Phone size={20} />
          </button>
        </div>
      </header>

      {/* --- Main Banner Section --- */}
      <section
        className={`relative w-full h-screen overflow-hidden flex items-center justify-center ${slides[currentSlide].bgColor}`}
      >
        <div className="absolute inset-x-6 z-90 flex justify-between pointer-events-none top-1/2 -translate-y-1/2">
          <button
            onClick={prevSlide}
            className="w-14 h-14 rounded-full border border-white/20 bg-black/10 backdrop-blur-md flex items-center justify-center pointer-events-auto hover:bg-white hover:text-black transition-all active:scale-90"
          >
            <ChevronLeft size={28} />
          </button>
          <button
            onClick={nextSlide}
            className="w-14 h-14 rounded-full border border-white/20 bg-black/10 backdrop-blur-md flex items-center justify-center pointer-events-auto hover:bg-white hover:text-black transition-all active:scale-90"
          >
            <ChevronRight size={28} />
          </button>
        </div>

        <div className="relative w-full h-full">
          {slides.map((slide, index) => {
            const isActive = index === currentSlide;
            return (
              <div
                key={slide.id}
                className={`absolute inset-0 w-full h-full flex items-center justify-center transition-all duration-1000 ease-in-out ${isActive ? "opacity-100" : "opacity-0 pointer-events-none"}`}
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10 select-none pointer-events-none text-center">
                  <div
                    className={`transition-all duration-1000 ease-out ${isActive ? "scale-100 opacity-25" : "scale-90 opacity-0"}`}
                  >
                    <h1
                      className="text-[16vw] lg:text-[16rem] font-black italic tracking-tighter leading-[0.75] uppercase"
                      style={{ color: slide.accentColor }}
                    >
                      {slide.titleTop}
                      <br />
                      {slide.titleBottom}
                    </h1>
                  </div>
                </div>
                <div
                  className={`absolute inset-0 z-20 transition-all duration-1000 ease-in-out ${isActive ? "scale-100 opacity-100" : "scale-105 opacity-0"}`}
                >
                  <Image
                    src={slide.image}
                    alt={slide.titleTop}
                    fill
                    sizes="100vw"
                    className="object-cover"
                    priority={isActive}
                  />
                  <div className="absolute inset-0 bg-black/40" />
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center z-30 select-none pointer-events-none text-center">
                  <div
                    className={`transition-all duration-1000 ease-out ${isActive ? "scale-100" : "scale-110"}`}
                  >
                    <h1
                      className="text-[16vw] lg:text-[16rem] font-black italic tracking-tighter leading-[0.75] uppercase outline-text"
                      style={
                        {
                          "--outline-color": slide.accentColor,
                        } as React.CSSProperties
                      }
                    >
                      {slide.titleTop}
                      <br />
                      {slide.titleBottom}
                    </h1>
                  </div>
                </div>
                <div
                  className={`absolute bottom-[12%] z-50 w-full max-w-350 px-12 flex flex-col md:flex-row items-end justify-between gap-6 transition-all duration-1000 delay-500 ${isActive ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
                >
                  <div className="text-left md:max-w-md">
                    <p
                      className="font-black text-lg italic tracking-[0.25em] uppercase mb-3"
                      style={{ color: slide.accentColor }}
                    >
                      {slide.tagline}
                    </p>
                    <p className="text-white/70 text-sm font-medium leading-relaxed">
                      {slide.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-5">
                    <button className="px-8 py-4 bg-white text-black rounded-full font-black uppercase text-[10px] tracking-widest hover:scale-105 transition-transform shadow-xl">
                      Explore Project
                    </button>
                    <div className="relative group cursor-pointer">
                      <div
                        className="absolute inset-0 rounded-full blur-lg opacity-40 transition-all group-hover:opacity-70"
                        style={{ backgroundColor: slide.accentColor }}
                      />
                      <button
                        className="relative w-14 h-14 rounded-full flex items-center justify-center text-black shadow-2xl transition-transform group-hover:scale-110"
                        style={{ backgroundColor: slide.accentColor }}
                      >
                        <Play
                          fill="currentColor"
                          size={18}
                          className="ml-0.5"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="absolute bottom-28 left-1/2 -translate-x-1/2 z-100 flex gap-2.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-1 transition-all duration-500 rounded-full ${i === currentSlide ? "w-12" : "w-3 bg-white/20"}`}
              style={{
                backgroundColor:
                  i === currentSlide ? slides[currentSlide].accentColor : "",
              }}
            />
          ))}
        </div>
      </section>

      {/* --- Skewed Scrolling Ticker --- */}
      <div className="relative z-110 -mt-20 mb-10">
        <div
          className="w-[110%] -left-[5%] relative border-y border-black/5 overflow-hidden shadow-2xl transition-colors duration-1000 transform rotate-2 origin-left"
          style={{ backgroundColor: slides[currentSlide].accentColor }}
        >
          <div className="flex w-max animate-ticker py-6">
            <TickerContent />
            <TickerContent />
            <TickerContent />
          </div>
        </div>
      </div>

      {/* --- WHO WE ARE SECTION (New Element) --- */}
      <section className="relative w-full pt-28 pb-10 -mt-8 overflow-hidden bg-white text-black">
        {/* Background Image Container */}
        <div className="absolute inset-0 z-0 opacity-10">
          <Image
            src="https://pai.nomadenstudio.com/aurelia/wp-content/uploads/sites/6/2024/11/smiling-young-african-woman-working-online-with-a-3M7W2SX-1024x683.jpg"
            alt="bg"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>

        <div className="relative z-10 max-w-350 mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content (Text and Icons) */}
            <div className="lg:col-span-6 flex flex-col gap-8">
              <div className="flex items-center gap-4">
                <Image
                  src="https://pai.nomadenstudio.com/aurelia/wp-content/uploads/sites/6/2024/11/2-PNG.png"
                  width={60}
                  height={60}
                  alt="logo"
                />
                <span className="text-xs font-black tracking-[0.4em] uppercase text-gray-400">
                  Who We Are
                </span>
              </div>

              <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter leading-tight uppercase">
                Creativity meets{" "}
                <span style={{ color: slides[currentSlide].accentColor }}>
                  Strategy.
                </span>
              </h2>

              <p className="text-gray-600 text-lg leading-relaxed max-w-xl">
                With a team of passionate designers, marketers, and innovators,
                we specialize in delivering unique solutions that elevate your
                brand and captivate your audience.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div className="flex items-center gap-4 p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-xl transition-all group">
                  <div className="w-16 h-16 shrink-0 rounded-xl flex items-center justify-center bg-white shadow-md group-hover:scale-110 transition-transform">
                    <Image
                      src="https://pai.nomadenstudio.com/aurelia/wp-content/uploads/sites/6/2024/11/2-PNG.png"
                      width={40}
                      height={40}
                      alt="icon"
                    />
                  </div>
                  <h4 className="font-black text-xs uppercase tracking-widest leading-tight">
                    Over 10 Years of Experience
                  </h4>
                </div>

                <div className="flex items-center gap-4 p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-xl transition-all group">
                  <div className="w-16 h-16 shrink-0 rounded-xl flex items-center justify-center bg-white shadow-md group-hover:scale-110 transition-transform">
                    <Image
                      src="https://pai.nomadenstudio.com/aurelia/wp-content/uploads/sites/6/2024/11/2-PNG.png"
                      width={40}
                      height={40}
                      alt="icon"
                    />
                  </div>
                  <h4 className="font-black text-xs uppercase tracking-widest leading-tight">
                    Trusted by Global Brands
                  </h4>
                </div>
              </div>
            </div>

            {/* Middle Spacer/Decoration */}
            <div className="hidden lg:block lg:col-span-1 relative h-full">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gray-100"></div>
            </div>

            {/* Right Content (Progress and Images) */}
            <div className="lg:col-span-5 flex flex-col gap-10">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://pai.nomadenstudio.com/aurelia/wp-content/uploads/sites/6/2024/11/smiling-young-african-woman-working-online-with-a-3M7W2SX-1024x683.jpg"
                  width={1200}
                  height={900}
                  className="w-full h-auto object-cover"
                  alt="team"
                />
                <div className="absolute bottom-6 right-6 w-32 h-32 bg-white p-2 rounded-2xl shadow-2xl animate-bounce-slow">
                  <Image
                    src="https://pai.nomadenstudio.com/aurelia/wp-content/uploads/sites/6/2024/11/Png-1-1.png"
                    width={128}
                    height={128}
                    className="w-full h-full object-contain"
                    alt="badge"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-6">
                {[
                  { title: "Successful Campaign Launches", value: 95 },
                  { title: "Innovative Design", value: 85 },
                  { title: "High Impact Project", value: 100 },
                ].map((skill, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex justify-between items-end">
                      <span className="text-[10px] font-black uppercase tracking-widest">
                        {skill.title}
                      </span>
                      <span className="text-sm font-black italic">
                        {skill.value}%
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full transition-all duration-1000 delay-300"
                        style={{
                          width: `${skill.value}%`,
                          backgroundColor: slides[currentSlide].accentColor,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-gray-400 text-xs italic">
                Consectetuer adipiscing congue aptent placera senec efficitur
                aptent malesuada sit conubia tincidunt iaculis
              </p>

              <button className="group flex items-center gap-3 w-fit px-8 py-4 rounded-full bg-black text-white font-black uppercase text-[10px] tracking-widest hover:scale-105 transition-all shadow-xl">
                About Us{" "}
                <ChevronRightCircle
                  size={18}
                  style={{ color: slides[currentSlide].accentColor }}
                />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Promotion Announcement Section */}
      <section
        className={`w-full py-10 overflow-hidden transition-colors duration-1000 relative ${isDarkMode ? "bg-black" : "bg-[#F0F2F5]"}`}
      >
        <div className="relative z-10">
          {/* Row 1: Leftward Scroll */}
          <div className="flex w-full mb-8 overflow-hidden group">
            <div className="flex gap-6 animate-scroll-left hover:pause">
              {[...promoList1, ...promoList1, ...promoList1].map(
                (item, idx) => (
                  <PromoCard key={idx} item={item} />
                ),
              )}
            </div>
          </div>

          {/* Row 2: Rightward Scroll */}
          <div className="flex w-full overflow-hidden group">
            <div className="flex gap-6 animate-scroll-right hover:pause">
              {[...promoList2, ...promoList2, ...promoList2].map(
                (item, idx) => (
                  <PromoCard key={idx} item={item} />
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Facebook Style Layout */}
      <section
        ref={facebookSectionRef}
        className="relative w-full min-h-screen"
      >
        {/* Fireworks burst when energy reaches 100% (every 2 loops) */}
        <ConfettiOverlay active={showFireworks} />

        {/* Score toast bottom-right */}
        {toastMsg ? (
          <div className="fixed bottom-6 right-6 z-9999">
            <div
              className={`px-5 py-4 rounded-2xl shadow-2xl border backdrop-blur-xl max-w-xs ${
                isDarkMode
                  ? "bg-black/50 border-white/15 text-white"
                  : "bg-white/70 border-black/10 text-black"
              }`}
            >
              <p className="font-black text-[10px] uppercase tracking-[0.25em] opacity-70 mb-1">
                Reward
              </p>
              <p className="font-bold text-sm leading-snug">{toastMsg}</p>
              <p className="mt-2 text-[11px] font-black opacity-70">
                คะแนนรวม: {score}
              </p>
            </div>
          </div>
        ) : null}
        {/* Plain background for feed */}
        <div className="absolute inset-0 bg-white" />

        <div
          className={`relative z-10 max-w-7xl mx-auto px-4 pt-16 flex gap-8 pb-32 transition-all duration-500`}
        >
          {/* Left Sidebar - Bottom Footer with Search & Mode Switch only */}
          <aside
            className={`${isFacebookPinned ? "lg:flex flex-col w-64 shrink-0 fixed top-24 left-10 h-[calc(100vh-120px)] z-50" : "hidden"}`}
          >
            {/* Bottom Footer with Search & Mode Switch pushed to bottom */}
            <div className="mt-auto flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <button
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all shadow-xl border border-white/30 backdrop-blur-xl active:scale-90 ${isDarkMode ? "bg-white/10 text-white" : "bg-white/50 text-black"}`}
                >
                  <Search size={22} />
                </button>
                {/* <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className={`flex-1 h-14 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-xl border border-white/30 backdrop-blur-xl active:scale-95 font-black text-[10px] uppercase tracking-[0.2em] ${isDarkMode ? "bg-white/10 text-white" : "bg-black/10 text-black"}`}
                >
                  {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                  {isDarkMode ? "Light" : "Dark"}
                </button> */}
              </div>
              <div
                className={`px-2 font-black text-[9px] uppercase tracking-[0.3em] italic opacity-50 ${isDarkMode ? "text-white" : "text-black"}`}
              >
                © REVIEW NEWS BRAND
              </div>
            </div>
          </aside>

          {/* Main Feed */}
          <main className="flex-1 max-w-2xl mx-auto flex flex-col gap-10">
            {repeatedFeeds.map(({ post, key }) => (
              <div
                key={key}
                onMouseEnter={() => handleFeedInView(post.image)}
                className={`group relative backdrop-blur-2xl rounded-2xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border overflow-hidden transition-all duration-500 ${isDarkMode ? "bg-white/5 border-white/10" : "bg-white/20 border-white/40"}`}
              >
                <div className="p-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center border shadow-inner ${isDarkMode ? "bg-black border-white/20" : "bg-linear-to-br from-white to-gray-200/50 border-white"}`}
                    >
                      <User
                        className={
                          isDarkMode ? "text-white/40" : "text-gray-600"
                        }
                        size={24}
                      />
                    </div>
                    <div>
                      <h3
                        className={`font-black text-base leading-none mb-1 tracking-tight ${isDarkMode ? "text-white" : "text-black"}`}
                      >
                        {post.user}
                      </h3>
                      <p
                        className={`text-[11px] font-bold uppercase tracking-wider ${isDarkMode ? "text-white/40" : "text-gray-600/70"}`}
                      >
                        {post.time} • Public
                      </p>
                    </div>
                  </div>
                  <button className="text-gray-500 p-3 rounded-2xl transition-colors">
                    <MoreHorizontal size={20} />
                  </button>
                </div>

                <div className="px-6 pb-4">
                  <div
                    className={`text-[15px] font-medium leading-7 ${isDarkMode ? "text-white/80" : "text-black/80"}`}
                  >
                    {renderPostContent(post.content)}
                  </div>
                </div>

                {post.image ? (
                  <div className="mx-6 mb-6 rounded-2xl overflow-hidden shadow-2xl relative aspect-4/3 transition-all">
                    <Image
                      src={post.image}
                      alt="post"
                      fill
                      sizes="(max-width: 1024px) 100vw, 768px"
                      className="object-cover transform transition-transform duration-700"
                    />
                  </div>
                ) : null}

                <div
                  className={`px-8 py-4 flex justify-between items-center border-t text-xs font-black uppercase tracking-widest bg-white/5 ${isDarkMode ? "text-white/60 border-white/10" : "text-gray-700/80 border-white/20"}`}
                >
                  <div className="flex items-center gap-2">
                    <div className="bg-linear-to-tr from-red-500 to-pink-500 p-1.5 rounded-full shadow-lg shadow-red-500/20">
                      <Heart size={10} className="fill-white text-white" />
                    </div>
                    <span>{post.likes ?? "0"} Likes</span>
                  </div>
                  <span className="opacity-60">
                    {post.comments ?? "0"} Comments
                  </span>
                </div>

                <div className="px-3 py-2 flex gap-2">
                  {[
                    { icon: Heart, label: "Like" },
                    { icon: MessageCircle, label: "Comment" },
                    { icon: Send, label: "Share" },
                  ].map((action, i) => (
                    <button
                      key={i}
                      className={`flex-1 py-4 font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-95 ${isDarkMode ? "text-white" : "text-gray-800"}`}
                    >
                      <action.icon size={18} /> {action.label}{" "}
                      {i === 2 ? (scrollProgress > 95 ? "🚀" : "") : ""}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            {isLoadingPosts ? (
              <div className="py-20 flex justify-center">
                <div
                  className={`w-10 h-10 border-4 border-t-black rounded-full animate-spin ${isDarkMode ? "border-white/10 border-t-white" : "border-black/10 border-t-black"}`}
                ></div>
              </div>
            ) : null}
            <div ref={feedEndRef} className="h-1" />
          </main>

          {/* Right Sidebar - Vertical Energy Charging Bar */}
          <aside
            className={`${isFacebookPinned ? "lg:block w-64 shrink-0 fixed top-24 right-10 h-[calc(100vh-120px)] z-50" : "hidden"}`}
          >
            <div
              className={`h-125 w-24 backdrop-blur-2xl rounded-full border shadow-2xl relative overflow-hidden flex flex-col justify-end p-2 mx-auto ${isDarkMode ? "bg-white/5 border-white/20" : "bg-white/10 border-white/30"}`}
            >
              {/* Background Groove */}
              <div className="absolute inset-0 bg-black/10 shadow-inner rounded-full" />

              {/* Charging Fill */}
              <div
                className="w-full rounded-full transition-all duration-300 ease-out relative"
                style={{
                  height: `${energyProgress}%`,
                  background: `linear-gradient(to top, #3b82f6, #8b5cf6, #ec4899)`,
                  boxShadow:
                    energyProgress > 5
                      ? `0 0 40px ${energyProgress > 70 ? "#ec4899" : "#8b5cf6"}`
                      : "none",
                }}
              >
                {/* Shimmer Effect */}
                <div className="absolute inset-0 bg-linear-to-t from-transparent via-white/40 to-transparent animate-shimmer" />

                {/* Energy Particles */}
                {energyProgress > 5 && (
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 opacity-90 scale-125 z-20">
                    <Zap
                      className={`text-white fill-white ${energyProgress > 90 ? "animate-ping" : "animate-pulse"}`}
                      size={32}
                    />
                  </div>
                )}
              </div>

              {/* Energy Percentage Display */}
              <div className="absolute bottom-12 left-0 w-full text-center z-30">
                <span
                  className={`font-black text-2xl drop-shadow-md italic transition-colors duration-500 ${energyProgress > 50 || isDarkMode ? "text-white" : "text-black/60"}`}
                >
                  {Math.round(energyProgress)}%
                </span>
                <p
                  className={`text-[9px] font-bold uppercase tracking-[0.2em] mt-1 ${energyProgress > 50 || isDarkMode ? "text-white/70" : "text-black/40"}`}
                >
                  Charged
                </p>
              </div>

              {/* Bar Label */}
              <div className="absolute top-12 left-0 w-full text-center pointer-events-none opacity-30">
                <p
                  className={`font-black text-[10px] uppercase tracking-[0.4em] rotate-180 [writing-mode:vertical-lr] ${isDarkMode ? "text-white" : "text-black"}`}
                >
                  Energy System
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <style>{`
        @keyframes ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-33.33%); } }
        .animate-ticker { animation: ticker 40s linear infinite; }
        
        @keyframes scroll-left { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes scroll-right { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
        .animate-scroll-left { animation: scroll-left 50s linear infinite; }
        .animate-scroll-right { animation: scroll-right 50s linear infinite; }
        .hover\\:pause:hover { animation-play-state: paused; }

        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        /* Animated Rainbow Background Style */
        .rainbow-bg {
          background: linear-gradient(
            45deg, 
            #f09433 0%, #e6683c 15%, #dc2743 30%, #cc2366 45%, #bc1888 60%, #8a3ab9 75%, #4c68d7 100%
          );
          background-size: 400% 400%;
        }
        
        @keyframes rainbow-flow {
          0% { background-position: 0% 50%; filter: brightness(1.1); }
          50% { background-position: 100% 50%; filter: brightness(1.3); }
          100% { background-position: 0% 50%; filter: brightness(1.1); }
        }
        
        @keyframes rainbow-flash {
          0%, 100% { filter: brightness(1) contrast(1.1); opacity: 1; }
          50% { filter: brightness(1.3) contrast(1.2); opacity: 0.9; }
        }

        @keyframes shimmer {
          0% { transform: translateY(100%); }
          100% { transform: translateY(-100%); }
        }
        .animate-shimmer {
          animation: shimmer 1.5s linear infinite;
        }

        .animate-rainbow-flow {
          animation: rainbow-flow 4s ease infinite, rainbow-flash 2s ease-in-out infinite;
        }

        .outline-text {
          -webkit-text-stroke: 1.5px var(--outline-color, #FF0000);
          color: transparent;
        }
        @media (min-width: 1024px) {
          .outline-text { -webkit-text-stroke: 3px var(--outline-color, #FF0000); }
        }

        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        .animate-bounce-slow { animation: bounce-slow 4s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
