// src/pages/Home.jsx
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const IMAGES = [
  { src: "/public/hero1.jpg" },
  { src: "/public/hero2.jpg" },
  { src: "/public/hero3.jpg" },
  { src: "/public/hero4.jpg" },
];

const ALL_SERVICES = [
  { _id: "s1", name: "غسيل خارجي", description: "غسيل خارجي سريع وفعّال", priceUSD: 10, img: "/public/service-wash.jpg" },
  { _id: "s2", name: "غسيل داخلي", description: "تنظيف داخلي كامل وتعطير", priceUSD: 15, img: "/public/service11-wash.jpg" },
  { _id: "s3", name: "تغيير زيت", description: "زيوت معتمدة وفحص فلتر", priceUSD: 40, img: "/public/service-oil.jpg" },
  { _id: "s4", name: "فحص فرامل", description: "فحص واقتراح الصيانة", priceUSD: 25, img: "/public/service-brake.jpg" },
  { _id: "s5", name: "خدمة اطارات", description: "تبديل، توازن وفحص ضغط", priceUSD: 30, img: "/public/service-tires.jpg" },
  { _id: "s6", name: " تلميع السياره  ", description: "تلميع خارجي داخلي مع حماية", priceUSD: 60, img: "/public/service-polish.jpg" },
  { _id: "s7", name: "شحن بطارية", description: "شحن سريع أو استبدال بطارية", priceUSD: 35, img: "/public/service-battery.jpg" },
  { _id: "s8", name: "فحص كهرباء", description: "تشخيص اعطال كهربائية", priceUSD: 50, img: "/public/service-electrical.jpg" },
  { _id: "s9", name: "غسيل محرك", description: "تنظيف محرك بعناية", priceUSD: 20, img: "/public/service-engine.jpg" },
];

const REVIEWS = Array.from({ length: 20 }).map((_, i) => ({
  name: ["أحمد","زينب","محمد","سارة","خالد","هند","مصطفى","ليلى","علي","منى","سالم","رنا","حمود","رانيا","إياد","هدى","رامي","جميلة","باسل","ندى"][i%20],
  stars: 4 + (i % 2),
  short: ["خدمة ممتازة","أنصح فيها","جيدة جداً","سريعة واحترافية","تجربة رائعة"][i % 5],
  desc: "الخدمة كانت ممتازة، الفني لبق وانتهت الشغلة بسرعة وجودة عالية."
}));

const TIPS = [
  "تأكد من مستوى الزيت كل 1000 كم.",
  "غيّر فلتر الهواء عند كل صيانة كبيرة.",
  "افحص ضغط الإطارات شهرياً.",
  "لا تتجاهل صوت جديد من المحرك.",
  "احرص على تبريد المحرك وعدم التجاوز بالحرارة.",
  "نفّذ صيانة الفرامل فور ملاحظة أي ارتجاج.",
  "قم بتنظيف المكيف بانتظام لراحة الركاب.",
  "استبدل مساحات النوافذ عند بداية المواسم الماطرة.",
  "تجنّب البنزين الرديء بتزويد الوقود من محطات موثوقة.",
  "احتفظ بمجموعة طوارئ في السيارة.",
  ...Array.from({ length: 90 }).map((_, i) => `نصيحة صيانة/تنظيف رقم ${i+11}`)
];

function aiReplyExtended(text) {
  const t = (text || "").toLowerCase();
  if (!t) return "صف مشكلتك وسأعطيك نصيحة أو خدمة مناسبة.";
  if (t.includes("زيت")) return "غيّر الزيت كل 6 أشهر أو بعد 8000 كم — استخدم زيت موصى به من المصنع.";
  if (t.includes("فرامل") || t.includes("مكابح")) return "تحقق من سماكة لباد المكابح واقترح استبدالها عند النصف أو أقل.";
  if (t.includes("بطارية") || t.includes("تشغيل")) return "قد تكون البطارية ضعيفة — افحص الفولت ووصّل شاحن أو استبدل البطارية.";
  if (t.includes("غسيل") || t.includes("تنظيف")) return "للحفاظ على الطلاء: اغسل السيارة بالماء والصابون المخصص، ولا تستخدم أي منظف قوي.";
  if (t.includes("إطارات") || t.includes("ضغط")) return "اضبط ضغط الإطارات حسب دليل المصنع، لا تنس توازن العجلات عند التبديل.";
  return TIPS[Math.floor(Math.random()*TIPS.length)];
}

