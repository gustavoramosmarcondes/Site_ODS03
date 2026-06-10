/* ============================================================
   ODS 3 · CORPO EM MOVIMENTO — main.js
   - Catálogo de 26 doenças com protocolos detalhados
   - Vídeo-aulas (YouTube embeds)
   - GSAP + ScrollTrigger (cinemático e leve)
   - Mapa do site dinâmico
   - Responsivo total (matchMedia)
============================================================ */

/* ============================================================
   DATASET — 26 doenças × exercícios
============================================================ */
const DISEASES = [
  // CARDIOMETABÓLICAS
  { cat:"Cardiometabólica", name:"Hipertensão arterial",
    short:"Pressão alta crônica. 1 em cada 4 adultos no Brasil convive com ela.",
    lede:"O exercício aeróbico regular reduz a pressão sistólica em até 11 mmHg — efeito comparável ao de um anti-hipertensivo de primeira linha.",
    ex:[
      ["Caminhada zona 2","40–60 min, 5×/semana, ritmo confortável de conversa."],
      ["Bicicleta ergométrica leve","30 min, 3–4×/semana."],
      ["Natação","45 min, 3×/semana — reduz pico hipertensivo pós-treino."],
      ["Treino de força moderado","2–3×/semana, 60–70% 1RM."]
    ]},
  { cat:"Cardiometabólica", name:"Diabetes tipo 2",
    short:"Resistência à insulina causada por sedentarismo e dieta. Reversível em estágios iniciais.",
    lede:"Apenas uma sessão de força aumenta a sensibilidade à insulina por até 48 horas. Combinar aeróbico + força é o padrão-ouro.",
    ex:[
      ["Treino combinado","3 dias força + 2 dias aeróbico/semana."],
      ["Caminhada pós-refeição","10–15 min após cada refeição reduz glicemia."],
      ["HIIT moderado","20 min, 2×/semana (com aval médico)."],
      ["Agachamento e leg-press","fortalecem grandes grupos consumidores de glicose."]
    ]},
  { cat:"Cardiometabólica", name:"Obesidade",
    short:"Doença crônica multifatorial. Movimento é tratamento, não punição.",
    lede:"Perda sustentada exige déficit energético + preservação de massa magra. Cardio sozinho não basta.",
    ex:[
      ["Caminhada diária","≥ 8.000 passos/dia."],
      ["Musculação 3×/semana","preserva músculo durante o emagrecimento."],
      ["Dança / bike / natação","atividade que dá prazer = adesão."],
      ["HIIT 1–2×/semana","quando já houver base aeróbica."]
    ]},
  { cat:"Cardiometabólica", name:"Dislipidemia (colesterol alto)",
    short:"LDL elevado e HDL baixo. Aumenta risco de infarto e AVC.",
    lede:"Aeróbico contínuo eleva HDL em até 9% e reduz triglicerídeos em até 25%.",
    ex:[
      ["Corrida leve / trote","30–45 min, 4×/semana."],
      ["Bike ao ar livre","60–90 min no fim de semana."],
      ["Circuito funcional","3×/semana."]
    ]},
  { cat:"Cardiometabólica", name:"Insuficiência cardíaca",
    short:"Coração com função reduzida. Exercício supervisionado é prescrição formal.",
    lede:"Reabilitação cardiovascular reduz internações em 30% e mortalidade em 20%.",
    ex:[
      ["Caminhada intervalada leve","sempre com monitoração."],
      ["Bicicleta horizontal","baixo impacto, fácil monitorar FC."],
      ["Força leve com elásticos","2×/semana."]
    ]},

  // MUSCULOESQUELÉTICAS
  { cat:"Musculoesquelética", name:"Lombalgia crônica",
    short:"Dor lombar recorrente. Acomete 80% dos adultos em algum momento.",
    lede:"Repouso prolongado piora. Exercício específico melhora dor e função em 12 semanas.",
    ex:[
      ["Pilates de solo","fortalece core profundo, 3×/semana."],
      ["McKenzie (extensão lombar)","alivia hérnia posterior."],
      ["Prancha frontal e lateral","3 séries · 30s."],
      ["Caminhada","30 min/dia."]
    ]},
  { cat:"Musculoesquelética", name:"Hérnia de disco",
    short:"Protrusão do disco intervertebral. Trata-se com movimento controlado.",
    lede:"Cirurgia é exceção. 85% melhora com fisioterapia ativa em 6 semanas.",
    ex:[
      ["Mobilidade segmentar (cat-cow)","aquece a coluna."],
      ["Dead bug","ativa core sem carregar a coluna."],
      ["Hip thrust","fortalece cadeia posterior."],
      ["Natação costas","descarrega a coluna."]
    ]},
  { cat:"Musculoesquelética", name:"Osteoartrose de joelho",
    short:"Degeneração da cartilagem. Sedentarismo acelera a doença.",
    lede:"Fortalecimento de quadríceps reduz dor mais do que anti-inflamatórios.",
    ex:[
      ["Agachamento parcial","com apoio, 3×12."],
      ["Cadeira extensora leve","3×15."],
      ["Bicicleta sem carga","30 min."],
      ["Hidroginástica","2×/semana."]
    ]},
  { cat:"Musculoesquelética", name:"Osteoporose",
    short:"Perda de massa óssea. Comum em mulheres após menopausa.",
    lede:"Só exercício com impacto e carga aumenta densidade óssea. Caminhar não basta.",
    ex:[
      ["Musculação progressiva","3×/semana, cargas moderadas a altas."],
      ["Saltos leves","2 séries · 10 saltos, 3×/semana."],
      ["Tai chi","reduz risco de quedas em 43%."]
    ]},
  { cat:"Musculoesquelética", name:"Tendinite / lesão por esforço",
    short:"Inflamação tendinosa por uso repetitivo. Comum em ombro, cotovelo e joelho.",
    lede:"Exercício excêntrico é o tratamento mais eficaz — regenera o colágeno do tendão.",
    ex:[
      ["Excêntrico lento (3s descida)","3×15, 2×/dia."],
      ["Isometria","contração estática 45s."],
      ["Mobilidade articular","diária."]
    ]},
  { cat:"Musculoesquelética", name:"Fibromialgia",
    short:"Dor difusa crônica + fadiga. Sistema nervoso hipersensibilizado.",
    lede:"Exercício é o único tratamento com evidência forte. Começa pequeno, progride muito devagar.",
    ex:[
      ["Caminhada na água","baixo impacto, sensorial agradável."],
      ["Yoga adaptado","2–3×/semana."],
      ["Força leve progressiva","começar com 1×/semana."]
    ]},

  // SAÚDE MENTAL
  { cat:"Saúde mental", name:"Depressão",
    short:"Transtorno do humor que afeta 280 milhões no mundo.",
    lede:"Exercício aeróbico moderado tem eficácia comparável a antidepressivos em quadros leves a moderados.",
    ex:[
      ["Corrida leve / caminhada rápida","30 min, 3–5×/semana."],
      ["Treino de força","2–3×/semana — efeito antidepressivo independente."],
      ["Exercício ao ar livre","luz solar potencializa o efeito."]
    ]},
  { cat:"Saúde mental", name:"Ansiedade generalizada",
    short:"Preocupação crônica e excessiva. Sintomas físicos e mentais.",
    lede:"20 minutos de exercício moderado reduzem ansiedade aguda em até 4 horas.",
    ex:[
      ["HIIT curto","20 min — descarga de tensão imediata."],
      ["Yoga","reduz cortisol e ativa parassimpático."],
      ["Caminhada na natureza","forest bathing, 45 min."]
    ]},
  { cat:"Saúde mental", name:"Insônia",
    short:"Dificuldade crônica de iniciar/manter o sono.",
    lede:"Exercício regular melhora qualidade do sono profundo em até 65%. Evite alta intensidade nas 2h antes de dormir.",
    ex:[
      ["Aeróbico de manhã","30 min — regula ritmo circadiano."],
      ["Yoga restaurativa à noite","20 min."],
      ["Respiração 4-7-8","antes de dormir."]
    ]},
  { cat:"Saúde mental", name:"TDAH",
    short:"Déficit de atenção e hiperatividade. Não é só infantil.",
    lede:"Exercício eleva dopamina e norepinefrina — os mesmos alvos da medicação.",
    ex:[
      ["Esportes coletivos","exigem foco e tomada de decisão."],
      ["Artes marciais","disciplina + descarga motora."],
      ["Atividade aeróbica diária","15–30 min antes da rotina cognitiva."]
    ]},

  // RESPIRATÓRIAS
  { cat:"Respiratória", name:"Asma",
    short:"Inflamação crônica das vias aéreas.",
    lede:"Exercício bem dosado reduz crises e dependência de broncodilatador. Natação é a modalidade rainha.",
    ex:[
      ["Natação","ar úmido + posição horizontal."],
      ["Respiração diafragmática","10 min/dia."],
      ["Caminhada com aquecimento longo","previne broncoespasmo."]
    ]},
  { cat:"Respiratória", name:"DPOC",
    short:"Doença pulmonar obstrutiva crônica. Principal causa: tabagismo.",
    lede:"Reabilitação pulmonar reduz dispneia e hospitalizações. Toda evidência aponta para exercício.",
    ex:[
      ["Caminhada intervalada","3×/semana, supervisionada."],
      ["Treino de força membros superiores","melhora atividades diárias."],
      ["Respiração com lábios franzidos","durante o esforço."]
    ]},

  // NEUROLÓGICAS
  { cat:"Neurológica", name:"Parkinson",
    short:"Doença neurodegenerativa que afeta dopamina e movimento.",
    lede:"Exercício é neuroprotetor — único tratamento que parece desacelerar a progressão.",
    ex:[
      ["Boxe sem contato (Rock Steady)","melhora destreza e voz."],
      ["Tai chi","reduz quedas e congelamento da marcha."],
      ["Bicicleta forçada","60–80 rpm, 3×/semana."]
    ]},
  { cat:"Neurológica", name:"AVC (reabilitação)",
    short:"Pós-acidente vascular cerebral. Janela de neuroplasticidade aberta.",
    lede:"Quanto mais cedo e mais repetições, melhor a recuperação funcional.",
    ex:[
      ["Treino de marcha","esteira com suporte de peso."],
      ["Terapia por contensão","força o uso do lado afetado."],
      ["Bike estacionária","reaprendizagem motora bilateral."]
    ]},
  { cat:"Neurológica", name:"Alzheimer / demência",
    short:"Declínio cognitivo progressivo.",
    lede:"Exercício aeróbico reduz risco em até 35% e desacelera perda cognitiva.",
    ex:[
      ["Caminhada diária","45 min, ar livre."],
      ["Dança","engaja memória + coordenação."],
      ["Tai chi","equilíbrio e atenção plena."]
    ]},
  { cat:"Neurológica", name:"Esclerose múltipla",
    short:"Doença autoimune que desmielinizam neurônios.",
    lede:"Antes contraindicado, hoje é prescrição: melhora fadiga, força e mobilidade.",
    ex:[
      ["Hidroginástica","temperatura controlada evita piora térmica."],
      ["Bike reclinada","ergonomia segura."],
      ["Yoga adaptado","equilíbrio + relaxamento."]
    ]},

  // ONCOLÓGICAS / IMUNOLÓGICAS
  { cat:"Oncológica", name:"Câncer de mama",
    short:"Tumor mais comum em mulheres no mundo.",
    lede:"Exercício durante e após tratamento reduz mortalidade em até 40% e recidiva em 24%.",
    ex:[
      ["Caminhada","150 min/semana."],
      ["Força membros superiores","previne linfedema, com orientação."],
      ["Yoga","reduz fadiga e melhora sono."]
    ]},
  { cat:"Oncológica", name:"Câncer de cólon / próstata",
    short:"Sedentarismo é fator de risco direto.",
    lede:"Sobreviventes ativos têm menor recidiva e menor mortalidade global.",
    ex:[
      ["Aeróbico moderado","150–300 min/semana."],
      ["Força","2×/semana."],
      ["Atividades funcionais","jardinagem, escadas, caminhadas."]
    ]},

  // OUTRAS
  { cat:"Reprodutiva", name:"Menopausa",
    short:"Transição hormonal. Perda óssea e muscular se acelera.",
    lede:"Musculação + impacto previnem osteoporose, sarcopenia e fogachos.",
    ex:[
      ["Musculação","3×/semana, cargas progressivas."],
      ["Saltos leves","preserva massa óssea."],
      ["Yoga","alivia sintomas vasomotores."]
    ]},
  { cat:"Reprodutiva", name:"Síndrome dos ovários policísticos",
    short:"Resistência insulínica + desregulação hormonal.",
    lede:"Exercício melhora ovulação, perfil hormonal e sensibilidade à insulina.",
    ex:[
      ["Força + HIIT","combinação mais eficaz."],
      ["Caminhada diária","baseline cardiometabólico."],
      ["Yoga","reduz cortisol e melhora ciclo."]
    ]},
  { cat:"Sistêmica", name:"Sarcopenia (perda muscular)",
    short:"Perda progressiva de massa e força — começa aos 30, acelera aos 60.",
    lede:"Único tratamento eficaz é treino resistido + proteína suficiente.",
    ex:[
      ["Musculação progressiva","2–3×/semana, falha controlada."],
      ["Exercícios funcionais","levantar do chão, carregar peso."],
      ["Treino de potência","contrações rápidas (saúde neuromuscular)."]
    ]},
];

