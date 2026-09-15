import React, { useState, useMemo } from "react";
import { Home, Search, PlusSquare, Heart, User, MessageCircle, Send, Bookmark, ArrowLeft, Camera, Settings as SettingsIcon, Lock, Bell, LogOut } from "lucide-react";

// ---- Seed data (this is the "live data source" the Search screen binds to) ----
const SEED_POSTS = [
  { id: 1, user: "marisol.cooks", avatar: "#E86A4B", caption: "Sunday sinigang, finally nailed the sourness.", likes: 128, liked: false, saved: false, img: "#F2B79A" },
  { id: 2, user: "jhun.codes", avatar: "#2F6F6A", caption: "Shipped the prototype at 2am. Worth it.", likes: 54, liked: false, saved: false, img: "#9AC7C2" },
  { id: 3, user: "aya.travels", avatar: "#C97B2E", caption: "Baguio fog rolling in over the pines.", likes: 302, liked: true, saved: false, img: "#D8C29A" },
  { id: 4, user: "marisol.cooks", avatar: "#E86A4B", caption: "Leftover sinigang, day 2, still good.", likes: 41, liked: false, saved: false, img: "#EFCDBA" },
  { id: 5, user: "ben.designs", avatar: "#3B5BA5", caption: "New wireframe kit, link in profile.", likes: 89, liked: false, saved: true, img: "#B7C6E8" },
];

const PROFILE = {
  user: "jhun.codes",
  name: "Jhun R.",
  bio: "Low-code tinkerer · building things that used to take a team",
  avatar: "#2F6F6A",
  posts: 12,
  followers: 340,
  following: 180,
};

const inputStyle = {
  width: "100%", boxSizing: "border-box", padding: "11px 12px",
  borderRadius: 10, border: "1px solid #E4E4E4", background: "#F7F7F7",
  fontSize: 14, outline: "none", marginBottom: 10,
};

function Avatar({ color, size = 40 }) {
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", background: color, flexShrink: 0 }} />
  );
}

function TopBar({ title, onBack, onSettings }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 10,
      padding: "14px 16px", borderBottom: "1px solid #ECECEC",
      background: "#fff", position: "sticky", top: 0, zIndex: 5,
    }}>
      {onBack ? (
        <button onClick={onBack} style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}>
          <ArrowLeft size={20} color="#1A1A1A" />
        </button>
      ) : (
        <Camera size={20} color="#0F766E" strokeWidth={2.4} />
      )}
      <span style={{ fontWeight: 700, fontSize: 17, letterSpacing: -0.2, color: "#1A1A1A", flex: 1 }}>{title}</span>
      {onSettings && (
        <button onClick={onSettings} style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}>
          <SettingsIcon size={20} color="#1A1A1A" strokeWidth={1.8} />
        </button>
      )}
    </div>
  );
}

function BottomNav({ screen, setScreen }) {
  const items = [
    { key: "feed", icon: Home },
    { key: "search", icon: Search },
    { key: "add", icon: PlusSquare },
    { key: "activity", icon: Heart },
    { key: "profile", icon: User },
  ];
  return (
    <div style={{
      display: "flex", justifyContent: "space-around", alignItems: "center",
      padding: "10px 0 14px", borderTop: "1px solid #ECECEC", background: "#fff",
      position: "sticky", bottom: 0,
    }}>
      {items.map(({ key, icon: Icon }) => {
        const active = screen === key;
        return (
          <button key={key} onClick={() => setScreen(key)} aria-label={key}
            style={{ background: "none", border: "none", padding: 6, cursor: "pointer" }}>
            <Icon size={24} color={active ? "#0F766E" : "#8E8E8E"} strokeWidth={active ? 2.4 : 1.8} />
          </button>
        );
      })}
    </div>
  );
}

// ---------------- Auth screens ----------------

