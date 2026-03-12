export const EXERCISE_ROUTINES = {
  adhd: {
    label: "ADHD",
    options: [
      { emoji: "🏃", title: "HIIT / Cardio Sprints", desc: "Vigorous cardio rapidly elevates dopamine and norepinephrine — the same neurotransmitters targeted by stimulant medications like Adderall. A single 20–30 minute session improves attention and reduces hyperactivity for 60–90 minutes afterward, with regular training growing new dopamine receptors in frontostriatal circuits." },
      { emoji: "🥋", title: "Martial Arts", desc: "Complex sequential movement patterns (forms, combos, grappling) activate the cerebellum and prefrontal cortex simultaneously, producing greater increases in BDNF than simple repetitive exercise. Memorising techniques trains executive function and inhibitory control — two core ADHD deficits." },
      { emoji: "🧗", title: "Rock Climbing / Bouldering", desc: "Demands rapid problem-solving, route-planning, and coordinated multi-limb action — forcing the prefrontal cortex online. Research shows ADHD brains demonstrate significantly larger improvements in attention and inhibitory control from cognitively engaging exercise compared to neurotypical brains." },
      { emoji: "🏀", title: "Team Sports", desc: "Open-skill sports requiring split-second environmental adaptation (basketball, soccer, tennis) show superior effects on executive function versus repetitive activities. The social accountability also provides external structure that compensates for weak internal self-regulation." },
      { emoji: "🏊", title: "Swimming", desc: "Combines sustained aerobic output — boosting catecholamines — with rhythmic bilateral movement that engages both hemispheres. Controlled studies show outdoor exercise reduces ADHD symptoms significantly more than indoor activity, making outdoor swimming especially effective." },
    ],
  },
  anxiety: {
    label: "Anxiety",
    options: [
      { emoji: "🧘", title: "Yoga", desc: "A 12-week yoga study measured brain GABA levels directly via MRS imaging and found yoga increased thalamic GABA significantly more than metabolically matched walking, with greater reductions in anxiety. GABA is the brain's primary calming neurotransmitter — yoga literally builds your brain's anxiety brake." },
      { emoji: "🏊", title: "Swimming / Cold Water", desc: "Cold water triggers the mammalian dive reflex, directly stimulating the vagus nerve and shifting autonomic balance toward parasympathetic dominance. This increases vagal tone — people with higher vagal tone show blunted cortisol surges during stress and faster return to baseline calm." },
      { emoji: "🚶", title: "Walking (Outdoors / Nature)", desc: "Moderate walking reduces cortisol through HPA axis regulation. A systematic meta-analysis found walking at approximately 300 MET-minutes per week produces optimal cortisol reduction, with diminishing returns at higher intensities — evidence that moderate effort is the sweet spot for anxiety." },
      { emoji: "🤸", title: "Tai Chi", desc: "Slow, meditative movement decreases respiratory rate and promotes parasympathetic dominance, reducing HPA axis stress responses. Neuroimaging shows Tai Chi increases prefrontal cortex grey matter and functional connectivity to emotion-regulation regions, enhancing top-down control over the amygdala." },
      { emoji: "💪", title: "Pilates", desc: "Controlled breathing anchors attention to the present moment, activating the parasympathetic nervous system and lowering cortisol. Pilates activates multiple interoceptive channels — proprioception, visceroception through breath — and improved interoceptive awareness directly correlates with enhanced emotional regulation." },
    ],
  },
  depression: {
    label: "Depression",
    options: [
      { emoji: "🏃", title: "Running / Aerobic Exercise", desc: "A review of 100+ studies over 20 years confirms aerobic exercise elevates BDNF, which drives hippocampal neurogenesis — directly counteracting the hippocampal volume loss seen in depression. Exercise has been shown to be as effective as antidepressants for treating mild-to-moderate depression." },
      { emoji: "💃", title: "Dance", desc: "A 2024 BMJ meta-analysis of 218 clinical trials found dance reduced depression symptoms more than walking, yoga, strength training, and even standard antidepressants. Dance simultaneously triggers dopamine (motivation), serotonin (mood stability), and oxytocin (from social movement), activating multiple antidepressant pathways at once." },
      { emoji: "🏋️", title: "Strength / Resistance Training", desc: "Both acute and chronic resistance exercise elevate BDNF and testosterone — both suppressed in depression. The structured goal-progression of adding weight or reps over time provides the sense of mastery and self-efficacy that depression erodes, making it uniquely motivating." },
      { emoji: "🧗", title: "Rock Climbing / Bouldering", desc: "A multicentre randomised trial found bouldering psychotherapy was more effective than standard exercise for depression, producing results comparable to CBT. You cannot ruminate mid-climb — the mandatory present-moment focus engages prefrontal circuits while boosting dopamine and norepinephrine." },
      { emoji: "🏊", title: "Swimming", desc: "Swimming increases sensitivity of serotonin receptors (5-HT2 and 5-HT1A) while elevating tryptophan hydroxylase and serotonin levels. The rhythmic bilateral strokes combined with controlled breathing create a meditative state, and cold water triggers dopamine, serotonin, and beta-endorphin release simultaneously." },
    ],
  },
  bipolar: {
    label: "Bipolar Disorder",
    options: [
      { emoji: "🚶", title: "Walking (Consistent, Timed)", desc: "Rhythmic, moderate-intensity walking helps stabilise circadian activity rhythms — and research shows dampened circadian rhythm significantly predicts mood episode relapse. Walking at the same time daily entrains the social rhythm that Interpersonal and Social Rhythm Therapy (IPSRT) identifies as key to relapse prevention." },
      { emoji: "🏊", title: "Swimming", desc: "Activities with inherent rhythm provide calming, mood-regulating effects through their cadenced nature. The moderate intensity avoids sympathetic nervous system overactivation that high-intensity exercise can trigger — which has been linked to manic and hypomanic episodes in bipolar patients." },
      { emoji: "🧘", title: "Gentle Yoga (Not Hot Yoga)", desc: "Mind-body exercise sessions of one hour or less, more than 5 times per week, showed the greatest clinical benefits for bipolar depression in a systematic review. Important: avoid rapid/energetic breathing techniques and hot yoga, which can increase agitation or trigger manic symptoms." },
      { emoji: "🏋️", title: "Strength Training (Moderate)", desc: "A proof-of-concept study using supervised resistance exercises 3x/week for 12 weeks significantly reduced bipolar depressive symptoms. The structured, predictable nature of weight training provides routine without the excessive sympathetic activation risk associated with HIIT." },
      { emoji: "🚴", title: "Cycling (Steady-State)", desc: "Moderate-intensity steady cycling reduces depressive and anxiety symptoms in bipolar disorder per meta-analysis, while avoiding the mania-triggering risk documented with marathon training or HIIT. The repetitive, rhythmic pedalling also supports circadian rhythm stabilisation." },
    ],
  },
  ptsd: {
    label: "PTSD",
    options: [
      { emoji: "🧘", title: "Trauma-Informed Yoga", desc: "Gentle yoga strengthens interoception — awareness of internal body cues — and increases emotion regulation. Slow breathing enhances vagal activity, reducing psychophysiological arousal and shifting the autonomic nervous system out of fight-or-flight. All poses are invitational, never commanded — restoring the sense of choice trauma removed." },
      { emoji: "🥋", title: "Martial Arts", desc: "A one-year study with 30 veterans found PTSD stress and coping improved by 80% — results a USF researcher called 'so dramatic' they exceeded what's typically seen with traditional PTSD therapies. Controlled aggression combined with discipline helps survivors reclaim physical agency that trauma took away." },
      { emoji: "🥊", title: "Boxing (Non-Contact)", desc: "A scoping review found non-contact boxing in group HIIT settings produced significant reductions in PTSD, anxiety, and depression symptoms. The high-intensity catecholamine release combined with punching as a safe physical expression of stored trauma energy helps recalibrate the HPA axis stress response." },
      { emoji: "🏋️", title: "Strength Training", desc: "In a controlled trial, resistance training outperformed usual care in reducing PTSD symptoms. Lifting helps trauma survivors reconnect with their physical power and rebuild bodily agency, while exercise stabilises cortisol secretion patterns and improves HPA axis negative feedback mechanisms." },
      { emoji: "🧘‍♂️", title: "Mindful Stretching + Deep Breathing", desc: "An RCT in the Journal of Clinical Psychology found mindfulness-based stretching with deep breathing significantly reduced PTSD symptoms. The combination enhances vagal tone, reduces sympathetic arousal, and trains the nervous system to tolerate body sensations without triggering a trauma response — directly addressing polyvagal dysfunction." },
    ],
  },
  ocd: {
    label: "OCD",
    options: [
      { emoji: "🏃", title: "Aerobic Exercise (Running / Cycling)", desc: "A meta-analysis found a large effect size (g = 1.33) for OCD symptom reduction from exercise — aerobic activity produced significantly larger reductions in compulsions and anxiety vs. health education. An RCT of 125 participants showed exercise frequency specifically predicted OCD symptom reduction." },
      { emoji: "🧘", title: "Yoga", desc: "A randomised controlled trial found yoga significantly improved obsessions, compulsions, anxiety, and depression versus waitlist controls. The mechanism is twofold: yoga increases brain GABA levels (low GABA is implicated in OCD), and mindful practice builds the ability to observe intrusive thoughts without reacting — functionally mimicking ERP therapy." },
      { emoji: "🏊", title: "Swimming", desc: "The rhythmic, repetitive-but-purposeful nature of swimming provides structured sensory input that can satisfy the brain's need for pattern completion without engaging compulsive rituals. The serotonergic boost from sustained aerobic swimming targets the same neurotransmitter system as SSRIs — the first-line medication for OCD." },
      { emoji: "🏋️", title: "Strength Training (Structured)", desc: "Progressive resistance training provides the structured routine and predictable progression that the OCD brain craves, channelled into a healthy outlet. The focused attention on form and counting creates a mindful, present-moment anchor that disrupts obsessive thought loops while building distress tolerance." },
      { emoji: "🤸", title: "Tai Chi", desc: "Slow, deliberate movement requires sustained attention to body position, training the prefrontal cortex to maintain top-down control over the hyperactive cortico-striato-thalamo-cortical (CSTC) loop implicated in OCD. Research shows Tai Chi increases prefrontal grey matter, which may strengthen the inhibitory control needed to resist compulsions." },
    ],
  },
  bpd: {
    label: "Borderline PD",
    options: [
      { emoji: "🔥", title: "HIIT / Intense Cardio", desc: "Research on BPD patients found acute physical exercise reduced negative affect, with participants reporting being less reactive and more patient when encountering irritating events afterward — directly targeting emotional dysregulation, BPD's core feature. High intensity matches the internal intensity, channelling it constructively." },
      { emoji: "🧘", title: "Yoga", desc: "Identified among the six evidence-based physical activity modalities for BPD, yoga targets the heightened amygdala reactivity by activating the parasympathetic nervous system and increasing prefrontal-amygdala connectivity — helping regulate the emotional hyperreactivity that defines the condition." },
      { emoji: "💃", title: "Dance Movement", desc: "Dance movement therapy addresses emotional regulation — the most prominent rationale for physical activity in BPD treatment — while also enhancing social skills through synchronised movement. The oxytocin release from social-rhythmic movement may help repair the attachment system dysfunction underlying BPD." },
      { emoji: "🥋", title: "Martial Arts", desc: "BPD shares overlapping neurobiology with ADHD — particularly dopaminergic dysfunction and impulse control deficits. Martial arts provide controlled aggression outlets, impulse regulation training, and structured social hierarchy, addressing impulsivity, rage, and interpersonal instability simultaneously." },
      { emoji: "🏊", title: "Swimming", desc: "Rhythmic bilateral movement combined with cold-water vagal stimulation helps regulate the autonomic nervous system dysregulation seen in BPD. The sensory immersion provides grounding that can interrupt dissociative episodes, while lap swimming provides emotional regulation practice without interpersonal triggers." },
    ],
  },
  autism: {
    label: "Autism Spectrum",
    options: [
      { emoji: "🏊", title: "Swimming", desc: "Aquatic exercise provides deep proprioceptive pressure from water resistance on all sides, calming the sensory system. The reduced gravity environment decreases vestibular overwhelm, while rhythmic bilateral movement improves motor coordination and sensory integration. Research confirms swimming reduces stereotypical behaviours and improves concentration." },
      { emoji: "🥋", title: "Martial Arts (Structured)", desc: "Martial arts improve self-regulation, reduce anxiety, and enhance body awareness in autistic individuals. The predictable structure — bowing, kata sequences, clear rank progression — provides the routine ASD brains need, while proprioceptive input from strikes activates the arousal centre to maintain an optimal state for learning." },
      { emoji: "🏋️", title: "Heavy Resistance / Weight Training", desc: "Heavy work activities — pushing, pulling, carrying heavy loads — provide deep proprioceptive input that helps regulate sensory processing difficulties common in ASD. Research shows proprioceptive exercises effectively reduce hyperactivity and impulsivity by stimulating proprioceptors that calibrate the brain's arousal centre." },
      { emoji: "🧗", title: "Rock Climbing", desc: "Climbing provides intense proprioceptive and vestibular input through weight-bearing grip and full-body spatial awareness. Sensory integration-based interventions that include climbing effectively enhance motor coordination, behavioural adaptation, emotional regulation, and social engagement in autistic individuals." },
      { emoji: "🚴", title: "Cycling", desc: "Repetitive, rhythmic bilateral movement with predictable sensory input suits the ASD preference for routine and pattern. Aerobic cycling improves cardiovascular health while reducing anxiety and sensory-seeking behaviours. The solo, self-paced nature accommodates sensory sensitivities without social overwhelm." },
    ],
  },
  neuro_core: {
    label: "Neuro Core Plan",
    options: [
      { emoji: "🔥", title: "HIIT (High-Intensity Interval Training)", desc: "High-intensity exercise is the most effective modality for elevating BDNF — the master neuroplasticity protein. BDNF drives hippocampal neurogenesis, synaptogenesis, and long-term potentiation (the cellular basis of learning and memory). The BDNF–TrkB receptor interaction is maximised by vigorous effort." },
      { emoji: "💃", title: "Complex Motor Learning (Dance / Martial Arts)", desc: "Neuromotor-oriented activities that combine physical exertion with cognitive challenge produce enhanced neuroplastic advantages beyond simple aerobic exercise. Research shows these activities reliably boost BDNF while also increasing cerebellar growth and prefrontal connectivity." },
      { emoji: "🏋️", title: "Strength Training", desc: "Both acute and chronic resistance training elevate BDNF and other neurotrophic factors (GDNF, NGF). Progressive overload provides ongoing neuroplastic stimulus, and the cognitive demands of tracking sets, form, and progressive loading engage executive function alongside physical adaptation." },
      { emoji: "🤸", title: "Tai Chi", desc: "Neuroimaging confirms Tai Chi increases prefrontal cortex grey matter, enhances functional connectivity between brain hemispheres, and improves executive function. The dual-task nature — movement plus mindful attention — uniquely trains the attention networks that govern cognitive performance." },
      { emoji: "🚴", title: "Zone 2 Cardio (Cycling / Running / Swimming)", desc: "Sustained moderate-intensity aerobic exercise is the most comprehensively studied intervention for brain health. It increases BDNF, promotes hippocampal neurogenesis, improves cerebral blood flow, and reduces neuroinflammation — over 100+ studies spanning 20 years confirm the positive BDNF modulation from regular aerobic training." },
    ],
  },
  default: {
    label: "General Wellness",
    options: [
      { emoji: "🏃", title: "Cardio (Running / Walking / Cycling)", desc: "Moderate aerobic exercise is the most studied form of exercise for brain health — 150 minutes per week reduces cognitive decline risk by 38%. Regular cardio elevates BDNF, improves cerebral blood flow, enhances sleep quality, and reduces systemic inflammation, supporting mood and cognition." },
      { emoji: "🏋️", title: "Strength Training", desc: "Resistance training maintains muscle mass, bone density, and insulin sensitivity — all protective factors for long-term brain health. Both acute and chronic strength work elevate BDNF and growth hormone, and the goal-progression structure builds motivation and self-efficacy over time." },
      { emoji: "🧘", title: "Yoga", desc: "Yoga increases brain GABA levels, reduces cortisol, and improves the prefrontal-amygdala connectivity that governs emotional regulation. The combination of physical postures, controlled breathing, and mindful attention provides benefits that pure cardio or pure meditation alone cannot match." },
      { emoji: "🏊", title: "Swimming", desc: "Swimming provides full-body aerobic exercise with minimal joint impact. The rhythmic bilateral movement engages both brain hemispheres, the controlled breathing activates the parasympathetic system, and water immersion provides calming proprioceptive input from all directions." },
      { emoji: "💃", title: "Dance", desc: "A major BMJ meta-analysis found dance to be one of the most effective exercise modalities for mental health outcomes. It simultaneously activates dopamine (reward), serotonin (mood), and oxytocin (social bonding) pathways while requiring the complex motor learning that drives neuroplasticity." },
    ],
  },
};
