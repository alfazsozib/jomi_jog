import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";

const C = {
  primary: "#7ED957", primaryDark: "#5cb83a", primaryLight: "#e8f8de",
  bg: "#F5F3ED", dark: "#1a1a2e", muted: "#888", white: "#ffffff",
  red: "#ef4444", redLight: "#fef2f2", redBorder: "#fca5a5",
  amber: "#f59e0b", amberLight: "#fffbeb",
};

const todayD = new Date(); todayD.setHours(0,0,0,0);
const toKey  = (d) => { const y=d.getFullYear(),m=String(d.getMonth()+1).padStart(2,"0"),dd=String(d.getDate()).padStart(2,"0"); return `${y}-${m}-${dd}`; };
const getDaysInMonth = (y,m) => new Date(y,m+1,0).getDate();
const getFirstDay    = (y,m) => new Date(y,m,1).getDay();
const MONTHS = ["জানুয়ারি","ফেব্রুয়ারি","মার্চ","এপ্রিল","মে","জুন","জুলাই","আগস্ট","সেপ্টেম্বর","অক্টোবর","নভেম্বর","ডিসেম্বর"];
const DAYS   = ["রবি","সোম","মঙ্গল","বুধ","বৃহস্পতি","শুক্র","শনি"];
const fmtDate      = (key) => new Date(key+"T00:00:00").toLocaleDateString("bn-BD",{weekday:"long",year:"numeric",month:"long",day:"numeric"});
const fmtDateShort = (dateStr) => { if(!dateStr) return "তারিখ নেই"; return new Date(dateStr).toLocaleDateString("bn-BD",{year:"numeric",month:"long",day:"numeric"}); };