/* ============================================================
   VÍDEO-AULAS (YouTube embeds — canais reconhecidos)
============================================================ */
const VIDEOS = [
  { cat:"Lombar & coluna",       title:"5 exercícios para dor lombar crônica",   desc:"Mobilidade e fortalecimento do core para aliviar lombalgia.", id:"2NOsE-VPpkE" },
  { cat:"Coração & pressão",     title:"Caminhada zona 2 — como fazer",          desc:"O ritmo de exercício que mais salva vidas, explicado em 3 min.", id:"M0uO8X3_tEA" },
  { cat:"Diabetes",              title:"Treino de força para diabetes tipo 2",   desc:"Por que musculação reduz glicemia melhor que cardio.", id:"DcyW0K_T7vY" },
  { cat:"Saúde mental",          title:"Yoga de 10 minutos para ansiedade",      desc:"Sequência simples para reduzir cortisol e ativar parassimpático.", id:"hJbRpHZr_d0" },
  { cat:"Joelho & artrose",      title:"Fortalecimento de quadríceps em casa",   desc:"Sem equipamento — para artrose de joelho e dor patelofemoral.", id:"YaXPRqUwItQ" },
  { cat:"Respiratório",          title:"Respiração diafragmática",                desc:"Técnica usada na reabilitação pulmonar de DPOC e asma.", id:"UB3tSaiEbNY" },
  { cat:"Idoso & equilíbrio",    title:"Tai chi para iniciantes",                desc:"Reduz quedas em 43% em estudos clínicos.", id:"6w5SektrFr0" },
  { cat:"Osteoporose",           title:"Exercícios com impacto seguro",          desc:"Como aumentar densidade óssea sem se machucar.", id:"BJ4D6jZpwIE" },
  { cat:"Pescoço & postura",     title:"Alongamento cervical para quem trabalha sentado", desc:"5 minutos por dia previnem cefaleia tensional.", id:"2NOsE-VPpkE" }
];

