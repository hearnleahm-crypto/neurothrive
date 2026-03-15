// ── Routine Questionnaire & Personalized Routine Generator ──────────────────

export const ROUTINE_QUESTIONS = {
  morning: [
    {
      id: "morning_time",
      question: "How much time do you have for a morning routine?",
      options: [
        { id: "10", label: "10 min", emoji: "⚡" },
        { id: "20", label: "20 min", emoji: "🕐" },
        { id: "30", label: "30 min", emoji: "🕑" },
        { id: "45", label: "45+ min", emoji: "🕒" },
      ]
    },
    {
      id: "morning_struggle",
      question: "What's your biggest morning struggle?",
      options: [
        { id: "getting_up", label: "Getting out of bed", emoji: "🛏️" },
        { id: "focus", label: "Focus", emoji: "🎯" },
        { id: "anxiety", label: "Anxiety", emoji: "🌊" },
        { id: "energy", label: "Energy", emoji: "🔋" },
        { id: "motivation", label: "Motivation", emoji: "💫" },
      ]
    },
    {
      id: "morning_exercise",
      question: "Do you exercise in the morning?",
      options: [
        { id: "yes", label: "Yes", emoji: "💪" },
        { id: "sometimes", label: "Sometimes", emoji: "🤷" },
        { id: "no", label: "No", emoji: "🚫" },
      ]
    },
    {
      id: "meditation",
      question: "Interested in meditation or mindfulness?",
      options: [
        { id: "yes", label: "Yes", emoji: "🧘" },
        { id: "want_to_start", label: "Want to start", emoji: "🌱" },
        { id: "no", label: "Not interested", emoji: "🚫" },
      ]
    },
    {
      id: "phone_first",
      question: "Do you check your phone first thing?",
      options: [
        { id: "yes", label: "Yes", emoji: "📱" },
        { id: "no", label: "No", emoji: "✋" },
      ]
    },
    {
      id: "structure_pref",
      question: "Do you prefer structured or flexible routines?",
      options: [
        { id: "structured", label: "Structured", emoji: "📋" },
        { id: "flexible", label: "Flexible", emoji: "🌊" },
      ]
    },
  ],
  evening: [
    {
      id: "evening_time",
      question: "How much time for your evening wind-down?",
      options: [
        { id: "10", label: "10 min", emoji: "⚡" },
        { id: "20", label: "20 min", emoji: "🕐" },
        { id: "30", label: "30 min", emoji: "🕑" },
        { id: "45", label: "45+ min", emoji: "🕒" },
      ]
    },
    {
      id: "evening_struggle",
      question: "What's your biggest evening challenge?",
      options: [
        { id: "racing_thoughts", label: "Racing thoughts", emoji: "🌀" },
        { id: "sleep", label: "Falling asleep", emoji: "😴" },
        { id: "screens", label: "Screens & scrolling", emoji: "📱" },
        { id: "stress", label: "Letting go of stress", emoji: "😤" },
        { id: "loneliness", label: "Loneliness", emoji: "🫂" },
      ]
    },
    {
      id: "sleep_goal",
      question: "What would improve your sleep most?",
      options: [
        { id: "fall_asleep", label: "Falling asleep faster", emoji: "⏱️" },
        { id: "stay_asleep", label: "Staying asleep", emoji: "🌙" },
        { id: "wake_rested", label: "Waking up rested", emoji: "☀️" },
        { id: "calm_mind", label: "Calming my mind", emoji: "🧠" },
      ]
    },
    {
      id: "evening_exercise",
      question: "Do you exercise in the evening?",
      options: [
        { id: "yes", label: "Yes", emoji: "💪" },
        { id: "sometimes", label: "Sometimes", emoji: "🤷" },
        { id: "no", label: "No", emoji: "🚫" },
      ]
    },
    {
      id: "evening_meditation",
      question: "Interested in evening meditation or mindfulness?",
      options: [
        { id: "yes", label: "Yes", emoji: "🧘" },
        { id: "want_to_start", label: "Want to start", emoji: "🌱" },
        { id: "no", label: "Not interested", emoji: "🚫" },
      ]
    },
    {
      id: "evening_screens",
      question: "Willing to limit screens before bed?",
      options: [
        { id: "yes", label: "Yes", emoji: "✅" },
        { id: "try", label: "I'll try", emoji: "🤞" },
        { id: "no", label: "Not realistic", emoji: "🚫" },
      ]
    },
  ],
};

// ── Routine Step Library ────────────────────────────────────────────────────
// Each step is tagged for the generator to filter and rank.
// conditions: which conditions this is especially good for ("all" = universal)
// struggles: which morning/evening struggles this addresses
// tags: categorical tags for filtering
// priority: 1-10, higher = more likely to be included
// order: suggested sequence position (lower = earlier in routine)

