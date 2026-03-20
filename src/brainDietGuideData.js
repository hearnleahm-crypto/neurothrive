// ── Brain Diet Guide: Condition-Specific Nutritional Guidance ────────────────
// Each condition has: priorityNutrients, powerFoods, foodsToMinimize, mealPattern

export const BRAIN_DIET_GUIDE = {
  adhd: {
    label: "ADHD",
    emoji: "⚡",
    summary: "ADHD brains burn through dopamine and norepinephrine faster than average. Your diet should prioritize dopamine precursors (tyrosine, phenylalanine), the cofactors that convert them (iron, B6, zinc), and the omega-3 fats that build and maintain prefrontal cortex cell membranes.",
    priorityNutrients: [
      { name: "Tyrosine", role: "Direct precursor to dopamine and norepinephrine – the two neurotransmitters ADHD brains are most deficient in", topSources: "chicken, salmon, eggs, turkey, almonds" },
      { name: "Omega-3 DHA & EPA", role: "DHA builds prefrontal cortex cell membranes; EPA increases dopamine receptor sensitivity and reduces neuroinflammation", topSources: "wild salmon, sardines, mackerel, walnuts, flaxseed" },
      { name: "Iron", role: "Required for tyrosine hydroxylase, the enzyme that converts tyrosine to dopamine. This is the rate-limiting step in dopamine synthesis", topSources: "red meat, spinach, lentils, pumpkin seeds" },
      { name: "Zinc", role: "Cofactor for dopamine transport and GABA synthesis; 95% of children with ADHD show low zinc in some studies", topSources: "beef, pumpkin seeds, chickpeas, cashews" },
      { name: "Magnesium", role: "Modulates dopamine release and reduces the neural hyperexcitability that drives impulsivity and restlessness", topSources: "dark leafy greens, almonds, avocado, dark chocolate" },
      { name: "Vitamin B6", role: "Rate-limiting cofactor for both dopamine and norepinephrine synthesis. Without B6, your brain cannot complete the conversion", topSources: "chicken, salmon, potatoes, bananas" },
    ],
    powerFoods: [
      { food: "Wild Salmon", why: "Highest bioavailable DHA + EPA; directly increases dopamine receptor density in the prefrontal cortex" },
      { food: "Eggs", why: "Contain tyrosine, choline, B12, and vitamin D in one package. Covers 4 ADHD-critical pathways simultaneously" },
      { food: "Grass-Fed Beef", why: "Richest source of heme iron (3× more absorbable than plant iron) plus zinc and B12 for dopamine synthesis" },
      { food: "Blueberries", why: "Anthocyanins increase prefrontal cortex blood flow and improve working memory in controlled ADHD studies" },
      { food: "Pumpkin Seeds", why: "One of the only foods delivering zinc, magnesium, tryptophan, and iron together. Covers the entire dopamine pathway" },
      { food: "Spinach", why: "Dense in folate, iron, and magnesium – three nutrients consistently found to be low in ADHD populations" },
      { food: "Walnuts", why: "Richest plant source of ALA omega-3; also contain melatonin and polyphenols that reduce neuroinflammation" },
      { food: "Sweet Potatoes", why: "Complex carbs with a low glycemic index; provide sustained glucose to the prefrontal cortex without blood sugar spikes" },
      { food: "Turkey", why: "Highest tryptophan content of any meat; B6 and zinc for neurotransmitter synthesis" },
      { food: "Sardines", why: "Highest omega-3 to mercury ratio of any fish; also deliver vitamin D, B12, and calcium" },
      { food: "Dark Chocolate (70%+)", why: "Flavanols increase cerebral blood flow; PEA boosts dopamine; magnesium supports GABA" },
      { food: "Avocado", why: "Oleic acid supports myelin health in prefrontal pathways; potassium and folate for nerve function" },
      { food: "Oranges", why: "Vitamin C is a cofactor for dopamine synthesis and enhances iron absorption. Without vitamin C, plant-based iron is up to 6× less absorbable" },
      { food: "Bananas", why: "Rich in vitamin B6, the rate-limiting cofactor for converting tyrosine to dopamine; also provide magnesium and resistant starch for sustained energy" },
      { food: "Pomegranate", why: "Punicalagins and ellagic acid increase cerebral blood flow to the prefrontal cortex by up to 30%; potent neuroprotective antioxidant" },
      { food: "Strawberries", why: "Fisetin improves long-term memory consolidation; vitamin C supports dopamine synthesis; anthocyanins reduce prefrontal neuroinflammation" },
      { food: "Kiwi", why: "One of the highest vitamin C foods per gram; also contains serotonin and actinidain for gut health. Gut-brain axis support for dopamine production" },
      { food: "Cherries (tart)", why: "Natural source of melatonin for sleep regulation. Sleep deprivation worsens ADHD symptoms by up to 50%. Also rich in anti-inflammatory anthocyanins" },
      { food: "Apples", why: "Quercetin protects dopaminergic neurons from oxidative damage; pectin fiber feeds gut bacteria that produce short-chain fatty acids supporting brain function" },
      { food: "Blackberries", why: "Among the highest antioxidant fruits; polyphenols improve executive function and reduce the oxidative stress elevated in ADHD brains" },
    ],
    foodsToMinimize: [
      { food: "Refined sugar & candy", why: "Spikes dopamine rapidly then crashes it. This rollercoaster worsens impulsivity and creates a cycle of craving that mimics ADHD medication rebound" },
      { food: "Artificial food dyes (Red 40, Yellow 5/6)", why: "Multiple controlled studies show synthetic dyes worsen ADHD symptoms by disrupting dopamine signaling; banned or warning-labeled in the EU" },
      { food: "Highly processed foods", why: "Contain inflammatory seed oils, preservatives, and additives that increase neuroinflammation in the prefrontal cortex" },
      { food: "Sugary breakfast cereals", why: "Cause rapid glucose spikes and crashes within 2 hours. The worst way to start the day for an ADHD brain that needs stable fuel" },
      { food: "Excessive caffeine", why: "While moderate caffeine can help focus, excess caffeine depletes magnesium and disrupts sleep. Both worsen ADHD significantly" },
      { food: "Soda & energy drinks", why: "Combine sugar, caffeine, and artificial colors – three ADHD-aggravating ingredients in one beverage" },
      { food: "Simple carbs without protein", why: "White bread, crackers, or pasta eaten alone cause blood sugar spikes that ADHD brains are especially vulnerable to" },
    ],
    mealPattern: {
      frequency: "3 meals + 1–2 protein-rich snacks",
      macroSplit: "30% protein, 40% complex carbs, 30% healthy fats",
      timing: "Protein-heavy breakfast within 1 hour of waking. The prefrontal cortex needs tyrosine immediately after overnight depletion",
      keyRule: "Never eat carbs alone. Pair every carb with protein or healthy fat to prevent the glucose crashes your dopamine system is uniquely vulnerable to."
    }
  },

  anxiety: {
    label: "Anxiety",
    emoji: "🌿",
    summary: "Anxiety involves an overactive amygdala and depleted GABA/serotonin systems. Your diet should prioritize calming nutrients (magnesium, tryptophan, B vitamins), anti-inflammatory foods that quiet neuroinflammation, and gut-supporting foods since 95% of serotonin is made in the gut.",
    priorityNutrients: [
      { name: "Magnesium", role: "Directly activates GABA-A receptors – the brain's primary calming system. Found to be low in up to 75% of anxious individuals", topSources: "dark leafy greens, pumpkin seeds, almonds, dark chocolate" },
      { name: "Tryptophan", role: "The sole precursor to serotonin. Your brain cannot produce serotonin without dietary tryptophan", topSources: "turkey, eggs, salmon, pumpkin seeds, yogurt" },
      { name: "Omega-3 EPA", role: "Reduces inflammatory cytokines (IL-6, TNF-alpha) that activate the brain's threat-detection circuits", topSources: "salmon, sardines, mackerel, walnuts" },
      { name: "B Vitamins (B6, B12, Folate)", role: "Required cofactors for serotonin and GABA synthesis; B vitamin deficiency directly increases anxiety severity", topSources: "eggs, leafy greens, legumes, salmon" },
      { name: "Vitamin D", role: "Activates serotonin gene expression; deficiency found in up to 80% of anxiety patients", topSources: "salmon, sardines, eggs, fortified foods" },
      { name: "Probiotics", role: "Gut bacteria produce 95% of serotonin; Lactobacillus strains reduce cortisol and anxiety in randomized controlled trials", topSources: "yogurt, kefir, kimchi, sauerkraut" },
    ],
    powerFoods: [
      { food: "Wild Salmon", why: "EPA directly reduces inflammatory cytokines that activate the amygdala; also provides vitamin D for serotonin gene expression" },
      { food: "Yogurt / Kefir", why: "Probiotic strains (L. rhamnosus) reduce cortisol by up to 20% in clinical trials through vagus nerve signaling" },
      { food: "Dark Leafy Greens", why: "Densest dietary source of magnesium; also provide folate for serotonin synthesis and fiber for gut health" },
      { food: "Eggs", why: "Contain tryptophan, choline, B12, and vitamin D – four anxiety-critical nutrients in one food" },
      { food: "Turkey", why: "Highest tryptophan content of any common protein; tryptophan is the sole precursor to serotonin" },
      { food: "Pumpkin Seeds", why: "Deliver magnesium, zinc, and tryptophan together – the complete GABA and serotonin support package" },
      { food: "Blueberries", why: "Anthocyanins and vitamin C reduce cortisol; high-antioxidant diets correlate with lower anxiety scores" },
      { food: "Chamomile Tea", why: "Apigenin binds GABA-A receptors with a similar mechanism to anti-anxiety medications" },
      { food: "Avocado", why: "B vitamins, magnesium, and potassium in one food; oleic acid triggers calming OEA release" },
      { food: "Almonds", why: "Magnesium + vitamin E; vitamin E protects the amygdala from oxidative stress that amplifies anxiety" },
      { food: "Sweet Potatoes", why: "Complex carbs raise brain tryptophan levels more effectively than protein alone; also provide B6 for serotonin synthesis" },
      { food: "Kimchi / Sauerkraut", why: "Fermented foods improve vagal tone and gut-brain signaling, reducing the inflammatory signals that trigger anxiety" },
      { food: "Oranges", why: "Vitamin C reduces cortisol by up to 25% in stress studies; hesperidin calms the nervous system and supports adrenal recovery" },
      { food: "Bananas", why: "B6 is required for GABA synthesis – the brain's main calming neurotransmitter. Potassium helps regulate heart rate during anxious episodes" },
      { food: "Kiwi", why: "Contains natural serotonin; two kiwis before bed improved sleep onset by 35% in clinical studies. Critical since sleep deprivation amplifies anxiety" },
      { food: "Cherries (tart)", why: "Natural melatonin source that supports sleep quality; anthocyanins reduce the neuroinflammation that keeps the amygdala on high alert" },
      { food: "Dark Chocolate (70%+)", why: "Flavanols lower cortisol and increase calming serotonin; magnesium activates GABA receptors" },
    ],
    foodsToMinimize: [
      { food: "Caffeine (excessive)", why: "Blocks adenosine receptors and stimulates cortisol/adrenaline release. Directly activates the same fight-or-flight pathways anxiety already overuses" },
      { food: "Alcohol", why: "Depletes GABA receptors over time; the 'calm' feeling is borrowed from tomorrow's anxiety (rebound anxiety is neurologically inevitable)" },
      { food: "Refined sugar", why: "Causes cortisol spikes during blood sugar crashes; the body interprets low glucose as a threat, triggering the exact anxiety cascade" },
      { food: "Highly processed foods", why: "Inflammatory seed oils and additives increase systemic inflammation that crosses the blood-brain barrier and activates threat circuits" },
      { food: "Artificial sweeteners (aspartame)", why: "May inhibit serotonin and dopamine production; some individuals report increased anxiety with regular consumption" },
      { food: "Excess sodium", why: "High sodium increases blood pressure and cortisol, creating physical sensations the anxious brain interprets as panic" },
    ],
    mealPattern: {
      frequency: "3 meals + 1–2 calming snacks (no skipping meals)",
      macroSplit: "25% protein, 45% complex carbs, 30% healthy fats",
      timing: "Complex carbs in the evening to boost serotonin before sleep; avoid caffeine after noon",
      keyRule: "Never let blood sugar crash. Every crash triggers cortisol and adrenaline – the exact hormones your anxious brain overproduces. Eat every 3–4 hours."
    }
  },

  depression: {
    label: "Depression",
    emoji: "🌅",
    summary: "Depression involves depleted serotonin, reduced BDNF (the protein that builds new neural connections), and elevated neuroinflammation. Your diet should prioritize serotonin precursors, anti-inflammatory omega-3s, and gut health since the gut microbiome produces most of your brain's serotonin.",
    priorityNutrients: [
      { name: "Omega-3 EPA", role: "As effective as antidepressants for mild-to-moderate depression in multiple meta-analyses; reduces the neuroinflammation that suppresses serotonin production", topSources: "salmon, sardines, mackerel, anchovies" },
      { name: "Folate (B9)", role: "The single strongest nutritional predictor of depression; required for SAMe production, one of the most effective natural antidepressant compounds", topSources: "leafy greens, lentils, beans, asparagus" },
      { name: "Vitamin D", role: "Activates tryptophan hydroxylase 2, the enzyme that converts tryptophan to serotonin in the brain; deficiency doubles depression risk", topSources: "salmon, sardines, egg yolks, sunlight" },
      { name: "Zinc", role: "Antidepressant augmentation studies show zinc significantly improves SSRI response; zinc activates serotonin receptors and supports BDNF", topSources: "red meat, pumpkin seeds, lentils, chickpeas" },
      { name: "Tryptophan", role: "The sole dietary precursor to serotonin; must be consumed with carbohydrates for optimal brain uptake", topSources: "turkey, eggs, salmon, pumpkin seeds" },
      { name: "B12", role: "Required for SAMe and myelin production; deficiency found in up to 30% of depressed individuals", topSources: "salmon, beef, eggs, sardines" },
    ],
    powerFoods: [
      { food: "Wild Salmon", why: "EPA + vitamin D + B12 in therapeutic amounts; addresses three of the six priority nutrients in one serving" },
      { food: "Dark Leafy Greens", why: "Richest folate source; depression severity correlates inversely with leafy green intake in population studies" },
      { food: "Eggs", why: "Tryptophan, B12, vitamin D, and choline; choline is required for acetylcholine, the neurotransmitter governing motivation" },
      { food: "Berries (all types)", why: "Anthocyanins increase BDNF production, supporting the neuroplasticity needed to build new, less depressive neural pathways" },
      { food: "Walnuts", why: "ALA omega-3, polyphenols, and melatonin; the only nut that provides omega-3s alongside antidepressant polyphenols" },
      { food: "Lentils & Beans", why: "Folate, iron, zinc, and resistant starch; feeds gut bacteria that produce short-chain fatty acids protective against depression" },
      { food: "Turmeric", why: "Curcumin is as effective as fluoxetine for mild-to-moderate depression in clinical trials; raises both serotonin and dopamine" },
      { food: "Dark Chocolate (70%+)", why: "PEA (phenylethylamine) boosts dopamine; flavanols increase cerebral blood flow; magnesium supports GABA" },
      { food: "Fermented Foods", why: "Gut microbiome diversity directly correlates with depression severity; fermented foods rebuild the bacteria that produce serotonin" },
      { food: "Sweet Potatoes", why: "Complex carbs increase brain tryptophan uptake; vitamin A supports synaptic plasticity in mood-regulating circuits" },
    ],
    foodsToMinimize: [
      { food: "Ultra-processed foods", why: "A landmark 2019 study showed ultra-processed diets increase depression risk by 33%; inflammatory compounds directly suppress serotonin production" },
      { food: "Refined sugar", why: "Causes dopamine spikes followed by deeper crashes; chronic consumption reduces BDNF and shrinks the hippocampus" },
      { food: "Alcohol", why: "A CNS depressant that depletes serotonin, disrupts sleep architecture, and worsens depression within 24 hours of consumption" },
      { food: "Trans fats & fried foods", why: "Increase neuroinflammation markers (IL-6, CRP) that are elevated in depression and block serotonin receptor function" },
      { food: "Excessive red meat (processed)", why: "Processed meats contain nitrates and preservatives linked to increased inflammation and depression risk in prospective studies" },
      { food: "Artificial sweeteners", why: "May disrupt gut microbiome diversity, reducing the bacterial populations that produce serotonin and GABA" },
    ],
    mealPattern: {
      frequency: "3 balanced meals + 1 afternoon snack",
      macroSplit: "25% protein, 45% complex carbs, 30% healthy fats",
      timing: "Complex carbs with dinner to boost serotonin for sleep; omega-3 rich lunch to sustain afternoon mood",
      keyRule: "Prioritize the Mediterranean diet pattern. It has the strongest evidence base of any dietary intervention for depression, reducing risk by up to 33% in clinical trials."
    }
  },

  bipolar: {
    label: "Bipolar Disorder",
    emoji: "⚖️",
    summary: "Bipolar disorder involves unstable neuronal excitability and disrupted circadian signaling. Your diet should prioritize mood-stabilizing nutrients (omega-3s, magnesium), avoid glucose instability that triggers mood cycling, and support mitochondrial function since bipolar brains have higher cellular energy demands.",
    priorityNutrients: [
      { name: "Omega-3 EPA & DHA", role: "Reduces depressive episodes by up to 50% in bipolar trials; stabilizes neuronal membrane potential and reduces neuroinflammation", topSources: "salmon, sardines, mackerel, fish oil" },
      { name: "Magnesium", role: "Has natural lithium-like mood-stabilizing properties at the cellular level; commonly depleted in bipolar disorder", topSources: "dark leafy greens, pumpkin seeds, almonds, dark chocolate" },
      { name: "NAC precursors (Cysteine)", role: "Supports glutathione production to combat the elevated oxidative stress in bipolar brains; also modulates glutamate", topSources: "chicken, turkey, eggs, garlic, onions" },
      { name: "CoQ10", role: "Supports mitochondrial energy production in neurons; mitochondrial dysfunction is a core feature of bipolar disorder", topSources: "sardines, beef, chicken, broccoli, spinach" },
      { name: "B Vitamins", role: "B12 and folate support the methylation cycle; disrupted methylation is linked to bipolar mood cycling", topSources: "eggs, leafy greens, salmon, beef" },
      { name: "Vitamin D", role: "Regulates calcium signaling in neurons; deficiency worsens both manic and depressive episodes", topSources: "salmon, sardines, eggs, fortified foods" },
    ],
    powerFoods: [
      { food: "Wild Salmon", why: "EPA + DHA in therapeutic ratios; the most studied dietary intervention for bipolar depressive episodes" },
      { food: "Sardines", why: "Omega-3s, CoQ10, vitamin D, and calcium in one food; low mercury makes daily consumption safe" },
      { food: "Eggs", why: "Choline for acetylcholine, B12, vitamin D, and cysteine for glutathione. Covers multiple bipolar-critical pathways" },
      { food: "Dark Leafy Greens", why: "Magnesium (lithium-like stabilizer), folate for methylation, and fiber for gut-brain axis health" },
      { food: "Sweet Potatoes", why: "Low glycemic index complex carbs; glucose instability is a documented mood cycling trigger in bipolar disorder" },
      { food: "Avocado", why: "Magnesium, B vitamins, potassium, and healthy fats for sustained brain energy without glucose spikes" },
      { food: "Turkey", why: "Tryptophan for serotonin plus cysteine for glutathione production; lean protein stabilizes blood sugar" },
      { food: "Walnuts", why: "Omega-3 ALA, melatonin for circadian rhythm support, and polyphenols that reduce neuroinflammation" },
      { food: "Broccoli & Cruciferous Vegetables", why: "Sulforaphane activates Nrf2 antioxidant defense; CoQ10 content supports mitochondrial function" },
      { food: "Quinoa", why: "Complete protein with all essential amino acids plus magnesium; low glycemic for blood sugar stability" },
    ],
    foodsToMinimize: [
      { food: "Caffeine", why: "Can trigger manic episodes by stimulating dopamine release and disrupting the circadian rhythm that bipolar brains already struggle with" },
      { food: "Alcohol", why: "Destabilizes mood, disrupts sleep architecture, interferes with mood stabilizer medications, and depletes B vitamins" },
      { food: "Refined sugar & simple carbs", why: "Glucose instability is one of the strongest dietary triggers for mood cycling; rapid spikes and crashes destabilize neuronal firing" },
      { food: "High-sodium processed foods", why: "Can affect lithium levels if taking medication; also increases inflammation and blood pressure" },
      { food: "Energy drinks", why: "Combine caffeine, sugar, and stimulants – a triple trigger for manic episodes" },
      { food: "Grapefruit", why: "Interferes with the metabolism of many bipolar medications (CYP3A4 inhibition); check with your doctor" },
    ],
    mealPattern: {
      frequency: "3 meals + 2 snacks at consistent times daily",
      macroSplit: "30% protein, 35% complex carbs, 35% healthy fats",
      timing: "Eat at the same times every day. Circadian rhythm consistency supports mood stability; avoid eating within 2 hours of bedtime",
      keyRule: "Consistency is your most powerful tool. Same meal times, same sleep times, same portion sizes. Your brain craves predictability even when your mood doesn't."
    }
  },

  schizophrenia: {
    label: "Schizophrenia",
    emoji: "🧠",
    summary: "Schizophrenia involves dopamine dysregulation, elevated oxidative stress, and neuroinflammation. Your diet should prioritize powerful antioxidants, omega-3 fats for neural membrane repair, and nutrients that support balanced dopamine and glutamate signaling.",
    priorityNutrients: [
      { name: "Omega-3 DHA & EPA", role: "Restores neural membrane fluidity reduced by up to 30% in schizophrenia; EPA reduces the neuroinflammation that damages neural circuits", topSources: "salmon, sardines, mackerel, fish oil" },
      { name: "Antioxidants (Vitamin C, E, NAC precursors)", role: "Combat the significantly elevated oxidative stress that damages dopamine receptors and neural tissue in schizophrenia", topSources: "berries, citrus, peppers, nuts, eggs" },
      { name: "B Vitamins (B6, B12, Folate)", role: "Support methylation and homocysteine clearance; elevated homocysteine is neurotoxic and found in many schizophrenia patients", topSources: "eggs, leafy greens, salmon, beef" },
      { name: "Zinc", role: "Cofactor for both dopamine and glutamate receptor regulation – the two neurotransmitter systems most disrupted in schizophrenia", topSources: "red meat, pumpkin seeds, lentils, chickpeas" },
      { name: "Vitamin D", role: "Receptors are concentrated in brain regions affected by schizophrenia; prenatal deficiency is a known risk factor", topSources: "salmon, sardines, eggs, sunlight" },
      { name: "Niacin (B3)", role: "Supports NAD+ production for cellular energy; niacin deficiency causes psychosis-like symptoms; some evidence for therapeutic benefit", topSources: "chicken, turkey, salmon, brown rice" },
    ],
    powerFoods: [
      { food: "Wild Salmon", why: "DHA restores neural membrane fluidity; EPA reduces neuroinflammation; vitamin D supports affected brain regions" },
      { food: "Eggs", why: "Choline, B12, vitamin D, and selenium – four nutrients that combat oxidative stress and support neurotransmitter balance" },
      { food: "Berries (all types)", why: "Among the most potent dietary antioxidants; directly combat the elevated oxidative stress in schizophrenia" },
      { food: "Dark Leafy Greens", why: "Folate reduces neurotoxic homocysteine; vitamin C provides antioxidant defense; fiber supports gut-brain health" },
      { food: "Sardines", why: "Omega-3s, CoQ10 for mitochondrial function, vitamin D, and B12. Exceptional nutrient density per serving" },
      { food: "Chicken & Turkey", why: "Niacin (B3) + tyrosine + tryptophan; complete amino acid profiles for balanced neurotransmitter production" },
      { food: "Sweet Potatoes", why: "Steady glucose for cognitive function; beta-carotene for antioxidant defense; B6 for neurotransmitter synthesis" },
      { food: "Pumpkin Seeds", why: "Zinc for dopamine and glutamate regulation plus magnesium for GABA support; two systems critical in schizophrenia" },
      { food: "Turmeric", why: "Curcumin reduces neuroinflammation and oxidative stress markers significantly elevated in schizophrenia" },
      { food: "Broccoli & Cabbage", why: "Sulforaphane has shown promise in clinical trials for schizophrenia, activating the brain's master antioxidant pathway" },
    ],
    foodsToMinimize: [
      { food: "Refined sugar", why: "Causes neuroinflammation and oxidative stress. Both are already elevated in schizophrenia, and sugar worsens cognitive symptoms" },
      { food: "Gluten (if sensitive)", why: "A subset of schizophrenia patients show anti-gliadin antibodies; gluten-free diets improve symptoms in this group specifically" },
      { food: "Excess saturated fat", why: "Increases inflammatory markers that worsen schizophrenia symptoms and may interfere with antipsychotic medication efficacy" },
      { food: "Alcohol & recreational drugs", why: "Worsen psychotic symptoms, interfere with medications, and deplete the antioxidants your brain desperately needs" },
      { food: "Highly processed foods", why: "Contain inflammatory additives and lack the antioxidants and omega-3s that schizophrenia brains need in higher-than-average amounts" },
      { food: "Excessive caffeine", why: "Can worsen anxiety and paranoia symptoms; interferes with sleep quality that is already disrupted in schizophrenia" },
    ],
    mealPattern: {
      frequency: "3 meals + 1–2 antioxidant-rich snacks",
      macroSplit: "30% protein, 35% complex carbs, 35% healthy fats",
      timing: "Regular meal schedule to support medication effectiveness; omega-3 rich fish at least 3× per week",
      keyRule: "Antioxidant density is your dietary priority. Your brain generates more oxidative stress than average. Every meal should include at least one high-antioxidant food (berries, leafy greens, colorful vegetables)."
    }
  },

  autism: {
    label: "Autism Spectrum",
    emoji: "🌈",
    summary: "Autism involves gut-brain axis disruption, altered serotonin metabolism, and unique sensory processing needs. Your diet should prioritize gut health (since microbiome differences are one of the most consistent findings), anti-inflammatory nutrients, and B6/magnesium for neurotransmitter support. All in sensory-comfortable forms.",
    priorityNutrients: [
      { name: "Probiotics & Prebiotics", role: "Gut microbiome differences are among the most replicated findings in autism; probiotics improve GI symptoms and may improve behavioral scores", topSources: "yogurt, kefir, fermented vegetables, fiber-rich foods" },
      { name: "Vitamin B6 + Magnesium", role: "The B6/Mg combination is one of the most studied nutritional interventions in autism; supports GABA production and reduces sensory sensitivity", topSources: "chicken, potatoes, bananas, almonds, spinach" },
      { name: "Omega-3 DHA", role: "Supports neural membrane health and reduces neuroinflammation; some studies show improvements in social interaction with supplementation", topSources: "salmon, sardines, walnuts, flaxseed" },
      { name: "Zinc", role: "Commonly deficient in autism; involved in over 300 enzymatic reactions including neurotransmitter synthesis and immune function", topSources: "beef, pumpkin seeds, lentils, chickpeas" },
      { name: "Sulforaphane", role: "One of the most studied dietary compounds in autism; clinical trials show improvements in social interaction and communication", topSources: "broccoli, broccoli sprouts, cabbage, cauliflower" },
      { name: "Iron", role: "Deficiency is more common in autism and affects dopamine synthesis, sleep quality, and cognitive function", topSources: "red meat, spinach, lentils, fortified cereals" },
    ],
    powerFoods: [
      { food: "Broccoli (especially sprouts)", why: "Sulforaphane is the most evidence-backed dietary compound in autism research; activates the Nrf2 antioxidant pathway" },
      { food: "Yogurt / Kefir", why: "Probiotic diversity supports the gut-brain connection; fermented dairy is one of the most studied interventions for ASD gut issues" },
      { food: "Eggs (scrambled/familiar prep)", why: "Complete nutrition in a sensory-predictable package; choline, B12, protein, and vitamin D" },
      { food: "Chicken", why: "Lean protein with B6 for neurotransmitter synthesis; predictable taste and texture" },
      { food: "Bananas", why: "B6 + magnesium + tryptophan in a sensory-friendly format; consistent texture and taste" },
      { food: "Sweet Potatoes", why: "Gentle on the gut, rich in beta-carotene and B6; predictable flavor profile" },
      { food: "Salmon", why: "DHA for neural membrane health; omega-3s may improve social cognition in some studies" },
      { food: "Rice", why: "Easily digestible, gentle on sensitive GI systems; provides steady glucose without sensory challenges" },
      { food: "Almonds / Almond Butter", why: "Magnesium, vitamin E, and protein in a consistent format; can be mixed into familiar foods" },
      { food: "Blueberries", why: "Antioxidants that reduce neuroinflammation; small, consistent size and texture" },
    ],
    foodsToMinimize: [
      { food: "Artificial food dyes & preservatives", why: "May worsen behavioral symptoms; some individuals with autism show heightened sensitivity to synthetic additives" },
      { food: "Excessive gluten & casein (if sensitive)", why: "A subset of autistic individuals show improvement on GFCF diets; worth trialing with medical guidance if GI issues are present" },
      { food: "Refined sugar", why: "Can worsen hyperactivity and GI symptoms; contributes to gut microbiome imbalance" },
      { food: "Highly processed foods", why: "Lack the fiber and nutrients gut bacteria need; may contain additives that worsen GI and behavioral symptoms" },
      { food: "High-histamine foods (if reactive)", why: "Some individuals with autism have altered histamine metabolism; aged cheeses, cured meats, and fermented foods may be problematic for this subset" },
    ],
    mealPattern: {
      frequency: "3 meals + 2 predictable snacks at consistent times",
      macroSplit: "25% protein, 45% complex carbs, 30% healthy fats",
      timing: "Consistent meal schedule reduces anxiety around eating; introduce new foods alongside familiar favorites",
      keyRule: "Gut health is your dietary foundation. Start with probiotics and fiber, then build out from familiar foods. Sensory comfort matters. A food your brain can tolerate is always better than an 'optimal' food you can't eat."
    }
  },

  ptsd: {
    label: "PTSD",
    emoji: "🕊️",
    summary: "PTSD keeps the HPA axis chronically activated, depleting cortisol-clearing nutrients and shrinking the hippocampus. Your diet should prioritize adrenal recovery (vitamin C, B5), hippocampal repair (omega-3s, BDNF boosters), and nervous system calming (magnesium, tryptophan).",
    priorityNutrients: [
      { name: "Vitamin C", role: "The adrenal glands contain the highest vitamin C concentration of any organ; chronic PTSD depletes stores faster than diet can replace", topSources: "bell peppers, citrus, berries, broccoli" },
      { name: "Omega-3 DHA", role: "Rebuilds hippocampal neural membranes damaged by chronic cortisol; the hippocampus is the brain region most affected by PTSD", topSources: "salmon, sardines, mackerel, walnuts" },
      { name: "Magnesium", role: "Calms the overactive nervous system by activating GABA receptors; deficiency is common in chronic stress states", topSources: "dark leafy greens, pumpkin seeds, almonds, dark chocolate" },
      { name: "Tryptophan", role: "Serotonin is depleted by chronic cortisol; tryptophan is the only dietary source for replenishing it", topSources: "turkey, eggs, salmon, pumpkin seeds" },
      { name: "Vitamin B5 (Pantothenic Acid)", role: "Essential for adrenal hormone production; supports cortisol regulation and adrenal recovery from chronic stress", topSources: "chicken, eggs, avocado, mushrooms" },
      { name: "Zinc", role: "Supports hippocampal neuroplasticity and repair; the hippocampus shrinks under chronic PTSD cortisol exposure and needs zinc to recover", topSources: "red meat, pumpkin seeds, lentils, chickpeas" },
    ],
    powerFoods: [
      { food: "Wild Salmon", why: "DHA for hippocampal repair, EPA to reduce neuroinflammation, vitamin D for serotonin, and protein for neurotransmitter synthesis" },
      { food: "Bell Peppers", why: "3× more vitamin C than oranges; vitamin C is the single most important nutrient for adrenal recovery in PTSD" },
      { food: "Eggs", why: "B5 for adrenal function, choline for memory circuits, tryptophan for serotonin, and vitamin D" },
      { food: "Turkey", why: "Highest tryptophan content of any meat; rebuilds the serotonin that chronic cortisol exposure depletes" },
      { food: "Dark Leafy Greens", why: "Magnesium to calm the nervous system, folate for serotonin synthesis, vitamin C for adrenal support" },
      { food: "Blueberries", why: "Boost BDNF production to support hippocampal neurogenesis. Grows new neurons to replace those lost to cortisol" },
      { food: "Avocado", why: "B5, magnesium, potassium, and healthy fats; a comprehensive adrenal and nervous system support food" },
      { food: "Pumpkin Seeds", why: "Zinc for hippocampal repair, magnesium for GABA, tryptophan for serotonin. Addresses three PTSD pathways simultaneously" },
      { food: "Fermented Foods", why: "The vagus nerve carries gut signals to the brain; reducing gut inflammation through probiotics improves vagal tone and reduces hyperarousal" },
      { food: "Dark Chocolate (70%+)", why: "Magnesium, flavanols for cerebral blood flow, and PEA for dopamine. A small daily dose supports recovery" },
    ],
    foodsToMinimize: [
      { food: "Caffeine", why: "Stimulates the exact cortisol and adrenaline pathways PTSD already overactivates; worsens hyperarousal and sleep disruption" },
      { food: "Alcohol", why: "Disrupts sleep architecture (PTSD already impairs sleep), depletes serotonin, and worsens hyperarousal the next day" },
      { food: "Refined sugar", why: "Blood sugar crashes trigger adrenaline release that PTSD brains interpret as threat confirmation; fuels the hyperarousal cycle" },
      { food: "Processed & fried foods", why: "Increase systemic inflammation that sends alarm signals through the vagus nerve, worsening baseline hyperarousal" },
      { food: "Excess salt", why: "Raises blood pressure and cortisol; creates physical sensations the traumatized brain misinterprets as danger" },
    ],
    mealPattern: {
      frequency: "3 meals + 2 calming snacks (never skip meals)",
      macroSplit: "25% protein, 40% complex carbs, 35% healthy fats",
      timing: "Tryptophan-rich dinner with complex carbs to support sleep; vitamin C-rich foods at breakfast to support morning cortisol clearance",
      keyRule: "Stability and nourishment are healing acts. Never skip meals. Every blood sugar crash triggers cortisol, and your body has had enough cortisol. Eating consistently tells your nervous system it's safe."
    }
  },

  ocd: {
    label: "OCD",
    emoji: "🔄",
    summary: "OCD is fundamentally a serotonin-dysregulation disorder with glutamate excitotoxicity in the cortico-striatal circuits. Your diet should prioritize serotonin precursors and cofactors above all else, along with nutrients that reduce glutamate excitotoxicity and support thought flexibility.",
    priorityNutrients: [
      { name: "Tryptophan", role: "The sole dietary precursor to serotonin. OCD is the condition most directly linked to serotonin deficiency; every OCD medication targets this pathway", topSources: "turkey, eggs, salmon, pumpkin seeds, yogurt" },
      { name: "Folate (B9)", role: "Required cofactor for converting tryptophan to serotonin; OCD severity correlates directly with folate levels in clinical studies", topSources: "leafy greens, lentils, beans, asparagus" },
      { name: "Inositol", role: "Acts as a second messenger in serotonin receptor signaling; clinical trials show doses of 18g/day reduce OCD symptoms comparably to SSRIs", topSources: "citrus fruits, beans, whole grains, cantaloupe" },
      { name: "Magnesium", role: "Reduces glutamate excitotoxicity in the cortico-striatal-thalamic circuits that drive OCD compulsions", topSources: "dark leafy greens, pumpkin seeds, almonds, dark chocolate" },
      { name: "NAC precursors", role: "N-acetylcysteine modulates glutamate – the excitatory neurotransmitter that locks OCD circuits into repetitive loops", topSources: "chicken, turkey, eggs, garlic, onions" },
      { name: "Omega-3 EPA", role: "Reduces neuroinflammation in the cortico-striatal circuits involved in OCD; augments SSRI response", topSources: "salmon, sardines, mackerel, walnuts" },
    ],
    powerFoods: [
      { food: "Turkey", why: "Highest tryptophan content of any common protein; the most direct dietary path to serotonin production" },
      { food: "Eggs", why: "Tryptophan + B12 + cysteine (NAC precursor) + choline; addresses both serotonin and glutamate pathways" },
      { food: "Wild Salmon", why: "EPA reduces neuroinflammation in OCD circuits; omega-3s augment SSRI effectiveness in clinical studies" },
      { food: "Dark Leafy Greens", why: "Folate is the most critical serotonin cofactor; spinach and kale deliver the highest amounts per serving" },
      { food: "Lentils & Beans", why: "Folate + inositol + resistant starch; the inositol content supports serotonin receptor signaling" },
      { food: "Pumpkin Seeds", why: "Tryptophan + magnesium + zinc; covers both the serotonin precursor and the glutamate-calming minerals" },
      { food: "Citrus Fruits", why: "Among the richest dietary sources of inositol; vitamin C also supports serotonin synthesis as a cofactor" },
      { food: "Sweet Potatoes", why: "Complex carbs increase brain tryptophan uptake; B6 is required for the final serotonin conversion step" },
      { food: "Yogurt", why: "Tryptophan in a gut-friendly fermented form; gut bacteria produce serotonin precursors that cross the blood-brain barrier" },
      { food: "Broccoli", why: "Sulforaphane activates antioxidant defense; glutamine content supports GABA to counterbalance glutamate" },
    ],
    foodsToMinimize: [
      { food: "Caffeine (excessive)", why: "Increases glutamate activity and anxiety. Both exacerbate the compulsion-anxiety cycle at the core of OCD" },
      { food: "Refined sugar", why: "Causes serotonin spikes then crashes; the crash phase can trigger intrusive thoughts and compulsive behavior" },
      { food: "Alcohol", why: "Temporarily raises serotonin then severely depletes it. This creates a rebound effect that worsens OCD for days" },
      { food: "MSG & excess glutamate sources", why: "May increase glutamate excitotoxicity in the cortico-striatal circuits already overactive in OCD" },
      { food: "Highly processed foods", why: "Inflammatory compounds suppress serotonin production; artificial additives may disrupt the gut bacteria that produce serotonin precursors" },
    ],
    mealPattern: {
      frequency: "3 meals + 1 tryptophan-rich evening snack",
      macroSplit: "25% protein, 45% complex carbs, 30% healthy fats",
      timing: "Complex carbs with every meal to maximize brain tryptophan uptake; turkey or eggs at dinner to support serotonin production before sleep",
      keyRule: "Serotonin is your dietary priority above all else. Every meal should include either a tryptophan source or a serotonin cofactor (folate, B6, inositol). Your brain is fighting for serotonin. Feed it the building blocks."
    }
  },

  bpd: {
    label: "Borderline Personality Disorder",
    emoji: "🌊",
    summary: "BPD involves amygdala hyperreactivity and prefrontal underactivity. The emotional brain fires faster than the rational brain can moderate. Your diet should stabilize blood sugar (the most direct dietary tool for reducing emotional reactivity), support serotonin for emotional regulation, and provide omega-3s for prefrontal function.",
    priorityNutrients: [
      { name: "Omega-3 EPA & DHA", role: "Improve prefrontal cortex function needed to regulate the amygdala overreactivity that defines BPD emotional volatility", topSources: "salmon, sardines, mackerel, walnuts" },
      { name: "Magnesium", role: "Activates GABA receptors to reduce the neural excitability that drives impulsive emotional reactions", topSources: "dark leafy greens, pumpkin seeds, almonds, dark chocolate" },
      { name: "Tryptophan", role: "Serotonin is the neurotransmitter most directly involved in emotional regulation and impulse control – both core BPD challenges", topSources: "turkey, eggs, salmon, pumpkin seeds" },
      { name: "Complex Carbohydrates", role: "Blood sugar instability amplifies emotional reactivity in BPD; complex carbs provide the steady glucose the amygdala needs to stay regulated", topSources: "sweet potatoes, quinoa, oats, brown rice" },
      { name: "Vitamin B6", role: "Required for both serotonin and GABA synthesis – the two neurotransmitter systems most involved in emotional regulation", topSources: "chicken, salmon, potatoes, bananas" },
      { name: "Zinc", role: "Supports serotonin receptor function and BDNF production for building new, more regulated emotional response patterns", topSources: "red meat, pumpkin seeds, lentils, chickpeas" },
    ],
    powerFoods: [
      { food: "Wild Salmon", why: "EPA supports prefrontal cortex function; DHA maintains neural membrane health in the emotion regulation circuits" },
      { food: "Oatmeal", why: "Slow-release glucose prevents the blood sugar crashes that trigger BPD emotional reactivity; contains tryptophan and magnesium" },
      { food: "Eggs", why: "Tryptophan, B12, choline, and vitamin D – four nutrients that support the amygdala-prefrontal connection" },
      { food: "Sweet Potatoes", why: "Complex carbs with B6. The carb/B6 combination is more effective at raising serotonin than either alone" },
      { food: "Turkey", why: "Tryptophan for serotonin production to support the emotional regulation that BPD challenges most" },
      { food: "Dark Leafy Greens", why: "Magnesium for GABA, folate for serotonin; both systems directly regulate emotional reactivity" },
      { food: "Blueberries", why: "Anthocyanins increase BDNF, supporting the neuroplasticity needed to build new emotional regulation patterns" },
      { food: "Avocado", why: "Healthy fats for brain energy, B vitamins for neurotransmitter synthesis, potassium for nerve regulation" },
      { food: "Quinoa", why: "Complete protein with complex carbs; magnesium and iron for neurotransmitter cofactor support" },
      { food: "Yogurt", why: "Tryptophan + probiotics; gut-brain axis health directly influences emotional regulation" },
    ],
    foodsToMinimize: [
      { food: "Refined sugar & sweets", why: "Blood sugar spikes and crashes are the single most direct dietary trigger for emotional reactivity in BPD" },
      { food: "Alcohol", why: "Removes the already-thin prefrontal inhibition; dramatically worsens impulsivity and emotional dysregulation" },
      { food: "Caffeine (excessive)", why: "Increases amygdala reactivity and reduces the threshold for emotional triggers" },
      { food: "Skipping meals", why: "Every blood sugar crash amplifies emotional volatility; for BPD, meal skipping is as destabilizing as caffeine or alcohol" },
      { food: "Ultra-processed foods", why: "Inflammatory compounds impair prefrontal cortex function, the exact brain region BPD needs working optimally" },
    ],
    mealPattern: {
      frequency: "3 meals + 2 snacks. Never skip meals",
      macroSplit: "25% protein, 45% complex carbs, 30% healthy fats",
      timing: "Eat every 3 hours to prevent blood sugar dips; protein at every meal to stabilize glucose",
      keyRule: "Blood sugar stability IS emotional stability for BPD. Every blood sugar crash amplifies amygdala reactivity. If you do one thing: never eat carbs without protein, and never skip a meal."
    }
  },

  did: {
    label: "DID",
    emoji: "🧩",
    summary: "DID involves stress-response dysregulation and dissociative vulnerability that worsens with blood sugar instability and cortisol spikes. Your diet should prioritize grounding through consistent nutrition, steady brain fuel, and nutrients that support the hippocampus and stress regulation systems.",
    priorityNutrients: [
      { name: "Complex Carbohydrates", role: "Blood sugar drops can trigger or worsen dissociative episodes; steady glucose is the most important dietary factor for grounding", topSources: "sweet potatoes, oats, quinoa, brown rice" },
      { name: "Magnesium", role: "Supports GABA production for nervous system calming; reduces the stress reactivity that can trigger dissociation", topSources: "dark leafy greens, almonds, pumpkin seeds, dark chocolate" },
      { name: "B Vitamins", role: "Support adrenal function and neurotransmitter production; chronic stress depletes B vitamins faster than normal", topSources: "eggs, leafy greens, salmon, chicken" },
      { name: "Omega-3 DHA", role: "Supports hippocampal function needed for memory integration and continuity of experience", topSources: "salmon, sardines, walnuts, flaxseed" },
      { name: "Tryptophan", role: "Serotonin supports mood stability and reduces the anxiety that can precede dissociative episodes", topSources: "turkey, eggs, salmon, pumpkin seeds" },
      { name: "Vitamin C", role: "Supports adrenal recovery from chronic stress; the adrenals are the most vitamin C-dense organs", topSources: "bell peppers, citrus, berries, broccoli" },
    ],
    powerFoods: [
      { food: "Oatmeal", why: "Slow-release glucose for sustained grounding; magnesium and B vitamins for nervous system support" },
      { food: "Eggs", why: "Complete nutrition in a consistent format; B vitamins for stress resilience and choline for memory circuits" },
      { food: "Sweet Potatoes", why: "Low glycemic complex carbs prevent the blood sugar crashes that increase dissociative vulnerability" },
      { food: "Salmon", why: "DHA for hippocampal support and memory integration; B vitamins for stress resilience" },
      { food: "Turkey", why: "Tryptophan for serotonin to support mood stability; lean protein for steady blood sugar" },
      { food: "Bananas", why: "B6, magnesium, and natural sugars for quick grounding; predictable and easy to eat during difficult moments" },
      { food: "Dark Leafy Greens", why: "Magnesium for GABA production; folate for serotonin synthesis; vitamin C for adrenal support" },
      { food: "Avocado", why: "B5 for adrenal function, healthy fats for brain energy, and potassium for nervous system regulation" },
    ],
    foodsToMinimize: [
      { food: "Refined sugar", why: "Blood sugar crashes increase dissociative vulnerability by starving the brain of its primary fuel" },
      { food: "Caffeine", why: "Stimulates the stress response system that can trigger dissociative episodes; worsens hyperarousal" },
      { food: "Alcohol", why: "Disrupts grounding, impairs memory formation, and depletes the B vitamins needed for stress resilience" },
      { food: "Skipping meals", why: "The most direct dietary trigger for dissociative vulnerability. Your brain needs consistent fuel to maintain integration" },
      { food: "Highly processed foods", why: "Cause blood sugar instability and lack the nutrients needed for stress recovery" },
    ],
    mealPattern: {
      frequency: "3 meals + 2 grounding snacks at consistent times",
      macroSplit: "25% protein, 45% complex carbs, 30% healthy fats",
      timing: "Eat at the same times every day for maximum grounding; keep easy snacks accessible for moments of increased stress",
      keyRule: "Consistency is grounding. Same meal times, same reliable foods, same nourishing routine. Your nervous system needs predictability to feel safe enough to stay present."
    }
  },

  npd: {
    label: "Narcissistic Personality Disorder",
    emoji: "🪞",
    summary: "NPD involves elevated dopamine reward sensitivity and underactive prefrontal empathy circuits. Your diet should support prefrontal cortex function (omega-3s, B vitamins), modulate the dopamine reward system, and provide nutrients for emotional processing and stress resilience.",
    priorityNutrients: [
      { name: "Omega-3 DHA & EPA", role: "Improve prefrontal cortex membrane fluidity, enhancing the empathy and self-other processing circuits that are structurally underactive in NPD", topSources: "salmon, sardines, mackerel, walnuts" },
      { name: "Magnesium", role: "Supports prefrontal empathy circuits and emotional regulation; reduces the reactive irritability tied to narcissistic injury", topSources: "dark leafy greens, almonds, pumpkin seeds, dark chocolate" },
      { name: "B Vitamins", role: "B6 and folate support serotonin production for emotional regulation; B12 protects the myelin in social cognition circuits", topSources: "eggs, leafy greens, salmon, chicken" },
      { name: "Tryptophan", role: "Serotonin supports emotional modulation and reduces the impulsive reactivity triggered by narcissistic injury", topSources: "turkey, eggs, salmon, pumpkin seeds" },
      { name: "Complex Carbohydrates", role: "Blood sugar crashes amplify irritability and reactive narcissistic behavior; steady glucose supports prefrontal self-regulation", topSources: "sweet potatoes, oats, quinoa, brown rice" },
      { name: "Zinc", role: "Supports dopamine reward system normalization and serotonin receptor function for emotional processing", topSources: "red meat, pumpkin seeds, lentils, chickpeas" },
    ],
    powerFoods: [
      { food: "Wild Salmon", why: "Omega-3s enhance prefrontal membrane fluidity needed for empathy circuits and emotional processing" },
      { food: "Eggs", why: "Choline for social cognition, tryptophan for serotonin, B12 for myelin health in empathy circuits" },
      { food: "Dark Leafy Greens", why: "Magnesium for emotional regulation, folate for serotonin synthesis, and fiber for gut-brain health" },
      { food: "Turkey", why: "Tryptophan to support the serotonin system that modulates emotional reactivity during narcissistic injury" },
      { food: "Sweet Potatoes", why: "Complex carbs prevent the blood sugar crashes that amplify narcissistic irritability and reactivity" },
      { food: "Blueberries", why: "BDNF-boosting anthocyanins support the neuroplasticity needed to strengthen empathy neural pathways" },
      { food: "Walnuts", why: "Omega-3 ALA for prefrontal support plus polyphenols that reduce neuroinflammation" },
      { food: "Avocado", why: "B vitamins, magnesium, and oleic acid for sustained brain energy and emotional processing" },
    ],
    foodsToMinimize: [
      { food: "Refined sugar", why: "Dopamine spikes from sugar reinforce reward-seeking patterns; the crash amplifies irritability and narcissistic reactivity" },
      { food: "Alcohol", why: "Reduces prefrontal inhibition and worsens emotional dysregulation; amplifies grandiosity and impulsivity" },
      { food: "Caffeine (excessive)", why: "Increases cortisol and arousal, lowering the threshold for narcissistic injury reactions" },
      { food: "Ultra-processed foods", why: "Inflammatory compounds impair prefrontal cortex empathy circuits that NPD needs functioning optimally" },
      { food: "Skipping meals", why: "Blood sugar crashes amplify irritability and reduce the prefrontal self-regulation capacity" },
    ],
    mealPattern: {
      frequency: "3 meals + 1–2 balanced snacks",
      macroSplit: "30% protein, 40% complex carbs, 30% healthy fats",
      timing: "Protein at every meal for steady amino acid supply to empathy circuits; omega-3 rich meals at least 3× per week",
      keyRule: "Prefrontal support is your priority. Omega-3s, B vitamins, and stable blood sugar keep the rational, empathic brain online when emotional triggers arise."
    }
  },

  hpd: {
    label: "Histrionic Personality Disorder",
    emoji: "🎭",
    summary: "HPD involves serotonin and dopamine fluctuations that amplify emotional intensity and reward-seeking behavior. Your diet should stabilize these neurotransmitter systems through steady amino acid supply, calming magnesium, and blood sugar consistency.",
    priorityNutrients: [
      { name: "Tryptophan", role: "Serotonin stability is central to HPD emotional modulation; tryptophan is the sole dietary precursor", topSources: "turkey, eggs, salmon, pumpkin seeds" },
      { name: "Magnesium", role: "Activates GABA receptors to calm the emotional intensity and reduce impulsive attention-seeking behavior", topSources: "dark leafy greens, almonds, pumpkin seeds, dark chocolate" },
      { name: "Omega-3 EPA", role: "Reduces neuroinflammation that destabilizes serotonin signaling and calms emotional intensity", topSources: "salmon, sardines, mackerel, walnuts" },
      { name: "B Vitamins", role: "B6 supports serotonin and GABA synthesis; B12 protects neural circuits involved in emotional modulation", topSources: "eggs, salmon, chicken, leafy greens" },
      { name: "Complex Carbohydrates", role: "Blood sugar swings intensify emotional volatility and attention-seeking behavior driven by serotonin fluctuations", topSources: "sweet potatoes, oats, quinoa, brown rice" },
      { name: "Zinc", role: "Supports dopamine receptor normalization to reduce reward-seeking impulsivity", topSources: "red meat, pumpkin seeds, lentils, chickpeas" },
    ],
    powerFoods: [
      { food: "Turkey", why: "Highest tryptophan content; serotonin stability is the most direct path to emotional modulation in HPD" },
      { food: "Wild Salmon", why: "EPA reduces the neuroinflammation that destabilizes serotonin; DHA supports emotional processing circuits" },
      { food: "Eggs", why: "Tryptophan, choline, and B vitamins. Supports serotonin and acetylcholine systems simultaneously" },
      { food: "Oatmeal", why: "Slow-release carbs raise brain serotonin availability steadily rather than in spikes and crashes" },
      { food: "Dark Leafy Greens", why: "Magnesium for GABA production to calm emotional intensity; folate for serotonin synthesis" },
      { food: "Sweet Potatoes", why: "Complex carbs prevent the blood sugar crashes that intensify emotional volatility" },
      { food: "Pumpkin Seeds", why: "Tryptophan + magnesium + zinc; addresses serotonin, GABA, and dopamine in one food" },
      { food: "Yogurt", why: "Tryptophan + probiotics for gut-brain serotonin production" },
    ],
    foodsToMinimize: [
      { food: "Refined sugar", why: "Dopamine spikes reinforce reward-seeking patterns; serotonin crashes amplify emotional volatility" },
      { food: "Alcohol", why: "Removes impulse control and worsens attention-seeking behavior; depletes serotonin the next day" },
      { food: "Caffeine (excessive)", why: "Increases arousal and emotional intensity; worsens impulsive behavior" },
      { food: "Processed snack foods", why: "Cause blood sugar instability that amplifies the emotional intensity HPD already produces" },
    ],
    mealPattern: {
      frequency: "3 meals + 2 stabilizing snacks",
      macroSplit: "25% protein, 45% complex carbs, 30% healthy fats",
      timing: "Complex carbs with every meal for steady serotonin; protein snacks between meals to prevent glucose dips",
      keyRule: "Serotonin and blood sugar stability together reduce emotional intensity more than either alone. Consistent meals with tryptophan-rich protein and complex carbs are your foundation."
    }
  },

  aspd: {
    label: "Antisocial Personality Disorder",
    emoji: "🔒",
    summary: "ASPD involves prefrontal cortex underactivity that reduces impulse control and consequence evaluation. Your diet should prioritize prefrontal cortex support (omega-3s, zinc), serotonin for aggression modulation, and anti-inflammatory nutrients to reduce the neuroinflammation linked to reduced empathy circuits.",
    priorityNutrients: [
      { name: "Omega-3 DHA & EPA", role: "Improve prefrontal cortex membrane fluidity needed for impulse control and consequence evaluation; reduce aggression in clinical trials", topSources: "salmon, sardines, mackerel, walnuts" },
      { name: "Zinc", role: "Cofactor for serotonin synthesis needed for aggression modulation; also supports prefrontal dopamine regulation", topSources: "red meat, pumpkin seeds, lentils, chickpeas" },
      { name: "Tryptophan", role: "Serotonin deficiency is directly linked to impulsive aggression; tryptophan is the sole dietary pathway to serotonin", topSources: "turkey, eggs, salmon, pumpkin seeds" },
      { name: "Magnesium", role: "Activates GABA receptors to support inhibitory signaling in prefrontal impulse-control circuits", topSources: "dark leafy greens, almonds, pumpkin seeds, dark chocolate" },
      { name: "B Vitamins", role: "B6 and folate support serotonin production; B12 protects myelin in prefrontal-amygdala connections", topSources: "eggs, leafy greens, salmon, chicken" },
      { name: "Complex Carbohydrates", role: "Blood sugar crashes lower prefrontal cortex activity and worsen impulse control", topSources: "sweet potatoes, oats, quinoa, brown rice" },
    ],
    powerFoods: [
      { food: "Wild Salmon", why: "Omega-3 supplementation reduces aggression and impulsivity in multiple clinical trials; DHA supports prefrontal function" },
      { food: "Eggs", why: "Tryptophan, choline, B12, and selenium – supports serotonin, prefrontal function, and antioxidant defense" },
      { food: "Turkey", why: "Highest tryptophan content; directly supports the serotonin pathway most linked to aggression modulation" },
      { food: "Dark Leafy Greens", why: "Magnesium for GABA-mediated impulse control; folate for serotonin synthesis" },
      { food: "Pumpkin Seeds", why: "Zinc + magnesium + tryptophan; addresses all three neurotransmitter systems involved in impulse regulation" },
      { food: "Sweet Potatoes", why: "Stable glucose keeps prefrontal cortex online for consequence evaluation and impulse control" },
      { food: "Walnuts", why: "Omega-3 ALA for prefrontal support; polyphenols reduce the neuroinflammation linked to reduced empathy" },
      { food: "Sardines", why: "Omega-3s + vitamin D + B12; addresses prefrontal function, serotonin gene expression, and nerve health" },
    ],
    foodsToMinimize: [
      { food: "Alcohol", why: "Directly reduces prefrontal cortex function and removes the already-thin impulse control ASPD challenges" },
      { food: "Refined sugar", why: "Blood sugar crashes reduce prefrontal activity; the irritability phase worsens impulsive behavior" },
      { food: "Processed foods with additives", why: "Inflammatory compounds further impair the prefrontal cortex function ASPD needs most" },
      { food: "Excessive caffeine", why: "Increases arousal and can worsen impulsive reactions by lowering the threshold for behavioral triggers" },
      { food: "Trans fats & fried foods", why: "Neuroinflammation from trans fats further impairs the empathy circuits that ASPD underactivates" },
    ],
    mealPattern: {
      frequency: "3 meals + 1–2 protein-rich snacks",
      macroSplit: "30% protein, 35% complex carbs, 35% healthy fats",
      timing: "Protein at every meal to maintain steady amino acid supply for prefrontal neurotransmitter production",
      keyRule: "Omega-3s are your most important dietary tool. Multiple trials show omega-3 supplementation reduces impulsive aggression. Prioritize fatty fish at least 3× per week and avoid the blood sugar crashes that shut down prefrontal function."
    }
  },

  eating: {
    label: "Eating Disorder Recovery",
    emoji: "💛",
    summary: "Eating disorder recovery requires rebuilding depleted nutritional stores without triggering restriction or shame. Your diet should prioritize complete, balanced nutrition, rebuilding the gut microbiome, and restoring the brain's ability to accurately read hunger and fullness signals.",
    priorityNutrients: [
      { name: "Complete Protein", role: "Protein malnutrition impairs every neurotransmitter system simultaneously; complete protein provides the amino acids your brain needs to restart normal function", topSources: "eggs, chicken, salmon, yogurt, lentils" },
      { name: "Healthy Fats", role: "The brain is 60% fat; fat restriction literally starves the brain of its building material, impairing mood, cognition, and hormone production", topSources: "avocado, salmon, nuts, olive oil, eggs" },
      { name: "Zinc", role: "Commonly severely depleted in eating disorders; zinc deficiency impairs taste, appetite, and serotonin function. This creates a cycle of further restriction", topSources: "red meat, pumpkin seeds, chickpeas, eggs" },
      { name: "Iron", role: "Anemia is common in eating disorders; iron deficiency causes fatigue, brain fog, and depression even before clinical anemia develops", topSources: "red meat, spinach, lentils, fortified cereals" },
      { name: "B Vitamins", role: "Depleted by malnutrition; required for energy production, neurotransmitter synthesis, and the metabolic repair recovery demands", topSources: "eggs, salmon, leafy greens, whole grains" },
      { name: "Calcium & Vitamin D", role: "Bone density loss is a serious medical consequence of eating disorders; rebuilding requires consistent calcium and vitamin D", topSources: "yogurt, salmon, fortified foods, leafy greens" },
    ],
    powerFoods: [
      { food: "Eggs", why: "Complete protein, healthy fats, and 13 essential nutrients in a non-threatening portion size" },
      { food: "Yogurt", why: "Protein, calcium, probiotics, and tryptophan; rebuilds gut health and bone density simultaneously" },
      { food: "Salmon", why: "Omega-3s for brain rebuilding, vitamin D for bone health, and complete protein for neurotransmitter repair" },
      { food: "Avocado", why: "Healthy fats for brain restoration, potassium for heart health (electrolyte balance is critical), and B vitamins" },
      { food: "Oatmeal", why: "Gentle on the GI system, provides steady energy, and delivers B vitamins and fiber for gut rebuilding" },
      { food: "Sweet Potatoes", why: "Nutrient-dense complex carbs that are gentle on the digestive system; provide vitamin A, B6, and fiber" },
      { food: "Bananas", why: "Potassium for electrolyte balance (critical in recovery), B6, and gentle natural sugars for brain energy" },
      { food: "Chicken", why: "Complete lean protein for rebuilding; zinc and B vitamins for neurotransmitter restoration" },
      { food: "Nut Butters", why: "Calorie-dense healthy fats and protein; can be added to familiar foods for gentle nutritional boosting" },
      { food: "Berries", why: "Antioxidants for repair, natural sweetness to rebuild the taste-reward connection, and gentle fiber" },
    ],
    foodsToMinimize: [
      { food: "Diet / 'zero calorie' products", why: "Reinforce restrictive thinking and can trigger the exact thought patterns recovery is working to overcome" },
      { food: "Caffeine (excessive)", why: "Appetite suppressant properties undermine recovery; can trigger anxiety and disrupt the eating schedule" },
      { food: "Highly processed 'health' foods", why: "Often marketed with restriction language (low-fat, guilt-free, clean eating) that triggers eating disorder cognition" },
      { food: "Raw vegetables as meal replacement", why: "Using low-calorie foods to fill up is a form of restriction; meals should include adequate protein, carbs, and fats" },
    ],
    mealPattern: {
      frequency: "3 full meals + 2–3 snacks (as directed by treatment team)",
      macroSplit: "Balanced – all macros are needed; no food group should be restricted without medical reason",
      timing: "Follow your treatment team's meal plan; consistent meal times help rebuild hunger/fullness signaling",
      keyRule: "All food is nourishment. Your brain cannot heal without adequate fuel from all food groups. Recovery is not about 'eating healthy'. It's about eating enough, consistently, without conditions."
    }
  },

  phobia: {
    label: "Phobias",
    emoji: "🛡️",
    summary: "Phobias involve an overactive amygdala fear response and insufficient GABA inhibition. Your diet should prioritize GABA production (magnesium, B6), cortisol regulation (vitamin C, B5), and serotonin for overall anxiety and fear modulation.",
    priorityNutrients: [
      { name: "Magnesium", role: "Directly activates GABA-A receptors – the brain's primary fear-inhibiting system; low magnesium leaves fear circuits without their brake pedal", topSources: "dark leafy greens, pumpkin seeds, almonds, dark chocolate" },
      { name: "Vitamin B6", role: "Rate-limiting cofactor for converting glutamate (excitatory) to GABA (calming); without B6 your brain can't produce its own anti-fear chemical", topSources: "chicken, salmon, potatoes, bananas" },
      { name: "Tryptophan", role: "Serotonin modulates the fear response at the amygdala level; low serotonin amplifies phobic reactions", topSources: "turkey, eggs, salmon, pumpkin seeds" },
      { name: "Omega-3 EPA", role: "Reduces inflammatory cytokines that sensitize the amygdala fear circuits to lower thresholds", topSources: "salmon, sardines, mackerel, walnuts" },
      { name: "Vitamin C", role: "Lowers cortisol within hours; supports the adrenal recovery needed after repeated fear exposure", topSources: "bell peppers, citrus, berries, broccoli" },
      { name: "L-Theanine sources", role: "Increases GABA and alpha brain waves; promotes calm alertness without sedation", topSources: "green tea, matcha" },
    ],
    powerFoods: [
      { food: "Dark Leafy Greens", why: "Densest magnesium source; directly supports GABA production to inhibit the fear response" },
      { food: "Salmon", why: "EPA reduces amygdala inflammation; omega-3s lower the baseline reactivity of fear circuits" },
      { food: "Turkey", why: "Tryptophan for serotonin to modulate the fear response at the amygdala level" },
      { food: "Pumpkin Seeds", why: "Magnesium + tryptophan + zinc; the complete fear-circuit calming package" },
      { food: "Green Tea", why: "L-theanine increases GABA and alpha brain waves; promotes calm without drowsiness" },
      { food: "Bell Peppers", why: "Highest vitamin C food; supports cortisol clearance after fear exposure" },
      { food: "Eggs", why: "B6 for GABA synthesis, tryptophan for serotonin, and choline for stress resilience" },
      { food: "Sweet Potatoes", why: "Complex carbs boost brain serotonin; B6 content supports GABA production" },
    ],
    foodsToMinimize: [
      { food: "Caffeine", why: "Directly stimulates the fight-or-flight response; can trigger phobic reactions or panic in predisposed individuals" },
      { food: "Alcohol", why: "Temporarily reduces fear but depletes GABA receptors over time, worsening phobias long-term" },
      { food: "Refined sugar", why: "Blood sugar crashes trigger adrenaline release that the phobic brain interprets as fear confirmation" },
      { food: "Processed foods", why: "Inflammatory compounds sensitize the amygdala, lowering the threshold for phobic fear activation" },
    ],
    mealPattern: {
      frequency: "3 meals + 1–2 calming snacks",
      macroSplit: "25% protein, 45% complex carbs, 30% healthy fats",
      timing: "Magnesium-rich snack before exposure situations; complex carbs in the evening for serotonin and sleep",
      keyRule: "GABA is your brain's natural anti-fear chemical. Every meal should include at least one GABA-supporting food (leafy greens, pumpkin seeds, almonds) to keep your fear circuits' brake pedal functional."
    }
  },

  bfrb: {
    label: "Body-Focused Repetitive Behaviors",
    emoji: "✋",
    summary: "BFRBs are driven by nervous system hyperarousal and reduced GABA inhibition in the basal ganglia. Your diet should prioritize calming the nervous system (magnesium, GABA support), reducing glutamate excitotoxicity, and supporting the impulse control circuits in the prefrontal cortex.",
    priorityNutrients: [
      { name: "Magnesium", role: "Reduces the neuronal hyperexcitability that drives repetitive behaviors; activates GABA receptors to raise the threshold for urges", topSources: "dark leafy greens, pumpkin seeds, almonds, dark chocolate" },
      { name: "NAC precursors", role: "N-acetylcysteine is the most studied supplement for BFRBs; modulates glutamate in the basal ganglia where urges originate", topSources: "chicken, turkey, eggs, garlic, onions" },
      { name: "B Vitamins (B6, B12)", role: "B6 converts glutamate to GABA; B12 supports the nerve health needed for impulse control signaling", topSources: "eggs, salmon, chicken, leafy greens" },
      { name: "Omega-3 EPA", role: "Reduces neuroinflammation that sensitizes the basal ganglia circuits producing BFRB urges", topSources: "salmon, sardines, mackerel, walnuts" },
      { name: "Tryptophan", role: "Serotonin supports impulse control and reduces the anxiety that often precedes pulling/picking episodes", topSources: "turkey, eggs, salmon, pumpkin seeds" },
      { name: "Zinc", role: "Supports GABA and serotonin receptor function; deficiency increases nervous system excitability", topSources: "red meat, pumpkin seeds, lentils, chickpeas" },
    ],
    powerFoods: [
      { food: "Pumpkin Seeds", why: "Magnesium + zinc + tryptophan. Addresses GABA, serotonin, and nervous system calm simultaneously" },
      { food: "Eggs", why: "Cysteine (NAC precursor) + B vitamins + tryptophan; targets the glutamate and serotonin pathways most involved in BFRBs" },
      { food: "Dark Leafy Greens", why: "Densest magnesium source; directly reduces the neuronal hyperexcitability driving repetitive urges" },
      { food: "Salmon", why: "EPA reduces basal ganglia neuroinflammation; omega-3s support impulse control circuits" },
      { food: "Turkey", why: "Tryptophan + cysteine; supports both serotonin and glutamate modulation pathways" },
      { food: "Dark Chocolate (70%+)", why: "Magnesium + flavanols; a small daily serving supports GABA production and reduces nervous system arousal" },
      { food: "Garlic & Onions", why: "Rich in cysteine, the precursor to NAC – the most studied dietary compound for BFRB urge reduction" },
      { food: "Sweet Potatoes", why: "Complex carbs for steady serotonin; B6 for converting glutamate to GABA" },
    ],
    foodsToMinimize: [
      { food: "Caffeine", why: "Increases nervous system arousal and lowers the threshold for pulling/picking urges" },
      { food: "Refined sugar", why: "Blood sugar crashes increase restlessness and nervous energy that triggers BFRB episodes" },
      { food: "Alcohol", why: "Reduces impulse control and worsens next-day anxiety that drives repetitive behaviors" },
      { food: "MSG & excess glutamate", why: "May increase glutamate activity in the basal ganglia circuits where BFRB urges originate" },
      { food: "Ultra-processed snack foods", why: "Often eaten mindlessly, creating a hand-to-mouth pattern that can trigger pulling/picking" },
    ],
    mealPattern: {
      frequency: "3 meals + 2 calming snacks",
      macroSplit: "25% protein, 40% complex carbs, 35% healthy fats",
      timing: "Magnesium-rich snack in the evening when urges are often strongest; avoid caffeine after noon",
      keyRule: "Calm the nervous system first, then support impulse control. Magnesium and NAC precursors (eggs, garlic, turkey) are your most direct dietary tools against BFRB urges."
    }
  },

  ppd: {
    label: "Paranoid Personality Disorder",
    emoji: "🔍",
    summary: "PPD involves overactive amygdala threat-detection circuits, elevated cortisol, and reduced prefrontal override capacity. Your diet should prioritize calming neuroinflammation (omega-3s), supporting GABA for nervous system calm, and strengthening the prefrontal cortex's ability to assess threats accurately.",
    priorityNutrients: [
      { name: "Omega-3 EPA & DHA", role: "EPA calms the neuroinflammation amplifying threat circuits; DHA strengthens prefrontal cortex membrane fluidity for accurate threat assessment", topSources: "salmon, sardines, mackerel, walnuts" },
      { name: "Magnesium", role: "Directly activates GABA receptors to calm overactive amygdala threat detection; reduces cortisol-driven hypervigilance", topSources: "dark leafy greens, pumpkin seeds, almonds, dark chocolate" },
      { name: "Vitamin D", role: "Supports oxytocin synthesis and receptor sensitivity. Gradually rebuilds your brain's capacity for interpersonal trust", topSources: "salmon, sardines, eggs, sunlight" },
      { name: "Vitamin C", role: "Accelerates cortisol metabolism, breaking the cortisol accumulation cycle that fuels paranoid hypervigilance", topSources: "bell peppers, citrus, berries, broccoli" },
      { name: "B Vitamins (B12, Folate, B6)", role: "Break down homocysteine (elevated in paranoid individuals) that damages blood vessels serving the prefrontal cortex", topSources: "eggs, leafy greens, salmon, chicken" },
      { name: "Tryptophan", role: "Serotonin calms overactive amygdala fear circuitry and supports interpersonal trust", topSources: "turkey, eggs, salmon, pumpkin seeds" },
    ],
    powerFoods: [
      { food: "Wild Salmon", why: "EPA calms amygdala neuroinflammation; DHA strengthens prefrontal circuits that override false alarm signals" },
      { food: "Bell Peppers", why: "Highest vitamin C food; accelerates the cortisol clearance that paranoid hypervigilance prevents" },
      { food: "Eggs", why: "Vitamin D for oxytocin, B12 for homocysteine clearance, tryptophan for serotonin – three trust-building pathways" },
      { food: "Dark Leafy Greens", why: "Magnesium to calm threat-detection circuits, folate to break down neurotoxic homocysteine" },
      { food: "Turkey", why: "Tryptophan-derived serotonin calms the overactive amygdala that generates paranoid threat assessments" },
      { food: "Blueberries", why: "Anthocyanins reduce neuroinflammation; vitamin C supports cortisol clearance" },
      { food: "Pumpkin Seeds", why: "Magnesium + zinc + tryptophan; calms the threat circuits and supports rational threat assessment" },
      { food: "Sardines", why: "Omega-3s + vitamin D + B12; addresses neuroinflammation, trust chemistry, and nerve health" },
      { food: "Fermented Foods", why: "Gut inflammation sends alarm signals through the vagus nerve that paranoid brains amplify; probiotics quiet these signals" },
      { food: "Sweet Potatoes", why: "Stable blood sugar prevents cortisol spikes that the paranoid brain misinterprets as confirmation of external threats" },
    ],
    foodsToMinimize: [
      { food: "Caffeine", why: "Stimulates cortisol and adrenaline – the exact hormones that fuel paranoid hypervigilance and threat scanning" },
      { food: "Alcohol", why: "Temporary relaxation is followed by rebound anxiety and heightened suspicion the next day" },
      { food: "Refined sugar", why: "Blood sugar crashes trigger cortisol spikes that the paranoid brain interprets as confirmation of external threats" },
      { food: "Processed foods", why: "Inflammatory compounds amplify the neuroinflammation that keeps threat-detection circuits overactive" },
      { food: "Excess sodium", why: "Raises blood pressure, creating physical sensations that hypervigilant brains misinterpret as danger signals" },
    ],
    mealPattern: {
      frequency: "3 meals + 2 calming snacks at consistent times",
      macroSplit: "25% protein, 40% complex carbs, 35% healthy fats",
      timing: "Never skip meals. Every blood sugar crash fuels the cortisol cycle; omega-3 rich fish at least 3× per week",
      keyRule: "Your brain's alarm system is overbuilt. Every meal should include at least one calming nutrient (magnesium, omega-3, tryptophan) to help the prefrontal cortex override the false alarms your amygdala generates."
    }
  },

  spd: {
    label: "Schizoid Personality Disorder",
    emoji: "🔋",
    summary: "SPD involves underactive dopamine reward circuits and reduced social motivation. Your diet should prioritize dopamine precursors and cofactors, omega-3s for neural membrane health in social cognition circuits, and BDNF boosters to support neuroplasticity in reward pathways.",
    priorityNutrients: [
      { name: "Tyrosine", role: "Direct precursor to dopamine – the neurotransmitter most responsible for motivation, anticipatory pleasure, and goal-directed behavior", topSources: "chicken, salmon, eggs, beef, almonds" },
      { name: "Omega-3 DHA", role: "Neural membrane fluidity in social cognition circuits is reduced in SPD; DHA is the primary structural fat needed to restore it", topSources: "salmon, sardines, mackerel, walnuts" },
      { name: "Iron", role: "Required for tyrosine hydroxylase – the rate-limiting enzyme in dopamine synthesis. Without iron, protein intake can't become dopamine", topSources: "red meat, spinach, lentils, pumpkin seeds" },
      { name: "Vitamin B12", role: "Protects myelin sheaths that carry social and emotional signals; deficiency slows the neural communication SPD already underutilizes", topSources: "salmon, beef, eggs, sardines" },
      { name: "Vitamin D", role: "Receptors concentrated in the substantia nigra (dopamine factory); deficiency associated with up to 30% less dopamine synthesis", topSources: "salmon, sardines, eggs, sunlight" },
      { name: "B6 & Folate", role: "B6 is the final cofactor in dopamine synthesis; folate drives the methylation cycle producing SAMe, which supports both dopamine and serotonin", topSources: "chicken, salmon, leafy greens, potatoes" },
    ],
    powerFoods: [
      { food: "Wild Salmon", why: "DHA restores neural membrane fluidity in social circuits; vitamin D supports the dopamine factory; complete protein provides tyrosine" },
      { food: "Eggs", why: "Tyrosine + B12 + vitamin D + choline; choline drives acetylcholine production for arousal and engagement" },
      { food: "Grass-Fed Beef", why: "Richest heme iron source to unblock dopamine synthesis; also provides B12, zinc, and tyrosine" },
      { food: "Dark Leafy Greens", why: "Folate for SAMe production, magnesium for cellular energy, iron for dopamine enzyme function" },
      { food: "Blueberries", why: "Boost BDNF production – the protein that builds new neural pathways in reward and social circuits" },
      { food: "Dark Chocolate (70%+)", why: "PEA directly stimulates dopamine release; magnesium supports cellular energy in low-motivation states" },
      { food: "Chicken", why: "High tyrosine and B6 for dopamine synthesis; B3 (niacin) for NAD+ energy production" },
      { food: "Sardines", why: "DHA + vitamin D + B12 – three nutrients that directly support the dopamine and social cognition systems SPD underactivates" },
      { food: "Pumpkin Seeds", why: "Iron + zinc + magnesium; removes bottlenecks in dopamine synthesis and supports cellular energy" },
      { food: "Sweet Potatoes", why: "B6 for the final dopamine conversion step; complex carbs for the brain energy SPD brains need to engage" },
    ],
    foodsToMinimize: [
      { food: "Refined sugar", why: "Causes dopamine spikes followed by crashes, worsening the already low dopamine baseline" },
      { food: "Ultra-processed foods", why: "Lack the tyrosine, iron, and B vitamins needed for dopamine synthesis; replace them with nutrient-dense alternatives" },
      { food: "Excessive alcohol", why: "Further suppresses the dopamine system and reduces motivation and social engagement" },
      { food: "Low-protein diets", why: "Without adequate protein, your brain cannot access tyrosine. No tyrosine means no dopamine, regardless of other nutrients" },
    ],
    mealPattern: {
      frequency: "3 protein-rich meals + 1–2 energy-boosting snacks",
      macroSplit: "35% protein, 35% complex carbs, 30% healthy fats",
      timing: "High-protein breakfast to kickstart dopamine production; never go more than 4 hours without eating",
      keyRule: "Protein is your most important macronutrient. Every meal must include a tyrosine-rich protein source. Your brain literally cannot produce motivation without it. Prioritize eggs, salmon, chicken, and beef."
    }
  },

  neuro_core: {
    label: "Neuro Core (General Brain Health)",
    emoji: "🧠",
    summary: "Optimizing general brain health means supporting all neurotransmitter systems, reducing neuroinflammation, and maintaining the gut-brain axis. Your diet should follow an anti-inflammatory, nutrient-dense pattern with emphasis on omega-3s, antioxidants, and gut health.",
    priorityNutrients: [
      { name: "Omega-3 DHA & EPA", role: "DHA makes up 97% of the brain's omega-3 content; EPA reduces neuroinflammation; together they support every cognitive function", topSources: "salmon, sardines, mackerel, walnuts" },
      { name: "Magnesium", role: "Cofactor for 600+ enzymatic reactions including neurotransmitter synthesis, ATP production, and GABA receptor activation", topSources: "dark leafy greens, pumpkin seeds, almonds, dark chocolate" },
      { name: "B Vitamins", role: "B6, B12, and folate support the methylation cycle that produces all major neurotransmitters and clears neurotoxic homocysteine", topSources: "eggs, salmon, leafy greens, chicken" },
      { name: "Antioxidants", role: "The brain generates more oxidative stress per gram than any other organ; antioxidants protect neurons from cumulative damage", topSources: "berries, dark chocolate, colorful vegetables, green tea" },
      { name: "Probiotics & Fiber", role: "The gut produces 95% of serotonin and 50% of dopamine precursors; gut health IS brain health", topSources: "yogurt, kefir, kimchi, diverse vegetables" },
      { name: "Vitamin D", role: "Activates genes involved in serotonin production, neuroprotection, and immune regulation in the brain", topSources: "salmon, sardines, eggs, sunlight" },
    ],
    powerFoods: [
      { food: "Wild Salmon", why: "The single most brain-beneficial food: DHA, EPA, vitamin D, B12, and complete protein in one serving" },
      { food: "Blueberries", why: "Among the most potent dietary antioxidants; improve memory, cerebral blood flow, and BDNF production" },
      { food: "Eggs", why: "13 essential nutrients including choline (most people are deficient); the most complete single food for brain health" },
      { food: "Dark Leafy Greens", why: "Folate, magnesium, vitamin K, and lutein; every nutrient here has independent evidence for brain protection" },
      { food: "Walnuts", why: "The only nut with significant omega-3 content; also provides melatonin and neuroprotective polyphenols" },
      { food: "Avocado", why: "Oleic acid for myelin health, B vitamins, potassium, and lutein for brain tissue protection" },
      { food: "Dark Chocolate (70%+)", why: "Flavanols increase cerebral blood flow by up to 30%; magnesium and PEA for neurotransmitter support" },
      { food: "Fermented Foods", why: "Gut microbiome diversity is the strongest predictor of cognitive resilience in aging populations" },
      { food: "Turmeric", why: "Curcumin crosses the blood-brain barrier and raises BDNF; the most studied spice for neuroprotection" },
      { food: "Sweet Potatoes", why: "Beta-carotene, B6, and complex carbs; supports synaptic plasticity and steady brain energy" },
    ],
    foodsToMinimize: [
      { food: "Ultra-processed foods", why: "The SMILES trial and subsequent studies show ultra-processed diets impair cognition and increase brain inflammation" },
      { food: "Refined sugar", why: "Reduces BDNF, increases neuroinflammation, and shrinks the hippocampus over time" },
      { food: "Trans fats", why: "Directly replace DHA in neural membranes, making them rigid and impairing neurotransmitter signaling" },
      { food: "Excess alcohol", why: "Neurotoxic above moderate amounts; depletes B vitamins, damages the hippocampus, and disrupts sleep architecture" },
      { food: "Artificial additives", why: "Some preservatives and dyes show neurotoxic potential; unnecessary chemicals the brain must process and eliminate" },
    ],
    mealPattern: {
      frequency: "3 meals + 1–2 brain-boosting snacks",
      macroSplit: "25% protein, 40% complex carbs, 35% healthy fats",
      timing: "Omega-3 rich meals at least 3× per week; diverse colorful foods daily for antioxidant breadth",
      keyRule: "Follow the Mediterranean diet pattern. It has the strongest evidence base of any dietary pattern for brain health, reducing cognitive decline risk by up to 35% in long-term studies."
    }
  },

  default: {
    label: "General Brain Health",
    emoji: "🧠",
    summary: "A brain-optimized diet prioritizes omega-3 fats, antioxidants, B vitamins, and gut health. These nutrients support neurotransmitter production, reduce neuroinflammation, and maintain the cognitive function that underpins mental health.",
    priorityNutrients: [
      { name: "Omega-3 DHA & EPA", role: "DHA is the primary structural fat in the brain; EPA reduces neuroinflammation. Together they support every cognitive function", topSources: "salmon, sardines, mackerel, walnuts" },
      { name: "Magnesium", role: "Cofactor for 600+ enzymatic reactions including neurotransmitter synthesis and GABA receptor activation", topSources: "dark leafy greens, pumpkin seeds, almonds, dark chocolate" },
      { name: "B Vitamins (B6, B12, Folate)", role: "Drive the methylation cycle that produces serotonin, dopamine, and norepinephrine", topSources: "eggs, salmon, leafy greens, chicken" },
      { name: "Antioxidants", role: "The brain generates more oxidative stress per gram than any other organ; antioxidants protect neurons", topSources: "berries, dark chocolate, colorful vegetables" },
      { name: "Probiotics", role: "The gut produces 95% of serotonin; gut microbiome health directly determines brain neurotransmitter levels", topSources: "yogurt, kefir, kimchi, sauerkraut" },
      { name: "Vitamin D", role: "Activates serotonin gene expression and supports neuroprotection", topSources: "salmon, sardines, eggs, sunlight" },
    ],
    powerFoods: [
      { food: "Wild Salmon", why: "DHA, EPA, vitamin D, and B12 – the single most brain-beneficial food available" },
      { food: "Blueberries", why: "The most potent dietary antioxidant; improves memory and cerebral blood flow" },
      { food: "Eggs", why: "13 essential nutrients including choline; the most complete single food for brain health" },
      { food: "Dark Leafy Greens", why: "Folate, magnesium, and vitamin K. Every nutrient has independent brain protection evidence" },
      { food: "Walnuts", why: "The only nut with omega-3s plus melatonin and neuroprotective polyphenols" },
      { food: "Avocado", why: "Oleic acid for myelin, B vitamins, and lutein for brain tissue protection" },
      { food: "Turmeric", why: "Curcumin crosses the blood-brain barrier and boosts BDNF" },
      { food: "Fermented Foods", why: "Gut diversity is the strongest predictor of cognitive resilience" },
    ],
    foodsToMinimize: [
      { food: "Ultra-processed foods", why: "Increase brain inflammation and impair cognition in clinical studies" },
      { food: "Refined sugar", why: "Reduces BDNF and increases neuroinflammation" },
      { food: "Trans fats", why: "Replace DHA in neural membranes, impairing neurotransmitter signaling" },
      { food: "Excess alcohol", why: "Neurotoxic above moderate amounts; depletes B vitamins and damages the hippocampus" },
    ],
    mealPattern: {
      frequency: "3 meals + 1–2 brain-boosting snacks",
      macroSplit: "25% protein, 40% complex carbs, 35% healthy fats",
      timing: "Omega-3 rich meals 3× per week; diverse colorful foods daily",
      keyRule: "Follow the Mediterranean diet pattern. It has the strongest evidence base of any dietary approach for brain health."
    }
  },
};
