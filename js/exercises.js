/* ===== EXERCISE ANIMATIONS (SMIL-based SVG) ===== */
const ANIMS = {
  pushup: `<svg viewBox="0 0 240 185" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="10" y1="172" x2="230" y2="172" stroke="#222222" stroke-width="2"/>
    <!-- Hand contact points (fixed on floor) -->
    <circle cx="155" cy="170" r="5" fill="#C8FF00"/>
    <circle cx="100" cy="170" r="5" fill="#C8FF00"/>
    <!-- Foot contact points -->
    <ellipse cx="42" cy="168" rx="8" ry="4" fill="#C8FF00" opacity="0.5"/>
    <ellipse cx="55" cy="168" rx="7" ry="4" fill="#C8FF00" opacity="0.35"/>
    <!-- HEAD -->
    <circle r="13" fill="#C8FF00" cx="200">
      <animate attributeName="cy" values="72;92;72" dur="1.4s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
    </circle>
    <!-- TORSO (shoulder→hip, horizontal) -->
    <line x1="188" x2="68" stroke="#C8FF00" stroke-width="4" stroke-linecap="round">
      <animate attributeName="y1" values="76;96;76" dur="1.4s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
      <animate attributeName="y2" values="108;128;108" dur="1.4s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
    </line>
    <!-- RIGHT ARM (front) shoulder→hand -->
    <line x1="155" x2="155" y2="168" stroke="#C8FF00" stroke-width="4" stroke-linecap="round">
      <animate attributeName="y1" values="82;102;82" dur="1.4s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
    </line>
    <!-- LEFT ARM (back) shoulder→hand -->
    <line x1="100" x2="100" y2="168" stroke="#C8FF00" stroke-width="4" stroke-linecap="round">
      <animate attributeName="y1" values="96;116;96" dur="1.4s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
    </line>
    <!-- RIGHT LEG (hip→knee→foot) -->
    <line x1="68" x2="48" y2="166" stroke="#C8FF00" stroke-width="3.5" stroke-linecap="round">
      <animate attributeName="y1" values="108;128;108" dur="1.4s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
    </line>
    <line x1="60" x2="40" y2="167" stroke="#C8FF00" stroke-width="3.5" stroke-linecap="round">
      <animate attributeName="y1" values="112;132;112" dur="1.4s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
    </line>
  </svg>`,

  squat: `<svg viewBox="0 0 230 210" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="10" y1="200" x2="220" y2="200" stroke="#222222" stroke-width="2"/>
    <!-- Feet -->
    <ellipse ry="5" rx="11" fill="#C8FF00" opacity="0.65">
      <animate attributeName="cx" values="78;58;78" dur="1.6s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
      <animate attributeName="cy" values="197;197;197" dur="1.6s" repeatCount="indefinite"/>
    </ellipse>
    <ellipse ry="5" rx="11" fill="#C8FF00" opacity="0.65">
      <animate attributeName="cx" values="152;172;152" dur="1.6s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
      <animate attributeName="cy" values="197;197;197" dur="1.6s" repeatCount="indefinite"/>
    </ellipse>
    <!-- HEAD -->
    <circle r="14" fill="#C8FF00" cx="115">
      <animate attributeName="cy" values="28;62;28" dur="1.6s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
    </circle>
    <!-- TORSO -->
    <line x1="115" stroke="#C8FF00" stroke-width="4" stroke-linecap="round">
      <animate attributeName="x2" values="115;115;115" dur="1.6s" repeatCount="indefinite"/>
      <animate attributeName="y1" values="44;76;44" dur="1.6s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
      <animate attributeName="y2" values="112;130;112" dur="1.6s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
    </line>
    <!-- LEFT ARM (shoulder→elbow→hand, arms out for balance) -->
    <line stroke="#C8FF00" stroke-width="3.5" stroke-linecap="round">
      <animate attributeName="x1" values="88;88;88" dur="1.6s" repeatCount="indefinite"/>
      <animate attributeName="y1" values="58;88;58" dur="1.6s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
      <animate attributeName="x2" values="62;45;62" dur="1.6s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
      <animate attributeName="y2" values="82;105;82" dur="1.6s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
    </line>
    <line stroke="#C8FF00" stroke-width="3.5" stroke-linecap="round">
      <animate attributeName="x1" values="62;45;62" dur="1.6s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
      <animate attributeName="y1" values="82;105;82" dur="1.6s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
      <animate attributeName="x2" values="52;38;52" dur="1.6s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
      <animate attributeName="y2" values="108;118;108" dur="1.6s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
    </line>
    <!-- RIGHT ARM -->
    <line stroke="#C8FF00" stroke-width="3.5" stroke-linecap="round">
      <animate attributeName="x1" values="142;142;142" dur="1.6s" repeatCount="indefinite"/>
      <animate attributeName="y1" values="58;88;58" dur="1.6s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
      <animate attributeName="x2" values="168;185;168" dur="1.6s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
      <animate attributeName="y2" values="82;105;82" dur="1.6s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
    </line>
    <line stroke="#C8FF00" stroke-width="3.5" stroke-linecap="round">
      <animate attributeName="x1" values="168;185;168" dur="1.6s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
      <animate attributeName="y1" values="82;105;82" dur="1.6s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
      <animate attributeName="x2" values="178;192;178" dur="1.6s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
      <animate attributeName="y2" values="108;118;108" dur="1.6s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
    </line>
    <!-- LEFT THIGH -->
    <line stroke="#C8FF00" stroke-width="4" stroke-linecap="round">
      <animate attributeName="x1" values="98;98;98" dur="1.6s" repeatCount="indefinite"/>
      <animate attributeName="y1" values="112;130;112" dur="1.6s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
      <animate attributeName="x2" values="80;55;80" dur="1.6s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
      <animate attributeName="y2" values="162;148;162" dur="1.6s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
    </line>
    <!-- LEFT SHIN -->
    <line stroke="#C8FF00" stroke-width="4" stroke-linecap="round">
      <animate attributeName="x1" values="80;55;80" dur="1.6s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
      <animate attributeName="y1" values="162;148;162" dur="1.6s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
      <animate attributeName="x2" values="78;58;78" dur="1.6s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
      <animate attributeName="y2" values="196;196;196" dur="1.6s" repeatCount="indefinite"/>
    </line>
    <!-- RIGHT THIGH -->
    <line stroke="#C8FF00" stroke-width="4" stroke-linecap="round">
      <animate attributeName="x1" values="132;132;132" dur="1.6s" repeatCount="indefinite"/>
      <animate attributeName="y1" values="112;130;112" dur="1.6s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
      <animate attributeName="x2" values="150;175;150" dur="1.6s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
      <animate attributeName="y2" values="162;148;162" dur="1.6s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
    </line>
    <!-- RIGHT SHIN -->
    <line stroke="#C8FF00" stroke-width="4" stroke-linecap="round">
      <animate attributeName="x1" values="150;175;150" dur="1.6s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
      <animate attributeName="y1" values="162;148;162" dur="1.6s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
      <animate attributeName="x2" values="152;172;152" dur="1.6s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
      <animate attributeName="y2" values="196;196;196" dur="1.6s" repeatCount="indefinite"/>
    </line>
  </svg>`,

  jumping_jack: `<svg viewBox="0 0 240 210" fill="none" xmlns="http://www.w3.org/2000/svg">
    <style>
      .jj-sk{stroke:#C8FF00;stroke-linecap:round;fill:none;}
      .jj-h{fill:#C8FF00;}
    </style>
    <line x1="10" y1="200" x2="230" y2="200" stroke="#222222" stroke-width="2"/>
    <!-- HEAD -->
    <circle class="jj-h" cx="120" cy="28" r="14"/>
    <!-- TORSO -->
    <line class="jj-sk" x1="120" y1="42" x2="120" y2="115" stroke-width="4"/>
    <!-- LEFT ARM -->
    <line class="jj-sk" stroke-width="3.5" x1="120" y1="60">
      <animate attributeName="x2" values="80;35;80" dur="1.1s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
      <animate attributeName="y2" values="90;30;90" dur="1.1s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
    </line>
    <!-- RIGHT ARM -->
    <line class="jj-sk" stroke-width="3.5" x1="120" y1="60">
      <animate attributeName="x2" values="160;205;160" dur="1.1s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
      <animate attributeName="y2" values="90;30;90" dur="1.1s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
    </line>
    <!-- LEFT LEG -->
    <line class="jj-sk" stroke-width="4" x1="110" y1="115">
      <animate attributeName="x2" values="88;48;88" dur="1.1s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
      <animate attributeName="y2" values="162;196;162" dur="1.1s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
    </line>
    <line class="jj-sk" stroke-width="4">
      <animate attributeName="x1" values="88;48;88" dur="1.1s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
      <animate attributeName="y1" values="162;196;162" dur="1.1s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
      <animate attributeName="x2" values="82;42;82" dur="1.1s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
      <animate attributeName="y2" values="197;197;197" dur="1.1s" repeatCount="indefinite"/>
    </line>
    <!-- RIGHT LEG -->
    <line class="jj-sk" stroke-width="4" x1="130" y1="115">
      <animate attributeName="x2" values="152;192;152" dur="1.1s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
      <animate attributeName="y2" values="162;196;162" dur="1.1s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
    </line>
    <line class="jj-sk" stroke-width="4">
      <animate attributeName="x1" values="152;192;152" dur="1.1s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
      <animate attributeName="y1" values="162;196;162" dur="1.1s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
      <animate attributeName="x2" values="158;198;158" dur="1.1s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
      <animate attributeName="y2" values="197;197;197" dur="1.1s" repeatCount="indefinite"/>
    </line>
  </svg>`,

  high_knees: `<svg viewBox="0 0 220 210" fill="none" xmlns="http://www.w3.org/2000/svg">
    <style>.hk{stroke:#C8FF00;stroke-linecap:round;fill:none;}.hkh{fill:#C8FF00;}</style>
    <line x1="10" y1="200" x2="210" y2="200" stroke="#222222" stroke-width="2"/>
    <circle class="hkh" cx="110" cy="28" r="14"/>
    <line class="hk" x1="110" y1="42" x2="110" y2="115" stroke-width="4"/>
    <!-- LEFT ARM (swings opposite to right knee) -->
    <line class="hk" stroke-width="3.5" x1="95" y1="65">
      <animate attributeName="x2" values="70;80;70" dur="0.8s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
      <animate attributeName="y2" values="100;75;100" dur="0.8s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
    </line>
    <!-- RIGHT ARM -->
    <line class="hk" stroke-width="3.5" x1="125" y1="65">
      <animate attributeName="x2" values="150;140;150" dur="0.8s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
      <animate attributeName="y2" values="75;100;75" dur="0.8s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
    </line>
    <!-- LEFT LEG (knee up alternates) -->
    <line class="hk" stroke-width="4" x1="100" y1="115">
      <animate attributeName="x2" values="88;88;88" dur="0.8s" repeatCount="indefinite"/>
      <animate attributeName="y2" values="165;115;165" dur="0.8s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
    </line>
    <line class="hk" stroke-width="4">
      <animate attributeName="x1" values="88;88;88" dur="0.8s" repeatCount="indefinite"/>
      <animate attributeName="y1" values="165;115;165" dur="0.8s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
      <animate attributeName="x2" values="82;100;82" dur="0.8s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
      <animate attributeName="y2" values="197;155;197" dur="0.8s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
    </line>
    <!-- RIGHT LEG (opposite) -->
    <line class="hk" stroke-width="4" x1="120" y1="115">
      <animate attributeName="x2" values="132;132;132" dur="0.8s" repeatCount="indefinite"/>
      <animate attributeName="y2" values="115;165;115" dur="0.8s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
    </line>
    <line class="hk" stroke-width="4">
      <animate attributeName="x1" values="132;132;132" dur="0.8s" repeatCount="indefinite"/>
      <animate attributeName="y1" values="115;165;115" dur="0.8s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
      <animate attributeName="x2" values="140;138;140" dur="0.8s" repeatCount="indefinite"/>
      <animate attributeName="y2" values="155;197;155" dur="0.8s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
    </line>
  </svg>`,

  lunge: `<svg viewBox="0 0 240 210" fill="none" xmlns="http://www.w3.org/2000/svg">
    <style>.ln{stroke:#C8FF00;stroke-linecap:round;fill:none;}.lnh{fill:#C8FF00;}</style>
    <line x1="10" y1="200" x2="230" y2="200" stroke="#222222" stroke-width="2"/>
    <circle class="lnh" cx="110" cy="28" r="14">
      <animate attributeName="cy" values="28;38;28" dur="1.6s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
    </circle>
    <line class="ln" x1="110" stroke-width="4">
      <animate attributeName="y1" values="42;52;42" dur="1.6s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
      <animate attributeName="x2" values="110;110;110" dur="1.6s" repeatCount="indefinite"/>
      <animate attributeName="y2" values="112;122;112" dur="1.6s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
    </line>
    <!-- Arms (down at sides) -->
    <line class="ln" stroke-width="3.5" x1="90" y1="68" x2="75" y2="105"/>
    <line class="ln" stroke-width="3.5" x1="130" y1="68" x2="145" y2="105"/>
    <!-- Front leg (bent, forward) -->
    <line class="ln" stroke-width="4" x1="105">
      <animate attributeName="y1" values="112;122;112" dur="1.6s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
      <animate attributeName="x2" values="148;148;148" dur="1.6s" repeatCount="indefinite"/>
      <animate attributeName="y2" values="162;152;162" dur="1.6s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
    </line>
    <line class="ln" stroke-width="4">
      <animate attributeName="x1" values="148;148;148" dur="1.6s" repeatCount="indefinite"/>
      <animate attributeName="y1" values="162;152;162" dur="1.6s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
      <animate attributeName="x2" values="170;170;170" dur="1.6s" repeatCount="indefinite"/>
      <animate attributeName="y2" values="197;197;197" dur="1.6s" repeatCount="indefinite"/>
    </line>
    <!-- Back leg (extended, knee near floor) -->
    <line class="ln" stroke-width="4" x1="118">
      <animate attributeName="y1" values="112;122;112" dur="1.6s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
      <animate attributeName="x2" values="70;70;70" dur="1.6s" repeatCount="indefinite"/>
      <animate attributeName="y2" values="168;178;168" dur="1.6s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
    </line>
    <line class="ln" stroke-width="4" x1="70">
      <animate attributeName="y1" values="168;178;168" dur="1.6s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
      <animate attributeName="x2" values="55;55;55" dur="1.6s" repeatCount="indefinite"/>
      <animate attributeName="y2" values="197;197;197" dur="1.6s" repeatCount="indefinite"/>
    </line>
  </svg>`,

  plank: `<svg viewBox="0 0 240 150" fill="none" xmlns="http://www.w3.org/2000/svg">
    <style>
      @keyframes plank-breathe { 0%,100%{opacity:1} 50%{opacity:0.6} }
      .pk{stroke:#C8FF00;stroke-linecap:round;fill:none;animation:plank-breathe 2s ease-in-out infinite;}
      .pkh{fill:#C8FF00;animation:plank-breathe 2s ease-in-out infinite;}
    </style>
    <line x1="10" y1="132" x2="230" y2="132" stroke="#222222" stroke-width="2"/>
    <circle class="pkh" cx="200" cy="90" r="13"/>
    <line class="pk" x1="187" y1="93" x2="70" y2="112" stroke-width="4"/>
    <line class="pk" x1="160" y1="97" x2="160" y2="130" stroke-width="4"/>
    <line class="pk" x1="100" y1="108" x2="100" y2="130" stroke-width="4"/>
    <line class="pk" x1="70" y1="112" x2="48" y2="128" stroke-width="3.5"/>
    <line class="pk" x1="62" y1="114" x2="40" y2="130" stroke-width="3.5"/>
  </svg>`,

  situp: `<svg viewBox="0 0 240 210" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="10" y1="200" x2="230" y2="200" stroke="#222222" stroke-width="2"/>
    <!-- Legs (fixed on floor) -->
    <line x1="80" y1="158" x2="60" y2="198" stroke="#C8FF00" stroke-width="4" stroke-linecap="round"/>
    <line x1="140" y1="158" x2="120" y2="198" stroke="#C8FF00" stroke-width="4" stroke-linecap="round"/>
    <ellipse cx="52" cy="197" rx="10" ry="4" fill="#C8FF00" opacity="0.5"/>
    <ellipse cx="112" cy="197" rx="10" ry="4" fill="#C8FF00" opacity="0.5"/>
    <!-- Torso (rotates from lying to sitting) -->
    <line stroke="#C8FF00" stroke-width="4" stroke-linecap="round" x1="110" y1="158">
      <animate attributeName="x2" values="165;110;165" dur="1.8s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
      <animate attributeName="y2" values="158;68;158" dur="1.8s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
    </line>
    <!-- Head -->
    <circle r="14" fill="#C8FF00">
      <animate attributeName="cx" values="178;110;178" dur="1.8s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
      <animate attributeName="cy" values="155;54;155" dur="1.8s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
    </circle>
    <!-- Arms (hands behind head) -->
    <line stroke="#C8FF00" stroke-width="3.5" stroke-linecap="round">
      <animate attributeName="x1" values="165;95;165" dur="1.8s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
      <animate attributeName="y1" values="152;72;152" dur="1.8s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
      <animate attributeName="x2" values="190;90;190" dur="1.8s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
      <animate attributeName="y2" values="140;55;140" dur="1.8s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
    </line>
  </svg>`,

  burpee: `<svg viewBox="0 0 220 210" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="10" y1="200" x2="210" y2="200" stroke="#222222" stroke-width="2"/>
    <!-- Full body jumps up then goes down to plank -->
    <circle r="13" fill="#C8FF00">
      <animate attributeName="cx" values="110;110;110" dur="2s" repeatCount="indefinite"/>
      <animate attributeName="cy" values="28;28;100;28" dur="2s" repeatCount="indefinite" keyTimes="0;0.3;0.7;1" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1;0.42 0 0.58 1"/>
    </circle>
    <line stroke="#C8FF00" stroke-width="4" stroke-linecap="round" x1="110">
      <animate attributeName="y1" values="42;42;112;42" dur="2s" repeatCount="indefinite" keyTimes="0;0.3;0.7;1" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1;0.42 0 0.58 1"/>
      <animate attributeName="x2" values="110;110;185;110" dur="2s" repeatCount="indefinite" keyTimes="0;0.3;0.7;1" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1;0.42 0 0.58 1"/>
      <animate attributeName="y2" values="115;115;112;115" dur="2s" repeatCount="indefinite" keyTimes="0;0.3;0.7;1" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1;0.42 0 0.58 1"/>
    </line>
    <!-- Arms -->
    <line stroke="#C8FF00" stroke-width="3.5" stroke-linecap="round">
      <animate attributeName="x1" values="95;95;110;95" dur="2s" repeatCount="indefinite" keyTimes="0;0.3;0.7;1"/>
      <animate attributeName="y1" values="65;65;112;65" dur="2s" repeatCount="indefinite" keyTimes="0;0.3;0.7;1"/>
      <animate attributeName="x2" values="68;50;155;68" dur="2s" repeatCount="indefinite" keyTimes="0;0.3;0.7;1" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1;0.42 0 0.58 1"/>
      <animate attributeName="y2" values="95;30;130;95" dur="2s" repeatCount="indefinite" keyTimes="0;0.3;0.7;1" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1;0.42 0 0.58 1"/>
    </line>
    <line stroke="#C8FF00" stroke-width="3.5" stroke-linecap="round">
      <animate attributeName="x1" values="125;125;110;125" dur="2s" repeatCount="indefinite" keyTimes="0;0.3;0.7;1"/>
      <animate attributeName="y1" values="65;65;112;65" dur="2s" repeatCount="indefinite" keyTimes="0;0.3;0.7;1"/>
      <animate attributeName="x2" values="152;170;40;152" dur="2s" repeatCount="indefinite" keyTimes="0;0.3;0.7;1" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1;0.42 0 0.58 1"/>
      <animate attributeName="y2" values="95;30;130;95" dur="2s" repeatCount="indefinite" keyTimes="0;0.3;0.7;1" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1;0.42 0 0.58 1"/>
    </line>
    <!-- Legs -->
    <line stroke="#C8FF00" stroke-width="4" stroke-linecap="round">
      <animate attributeName="x1" values="100;100;110;100" dur="2s" repeatCount="indefinite" keyTimes="0;0.3;0.7;1"/>
      <animate attributeName="y1" values="115;115;112;115" dur="2s" repeatCount="indefinite" keyTimes="0;0.3;0.7;1"/>
      <animate attributeName="x2" values="85;85;50;85" dur="2s" repeatCount="indefinite" keyTimes="0;0.3;0.7;1" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1;0.42 0 0.58 1"/>
      <animate attributeName="y2" values="197;197;130;197" dur="2s" repeatCount="indefinite" keyTimes="0;0.3;0.7;1" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1;0.42 0 0.58 1"/>
    </line>
    <line stroke="#C8FF00" stroke-width="4" stroke-linecap="round">
      <animate attributeName="x1" values="120;120;110;120" dur="2s" repeatCount="indefinite" keyTimes="0;0.3;0.7;1"/>
      <animate attributeName="y1" values="115;115;112;115" dur="2s" repeatCount="indefinite" keyTimes="0;0.3;0.7;1"/>
      <animate attributeName="x2" values="135;135;175;135" dur="2s" repeatCount="indefinite" keyTimes="0;0.3;0.7;1" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1;0.42 0 0.58 1"/>
      <animate attributeName="y2" values="197;197;130;197" dur="2s" repeatCount="indefinite" keyTimes="0;0.3;0.7;1" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1;0.42 0 0.58 1"/>
    </line>
  </svg>`,

  mountain_climber: `<svg viewBox="0 0 240 155" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="10" y1="140" x2="230" y2="140" stroke="#222222" stroke-width="2"/>
    <circle cx="200" cy="70" r="13" fill="#C8FF00"/>
    <line x1="188" y1="74" x2="58" y2="95" stroke="#C8FF00" stroke-width="4" stroke-linecap="round"/>
    <line x1="155" y1="80" x2="155" y2="135" stroke="#C8FF00" stroke-width="4" stroke-linecap="round"/>
    <line x1="100" y1="90" x2="100" y2="135" stroke="#C8FF00" stroke-width="4" stroke-linecap="round"/>
    <!-- Alternate legs -->
    <line stroke="#C8FF00" stroke-width="4" stroke-linecap="round" x1="58" y1="95">
      <animate attributeName="x2" values="92;58;92" dur="0.7s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
      <animate attributeName="y2" values="100;95;100" dur="0.7s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
    </line>
    <line stroke="#C8FF00" stroke-width="4" stroke-linecap="round">
      <animate attributeName="x1" values="92;58;92" dur="0.7s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
      <animate attributeName="y1" values="100;95;100" dur="0.7s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
      <animate attributeName="x2" values="82;40;82" dur="0.7s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
      <animate attributeName="y2" values="135;135;135" dur="0.7s" repeatCount="indefinite"/>
    </line>
    <line stroke="#C8FF00" stroke-width="4" stroke-linecap="round" x1="48" y1="97">
      <animate attributeName="x2" values="40;95;40" dur="0.7s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
      <animate attributeName="y2" values="135;100;135" dur="0.7s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
    </line>
    <line stroke="#C8FF00" stroke-width="4" stroke-linecap="round">
      <animate attributeName="x1" values="40;95;40" dur="0.7s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
      <animate attributeName="y1" values="135;100;135" dur="0.7s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
      <animate attributeName="x2" values="32;88;32" dur="0.7s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
      <animate attributeName="y2" values="136;136;136" dur="0.7s" repeatCount="indefinite"/>
    </line>
  </svg>`,

  jab: `<svg viewBox="0 0 240 210" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="10" y1="200" x2="230" y2="200" stroke="#222222" stroke-width="2"/>
    <!-- Guard stance figure -->
    <circle cx="100" cy="30" r="14" fill="#C8FF00"/>
    <line x1="100" y1="44" x2="100" y2="118" stroke="#C8FF00" stroke-width="4" stroke-linecap="round"/>
    <line x1="85" y1="165" x2="75" y2="198" stroke="#C8FF00" stroke-width="4" stroke-linecap="round"/>
    <line x1="115" y1="165" x2="125" y2="198" stroke="#C8FF00" stroke-width="4" stroke-linecap="round"/>
    <line x1="92" y1="118" x2="85" y2="165" stroke="#C8FF00" stroke-width="4" stroke-linecap="round"/>
    <line x1="108" y1="118" x2="115" y2="165" stroke="#C8FF00" stroke-width="4" stroke-linecap="round"/>
    <!-- JAB arm (left arm punches forward - extends right) -->
    <line stroke="#C8FF00" stroke-width="4" stroke-linecap="round" x1="88" y1="72">
      <animate attributeName="x2" values="68;185;68" dur="0.9s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
      <animate attributeName="y2" values="95;75;95" dur="0.9s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
    </line>
    <!-- Guard arm (right, stays up) -->
    <line x1="112" y1="72" x2="130" y2="60" stroke="#C8FF00" stroke-width="4" stroke-linecap="round"/>
    <line x1="130" y1="60" x2="138" y2="48" stroke="#C8FF00" stroke-width="3.5" stroke-linecap="round"/>
    <!-- Impact flash -->
    <circle r="10" fill="none" stroke="#F87171" stroke-width="2" opacity="0">
      <animate attributeName="cx" values="185;185;185" dur="0.9s" repeatCount="indefinite"/>
      <animate attributeName="cy" values="75;75;75" dur="0.9s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0;0.8;0;0" dur="0.9s" repeatCount="indefinite" keyTimes="0;0.5;0.6;0.75;1"/>
      <animate attributeName="r" values="5;5;14;5;5" dur="0.9s" repeatCount="indefinite" keyTimes="0;0.5;0.6;0.75;1"/>
    </circle>
  </svg>`,

  cross: `<svg viewBox="0 0 240 210" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="10" y1="200" x2="230" y2="200" stroke="#222222" stroke-width="2"/>
    <circle cx="120" cy="30" r="14" fill="#C8FF00">
      <animate attributeName="cx" values="120;105;120" dur="1s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
    </circle>
    <line stroke="#C8FF00" stroke-width="4" stroke-linecap="round">
      <animate attributeName="x1" values="120;105;120" dur="1s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
      <animate attributeName="y1" values="44;44;44" dur="1s" repeatCount="indefinite"/>
      <animate attributeName="x2" values="120;105;120" dur="1s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
      <animate attributeName="y2" values="118;118;118" dur="1s" repeatCount="indefinite"/>
    </line>
    <line x1="108" y1="118" x2="95" y2="165" stroke="#C8FF00" stroke-width="4" stroke-linecap="round"/>
    <line x1="132" y1="118" x2="145" y2="165" stroke="#C8FF00" stroke-width="4" stroke-linecap="round"/>
    <line x1="95" y1="165" x2="85" y2="198" stroke="#C8FF00" stroke-width="4" stroke-linecap="round"/>
    <line x1="145" y1="165" x2="155" y2="198" stroke="#C8FF00" stroke-width="4" stroke-linecap="round"/>
    <!-- Guard arm -->
    <line x1="105" y1="72" x2="88" y2="58" stroke="#C8FF00" stroke-width="4" stroke-linecap="round"/>
    <line x1="88" y1="58" x2="80" y2="46" stroke="#C8FF00" stroke-width="3.5" stroke-linecap="round"/>
    <!-- CROSS arm (right arm, extends powerfully forward-left) -->
    <line stroke="#C8FF00" stroke-width="4" stroke-linecap="round">
      <animate attributeName="x1" values="135;120;135" dur="1s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
      <animate attributeName="y1" values="72;72;72" dur="1s" repeatCount="indefinite"/>
      <animate attributeName="x2" values="158;28;158" dur="1s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
      <animate attributeName="y2" values="88;68;88" dur="1s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
    </line>
    <circle r="10" fill="none" stroke="#F87171" stroke-width="2" opacity="0">
      <animate attributeName="cx" values="28;28;28" dur="1s" repeatCount="indefinite"/>
      <animate attributeName="cy" values="68;68;68" dur="1s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0;0.8;0;0" dur="1s" repeatCount="indefinite" keyTimes="0;0.5;0.6;0.78;1"/>
      <animate attributeName="r" values="5;5;14;5;5" dur="1s" repeatCount="indefinite" keyTimes="0;0.5;0.6;0.78;1"/>
    </circle>
  </svg>`,

  hook: `<svg viewBox="0 0 240 210" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="10" y1="200" x2="230" y2="200" stroke="#222222" stroke-width="2"/>
    <circle cx="130" cy="30" r="14" fill="#C8FF00">
      <animate attributeName="cx" values="130;115;130" dur="1.1s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
    </circle>
    <line stroke="#C8FF00" stroke-width="4" stroke-linecap="round">
      <animate attributeName="x1" values="130;115;130" dur="1.1s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
      <animate attributeName="y1" values="44;44;44" dur="1.1s" repeatCount="indefinite"/>
      <animate attributeName="x2" values="130;115;130" dur="1.1s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
      <animate attributeName="y2" values="118;118;118" dur="1.1s" repeatCount="indefinite"/>
    </line>
    <line x1="118" y1="118" x2="105" y2="165" stroke="#C8FF00" stroke-width="4" stroke-linecap="round"/>
    <line x1="142" y1="118" x2="155" y2="165" stroke="#C8FF00" stroke-width="4" stroke-linecap="round"/>
    <line x1="105" y1="165" x2="95" y2="198" stroke="#C8FF00" stroke-width="4" stroke-linecap="round"/>
    <line x1="155" y1="165" x2="165" y2="198" stroke="#C8FF00" stroke-width="4" stroke-linecap="round"/>
    <!-- Guard arm -->
    <line x1="118" y1="72" x2="100" y2="60" stroke="#C8FF00" stroke-width="4" stroke-linecap="round"/>
    <!-- HOOK arm (horizontal swing) -->
    <line stroke="#C8FF00" stroke-width="4" stroke-linecap="round">
      <animate attributeName="x1" values="142;130;142" dur="1.1s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
      <animate attributeName="y1" values="72;72;72" dur="1.1s" repeatCount="indefinite"/>
      <animate attributeName="x2" values="175;50;175" dur="1.1s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
      <animate attributeName="y2" values="72;72;72" dur="1.1s" repeatCount="indefinite"/>
    </line>
  </svg>`,

  uppercut: `<svg viewBox="0 0 240 210" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="10" y1="200" x2="230" y2="200" stroke="#222222" stroke-width="2"/>
    <circle cx="120" cy="30" r="14" fill="#C8FF00"/>
    <line x1="120" y1="44" x2="120" y2="118" stroke="#C8FF00" stroke-width="4" stroke-linecap="round"/>
    <line x1="108" y1="118" x2="95" y2="165" stroke="#C8FF00" stroke-width="4" stroke-linecap="round"/>
    <line x1="132" y1="118" x2="145" y2="165" stroke="#C8FF00" stroke-width="4" stroke-linecap="round"/>
    <line x1="95" y1="165" x2="85" y2="198" stroke="#C8FF00" stroke-width="4" stroke-linecap="round"/>
    <line x1="145" y1="165" x2="155" y2="198" stroke="#C8FF00" stroke-width="4" stroke-linecap="round"/>
    <line x1="108" y1="72" x2="88" y2="60" stroke="#C8FF00" stroke-width="4" stroke-linecap="round"/>
    <!-- UPPERCUT arm (swings upward) -->
    <line stroke="#C8FF00" stroke-width="4" stroke-linecap="round">
      <animate attributeName="x1" values="132;132;132" dur="1s" repeatCount="indefinite"/>
      <animate attributeName="y1" values="72;72;72" dur="1s" repeatCount="indefinite"/>
      <animate attributeName="x2" values="155;135;155" dur="1s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
      <animate attributeName="y2" values="110;20;110" dur="1s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
    </line>
    <circle r="8" fill="none" stroke="#C8FF00" stroke-width="2" opacity="0">
      <animate attributeName="cx" values="135;135;135" dur="1s" repeatCount="indefinite"/>
      <animate attributeName="cy" values="20;20;20" dur="1s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0;0.9;0;0" dur="1s" repeatCount="indefinite" keyTimes="0;0.45;0.55;0.7;1"/>
      <animate attributeName="r" values="4;4;16;4;4" dur="1s" repeatCount="indefinite" keyTimes="0;0.45;0.55;0.7;1"/>
    </circle>
  </svg>`,

  shadow_boxing: `<svg viewBox="0 0 240 210" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="10" y1="200" x2="230" y2="200" stroke="#222222" stroke-width="2"/>
    <circle cx="115" cy="30" r="14" fill="#C8FF00">
      <animate attributeName="cy" values="30;34;28;32;30" dur="1.4s" repeatCount="indefinite" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1;0.3 0 0.7 1;0.3 0 0.7 1"/>
    </circle>
    <line x1="115" y1="44" x2="115" y2="118" stroke="#C8FF00" stroke-width="4" stroke-linecap="round">
      <animate attributeName="x1" values="115;112;118;110;115" dur="1.4s" repeatCount="indefinite"/>
      <animate attributeName="x2" values="115;112;118;110;115" dur="1.4s" repeatCount="indefinite"/>
    </line>
    <line x1="100" y1="118" x2="88" y2="165" stroke="#C8FF00" stroke-width="4" stroke-linecap="round"/>
    <line x1="130" y1="118" x2="142" y2="165" stroke="#C8FF00" stroke-width="4" stroke-linecap="round"/>
    <line x1="88" y1="165" x2="80" y2="198" stroke="#C8FF00" stroke-width="4" stroke-linecap="round"/>
    <line x1="142" y1="165" x2="150" y2="198" stroke="#C8FF00" stroke-width="4" stroke-linecap="round"/>
    <!-- Alternating punches combo -->
    <line stroke="#C8FF00" stroke-width="4" stroke-linecap="round">
      <animate attributeName="x1" values="103;103;103;103;103" dur="1.4s" repeatCount="indefinite"/>
      <animate attributeName="y1" values="68;68;68;68;68" dur="1.4s" repeatCount="indefinite"/>
      <animate attributeName="x2" values="75;185;75;75;75" dur="1.4s" repeatCount="indefinite" keyTimes="0;0.25;0.5;0.75;1"/>
      <animate attributeName="y2" values="88;60;88;88;88" dur="1.4s" repeatCount="indefinite" keyTimes="0;0.25;0.5;0.75;1"/>
    </line>
    <line stroke="#C8FF00" stroke-width="4" stroke-linecap="round">
      <animate attributeName="x1" values="127;127;127;127;127" dur="1.4s" repeatCount="indefinite"/>
      <animate attributeName="y1" values="68;68;68;68;68" dur="1.4s" repeatCount="indefinite"/>
      <animate attributeName="x2" values="155;155;30;155;155" dur="1.4s" repeatCount="indefinite" keyTimes="0;0.25;0.5;0.75;1" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1;0.3 0 0.7 1;0.3 0 0.7 1"/>
      <animate attributeName="y2" values="88;88;65;88;88" dur="1.4s" repeatCount="indefinite" keyTimes="0;0.25;0.5;0.75;1" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1;0.3 0 0.7 1;0.3 0 0.7 1"/>
    </line>
  </svg>`,

  jump_rope: `<svg viewBox="0 0 240 210" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="10" y1="200" x2="230" y2="200" stroke="#222222" stroke-width="2"/>
    <!-- Body jumps up and down -->
    <circle r="14" fill="#C8FF00" cx="120">
      <animate attributeName="cy" values="30;18;30;30;30" dur="0.6s" repeatCount="indefinite" keyTimes="0;0.3;0.5;0.75;1" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1;0.42 0 0.58 1;0.42 0 0.58 1"/>
    </circle>
    <line x1="120" stroke-width="4" stroke="#C8FF00" stroke-linecap="round">
      <animate attributeName="y1" values="44;32;44;44;44" dur="0.6s" repeatCount="indefinite" keyTimes="0;0.3;0.5;0.75;1"/>
      <animate attributeName="x2" values="120;120;120;120;120" dur="0.6s" repeatCount="indefinite"/>
      <animate attributeName="y2" values="118;106;118;118;118" dur="0.6s" repeatCount="indefinite" keyTimes="0;0.3;0.5;0.75;1"/>
    </line>
    <line x1="108" stroke-width="4" stroke="#C8FF00" stroke-linecap="round">
      <animate attributeName="y1" values="118;106;118;118;118" dur="0.6s" repeatCount="indefinite" keyTimes="0;0.3;0.5;0.75;1"/>
      <animate attributeName="x2" values="95;95;95;95;95" dur="0.6s" repeatCount="indefinite"/>
      <animate attributeName="y2" values="165;153;165;165;165" dur="0.6s" repeatCount="indefinite" keyTimes="0;0.3;0.5;0.75;1"/>
    </line>
    <line stroke-width="4" stroke="#C8FF00" stroke-linecap="round">
      <animate attributeName="x1" values="95;95;95;95;95" dur="0.6s" repeatCount="indefinite"/>
      <animate attributeName="y1" values="165;153;165;165;165" dur="0.6s" repeatCount="indefinite" keyTimes="0;0.3;0.5;0.75;1"/>
      <animate attributeName="x2" values="85;85;85;85;85" dur="0.6s" repeatCount="indefinite"/>
      <animate attributeName="y2" values="196;196;196;196;196" dur="0.6s" repeatCount="indefinite"/>
    </line>
    <line x1="132" stroke-width="4" stroke="#C8FF00" stroke-linecap="round">
      <animate attributeName="y1" values="118;106;118;118;118" dur="0.6s" repeatCount="indefinite" keyTimes="0;0.3;0.5;0.75;1"/>
      <animate attributeName="x2" values="145;145;145;145;145" dur="0.6s" repeatCount="indefinite"/>
      <animate attributeName="y2" values="165;153;165;165;165" dur="0.6s" repeatCount="indefinite" keyTimes="0;0.3;0.5;0.75;1"/>
    </line>
    <line stroke-width="4" stroke="#C8FF00" stroke-linecap="round">
      <animate attributeName="x1" values="145;145;145;145;145" dur="0.6s" repeatCount="indefinite"/>
      <animate attributeName="y1" values="165;153;165;165;165" dur="0.6s" repeatCount="indefinite" keyTimes="0;0.3;0.5;0.75;1"/>
      <animate attributeName="x2" values="155;155;155;155;155" dur="0.6s" repeatCount="indefinite"/>
      <animate attributeName="y2" values="196;196;196;196;196" dur="0.6s" repeatCount="indefinite"/>
    </line>
    <!-- Arms + rope handles rotating -->
    <line stroke-width="3.5" stroke="#C8FF00" stroke-linecap="round">
      <animate attributeName="x1" values="105;105;105;105;105" dur="0.6s" repeatCount="indefinite"/>
      <animate attributeName="y1" values="68;56;68;68;68" dur="0.6s" repeatCount="indefinite" keyTimes="0;0.3;0.5;0.75;1"/>
      <animate attributeName="x2" values="68;50;68;68;68" dur="0.6s" repeatCount="indefinite"/>
      <animate attributeName="y2" values="92;80;92;92;92" dur="0.6s" repeatCount="indefinite" keyTimes="0;0.3;0.5;0.75;1"/>
    </line>
    <line stroke-width="3.5" stroke="#C8FF00" stroke-linecap="round">
      <animate attributeName="x1" values="135;135;135;135;135" dur="0.6s" repeatCount="indefinite"/>
      <animate attributeName="y1" values="68;56;68;68;68" dur="0.6s" repeatCount="indefinite" keyTimes="0;0.3;0.5;0.75;1"/>
      <animate attributeName="x2" values="172;190;172;172;172" dur="0.6s" repeatCount="indefinite"/>
      <animate attributeName="y2" values="92;80;92;92;92" dur="0.6s" repeatCount="indefinite" keyTimes="0;0.3;0.5;0.75;1"/>
    </line>
    <!-- Rope arc -->
    <path stroke="#A78BFA" stroke-width="2.5" fill="none" stroke-linecap="round" opacity="0.6">
      <animate attributeName="d" values="M68,92 Q120,210 172,92;M68,80 Q120,-40 172,80;M68,92 Q120,210 172,92" dur="0.6s" repeatCount="indefinite" keyTimes="0;0.3;1" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
    </path>
  </svg>`,

  wall_sit: `<svg viewBox="0 0 220 210" fill="none" xmlns="http://www.w3.org/2000/svg">
    <style>
      @keyframes ws-breathe { 0%,100%{opacity:1} 50%{opacity:0.6} }
      .ws{stroke:#C8FF00;stroke-linecap:round;fill:none;animation:ws-breathe 2.5s ease-in-out infinite;}
      .wsh{fill:#C8FF00;animation:ws-breathe 2.5s ease-in-out infinite;}
    </style>
    <line x1="10" y1="200" x2="210" y2="200" stroke="#222222" stroke-width="2"/>
    <line x1="190" y1="20" x2="190" y2="200" stroke="#222222" stroke-width="3"/>
    <circle class="wsh" cx="120" cy="48" r="14"/>
    <line class="ws" x1="120" y1="62" x2="120" y2="118" stroke-width="4"/>
    <line class="ws" x1="108" y1="72" x2="80" y2="105" stroke-width="3.5"/>
    <line class="ws" x1="80" y1="105" x2="68" y2="118" stroke-width="3.5"/>
    <line class="ws" x1="132" y1="72" x2="160" y2="105" stroke-width="3.5"/>
    <line class="ws" x1="160" y1="105" x2="172" y2="118" stroke-width="3.5"/>
    <line class="ws" x1="108" y1="118" x2="68" y2="118" stroke-width="4"/>
    <line class="ws" x1="68" y1="118" x2="62" y2="198" stroke-width="4"/>
    <line class="ws" x1="132" y1="118" x2="172" y2="118" stroke-width="4"/>
    <line class="ws" x1="172" y1="118" x2="178" y2="198" stroke-width="4"/>
  </svg>`,
};

