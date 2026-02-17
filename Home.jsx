import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";

const debates = [
  { id: 1, category: "Technology", categoryColor: "#7EC8C8", title: "AI will replace software developers within 10 years", for: 847, against: 1203, opinions: 312, hot: true, timeAgo: "2h ago" },
  { id: 2, category: "Politics", categoryColor: "#F4A7B9", title: "Universal Basic Income is necessary for modern economies", for: 2103, against: 1890, opinions: 540, hot: true, timeAgo: "5h ago" },
  { id: 3, category: "Science", categoryColor: "#B5A8D5", title: "Mars colonization should be humanity's top priority", for: 654, against: 432, opinions: 198, hot: false, timeAgo: "1d ago" },
  { id: 4, category: "Education", categoryColor: "#F9C784", title: "Traditional universities will be obsolete in 20 years", for: 991, against: 1140, opinions: 267, hot: false, timeAgo: "3d ago" },
  { id: 5, category: "Environment", categoryColor: "#A8D5BA", title: "Nuclear energy is essential for climate change goals", for: 1567, against: 876, opinions: 423, hot: true, timeAgo: "6h ago" },
];

const categories = [
  { name: "All", color: "#e8e4f0" },
  { name: "Technology", color: "#7EC8C8" },
  { name: "Politics", color: "#F4A7B9" },
  { name: "Science", color: "#B5A8D5" },
  { name: "Education", color: "#F9C784" },
  { name: "Environment", color: "#A8D5BA" },
];

function VoteBar({ forVotes, againstVotes }) {
  const total = forVotes + againstVotes;
  const forPct = Math.round((forVotes / total) * 100);
  return (
    <div style={{ width: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ color: "#7EC8C8", fontSize: 12, fontFamily: "'Space Mono',monospace", fontWeight: 700 }}>FOR {forPct}%</span>
        <span style={{ color: "#F4A7B9", fontSize: 12, fontFamily: "'Space Mono',monospace", fontWeight: 700 }}>{100 - forPct}% AGAINST</span>
      </div>
      <div style={{ height: 5, borderRadius: 3, background: "rgba(255,255,255,0.08)", overflow: "hidden", display: "flex" }}>
        <div style={{ width: `${forPct}%`, background: "linear-gradient(90deg,#7EC8C8,#a8dede)", borderRadius: "3px 0 0 3px" }} />
        <div style={{ width: `${100 - forPct}%`, background: "linear-gradient(90deg,#F4A7B9,#f7c5d0)", borderRadius: "0 3px 3px 0" }} />
      </div>
    </div>
  );
}

