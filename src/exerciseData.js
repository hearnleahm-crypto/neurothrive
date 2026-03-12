export const EXERCISE_ROUTINES = {
  adhd: {
    label: "ADHD",
    neuroNote: "HIIT and martial arts spike dopamine + norepinephrine by 200–300%, mimicking stimulant medication through natural pathways. Short, intense bursts match ADHD's need for novelty and immediate reward — your brain literally can't get bored during a sprint.",
    warmup: { time: "5 min", title: "Dynamic Activation", desc: "Jumping jacks (30s), high knees (30s), arm circles (30s), butt kicks (30s), repeat once. Fast transitions keep dopamine-seeking brains engaged — no standing still." },
    exercises: [
      { time: "8 min", title: "Tabata Sprints", desc: "20 seconds all-out effort, 10 seconds rest, 8 rounds. Use a timer with audio cues. Tabata-style intervals produce the highest catecholamine (dopamine + norepinephrine) release of any exercise format." },
      { time: "8 min", title: "Shadow Boxing Combos", desc: "Jab-cross-hook-uppercut combos, 1 min on / 30s rest. Add footwork. Complex motor sequences demand full attentional engagement — the ADHD brain thrives when the body requires total focus." },
      { time: "6 min", title: "Burpee Ladder", desc: "1 burpee, rest 5s, 2 burpees, rest 5s… climb to 5, then back down. The changing rep count creates novelty each round, preventing the attention drift that kills ADHD workout adherence." },
    ],
    cooldown: { time: "5 min", title: "Grounding Stretch", desc: "Forward fold (60s), pigeon pose each side (60s), child's pose (60s). Slow breathing here transitions your nervous system from 'hunt mode' back to focused calm — the post-exercise executive function window." },
  },
  anxiety: {
    label: "Anxiety",
    neuroNote: "Yoga, swimming, and slow cardio activate the vagus nerve and shift your nervous system from sympathetic (fight-or-flight) to parasympathetic (rest-and-digest). The rhythmic breathing patterns increase vagal tone — your body's built-in anxiety brake.",
    warmup: { time: "5 min", title: "Breath-Paced Walking", desc: "Walk slowly: inhale for 4 steps, exhale for 6 steps. The extended exhale activates the parasympathetic nervous system before you even start exercising. This primes your body for calm exertion." },
    exercises: [
      { time: "10 min", title: "Slow Flow Yoga", desc: "Cat-cow (1 min) → downward dog (1 min) → warrior I each side (1 min) → warrior II each side (1 min) → tree pose each side (1 min) → seated forward fold (1 min). Hold each pose with slow nasal breathing. Yoga reduces cortisol more effectively than other exercise types in anxiety." },
      { time: "8 min", title: "Steady-State Walking or Swimming", desc: "Walk briskly or swim at a pace where you can still breathe through your nose. Nasal breathing activates the parasympathetic system. If your mouth opens, slow down. This 'conversational pace' cardio lowers baseline anxiety over weeks." },
      { time: "6 min", title: "Progressive Muscle Relaxation in Motion", desc: "Tense each muscle group for 5 seconds, then release while walking slowly: fists → forearms → shoulders → face → core → legs. Moving PMR teaches the anxious brain that relaxation and motion can coexist." },
    ],
    cooldown: { time: "5 min", title: "Legs-Up-The-Wall", desc: "Lie on your back with legs up a wall for 3 min, then 2 min of body scan breathing. This inverted position stimulates the baroreceptors in your neck, which directly activate the vagus nerve and lower heart rate." },
  },
  depression: {
    label: "Depression",
    neuroNote: "Morning walks with light exposure boost serotonin synthesis and BDNF (brain-derived neurotrophic factor) — your brain's natural growth fertilizer. Exercise is the most evidence-backed natural antidepressant: even 10 minutes of movement increases BDNF by 30%. The key is behavioural activation — doing it before you feel like it.",
    warmup: { time: "5 min", title: "Outdoor Light Walk", desc: "Step outside and walk slowly for 5 minutes. No goals, no pace target. Morning light hitting your retinas triggers cortisol awakening response — the natural 'wake up' signal that depression suppresses. Just being outside counts." },
    exercises: [
      { time: "10 min", title: "Brisk Walk or Light Jog", desc: "Walk fast enough that you're slightly out of breath, or alternate 1 min jogging / 2 min walking. You do not need to enjoy this. Behavioural activation means the mood improvement comes after the action, not before." },
      { time: "8 min", title: "Bodyweight Strength Circuit", desc: "5 squats → 5 push-ups (or wall push-ups) → 5 lunges each leg → 30s plank. Rest 60s, repeat twice. Resistance training increases BDNF and testosterone, both suppressed in depression. Start easy — consistency matters more than intensity." },
      { time: "5 min", title: "Rhythmic Movement", desc: "Dance to one song, do jumping jacks, or skip rope. Any rhythmic bilateral movement. Bilateral stimulation (alternating left-right) activates both brain hemispheres and has been shown to reduce rumination patterns." },
    ],
    cooldown: { time: "5 min", title: "Gratitude Stretch", desc: "Gentle stretching: reach overhead (60s), side bends (60s each), hamstring stretch (60s each). While stretching, name one thing your body did well today. Depression disconnects you from your body — this rebuilds the bridge." },
  },
  bipolar: {
    label: "Bipolar Disorder",
    neuroNote: "Moderate, steady-state cardio stabilises mood without the catecholamine spikes that can trigger hypomania. High-intensity exercise is risky during upswings — it can push the brain into a manic trajectory. The goal is consistency and predictability, not peak performance.",
    warmup: { time: "5 min", title: "Mood-Check Walk", desc: "Walk at an easy pace while rating your energy 1–10. If above 7, stay at moderate intensity today. If below 4, permission to do only the warmup and cooldown. Bipolar exercise must be mood-responsive, not rigid." },
    exercises: [
      { time: "12 min", title: "Steady-State Cardio", desc: "Walk briskly, cycle, or use an elliptical at a pace you could maintain for 30+ minutes. No intervals, no sprints. Keep heart rate in Zone 2 (can talk in full sentences). Steady-state cardio provides mood benefits without the neurochemical spikes that destabilise bipolar cycling." },
      { time: "8 min", title: "Controlled Strength Work", desc: "Slow, controlled reps: 8 squats (3s down, 3s up) → 8 push-ups (same tempo) → 8 rows with a band or weight → 30s plank. Rest 60s, repeat. Slow tempo prevents the adrenaline rush that high-speed lifting triggers." },
      { time: "5 min", title: "Walking Meditation", desc: "Walk very slowly, feeling each foot placement. Count steps to 10, restart. This is both exercise and mood regulation — it practises the intentional pacing that bipolar management requires." },
    ],
    cooldown: { time: "5 min", title: "Stability Stretch", desc: "Seated forward fold (90s), supine twist each side (60s), legs extended breathing (60s). Slow exhales. End by re-rating your mood 1–10. This bookend tracking builds awareness of exercise's effect on your cycling patterns." },
  },
  ptsd: {
    label: "PTSD",
    neuroNote: "Martial arts restore agency over the body that trauma took away. Yoga builds somatic regulation — the ability to notice body sensations without being overwhelmed by them. Both work within the 'window of tolerance', gradually expanding your nervous system's capacity to handle activation.",
    warmup: { time: "5 min", title: "Orienting & Grounding", desc: "Stand and slowly look around the room, naming 5 things you see. Then: feet on floor (press down), hands open and close 5x, gentle neck rolls. PTSD keeps the threat-detection system on — orienting tells your brainstem 'I am here, it is now, I am safe.'" },
    exercises: [
      { time: "8 min", title: "Empowerment Drills", desc: "Punching a pillow or shadow boxing: jab-cross combos (2 min), push-away movements with palms (2 min), stomping steps forward (2 min), power poses — hands on hips, chest open (2 min). These movements complete the self-protective actions your body couldn't perform during the trauma." },
      { time: "8 min", title: "Trauma-Sensitive Yoga", desc: "All poses are invitational, not commanded. Cat-cow (2 min) → mountain pose with grounding (2 min) → warrior II with eye contact to hands (2 min) → tree pose with wall support (2 min). Choice is central — PTSD involves loss of agency, so 'you might try' replaces 'you should.'" },
      { time: "6 min", title: "Bilateral Walking", desc: "Walk at a comfortable pace while alternately tapping your thighs (left-right-left-right). Bilateral stimulation is the mechanism behind EMDR — it helps process traumatic memories by engaging both brain hemispheres simultaneously." },
    ],
    cooldown: { time: "5 min", title: "Container Visualisation", desc: "Seated comfortably: imagine a strong container (safe, box, vault). Place any distress from today's session inside it. Close the container. Take 5 slow breaths. This ensures you leave the exercise session regulated, not activated." },
  },
  ocd: {
    label: "OCD",
    neuroNote: "Structured cardio with clear start/end points and a predictable format reduces OCD symptom severity by 30–40% in studies. The key is that the exercise structure satisfies the brain's need for order without feeding compulsive patterns. Aerobic exercise also normalises serotonin transmission in the orbitofrontal cortex — the brain region overactive in OCD.",
    warmup: { time: "5 min", title: "Counted Warm-Up", desc: "10 arm circles forward, 10 backward, 10 leg swings each side, 10 torso twists, 30s marching in place. The exact count is provided intentionally — OCD brains work better with explicit structure than open-ended 'just move around.'" },
    exercises: [
      { time: "10 min", title: "Structured Cardio Intervals", desc: "2 min brisk walk → 1 min jog, repeat 3 times, then 1 min walk. Exact same pattern every session. Predictability reduces anxiety about 'doing it wrong' while still providing the aerobic benefits that reduce intrusive thoughts." },
      { time: "8 min", title: "Resistance Circuit (Fixed Order)", desc: "Always in this order: 10 squats → 10 push-ups → 10 lunges (each) → 30s plank → 10 rows. Rest 60s, repeat. The fixed order is therapeutic — it satisfies the need for structure while the physical exertion reduces OCD-driven cortisol." },
      { time: "5 min", title: "Mindful Running or Walking", desc: "Run or walk while noticing intrusive thoughts without engaging them. Label each thought 'there's a thought' and return focus to your feet hitting the ground. This is ERP (exposure and response prevention) in motion — practising non-engagement with obsessions." },
    ],
    cooldown: { time: "5 min", title: "Defined Ending Sequence", desc: "Same every session: standing quad stretch (30s each), seated hamstring stretch (30s each), child's pose (60s), 5 slow breaths with eyes closed. Having a clear, repeatable ending prevents the 'did I finish properly?' doubt loop." },
  },
  bpd: {
    label: "Borderline PD",
    neuroNote: "High-intensity exercise burns the emotional energy that BPD generates in excess. It also activates the same distress tolerance mechanisms taught in DBT (Dialectical Behaviour Therapy). The intense physical sensation provides a safe, non-destructive way to regulate overwhelming emotions.",
    warmup: { time: "5 min", title: "Emotion-Check Activation", desc: "Rate your emotional intensity 1–10. Then: 30 jumping jacks, 30 mountain climbers, 30 high knees. The physical spike matches the internal intensity — rather than fighting the energy, you channel it." },
    exercises: [
      { time: "8 min", title: "HIIT Emotional Burn", desc: "30s all-out (burpees, sprints, or mountain climbers) → 30s rest, 8 rounds. Go as hard as you can during the work periods. The intense physical sensation gives the emotional brain something real and immediate to focus on — a DBT 'TIPP' skill in exercise form." },
      { time: "8 min", title: "Heavy Resistance Work", desc: "Heaviest weight you can safely manage: 8 squats → 8 overhead press → 8 deadlifts → 8 rows. Rest 90s, repeat. Heavy lifting requires total concentration — the brain cannot simultaneously ruminate and manage heavy load. This is physical mindfulness." },
      { time: "6 min", title: "Ice & Movement Protocol", desc: "Hold ice cubes in your hands for 30s, then do 1 min of intense movement (jumping, running, punching air). Repeat 3 times. Ice + movement is a DBT crisis survival strategy — the thermal shock activates the dive reflex, slowing heart rate and calming the limbic system." },
    ],
    cooldown: { time: "5 min", title: "Opposite-Action Stretch", desc: "Slow, gentle stretching — the opposite of what your body just did. Forward fold (90s), pigeon pose each side (60s), savasana (60s). DBT's 'opposite action' principle: after intense output, practise gentle input. Re-rate emotional intensity — it should be lower." },
  },
  autism: {
    label: "Autism Spectrum",
    neuroNote: "Swimming, hiking, and rhythmic movement provide exercise with minimal sensory overwhelm. Predictable, repetitive motion patterns are regulating for the autistic nervous system — they reduce sensory processing demands while still delivering the neurological benefits of exercise.",
    warmup: { time: "5 min", title: "Sensory-Friendly Warm-Up", desc: "Gentle joint rotations in a quiet space: ankles, knees, hips, wrists, shoulders, neck. 10 rotations each, same direction each time. Wear comfortable clothing. Consistent, predictable movements prepare the body without sensory surprise." },
    exercises: [
      { time: "10 min", title: "Rhythmic Cardio", desc: "Choose one: swimming laps, walking a familiar route, cycling a flat path, or using a rowing machine. Maintain the same pace throughout. Rhythmic, repetitive movement is deeply regulating for the autistic nervous system — it reduces cortisol and increases feel-good endorphins without the unpredictability of team sports." },
      { time: "8 min", title: "Proprioceptive Strength Work", desc: "Wall push-ups (10) → bodyweight squats (10) → farmer's carry with heavy objects (60s) → bear crawl (30s). Rest 60s, repeat. These exercises provide deep proprioceptive input — heavy work through the joints — which is calming and organising for the autistic sensory system." },
      { time: "5 min", title: "Trampoline or Bouncing", desc: "Bounce on a trampoline, exercise ball, or do calf raises rhythmically for 5 minutes. Vestibular input (bouncing/rocking) is one of the most effective sensory regulation tools. It stimulates the cerebellum, improving motor coordination and emotional regulation simultaneously." },
    ],
    cooldown: { time: "5 min", title: "Weighted Compression Cool-Down", desc: "Lie under a weighted blanket or wrap tightly in a blanket for 3 min, then gentle stretching for 2 min. Deep pressure stimulates the parasympathetic nervous system — the same mechanism behind the calming effect of weighted blankets and compression clothing." },
  },
  neuro_core: {
    label: "Neuro Core Plan",
    neuroNote: "Periodised training combining Zone 2 cardio and progressive resistance maximises neuroplasticity, BDNF production, and long-term cognitive performance. Zone 2 cardio (60–70% max HR) is the sweet spot for mitochondrial biogenesis in the brain. Resistance training upregulates IGF-1, which crosses the blood-brain barrier and promotes neural growth.",
    warmup: { time: "5 min", title: "Neural Priming", desc: "2 min light jog, then: cross-body toe touches (10), single-leg balance (30s each), lateral shuffles (30s). Cross-lateral movements activate the corpus callosum, priming both hemispheres for the workout ahead." },
    exercises: [
      { time: "10 min", title: "Zone 2 Cardio Block", desc: "Run, cycle, row, or swim at a pace where you can still hold a conversation (60–70% max HR). This is the #1 exercise for brain longevity. Zone 2 effort maximises mitochondrial density in neurons, improving energy supply to every brain function." },
      { time: "8 min", title: "Compound Resistance Circuit", desc: "5 squats → 5 push-ups → 5 bent-over rows → 5 overhead press → 30s plank. Rest 60s, repeat 2–3 times. Compound movements that cross multiple joints produce the highest systemic IGF-1 and growth hormone response — both cross the blood-brain barrier." },
      { time: "6 min", title: "Skill Acquisition Drill", desc: "Learn a new movement: single-leg deadlift, Turkish get-up progression, or juggling. Spend 6 minutes on deliberate practice. Novel motor learning is the most potent driver of neuroplasticity — it literally grows new synaptic connections in real time." },
    ],
    cooldown: { time: "5 min", title: "Parasympathetic Reset", desc: "Foam roll or stretch major muscle groups (90s), then box breathing: 4 counts in, 4 hold, 4 out, 4 hold, repeat 5 times. The shift from sympathetic to parasympathetic is when the brain consolidates the neuroplastic changes triggered by exercise." },
  },
  default: {
    label: "General Wellness",
    neuroNote: "A balanced mix of cardio and mobility supports overall brain health, mood regulation, and cognitive function. Regular exercise increases BDNF, improves sleep quality, and reduces inflammation — three pillars of mental wellness regardless of specific conditions.",
    warmup: { time: "5 min", title: "Full-Body Warm-Up", desc: "March in place (60s), arm circles (30s), leg swings (30s each side), torso twists (30s), gentle squats (30s). Gradually increasing heart rate and joint mobility prepares your body for safe, effective exercise." },
    exercises: [
      { time: "10 min", title: "Moderate Cardio", desc: "Brisk walk, light jog, cycling, or any activity that gets you slightly out of breath but still able to talk. Moderate cardio is the most studied form of exercise for brain health — 150 minutes per week reduces cognitive decline risk by 38%." },
      { time: "8 min", title: "Bodyweight Strength", desc: "10 squats → 10 push-ups (or modified) → 10 lunges each leg → 30s plank. Rest 60s, repeat twice. Resistance training maintains muscle mass, bone density, and insulin sensitivity — all protective factors for long-term brain health." },
      { time: "5 min", title: "Mobility Flow", desc: "Cat-cow (60s) → world's greatest stretch each side (60s) → hip circles (30s each) → shoulder dislocates with band or towel (60s). Mobility work reduces chronic tension patterns that contribute to fatigue, poor posture, and stress accumulation." },
    ],
    cooldown: { time: "5 min", title: "Gentle Cool-Down", desc: "Slow walking (60s), standing quad stretch (30s each), forward fold (60s), deep breathing with arms overhead (60s). Transitioning gradually back to rest ensures your nervous system returns to baseline calm." },
  },
};
