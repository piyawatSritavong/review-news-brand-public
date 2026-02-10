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
  id: number;
  title: string;
  user: string;
  time: string;
  likes: string;
  comments: string;
  image: string;
  content: string;
  uniqueId: number;
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

const promoList1: PromoItem[] = [
  {
    name: "Leighton Kramer",
    value: "276.7 Eth",
    img: "https://i.pravatar.cc/150?u=1",
  },
  {
    name: "Haylie Arcand",
    value: "345.6 Eth",
    img: "https://i.pravatar.cc/150?u=2",
    isHighlight: true,
  },
  {
    name: "Bowen Higgins",
    value: "323.7 Eth",
    img: "https://i.pravatar.cc/150?u=3",
  },
  {
    name: "Saige Fuentes",
    value: "347.7 Eth",
    img: "https://i.pravatar.cc/150?u=4",
  },
  {
    name: "Sophie Mclain",
    value: "230.6 Eth",
    img: "https://i.pravatar.cc/150?u=5",
  },
];

const promoList2: PromoItem[] = [
  {
    name: "Jeremy Burch",
    value: "267.9 Eth",
    img: "https://i.pravatar.cc/150?u=6",
  },
  {
    name: "Amelie Griffith",
    value: "334.1 Eth",
    img: "https://i.pravatar.cc/150?u=7",
  },
  {
    name: "Isabela Hart",
    value: "289.1 Eth",
    img: "https://i.pravatar.cc/150?u=8",
  },
  {
    name: "Diego Bentley",
    value: "290.7 Eth",
    img: "https://i.pravatar.cc/150?u=9",
  },
  {
    name: "Daisy Arnold",
    value: "265.4 Eth",
    img: "https://i.pravatar.cc/150?u=10",
  },
];

