/**
 * ═══════════════════════════════════════════════════════════════
 *  HTP CHATBOT  —  htp-chatbot.js
 *  Hyderabad Traffic Police · Rule-Based Assistant
 *  Pure JavaScript · Zero external calls · NIC/NIA audit-safe
 *  Drop this script into every page. Works standalone.
 * ═══════════════════════════════════════════════════════════════
 */

(function () {
  'use strict';

  /* ═══════════════════════════════════════════════════════════
     1. KNOWLEDGE BASE
     All answers sourced from the 62 HTP website pages.
     Keys = topic labels. Each entry has:
       match   – array of keyword/phrase triggers (lowercase)
       answer  – HTML string shown in chat bubble
       quick   – optional array of follow-up quick-reply labels
  ══════════════════════════════════════════════════════════════ */
  var KB = [

    /* ── E-CHALLAN ─────────────────────────────────────────── */
    {
      id: 'challan_pay',
      match: ['pay challan','payment','pay fine','pay my challan','echallan payment',
              'online challan','pay traffic fine','how to pay'],
      answer: `<strong>💳 Paying Your E-Challan</strong><br><br>
        You can pay your traffic challan in two ways:<br><br>
        <b>1. Online (Easiest)</b><br>
        Visit <a href="https://echallan.tspolice.gov.in/publicview/" target="_blank" style="color:#FFC107">echallan.tspolice.gov.in</a>
        → Enter vehicle number or challan number → Pay via UPI / Net Banking / Card.<br><br>
        <b>2. Phone</b><br>
        Call E-Challan helpline: <a href="tel:04027852721" style="color:#FFC107">040-27852721</a><br><br>
        <b>3. In Person</b><br>
        Visit any Traffic Police Station with your challan number.`,
      quick: ['Check challan status', 'Wrong challan?', 'Challan helpline']
    },

    {
      id: 'challan_status',
      match: ['challan status','check challan','pending challan','view challan',
              'find my challan','challan details','vehicle challan'],
      answer: `<strong>🔍 Check Challan Status</strong><br><br>
        Go to <a href="https://echallan.tspolice.gov.in/publicview/" target="_blank" style="color:#FFC107">echallan.tspolice.gov.in</a>
        and enter your <b>vehicle number</b> or <b>challan number</b> to see all pending challans and their status.<br><br>
        You can also call <a href="tel:04027852721" style="color:#FFC107">040-27852721</a> for challan-related queries.`,
      quick: ['Pay challan', 'Wrong challan?']
    },

    {
      id: 'challan_wrong',
      match: ['wrong challan','incorrect challan','challan mistake','dispute challan',
              'challan issued wrongly','challan error','false challan','got a wrong'],
      answer: `<strong>⚠️ Got a Wrong Challan?</strong><br><br>
        If you believe a challan was issued incorrectly:<br><br>
        <b>Step 1:</b> Visit the <b>Traffic Police Station</b> that issued the challan with your vehicle documents.<br><br>
        <b>Step 2:</b> Fill the challan dispute form at the station.<br><br>
        <b>Step 3:</b> The SHO will review and forward to the DCP for adjudication.<br><br>
        <b>Alternatively:</b> Visit <a href="wrong_challan.html" style="color:#FFC107">our Wrong Challan page</a> for more guidance.<br><br>
        📞 Helpline: <a href="tel:9010203626" style="color:#FFC107">9010203626</a>`,
      quick: ['Pay challan', 'Challan helpline', 'Contact traffic PS']
    },

    /* ── NOC ────────────────────────────────────────────────── */
    {
      id: 'noc_vehicle',
      match: ['noc','no objection certificate','vehicle noc','transfer vehicle',
              'sell vehicle','transfer noc','vehicle transfer','noc for vehicle'],
      answer: `<strong>📄 Vehicle NOC (No Objection Certificate)</strong><br><br>
        Required when transferring a vehicle to another state.<br><br>
        <b>Documents needed:</b><br>
        • Original RC Book<br>
        • Valid Insurance Certificate<br>
        • PUC Certificate<br>
        • Tax clearance<br>
        • ID proof of owner<br>
        • No pending challans<br><br>
        <b>Apply at:</b> Your nearest Traffic Police Station or online at
        <a href="https://parivahan.gov.in/" target="_blank" style="color:#FFC107">parivahan.gov.in</a><br><br>
        📞 Helpline: <a href="tel:9010203626" style="color:#FFC107">9010203626</a>`,
      quick: ['School NOC', 'Petrol pump NOC', 'Nearest traffic PS']
    },

    {
      id: 'noc_school',
      match: ['school noc','school vehicle','school bus noc','school transport noc',
              'school permit','school van noc'],
      answer: `<strong>🏫 School Vehicle NOC</strong><br><br>
        Documents required for School NOC:<br><br>
        • Fire NOC<br>
        • GHMC Sanitary Certificate<br>
        • Lease Document / Sale Deed<br>
        • Parking Photos<br>
        • Self-Affidavit from School Principal<br>
        • Building Stability Certificate<br>
        • GHMC Ground Permission (if no playground)<br><br>
        <b>Apply at:</b> Your nearest Traffic Police Station.<br>
        📞 Helpline: <a href="tel:9010203626" style="color:#FFC107">9010203626</a>`,
      quick: ['Vehicle NOC', 'Petrol pump NOC']
    },

    {
      id: 'noc_petrol',
      match: ['petrol pump noc','fuel station noc','petrol bunk noc','filling station noc'],
      answer: `<strong>⛽ Petrol Pump NOC</strong><br><br>
        To obtain Traffic Police NOC for a petrol pump / fuel station, visit your nearest Traffic Police Station with:<br><br>
        • Site layout plan<br>
        • PCRA / Petroleum licensing documents<br>
        • Municipal permission<br>
        • Property ownership documents<br><br>
        📞 Helpline: <a href="tel:9010203626" style="color:#FFC107">9010203626</a>`,
      quick: ['Vehicle NOC', 'School NOC']
    },

    /* ── DRIVING LICENCE ────────────────────────────────────── */
    {
      id: 'driving_licence',
      match: ['driving licence','driving license','dl','learner licence','ll','renew licence',
              'driving test','licence renewal','apply licence','new licence'],
      answer: `<strong>🚗 Driving Licence</strong><br><br>
        All driving licence services are handled by <b>RTA (Road Transport Authority)</b>.<br><br>
        <b>Apply / Renew online:</b><br>
        <a href="https://parivahan.gov.in/" target="_blank" style="color:#FFC107">parivahan.gov.in → Sarathi</a><br><br>
        <b>Documents for new DL:</b><br>
        • Age proof (10th certificate / Aadhaar)<br>
        • Address proof<br>
        • Passport size photos<br>
        • Medical certificate (for Transport licence)<br><br>
        <b>For Learner's Licence:</b> Apply online, appear for online test.<br>
        <b>Permanent DL:</b> Issued after 30 days driving practice + driving test.`,
      quick: ['Vehicle registration', 'Traffic fines', 'Nearest RTA']
    },

    /* ── VEHICLE REGISTRATION ───────────────────────────────── */
    {
      id: 'vehicle_registration',
      match: ['vehicle registration','rc book','register vehicle','new vehicle registration',
              'registration certificate','rc renewal','vehicle rc'],
      answer: `<strong>🚙 Vehicle Registration</strong><br><br>
        Vehicle registration is done through <b>RTA (Road Transport Authority)</b>.<br><br>
        <b>For new vehicles:</b> Your dealer typically handles registration.<br><br>
        <b>RC Renewal / Transfer:</b> Visit <a href="https://parivahan.gov.in/" target="_blank" style="color:#FFC107">parivahan.gov.in → Vahan</a><br><br>
        <b>Documents needed:</b><br>
        • Invoice / Form 20<br>
        • Insurance certificate<br>
        • PUC certificate<br>
        • ID & Address proof<br>
        • Chassis & Engine number imprint<br><br>
        📞 RTA Helpline: 1800-425-5699`,
      quick: ['Driving licence', 'Vehicle NOC', 'VAHAN portal']
    },

    /* ── POLICE STATIONS ────────────────────────────────────── */
    {
      id: 'ps_list',
      match: ['traffic police station','nearest ps','know your ps','police station list',
              'traffic ps','all police stations','ps contact','station details','which ps'],
      answer: `<strong>🏢 Hyderabad Traffic Police Stations</strong><br><br>
        We have <b>24+ Traffic Police Stations</b> across Hyderabad. Key ones:<br><br>
        <b>Zone I (Khairtabad)</b><br>
        • Panjagutta · Abids · Sultan Bazar · Saifabad · Nampally · Mirchowk<br><br>
        <b>Zone II (Secunderabad)</b><br>
        • Trimulgherry · Begumpet · Mahankali · Chikkadpally · Kachiguda · O.U. City<br><br>
        <b>Zone III (South)</b><br>
        • Goshamahal · Kulsumpura · Asifnagar · Charminar · Malakpet<br><br>
        <b>Zone IV (West)</b><br>
        • Banjara Hills · SR Nagar · Jubilee Hills · Tolichowki<br><br>
        For full details: <a href="../know_your_ps.html" style="color:#FFC107">Know Your Traffic PS</a>`,
      quick: ['Panjagutta PS', 'Sultan Bazar PS', 'SR Nagar PS', 'Traffic helpline']
    },

    {
      id: 'ps_panjagutta',
      match: ['panjagutta','panjagutta ps','panjagutta police','panjagutta station','panjagutta traffic'],
      answer: `<strong>🏢 Panjagutta Traffic Police Station</strong><br><br>
        <b>SHO:</b> Sri. P.V Ram Prasada Rao<br>
        📱 <a href="tel:8712660636" style="color:#FFC107">8712660636</a><br>
        ☎️ <a href="tel:04027852491" style="color:#FFC107">040-27852491</a><br>
        📧 shotrpspanjagutta@gmail.com<br><br>
        <b>ACP:</b> Sri. S. Mohan Kumar · <a href="tel:8712660614" style="color:#FFC107">8712660614</a><br>
        <b>Zone:</b> Khairtabad · North Zone<br><br>
        <b>Area covers:</b> Panjagutta junction, NIMS, Ameerpet, Greenlands, Srinagar Colony, Raj Bhavan`,
      quick: ['Sultan Bazar PS', 'SR Nagar PS', 'All police stations']
    },

    {
      id: 'ps_sultanbazar',
      match: ['sultan bazar','sultanbazar','sultan bazar ps','sultan bazar traffic','sultan bazar police'],
      answer: `<strong>🏢 Sultan Bazar Traffic Police Station</strong><br><br>
        <b>SHO:</b> Sri. S. A. Emmanuel<br>
        📱 <a href="tel:8712660644" style="color:#FFC107">8712660644</a><br>
        ☎️ <a href="tel:04027854767" style="color:#FFC107">040-27854767</a><br>
        📧 sho-sbzrtrf-hyd@tspolice.gov.in<br><br>
        <b>ACP:</b> Sri. S. Mohan Kumar · <a href="tel:8712660614" style="color:#FFC107">8712660614</a><br>
        <b>Zone:</b> Khairtabad<br><br>
        <b>Area covers:</b> Sultan Bazar, Bank Street, Koti, Afzalgunj, Narayanguda, Himayathnagar`,
      quick: ['Panjagutta PS', 'SR Nagar PS', 'All police stations']
    },

    {
      id: 'ps_srnagar',
      match: ['sr nagar','srnagar','sr nagar ps','sr nagar traffic','sanjeeva reddy','s.r nagar'],
      answer: `<strong>🏢 SR Nagar Traffic Police Station</strong><br><br>
        <b>SHO:</b> Sri. K. Mahesh<br>
        📱 <a href="tel:8712660637" style="color:#FFC107">8712660637</a><br>
        ☎️ <a href="tel:8712667599" style="color:#FFC107">8712667599</a><br>
        📧 sho-srntrf-hyd@tspolice.gov.in<br><br>
        <b>ACP:</b> Sri. K. Hari Prasad · <a href="tel:8712660615" style="color:#FFC107">8712660615</a><br>
        <b>Zone:</b> Jubilee Hills<br><br>
        <b>Area covers:</b> SR Nagar, ESI, Eragadda, Balkampet, Borabanda, Mothi Nagar`,
      quick: ['Panjagutta PS', 'Kulsumpura PS', 'All police stations']
    },

    {
      id: 'ps_kulsumpura',
      match: ['kulsumpura','kulsumpura ps','kulsumpura police','kulsumpura traffic'],
      answer: `<strong>🏢 Kulsumpura Traffic Police Station</strong><br><br>
        <b>SHO:</b> Sri. M. Rajendra Prasad<br>
        📱 <a href="tel:8712660754" style="color:#FFC107">8712660754</a><br>
        ☎️ <a href="tel:04027854022" style="color:#FFC107">040-27854022</a><br>
        📧 trafficpskulsumpura@gmail.com<br><br>
        <b>ACP:</b> Smt. D. Dhana Laxmi · <a href="tel:8712660616" style="color:#FFC107">8712660616</a><br>
        <b>Zone:</b> Golconda<br><br>
        <b>Area covers:</b> Gudimalkapur, Jiyaguda, Bapughat, Langer House, Rethibowli`,
      quick: ['SR Nagar PS', 'All police stations']
    },

    {
      id: 'ps_ou',
      match: ['ou city','ou traffic','osmania university ps','ou ps','ou sity','o.u. city'],
      answer: `<strong>🏢 O.U. City Traffic Police Station</strong><br><br>
        <b>SHO:</b> Sri. K. Satya Narayana<br>
        📱 <a href="tel:8712660647" style="color:#FFC107">8712660647</a><br>
        ☎️ <a href="tel:04027853810" style="color:#FFC107">040-27853810</a><br>
        📧 sho-outrf-hyd@tspolice.gov.in<br><br>
        <b>ACP:</b> Sri. A. Srinivas · <a href="tel:8712660617" style="color:#FFC107">8712660617</a><br>
        <b>Zone:</b> Secunderabad<br><br>
        <b>Area covers:</b> OU Campus, EFLU, NIN, Fever Hospital, Habsiguda, Tarnaka`,
      quick: ['All police stations', 'Traffic helpline']
    },

    /* ── EMERGENCY / HELPLINE ───────────────────────────────── */
    {
      id: 'emergency',
      match: ['emergency','accident','help','sos','urgent','road accident','crash',
              '100','police emergency','ambulance'],
      answer: `<strong>🚨 Emergency Contacts</strong><br><br>
        🚔 <b>Police Emergency:</b> <a href="tel:100" style="color:#FFC107">100</a><br>
        🚑 <b>Ambulance:</b> <a href="tel:108" style="color:#FFC107">108</a><br>
        🆘 <b>Emergency (All):</b> <a href="tel:112" style="color:#FFC107">112</a><br><br>
        <b>Traffic Specific:</b><br>
        📞 Traffic Helpline: <a href="tel:9010203626" style="color:#FFC107">9010203626</a><br>
        ☎️ E-Challan: <a href="tel:04027852721" style="color:#FFC107">040-27852721</a><br><br>
        <i>In case of accident: Call 100 immediately. Move vehicles to the side if safe. Help injured persons reach 108.</i>`,
      quick: ['Towing helpline', 'Traffic helpline', 'Nearest traffic PS']
    },

    {
      id: 'helpline',
      match: ['helpline','contact number','phone number','traffic helpline','call traffic',
              'traffic number','9010203626','helpline number'],
      answer: `<strong>📞 Hyderabad Traffic Police Helplines</strong><br><br>
        🟢 <b>Traffic Helpline:</b> <a href="tel:9010203626" style="color:#FFC107">9010203626</a><br>
        🔵 <b>E-Challan Queries:</b> <a href="tel:04027852721" style="color:#FFC107">040-27852721</a><br>
        🔴 <b>Police Emergency:</b> <a href="tel:100" style="color:#FFC107">100</a><br>
        🟡 <b>Ambulance:</b> <a href="tel:108" style="color:#FFC107">108</a><br>
        🆘 <b>All Emergencies:</b> <a href="tel:112" style="color:#FFC107">112</a><br><br>
        <b>WhatsApp:</b> <a href="https://wa.me/9010203626" target="_blank" style="color:#FFC107">wa.me/9010203626</a><br><br>
        <b>Social Media:</b><br>
        Facebook/Twitter/Instagram: <b>@HYDTP</b>`,
      quick: ['Pay challan', 'Wrong challan?', 'Nearest PS']
    },

    /* ── TOWING ─────────────────────────────────────────────── */
    {
      id: 'towing',
      match: ['tow','towed','towing','vehicle towed','car towed','crane','towing zone',
              'towed my vehicle','vehicle removed','impounded'],
      answer: `<strong>🚛 Vehicle Towing</strong><br><br>
        If your vehicle has been towed:<br><br>
        <b>Step 1:</b> Call Traffic Helpline <a href="tel:9010203626" style="color:#FFC107">9010203626</a> to find out which yard your vehicle is at.<br><br>
        <b>Step 2:</b> Visit the Traffic Police Station for that area with:<br>
        • RC Book (original)<br>
        • Valid DL<br>
        • Valid Insurance<br>
        • ID proof<br><br>
        <b>Step 3:</b> Pay the towing fine + challan to release the vehicle.<br><br>
        <b>Common Towing Zones:</b> Ameerpet, NIMS, Peddamma Temple, Maitrivanam, Apollo Hospital, near all major junctions.`,
      quick: ['Towing zones list', 'Pay challan', 'Traffic helpline']
    },

    {
      id: 'towing_zones',
      match: ['towing zone list','towing areas','towing location','where is towing','tow away zone',
              'no parking towing','towing zone ameerpet','towing zone koti'],
      answer: `<strong>🚫 Major Towing Zones in Hyderabad</strong><br><br>
        Common no-parking / towing zones include:<br><br>
        <b>Ameerpet, NIMS, Panjagutta, ICICI Bank Mehdipatnam, Peddamma Temple, Apollo Hospital, Maitrivanam, KFC Tolichowki, Charminar, Necklace Rotary, Secunderabad Railway Station, Jubilee Hills Roads 36/39/45/51/70/78/92, SR Nagar, Windsor Plaza, Yashoda Hospital Malakpet</b> and 170+ more locations.<br><br>
        Full list: <a href="../road_smart.html" style="color:#FFC107">Road Smart → Towing Zones</a><br><br>
        📞 If towed: <a href="tel:9010203626" style="color:#FFC107">9010203626</a>`,
      quick: ['My vehicle was towed', 'Parking zones', 'Road Smart page']
    },

    /* ── PARKING ────────────────────────────────────────────── */
    {
      id: 'parking',
      match: ['parking','park my vehicle','parking zone','where to park','parking available',
              'paid parking','mch parking','car parking hyderabad'],
      answer: `<strong>🅿️ Parking Zones in Hyderabad</strong><br><br>
        Hyderabad has 130+ designated parking zones. Key ones:<br><br>
        • Abids GPO MCH Parking Complex<br>
        • Jubilee Bus Station<br>
        • NTR Garden<br>
        • Public Gardens<br>
        • Salarjung Museum area<br>
        • Secunderabad Railway Station (front)<br>
        • ESI Hospital (both sides)<br>
        • High Court Road (MCH Paid)<br>
        • IMAX Theatre<br>
        • Feroz Gandhi Park (MCH Paid)<br><br>
        Full list: <a href="../road_smart.html" style="color:#FFC107">Road Smart → Parking Zones</a>`,
      quick: ['Towing zones', 'No-parking areas', 'Road Smart page']
    },

    /* ── ROAD RULES / FINES ─────────────────────────────────── */
    {
      id: 'helmet',
      match: ['helmet','helmet fine','no helmet','helmet rule','helmet law','helmet compulsory'],
      answer: `<strong>🏍️ Helmet Rules – Hyderabad</strong><br><br>
        <b>Wearing a helmet is compulsory</b> for rider AND pillion on two-wheelers in Hyderabad.<br><br>
        <b>Fine for no helmet:</b> ₹1,000 (first offence) under Motor Vehicles Act 2019.<br><br>
        Helmet must be:<br>
        • ISI certified (BIS marked)<br>
        • Properly fastened with chin strap<br><br>
        <b>Points:</b> 3 community service points may be assigned in addition to fine.<br><br>
        📖 More: <a href="../road_rules.html" style="color:#FFC107">Road Rules page</a>`,
      quick: ['Seat belt fine', 'Speed limits', 'Drunk driving fine']
    },

    {
      id: 'seatbelt',
      match: ['seat belt','seatbelt','safety belt','seat belt fine','no seat belt'],
      answer: `<strong>🔒 Seat Belt Rules – Hyderabad</strong><br><br>
        <b>Seat belts are compulsory</b> for driver and all passengers (front and rear).<br><br>
        <b>Fine for not wearing seat belt:</b> ₹1,000 per person not wearing it.<br><br>
        <b>Why it matters:</b> Seat belts reduce death risk in crashes by over 45%.<br><br>
        📖 More: <a href="../road_rules.html" style="color:#FFC107">Road Rules page</a>`,
      quick: ['Helmet rules', 'Speed limits', 'Phone while driving fine']
    },

    {
      id: 'drunk_driving',
      match: ['drunk driving','drink and drive','drunken driving','alcohol driving',
              'drunk driving fine','breathalyser','breath test','dui'],
      answer: `<strong>🍺 Drunk Driving – Hyderabad</strong><br><br>
        <b>Zero tolerance policy</b> for drunk driving in Hyderabad.<br><br>
        <b>Legal limit:</b> 30 mg of alcohol per 100 ml of blood (BAC 0.03%)<br><br>
        <b>Penalties:</b><br>
        • First offence: ₹10,000 fine + up to 6 months imprisonment<br>
        • Second offence: ₹15,000 + 2 years imprisonment<br>
        • Licence suspension + mandatory counselling<br><br>
        <b>Breath-analyser checks</b> are conducted every Friday and Saturday night across the city.<br><br>
        📞 Report drunk driving: <a href="tel:9010203626" style="color:#FFC107">9010203626</a>`,
      quick: ['Helmet fine', 'Speed limits', 'Traffic helpline']
    },

    {
      id: 'mobile_driving',
      match: ['mobile phone driving','phone while driving','using phone driving',
              'mobile while driving','phone driving fine','distracted driving'],
      answer: `<strong>📱 Mobile Phone While Driving – Hyderabad</strong><br><br>
        Using a mobile phone while driving (without hands-free) is <b>strictly prohibited</b>.<br><br>
        <b>Fine:</b> ₹1,000 (first offence), ₹10,000 (repeat offence)<br><br>
        Plain-clothes officers and surveillance cameras actively monitor arterial roads.<br><br>
        📖 More: <a href="../road_rules.html" style="color:#FFC107">Road Rules page</a>`,
      quick: ['Seat belt fine', 'Signal jumping fine', 'Speed limits']
    },

    {
      id: 'speed_limits',
      match: ['speed limit','speeding fine','speed','over speed','overspeed',
              'speed camera','speed gun','speed violation'],
      answer: `<strong>⚡ Speed Limits – Hyderabad (G.O. No. 27)</strong><br><br>
        <b>City roads (general):</b> 50 km/h<br>
        <b>Residential / School zones:</b> 30 km/h<br>
        <b>Expressways / ORR:</b> 100 km/h (cars), 60 km/h (two-wheelers)<br><br>
        <b>Speeding fine:</b> ₹500–₹2,000 depending on excess speed<br><br>
        <b>Speed cameras</b> are operational on the Outer Ring Road and major corridors.<br><br>
        📖 Full details: <a href="../road_smart.html" style="color:#FFC107">Road Smart → Speed Limits</a>`,
      quick: ['Drunk driving', 'Signal jumping', 'Traffic fines list']
    },

    {
      id: 'signal_jumping',
      match: ['signal jump','red light','signal violation','jumping signal','red light fine',
              'traffic signal','jump signal'],
      answer: `<strong>🚦 Signal Jumping – Hyderabad</strong><br><br>
        Jumping a red light is one of the top causes of road accidents in Hyderabad.<br><br>
        <b>Fine:</b> ₹1,000–₹5,000 + 3 demerit points<br><br>
        <b>AI cameras</b> are installed at 60+ junctions to capture violations automatically. Challans are sent directly to registered mobile numbers.<br><br>
        <b>No-right-turn junctions:</b> 35+ locations including Ameerpet, Panjagutta, V.V. Statue, Greenlands. Full list on Road Smart page.<br><br>
        📖 <a href="../road_smart.html" style="color:#FFC107">Road Smart page</a>`,
      quick: ['Speed limits', 'Helmet fine', 'Pay challan']
    },

    {
      id: 'triple_riding',
      match: ['triple riding','three on bike','three people bike','triple seat',
              'pillion rules','two pillion'],
      answer: `<strong>🏍️ Triple Riding – Rules</strong><br><br>
        <b>Triple riding (3 persons on a two-wheeler) is illegal</b> in Hyderabad.<br><br>
        <b>Fine:</b> ₹1,000 + possibility of licence suspension.<br><br>
        Only driver + 1 pillion allowed on motorcycles/scooters.<br><br>
        📖 More: <a href="../road_rules.html" style="color:#FFC107">Road Rules page</a>`,
      quick: ['Helmet rules', 'Seat belt rules']
    },

    /* ── ROAD INFORMATION ───────────────────────────────────── */
    {
      id: 'flyovers',
      match: ['flyover','flyovers hyderabad','overbridge','fly over','panjagutta flyover',
              'shekpet flyover','list of flyovers'],
      answer: `<strong>🌉 Flyovers in Hyderabad</strong><br><br>
        Hyderabad has <b>20 existing flyovers</b>. Key ones:<br><br>
        | Flyover | Length |<br>
        Shekpet – 2.7 KM · Panjagutta – 2.0 KM · Amberpet – 1.5 KM<br>
        Greenlands – 1.1 KM · Telugu Talli – 1.1 KM · YMCA – 1.0 KM<br>
        Masabtank – 0.9 KM · Begumpet – 0.9 KM<br><br>
        <b>Under Construction:</b><br>
        • Mehdipatnam–Aramghar Expressway (11.5 KM)<br>
        • Langer House (0.76 KM)<br>
        • Bowenpally–Suchitra (1.5 KM)<br><br>
        📖 Full list: <a href="../road_smart.html" style="color:#FFC107">Road Smart → Flyovers</a>`,
      quick: ['Accident prone areas', 'Road Smart page']
    },

    {
      id: 'accident_areas',
      match: ['accident prone','accident zone','black spot','dangerous road','accident area',
              'accident location','road accident spot'],
      answer: `<strong>⚠️ Accident Prone Areas – Hyderabad</strong><br><br>
        Key accident-prone stretches:<br><br>
        • Tankbund Road (middle section, near Sailing Club)<br>
        • Panjagutta–Ameerpet stretch (V.V. Statue, NIMS, ESI)<br>
        • Necklace Road (Rotary to P.V. Memorial)<br>
        • R.P. Road (Patny X Roads to Bata X Roads)<br>
        • Tarnaka to Habsiguda<br>
        • Mehdipatnam to Attapur (Moghal Ka Nala)<br>
        • Jubilee Hills Road No. 36/10<br><br>
        📖 Full list: <a href="../road_smart.html" style="color:#FFC107">Road Smart → Accident Prone Areas</a><br><br>
        ⚠️ Extra caution advised in these zones.`,
      quick: ['Road rules', 'Emergency contacts', 'Road Smart page']
    },

    {
      id: 'waterlogging',
      match: ['waterlogging','water logging','flooded road','road flood','water on road',
              'rain road','monsoon road','water stagnation'],
      answer: `<strong>🌧️ Waterlogging / Flooded Roads</strong><br><br>
        During heavy rains, several Hyderabad roads are prone to waterlogging. Key areas:<br><br>
        • Khairatabad Railway Gate<br>
        • Lakdikapool Junction<br>
        • Liberty X Roads<br>
        • RTC X Roads (opp. Saptagiri Theatre)<br>
        • Panjagutta Junction area<br>
        • RP Road (under Bansilalpet Railway Bridge)<br>
        • Mehdipatnam to Attapur route<br><br>
        📖 Full list: <a href="../road_smart.html" style="color:#FFC107">Road Smart page</a><br><br>
        📞 Report flooded roads: <a href="tel:9010203626" style="color:#FFC107">9010203626</a>`,
      quick: ['Emergency contacts', 'Accident prone areas']
    },

    /* ── CAMPAIGNS ──────────────────────────────────────────── */
    {
      id: 'campaigns',
      match: ['campaign','road safety campaign','arrive alive','helmet campaign',
              'awareness drive','safety programme','road safety'],
      answer: `<strong>📢 Road Safety Campaigns – HTP</strong><br><br>
        Hyderabad Traffic Police runs <b>year-round campaigns</b>:<br><br>
        🏍️ <b>Helmet Compulsory Drive</b> – Spot checks at key junctions<br>
        🍺 <b>Anti-Drunk Driving</b> – Every Fri/Sat night breathalyser checks<br>
        🚗 <b>Seat Belt Drive</b> – Arterial roads & expressways<br>
        📱 <b>No Mobile While Driving</b> – Plain-clothes + cameras<br>
        🎓 <b>Road Safety Education</b> – Schools, colleges, corporates<br>
        🚦 <b>Signal Jumping Enforcement</b> – AI cameras at 60+ junctions<br><br>
        <b>500+</b> drives/year · <b>2 lakh+</b> citizens reached<br><br>
        📖 <a href="../campaigns.html" style="color:#FFC107">View all campaigns</a>`,
      quick: ['Arrive Alive campaign', 'Road rules', 'Helmet rules']
    },

    {
      id: 'arrive_alive',
      match: ['arrive alive','arrivealive','arrive alive campaign'],
      answer: `<strong>🟢 Arrive Alive Campaign</strong><br><br>
        The <b>Arrive Alive Campaign</b> is Hyderabad Traffic Police's flagship road safety initiative.<br><br>
        <b>Key messages:</b><br>
        ✅ Always wear a helmet<br>
        ✅ Buckle your seat belt<br>
        ✅ Don't drink and drive<br>
        ✅ No phone while driving<br>
        ✅ Obey speed limits<br>
        ✅ Follow traffic signals<br><br>
        <i>"Your life matters more than a few saved minutes."</i><br><br>
        📖 <a href="../campaigns.html" style="color:#FFC107">Campaign details</a> | <a href="../arriveAlive.html" style="color:#FFC107">Arrive Alive page</a>`,
      quick: ['Road rules', 'Helmet rules', 'Traffic helpline']
    },

    /* ── RTI ────────────────────────────────────────────────── */
    {
      id: 'rti',
      match: ['rti','right to information','information act','rti application',
              'rti hyderabad traffic','file rti'],
      answer: `<strong>📋 Right to Information (RTI)</strong><br><br>
        You can file an RTI application with Hyderabad Traffic Police for information under the <b>RTI Act 2005</b>.<br><br>
        <b>How to apply:</b><br>
        • Online: <a href="https://rtionline.gov.in/" target="_blank" style="color:#FFC107">rtionline.gov.in</a><br>
        • By post: Addressed to the Public Information Officer, Hyderabad Traffic Police HQ<br>
        • In person: Traffic Police Headquarters<br><br>
        <b>Fee:</b> ₹10 (waived for BPL applicants)<br>
        <b>Response time:</b> 30 days<br><br>
        📖 <a href="../rti.html" style="color:#FFC107">RTI page</a>`,
      quick: ['Contact Traffic Police', 'Traffic helpline']
    },

    /* ── VAHAN / SARATHI / PARIVAHAN ─────────────────────────── */
    {
      id: 'parivahan',
      match: ['vahan','sarathi','parivahan','rta','road transport','vehicle details',
              'check vehicle owner','vehicle information','mobile number update rta'],
      answer: `<strong>🚘 VAHAN / SARATHI / Parivahan Services</strong><br><br>
        <b>VAHAN</b> – Vehicle registration, RC, ownership details<br>
        <b>SARATHI</b> – Driving licence services, learner's licence<br><br>
        Visit: <a href="https://parivahan.gov.in/" target="_blank" style="color:#FFC107">parivahan.gov.in</a><br><br>
        <b>Update mobile number in RTA database:</b><br>
        Scan the VAHAN or SARATHI QR code at the top of our website, or visit parivahan.gov.in directly.<br><br>
        📞 RTA Helpline: 1800-425-5699`,
      quick: ['Driving licence', 'Vehicle registration', 'Vehicle NOC']
    },

    /* ── T20 TEST ───────────────────────────────────────────── */
    {
      id: 't20_test',
      match: ['t20 test','traffic test','online test','traffic knowledge test',
              'road rules test','t20 traffic test'],
      answer: `<strong>📝 T20 Traffic Knowledge Test</strong><br><br>
        Hyderabad Traffic Police offers an <b>online T20 Traffic Rules Test</b> to educate citizens on road rules.<br><br>
        <b>Take the test:</b><br>
        <a href="https://echallan.tspolice.gov.in/TGTrafficTest/jsp/LoginView.jsp" target="_blank" style="color:#FFC107">TG Traffic Test Portal</a><br><br>
        Test covers: traffic signs, signal rules, right of way, speed limits, and general road safety.<br><br>
        Certificate awarded on successful completion!`,
      quick: ['Road rules', 'Traffic signs', 'Campaigns']
    },

    /* ── FEEDBACK ───────────────────────────────────────────── */
    {
      id: 'feedback',
      match: ['feedback','complaint','complain','grievance','report issue','report problem',
              'report officer','corruption','bribe','suggestion'],
      answer: `<strong>💬 Feedback / Complaints</strong><br><br>
        <b>For general feedback:</b><br>
        <a href="https://docs.google.com/forms/d/e/1FAIpQLSdIr2t94wVePyi562lUbeOyavRPi6vNgLadZl-lPrj53PDTYw/viewform" target="_blank" style="color:#FFC107">Click here → Feedback Form</a><br><br>
        <b>For E-Challan feedback:</b><br>
        <a href="https://echallan.tspolice.gov.in/Feedback/feedback.jsp" target="_blank" style="color:#FFC107">E-Challan Feedback Portal</a><br><br>
        <b>Traffic Helpline:</b> <a href="tel:9010203626" style="color:#FFC107">9010203626</a><br><br>
        <b>Social Media:</b> @HYDTP on Facebook, Twitter, Instagram – we actively respond to DMs.`,
      quick: ['Traffic helpline', 'Wrong challan?', 'Contact us']
    },

    /* ── CONTACT / ABOUT ────────────────────────────────────── */
    {
      id: 'contact',
      match: ['contact','contact us','address','htp address','traffic police address',
              'hyderabad traffic police office','headquarters','htp hq'],
      answer: `<strong>📍 Hyderabad Traffic Police – Contact</strong><br><br>
        <b>Traffic Helpline:</b> <a href="tel:9010203626" style="color:#FFC107">9010203626</a><br>
        <b>E-Challan:</b> <a href="tel:04027852721" style="color:#FFC107">040-27852721</a><br>
        <b>WhatsApp:</b> <a href="https://wa.me/9010203626" target="_blank" style="color:#FFC107">9010203626</a><br><br>
        <b>Social Media:</b><br>
        📘 Facebook: <a href="https://www.facebook.com/HYDTP" target="_blank" style="color:#FFC107">@HYDTP</a><br>
        🐦 Twitter: <a href="https://twitter.com/HYDTP" target="_blank" style="color:#FFC107">@HYDTP</a><br>
        📸 Instagram: @hyderabadtrafficpolice<br>
        ▶️ YouTube: @hyderabadtrafficpoliceshik6556<br><br>
        🌐 Official: <a href="https://hyderabadpolice.gov.in/" target="_blank" style="color:#FFC107">hyderabadpolice.gov.in</a>`,
      quick: ['Traffic helpline', 'Feedback', 'Nearest PS']
    },

    /* ── GALLERY / CAMPAIGNS PHOTOS ─────────────────────────── */
    {
      id: 'gallery',
      match: ['gallery','photos','pictures','images','photo gallery','campaign photos',
              'enforcement photos','event photos'],
      answer: `<strong>🖼️ Photo Gallery</strong><br><br>
        Our gallery features photos from:<br><br>
        📢 Traffic Enforcement drives<br>
        🚦 Arrive Alive campaign<br>
        🏛️ Nampally Exhibition<br>
        🎓 Vasavi College awareness event<br>
        🏍️ Bike Launch<br><br>
        <a href="../gallery.html" style="color:#FFC107">→ View Photo Gallery</a>`,
      quick: ['Campaigns', 'Road Safety drives']
    },

    /* ── GREETINGS / FALLBACK ───────────────────────────────── */
    {
      id: 'greeting',
      match: ['hi','hello','namaste','hii','hey','good morning','good afternoon',
              'good evening','vanakam','namaskar'],
      answer: `👋 <strong>Namaste! Welcome to HTP Assistant.</strong><br><br>
        I'm here to help you with:<br>
        • 💳 E-Challan payment & status<br>
        • 📄 NOC (Vehicle / School / Petrol Pump)<br>
        • 🏢 Traffic Police Station contacts<br>
        • 📞 Emergency & helpline numbers<br>
        • 🚗 Road rules & traffic fines<br>
        • 🅿️ Parking & towing zones<br><br>
        What can I help you with today?`,
      quick: ['Pay challan', 'Find nearest PS', 'Emergency numbers', 'Road rules']
    },

    {
      id: 'thanks',
      match: ['thank you','thanks','thank u','thx','dhanyavaad','shukriya','ok thanks'],
      answer: `😊 You're welcome! Stay safe on the roads.<br><br>
        Remember: <b>Arrive Alive</b> — wear your helmet, buckle up, and never drink and drive.<br><br>
        Is there anything else I can help you with?`,
      quick: ['Pay challan', 'Traffic helpline', 'Road rules']
    }

  ];

  /* ═══════════════════════════════════════════════════════════
     2. MATCH ENGINE
     Scores each KB entry against user input.
     Returns best match or null.
  ══════════════════════════════════════════════════════════════ */
  function findMatch(input) {
    var text = input.toLowerCase().trim();
    var best = null;
    var bestScore = 0;

    for (var i = 0; i < KB.length; i++) {
      var entry = KB[i];
      var score = 0;

      for (var j = 0; j < entry.match.length; j++) {
        var keyword = entry.match[j];
        if (text === keyword) {
          score = 100; // exact
          break;
        } else if (text.indexOf(keyword) !== -1) {
          score = Math.max(score, keyword.length * 3); // longer keyword = stronger signal
        } else if (keyword.indexOf(text) !== -1 && text.length > 3) {
          score = Math.max(score, text.length * 2);
        } else {
          // word overlap
          var kWords = keyword.split(' ');
          var tWords = text.split(' ');
          for (var k = 0; k < kWords.length; k++) {
            if (kWords[k].length > 3 && text.indexOf(kWords[k]) !== -1) {
              score = Math.max(score, kWords[k].length);
            }
          }
        }
      }

      if (score > bestScore) {
        bestScore = score;
        best = entry;
      }
    }

    return bestScore >= 4 ? best : null;
  }

  /* Fallback answer when nothing matches */
  var FALLBACK = {
    answer: `I'm not sure about that specific query. Here's how to get the right help:<br><br>
      📞 <b>Traffic Helpline:</b> <a href="tel:9010203626" style="color:#FFC107">9010203626</a><br>
      ☎️ <b>E-Challan:</b> <a href="tel:04027852721" style="color:#FFC107">040-27852721</a><br>
      🌐 <b>Website:</b> <a href="../contact_us.html" style="color:#FFC107">Contact Us page</a><br><br>
      Or try asking about: <b>challan, NOC, parking, towing, police station, road rules, or emergency contacts.</b>`,
    quick: ['Pay challan', 'Traffic helpline', 'Nearest PS', 'Road rules']
  };

  /* ═══════════════════════════════════════════════════════════
     3. CHAT ENGINE
     Manages state, renders messages, handles input.
  ══════════════════════════════════════════════════════════════ */
  var conversation = [];
  var isTyping = false;

  function init() {
    var body = document.getElementById('chatbotBody');
    if (!body) return;

    // Clear existing content and rebuild
    body.innerHTML = '';
    addBotMessage(
      '👋 <strong>Namaste! I\'m the HTP Assistant.</strong><br><br>' +
      'I can help you with challans, NOC, police station contacts, road rules, fines, parking, and more.<br><br>' +
      'What can I help you with?',
      ['Pay challan', 'Find nearest PS', 'Emergency numbers', 'Road rules', 'NOC']
    );

    // Wire up input
    var input = document.getElementById('chatbotInput') || document.querySelector('.chatbot-input-row input');
    var sendBtn = document.getElementById('chatbotSendBtn') || document.querySelector('.chatbot-send');

    if (input) {
      input.disabled = false;
      input.placeholder = 'Ask about challans, NOC, fines…';
      input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && !isTyping) handleSend();
      });
    }
    if (sendBtn) {
      sendBtn.disabled = false;
      sendBtn.style.opacity = '1';
      sendBtn.style.cursor = 'pointer';
      sendBtn.addEventListener('click', function () {
        if (!isTyping) handleSend();
      });
    }
  }

  function handleSend() {
    var input = document.getElementById('chatbotInput') || document.querySelector('.chatbot-input-row input');
    if (!input) return;
    var text = input.value.trim();
    if (!text) return;
    input.value = '';
    addUserMessage(text);
    showTyping();
    setTimeout(function () {
      removeTyping();
      var match = findMatch(text);
      if (match) {
        addBotMessage(match.answer, match.quick || []);
      } else {
        addBotMessage(FALLBACK.answer, FALLBACK.quick);
      }
    }, 700 + Math.random() * 400);
  }

  function handleQuickReply(text) {
    addUserMessage(text);
    showTyping();
    setTimeout(function () {
      removeTyping();
      var match = findMatch(text);
      if (match) {
        addBotMessage(match.answer, match.quick || []);
      } else {
        addBotMessage(FALLBACK.answer, FALLBACK.quick);
      }
    }, 500 + Math.random() * 300);
  }

  /* ── DOM helpers ── */
  function getBody() { return document.getElementById('chatbotBody'); }

  function addUserMessage(text) {
    var body = getBody();
    if (!body) return;
    var div = document.createElement('div');
    div.className = 'chat-msg user';
    div.innerHTML = '<div class="chat-bubble" style="background:var(--navy,#0B3C5D);color:#fff;border-bottom-right-radius:4px;max-width:78%;padding:10px 14px;border-radius:16px;font-size:.83rem;line-height:1.5">' + escapeHtml(text) + '</div>';
    body.appendChild(div);
    scrollBottom();
  }

  function addBotMessage(html, quickReplies) {
    var body = getBody();
    if (!body) return;

    var div = document.createElement('div');
    div.className = 'chat-msg bot';
    div.style.cssText = 'display:flex;gap:8px;align-items:flex-end;justify-content:flex-start';

    var av = document.createElement('div');
    av.className = 'chat-mini-avatar';
    av.style.cssText = 'width:26px;height:26px;border-radius:50%;background:var(--gold,#FFC107);display:flex;align-items:center;justify-content:center;font-size:12px;flex-shrink:0';
    av.textContent = '🤖';

    var wrap = document.createElement('div');

    var bubble = document.createElement('div');
    bubble.className = 'chat-bubble';
    bubble.style.cssText = 'background:#fff;color:#343a40;border-bottom-left-radius:4px;max-width:78%;padding:10px 14px;border-radius:16px;font-size:.83rem;line-height:1.6;box-shadow:0 2px 8px rgba(0,0,0,.08)';
    bubble.innerHTML = html;
    wrap.appendChild(bubble);

    // Quick replies
    if (quickReplies && quickReplies.length > 0) {
      var qr = document.createElement('div');
      qr.style.cssText = 'display:flex;flex-wrap:wrap;gap:6px;margin-top:8px';
      quickReplies.forEach(function (label) {
        var btn = document.createElement('button');
        btn.style.cssText = 'background:#fff;border:1.5px solid #dee2e6;border-radius:20px;padding:5px 11px;font-size:.76rem;color:#0B3C5D;font-weight:600;cursor:pointer;transition:.2s;font-family:inherit';
        btn.textContent = label;
        btn.addEventListener('mouseenter', function () { this.style.borderColor = '#0B3C5D'; this.style.background = '#EDF5FF'; });
        btn.addEventListener('mouseleave', function () { this.style.borderColor = '#dee2e6'; this.style.background = '#fff'; });
        btn.addEventListener('click', function () { handleQuickReply(label); });
        qr.appendChild(btn);
      });
      wrap.appendChild(qr);
    }

    div.appendChild(av);
    div.appendChild(wrap);
    body.appendChild(div);
    scrollBottom();
  }

  var typingEl = null;
  function showTyping() {
    isTyping = true;
    var body = getBody();
    if (!body) return;
    typingEl = document.createElement('div');
    typingEl.id = 'htp-typing';
    typingEl.className = 'chat-msg bot';
    typingEl.style.cssText = 'display:flex;gap:8px;align-items:flex-end';
    typingEl.innerHTML =
      '<div style="width:26px;height:26px;border-radius:50%;background:#FFC107;display:flex;align-items:center;justify-content:center;font-size:12px;flex-shrink:0">🤖</div>' +
      '<div style="background:#fff;padding:10px 14px;border-radius:16px;border-bottom-left-radius:4px;box-shadow:0 2px 8px rgba(0,0,0,.08);display:flex;gap:4px;align-items:center">' +
      '<span style="width:7px;height:7px;border-radius:50%;background:#6c757d;animation:htpBounce 1.2s infinite;display:block"></span>' +
      '<span style="width:7px;height:7px;border-radius:50%;background:#6c757d;animation:htpBounce 1.2s infinite .2s;display:block"></span>' +
      '<span style="width:7px;height:7px;border-radius:50%;background:#6c757d;animation:htpBounce 1.2s infinite .4s;display:block"></span>' +
      '</div>';
    body.appendChild(typingEl);
    scrollBottom();
  }

  function removeTyping() {
    isTyping = false;
    if (typingEl && typingEl.parentNode) typingEl.parentNode.removeChild(typingEl);
    typingEl = null;
  }

  function scrollBottom() {
    var body = getBody();
    if (body) body.scrollTop = body.scrollHeight;
  }

  function escapeHtml(str) {
    return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  /* ── CSS keyframes injection ── */
  function injectStyles() {
    if (document.getElementById('htp-chatbot-styles')) return;
    var style = document.createElement('style');
    style.id = 'htp-chatbot-styles';
    style.textContent =
      '@keyframes htpBounce{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-6px)}}';
    document.head.appendChild(style);
  }

  /* ── Toggle ── */
  window.toggleChatbot = function () {
    var win = document.getElementById('chatbotWindow');
    if (!win) return;
    var opening = !win.classList.contains('open');
    win.classList.toggle('open');
    if (opening && getBody() && getBody().children.length === 0) {
      init();
    }
  };

  /* ── Auto-init if window already open ── */
  document.addEventListener('DOMContentLoaded', function () {
    injectStyles();

    // Remove "coming soon" notice if present
    var comingSoon = document.querySelector('.chatbot-coming-soon');
    if (comingSoon) comingSoon.style.display = 'none';

    // Give input a working ID if missing
    var inputEl = document.querySelector('.chatbot-input-row input');
    if (inputEl && !inputEl.id) inputEl.id = 'chatbotInput';

    var sendEl = document.querySelector('.chatbot-send');
    if (sendEl && !sendEl.id) sendEl.id = 'chatbotSendBtn';

    // If body already has greeting content from HTML, clear it and re-init fresh
    var body = document.getElementById('chatbotBody');
    if (body) {
      body.innerHTML = '';
      init();
    }
  });

})();