/* ============================================================
   UTIL — esperar GSAP
============================================================ */
function whenReady(fn){
  if(window.gsap && window.ScrollTrigger){ fn(); return; }
  window.addEventListener("DOMContentLoaded",()=>{
    const i=setInterval(()=>{ if(window.gsap && window.ScrollTrigger){ clearInterval(i); fn(); } },30);
  });
}

/* ============================================================
   POPULAR CATÁLOGO E VÍDEOS
============================================================ */
function populate(){
  const cat=document.getElementById("catalog");
  cat.innerHTML=DISEASES.map((d,i)=>`
    <article class="disease" data-i="${i}">
      <span class="disease__cat">${d.cat}</span>
      <h3 class="disease__name">${d.name}</h3>
      <p class="disease__short">${d.short}</p>
      <div class="disease__foot">
        <span>Ver protocolo</span>
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M7 17L17 7M9 7h8v8"/></svg>
      </div>
    </article>`).join("");

  const vids=document.getElementById("videos");
  vids.innerHTML=VIDEOS.map(v=>`
    <article class="vid">
      <div class="vid__frame">
        <iframe loading="lazy" src="https://www.youtube.com/embed/${v.id}?rel=0&modestbranding=1" title="${v.title}" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
      <div class="vid__body">
        <span class="vid__cat">${v.cat}</span>
        <h3 class="vid__title">${v.title}</h3>
        <p class="vid__desc">${v.desc}</p>
      </div>
    </article>`).join("");

  // Mapa do site
  const map=document.getElementById("siteMap");
  const tiles=[
    ["00","Abertura","cap-00"],["01","Manifesto","cap-01"],["02","Dados OMS","cap-02"],
    ["03","Catálogo de doenças","cap-03"],["04","Protocolos","cap-04"],
    ["05","Vídeo-aulas","cap-05"],["06","Rotina semanal","cap-06"],
    ...DISEASES.map((d,i)=>["DOENÇA",d.name,`disease-${i}`]),
    ["VID","Caminhada zona 2","cap-05"],["VID","Yoga ansiedade","cap-05"],
    ["VID","Tai chi","cap-05"],["VID","Respiração","cap-05"],
    ["☼","Voltar ao topo","cap-00"]
  ];
  map.innerHTML=tiles.map(([t,n,id])=>`<a class="map__tile" data-scroll="${id}"><span>${t}</span><strong>${n}</strong></a>`).join("");
}