/* ===== EXERCISE LIBRARY ===== */
const EXERCISES = [
  // STRENGTH
  {
    id: "pushup",
    name: "Push-Ups",
    category: "strength",
    muscles: ["Chest", "Triceps", "Shoulders"],
    description:
      "Build a powerful chest! Keep your body straight like a plank.",
    icon: "💪",
    defaultSets: 3,
    defaultReps: 10,
    defaultRest: 60,
    xpPerRep: 2,
    animKey: "pushup",
    video: "videos/vid-pushups.mp4",
  },
  {
    id: "squat",
    name: "Squats",
    category: "strength",
    muscles: ["Quads", "Glutes", "Core"],
    description:
      "Builds powerful legs! Keep your chest up and knees behind toes.",
    icon: "🦵",
    defaultSets: 3,
    defaultReps: 15,
    defaultRest: 60,
    xpPerRep: 2,
    animKey: "squat",
    video: "videos/vid-squats.mp4",
  },
  {
    id: "lunge",
    name: "Lunges",
    category: "strength",
    muscles: ["Quads", "Glutes", "Balance"],
    description: "Single-leg strength and balance. Step forward, knee to 90°.",
    icon: "🚶",
    defaultSets: 3,
    defaultReps: 10,
    defaultRest: 60,
    xpPerRep: 2,
    animKey: "lunge",
    video: null,
  },
  {
    id: "plank",
    name: "Plank Hold",
    category: "strength",
    muscles: ["Core", "Shoulders", "Back"],
    description: "Core of steel! Hold your body rigid like an iron bridge.",
    icon: "🧱",
    defaultSets: 3,
    defaultReps: 30,
    defaultRest: 60,
    xpPerRep: 3,
    isTimedReps: true,
    animKey: "plank",
    video: null,
  },
  {
    id: "situp",
    name: "Crunches",
    category: "strength",
    muscles: ["Abs", "Core", "Hip Flexors"],
    description: "Classic ab builder. Hands behind head, curl up slowly.",
    icon: "🔥",
    defaultSets: 3,
    defaultReps: 15,
    defaultRest: 45,
    xpPerRep: 2,
    animKey: "situp",
    video: "videos/vid-crunches.mp4",
  },
  {
    id: "wall_sit",
    name: "Wall Sit",
    category: "strength",
    muscles: ["Quads", "Glutes", "Calves"],
    description:
      "Invisible chair challenge! Back against wall, thighs parallel.",
    icon: "⏱️",
    defaultSets: 3,
    defaultReps: 30,
    defaultRest: 60,
    xpPerRep: 3,
    isTimedReps: true,
    animKey: "wall_sit",
    video: null,
  },
  // CARDIO
  {
    id: "jumping_jack",
    name: "Jumping Jacks",
    category: "cardio",
    muscles: ["Full Body", "Cardio"],
    description: "Classic warm-up! Arms up and legs wide at the same time.",
    icon: "⭐",
    defaultSets: 3,
    defaultReps: 20,
    defaultRest: 45,
    xpPerRep: 1,
    animKey: "jumping_jack",
    video: null,
  },
  {
    id: "high_knees",
    name: "High Knees",
    category: "cardio",
    muscles: ["Cardio", "Core", "Legs"],
    description: "Run in place, drive your knees as high as you can!",
    icon: "🏃",
    defaultSets: 3,
    defaultReps: 30,
    defaultRest: 45,
    xpPerRep: 1,
    animKey: "high_knees",
    video: null,
  },
  {
    id: "burpee",
    name: "Burpees",
    category: "cardio",
    muscles: ["Full Body", "Cardio", "Core"],
    description: "The ultimate full-body move! Jump, plank, push-up, jump up!",
    icon: "💥",
    defaultSets: 3,
    defaultReps: 8,
    defaultRest: 90,
    xpPerRep: 4,
    animKey: "burpee",
    video: null,
  },
  {
    id: "mountain_climber",
    name: "Mountain Climbers",
    category: "cardio",
    muscles: ["Core", "Cardio", "Shoulders"],
    description:
      "Plank position, drive your knees toward your chest alternately.",
    icon: "🏔️",
    defaultSets: 3,
    defaultReps: 20,
    defaultRest: 60,
    xpPerRep: 2,
    animKey: "mountain_climber",
    video: null,
  },
  {
    id: "jump_rope",
    name: "Jump Rope",
    category: "cardio",
    muscles: ["Calves", "Cardio", "Coordination"],
    description: "Jump rope or shadow rope — great cardio and footwork!",
    icon: "🪢",
    defaultSets: 3,
    defaultReps: 40,
    defaultRest: 60,
    xpPerRep: 1,
    animKey: "jump_rope",
    video: null,
  },
  // BOXING
  {
    id: "jab",
    name: "Jab",
    category: "boxing",
    muscles: ["Shoulders", "Core", "Arms"],
    description:
      "Quick straight punch with your lead hand. Stay light on your feet!",
    icon: "🥊",
    defaultSets: 3,
    defaultReps: 20,
    defaultRest: 45,
    xpPerRep: 1,
    animKey: "jab",
    video: null,
  },
  {
    id: "cross",
    name: "Cross",
    category: "boxing",
    muscles: ["Shoulders", "Core", "Back"],
    description:
      "Power punch with your rear hand! Rotate your hip and shoulder.",
    icon: "🥊",
    defaultSets: 3,
    defaultReps: 20,
    defaultRest: 45,
    xpPerRep: 1,
    animKey: "cross",
    video: null,
  },
  {
    id: "hook",
    name: "Hook",
    category: "boxing",
    muscles: ["Core", "Shoulders", "Arms"],
    description:
      "Horizontal punch that swings from the side. Rotate your whole body!",
    icon: "🥊",
    defaultSets: 3,
    defaultReps: 16,
    defaultRest: 45,
    xpPerRep: 1,
    animKey: "hook",
    video: null,
  },
  {
    id: "uppercut",
    name: "Uppercut",
    category: "boxing",
    muscles: ["Core", "Legs", "Shoulders"],
    description:
      "Upward punch that rises from low. Dip and drive from your legs!",
    icon: "🥊",
    defaultSets: 3,
    defaultReps: 16,
    defaultRest: 45,
    xpPerRep: 1,
    animKey: "uppercut",
    video: null,
  },
  {
    id: "shadow_boxing",
    name: "Shadow Boxing",
    category: "boxing",
    muscles: ["Full Body", "Cardio", "Coordination"],
    description: "Throw jab-cross-hook combos! Move your feet and stay active.",
    icon: "👊",
    defaultSets: 3,
    defaultReps: 30,
    defaultRest: 60,
    xpPerRep: 2,
    isTimedReps: true,
    animKey: "shadow_boxing",
    video: null,
  },
];

function getExerciseById(id) {
  return EXERCISES.find((e) => e.id === id);
}

function getAnimation(key) {
  return ANIMS[key] || ANIMS["plank"];
}

function getCategoryGradient(category) {
  return (
    { strength: "grad-strength", cardio: "grad-cardio", boxing: "grad-boxing" }[
      category
    ] || "grad-default"
  );
}

function getCategoryColor(category) {
  return (
    {
      strength: "cat-color-strength",
      cardio: "cat-color-cardio",
      boxing: "cat-color-boxing",
    }[category] || ""
  );
}