function DebateCard({ debate, index }) {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/debate/${debate.id}`)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "rgba(255,255,255,0.09)" : "rgba(255,255,255,0.04)",
        border: `1px solid ${hovered ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.09)"}`,
        borderRadius: 18, padding: "24px 28px", cursor: "pointer",
        transition: "all 0.25s ease",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        boxShadow: hovered ? `0 16px 40px rgba(0,0,0,0.2), 0 0 0 1px ${debate.categoryColor}30` : "none",
        animationDelay: `${index * 0.08}s`, animation: "fadeSlideIn 0.5s ease both",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <span style={{
            background: `${debate.categoryColor}25`, color: debate.categoryColor,
            border: `1px solid ${debate.categoryColor}55`, borderRadius: 7,
            padding: "3px 11px", fontSize: 11, fontWeight: 700, letterSpacing: 1,
            textTransform: "uppercase", fontFamily: "'Space Mono',monospace",
          }}>{debate.category}</span>
          {debate.hot && <span style={{ fontSize: 11, color: "#F9C784", fontFamily: "'Space Mono',monospace" }}>🔥 TRENDING</span>}
        </div>
        <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 12, fontFamily: "'Space Mono',monospace" }}>{debate.timeAgo}</span>
      </div>
      <h3 style={{ color: "#f0ecff", fontSize: 18, fontFamily: "'Lora',Georgia,serif", fontWeight: 700, lineHeight: 1.4, margin: "0 0 20px 0" }}>{debate.title}</h3>
      <VoteBar forVotes={debate.for} againstVotes={debate.against} />
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 16, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ display: "flex", gap: 20 }}>
          <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 12, fontFamily: "'Space Mono',monospace" }}>💬 {debate.opinions} opinions</span>
          <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 12, fontFamily: "'Space Mono',monospace" }}>🗳 {(debate.for + debate.against).toLocaleString()} votes</span>
        </div>
        <span style={{ color: debate.categoryColor, fontSize: 12, fontFamily: "'Space Mono',monospace", opacity: hovered ? 1 : 0, transition: "opacity 0.2s" }}>Enter debate →</span>
      </div>
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchFocused, setSearchFocused] = useState(false);
  const filtered = activeCategory === "All" ? debates : debates.filter((d) => d.category === activeCategory);

  return (
    <div style={{ minHeight: "100vh", background: "#1a1625", fontFamily: "'Space Grotesk',sans-serif", color: "#f0ecff", position: "relative" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@600;700&family=Space+Mono:wght@400;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        @keyframes fadeSlideIn { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-20px)} }
        ::-webkit-scrollbar{width:4px} ::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.12);border-radius:2px}
        input::placeholder{color:rgba(255,255,255,0.25)} input:focus{outline:none}
      `}</style>
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{ position:"absolute", top:"5%", left:"10%", width:500, height:500, borderRadius:"50%", background:"radial-gradient(circle,rgba(126,200,200,0.1) 0%,transparent 65%)", animation:"float 10s ease-in-out infinite" }} />
        <div style={{ position:"absolute", top:"40%", right:"5%", width:380, height:380, borderRadius:"50%", background:"radial-gradient(circle,rgba(244,167,185,0.09) 0%,transparent 65%)", animation:"float 13s ease-in-out infinite reverse" }} />
        <div style={{ position:"absolute", bottom:"5%", left:"35%", width:320, height:320, borderRadius:"50%", background:"radial-gradient(circle,rgba(181,168,213,0.09) 0%,transparent 65%)", animation:"float 11s ease-in-out infinite" }} />
      </div>
      <Navbar />
      <main style={{ position:"relative", zIndex:1, maxWidth:900, margin:"0 auto", padding:"60px 24px 80px" }}>
        <div style={{ textAlign:"center", marginBottom:56, animation:"fadeSlideIn 0.6s ease both" }}>
          <div style={{ display:"inline-block", background:"rgba(126,200,200,0.12)", border:"1px solid rgba(126,200,200,0.3)", borderRadius:100, padding:"5px 18px", marginBottom:24, fontSize:12, fontFamily:"'Space Mono',monospace", color:"#7EC8C8", letterSpacing:1.5, textTransform:"uppercase" }}>🎙 5,400+ Active Debates</div>
          <h1 style={{ fontFamily:"'Lora',serif", fontSize:"clamp(36px,5vw,56px)", fontWeight:700, lineHeight:1.15, letterSpacing:-1, marginBottom:18, background:"linear-gradient(160deg,#f0ecff 20%,#c4b8e8 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>Where Opinions<br />Find Their Echo</h1>
          <p style={{ color:"rgba(240,236,255,0.45)", fontSize:16, fontWeight:300, maxWidth:460, margin:"0 auto 32px", lineHeight:1.75 }}>Structured debates. Real arguments. Choose a side and make your voice heard.</p>
          <div style={{ display:"flex", gap:10, maxWidth:480, margin:"0 auto", background: searchFocused ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.04)", border:`1px solid ${searchFocused ? "rgba(126,200,200,0.5)" : "rgba(255,255,255,0.1)"}`, borderRadius:14, padding:"4px 4px 4px 16px", transition:"all 0.25s" }}>
            <span style={{ color:"rgba(255,255,255,0.3)", fontSize:16, alignSelf:"center" }}>🔍</span>
            <input placeholder="Search debates..." onFocus={() => setSearchFocused(true)} onBlur={() => setSearchFocused(false)} style={{ flex:1, background:"transparent", border:"none", outline:"none", color:"#f0ecff", fontSize:15, fontFamily:"'Space Grotesk',sans-serif", padding:"10px 0" }} />
            <button style={{ background:"linear-gradient(135deg,#7EC8C8,#a8dede)", border:"none", color:"#1a1625", borderRadius:11, padding:"10px 20px", fontWeight:700, cursor:"pointer", fontFamily:"'Space Grotesk',sans-serif", fontSize:14 }}>Search</button>
          </div>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16, marginBottom:48, animation:"fadeSlideIn 0.6s ease 0.1s both" }}>
          {[{ label:"Debates Today", value:"284", icon:"⚡", color:"#F9C784" },{ label:"Active Users", value:"12.4K", icon:"👥", color:"#B5A8D5" },{ label:"Votes Cast", value:"891K", icon:"🗳", color:"#7EC8C8" }].map((s) => (
            <div key={s.label} style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:14, padding:"20px 22px", textAlign:"center" }}>
              <div style={{ fontSize:22, marginBottom:6 }}>{s.icon}</div>
              <div style={{ fontFamily:"'Lora',serif", fontSize:26, fontWeight:700, color:s.color }}>{s.value}</div>
              <div style={{ color:"rgba(240,236,255,0.35)", fontSize:12, marginTop:3, fontFamily:"'Space Mono',monospace" }}>{s.label}</div>
            </div>
          ))}
        </div>
        <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:32, animation:"fadeSlideIn 0.6s ease 0.15s both" }}>
          {categories.map((cat) => (
            <button key={cat.name} onClick={() => setActiveCategory(cat.name)} style={{ background: activeCategory===cat.name ? `${cat.color}20` : "rgba(255,255,255,0.04)", border:`1px solid ${activeCategory===cat.name ? cat.color+"60" : "rgba(255,255,255,0.09)"}`, color: activeCategory===cat.name ? cat.color : "rgba(240,236,255,0.45)", borderRadius:9, padding:"7px 16px", cursor:"pointer", fontSize:13, fontWeight:600, fontFamily:"'Space Grotesk',sans-serif", transition:"all 0.2s" }}>{cat.name}</button>
          ))}
          <button onClick={() => navigate("/categories")} style={{ marginLeft:"auto", background:"rgba(126,200,200,0.12)", border:"1px solid rgba(126,200,200,0.35)", color:"#7EC8C8", borderRadius:9, padding:"7px 18px", cursor:"pointer", fontSize:13, fontWeight:700, fontFamily:"'Space Grotesk',sans-serif" }}>+ Start a Debate</button>
        </div>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
          <h2 style={{ fontFamily:"'Lora',serif", fontSize:22, fontWeight:700, color:"#f0ecff" }}>{activeCategory==="All" ? "Trending Debates" : `${activeCategory} Debates`}</h2>
          <div style={{ display:"flex", gap:6 }}>
            {["Hot","New","Top"].map((s,i) => (
              <button key={s} style={{ background: i===0 ? "rgba(249,199,132,0.15)" : "transparent", border: i===0 ? "1px solid rgba(249,199,132,0.3)" : "1px solid transparent", color: i===0 ? "#F9C784" : "rgba(255,255,255,0.3)", borderRadius:6, padding:"4px 12px", cursor:"pointer", fontSize:12, fontFamily:"'Space Mono',monospace" }}>{s}</button>
            ))}
          </div>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          {filtered.map((debate, i) => <DebateCard key={debate.id} debate={debate} index={i} />)}
        </div>
        <div style={{ marginTop:56, background:"linear-gradient(135deg,rgba(126,200,200,0.1) 0%,rgba(181,168,213,0.1) 100%)", border:"1px solid rgba(126,200,200,0.2)", borderRadius:22, padding:"40px 48px", display:"flex", alignItems:"center", justifyContent:"space-between", gap:24, animation:"fadeSlideIn 0.6s ease 0.5s both" }}>
          <div>
            <h3 style={{ fontFamily:"'Lora',serif", fontSize:24, fontWeight:700, marginBottom:8, color:"#f0ecff" }}>Ready to make your case?</h3>
            <p style={{ color:"rgba(240,236,255,0.4)", fontSize:14, lineHeight:1.6 }}>Join thousands of debaters. Pick a side. Defend it.</p>
          </div>
          <div style={{ display:"flex", gap:12, flexShrink:0 }}>
            <button onClick={() => navigate("/categories")} style={{ background:"transparent", border:"1px solid rgba(255,255,255,0.15)", color:"rgba(240,236,255,0.6)", padding:"12px 24px", borderRadius:11, cursor:"pointer", fontSize:14, fontFamily:"'Space Grotesk',sans-serif" }}>Browse Debates</button>
            <button onClick={() => navigate("/register")} style={{ background:"linear-gradient(135deg,#7EC8C8,#a8dede)", border:"none", color:"#1a1625", padding:"12px 24px", borderRadius:11, cursor:"pointer", fontSize:14, fontWeight:700, fontFamily:"'Space Grotesk',sans-serif" }}>Create Account →</button>
          </div>
        </div>
      </main>
    </div>
  );
}