/* ============================================================
   MODAL
============================================================ */
function setupModal(){
  const modal=document.getElementById("modal");
  const body=document.getElementById("modalBody");
  const open=(i)=>{
    const d=DISEASES[i];
    body.innerHTML=`
      <span class="modal__cat">${d.cat}</span>
      <h2 class="modal__title">${d.name}</h2>
      <p class="modal__lede">${d.lede}</p>
      <div class="modal__section">
        <h4>O que é</h4>
        <p>${d.short}</p>
      </div>
      <div class="modal__section">
        <h4>Exercícios recomendados</h4>
        <ul class="modal__exercises">
          ${d.ex.map(([t,p])=>`<li><strong>${t}</strong>${p}</li>`).join("")}
        </ul>
      </div>`;
    modal.classList.add("is-open");
    document.body.style.overflow="hidden";
  };
  document.getElementById("catalog").addEventListener("click",e=>{
    const c=e.target.closest(".disease"); if(c) open(+c.dataset.i);
  });
  modal.addEventListener("click",e=>{
    if(e.target.dataset.close!==undefined || e.target.closest("[data-close]")){
      modal.classList.remove("is-open");
      document.body.style.overflow="";
    }
  });
}

/* ============================================================
   CURSOR
============================================================ */
function setupCursor(){
  const dot=document.querySelector(".cursor-dot"),ring=document.querySelector(".cursor-ring");
  if(!dot||matchMedia("(hover:none)").matches) return;
  let x=0,y=0,rx=0,ry=0;
  window.addEventListener("mousemove",e=>{x=e.clientX;y=e.clientY;dot.style.transform=`translate(${x}px,${y}px)`});
  const tick=()=>{rx+=(x-rx)*.18;ry+=(y-ry)*.18;ring.style.transform=`translate(${rx}px,${ry}px)`;requestAnimationFrame(tick)};
  tick();
  document.addEventListener("mouseover",e=>{
    if(e.target.closest("a,button,.disease,.map__tile,.vid")) ring.style.scale="1.7";
  });
  document.addEventListener("mouseout",e=>{
    if(e.target.closest("a,button,.disease,.map__tile,.vid")) ring.style.scale="1";
  });
}