const baseFeedData = [
  {
    id: 1,
    title: "บ้านโมเดิร์น 2024 เน้นพื้นที่สีเขียว",
    user: "ArchDesign",
    time: "1 วัน",
    likes: "2.3k",
    comments: "310",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800",
    content: "เทรนด์การออกแบบปีนี้เน้นความยั่งยืนและการนำธรรมชาติเข้ามาในบ้าน",
  },
  {
    id: 2,
    title: "นวดสปาผ่อนคลายที่ ME AURA ดีมาก!",
    user: "RelaxQueen",
    time: "5 ชม.",
    likes: "850",
    comments: "45",
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800",
    content: "แนะนำเลยค่ะ ใครทำงานหนักๆ มานวดที่นี่คือจบ สบายตัวสุดๆ",
  },
  {
    id: 3,
    title: "รีวิวแต่งบ้านสไตล์มินิมอล งบประหยัด",
    user: "HomeDecor_TH",
    time: "2 ชม.",
    likes: "1.2k",
    comments: "128",
    image:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=800",
    content:
      "วันนี้มาแชร์ไอเดียแต่งห้องรับแขกใหม่ครับ ใช้งบไม่เยอะแต่ดูแพงมาก!",
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

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [visibleFeeds, setVisibleFeeds] = useState<FeedItem[]>([]);
  const [isFacebookPinned, setIsFacebookPinned] = useState(false);
  const [activeBgImage, setActiveBgImage] = useState(baseFeedData[0].image);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const facebookSectionRef = useRef<HTMLElement | null>(null);

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

        const totalScrollableInSection = sectionHeight - visibleHeight;
        const progress = Math.min(
          Math.max((scrolledDistance / totalScrollableInSection) * 100, 0),
          100,
        );
        setScrollProgress(progress);
      } else {
        setScrollProgress(0);
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

  useEffect(() => {
    const loadMore = () => {
      setVisibleFeeds((prev) => {
        const nextBatch = baseFeedData.map((item) => ({
          ...item,
          uniqueId: Math.random(),
        }));
        return [...prev, ...nextBatch];
      });
    };
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore();
      },
      { threshold: 0.1 },
    );
    if (loaderRef.current) observer.observe(loaderRef.current);
    loadMore();
    return () => observer.disconnect();
  }, []);

  const handleFeedInView = (img: string) => {
    setActiveBgImage(img);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div
      className={`min-h-screen bg-[#F0F2F5] transition-colors duration-1000 text-white font-sans overflow-x-hidden selection:bg-black selection:text-white`}
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
            <Phone
              size={20}
            />
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
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
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
        {/* Dynamic Blurred Background Layer */}
        <div className="absolute inset-0 transition-all duration-1000 ease-in-out transform scale-110 pointer-events-none">
          <Image
            src={activeBgImage}
            alt="section-bg"
            fill
            sizes="100vw"
            className="object-cover blur-[100px] opacity-40"
          />
          <div
            className={`absolute inset-0 backdrop-blur-3xl ${isDarkMode ? "bg-black/60" : "bg-white/30"}`}
          />
        </div>

        <div
          className={`relative z-10 max-w-7xl mx-auto px-4 pt-16 flex gap-8 pb-32 transition-all duration-500 ${isFacebookPinned ? "lg:px-32" : ""}`}
        >
          {/* Left Sidebar - Bottom Footer with Search & Mode Switch only */}
          <aside
            className={`hidden lg:flex flex-col w-64 shrink-0 ${isFacebookPinned ? "fixed top-24 left-10 h-[calc(100vh-120px)] z-50" : "sticky top-24 h-[calc(100vh-120px)] z-10"}`}
          >
            {/* Bottom Footer with Search & Mode Switch pushed to bottom */}
            <div className="mt-auto flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <button
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all shadow-xl border border-white/30 backdrop-blur-xl active:scale-90 ${isDarkMode ? "bg-white/10 text-white" : "bg-white/50 text-black"}`}
                >
                  <Search size={22} />
                </button>
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className={`flex-1 h-14 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-xl border border-white/30 backdrop-blur-xl active:scale-95 font-black text-[10px] uppercase tracking-[0.2em] ${isDarkMode ? "bg-white/10 text-white" : "bg-black/10 text-black"}`}
                >
                  {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                  {isDarkMode ? "Light" : "Dark"}
                </button>
              </div>
              <div
                className={`px-2 font-black text-[9px] uppercase tracking-[0.3em] italic opacity-50 ${isDarkMode ? "text-white" : "text-black"}`}
              >
                © 2026 KP Group
              </div>
            </div>
          </aside>

          {/* Main Feed */}
          <main className="flex-1 max-w-2xl mx-auto flex flex-col gap-10">
            {visibleFeeds.map((post) => (
              <div
                key={post.uniqueId}
                onMouseEnter={() => handleFeedInView(post.image)}
                className={`group relative backdrop-blur-2xl rounded-[2.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border overflow-hidden transition-all duration-500 hover:scale-[1.02] ${isDarkMode ? "bg-white/5 border-white/10 hover:bg-white/10" : "bg-white/20 border-white/40 hover:bg-white/30"}`}
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
                  <button className="text-gray-500 p-3 hover:bg-white/50 rounded-2xl transition-colors">
                    <MoreHorizontal size={20} />
                  </button>
                </div>

                <div className="px-6 pb-4">
                  <p
                    className={`text-[15px] font-medium leading-relaxed italic ${isDarkMode ? "text-white/80" : "text-black/80"}`}
                  >
                    {post.content}
                  </p>
                </div>

                <div className="mx-6 mb-6 rounded-4xl overflow-hidden shadow-2xl relative aspect-4/3 group-hover:shadow-white/20 transition-all">
                  <Image
                    src={post.image}
                    alt="post"
                    fill
                    sizes="(max-width: 1024px) 100vw, 768px"
                    className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                </div>

                <div
                  className={`px-8 py-4 flex justify-between items-center border-t text-xs font-black uppercase tracking-widest bg-white/5 ${isDarkMode ? "text-white/60 border-white/10" : "text-gray-700/80 border-white/20"}`}
                >
                  <div className="flex items-center gap-2">
                    <div className="bg-linear-to-tr from-red-500 to-pink-500 p-1.5 rounded-full shadow-lg shadow-red-500/20">
                      <Heart size={10} className="fill-white text-white" />
                    </div>
                    <span>{post.likes} Likes</span>
                  </div>
                  <span className="opacity-60">{post.comments} Comments</span>
                </div>

                <div className="px-3 py-2 flex gap-2">
                  {[
                    { icon: Heart, label: "Like" },
                    { icon: MessageCircle, label: "Comment" },
                    { icon: Send, label: "Share" },
                  ].map((action, i) => (
                    <button
                      key={i}
                      className={`flex-1 py-4 font-black text-[10px] uppercase tracking-[0.2em] rounded-3xl flex items-center justify-center gap-3 transition-all active:scale-95 ${isDarkMode ? "text-white hover:bg-white/10" : "text-gray-800 hover:bg-white/40"}`}
                    >
                      <action.icon size={18} /> {action.label}{" "}
                      {i === 2 ? (scrollProgress > 95 ? "🚀" : "") : ""}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            <div ref={loaderRef} className="py-20 flex justify-center">
              <div
                className={`w-10 h-10 border-4 border-t-black rounded-full animate-spin ${isDarkMode ? "border-white/10 border-t-white" : "border-black/10 border-t-black"}`}
              ></div>
            </div>
          </main>

          {/* Right Sidebar - Vertical Energy Charging Bar */}
          <aside
            className={`hidden lg:block w-72 shrink-0 ${isFacebookPinned ? "fixed top-24 right-10 z-50" : "sticky top-24 h-[calc(100vh-160px)] z-10"}`}
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
                  height: `${scrollProgress}%`,
                  background: `linear-gradient(to top, #3b82f6, #8b5cf6, #ec4899)`,
                  boxShadow:
                    scrollProgress > 5
                      ? `0 0 40px ${scrollProgress > 70 ? "#ec4899" : "#8b5cf6"}`
                      : "none",
                }}
              >
                {/* Shimmer Effect */}
                <div className="absolute inset-0 bg-linear-to-t from-transparent via-white/40 to-transparent animate-shimmer" />

                {/* Energy Particles */}
                {scrollProgress > 5 && (
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 opacity-90 scale-125 z-20">
                    <Zap
                      className={`text-white fill-white ${scrollProgress > 90 ? "animate-ping" : "animate-pulse"}`}
                      size={32}
                    />
                  </div>
                )}
              </div>

              {/* Energy Percentage Display */}
              <div className="absolute bottom-12 left-0 w-full text-center z-30">
                <span
                  className={`font-black text-2xl drop-shadow-md italic transition-colors duration-500 ${scrollProgress > 50 || isDarkMode ? "text-white" : "text-black/60"}`}
                >
                  {Math.round(scrollProgress)}%
                </span>
                <p
                  className={`text-[9px] font-bold uppercase tracking-[0.2em] mt-1 ${scrollProgress > 50 || isDarkMode ? "text-white/70" : "text-black/40"}`}
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