export const ROUTINE_STEP_LIBRARY = {
  morning: [
    // ── Physical Activation ──
    { id:"m_cold_water", title:"Cold Water Wake-Up", time:3, desc:"Splash cold water on your face or take a 30-second cold rinse. Cold exposure triggers norepinephrine release — your brain's natural alertness signal. This single action can override the grogginess your brain creates to keep you in bed.", conditions:["adhd","depression","neuro_core","default"], struggles:["getting_up","energy"], tags:["physical","activation"], order:1, priority:9 },
    { id:"m_jumping_jacks", title:"60-Second Movement Burst", time:2, desc:"Do 20 jumping jacks, 10 squats, or jog in place. Large muscle movement floods your brain with dopamine and norepinephrine in under a minute — the same neurotransmitters your morning coffee takes 30 minutes to boost.", conditions:["adhd","depression","bipolar","neuro_core","default"], struggles:["getting_up","energy","motivation"], tags:["physical","activation"], order:2, priority:8 },
    { id:"m_stretch", title:"Morning Stretch", time:5, desc:"Gentle full-body stretching from head to toe. Stretching activates your parasympathetic nervous system while increasing blood flow to the brain — reducing morning cortisol spikes that fuel anxiety.", conditions:["anxiety","ptsd","ocd","bpd","autism","default"], struggles:["anxiety","getting_up"], tags:["physical","gentle"], order:2, priority:7 },
    { id:"m_yoga_flow", title:"5-Minute Yoga Flow", time:5, desc:"Sun salutations or a simple standing flow. Yoga combines movement, breathing, and body awareness — activating the insula (your brain's interoception center) which is often underactive in mental health conditions.", conditions:["anxiety","ptsd","bpd","depression","neuro_core"], struggles:["anxiety","energy"], tags:["physical","mindfulness"], order:3, priority:7 },
    { id:"m_walk", title:"Morning Walk", time:10, desc:"Step outside for a 10-minute walk. Morning sunlight entering your eyes signals your suprachiasmatic nucleus to stop melatonin production and start cortisol — the single most powerful circadian reset. This alone improves mood, focus, and sleep quality.", conditions:["depression","anxiety","bipolar","neuro_core","default"], struggles:["energy","motivation","getting_up"], tags:["physical","light_exposure"], order:3, priority:9 },
    { id:"m_light_exposure", title:"Sunlight in Your Eyes", time:3, desc:"Stand by a window or step outside for 2-3 minutes of bright light. Your retinal ganglion cells need ~1000 lux to trigger proper cortisol and serotonin production — indoor lighting gives you only ~200 lux.", conditions:["depression","bipolar","neuro_core","default"], struggles:["energy","getting_up","motivation"], tags:["light_exposure"], order:1, priority:9 },
    { id:"m_exercise", title:"Morning Workout", time:15, desc:"Follow your NeuroThrive exercise plan. Morning exercise increases BDNF (brain-derived neurotrophic factor) by 200-300%, growing new neural connections. The post-exercise dopamine surge lasts 3-4 hours — covering your most productive morning hours.", conditions:["all"], struggles:["energy","motivation","focus"], tags:["exercise"], requiresExercise:true, order:4, priority:8 },
    { id:"m_exercise_short", title:"Quick Movement Session", time:7, desc:"A brief bodyweight circuit or brisk walk. Even 7 minutes of movement raises BDNF levels and primes your prefrontal cortex for better decision-making all morning.", conditions:["all"], struggles:["energy","motivation","focus"], tags:["exercise"], requiresExercise:"sometimes", order:4, priority:7 },

    // ── Mindfulness & Grounding ──
    { id:"m_meditation", title:"Guided Meditation", time:10, desc:"Close your eyes and follow a meditation practice. Meditation thickens the prefrontal cortex and shrinks the amygdala over time — literally rewiring the brain regions that govern focus, emotional regulation, and threat response.", conditions:["anxiety","ptsd","ocd","bpd","depression","neuro_core"], struggles:["anxiety","focus"], tags:["mindfulness","meditation"], requiresMeditation:true, order:5, priority:8 },
    { id:"m_meditation_short", title:"3-Minute Breathing", time:3, desc:"Sit quietly and breathe: 4 counts in, 7 counts hold, 8 counts out. This 4-7-8 pattern activates your vagus nerve, shifting your nervous system from sympathetic (fight-or-flight) to parasympathetic (rest-and-digest) in under 3 minutes.", conditions:["anxiety","ptsd","ocd","bpd","adhd","default"], struggles:["anxiety","focus"], tags:["mindfulness","breathing"], requiresMeditation:"want_to_start", order:5, priority:8 },
    { id:"m_grounding", title:"5-4-3-2-1 Grounding", time:3, desc:"Name 5 things you see, 4 you hear, 3 you can touch, 2 you smell, 1 you taste. This sensory grounding activates your prefrontal cortex and pulls your brain out of the amygdala-driven threat loop that anxiety and PTSD create on waking.", conditions:["anxiety","ptsd","bpd","ocd","phobia"], struggles:["anxiety"], tags:["grounding","mindfulness"], order:2, priority:9 },
    { id:"m_body_scan", title:"Quick Body Scan", time:5, desc:"Starting from your feet, notice each body part without judgment. Body scanning strengthens interoception — your brain's ability to read internal signals. This is often impaired in trauma, ADHD, and anxiety, causing disconnection from your body's needs.", conditions:["ptsd","bpd","eating","autism","adhd"], struggles:["anxiety","getting_up"], tags:["mindfulness","body_awareness"], order:5, priority:7 },

    // ── Intention & Planning ──
    { id:"m_one_thing", title:"Today's One Priority", time:3, desc:"Write down the single most important thing you need to do today. Just one. Your brain's working memory can only hold 3-5 items — and with conditions like ADHD, it's often less. Externalizing your priority prevents the paralysis of too many mental tabs.", conditions:["all"], struggles:["focus","motivation"], tags:["planning","intention","journaling"], order:6, priority:9 },
    { id:"m_daily_list", title:"Write Your Daily List", time:5, desc:"Write down 3-5 things you want to accomplish today. Not 10 — your brain rebels against long lists. Externalizing tasks onto paper frees working memory and reduces the anxiety of 'forgetting something.' Cross them off as you go for a dopamine hit with each one.", conditions:["all"], struggles:["focus","motivation","anxiety"], tags:["planning","journaling"], order:6, priority:9 },
    { id:"m_time_block", title:"Time-Block Your Day", time:5, desc:"Map your day into 2-3 hour blocks with specific tasks. External structure compensates for the internal time-blindness that conditions like ADHD create. Your brain cannot intuit how long things take — but it can follow a visible schedule.", conditions:["adhd","bipolar","ocd","neuro_core"], struggles:["focus","motivation"], tags:["planning","structured"], order:7, priority:7 },
    { id:"m_gratitude", title:"Three Gratitudes", time:3, desc:"Write or think of 3 things you're grateful for. Gratitude practice increases dopamine and serotonin production. Studies show 21 consecutive days of this practice rewires your brain's default negativity bias.", conditions:["depression","anxiety","bpd","default"], struggles:["motivation","anxiety"], tags:["intention","positive","journaling"], order:6, priority:8 },
    { id:"m_affirmation", title:"Morning Affirmation", time:2, desc:"Read today's NeuroThrive affirmation aloud. Speaking activates your Broca's area while hearing your own voice activates Wernicke's area — engaging two language centers simultaneously strengthens the neural pathway for the belief you're affirming.", conditions:["depression","bpd","anxiety","ptsd","default"], struggles:["motivation","anxiety"], tags:["intention","positive"], order:6, priority:7 },
    { id:"m_journal", title:"Morning Journal & Daily List", time:5, desc:"Spend 5 minutes journaling how you feel and writing your daily to-do list. Getting thoughts on paper frees your working memory, and writing your tasks externalizes the mental load — so your brain can focus on doing instead of remembering. This combination clears emotional residue and gives your day structure in one step.", conditions:["all"], struggles:["racing_thoughts","anxiety","motivation","focus"], tags:["journaling","processing","planning"], order:7, priority:9 },
    { id:"m_intention", title:"Set Today's Intention", time:2, desc:"Complete this sentence: 'Today, I intend to feel ___.' Setting an emotional intention activates the reticular activating system — your brain's filter for what to pay attention to. You'll unconsciously notice more opportunities to feel that way.", conditions:["all"], struggles:["motivation","anxiety","focus"], tags:["intention","journaling"], order:6, priority:8 },

    // ── Nutrition & Hydration ──
    { id:"m_hydrate", title:"Hydrate First", time:2, desc:"Drink a full glass of water before anything else. Your brain is 75% water and loses fluid overnight. Even 2% dehydration impairs cognitive performance by 25% — and you wake up already dehydrated.", conditions:["all"], struggles:["energy","getting_up","focus"], tags:["nutrition","hydration"], order:1, priority:9 },
    { id:"m_breakfast", title:"Brain-First Breakfast", time:10, desc:"Eat your NeuroThrive breakfast before checking screens. Protein stabilizes dopamine, complex carbs provide steady glucose, and healthy fats feed your neural membranes — all before the day's stimuli hijack your neurochemistry.", conditions:["all"], struggles:["energy","focus"], tags:["nutrition"], order:8, priority:8 },
    { id:"m_supplements", title:"Take Your Supplements", time:1, desc:"Take your NeuroThrive-recommended supplements with breakfast. Fat-soluble vitamins (D, K, E) absorb best with food. Timing matters — magnesium is better at night, but B vitamins, omega-3s, and vitamin D are best in the morning.", conditions:["all"], struggles:[], tags:["nutrition","supplements"], order:9, priority:7 },

    // ── Phone & Digital ──
    { id:"m_phone_delay", title:"Phone-Free First 30", time:0, desc:"Keep your phone on airplane mode or in another room for 30 minutes after waking. Checking your phone immediately floods your brain with dopamine spikes from notifications, emails, and social media — burning through your motivation neurotransmitter before you've even started your day.", conditions:["adhd","anxiety","depression","bpd","default"], struggles:["focus","anxiety","motivation"], tags:["phone","digital"], phoneRelated:true, order:0, priority:9 },
    { id:"m_phone_intention", title:"Intentional Phone Check", time:3, desc:"Before unlocking your phone, set a timer for 5 minutes and decide exactly what you're checking. Unlimited phone access activates the variable-ratio reward system in your brain — the same mechanism that makes gambling addictive.", conditions:["adhd","anxiety","bpd","default"], struggles:["focus","anxiety"], tags:["phone","digital"], phoneRelated:true, order:10, priority:7 },

    // ── Routine Anchors ──
    { id:"m_make_bed", title:"Make Your Bed", time:2, desc:"Make your bed immediately after getting up. This micro-completion gives your brain a small dopamine reward that builds momentum. Navy SEAL research found this single habit correlates with increased productivity all day.", conditions:["depression","adhd","default"], struggles:["motivation","getting_up"], tags:["anchor","structure"], order:1, priority:7 },
    { id:"m_timer_start", title:"Timer-Start Ritual", time:1, desc:"Set a visible timer for your first task of the day. Externalizing time is one of the most evidence-supported tools for ADHD and executive function challenges — your brain cannot intuit time passing, but it can watch a countdown.", conditions:["adhd","ocd","neuro_core"], struggles:["focus"], tags:["planning","structured"], order:10, priority:7 },
    { id:"m_body_double", title:"Accountability Check-In", time:2, desc:"Tell someone — a friend, partner, or online community — what you're working on today. Focus increases dramatically when another presence is aware of your goals. This 'body double' effect is especially powerful for ADHD brains.", conditions:["adhd","depression","default"], struggles:["motivation","focus"], tags:["social","accountability"], order:10, priority:6 },
    { id:"m_window_tolerance", title:"Check Your Window", time:2, desc:"Rate your current state: hyper-aroused (tense, racing), hypo-aroused (numb, foggy), or within your window of tolerance. Simply naming your state activates the prefrontal cortex, giving you choice over your next action instead of running on autopilot.", conditions:["ptsd","bpd","did","bipolar"], struggles:["anxiety","getting_up"], tags:["awareness","regulation"], order:3, priority:8 },
    { id:"m_sensory_prep", title:"Sensory Environment Check", time:2, desc:"Adjust lighting, sounds, and textures to your comfort level before starting your day. Your sensory processing system shapes everything that follows — managing it proactively prevents the overwhelm that builds throughout the day.", conditions:["autism","adhd","ptsd"], struggles:["anxiety","energy"], tags:["sensory","environment"], order:2, priority:8 },

    // ── Additional Meditation & Mindfulness ──
    { id:"m_loving_kindness", title:"Loving-Kindness Meditation", time:5, desc:"Silently repeat phrases like 'May I be well, may I be happy, may I be at peace.' Then extend them to others. This practice activates the insula and anterior cingulate cortex — areas linked to empathy and emotional regulation — while boosting oxytocin.", conditions:["depression","bpd","ptsd","anxiety","default"], struggles:["motivation","anxiety","loneliness"], tags:["mindfulness","meditation"], order:5, priority:7 },
    { id:"m_mindful_coffee", title:"Mindful Morning Drink", time:5, desc:"Make your coffee or tea without your phone. Notice the sounds, the warmth, the aroma. This single act of present-moment awareness activates the same prefrontal regions as formal meditation — without sitting still.", conditions:["all"], struggles:["anxiety","focus","energy"], tags:["mindfulness"], order:4, priority:7 },
    { id:"m_box_breathing", title:"Box Breathing", time:4, desc:"Breathe in for 4 counts, hold 4, exhale 4, hold 4. Repeat 4 rounds. Used by Navy SEALs to regulate the nervous system under extreme stress. Balances your CO2/O2 ratio, calming the amygdala's threat response within minutes.", conditions:["anxiety","ptsd","ocd","bpd","adhd","default"], struggles:["anxiety","focus"], tags:["mindfulness","breathing"], order:3, priority:8 },
    { id:"m_visualization", title:"Morning Visualization", time:5, desc:"Close your eyes and walk through your ideal day — see yourself completing tasks, handling challenges calmly, feeling energized. Visualization activates the same motor cortex pathways as actually performing the actions, priming your brain for success.", conditions:["depression","anxiety","adhd","default"], struggles:["motivation","anxiety","focus"], tags:["mindfulness","visualization"], order:5, priority:7 },

    // ── Additional Exercise ──
    { id:"m_hiit_micro", title:"4-Minute HIIT", time:4, desc:"20 seconds all-out effort, 10 seconds rest, repeat 8 times (Tabata protocol). Four minutes of HIIT increases dopamine by 200-300% and elevates norepinephrine for hours. This is the most time-efficient way to prime your brain chemistry.", conditions:["adhd","depression","neuro_core","default"], struggles:["energy","motivation","focus"], tags:["exercise","physical"], order:4, priority:8 },
    { id:"m_dance", title:"3-Minute Dance Break", time:3, desc:"Put on your favorite song and move however your body wants. Dancing activates the cerebellum, basal ganglia, and reward system simultaneously — it's one of the few activities that engages nearly every brain region at once. Pure neurological activation.", conditions:["all"], struggles:["energy","motivation","getting_up"], tags:["exercise","physical","activation"], order:3, priority:7 },
    { id:"m_resistance", title:"Morning Strength Circuit", time:10, desc:"Push-ups, squats, planks, and lunges — 3 rounds. Resistance training increases IGF-1 (insulin-like growth factor), which crosses the blood-brain barrier and promotes neurogenesis. Stronger muscles also improve insulin sensitivity, stabilizing brain glucose all day.", conditions:["depression","adhd","neuro_core","default"], struggles:["energy","motivation"], tags:["exercise","physical"], order:4, priority:7 },
    { id:"m_run", title:"Morning Run or Jog", time:15, desc:"Lace up and run — even slowly. Running at conversational pace (Zone 2) is the single best exercise for brain health. It increases cerebral blood flow by 25%, triggers endocannabinoid release (the 'runner's high'), and promotes hippocampal neurogenesis.", conditions:["depression","anxiety","adhd","neuro_core","default"], struggles:["energy","motivation","anxiety"], tags:["exercise","physical"], order:4, priority:7 },
  ],
  evening: [
    // ── Processing & Release ──
    { id:"e_brain_dump", title:"Brain Dump", time:5, desc:"Write everything in your head onto paper — tasks, worries, random thoughts, all of it. Externalizing mental load reduces activity in the default mode network, the brain region responsible for the rumination that keeps you awake.", conditions:["adhd","anxiety","ocd","bipolar","default"], struggles:["racing_thoughts","sleep"], tags:["processing","journaling"], order:1, priority:9 },
    { id:"e_worry_time", title:"Scheduled Worry Time", time:5, desc:"Set a timer for 5 minutes and worry deliberately. When the timer ends, close the notebook. This paradoxical technique trains your brain that worry has a container — reducing the intrusive thoughts that anxiety, OCD, and PTSD generate at bedtime.", conditions:["anxiety","ocd","ptsd","bpd"], struggles:["racing_thoughts","sleep"], tags:["processing","anxiety_tool"], order:1, priority:8 },
    { id:"e_journal", title:"Evening Reflection", time:5, desc:"Write about one thing that went well and one thing you'd change. This balanced reflection activates both the reward system (what worked) and the learning system (what to adjust) — without the negativity bias that depression amplifies at night.", conditions:["depression","bpd","anxiety","default"], struggles:["stress","racing_thoughts"], tags:["journaling","reflection"], order:2, priority:8 },
    { id:"e_what_worked", title:"What Worked Today", time:3, desc:"Name one thing you did well today — even if it was small. Your brain's negativity bias remembers 5 negatives for every positive. Deliberately recalling a win strengthens the neural pathways for self-efficacy, counteracting the shame spiral your condition may create.", conditions:["depression","bpd","adhd","anxiety","default"], struggles:["stress","loneliness"], tags:["positive","reflection"], order:2, priority:8 },
    { id:"e_gratitude", title:"Evening Gratitudes", time:3, desc:"Write 3 things you're grateful for from today. Evening gratitude practice specifically improves sleep quality — studies show it increases parasympathetic activity and reduces pre-sleep arousal by 25%.", conditions:["depression","anxiety","default"], struggles:["sleep","stress","loneliness"], tags:["positive","gratitude"], order:2, priority:7 },
    { id:"e_forgiveness", title:"Self-Compassion Pause", time:3, desc:"Place your hand on your chest and say: 'I did my best with what I had today. Tomorrow is a new chance.' Self-compassion activates the mammalian care system (oxytocin, opioids) — the same neurochemistry triggered by being comforted by someone who loves you.", conditions:["bpd","depression","ptsd","eating","default"], struggles:["stress","loneliness"], tags:["self_compassion","emotional"], order:3, priority:8 },

    // ── Wind-Down & Relaxation ──
    { id:"e_screen_cut", title:"Screens Off", time:0, desc:"Put your phone in another room and switch off screens 30 minutes before bed. Blue light suppresses melatonin production by up to 50%. But it's not just light — the content activates your dopamine system, making your brain seek 'one more scroll' instead of sleep.", conditions:["all"], struggles:["screens","sleep"], tags:["digital","screens"], screenRelated:true, order:4, priority:9 },
    { id:"e_blue_light", title:"Warm Lighting Switch", time:1, desc:"Switch to warm, dim lighting (or use night mode on remaining screens). Your suprachiasmatic nucleus reads light wavelength as a time signal — warm/dim light tells it to start melatonin production, preparing your brain for sleep.", conditions:["all"], struggles:["sleep","screens"], tags:["light","environment"], order:4, priority:8 },
    { id:"e_reading", title:"Read for 10 Minutes", time:10, desc:"Read a physical book (not a screen) for 10 minutes. Reading activates the imagination network while calming the default mode network — the opposite pattern of social media, which stimulates reactivity without resolution.", conditions:["anxiety","adhd","depression","default"], struggles:["screens","racing_thoughts","sleep"], tags:["relaxation","wind_down"], order:6, priority:7 },
    { id:"e_stretch", title:"Gentle Evening Stretch", time:5, desc:"Slow, gentle stretching focused on neck, shoulders, and hips. Evening stretching releases the physical tension your body accumulated from stress. Tight muscles send danger signals to your brain — releasing them tells your amygdala the threat is over.", conditions:["anxiety","ptsd","ocd","default"], struggles:["stress","sleep"], tags:["physical","relaxation"], order:5, priority:7 },
    { id:"e_bath", title:"Warm Shower or Bath", time:10, desc:"Take a warm shower or bath 60-90 minutes before bed. The subsequent drop in core body temperature mimics the natural thermoregulatory process that triggers sleep. Studies show this reduces time to fall asleep by 36%.", conditions:["all"], struggles:["sleep","stress"], tags:["relaxation","temperature"], order:5, priority:7 },

    // ── Breathwork & Meditation ──
    { id:"e_breathing", title:"4-7-8 Sleep Breathing", time:5, desc:"Breathe in for 4 counts, hold for 7, exhale for 8. Repeat 4 cycles. The extended exhale activates the vagus nerve, dropping your heart rate and signaling your brain that it's safe to sleep. This is one of the fastest evidence-supported ways to activate the parasympathetic nervous system.", conditions:["anxiety","ptsd","ocd","adhd","bipolar","default"], struggles:["racing_thoughts","sleep","stress"], tags:["breathing","relaxation"], order:7, priority:9 },
    { id:"e_body_scan_sleep", title:"Sleep Body Scan", time:10, desc:"Lying in bed, slowly relax each muscle group from toes to head. Progressive muscle relaxation reduces physiological arousal by 30-40% — directly counteracting the hypervigilance that anxiety, PTSD, and OCD create at bedtime.", conditions:["anxiety","ptsd","ocd","bpd","default"], struggles:["sleep","stress","racing_thoughts"], tags:["meditation","body_awareness"], order:8, priority:7 },
    { id:"e_meditation", title:"Evening Meditation", time:10, desc:"A guided sleep meditation or body scan. Evening meditation activates the parasympathetic nervous system and reduces cortisol by 20-25%. Over time, it physically enlarges the hippocampus (memory) and shrinks the amygdala (threat response).", conditions:["anxiety","ptsd","depression","bpd","neuro_core"], struggles:["racing_thoughts","sleep","stress"], tags:["meditation"], requiresMeditation:true, order:8, priority:7 },

    // ── Tomorrow Prep ──
    { id:"e_tomorrow", title:"Tomorrow's Anchor", time:3, desc:"Write the one thing you need to do first tomorrow morning. Deciding tonight means your prefrontal cortex (which is weakest in the morning) doesn't have to make that choice when you wake up. You'll start on autopilot instead of decision paralysis.", conditions:["adhd","depression","bipolar","ocd","default"], struggles:["racing_thoughts","stress"], tags:["planning","anchor"], order:3, priority:8 },
    { id:"e_clothes", title:"Lay Out Tomorrow", time:3, desc:"Set out tomorrow's clothes and prep anything you need. Every decision you eliminate from tomorrow morning preserves dopamine for what matters. Decision fatigue is real — and your morning self will thank tonight's you.", conditions:["adhd","depression","default"], struggles:["stress","sleep"], tags:["planning","preparation"], order:3, priority:6 },
    { id:"e_wins_list", title:"Tomorrow's Win List", time:3, desc:"Write 1-3 small, achievable wins for tomorrow. Not a to-do list — wins. Framing tasks as wins activates your brain's reward prediction system, creating anticipation instead of dread for the morning ahead.", conditions:["depression","adhd","bipolar","default"], struggles:["motivation","stress"], tags:["planning","positive"], order:3, priority:7 },

    // ── Connection & Regulation ──
    { id:"e_connection", title:"Gratitude Message", time:3, desc:"Send one genuine message of appreciation to someone in your life. Social connection triggers oxytocin release, the neurochemical that calms the amygdala and creates feelings of safety — exactly what your brain needs before sleep.", conditions:["depression","bpd","ptsd","default"], struggles:["loneliness","stress"], tags:["social","connection"], order:2, priority:7 },
    { id:"e_safe_space", title:"Safe Space Visualization", time:5, desc:"Close your eyes and visualize a place where you feel completely safe. Engage all 5 senses. Visualization activates the same brain regions as real experience — your amygdala cannot distinguish imagined safety from real safety, so it calms down either way.", conditions:["ptsd","bpd","anxiety","did","phobia"], struggles:["sleep","stress","racing_thoughts"], tags:["visualization","safety"], order:7, priority:8 },
    { id:"e_containment", title:"Emotional Containment", time:3, desc:"Visualize placing today's unresolved emotions into a container (a box, a safe, a jar). Tell yourself: 'These will be here tomorrow if I need them.' This technique from EMDR therapy gives your brain permission to stop processing and rest.", conditions:["ptsd","bpd","did","anxiety"], struggles:["racing_thoughts","stress"], tags:["processing","safety"], order:6, priority:8 },
    { id:"e_sensory_cocoon", title:"Sensory Comfort Setup", time:3, desc:"Optimize your sleep environment: cool temperature (65-68°F), weighted blanket if available, white noise or silence. Your sensory system needs predictable, comfortable input to downregulate. Sensory discomfort keeps the brain in scanning mode instead of sleep mode.", conditions:["autism","adhd","ptsd","anxiety"], struggles:["sleep","stress"], tags:["sensory","environment"], order:4, priority:8 },

    // ── Additional Evening Meditation ──
    { id:"e_yoga_nidra", title:"Yoga Nidra (Yogic Sleep)", time:10, desc:"Lie down and follow a guided body-awareness practice that hovers between waking and sleeping. Yoga Nidra reduces cortisol by 22% in a single session and activates the same delta brainwaves as deep sleep — while you're still conscious.", conditions:["anxiety","ptsd","depression","bpd","neuro_core","default"], struggles:["sleep","stress","racing_thoughts"], tags:["meditation","relaxation"], order:8, priority:7 },
    { id:"e_loving_kindness", title:"Evening Loving-Kindness", time:5, desc:"Send compassion to yourself, then to loved ones, then to difficult people, then to all beings. This practice increases vagal tone and oxytocin while reducing the self-critical rumination that depression and BPD amplify at night.", conditions:["depression","bpd","ptsd","anxiety","default"], struggles:["loneliness","stress","racing_thoughts"], tags:["meditation","mindfulness"], order:7, priority:7 },
    { id:"e_humming", title:"Vagus Nerve Humming", time:3, desc:"Hum at a low, steady pitch for 2-3 minutes. Humming vibrates the vagus nerve where it passes through the throat, directly activating the parasympathetic nervous system. Your heart rate drops within 30 seconds — measurable with any heart rate monitor.", conditions:["anxiety","ptsd","ocd","adhd","default"], struggles:["racing_thoughts","stress","sleep"], tags:["breathing","relaxation"], order:6, priority:7 },
    { id:"e_gratitude_meditation", title:"Gratitude Body Scan", time:5, desc:"Starting from your feet, thank each part of your body for what it did today. 'Thank you, legs, for carrying me.' This combines body awareness with positive affect — activating both the insula and the reward system, a powerful combination for pre-sleep calm.", conditions:["all"], struggles:["stress","sleep","loneliness"], tags:["meditation","gratitude"], order:7, priority:7 },

    // ── Evening Exercise & Movement ──
    { id:"e_workout", title:"Evening Workout", time:15, desc:"Follow your NeuroThrive exercise plan. Evening exercise lowers cortisol accumulated throughout the day and triggers endorphin release that carries into sleep. Research shows evening exercisers fall asleep faster and spend more time in deep sleep — when the brain consolidates memory and clears metabolic waste.", conditions:["all"], struggles:["stress","sleep","racing_thoughts"], tags:["exercise"], requiresExercise:true, order:3, priority:8 },
    { id:"e_evening_walk", title:"Evening Walk", time:15, desc:"A gentle walk after dinner, ideally as the sun sets. Evening walks lower blood glucose by 30% (stabilizing overnight brain fuel), expose you to dimming light that triggers melatonin production, and give your brain transition time between day-mode and sleep-mode.", conditions:["all"], struggles:["stress","sleep","racing_thoughts"], tags:["exercise","physical"], order:3, priority:7 },
    { id:"e_restorative_yoga", title:"Restorative Yoga", time:10, desc:"3-4 supported poses held for 2-3 minutes each — child's pose, legs up the wall, reclined butterfly. Restorative yoga activates the parasympathetic nervous system and reduces evening cortisol by 20%. The long holds give your fascia time to release stored tension.", conditions:["anxiety","ptsd","depression","bpd","neuro_core","default"], struggles:["stress","sleep"], tags:["exercise","physical","relaxation"], order:5, priority:7 },
    { id:"e_foam_roll", title:"Foam Rolling & Release", time:7, desc:"Roll out major muscle groups — back, legs, shoulders. Myofascial release reduces cortisol, increases serotonin, and activates mechanoreceptors that signal safety to the brain. Your body stores stress physically — this is how you let it go.", conditions:["all"], struggles:["stress","sleep"], tags:["exercise","physical","relaxation"], order:5, priority:6 },
    { id:"e_tai_chi", title:"Evening Tai Chi Flow", time:10, desc:"Slow, flowing movements coordinated with deep breathing. Tai Chi reduces cortisol, increases GABA (your brain's calming neurotransmitter), and improves sleep quality by 30% in clinical studies. The slow pace is the point — it teaches your nervous system to downshift.", conditions:["anxiety","ptsd","neuro_core","default"], struggles:["stress","sleep","racing_thoughts"], tags:["exercise","physical","mindfulness"], order:5, priority:7 },
  ],
};

