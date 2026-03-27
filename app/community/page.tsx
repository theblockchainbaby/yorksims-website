"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../components/AuthProvider";
import { supabase } from "../lib/supabase";

type Post = {
  id: string;
  title: string;
  body: string;
  vertical_id: string | null;
  likes_count: number;
  created_at: string;
  user_id: string;
  profiles: { full_name: string | null; tier: string };
  reply_count: number;
};

type Reply = {
  id: string;
  body: string;
  created_at: string;
  profiles: { full_name: string | null; tier: string };
};

const VERTICAL_LABELS: Record<string, string> = {
  software: "Software",
  "ai-agents": "AI Agents",
  hardware: "Hardware",
  blockchain: "Blockchain",
  business: "Business",
  products: "Products",
  land: "Land",
  athlete: "Athlete",
  automotive: "Voice AI",
  creative: "Creative Tech",
};

const TIER_COLORS: Record<string, string> = {
  free: "text-white/20",
  pro: "text-[#e63946]",
  builder: "text-[#f59e0b]",
  one_on_one: "text-[#8b5cf6]",
};

export default function CommunityPage() {
  const { user, profile, loading } = useAuth();
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [showCompose, setShowCompose] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");
  const [newVertical, setNewVertical] = useState("");
  const [posting, setPosting] = useState(false);
  const [expandedPost, setExpandedPost] = useState<string | null>(null);
  const [replies, setReplies] = useState<Record<string, Reply[]>>({});
  const [replyText, setReplyText] = useState("");
  const [replying, setReplying] = useState(false);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [loading, user, router]);

  useEffect(() => {
    loadPosts();
    if (user) loadLikes();
  }, [user]);

  async function loadPosts() {
    const { data } = await supabase
      .from("community_posts")
      .select("*, profiles(full_name, tier)")
      .order("created_at", { ascending: false });

    if (data) {
      // Get reply counts
      const postIds = data.map((p) => p.id);
      const { data: replyCounts } = await supabase
        .from("community_replies")
        .select("post_id")
        .in("post_id", postIds);

      const countMap: Record<string, number> = {};
      replyCounts?.forEach((r) => {
        countMap[r.post_id] = (countMap[r.post_id] || 0) + 1;
      });

      setPosts(data.map((p) => ({ ...p, reply_count: countMap[p.id] || 0 })));
    }
  }

  async function loadLikes() {
    if (!user) return;
    const { data } = await supabase
      .from("post_likes")
      .select("post_id")
      .eq("user_id", user.id);
    if (data) setLikedPosts(new Set(data.map((l) => l.post_id)));
  }

  async function createPost(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;
    setPosting(true);
    await supabase.from("community_posts").insert({
      user_id: user.id,
      title: newTitle,
      body: newBody,
      vertical_id: newVertical || null,
    });
    setNewTitle("");
    setNewBody("");
    setNewVertical("");
    setShowCompose(false);
    setPosting(false);
    loadPosts();
  }

  async function toggleLike(postId: string) {
    if (!user) return;
    const liked = likedPosts.has(postId);
    if (liked) {
      await supabase.from("post_likes").delete().eq("user_id", user.id).eq("post_id", postId);
      await supabase.from("community_posts").update({ likes_count: posts.find((p) => p.id === postId)!.likes_count - 1 }).eq("id", postId);
      setLikedPosts((prev) => { const s = new Set(prev); s.delete(postId); return s; });
    } else {
      await supabase.from("post_likes").insert({ user_id: user.id, post_id: postId });
      await supabase.from("community_posts").update({ likes_count: posts.find((p) => p.id === postId)!.likes_count + 1 }).eq("id", postId);
      setLikedPosts((prev) => new Set(prev).add(postId));
    }
    loadPosts();
  }

  async function loadReplies(postId: string) {
    const { data } = await supabase
      .from("community_replies")
      .select("*, profiles(full_name, tier)")
      .eq("post_id", postId)
      .order("created_at", { ascending: true });
    if (data) setReplies((prev) => ({ ...prev, [postId]: data }));
  }

  async function submitReply(postId: string) {
    if (!user || !replyText.trim()) return;
    setReplying(true);
    await supabase.from("community_replies").insert({
      post_id: postId,
      user_id: user.id,
      body: replyText,
    });
    setReplyText("");
    setReplying(false);
    loadReplies(postId);
    loadPosts();
  }

  function toggleExpand(postId: string) {
    if (expandedPost === postId) {
      setExpandedPost(null);
    } else {
      setExpandedPost(postId);
      loadReplies(postId);
    }
  }

  const filteredPosts = filter === "all" ? posts : posts.filter((p) => p.vertical_id === filter);

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-[#e63946] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Top bar */}
      <div className="border-b border-white/[0.06] px-6 md:px-12 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/york-state-logo.png" alt="York State University" className="h-10" />
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="text-xs font-semibold uppercase tracking-widest text-white/30 hover:text-white transition-colors">
            Dashboard
          </Link>
          <p className="text-xs font-semibold text-white">{profile?.full_name || "Builder"}</p>
        </div>
      </div>

      <div className="px-6 md:px-12 py-12 max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black tracking-tight mb-1">Community</h1>
            <p className="text-sm text-white/30">Share what you are building. Learn from other builders.</p>
          </div>
          <motion.button
            onClick={() => setShowCompose(!showCompose)}
            className="text-xs font-bold uppercase tracking-widest px-6 py-3 bg-[#e63946] text-white rounded-full"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {showCompose ? "Cancel" : "New Post"}
          </motion.button>
        </div>

        {/* Compose */}
        <AnimatePresence>
          {showCompose && (
            <motion.form
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              onSubmit={createPost}
              className="overflow-hidden mb-8"
            >
              <div className="border border-white/[0.08] rounded-2xl p-6 flex flex-col gap-4">
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-transparent text-lg font-bold text-white placeholder-white/15 focus:outline-none"
                  placeholder="What are you building?"
                />
                <textarea
                  required
                  rows={4}
                  value={newBody}
                  onChange={(e) => setNewBody(e.target.value)}
                  className="w-full bg-transparent text-sm text-white/60 placeholder-white/15 focus:outline-none resize-none"
                  placeholder="Share details, ask questions, show progress..."
                />
                <div className="flex items-center justify-between">
                  <select
                    value={newVertical}
                    onChange={(e) => setNewVertical(e.target.value)}
                    className="bg-white/[0.03] border border-white/[0.07] text-xs text-white/40 px-3 py-2 rounded-lg focus:outline-none"
                  >
                    <option value="">No vertical</option>
                    {Object.entries(VERTICAL_LABELS).map(([k, v]) => (
                      <option key={k} value={k}>{v}</option>
                    ))}
                  </select>
                  <motion.button
                    type="submit"
                    disabled={posting}
                    className="text-xs font-bold uppercase tracking-widest px-6 py-2.5 bg-[#e63946] text-white rounded-full disabled:opacity-60"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {posting ? "Posting..." : "Post"}
                  </motion.button>
                </div>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Filters */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          <button
            onClick={() => setFilter("all")}
            className={`shrink-0 text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full transition-all ${
              filter === "all" ? "bg-white text-black" : "text-white/30 hover:text-white"
            }`}
          >
            All
          </button>
          {Object.entries(VERTICAL_LABELS).map(([k, v]) => (
            <button
              key={k}
              onClick={() => setFilter(k)}
              className={`shrink-0 text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full transition-all ${
                filter === k ? "bg-white text-black" : "text-white/30 hover:text-white"
              }`}
            >
              {v}
            </button>
          ))}
        </div>

        {/* Posts */}
        <div className="flex flex-col gap-4">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-sm text-white/20">No posts yet. Be the first to share what you are building.</p>
            </div>
          ) : (
            filteredPosts.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="border border-white/[0.06] rounded-2xl overflow-hidden hover:border-white/[0.1] transition-colors"
              >
                <div className="px-6 py-5">
                  {/* Author */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-semibold text-white">{post.profiles.full_name || "Builder"}</span>
                    <span className={`text-[9px] font-bold uppercase tracking-wider ${TIER_COLORS[post.profiles.tier] || "text-white/20"}`}>
                      {post.profiles.tier}
                    </span>
                    {post.vertical_id && (
                      <>
                        <span className="text-white/10">·</span>
                        <span className="text-[10px] text-white/20">{VERTICAL_LABELS[post.vertical_id]}</span>
                      </>
                    )}
                    <span className="text-white/10 ml-auto">·</span>
                    <span className="text-[10px] text-white/15 font-mono">
                      {new Date(post.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="text-base font-bold text-white mb-2">{post.title}</h3>
                  <p className="text-sm text-white/35 leading-relaxed">{post.body}</p>

                  {/* Actions */}
                  <div className="flex items-center gap-6 mt-4">
                    <button
                      onClick={() => toggleLike(post.id)}
                      className={`flex items-center gap-1.5 text-xs transition-colors ${
                        likedPosts.has(post.id) ? "text-[#e63946]" : "text-white/20 hover:text-white/40"
                      }`}
                    >
                      {likedPosts.has(post.id) ? "♥" : "♡"} {post.likes_count}
                    </button>
                    <button
                      onClick={() => toggleExpand(post.id)}
                      className="text-xs text-white/20 hover:text-white/40 transition-colors"
                    >
                      {post.reply_count} {post.reply_count === 1 ? "reply" : "replies"}
                    </button>
                  </div>
                </div>

                {/* Replies */}
                <AnimatePresence>
                  {expandedPost === post.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden border-t border-white/[0.04]"
                    >
                      <div className="px-6 py-4 bg-white/[0.01]">
                        {(replies[post.id] || []).map((r) => (
                          <div key={r.id} className="mb-4 last:mb-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-semibold text-white">{r.profiles.full_name || "Builder"}</span>
                              <span className={`text-[9px] font-bold uppercase tracking-wider ${TIER_COLORS[r.profiles.tier] || "text-white/20"}`}>
                                {r.profiles.tier}
                              </span>
                              <span className="text-[10px] text-white/15 font-mono ml-auto">
                                {new Date(r.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                              </span>
                            </div>
                            <p className="text-sm text-white/35">{r.body}</p>
                          </div>
                        ))}

                        {/* Reply input */}
                        <div className="flex gap-3 mt-4 pt-4 border-t border-white/[0.04]">
                          <input
                            type="text"
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && submitReply(post.id)}
                            className="flex-1 bg-transparent text-sm text-white placeholder-white/15 focus:outline-none"
                            placeholder="Write a reply..."
                          />
                          <button
                            onClick={() => submitReply(post.id)}
                            disabled={replying || !replyText.trim()}
                            className="text-[10px] font-bold uppercase tracking-widest text-[#e63946] hover:text-white transition-colors disabled:opacity-30"
                          >
                            Reply
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
