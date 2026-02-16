"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Kanit } from "next/font/google";
import {
  Bell,
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

function useInfinitePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [justAddedIds, setJustAddedIds] = useState<Set<string>>(new Set());

  const createPost = useCallback((): Post => {
    const name = randomPick(NAMES);
    const seed = `${randomPick(SEEDS)}-${Math.random()}`;
    const username = name.toLowerCase().replace(/\s+/g, "_");
    const isPet = name === "Lu-Hu";
    const likes = Math.floor(Math.random() * 5000) + 100;

    const avatarUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
      name,
    )}`;
    const imageUrl = `https://api.dicebear.com/7.x/${
      isPet ? "bottts" : "adventurer"
    }/svg?seed=${encodeURIComponent(seed)}`;

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
    loadMore(4);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { posts, loadMore, justAddedIds };
}

export default function Home() {
  const { posts, loadMore, justAddedIds } = useInfinitePosts();
  const feedRef = useRef<HTMLDivElement | null>(null);
  const isLoadingRef = useRef(false);

  // Infinite scroll ภายใน feed container
  useEffect(() => {
    const el = feedRef.current;
    if (!el) return;

    const onScroll = () => {
      const nearBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 300;
      if (!nearBottom) return;
      if (isLoadingRef.current) return;

      isLoadingRef.current = true;
      loadMore(1);

      // กันการ trigger ถี่เกินไปเล็กน้อย
      window.setTimeout(() => {
        isLoadingRef.current = false;
      }, 250);
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [loadMore]);

  const gridPaperBg = useMemo(() => {
    // ลายตารางแบบ Grid Paper
    return {
      backgroundImage:
        "linear-gradient(rgba(200,200,200,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(200,200,200,0.3) 1px, transparent 1px)",
      backgroundSize: "20px 20px",
    } as React.CSSProperties;
  }, []);

  return (
    <div className={`${kanit.className} h-screen w-full overflow-hidden bg-white`}>
      <div
        ref={feedRef}
        className="h-screen w-full overflow-y-auto bg-white [scrollbar-width:thin]"
        style={gridPaperBg}
      >
        {/* Header ของ Feed (sticky) */}
        <div className="sticky top-0 z-30 flex items-center justify-between border-b border-gray-100 bg-white/70 px-4 py-4 backdrop-blur-md">
          <h1 className="text-xl font-bold tracking-tighter text-gray-800">
            MY FAMILY
          </h1>
          <button
            type="button"
            className="text-gray-600 hover:text-gray-800"
            aria-label="notifications"
          >
            <Bell className="h-6 w-6" />
          </button>
        </div>

        {/* Posts */}
        <div>
          {posts.map((p) => {
            const isNew = justAddedIds.has(p.id);

            return (
              <article
                key={p.id}
                className={[
                  "w-full border-b border-black/5 bg-transparent pb-5",
                  "transition-all duration-1000",
                  isNew ? "opacity-0 translate-y-8" : "opacity-100 translate-y-0",
                ].join(" ")}
              >
                {/* header */}
                <div className="flex items-center px-4 py-3">
                  <div className="mr-3 h-8 w-8 overflow-hidden rounded-full border border-gray-200 bg-white">
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
                    <span className="text-sm font-semibold text-gray-800">
                      {p.username}
                    </span>
                    <span className="text-[10px] uppercase tracking-widest text-gray-400">
                      Featured Creator
                    </span>
                  </div>

                  <button
                    type="button"
                    className="ml-auto text-gray-400 hover:text-gray-600"
                    aria-label="more"
                  >
                    <MoreHorizontal className="h-5 w-5" />
                  </button>
                </div>

                {/* image */}
                <div className="relative aspect-video w-full overflow-hidden border-y border-black/5 bg-white">
                  <Image
                    src={p.imageUrl}
                    alt={p.name}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>

                {/* actions: Bookmark ซ้าย, กลุ่มหลักขวา */}
                <div className="flex items-center gap-5 px-4 py-3 text-gray-900">
                  <button
                    type="button"
                    className="transition-transform hover:scale-110"
                    aria-label="bookmark"
                  >
                    <Bookmark className="h-7 w-7" />
                  </button>

                  <div className="ml-auto flex items-center gap-5">
                    <button
                      type="button"
                      className="transition-transform hover:scale-110"
                      aria-label="send"
                    >
                      <Send className="h-7 w-7" />
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
                      aria-label="like"
                    >
                      <Heart className="h-7 w-7" />
                    </button>
                  </div>
                </div>

                {/* info */}
                <div className="px-4 pb-6">
                  {/* สลับฝั่ง: likes ไปขวา, caption ไปซ้าย */}
                  <div className="mb-1 flex flex-row-reverse items-baseline justify-between gap-3">
                    <div className="whitespace-nowrap text-right text-[0.9rem] font-semibold text-gray-800">
                      {p.likes.toLocaleString()} likes
                    </div>
                    <div className="text-left text-[0.95rem] leading-6 text-gray-800">
                      <b className="mr-2 font-bold">{p.username}</b>
                      IP Design บนลายตาราง #MQFamily
                    </div>
                  </div>

                  <div className="mt-1 cursor-pointer text-sm text-gray-400">
                    View all 42 comments
                  </div>
                  <div className="mt-2 text-[10px] uppercase tracking-tight text-gray-300">
                    Uploaded Just Now
                  </div>
                </div>
              </article>
            );
          })}

          <div className="px-4 py-14 text-center text-sm text-gray-400">
            กำลังโหลดสมาชิกครอบครัวเพิ่มเติม...
          </div>
        </div>
      </div>
    </div>
  );
}