export default function Home() {
  const navigate = useNavigate();
  const [slide,setSlide] = useState(0);
  const sliderAutoRef = useRef(null);
  const [serviceIndex,setServiceIndex] = useState(0);
  const [reviewIndex,setReviewIndex] = useState(0);
  const [weatherMain,setWeatherMain] = useState("مشمس");
  const [weatherLoaded,setWeatherLoaded] = useState(false);
  const [messages,setMessages] = useState([{from:"bot",text:"مرحباً! اكتب مشكلتك أو اختر نصيحة."}]);
  const [input,setInput] = useState("");

  // Modal تقييم جديد
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({name:"", stars:5, short:"", desc:""});

  const serviceCount = ALL_SERVICES.length;
  const visibleServices = Array.from({ length:3 }).map((_,i)=>ALL_SERVICES[(serviceIndex+i)%serviceCount]);
  const visibleReviews = Array.from({ length:5 }).map((_,i)=>REVIEWS[(reviewIndex+i)%REVIEWS.length]);

  useEffect(()=>{
    sliderAutoRef.current = setInterval(()=>setSlide(s=>(s+1)%IMAGES.length),3500);
    return ()=>clearInterval(sliderAutoRef.current);
  },[]);

  useEffect(()=>{
    const hour = new Date().getHours();
    let w = "مشمس";
    if(hour>=18||hour<6) w="غائم جزئياً";
    if(hour>=15&&hour<18) w="حار نسبياً";
    setTimeout(()=>{ setWeatherMain(w); setWeatherLoaded(true); },400);
  },[]);

  const handleSend = ()=>{
    if(!input.trim()) return;
    const userMsg = {from:"user", text:input.trim()};
    setMessages(m=>[...m,userMsg]);
    const reply = aiReplyExtended(input);
    setTimeout(()=>setMessages(m=>[...m,{from:"bot",text:reply}]),300);
    setInput("");
  };

  const nextServices = ()=>setServiceIndex(i=>(i+3)%serviceCount);
  const prevServices = ()=>setServiceIndex(i=>(i-3+serviceCount)%serviceCount);
  const nextReviews = ()=>setReviewIndex(r=>(r+1)%REVIEWS.length);
  const prevReviews = ()=>setReviewIndex(r=>(r-1+REVIEWS.length)%REVIEWS.length);

  return (
    <div className="min-h-screen bg-white text-gray-800" dir="rtl" style={{fontFamily:"'Tajawal', sans-serif"}}>
      {/* ---------- SLIDER ---------- */}
      <section className="relative w-full h-[520px] overflow-hidden">
        {IMAGES.map((img,i)=>(
          <img
            key={i}
            src={img.src}
            alt=""
            className={`absolute inset-0 w-full h-full object-cover rounded-3xl transition-all duration-700 ${i===slide?"opacity-100 scale-100":"opacity-0 scale-105"}`}
            style={{filter:"blur(1px)"}}
          />
        ))}
        <div className="absolute top-8 right-8 bg-white/70 backdrop-blur-md px-5 py-3 rounded-2xl shadow-lg animate-bounce">
          <h1 className="text-4xl text-indigo-900 font-extrabold"><span className="text-sky-500">C</span>arNect</h1>
        </div>
        <div className="absolute top-8 left-8 bg-gradient-to-b from-gray-200 to-gray-300/80 rounded-2xl shadow-lg px-5 py-3 text-indigo-900">
          <div className="text-lg font-bold">{weatherMain}</div>
        </div>
        <button onClick={()=>{setSlide(s=>(s-1+IMAGES.length)%IMAGES.length); clearInterval(sliderAutoRef.current);}}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-3 rounded-full shadow hover:scale-110 transition">◀</button>
        <button onClick={()=>{setSlide(s=>(s+1)%IMAGES.length); clearInterval(sliderAutoRef.current);}}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-3 rounded-full shadow hover:scale-110 transition">▶</button>
      </section>

      {/* ---------- خدمات + مساعد AI ---------- */}
      <section className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold text-indigo-900">خدماتنا</h3>
            <div className="flex gap-2">
              <button onClick={prevServices} className="p-2 rounded-full bg-white shadow">◀</button>
              <button onClick={nextServices} className="p-2 rounded-full bg-white shadow">▶</button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {visibleServices.map(s=>(
              <div key={s._id} className="bg-gray-400/80 rounded-2xl p-4 shadow-md transform hover:scale-105 transition">
                <div className="w-full h-40 overflow-hidden rounded-lg mb-3">
                  <img src={s.img} alt={s.name} className="w-full h-full object-cover"/>
                </div>
                <h4 className="text-lg font-bold text-indigo-900">{s.name}</h4>
                <p className="text-sm text-gray-600 mt-1">{s.description}</p>
                <div className="mt-3 flex items-center justify-between">
                  <div className="font-bold text-Read-200">${s.priceUSD}</div>
                  <button className="bg-sky-400 text-white px-3 py-1 rounded-lg">احجز الآن</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow p-4 flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-bold text-indigo-900">مساعد CarNect</h4>
            <div className="text-xs text-gray-500">اسأل عن أي مشكلة</div>
          </div>
          <div className="flex-1 bg-gray-400 rounded-lg p-3 overflow-y-auto space-y-2">
            {messages.map((m,i)=>(
              <div key={i} className={`p-2 rounded-lg ${m.from==="bot"?"bg-white text-right":"bg-indigo-600 text-white text-left"}`}>
                {m.text}
              </div>
            ))}
          </div>
          <div className="mt-3 flex gap-2">
            <input value={input} onChange={e=>setInput(e.target.value)}
              onKeyDown={e=>e.key==="Enter"&&handleSend()} placeholder="مثال: صوت غريب من المحرك..."
              className="flex-1 p-2 border rounded-lg outline-none text-right"/>
            <button onClick={handleSend} className="bg-indigo-900 text-white px-4 py-2 rounded-lg">إرسال</button>
          </div>
          <div className="mt-3 text-sm text-gray-700">
    
          </div>
        </div>
      </section>

      {/* ---------- وصف المنصة ---------- */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-indigo-50 rounded-2xl p-6 shadow-inner text-right">
          <h3 className="text-3xl font-extrabold text-indigo-900 mb-3">منصة خدمات سيارات شاملة</h3>
          <p className="text-gray-900 leading-relaxed">
            CarNect هي منصّة ذكية متكاملة لخدمات السيارات، تتيح للمستخدمين طلب وتنظيم جميع خدمات سياراتهم إلكترونيًا بسهولة وسرعة، وفي أي وقت ومن أي مكان.
            من خلال CarNect يمكنك حجز غسيل، صيانة، فحص، تبديل زيت، شحن بطارية، تنظيف داخلي وغير ذلك بخطوات بسيطة وسلسة. المنصّة تربطك مباشرة مع مراكز الخدمة المعتمدة والفنيين المتخصصين، وتتيح لك اختيار الخدمة والموقع والوقت المناسب مع متابعة حالة الطلب لحظة بلحظة.
            كما تحتوي CarNect على مساعد ذكي يعتمد على الذكاء الاصطناعي (AI) يقوم بالإجابة على جميع استفساراتك المتعلقة بسيارتك، ويقترح حلولًا مناسبة للمشاكل التي تواجهها بناءً على نوع السيارة وحالة الاستخدام. بالإضافة إلى ذلك، توفّر المنصّة ميزة توقّع حالة الطقس لمساعدتك في تحديد ما إذا كان الوقت مناسبًا لتلقي الخدمة أو تأجيلها.
          </p>
        </div>
      </section>

      {/* ---------- تقييمات العملاء + إضافة تقييم ---------- */}
      <section className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold text-indigo-900">تقييمات العملاء</h3>
          <div className="flex gap-2">
            <button onClick={prevReviews} className="p-2 rounded-full bg-white shadow">◀</button>
            <button onClick={nextReviews} className="p-2 rounded-full bg-white shadow">▶</button>
          </div>
          <button 
            onClick={()=>setShowReviewForm(true)} 
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-500"
          >
            أضف تقييمك
          </button>
        </div>

        <div className="flex gap-4 overflow-hidden">
          {visibleReviews.map((r,idx)=>(
            <div key={idx} className="min-w-[280px] bg-gray-100 rounded-xl p-4 shadow-md transition transform hover:scale-105">
              <div className="flex items-center justify-between mb-2">
                <div className="font-bold text-indigo-900">{r.name}</div>
                <div className="text-yellow-400">{Array(r.stars).fill("★").join("")}</div>
              </div>
              <div className="text-sm font-semibold">{r.short}</div>
              <div className="mt-2 text-gray-700 text-sm">{r.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Modal لإضافة تقييم ---------- */}
      {showReviewForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-96 relative">
            <button onClick={()=>setShowReviewForm(false)} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">✖</button>
            <h4 className="text-lg font-bold mb-3">أضف تقييمك</h4>
            <input 
              type="text" 
              placeholder="الاسم" 
              value={newReview.name} 
              onChange={e=>setNewReview({...newReview, name:e.target.value})}
              className="w-full mb-2 p-2 border rounded-lg"
            />
            <select 
              value={newReview.stars} 
              onChange={e=>setNewReview({...newReview, stars:Number(e.target.value)})}
              className="w-full mb-2 p-2 border rounded-lg"
            >
              {[5,4,3,2,1].map(n=><option key={n} value={n}>{n} نجوم</option>)}
            </select>
            <input 
              type="text" 
              placeholder="عنوان قصير" 
              value={newReview.short} 
              onChange={e=>setNewReview({...newReview, short:e.target.value})}
              className="w-full mb-2 p-2 border rounded-lg"
            />
            <textarea 
              placeholder="التفاصيل" 
              value={newReview.desc} 
              onChange={e=>setNewReview({...newReview, desc:e.target.value})}
              className="w-full mb-2 p-2 border rounded-lg"
            />
            <button
              onClick={()=>{
                REVIEWS.unshift({...newReview});
                setNewReview({name:"", stars:5, short:"", desc:""});
                setShowReviewForm(false);
              }}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg               hover:bg-indigo-500 w-full"
            >
              أرسل التقييم
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