// ── Routine Generator ───────────────────────────────────────────────────────

export function generateRoutine(prefs, conditions) {
  if (!prefs) return null;
  const result = { morning: [], evening: [] };

  ["morning", "evening"].forEach(period => {
    const periodPrefs = prefs[period];
    if (!periodPrefs) return;

    const timeKey = period === "morning" ? "morning_time" : "evening_time";
    const struggleKey = period === "morning" ? "morning_struggle" : "evening_struggle";
    const timeBudget = parseInt(periodPrefs[timeKey]) || 20;
    const struggle = periodPrefs[struggleKey] || "";
    const library = ROUTINE_STEP_LIBRARY[period];

    // Score each step
    const scored = library.map(step => {
      let score = step.priority || 5;

      // Condition match: +4 per matching condition
      if (step.conditions.includes("all")) {
        score += 4;
      } else {
        const condMatch = conditions.filter(c => step.conditions.includes(c)).length;
        score += condMatch * 4;
      }

      // Struggle match: +5
      if (step.struggles && step.struggles.includes(struggle)) {
        score += 5;
      }

      // Morning-specific filters
      if (period === "morning") {
        // Exercise preference — deprioritize but don't exclude
        if (step.requiresExercise === true && periodPrefs.morning_exercise === "no") score -= 6;
        if (step.requiresExercise === true && periodPrefs.morning_exercise === "sometimes") score -= 2;
        if (step.requiresExercise === "sometimes" && periodPrefs.morning_exercise === "no") score -= 4;
        if (step.requiresExercise === true && periodPrefs.morning_exercise === "yes") score += 3;
        if (step.tags && step.tags.includes("exercise") && periodPrefs.morning_exercise === "yes") score += 2;

        // Meditation preference — deprioritize but don't exclude
        if (step.requiresMeditation === true && periodPrefs.meditation === "no") score -= 6;
        if (step.requiresMeditation === "want_to_start" && periodPrefs.meditation === "no") score -= 4;
        if (step.requiresMeditation === true && periodPrefs.meditation === "yes") score += 3;
        if (step.requiresMeditation === "want_to_start" && periodPrefs.meditation === "want_to_start") score += 2;
        if (step.tags && step.tags.includes("mindfulness") && periodPrefs.meditation === "yes") score += 2;

        // Phone habit
        if (step.phoneRelated && periodPrefs.phone_first === "yes") score += 4;
        if (step.phoneRelated && periodPrefs.phone_first === "no") score -= 2;

        // Structure preference
        if (step.tags && step.tags.includes("structured") && periodPrefs.structure_pref === "structured") score += 2;
        if (step.tags && step.tags.includes("structured") && periodPrefs.structure_pref === "flexible") score -= 1;
      }

      // Evening-specific filters
      if (period === "evening") {
        if (step.screenRelated && periodPrefs.evening_screens === "no") score -= 3;
        if (step.screenRelated && periodPrefs.evening_screens === "yes") score += 3;

        // Sleep goal alignment
        if (periodPrefs.sleep_goal === "fall_asleep" && step.tags && step.tags.includes("breathing")) score += 3;
        if (periodPrefs.sleep_goal === "calm_mind" && step.tags && step.tags.includes("meditation")) score += 3;
        if (periodPrefs.sleep_goal === "calm_mind" && step.tags && step.tags.includes("processing")) score += 2;
        if (periodPrefs.sleep_goal === "stay_asleep" && step.tags && step.tags.includes("environment")) score += 3;
        if (periodPrefs.sleep_goal === "wake_rested" && step.tags && step.tags.includes("preparation")) score += 2;

        // Evening exercise preference
        if (step.requiresExercise === true && periodPrefs.evening_exercise === "yes") score += 5;
        if (step.requiresExercise === true && periodPrefs.evening_exercise === "no") score -= 6;
        if (step.requiresExercise === true && periodPrefs.evening_exercise === "sometimes") score -= 2;
        if (step.tags && step.tags.includes("exercise") && periodPrefs.evening_exercise === "yes") score += 4;
        if (step.tags && step.tags.includes("exercise") && periodPrefs.evening_exercise === "sometimes") score += 1;
        if (step.tags && step.tags.includes("exercise") && periodPrefs.evening_exercise === "no") score -= 4;

        // Evening meditation preference
        if (step.tags && step.tags.includes("meditation") && periodPrefs.evening_meditation === "yes") score += 4;
        if (step.tags && step.tags.includes("meditation") && periodPrefs.evening_meditation === "want_to_start") score += 2;
        if (step.tags && step.tags.includes("meditation") && periodPrefs.evening_meditation === "no") score -= 4;
        if (step.tags && step.tags.includes("mindfulness") && periodPrefs.evening_meditation === "yes") score += 2;
        if (step.requiresMeditation === true && periodPrefs.evening_meditation === "no") score -= 6;
      }

      return { ...step, score };
    }).filter(Boolean);

    // Sort by score descending
    scored.sort((a, b) => b.score - a.score);

    // Greedily pick steps within time budget
    let timeUsed = 0;
    const selected = [];
    for (const step of scored) {
      if (step.time === 0) {
        // Zero-time steps (habits/reminders) always included if scored well
        if (step.score >= 10) selected.push(step);
        continue;
      }
      if (timeUsed + step.time <= timeBudget) {
        selected.push(step);
        timeUsed += step.time;
      }
    }

    // Sort selected by order for logical flow
    selected.sort((a, b) => (a.order || 5) - (b.order || 5));

    // Convert to the same shape as DAILY_ROUTINES
    result[period] = selected.map(s => ({
      time: s.time > 0 ? `${s.time} min` : "Habit",
      title: s.title,
      desc: s.desc,
      tags: s.tags || [],
      isWorkout: s.requiresExercise === true,
    }));
  });

  return result;
}