// ─── Notification Panel ───────────────────────────────────────
const NotificationPanel = ({ notifications, onClose, onMarkAllRead, onNotificationClick }) => (
  <>
    <div onClick={onClose} style={{position:"fixed",inset:0,zIndex:999}}/>
    <div style={{
      position:"absolute",top:52,right:0,zIndex:1000,
      background:C.white,borderRadius:20,
      boxShadow:"0 8px 40px rgba(0,0,0,0.15)",
      width:360,maxWidth:"90vw",maxHeight:480,
      overflow:"hidden",display:"flex",flexDirection:"column",
      border:"1px solid #e5e7eb",
    }}>
      <div style={{padding:"16px 20px",borderBottom:"1px solid #f3f4f6",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <span style={{fontWeight:800,fontSize:15,color:C.dark}}>🔔 নোটিফিকেশন</span>
        {notifications.some(n=>!n.read) && (
          <button onClick={onMarkAllRead} style={{fontSize:12,color:C.primary,background:"none",border:"none",cursor:"pointer",fontWeight:700}}>
            সব পড়া হয়েছে ✓
          </button>
        )}
      </div>
      <div style={{overflowY:"auto",flex:1}}>
        {notifications.length===0 ? (
          <div style={{padding:40,textAlign:"center",color:C.muted,fontSize:14}}>
            <div style={{fontSize:36,marginBottom:8}}>🔕</div>
            কোনো নোটিফিকেশন নেই
          </div>
        ) : (
          notifications.map((n,i) => (
            <div 
              key={i} 
              onClick={() => onNotificationClick(n)}
              style={{
                padding:"14px 20px",
                borderBottom:"1px solid #f9fafb",
                background: n.read ? C.white : "#f0fdf4",
                cursor: "pointer",
                transition: "background 0.12s",
              }}
              onMouseEnter={(e) => {
                if (!n.read) e.currentTarget.style.background = "#e6f4ea";
              }}
              onMouseLeave={(e) => {
                if (!n.read) e.currentTarget.style.background = "#f0fdf4";
              }}
            >
              <div style={{display:"flex",alignItems:"flex-start",gap:10}}>
                <div style={{
                  width:36,height:36,borderRadius:"50%",flexShrink:0,
                  background: n.read ? "#f3f4f6" : C.primaryLight,
                  display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,
                }}>✅</div>
                <div style={{flex:1}}>
                  <p style={{margin:0,fontSize:13,fontWeight:700,color:C.dark}}>{n.message}</p>
                  <p style={{margin:"3px 0 0",fontSize:11,color:C.muted}}>
                    {n.createdAt ? new Date(n.createdAt).toLocaleDateString("bn-BD",{year:"numeric",month:"short",day:"numeric"}) : ""}
                  </p>
                  {!n.read && (
                    <span style={{display:"inline-block",marginTop:4,background:C.primary,color:C.white,borderRadius:20,padding:"1px 8px",fontSize:10,fontWeight:700}}>নতুন</span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  </>
);

const Backdrop = ({onClick}) => <div onClick={onClick} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.45)",zIndex:1000,backdropFilter:"blur(2px)"}}/>;

const ChoiceDialog = ({date,onNote,onOther,onClose}) => (
  <><Backdrop onClick={onClose}/>
  <div style={{position:"fixed",top:"50%",left:"50%",transform:"translate(-50%,-50%)",zIndex:1001,background:C.white,borderRadius:24,padding:36,boxShadow:"0 20px 60px rgba(0,0,0,0.18)",width:360,maxWidth:"90vw"}}>
    <div style={{textAlign:"center",marginBottom:20}}>
      <div style={{fontSize:32,marginBottom:8}}>📅</div>
      <h3 style={{margin:0,fontSize:18,fontWeight:800,color:C.dark}}>তারিখ চিহ্নিত করুন</h3>
      <p style={{margin:"6px 0 0",color:C.muted,fontSize:13}}>{fmtDate(date)}</p>
    </div>
    <p style={{textAlign:"center",color:C.muted,fontSize:13,marginBottom:20}}>এই তারিখটি কেন অনুপলব্ধ করছেন?</p>
    <div style={{display:"flex",flexDirection:"column",gap:12}}>
      <button onClick={onNote}  style={{padding:"14px 0",background:C.primary,color:C.white,border:"none",borderRadius:14,fontWeight:700,fontSize:15,cursor:"pointer"}}>📝 নোট — বুকিং তথ্য যোগ করুন</button>
      <button onClick={onOther} style={{padding:"14px 0",background:C.bg,color:C.dark,border:"2px solid #e5e7eb",borderRadius:14,fontWeight:700,fontSize:15,cursor:"pointer"}}>🔒 অন্যান্য — ব্যক্তিগত কারণ</button>
      <button onClick={onClose} style={{padding:"10px 0",background:"transparent",color:C.muted,border:"none",fontSize:13,cursor:"pointer"}}>বাতিল</button>
    </div>
  </div></>
);

const NoteDialog = ({date,existing,onSave,onClose}) => {
  const [form,setForm] = useState({clientName:existing?.clientName||"",clientMobile:existing?.clientMobile||"",location:existing?.location||"",note:existing?.note||""});
  const handle = (e) => setForm(f=>({...f,[e.target.name]:e.target.value}));
  const inp = {width:"100%",padding:"10px 14px",border:"2px solid #e5e7eb",borderRadius:10,fontSize:14,outline:"none",boxSizing:"border-box",fontFamily:"inherit"};
  const lbl = {fontSize:12,fontWeight:700,color:C.muted,textTransform:"uppercase",letterSpacing:"0.05em",display:"block",marginBottom:4};
  return (
    <><Backdrop onClick={onClose}/>
    <div style={{position:"fixed",top:"50%",left:"50%",transform:"translate(-50%,-50%)",zIndex:1001,background:C.white,borderRadius:24,padding:32,boxShadow:"0 20px 60px rgba(0,0,0,0.18)",width:420,maxWidth:"90vw",maxHeight:"90vh",overflowY:"auto"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <div>
          <h3 style={{margin:0,fontSize:18,fontWeight:800,color:C.dark}}>{existing?"বুকিং নোট সম্পাদনা":"বুকিং নোট যোগ করুন"}</h3>
          <p style={{margin:"4px 0 0",color:C.muted,fontSize:12}}>{fmtDate(date)}</p>
        </div>
        <button onClick={onClose} style={{background:"none",border:"none",fontSize:20,cursor:"pointer",color:C.muted}}>✕</button>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:16}}>
        <div><label style={lbl}>ক্লায়েন্টের নাম</label><input name="clientName" value={form.clientName} onChange={handle} placeholder="ক্লায়েন্টের পূর্ণ নাম" style={inp}/></div>
        <div><label style={lbl}>মোবাইল নম্বর</label><input name="clientMobile" value={form.clientMobile} onChange={handle} placeholder="০১XXXXXXXXX" style={inp}/></div>
        <div><label style={lbl}>জরিপের স্থান</label><input name="location" value={form.location} onChange={handle} placeholder="গ্রাম / এলাকা / জেলা" style={inp}/></div>
        <div><label style={lbl}>নোট</label><textarea name="note" value={form.note} onChange={handle} placeholder="অতিরিক্ত তথ্য লিখুন..." rows={3} style={{...inp,resize:"vertical"}}/></div>
      </div>
      <div style={{display:"flex",gap:10,marginTop:20}}>
        <button onClick={()=>onSave(date,form)} style={{flex:1,padding:"12px 0",background:C.primary,color:C.white,border:"none",borderRadius:12,fontWeight:700,fontSize:15,cursor:"pointer"}}>{existing?"আপডেট করুন":"বুকিং সংরক্ষণ করুন"}</button>
        <button onClick={onClose} style={{padding:"12px 20px",background:C.bg,color:C.muted,border:"2px solid #e5e7eb",borderRadius:12,fontWeight:600,cursor:"pointer"}}>বাতিল</button>
      </div>
    </div></>
  );
};

const Calendar = ({bookedDates,noteEvents,onDayClick}) => {
  const [cur,setCur] = useState({year:todayD.getFullYear(),month:todayD.getMonth()});
  const prev = () => setCur(c=>c.month===0?{year:c.year-1,month:11}:{...c,month:c.month-1});
  const next = () => setCur(c=>c.month===11?{year:c.year+1,month:0}:{...c,month:c.month+1});
  const daysInMonth=getDaysInMonth(cur.year,cur.month), firstDay=getFirstDay(cur.year,cur.month);
  const cells=[]; for(let i=0;i<firstDay;i++) cells.push(null); for(let d=1;d<=daysInMonth;d++) cells.push(d);
  return (
    <div style={{width:"100%"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
        <button style={S.navBtn} onClick={prev}>‹</button>
        <span style={{fontWeight:800,fontSize:17,color:C.dark}}>{MONTHS[cur.month]} {cur.year}</span>
        <button style={S.navBtn} onClick={next}>›</button>
      </div>
      <div style={S.dayGrid}>{DAYS.map(d=><div key={d} style={S.dayName}>{d}</div>)}</div>
      <div style={S.dayGrid}>
        {cells.map((day,i)=>{
          if(!day) return <div key={`e-${i}`}/>;
          const date=new Date(cur.year,cur.month,day); date.setHours(0,0,0,0);
          const key=toKey(date), isPast=date<todayD;
          const isNote=Object.prototype.hasOwnProperty.call(noteEvents,key);
          const isOther=bookedDates.includes(key)&&!isNote;
          const isToday=key===toKey(todayD);
          let cs={...S.cell};
          if(isPast)       cs={...cs,...S.pastCell};
          else if(isNote)  cs={...cs,...S.noteCell};
          else if(isOther) cs={...cs,...S.bookedCell};
          else if(isToday) cs={...cs,...S.todayCell};
          else             cs={...cs,...S.availCell};
          return (
            <div key={key} style={cs} onClick={()=>!isPast&&onDayClick(key)}
              title={isPast?"অতীত তারিখ":isNote?`বুকিং: ${noteEvents[key]?.clientName||"নোট"}`:isOther?"ব্লক করা":"পাওয়া যাচ্ছে"}>
              {day}{isNote&&<span style={S.noteDot}/>}
            </div>
          );
        })}
      </div>
      <div style={S.legend}>
        <span style={S.li}><span style={{...S.ld,background:C.primary}}/> পাওয়া যাচ্ছে</span>
        <span style={S.li}><span style={{...S.ld,background:C.amber}}/> নোট বুকিং</span>
        <span style={S.li}><span style={{...S.ld,background:C.red}}/> ব্লক করা</span>
        <span style={S.li}><span style={{...S.ld,background:"#d1d5db"}}/> অতীত</span>
      </div>
    </div>
  );
};

// ─── মূল ড্যাশবোর্ড ──────────────────────────────────────────
const SurveyorDashboard = () => {
  const user = JSON.parse(localStorage.getItem("userInfo")||"{}");

  const [bookings,      setBookings]      = useState([]);
  const [bookedDates,   setBookedDates]   = useState([]);
  const [noteEvents,    setNoteEvents]    = useState({});
  const [notifications, setNotifications] = useState([]);
  const [activeTab,     setActiveTab]     = useState("calendar");
  const [choiceDate,    setChoiceDate]    = useState(null);
  const [noteDate,      setNoteDate]      = useState(null);
  const [editingNote,   setEditingNote]   = useState(null);
  const [saving,        setSaving]        = useState(false);
  const [saveMsg,       setSaveMsg]       = useState("");
  const [showNotif,     setShowNotif]     = useState(false);

  useEffect(()=>{
    if(!user?._id || user.role!=="surveyor") return;
    fetchBookings();
    fetchBookedDates();
    fetchNotifications();
  },[]);

  const fetchBookings = async () => {
    try {
      const {data} = await axios.get(`https://jomijog.com/api/bookings/surveyor/${user._id}`);
      setBookings(Array.isArray(data) ? data : []);
    } catch(err){ console.error("fetchBookings:", err.response?.status, err.response?.data); }
  };

  const fetchBookedDates = async () => {
    try {
      const {data} = await axios.get(`https://jomijog.com/api/users/${user._id}/booked-dates`);
      setBookedDates(data.bookedDates||[]);
      const raw = data.noteEvents;
      if(raw && typeof raw==="object" && !Array.isArray(raw)) {
        const cleaned = {};
        Object.keys(raw).forEach(k => {
          const v = raw[k];
          if(v && typeof v==="object") {
            cleaned[k] = {
              clientName:   String(v.clientName||""),
              clientMobile: String(v.clientMobile||""),
              location:     String(v.location||""),
              note:         String(v.note||""),
            };
          }
        });
        setNoteEvents(cleaned);
      } else { setNoteEvents({}); }
    } catch(err){ console.error("fetchBookedDates:", err.response?.status, err.response?.data); }
  };

  const fetchNotifications = async () => {
    try {
      const {data} = await axios.get(`https://jomijog.com/api/bookings/notifications/${user._id}`);
      const notifs = Array.isArray(data) ? data : [];
      setNotifications(notifs);

      // Auto-block dates from new/unread notifications (like choosing "অন্যান্য")
      const currentBooked = new Set(bookedDates);
      const newlyBlocked = [];

      notifs.forEach(n => {
        if (n.read) return;

        const msg = (n.message || "").trim();
        if (!msg) return;

        const lower = msg.toLowerCase();
        if (!lower.includes('বুকিং') && 
            !lower.includes('booking') && 
            !lower.includes('গৃহীত') && 
            !lower.includes('অনুমোদিত') && 
            !lower.includes('নতুন') && 
            !lower.includes('তারিখ')) return;

        // Try multiple date patterns
        let dateKey = null;
        const patterns = [
          /(\d{4})[/-](\d{1,2})[/-](\d{1,2})/,           // YYYY-MM-DD
          /(\d{1,2})[/-](\d{1,2})[/-](\d{4})/,            // DD-MM-YYYY or DD/MM/YYYY
          /(\d{1,2})[/-](\d{1,2})[/-](\d{2})/             // DD-MM-YY
        ];

        for (const pat of patterns) {
          const match = msg.match(pat);
          if (match) {
            let y, m, d;
            if (match[1].length === 4) {
              [y, m, d] = [match[1], match[2], match[3]];
            } else {
              [d, m, y] = [match[1], match[2], match[3]];
              if (y.length === 2) y = '20' + y;
            }
            dateKey = `${y}-${m.padStart(2,'0')}-${d.padStart(2,'0')}`;
            break;
          }
        }

        if (dateKey && !currentBooked.has(dateKey)) {
          const dateObj = new Date(dateKey);
          if (!isNaN(dateObj.getTime()) && dateObj >= todayD) {
            newlyBlocked.push(dateKey);
          }
        }
      });

      if (newlyBlocked.length > 0) {
        const updated = [...bookedDates, ...newlyBlocked];
        setBookedDates(updated);
        // Save and force refresh to update calendar + stats
        await persistToServer(updated, noteEvents);
        await fetchBookedDates(); // ← ensures calendar re-renders and count updates
      }
    } catch(err){ console.error("fetchNotifications:", err.response?.status, err.response?.data); }
  };

  const unreadCount = notifications.filter(n=>!n.read).length;

  const markAllRead = async () => {
    try {
      await axios.put(`https://jomijog.com/api/bookings/notifications/${user._id}/read`);
      setNotifications(prev => prev.map(n=>({...n, read:true})));
    } catch(err){ console.error("markAllRead:", err); }
  };

  const handleNotificationClick = (notification) => {
    setActiveTab("bookings");
    setShowNotif(false);
  };

  const handleDayClick = (key) => {
    if(bookedDates.includes(key)){
      if(window.confirm(`${fmtDate(key)} — এই তারিখের ব্লক সরাতে চান?`)){
        const newDates=bookedDates.filter(d=>d!==key);
        const newNotes={...noteEvents}; delete newNotes[key];
        setBookedDates(newDates); setNoteEvents(newNotes);
        persistToServer(newDates,newNotes);
      }
      return;
    }
    setChoiceDate(key);
  };

  const handleChooseNote  = () => { setNoteDate(choiceDate); setEditingNote(null); setChoiceDate(null); };
  const handleChooseOther = async () => {
    const key=choiceDate; setChoiceDate(null);
    const newDates=[...bookedDates,key]; setBookedDates(newDates);
    await persistToServer(newDates,noteEvents);
  };

  const handleSaveNote = async (key,form) => {
    const newDates=bookedDates.includes(key)?bookedDates:[...bookedDates,key];
    const newNotes={...noteEvents,[key]:form};
    setBookedDates(newDates); setNoteEvents(newNotes);
    setNoteDate(null); setEditingNote(null);
    await persistToServer(newDates,newNotes);
  };

  const handleDeleteNote = async (key) => {
    if(!window.confirm(`${fmtDate(key)} — এই বুকিং নোট মুছতে চান?`)) return;
    const newDates=bookedDates.filter(d=>d!==key);
    const newNotes={...noteEvents}; delete newNotes[key];
    setBookedDates(newDates); setNoteEvents(newNotes);
    await persistToServer(newDates,newNotes);
  };

  const handleEditNote = (key) => { setEditingNote(noteEvents[key]); setNoteDate(key); };

  const handleCompleteBooking = async (booking) => {
    if (!booking?._id) return;

    if (!window.confirm("এই বুকিং সম্পন্ন হিসেবে চিহ্নিত করবেন? তারিখ আবার উপলব্ধ হবে।")) return;

    try {
      await axios.delete(`https://jomijog.com/api/bookings/${booking._id}`);

      // Free the date in calendar
      const bookingDate = new Date(booking.date);
      const key = toKey(bookingDate);
      const newDates = bookedDates.filter(d => d !== key);
      setBookedDates(newDates);

      // Refresh lists
      await fetchBookings();
      await persistToServer(newDates, noteEvents);
    } catch(err){
      console.error("handleCompleteBooking:", err);
      alert("বুকিং মুছতে সমস্যা হয়েছে।");
    }
  };

  const persistToServer = async (dates,notes) => {
    setSaving(true); setSaveMsg("");
    try {
      await axios.put(
        `https://jomijog.com/api/users/${user._id}/booked-dates`,
        { bookedDates: dates, noteEvents: notes },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setSaveMsg("✓ সফলভাবে সংরক্ষিত হয়েছে!");

      // Force reload from server so notes always persist after refresh
      await fetchBookedDates();
      await fetchBookings();
    } catch(err){
      console.error("persistToServer:", err.response?.status, err.response?.data);
      setSaveMsg("✗ সংরক্ষণ ব্যর্থ হয়েছে");
    }
    finally{ setSaving(false); setTimeout(()=>setSaveMsg(""),2500); }
  };

  const noteList = Object.entries(noteEvents).sort(([a],[b])=>a.localeCompare(b));

  return (
    <div style={S.page}>
      <Navbar/>
      {choiceDate && <ChoiceDialog date={choiceDate} onNote={handleChooseNote} onOther={handleChooseOther} onClose={()=>setChoiceDate(null)}/>}
      {noteDate   && <NoteDialog  date={noteDate}   existing={editingNote}    onSave={handleSaveNote}     onClose={()=>{setNoteDate(null);setEditingNote(null);}}/>}

      <div style={S.container}>

        {/* ── হেডার ── */}
        <div style={S.header}>
          <div>
            <h1 style={S.title}>সার্ভেয়ার ড্যাশবোর্ড</h1>
            <p style={S.subtitle}>স্বাগতম, <strong>{user.name}</strong></p>
          </div>

          <div style={{display:"flex",alignItems:"center",gap:16,flexWrap:"wrap"}}>
            {/* 🔔 Bell */}
            <div style={{position:"relative"}}>
              <button
                onClick={()=>setShowNotif(v=>!v)}
                style={{
                  width:44,height:44,borderRadius:"50%",
                  background:unreadCount>0?C.primaryLight:"#f3f4f6",
                  border:unreadCount>0?`2px solid ${C.primary}`:"2px solid #e5e7eb",
                  cursor:"pointer",fontSize:20,
                  display:"flex",alignItems:"center",justifyContent:"center",
                  position:"relative",
                }}
              >
                🔔
                {unreadCount>0 && (
                  <span style={{
                    position:"absolute",top:-4,right:-4,
                    background:C.red,color:C.white,borderRadius:"50%",
                    width:20,height:20,fontSize:11,fontWeight:800,
                    display:"flex",alignItems:"center",justifyContent:"center",
                    border:"2px solid white",
                  }}>{unreadCount}</span>
                )}
              </button>
              {showNotif && (
                <NotificationPanel
                  notifications={notifications}
                  onClose={()=>setShowNotif(false)}
                  onMarkAllRead={()=>{ markAllRead(); setShowNotif(false); }}
                  onNotificationClick={handleNotificationClick}
                />
              )}
            </div>

            {/* Stats */}
            <div style={S.statsRow}>
              {[
                {n:bookings.length,    l:"অনুমোদিত বুকিং"},
                {n:bookedDates.length, l:"ব্লক করা তারিখ"},
                {n:noteList.length,    l:"নোট ইভেন্ট"},
              ].map((s,i)=>(
                <div key={i} style={S.statCard}>
                  <span style={S.statNum}>{s.n}</span>
                  <span style={S.statLabel}>{s.l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* সেভ মেসেজ */}
        {saveMsg && (
          <div style={{marginBottom:16,padding:"10px 20px",borderRadius:10,textAlign:"center",background:saveMsg.startsWith("✓")?C.primaryLight:C.redLight,color:saveMsg.startsWith("✓")?C.primaryDark:C.red,fontWeight:700,fontSize:14}}>
            {saveMsg}
          </div>
        )}

        {/* ── ট্যাব ── */}
        <div style={S.tabs}>
          {[
            {id:"calendar", label:"📅 উপলব্ধতা ক্যালেন্ডার"},
            {id:"events",   label:`📝 নোট ইভেন্ট (${noteList.length})`},
            {id:"bookings", label:`📋 আমার বুকিং (${bookings.length})`},
          ].map(tab=>(
            <button key={tab.id} style={activeTab===tab.id?{...S.tab,...S.activeTab}:S.tab} onClick={()=>setActiveTab(tab.id)}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── ক্যালেন্ডার ─────────────────────────────────────── */}
        {activeTab==="calendar" && (
          <div style={{display:"flex",justifyContent:"center"}}>
            <div style={S.calCard}>
              <h2 style={S.sectionTitle}>আপনার উপলব্ধতা পরিচালনা করুন</h2>
              <p style={{color:C.muted,fontSize:13,marginBottom:24,lineHeight:1.7}}>
                যেকোনো ভবিষ্যত তারিখে ক্লিক করুন। <strong>নোট</strong> বেছে নিলে বুকিং তথ্য যোগ করতে পারবেন, আর <strong>অন্যান্য</strong> বেছে নিলে ব্যক্তিগত কারণে ব্লক হবে। চিহ্নিত তারিখে আবার ক্লিক করলে সরানো যাবে।
              </p>
              <Calendar bookedDates={bookedDates} noteEvents={noteEvents} onDayClick={handleDayClick}/>
            </div>
          </div>
        )}

        {/* ── নোট ইভেন্ট ──────────────────────────────────────── */}
        {activeTab==="events" && (
          noteList.length===0 ? (
            <div style={S.empty}><span style={{fontSize:48}}>📝</span><p>এখনো কোনো বুকিং নোট নেই।</p></div>
          ) : (
            <div style={S.eventGrid}>
              {noteList.map(([key,ev])=>{
                if(!ev||typeof ev!=="object") return null;
                return (
                  <div key={key} style={S.eventCard}>
                    <div style={S.eventHeader}>
                      <span style={S.eventDate}>{fmtDate(key)}</span>
                      <span style={S.noteBadge}>📝 নোট</span>
                    </div>
                    <div style={S.eventBody}>
                      {ev.clientName   && <div style={S.evRow}><span style={S.evLabel}>👤 ক্লায়েন্ট</span><span style={S.evVal}>{String(ev.clientName)}</span></div>}
                      {ev.clientMobile && <div style={S.evRow}><span style={S.evLabel}>📱 মোবাইল</span><span style={S.evVal}>{String(ev.clientMobile)}</span></div>}
                      {ev.location     && <div style={S.evRow}><span style={S.evLabel}>📍 স্থান</span><span style={S.evVal}>{String(ev.location)}</span></div>}
                      {ev.note         && <div style={{...S.evRow,flexDirection:"column",gap:4}}><span style={S.evLabel}>🗒 নোট</span><span style={{...S.evVal,color:C.muted,fontSize:13}}>{String(ev.note)}</span></div>}
                    </div>
                    <div style={S.eventActions}>
                      <button onClick={()=>handleEditNote(key)} style={S.editBtn}>✏️ সম্পাদনা</button>
                      <button onClick={()=>handleDeleteNote(key)} style={S.deleteBtn}>🗑 মুছুন</button>
                    </div>
                  </div>
                );
              })}
            </div>
          )
        )}

        {/* ── আমার বুকিং ──────────────────────────────────────── */}
        {activeTab==="bookings" && (
          bookings.length===0 ? (
            <div style={S.empty}>
              <span style={{fontSize:48}}>📭</span>
              <p>এখনো কোনো অনুমোদিত বুকিং নেই।</p>
            </div>
          ) : (
            <div style={S.bookingGrid}>
              {bookings.map((b,i)=>(
                <div key={b._id} style={S.bookingCard}>
                  <div style={S.bookingHeader}>
                    <span style={{fontWeight:700,color:C.dark}}>বুকিং #{i+1}</span>
                    <span style={S.approvedBadge}>✓ গৃহীত</span>
                  </div>
                  <div style={S.bookingBody}>
                    <div style={S.infoGroup}><p style={S.infoLabel}>👤 ক্লায়েন্ট</p><p style={S.infoValue}>{b.userId?.name||"নাই"}</p></div>
                    <div style={S.infoGroup}><p style={S.infoLabel}>📍 ঠিকানা</p><p style={S.infoValue}>{b.userId?.address||"নাই"}</p></div>
                    <div style={S.infoGroup}><p style={S.infoLabel}>💰 মূল্য</p><p style={S.infoValue}>{b.price} টাকা</p></div>
                    {b.date&&<div style={S.infoGroup}><p style={S.infoLabel}>📅 তারিখ</p><p style={S.infoValue}>{fmtDateShort(b.date)}</p></div>}
                  </div>
                  <div style={{padding:"12px 20px",borderTop:"1px solid #e5e7eb",display:"flex",gap:10,justifyContent:"flex-end"}}>
                    {/* Existing Complete button */}
                    <button
                      onClick={() => handleCompleteBooking(b)}
                      style={{
                        padding:"8px 16px",
                        background:"#10b981",
                        color:"white",
                        border:"none",
                        borderRadius:8,
                        fontWeight:400,
                        cursor:"pointer",
                      }}
                    >
                      সম্পন্ন
                    </button>

                    {/* NEW button: Add to Calendar (block date) */}
                    <button
                      onClick={async () => {
                        if (!b.date) {
                          alert("এই বুকিং-এ কোনো তারিখ নেই।");
                          return;
                        }

                        const bookingDate = new Date(b.date);
                        const key = toKey(bookingDate);

                        if (bookedDates.includes(key)) {
                          alert("এই তারিখ ইতিমধ্যে ব্লক করা আছে।");
                          return;
                        }

                        if (!window.confirm(`তারিখ ${fmtDateShort(b.date)} ক্যালেন্ডারে ব্লক করবেন?`)) return;

                        const updated = [...bookedDates, key];
                        setBookedDates(updated);
                        await persistToServer(updated, noteEvents);
                      }}
                      style={{
                        padding:"8px 16px",
                        background:C.amber,
                        color:C.dark,
                        border:"none",
                        borderRadius:8,
                        fontWeight:400,
                        cursor:"pointer",
                      }}
                    >
                      ক্যালেন্ডারে যোগ করুন
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )
        )}

      </div>
    </div>
  );
};

const S = {
  page:{minHeight:"100vh",background:C.bg,fontFamily:"'Segoe UI', sans-serif"},
  container:{maxWidth:1100,margin:"0 auto",padding:"32px 20px"},
  header:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:24,flexWrap:"wrap",gap:16},
  title:{fontSize:32,fontWeight:800,color:C.dark,margin:0},
  subtitle:{color:C.muted,marginTop:4,fontSize:15},
  statsRow:{display:"flex",gap:12,flexWrap:"wrap"},
  statCard:{background:C.white,borderRadius:16,padding:"14px 20px",display:"flex",flexDirection:"column",alignItems:"center",boxShadow:"0 2px 12px rgba(0,0,0,0.07)",border:`2px solid ${C.primaryLight}`,minWidth:110},
  statNum:{fontSize:26,fontWeight:800,color:C.primary},
  statLabel:{fontSize:11,color:C.muted,marginTop:2,textAlign:"center"},
  tabs:{display:"flex",gap:8,marginBottom:24,flexWrap:"wrap"},
  tab:{padding:"10px 20px",borderRadius:12,border:"2px solid #e5e7eb",background:C.white,cursor:"pointer",fontWeight:600,fontSize:13,color:C.muted},
  activeTab:{background:C.primary,color:C.white,border:`2px solid ${C.primary}`},
  calCard:{background:C.white,borderRadius:24,padding:36,boxShadow:"0 4px 24px rgba(0,0,0,0.08)",maxWidth:500,width:"100%"},
  sectionTitle:{fontSize:20,fontWeight:700,color:C.dark,marginBottom:8,marginTop:0},
  navBtn:{background:C.primaryLight,border:"none",borderRadius:8,width:36,height:36,cursor:"pointer",fontSize:20,color:C.primaryDark,fontWeight:700},
  dayGrid:{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:4,marginBottom:4},
  dayName:{textAlign:"center",fontSize:10,fontWeight:700,color:C.muted,padding:"4px 0"},
  cell:{textAlign:"center",borderRadius:10,padding:"8px 0",fontSize:13,fontWeight:600,cursor:"pointer",transition:"all 0.15s",userSelect:"none",position:"relative"},
  pastCell:{color:"#d1d5db",cursor:"not-allowed"},
  bookedCell:{background:C.redLight,color:C.red,border:`2px solid ${C.redBorder}`},
  noteCell:{background:C.amberLight,color:C.amber,border:"2px solid #fcd34d"},
  todayCell:{background:C.primaryLight,color:C.primaryDark,border:`2px solid ${C.primary}`,fontWeight:800},
  availCell:{background:"transparent",color:C.dark,border:"2px solid transparent"},
  noteDot:{position:"absolute",bottom:2,left:"50%",transform:"translateX(-50%)",width:4,height:4,borderRadius:"50%",background:C.amber},
  legend:{display:"flex",gap:14,marginTop:16,justifyContent:"center",flexWrap:"wrap"},
  li:{display:"flex",alignItems:"center",gap:5,fontSize:11,color:C.muted},
  ld:{width:10,height:10,borderRadius:"50%",display:"inline-block"},
  eventGrid:{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))",gap:20},
  eventCard:{background:C.white,borderRadius:20,boxShadow:"0 2px 16px rgba(0,0,0,0.07)",border:"1px solid #fde68a",overflow:"hidden"},
  eventHeader:{padding:"14px 20px",background:C.amberLight,borderBottom:"2px solid #fcd34d"},
  eventDate:{fontWeight:700,color:C.dark,fontSize:14,display:"block"},
  noteBadge:{background:C.amber,color:C.white,borderRadius:20,padding:"3px 10px",fontSize:11,fontWeight:700,marginTop:4,display:"inline-block"},
  eventBody:{padding:"16px 20px",display:"flex",flexDirection:"column",gap:10},
  evRow:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8},
  evLabel:{fontSize:11,color:C.muted,fontWeight:700,textTransform:"uppercase",whiteSpace:"nowrap"},
  evVal:{fontSize:14,color:C.dark,fontWeight:600,textAlign:"right"},
  eventActions:{padding:"12px 20px",display:"flex",gap:8,borderTop:"1px solid #f3f4f6"},
  editBtn:{flex:1,padding:"8px 0",background:"#eff6ff",color:"#3b82f6",border:"2px solid #bfdbfe",borderRadius:10,fontWeight:700,fontSize:13,cursor:"pointer"},
  deleteBtn:{flex:1,padding:"8px 0",background:C.redLight,color:C.red,border:`2px solid ${C.redBorder}`,borderRadius:10,fontWeight:700,fontSize:13,cursor:"pointer"},
  bookingGrid:{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:20},
  bookingCard:{background:C.white,borderRadius:20,boxShadow:"0 2px 16px rgba(0,0,0,0.07)",border:`1px solid ${C.primaryLight}`,overflow:"hidden"},
  bookingHeader:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px 20px",background:C.primaryLight,borderBottom:`2px solid ${C.primary}`},
  approvedBadge:{background:C.primary,color:C.white,borderRadius:20,padding:"4px 12px",fontSize:12,fontWeight:700},
  bookingBody:{padding:20,display:"grid",gridTemplateColumns:"1fr 1fr",gap:14},
  infoGroup:{},
  infoLabel:{fontSize:11,color:C.muted,fontWeight:600,margin:"0 0 2px",textTransform:"uppercase"},
  infoValue:{fontSize:14,color:C.dark,fontWeight:600,margin:0},
  empty:{textAlign:"center",padding:60,color:C.muted,fontSize:16,display:"flex",flexDirection:"column",alignItems:"center",gap:12},
};

export default SurveyorDashboard;