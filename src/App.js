import React, { useState, useEffect, useRef } from "react";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { TOOLKIT_CATEGORIES, BRAIN_TOOLKIT_STATES, BRAIN_TOOLKIT } from "./brainToolkitData";
import { EXERCISE_ROUTINES } from "./exerciseData";
import { DID_YOU_KNOW, ONBOARDING_INSIGHTS, MOOD_NUTRIENT_CONNECTIONS, BRAIN_ON_CONDITION } from "./insightData";
import { ROUTINE_QUESTIONS, ROUTINE_STEP_LIBRARY, generateRoutine } from "./routineData";

const supabase = createClient(
  "https://gobmsfzpryeaqxkfbnfa.supabase.co",
  "sb_publishable_xG2_jd1824Ns89gZ7VdVYg_w_v_m1HI"
);

const MENTAL_CONDITIONS = [
  { id: "neuro_core", label: "Neuro Core Plan", emoji: "🧬" },
  { id: "adhd", label: "ADHD", emoji: "⚡" },
  { id: "anxiety", label: "Anxiety", emoji: "🌊" },
  { id: "depression", label: "Depression", emoji: "🌧️" },
  { id: "bipolar", label: "Bipolar Disorder", emoji: "🔄" },
  { id: "schizophrenia", label: "Schizophrenia", emoji: "🧩" },
  { id: "autism", label: "Autism Spectrum", emoji: "🌈" },
  { id: "ptsd", label: "PTSD", emoji: "🛡️" },
  { id: "did", label: "DID", emoji: "🪞" },
  { id: "bpd", label: "Borderline PD", emoji: "🌅" },
  { id: "npd", label: "Narcissistic PD", emoji: "🌟" },
  { id: "hpd", label: "Histrionic PD", emoji: "🌻" },
  { id: "aspd", label: "Antisocial PD", emoji: "🔒" },
  { id: "ocd", label: "OCD", emoji: "🔁" },
  { id: "eating", label: "Eating Disorders", emoji: "🍃" },
  { id: "phobia", label: "Phobias", emoji: "🦋" },
  { id: "bfrb", label: "Body-Focused Repetitive", emoji: "🌿" },
  { id: "ppd", label: "Paranoid PD", emoji: "🏡" },
  { id: "spd", label: "Schizoid PD", emoji: "🏔️" },
];

// Diet types — these define what you DO eat (inclusion-based)
const DIET_TYPES = [
  { id: "vegan", label: "Vegan", emoji: "🌱" },
  { id: "vegetarian", label: "Vegetarian", emoji: "🥦" },
  { id: "pescatarian", label: "Pescatarian", emoji: "🐟" },
  { id: "keto", label: "Keto", emoji: "🥑" },
  { id: "paleo", label: "Paleo", emoji: "🦴" },
  { id: "mediterranean", label: "Mediterranean", emoji: "🫒" },
  { id: "anti_inflammatory", label: "Anti-Inflammatory", emoji: "🔥" },
  { id: "low_fodmap", label: "Low FODMAP", emoji: "🫃" },
  { id: "halal", label: "Halal", emoji: "☪️" },
  { id: "kosher", label: "Kosher", emoji: "✡️" },
  { id: "low_sugar", label: "Low Sugar", emoji: "🍬" },
  { id: "low_sodium", label: "Low Sodium", emoji: "🧂" },
];

// Allergen restrictions — these define what you DON'T eat (exclusion-based)
const DIETARY_RESTRICTIONS = [
  { id: "gluten_free", label: "Gluten-Free", emoji: "🌾" },
  { id: "dairy_free", label: "Dairy-Free", emoji: "🥛" },
  { id: "nut_free", label: "Nut-Free", emoji: "🥜" },
  { id: "shellfish_free", label: "Shellfish-Free", emoji: "🦐" },
  { id: "soy_free", label: "Soy-Free", emoji: "🫘" },
  { id: "egg_free", label: "Egg-Free", emoji: "🥚" },
  { id: "corn_free", label: "Corn-Free", emoji: "🌽" },
  { id: "pork_free", label: "Pork-Free", emoji: "🚫" },
  { id: "rice_free", label: "Rice-Free", emoji: "🌾" },
  { id: "fish_free", label: "Fish-Free", emoji: "🐟" },
  { id: "onion_free", label: "Onion/Garlic-Free", emoji: "🧅" },
  { id: "mushroom_free", label: "Mushroom-Free", emoji: "🍄" },
  { id: "nightshade_free", label: "Nightshade-Free", emoji: "🍅" },
  { id: "coconut_free", label: "Coconut-Free", emoji: "🥥" },
  { id: "seed_free", label: "Seed-Free", emoji: "🌻" },
  { id: "legume_free", label: "Legume-Free", emoji: "🫛" },
  { id: "citrus_free", label: "Citrus-Free", emoji: "🍋" },
  { id: "oat_free", label: "Oat-Free", emoji: "🥣" },
  { id: "sardine_free", label: "Sardine-Free", emoji: "🐠" },
];

// Combined for backward compatibility
const DIETARY = [...DIET_TYPES, ...DIETARY_RESTRICTIONS];

const ALL_MEALS = {
  breakfast: [
    { name: "Grilled Chicken Sausage with Sliced Mango & Strawberries", tags: ["meat"], conditions: ["adhd","default"] },
    { name: "Chicken Sausage Patties with Sliced Peaches & Honeydew", tags: ["meat"], conditions: ["adhd","default"] },
    { name: "Ground Turkey Bowl with Sautéed Spinach & Sliced Kiwi", tags: ["meat"], conditions: ["adhd","default"] },
    { name: "Steak & Egg Scramble with Sliced Cantaloupe & Grapes", tags: ["egg","meat"], conditions: ["adhd","default"] },
    { name: "Turkey Sausage Patties with Sliced Mango & Pineapple", tags: ["meat"], conditions: ["adhd","default"] },
    { name: "Grilled Chicken with Watermelon & Blueberry Bowl", tags: ["meat"], conditions: ["adhd","default"] },
    { name: "Steak Strips with Roasted Sweet Potato & Fresh Strawberry Side", tags: ["meat"], conditions: ["adhd","default"] },
    { name: "Smoked Chicken with Sliced Papaya & Pineapple", tags: ["meat"], conditions: ["adhd","default"] },
    { name: "Beef & Veggie Scramble with Fresh Mango Slices", tags: ["meat"], conditions: ["adhd","default"] },
    { name: "Turkey & Spinach Sauté with Sliced Peaches & Raspberries", tags: ["meat"], conditions: ["adhd","default"] },
    { name: "Chicken & Sweet Potato Hash with Blueberry & Banana Side", tags: ["meat"], conditions: ["adhd","default"] },
    { name: "Ground Beef Breakfast Bowl with Cherries & Orange Slices", tags: ["meat","citrus"], conditions: ["adhd","default"] },
    { name: "Chicken Sausage with Sliced Nectarine & Mixed Berries", tags: ["meat"], conditions: ["adhd","default"] },
    { name: "Turkey Patties with Sliced Kiwi, Mango & Pineapple Bowl", tags: ["meat"], conditions: ["adhd","default"] },
    { name: "Sirloin Strips with Watermelon, Mint & Lime Side", tags: ["meat","citrus"], conditions: ["adhd","default"] },
    { name: "Chicken Thigh with Grilled Pineapple & Coconut Flakes", tags: ["meat","coconut"], conditions: ["adhd","default"] },
    { name: "Ground Turkey with Papaya, Lime & Blueberry Bowl", tags: ["meat","citrus"], conditions: ["adhd","default"] },
    { name: "Steak & Veggie Hash with Fresh Peach & Raspberry Side", tags: ["meat"], conditions: ["adhd","default"] },
    { name: "Chicken Sausage with Sliced Plum & Honeydew Melon", tags: ["meat"], conditions: ["adhd","default"] },
    { name: "Turkey Sauté with Strawberry, Banana & Sunflower Seeds", tags: ["meat","seed"], conditions: ["adhd","default"] },
    { name: "Banana Oatmeal with Honey & Cinnamon", tags: ["gluten","oats"], conditions: ["anxiety","eating","phobia","hpd","default"] },
    { name: "Avocado & Egg Toast on Sourdough", tags: ["egg","gluten"], conditions: ["anxiety","default"] },
    { name: "Blueberry Greek Yogurt Parfait", tags: ["dairy"], conditions: ["anxiety","phobia","neuro_core","bfrb","default"] },
    { name: "Warm Oatmeal with Sliced Banana & Walnuts", tags: ["gluten","oats","nuts"], conditions: ["anxiety","default"] },
    { name: "Smoothie Bowl with Spinach, Banana & Granola", tags: ["gluten"], conditions: ["anxiety","depression","default"] },
    { name: "Whole Grain Pancakes with Sliced Strawberries & Honey", tags: ["egg","gluten","dairy"], conditions: ["anxiety","default"] },
    { name: "Banana Smoothie with Almond Milk & Chia Seeds", tags: ["nuts","seed"], conditions: ["anxiety","default"] },
    { name: "Avocado Toast with Sliced Tomato & Microgreens", tags: ["gluten"], conditions: ["anxiety","depression","default"] },
    { name: "Berry Chia Pudding with Almond Milk", tags: ["nuts","seed"], conditions: ["anxiety","default"] },
    { name: "Mango Smoothie Bowl with Hemp Seeds", tags: ["seed"], conditions: ["anxiety","default"] },
    { name: "Grilled Chicken & Spinach Breakfast Wrap", tags: ["gluten","meat"], conditions: ["anxiety","default"] },
    { name: "Spinach & Mushroom Omelette with Toast", tags: ["egg","gluten","mushroom"], conditions: ["depression","default"] },
    { name: "Whole Grain Pancakes with Fresh Berries", tags: ["egg","gluten","dairy"], conditions: ["depression","default"] },
    { name: "Greek Yogurt Bowl with Granola & Banana", tags: ["dairy","gluten"], conditions: ["depression","anxiety","eating","hpd","default"] },
    { name: "Oatmeal with Sliced Banana & Chia Seeds", tags: ["gluten","oats","seed"], conditions: ["depression","bipolar","default"] },
    { name: "Veggie Omelette with Whole Grain Toast & OJ", tags: ["egg","gluten"], conditions: ["depression","schizophrenia","default"] },
    { name: "Turkey & Veggie Breakfast Skillet", tags: ["meat"], conditions: ["depression","npd","aspd","spd","default"] },
    { name: "Chicken Sausage with Roasted Peppers & Zucchini", tags: ["meat"], conditions: ["depression","default"] },
    { name: "Lentil & Veggie Breakfast Bowl", tags: ["legume"], conditions: ["depression","anxiety","aspd","bfrb","spd","default"] },
    { name: "Oatmeal with Flaxseed, Berries & Honey", tags: ["gluten","oats","seed"], conditions: ["bipolar","default"] },
    { name: "Scrambled Eggs & Whole Grain Toast with Sliced Banana", tags: ["egg","gluten"], conditions: ["bipolar","default"] },
    { name: "Smoothie Bowl with Spinach, Mango & Granola", tags: ["gluten"], conditions: ["bipolar","default"] },
    { name: "Whole Grain Toast with Avocado & Poached Egg", tags: ["egg","gluten"], conditions: ["bipolar","default"] },
    { name: "Banana Oat Pancakes with Maple Syrup & Blueberries", tags: ["egg","gluten","dairy"], conditions: ["bipolar","bpd","default"] },
    { name: "Overnight Oats with Chia, Banana & Almond Milk", tags: ["gluten","oats","nuts","seed"], conditions: ["bipolar","hpd","ppd","bfrb","default"] },
    { name: "Quinoa Porridge with Berries & Honey", tags: [], conditions: ["bipolar","default"] },
    { name: "Turkey Sausage with Roasted Sweet Potato Hash", tags: ["meat"], conditions: ["bipolar","default"] },
    { name: "Chia Seed Pudding with Mango & Coconut", tags: ["seed","coconut"], conditions: ["bipolar","anxiety","default"] },
    { name: "Oatmeal with Walnuts & Blueberries", tags: ["gluten","oats","nuts"], conditions: ["schizophrenia","neuro_core","npd","bfrb","default"] },
    { name: "Whole Grain Cereal with Milk & Sliced Banana", tags: ["gluten","dairy"], conditions: ["schizophrenia","default"] },
    { name: "Greek Yogurt Parfait with Granola & Berries", tags: ["dairy","gluten"], conditions: ["schizophrenia","ptsd","default"] },
    { name: "Warm Oatmeal with Banana & Honey", tags: ["gluten","oats"], conditions: ["ptsd","did","ppd","eating","phobia","default"] },
    { name: "Smoothie with Spinach, Banana & Almond Milk", tags: ["nuts"], conditions: ["ptsd","default"] },
    { name: "Whole Grain Toast with Peanut Butter & Sliced Banana", tags: ["gluten","nuts"], conditions: ["ptsd","ocd","default"] },
    { name: "Oatmeal with Cinnamon, Apple & Walnuts", tags: ["gluten","oats","nuts"], conditions: ["ptsd","ocd","default"] },
    { name: "Egg & Cheese Breakfast Burrito", tags: ["egg","dairy","gluten"], conditions: ["did","default"] },
    { name: "Oatmeal with Brown Sugar & Cinnamon", tags: ["gluten","oats"], conditions: ["did","default"] },
    { name: "Smoothie with Banana, Peanut Butter & Oat Milk", tags: ["gluten","oats","nuts"], conditions: ["did","default"] },
    { name: "Overnight Oats with Banana & Almond Butter", tags: ["gluten","oats","nuts"], conditions: ["did","bpd","default"] },
    { name: "Eggs Any Style with Whole Grain Toast & Fruit", tags: ["egg","gluten"], conditions: ["bpd","default"] },
    { name: "Greek Yogurt with Granola & Fresh Berries", tags: ["dairy","gluten"], conditions: ["bpd","anxiety","default"] },
    { name: "Overnight Oats with Chia & Mixed Berries", tags: ["gluten","oats","seed"], conditions: ["bpd","ocd","default"] },
    { name: "Whole Grain Waffles with Sliced Strawberries & Honey", tags: ["egg","gluten","dairy"], conditions: ["bpd","default"] },
    { name: "Whole Grain Toast with Peanut Butter & Banana", tags: ["gluten","nuts"], conditions: ["ocd","default"] },
    { name: "Scrambled Eggs & Avocado on Toast", tags: ["egg","gluten"], conditions: ["ocd","default"] },
    { name: "Greek Yogurt Parfait with Granola & Blueberries", tags: ["dairy","gluten"], conditions: ["ocd","default"] },
    { name: "Overnight Oats with Chia, Berries & Honey", tags: ["gluten","oats","seed"], conditions: ["ocd","default"] },
    { name: "Plain Scrambled Eggs with Toast", tags: ["egg","gluten"], conditions: ["autism","default"] },
    { name: "Smooth Peanut Butter Oatmeal", tags: ["gluten","oats","nuts"], conditions: ["autism","default"] },
    { name: "Banana & Vanilla Yogurt Parfait", tags: ["dairy"], conditions: ["autism","default"] },
    { name: "Oatmeal with Honey & Sliced Banana", tags: ["gluten","oats"], conditions: ["autism","default"] },
    { name: "Pancakes with Maple Syrup & Sliced Banana", tags: ["egg","gluten","dairy"], conditions: ["autism","default"] },
    { name: "Soft Scrambled Eggs with Buttered Toast", tags: ["egg","gluten","dairy"], conditions: ["autism","default"] },
    // ── Hearty breakfasts — bacon, sausage, brisket, bread, corn, tortillas ──
    { name: "Bacon & Egg Breakfast Burrito in a Flour Tortilla", tags: ["pork","meat","egg","gluten"], conditions: ["adhd","depression","default"] },
    { name: "Bacon, Egg & Cheese on Whole Grain Toast", tags: ["pork","meat","egg","gluten","dairy"], conditions: ["adhd","depression","default"] },
    { name: "Scrambled Eggs with Crispy Bacon & Roasted Sweet Potato", tags: ["pork","meat","egg"], conditions: ["adhd","bipolar","default"] },
    { name: "Pork Sausage & Egg Skillet with Sautéed Peppers & Onions", tags: ["pork","meat","egg","onion","nightshade"], conditions: ["adhd","depression","default"] },
    { name: "Brisket Hash with Roasted Potatoes & Fried Egg", tags: ["meat","egg"], conditions: ["adhd","depression","default"] },
    { name: "Bacon & Avocado Breakfast Bowl with Brown Rice", tags: ["pork","meat","rice"], conditions: ["adhd","anxiety","default"] },
    { name: "Cornbread with Scrambled Eggs & Turkey Sausage", tags: ["corn","gluten","egg","meat"], conditions: ["depression","default"] },
    { name: "Corn Tortilla Breakfast Tacos with Eggs, Bacon & Salsa", tags: ["corn","pork","meat","egg"], conditions: ["adhd","depression","default"] },
    { name: "Sourdough Toast with Bacon, Tomato & Avocado", tags: ["gluten","pork","meat"], conditions: ["adhd","depression","default"] },
    { name: "Whole Grain Waffles with Turkey Sausage & Maple Syrup", tags: ["gluten","egg","dairy","meat"], conditions: ["depression","bipolar","default"] },
    { name: "Bagel with Egg, Bacon & Cheddar", tags: ["gluten","pork","meat","egg","dairy"], conditions: ["adhd","depression","default"] },
    { name: "Pulled Brisket & Egg Bowl with Roasted Corn & Avocado", tags: ["meat","egg","corn"], conditions: ["adhd","default"] },
    { name: "Sausage & Sweet Potato Breakfast Skillet", tags: ["pork","meat"], conditions: ["adhd","bipolar","default"] },
    { name: "Bacon & Spinach Omelette with Whole Grain Toast", tags: ["pork","meat","egg","gluten"], conditions: ["adhd","depression","default"] },
    { name: "Flour Tortilla Wrap with Scrambled Eggs, Sausage & Peppers", tags: ["gluten","pork","meat","egg"], conditions: ["adhd","depression","default"] },
    { name: "Cornmeal Porridge with Honey & Sliced Banana", tags: ["corn"], conditions: ["depression","anxiety","default"] },
    { name: "Grilled Sourdough with Almond Butter & Sliced Banana", tags: ["gluten","nuts"], conditions: ["anxiety","depression","default"] },
    { name: "Avocado Toast on Sourdough with Everything Bagel Seasoning", tags: ["gluten"], conditions: ["anxiety","depression","default"] },
    { name: "Whole Grain English Muffin with Peanut Butter & Honey", tags: ["gluten","nuts"], conditions: ["anxiety","ocd","default"] },
    // ── Expanded: Rice, Sweet Potato, Oats, Blueberry, Pomegranate, Salmon ──
    { name: "Brown Rice Porridge with Cinnamon & Sliced Banana", tags: ["rice"], conditions: ["anxiety","autism","did","default"] },
    { name: "Sweet Potato & Oat Breakfast Bowl with Pecans", tags: ["gluten","oats","nuts"], conditions: ["adhd","schizophrenia","ptsd","default"] },
    { name: "Blueberry Oat Muffins (Homemade)", tags: ["gluten","oats","egg"], conditions: ["depression","ptsd","schizophrenia","default"] },
    { name: "Pomegranate & Greek Yogurt Bowl with Granola", tags: ["dairy","gluten"], conditions: ["ptsd","depression","schizophrenia","default"] },
    { name: "Smoked Salmon on Whole Grain Toast with Cream Cheese", tags: ["fish","gluten","dairy"], conditions: ["depression","anxiety","ocd","schizophrenia","npd","neuro_core","ppd","default"] },
    { name: "Salmon & Avocado Rice Bowl", tags: ["fish","rice"], conditions: ["depression","ptsd","bipolar","ocd","npd","hpd","aspd","spd","neuro_core","default"] },
    { name: "Steel-Cut Oats with Blueberries & Walnuts", tags: ["gluten","oats","nuts"], conditions: ["depression","schizophrenia","ocd","neuro_core","bfrb","default"] },
    { name: "Sweet Potato Hash with Scrambled Eggs & Avocado", tags: ["egg"], conditions: ["adhd","ptsd","did","autism","hpd","spd","ppd","default"] },
    { name: "Oatmeal with Pomegranate Seeds & Pistachios", tags: ["gluten","oats","nuts","seed"], conditions: ["ptsd","depression","schizophrenia","default"] },
    { name: "Brown Rice Breakfast Bowl with Egg & Sautéed Greens", tags: ["rice","egg"], conditions: ["anxiety","bipolar","did","default"] },
    { name: "Blueberry Banana Smoothie with Oat Milk", tags: ["gluten","oats"], conditions: ["depression","ptsd","anxiety","default"] },
    { name: "Sweet Potato Pancakes with Maple Syrup", tags: ["egg","gluten"], conditions: ["adhd","schizophrenia","autism","did","default"] },
    { name: "Overnight Oats with Blueberries & Almond Butter", tags: ["gluten","oats","nuts"], conditions: ["depression","ocd","bpd","default"] },
    { name: "Salmon Omelette with Fresh Dill & Whole Grain Toast", tags: ["fish","egg","gluten"], conditions: ["depression","anxiety","schizophrenia","npd","aspd","spd","neuro_core","default"] },
    { name: "Quinoa & Blueberry Breakfast Bowl with Honey", tags: [], conditions: ["bipolar","depression","ptsd","default"] },
    { name: "Baked Oatmeal with Apples & Cinnamon", tags: ["gluten","oats","egg"], conditions: ["ocd","ptsd","did","bpd","default"] },
    { name: "Brown Rice Congee with Soft-Boiled Egg & Ginger", tags: ["rice","egg"], conditions: ["anxiety","autism","did","default"] },
    { name: "Pomegranate & Banana Smoothie Bowl", tags: [], conditions: ["ptsd","depression","schizophrenia","default"] },
    { name: "Sweet Potato & Black Bean Breakfast Burrito", tags: ["gluten","legume"], conditions: ["adhd","depression","bpd","default"] },
    { name: "Oat & Blueberry Pancakes with Honey", tags: ["gluten","oats","egg"], conditions: ["depression","ocd","schizophrenia","default"] },
    { name: "Salmon & Cream Cheese Bagel with Capers", tags: ["fish","gluten","dairy"], conditions: ["depression","anxiety","bipolar","default"] },
    { name: "Warm Millet Porridge with Sliced Banana & Honey", tags: [], conditions: ["anxiety","ocd","autism","did","default"] },
    { name: "Savory Oatmeal with Poached Egg & Avocado", tags: ["gluten","oats","egg"], conditions: ["depression","bipolar","bpd","ocd","default"] },
    // ── Condition-specific: NPD, HPD, ASPD, Eating, Phobia, BFRB, PPD, SPD, Neuro Core ──
    { name: "Egg & Avocado Toast with Smoked Salmon & Microgreens", tags: ["fish","egg","gluten"], conditions: ["neuro_core","npd","default"] },
    { name: "Scrambled Eggs with Broccoli, Garlic & Whole Grain Toast", tags: ["egg","gluten","onion"], conditions: ["bfrb","neuro_core","default"] },
    { name: "Green Tea Smoothie with Banana, Spinach & Almond Butter", tags: ["nuts"], conditions: ["phobia","hpd","neuro_core","default"] },
    { name: "Steak & Egg Scramble with Avocado & Whole Grain Toast", tags: ["meat","egg","gluten"], conditions: ["spd","neuro_core","default"] },
    { name: "Warm Oatmeal with Pumpkin Seeds, Banana & Honey", tags: ["gluten","oats","seed"], conditions: ["ppd","npd","aspd","default"] },
    { name: "Scrambled Eggs with Toast & Fresh Fruit Salad", tags: ["egg","gluten"], conditions: ["eating","did","default"] },
    { name: "Banana & Almond Smoothie with Egg & Honey", tags: ["nuts","egg"], conditions: ["spd","default"] },
    { name: "Turkey & Egg Breakfast Wrap with Spinach", tags: ["meat","egg","gluten"], conditions: ["bfrb","aspd","default"] },
    { name: "Yogurt & Berry Smoothie with Chia Seeds", tags: ["dairy","seed"], conditions: ["phobia","hpd","default"] },
    { name: "Grapefruit & Greek Yogurt Bowl with Walnuts", tags: ["dairy","nuts","citrus"], conditions: ["bfrb","default"] },
    // ── Brain-boosting: Turmeric, Fermented, Lion's Mane, Sardine ──
    { name: "Golden Turmeric Oatmeal with Banana & Walnuts", tags: ["gluten","oats","nuts"], conditions: ["depression","anxiety","ptsd","schizophrenia","ocd","bpd","neuro_core","default"] },
    { name: "Turmeric Scrambled Eggs with Avocado Toast", tags: ["egg","gluten"], conditions: ["depression","anxiety","bipolar","neuro_core","default"] },
    { name: "Kefir Smoothie Bowl with Berries & Granola", tags: ["dairy","gluten"], conditions: ["anxiety","depression","autism","ocd","neuro_core","default"] },
    { name: "Tempeh Scramble with Turmeric, Spinach & Sweet Potato", tags: ["soy"], conditions: ["depression","anxiety","bipolar","neuro_core","vegan","default"] },
    { name: "Sardines on Whole Grain Toast with Avocado & Lemon", tags: ["fish","sardine","gluten","citrus"], conditions: ["depression","anxiety","bipolar","schizophrenia","neuro_core","default"] },
    { name: "Miso & Ginger Breakfast Broth with Soft-Boiled Egg", tags: ["soy","egg"], conditions: ["anxiety","ptsd","autism","did","neuro_core","default"] },
    { name: "Sauerkraut & Egg Toast with Everything Seasoning", tags: ["egg","gluten"], conditions: ["anxiety","depression","ocd","neuro_core","default"] },
    { name: "Lion's Mane Mushroom & Egg Scramble with Herbs", tags: ["egg","mushroom"], conditions: ["neuro_core","depression","anxiety","schizophrenia","default"] },
  ],
  lunch: [
    { name: "Grilled Chicken Breast with Watermelon & Feta Salad", tags: ["dairy","meat"], conditions: ["adhd","default"] },
    { name: "Turkey Lettuce Wraps with Pineapple Salsa", tags: ["meat"], conditions: ["adhd","default"] },
    { name: "Beef & Veggie Stir-Fry with Orange Slices on the Side", tags: ["meat","citrus"], conditions: ["adhd","default"] },
    { name: "Grilled Chicken Salad with Strawberries & Balsamic Vinaigrette", tags: ["meat"], conditions: ["adhd","default"] },
    { name: "Turkey & Avocado Wrap with a Side of Sliced Mango", tags: ["meat","gluten"], conditions: ["adhd","default"] },
    { name: "Ground Beef Taco Bowl with Fresh Pico de Gallo & Mango Salsa", tags: ["meat"], conditions: ["adhd","default"] },
    { name: "Grilled Chicken Caesar Salad with Mandarin Oranges", tags: ["meat","dairy","citrus"], conditions: ["adhd","default"] },
    { name: "Steak & Arugula Salad with Sliced Peaches & Lemon Dressing", tags: ["meat"], conditions: ["adhd","default"] },
    { name: "Chicken & Mango Brown Rice Bowl", tags: ["meat","rice"], conditions: ["adhd","default"] },
    { name: "Turkey & Strawberry Spinach Salad with Balsamic", tags: ["meat"], conditions: ["adhd","default"] },
    { name: "Beef Lettuce Tacos with Pineapple Salsa & Lime", tags: ["meat"], conditions: ["adhd","default"] },
    { name: "Chicken Thigh Bowl with Blueberry & Cucumber Salad", tags: ["meat"], conditions: ["adhd","default"] },
    { name: "Turkey & Avocado Bowl with Sliced Kiwi on the Side", tags: ["meat"], conditions: ["adhd","default"] },
    { name: "Grilled Chicken Sandwich with Sliced Peach & Arugula", tags: ["meat","gluten"], conditions: ["adhd","default"] },
    { name: "Grilled Chicken & Spinach Salad", tags: ["meat"], conditions: ["anxiety","default"] },
    { name: "Turkey & Veggie Soup with Whole Grain Roll", tags: ["meat","gluten"], conditions: ["anxiety","default"] },
    { name: "Grilled Chicken Wrap with Avocado & Lettuce", tags: ["meat","gluten"], conditions: ["anxiety","default"] },
    { name: "Turkey & Avocado Salad with Lemon Dressing", tags: ["meat"], conditions: ["anxiety","default"] },
    { name: "Chicken & Veggie Soup with Crusty Bread", tags: ["meat","gluten"], conditions: ["anxiety","depression","default"] },
    { name: "Lentil & Roasted Veggie Bowl", tags: ["legume"], conditions: ["anxiety","depression","default"] },
    { name: "Chickpea & Spinach Salad with Lemon Tahini", tags: ["legume","citrus","seed"], conditions: ["anxiety","default"] },
    { name: "Veggie & Black Bean Burrito Bowl", tags: ["legume"], conditions: ["anxiety","depression","default"] },
    { name: "Butternut Squash Soup with Crusty Bread", tags: ["gluten"], conditions: ["anxiety","default"] },
    { name: "BLT Wrap with Avocado", tags: ["meat","gluten","dairy"], conditions: ["depression","default"] },
    { name: "Turkey & Avocado Club Sandwich", tags: ["meat","gluten"], conditions: ["depression","ptsd","ocd","default"] },
    { name: "Grilled Chicken Caesar Salad", tags: ["meat","dairy"], conditions: ["depression","ptsd","ocd","default"] },
    { name: "Turkey & Lentil Soup with Whole Grain Roll", tags: ["meat","gluten","legume"], conditions: ["depression","default"] },
    { name: "Roasted Veggie & Quinoa Salad", tags: [], conditions: ["depression","anxiety","default"] },
    { name: "White Bean & Kale Soup", tags: ["legume"], conditions: ["depression","default"] },
    { name: "Grilled Chicken & Brown Rice Bowl", tags: ["meat","rice"], conditions: ["bipolar","default"] },
    { name: "Turkey & Cheese Sandwich on Whole Grain Bread", tags: ["meat","gluten","dairy"], conditions: ["bipolar","default"] },
    { name: "Grilled Chicken Salad with Strawberries & Balsamic", tags: ["meat"], conditions: ["bipolar","default"] },
    { name: "Turkey & Veggie Wrap with Side Fruit", tags: ["meat","gluten"], conditions: ["bipolar","default"] },
    { name: "Chicken & Lentil Soup with Crusty Bread", tags: ["meat","gluten","legume"], conditions: ["bipolar","default"] },
    { name: "Grilled Chicken Sandwich with Side Salad", tags: ["meat","gluten"], conditions: ["schizophrenia","default"] },
    { name: "Tomato Soup with Grilled Cheese on Whole Grain", tags: ["gluten","dairy"], conditions: ["schizophrenia","did","default"] },
    { name: "Turkey Wrap with Spinach & Avocado", tags: ["meat","gluten"], conditions: ["schizophrenia","default"] },
    { name: "Chicken & Veggie Soup with Whole Grain Roll", tags: ["meat","gluten"], conditions: ["schizophrenia","ptsd","default"] },
    { name: "Grilled Chicken & Avocado Salad", tags: ["meat"], conditions: ["ptsd","default"] },
    { name: "Turkey & Veggie Wrap with Greek Yogurt Dip", tags: ["meat","gluten","dairy"], conditions: ["ptsd","default"] },
    { name: "Classic Grilled Chicken Sandwich with Sweet Potato Fries", tags: ["meat","gluten"], conditions: ["did","default"] },
    { name: "Turkey & Cheese Wrap with Apple", tags: ["meat","gluten","dairy"], conditions: ["did","default"] },
    { name: "Grilled Chicken BLT Sandwich", tags: ["meat","gluten","dairy"], conditions: ["did","default"] },
    { name: "Turkey & Avocado Wrap with Side Fruit", tags: ["meat","gluten"], conditions: ["did","default"] },
    { name: "Chicken Noodle Soup with Whole Grain Roll", tags: ["meat","gluten"], conditions: ["did","default"] },
    { name: "Grilled Chicken Salad with Lemon Vinaigrette", tags: ["meat"], conditions: ["bpd","default"] },
    { name: "Turkey Club Sandwich with Side Salad", tags: ["meat","gluten","dairy"], conditions: ["bpd","default"] },
    { name: "Grilled Chicken & Avocado Wrap", tags: ["meat","gluten"], conditions: ["bpd","default"] },
    { name: "Turkey & Spinach Salad with Balsamic Dressing", tags: ["meat"], conditions: ["bpd","default"] },
    { name: "Grilled Chicken Caesar Wrap", tags: ["meat","gluten","dairy"], conditions: ["bpd","ocd","default"] },
    { name: "Grilled Chicken & Veggie Wrap", tags: ["meat","gluten"], conditions: ["ocd","default"] },
    { name: "Turkey Soup with Whole Grain Roll", tags: ["meat","gluten"], conditions: ["ocd","default"] },
    { name: "Turkey & Avocado Wrap with Side Salad", tags: ["meat","gluten"], conditions: ["ocd","default"] },
    { name: "Grilled Chicken Strips with Mac & Cheese", tags: ["meat","gluten","dairy"], conditions: ["autism","default"] },
    { name: "Plain Turkey Sandwich on Whole Grain Bread", tags: ["meat","gluten"], conditions: ["autism","eating","default"] },
    { name: "Buttered Pasta with Mild Chicken", tags: ["meat","gluten","dairy"], conditions: ["autism","default"] },
    { name: "Chicken Nuggets with Plain Rice & Corn", tags: ["meat","corn","gluten"], conditions: ["autism","default"] },
    { name: "Grilled Cheese Sandwich with Plain Chicken Soup", tags: ["meat","gluten","dairy"], conditions: ["autism","default"] },
    { name: "Turkey & Cheese Roll-Up with Apple Slices", tags: ["meat","dairy"], conditions: ["autism","default"] },
    { name: "Plain Pasta with Mild Tomato Sauce & Chicken", tags: ["meat","gluten"], conditions: ["autism","default"] },
    // ── Hearty lunches — sandwiches, wraps, tortillas, brisket, bacon, corn ──
    { name: "Smoked Brisket Sandwich on Whole Grain Bread with Coleslaw", tags: ["meat","gluten"], conditions: ["adhd","depression","default"] },
    { name: "Brisket Tacos on Corn Tortillas with Pickled Onion & Cilantro", tags: ["meat","corn","onion"], conditions: ["adhd","depression","default"] },
    { name: "Brisket & Roasted Corn Bowl with Avocado & Brown Rice", tags: ["meat","corn","rice"], conditions: ["adhd","bipolar","default"] },
    { name: "BLT on Sourdough with Avocado & Tomato", tags: ["pork","meat","gluten"], conditions: ["adhd","depression","default"] },
    { name: "Bacon & Egg Salad Sandwich on Whole Grain Bread", tags: ["pork","meat","egg","gluten"], conditions: ["adhd","depression","default"] },
    { name: "Bacon Cheeseburger on Whole Grain Bun with Side Salad", tags: ["pork","meat","gluten","dairy"], conditions: ["adhd","depression","default"] },
    { name: "Sausage & Pepper Hoagie on Whole Grain Roll", tags: ["pork","meat","gluten"], conditions: ["adhd","depression","default"] },
    { name: "Beef & Corn Tortilla Tacos with Guacamole & Salsa", tags: ["meat","corn"], conditions: ["adhd","anxiety","default"] },
    { name: "Chicken & Black Bean Corn Tortilla Tacos", tags: ["meat","corn","legume"], conditions: ["anxiety","depression","default"] },
    { name: "Steak & Cheese Sub on Whole Grain Hoagie Roll", tags: ["meat","gluten","dairy"], conditions: ["adhd","depression","default"] },
    { name: "Turkey, Bacon & Avocado Club on Sourdough", tags: ["meat","pork","gluten"], conditions: ["adhd","depression","default"] },
    { name: "Grilled Chicken Corn Tortilla Tacos with Mango Salsa", tags: ["meat","corn"], conditions: ["adhd","anxiety","default"] },
    { name: "Pulled Brisket & Sweet Potato Bowl", tags: ["meat"], conditions: ["adhd","depression","bipolar","default"] },
    { name: "Roast Beef Sandwich on Whole Grain Bread with Horseradish", tags: ["meat","gluten"], conditions: ["adhd","depression","default"] },
    { name: "Chicken Burrito on a Flour Tortilla with Brown Rice & Black Beans", tags: ["meat","gluten","legume","rice"], conditions: ["adhd","anxiety","default"] },
    { name: "Beef Quesadilla on Flour Tortilla with Guacamole", tags: ["meat","gluten","dairy"], conditions: ["adhd","depression","default"] },
    { name: "Corn Chowder with Whole Grain Bread Roll", tags: ["corn","gluten","dairy"], conditions: ["anxiety","depression","default"] },
    // ── Expanded: Rice, Sweet Potato, Salmon, Lentil, Blueberry, Pomegranate ──
    { name: "Salmon & Brown Rice Bowl with Avocado & Cucumber", tags: ["fish","rice"], conditions: ["depression","anxiety","ptsd","ocd","bipolar","npd","hpd","aspd","phobia","bfrb","ppd","spd","neuro_core","default"] },
    { name: "Sweet Potato & Black Bean Burrito Bowl", tags: ["legume"], conditions: ["anxiety","depression","adhd","bpd","hpd","ppd","default"] },
    { name: "Lentil & Sweet Potato Soup with Whole Grain Bread", tags: ["legume","gluten"], conditions: ["depression","anxiety","ptsd","ocd","default"] },
    { name: "Brown Rice & Grilled Chicken Bowl with Steamed Broccoli", tags: ["meat","rice"], conditions: ["schizophrenia","bipolar","ocd","ptsd","hpd","bfrb","phobia","default"] },
    { name: "Salmon Salad with Blueberries, Walnuts & Spinach", tags: ["fish","nuts"], conditions: ["depression","ptsd","schizophrenia","neuro_core","npd","ppd","bfrb","default"] },
    { name: "Quinoa & Roasted Sweet Potato Salad with Cranberries", tags: [], conditions: ["depression","anxiety","bipolar","default"] },
    { name: "Turkey & Brown Rice Stuffed Peppers", tags: ["meat","rice","nightshade"], conditions: ["adhd","bipolar","schizophrenia","default"] },
    { name: "Lentil & Brown Rice Bowl with Roasted Vegetables", tags: ["legume","rice"], conditions: ["depression","anxiety","ocd","aspd","bfrb","spd","default"] },
    { name: "Salmon Wrap with Avocado & Mixed Greens", tags: ["fish","gluten"], conditions: ["depression","anxiety","bpd","npd","phobia","ppd","spd","default"] },
    { name: "Sweet Potato & Chickpea Curry Bowl", tags: ["legume"], conditions: ["anxiety","depression","ptsd","hpd","phobia","ppd","spd","default"] },
    { name: "Pomegranate & Chicken Grain Bowl with Quinoa", tags: ["meat"], conditions: ["ptsd","depression","schizophrenia","default"] },
    { name: "Brown Rice Sushi Bowl with Salmon & Edamame", tags: ["fish","rice","soy","legume"], conditions: ["depression","anxiety","bipolar","neuro_core","hpd","default"] },
    { name: "Chicken & Sweet Potato Bowl with Brown Rice", tags: ["meat","rice"], conditions: ["adhd","schizophrenia","did","default"] },
    { name: "Mediterranean Lentil Salad with Feta & Lemon", tags: ["legume","dairy","citrus"], conditions: ["anxiety","depression","bipolar","default"] },
    { name: "Grilled Salmon Sandwich on Whole Grain Bread", tags: ["fish","gluten"], conditions: ["depression","ocd","ptsd","default"] },
    { name: "Sweet Potato & Turkey Chili", tags: ["meat"], conditions: ["adhd","depression","bipolar","ptsd","default"] },
    { name: "Brown Rice Bowl with Roasted Veggies & Tahini Drizzle", tags: ["rice","seed"], conditions: ["anxiety","ocd","bpd","default"] },
    { name: "Salmon & Quinoa Power Bowl with Pomegranate", tags: ["fish"], conditions: ["depression","ptsd","schizophrenia","neuro_core","npd","aspd","default"] },
    { name: "Lentil Soup with Spinach & Brown Rice", tags: ["legume","rice"], conditions: ["depression","anxiety","ocd","ptsd","aspd","spd","bfrb","default"] },
    { name: "Chicken & Lentil Brown Rice Bowl", tags: ["meat","legume","rice"], conditions: ["bipolar","schizophrenia","ocd","default"] },
    { name: "Roasted Sweet Potato & Kale Salad with Pomegranate Seeds", tags: ["seed"], conditions: ["ptsd","depression","schizophrenia","ppd","spd","bfrb","default"] },
    { name: "Tuna & Brown Rice Bowl with Avocado", tags: ["fish","rice"], conditions: ["depression","anxiety","ocd","default"] },
    // ── Condition-specific: NPD, HPD, ASPD, Eating, Phobia, BFRB, PPD, SPD, Neuro Core ──
    { name: "Grilled Chicken & Chickpea Bowl with Tahini Dressing", tags: ["meat","legume","seed"], conditions: ["npd","aspd","default"] },
    { name: "Sardine & Avocado Toast with Mixed Greens Salad", tags: ["fish","gluten"], conditions: ["aspd","neuro_core","default"] },
    { name: "Chicken & Rice Soup with Crusty Bread", tags: ["meat","gluten","rice"], conditions: ["eating","did","ppd","default"] },
    { name: "Turkey & Black Bean Bowl with Sweet Potato & Yogurt", tags: ["meat","legume","dairy"], conditions: ["ppd","hpd","default"] },
    { name: "Grilled Chicken & Brussels Sprout Bowl with Brown Rice", tags: ["meat","rice"], conditions: ["bfrb","default"] },
    { name: "Grilled Chicken & Lentil Bowl with Spinach & Tahini", tags: ["meat","legume","seed"], conditions: ["spd","neuro_core","default"] },
    { name: "Turkey Burger with Sweet Potato Fries & Side Salad", tags: ["meat","gluten"], conditions: ["spd","eating","default"] },
    { name: "Chicken & Spinach Stir-Fry with Quinoa", tags: ["meat"], conditions: ["phobia","npd","default"] },
    { name: "Grilled Salmon Salad with Avocado, Spinach & Pumpkin Seeds", tags: ["fish","seed"], conditions: ["phobia","ppd","neuro_core","default"] },
    { name: "Kimchi Rice Bowl with Grilled Chicken & Steamed Veggies", tags: ["meat","rice"], conditions: ["hpd","neuro_core","ppd","default"] },
    { name: "Mac & Cheese with Steamed Broccoli & Grilled Chicken", tags: ["meat","gluten","dairy"], conditions: ["eating","autism","default"] },
    { name: "Turkey & Cheese Wrap with Fruit Cup", tags: ["meat","gluten","dairy"], conditions: ["eating","did","default"] },
    // ── Brain-boosting: Turmeric, Fermented, Lion's Mane, Sardine ──
    { name: "Turmeric Chicken & Brown Rice Bowl with Roasted Veggies", tags: ["meat","rice"], conditions: ["depression","anxiety","ptsd","bipolar","ocd","neuro_core","default"] },
    { name: "Sardine & Avocado Salad with Lemon & Olive Oil", tags: ["fish","sardine","citrus"], conditions: ["depression","anxiety","bipolar","schizophrenia","neuro_core","default"] },
    { name: "Sardine Toast with Tomato, Red Onion & Capers", tags: ["fish","sardine","gluten","onion"], conditions: ["depression","neuro_core","default"] },
    { name: "Lion's Mane Mushroom Stir-Fry with Chicken & Brown Rice", tags: ["meat","mushroom","rice"], conditions: ["neuro_core","depression","schizophrenia","default"] },
    { name: "Kimchi & Chicken Grain Bowl with Pickled Vegetables", tags: ["meat","rice"], conditions: ["anxiety","depression","ocd","neuro_core","default"] },
    { name: "Miso Glazed Salmon with Steamed Rice & Bok Choy", tags: ["fish","soy","rice"], conditions: ["depression","anxiety","bipolar","neuro_core","default"] },
    { name: "Tempeh Buddha Bowl with Turmeric Tahini Dressing", tags: ["soy","seed"], conditions: ["depression","anxiety","neuro_core","default"] },
    { name: "Anti-Inflammatory Turmeric & Lentil Soup", tags: ["legume"], conditions: ["depression","anxiety","ptsd","ocd","bpd","neuro_core","default"] },
  ],
  dinner: [
    { name: "Pan-Seared Steak with Roasted Sweet Potato & Fresh Blueberry Side", tags: ["meat"], conditions: ["adhd","default"] },
    { name: "Baked Chicken Thighs with Roasted Pineapple & Quinoa", tags: ["meat"], conditions: ["adhd","default"] },
    { name: "Sirloin Steak with Grilled Peaches & Asparagus", tags: ["meat"], conditions: ["adhd","default"] },
    { name: "Grilled Chicken Thighs with Blueberry Balsamic Glaze & Roasted Veggies", tags: ["meat"], conditions: ["adhd","default"] },
    { name: "Ribeye Steak with Roasted Broccoli & Mango Salsa", tags: ["meat"], conditions: ["adhd","default"] },
    { name: "Chicken Thighs with Cherry Tomato Sauce & Quinoa", tags: ["meat"], conditions: ["adhd","default"] },
    { name: "Beef & Mango Stir-Fry with Brown Rice", tags: ["meat","rice"], conditions: ["adhd","default"] },
    { name: "Grilled Chicken with Peach & Arugula Salad", tags: ["meat"], conditions: ["adhd","default"] },
    { name: "Turkey Meatballs with Zucchini Noodles & Strawberry Caprese Side", tags: ["meat","dairy"], conditions: ["adhd","default"] },
    { name: "Steak Tacos with Pineapple Salsa & Avocado", tags: ["meat"], conditions: ["adhd","default"] },
    { name: "Baked Chicken Breast with Watermelon & Cucumber Side Salad", tags: ["meat"], conditions: ["adhd","default"] },
    { name: "Ground Beef Bowl with Roasted Sweet Potato & Sliced Kiwi Side", tags: ["meat"], conditions: ["adhd","default"] },
    { name: "Grilled Turkey Patties with Grilled Peach & Spinach Salad", tags: ["meat"], conditions: ["adhd","default"] },
    { name: "Chicken Thigh with Roasted Pineapple, Peppers & Brown Rice", tags: ["meat","rice","nightshade"], conditions: ["adhd","default"] },
    { name: "Sirloin with Blueberry Reduction Sauce & Roasted Asparagus", tags: ["meat"], conditions: ["adhd","default"] },
    { name: "Baked Chicken Breast with Roasted Veggies", tags: ["meat"], conditions: ["anxiety","default"] },
    { name: "Lean Ground Turkey Taco Bowls", tags: ["meat"], conditions: ["anxiety","default"] },
    { name: "Grilled Chicken Thighs with Roasted Zucchini & Rice", tags: ["meat"], conditions: ["anxiety","default"] },
    { name: "Lean Ground Beef Stir-Fry with Mixed Veggies & Brown Rice", tags: ["meat","rice"], conditions: ["anxiety","default"] },
    { name: "Oven-Roasted Chicken Breast with Cauliflower Mash", tags: ["meat"], conditions: ["anxiety","default"] },
    { name: "Roasted Veggie & Chickpea Curry with Brown Rice", tags: ["legume","rice"], conditions: ["anxiety","depression","default"] },
    { name: "Black Bean & Sweet Potato Tacos", tags: ["legume"], conditions: ["anxiety","depression","default"] },
    { name: "Grilled Steak with Roasted Potatoes & Broccoli", tags: ["meat"], conditions: ["depression","bipolar","default"] },
    { name: "Lemon Herb Chicken with Rice Pilaf", tags: ["meat","rice","citrus"], conditions: ["depression","default"] },
    { name: "Ground Beef & Vegetable Stew with Crusty Bread", tags: ["meat","gluten"], conditions: ["depression","default"] },
    { name: "Baked Chicken Thighs with Roasted Root Vegetables", tags: ["meat"], conditions: ["depression","schizophrenia","default"] },
    { name: "Lentil Soup with Whole Grain Bread", tags: ["gluten"], conditions: ["depression","anxiety","default"] },
    { name: "Oven-Baked Chicken Thighs with Roasted Root Vegetables", tags: ["meat"], conditions: ["bipolar","default"] },
    { name: "Lean Ground Beef Tacos with Black Beans", tags: ["meat","legume"], conditions: ["bipolar","default"] },
    { name: "Sirloin Steak with Roasted Potatoes & Green Beans", tags: ["meat"], conditions: ["bipolar","bpd","default"] },
    { name: "Baked Chicken Breast with Quinoa & Roasted Zucchini", tags: ["meat"], conditions: ["bipolar","default"] },
    { name: "Ground Turkey Stuffed Bell Peppers with Brown Rice", tags: ["meat","rice","nightshade"], conditions: ["bipolar","default"] },
    { name: "Chicken & White Bean Stew", tags: ["meat","legume"], conditions: ["bipolar","default"] },
    { name: "Baked Chicken Breast with Roasted Veggies & Brown Rice", tags: ["meat","rice"], conditions: ["schizophrenia","default"] },
    { name: "Lean Beef Stir-Fry with Mixed Veggies & Noodles", tags: ["meat","gluten"], conditions: ["schizophrenia","default"] },
    { name: "Grilled Chicken Thighs with Roasted Sweet Potato", tags: ["meat"], conditions: ["schizophrenia","default"] },
    { name: "Ground Beef Pasta with Marinara & Side Salad", tags: ["meat","gluten"], conditions: ["schizophrenia","default"] },
    { name: "Baked Lemon Herb Chicken with Roasted Potatoes", tags: ["meat"], conditions: ["ptsd","default"] },
    { name: "Grilled Steak & Veggie Skewers with Rice", tags: ["meat"], conditions: ["ptsd","default"] },
    { name: "Baked Chicken Thighs with Roasted Sweet Potato & Broccoli", tags: ["meat"], conditions: ["ptsd","default"] },
    { name: "Lean Beef Tacos with Avocado & Pico de Gallo", tags: ["meat"], conditions: ["ptsd","default"] },
    { name: "Oven-Roasted Chicken with Root Vegetables & Quinoa", tags: ["meat"], conditions: ["ptsd","default"] },
    { name: "Baked Chicken with Mashed Potatoes & Green Beans", tags: ["meat"], conditions: ["did","eating","default"] },
    { name: "Ground Beef Pasta with Marinara Sauce", tags: ["meat","gluten"], conditions: ["did","default"] },
    { name: "Grilled Steak with Mashed Potatoes & Green Beans", tags: ["meat"], conditions: ["did","default"] },
    { name: "Ground Turkey Taco Bowl with Brown Rice & Beans", tags: ["meat","rice","legume"], conditions: ["did","default"] },
    { name: "Baked Chicken Breast with Sweet Potato & Corn", tags: ["meat","corn"], conditions: ["did","default"] },
    { name: "Grilled Steak with Roasted Sweet Potato & Broccoli", tags: ["meat"], conditions: ["bpd","default"] },
    { name: "Baked Chicken Thighs with Garlic Mashed Potatoes", tags: ["meat","dairy"], conditions: ["bpd","default"] },
    { name: "Ground Beef Burrito Bowl with Brown Rice & Avocado", tags: ["meat","rice"], conditions: ["bpd","default"] },
    { name: "Baked Chicken Thighs with Roasted Cauliflower & Wild Rice", tags: ["meat"], conditions: ["bpd","default"] },
    { name: "Oven-Roasted Chicken with Vegetables & Quinoa", tags: ["meat"], conditions: ["ocd","default"] },
    { name: "Lean Beef Stir-Fry with Noodles & Mixed Veggies", tags: ["meat","gluten"], conditions: ["ocd","default"] },
    { name: "Chicken & Veggie Stir-Fry with Brown Rice", tags: ["meat","rice"], conditions: ["ocd","default"] },
    { name: "Grilled Steak with Roasted Potatoes & Asparagus", tags: ["meat"], conditions: ["ocd","default"] },
    { name: "Baked Chicken Thighs with Wild Rice & Broccoli", tags: ["meat"], conditions: ["ocd","default"] },
    { name: "Baked Chicken Tenders with Rice & Corn", tags: ["meat","corn"], conditions: ["autism","default"] },
    { name: "Mild Beef Meatballs with Pasta & Butter", tags: ["meat","gluten","dairy"], conditions: ["autism","default"] },
    { name: "Ground Beef & Noodle Casserole", tags: ["meat","gluten"], conditions: ["autism","default"] },
    { name: "Mild Chicken Stir-Fry with Plain Noodles", tags: ["meat","gluten"], conditions: ["autism","default"] },
    { name: "Baked Chicken Breast with Corn & Mashed Potatoes", tags: ["meat","corn","dairy"], conditions: ["autism","default"] },
    { name: "Grilled Salmon with Asparagus & Quinoa", tags: ["fish"], conditions: ["anxiety","neuro_core","npd","phobia","ppd","spd","default"] },
    { name: "Baked Salmon with Mashed Sweet Potato & Green Beans", tags: ["fish"], conditions: ["depression","ppd","hpd","phobia","npd","spd","default"] },
    { name: "Pan-Seared Salmon with Quinoa & Roasted Asparagus", tags: ["fish"], conditions: ["depression","ptsd","ocd","neuro_core","npd","hpd","aspd","phobia","bfrb","ppd","spd","default"] },
    { name: "Baked Salmon with Sweet Potato & Green Beans", tags: ["fish"], conditions: ["anxiety","phobia","hpd","ppd","spd","default"] },
    { name: "Grilled Salmon with Brown Rice & Steamed Broccoli", tags: ["fish","rice"], conditions: ["ocd","bipolar","neuro_core","hpd","bfrb","aspd","default"] },
    { name: "Lemon Butter Salmon with Rice & Snap Peas", tags: ["fish","dairy"], conditions: ["bpd","default"] },
    // ── Hearty dinners — brisket, bacon, sausage, corn, tortillas, bread ──
    { name: "Slow-Smoked Beef Brisket with Roasted Sweet Potato & Broccoli", tags: ["meat"], conditions: ["adhd","depression","bipolar","default"] },
    { name: "Brisket & Black Bean Bowl with Brown Rice & Roasted Corn", tags: ["meat","corn","rice","legume"], conditions: ["adhd","depression","default"] },
    { name: "Brisket Tacos on Corn Tortillas with Avocado & Pickled Red Onion", tags: ["meat","corn","onion"], conditions: ["adhd","depression","default"] },
    { name: "Beef Brisket Chili with Cornbread", tags: ["meat","corn","gluten"], conditions: ["adhd","depression","bipolar","default"] },
    { name: "Bacon-Wrapped Chicken Thighs with Roasted Asparagus & Sweet Potato", tags: ["pork","meat"], conditions: ["adhd","depression","default"] },
    { name: "Bacon & Beef Burger on Whole Grain Bun with Sweet Potato Fries", tags: ["pork","meat","gluten"], conditions: ["adhd","depression","default"] },
    { name: "Pork Sausage & White Bean Stew with Crusty Bread", tags: ["pork","meat","gluten"], conditions: ["depression","bipolar","default"] },
    { name: "Sausage, Pepper & Onion Sheet Pan Dinner with Brown Rice", tags: ["pork","meat","onion","nightshade","rice"], conditions: ["adhd","depression","default"] },
    { name: "Hearty Beef Stew with Whole Grain Bread & Root Vegetables", tags: ["meat","gluten"], conditions: ["depression","bipolar","ptsd","default"] },
    { name: "BBQ Chicken on Corn Tortillas with Coleslaw & Corn", tags: ["meat","corn"], conditions: ["adhd","depression","default"] },
    { name: "Chicken Fajita Bowl with Corn Tortillas, Peppers & Guacamole", tags: ["meat","corn"], conditions: ["adhd","anxiety","default"] },
    { name: "Steak Fajitas on Flour Tortillas with Peppers & Onions", tags: ["meat","gluten","onion","nightshade"], conditions: ["adhd","depression","default"] },
    { name: "Grilled Chicken & Corn Street Tacos on Corn Tortillas", tags: ["meat","corn"], conditions: ["adhd","anxiety","default"] },
    { name: "Baked Pork Tenderloin with Roasted Sweet Potato & Green Beans", tags: ["pork","meat"], conditions: ["adhd","depression","bipolar","default"] },
    { name: "Smoked Sausage & Lentil Soup with Whole Grain Roll", tags: ["pork","meat","gluten"], conditions: ["depression","bipolar","default"] },
    { name: "Ground Beef Enchiladas on Corn Tortillas with Black Beans", tags: ["meat","corn","dairy","legume"], conditions: ["adhd","depression","default"] },
    { name: "Roast Chicken with Cornbread Stuffing & Roasted Veggies", tags: ["meat","corn","gluten","egg","dairy"], conditions: ["depression","bipolar","default"] },
    { name: "Beef Meatloaf with Mashed Potatoes & Steamed Broccoli", tags: ["meat","egg","gluten"], conditions: ["depression","bipolar","ptsd","default"] },
    { name: "Bacon, Potato & Broccoli Casserole", tags: ["pork","meat","dairy"], conditions: ["adhd","depression","default"] },
    { name: "Pork Chops with Roasted Apples, Sweet Potato & Rosemary", tags: ["pork","meat"], conditions: ["adhd","depression","bipolar","default"] },
    // ── Expanded: Rice, Sweet Potato, Salmon, Lentil, Blueberry, Pomegranate ──
    { name: "Baked Salmon with Brown Rice & Roasted Asparagus", tags: ["fish","rice"], conditions: ["depression","anxiety","ptsd","ocd","bipolar","schizophrenia","neuro_core","npd","hpd","aspd","phobia","bfrb","ppd","spd","default"] },
    { name: "Sweet Potato & Lentil Curry with Brown Rice", tags: ["legume","rice"], conditions: ["anxiety","depression","ptsd","ocd","aspd","bfrb","spd","hpd","default"] },
    { name: "Grilled Salmon with Pomegranate Glaze & Quinoa", tags: ["fish"], conditions: ["ptsd","depression","schizophrenia","neuro_core","ppd","npd","default"] },
    { name: "Chicken & Brown Rice Stir-Fry with Mixed Veggies", tags: ["meat","rice"], conditions: ["adhd","bipolar","schizophrenia","ocd","default"] },
    { name: "Baked Sweet Potato Stuffed with Black Beans & Avocado", tags: ["legume"], conditions: ["anxiety","depression","bpd","ptsd","default"] },
    { name: "Salmon & Sweet Potato Sheet Pan Dinner", tags: ["fish"], conditions: ["depression","ptsd","adhd","schizophrenia","neuro_core","npd","hpd","ppd","default"] },
    { name: "Lentil Bolognese over Brown Rice Pasta", tags: ["legume","gluten"], conditions: ["depression","anxiety","ocd","bipolar","default"] },
    { name: "Turkey Meatballs with Brown Rice & Steamed Broccoli", tags: ["meat","rice"], conditions: ["adhd","bipolar","schizophrenia","did","default"] },
    { name: "Baked Salmon with Blueberry Salsa & Wild Rice", tags: ["fish"], conditions: ["depression","ptsd","schizophrenia","neuro_core","bfrb","default"] },
    { name: "Roasted Chicken Thighs with Sweet Potato Mash & Kale", tags: ["meat"], conditions: ["adhd","depression","schizophrenia","ptsd","npd","aspd","spd","ppd","default"] },
    { name: "Brown Rice & Veggie Bowl with Grilled Tofu", tags: ["rice","soy"], conditions: ["anxiety","depression","ocd","default"] },
    { name: "Pomegranate-Glazed Chicken with Roasted Sweet Potato", tags: ["meat"], conditions: ["ptsd","depression","schizophrenia","adhd","default"] },
    { name: "Lentil & Vegetable Stew with Crusty Bread", tags: ["legume","gluten"], conditions: ["depression","anxiety","ptsd","ocd","bipolar","aspd","bfrb","spd","default"] },
    { name: "Baked Salmon with Garlic Mashed Sweet Potato", tags: ["fish"], conditions: ["depression","anxiety","ptsd","bpd","neuro_core","ppd","phobia","default"] },
    { name: "Ground Turkey & Sweet Potato Skillet with Brown Rice", tags: ["meat","rice"], conditions: ["adhd","bipolar","schizophrenia","default"] },
    { name: "Chicken & Quinoa Bowl with Pomegranate & Spinach", tags: ["meat"], conditions: ["ptsd","depression","schizophrenia","default"] },
    { name: "Brown Rice Bowl with Grilled Chicken & Roasted Veggies", tags: ["meat","rice"], conditions: ["bipolar","ocd","did","bpd","default"] },
    { name: "Salmon Teriyaki with Brown Rice & Steamed Edamame", tags: ["fish","rice","soy","legume"], conditions: ["depression","anxiety","bipolar","neuro_core","npd","spd","default"] },
    { name: "Stuffed Sweet Potatoes with Ground Turkey & Cheese", tags: ["meat","dairy"], conditions: ["adhd","depression","did","default"] },
    { name: "Lentil & Brown Rice Stuffed Bell Peppers", tags: ["legume","rice","nightshade"], conditions: ["depression","anxiety","ocd","bipolar","default"] },
    { name: "Pan-Seared Salmon with Quinoa & Roasted Broccoli", tags: ["fish"], conditions: ["depression","ptsd","ocd","schizophrenia","bpd","neuro_core","aspd","npd","default"] },
    { name: "Chicken & Sweet Potato Coconut Curry", tags: ["meat","coconut"], conditions: ["adhd","depression","ptsd","default"] },
    { name: "Brown Rice Fried Rice with Scrambled Egg & Veggies", tags: ["rice","egg"], conditions: ["bipolar","did","autism","ocd","default"] },
    { name: "Baked Chicken Breast with Sweet Potato Wedges & Spinach", tags: ["meat"], conditions: ["schizophrenia","ptsd","ocd","bpd","default"] },
    // ── Condition-specific: NPD, HPD, ASPD, Eating, Phobia, BFRB, PPD, SPD, Neuro Core ──
    { name: "Baked Mackerel with Quinoa & Roasted Brussels Sprouts", tags: ["fish"], conditions: ["aspd","neuro_core","default"] },
    { name: "Chicken & Vegetable Bone Broth Soup with Brown Rice", tags: ["meat","rice"], conditions: ["ppd","eating","default"] },
    { name: "Garlic Chicken Stir-Fry with Broccoli & Brown Rice", tags: ["meat","rice","onion"], conditions: ["bfrb","default"] },
    { name: "Baked Chicken Thighs with Roasted Brussels Sprouts & Sweet Potato", tags: ["meat"], conditions: ["bfrb","hpd","default"] },
    { name: "Miso Soup with Tofu, Seaweed & Steamed Rice", tags: ["soy","rice"], conditions: ["ppd","neuro_core","default"] },
    { name: "Pasta with Marinara Sauce, Grilled Chicken & Garlic Bread", tags: ["meat","gluten","onion"], conditions: ["eating","did","default"] },
    { name: "Baked Chicken with Mashed Potatoes & Buttered Green Beans", tags: ["meat","dairy"], conditions: ["eating","did","ppd","default"] },
    { name: "Beef Stir-Fry with Broccoli, Bell Pepper & Quinoa", tags: ["meat","nightshade"], conditions: ["spd","neuro_core","default"] },
    { name: "Chicken & Chickpea Curry with Turmeric Rice & Spinach", tags: ["meat","legume","rice"], conditions: ["neuro_core","spd","default"] },
    { name: "Grilled Salmon with Turmeric Quinoa & Sautéed Kale", tags: ["fish"], conditions: ["neuro_core","default"] },
    { name: "Turkey Meatballs with Zucchini Noodles & Spinach", tags: ["meat"], conditions: ["npd","hpd","aspd","default"] },
    { name: "Walnut-Crusted Salmon with Roasted Asparagus", tags: ["fish","nuts"], conditions: ["neuro_core","npd","default"] },
    // ── Brain-boosting: Turmeric, Fermented, Lion's Mane, Sardine ──
    { name: "Turmeric & Ginger Baked Salmon with Sweet Potato & Kale", tags: ["fish"], conditions: ["depression","anxiety","bipolar","ptsd","neuro_core","default"] },
    { name: "Lion's Mane Mushroom Risotto with Parmesan & Thyme", tags: ["mushroom","dairy","rice"], conditions: ["neuro_core","depression","schizophrenia","default"] },
    { name: "Sardine Pasta with Cherry Tomatoes, Capers & Lemon", tags: ["fish","sardine","gluten","nightshade","citrus"], conditions: ["depression","anxiety","neuro_core","default"] },
    { name: "Turmeric Coconut Curry with Chicken & Brown Rice", tags: ["meat","coconut","rice"], conditions: ["depression","anxiety","ptsd","ocd","neuro_core","default"] },
    { name: "Miso-Glazed Cod with Sautéed Bok Choy & Steamed Rice", tags: ["fish","soy","rice"], conditions: ["anxiety","depression","neuro_core","default"] },
    { name: "Fermented Kimchi Stew with Tofu & Steamed Rice", tags: ["soy","rice"], conditions: ["anxiety","depression","ocd","neuro_core","default"] },
    { name: "Pan-Seared Sardines with Roasted Vegetables & Quinoa", tags: ["fish","sardine"], conditions: ["depression","bipolar","schizophrenia","neuro_core","default"] },
    { name: "Golden Turmeric Chicken Soup with Vegetables & Brown Rice", tags: ["meat","rice"], conditions: ["depression","anxiety","ptsd","did","ppd","neuro_core","default"] },
    { name: "Tempeh & Vegetable Stir-Fry with Ginger-Turmeric Sauce", tags: ["soy"], conditions: ["depression","anxiety","neuro_core","default"] },
    { name: "Lion's Mane & Chicken Sheet Pan with Roasted Sweet Potato", tags: ["meat","mushroom"], conditions: ["neuro_core","depression","anxiety","schizophrenia","default"] },
  ],
  snacks: [
    { name: "Apple Slices + Sliced Deli Turkey Roll-Ups", tags: ["meat"], conditions: ["adhd","default"] },
    { name: "Banana + Chicken Jerky", tags: ["meat"], conditions: ["adhd","default"] },
    { name: "Watermelon Chunks + Sunflower Seeds", tags: ["seed"], conditions: ["adhd","default"] },
    { name: "Orange Slices + Hard-Boiled Egg", tags: ["egg","citrus"], conditions: ["adhd","default"] },
    { name: "Cherries + Beef Jerky", tags: ["meat"], conditions: ["adhd","default"] },
    { name: "Mango Slices + Sliced Deli Turkey", tags: ["meat"], conditions: ["adhd","default"] },
    { name: "Mixed Berry Bowl + a Small Handful of Walnuts", tags: ["nuts"], conditions: ["adhd","default"] },
    { name: "Pineapple Chunks + Turkey Strips", tags: ["meat"], conditions: ["adhd","default"] },
    { name: "Peach Slices + Beef Jerky", tags: ["meat"], conditions: ["adhd","default"] },
    { name: "Grapes + Deli Turkey Slices", tags: ["meat"], conditions: ["adhd","default"] },
    { name: "Kiwi + Hard-Boiled Egg", tags: ["egg"], conditions: ["adhd","default"] },
    { name: "Strawberries + Sliced Chicken Strips", tags: ["meat"], conditions: ["adhd","default"] },
    { name: "Frozen Berries (thawed) + Sunflower Seeds", tags: ["seed"], conditions: ["adhd","default"] },
    { name: "Honeydew Melon + Deli Turkey Roll-Ups", tags: ["meat"], conditions: ["adhd","default"] },
    { name: "Papaya Chunks + Beef Jerky", tags: ["meat"], conditions: ["adhd","default"] },
    { name: "Banana with Almond Butter", tags: ["nuts"], conditions: ["adhd","anxiety","default"] },
    { name: "Celery & Hummus", tags: ["legume","seed"], conditions: ["anxiety","default"] },
    { name: "Handful of Cashews & Dried Cranberries", tags: ["nuts"], conditions: ["anxiety","default"] },
    { name: "Greek Yogurt with Honey & Berries", tags: ["dairy"], conditions: ["anxiety","depression","eating","phobia","hpd","ppd","default"] },
    { name: "Chamomile Tea & Whole Grain Crackers", tags: ["gluten"], conditions: ["anxiety","default"] },
    { name: "Kiwi Slices + a Handful of Almonds", tags: ["nuts"], conditions: ["anxiety","default"] },
    { name: "Cucumber Slices & Hummus", tags: ["legume","seed"], conditions: ["anxiety","default"] },
    { name: "Rice Cakes with Avocado", tags: [], conditions: ["anxiety","default"] },
    { name: "Coconut Yogurt with Berries", tags: ["coconut"], conditions: ["anxiety","depression","default"] },
    { name: "Dark Chocolate & Strawberries", tags: [], conditions: ["depression","default"] },
    { name: "Peanut Butter on Whole Grain Crackers", tags: ["gluten","nuts"], conditions: ["depression","default"] },
    { name: "Mango & Mixed Berries", tags: [], conditions: ["depression","default"] },
    { name: "Banana with Walnut Butter", tags: ["nuts"], conditions: ["depression","default"] },
    { name: "Trail Mix with Dark Chocolate Chips", tags: ["nuts"], conditions: ["depression","adhd","neuro_core","npd","default"] },
    { name: "Apple Slices & Almond Butter", tags: ["nuts"], conditions: ["depression","ptsd","default"] },
    { name: "Dates & Pumpkin Seeds", tags: ["seed"], conditions: ["depression","npd","ppd","aspd","bfrb","default"] },
    { name: "Sliced Pear & Sunflower Seed Butter", tags: ["seed"], conditions: ["depression","anxiety","default"] },
    { name: "Roasted Chickpeas", tags: ["legume"], conditions: ["depression","anxiety","default"] },
    { name: "Apple & Peanut Butter", tags: ["nuts"], conditions: ["bipolar","default"] },
    { name: "Hummus with Carrot & Cucumber Sticks", tags: ["legume","seed"], conditions: ["bipolar","anxiety","default"] },
    { name: "Banana with a Handful of Walnuts", tags: ["nuts"], conditions: ["bipolar","default"] },
    { name: "Greek Yogurt with Mixed Berries", tags: ["dairy"], conditions: ["bipolar","hpd","phobia","ppd","default"] },
    { name: "Apple Slices & Cheese", tags: ["dairy"], conditions: ["bipolar","default"] },
    { name: "Edamame with Sea Salt", tags: ["soy","legume"], conditions: ["bipolar","default"] },
    { name: "Baby Carrots & Guacamole", tags: [], conditions: ["bipolar","anxiety","default"] },
    { name: "Walnuts & Apple Slices", tags: ["nuts"], conditions: ["schizophrenia","neuro_core","npd","ppd","default"] },
    { name: "Yogurt with Honey & Granola", tags: ["dairy","gluten"], conditions: ["schizophrenia","hpd","phobia","ppd","default"] },
    { name: "Whole Grain Crackers with Cheese", tags: ["gluten","dairy"], conditions: ["schizophrenia","ocd","default"] },
    { name: "Banana & Peanut Butter", tags: ["nuts"], conditions: ["schizophrenia","did","bpd","ocd","default"] },
    { name: "Mixed Nuts & Dried Fruit", tags: ["nuts"], conditions: ["schizophrenia","bpd","default"] },
    { name: "Orange Slices & Almonds", tags: ["nuts","citrus"], conditions: ["schizophrenia","bpd","default"] },
    { name: "Chamomile Tea & Honey with Whole Grain Toast", tags: ["gluten"], conditions: ["ptsd","default"] },
    { name: "Mixed Berries with a Dollop of Yogurt", tags: ["dairy"], conditions: ["ptsd","default"] },
    { name: "Handful of Almonds", tags: ["nuts"], conditions: ["ptsd","default"] },
    { name: "Banana & a Few Walnuts", tags: ["nuts"], conditions: ["ptsd","default"] },
    { name: "Trail Mix with Dried Mango", tags: ["nuts"], conditions: ["ptsd","default"] },
    { name: "Peanut Butter & Jelly on Whole Grain Bread", tags: ["gluten","nuts"], conditions: ["did","default"] },
    { name: "Cheese & Crackers", tags: ["dairy","gluten"], conditions: ["did","default"] },
    { name: "Banana & a Glass of Milk", tags: ["dairy"], conditions: ["did","autism","default"] },
    { name: "Apple Slices & Peanut Butter", tags: ["nuts"], conditions: ["did","autism","ocd","default"] },
    { name: "Greek Yogurt with Honey", tags: ["dairy"], conditions: ["did","bpd","ocd","eating","phobia","hpd","default"] },
    { name: "Celery & Peanut Butter", tags: ["nuts"], conditions: ["did","bipolar","default"] },
    { name: "Sliced Banana", tags: [], conditions: ["autism","default"] },
    { name: "Plain Crackers with Peanut Butter", tags: ["gluten","nuts"], conditions: ["autism","default"] },
    { name: "Cheese Cubes & Apple Slices", tags: ["dairy"], conditions: ["autism","default"] },
    { name: "Sliced Strawberries", tags: [], conditions: ["autism","default"] },
    { name: "Vanilla Yogurt & Granola", tags: ["dairy","gluten"], conditions: ["autism","default"] },
    { name: "Peeled Orange Slices", tags: ["citrus"], conditions: ["autism","default"] },
    // ── Hearty snacks ──
    { name: "Hard-Boiled Eggs & Beef Jerky", tags: ["egg","meat"], conditions: ["adhd","default"] },
    { name: "Corn Tortilla Chips & Guacamole", tags: ["corn"], conditions: ["anxiety","default"] },
    { name: "Whole Grain Toast with Bacon & Sliced Avocado", tags: ["gluten","pork","meat"], conditions: ["adhd","default"] },
    { name: "Bacon & Cheese Roll-Up", tags: ["pork","meat","dairy"], conditions: ["adhd","default"] },
    { name: "Cornbread Muffin & Hard-Boiled Egg", tags: ["corn","gluten","egg"], conditions: ["depression","default"] },
    // ── Expanded: Blueberry, Pomegranate, Oat, Sweet Potato, Salmon ──
    { name: "Blueberries & Dark Chocolate Chips", tags: [], conditions: ["depression","ptsd","schizophrenia","neuro_core","bfrb","ppd","default"] },
    { name: "Pomegranate Seeds & Pistachios", tags: ["nuts","seed"], conditions: ["ptsd","depression","schizophrenia","default"] },
    { name: "Oat Energy Balls with Peanut Butter & Honey", tags: ["gluten","nuts"], conditions: ["depression","ocd","bpd","adhd","hpd","bfrb","phobia","default"] },
    { name: "Baked Sweet Potato Chips with Sea Salt", tags: [], conditions: ["adhd","schizophrenia","ptsd","autism","hpd","spd","eating","default"] },
    { name: "Smoked Salmon & Cream Cheese on Rice Cakes", tags: ["fish","dairy","rice"], conditions: ["depression","anxiety","ocd","neuro_core","npd","ppd","spd","default"] },
    { name: "Blueberry & Walnut Trail Mix", tags: ["nuts"], conditions: ["depression","ptsd","schizophrenia","neuro_core","bfrb","npd","default"] },
    { name: "Pomegranate & Greek Yogurt Cup", tags: ["dairy"], conditions: ["ptsd","depression","schizophrenia","default"] },
    { name: "Oat & Banana Mini Muffins", tags: ["gluten","oats","egg"], conditions: ["ocd","bpd","did","autism","default"] },
    { name: "Sweet Potato & Cinnamon Bites", tags: [], conditions: ["adhd","schizophrenia","ptsd","did","autism","eating","ppd","hpd","default"] },
    { name: "Blueberry Smoothie with Banana", tags: [], conditions: ["depression","ptsd","anxiety","schizophrenia","default"] },
    { name: "Rice Cakes with Almond Butter & Blueberries", tags: ["rice","nuts"], conditions: ["depression","anxiety","ocd","default"] },
    { name: "Pomegranate & Coconut Yogurt Cup", tags: ["coconut"], conditions: ["ptsd","depression","default"] },
    { name: "Oatmeal Cookie Energy Bites", tags: ["gluten","oats","nuts"], conditions: ["ocd","bpd","depression","default"] },
    { name: "Frozen Blueberries & Walnuts", tags: ["nuts"], conditions: ["depression","schizophrenia","ptsd","default"] },
    { name: "Sweet Potato Hummus with Veggie Sticks", tags: ["legume","seed"], conditions: ["anxiety","ptsd","bipolar","default"] },
    { name: "Salmon Jerky & Apple Slices", tags: ["fish"], conditions: ["depression","anxiety","ptsd","ocd","neuro_core","aspd","spd","default"] },
    // ── Condition-specific: NPD, HPD, ASPD, Eating, Phobia, BFRB, PPD, SPD, Neuro Core ──
    { name: "Pumpkin Seed & Banana Trail Mix", tags: ["seed"], conditions: ["npd","ppd","aspd","default"] },
    { name: "Dark Chocolate & Almonds with Dried Apricots", tags: ["nuts"], conditions: ["spd","neuro_core","default"] },
    { name: "Cantaloupe & Cottage Cheese with Honey", tags: ["dairy"], conditions: ["bfrb","eating","default"] },
    { name: "Dark Chocolate, Blueberries & Walnuts", tags: ["nuts"], conditions: ["neuro_core","bfrb","default"] },
    { name: "Almonds & Dark Chocolate with a Banana", tags: ["nuts"], conditions: ["ppd","phobia","default"] },
    { name: "Greek Yogurt with Blueberries & Pumpkin Seeds", tags: ["dairy","seed"], conditions: ["ppd","neuro_core","bfrb","default"] },
    { name: "Banana with Peanut Butter & a Glass of Milk", tags: ["dairy","nuts"], conditions: ["eating","did","default"] },
    { name: "Yogurt Parfait with Granola & Strawberries", tags: ["dairy","gluten"], conditions: ["eating","phobia","default"] },
    { name: "Hard-Boiled Eggs with Everything Seasoning & Fruit", tags: ["egg"], conditions: ["spd","neuro_core","default"] },
    { name: "Pumpkin Seeds & Cashew Mix with Dried Apricots", tags: ["nuts","seed"], conditions: ["aspd","ppd","default"] },
    { name: "Dark Chocolate Squares with Almonds", tags: ["nuts"], conditions: ["phobia","neuro_core","ppd","default"] },
    { name: "Grapefruit & Walnut Snack Bowl", tags: ["nuts","citrus"], conditions: ["bfrb","default"] },
    // ── Brain-boosting: Turmeric, Fermented, Lion's Mane ──
    { name: "Golden Turmeric Milk (Brain Latte)", tags: ["dairy"], conditions: ["depression","anxiety","ptsd","ocd","bpd","neuro_core","default"] },
    { name: "Kefir with Blueberries & Honey", tags: ["dairy"], conditions: ["anxiety","depression","ocd","autism","neuro_core","default"] },
    { name: "Sauerkraut & Avocado on Rice Cakes", tags: ["rice"], conditions: ["anxiety","depression","ocd","neuro_core","default"] },
    { name: "Sardines & Crackers with Lemon", tags: ["fish","sardine","gluten","citrus"], conditions: ["depression","anxiety","neuro_core","default"] },
    { name: "Lion's Mane Mushroom Tea with Honey", tags: ["mushroom"], conditions: ["neuro_core","depression","schizophrenia","default"] },
    { name: "Turmeric & Ginger Energy Balls", tags: ["nuts","oats","gluten"], conditions: ["depression","anxiety","neuro_core","default"] },
    { name: "Kombucha & Mixed Nuts", tags: ["nuts"], conditions: ["anxiety","depression","ocd","neuro_core","default"] },
    { name: "Miso Soup Cup with Seaweed", tags: ["soy"], conditions: ["anxiety","ptsd","autism","neuro_core","default"] },
  ],
};

const DIET_EXCLUSIONS = {
  vegan: ["egg","dairy","meat","fish","shellfish"],
  vegetarian: ["meat","fish","shellfish"],
  egg_free: ["egg"],
  corn_free: ["corn"],
  dairy_free: ["dairy"],
  nut_free: ["nuts"],
  shellfish_free: ["shellfish"],
  soy_free: ["soy"],
  gluten_free: ["gluten"],
  keto: ["high_carb"],
  low_sugar: ["high_sugar"],
  low_sodium: ["high_sodium"],
  pork_free: ["pork"],
  rice_free: ["rice"],
  halal: ["pork","shellfish"],
  kosher: ["pork","shellfish"],
  paleo: ["gluten","dairy","legume","high_sugar","soy","corn"],
  mediterranean: ["high_sugar","high_sodium"],
  pescatarian: ["meat"],
  anti_inflammatory: ["gluten","high_sugar","high_sodium"],
  low_fodmap: ["onion","legume","high_sugar"],
  sardine_free: ["sardine"],
  onion_free: ["onion"],
  mushroom_free: ["mushroom"],
  nightshade_free: ["nightshade"],
  coconut_free: ["coconut"],
  seed_free: ["seed"],
  legume_free: ["legume"],
  fish_free: ["fish"],
  citrus_free: ["citrus"],
  oat_free: ["oats"],
};

const filterMeals = (meals, selectedDiet, condition) => {
  const excludedTags = new Set();
  selectedDiet.forEach(d => { (DIET_EXCLUSIONS[d] || []).forEach(t => excludedTags.add(t)); });
  const isKosher = selectedDiet.includes("kosher");
  const conditionId = condition || "default";
  return meals.filter(m => {
    if (m.tags.some(t => excludedTags.has(t))) return false;
    // Kosher: no mixing meat and dairy in the same meal
    if (isKosher && m.tags.includes("meat") && m.tags.includes("dairy")) return false;
    return m.conditions.includes(conditionId) || m.conditions.includes("default");
  });
};

const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const DAY1_MEALS = {
  adhd:        { breakfast: "Grilled Chicken Sausage with Sliced Mango & Strawberries", lunch: "Grilled Chicken Breast with Watermelon & Feta Salad", dinner: "Sirloin Steak with Grilled Peaches & Asparagus", snacks: "Cherries + Beef Jerky" },
  anxiety:     { breakfast: "Banana Oatmeal with Honey & Cinnamon", lunch: "Grilled Chicken & Spinach Salad", dinner: "Baked Chicken Breast with Roasted Veggies", snacks: "Greek Yogurt with Honey & Berries" },
  depression:  { breakfast: "Spinach & Mushroom Omelette with Toast", lunch: "Grilled Chicken Caesar Salad", dinner: "Lemon Herb Chicken with Rice Pilaf", snacks: "Dark Chocolate & Strawberries" },
  bipolar:     { breakfast: "Oatmeal with Flaxseed, Berries & Honey", lunch: "Grilled Chicken & Brown Rice Bowl", dinner: "Grilled Steak with Roasted Potatoes & Broccoli", snacks: "Apple & Peanut Butter" },
  schizophrenia: { breakfast: "Oatmeal with Walnuts & Blueberries", lunch: "Grilled Chicken Sandwich with Side Salad", dinner: "Baked Chicken Breast with Roasted Veggies & Brown Rice", snacks: "Walnuts & Apple Slices" },
  autism:      { breakfast: "Plain Scrambled Eggs with Toast", lunch: "Grilled Chicken Strips with Mac & Cheese", dinner: "Baked Chicken Tenders with Rice & Corn", snacks: "Sliced Banana" },
  ptsd:        { breakfast: "Warm Oatmeal with Banana & Honey", lunch: "Grilled Chicken & Avocado Salad", dinner: "Baked Lemon Herb Chicken with Roasted Potatoes", snacks: "Mixed Berries with a Dollop of Yogurt" },
  did:         { breakfast: "Egg & Cheese Breakfast Burrito", lunch: "Classic Grilled Chicken Sandwich with Sweet Potato Fries", dinner: "Baked Chicken with Mashed Potatoes & Green Beans", snacks: "Banana & a Glass of Milk" },
  bpd:         { breakfast: "Eggs Any Style with Whole Grain Toast & Fruit", lunch: "Grilled Chicken Salad with Lemon Vinaigrette", dinner: "Grilled Steak with Roasted Sweet Potato & Broccoli", snacks: "Greek Yogurt with Honey" },
  ocd:         { breakfast: "Whole Grain Toast with Peanut Butter & Banana", lunch: "Grilled Chicken & Veggie Wrap", dinner: "Oven-Roasted Chicken with Vegetables & Quinoa", snacks: "Apple Slices & Peanut Butter" },
  npd:         { breakfast: "Warm Oatmeal with Pumpkin Seeds, Banana & Honey", lunch: "Grilled Chicken & Chickpea Bowl with Tahini Dressing", dinner: "Walnut-Crusted Salmon with Roasted Asparagus", snacks: "Pumpkin Seed & Banana Trail Mix" },
  hpd:         { breakfast: "Green Tea Smoothie with Banana, Spinach & Almond Butter", lunch: "Turkey & Black Bean Bowl with Sweet Potato & Yogurt", dinner: "Baked Chicken Thighs with Roasted Brussels Sprouts & Sweet Potato", snacks: "Greek Yogurt with Mixed Berries" },
  aspd:        { breakfast: "Turkey & Egg Breakfast Wrap with Spinach", lunch: "Sardine & Avocado Toast with Mixed Greens Salad", dinner: "Baked Mackerel with Quinoa & Roasted Brussels Sprouts", snacks: "Pumpkin Seeds & Cashew Mix with Dried Apricots" },
  eating:      { breakfast: "Scrambled Eggs with Toast & Fresh Fruit Salad", lunch: "Chicken & Rice Soup with Crusty Bread", dinner: "Baked Chicken with Mashed Potatoes & Buttered Green Beans", snacks: "Banana with Peanut Butter & a Glass of Milk" },
  phobia:      { breakfast: "Yogurt & Berry Smoothie with Chia Seeds", lunch: "Grilled Salmon Salad with Avocado, Spinach & Pumpkin Seeds", dinner: "Baked Salmon with Brown Rice & Roasted Asparagus", snacks: "Almonds & Dark Chocolate with a Banana" },
  bfrb:        { breakfast: "Scrambled Eggs with Broccoli, Garlic & Whole Grain Toast", lunch: "Grilled Chicken & Brussels Sprout Bowl with Brown Rice", dinner: "Garlic Chicken Stir-Fry with Broccoli & Brown Rice", snacks: "Dark Chocolate, Blueberries & Walnuts" },
  ppd:         { breakfast: "Warm Oatmeal with Pumpkin Seeds, Banana & Honey", lunch: "Kimchi Rice Bowl with Grilled Chicken & Steamed Veggies", dinner: "Chicken & Vegetable Bone Broth Soup with Brown Rice", snacks: "Greek Yogurt with Blueberries & Pumpkin Seeds" },
  spd:         { breakfast: "Steak & Egg Scramble with Avocado & Whole Grain Toast", lunch: "Grilled Chicken & Lentil Bowl with Spinach & Tahini", dinner: "Beef Stir-Fry with Broccoli, Bell Pepper & Quinoa", snacks: "Dark Chocolate & Almonds with Dried Apricots" },
  neuro_core:  { breakfast: "Egg & Avocado Toast with Smoked Salmon & Microgreens", lunch: "Grilled Chicken & Spinach Salad", dinner: "Grilled Salmon with Asparagus & Quinoa", snacks: "Dark Chocolate, Blueberries & Walnuts" },
  default:     { breakfast: "Banana Oatmeal with Honey & Cinnamon", lunch: "Grilled Chicken & Spinach Salad", dinner: "Baked Chicken Breast with Roasted Veggies", snacks: "Greek Yogurt with Honey & Berries" },
};

const LENTIL_KEYWORDS = ["lentil", "Lentil"];
const GLUTEN_KEYWORDS = ["toast","bread","tortilla","wrap","sandwich","burrito","bagel","muffin","waffle","pancake","pasta","noodle","roll","hoagie","sub","quesadilla","bun","cornbread","cracker","cereal","granola","oatmeal","oats","porridge"];
const isGlutenMeal = (name) => GLUTEN_KEYWORDS.some(k => name.toLowerCase().includes(k));

const build30DayMenu = (condition, selectedDiet, calTarget) => {
  const breakfastPool = filterMeals(ALL_MEALS.breakfast, selectedDiet, condition);
  const lunchPool = filterMeals(ALL_MEALS.lunch, selectedDiet, condition);
  const dinnerPool = filterMeals(ALL_MEALS.dinner, selectedDiet, condition);
  const snackPool = filterMeals(ALL_MEALS.snacks, selectedDiet, condition);
  const addSecondSnack = calTarget === "2000";

  const isLentil = (name) => LENTIL_KEYWORDS.some(k => name.includes(k));
  const splitPool = (pool) => ({ early: pool.filter(m => !isLentil(m.name)), any: pool });
  const bSplit = splitPool(breakfastPool);
  const lSplit = splitPool(lunchPool);
  const dSplit = splitPool(dinnerPool);
  const sSplit = splitPool(snackPool);

  const pick = (pool, count) => {
    const shuffled = shuffle(pool);
    const results = [];
    for (let i = 0; i < count; i++) results.push(shuffled[i % shuffled.length].name);
    return results;
  };

  // Build raw arrays
  const breakfastsEarly = pick(bSplit.early, 6);
  const lunchesEarly = pick(lSplit.early, 6);
  const dinnersEarly = pick(dSplit.early, 6);
  const snacksEarly = pick(sSplit.early, 6);
  const breakfastsLate = pick(bSplit.any, 23);
  const lunchesLate = pick(lSplit.any, 23);
  const dinnersLate = pick(dSplit.any, 23);
  const snacksLate = pick(sSplit.any, 23);

  const day1Base = DAY1_MEALS[condition] || DAY1_MEALS.default;
  const d1b = breakfastPool.find(m => m.name === day1Base.breakfast)?.name || breakfastsEarly[0];
  const d1l = lunchPool.find(m => m.name === day1Base.lunch)?.name || lunchesEarly[0];
  const d1d = dinnerPool.find(m => m.name === day1Base.dinner)?.name || dinnersEarly[0];
  const d1s = snackPool.find(m => m.name === day1Base.snacks)?.name || snacksEarly[0];

  // Non-gluten fallback pickers
  const nonGlutenBreakfast = breakfastPool.filter(m => !isGlutenMeal(m.name));
  const nonGlutenLunch = lunchPool.filter(m => !isGlutenMeal(m.name));
  const nonGlutenDinner = dinnerPool.filter(m => !isGlutenMeal(m.name));
  const getNonGluten = (pool, fallback) => {
    if (pool.length === 0) return fallback;
    return pool[Math.floor(Math.random() * pool.length)].name;
  };

  // Build a second snack pool (shuffled differently so snack2 != snack1)
  const snacks2Pool = shuffle(snackPool);
  const snacks2Early = pick(snackPool, 6);
  const snacks2Late = pick(snackPool, 23);

  return Array.from({ length: 30 }, (_, i) => {
    if (i === 0) {
      const day1 = { day: 1, breakfast: d1b, lunch: d1l, dinner: d1d, snacks: d1s };
      if (addSecondSnack) day1.snacks2 = snacks2Pool.length > 0 ? snacks2Pool[0 % snacks2Pool.length].name : d1s;
      return day1;
    }

    const b = i <= 6 ? breakfastsEarly[i-1] : breakfastsLate[i-7];
    const l = i <= 6 ? lunchesEarly[i-1] : lunchesLate[i-7];
    const d = i <= 6 ? dinnersEarly[i-1] : dinnersLate[i-7];
    const s = i <= 6 ? snacksEarly[i-1] : snacksLate[i-7];

    // Count how many of the 3 main meals contain bread/gluten items
    // Allow max 1 per day — replace extras with non-gluten options
    const meals = [
      { slot: "b", name: b, isG: isGlutenMeal(b) },
      { slot: "l", name: l, isG: isGlutenMeal(l) },
      { slot: "d", name: d, isG: isGlutenMeal(d) },
    ];
    let glutenCount = meals.filter(m => m.isG).length;
    const result = { b, l, d };
    if (glutenCount > 1) {
      // Keep only the first gluten meal, swap the rest to non-gluten
      let kept = false;
      for (const m of meals) {
        if (m.isG) {
          if (!kept) { kept = true; continue; }
          // Replace this slot with a non-gluten option
          if (m.slot === "b") result.b = getNonGluten(nonGlutenBreakfast, b);
          if (m.slot === "l") result.l = getNonGluten(nonGlutenLunch, l);
          if (m.slot === "d") result.d = getNonGluten(nonGlutenDinner, d);
        }
      }
    }
    const dayObj = { day: i+1, breakfast: result.b, lunch: result.l, dinner: result.d, snacks: s };
    if (addSecondSnack) {
      // Ensure second snack is different from first
      let s2 = i <= 6 ? snacks2Early[i-1] : snacks2Late[i-7];
      if (s2 === s && snackPool.length > 1) {
        const alt = snackPool.find(m => m.name !== s);
        if (alt) s2 = alt.name;
      }
      dayObj.snacks2 = s2;
    }
    return dayObj;
  });
};

// ── Calorie Estimator ────────────────────────────────────────────────────────
// Estimates calories from meal name keywords — returns a range string like "480–560 kcal"
function estimateCalories(mealName) {
  const m = mealName.toLowerCase();

  // Snack-sized (under 300)
  if (m.includes("jerky") || m.includes("handful") || m.includes("sliced banana") ||
      m.includes("sliced strawberr") || m.includes("orange slices") || m.includes("peeled orange") ||
      m.includes("chamomile")) return "120–180 kcal";

  if (m.includes("apple slices") || m.includes("celery") || m.includes("cucumber") ||
      m.includes("rice cake") || m.includes("edamame") || m.includes("roasted chickpeas"))
    return "150–220 kcal";

  if (m.includes("dark chocolate") || m.includes("trail mix") || m.includes("mixed berry") ||
      m.includes("fruit bowl") || m.includes("mango slices") || m.includes("peach slices") ||
      m.includes("grapes") || m.includes("cherries") || m.includes("watermelon chunks") ||
      m.includes("pineapple chunks") || m.includes("kiwi") || m.includes("banana + "))
    return "160–240 kcal";

  if (m.includes("peanut butter") && (m.includes("apple") || m.includes("celery") || m.includes("cracker")))
    return "220–300 kcal";

  if (m.includes("greek yogurt") && !m.includes("parfait")) return "180–260 kcal";
  if (m.includes("hummus")) return "180–250 kcal";
  if (m.includes("guacamole") && m.includes("chip")) return "200–280 kcal";
  if (m.includes("almond") || m.includes("walnut") || m.includes("cashew") || m.includes("nuts"))
    return "200–280 kcal";

  // Breakfast range
  if (m.includes("smoothie bowl") || m.includes("smoothie")) return "320–420 kcal";
  if (m.includes("oatmeal") || m.includes("oats") || m.includes("porridge") || m.includes("overnight oat"))
    return "340–440 kcal";
  if (m.includes("chia pudding") || m.includes("chia seed pudding")) return "280–360 kcal";
  if (m.includes("greek yogurt parfait") || m.includes("yogurt parfait")) return "320–400 kcal";
  if (m.includes("pancake") || m.includes("waffle")) return "420–560 kcal";
  if (m.includes("avocado toast") || (m.includes("avocado") && m.includes("toast"))) return "380–480 kcal";
  if (m.includes("scrambled egg") || m.includes("omelette") || m.includes("egg skillet")) return "380–500 kcal";
  if (m.includes("breakfast burrito") || m.includes("breakfast taco")) return "480–620 kcal";
  if (m.includes("bagel")) return "480–600 kcal";
  if (m.includes("english muffin")) return "320–400 kcal";
  if (m.includes("cornmeal porridge") || m.includes("cornbread") && m.includes("egg")) return "360–460 kcal";
  if (m.includes("toast") && (m.includes("peanut butter") || m.includes("almond butter"))) return "360–460 kcal";
  if (m.includes("sourdough") && !m.includes("bacon")) return "340–440 kcal";
  if ((m.includes("bacon") || m.includes("sausage")) && m.includes("egg")) return "480–620 kcal";
  if (m.includes("brisket hash")) return "520–660 kcal";
  if (m.includes("whole grain") && m.includes("fruit")) return "340–440 kcal";

  // Lunch range
  if (m.includes("salad") && !m.includes("chicken") && !m.includes("steak") && !m.includes("turkey"))
    return "220–340 kcal";
  if (m.includes("salad") && (m.includes("chicken") || m.includes("turkey"))) return "380–500 kcal";
  if (m.includes("caesar salad")) return "420–540 kcal";
  if (m.includes("soup") && !m.includes("stew")) return "320–440 kcal";
  if (m.includes("wrap") && (m.includes("chicken") || m.includes("turkey"))) return "440–560 kcal";
  if (m.includes("burrito")) return "560–720 kcal";
  if (m.includes("quesadilla")) return "520–680 kcal";
  if (m.includes("sandwich") || m.includes("club") || m.includes("sub") || m.includes("hoagie"))
    return "480–620 kcal";
  if (m.includes("blt")) return "440–560 kcal";
  if (m.includes("burger") || m.includes("cheeseburger")) return "580–740 kcal";
  if (m.includes("taco") && (m.includes("corn tortilla") || m.includes("lettuce"))) return "380–500 kcal";
  if (m.includes("bowl") && (m.includes("rice") || m.includes("quinoa"))) return "480–620 kcal";
  if (m.includes("lentil") || m.includes("chickpea") || m.includes("black bean")) return "380–500 kcal";

  // Dinner range
  if (m.includes("steak") || m.includes("sirloin") || m.includes("ribeye")) return "520–680 kcal";
  if (m.includes("brisket") && m.includes("chili")) return "580–740 kcal";
  if (m.includes("brisket")) return "540–700 kcal";
  if (m.includes("meatloaf")) return "520–660 kcal";
  if (m.includes("pork chop") || m.includes("pork tenderloin")) return "480–620 kcal";
  if (m.includes("bacon-wrapped") || m.includes("bacon wrapped")) return "500–640 kcal";
  if (m.includes("sausage") && m.includes("stew")) return "480–620 kcal";
  if (m.includes("sausage") && m.includes("pepper")) return "460–580 kcal";
  if (m.includes("enchilada")) return "540–700 kcal";
  if (m.includes("fajita")) return "500–660 kcal";
  if (m.includes("salmon")) return "440–580 kcal";
  if (m.includes("chicken thigh")) return "480–620 kcal";
  if (m.includes("chicken breast") || m.includes("chicken breast")) return "420–560 kcal";
  if (m.includes("turkey") && m.includes("meatball")) return "420–540 kcal";
  if (m.includes("ground beef") || m.includes("ground turkey")) return "460–600 kcal";
  if (m.includes("stir-fry") || m.includes("stir fry")) return "440–580 kcal";
  if (m.includes("curry")) return "480–620 kcal";
  if (m.includes("stew")) return "460–600 kcal";
  if (m.includes("pasta") || m.includes("noodle")) return "500–660 kcal";
  if (m.includes("casserole")) return "480–620 kcal";
  if (m.includes("stuffed pepper")) return "440–580 kcal";
  if (m.includes("roasted") && m.includes("chicken")) return "440–580 kcal";
  if (m.includes("taco") && m.includes("dinner")) return "480–620 kcal";
  if (m.includes("taco bowl") || (m.includes("taco") && m.includes("bowl"))) return "500–640 kcal";

  // Generic fallbacks by meal type feel
  if (m.includes("bowl")) return "460–600 kcal";
  if (m.includes("chicken")) return "420–560 kcal";
  if (m.includes("turkey")) return "400–540 kcal";
  if (m.includes("beef")) return "480–620 kcal";
  return "380–520 kcal";
}

const CONDITION_FOCUS = {
  adhd: ["fresh fruit & lean protein","omega-3s","iron & zinc","natural sugars over processed"],
  anxiety: ["magnesium","B vitamins","probiotics","anti-inflammatory foods"],
  depression: ["serotonin boosters","omega-3s","folate","vitamin D"],
  bipolar: ["mood-stabilizing minerals","omega-3s","whole grains","steady blood sugar"],
  schizophrenia: ["antioxidants","B vitamins","omega-3s","anti-inflammatory"],
  autism: ["gut health","B6 & magnesium","omega-3s","sensory-friendly textures"],
  ptsd: ["stress-reducing nutrients","magnesium","omega-3s","B vitamins"],
  did: ["blood sugar stability","consistent energy","omega-3s","grounding foods"],
  bpd: ["blood sugar balance","omega-3s","magnesium","anti-inflammatory"],
  ocd: ["serotonin support","complex carbs","B vitamins","zinc & magnesium"],
  neuro_core: ["brain optimisation","omega-3s","gut-brain axis","antioxidants","cognitive performance"],
  default: ["balanced nutrients","whole foods","hydration","gut health"],
};

const RECIPES = {
  "Grilled Chicken Sausage with Sliced Mango & Strawberries": { serves: 1, time: "10 min", ingredients: ["2 chicken sausage links","1 cup fresh mango, sliced","1 cup strawberries, hulled & halved","1 tsp olive oil","Pinch of sea salt"], steps: ["Heat a grill pan or skillet over medium-high heat with olive oil.","Add chicken sausage links and cook 4–5 minutes per side until golden and cooked through.","While sausage cooks, slice mango and halve strawberries and arrange on your plate.","Slice cooked sausage on the diagonal and plate alongside the fruit.","Sprinkle a pinch of sea salt over the fruit to enhance sweetness."], tip: "Buy pre-cooked chicken sausage and just slice and warm — cuts prep to 3 minutes." },
  "Banana Oatmeal with Honey & Cinnamon": { serves: 1, time: "8 min", ingredients: ["½ cup rolled oats","1 cup water or milk of choice","1 ripe banana, sliced","1 tbsp honey","½ tsp cinnamon","Pinch of salt"], steps: ["Bring water or milk to a boil in a small saucepan. Add oats and pinch of salt.","Reduce heat to medium and stir frequently for 3–5 minutes until thickened to your liking.","Pour into a bowl and top with sliced banana.","Drizzle honey over the top and dust generously with cinnamon.","Stir gently and eat while warm."], tip: "Use a very ripe banana — the natural sweetness means you need less honey." },
  "Spinach & Mushroom Omelette with Toast": { serves: 1, time: "12 min", ingredients: ["3 eggs","1 cup fresh spinach","½ cup mushrooms, sliced","1 tbsp butter","2 tbsp cheese (optional)","Salt & pepper","2 slices whole grain toast"], steps: ["Beat eggs with salt and pepper in a bowl.","Sauté mushrooms in butter over medium-high heat until golden, 3–4 minutes. Add spinach and wilt 1 minute.","Push vegetables to the side of the pan. Pour in eggs.","Once edges set, add cheese if using. Fold omelette over the filling.","Cook 1 more minute. Slide onto plate and serve with toast."], tip: "Don't overcook — an omelette should be just barely set inside, not rubbery." },
  "Grilled Chicken Breast with Watermelon & Feta Salad": { serves: 1, time: "20 min", ingredients: ["1 chicken breast","2 cups watermelon, cubed","¼ cup feta cheese, crumbled","Handful fresh mint leaves","1 tbsp olive oil","Juice of ½ lime","Salt & pepper"], steps: ["Season chicken breast with salt, pepper, and olive oil.","Grill or cook in a pan over medium-high heat, 6–7 minutes per side until cooked through. Rest 5 minutes.","Cube watermelon and place in a bowl with crumbled feta and torn mint leaves.","Drizzle lime juice and a little olive oil over the salad.","Slice chicken and serve alongside or over the salad."], tip: "Let the chicken rest before slicing — it keeps all the juices in." },
  "Oatmeal with Flaxseed, Berries & Honey": { serves: 1, time: "8 min", ingredients: ["½ cup rolled oats","1 cup water or almond milk","1 tbsp ground flaxseed","½ cup mixed berries (fresh or frozen)","1 tbsp honey","Pinch of cinnamon and salt"], steps: ["Cook oats in water or milk over medium heat, stirring, 4–5 minutes.","Stir in ground flaxseed during the last minute of cooking.","Pour into bowl. Top with berries.","Drizzle honey over top and add a pinch of cinnamon.","Let sit 1 minute for the berries to warm slightly if using frozen."], tip: "Ground flaxseed absorbs into the oatmeal invisibly — you get all the omega-3s without any taste change." },
  "Grilled Steak with Roasted Potatoes & Broccoli": { serves: 1, time: "35 min", ingredients: ["6–8 oz sirloin steak","2 medium potatoes, cubed","2 cups broccoli florets","2 tbsp olive oil","Salt, pepper, garlic powder","1 tsp butter","Fresh parsley"], steps: ["Preheat oven to 425°F. Toss potato cubes with 1 tbsp olive oil, salt, garlic powder.","Roast potatoes 15 minutes. Add broccoli tossed in remaining olive oil, roast another 15 minutes.","Season steak well with salt and pepper. Let sit at room temp 10 minutes.","Grill or pan-sear steak over high heat, 3–4 minutes per side for medium.","Rest steak 5 minutes. Slice against the grain. Serve with vegetables. Top with butter and parsley."], tip: "Slicing against the grain is the single biggest difference between tough and tender steak." },
  "Warm Oatmeal with Banana & Honey": { serves: 1, time: "7 min", ingredients: ["½ cup rolled oats","1 cup water or milk of choice","1 ripe banana","1 tbsp honey","Pinch of salt","Optional: pinch of nutmeg"], steps: ["Bring liquid to a gentle boil. Add oats and salt.","Cook over medium heat, stirring, 4–5 minutes until thick and creamy.","Slice banana into rounds.","Pour oatmeal into a warm bowl. Arrange banana slices on top.","Drizzle honey generously. Add nutmeg if using. Eat warm."], tip: "If your oats are too thick, stir in a splash of warm water or milk before serving." },
  "Baked Lemon Herb Chicken with Roasted Potatoes": { serves: 1, time: "40 min", ingredients: ["2 chicken thighs or 1 large breast","2 medium potatoes, wedged","3 tbsp olive oil","Juice and zest of 1 lemon","2 garlic cloves, minced","1 tsp dried oregano","1 tsp dried thyme","Salt & pepper"], steps: ["Preheat oven to 425°F.","Mix olive oil, lemon juice, zest, garlic, oregano, thyme, salt, and pepper.","Toss potato wedges in half the mixture. Spread on a baking sheet.","Coat chicken in remaining mixture. Place on top of or beside potatoes.","Roast 30–35 minutes until chicken is golden and potatoes are tender.","Rest chicken 5 minutes before serving."], tip: "Bone-in chicken thighs are more forgiving than breast — nearly impossible to overcook." },
  "Egg & Cheese Breakfast Burrito": { serves: 1, time: "10 min", ingredients: ["3 eggs","¼ cup shredded cheddar or pepper jack","1 large flour or whole wheat tortilla","1 tbsp butter","Salt & pepper","Optional: salsa, avocado, hot sauce"], steps: ["Beat eggs with salt and pepper.","Melt butter in a non-stick pan over medium-low heat.","Scramble eggs slowly until just set — slightly glossy is perfect.","Warm tortilla in a dry pan or microwave 20 seconds.","Layer eggs down center of tortilla. Top with cheese while hot so it melts.","Add salsa or avocado if using. Fold sides in, then roll up tightly."], tip: "Wrapping tightly in foil for 2 minutes lets the burrito steam itself perfectly together." },
  "Oven-Roasted Chicken with Vegetables & Quinoa": { serves: 2, time: "45 min", ingredients: ["2 chicken thighs, bone-in","2 cups mixed vegetables (zucchini, bell pepper, red onion, carrots)","1 cup quinoa","2 tbsp olive oil","1 tsp garlic powder","1 tsp paprika","Salt, pepper, dried thyme"], steps: ["Preheat oven to 425°F. Cook quinoa per package directions.","Toss vegetables with 1 tbsp olive oil, salt, pepper. Spread on a baking sheet.","Rub chicken with remaining olive oil, garlic powder, paprika, thyme, salt, pepper.","Place chicken on top of vegetables on the sheet.","Roast 35–40 minutes until chicken skin is golden and juices run clear.","Serve chicken and vegetables over quinoa."], tip: "The vegetables caramelize under the chicken and absorb the drippings — the best part of the whole dish." },
  "Plain Scrambled Eggs with Toast": { serves: 1, time: "7 min", ingredients: ["3 eggs","1 tbsp butter","Salt to taste","2 slices bread, toasted","Optional: a little shredded cheese"], steps: ["Crack eggs into a bowl and whisk with a pinch of salt.","Melt butter in a non-stick pan over low heat.","Add eggs and stir constantly with a silicone spatula.","Cook very slowly — 3–4 minutes — until just set and creamy.","Remove from heat while slightly underdone. Toast will finish eating alongside.","Serve immediately on or beside toast."], tip: "Low heat, constant stirring, remove early. These three rules make perfect scrambled eggs every time." },
  "Dark Chocolate & Strawberries": { serves: 1, time: "5 min", ingredients: ["1 oz dark chocolate (70%+ cacao), broken into pieces","6–8 fresh strawberries, washed","Optional: pinch of sea salt flakes"], steps: ["Wash and dry strawberries — water prevents chocolate from sticking if dipping.","Break dark chocolate into pieces and arrange on a small plate.","Place strawberries alongside.","If you like, melt chocolate in a microwave 30 seconds at a time, stirring, and dip berries.","Finish with a tiny pinch of flaky sea salt on the chocolate — it amplifies the flavor dramatically."], tip: "Microwave chocolate in 15-second bursts after the first 30 — it burns fast when nearly melted." },
  "Grilled Steak with Roasted Sweet Potato & Broccoli": { serves: 1, time: "35 min", ingredients: ["6–8 oz sirloin or strip steak","1 medium sweet potato, cubed","2 cups broccoli florets","2 tbsp olive oil","Salt, pepper, garlic powder","1 tsp butter"], steps: ["Preheat oven to 425°F. Toss sweet potato cubes with 1 tbsp olive oil, salt, garlic powder.","Roast sweet potato 15 minutes. Add broccoli with remaining olive oil, roast 15 more minutes.","Season steak generously with salt and pepper.","Heat a pan over high heat until very hot. Add butter.","Sear steak 3–4 minutes per side for medium. Rest 5 minutes before slicing.","Serve steak sliced against the grain alongside roasted vegetables."], tip: "Don't move the steak for the first 3 minutes — you want a proper crust to form." },
  "Sirloin Steak with Grilled Peaches & Asparagus": { serves: 1, time: "25 min", ingredients: ["6-8 oz sirloin","1 peach, halved","1 bunch asparagus, trimmed","1 tbsp olive oil","Salt, pepper, balsamic glaze"], steps: ["Season steak. Sear in hot pan 3-4 min per side. Rest.","Grill peach halves cut-side down in same pan 3 min until caramelized.","Toss asparagus in oil, roast at 425F 10-12 min.","Serve steak with grilled peach and asparagus. Drizzle balsamic."], tip: "Grill marks on peaches add incredible depth — don't skip this step." },
  "Baked Chicken Breast with Roasted Veggies": { serves: 1, time: "30 min", ingredients: ["1 chicken breast","2 cups mixed veggies: zucchini, bell pepper, onion, tomato","2 tbsp olive oil","Salt, pepper, garlic powder, Italian herbs"], steps: ["Preheat oven 425F. Toss veggies with oil and salt.","Rub chicken with remaining oil and seasonings.","Roast chicken and veggies together 22-25 min.","Rest chicken 5 min before serving."], tip: "Cut vegetables into similar sizes so they all cook evenly." },
  "Lemon Herb Chicken with Rice Pilaf": { serves: 1, time: "30 min", ingredients: ["1 chicken breast or 2 thighs","1 cup long grain white or jasmine rice","1¾ cup chicken broth","1 tbsp butter","Juice and zest of 1 lemon","2 garlic cloves, minced","Fresh or dried thyme, parsley","Salt & pepper, olive oil"], steps: ["For pilaf: melt butter in a saucepan, toast rice 2 minutes stirring. Add broth, bring to boil, reduce to low, cover 18 minutes.","Season chicken with lemon zest, garlic, thyme, salt, pepper, and olive oil. Marinate 10 minutes if possible.","Cook chicken in a pan over medium heat, 6–7 minutes per side until golden and cooked through.","Fluff rice with a fork. Stir in fresh parsley and lemon juice.","Serve chicken over pilaf with extra lemon squeezed on top."], tip: "Toasting the rice in butter before adding liquid is what makes pilaf taste restaurant-quality." },
  "Grilled Salmon with Asparagus & Quinoa": { serves: 1, time: "25 min", ingredients: ["6 oz salmon fillet","1 bunch asparagus, trimmed","1 cup cooked quinoa","1 tbsp olive oil","Juice of 1 lemon","Salt, pepper, garlic powder"], steps: ["Cook quinoa per package. Toss asparagus with oil, salt. Roast at 425F 12 min.","Season salmon with oil, garlic, salt, pepper. Pan-sear 4 min per side.","Serve over quinoa with asparagus. Squeeze lemon over everything."], tip: "Salmon is done when it flakes easily with a fork — don't wait for it to look fully opaque." },
};

const RECIPES_EXTENDED = {
  "Chicken Sausage Patties with Sliced Peaches & Honeydew": { serves:1, time:"12 min", ingredients:["3 chicken sausage patties","1 ripe peach, sliced","1 cup honeydew melon, cubed","1 tsp olive oil","Pinch of cinnamon"], steps:["Heat olive oil in a skillet over medium heat.","Cook patties 4-5 min per side until golden.","Slice peach and cube honeydew while patties cook.","Dust fruit lightly with cinnamon.","Serve patties alongside the fruit."], tip:"Frozen peaches work great — thaw overnight in the fridge." },
  "Ground Turkey Bowl with Sautéed Spinach & Sliced Kiwi": { serves:1, time:"15 min", ingredients:["4 oz ground turkey","2 cups fresh spinach","2 kiwis, peeled and sliced","1 garlic clove, minced","1 tbsp olive oil","Salt, pepper"], steps:["Heat oil, cook garlic 30 sec.","Add turkey, cook 6-7 min until browned. Season.","Push aside, wilt spinach 1-2 min.","Transfer to bowl and serve kiwi alongside."], tip:"Kiwi is best eaten raw — vitamin C is most potent uncooked." },
  "Steak & Egg Scramble with Sliced Cantaloupe & Grapes": { serves:1, time:"15 min", ingredients:["4 oz sirloin, thinly sliced","3 eggs","1 cup cantaloupe, cubed","1/2 cup grapes","1 tbsp butter","Salt, pepper, garlic powder"], steps:["Season steak slices, sear in hot skillet 2-3 min. Set aside.","Reduce heat. Add butter, scramble eggs slowly.","Fold steak into eggs just before they set.","Serve with cantaloupe and grapes on the side."], tip:"Thin steak strips cook in seconds — don't walk away from the pan." },
  "Whole Grain Toast with Peanut Butter & Banana": { serves:1, time:"5 min", ingredients:["2 slices whole grain bread","2 tbsp peanut butter","1 banana, sliced"], steps:["Toast bread.","Spread peanut butter generously.","Top with banana slices."], tip:"Mash the banana into the peanut butter for a different but equally great texture." },
  "Scrambled Eggs & Avocado on Toast": { serves:1, time:"10 min", ingredients:["3 eggs","1/2 avocado","2 slices whole grain toast","1 tbsp butter","Salt, pepper, chili flakes"], steps:["Scramble eggs in butter over medium-low heat until creamy.","Toast bread.","Slice or mash avocado on toast.","Top with eggs, salt, pepper, and chili flakes."], tip:"Add avocado after the eggs — it oxidizes quickly when warm." },
  "Pan-Seared Steak with Roasted Sweet Potato & Fresh Blueberry Side": { serves:1, time:"30 min", ingredients:["6-8 oz sirloin steak","1 medium sweet potato, cubed","1/2 cup fresh blueberries","1 tbsp olive oil","1 tsp butter","Salt, pepper, garlic powder"], steps:["Roast sweet potato at 425F 22-25 min with oil and garlic.","Pat steak dry, season generously with salt and pepper.","Heat pan until smoking. Add butter. Sear 3-4 min per side.","Rest steak 5 min before slicing.","Serve with sweet potato and fresh blueberries on the side."], tip:"The blueberries are eaten fresh — their antioxidants are most potent uncooked." },
  "Baked Chicken Thighs with Roasted Pineapple & Quinoa": { serves:1, time:"35 min", ingredients:["2 chicken thighs, boneless","3 pineapple rings","1 cup cooked quinoa","1 tbsp olive oil","Salt, pepper, garlic powder, smoked paprika"], steps:["Season chicken with oil and spices. Roast at 425F 25-28 min.","Add pineapple rings to pan last 8 min until caramelized.","Serve over quinoa."], tip:"Caramelized pineapple in the pan absorbs the chicken juices — it's incredible." },
  "Ribeye Steak with Roasted Broccoli & Mango Salsa": { serves:1, time:"25 min", ingredients:["6-8 oz ribeye","2 cups broccoli florets","1 mango, diced","1/4 red onion, diced","Juice of 1 lime","Cilantro","1 tbsp olive oil","Salt, pepper"], steps:["Roast broccoli at 425F with oil and salt 18-20 min.","Make mango salsa: mango, onion, lime, cilantro.","Season ribeye. Sear in smoking hot pan 3-4 min per side. Rest 5 min.","Serve ribeye with broccoli and mango salsa."], tip:"Ribeye has enough marbling to need nothing but salt, pepper, and a hot pan." },
  "Steak Tacos with Pineapple Salsa & Avocado": { serves:1, time:"20 min", ingredients:["5 oz sirloin","3-4 small tortillas","1 cup pineapple, finely diced","1/4 onion, diced","Jalapeno, cilantro, lime","1 avocado, sliced","Salt, pepper, cumin"], steps:["Season steak with cumin, salt, pepper. Sear 3-4 min per side. Rest and slice thin.","Mix pineapple, onion, jalapeno, cilantro, lime for salsa.","Warm tortillas. Fill with steak, salsa, avocado."], tip:"Slice steak against the grain for the most tender taco filling." },
  "Baked Chicken Tenders with Rice & Corn": { serves:1, time:"25 min", ingredients:["4–5 chicken tenders","½ cup breadcrumbs","1 egg, beaten","Salt, pepper, garlic powder","1 cup cooked white rice","½ cup corn (canned or frozen)","1 tbsp butter"], steps:["Preheat oven to 400°F. Line a baking sheet with parchment.","Season breadcrumbs with salt, pepper, and garlic powder.","Dip each tender in beaten egg, then press into breadcrumbs.","Place on baking sheet and bake 18–20 minutes, flipping halfway, until golden.","While tenders bake, cook rice per package. Warm corn with a little butter.","Serve tenders alongside rice and corn."], tip:"A wire rack on the baking sheet makes tenders crispy on both sides without flipping." },
  "Grilled Chicken & Spinach Salad": { serves:1, time:"20 min", ingredients:["1 chicken breast","3 cups baby spinach","1/2 cup cherry tomatoes, halved","1/4 red onion, sliced","2 tbsp olive oil","1 tbsp lemon juice","Salt and pepper"], steps:["Cook chicken 6-7 min per side. Rest and slice.","Toss spinach, tomatoes, onion with olive oil and lemon.","Top with sliced chicken."], tip:"Add pumpkin seeds for extra magnesium and crunch." },
  "Baked Salmon with Mashed Sweet Potato & Green Beans": { serves:1, time:"30 min", ingredients:["6 oz salmon fillet","1 large sweet potato, peeled and cubed","2 cups green beans","1 tbsp butter","Salt, pepper, garlic powder","Lemon juice"], steps:["Boil sweet potato until tender 15 min. Mash with butter and salt.","Season salmon and bake at 400F 12-15 min.","Steam green beans 4-5 min.","Serve salmon with sweet potato mash and green beans. Squeeze lemon."], tip:"Don't overcook salmon — it goes from perfect to dry very quickly at the 15-minute mark." },
  "Grilled Chicken Caesar Salad": { serves:1, time:"20 min", ingredients:["1 chicken breast","3 cups romaine, chopped","2 tbsp Caesar dressing","2 tbsp parmesan","Croutons optional","Salt and pepper"], steps:["Cook chicken 6-7 min per side. Rest and slice.","Toss romaine with Caesar dressing and parmesan.","Top with chicken and croutons."], tip:"Homemade Caesar with mayo, lemon, garlic, worcestershire, parmesan is far better than store-bought." },
};

// ── Science citation badges by condition ──────────────────────────────────
const CONDITION_CITATIONS = {
  depression: { label:"📚 Nutritional Psychiatry · Harvard", detail:"Jacka et al. (2017) — Mediterranean-style diet reduced depression risk by 33%. Lancet Psychiatry." },
  anxiety: { label:"📚 NIH · Gut-Brain Axis", detail:"Clapp et al. (2017) — Diet quality directly modulates anxiety via the gut-brain axis. Nutrients Journal." },
  adhd: { label:"📚 JAMA · Omega-3 Research", detail:"Bloch & Qawasmi (2011) — Omega-3 supplementation significantly reduces ADHD symptom severity. JAMA." },
  bipolar: { label:"📚 Psychiatry Research · NAD+", detail:"Sarris et al. (2015) — Omega-3 and micronutrient-rich diets stabilise mood in bipolar disorder. Psychiatry Research." },
  ptsd: { label:"📚 Frontiers Psychiatry · Inflammation", detail:"Kiecolt-Glaser et al. (2015) — Anti-inflammatory diets reduce PTSD symptom severity. Frontiers in Psychiatry." },
  ocd: { label:"📚 J. Psychiatry · Microbiome", detail:"Turna et al. (2019) — Gut microbiome composition linked to OCD symptom severity. Journal of Psychiatry & Neuroscience." },
  schizophrenia: { label:"📚 Schizophrenia Bulletin · Diet", detail:"Dipasquale et al. (2013) — Mediterranean diet associated with lower symptom burden in schizophrenia. Schizophrenia Bulletin." },
  autism: { label:"📚 Nutrients · ASD & Diet", detail:"Ly et al. (2017) — Nutritional interventions improve behavioural outcomes in ASD. Nutrients Journal." },
  eating_disorder: { label:"📚 Int'l J. Eating Disorders", detail:"Setnick (2010) — Micronutrient deficiencies are pervasive in eating disorders and worsen symptoms. Int'l J. Eating Disorders." },
  default: { label:"📚 Nutritional Neuroscience", detail:"Gomez-Pinilla (2008) — Brain foods: effects of nutrients on brain function. Nature Reviews Neuroscience." },
};

const getCitation = (conditions) => {
  if (!conditions || conditions.length === 0) return CONDITION_CITATIONS.default;
  return CONDITION_CITATIONS[conditions[0]] || CONDITION_CITATIONS.default;
};
// Parses meal name to produce real recipes with exact ingredients & steps
// ── Brain Health Score ──────────────────────────────────────────────────────
// Scores meals 1-5 based on brain-boosting ingredient density
const BRAIN_NUTRIENTS = {
  // Omega-3 sources (highest brain impact)
  salmon: { score: 2, nutrient: "Omega-3" }, sardine: { score: 2, nutrient: "Omega-3" }, mackerel: { score: 2, nutrient: "Omega-3" },
  tuna: { score: 1.5, nutrient: "Omega-3" }, walnut: { score: 1.5, nutrient: "Omega-3" }, flax: { score: 1, nutrient: "Omega-3" },
  chia: { score: 1, nutrient: "Omega-3" },
  // Anti-inflammatory
  turmeric: { score: 2, nutrient: "Curcumin" }, ginger: { score: 1, nutrient: "Gingerol" },
  // Neurogenesis / BDNF
  blueberr: { score: 1.5, nutrient: "Anthocyanins" }, pomegranate: { score: 1.5, nutrient: "Punicalagins" },
  "dark chocolate": { score: 1, nutrient: "Flavanols" },
  // Gut-brain axis (fermented)
  kimchi: { score: 1.5, nutrient: "Probiotics" }, sauerkraut: { score: 1.5, nutrient: "Probiotics" }, miso: { score: 1.5, nutrient: "Probiotics" },
  kefir: { score: 1.5, nutrient: "Probiotics" }, tempeh: { score: 1.5, nutrient: "Probiotics" }, kombucha: { score: 1, nutrient: "Probiotics" },
  yogurt: { score: 0.5, nutrient: "Probiotics" },
  // Choline / acetylcholine
  egg: { score: 1, nutrient: "Choline" },
  // Leafy greens (folate, magnesium)
  spinach: { score: 1, nutrient: "Folate" }, kale: { score: 1, nutrient: "Folate" },
  // Mushrooms (nerve growth factor)
  "lion's mane": { score: 2, nutrient: "NGF Support" }, mushroom: { score: 0.5, nutrient: "Ergothioneine" },
  // Other brain nutrients
  avocado: { score: 0.5, nutrient: "Healthy Fats" }, "sweet potato": { score: 0.5, nutrient: "Vitamin A" },
  lentil: { score: 0.5, nutrient: "Iron & Folate" }, quinoa: { score: 0.5, nutrient: "Magnesium" },
  "pumpkin seed": { score: 0.5, nutrient: "Zinc" }, almond: { score: 0.5, nutrient: "Vitamin E" },
};

const getBrainScore = (mealName) => {
  const m = mealName.toLowerCase();
  let total = 0;
  const nutrients = [];
  for (const [keyword, info] of Object.entries(BRAIN_NUTRIENTS)) {
    if (m.includes(keyword)) {
      total += info.score;
      if (!nutrients.includes(info.nutrient)) nutrients.push(info.nutrient);
    }
  }
  // Clamp to 1-5 scale
  const score = Math.min(5, Math.max(1, Math.round(total > 0 ? Math.min(total + 1, 5) : 1)));
  return { score, nutrients: nutrients.slice(0, 3) }; // top 3 nutrients
};

// ── Gender-Specific Nutrition Notes ─────────────────────────────────────────
const GENDER_BENEFITS = {
  female: {
    salmon:      { short: "Omega-3s ease PMS & support mood during hormonal shifts", detail: "EPA & DHA in salmon modulate prostaglandins that drive menstrual cramps, while supporting serotonin synthesis — especially important during the luteal phase when estrogen and progesterone fluctuate." },
    sardine:     { short: "Omega-3s + calcium for bone density & cycle support", detail: "Sardines are one of the few foods rich in both omega-3s and bioavailable calcium — critical for women at higher osteoporosis risk. The vitamin D content also aids calcium absorption and mood regulation." },
    mackerel:    { short: "Omega-3s support hormonal balance & brain health", detail: "Mackerel's high DHA content supports neuronal membrane fluidity, which can decline during menopause. Its selenium also supports thyroid function — a common concern for women." },
    spinach:     { short: "Iron & folate — essential for menstruation & fertility", detail: "Women lose iron monthly through menstruation. Spinach provides non-heme iron plus folate, which is critical for DNA synthesis and especially important for women of childbearing age to prevent neural tube defects." },
    kale:        { short: "Calcium & vitamin K for bone strength", detail: "Women face 4x higher osteoporosis risk than men. Kale provides highly bioavailable calcium plus vitamin K, which directs calcium into bones rather than arteries." },
    lentil:      { short: "Iron & folate for energy & reproductive health", detail: "Lentils provide 6mg iron per cup — over a third of women's daily needs. Their folate supports healthy cell division and is essential during pregnancy. The fiber also helps regulate estrogen levels." },
    egg:         { short: "Choline supports brain health & fetal development", detail: "Only 10% of women meet choline requirements. Choline is essential for brain cell membranes and neurotransmitter synthesis, and during pregnancy it shapes the baby's brain architecture." },
    quinoa:      { short: "Magnesium eases cramps & supports sleep", detail: "Magnesium needs increase during the luteal phase. Quinoa's high magnesium content helps relax uterine muscles, reduce PMS symptoms, and support the deeper sleep that hormonal shifts can disrupt." },
    "sweet potato": { short: "Vitamin A supports hormonal balance", detail: "Beta-carotene in sweet potatoes converts to vitamin A, which is essential for progesterone production. Adequate progesterone supports regular cycles, mood stability, and luteal phase health." },
    turmeric:    { short: "Anti-inflammatory — eases period pain & bloating", detail: "Curcumin inhibits COX-2 enzymes (the same target as ibuprofen), reducing prostaglandin-driven cramps. It also reduces the systemic inflammation that can worsen PMS, endometriosis, and PCOS symptoms." },
    yogurt:      { short: "Probiotics & calcium for gut-hormone balance", detail: "The gut microbiome contains the estrobolome — bacteria that metabolize estrogen. Probiotic-rich yogurt supports this system while providing calcium that women need 1.5x more of than men after menopause." },
    kefir:       { short: "Probiotics support estrogen metabolism & mood", detail: "Kefir contains 30+ probiotic strains that support the estrobolome — the gut bacteria that regulate circulating estrogen levels. Balanced estrogen metabolism reduces PMS, bloating, and mood swings." },
    kimchi:      { short: "Fermented probiotics support hormonal detox", detail: "Kimchi's lactobacillus bacteria support the liver's estrogen detoxification pathways. This helps prevent estrogen dominance — a driver of PMS, heavy periods, and mood imbalances." },
    sauerkraut:  { short: "Gut health supports hormone clearance", detail: "Sauerkraut's probiotics enhance beta-glucuronidase regulation, ensuring used estrogen is properly eliminated rather than reabsorbed. This supports cycle regularity and reduces hormonal symptoms." },
    tempeh:      { short: "Phytoestrogens for gentle hormonal support", detail: "Tempeh's isoflavones are phytoestrogens that can modulate estrogen receptors — providing gentle support during low-estrogen phases (menstruation, perimenopause) without overstimulating during high-estrogen phases." },
    miso:        { short: "Fermented soy supports menopause transition", detail: "Miso's isoflavones and probiotics work synergistically — the fermentation increases isoflavone bioavailability. Studies show regular miso intake reduces hot flash frequency and supports bone density in perimenopausal women." },
    blueberr:    { short: "Anthocyanins protect against cognitive decline", detail: "Women face higher Alzheimer's risk than men, partly due to estrogen decline. Blueberry anthocyanins cross the blood-brain barrier and protect neurons, while their antioxidants combat the oxidative stress that increases post-menopause." },
    walnut:      { short: "Omega-3s & magnesium for PMS relief", detail: "Walnuts provide ALA omega-3s plus magnesium — both shown to reduce PMS severity. Their melatonin content also supports the sleep disruptions common during the luteal phase." },
    avocado:     { short: "Healthy fats support hormone production", detail: "Hormones are built from cholesterol and fatty acids. Avocado's monounsaturated fats provide the raw materials for estrogen, progesterone, and cortisol synthesis, while potassium helps reduce water retention." },
    almond:      { short: "Vitamin E eases PMS & supports skin health", detail: "Vitamin E has been shown to reduce PMS symptoms by 70% in clinical trials. Almonds are one of the richest sources, and also provide the magnesium and healthy fats that support hormonal skin health." },
    "dark chocolate": { short: "Magnesium & iron for cycle support", detail: "Dark chocolate provides magnesium (cramp relief), iron (replenishing menstrual losses), and phenylethylamine (mood boost). The flavanols also improve blood flow, countering the circulation changes during menstruation." },
    "pumpkin seed": { short: "Zinc & magnesium for cycle regularity", detail: "Pumpkin seeds are a seed-cycling staple — their zinc supports progesterone production in the luteal phase, while magnesium helps metabolize estrogen. Together they promote cycle regularity and reduce PMS." },
    chickpea:    { short: "Iron & B6 for energy & mood during cycles", detail: "Chickpeas provide iron to offset menstrual losses, plus vitamin B6 which helps synthesize serotonin and dopamine — neurotransmitters that dip during the premenstrual phase, contributing to mood changes." },
    broccoli:    { short: "DIM compound supports estrogen balance", detail: "Broccoli contains DIM (diindolylmethane), which helps the liver metabolize estrogen through favorable pathways. This supports hormonal balance and may reduce risk of estrogen-dominant conditions." },
    "brown rice": { short: "B vitamins & fiber for hormonal balance", detail: "Brown rice provides B vitamins needed for liver detoxification of hormones, plus fiber that binds to used estrogen in the gut for elimination — preventing reabsorption and estrogen dominance." },
    ginger:      { short: "Eases nausea & menstrual pain naturally", detail: "Ginger is as effective as ibuprofen for menstrual pain in clinical trials. It inhibits prostaglandin synthesis and also eases the nausea that some women experience during menstruation or early pregnancy." },
    "lion's mane": { short: "NGF support protects against hormonal brain fog", detail: "Lion's mane stimulates nerve growth factor (NGF) production, which can counteract the cognitive fog that many women experience during hormonal transitions — from PMS to perimenopause." },
    chicken:     { short: "Lean protein stabilizes blood sugar & mood", detail: "Stable blood sugar is essential for hormonal balance — insulin spikes increase androgen production and disrupt estrogen/progesterone ratios. Chicken's B6 also supports serotonin synthesis, which dips during the premenstrual phase." },
    turkey:      { short: "Tryptophan supports serotonin & sleep quality", detail: "Turkey is rich in tryptophan — the precursor to serotonin and melatonin. Women produce less serotonin than men, making dietary tryptophan especially important for mood stability and the sleep disruptions common during hormonal shifts." },
    beef:        { short: "Iron & B12 replenish menstrual losses", detail: "Women lose 1-2mg of iron per period. Beef provides the most bioavailable heme iron plus B12 — both critical for energy, cognitive function, and preventing the anemia that affects 1 in 5 women of reproductive age." },
    steak:       { short: "Heme iron & zinc for energy & immune health", detail: "Steak provides highly absorbable heme iron to offset menstrual losses, plus zinc that supports immune function and progesterone production in the luteal phase." },
    banana:      { short: "B6 & magnesium ease PMS symptoms", detail: "Bananas provide vitamin B6 (shown to reduce PMS severity by 70% in studies) and magnesium that relaxes smooth muscle — easing cramps, bloating, and the mood changes driven by progesterone withdrawal." },
    berry:       { short: "Antioxidants protect against hormonal oxidative stress", detail: "Hormonal fluctuations increase oxidative stress. Berries' anthocyanins and vitamin C neutralize free radicals while supporting collagen synthesis — important as estrogen decline during perimenopause reduces natural collagen production." },
    rice:        { short: "Steady energy supports hormonal balance", detail: "Complex carbohydrates are essential for serotonin production via tryptophan transport across the blood-brain barrier. Women in the luteal phase have increased carb cravings because the brain needs more serotonin precursors." },
    oat:         { short: "Beta-glucan fiber supports estrogen metabolism", detail: "Oats' soluble fiber binds to excess estrogen in the gut, preventing reabsorption. This supports healthy estrogen levels and reduces symptoms of estrogen dominance like bloating, heavy periods, and mood swings." },
    tomato:      { short: "Lycopene & vitamin C support skin & collagen", detail: "Tomatoes provide lycopene (a powerful antioxidant) and vitamin C — essential for collagen synthesis that declines with estrogen loss. Their folate also supports reproductive health and mood regulation." },
    peanut:      { short: "Protein & healthy fats for sustained energy", detail: "Peanuts provide niacin (B3) which supports energy metabolism that fluctuates with the menstrual cycle. Their monounsaturated fats provide building blocks for hormone production." },
    tofu:        { short: "Phytoestrogens provide gentle hormonal support", detail: "Tofu's isoflavones can modulate estrogen receptors — offering mild support during low-estrogen phases like menstruation and perimenopause, without overstimulating during high-estrogen phases. Also provides calcium for bone health." },
  },
  male: {
    salmon:      { short: "Omega-3s support testosterone & reduce inflammation", detail: "DHA in salmon maintains Leydig cell membrane fluidity — these cells produce testosterone. Omega-3s also reduce chronic inflammation that suppresses the HPG axis (hypothalamic-pituitary-gonadal), your testosterone production pathway." },
    sardine:     { short: "Omega-3s & zinc fuel testosterone synthesis", detail: "Sardines provide omega-3s, zinc, and vitamin D — three nutrients directly involved in testosterone production. Zinc inhibits aromatase, the enzyme that converts testosterone to estrogen." },
    mackerel:    { short: "High DHA supports brain & cardiovascular health", detail: "Men face higher cardiovascular risk. Mackerel's exceptionally high DHA content reduces triglycerides and arterial inflammation, while supporting the brain health needed for sustained cognitive performance." },
    egg:         { short: "Cholesterol & choline fuel testosterone + brain", detail: "Testosterone is synthesized from cholesterol — eggs provide the building blocks. Their choline supports acetylcholine, the neurotransmitter behind focus, memory, and muscle contraction." },
    spinach:     { short: "Magnesium & nitrates boost T and blood flow", detail: "Spinach's magnesium increases free testosterone by reducing SHBG (sex hormone-binding globulin). Its nitrates convert to nitric oxide, improving blood flow, exercise performance, and cardiovascular function." },
    lentil:      { short: "Zinc & protein for muscle recovery & T support", detail: "Lentils provide zinc (essential for testosterone synthesis and sperm health) plus plant protein and fiber. Their low glycemic impact helps maintain insulin sensitivity — insulin resistance tanks testosterone." },
    quinoa:      { short: "Complete protein with magnesium for T support", detail: "Quinoa provides all essential amino acids for muscle synthesis, plus magnesium that binds to SHBG — freeing up more bioavailable testosterone. Its saponins may also have mild anabolic properties." },
    "sweet potato": { short: "Complex carbs support testosterone production", detail: "Adequate carbohydrate intake is essential for testosterone — low-carb diets increase cortisol, which directly suppresses T. Sweet potatoes provide sustained energy without the insulin spikes that impair hormonal signaling." },
    turmeric:    { short: "Reduces inflammation that suppresses testosterone", detail: "Chronic inflammation is the #1 lifestyle testosterone killer in men. Curcumin reduces IL-6 and TNF-alpha — inflammatory cytokines that directly inhibit Leydig cell testosterone production." },
    broccoli:    { short: "DIM helps metabolize excess estrogen", detail: "Broccoli's DIM (diindolylmethane) supports the liver's conversion of estrogen to less active metabolites. This is critical for men — excess estrogen (from body fat, plastics, alcohol) suppresses testosterone and promotes gynecomastia." },
    walnut:      { short: "Arginine boosts nitric oxide & circulation", detail: "Walnuts are rich in L-arginine, the precursor to nitric oxide — which dilates blood vessels. This supports cardiovascular health, exercise performance, and the circulation that men's sexual health depends on." },
    avocado:     { short: "Healthy fats are building blocks for testosterone", detail: "Testosterone is a steroid hormone built from cholesterol. Avocado's monounsaturated fats support healthy cholesterol levels for T production, while potassium helps lower blood pressure — a leading men's health concern." },
    "pumpkin seed": { short: "Zinc supports prostate health & T levels", detail: "The prostate contains the highest zinc concentration of any organ. Pumpkin seeds' zinc supports prostate health, testosterone production, and sperm quality — while magnesium further boosts free T levels." },
    almond:      { short: "Vitamin E protects sperm & supports circulation", detail: "Vitamin E is a powerful antioxidant that protects sperm from oxidative damage — a leading cause of male infertility. Almonds also provide arginine for nitric oxide production and heart health." },
    "dark chocolate": { short: "Flavanols improve blood flow & mood", detail: "Dark chocolate's flavanols boost nitric oxide production by 30%+, improving circulation throughout the body. The theobromine provides clean energy, while phenylethylamine enhances mood and motivation." },
    yogurt:      { short: "Probiotics support testosterone & gut health", detail: "MIT research showed probiotic-fed males had larger testes and higher testosterone. A healthy gut microbiome improves nutrient absorption — especially zinc and magnesium that are critical for T production." },
    kefir:       { short: "Probiotics enhance nutrient absorption for T", detail: "Kefir's diverse probiotic strains improve gut permeability and nutrient absorption. Better zinc, magnesium, and vitamin D uptake directly supports the testosterone production pathway." },
    kimchi:      { short: "Gut health supports testosterone metabolism", detail: "A healthy gut microbiome regulates the enzymes that metabolize testosterone. Kimchi's probiotics also reduce systemic inflammation — one of the most common causes of low T in men." },
    tempeh:      { short: "Complete plant protein for muscle & recovery", detail: "Fermented soy in tempeh has negligible estrogenic effect in men (confirmed by meta-analyses). It provides complete protein, probiotics, and isoflavones that actually support cardiovascular health." },
    blueberr:    { short: "Anthocyanins protect cardiovascular & brain health", detail: "Men face cardiovascular disease a decade earlier than women. Blueberry anthocyanins improve endothelial function, reduce arterial stiffness, and protect against the cognitive decline that affects men's brain health." },
    chickpea:    { short: "Zinc & B6 support testosterone synthesis", detail: "Chickpeas provide zinc for testosterone production and B6 for neurotransmitter synthesis. Their fiber supports the gut health that underlies proper hormone metabolism." },
    "brown rice": { short: "Sustained energy without insulin spikes", detail: "Brown rice provides steady glucose for training and recovery without the insulin spikes that increase cortisol and suppress testosterone. Its manganese also supports bone health and metabolism." },
    ginger:      { short: "Shown in studies to boost testosterone 17%", detail: "A systematic review found ginger supplementation increased testosterone by 17.7% in men. It works by enhancing LH production, reducing oxidative stress in the testes, and increasing cholesterol delivery to Leydig cells." },
    "lion's mane": { short: "NGF support for focus, memory & nerve health", detail: "Lion's mane stimulates nerve growth factor production — supporting cognitive performance, focus, and the nerve health that declines with age. It also reduces neuroinflammation linked to brain fog and poor concentration." },
    miso:        { short: "Fermented soy supports gut & heart health", detail: "Miso's probiotic content supports the gut-testosterone axis, while its isoflavones (in fermented form) support cardiovascular health — the #1 cause of death in men. Fermentation eliminates any estrogenic concern." },
    sauerkraut:  { short: "Probiotics support T production pathway", detail: "Sauerkraut's lactobacillus bacteria support the gut health that underlies proper hormone metabolism. A healthy gut ensures optimal absorption of zinc, magnesium, and vitamin D — all critical for testosterone." },
    chicken:     { short: "Lean protein fuels muscle synthesis & T support", detail: "Chicken provides complete protein with all essential amino acids for muscle protein synthesis. Adequate protein intake maintains lean mass, which is metabolically active tissue that supports healthy testosterone levels." },
    turkey:      { short: "Tryptophan supports recovery & growth hormone", detail: "Turkey's tryptophan converts to serotonin and then melatonin — essential for the deep sleep during which 70% of daily growth hormone is released. GH supports muscle recovery, fat metabolism, and overall vitality." },
    beef:        { short: "Creatine, zinc & B12 for strength & T levels", detail: "Beef is nature's richest source of creatine (boosts strength 5-10%), plus zinc for testosterone and B12 for red blood cell production. Its saturated fat in moderate amounts is actually needed for steroid hormone synthesis." },
    steak:       { short: "High-quality protein with zinc & creatine for T", detail: "Steak provides the cholesterol building blocks for testosterone, zinc to inhibit aromatase, creatine for strength, and complete amino acids for muscle recovery. Red meat 2-3x per week supports optimal male hormonal health." },
    banana:      { short: "Potassium & B6 support energy & T production", detail: "Bananas provide potassium for muscle contraction and heart health, plus B6 — a coenzyme in testosterone synthesis. Their bromelain enzyme may also support testosterone levels and reduce inflammation after training." },
    berry:       { short: "Antioxidants protect cardiovascular & brain health", detail: "Men face cardiovascular disease a decade earlier than women. Berry anthocyanins improve endothelial function, reduce arterial stiffness, and protect against oxidative damage to sperm — a leading cause of male infertility." },
    rice:        { short: "Clean carbs fuel training & support T levels", detail: "Adequate carbohydrate intake is essential for testosterone — low-carb diets elevate cortisol, which directly suppresses T. Rice provides clean, easily digestible energy for training without gut irritation." },
    oat:         { short: "Beta-glucan supports heart health & sustained energy", detail: "Oats' beta-glucan fiber reduces LDL cholesterol — critical since heart disease is the #1 killer of men. Their slow-release energy stabilizes blood sugar, preventing the cortisol spikes that suppress testosterone production." },
    tomato:      { short: "Lycopene supports prostate & heart health", detail: "Tomatoes are the richest source of lycopene — shown to reduce prostate cancer risk by 20%+ in large studies. Lycopene also reduces LDL oxidation, protecting against the cardiovascular disease that disproportionately affects men." },
    peanut:      { short: "Arginine & protein for muscle & circulation", detail: "Peanuts provide L-arginine (nitric oxide precursor for circulation), complete protein for muscle recovery, and niacin for energy metabolism. Their resveratrol also supports cardiovascular health." },
    tofu:        { short: "Plant protein with no estrogenic effect in men", detail: "Meta-analyses confirm soy does not affect testosterone or estrogen in men at normal dietary intake. Tofu provides complete protein, isoflavones that support heart health, and calcium for bone density." },
  },
};

const getCyclePhase = (lastPeriod, length, targetDate) => {
  if (!lastPeriod) return null;
  const start = new Date(lastPeriod);
  const today = targetDate ? new Date(targetDate) : new Date();
  const diffDays = Math.floor((today - start) / (1000 * 60 * 60 * 24));
  const dayInCycle = ((diffDays % length) + length) % length + 1;
  if (dayInCycle <= 5) return { phase: "menstrual", day: dayInCycle, label: "Menstrual Phase", emoji: "🌑", desc: "Days 1-5 — Focus on iron-rich, warming, anti-inflammatory foods" };
  if (dayInCycle <= Math.floor(length * 0.46)) return { phase: "follicular", day: dayInCycle, label: "Follicular Phase", emoji: "🌒", desc: "Rising estrogen — Light, fresh foods & fermented foods support energy" };
  if (dayInCycle <= Math.floor(length * 0.57)) return { phase: "ovulatory", day: dayInCycle, label: "Ovulatory Phase", emoji: "🌕", desc: "Peak estrogen — Antioxidants & fiber help with estrogen clearance" };
  return { phase: "luteal", day: dayInCycle, label: "Luteal Phase", emoji: "🌘", desc: "Rising progesterone — Magnesium, B6 & complex carbs ease PMS" };
};

const CYCLE_BENEFITS = {
  menstrual: {
    salmon:      "Omega-3s reduce prostaglandins that cause cramps — like natural ibuprofen",
    sardine:     "Iron + omega-3s replenish what you're losing & ease inflammation",
    spinach:     "Iron & folate replenish menstrual losses — pair with vitamin C for absorption",
    kale:        "Iron & vitamin K support blood health during your period",
    lentil:      "Plant-based iron + warming comfort — perfect for menstrual fatigue",
    egg:         "Easy-to-digest protein + choline support energy without taxing digestion",
    beef:        "Heme iron is most absorbable — critical during your heaviest days",
    steak:       "Richest source of heme iron — directly replenishes menstrual losses",
    turmeric:    "Curcumin inhibits COX-2 enzymes — easing cramps as effectively as ibuprofen",
    ginger:      "Shown in studies to reduce period pain — as effective as meds in research",
    "dark chocolate": "Magnesium relaxes uterine muscles + iron replenishes losses",
    quinoa:      "Iron + magnesium — the two minerals you need most during menstruation",
    "sweet potato": "Warming, comforting complex carbs stabilize mood during hormone withdrawal",
    chicken:     "Gentle protein supports energy without heavy digestion during your period",
    turkey:      "Tryptophan boosts serotonin — countering the mood dip from hormone withdrawal",
    banana:      "B6 + magnesium ease cramps and the mood changes of days 1-5",
    rice:        "Gentle carbs support serotonin when estrogen & progesterone are at their lowest",
    oat:         "Warming, iron-rich comfort food — soluble fiber also eases bloating",
    berry:       "Vitamin C boosts iron absorption — pair with iron-rich foods this phase",
    avocado:     "Anti-inflammatory fats ease period pain + potassium reduces bloating",
    yogurt:      "Probiotics ease the digestive changes common during menstruation",
    kimchi:      "Probiotics support the gut disruption that often accompanies your period",
    _fallback:   "Nourishing, warming foods help your body recover during menstruation",
  },
  follicular: {
    salmon:      "Omega-3s support the rising estrogen that's boosting your energy & mood",
    sardine:     "Light protein + omega-3s match your naturally increasing energy this phase",
    spinach:     "Folate supports the cell growth happening as your body rebuilds",
    kale:        "Light greens match the fresh, energetic vibe of your follicular phase",
    lentil:      "Plant protein fuels your naturally higher energy & motivation right now",
    egg:         "Choline supports the cognitive boost you get from rising estrogen",
    turmeric:    "Anti-inflammatory support as your body rebuilds the uterine lining",
    chicken:     "Lean protein fuels the natural energy surge of rising estrogen",
    turkey:      "Light protein supports the increased physical energy of this phase",
    tempeh:      "Fermented soy supports gut health — your microbiome shifts with estrogen",
    kimchi:      "Probiotics support the gut microbiome changes that follow menstruation",
    kefir:       "Probiotic diversity supports estrogen metabolism as levels rise",
    quinoa:      "Complete protein + B vitamins fuel the energy surge of this phase",
    avocado:     "Healthy fats provide building blocks as estrogen production ramps up",
    berry:       "Antioxidants support the cell regeneration happening this phase",
    banana:      "Quick energy matches your naturally higher metabolism right now",
    rice:        "Clean energy to fuel the workouts your body is primed for this phase",
    oat:         "Sustained energy for the higher activity level your body craves now",
    "sweet potato": "Complex carbs fuel the natural energy peak of your follicular phase",
    beef:        "Protein & iron support the rebuilding happening after menstruation",
    _fallback:   "Your body is rebuilding — light, nutrient-dense foods fuel this phase",
  },
  ovulatory: {
    salmon:      "Omega-3s support brain function at its peak — estrogen is highest now",
    spinach:     "Fiber helps clear the estrogen surplus your body produces at ovulation",
    kale:        "Cruciferous compounds support estrogen detox during your hormonal peak",
    broccoli:    "DIM in broccoli helps metabolize the estrogen surge at ovulation",
    lentil:      "Fiber binds to excess estrogen for elimination — important at your peak",
    egg:         "Choline supports the peak cognitive function you have during ovulation",
    quinoa:      "Fiber + magnesium support estrogen clearance and energy balance",
    turmeric:    "Anti-inflammatory support during your highest-energy phase",
    chicken:     "Lean protein sustains the peak energy & social drive of ovulation",
    turkey:      "Light protein matches the naturally lighter appetite of this phase",
    avocado:     "Fiber + healthy fats support estrogen metabolism at its peak",
    berry:       "Antioxidants protect cells during peak metabolic activity",
    kimchi:      "Probiotics support the estrobolome — critical for clearing peak estrogen",
    tempeh:      "Fiber + probiotics help metabolize the estrogen surge",
    yogurt:      "Probiotics support estrogen clearance through the gut",
    banana:      "Quick fuel for the naturally higher energy & exercise performance now",
    rice:        "Light energy — your body is efficient and doesn't need heavy carbs now",
    _fallback:   "Focus on fiber & antioxidants to support estrogen clearance at ovulation",
  },
  luteal: {
    salmon:      "Omega-3s ease the inflammation that drives PMS as progesterone rises",
    sardine:     "Omega-3s + calcium calm the nervous system as PMS symptoms emerge",
    spinach:     "Magnesium eases the cramps & mood changes of the luteal phase",
    egg:         "Choline supports mood as serotonin dips in the premenstrual window",
    quinoa:      "Magnesium + complex carbs — exactly what your brain craves before your period",
    "sweet potato": "Complex carbs boost serotonin — your brain needs more before your period",
    turmeric:    "Anti-inflammatory curcumin eases the PMS inflammation building now",
    "dark chocolate": "Magnesium + mood-boosting compounds — nature's PMS remedy",
    banana:      "B6 + magnesium directly reduce PMS severity — supported by research",
    walnut:      "Omega-3s + magnesium ease the anxiety & sleep issues of late luteal",
    avocado:     "Healthy fats + potassium reduce the bloating & water retention of PMS",
    chicken:     "Protein stabilizes the blood sugar swings that worsen PMS mood changes",
    turkey:      "Tryptophan boosts serotonin — which drops 25% in the premenstrual phase",
    beef:        "Iron & B12 support energy as progesterone's sedating effect increases",
    rice:        "Complex carbs help tryptophan cross the blood-brain barrier for serotonin",
    oat:         "Warming comfort + magnesium ease the anxiety of the premenstrual window",
    yogurt:      "Calcium reduces PMS symptoms by 50% in studies — yogurt delivers it gently",
    kefir:       "Probiotics + calcium — eases the digestive & mood shifts of late luteal",
    kimchi:      "Gut health support as progesterone slows digestion in the luteal phase",
    ginger:      "Eases the nausea & bloating that build toward the end of your cycle",
    lentil:      "Magnesium + iron prep your body for the upcoming menstrual phase",
    berry:       "Antioxidants combat the increased oxidative stress of the premenstrual phase",
    almond:      "Vitamin E reduces PMS by 70% in studies — snack on these before your period",
    "pumpkin seed": "Zinc + magnesium — the seed-cycling staple for luteal phase support",
    _fallback:   "Complex carbs & magnesium-rich foods ease PMS as your period approaches",
  },
};

// cycleSync, lastPeriod, cycleLen are passed from component state
const getGenderNote = (mealName, gender, cycleSync, lastPeriod, cycleLen, targetDate) => {
  if (!gender || !mealName) return null;
  // Women who skipped cycle sync — no hormone notes
  if (gender === "female" && !cycleSync) return null;
  // Women with cycle sync — phase-specific notes
  if (gender === "female" && cycleSync) {
    const phase = getCyclePhase(lastPeriod, cycleLen, targetDate);
    if (!phase) return null;
    const phaseNotes = CYCLE_BENEFITS[phase.phase];
    if (!phaseNotes) return null;
    const m = mealName.toLowerCase();
    const sorted = Object.entries(phaseNotes).filter(([k]) => k !== "_fallback").sort((a,b) => b[0].length - a[0].length);
    let note = null;
    for (const [keyword, text] of sorted) {
      if (m.includes(keyword)) { note = text; break; }
    }
    if (!note) note = phaseNotes._fallback;
    return { short: note, detail: null, phase };
  }
  // Male — standard notes
  if (gender === "male") {
    const benefits = GENDER_BENEFITS.male;
    const m = mealName.toLowerCase();
    const sorted = Object.entries(benefits).sort((a,b) => b[0].length - a[0].length);
    for (const [keyword, info] of sorted) {
      if (m.includes(keyword)) return { ...info, phase: null };
    }
    return { short: "Balanced nutrition supports testosterone & recovery", detail: "Consistent protein and micronutrient intake maintains the anabolic environment your body needs for testosterone production. Balanced meals also stabilize cortisol — the hormone that directly suppresses T when elevated.", phase: null };
  }
  return null;
};

const generateRecipe = (meal) => {
  const m = meal.toLowerCase();
  const name = meal;

  // ── Helpers ──────────────────────────────────────────────────────────────
  const hasAny = (...words) => words.some(w => m.includes(w));
  const has = (w) => m.includes(w);

  // ── Extract protein ───────────────────────────────────────────────────────
  let protein = null;
  let proteinIngredient = "";
  let proteinSteps = [];
  let proteinTime = 0;
  if (hasAny("brisket")) { protein="brisket"; proteinIngredient="8 oz slow-cooked brisket, sliced"; proteinSteps=["Slice brisket against the grain into ¼-inch pieces.","Heat in a skillet over medium heat with 2 tbsp of the braising liquid, 3–4 minutes until warmed through."]; proteinTime=10; }
  else if (hasAny("bacon")) { protein="bacon"; proteinIngredient="4 strips thick-cut bacon"; proteinSteps=["Lay bacon strips in a cold skillet, then heat to medium.","Cook 4–5 minutes per side until crispy. Drain on paper towels."]; proteinTime=12; }
  else if (hasAny("sausage")) { protein="sausage"; proteinIngredient=has("chicken sausage")?"2 chicken sausage links":"2 pork sausage links"; proteinSteps=["Heat a skillet over medium heat with 1 tsp oil.","Cook sausage 4–5 minutes per side until golden brown and cooked through (165°F internal)."]; proteinTime=12; }
  else if (hasAny("salmon")) { protein="salmon"; proteinIngredient="6 oz wild-caught salmon fillet, skin-on"; proteinSteps=["Pat salmon dry. Season flesh side with salt, pepper, and garlic powder.","Heat 1 tbsp oil in oven-safe skillet over medium-high. Sear skin-side down 4 minutes without moving.","Flip and cook 2–3 more minutes until salmon flakes easily at the thickest part.","Squeeze fresh lemon over before serving."]; proteinTime=15; }
  else if (hasAny("tuna")) { protein="tuna"; proteinIngredient="5 oz canned wild tuna in water, drained"; proteinSteps=["Drain tuna thoroughly and flake into a bowl.","Season with lemon juice, salt, and pepper."]; proteinTime=2; }
  else if (hasAny("shrimp")) { protein="shrimp"; proteinIngredient="6 oz large shrimp, peeled and deveined"; proteinSteps=["Pat shrimp dry. Season with salt, pepper, garlic powder, and paprika.","Heat 1 tbsp oil in pan over medium-high. Cook shrimp 2 minutes per side — they're done when pink and curled."]; proteinTime=8; }
  else if (hasAny("steak","sirloin","ribeye","brisket")) { protein="steak"; proteinIngredient="6–8 oz sirloin steak, at room temperature"; proteinSteps=["Remove steak from fridge 20 minutes before cooking. Season generously with salt and pepper on both sides.","Heat skillet over high heat until smoking. Add 1 tsp oil and 1 tbsp butter.","Sear steak 3–4 minutes per side for medium-rare (135°F), 4–5 for medium (145°F).","Rest steak on a cutting board 5–7 minutes before slicing against the grain."]; proteinTime=20; }
  else if (hasAny("ground beef","beef meatloaf","meatloaf")) { protein="ground beef"; proteinIngredient="5 oz lean ground beef (90/10)"; proteinSteps=["Season ground beef with salt, pepper, garlic powder, and Worcestershire sauce.","Heat skillet over medium-high. Cook beef, breaking into small pieces, 7–8 minutes until browned. Drain excess fat."]; proteinTime=12; }
  else if (hasAny("ground turkey","turkey meatball")) { protein="ground turkey"; proteinIngredient="5 oz lean ground turkey"; proteinSteps=["Season ground turkey with salt, pepper, garlic powder, Italian herbs.","Cook in a skillet over medium heat, breaking apart, 8–9 minutes until cooked through (165°F)."]; proteinTime=12; }
  else if (has("turkey burger")) { protein="turkey burger"; proteinIngredient="5 oz lean ground turkey"; proteinSteps=["Mix ground turkey with salt, pepper, garlic powder, and a dash of Worcestershire sauce.","Form into a patty about ¾ inch thick. Press a slight indent in the center to prevent puffing.","Cook in an oiled skillet over medium-high heat, 5–6 minutes per side until internal temp reaches 165°F.","Rest 2 minutes before serving on a bun or alongside your sides."]; proteinTime=15; }
  else if (hasAny("turkey")) { protein="turkey"; proteinIngredient="5 oz turkey breast or turkey cutlet"; proteinSteps=["Season turkey with olive oil, salt, pepper, garlic powder.","Cook in a skillet over medium heat 5–6 minutes per side until internal temp reaches 165°F.","Rest 3 minutes before slicing."]; proteinTime=15; }
  else if (hasAny("pork chop","pork tenderloin","pork loin","pulled pork")) { protein="pork"; proteinIngredient=has("chop")?"1 bone-in pork chop (1 inch thick)":"5 oz pork tenderloin"; proteinSteps=["Season pork with salt, pepper, garlic powder, and a pinch of paprika.","Heat 1 tbsp oil in skillet over medium-high. Sear 4–5 minutes per side until golden brown.","Internal temperature should reach 145°F. Rest 3 minutes before serving."]; proteinTime=15; }
  else if (hasAny("lentil")) { protein="lentil"; proteinIngredient="½ cup red or green lentils, rinsed"; proteinSteps=["Combine lentils with 1½ cups water or broth in a saucepan.","Bring to boil, reduce to simmer, cook 20–25 minutes until tender. Season well."]; proteinTime=25; }
  else if (hasAny("chickpea","hummus")) { protein="chickpea"; proteinIngredient="1 can (15 oz) chickpeas, drained and rinsed"; proteinSteps=["Drain and rinse chickpeas. Pat dry if roasting.","For warm dishes: heat in a pan with oil and spices 3–4 minutes until lightly crisped."]; proteinTime=5; }
  else if (has("sardine")) { protein="sardine"; proteinIngredient="1 can (4 oz) sardines, drained"; proteinSteps=["Drain sardines and gently pat dry.","If serving warm, heat 1 tsp olive oil in a skillet and sear sardines 1–2 minutes per side until lightly crisped."]; proteinTime=5; }
  else if (has("mackerel")) { protein="mackerel"; proteinIngredient="1 mackerel fillet (5–6 oz)"; proteinSteps=["Pat mackerel fillet dry. Season with salt, pepper, and lemon zest.","Heat 1 tbsp oil in a skillet over medium-high. Cook skin-side down 4 minutes until crispy.","Flip and cook 2–3 more minutes until flesh is opaque and flakes easily."]; proteinTime=10; }
  else if (has("lean beef") || (has("beef") && !hasAny("ground beef","meatloaf","steak","sirloin","ribeye"))) { protein="beef"; proteinIngredient="5 oz lean beef (flank steak or sirloin), thinly sliced"; proteinSteps=["Slice beef thinly against the grain. Season with salt, pepper, and garlic powder.","Heat 1 tbsp oil in a wok or skillet over high heat.","Sear beef in batches 1–2 minutes per side until browned. Don't overcrowd the pan."]; proteinTime=10; }
  else if (hasAny("tofu","tempeh")) { protein="tofu"; proteinIngredient="6 oz extra-firm tofu, pressed and cubed"; proteinSteps=["Press tofu between paper towels for 10 minutes.","Cut into 1-inch cubes. Season with soy sauce, garlic, and oil.","Pan-fry over medium-high heat 3–4 minutes per side until golden and crispy."]; proteinTime=20; }
  else if (hasAny("egg")) { protein="egg"; proteinIngredient="3 large eggs"; proteinSteps=["Crack eggs into a bowl. Season with salt and pepper and whisk until uniform.","Heat butter in non-stick pan over medium-low.","Cook slowly, stirring constantly with a spatula for creamy scrambled eggs, or cook undisturbed for fried eggs."]; proteinTime=7; }
  else if (hasAny("chicken")) { protein="chicken"; proteinIngredient=hasAny("thigh","thighs")?"2 bone-in chicken thighs":"1 boneless skinless chicken breast (6 oz)"; proteinSteps=["Pat chicken dry with paper towels — moisture is the enemy of browning.","Season generously with salt, pepper, and garlic powder on all sides.","Heat 1 tbsp olive oil in a skillet over medium-high.","Cook breast: 6–7 minutes per side until golden (165°F). Cook thighs: 7–8 minutes per side.","Rest 5 minutes before slicing or serving."]; proteinTime=20; }
  else { protein="protein"; proteinIngredient="5–6 oz lean protein of choice"; proteinSteps=["Season protein with salt, pepper, and garlic powder.","Cook to safe internal temperature (165°F poultry, 145°F fish/pork, 145°F medium beef)."]; proteinTime=20; }

  // ── Detect cooking method / dish type ────────────────────────────────────
  const isBurrito = has("burrito") && !has("burrito bowl");
  const isTaco = hasAny("taco");
  const isWrap = hasAny("wrap");
  const isSandwich = hasAny("sandwich","sub","hoagie","blt","club","burger","cheeseburger");
  const isSalad = has("salad") && !has("caesar") && !has("fruit salad");
  const isCaesar = has("caesar");
  const isBowl = has("bowl");
  const isSoup = hasAny("soup","chili","stew","chowder");
  const isPasta = hasAny("pasta","noodle","spaghetti");
  const isOmelette = hasAny("omelette","omelet");
  const isOatmeal = hasAny("oatmeal","oats","overnight oat") || (has("porridge") && !has("rice") && !has("quinoa") && !has("millet"));
  const isSmoothi = hasAny("smoothie");
  const isYogurt = hasAny("yogurt","yoghurt");
  const isToast = hasAny("toast") && !hasAny("french toast");
  const isFrenchToast = has("french toast");
  const isPancake = hasAny("pancake","waffle");
  const isFajita = has("fajita");
  const isEnchilada = has("enchilada");
  const isQuesadilla = has("quesadilla");
  const isStirFry = hasAny("stir-fry","stir fry");
  const isCurry = has("curry");
  const isCasserole = has("casserole");
  const isHash = has("hash");
  const isTeriyaki = has("teriyaki");
  const isGlazed = hasAny("glaze","glazed");
  const isSheetPan = hasAny("sheet pan");
  const isStuffed = has("stuffed");
  const isBolognese = has("bolognese");

  // ── Detect key sides / vegetables ─────────────────────────────────────────
  const hasRice = hasAny("rice","rice bowl","fried rice") && !has("rice pasta");
  const hasQuinoa = has("quinoa");
  const hasSweet = has("sweet potato");
  const hasPotato = has("potato") && !has("sweet potato");
  const hasBroccoli = has("broccoli");
  const hasAsparagus = has("asparagus");
  const hasSpinach = has("spinach");
  const hasAvocado = has("avocado");
  const hasBeans = hasAny("black bean","white bean","bean");
  const hasCorn = has("corn");
  const hasKale = has("kale");
  const hasMushroom = has("mushroom");
  const hasPepper = hasAny("bell pepper","pepper");
  const hasCornbread = has("cornbread");
  const hasTortilla = hasAny("tortilla","corn tortilla","flour tortilla");
  const hasBread = hasAny("bread","toast","sourdough","bun","roll","bagel","muffin","english muffin");
  const hasCheese = hasAny("cheese","feta","cheddar","mozzarella");
  const hasFeta = has("feta");
  const hasWatermelon = has("watermelon");
  const hasMango = has("mango");
  const hasBanana = has("banana");
  const hasBlueberry = hasAny("blueberry","blueberries");
  const hasBerry = hasAny("berry","berries","strawberr","raspberry","raspberries");
  const hasApple = has("apple");
  const hasPomegranate = has("pomegranate");
  const hasKimchi = has("kimchi");
  const hasTurmeric = has("turmeric");
  const hasWalnut = has("walnut");
  const hasAlmond = has("almond");

  // ── Build ingredients list ────────────────────────────────────────────────
  const ingredients = [proteinIngredient];
  const steps = [];
  let totalTime = proteinTime;

  // Starches
  if (hasRice) { ingredients.push("1 cup long-grain white or brown rice"); ingredients.push("1¾ cups water or chicken broth"); }
  if (hasQuinoa) { ingredients.push("½ cup dry quinoa, rinsed"); ingredients.push("1 cup water or broth"); }
  if (hasSweet) { ingredients.push(isStuffed ? "2 medium sweet potatoes, whole" : "1 medium sweet potato, cubed or sliced"); totalTime = Math.max(totalTime, isStuffed ? 50 : 30); }
  if (hasPotato) { ingredients.push("2 medium Yukon Gold potatoes, cubed"); totalTime = Math.max(totalTime, 30); }
  if (hasCornbread) { ingredients.push("1 cup cornbread mix (Jiffy or homemade)"); ingredients.push("⅓ cup milk"); ingredients.push("1 egg"); }

  // Vegetables
  if (hasBroccoli) ingredients.push("2 cups broccoli florets");
  if (hasAsparagus) ingredients.push("1 bunch asparagus, trimmed");
  if (hasSpinach) ingredients.push("2 cups fresh baby spinach");
  if (hasAvocado) ingredients.push("½ ripe avocado, sliced or mashed");
  if (hasBeans) ingredients.push(has("white bean") ? "1 can white cannellini beans, drained" : "1 can black beans, drained and rinsed");
  if (hasCorn) ingredients.push(has("corn tortilla") ? "" : "1 cup corn kernels (fresh or frozen)");
  if (hasKale) ingredients.push("2 cups kale, stems removed, roughly torn");
  if (hasMushroom) ingredients.push("1 cup cremini mushrooms, sliced");
  if (hasPepper) ingredients.push("1 bell pepper (red or orange), sliced");
  if (hasCheese && !hasFeta) ingredients.push("¼ cup shredded cheddar or Monterey Jack");
  if (hasFeta) ingredients.push("2 oz feta cheese, crumbled");
  if (hasWatermelon) ingredients.push("2 cups seedless watermelon, cubed");
  if (hasMango) ingredients.push("1 cup fresh mango, diced");
  if (hasBanana) ingredients.push("1 ripe banana, sliced");
  if (hasBlueberry) ingredients.push("½ cup fresh or frozen blueberries");
  else if (hasBerry) ingredients.push("½ cup mixed berries (strawberries, raspberries, blueberries)");
  if (hasPomegranate) ingredients.push("¼ cup pomegranate arils (seeds)");
  if (hasKimchi) ingredients.push("½ cup fermented kimchi");
  if (hasTurmeric) ingredients.push("1 tsp ground turmeric");
  if (hasTurmeric) ingredients.push("Pinch of black pepper (boosts curcumin absorption)");
  if (hasApple) ingredients.push("1 medium apple, cored and sliced");
  if (hasWalnut) ingredients.push("2 tbsp raw walnuts, roughly chopped");
  if (hasAlmond) ingredients.push("2 tbsp raw almonds or almond butter");
  if (hasTortilla && !isBurrito && !isTaco) ingredients.push("2 corn or flour tortillas (6-inch)");
  if (isBurrito) ingredients.push("1 large (10-inch) flour or whole wheat burrito tortilla");
  if (isTaco) ingredients.push("3 corn tortillas (6-inch), warmed");
  if (hasBread && !isBurrito && !isTaco) ingredients.push(has("sourdough") ? "2 slices sourdough bread" : has("bagel") ? "1 whole grain bagel, halved" : has("english muffin") ? "1 whole grain English muffin, split" : "2 slices whole grain bread");

  // Seasonings & oils (always included)
  ingredients.push("1–2 tbsp olive oil or avocado oil");
  ingredients.push("Salt, black pepper, and garlic powder to taste");

  // Sauces / extras by dish type
  if (isCaesar) { ingredients.push("3 tbsp Caesar dressing (store-bought or homemade)"); ingredients.push("2 tbsp Parmesan, shaved"); ingredients.push("Romaine lettuce, 3 cups, chopped"); }
  if (isSalad && !isCaesar) { ingredients.push("3 cups mixed greens or romaine"); ingredients.push("2 tbsp olive oil + 1 tbsp lemon juice (for dressing)"); }
  if (isSoup || has("chili")) { ingredients.push(has("bone broth") ? "2½ cups bone broth" : "2½ cups low-sodium chicken or vegetable broth"); ingredients.push("1 garlic clove, minced"); ingredients.push("½ onion, diced"); }
  if (isCurry) { ingredients.push("1 can (14 oz) light coconut milk"); ingredients.push("2 tsp curry powder"); ingredients.push("1 tsp turmeric"); ingredients.push("½ onion, diced"); }
  if (isPasta && !isBolognese) { ingredients.push("6 oz pasta (penne, spaghetti, or shape of choice)"); if (has("marinara") || has("tomato sauce")) { ingredients.push("1 cup marinara or crushed tomatoes"); ingredients.push("2 cloves garlic, minced"); } if (has("garlic bread")) { ingredients.push("2 slices bread or baguette"); ingredients.push("1 tbsp butter"); ingredients.push("1 clove garlic, minced"); } }
  if (isStirFry) { ingredients.push("2 tbsp low-sodium soy sauce or coconut aminos"); ingredients.push("1 tsp sesame oil"); ingredients.push("1 tsp fresh ginger, minced"); }
  if (isFajita) { ingredients.push("½ onion, sliced into strips"); ingredients.push("1 tsp cumin + ½ tsp chili powder"); ingredients.push("3 flour or corn tortillas, warmed"); }
  if (isEnchilada) { ingredients.push("½ cup red enchilada sauce"); ingredients.push("3 corn tortillas"); ingredients.push("¼ cup shredded Monterey Jack cheese"); }
  if (isTeriyaki) { ingredients.push("3 tbsp soy sauce or tamari"); ingredients.push("1 tbsp mirin or rice vinegar"); ingredients.push("1 tbsp honey"); ingredients.push("1 tsp cornstarch + 1 tbsp water (slurry)"); ingredients.push("1 tsp fresh ginger, grated"); }
  if (isGlazed && hasPomegranate) { ingredients.push("½ cup pomegranate juice"); ingredients.push("2 tbsp honey"); ingredients.push("1 tbsp balsamic vinegar"); }
  if (isBolognese) { ingredients.push("1 can (14 oz) crushed tomatoes"); ingredients.push("2 cloves garlic, minced"); ingredients.push("½ onion, finely diced"); ingredients.push("1 tbsp tomato paste"); ingredients.push("1 tsp dried Italian herbs"); ingredients.push("8 oz brown rice pasta or whole grain pasta"); }

  // Quinoa porridge
  if (has("quinoa") && hasAny("porridge","bowl") && !isSalad && !isBowl) {
    const ing = ["½ cup quinoa, rinsed", "1 cup milk of choice or water"];
    if (hasBerry) ing.push("½ cup mixed berries");
    if (hasBlueberry) ing.push("½ cup blueberries");
    if (hasBanana) ing.push("1 ripe banana, sliced");
    if (hasPomegranate) ing.push("¼ cup pomegranate arils");
    ing.push("1 tbsp honey or maple syrup","Pinch of cinnamon and salt");
    return {
      serves: 1, time: "20 min",
      ingredients: ing,
      steps: ["Rinse quinoa under cold water in a fine mesh strainer for 30 seconds to remove bitter saponins.","Combine quinoa and milk in a saucepan. Bring to a boil, then reduce to low.","Cover and simmer 15 minutes until quinoa is fluffy and liquid is absorbed.","Stir in cinnamon and a pinch of salt. Transfer to a bowl.","Top with fruit and drizzle with honey. Serve warm."],
      tip: "Quinoa porridge is a complete protein — all 9 essential amino acids — unlike oatmeal.",
      nutrition: ["Complete plant protein with all essential amino acids","Magnesium supports GABA production for calm","Iron supports oxygen delivery to the brain","Fiber stabilizes blood sugar for steady energy"]
    };
  }

  // Brown rice congee
  if (has("congee")) {
    const ing = ["½ cup jasmine or short-grain brown rice", "4 cups water or chicken broth", "1 tsp fresh ginger, grated"];
    if (has("egg")) ing.push("1 egg (soft-boiled: 6.5 min)");
    ing.push("1 tsp sesame oil","1 tbsp soy sauce or tamari","2 scallions, thinly sliced","Salt and white pepper to taste");
    return {
      serves: 1, time: "45 min",
      ingredients: ing,
      steps: ["Rinse rice until water runs clear. Combine rice and broth in a pot.","Bring to a boil, then reduce heat to low. Partially cover and simmer 35–40 minutes, stirring occasionally, until rice breaks down into a thick porridge.","While congee simmers, prepare soft-boiled egg: boil water, gently lower egg in, cook exactly 6.5 minutes, then ice bath.","Season congee with ginger, sesame oil, soy sauce, salt, and white pepper.","Ladle into a bowl. Top with peeled soft-boiled egg (halved) and sliced scallions."],
      tip: "The longer you cook congee, the creamier it gets. Leftover rice works too — just use less water and cook 20 min.",
      nutrition: ["Easily digestible carbs are gentle on the gut-brain axis","Ginger is anti-inflammatory and supports digestion","Bone broth adds collagen and amino acids for brain repair","Slow-release energy keeps blood sugar stable"]
    };
  }

  // Brown rice porridge (non-congee)
  if (has("rice") && has("porridge") && !has("congee")) {
    const ing = ["½ cup short-grain brown rice", "3 cups water or milk of choice", "½ tsp cinnamon"];
    if (hasBanana) ing.push("1 ripe banana, sliced");
    if (has("honey")) ing.push("1 tbsp honey");
    else ing.push("1 tbsp maple syrup or honey");
    ing.push("Pinch of salt");
    return {
      serves: 1, time: "35 min",
      ingredients: ing,
      steps: ["Rinse rice under cold water until water runs clear.","Combine rice and liquid in a saucepan. Bring to a boil.","Reduce heat to low, partially cover, and simmer 25–30 minutes, stirring occasionally, until rice is very soft and porridge-like.","Stir in cinnamon and a pinch of salt. Adjust thickness with more liquid if needed.","Transfer to a bowl, top with banana and drizzle with honey or maple syrup."],
      tip: "Brown rice porridge has a nuttier, heartier flavor than oatmeal — the whole grain provides more sustained energy.",
      nutrition: ["Complex carbs for sustained brain energy","Fiber supports gut-brain axis health","Magnesium supports relaxation and sleep","B vitamins support neurotransmitter synthesis"]
    };
  }

  // Millet porridge
  if (has("millet")) {
    const ing = ["½ cup millet, rinsed", "1½ cups milk of choice or water"];
    if (hasBanana) ing.push("1 ripe banana, sliced");
    ing.push("1 tbsp honey","½ tsp cinnamon","Pinch of salt");
    return {
      serves: 1, time: "25 min",
      ingredients: ing,
      steps: ["Toast millet in a dry saucepan over medium heat for 2–3 minutes until fragrant and slightly golden.","Add milk and a pinch of salt. Bring to a boil.","Reduce heat to low, cover, and simmer 18–20 minutes until millet is soft and creamy.","Stir in cinnamon. Transfer to a bowl.","Top with sliced banana and drizzle with honey."],
      tip: "Millet is naturally gluten-free and alkaline — one of the most digestible grains available.",
      nutrition: ["Magnesium supports relaxation and sleep quality","B vitamins support neurotransmitter synthesis","Naturally gluten-free for sensitive digestive systems","Tryptophan supports serotonin production"]
    };
  }

  // Baked oatmeal
  if (has("baked") && hasAny("oatmeal","oat")) {
    const ing = ["2 cups rolled oats", "1 cup milk of choice", "1 egg", "2 tbsp maple syrup or honey"];
    if (hasApple) ing.push("1 medium apple, diced");
    if (hasBlueberry) ing.push("½ cup blueberries");
    if (hasBanana) ing.push("1 ripe banana, mashed");
    ing.push("1 tsp cinnamon","1 tsp baking powder","½ tsp vanilla extract","Pinch of salt");
    return {
      serves: 4, time: "35 min",
      ingredients: ing,
      steps: ["Preheat oven to 375°F. Grease an 8×8 baking dish.","In a large bowl, mix oats, baking powder, cinnamon, and salt.","In another bowl, whisk milk, egg, maple syrup, and vanilla.","Pour wet into dry and stir until combined. Fold in fruit.","Pour into baking dish. Bake 25–30 minutes until golden and set in the center.","Let cool 5 minutes before cutting into squares. Serve warm."],
      tip: "Baked oatmeal keeps in the fridge for 5 days — reheat a square each morning for easy breakfasts.",
      nutrition: ["Complex carbs for sustained brain energy","Fiber feeds beneficial gut bacteria","Eggs add choline for memory support","Cinnamon helps stabilize blood sugar"]
    };
  }

  // Savory oatmeal
  if (has("savory") && hasAny("oatmeal","oat")) {
    const ing = ["½ cup rolled oats", "1 cup water or vegetable broth", "1 tbsp olive oil"];
    if (has("egg") || has("poached")) ing.push("1 large egg");
    if (hasAvocado) ing.push("½ ripe avocado, sliced");
    ing.push("Salt, black pepper, and garlic powder to taste","Optional: hot sauce, nutritional yeast, or everything bagel seasoning");
    return {
      serves: 1, time: "10 min",
      ingredients: ing,
      steps: ["Cook oats with broth (not milk) in a saucepan over medium heat, 4–5 minutes until creamy. Season with salt, pepper, and garlic powder.","While oats cook, bring a small pot of water to a gentle simmer. Add a splash of vinegar.","Crack egg into a small cup, then gently slide into simmering water. Cook 3–4 minutes for a runny yolk.","Transfer savory oats to a bowl. Top with sliced avocado and poached egg.","Season with hot sauce or everything bagel seasoning. The runny yolk becomes the sauce."],
      tip: "Savory oats are an underrated brain breakfast — the broth adds umami and the egg adds choline.",
      nutrition: ["Complex carbs from oats provide sustained brain energy","Choline from egg yolk supports memory","Healthy fats from avocado support myelin","Broth-based cooking adds minerals without added sugar"]
    };
  }

  // Oatmeal-specific (standard sweet oatmeal)
  if (isOatmeal) {
    const oatIng = ["½ cup rolled oats (not instant)", "1 cup unsweetened almond milk or water"];
    if (hasBanana) oatIng.push("1 ripe banana, sliced");
    if (hasBlueberry) oatIng.push("½ cup blueberries");
    else if (hasBerry) oatIng.push("½ cup mixed berries");
    if (hasPomegranate) oatIng.push("¼ cup pomegranate arils");
    if (hasWalnut) oatIng.push("2 tbsp raw walnuts, chopped");
    else if (has("pistachio")) oatIng.push("2 tbsp shelled pistachios");
    if (has("flax")) oatIng.push("1 tbsp ground flaxseed");
    oatIng.push("1 tbsp honey or pure maple syrup","½ tsp ground cinnamon","Pinch of sea salt");
    return {
      serves: 1, time: "8 min",
      ingredients: oatIng,
      steps: ["Combine oats, milk, salt, and cinnamon in a small saucepan over medium heat.", "Stir frequently for 4–5 minutes until oats absorb the liquid and reach a creamy consistency.", "Remove from heat — oats continue thickening off the heat.", "Pour into a bowl and arrange toppings artfully on top.", "Drizzle honey or maple syrup over everything and serve immediately."],
      tip: "For extra creaminess, use half water and half milk. Overnight oats work too — just combine everything in a jar and refrigerate overnight.",
      nutrition: ["Complex carbs for sustained brain energy","Fiber feeds beneficial gut bacteria","Beta-glucan supports healthy cholesterol","Cinnamon helps stabilize blood sugar"]
    };
  }

  // Smoothie bowl (must come before generic smoothie check)
  if (has("smoothie bowl")) {
    const ing = ["1 cup frozen fruit (banana, mango, or berries)","½ cup milk of choice","¼ cup granola"];
    if (hasSpinach) ing.push("1 cup fresh spinach");
    if (hasBanana) ing.push("1 ripe banana");
    if (hasMango) ing.push("½ cup frozen mango chunks");
    if (hasPomegranate) ing.push("¼ cup pomegranate arils");
    ing.push("1 tbsp chia seeds or hemp seeds");
    ing.push("1 tsp honey");
    return {
      serves: 1, time: "5 min",
      ingredients: ing,
      steps: [
        "Blend frozen fruit with just enough milk to create a thick, spoonable consistency — less liquid than a drinkable smoothie.",
        "Pour into a bowl.",
        "Arrange toppings in rows: granola, fresh fruit, seeds.",
        "Eat immediately with a spoon — smoothie bowls melt fast.",
      ],
      tip: "Use frozen fruit straight from the freezer — it's what gives smoothie bowls their thick, ice-cream-like texture.",
      nutrition: ["Antioxidants from berries reduce neuroinflammation","Fiber from fruit and seeds supports gut health","Natural sugars provide quick brain fuel","Spinach adds folate without changing the taste"]
    };
  }

  // Smoothie-specific
  if (isSmoothi) {
    const sIng = [];
    if (has("green tea") || has("matcha")) sIng.push("1 tsp matcha or green tea powder");
    if (hasBanana) sIng.push("1 ripe banana, frozen");
    else sIng.push("1 cup frozen mixed berries or banana chunks");
    if (hasSpinach) sIng.push("1 cup fresh spinach");
    if (hasBerry && !hasBanana) {} // already added above
    else if (hasBerry) sIng.push("½ cup frozen mixed berries");
    if (hasBlueberry && !hasBerry) sIng.push("½ cup frozen blueberries");
    if (hasMango) sIng.push("½ cup frozen mango chunks");
    sIng.push("1 cup unsweetened almond, oat, or coconut milk");
    if (has("yogurt")) sIng.push("½ cup Greek yogurt (plain, full-fat)");
    else sIng.push("½ cup Greek yogurt (plain, full-fat)");
    if (has("almond butter")) sIng.push("1 tbsp almond butter");
    else if (has("peanut butter")) sIng.push("1 tbsp peanut butter");
    else sIng.push("1 tbsp almond butter or peanut butter");
    if (has("chia")) sIng.push("1 tbsp chia seeds");
    if (has("flax")) sIng.push("1 tbsp ground flaxseed");
    if (has("honey")) sIng.push("1 tsp honey");
    else sIng.push("1 tsp honey");
    if (has("egg")) sIng.push("1 raw pasteurized egg (optional protein boost)");
    sIng.push("3–4 ice cubes");
    return {
      serves: 1, time: "5 min",
      ingredients: sIng,
      steps: ["Add liquid to blender first — this protects the blade and blends more smoothly.", "Add yogurt, nut butter, and honey.", "Add frozen fruit and ice on top.", "Blend on high 45–60 seconds until completely smooth and creamy.", "Pour into a tall glass. Drink immediately for best texture."],
      tip: "Freeze ripe bananas in chunks — they make the creamiest smoothies without any added sugar.",
      nutrition: ["Protein from Greek yogurt supports neurotransmitter production","Antioxidants from berries reduce neuroinflammation","Healthy fats from nut butter support myelin sheath","Potassium from banana supports nerve signaling"]
    };
  }

  // Yogurt / parfait
  if (isYogurt || has("parfait")) {
    const ing = [];
    if (has("greek")) ing.push("1 cup Greek yogurt (plain, full-fat)");
    else if (has("coconut")) ing.push("1 cup coconut yogurt");
    else if (has("vanilla")) ing.push("1 cup vanilla yogurt");
    else ing.push("1 cup plain yogurt");
    if (has("granola")) ing.push("¼ cup granola");
    if (hasBanana) ing.push("1 ripe banana, sliced");
    if (hasBlueberry) ing.push("½ cup fresh blueberries");
    else if (hasBerry) ing.push("½ cup mixed fresh berries (strawberries, raspberries, blueberries)");
    if (hasMango) ing.push("½ cup fresh mango, diced");
    if (hasPomegranate) ing.push("¼ cup pomegranate arils");
    if (has("grapefruit")) ing.push("½ grapefruit, segmented");
    if (has("honey")) ing.push("1 tbsp honey");
    if (hasWalnut) ing.push("2 tbsp walnuts, roughly chopped");
    if (hasAlmond) ing.push("2 tbsp sliced almonds");
    if (has("pistachio")) ing.push("2 tbsp shelled pistachios");
    if (has("chia")) ing.push("1 tsp chia seeds");
    if (ing.length <= 2) { ing.push("½ cup fresh berries or sliced fruit"); ing.push("1 tbsp honey"); }
    return {
      serves: 1, time: "5 min",
      ingredients: ing,
      steps: [
        has("parfait") ? "In a glass or bowl, spoon a layer of yogurt on the bottom." : "Spoon yogurt into a bowl.",
        has("parfait") ? "Add a layer of fruit, then granola. Repeat layers until glass is full." : "Arrange fruit and toppings on top of the yogurt.",
        has("honey") ? "Drizzle honey over the top." : "Add a drizzle of honey if desired.",
        "Serve immediately — granola stays crunchiest when added just before eating.",
      ].filter(Boolean),
      tip: "Greek yogurt has 2x the protein of regular yogurt — it keeps you full much longer.",
      nutrition: ["Probiotics from yogurt support the gut-brain axis and serotonin production","Protein supports neurotransmitter synthesis","Live cultures improve gut microbiome diversity","Calcium supports neural signaling"]
    };
  }

  // Chia pudding
  if (has("chia") && has("pudding")) {
    const ing = ["3 tbsp chia seeds"];
    if (has("almond milk")) ing.push("1 cup unsweetened almond milk");
    else if (has("coconut")) ing.push("1 cup coconut milk");
    else ing.push("1 cup milk of choice");
    if (hasMango) ing.push("½ cup fresh mango, diced");
    if (hasBerry) ing.push("½ cup mixed berries");
    if (hasBanana) ing.push("1 ripe banana, sliced");
    if (has("coconut") && !has("coconut milk")) ing.push("1 tbsp unsweetened shredded coconut");
    ing.push("1 tsp honey or maple syrup");
    ing.push("½ tsp vanilla extract");
    return {
      serves: 1, time: "5 min prep + overnight",
      ingredients: ing,
      steps: [
        "Combine chia seeds, milk, sweetener, and vanilla in a jar or bowl.",
        "Stir well, making sure chia seeds are fully mixed in — they clump if you skip this.",
        "Cover and refrigerate at least 4 hours or overnight until thick and pudding-like.",
        "Stir once more before serving. Top with fresh fruit and any desired toppings.",
      ],
      tip: "Shake or stir the jar after 10 minutes in the fridge — this prevents clumping.",
      nutrition: ["Chia seeds are rich in omega-3 ALA, supporting brain cell membranes","High fiber feeds beneficial gut bacteria","Complete protein with all essential amino acids","Magnesium supports stress response and sleep quality"]
    };
  }

  // Cereal with milk
  if (has("cereal")) {
    const ing = ["1 cup whole grain cereal","1 cup cold milk (whole, 2%, or plant-based)"];
    if (hasBanana) ing.push("1 ripe banana, sliced");
    if (hasBerry) ing.push("½ cup fresh berries");
    return {
      serves: 1, time: "3 min",
      ingredients: ing,
      steps: ["Pour cereal into a bowl.","Add cold milk.","Top with sliced fruit if desired.","Eat promptly — cereal is best when still crunchy."],
      tip: "Choose cereals with whole grains first on the ingredient list and less than 8g sugar per serving.",
      nutrition: ["Whole grains provide steady glucose for sustained brain energy","Milk adds protein and calcium for neural function","Fortified cereals often contain B vitamins critical for mood regulation","Fiber supports gut bacteria that produce neurotransmitters"]
    };
  }

  // Pancakes / waffles
  if (isPancake) {
    const isWaffle = has("waffle");
    const ing = [isWaffle ? "1 cup waffle mix or from-scratch batter" : "1 cup pancake mix or from-scratch batter","1 egg","¾ cup milk","1 tbsp melted butter"];
    if (hasBanana) ing.push("1 ripe banana, sliced");
    if (hasBerry) ing.push("½ cup fresh berries");
    if (hasBlueberry) ing.push("½ cup fresh blueberries");
    if (has("maple") || has("syrup")) ing.push("2 tbsp pure maple syrup");
    if (has("honey")) ing.push("1 tbsp honey");
    if (has("strawberr")) ing.push("½ cup fresh strawberries, sliced");
    if (ing.length <= 5) ing.push("2 tbsp pure maple syrup");
    return {
      serves: 1, time: isWaffle ? "15 min" : "15 min",
      ingredients: ing,
      steps: isWaffle ? [
        "Preheat waffle iron. Mix batter ingredients until just combined — small lumps are fine.",
        "Lightly grease the waffle iron. Pour batter to fill ¾ of the surface.",
        "Cook until steam stops and waffle is golden, about 3–4 minutes.",
        "Top with fresh fruit and maple syrup. Serve immediately.",
      ] : [
        "Mix batter ingredients until just combined — overmixing makes pancakes tough.",
        "Heat a non-stick pan or griddle over medium heat. Add a small pat of butter.",
        "Pour ¼ cup batter per pancake. Cook until bubbles form on the surface and edges look set, about 2–3 minutes.",
        "Flip and cook 1–2 more minutes until golden brown.",
        "Stack pancakes, top with fresh fruit and maple syrup.",
      ],
      tip: "Let the batter rest 5 minutes before cooking — the flour hydrates and makes fluffier pancakes.",
      nutrition: ["Complex carbs provide sustained glucose for brain energy","Eggs add choline for memory and focus","Berries add antioxidants that cross the blood-brain barrier","Whole grain versions add fiber for gut-brain axis support"]
    };
  }

  // French toast
  if (isFrenchToast) {
    return {
      serves: 1, time: "15 min",
      ingredients: ["2 thick slices bread (brioche or whole grain)","2 eggs","¼ cup milk","½ tsp cinnamon","½ tsp vanilla extract","1 tbsp butter","2 tbsp pure maple syrup", hasBanana?"1 banana, sliced":"", hasBerry?"½ cup mixed berries":""].filter(Boolean),
      steps: [
        "Whisk eggs, milk, cinnamon, and vanilla in a shallow bowl.",
        "Dip each bread slice into the mixture, letting it soak 15–20 seconds per side.",
        "Melt butter in a non-stick pan over medium heat.",
        "Cook each slice 2–3 minutes per side until golden brown.",
        "Top with maple syrup and fresh fruit.",
      ],
      tip: "Day-old bread works best — it's drier and soaks up the custard without falling apart.",
      nutrition: ["Eggs provide choline for acetylcholine production","Cinnamon helps stabilize blood sugar","Whole grain bread adds fiber for gut microbiome","Protein from eggs keeps you full longer"]
    };
  }

  // ── Simple snacks (no cooking required) ──────────────────────────────────

  // Trail mix
  if (has("trail mix")) {
    return {
      serves: 1, time: "2 min",
      ingredients: ["¼ cup raw almonds or cashews","¼ cup walnuts or pecans","2 tbsp pumpkin seeds","2 tbsp dried cranberries or raisins", has("dark chocolate")?"2 tbsp dark chocolate chips":"", has("mango")?"2 tbsp dried mango pieces":""].filter(Boolean),
      steps: ["Combine all ingredients in a small bowl or bag.","Toss to mix evenly.","Portion into a container — trail mix is calorie-dense, so a measured serving keeps you on track."],
      tip: "Make a big batch on Sunday and portion into bags for the week — it's the easiest grab-and-go snack.",
      nutrition: ["Omega-3s from walnuts support brain cell membranes","Magnesium from nuts supports stress response","Zinc from pumpkin seeds aids neurotransmitter function","Antioxidants from dark chocolate improve blood flow to the brain"]
    };
  }

  // Fruit + nut butter (apple/banana/celery/pear + peanut/almond/walnut/sunflower butter)
  if ((has("peanut butter") || has("almond butter") || has("walnut butter") || has("sunflower seed butter")) && !isSandwich && !isToast && !isOatmeal) {
    const fruit = hasApple ? "1 medium apple, cored and sliced" : hasBanana ? "1 ripe banana" : has("celery") ? "4 celery stalks, cut into sticks" : has("pear") ? "1 ripe pear, cored and sliced" : has("cracker") ? "8–10 whole grain crackers" : "1 medium apple, cored and sliced";
    const butter = has("almond") ? "2 tbsp almond butter" : has("walnut") ? "2 tbsp walnut butter" : has("sunflower") ? "2 tbsp sunflower seed butter" : "2 tbsp peanut butter";
    return {
      serves: 1, time: "3 min",
      ingredients: [fruit, butter],
      steps: [
        has("celery") ? "Wash and cut celery into sticks." : has("cracker") ? "Arrange crackers on a plate." : "Wash and slice the fruit.",
        "Spread or dollop nut butter on each piece, or serve in a small bowl for dipping.",
        "Eat immediately — sliced fruit oxidizes (browns) over time.",
      ],
      tip: has("apple") ? "Tart apples like Granny Smith pair best with peanut butter — the sweet-sour contrast is perfect." : "This is one of the simplest, most brain-healthy snacks — protein + healthy fats + natural sugars.",
      nutrition: ["Healthy fats from nut butter support myelin sheath integrity","Protein sustains energy between meals","Natural fruit sugars provide quick fuel for the brain","Fiber slows absorption for steady blood sugar"]
    };
  }

  // Hummus + veggies
  if (has("hummus")) {
    const veg = has("carrot") ? "1 cup baby carrots" : has("cucumber") ? "1 cucumber, sliced into rounds" : has("celery") ? "4 celery stalks, sliced" : "1 cup mixed raw vegetables (carrots, cucumber, bell pepper)";
    return {
      serves: 1, time: "3 min",
      ingredients: [veg, "¼ cup hummus"],
      steps: ["Wash and prepare vegetables — slice into sticks or rounds for easy dipping.","Spoon hummus into a small bowl.","Arrange vegetables around the hummus and serve."],
      tip: "Hummus keeps well for 5–7 days in the fridge — make or buy extra for easy snacking all week.",
      nutrition: ["Chickpea protein supports steady amino acid availability","Fiber from vegetables feeds gut bacteria","Tahini in hummus provides B vitamins for nerve function","Raw vegetables retain maximum vitamin C and folate"]
    };
  }

  // Cheese + crackers / cheese + fruit
  if (hasCheese && !has("cottage cheese") && !has("mac & cheese") && !has("grilled cheese") && !isSandwich && !isOmelette && !isBurrito && !isTaco && !isQuesadilla && !isEnchilada && !isStuffed && !isCasserole && !isBowl && !isSoup && !isPasta && !isStirFry && !isCurry && !isSheetPan && !hasAny("chicken","turkey","beef","salmon","steak","pork")) {
    const items = [];
    if (has("cracker")) items.push("8–10 whole grain crackers");
    if (hasApple) items.push("1 medium apple, cored and sliced");
    items.push(has("cheddar") ? "2 oz cheddar cheese, cubed or sliced" : has("feta") ? "2 oz feta cheese, crumbled" : "2 oz cheese of choice, cubed or sliced");
    if (items.length < 2) items.push("8–10 whole grain crackers");
    return {
      serves: 1, time: "3 min",
      ingredients: items,
      steps: ["Slice or cube cheese into bite-sized pieces.","Arrange cheese alongside crackers or sliced fruit on a plate.","Serve at room temperature — cheese has more flavor when not ice-cold."],
      tip: "Pull cheese from the fridge 10 minutes before eating — cold mutes the flavor.",
      nutrition: ["Calcium from cheese supports neural signaling","Protein provides sustained energy","Tryptophan in cheese supports serotonin production","Whole grain crackers add fiber for gut health"]
    };
  }

  // Cottage cheese combos (cantaloupe, berries, etc.)
  if (has("cottage cheese")) {
    const ing = ["1 cup cottage cheese (full-fat or 2%)"];
    if (has("cantaloupe")) ing.push("1 cup cantaloupe, cubed or balled");
    if (has("peach")) ing.push("1 ripe peach, sliced");
    if (hasBerry) ing.push("½ cup mixed fresh berries");
    if (hasBlueberry) ing.push("½ cup fresh blueberries");
    if (has("pineapple")) ing.push("½ cup fresh pineapple chunks");
    if (has("honey")) ing.push("1 tsp honey");
    if (has("cinnamon")) ing.push("Pinch of cinnamon");
    if (ing.length <= 2) ing.push("½ cup fresh seasonal fruit");
    return {
      serves: 1, time: "3 min",
      ingredients: ing,
      steps: ["Spoon cottage cheese into a bowl.","Prepare fruit — wash, slice, or cube as needed.","Arrange fruit on top of cottage cheese. Drizzle with honey if using."],
      tip: "Full-fat cottage cheese has a creamier texture and keeps you fuller longer.",
      nutrition: ["Casein protein provides slow, sustained amino acid release","Calcium supports neural signaling","Tryptophan supports serotonin production","Fresh fruit adds antioxidants and quick brain fuel"]
    };
  }

  // Simple grab-and-go snacks (dark chocolate + nuts, frozen fruit + nuts, seed mixes)
  const isSimpleSnack = hasAny("dark chocolate & almond","dark chocolate chips","dark chocolate squares","frozen blueberr","frozen berr","pumpkin seeds & cashew","dark chocolate & dried","grapefruit & walnut","almonds & dark chocolate");
  if (isSimpleSnack && !hasAny("chicken","turkey","beef","salmon","steak","pork","egg","rice","pasta")) {
    const ing = [];
    if (has("dark chocolate")) ing.push("1 oz dark chocolate (70%+ cacao), broken into pieces or chips");
    if (hasAlmond || has("almonds")) ing.push("¼ cup raw almonds");
    if (hasWalnut || has("walnuts")) ing.push("¼ cup raw walnuts");
    if (has("cashew")) ing.push("¼ cup raw cashews");
    if (has("pumpkin seed")) ing.push("2 tbsp pumpkin seeds");
    if (hasBlueberry || has("blueberr")) ing.push("½ cup frozen blueberries");
    else if (hasBerry || has("frozen berr")) ing.push("½ cup frozen mixed berries");
    if (has("dried apricot")) ing.push("4–5 dried apricots");
    if (hasBanana) ing.push("1 ripe banana");
    if (has("grapefruit")) ing.push("1 grapefruit, segmented");
    if (ing.length === 0) ing.push("1 oz dark chocolate (70%+ cacao)","¼ cup mixed nuts");
    return {
      serves: 1, time: "2 min",
      ingredients: ing,
      steps: ["Portion all ingredients into a small bowl or plate.","No cooking needed — enjoy as a simple, nutrient-dense snack.","For frozen fruit, let sit 2–3 minutes to soften slightly, or enjoy frozen for an ice-cream-like texture."],
      tip: "Dark chocolate above 70% cacao has the highest flavanol content — the compound that boosts blood flow to the brain.",
      nutrition: ["Flavanols in dark chocolate increase cerebral blood flow","Omega-3s from nuts support brain cell membranes","Antioxidants from berries reduce neuroinflammation","Magnesium from nuts and chocolate supports stress response"]
    };
  }

  // Simple fruit (no protein, no cooking)
  const isFruitOnly = hasAny("sliced banana","sliced strawberr","peeled orange","mango slices","mango & mixed","mixed berries","mixed berry bowl","fruit bowl","fruit cup","frozen berries","dates & pumpkin","dark chocolate & strawberr","watermelon chunks");
  if (isFruitOnly && !hasAny("jerky","turkey","chicken","beef","egg","hard-boiled","deli","sausage")) {
    const ing = [];
    if (hasBanana) ing.push("1 ripe banana, sliced");
    if (hasBerry) ing.push("½ cup mixed fresh berries");
    if (has("strawberr")) ing.push("1 cup fresh strawberries, hulled and sliced");
    if (hasMango) ing.push("1 cup fresh mango, diced");
    if (has("orange")) ing.push("1 large orange, peeled and separated into segments");
    if (has("dates")) ing.push("4–5 Medjool dates");
    if (has("pumpkin seed")) ing.push("2 tbsp pumpkin seeds");
    if (has("sunflower")) ing.push("2 tbsp sunflower seeds");
    if (has("dark chocolate")) ing.push("1 oz dark chocolate (70%+ cacao)");
    if (hasWatermelon) ing.push("2 cups seedless watermelon, cubed");
    if (has("cherr")) ing.push("1 cup fresh cherries");
    if (has("papaya")) ing.push("1 cup fresh papaya, cubed");
    if (hasWalnut) ing.push("small handful of walnuts");
    if (hasAlmond) ing.push("small handful of almonds");
    if (ing.length === 0) ing.push("1 cup fresh seasonal fruit of choice");
    return {
      serves: 1, time: "2 min",
      ingredients: ing,
      steps: ["Wash and prepare fruit — slice, peel, or hull as needed.","Arrange in a bowl or on a plate.","Eat fresh for maximum vitamin and antioxidant content."],
      tip: "Ripe, in-season fruit is always the most nutritious and flavorful option.",
      nutrition: ["Natural antioxidants reduce neuroinflammation","Vitamin C supports dopamine and norepinephrine synthesis","Fiber feeds beneficial gut bacteria","Natural sugars provide quick brain fuel without a crash"]
    };
  }

  // Edamame (snack-only — skip if it's part of a larger meal)
  if (has("edamame") && !hasAny("salmon","chicken","beef","turkey","rice","teriyaki","stir")) {
    return {
      serves: 1, time: "5 min",
      ingredients: ["1 cup frozen edamame in pods","½ tsp sea salt","Optional: squeeze of lime, chili flakes"],
      steps: ["Bring a pot of water to a boil. Add edamame.","Cook 3–4 minutes until tender.","Drain and toss with sea salt. Add lime or chili if desired.","Squeeze pods to pop out beans and eat."],
      tip: "Microwave works too — 2–3 minutes in a covered bowl with a splash of water.",
      nutrition: ["Complete plant protein with all essential amino acids","Rich in folate for serotonin pathway support","Isoflavones have neuroprotective properties","Fiber supports gut microbiome diversity"]
    };
  }

  // Roasted chickpeas
  if (has("roasted chickpea")) {
    return {
      serves: 1, time: "30 min",
      ingredients: ["1 can (15 oz) chickpeas, drained and rinsed","1 tbsp olive oil","½ tsp salt","½ tsp garlic powder","½ tsp smoked paprika","¼ tsp cumin"],
      steps: ["Preheat oven to 400°F. Drain chickpeas and pat very dry with paper towels — this is the key to crunchiness.","Toss with olive oil and spices.","Spread in a single layer on a baking sheet.","Roast 25–30 minutes, shaking pan halfway, until golden and crunchy.","Let cool 5 minutes — they crisp up more as they cool."],
      tip: "The drier the chickpeas are before roasting, the crunchier they'll be.",
      nutrition: ["Plant protein supports steady amino acid availability","Fiber feeds gut bacteria that produce serotonin precursors","Iron supports oxygen delivery to the brain","Folate supports the methylation cycle for mood regulation"]
    };
  }

  // Mixed nuts / handful of nuts
  if (hasAny("handful of almond","handful of cashew","handful of walnut","mixed nuts","walnuts & apple","orange slices & almond","kiwi slices","cashew mix","pumpkin seeds &","seeds & cashew")) {
    const ing = [];
    if (hasWalnut) ing.push("¼ cup raw walnuts");
    if (hasAlmond) ing.push("¼ cup raw almonds");
    if (has("cashew")) ing.push("¼ cup raw cashews");
    if (has("pumpkin seed")) ing.push("2 tbsp pumpkin seeds");
    if (has("cranberr")) ing.push("2 tbsp dried cranberries");
    if (has("dried fruit")) ing.push("2 tbsp mixed dried fruit");
    if (has("dried apricot")) ing.push("4–5 dried apricots");
    if (hasApple) ing.push("1 medium apple, cored and sliced");
    if (has("orange")) ing.push("1 large orange, peeled and sliced");
    if (has("kiwi")) ing.push("2 kiwis, peeled and sliced");
    if (ing.length === 0) ing.push("¼ cup mixed raw nuts");
    return {
      serves: 1, time: "2 min",
      ingredients: ing,
      steps: ["Prepare any fresh fruit — wash, peel, and slice as needed.","Portion nuts into a small bowl.","Arrange together and enjoy as a simple, nutrient-dense snack."],
      tip: "Raw nuts retain more omega-3s than roasted — heat degrades these delicate fats.",
      nutrition: ["Omega-3 fatty acids from nuts support brain cell membranes","Vitamin E protects neurons from oxidative stress","Magnesium supports over 300 enzymatic reactions including neurotransmitter synthesis","Zinc supports memory and cognitive function"]
    };
  }

  // Golden Turmeric Milk / Brain Latte
  if (has("turmeric milk") || has("brain latte") || has("golden milk")) {
    return {
      serves: 1, time: "5 min",
      ingredients: ["1 cup milk of choice (oat, almond, or whole)","1 tsp ground turmeric","½ tsp ground cinnamon","¼ tsp ground ginger","Pinch of black pepper (increases curcumin absorption by 2000%)","1 tsp honey or maple syrup","½ tsp coconut oil or ghee"],
      steps: ["Warm milk in a small saucepan over medium heat — do not boil.","Whisk in turmeric, cinnamon, ginger, black pepper, and coconut oil until smooth and golden.","Pour into a mug and stir in honey.","Sip slowly — curcumin takes about 45 minutes to reach peak blood levels."],
      tip: "Black pepper contains piperine, which increases curcumin absorption by up to 2,000%. Never skip it.",
      nutrition: ["Curcumin crosses the blood-brain barrier and reduces neuroinflammation","Increases BDNF (brain-derived neurotrophic factor)","Anti-amyloid properties may protect against cognitive decline","Cinnamon helps stabilize blood sugar for steady brain energy"]
    };
  }

  // Lion's Mane Mushroom Tea
  if (has("lion's mane") && has("tea")) {
    return {
      serves: 1, time: "5 min",
      ingredients: ["1 tsp lion's mane mushroom powder","1 cup hot water (not boiling — 175°F is ideal)","1 tsp honey","Optional: splash of milk, dash of cinnamon"],
      steps: ["Heat water to just below boiling (175°F).","Add lion's mane powder to a mug and pour hot water over it.","Stir well until powder is fully dissolved. Add honey and optional milk.","Sip slowly — lion's mane compounds take time to absorb."],
      tip: "Lion's mane stimulates NGF (nerve growth factor) — a protein that promotes the growth and maintenance of neurons. Consistent daily use shows the best results.",
      nutrition: ["Hericenones and erinacines stimulate nerve growth factor (NGF)","Supports hippocampal neurogenesis — growth of new brain cells","Reduces neuroinflammation through inhibition of NF-κB pathway","May improve mild cognitive impairment — shown in human clinical trials"]
    };
  }

  // Kefir bowl/smoothie
  if (has("kefir")) {
    const ing = ["1 cup kefir (plain, full-fat)"];
    if (hasBlueberry) ing.push("½ cup fresh blueberries");
    else if (hasBerry) ing.push("½ cup mixed fresh berries");
    if (has("granola")) ing.push("¼ cup granola");
    if (has("honey")) ing.push("1 tsp honey");
    return {
      serves: 1, time: "3 min",
      ingredients: ing,
      steps: ["Pour kefir into a bowl.","Top with berries and granola if using.","Drizzle with honey and enjoy immediately."],
      tip: "Kefir contains 30+ strains of beneficial bacteria — far more than yogurt. The gut-brain axis means these directly influence mood and cognition.",
      nutrition: ["30+ probiotic strains support the gut-brain axis","Tryptophan supports serotonin production","Calcium and B12 support neural signaling","Fermentation pre-digests lactose, making it easier to absorb"]
    };
  }

  // Kombucha snack
  if (has("kombucha")) {
    const ing = ["1 bottle (16 oz) kombucha (any flavor)"];
    if (has("nuts") || hasWalnut || hasAlmond) ing.push("¼ cup mixed raw nuts");
    return {
      serves: 1, time: "1 min",
      ingredients: ing,
      steps: ["Pour kombucha into a glass over ice if desired.","Portion nuts into a small bowl.","Enjoy together — the probiotics and healthy fats make a brain-boosting combo."],
      tip: "Choose kombucha with less than 5g sugar per serving. The fermentation should do the sweetening, not added sugar.",
      nutrition: ["Probiotics from fermentation support the gut-brain axis","B vitamins from fermentation support neurotransmitter synthesis","Polyphenols from tea base reduce neuroinflammation","Organic acids support healthy gut pH for optimal nutrient absorption"]
    };
  }

  // Sauerkraut toast/rice cakes
  if (has("sauerkraut")) {
    const ing = ["¼ cup sauerkraut (raw, unpasteurized)"];
    if (has("egg")) ing.push("1–2 eggs");
    if (has("toast")) ing.push("2 slices whole grain bread, toasted");
    if (has("rice cake")) ing.push("2 rice cakes");
    if (hasAvocado) ing.push("½ ripe avocado, mashed");
    if (has("everything")) ing.push("Everything bagel seasoning");
    return {
      serves: 1, time: "8 min",
      ingredients: ing,
      steps: [has("egg") ? "Fry or scramble eggs to your preference." : "Prepare your base — toast bread or arrange rice cakes.",has("toast") ? "Toast bread until golden." : "","Spread avocado on the base if using.","Top with sauerkraut and egg. Sprinkle with seasoning."].filter(Boolean),
      tip: "Raw, unpasteurized sauerkraut from the refrigerator section is what you want — shelf-stable sauerkraut has been heat-treated and contains no live probiotics.",
      nutrition: ["Live probiotics support the gut-brain axis","Fermentation increases bioavailability of vitamins C and K","Lactobacillus strains produce GABA — the brain's calming neurotransmitter","Fiber from cabbage feeds beneficial gut bacteria"]
    };
  }

  // Tea snacks
  if (has("chamomile") || (has("tea") && !has("stea") && !has("steak"))) {
    const ing = ["1 chamomile tea bag","1 cup hot water"];
    if (has("honey")) ing.push("1 tsp honey");
    if (has("cracker")) ing.push("8–10 whole grain crackers");
    if (has("toast")) { ing.push("1 slice whole grain bread"); ing.push("1 tbsp butter or honey"); }
    return {
      serves: 1, time: "5 min",
      ingredients: ing,
      steps: ["Bring water to a boil. Pour over tea bag in a mug.","Steep 5 minutes for full flavor and maximum calming compounds.","Add honey if desired. Prepare crackers or toast on the side.","Sip slowly — chamomile's apigenin takes about 30 minutes to produce a calming effect."],
      tip: "Don't squeeze the tea bag — it releases bitter tannins. Just lift it out gently.",
      nutrition: ["Apigenin in chamomile binds to GABA receptors, promoting calm","L-theanine (if green tea) promotes alpha brain waves","Warm liquids activate the parasympathetic nervous system","Whole grains provide steady glucose for brain function"]
    };
  }

  // Banana & milk / simple milk combo
  if (has("glass of milk") || (hasBanana && !hasAny("oat","pancake","waffle","toast","smoothie","yogurt","chicken","turkey","egg","steak","salmon","sausage","bacon","hash","burrito","wrap","sandwich","almond","chocolate","dark chocolate","walnut","cashew","pistachio","pumpkin") && m.split("&").length <= 2 && !isBowl)) {
    const ing = [];
    if (hasBanana) ing.push("1 ripe banana");
    if (has("milk")) ing.push("1 cup cold milk (whole, 2%, or plant-based)");
    if (has("walnut") || has("walnuts")) ing.push("small handful of walnuts");
    if (ing.length === 0) { ing.push("1 ripe banana"); ing.push("1 cup milk"); }
    return {
      serves: 1, time: "2 min",
      ingredients: ing,
      steps: ["Peel and eat the banana as-is, or slice into a glass of milk.","Pour milk and enjoy alongside.","Simple, satisfying, and no prep needed."],
      tip: "Bananas with brown spots are sweeter and easier to digest — the starches have converted to sugars.",
      nutrition: ["Tryptophan from banana + calcium from milk supports serotonin production","Potassium supports nerve signaling","B6 in bananas is essential for neurotransmitter synthesis","Protein from milk sustains energy between meals"]
    };
  }

  // Rice cakes
  if (has("rice cake")) {
    const rcIng = ["2 rice cakes"];
    if (hasAvocado) rcIng.push("½ ripe avocado, mashed");
    else if (has("almond butter")) rcIng.push("2 tbsp almond butter");
    else if (has("cream cheese")) rcIng.push("2 tbsp cream cheese");
    else rcIng.push("2 tbsp topping of choice");
    if (has("blueberr")) rcIng.push("¼ cup fresh blueberries");
    if (has("salmon")) rcIng.push("2 oz smoked salmon");
    rcIng.push("Pinch of salt and pepper");
    return {
      serves: 1, time: "3 min",
      ingredients: rcIng,
      steps: ["Place rice cakes on a plate.",hasAvocado?"Mash avocado with a fork and spread on rice cakes.":has("almond butter")?"Spread almond butter evenly on rice cakes.":has("cream cheese")?"Spread cream cheese on rice cakes.":"Add your topping of choice.",has("blueberr")?"Top with fresh blueberries.":"",has("salmon")?"Lay smoked salmon over the spread.":"","Season with salt and pepper. Eat immediately for best crunch."].filter(Boolean),
      tip: "Rice cakes are a blank canvas — try them with nut butter, avocado, or cream cheese.",
      nutrition: ["Light, easily digestible carbs for quick brain energy",has("blueberr")?"Blueberries provide anthocyanins that boost memory":"Toppings add healthy fats for cognitive function","Low calorie base allows flexible, nutrient-dense toppings","Gluten-free option for sensitive digestive systems"]
    };
  }

  // PB&J / peanut butter on crackers
  if (has("jelly") || (has("peanut butter") && has("cracker"))) {
    const isPBJ = has("jelly");
    return {
      serves: 1, time: "3 min",
      ingredients: isPBJ ? ["2 slices whole grain bread","2 tbsp peanut butter","1 tbsp grape or strawberry jelly"] : ["8–10 whole grain crackers","2 tbsp peanut butter"],
      steps: isPBJ ? ["Spread peanut butter on one slice of bread.","Spread jelly on the other slice.","Press together gently and cut diagonally."] : ["Arrange crackers on a plate.","Spread a small amount of peanut butter on each cracker.","Enjoy as a quick, protein-rich snack."],
      tip: isPBJ ? "Natural peanut butter (just peanuts + salt) has more nutrients and no added sugar." : "Look for crackers with whole grains as the first ingredient for maximum fiber.",
      nutrition: ["Healthy fats from peanut butter support myelin sheath integrity","Protein sustains energy between meals","Whole grains provide steady glucose for brain function","Magnesium from peanuts supports stress response"]
    };
  }

  // Guacamole / chips & guac / carrots & guac
  if (has("guacamole") || has("guac")) {
    return {
      serves: 1, time: "5 min",
      ingredients: [has("chip") ? "1 oz corn tortilla chips" : "1 cup baby carrots","1 ripe avocado","Juice of ½ lime","Pinch of salt","Optional: diced onion, cilantro"],
      steps: ["Halve avocado, remove pit, and scoop flesh into a bowl.","Mash with a fork to desired consistency — chunky or smooth.","Add lime juice, salt, and any optional ingredients. Mix well.",has("chip")?"Serve with tortilla chips.":"Serve with baby carrots for dipping."],
      tip: "Press the avocado pit into leftover guacamole and cover tightly — it slows browning.",
      nutrition: ["Monounsaturated fats from avocado support cognitive function","Potassium supports nerve signaling","Lutein in avocado supports brain processing speed","Fiber supports gut-brain axis health"]
    };
  }

  // Corn tortilla chips & guacamole (already handled above)

  // Energy balls / energy bites
  if (hasAny("energy ball","energy bite")) {
    return {
      serves: 8, time: "15 min",
      ingredients: ["1 cup rolled oats","½ cup peanut butter (or almond butter)","⅓ cup honey","½ cup dark chocolate chips or dried fruit","1 tbsp chia seeds (optional)","Pinch of salt"],
      steps: ["Combine oats, peanut butter, honey, and salt in a large bowl. Stir until a sticky dough forms.","Fold in chocolate chips or dried fruit and chia seeds.","Refrigerate mixture 10 minutes for easier handling.","Roll into 1-inch balls using slightly wet hands.","Store in an airtight container in the fridge for up to 1 week."],
      tip: "Keep a batch in the fridge for the week — they're the perfect grab-and-go brain fuel.",
      nutrition: ["Oats provide sustained energy via complex carbohydrates","Peanut butter provides healthy fats for myelin support","Honey provides quick glucose for immediate brain fuel","Chia seeds add omega-3 ALA for anti-inflammatory benefits"]
    };
  }

  // Sweet potato chips / bites
  if (has("sweet potato") && hasAny("chip","bite")) {
    return {
      serves: 2, time: "30 min",
      ingredients: ["1 large sweet potato, sliced thin (⅛ inch)","1 tbsp olive oil","½ tsp sea salt","¼ tsp cinnamon (for bites) or paprika (for chips)"],
      steps: ["Preheat oven to 375°F. Line a baking sheet with parchment paper.","Slice sweet potato into thin rounds. Toss with olive oil, salt, and seasoning.","Arrange in a single layer — don't overlap or they'll steam instead of crisp.","Bake 15–20 minutes, flipping halfway, until edges curl and crisp.","Let cool 5 minutes — they crisp up more as they cool."],
      tip: "Thinner slices = crispier chips. Use a mandoline if you have one for even slices.",
      nutrition: ["Beta-carotene converts to vitamin A for neuroprotection","Complex carbs provide steady brain energy","B6 supports neurotransmitter synthesis","Antioxidants reduce neuroinflammation"]
    };
  }

  // Sweet potato hummus
  if (has("sweet potato") && has("hummus")) {
    return {
      serves: 4, time: "35 min",
      ingredients: ["1 medium sweet potato, peeled and cubed","1 can (15 oz) chickpeas, drained","2 tbsp tahini","1 tbsp olive oil","Juice of ½ lemon","½ tsp cumin","Salt and pepper to taste","Veggie sticks for dipping"],
      steps: ["Roast sweet potato cubes at 400°F for 20–25 minutes until soft.","Combine roasted sweet potato, chickpeas, tahini, olive oil, lemon juice, and cumin in a food processor.","Blend until smooth and creamy. Season with salt and pepper.","Serve with carrot sticks, cucumber, and bell pepper strips."],
      tip: "This keeps well in the fridge for 5 days — make a big batch for the week.",
      nutrition: ["Sweet potato adds beta-carotene for brain protection","Chickpea protein supports neurotransmitter production","Tahini provides B vitamins for nerve function","Fiber supports gut-brain axis health"]
    };
  }

  // Salmon jerky
  if (has("salmon") && has("jerky")) {
    const ing = ["2 oz salmon jerky"];
    if (hasApple) ing.push("1 medium apple, sliced");
    return {
      serves: 1, time: "2 min",
      ingredients: ing,
      steps: ["Open package and arrange salmon jerky on a plate.","Slice apple if included and serve alongside.","A protein-rich, omega-3 packed portable snack."],
      tip: "Salmon jerky is one of the best portable sources of omega-3 DHA for brain health.",
      nutrition: ["Omega-3 DHA supports brain cell membrane fluidity","High-quality protein for neurotransmitter synthesis","Astaxanthin in salmon is a powerful brain antioxidant","Low-carb, high-protein keeps blood sugar stable"]
    };
  }

  // Beef jerky combos
  if (has("jerky") && !isSandwich && !isBowl) {
    const ing = ["2 oz beef jerky"];
    if (has("egg") || has("hard-boiled")) ing.push("2 hard-boiled eggs, peeled");
    if (has("cherr")) ing.push("½ cup fresh cherries");
    if (has("papaya")) ing.push("½ cup papaya chunks");
    return {
      serves: 1, time: "2 min",
      ingredients: ing,
      steps: ing.length > 1 ? ["Prepare accompaniments — peel eggs, wash fruit.","Arrange jerky and sides on a plate or in a container.","A high-protein, no-cook snack that's perfect for on-the-go."] : ["Open package and enjoy — beef jerky is one of the most portable protein sources.","Pair with water, as jerky can be high in sodium."],
      tip: "Look for jerky with simple ingredients — beef, salt, pepper. Avoid brands with added sugar.",
      nutrition: ["High-quality protein supports neurotransmitter production","Iron supports oxygen delivery to the brain","Zinc supports memory and cognitive function","Portable and shelf-stable for consistent nutrition on busy days"]
    };
  }

  // Hard-boiled egg + fruit combos
  if (has("hard-boiled") || (has("egg") && hasAny("kiwi","strawberr","honeydew","melon"))) {
    const ing = ["2 hard-boiled eggs, peeled"];
    if (has("kiwi")) ing.push("2 kiwis, peeled and sliced");
    if (has("strawberr")) ing.push("½ cup strawberries");
    if (has("honeydew") || has("melon")) ing.push("1 cup honeydew melon, cubed");
    ing.push("Pinch of salt and pepper");
    return {
      serves: 1, time: "15 min (including boiling)",
      ingredients: ing,
      steps: ["Place eggs in a saucepan, cover with cold water by 1 inch.","Bring to a rolling boil, then cover, remove from heat, and let sit 10–12 minutes.","Transfer to ice water for 2 minutes. Peel under running water.","Slice eggs and arrange with prepared fruit. Season with salt and pepper."],
      tip: "Older eggs (7+ days) peel much more easily than fresh ones.",
      nutrition: ["Choline in egg yolks supports acetylcholine for memory","Complete protein with all essential amino acids","Vitamin D supports mood regulation","Lutein and zeaxanthin support brain processing speed"]
    };
  }

  // Fruit + deli meat / strips combos (simple no-cook protein + fruit snacks)
  if (hasAny("deli turkey","turkey roll","chicken strip","turkey strip","turkey slice","chicken jerky") && !isSandwich && !isWrap && !isSalad && !isBowl) {
    const fruitIng = [];
    if (has("strawberr")) fruitIng.push("½ cup fresh strawberries");
    if (has("honeydew")) fruitIng.push("1 cup honeydew melon, cubed");
    if (hasMango) fruitIng.push("½ cup fresh mango, sliced");
    if (hasApple) fruitIng.push("1 medium apple, sliced");
    if (has("pineapple")) fruitIng.push("1 cup pineapple chunks");
    if (has("grape")) fruitIng.push("½ cup grapes");
    if (fruitIng.length === 0) fruitIng.push("½ cup fresh seasonal fruit");
    const meat = has("chicken") ? "4–5 grilled chicken strips or chicken jerky" : "3–4 slices deli turkey";
    return {
      serves: 1, time: "3 min",
      ingredients: [...fruitIng, meat, "Optional: mustard or hummus for dipping"],
      steps: ["Wash and prepare fruit — slice, peel, or arrange as needed.","Roll or arrange deli meat on a plate alongside fruit.","Dip in mustard or hummus if desired. A simple, high-protein snack."],
      tip: "Look for deli meat with no added nitrates — it's cleaner protein.",
      nutrition: ["Lean protein supports dopamine and serotonin synthesis","Fresh fruit provides antioxidants and quick energy","Low-calorie, high-satiety combination","Vitamin C from fruit enhances iron absorption from meat"]
    };
  }

  // Bacon & cheese roll-up
  if (has("bacon") && has("roll-up")) {
    return {
      serves: 1, time: "10 min",
      ingredients: ["4 strips bacon","2 oz cheese, sliced"],
      steps: ["Cook bacon in a skillet over medium heat 4–5 minutes per side until crispy.","Drain on paper towels and let cool slightly.","Wrap each cheese slice around a bacon strip.","Enjoy warm — the residual heat from bacon softens the cheese perfectly."],
      tip: "Start bacon in a cold pan — it renders fat more evenly and cooks more uniformly.",
      nutrition: ["Protein supports neurotransmitter production","Healthy fats support satiety between meals","Calcium from cheese supports neural signaling","Zero carbs keeps blood sugar stable"]
    };
  }

  // Cornbread muffin + egg
  if (hasCornbread && has("egg")) {
    return {
      serves: 1, time: "20 min",
      ingredients: ["1 cornbread muffin (store-bought or from mix)","2 hard-boiled eggs, peeled","1 tsp butter","Pinch of salt and pepper"],
      steps: ["If baking: prepare cornbread muffin per package directions (about 15 min at 400°F).","Boil eggs: cover with cold water, bring to boil, remove from heat, cover 10 min. Ice bath.","Warm cornbread muffin with a pat of butter.","Peel and halve eggs. Season with salt and pepper. Serve alongside warm cornbread."],
      tip: "Jiffy cornbread mix is cheap, fast, and makes excellent muffins in under 15 minutes.",
      nutrition: ["Eggs provide choline for acetylcholine and memory","Cornbread provides complex carbs for sustained brain energy","Protein from eggs supports neurotransmitter synthesis","Iron from egg yolks supports oxygen delivery to the brain"]
    };
  }

  // Mac & Cheese
  if (has("mac & cheese") || has("mac and cheese")) {
    const ing = ["8 oz elbow macaroni or shell pasta","2 cups shredded cheddar cheese","2 tbsp butter","2 tbsp all-purpose flour","2 cups whole milk","½ tsp mustard powder","Salt and pepper to taste"];
    if (has("broccoli")) ing.push("1 cup broccoli florets, steamed");
    if (has("chicken")) ing.push("1 grilled chicken breast (6 oz), sliced");
    return {
      serves: 2, time: "25 min",
      ingredients: ing,
      steps: ["Cook pasta according to package directions until al dente. Drain and set aside.","In the same pot, melt butter over medium heat. Whisk in flour and cook 1 minute to form a roux.","Gradually whisk in milk, stirring constantly until smooth and thickened, about 3–4 minutes.","Remove from heat and stir in shredded cheese, mustard powder, salt, and pepper until smooth.","Add drained pasta back to the pot and stir to coat evenly with cheese sauce.","Serve in bowls with steamed broccoli and grilled chicken on the side if using."],
      tip: "A splash of pasta cooking water in the cheese sauce makes it silkier — the starch acts as an emulsifier.",
      nutrition: ["Calcium from cheese supports neural signaling","Tryptophan from dairy supports serotonin production","Complex carbs from pasta provide sustained brain energy","Protein from cheese supports neurotransmitter production"]
    };
  }

  // Miso Soup
  if (has("miso")) {
    const ing = ["2 cups water","2 tbsp white or yellow miso paste","4 oz silken or soft tofu, cubed","2 tbsp dried wakame seaweed","2 scallions, thinly sliced"];
    if (hasRice) ing.push("1 cup cooked brown or white rice");
    return {
      serves: 1, time: "10 min",
      ingredients: ing,
      steps: ["Bring water to a gentle simmer (not a full boil — boiling destroys miso's beneficial probiotics).","Add dried wakame and let it rehydrate for 2 minutes.","Add tofu cubes and warm through for 1–2 minutes.","Remove pot from heat. Dissolve miso paste in a ladleful of warm broth, then stir back into the pot.","Ladle into a bowl and top with sliced scallions. Serve with rice on the side if using."],
      tip: "Never boil miso — the live cultures (probiotics) that benefit your gut-brain axis are killed by high heat.",
      nutrition: ["Probiotics from fermented miso support the gut-brain axis","Seaweed provides iodine for thyroid and brain function","Tofu provides gentle plant protein","Isoflavones from soy have neuroprotective properties"]
    };
  }

  // Tomato Soup + Grilled Cheese
  if (has("tomato soup")) {
    const ing = ["1 can (28 oz) crushed tomatoes","1 cup vegetable or chicken broth","2 tbsp butter","1 small onion, diced","2 cloves garlic, minced","½ tsp dried basil","Salt and pepper to taste"];
    if (has("grilled cheese")) ing.push("4 slices whole grain bread","2 oz cheddar or gruyère cheese, sliced","1 tbsp butter for grilling");
    return {
      serves: 2, time: "25 min",
      ingredients: ing,
      steps: ["Melt butter in a saucepan over medium heat. Sauté onion 4–5 minutes until soft. Add garlic, cook 1 minute.","Add crushed tomatoes, broth, and basil. Bring to a simmer and cook 15 minutes.","Blend with an immersion blender until smooth (or leave chunky). Season with salt and pepper.",has("grilled cheese") ? "While soup simmers, butter bread slices. Layer cheese between two slices. Grill in a skillet over medium heat 3–4 minutes per side until golden and cheese melts." : "Ladle into bowls and serve hot.","Serve soup in bowls alongside grilled cheese sandwiches. Dip and enjoy."],
      tip: "A pinch of sugar cuts the acidity of canned tomatoes and makes the soup taste more homemade.",
      nutrition: ["Lycopene from tomatoes is a powerful antioxidant for brain health","Vitamin C supports neurotransmitter synthesis","Calcium from cheese supports neural signaling","Comfort food promotes positive emotional associations with nourishment"]
    };
  }

  // Oat & Banana Mini Muffins
  if (has("muffin") && hasAny("oat","banana")) {
    const ing = ["1½ cups rolled oats","2 ripe bananas, mashed","1 egg","¼ cup honey or maple syrup","1 tsp baking powder","½ tsp cinnamon","¼ tsp salt","2 tbsp melted coconut oil or butter"];
    if (has("chocolate") || has("chip")) ing.push("¼ cup mini dark chocolate chips");
    if (hasBlueberry) ing.push("½ cup blueberries");
    return {
      serves: 12, time: "25 min",
      ingredients: ing,
      steps: ["Preheat oven to 350°F. Grease a mini muffin tin or line with paper cups.","Blend oats in a blender or food processor until they form a coarse flour.","In a bowl, mash bananas. Mix in egg, honey, melted oil, cinnamon, baking powder, and salt.","Stir oat flour into wet ingredients until just combined. Fold in chocolate chips or blueberries if using.","Fill muffin cups about ¾ full. Bake 15–18 minutes until golden and a toothpick comes out clean.","Cool in pan 5 minutes before transferring to a wire rack."],
      tip: "These freeze beautifully — make a batch on Sunday and thaw 2–3 each morning for an easy breakfast.",
      nutrition: ["Complex carbs from oats provide sustained brain energy","Potassium from banana supports nerve signaling","Egg adds choline for memory support","Naturally sweetened with fruit and minimal added sugar"]
    };
  }

  // (hasKimchi moved to detection section above)

  // Now build steps intelligently
  const prepSteps = [];
  const cookSteps = [];
  const finishSteps = [];

  // Prep steps
  if (hasRice) { prepSteps.push("Rinse rice under cold water. Combine with broth in a saucepan, bring to boil, cover and simmer on low 18 minutes. Fluff with a fork."); totalTime = Math.max(totalTime, 25); }
  if (hasQuinoa) { prepSteps.push("Rinse quinoa in a fine mesh strainer. Combine with water/broth in a saucepan, bring to boil, reduce to simmer, cover 15 minutes. Let stand 5 minutes then fluff."); totalTime = Math.max(totalTime, 20); }
  if (hasSweet && !isCasserole && !isStuffed) { prepSteps.push("Preheat oven to 425°F. Cube sweet potato into 1-inch pieces, toss with 1 tbsp olive oil, salt, garlic powder. Spread on a baking sheet — roast 25 minutes, flipping halfway, until caramelized."); totalTime = Math.max(totalTime, 35); }
  if (hasPotato && !isCasserole && !isHash) { prepSteps.push("Cube potatoes into 1-inch pieces. Toss with olive oil, salt, garlic powder, and rosemary. Roast at 425°F 25–30 minutes until golden and crispy."); totalTime = Math.max(totalTime, 35); }
  if (hasBroccoli) { prepSteps.push("Toss broccoli florets with 1 tsp olive oil, salt. Either roast at 425°F for 15 minutes until edges char slightly, or steam for 5 minutes until bright green and tender-crisp."); }
  if (hasAsparagus) { prepSteps.push("Snap off the woody ends of asparagus. Toss with olive oil, salt, and pepper. Roast at 425°F 10–12 minutes, or pan-sear in a hot skillet 4–5 minutes."); }
  if (hasSpinach) { prepSteps.push("Rinse spinach thoroughly. Heat 1 tsp oil in a skillet, add spinach, and wilt over medium heat 1–2 minutes with a pinch of garlic. Season with salt."); }

  // Add all prepSteps
  steps.push(...prepSteps);
  // Add protein steps
  steps.push(...proteinSteps);

  // Dish-type assembly steps
  if (isBurrito) {
    steps.push("Warm tortilla in a dry skillet 30 seconds per side or microwave 20 seconds — it needs to be pliable.");
    steps.push("Layer fillings horizontally across the bottom third of the tortilla: protein first, then rice/beans, cheese, and any sauces.");
    steps.push("Fold the two sides in, then roll tightly from the bottom up. Press firmly to seal.");
    steps.push("Optional: toast seam-side down in a dry pan 1 minute per side for a crispy exterior.");
  } else if (isTaco) {
    steps.push("Warm tortillas directly over a gas flame 15–20 seconds per side until lightly charred, or in a dry skillet.");
    steps.push("Stack two tortillas per taco for sturdiness. Fill with protein and toppings.");
    steps.push("Finish with fresh cilantro, a squeeze of lime, and your choice of salsa or hot sauce.");
  } else if (isWrap) {
    steps.push("Warm the tortilla in a dry pan 30 seconds per side.");
    steps.push("Spread any sauce or hummus on the tortilla first, then layer fillings horizontally in the center.");
    steps.push("Fold sides in tightly, roll from bottom. Cut diagonally for a better presentation.");
  } else if (isSandwich) {
    steps.push(has("toast") || has("grilled") ? "Toast bread until golden. A toasted base prevents sogginess." : "If using a bun, lightly toast cut sides for 1–2 minutes.");
    steps.push("Build from the bottom up: spread (mayo, mustard, or avocado), then greens, then protein, then toppings.");
    steps.push("Press gently and serve immediately, or wrap tightly for meal prep.");
  } else if (isCaesar || isSalad) {
    steps.push("Wash and thoroughly dry salad greens — wet leaves dilute dressing.");
    steps.push("Add dressing and toss to coat every leaf. Start with less and add more as needed.");
    steps.push("Slice or add protein on top. Finish with cheese and a crack of black pepper.");
  } else if (isBowl) {
    steps.push("Build your bowl in layers: grain base first (rice, quinoa), then protein, then vegetables arranged separately for visual appeal.");
    steps.push("Drizzle with sauce or dressing. Garnish with fresh herbs, a squeeze of citrus, or sesame seeds.");
  } else if (isSoup || has("chili")) {
    steps.push("Sauté onion and garlic in oil over medium heat until soft, 4–5 minutes.");
    steps.push("Add protein and cook until browned. Add all vegetables and stir.");
    steps.push("Pour in broth. Add spices, beans, or other ingredients. Bring to boil.");
    steps.push("Reduce heat and simmer uncovered 20–25 minutes until flavors meld. Taste and adjust seasoning.");
    totalTime = 35;
  } else if (isFajita) {
    steps.push("Cook onion and bell peppers in the same pan as protein, over high heat, 4–5 minutes until lightly charred.");
    steps.push("Warm tortillas. Fill with protein and peppers.");
    steps.push("Serve with lime wedges, salsa, sour cream, and guacamole on the side.");
  } else if (isQuesadilla) {
    steps.push("Lay a tortilla flat in a dry skillet over medium heat. Add protein and cheese to one half.");
    steps.push("Fold over and press lightly. Cook 2–3 minutes per side until golden and cheese is fully melted.");
    steps.push("Let rest 1 minute before cutting into wedges — this keeps the filling together.");
  } else if (isPasta) {
    steps.push("Cook pasta in salted boiling water according to package directions until al dente. Reserve ½ cup pasta water before draining.");
    if (has("marinara") || has("tomato sauce")) {
      steps.push("While pasta cooks, heat 1 tbsp olive oil in a pan. Add garlic and cook 30 seconds. Add crushed tomatoes or marinara sauce and simmer 10 minutes.");
    }
    steps.push("Add cooked protein to the sauce and stir to combine.");
    steps.push("Toss drained pasta with sauce, adding pasta water as needed for silkiness. Serve immediately.");
    if (has("garlic bread")) steps.push("For garlic bread: spread butter mixed with minced garlic on bread halves, broil 2–3 minutes until golden.");
    totalTime = 25;
  } else if (isStirFry) {
    steps.push("Heat wok or large skillet over highest heat until smoking — high heat is what makes stir-fry taste right.");
    steps.push("Cook vegetables first (2–3 min), then push to sides. Add protein in center.");
    steps.push("Add soy sauce, sesame oil, and ginger. Toss everything together 1–2 minutes.");
    steps.push("Serve immediately over rice or quinoa. Stir-fry waits for no one.");
  } else if (isOmelette) {
    steps.push("Beat eggs vigorously with salt and pepper — proper aeration makes a fluffy omelette.");
    steps.push("Heat butter in an 8-inch non-stick pan over medium-low. Pour in eggs.");
    steps.push("As edges set, lift them gently and tilt pan so uncooked egg flows underneath.");
    steps.push("When top is just barely set but still glossy, add fillings to one half.");
    steps.push("Fold in half and slide onto plate. The residual heat finishes the center.");
    totalTime = 10;
  } else if (isHash) {
    steps.push("Heat oil in a cast iron or non-stick skillet over medium-high.");
    steps.push("Add potatoes or sweet potato first — cook 8–10 minutes without stirring to get a crust.");
    steps.push("Add protein and vegetables. Toss together and cook another 5 minutes.");
    steps.push("Make wells in the hash and crack in eggs if including. Cover and cook 3–4 minutes for set whites.");
  } else if (isSheetPan) {
    steps.push("Preheat oven to 425°F. Line a large sheet pan with parchment paper.");
    steps.push("Arrange protein and vegetables on the sheet pan — keep them in separate zones so each cooks evenly.");
    steps.push("Drizzle everything with olive oil, salt, pepper, and garlic powder.");
    steps.push("Roast 20–25 minutes, checking at 15 min. Protein should be cooked through and veggies caramelized at the edges.");
    steps.push("Serve directly from the pan with rice or quinoa on the side.");
    totalTime = 35;
  } else if (isStuffed) {
    if (hasPepper || has("bell pepper")) {
      steps.push("Cut bell peppers in half lengthwise and remove seeds. Place cut-side up in a baking dish.");
      steps.push("Mix cooked protein with rice, beans, and seasonings to create the filling.");
      steps.push("Stuff each pepper half generously, mounding the filling.");
      steps.push("Top with cheese if using. Cover with foil and bake at 375°F for 25 minutes. Remove foil and bake 10 more minutes.");
    } else if (hasSweet) {
      steps.push("Bake whole sweet potatoes at 400°F for 45–50 minutes until fork-tender.");
      steps.push("While potatoes bake, cook your protein filling with seasonings.");
      steps.push("Cut baked sweet potatoes lengthwise and push sides open. Fluff the interior with a fork.");
      steps.push("Spoon filling generously into each sweet potato. Top with cheese, avocado, or sour cream.");
    }
    totalTime = 50;
  } else if (isBolognese) {
    steps.push("Heat olive oil in a large saucepan. Sauté onion and garlic until soft, 3–4 minutes.");
    steps.push("Add protein (lentils or ground meat) and cook until browned.");
    steps.push("Stir in crushed tomatoes, tomato paste, and Italian herbs. Simmer 20 minutes on low.");
    steps.push("Meanwhile, cook pasta according to package directions. Drain, reserving ½ cup pasta water.");
    steps.push("Toss pasta with bolognese sauce, adding pasta water as needed for silkiness. Serve immediately.");
    totalTime = 35;
  } else if (isTeriyaki) {
    steps.push("In a small saucepan, combine soy sauce, mirin, honey, and ginger. Bring to a simmer.");
    steps.push("Add cornstarch slurry and stir until sauce thickens, about 1–2 minutes. Set aside.");
    steps.push("Cook protein in a hot skillet until done, then pour teriyaki sauce over and toss to coat.");
    steps.push("Serve over rice with steamed vegetables on the side. Garnish with sesame seeds and scallions.");
    totalTime = 25;
  } else if (isGlazed) {
    if (hasPomegranate) {
      steps.push("In a small saucepan, simmer pomegranate juice, honey, and balsamic vinegar over medium heat 8–10 minutes until reduced to a thick, syrupy glaze.");
      steps.push("Cook protein as directed. During the last 2 minutes, brush generously with pomegranate glaze.");
      steps.push("Let glaze caramelize slightly — it should be shiny and sticky.");
      steps.push("Plate protein over your starch, drizzle remaining glaze on top, and scatter fresh pomegranate arils.");
    } else {
      steps.push("Prepare glaze by simmering sauce ingredients until thickened.");
      steps.push("Brush protein with glaze during the last 2–3 minutes of cooking.");
      steps.push("Plate and drizzle remaining glaze over everything.");
    }
    totalTime = 30;
  }

  // Finish steps
  if (hasWatermelon || hasMango || hasBanana || hasApple || hasBerry) {
    finishSteps.push("Prepare fresh fruit just before serving — it's the bright, refreshing counterpoint to the savory elements.");
  }
  finishSteps.push("Plate and finish with a squeeze of fresh lemon or lime to brighten all the flavors.");
  steps.push(...finishSteps);

  // ── Nutritional highlights ─────────────────────────────────────────────────
  const nutrition = [];
  if (protein === "salmon") nutrition.push("Rich in EPA/DHA omega-3s — shown to reduce depression symptoms");
  if (protein === "chicken" || protein === "turkey") nutrition.push("Complete protein supports serotonin and dopamine production");
  if (protein === "steak" || protein === "ground beef") nutrition.push("Heme iron and zinc — critical for neurotransmitter synthesis");
  if (protein === "egg") nutrition.push("Choline in yolks supports acetylcholine (memory & focus)");
  if (protein === "lentil" || protein === "chickpea") nutrition.push("Plant protein + folate for serotonin pathway support");
  if (hasSpinach || hasKale) nutrition.push("Folate & magnesium — key for mood regulation and stress response");
  if (hasSweet) nutrition.push("Beta-carotene & B6 support brain health and mood");
  if (hasAvocado) nutrition.push("Monounsaturated fats support myelin sheath & cognitive function");
  if (hasPomegranate) nutrition.push("Punicalagins in pomegranate reduce neuroinflammation & support memory");
  if (hasTurmeric) nutrition.push("Curcumin in turmeric crosses the blood-brain barrier and reduces neuroinflammation");
  if (hasKimchi) nutrition.push("Probiotics from fermented kimchi support the gut-brain axis and serotonin production");
  if (hasBroccoli) nutrition.push("Sulforaphane reduces neuroinflammation (NF-κB pathway)");
  if (hasBlueberry || hasBerry) nutrition.push("Anthocyanins cross the blood-brain barrier and reduce oxidative stress");
  if (hasWalnut) nutrition.push("Plant-based omega-3 (ALA) and polyphenols support brain structure");
  if (hasRice || hasQuinoa) nutrition.push(hasQuinoa ? "Complete protein grain with all 9 essential amino acids" : "Complex carbs provide steady glucose — the brain's primary fuel");
  if (hasBeans) nutrition.push("Resistant starch feeds gut bacteria that produce mood-regulating neurotransmitters");
  if (nutrition.length === 0) nutrition.push("Whole-food ingredients support a healthy gut-brain axis");

  // ── Tip ───────────────────────────────────────────────────────────────────
  const tips = [];
  if (protein === "chicken") tips.push("A meat thermometer (165°F) guarantees juicy chicken every time — guessing leads to overcooking.");
  if (protein === "steak") tips.push("Slicing against the grain is the single biggest difference between tough and tender beef.");
  if (protein === "salmon") tips.push("Pull salmon off heat when it's still slightly translucent in the center — carryover heat finishes it.");
  if (hasRice) tips.push("Never lift the lid while rice is cooking — the steam is doing all the work.");
  if (hasQuinoa) tips.push("Rinsing quinoa removes saponins, which can make it taste bitter.");
  if (isOatmeal) tips.push("Rolled oats (not instant) keep you full longer due to lower glycemic impact.");
  if (isBurrito) tips.push("Wrapping tightly in foil for 2 minutes lets the burrito steam itself perfectly together.");
  if (isSalad) tips.push("Dress salad right before eating — it wilts fast once dressed.");
  if (hasBroccoli) tips.push("A little char on roasted broccoli is actually the goal — it's where the flavour is.");
  if (tips.length === 0) tips.push("Prep all your ingredients before you start cooking — it makes everything faster and less stressful.");

  const finalTime = totalTime <= 10 ? `${totalTime} min` : totalTime <= 20 ? `${totalTime} min` : `${totalTime}–${totalTime+10} min`;

  return {
    serves: 1,
    time: finalTime,
    ingredients: ingredients.filter(i => i && i.trim()),
    steps: steps.filter(Boolean),
    tip: tips[0] || "",
    nutrition,
  };
};

const getRecipe = (meal) => {
  const allRecipes = { ...RECIPES, ...RECIPES_EXTENDED };
  if (allRecipes[meal]) {
    // Add nutrition highlights to existing recipes if missing
    const r = allRecipes[meal];
    if (!r.nutrition) r.nutrition = generateRecipe(meal).nutrition;
    return r;
  }
  return generateRecipe(meal);
};


// ── Daily Routine Data ────────────────────────────────────────────────────
const DAILY_ROUTINES = {
  adhd: {
    label:"ADHD", morning:[
      { time:"5 min",  title:"Body Wake-Up",        desc:"Splash cold water on your face and do 10 jumping jacks. ADHD brains need physical activation before cognitive tasks — movement spikes norepinephrine faster than any alarm." },
      { time:"5 min",  title:"Today's One Thing",   desc:"Write down the single most important task for today. Just one. The ADHD brain overloads on lists — anchor your day to one non-negotiable priority." },
      { time:"10 min", title:"Protein-First Breakfast", desc:"Eat your NeuroThrive breakfast before checking your phone. Protein stabilises dopamine before the day's stimuli hijack your attention." },
      { time:"3 min",  title:"Timer-Start Ritual",  desc:"Set a visible timer for your first task. Externalising time is one of the most evidence-backed ADHD tools — your brain cannot intuit time passing." },
      { time:"2 min",  title:"Body Double Setup",   desc:"Tell someone what you're working on. ADHD focus dramatically increases when another presence — even virtual — is nearby." },
    ], evening:[
      { time:"5 min",  title:"Brain Dump",          desc:"Write everything in your head onto paper. Externalise the mental noise so your brain isn't trying to 'hold' it all overnight." },
      { time:"3 min",  title:"Tomorrow's Anchor",   desc:"Write the one thing you need to do first tomorrow and put it somewhere visible. Pre-deciding removes morning friction." },
      { time:"10 min", title:"Wind-Down Screen Cut",desc:"Put your phone in another room 30 minutes before sleep. ADHD brains are more sensitive to blue light's dopamine stimulation." },
      { time:"5 min",  title:"What Worked",         desc:"Name one thing you did well today. ADHD brains are hardwired to notice failures — actively seeking wins retrains the self-narrative." },
    ],
  },
  anxiety: {
    label:"Anxiety", morning:[
      { time:"5 min",  title:"Grounding First",     desc:"Before checking your phone: name 5 things you see, 4 you hear, 3 you can touch. Anxiety wakes up faster than you do — grounding anchors you in the present." },
      { time:"5 min",  title:"Slow Morning Breath", desc:"4 counts in, 4 hold, 6 counts out. Repeat 5 times. The extended exhale activates the parasympathetic nervous system, lowering cortisol within minutes." },
      { time:"10 min", title:"No-News Breakfast",   desc:"Eat your NeuroThrive breakfast without news or social media. Anxiety brains are threat-scanning by default — inputs matter enormously in the first 30 minutes." },
      { time:"5 min",  title:"Today's Worry Slot",  desc:"Write your worries down and close the notebook. Schedule your 'official' worry time for later (say, 4pm). This is one of the most evidence-backed CBT techniques for reducing all-day rumination." },
      { time:"3 min",  title:"Calm Intention",      desc:"Set one calm, achievable intention: 'Today I will do one thing at a time.' Not a goal. A quality of presence." },
    ], evening:[
      { time:"5 min",  title:"Scheduled Worry Time",desc:"This is the worry slot you set this morning. Write your worries for 5 minutes, then close the notebook. Contained worry prevents it expanding into the whole evening." },
      { time:"10 min", title:"Magnesium & Warm Drink",desc:"Take your magnesium supplement with chamomile tea. Magnesium activates GABA receptors — the brain's calm switch. Chamomile's apigenin does the same." },
      { time:"5 min",  title:"Body Scan",           desc:"Lying down, slowly notice each body part without trying to change anything. Anxiety lives in the body — this practice teaches you to observe physical sensations without them becoming thoughts." },
      { time:"3 min",  title:"What Was Safe Today", desc:"Name three things that were fine today. Not great — just fine. Anxiety brains overweight threats; noticing safety rewires threat-detection over time." },
    ],
  },
  depression: {
    label:"Depression", morning:[
      { time:"2 min",  title:"Feet on the Floor",   desc:"The goal is not to feel good. The goal is feet on the floor. That's the entire morning goal. Everything else comes after that." },
      { time:"5 min",  title:"Light Exposure",      desc:"Open a window or step outside for 5 minutes. Morning light resets the cortisol awakening response — the brain's natural 'wake up' signal that depression suppresses." },
      { time:"10 min", title:"Breakfast — Non-Negotiable", desc:"Eat your NeuroThrive breakfast even if you're not hungry. Skipping meals makes both energy and mood worse. Tryptophan at breakfast starts serotonin synthesis for the day." },
      { time:"5 min",  title:"One Micro-Commitment",desc:"Text one person or do one 5-minute task. Depression thrives in isolation and inaction. The smallest action breaks the loop." },
      { time:"2 min",  title:"Compassionate Self-Talk", desc:"Say out loud or write: 'I am doing the best I can today.' Depression's inner critic is relentless — consciously pushing back matters neurologically." },
    ], evening:[
      { time:"5 min",  title:"Three Things You Did",desc:"Not three things you're grateful for. Three things you did today. Getting out of bed counts. Eating counts. Showing up here counts." },
      { time:"10 min", title:"Gentle Movement",     desc:"10 minutes of slow walking or gentle stretching. Exercise is the most evidenced natural antidepressant — even 10 minutes of gentle movement increases BDNF." },
      { time:"5 min",  title:"Tomorrow's First Step",desc:"Name one thing — just one — you'll do first tomorrow. Reduces decision fatigue and creates a tiny sense of forward momentum." },
      { time:"3 min",  title:"Sleep Anchor",        desc:"Same bedtime every night. Depression disrupts the circadian rhythm, which worsens mood. Consistent sleep timing is one of the most powerful and underused mood interventions." },
    ],
  },
  bipolar: {
    label:"Bipolar Disorder", morning:[
      { time:"3 min",  title:"Mood Calibration",    desc:"Rate your mood 1–10 before anything else. Mood tracking is the single most important self-management tool in bipolar — it catches early warning signs before they become episodes." },
      { time:"5 min",  title:"Routine Anchor",      desc:"Same wake time every day, including weekends. Circadian rhythm disruption is a primary bipolar trigger — consistency here has more evidence than almost any lifestyle intervention." },
      { time:"10 min", title:"Stabilising Breakfast",desc:"Eat your NeuroThrive breakfast. Blood sugar instability is a mood cycling trigger. Never skip breakfast — it sets glucose stability for the whole day." },
      { time:"5 min",  title:"Stimulation Check",   desc:"Is today's plan overstimulating (hypomania risk) or understimulating (depression risk)? Adjust one commitment if needed. Proactive pacing is core bipolar management." },
      { time:"2 min",  title:"Anchor Intention",    desc:"Set one grounded, calm intention. Not an ambitious goal. A steady one. 'Today I will stay at a 6.' Stability is the win." },
    ], evening:[
      { time:"5 min",  title:"End-of-Day Mood Log", desc:"Record today's mood rating, energy level, sleep quality, and any warning signs. This data, tracked consistently, becomes your personal early warning system." },
      { time:"10 min", title:"Sleep Ritual — Non-Negotiable", desc:"Same bedtime, same routine. Sleep deprivation is the most consistent manic trigger known. One night of poor sleep can begin an upswing." },
      { time:"5 min",  title:"Stimulation Wind-Down",desc:"Dim lights, no screens, no intense conversations after 9pm. The hypomanic brain is hyper-responsive to stimuli — controlling your environment is prophylactic mood medicine." },
      { time:"3 min",  title:"Tomorrow Moderation Check", desc:"Look at tomorrow's calendar. Remove anything that feels exciting-but-too-much. Impulse commitments made during stable periods often look different in hindsight." },
    ],
  },
  ptsd: {
    label:"PTSD", morning:[
      { time:"5 min",  title:"Safe Environment Check", desc:"Open your eyes slowly. Notice: I am in my room. It is safe. PTSD keeps the nervous system primed for danger — a conscious safety acknowledgment shifts the brain from threat mode to present-moment mode." },
      { time:"5 min",  title:"Grounding Practice",  desc:"Hold something cold or textured for 30 seconds. Physical grounding interrupts hyperarousal and signals to the nervous system that the present is not the past." },
      { time:"10 min", title:"Nourishing Breakfast", desc:"Eat your NeuroThrive breakfast before outside stimuli. Chronic PTSD elevates cortisol — skipping breakfast spikes it further. Consistent eating helps regulate the stress hormone rhythm." },
      { time:"5 min",  title:"Today's Capacity",    desc:"Honestly assess your window of tolerance today. What is manageable? Proactively communicating your capacity prevents re-traumatisation from overwhelm." },
      { time:"3 min",  title:"Resource Reminder",   desc:"Name three people, places, or things that feel safe to you. Consciously activating your safety network activates the vagal system and lowers threat response." },
    ], evening:[
      { time:"5 min",  title:"Containment Practice",desc:"Imagine placing today's difficult moments in a container and closing it. This grounds and schedules processing to therapy time rather than avoiding it." },
      { time:"10 min", title:"Body Safety Scan",    desc:"Slowly scan your body, noticing areas of tension without trying to change them. PTSD stores trauma in the body — noticing without reacting builds the tolerance capacity therapy depends on." },
      { time:"5 min",  title:"Tomorrow's Safe Plan",desc:"Identify any potential triggers in tomorrow's schedule. Make one small adjustment if possible. Proactive planning reduces the element of surprise that activates trauma responses." },
      { time:"3 min",  title:"Today's Small Brave Thing", desc:"Name one thing you did today that took courage — however small. Noticing acts of courage, however tiny, rebuilds the self-image that trauma contracts." },
    ],
  },
  ocd: {
    label:"OCD", morning:[
      { time:"5 min",  title:"Delay Practice",      desc:"When the first compulsion or checking urge arrives — delay it by 5 minutes. This builds the neural pathway that separates urge from action, which is the core skill ERP therapy develops." },
      { time:"5 min",  title:"Uncertainty Acceptance", desc:"Say out loud: 'I don't know for certain that everything is okay. That's okay.' OCD demands certainty — practising tolerance of uncertainty literally retrains the OCD circuit." },
      { time:"10 min", title:"Structured Breakfast", desc:"Eat your NeuroThrive breakfast at the same time each day without rituals. A predictable, non-ritualistic routine gives the OCD brain structure without feeding the compulsion cycle." },
      { time:"3 min",  title:"Today's ERP Goal",    desc:"Name one small exposure you'll practise today — something your OCD avoids. This, repeated daily, changes OCD more than any other intervention." },
      { time:"2 min",  title:"Thought Labelling",   desc:"When an intrusive thought arrives: 'That's an OCD thought. I don't have to act on it.' Defusion from intrusive thoughts is a core ACT technique for OCD." },
    ], evening:[
      { time:"5 min",  title:"ERP Reflection",      desc:"Did you approach your exposure today? Write it down. The evidence that anxiety goes down when you don't compulse is what your brain needs to see accumulated over time." },
      { time:"5 min",  title:"Intrusive Thought Log",desc:"Write any particularly strong intrusive thoughts today — without acting on them. Externalising them reduces their felt urgency." },
      { time:"3 min",  title:"Compassion Practice", desc:"OCD is not your fault. It is a neurological condition, not a character flaw. The shame OCD generates is one of its most damaging components." },
      { time:"5 min",  title:"Tomorrow's Intention",desc:"Name one intrusive thought or compulsion you will not act on tomorrow. Pre-commitment reduces decision load when anxiety is high." },
    ],
  },
  bpd: {
    label:"Borderline PD", morning:[
      { time:"5 min",  title:"Baseline Emotion Check", desc:"Name the emotion you woke up with. Just name it — don't judge it. Emotion identification reduces emotional intensity by engaging the prefrontal cortex — the first skill in DBT." },
      { time:"5 min",  title:"PLEASE Skill Check",  desc:"PhysicaL illness, Eating, Avoid substances, Sleep, Exercise. BPD emotional vulnerability skyrockets when any of these is off — this check is your early warning system." },
      { time:"10 min", title:"Regulating Breakfast", desc:"Eat your NeuroThrive breakfast. Blood sugar is one of the most direct drivers of emotional reactivity — stable glucose reduces the amplitude of emotional swings." },
      { time:"3 min",  title:"Today's Opposite Action", desc:"Name one emotion you're likely to feel today and its opposite action. If shame, reach out instead of withdrawing. Pre-deciding reduces impulsive responses." },
      { time:"2 min",  title:"Wise Mind Check",     desc:"Ask: 'What would Wise Mind do today?' Not Emotion Mind. Not Reasonable Mind. The place between them. The orienting question for your whole day." },
    ], evening:[
      { time:"5 min",  title:"Emotion Thermometer", desc:"Rate the intensity of your emotional experience today 1–10. Tracking externalises emotions and, over weeks, reveals patterns that therapy can work with." },
      { time:"5 min",  title:"Effectiveness Review",desc:"Was your behaviour today effective — did it move you toward your values? Not was it justified. Effective. This DBT question builds self-regulation over reactivity." },
      { time:"3 min",  title:"Repair Plan",         desc:"If any relationship damage happened today, name one small repair action for tomorrow. Proactive repair prevents accumulation of disconnection." },
      { time:"5 min",  title:"Self-Soothe",         desc:"Use one sense to soothe: a warm shower, a candle, a favourite song at low volume. Sensory self-soothing is a direct DBT distress tolerance skill." },
    ],
  },
  autism: {
    label:"Autism Spectrum", morning:[
      { time:"5 min",  title:"Predictable Start",   desc:"Same routine every morning in the same order. Predictability reduces the cognitive and sensory load of mornings — preserving executive function for the day's actual demands." },
      { time:"5 min",  title:"Sensory Check",       desc:"Before leaving: clothing comfortable? Lighting okay? Sound manageable? Proactively addressing sensory needs prevents the cumulative dysregulation that builds invisibly throughout the day." },
      { time:"10 min", title:"Sensory-Safe Breakfast", desc:"Eat your NeuroThrive breakfast — familiar textures, predictable flavours. The gut-brain axis is particularly relevant in autism: digestive comfort directly affects sensory tolerance." },
      { time:"5 min",  title:"Today's Social Demands", desc:"Look at today's schedule for social interactions. Mentally prepare. Masking is exhausting — knowing in advance allows you to conserve energy and plan recovery time." },
      { time:"3 min",  title:"Special Interest Anchor", desc:"Briefly engage with your special interest for 3 minutes. Starting the day with something that brings genuine pleasure activates dopamine in a grounding, stabilising way." },
    ], evening:[
      { time:"10 min", title:"Decompression Time",  desc:"Stimming, silence, or a favourite repetitive activity with no demands. Autistic nervous systems carry a higher load of sensory and social processing — decompression is neurological maintenance." },
      { time:"5 min",  title:"Energy Accounting",   desc:"What cost energy today? What restored it? Tracking this builds self-knowledge that allows you to pace your life in a way that prevents burnout." },
      { time:"5 min",  title:"Sensory Wind-Down",   desc:"Dim lights, reduce sounds, change into comfortable clothing. Sensory inputs significantly affect sleep onset for autistic individuals — the transition to low stimulation should be gradual." },
      { time:"3 min",  title:"Tomorrow Preview",    desc:"Look at tomorrow briefly. Any surprises or changes? Knowing tonight reduces the shock-processing load in the morning, when regulation is already more effortful." },
    ],
  },
  neuro_core: {
    label:"Neuro Core Plan", morning:[
      { time:"5 min",  title:"Hydration First",     desc:"Drink a full glass of water before anything else. The brain loses water overnight — even mild dehydration reduces cognitive performance, mood, and reaction time within hours." },
      { time:"10 min", title:"Brain-Boosting Breakfast", desc:"Eat your NeuroThrive breakfast without screens. The prefrontal cortex runs on glucose — the quality of your first meal sets its performance ceiling for the morning." },
      { time:"5 min",  title:"Morning Sunlight",    desc:"Step outside or look out a bright window for 5 minutes. Morning light sets your circadian clock, triggers the cortisol awakening response, and begins melatonin suppression that keeps you alert." },
      { time:"5 min",  title:"Movement Activation", desc:"10 jumping jacks or a short walk. Even 5 minutes of exercise increases BDNF — the brain's growth factor — by measurable amounts. Movement improves focus and learning for hours afterward." },
      { time:"3 min",  title:"Today's Focus Intention", desc:"Write one specific outcome you want from today. This activates the reticular activating system, which filters information to support your stated goal." },
    ], evening:[
      { time:"5 min",  title:"Cognitive Wind-Down", desc:"Stop complex mental work 60 minutes before bed. The prefrontal cortex takes time to shift to resting mode — working until sleep reduces sleep quality and memory consolidation." },
      { time:"5 min",  title:"What You Learned Today", desc:"Name one thing you learned or noticed today. Memory consolidation during sleep is strengthened when you consciously review experiences before sleeping." },
      { time:"10 min", title:"Sleep Preparation",   desc:"Dim all lights 30–60 minutes before bed. Blue light suppresses melatonin for up to 3 hours. Sleep is when the brain clears neurotoxic waste — protecting it is the most underrated brain optimisation strategy." },
      { time:"3 min",  title:"Tomorrow's Brain Fuel", desc:"Think briefly about what you'll eat tomorrow. Pre-deciding your first meal removes morning decision fatigue that reduces willpower before the day has started." },
    ],
  },
  schizophrenia: {
    label:"Schizophrenia", morning:[
      { time:"5 min",  title:"Reality Anchor",      desc:"Look around and name 5 things you can see, their colours, and where they are. This grounding technique strengthens the prefrontal cortex's reality-testing circuits, which are your strongest tool against perceptual distortions." },
      { time:"3 min",  title:"Medication Check",    desc:"Take your medication at the same time every day. Antipsychotics work best at steady blood levels — consistency is as important as the medication itself." },
      { time:"10 min", title:"Nourishing Breakfast", desc:"Eat your NeuroThrive breakfast. Antipsychotic medications can affect metabolism — nutrient-dense meals support brain function and counteract metabolic side effects." },
      { time:"5 min",  title:"Routine Structure",   desc:"Review today's plan. Write down 3 things to do, in order. Structure reduces cognitive load and provides external scaffolding when executive function is challenged." },
      { time:"2 min",  title:"Support Check-In",    desc:"Text or call one trusted person. Social connection activates oxytocin pathways that buffer stress and reduce symptom severity." },
    ], evening:[
      { time:"5 min",  title:"Day Review",          desc:"Write down what you did today — even small things count. Tracking real accomplishments counters the negative symptoms that minimize your own agency." },
      { time:"5 min",  title:"Sensory Wind-Down",   desc:"Reduce noise and bright lights. Sensory overload is a common trigger — creating a calm environment supports the brain's ability to shift into rest mode." },
      { time:"5 min",  title:"Sleep Hygiene",       desc:"Same bedtime every night. Sleep disruption worsens positive and negative symptoms. Melatonin and circadian consistency are protective." },
      { time:"3 min",  title:"Tomorrow's Structure", desc:"Write down tomorrow's first 3 steps. Pre-planning reduces morning confusion and builds a reliable scaffold for each day." },
    ],
  },
  did: {
    label:"DID", morning:[
      { time:"5 min",  title:"Gentle Orientation",  desc:"Before getting up, notice your body in bed. Name where you are, today's date, and your name. Dissociative mornings can feel disorienting — this anchors you to the present without forcing it." },
      { time:"5 min",  title:"Internal Check-In",   desc:"Take a moment to notice how you feel inside. Is there tension, emotion, or a sense of someone else being close to the front? Acknowledging internal states builds co-consciousness over time." },
      { time:"10 min", title:"Comforting Breakfast", desc:"Eat your NeuroThrive breakfast slowly. Food is grounding — the sensory experience of eating anchors you in your body and the present moment." },
      { time:"3 min",  title:"Today's Plan",        desc:"Write today's priorities in a shared journal or note that all parts can see. Shared communication reduces inter-part conflict and builds internal cooperation." },
      { time:"2 min",  title:"Safety Affirmation",  desc:"Say or write: 'We are safe. It is [today's date]. The body is [age].' Orienting to present safety is the foundation of DID recovery." },
    ], evening:[
      { time:"5 min",  title:"Parts Check-In",      desc:"Take a moment to notice who was present today. What did each part experience? Acknowledging all parts reduces internal conflict and builds the cooperative foundation of healing." },
      { time:"5 min",  title:"Grounding Ritual",    desc:"Hold something with texture — a blanket, a smooth stone, a warm mug. Sensory grounding prevents nighttime dissociation and helps the body feel safe before sleep." },
      { time:"5 min",  title:"Journal for the System", desc:"Write a brief note to any parts who might come forward tonight. Even a line of reassurance — 'We are safe at home' — reduces nighttime distress." },
      { time:"3 min",  title:"Safe Sleep Setup",    desc:"Consistent bedtime, same bed position, same blanket. Predictability signals safety to the nervous system and reduces the nighttime switching that disrupts rest." },
    ],
  },
  npd: {
    label:"Narcissistic PD", morning:[
      { time:"5 min",  title:"Honest Self-Check",   desc:"Before the day starts, notice how you actually feel — not how you want to appear. Vulnerability is not weakness. The prefrontal cortex grows stronger when you practice authentic self-awareness." },
      { time:"5 min",  title:"Empathy Intention",   desc:"Set one intention to genuinely listen to someone today without redirecting to yourself. The anterior cingulate cortex — the empathy circuit — strengthens with deliberate practice." },
      { time:"10 min", title:"Balanced Breakfast",   desc:"Eat your NeuroThrive breakfast. Omega-3s and tryptophan support the serotonin system that modulates emotional regulation and reduces interpersonal reactivity." },
      { time:"3 min",  title:"Realistic Goal",      desc:"Set one achievable goal — not a grandiose one. Practicing realistic self-appraisal builds the prefrontal circuits that ground identity in reality rather than fantasy." },
      { time:"2 min",  title:"Gratitude for Others", desc:"Name one specific thing someone else did well recently. Acknowledging others' value activates the temporoparietal junction — the brain region for perspective-taking." },
    ], evening:[
      { time:"5 min",  title:"Honest Reflection",   desc:"What went well today AND where could you have been kinder? Both matter. Growth happens in the space between self-compassion and honest accountability." },
      { time:"5 min",  title:"Connection Review",    desc:"Think about one interaction today. How did the other person feel? Not how you looked — how they felt. This builds the neural pathways of empathy." },
      { time:"5 min",  title:"Vulnerability Practice", desc:"Write one thing you're genuinely struggling with. Not performing — actually feeling. The brain's reward system recalibrates when authenticity replaces performance." },
      { time:"3 min",  title:"Calm Sleep Prep",     desc:"Avoid replaying social interactions or planning tomorrow's image. Let the day be done. Rest without performance." },
    ],
  },
  hpd: {
    label:"Histrionic PD", morning:[
      { time:"5 min",  title:"Quiet Self-Check",    desc:"Before reaching for your phone, sit with silence. Notice your feelings without acting on them. The impulse to seek stimulation immediately is the pattern to gently interrupt." },
      { time:"5 min",  title:"Stable Intention",    desc:"Set one calm intention — not a dramatic one. 'Today I will be steady' rather than 'Today will be amazing.' Stability is the underrated superpower." },
      { time:"10 min", title:"Grounding Breakfast",  desc:"Eat your NeuroThrive breakfast slowly, without multitasking. Complex carbs and omega-3s stabilise serotonin — the neurotransmitter of emotional equilibrium." },
      { time:"3 min",  title:"Attention Awareness",  desc:"Notice: who do you want attention from today, and why? Awareness of the pattern is the first step to choosing differently. The prefrontal cortex strengthens each time you observe rather than react." },
      { time:"2 min",  title:"Inner Validation",    desc:"Tell yourself one thing you value about yourself — not your appearance or others' reactions. Internal validation builds the self-worth that external attention cannot sustain." },
    ], evening:[
      { time:"5 min",  title:"Emotional Review",    desc:"What emotions did you feel today? Name them specifically — not just 'good' or 'bad.' Emotional granularity strengthens the prefrontal cortex's ability to regulate rather than amplify." },
      { time:"5 min",  title:"Relationship Check",  desc:"Did you listen fully to someone today without steering the conversation? Notice without judgment. Each moment of genuine listening strengthens empathy circuits." },
      { time:"5 min",  title:"Self-Soothing Ritual", desc:"Find comfort without external stimulation — a warm drink, a book, gentle music. Learning to self-soothe internally reduces dependence on others for emotional regulation." },
      { time:"3 min",  title:"Quiet Sleep",         desc:"No dramatic planning or social media before bed. Let the evening be uneventful. Calm evenings build the neural tolerance for low stimulation." },
    ],
  },
  aspd: {
    label:"Antisocial PD", morning:[
      { time:"5 min",  title:"Consequence Preview",  desc:"Before the day starts, think about one decision ahead. What are the second-order consequences? The prefrontal cortex — responsible for long-term planning — strengthens with deliberate consequence-mapping." },
      { time:"5 min",  title:"Patience Practice",    desc:"Sit still for 5 minutes. No phone, no stimulation. Boredom tolerance is a trainable skill and it directly strengthens impulse control circuits in the ventromedial prefrontal cortex." },
      { time:"10 min", title:"Omega-3 Rich Breakfast", desc:"Eat your NeuroThrive breakfast. EPA omega-3s increase serotonin release and have been shown in clinical trials to reduce aggression and impulsivity." },
      { time:"3 min",  title:"Pro-Social Intention",  desc:"Set one intention to do something genuinely helpful for someone else. Not strategic — genuinely helpful. The brain's reward system can be retrained to find value in prosocial behaviour." },
      { time:"2 min",  title:"Stress Recognition",   desc:"Notice your current stress level 1–10. Anger and impulsive action often mask unacknowledged stress. Recognising it early is the window for a different choice." },
    ], evening:[
      { time:"5 min",  title:"Actions & Impact",    desc:"Review your day. Did any action affect someone negatively? Not to blame yourself — to practice seeing the ripple effects of choices. This builds the neural circuits of consequential thinking." },
      { time:"5 min",  title:"Boredom Without Action", desc:"Sit with the evening without seeking stimulation. Boredom is uncomfortable but not dangerous. Building tolerance for low arousal reduces the need for risk-seeking." },
      { time:"5 min",  title:"Physical Release",    desc:"Channel any restless energy into push-ups, a walk, or stretching. Physical exertion metabolises cortisol and adrenaline that would otherwise seek impulsive outlets." },
      { time:"3 min",  title:"Tomorrow's Better Choice", desc:"Name one situation tomorrow where you could make a better choice than you usually would. Pre-deciding activates the dorsolateral prefrontal cortex." },
    ],
  },
  eating: {
    label:"Eating Disorder Recovery", morning:[
      { time:"5 min",  title:"Body Kindness",       desc:"Place your hand on your chest and say: 'This body is keeping me alive.' Before food, before mirrors, before the day — your body deserves acknowledgment for showing up." },
      { time:"3 min",  title:"Today's Nourishment Intention", desc:"Set an intention to nourish, not to restrict. 'Today I will eat meals that help my brain and body heal.' Recovery is an active, daily choice." },
      { time:"10 min", title:"Gentle Breakfast",     desc:"Eat your NeuroThrive breakfast at the table, without screens. Zinc in balanced meals restores taste perception and appetite signaling that restriction has dampened." },
      { time:"5 min",  title:"Challenge One Rule",   desc:"Notice one food rule your eating disorder has created. You don't have to break it today — just notice it's there. Awareness is the first crack in the wall." },
      { time:"2 min",  title:"Self-Compassion",     desc:"Write one kind thing to yourself. Recovery is not linear. Bad days are part of healing, not evidence of failure." },
    ], evening:[
      { time:"5 min",  title:"Nourishment Reflection", desc:"Did you eat all three meals today? If yes — that's a victory worth acknowledging. If not — tomorrow is another chance. No shame, only information." },
      { time:"5 min",  title:"Body Gratitude",      desc:"Name three things your body did today — walked, breathed, thought, laughed. Your body is not the enemy. It's the vehicle of your entire life." },
      { time:"5 min",  title:"Feelings Behind Food", desc:"Were there moments today where emotions felt connected to food urges? Write them down. Separating feelings from food behaviours is a core recovery skill." },
      { time:"3 min",  title:"Calm Closure",        desc:"The day is done. Whatever happened with food today is done. Tomorrow is a new day of practice. Rest without judgment." },
    ],
  },
  phobia: {
    label:"Phobias", morning:[
      { time:"5 min",  title:"Safety Grounding",    desc:"Name 5 things around you that are safe and familiar. The amygdala fires before the thinking brain catches up — grounding gives the prefrontal cortex time to override the false alarm." },
      { time:"5 min",  title:"Calm Breathing",      desc:"4 counts in, 4 hold, 6 counts out. Repeat 5 times. The extended exhale activates the vagus nerve, which directly calms the sympathetic fight-or-flight response that phobias hijack." },
      { time:"10 min", title:"GABA-Supporting Breakfast", desc:"Eat your NeuroThrive breakfast. Fermented foods and complex carbs support GABA production — your brain's natural anxiety brake. Building GABA reserves makes fear responses less intense." },
      { time:"3 min",  title:"Courage Micro-Step",  desc:"Think of one tiny step toward your fear — even just imagining it briefly. Gradual exposure, even mentally, reduces amygdala reactivity over time. This is how fear extinction works." },
      { time:"2 min",  title:"Today's Calm Anchor", desc:"Choose one calming strategy for today — a breath technique, a grounding word, or a safe mental image. Having a tool ready prevents the freeze response." },
    ], evening:[
      { time:"5 min",  title:"Brave Moments",       desc:"Name one moment today where you felt anxious but managed it — even partially. Noticing your own coping builds self-efficacy, which is the strongest predictor of phobia improvement." },
      { time:"5 min",  title:"Magnesium & Calm Drink", desc:"Take magnesium with chamomile or warm milk. Magnesium blocks NMDA receptors that consolidate fear memories — taking it in the evening supports overnight fear extinction." },
      { time:"5 min",  title:"Vagal Tone Practice",  desc:"Hum, gargle, or splash cold water on your face. These simple actions stimulate the vagus nerve, building the parasympathetic tone that counteracts phobic arousal." },
      { time:"3 min",  title:"Safe Sleep",           desc:"Remind yourself: nighttime is safe. Phobia-related anxiety often peaks at night when the thinking brain quiets and the emotional brain gets louder. A verbal safety cue helps." },
    ],
  },
  bfrb: {
    label:"Body-Focused Repetitive", morning:[
      { time:"5 min",  title:"Body Awareness Check", desc:"Scan your body. Where are your hands? What are they doing? BFRBs often happen on autopilot — bringing conscious awareness to your hands and body is the first line of interruption." },
      { time:"5 min",  title:"Barrier Strategy",    desc:"Put on gloves, bandages, or fidget tools before your peak urge time. Physical barriers buy time for the prefrontal cortex to engage before the motor habit loop completes." },
      { time:"10 min", title:"Cysteine-Rich Breakfast", desc:"Eat your NeuroThrive breakfast. Eggs, broccoli, and cruciferous vegetables provide cysteine — the precursor to NAC, which modulates the glutamate system driving repetitive behaviours." },
      { time:"3 min",  title:"Trigger Awareness",   desc:"Name your top 3 BFRB triggers (boredom, stress, screens?). Knowing your triggers isn't about avoidance — it's about having a competing response ready." },
      { time:"2 min",  title:"Self-Compassion",     desc:"BFRBs are neurological, not moral failures. You are not 'doing this to yourself' — your basal ganglia's habit loops are misfiring. Be kind to yourself in the process of retraining." },
    ], evening:[
      { time:"5 min",  title:"BFRB Tracking",       desc:"Note today's BFRB episodes — time, trigger, duration. Not to judge — to spot patterns. Data replaces shame, and patterns reveal the specific glutamate surges you can learn to redirect." },
      { time:"5 min",  title:"Competing Response",   desc:"Practice your chosen competing response for 2 minutes — squeezing a ball, pressing palms together, or rubbing a texture. Habit reversal training rewires the motor cortex." },
      { time:"5 min",  title:"Antioxidant Support",  desc:"Have a small serving of blueberries or dark chocolate. Antioxidants support the glutathione system that NAC feeds into — protecting the neurons you're retraining." },
      { time:"3 min",  title:"Hands-Free Sleep Prep", desc:"Apply lotion to your hands and wear soft gloves if needed. Nighttime is peak BFRB time because the prefrontal cortex disengages. Physical barriers protect progress." },
    ],
  },
  ppd: {
    label:"Paranoid PD", morning:[
      { time:"5 min",  title:"Safety Assessment",   desc:"Look around your space. Name 5 things that confirm you are safe. The locus coeruleus — your brain's alarm centre — is overactive in paranoid states. Conscious safety evidence helps recalibrate it." },
      { time:"5 min",  title:"Benign Interpretation Practice", desc:"Think of one interaction from yesterday that felt threatening. Now generate one alternative, innocent explanation. This isn't naive — it's exercising the prefrontal cortex's ability to consider multiple perspectives." },
      { time:"10 min", title:"Magnesium-Rich Breakfast", desc:"Eat your NeuroThrive breakfast. Magnesium blocks NMDA receptor overactivation in the amygdala, which directly reduces the hypervigilance that makes normal situations feel threatening." },
      { time:"3 min",  title:"Trust Micro-Step",    desc:"Identify one small trust action for today — sharing a minor opinion, asking for help with something small. Trust is rebuilt in tiny increments that don't overwhelm the nervous system." },
      { time:"2 min",  title:"Body Relaxation",     desc:"Unclench your jaw, drop your shoulders, soften your hands. Hypervigilance lives in muscle tension — releasing it sends safety signals up through the vagus nerve to the brain." },
    ], evening:[
      { time:"5 min",  title:"Threat Reality Check", desc:"Were any of today's fears confirmed? Usually the answer is no. Tracking the ratio of feared outcomes vs. actual outcomes slowly recalibrates the brain's threat calculator." },
      { time:"5 min",  title:"Calming Ritual",      desc:"Warm drink, dim lights, calming music. The parasympathetic nervous system needs consistent signals of safety to counterbalance a hyperactive threat system." },
      { time:"5 min",  title:"Omega-3 Support",     desc:"If you haven't had fish today, consider an omega-3 supplement with your evening meal. DHA maintains the anterior cingulate cortex, which helps you accurately read others' intentions." },
      { time:"3 min",  title:"Secure Sleep",        desc:"Check locks once — and only once. The compulsion to re-check is the amygdala seeking reassurance. One check is responsible; repeated checks feed the anxiety loop." },
    ],
  },
  spd: {
    label:"Schizoid PD", morning:[
      { time:"5 min",  title:"Energy Check",        desc:"Rate your energy and motivation 1–10. The dopaminergic pathways that drive motivation can be undertoned in SPD. Tracking helps you notice patterns and plan accordingly." },
      { time:"5 min",  title:"One Social Intention", desc:"Set one small social interaction for today — even a brief exchange with a cashier or a text. The brain's social reward circuits atrophy with disuse but can be rebuilt gradually." },
      { time:"10 min", title:"Tyrosine-Rich Breakfast", desc:"Eat your NeuroThrive breakfast. Eggs, chicken, and cheese provide tyrosine — the precursor to dopamine, the neurotransmitter of motivation and reward that SPD tends to underutilize." },
      { time:"5 min",  title:"Movement for Dopamine", desc:"Do 5 minutes of brisk movement — walking, jumping jacks, dancing. Physical activity directly increases dopamine release in the nucleus accumbens, the brain's motivation centre." },
      { time:"2 min",  title:"One Thing to Look Forward To", desc:"Name one thing today that could be mildly enjoyable. Not exciting — just slightly pleasant. This primes the brain's anticipation circuitry, which is atrophied in anhedonia." },
    ], evening:[
      { time:"5 min",  title:"Social Reflection",   desc:"Did you have any social interactions today? How did they feel? Not good or bad — just notice. Building awareness of social experience is the foundation for gradually expanding your comfort zone." },
      { time:"5 min",  title:"Pleasure Tracking",   desc:"Name one thing today that felt even slightly good. A meal, a song, sunlight, a comfortable chair. Anhedonia makes good things invisible — deliberately noticing them trains the brain to register pleasure again." },
      { time:"5 min",  title:"Creative Expression",  desc:"Spend a few minutes on something creative — drawing, writing, music, building something. Creative expression activates the mesocortical dopamine pathway without requiring social interaction." },
      { time:"3 min",  title:"Tomorrow's Anchor",   desc:"Name one specific thing to do first tomorrow. Inertia is SPD's biggest obstacle — having a concrete first step dramatically reduces the activation energy needed to begin." },
    ],
  },
  default: {
    label:"General Wellness", morning:[
      { time:"5 min",  title:"Hydration",           desc:"Drink a full glass of water first. Your brain loses fluid overnight — hydration is the simplest cognitive performance boost available." },
      { time:"10 min", title:"Nourishing Breakfast",desc:"Eat your NeuroThrive breakfast. The brain consumes 20% of your body's energy — consistent morning nutrition sets neurotransmitter production for the day." },
      { time:"5 min",  title:"Today's Intention",   desc:"Set one clear intention for the day — a quality of presence you want to bring. This activates the prefrontal cortex's goal-setting systems." },
      { time:"5 min",  title:"Morning Movement",    desc:"Even 5 minutes of movement increases BDNF and improves focus, mood, and learning for hours afterward." },
    ], evening:[
      { time:"5 min",  title:"Reflection",          desc:"Name one thing that went well today and one thing you learned. This builds self-awareness and supports memory consolidation during sleep." },
      { time:"5 min",  title:"Tomorrow Preview",    desc:"Look briefly at tomorrow. Knowing what's coming reduces morning cognitive load and helps you wake with a sense of direction." },
      { time:"5 min",  title:"Sleep Ritual",        desc:"Dim lights and reduce stimulation 30 minutes before bed. Sleep quality is the single most impactful factor in next-day mood, focus, and emotional regulation." },
    ],
  },
};


const AFFIRMATIONS = [
  // ── Identity & Worth ──────────────────────────────────────────────────────
  { text: "Your brain is not broken. It is beautifully different.", author: "NeuroThrive" },
  { text: "You are more than your diagnosis. You are whole, worthy, and valid.", author: "NeuroThrive" },
  { text: "You are allowed to take up space — in every room, on every plate.", author: "NeuroThrive" },
  { text: "Your worth is not measured by your productivity.", author: "NeuroThrive" },
  { text: "You are not too much. You are not too little. You are exactly enough.", author: "NeuroThrive" },
  { text: "Your sensitivity is not a weakness. It is a form of depth.", author: "NeuroThrive" },
  { text: "You did not choose your diagnosis. You did choose to keep going.", author: "NeuroThrive" },
  { text: "You are a whole person, not a collection of symptoms.", author: "NeuroThrive" },
  { text: "Being different is not a deficit. It is a different kind of brilliance.", author: "NeuroThrive" },
  { text: "Your story is not over. This is just one chapter.", author: "NeuroThrive" },
  { text: "You deserve to be here. In this room. In this body. In this life.", author: "NeuroThrive" },
  { text: "You are worthy of care, including from yourself.", author: "NeuroThrive" },
  { text: "Your existence alone has value. Not what you produce. Not what you perform.", author: "NeuroThrive" },
  { text: "The parts of you that feel like too much are often the parts people love most.", author: "NeuroThrive" },
  { text: "You are not defined by your hardest days.", author: "NeuroThrive" },
  { text: "Imperfect and whole. Struggling and worthy. These can all be true at once.", author: "NeuroThrive" },
  { text: "You carry things that most people can't see. That kind of strength deserves recognition.", author: "NeuroThrive" },
  { text: "You are not your worst thought about yourself.", author: "NeuroThrive" },
  { text: "The courage it takes to live authentically with a mental health condition is extraordinary.", author: "NeuroThrive" },
  { text: "You are someone's reason to smile, even on the days you can't feel it.", author: "NeuroThrive" },

  // ── Healing & Progress ───────────────────────────────────────────────────
  { text: "Healing is not linear. Neither is eating well. Both take time.", author: "NeuroThrive" },
  { text: "You showed up today. That alone is worth celebrating.", author: "NeuroThrive" },
  { text: "Small steps are still steps. One meal, one moment, one breath at a time.", author: "NeuroThrive" },
  { text: "Even on the hard days, you are doing something remarkable by still trying.", author: "NeuroThrive" },
  { text: "Progress is rarely a straight line. Zigzags still move forward.", author: "NeuroThrive" },
  { text: "Recovery is not about being fixed. It's about learning to live well.", author: "NeuroThrive" },
  { text: "Every good day you've had proves another is possible.", author: "NeuroThrive" },
  { text: "Healing looks different on every person. Trust your version of it.", author: "NeuroThrive" },
  { text: "You have already survived 100% of your hardest days. That record stands.", author: "NeuroThrive" },
  { text: "The fact that you're still here, still trying, still hoping — that is everything.", author: "NeuroThrive" },
  { text: "One nourishing meal is a step forward. Always.", author: "NeuroThrive" },
  { text: "You don't have to be fully healed to be worthy of good things.", author: "NeuroThrive" },
  { text: "Setbacks are not failures. They are part of every healing story ever told.", author: "NeuroThrive" },
  { text: "Sometimes moving forward means staying still and letting yourself rest.", author: "NeuroThrive" },
  { text: "Your effort counts even when the results aren't visible yet.", author: "NeuroThrive" },
  { text: "The work you're doing on yourself quietly is some of the most important work there is.", author: "NeuroThrive" },
  { text: "Celebrate the tiny wins. They are the foundation of big ones.", author: "NeuroThrive" },
  { text: "You are further along than you were. Even if it doesn't feel like it.", author: "NeuroThrive" },
  { text: "Growth is happening in you, even when you can't see it yet.", author: "NeuroThrive" },
  { text: "You are not starting over. You are starting from experience.", author: "NeuroThrive" },

  // ── Nourishment & Body ───────────────────────────────────────────────────
  { text: "The body you're in deserves nourishment — exactly as it is, right now.", author: "NeuroThrive" },
  { text: "Nourishing yourself is an act of radical self-love.", author: "NeuroThrive" },
  { text: "Your feelings are valid. Your hunger is valid. You are valid.", author: "NeuroThrive" },
  { text: "Your body works incredibly hard for you every single day.", author: "NeuroThrive" },
  { text: "Eating well is not about perfection. It is about showing up for yourself.", author: "NeuroThrive" },
  { text: "Food is medicine, and you deserve to be well.", author: "NeuroThrive" },
  { text: "Every meal is a chance to support the brain that works so hard for you.", author: "NeuroThrive" },
  { text: "Your body is not your enemy. It is doing its best with what it's been through.", author: "NeuroThrive" },
  { text: "You are allowed to enjoy food. Pleasure and nourishment are not opposites.", author: "NeuroThrive" },
  { text: "Your hunger cues are valid, even when they feel confusing.", author: "NeuroThrive" },
  { text: "Taking care of your body is one of the kindest things you can do for your mind.", author: "NeuroThrive" },
  { text: "You deserve hot meals, good water, and time to eat without guilt.", author: "NeuroThrive" },
  { text: "Your brain needs fuel. Feeding it is not indulgence. It is maintenance.", author: "NeuroThrive" },
  { text: "There is no 'earning' your food. You deserve to eat simply because you are alive.", author: "NeuroThrive" },
  { text: "Nourishment is not a reward. It is a right.", author: "NeuroThrive" },
  { text: "Be as gentle with your body as you would be with someone you love.", author: "NeuroThrive" },
  { text: "What you eat today is a love letter to your future self.", author: "NeuroThrive" },
  { text: "Your body has carried you through everything. It deserves your gratitude and care.", author: "NeuroThrive" },
  { text: "One bite, one sip, one meal at a time. That's all it takes.", author: "NeuroThrive" },
  { text: "Imperfect eating is infinitely better than not eating at all.", author: "NeuroThrive" },

  // ── Rest & Gentleness ────────────────────────────────────────────────────
  { text: "Rest is productive. Eating is productive. Existing is productive.", author: "NeuroThrive" },
  { text: "You deserve gentleness — especially from yourself.", author: "NeuroThrive" },
  { text: "It is okay to do less today. Today had enough in it already.", author: "NeuroThrive" },
  { text: "Slowing down is not giving up. It is giving yourself what you need.", author: "NeuroThrive" },
  { text: "You are not lazy. You are a person with a nervous system that needs more support.", author: "NeuroThrive" },
  { text: "Rest is not something you earn. It is something you need.", author: "NeuroThrive" },
  { text: "Doing nothing is sometimes the most therapeutic thing you can do.", author: "NeuroThrive" },
  { text: "Your pace is valid. There is no race to healing.", author: "NeuroThrive" },
  { text: "Gentle days are allowed. Quiet days are allowed. All days are allowed.", author: "NeuroThrive" },
  { text: "Sleep is medicine. Stillness is medicine. Quiet is medicine.", author: "NeuroThrive" },
  { text: "You do not owe anyone a performance of wellness.", author: "NeuroThrive" },
  { text: "Not every day needs to be a good day. Some days just need to be gotten through.", author: "NeuroThrive" },
  { text: "Asking for help is not weakness. It is wisdom.", author: "NeuroThrive" },
  { text: "You are allowed to have needs. Everyone does.", author: "NeuroThrive" },
  { text: "Softness is strength. Kindness toward yourself takes more courage than hardness.", author: "NeuroThrive" },

  // ── Mental Health Specific ───────────────────────────────────────────────
  { text: "Your anxiety is lying to you about the future. You have handled every day so far.", author: "NeuroThrive" },
  { text: "Depression lies. The voice that says you are not enough is not the truth.", author: "NeuroThrive" },
  { text: "Your ADHD brain is not defective. It evolved for a different kind of world.", author: "NeuroThrive" },
  { text: "The highs and lows do not define you. The person between them does.", author: "NeuroThrive" },
  { text: "Trauma changes people. It does not ruin them.", author: "NeuroThrive" },
  { text: "Your intrusive thoughts are not your intentions. They are symptoms, not character.", author: "NeuroThrive" },
  { text: "You are not your worst episode. You are the person who got through it.", author: "NeuroThrive" },
  { text: "Mental illness is not a moral failing. It is a medical reality.", author: "NeuroThrive" },
  { text: "The bravest thing you can do is seek help and keep going.", author: "NeuroThrive" },
  { text: "You are not dramatic. You are not too sensitive. You are wired differently.", author: "NeuroThrive" },
  { text: "Managing a mental health condition is a full-time job most people can't see.", author: "NeuroThrive" },
  { text: "You don't have to explain your struggles to deserve support.", author: "NeuroThrive" },
  { text: "The fact that you keep trying in spite of everything is astonishing.", author: "NeuroThrive" },
  { text: "Your brain works differently. That is not a flaw in you. It is a feature of you.", author: "NeuroThrive" },
  { text: "You are not defined by what your brain does to you in your hardest moments.", author: "NeuroThrive" },

  // ── Hope & Future ────────────────────────────────────────────────────────
  { text: "There are good days ahead. You haven't met them yet.", author: "NeuroThrive" },
  { text: "Something is shifting, even when you can't feel it.", author: "NeuroThrive" },
  { text: "The best chapters of your life may not have been written yet.", author: "NeuroThrive" },
  { text: "Hope doesn't require certainty. It only requires possibility.", author: "NeuroThrive" },
  { text: "You have surprised yourself before. You will again.", author: "NeuroThrive" },
  { text: "The version of you that is thriving exists. You are moving toward them.", author: "NeuroThrive" },
  { text: "Tomorrow is genuinely different from today. Hold on for it.", author: "NeuroThrive" },
  { text: "Your future self will be grateful you didn't give up today.", author: "NeuroThrive" },
  { text: "Things change. Seasons change. You are allowed to change too.", author: "NeuroThrive" },
  { text: "The sun has risen every single day of your life so far. That won't stop now.", author: "NeuroThrive" },
  { text: "You don't have to see the whole staircase. Just the next step.", author: "NeuroThrive" },
  { text: "Small actions today are seeds for a life that feels better tomorrow.", author: "NeuroThrive" },
  { text: "Your capacity to feel deeply is also your capacity to feel joy deeply.", author: "NeuroThrive" },
  { text: "Something good is still possible for you. Believe that.", author: "NeuroThrive" },
  { text: "You are not stuck forever. You are just here for now.", author: "NeuroThrive" },

  // ── Strength & Resilience ────────────────────────────────────────────────
  { text: "You are stronger than the hardest thing you have ever faced. Proof: you faced it.", author: "NeuroThrive" },
  { text: "Resilience is not about not breaking. It's about breaking and continuing anyway.", author: "NeuroThrive" },
  { text: "You have gotten through every hard day before this one. You have a perfect record.", author: "NeuroThrive" },
  { text: "The battles you fight invisibly make you one of the strongest people in any room.", author: "NeuroThrive" },
  { text: "Courage is not the absence of fear. It is eating well when everything in you says don't bother.", author: "NeuroThrive" },
  { text: "You have rebuilt yourself before. You know how.", author: "NeuroThrive" },
  { text: "Every hard thing you have survived has taught you something about your own power.", author: "NeuroThrive" },
  { text: "You are harder to break than you think.", author: "NeuroThrive" },
  { text: "Getting out of bed on the hardest days is heroic. Even when it doesn't feel like it.", author: "NeuroThrive" },
  { text: "You have the kind of strength that doesn't announce itself. The quiet, daily kind.", author: "NeuroThrive" },
  { text: "Enduring is a form of winning. You are enduring.", author: "NeuroThrive" },
  { text: "The fact that you are still here is evidence of extraordinary resilience.", author: "NeuroThrive" },

  // ── Connection & Community ───────────────────────────────────────────────
  { text: "You are not alone in this, even when it feels that way.", author: "NeuroThrive" },
  { text: "Millions of people are fighting the same invisible battles right now. You have company.", author: "NeuroThrive" },
  { text: "Your vulnerability is not a burden to the people who truly love you.", author: "NeuroThrive" },
  { text: "Letting someone in is an act of courage and connection.", author: "NeuroThrive" },
  { text: "The right people will not leave because of your diagnosis.", author: "NeuroThrive" },
  { text: "You deserve relationships where your whole self is welcome.", author: "NeuroThrive" },
  { text: "Sharing your struggle is not weakness. It is an invitation to real connection.", author: "NeuroThrive" },
  { text: "You matter to more people than your anxious mind will admit.", author: "NeuroThrive" },

  // ── Daily Grounding ──────────────────────────────────────────────────────
  { text: "Just for today: one meal, one glass of water, one kind thought about yourself.", author: "NeuroThrive" },
  { text: "Today's only job is today. That is enough.", author: "NeuroThrive" },
  { text: "You don't have to fix everything today. Existing is enough for today.", author: "NeuroThrive" },
  { text: "Breathe. You are here. That matters more than you know.", author: "NeuroThrive" },
  { text: "This moment, right now, is manageable. Just this moment.", author: "NeuroThrive" },
  { text: "You woke up today. That is where every good thing starts.", author: "NeuroThrive" },
  { text: "The present moment is the only one that needs your attention right now.", author: "NeuroThrive" },
  { text: "Let today be simple. Just do the next small thing.", author: "NeuroThrive" },
  { text: "Ground yourself: five things you can see, four you can hear, three you can touch.", author: "NeuroThrive" },
  { text: "You made it to another day. That is a genuine achievement.", author: "NeuroThrive" },
  { text: "Right now you are safe. Right now you are breathing. Right now is enough.", author: "NeuroThrive" },
  { text: "You don't need a perfect day. You need a real one. This is it.", author: "NeuroThrive" },

  // ── Mindset ──────────────────────────────────────────────────────────────
  { text: "What if today is the day things start to shift?", author: "NeuroThrive" },
  { text: "You are not behind. You are on your own timeline.", author: "NeuroThrive" },
  { text: "Comparison is a thief. No one else has your exact path.", author: "NeuroThrive" },
  { text: "The voice that says you can't is not the truth. It is a symptom.", author: "NeuroThrive" },
  { text: "You have permission to let go of what isn't serving you.", author: "NeuroThrive" },
  { text: "You can hold both — the hard truth and the hope. Both are real.", author: "NeuroThrive" },
  { text: "Grace is not something you earn. It is something you give yourself.", author: "NeuroThrive" },
  { text: "You are not weak for needing support. Plants need water. People need care.", author: "NeuroThrive" },
  { text: "The way you talk to yourself becomes the foundation of how you feel.", author: "NeuroThrive" },
  { text: "Treat yourself with the kindness you would offer your closest friend.", author: "NeuroThrive" },
  { text: "You are allowed to change your mind, your goals, your plan. You are allowed to evolve.", author: "NeuroThrive" },
  { text: "Not everything needs to be figured out today.", author: "NeuroThrive" },
  { text: "Uncertainty is uncomfortable, but it also means nothing bad is certain either.", author: "NeuroThrive" },
  { text: "You are doing better than you're giving yourself credit for.", author: "NeuroThrive" },
  { text: "Give yourself the benefit of the doubt. You are trying.", author: "NeuroThrive" },

  // ── Gratitude ────────────────────────────────────────────────────────────
  { text: "Your brain has gotten you through every single day of your life. Thank it.", author: "NeuroThrive" },
  { text: "There is something in your life right now that is quietly good. Find it.", author: "NeuroThrive" },
  { text: "Your body has never stopped trying to keep you alive. That is love.", author: "NeuroThrive" },
  { text: "Small joys are still joys. Notice them today.", author: "NeuroThrive" },
  { text: "Something ordinary today — a meal, a breeze, a song — is worth savouring.", author: "NeuroThrive" },
  { text: "Gratitude doesn't require that everything is fine. It just requires that something is.", author: "NeuroThrive" },

  // ── Evening Affirmations ─────────────────────────────────────────────────
  { text: "You made it through today. Whatever it looked like — that counts.", author: "NeuroThrive" },
  { text: "Rest now. Your nervous system has worked hard enough today.", author: "NeuroThrive" },
  { text: "Tomorrow is a clean page. Tonight, just rest.", author: "NeuroThrive" },
  { text: "Whatever didn't get done today can wait. You cannot.", author: "NeuroThrive" },
  { text: "Let today be over. You gave what you could. That is enough.", author: "NeuroThrive" },
  { text: "Sleep is healing. Let your brain do its quiet repair work tonight.", author: "NeuroThrive" },
  { text: "You don't have to carry today into tomorrow. Set it down.", author: "NeuroThrive" },

  // ── Morning Affirmations ─────────────────────────────────────────────────
  { text: "Good morning. You get another chance today. Use it gently.", author: "NeuroThrive" },
  { text: "The day ahead is full of moments that haven't been decided yet.", author: "NeuroThrive" },
  { text: "Morning is the brain's reset button. Press it slowly.", author: "NeuroThrive" },
  { text: "Start with water. Start with breath. Start with one kind thought. Then breakfast.", author: "NeuroThrive" },
  { text: "Today does not have to be perfect to be good.", author: "NeuroThrive" },
  { text: "You have everything you need to get through today. You've proven that before.", author: "NeuroThrive" },
  { text: "This morning is new. Whatever yesterday held, today is separate.", author: "NeuroThrive" },

  // ── Research-Informed Wellness ──────────────────────────────────────────
  { text: "Your gut produces 90% of your serotonin. Every meal is a mood decision.", author: "NeuroThrive" },
  { text: "Omega-3s, leafy greens, and sleep are the most evidence-backed mood boosters on earth.", author: "NeuroThrive" },
  { text: "The science is clear: what you eat shapes how you think and feel. You are choosing wisely.", author: "NeuroThrive" },
  { text: "Hydration is brain maintenance. A 2% drop in water levels impairs cognition. Drink up.", author: "NeuroThrive" },
  { text: "Every colourful vegetable on your plate is antioxidants reaching your brain.", author: "NeuroThrive" },
  { text: "Movement, sleep, and nourishment are the three most powerful mood medicines available.", author: "NeuroThrive" },
  { text: "Your microbiome communicates directly with your brain. Feed it well and it returns the favour.", author: "NeuroThrive" },
  { text: "Research shows consistent mealtimes reduce cortisol. Structure is medicine.", author: "NeuroThrive" },
  { text: "Magnesium, omega-3s, and B vitamins are not just supplements. They are brain infrastructure.", author: "NeuroThrive" },
  { text: "Every anti-inflammatory food you eat is a quiet act of protection for your nervous system.", author: "NeuroThrive" },
];


const MOOD_EMOJIS = [
  { emoji: "😞", label: "Rough", val: 1 },
  { emoji: "😕", label: "Low", val: 2 },
  { emoji: "😐", label: "Okay", val: 3 },
  { emoji: "🙂", label: "Good", val: 4 },
  { emoji: "😊", label: "Great", val: 5 },
];

const ENERGY_EMOJIS = [
  { emoji: "🪫", label: "Drained", val: 1 },
  { emoji: "😴", label: "Tired", val: 2 },
  { emoji: "🔋", label: "Okay", val: 3 },
  { emoji: "⚡", label: "Energized", val: 4 },
  { emoji: "🚀", label: "Vibrant", val: 5 },
];

const SUPPLEMENTS = {
  adhd: [
    { name:"Omega-3 (EPA/DHA)", dose:"", emoji:"🐟", science:"Multiple RCTs show omega-3 supplementation reduces ADHD symptom severity by 20–30% in children and adults. EPA appears most active for attention and mood regulation.", why:"The ADHD brain has reduced dopaminergic transmission. EPA omega-3s increase dopamine receptor sensitivity and reduce the neuroinflammation that impairs prefrontal cortex function — the exact region responsible for attention, impulse control, and executive function.", timing:"With a meal containing fat for best absorption.", caution:"Choose a third-party tested brand. High doses (>3g) may thin blood.", link:"https://pubmed.ncbi.nlm.nih.gov/28741143/" },
    { name:"Magnesium Glycinate", dose:"", emoji:"🌿", science:"ADHD brains tend to have lower magnesium levels. Magnesium plays a key role in dopamine synthesis and nervous system regulation. Glycinate form is best tolerated.", why:"Studies consistently find lower serum magnesium in people with ADHD. Magnesium is a cofactor in the conversion of tyrosine to dopamine and acts as a natural calcium channel blocker, reducing the neural hyperexcitability that drives impulsivity and restlessness.", timing:"Evening — also supports sleep quality.", caution:"Start low (100mg) and increase gradually. Can cause loose stools at high doses.", link:"https://pubmed.ncbi.nlm.nih.gov/9368236/" },
    { name:"Zinc", dose:"", emoji:"⚡", science:"Zinc is a cofactor in dopamine and norepinephrine production. Studies show ADHD individuals often have lower serum zinc, and supplementation can modestly improve attention.", why:"Zinc directly regulates dopamine transporter (DAT) activity — the very protein that ADHD medications like Ritalin also target. Low zinc slows DAT, leaving dopamine signalling dysregulated. Zinc also modulates NMDA receptors involved in attention and working memory.", timing:"With food to avoid nausea.", caution:"Don't exceed 40mg long-term. Take away from iron supplements.", link:"https://pubmed.ncbi.nlm.nih.gov/15625652/" },
    { name:"Bacopa Monnieri", dose:"", emoji:"🌿", science:"An Ayurvedic herb with 12+ clinical trials showing improved working memory, learning speed, and information processing. Effects build over 8–12 weeks of consistent use.", why:"Bacopa enhances acetylcholine signalling in the hippocampus and prefrontal cortex — regions critical for attention and working memory that are underactive in ADHD. It also reduces oxidative stress in the basal ganglia, the brain's dopamine-rich reward and focus hub.", timing:"With a fatty meal — fat significantly increases bacosides absorption.", caution:"Causes vivid dreams in some people. GI upset if taken on empty stomach. Full benefits take 8–12 weeks.", link:"https://pubmed.ncbi.nlm.nih.gov/22747190/" },
    { name:"L-Theanine", dose:"", emoji:"🍵", science:"Found naturally in green tea. Promotes calm alertness by increasing alpha brain waves. Often paired with caffeine to smooth its stimulant effect without reducing focus.", why:"ADHD involves chronic underarousal of the prefrontal cortex and overarousal of the default mode network. L-theanine uniquely increases alpha waves — the brain state of calm, focused alertness — while reducing the theta waves associated with daydreaming and mind-wandering.", timing:"Morning or early afternoon.", caution:"Generally very well tolerated. Avoid late afternoon if sensitive to sleep disruption.", link:"https://pubmed.ncbi.nlm.nih.gov/18681988/" },
    { name:"Vitamin D3 + K2", dose:"", emoji:"☀️", science:"Vitamin D receptors are found in dopaminergic brain regions. Deficiency is extremely common and associated with worsened ADHD symptoms, mood, and executive function.", why:"Vitamin D regulates the genes that encode tyrosine hydroxylase — the enzyme that converts tyrosine into dopamine. Without adequate D3, the brain simply cannot produce sufficient dopamine regardless of diet or medication, directly impairing the attention and motivation systems.", timing:"Morning with a fatty meal.", caution:"Get your levels tested before supplementing. K2 is needed to direct calcium correctly.", link:"https://pubmed.ncbi.nlm.nih.gov/22254078/" },
    { name:"Rhodiola Rosea", dose:"", emoji:"🌄", science:"Adaptogen that reduces mental fatigue, improves cognitive function under stress, and enhances working memory. Particularly useful for the ADHD brain that burns out quickly.", why:"ADHD often coexists with high stress reactivity and mental fatigue. Rhodiola inhibits the breakdown of monoamines (dopamine, serotonin, norepinephrine) in the prefrontal cortex and increases the transport of precursors into the brain, directly supporting the depleted neurotransmitter systems.", timing:"Morning on an empty stomach, 30 minutes before food.", caution:"Mildly stimulating — avoid afternoon doses. Start with 100mg. Not for bipolar disorder without guidance.", link:"https://pubmed.ncbi.nlm.nih.gov/18307390/" },
    { name:"Iron (if deficient)", dose:"", emoji:"🔩", science:"Iron is a cofactor in dopamine synthesis. Multiple studies link iron deficiency (even without anaemia) to more severe ADHD symptoms, and supplementation in deficient children shows marked improvement.", why:"Iron is required by tyrosine hydroxylase and dopamine β-hydroxylase — the enzymes that build dopamine and norepinephrine. Iron-deficient ADHD brains are neurochemically undermining their own dopamine system. This is one of the most overlooked and correctable contributors to ADHD severity.", timing:"With vitamin C (increases absorption). Away from calcium and coffee.", caution:"Do NOT supplement without testing. Iron overload is dangerous. Ferritin levels should be tested by your doctor.", link:"https://pubmed.ncbi.nlm.nih.gov/15625652/" },
    { name:"Phosphatidylserine", dose:"", emoji:"🧠", science:"A phospholipid essential for neuronal membrane integrity. FDA-qualified health claim for cognitive function. Studies show improvements in ADHD symptoms, memory, and mood.", why:"Phosphatidylserine (PS) is a structural component of neurons in the prefrontal cortex. ADHD is associated with reduced cortical thickness in these areas. PS supports the density and flexibility of synaptic membranes, directly enhancing signal transmission in attention and working memory circuits.", timing:"With meals, ideally split into two doses.", caution:"Very well tolerated. May interact with blood thinners at high doses. Soy-derived PS is most studied.", link:"https://pubmed.ncbi.nlm.nih.gov/23678853/" },
    { name:"Ginkgo Biloba", dose:"", emoji:"🍃", science:"One of the most-studied herbs for cognitive function. Improves cerebral blood flow and has been shown in several trials to reduce ADHD symptoms, particularly inattention.", why:"ADHD involves reduced cerebral blood flow to the prefrontal cortex and anterior cingulate. Ginkgo's primary mechanism is improving microcirculation in exactly these regions, delivering more glucose and oxygen to attention networks. It also inhibits MAO-B, mildly elevating dopamine levels.", timing:"With meals. Split dose morning and midday.", caution:"Avoid with blood thinners (warfarin, aspirin). Can cause mild headaches initially. Stop 2 weeks before surgery.", link:"https://pubmed.ncbi.nlm.nih.gov/24002936/" },
  ],
  anxiety: [
    { name:"Ashwagandha (KSM-66)", dose:"", emoji:"🌱", science:"KSM-66 ashwagandha is the most studied form. Multiple double-blind RCTs show significant reduction in cortisol and perceived stress scores vs placebo within 8 weeks.", why:"Anxiety disorders involve chronic HPA axis hyperactivation — the stress system stays 'on' when it shouldn't. Ashwagandha's withanolides directly inhibit cortisol synthesis and sensitise the HPA feedback loop, gradually resetting the brain's stress thermostat back to a calmer baseline.", timing:"Morning or evening with food.", caution:"Avoid if pregnant, thyroid conditions, or autoimmune disease. Check for drug interactions.", link:"https://pubmed.ncbi.nlm.nih.gov/23439798/" },
    { name:"Magnesium Glycinate", dose:"", emoji:"🌿", science:"Magnesium acts on NMDA receptors and modulates the HPA stress axis. Clinical trials show significant anxiety reduction, particularly for people with low dietary magnesium.", why:"Anxiety is partly driven by glutamate excess — an excitatory neurotransmitter that keeps the nervous system in overdrive. Magnesium is the brain's natural NMDA receptor blocker, dampening glutamate activity. Without sufficient magnesium, the amygdala (fear centre) becomes hyperreactive to perceived threats.", timing:"Evening for best effect on sleep and anxiety.", caution:"Start at 100mg. Too much can cause digestive upset.", link:"https://pubmed.ncbi.nlm.nih.gov/28445426/" },
    { name:"L-Theanine", dose:"", emoji:"🍵", science:"Increases GABA, serotonin, and dopamine. Studies show measurable anxiolytic effects within 45 minutes of a single dose, without sedation.", why:"L-theanine crosses the blood-brain barrier and directly increases GABA — the brain's main calming neurotransmitter. Benzodiazepines work on the same GABA system but with dependency risk. L-theanine does this gently and without affecting motor function, making it uniquely effective for anxiety without the cloudy feeling.", timing:"As needed or daily morning dose.", caution:"Very safe. May enhance sedative medications — check with your doctor.", link:"https://pubmed.ncbi.nlm.nih.gov/19414525/" },
    { name:"Omega-3 (EPA/DHA)", dose:"", emoji:"🐟", science:"A 2011 meta-analysis found high-dose omega-3 reduced anxiety symptoms by 20% versus placebo. EPA appears particularly active for mood and anxiety.", why:"Chronic anxiety is associated with elevated neuroinflammatory markers. Omega-3s reduce prostaglandin E2 and interleukin-6 — inflammatory compounds that sensitise the amygdala and increase threat perception. Reducing this inflammation literally turns down the volume on anxious thoughts.", timing:"With a meal containing fat.", caution:"Choose molecularly distilled brands to minimise heavy metals.", link:"https://pubmed.ncbi.nlm.nih.gov/21784145/" },
    { name:"B-Complex (Methylated)", dose:"", emoji:"🔋", science:"B vitamins are cofactors in neurotransmitter synthesis — serotonin, GABA, dopamine all depend on them. Deficiency in B6, B12, or folate is strongly linked to anxiety and low mood.", why:"GABA — the brain's primary anti-anxiety neurotransmitter — is synthesised from glutamate by an enzyme that requires B6 as a cofactor. Without adequate B6, less GABA is produced regardless of lifestyle changes. Folate and B12 are essential for the methylation cycle that regulates serotonin production.", timing:"Morning with breakfast.", caution:"Look for methylated forms (methylfolate, methylcobalamin) for better absorption.", link:"https://pubmed.ncbi.nlm.nih.gov/23370773/" },
    { name:"Passionflower (Passiflora)", dose:"", emoji:"🌸", science:"A traditional herb with clinical trials showing anxiolytic effects comparable to low-dose benzodiazepines for generalised anxiety, without dependency or sedation at normal doses.", why:"Passionflower's chrysin and vitexin flavonoids bind to GABA-A receptors — the same receptors targeted by anti-anxiety medications — producing a calming effect without the tolerance or withdrawal risks. Particularly effective for anxiety with a physical restlessness component.", timing:"Evening or when anxiety is highest. Can be taken twice daily.", caution:"Avoid during pregnancy. May enhance sedative medications. Don't drive until you know how it affects you.", link:"https://pubmed.ncbi.nlm.nih.gov/21294203/" },
    { name:"Lemon Balm (Melissa)", dose:"", emoji:"🍋", science:"Lemon balm inhibits GABA transaminase, the enzyme that breaks down GABA, effectively increasing GABA availability. Clinical studies show significant reduction in anxiety and insomnia.", why:"Anxiety disorders often involve rapid breakdown of GABA between neurons. Lemon balm's rosmarinic acid slows this breakdown, extending calming signal transmission in the amygdala and prefrontal cortex — creating a gentler, sustained calm without the grogginess of stronger GABAergic drugs.", timing:"30–60 minutes before a stressful event or in the evening.", caution:"Very well tolerated. Mild sedation possible. Avoid very high doses.", link:"https://pubmed.ncbi.nlm.nih.gov/25022173/" },
    { name:"Valerian Root", dose:"", emoji:"🌾", science:"The most-studied herbal sleep and anxiety remedy. Valerenic acid inhibits GABA breakdown and may directly bind GABA receptors. Reduces sleep latency and anxiety-related insomnia.", why:"Anxiety-driven insomnia creates a vicious cycle — poor sleep worsens cortisol regulation, which worsens anxiety. Valerian targets the exact GABA system dysregulated in this cycle, helping break it without the next-day grogginess of medications.", timing:"60–90 minutes before bed for sleep. 150mg doses can be taken during day for mild anxiety.", caution:"Can cause vivid dreams or mild morning grogginess initially. Avoid with alcohol or sedative medications.", link:"https://pubmed.ncbi.nlm.nih.gov/17145239/" },
    { name:"Reishi Mushroom", dose:"", emoji:"🍄", science:"Reishi (Ganoderma lucidum) is an adaptogen with studies showing reduction in anxiety, fatigue, and improved quality of life in people under chronic stress.", why:"Chronic anxiety dysregulates the gut-brain axis and the immune system. Reishi's beta-glucans modulate both — calming inflammatory cytokines that sensitise anxiety pathways and supporting the vagus nerve, which is the main communication highway between the gut and the brain's calm response systems.", timing:"With meals. Effects accumulate over weeks.", caution:"May thin blood — discontinue 2 weeks before surgery. Rare liver sensitivity at very high doses.", link:"https://pubmed.ncbi.nlm.nih.gov/22022452/" },
  ],
  depression: [
    { name:"Omega-3 (EPA focus)", dose:"", emoji:"🐟", science:"The most replicated supplement finding in depression research. EPA (not DHA) appears to be the active component. Multiple meta-analyses show effects comparable to antidepressants in mild-moderate depression.", why:"Depression is increasingly understood as an inflammatory condition. EPA omega-3s are potent anti-inflammatory agents that reduce interleukin-6 and TNF-alpha — cytokines elevated in major depression that suppress serotonin production and blunt the brain's reward response. EPA also promotes neurogenesis in the hippocampus, which physically shrinks in chronic depression.", timing:"With a fatty meal.", caution:"May interact with blood thinners. Always inform your psychiatrist if taking alongside antidepressants.", link:"https://pubmed.ncbi.nlm.nih.gov/26978738/" },
    { name:"Vitamin D3 + K2", dose:"", emoji:"☀️", science:"Vitamin D acts as a neurosteroid and regulates serotonin synthesis. Large studies link deficiency to depression. Supplementation in deficient individuals shows significant mood improvement.", why:"Vitamin D activates the gene TPH2, which encodes tryptophan hydroxylase — the first enzyme in the serotonin synthesis pathway. Without sufficient D3, the brain cannot produce adequate serotonin from dietary tryptophan, regardless of antidepressant use. Deficiency is endemic in northern climates and indoor lifestyles.", timing:"Morning with a fatty meal.", caution:"Test your levels first. Toxicity is possible at very high doses taken long-term.", link:"https://pubmed.ncbi.nlm.nih.gov/25713056/" },
    { name:"Saffron Extract (Affron®)", dose:"", emoji:"🌸", science:"Multiple RCTs show saffron extract matches fluoxetine (Prozac) for mild-moderate depression with fewer side effects. Active compounds are safranal and crocin.", why:"Saffron's crocin molecules inhibit serotonin and dopamine reuptake — the same mechanism as SSRIs and SNRIs — while also reducing MAO-A activity (which breaks down serotonin). Additionally, crocin reduces BDNF decline, the brain-derived growth factor that depression depletes and that antidepressants work partly by restoring.", timing:"With meals.", caution:"Expensive but well-studied. Avoid in pregnancy. Rare: dry mouth, dizziness at higher doses.", link:"https://pubmed.ncbi.nlm.nih.gov/25384672/" },
    { name:"Magnesium Glycinate", dose:"", emoji:"🌿", science:"A 2017 clinical trial found magnesium supplementation as effective as antidepressants for mild-moderate depression within 6 weeks.", why:"Depression is associated with upregulation of NMDA glutamate receptors — making the brain hypersensitive to stress and negative experiences. Magnesium is the primary NMDA antagonist in the brain. Ketamine, the fast-acting antidepressant, also blocks NMDA receptors, and magnesium works through the same pathway, more gently and sustainably.", timing:"Evening.", caution:"Works best as part of a broader protocol. Not a replacement for prescribed medication.", link:"https://pubmed.ncbi.nlm.nih.gov/28654669/" },
    { name:"Rhodiola Rosea", dose:"", emoji:"🌄", science:"Adaptogen shown in RCTs to reduce burnout, fatigue, and depressive symptoms. Particularly effective for stress-related depression and low motivation.", why:"Stress-driven depression depletes dopamine and norepinephrine in the prefrontal cortex, creating anhedonia (inability to feel pleasure) and fatigue. Rhodiola inhibits COMT and MAO, the enzymes that break down dopamine and norepinephrine, extending the life of these motivational neurotransmitters. It also reduces cortisol-induced hippocampal damage.", timing:"Morning, away from food.", caution:"May be mildly stimulating — avoid afternoon doses. Avoid if bipolar without doctor guidance.", link:"https://pubmed.ncbi.nlm.nih.gov/18307390/" },
    { name:"St. John's Wort", dose:"", emoji:"🌻", science:"The most-studied herbal antidepressant. A Cochrane review of 29 trials found it superior to placebo and comparable to SSRIs for mild-moderate depression, with fewer side effects.", why:"Hyperforin in St. John's Wort inhibits the reuptake of serotonin, dopamine, norepinephrine, GABA, and glutamate simultaneously — a broader mechanism than most pharmaceutical antidepressants. This multi-neurotransmitter approach explains why it works for a wide range of depressive presentations.", timing:"With meals, three times daily. Effects begin within 2–4 weeks.", caution:"⚠️ CRITICAL: Significantly interacts with many medications including antidepressants (serotonin syndrome risk), birth control, blood thinners, and HIV medications. MUST consult doctor before use.", link:"https://pubmed.ncbi.nlm.nih.gov/18843608/" },
    { name:"SAMe (S-Adenosyl Methionine)", dose:"", emoji:"🔵", science:"A naturally occurring compound involved in over 200 biochemical reactions. Multiple meta-analyses show antidepressant effects. Also FDA-approved in some countries for depression.", why:"SAMe is the methyl donor for serotonin, dopamine, and norepinephrine synthesis. Depression is associated with hypomethylation of neurotransmitter pathways. SAMe directly replenishes methyl groups needed for brain chemistry, while also supporting phosphatidylcholine (brain membrane health) and reducing homocysteine — a neurotoxic amino acid elevated in depression.", timing:"Morning on empty stomach. Split doses if >400mg. Must build up slowly over 2–4 weeks.", caution:"Can trigger mania in bipolar — avoid without psychiatric guidance. May cause GI upset and anxiety initially at high doses.", link:"https://pubmed.ncbi.nlm.nih.gov/11157594/" },
    { name:"Lion's Mane Mushroom", dose:"", emoji:"🦁", science:"Contains hericenones and erinacines that stimulate Nerve Growth Factor (NGF) — shown to regenerate myelin and promote neuroplasticity. RCTs show improvement in mild depression and cognitive decline.", why:"Depression shrinks the hippocampus and reduces BDNF (brain-derived neurotrophic factor) — literally making the brain less plastic. Lion's Mane is one of the only natural compounds that stimulates NGF production, promoting the growth of new neurons and synaptic connections that antidepressant therapy depends on to produce lasting change.", timing:"With meals. Benefits accumulate over 4–8 weeks.", caution:"Very well tolerated. Rare allergy in those sensitive to mushrooms. May reduce platelet aggregation at high doses.", link:"https://pubmed.ncbi.nlm.nih.gov/30864515/" },
    { name:"5-HTP", dose:"", emoji:"🌈", science:"The direct precursor to serotonin. Multiple double-blind trials show antidepressant effects, including for treatment-resistant depression. Works faster than many herbs.", why:"Most antidepressants work by preventing serotonin breakdown — but if there isn't enough serotonin to start with, they have less to work with. 5-HTP provides the raw material for serotonin synthesis, crossing the blood-brain barrier and converting directly to serotonin in the raphe nuclei. Particularly useful when serotonin depletion is a factor.", timing:"Evening with a small carbohydrate snack (aids crossing blood-brain barrier).", caution:"⚠️ Do NOT combine with antidepressants, MAOIs, or tramadol — serotonin syndrome risk. Always check with your prescriber.", link:"https://pubmed.ncbi.nlm.nih.gov/9727088/" },
  ],
  ptsd: [
    { name:"Omega-3 (EPA/DHA)", dose:"", emoji:"🐟", science:"Research in first responders and trauma survivors shows omega-3 may reduce PTSD symptom development after acute trauma and lower hyperarousal and intrusion symptoms.", why:"PTSD involves chronic neuroinflammation and a hyperreactive amygdala that misfires the fear response. EPA omega-3s reduce the inflammatory cytokines that keep the amygdala in threat-detection overdrive, while DHA supports hippocampal neuroplasticity — helping the brain consolidate traumatic memories into contextualised, less intrusive forms.", timing:"With a meal containing fat.", caution:"Choose purified brands. Inform any prescribing doctor.", link:"https://pubmed.ncbi.nlm.nih.gov/20075049/" },
    { name:"Magnesium Glycinate", dose:"", emoji:"🌿", science:"Magnesium regulates the fear response via NMDA receptors. Low magnesium is associated with heightened stress reactivity and worse PTSD outcomes.", why:"PTSD hyperarousal — the constant state of being on high alert — is mediated by NMDA receptor overactivity. Magnesium is the brain's endogenous NMDA blocker. By restoring magnesium levels, the fear circuits in the amygdala and hippocampus become less reactive, gradually reducing hypervigilance and startle response.", timing:"Evening — supports sleep and nervous system recovery.", caution:"Start low and build up over 2 weeks.", link:"https://pubmed.ncbi.nlm.nih.gov/28328919/" },
    { name:"Ashwagandha (KSM-66)", dose:"", emoji:"🌱", science:"Reduces cortisol and supports HPA axis regulation — the stress system most dysregulated in PTSD. RCTs show meaningful improvements in stress, anxiety, and sleep.", why:"PTSD dysregulates the HPA axis so severely that the cortisol system either stays chronically elevated or becomes blunted and unresponsive. Ashwagandha's withanolides restore HPA feedback sensitivity — helping the stress system turn on AND off appropriately again, which is precisely what trauma disrupts.", timing:"Morning or evening with food.", caution:"Check for interactions with sedative medications.", link:"https://pubmed.ncbi.nlm.nih.gov/23439798/" },
    { name:"L-Theanine", dose:"", emoji:"🍵", science:"Promotes alpha brain wave activity associated with calm alertness. Particularly useful for hypervigilance and difficulty relaxing without sedation.", why:"PTSD hypervigilance keeps the brain in high-frequency beta waves — the state of threat scanning. L-theanine selectively increases alpha waves (calm, present-moment awareness) without inducing delta or theta (sedation). This allows hypervigilant individuals to relax while remaining functional and alert.", timing:"Can be taken as needed during stressful moments.", caution:"Very well tolerated. Pairs well with magnesium for evening relaxation.", link:"https://pubmed.ncbi.nlm.nih.gov/19414525/" },
    { name:"Holy Basil (Tulsi)", dose:"", emoji:"🌿", science:"Adaptogenic herb with clinical evidence for reducing cortisol, anxiety, and stress-related cognitive impairment. Used for millennia in Ayurvedic trauma recovery.", why:"PTSD involves blunted cortisol awakening response — the brain loses its morning reset mechanism. Tulsi's ursolic acid and eugenol support glucocorticoid receptor sensitivity, helping recalibrate the cortisol rhythm that trauma disrupts. This supports the natural morning alertness and evening calm cycle that PTSD sufferers often lose.", timing:"Morning with food.", caution:"Very well tolerated. Mild blood-thinning effect — caution with anticoagulants.", link:"https://pubmed.ncbi.nlm.nih.gov/22207695/" },
    { name:"GABA (Gamma-aminobutyric acid)", dose:"", emoji:"🫧", science:"Oral GABA has been shown to reduce stress and promote relaxation in human trials. While mechanisms are debated, multiple studies confirm anxiolytic effects.", why:"PTSD involves profound GABA deficiency in the prefrontal cortex and anterior cingulate — the regions that normally regulate the amygdala's fear response. Without adequate GABA tone, the fear response cannot be inhibited. Supplemental GABA supports this critical inhibitory system, helping restore top-down control over traumatic fear reactions.", timing:"Take as needed during periods of heightened arousal or before sleep.", caution:"May cause tingling or sedation. Do not drive until you know your response. Caution with medications.", link:"https://pubmed.ncbi.nlm.nih.gov/19861415/" },
    { name:"Bacopa Monnieri", dose:"", emoji:"🌿", science:"Shown to reduce anxiety and support memory consolidation. Particularly relevant for trauma-related memory dysregulation and intrusive memory symptoms.", why:"PTSD is partly a disorder of memory reconsolidation — traumatic memories fail to be properly filed and contextualised by the hippocampus. Bacopa enhances dendritic arborisation (complexity of neuron connections) in the hippocampus, supporting the brain's natural ability to process and integrate traumatic memories rather than reliving them.", timing:"With a fatty meal.", caution:"Full benefits take 8–12 weeks. GI upset if taken without food.", link:"https://pubmed.ncbi.nlm.nih.gov/22747190/" },
  ],
  bipolar: [
    { name:"Omega-3 (EPA/DHA)", dose:"", emoji:"🐟", science:"The most studied supplement in bipolar disorder. Multiple trials show omega-3 reduces depressive episodes and may have mild mood-stabilising effects.", why:"Bipolar disorder involves dysregulation of phospholipid metabolism in neuronal membranes — membranes low in omega-3s are more excitable and more vulnerable to mood cycling. EPA and DHA physically incorporate into these membranes, increasing stability. The anti-inflammatory action of EPA also reduces the cytokine spikes associated with both manic and depressive episodes.", timing:"With meals containing fat.", caution:"Discuss with your psychiatrist — may interact with mood stabilisers at high doses.", link:"https://pubmed.ncbi.nlm.nih.gov/15979846/" },
    { name:"Magnesium Glycinate", dose:"", emoji:"🌿", science:"Magnesium has lithium-like properties at the cellular level. Some research suggests it may reduce cycling frequency. Very commonly deficient in people on mood stabilisers.", why:"Magnesium and lithium compete for the same ion channels in neurons. When magnesium is deficient, neurons become hyperexcitable in ways that can trigger both manic and depressive phases. Many mood stabilisers also deplete magnesium as a side effect, creating a cycle that magnesium supplementation can help interrupt.", timing:"Evening.", caution:"Inform your psychiatrist. Some mood stabilisers affect magnesium levels.", link:"https://pubmed.ncbi.nlm.nih.gov/19271419/" },
    { name:"Vitamin D3 + K2", dose:"", emoji:"☀️", science:"Deficiency strongly associated with more frequent mood episodes and worse outcomes in bipolar disorder.", why:"Vitamin D modulates the dopamine and serotonin systems that are dysregulated across both poles of bipolar disorder. Deficiency is associated with increased cycling frequency and greater severity of both manic and depressive episodes. Adequate D3 helps stabilise the baseline mood set-point between episodes.", timing:"Morning with food.", caution:"Test your levels. Safe at standard doses but get checked annually.", link:"https://pubmed.ncbi.nlm.nih.gov/22254078/" },
    { name:"N-Acetyl Cysteine (NAC)", dose:"", emoji:"🛡️", science:"A glutathione precursor. A landmark RCT showed NAC significantly reduced bipolar depression scores versus placebo over 6 months, with good tolerability.", why:"Bipolar disorder is associated with mitochondrial dysfunction and oxidative stress — the brain's energy machinery is running inefficiently. NAC is a precursor to glutathione, the brain's master antioxidant. By restoring glutathione levels, NAC reduces the oxidative damage that contributes to episode cycling and cognitive decline in bipolar disorder.", timing:"With meals.", caution:"Takes 8–12 weeks to see full effect. Inform your doctor. Avoid if on nitroglycerin.", link:"https://pubmed.ncbi.nlm.nih.gov/18439486/" },
    { name:"Lithium Orotate (low-dose)", dose:"", emoji:"💎", science:"The orotate salt delivers lithium across the blood-brain barrier far more efficiently than pharmaceutical lithium carbonate. Low-dose studies show neuroprotective and mood-stabilising effects.", why:"Lithium (in pharmaceutical doses) is the gold-standard mood stabiliser. At lower doses via the orotate form, it still activates neuroprotective pathways (GSK-3β inhibition, BDNF increase) and reduces glutamate excitotoxicity — effects relevant to mood cycling — without the monitoring requirements of prescription lithium.", timing:"With food, once daily.", caution:"⚠️ Discuss with your psychiatrist before use. Do not self-medicate alongside prescription lithium. Stay well hydrated.", link:"https://pubmed.ncbi.nlm.nih.gov/17706282/" },
    { name:"CoQ10 (Ubiquinol form)", dose:"", emoji:"⚡", science:"Mitochondrial function is increasingly implicated in bipolar disorder. CoQ10 supports electron transport chain efficiency and reduces the oxidative stress associated with mood cycling.", why:"Bipolar disorder shows measurable mitochondrial dysfunction in brain cells — the energy production machinery is impaired, particularly during episodes. CoQ10 as ubiquinol (the active, reduced form) directly supports mitochondrial ATP production in neurons, providing a more stable energy substrate for mood regulation.", timing:"With a fatty meal — fat dramatically improves CoQ10 absorption.", caution:"Ubiquinol is preferred over ubiquinone. Very safe but expensive. May mildly lower blood pressure.", link:"https://pubmed.ncbi.nlm.nih.gov/22114195/" },
  ],
  ocd: [
    { name:"NAC (N-Acetyl Cysteine)", dose:"", emoji:"🛡️", science:"The most evidence-backed supplement for OCD. Multiple RCTs as an augmentation to SSRIs show significant reduction in Yale-Brown OCD Scale scores by modulating glutamate.", why:"OCD is increasingly understood as a glutamate dysregulation disorder, not just a serotonin one. The cortico-striato-thalamo-cortical circuit that gets 'stuck' in OCD is driven by glutamate hyperactivity. NAC reduces glutamate release and increases glutamate uptake via the cystine-glutamate transporter, directly quieting the compulsive loop.", timing:"With meals to reduce nausea.", caution:"Takes weeks to build. Always use alongside (not instead of) prescribed treatment.", link:"https://pubmed.ncbi.nlm.nih.gov/22464336/" },
    { name:"Inositol", dose:"", emoji:"🫧", science:"A B-vitamin relative that modulates serotonin receptors. An RCT showed inositol reduced OCD symptoms comparably to fluvoxamine in some measures.", why:"Inositol is a second messenger in serotonin receptor signal transduction — it's not serotonin itself, but it carries serotonin's messages inside neurons. OCD involves dysregulated serotonin signalling in the orbitofrontal cortex, and inositol restores the intracellular side of this communication pathway that SSRIs alone don't fully address.", timing:"Split across 2–3 doses with food.", caution:"High doses required — use powder. Can cause mild GI upset initially.", link:"https://pubmed.ncbi.nlm.nih.gov/8780431/" },
    { name:"Omega-3 (EPA/DHA)", dose:"", emoji:"🐟", science:"Anti-inflammatory omega-3s may reduce neuroinflammation implicated in OCD pathology and support response to CBT and SSRI treatment.", why:"Neuroinflammation appears to contribute to OCD severity — elevated inflammatory markers are found in OCD patients and correlate with symptom severity. EPA omega-3s reduce the key inflammatory cytokines (IL-6, TNF-alpha) that sensitise the corticostriatal circuits involved in the OCD loop.", timing:"With a meal containing fat.", caution:"Standard cautions apply — inform your prescribing doctor.", link:"" },
    { name:"Magnesium Glycinate", dose:"", emoji:"🌿", science:"Supports NMDA receptor modulation and anxiety reduction — both relevant to OCD. Also helps with sleep disruption common in OCD.", why:"Anxiety fuels OCD — when anxiety rises, compulsive behaviours intensify. Magnesium's NMDA-blocking action reduces the anxiety component of OCD, lowering the urgency that drives compulsions. It also improves sleep quality, and poor sleep consistently worsens OCD symptom severity.", timing:"Evening.", caution:"Very well tolerated at standard doses.", link:"" },
    { name:"Milk Thistle (Silymarin)", dose:"", emoji:"🌾", science:"Emerging research shows silymarin from milk thistle has glutamate-modulating and neuroprotective properties relevant to OCD treatment augmentation.", why:"The liver metabolises many OCD medications, and glutamate regulation depends partly on liver health and metabolism. Silymarin's hepatoprotective effects ensure optimal drug metabolism, while its direct glutamate-modulating properties support the same circuit NAC targets — the corticostriatal glutamate excess.", timing:"With meals.", caution:"Very well tolerated. Mild laxative effect at high doses.", link:"" },
    { name:"Bacopa Monnieri", dose:"", emoji:"🌿", science:"Bacopa's anxiolytic and cognitive-enhancing properties may complement OCD treatment by reducing anxiety and supporting the cognitive flexibility that OCD impairs.", why:"OCD severely impairs cognitive flexibility — the ability to shift attention away from obsessive thoughts. Bacopa enhances acetylcholine signalling in the prefrontal cortex and anterior cingulate, the exact regions that perform this switching function. Stronger prefrontal control means greater ability to disengage from the compulsive loop.", timing:"With a fatty meal.", caution:"Effects build over 8–12 weeks. GI upset possible without food.", link:"https://pubmed.ncbi.nlm.nih.gov/22747190/" },
  ],
  schizophrenia: [
    { name:"Omega-3 (EPA/DHA)", dose:"", emoji:"🐟", science:"Multiple trials show omega-3 supplementation reduces psychotic symptoms, particularly negative symptoms (flat affect, social withdrawal), and may slow disease progression.", why:"Schizophrenia is associated with deficient phospholipid metabolism — neuronal membranes are depleted of EPA and DHA, making them more prone to the abnormal signal transduction underlying psychosis. Supplementation physically restores membrane composition in the prefrontal cortex and dopaminergic pathways, improving both symptom control and antipsychotic response.", timing:"With meals containing fat.", caution:"Always in coordination with your psychiatrist. May affect medication levels.", link:"https://pubmed.ncbi.nlm.nih.gov/26978738/" },
    { name:"Vitamin D3 + K2", dose:"", emoji:"☀️", science:"Vitamin D deficiency is highly prevalent in schizophrenia and associated with greater symptom burden, cognitive impairment, and worse treatment response.", why:"Vitamin D regulates dopaminergic pathways in the mesolimbic system — the exact circuits dysregulated in schizophrenia. Deficiency is found in the majority of people with schizophrenia and correction is associated with improvements in negative symptoms and cognition.", timing:"Morning with a fatty meal.", caution:"Test levels before supplementing. Toxicity possible at very high doses.", link:"" },
    { name:"Glycine", dose:"", emoji:"🔬", science:"High-dose glycine supplementation has shown significant reduction in negative symptoms of schizophrenia in multiple controlled trials by enhancing NMDA receptor function.", why:"The NMDA receptor hypofunction model of schizophrenia proposes that insufficient NMDA activation (particularly on interneurons) underlies negative and cognitive symptoms. Glycine is an obligatory co-agonist at NMDA receptors — increasing its concentration enhances NMDA activity in a way that may restore interneuron function.", timing:"With meals, split throughout the day.", caution:"High doses — discuss with psychiatrist. May interact with clozapine. GI upset common initially.", link:"https://pubmed.ncbi.nlm.nih.gov/10078902/" },
    { name:"NAC (N-Acetyl Cysteine)", dose:"", emoji:"🛡️", science:"Multiple RCTs show NAC significantly reduces negative symptoms and improves overall functioning in schizophrenia, with effects appearing after 6–8 weeks.", why:"Oxidative stress and glutathione depletion are well-established features of schizophrenia. NAC replenishes glutathione — the brain's primary antioxidant — reducing the oxidative damage to dopaminergic and glutamatergic neurons that contributes to symptom severity and cognitive decline.", timing:"With meals.", caution:"Discuss with your psychiatrist before starting. Generally well tolerated but start low.", link:"https://pubmed.ncbi.nlm.nih.gov/21118657/" },
    { name:"B-Complex (Methylated)", dose:"", emoji:"🔋", science:"B vitamin deficiencies — particularly B12, folate, and B6 — are common in schizophrenia and associated with elevated homocysteine, a neurotoxin that worsens symptoms.", why:"Elevated homocysteine is found in schizophrenia and directly damages myelin and dopaminergic neurons. B12, folate, and B6 are the three vitamins that metabolise homocysteine into non-toxic compounds. Normalising homocysteine levels through B vitamins has been shown to improve cognitive symptoms and overall functioning.", timing:"Morning with breakfast.", caution:"Use methylated forms. B vitamin supplementation is very safe but inform your care team.", link:"" },
  ],
  autism: [
    { name:"Vitamin D3 + K2", dose:"", emoji:"☀️", science:"Vitamin D deficiency is significantly more prevalent in autism spectrum individuals, and correction is associated with improvements in core ASD behaviours, language, and social responsiveness.", why:"Vitamin D regulates over 200 genes involved in brain development, including those governing serotonin, oxytocin, and dopamine synthesis. These neurotransmitter systems are consistently altered in ASD. Adequate D3 supports the gene expression that underlies social motivation and sensory regulation.", timing:"Morning with a fatty meal.", caution:"Test before supplementing. Optimal ASD levels may need to be higher than general population ranges.", link:"https://pubmed.ncbi.nlm.nih.gov/26748652/" },
    { name:"Omega-3 (EPA/DHA)", dose:"", emoji:"🐟", science:"Multiple trials show omega-3 supplementation improves hyperactivity, irritability, and stereotypy in autism, with better outcomes for those with lower baseline omega-3 levels.", why:"Autism is associated with increased neuroinflammation and altered phospholipid metabolism in the brain. EPA reduces inflammatory cytokines that affect social and communication brain networks, while DHA supports the structural integrity of the cerebral cortex and hippocampus where ASD-related differences are concentrated.", timing:"With a fatty meal.", caution:"Choose molecularly distilled brands. Start with lower doses and increase gradually.", link:"https://pubmed.ncbi.nlm.nih.gov/22269196/" },
    { name:"Magnesium + B6", dose:"", emoji:"🌿", science:"The Magnesium-B6 combination is one of the most studied autism interventions, with multiple trials showing improvements in behaviour, sleep, and social interaction.", why:"B6 is essential for the synthesis of GABA and serotonin — neurotransmitters that are dysregulated in ASD and responsible for sensory sensitivity and social comfort. Magnesium is B6's essential cofactor — without adequate magnesium, B6's neurochemical work cannot proceed. This synergistic pair supports the calming and social neurotransmitter systems most affected in ASD.", timing:"With meals.", caution:"B6 can cause peripheral neuropathy at very high long-term doses (>200mg). Stay within recommended ranges.", link:"https://pubmed.ncbi.nlm.nih.gov/12849883/" },
    { name:"Probiotics (Multi-strain)", dose:"", emoji:"🦠", science:"Growing evidence links gut microbiome composition to ASD symptom severity via the gut-brain axis. Probiotic interventions show improvements in GI symptoms and some behavioural outcomes.", why:"The gut-brain axis is profoundly relevant in ASD — up to 70% of autistic individuals have GI issues, and gut bacteria produce neurotransmitter precursors (including 90% of the body's serotonin). A dysbiotic gut microbiome can generate neuroactive compounds that worsen sensory sensitivity, anxiety, and behavioural regulation.", timing:"With or without food — morning is fine.", caution:"Start with lower doses. Some individuals temporarily experience increased GI symptoms.", link:"https://pubmed.ncbi.nlm.nih.gov/32483929/" },
    { name:"NAC (N-Acetyl Cysteine)", dose:"", emoji:"🛡️", science:"A placebo-controlled RCT showed NAC significantly reduced irritability scores in ASD. Subsequent studies confirm benefits for irritability and repetitive behaviours.", why:"Oxidative stress and glutathione deficiency are well-documented in autism. Brain tissue from ASD individuals shows significantly reduced glutathione. NAC replenishes this critical antioxidant, reducing the oxidative burden on neurons involved in sensory processing, emotional regulation, and social cognition.", timing:"With meals to reduce nausea.", caution:"Start low and build up over 4–6 weeks. Generally well tolerated.", link:"https://pubmed.ncbi.nlm.nih.gov/22010755/" },
    { name:"Sulforaphane (Broccoli Sprout Extract)", dose:"", emoji:"🥦", science:"A landmark randomised trial showed sulforaphane improved social interaction, verbal communication, and repetitive behaviours in young men with ASD, with effects reversing when supplementation stopped.", why:"Sulforaphane activates the NRF2 pathway — the master switch for the body's antioxidant defences. NRF2 activation also reduces neuroinflammation and upregulates heat shock proteins that protect neurons from stress. In ASD, these protective pathways are undermined, and sulforaphane is one of the few compounds that powerfully activates them.", timing:"With meals. Broccoli sprouts have the highest concentration.", caution:"Avoid in people with thyroid conditions (goitrogenic at very high doses). Standardised supplements preferred over raw sprout consumption for dose consistency.", link:"https://pubmed.ncbi.nlm.nih.gov/25313065/" },
  ],
  eating_disorder: [
    { name:"Zinc", dose:"", emoji:"⚡", science:"Zinc deficiency is found in the majority of eating disorder patients. Zinc supplementation accelerates weight restoration and reduces anxiety in anorexia nervosa in multiple controlled trials.", why:"Zinc is essential for the function of appetite-regulating hormones (leptin, ghrelin) and for taste perception. In anorexia, restriction depletes zinc, which worsens appetite suppression and dysgeusia (altered taste) — creating a self-perpetuating cycle that zinc supplementation can help interrupt by restoring appetite signalling.", timing:"With food to avoid nausea.", caution:"Use zinc gluconate or picolinate. Use zinc gluconate or picolinate form. Take away from calcium.", link:"https://pubmed.ncbi.nlm.nih.gov/8244656/" },
    { name:"Omega-3 (EPA/DHA)", dose:"", emoji:"🐟", science:"Omega-3 deficiency is common in eating disorders due to restriction. Supplementation supports mood stabilisation, reduces anxiety, and addresses neuroinflammation associated with eating disorder behaviours.", why:"Both anorexia and bulimia involve elevated neuroinflammatory markers that worsen anxiety, depression, and cognitive rigidity. EPA directly reduces these inflammatory cytokines, while DHA supports the structural integrity of the prefrontal cortex — the region responsible for flexible, non-rigid thinking about food and body image.", timing:"With a meal containing fat.", caution:"Start with low doses. Important to take with adequate caloric intake.", link:"https://pubmed.ncbi.nlm.nih.gov/21784145/" },
    { name:"Vitamin D3 + K2", dose:"", emoji:"☀️", science:"Vitamin D deficiency is nearly universal in eating disorders due to food restriction and avoidance of fat-containing foods. Bone health and mood are primary concerns.", why:"Restriction leads to severe vitamin D deficiency, compromising bone mineralisation (particularly dangerous in anorexia), immune function, and serotonin production. Adequate D3 supports the serotonin system, which regulates satiety, mood, and the anxiety that drives restrictive or purging behaviours.", timing:"Morning with food.", caution:"Essential to supplement given near-universal deficiency in ED populations. Monitor bone density.", link:"" },
    { name:"Magnesium Glycinate", dose:"", emoji:"🌿", science:"Restriction and purging cause severe magnesium deficiency. Repletion supports muscle function, heart health, mood stability, and reduces anxiety — all critical in eating disorder recovery.", why:"Purging behaviours cause electrolyte depletion including magnesium, which can have serious cardiac consequences. Beyond safety, magnesium's anxiolytic and mood-stabilising properties directly address the anxiety and emotional dysregulation that sustain eating disorder behaviours, making it fundamental to recovery.", timing:"Evening.", caution:"Critical for those who purge — discuss electrolyte repletion with your doctor. Do not self-manage if purging is active.", link:"" },
    { name:"B-Complex (Methylated)", dose:"", emoji:"🔋", science:"B vitamin deficiencies across the board are universal in eating disorders. Thiamine (B1) deficiency in particular can cause serious neurological complications.", why:"Restriction depletes all B vitamins, but the consequences are most severe for thiamine (B1), which is required for brain glucose metabolism — the brain's only fuel. Thiamine deficiency causes Wernicke's encephalopathy. All B vitamins support the neurotransmitter synthesis pathways that eating disorders profoundly disrupt.", timing:"Morning with food.", caution:"B vitamins are among the first priorities in nutritional rehabilitation. Thiamine should be considered before refeeding in severe restriction to prevent refeeding syndrome complications.", link:"" },
    { name:"Probiotics (Multi-strain)", dose:"", emoji:"🦠", science:"Eating disorders profoundly disrupt the gut microbiome, and the gut-brain axis influences mood, appetite signalling, and even food cravings. Probiotic restoration supports physical and psychological recovery.", why:"The gut microbiome produces 90% of the body's serotonin and significantly influences hunger and satiety hormones. Eating disorders devastate microbiome diversity, dysregulating the gut signals that should guide normal eating. Probiotic restoration supports normalisation of appetite, GI comfort with eating, and the emotional regulation that recovery requires.", timing:"With or without food.", caution:"May initially increase GI symptoms as gut flora is restored. Start with lower doses.", link:"" },
  ],
  default: [
    { name:"Omega-3 (EPA/DHA)", dose:"", emoji:"🐟", science:"The most replicated nutrition-psychiatry finding. Omega-3 supports membrane fluidity in brain cells, reduces neuroinflammation, and supports mood, focus, and cognitive function across conditions.", why:"Every brain cell membrane is composed partly of fatty acids. When those membranes are rich in EPA and DHA, neurons communicate faster and more efficiently. Omega-3 deficiency is endemic in modern diets and consistently associated with mood disorders, cognitive decline, and reduced stress resilience.", timing:"With a meal containing fat for best absorption.", caution:"Choose molecularly distilled, third-party tested brands.", link:"https://pubmed.ncbi.nlm.nih.gov/26978738/" },
    { name:"Magnesium Glycinate", dose:"", emoji:"🌿", science:"Over 300 enzymatic reactions in the body require magnesium. Most people are deficient. Supports sleep, stress response, mood, and nervous system regulation.", why:"Magnesium is sometimes called nature's relaxant because it modulates the NMDA receptor — the brain's primary excitatory channel. Without adequate magnesium, the nervous system is chronically overactivated, leading to anxiety, poor sleep, and heightened stress reactivity. Deficiency is extremely common in people under stress.", timing:"Evening for sleep and relaxation benefits.", caution:"Start at 100mg and build up. Glycinate form is the most bioavailable and gentle.", link:"https://pubmed.ncbi.nlm.nih.gov/28445426/" },
    { name:"Vitamin D3 + K2", dose:"", emoji:"☀️", science:"Vitamin D is technically a neurosteroid. Deficiency — extremely common especially in northern climates — is linked to depression, cognitive decline, and immune dysfunction.", why:"Vitamin D receptors exist in almost every brain region. Deficiency reduces serotonin and dopamine gene expression, blunts cognitive function, and increases susceptibility to depression and anxiety. Most adults in northern climates are deficient for 6 months of the year without supplementation.", timing:"Morning with a fatty meal.", caution:"Test your blood levels first. K2 ensures calcium goes to bones, not arteries.", link:"https://pubmed.ncbi.nlm.nih.gov/22254078/" },
    { name:"B-Complex (Methylated)", dose:"", emoji:"🔋", science:"B vitamins are upstream cofactors for virtually every neurotransmitter. Methylated forms bypass common MTHFR gene variants that impair B vitamin utilisation in up to 40% of people.", why:"Without B vitamins, the brain cannot synthesise serotonin (needs B6), produce myelin (needs B12), or regulate homocysteine (needs folate + B12). Homocysteine is neurotoxic at elevated levels and is reduced only by adequate B vitamins. The methylated forms are active immediately without requiring the liver conversion that up to 40% of people cannot efficiently perform.", timing:"Morning with food.", caution:"May make urine bright yellow (harmless B2 effect). Avoid late in the day — energising for some.", link:"" },
    { name:"Lion's Mane Mushroom", dose:"", emoji:"🦁", science:"Contains hericenones and erinacines that stimulate Nerve Growth Factor (NGF) — promoting neuroplasticity and cognitive function. Clinical trials show improvements in memory and mild mood disturbances.", why:"The modern brain is under chronic stress that reduces neuroplasticity — the brain's ability to form new connections and adapt. Lion's Mane is one of the only food-derived compounds that stimulates NGF and BDNF, the growth factors that maintain and build healthy neural architecture. Think of it as fertiliser for your brain.", timing:"With meals. Benefits accumulate over 4–8 weeks.", caution:"Very well tolerated. Rare mushroom allergy possible.", link:"https://pubmed.ncbi.nlm.nih.gov/30864515/" },
  ],
};

const SUPPLEMENT_CONDITION_MAP = {
  adhd:"adhd", anxiety:"anxiety", depression:"depression", ptsd:"ptsd",
  bipolar_disorder:"bipolar", ocd:"ocd", bipolar_i:"bipolar", bipolar_ii:"bipolar",
  mdd:"depression", gad:"anxiety", social_anxiety:"anxiety", panic_disorder:"anxiety",
  neuro_core:"default",
};

const WEEKS = ["Week 1","Week 2","Week 3","Week 4"];
const DAY_NAMES = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

// ── Ingredient Science Database ────────────────────────────────────────────
// Each ingredient maps to: { nutrient, what_it_does, conditions: { conditionId: why_it_matters } }
const INGREDIENT_SCIENCE = {
  // ── Grains & Carbs ──
  oatmeal: {
    nutrient: "beta-glucan soluble fiber, B vitamins (B1, B5), and complex slow-release carbohydrates",
    what_it_does: "digests slowly to create a steady stream of glucose to the brain — preventing the blood sugar crashes that destabilize mood and focus",
    conditions: {
      adhd: "ADHD brains are especially sensitive to blood sugar swings, which worsen impulsivity and attention; oatmeal's slow glucose release keeps dopamine systems stable for hours",
      anxiety: "blood sugar crashes spike cortisol, the stress hormone that triggers anxiety; oatmeal's slow digestion keeps cortisol calm all morning",
      depression: "steady glucose supports consistent serotonin availability — serotonin synthesis drops sharply during blood sugar dips",
      bipolar: "glucose instability is a known mood cycling trigger; oatmeal's flat glycemic curve is one of the most effective dietary stabilizers for bipolar disorder",
      schizophrenia: "erratic glucose causes neuroinflammation; oatmeal's beta-glucan fiber feeds gut bacteria that produce short-chain fatty acids protective to the brain",
      autism: "predictable, steady energy helps regulate sensory processing and emotional regulation throughout the morning",
      ptsd: "stabilizing blood sugar lowers baseline cortisol, reducing the hyperarousal and startle response that define PTSD",
      ocd: "complex carbs gradually raise serotonin levels — serotonin is the neurotransmitter most directly involved in OCD symptom severity",
      bpd: "steady energy prevents the rapid mood shifts that are amplified by blood sugar instability in borderline personality disorder",
      default: "complex carbs provide sustained glucose for neurotransmitter synthesis, energy, and cognitive function throughout the morning",
    }
  },
  oats: {
    nutrient: "beta-glucan fiber, magnesium, zinc, and slow-release carbohydrates",
    what_it_does: "provides sustained energy while feeding beneficial gut bacteria that produce serotonin precursors",
    conditions: {
      adhd: "slow-digesting carbs prevent blood sugar crashes that worsen ADHD symptoms, while magnesium supports dopamine production",
      anxiety: "magnesium in oats acts directly on GABA receptors, the brain's main calming system — low magnesium is found in 75% of anxious individuals",
      depression: "oats contain tryptophan, the direct precursor to serotonin, plus the B vitamins needed to convert it",
      bipolar: "magnesium has lithium-like mood-stabilizing properties at the cellular level, and is commonly depleted in bipolar disorder",
      schizophrenia: "zinc in oats is a cofactor for dopamine and glutamate regulation — both systems dysregulated in schizophrenia",
      default: "provides magnesium, zinc, and fiber for brain health and sustained morning energy",
    }
  },
  flaxseed: {
    nutrient: "alpha-linolenic acid (plant omega-3), lignans, and soluble fiber",
    what_it_does: "converts partially to EPA and DHA in the body, which build brain cell membranes and reduce neuroinflammation",
    conditions: {
      bipolar: "omega-3 fatty acids are the most studied supplement in bipolar disorder — multiple trials show they reduce depressive episodes by supporting healthy neuron membrane function",
      adhd: "omega-3s increase dopamine receptor sensitivity, meaning the same amount of dopamine produces a stronger, more sustained focus effect",
      depression: "EPA (converted from ALA in flaxseed) is as effective as antidepressants for mild-to-moderate depression in multiple meta-analyses",
      anxiety: "omega-3s reduce inflammatory cytokines that activate the brain's fear and threat-detection circuits",
      ptsd: "omega-3s lower baseline inflammation in the amygdala, reducing hypervigilance and intrusive thoughts",
      ocd: "anti-inflammatory omega-3s reduce neuroinflammation in the cortico-striatal-thalamic circuits involved in OCD",
      default: "plant omega-3s reduce neuroinflammation and support healthy brain cell membrane structure",
    }
  },
  honey: {
    nutrient: "fructose, glucose, and trace minerals including potassium and calcium",
    what_it_does: "provides quick natural glucose for immediate brain energy without the insulin spike of refined sugar, and contains antioxidant phenolic compounds",
    conditions: {
      adhd: "natural sugars give an immediate glucose boost that bridges the gap before oatmeal's slow carbs kick in, without a crash",
      depression: "the phenolic antioxidants in honey reduce oxidative stress in neurons — oxidative damage is elevated in depression",
      anxiety: "small amounts of natural glucose support serotonin synthesis without causing the cortisol spike that refined sugar triggers",
      bipolar: "unlike refined sugar, honey's fructose-glucose ratio causes a gentler, more stable blood sugar response, reducing mood cycling triggers",
      default: "provides natural glucose for immediate brain fuel plus antioxidant phenolics that protect neurons",
    }
  },
  berries: {
    nutrient: "anthocyanins, polyphenols, vitamin C, and manganese",
    what_it_does: "anthocyanins cross the blood-brain barrier and directly reduce neuroinflammation, while polyphenols improve cerebral blood flow",
    conditions: {
      bipolar: "neuroinflammation is a core driver of mood episodes in bipolar disorder — berries' anti-inflammatory anthocyanins directly address this at the cellular level",
      depression: "studies show berry polyphenols increase BDNF (brain-derived neurotrophic factor), which grows new neural connections — BDNF is severely depleted in depression",
      adhd: "improved cerebral blood flow means the prefrontal cortex (responsible for focus, planning, and impulse control) gets more oxygen and glucose",
      anxiety: "vitamin C reduces cortisol levels significantly — research shows 1000mg of vitamin C lowers cortisol by up to 29% in stressed individuals",
      schizophrenia: "anthocyanins protect dopamine neurons from oxidative damage — dopamine system integrity is central to schizophrenia symptom management",
      ptsd: "polyphenols reduce amygdala hyperreactivity, the brain region responsible for the exaggerated fear response in PTSD",
      ocd: "BDNF boost from polyphenols supports neuroplasticity, helping the brain form new, less compulsive neural pathways",
      default: "anthocyanins reduce neuroinflammation and polyphenols boost BDNF, supporting brain cell health and cognitive function",
    }
  },
  banana: {
    nutrient: "tryptophan, vitamin B6, potassium, and natural sugars",
    what_it_does: "tryptophan combined with B6 creates a direct serotonin synthesis pathway in the brain",
    conditions: {
      depression: "tryptophan is the only amino acid the brain converts to serotonin, and B6 is the essential cofactor that catalyzes this conversion — together they directly raise serotonin",
      anxiety: "potassium in bananas helps regulate the nervous system's electrical signaling, and B6 supports GABA production — the brain's main anxiety-inhibiting neurotransmitter",
      adhd: "B6 is required to synthesize dopamine and norepinephrine, not just serotonin — this makes bananas unusually valuable for ADHD, which involves deficits in both",
      bipolar: "the tryptophan-to-serotonin pathway helps stabilize mood, and potassium supports healthy neural membrane function implicated in mood cycling",
      ptsd: "serotonin is directly suppressed in PTSD — tryptophan from banana begins rebuilding this system from the dietary level up",
      ocd: "OCD is fundamentally a serotonin-dysregulation disorder; tryptophan + B6 from banana directly feeds the serotonin system most in need of support",
      default: "delivers tryptophan and B6 to support serotonin synthesis, plus potassium for healthy nervous system function",
    }
  },
  cinnamon: {
    nutrient: "cinnamaldehyde, proanthocyanidins, and chromium",
    what_it_does: "chromium improves insulin sensitivity, stabilizing blood sugar, while cinnamaldehyde has anti-inflammatory effects on brain tissue",
    conditions: {
      adhd: "blood sugar stability is critical for ADHD — cinnamon's chromium content improves how cells respond to insulin, extending the focus window after meals",
      bipolar: "mood cycling correlates strongly with blood sugar instability; cinnamon helps flatten post-meal glucose curves",
      depression: "inflammation in the brain suppresses serotonin production; cinnamon's anti-inflammatory cinnamaldehyde helps remove this block",
      anxiety: "post-meal blood sugar spikes trigger cortisol release — cinnamon reduces these spikes, keeping cortisol lower",
      default: "stabilizes blood sugar and reduces neuroinflammation",
    }
  },

  // ── Proteins ──
  chicken: {
    nutrient: "tyrosine, tryptophan, leucine, and B3 (niacin)",
    what_it_does: "tyrosine is the direct amino acid precursor to dopamine and norepinephrine; tryptophan is the precursor to serotonin — chicken delivers both in a single protein source",
    conditions: {
      adhd: "ADHD brains have chronically low dopamine signaling — tyrosine from chicken directly provides the raw building block the brain needs to manufacture more dopamine",
      depression: "tryptophan in chicken raises serotonin, while niacin (B3) is required for the conversion reaction — chicken delivers both the substrate and the cofactor",
      anxiety: "tryptophan raises serotonin, which in turn reduces anxiety signaling in the amygdala; combined with niacin, chicken is one of the most effective food-based serotonin boosters",
      bipolar: "both dopamine and serotonin pathways are dysregulated in bipolar disorder — chicken's dual amino acid profile supports stabilizing both simultaneously",
      schizophrenia: "regulated dopamine production (not too high, not too low) depends on tyrosine availability; chicken provides the building block while the body self-regulates the quantity",
      ptsd: "tryptophan raises serotonin, which is severely depleted in PTSD; consistent high-quality protein intake is foundational to rebuilding this system",
      ocd: "serotonin reuptake is the primary mechanism of OCD medications — chicken's tryptophan increases the serotonin available for this system",
      autism: "consistent protein from whole food sources supports gut-brain axis health, and tyrosine aids focus and sensory regulation",
      bpd: "serotonin instability drives emotional dysregulation in BPD — tryptophan + niacin from chicken supports a more stable baseline",
      default: "provides tyrosine for dopamine synthesis and tryptophan for serotonin production — two of the brain's most essential neurotransmitter precursors",
    }
  },
  turkey: {
    nutrient: "tryptophan (highest of all meats), B6, selenium, and zinc",
    what_it_does: "turkey has the highest tryptophan content of any common protein, making it uniquely effective at raising brain serotonin levels",
    conditions: {
      depression: "serotonin deficiency is the most studied biological factor in depression — turkey's exceptional tryptophan content directly addresses this at the dietary level",
      anxiety: "higher serotonin from tryptophan inhibits the amygdala's fear response; selenium in turkey also reduces the oxidative stress that drives anxiety",
      ocd: "OCD medications work by keeping serotonin active longer in synapses; turkey's tryptophan raises the serotonin level that those medications then preserve",
      ptsd: "selenium reduces neuroinflammation in the hippocampus, the brain region most damaged by trauma and chronic stress",
      adhd: "zinc in turkey is a cofactor for dopamine synthesis — ADHD is strongly associated with low zinc levels",
      bipolar: "zinc and selenium together support healthy thyroid function, which is closely linked to mood stability in bipolar disorder",
      bpd: "serotonin stability reduces the emotional intensity and reactivity that characterize BPD",
      default: "excellent source of tryptophan for serotonin production, plus selenium and zinc for brain protection",
    }
  },
  beef: {
    nutrient: "heme iron, zinc, B12, creatine, and complete amino acids including tyrosine",
    what_it_does: "heme iron is essential for dopamine production and oxygen transport to brain tissue; B12 is required for myelin (nerve insulation) synthesis",
    conditions: {
      adhd: "iron deficiency is found in over 84% of children with ADHD; heme iron from beef is absorbed 2-3x more efficiently than plant iron, directly supporting dopamine synthesis",
      depression: "B12 deficiency causes depression by disrupting myelin, which slows nerve conduction and impairs neurotransmitter function; beef is one of the densest B12 sources available",
      schizophrenia: "B12 and folate work together to regulate homocysteine, which is elevated in schizophrenia and is neurotoxic at high levels",
      bipolar: "creatine in beef supports cellular energy production in neurons, which is dysregulated during mood episodes",
      ptsd: "zinc reduces neuroinflammation in the hippocampus; B12 supports rebuilding of myelin damaged by chronic stress hormone exposure",
      default: "heme iron supports dopamine synthesis, B12 maintains nerve insulation, and zinc supports multiple neurotransmitter systems",
    }
  },
  steak: {
    nutrient: "tyrosine, phenylalanine, heme iron, zinc, and B12",
    what_it_does: "tyrosine and phenylalanine are the two essential precursors to dopamine and norepinephrine — steak delivers both in high concentration",
    conditions: {
      adhd: "dopamine and norepinephrine are the exact neurotransmitters targeted by ADHD medication — steak delivers the amino acid precursors to build them naturally",
      depression: "iron deficiency causes fatigue and blunted dopamine response that mimics and worsens depression; heme iron from steak restores this system",
      bipolar: "B12 in steak protects myelin and regulates homocysteine, elevated levels of which are found during manic and depressive episodes",
      ptsd: "tyrosine supports norepinephrine production, which is needed for healthy stress response regulation — chronic PTSD disrupts this system",
      bpd: "zinc in steak is a cofactor in serotonin and dopamine synthesis, supporting the emotional regulation systems most challenged in BPD",
      default: "rich in amino acid precursors for dopamine and norepinephrine, plus iron and B12 for healthy brain function",
    }
  },
  salmon: {
    nutrient: "EPA and DHA omega-3 fatty acids, vitamin D, and astaxanthin",
    what_it_does: "EPA and DHA are the primary structural fats in brain cell membranes — they determine how fluidly neurotransmitter receptors move and respond",
    conditions: {
      depression: "EPA is the omega-3 most studied for depression — it matches antidepressant effectiveness in mild-moderate depression and enhances medication response in severe cases",
      anxiety: "DHA reduces inflammatory cytokines that activate the brain's threat-detection system; EPA reduces cortisol receptor sensitivity",
      adhd: "omega-3 supplementation improves attention by 20-30% in clinical trials — salmon provides the EPA and DHA directly without conversion loss",
      bipolar: "multiple RCTs show research-supported EPA+DHA reduces bipolar depressive episodes; salmon is the most bioavailable dietary source",
      ptsd: "EPA reduces amygdala reactivity and inflammatory markers that are chronically elevated in PTSD",
      ocd: "DHA supports the prefrontal cortex, the brain region responsible for overriding compulsive impulses",
      schizophrenia: "omega-3 deficiency is found in most people with schizophrenia; supplementation reduces positive symptoms and supports antipsychotic medication efficacy",
      default: "EPA and DHA from salmon build brain cell membranes and reduce neuroinflammation across all mental health conditions",
    }
  },
  eggs: {
    nutrient: "choline, tyrosine, B12, vitamin D, and selenium",
    what_it_does: "choline is converted to acetylcholine, the neurotransmitter responsible for memory, learning, and attention — eggs are the single richest dietary source of choline",
    conditions: {
      adhd: "acetylcholine is essential for working memory and sustained attention — two functions most impaired in ADHD; egg choline directly builds this neurotransmitter",
      depression: "B12 and vitamin D in eggs address two of the most common nutritional deficiencies underlying depression; selenium reduces oxidative neuroinflammation",
      schizophrenia: "choline in eggs modulates nicotinic acetylcholine receptors, the same receptors targeted in some schizophrenia research for cognitive symptom reduction",
      autism: "choline is critical for healthy brain development and neural pathway formation; adequate intake supports cognitive flexibility and learning",
      bipolar: "vitamin D in eggs regulates serotonin gene expression — deficiency is strongly linked to more frequent mood episodes",
      anxiety: "choline supports healthy myelin, which speeds neural communication and reduces the physiological symptoms of anxiety",
      default: "eggs are one of the most nutrient-dense brain foods, delivering choline for acetylcholine, B12 for myelin, and vitamin D for serotonin gene regulation",
    }
  },

  // ── Vegetables ──
  spinach: {
    nutrient: "folate, magnesium, vitamin K, and lutein",
    what_it_does: "folate activates the enzyme that converts 5-HTP into serotonin, while magnesium regulates over 300 brain enzyme reactions",
    conditions: {
      depression: "folate deficiency is found in over 30% of people with depression and directly reduces serotonin synthesis — spinach is one of the highest folate vegetables available",
      adhd: "magnesium in spinach is a cofactor for dopamine production, and deficiency is found in 95% of children with ADHD according to some studies",
      anxiety: "magnesium acts on GABA-A receptors (the same target as benzodiazepines) to reduce anxiety — it's nature's most widely studied calming mineral",
      bipolar: "magnesium has lithium-like mood-stabilizing properties and is commonly depleted by mood stabilizer medications",
      schizophrenia: "folate lowers homocysteine, which is neurotoxic and elevated in schizophrenia; magnesium supports glutamate regulation, another key system",
      ptsd: "magnesium reduces cortisol-driven neuroinflammation in the hippocampus, the brain structure most damaged by chronic trauma",
      ocd: "magnesium modulates NMDA glutamate receptors, which are overactive in OCD; folate supports the serotonin pathway central to OCD treatment",
      default: "folate for serotonin synthesis, magnesium for neurotransmitter production and nervous system calm",
    }
  },
  broccoli: {
    nutrient: "sulforaphane, folate, vitamin C, and vitamin K",
    what_it_does: "sulforaphane is one of the most potent naturally occurring activators of Nrf2, the brain's main antioxidant defense pathway",
    conditions: {
      schizophrenia: "oxidative stress and neuroinflammation are core features of schizophrenia — sulforaphane activates the brain's own antioxidant defenses at the gene level",
      depression: "neuroinflammation blocks serotonin production; sulforaphane reduces this inflammation, restoring the brain's ability to produce serotonin",
      adhd: "folate in broccoli supports dopamine synthesis pathways, and vitamin C helps convert dopamine into norepinephrine",
      bipolar: "sulforaphane reduces microglial activation (brain immune cells that drive neuroinflammation during mood episodes)",
      autism: "a clinical trial specifically found sulforaphane improved social interaction and behavioral symptoms in autism — broccoli is the primary dietary source",
      default: "sulforaphane activates the brain's antioxidant defense system; folate supports neurotransmitter synthesis",
    }
  },
  asparagus: {
    nutrient: "folate, inulin (prebiotic fiber), vitamin K, and glutathione",
    what_it_does: "asparagus is one of the highest folate-density vegetables available — folate activates the enzyme that converts 5-HTP into serotonin in the brain",
    conditions: {
      depression: "low folate is the single most common nutritional finding in depression; asparagus's folate directly enables serotonin production at the enzymatic level",
      adhd: "folate is required for dopamine synthesis as well as serotonin — asparagus supports both neurotransmitter pathways simultaneously",
      anxiety: "inulin in asparagus feeds Lactobacillus and Bifidobacterium gut bacteria that produce GABA, the brain's primary anxiety-inhibiting chemical",
      bipolar: "folate regulates homocysteine, which disrupts mood stability when elevated; asparagus brings folate levels up",
      ocd: "OCD severity correlates inversely with folate levels — clinical studies show folate augmentation improves OCD outcomes",
      schizophrenia: "glutathione in asparagus is the brain's primary antioxidant; deficiency is one of the most consistent biological findings in schizophrenia",
      default: "exceptional folate source for serotonin and dopamine synthesis; prebiotic fiber supports the gut-brain serotonin axis",
    }
  },
  sweetpotato: {
    nutrient: "beta-carotene (pro-vitamin A), B6, potassium, and complex carbohydrates",
    what_it_does: "B6 is the essential cofactor for converting tryptophan into serotonin and tyrosine into dopamine — sweet potato is one of the richest B6 sources",
    conditions: {
      depression: "B6 deficiency directly reduces serotonin production; sweet potato's B6 + carbs combination raises serotonin more effectively than carbs alone",
      adhd: "B6 supports both dopamine and norepinephrine synthesis; the slow carbs provide stable glucose for sustained focus",
      bipolar: "potassium supports healthy neuronal electrical signaling; B6 helps regulate the mood-sensitive neurotransmitter systems",
      anxiety: "B6 is required to produce GABA, and deficiency causes anxiety and irritability; sweet potato reliably restores B6 levels",
      ptsd: "beta-carotene is converted to vitamin A, which regulates the fear extinction pathway in the amygdala — a key target in PTSD treatment",
      autism: "B6 + magnesium combination is one of the most studied nutritional interventions in autism, shown to improve sensory processing and communication",
      default: "B6 for dopamine and serotonin synthesis, slow carbs for stable brain glucose, and beta-carotene for neuroprotection",
    }
  },
  mushrooms: {
    nutrient: "ergothioneine, vitamin D (when UV-exposed), B vitamins, and beta-glucans",
    what_it_does: "ergothioneine is a rare amino acid that concentrates in brain tissue and protects neurons from oxidative damage",
    conditions: {
      depression: "ergothioneine is found at lower levels in people with depression; mushrooms are the richest dietary source, and vitamin D supports serotonin gene expression",
      schizophrenia: "oxidative stress is a primary driver of neurodegeneration in schizophrenia; ergothioneine specifically protects the neurons most vulnerable",
      adhd: "B vitamins in mushrooms are cofactors for dopamine and norepinephrine production; B5 specifically supports adrenal function that regulates attention",
      default: "ergothioneine protects brain cells from oxidative damage; B vitamins support neurotransmitter production",
    }
  },
  avocado: {
    nutrient: "oleic acid (monounsaturated fat), folate, potassium, and vitamin K",
    what_it_does: "oleic acid is the primary fat in myelin (nerve insulation) and brain cell membranes — avocado fat supports rapid, healthy nerve signal transmission",
    conditions: {
      depression: "folate in avocado directly supports serotonin synthesis; oleic acid triggers the release of OEA (oleoylethanolamide), a compound with antidepressant-like properties",
      anxiety: "potassium in avocado supports parasympathetic nervous system activity — the 'rest and digest' state that counters anxiety",
      adhd: "oleic acid in avocado builds the myelin that speeds up prefrontal cortex signaling — the brain region responsible for executive function and impulse control",
      bipolar: "folate reduces homocysteine (a mood-destabilizing compound) and oleic acid supports membrane health for mood-regulating neurons",
      default: "healthy monounsaturated fats support brain cell membrane health; folate enables serotonin synthesis",
    }
  },
  kale: {
    nutrient: "sulforaphane, vitamin C, calcium, and vitamin K",
    what_it_does: "kale contains more vitamin C per calorie than almost any food — vitamin C is essential for converting dopamine into norepinephrine",
    conditions: {
      adhd: "dopamine-to-norepinephrine conversion requires vitamin C as a cofactor; without enough vitamin C, dopamine accumulates but norepinephrine (critical for focus) stays low",
      depression: "vitamin C reduces cortisol and oxidative stress that suppress serotonin production; calcium supports neural signaling",
      schizophrenia: "sulforaphane activates Nrf2 antioxidant pathways; vitamin C protects dopaminergic neurons from oxidative damage",
      default: "vitamin C for dopamine-to-norepinephrine conversion; sulforaphane for neuroprotection",
    }
  },

  // ── Fruits ──
  mango: {
    nutrient: "vitamin C, beta-carotene, and polyphenols including mangiferin",
    what_it_does: "mangiferin is a unique antioxidant that crosses the blood-brain barrier and has been shown to inhibit MAO-B, the enzyme that breaks down dopamine",
    conditions: {
      adhd: "by inhibiting MAO-B, mangiferin from mango keeps dopamine active in synapses longer — the same mechanism as some ADHD medications, but gently and nutritionally",
      depression: "vitamin C reduces cortisol and oxidative stress; mangiferin's MAO-inhibiting effect extends the activity of serotonin and dopamine",
      anxiety: "beta-carotene converts to vitamin A, which regulates the HPA stress axis — the system responsible for the anxiety response",
      bipolar: "antioxidant polyphenols reduce neuroinflammation that drives mood cycling; vitamin C supports dopamine-norepinephrine conversion",
      default: "mangiferin inhibits dopamine breakdown; vitamin C supports norepinephrine synthesis and cortisol reduction",
    }
  },
  strawberries: {
    nutrient: "vitamin C, ellagic acid, anthocyanins, and fisetin",
    what_it_does: "fisetin is a flavonoid that activates Nrf2 (brain's antioxidant defense) and has been shown to reduce neuroinflammation specifically in the hippocampus",
    conditions: {
      depression: "hippocampal neuroinflammation is central to depression — fisetin from strawberries reduces this; vitamin C lowers cortisol by up to 29% in studies",
      adhd: "fisetin improves long-term memory consolidation and reduces neuroinflammation in the prefrontal cortex; vitamin C supports norepinephrine synthesis",
      anxiety: "ellagic acid has GABA-enhancing properties; combined with vitamin C's cortisol-lowering effect, strawberries work on anxiety from multiple angles",
      bipolar: "fisetin reduces microglial activation during mood episodes; anthocyanins protect neurons from oxidative damage triggered by mood cycling",
      ptsd: "fisetin supports hippocampal health — the brain region that stores context for fear memories and enables fear extinction",
      default: "fisetin reduces hippocampal neuroinflammation; vitamin C supports dopamine-norepinephrine conversion and cortisol reduction",
    }
  },
  blueberries: {
    nutrient: "anthocyanins, pterostilbene, vitamin C, and resveratrol",
    what_it_does: "anthocyanins cross the blood-brain barrier and directly deposit in the hippocampus, where they increase BDNF (brain growth factor) and improve neural plasticity",
    conditions: {
      depression: "BDNF (brain-derived neurotrophic factor) is severely reduced in depression and directly reversed by antidepressant treatment — blueberries boost BDNF nutritionally",
      adhd: "cerebral blood flow improvements from anthocyanins directly benefit the prefrontal cortex; ptero-stilbene has been shown to improve working memory",
      bipolar: "BDNF is suppressed during depressive episodes in bipolar disorder; blueberries provide a nutritional BDNF boost alongside mood stabilizers",
      schizophrenia: "anthocyanins protect dopamine neurons in the striatum; resveratrol has anti-inflammatory effects on microglial cells",
      ptsd: "BDNF is critical for fear extinction and hippocampal recovery from trauma; blueberries are one of the best dietary BDNF boosters available",
      ocd: "BDNF supports neuroplasticity needed for the brain to form new, less compulsive behavioral pathways during therapy",
      default: "anthocyanins boost BDNF and improve cerebral blood flow, supporting brain plasticity and neuroprotection",
    }
  },
  peaches: {
    nutrient: "quercetin, chlorogenic acid, vitamin C, and beta-carotene",
    what_it_does: "quercetin and chlorogenic acid are polyphenols that reduce oxidative stress in the prefrontal cortex — the brain region responsible for executive function",
    conditions: {
      adhd: "the prefrontal cortex is the most metabolically active and oxidative-stress-vulnerable region — the region most impaired in ADHD; quercetin specifically protects it",
      depression: "chlorogenic acid has antidepressant-like activity in animal studies, reducing neuroinflammation in limbic regions; vitamin C lowers cortisol",
      anxiety: "quercetin modulates GABA receptors, producing mild anxiolytic effects, and reduces the inflammatory cytokines that activate anxiety circuits",
      bipolar: "beta-carotene converts to vitamin A, which regulates the serotonin and dopamine synthesis genes",
      ptsd: "quercetin reduces amygdala inflammatory activity; vitamin C counteracts the cortisol chronically elevated in PTSD",
      default: "quercetin and chlorogenic acid reduce neuroinflammation in the prefrontal cortex; vitamin C supports cortisol reduction",
    }
  },
  watermelon: {
    nutrient: "L-citrulline, lycopene, vitamin C, and potassium",
    what_it_does: "L-citrulline converts to arginine in the body, which produces nitric oxide — a signaling molecule that dilates blood vessels and improves cerebral blood flow",
    conditions: {
      adhd: "improved cerebral blood flow delivers more glucose and oxygen to the prefrontal cortex, directly supporting the attentional systems most challenged in ADHD",
      depression: "lycopene is one of the most potent antioxidants for brain tissue and is significantly reduced in people with depression",
      anxiety: "potassium supports healthy neuronal electrical thresholds, reducing the physiological arousal that accompanies anxiety",
      bipolar: "cerebral blood flow improvements support more even energy distribution across brain regions, reducing the imbalance between hypomanic and depressive states",
      default: "L-citrulline improves cerebral blood flow; lycopene protects brain cells from oxidative damage",
    }
  },
  pineapple: {
    nutrient: "bromelain, vitamin C, manganese, and thiamine (B1)",
    what_it_does: "bromelain is a proteolytic enzyme with anti-inflammatory properties; thiamine supports mitochondrial energy production in neurons",
    conditions: {
      adhd: "thiamine (B1) is essential for glucose metabolism in brain cells — ADHD brains have unusually high glucose demands and benefit from B1 support",
      depression: "vitamin C reduces cortisol; bromelain reduces systemic inflammation that suppresses serotonin production",
      anxiety: "manganese is a cofactor for antioxidant enzyme SOD2, which protects neurons from the oxidative stress triggered by chronic anxiety",
      bipolar: "thiamine deficiency causes neurological symptoms that mimic mood cycling; pineapple restores this essential cofactor",
      default: "bromelain reduces neuroinflammation; thiamine supports brain cell energy metabolism",
    }
  },
  grapes: {
    nutrient: "resveratrol, quercetin, and OPC (oligomeric proanthocyanidins)",
    what_it_does: "resveratrol activates SIRT1, a protein that protects neurons from stress-induced damage and supports mitochondrial function",
    conditions: {
      adhd: "SIRT1 activation improves dopamine signaling efficiency; quercetin protects dopaminergic neurons in the prefrontal cortex",
      depression: "resveratrol has MAOI-like activity (inhibits the enzyme that breaks down serotonin and dopamine) and reduces hippocampal inflammation",
      bipolar: "OPCs reduce microglial activation during mood episodes; resveratrol's neuroprotective effect supports mood-regulating circuits",
      anxiety: "quercetin in grapes modulates GABA-A receptors, producing mild calming effects",
      default: "resveratrol activates neuroprotective SIRT1; quercetin reduces neuroinflammation and supports GABA function",
    }
  },
  kiwi: {
    nutrient: "serotonin (direct), vitamin C, folate, and vitamin K",
    what_it_does: "kiwi is one of very few foods that contains actual serotonin — combined with folate (needed to make serotonin in the brain), it supports the serotonin system from two directions",
    conditions: {
      depression: "kiwi is the only common fruit with measurable serotonin content; folate activates serotonin-producing enzymes — a two-pronged approach to serotonin support",
      anxiety: "serotonin from kiwi supports the gut-brain serotonin axis; 95% of serotonin is made in the gut, where dietary serotonin from kiwi can be used",
      ocd: "serotonin support from both direct content and folate makes kiwi unusually valuable for OCD, which is a serotonin-dysregulation disorder",
      bipolar: "folate reduces homocysteine (a mood destabilizer elevated in bipolar disorder); vitamin C supports dopamine-norepinephrine conversion",
      ptsd: "folate supports serotonin synthesis that is chronically suppressed in PTSD; serotonin helps regulate the fear response",
      default: "rare direct serotonin content combined with folate for serotonin synthesis support",
    }
  },

  // ── Healthy fats & seeds ──
  walnuts: {
    nutrient: "ALA omega-3, ellagitannins, melatonin, and polyphenols",
    what_it_does: "walnuts contain the highest omega-3 content of any nut, plus ellagitannins that reduce neuroinflammation and actual melatonin to support sleep-wake cycles",
    conditions: {
      depression: "omega-3 from walnuts supports the EPA/DHA pathway linked to antidepressant effects; polyphenols boost BDNF levels depleted in depression",
      adhd: "omega-3s increase dopamine receptor sensitivity; ellagitannins reduce the prefrontal cortex inflammation that impairs executive function",
      anxiety: "omega-3s reduce inflammatory cytokines that activate the brain's threat-detection circuitry; melatonin supports the sleep often disrupted by anxiety",
      bipolar: "omega-3 is the most evidenced supplement in bipolar disorder for reducing depressive episodes; walnuts are the best plant-based source",
      ptsd: "melatonin in walnuts supports healthy sleep architecture, which is severely disrupted in PTSD; omega-3s reduce amygdala hyperreactivity",
      ocd: "omega-3s reduce the neuroinflammation in cortico-striatal circuits implicated in OCD",
      default: "highest omega-3 nut, reducing neuroinflammation; melatonin supports healthy sleep cycles",
    }
  },
  almonds: {
    nutrient: "vitamin E, magnesium, riboflavin (B2), and L-carnitine",
    what_it_does: "vitamin E is the primary fat-soluble antioxidant protecting brain cell membranes from oxidative damage; magnesium regulates NMDA glutamate receptors",
    conditions: {
      anxiety: "magnesium in almonds acts on GABA receptors — the same receptors targeted by anti-anxiety medications; deficiency is found in most people with anxiety disorders",
      adhd: "magnesium is a cofactor for dopamine synthesis; vitamin E protects the dopaminergic neurons in the prefrontal cortex",
      bipolar: "magnesium has lithium-like properties and reduces neural excitability; vitamin E protects against oxidative stress during mood episodes",
      depression: "magnesium deficiency produces depressive symptoms; riboflavin activates B6, which is required for serotonin production",
      default: "magnesium supports GABA calm and dopamine production; vitamin E protects brain cell membranes from oxidative damage",
    }
  },
  peanutbutter: {
    nutrient: "niacin (B3), magnesium, resveratrol, and tryptophan",
    what_it_does: "niacin is required for the conversion of tryptophan to serotonin — without adequate B3, tryptophan gets diverted into the kynurenine pathway instead, which produces neurotoxic compounds",
    conditions: {
      depression: "niacin ensures tryptophan converts to serotonin rather than neurotoxic kynurenine — a well-studied pathway in depression",
      adhd: "magnesium in peanut butter supports dopamine synthesis; tryptophan raises serotonin to counteract the emotional dysregulation often comorbid with ADHD",
      anxiety: "magnesium activates GABA receptors; niacin reduces the kynurenine metabolites that are found at elevated levels in anxiety disorders",
      ptsd: "tryptophan raises serotonin that is chronically depleted in PTSD; magnesium reduces HPA axis hyperreactivity",
      ocd: "the tryptophan-to-serotonin pathway (enabled by niacin) directly feeds the neurotransmitter system most targeted in OCD treatment",
      default: "niacin ensures tryptophan converts to serotonin; magnesium supports GABA and dopamine systems",
    }
  },
  chiaseeds: {
    nutrient: "ALA omega-3, calcium, complete protein, and soluble fiber",
    what_it_does: "chia has the highest omega-3 content of any seed, plus complete protein providing all essential amino acids including tryptophan",
    conditions: {
      anxiety: "omega-3s reduce the inflammatory cytokines that activate anxiety circuits; calcium supports the inhibitory GABA system",
      depression: "omega-3 ALA begins the conversion to EPA and DHA; complete protein delivers tryptophan for serotonin synthesis",
      adhd: "omega-3s improve dopamine receptor sensitivity; soluble fiber stabilizes blood sugar, preventing the focus-disrupting crashes",
      bipolar: "omega-3 is the most evidenced nutritional intervention in bipolar disorder; complete protein ensures amino acid availability for neurotransmitter synthesis",
      default: "highest omega-3 seed plus complete protein for neurotransmitter precursor amino acids",
    }
  },
  hempseeds: {
    nutrient: "ideal 3:1 omega-6 to omega-3 ratio, GLA (gamma-linolenic acid), and all essential amino acids",
    what_it_does: "hemp's unique fatty acid ratio and GLA content reduce neuroinflammation while providing complete protein for neurotransmitter synthesis",
    conditions: {
      anxiety: "GLA reduces the prostaglandins that drive anxiety-related neuroinflammation; the balanced omega ratio counteracts the pro-inflammatory excess omega-6 in most diets",
      depression: "all essential amino acids include tryptophan and tyrosine for serotonin and dopamine; GLA-derived anti-inflammatory compounds reduce depression-linked neuroinflammation",
      adhd: "omega-3 from hemp improves dopamine receptor function; complete protein supplies all neurotransmitter precursor amino acids",
      default: "complete protein plus ideal omega fatty acid ratio for anti-inflammatory brain support",
    }
  },

  // ── Grains, legumes & complex carbs ──
  quinoa: {
    nutrient: "complete protein (all 9 essential amino acids), iron, magnesium, and riboflavin (B2)",
    what_it_does: "one of very few plant foods with complete protein — quinoa delivers tryptophan and tyrosine alongside the slow-release carbs needed to help them cross the blood-brain barrier",
    conditions: {
      depression: "tryptophan combined with carbohydrates from quinoa is the most effective dietary strategy for raising brain serotonin — carbs reduce competing amino acids at the blood-brain barrier",
      adhd: "iron in quinoa is critical for dopamine synthesis — mild iron deficiency significantly worsens ADHD symptoms; magnesium supports dopamine production",
      anxiety: "the carb + tryptophan combination in quinoa is more effective at raising serotonin than tryptophan alone; magnesium activates GABA receptors",
      bipolar: "complete protein plus slow carbs maintain steady amino acid levels for neurotransmitter production, preventing the peaks and troughs that trigger mood cycling",
      schizophrenia: "magnesium supports NMDA glutamate receptor regulation, a key system dysregulated in schizophrenia",
      default: "complete plant protein with slow-release carbs — optimally delivers tryptophan and tyrosine to the brain for serotonin and dopamine production",
    }
  },
  brownrice: {
    nutrient: "gamma-aminobutyric acid (GABA precursor), magnesium, B1 and B3, and inositol",
    what_it_does: "germinated brown rice in particular contains GABA directly; regular brown rice contains inositol which modulates serotonin receptors",
    conditions: {
      anxiety: "GABA is the brain's main inhibitory neurotransmitter — the compound that reduces neural excitability and produces calm; brown rice directly supports GABA availability",
      ocd: "inositol modulates serotonin receptors and has shown effectiveness in OCD trials comparable to some SSRIs at high doses",
      depression: "magnesium and B vitamins support serotonin synthesis; the slow carbs raise tryptophan availability at the blood-brain barrier",
      bipolar: "steady glucose from brown rice prevents the blood sugar instability that triggers mood cycling; B1 supports neuronal energy metabolism",
      default: "inositol modulates serotonin receptors; slow carbs stabilize blood sugar and support tryptophan brain delivery",
    }
  },
  lentils: {
    nutrient: "folate, iron, B vitamins, zinc, and prebiotic fiber",
    what_it_does: "lentils are one of the richest plant folate sources, and their prebiotic fiber feeds gut bacteria that produce serotonin precursors",
    conditions: {
      depression: "folate deficiency directly reduces serotonin production — lentils deliver high-concentration folate plus iron to address two of depression's most common nutritional deficits",
      schizophrenia: "folate reduces neurotoxic homocysteine; zinc supports dopamine and glutamate regulation both dysregulated in schizophrenia",
      anxiety: "prebiotic fiber feeds gut Lactobacillus that produce GABA; folate supports serotonin synthesis",
      bipolar: "zinc has mood-stabilizing properties and is commonly depleted in bipolar disorder; folate reduces homocysteine",
      default: "folate for serotonin synthesis, prebiotic fiber for gut-brain GABA production",
    }
  },
  chickpeas: {
    nutrient: "choline, tryptophan, B6, magnesium, and folate",
    what_it_does: "chickpeas deliver choline for acetylcholine, tryptophan + B6 for serotonin, and folate as the synthesis activator — a comprehensive neurotransmitter support food",
    conditions: {
      depression: "tryptophan + B6 + folate from chickpeas form the complete pathway for serotonin production — all three steps supplied in a single food",
      anxiety: "choline supports acetylcholine, which has calming effects on the amygdala; magnesium reduces NMDA over-excitation",
      adhd: "choline supports working memory (acetylcholine dependent); B6 supports dopamine synthesis",
      ocd: "B6 + folate provide cofactors for serotonin production; choline supports prefrontal cortex function needed for impulse override",
      default: "choline, tryptophan, B6, and folate together cover all the major neurotransmitter synthesis pathways",
    }
  },

  // ── Dairy ──
  yogurt: {
    nutrient: "Lactobacillus and Bifidobacterium probiotics, tryptophan, calcium, and B12",
    what_it_does: "probiotics in yogurt colonize the gut and produce serotonin precursors and GABA — 95% of the body's serotonin is produced in the gut by these bacteria",
    conditions: {
      anxiety: "Lactobacillus rhamnosus in yogurt produces GABA in the gut and reduces anxiety-related behavior in clinical studies; B12 supports nerve health",
      depression: "the gut-brain axis is a major focus of depression research; probiotic-rich yogurt improves gut serotonin production and reduces inflammation",
      adhd: "gut microbiome health affects dopamine availability; tryptophan in yogurt supports serotonin that regulates mood and emotional control",
      ocd: "emerging research shows gut dysbiosis in OCD; probiotics restore the microbiome balance that supports serotonin availability",
      bipolar: "B12 in yogurt protects myelin and prevents the homocysteine elevation that worsens mood cycling",
      autism: "gut microbiome dysbiosis is consistently found in autism; probiotics from yogurt support the gut-brain communication axis",
      default: "probiotics produce gut serotonin and GABA; tryptophan and B12 support brain neurotransmitter health",
    }
  },
  greekyogurt: {
    nutrient: "Lactobacillus probiotics, high tryptophan, calcium, and 2x more protein than regular yogurt",
    what_it_does: "higher protein concentration means more tryptophan delivery to the brain; probiotics support gut serotonin production that accounts for 90-95% of total body serotonin",
    conditions: {
      depression: "concentrated tryptophan in Greek yogurt is the amino acid directly converted to serotonin; probiotics enhance this production in the gut",
      anxiety: "Lactobacillus species in Greek yogurt reduce cortisol and increase GABA production in clinical studies; calcium supports neural inhibitory signaling",
      adhd: "protein concentration ensures sustained amino acid delivery for neurotransmitter synthesis throughout the morning",
      bipolar: "stable protein digestion prevents the amino acid spikes and troughs that can contribute to neurotransmitter instability",
      default: "high tryptophan for serotonin plus probiotics for gut-brain serotonin axis support",
    }
  },

  // ── Other ──
  darkchocolate: {
    nutrient: "flavanols (epicatechin), theobromine, PEA (phenylethylamine), and magnesium",
    what_it_does: "epicatechin improves cerebral blood flow to the prefrontal cortex within 2 hours of consumption; PEA triggers dopamine and endorphin release",
    conditions: {
      depression: "PEA in dark chocolate triggers dopamine release — it's the same compound released during exercise ('runner's high') and is depleted in depression",
      adhd: "theobromine is a mild CNS stimulant that improves focus without the anxiety of caffeine; improved prefrontal blood flow directly supports executive function",
      anxiety: "magnesium in dark chocolate acts on GABA receptors; flavanols reduce the cortisol response to stress in multiple clinical trials",
      bipolar: "magnesium has mood-stabilizing properties; flavanols protect neurons during the oxidative stress of mood episodes",
      ptsd: "PEA triggers endorphin release and reduces amygdala reactivity; magnesium reduces HPA axis hyperreactivity",
      default: "epicatechin improves cerebral blood flow, PEA boosts dopamine, and magnesium supports GABA calm",
    }
  },
  hummus: {
    nutrient: "chickpea folate and tryptophan, tahini magnesium and zinc, and olive oil oleic acid",
    what_it_does: "the combination of chickpea amino acids with tahini minerals creates a complete neurotransmitter support profile in a single snack",
    conditions: {
      anxiety: "magnesium from tahini acts on GABA receptors; folate supports serotonin synthesis; oleic acid triggers calming OEA release",
      depression: "tryptophan from chickpeas converts to serotonin (with folate as the cofactor); zinc from tahini activates serotonin receptors",
      adhd: "zinc is a dopamine cofactor shown to be low in ADHD; oleic acid supports myelin health in prefrontal pathways",
      bipolar: "zinc and magnesium together support mood-stabilizing neurotransmitter systems; oleic acid supports neuronal membrane health",
      ocd: "folate directly supports serotonin synthesis, the neurotransmitter system most targeted in OCD",
      default: "folate + tryptophan for serotonin, magnesium + zinc for GABA and dopamine support",
    }
  },
};

// ── Ingredient keyword matcher ──────────────────────────────────────────────
const INGREDIENT_KEYWORDS = [
  ["oatmeal", "oatmeal"], ["oats", "oats"], ["oat ", "oats"], ["flaxseed", "flaxseed"],
  ["honey", "honey"], ["cinnamon", "cinnamon"],
  ["blueberr", "blueberries"], ["strawberr", "strawberries"], ["mango", "mango"],
  ["peach", "peaches"], ["banana", "banana"], ["watermelon", "watermelon"],
  ["pineapple", "pineapple"], ["grape", "grapes"], ["kiwi", "kiwi"],
  ["berr", "berries"],
  ["chicken", "chicken"], ["turkey", "turkey"], ["salmon", "salmon"],
  ["steak", "steak"], ["sirloin", "steak"], ["ribeye", "steak"], ["beef", "beef"],
  ["egg", "eggs"],
  ["spinach", "spinach"], ["broccoli", "broccoli"], ["asparagus", "asparagus"],
  ["sweet potato", "sweetpotato"], ["sweetpotato", "sweetpotato"],
  ["mushroom", "mushrooms"], ["avocado", "avocado"], ["kale", "kale"],
  ["walnut", "walnuts"], ["almond", "almonds"], ["peanut butter", "peanutbutter"],
  ["chia", "chiaseeds"], ["hemp seed", "hempseeds"],
  ["quinoa", "quinoa"], ["brown rice", "brownrice"],
  ["lentil", "lentils"], ["chickpea", "chickpeas"],
  ["yogurt", "yogurt"], ["greek yogurt", "greekyogurt"],
  ["dark chocolate", "darkchocolate"], ["hummus", "hummus"],
];

function parseIngredients(mealName) {
  const lower = mealName.toLowerCase();
  const found = [];
  const seen = new Set();
  // Prioritize multi-word matches first (e.g. "sweet potato" before "potato")
  const sorted = [...INGREDIENT_KEYWORDS].sort((a, b) => b[0].length - a[0].length);
  for (const [keyword, key] of sorted) {
    if (lower.includes(keyword) && !seen.has(key)) {
      found.push(key);
      seen.add(key);
    }
  }
  return found;
}

function buildMealExplanation(meal, conditionIds) {
  // Accept either a single string or an array
  const ids = Array.isArray(conditionIds) ? conditionIds : [conditionIds];
  const activeIds = ids.filter(id => id && id !== "default");
  const primaryId = activeIds[0] || "default";

  const condLabels = activeIds.length > 0
    ? activeIds.map(id => MENTAL_CONDITIONS.find(c => c.id === id)?.label).filter(Boolean)
    : ["general wellness"];
  const condString = condLabels.length === 1
    ? condLabels[0]
    : condLabels.slice(0, -1).join(", ") + " and " + condLabels[condLabels.length - 1];

  const ingredients = parseIngredients(meal);

  const intros = {
    adhd:          `This is a great meal for ADHD because it directly targets the dopamine and norepinephrine systems that ADHD affects most — providing steady brain energy, neurotransmitter precursors, and the nutrients focus and impulse control depend on.`,
    anxiety:       `This is a great meal for Anxiety because each ingredient works to calm the nervous system from the inside out — lowering cortisol, supporting GABA production, and reducing the neuroinflammation that keeps the brain in a heightened threat state.`,
    depression:    `This is a great meal for Depression because it delivers the specific nutrients — serotonin precursors, B vitamins, anti-inflammatory compounds, and BDNF boosters — that depression depletes and that antidepressant treatment depends on.`,
    bipolar:       `This is a great meal for Bipolar Disorder because it stabilizes blood glucose (a key mood cycling trigger), provides omega-3s and magnesium for neurological stability, and delivers the neurotransmitter precursors both mood phases require.`,
    schizophrenia: `This is a great meal for Schizophrenia because it targets dopamine pathway regulation, oxidative stress, and neuroinflammation — the three most documented neurological features of schizophrenia — through whole food sources your body uses directly.`,
    autism:        `This is a great meal for Autism Spectrum because it supports the gut-brain axis, provides B6 for neurotransmitter synthesis, and delivers omega-3s for brain cell membrane health — all in sensory-friendly forms.`,
    ptsd:          `This is a great meal for PTSD because it works to lower the chronically elevated cortisol baseline, rebuild the serotonin and dopamine that trauma depletes, and support hippocampal repair.`,
    did:           `This is a great meal for DID because it provides stable, consistent brain fuel that supports grounding and prevents the blood sugar swings that can increase dissociation.`,
    bpd:           `This is a great meal for Borderline Personality Disorder because it stabilizes blood sugar — one of the most direct dietary tools for reducing emotional reactivity — while delivering serotonin precursors and magnesium the nervous system needs.`,
    npd:           `This is a great meal for brain health because it delivers complete protein, anti-inflammatory compounds, and B vitamins that support dopamine regulation, stress resilience, and cognitive function.`,
    hpd:           `This is a great meal for brain health because its combination of protein, complex carbohydrates, and micronutrients supports steady neurotransmitter production, emotional regulation, and consistent brain energy.`,
    aspd:          `This is a great meal for brain health because it provides amino acids, B vitamins, and anti-inflammatory nutrients that support healthy prefrontal cortex function and impulse regulation.`,
    ocd:           `This is a great meal for OCD because it feeds the serotonin pathway directly — OCD is fundamentally a serotonin-dysregulation disorder, and the tryptophan, folate, and B vitamins here are the exact building blocks serotonin synthesis requires.`,
    eating:        `This is a nourishing, balanced meal that provides complete nutrition — protein for brain repair, complex carbohydrates for steady energy, and micronutrients that support mood stability during recovery.`,
    phobia:        `This is a great meal for managing Phobias because it supports GABA production and cortisol regulation — the two neurological levers most directly involved in the physiological fear response.`,
    bfrb:          `This is a great meal for Body-Focused Repetitive Behaviors because it delivers magnesium and B vitamins that reduce the nervous system hyperarousal that BFRB urges are often driven by.`,
    ppd:           `This is a great meal for brain health because its anti-inflammatory nutrients, B vitamins, and complete protein support neurochemical balance and stress regulation.`,
    spd:           `This is a great meal for brain health because it delivers omega-3s, B vitamins, and complete protein that support dopamine regulation and cognitive function.`,
    default:       `This meal was specifically chosen for your mental health plan because each ingredient delivers targeted nutrients — neurotransmitter precursors, anti-inflammatory compounds, and brain-essential vitamins and minerals.`,
  };

  // Build intro — if multiple conditions, name them all up front
  let intro = "";
  if (activeIds.length > 1) {
    const introLines = activeIds.map(id => intros[id] || intros.default);
    intro = `This meal was chosen specifically for your combination of ${condString}.\n\n` +
      introLines.map((line, i) => `${condLabels[i]}: ${line.replace(/^This is a great meal for [^b][^e][^c]*because /i, "").charAt(0).toUpperCase() + line.replace(/^This is a great meal for [^b][^e][^c]*because /i, "").slice(1)}`).join("\n");
  } else {
    intro = intros[primaryId] || intros.default;
  }

  if (ingredients.length === 0) {
    return `${intro}\n\nEvery food on this plan was chosen with your neurological needs in mind — you're nourishing yourself with intention.`;
  }

  // For each ingredient, if multiple conditions show the most relevant note
  const bullets = ingredients.map(key => {
    const data = INGREDIENT_SCIENCE[key];
    if (!data) return null;

    const name = key === "sweetpotato" ? "Sweet potato"
      : key === "brownrice" ? "Brown rice"
      : key === "chiaseeds" ? "Chia seeds"
      : key === "hempseeds" ? "Hemp seeds"
      : key === "greekyogurt" ? "Greek yogurt"
      : key === "darkchocolate" ? "Dark chocolate"
      : key === "peanutbutter" ? "Peanut butter"
      : key.charAt(0).toUpperCase() + key.slice(1);

    if (activeIds.length > 1) {
      // Show a note for each condition that has a specific entry
      const condNotes = activeIds
        .filter(id => data.conditions[id])
        .map(id => {
          const label = MENTAL_CONDITIONS.find(c => c.id === id)?.label || id;
          const note = data.conditions[id];
          return `  → For ${label}: ${note.charAt(0).toUpperCase() + note.slice(1)}.`;
        });
      if (condNotes.length === 0) {
        const fallback = data.conditions["default"] || data.what_it_does;
        return `• ${name}: contains ${data.nutrient}. ${fallback.charAt(0).toUpperCase() + fallback.slice(1)}.`;
      }
      return `• ${name}: contains ${data.nutrient}.\n${condNotes.join("\n")}`;
    } else {
      const condNote = data.conditions[primaryId] || data.conditions["default"] || data.what_it_does;
      return `• ${name}: contains ${data.nutrient}. ${condNote.charAt(0).toUpperCase() + condNote.slice(1)}.`;
    }
  }).filter(Boolean);

  const closings = {
    adhd:          "Every bite here is working to support your focus, emotional regulation, and dopamine system — your brain deserves this kind of care.",
    anxiety:       "This combination works together to calm your nervous system from the inside out — you're feeding your calm.",
    depression:    "Each ingredient here is chosen to gently lift the neurotransmitter systems that depression suppresses — you're doing something real for yourself by eating this.",
    bipolar:       "This meal was built to keep your blood sugar steady and your neurotransmitter systems nourished — stability on the plate supports stability in the mind.",
    schizophrenia: "Every ingredient here reduces neuroinflammation and supports the neurotransmitter systems most relevant to your brain — this is targeted nourishment.",
    autism:        "This meal is designed to support your gut-brain connection, sensory processing, and neurotransmitter health in a way your body can use.",
    ptsd:          "This meal is quietly working to lower your cortisol baseline and support the serotonin systems that trauma suppresses — small acts of nourishment matter.",
    ocd:           "The serotonin support in this meal is real and direct — you're feeding the exact system that OCD challenges most.",
    bpd:           "Steady blood sugar and serotonin support are two of the most accessible tools for emotional regulation — this meal provides both.",
    did:           "Consistent, nourishing meals help ground and stabilize — this one was built to support your brain's need for steady fuel and neurotransmitter balance.",
    default:       "You're nourishing your brain with intention — every ingredient here was chosen with your mental health in mind.",
  };

  const closing = activeIds.length > 1
    ? `You're managing ${condString} — this meal works across all of them, and every ingredient was placed here with your full picture in mind.`
    : (closings[primaryId] || closings.default);

  return intro + "\n\n" + bullets.join("\n\n") + "\n\n" + closing;
}

class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { error: null }; }
  static getDerivedStateFromError(error) { return { error }; }
  render() {
    if (this.state.error) return (
      <div style={{ padding:"40px", color:"#ff6b6b", fontFamily:"monospace", background:"#0a0e1a", minHeight:"100vh" }}>
        <h2>Something went wrong</h2>
        <pre style={{ whiteSpace:"pre-wrap", fontSize:"13px", color:"#e8c87a" }}>{this.state.error.toString()}</pre>
        <pre style={{ whiteSpace:"pre-wrap", fontSize:"11px", color:"#8890b8", marginTop:"12px" }}>{this.state.error.stack}</pre>
        <button onClick={() => this.setState({ error: null })} style={{ marginTop:"20px", padding:"10px 20px", background:"#5570f0", color:"#fff", border:"none", borderRadius:"8px", cursor:"pointer" }}>Try Again</button>
      </div>
    );
    return this.props.children;
  }
}

function NeuroThriveApp() {
  const [step, setStep] = useState(0);
  const [resumeStep, setResumeStep] = useState(null);
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(false);
  const [legalPage, setLegalPage] = useState(null); // "terms" | "privacy" | null
  const [isPremium, setIsPremium] = useState(false);
  const [subChecked, setSubChecked] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(null); // "monthly" | "annual" | null
  const [subscriptionPlan, setSubscriptionPlan] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null); // "male" | "female" | "prefer_not"
  const [cycleSyncEnabled, setCycleSyncEnabled] = useState(false);
  const [lastPeriodDate, setLastPeriodDate] = useState("");
  const [cycleLength, setCycleLength] = useState(28);
  const [selectedConditions, setSelectedConditions] = useState([]);
  const [selectedDiet, setSelectedDiet] = useState([]);
  const [calorieTarget, setCalorieTarget] = useState("1500");
  const [menu30, setMenu30] = useState(null);
  const [selectedWeek, setSelectedWeek] = useState(0);
  const [selectedDayIdx, setSelectedDayIdx] = useState(0);
  const [logs, setLogs] = useState([]);
  const [todayMood, setTodayMood] = useState(null);
  const [todayEnergy, setTodayEnergy] = useState(null);
  const [todayNote, setTodayNote] = useState("");
  const [affirmIdx, setAffirmIdx] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [logSaved, setLogSaved] = useState(false);
  const [explainModal, setExplainModal] = useState(null);
  const [explainText, setExplainText] = useState("");
  const [explainLoading, setExplainLoading] = useState(false);
  const [modalTab, setModalTab] = useState("why");
  const [altMeal, setAltMeal] = useState({});
  const [expandedGenderNote, setExpandedGenderNote] = useState(null);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [planCycle, setPlanCycle] = useState(1);
  const [cycleStartDate, setCycleStartDate] = useState(null);
  const [showCycleComplete, setShowCycleComplete] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [remindersEnabled, setRemindersEnabled] = useState(false);
  const [toolkitState, setToolkitState] = useState(null);
  const [toolkitCategory, setToolkitCategory] = useState(null);
  const [routineTab, setRoutineTab] = useState("morning");
  const [dailyChecks, setDailyChecks] = useState({});
  const [notifPermission, setNotifPermission] = useState("default");
  const [reminderTimes, setReminderTimes] = useState({ breakfast:"08:00", lunch:"12:30", dinner:"18:30", snack:"15:00" });
  const [reminderActive, setReminderActive] = useState({ breakfast:true, lunch:true, dinner:true, snack:false });
  const [affirmNotifEnabled, setAffirmNotifEnabled] = useState(false);
  const [affirmNotifTime, setAffirmNotifTime] = useState("09:00");
  const [progressRange, setProgressRange] = useState(14);
  const [expandedTodayRoutine, setExpandedTodayRoutine] = useState({});
  const [showTour, setShowTour] = useState(false);
  const [tourStep, setTourStep] = useState(0);
  const [onboardingDone, setOnboardingDone] = useState(false);
  const [showBrainExplainer, setShowBrainExplainer] = useState(false);
  const [moodInsight, setMoodInsight] = useState(null);
  const [routinePrefs, setRoutinePrefs] = useState(null);
  const [personalRoutine, setPersonalRoutine] = useState(null);
  const [routineQPage, setRoutineQPage] = useState("intro"); // "intro" | "morning" | "evening" | "preview"
  const [routineKept, setRoutineKept] = useState({}); // { "morning-0": true, "evening-2": true, ... }

  // ── Auth state ──────────────────────────────────────────────────────────────
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [authScreen, setAuthScreen] = useState("login"); // "login" | "signup" | "reset"
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authName, setAuthName] = useState("");
  const [authError, setAuthError] = useState("");
  const [authWorking, setAuthWorking] = useState(false);
  const [authSuccess, setAuthSuccess] = useState("");
  const [reminderSaved, setReminderSaved] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [isResettingPassword, setIsResettingPassword] = useState(false);

  // Cache for AI explanations — persists in session without re-renders
  const explanationCache = useRef({});

  // ── Auth listener — runs on mount ──────────────────────────────────────────
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setAuthLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      // Detect password recovery flow
      if (_event === "PASSWORD_RECOVERY") {
        setIsResettingPassword(true);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  // ── Load user data from Supabase when logged in ────────────────────────────
  useEffect(() => {
    if (!user) return;
    const load = async () => {
      try {
        const { data } = await supabase
          .from("user_data")
          .select("*")
          .eq("id", user.id)
          .single();
        if (data) {
          if (data.selected_gender) setSelectedGender(data.selected_gender);
          if (data.cycle_sync_enabled) setCycleSyncEnabled(data.cycle_sync_enabled);
          if (data.last_period_date) setLastPeriodDate(data.last_period_date);
          if (data.cycle_length) setCycleLength(data.cycle_length);
          if (data.selected_conditions) setSelectedConditions(data.selected_conditions);
          if (data.selected_diet) setSelectedDiet(data.selected_diet);
          if (data.calorie_target) setCalorieTarget(data.calorie_target);
          if (data.menu30) setMenu30(data.menu30);
          if (data.logs) setLogs(data.logs);
          if (data.plan_cycle) setPlanCycle(data.plan_cycle);
          if (data.cycle_start_date) setCycleStartDate(data.cycle_start_date);
          // If user has completed setup (has menu + gender), resume directly
          if (data.menu30 && data.selected_gender) {
            setDisclaimerAccepted(true);
            setStep(12);
          } else if (data.step != null && data.step > 1) {
            setDisclaimerAccepted(true);
            setResumeStep(data.step);
          }
          if (data.reminders_enabled) setRemindersEnabled(data.reminders_enabled);
          if (data.reminder_times) setReminderTimes(data.reminder_times);
          if (data.reminder_active) setReminderActive(data.reminder_active);
          if (data.daily_checks) setDailyChecks(data.daily_checks);
          if (data.routine_prefs) setRoutinePrefs(data.routine_prefs);
          if (data.personal_routine) setPersonalRoutine(data.personal_routine);
          if (data.onboarding_done) setOnboardingDone(true);
        }
      } catch(e) {}
      setDataLoaded(true);
    };
    load();
  }, [user]);

  // ── Check subscription status ──────────────────────────────────────────────
  useEffect(() => {
    if (!user) return;
    const checkSub = async () => {
      try {
        const { data } = await supabase
          .from("user_subscriptions")
          .select("*")
          .eq("user_id", user.id)
          .single();
        if (data && data.status === "active") {
          setIsPremium(true);
          setSubscriptionPlan(data.plan);
        }
      } catch(e) {}
      setSubChecked(true);
    };
    checkSub();
  }, [user]);

  // ── Show paywall for existing users not yet premium ───────────────────────
  useEffect(() => {
    if (!dataLoaded || !subChecked) return;
    if (step >= 4 && step !== 13 && !isPremium) {
      setShowPaywall(true);
    }
  }, [dataLoaded, subChecked, isPremium, step]);

  // Derived: always block step 3+ for non-premium users (after sub is checked)
  const paywallActive = dataLoaded && subChecked && step >= 4 && step !== 13 && !isPremium;
  useEffect(() => {
    if (!user) return;
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get("session_id");
    if (!sessionId) return;
    // Clear the URL params
    window.history.replaceState({}, document.title, window.location.pathname);
    const verify = async () => {
      try {
        const res = await fetch("/.netlify/functions/verify-session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId, userId: user.id }),
        });
        const result = await res.json();
        if (result.success) {
          setIsPremium(true);
          setSubscriptionPlan(result.plan);
          setShowPaywall(false);
        }
      } catch(e) {}
    };
    verify();
  }, [user]);

  // ── Save user data to Supabase whenever state changes ─────────────────────
  const saveReady = useRef(false);
  useEffect(() => {
    if (!dataLoaded) return;
    const t = setTimeout(() => { saveReady.current = true; }, 1500);
    return () => clearTimeout(t);
  }, [dataLoaded]);

  useEffect(() => {
    if (!dataLoaded || !user || !saveReady.current) return;
    const timer = setTimeout(async () => {
      try {
        const { error } = await supabase.from("user_data").upsert({
          id: user.id,
          selected_gender: selectedGender,
          cycle_sync_enabled: cycleSyncEnabled,
          last_period_date: lastPeriodDate,
          cycle_length: cycleLength,
          selected_conditions: selectedConditions,
          selected_diet: selectedDiet,
          calorie_target: calorieTarget,
          menu30,
          logs,
          plan_cycle: planCycle,
          cycle_start_date: cycleStartDate,
          step,
          reminders_enabled: remindersEnabled,
          reminder_times: reminderTimes,
          reminder_active: reminderActive,
          daily_checks: dailyChecks,
          routine_prefs: routinePrefs,
          personal_routine: personalRoutine,
          onboarding_done: onboardingDone,
          updated_at: new Date().toISOString(),
        });
        if (error) console.error("Save error:", error.message, error.details);
      } catch(e) { console.error("Save failed:", e); }
    }, 500);
    return () => clearTimeout(timer);
  }, [selectedGender, selectedConditions, selectedDiet, calorieTarget, menu30, logs, planCycle, cycleStartDate, step, remindersEnabled, reminderTimes, reminderActive, dailyChecks, onboardingDone, cycleSyncEnabled, lastPeriodDate, cycleLength, routinePrefs, personalRoutine, dataLoaded, user]);

  // ── Feature tour trigger ────────────────────────────────────────────────────
  useEffect(() => {
    if (step === 12 && isPremium && dataLoaded && !onboardingDone && menu30) {
      setShowTour(true);
    }
  }, [step, isPremium, dataLoaded, onboardingDone, menu30]);

  const TOUR_SLIDES = [
    { emoji: "🎉", title: "Welcome to NeuroThrive!", desc: "Your personalized 30-day plan is ready. Here's a quick tour of everything you can do." },
    { emoji: "🍽️", title: "Your 30-Day Menu", desc: "Browse daily meals tailored to your condition. Tap any meal to see its full recipe, or tap \"Why this meal?\" to learn why each ingredient was chosen for your plan." },
    { emoji: "📓", title: "Mood Journal", desc: "Track your mood and energy daily. Over time, you'll see patterns between what you eat and how you feel — powerful data for your wellness journey." },
    { emoji: "✨", title: "Reminders & Affirmations", desc: "Meal reminders to keep you nourished, plus condition-specific affirmations grounded in neuroplasticity research. Find both on the Reminders tab." },
    { emoji: "🌿", title: "Supplement Guide", desc: "Evidence-based supplement recommendations personalized to your condition — with dosages, timing, and the science behind each one." },
    { emoji: "🧠", title: "Brain Toolkit", desc: "2,250+ coping strategies organised by category — grounding, breathing, CBT reframes, and more. Your on-demand mental health toolbox." },
    { emoji: "☀️", title: "Daily Routines & Exercise", desc: "Morning and evening routines built for your brain, plus 10 exercise modalities with research-informed explanations for your specific condition." },
    { emoji: "📊", title: "Progress Dashboard", desc: "Track your daily completion, meal adherence, mood trends, and streaks. Seeing your consistency builds motivation and momentum." },
    { emoji: "🚀", title: "You're all set!", desc: "Start with today's meals and check in with your journal tonight. Small, consistent steps create lasting change. Let's go!" },
  ];

  const finishTour = () => {
    setShowTour(false);
    setTourStep(0);
    setOnboardingDone(true);
  };

  // ── Auth functions ──────────────────────────────────────────────────────────
  const handleSignUp = async () => {
    setAuthError(""); setAuthWorking(true);
    const { error } = await supabase.auth.signUp({ email: authEmail, password: authPassword });
    if (error) setAuthError(error.message);
    else setAuthSuccess("Check your email to confirm your account, then log in!");
    setAuthWorking(false);
  };

  const handleLogin = async () => {
    setAuthError(""); setAuthWorking(true);
    const { error } = await supabase.auth.signInWithPassword({ email: authEmail, password: authPassword });
    if (error) setAuthError(error.message);
    setAuthWorking(false);
  };

  const handleReset = async () => {
    setAuthError(""); setAuthWorking(true);
    const { error } = await supabase.auth.resetPasswordForEmail(authEmail);
    if (error) setAuthError(error.message);
    else setAuthSuccess("Password reset email sent — check your inbox!");
    setAuthWorking(false);
  };

  const startCheckout = (planType) => {
    setCheckoutLoading(planType);
    const priceId = planType === "monthly"
      ? "price_1T9XQL0aUr06PLRHLEpeRTKp"
      : "price_1T9XTY0aUr06PLRHoRipqJc6";
    // Open window immediately (before any async) so Safari doesn't block it
    const win = window.open("", "_self");
    fetch("/.netlify/functions/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ priceId, userId: user.id, userEmail: user.email }),
    })
    .then(res => res.json())
    .then(({ url, error }) => {
      if (url) { win.location.href = url; }
      else { console.error("Stripe error:", error); setCheckoutLoading(null); }
    })
    .catch(e => { console.error("Checkout error:", e); setCheckoutLoading(null); });
  };

  const handleStepForward = (nextStep) => {
    if (nextStep >= 4 && (!isPremium || !subChecked)) {
      if (subChecked) setShowPaywall(true);
      // If not yet checked, show paywall to be safe
      else setShowPaywall(true);
    } else {
      setStep(nextStep);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null); setStep(0); setMenu30(null);
    setSelectedConditions([]); setSelectedDiet([]);
    setLogs([]); setDataLoaded(false);
  };

  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const handleDeleteAccount = async () => {
    if (!user) return;
    try {
      await supabase.from("user_data").delete().eq("id", user.id);
      await supabase.auth.signOut();
      setUser(null); setStep(0); setMenu30(null);
      setSelectedConditions([]); setSelectedDiet([]);
      setLogs([]); setDailyChecks({}); setDataLoaded(false);
      setDeleteConfirm(false);
    } catch(e) {}
  };

  // ── Auth screen styles ─────────────────────────────────────────────────────
  const SA = {
    overlay: { minHeight:"100vh", background:"radial-gradient(ellipse at 30% 20%, rgba(85,112,240,0.15) 0%, transparent 55%), radial-gradient(ellipse at 70% 80%, rgba(107,143,255,0.1) 0%, transparent 55%), linear-gradient(180deg,#080c18 0%,#0a0f1e 100%)", display:"flex", alignItems:"center", justifyContent:"center", padding:"24px", fontFamily:"'Plus Jakarta Sans',sans-serif" },
    card: { background:"linear-gradient(145deg,#0c1020,#111828)", borderRadius:"28px", padding:"40px 32px", maxWidth:"420px", width:"100%", border:"1px solid rgba(107,143,255,0.2)", boxShadow:"0 40px 80px rgba(0,0,0,0.5)" },
    logo: { textAlign:"center", marginBottom:"32px" },
    logoText: { fontFamily:"'Cormorant Garamond',serif", fontSize:"36px", fontWeight:"300", color:"#eef0ff", letterSpacing:"2px" },
    logoSub: { fontSize:"12px", color:"#7b9fff", letterSpacing:"3px", textTransform:"uppercase", marginTop:"4px" },
    label: { fontSize:"12px", color:"#8890b8", textTransform:"uppercase", letterSpacing:"1.5px", fontWeight:"600", marginBottom:"8px", display:"block" },
    input: { width:"100%", padding:"14px 16px", borderRadius:"12px", border:"1px solid rgba(110,120,200,0.25)", background:"rgba(240,244,255,0.05)", color:"#eef0ff", fontSize:"15px", fontFamily:"'Plus Jakarta Sans',sans-serif", outline:"none", boxSizing:"border-box", marginBottom:"16px" },
    btn: { width:"100%", padding:"16px", borderRadius:"50px", background:"linear-gradient(135deg,#5570f0,#4060e0)", color:"#fff", border:"none", fontSize:"15px", fontWeight:"600", cursor:"pointer", fontFamily:"'Plus Jakarta Sans',sans-serif", marginTop:"8px" },
    link: { color:"#7b9fff", fontSize:"13px", cursor:"pointer", textDecoration:"underline", background:"none", border:"none", fontFamily:"'Plus Jakarta Sans',sans-serif", padding:0 },
    error: { color:"#e07070", fontSize:"13px", marginBottom:"12px", padding:"10px 14px", background:"rgba(220,100,100,0.1)", borderRadius:"10px", border:"1px solid rgba(220,100,100,0.2)" },
    success: { color:"#7b9fff", fontSize:"13px", marginBottom:"12px", padding:"10px 14px", background:"rgba(107,143,255,0.1)", borderRadius:"10px", border:"1px solid rgba(107,143,255,0.2)" },
    divider: { textAlign:"center", color:"#8890b8", fontSize:"12px", margin:"16px 0" },
  };

  // ── Cycle complete check ───────────────────────────────────────────────────
  useEffect(() => {
    if (!cycleStartDate || !menu30) return;
    const start = new Date(cycleStartDate);
    const now = new Date();
    const daysSinceStart = Math.floor((now - start) / (1000 * 60 * 60 * 24));
    if (daysSinceStart >= 30 && !showCycleComplete) setShowCycleComplete(true);
  }, [cycleStartDate, menu30]);

  useEffect(() => {
    const interval = setInterval(() => setAffirmIdx(i => (i+1) % AFFIRMATIONS.length), 8000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if ("Notification" in window) setNotifPermission(Notification.permission);
  }, []);

  // ── Show auth screen if not logged in ──────────────────────────────────────
  if (authLoading) return (
    <div style={{ ...SA.overlay }}>
      <div style={{ color:"#7b9fff", fontSize:"16px", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>Loading...</div>
    </div>
  );

  // ── Password reset completion screen ───────────────────────────────────────
  if (isResettingPassword) return (
    <div style={SA.overlay}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=Outfit:wght@300;400;500;600;700&display=swap');`}</style>
      <div style={SA.card}>
        <div style={SA.logo}>
          <div style={SA.logoText}>🌿 NeuroThrive</div>
          <div style={SA.logoSub}>Set new password</div>
        </div>
        <p style={{ color:"#8890b8", fontSize:"14px", marginBottom:"20px", lineHeight:1.6 }}>Choose a new password for your account.</p>
        <label style={SA.label}>New Password</label>
        <input style={SA.input} type="password" placeholder="Min 6 characters" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
        {authError && <div style={SA.error}>{authError}</div>}
        {authSuccess && <div style={SA.success}>{authSuccess}</div>}
        <button style={SA.btn} disabled={authWorking} onClick={async () => {
          setAuthWorking(true); setAuthError("");
          const { error } = await supabase.auth.updateUser({ password: newPassword });
          if (error) setAuthError(error.message);
          else { setAuthSuccess("Password updated! Taking you in..."); setTimeout(() => setIsResettingPassword(false), 1500); }
          setAuthWorking(false);
        }}>{authWorking ? "Updating..." : "Set New Password"}</button>
      </div>
    </div>
  );

  if (!user) return (
    <div style={SA.overlay}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=Outfit:wght@300;400;500;600;700&display=swap');`}</style>
      <div style={SA.card}>
        <div style={SA.logo}>
          <div style={SA.logoText}>🌿 NeuroThrive</div>
          <div style={SA.logoSub}>Nourish your mind</div>
        </div>

        {authScreen === "login" && (
          <>
            <label style={SA.label}>Email</label>
            <input style={SA.input} type="email" placeholder="your@email.com" value={authEmail} onChange={e => setAuthEmail(e.target.value)} />
            <label style={SA.label}>Password</label>
            <input style={SA.input} type="password" placeholder="••••••••" value={authPassword} onChange={e => setAuthPassword(e.target.value)} />
            {authError && <div style={SA.error}>{authError}</div>}
            {authSuccess && <div style={SA.success}>{authSuccess}</div>}
            <button style={SA.btn} onClick={handleLogin} disabled={authWorking}>{authWorking ? "Signing in..." : "Sign In"}</button>
            <div style={SA.divider}>───── or ─────</div>
            <div style={{ textAlign:"center", display:"flex", flexDirection:"column", gap:"10px" }}>
              <button style={SA.link} onClick={() => { setAuthScreen("signup"); setAuthError(""); setAuthSuccess(""); }}>Create a new account</button>
              <button style={SA.link} onClick={() => { setAuthScreen("reset"); setAuthError(""); setAuthSuccess(""); }}>Forgot password?</button>
            </div>
          </>
        )}

        {authScreen === "signup" && (
          <>
            <label style={SA.label}>Email</label>
            <input style={SA.input} type="email" placeholder="your@email.com" value={authEmail} onChange={e => setAuthEmail(e.target.value)} />
            <label style={SA.label}>Password</label>
            <input style={SA.input} type="password" placeholder="Min 6 characters" value={authPassword} onChange={e => setAuthPassword(e.target.value)} />
            {authError && <div style={SA.error}>{authError}</div>}
            {authSuccess && <div style={SA.success}>{authSuccess}</div>}
            <button style={SA.btn} onClick={handleSignUp} disabled={authWorking}>{authWorking ? "Creating account..." : "Create Account"}</button>
            <div style={SA.divider}>───── or ─────</div>
            <div style={{ textAlign:"center" }}>
              <button style={SA.link} onClick={() => { setAuthScreen("login"); setAuthError(""); setAuthSuccess(""); }}>Already have an account? Sign in</button>
            </div>
          </>
        )}

        {authScreen === "reset" && (
          <>
            <p style={{ color:"#8890b8", fontSize:"14px", marginBottom:"20px", lineHeight:1.6 }}>Enter your email and we'll send you a link to reset your password.</p>
            <label style={SA.label}>Email</label>
            <input style={SA.input} type="email" placeholder="your@email.com" value={authEmail} onChange={e => setAuthEmail(e.target.value)} />
            {authError && <div style={SA.error}>{authError}</div>}
            {authSuccess && <div style={SA.success}>{authSuccess}</div>}
            <button style={SA.btn} onClick={handleReset} disabled={authWorking}>{authWorking ? "Sending..." : "Send Reset Email"}</button>
            <div style={{ textAlign:"center", marginTop:"16px" }}>
              <button style={SA.link} onClick={() => { setAuthScreen("login"); setAuthError(""); setAuthSuccess(""); }}>← Back to sign in</button>
            </div>
          </>
        )}
      </div>
    </div>
  );

  // ── Mandatory disclaimer screen (shows after welcome page, skipped for returning users) ──
  if (!disclaimerAccepted && step > 0) return (
    <div style={{ minHeight:"100vh", background:"radial-gradient(ellipse at 30% 20%, rgba(85,112,240,0.15) 0%, transparent 55%), radial-gradient(ellipse at 70% 80%, rgba(107,143,255,0.1) 0%, transparent 55%), linear-gradient(180deg,#080c18 0%,#0a0f1e 100%)", display:"flex", alignItems:"center", justifyContent:"center", padding:"24px", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=Outfit:wght@300;400;500;600;700&display=swap');`}</style>
      <div style={{ background:"linear-gradient(145deg,#0c1020,#111828)", borderRadius:"28px", padding:"40px 32px", maxWidth:"480px", width:"100%", border:"1px solid rgba(107,143,255,0.2)", boxShadow:"0 40px 80px rgba(0,0,0,0.5)" }}>
        <div style={{ textAlign:"center", marginBottom:"28px" }}>
          <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"32px", fontWeight:"300", color:"#eef0ff", letterSpacing:"2px", marginBottom:"6px" }}>🧠 NeuroThrive</div>
          <div style={{ fontSize:"11px", color:"#7b9fff", letterSpacing:"3px", textTransform:"uppercase" }}>Before You Begin</div>
        </div>

        <div style={{ background:"rgba(107,143,255,0.07)", border:"1px solid rgba(107,143,255,0.2)", borderRadius:"16px", padding:"20px", marginBottom:"20px" }}>
          <div style={{ fontSize:"11px", color:"#7b9fff", textTransform:"uppercase", letterSpacing:"2px", fontWeight:"700", marginBottom:"12px" }}>⚕️ Health & Wellness Disclaimer</div>
          <p style={{ color:"#c8ccf0", fontSize:"13px", lineHeight:1.85, margin:"0 0 12px 0" }}>
            NeuroThrive provides <strong style={{color:"#eef0ff"}}>general wellness information</strong> for educational purposes only. The content in this app — including meal suggestions, supplement information, and affirmations — is <strong style={{color:"#eef0ff"}}>not medical advice</strong> and is not intended to diagnose, treat, cure, or prevent any health condition.
          </p>
          <p style={{ color:"#c8ccf0", fontSize:"13px", lineHeight:1.85, margin:"0 0 12px 0" }}>
            Always consult a <strong style={{color:"#eef0ff"}}>qualified healthcare provider</strong> before making changes to your diet, starting supplements, or modifying any existing treatment plan — especially if you are currently taking medication or under the care of a mental health professional.
          </p>
          <p style={{ color:"#c8ccf0", fontSize:"13px", lineHeight:1.85, margin:0 }}>
            Supplement information is provided for <strong style={{color:"#eef0ff"}}>educational reference only</strong>. Dosing, safety, and interactions vary by individual. NeuroThrive does not recommend specific dosing and is not responsible for decisions made based on information in this app.
          </p>
        </div>

        <div style={{ background:"rgba(232,200,122,0.06)", border:"1px solid rgba(232,200,122,0.2)", borderRadius:"12px", padding:"14px 16px", marginBottom:"24px" }}>
          <p style={{ color:"#e8c87a", fontSize:"12px", lineHeight:1.75, margin:0 }}>
            🚨 <strong>If you are experiencing a mental health crisis</strong>, please contact a crisis line or emergency services immediately. In the US: <strong>988 Suicide & Crisis Lifeline — call or text 988</strong>.
          </p>
        </div>

        <div style={{ display:"flex", gap:"8px", alignItems:"flex-start", marginBottom:"24px", padding:"14px 16px", borderRadius:"12px", background:"rgba(240,244,255,0.03)", border:"1px solid rgba(110,120,200,0.15)" }}>
          <p style={{ color:"#8890b8", fontSize:"12px", lineHeight:1.7, margin:0 }}>
            By continuing you confirm you have read and understood this disclaimer and agree to our{" "}
            <button onClick={() => setLegalPage("terms")} style={{ color:"#7b9fff", background:"none", border:"none", padding:0, cursor:"pointer", fontSize:"12px", textDecoration:"underline" }}>Terms of Service</button>
            {" "}and{" "}
            <button onClick={() => setLegalPage("privacy")} style={{ color:"#7b9fff", background:"none", border:"none", padding:0, cursor:"pointer", fontSize:"12px", textDecoration:"underline" }}>Privacy Policy</button>.
          </p>
        </div>

        <button onClick={() => setDisclaimerAccepted(true)} style={{ width:"100%", padding:"16px", borderRadius:"50px", background:"linear-gradient(135deg,#5570f0,#4060e0)", color:"#fff", border:"none", fontSize:"15px", fontWeight:"600", cursor:"pointer", fontFamily:"'Plus Jakarta Sans',sans-serif", boxShadow:"0 4px 24px rgba(85,112,240,0.4)" }}>
          I Understand — Continue to NeuroThrive
        </button>
        <p style={{ textAlign:"center", color:"#8890b8", fontSize:"11px", marginTop:"16px", lineHeight:1.6 }}>
          © {new Date().getFullYear()} NeuroThrive. All rights reserved.
        </p>
      </div>
    </div>
  );

  // ── Main app render ────────────────────────────────────────────────────────
  const openExplain = (meal, mealType, dayIdx) => {
    const condIds = selectedConditions.length > 0 ? selectedConditions : ["default"];
    const condLabels = condIds.map(id => MENTAL_CONDITIONS.find(c => c.id === id)?.label).filter(Boolean);
    const conditionLabel = condLabels.length > 0 ? condLabels.join(" & ") : "general wellness";
    const text = buildMealExplanation(meal, condIds);
    setExplainModal({ meal, mealType, conditionLabel, dayIdx });
    setModalTab("why");
    setExplainText(text);
    setExplainLoading(false);
  };

  // ── Open modal on Recipe tab ──────────────────────────────────────────────
  const openRecipe = (meal, mealType, dayIdx) => {
    const condIds = selectedConditions.length > 0 ? selectedConditions : ["default"];
    const condLabels = condIds.map(id => MENTAL_CONDITIONS.find(c => c.id === id)?.label).filter(Boolean);
    const conditionLabel = condLabels.length > 0 ? condLabels.join(" & ") : "general wellness";
    setExplainModal({ meal, mealType, conditionLabel, dayIdx });
    setModalTab("recipe");
    setExplainText("");
    setExplainLoading(false);
  };

  // ── Switch tab inside open modal ──────────────────────────────────────────
  const handleModalTab = (tab) => {
    setModalTab(tab);
    if (tab === "why" && explainModal) {
      const condIds = selectedConditions.length > 0 ? selectedConditions : ["default"];
      const text = buildMealExplanation(explainModal.meal, condIds);
      setExplainText(text);
    }
  };

  const startNewCycle = () => {
    const condition = selectedConditions[0] || "default";
    const days = build30DayMenu(condition, selectedDiet, calorieTarget);
    setMenu30(days);
    setPlanCycle(c => c + 1);
    setCycleStartDate(new Date().toISOString());
    setSelectedWeek(0);
    setSelectedDayIdx(0);
    setShowCycleComplete(false);
    handleStepForward(4);
  };

  const toggleItem = (list, setList, id) => {
    setList(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const buildMenu = () => {
    const condition = selectedConditions[0] || "default";
    const days = build30DayMenu(condition, selectedDiet, calorieTarget);
    setMenu30(days);
    setPlanCycle(1);
    setCycleStartDate(new Date().toISOString());
    setSelectedWeek(0);
    setSelectedDayIdx(0);
    setRoutineQPage("intro");
    setStep(13);
  };

  const requestNotifPermission = async () => {
    if (!("Notification" in window)) return;
    const perm = await Notification.requestPermission();
    setNotifPermission(perm);
    if (perm === "granted") { setRemindersEnabled(true); scheduleReminders(); }
  };

  const scheduleReminders = () => {
    const mealNames = { breakfast:"Breakfast", lunch:"Lunch", dinner:"Dinner", snack:"Afternoon Snack" };
    Object.entries(reminderTimes).forEach(([meal, time]) => {
      if (!reminderActive[meal]) return;
      const [h, m] = time.split(":").map(Number);
      const now = new Date();
      const target = new Date();
      target.setHours(h, m, 0, 0);
      if (target <= now) target.setDate(target.getDate() + 1);
      const ms = target - now;
      setTimeout(() => {
        if (notifPermission === "granted" && reminderActive[meal]) {
          new Notification("🌿 NeuroThrive", { body: `Time for ${mealNames[meal]}! Your plan is ready. Nourish your mind. 🍽️` });
        }
      }, ms);
    });
    // ── Daily affirmation notification ──────────────────────────────────
    if (affirmNotifEnabled) {
      const [h, m] = affirmNotifTime.split(":").map(Number);
      const now = new Date();
      const target = new Date();
      target.setHours(h, m, 0, 0);
      if (target <= now) target.setDate(target.getDate() + 1);
      const ms = target - now;
      setTimeout(() => {
        if (notifPermission === "granted" && affirmNotifEnabled) {
          const affirmation = AFFIRMATIONS[Math.floor(Math.random() * AFFIRMATIONS.length)];
          new Notification("💙 NeuroThrive — Daily Affirmation", { body: affirmation.text });
        }
      }, ms);
    }
  };

  const saveReminders = () => {
    if (remindersEnabled) scheduleReminders();
    setReminderSaved(true);
    setTimeout(() => setReminderSaved(false), 2500);
  };

  const daysElapsed = cycleStartDate
    ? Math.min(30, Math.floor((new Date() - new Date(cycleStartDate)) / (1000 * 60 * 60 * 24)) + 1)
    : 1;

  const getAltMeal = (currentMeal, mealType, mealKey) => {
    const label = mealType.toLowerCase();
    const typeKey = label.includes("breakfast") ? "breakfast" : label.includes("lunch") ? "lunch" : label.includes("dinner") ? "dinner" : "snacks";
    const condition = selectedConditions[0] || "default";
    const pool = filterMeals(ALL_MEALS[typeKey], selectedDiet, condition).map(m => m.name).filter(n => n !== currentMeal);
    if (pool.length === 0) return;
    const pick = pool[Math.floor(Math.random() * pool.length)];
    const altKey = `${globalDayIdx}_${mealKey}`;
    setAltMeal(prev => ({ ...prev, [altKey]: pick }));
  };

  const saveLog = () => {
    if (!todayMood || !todayEnergy) return;
    const entry = {
      date: new Date().toLocaleDateString("en-US", { weekday:"short", month:"short", day:"numeric" }),
      mood: todayMood, energy: todayEnergy, note: todayNote,
    };
    setLogs(prev => [entry, ...prev]);
    // Show mood-nutrient connection for low moods
    const condKey = selectedConditions.includes("neuro_core") ? "neuro_core" : (selectedConditions[0] || "default");
    const moodConns = MOOD_NUTRIENT_CONNECTIONS[condKey] || MOOD_NUTRIENT_CONNECTIONS.default;
    if (todayMood <= 2 && moodConns && moodConns[todayMood]) {
      setMoodInsight(moodConns[todayMood]);
    } else {
      setMoodInsight(null);
    }
    setTodayMood(null); setTodayEnergy(null); setTodayNote("");
    setLogSaved(true); setTimeout(() => setLogSaved(false), 3000);
  };

  // ── Daily checks helpers ──────────────────────────────────────────────────
  const todayKey = new Date().toISOString().slice(0, 10);

  const defaultChecks = () => ({
    meals: { breakfast: false, lunch: false, dinner: false, snacks: false, snacks2: false },
    foodLog: {},
    routine: { morning: [], evening: [] },
    exercise: false,
    exerciseOptions: {}
  });

  const getTodayChecks = () => dailyChecks[todayKey] || defaultChecks();

  const updateTodayChecks = (updater) => {
    setDailyChecks(prev => ({
      ...prev,
      [todayKey]: updater(prev[todayKey] || defaultChecks())
    }));
  };

  const toggleMealCheck = (mealKey, mealName) => {
    updateTodayChecks(prev => {
      const wasChecked = prev.meals[mealKey];
      const newMeals = { ...prev.meals, [mealKey]: !wasChecked };
      const newLog = { ...prev.foodLog };
      if (!wasChecked) {
        newLog[mealKey] = mealName;
      } else {
        delete newLog[mealKey];
      }
      return { ...prev, meals: newMeals, foodLog: newLog };
    });
  };

  // ── Daily score calculator ───────────────────────────────────────────────
  const getDailyScore = (dateKey) => {
    const checks = dailyChecks[dateKey || todayKey];
    if (!checks) return { earned: 0, total: 10, pct: 0 };

    let earned = 0;
    const meals = checks.meals || {};
    if (meals.breakfast) earned++;
    if (meals.lunch) earned++;
    if (meals.dinner) earned++;
    if (meals.snacks) earned++;
    if (meals.snacks2) earned++;

    const condKey = selectedConditions.includes("neuro_core") ? "neuro_core"
      : (selectedConditions[0] && DAILY_ROUTINES[selectedConditions[0]]) ? selectedConditions[0] : "default";
    const routine = personalRoutine || DAILY_ROUTINES[condKey] || DAILY_ROUTINES.default;
    const morningCount = (routine?.morning || []).length;
    const eveningCount = (routine?.evening || []).length;
    const morningChecked = (checks.routine?.morning || []).filter(Boolean).length;
    const eveningChecked = (checks.routine?.evening || []).filter(Boolean).length;
    earned += morningChecked;
    earned += eveningChecked;

    if (checks.exercise) earned++;

    const hasJournal = logs.some(l => l.date && l.date.includes(new Date(dateKey || todayKey).toLocaleDateString("en-US", { month: "short", day: "numeric" })));
    if (hasJournal) earned++;

    const hasSnacks2 = calorieTarget === "2000";
    const mealCount = hasSnacks2 ? 5 : 4;
    const total = mealCount + morningCount + eveningCount + 1 + 1;
    return { earned, total, pct: total > 0 ? Math.round((earned / total) * 100) : 0 };
  };

  // ── Brain Score System ──────────────────────────────────────────────────────
  const getBrainPoints = (dateKey) => {
    const dk = dateKey || todayKey;
    const checks = dailyChecks[dk];
    if (!checks) return { total: 0, max: 100, pct: 0, categories: { meals: 0, morning: 0, evening: 0, exercise: 0, journal: 0 }, maxCats: { meals: 0, morning: 0, evening: 0, exercise: 10, journal: 5 } };

    // Meals: 5-15 BP each based on brain nutrient score
    const meals = checks.meals || {};
    const mealKeys = ["breakfast", "lunch", "dinner", "snacks", ...(calorieTarget === "2000" ? ["snacks2"] : [])];
    let mealBP = 0;
    let mealMaxBP = 0;
    // Get today's menu day
    const dayIdx = Math.max(0, daysElapsed - 1) % 30;
    const todayMenu = menu30 ? menu30[dayIdx] : null;
    mealKeys.forEach(key => {
      const mealName = todayMenu ? todayMenu[key] : null;
      const bs = mealName ? getBrainScore(mealName).score : 3;
      const maxPts = Math.min(15, 5 + bs * 2); // 7-15 based on brain score
      mealMaxBP += maxPts;
      if (meals[key]) mealBP += maxPts;
    });

    // Morning routine: 3 BP per step
    const condKey = selectedConditions.includes("neuro_core") ? "neuro_core"
      : (selectedConditions[0] && DAILY_ROUTINES[selectedConditions[0]]) ? selectedConditions[0] : "default";
    const routine = personalRoutine || DAILY_ROUTINES[condKey] || DAILY_ROUTINES.default;
    const morningSteps = routine?.morning || [];
    const eveningSteps = routine?.evening || [];
    const morningChecked = (checks.routine?.morning || []).filter(Boolean).length;
    const eveningChecked = (checks.routine?.evening || []).filter(Boolean).length;
    const morningBP = morningChecked * 3;
    const morningMaxBP = morningSteps.length * 3;
    const eveningBP = eveningChecked * 3;
    const eveningMaxBP = eveningSteps.length * 3;

    // Exercise: 10 BP
    const exerciseChecks = checks.exerciseOptions || {};
    const exerciseDone = Object.values(exerciseChecks).some(Boolean) || checks.exercise;
    const exerciseBP = exerciseDone ? 10 : 0;

    // Journal: 5 BP + 2 bonus for positive mood
    const hasJournal = logs.some(l => l.date && l.date.includes(new Date(dk).toLocaleDateString("en-US", { month: "short", day: "numeric" })));
    const journalLog = logs.find(l => l.date && l.date.includes(new Date(dk).toLocaleDateString("en-US", { month: "short", day: "numeric" })));
    let journalBP = hasJournal ? 5 : 0;
    if (journalLog && journalLog.mood >= 3) journalBP += 2;
    const journalMaxBP = 7;

    const total = mealBP + morningBP + eveningBP + exerciseBP + journalBP;
    const max = mealMaxBP + morningMaxBP + eveningMaxBP + 10 + journalMaxBP;
    return {
      total, max,
      pct: max > 0 ? Math.round((total / max) * 100) : 0,
      categories: { meals: mealBP, morning: morningBP, evening: eveningBP, exercise: exerciseBP, journal: journalBP },
      maxCats: { meals: mealMaxBP, morning: morningMaxBP, evening: eveningMaxBP, exercise: 10, journal: journalMaxBP },
    };
  };

  const getBrainLevel = (pct) => {
    if (pct >= 90) return { label: "Thriving", emoji: "🧠✨", color: "#50c878" };
    if (pct >= 70) return { label: "Strong", emoji: "🧠💪", color: "#7b9fff" };
    if (pct >= 50) return { label: "Building", emoji: "🧠🔨", color: "#e8c87a" };
    if (pct >= 25) return { label: "Warming Up", emoji: "🧠🌅", color: "#e0a050" };
    return { label: "Just Starting", emoji: "🧠🌱", color: "#8890b8" };
  };

  const getCompletionStreak = () => {
    let streak = 0;
    const today = new Date();
    for (let i = 1; i <= 365; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      const score = getDailyScore(key);
      if (dailyChecks[key] && score.pct > 50) streak++;
      else break;
    }
    // Include today if active
    const todayScore = getDailyScore(todayKey);
    if (dailyChecks[todayKey] && todayScore.pct > 50) streak++;
    return streak;
  };

  // ── Progress banner component (inline) ──────────────────────────────────
  const ProgressBanner = ({ context }) => {
    const bp = getBrainPoints(todayKey);
    const level = getBrainLevel(bp.pct);
    const streak = getCompletionStreak();
    const r = 22, circ = 2 * Math.PI * r;
    const offset = circ - (bp.pct / 100) * circ;

    const catItems = [
      { label: "Meals", bp: bp.categories.meals, max: bp.maxCats.meals, emoji: "🍽️" },
      { label: "Morning", bp: bp.categories.morning, max: bp.maxCats.morning, emoji: "☀️" },
      { label: "Evening", bp: bp.categories.evening, max: bp.maxCats.evening, emoji: "🌙" },
      { label: "Exercise", bp: bp.categories.exercise, max: bp.maxCats.exercise, emoji: "💪" },
      { label: "Journal", bp: bp.categories.journal, max: bp.maxCats.journal, emoji: "📓" },
    ];

    // Filter by context if provided
    const items = context === "menu" ? catItems.filter(c => c.label === "Meals")
      : context === "routine" ? catItems.filter(c => ["Morning","Evening","Exercise"].includes(c.label))
      : context === "journal" ? catItems.filter(c => c.label === "Journal")
      : catItems;

    return (
      <div style={{ background: "rgba(80,200,120,0.04)", border: "1px solid rgba(80,200,120,0.15)", borderRadius: "16px", padding: "16px 18px", marginBottom: "18px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "12px" }}>
          <svg width="52" height="52" viewBox="0 0 52 52" style={{ flexShrink: 0 }}>
            <circle cx="26" cy="26" r={r} fill="none" stroke="rgba(80,200,120,0.12)" strokeWidth="4.5" />
            <circle cx="26" cy="26" r={r} fill="none" stroke={level.color} strokeWidth="4.5" strokeLinecap="round"
              strokeDasharray={circ} strokeDashoffset={offset}
              transform="rotate(-90 26 26)" style={{ transition: "stroke-dashoffset 0.5s ease" }} />
            <text x="26" y="28" textAnchor="middle" fontSize="12" fontWeight="800" fill={level.color}>{bp.pct}%</text>
          </svg>
          <div style={{ flex: 1 }}>
            <div style={{ color: "#eef0ff", fontSize: "14px", fontWeight: "700" }}>Brain Score: {bp.total} BP</div>
            <div style={{ color: level.color, fontSize: "12px", fontWeight: "600", marginTop: "2px" }}>{level.emoji} {level.label}</div>
            <div style={{ color: "#8890b8", fontSize: "11px", marginTop: "2px" }}>
              {bp.total} of {bp.max} brain points {streak > 0 && <span style={{ color: "#e8c87a" }}>· {streak} day streak 🔥</span>}
            </div>
          </div>
        </div>
        {/* Category breakdown bars */}
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          {items.map((cat, i) => {
            const pct = cat.max > 0 ? Math.round((cat.bp / cat.max) * 100) : 0;
            const full = pct >= 100;
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontSize: "11px", width: "16px", textAlign: "center" }}>{cat.emoji}</span>
                <span style={{ fontSize: "10px", fontWeight: "600", color: full ? "#50c878" : "#8890b8", width: "52px" }}>{cat.label}</span>
                <div style={{ flex: 1, height: "6px", borderRadius: "3px", background: "rgba(110,120,200,0.12)", overflow: "hidden" }}>
                  <div style={{ width: `${Math.min(100, pct)}%`, height: "100%", borderRadius: "3px", background: full ? "#50c878" : level.color, transition: "width 0.5s ease" }} />
                </div>
                <span style={{ fontSize: "10px", fontWeight: "700", color: full ? "#50c878" : "#7b9fff", width: "36px", textAlign: "right" }}>{cat.bp}/{cat.max}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const nextAffirm = () => { setAnimating(true); setTimeout(() => { setAffirmIdx(i => (i+1)%AFFIRMATIONS.length); setAnimating(false); }, 300); };
  const prevAffirm = () => { setAnimating(true); setTimeout(() => { setAffirmIdx(i => (i-1+AFFIRMATIONS.length)%AFFIRMATIONS.length); setAnimating(false); }, 300); };

  const weekDays = menu30 ? menu30.slice(selectedWeek*7, selectedWeek*7+7) : [];
  const currentDay = weekDays[selectedDayIdx] || null;
  const globalDayIdx = selectedWeek*7+selectedDayIdx;

  const S = {
    app: { minHeight:"100vh", background:"radial-gradient(ellipse at 15% 0%, rgba(85,112,240,0.08) 0%, transparent 50%), radial-gradient(ellipse at 85% 100%, rgba(107,143,255,0.05) 0%, transparent 50%), linear-gradient(180deg,#060a14 0%,#080e1c 50%,#060a14 100%)", fontFamily:"'Plus Jakarta Sans',system-ui,-apple-system,sans-serif", color:"#e8ecff", letterSpacing:"-0.01em" },
    nav: { background:"rgba(6,10,20,0.8)", borderBottom:"1px solid rgba(107,143,255,0.08)", padding:"0 28px", display:"flex", alignItems:"center", justifyContent:"space-between", position:"sticky", top:0, zIndex:100, backdropFilter:"blur(24px) saturate(1.4)", WebkitBackdropFilter:"blur(24px) saturate(1.4)", height:"56px", boxShadow:"0 1px 48px rgba(0,0,0,0.5), 0 1px 0 rgba(107,143,255,0.06)" },
    logo: { fontSize:"16px", fontWeight:"700", color:"#eef0ff", letterSpacing:"-0.3px", display:"flex", alignItems:"center", gap:"10px" },
    navTabs: { display:"flex", gap:"1px", overflowX:"auto", WebkitOverflowScrolling:"touch", scrollbarWidth:"none", msOverflowStyle:"none", flexShrink:1, minWidth:0 },
    navTab: (a) => ({ padding:"7px 14px", borderRadius:"8px", border:"none", cursor:"pointer", fontSize:"11.5px", fontWeight:a?"600":"500", background:a?"rgba(107,143,255,0.12)":"transparent", color:a?"#a0b8ff":"#6b7394", letterSpacing:"0.01em", whiteSpace:"nowrap", flexShrink:0 }),
    main: { maxWidth:"720px", margin:"0 auto", padding:"44px 24px" },
    hero: { textAlign:"center", padding:"80px 20px 60px" },
    heroEyebrow: { display:"inline-block", fontSize:"10px", fontWeight:"600", letterSpacing:"3.5px", textTransform:"uppercase", color:"#7b9fff", background:"rgba(107,143,255,0.08)", border:"1px solid rgba(107,143,255,0.12)", padding:"7px 18px", borderRadius:"24px", marginBottom:"32px" },
    heroTitle: { fontSize:"56px", fontWeight:"800", color:"#f0f2ff", lineHeight:1.04, marginBottom:"22px", letterSpacing:"-2.5px" },
    heroAccent: { background:"linear-gradient(135deg,#7b9fff,#5570f0)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" },
    heroSub: { fontSize:"16px", color:"#6b7ba8", maxWidth:"440px", margin:"0 auto 48px", lineHeight:1.75, fontWeight:"400", letterSpacing:"0.01em" },
    btn: { background:"rgba(107,143,255,0.08)", color:"#a0b8ff", border:"1px solid rgba(107,143,255,0.2)", padding:"13px 28px", borderRadius:"50px", fontSize:"13.5px", fontWeight:"600", letterSpacing:"0.01em", cursor:"pointer", backdropFilter:"blur(8px)" },
    btnOutline: { background:"rgba(255,255,255,0.02)", color:"#8898c8", border:"1px solid rgba(107,143,255,0.18)", padding:"12px 24px", borderRadius:"50px", fontSize:"13.5px", fontWeight:"500", cursor:"pointer", backdropFilter:"blur(8px)" },
    btnAccent: { background:"linear-gradient(135deg,#5570f0 0%,#3d58e0 100%)", color:"#fff", border:"none", padding:"14px 34px", borderRadius:"50px", fontSize:"13.5px", fontWeight:"600", cursor:"pointer", boxShadow:"0 4px 20px rgba(85,112,240,0.35), 0 1px 3px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.15)", letterSpacing:"0.01em" },
    btnSm: { background:"rgba(255,255,255,0.03)", border:"1px solid rgba(107,143,255,0.15)", borderRadius:"8px", color:"#7888b8", padding:"6px 13px", cursor:"pointer", fontSize:"12px", fontWeight:"500" },
    sectionTitle: { fontSize:"26px", color:"#f0f2ff", marginBottom:"6px", fontWeight:"700", letterSpacing:"-0.6px", lineHeight:1.2 },
    sectionSub: { fontSize:"14px", color:"#6b7ba8", marginBottom:"28px", lineHeight:1.7, letterSpacing:"0.01em" },
    grid: { display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"10px", marginBottom:"32px" },
    chip: (sel) => ({ padding:"12px 14px", borderRadius:"14px", border:sel?"1px solid rgba(85,112,240,0.5)":"1px solid rgba(107,143,255,0.1)", background:sel?"rgba(80,112,240,0.12)":"rgba(255,255,255,0.02)", cursor:"pointer", fontSize:"13px", fontWeight:sel?"600":"400", color:sel?"#a0b8ff":"#7888b8", display:"flex", alignItems:"center", gap:"8px", transition:"all 0.2s cubic-bezier(0.25,0.46,0.45,0.94)" }),
    card: { background:"rgba(255,255,255,0.025)", border:"1px solid rgba(107,143,255,0.08)", borderRadius:"18px", padding:"20px", marginBottom:"14px", backdropFilter:"blur(12px)", boxShadow:"0 2px 16px rgba(0,0,0,0.15), 0 8px 32px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.04)" },
    mealLabel: { fontSize:"10px", textTransform:"uppercase", letterSpacing:"2.5px", color:"#5e78d0", marginBottom:"10px", fontWeight:"700" },
    tag: { display:"inline-block", padding:"4px 12px", borderRadius:"20px", background:"rgba(80,112,240,0.1)", border:"1px solid rgba(80,112,240,0.15)", color:"#a0b8ff", fontSize:"11.5px", fontWeight:"500", marginRight:"6px", marginBottom:"6px" },
    divider: { height:"1px", background:"linear-gradient(90deg, transparent, rgba(107,143,255,0.12), transparent)", margin:"24px 0" },
    moodRow: { display:"flex", gap:"10px", flexWrap:"wrap", marginBottom:"20px" },
    moodBtn: (sel) => ({ flex:1, minWidth:"55px", padding:"12px 6px", borderRadius:"14px", border:sel?"1px solid rgba(85,112,240,0.5)":"1px solid rgba(107,143,255,0.1)", background:sel?"rgba(80,112,240,0.12)":"rgba(255,255,255,0.02)", cursor:"pointer", textAlign:"center", transition:"all 0.2s cubic-bezier(0.25,0.46,0.45,0.94)", color:sel?"#a0b8ff":"#7888b8", fontWeight:sel?"600":"400" }),
    textarea: { width:"100%", background:"rgba(255,255,255,0.03)", border:"1px solid rgba(107,143,255,0.1)", borderRadius:"14px", color:"#e8ecff", fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif", fontSize:"14px", padding:"16px", resize:"vertical", minHeight:"80px", outline:"none", boxSizing:"border-box", marginBottom:"16px", transition:"border-color 0.2s, box-shadow 0.2s" },
    affirmCard: { textAlign:"center", padding:"56px 36px", background:"rgba(107,143,255,0.05)", border:"1px solid rgba(107,143,255,0.12)", borderRadius:"24px", marginBottom:"20px", position:"relative", overflow:"hidden", boxShadow:"0 4px 32px rgba(0,0,0,0.15)" },
    successBanner: { background:"rgba(80,200,120,0.08)", border:"1px solid rgba(80,200,120,0.18)", borderRadius:"14px", padding:"14px 20px", color:"#70d890", fontSize:"13px", fontWeight:"600", textAlign:"center", marginBottom:"16px", backdropFilter:"blur(8px)" },
    dot: (a,d) => ({ width:"6px", height:"6px", borderRadius:"50%", background:a?"#5570f0":d?"rgba(80,112,240,0.4)":"rgba(107,143,255,0.15)", transition:"all 0.3s" }),
    warningBanner: { background:"rgba(107,143,255,0.05)", border:"1px solid rgba(107,143,255,0.12)", borderRadius:"14px", padding:"14px 20px", color:"#a0b8ff", fontSize:"13px", fontWeight:"500", marginBottom:"18px" },
  };

  const STEPS = ["Welcome","Gender","Conditions","Diet","Menu","Journal","(unused)","Supplements","Reminders","Toolkit","Routine","Progress"];

  // Date helper: get the real calendar date for a plan day (0-indexed)
  const getPlanDate = (dayIdx) => {
    if (!cycleStartDate) return null;
    const d = new Date(cycleStartDate);
    d.setDate(d.getDate() + dayIdx);
    return d;
  };
  const formatPlanDate = (dayIdx, style) => {
    const d = getPlanDate(dayIdx);
    if (!d) return "";
    if (style === "short") return d.toLocaleDateString("en-US", { month:"short", day:"numeric" });
    if (style === "weekday") return d.toLocaleDateString("en-US", { weekday:"short" });
    return d.toLocaleDateString("en-US", { weekday:"short", month:"short", day:"numeric" });
  };

  const mealActionBtn = (onClick, color, text) => ({
    style: { flex:1, padding:"9px 10px", borderRadius:"10px", border:`1.5px solid ${color}33`, background:`${color}11`, color, fontSize:"12px", fontWeight:"600", cursor:"pointer", transition:"all 0.15s", whiteSpace:"nowrap" },
    onClick,
  });

  return (
    <div style={S.app}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; background: #060a14; }
        * { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
        @keyframes pulse { 0%,100% { opacity:0.5; } 50% { opacity:1; } }
        @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
        @keyframes glow { 0%,100% { box-shadow: 0 0 20px rgba(107,143,255,0.1); } 50% { box-shadow: 0 0 40px rgba(107,143,255,0.25); } }
        @keyframes subtleFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }
        button { transition: all 0.2s cubic-bezier(0.25,0.46,0.45,0.94); }
        button:hover { opacity: 0.88; }
        button:active { opacity: 0.95; }
        details > summary { user-select: none; }
        details > summary::-webkit-details-marker { display: none; }
        .nav-tabs-scroll::-webkit-scrollbar { display: none; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(107,143,255,0.2); border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(107,143,255,0.4); }
        ::selection { background: rgba(107,143,255,0.25); color: #fff; }
        input:focus, textarea:focus { border-color: rgba(107,143,255,0.4) !important; box-shadow: 0 0 0 3px rgba(107,143,255,0.08); outline: none; }
      `}</style>

      <nav style={S.nav}>
        <div style={{ ...S.logo, cursor:"pointer" }} onClick={() => setStep(0)}>
          <span style={{ fontSize:"20px" }}>🧠</span>
          <span>NeuroThrive</span>
        </div>
        <div className="nav-tabs-scroll" style={S.navTabs}>
          {step > 0 && step <= 3 && [
            { label:"Gender",       s:1 },
            { label:"Conditions",   s:2 },
            { label:"Diet",         s:3 },
          ].map(({ label, s }) => (
            <button key={label} style={S.navTab(step===s)} onClick={() => handleStepForward(s)}>{label}</button>
          ))}
          {step > 3 && (
            <>
              <button style={S.navTab(step===4)} onClick={() => setStep(4)}>30-Day Menu</button>
              {isPremium && <button style={S.navTab(step===8)} onClick={() => setStep(8)}>Journal</button>}
              {isPremium && <button style={S.navTab(step===10)} onClick={() => setStep(10)}>Routine</button>}
              {isPremium && <button style={S.navTab(step===12)} onClick={() => setStep(12)}>Today</button>}
              {isPremium && <button style={S.navTab(step===11)} onClick={() => setStep(11)}>Progress</button>}
            </>
          )}
        </div>
        {isPremium && step > 3 && (
          <div style={{ position:"relative", flexShrink:0 }}>
            <button style={S.navTab([6,7,9].includes(step))} onClick={() => setShowMoreMenu(p => !p)}>More ▾</button>
            {showMoreMenu && (
              <>
                <div onClick={() => setShowMoreMenu(false)} style={{ position:"fixed", inset:0, zIndex:199 }} />
                <div style={{ position:"absolute", top:"100%", right:0, marginTop:"8px", background:"#111828", border:"1px solid rgba(107,143,255,0.15)", borderRadius:"14px", padding:"6px", minWidth:"160px", zIndex:200, boxShadow:"0 12px 40px rgba(0,0,0,0.4)" }}>
                  {[
                    { label:"🌿 Supplements", s:6 },
                    { label:"🔔 Reminders",   s:7 },
                    { label:"🧠 Toolkit",     s:9 },
                    { label:"👤 Profile",     s:1 },
                    { label:"🥗 Diet",        s:3 },
                  ].map(({ label, s }) => (
                    <button key={s} onClick={() => { setStep(s); setShowMoreMenu(false); }} style={{ display:"block", width:"100%", padding:"10px 14px", borderRadius:"10px", border:"none", background: step===s ? "rgba(107,143,255,0.12)" : "transparent", color: step===s ? "#a0b8ff" : "#8890b8", fontSize:"13px", fontWeight: step===s ? "600" : "500", cursor:"pointer", textAlign:"left" }}>{label}</button>
                  ))}
                  <div style={{ height:"1px", background:"rgba(110,120,200,0.12)", margin:"4px 6px" }} />
                  <button onClick={() => { setShowBrainExplainer(true); setShowMoreMenu(false); }} style={{ display:"block", width:"100%", padding:"10px 14px", borderRadius:"10px", border:"none", background: showBrainExplainer ? "rgba(107,143,255,0.12)" : "transparent", color: showBrainExplainer ? "#a0b8ff" : "#8890b8", fontSize:"13px", fontWeight: showBrainExplainer ? "600" : "500", cursor:"pointer", textAlign:"left" }}>🧬 Your Brain</button>
                  <button onClick={() => { setRoutineQPage(personalRoutine ? "morning" : "intro"); setStep(13); setShowMoreMenu(false); }} style={{ display:"block", width:"100%", padding:"10px 14px", borderRadius:"10px", border:"none", background: step===13 ? "rgba(107,143,255,0.12)" : "transparent", color: step===13 ? "#a0b8ff" : "#8890b8", fontSize:"13px", fontWeight: step===13 ? "600" : "500", cursor:"pointer", textAlign:"left" }}>🔄 Rebuild Routine</button>
                </div>
              </>
            )}
          </div>
        )}
        <button onClick={handleLogout} style={{ marginLeft:"8px", padding:"6px 14px", borderRadius:"20px", border:"1px solid rgba(110,120,200,0.25)", background:"transparent", color:"#8890b8", fontSize:"11px", fontWeight:"600", cursor:"pointer", letterSpacing:"0.5px", flexShrink:0 }}>Sign Out</button>
      </nav>

      <div style={S.main}>
        {step > 0 && step < 9 && (
          <div style={{ display:"flex", justifyContent:"center", gap:"6px", marginBottom:"36px" }}>
            {[1,2,3,4,5,6,7].map(s => <div key={s} style={S.dot(step===s, step>s)} />)}
          </div>
        )}

        {/* WELCOME */}
        {step === 0 && (
          <div style={S.hero}>
            <div style={S.heroEyebrow}>Brain · Food · Wellbeing</div>
            <h1 style={S.heroTitle}>Eat for your<br/><span style={S.heroAccent}>mind.</span></h1>
            <p style={S.heroSub}>A personalized 30-day nutrition plan built around your mental health — with daily mood tracking and research-informed meal explanations.</p>
            <button style={S.btnAccent} onClick={() => setStep(1)}>Get Started →</button>
          </div>
        )}

        {/* STEP 1: GENDER */}
        {step === 1 && (
          <div>
            <h2 style={S.sectionTitle}>Tell us about yourself</h2>
            <p style={S.sectionSub}>This helps us personalize your plan — hormones and biology shape how nutrition affects your brain and mood.</p>
            <div style={{ display:"flex", flexDirection:"column", gap:"14px", marginBottom:"32px" }}>
              {[
                { id:"male",   label:"Male",   desc:"Protein metabolism, testosterone support, iron & zinc optimisation" },
                { id:"female", label:"Female", desc:"Hormonal cycle support, iron & folate, mood-food connection" },
              ].map(g => (
                <div
                  key={g.id}
                  onClick={() => setSelectedGender(g.id)}
                  style={{
                    padding:"20px 22px", borderRadius:"18px", cursor:"pointer",
                    border: selectedGender === g.id ? "1.5px solid #5570f0" : "1px solid rgba(110,120,200,0.18)",
                    background: selectedGender === g.id ? "rgba(80,112,240,0.12)" : "rgba(240,244,255,0.04)",
                    transition:"all 0.2s", display:"flex", alignItems:"center", gap:"16px",
                  }}
                >
                  <span style={{ fontSize:"20px" }}></span>
                  <div style={{ flex:1 }}>
                    <div style={{ color:"#eef0ff", fontSize:"16px", fontWeight:"600", marginBottom:"4px" }}>{g.label}</div>
                    <div style={{ color:"#8890b8", fontSize:"13px", lineHeight:1.5 }}>{g.desc}</div>
                  </div>
                  {selectedGender === g.id && (
                    <div style={{ width:"22px", height:"22px", borderRadius:"50%", background:"#5570f0", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                      <span style={{ color:"#fff", fontSize:"13px", fontWeight:"800" }}>✓</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
            {/* Cycle Sync — only for female */}
            {selectedGender === "female" && (
              <div style={{ marginBottom:"28px", padding:"20px", borderRadius:"18px", background:"rgba(168,120,210,0.06)", border:"1px solid rgba(168,120,210,0.15)" }}>
                <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"8px" }}>
                  <span style={{ fontSize:"20px" }}>🌙</span>
                  <div>
                    <div style={{ color:"#e8d0ff", fontSize:"15px", fontWeight:"700" }}>Cycle Sync Nutrition</div>
                    <div style={{ color:"#8890b8", fontSize:"12px", lineHeight:1.5, marginTop:"2px" }}>Get nutrition tips tailored to your current menstrual phase</div>
                  </div>
                </div>
                <div style={{ display:"flex", gap:"10px", marginTop:"14px" }}>
                  <button
                    onClick={() => setCycleSyncEnabled(true)}
                    style={{ flex:1, padding:"11px 16px", borderRadius:"12px", border: cycleSyncEnabled ? "1.5px solid rgba(168,120,210,0.5)" : "1px solid rgba(168,120,210,0.2)", background: cycleSyncEnabled ? "rgba(168,120,210,0.15)" : "rgba(168,120,210,0.04)", color: cycleSyncEnabled ? "#c8a0e8" : "#8890b8", fontSize:"13px", fontWeight:"600", cursor:"pointer", transition:"all 0.2s" }}
                  >🌕 Sync my cycle</button>
                  <button
                    onClick={() => { setCycleSyncEnabled(false); setLastPeriodDate(""); }}
                    style={{ flex:1, padding:"11px 16px", borderRadius:"12px", border: !cycleSyncEnabled ? "1.5px solid rgba(85,112,240,0.5)" : "1px solid rgba(110,120,200,0.15)", background: !cycleSyncEnabled ? "rgba(85,112,240,0.15)" : "rgba(110,120,200,0.03)", color: !cycleSyncEnabled ? "#a0b8ff" : "#6b7394", fontSize:"13px", fontWeight:"600", cursor:"pointer", transition:"all 0.2s" }}
                  >Skip for now</button>
                </div>
                {cycleSyncEnabled && (
                  <div style={{ marginTop:"18px", display:"flex", flexDirection:"column", gap:"14px" }}>
                    <div>
                      <label style={{ display:"block", color:"#a0b8ff", fontSize:"12px", fontWeight:"600", marginBottom:"6px", letterSpacing:"0.5px" }}>First day of your last period</label>
                      <input
                        type="date"
                        value={lastPeriodDate}
                        onChange={e => setLastPeriodDate(e.target.value)}
                        style={{ width:"100%", padding:"11px 14px", borderRadius:"12px", border:"1px solid rgba(168,120,210,0.25)", background:"rgba(6,10,20,0.6)", color:"#e8ecff", fontSize:"14px", fontFamily:"inherit", outline:"none", boxSizing:"border-box" }}
                      />
                    </div>
                    <div>
                      <label style={{ display:"block", color:"#a0b8ff", fontSize:"12px", fontWeight:"600", marginBottom:"6px", letterSpacing:"0.5px" }}>Average cycle length: {cycleLength} days</label>
                      <input
                        type="range"
                        min="21" max="35" value={cycleLength}
                        onChange={e => setCycleLength(Number(e.target.value))}
                        style={{ width:"100%", accentColor:"#a880d0" }}
                      />
                      <div style={{ display:"flex", justifyContent:"space-between", color:"#6b7394", fontSize:"10px", marginTop:"2px" }}>
                        <span>21 days</span><span>28 avg</span><span>35 days</span>
                      </div>
                    </div>
                    {lastPeriodDate && (() => {
                      const phase = getCyclePhase(lastPeriodDate, cycleLength);
                      if (!phase) return null;
                      return (
                        <div style={{ padding:"12px 16px", borderRadius:"12px", background:"rgba(168,120,210,0.1)", border:"1px solid rgba(168,120,210,0.2)" }}>
                          <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"4px" }}>
                            <span style={{ fontSize:"16px" }}>{phase.emoji}</span>
                            <span style={{ color:"#c8a0e8", fontSize:"14px", fontWeight:"700" }}>{phase.label}</span>
                            <span style={{ color:"#8890b8", fontSize:"11px" }}>· Day {phase.day}</span>
                          </div>
                          <div style={{ color:"#8890b8", fontSize:"12px", lineHeight:1.6 }}>{phase.desc}</div>
                        </div>
                      );
                    })()}
                  </div>
                )}
              </div>
            )}
            <div style={{ display:"flex", justifyContent:"space-between" }}>
              <button style={S.btnOutline} onClick={() => setStep(0)}>← Back</button>
              <button style={selectedGender ? S.btn : {...S.btn, opacity:0.5}} onClick={() => { if(selectedGender) { setStep(resumeStep && resumeStep > 2 ? resumeStep : 2); setResumeStep(null); } }}>Continue →</button>
            </div>
          </div>
        )}

        {/* STEP 2: CONDITIONS */}
        {step === 2 && (
          <div>
            <h2 style={S.sectionTitle}>What do you live with?</h2>
            <p style={S.sectionSub}>Select all that apply. You are not defined by these labels — they simply help us personalize your plan.</p>
            <div style={S.grid}>
              {MENTAL_CONDITIONS.map(c => (
                <div key={c.id} style={S.chip(selectedConditions.includes(c.id))} onClick={() => toggleItem(selectedConditions, setSelectedConditions, c.id)}>
                  <span style={{ fontSize:"17px" }}>{c.emoji}</span>
                  <span style={{ display:"flex", flexDirection:"column" }}>
                    <span style={c.id === "neuro_core" ? { fontSize:"11px" } : {}}>{c.label}</span>
                    {c.id === "neuro_core" && <span style={{ fontSize:"8px", fontWeight:"600", color:"#7b9fff", marginTop:"1px" }}>No Diagnosis Required</span>}
                  </span>
                </div>
              ))}
            </div>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <span style={{ color:"#999", fontSize:"13px", fontWeight:"500" }}>{selectedConditions.length > 0 ? `${selectedConditions.length} selected` : "Select at least one, or continue"}</span>
              <button style={S.btn} onClick={() => setStep(3)}>Continue →</button>
            </div>
          </div>
        )}

        {/* STEP 13: ROUTINE QUESTIONNAIRE */}
        {step === 13 && (() => {
          // Intro screen — transition from menu
          if (routineQPage === "intro") {
            return (
              <div style={{ textAlign:"center", paddingTop:"40px" }}>
                <div style={{ fontSize:"56px", marginBottom:"20px" }}>✅</div>
                <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"28px", fontWeight:"300", color:"#eef0ff", margin:"0 0 12px 0", letterSpacing:"0.5px" }}>Your 30-Day Menu Is Ready</h2>
                <p style={{ color:"#8890b8", fontSize:"14px", lineHeight:1.7, margin:"0 auto 32px auto", maxWidth:"340px" }}>
                  Your personalized meal plan has been built based on your conditions and dietary needs.
                </p>
                <p style={{ color:"#c8ccf0", fontSize:"15px", lineHeight:1.7, margin:"0 auto 36px auto", maxWidth:"340px" }}>
                  Now let's build a morning and evening routine designed specifically for your brain.
                </p>
                <button style={{ ...S.btn, width:"100%", padding:"16px", fontSize:"15px", marginBottom:"12px" }} onClick={() => setRoutineQPage("morning")}>
                  Build My Routine →
                </button>
                <button style={{ ...S.btnOutline, width:"100%", padding:"14px", fontSize:"13px" }} onClick={() => {
                  setStep(menu30 ? 12 : 4);
                }}>
                  Skip for Now
                </button>
              </div>
            );
          }

          // Preview mode — show generated routine with keep/swap
          if (routineQPage === "preview" && personalRoutine) {
            const swapStep = (period, idx) => {
              const current = personalRoutine[period];
              const currentTitles = new Set(current.map(s => s.title));
              const library = ROUTINE_STEP_LIBRARY[period];
              const alternatives = library.filter(s => !currentTitles.has(s.title));
              if (alternatives.length === 0) return;
              const alt = alternatives[Math.floor(Math.random() * alternatives.length)];
              const newSteps = [...current];
              newSteps[idx] = { time: alt.time > 0 ? `${alt.time} min` : "Habit", title: alt.title, desc: alt.desc };
              setPersonalRoutine(prev => ({ ...prev, [period]: newSteps }));
              setRoutineKept(prev => { const n = { ...prev }; delete n[`${period}-${idx}`]; return n; });
            };

            const removeStep = (period, idx) => {
              const newSteps = personalRoutine[period].filter((_, i) => i !== idx);
              setPersonalRoutine(prev => ({ ...prev, [period]: newSteps }));
              // Rebuild kept map with shifted indices
              const newKept = {};
              Object.keys(routineKept).forEach(key => {
                const [p, iStr] = key.split("-");
                const i = parseInt(iStr);
                if (p !== period) { newKept[key] = routineKept[key]; return; }
                if (i < idx) newKept[key] = routineKept[key];
                else if (i > idx) newKept[`${p}-${i - 1}`] = routineKept[key];
                // i === idx is removed
              });
              setRoutineKept(newKept);
            };

            const allMorningKept = personalRoutine.morning.length === 0 || personalRoutine.morning.every((_, i) => routineKept[`morning-${i}`]);
            const allEveningKept = personalRoutine.evening.length === 0 || personalRoutine.evening.every((_, i) => routineKept[`evening-${i}`]);
            const allKept = allMorningKept && allEveningKept && (personalRoutine.morning.length + personalRoutine.evening.length) > 0;

            const renderStep = (s, i, period, gradient) => {
              const key = `${period}-${i}`;
              const kept = !!routineKept[key];
              return (
                <div key={key} style={{ ...S.card, padding:"14px 16px", marginBottom:"10px", border: kept ? "1.5px solid rgba(80,200,120,0.3)" : undefined }}>
                  <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
                    <div style={{ width:"24px", height:"24px", borderRadius:"50%", background:gradient, color:"#fff", fontSize:"12px", fontWeight:"800", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>{i+1}</div>
                    <div style={{ flex:1 }}>
                      <div style={{ color: kept ? "#50c878" : "#eef0ff", fontSize:"14px", fontWeight:"600" }}>{s.title}</div>
                      <div style={{ color:"#8890b8", fontSize:"11px" }}>{s.time}</div>
                    </div>
                  </div>
                  <p style={{ color:"#b0b8e8", fontSize:"12px", lineHeight:1.6, margin:"8px 0 0 34px" }}>{s.desc}</p>
                  <div style={{ display:"flex", gap:"8px", marginTop:"10px", marginLeft:"34px" }}>
                    {kept ? (
                      <div style={{ color:"#50c878", fontSize:"12px", fontWeight:"700" }}>✓ Kept</div>
                    ) : (
                      <>
                        <button onClick={() => setRoutineKept(prev => ({ ...prev, [key]: true }))} style={{ padding:"6px 16px", borderRadius:"20px", border:"1.5px solid rgba(80,200,120,0.4)", background:"rgba(80,200,120,0.08)", color:"#50c878", fontSize:"12px", fontWeight:"700", cursor:"pointer" }}>Keep</button>
                        <button onClick={() => swapStep(period, i)} style={{ padding:"6px 16px", borderRadius:"20px", border:"1.5px solid rgba(224,180,96,0.4)", background:"rgba(224,180,96,0.08)", color:"#e0b460", fontSize:"12px", fontWeight:"700", cursor:"pointer" }}>Swap</button>
                        <button onClick={() => removeStep(period, i)} style={{ padding:"6px 16px", borderRadius:"20px", border:"1.5px solid rgba(224,96,96,0.3)", background:"rgba(224,96,96,0.06)", color:"#e06060", fontSize:"12px", fontWeight:"700", cursor:"pointer" }}>Remove</button>
                      </>
                    )}
                  </div>
                </div>
              );
            };

            return (
              <div>
                <h2 style={S.sectionTitle}>✨ Your Personalized Routine</h2>
                <p style={S.sectionSub}>Review each step — keep the ones you like, swap the ones you don't.</p>

                <div style={{ fontSize:"15px", color:"#eef0ff", fontWeight:"700", marginBottom:"14px" }}>☀️ Morning Routine</div>
                {personalRoutine.morning.map((s, i) => renderStep(s, i, "morning", "linear-gradient(135deg,#f0a830,#e87020)"))}

                <div style={{ marginTop:"24px", fontSize:"15px", color:"#eef0ff", fontWeight:"700", marginBottom:"14px" }}>🌙 Evening Routine</div>
                {personalRoutine.evening.map((s, i) => renderStep(s, i, "evening", "linear-gradient(135deg,#5570f0,#4060e0)"))}

                <div style={{ display:"flex", justifyContent:"space-between", marginTop:"24px" }}>
                  <button style={S.btnOutline} onClick={() => setRoutineQPage("evening")}>← Edit Answers</button>
                  <button style={allKept ? S.btn : { ...S.btn, opacity:0.4, cursor:"default" }} onClick={() => {
                    if (!allKept) return;
                    setStep(menu30 ? 12 : 4);
                  }}>{allKept ? "Lock In My Routine →" : `Keep or swap each step (${Object.keys(routineKept).length}/${personalRoutine.morning.length + personalRoutine.evening.length})`}</button>
                </div>
              </div>
            );
          }

          const questions = ROUTINE_QUESTIONS[routineQPage] || [];
          const currentPrefs = routinePrefs || { morning: {}, evening: {} };
          const periodPrefs = currentPrefs[routineQPage] || {};
          const allAnswered = questions.every(q => periodPrefs[q.id]);

          return (
            <div>
              <h2 style={S.sectionTitle}>{routineQPage === "morning" ? "☀️ Now Let's Build Your Morning Routine" : "🌙 Now Let's Build Your Evening Routine"}</h2>
              <p style={S.sectionSub}>
                {routineQPage === "morning"
                  ? "Your 30-day menu is ready. Now tell us about your mornings so we can create a routine personalized to your brain."
                  : "Almost done — tell us about your evenings so we can help you wind down the way your brain needs."
                }
              </p>

              {questions.map((q, qi) => (
                <div key={q.id} style={{ marginBottom:"24px" }}>
                  <div style={{ color:"#eef0ff", fontSize:"14px", fontWeight:"700", marginBottom:"12px" }}>{q.question}</div>
                  <div style={S.grid}>
                    {q.options.map(opt => (
                      <div
                        key={opt.id}
                        style={S.chip(periodPrefs[q.id] === opt.id)}
                        onClick={() => {
                          setRoutinePrefs(prev => ({
                            ...(prev || { morning: {}, evening: {} }),
                            [routineQPage]: {
                              ...((prev || {})[routineQPage] || {}),
                              [q.id]: opt.id,
                            }
                          }));
                        }}
                      >
                        <span style={{ fontSize:"17px" }}>{opt.emoji}</span>
                        <span>{opt.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <div style={{ display:"flex", justifyContent:"space-between", marginTop:"8px" }}>
                <button style={S.btnOutline} onClick={() => {
                  if (routineQPage === "evening") setRoutineQPage("morning");
                  else setStep(3);
                }}>← Back</button>
                {routineQPage === "morning" ? (
                  <button style={allAnswered ? S.btn : { ...S.btn, opacity:0.4, cursor:"default" }} onClick={() => {
                    if (allAnswered) setRoutineQPage("evening");
                  }}>Evening Questions →</button>
                ) : (
                  <button style={allAnswered ? S.btn : { ...S.btn, opacity:0.4, cursor:"default" }} onClick={() => {
                    if (!allAnswered) return;
                    const generated = generateRoutine(routinePrefs, selectedConditions);
                    setPersonalRoutine(generated);
                    setRoutineKept({});
                    setRoutineQPage("preview");
                  }}>Generate My Routine →</button>
                )}
              </div>
            </div>
          );
        })()}

        {/* STEP 3: DIET */}
        {step === 3 && (
          <div>
            <h2 style={S.sectionTitle}>Dietary needs & restrictions</h2>
            <p style={S.sectionSub}>Select everything that applies — your menu will be personalized to match your lifestyle and avoid anything that doesn't work for you.</p>

            <h3 style={{ color:"#a0b8ff", fontSize:"15px", fontWeight:"600", letterSpacing:"0.5px", textTransform:"uppercase", marginBottom:"12px" }}>Diet Type</h3>
            <p style={{ color:"#6b7394", fontSize:"13px", marginBottom:"14px", lineHeight:1.5 }}>Your menu will be tailored to fit these dietary styles.</p>
            <div style={S.grid}>
              {DIET_TYPES.map(d => (
                <div key={d.id} style={S.chip(selectedDiet.includes(d.id))} onClick={() => toggleItem(selectedDiet, setSelectedDiet, d.id)}>
                  <span style={{ fontSize:"17px" }}>{d.emoji}</span><span>{d.label}</span>
                </div>
              ))}
            </div>

            <div style={{ height:"24px" }} />

            <h3 style={{ color:"#a0b8ff", fontSize:"15px", fontWeight:"600", letterSpacing:"0.5px", textTransform:"uppercase", marginBottom:"12px" }}>Allergens & Restrictions</h3>
            <p style={{ color:"#6b7394", fontSize:"13px", marginBottom:"14px", lineHeight:1.5 }}>Meals containing these ingredients will be removed from your plan.</p>
            <div style={S.grid}>
              {DIETARY_RESTRICTIONS.map(d => (
                <div key={d.id} style={S.chip(selectedDiet.includes(d.id))} onClick={() => toggleItem(selectedDiet, setSelectedDiet, d.id)}>
                  <span style={{ fontSize:"17px" }}>{d.emoji}</span><span>{d.label}</span>
                </div>
              ))}
            </div>

            {selectedDiet.length > 0 && (() => {
              const dietTypeIds = new Set(DIET_TYPES.map(d => d.id));
              const selectedTypes = selectedDiet.filter(d => dietTypeIds.has(d));
              const selectedRestrictions = selectedDiet.filter(d => !dietTypeIds.has(d));
              return (
                <div style={{ ...S.warningBanner, marginBottom:"20px", marginTop:"20px" }}>
                  {selectedTypes.length > 0 && <div style={{ marginBottom: selectedRestrictions.length > 0 ? "6px" : 0 }}>✓ Diet: {selectedTypes.map(d => DIETARY.find(x=>x.id===d)?.label).join(", ")} — your menu will follow {selectedTypes.length === 1 ? "this style" : "these styles"}.</div>}
                  {selectedRestrictions.length > 0 && <div>✓ Excluded: {selectedRestrictions.map(d => DIETARY.find(x=>x.id===d)?.label).join(", ")} — meals with these ingredients will be removed.</div>}
                </div>
              );
            })()}
            {(selectedDiet.includes("halal") || selectedDiet.includes("kosher")) && (
              <div style={{ padding:"14px 18px", borderRadius:"14px", background:"rgba(107,143,255,0.05)", border:"1px solid rgba(107,143,255,0.12)", marginBottom:"20px" }}>
                <div style={{ color:"#a0b8ff", fontSize:"12px", lineHeight:1.7 }}>
                  {selectedDiet.includes("kosher") && <span>✡️ <strong>Kosher:</strong> Pork, shellfish, and meat-dairy combinations are excluded. </span>}
                  {selectedDiet.includes("halal") && <span>☪️ <strong>Halal:</strong> Pork and shellfish are excluded. </span>}
                  <span style={{ color:"#8890b8" }}>Note: Meals use standard grocery ingredients. Please source certified {selectedDiet.includes("halal") && selectedDiet.includes("kosher") ? "halal/kosher" : selectedDiet.includes("halal") ? "halal" : "kosher"} products according to your observance level.</span>
                </div>
              </div>
            )}

            <div style={S.divider} />

            <h2 style={{ ...S.sectionTitle, fontSize:"22px" }}>Daily calorie target</h2>
            <p style={S.sectionSub}>Choose the range that fits your goals. Higher targets add a second snack and heartier portions.</p>
            <div style={{ display:"flex", gap:"10px", marginBottom:"28px" }}>
              {[
                { id:"1200", label:"1,200–1,500", sub:"Lower calorie", desc:"Lighter meals, one snack" },
                { id:"1500", label:"1,500–2,000", sub:"Moderate", desc:"Balanced meals, one snack" },
                { id:"2000", label:"2,000–2,500", sub:"Higher calorie", desc:"Heartier meals, two snacks" },
              ].map(opt => (
                <button key={opt.id} onClick={() => setCalorieTarget(opt.id)} style={{ flex:1, padding:"18px 14px", borderRadius:"16px", border: calorieTarget===opt.id ? "1.5px solid #5570f0" : "1px solid rgba(107,143,255,0.1)", background: calorieTarget===opt.id ? "rgba(80,112,240,0.12)" : "rgba(255,255,255,0.02)", cursor:"pointer", textAlign:"center", transition:"all 0.2s" }}>
                  <div style={{ fontSize:"16px", fontWeight:"700", color: calorieTarget===opt.id ? "#a0b8ff" : "#7888b8", marginBottom:"4px" }}>{opt.label}</div>
                  <div style={{ fontSize:"11px", fontWeight:"600", color: calorieTarget===opt.id ? "#5570f0" : "#6b7394", letterSpacing:"0.5px", textTransform:"uppercase", marginBottom:"4px" }}>{opt.sub}</div>
                  <div style={{ fontSize:"11px", color:"#6b7394" }}>{opt.desc}</div>
                </button>
              ))}
            </div>

            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <button style={S.btnOutline} onClick={() => setStep(2)}>← Back</button>
              <button style={S.btn} onClick={buildMenu}>Build My 30-Day Menu →</button>
            </div>
          </div>
        )}

        {/* CYCLE COMPLETE MODAL */}
        {showCycleComplete && (
          <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.7)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:200, padding:"20px" }}>
            <div style={{ background:"linear-gradient(145deg,#0c1020,#111828)", borderRadius:"28px", padding:"40px 32px", maxWidth:"420px", width:"100%", textAlign:"center", border:"1px solid rgba(107,143,255,0.25)", boxShadow:"0 40px 100px rgba(0,0,0,0.4)" }}>
              <div style={{ fontSize:"56px", marginBottom:"16px" }}>🌿</div>
              <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"32px", fontWeight:"400", color:"#eef0ff", marginBottom:"12px" }}>Cycle {planCycle} Complete</h2>
              <p style={{ color:"#8890b8", fontSize:"15px", lineHeight:1.6, marginBottom:"8px" }}>You've completed 30 days of nourishing your mind and body. That's something to be genuinely proud of.</p>
              <p style={{ color:"#7b9fff", fontSize:"14px", marginBottom:"28px", fontStyle:"italic" }}>Your new Cycle {planCycle+1} menu is ready — fresh meals, same personalisation.</p>
              <div style={{ display:"flex", gap:"12px", justifyContent:"center", flexWrap:"wrap" }}>
                <button onClick={startNewCycle} style={{ background:"linear-gradient(135deg,#5570f0,#4060e0)", color:"#fff", border:"none", padding:"14px 28px", borderRadius:"50px", fontSize:"14px", fontWeight:"600", cursor:"pointer" }}>Start Cycle {planCycle+1} 🌱</button>
                <button onClick={() => setShowCycleComplete(false)} style={{ background:"transparent", color:"#8890b8", border:"1px solid rgba(110,120,200,0.3)", padding:"14px 24px", borderRadius:"50px", fontSize:"14px", cursor:"pointer" }}>Stay on This Menu</button>
              </div>
            </div>
          </div>
        )}

        {/* PAYWALL GATE: show if step >= 4 and not premium (skip step 13 — onboarding) */}
        {step >= 4 && step !== 13 && !isPremium && (
          <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", minHeight:"60vh", textAlign:"center", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
            <div style={{ fontSize:"52px", marginBottom:"16px" }}>🧠</div>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"36px", fontWeight:"300", color:"#eef0ff", margin:"0 0 10px 0", letterSpacing:"1px" }}>Unlock NeuroThrive Premium</h2>
            <p style={{ color:"#8890b8", fontSize:"15px", maxWidth:"400px", lineHeight:1.7, margin:"0 0 32px 0" }}>Your personalized plan is ready — subscribe to unlock your 30-day menu, journal, routines, supplements, and reminders.</p>
            <div style={{ display:"flex", flexDirection:"column", gap:"14px", width:"100%", maxWidth:"380px" }}>
              <button onClick={() => startCheckout("annual")} style={{ background:"linear-gradient(135deg,#5570f0,#6b8fff)", border:"none", borderRadius:"14px", padding:"18px 24px", color:"#fff", fontSize:"16px", fontWeight:"600", cursor:"pointer", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
                {checkoutLoading === "annual" ? "Loading..." : "Get Annual — $59.99/yr (save 50%)"}
              </button>
              <button onClick={() => startCheckout("monthly")} style={{ background:"rgba(107,143,255,0.1)", border:"1px solid rgba(107,143,255,0.3)", borderRadius:"14px", padding:"16px 24px", color:"#c8d0ff", fontSize:"15px", fontWeight:"500", cursor:"pointer", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
                {checkoutLoading === "monthly" ? "Loading..." : "Monthly — $9.99/mo"}
              </button>
            </div>
            <button onClick={() => setStep(3)} style={{ marginTop:"24px", color:"#8890b8", background:"none", border:"none", fontSize:"13px", cursor:"pointer", textDecoration:"underline", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>← Go back</button>
          </div>
        )}

        {/* FEATURE TOUR OVERLAY */}
        {showTour && (
          <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.75)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:300, padding:"20px", backdropFilter:"blur(6px)" }}>
            <div style={{ background:"linear-gradient(145deg,#0c1020,#111828)", borderRadius:"28px", padding:"40px 32px", maxWidth:"440px", width:"100%", textAlign:"center", border:"1px solid rgba(107,143,255,0.25)", boxShadow:"0 40px 100px rgba(0,0,0,0.5)", animation:"fadeUp 0.3s ease" }}>
              <div style={{ fontSize:"56px", marginBottom:"16px" }}>{TOUR_SLIDES[tourStep].emoji}</div>
              <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"28px", fontWeight:"400", color:"#eef0ff", marginBottom:"12px", letterSpacing:"0.5px" }}>{TOUR_SLIDES[tourStep].title}</h2>
              <p style={{ color:"#8890b8", fontSize:"15px", lineHeight:1.7, marginBottom:"28px", maxWidth:"360px", marginLeft:"auto", marginRight:"auto" }}>{TOUR_SLIDES[tourStep].desc}</p>
              {/* Dots */}
              <div style={{ display:"flex", justifyContent:"center", gap:"6px", marginBottom:"24px" }}>
                {TOUR_SLIDES.map((_, i) => (
                  <div key={i} style={{ width: i === tourStep ? "20px" : "6px", height:"6px", borderRadius:"3px", background: i === tourStep ? "#5570f0" : "rgba(107,143,255,0.2)", transition:"all 0.3s", cursor:"pointer" }} onClick={() => setTourStep(i)} />
                ))}
              </div>
              <div style={{ display:"flex", gap:"12px", justifyContent:"center" }}>
                {tourStep > 0 && (
                  <button onClick={() => setTourStep(t => t - 1)} style={{ background:"transparent", color:"#8890b8", border:"1px solid rgba(110,120,200,0.3)", padding:"12px 24px", borderRadius:"50px", fontSize:"14px", fontWeight:"500", cursor:"pointer" }}>← Back</button>
                )}
                {tourStep < TOUR_SLIDES.length - 1 ? (
                  <button onClick={() => setTourStep(t => t + 1)} style={{ background:"linear-gradient(135deg,#5570f0,#4060e0)", color:"#fff", border:"none", padding:"12px 28px", borderRadius:"50px", fontSize:"14px", fontWeight:"600", cursor:"pointer" }}>Next →</button>
                ) : (
                  <button onClick={finishTour} style={{ background:"linear-gradient(135deg,#50c878,#40a868)", color:"#fff", border:"none", padding:"12px 28px", borderRadius:"50px", fontSize:"14px", fontWeight:"600", cursor:"pointer" }}>Let's Go! 🚀</button>
                )}
              </div>
              {tourStep < TOUR_SLIDES.length - 1 && (
                <button onClick={finishTour} style={{ marginTop:"16px", background:"none", border:"none", color:"#6b7394", fontSize:"12px", cursor:"pointer", textDecoration:"underline" }}>Skip tour</button>
              )}
            </div>
          </div>
        )}

        {/* STEP 4: 30-DAY MENU */}
        {step === 4 && menu30 && isPremium && (
          <div>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"6px", flexWrap:"wrap", gap:"10px" }}>
              <div>
                <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"6px" }}>
                  <h2 style={{ ...S.sectionTitle, marginBottom:"0" }}>Your 30-Day Menu</h2>
                  <span style={{ background:"rgba(107,143,255,0.15)", border:"1px solid rgba(107,143,255,0.3)", color:"#7b9fff", fontSize:"11px", fontWeight:"600", letterSpacing:"1.5px", padding:"4px 12px", borderRadius:"20px", textTransform:"uppercase" }}>Cycle {planCycle}</span>
                </div>
                <p style={S.sectionSub}>Tap any meal to see why each ingredient is on your plan, or get the recipe.</p>
              </div>
              <button style={S.btnOutline} onClick={startNewCycle}>↺ New Cycle</button>
            </div>

            {cycleStartDate && (
              <div style={{ ...S.card, marginBottom:"14px", padding:"14px 18px" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"8px" }}>
                  <span style={{ fontSize:"12px", color:"#8890b8", fontWeight:"500" }}>Started {new Date(cycleStartDate).toLocaleDateString("en-US", { month:"short", day:"numeric", year:"numeric" })}</span>
                  <span style={{ fontSize:"12px", color:"#7b9fff", fontWeight:"600" }}>Day {daysElapsed} of 30</span>
                </div>
                <div style={{ height:"6px", background:"rgba(110,120,200,0.15)", borderRadius:"10px", overflow:"hidden" }}>
                  <div style={{ height:"100%", width:`${(daysElapsed/30)*100}%`, background:"linear-gradient(90deg,#5570f0,#9db5ff)", borderRadius:"10px", transition:"width 0.5s ease" }} />
                </div>
                <div style={{ marginTop:"8px", fontSize:"11px", color:"#8890b8" }}>
                  {30-daysElapsed > 0 ? `${30-daysElapsed} days remaining` : "🌿 Cycle complete! Start your next 30 days whenever you're ready."}
                </div>
              </div>
            )}

            {selectedConditions.length > 0 && (
              <div style={{ ...S.card, marginBottom:"18px" }}>
                <div style={S.mealLabel}>Optimised for</div>
                {(CONDITION_FOCUS[selectedConditions[0]] || CONDITION_FOCUS.default).map(f => <span key={f} style={S.tag}>{f}</span>)}
              </div>
            )}

            {selectedDiet.length > 0 && (
              <div style={{ marginBottom:"18px" }}>
                <div style={{ fontSize:"11px", fontWeight:"700", color:"#8890b8", letterSpacing:"1px", textTransform:"uppercase", marginBottom:"8px" }}>Active filters</div>
                {selectedDiet.map(d => { const item = DIETARY.find(x=>x.id===d); return <span key={d} style={S.tag}>{item?.emoji} {item?.label}</span>; })}
              </div>
            )}

            {/* Week tabs */}
            <div style={{ display:"flex", gap:"8px", marginBottom:"14px" }}>
              {WEEKS.map((w,i) => (
                <button key={w} onClick={() => { setSelectedWeek(i); setSelectedDayIdx(0); }} style={{ flex:1, padding:"10px 4px", borderRadius:"12px", border:selectedWeek===i?"2px solid #5570f0":"1px solid rgba(110,120,200,0.18)", background:selectedWeek===i?"#5570f0":"rgba(240,244,255,0.04)", color:selectedWeek===i?"#fff":"#8890b8", fontSize:"12px", fontWeight:"700", cursor:"pointer", transition:"all 0.15s" }}>{w}</button>
              ))}
            </div>

            {/* Day tabs */}
            <div style={{ display:"flex", gap:"6px", marginBottom:"20px" }}>
              {weekDays.map((d,i) => {
                const dayGlobalIdx = selectedWeek * 7 + i;
                return (
                  <button key={d.day} onClick={() => setSelectedDayIdx(i)} style={{ flex:1, padding:"10px 4px", borderRadius:"12px", border:selectedDayIdx===i?"2px solid #7b9fff":"1px solid rgba(110,120,200,0.14)", background:selectedDayIdx===i?"rgba(107,143,255,0.12)":"rgba(240,244,255,0.04)", color:selectedDayIdx===i?"#9db5ff":"#8890b8", fontSize:"11px", fontWeight:selectedDayIdx===i?"700":"500", cursor:"pointer", transition:"all 0.15s", textAlign:"center" }}>
                    <div>{formatPlanDate(dayGlobalIdx, "weekday") || DAY_NAMES[i]}</div>
                    <div style={{ fontSize:"9px", marginTop:"2px", opacity:0.7 }}>{formatPlanDate(dayGlobalIdx, "short") || `Day ${d.day}`}</div>
                  </button>
                );
              })}
            </div>

            {currentDay && (
              <>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"16px" }}>
                  <div style={{ fontSize:"17px", color:"#eef0ff", fontWeight:"700", letterSpacing:"-0.3px" }}>Day {currentDay.day} <span style={{ color:"#8890b8", fontWeight:"400" }}>— {formatPlanDate(globalDayIdx) || DAY_NAMES[selectedDayIdx]}</span></div>
                  <div style={{ display:"flex", gap:"8px" }}>
                    <button style={S.btnSm} onClick={() => { const prev=globalDayIdx-1; if(prev>=0){setSelectedWeek(Math.floor(prev/7));setSelectedDayIdx(prev%7);} }}>← Prev</button>
                    <button style={S.btnSm} onClick={() => { const next=globalDayIdx+1; if(next<30){setSelectedWeek(Math.floor(next/7));setSelectedDayIdx(next%7);} }}>Next →</button>
                  </div>
                </div>

                <ProgressBanner context="menu" />

                <div style={{ color:"#8890b8", fontSize:"11px", marginBottom:"14px", padding:"0 4px", lineHeight:1.6 }}>
                  Tap the <span style={{ color:"#50c878", fontWeight:"700" }}>checkbox</span> next to each meal when you eat it. This logs what you ate and tracks your daily progress.
                </div>

                {[
                  { key:"breakfast", label:"🌅 Breakfast" },
                  { key:"lunch",     label:"☀️ Lunch" },
                  { key:"dinner",    label:"🌙 Dinner" },
                  { key:"snacks",    label:"🍎 Snack" },
                  ...(currentDay.snacks2 ? [{ key:"snacks2", label:"🍊 Snack 2" }] : []),
                ].map(({ key, label }) => {
                  const mainMeal = currentDay[key];
                  const altKey = `${globalDayIdx}_${key}`;
                  const alt = altMeal[altKey];
                  const todayChecks = getTodayChecks();
                  const mealChecked = todayChecks.meals[key];
                  const loggedMeal = todayChecks.foodLog?.[key];
                  const ateAlt = mealChecked && loggedMeal && loggedMeal !== mainMeal;
                  return (
                    <div key={key} style={S.card}>
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"10px" }}>
                        <div style={S.mealLabel}>{label}</div>
                        {mealChecked && <span style={{ color:"#50c878", fontSize:"10px", fontWeight:"600" }}>Logged: {loggedMeal ? (loggedMeal.length > 30 ? loggedMeal.slice(0,30) + "..." : loggedMeal) : mainMeal}</span>}
                      </div>

                      {/* Main meal */}
                      <div style={{ display:"flex", alignItems:"flex-start", gap:"10px", marginBottom:"10px" }}>
                        <button onClick={() => toggleMealCheck(key, mainMeal)} style={{ width:"24px", height:"24px", borderRadius:"7px", border: (mealChecked && !ateAlt) ? "2px solid #50c878" : "1.5px solid rgba(110,120,200,0.25)", background: (mealChecked && !ateAlt) ? "rgba(80,200,120,0.15)" : "transparent", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", transition:"all 0.2s", padding:0, flexShrink:0, marginTop:"2px" }}>
                          {(mealChecked && !ateAlt) && <span style={{ color:"#50c878", fontSize:"14px", fontWeight:"800", lineHeight:1 }}>✓</span>}
                        </button>
                        <span style={{ flex:1, color: (mealChecked && !ateAlt) ? "#50c878" : "#eef0ff", fontSize:"15px", fontWeight:"600", lineHeight:1.5, textDecoration: (mealChecked && !ateAlt) ? "line-through" : "none", opacity: (mealChecked && !ateAlt) ? 0.7 : 1 }}>{mainMeal}</span>
                      </div>
                      <div style={{ display:"flex", flexWrap:"wrap", alignItems:"center", gap:"6px", marginBottom:"12px" }}>
                        <div style={{ display:"inline-flex", alignItems:"center", gap:"5px", padding:"4px 10px", borderRadius:"20px", background:"rgba(107,143,255,0.1)", border:"1px solid rgba(107,143,255,0.2)" }}>
                          <span style={{ fontSize:"12px" }}>🔥</span>
                          <span style={{ color:"#7b9fff", fontSize:"11px", fontWeight:"700", letterSpacing:"0.5px" }}>{estimateCalories(mainMeal)}</span>
                        </div>
                        {(() => { const bs = getBrainScore(mainMeal); return (
                          <>
                            <div style={{ display:"inline-flex", alignItems:"center", gap:"3px", padding:"4px 10px", borderRadius:"20px", background: bs.score >= 4 ? "rgba(80,200,120,0.1)" : bs.score >= 3 ? "rgba(107,143,255,0.08)" : "rgba(255,255,255,0.04)", border: bs.score >= 4 ? "1px solid rgba(80,200,120,0.25)" : "1px solid rgba(107,143,255,0.15)" }}>
                              <span style={{ fontSize:"12px" }}>🧠</span>
                              <span style={{ color: bs.score >= 4 ? "#50c878" : bs.score >= 3 ? "#7b9fff" : "#6b7394", fontSize:"11px", fontWeight:"700" }}>{"⚡".repeat(bs.score)}</span>
                            </div>
                            {bs.nutrients.length > 0 && bs.nutrients.map((n,i) => (
                              <span key={i} style={{ padding:"3px 8px", borderRadius:"12px", background:"rgba(107,143,255,0.06)", border:"1px solid rgba(107,143,255,0.1)", color:"#8890b8", fontSize:"10px", fontWeight:"600" }}>{n}</span>
                            ))}
                          </>
                        );})()}
                      </div>

                      {/* Gender-specific phase/note pill */}
                      {(() => { const gn = getGenderNote(mainMeal, selectedGender, cycleSyncEnabled, lastPeriodDate, cycleLength, getPlanDate(globalDayIdx)); if (!gn) return null; return (
                        <div style={{ display:"inline-flex", alignItems:"center", gap:"4px", padding:"4px 10px", borderRadius:"20px", background: gn.phase ? "rgba(168,120,210,0.1)" : "rgba(80,160,220,0.08)", border: gn.phase ? "1px solid rgba(168,120,210,0.2)" : "1px solid rgba(80,160,220,0.15)", marginBottom:"12px" }}>
                          <span style={{ fontSize:"11px" }}>{gn.phase ? gn.phase.emoji : "♂️"}</span>
                          <span style={{ color: gn.phase ? "#c8a0e8" : "#50a0dc", fontSize:"10px", fontWeight:"600" }}>{gn.phase ? gn.phase.label : "Men's Health"}</span>
                        </div>
                      );})()}

                      {/* Main meal buttons */}
                      <div style={{ display:"flex", gap:"7px", flexWrap:"wrap", marginBottom: alt ? "12px" : "0" }}>
                        <button
                          style={{ flex:1, padding:"9px 10px", borderRadius:"10px", border:"1px solid rgba(110,120,200,0.2)", background:"rgba(110,120,200,0.07)", color:"#9db5ff", fontSize:"12px", fontWeight:"600", cursor:"pointer", transition:"all 0.15s" }}
                          onClick={() => openExplain(mainMeal, label, globalDayIdx)}
                        >🧠 Why this?</button>
                        <button
                          style={{ flex:1, padding:"9px 10px", borderRadius:"10px", border:"1.5px solid rgba(80,112,240,0.3)", background:"rgba(80,112,240,0.07)", color:"#7b9fff", fontSize:"12px", fontWeight:"600", cursor:"pointer", transition:"all 0.15s" }}
                          onClick={() => openRecipe(mainMeal, label, globalDayIdx)}
                        >🍳 Recipe</button>
                        <button
                          style={{ flex:1, padding:"9px 10px", borderRadius:"10px", border:"1.5px solid rgba(110,120,200,0.25)", background:"rgba(110,120,200,0.06)", color:"#e8c87a", fontSize:"12px", fontWeight:"600", cursor:"pointer", transition:"all 0.15s" }}
                          onClick={() => getAltMeal(mainMeal, label, key)}
                        >✨ Swap</button>
                      </div>

                      {/* Alternative meal (only shown after swap) */}
                      {alt && (
                        <div style={{ marginTop:"4px", padding:"12px 14px", borderRadius:"12px", background:"rgba(80,112,240,0.06)", border:"1px solid rgba(80,112,240,0.18)" }}>
                          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"6px" }}>
                            <div style={{ color:"#7b9fff", fontSize:"10px", fontWeight:"700", letterSpacing:"1.5px", textTransform:"uppercase" }}>Alternative</div>
                          </div>
                          <div style={{ display:"flex", alignItems:"flex-start", gap:"10px", marginBottom:"8px" }}>
                            <button onClick={() => toggleMealCheck(key, alt)} style={{ width:"22px", height:"22px", borderRadius:"6px", border: ateAlt ? "2px solid #50c878" : "1.5px solid rgba(110,120,200,0.25)", background: ateAlt ? "rgba(80,200,120,0.15)" : "transparent", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", transition:"all 0.2s", padding:0, flexShrink:0, marginTop:"1px" }}>
                              {ateAlt && <span style={{ color:"#50c878", fontSize:"12px", fontWeight:"800", lineHeight:1 }}>✓</span>}
                            </button>
                            <span style={{ color: ateAlt ? "#50c878" : "#eef0ff", fontSize:"14px", fontWeight:"600", lineHeight:1.4, textDecoration: ateAlt ? "line-through" : "none", opacity: ateAlt ? 0.7 : 1 }}>{alt}</span>
                          </div>
                          <div style={{ display:"flex", flexWrap:"wrap", alignItems:"center", gap:"5px", marginBottom:"10px" }}>
                            <div style={{ display:"inline-flex", alignItems:"center", gap:"5px", padding:"3px 9px", borderRadius:"20px", background:"rgba(107,143,255,0.1)", border:"1px solid rgba(107,143,255,0.2)" }}>
                              <span style={{ fontSize:"11px" }}>🔥</span>
                              <span style={{ color:"#7b9fff", fontSize:"10px", fontWeight:"700" }}>{estimateCalories(alt)}</span>
                            </div>
                            {(() => { const bs = getBrainScore(alt); return (
                              <div style={{ display:"inline-flex", alignItems:"center", gap:"3px", padding:"3px 9px", borderRadius:"20px", background: bs.score >= 4 ? "rgba(80,200,120,0.1)" : "rgba(107,143,255,0.08)", border: bs.score >= 4 ? "1px solid rgba(80,200,120,0.25)" : "1px solid rgba(107,143,255,0.15)" }}>
                                <span style={{ fontSize:"11px" }}>🧠</span>
                                <span style={{ color: bs.score >= 4 ? "#50c878" : "#7b9fff", fontSize:"10px", fontWeight:"700" }}>{"⚡".repeat(bs.score)}</span>
                              </div>
                            );})()}
                          </div>
                          <div style={{ display:"flex", gap:"7px", flexWrap:"wrap" }}>
                            <button
                              style={{ flex:1, padding:"8px 10px", borderRadius:"9px", border:"1px solid rgba(110,120,200,0.2)", background:"rgba(110,120,200,0.07)", color:"#9db5ff", fontSize:"11px", fontWeight:"600", cursor:"pointer" }}
                              onClick={() => openExplain(alt, label, globalDayIdx)}
                            >🧠 Why this?</button>
                            <button
                              style={{ flex:1, padding:"8px 10px", borderRadius:"9px", border:"1.5px solid rgba(80,112,240,0.3)", background:"rgba(80,112,240,0.07)", color:"#7b9fff", fontSize:"11px", fontWeight:"600", cursor:"pointer" }}
                              onClick={() => openRecipe(alt, label, globalDayIdx)}
                            >🍳 Recipe</button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </>
            )}

            {/* Week at a glance */}
            <details style={{ marginTop:"8px", marginBottom:"20px" }}>
              <summary style={{ color:"#8890b8", cursor:"pointer", fontSize:"13px", fontWeight:"600", listStyle:"none", display:"flex", alignItems:"center", gap:"6px", padding:"8px 0" }}>
                <span style={{ color:"#7b9fff" }}>▸</span> View full week at a glance
              </summary>
              <div style={{ marginTop:"12px", display:"grid", gap:"8px" }}>
                {weekDays.map((day,i) => (
                  <div key={day.day} onClick={() => setSelectedDayIdx(i)} style={{ padding:"14px 16px", borderRadius:"14px", background:selectedDayIdx===i?"rgba(80,112,240,0.1)":"rgba(240,244,255,0.04)", border:selectedDayIdx===i?"1px solid rgba(107,143,255,0.35)":"1px solid rgba(110,120,200,0.12)", cursor:"pointer", transition:"all 0.15s" }}>
                    <div style={{ color:"#7b9fff", fontSize:"10px", letterSpacing:"1.5px", textTransform:"uppercase", fontWeight:"700", marginBottom:"6px" }}>Day {day.day} — {formatPlanDate(selectedWeek * 7 + i) || DAY_NAMES[i]}</div>
                    <div style={{ color:"#7a90f0", fontSize:"12px", lineHeight:1.8 }}>🌅 {day.breakfast}<br/>☀️ {day.lunch}<br/>🌙 {day.dinner}<br/>🍎 {day.snacks}{day.snacks2 && <><br/>🍊 {day.snacks2}</>}</div>
                  </div>
                ))}
              </div>
            </details>

            <details style={{ marginBottom:"24px" }}>
              <summary style={{ color:"#8890b8", cursor:"pointer", fontSize:"13px", fontWeight:"600", listStyle:"none", display:"flex", alignItems:"center", gap:"6px", padding:"8px 0" }}>
                <span style={{ color:"#7b9fff" }}>▸</span> View all 30 days
              </summary>
              <div style={{ marginTop:"12px", display:"grid", gap:"6px" }}>
                {menu30.map((day,i) => (
                  <div key={day.day} onClick={() => { setSelectedWeek(Math.floor(i/7)); setSelectedDayIdx(i%7); }} style={{ padding:"10px 14px", borderRadius:"12px", background:"rgba(240,244,255,0.04)", border:"1px solid rgba(110,120,200,0.12)", cursor:"pointer", transition:"all 0.15s" }}>
                    <div style={{ color:"#7b9fff", fontSize:"10px", fontWeight:"700", marginBottom:"3px" }}>Day {day.day} {formatPlanDate(i, "short") && <span style={{ color:"#8890b8", fontWeight:"500" }}>— {formatPlanDate(i, "short")}</span>}</div>
                    <div style={{ color:"#8890b8", fontSize:"11px", lineHeight:1.6 }}>🌅 {day.breakfast} · ☀️ {day.lunch} · 🌙 {day.dinner}</div>
                  </div>
                ))}
              </div>
            </details>

            <div style={{ display:"flex", gap:"12px", justifyContent:"flex-end" }}>
              <button style={S.btnOutline} onClick={() => setStep(2)}>← Adjust Filters</button>
              <button style={S.btnAccent} onClick={() => setStep(8)}>Log Today's Mood →</button>
            </div>
            <p style={{ color:"#5a6080", fontSize:"10px", textAlign:"center", marginTop:"20px", lineHeight:1.6 }}>Always verify ingredients if you have severe allergies. Dietary filters remove tagged items but cannot guarantee every ingredient in a recipe.</p>
          </div>
        )}

        {/* STEP 4: JOURNAL */}
        {step === 8 && isPremium && (
          <div>
            <h2 style={S.sectionTitle}>Daily Wellness Log</h2>
            <p style={S.sectionSub}>Track how your body and mind feel. Over time, patterns emerge — and patterns become power.</p>
            <ProgressBanner context="journal" />
            {logSaved && <div style={S.successBanner}>✓ Today's log saved! Every entry matters.</div>}
            {moodInsight && (
              <div style={{ padding:"18px", borderRadius:"16px", background:"rgba(107,143,255,0.06)", border:"1px solid rgba(107,143,255,0.18)", marginBottom:"16px" }}>
                <div style={{ fontSize:"13px", fontWeight:"700", color:"#a0b8ff", marginBottom:"8px" }}>🧠 What Your Brain Needs Right Now</div>
                <p style={{ color:"#c8ccf0", fontSize:"13px", lineHeight:1.7, margin:0 }}>{moodInsight}</p>
                <button onClick={() => setMoodInsight(null)} style={{ marginTop:"10px", padding:"6px 14px", borderRadius:"20px", border:"1px solid rgba(107,143,255,0.2)", background:"transparent", color:"#7b9fff", fontSize:"11px", fontWeight:"600", cursor:"pointer" }}>Dismiss</button>
              </div>
            )}
            <div style={S.card}>
              <div style={S.mealLabel}>How's your mood today?</div>
              <div style={S.moodRow}>
                {MOOD_EMOJIS.map(mood => (
                  <button key={mood.val} style={S.moodBtn(todayMood===mood.val)} onClick={() => setTodayMood(mood.val)}>
                    <div style={{ fontSize:"26px" }}>{mood.emoji}</div>
                    <div style={{ fontSize:"10px", marginTop:"3px" }}>{mood.label}</div>
                  </button>
                ))}
              </div>
              <div style={S.mealLabel}>Energy level?</div>
              <div style={S.moodRow}>
                {ENERGY_EMOJIS.map(energy => (
                  <button key={energy.val} style={S.moodBtn(todayEnergy===energy.val)} onClick={() => setTodayEnergy(energy.val)}>
                    <div style={{ fontSize:"26px" }}>{energy.emoji}</div>
                    <div style={{ fontSize:"10px", marginTop:"3px" }}>{energy.label}</div>
                  </button>
                ))}
              </div>
              <div style={S.mealLabel}>Notes (optional)</div>
              <textarea style={S.textarea} placeholder="How did eating feel today? Any changes you noticed? Be kind to yourself..." value={todayNote} onChange={evt => setTodayNote(evt.target.value)} />
              <button
                style={{ background:(todayMood && todayEnergy)?"linear-gradient(135deg,#5570f0,#4060e0)":"rgba(110,120,200,0.15)", color:(todayMood && todayEnergy)?"#fff":"#8890b8", border:"none", padding:"14px", borderRadius:"50px", fontSize:"14px", fontWeight:"700", cursor:(todayMood && todayEnergy)?"pointer":"default", width:"100%", transition:"all 0.2s" }}
                onClick={saveLog}
              >{(todayMood && todayEnergy) ? "Save Today's Log ✓" : "Select mood & energy to save"}</button>
            </div>
            {logs.length > 0 && (
              <>
                <div style={S.divider} />
                <div style={S.mealLabel}>Past entries</div>
                {logs.map((log, idx) => (
                  <div key={idx} style={{ padding:"16px 18px", borderRadius:"14px", background:"rgba(240,244,255,0.05)", border:"1px solid rgba(110,120,200,0.14)", marginBottom:"10px" }}>
                    <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"6px" }}>
                      <span style={{ color:"#7b9fff", fontSize:"13px", fontWeight:"700" }}>{log.date}</span>
                      <span style={{ fontSize:"13px", color:"#8890b8" }}>{MOOD_EMOJIS.find(m=>m.val===log.mood)?.emoji} · {ENERGY_EMOJIS.find(e=>e.val===log.energy)?.emoji}</span>
                    </div>
                    {log.note && <p style={{ color:"#a0a8e8", fontSize:"13px", margin:0, lineHeight:1.5 }}>{log.note}</p>}
                  </div>
                ))}
              </>
            )}
            <div style={{ display:"flex", justifyContent:"space-between", marginTop:"18px" }}>
              <button style={S.btnOutline} onClick={() => setStep(4)}>← Menu</button>
              <button style={S.btn} onClick={() => setStep(10)}>Routine →</button>
            </div>
            {logs.length > 0 && (
              <div style={{ textAlign:"center", marginTop:"12px" }}>
                <button style={{ ...S.btnOutline, fontSize:"13px", padding:"10px 22px" }} onClick={() => setStep(11)}>📊 View Progress Dashboard →</button>
              </div>
            )}
          </div>
        )}

        {/* STEP 5: Redirect to Reminders (affirmations merged) */}
        {step === 5 && isPremium && (() => { setStep(7); return null; })()}

        {/* STEP 6: SUPPLEMENTS */}
        {step === 6 && isPremium && (
          <div>
            <h2 style={S.sectionTitle}>Supplements</h2>
            <p style={S.sectionSub}>Evidence-based supplements matched to your conditions. Always consult your doctor before starting anything new.</p>
            <div style={{ background:"rgba(200,190,160,0.08)", border:"1px solid rgba(200,190,160,0.2)", borderRadius:"14px", padding:"14px 18px", marginBottom:"24px" }}>
              <div style={{ fontSize:"11px", textTransform:"uppercase", letterSpacing:"2px", color:"#8890b8", fontWeight:"600", marginBottom:"6px" }}>⚕️ Educational Information Only</div>
              <p style={{ color:"#8890b8", fontSize:"13px", lineHeight:1.7, margin:"0 0 10px 0" }}>The supplements below are provided for <strong style={{color:"#c8ccf0"}}>educational and informational purposes only</strong>. This is not medical advice and is not intended to diagnose, treat, cure, or prevent any condition.</p>
              <p style={{ color:"#8890b8", fontSize:"13px", lineHeight:1.7, margin:0 }}>Dosing, safety, and interactions vary significantly by individual health status and medications. <strong style={{color:"#c8ccf0"}}>Always consult a qualified healthcare provider</strong> — such as your doctor, psychiatrist, or registered dietitian — before starting, stopping, or changing any supplement.</p>
            </div>
            {(() => {
              // Gather supplements for ALL selected conditions, deduplicated by name
              const allSupps = [];
              const seenNames = new Set();
              const condKeys = selectedConditions.length > 0
                ? selectedConditions.map(id => SUPPLEMENT_CONDITION_MAP[id] || "default")
                : ["default"];
              // Use a Set to avoid pulling the same supplement key twice
              const seenKeys = new Set();
              condKeys.forEach(key => {
                if (seenKeys.has(key)) return;
                seenKeys.add(key);
                const supps = SUPPLEMENTS[key] || SUPPLEMENTS.default;
                supps.forEach(s => {
                  if (!seenNames.has(s.name)) {
                    seenNames.add(s.name);
                    // Tag which condition(s) this supplement is for
                    const forConditions = selectedConditions
                      .filter(id => (SUPPLEMENT_CONDITION_MAP[id] || "default") === key)
                      .map(id => MENTAL_CONDITIONS.find(c => c.id === id)?.label)
                      .filter(Boolean);
                    allSupps.push({ ...s, forConditions });
                  }
                });
              });

              const condLabels = selectedConditions
                .map(id => MENTAL_CONDITIONS.find(c => c.id === id)?.label)
                .filter(Boolean);

              return (
                <div>
                  {condLabels.length > 0 && (
                    <div style={{ ...S.card, marginBottom:"20px", padding:"12px 18px" }}>
                      <span style={{ fontSize:"11px", color:"#8890b8", textTransform:"uppercase", letterSpacing:"2px" }}>Personalized for: </span>
                      <span style={{ color:"#7b9fff", fontWeight:"600", fontSize:"13px" }}>{condLabels.join(" · ")}</span>
                    </div>
                  )}
                  {allSupps.map((s, i) => (
                    <details key={i} style={{ ...S.card, marginBottom:"12px", padding:"0", overflow:"hidden" }}>
                      <summary style={{ padding:"18px 20px", cursor:"pointer", display:"flex", alignItems:"center", gap:"14px", listStyle:"none" }}>
                        <span style={{ fontSize:"26px", flexShrink:0 }}>{s.emoji}</span>
                        <div style={{ flex:1 }}>
                          <div style={{ color:"#eef0ff", fontSize:"15px", fontWeight:"500", marginBottom:"3px" }}>{s.name}</div>
                          {s.dose && <div style={{ color:"#7b9fff", fontSize:"12px", fontWeight:"500" }}>{s.dose}</div>}
                          {s.forConditions && s.forConditions.length > 0 && selectedConditions.length > 1 && (
                            <div style={{ marginTop:"5px", display:"flex", gap:"5px", flexWrap:"wrap" }}>
                              {s.forConditions.map(label => (
                                <span key={label} style={{ fontSize:"10px", fontWeight:"600", padding:"2px 8px", borderRadius:"10px", background:"rgba(107,143,255,0.15)", color:"#7b9fff", letterSpacing:"0.5px" }}>{label}</span>
                              ))}
                            </div>
                          )}
                        </div>
                        <span style={{ color:"#8890b8", fontSize:"18px", flexShrink:0 }}>+</span>
                      </summary>
                      <div style={{ padding:"0 20px 20px 20px", borderTop:"1px solid rgba(110,120,200,0.12)", paddingTop:"16px" }}>
                        {s.why && (
                          <div style={{ marginBottom:"16px", padding:"14px 16px", borderRadius:"14px", background:"linear-gradient(135deg, rgba(85,112,240,0.1), rgba(107,143,255,0.06))", border:"1px solid rgba(107,143,255,0.2)" }}>
                            <div style={{ fontSize:"10px", color:"#7b9fff", textTransform:"uppercase", letterSpacing:"2px", fontWeight:"700", marginBottom:"8px" }}>💙 Why This Helps You</div>
                            <p style={{ color:"#c8ccf0", fontSize:"13px", lineHeight:1.8, margin:0 }}>{s.why}</p>
                          </div>
                        )}
                        <div style={{ marginBottom:"12px" }}>
                          <div style={{ fontSize:"10px", color:"#7b9fff", textTransform:"uppercase", letterSpacing:"2px", fontWeight:"600", marginBottom:"6px" }}>🔬 The Science</div>
                          <p style={{ color:"#c8ccf0", fontSize:"13px", lineHeight:1.75, margin:0 }}>{s.science}</p>
                        </div>
                        <div style={{ display:"flex", gap:"12px", flexWrap:"wrap", marginBottom:"12px" }}>
                          <div style={{ flex:1, minWidth:"140px", padding:"10px 14px", borderRadius:"10px", background:"rgba(107,143,255,0.07)", border:"1px solid rgba(107,143,255,0.15)" }}>
                            <div style={{ fontSize:"10px", color:"#7b9fff", textTransform:"uppercase", letterSpacing:"1.5px", marginBottom:"4px" }}>⏰ When to Take</div>
                            <div style={{ color:"#c8ccf0", fontSize:"12px", lineHeight:1.6 }}>{s.timing}</div>
                          </div>
                          <div style={{ flex:1, minWidth:"140px", padding:"10px 14px", borderRadius:"10px", background:"rgba(200,160,100,0.06)", border:"1px solid rgba(200,160,100,0.15)" }}>
                            <div style={{ fontSize:"10px", color:"#e8c87a", textTransform:"uppercase", letterSpacing:"1.5px", marginBottom:"4px" }}>⚠️ Caution</div>
                            <div style={{ color:"#c8ccf0", fontSize:"12px", lineHeight:1.6 }}>{s.caution}</div>
                          </div>
                        </div>
                        {s.link && <a href={s.link} target="_blank" rel="noopener noreferrer" style={{ fontSize:"11px", color:"#7b9fff", textDecoration:"none", borderBottom:"1px solid rgba(107,143,255,0.3)" }}>📄 View Research →</a>}
                      </div>
                    </details>
                  ))}
                </div>
              );
            })()}
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:"24px", flexWrap:"wrap", gap:"12px" }}>
              <button style={S.btnOutline} onClick={() => setStep(10)}>← Routine</button>
              <button style={S.btnAccent} onClick={() => setStep(7)}>Set Meal Reminders →</button>
            </div>
          </div>
        )}

        {/* STEP 7: REMINDERS & AFFIRMATIONS */}
        {step === 7 && isPremium && (
          <div>
            <h2 style={S.sectionTitle}>Reminders & Affirmations</h2>
            <p style={S.sectionSub}>Daily motivation and gentle nudges to keep you nourished — body and mind.</p>

            {/* ── Daily Affirmation ── */}
            <div style={{ marginBottom:"28px" }}>
              <h3 style={{ color:"#a0b8ff", fontSize:"15px", fontWeight:"600", letterSpacing:"0.5px", textTransform:"uppercase", marginBottom:"14px" }}>Daily Affirmation</h3>
              <div style={S.affirmCard}>
                <div style={{ position:"absolute", top:"24px", left:"28px", fontSize:"72px", lineHeight:1, color:"rgba(107,143,255,0.2)", fontFamily:"'Cormorant Garamond',serif" }}>"</div>
                <p style={{ fontSize:"22px", lineHeight:1.55, color:"#eef0ff", fontStyle:"italic", marginBottom:"20px", opacity:animating?0:1, transition:"opacity 0.3s", position:"relative", zIndex:1, fontWeight:"300" }}>{AFFIRMATIONS[affirmIdx].text}</p>
                <div style={{ fontSize:"12px", color:"#7b9fff", letterSpacing:"2px", textTransform:"uppercase", fontWeight:"700" }}>— {AFFIRMATIONS[affirmIdx].author}</div>
              </div>
              <div style={{ display:"flex", justifyContent:"center", gap:"12px", marginBottom:"16px" }}>
                <button style={S.btnOutline} onClick={prevAffirm}>← Prev</button>
                <button style={S.btnAccent} onClick={nextAffirm}>Next →</button>
              </div>
            </div>

            <div style={S.divider} />

            {/* ── Meal Reminders ── */}
            <h3 style={{ color:"#a0b8ff", fontSize:"15px", fontWeight:"600", letterSpacing:"0.5px", textTransform:"uppercase", marginBottom:"14px", marginTop:"24px" }}>Meal Reminders</h3>
            <div style={{ ...S.card, marginBottom:"24px", textAlign:"center", padding:"28px 24px" }}>
              <div style={{ fontSize:"40px", marginBottom:"12px" }}>🔔</div>
              {notifPermission === "granted" ? (
                <div>
                  <div style={{ color:"#7b9fff", fontSize:"15px", fontWeight:"500", marginBottom:"6px" }}>Notifications enabled ✓</div>
                  <p style={{ color:"#8890b8", fontSize:"13px", margin:0 }}>Reminders are active while this tab is open.</p>
                </div>
              ) : notifPermission === "denied" ? (
                <div>
                  <div style={{ color:"#e8c87a", fontSize:"15px", fontWeight:"500", marginBottom:"6px" }}>Notifications blocked</div>
                  <p style={{ color:"#8890b8", fontSize:"13px", margin:"0 0 14px 0" }}>Please enable notifications for this site in your browser settings, then refresh.</p>
                </div>
              ) : (
                <div>
                  <p style={{ color:"#8890b8", fontSize:"14px", lineHeight:1.7, marginBottom:"18px" }}>Enable browser notifications so NeuroThrive can remind you to eat at the times you choose.</p>
                  <button onClick={requestNotifPermission} style={{ background:"linear-gradient(135deg,#5570f0,#4060e0)", color:"#fff", border:"none", padding:"12px 28px", borderRadius:"50px", fontSize:"14px", fontWeight:"600", cursor:"pointer" }}>Enable Notifications</button>
                </div>
              )}
            </div>
            <div style={{ marginBottom:"20px" }}>
              {[{ key:"breakfast", label:"Breakfast", emoji:"🌅" },{ key:"lunch", label:"Lunch", emoji:"☀️" },{ key:"snack", label:"Afternoon Snack", emoji:"🍎" },{ key:"dinner", label:"Dinner", emoji:"🌙" }].map(({ key, label, emoji }) => (
                <div key={key} style={{ ...S.card, display:"flex", alignItems:"center", gap:"14px", padding:"16px 20px", marginBottom:"10px" }}>
                  <span style={{ fontSize:"22px" }}>{emoji}</span>
                  <div style={{ flex:1 }}>
                    <div style={{ color:"#eef0ff", fontSize:"14px", fontWeight:"500", marginBottom:"4px" }}>{label}</div>
                    <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
                      <input type="time" value={reminderTimes[key]} onChange={e => setReminderTimes(prev => ({ ...prev, [key]:e.target.value }))} style={{ background:"rgba(240,244,255,0.08)", border:"1px solid rgba(110,120,200,0.25)", borderRadius:"10px", color:"#eef0ff", padding:"8px 12px", fontSize:"15px", fontFamily:"'Plus Jakarta Sans',sans-serif", cursor:"pointer", outline:"none", minWidth:"110px" }} />
                      <span style={{ color:"#8890b8", fontSize:"11px" }}>tap to change</span>
                    </div>
                  </div>
                  <div onClick={() => setReminderActive(prev => ({ ...prev, [key]:!prev[key] }))} style={{ width:"44px", height:"24px", borderRadius:"12px", background:reminderActive[key]?"#5570f0":"rgba(110,120,200,0.2)", cursor:"pointer", position:"relative", transition:"background 0.2s", flexShrink:0 }}>
                    <div style={{ position:"absolute", top:"3px", left:reminderActive[key]?"22px":"3px", width:"18px", height:"18px", borderRadius:"50%", background:"#fff", transition:"left 0.2s", boxShadow:"0 1px 4px rgba(0,0,0,0.2)" }} />
                  </div>
                </div>
              ))}
            </div>
            {/* ── Daily Affirmation Notification ── */}
            <div style={{ ...S.card, marginBottom:"20px", padding:"20px" }}>
              <div style={{ display:"flex", alignItems:"center", gap:"14px", marginBottom: affirmNotifEnabled ? "16px" : "0" }}>
                <span style={{ fontSize:"24px" }}>💙</span>
                <div style={{ flex:1 }}>
                  <div style={{ color:"#eef0ff", fontSize:"15px", fontWeight:"500", marginBottom:"3px" }}>Daily Affirmation</div>
                  <div style={{ color:"#8890b8", fontSize:"12px" }}>Receive a random affirmation every day</div>
                </div>
                <div onClick={() => setAffirmNotifEnabled(p => !p)} style={{ width:"44px", height:"24px", borderRadius:"12px", background:affirmNotifEnabled?"#5570f0":"rgba(110,120,200,0.2)", cursor:"pointer", position:"relative", transition:"background 0.2s", flexShrink:0 }}>
                  <div style={{ position:"absolute", top:"3px", left:affirmNotifEnabled?"22px":"3px", width:"18px", height:"18px", borderRadius:"50%", background:"#fff", transition:"left 0.2s", boxShadow:"0 1px 4px rgba(0,0,0,0.2)" }} />
                </div>
              </div>
              {affirmNotifEnabled && (
                <div style={{ display:"flex", alignItems:"center", gap:"12px", paddingTop:"14px", borderTop:"1px solid rgba(107,143,255,0.12)" }}>
                  <span style={{ color:"#8890b8", fontSize:"13px", whiteSpace:"nowrap" }}>Deliver at</span>
                  <input type="time" value={affirmNotifTime} onChange={e => setAffirmNotifTime(e.target.value)}
                    style={{ padding:"8px 12px", borderRadius:"10px", border:"1px solid rgba(107,143,255,0.25)", background:"rgba(107,143,255,0.07)", color:"#eef0ff", fontSize:"14px", fontFamily:"'Plus Jakarta Sans',sans-serif", outline:"none" }} />
                  <span style={{ color:"#7b9fff", fontSize:"12px" }}>daily</span>
                </div>
              )}
            </div>

            {(() => {
              const REMINDER_TIPS = {
                adhd: { emoji:"⚡", label:"ADHD", tip:"Time blindness is real. Many people with ADHD don't feel hunger cues until they're well past the point of low blood sugar — which worsens focus and mood. Gentle meal reminders act as an external clock for your brain." },
                anxiety: { emoji:"🌊", label:"Anxiety", tip:"Skipping meals spikes cortisol and drops blood sugar — two of the most powerful anxiety triggers. Consistent meal timing keeps your nervous system regulated and reduces the physical fuel for anxious thoughts." },
                depression: { emoji:"🌤", label:"Depression", tip:"Depression often blunts hunger signals entirely. Reminders help ensure you're nourishing your brain even on the days when nothing sounds appealing. Consistent eating supports serotonin production throughout the day." },
                ptsd: { emoji:"🛡", label:"PTSD", tip:"A dysregulated nervous system can suppress hunger and appetite. Regular meals help stabilise cortisol rhythms, supporting the calm, predictable routine that trauma recovery depends on." },
                bipolar: { emoji:"🔋", label:"Bipolar Disorder", tip:"Blood sugar stability is especially important for mood cycling. Irregular eating can trigger energy crashes that resemble or amplify mood episodes. Consistent meal timing is one of the most underrated mood-stabilising tools." },
                ocd: { emoji:"🔵", label:"OCD", tip:"Meal anxiety and food-related rituals are common in OCD. Gentle, non-judgmental reminders support a structured, predictable eating routine that can gradually reduce meal-time anxiety without adding pressure." },
                schizophrenia: { emoji:"🌙", label:"Schizophrenia", tip:"Antipsychotic medications can alter hunger and fullness signals. Regular meal reminders help ensure consistent nutrition that supports medication effectiveness and reduces metabolic side effects." },
                autism: { emoji:"💫", label:"Autism", tip:"Sensory sensitivities and hyperfocus can make mealtimes easy to forget or avoid. Predictable meal reminders support the consistent routine that the autistic nervous system thrives on." },
                eating_disorder: { emoji:"💙", label:"Eating Disorder Recovery", tip:"Reminders in recovery aren't about restriction — they're about structure and self-compassion. Consistent eating times help re-regulate hunger hormones like ghrelin and leptin that restriction disrupts." },
                default: { emoji:"🧠", label:"Brain Health", tip:"Your brain consumes 20% of your body's energy. Consistent meal timing ensures a steady supply of glucose and nutrients to support mood, focus, and emotional regulation throughout the day." },
              };
              const condKeys = selectedConditions.length > 0
                ? selectedConditions.map(id => SUPPLEMENT_CONDITION_MAP[id] || "default")
                : ["default"];
              const uniqueKeys = [...new Set(condKeys)];
              const tips = uniqueKeys.map(k => REMINDER_TIPS[k] || REMINDER_TIPS.default);
              return (
                <div style={{ background:"rgba(107,143,255,0.07)", border:"1px solid rgba(107,143,255,0.18)", borderRadius:"14px", padding:"16px 18px", marginBottom:"24px" }}>
                  {tips.map((t, i) => (
                    <div key={i} style={{ marginBottom: i < tips.length - 1 ? "14px" : 0 }}>
                      <div style={{ fontSize:"11px", color:"#7b9fff", textTransform:"uppercase", letterSpacing:"2px", fontWeight:"600", marginBottom:"6px" }}>{t.emoji} {t.label} Tip</div>
                      <p style={{ color:"#8890b8", fontSize:"13px", lineHeight:1.7, margin:0 }}>{t.tip}</p>
                      {i < tips.length - 1 && <div style={{ height:"1px", background:"rgba(107,143,255,0.12)", margin:"14px 0 0" }} />}
                    </div>
                  ))}
                </div>
              );
            })()}
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"12px" }}>
              <button style={S.btnOutline} onClick={() => setStep(6)}>← Supplements</button>
              <div style={{ display:"flex", alignItems:"center", gap:"12px" }}>
                {reminderSaved && <span style={{ color:"#7b9fff", fontSize:"13px", fontWeight:"500" }}>✓ Reminders saved!</span>}
                <button style={S.btnAccent} onClick={saveReminders}>Save Reminders ✓</button>
              </div>
            </div>
          </div>
        )}
      </div>


        {/* STEP 9: BRAIN TOOLKIT */}
        {step === 9 && isPremium && (() => {
          // Union of all selected conditions' available states
          const allCondStates = new Set();
          const condKeys = selectedConditions.length > 0 ? selectedConditions : ["default"];
          condKeys.forEach(c => {
            const tk = BRAIN_TOOLKIT[c];
            if (tk) Object.keys(tk).forEach(st => allCondStates.add(st));
          });
          if (allCondStates.size === 0) {
            Object.keys(BRAIN_TOOLKIT.default).forEach(st => allCondStates.add(st));
          }
          // Resolve which condition key to use for a given state
          const resolveCondKey = (stId) => {
            if (selectedConditions.includes("neuro_core")) return "neuro_core";
            const found = selectedConditions.find(c => BRAIN_TOOLKIT[c]?.[stId]);
            if (found) return found;
            const any = selectedConditions.find(c => BRAIN_TOOLKIT[c]);
            if (any) return any;
            return "default";
          };
          return (
          <div>
            <h2 style={S.sectionTitle}>🧠 Brain Toolkit</h2>
            <p style={S.sectionSub}>How are you feeling right now? Pick your current state for immediate, personalized coping tools.</p>

            {/* Level 1: Category Grid */}
            {!toolkitCategory && !toolkitState && (
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"12px", marginBottom:"32px" }}>
                {TOOLKIT_CATEGORIES.map(cat => {
                  const relevant = cat.states.filter(st => allCondStates.has(st));
                  if (relevant.length === 0) return null;
                  return (
                    <div key={cat.id} onClick={() => setToolkitCategory(cat.id)}
                      style={{ padding:"22px 18px", borderRadius:"18px", cursor:"pointer", border:"1px solid rgba(110,120,200,0.2)", background:"rgba(240,244,255,0.04)", transition:"all 0.2s", textAlign:"center" }}>
                      <div style={{ fontSize:"32px", marginBottom:"8px" }}>{cat.emoji}</div>
                      <div style={{ color:"#eef0ff", fontSize:"15px", fontWeight:"600", marginBottom:"6px" }}>{cat.label}</div>
                      <div style={{ color:"#7b9fff", fontSize:"12px" }}>{relevant.length} tool{relevant.length !== 1 ? "s" : ""}</div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Level 2: State List (filtered by category) */}
            {toolkitCategory && !toolkitState && (() => {
              const cat = TOOLKIT_CATEGORIES.find(c => c.id === toolkitCategory);
              const isCrisis = cat?.id === "crisis";
              const relevantStates = BRAIN_TOOLKIT_STATES.filter(
                st => cat.states.includes(st.id) && allCondStates.has(st.id)
              );
              return (
                <div>
                  <div style={{ display:"flex", alignItems:"center", gap:"12px", marginBottom:"20px" }}>
                    <button onClick={() => setToolkitCategory(null)} style={{ background:"transparent", border:"1px solid rgba(110,120,200,0.25)", borderRadius:"10px", color:"#8890b8", padding:"8px 14px", cursor:"pointer", fontSize:"13px" }}>← Back</button>
                    <span style={{ fontSize:"22px" }}>{cat.emoji}</span>
                    <h3 style={{ color:"#eef0ff", fontSize:"17px", fontWeight:"700", margin:0 }}>{cat.label}</h3>
                  </div>
                  {isCrisis && (
                    <div style={{ padding:"16px 20px", borderRadius:"14px", border:"1px solid rgba(220,80,80,0.3)", background:"rgba(220,80,80,0.08)", marginBottom:"20px" }}>
                      <p style={{ color:"#ff9090", fontSize:"14px", lineHeight:1.7, margin:0 }}>
                        <strong>⚠️ Safety first:</strong> If you're in immediate danger, call <strong>988</strong> (Suicide &amp; Crisis Lifeline) or text <strong>HOME</strong> to <strong>741741</strong>.
                      </p>
                    </div>
                  )}
                  <div style={{ display:"flex", flexDirection:"column", gap:"12px", marginBottom:"32px" }}>
                    {relevantStates.map(state => (
                      <div key={state.id} onClick={() => setToolkitState(state.id)}
                        style={{ padding:"20px 22px", borderRadius:"18px", cursor:"pointer", border:"1px solid rgba(110,120,200,0.2)", background:"rgba(240,244,255,0.04)", transition:"all 0.2s", display:"flex", alignItems:"center", gap:"16px" }}>
                        <span style={{ fontSize:"30px" }}>{state.emoji}</span>
                        <span style={{ color:"#eef0ff", fontSize:"16px", fontWeight:"500" }}>{state.label}</span>
                        <span style={{ marginLeft:"auto", color:"#7b9fff", fontSize:"18px" }}>→</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}

            {/* Level 3: Coping Steps */}
            {toolkitState && (() => {
              const condKey = resolveCondKey(toolkitState);
              const toolkit = BRAIN_TOOLKIT[condKey] || BRAIN_TOOLKIT.default;
              const steps = toolkit[toolkitState] || BRAIN_TOOLKIT.default[toolkitState] || [];
              const stateInfo = BRAIN_TOOLKIT_STATES.find(s => s.id === toolkitState);
              const isCrisisState = TOOLKIT_CATEGORIES.find(c => c.id === "crisis")?.states.includes(toolkitState);
              return (
                <div>
                  <div style={{ display:"flex", alignItems:"center", gap:"12px", marginBottom:"24px" }}>
                    <button onClick={() => setToolkitState(null)} style={{ background:"transparent", border:"1px solid rgba(110,120,200,0.25)", borderRadius:"10px", color:"#8890b8", padding:"8px 14px", cursor:"pointer", fontSize:"13px" }}>← Back</button>
                    <span style={{ fontSize:"22px" }}>{stateInfo?.emoji}</span>
                    <h3 style={{ color:"#eef0ff", fontSize:"17px", fontWeight:"700", margin:0 }}>{stateInfo?.label}</h3>
                  </div>
                  {isCrisisState && (
                    <div style={{ padding:"16px 20px", borderRadius:"14px", border:"1px solid rgba(220,80,80,0.3)", background:"rgba(220,80,80,0.08)", marginBottom:"20px" }}>
                      <p style={{ color:"#ff9090", fontSize:"14px", lineHeight:1.7, margin:0 }}>
                        <strong>⚠️ Safety first:</strong> If you're in immediate danger, call <strong>988</strong> (Suicide &amp; Crisis Lifeline) or text <strong>HOME</strong> to <strong>741741</strong>.
                      </p>
                    </div>
                  )}
                  {steps.map((s, i) => (
                    <div key={i} style={{ ...S.card, padding:"20px 22px", marginBottom:"12px" }}>
                      <div style={{ display:"flex", alignItems:"flex-start", gap:"14px" }}>
                        <div style={{ minWidth:"28px", height:"28px", borderRadius:"50%", background:"linear-gradient(135deg,#5570f0,#7b9fff)", color:"#fff", fontSize:"13px", fontWeight:"800", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:"1px" }}>{s.s}</div>
                        <div>
                          <div style={{ color:"#eef0ff", fontSize:"15px", fontWeight:"700", marginBottom:"8px" }}>{s.t}</div>
                          <div style={{ color:"#b0b8e8", fontSize:"14px", lineHeight:1.8 }}>{s.d}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })()}

            <div style={{ display:"flex", justifyContent:"space-between", marginTop:"24px" }}>
              <button style={S.btnOutline} onClick={() => { setToolkitState(null); setToolkitCategory(null); setStep(7); }}>← Reminders</button>
              <button style={S.btn} onClick={() => { setToolkitState(null); setToolkitCategory(null); setStep(10); }}>Daily Routine →</button>
            </div>
          </div>
          );
        })()}

        {/* STEP 10: DAILY ROUTINE */}
        {step === 10 && isPremium && (
          <div>
            <h2 style={S.sectionTitle}>☀️ Daily Routine</h2>
            <p style={S.sectionSub}>Morning and evening routines tailored to your conditions — the two highest-leverage points in your day.</p>
            <ProgressBanner context="routine" />
            <div style={{ display:"flex", gap:"10px", marginBottom:"28px" }}>
              <button onClick={() => setRoutineTab("morning")} style={{ flex:1, padding:"14px", borderRadius:"14px", border:routineTab==="morning"?"2px solid #5570f0":"1px solid rgba(110,120,200,0.2)", background:routineTab==="morning"?"#5570f0":"rgba(240,244,255,0.04)", color:routineTab==="morning"?"#fff":"#8890b8", fontSize:"15px", fontWeight:"700", cursor:"pointer", transition:"all 0.2s" }}>🌅 Morning</button>
              <button onClick={() => setRoutineTab("evening")} style={{ flex:1, padding:"14px", borderRadius:"14px", border:routineTab==="evening"?"2px solid #7b9fff":"1px solid rgba(110,120,200,0.2)", background:routineTab==="evening"?"rgba(107,143,255,0.15)":"rgba(240,244,255,0.04)", color:routineTab==="evening"?"#9db5ff":"#8890b8", fontSize:"15px", fontWeight:"700", cursor:"pointer", transition:"all 0.2s" }}>🌙 Evening</button>
              <button onClick={() => setRoutineTab("exercise")} style={{ flex:1, padding:"14px", borderRadius:"14px", border:routineTab==="exercise"?"2px solid #50c878":"1px solid rgba(110,120,200,0.2)", background:routineTab==="exercise"?"rgba(80,200,120,0.15)":"rgba(240,244,255,0.04)", color:routineTab==="exercise"?"#50c878":"#8890b8", fontSize:"15px", fontWeight:"700", cursor:"pointer", transition:"all 0.2s" }}>💪 Exercise</button>
            </div>
            {(() => {
              const condKey = selectedConditions.includes("neuro_core") ? "neuro_core"
                : (selectedConditions[0] && DAILY_ROUTINES[selectedConditions[0]]) ? selectedConditions[0] : "default";

              // ── Exercise tab ──
              if (routineTab === "exercise") {
                const exRoutine = EXERCISE_ROUTINES[condKey] || EXERCISE_ROUTINES.default;
                const exerciseChecks = getTodayChecks().exerciseOptions || {};
                const anyChecked = Object.values(exerciseChecks).some(Boolean);
                const cyclePhase = (selectedGender === "female" && cycleSyncEnabled && lastPeriodDate) ? getCyclePhase(lastPeriodDate, cycleLength) : null;
                const CYCLE_EXERCISE = {
                  menstrual: [
                    { day: [1,2], emoji: "🚶", type: "Gentle Walk", why: "Your body is shedding its uterine lining and prostaglandins are highest. Light movement increases blood flow to ease cramps without taxing your already-low iron and energy reserves." },
                    { day: [3,4], emoji: "🧘", type: "Restorative Yoga", why: "Estrogen and progesterone are at their lowest point. Gentle stretching stimulates the parasympathetic nervous system, reducing the cortisol spike that low hormones leave unchecked." },
                    { day: [5], emoji: "🤸", type: "Light Pilates", why: "Bleeding is tapering and estrogen is beginning to rise. Your energy is returning — Pilates rebuilds core engagement gently as your body transitions into the follicular phase." },
                  ],
                  follicular: [
                    { day: [6,7,8], emoji: "🏃", type: "Moderate Cardio", why: "Rising estrogen increases pain tolerance, reaction time, and muscle recovery speed. Your body can handle more intensity now — cardio capitalizes on estrogen's performance-enhancing effects." },
                    { day: [9,10,11], emoji: "🏋️", type: "Strength Training", why: "Estrogen peaks enhance muscle protein synthesis and tendon stiffness, making this your strongest phase for lifting. You'll recover faster and build more lean muscle per session than any other time in your cycle." },
                    { day: [12,13], emoji: "🔥", type: "HIIT / High Intensity", why: "Estrogen is approaching its peak, maximizing your VO2 max, anaerobic threshold, and neuromuscular coordination. Your body is primed for its highest output — take advantage before ovulation." },
                  ],
                  ovulatory: [
                    { day: [14,15], emoji: "🔥", type: "HIIT / Power Training", why: "Estrogen peaks alongside a surge in luteinizing hormone — your testosterone also briefly spikes. This is your absolute performance peak: fastest reaction time, highest pain tolerance, strongest power output." },
                    { day: [16], emoji: "💃", type: "Dance / Group Fitness", why: "The oxytocin and estrogen peak makes you more social and coordinated. Group exercise leverages this neurochemistry — you'll feel more motivated by others and more graceful in complex movements." },
                  ],
                  luteal: [
                    { day: [17,18,19,20], emoji: "🏋️", type: "Moderate Strength", why: "Progesterone is rising, increasing your core body temperature and metabolic rate. You burn more calories at rest but fatigue faster — moderate lifting with longer rest periods matches your shifting physiology." },
                    { day: [21,22,23,24], emoji: "🧘", type: "Yoga / Steady Cardio", why: "Progesterone peaks, raising body temperature and reducing heat tolerance. Serotonin drops as progesterone metabolites compete for the same receptors — gentle movement boosts serotonin without overheating." },
                    { day: [25,26,27,28,29,30,31,32,33,34,35], emoji: "🚶", type: "Walking / Gentle Stretching", why: "Both estrogen and progesterone are crashing, triggering PMS symptoms. Your nervous system is most reactive now — gentle movement prevents cortisol spikes while intense exercise depletes magnesium — the same mineral your body needs most right now to ease cramps and calm your nervous system." },
                  ],
                };
                const getCycleSuggestion = (phase) => {
                  if (!phase) return null;
                  const options = CYCLE_EXERCISE[phase.phase];
                  if (!options) return null;
                  for (const opt of options) {
                    if (opt.day.includes(phase.day)) return opt;
                  }
                  return options[options.length - 1];
                };
                const cycleSuggestion = getCycleSuggestion(cyclePhase);
                return (
                  <div>
                    <div style={{ ...S.card, padding:"12px 18px", marginBottom:"20px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                      <span style={{ color:"#8890b8", fontSize:"13px" }}>Personalized for <strong style={{color:"#50c878"}}>{exRoutine.label}</strong></span>
                      <span style={{ color:"#50c878", fontSize:"13px", fontWeight:"600" }}>{Object.values(exerciseChecks).filter(Boolean).length}/{exRoutine.options.length} done</span>
                    </div>
                    {cycleSuggestion && cyclePhase && (
                      <div style={{ ...S.card, padding:"20px 22px", marginBottom:"20px", background:"rgba(168,120,210,0.06)", border:"1px solid rgba(168,120,210,0.2)" }}>
                        <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"12px" }}>
                          <span style={{ fontSize:"20px" }}>{cyclePhase.emoji}</span>
                          <div>
                            <div style={{ color:"#e8d0ff", fontSize:"14px", fontWeight:"700" }}>{cyclePhase.label} — Day {cyclePhase.day}</div>
                            <div style={{ color:"#a088c8", fontSize:"11px", marginTop:"2px" }}>Cycle-synced exercise suggestion</div>
                          </div>
                        </div>
                        <div style={{ display:"flex", alignItems:"center", gap:"12px", padding:"14px 16px", borderRadius:"14px", background:"rgba(168,120,210,0.08)", border:"1px solid rgba(168,120,210,0.12)", marginBottom:"12px" }}>
                          <span style={{ fontSize:"28px" }}>{cycleSuggestion.emoji}</span>
                          <div>
                            <div style={{ color:"#eef0ff", fontSize:"15px", fontWeight:"700" }}>Today: {cycleSuggestion.type}</div>
                          </div>
                        </div>
                        <div style={{ color:"#b0a0d0", fontSize:"12.5px", lineHeight:1.8 }}>{cycleSuggestion.why}</div>
                      </div>
                    )}
                    <div style={{ ...S.card, padding:"16px 20px", marginBottom:"20px", background:"rgba(80,200,120,0.04)", border:"1px solid rgba(80,200,120,0.15)" }}>
                      <div style={{ color:"#50c878", fontSize:"13px", fontWeight:"700", marginBottom:"4px" }}>Choose any of the following</div>
                      <div style={{ color:"#8890b8", fontSize:"12px", lineHeight:1.6 }}>Check off whichever exercises you do today. Every one counts toward your daily score.</div>
                    </div>
                    {exRoutine.options.map((opt, i) => {
                      const isChecked = !!exerciseChecks[i];
                      return (
                        <div key={i} style={{ ...S.card, padding:"22px 22px", marginBottom:"18px", border: isChecked ? "1.5px solid rgba(80,200,120,0.35)" : "1px solid rgba(107,143,255,0.12)", background: isChecked ? "rgba(80,200,120,0.06)" : "rgba(107,143,255,0.04)" }}>
                          <div style={{ display:"flex", alignItems:"flex-start", gap:"14px" }}>
                            <div style={{ fontSize:"28px", flexShrink:0, marginTop:"2px" }}>{opt.emoji}</div>
                            <div style={{ flex:1 }}>
                              <div style={{ color:"#eef0ff", fontSize:"15px", fontWeight:"700", marginBottom:"8px" }}>{opt.title}</div>
                              <div style={{ color:"#b0b8e8", fontSize:"13px", lineHeight:1.8 }}>{opt.desc}</div>
                            </div>
                            <button onClick={() => updateTodayChecks(prev => {
                              const opts = { ...(prev.exerciseOptions || {}) };
                              opts[i] = !opts[i];
                              const hasAny = Object.values(opts).some(Boolean);
                              return { ...prev, exerciseOptions: opts, exercise: hasAny };
                            })} style={{ width:"32px", height:"32px", borderRadius:"10px", border: isChecked ? "2px solid #50c878" : "1.5px solid rgba(110,120,200,0.25)", background: isChecked ? "rgba(80,200,120,0.15)" : "transparent", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", transition:"all 0.2s", padding:0, flexShrink:0, marginTop:"4px" }}>
                              {isChecked && <span style={{ color:"#50c878", fontSize:"18px", fontWeight:"800", lineHeight:1 }}>✓</span>}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                    {anyChecked && (
                      <div style={{ textAlign:"center", padding:"16px", borderRadius:"16px", background:"rgba(80,200,120,0.08)", border:"1px solid rgba(80,200,120,0.2)", marginBottom:"20px" }}>
                        <span style={{ color:"#50c878", fontSize:"15px", fontWeight:"700" }}>💪 Nice work! {Object.values(exerciseChecks).filter(Boolean).length} exercise{Object.values(exerciseChecks).filter(Boolean).length !== 1 ? "s" : ""} logged today</span>
                      </div>
                    )}
                  </div>
                );
              }

              // ── Morning / Evening tabs ──
              const routine = personalRoutine || DAILY_ROUTINES[condKey] || DAILY_ROUTINES.default;
              const steps = routineTab === "morning" ? routine.morning : routine.evening;
              const totalTime = steps.reduce((acc, s) => acc + (parseInt(s.time) || 0), 0);
              const todayRoutineChecks = getTodayChecks().routine[routineTab] || [];
              return (
                <div>
                  <div style={{ ...S.card, padding:"12px 18px", marginBottom:"20px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <span style={{ color:"#8890b8", fontSize:"13px" }}>Personalized for <strong style={{color:"#7b9fff"}}>{routine.label}</strong></span>
                    <span style={{ color:"#7b9fff", fontSize:"13px", fontWeight:"600" }}>⏱ {totalTime} min total</span>
                  </div>
                  {steps.map((s, i) => {
                    const isChecked = !!todayRoutineChecks[i];
                    return (
                    <div key={i} style={{ ...S.card, padding:"22px 22px", marginBottom:"18px" }}>
                      <div style={{ display:"flex", alignItems:"flex-start", gap:"14px" }}>
                        <div style={{ textAlign:"center", flexShrink:0 }}>
                          <div style={{ width:"36px", height:"36px", borderRadius:"50%", background: routineTab==="morning" ? "linear-gradient(135deg,#f0a830,#e87020)" : "linear-gradient(135deg,#5570f0,#4060e0)", color:"#fff", fontSize:"14px", fontWeight:"800", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:"4px" }}>{i+1}</div>
                          <div style={{ fontSize:"11px", color:"#8890b8", whiteSpace:"nowrap" }}>{s.time}</div>
                        </div>
                        <div style={{ flex:1 }}>
                          <div style={{ color:"#eef0ff", fontSize:"15px", fontWeight:"700", marginBottom:"8px" }}>{s.title}</div>
                          <div style={{ color:"#b0b8e8", fontSize:"14px", lineHeight:1.8 }}>{s.desc}</div>
                        </div>
                        <button onClick={() => updateTodayChecks(prev => {
                          const arr = [...(prev.routine?.[routineTab] || [])];
                          arr[i] = !arr[i];
                          return { ...prev, routine: { ...prev.routine, [routineTab]: arr } };
                        })} style={{ width:"28px", height:"28px", borderRadius:"8px", border: isChecked ? "2px solid #50c878" : "1.5px solid rgba(110,120,200,0.25)", background: isChecked ? "rgba(80,200,120,0.15)" : "transparent", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", transition:"all 0.2s", padding:0, flexShrink:0, marginTop:"4px" }}>
                          {isChecked && <span style={{ color:"#50c878", fontSize:"16px", fontWeight:"800", lineHeight:1 }}>✓</span>}
                        </button>
                      </div>
                    </div>
                    );
                  })}
                </div>
              );
            })()}
            <div style={{ display:"flex", justifyContent:"space-between", marginTop:"24px" }}>
              <button style={S.btnOutline} onClick={() => setStep(9)}>← Brain Toolkit</button>
              <button style={S.btn} onClick={() => setStep(4)}>Back to Menu →</button>
            </div>
          </div>
        )}

      {/* ── STEP 11: PROGRESS DASHBOARD ─────────────────────────────────────── */}
        {step === 11 && isPremium && (() => {
          // Ordered oldest→newest for charting (logs are stored newest-first)
          const allLogs = [...logs].reverse();
          const rangedLogs = allLogs.slice(-progressRange);
          const total = logs.length;

          // Averages
          const avgMood   = total > 0 ? (logs.reduce((s, l) => s + l.mood, 0) / total).toFixed(1) : "—";
          const avgEnergy = total > 0 ? (logs.reduce((s, l) => s + l.energy, 0) / total).toFixed(1) : "—";

          // Streak: consecutive days (newest-first, assume 1 entry/day)
          let streak = 0;
          for (let i = 0; i < logs.length; i++) { if (logs[i]) streak++; else break; }

          // SVG line chart helper
          const W = 600, H = 120, PAD = { t:12, r:12, b:28, l:28 };
          const chartW = W - PAD.l - PAD.r;
          const chartH = H - PAD.t - PAD.b;
          const toX = (i, n) => PAD.l + (n <= 1 ? chartW / 2 : (i / (n - 1)) * chartW);
          const toY = (v) => PAD.t + chartH - ((v - 1) / 4) * chartH;

          const makePath = (data, key) => {
            if (data.length === 0) return "";
            return data.map((d, i) => `${i === 0 ? "M" : "L"} ${toX(i, data.length).toFixed(1)} ${toY(d[key]).toFixed(1)}`).join(" ");
          };
          const makeArea = (data, key) => {
            if (data.length === 0) return "";
            const pts = data.map((d, i) => `${toX(i, data.length).toFixed(1)},${toY(d[key]).toFixed(1)}`).join(" L ");
            const base = toY(1).toFixed(1);
            const x0 = toX(0, data.length).toFixed(1);
            const xn = toX(data.length - 1, data.length).toFixed(1);
            return `M ${x0},${base} L ${pts} L ${xn},${base} Z`;
          };

          // Day-of-week analysis
          const DOW_NAMES = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
          const dowMood = Array(7).fill(null).map(() => []);
          logs.forEach(l => {
            if (!l.date) return;
            const d = new Date(l.date + ", " + new Date().getFullYear());
            if (!isNaN(d.getDay())) dowMood[d.getDay()].push(l.mood);
          });
          const dowAvg = dowMood.map(arr => arr.length > 0 ? arr.reduce((a, b) => a + b, 0) / arr.length : null);
          const bestDow = dowAvg.reduce((best, v, i) => (v !== null && (best === null || v > dowAvg[best])) ? i : best, null);

          // Mood label helper
          const moodLabel = (v) => {
            if (!v || v === "—") return "—";
            const f = parseFloat(v);
            if (f >= 4.5) return "Great 😊";
            if (f >= 3.5) return "Good 🙂";
            if (f >= 2.5) return "Okay 😐";
            if (f >= 1.5) return "Low 😕";
            return "Rough 😞";
          };
          const energyLabel = (v) => {
            if (!v || v === "—") return "—";
            const f = parseFloat(v);
            if (f >= 4.5) return "Vibrant 🚀";
            if (f >= 3.5) return "Energized ⚡";
            if (f >= 2.5) return "Okay 🔋";
            if (f >= 1.5) return "Tired 😴";
            return "Drained 🪫";
          };

          return (
            <div>
              <h2 style={S.sectionTitle}>📊 Your Progress</h2>
              <p style={S.sectionSub}>Patterns in your mood and energy tell a story. Here's yours so far.</p>

              {total === 0 ? (
                <div style={{ ...S.card, textAlign:"center", padding:"48px 32px" }}>
                  <div style={{ fontSize:"48px", marginBottom:"16px" }}>📓</div>
                  <div style={{ color:"#eef0ff", fontSize:"17px", fontWeight:"600", marginBottom:"8px" }}>No entries yet</div>
                  <div style={{ color:"#8890b8", fontSize:"14px", lineHeight:1.7, marginBottom:"24px" }}>Start logging your mood and energy in the Journal tab — after a few days, your progress charts will appear here.</div>
                  <button style={S.btnAccent} onClick={() => setStep(8)}>Open Journal →</button>
                </div>
              ) : (
                <>
                  {/* ── Stat cards ── */}
                  <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(140px,1fr))", gap:"12px", marginBottom:"28px" }}>
                    {[
                      { label:"Entries", value: total, sub: "logged", icon:"📓" },
                      { label:"Avg Mood", value: avgMood, sub: moodLabel(avgMood), icon:"😊" },
                      { label:"Avg Energy", value: avgEnergy, sub: energyLabel(avgEnergy), icon:"⚡" },
                      { label:"Day Streak", value: streak, sub: streak === 1 ? "day logged" : "days logged", icon:"🔥" },
                    ].map((card, i) => (
                      <div key={i} style={{ background:"rgba(107,143,255,0.05)", border:"1px solid rgba(107,143,255,0.15)", borderRadius:"18px", padding:"18px 16px", textAlign:"center" }}>
                        <div style={{ fontSize:"24px", marginBottom:"6px" }}>{card.icon}</div>
                        <div style={{ fontSize:"26px", fontWeight:"800", color:"#eef0ff", letterSpacing:"-0.5px", lineHeight:1.1, marginBottom:"4px" }}>{card.value}</div>
                        <div style={{ fontSize:"10px", textTransform:"uppercase", letterSpacing:"1.5px", color:"#5570f0", fontWeight:"700", marginBottom:"2px" }}>{card.label}</div>
                        <div style={{ fontSize:"11px", color:"#8890b8" }}>{card.sub}</div>
                      </div>
                    ))}
                  </div>

                  {/* ── Range selector ── */}
                  <div style={{ display:"flex", gap:"8px", marginBottom:"20px" }}>
                    <div style={{ fontSize:"13px", color:"#8890b8", fontWeight:"600", alignSelf:"center", marginRight:"4px" }}>Show:</div>
                    {[7, 14, 30].map(r => (
                      <button key={r} onClick={() => setProgressRange(r)} style={{ padding:"7px 18px", borderRadius:"20px", border:progressRange===r?"1.5px solid #5570f0":"1px solid rgba(110,120,200,0.2)", background:progressRange===r?"rgba(80,112,240,0.18)":"rgba(240,244,255,0.04)", color:progressRange===r?"#9db5ff":"#8890b8", fontSize:"12px", fontWeight:"700", cursor:"pointer", transition:"all 0.15s" }}>
                        {r}d
                      </button>
                    ))}
                  </div>

                  {/* ── Line charts ── */}
                  {rangedLogs.length >= 2 ? (
                    <div style={{ ...S.card, marginBottom:"20px", padding:"20px 16px" }}>
                      <div style={{ fontSize:"10px", textTransform:"uppercase", letterSpacing:"2px", color:"#7b9fff", fontWeight:"700", marginBottom:"16px" }}>Mood & Energy — Last {Math.min(progressRange, rangedLogs.length)} Entries</div>

                      <svg viewBox={`0 0 ${W} ${H}`} style={{ width:"100%", height:"auto", display:"block", marginBottom:"8px" }}>
                        {/* Grid lines */}
                        {[1,2,3,4,5].map(v => (
                          <g key={v}>
                            <line x1={PAD.l} y1={toY(v)} x2={W - PAD.r} y2={toY(v)} stroke="rgba(110,120,200,0.1)" strokeWidth="1" />
                            <text x={PAD.l - 6} y={toY(v) + 4} textAnchor="end" fontSize="8" fill="#8890b8">{v}</text>
                          </g>
                        ))}
                        {/* X labels — show first, middle, last */}
                        {rangedLogs.length > 0 && [0, Math.floor((rangedLogs.length-1)/2), rangedLogs.length-1].filter((v,i,a) => a.indexOf(v)===i).map(i => (
                          <text key={i} x={toX(i, rangedLogs.length)} y={H - 4} textAnchor="middle" fontSize="8" fill="#8890b8">
                            {rangedLogs[i]?.date?.replace(/\w+,\s/, "") || ""}
                          </text>
                        ))}
                        {/* Mood area fill */}
                        <path d={makeArea(rangedLogs, "mood")} fill="rgba(107,143,255,0.08)" />
                        {/* Energy area fill */}
                        <path d={makeArea(rangedLogs, "energy")} fill="rgba(232,200,122,0.07)" />
                        {/* Mood line */}
                        <path d={makePath(rangedLogs, "mood")} fill="none" stroke="#7b9fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        {/* Energy line */}
                        <path d={makePath(rangedLogs, "energy")} fill="none" stroke="#e8c87a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="5 3" />
                        {/* Mood dots */}
                        {rangedLogs.map((d, i) => (
                          <circle key={i} cx={toX(i, rangedLogs.length)} cy={toY(d.mood)} r="3.5" fill="#7b9fff" />
                        ))}
                        {/* Energy dots */}
                        {rangedLogs.map((d, i) => (
                          <circle key={i} cx={toX(i, rangedLogs.length)} cy={toY(d.energy)} r="3" fill="#e8c87a" />
                        ))}
                      </svg>

                      {/* Legend */}
                      <div style={{ display:"flex", gap:"20px", justifyContent:"center" }}>
                        <div style={{ display:"flex", alignItems:"center", gap:"6px" }}>
                          <div style={{ width:"20px", height:"2px", background:"#7b9fff", borderRadius:"2px" }} />
                          <span style={{ fontSize:"11px", color:"#8890b8" }}>Mood</span>
                        </div>
                        <div style={{ display:"flex", alignItems:"center", gap:"6px" }}>
                          <div style={{ width:"20px", height:"2px", background:"#e8c87a", borderRadius:"2px", backgroundImage:"repeating-linear-gradient(90deg,#e8c87a 0,#e8c87a 5px,transparent 5px,transparent 8px)" }} />
                          <span style={{ fontSize:"11px", color:"#8890b8" }}>Energy</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div style={{ ...S.card, textAlign:"center", padding:"28px", marginBottom:"20px", color:"#8890b8", fontSize:"13px" }}>
                      Log at least 2 entries to see your chart.
                    </div>
                  )}

                  {/* ── Day-of-week pattern ── */}
                  {logs.length >= 7 && (
                    <div style={{ ...S.card, marginBottom:"20px" }}>
                      <div style={{ fontSize:"10px", textTransform:"uppercase", letterSpacing:"2px", color:"#7b9fff", fontWeight:"700", marginBottom:"16px" }}>Day of Week Pattern</div>
                      <div style={{ display:"flex", gap:"8px", alignItems:"flex-end", height:"64px" }}>
                        {DOW_NAMES.map((name, i) => {
                          const val = dowAvg[i];
                          const pct = val !== null ? ((val - 1) / 4) * 100 : 0;
                          const isActive = val !== null;
                          const isBest = i === bestDow;
                          return (
                            <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:"4px", height:"100%", justifyContent:"flex-end" }}>
                              <div style={{ fontSize:"9px", color: isBest ? "#e8c87a" : "#7b9fff", fontWeight:"700", opacity: isActive ? 1 : 0 }}>{val !== null ? val.toFixed(1) : ""}</div>
                              <div style={{ width:"100%", maxWidth:"32px", height:`${Math.max(isActive ? pct : 0, 8)}%`, borderRadius:"6px 6px 3px 3px", background: isBest ? "linear-gradient(180deg,#e8c87a,#d4a832)" : isActive ? "linear-gradient(180deg,#7b9fff,#5570f0)" : "rgba(110,120,200,0.12)", transition:"all 0.3s", minHeight: isActive ? "8px" : "4px" }} />
                              <div style={{ fontSize:"9px", color: isBest ? "#e8c87a" : "#8890b8", fontWeight: isBest ? "700" : "400" }}>{name}</div>
                            </div>
                          );
                        })}
                      </div>
                      {bestDow !== null && (
                        <div style={{ marginTop:"14px", padding:"10px 14px", borderRadius:"12px", background:"rgba(232,200,122,0.08)", border:"1px solid rgba(232,200,122,0.2)" }}>
                          <span style={{ fontSize:"12px", color:"#e8c87a" }}>✨ Your best day tends to be <strong>{DOW_NAMES[bestDow]}</strong> — avg mood {dowAvg[bestDow]?.toFixed(1)}/5</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* ── Daily Completion Stats ── */}
                  {(() => {
                    const today = new Date();
                    const daysToShow = Math.min(progressRange, 30);
                    const completionData = [];
                    let totalMeals = 0, totalMealDays = 0;
                    let totalRoutineEarned = 0, totalRoutineTotal = 0;
                    let exerciseDays = 0;
                    for (let i = daysToShow - 1; i >= 0; i--) {
                      const d = new Date(today); d.setDate(d.getDate() - i);
                      const key = d.toISOString().slice(0, 10);
                      const score = getDailyScore(key);
                      completionData.push({ key, pct: dailyChecks[key] ? score.pct : 0, earned: score.earned, total: score.total });
                      if (dailyChecks[key]) {
                        const c = dailyChecks[key];
                        const m = c.meals || {};
                        const mealCount = [m.breakfast, m.lunch, m.dinner, m.snacks, m.snacks2].filter(Boolean).length;
                        totalMeals += mealCount; totalMealDays++;
                        const mr = (c.routine?.morning || []).filter(Boolean).length;
                        const er = (c.routine?.evening || []).filter(Boolean).length;
                        const condK = selectedConditions.includes("neuro_core") ? "neuro_core" : (selectedConditions[0] && DAILY_ROUTINES[selectedConditions[0]]) ? selectedConditions[0] : "default";
                        const rt = DAILY_ROUTINES[condK] || DAILY_ROUTINES.default;
                        totalRoutineEarned += mr + er;
                        totalRoutineTotal += rt.morning.length + rt.evening.length;
                        if (c.exercise) exerciseDays++;
                      }
                    }
                    const avgMealsPerDay = totalMealDays > 0 ? (totalMeals / totalMealDays).toFixed(1) : "0";
                    const avgRoutinePct = totalRoutineTotal > 0 ? Math.round((totalRoutineEarned / totalRoutineTotal) * 100) : 0;
                    const cW = 600, cH = 100, cPAD = { t: 8, r: 12, b: 24, l: 28 };
                    const cChartW = cW - cPAD.l - cPAD.r;
                    const cChartH = cH - cPAD.t - cPAD.b;
                    const barW = Math.max(4, (cChartW / daysToShow) - 2);

                    return (
                      <>
                        <div style={{ ...S.card, marginBottom:"20px" }}>
                          <div style={{ fontSize:"10px", textTransform:"uppercase", letterSpacing:"2px", color:"#50c878", fontWeight:"700", marginBottom:"16px" }}>Daily Completion — Last {daysToShow} Days</div>
                          <svg viewBox={`0 0 ${cW} ${cH}`} style={{ width:"100%", height:"auto", display:"block", marginBottom:"8px" }}>
                            {[0, 25, 50, 75, 100].map(v => (
                              <g key={v}>
                                <line x1={cPAD.l} y1={cPAD.t + cChartH - (v / 100) * cChartH} x2={cW - cPAD.r} y2={cPAD.t + cChartH - (v / 100) * cChartH} stroke="rgba(110,120,200,0.08)" strokeWidth="1" />
                                {v % 50 === 0 && <text x={cPAD.l - 6} y={cPAD.t + cChartH - (v / 100) * cChartH + 3} textAnchor="end" fontSize="7" fill="#8890b8">{v}%</text>}
                              </g>
                            ))}
                            {completionData.map((d, i) => {
                              const x = cPAD.l + (i / daysToShow) * cChartW + 1;
                              const h = (d.pct / 100) * cChartH;
                              return (
                                <g key={i}>
                                  <rect x={x} y={cPAD.t + cChartH - h} width={barW} height={Math.max(h, 1)} rx="2" fill={d.pct > 50 ? "#50c878" : d.pct > 0 ? "rgba(80,200,120,0.4)" : "rgba(110,120,200,0.12)"} />
                                  {(i === 0 || i === daysToShow - 1 || i === Math.floor(daysToShow / 2)) && (
                                    <text x={x + barW / 2} y={cH - 4} textAnchor="middle" fontSize="7" fill="#8890b8">{d.key.slice(5)}</text>
                                  )}
                                </g>
                              );
                            })}
                          </svg>
                        </div>
                        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(140px,1fr))", gap:"12px", marginBottom:"20px" }}>
                          {[
                            { label:"Avg Meals/Day", value: avgMealsPerDay, sub: "of 4", icon:"🍽️" },
                            { label:"Routine Done", value: `${avgRoutinePct}%`, sub: "avg completion", icon:"☀️" },
                            { label:"Exercise", value: exerciseDays, sub: `of ${daysToShow} days`, icon:"💪" },
                            { label:"Streak", value: getCompletionStreak(), sub: "day streak", icon:"🔥" },
                          ].map((card, i) => (
                            <div key={i} style={{ background:"rgba(80,200,120,0.05)", border:"1px solid rgba(80,200,120,0.15)", borderRadius:"18px", padding:"18px 16px", textAlign:"center" }}>
                              <div style={{ fontSize:"24px", marginBottom:"6px" }}>{card.icon}</div>
                              <div style={{ fontSize:"26px", fontWeight:"800", color:"#eef0ff", letterSpacing:"-0.5px", lineHeight:1.1, marginBottom:"4px" }}>{card.value}</div>
                              <div style={{ fontSize:"10px", textTransform:"uppercase", letterSpacing:"1.5px", color:"#50c878", fontWeight:"700", marginBottom:"2px" }}>{card.label}</div>
                              <div style={{ fontSize:"11px", color:"#8890b8" }}>{card.sub}</div>
                            </div>
                          ))}
                        </div>
                      </>
                    );
                  })()}

                  {/* ── Food Log ── */}
                  {(() => {
                    const today = new Date();
                    const foodLogDays = [];
                    for (let i = 0; i < 14; i++) {
                      const d = new Date(today); d.setDate(d.getDate() - i);
                      const key = d.toISOString().slice(0, 10);
                      const dc = dailyChecks[key];
                      if (dc?.foodLog && Object.keys(dc.foodLog).length > 0) {
                        foodLogDays.push({ date: key, label: d.toLocaleDateString("en-US", { weekday:"short", month:"short", day:"numeric" }), log: dc.foodLog });
                      }
                    }
                    return foodLogDays.length > 0 ? (
                      <div style={{ ...S.card, marginBottom:"20px" }}>
                        <div style={{ fontSize:"10px", textTransform:"uppercase", letterSpacing:"2px", color:"#50c878", fontWeight:"700", marginBottom:"16px" }}>Food Log</div>
                        {foodLogDays.map((day, di) => (
                          <div key={day.date} style={{ padding:"12px 0", borderBottom: di < foodLogDays.length - 1 ? "1px solid rgba(110,120,200,0.1)" : "none" }}>
                            <div style={{ color:"#9db5ff", fontSize:"13px", fontWeight:"700", marginBottom:"8px" }}>{day.label}</div>
                            <div style={{ display:"flex", flexDirection:"column", gap:"4px" }}>
                              {Object.entries(day.log).map(([mealKey, mealName]) => (
                                <div key={mealKey} style={{ display:"flex", alignItems:"center", gap:"8px" }}>
                                  <span style={{ color:"#50c878", fontSize:"12px" }}>✓</span>
                                  <span style={{ color:"#e8c87a", fontSize:"10px", fontWeight:"700", textTransform:"uppercase", letterSpacing:"1px", minWidth:"60px" }}>{mealKey === "snacks2" ? "Snack 2" : mealKey}</span>
                                  <span style={{ color:"#c8ccf0", fontSize:"12px" }}>{mealName}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : null;
                  })()}

                  {/* ── Recent log list ── */}
                  <div style={{ ...S.card }}>
                    <div style={{ fontSize:"10px", textTransform:"uppercase", letterSpacing:"2px", color:"#7b9fff", fontWeight:"700", marginBottom:"16px" }}>Recent Entries</div>
                    {logs.slice(0, 10).map((log, i) => {
                      const moodDot = ["#e06060","#e09060","#e0d060","#80c870","#60b870"][log.mood - 1] || "#8890b8";
                      const energyDot = ["#6080e0","#8890b8","#e8c87a","#80d0c0","#60d0a0"][log.energy - 1] || "#8890b8";
                      const moodEmoji = MOOD_EMOJIS.find(m => m.val === log.mood)?.emoji || "";
                      const energyEmoji = ENERGY_EMOJIS.find(e => e.val === log.energy)?.emoji || "";
                      return (
                        <div key={i} style={{ padding:"14px 0", borderBottom: i < Math.min(9, logs.length-1) ? "1px solid rgba(110,120,200,0.1)" : "none" }}>
                          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom: log.note ? "6px" : "0" }}>
                            <span style={{ color:"#9db5ff", fontSize:"13px", fontWeight:"700" }}>{log.date}</span>
                            <div style={{ display:"flex", gap:"10px" }}>
                              <span style={{ display:"flex", alignItems:"center", gap:"4px", fontSize:"12px", color:"#c8ccf0" }}>
                                <span style={{ width:"8px", height:"8px", borderRadius:"50%", background:moodDot, display:"inline-block" }} />
                                {moodEmoji} {log.mood}/5
                              </span>
                              <span style={{ display:"flex", alignItems:"center", gap:"4px", fontSize:"12px", color:"#c8ccf0" }}>
                                <span style={{ width:"8px", height:"8px", borderRadius:"50%", background:energyDot, display:"inline-block" }} />
                                {energyEmoji} {log.energy}/5
                              </span>
                            </div>
                          </div>
                          {log.note && <p style={{ margin:0, fontSize:"12px", color:"#8890b8", lineHeight:1.6, fontStyle:"italic" }}>"{log.note}"</p>}
                        </div>
                      );
                    })}
                    {logs.length > 10 && (
                      <div style={{ textAlign:"center", paddingTop:"14px", color:"#8890b8", fontSize:"12px" }}>+ {logs.length - 10} more entries in your Journal</div>
                    )}
                  </div>
                </>
              )}

              <div style={{ display:"flex", justifyContent:"space-between", marginTop:"24px" }}>
                <button style={S.btnOutline} onClick={() => setStep(8)}>← Journal</button>
                <button style={S.btn} onClick={() => setStep(4)}>View Meal Plan →</button>
              </div>
            </div>
          );
        })()}

      {/* STEP 12: TODAY */}
        {step === 12 && !isPremium && (
          <div style={{ textAlign:"center", padding:"60px 20px", color:"#8890b8" }}>
            <div style={{ fontSize:"32px", marginBottom:"12px" }}>🧠</div>
            <div style={{ fontSize:"14px" }}>Loading your plan...</div>
          </div>
        )}
        {step === 12 && isPremium && (() => {
          const condKey = selectedConditions.includes("neuro_core") ? "neuro_core"
            : (selectedConditions[0] && DAILY_ROUTINES[selectedConditions[0]]) ? selectedConditions[0] : "default";
          const routine = personalRoutine || DAILY_ROUTINES[condKey] || DAILY_ROUTINES.default;
          const exRoutine = EXERCISE_ROUTINES[condKey] || EXERCISE_ROUTINES.default;
          const todayChecks = getTodayChecks();
          const exerciseChecks = todayChecks.exerciseOptions || {};
          const morningChecks = todayChecks.routine?.morning || [];
          const eveningChecks = todayChecks.routine?.evening || [];
          const hasJournal = logs.some(l => l.date && l.date.includes(new Date(todayKey).toLocaleDateString("en-US", { month: "short", day: "numeric" })));
          const sectionDivider = { height:"1px", background:"rgba(110,120,200,0.1)", margin:"28px 0" };

          return (
            <div>
              <h2 style={S.sectionTitle}>Today</h2>
              <p style={S.sectionSub}>Your daily checklist — meals, routines, exercise, and journaling in one place.</p>

              {/* Section A: Progress Banner */}
              <ProgressBanner />

              {/* Did You Know? — daily rotating fact */}
              {(() => {
                const facts = DID_YOU_KNOW[condKey] || DID_YOU_KNOW["default"] || [];
                if (facts.length === 0) return null;
                const factIdx = Math.max(0, (daysElapsed - 1)) % facts.length;
                const todayFact = facts[factIdx];
                if (!todayFact) return null;
                return (
                  <div style={{ padding:"18px", borderRadius:"16px", background:"linear-gradient(135deg, rgba(107,143,255,0.1), rgba(160,120,255,0.08))", border:"1px solid rgba(107,143,255,0.2)", marginBottom:"16px", marginTop:"16px" }}>
                    <div style={{ fontSize:"11px", color:"#7b9fff", fontWeight:"700", letterSpacing:"1.5px", textTransform:"uppercase", marginBottom:"10px" }}>Did You Know?</div>
                    <p style={{ color:"#eef0ff", fontSize:"14px", fontWeight:"600", lineHeight:1.6, margin:"0 0 10px 0" }}>{todayFact.fact}</p>
                    <p style={{ color:"#a0b8ff", fontSize:"12px", lineHeight:1.6, margin:0, fontStyle:"italic" }}>{todayFact.connection}</p>
                  </div>
                );
              })()}

              {/* Onboarding Insights — first 7 days only */}
              {daysElapsed <= 7 && (() => {
                const insights = ONBOARDING_INSIGHTS[condKey] || ONBOARDING_INSIGHTS.default;
                if (!insights || insights.length === 0) return null;
                const insight = insights[daysElapsed - 1];
                if (!insight) return null;
                return (
                  <div style={{ padding:"18px", borderRadius:"16px", background:"rgba(80,200,120,0.04)", border:"1px solid rgba(80,200,120,0.15)", marginBottom:"16px" }}>
                    <div style={{ fontSize:"11px", color:"#50c878", fontWeight:"700", letterSpacing:"1.5px", textTransform:"uppercase", marginBottom:"6px" }}>Day {daysElapsed} Insight</div>
                    <div style={{ color:"#eef0ff", fontSize:"15px", fontWeight:"700", marginBottom:"8px" }}>{insight.title}</div>
                    <p style={{ color:"#c8ccf0", fontSize:"13px", lineHeight:1.7, margin:"0 0 8px 0" }}>{insight.body}</p>
                    <p style={{ color:"#50c878", fontSize:"12px", lineHeight:1.5, margin:0, fontStyle:"italic" }}>{insight.mealConnection}</p>
                  </div>
                );
              })()}

              {/* Section B: Today's Meals */}
              <div style={sectionDivider} />
              <div style={{ fontSize:"15px", color:"#eef0ff", fontWeight:"700", marginBottom:"14px", letterSpacing:"-0.3px" }}>Today's Meals</div>
              {currentDay && [
                { key:"breakfast", label:"Breakfast", emoji:"🌅" },
                { key:"lunch",     label:"Lunch",     emoji:"☀️" },
                { key:"dinner",    label:"Dinner",    emoji:"🌙" },
                { key:"snacks",    label:"Snack",     emoji:"🍎" },
                ...(currentDay.snacks2 ? [{ key:"snacks2", label:"Snack 2", emoji:"🍊" }] : []),
              ].map(({ key, label, emoji }) => {
                const meal = currentDay[key];
                if (!meal) return null;
                const mealChecked = todayChecks.meals[key];
                const bs = getBrainScore(meal);
                return (
                  <div key={key} style={{ ...S.card, padding:"14px 16px", marginBottom:"10px" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
                      <button onClick={() => toggleMealCheck(key, meal)} style={{ width:"24px", height:"24px", borderRadius:"7px", border: mealChecked ? "2px solid #50c878" : "1.5px solid rgba(110,120,200,0.25)", background: mealChecked ? "rgba(80,200,120,0.15)" : "transparent", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", padding:0, flexShrink:0 }}>
                        {mealChecked && <span style={{ color:"#50c878", fontSize:"14px", fontWeight:"800", lineHeight:1 }}>✓</span>}
                      </button>
                      <div style={{ flex:1, minWidth:0 }}>
                        <div style={{ fontSize:"10px", color:"#8890b8", fontWeight:"600", letterSpacing:"1px", textTransform:"uppercase", marginBottom:"3px" }}>{emoji} {label}</div>
                        <div style={{ color: mealChecked ? "#50c878" : "#eef0ff", fontSize:"14px", fontWeight:"600", lineHeight:1.4, textDecoration: mealChecked ? "line-through" : "none", opacity: mealChecked ? 0.7 : 1, overflow:"hidden", textOverflow:"ellipsis" }}>{meal}</div>
                      </div>
                    </div>
                    <div style={{ display:"flex", alignItems:"center", gap:"6px", marginTop:"8px", marginLeft:"34px" }}>
                      <div style={{ display:"inline-flex", alignItems:"center", gap:"4px", padding:"3px 8px", borderRadius:"16px", background:"rgba(107,143,255,0.1)", border:"1px solid rgba(107,143,255,0.2)" }}>
                        <span style={{ fontSize:"10px" }}>🔥</span>
                        <span style={{ color:"#7b9fff", fontSize:"10px", fontWeight:"700" }}>{estimateCalories(meal)}</span>
                      </div>
                      <div style={{ display:"inline-flex", alignItems:"center", gap:"3px", padding:"3px 8px", borderRadius:"16px", background: bs.score >= 4 ? "rgba(80,200,120,0.1)" : "rgba(107,143,255,0.08)", border: bs.score >= 4 ? "1px solid rgba(80,200,120,0.25)" : "1px solid rgba(107,143,255,0.15)" }}>
                        <span style={{ fontSize:"10px" }}>🧠</span>
                        <span style={{ color: bs.score >= 4 ? "#50c878" : "#7b9fff", fontSize:"10px", fontWeight:"700" }}>{"⚡".repeat(bs.score)}</span>
                      </div>
                      <button onClick={() => openRecipe(meal, label, globalDayIdx)} style={{ padding:"3px 10px", borderRadius:"16px", border:"1px solid rgba(80,112,240,0.25)", background:"rgba(80,112,240,0.06)", color:"#7b9fff", fontSize:"10px", fontWeight:"600", cursor:"pointer" }}>Recipe</button>
                      <button onClick={() => getAltMeal(meal, label, key)} style={{ padding:"3px 10px", borderRadius:"16px", border:"1px solid rgba(110,120,200,0.2)", background:"rgba(110,120,200,0.06)", color:"#e8c87a", fontSize:"10px", fontWeight:"600", cursor:"pointer" }}>Swap</button>
                    </div>
                  </div>
                );
              })}
              {!currentDay && <div style={{ ...S.card, padding:"20px", textAlign:"center", color:"#8890b8" }}>No meal plan loaded yet. Go to Menu to generate your plan.</div>}

              {/* Section C: Morning Routine */}
              <div style={sectionDivider} />
              <div style={{ fontSize:"15px", color:"#eef0ff", fontWeight:"700", marginBottom:"14px", letterSpacing:"-0.3px" }}>Morning Routine</div>
              <div style={{ color:"#8890b8", fontSize:"11px", marginBottom:"10px" }}>{morningChecks.filter(Boolean).length}/{routine.morning.length} done</div>
              {routine.morning.map((s, i) => {
                const isChecked = !!morningChecks[i];
                const isExpanded = !!expandedTodayRoutine[`m${i}`];
                return (
                  <div key={i} style={{ ...S.card, padding:"12px 14px", marginBottom:"8px", border: isChecked ? "1.5px solid rgba(80,200,120,0.3)" : undefined }}>
                    <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
                      <button onClick={() => updateTodayChecks(prev => {
                        const arr = [...(prev.routine?.morning || [])];
                        arr[i] = !arr[i];
                        return { ...prev, routine: { ...prev.routine, morning: arr } };
                      })} style={{ width:"24px", height:"24px", borderRadius:"7px", border: isChecked ? "2px solid #50c878" : "1.5px solid rgba(110,120,200,0.25)", background: isChecked ? "rgba(80,200,120,0.15)" : "transparent", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", padding:0, flexShrink:0 }}>
                        {isChecked && <span style={{ color:"#50c878", fontSize:"14px", fontWeight:"800", lineHeight:1 }}>✓</span>}
                      </button>
                      <div style={{ width:"22px", height:"22px", borderRadius:"50%", background:"linear-gradient(135deg,#f0a830,#e87020)", color:"#fff", fontSize:"11px", fontWeight:"800", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>{i+1}</div>
                      <div style={{ flex:1, cursor:"pointer" }} onClick={() => setExpandedTodayRoutine(p => ({ ...p, [`m${i}`]: !p[`m${i}`] }))}>
                        <div style={{ color: isChecked ? "#50c878" : "#eef0ff", fontSize:"13px", fontWeight:"600" }}>{s.title}</div>
                        <div style={{ color:"#8890b8", fontSize:"10px" }}>{s.time}</div>
                      </div>
                    </div>
                    {isExpanded && <div style={{ color:"#b0b8e8", fontSize:"12px", lineHeight:1.7, marginTop:"8px", marginLeft:"56px" }}>{s.desc}</div>}
                  </div>
                );
              })}

              {/* Section D: Exercise */}
              <div style={sectionDivider} />
              <div style={{ fontSize:"15px", color:"#eef0ff", fontWeight:"700", marginBottom:"14px", letterSpacing:"-0.3px" }}>Exercise</div>
              <div style={{ color:"#8890b8", fontSize:"11px", marginBottom:"10px" }}>{Object.values(exerciseChecks).filter(Boolean).length}/{exRoutine.options.length} done — check off whichever you do today</div>
              {exRoutine.options.map((opt, i) => {
                const isChecked = !!exerciseChecks[i];
                return (
                  <div key={i} style={{ ...S.card, padding:"12px 14px", marginBottom:"8px", border: isChecked ? "1.5px solid rgba(80,200,120,0.3)" : undefined }}>
                    <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
                      <button onClick={() => updateTodayChecks(prev => {
                        const opts = { ...(prev.exerciseOptions || {}) };
                        opts[i] = !opts[i];
                        const hasAny = Object.values(opts).some(Boolean);
                        return { ...prev, exerciseOptions: opts, exercise: hasAny };
                      })} style={{ width:"24px", height:"24px", borderRadius:"7px", border: isChecked ? "2px solid #50c878" : "1.5px solid rgba(110,120,200,0.25)", background: isChecked ? "rgba(80,200,120,0.15)" : "transparent", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", padding:0, flexShrink:0 }}>
                        {isChecked && <span style={{ color:"#50c878", fontSize:"14px", fontWeight:"800", lineHeight:1 }}>✓</span>}
                      </button>
                      <span style={{ fontSize:"20px", flexShrink:0 }}>{opt.emoji}</span>
                      <div style={{ flex:1 }}>
                        <div style={{ color: isChecked ? "#50c878" : "#eef0ff", fontSize:"13px", fontWeight:"600" }}>{opt.title}</div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Section E: Journal */}
              <div style={sectionDivider} />
              <div style={{ fontSize:"15px", color:"#eef0ff", fontWeight:"700", marginBottom:"14px", letterSpacing:"-0.3px" }}>How are you feeling?</div>
              {hasJournal ? (
                <div style={{ ...S.card, padding:"16px 18px", background:"rgba(80,200,120,0.04)", border:"1px solid rgba(80,200,120,0.2)" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
                    <span style={{ color:"#50c878", fontSize:"18px", fontWeight:"800" }}>✓</span>
                    <span style={{ color:"#50c878", fontSize:"13px", fontWeight:"600" }}>Journal logged today</span>
                  </div>
                  {logs[0] && logs[0].note && <p style={{ color:"#a0a8e8", fontSize:"12px", margin:"8px 0 0 26px", lineHeight:1.5 }}>{logs[0].note.length > 100 ? logs[0].note.slice(0,100) + "..." : logs[0].note}</p>}
                </div>
              ) : (
                <div style={S.card}>
                  <div style={{ marginBottom:"10px" }}>
                    <div style={{ color:"#8890b8", fontSize:"11px", fontWeight:"600", marginBottom:"6px" }}>Mood</div>
                    <div style={{ display:"flex", gap:"6px", flexWrap:"wrap" }}>
                      {MOOD_EMOJIS.map(mood => (
                        <button key={mood.val} onClick={() => setTodayMood(mood.val)} style={{ padding:"6px 10px", borderRadius:"10px", border: todayMood===mood.val ? "2px solid #5570f0" : "1px solid rgba(110,120,200,0.2)", background: todayMood===mood.val ? "rgba(85,112,240,0.15)" : "rgba(240,244,255,0.04)", cursor:"pointer", fontSize:"18px" }}>{mood.emoji}</button>
                      ))}
                    </div>
                  </div>
                  <div style={{ marginBottom:"10px" }}>
                    <div style={{ color:"#8890b8", fontSize:"11px", fontWeight:"600", marginBottom:"6px" }}>Energy</div>
                    <div style={{ display:"flex", gap:"6px", flexWrap:"wrap" }}>
                      {ENERGY_EMOJIS.map(energy => (
                        <button key={energy.val} onClick={() => setTodayEnergy(energy.val)} style={{ padding:"6px 10px", borderRadius:"10px", border: todayEnergy===energy.val ? "2px solid #5570f0" : "1px solid rgba(110,120,200,0.2)", background: todayEnergy===energy.val ? "rgba(85,112,240,0.15)" : "rgba(240,244,255,0.04)", cursor:"pointer", fontSize:"18px" }}>{energy.emoji}</button>
                      ))}
                    </div>
                  </div>
                  <textarea style={{ ...S.textarea, minHeight:"60px" }} placeholder="Notes (optional)..." value={todayNote} onChange={e => setTodayNote(e.target.value)} />
                  <button onClick={saveLog} style={{ marginTop:"8px", width:"100%", padding:"10px", borderRadius:"12px", border:"none", background: (todayMood && todayEnergy) ? "linear-gradient(135deg,#5570f0,#4060e0)" : "rgba(110,120,200,0.15)", color: (todayMood && todayEnergy) ? "#fff" : "#8890b8", fontSize:"12px", fontWeight:"700", cursor: (todayMood && todayEnergy) ? "pointer" : "default" }}>{(todayMood && todayEnergy) ? "Save Log" : "Select mood & energy"}</button>
                </div>
              )}

              {/* Section F: Evening Routine */}
              <div style={sectionDivider} />
              <div style={{ fontSize:"15px", color:"#eef0ff", fontWeight:"700", marginBottom:"14px", letterSpacing:"-0.3px" }}>Evening Routine</div>
              <div style={{ color:"#8890b8", fontSize:"11px", marginBottom:"10px" }}>{eveningChecks.filter(Boolean).length}/{routine.evening.length} done</div>
              {routine.evening.map((s, i) => {
                const isChecked = !!eveningChecks[i];
                const isExpanded = !!expandedTodayRoutine[`e${i}`];
                return (
                  <div key={i} style={{ ...S.card, padding:"12px 14px", marginBottom:"8px", border: isChecked ? "1.5px solid rgba(80,200,120,0.3)" : undefined }}>
                    <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
                      <button onClick={() => updateTodayChecks(prev => {
                        const arr = [...(prev.routine?.evening || [])];
                        arr[i] = !arr[i];
                        return { ...prev, routine: { ...prev.routine, evening: arr } };
                      })} style={{ width:"24px", height:"24px", borderRadius:"7px", border: isChecked ? "2px solid #50c878" : "1.5px solid rgba(110,120,200,0.25)", background: isChecked ? "rgba(80,200,120,0.15)" : "transparent", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", padding:0, flexShrink:0 }}>
                        {isChecked && <span style={{ color:"#50c878", fontSize:"14px", fontWeight:"800", lineHeight:1 }}>✓</span>}
                      </button>
                      <div style={{ width:"22px", height:"22px", borderRadius:"50%", background:"linear-gradient(135deg,#5570f0,#4060e0)", color:"#fff", fontSize:"11px", fontWeight:"800", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>{i+1}</div>
                      <div style={{ flex:1, cursor:"pointer" }} onClick={() => setExpandedTodayRoutine(p => ({ ...p, [`e${i}`]: !p[`e${i}`] }))}>
                        <div style={{ color: isChecked ? "#50c878" : "#eef0ff", fontSize:"13px", fontWeight:"600" }}>{s.title}</div>
                        <div style={{ color:"#8890b8", fontSize:"10px" }}>{s.time}</div>
                      </div>
                    </div>
                    {isExpanded && <div style={{ color:"#b0b8e8", fontSize:"12px", lineHeight:1.7, marginTop:"8px", marginLeft:"56px" }}>{s.desc}</div>}
                  </div>
                );
              })}

              {/* Section G: Daily Brain Scorecard */}
              <div style={sectionDivider} />
              {(() => {
                const bp = getBrainPoints(todayKey);
                const lvl = getBrainLevel(bp.pct);
                const streak = getCompletionStreak();
                const cats = [
                  { label: "Nutrition", bp: bp.categories.meals, max: bp.maxCats.meals, emoji: "🍽️", desc: "Brain-boosting meals eaten" },
                  { label: "Morning Routine", bp: bp.categories.morning, max: bp.maxCats.morning, emoji: "☀️", desc: "Morning steps completed" },
                  { label: "Evening Routine", bp: bp.categories.evening, max: bp.maxCats.evening, emoji: "🌙", desc: "Evening steps completed" },
                  { label: "Exercise", bp: bp.categories.exercise, max: bp.maxCats.exercise, emoji: "💪", desc: "Movement for BDNF & dopamine" },
                  { label: "Self-Awareness", bp: bp.categories.journal, max: bp.maxCats.journal, emoji: "📓", desc: "Journal & mood tracking" },
                ];
                const r2 = 38, circ2 = 2 * Math.PI * r2;
                const off2 = circ2 - (bp.pct / 100) * circ2;

                return (
                  <div style={{ padding:"24px 20px", borderRadius:"20px", background:"linear-gradient(145deg, rgba(107,143,255,0.06), rgba(80,200,120,0.04))", border:"1px solid rgba(107,143,255,0.15)" }}>
                    <div style={{ fontSize:"11px", color:"#7b9fff", fontWeight:"700", letterSpacing:"1.5px", textTransform:"uppercase", marginBottom:"16px" }}>Daily Brain Scorecard</div>

                    <div style={{ display:"flex", alignItems:"center", gap:"20px", marginBottom:"20px" }}>
                      <svg width="90" height="90" viewBox="0 0 90 90" style={{ flexShrink:0 }}>
                        <circle cx="45" cy="45" r={r2} fill="none" stroke="rgba(110,120,200,0.1)" strokeWidth="6" />
                        <circle cx="45" cy="45" r={r2} fill="none" stroke={lvl.color} strokeWidth="6" strokeLinecap="round"
                          strokeDasharray={circ2} strokeDashoffset={off2}
                          transform="rotate(-90 45 45)" style={{ transition: "stroke-dashoffset 0.5s ease" }} />
                        <text x="45" y="42" textAnchor="middle" fontSize="18" fontWeight="800" fill={lvl.color}>{bp.pct}%</text>
                        <text x="45" y="56" textAnchor="middle" fontSize="9" fontWeight="600" fill="#8890b8">{bp.total} BP</text>
                      </svg>
                      <div>
                        <div style={{ fontSize:"22px", fontWeight:"800", color:"#eef0ff", letterSpacing:"-0.5px" }}>{lvl.emoji}</div>
                        <div style={{ fontSize:"16px", fontWeight:"700", color:lvl.color, marginTop:"4px" }}>{lvl.label}</div>
                        <div style={{ fontSize:"11px", color:"#8890b8", marginTop:"4px" }}>{bp.total} of {bp.max} brain points earned</div>
                        {streak > 0 && <div style={{ fontSize:"11px", color:"#e8c87a", marginTop:"2px" }}>{streak} day streak 🔥</div>}
                      </div>
                    </div>

                    {cats.map((cat, i) => {
                      const pct = cat.max > 0 ? Math.round((cat.bp / cat.max) * 100) : 0;
                      const full = pct >= 100;
                      return (
                        <div key={i} style={{ marginBottom:"12px" }}>
                          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"4px" }}>
                            <span style={{ fontSize:"12px", fontWeight:"600", color: full ? "#50c878" : "#c8ccf0" }}>{cat.emoji} {cat.label}</span>
                            <span style={{ fontSize:"11px", fontWeight:"700", color: full ? "#50c878" : "#7b9fff" }}>{cat.bp}/{cat.max} BP</span>
                          </div>
                          <div style={{ height:"8px", borderRadius:"4px", background:"rgba(110,120,200,0.1)", overflow:"hidden" }}>
                            <div style={{ width:`${Math.min(100, pct)}%`, height:"100%", borderRadius:"4px", background: full ? "linear-gradient(90deg,#40b868,#50c878)" : `linear-gradient(90deg,${lvl.color}88,${lvl.color})`, transition:"width 0.5s ease" }} />
                          </div>
                          <div style={{ fontSize:"10px", color:"#8890b8", marginTop:"2px" }}>{cat.desc}</div>
                        </div>
                      );
                    })}

                    {bp.pct >= 70 && (
                      <div style={{ marginTop:"16px", padding:"12px", borderRadius:"12px", background:"rgba(80,200,120,0.08)", border:"1px solid rgba(80,200,120,0.2)", textAlign:"center" }}>
                        <div style={{ fontSize:"13px", fontWeight:"700", color:"#50c878" }}>
                          {bp.pct >= 90 ? "Your brain is thriving today. Every choice you made matters." : "Strong day for your brain. You're building real neural change."}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })()}

              <div style={{ textAlign:"center", marginTop:"28px" }}>
                <button style={S.btn} onClick={() => setStep(4)}>View Full Menu →</button>
              </div>
            </div>
          );
        })()}

      {/* ── MEAL EXPLANATION + RECIPE MODAL ────────────────────────────────── */}
      {explainModal && (
        <div onClick={() => setExplainModal(null)} style={{ position:"fixed", inset:0, zIndex:1000, background:"rgba(26,26,26,0.65)", backdropFilter:"blur(8px)", display:"flex", alignItems:"center", justifyContent:"center", padding:"20px" }}>
          <div onClick={e => e.stopPropagation()} style={{ background:"linear-gradient(145deg,#0c1020,#111828)", borderRadius:"24px", padding:"28px", maxWidth:"560px", width:"100%", maxHeight:"85vh", overflowY:"auto", position:"relative", boxShadow:"0 32px 80px rgba(0,0,0,0.3)" }}>
            <button onClick={() => setExplainModal(null)} style={{ position:"absolute", top:"16px", right:"16px", background:"rgba(255,255,255,0.07)", border:"none", borderRadius:"50%", width:"32px", height:"32px", color:"#a0a8e8", cursor:"pointer", fontSize:"16px", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:"700" }}>×</button>

            <div style={{ display:"inline-block", padding:"4px 12px", borderRadius:"20px", background:"rgba(80,112,240,0.12)", color:"#7b9fff", fontSize:"10px", letterSpacing:"2px", textTransform:"uppercase", fontWeight:"700", marginBottom:"10px" }}>{explainModal.mealType}</div>
            <h3 style={{ fontSize:"18px", color:"#eef0ff", fontWeight:"700", letterSpacing:"-0.3px", marginBottom:"18px", lineHeight:1.3, paddingRight:"32px" }}>{explainModal.meal}</h3>

            {/* Tabs */}
            <div style={{ display:"flex", gap:"8px", marginBottom:"20px" }}>
              <button onClick={() => handleModalTab("why")} style={{ flex:1, padding:"10px", borderRadius:"12px", border:modalTab==="why"?"1.5px solid #7b9fff":"1px solid rgba(110,120,200,0.18)", background:modalTab==="why"?"rgba(107,143,255,0.15)":"rgba(240,244,255,0.04)", color:modalTab==="why"?"#9db5ff":"#8890b8", fontSize:"13px", fontWeight:"700", cursor:"pointer", transition:"all 0.15s" }}>🧠 Why This?</button>
              <button onClick={() => handleModalTab("recipe")} style={{ flex:1, padding:"10px", borderRadius:"12px", border:modalTab==="recipe"?"1.5px solid #5570f0":"1px solid rgba(110,120,200,0.18)", background:modalTab==="recipe"?"#5570f0":"rgba(240,244,255,0.04)", color:modalTab==="recipe"?"#fff":"#8890b8", fontSize:"13px", fontWeight:"700", cursor:"pointer", transition:"all 0.15s" }}>🍳 Recipe</button>
            </div>

            <div style={{ height:"1px", background:"rgba(110,120,200,0.12)", marginBottom:"18px" }} />

            {/* WHY TAB */}
            {modalTab === "why" && (
              <div>
                {(() => { const gn = getGenderNote(explainModal.meal, selectedGender, cycleSyncEnabled, lastPeriodDate, cycleLength, explainModal.dayIdx != null ? getPlanDate(explainModal.dayIdx) : undefined); if (!gn) return null; return (
                  <div style={{ marginBottom:"16px", padding:"12px 16px", borderRadius:"14px", background: gn.phase ? "rgba(168,120,210,0.08)" : "rgba(80,160,220,0.08)", border: gn.phase ? "1px solid rgba(168,120,210,0.2)" : "1px solid rgba(80,160,220,0.2)" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"4px" }}>
                      <span style={{ fontSize:"14px" }}>{gn.phase ? gn.phase.emoji : "♂️"}</span>
                      <span style={{ color: gn.phase ? "#c8a0e8" : "#50a0dc", fontSize:"13px", fontWeight:"700" }}>{gn.phase ? `${gn.phase.label} · Day ${gn.phase.day}` : "Men's Health"}</span>
                    </div>
                    <div style={{ color: gn.phase ? "#d4b8f0" : "#80c0e8", fontSize:"13px", lineHeight:1.6 }}>{gn.short}</div>
                    {gn.detail && <div style={{ color:"#8890b8", fontSize:"12px", lineHeight:1.6, marginTop:"6px" }}>{gn.detail}</div>}
                  </div>
                );})()}
                <div style={{ color:"#c8ccf0", fontSize:"14px", lineHeight:1.9, whiteSpace:"pre-wrap" }}>{explainText}</div>
              </div>
            )}

            {/* RECIPE TAB */}
            {modalTab === "recipe" && (() => {
              const recipe = getRecipe(explainModal.meal);
              return (
                <div>
                  <div style={{ display:"flex", gap:"12px", marginBottom:"22px" }}>
                    <div style={{ padding:"10px 18px", borderRadius:"12px", background:"rgba(240,244,255,0.06)", border:"1px solid rgba(110,120,200,0.16)", textAlign:"center" }}>
                      <div style={{ fontSize:"10px", color:"#8890b8", letterSpacing:"1.5px", textTransform:"uppercase", fontWeight:"700" }}>Serves</div>
                      <div style={{ fontSize:"18px", color:"#eef0ff", fontWeight:"700", marginTop:"2px" }}>{recipe.serves}</div>
                    </div>
                    <div style={{ padding:"10px 18px", borderRadius:"12px", background:"rgba(240,244,255,0.06)", border:"1px solid rgba(110,120,200,0.16)", textAlign:"center" }}>
                      <div style={{ fontSize:"10px", color:"#8890b8", letterSpacing:"1.5px", textTransform:"uppercase", fontWeight:"700" }}>Time</div>
                      <div style={{ fontSize:"18px", color:"#eef0ff", fontWeight:"700", marginTop:"2px" }}>{recipe.time}</div>
                    </div>
                  </div>
                  <div style={{ marginBottom:"22px" }}>
                    <div style={{ fontSize:"10px", textTransform:"uppercase", letterSpacing:"2px", color:"#7b9fff", fontWeight:"700", marginBottom:"12px" }}>Ingredients</div>
                    {recipe.ingredients.map((ing, i) => (
                      <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:"10px", padding:"8px 0", borderBottom:"1px solid rgba(110,120,200,0.1)", color:"#c8ccf0", fontSize:"14px" }}>
                        <span style={{ color:"#7b9fff", flexShrink:0, fontWeight:"700" }}>•</span>{ing}
                      </div>
                    ))}
                  </div>
                  <div style={{ marginBottom:"20px" }}>
                    <div style={{ fontSize:"10px", textTransform:"uppercase", letterSpacing:"2px", color:"#7b9fff", fontWeight:"700", marginBottom:"12px" }}>Instructions</div>
                    {recipe.steps.map((s, i) => (
                      <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:"12px", marginBottom:"14px" }}>
                        <div style={{ minWidth:"24px", height:"24px", borderRadius:"50%", background:"#5570f0", color:"#fff", fontSize:"11px", fontWeight:"800", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:"1px" }}>{i+1}</div>
                        <div style={{ color:"#b8c0f8", fontSize:"14px", lineHeight:1.7 }}>{s}</div>
                      </div>
                    ))}
                  </div>
                  {recipe.nutrition && recipe.nutrition.length > 0 && (
                    <div style={{ marginBottom:"16px", padding:"14px 18px", borderRadius:"14px", background:"rgba(80,112,240,0.07)", border:"1.5px solid rgba(80,112,240,0.18)" }}>
                      <div style={{ fontSize:"10px", textTransform:"uppercase", letterSpacing:"1.5px", color:"#7b9fff", fontWeight:"700", marginBottom:"10px" }}>🧠 Brain Nutrition Highlights</div>
                      {recipe.nutrition.map((n, i) => (
                        <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:"8px", marginBottom:"6px", color:"#b8c0f8", fontSize:"13px", lineHeight:1.6 }}>
                          <span style={{ color:"#7b9fff", flexShrink:0 }}>✦</span>{n}
                        </div>
                      ))}
                    </div>
                  )}
                  {recipe.tip && (
                    <div style={{ padding:"14px 18px", borderRadius:"14px", background:"rgba(107,143,255,0.07)", border:"1.5px solid rgba(107,143,255,0.18)" }}>
                      <div style={{ fontSize:"10px", textTransform:"uppercase", letterSpacing:"1.5px", color:"#7b9fff", fontWeight:"700", marginBottom:"6px" }}>💡 Pro Tip</div>
                      <div style={{ color:"#a0a8e8", fontSize:"13px", lineHeight:1.65 }}>{recipe.tip}</div>
                    </div>
                  )}
                </div>
              );
            })()}

            <div style={{ marginTop:"24px", textAlign:"center" }}>
              <button onClick={() => setExplainModal(null)} style={{ background:"#5570f0", color:"#fff", border:"none", padding:"11px 28px", borderRadius:"50px", fontSize:"13px", fontWeight:"700", cursor:"pointer" }}>Done ✓</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Copyright Footer ── */}
      <footer style={{ textAlign:"center", padding:"32px 24px 28px", borderTop:"1px solid rgba(107,143,255,0.08)", marginTop:"24px" }}>
        <div style={{ fontSize:"13px", color:"#8890b8", fontFamily:"'Plus Jakarta Sans',sans-serif", letterSpacing:"0.3px" }}>
          © {new Date().getFullYear()} NeuroThrive. All rights reserved.
        </div>
        <div style={{ fontSize:"11px", color:"rgba(136,144,184,0.5)", marginTop:"6px", letterSpacing:"0.5px" }}>
          Proprietary content. Unauthorized reproduction or distribution is prohibited.
        </div>
        <div style={{ display:"flex", justifyContent:"center", gap:"20px", marginTop:"12px", flexWrap:"wrap" }}>
          <button onClick={() => setLegalPage("terms")} style={{ color:"#7b9fff", background:"none", border:"none", fontSize:"12px", cursor:"pointer", textDecoration:"underline", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>Terms of Service</button>
          <button onClick={() => setLegalPage("privacy")} style={{ color:"#7b9fff", background:"none", border:"none", fontSize:"12px", cursor:"pointer", textDecoration:"underline", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>Privacy Policy</button>
          <button onClick={() => setDisclaimerAccepted(false)} style={{ color:"#8890b8", background:"none", border:"none", fontSize:"12px", cursor:"pointer", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>Health Disclaimer</button>
        </div>
        {user && (
          <div style={{ marginTop:"16px" }}>
            {!deleteConfirm ? (
              <button onClick={() => setDeleteConfirm(true)} style={{ color:"#e06060", background:"none", border:"none", fontSize:"11px", cursor:"pointer", fontFamily:"'Plus Jakarta Sans',sans-serif", opacity:0.7 }}>Delete Account</button>
            ) : (
              <div style={{ display:"inline-flex", alignItems:"center", gap:"10px", padding:"10px 16px", borderRadius:"12px", background:"rgba(224,96,96,0.08)", border:"1px solid rgba(224,96,96,0.25)" }}>
                <span style={{ color:"#e06060", fontSize:"12px" }}>Permanently delete all your data?</span>
                <button onClick={handleDeleteAccount} style={{ color:"#fff", background:"#e06060", border:"none", fontSize:"11px", fontWeight:"700", cursor:"pointer", padding:"6px 14px", borderRadius:"8px", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>Yes, Delete</button>
                <button onClick={() => setDeleteConfirm(false)} style={{ color:"#8890b8", background:"none", border:"1px solid rgba(110,120,200,0.25)", fontSize:"11px", cursor:"pointer", padding:"6px 14px", borderRadius:"8px", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>Cancel</button>
              </div>
            )}
          </div>
        )}
      </footer>

      {/* ── Brain Explainer Modal ── */}
      {showBrainExplainer && (() => {
        const condKey = selectedConditions.includes("neuro_core") ? "neuro_core" : (selectedConditions[0] || "default");
        const brain = BRAIN_ON_CONDITION[condKey] || BRAIN_ON_CONDITION.default;
        if (!brain) return null;
        return (
          <div style={{ position:"fixed", inset:0, background:"rgba(5,8,16,0.95)", zIndex:300, overflowY:"auto", padding:"24px", backdropFilter:"blur(12px)" }}>
            <div style={{ maxWidth:"520px", margin:"0 auto", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"24px" }}>
                <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"28px", fontWeight:"300", color:"#eef0ff", margin:0 }}>{brain.emoji} {brain.title}</h2>
                <button onClick={() => setShowBrainExplainer(false)} style={{ background:"rgba(110,120,200,0.15)", border:"none", color:"#8890b8", fontSize:"18px", width:"36px", height:"36px", borderRadius:"50%", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>✕</button>
              </div>
              <p style={{ color:"#c8ccf0", fontSize:"14px", lineHeight:1.8, marginBottom:"24px" }}>{brain.overview}</p>

              <div style={{ fontSize:"11px", color:"#7b9fff", fontWeight:"700", letterSpacing:"1.5px", textTransform:"uppercase", marginBottom:"14px" }}>Neurotransmitter Profile</div>
              {brain.neurotransmitters.map((nt, i) => (
                <div key={i} style={{ padding:"16px", borderRadius:"14px", background:"rgba(107,143,255,0.05)", border:"1px solid rgba(107,143,255,0.12)", marginBottom:"10px" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"8px" }}>
                    <span style={{ color:"#eef0ff", fontSize:"14px", fontWeight:"700" }}>{nt.name}</span>
                    <span style={{ padding:"3px 10px", borderRadius:"20px", fontSize:"10px", fontWeight:"700", background: nt.status === "Low" || nt.status === "Depleted" ? "rgba(224,96,96,0.12)" : nt.status === "Elevated" || nt.status === "High" ? "rgba(224,180,96,0.12)" : "rgba(107,143,255,0.12)", color: nt.status === "Low" || nt.status === "Depleted" ? "#e06060" : nt.status === "Elevated" || nt.status === "High" ? "#e0b460" : "#7b9fff" }}>{nt.status}</span>
                  </div>
                  <p style={{ color:"#a0a8e8", fontSize:"12px", lineHeight:1.6, margin:"0 0 4px 0" }}><strong style={{ color:"#c8ccf0" }}>Role:</strong> {nt.role}</p>
                  <p style={{ color:"#a0a8e8", fontSize:"12px", lineHeight:1.6, margin:"0 0 4px 0" }}><strong style={{ color:"#c8ccf0" }}>Impact:</strong> {nt.impact}</p>
                  <p style={{ color:"#50c878", fontSize:"12px", lineHeight:1.6, margin:0 }}><strong style={{ color:"#70d898" }}>Nutrition:</strong> {nt.nutrition}</p>
                </div>
              ))}

              {brain.brainRegions && (
                <>
                  <div style={{ fontSize:"11px", color:"#7b9fff", fontWeight:"700", letterSpacing:"1.5px", textTransform:"uppercase", margin:"24px 0 14px 0" }}>Brain Regions Affected</div>
                  <p style={{ color:"#c8ccf0", fontSize:"13px", lineHeight:1.7, margin:"0 0 24px 0" }}>{brain.brainRegions}</p>
                </>
              )}

              <div style={{ padding:"18px", borderRadius:"16px", background:"rgba(80,200,120,0.05)", border:"1px solid rgba(80,200,120,0.15)", marginBottom:"24px" }}>
                <div style={{ fontSize:"11px", color:"#50c878", fontWeight:"700", letterSpacing:"1.5px", textTransform:"uppercase", marginBottom:"8px" }}>How Your Nutrition Helps</div>
                <p style={{ color:"#c8ccf0", fontSize:"13px", lineHeight:1.7, margin:0 }}>{brain.howNutritionHelps}</p>
              </div>

              <button onClick={() => setShowBrainExplainer(false)} style={{ width:"100%", padding:"14px", borderRadius:"50px", background:"linear-gradient(135deg,#5570f0,#4060e0)", color:"#fff", border:"none", fontSize:"14px", fontWeight:"600", cursor:"pointer", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>Close</button>
            </div>
          </div>
        );
      })()}

      {/* ── Paywall Overlay ── */}
      {(showPaywall || paywallActive) && (
        <div style={{ position:"fixed", inset:0, background:"rgba(5,8,16,0.95)", zIndex:300, display:"flex", alignItems:"center", justifyContent:"center", padding:"24px", overflowY:"auto", backdropFilter:"blur(12px)" }}>
          <div style={{ maxWidth:"520px", width:"100%", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>

            {/* Header */}
            <div style={{ textAlign:"center", marginBottom:"32px" }}>
              <div style={{ fontSize:"48px", marginBottom:"12px" }}>🧠</div>
              <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"36px", fontWeight:"300", color:"#eef0ff", margin:"0 0 8px 0", letterSpacing:"1px" }}>Unlock NeuroThrive Premium</h2>
              <p style={{ color:"#8890b8", fontSize:"15px", margin:0, lineHeight:1.6 }}>You've completed your profile. Your personalized plan is ready — unlock it to begin your journey.</p>
            </div>

            {/* Features list */}
            <div style={{ background:"rgba(107,143,255,0.07)", border:"1px solid rgba(107,143,255,0.18)", borderRadius:"16px", padding:"20px 24px", marginBottom:"24px" }}>
              <div style={{ fontSize:"11px", color:"#7b9fff", textTransform:"uppercase", letterSpacing:"2px", fontWeight:"700", marginBottom:"14px" }}>Everything included</div>
              {[
                "🍽️  30-day personalized mental health meal plan",
                "🌿  Evidence-based supplement guidance for your conditions",
                "📓  Daily mood & energy journal",
                "✨  182 curated affirmations",
                "🔔  Meal reminders & daily affirmation notifications",
                "🔄  Unlimited plan regeneration & cycle tracking",
                "🌿  New content added regularly",
              ].map((f, i) => (
                <div key={i} style={{ color:"#c8ccf0", fontSize:"14px", lineHeight:1.7, padding:"5px 0", borderBottom: i < 6 ? "1px solid rgba(107,143,255,0.08)" : "none" }}>{f}</div>
              ))}
            </div>

            {/* Pricing cards */}
            <div style={{ display:"flex", gap:"14px", marginBottom:"20px", flexWrap:"wrap" }}>
              {/* Annual — highlighted */}
              <div style={{ flex:1, minWidth:"200px", background:"linear-gradient(135deg, rgba(85,112,240,0.2), rgba(107,143,255,0.1))", border:"1.5px solid #7b9fff", borderRadius:"18px", padding:"22px 20px", position:"relative", cursor:"pointer" }} onClick={() => !checkoutLoading && startCheckout("annual")}>
                <div style={{ position:"absolute", top:"-12px", left:"50%", transform:"translateX(-50%)", background:"linear-gradient(135deg,#5570f0,#7b9fff)", borderRadius:"20px", padding:"4px 14px", fontSize:"11px", fontWeight:"700", color:"#fff", letterSpacing:"1px", whiteSpace:"nowrap" }}>BEST VALUE — SAVE 50%</div>
                <div style={{ color:"#eef0ff", fontSize:"22px", fontWeight:"700", marginBottom:"4px", marginTop:"8px" }}>$59.99</div>
                <div style={{ color:"#7b9fff", fontSize:"13px", fontWeight:"500", marginBottom:"8px" }}>per year</div>
                <div style={{ color:"#8890b8", fontSize:"12px" }}>Just $5/month</div>
                <button disabled={!!checkoutLoading} style={{ marginTop:"16px", width:"100%", padding:"12px", borderRadius:"50px", background:"linear-gradient(135deg,#5570f0,#4060e0)", color:"#fff", border:"none", fontSize:"14px", fontWeight:"600", cursor:"pointer", fontFamily:"'Plus Jakarta Sans',sans-serif", opacity: checkoutLoading ? 0.7 : 1 }}>
                  {checkoutLoading === "annual" ? "Redirecting..." : "Start Annual Plan →"}
                </button>
              </div>

              {/* Monthly */}
              <div style={{ flex:1, minWidth:"200px", background:"rgba(240,244,255,0.04)", border:"1px solid rgba(110,120,200,0.2)", borderRadius:"18px", padding:"22px 20px", cursor:"pointer" }} onClick={() => !checkoutLoading && startCheckout("monthly")}>
                <div style={{ color:"#eef0ff", fontSize:"22px", fontWeight:"700", marginBottom:"4px" }}>$9.99</div>
                <div style={{ color:"#8890b8", fontSize:"13px", fontWeight:"500", marginBottom:"8px" }}>per month</div>
                <div style={{ color:"#8890b8", fontSize:"12px" }}>Cancel anytime</div>
                <button disabled={!!checkoutLoading} style={{ marginTop:"16px", width:"100%", padding:"12px", borderRadius:"50px", background:"rgba(107,143,255,0.15)", color:"#7b9fff", border:"1px solid rgba(107,143,255,0.3)", fontSize:"14px", fontWeight:"600", cursor:"pointer", fontFamily:"'Plus Jakarta Sans',sans-serif", opacity: checkoutLoading ? 0.7 : 1 }}>
                  {checkoutLoading === "monthly" ? "Redirecting..." : "Start Monthly Plan"}
                </button>
              </div>
            </div>

            <div style={{ textAlign:"center" }}>
              <p style={{ color:"#8890b8", fontSize:"12px", lineHeight:1.7, margin:"0 0 8px 0" }}>🔒 Secure payment via Stripe. Cancel anytime. No hidden fees.</p>
              <p style={{ color:"rgba(136,144,184,0.6)", fontSize:"10px", lineHeight:1.6, margin:"0 0 12px 0" }}>Subscriptions auto-renew at the end of each billing period at the current price unless cancelled at least 24 hours before the period ends. By subscribing you agree to our <button onClick={() => setLegalPage("terms")} style={{ color:"#7b9fff", background:"none", border:"none", padding:0, cursor:"pointer", fontSize:"10px", textDecoration:"underline", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>Terms</button> and <button onClick={() => setLegalPage("privacy")} style={{ color:"#7b9fff", background:"none", border:"none", padding:0, cursor:"pointer", fontSize:"10px", textDecoration:"underline", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>Privacy Policy</button>.</p>
              <button onClick={() => { setShowPaywall(false); setStep(2); }} style={{ color:"#8890b8", background:"none", border:"none", fontSize:"13px", cursor:"pointer", textDecoration:"underline", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>← Go back</button>
            </div>
          </div>
        </div>
      )}
      {legalPage && (
        <div onClick={() => setLegalPage(null)} style={{ position:"fixed", inset:0, background:"rgba(5,8,16,0.92)", zIndex:200, display:"flex", alignItems:"flex-start", justifyContent:"center", padding:"24px", overflowY:"auto", backdropFilter:"blur(8px)" }}>
          <div onClick={e => e.stopPropagation()} style={{ background:"linear-gradient(145deg,#0c1020,#111828)", borderRadius:"24px", padding:"36px 32px", maxWidth:"640px", width:"100%", border:"1px solid rgba(107,143,255,0.2)", boxShadow:"0 32px 80px rgba(0,0,0,0.5)", marginTop:"24px" }}>
            <button onClick={() => setLegalPage(null)} style={{ position:"absolute", top:"20px", right:"20px", background:"rgba(107,143,255,0.1)", border:"1px solid rgba(107,143,255,0.2)", color:"#7b9fff", borderRadius:"50%", width:"32px", height:"32px", cursor:"pointer", fontSize:"16px", display:"flex", alignItems:"center", justifyContent:"center" }}>×</button>

            {legalPage === "terms" && (
              <div>
                <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"28px", fontWeight:"300", color:"#eef0ff", marginBottom:"6px" }}>Terms of Service</h2>
                <p style={{ color:"#7b9fff", fontSize:"11px", letterSpacing:"2px", textTransform:"uppercase", marginBottom:"28px" }}>Effective Date: March 13, 2026</p>
                {[
                  { title:"1. Acceptance of Terms", body:"By accessing or using NeuroThrive (the \"App\"), you agree to be bound by these Terms of Service (\"Terms\"). If you do not agree to these Terms, do not use the App." },
                  { title:"2. Not Medical Advice", body:"NeuroThrive provides general wellness and nutritional information for educational purposes only. The App is not a medical device and does not diagnose, treat, cure, or prevent any disease or medical condition.\n\nNothing in this App constitutes medical advice, diagnosis, or treatment. The meal plans, supplement information, affirmations, and routines are for informational and educational purposes only.\n\nAlways seek the advice of a qualified healthcare professional — including your physician, psychiatrist, or registered dietitian — before making any changes to your diet, starting supplements, or modifying any existing treatment plan. This is especially important if you are taking medication or under the care of a mental health professional.\n\nUse of this App does not create a healthcare provider-patient relationship." },
                  { title:"3. Supplement Information", body:"Supplement information presented in the App is provided for educational reference only and is based on published nutritional neuroscience research. We do not recommend specific dosing. Individual needs, health conditions, and potential medication interactions vary greatly. Always consult your doctor or pharmacist before starting, stopping, or changing any supplement regimen." },
                  { title:"4. User Responsibility", body:"You are solely responsible for any decisions you make based on information provided in NeuroThrive. You acknowledge that:\n\n• The App provides general information, not personalized medical advice.\n• You should verify any information with a qualified healthcare professional.\n• You use the App at your own risk.\n• You are responsible for maintaining the confidentiality of your account credentials." },
                  { title:"5. Subscriptions & Auto-Renewal", body:"NeuroThrive Premium is a paid subscription service.\n\n• Monthly Plan: $9.99 USD per month, billed monthly.\n• Annual Plan: $59.99 USD per year, billed annually.\n\nSubscriptions automatically renew at the end of each billing period at the then-current price unless cancelled at least 24 hours before the end of the current period. You will be charged for renewal within 24 hours prior to the end of the current period.\n\nYou may cancel your subscription at any time. Cancellation takes effect at the end of your current billing period — you will retain access until then. No partial refunds are provided for unused portions of a billing period.\n\nWe reserve the right to change subscription pricing with at least 30 days' notice. Price changes will not affect your current billing period.\n\nTo manage or cancel your subscription, visit your account settings or contact support@neurothrive.app." },
                  { title:"6. Account Deletion", body:"You may delete your account and all associated data at any time using the \"Delete Account\" option in the App footer. Account deletion is immediate and permanent — all personal data, journal entries, meal plans, and progress data will be irreversibly removed from our servers. Active subscriptions should be cancelled separately before account deletion." },
                  { title:"7. Intellectual Property", body:"All content in NeuroThrive — including but not limited to meal plans, recipes, supplement information, affirmations, routines, exercise descriptions, design elements, and software code — is the exclusive property of NeuroThrive and is protected by copyright law. Unauthorized reproduction, distribution, modification, or commercial use is strictly prohibited." },
                  { title:"8. Limitation of Liability", body:"TO THE MAXIMUM EXTENT PERMITTED BY LAW, NeuroThrive and its owners, employees, and affiliates shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising from your use of or inability to use the App.\n\nThe App is provided \"AS IS\" and \"AS AVAILABLE\" without warranties of any kind, either express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, and non-infringement." },
                  { title:"9. Governing Law", body:"These Terms shall be governed by and construed in accordance with the laws of the United States. Any disputes arising from these Terms or the App shall be resolved in the courts of competent jurisdiction." },
                  { title:"10. Changes to Terms", body:"We may update these Terms from time to time. We will notify you of material changes by posting updated Terms in the App. Your continued use of the App after changes are posted constitutes acceptance of the revised Terms." },
                  { title:"11. Contact", body:"For questions about these Terms, please contact us at:\n\nEmail: support@neurothrive.app" },
                ].map((s, i) => (
                  <div key={i} style={{ marginBottom:"20px" }}>
                    <div style={{ color:"#7b9fff", fontSize:"13px", fontWeight:"700", marginBottom:"6px" }}>{s.title}</div>
                    <p style={{ color:"#c8ccf0", fontSize:"13px", lineHeight:1.8, margin:0, whiteSpace:"pre-line" }}>{s.body}</p>
                  </div>
                ))}
              </div>
            )}

            {legalPage === "privacy" && (
              <div>
                <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"28px", fontWeight:"300", color:"#eef0ff", marginBottom:"6px" }}>Privacy Policy</h2>
                <p style={{ color:"#7b9fff", fontSize:"11px", letterSpacing:"2px", textTransform:"uppercase", marginBottom:"28px" }}>Effective Date: March 13, 2026</p>
                {[
                  { title:"1. Introduction", body:"NeuroThrive (\"we,\" \"our,\" or \"us\") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application and related services (collectively, the \"App\"). By using the App, you agree to the collection and use of information in accordance with this policy. If you do not agree, please do not use the App." },
                  { title:"2. Information We Collect", body:"We collect the following categories of information:\n\n• Account Information: Email address and encrypted password (required for account creation and authentication).\n• Profile Information: Gender selection, selected mental health conditions, dietary preferences, and calorie target. You choose what to provide.\n• Usage Data: Mood and energy journal entries, daily meal check-ins, food log history, routine and exercise completion data, and app navigation state.\n• Meal Plan Data: Your generated 30-day meal plan, plan cycle number, and cycle start date.\n• Reminder Preferences: Your chosen reminder times and notification settings.\n• Payment Information: Subscription plan type and status. Full payment details (credit card numbers) are processed and stored exclusively by our payment processor and are never stored on our servers.\n\nWe do NOT collect: location data, device sensor data, contacts, photos, browsing history, advertising identifiers, or any data from Apple HealthKit or similar health frameworks." },
                  { title:"3. How We Use Your Information", body:"We use your information solely for the following purposes:\n\n• To personalize your experience: Your selected conditions and dietary preferences determine your meal plan, supplement guidance, exercise recommendations, and daily routines.\n• To save your progress: Journal entries, daily check-ins, and food logs are stored so you can track your wellness journey over time.\n• To manage your account: Email is used for authentication, password recovery, and important account communications.\n• To process payments: Subscription status determines access to premium features.\n• To improve the App: We may analyse aggregated, de-identified usage patterns to improve the App. Individual health data is never used for this purpose.\n\nWe do NOT use your data for advertising, marketing to third parties, data mining, or any purpose unrelated to providing and improving the App." },
                  { title:"4. Health Information", body:"NeuroThrive collects health-related information (selected mental health conditions, mood/energy ratings) that you voluntarily provide. This information is:\n\n• Used exclusively to personalize your in-app experience (meal plans, routines, supplements, affirmations).\n• Stored securely with encryption at rest and in transit.\n• Never shared with advertisers, data brokers, insurers, employers, or any third party for marketing or profiling purposes.\n• Never stored in iCloud or Apple HealthKit.\n• Not used to diagnose, treat, cure, or prevent any medical condition.\n\nYou may delete all health information at any time by deleting your account (see Section 8)." },
                  { title:"5. Third-Party Services", body:"We use the following third-party services to operate the App:\n\n• Supabase (Database & Authentication): Stores your account data and app content securely. Supabase provides enterprise-grade encryption at rest (AES-256) and in transit (TLS 1.2+). Supabase's privacy policy: https://supabase.com/privacy\n• Stripe (Payment Processing): Processes subscription payments. Stripe is PCI DSS Level 1 certified. NeuroThrive never receives or stores your full credit card number. Stripe's privacy policy: https://stripe.com/privacy\n• Netlify (Hosting & Serverless Functions): Hosts the App and processes server-side requests. Netlify's privacy policy: https://www.netlify.com/privacy\n• Google Fonts (Typography): Loads font files for display. No personal data is transmitted to Google through this service.\n\nWe do not share your personal data with any other third parties. We do not use any advertising SDKs, analytics trackers, or third-party AI services that process your personal data." },
                  { title:"6. Data Retention", body:"We retain your personal data for as long as your account is active. Specifically:\n\n• Account and profile data: Retained until you delete your account.\n• Journal entries, food logs, and check-in data: Retained until you delete your account.\n• Payment records: Retained as required by applicable tax and financial regulations (typically 7 years for transaction records).\n\nWhen you delete your account, all personal data stored in our database (profile, conditions, diet, journal entries, meal plans, daily checks, food logs) is permanently deleted. This action is irreversible." },
                  { title:"7. Data Security", body:"We implement industry-standard security measures to protect your data:\n\n• All data is encrypted at rest using AES-256 encryption.\n• All data in transit is protected by TLS 1.2 or higher.\n• Passwords are hashed and never stored in plain text.\n• Database access requires authenticated API keys.\n• We do not store payment card data on our servers.\n\nWhile we strive to protect your information, no method of electronic transmission or storage is 100% secure. We cannot guarantee absolute security." },
                  { title:"8. Your Rights & Account Deletion", body:"You have the following rights regarding your personal data:\n\n• Access: You can view all your data within the App at any time.\n• Correction: You can update your profile, conditions, and dietary preferences at any time.\n• Deletion: You can permanently delete your account and all associated data using the \"Delete Account\" button in the App footer. Account deletion is immediate and irreversible.\n• Data Portability: Contact us at support@neurothrive.app to request a copy of your data.\n• Withdraw Consent: You may stop using the App at any time. Deleting the App from your device does not delete your account — use the in-app deletion feature.\n\nFor users in the European Economic Area (EEA), you also have the right to lodge a complaint with your local data protection authority. For California residents, you have additional rights under the CCPA including the right to know, delete, and opt-out of the sale of personal information. We do not sell personal information." },
                  { title:"9. Children's Privacy", body:"NeuroThrive is intended for users aged 18 and older. We do not knowingly collect personal information from children under 18. If we learn that we have collected data from a child under 18, we will delete it promptly. If you believe a child has provided us with personal data, please contact us at support@neurothrive.app." },
                  { title:"10. International Data Transfers", body:"Your data may be transferred to and processed in the United States, where our service providers operate. By using the App, you consent to the transfer of your data to the United States. We ensure that all third-party processors provide adequate data protection measures." },
                  { title:"11. Changes to This Policy", body:"We may update this Privacy Policy from time to time. We will notify you of material changes by posting the updated policy in the App and updating the \"Effective Date\" above. Your continued use of the App after changes are posted constitutes acceptance of the revised policy. We encourage you to review this policy periodically." },
                  { title:"12. Contact Us", body:"If you have questions, concerns, or requests regarding this Privacy Policy or your personal data, please contact us at:\n\nEmail: support@neurothrive.app\n\nWe will respond to your inquiry within 30 days." },
                ].map((s, i) => (
                  <div key={i} style={{ marginBottom:"20px" }}>
                    <div style={{ color:"#7b9fff", fontSize:"13px", fontWeight:"700", marginBottom:"6px" }}>{s.title}</div>
                    <p style={{ color:"#c8ccf0", fontSize:"13px", lineHeight:1.8, margin:0, whiteSpace:"pre-line" }}>{s.body}</p>
                  </div>
                ))}
              </div>
            )}

            <button onClick={() => setLegalPage(null)} style={{ marginTop:"8px", width:"100%", padding:"14px", borderRadius:"50px", background:"linear-gradient(135deg,#5570f0,#4060e0)", color:"#fff", border:"none", fontSize:"14px", fontWeight:"600", cursor:"pointer", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>Close</button>
          </div>
        </div>
      )}

    </div>
  );
}

export default function NeuroThrive() {
  return <ErrorBoundary><NeuroThriveApp /></ErrorBoundary>;
}