function LoginScreen({ onLogin, onForgot }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    // Conditional (if/then): both fields required before navigating into the app
    if (!username.trim() || !password.trim()) {
      setError("Enter both a username and password to continue.");
      return;
    }
    setError("");
    onLogin();
  };

  return (
    <div style={{ padding: "60px 28px", display: "flex", flexDirection: "column", alignItems: "center", height: "100%", boxSizing: "border-box" }}>
      <Camera size={34} color="#0F766E" strokeWidth={2} />
      <div style={{ fontWeight: 700, fontSize: 22, margin: "14px 0 28px", color: "#1A1A1A" }}>PhotoShare</div>

      <div style={{ width: "100%" }}>
        <input style={inputStyle} placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input style={inputStyle} placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        {error && <div style={{ color: "#E0483E", fontSize: 12.5, marginBottom: 10 }}>{error}</div>}

        <button onClick={handleSubmit} style={{
          width: "100%", padding: "10px 0", borderRadius: 8, border: "none",
          background: "#0F766E", color: "#fff", fontWeight: 600, fontSize: 14, cursor: "pointer",
        }}>
          Log in
        </button>

        <button onClick={onForgot} style={{
          width: "100%", marginTop: 14, background: "none", border: "none",
          color: "#0F766E", fontSize: 13, cursor: "pointer",
        }}>
          Forgot password?
        </button>
      </div>

      <div style={{ marginTop: "auto", fontSize: 11.5, color: "#8E8E8E", textAlign: "center" }}>
        Prototype only — any username and password will work.
      </div>
    </div>
  );
}

function ForgotPasswordScreen({ onBack }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    // Conditional (if/then): only "send" the reset link once the email looks valid
    if (!email.includes("@") || !email.includes(".")) {
      setError("Enter a valid email address.");
      setSent(false);
      return;
    }
    setError("");
    setSent(true);
  };

  return (
    <div>
      <TopBar title="Reset password" onBack={onBack} />
      <div style={{ padding: "24px 20px" }}>
        {!sent ? (
          <>
            <div style={{ fontSize: 13.5, color: "#444", marginBottom: 16 }}>
              Enter the email linked to your account and we'll send a reset link.
            </div>
            {/* Data binding: confirmation message below is bound to whatever is typed here */}
            <input style={inputStyle} placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
            {error && <div style={{ color: "#E0483E", fontSize: 12.5, marginBottom: 10 }}>{error}</div>}
            <button onClick={handleSubmit} style={{
              width: "100%", padding: "10px 0", borderRadius: 8, border: "none",
              background: "#0F766E", color: "#fff", fontWeight: 600, fontSize: 14, cursor: "pointer",
            }}>
              Send reset link
            </button>
          </>
        ) : (
          <div style={{ fontSize: 13.5, color: "#1A1A1A", lineHeight: 1.6 }}>
            If an account exists for <b>{email}</b>, a reset link is on its way. Check your inbox.
          </div>
        )}
      </div>
    </div>
  );
}

// ---------------- App screens ----------------

function PostCard({ post, onToggleLike, onToggleSave, onOpenProfile }) {
  return (
    <div style={{ borderBottom: "1px solid #F0F0F0", paddingBottom: 12, marginBottom: 12 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px" }}>
        <button onClick={() => onOpenProfile(post.user)} style={{ background: "none", border: "none", padding: 0, cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}>
          <Avatar color={post.avatar} size={34} />
          <span style={{ fontWeight: 600, fontSize: 14, color: "#1A1A1A" }}>{post.user}</span>
        </button>
      </div>

      <div style={{ width: "100%", aspectRatio: "1 / 1", background: post.img }} />

      <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "10px 14px 4px" }}>
        <button onClick={() => onToggleLike(post.id)} style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}>
          <Heart size={23} color={post.liked ? "#E0483E" : "#1A1A1A"} fill={post.liked ? "#E0483E" : "none"} strokeWidth={1.8} />
        </button>
        <MessageCircle size={22} color="#1A1A1A" strokeWidth={1.8} />
        <Send size={21} color="#1A1A1A" strokeWidth={1.8} />
        <div style={{ flex: 1 }} />
        <button onClick={() => onToggleSave(post.id)} style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}>
          <Bookmark size={21} color="#1A1A1A" fill={post.saved ? "#1A1A1A" : "none"} strokeWidth={1.8} />
        </button>
      </div>

      <div style={{ padding: "0 14px", fontSize: 13.5, fontWeight: 600, color: "#1A1A1A" }}>
        {post.likes.toLocaleString()} likes
      </div>
      <div style={{ padding: "3px 14px 0", fontSize: 13.5, color: "#1A1A1A" }}>
        <span style={{ fontWeight: 600 }}>{post.user}</span> {post.caption}
      </div>
    </div>
  );
}

function FeedScreen({ posts, onToggleLike, onToggleSave, onOpenProfile }) {
  return (
    <div style={{ paddingTop: 6 }}>
      {posts.map((p) => (
        <PostCard key={p.id} post={p} onToggleLike={onToggleLike} onToggleSave={onToggleSave} onOpenProfile={onOpenProfile} />
      ))}
    </div>
  );
}

