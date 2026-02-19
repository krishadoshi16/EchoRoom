import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";

const CATEGORIES = [
  { name:"Technology",  color:"#00f5d4", icon:"💻", debates:142, description:"AI, software, gadgets, and the digital future" },
  { name:"Politics",    color:"#ff6b6b", icon:"🏛️", debates:89,  description:"Governance, policy, elections, and global affairs" },
  { name:"Science",     color:"#a29bfe", icon:"🔬", debates:76,  description:"Research, discoveries, space, and medicine" },
  { name:"Education",   color:"#fdcb6e", icon:"📚", debates:54,  description:"Schools, learning methods, and academic systems" },
  { name:"Environment", color:"#55efc4", icon:"🌍", debates:98,  description:"Climate, sustainability, energy, and ecology" },
  { name:"Society",     color:"#fd79a8", icon:"👥", debates:113, description:"Culture, ethics, social issues, and human rights" },
  { name:"Economy",     color:"#e17055", icon:"📈", debates:67,  description:"Finance, trade, markets, and economic systems" },
  { name:"Health",      color:"#00cec9", icon:"🏥", debates:81,  description:"Medicine, mental health, diet, and wellness" },
];

const ALL_DEBATES = [
  { id:1, category:"Technology",  categoryColor:"#00f5d4", title:"AI will replace software developers within 10 years",         for:847,  against:1203, opinions:312, hot:true,  timeAgo:"2h ago" },
  { id:2, category:"Politics",    categoryColor:"#ff6b6b", title:"Universal Basic Income is necessary for modern economies",     for:2103, against:1890, opinions:540, hot:true,  timeAgo:"5h ago" },
  { id:3, category:"Science",     categoryColor:"#a29bfe", title:"Mars colonization should be humanity's top priority",          for:654,  against:432,  opinions:198, hot:false, timeAgo:"1d ago" },
  { id:4, category:"Education",   categoryColor:"#fdcb6e", title:"Traditional universities will be obsolete in 20 years",        for:991,  against:1140, opinions:267, hot:false, timeAgo:"3d ago" },
  { id:5, category:"Environment", categoryColor:"#55efc4", title:"Nuclear energy is essential for climate change goals",         for:1567, against:876,  opinions:423, hot:true,  timeAgo:"6h ago" },
  { id:6, category:"Technology",  categoryColor:"#00f5d4", title:"Social media does more harm than good to society",             for:1100, against:980,  opinions:210, hot:false, timeAgo:"8h ago" },
  { id:7, category:"Society",     categoryColor:"#fd79a8", title:"Remote work should become the permanent standard",             for:1340, against:760,  opinions:330, hot:true,  timeAgo:"12h ago" },
  { id:8, category:"Health",      categoryColor:"#00cec9", title:"Mental health days should be mandatory in all workplaces",     for:2200, against:400,  opinions:480, hot:true,  timeAgo:"4h ago" },
];