/* ============================================================
   PRELOADER
============================================================ */
function runPreloader(done){
  const bar=document.getElementById("preloaderBar");
  const cnt=document.getElementById("preloaderCount");
  const letters=document.querySelectorAll(".preloader__brand span");
  const pl=document.getElementById("preloader");

  gsap.to(letters,{opacity:1,y:0,duration:.7,stagger:.08,ease:"power3.out"});

  const obj={v:0};
  gsap.to(obj,{v:100,duration:2.2,ease:"power2.inOut",onUpdate:()=>{
    bar.style.width=obj.v+"%";
    cnt.textContent=String(Math.floor(obj.v)).padStart(3,"0");
  },onComplete:()=>{
    gsap.to(pl,{y:"-100%",duration:1,ease:"power4.inOut",onComplete:()=>{pl.style.display="none";done&&done()}});
  }});
}

/* ============================================================
   HERO REVEAL
============================================================ */
function heroIntro(){
  gsap.to(".display .word",{y:"0%",duration:1.2,stagger:.07,ease:"power4.out",delay:.2});
  gsap.from(".hero__head .tag",{y:20,opacity:0,duration:.8,stagger:.1,delay:.3,ease:"power3.out"});
  gsap.from(".hero__lede",{y:30,opacity:0,duration:1,delay:1,ease:"power3.out"});
  gsap.from(".hero__foot > *",{y:30,opacity:0,duration:1,stagger:.15,delay:1.2,ease:"power3.out"});
  gsap.to(".hero__orb--a",{x:"15%",y:"10%",duration:18,yoyo:true,repeat:-1,ease:"sine.inOut"});
  gsap.to(".hero__orb--b",{x:"-10%",y:"-8%",duration:22,yoyo:true,repeat:-1,ease:"sine.inOut"});
  gsap.to(".hero__orb--c",{x:"-12%",y:"12%",duration:26,yoyo:true,repeat:-1,ease:"sine.inOut"});
  gsap.to(".rail",{opacity:1,duration:1,delay:1.5});
}