function SearchScreen({ posts }) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter((p) => p.user.toLowerCase().includes(q) || p.caption.toLowerCase().includes(q));
  }, [query, posts]);

  return (
    <div>
      <div style={{ padding: "12px 14px" }}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search accounts or captions"
          style={{ ...inputStyle, marginBottom: 0 }}
        />
        <div style={{ marginTop: 8, fontSize: 12, color: "#8E8E8E" }}>
          {query ? `${results.length} result${results.length === 1 ? "" : "s"} for "${query}"` : `Showing all ${posts.length} posts — live-bound to the feed data`}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2, padding: "10px 2px 0" }}>
        {results.map((p) => (
          <div key={p.id} style={{ aspectRatio: "1 / 1", background: p.img }} />
        ))}
        {results.length === 0 && (
          <div style={{ gridColumn: "span 3", padding: "40px 14px", textAlign: "center", color: "#8E8E8E", fontSize: 13.5 }}>
            No posts match that search.
          </div>
        )}
      </div>
    </div>
  );
}

function ProfileScreen({ posts, following, onToggleFollow, onOpenSettings }) {
  const myPosts = posts.filter((p) => p.user === PROFILE.user);
  return (
    <div>
      <div style={{ padding: "16px 14px 0", display: "flex", alignItems: "center", gap: 20 }}>
        <Avatar color={PROFILE.avatar} size={72} />
        <div style={{ display: "flex", flex: 1, justifyContent: "space-around", textAlign: "center" }}>
          <div><div style={{ fontWeight: 700, fontSize: 15 }}>{PROFILE.posts}</div><div style={{ fontSize: 12, color: "#8E8E8E" }}>Posts</div></div>
          <div><div style={{ fontWeight: 700, fontSize: 15 }}>{PROFILE.followers}</div><div style={{ fontSize: 12, color: "#8E8E8E" }}>Followers</div></div>
          <div><div style={{ fontWeight: 700, fontSize: 15 }}>{PROFILE.following}</div><div style={{ fontSize: 12, color: "#8E8E8E" }}>Following</div></div>
        </div>
      </div>

      <div style={{ padding: "12px 14px 0" }}>
        <div style={{ fontWeight: 700, fontSize: 14 }}>{PROFILE.name}</div>
        <div style={{ fontSize: 13.5, color: "#444", marginTop: 2 }}>{PROFILE.bio}</div>
      </div>

      <div style={{ padding: "12px 14px", display: "flex", gap: 8 }}>
        <button onClick={onToggleFollow} style={{
          flex: 1, padding: "8px 0", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer",
          background: following ? "#F0F0F0" : "#0F766E",
          color: following ? "#1A1A1A" : "#fff",
          border: following ? "1px solid #DDD" : "none",
        }}>
          {following ? "Following" : "Follow"}
        </button>
        <button onClick={onOpenSettings} style={{
          padding: "8px 14px", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer",
          background: "#F0F0F0", color: "#1A1A1A", border: "1px solid #DDD",
        }}>
          Settings
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2, padding: "10px 2px 0", borderTop: "1px solid #ECECEC" }}>
        {myPosts.map((p) => (
          <div key={p.id} style={{ aspectRatio: "1 / 1", background: p.img }} />
        ))}
      </div>
    </div>
  );
}

function ToggleRow({ icon: Icon, label, sub, value, onChange }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", borderBottom: "1px solid #F0F0F0" }}>
      <Icon size={19} color="#1A1A1A" strokeWidth={1.8} />
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: "#1A1A1A" }}>{label}</div>
        <div style={{ fontSize: 12, color: "#8E8E8E", marginTop: 1 }}>{sub}</div>
      </div>
      {/* Conditional (if/then): toggle flips both the switch state and its color */}
      <button
        onClick={() => onChange(!value)}
        style={{
          width: 42, height: 24, borderRadius: 12, border: "none", cursor: "pointer",
          background: value ? "#0F766E" : "#DDD", position: "relative", flexShrink: 0,
        }}
      >
        <div style={{
          width: 18, height: 18, borderRadius: "50%", background: "#fff",
          position: "absolute", top: 3, left: value ? 21 : 3, transition: "left 0.15s",
        }} />
      </button>
    </div>
  );
}