export default function Category() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  const debates = selected
    ? ALL_DEBATES.filter((d) => d.category === selected)
    : ALL_DEBATES;

  const activeCategory = CATEGORIES.find((c) => c.name === selected);

  return (
    <div style={{ minHeight:"100vh", background:"#08080f",
      fontFamily:"'Space Grotesk',sans-serif", color:"#ffffff" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Space+Mono:wght@400;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        @keyframes fadeSlideIn { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        ::-webkit-scrollbar{width:4px} ::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.1);border-radius:2px}
      `}</style>

      <Navbar />

      <main style={{ maxWidth:960, margin:"0 auto", padding:"48px 24px 80px" }}>

        {/* Header */}
        <div style={{ marginBottom:40, animation:"fadeSlideIn 0.5s ease both" }}>
          <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(28px,4vw,42px)",
            fontWeight:900, marginBottom:10 }}>
            {selected ? `${activeCategory.icon} ${selected}` : "All Categories"}
          </h1>
          <p style={{ color:"rgba(255,255,255,0.4)", fontSize:15 }}>
            {selected ? activeCategory.description : "Browse debates by topic — find what matters to you"}
          </p>
        </div>

        {/* Category pills */}
        <div style={{ display:"flex", gap:10, flexWrap:"wrap", marginBottom:40,
          animation:"fadeSlideIn 0.5s ease 0.05s both" }}>
          <button onClick={() => setSelected(null)} style={{
            background: !selected ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.03)",
            border:`1px solid ${!selected ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.08)"}`,
            color: !selected ? "#ffffff" : "rgba(255,255,255,0.4)",
            borderRadius:8, padding:"8px 18px", cursor:"pointer",
            fontSize:13, fontWeight:600, fontFamily:"'Space Grotesk',sans-serif", transition:"all 0.2s",
          }}>All</button>
          {CATEGORIES.map((cat) => (
            <button key={cat.name} onClick={() => setSelected(cat.name === selected ? null : cat.name)} style={{
              background: selected===cat.name ? `${cat.color}22` : "rgba(255,255,255,0.03)",
              border:`1px solid ${selected===cat.name ? cat.color+"55" : "rgba(255,255,255,0.08)"}`,
              color: selected===cat.name ? cat.color : "rgba(255,255,255,0.45)",
              borderRadius:8, padding:"8px 18px", cursor:"pointer",
              fontSize:13, fontWeight:600, fontFamily:"'Space Grotesk',sans-serif", transition:"all 0.2s",
            }}>{cat.icon} {cat.name} <span style={{ opacity:0.5, fontSize:11 }}>({cat.debates})</span></button>
          ))}
        </div>

        {/* Category cards grid (only when nothing selected) */}
        {!selected && (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",
            gap:16, marginBottom:48, animation:"fadeSlideIn 0.5s ease 0.1s both" }}>
            {CATEGORIES.map((cat) => (
              <div key={cat.name} onClick={() => setSelected(cat.name)}
                style={{
                  background:"rgba(255,255,255,0.03)",
                  border:`1px solid rgba(255,255,255,0.07)`,
                  borderRadius:14, padding:"24px 22px", cursor:"pointer",
                  transition:"all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = `${cat.color}11`;
                  e.currentTarget.style.borderColor = `${cat.color}44`;
                  e.currentTarget.style.transform = "translateY(-3px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div style={{ fontSize:32, marginBottom:12 }}>{cat.icon}</div>
                <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:18,
                  fontWeight:700, marginBottom:6, color:"#ffffff" }}>{cat.name}</h3>
                <p style={{ color:"rgba(255,255,255,0.35)", fontSize:12,
                  lineHeight:1.5, marginBottom:14 }}>{cat.description}</p>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                  <span style={{ color:cat.color, fontSize:12,
                    fontFamily:"'Space Mono',monospace", fontWeight:700 }}>
                    {cat.debates} debates
                  </span>
                  <span style={{ color:cat.color, fontSize:14 }}>→</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Debates list */}
        <div>
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:20,
            fontWeight:700, marginBottom:20, color:"rgba(255,255,255,0.85)" }}>
            {selected ? `${debates.length} Debates in ${selected}` : "All Debates"}
          </h2>
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            {debates.map((debate, i) => {
              const total  = debate.for + debate.against;
              const forPct = Math.round((debate.for / total) * 100);
              return (
                <div key={debate.id} onClick={() => navigate(`/debate/${debate.id}`)}
                  style={{
                    background:"rgba(255,255,255,0.03)",
                    border:"1px solid rgba(255,255,255,0.07)",
                    borderLeft:`3px solid ${debate.categoryColor}`,
                    borderRadius:14, padding:"20px 24px", cursor:"pointer",
                    transition:"all 0.2s",
                    animationDelay:`${i*0.06}s`, animation:"fadeSlideIn 0.4s ease both",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background="rgba(255,255,255,0.055)"; e.currentTarget.style.transform="translateY(-2px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background="rgba(255,255,255,0.03)";  e.currentTarget.style.transform="translateY(0)"; }}
                >
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:10 }}>
                    <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                      <span style={{
                        background:`${debate.categoryColor}22`, color:debate.categoryColor,
                        border:`1px solid ${debate.categoryColor}44`,
                        borderRadius:5, padding:"2px 8px", fontSize:10, fontWeight:700,
                        letterSpacing:1, textTransform:"uppercase", fontFamily:"'Space Mono',monospace",
                      }}>{debate.category}</span>
                      {debate.hot && <span style={{ fontSize:10, color:"#ff6b6b", fontFamily:"'Space Mono',monospace" }}>🔥 HOT</span>}
                    </div>
                    <span style={{ color:"rgba(255,255,255,0.3)", fontSize:11, fontFamily:"'Space Mono',monospace" }}>{debate.timeAgo}</span>
                  </div>
                  <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:16,
                    fontWeight:700, lineHeight:1.4, marginBottom:14, color:"#ffffff" }}>
                    {debate.title}
                  </h3>
                  <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                    <span style={{ color:"#00f5d4", fontSize:11, fontFamily:"'Space Mono',monospace", fontWeight:700 }}>FOR {forPct}%</span>
                    <div style={{ flex:1, height:3, borderRadius:2, background:"#1a1a2e", overflow:"hidden", display:"flex" }}>
                      <div style={{ width:`${forPct}%`, background:"linear-gradient(90deg,#00f5d4,#00b4d8)", borderRadius:"2px 0 0 2px" }} />
                      <div style={{ width:`${100-forPct}%`, background:"linear-gradient(90deg,#ff6b6b,#e84393)", borderRadius:"0 2px 2px 0" }} />
                    </div>
                    <span style={{ color:"#ff6b6b", fontSize:11, fontFamily:"'Space Mono',monospace", fontWeight:700 }}>{100-forPct}% AGN</span>
                    <span style={{ color:"rgba(255,255,255,0.3)", fontSize:11, fontFamily:"'Space Mono',monospace", marginLeft:8 }}>
                      💬 {debate.opinions}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