/* ============================================================
   SCROLLTRIGGERS
============================================================ */
function setupScroll(){
  const ST=window.ScrollTrigger;

  // Manifesto — kinetic words
  gsap.utils.toArray(".kinetic span").forEach(w=>{
    gsap.to(w,{opacity:1,scrollTrigger:{trigger:w,start:"top 80%",end:"top 50%",scrub:true}});
  });

  // Stats — count up
  document.querySelectorAll(".stat__num").forEach(el=>{
    const target=+el.dataset.count;
    ST.create({trigger:el,start:"top 80%",onEnter:()=>{
      gsap.to({v:0},{v:target,duration:2,ease:"power2.out",onUpdate:function(){
        el.textContent=Math.floor(this.targets()[0].v);
      }});
    },once:true});
  });

  // Catálogo — reveal stagger
  gsap.from(".disease",{
    opacity:0,y:30,duration:.6,stagger:{amount:.8,grid:"auto",from:"start"},
    scrollTrigger:{trigger:"#catalog",start:"top 75%"}
  });

  // Vídeos
  gsap.from(".vid",{opacity:0,y:40,duration:.7,stagger:.08,
    scrollTrigger:{trigger:"#videos",start:"top 80%"}});

  // Rotina dias
  gsap.from(".day",{opacity:0,y:30,duration:.5,stagger:.07,
    scrollTrigger:{trigger:".week",start:"top 80%"}});

  // Mapa
  gsap.from(".map__tile",{opacity:0,scale:.92,duration:.4,stagger:{amount:1,from:"random"},
    scrollTrigger:{trigger:"#siteMap",start:"top 80%"}});

  // RAIL fill
  ST.create({start:0,end:"max",onUpdate:s=>{
    document.getElementById("railFill").style.height=(s.progress*100)+"%";
  }});

  // RAIL active chapter
  document.querySelectorAll(".screen").forEach(sec=>{
    ST.create({trigger:sec,start:"top 50%",end:"bottom 50%",
      onToggle:s=>{
        const id=sec.id;
        document.querySelectorAll(".rail__list li").forEach(li=>{
          li.classList.toggle("is-active",s.isActive && li.dataset.target===id);
        });
      }});
  });

  // Scroll horizontal pinado — apenas desktop
  ST.matchMedia({
    "(min-width: 901px)":()=>{
      const track=document.getElementById("protocolTrack");
      const pin=document.getElementById("protocolPin");
      const dist=()=>track.scrollWidth - window.innerWidth + 80;
      gsap.to(track,{x:()=>-dist(),ease:"none",
        scrollTrigger:{trigger:pin,start:"top top",end:()=>"+="+dist(),
          pin:true,scrub:true,invalidateOnRefresh:true,anticipatePin:1}});
    }
  });
}

/* ============================================================
   NAV — clique no rail e CTAs
============================================================ */
function setupNav(){
  document.body.addEventListener("click",e=>{
    const t=e.target.closest("[data-scroll],[data-target]");
    if(!t) return;
    const id=t.dataset.scroll||t.dataset.target;
    const el=document.getElementById(id) || document.getElementById(id.replace("disease-","cap-03"));
    if(el && window.gsap){
      gsap.to(window,{duration:1.2,ease:"power3.inOut",scrollTo:{y:el,offsetY:0}});
    } else if(el){
      el.scrollIntoView({behavior:"smooth"});
    }
  });
}

/* ============================================================
   BOOT
============================================================ */
whenReady(()=>{
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
  populate();
  setupModal();
  setupCursor();
  setupNav();
  runPreloader(()=>{
    heroIntro();
    setupScroll();
    ScrollTrigger.refresh();
  });
});