function SettingsScreen({ onBack, isPrivate, setIsPrivate, notifications, setNotifications, onLogout }) {
  return (
    <div>
      <TopBar title="Settings" onBack={onBack} />
      <ToggleRow icon={Lock} label="Private account" sub={isPrivate ? "Only followers can see your posts" : "Anyone can see your posts"} value={isPrivate} onChange={setIsPrivate} />
      <ToggleRow icon={Bell} label="Push notifications" sub={notifications ? "You'll get alerts for likes and comments" : "Notifications are muted"} value={notifications} onChange={setNotifications} />
      <button onClick={onLogout} style={{
        display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "16px",
        background: "none", border: "none", borderTop: "8px solid #F7F7F7", cursor: "pointer",
        color: "#E0483E", fontSize: 14, fontWeight: 600,
      }}>
        <LogOut size={18} />
        Log out
      </button>
    </div>
  );
}

// ---------------- Root ----------------

export default function PhotoSharePrototype() {
  const [authStage, setAuthStage] = useState("login"); // 'login' | 'forgot' | 'app'
  const [screen, setScreen] = useState("feed");
  const [posts, setPosts] = useState(SEED_POSTS);
  const [following, setFollowing] = useState(false);
  const [viewedUser, setViewedUser] = useState(null);
  const [isPrivate, setIsPrivate] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const toggleLike = (id) => {
    setPosts((prev) => prev.map((p) => {
      if (p.id !== id) return p;
      return p.liked ? { ...p, liked: false, likes: p.likes - 1 } : { ...p, liked: true, likes: p.likes + 1 };
    }));
  };
  const toggleSave = (id) => setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, saved: !p.saved } : p)));
  const openProfile = (user) => { setViewedUser(user); setScreen("userProfile"); };
  const handleLogout = () => { setAuthStage("login"); setScreen("feed"); };

  if (authStage === "login") {
    return (
      <div style={frameStyle}>
        <LoginScreen onLogin={() => setAuthStage("app")} onForgot={() => setAuthStage("forgot")} />
      </div>
    );
  }
  if (authStage === "forgot") {
    return (
      <div style={frameStyle}>
        <ForgotPasswordScreen onBack={() => setAuthStage("login")} />
      </div>
    );
  }

  const titles = {
    feed: "PhotoShare", search: "Search", add: "New post", activity: "Activity",
    profile: "Profile", userProfile: viewedUser || "Profile", settings: "Settings",
  };

  return (
    <div style={frameStyle}>
      {screen !== "settings" && (
        <TopBar
          title={titles[screen]}
          onBack={screen === "userProfile" ? () => setScreen("feed") : undefined}
        />
      )}

      <div style={{ flex: 1, overflowY: "auto" }}>
        {screen === "feed" && <FeedScreen posts={posts} onToggleLike={toggleLike} onToggleSave={toggleSave} onOpenProfile={openProfile} />}
        {screen === "search" && <SearchScreen posts={posts} />}
        {screen === "add" && (
          <div style={{ padding: 40, textAlign: "center", color: "#8E8E8E", fontSize: 14 }}>
            Post composer goes here — out of scope for this prototype pass.
          </div>
        )}
        {screen === "activity" && (
          <div style={{ padding: 14 }}>
            {posts.filter((p) => p.liked).length === 0 ? (
              <div style={{ padding: 30, textAlign: "center", color: "#8E8E8E", fontSize: 14 }}>
                No activity yet — like a post in the feed to see it here.
              </div>
            ) : (
              posts.filter((p) => p.liked).map((p) => (
                <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0" }}>
                  <Avatar color={p.avatar} size={30} />
                  <span style={{ fontSize: 13.5 }}>You liked <b>{p.user}</b>'s post</span>
                </div>
              ))
            )}
          </div>
        )}
        {screen === "profile" && (
          <ProfileScreen posts={posts} following={following} onToggleFollow={() => setFollowing((f) => !f)} onOpenSettings={() => setScreen("settings")} />
        )}
        {screen === "userProfile" && (
          <div style={{ padding: 30, textAlign: "center", color: "#8E8E8E", fontSize: 14 }}>
            Viewing <b>{viewedUser}</b>'s profile — tap back to return to the feed.
          </div>
        )}
        {screen === "settings" && (
          <SettingsScreen
            onBack={() => setScreen("profile")}
            isPrivate={isPrivate} setIsPrivate={setIsPrivate}
            notifications={notifications} setNotifications={setNotifications}
            onLogout={handleLogout}
          />
        )}
      </div>

      {screen !== "settings" && <BottomNav screen={screen} setScreen={setScreen} />}
    </div>
  );
}

const frameStyle = {
  maxWidth: 380, margin: "0 auto", height: 720, background: "#fff",
  borderRadius: 28, overflow: "hidden", display: "flex", flexDirection: "column",
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  boxShadow: "0 12px 40px rgba(0,0,0,0.12)", border: "1px solid #EAEAEA",
};
