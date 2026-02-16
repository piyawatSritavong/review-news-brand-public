"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import { Kanit } from "next/font/google";
import {
  Bookmark,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Send,
} from "lucide-react";

const kanit = Kanit({
  subsets: ["thai", "latin"],
  weight: ["300", "400", "600"],
});

const HERO_GIF =
  "https://cdn.dribbble.com/userupload/28278224/file/original-f03004725755819f9e58feea7e324e31.gif";

type Post = {
  id: string;
  name: string;
  username: string;
  isPet: boolean;
  likes: number;
  avatarUrl: string;
  imageUrl: string;
};

const NAMES = [
  "M-Boy",
  "Q-Girl",
  "Chill Guy",
  "Lu-Hu",
  "Skater",
  "Artist",
  "Gamer",
  "Baker",
];
const SEEDS = [
  "Felix",
  "Luna",
  "Bear",
  "Tiger",
  "Oliver",
  "Maya",
  "Jack",
  "Sarah",
];

function randomPick<T>(arr: T[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}
function makeId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function useLockOnScroll(scrollThreshold = 150) {
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsLocked(window.scrollY >= scrollThreshold);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollThreshold]);

  return { isLocked };
}

function useInfinitePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [justAddedIds, setJustAddedIds] = useState<Set<string>>(new Set());

  const createPost = useCallback((): Post => {
    const name = randomPick(NAMES);
    const seed = `${randomPick(SEEDS)}-${Math.random()}`;
    const username = name.toLowerCase().replace(/\s+/g, "_");
    const isPet = name === "Lu-Hu";
    const likes = Math.floor(Math.random() * 5000) + 100;

    const avatarUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}`;
    const imageUrl = `https://api.dicebear.com/7.x/${isPet ? "bottts" : "adventurer"}/svg?seed=${encodeURIComponent(seed)}`;

    return {
      id: makeId(),
      name,
      username,
      isPet,
      likes,
      avatarUrl,
      imageUrl,
    };
  }, []);

  const loadMore = useCallback(
    (count = 2) => {
      const next = Array.from({ length: count }, () => createPost());
      setPosts((prev) => [...prev, ...next]);

      // ทำ animation แบบ “ค่อย ๆ โผล่” โดย mark ว่าเพิ่งเพิ่ม
      setJustAddedIds((prev) => {
        const copy = new Set(prev);
        next.forEach((p) => copy.add(p.id));
        return copy;
      });

      // เคลียร์สถานะ “เพิ่งเพิ่ม” หลัง animation จบ
      window.setTimeout(() => {
        setJustAddedIds((prev) => {
          const copy = new Set(prev);
          next.forEach((p) => copy.delete(p.id));
          return copy;
        });
      }, 1000);
    },
    [createPost],
  );

  useEffect(() => {
    // initial
    loadMore(4);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { posts, loadMore, justAddedIds };
}

export default function Home() {
  const { isLocked } = useLockOnScroll(150);
  const { posts, loadMore, justAddedIds } = useInfinitePosts();

  const feedRef = useRef<HTMLDivElement | null>(null);

  // ถ้ากลับมาไม่ locked ให้รีเซ็ต scroll ใน feed
  useEffect(() => {
    if (!isLocked && feedRef.current) {
      feedRef.current.scrollTop = 0;
    }
  }, [isLocked]);

  // โหลดเพิ่มเมื่อ scroll ใกล้ล่างสุดของ feed
  useEffect(() => {
    const el = feedRef.current;
    if (!el) return;

    const onFeedScroll = () => {
      const nearBottom =
        el.scrollTop + el.clientHeight >= el.scrollHeight - 300;
      if (nearBottom) loadMore(1);
    };

    el.addEventListener("scroll", onFeedScroll, { passive: true });
    return () => el.removeEventListener("scroll", onFeedScroll);
  }, [loadMore]);

  // เลื่อนเม้าส์ขึ้นบนสุดของ feed -> กลับไปบนสุดของหน้า
  useEffect(() => {
    const el = feedRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (el.scrollTop <= 0 && e.deltaY < 0) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    el.addEventListener("wheel", onWheel, { passive: true });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const mainWrapperClass = useMemo(() => {
    return [
      "fixed inset-0 flex flex-col transition-all duration-700",
      isLocked ? "is-locked" : "",
    ].join(" ");
  }, [isLocked]);

  return (
    <div className={`${kanit.className} relative bg-[#1a1c2c] text-white`}>
      {/* พื้นหลังเบลอ (แทน body::before) */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <Image
          src={HERO_GIF}
          alt="background"
          fill
          unoptimized
          priority
          className="object-cover object-center scale-110 blur-3xl brightness-50"
        />
      </div>

      {/* ตัวช่วยสร้างพื้นที่ให้ scroll (แทน .page-height-extender) */}
      <div className="h-[calc(100vh+300px)]" />

      {/* Main fixed container */}
      <div className={mainWrapperClass}>
        {/* HERO */}
        <header
          className={[
            "relative w-full overflow-hidden shrink-0 transition-[height] duration-700 ease-[cubic-bezier(0.2,1,0.3,1)]",
            isLocked ? "h-22.5" : "h-screen",
          ].join(" ")}
        >
          {/* slideshow-container (ตอนนี้มีภาพเดียว) */}
          <div className="absolute inset-0">
            <Image
              src={HERO_GIF}
              alt="hero"
              fill
              unoptimized
              priority
              className="object-cover object-center"
            />
          </div>

          {/* overlay */}
          <div
            className={[
              "absolute inset-0 z-10 flex flex-col justify-end",
              "bg-linear-to-t from-black/20 via-black/0 to-black/10",
              isLocked ? "px-5 pb-1" : "px-5 pb-10",
            ].join(" ")}
          >
            {/* (ยังเว้นไว้เหมือนของเดิม) */}
          </div>
        </header>

        {/* CONTENT CANVAS */}
        <main
          className={[
            "z-20 mx-5 mb-5 flex-1 overflow-hidden bg-white text-black shadow-2xl",
            "transition-all duration-700 ease-[cubic-bezier(0.2,1,0.3,1)]",
            isLocked ? "mt-3.75 rounded-3xl" : "mt-0 rounded-[30px]",
          ].join(" ")}
        >
          {/* FEED */}
          <div
            ref={feedRef}
            className={[
              "h-full w-full",
              isLocked ? "overflow-y-auto" : "overflow-y-hidden",
              "[&::-webkit-scrollbar]:w-0",
            ].join(" ")}
          >
            <div>
              {posts.map((p) => {
                const isNew = justAddedIds.has(p.id);

                return (
                  <article
                    key={p.id}
                    className={[
                      "w-full border-b border-neutral-200 bg-white pb-5",
                      "transition-all duration-1000",
                      isNew
                        ? "opacity-0 translate-y-8"
                        : "opacity-100 translate-y-0",
                    ].join(" ")}
                  >
                    {/* header */}
                    <div className="flex items-center px-4 py-3">
                      <div className="mr-3 h-8 w-8 overflow-hidden rounded-full border border-neutral-300 bg-neutral-100">
                        <Image
                          src={p.avatarUrl}
                          alt="avatar"
                          width={32}
                          height={32}
                          unoptimized
                          className="h-8 w-8"
                        />
                      </div>

                      <div className="flex flex-col">
                        <span className="text-sm font-semibold">
                          {p.username}
                        </span>
                        <span className="text-[10px] uppercase tracking-widest text-neutral-400">
                          Featured Creator
                        </span>
                      </div>

                      <button
                        type="button"
                        className="ml-auto text-neutral-400 hover:text-neutral-600"
                        aria-label="more"
                      >
                        <MoreHorizontal className="h-5 w-5" />
                      </button>
                    </div>

                    {/* image */}
                    <div className="relative aspect-video w-full overflow-hidden bg-neutral-50">
                      <Image
                        src={p.imageUrl}
                        alt={p.name}
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    </div>

                    {/* actions */}
                    <div className="flex items-center gap-5 px-4 py-3 text-neutral-900">
                      <button
                        type="button"
                        className="transition-transform hover:scale-110"
                        aria-label="like"
                      >
                        <Heart className="h-7 w-7" />
                      </button>
                      <button
                        type="button"
                        className="transition-transform hover:scale-110"
                        aria-label="comment"
                      >
                        <MessageCircle className="h-7 w-7" />
                      </button>
                      <button
                        type="button"
                        className="transition-transform hover:scale-110"
                        aria-label="send"
                      >
                        <Send className="h-7 w-7" />
                      </button>

                      <button
                        type="button"
                        className="ml-auto transition-transform hover:scale-110"
                        aria-label="bookmark"
                      >
                        <Bookmark className="h-7 w-7" />
                      </button>
                    </div>

                    {/* info */}
                    <div className="px-4 pb-6">
                      <div className="mb-1.5 text-[0.9rem] font-semibold">
                        {p.likes.toLocaleString()} likes
                      </div>

                      <div className="text-[0.95rem] leading-6">
                        <b className="mr-2 font-bold">{p.username}</b>
                        พบกับดีไซน์ใหม่ล่าสุดจากโปรเจกต์ MQ FAMILY
                        ที่เราตั้งใจรังสรรค์ออกมาให้กว้างขวางและเข้าถึงทุกคนมากขึ้น!
                        #MQFamily #DesignUpdate #WideScreen
                      </div>

                      <div className="mt-3 cursor-pointer text-sm text-neutral-400">
                        View all 42 comments
                      </div>

                      <div className="mt-2 text-[10px] uppercase tracking-tight text-neutral-300">
                        Uploaded Just Now
                      </div>
                    </div>
                  </article>
                );
              })}

              <div className="px-4 py-14 text-center text-sm text-neutral-400">
                กำลังโหลดสมาชิกครอบครัวเพิ่มเติม...
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
