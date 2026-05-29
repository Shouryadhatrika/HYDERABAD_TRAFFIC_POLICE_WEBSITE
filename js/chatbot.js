(function () {
  'use strict';

  /* ═══════════════════════════════════════════════════════════
     1. INJECT CSS
  ══════════════════════════════════════════════════════════════ */
  function injectWindowCSS() {
    if (document.getElementById('htp-chatbot-window-css')) return;
    var s = document.createElement('style');
    s.id = 'htp-chatbot-window-css';
    s.textContent = [
      '#chatbotWindow{',
        'position:fixed;bottom:94px;right:80px;z-index:10000;',
        'width:340px;max-height:520px;',
        'background:#fff;border-radius:16px;',
        'box-shadow:0 8px 40px rgba(0,0,0,.22);',
        'display:flex;flex-direction:column;overflow:hidden;',
        'opacity:0;pointer-events:none;',
        'transform:translateY(16px) scale(.97);',
        'transition:opacity .25s,transform .25s;',
      '}',
      '#chatbotWindow.open{opacity:1;pointer-events:auto;transform:none;}',
      '#chatbotToggle{',
        'position:fixed!important;bottom:24px;right:80px;z-index:10001;',
        'width:56px;height:56px;border-radius:50%;',
        'background:linear-gradient(135deg,#0B3C5D 0%,#145DA0 100%);',
        'border:2.5px solid #FFC107;color:#fff;cursor:pointer;',
        'font-size:22px;box-shadow:0 4px 20px rgba(11,60,93,.4);',
        'display:flex!important;align-items:center;justify-content:center;',
        'transition:transform .22s;animation:chatPulse 2.5s infinite;',
      '}',
      '#chatbotToggle:hover{transform:translateY(-3px) scale(1.07);animation:none;}',
      '@keyframes chatPulse{',
        '0%,100%{box-shadow:0 4px 20px rgba(11,60,93,.4),0 0 0 0 rgba(255,193,7,.55);}',
        '50%{box-shadow:0 4px 20px rgba(11,60,93,.4),0 0 0 10px rgba(255,193,7,0);}',
      '}',
      '.chat-badge{position:absolute;top:-4px;right:-4px;background:#FFC107;color:#000;',
        'font-size:.6rem;font-weight:800;border-radius:10px;padding:1px 5px;border:1.5px solid #fff;}',
      '.chatbot-header{background:linear-gradient(100deg,#072a43 0%,#145DA0 100%);',
        'border-bottom:3px solid #FFC107;padding:14px 16px;',
        'display:flex;align-items:center;gap:12px;flex-shrink:0;}',
      '.chatbot-avatar{width:38px;height:38px;border-radius:50%;background:#FFC107;',
        'display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;}',
      '.chatbot-header-info{flex:1;}',
      '.chatbot-header-info h6{margin:0;color:#fff;font-size:.9rem;font-weight:700;}',
      '.chatbot-header-info small{color:rgba(255,255,255,.7);font-size:.72rem;}',
      '.chatbot-close{background:rgba(255,255,255,.12);border:none;color:rgba(255,255,255,.7);',
        'width:28px;height:28px;border-radius:50%;cursor:pointer;',
        'display:flex;align-items:center;justify-content:center;font-size:.8rem;}',
      '.chatbot-close:hover{background:rgba(255,255,255,.25);}',
      '.chatbot-body{flex:1;padding:16px;overflow-y:auto;',
        'display:flex;flex-direction:column;gap:12px;background:#f5f7fa;min-height:0;}',
      '.chat-msg{display:flex;gap:8px;align-items:flex-end;}',
      '.chat-msg.bot{justify-content:flex-start;}',
      '.chat-msg.user{justify-content:flex-end;}',
      '.chat-bubble{max-width:78%;padding:10px 14px;border-radius:16px;',
        'font-size:.83rem;line-height:1.55;font-family:inherit;}',
      '.chat-msg.bot .chat-bubble{background:#fff;color:#343a40;',
        'border-bottom-left-radius:4px;box-shadow:0 2px 8px rgba(0,0,0,.08);}',
      '.chat-msg.user .chat-bubble{background:#0B3C5D;color:#fff;',
        'border-bottom-right-radius:4px;}',
      '.chat-mini-avatar{width:26px;height:26px;border-radius:50%;background:#FFC107;',
        'display:flex;align-items:center;justify-content:center;',
        'font-size:12px;flex-shrink:0;}',
      '.chatbot-footer{padding:12px;border-top:1px solid #dee2e6;',
        'background:#fff;flex-shrink:0;}',
      '.chatbot-input-row{display:flex;gap:8px;align-items:center;',
        'background:#f5f7fa;border:1.5px solid #dee2e6;border-radius:24px;',
        'padding:6px 6px 6px 14px;transition:border-color .2s;}',
      '.chatbot-input-row:focus-within{border-color:#145DA0;}',
      '.chatbot-input-row input{flex:1;border:none;background:transparent;',
        'font-size:.82rem;color:#343a40;outline:none;font-family:inherit;}',
      '.chatbot-input-row input::placeholder{color:#adb5bd;}',
      '.chatbot-send{width:32px;height:32px;border-radius:50%;background:#0B3C5D;',
        'border:none;color:#fff;display:flex;align-items:center;',
        'justify-content:center;font-size:.8rem;cursor:pointer;flex-shrink:0;',
        'transition:background .2s;}',
      '.chatbot-send:hover{background:#145DA0;}',
      '@keyframes htpBounce{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-6px)}}',
      '@media(max-width:480px){',
        '#chatbotWindow{right:12px;left:12px;width:auto;bottom:86px;}',
        '#chatbotToggle{right:76px;bottom:20px;}',
      '}'
    ].join('');
    document.head.appendChild(s);
  }

  /* ═══════════════════════════════════════════════════════════
     2. KNOWLEDGE BASE
  ══════════════════════════════════════════════════════════════ */
  var KB = [

    /* ── GREETING ── */
    {
      id: 'greeting',
      match: ['hi','hello','namaste','hii','hey','good morning','good afternoon',
              'good evening','vanakam','namaskar','hai','helo','howdy','sup'],
      answer: '👋 <strong>Namaste! Welcome to HTP Assistant.</strong><br><br>I can help you with:<br>• 💳 E-Challan payment & status<br>• ⚠️ Wrong challan disputes<br>• 📄 NOC (Vehicle / School / Petrol Pump / Plying)<br>• 🏢 All 26 Traffic Police Stations<br>• 📞 Emergency & helpline numbers<br>• 🚗 MV Act fines & road rules<br>• 🅿️ Parking, towing & water logging<br>• 📋 RTI, Gallery, Road Safety Campaigns<br><br>What can I help you with today?',
      quick: ['Pay challan', 'Emergency numbers', 'Road rules & fines', 'Nearest PS']
    },

    /* ── THANKS ── */
    {
      id: 'thanks',
      match: ['thank you','thanks','thank u','thx','dhanyavaad','shukriya','ok thanks',
              'thank you very much','thanks a lot','tysm'],
      answer: '😊 You\'re welcome! Stay safe on the roads.<br><br>🟢 <b>Arrive Alive</b> — Wear your helmet, buckle up, follow signals and never drink and drive.',
      quick: ['Pay challan', 'Traffic helpline', 'Road rules & fines']
    },

    /* ── CHALLAN — PAY ── */
    {
      id: 'challan_pay',
      match: ['pay challan','payment','pay fine','pay my challan','echallan payment',
              'online challan','pay traffic fine','how to pay','challan pay','pay echallan',
              'challan payment online','pay my fine'],
      answer: '<strong>💳 Paying Your E-Challan</strong><br><br><b>1. Online (Easiest)</b><br>Visit <a href="https://echallan.tspolice.gov.in/publicview/" target="_blank" style="color:#FFC107">echallan.tspolice.gov.in</a><br>Enter vehicle number or challan number → Pay via UPI / Net Banking / Card.<br><br><b>2. By Phone</b><br>Call E-Challan Helpline: <a href="tel:04027852721" style="color:#FFC107">040-27852721</a><br><br><b>3. In Person</b><br>Visit any of the 26 Traffic Police Stations with your challan number and ID.',
      quick: ['Check challan status', 'Wrong challan?', 'Challan helpline', 'Traffic PS list']
    },

    /* ── CHALLAN — STATUS ── */
    {
      id: 'challan_status',
      match: ['challan status','check challan','pending challan','view challan',
              'find my challan','challan details','vehicle challan','challan check',
              'how to check challan','my challan'],
      answer: '<strong>🔍 Check Your Challan Status</strong><br><br>Go to <a href="https://echallan.tspolice.gov.in/publicview/" target="_blank" style="color:#FFC107">echallan.tspolice.gov.in</a><br><br>Enter your <b>vehicle number</b> or <b>challan number</b> to see all pending challans and fine amounts.<br><br>📞 For queries: <a href="tel:04027852721" style="color:#FFC107">040-27852721</a>',
      quick: ['Pay challan', 'Wrong challan?', 'Traffic helpline']
    },

    /* ── CHALLAN — WRONG ── */
    {
      id: 'challan_wrong',
      match: ['wrong challan','incorrect challan','challan mistake','dispute challan',
              'challan issued wrongly','challan error','false challan','got a wrong',
              'contest challan','challan dispute','wrongly issued','unfair challan'],
      answer: '<strong>⚠️ Disputing a Wrong Challan</strong><br><br><b>Step 1:</b> Visit the Traffic PS that issued the challan along with your vehicle documents.<br><b>Step 2:</b> Fill the challan dispute form at the station counter.<br><b>Step 3:</b> The SHO reviews and forwards to the DCP for final adjudication.<br><br>📄 More info: <a href="wrong_challan.html" style="color:#FFC107">Wrong Challan page</a><br>📞 Helpline: <a href="tel:9010203626" style="color:#FFC107">9010203626</a>',
      quick: ['Pay challan', 'Nearest traffic PS', 'Traffic helpline']
    },

    /* ── NOC — VEHICLE ── */
    {
      id: 'noc_vehicle',
      match: ['noc','no objection certificate','vehicle noc','transfer vehicle',
              'sell vehicle','transfer noc','vehicle transfer','noc for vehicle',
              'noc apply','how to get noc','vehicle selling noc'],
      answer: '<strong>📄 Vehicle Transfer NOC</strong><br><br>Required when transferring a vehicle to another state.<br><br><b>Documents needed:</b><br>• Original RC Book<br>• Valid Insurance Certificate<br>• PUC Certificate<br>• Tax Clearance Certificate<br>• ID proof of owner<br>• No pending challans<br><br>📄 Apply here: <a href="noc_tov.html" style="color:#FFC107">Vehicle NOC page</a><br>📞 Helpline: <a href="tel:9010203626" style="color:#FFC107">9010203626</a>',
      quick: ['School NOC', 'Petrol pump NOC', 'Vehicle Plying NOC', 'Nearest traffic PS']
    },

    /* ── NOC — SCHOOL ── */
    {
      id: 'noc_school',
      match: ['school noc','school vehicle','school bus noc','school transport noc',
              'school permit','school van noc','noc for school','school bus permit'],
      answer: '<strong>🏫 School Vehicle NOC</strong><br><br><b>Documents required:</b><br>• Fire NOC<br>• GHMC Sanitary Certificate<br>• Lease Document / Sale Deed<br>• Parking photographs<br>• Self-Affidavit from School Principal<br>• Building Stability Certificate<br><br>📄 Apply here: <a href="noc_schools.html" style="color:#FFC107">School NOC page</a><br>📞 Helpline: <a href="tel:9010203626" style="color:#FFC107">9010203626</a>',
      quick: ['Vehicle NOC', 'Petrol pump NOC', 'Traffic helpline']
    },

    /* ── NOC — PETROL PUMP ── */
    {
      id: 'noc_petrol',
      match: ['petrol pump noc','fuel station noc','petrol bunk noc','filling station noc',
              'noc for petrol pump','petrol station noc','fuel noc'],
      answer: '<strong>⛽ Petrol Pump NOC</strong><br><br><b>Documents required:</b><br>• Site layout plan<br>• PCRA / Petroleum licensing documents<br>• Municipal / GHMC permission<br>• Property ownership documents<br><br>📄 Apply here: <a href="noc_petrol.html" style="color:#FFC107">Petrol Pump NOC page</a><br>📞 Helpline: <a href="tel:9010203626" style="color:#FFC107">9010203626</a>',
      quick: ['Vehicle NOC', 'School NOC', 'Vehicle Plying NOC']
    },

    /* ── NOC — VEHICLE PLYING ── */
    {
      id: 'noc_plying',
      match: ['plying noc','vehicle plying','plying permit','noc for plying',
              'vehicle plying noc','plying certificate','ply noc'],
      answer: '<strong>🚌 Vehicle Plying NOC</strong><br><br>Required for commercial vehicles to ply on certain routes.<br><br>📄 Apply here: <a href="noc_plying.html" style="color:#FFC107">Vehicle Plying NOC page</a><br>📞 Helpline: <a href="tel:9010203626" style="color:#FFC107">9010203626</a>',
      quick: ['Vehicle NOC', 'School NOC', 'Petrol pump NOC']
    },

    /* ── EMERGENCY ── */
    {
      id: 'emergency',
      match: ['emergency','accident','help','sos','urgent','road accident','crash',
              'police emergency','ambulance','fire emergency','accident happened',
              'someone injured','need help','met with accident'],
      answer: '<strong>🚨 Emergency Contacts — Hyderabad</strong><br><br>🚔 <b>Police Emergency:</b> <a href="tel:100" style="color:#FFC107">100</a><br>🚑 <b>Ambulance:</b> <a href="tel:108" style="color:#FFC107">108</a><br>🔥 <b>Fire:</b> <a href="tel:101" style="color:#FFC107">101</a><br>👩 <b>Women Helpline:</b> <a href="tel:1091" style="color:#FFC107">1091</a><br>👶 <b>Child Helpline:</b> <a href="tel:1098" style="color:#FFC107">1098</a><br>🆘 <b>All Emergencies:</b> <a href="tel:112" style="color:#FFC107">112</a><br><br><b>Traffic Specific:</b><br>📞 Traffic Helpline: <a href="tel:9010203626" style="color:#FFC107">9010203626</a><br>☎️ E-Challan: <a href="tel:04027852721" style="color:#FFC107">040-27852721</a>',
      quick: ['Nearest traffic PS', 'Traffic helpline', 'Towing helpline']
    },

    /* ── HELPLINE ── */
    {
      id: 'helpline',
      match: ['helpline','contact number','phone number','traffic helpline','call traffic',
              'traffic number','helpline number','contact police','htp contact',
              'traffic police number','whatsapp'],
      answer: '<strong>📞 Hyderabad Traffic Police Helplines</strong><br><br>🟢 <b>Traffic Helpline:</b> <a href="tel:9010203626" style="color:#FFC107">9010203626</a><br>🔵 <b>E-Challan Queries:</b> <a href="tel:04027852721" style="color:#FFC107">040-27852721</a><br>🔴 <b>Police Emergency:</b> <a href="tel:100" style="color:#FFC107">100</a><br>🟡 <b>Ambulance:</b> <a href="tel:108" style="color:#FFC107">108</a><br>🟠 <b>Fire:</b> <a href="tel:101" style="color:#FFC107">101</a><br>🟣 <b>Women Helpline:</b> <a href="tel:1091" style="color:#FFC107">1091</a><br>🆘 <b>All Emergencies:</b> <a href="tel:112" style="color:#FFC107">112</a><br><br>💬 <b>WhatsApp:</b> <a href="https://wa.me/9010203626" target="_blank" style="color:#FFC107">9010203626</a>',
      quick: ['Pay challan', 'Wrong challan?', 'Nearest PS', 'Emergency numbers']
    },

    /* ── POLICE STATIONS — ALL ── */
    {
      id: 'ps_list',
      match: ['traffic police station','nearest ps','know your ps','police station list',
              'traffic ps','all police stations','ps contact','station details','which ps',
              'ps list','all ps','traffic stations','how many ps'],
      answer: '<strong>🏢 Hyderabad Traffic Police Stations (26 Total)</strong><br><br><b>DCP-I — Sri Avinash Kumar, IPS</b><br><u>Khairatabad Zone:</u> Panjagutta · Saifabad · Abids · Sultanbazar<br><u>Secunderabad Zone:</u> Kachiguda · OU City · Chikkadpally · Gandhinagar · Mahankali · Chilakalaguda<br><br><b>DCP-II — Ms. Kajal, IPS</b><br><u>Jubilee Hills Zone:</u> SR Nagar · Jubilee Hills · Banjara Hills<br><u>Golconda Zone:</u> Tolichowki · Asifnagar · Kulsumpura · Goshamahal<br><br><b>DCP-III — Sri Rahul Hegde B.K., IPS</b><br><u>Rajendra Nagar Zone:</u> Falaknuma · Rajendra Nagar<br><u>Charminar Zone:</u> Mirchowk · Charminar · Chatrinka<br><u>Chandrayangutta Zone:</u> Malakpet · Saidabad · Santosh Nagar · Chandrayangutta<br><u>Shamshabad Zone:</u> RGI Airport<br><br>📄 Full details: <a href="know_your_ps.html" style="color:#FFC107">Know Your PS page</a>',
      quick: ['DCP-I stations', 'DCP-II stations', 'DCP-III stations', 'Traffic helpline']
    },

    /* ── PS — DCP I ── */
    {
      id: 'ps_dcp1',
      match: ['dcp 1','dcp-1','dcp i','avinash kumar','khairatabad','secunderabad zone',
              'panjagutta ps','saifabad ps','abids ps','sultanbazar ps','kachiguda ps',
              'ou city ps','chikkadpally ps','gandhinagar ps','mahankali ps','chilakalaguda ps',
              'panjagutta','saifabad','sultanbazar','kachiguda','chikkadpally','chilakalaguda'],
      answer: '<strong>🏢 DCP Traffic – I | Sri Avinash Kumar, IPS</strong><br><br><b>Khairatabad Zone (4 Stations):</b><br>• <a href="know_your_ps/panjagutta" style="color:#FFC107">Panjagutta Traffic PS</a><br>• <a href="know_your_ps/saifabad" style="color:#FFC107">Saifabad Traffic PS</a><br>• <a href="know_your_ps/abids" style="color:#FFC107">Abids Traffic PS</a><br>• <a href="know_your_ps/sultan_bazar" style="color:#FFC107">Sultanbazar Traffic PS</a><br><br><b>Secunderabad Zone (6 Stations):</b><br>• <a href="know_your_ps/kachiguda" style="color:#FFC107">Kachiguda Traffic PS</a><br>• <a href="know_your_ps/ou" style="color:#FFC107">OU City Traffic PS</a><br>• <a href="know_your_ps/chikkadpally" style="color:#FFC107">Chikkadpally Traffic PS</a><br>• <a href="know_your_ps/ganthinagar" style="color:#FFC107">Gandhinagar Traffic PS</a><br>• <a href="know_your_ps/mahankali" style="color:#FFC107">Mahankali Traffic PS</a><br>• <a href="know_your_ps/chilakalaguda" style="color:#FFC107">Chilakalaguda Traffic PS</a>',
      quick: ['DCP-II stations', 'DCP-III stations', 'Traffic helpline']
    },

    /* ── PS — DCP II ── */
    {
      id: 'ps_dcp2',
      match: ['dcp 2','dcp-2','dcp ii','ms kajal','kajal maam','jubilee hills zone',
              'golconda zone','sr nagar ps','jubilee hills ps','banjara hills ps',
              'tolichowki ps','asifnagar ps','kulsumpura ps','goshamahal ps',
              'sr nagar','banjara hills','tolichowki','asifnagar','kulsumpura','goshamahal'],
      answer: '<strong>🏢 DCP Traffic – II | Ms. Kajal, IPS</strong><br><br><b>Jubilee Hills Zone (3 Stations):</b><br>• <a href="know_your_ps/s.r.nagar" style="color:#FFC107">SR Nagar Traffic PS</a><br>• <a href="know_your_ps/jubilee_hills" style="color:#FFC107">Jubilee Hills Traffic PS</a><br>• <a href="know_your_ps/banjara_hills" style="color:#FFC107">Banjara Hills Traffic PS</a><br><br><b>Golconda Zone (4 Stations):</b><br>• <a href="know_your_ps/tolichowki" style="color:#FFC107">Tolichowki Traffic PS</a><br>• <a href="know_your_ps/asif_nagar" style="color:#FFC107">Asifnagar Traffic PS</a><br>• <a href="know_your_ps/kulsumpura" style="color:#FFC107">Kulsumpura Traffic PS</a><br>• <a href="know_your_ps/goshamahal" style="color:#FFC107">Goshamahal Traffic PS</a>',
      quick: ['DCP-I stations', 'DCP-III stations', 'Traffic helpline']
    },

    /* ── PS — DCP III ── */
    {
      id: 'ps_dcp3',
      match: ['dcp 3','dcp-3','dcp iii','rahul hegde','rajendra nagar zone','charminar zone',
              'chandrayangutta zone','shamshabad zone','falaknuma ps','mirchowk ps',
              'charminar ps','chatrinka ps','malakpet ps','saidabad ps','santosh nagar ps',
              'chandrayangutta ps','rgi airport ps','airport ps','shamshabad ps',
              'falaknuma','mirchowk','malakpet','saidabad','chandrayangutta','rgi airport'],
      answer: '<strong>🏢 DCP Traffic – III | Sri Rahul Hegde B.K., IPS</strong><br><br><b>Rajendra Nagar Zone:</b><br>• <a href="know_your_ps/falaknuma" style="color:#FFC107">Falaknuma Traffic PS</a><br>• <a href="know_your_ps/rj_nagar" style="color:#FFC107">Rajendra Nagar Traffic PS</a><br><br><b>Charminar Zone:</b><br>• <a href="know_your_ps/mirchowk" style="color:#FFC107">Mirchowk Traffic PS</a><br>• <a href="know_your_ps/charminar" style="color:#FFC107">Charminar Traffic PS</a><br>• <a href="know_your_ps/chatrinka" style="color:#FFC107">Chatrinka Traffic PS</a><br><br><b>Chandrayangutta Zone:</b><br>• <a href="know_your_ps/malakpet" style="color:#FFC107">Malakpet Traffic PS</a><br>• <a href="know_your_ps/saidabad" style="color:#FFC107">Saidabad Traffic PS</a><br>• <a href="know_your_ps/santhosh_nagar" style="color:#FFC107">Santosh Nagar Traffic PS</a><br>• <a href="know_your_ps/chandrayangutta" style="color:#FFC107">Chandrayangutta Traffic PS</a><br><br><b>Shamshabad Zone:</b><br>• <a href="know_your_ps/rgi" style="color:#FFC107">RGI Airport Traffic PS</a>',
      quick: ['DCP-I stations', 'DCP-II stations', 'Traffic helpline']
    },

    /* ── HELMET ── */
    {
      id: 'helmet',
      match: ['helmet','helmet fine','no helmet','helmet rule','helmet law','helmet compulsory',
              'helmet penalty','without helmet','helmet charge','is helmet compulsory'],
      answer: '<strong>🏍️ Helmet Rules – Hyderabad</strong><br><br>Wearing a helmet is <b>compulsory</b> for rider AND pillion on two-wheelers under MV Act Section 129/177.<br><br><b>Fine for not wearing helmet:</b> ₹200/-<br><br>Helmet must be <b>ISI certified (BIS marked)</b> with chin strap fastened properly.<br><br>📖 More: <a href="road_rules.html" style="color:#FFC107">Road Rules page</a>',
      quick: ['Seat belt fine', 'Speed limit fine', 'Drunk driving fine', 'All traffic fines']
    },

    /* ── SEAT BELT ── */
    {
      id: 'seatbelt',
      match: ['seat belt','seatbelt','safety belt','seat belt fine','no seat belt',
              'without seatbelt','seat belt penalty','seatbelt rule'],
      answer: '<strong>🔒 Seat Belt Rules – Hyderabad</strong><br><br>Seat belts are <b>compulsory</b> for the driver and all passengers.<br><br><b>Fine for not wearing seat belt:</b> ₹1,000/- per person<br><br>📖 More: <a href="road_rules.html" style="color:#FFC107">Road Rules page</a>',
      quick: ['Helmet rules', 'Speed limit fine', 'Mobile phone fine', 'All traffic fines']
    },

    /* ── DRUNK DRIVING ── */
    {
      id: 'drunk_driving',
      match: ['drunk driving','drink and drive','drunken driving','alcohol driving',
              'drunk driving fine','breathalyser','breath test','dui','drink drive',
              'driving after drinking','alcohol limit driving'],
      answer: '<strong>🍺 Drunk Driving – Hyderabad</strong><br><br><b>Legal BAC limit:</b> 30 mg per 100 ml blood (0.03%)<br><br><b>Section M.V. Act 185 — Penalties:</b><br>• First offence: Court (imprisonment + heavy fine)<br>• Licence suspension<br>• Mandatory counselling<br><br>⚠️ No fixed fine — this goes directly to <b>Court</b> under MV Act 185.<br><br>📞 Report drunk driving: <a href="tel:9010203626" style="color:#FFC107">9010203626</a>',
      quick: ['Signal jumping fine', 'Speed limit fine', 'Traffic helpline']
    },

    /* ── MOBILE PHONE WHILE DRIVING ── */
    {
      id: 'mobile_driving',
      match: ['mobile phone driving','phone while driving','using phone driving',
              'mobile while driving','phone driving fine','distracted driving',
              'using mobile driving','phone fine','mobile fine driving'],
      answer: '<strong>📱 Mobile Phone While Driving</strong><br><br>Using a mobile phone while driving (without hands-free) is strictly prohibited under <b>MV Act 184(a)</b>.<br><br><b>Fine:</b> ₹1,000/-<br><br>📖 Full rules: <a href="road_rules.html" style="color:#FFC107">Road Rules page</a>',
      quick: ['Seat belt fine', 'Signal jumping fine', 'Speed limit fine']
    },

    /* ── SPEED LIMITS ── */
    {
      id: 'speed_limits',
      match: ['speed limit','speeding fine','speed','over speed','overspeed',
              'speed camera','speed gun','speed violation','speed penalty',
              'what is speed limit','speed limit hyderabad','overspeeding fine'],
      answer: '<strong>⚡ Speed Limits & Fines – Hyderabad</strong><br><br><b>City roads:</b> 50 km/h<br><b>Residential / School zones:</b> 30 km/h<br><b>ORR / Expressways:</b> 100 km/h (cars), 60 km/h (two-wheelers)<br><br><b>Overspeeding fine (MV Act 183/184):</b> ₹1,400/-<br><b>Dangerous driving at high speed:</b> ₹1,000/-<br><br>📖 Full rules: <a href="road_rules.html" style="color:#FFC107">Road Rules page</a>',
      quick: ['Signal jumping', 'Helmet fine', 'All traffic fines']
    },

    /* ── SIGNAL JUMPING ── */
    {
      id: 'signal_jumping',
      match: ['signal jump','red light','signal violation','jumping signal','red light fine',
              'traffic signal','jump signal','signal fine','jumping red light'],
      answer: '<strong>🚦 Signal Jumping – Hyderabad</strong><br><br><b>Fine under Sec 184 MV Act:</b><br>• Two/Three wheelers: ₹1,000/-<br>• Four/Six wheelers: ₹1,000/-<br><br><b>AI cameras</b> are installed at 60+ junctions in Hyderabad. Challans are sent directly to your registered mobile number.<br><br>📖 <a href="road_rules.html" style="color:#FFC107">Road Rules page</a>',
      quick: ['Speed limit fine', 'Helmet fine', 'Pay challan', 'All traffic fines']
    },

    /* ── WRONG SIDE / ONE WAY ── */
    {
      id: 'wrong_side',
      match: ['wrong side','one way violation','wrong direction','wrong side driving',
              'drive wrong side','one way fine','wrong side fine'],
      answer: '<strong>↩️ Wrong Side Driving</strong><br><br><b>Fine under MV Act 119/177:</b> ₹1,100/-<br><br><b>One Way / No Entry / U-Turn violations</b> under Sec 177 MV Act: ₹200/- each.<br><br>📖 Full list: <a href="road_rules.html" style="color:#FFC107">Road Rules page</a>',
      quick: ['Signal jumping', 'No entry fine', 'All traffic fines']
    },

    /* ── TRIPLE RIDING ── */
    {
      id: 'triple_riding',
      match: ['triple riding','three people bike','three on bike','triple seat',
              'three on two wheeler','triple riding fine'],
      answer: '<strong>🏍️ Triple Riding</strong><br><br>Triple riding on a motorcycle/bike is strictly prohibited.<br><br><b>Fine under MV Act 128/177, 184:</b> ₹1,200/-<br><br>📖 Full rules: <a href="road_rules.html" style="color:#FFC107">Road Rules page</a>',
      quick: ['Helmet fine', 'Signal jumping', 'All traffic fines']
    },

    /* ── NO LICENCE / DOCUMENTS ── */
    {
      id: 'no_documents',
      match: ['driving without licence','no licence','without license','driving without insurance',
              'no insurance','without rc','no rc','without puc','no puc','without registration',
              'no registration','documents fine','driving without documents'],
      answer: '<strong>📋 Driving Without Documents – Fines</strong><br><br>• <b>Without Driving Licence (MV Act 181):</b> ₹500/-<br>• <b>Without Registration (MV Act 192):</b> ₹2,000/-<br>• <b>Without Insurance (MV Act 196):</b> ₹1,000/-<br>• <b>Without PUC (Sec 190i):</b> ₹1,000/-<br><br>Always carry your DL, RC, Insurance and PUC while driving.<br><br>📖 Full list: <a href="road_rules.html" style="color:#FFC107">Road Rules page</a>',
      quick: ['Driving licence', 'Vehicle registration', 'All traffic fines']
    },

    /* ── ALL FINES ── */
    {
      id: 'all_fines',
      match: ['all fines','traffic fines list','all traffic fines','fine list',
              'all penalties','penalty list','mv act fines','fines hyderabad',
              'list of fines','what are the fines'],
      answer: '<strong>📋 Key Traffic Fines – Hyderabad</strong><br><br>• Signal Jumping: ₹1,000/-<br>• Overspeeding: ₹1,400/-<br>• No Helmet: ₹200/-<br>• No Seat Belt: ₹1,000/-<br>• Mobile While Driving: ₹1,000/-<br>• Wrong Side Driving: ₹1,100/-<br>• Triple Riding: ₹1,200/-<br>• No DL: ₹500/-<br>• No Registration: ₹2,000/-<br>• No Insurance: ₹1,000/-<br>• No PUC: ₹1,000/-<br>• No Entry Violation: ₹200/-<br>• Illegal Parking: ₹1,000/-<br>• Number Plate Offence: ₹200/-<br>• Drunk Driving: Court (MV Act 185)<br><br>📖 Complete list: <a href="road_rules.html" style="color:#FFC107">Road Rules page</a>',
      quick: ['Pay challan', 'Wrong challan?', 'Traffic helpline']
    },

    /* ── TOWING ── */
    {
      id: 'towing',
      match: ['tow','towed','towing','vehicle towed','car towed','crane','towing zone',
              'towed my vehicle','vehicle removed','impounded','crane charges',
              'towing charges','my car was towed','tow charges'],
      answer: '<strong>🚛 Vehicle Towing – Hyderabad</strong><br><br><b>Step 1:</b> Call Traffic Helpline <a href="tel:9010203626" style="color:#FFC107">9010203626</a> to find which yard your vehicle is at.<br><br><b>Step 2:</b> Visit the Traffic PS with: RC Book, valid DL, valid Insurance, ID proof.<br><br><b>Step 3:</b> Pay towing fine + challan to release.<br><br><b>Towing Charges (Sec 41(i) C.P. Act):</b><br>• Two-wheeler: ₹150/-<br>• Car / Jeep / Auto: ₹200/-<br>• Light Motor Vehicle: ₹300/-<br>• Heavy Motor Vehicle: ₹600/-',
      quick: ['Parking rules', 'Pay challan', 'Traffic helpline', 'Nearest traffic PS']
    },

    /* ── PARKING ── */
    {
      id: 'parking',
      match: ['parking','park my vehicle','parking zone','where to park','parking available',
              'paid parking','car parking hyderabad','parking fine','illegal parking',
              'no parking','parking rules'],
      answer: '<strong>🅿️ Parking – Hyderabad</strong><br><br><b>Parking Fines (MV Act 122/177):</b><br>• Parking posing risk to other vehicles: ₹200/-<br>• Illegal parking at No-Parking board: ₹1,000/-<br><br><b>Parking Zones:</b> Hyderabad has 130+ designated parking zones including Abids, Jubilee Bus Station, NTR Garden, Public Gardens, Salarjung Museum, Secunderabad Railway Station.<br><br>📄 Full list: <a href="parking_zones.html" style="color:#FFC107">Parking Zones page</a>',
      quick: ['Towing charges', 'No-parking fine', 'Traffic helpline']
    },

    /* ── WATER LOGGING ── */
    {
      id: 'water_logging',
      match: ['water logging','waterlogging','flood','flooded road','water on road',
              'water logging points','flooded area','road flooding','water logging hyderabad'],
      answer: '<strong>🌊 Water Logging Points – Hyderabad</strong><br><br>During monsoon, several roads in Hyderabad are prone to water logging.<br><br>📄 Check updated water logging points: <a href="water_logging.html" style="color:#FFC107">Water Logging Points page</a><br><br>📞 Traffic Helpline for updates: <a href="tel:9010203626" style="color:#FFC107">9010203626</a>',
      quick: ['Traffic helpline', 'Major corridors', 'Traffic congestion']
    },

    /* ── TRAFFIC CONGESTION / CORRIDORS ── */
    {
      id: 'traffic_congestion',
      match: ['traffic jam','congestion','traffic congestion','traffic update','traffic today',
              'which road to avoid','heavy traffic','major corridor','main roads',
              'corridors hyderabad','road congestion'],
      answer: '<strong>🚗 Traffic Congestion & Major Corridors</strong><br><br>📄 View real-time traffic congestion updates:<br><a href="tcongestion.html" style="color:#FFC107">Traffic Congestion page</a><br><br>📄 Major traffic corridors in Hyderabad:<br><a href="corridors.html" style="color:#FFC107">Major Corridors page</a><br><br>📞 Live updates: <a href="tel:9010203626" style="color:#FFC107">9010203626</a>',
      quick: ['Water logging points', 'Traffic helpline', 'Emergency numbers']
    },

    /* ── DRIVING LICENCE ── */
    {
      id: 'driving_licence',
      match: ['driving licence','driving license','dl','learner licence','ll','renew licence',
              'driving test','licence renewal','apply licence','new licence','get dl',
              'how to apply dl','dl renewal','learners licence'],
      answer: '<strong>🚗 Driving Licence</strong><br><br>All DL services are handled by <b>RTA (Regional Transport Authority)</b>.<br><br><b>Apply / Renew online:</b><br><a href="https://parivahan.gov.in/" target="_blank" style="color:#FFC107">parivahan.gov.in → Sarathi</a><br><br><b>Documents for New DL:</b><br>• Age proof (Aadhaar / Birth Certificate)<br>• Address proof<br>• Passport size photos<br>• Medical certificate (for transport licence)<br><br>📄 More info: <a href="driving_license.html" style="color:#FFC107">Driving License page</a>',
      quick: ['Vehicle registration', 'Driving without licence fine', 'RTA parivahan']
    },

    /* ── VEHICLE REGISTRATION ── */
    {
      id: 'vehicle_registration',
      match: ['vehicle registration','rc book','register vehicle','new vehicle registration',
              'registration certificate','rc renewal','vehicle rc','how to register vehicle',
              'rc transfer','vehicle transfer ownership'],
      answer: '<strong>🚙 Vehicle Registration</strong><br><br>All RC services are handled by <b>RTA</b>.<br><br><b>RC Renewal / Transfer:</b><br><a href="https://parivahan.gov.in/" target="_blank" style="color:#FFC107">parivahan.gov.in → Vahan</a><br><br><b>Documents needed:</b><br>• Invoice / Form 20<br>• Insurance Certificate<br>• PUC Certificate<br>• ID & Address proof<br><br>📄 More info: <a href="vehicle_registration.html" style="color:#FFC107">Vehicle Registration page</a>',
      quick: ['Driving licence', 'Vehicle NOC', 'No registration fine']
    },

    /* ── WHEEL CLAMPING ── */
    {
      id: 'wheel_clamping',
      match: ['wheel clamp','clamped','wheel clamping','tyre clamp','car clamped',
              'wheel lock','clamp removed','vehicle clamped'],
      answer: '<strong>🔒 Wheel Clamping – Hyderabad</strong><br><br>Wheel clamping is done for illegal parking and no-parking violations.<br><br><b>To get your vehicle released:</b><br>• Call Traffic Helpline: <a href="tel:9010203626" style="color:#FFC107">9010203626</a><br>• Pay the parking fine + clamping charges at the nearest Traffic PS<br><br>📄 More info: <a href="wheel.html" style="color:#FFC107">Wheel Clamping page</a>',
      quick: ['Towing charges', 'Parking fine', 'Nearest traffic PS']
    },

    /* ── MV ACT ── */
    {
      id: 'mv_act',
      match: ['mv act','motor vehicle act','mva','motor vehicles act','mv act rules',
              'mvdr','motor vehicle driving regulation','traffic law','traffic act'],
      answer: '<strong>⚖️ Motor Vehicles Act & Rules</strong><br><br>The Motor Vehicles Act 1988 governs all traffic laws in India.<br><br>📄 View MV Act & Rules: <a href="mvact.html" style="color:#FFC107">MV Act page</a><br>📄 MVDR-2017 Document: <a href="road_rules.html" style="color:#FFC107">Road Rules → MVDR 2017</a><br><br>📄 All MV Act fines & penalties: <a href="road_rules.html" style="color:#FFC107">Road Rules page</a>',
      quick: ['All traffic fines', 'Road rules', 'Traffic helpline']
    },

    /* ── ROAD SIGNS ── */
    {
      id: 'road_signs',
      match: ['road signs','traffic signs','traffic signals','road signal','sign board',
              'traffic sign meaning','mandatory signs','warning signs','informatory signs',
              'what does sign mean','road marking'],
      answer: '<strong>🚸 Road Signs – Hyderabad</strong><br><br>Road signs are classified into 3 types:<br><br>🔴 <b>Mandatory / Regulatory Signs</b> — Circular shape. Must be obeyed (Stop, No Entry, Speed Limit, etc.)<br><br>⚠️ <b>Cautionary / Warning Signs</b> — Triangular shape. Warn about road hazards ahead.<br><br>🔵 <b>Informatory Signs</b> — Rectangular shape. Provide directions, destinations & facilities.<br><br>📄 View all signs with images: <a href="road_rules.html" style="color:#FFC107">Road Rules page</a>',
      quick: ['MV Act fines', 'Number plate rules', 'Road sense']
    },

    /* ── NUMBER PLATE ── */
    {
      id: 'number_plate',
      match: ['number plate','registration plate','fancy number plate','number plate rules',
              'number plate fine','irregular number plate','number plate format',
              'vehicle number plate','number plate regulation'],
      answer: '<strong>🔢 Number Plate Rules – Hyderabad</strong><br><br>• No names, pictures, or artwork besides the registration mark<br>• <b>Fancy lettering is NOT permitted</b><br>• Must follow standard format (e.g. TG 07 AB 1234)<br><br><b>Fine for irregular number plate:</b> ₹200/- (Sec 80(a) MV Act)<br><br>📄 Full formats: <a href="road_rules.html" style="color:#FFC107">Road Rules → Number Plate section</a>',
      quick: ['All traffic fines', 'MV Act rules', 'Road rules']
    },

    /* ── ROAD SENSE ── */
    {
      id: 'road_sense',
      match: ['road sense','road smart','road safety tips','safe driving tips','driving tips',
              'road safety','safe driving','road sense page','roadsense'],
      answer: '<strong>🛣️ Road Sense & Road Smart</strong><br><br>Hyderabad Traffic Police provides essential road safety information for all citizens.<br><br>📄 <a href="road_sense.html" style="color:#FFC107">Road Sense</a> — Essential rules and must-know information<br>📄 <a href="road_smart.html" style="color:#FFC107">Road Smart</a> — Smart driving practices and city-specific tips<br><br>Stay informed, stay safe! 🟢',
      quick: ['Road rules & fines', 'Arrive Alive Campaign', 'Traffic helpline']
    },

    /* ── ARRIVE ALIVE ── */
    {
      id: 'arrive_alive',
      match: ['arrive alive','arrivealive','arrive alive campaign','road safety campaign',
              'campaign','road safety initiative','htp campaign'],
      answer: '<strong>🟢 Arrive Alive Campaign</strong><br><br>HTP\'s flagship road safety initiative to make Hyderabad\'s roads safer.<br><br>✅ Always wear a helmet (ISI certified)<br>✅ Buckle your seat belt<br>✅ Never drink and drive<br>✅ No mobile phone while driving<br>✅ Follow speed limits<br>✅ Obey traffic signals<br><br>📄 <a href="arrivealive.html" style="color:#FFC107">Arrive Alive Campaign page</a>',
      quick: ['Road rules', 'Helmet rules', 'Traffic helpline', 'Road sense']
    },

    /* ── GALLERY ── */
    {
      id: 'gallery',
      match: ['gallery','photo gallery','photos','images','htp photos','event photos',
              'road safety photos','campaign photos','htp gallery'],
      answer: '<strong>🖼️ HTP Gallery</strong><br><br>Browse photos and videos from road safety events, campaigns, and traffic police activities.<br><br>📄 <a href="gallery.html" style="color:#FFC107">View Photo Gallery</a>',
      quick: ['Road Safety Campaigns', 'Arrive Alive', 'About HTP']
    },

    /* ── T20 TEST / TRAFFIC TEST ── */
    {
      id: 't20_test',
      match: ['t20 test','traffic test','online test','traffic knowledge test',
              'traffic exam','test traffic rules','t20 traffic test','online traffic test'],
      answer: '<strong>📝 T20 Traffic Knowledge Test</strong><br><br>Test your knowledge of traffic rules and regulations online!<br><br>🔗 <a href="https://echallan.tspolice.gov.in/TGTrafficTest/jsp/LoginView.jsp" target="_blank" style="color:#FFC107">Take the Online Test</a><br><br>This test covers road rules, signs, traffic signals and MV Act provisions.',
      quick: ['Road rules', 'Road signs', 'Traffic fines list']
    },

    /* ── RTI ── */
    {
      id: 'rti',
      match: ['rti','right to information','information act','rti application','file rti',
              'how to file rti','rti form','rti online','apply rti'],
      answer: '<strong>📋 Right to Information (RTI)</strong><br><br><b>Apply Online:</b> <a href="https://rtionline.gov.in/" target="_blank" style="color:#FFC107">rtionline.gov.in</a><br><b>By post / In person:</b> Traffic Police Headquarters, Hyderabad<br><br><b>Application Fee:</b> ₹10/- (waived for BPL applicants)<br><b>Response time:</b> 30 days<br><br>📄 More info: <a href="rti.html" style="color:#FFC107">RTI page</a>',
      quick: ['Contact Traffic Police', 'Traffic helpline', 'Feedback']
    },

    /* ── STATISTICS ── */
    {
      id: 'statistics',
      match: ['statistics','accident statistics','traffic statistics','road accident data',
              'hyderabad accident stats','road accident numbers','accident data'],
      answer: '<strong>📊 Traffic Statistics – Hyderabad</strong><br><br>View road accident data, traffic statistics and safety metrics for Hyderabad.<br><br>📄 <a href="statistics.html" style="color:#FFC107">Statistics page</a>',
      quick: ['Road safety campaigns', 'Arrive Alive', 'Traffic helpline']
    },

    /* ── INTRODUCTION / ABOUT ── */
    {
      id: 'about_htp',
      match: ['about htp','about hyderabad traffic police','introduction','htp introduction',
              'organisation','org chart','dcp','commissioner traffic','traffic police structure',
              'who is dcp','htp about'],
      answer: '<strong>🏛️ About Hyderabad Traffic Police</strong><br><br>HTP is dedicated to safer roads, better traffic management and citizen-friendly digital services.<br><br><b>3 DCP Zones | 8 Sub-Zones | 26 Police Stations | 24/7 Active Service</b><br><br>• DCP-I: Sri Avinash Kumar, IPS<br>• DCP-II: Ms. Kajal, IPS<br>• DCP-III: Sri Rahul Hegde B.K., IPS<br><br>📄 <a href="introduction.html" style="color:#FFC107">Introduction page</a><br>📄 <a href="org_chart.html" style="color:#FFC107">Organisation Chart</a>',
      quick: ['Know Your PS', 'Traffic helpline', 'Contact us']
    },

    /* ── FEEDBACK ── */
    {
      id: 'feedback',
      match: ['feedback','complaint','complain','grievance','report issue','report problem',
              'report officer','suggestion','bribe','corruption','give feedback',
              'submit feedback','register complaint'],
      answer: '<strong>💬 Feedback & Complaints</strong><br><br><b>Online Feedback Form:</b><br><a href="https://docs.google.com/forms/d/e/1FAIpQLSdIr2t94wVePyi562lUbeOyavRPi6vNgLadZl-lPrj53PDTYw/viewform" target="_blank" style="color:#FFC107">Click here → Submit Feedback</a><br><br>📞 <b>Traffic Helpline:</b> <a href="tel:9010203626" style="color:#FFC107">9010203626</a><br>💬 <b>WhatsApp:</b> <a href="https://wa.me/9010203626" target="_blank" style="color:#FFC107">9010203626</a><br>📱 <b>Social:</b> @HYDTP on Facebook, Twitter & Instagram',
      quick: ['Traffic helpline', 'Wrong challan?', 'Contact us', 'Nearest PS']
    },

    /* ── CONTACT ── */
    {
      id: 'contact',
      match: ['contact','contact us','address','htp address','traffic police address',
              'hyderabad traffic police office','headquarters','htp hq','office address'],
      answer: '<strong>📍 Hyderabad Traffic Police – Contact</strong><br><br>📞 <b>Traffic Helpline:</b> <a href="tel:9010203626" style="color:#FFC107">9010203626</a><br>☎️ <b>E-Challan:</b> <a href="tel:04027852721" style="color:#FFC107">040-27852721</a><br>💬 <b>WhatsApp:</b> <a href="https://wa.me/9010203626" target="_blank" style="color:#FFC107">9010203626</a><br>📝 <b>Feedback Form:</b> <a href="https://docs.google.com/forms/d/e/1FAIpQLSdIr2t94wVePyi562lUbeOyavRPi6vNgLadZl-lPrj53PDTYw/viewform" target="_blank" style="color:#FFC107">Click here</a><br><br>🌐 <a href="https://hyderabadpolice.gov.in/" target="_blank" style="color:#FFC107">hyderabadpolice.gov.in</a><br><br>📄 <a href="contact_us.html" style="color:#FFC107">Contact Us page</a>',
      quick: ['Traffic helpline', 'Feedback', 'Nearest PS', 'Emergency numbers']
    },

    /* ── TRAFFIC MARSHAL ── */
    {
      id: 'traffic_marshal',
      match: ['traffic marshal','marshal','traffic volunteer','traffic warden',
              'become traffic marshal','join traffic marshal','traffic marshal hyderabad'],
      answer: '<strong>🦺 Traffic Marshal Program</strong><br><br>Traffic Marshals are citizen volunteers who assist the traffic police at busy junctions.<br><br>📄 More info: <a href="trafficmarshall.html" style="color:#FFC107">Traffic Marshal page</a><br>📞 Contact: <a href="tel:9010203626" style="color:#FFC107">9010203626</a>',
      quick: ['Traffic Training Centre', 'Arrive Alive', 'Contact us']
    },

    /* ── TRAINING CENTRE ── */
    {
      id: 'training_centre',
      match: ['training centre','tti','traffic training','traffic training institute',
              'training institute','traffic school','training center'],
      answer: '<strong>🏫 Traffic Training Centre (TTI)</strong><br><br>The Traffic Training Institute provides driver training and road safety education.<br><br>📄 More info: <a href="tti.html" style="color:#FFC107">Traffic Training Centre page</a><br>📞 Contact: <a href="tel:9010203626" style="color:#FFC107">9010203626</a>',
      quick: ['Driving licence', 'Traffic Marshal', 'Road rules']
    }

  ];

  /* ═══════════════════════════════════════════════════════════
     3. MATCHING ENGINE
  ══════════════════════════════════════════════════════════════ */
  function findMatch(input) {
    var text = input.toLowerCase().trim();
    var best = null, bestScore = 0;
    for (var i = 0; i < KB.length; i++) {
      var entry = KB[i], score = 0;
      for (var j = 0; j < entry.match.length; j++) {
        var kw = entry.match[j];
        if (text === kw) { score = 100; break; }
        else if (text.indexOf(kw) !== -1) { score = Math.max(score, kw.length * 3); }
        else if (kw.indexOf(text) !== -1 && text.length > 3) { score = Math.max(score, text.length * 2); }
        else {
          var kWords = kw.split(' ');
          for (var k = 0; k < kWords.length; k++) {
            if (kWords[k].length > 3 && text.indexOf(kWords[k]) !== -1) {
              score = Math.max(score, kWords[k].length);
            }
          }
        }
      }
      if (score > bestScore) { bestScore = score; best = entry; }
    }
    return bestScore >= 4 ? best : null;
  }

  var FALLBACK = {
    answer: 'I\'m not sure about that. Here\'s how to get help directly:<br><br>📞 <b>Traffic Helpline:</b> <a href="tel:9010203626" style="color:#FFC107">9010203626</a><br>☎️ <b>E-Challan:</b> <a href="tel:04027852721" style="color:#FFC107">040-27852721</a><br>💬 <b>WhatsApp:</b> <a href="https://wa.me/9010203626" target="_blank" style="color:#FFC107">9010203626</a><br><br>Or try asking about: <b>challan, NOC, parking, towing, police station, road rules, fines, or emergency.</b>',
    quick: ['Pay challan', 'Traffic helpline', 'All traffic fines', 'Nearest PS']
  };

  /* ═══════════════════════════════════════════════════════════
     4. CHAT ENGINE
  ══════════════════════════════════════════════════════════════ */
  var isTyping = false, typingEl = null;

  function getBody() { return document.getElementById('chatbotBody'); }

  function escapeHtml(str) {
    return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  function scrollBottom() {
    var b = getBody();
    if (b) setTimeout(function(){ b.scrollTop = b.scrollHeight; }, 50);
  }

  function addUserMessage(text) {
    var body = getBody(); if (!body) return;
    var d = document.createElement('div');
    d.className = 'chat-msg user';
    d.innerHTML = '<div class="chat-bubble">' + escapeHtml(text) + '</div>';
    body.appendChild(d);
    scrollBottom();
  }

  function addBotMessage(html, quickReplies) {
    var body = getBody(); if (!body) return;
    var d = document.createElement('div');
    d.className = 'chat-msg bot';
    d.style.cssText = 'display:flex;gap:8px;align-items:flex-end;justify-content:flex-start';

    var av = document.createElement('div');
    av.className = 'chat-mini-avatar';
    av.textContent = '🤖';

    var wrap = document.createElement('div');
    wrap.style.cssText = 'max-width:calc(78% + 34px)';

    var bubble = document.createElement('div');
    bubble.className = 'chat-bubble';
    bubble.style.cssText = 'background:#fff;color:#343a40;border-bottom-left-radius:4px;box-shadow:0 2px 8px rgba(0,0,0,.08);max-width:100%';
    bubble.innerHTML = html;
    wrap.appendChild(bubble);

    if (quickReplies && quickReplies.length) {
      var qr = document.createElement('div');
      qr.style.cssText = 'display:flex;flex-wrap:wrap;gap:6px;margin-top:8px';
      quickReplies.forEach(function(label) {
        var btn = document.createElement('button');
        btn.style.cssText = 'background:#fff;border:1.5px solid #dee2e6;border-radius:20px;padding:5px 11px;font-size:.76rem;color:#0B3C5D;font-weight:600;cursor:pointer;font-family:inherit;transition:.2s';
        btn.textContent = label;
        btn.addEventListener('mouseenter', function(){ this.style.borderColor='#0B3C5D'; this.style.background='#EDF5FF'; });
        btn.addEventListener('mouseleave', function(){ this.style.borderColor='#dee2e6'; this.style.background='#fff'; });
        btn.addEventListener('click', function(){ handleQuickReply(label); });
        qr.appendChild(btn);
      });
      wrap.appendChild(qr);
    }

    d.appendChild(av);
    d.appendChild(wrap);
    body.appendChild(d);
    scrollBottom();
  }

  function showTyping() {
    isTyping = true;
    var body = getBody(); if (!body) return;
    typingEl = document.createElement('div');
    typingEl.className = 'chat-msg bot';
    typingEl.style.cssText = 'display:flex;gap:8px;align-items:flex-end';
    typingEl.innerHTML =
      '<div style="width:26px;height:26px;border-radius:50%;background:#FFC107;display:flex;align-items:center;justify-content:center;font-size:12px;flex-shrink:0">🤖</div>' +
      '<div style="background:#fff;padding:10px 14px;border-radius:16px;border-bottom-left-radius:4px;box-shadow:0 2px 8px rgba(0,0,0,.08);display:flex;gap:5px;align-items:center">' +
      '<span style="width:7px;height:7px;border-radius:50%;background:#adb5bd;animation:htpBounce 1.2s infinite;display:inline-block"></span>' +
      '<span style="width:7px;height:7px;border-radius:50%;background:#adb5bd;animation:htpBounce 1.2s infinite .2s;display:inline-block"></span>' +
      '<span style="width:7px;height:7px;border-radius:50%;background:#adb5bd;animation:htpBounce 1.2s infinite .4s;display:inline-block"></span>' +
      '</div>';
    body.appendChild(typingEl);
    scrollBottom();
  }

  function removeTyping() {
    isTyping = false;
    if (typingEl && typingEl.parentNode) typingEl.parentNode.removeChild(typingEl);
    typingEl = null;
  }

  function handleSend() {
    var input = document.getElementById('chatbotInput');
    if (!input) return;
    var text = input.value.trim();
    if (!text || isTyping) return;
    input.value = '';
    addUserMessage(text);
    showTyping();
    setTimeout(function() {
      removeTyping();
      var match = findMatch(text);
      addBotMessage(match ? match.answer : FALLBACK.answer, match ? (match.quick || []) : FALLBACK.quick);
    }, 600 + Math.random() * 400);
  }

  function handleQuickReply(text) {
    addUserMessage(text);
    showTyping();
    setTimeout(function() {
      removeTyping();
      var match = findMatch(text);
      addBotMessage(match ? match.answer : FALLBACK.answer, match ? (match.quick || []) : FALLBACK.quick);
    }, 400 + Math.random() * 300);
  }

  /* ═══════════════════════════════════════════════════════════
     5. BUILD CHATBOT WINDOW
  ══════════════════════════════════════════════════════════════ */
  function buildChatbotWindow() {
    var win = document.getElementById('chatbotWindow');
    if (!win) return;

    win.innerHTML = [
      '<div class="chatbot-header">',
        '<div class="chatbot-avatar">🤖</div>',
        '<div class="chatbot-header-info">',
          '<h6>HTP Assistant</h6>',
          '<small>Hyderabad Traffic Police · Online</small>',
        '</div>',
        '<button class="chatbot-close" id="chatbotCloseBtn" aria-label="Close chatbot">',
          '<i class="fa fa-times"></i>',
        '</button>',
      '</div>',
      '<div class="chatbot-body" id="chatbotBody"></div>',
      '<div class="chatbot-footer">',
        '<div class="chatbot-input-row">',
          '<input type="text" id="chatbotInput" placeholder="Ask about challans, NOC, fines…" autocomplete="off">',
          '<button class="chatbot-send" id="chatbotSendBtn" aria-label="Send">',
            '<i class="fa fa-paper-plane"></i>',
          '</button>',
        '</div>',
      '</div>'
    ].join('');

    var closeBtn = document.getElementById('chatbotCloseBtn');
    if (closeBtn) closeBtn.addEventListener('click', function() { toggleChatbot(); });

    var input = document.getElementById('chatbotInput');
    var sendBtn = document.getElementById('chatbotSendBtn');
    if (input) input.addEventListener('keydown', function(e) { if (e.key === 'Enter') handleSend(); });
    if (sendBtn) sendBtn.addEventListener('click', function() { handleSend(); });

    addBotMessage(
      '👋 <strong>Namaste! I\'m the HTP Assistant.</strong><br><br>' +
      'I can help you with challans, NOC, police stations, road rules, fines, parking, towing and more.<br><br>' +
      'What can I help you with?',
      ['Pay challan', 'Emergency numbers', 'All traffic fines', 'Nearest PS', 'Road rules']
    );
  }

  /* ═══════════════════════════════════════════════════════════
     6. INIT
  ══════════════════════════════════════════════════════════════ */
  var built = false;

  window.toggleChatbot = function() {
    var win = document.getElementById('chatbotWindow');
    if (!win) return;
    var opening = !win.classList.contains('open');
    win.classList.toggle('open');
    if (opening && !built) {
      built = true;
      buildChatbotWindow();
    }
    if (opening) {
      setTimeout(function() {
        var inp = document.getElementById('chatbotInput');
        if (inp) inp.focus();
      }, 280);
    }
  };

  function onReady() {
    injectWindowCSS();
    var toggle   = document.getElementById('chatbotToggle');
    var win      = document.getElementById('chatbotWindow');
    var scrollBtn = document.getElementById('scrollTopBtn');

    [toggle, win, scrollBtn].forEach(function(el) {
      if (el && el.parentNode !== document.body) {
        document.body.appendChild(el);
      }
    });

    if (toggle) {
      toggle.onclick = function() { toggleChatbot(); };
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', onReady);
  } else {
    onReady();
  }

})();