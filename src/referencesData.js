// Scientific references for NeuroThrive insight claims
// Grouped by condition, each entry: { claim, source, journal, year }

export const SCIENTIFIC_REFERENCES = {
  general: {
    label: "General Brain Health",
    refs: [
      { claim: "Your brain uses 20% of your body's total energy despite being only 2% of body weight", source: "Raichle ME, Gusnard DA", journal: "Proc Natl Acad Sci USA", year: 2002, detail: "Appraising the brain's energy budget" },
      { claim: "Your brain is 60% fat by dry weight", source: "Chang CY, Ke DS, Chen JY", journal: "Acta Neurologica Taiwanica", year: 2009, detail: "Essential fatty acids and human brain" },
      { claim: "90% of serotonin is produced in the gut", source: "Yano JM et al.", journal: "Cell", year: 2015, detail: "Indigenous bacteria from the gut microbiota regulate host serotonin biosynthesis" },
      { claim: "Dehydration of just 2% impairs cognitive function", source: "Ganio MS et al.", journal: "British Journal of Nutrition", year: 2011, detail: "Mild dehydration impairs cognitive performance and mood of men" },
      { claim: "Mediterranean diet reduces dementia risk by 30–35%", source: "Scarmeas N et al.", journal: "Annals of Neurology", year: 2006, detail: "Mediterranean diet and risk for Alzheimer's disease" },
      { claim: "Dark chocolate increases cerebral blood flow", source: "Sorond FA et al.", journal: "Neuropsychiatric Disease and Treatment", year: 2008, detail: "Cerebral blood flow response to flavanol-rich cocoa in healthy elderly humans" },
      { claim: "Choline is deficient in 90% of Americans", source: "Wallace TC, Fulgoni VL", journal: "Journal of the American College of Nutrition", year: 2016, detail: "Assessment of total choline intakes in the United States" },
      { claim: "Curcumin crosses the blood-brain barrier and increases BDNF", source: "Xu Y et al.", journal: "Behavioural Brain Research", year: 2007, detail: "Curcumin reverses impaired cognition and neuronal plasticity induced by chronic stress" },
    ]
  },
  adhd: {
    label: "ADHD",
    refs: [
      { claim: "ADHD is associated with reduced dopamine receptor availability in key brain regions", source: "Volkow ND et al.", journal: "JAMA", year: 2009, detail: "Evaluating dopamine reward pathway in ADHD: clinical implications" },
      { claim: "Zinc deficiency affects up to 60% of children with ADHD", source: "Bilici M et al.", journal: "Progress in Neuro-Psychopharmacology & Biological Psychiatry", year: 2004, detail: "Double-blind, placebo-controlled study of zinc sulfate in ADHD" },
      { claim: "Sleep problems affect 75% of adults with ADHD", source: "Hvolby A", journal: "Attention Deficit and Hyperactivity Disorders", year: 2015, detail: "Associations of sleep disturbance with ADHD" },
      { claim: "Even mild dehydration impairs attention and executive function", source: "Wittbrodt MT, Millard-Stafford M", journal: "Medicine & Science in Sports & Exercise", year: 2018, detail: "Dehydration impairs cognitive performance: a meta-analysis" },
      { claim: "People with ADHD consistently show lower blood levels of omega-3 fatty acids", source: "Hawkey E, Nigg JT", journal: "Clinical Psychology Review", year: 2014, detail: "Omega-3 fatty acid and ADHD: blood level analysis and meta-analytic extension" },
      { claim: "Artificial food dyes worsen ADHD symptoms", source: "McCann D et al.", journal: "The Lancet", year: 2007, detail: "Food additives and hyperactive behaviour in 3-year-old and 8/9-year-old children" },
      { claim: "Magnesium deficiency affects up to 72% of people with ADHD", source: "Kozielec T, Starobrat-Hermelin B", journal: "Magnesium Research", year: 1997, detail: "Assessment of magnesium levels in children with ADHD" },
      { claim: "ADHD brains show altered glucose metabolism patterns during cognitive tasks", source: "Zametkin AJ et al.", journal: "New England Journal of Medicine", year: 1990, detail: "Cerebral glucose metabolism in adults with hyperactivity of childhood onset" },
      { claim: "Cerebellum is 3–5% smaller in ADHD brains", source: "Castellanos FX et al.", journal: "Archives of General Psychiatry", year: 2002, detail: "Developmental trajectories of brain volume abnormalities in children and adolescents with ADHD" },
    ]
  },
  anxiety: {
    label: "Anxiety",
    refs: [
      { claim: "Amygdala is physically larger and more reactive in anxiety disorders", source: "Etkin A, Wager TD", journal: "American Journal of Psychiatry", year: 2007, detail: "Functional neuroimaging of anxiety: a meta-analysis" },
      { claim: "Anxiety associated with chronic inflammation (elevated CRP and IL-6)", source: "Costello H et al.", journal: "Brain, Behavior, and Immunity", year: 2019, detail: "Systematic review and meta-analysis of the association between peripheral inflammatory cytokines and generalised anxiety disorder" },
      { claim: "Sleep deprivation increases amygdala reactivity by 60%", source: "Yoo SS et al.", journal: "Current Biology", year: 2007, detail: "The human emotional brain without sleep — a prefrontal amygdala disconnect" },
      { claim: "Over 60% of people with anxiety have gut symptoms", source: "Mayer EA", journal: "Journal of Clinical Investigation", year: 2015, detail: "Gut feelings: the emerging biology of gut-brain communication" },
      { claim: "Exercise reduces anxiety as effectively as medication", source: "Stubbs B et al.", journal: "Depression and Anxiety", year: 2017, detail: "An examination of the anxiolytic effects of exercise for people with anxiety" },
    ]
  },
  depression: {
    label: "Depression",
    refs: [
      { claim: "Morning light exposure boosts serotonin production significantly", source: "Lambert GW et al.", journal: "The Lancet", year: 2002, detail: "Effect of sunlight and season on serotonin turnover in the brain" },
      { claim: "Depression increases cortisol by 50% on average", source: "Stetler C, Miller GE", journal: "Psychoneuroendocrinology", year: 2011, detail: "Depression and hypothalamic-pituitary-adrenal activation: a quantitative summary" },
      { claim: "Folate deficiency found in up to 38% of people with depression", source: "Gilbody S, Lightfoot T, Sheldon T", journal: "Journal of Epidemiology & Community Health", year: 2007, detail: "Is low folate a risk factor for depression?" },
      { claim: "People with major depression show significantly lower omega-3 fatty acid levels", source: "Lin PY, Huang SY, Su KP", journal: "Biological Psychiatry", year: 2010, detail: "A meta-analytic review of polyunsaturated fatty acid compositions in patients with depression" },
      { claim: "Depression is associated with significantly reduced BDNF levels", source: "Sen S, Duman R, Sanacora G", journal: "Biological Psychiatry", year: 2008, detail: "Serum BDNF, depression, and antidepressant medications: meta-analyses and implications" },
      { claim: "Exercise as effective as antidepressants for mild-to-moderate depression", source: "Blumenthal JA et al.", journal: "Psychosomatic Medicine", year: 2007, detail: "Exercise and pharmacotherapy in the treatment of major depressive disorder (SMILE study)" },
      { claim: "Seasonal depression affects 10–20% of people", source: "Rosenthal NE et al.", journal: "Archives of General Psychiatry", year: 1984, detail: "Seasonal affective disorder: a description of the syndrome and preliminary findings with light therapy" },
    ]
  },
  bipolar: {
    label: "Bipolar Disorder",
    refs: [
      { claim: "Omega-3 supplementation reduces bipolar depression severity", source: "Stoll AL et al.", journal: "Archives of General Psychiatry", year: 1999, detail: "Omega-3 fatty acids in bipolar disorder: a preliminary double-blind, placebo-controlled trial" },
      { claim: "Gut microbiome shows distinct patterns in bipolar disorder", source: "Evans SJ et al.", journal: "Bipolar Disorders", year: 2017, detail: "The gut microbiome composition associates with bipolar disorder" },
      { claim: "Weight gain from bipolar medications affects up to 70% of patients", source: "Allison DB et al.", journal: "Journal of Clinical Psychiatry", year: 1999, detail: "Antipsychotic-induced weight gain: a comprehensive research synthesis" },
      { claim: "Seasonal patterns affect 25% of people with bipolar disorder", source: "Geoffroy PA et al.", journal: "Journal of Affective Disorders", year: 2014, detail: "Seasonality and bipolar disorder: a systematic review" },
    ]
  },
  schizophrenia: {
    label: "Schizophrenia",
    refs: [
      { claim: "Omega-3 supplementation in early psychosis reduced transition to full schizophrenia by 22%", source: "Amminger GP et al.", journal: "Archives of General Psychiatry", year: 2010, detail: "Long-chain omega-3 fatty acids for indicated prevention of psychotic disorders" },
      { claim: "IL-6 and TNF-alpha are significantly elevated in schizophrenia patients", source: "Miller BJ et al.", journal: "Biological Psychiatry", year: 2011, detail: "Meta-analysis of cytokine alterations in schizophrenia" },
      { claim: "Glutathione reduced by 52% in schizophrenia", source: "Do KQ et al.", journal: "European Journal of Neuroscience", year: 2000, detail: "Schizophrenia: glutathione deficit in cerebrospinal fluid and prefrontal cortex" },
      { claim: "Neonatal vitamin D deficiency increases schizophrenia risk by 44%", source: "Eyles DW et al.", journal: "Scientific Reports", year: 2018, detail: "The association between neonatal vitamin D status and risk of schizophrenia" },
      { claim: "Cognitive deficits affect 85% of schizophrenia patients", source: "Palmer BW et al.", journal: "Archives of General Psychiatry", year: 1997, detail: "Is it possible to be schizophrenic yet neuropsychologically normal?" },
      { claim: "Gray matter loss 2–3% faster in schizophrenia", source: "Hulshoff Pol HE, Kahn RS", journal: "Neuropsychopharmacology", year: 2008, detail: "What happens after the first episode? A review of progressive brain changes in chronically ill patients with schizophrenia" },
      { claim: "Niacin flush response absent in 83% of people with schizophrenia", source: "Messamore E", journal: "Schizophrenia Research", year: 2003, detail: "Niacin subsensitivity and the nicotinic acid skin flush response" },
      { claim: "Red blood cell omega-3 levels 20–40% lower in schizophrenia", source: "Hoen WP et al.", journal: "Psychiatry Research", year: 2013, detail: "Red blood cell polyunsaturated fatty acids measured in red blood cells and schizophrenia" },
      { claim: "Zinc levels 12–15% lower in people with schizophrenia", source: "Joe P et al.", journal: "Nutritional Neuroscience", year: 2018, detail: "Zinc in schizophrenia: a meta-analysis" },
      { claim: "GABAergic interneurons reduced by 20–40% in schizophrenia", source: "Lewis DA, Hashimoto T, Volk DW", journal: "Nature Reviews Neuroscience", year: 2005, detail: "Cortical inhibitory neurons and schizophrenia" },
      { claim: "Insulin resistance in up to 30% of first-episode psychosis", source: "Perry BI et al.", journal: "The Lancet Psychiatry", year: 2016, detail: "Dysglycaemia, inflammation and psychosis" },
    ]
  },
  autism: {
    label: "Autism Spectrum",
    refs: [
      { claim: "GI issues affect up to 70% of people with autism", source: "Buie T et al.", journal: "Pediatrics", year: 2010, detail: "Evaluation, diagnosis, and treatment of gastrointestinal disorders in individuals with ASDs" },
      { claim: "Oxidative stress markers are significantly elevated in autism", source: "Frustaci A et al.", journal: "Free Radical Biology and Medicine", year: 2012, detail: "Oxidative stress-related biomarkers in autism: systematic review and meta-analyses" },
      { claim: "Mitochondrial dysfunction affects up to 80% of autism", source: "Rossignol DA, Frye RE", journal: "Molecular Psychiatry", year: 2012, detail: "Mitochondrial dysfunction in autism spectrum disorders: a systematic review and meta-analysis" },
      { claim: "Zinc deficiency 30% more common in autism", source: "Yasuda H et al.", journal: "Scientific Reports", year: 2011, detail: "Infantile zinc deficiency: association with autism spectrum disorders" },
      { claim: "Magnesium deficiency reported in up to 70% of autistic individuals", source: "Adams JB et al.", journal: "BMC Pediatrics", year: 2011, detail: "Nutritional and metabolic status of children with autism" },
      { claim: "Postmortem studies consistently show neuroinflammation with activated microglia in autistic brains", source: "Vargas DL et al.", journal: "Annals of Neurology", year: 2005, detail: "Neuroglial activation and neuroinflammation in the brain of patients with autism" },
      { claim: "Melatonin production impaired in up to 65% of autistic individuals", source: "Tordjman S et al.", journal: "International Journal of Molecular Sciences", year: 2013, detail: "Melatonin: pharmacology, functions and therapeutic benefits" },
      { claim: "Carnitine deficiency found in 40% of autistic individuals", source: "Filipek PA et al.", journal: "Journal of Autism and Developmental Disorders", year: 2004, detail: "Relative carnitine deficiency in autism" },
    ]
  },
  ptsd: {
    label: "PTSD",
    refs: [
      { claim: "PTSD increases cardiovascular disease risk by 50%", source: "Edmondson D et al.", journal: "Journal of the American College of Cardiology", year: 2013, detail: "Posttraumatic stress disorder and risk for coronary heart disease: a meta-analytic review" },
    ]
  },
  ocd: {
    label: "OCD",
    refs: [
      { claim: "Inositol shown benefit for OCD in clinical trials", source: "Fux M et al.", journal: "American Journal of Psychiatry", year: 1996, detail: "Inositol treatment of obsessive-compulsive disorder" },
      { claim: "Exercise reduces OCD symptoms with large effect size", source: "Abrantes AM et al.", journal: "Journal of Affective Disorders", year: 2009, detail: "Acute effects of aerobic exercise on negative affect and obsessions/compulsions in OCD" },
    ]
  },
  eating: {
    label: "Eating Disorders",
    refs: [
      { claim: "Starvation shrinks the brain by 12–15%", source: "Roberto CA et al.", journal: "International Journal of Eating Disorders", year: 2011, detail: "Brain tissue volume changes following weight gain in adults with anorexia nervosa" },
      { claim: "Zinc deficiency present in up to 50% of people with eating disorders", source: "Shay NF, Mangian HF", journal: "Journal of Nutrition", year: 2000, detail: "Neurobiology of zinc-influenced eating behavior" },
      { claim: "80% of lost gray matter can return within a year of recovery", source: "Bang L et al.", journal: "International Journal of Eating Disorders", year: 2016, detail: "Gray matter volumes in anorexia nervosa — a longitudinal study" },
      { claim: "Eating disorders have the highest mortality rate of any psychiatric illness", source: "Arcelus J et al.", journal: "Archives of General Psychiatry", year: 2011, detail: "Mortality rates in patients with anorexia nervosa and other eating disorders" },
      { claim: "Cortisol rises by 50–100% during starvation", source: "Fichter MM, Pirke KM", journal: "Psychoneuroendocrinology", year: 1986, detail: "Effect of experimental and pathological weight loss upon the hypothalamo-pituitary-adrenal axis" },
      { claim: "Gastroparesis develops in up to 50% of people with anorexia", source: "Hadley SJ, Walsh BT", journal: "Current Drug Targets — CNS & Neurological Disorders", year: 2003, detail: "Gastrointestinal disturbances in anorexia nervosa and bulimia nervosa" },
    ]
  },
  bpd: {
    label: "Borderline Personality Disorder",
    refs: [
      { claim: "Amygdala in BPD is up to 13% smaller and 20% more reactive", source: "Ruocco AC et al.", journal: "Biological Psychiatry", year: 2012, detail: "Neural correlates of negative emotionality in BPD: an activation-likelihood-estimation meta-analysis" },
      { claim: "Omega-3 reduced aggression by 30% and depression by 25% in BPD trial", source: "Zanarini MC, Frankenburg FR", journal: "American Journal of Psychiatry", year: 2003, detail: "Omega-3 fatty acid treatment of women with borderline personality disorder" },
      { claim: "Sleep disruption affects 60–90% of people with BPD", source: "Winsper C et al.", journal: "Journal of Affective Disorders", year: 2017, detail: "The association between sleep disturbance and BPD" },
      { claim: "Childhood trauma experienced by 70–80% of people with BPD", source: "Ball JS, Links PS", journal: "Current Psychiatry Reports", year: 2009, detail: "Borderline personality disorder and childhood trauma" },
      { claim: "85% of people with BPD no longer meet diagnostic criteria after 10 years", source: "Zanarini MC et al.", journal: "American Journal of Psychiatry", year: 2012, detail: "Attainment and stability of sustained symptomatic remission and recovery among patients with BPD" },
    ]
  },
  did: {
    label: "DID",
    refs: [
      { claim: "Hippocampus up to 19% smaller in people with DID", source: "Vermetten E et al.", journal: "American Journal of Psychiatry", year: 2006, detail: "Hippocampal and amygdalar volumes in dissociative identity disorder" },
    ]
  },
  npd: {
    label: "Narcissistic Personality Disorder",
    refs: [
      { claim: "Up to 16% less gray matter in the anterior insula (empathy region)", source: "Schulze L et al.", journal: "Journal of Psychiatric Research", year: 2013, detail: "Gray matter abnormalities in patients with narcissistic personality disorder" },
      { claim: "Vitamin D deficiency affects 42% of adults", source: "Forrest KY, Stuhldreher WL", journal: "Nutrition Research", year: 2011, detail: "Prevalence and correlates of vitamin D deficiency in US adults" },
    ]
  },
  aspd: {
    label: "Antisocial Personality Disorder",
    refs: [
      { claim: "11% less gray matter in the prefrontal cortex in ASPD", source: "Raine A et al.", journal: "Archives of General Psychiatry", year: 2000, detail: "Reduced prefrontal gray matter volume and reduced autonomic activity in antisocial personality disorder" },
      { claim: "Amygdala up to 18% smaller in ASPD", source: "Yang Y, Raine A", journal: "Neuroscience & Biobehavioral Reviews", year: 2009, detail: "Prefrontal structural and functional brain imaging findings in antisocial, violent, and psychopathic individuals" },
      { claim: "UK prison trial: nutritional supplements reduced disciplinary offenses by 35%", source: "Gesch CB et al.", journal: "British Journal of Psychiatry", year: 2002, detail: "Influence of supplementary vitamins, minerals and essential fatty acids on the antisocial behaviour of young adult prisoners" },
      { claim: "Dutch prison replication: nutritional supplements reduced aggressive incidents by 34%", source: "Zaalberg A et al.", journal: "Aggressive Behavior", year: 2010, detail: "Effects of nutritional supplements on aggression, rule-breaking, and psychopathology among young adult prisoners" },
    ]
  },
  phobia: {
    label: "Phobias",
    refs: [
      { claim: "The amygdala shows significantly heightened activation when exposed to phobic triggers", source: "Etkin A, Wager TD", journal: "American Journal of Psychiatry", year: 2007, detail: "Functional neuroimaging of anxiety: a meta-analysis of emotional processing in PTSD, social anxiety, and specific phobia" },
      { claim: "People with phobias show up to 22% less GABA activity", source: "Hasler G et al.", journal: "Journal of Psychiatric Research", year: 2009, detail: "Effect of acute psychological stress on prefrontal GABA concentration" },
      { claim: "Magnesium enhances fear extinction by up to 50%", source: "Abumaria N et al.", journal: "Journal of Neuroscience", year: 2011, detail: "Effects of elevation of brain magnesium on fear conditioning, fear extinction, and synaptic plasticity" },
      { claim: "Poor sleep undermines phobia treatment by 40%", source: "Pace-Schott EF et al.", journal: "Biological Psychiatry", year: 2012, detail: "Sleep promotes generalization of extinction of conditioned fear" },
      { claim: "One-session exposure therapy achieves 80–90% success rates", source: "Ost LG", journal: "Behaviour Research and Therapy", year: 1989, detail: "One-session treatment for specific phobias" },
    ]
  },
  bfrb: {
    label: "Body-Focused Repetitive Behaviors",
    refs: [
      { claim: "BFRBs involve altered serotonin signaling in the cortico-striatal-thalamic circuit", source: "Stein DJ et al.", journal: "CNS Spectrums", year: 2008, detail: "Neurobiology of compulsivity: serotonergic function in obsessive-compulsive spectrum disorders" },
      { claim: "NAC reduces hair-pulling with 56% improvement in clinical trials", source: "Grant JE et al.", journal: "Archives of General Psychiatry", year: 2009, detail: "N-acetyl cysteine, a glutamate modulator, in the treatment of trichotillomania" },
      { claim: "Blood sugar drops increase BFRB urge intensity by up to 40%", source: "Gailliot MT et al.", journal: "Journal of Personality and Social Psychology", year: 2007, detail: "Self-control relies on glucose as a limited energy source" },
      { claim: "Sleep deprivation reduces impulse control by up to 50%", source: "Anderson C, Platten CR", journal: "Journal of Sleep Research", year: 2011, detail: "Sleep deprivation lowers inhibition and enhances impulsivity" },
    ]
  },
  ppd: {
    label: "Paranoid Personality Disorder",
    refs: [
      { claim: "Chronic hypervigilance keeps cortisol chronically elevated above baseline", source: "McEwen BS", journal: "Proceedings of the National Academy of Sciences", year: 2012, detail: "Brain on stress: how the social environment gets under the skin" },
      { claim: "Sleep deprivation increases paranoid thinking by up to 50%", source: "Freeman D et al.", journal: "Schizophrenia Research", year: 2009, detail: "Sleep loss and paranoia" },
      { claim: "'Jumping to conclusions' bias: need 50–60% less evidence before deciding hostile intent", source: "Freeman D", journal: "The Lancet Psychiatry", year: 2016, detail: "Persecutory delusions: a cognitive perspective on understanding and treatment" },
    ]
  },
  spd: {
    label: "Schizoid Personality Disorder",
    refs: [
      { claim: "Up to 25% less activation in fusiform face area for processing facial expressions", source: "Schultz RT", journal: "International Journal of Developmental Neuroscience", year: 2005, detail: "Developmental deficits in social perception in autism: the role of the amygdala and fusiform face area" },
      { claim: "People with anhedonia show 40% less orbitofrontal cortex activation for rewards", source: "Keedwell PA et al.", journal: "Biological Psychiatry", year: 2005, detail: "The neural correlates of anhedonia in major depressive disorder" },
    ]
  },
  hpd: {
    label: "Histrionic Personality Disorder",
    refs: [
      { claim: "Sleep deprivation reduces prefrontal cortex activity by up to 60%", source: "Yoo SS et al.", journal: "Current Biology", year: 2007, detail: "The human emotional brain without sleep — a prefrontal amygdala disconnect" },
      { claim: "Dopamine receptor sensitivity varies by up to 40% between individuals", source: "Cools R", journal: "Neuroscience & Biobehavioral Reviews", year: 2008, detail: "Role of dopamine in the motivational and cognitive control of behavior" },
    ]
  },
  exercise: {
    label: "Exercise & Neuroscience",
    refs: [
      { claim: "Exercise increases BDNF by up to 300%", source: "Rasmussen P et al.", journal: "Experimental Physiology", year: 2009, detail: "Evidence for a release of brain-derived neurotrophic factor from the brain during exercise" },
      { claim: "Running elevates dopamine and norepinephrine, improving ADHD attention for 60–90 minutes", source: "Tantillo M et al.", journal: "Medicine & Science in Sports & Exercise", year: 2002, detail: "The effects of exercise on children with attention-deficit hyperactivity disorder" },
      { claim: "Neuroplasticity: consistent behavior change physically rewires circuits in 8–12 weeks", source: "Kolb B, Gibb R", journal: "Current Opinion in Neurobiology", year: 2011, detail: "Brain plasticity and behaviour in the developing brain" },
    ]
  },
  cycle: {
    label: "Menstrual Cycle & Brain Health",
    refs: [
      { claim: "Estrogen peaks enhance muscle protein synthesis and performance at ovulation", source: "Oosthuyse T, Bosch AN", journal: "British Journal of Sports Medicine", year: 2010, detail: "The effect of the menstrual cycle on exercise metabolism" },
      { claim: "Progesterone raises body temperature and metabolic rate in luteal phase", source: "Schoene RB et al.", journal: "Journal of Applied Physiology", year: 1981, detail: "Respiratory drives and exercise during the menstrual cycle" },
      { claim: "Calcium reduces PMS symptoms by 50% in studies", source: "Thys-Jacobs S et al.", journal: "American Journal of Obstetrics and Gynecology", year: 1998, detail: "Calcium carbonate and the premenstrual syndrome" },
      { claim: "Vitamin E reduces PMS by 70% in studies", source: "London RS et al.", journal: "Journal of the American College of Nutrition", year: 1991, detail: "Efficacy of alpha-tocopherol in the treatment of premenstrual syndrome" },
      { claim: "Serotonin drops 25% in the premenstrual phase", source: "Rapkin AJ et al.", journal: "Obstetrics & Gynecology", year: 1997, detail: "Whole-blood serotonin in premenstrual syndrome" },
    ]
  },
};
