const modulePathData = [
    {
        id: 1,
        title: { "English": "Grooming", "Hindi": "ग्रूमिंग", "Telugu": "ఆహార్యం" },
        duration: "30 Mins",
        timeline: [
            { time: "00:00", type: "intro", label: { "English": "Orientation" }, audio_hook: { "English": "Welcome. I am Pragati. Let's look at the Elite grooming standards.", "Hindi": "नमस्ते। मैं प्रगति हूँ। आइए एलीट ग्रूमिंग मानकों को देखें।", "Telugu": "నమస్తే. నేను ప్రగతిని. ఎలైట్ గ్రామింగ్ ప్రమాణాలను చూద్దాం." } },
            { time: "02:00", type: "slides", label: { "English": "Hygiene & Uniform" }, content: [{ "English": "Clean Shaven. Polished Shoes. Ironed Uniform.", "Hindi": "क्लीन शेवेन। पॉलिश किए हुए जूते। इस्त्री की हुई वर्दी।", "Telugu": "క్లీన్ షేవెన్. పాలిష్ చేసిన బూట్లు. ఇస్త్రీ చేసిన యూనిఫాం." }] },
            { time: "10:00", type: "video", label: { "English": "Practical: The Daily Checklist" }, visualPrompt: "POV of driver checking uniform in a mirror; [OVERLAY: FM NaipuNya Logo]", image: "assets/branding/portal_previews/module_2_digital_nav_v2_1769589462528.png" },
            { time: "25:00", type: "assessment", label: { "English": "Grooming Check" }, questions: [] }
        ]
    },
    {
        id: 2,
        title: { "English": "Etiquettes", "Hindi": "शिष्टाचार", "Telugu": "మర్యాదలు" },
        duration: "30 Mins",
        timeline: [
            { time: "00:00", type: "intro", label: { "English": "The Art of Service" }, audio_hook: { "English": "Etiquette is the language of respect.", "Hindi": "शिष्टाचार सम्मान की भाषा है।", "Telugu": "మర్యాద అంటే గౌరవపూర్వకమైన భాష." } },
            { time: "02:00", type: "slides", label: { "English": "Greeting & Silence" }, content: [{ "English": "Greeting with 'Sir/Ma'am'. Maintain absolute silence during transit.", "Hindi": "'सर/मैम' के साथ अभिवादन। यात्रा के दौरान पूर्ण शांति बनाए रखें।", "Telugu": "'సర్/మేమ్' అని పలకరించండి. ప్రయాణంలో నిశ్శబ్దాన్ని పాటించండి." }] },
            { time: "10:00", type: "video", label: { "English": "Practical: Silent Service" }, visualPrompt: "Driver opening door; minimal verbal interaction; [OVERLAY: FM NaipuNya Logo]", image: "assets/branding/portal_previews/module_3_posh_respectful_1769587065752.png" },
            { time: "25:00", type: "assessment", label: { "English": "Etiquette Quiz" }, questions: [] }
        ]
    },
    {
        id: 3,
        title: { "English": "Customer Service", "Hindi": "ग्राहक सेवा", "Telugu": "కస్టమర్ సర్వీస్" },
        duration: "30 Mins",
        timeline: [
            { time: "00:00", type: "intro", label: { "English": "Elite Experience" }, audio_hook: { "English": "Customer service means anticipating needs.", "Hindi": "ग्राहक सेवा का अर्थ है जरूरतों का अनुमान लगाना।", "Telugu": "కస్టమర్ సర్వీస్ అంటే అవసరాలను ముందుగానే ఊహించడం." } },
            { time: "02:00", type: "slides", label: { "English": "Anticipation" }, content: [{ "English": "Adjusting AC, helping with luggage without being asked.", "Hindi": "बिना पूछे एसी को एडजस्ट करना, सामान में मदद करना।", "Telugu": "అడగకుండానే AC ని సర్దుబాటు చేయడం, సామానుతో సహాయం చేయడం." }] },
            { time: "10:00", type: "video", label: { "English": "Practical: Helping the Client" }, visualPrompt: "Driver adjusting temperature for passenger; [OVERLAY: FM NaipuNya Logo]", image: "assets/branding/portal_previews/module_1_professional_pilot_1769585570453.png" },
            { time: "25:00", type: "assessment", label: { "English": "Service Excellence" }, questions: [] }
        ]
    },
    {
        id: 4,
        title: { "English": "Defensive Driving: Basic", "Hindi": "डिफेंसिव ड्राइविंग: बेसिक", "Telugu": "డిఫెన్సివ్ డ్రైవింగ్: బేసిక్" },
        duration: "30 Mins",
        total_seconds: 1800,
        timeline: [
            { id: "intro", duration_s: 180, type: "intro", label: { "English": "Zen Orientation" }, audio_hook: { "English": "A pilot's mind is as important as their hands. Welcome to Defensive Mastery.", "Hindi": "पायलट का दिमाग उसके हाथों की तरह ही महत्वपूर्ण है। डिफेंसिव मास्टर में आपका स्वागत है।", "Telugu": "పైలట్ మనస్సు కూడా అతని చేతులంతే ముఖ్యం. డిఫెన్సివ్ మాస్టరీకి స్వాగతం." }, image: "assets/branding/portal_previews/module_1_professional_pilot_1769585570453.png" },
            { id: "s1", duration_s: 105, type: "slides", label: { "English": "The 3-Second Rule" }, content: [{ "English": "Safe gap check. Why time matters more than distance.", "Hindi": "सुरक्षित दूरी की जांच। दूरी से ज्यादा समय क्यों मायने रखता है।", "Telugu": "సురక్షితమైన గ్యాప్ తనిఖీ. దూరం కంటే సమయం ఎందుకు ముఖ్యం." }], image: "assets/branding/portal_previews/m4_slide_1_following_distance_1769592766098.png" },
            { id: "s2", duration_s: 105, type: "slides", label: { "English": "Scanning Strategy" }, content: [{ "English": "15-Second Lead time. Constant eye movements.", "Hindi": "15-सेकंड का लीड समय। निरंतर आंखों की हलचल।", "Telugu": "15-సెకన్ల లీడ్ టైమ్. కళ్ళు నిరంతరం గమనిస్తూ ఉండడం." }], image: "assets/branding/portal_previews/m4_slide_2_hazard_scanning_1769592931428.png" },
            { id: "s3", duration_s: 105, type: "slides", label: { "English": "Blind Spot Awareness" }, content: [{ "English": "The zone of invisibility. Checking shoulders.", "Hindi": "अदृश्यता का क्षेत्र। कंधों की जांच करना।", "Telugu": "కనిపించని మండలం. భుజాలను తనిఖీ చేయడం." }], image: "assets/branding/portal_previews/m4_slide_3_blind_spots_1769593177524.png" },
            { id: "s4", duration_s: 105, type: "slides", label: { "English": "The Focused Cockpit" }, content: [{ "English": "Zen interior. Removing mobile distractions.", "Hindi": "ज़ेन इंटीरियर। मोबाइल के ध्यान भटकाने वाली चीज़ों को हटाना।", "Telugu": "జెన్ ఇంటీరియర్. మొబైల్ పరధ్యానాలను తొలగించడం." }], image: "assets/branding/portal_previews/m4_slide_4_distract_free_1769593465561.png" },
            { id: "v1", duration_s: 720, type: "video", label: { "English": "Tactical Driving Simulation" }, visualPrompt: "POV simulation cycling through various city traffic scenarios. [Built-in Vajra Liveness Checks]", image: "assets/branding/portal_previews/module_5_hazard_sim_1769587834004.png" },
            { id: "xr", duration_s: 240, type: "xr", label: { "English": "Final XR Evaluation" }, xr_url: "defensive_basic_xr.html", image: "assets/branding/portal_previews/module_5_hazard_sim_1769587834004.png" },
            { id: "exam", duration_s: 240, type: "assessment", label: { "English": "Final Mastery Certification" } }
        ]
    },
    {
        id: 5,
        title: { "English": "Defensive Driving: Medium", "Hindi": "डिफेंसिव ड्राइविंग: मध्यम", "Telugu": "డిఫెన్సివ్ డ్రైవింగ్: మీడియం" },
        duration: "30 Mins",
        timeline: [
            { time: "00:00", type: "intro", label: { "English": "City Navigation Zen" }, audio_hook: { "English": "Urban driving requires constant scanning.", "Hindi": "शहरी ड्राइविंग के लिए निरंतर स्कैनिंग की आवश्यकता होती है।", "Telugu": "పట్టణ డ్రైవింగ్‌కు నిరంతరం గమనించడం అవసరం." } },
            { time: "02:00", type: "slides", label: { "English": "Lane Discipline" }, content: [{ "English": "Predicting the move of others. Smooth transitions.", "Hindi": "दूसरों की चाल का अनुमान लगाना। सुचारू बदलाव।", "Telugu": "ఇతరుల కదలికలను అంచనా వేయడం. సాఫీగా మారడం." }] },
            { time: "10:00", type: "xr", label: { "English": "Interactive XR: Urban Navigation", "Hindi": "इंटरएक्टिव XR: शहरी नेविगेशन", "Telugu": "ఇంటరాక్టివ్ XR: అర్బన్ నావిగేషన్" }, visualPrompt: "Interactive XR Scene: High-traffic merging simulation; [Built-in Vajra Check]", xr_url: "defensive_medium_xr.html", image: "assets/branding/portal_previews/module_6_city_mastery_1769588210863.png" },
            { time: "25:00", type: "assessment", label: { "English": "Medium Skills" }, questions: [] }
        ]
    },
    {
        id: 6,
        title: { "English": "Defensive Driving: Advanced", "Hindi": "डिफेंसिव ड्राइविंग: उन्नत", "Telugu": "డిఫెన్సివ్ డ్రైవింగ్: అడ్వాన్స్డ్" },
        duration: "30 Mins",
        timeline: [
            { time: "00:00", type: "intro", label: { "English": "Tactical Mastery" }, audio_hook: { "English": "Extreme conditions require extreme focus.", "Hindi": "अत्यधिक परिस्थितियों के लिए अत्यधिक ध्यान की आवश्यकता होती है।", "Telugu": "తీవ్రమైన పరిస్థితులకు విపరీతమైన ఏకాగ్రత అవసరం." } },
            { time: "02:00", type: "slides", label: { "English": "Hydroplaning & Glares" }, content: [{ "English": "Managing tire grip in monsoon and low visibility.", "Hindi": "मानसून और कम दृश्यता में टायर ग्रिप का प्रबंधन।", "Telugu": "వర్షాకాలంలో మరియు తక్కువ కాంతిలో టైర్ గ్రిప్‌ను నిర్వహించడం." }] },
            { time: "10:00", type: "xr", label: { "English": "Interactive XR: Tactical Night Safety", "Hindi": "इंटरएक्टिव XR: सामरिक रात्रि सुरक्षा", "Telugu": "ఇంటరాక్టివ్ XR: టాక్టికల్ నైట్ సేఫ్టీ" }, visualPrompt: "Interactive XR Scene: Night monsoon driving with glare simulation; [Built-in Vajra Check]", xr_url: "defensive_advanced_xr.html", image: "assets/branding/portal_previews/module_7_night_safety_thermal_1769588619667.png" },
            { time: "25:00", type: "assessment", label: { "English": "Advanced Mastery" }, questions: [] }
        ]
    },
    {
        id: 7,
        title: { "English": "POSH: Hammering for Drivers", "Hindi": "POSH: ड्राइवरों के लिए हैमरिंग", "Telugu": "POSH: డ్రైవర్ల కోసం హ్యామరింగ్" },
        duration: "30 Mins",
        timeline: [
            { time: "00:00", type: "intro", label: { "English": "Zero Tolerance" }, audio_hook: { "English": "Harassment results in immediate termination. No excuses.", "Hindi": "उत्पीड़न के परिणामस्वरूप तत्काल बर्खास्तगी होगी। कोई बहाना नहीं।", "Telugu": "వేధింపులకు పాల్పడితే వెంటనే తొలగించబడతారు. ఎలాంటి సాకులు చెప్పకూడదు." } },
            { time: "02:00", type: "slides", label: { "English": "The Hammer Policy" }, content: [{ "English": "Strict adherence to personal boundaries and respect.", "Hindi": "व्यक्तिगत सीमाओं और सम्मान का सख्त पालन।", "Telugu": "వ్యక్తిగత సరిహద్దులను మరియు గౌరవాన్ని ఖచ్చితంగా పాటించడం." }] },
            { time: "10:00", type: "video", label: { "English": "Simulation: Professional Distance" }, visualPrompt: "POV of driver maintaining professional distance at a corporate drop-off; [OVERLAY: FM NaipuNya Logo]", image: "assets/branding/portal_previews/module_4_vajra_check_1769587589679.png" },
            { time: "25:00", type: "assessment", label: { "English": "POSH Check" }, questions: [] }
        ]
    },
    {
        id: 8,
        title: { "English": "First Aid & Emergency Procedures", "Hindi": "प्राथमिक चिकित्सा और आपातकालीन प्रक्रिया", "Telugu": "ప్రథమ చికిత్స & అత్యవసర విధివిధానాలు" },
        duration: "30 Mins",
        timeline: [
            { time: "02:00", type: "slides", label: { "English": "Golden Hour" }, content: [{ "English": "CPR and emergency evacuation procedures.", "Hindi": "सीपीआर और आपातकालीन निकासी प्रक्रिया।", "Telugu": "CPR మరియు అత్యవసర తరలింపు ప్రక్రియలు." }] },
            { time: "10:00", type: "xr", label: { "English": "Interactive XR: Emergency Drills", "Hindi": "इंटरएक्टिव XR: आपातकालीन ड्रिल", "Telugu": "ఇంటరాక్టివ్ XR: అత్యవసర డ్రిల్స్" }, visualPrompt: "Interactive XR Scene: Guiding passenger to safety; CPR and Fire Safety simulation; [Built-in Vajra Check]", xr_url: "first_aid_xr.html", image: "assets/branding/portal_previews/module_8_guardian_response_sim_1769589034572.png" },
            { time: "25:00", type: "assessment", label: { "English": "Guardian Exam" }, questions: [] }
        ]
    }
];
