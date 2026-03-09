import { useState, useEffect } from "react";

const MENTAL_CONDITIONS = [
  { id: "adhd", label: "ADHD", emoji: "⚡" },
  { id: "anxiety", label: "Anxiety", emoji: "🌊" },
  { id: "depression", label: "Depression", emoji: "🌧️" },
  { id: "bipolar", label: "Bipolar Disorder", emoji: "🔄" },
  { id: "schizophrenia", label: "Schizophrenia", emoji: "🧩" },
  { id: "autism", label: "Autism Spectrum", emoji: "🌈" },
  { id: "ptsd", label: "PTSD", emoji: "🛡️" },
  { id: "did", label: "DID", emoji: "🪞" },
  { id: "bpd", label: "Borderline PD", emoji: "🌪️" },
  { id: "npd", label: "Narcissistic PD", emoji: "🎭" },
  { id: "hpd", label: "Histrionic PD", emoji: "🎪" },
  { id: "aspd", label: "Antisocial PD", emoji: "🔒" },
  { id: "ocd", label: "OCD", emoji: "🔁" },
  { id: "eating", label: "Eating Disorders", emoji: "🍃" },
  { id: "phobia", label: "Phobias", emoji: "😰" },
  { id: "bfrb", label: "Body-Focused Repetitive", emoji: "🌿" },
  { id: "ppd", label: "Paranoid PD", emoji: "👁️" },
  { id: "spd", label: "Schizoid PD", emoji: "🏔️" },
];

const DIETARY = [
  { id: "vegan", label: "Vegan", emoji: "🌱" },
  { id: "vegetarian", label: "Vegetarian", emoji: "🥦" },
  { id: "gluten_free", label: "Gluten-Free", emoji: "🌾" },
  { id: "dairy_free", label: "Dairy-Free", emoji: "🥛" },
  { id: "nut_free", label: "Nut-Free", emoji: "🥜" },
  { id: "shellfish_free", label: "Shellfish-Free", emoji: "🦐" },
  { id: "soy_free", label: "Soy-Free", emoji: "🫘" },
  { id: "egg_free", label: "Egg-Free", emoji: "🥚" },
  { id: "corn_free", label: "Corn-Free", emoji: "🌽" },
  { id: "low_sugar", label: "Low Sugar", emoji: "🍬" },
  { id: "low_sodium", label: "Low Sodium", emoji: "🧂" },
  { id: "keto", label: "Keto", emoji: "🥑" },
  { id: "pork_free", label: "Pork-Free", emoji: "🚫" },
  { id: "rice_free", label: "Rice-Free", emoji: "🌾" },
  { id: "halal", label: "Halal", emoji: "☪️" },
  { id: "kosher", label: "Kosher", emoji: "✡️" },
];

// Each meal has tags for filtering
// Tags: egg, dairy, gluten, nuts, shellfish, soy, meat, fish, high_sugar, high_sodium, high_carb
const ALL_MEALS = {
  breakfast: [
    // ADHD — protein + fruit formula, heavy fruit variety
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
    { name: "Ground Beef Breakfast Bowl with Cherries & Orange Slices", tags: ["meat"], conditions: ["adhd","default"] },
    { name: "Chicken Sausage with Sliced Nectarine & Mixed Berries", tags: ["meat"], conditions: ["adhd","default"] },
    { name: "Turkey Patties with Sliced Kiwi, Mango & Pineapple Bowl", tags: ["meat"], conditions: ["adhd","default"] },
    { name: "Sirloin Strips with Watermelon, Mint & Lime Side", tags: ["meat"], conditions: ["adhd","default"] },
    { name: "Chicken Thigh with Grilled Pineapple & Coconut Flakes", tags: ["meat"], conditions: ["adhd","default"] },
    { name: "Ground Turkey with Papaya, Lime & Blueberry Bowl", tags: ["meat"], conditions: ["adhd","default"] },
    { name: "Steak & Veggie Hash with Fresh Peach & Raspberry Side", tags: ["meat"], conditions: ["adhd","default"] },
    { name: "Chicken Sausage with Sliced Plum & Honeydew Melon", tags: ["meat"], conditions: ["adhd","default"] },
    { name: "Turkey Sauté with Strawberry, Banana & Sunflower Seeds", tags: ["meat"], conditions: ["adhd","default"] },
    // Anxiety
    { name: "Banana Oatmeal with Honey & Cinnamon", tags: ["gluten"], conditions: ["anxiety","default"] },
    { name: "Avocado & Egg Toast on Sourdough", tags: ["egg","gluten"], conditions: ["anxiety","default"] },
    { name: "Blueberry Greek Yogurt Parfait", tags: ["dairy"], conditions: ["anxiety","default"] },
    { name: "Warm Oatmeal with Sliced Banana & Walnuts", tags: ["gluten","nuts"], conditions: ["anxiety","default"] },
    { name: "Smoothie Bowl with Spinach, Banana & Granola", tags: ["gluten"], conditions: ["anxiety","depression","default"] },
    { name: "Whole Grain Pancakes with Sliced Strawberries & Honey", tags: ["egg","gluten","dairy"], conditions: ["anxiety","default"] },
    { name: "Banana Smoothie with Almond Milk & Chia Seeds", tags: ["nuts"], conditions: ["anxiety","default"] },
    { name: "Avocado Toast with Sliced Tomato & Microgreens", tags: ["gluten"], conditions: ["anxiety","depression","default"] },
    { name: "Berry Chia Pudding with Almond Milk", tags: ["nuts"], conditions: ["anxiety","default"] },
    { name: "Mango Smoothie Bowl with Hemp Seeds", tags: [], conditions: ["anxiety","default"] },
    { name: "Grilled Chicken & Spinach Breakfast Wrap", tags: ["gluten","meat"], conditions: ["anxiety","default"] },
    // Depression
    { name: "Spinach & Mushroom Omelette with Toast", tags: ["egg","gluten"], conditions: ["depression","default"] },
    { name: "Whole Grain Pancakes with Fresh Berries", tags: ["egg","gluten","dairy"], conditions: ["depression","default"] },
    { name: "Greek Yogurt Bowl with Granola & Banana", tags: ["dairy","gluten"], conditions: ["depression","anxiety","default"] },
    { name: "Oatmeal with Sliced Banana & Chia Seeds", tags: ["gluten"], conditions: ["depression","bipolar","default"] },
    { name: "Veggie Omelette with Whole Grain Toast & OJ", tags: ["egg","gluten"], conditions: ["depression","schizophrenia","default"] },
    { name: "Turkey & Veggie Breakfast Skillet", tags: ["meat"], conditions: ["depression","default"] },
    { name: "Chicken Sausage with Roasted Peppers & Zucchini", tags: ["meat"], conditions: ["depression","default"] },
    { name: "Lentil & Veggie Breakfast Bowl", tags: [], conditions: ["depression","anxiety","default"] },
    // Bipolar
    { name: "Oatmeal with Flaxseed, Berries & Honey", tags: ["gluten"], conditions: ["bipolar","default"] },
    { name: "Scrambled Eggs & Whole Grain Toast with Sliced Banana", tags: ["egg","gluten"], conditions: ["bipolar","default"] },
    { name: "Smoothie Bowl with Spinach, Mango & Granola", tags: ["gluten"], conditions: ["bipolar","default"] },
    { name: "Whole Grain Toast with Avocado & Poached Egg", tags: ["egg","gluten"], conditions: ["bipolar","default"] },
    { name: "Banana Oat Pancakes with Maple Syrup & Blueberries", tags: ["egg","gluten","dairy"], conditions: ["bipolar","bpd","default"] },
    { name: "Overnight Oats with Chia, Banana & Almond Milk", tags: ["gluten","nuts"], conditions: ["bipolar","default"] },
    { name: "Quinoa Porridge with Berries & Honey", tags: [], conditions: ["bipolar","default"] },
    { name: "Turkey Sausage with Roasted Sweet Potato Hash", tags: ["meat"], conditions: ["bipolar","default"] },
    { name: "Chia Seed Pudding with Mango & Coconut", tags: [], conditions: ["bipolar","anxiety","default"] },
    // Schizophrenia
    { name: "Oatmeal with Walnuts & Blueberries", tags: ["gluten","nuts"], conditions: ["schizophrenia","default"] },
    { name: "Whole Grain Cereal with Milk & Sliced Banana", tags: ["gluten","dairy"], conditions: ["schizophrenia","default"] },
    { name: "Greek Yogurt Parfait with Granola & Berries", tags: ["dairy","gluten"], conditions: ["schizophrenia","ptsd","default"] },
    // PTSD
    { name: "Warm Oatmeal with Banana & Honey", tags: ["gluten"], conditions: ["ptsd","did","default"] },
    { name: "Smoothie with Spinach, Banana & Almond Milk", tags: ["nuts"], conditions: ["ptsd","default"] },
    { name: "Whole Grain Toast with Peanut Butter & Sliced Banana", tags: ["gluten","nuts"], conditions: ["ptsd","ocd","default"] },
    { name: "Oatmeal with Cinnamon, Apple & Walnuts", tags: ["gluten","nuts"], conditions: ["ptsd","ocd","default"] },
    // DID
    { name: "Egg & Cheese Breakfast Burrito", tags: ["egg","dairy","gluten"], conditions: ["did","default"] },
    { name: "Oatmeal with Brown Sugar & Cinnamon", tags: ["gluten"], conditions: ["did","default"] },
    { name: "Smoothie with Banana, Peanut Butter & Oat Milk", tags: ["gluten","nuts"], conditions: ["did","default"] },
    { name: "Overnight Oats with Banana & Almond Butter", tags: ["gluten","nuts"], conditions: ["did","bpd","default"] },
    // BPD
    { name: "Eggs Any Style with Whole Grain Toast & Fruit", tags: ["egg","gluten"], conditions: ["bpd","default"] },
    { name: "Greek Yogurt with Granola & Fresh Berries", tags: ["dairy","gluten"], conditions: ["bpd","anxiety","default"] },
    { name: "Overnight Oats with Chia & Mixed Berries", tags: ["gluten"], conditions: ["bpd","ocd","default"] },
    { name: "Whole Grain Waffles with Sliced Strawberries & Honey", tags: ["egg","gluten","dairy"], conditions: ["bpd","default"] },
    // OCD
    { name: "Whole Grain Toast with Peanut Butter & Banana", tags: ["gluten","nuts"], conditions: ["ocd","default"] },
    { name: "Scrambled Eggs & Avocado on Toast", tags: ["egg","gluten"], conditions: ["ocd","default"] },
    { name: "Greek Yogurt Parfait with Granola & Blueberries", tags: ["dairy","gluten"], conditions: ["ocd","default"] },
    { name: "Overnight Oats with Chia, Berries & Honey", tags: ["gluten"], conditions: ["ocd","default"] },
    // Autism
    { name: "Plain Scrambled Eggs with Toast", tags: ["egg","gluten"], conditions: ["autism","default"] },
    { name: "Smooth Peanut Butter Oatmeal", tags: ["gluten","nuts"], conditions: ["autism","default"] },
    { name: "Banana & Vanilla Yogurt Parfait", tags: ["dairy"], conditions: ["autism","default"] },
    { name: "Oatmeal with Honey & Sliced Banana", tags: ["gluten"], conditions: ["autism","default"] },
    { name: "Pancakes with Maple Syrup & Sliced Banana", tags: ["egg","gluten","dairy"], conditions: ["autism","default"] },
    { name: "Soft Scrambled Eggs with Buttered Toast", tags: ["egg","gluten","dairy"], conditions: ["autism","default"] },
  ],
  lunch: [
    // ADHD — fruit sides emphasized
    { name: "Grilled Chicken Breast with Watermelon & Feta Salad", tags: ["dairy","meat"], conditions: ["adhd","default"] },
    { name: "Turkey Lettuce Wraps with Pineapple Salsa", tags: ["meat"], conditions: ["adhd","default"] },
    { name: "Beef & Veggie Stir-Fry with Orange Slices on the Side", tags: ["meat"], conditions: ["adhd","default"] },
    { name: "Grilled Chicken Salad with Strawberries & Balsamic Vinaigrette", tags: ["meat"], conditions: ["adhd","default"] },
    { name: "Turkey & Avocado Wrap with a Side of Sliced Mango", tags: ["meat","gluten"], conditions: ["adhd","default"] },
    { name: "Ground Beef Taco Bowl with Fresh Pico de Gallo & Mango Salsa", tags: ["meat"], conditions: ["adhd","default"] },
    { name: "Grilled Chicken Caesar Salad with Mandarin Oranges", tags: ["meat","dairy"], conditions: ["adhd","default"] },
    { name: "Steak & Arugula Salad with Sliced Peaches & Lemon Dressing", tags: ["meat"], conditions: ["adhd","default"] },
    { name: "Chicken & Mango Brown Rice Bowl", tags: ["meat"], conditions: ["adhd","default"] },
    { name: "Turkey & Strawberry Spinach Salad with Balsamic", tags: ["meat"], conditions: ["adhd","default"] },
    { name: "Beef Lettuce Tacos with Pineapple Salsa & Lime", tags: ["meat"], conditions: ["adhd","default"] },
    { name: "Chicken Thigh Bowl with Blueberry & Cucumber Salad", tags: ["meat"], conditions: ["adhd","default"] },
    { name: "Turkey & Avocado Bowl with Sliced Kiwi on the Side", tags: ["meat"], conditions: ["adhd","default"] },
    { name: "Grilled Chicken Sandwich with Sliced Peach & Arugula", tags: ["meat","gluten"], conditions: ["adhd","default"] },
    // Anxiety
    { name: "Grilled Chicken & Spinach Salad", tags: ["meat"], conditions: ["anxiety","default"] },
    { name: "Turkey & Veggie Soup with Whole Grain Roll", tags: ["meat","gluten"], conditions: ["anxiety","default"] },
    { name: "Grilled Chicken Wrap with Avocado & Lettuce", tags: ["meat","gluten"], conditions: ["anxiety","default"] },
    { name: "Turkey & Avocado Salad with Lemon Dressing", tags: ["meat"], conditions: ["anxiety","default"] },
    { name: "Chicken & Veggie Soup with Crusty Bread", tags: ["meat","gluten"], conditions: ["anxiety","depression","default"] },
    { name: "Lentil & Roasted Veggie Bowl", tags: [], conditions: ["anxiety","depression","default"] },
    { name: "Chickpea & Spinach Salad with Lemon Tahini", tags: [], conditions: ["anxiety","default"] },
    { name: "Veggie & Black Bean Burrito Bowl", tags: [], conditions: ["anxiety","depression","default"] },
    { name: "Butternut Squash Soup with Crusty Bread", tags: ["gluten"], conditions: ["anxiety","default"] },
    // Depression
    { name: "BLT Wrap with Avocado", tags: ["meat","gluten","dairy"], conditions: ["depression","default"] },
    { name: "Turkey & Avocado Club Sandwich", tags: ["meat","gluten"], conditions: ["depression","ptsd","ocd","default"] },
    { name: "Grilled Chicken Caesar Salad", tags: ["meat","dairy"], conditions: ["depression","ptsd","ocd","default"] },
    { name: "Turkey & Lentil Soup with Whole Grain Roll", tags: ["meat","gluten"], conditions: ["depression","default"] },
    { name: "Roasted Veggie & Quinoa Salad", tags: [], conditions: ["depression","anxiety","default"] },
    { name: "White Bean & Kale Soup", tags: [], conditions: ["depression","default"] },
    // Bipolar
    { name: "Grilled Chicken & Brown Rice Bowl", tags: ["meat"], conditions: ["bipolar","default"] },
    { name: "Turkey & Cheese Sandwich on Whole Grain Bread", tags: ["meat","gluten","dairy"], conditions: ["bipolar","default"] },
    { name: "Grilled Chicken Salad with Strawberries & Balsamic", tags: ["meat"], conditions: ["bipolar","default"] },
    { name: "Turkey & Veggie Wrap with Side Fruit", tags: ["meat","gluten"], conditions: ["bipolar","default"] },
    { name: "Chicken & Lentil Soup with Crusty Bread", tags: ["meat","gluten"], conditions: ["bipolar","default"] },
    // Schizophrenia
    { name: "Grilled Chicken Sandwich with Side Salad", tags: ["meat","gluten"], conditions: ["schizophrenia","default"] },
    { name: "Tomato Soup with Grilled Cheese on Whole Grain", tags: ["gluten","dairy"], conditions: ["schizophrenia","did","default"] },
    { name: "Turkey Wrap with Spinach & Avocado", tags: ["meat","gluten"], conditions: ["schizophrenia","default"] },
    { name: "Chicken & Veggie Soup with Whole Grain Roll", tags: ["meat","gluten"], conditions: ["schizophrenia","ptsd","default"] },
    // PTSD
    { name: "Grilled Chicken & Avocado Salad", tags: ["meat"], conditions: ["ptsd","default"] },
    { name: "Turkey & Veggie Wrap with Greek Yogurt Dip", tags: ["meat","gluten","dairy"], conditions: ["ptsd","default"] },
    // DID
    { name: "Classic Grilled Chicken Sandwich with Sweet Potato Fries", tags: ["meat","gluten"], conditions: ["did","default"] },
    { name: "Turkey & Cheese Wrap with Apple", tags: ["meat","gluten","dairy"], conditions: ["did","default"] },
    { name: "Grilled Chicken BLT Sandwich", tags: ["meat","gluten","dairy"], conditions: ["did","default"] },
    { name: "Turkey & Avocado Wrap with Side Fruit", tags: ["meat","gluten"], conditions: ["did","default"] },
    { name: "Chicken Noodle Soup with Whole Grain Roll", tags: ["meat","gluten"], conditions: ["did","default"] },
    // BPD
    { name: "Grilled Chicken Salad with Lemon Vinaigrette", tags: ["meat"], conditions: ["bpd","default"] },
    { name: "Turkey Club Sandwich with Side Salad", tags: ["meat","gluten","dairy"], conditions: ["bpd","default"] },
    { name: "Grilled Chicken & Avocado Wrap", tags: ["meat","gluten"], conditions: ["bpd","default"] },
    { name: "Turkey & Spinach Salad with Balsamic Dressing", tags: ["meat"], conditions: ["bpd","default"] },
    { name: "Grilled Chicken Caesar Wrap", tags: ["meat","gluten","dairy"], conditions: ["bpd","ocd","default"] },
    // OCD
    { name: "Grilled Chicken & Veggie Wrap", tags: ["meat","gluten"], conditions: ["ocd","default"] },
    { name: "Turkey Soup with Whole Grain Roll", tags: ["meat","gluten"], conditions: ["ocd","default"] },
    { name: "Turkey & Avocado Wrap with Side Salad", tags: ["meat","gluten"], conditions: ["ocd","default"] },
    // Autism
    { name: "Grilled Chicken Strips with Mac & Cheese", tags: ["meat","gluten","dairy"], conditions: ["autism","default"] },
    { name: "Plain Turkey Sandwich on Whole Grain Bread", tags: ["meat","gluten"], conditions: ["autism","default"] },
    { name: "Buttered Pasta with Mild Chicken", tags: ["meat","gluten","dairy"], conditions: ["autism","default"] },
    { name: "Chicken Nuggets with Plain Rice & Corn", tags: ["meat","corn","gluten"], conditions: ["autism","default"] },
    { name: "Grilled Cheese Sandwich with Plain Chicken Soup", tags: ["meat","gluten","dairy"], conditions: ["autism","default"] },
    { name: "Turkey & Cheese Roll-Up with Apple Slices", tags: ["meat","dairy"], conditions: ["autism","default"] },
    { name: "Plain Pasta with Mild Tomato Sauce & Chicken", tags: ["meat","gluten"], conditions: ["autism","default"] },
  ],
  dinner: [
    // ADHD — fruit glazes, salsas, fruit sides
    { name: "Pan-Seared Steak with Roasted Sweet Potato & Fresh Blueberry Side", tags: ["meat"], conditions: ["adhd","default"] },
    { name: "Baked Chicken Thighs with Roasted Pineapple & Quinoa", tags: ["meat"], conditions: ["adhd","default"] },
    { name: "Sirloin Steak with Grilled Peaches & Asparagus", tags: ["meat"], conditions: ["adhd","default"] },
    { name: "Grilled Chicken Thighs with Blueberry Balsamic Glaze & Roasted Veggies", tags: ["meat"], conditions: ["adhd","default"] },
    { name: "Ribeye Steak with Roasted Broccoli & Mango Salsa", tags: ["meat"], conditions: ["adhd","default"] },
    { name: "Chicken Thighs with Cherry Tomato Sauce & Quinoa", tags: ["meat"], conditions: ["adhd","default"] },
    { name: "Beef & Mango Stir-Fry with Brown Rice", tags: ["meat"], conditions: ["adhd","default"] },
    { name: "Grilled Chicken with Peach & Arugula Salad", tags: ["meat"], conditions: ["adhd","default"] },
    { name: "Turkey Meatballs with Zucchini Noodles & Strawberry Caprese Side", tags: ["meat","dairy"], conditions: ["adhd","default"] },
    { name: "Steak Tacos with Pineapple Salsa & Avocado", tags: ["meat"], conditions: ["adhd","default"] },
    { name: "Baked Chicken Breast with Watermelon & Cucumber Side Salad", tags: ["meat"], conditions: ["adhd","default"] },
    { name: "Ground Beef Bowl with Roasted Sweet Potato & Sliced Kiwi Side", tags: ["meat"], conditions: ["adhd","default"] },
    { name: "Grilled Turkey Patties with Grilled Peach & Spinach Salad", tags: ["meat"], conditions: ["adhd","default"] },
    { name: "Chicken Thigh with Roasted Pineapple, Peppers & Brown Rice", tags: ["meat"], conditions: ["adhd","default"] },
    { name: "Sirloin with Blueberry Reduction Sauce & Roasted Asparagus", tags: ["meat"], conditions: ["adhd","default"] },
    // Anxiety
    { name: "Baked Chicken Breast with Roasted Veggies", tags: ["meat"], conditions: ["anxiety","default"] },
    { name: "Lean Ground Turkey Taco Bowls", tags: ["meat"], conditions: ["anxiety","default"] },
    { name: "Grilled Chicken Thighs with Roasted Zucchini & Rice", tags: ["meat"], conditions: ["anxiety","default"] },
    { name: "Lean Ground Beef Stir-Fry with Mixed Veggies & Brown Rice", tags: ["meat"], conditions: ["anxiety","default"] },
    { name: "Oven-Roasted Chicken Breast with Cauliflower Mash", tags: ["meat"], conditions: ["anxiety","default"] },
    { name: "Roasted Veggie & Chickpea Curry with Brown Rice", tags: [], conditions: ["anxiety","depression","default"] },
    { name: "Black Bean & Sweet Potato Tacos", tags: [], conditions: ["anxiety","depression","default"] },
    // Depression
    { name: "Grilled Steak with Roasted Potatoes & Broccoli", tags: ["meat"], conditions: ["depression","bipolar","default"] },
    { name: "Lemon Herb Chicken with Rice Pilaf", tags: ["meat"], conditions: ["depression","default"] },
    { name: "Ground Beef & Vegetable Stew with Crusty Bread", tags: ["meat","gluten"], conditions: ["depression","default"] },
    { name: "Baked Chicken Thighs with Roasted Root Vegetables", tags: ["meat"], conditions: ["depression","schizophrenia","default"] },
    { name: "Lentil Soup with Whole Grain Bread", tags: ["gluten"], conditions: ["depression","anxiety","default"] },
    // Bipolar
    { name: "Oven-Baked Chicken Thighs with Roasted Root Vegetables", tags: ["meat"], conditions: ["bipolar","default"] },
    { name: "Lean Ground Beef Tacos with Black Beans", tags: ["meat"], conditions: ["bipolar","default"] },
    { name: "Sirloin Steak with Roasted Potatoes & Green Beans", tags: ["meat"], conditions: ["bipolar","bpd","default"] },
    { name: "Baked Chicken Breast with Quinoa & Roasted Zucchini", tags: ["meat"], conditions: ["bipolar","default"] },
    { name: "Ground Turkey Stuffed Bell Peppers with Brown Rice", tags: ["meat"], conditions: ["bipolar","default"] },
    { name: "Chicken & White Bean Stew", tags: ["meat"], conditions: ["bipolar","default"] },
    // Schizophrenia
    { name: "Baked Chicken Breast with Roasted Veggies & Brown Rice", tags: ["meat"], conditions: ["schizophrenia","default"] },
    { name: "Lean Beef Stir-Fry with Mixed Veggies & Noodles", tags: ["meat","gluten"], conditions: ["schizophrenia","default"] },
    { name: "Grilled Chicken Thighs with Roasted Sweet Potato", tags: ["meat"], conditions: ["schizophrenia","default"] },
    { name: "Ground Beef Pasta with Marinara & Side Salad", tags: ["meat","gluten"], conditions: ["schizophrenia","default"] },
    // PTSD
    { name: "Baked Lemon Herb Chicken with Roasted Potatoes", tags: ["meat"], conditions: ["ptsd","default"] },
    { name: "Grilled Steak & Veggie Skewers with Rice", tags: ["meat"], conditions: ["ptsd","default"] },
    { name: "Baked Chicken Thighs with Roasted Sweet Potato & Broccoli", tags: ["meat"], conditions: ["ptsd","default"] },
    { name: "Lean Beef Tacos with Avocado & Pico de Gallo", tags: ["meat"], conditions: ["ptsd","default"] },
    { name: "Oven-Roasted Chicken with Root Vegetables & Quinoa", tags: ["meat"], conditions: ["ptsd","default"] },
    // DID
    { name: "Baked Chicken with Mashed Potatoes & Green Beans", tags: ["meat"], conditions: ["did","default"] },
    { name: "Ground Beef Pasta with Marinara Sauce", tags: ["meat","gluten"], conditions: ["did","default"] },
    { name: "Grilled Steak with Mashed Potatoes & Green Beans", tags: ["meat"], conditions: ["did","default"] },
    { name: "Ground Turkey Taco Bowl with Brown Rice & Beans", tags: ["meat"], conditions: ["did","default"] },
    { name: "Baked Chicken Breast with Sweet Potato & Corn", tags: ["meat","corn"], conditions: ["did","default"] },
    // BPD
    { name: "Grilled Steak with Roasted Sweet Potato & Broccoli", tags: ["meat"], conditions: ["bpd","default"] },
    { name: "Baked Chicken Thighs with Garlic Mashed Potatoes", tags: ["meat","dairy"], conditions: ["bpd","default"] },
    { name: "Ground Beef Burrito Bowl with Brown Rice & Avocado", tags: ["meat"], conditions: ["bpd","default"] },
    { name: "Baked Chicken Thighs with Roasted Cauliflower & Wild Rice", tags: ["meat"], conditions: ["bpd","default"] },
    // OCD
    { name: "Oven-Roasted Chicken with Vegetables & Quinoa", tags: ["meat"], conditions: ["ocd","default"] },
    { name: "Lean Beef Stir-Fry with Noodles & Mixed Veggies", tags: ["meat","gluten"], conditions: ["ocd","default"] },
    { name: "Chicken & Veggie Stir-Fry with Brown Rice", tags: ["meat"], conditions: ["ocd","default"] },
    { name: "Grilled Steak with Roasted Potatoes & Asparagus", tags: ["meat"], conditions: ["ocd","default"] },
    { name: "Baked Chicken Thighs with Wild Rice & Broccoli", tags: ["meat"], conditions: ["ocd","default"] },
    // Autism
    { name: "Baked Chicken Tenders with Rice & Corn", tags: ["meat","corn"], conditions: ["autism","default"] },
    { name: "Mild Beef Meatballs with Pasta & Butter", tags: ["meat","gluten","dairy"], conditions: ["autism","default"] },
    { name: "Ground Beef & Noodle Casserole", tags: ["meat","gluten"], conditions: ["autism","default"] },
    { name: "Mild Chicken Stir-Fry with Plain Noodles", tags: ["meat","gluten"], conditions: ["autism","default"] },
    { name: "Baked Chicken Breast with Corn & Mashed Potatoes", tags: ["meat","corn","dairy"], conditions: ["autism","default"] },
    // Salmon stays for conditions that specifically benefit
    { name: "Grilled Salmon with Asparagus & Quinoa", tags: ["fish"], conditions: ["anxiety","default"] },
    { name: "Baked Salmon with Mashed Sweet Potato & Green Beans", tags: ["fish"], conditions: ["depression","default"] },
    { name: "Pan-Seared Salmon with Quinoa & Roasted Asparagus", tags: ["fish"], conditions: ["depression","ptsd","ocd","default"] },
    { name: "Baked Salmon with Sweet Potato & Green Beans", tags: ["fish"], conditions: ["anxiety","default"] },
    { name: "Grilled Salmon with Brown Rice & Steamed Broccoli", tags: ["fish"], conditions: ["ocd","bipolar","default"] },
    { name: "Lemon Butter Salmon with Rice & Snap Peas", tags: ["fish","dairy"], conditions: ["bpd","default"] },
  ],
  snacks: [
    // ADHD — fruit + protein combos
    { name: "Apple Slices + Sliced Deli Turkey Roll-Ups", tags: ["meat"], conditions: ["adhd","default"] },
    { name: "Banana + Chicken Jerky", tags: ["meat"], conditions: ["adhd","default"] },
    { name: "Watermelon Chunks + Sunflower Seeds", tags: [], conditions: ["adhd","default"] },
    { name: "Orange Slices + Hard-Boiled Egg", tags: ["egg"], conditions: ["adhd","default"] },
    { name: "Cherries + Beef Jerky", tags: ["meat"], conditions: ["adhd","default"] },
    { name: "Mango Slices + Sliced Deli Turkey", tags: ["meat"], conditions: ["adhd","default"] },
    { name: "Mixed Berry Bowl + a Small Handful of Walnuts", tags: ["nuts"], conditions: ["adhd","default"] },
    { name: "Pineapple Chunks + Turkey Strips", tags: ["meat"], conditions: ["adhd","default"] },
    { name: "Peach Slices + Beef Jerky", tags: ["meat"], conditions: ["adhd","default"] },
    { name: "Grapes + Deli Turkey Slices", tags: ["meat"], conditions: ["adhd","default"] },
    { name: "Kiwi + Hard-Boiled Egg", tags: ["egg"], conditions: ["adhd","default"] },
    { name: "Strawberries + Sliced Chicken Strips", tags: ["meat"], conditions: ["adhd","default"] },
    { name: "Frozen Berries (thawed) + Sunflower Seeds", tags: [], conditions: ["adhd","default"] },
    { name: "Honeydew Melon + Deli Turkey Roll-Ups", tags: ["meat"], conditions: ["adhd","default"] },
    { name: "Papaya Chunks + Beef Jerky", tags: ["meat"], conditions: ["adhd","default"] },
    { name: "Banana with Almond Butter", tags: ["nuts"], conditions: ["adhd","anxiety","default"] },
    // Anxiety
    { name: "Celery & Hummus", tags: [], conditions: ["anxiety","default"] },
    { name: "Handful of Cashews & Dried Cranberries", tags: ["nuts"], conditions: ["anxiety","default"] },
    { name: "Greek Yogurt with Honey & Berries", tags: ["dairy"], conditions: ["anxiety","depression","default"] },
    { name: "Chamomile Tea & Whole Grain Crackers", tags: ["gluten"], conditions: ["anxiety","default"] },
    { name: "Kiwi Slices + a Handful of Almonds", tags: ["nuts"], conditions: ["anxiety","default"] },
    { name: "Cucumber Slices & Hummus", tags: [], conditions: ["anxiety","default"] },
    { name: "Rice Cakes with Avocado", tags: [], conditions: ["anxiety","default"] },
    { name: "Coconut Yogurt with Berries", tags: [], conditions: ["anxiety","depression","default"] },
    // Depression
    { name: "Dark Chocolate & Strawberries", tags: [], conditions: ["depression","default"] },
    { name: "Peanut Butter on Whole Grain Crackers", tags: ["gluten","nuts"], conditions: ["depression","default"] },
    { name: "Mango & Mixed Berries", tags: [], conditions: ["depression","default"] },
    { name: "Banana with Walnut Butter", tags: ["nuts"], conditions: ["depression","default"] },
    { name: "Trail Mix with Dark Chocolate Chips", tags: ["nuts"], conditions: ["depression","adhd","default"] },
    { name: "Apple Slices & Almond Butter", tags: ["nuts"], conditions: ["depression","ptsd","default"] },
    { name: "Dates & Pumpkin Seeds", tags: [], conditions: ["depression","default"] },
    { name: "Sliced Pear & Sunflower Seed Butter", tags: [], conditions: ["depression","anxiety","default"] },
    { name: "Roasted Chickpeas", tags: [], conditions: ["depression","anxiety","default"] },
    // Bipolar
    { name: "Apple & Peanut Butter", tags: ["nuts"], conditions: ["bipolar","default"] },
    { name: "Hummus with Carrot & Cucumber Sticks", tags: [], conditions: ["bipolar","anxiety","default"] },
    { name: "Banana with a Handful of Walnuts", tags: ["nuts"], conditions: ["bipolar","default"] },
    { name: "Greek Yogurt with Mixed Berries", tags: ["dairy"], conditions: ["bipolar","default"] },
    { name: "Apple Slices & Cheese", tags: ["dairy"], conditions: ["bipolar","default"] },
    { name: "Edamame with Sea Salt", tags: ["soy"], conditions: ["bipolar","default"] },
    { name: "Baby Carrots & Guacamole", tags: [], conditions: ["bipolar","anxiety","default"] },
    // Schizophrenia
    { name: "Walnuts & Apple Slices", tags: ["nuts"], conditions: ["schizophrenia","default"] },
    { name: "Yogurt with Honey & Granola", tags: ["dairy","gluten"], conditions: ["schizophrenia","default"] },
    { name: "Whole Grain Crackers with Cheese", tags: ["gluten","dairy"], conditions: ["schizophrenia","ocd","default"] },
    { name: "Banana & Peanut Butter", tags: ["nuts"], conditions: ["schizophrenia","did","bpd","ocd","default"] },
    { name: "Mixed Nuts & Dried Fruit", tags: ["nuts"], conditions: ["schizophrenia","bpd","default"] },
    { name: "Orange Slices & Almonds", tags: ["nuts"], conditions: ["schizophrenia","bpd","default"] },
    // PTSD
    { name: "Chamomile Tea & Honey with Whole Grain Toast", tags: ["gluten"], conditions: ["ptsd","default"] },
    { name: "Mixed Berries with a Dollop of Yogurt", tags: ["dairy"], conditions: ["ptsd","default"] },
    { name: "Handful of Almonds", tags: ["nuts"], conditions: ["ptsd","default"] },
    { name: "Banana & a Few Walnuts", tags: ["nuts"], conditions: ["ptsd","default"] },
    { name: "Trail Mix with Dried Mango", tags: ["nuts"], conditions: ["ptsd","default"] },
    // DID
    { name: "Peanut Butter & Jelly on Whole Grain Bread", tags: ["gluten","nuts"], conditions: ["did","default"] },
    { name: "Cheese & Crackers", tags: ["dairy","gluten"], conditions: ["did","default"] },
    { name: "Banana & a Glass of Milk", tags: ["dairy"], conditions: ["did","autism","default"] },
    { name: "Apple Slices & Peanut Butter", tags: ["nuts"], conditions: ["did","autism","ocd","default"] },
    { name: "Greek Yogurt with Honey", tags: ["dairy"], conditions: ["did","bpd","ocd","default"] },
    { name: "Celery & Peanut Butter", tags: ["nuts"], conditions: ["did","bipolar","default"] },
    // Autism
    { name: "Sliced Banana", tags: [], conditions: ["autism","default"] },
    { name: "Plain Crackers with Peanut Butter", tags: ["gluten","nuts"], conditions: ["autism","default"] },
    { name: "Cheese Cubes & Apple Slices", tags: ["dairy"], conditions: ["autism","default"] },
    { name: "Sliced Strawberries", tags: [], conditions: ["autism","default"] },
    { name: "Vanilla Yogurt & Granola", tags: ["dairy","gluten"], conditions: ["autism","default"] },
    { name: "Peeled Orange Slices", tags: [], conditions: ["autism","default"] },
  ],
};

// Dietary restriction tag mapping: which tags to EXCLUDE for each restriction
const DIET_EXCLUSIONS = {
  vegan: ["egg", "dairy", "meat", "fish", "shellfish"],
  vegetarian: ["meat", "fish", "shellfish"],
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
  halal: ["pork"],
  kosher: ["pork"],
};

const filterMeals = (meals, selectedDiet, condition) => {
  const excludedTags = new Set();
  selectedDiet.forEach(d => {
    (DIET_EXCLUSIONS[d] || []).forEach(t => excludedTags.add(t));
  });
  const conditionId = condition || "default";
  return meals.filter(m => {
    const hasExcluded = m.tags.some(t => excludedTags.has(t));
    if (hasExcluded) return false;
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
  schizophrenia:{ breakfast: "Oatmeal with Walnuts & Blueberries", lunch: "Grilled Chicken Sandwich with Side Salad", dinner: "Baked Chicken Breast with Roasted Veggies & Brown Rice", snacks: "Walnuts & Apple Slices" },
  autism:      { breakfast: "Plain Scrambled Eggs with Toast", lunch: "Grilled Chicken Strips with Mac & Cheese", dinner: "Baked Chicken Tenders with Rice & Corn", snacks: "Sliced Banana" },
  ptsd:        { breakfast: "Warm Oatmeal with Banana & Honey", lunch: "Grilled Chicken & Avocado Salad", dinner: "Baked Lemon Herb Chicken with Roasted Potatoes", snacks: "Mixed Berries with a Dollop of Yogurt" },
  did:         { breakfast: "Egg & Cheese Breakfast Burrito", lunch: "Classic Grilled Chicken Sandwich with Sweet Potato Fries", dinner: "Baked Chicken with Mashed Potatoes & Green Beans", snacks: "Banana & a Glass of Milk" },
  bpd:         { breakfast: "Eggs Any Style with Whole Grain Toast & Fruit", lunch: "Grilled Chicken Salad with Lemon Vinaigrette", dinner: "Grilled Steak with Roasted Sweet Potato & Broccoli", snacks: "Greek Yogurt with Honey" },
  ocd:         { breakfast: "Whole Grain Toast with Peanut Butter & Banana", lunch: "Grilled Chicken & Veggie Wrap", dinner: "Oven-Roasted Chicken with Vegetables & Quinoa", snacks: "Apple Slices & Peanut Butter" },
  default:     { breakfast: "Banana Oatmeal with Honey & Cinnamon", lunch: "Grilled Chicken & Spinach Salad", dinner: "Baked Chicken Breast with Roasted Veggies", snacks: "Greek Yogurt with Honey & Berries" },
};

const LENTIL_KEYWORDS = ["lentil", "Lentil"];

const build30DayMenu = (condition, selectedDiet) => {
  const breakfastPool = filterMeals(ALL_MEALS.breakfast, selectedDiet, condition);
  const lunchPool = filterMeals(ALL_MEALS.lunch, selectedDiet, condition);
  const dinnerPool = filterMeals(ALL_MEALS.dinner, selectedDiet, condition);
  const snackPool = filterMeals(ALL_MEALS.snacks, selectedDiet, condition);

  // Separate lentil meals from regular pool — lentils go to days 8–30 only
  const isLentil = (name) => LENTIL_KEYWORDS.some(k => name.includes(k));
  const splitPool = (pool) => ({
    early: pool.filter(m => !isLentil(m.name)),
    any: pool,
  });

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

  // Days 2–7 use early (no lentil) pools, days 8–30 use full pool
  const breakfastsEarly = pick(bSplit.early, 6);
  const lunchesEarly = pick(lSplit.early, 6);
  const dinnersEarly = pick(dSplit.early, 6);
  const snacksEarly = pick(sSplit.early, 6);

  const breakfastsLate = pick(bSplit.any, 23);
  const lunchesLate = pick(lSplit.any, 23);
  const dinnersLate = pick(dSplit.any, 23);
  const snacksLate = pick(sSplit.any, 23);

  const day1Base = DAY1_MEALS[condition] || DAY1_MEALS.default;
  // Validate day1 meals exist in filtered pool, fall back gracefully
  const d1b = breakfastPool.find(m => m.name === day1Base.breakfast)?.name || breakfastsEarly[0];
  const d1l = lunchPool.find(m => m.name === day1Base.lunch)?.name || lunchesEarly[0];
  const d1d = dinnerPool.find(m => m.name === day1Base.dinner)?.name || dinnersEarly[0];
  const d1s = snackPool.find(m => m.name === day1Base.snacks)?.name || snacksEarly[0];

  return Array.from({ length: 30 }, (_, i) => {
    if (i === 0) return { day: 1, breakfast: d1b, lunch: d1l, dinner: d1d, snacks: d1s };
    if (i <= 6)  return { day: i+1, breakfast: breakfastsEarly[i-1], lunch: lunchesEarly[i-1], dinner: dinnersEarly[i-1], snacks: snacksEarly[i-1] };
    return { day: i+1, breakfast: breakfastsLate[i-7], lunch: lunchesLate[i-7], dinner: dinnersLate[i-7], snacks: snacksLate[i-7] };
  });
};

const CONDITION_FOCUS = {
  adhd: ["fresh fruit & lean protein", "omega-3s", "iron & zinc", "natural sugars over processed"],
  anxiety: ["magnesium", "B vitamins", "probiotics", "anti-inflammatory foods"],
  depression: ["serotonin boosters", "omega-3s", "folate", "vitamin D"],
  bipolar: ["mood-stabilizing minerals", "omega-3s", "whole grains", "steady blood sugar"],
  schizophrenia: ["antioxidants", "B vitamins", "omega-3s", "anti-inflammatory"],
  autism: ["gut health", "B6 & magnesium", "omega-3s", "sensory-friendly textures"],
  ptsd: ["stress-reducing nutrients", "magnesium", "omega-3s", "B vitamins"],
  did: ["blood sugar stability", "consistent energy", "omega-3s", "grounding foods"],
  bpd: ["blood sugar balance", "omega-3s", "magnesium", "anti-inflammatory"],
  ocd: ["serotonin support", "complex carbs", "B vitamins", "zinc & magnesium"],
  default: ["balanced nutrients", "whole foods", "hydration", "gut health"],
};

const RECIPES = {
  "Grilled Chicken Sausage with Sliced Mango & Strawberries": {
    serves: 1, time: "10 min",
    ingredients: ["2 chicken sausage links","1 cup fresh mango, sliced","1 cup strawberries, hulled & halved","1 tsp olive oil","Pinch of sea salt"],
    steps: ["Heat a grill pan or skillet over medium-high heat with olive oil.","Add chicken sausage links and cook 4–5 minutes per side until golden and cooked through.","While sausage cooks, slice mango and halve strawberries and arrange on your plate.","Slice cooked sausage on the diagonal and plate alongside the fruit.","Sprinkle a pinch of sea salt over the fruit to enhance sweetness."],
    tip: "Buy pre-cooked chicken sausage and just slice and warm — cuts prep to 3 minutes.",
  },
  "Scrambled Eggs with Mixed Berry Bowl": {
    serves: 1, time: "8 min",
    ingredients: ["3 large eggs","1 tbsp butter or olive oil","Salt & pepper to taste","½ cup blueberries","½ cup raspberries","¼ cup blackberries","1 tsp honey (optional)"],
    steps: ["Crack eggs into a bowl, season with salt and pepper, and whisk well.","Heat butter in a non-stick pan over medium-low heat.","Pour in eggs and stir slowly with a spatula, pulling from edges to center.","Remove from heat while still slightly glossy — residual heat finishes them.","Combine berries in a bowl and drizzle with honey if using. Serve alongside eggs."],
    tip: "Low and slow is the key to creamy scrambled eggs — don't rush the heat.",
  },
  "Grilled Chicken Breast with Watermelon & Feta Salad": {
    serves: 1, time: "20 min",
    ingredients: ["1 chicken breast","2 cups watermelon, cubed","¼ cup feta cheese, crumbled","Handful fresh mint leaves","1 tbsp olive oil","Juice of ½ lime","Salt & pepper"],
    steps: ["Season chicken breast with salt, pepper, and olive oil.","Grill or cook in a pan over medium-high heat, 6–7 minutes per side until cooked through. Rest 5 minutes.","Cube watermelon and place in a bowl with crumbled feta and torn mint leaves.","Drizzle lime juice and a little olive oil over the salad.","Slice chicken and serve alongside or over the salad."],
    tip: "Let the chicken rest before slicing — it keeps all the juices in.",
  },
  "Pan-Seared Steak with Roasted Sweet Potato & Blueberry Side": {
    serves: 1, time: "30 min",
    ingredients: ["6–8 oz sirloin or ribeye steak","1 medium sweet potato, cubed","½ cup fresh blueberries","1 tbsp olive oil","1 tsp butter","Salt, pepper, garlic powder","Fresh rosemary (optional)"],
    steps: ["Preheat oven to 425°F. Toss sweet potato cubes with olive oil, salt, and garlic powder.","Roast sweet potato 20–25 minutes, flipping halfway, until golden and tender.","Pat steak dry and season generously with salt and pepper.","Heat a cast iron or heavy pan over high heat until smoking. Add butter.","Sear steak 3–4 minutes per side for medium. Rest 5 minutes before cutting.","Serve steak with roasted sweet potato and fresh blueberries on the side."],
    tip: "The blueberries are eaten fresh alongside — their antioxidants shine raw, not cooked.",
  },
  "Grilled Salmon with Mango Avocado Salsa & Brown Rice": {
    serves: 1, time: "25 min",
    ingredients: ["6 oz salmon fillet","½ cup brown rice (or 1 cup cooked)","½ mango, diced","½ avocado, diced","¼ red onion, finely diced","Juice of 1 lime","Fresh cilantro","Salt, pepper, olive oil"],
    steps: ["Cook brown rice per package instructions (or use microwavable pouches).","Mix diced mango, avocado, red onion, lime juice, and cilantro in a bowl. Season with salt. Set aside.","Season salmon with salt, pepper, and olive oil.","Grill or pan-sear salmon over medium-high heat, 4 minutes per side until cooked through and flaky.","Serve salmon over rice, topped generously with mango avocado salsa."],
    tip: "Make the salsa first — it tastes better after sitting 10 minutes while everything else cooks.",
  },
  "Honey-Glazed Salmon with Roasted Broccoli & Brown Rice": {
    serves: 1, time: "25 min",
    ingredients: ["6 oz salmon fillet","2 tbsp honey","1 tbsp soy sauce or coconut aminos","1 tsp garlic, minced","2 cups broccoli florets","1 cup cooked brown rice","1 tbsp olive oil","Salt & pepper"],
    steps: ["Preheat oven to 425°F. Toss broccoli in olive oil, salt, and pepper on a baking sheet.","Mix honey, soy sauce, and garlic in a small bowl. Brush half over salmon.","Place salmon alongside broccoli on the baking sheet.","Roast everything together 12–15 minutes until salmon flakes and broccoli is caramelized.","Brush remaining glaze over salmon when plating. Serve over brown rice."],
    tip: "Don't skip the second brush of glaze at the end — it makes the flavor pop.",
  },
  "Banana Oatmeal with Honey & Cinnamon": {
    serves: 1, time: "8 min",
    ingredients: ["½ cup rolled oats","1 cup water or milk of choice","1 ripe banana, sliced","1 tbsp honey","½ tsp cinnamon","Pinch of salt"],
    steps: ["Bring water or milk to a boil in a small saucepan. Add oats and pinch of salt.","Reduce heat to medium and stir frequently for 3–5 minutes until thickened to your liking.","Pour into a bowl and top with sliced banana.","Drizzle honey over the top and dust generously with cinnamon.","Stir gently and eat while warm."],
    tip: "Use a very ripe banana — the natural sweetness means you need less honey.",
  },
  "Avocado & Egg Toast on Sourdough": {
    serves: 1, time: "8 min",
    ingredients: ["2 slices sourdough bread","1 ripe avocado","2 eggs","Juice of ½ lemon","Red pepper flakes","Salt & pepper","Olive oil"],
    steps: ["Toast sourdough slices to your preferred crispness.","Halve avocado, scoop flesh into a bowl. Mash with lemon juice, salt, and pepper.","Cook eggs your preferred way — fried, poached, or soft-boiled.","Spread mashed avocado generously over toast.","Top with eggs, a drizzle of olive oil, and a pinch of red pepper flakes."],
    tip: "Poached eggs take about 3 minutes in barely simmering water with a splash of vinegar — they look impressive and taste incredible.",
  },
  "Spinach & Mushroom Omelette with Toast": {
    serves: 1, time: "12 min",
    ingredients: ["3 eggs","1 cup fresh spinach","½ cup mushrooms, sliced","1 tbsp butter","2 tbsp cheese (optional)","Salt & pepper","2 slices whole grain toast"],
    steps: ["Beat eggs with salt and pepper in a bowl.","Sauté mushrooms in butter over medium-high heat until golden, 3–4 minutes. Add spinach and wilt 1 minute.","Push vegetables to the side of the pan. Pour in eggs.","Once edges set, add cheese if using. Fold omelette over the filling.","Cook 1 more minute. Slide onto plate and serve with toast."],
    tip: "Don't overcook — an omelette should be just barely set inside, not rubbery.",
  },
  "Baked Salmon with Mashed Sweet Potato & Green Beans": {
    serves: 1, time: "30 min",
    ingredients: ["6 oz salmon fillet","1 large sweet potato","1½ cups green beans, trimmed","2 tbsp butter","Salt, pepper, garlic powder","Juice of ½ lemon"],
    steps: ["Preheat oven to 400°F. Pierce sweet potato with a fork and microwave 8–10 minutes until soft. Or bake 45 minutes.","Season salmon with salt, pepper, garlic powder. Place on a lined baking sheet.","Bake salmon 12–15 minutes until it flakes easily.","Steam or blanch green beans 4–5 minutes until tender-crisp.","Scoop sweet potato flesh, mash with butter and a pinch of salt.","Serve salmon over mashed sweet potato alongside green beans. Squeeze lemon over everything."],
    tip: "Microwaving the sweet potato saves 30 minutes and tastes just as good.",
  },
  "Grilled Steak with Roasted Potatoes & Broccoli": {
    serves: 1, time: "35 min",
    ingredients: ["6–8 oz sirloin steak","2 medium potatoes, cubed","2 cups broccoli florets","2 tbsp olive oil","Salt, pepper, garlic powder","1 tsp butter","Fresh parsley"],
    steps: ["Preheat oven to 425°F. Toss potato cubes with 1 tbsp olive oil, salt, garlic powder.","Roast potatoes 15 minutes. Add broccoli tossed in remaining olive oil, roast another 15 minutes.","Season steak well with salt and pepper. Let sit at room temp 10 minutes.","Grill or pan-sear steak over high heat, 3–4 minutes per side for medium.","Rest steak 5 minutes. Slice against the grain. Serve with vegetables. Top with butter and parsley."],
    tip: "Slicing against the grain is the single biggest difference between tough and tender steak.",
  },
  "Oatmeal with Flaxseed, Berries & Honey": {
    serves: 1, time: "8 min",
    ingredients: ["½ cup rolled oats","1 cup water or almond milk","1 tbsp ground flaxseed","½ cup mixed berries (fresh or frozen)","1 tbsp honey","Pinch of cinnamon and salt"],
    steps: ["Cook oats in water or milk over medium heat, stirring, 4–5 minutes.","Stir in ground flaxseed during the last minute of cooking.","Pour into bowl. Top with berries.","Drizzle honey over top and add a pinch of cinnamon.","Let sit 1 minute for the berries to warm slightly if using frozen."],
    tip: "Ground flaxseed absorbs into the oatmeal invisibly — you get all the omega-3s without any taste change.",
  },
  "Turkey Lettuce Wraps with Pineapple Salsa": {
    serves: 1, time: "15 min",
    ingredients: ["6 oz ground turkey","4–5 large butter lettuce or romaine leaves","½ cup fresh pineapple, finely diced","¼ red onion, finely diced","1 tbsp lime juice","Fresh cilantro","1 tbsp olive oil","Salt, pepper, cumin, garlic powder"],
    steps: ["Mix diced pineapple, red onion, lime juice, and cilantro. Season with salt. Set aside.","Heat olive oil in a skillet over medium-high heat.","Add ground turkey and cook, breaking up with a spoon, 5–7 minutes until cooked through.","Season turkey with salt, pepper, cumin, and garlic powder. Taste and adjust.","Spoon turkey into lettuce leaves. Top with pineapple salsa and serve immediately."],
    tip: "Butter lettuce leaves cup naturally — look for whole heads at the grocery store for the best wraps.",
  },
  "Lean Ground Turkey Taco Bowls": {
    serves: 1, time: "20 min",
    ingredients: ["6 oz ground turkey","½ cup brown rice or cauliflower rice","½ cup black beans, rinsed","¼ cup salsa","¼ avocado, sliced","1 tbsp olive oil","Taco seasoning (cumin, chili powder, garlic powder, paprika, salt)","Lime wedge, cilantro"],
    steps: ["Cook rice per package instructions.","Heat olive oil in a skillet. Cook turkey 5–7 minutes, breaking it up.","Add taco seasoning (about 1–1.5 tsp total) and a splash of water. Stir and cook 2 more minutes.","Warm black beans in a small pot or microwave.","Build your bowl: rice on the bottom, then turkey, beans, salsa, and avocado.","Top with cilantro and a squeeze of lime."],
    tip: "Make a double batch of seasoned turkey — it reheats perfectly for tomorrow's lunch.",
  },
  "Warm Oatmeal with Banana & Honey": {
    serves: 1, time: "7 min",
    ingredients: ["½ cup rolled oats","1 cup water or milk of choice","1 ripe banana","1 tbsp honey","Pinch of salt","Optional: pinch of nutmeg"],
    steps: ["Bring liquid to a gentle boil. Add oats and salt.","Cook over medium heat, stirring, 4–5 minutes until thick and creamy.","Slice banana into rounds.","Pour oatmeal into a warm bowl. Arrange banana slices on top.","Drizzle honey generously. Add nutmeg if using. Eat warm."],
    tip: "If your oats are too thick, stir in a splash of warm water or milk before serving.",
  },
  "Baked Lemon Herb Chicken with Roasted Potatoes": {
    serves: 1, time: "40 min",
    ingredients: ["2 chicken thighs or 1 large breast","2 medium potatoes, wedged","3 tbsp olive oil","Juice and zest of 1 lemon","2 garlic cloves, minced","1 tsp dried oregano","1 tsp dried thyme","Salt & pepper"],
    steps: ["Preheat oven to 425°F.","Mix olive oil, lemon juice, zest, garlic, oregano, thyme, salt, and pepper.","Toss potato wedges in half the mixture. Spread on a baking sheet.","Coat chicken in remaining mixture. Place on top of or beside potatoes.","Roast 30–35 minutes until chicken is golden and potatoes are tender.","Rest chicken 5 minutes before serving."],
    tip: "Bone-in chicken thighs are more forgiving than breast — nearly impossible to overcook.",
  },
  "Pan-Seared Salmon with Quinoa & Asparagus": {
    serves: 1, time: "25 min",
    ingredients: ["6 oz salmon fillet","½ cup quinoa","1 bunch asparagus, trimmed","1 tbsp olive oil","Salt, pepper, garlic powder","Juice of ½ lemon","1 tsp butter"],
    steps: ["Rinse quinoa. Cook in 1 cup water or broth with a pinch of salt, 15 minutes.","Toss asparagus with olive oil, salt, and pepper. Roast at 425°F for 10–12 minutes until tender.","Meanwhile, season salmon with salt, pepper, and garlic powder.","Heat butter in a pan over medium-high heat. Place salmon skin-side up, cook 4 minutes.","Flip and cook 3–4 more minutes until fish flakes easily.","Serve over quinoa alongside asparagus. Squeeze lemon over everything."],
    tip: "Press the salmon gently with a spatula for the first 30 seconds to prevent curling.",
  },
  "Egg & Cheese Breakfast Burrito": {
    serves: 1, time: "10 min",
    ingredients: ["3 eggs","¼ cup shredded cheddar or pepper jack","1 large flour or whole wheat tortilla","1 tbsp butter","Salt & pepper","Optional: salsa, avocado, hot sauce"],
    steps: ["Beat eggs with salt and pepper.","Melt butter in a non-stick pan over medium-low heat.","Scramble eggs slowly until just set — slightly glossy is perfect.","Warm tortilla in a dry pan or microwave 20 seconds.","Layer eggs down center of tortilla. Top with cheese while hot so it melts.","Add salsa or avocado if using. Fold sides in, then roll up tightly."],
    tip: "Wrapping tightly in foil for 2 minutes lets the burrito steam itself perfectly together.",
  },
  "Oven-Roasted Chicken with Vegetables & Quinoa": {
    serves: 2, time: "45 min",
    ingredients: ["2 chicken thighs, bone-in","2 cups mixed vegetables (zucchini, bell pepper, red onion, carrots)","1 cup quinoa","2 tbsp olive oil","1 tsp garlic powder","1 tsp paprika","Salt, pepper, dried thyme"],
    steps: ["Preheat oven to 425°F. Cook quinoa per package directions.","Toss vegetables with 1 tbsp olive oil, salt, pepper. Spread on a baking sheet.","Rub chicken with remaining olive oil, garlic powder, paprika, thyme, salt, pepper.","Place chicken on top of vegetables on the sheet.","Roast 35–40 minutes until chicken skin is golden and juices run clear.","Serve chicken and vegetables over quinoa."],
    tip: "The vegetables caramelize under the chicken and absorb the drippings — the best part of the whole dish.",
  },
  "Grilled Salmon with Brown Rice & Steamed Broccoli": {
    serves: 1, time: "25 min",
    ingredients: ["6 oz salmon fillet","1 cup cooked brown rice","2 cups broccoli florets","1 tbsp olive oil","2 tbsp soy sauce or coconut aminos","1 tsp sesame oil","1 garlic clove, minced","Lemon wedge"],
    steps: ["Cook brown rice per package instructions.","Mix soy sauce, sesame oil, and garlic in a small bowl.","Season salmon with olive oil, salt, and pepper. Grill or pan-cook 4 minutes per side.","Steam broccoli 4–5 minutes until bright green and tender-crisp.","Brush salmon with half the soy-sesame sauce.","Plate rice, top with broccoli and salmon. Drizzle remaining sauce. Serve with lemon."],
    tip: "Microwave-in-bag broccoli takes 3 minutes and tastes identical — great weeknight shortcut.",
  },
  "Plain Scrambled Eggs with Toast": {
    serves: 1, time: "7 min",
    ingredients: ["3 eggs","1 tbsp butter","Salt to taste","2 slices bread, toasted","Optional: a little shredded cheese"],
    steps: ["Crack eggs into a bowl and whisk with a pinch of salt.","Melt butter in a non-stick pan over low heat.","Add eggs and stir constantly with a silicone spatula.","Cook very slowly — 3–4 minutes — until just set and creamy.","Remove from heat while slightly underdone. Toast will finish eating alongside.","Serve immediately on or beside toast."],
    tip: "Low heat, constant stirring, remove early. These three rules make perfect scrambled eggs every time.",
  },
  "Dark Chocolate & Strawberries": {
    serves: 1, time: "5 min",
    ingredients: ["1 oz dark chocolate (70%+ cacao), broken into pieces","6–8 fresh strawberries, washed","Optional: pinch of sea salt flakes"],
    steps: ["Wash and dry strawberries — water prevents chocolate from sticking if dipping.","Break dark chocolate into pieces and arrange on a small plate.","Place strawberries alongside.","If you like, melt chocolate in a microwave 30 seconds at a time, stirring, and dip berries.","Finish with a tiny pinch of flaky sea salt on the chocolate — it amplifies the flavor dramatically."],
    tip: "Microwave chocolate in 15-second bursts after the first 30 — it burns fast when nearly melted.",
  },
  "Grilled Steak with Roasted Sweet Potato & Broccoli": {
    serves: 1, time: "35 min",
    ingredients: ["6–8 oz sirloin or strip steak","1 medium sweet potato, cubed","2 cups broccoli florets","2 tbsp olive oil","Salt, pepper, garlic powder","1 tsp butter"],
    steps: ["Preheat oven to 425°F. Toss sweet potato cubes with 1 tbsp olive oil, salt, garlic powder.","Roast sweet potato 15 minutes. Add broccoli with remaining olive oil, roast 15 more minutes.","Season steak generously with salt and pepper.","Heat a pan over high heat until very hot. Add butter.","Sear steak 3–4 minutes per side for medium. Rest 5 minutes before slicing.","Serve steak sliced against the grain alongside roasted vegetables."],
    tip: "Don't move the steak for the first 3 minutes — you want a proper crust to form.",
  },
  "Baked Chicken Tenders with Rice & Corn": {
    serves: 1, time: "25 min",
    ingredients: ["4–5 chicken tenders","½ cup breadcrumbs","1 egg, beaten","Salt, pepper, garlic powder","1 cup cooked white rice","½ cup corn (canned or frozen)","1 tbsp butter"],
    steps: ["Preheat oven to 400°F. Line a baking sheet with parchment.","Season breadcrumbs with salt, pepper, and garlic powder.","Dip each tender in beaten egg, then press into breadcrumbs.","Place on baking sheet and bake 18–20 minutes, flipping halfway, until golden.","While tenders bake, cook rice per package. Warm corn with a little butter.","Serve tenders alongside rice and corn."],
    tip: "A wire rack on the baking sheet makes tenders crispy on both sides without flipping.",
  },
  "Baked Chicken Breast with Roasted Veggies & Brown Rice": {
    serves: 1, time: "35 min",
    ingredients: ["1 chicken breast","2 cups mixed vegetables (bell pepper, zucchini, onion, cherry tomatoes)","1 cup cooked brown rice","2 tbsp olive oil","Salt, pepper, garlic powder, paprika","Dried oregano"],
    steps: ["Preheat oven to 425°F.","Toss vegetables in 1 tbsp olive oil with salt, pepper. Spread on a baking sheet.","Rub chicken breast with remaining olive oil, garlic powder, paprika, oregano, salt, pepper.","Place chicken on sheet with vegetables.","Bake 22–25 minutes until chicken reaches 165°F internal temperature.","Rest chicken 5 minutes. Slice and serve over brown rice with roasted vegetables."],
    tip: "Use a meat thermometer — it takes the guesswork out and guarantees juicy chicken every time.",
  },
  "Lemon Herb Chicken with Rice Pilaf": {
    serves: 1, time: "30 min",
    ingredients: ["1 chicken breast or 2 thighs","1 cup long grain white or jasmine rice","1¾ cup chicken broth","1 tbsp butter","Juice and zest of 1 lemon","2 garlic cloves, minced","Fresh or dried thyme, parsley","Salt & pepper, olive oil"],
    steps: ["For pilaf: melt butter in a saucepan, toast rice 2 minutes stirring. Add broth, bring to boil, reduce to low, cover 18 minutes.","Season chicken with lemon zest, garlic, thyme, salt, pepper, and olive oil. Marinate 10 minutes if possible.","Cook chicken in a pan over medium heat, 6–7 minutes per side until golden and cooked through.","Fluff rice with a fork. Stir in fresh parsley and lemon juice.","Serve chicken over pilaf with extra lemon squeezed on top."],
    tip: "Toasting the rice in butter before adding liquid is what makes pilaf taste restaurant-quality.",
  },
};

const RECIPES_EXTENDED = {
"Chicken Sausage Patties with Sliced Peaches & Honeydew":{serves:1,time:"12 min",ingredients:["3 chicken sausage patties","1 ripe peach, sliced","1 cup honeydew melon, cubed","1 tsp olive oil","Pinch of cinnamon"],steps:["Heat olive oil in a skillet over medium heat.","Cook patties 4-5 min per side until golden.","Slice peach and cube honeydew while patties cook.","Dust fruit lightly with cinnamon.","Serve patties alongside the fruit."],tip:"Frozen peaches work great — thaw overnight in the fridge."},
"Ground Turkey Bowl with Sautéed Spinach & Sliced Kiwi":{serves:1,time:"15 min",ingredients:["4 oz ground turkey","2 cups fresh spinach","2 kiwis, peeled and sliced","1 garlic clove, minced","1 tbsp olive oil","Salt, pepper"],steps:["Heat oil, cook garlic 30 sec.","Add turkey, cook 6-7 min until browned. Season.","Push aside, wilt spinach 1-2 min.","Transfer to bowl and serve kiwi alongside."],tip:"Kiwi is best eaten raw — vitamin C is most potent uncooked."},
"Steak & Egg Scramble with Sliced Cantaloupe & Grapes":{serves:1,time:"15 min",ingredients:["4 oz sirloin, thinly sliced","3 eggs","1 cup cantaloupe, cubed","1/2 cup grapes","1 tbsp butter","Salt, pepper, garlic powder"],steps:["Season steak slices, sear in hot skillet 2-3 min. Set aside.","Reduce heat. Add butter, scramble eggs slowly.","Fold steak into eggs just before they set.","Serve with cantaloupe and grapes on the side."],tip:"Thin steak strips cook in seconds — don't walk away from the pan."},
"Turkey Sausage Patties with Sliced Mango & Pineapple":{serves:1,time:"12 min",ingredients:["3 turkey sausage patties","1 cup fresh mango, sliced","1 cup fresh pineapple chunks","1 tsp coconut oil"],steps:["Heat coconut oil, cook patties 4-5 min per side.","Slice mango and cut pineapple while patties cook.","Serve patties with tropical fruit on the side."],tip:"Frozen mango and pineapple are just as nutritious and save prep time."},
"Grilled Chicken with Watermelon & Blueberry Bowl":{serves:1,time:"20 min",ingredients:["1 chicken breast","2 cups watermelon, cubed","1/2 cup blueberries","1 tbsp olive oil","Salt, pepper, dried thyme","Fresh mint"],steps:["Season chicken, cook 6-7 min per side. Rest 5 min.","Cube watermelon, combine with blueberries and torn mint.","Slice chicken and serve alongside fruit bowl."],tip:"Resting the chicken before slicing keeps it juicy."},
"Steak Strips with Roasted Sweet Potato & Fresh Strawberry Side":{serves:1,time:"30 min",ingredients:["5 oz sirloin strips","1 medium sweet potato, cubed","1 cup strawberries, halved","1 tbsp olive oil","Salt, pepper, smoked paprika"],steps:["Roast sweet potato at 425F 22-25 min with oil and paprika.","Season and sear steak strips in hot pan 2-3 min.","Serve with fresh strawberries on the side."],tip:"Smoked paprika on sweet potato makes it taste restaurant-quality."},
"Smoked Chicken with Sliced Papaya & Pineapple":{serves:1,time:"5 min",ingredients:["6 oz smoked chicken breast, sliced","1 cup papaya, cubed","1 cup pineapple chunks","Squeeze of lime","Pinch of sea salt"],steps:["Slice smoked chicken — pre-cooked, no cooking needed.","Cube papaya and cut pineapple.","Squeeze lime over fruit, add salt.","Serve chicken alongside fruit."],tip:"Look for smoked chicken in the deli section — zero-cook breakfast."},
"Beef & Veggie Scramble with Fresh Mango Slices":{serves:1,time:"15 min",ingredients:["4 oz lean ground beef","1/2 bell pepper, diced","1/4 onion, diced","3 eggs","1 large mango, sliced","1 tbsp olive oil","Salt, pepper, cumin"],steps:["Cook beef with cumin, salt, pepper 5-6 min.","Add bell pepper and onion, cook 3 min.","Scramble eggs into the beef mixture.","Serve with mango slices alongside."],tip:"A pinch of cumin makes ground beef taste way more interesting."},
"Turkey & Spinach Sauté with Sliced Peaches & Raspberries":{serves:1,time:"15 min",ingredients:["4 oz ground turkey","2 cups baby spinach","1 ripe peach, sliced","1/2 cup raspberries","1 tbsp olive oil","Salt, pepper"],steps:["Cook turkey in oil 6-7 min. Season.","Add spinach, wilt 1-2 min.","Serve turkey and spinach with peach and raspberries alongside."],tip:"A tiny splash of balsamic over the peaches takes this to the next level."},
"Chicken & Sweet Potato Hash with Blueberry & Banana Side":{serves:1,time:"25 min",ingredients:["5 oz chicken breast, diced","1 medium sweet potato, cubed","1/2 onion, diced","1 cup blueberries","1 banana, sliced","1 tbsp olive oil","Salt, pepper, smoked paprika"],steps:["Cook sweet potato in oil 8-10 min.","Add chicken and onion, season with paprika, cook 6-7 min.","Serve hash with blueberries and banana on the side."],tip:"Cover pan for first few minutes of sweet potato cooking to speed it up."},
"Ground Beef Breakfast Bowl with Cherries & Orange Slices":{serves:1,time:"15 min",ingredients:["4 oz lean ground beef","1 cup pitted cherries","1 large orange, segmented","Salt, pepper, garlic powder, olive oil"],steps:["Cook ground beef in skillet 6-7 min. Season well.","Optional: wilt a handful of spinach into beef.","Pit cherries and segment orange.","Serve beef in bowl with fruit arranged on the side."],tip:"Cherries are easier to pit by pushing a chopstick through the center."},
"Chicken Sausage with Sliced Nectarine & Mixed Berries":{serves:1,time:"12 min",ingredients:["3 chicken sausage links","1 ripe nectarine, sliced","1/2 cup blueberries","1/2 cup raspberries","1 tsp olive oil"],steps:["Cook sausage in oil 4-5 min per side.","Slice nectarine and combine berries.","Serve sausage with nectarine and berry bowl alongside."],tip:"Score sausage links with a small cut before cooking so they don't burst."},
"Turkey Patties with Sliced Kiwi, Mango & Pineapple Bowl":{serves:1,time:"15 min",ingredients:["4 oz ground turkey, formed into 2 patties","2 kiwis, peeled and sliced","1/2 cup mango chunks","1/2 cup pineapple chunks","1 tsp olive oil","Salt, pepper"],steps:["Cook turkey patties 5 min per side.","Peel and slice kiwi. Combine mango and pineapple.","Serve patties with tropical fruit bowl alongside."],tip:"Wet hands when shaping turkey patties — prevents sticking."},
"Sirloin Strips with Watermelon, Mint & Lime Side":{serves:1,time:"15 min",ingredients:["5 oz sirloin strips","2 cups watermelon, cubed","Handful fresh mint","Juice of 1 lime","1 tbsp olive oil","Salt, pepper, garlic powder"],steps:["Season sirloin, sear in hot oiled skillet 2 min per side.","Cube watermelon, tear mint over it, squeeze lime on top.","Serve steak strips alongside watermelon mint bowl."],tip:"Lime and mint on watermelon tastes restaurant-quality with zero effort."},
"Chicken Thigh with Grilled Pineapple & Coconut Flakes":{serves:1,time:"25 min",ingredients:["2 chicken thighs, boneless","3 pineapple rings","2 tbsp toasted coconut flakes","1 tbsp olive oil","Salt, pepper, garlic powder"],steps:["Cook chicken thighs in oil 6-7 min per side.","Grill pineapple rings in same pan 2 min per side until caramelized.","Toast coconut flakes in dry pan 1-2 min until golden.","Serve chicken with grilled pineapple and coconut flakes."],tip:"Pineapple contains bromelain which naturally tenderizes meat — great combo."},
"Ground Turkey with Papaya, Lime & Blueberry Bowl":{serves:1,time:"15 min",ingredients:["4 oz ground turkey","1 cup ripe papaya, cubed","1/2 cup blueberries","Juice of 1 lime","1 tbsp olive oil","Salt, cumin, garlic powder"],steps:["Cook turkey with cumin, garlic, salt 6-7 min.","Cube papaya, combine with blueberries, squeeze lime over fruit.","Serve turkey alongside papaya blueberry bowl."],tip:"Ripe papaya should give slightly when pressed — unripe is hard and tasteless."},
"Steak & Veggie Hash with Fresh Peach & Raspberry Side":{serves:1,time:"20 min",ingredients:["5 oz sirloin, diced","1 cup sweet potato, cubed","1/2 bell pepper, diced","1/4 onion, diced","1 peach, sliced","1/2 cup raspberries","1 tbsp olive oil","Salt, pepper, smoked paprika"],steps:["Cook sweet potato in oil 8 min. Add pepper and onion 3 min.","Add steak, season with paprika, cook 4-5 min.","Serve hash with peach and raspberries on the side."],tip:"Don't stir hash too much — let it sit and develop a crust on the bottom."},
"Chicken Sausage with Sliced Plum & Honeydew Melon":{serves:1,time:"12 min",ingredients:["3 chicken sausage links","2 ripe plums, sliced","1 cup honeydew melon, cubed","1 tsp olive oil"],steps:["Cook sausage in oil 4-5 min per side.","Slice plums and cube honeydew.","Serve sausage alongside fruit plate."],tip:"Slightly underripe plums hold their shape better when sliced."},
"Turkey Sauté with Strawberry, Banana & Sunflower Seeds":{serves:1,time:"15 min",ingredients:["4 oz ground turkey","1 cup strawberries, halved","1 banana, sliced","2 tbsp sunflower seeds","1 tbsp olive oil","Salt, pepper, cinnamon"],steps:["Cook turkey in oil with salt and pepper 6-7 min.","Halve strawberries and slice banana. Plate turkey.","Arrange fruit alongside. Sprinkle sunflower seeds. Dust with cinnamon."],tip:"Sunflower seeds add crunch, magnesium, and zinc — great ADHD support."},
"Banana Oatmeal with Honey & Cinnamon":{serves:1,time:"8 min",ingredients:["1/2 cup rolled oats","1 cup water or milk","1 ripe banana, sliced","1 tbsp honey","1/2 tsp cinnamon","Pinch of salt"],steps:["Bring liquid to a boil. Add oats and salt.","Stir over medium heat 3-5 min until thick.","Pour into bowl. Top with banana.","Drizzle honey, dust with cinnamon."],tip:"Use a very ripe banana — the sweeter it is, the less honey you need."},
"Avocado & Egg Toast on Sourdough":{serves:1,time:"8 min",ingredients:["2 slices sourdough","1 avocado","2 eggs","Juice of 1/2 lemon","Red pepper flakes","Salt and pepper"],steps:["Toast sourdough.","Mash avocado with lemon, salt, pepper.","Cook eggs your preferred way.","Spread avocado on toast, top with eggs and red pepper flakes."],tip:"Poach eggs in barely simmering water with a splash of vinegar — 3 minutes exactly."},
"Blueberry Greek Yogurt Parfait":{serves:1,time:"5 min",ingredients:["1 cup full-fat Greek yogurt","1 cup fresh blueberries","1/4 cup granola","1 tbsp honey"],steps:["Spoon yogurt into a bowl.","Layer blueberries over yogurt.","Sprinkle granola on top.","Drizzle honey."],tip:"Full-fat Greek yogurt keeps you fuller longer than low-fat."},
"Warm Oatmeal with Sliced Banana & Walnuts":{serves:1,time:"8 min",ingredients:["1/2 cup rolled oats","1 cup milk or water","1 banana, sliced","1/4 cup walnuts, chopped","1 tbsp honey","1/2 tsp cinnamon"],steps:["Cook oats in liquid 4-5 min, stirring.","Pour into bowl. Top with banana and walnuts.","Drizzle honey and dust with cinnamon."],tip:"Toast walnuts in a dry pan 2 min first — it deepens flavor dramatically."},
"Smoothie Bowl with Spinach, Banana & Granola":{serves:1,time:"8 min",ingredients:["1 frozen banana","1 cup frozen spinach","1/2 cup almond milk","1/4 cup granola","Toppings: fresh banana, berries, honey"],steps:["Blend frozen banana, spinach, almond milk until thick and smooth.","Pour into bowl.","Top with granola, fresh banana, berries, and drizzle of honey."],tip:"Frozen banana is the key — fresh banana makes the bowl too runny."},
"Whole Grain Pancakes with Sliced Strawberries & Honey":{serves:1,time:"15 min",ingredients:["1/2 cup whole wheat flour","1 egg","1/2 cup milk","1 tsp baking powder","1 tbsp honey plus more for drizzling","1 cup strawberries, sliced","Butter for pan"],steps:["Mix flour, baking powder, egg, milk, honey into smooth batter.","Cook 1/4 cup portions in buttered pan over medium heat.","Flip when bubbles form on surface.","Top with strawberries and drizzle honey."],tip:"Don't press down on pancakes with the spatula — it makes them dense."},
"Banana Smoothie with Almond Milk & Chia Seeds":{serves:1,time:"5 min",ingredients:["1 large frozen banana","1 cup unsweetened almond milk","1 tbsp chia seeds","1 tsp honey","Pinch of cinnamon"],steps:["Blend banana, almond milk, honey, cinnamon until smooth.","Pour into a glass.","Stir in chia seeds after blending.","Let sit 2 min before drinking."],tip:"Stir chia seeds in after blending — they work better than blended."},
"Avocado Toast with Sliced Tomato & Microgreens":{serves:1,time:"8 min",ingredients:["2 slices whole grain bread","1 avocado","1 tomato, sliced","Handful microgreens","Juice of 1/2 lemon","Salt, pepper, olive oil"],steps:["Toast bread.","Mash avocado with lemon, salt, and pepper.","Spread on toast.","Layer tomato and microgreens. Drizzle olive oil."],tip:"Microgreens last a week in the fridge and elevate any toast instantly."},
"Berry Chia Pudding with Almond Milk":{serves:1,time:"5 min plus 4 hrs",ingredients:["3 tbsp chia seeds","1 cup unsweetened almond milk","1 tbsp maple syrup or honey","1/2 tsp vanilla extract","1 cup mixed berries"],steps:["Mix chia seeds, almond milk, sweetener, vanilla in a jar.","Stir well. Stir again after 5 minutes to prevent clumping.","Refrigerate at least 4 hours or overnight.","Top with fresh berries in the morning."],tip:"Make this the night before — morning-you will be very happy."},
"Mango Smoothie Bowl with Hemp Seeds":{serves:1,time:"8 min",ingredients:["1.5 cups frozen mango","1/2 cup coconut milk","2 tbsp hemp seeds","Toppings: kiwi, fresh mango, shredded coconut"],steps:["Blend frozen mango and coconut milk until thick and creamy.","Pour into bowl.","Top with hemp seeds, kiwi, fresh mango, and coconut."],tip:"Use less liquid than you think — a spoonable consistency is the goal."},
"Grilled Chicken & Spinach Breakfast Wrap":{serves:1,time:"15 min",ingredients:["1 whole wheat tortilla","5 oz chicken breast, sliced","2 cups spinach","2 eggs, scrambled","1 tbsp olive oil","Salt, pepper, garlic powder"],steps:["Cook chicken slices in oiled pan 5-6 min. Season.","Wilt spinach in same pan 1-2 min.","Scramble eggs in a small pan.","Warm tortilla. Layer eggs, chicken, spinach. Roll tightly."],tip:"Warm the tortilla first — cold tortillas crack when rolled."},
"Spinach & Mushroom Omelette with Toast":{serves:1,time:"12 min",ingredients:["3 eggs","1 cup baby spinach","1/2 cup mushrooms, sliced","1 tbsp butter","Salt, pepper","2 slices whole grain toast"],steps:["Saute mushrooms in butter 3-4 min until golden.","Add spinach, wilt 1 min. Remove from pan.","Whisk eggs with salt and pepper. Pour into pan over medium-low heat.","When edges set, add filling. Fold over and cook 1 more min.","Serve with toast."],tip:"Keep heat medium-low — high heat makes omelettes rubbery."},
"Whole Grain Pancakes with Fresh Berries":{serves:1,time:"15 min",ingredients:["1/2 cup whole wheat flour","1 egg","1/2 cup milk","1 tsp baking powder","1 cup mixed berries","1 tbsp maple syrup","Butter for pan"],steps:["Mix flour, egg, milk, baking powder into smooth batter.","Cook 1/4 cup portions in buttered pan. Flip when bubbles appear.","Serve stacked with fresh berries and maple syrup."],tip:"Whole wheat flour pancakes need slightly lower heat than white flour."},
"Greek Yogurt Bowl with Granola & Banana":{serves:1,time:"5 min",ingredients:["1 cup Greek yogurt","1 banana, sliced","1/4 cup granola","1 tbsp honey"],steps:["Spoon yogurt into bowl.","Slice banana over the top.","Sprinkle granola.","Drizzle honey."],tip:"Full-fat Greek yogurt has more protein and keeps you full much longer."},
"Oatmeal with Sliced Banana & Chia Seeds":{serves:1,time:"8 min",ingredients:["1/2 cup rolled oats","1 cup milk","1 banana, sliced","1 tbsp chia seeds","1 tbsp maple syrup","1/2 tsp cinnamon"],steps:["Cook oats in milk 4-5 min, stirring.","Pour into bowl. Top with banana, chia seeds, cinnamon.","Drizzle maple syrup."],tip:"Chia seeds thicken as they sit — stir before eating."},
"Veggie Omelette with Whole Grain Toast & OJ":{serves:1,time:"12 min",ingredients:["3 eggs","1/2 bell pepper, diced","1/4 onion, diced","1/4 cup cherry tomatoes, halved","1 tbsp olive oil","Salt, pepper","2 slices whole grain toast","1 glass orange juice"],steps:["Saute pepper and onion 3 min. Add tomatoes 1 min.","Whisk eggs with salt and pepper. Pour over veggies.","Fold omelette when edges are set.","Serve with toast and orange juice."],tip:"The OJ is intentional — vitamin C doubles iron absorption from eggs and veggies."},
"Turkey & Veggie Breakfast Skillet":{serves:1,time:"18 min",ingredients:["4 oz ground turkey","1/2 zucchini, diced","1/2 bell pepper, diced","1/4 onion, diced","1 garlic clove, minced","1 tbsp olive oil","Salt, pepper, Italian seasoning"],steps:["Cook turkey until browned 5-6 min. Season well.","Add all vegetables and garlic. Cook 5 min until softened.","Mix together and adjust seasoning.","Serve directly from the skillet."],tip:"This reheats perfectly — make double for tomorrow's breakfast."},
"Chicken Sausage with Roasted Peppers & Zucchini":{serves:1,time:"25 min",ingredients:["3 chicken sausage links","1 bell pepper, sliced","1 zucchini, sliced","1 tbsp olive oil","Salt, pepper, Italian herbs, garlic powder"],steps:["Preheat oven to 425F.","Toss peppers and zucchini with oil and seasonings on a baking sheet.","Add sausage links to the same pan.","Roast 20-22 min until veggies are caramelized and sausage is golden."],tip:"Line the pan with foil — sheet pan meals need almost zero cleanup."},
"Lentil & Veggie Breakfast Bowl":{serves:1,time:"15 min",ingredients:["1/2 cup canned lentils, drained and rinsed","1 cup spinach","1 egg, poached or fried","1/2 avocado, sliced","1 tbsp olive oil","Salt, pepper, cumin","Squeeze of lemon"],steps:["Warm lentils in pan with olive oil and cumin 3 min.","Wilt spinach into lentils 1 min.","Cook egg your preferred way.","Spoon lentils and spinach into bowl. Top with egg and avocado. Squeeze lemon."],tip:"Canned lentils are already cooked — genuinely a 15-minute breakfast."},
"Oatmeal with Flaxseed, Berries & Honey":{serves:1,time:"8 min",ingredients:["1/2 cup rolled oats","1 cup milk","1 tbsp ground flaxseed","1/2 cup mixed berries","1 tbsp honey","Pinch of salt"],steps:["Cook oats in milk 4-5 min, stirring.","Stir in ground flaxseed — it blends right in.","Pour into bowl. Top with berries and drizzle honey."],tip:"Ground flaxseed is more bioavailable than whole — buy it pre-ground."},
"Scrambled Eggs & Whole Grain Toast with Sliced Banana":{serves:1,time:"10 min",ingredients:["3 eggs","1 tbsp butter","Salt and pepper","2 slices whole grain bread","1 banana, sliced"],steps:["Whisk eggs with salt and pepper.","Scramble in butter over medium-low heat until just set and creamy.","Toast bread alongside.","Serve eggs on toast with banana slices on the plate."],tip:"Remove eggs from heat while they look slightly wet — they finish on the plate."},
"Smoothie Bowl with Spinach, Mango & Granola":{serves:1,time:"8 min",ingredients:["1 frozen banana","1 cup frozen mango","1 cup spinach","1/2 cup coconut milk","1/4 cup granola","Fresh mango for topping"],steps:["Blend banana, mango, spinach, coconut milk until thick and creamy.","Pour into bowl.","Top with granola and fresh mango pieces."],tip:"Canned coconut milk makes a richer, creamier bowl."},
"Whole Grain Toast with Avocado & Poached Egg":{serves:1,time:"10 min",ingredients:["2 slices whole grain bread","1 avocado","2 eggs","Splash of white vinegar","Salt, pepper","Red pepper flakes"],steps:["Toast bread. Mash avocado with salt and pepper.","Bring small pot to gentle simmer. Add splash of vinegar.","Slip eggs in and poach 3 min.","Spread avocado on toast. Top with poached eggs and red pepper flakes."],tip:"Vinegar in the water helps egg white hold together — don't skip it."},
"Banana Oat Pancakes with Maple Syrup & Blueberries":{serves:1,time:"15 min",ingredients:["1 ripe banana","2 eggs","1/2 cup rolled oats","1/2 tsp baking powder","Pinch of cinnamon","1/2 cup blueberries","2 tbsp maple syrup"],steps:["Mash banana until smooth. Whisk in eggs, oats, baking powder, cinnamon.","Cook 1/4 cup portions in non-stick pan over medium-low heat, 3 min per side.","Top with blueberries and maple syrup."],tip:"These pancakes are fragile — flip gently and cook low and slow."},
"Overnight Oats with Chia, Banana & Almond Milk":{serves:1,time:"5 min plus overnight",ingredients:["1/2 cup rolled oats","1 cup almond milk","1 tbsp chia seeds","1 banana, sliced","1 tbsp almond butter","1 tbsp honey"],steps:["Mix oats, almond milk, chia seeds, honey in a jar. Stir well.","Refrigerate overnight.","In the morning, top with banana slices and almond butter."],tip:"Make 3-4 jars on Sunday — breakfast is done for the week."},
"Quinoa Porridge with Berries & Honey":{serves:1,time:"20 min",ingredients:["1/2 cup quinoa","1 cup milk","1 cup mixed berries","1 tbsp honey","1/2 tsp vanilla","Pinch of cinnamon"],steps:["Combine quinoa and milk. Bring to boil.","Reduce heat, cover, simmer 15 min.","Stir in vanilla and cinnamon.","Top with berries and honey."],tip:"Quinoa porridge has more protein than oatmeal — more filling."},
"Turkey Sausage with Roasted Sweet Potato Hash":{serves:1,time:"25 min",ingredients:["3 turkey sausage links","1 medium sweet potato, small cubed","1/4 onion, diced","1 tbsp olive oil","Salt, pepper, smoked paprika"],steps:["Roast sweet potato and onion at 425F with oil and paprika 20 min.","Cook sausage links in skillet 4-5 min per side.","Serve sausage alongside or sliced into hash."],tip:"Parboil sweet potato 5 min before roasting to cut oven time in half."},
"Chia Seed Pudding with Mango & Coconut":{serves:1,time:"5 min plus 4 hrs",ingredients:["3 tbsp chia seeds","1 cup coconut milk","1 tbsp maple syrup","1 cup ripe mango, diced","2 tbsp toasted shredded coconut"],steps:["Mix chia, coconut milk, maple syrup. Stir well twice over 10 min.","Refrigerate at least 4 hours or overnight.","Top with mango and toasted coconut."],tip:"Toast coconut flakes in a dry pan 2 min until golden — it transforms the flavor."},
"Oatmeal with Walnuts & Blueberries":{serves:1,time:"8 min",ingredients:["1/2 cup rolled oats","1 cup milk","1/4 cup walnuts","1/2 cup blueberries","1 tbsp honey","1/2 tsp cinnamon"],steps:["Cook oats in milk 4-5 min.","Top with walnuts and blueberries.","Drizzle honey and add cinnamon."],tip:"Whole walnuts stay fresh much longer than pre-chopped ones."},
"Whole Grain Cereal with Milk & Sliced Banana":{serves:1,time:"3 min",ingredients:["1.5 cups whole grain cereal","1 cup milk","1 banana, sliced","Optional drizzle of honey"],steps:["Pour cereal into bowl.","Add milk.","Slice banana over the top.","Drizzle honey if desired."],tip:"Whole grain cereals with less than 8g of sugar per serving are worth buying."},
"Greek Yogurt Parfait with Granola & Berries":{serves:1,time:"5 min",ingredients:["1 cup Greek yogurt","1/4 cup granola","1/2 cup strawberries, sliced","1/2 cup blueberries","1 tbsp honey"],steps:["Layer yogurt, granola, and mixed berries in a glass or bowl.","Drizzle honey on top."],tip:"Layer in a jar with a lid for a perfect on-the-go breakfast."},
"Warm Oatmeal with Banana & Honey":{serves:1,time:"8 min",ingredients:["1/2 cup rolled oats","1 cup water or milk","1 banana, sliced","1 tbsp honey","1/2 tsp cinnamon","Pinch of salt"],steps:["Bring liquid and salt to a boil. Add oats.","Stir over medium heat 4-5 min until creamy.","Top with banana slices.","Drizzle honey and dust with cinnamon."],tip:"A pinch of salt in oatmeal makes all the sweet toppings taste more vibrant."},
"Smoothie with Spinach, Banana & Almond Milk":{serves:1,time:"5 min",ingredients:["1 cup spinach","1 frozen banana","1 cup almond milk","1 tsp honey","Pinch of cinnamon"],steps:["Add all ingredients to blender.","Blend until completely smooth.","Drink immediately."],tip:"If you can taste the spinach, add more banana to balance it out."},
"Whole Grain Toast with Peanut Butter & Sliced Banana":{serves:1,time:"5 min",ingredients:["2 slices whole grain toast","2 tbsp peanut butter","1 banana, sliced","Optional honey and cinnamon"],steps:["Toast bread.","Spread peanut butter generously on both slices.","Arrange banana slices on top.","Add honey or cinnamon if desired."],tip:"Natural peanut butter with just peanuts and salt is far better than commercial."},
"Oatmeal with Cinnamon, Apple & Walnuts":{serves:1,time:"10 min",ingredients:["1/2 cup rolled oats","1 cup milk","1 apple, diced","1/4 cup walnuts","1 tbsp maple syrup","1 tsp cinnamon"],steps:["Cook oats in milk 4-5 min.","Stir half the apple and cinnamon into oats.","Top with remaining apple, walnuts, maple syrup, and more cinnamon."],tip:"Cook the apple briefly in the oatmeal for a warm apple pie effect."},
"Egg & Cheese Breakfast Burrito":{serves:1,time:"12 min",ingredients:["1 large whole wheat tortilla","3 eggs","1/4 cup shredded cheddar","Salt, pepper","1 tbsp butter","Optional salsa"],steps:["Scramble eggs in butter over medium-low heat until just set.","Warm tortilla 30 sec in a dry pan.","Add eggs to center, top with cheese.","Fold and roll. Serve with salsa."],tip:"Wrap tightly in foil to keep it together while eating on the go."},
"Oatmeal with Brown Sugar & Cinnamon":{serves:1,time:"8 min",ingredients:["1/2 cup rolled oats","1 cup water or milk","1 tbsp brown sugar","1 tsp cinnamon","Pinch of salt"],steps:["Cook oats in liquid with salt 4-5 min.","Pour into bowl.","Top with brown sugar and cinnamon."],tip:"Brown sugar dissolves better when stirred in while oatmeal is still hot."},
"Smoothie with Banana, Peanut Butter & Oat Milk":{serves:1,time:"5 min",ingredients:["1 large frozen banana","2 tbsp peanut butter","1 cup oat milk","1 tsp honey","Pinch of cinnamon"],steps:["Add all ingredients to blender.","Blend until smooth and creamy.","Pour and drink immediately."],tip:"Oat milk makes this naturally creamier and thicker than almond milk."},
"Overnight Oats with Banana & Almond Butter":{serves:1,time:"5 min plus overnight",ingredients:["1/2 cup rolled oats","1 cup almond milk","1 tbsp almond butter","1 banana, sliced","1 tsp honey"],steps:["Mix oats, almond milk, honey in a jar.","Refrigerate overnight.","Top with banana and almond butter in the morning."],tip:"Stir the almond butter in halfway through eating for pockets of flavor."},
"Eggs Any Style with Whole Grain Toast & Fruit":{serves:1,time:"10 min",ingredients:["2-3 eggs, cooked however you like","2 slices whole grain toast","1 cup mixed fresh fruit","1 tbsp butter","Salt and pepper"],steps:["Cook eggs your preferred way — fried, scrambled, or poached.","Toast and butter the bread.","Prepare fresh fruit of your choice on the side.","Serve everything together."],tip:"This is the most flexible meal on the plan — make it exactly how you like it."},
"Greek Yogurt with Granola & Fresh Berries":{serves:1,time:"5 min",ingredients:["1 cup Greek yogurt","1/4 cup granola","1 cup fresh mixed berries","1 tbsp honey"],steps:["Spoon yogurt into bowl.","Add granola layer.","Top with fresh berries.","Drizzle honey."],tip:"Add a pinch of sea salt to Greek yogurt — it actually makes it taste richer."},
"Overnight Oats with Chia & Mixed Berries":{serves:1,time:"5 min plus overnight",ingredients:["1/2 cup rolled oats","1 cup milk","1 tbsp chia seeds","1 cup mixed berries","1 tbsp honey"],steps:["Mix oats, milk, chia seeds, honey in a jar.","Refrigerate overnight.","Top with mixed berries in the morning."],tip:"Shake the jar before refrigerating to evenly distribute the chia seeds."},
"Whole Grain Waffles with Sliced Strawberries & Honey":{serves:1,time:"15 min",ingredients:["1 cup whole wheat waffle mix","1 egg","3/4 cup milk","1 tbsp oil","1 cup strawberries, sliced","2 tbsp honey"],steps:["Mix waffle batter per package instructions.","Cook in preheated waffle iron until golden and crispy.","Top with strawberries and drizzle honey."],tip:"Don't open the waffle iron early — wait for steam to slow before checking."},
"Whole Grain Toast with Peanut Butter & Banana":{serves:1,time:"5 min",ingredients:["2 slices whole grain bread","2 tbsp peanut butter","1 banana, sliced"],steps:["Toast bread.","Spread peanut butter generously.","Top with banana slices."],tip:"Mash the banana into the peanut butter for a different but equally great texture."},
"Scrambled Eggs & Avocado on Toast":{serves:1,time:"10 min",ingredients:["3 eggs","1/2 avocado","2 slices whole grain toast","1 tbsp butter","Salt, pepper, chili flakes"],steps:["Scramble eggs in butter over medium-low heat until creamy.","Toast bread.","Slice or mash avocado on toast.","Top with eggs, salt, pepper, and chili flakes."],tip:"Add avocado after the eggs — it oxidizes quickly when warm."},
"Greek Yogurt Parfait with Granola & Blueberries":{serves:1,time:"5 min",ingredients:["1 cup Greek yogurt","1/4 cup granola","1 cup blueberries","1 tbsp honey"],steps:["Layer yogurt, granola, and blueberries in a bowl.","Drizzle honey."],tip:"Frozen blueberries thawed overnight are sweeter than out-of-season fresh ones."},
"Overnight Oats with Chia, Berries & Honey":{serves:1,time:"5 min plus overnight",ingredients:["1/2 cup rolled oats","1 cup milk","1 tbsp chia seeds","1 cup berries","2 tbsp honey"],steps:["Mix oats, milk, chia seeds, honey in a jar.","Refrigerate overnight.","Top with fresh or thawed berries in the morning."],tip:"Stir twice in the first 20 minutes to prevent chia clumping at the bottom."},
"Plain Scrambled Eggs with Toast":{serves:1,time:"8 min",ingredients:["3 eggs","1 tbsp butter","Salt to taste","2 slices bread, toasted"],steps:["Whisk eggs with a pinch of salt.","Melt butter in non-stick pan over low heat.","Add eggs and stir constantly with a spatula.","Cook slowly until just set and creamy.","Serve immediately with toast."],tip:"Low heat and constant stirring are the two secrets to perfect scrambled eggs."},
"Smooth Peanut Butter Oatmeal":{serves:1,time:"8 min",ingredients:["1/2 cup rolled oats","1 cup milk","2 tbsp smooth peanut butter","1 tbsp honey","Pinch of salt"],steps:["Cook oats in milk 4-5 min.","Remove from heat. Stir in peanut butter until fully blended.","Pour into bowl. Drizzle honey."],tip:"Stir peanut butter off the heat so it melts smoothly instead of clumping."},
"Banana & Vanilla Yogurt Parfait":{serves:1,time:"5 min",ingredients:["1 cup vanilla Greek yogurt","1 banana, sliced","1/4 cup granola","1 tbsp honey"],steps:["Spoon vanilla yogurt into bowl.","Layer banana on top.","Sprinkle granola and drizzle honey."],tip:"Vanilla yogurt makes this feel like dessert — a great thing at breakfast."},
"Oatmeal with Honey & Sliced Banana":{serves:1,time:"8 min",ingredients:["1/2 cup rolled oats","1 cup milk","1 banana, sliced","1 tbsp honey","Pinch of cinnamon"],steps:["Cook oats in milk 4-5 min.","Top with banana slices.","Drizzle honey and add cinnamon."],tip:"Bananas sliced right before serving look and taste better than pre-sliced ones."},
"Pancakes with Maple Syrup & Sliced Banana":{serves:1,time:"15 min",ingredients:["1/2 cup flour","1 egg","1/2 cup milk","1 tsp baking powder","1 tbsp sugar","Butter for pan","1 banana, sliced","2 tbsp maple syrup"],steps:["Mix flour, egg, milk, baking powder, sugar into batter.","Cook 1/4 cup portions in buttered pan, flip when bubbles form.","Top with banana and maple syrup."],tip:"A little sugar in the batter helps pancakes brown evenly."},
"Soft Scrambled Eggs with Buttered Toast":{serves:1,time:"8 min",ingredients:["3 eggs","1 tbsp butter plus more for toast","2 slices bread","Salt to taste"],steps:["Melt butter in non-stick pan over very low heat.","Whisk eggs with salt, add to pan.","Stir very gently with a spatula for 4-5 min.","Remove while slightly glossy. Serve on buttered toast."],tip:"These are the creamiest scrambled eggs possible — patience with low heat is everything."},
"Grilled Chicken Breast with Watermelon & Feta Salad":{serves:1,time:"20 min",ingredients:["1 chicken breast","2 cups watermelon, cubed","1/4 cup feta, crumbled","Mint leaves","1 tbsp olive oil","Juice of 1/2 lime","Salt and pepper"],steps:["Season chicken, cook 6-7 min per side. Rest 5 min.","Combine watermelon, feta, mint, lime, olive oil.","Slice chicken and serve alongside salad."],tip:"Let chicken rest before slicing — it keeps all the juices inside."},
"Turkey Lettuce Wraps with Pineapple Salsa":{serves:1,time:"15 min",ingredients:["5 oz ground turkey","4-5 large lettuce leaves","1 cup pineapple, finely diced","1/4 red onion, diced","Juice of 1 lime","Salt, pepper, cumin, garlic powder"],steps:["Cook turkey with cumin, garlic, salt, pepper 6-7 min.","Mix pineapple, onion, lime for salsa.","Spoon turkey into lettuce leaves and top with salsa."],tip:"Butter lettuce leaves are the most pliable — they won't crack when folded."},
"Beef & Veggie Stir-Fry with Orange Slices on the Side":{serves:1,time:"20 min",ingredients:["5 oz lean beef strips","1 cup broccoli florets","1 bell pepper, sliced","2 tbsp soy sauce","1 tsp sesame oil","1 garlic clove, minced","1 tsp ginger","1 large orange, sliced","Cooked brown rice to serve"],steps:["Mix soy sauce, sesame oil, garlic, ginger for sauce.","Sear beef in very hot pan 2 min. Remove.","Stir-fry veggies 3-4 min. Return beef and add sauce. Toss.","Serve over rice with orange slices on the side."],tip:"The orange slices are eaten alongside — vitamin C triples iron absorption from the beef."},
"Grilled Chicken Salad with Strawberries & Balsamic Vinaigrette":{serves:1,time:"20 min",ingredients:["1 chicken breast","3 cups mixed greens","1 cup strawberries, sliced","2 tbsp balsamic vinegar","1 tbsp olive oil","Salt, pepper"],steps:["Cook chicken 6-7 min per side. Rest and slice.","Whisk balsamic and olive oil for dressing.","Toss greens and strawberries with dressing. Top with chicken."],tip:"Balsamic and strawberries is a classic Italian combination that always works."},
"Turkey & Avocado Wrap with a Side of Sliced Mango":{serves:1,time:"10 min",ingredients:["1 large whole wheat tortilla","5 oz sliced turkey","1/2 avocado, sliced","1 cup spinach","Squeeze of lemon","Salt, pepper","1 mango, sliced"],steps:["Layer turkey, spinach, avocado on tortilla. Season and squeeze lemon.","Fold in sides and roll tightly.","Serve with sliced mango on the side."],tip:"Avocado keeps the wrap moist without needing heavy dressings."},
"Ground Beef Taco Bowl with Fresh Pico de Gallo & Mango Salsa":{serves:1,time:"20 min",ingredients:["5 oz lean ground beef","1 cup cooked brown rice","1/2 cup black beans","1 tomato, diced","1/4 onion, diced","1/2 mango, diced","Juice of 1 lime","Cilantro, salt, cumin"],steps:["Cook beef with cumin and salt 6-7 min.","Mix tomato, onion, lime for pico. Mix mango, lime, cilantro for mango salsa.","Layer rice, beans, beef in bowl. Top with both salsas."],tip:"Make the salsas first and let them sit — 10 minutes improves flavor dramatically."},
"Grilled Chicken Caesar Salad with Mandarin Oranges":{serves:1,time:"20 min",ingredients:["1 chicken breast","3 cups romaine, chopped","2 mandarin oranges, segmented","2 tbsp Caesar dressing","2 tbsp parmesan","Croutons optional"],steps:["Cook chicken 6-7 min per side. Rest and slice.","Toss romaine with Caesar dressing and parmesan.","Top with chicken, mandarin segments, and croutons."],tip:"The mandarins add sweetness that balances the salty Caesar perfectly."},
"Steak & Arugula Salad with Sliced Peaches & Lemon Dressing":{serves:1,time:"20 min",ingredients:["5 oz sirloin","3 cups arugula","1 ripe peach, sliced","Juice of 1 lemon","2 tbsp olive oil","Salt, pepper","Optional shaved parmesan"],steps:["Season steak. Sear 3-4 min per side. Rest 5 min and slice thin.","Whisk lemon and olive oil for dressing.","Toss arugula with dressing. Top with steak and peach slices."],tip:"Arugula plus peach plus steak is a classic Italian combination."},
"Chicken & Mango Brown Rice Bowl":{serves:1,time:"20 min",ingredients:["1 chicken breast","1 cup cooked brown rice","1 mango, diced","1/4 red onion, diced","Juice of 1 lime","Cilantro","Salt, pepper, chili powder"],steps:["Cook chicken with chili powder, salt, pepper 6-7 min per side.","Dice mango and onion. Mix with lime and cilantro.","Slice chicken. Layer rice in bowl, top with chicken and mango mixture."],tip:"Day-old brown rice from the fridge works even better than freshly cooked."},
"Turkey & Strawberry Spinach Salad with Balsamic":{serves:1,time:"10 min",ingredients:["5 oz sliced turkey breast","3 cups baby spinach","1 cup strawberries, sliced","1/4 red onion, thinly sliced","2 tbsp balsamic glaze","1 tbsp olive oil","Salt and pepper"],steps:["Arrange spinach in bowl.","Top with turkey, strawberries, and red onion.","Drizzle balsamic glaze and olive oil. Toss lightly."],tip:"Balsamic glaze is thicker and sweeter than regular vinegar — look for it in a bottle."},
"Beef Lettuce Tacos with Pineapple Salsa & Lime":{serves:1,time:"15 min",ingredients:["5 oz lean ground beef","4 large lettuce leaves","1 cup pineapple, finely diced","1/4 onion, diced","Juice of 2 limes","Cilantro","Salt, pepper, cumin"],steps:["Cook beef with cumin, salt, pepper 6-7 min.","Mix pineapple, onion, lime, cilantro for salsa.","Spoon beef into lettuce cups. Top with salsa and squeeze extra lime."],tip:"Press pineapple lightly against a strainer to reduce excess liquid in the salsa."},
"Chicken Thigh Bowl with Blueberry & Cucumber Salad":{serves:1,time:"25 min",ingredients:["2 chicken thighs, boneless","1 cup cooked brown rice","1 cup blueberries","1/2 cucumber, diced","1 tbsp olive oil","Juice of 1 lemon","Fresh mint"],steps:["Cook chicken thighs in oil 7-8 min per side.","Combine blueberries, cucumber, lemon juice, mint for salad.","Slice chicken. Serve over rice with blueberry cucumber salad alongside."],tip:"Blueberries plus cucumber plus mint is a surprisingly refreshing combination."},
"Turkey & Avocado Bowl with Sliced Kiwi on the Side":{serves:1,time:"10 min",ingredients:["5 oz sliced turkey","1/2 avocado, sliced","1 cup cooked quinoa or rice","1 cup spinach","2 kiwis, sliced","Juice of 1/2 lime","Salt, pepper"],steps:["Warm quinoa if needed.","Build bowl: quinoa, spinach, turkey, avocado. Drizzle lime juice.","Serve with sliced kiwi on the side."],tip:"Kiwi on the side adds vitamin C which boosts iron absorption from the turkey."},
"Grilled Chicken Sandwich with Sliced Peach & Arugula":{serves:1,time:"20 min",ingredients:["1 chicken breast","2 slices whole grain bread or 1 bun","1 peach, sliced","1 cup arugula","1 tbsp olive oil","Salt, pepper, garlic powder","Optional Dijon mustard"],steps:["Cook chicken 6-7 min per side. Toast bread.","Layer arugula on bread, top with chicken.","Add fresh peach slices and Dijon mustard."],tip:"Grill peach halves in the same pan as the chicken — they absorb all the flavor."},
"Grilled Chicken & Spinach Salad":{serves:1,time:"20 min",ingredients:["1 chicken breast","3 cups baby spinach","1/2 cup cherry tomatoes, halved","1/4 red onion, sliced","2 tbsp olive oil","1 tbsp lemon juice","Salt and pepper"],steps:["Cook chicken 6-7 min per side. Rest and slice.","Toss spinach, tomatoes, onion with olive oil and lemon.","Top with sliced chicken."],tip:"Add pumpkin seeds for extra magnesium and crunch."},
"Turkey & Veggie Soup with Whole Grain Roll":{serves:2,time:"30 min",ingredients:["6 oz ground turkey","1 cup carrots, diced","1 cup celery, diced","1 cup zucchini, diced","1 can diced tomatoes","3 cups chicken broth","1 garlic clove","Salt, pepper, Italian herbs","2 whole grain rolls"],steps:["Brown turkey in pot. Add garlic, carrots, celery 3 min.","Add zucchini, tomatoes, broth. Season. Simmer 20 min.","Serve with rolls."],tip:"This makes 2 servings — store the second for tomorrow's lunch."},
"Grilled Chicken Wrap with Avocado & Lettuce":{serves:1,time:"15 min",ingredients:["1 chicken breast","1 large whole wheat tortilla","1/2 avocado, sliced","2 romaine leaves","1 tomato, sliced","Salt, pepper, olive oil"],steps:["Cook chicken 6-7 min per side. Slice.","Warm tortilla. Layer lettuce, chicken, avocado, tomato.","Roll tightly."],tip:"Greek yogurt works as a healthy mayo alternative — same creamy texture."},
"Turkey & Avocado Salad with Lemon Dressing":{serves:1,time:"10 min",ingredients:["5 oz sliced turkey","1 avocado, cubed","3 cups mixed greens","1/2 cucumber, sliced","Juice of 1 lemon","2 tbsp olive oil","Salt and pepper"],steps:["Arrange greens in bowl.","Top with turkey, avocado, cucumber.","Whisk lemon and olive oil. Drizzle over salad and toss."],tip:"Cube the avocado instead of slicing — holds up better when tossed."},
"Chicken & Veggie Soup with Crusty Bread":{serves:2,time:"30 min",ingredients:["6 oz chicken breast, diced","1 cup carrots, sliced","1 cup celery, sliced","3 cups chicken broth","1 garlic clove, minced","Salt, pepper, thyme","Crusty whole grain bread"],steps:["Cook chicken in pot 4-5 min. Add garlic, carrots, celery, thyme.","Add broth. Simmer 20 min.","Serve with crusty bread for dipping."],tip:"Store leftover soup in the fridge — it tastes even better the next day."},
"Lentil & Roasted Veggie Bowl":{serves:1,time:"30 min",ingredients:["1/2 cup canned lentils, rinsed","1 zucchini, diced","1 bell pepper, diced","1 cup cherry tomatoes","1 tbsp olive oil","Salt, pepper, cumin, smoked paprika","Squeeze of lemon"],steps:["Roast veggies at 425F with oil and spices 20-22 min.","Warm lentils in pan with olive oil and cumin.","Top lentils with roasted veggies and squeeze lemon."],tip:"Canned lentils are already cooked — just rinse and warm."},
"Chickpea & Spinach Salad with Lemon Tahini":{serves:1,time:"10 min",ingredients:["1 can chickpeas, drained","2 cups baby spinach","1 cucumber, diced","2 tbsp tahini","Juice of 1 lemon","1 garlic clove, minced","Salt and water to thin"],steps:["Whisk tahini, lemon, garlic, salt with a splash of water until dressing consistency.","Toss chickpeas, spinach, cucumber together.","Drizzle tahini dressing generously."],tip:"Tahini dressing thickens as it sits — add more lemon juice to loosen it."},
"Veggie & Black Bean Burrito Bowl":{serves:1,time:"15 min",ingredients:["1 can black beans, drained","1 cup cooked brown rice","1 bell pepper, diced","1 cup corn","1/2 avocado, sliced","Salsa, lime juice","Salt, cumin"],steps:["Saute pepper with cumin and salt 3-4 min. Add corn and beans, heat through.","Layer rice in bowl. Top with bean mixture, avocado, salsa, and lime."],tip:"Naturally vegan, high-fiber, and incredibly filling."},
"Butternut Squash Soup with Crusty Bread":{serves:2,time:"35 min",ingredients:["1 small butternut squash, cubed","1 onion, diced","2 garlic cloves","3 cups vegetable broth","1 tbsp olive oil","Salt, pepper, nutmeg","Crusty bread"],steps:["Roast squash at 425F 20 min. Saute onion and garlic in oil 5 min.","Add squash and broth. Simmer 10 min. Blend until smooth.","Season with salt, pepper, nutmeg. Serve with bread."],tip:"A pinch of nutmeg in butternut squash soup makes it taste restaurant-quality."},
"BLT Wrap with Avocado":{serves:1,time:"10 min",ingredients:["1 large tortilla","4 strips turkey bacon","2 romaine leaves","1 tomato, sliced","1/2 avocado, sliced","Salt, pepper"],steps:["Cook turkey bacon until crispy.","Layer lettuce, tomato, avocado, bacon on tortilla. Season and roll up."],tip:"Turkey bacon gets crispier faster than pork — watch it closely."},
"Turkey & Avocado Club Sandwich":{serves:1,time:"10 min",ingredients:["3 slices whole grain bread","5 oz sliced turkey","1/2 avocado, sliced","2 romaine leaves","1 tomato, sliced","Salt, pepper"],steps:["Toast all 3 bread slices.","Layer turkey, avocado, lettuce, tomato between slices.","Cut diagonally and secure with toothpicks."],tip:"The middle slice of toast holds the club structure together."},
"Grilled Chicken Caesar Salad":{serves:1,time:"20 min",ingredients:["1 chicken breast","3 cups romaine, chopped","2 tbsp Caesar dressing","2 tbsp parmesan","Croutons optional","Salt and pepper"],steps:["Cook chicken 6-7 min per side. Rest and slice.","Toss romaine with Caesar dressing and parmesan.","Top with chicken and croutons."],tip:"Homemade Caesar with mayo, lemon, garlic, worcestershire, parmesan is far better than store-bought."},
"Turkey & Lentil Soup with Whole Grain Roll":{serves:2,time:"30 min",ingredients:["5 oz ground turkey","1/2 cup red lentils","1 carrot, diced","1 celery stalk","3 cups broth","1 garlic clove","Cumin, salt, pepper","Whole grain rolls"],steps:["Brown turkey in pot. Add garlic, carrot, celery 3 min.","Add lentils and broth. Simmer 20 min until lentils dissolve.","Season. Serve with rolls."],tip:"Red lentils dissolve naturally — no blending needed for thick creamy soup."},
"Roasted Veggie & Quinoa Salad":{serves:1,time:"30 min",ingredients:["1/2 cup quinoa","1 zucchini, diced","1 bell pepper, diced","1 cup cherry tomatoes","2 tbsp olive oil","Salt, pepper, herbs","Lemon juice"],steps:["Cook quinoa per package. Roast veggies at 425F 20-22 min.","Combine quinoa and roasted veggies.","Drizzle olive oil and lemon juice. Season well."],tip:"This tastes great warm or cold — make extra for lunch tomorrow."},
"White Bean & Kale Soup":{serves:2,time:"25 min",ingredients:["1 can white beans, drained","2 cups kale, chopped","1 onion, diced","2 garlic cloves","3 cups vegetable broth","1 tbsp olive oil","Salt, pepper, Italian herbs"],steps:["Saute onion and garlic in oil 4 min. Add kale and wilt 2 min.","Add beans and broth. Simmer 15 min.","Mash some beans against the side to thicken. Season."],tip:"Mashing some beans is the secret to making bean soup thick and hearty."},
"Grilled Chicken & Brown Rice Bowl":{serves:1,time:"20 min",ingredients:["1 chicken breast","1 cup cooked brown rice","1 cup steamed broccoli","1 tbsp olive oil","Salt, pepper, garlic powder","Soy sauce or lemon juice"],steps:["Cook chicken 6-7 min per side. Slice.","Steam broccoli 4-5 min.","Layer rice, broccoli, chicken in bowl. Drizzle soy sauce or lemon."],tip:"Brown rice takes 45 min from scratch — use microwavable pouches on busy days."},
"Turkey & Cheese Sandwich on Whole Grain Bread":{serves:1,time:"5 min",ingredients:["2 slices whole grain bread","4-5 oz sliced turkey","1-2 slices cheese of choice","Mustard or mayo","Lettuce, tomato"],steps:["Spread condiment on bread.","Layer turkey, cheese, lettuce, tomato. Press together."],tip:"Whole grain bread with seeds gives you fiber and healthy fats in every bite."},
"Grilled Chicken Salad with Strawberries & Balsamic":{serves:1,time:"20 min",ingredients:["1 chicken breast","3 cups mixed greens","1 cup strawberries, sliced","2 tbsp balsamic glaze","1 tbsp olive oil","Salt and pepper"],steps:["Cook chicken 6-7 min per side. Rest and slice.","Arrange greens and strawberries. Top with chicken.","Drizzle balsamic and olive oil."],tip:"Balsamic glaze is pre-reduced and much easier to use for salads than vinegar."},
"Turkey & Veggie Wrap with Side Fruit":{serves:1,time:"10 min",ingredients:["1 tortilla","5 oz sliced turkey","1 cup mixed veggies","1/2 avocado","Side of fresh fruit","Salt, pepper"],steps:["Layer turkey, veggies, avocado on tortilla. Season. Roll tightly.","Serve with fresh fruit on the side."],tip:"Keep fruit separate rather than in the wrap — the wrap stays crispier."},
"Chicken & Lentil Soup with Crusty Bread":{serves:2,time:"30 min",ingredients:["6 oz chicken breast, diced","1/2 cup red lentils","1 carrot, diced","1 celery stalk","3 cups chicken broth","1 garlic clove, minced","Salt, pepper, cumin, turmeric","Crusty bread"],steps:["Cook chicken 4 min. Add garlic, carrot, celery 3 min.","Add lentils, broth, spices. Simmer 20 min.","Adjust seasoning. Serve with crusty bread."],tip:"Turmeric turns this soup golden and adds anti-inflammatory benefits."},
"Grilled Chicken Sandwich with Side Salad":{serves:1,time:"20 min",ingredients:["1 chicken breast","1 whole grain bun","2 romaine leaves","1 tomato, sliced","Mustard or avocado spread","Side salad: greens, cucumber, olive oil, lemon"],steps:["Cook chicken 6-7 min per side.","Build sandwich with chicken, lettuce, tomato, mustard.","Dress side salad with olive oil and lemon."],tip:"Toast the bun in the same pan as the chicken to absorb all that flavor."},
"Tomato Soup with Grilled Cheese on Whole Grain":{serves:1,time:"20 min",ingredients:["1 can crushed tomatoes","1 cup vegetable broth","1 garlic clove","1/2 onion, diced","2 slices whole grain bread","2 slices cheese","1 tbsp butter","Salt, pepper, basil"],steps:["Saute onion and garlic in pot 4 min. Add tomatoes, broth, basil. Simmer 15 min. Blend smooth.","Butter bread on the outside. Fill with cheese. Grill in pan until golden both sides.","Serve soup with grilled cheese for dipping."],tip:"A grilled cheese flips perfectly when the bottom is golden — don't rush it."},
"Turkey Wrap with Spinach & Avocado":{serves:1,time:"10 min",ingredients:["1 tortilla","5 oz sliced turkey","2 cups baby spinach","1/2 avocado, sliced","Squeeze of lemon","Salt, pepper"],steps:["Layer spinach, turkey, avocado on tortilla. Squeeze lemon. Season.","Roll tightly."],tip:"Wilt the spinach in a pan for 30 seconds first if you prefer cooked greens."},
"Chicken & Veggie Soup with Whole Grain Roll":{serves:2,time:"30 min",ingredients:["6 oz chicken, diced","1 cup mixed veggies: carrots, celery, zucchini","3 cups chicken broth","1 garlic clove","Salt, pepper, thyme","2 whole grain rolls"],steps:["Brown chicken in pot 4-5 min. Add garlic and veggies 3 min.","Add broth and thyme. Simmer 20 min.","Serve with rolls."],tip:"This freezes beautifully — double it and freeze half for a future easy meal."},
"Grilled Chicken & Avocado Salad":{serves:1,time:"20 min",ingredients:["1 chicken breast","1 avocado, sliced","3 cups mixed greens","1/2 cucumber, sliced","Juice of 1 lemon","2 tbsp olive oil","Salt and pepper"],steps:["Cook chicken 6-7 min per side. Rest and slice.","Arrange greens, cucumber, avocado in bowl. Top with chicken.","Dress with lemon and olive oil."],tip:"Fan avocado slices across the top — looks impressive with zero effort."},
"Turkey & Veggie Wrap with Greek Yogurt Dip":{serves:1,time:"10 min",ingredients:["1 tortilla","5 oz sliced turkey","1 cup mixed veggies","1/2 cup Greek yogurt","1 garlic clove, minced","Dill, lemon juice, salt"],steps:["Mix yogurt, garlic, dill, lemon for a tzatziki-style dip.","Layer turkey and veggies on tortilla. Roll into wrap.","Serve with yogurt dip on the side."],tip:"This Greek yogurt dip also works as a spread inside the wrap."},
"Classic Grilled Chicken Sandwich with Sweet Potato Fries":{serves:1,time:"30 min",ingredients:["1 chicken breast","1 bun","1 medium sweet potato, cut into fries","2 tbsp olive oil","Salt, pepper, paprika, garlic powder","Lettuce, tomato"],steps:["Roast sweet potato fries at 425F 22-25 min, flipping halfway.","Cook chicken 6-7 min per side.","Build sandwich with chicken, lettuce, tomato. Serve with fries."],tip:"Cut sweet potato fries thin for crispiness — thick fries stay soft in the middle."},
"Turkey & Cheese Wrap with Apple":{serves:1,time:"8 min",ingredients:["1 tortilla","5 oz sliced turkey","1-2 slices cheese","1 apple, sliced","Lettuce, mustard"],steps:["Spread mustard on tortilla. Layer turkey, cheese, lettuce. Roll up.","Serve with apple slices on the side."],tip:"Crisp apple varieties like Honeycrisp or Fuji hold up best as a side."},
"Grilled Chicken BLT Sandwich":{serves:1,time:"20 min",ingredients:["1 chicken breast","3 strips turkey bacon","2 slices whole grain toast","Romaine leaves","1 tomato, sliced","1 tbsp mayo or avocado","Salt, pepper"],steps:["Cook turkey bacon until crispy. Cook chicken 6-7 min per side. Toast bread.","Layer mayo, lettuce, tomato, bacon, chicken between toast slices."],tip:"Slice the chicken diagonally — it fits the sandwich better and looks great."},
"Turkey & Avocado Wrap with Side Fruit":{serves:1,time:"10 min",ingredients:["1 tortilla","5 oz turkey","1/2 avocado","Lettuce, salt, pepper","Side of fresh fruit"],steps:["Layer turkey, avocado, lettuce on tortilla. Season. Roll tightly.","Serve with a side of fresh seasonal fruit."],tip:"Eat the fruit first if you want the sweetness to stimulate your appetite."},
"Chicken Noodle Soup with Whole Grain Roll":{serves:2,time:"30 min",ingredients:["6 oz chicken breast, diced","1 cup egg noodles or whole grain pasta","1 carrot, sliced","1 celery stalk, sliced","3 cups chicken broth","1 garlic clove","Salt, pepper, thyme","Whole grain rolls"],steps:["Cook chicken in broth with garlic 10 min. Add carrot and celery 10 min.","Add noodles, cook until tender. Season with thyme.","Serve with rolls."],tip:"Classic chicken noodle is one of the most genuinely healing meals there is."},
"Grilled Chicken Salad with Lemon Vinaigrette":{serves:1,time:"20 min",ingredients:["1 chicken breast","3 cups mixed greens","1/2 cucumber, sliced","1 cup cherry tomatoes","Juice of 1 lemon","2 tbsp olive oil","Salt and pepper"],steps:["Cook chicken 6-7 min per side. Rest and slice.","Whisk lemon and olive oil for dressing.","Toss greens and veggies with dressing. Top with chicken."],tip:"Lemon vinaigrette is the most versatile dressing — goes with almost any salad."},
"Turkey Club Sandwich with Side Salad":{serves:1,time:"10 min",ingredients:["3 slices whole grain bread","5 oz turkey","2 strips turkey bacon","Lettuce, tomato","1 tbsp mayo","Side salad"],steps:["Toast all 3 bread slices.","Layer turkey, bacon, lettuce, tomato with mayo between layers.","Serve with simple side salad."],tip:"A true club has 3 layers — the middle slice of toast holds the structure together."},
"Grilled Chicken & Avocado Wrap":{serves:1,time:"15 min",ingredients:["1 chicken breast","1 tortilla","1/2 avocado, sliced","Romaine leaves","Salt, pepper, olive oil","Optional lime juice"],steps:["Cook chicken 6-7 min per side. Slice. Warm tortilla.","Layer chicken, avocado, romaine. Squeeze lime. Roll tightly."],tip:"Slice avocado inside the wrap rather than mashing — holds together better."},
"Turkey & Spinach Salad with Balsamic Dressing":{serves:1,time:"10 min",ingredients:["5 oz sliced turkey","3 cups baby spinach","1/2 cup cherry tomatoes","1/4 red onion","2 tbsp balsamic vinegar","1 tbsp olive oil","Salt and pepper"],steps:["Arrange spinach in bowl. Top with turkey, tomatoes, red onion.","Whisk balsamic and olive oil. Drizzle and toss."],tip:"Balsamic plus spinach is a classic Italian combination. Simple and reliable."},
"Grilled Chicken Caesar Wrap":{serves:1,time:"15 min",ingredients:["1 chicken breast","1 tortilla","2 cups romaine, chopped","2 tbsp Caesar dressing","2 tbsp parmesan"],steps:["Cook chicken 6-7 min per side. Slice.","Toss romaine with Caesar dressing.","Fill tortilla with chicken, dressed romaine, parmesan. Roll tightly."],tip:"Wraps hold much longer than a salad — great for packing ahead."},
"Grilled Chicken & Veggie Wrap":{serves:1,time:"15 min",ingredients:["1 chicken breast","1 tortilla","1 cup mixed veggies: pepper, onion, zucchini","Salt, pepper, olive oil"],steps:["Saute veggies in oil 4-5 min. Cook chicken 6-7 min per side. Slice.","Fill tortilla with chicken and veggies. Season and roll."],tip:"Any vegetables in your fridge work here — clean out the drawer."},
"Turkey Soup with Whole Grain Roll":{serves:2,time:"25 min",ingredients:["6 oz ground turkey","1 carrot, diced","1 celery stalk","3 cups broth","Salt, pepper, Italian herbs","Whole grain rolls"],steps:["Brown turkey in pot. Add carrot and celery 3 min. Add broth. Simmer 15 min.","Season. Serve with rolls."],tip:"Ground turkey dissolves into soup more than chicken — creates a heartier broth."},
"Turkey & Avocado Wrap with Side Salad":{serves:1,time:"10 min",ingredients:["1 tortilla","5 oz turkey","1/2 avocado","Lettuce","Side salad: greens, olive oil, lemon"],steps:["Layer turkey, avocado, lettuce in tortilla. Roll.","Dress side salad. Serve together."],tip:"Keep the side salad separate — it keeps the wrap from getting soggy."},
"Grilled Chicken Strips with Mac & Cheese":{serves:1,time:"20 min",ingredients:["5 oz chicken breast, cut into strips","1 cup elbow pasta","1/4 cup milk","1/4 cup shredded cheddar","1 tbsp butter","Salt, pepper, garlic powder"],steps:["Cook pasta per package. Drain. Stir butter, milk, cheese into hot pasta until melted.","Season chicken strips. Cook in oiled pan 3-4 min per side.","Serve chicken alongside mac and cheese."],tip:"Add a splash of pasta water to loosen the cheese sauce if it gets too thick."},
"Plain Turkey Sandwich on Whole Grain Bread":{serves:1,time:"5 min",ingredients:["2 slices whole grain bread","4-5 oz sliced turkey","Butter or mayo","Optional cheese"],steps:["Spread butter or mayo on bread.","Layer turkey and cheese if using. Press together."],tip:"Keep it simple and consistent — familiarity at mealtimes is genuinely calming."},
"Buttered Pasta with Mild Chicken":{serves:1,time:"20 min",ingredients:["1 cup pasta of choice","1 chicken breast","2 tbsp butter","Salt","Optional parmesan"],steps:["Cook pasta. Reserve 1/4 cup pasta water. Season chicken with salt. Cook 6-7 min per side. Dice.","Drain pasta. Toss with butter and pasta water until glossy. Top with chicken."],tip:"Pasta water is starchy and makes the butter coat every noodle — don't skip it."},
"Chicken Nuggets with Plain Rice & Corn":{serves:1,time:"25 min",ingredients:["5 oz chicken breast, cut into 1-inch pieces","1/2 cup breadcrumbs","1 egg, beaten","Salt, garlic powder","1 cup white rice, cooked","1/2 cup corn"],steps:["Preheat oven 400F. Season breadcrumbs. Dip chicken in egg then breadcrumbs.","Bake on lined sheet 18-20 min, flipping halfway.","Serve with plain rice and warmed corn."],tip:"Don't crowd the pan — nuggets need space to get crispy, not steam."},
"Grilled Cheese Sandwich with Plain Chicken Soup":{serves:1,time:"20 min",ingredients:["2 slices bread","2 slices cheese","1 tbsp butter","1 cup chicken broth","1/2 cup shredded chicken","Salt, pepper"],steps:["Butter bread on outside. Fill with cheese. Cook in pan until golden both sides.","Warm broth with shredded chicken. Season.","Serve grilled cheese with soup for dipping."],tip:"Use rotisserie chicken shredded into broth for the fastest possible soup."},
"Turkey & Cheese Roll-Up with Apple Slices":{serves:1,time:"5 min",ingredients:["4-5 oz sliced turkey","2 slices cheese","1 apple, sliced","Optional mustard"],steps:["Lay cheese flat. Place turkey on cheese. Add mustard if using.","Roll up tightly. Serve with apple slices."],tip:"No bread needed — roll-ups are actually more satisfying than sandwiches for many people."},
"Plain Pasta with Mild Tomato Sauce & Chicken":{serves:1,time:"20 min",ingredients:["1 cup pasta","1 chicken breast","1/2 cup mild jarred tomato sauce","Salt, olive oil","Optional parmesan"],steps:["Cook pasta per package. Season chicken with salt. Cook 6-7 min per side. Dice.","Warm tomato sauce. Toss pasta with sauce. Top with chicken and parmesan."],tip:"A good jarred tomato sauce is a completely legitimate pantry staple — no shame in it."},
"Pan-Seared Steak with Roasted Sweet Potato & Fresh Blueberry Side":{serves:1,time:"30 min",ingredients:["6-8 oz sirloin steak","1 medium sweet potato, cubed","1/2 cup fresh blueberries","1 tbsp olive oil","1 tsp butter","Salt, pepper, garlic powder"],steps:["Roast sweet potato at 425F 22-25 min with oil and garlic.","Pat steak dry, season generously with salt and pepper.","Heat pan until smoking. Add butter. Sear 3-4 min per side.","Rest steak 5 min before slicing.","Serve with sweet potato and fresh blueberries on the side."],tip:"The blueberries are eaten fresh — their antioxidants are most potent uncooked."},
"Baked Chicken Thighs with Roasted Pineapple & Quinoa":{serves:1,time:"35 min",ingredients:["2 chicken thighs, boneless","3 pineapple rings","1 cup cooked quinoa","1 tbsp olive oil","Salt, pepper, garlic powder, smoked paprika"],steps:["Season chicken with oil and spices. Roast at 425F 25-28 min.","Add pineapple rings to pan last 8 min until caramelized.","Serve over quinoa."],tip:"Caramelized pineapple in the pan absorbs the chicken juices — it's incredible."},
"Sirloin Steak with Grilled Peaches & Asparagus":{serves:1,time:"25 min",ingredients:["6-8 oz sirloin","1 peach, halved","1 bunch asparagus, trimmed","1 tbsp olive oil","Salt, pepper, balsamic glaze"],steps:["Season steak. Sear in hot pan 3-4 min per side. Rest.","Grill peach halves cut-side down in same pan 3 min until caramelized.","Toss asparagus in oil, roast at 425F 10-12 min.","Serve steak with grilled peach and asparagus. Drizzle balsamic."],tip:"Grill marks on peaches add incredible depth — don't skip this step."},
"Grilled Chicken Thighs with Blueberry Balsamic Glaze & Roasted Veggies":{serves:1,time:"35 min",ingredients:["2 chicken thighs","1 cup blueberries","3 tbsp balsamic vinegar","1 tbsp honey","2 cups mixed vegetables","1 tbsp olive oil","Salt, pepper, garlic powder"],steps:["Roast veggies at 425F 20-22 min.","Cook chicken thighs in oiled pan 7-8 min per side.","Simmer blueberries, balsamic, honey in small pan 5 min until reduced.","Plate chicken over veggies. Spoon blueberry balsamic glaze on top."],tip:"The blueberry balsamic reduces to a jammy sauce — don't skip the simmer step."},
"Ribeye Steak with Roasted Broccoli & Mango Salsa":{serves:1,time:"25 min",ingredients:["6-8 oz ribeye","2 cups broccoli florets","1 mango, diced","1/4 red onion, diced","Juice of 1 lime","Cilantro","1 tbsp olive oil","Salt, pepper"],steps:["Roast broccoli at 425F with oil and salt 18-20 min.","Make mango salsa: mango, onion, lime, cilantro.","Season ribeye. Sear in smoking hot pan 3-4 min per side. Rest 5 min.","Serve ribeye with broccoli and mango salsa."],tip:"Ribeye has enough marbling to need nothing but salt, pepper, and a hot pan."},
"Chicken Thighs with Cherry Tomato Sauce & Quinoa":{serves:1,time:"30 min",ingredients:["2 chicken thighs","1 cup cherry tomatoes, halved","2 garlic cloves, minced","1/2 cup chicken broth","1 cup cooked quinoa","1 tbsp olive oil","Salt, pepper, fresh basil"],steps:["Sear chicken thighs 6-7 min per side. Remove.","Saute garlic in same pan 1 min. Add tomatoes and broth. Simmer 5 min.","Return chicken, simmer 5 more min.","Serve over quinoa with fresh basil."],tip:"Cherry tomatoes burst and create their own sauce — the more the better."},
"Beef & Mango Stir-Fry with Brown Rice":{serves:1,time:"20 min",ingredients:["5 oz lean beef strips","1 mango, cut into chunks","1 bell pepper, sliced","2 tbsp soy sauce","1 tsp sesame oil","1 garlic clove, ginger","1 cup cooked brown rice"],steps:["Sear beef strips in very hot pan 2 min. Remove.","Stir-fry pepper and garlic 2-3 min. Add mango, toss gently 1 min.","Return beef. Add soy sauce and sesame oil. Toss.","Serve over brown rice."],tip:"Add the mango at the very end — it just needs warming, not cooking."},
"Grilled Chicken with Peach & Arugula Salad":{serves:1,time:"20 min",ingredients:["1 chicken breast","1 ripe peach, sliced","3 cups arugula","1 tbsp olive oil","1 tbsp balsamic glaze","Salt, pepper","Optional goat cheese"],steps:["Cook chicken 6-7 min per side. Rest and slice.","Arrange arugula on a plate.","Top with chicken and peach slices.","Drizzle balsamic glaze and olive oil."],tip:"Peach plus arugula plus balsamic is a flavor combination that works every single time."},
"Turkey Meatballs with Zucchini Noodles & Strawberry Caprese Side":{serves:1,time:"30 min",ingredients:["5 oz ground turkey","2 zucchini, spiralized","1/2 cup marinara sauce","1 cup strawberries, sliced","Fresh mozzarella, a few slices","Basil leaves","Olive oil, salt, Italian seasoning, egg, breadcrumbs"],steps:["Mix turkey with egg, breadcrumbs, Italian seasoning, salt. Form 6 meatballs.","Bake at 400F 18-20 min.","Saute zucchini noodles in oil 2-3 min — don't overcook.","Make caprese: layer strawberries, mozzarella, basil, drizzle olive oil.","Serve meatballs over zoodles with marinara. Caprese on the side."],tip:"Strawberry caprese is a classic Northern Italian summer dish."},
"Steak Tacos with Pineapple Salsa & Avocado":{serves:1,time:"20 min",ingredients:["5 oz sirloin","3-4 small tortillas","1 cup pineapple, finely diced","1/4 onion, diced","Jalapeno, cilantro, lime","1 avocado, sliced","Salt, pepper, cumin"],steps:["Season steak with cumin, salt, pepper. Sear 3-4 min per side. Rest and slice thin.","Mix pineapple, onion, jalapeno, cilantro, lime for salsa.","Warm tortillas. Fill with steak, salsa, avocado."],tip:"Slice steak against the grain for the most tender taco filling."},
"Baked Chicken Breast with Watermelon & Cucumber Side Salad":{serves:1,time:"30 min",ingredients:["1 chicken breast","2 cups watermelon, cubed","1 cucumber, diced","Mint leaves","Juice of 1 lime","1 tbsp olive oil","Salt, pepper, garlic powder"],steps:["Season chicken and bake at 425F 22-25 min.","Combine watermelon, cucumber, mint, lime for side salad.","Rest chicken 5 min. Slice. Serve with watermelon salad."],tip:"The watermelon-cucumber salad takes 3 minutes and makes any baked chicken feel special."},
"Ground Beef Bowl with Roasted Sweet Potato & Sliced Kiwi Side":{serves:1,time:"30 min",ingredients:["5 oz lean ground beef","1 sweet potato, cubed","1 cup spinach","2 kiwis, sliced","1 tbsp olive oil","Salt, pepper, cumin, garlic powder"],steps:["Roast sweet potato at 425F 22-25 min.","Cook beef with cumin, garlic, salt 6-7 min. Wilt spinach into beef last 1 min.","Build bowl with beef, spinach, sweet potato on top.","Serve kiwi slices alongside."],tip:"Kiwi is a great digestive aid and pairs surprisingly well with savory beef bowls."},
"Grilled Turkey Patties with Grilled Peach & Spinach Salad":{serves:1,time:"25 min",ingredients:["5 oz ground turkey, formed into 2 patties","1 peach, halved","3 cups baby spinach","1 tbsp olive oil","1 tbsp balsamic glaze","Salt, pepper"],steps:["Cook turkey patties in oiled pan 5-6 min per side.","Grill peach halves cut-side down in same pan 3 min.","Arrange spinach on plate. Top with patties and grilled peach.","Drizzle balsamic glaze."],tip:"Grilling the peach in the turkey drippings is the trick — it absorbs all the flavor."},
"Chicken Thigh with Roasted Pineapple, Peppers & Brown Rice":{serves:1,time:"35 min",ingredients:["2 chicken thighs","1 cup pineapple chunks","1 bell pepper, sliced","1 cup cooked brown rice","1 tbsp olive oil","Salt, pepper, chili powder"],steps:["Toss pineapple and pepper with oil and chili powder.","Season chicken thighs. Roast everything on a sheet pan at 425F 25-28 min.","Serve over brown rice."],tip:"Everything on one pan means almost no cleanup — pineapple caramelizes beautifully."},
"Sirloin with Blueberry Reduction Sauce & Roasted Asparagus":{serves:1,time:"30 min",ingredients:["6-8 oz sirloin","1 cup blueberries","1/4 cup balsamic vinegar","1 tbsp honey","1 bunch asparagus","1 tbsp olive oil","Salt, pepper, butter"],steps:["Roast asparagus at 425F with oil and salt 12 min.","Season steak. Sear in hot buttered pan 3-4 min per side. Rest.","In same pan add blueberries, balsamic, honey. Simmer 5 min.","Plate steak with asparagus. Spoon blueberry reduction over steak."],tip:"Using the steak drippings in the sauce is what makes it taste restaurant-quality."},
"Baked Chicken Breast with Roasted Veggies":{serves:1,time:"30 min",ingredients:["1 chicken breast","2 cups mixed veggies: zucchini, bell pepper, onion, tomato","2 tbsp olive oil","Salt, pepper, garlic powder, Italian herbs"],steps:["Preheat oven 425F. Toss veggies with oil and salt.","Rub chicken with remaining oil and seasonings.","Roast chicken and veggies together 22-25 min.","Rest chicken 5 min before serving."],tip:"Cut vegetables into similar sizes so they all cook evenly."},
"Lean Ground Turkey Taco Bowls":{serves:1,time:"20 min",ingredients:["5 oz lean ground turkey","1 cup cooked brown rice","1/2 cup black beans","1/2 avocado, sliced","Salsa, lime, cilantro","Salt, cumin, chili powder"],steps:["Cook turkey with cumin, chili, salt 6-7 min.","Layer rice, beans, turkey in a bowl.","Top with avocado, salsa, cilantro. Squeeze lime over everything."],tip:"Add a splash of water to turkey while cooking — keeps it moist."},
"Grilled Chicken Thighs with Roasted Zucchini & Rice":{serves:1,time:"30 min",ingredients:["2 chicken thighs","2 zucchini, sliced","1 cup cooked rice","1 tbsp olive oil","Salt, pepper, garlic powder, herbs"],steps:["Toss zucchini with oil, salt, garlic. Season chicken thighs.","Roast everything together on sheet pan at 425F 25-28 min.","Serve over rice."],tip:"Chicken thighs are more forgiving than breast — harder to overcook and more flavorful."},
"Lean Ground Beef Stir-Fry with Mixed Veggies & Brown Rice":{serves:1,time:"20 min",ingredients:["5 oz lean ground beef","1 cup broccoli florets","1 carrot, thinly sliced","1/2 cup snap peas","2 tbsp soy sauce","1 garlic clove, ginger","1 cup cooked brown rice"],steps:["Brown ground beef in hot pan. Drain excess fat.","Add garlic and ginger 30 sec. Add all vegetables, stir-fry 4-5 min.","Add soy sauce and toss.","Serve over brown rice."],tip:"Ground beef stir-fry is faster than strip steak — no slicing required."},
"Oven-Roasted Chicken Breast with Cauliflower Mash":{serves:1,time:"35 min",ingredients:["1 chicken breast","1 small head cauliflower, cut into florets","2 tbsp butter","1/4 cup milk","2 garlic cloves","Salt, pepper, olive oil"],steps:["Season chicken and roast at 425F 22-25 min.","Steam cauliflower until very soft 10-12 min.","Blend cauliflower with butter, milk, garlic, salt until ultra-smooth.","Slice rested chicken and serve over cauliflower mash."],tip:"Cauliflower mash needs to be blended well — the longer you blend, the creamier it gets."},
"Roasted Veggie & Chickpea Curry with Brown Rice":{serves:2,time:"30 min",ingredients:["1 can chickpeas, drained","1 zucchini, diced","1 bell pepper, diced","1 can coconut milk","2 tbsp curry powder","1 garlic clove","1 tbsp olive oil","Brown rice to serve","Salt"],steps:["Saute garlic in oil 1 min. Add veggies and curry powder 3 min.","Add chickpeas and coconut milk. Simmer 15 min. Season with salt.","Serve over brown rice."],tip:"This reheats perfectly and tastes better the next day — make double."},
"Black Bean & Sweet Potato Tacos":{serves:1,time:"25 min",ingredients:["1 can black beans, drained","1 sweet potato, diced small","3-4 small tortillas","1/2 avocado, sliced","Salsa, lime, cilantro","1 tbsp olive oil","Salt, cumin, chili powder"],steps:["Toss sweet potato with oil, cumin, chili. Roast at 425F 20 min.","Warm black beans with a pinch of cumin and salt.","Warm tortillas in a dry pan.","Fill with beans and sweet potato. Top with avocado, salsa, cilantro, lime."],tip:"Roasted sweet potato and black beans is a combination that's both filling and delicious."},
"Grilled Steak with Roasted Potatoes & Broccoli":{serves:1,time:"35 min",ingredients:["6-8 oz sirloin","1 medium potato, cubed","2 cups broccoli florets","2 tbsp olive oil","Salt, pepper, garlic powder","1 tsp butter"],steps:["Roast potato at 425F with oil, salt, garlic 15 min. Add broccoli, roast 15 more min.","Season steak. Sear in hot buttered pan 3-4 min per side. Rest 5 min.","Serve steak with potatoes and broccoli."],tip:"Start the potatoes before everything else — they take the longest."},
"Lemon Herb Chicken with Rice Pilaf":{serves:1,time:"30 min",ingredients:["1 chicken breast or 2 thighs","1 cup jasmine rice","1.75 cup chicken broth","1 tbsp butter","Lemon zest and juice","2 garlic cloves","Fresh thyme, parsley","Salt, pepper, olive oil"],steps:["Toast rice in butter 2 min. Add broth, bring to boil, cover, simmer 18 min.","Season chicken with lemon zest, garlic, thyme, olive oil, salt, pepper.","Cook chicken 6-7 min per side.","Fluff rice with fork. Stir in parsley and lemon juice.","Serve chicken over pilaf."],tip:"Toasting the rice in butter before adding liquid is what makes pilaf restaurant-quality."},
"Ground Beef & Vegetable Stew with Crusty Bread":{serves:2,time:"35 min",ingredients:["6 oz lean ground beef","1 carrot, diced","1 potato, diced","1 celery stalk","1 can diced tomatoes","2 cups beef broth","Salt, pepper, thyme, garlic","Crusty bread"],steps:["Brown beef in a pot. Drain excess fat.","Add garlic, carrot, potato, celery 4 min.","Add tomatoes, broth, thyme. Simmer 20-25 min.","Season well. Serve with crusty bread."],tip:"Stew always tastes better the next day — perfect for meal prepping."},
"Baked Chicken Thighs with Roasted Root Vegetables":{serves:1,time:"40 min",ingredients:["2 chicken thighs","1 parsnip, diced","1 carrot, diced","1 potato, diced","1 tbsp olive oil","Salt, pepper, rosemary, garlic powder"],steps:["Preheat oven 425F.","Toss root veggies with oil, rosemary, garlic, salt. Season chicken.","Place everything in a baking dish.","Roast 35-38 min until chicken is golden and veggies are tender."],tip:"Root vegetables roasted with chicken absorb all the chicken drippings — incredible flavor."},
"Lentil Soup with Whole Grain Bread":{serves:2,time:"30 min",ingredients:["1 cup red lentils","1 carrot, diced","1 onion, diced","2 garlic cloves","1 can diced tomatoes","4 cups vegetable broth","1 tbsp olive oil","Cumin, turmeric, paprika, salt","Whole grain bread"],steps:["Saute onion and garlic in oil 4 min. Add carrot and spices 2 min.","Add lentils, tomatoes, broth. Simmer 20 min until lentils dissolve.","Season and serve with whole grain bread."],tip:"Red lentils dissolve naturally — no blending needed for a thick, creamy soup."},
"Oven-Baked Chicken Thighs with Roasted Root Vegetables":{serves:1,time:"40 min",ingredients:["2 chicken thighs","1 sweet potato, cubed","2 carrots, sliced","1 tbsp olive oil","Salt, pepper, garlic powder, thyme"],steps:["Preheat oven 425F. Toss vegetables with oil, garlic, thyme, salt. Season chicken.","Roast together 35-38 min."],tip:"Bone-in chicken thighs stay juicier — boneless work too but cook slightly faster."},
"Lean Ground Beef Tacos with Black Beans":{serves:1,time:"20 min",ingredients:["5 oz lean ground beef","1/2 can black beans, warmed","3-4 tortillas","Salsa, avocado, cilantro, lime","Salt, cumin, chili powder"],steps:["Cook beef with cumin, chili, salt 6-7 min.","Warm beans with a pinch of cumin.","Fill tortillas with beef and beans. Top with salsa, avocado, cilantro, lime."],tip:"Beans in tacos add fiber that slows absorption — great for blood sugar."},
"Sirloin Steak with Roasted Potatoes & Green Beans":{serves:1,time:"35 min",ingredients:["6-8 oz sirloin","1 medium potato, cubed","2 cups green beans, trimmed","2 tbsp olive oil","Salt, pepper, garlic powder","1 tsp butter"],steps:["Roast potatoes at 425F with oil, salt, garlic 25 min. Add green beans last 12 min.","Season steak. Sear in hot buttered pan 3-4 min per side. Rest.","Serve steak with potatoes and green beans."],tip:"Green beans roasted at high heat get slightly crispy at the edges — much better than steamed."},
"Baked Chicken Breast with Quinoa & Roasted Zucchini":{serves:1,time:"30 min",ingredients:["1 chicken breast","1/2 cup quinoa","1 cup chicken broth","2 zucchini, sliced","1 tbsp olive oil","Salt, pepper, Italian herbs, garlic powder"],steps:["Cook quinoa in broth per package.","Toss zucchini with oil, salt, herbs. Roast at 425F 18-20 min.","Season and bake chicken at 425F 22-25 min.","Serve chicken over quinoa with zucchini alongside."],tip:"Cooking quinoa in broth instead of water doubles the flavor."},
"Ground Turkey Stuffed Bell Peppers with Brown Rice":{serves:2,time:"40 min",ingredients:["2 large bell peppers","5 oz ground turkey","1 cup cooked brown rice","1/2 cup diced tomatoes","1 garlic clove","Italian seasoning, salt, pepper","Shredded mozzarella optional"],steps:["Preheat oven 375F. Halve peppers and remove seeds.","Cook turkey with garlic, Italian seasoning, salt. Mix with rice and tomatoes.","Fill pepper halves. Bake 25 min. Add cheese last 5 min if using."],tip:"Use any color pepper — red and orange are sweeter, green is more savory."},
"Chicken & White Bean Stew":{serves:2,time:"30 min",ingredients:["6 oz chicken breast, diced","1 can white beans, drained","1 cup spinach","1 garlic clove","1/2 onion, diced","2 cups chicken broth","1 tbsp olive oil","Salt, pepper, rosemary"],steps:["Saute onion and garlic in oil 4 min. Add chicken 5 min.","Add beans, broth, rosemary. Simmer 15 min.","Stir in spinach until wilted. Season."],tip:"Mash some beans against the pot wall to make the stew naturally creamy."},
"Baked Chicken Breast with Roasted Veggies & Brown Rice":{serves:1,time:"35 min",ingredients:["1 chicken breast","2 cups mixed vegetables","1 cup cooked brown rice","2 tbsp olive oil","Salt, pepper, garlic powder, paprika, oregano"],steps:["Preheat oven 425F. Toss veggies with oil and salt.","Season chicken with paprika, garlic, oregano.","Roast chicken and veggies together 22-25 min.","Rest chicken. Serve over brown rice."],tip:"Use a meat thermometer — 165F for chicken, every time, no guessing."},
"Lean Beef Stir-Fry with Mixed Veggies & Noodles":{serves:1,time:"20 min",ingredients:["5 oz lean beef strips","1 cup mixed veggies: broccoli, snap peas, carrots","1 cup cooked noodles","2 tbsp soy sauce","1 tsp sesame oil","Garlic, ginger"],steps:["Cook noodles per package.","Sear beef in hot pan 2 min. Remove. Stir-fry veggies with garlic and ginger 3-4 min.","Return beef. Add soy sauce and sesame oil. Toss with noodles."],tip:"High heat and quick cooking is the secret to stir-fry — don't crowd the pan."},
"Grilled Chicken Thighs with Roasted Sweet Potato":{serves:1,time:"35 min",ingredients:["2 chicken thighs","1 large sweet potato, cubed","1 tbsp olive oil","Salt, pepper, garlic powder, smoked paprika"],steps:["Preheat oven 425F. Toss sweet potato with oil and paprika. Season chicken.","Roast both together 28-30 min."],tip:"Smoked paprika on both chicken and sweet potato ties the flavors together."},
"Ground Beef Pasta with Marinara & Side Salad":{serves:1,time:"25 min",ingredients:["5 oz lean ground beef","1 cup pasta","1/2 cup marinara sauce","Side salad: greens, cucumber, olive oil, lemon","Salt, Italian seasoning, garlic"],steps:["Cook pasta per package. Brown beef with garlic and Italian seasoning. Add marinara, simmer 5 min.","Toss pasta with meat sauce. Serve with side salad."],tip:"Reserve a little pasta water to loosen the sauce if it gets too thick."},
"Baked Lemon Herb Chicken with Roasted Potatoes":{serves:1,time:"35 min",ingredients:["1 chicken breast","1 potato, cubed","Juice and zest of 1 lemon","2 garlic cloves, minced","Fresh or dried thyme","1 tbsp olive oil","Salt and pepper"],steps:["Preheat oven 425F. Roast potatoes with oil, salt, garlic 15 min.","Mix lemon zest, juice, thyme, oil for marinade. Coat chicken.","Add chicken to pan. Roast 22-25 min more.","Rest chicken 5 min. Serve with potatoes."],tip:"Lemon zest in the marinade is much more intense than lemon juice alone."},
"Grilled Steak & Veggie Skewers with Rice":{serves:1,time:"25 min",ingredients:["5 oz sirloin, cut into chunks","1 bell pepper, chunked","1 zucchini, sliced","1/2 red onion, chunked","1 tbsp olive oil","Salt, pepper, garlic powder","1 cup cooked rice"],steps:["Thread beef and veggies alternately on skewers. Brush with oil, season.","Grill or broil 3-4 min per side until beef is cooked.","Serve skewers over rice."],tip:"Soak wooden skewers in water 30 min before using to prevent burning."},
"Baked Chicken Thighs with Roasted Sweet Potato & Broccoli":{serves:1,time:"35 min",ingredients:["2 chicken thighs","1 sweet potato, cubed","2 cups broccoli florets","1 tbsp olive oil","Salt, pepper, garlic powder, smoked paprika"],steps:["Preheat oven 425F. Toss sweet potato with oil and paprika. Roast 12 min.","Add broccoli and seasoned chicken thighs. Roast 22-25 more min.","Check chicken is 165F. Serve together."],tip:"Adding broccoli partway through means both it and the chicken finish at the same time."},
"Lean Beef Tacos with Avocado & Pico de Gallo":{serves:1,time:"20 min",ingredients:["5 oz lean ground beef","3-4 tortillas","1 avocado, sliced","1 tomato, diced","1/4 onion, diced","Jalapeno, cilantro, lime","Salt, cumin, chili powder"],steps:["Cook beef with cumin, chili, salt 6-7 min.","Mix tomato, onion, jalapeno, cilantro, lime for pico.","Warm tortillas. Fill with beef, avocado, pico. Squeeze extra lime."],tip:"Fresh pico de gallo takes 3 minutes and is infinitely better than jarred salsa."},
"Oven-Roasted Chicken with Root Vegetables & Quinoa":{serves:1,time:"40 min",ingredients:["1 chicken breast","1 carrot, diced","1 parsnip, diced","1 cup cooked quinoa","1 tbsp olive oil","Salt, pepper, rosemary, garlic powder"],steps:["Preheat oven 425F. Toss root veggies with oil, rosemary, garlic. Season chicken.","Roast together 30-35 min.","Serve over quinoa."],tip:"Quinoa cooked in chicken broth absorbs all the savory flavor."},
"Baked Chicken with Mashed Potatoes & Green Beans":{serves:1,time:"35 min",ingredients:["1 chicken breast","2 medium potatoes, peeled and cubed","2 cups green beans","2 tbsp butter","1/4 cup warm milk","Salt, pepper, garlic powder"],steps:["Bake chicken at 425F 22-25 min.","Boil potatoes until tender 15 min. Drain. Mash with butter, warm milk, salt.","Steam green beans 4-5 min.","Serve chicken with mash and green beans."],tip:"Warm the milk before adding to mash — cold milk makes mashed potatoes gluey."},
"Ground Beef Pasta with Marinara Sauce":{serves:1,time:"25 min",ingredients:["5 oz lean ground beef","1 cup pasta","1/2 cup marinara sauce","1 garlic clove","Italian seasoning, salt","Parmesan optional"],steps:["Cook pasta per package. Brown beef with garlic and Italian seasoning.","Add marinara, simmer 5 min. Toss with pasta. Top with parmesan."],tip:"A good marinara is just garlic, olive oil, canned tomatoes, and 20 minutes — or use a trusted jar."},
"Grilled Steak with Mashed Potatoes & Green Beans":{serves:1,time:"30 min",ingredients:["6-8 oz sirloin","2 potatoes, peeled and cubed","2 cups green beans","2 tbsp butter","1/4 cup warm milk","Salt, pepper, garlic powder","1 tsp butter for pan"],steps:["Boil potatoes until tender 15 min. Mash with butter, warm milk, salt.","Steam green beans 4-5 min.","Season steak. Sear in hot buttered pan 3-4 min per side. Rest.","Serve steak with mash and green beans."],tip:"A proper sear needs a very hot pan — don't add steak until it's smoking."},
"Ground Turkey Taco Bowl with Brown Rice & Beans":{serves:1,time:"20 min",ingredients:["5 oz ground turkey","1/2 cup black beans, warmed","1 cup cooked brown rice","Salsa, avocado, cilantro, lime","Salt, cumin, chili powder"],steps:["Cook turkey with cumin, chili, salt 6-7 min.","Layer rice, beans, turkey in bowl.","Top with salsa, avocado, cilantro. Squeeze lime."],tip:"Brown rice taco bowls reheat perfectly — great for meal prep."},
"Baked Chicken Breast with Sweet Potato & Corn":{serves:1,time:"30 min",ingredients:["1 chicken breast","1 sweet potato, cubed","1/2 cup corn","1 tbsp olive oil","Salt, pepper, garlic powder"],steps:["Toss sweet potato with oil, salt, garlic. Season chicken.","Roast chicken and sweet potato at 425F 22-25 min.","Warm corn and serve alongside."],tip:"Canned corn is perfectly fine — drain and warm with a tiny bit of butter."},
"Grilled Steak with Roasted Sweet Potato & Broccoli":{serves:1,time:"35 min",ingredients:["6-8 oz sirloin","1 sweet potato, cubed","2 cups broccoli florets","2 tbsp olive oil","Salt, pepper, garlic powder","1 tsp butter"],steps:["Roast sweet potato at 425F 15 min. Add broccoli, roast 15 more min.","Season steak. Sear in hot buttered pan 3-4 min per side. Rest.","Serve steak with vegetables."],tip:"Don't press down on the steak — let the crust build naturally for 3 full minutes."},
"Baked Chicken Thighs with Garlic Mashed Potatoes":{serves:1,time:"35 min",ingredients:["2 chicken thighs","2 potatoes, peeled and cubed","3 garlic cloves","2 tbsp butter","1/4 cup warm milk","Salt, pepper, olive oil"],steps:["Season chicken thighs and roast at 425F 30-32 min.","Boil potatoes and garlic together until tender. Drain.","Mash with butter, warm milk, salt until smooth.","Serve chicken thighs over garlic mash."],tip:"Boiling garlic with the potatoes infuses a mellower garlic flavor than adding it raw."},
"Ground Beef Burrito Bowl with Brown Rice & Avocado":{serves:1,time:"20 min",ingredients:["5 oz lean ground beef","1 cup cooked brown rice","1/2 can black beans","1 avocado, sliced","Salsa, lime, cilantro","Salt, cumin, chili powder"],steps:["Cook beef with cumin, chili, salt 6-7 min.","Layer rice, beans, beef in a bowl.","Top with avocado and salsa. Squeeze lime, add cilantro."],tip:"Warm the black beans with a pinch of cumin — it completely transforms them."},
"Baked Chicken Thighs with Roasted Cauliflower & Wild Rice":{serves:1,time:"35 min",ingredients:["2 chicken thighs","1 small head cauliflower, cut into florets","1 cup cooked wild rice","1 tbsp olive oil","Salt, pepper, garlic powder, cumin"],steps:["Preheat oven 425F. Toss cauliflower with oil, cumin, salt. Season chicken.","Roast together 30-32 min. Serve over wild rice."],tip:"Wild rice has a nuttier flavor than white or brown — pairs well with bolder-spiced chicken."},
"Oven-Roasted Chicken with Vegetables & Quinoa":{serves:1,time:"35 min",ingredients:["1 chicken breast","2 cups mixed vegetables","1/2 cup quinoa","1 cup chicken broth","1 tbsp olive oil","Salt, pepper, Italian herbs"],steps:["Cook quinoa in broth per package. Toss vegetables with oil, salt, herbs.","Roast veggies at 425F 20 min. Season and bake chicken 22-25 min.","Serve chicken over quinoa with vegetables."],tip:"Roasting vegetables alongside the chicken saves time and pans."},
"Lean Beef Stir-Fry with Noodles & Mixed Veggies":{serves:1,time:"20 min",ingredients:["5 oz lean beef strips","1 cup noodles, cooked","1 cup mixed veggies","2 tbsp soy sauce","Garlic, ginger, sesame oil"],steps:["Sear beef in very hot pan 2 min. Remove. Stir-fry veggies with garlic and ginger 3-4 min.","Return beef, add soy sauce and sesame oil. Toss with noodles."],tip:"Add a soft-boiled egg on top — it makes any noodle dish feel complete."},
"Chicken & Veggie Stir-Fry with Brown Rice":{serves:1,time:"20 min",ingredients:["1 chicken breast, sliced thin","1 cup mixed veggies: broccoli, snap peas, carrot","2 tbsp soy sauce","1 garlic clove, ginger","1 tsp sesame oil","1 cup cooked brown rice"],steps:["Slice chicken thin. Sear in hot pan 3-4 min. Remove.","Stir-fry veggies with garlic and ginger 3 min.","Return chicken, add soy sauce and sesame oil. Serve over brown rice."],tip:"Slice chicken thin and against the grain — it cooks faster and stays tender."},
"Grilled Steak with Roasted Potatoes & Asparagus":{serves:1,time:"35 min",ingredients:["6-8 oz sirloin","1 medium potato, cubed","1 bunch asparagus, trimmed","2 tbsp olive oil","Salt, pepper, garlic powder","1 tsp butter"],steps:["Roast potatoes at 425F 15 min. Add asparagus, roast 12 more min.","Season steak. Sear in hot buttered pan 3-4 min per side. Rest.","Serve steak with potatoes and asparagus."],tip:"Asparagus roasted at high heat gets crispy at the tips — far better than boiled."},
"Baked Chicken Thighs with Wild Rice & Broccoli":{serves:1,time:"35 min",ingredients:["2 chicken thighs","1 cup cooked wild rice","2 cups broccoli florets","1 tbsp olive oil","Salt, pepper, garlic powder, thyme"],steps:["Season chicken. Toss broccoli with oil, salt. Roast both together at 425F 28-30 min.","Serve over wild rice."],tip:"Wild rice is chewier than white rice — add a bit of extra broth to make it more tender."},
"Baked Chicken Tenders with Rice & Corn":{serves:1,time:"25 min",ingredients:["5 oz chicken tenders","1/2 cup breadcrumbs","1 egg, beaten","Salt, pepper, garlic powder","1 cup cooked white rice","1/2 cup corn"],steps:["Preheat oven 400F. Season breadcrumbs. Dip tenders in egg then breadcrumbs.","Bake on lined sheet 18-20 min, flipping halfway.","Serve with plain rice and warmed corn."],tip:"A wire rack on the baking sheet means tenders get crispy underneath too."},
"Mild Beef Meatballs with Pasta & Butter":{serves:1,time:"30 min",ingredients:["5 oz lean ground beef","1 egg","1/4 cup breadcrumbs","Salt, mild seasoning","1 cup pasta","2 tbsp butter","Optional parmesan"],steps:["Mix beef, egg, breadcrumbs, salt. Form 6-8 meatballs. Bake at 400F 18-20 min.","Cook pasta per package. Toss with butter.","Serve meatballs over buttered pasta."],tip:"Baked meatballs need zero attention while baking — prep pasta during that time."},
"Ground Beef & Noodle Casserole":{serves:2,time:"35 min",ingredients:["6 oz lean ground beef","1.5 cups egg noodles","1 can cream of mushroom soup","1/2 cup beef broth","Salt, pepper, garlic powder","Optional shredded cheese"],steps:["Preheat oven 375F. Cook noodles halfway — they finish in the oven.","Brown beef, season well. Mix beef, noodles, soup, broth in baking dish.","Bake 20 min. Add cheese last 5 min if using."],tip:"Undercook noodles slightly before baking — they absorb the sauce and stay tender."},
"Mild Chicken Stir-Fry with Plain Noodles":{serves:1,time:"20 min",ingredients:["1 chicken breast, diced","1 cup plain noodles, cooked","1 tbsp butter","1 tbsp soy sauce","Salt, mild garlic powder"],steps:["Cook noodles per package. Toss with a little butter.","Season chicken mildly with salt and garlic powder. Cook in buttered pan 6-7 min.","Combine chicken with noodles. Add soy sauce and toss gently."],tip:"Keep the seasoning mild and consistent — predictable flavor is genuinely calming."},
"Baked Chicken Breast with Corn & Mashed Potatoes":{serves:1,time:"35 min",ingredients:["1 chicken breast","2 potatoes, peeled and cubed","1/2 cup corn","2 tbsp butter","1/4 cup warm milk","Salt, pepper, garlic powder"],steps:["Season chicken and bake at 425F 22-25 min.","Boil potatoes until tender. Mash with butter, warm milk, salt.","Warm corn with a little butter.","Serve chicken with mashed potatoes and corn."],tip:"Warm milk makes mash smoother — cold milk makes it stiff and gluey."},
"Grilled Salmon with Asparagus & Quinoa":{serves:1,time:"25 min",ingredients:["6 oz salmon fillet","1 bunch asparagus, trimmed","1 cup cooked quinoa","1 tbsp olive oil","Juice of 1 lemon","Salt, pepper, garlic powder"],steps:["Cook quinoa per package. Toss asparagus with oil, salt. Roast at 425F 12 min.","Season salmon with oil, garlic, salt, pepper. Pan-sear 4 min per side.","Serve over quinoa with asparagus. Squeeze lemon over everything."],tip:"Salmon is done when it flakes easily with a fork — don't wait for it to look fully opaque."},
"Baked Salmon with Mashed Sweet Potato & Green Beans":{serves:1,time:"30 min",ingredients:["6 oz salmon fillet","1 large sweet potato, peeled and cubed","2 cups green beans","1 tbsp butter","Salt, pepper, garlic powder","Lemon juice"],steps:["Boil sweet potato until tender 15 min. Mash with butter and salt.","Season salmon and bake at 400F 12-15 min.","Steam green beans 4-5 min.","Serve salmon with sweet potato mash and green beans. Squeeze lemon."],tip:"Don't overcook salmon — it goes from perfect to dry very quickly at the 15-minute mark."},
"Pan-Seared Salmon with Quinoa & Roasted Asparagus":{serves:1,time:"25 min",ingredients:["6 oz salmon","1 cup cooked quinoa","1 bunch asparagus","1 tbsp olive oil","Juice of 1 lemon","Salt, pepper, garlic"],steps:["Roast asparagus at 425F 12 min. Season salmon.","Heat oiled pan medium-high. Cook salmon skin-side up 4 min, flip 3 more min.","Serve over quinoa with asparagus. Squeeze lemon."],tip:"Starting skin-side up lets the flesh cook from the bottom and keeps it moist."},
"Baked Salmon with Sweet Potato & Green Beans":{serves:1,time:"30 min",ingredients:["6 oz salmon","1 sweet potato, cubed","2 cups green beans","1 tbsp olive oil","Salt, pepper, lemon slices"],steps:["Toss sweet potato with oil, salt. Roast at 400F 15 min.","Add green beans. Place salmon with lemon slices on top. Roast 12-15 min.","Serve everything together from the pan."],tip:"This whole meal can be made on one sheet pan — zero extra dishes."},
"Grilled Salmon with Brown Rice & Steamed Broccoli":{serves:1,time:"25 min",ingredients:["6 oz salmon","1 cup cooked brown rice","2 cups broccoli florets","1 tbsp olive oil","Soy sauce, lemon","Salt and pepper"],steps:["Cook brown rice per package. Steam broccoli 5 min until tender-crisp.","Season salmon. Pan-sear 4 min per side.","Serve salmon over rice with broccoli. Drizzle soy sauce and squeeze lemon."],tip:"Soy sauce on salmon and broccoli together is a classic Japanese combination that just works."},
"Lemon Butter Salmon with Rice & Snap Peas":{serves:1,time:"20 min",ingredients:["6 oz salmon","1 cup cooked rice","1 cup snap peas","2 tbsp butter","Juice of 1 lemon","1 garlic clove, minced","Salt and pepper"],steps:["Melt 1 tbsp butter in pan over medium-high. Season salmon and cook 4 min per side.","Remove salmon. In same pan, melt remaining butter, add garlic 30 sec.","Add snap peas 2 min. Add lemon juice.","Serve salmon and snap peas over rice with pan sauce."],tip:"The pan sauce made in the salmon butter is the best part — scrape every bit."},
"Apple Slices + Sliced Deli Turkey Roll-Ups":{serves:1,time:"5 min",ingredients:["1 apple, sliced","4-5 oz deli turkey, sliced","Optional mustard for dipping"],steps:["Slice apple into wedges.","Lay turkey slices flat and roll each one up tightly.","Serve apple slices alongside turkey roll-ups."],tip:"A little Dijon mustard for dipping takes this from basic to genuinely satisfying."},
"Banana + Chicken Jerky":{serves:1,time:"2 min",ingredients:["1 banana","1-2 oz chicken jerky"],steps:["Peel banana.","Eat banana and chicken jerky together."],tip:"The banana's sugar and jerky's protein together stabilize energy for hours."},
"Watermelon Chunks + Sunflower Seeds":{serves:1,time:"5 min",ingredients:["2 cups watermelon, cubed","2 tbsp sunflower seeds","Pinch of tajin or sea salt optional"],steps:["Cube watermelon into a bowl.","Top with sunflower seeds and a pinch of salt or tajin."],tip:"Salt or tajin on watermelon is a beloved Mexican tradition that enhances the sweetness."},
"Orange Slices + Hard-Boiled Egg":{serves:1,time:"2 min",ingredients:["1 large orange, peeled and segmented","1-2 hard-boiled eggs","Pinch of salt"],steps:["Peel and segment orange.","Peel hard-boiled egg.","Sprinkle egg with salt. Eat together."],tip:"Hard-boil a batch of 6 eggs on Sunday — grab and go all week."},
"Cherries + Beef Jerky":{serves:1,time:"2 min",ingredients:["1 cup fresh or frozen cherries","1-2 oz beef jerky"],steps:["Pit cherries if fresh.","Serve alongside beef jerky."],tip:"Frozen cherries thawed at room temp are sweeter than fresh out-of-season ones."},
"Mango Slices + Sliced Deli Turkey":{serves:1,time:"5 min",ingredients:["1 mango, sliced","4 oz deli turkey","Optional lime juice"],steps:["Slice mango alongside the pit.","Serve with turkey slices. Squeeze lime on mango if using."],tip:"Pre-sliced mango from the produce section saves significant prep time."},
"Mixed Berry Bowl + a Small Handful of Walnuts":{serves:1,time:"3 min",ingredients:["1/2 cup blueberries","1/2 cup raspberries","1/4 cup walnuts","Optional honey"],steps:["Combine berries in a small bowl.","Top with walnuts. Drizzle honey if using."],tip:"Walnuts are one of the best foods for brain health — ALA omega-3s and dopamine precursors."},
"Pineapple Chunks + Turkey Strips":{serves:1,time:"5 min",ingredients:["1 cup pineapple chunks","4 oz deli turkey strips"],steps:["Cut pineapple into chunks.","Roll up turkey or serve flat. Eat together."],tip:"Pineapple contains bromelain which aids digestion — a great snack for gut health."},
"Peach Slices + Beef Jerky":{serves:1,time:"5 min",ingredients:["1-2 ripe peaches, sliced","1-2 oz beef jerky"],steps:["Slice peaches.","Serve with beef jerky alongside."],tip:"The sweet-savory combination of peach and jerky is surprisingly craveable."},
"Grapes + Deli Turkey Slices":{serves:1,time:"3 min",ingredients:["1 cup grapes","4 oz deli turkey"],steps:["Wash grapes.","Serve with turkey slices."],tip:"Red grapes contain resveratrol, an antioxidant with neuroprotective properties."},
"Kiwi + Hard-Boiled Egg":{serves:1,time:"3 min",ingredients:["2 kiwis","1-2 hard-boiled eggs","Pinch of salt"],steps:["Peel kiwi and slice or eat with a spoon.","Peel egg and season with salt."],tip:"Kiwi has more vitamin C per gram than orange — pairs surprisingly well with egg."},
"Strawberries + Sliced Chicken Strips":{serves:1,time:"5 min",ingredients:["1 cup strawberries, hulled","4 oz cooked chicken strips or deli chicken","Optional balsamic glaze"],steps:["Hull and halve strawberries.","Serve with chicken strips.","Drizzle balsamic if using."],tip:"Leftover grilled chicken makes this a zero-effort snack if you batch-cook."},
"Frozen Berries (thawed) + Sunflower Seeds":{serves:1,time:"5 min",ingredients:["1 cup frozen mixed berries","2 tbsp sunflower seeds","Optional honey"],steps:["Microwave berries 45 seconds or thaw 30 min.","Place in bowl with sunflower seeds. Drizzle honey if using."],tip:"Thawed frozen berries release their juice and become sweeter — almost like a no-sugar compote."},
"Honeydew Melon + Deli Turkey Roll-Ups":{serves:1,time:"5 min",ingredients:["1 cup honeydew, cubed or sliced","4 oz deli turkey","Optional mint leaves"],steps:["Cube or slice honeydew.","Roll up turkey slices.","Serve with mint garnish if using."],tip:"Honeydew is 90% water — a great snack for hydration alongside the turkey's tyrosine."},
"Papaya Chunks + Beef Jerky":{serves:1,time:"5 min",ingredients:["1 cup ripe papaya, cubed","1-2 oz beef jerky","Squeeze of lime"],steps:["Cube papaya, remove seeds.","Squeeze lime over papaya.","Serve with jerky alongside."],tip:"Papaya contains papain, a natural digestive enzyme — especially helpful after a protein-heavy day."},
"Banana with Almond Butter":{serves:1,time:"2 min",ingredients:["1 banana","2 tbsp almond butter"],steps:["Peel banana.","Dip bites into almond butter or drizzle on top."],tip:"Freeze a banana overnight and slice into coins — tastes like ice cream with almond butter."},
"Celery & Hummus":{serves:1,time:"3 min",ingredients:["3-4 celery stalks","1/4 cup hummus"],steps:["Cut celery into sticks.","Serve with hummus for dipping."],tip:"Sprinkle smoked paprika on hummus before serving — it looks impressive and tastes better."},
"Handful of Cashews & Dried Cranberries":{serves:1,time:"1 min",ingredients:["1/4 cup cashews","2 tbsp dried cranberries"],steps:["Mix cashews and cranberries in a small bowl.","Eat as a grab-and-go snack."],tip:"Pre-portion into small bags on Sunday for the whole week — zero thinking required."},
"Greek Yogurt with Honey & Berries":{serves:1,time:"3 min",ingredients:["3/4 cup Greek yogurt","1 tbsp honey","1/2 cup mixed berries"],steps:["Spoon yogurt into bowl.","Top with berries. Drizzle honey."],tip:"Full-fat Greek yogurt has more satiety per calorie than low-fat — worth it."},
"Chamomile Tea & Whole Grain Crackers":{serves:1,time:"5 min",ingredients:["1 chamomile tea bag","1 cup hot water","6-8 whole grain crackers","Optional nut butter"],steps:["Steep chamomile tea 4 minutes.","Serve with whole grain crackers.","Add nut butter to crackers if desired."],tip:"Chamomile contains apigenin which binds to GABA receptors and creates genuine calm."},
"Kiwi Slices + a Handful of Almonds":{serves:1,time:"3 min",ingredients:["2 kiwis, sliced","1/4 cup almonds"],steps:["Peel and slice kiwi.","Serve with almonds alongside."],tip:"Kiwi before bed has been shown in studies to improve sleep quality — great evening snack."},
"Cucumber Slices & Hummus":{serves:1,time:"3 min",ingredients:["1 cucumber, sliced","1/4 cup hummus"],steps:["Slice cucumber into rounds.","Serve with hummus."],tip:"Add everything bagel seasoning on top of hummus — instant upgrade."},
"Rice Cakes with Avocado":{serves:1,time:"5 min",ingredients:["2 plain rice cakes","1/2 avocado","Salt, pepper, lemon juice"],steps:["Slice or mash avocado.","Spread on rice cakes.","Season with salt, pepper, and a squeeze of lemon."],tip:"Rice cakes are a great blank canvas — any topping that works on toast works here."},
"Coconut Yogurt with Berries":{serves:1,time:"3 min",ingredients:["3/4 cup coconut yogurt","1/2 cup mixed berries","1 tbsp honey"],steps:["Spoon coconut yogurt into bowl.","Top with berries. Drizzle honey."],tip:"Coconut yogurt is naturally dairy-free with a sweetness that complements tart berries."},
"Dark Chocolate & Strawberries":{serves:1,time:"5 min",ingredients:["1 oz dark chocolate 70% or higher","6-8 fresh strawberries","Optional pinch of sea salt"],steps:["Wash and dry strawberries.","Break dark chocolate into pieces.","Serve together. Option: melt chocolate and dip berries.","Finish with a tiny pinch of flaky sea salt."],tip:"70%+ cacao is where the mental health benefits kick in — lower percentages have too much sugar."},
"Peanut Butter on Whole Grain Crackers":{serves:1,time:"3 min",ingredients:["6-8 whole grain crackers","2 tbsp peanut butter","Optional banana slices"],steps:["Spread peanut butter on crackers.","Add banana slices on top if using."],tip:"Natural peanut butter — just peanuts and salt — has no added sugar or oils."},
"Mango & Mixed Berries":{serves:1,time:"5 min",ingredients:["1 mango, diced","1/2 cup mixed berries","Optional lime juice and mint"],steps:["Dice mango. Combine with mixed berries.","Squeeze lime and add mint if using."],tip:"This 5-minute snack delivers more vitamins than most multivitamins."},
"Banana with Walnut Butter":{serves:1,time:"2 min",ingredients:["1 banana","2 tbsp walnut butter or chopped walnuts"],steps:["Slice banana.","Drizzle walnut butter or roll slices in crushed walnuts."],tip:"Walnut butter has more omega-3s than any other nut butter — brain food at its simplest."},
"Trail Mix with Dark Chocolate Chips":{serves:1,time:"1 min",ingredients:["1/4 cup mixed nuts","2 tbsp dark chocolate chips","2 tbsp dried fruit"],steps:["Combine all in a small bowl or bag.","Eat as a snack."],tip:"Pre-portion into bags for the week — trail mix is easy to overeat from the bulk bag."},
"Apple Slices & Almond Butter":{serves:1,time:"3 min",ingredients:["1 apple, sliced","2 tbsp almond butter"],steps:["Slice apple.","Dip into almond butter."],tip:"A pinch of cinnamon on apple and almond butter takes this from basic to genuinely delicious."},
"Apple & Peanut Butter":{serves:1,time:"3 min",ingredients:["1 apple, sliced","2 tbsp peanut butter"],steps:["Slice apple into wedges.","Dip into peanut butter."],tip:"Apple fiber combined with peanut butter fat slows digestion for steady energy."},
"Hummus with Carrot & Cucumber Sticks":{serves:1,time:"5 min",ingredients:["1/4 cup hummus","2 carrots, cut into sticks","1/2 cucumber, cut into sticks"],steps:["Cut veggies into sticks.","Serve with hummus for dipping."],tip:"Make a big batch of cut veggies on Sunday — snack prep done for 4-5 days."},
"Banana with a Handful of Walnuts":{serves:1,time:"2 min",ingredients:["1 banana","1/4 cup walnuts"],steps:["Peel banana.","Eat with walnuts alongside."],tip:"The fat from walnuts slows glucose absorption — steadier energy than banana alone."},
"Greek Yogurt with Mixed Berries":{serves:1,time:"3 min",ingredients:["3/4 cup Greek yogurt","1/2 cup mixed berries","Optional honey or granola"],steps:["Spoon yogurt into bowl.","Top with berries and honey or granola."],tip:"This takes 3 minutes and has more protein than most protein bars."},
"Apple Slices & Cheese":{serves:1,time:"3 min",ingredients:["1 apple, sliced","1-2 oz cheese of choice"],steps:["Slice apple.","Cut or break cheese into pieces.","Eat together."],tip:"Sharp cheddar with a crisp apple is one of the great simple food combinations."},
"Edamame with Sea Salt":{serves:1,time:"5 min",ingredients:["1 cup frozen edamame in pods","Sea salt"],steps:["Microwave edamame 3 minutes or boil 4 minutes.","Drain and sprinkle generously with sea salt.","Pop beans from pods to eat."],tip:"Edamame is one of the most complete plant proteins — all essential amino acids in a snack."},
"Baby Carrots & Guacamole":{serves:1,time:"5 min",ingredients:["1 cup baby carrots","1/4 cup guacamole"],steps:["Arrange carrots on a plate.","Serve with guacamole for dipping."],tip:"Store-bought guacamole is fine — look for one with just avocado, lime, and salt."},
"Walnuts & Apple Slices":{serves:1,time:"3 min",ingredients:["1/4 cup walnuts","1 apple, sliced"],steps:["Slice apple.","Serve with walnuts."],tip:"Walnuts literally look like a brain and feed one — high in omega-3 ALA and polyphenols."},
"Yogurt with Honey & Granola":{serves:1,time:"3 min",ingredients:["3/4 cup yogurt","1 tbsp honey","1/4 cup granola"],steps:["Spoon yogurt into bowl.","Drizzle honey.","Top with granola."],tip:"Add granola right before eating so it stays crunchy."},
"Whole Grain Crackers with Cheese":{serves:1,time:"3 min",ingredients:["8-10 whole grain crackers","1-2 oz cheese"],steps:["Arrange crackers on a plate.","Slice or break cheese.","Top crackers with cheese."],tip:"Whole grain crackers with at least 3g of fiber per serving are the ones worth buying."},
"Banana & Peanut Butter":{serves:1,time:"2 min",ingredients:["1 banana","2 tbsp peanut butter"],steps:["Slice or break banana into pieces.","Dip into peanut butter or spread on top."],tip:"One of the most reliable mood-supporting snacks — tryptophan from banana, tyrosine from peanut butter."},
"Mixed Nuts & Dried Fruit":{serves:1,time:"1 min",ingredients:["1/4 cup mixed nuts","2 tbsp dried fruit: mango, cranberry, or raisin"],steps:["Combine in a bowl.","Eat as a snack."],tip:"Portion into 1/4 cup servings — nuts are easy to overeat straight from the bag."},
"Orange Slices & Almonds":{serves:1,time:"3 min",ingredients:["1 large orange, segmented","1/4 cup almonds"],steps:["Peel and segment orange.","Serve with almonds."],tip:"Vitamin C from orange doubles absorption of iron and minerals from the almonds."},
"Chamomile Tea & Honey with Whole Grain Toast":{serves:1,time:"8 min",ingredients:["1 chamomile tea bag","1 cup hot water","2 slices whole grain toast","1 tbsp honey"],steps:["Steep chamomile 4 minutes.","Toast bread. Drizzle honey on toast.","Sip tea alongside."],tip:"Chamomile before bed has clinical evidence behind it — it really does help with sleep."},
"Mixed Berries with a Dollop of Yogurt":{serves:1,time:"3 min",ingredients:["1 cup mixed berries","1/4 cup Greek yogurt","Optional honey"],steps:["Place berries in bowl.","Add a spoonful of yogurt on top.","Drizzle honey."],tip:"Frozen berries thawed overnight work just as well as fresh — just as nutritious."},
"Handful of Almonds":{serves:1,time:"1 min",ingredients:["1/4 cup raw or roasted almonds"],steps:["Portion 1/4 cup almonds.","Eat slowly."],tip:"Almonds are one of the highest magnesium foods per serving — critical for anxiety and sleep."},
"Banana & a Few Walnuts":{serves:1,time:"2 min",ingredients:["1 banana","6-8 walnut halves"],steps:["Peel banana.","Eat with walnuts."],tip:"The fat from walnuts slows banana sugar absorption — steadier energy than banana alone."},
"Trail Mix with Dried Mango":{serves:1,time:"1 min",ingredients:["1/4 cup mixed nuts","2 tbsp dried mango chunks","1 tbsp pumpkin seeds"],steps:["Combine all in a bowl.","Eat as a snack."],tip:"Dried mango is a concentrated source of vitamins A and C — a little goes a long way."},
"Peanut Butter & Jelly on Whole Grain Bread":{serves:1,time:"3 min",ingredients:["2 slices whole grain bread","2 tbsp peanut butter","1 tbsp jam or jelly"],steps:["Spread peanut butter on one slice.","Spread jam on the other.","Press together."],tip:"Use a low-sugar jam or fruit spread — more fruit, less glucose than standard jelly."},
"Cheese & Crackers":{serves:1,time:"3 min",ingredients:["1-2 oz cheese","8-10 whole grain crackers"],steps:["Slice or break cheese.","Serve with crackers."],tip:"Pair strong cheese like cheddar with plain crackers — the flavors balance perfectly."},
"Banana & a Glass of Milk":{serves:1,time:"2 min",ingredients:["1 banana","1 cup milk of any kind"],steps:["Peel banana.","Pour milk.","Eat and drink together."],tip:"Banana plus milk is one of the oldest and most effective pre-sleep snacks — tryptophan and calcium."},
"Apple Slices & Peanut Butter":{serves:1,time:"3 min",ingredients:["1 apple, sliced","2 tbsp peanut butter"],steps:["Slice apple.","Dip into peanut butter."],tip:"Granny Smith apples have the lowest sugar of any common variety — great for blood sugar."},
"Greek Yogurt with Honey":{serves:1,time:"2 min",ingredients:["3/4 cup Greek yogurt","1-2 tbsp honey"],steps:["Spoon yogurt into bowl.","Drizzle honey."],tip:"Raw honey has trace antioxidants and a slightly lower glycemic effect than refined sugar."},
"Celery & Peanut Butter":{serves:1,time:"3 min",ingredients:["3-4 celery stalks","2 tbsp peanut butter"],steps:["Cut celery into sticks.","Fill groove with peanut butter or use for dipping."],tip:"Classic ants on a log: fill celery with peanut butter and top with raisins."},
"Sliced Banana":{serves:1,time:"2 min",ingredients:["1 banana"],steps:["Peel and slice banana into rounds.","Serve in a bowl."],tip:"Banana slices are easier to eat than a whole banana — great for sensitive textures."},
"Plain Crackers with Peanut Butter":{serves:1,time:"3 min",ingredients:["8-10 plain crackers","2 tbsp smooth peanut butter"],steps:["Arrange crackers on a plate.","Spread smooth peanut butter on each cracker."],tip:"Use the smoothest peanut butter available — texture matters for sensory-sensitive eating."},
"Cheese Cubes & Apple Slices":{serves:1,time:"3 min",ingredients:["1-2 oz mild cheese, cubed","1 apple, sliced"],steps:["Cube cheese.","Slice apple.","Serve together."],tip:"Mild cheddar or colby jack are the most accessible flavors — low sharpness, good protein."},
"Sliced Strawberries":{serves:1,time:"3 min",ingredients:["1 cup fresh strawberries","Optional drizzle of honey"],steps:["Hull and slice strawberries.","Arrange in a bowl.","Drizzle honey if desired."],tip:"Slicing strawberries makes them easier to eat — whole berries can have an off-putting texture."},
"Vanilla Yogurt & Granola":{serves:1,time:"3 min",ingredients:["3/4 cup vanilla yogurt","1/4 cup granola"],steps:["Spoon vanilla yogurt into bowl.","Top with granola."],tip:"Add granola right before eating so it stays crunchy."},
"Peeled Orange Slices":{serves:1,time:"3 min",ingredients:["1 large orange"],steps:["Peel orange carefully.","Separate into segments.","Arrange on a plate."],tip:"Pre-peeled orange segments in a sealed container last 2 days in the fridge — prep ahead."}
};

const getRecipe = (meal) => {
  const allRecipes = { ...RECIPES, ...RECIPES_EXTENDED };
  if (allRecipes[meal]) return allRecipes[meal];
  // Smart fallback based on meal name
  const m = meal.toLowerCase();
  if (m.includes('oat') || m.includes('oatmeal') || m.includes('porridge')) return { serves:1, time:"8 min", ingredients:["1/2 cup rolled oats","1 cup milk or water","Toppings as in meal name","1 tbsp honey or maple syrup","Pinch of salt"], steps:["Bring liquid to a boil, add oats and salt.","Stir over medium heat 4-5 min until creamy.","Pour into bowl and add your toppings.","Drizzle honey or maple syrup."], tip:"Cook oats low and slow for the creamiest results." };
  if (m.includes('salmon')) return { serves:1, time:"20 min", ingredients:["6 oz salmon fillet","Sides as in meal name","1 tbsp olive oil","Salt, pepper, lemon"], steps:["Season salmon with olive oil, salt, and pepper.","Pan-sear over medium-high heat 4 min per side, or bake at 400F 12-15 min.","Prepare your sides while salmon cooks.","Squeeze lemon over everything before serving."], tip:"Salmon is done when it flakes easily with a fork — pull it slightly early." };
  if (m.includes('steak') || m.includes('sirloin') || m.includes('ribeye') || m.includes('beef')) return { serves:1, time:"25 min", ingredients:["5-8 oz beef","Sides as in meal name","1 tbsp olive oil","Salt, pepper, garlic powder"], steps:["Season beef with salt, pepper, and garlic powder.","Sear or cook in a hot pan with olive oil to your preferred doneness.","Prepare sides while beef rests.","Rest beef 5 min before serving."], tip:"Always rest beef before cutting — it keeps the juices in." };
  if (m.includes('chicken') || m.includes('turkey')) return { serves:1, time:"25 min", ingredients:["5-8 oz chicken or turkey","Sides as in meal name","1 tbsp olive oil","Salt, pepper, garlic powder"], steps:["Season with olive oil, salt, pepper, garlic powder.","Cook in a pan 6-7 min per side, or bake at 425F 22-25 min until 165F.","Prepare sides while protein cooks.","Rest 5 min before serving."], tip:"A meat thermometer guarantees juicy chicken every time — 165F is the target." };
  if (m.includes('wrap')) return { serves:1, time:"10 min", ingredients:["1 large whole wheat tortilla","Fillings as in meal name","Salt, pepper"], steps:["Warm tortilla in a dry pan 30 sec per side.","Layer fillings in the center.","Fold in sides and roll tightly from the bottom.","Cut diagonally and serve."], tip:"Warm the tortilla first — cold tortillas crack when rolled." };
  if (m.includes('salad')) return { serves:1, time:"15 min", ingredients:["3 cups greens","Toppings as in meal name","2 tbsp olive oil","1 tbsp lemon juice or vinegar","Salt and pepper"], steps:["Prepare protein if needed and let rest.","Build salad base with greens and toppings.","Whisk olive oil and lemon for dressing.","Top with protein. Dress and toss."], tip:"Dress salad right before eating — it wilts quickly once dressed." };
  if (m.includes('soup')) return { serves:2, time:"30 min", ingredients:["Protein and veggies as in meal name","3 cups broth","1 garlic clove","Salt, pepper, herbs"], steps:["Brown protein in a pot if using meat.","Add garlic and vegetables, cook 3-4 min.","Add broth and herbs. Simmer 20 min.","Season and serve."], tip:"Soup always tastes better the next day — make double." };
  return { serves:1, time:"20 min", ingredients:["Main ingredients as in the meal name","1 tbsp olive oil","Salt, pepper, garlic","Sides as described"], steps:["Prepare protein: season and cook through — 165F for poultry, 145F for fish, medium for beef.","Prepare sides simultaneously.","Plate and finish with a squeeze of lemon."], tip:"Prep your sides while the protein cooks to get everything to the table at the same time." };
};

const AFFIRMATIONS = [
  { text: "Your brain is not broken. It is beautifully different.", author: "NeuroThrive" },
  { text: "You are allowed to take up space — in every room, on every plate.", author: "NeuroThrive" },
  { text: "Healing is not linear. Neither is eating well. Both take time.", author: "NeuroThrive" },
  { text: "You showed up today. That alone is worth celebrating.", author: "NeuroThrive" },
  { text: "The body you're in deserves nourishment — exactly as it is, right now.", author: "NeuroThrive" },
  { text: "Small steps are still steps. One meal, one moment, one breath at a time.", author: "NeuroThrive" },
  { text: "You are more than your diagnosis. You are whole, worthy, and valid.", author: "NeuroThrive" },
  { text: "Rest is productive. Eating is productive. Existing is productive.", author: "NeuroThrive" },
  { text: "Even on the hard days, you are doing something remarkable by still trying.", author: "NeuroThrive" },
  { text: "Nourishing yourself is an act of radical self-love.", author: "NeuroThrive" },
  { text: "You deserve gentleness — especially from yourself.", author: "NeuroThrive" },
  { text: "Your feelings are valid. Your hunger is valid. You are valid.", author: "NeuroThrive" },
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

const MEAL_EXPLANATIONS = {
  "Grilled Chicken Sausage with Sliced Mango & Strawberries": "Your ADHD brain runs on dopamine — and this breakfast is built to produce it. Chicken sausage loads your bloodstream with tyrosine, the amino acid dopamine is made from. But here's the key: your brain needs carbohydrates to actually move tyrosine across the blood–brain barrier. That's exactly what mango and strawberries do. Mango provides natural glucose that triggers a small insulin response, clearing competing amino acids so tyrosine can reach your brain. Strawberries add vitamin C, which protects dopamine-producing neurons from oxidative stress.\n\n• Chicken delivers tyrosine — the direct building block of dopamine\n• Mango's glucose opens the blood–brain barrier for tyrosine transport\n• Strawberry antioxidants protect your dopamine-producing neurons\n\nProtein + fruit is the ADHD dietary formula. This breakfast lives it.",
  "Baked Chicken Breast with Roasted Veggies": "Simple, clean, and deeply calming — this dinner is built for a nervous system that's been working overtime all day. Chicken provides tryptophan, which your brain converts to serotonin and eventually melatonin, supporting both mood stability and sleep. The roasted vegetables — especially broccoli, carrots, and peppers — deliver magnesium, the mineral that regulates your stress response system and supports GABA receptors. GABA is your brain's primary calming neurotransmitter.\n\n• Tryptophan from chicken supports evening serotonin and melatonin production\n• Magnesium from vegetables activates the GABA system that creates calm\n• A simple, familiar meal that doesn't add cognitive load to a tired system\n\nCalm food for a nervous system that deserves a rest.",
  "Grilled Salmon with Asparagus & Quinoa": "This dinner is a nutritional trifecta for mental health — every component directly targets the biology behind anxiety and depression. Salmon's omega-3s (EPA and DHA) reduce neuroinflammation and improve serotonin receptor sensitivity. Multiple clinical trials show omega-3 supplementation measurably reduces anxiety symptoms. Asparagus is a folate powerhouse and prebiotic — feeding the gut bacteria that produce 90% of your body's serotonin. Quinoa adds complete protein, magnesium, and B vitamins.\n\n• Omega-3s from salmon shown in clinical trials to reduce anxiety\n• Asparagus prebiotics feed gut bacteria responsible for 90% of serotonin\n• Magnesium from quinoa supports the GABA calming system\n\nA dinner that's genuinely working to quiet your nervous system.",
  "Dark Chocolate & Strawberries": "This might be the most enjoyable snack on the plan — and it's legitimately effective for a brain navigating depression. Dark chocolate (70%+ cacao) contains theobromine and phenylethylamine, which trigger the release of dopamine and serotonin. Cacao flavanols improve blood flow to the brain and reduce cortisol. Multiple studies link regular dark chocolate consumption to lower rates of depression. Strawberries add folate for neurotransmitter production and vitamin C to protect serotonin neurons.\n\n• Theobromine and PEA from dark chocolate naturally boost dopamine and serotonin\n• Cacao flavanols improve prefrontal cortex blood flow and lower cortisol\n• Folate and vitamin C from strawberries support the serotonin production pathway\n\nA snack that feels like a treat and functions like medicine.",
  "Oatmeal with Flaxseed, Berries & Honey": "Mood stability is the central challenge of bipolar disorder — and this breakfast is designed to support it from the moment you wake up. Oatmeal provides slow complex carbohydrates that prevent blood sugar spikes and crashes, which are among the fastest triggers for mood destabilization. Flaxseed is one of the richest plant sources of omega-3 ALA, which converts to EPA and DHA — the brain fats linked to reduced mood episode severity in bipolar research. Berries deliver antioxidants that protect neurons from oxidative stress.\n\n• Slow carbs from oatmeal prevent blood sugar swings that destabilize mood\n• Omega-3 ALA from flaxseed linked to reduced mood episode severity in research\n• Antioxidants from berries protect neurons from elevated oxidative stress\n\nA steady morning is the best foundation for a stable day.",
  "Warm Oatmeal with Banana & Honey": "Warm food has a grounding quality for a nervous system living in threat-detection mode — and this breakfast backs that up nutritionally. Complex carbs from oatmeal steadily raise serotonin, the neurotransmitter that creates calm and safety. Banana brings B6, which is essential for converting tryptophan into serotonin — without B6, the conversion stalls. Potassium in banana also regulates the physical stress response: racing heart, muscle tension, that constant edge. Honey provides gentle glucose without the cortisol spike that refined sugar causes.\n\n• Oatmeal builds serotonin steadily to counter a hyperactivated amygdala\n• B6 from banana completes the tryptophan-to-serotonin conversion\n• Warm food activates the parasympathetic system — signaling safety\n\nA simple breakfast that tells your nervous system: you are safe right now.",
  "Egg & Cheese Breakfast Burrito": "Grounding is one of the most important things for a system navigating DID — and this breakfast is designed to be grounding in every sense. Eggs provide choline for the acetylcholine attention system, B12 for neural efficiency, and complete protein to stabilize blood sugar for hours. Blood sugar stability is critical here: energy crashes increase dissociation risk and can be triggering. Cheese adds calcium and fat that slow digestion and sustain satiety. Feeling physically present and nourished is an anchor.\n\n• Protein and fat stabilize blood sugar to reduce stress-related triggers\n• Choline and B12 support neural connection and present-moment function\n• A familiar, grounding format that nourishes every part of the system\n\nEvery part of you deserves nourishment. This breakfast is for all of you.",
  "Oven-Roasted Chicken with Vegetables & Quinoa": "OCD involves disrupted serotonin and glutamate signaling — this dinner supports both systems. Chicken provides tryptophan, which converts to serotonin — the same system OCD medications (SSRIs) target. Supporting it through diet creates a stronger nutritional foundation for treatment to work from. Quinoa adds zinc, which modulates the NMDA glutamate receptors that are overactive in OCD, and magnesium, a natural NMDA calmer. Vegetables provide folate and B6, essential cofactors for the serotonin production pathway.\n\n• Tryptophan from chicken supports the serotonin system disrupted by OCD\n• Zinc from quinoa moderates the overactive glutamate receptors in OCD\n• Folate and B6 from vegetables optimize the serotonin production process\n\nFood that works alongside your treatment, not against it.",
  "Plain Scrambled Eggs with Toast": "Simple, predictable, and familiar — this breakfast respects sensory needs while delivering genuine nutritional support. Eggs are among the most nutritionally complete foods for autistic brains: rich in choline for the acetylcholine learning system, complete protein for neurotransmitter production, and B12 — a vitamin autistic individuals are more likely to be deficient in. B12 supports the myelin sheath that determines how quickly nerve signals travel. A familiar texture removes sensory stress at mealtimes, which is itself healing.\n\n• Choline and B12 from eggs support neural signaling efficiency\n• Complete protein provides building blocks for multiple neurotransmitter systems\n• A sensory-safe meal allows proper digestion and absorption — stress impairs both\n\nEating without stress is as important as eating well.",
  "Baked Chicken Breast with Roasted Veggies & Brown Rice": "Schizophrenia affects dopamine and glutamate signaling — this dinner provides nutritional support for both while keeping blood sugar stable, which is especially important when taking antipsychotic medications. Chicken provides tyrosine for dopamine and tryptophan for serotonin. Roasted vegetables deliver antioxidants that combat the significantly elevated oxidative stress found in schizophrenia research. Brown rice provides magnesium and B vitamins that support healthy dopamine receptor function.\n\n• Amino acids from chicken support dopamine and serotonin balance\n• Antioxidants from vegetables combat elevated oxidative stress of schizophrenia\n• Magnesium from brown rice supports healthy dopamine receptor sensitivity\n\nConsistent, clean nourishment is one of the most powerful things you can do for your brain.",
  "Grilled Steak with Roasted Sweet Potato & Broccoli": "BPD involves intense emotional swings and a nervous system that responds more strongly to everything — this dinner builds the nutritional foundation for biochemical stability. Steak provides heme iron and zinc, which modulate amygdala reactivity and support the prefrontal cortex's ability to regulate it. Sweet potato delivers complex carbs to prevent blood sugar swings (a major mood dysregulation trigger), B6 for serotonin, and magnesium for GABA. Broccoli's sulforaphane reduces neuroinflammation in the limbic system — the emotional brain.\n\n• Zinc from steak supports amygdala regulation and reduces emotional reactivity\n• Complex carbs from sweet potato prevent the blood sugar swings that worsen dysregulation\n• Sulforaphane from broccoli reduces inflammation in emotional processing centers\n\nYour emotions deserve a stable biochemical environment to work from.",
};

const getExplanation = (meal, conditionLabel) => {
  if (MEAL_EXPLANATIONS[meal]) return MEAL_EXPLANATIONS[meal];
  return `This meal was chosen specifically to support your brain and body as someone navigating ${conditionLabel || "your condition"}.\n\nEvery component — the protein, the vegetables, the complex carbohydrates — works together to stabilize blood sugar, support neurotransmitter production, and deliver the vitamins and minerals your brain's most sensitive systems depend on.\n\nProtein delivers amino acids your brain converts to dopamine, serotonin, and other key neurotransmitters. Complex carbohydrates create the steady glucose supply that prevents the energy crashes that worsen mood and cognition. Vegetables and fruits provide the antioxidants, folate, and minerals that protect your neurons and keep your nervous system regulated.\n\n• Stabilizes blood sugar to prevent mood and energy crashes\n• Provides amino acids for neurotransmitter production specific to your condition\n• Delivers anti-inflammatory nutrients to protect your brain's most sensitive areas\n\nEvery meal on this plan was chosen with your specific needs in mind. You're doing something genuinely kind for yourself by eating it.`;
};

const WEEKS = ["Week 1", "Week 2", "Week 3", "Week 4"];
const DAY_NAMES = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];


const SUPPLEMENTS = {
  adhd: [
    { name:"Omega-3 (EPA/DHA)", dose:"1–2g EPA+DHA daily", emoji:"🐟", science:"Multiple RCTs show omega-3 supplementation reduces ADHD symptom severity by 20–30% in children and adults. EPA appears most active for attention and mood regulation.", timing:"With a meal containing fat for best absorption.", caution:"Choose a third-party tested brand. High doses (>3g) may thin blood.", link:"https://pubmed.ncbi.nlm.nih.gov/28741143/" },
    { name:"Magnesium Glycinate", dose:"200–400mg elemental Mg daily", emoji:"🌿", science:"ADHD brains tend to have lower magnesium levels. Magnesium plays a key role in dopamine synthesis and nervous system regulation. Glycinate form is best tolerated.", timing:"Evening — also supports sleep quality.", caution:"Start low (100mg) and increase gradually. Can cause loose stools at high doses.", link:"https://pubmed.ncbi.nlm.nih.gov/9368236/" },
    { name:"Zinc", dose:"15–30mg daily", emoji:"⚡", science:"Zinc is a cofactor in dopamine and norepinephrine production. Studies show ADHD individuals often have lower serum zinc, and supplementation can modestly improve attention.", timing:"With food to avoid nausea.", caution:"Don't exceed 40mg long-term. Take away from iron supplements.", link:"https://pubmed.ncbi.nlm.nih.gov/15625652/" },
    { name:"L-Theanine", dose:"100–200mg daily", emoji:"🍵", science:"Found naturally in green tea. Promotes calm alertness by increasing alpha brain waves. Often paired with caffeine to smooth its stimulant effect without reducing focus.", timing:"Morning or early afternoon.", caution:"Generally very well tolerated. Avoid late afternoon if sensitive to sleep disruption.", link:"https://pubmed.ncbi.nlm.nih.gov/18681988/" },
    { name:"Vitamin D3 + K2", dose:"2000–4000 IU D3 with 100mcg K2", emoji:"☀️", science:"Vitamin D receptors are found in dopaminergic brain regions. Deficiency is extremely common and associated with worsened ADHD symptoms, mood, and executive function.", timing:"Morning with a fatty meal.", caution:"Get your levels tested before supplementing. K2 is needed to direct calcium correctly.", link:"https://pubmed.ncbi.nlm.nih.gov/22254078/" },
  ],
  anxiety: [
    { name:"Ashwagandha (KSM-66)", dose:"300–600mg daily", emoji:"🌱", science:"KSM-66 ashwagandha is the most studied form. Multiple double-blind RCTs show significant reduction in cortisol and perceived stress scores vs placebo within 8 weeks.", timing:"Morning or evening with food.", caution:"Avoid if pregnant, thyroid conditions, or autoimmune disease. Check for drug interactions.", link:"https://pubmed.ncbi.nlm.nih.gov/23439798/" },
    { name:"Magnesium Glycinate", dose:"200–400mg elemental Mg daily", emoji:"🌿", science:"Magnesium acts on NMDA receptors and modulates the HPA stress axis. Clinical trials show significant anxiety reduction, particularly for people with low dietary magnesium.", timing:"Evening for best effect on sleep and anxiety.", caution:"Start at 100mg. Too much can cause digestive upset.", link:"https://pubmed.ncbi.nlm.nih.gov/28445426/" },
    { name:"L-Theanine", dose:"200mg daily", emoji:"🍵", science:"Increases GABA, serotonin, and dopamine. Studies show measurable anxiolytic effects within 45 minutes of a single dose, without sedation.", timing:"As needed or daily morning dose.", caution:"Very safe. May enhance sedative medications — check with your doctor.", link:"https://pubmed.ncbi.nlm.nih.gov/19414525/" },
    { name:"Omega-3 (EPA/DHA)", dose:"2g EPA+DHA daily", emoji:"🐟", science:"A 2011 meta-analysis found high-dose omega-3 reduced anxiety symptoms by 20% versus placebo. EPA appears particularly active for mood and anxiety.", timing:"With a meal containing fat.", caution:"Choose molecularly distilled brands to minimise heavy metals.", link:"https://pubmed.ncbi.nlm.nih.gov/21784145/" },
    { name:"B-Complex (B6, B12, Folate)", dose:"One quality B-complex daily", emoji:"🔋", science:"B vitamins are cofactors in neurotransmitter synthesis — serotonin, GABA, dopamine all depend on them. Deficiency in B6, B12, or folate is strongly linked to anxiety and low mood.", timing:"Morning with breakfast.", caution:"Look for methylated forms (methylfolate, methylcobalamin) for better absorption.", link:"https://pubmed.ncbi.nlm.nih.gov/23370773/" },
  ],
  depression: [
    { name:"Omega-3 (EPA focus)", dose:"1–2g EPA daily", emoji:"🐟", science:"The most replicated supplement finding in depression research. EPA (not DHA) appears to be the active component. Multiple meta-analyses show effects comparable to antidepressants in mild-moderate depression.", timing:"With a fatty meal.", caution:"May interact with blood thinners. Always inform your psychiatrist if taking alongside antidepressants.", link:"https://pubmed.ncbi.nlm.nih.gov/26978738/" },
    { name:"Vitamin D3 + K2", dose:"2000–5000 IU D3 daily", emoji:"☀️", science:"Vitamin D acts as a neurosteroid and regulates serotonin synthesis. Large studies link deficiency to depression. Supplementation in deficient individuals shows significant mood improvement.", timing:"Morning with a fatty meal.", caution:"Test your levels first. Toxicity is possible at very high doses taken long-term.", link:"https://pubmed.ncbi.nlm.nih.gov/25713056/" },
    { name:"Saffron Extract", dose:"30mg daily (15mg twice daily)", emoji:"🌸", science:"Multiple RCTs show saffron extract (affron®) matches fluoxetine (Prozac) for mild-moderate depression with fewer side effects. Active compounds are safranal and crocin.", timing:"With meals.", caution:"Expensive but well-studied. Avoid in pregnancy. Rare side effects: dry mouth, dizziness.", link:"https://pubmed.ncbi.nlm.nih.gov/25384672/" },
    { name:"Magnesium Glycinate", dose:"300–400mg daily", emoji:"🌿", science:"A 2017 clinical trial found magnesium supplementation as effective as antidepressants for mild-moderate depression within 6 weeks.", timing:"Evening.", caution:"Works best as part of a broader protocol. Not a replacement for prescribed medication.", link:"https://pubmed.ncbi.nlm.nih.gov/28654669/" },
    { name:"Rhodiola Rosea", dose:"400–600mg daily (3% rosavins)", emoji:"🌄", science:"Adaptogen shown in RCTs to reduce burnout, fatigue, and depressive symptoms. Particularly effective for stress-related depression and low motivation.", timing:"Morning, away from food.", caution:"May be mildly stimulating — avoid afternoon doses. Avoid if bipolar without doctor guidance.", link:"https://pubmed.ncbi.nlm.nih.gov/18307390/" },
  ],
  ptsd: [
    { name:"Omega-3 (EPA/DHA)", dose:"2g EPA+DHA daily", emoji:"🐟", science:"Research in first responders and trauma survivors shows omega-3 may reduce PTSD symptom development after acute trauma and lower hyperarousal and intrusion symptoms.", timing:"With a meal containing fat.", caution:"Choose purified brands. Inform any prescribing doctor.", link:"https://pubmed.ncbi.nlm.nih.gov/20075049/" },
    { name:"Magnesium Glycinate", dose:"300–400mg daily", emoji:"🌿", science:"Magnesium regulates the fear response via NMDA receptors. Low magnesium is associated with heightened stress reactivity and worse PTSD outcomes.", timing:"Evening — supports sleep and nervous system recovery.", caution:"Start low and build up over 2 weeks.", link:"https://pubmed.ncbi.nlm.nih.gov/28328919/" },
    { name:"Ashwagandha (KSM-66)", dose:"300–600mg daily", emoji:"🌱", science:"Reduces cortisol and supports HPA axis regulation — the stress system most dysregulated in PTSD. RCTs show meaningful improvements in stress, anxiety, and sleep.", timing:"Morning or evening with food.", caution:"Check for interactions with sedative medications.", link:"https://pubmed.ncbi.nlm.nih.gov/23439798/" },
    { name:"L-Theanine", dose:"200mg daily", emoji:"🍵", science:"Promotes alpha brain wave activity associated with calm alertness. Particularly useful for hypervigilance and difficulty relaxing without sedation.", timing:"Can be taken as needed during stressful moments.", caution:"Very well tolerated. Pairs well with magnesium for evening relaxation.", link:"https://pubmed.ncbi.nlm.nih.gov/19414525/" },
  ],
  bipolar: [
    { name:"Omega-3 (EPA/DHA)", dose:"2–4g EPA+DHA daily", emoji:"🐟", science:"The most studied supplement in bipolar disorder. Multiple trials show omega-3 reduces depressive episodes and may have mild mood-stabilising effects. Less evidence for manic episodes.", timing:"With meals containing fat.", caution:"Discuss with your psychiatrist — may interact with mood stabilisers at high doses.", link:"https://pubmed.ncbi.nlm.nih.gov/15979846/" },
    { name:"Magnesium Glycinate", dose:"200–400mg daily", emoji:"🌿", science:"Magnesium has lithium-like properties at the cellular level. Some research suggests it may reduce cycling frequency. Very commonly deficient in people on mood stabilisers.", timing:"Evening.", caution:"Inform your psychiatrist. Some mood stabilisers affect magnesium levels.", link:"https://pubmed.ncbi.nlm.nih.gov/19271419/" },
    { name:"Vitamin D3 + K2", dose:"2000–4000 IU daily", emoji:"☀️", science:"Deficiency strongly associated with more frequent mood episodes and worse outcomes in bipolar disorder. Safe and inexpensive to address.", timing:"Morning with food.", caution:"Test your levels. Safe at standard doses but get checked annually.", link:"https://pubmed.ncbi.nlm.nih.gov/22254078/" },
    { name:"N-Acetyl Cysteine (NAC)", dose:"1000–2400mg daily (split doses)", emoji:"🛡️", science:"A glutathione precursor. A landmark RCT showed NAC significantly reduced bipolar depression scores versus placebo over 6 months, with good tolerability.", timing:"With meals.", caution:"Takes 8–12 weeks to see full effect. Inform your doctor. Avoid if on nitroglycerin.", link:"https://pubmed.ncbi.nlm.nih.gov/18439486/" },
  ],
  ocd: [
    { name:"NAC (N-Acetyl Cysteine)", dose:"600–3000mg daily (split doses)", emoji:"🛡️", science:"The most evidence-backed supplement for OCD. Multiple RCTs as an augmentation to SSRIs show significant reduction in Yale-Brown OCD Scale scores by modulating glutamate.", timing:"With meals to reduce nausea.", caution:"Takes weeks to build. Always use alongside (not instead of) prescribed treatment.", link:"https://pubmed.ncbi.nlm.nih.gov/22464336/" },
    { name:"Inositol", dose:"12–18g daily (powder form)", emoji:"🫧", science:"A B-vitamin relative that modulates serotonin receptors. An RCT showed inositol reduced OCD symptoms, particularly compulsions, comparably to fluvoxamine in some measures.", timing:"Split across 2–3 doses with food.", caution:"High doses required — use powder. Can cause mild GI upset initially.", link:"https://pubmed.ncbi.nlm.nih.gov/8780431/" },
    { name:"Omega-3 (EPA/DHA)", dose:"2g EPA+DHA daily", emoji:"🐟", science:"Anti-inflammatory omega-3s may reduce neuroinflammation implicated in OCD pathology and support response to CBT and SSRI treatment.", timing:"With a meal containing fat.", caution:"Standard cautions apply — inform your prescribing doctor.", link:"" },
    { name:"Magnesium Glycinate", dose:"200–400mg daily", emoji:"🌿", science:"Supports NMDA receptor modulation and anxiety reduction, both relevant to OCD. Also helps with sleep disruption common in OCD.", timing:"Evening.", caution:"Very well tolerated at standard doses.", link:"" },
  ],
  default: [
    { name:"Omega-3 (EPA/DHA)", dose:"1–2g EPA+DHA daily", emoji:"🐟", science:"The most replicated nutrition-psychiatry finding. Omega-3 supports membrane fluidity in brain cells, reduces neuroinflammation, and supports mood, focus, and cognitive function across conditions.", timing:"With a meal containing fat for best absorption.", caution:"Choose molecularly distilled, third-party tested brands.", link:"https://pubmed.ncbi.nlm.nih.gov/26978738/" },
    { name:"Magnesium Glycinate", dose:"200–400mg elemental Mg daily", emoji:"🌿", science:"Over 300 enzymatic reactions in the body require magnesium. Most people are deficient. Supports sleep, stress response, mood, and nervous system regulation.", timing:"Evening for sleep and relaxation benefits.", caution:"Start at 100mg and build up. Glycinate form is the most bioavailable and gentle.", link:"https://pubmed.ncbi.nlm.nih.gov/28445426/" },
    { name:"Vitamin D3 + K2", dose:"2000–4000 IU D3 with 100mcg K2", emoji:"☀️", science:"Vitamin D is technically a neurosteroid. Deficiency — extremely common especially in northern climates — is linked to depression, cognitive decline, and immune dysfunction.", timing:"Morning with a fatty meal.", caution:"Test your blood levels first. K2 ensures calcium goes to bones, not arteries.", link:"https://pubmed.ncbi.nlm.nih.gov/22254078/" },
    { name:"B-Complex (Methylated)", dose:"One daily with breakfast", emoji:"🔋", science:"B vitamins are upstream cofactors for virtually every neurotransmitter. Look for methylfolate and methylcobalamin — the active forms that bypass common MTHFR gene variants.", timing:"Morning with food.", caution:"May make urine bright yellow (harmless B2 effect). Avoid late in the day — energising for some.", link:"" },
  ]
};

const SUPPLEMENT_CONDITION_MAP = {
  adhd:"adhd", anxiety:"anxiety", depression:"depression", ptsd:"ptsd",
  bipolar_disorder:"bipolar", ocd:"ocd", bipolar_i:"bipolar", bipolar_ii:"bipolar",
  mdd:"depression", gad:"anxiety", social_anxiety:"anxiety", panic_disorder:"anxiety",
  agoraphobia:"anxiety", health_anxiety:"anxiety", separation_anxiety:"anxiety",
};

export default function NeuroThrive() {
  const [step, setStep] = useState(0);
  const [selectedConditions, setSelectedConditions] = useState([]);
  const [selectedDiet, setSelectedDiet] = useState([]);
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
  const [modalTab, setModalTab] = useState("why");
  const [altMeal, setAltMeal] = useState({});
  const [weekView, setWeekView] = useState(false);
  const [planCycle, setPlanCycle] = useState(1);
  const [cycleStartDate, setCycleStartDate] = useState(null);
  const [showCycleComplete, setShowCycleComplete] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [remindersEnabled, setRemindersEnabled] = useState(false);
  const [notifPermission, setNotifPermission] = useState("default");
  const [reminderTimes, setReminderTimes] = useState({
    breakfast: "08:00", lunch: "12:30", dinner: "18:30", snack: "15:00"
  });
  const [reminderActive, setReminderActive] = useState({
    breakfast: true, lunch: true, dinner: true, snack: false
  });
  const [reminderSaved, setReminderSaved] = useState(false);

  // Load persisted state on mount
  useEffect(() => {
    const load = async () => {
      try {
        const saved = await window.storage.get("neurothrive-session");
        if (saved) {
          const d = JSON.parse(saved.value);
          if (d.selectedConditions) setSelectedConditions(d.selectedConditions);
          if (d.selectedDiet) setSelectedDiet(d.selectedDiet);
          if (d.menu30) setMenu30(d.menu30);
          if (d.logs) setLogs(d.logs);
          if (d.planCycle) setPlanCycle(d.planCycle);
          if (d.cycleStartDate) setCycleStartDate(d.cycleStartDate);
          if (d.step && d.step > 0) setStep(d.step);
          if (d.remindersEnabled) setRemindersEnabled(d.remindersEnabled);
          if (d.reminderTimes) setReminderTimes(d.reminderTimes);
          if (d.reminderActive) setReminderActive(d.reminderActive);
        }
      } catch(e) { /* no saved data yet */ }
      setDataLoaded(true);
    };
    load();
  }, []);

  // Save state whenever key data changes
  useEffect(() => {
    if (!dataLoaded) return;
    const save = async () => {
      try {
        await window.storage.set("neurothrive-session", JSON.stringify({
          selectedConditions, selectedDiet, menu30, logs,
          planCycle, cycleStartDate, step,
          remindersEnabled, reminderTimes, reminderActive
        }));
      } catch(e) {}
    };
    save();
  }, [selectedConditions, selectedDiet, menu30, logs, planCycle, cycleStartDate, step, remindersEnabled, reminderTimes, reminderActive, dataLoaded]);

  // Check if current cycle is complete (30 days elapsed since start)
  useEffect(() => {
    if (!cycleStartDate || !menu30) return;
    const start = new Date(cycleStartDate);
    const now = new Date();
    const daysSinceStart = Math.floor((now - start) / (1000 * 60 * 60 * 24));
    if (daysSinceStart >= 30 && !showCycleComplete) {
      setShowCycleComplete(true);
    }
  }, [cycleStartDate, menu30]);

  const startNewCycle = () => {
    const condition = selectedConditions[0] || "default";
    const days = build30DayMenu(condition, selectedDiet);
    setMenu30(days);
    setPlanCycle(c => c + 1);
    setCycleStartDate(new Date().toISOString());
    setSelectedWeek(0);
    setSelectedDayIdx(0);
    setShowCycleComplete(false);
    setStep(3);
  };

  useEffect(() => {
    const interval = setInterval(() => setAffirmIdx(i => (i + 1) % AFFIRMATIONS.length), 8000);
    return () => clearInterval(interval);
  }, []);

  const toggleItem = (list, setList, id) => {
    setList(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const buildMenu = () => {
    const condition = selectedConditions[0] || "default";
    const days = build30DayMenu(condition, selectedDiet);
    setMenu30(days);
    setPlanCycle(1);
    setCycleStartDate(new Date().toISOString());
    setSelectedWeek(0);
    setSelectedDayIdx(0);
    setStep(3);
  };

  // Days elapsed in current cycle
  // Notification permission check on mount
  useEffect(() => {
    if ("Notification" in window) {
      setNotifPermission(Notification.permission);
    }
  }, []);

  const requestNotifPermission = async () => {
    if (!("Notification" in window)) return;
    const perm = await Notification.requestPermission();
    setNotifPermission(perm);
    if (perm === "granted") {
      setRemindersEnabled(true);
      scheduleReminders();
    }
  };

  const scheduleReminders = () => {
    // Schedule daily notifications using setTimeout loops
    // In a real app this would use a service worker — for web this works while tab is open
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
          new Notification("🌿 NeuroThrive", {
            body: `Time for ${mealNames[meal]}! Your plan is ready. Nourish your mind. 🍽️`,
            icon: "https://cdn-icons-png.flaticon.com/512/3448/3448609.png",
          });
        }
      }, ms);
    });
  };

  const saveReminders = () => {
    if (remindersEnabled) scheduleReminders();
    setReminderSaved(true);
    setTimeout(() => setReminderSaved(false), 2500);
  };

  const daysElapsed = cycleStartDate
    ? Math.min(30, Math.floor((new Date() - new Date(cycleStartDate)) / (1000 * 60 * 60 * 24)) + 1)
    : 1;

  const openExplain = (meal, mealType) => {
    const conditionLabel = selectedConditions.length > 0
      ? MENTAL_CONDITIONS.find(c => c.id === selectedConditions[0])?.label
      : "general wellness";
    setExplainModal({ meal, mealType });
    setExplainText(getExplanation(meal, conditionLabel));
    setModalTab("why");
  };

  const openRecipe = (meal, mealType) => {
    setExplainModal({ meal, mealType });
    setExplainText(getExplanation(meal, ""));
    setModalTab("recipe");
  };

  const getAltMeal = (currentMeal, mealType) => {
    const typeKey = mealType === "Breakfast" ? "breakfast" : mealType === "Lunch" ? "lunch" : mealType === "Dinner" ? "dinner" : "snacks";
    const condition = selectedConditions[0] || "default";
    const pool = filterMeals(ALL_MEALS[typeKey], selectedDiet, condition).map(m => m.name).filter(n => n !== currentMeal);
    if (pool.length === 0) return;
    const pick = pool[Math.floor(Math.random() * pool.length)];
    setAltMeal(prev => ({ ...prev, [currentMeal]: pick }));
  };

  const saveLog = () => {
    if (!todayMood || !todayEnergy) return;
    const entry = {
      date: new Date().toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }),
      mood: todayMood,
      energy: todayEnergy,
      note: todayNote,
    };
    setLogs(prev => [entry, ...prev]);
    setTodayMood(null);
    setTodayEnergy(null);
    setTodayNote("");
    setLogSaved(true);
    setTimeout(() => setLogSaved(false), 3000);
  };

  const nextAffirm = () => { setAnimating(true); setTimeout(() => { setAffirmIdx(i => (i+1)%AFFIRMATIONS.length); setAnimating(false); }, 300); };
  const prevAffirm = () => { setAnimating(true); setTimeout(() => { setAffirmIdx(i => (i-1+AFFIRMATIONS.length)%AFFIRMATIONS.length); setAnimating(false); }, 300); };

  const weekDays = menu30 ? menu30.slice(selectedWeek * 7, selectedWeek * 7 + 7) : [];
  const currentDay = weekDays[selectedDayIdx] || null;
  const globalDayIdx = selectedWeek * 7 + selectedDayIdx;

  const S = {
    app: { minHeight:"100vh", background:"linear-gradient(160deg,#1c1814 0%,#231f1a 50%,#171310 100%)", fontFamily:"'Jost',system-ui,sans-serif", color:"#f0ebe2" },
    nav: { background:"rgba(22,18,14,0.97)", borderBottom:"1px solid rgba(160,140,110,0.15)", padding:"0 24px", display:"flex", alignItems:"center", justifyContent:"space-between", position:"sticky", top:0, zIndex:100, backdropFilter:"blur(12px)", height:"56px" },
    logo: { fontSize:"17px", fontWeight:"700", color:"#f0ebe2", letterSpacing:"-0.2px", display:"flex", alignItems:"center", gap:"8px" },
    navTabs: { display:"flex", gap:"2px", flexWrap:"wrap" },
    navTab: (a) => ({ padding:"7px 14px", borderRadius:"8px", border:"none", cursor:"pointer", fontSize:"12px", fontWeight: a?"600":"400", background: a?"rgba(143,184,147,0.15)":"transparent", color: a?"#a8c5a0":"#9c8e7e", transition:"all 0.2s", letterSpacing:"0.1px" }),
    main: { maxWidth:"780px", margin:"0 auto", padding:"48px 24px" },
    hero: { textAlign:"center", padding:"72px 20px 56px" },
    heroEyebrow: { display:"inline-block", fontSize:"11px", fontWeight:"600", letterSpacing:"3px", textTransform:"uppercase", color:"#8fb893", background:"rgba(143,184,147,0.12)", padding:"6px 16px", borderRadius:"20px", marginBottom:"28px" },
    heroTitle: { fontSize:"60px", fontWeight:"800", color:"#f0ebe2", lineHeight:1.05, marginBottom:"20px", letterSpacing:"-2px" },
    heroAccent: { color:"#8fb893" },
    heroSub: { fontSize:"17px", color:"#8a9e8a", maxWidth:"460px", margin:"0 auto 44px", lineHeight:1.7, fontWeight:"400" },
    btn: { background:"rgba(160,140,110,0.15)", color:"#a8c5a0", border:"1px solid rgba(160,140,110,0.3)", padding:"13px 28px", borderRadius:"50px", fontSize:"14px", fontWeight:"600", letterSpacing:"0.2px", cursor:"pointer", transition:"all 0.2s" },
    btnOutline: { background:"transparent", color:"#a8c5a0", border:"1px solid rgba(160,140,110,0.35)", padding:"12px 24px", borderRadius:"50px", fontSize:"14px", fontWeight:"500", cursor:"pointer", transition:"all 0.2s" },
    btnAccent: { background:"linear-gradient(135deg,#7a9e7e,#5a7d5e)", color:"#fff", border:"none", padding:"14px 34px", borderRadius:"50px", fontSize:"14px", fontWeight:"600", cursor:"pointer", transition:"all 0.2s", boxShadow:"0 4px 20px rgba(90,125,94,0.3)" },
    btnSm: { background:"transparent", border:"1px solid rgba(160,140,110,0.2)", borderRadius:"8px", color:"#9c8e7e", padding:"6px 12px", cursor:"pointer", fontSize:"12px", fontWeight:"500" },
    sectionTitle: { fontSize:"28px", color:"#f0ebe2", marginBottom:"6px", fontWeight:"700", letterSpacing:"-0.5px" },
    sectionSub: { fontSize:"14px", color:"#9c8e7e", marginBottom:"28px", lineHeight:1.6 },
    grid: { display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(148px,1fr))", gap:"10px", marginBottom:"32px" },
    chip: (sel) => ({ padding:"12px 14px", borderRadius:"14px", border: sel?"1.5px solid #7a9e7e":"1px solid rgba(160,140,110,0.18)", background: sel?"rgba(122,158,126,0.15)":"rgba(255,248,235,0.04)", cursor:"pointer", fontSize:"13px", fontWeight: sel?"600":"400", color: sel?"#a8c5a0":"#9c8e7e", display:"flex", alignItems:"center", gap:"8px", transition:"all 0.15s" }),
    card: { background:"rgba(255,248,235,0.05)", border:"1px solid rgba(160,140,110,0.14)", borderRadius:"16px", padding:"20px", marginBottom:"14px" },
    mealLabel: { fontSize:"10px", textTransform:"uppercase", letterSpacing:"2.5px", color:"#7a9e7e", marginBottom:"10px", fontWeight:"700" },
    tag: { display:"inline-block", padding:"4px 12px", borderRadius:"20px", background:"rgba(122,158,126,0.15)", color:"#a8c5a0", fontSize:"12px", fontWeight:"500", marginRight:"6px", marginBottom:"6px" },
    divider: { height:"1px", background:"rgba(160,140,110,0.12)", margin:"22px 0" },
    moodRow: { display:"flex", gap:"10px", flexWrap:"wrap", marginBottom:"20px" },
    moodBtn: (sel) => ({ flex:1, minWidth:"55px", padding:"12px 6px", borderRadius:"14px", border: sel?"1.5px solid #7a9e7e":"1px solid rgba(160,140,110,0.18)", background: sel?"rgba(122,158,126,0.15)":"rgba(255,248,235,0.04)", cursor:"pointer", textAlign:"center", transition:"all 0.15s", color: sel?"#a8c5a0":"#9c8e7e", fontWeight: sel?"600":"400" }),
    textarea: { width:"100%", background:"rgba(255,248,235,0.05)", border:"1px solid rgba(160,140,110,0.18)", borderRadius:"12px", color:"#f0ebe2", fontFamily:"'Jost',system-ui,sans-serif", fontSize:"14px", padding:"14px", resize:"vertical", minHeight:"80px", outline:"none", boxSizing:"border-box", marginBottom:"16px" },
    affirmCard: { textAlign:"center", padding:"56px 36px", background:"rgba(143,184,147,0.07)", border:"1px solid rgba(143,184,147,0.18)", borderRadius:"24px", marginBottom:"20px", position:"relative", overflow:"hidden" },
    successBanner: { background:"rgba(80,180,120,0.12)", border:"1px solid rgba(80,180,120,0.25)", borderRadius:"12px", padding:"12px 18px", color:"#7ab87e", fontSize:"13px", fontWeight:"600", textAlign:"center", marginBottom:"16px" },
    dot: (a,d) => ({ width:"6px", height:"6px", borderRadius:"50%", background: a?"#7a9e7e":d?"rgba(122,158,126,0.4)":"rgba(160,140,110,0.2)", transition:"all 0.3s" }),
    warningBanner: { background:"rgba(143,184,147,0.07)", border:"1px solid rgba(143,184,147,0.18)", borderRadius:"12px", padding:"12px 18px", color:"#a8c5a0", fontSize:"13px", fontWeight:"500", marginBottom:"18px" },
    pillRow: { display:"flex", gap:"8px", flexWrap:"wrap", marginBottom:"20px" },
  };

  const STEPS = ["Welcome","Conditions","Diet","Menu","Journal","Affirmations","Supplements","Reminders"];

  return (
    <div style={S.app}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Jost:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        body { 
        margin: 0; 
        background: #1c1814;
      }
      * { -webkit-font-smoothing: antialiased; }
      @keyframes gentleFloat {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-4px); }
      }
      @keyframes fadeUp {
        from { opacity: 0; transform: translateY(16px); }
        to { opacity: 1; transform: translateY(0); }
      }
        button:hover { opacity: 0.88; }
        details > summary { user-select: none; }
        details > summary::-webkit-details-marker { display: none; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 3px; }
      `}</style>
      <nav style={S.nav}>
        <div style={{ ...S.logo, cursor:"pointer" }} onClick={() => setStep(0)}>
          <span style={{ fontSize:"20px" }}>🧠</span>
          <span>NeuroThrive</span>
        </div>
        <div style={S.navTabs}>
          {step > 0 && STEPS.slice(1).map((s, i) => {
            const targetStep = i + 1;
            const accessible = targetStep <= Math.max(step, 8);
            return (
              <button key={s} style={S.navTab(step===targetStep)} onClick={() => accessible && setStep(targetStep)}>{s}</button>
            );
          })}
        </div>
      </nav>

      <div style={S.main}>
        {step > 0 && step < 9 && (
          <div style={{ display:"flex", justifyContent:"center", gap:"6px", marginBottom:"36px" }}>
            {STEPS.slice(1).map((s,i) => <div key={s} style={S.dot(step===i+1, step>i+1)} />)}
          </div>
        )}

        {/* WELCOME */}
        {step === 0 && (
          <div style={S.hero}>
            <div style={S.heroEyebrow}>Brain · Food · Wellbeing</div>
            <h1 style={S.heroTitle}>
              Eat for your<br/><span style={S.heroAccent}>mind.</span>
            </h1>
            <p style={S.heroSub}>A personalized 30-day nutrition plan built around your mental health — with daily mood tracking and science-backed meal explanations.</p>
            <button style={S.btnAccent} onClick={() => setStep(1)}>Get Started →</button>
          </div>
        )}

        {/* STEP 1: CONDITIONS */}
        {step === 1 && (
          <div>
            <h2 style={S.sectionTitle}>What do you live with?</h2>
            <p style={S.sectionSub}>Select all that apply. You are not defined by these labels — they simply help us personalize your plan.</p>
            <div style={S.grid}>
              {MENTAL_CONDITIONS.map(c => (
                <div key={c.id} style={S.chip(selectedConditions.includes(c.id))} onClick={() => toggleItem(selectedConditions, setSelectedConditions, c.id)}>
                  <span style={{ fontSize:"17px" }}>{c.emoji}</span><span>{c.label}</span>
                </div>
              ))}
            </div>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <span style={{ color:"#999", fontSize:"13px", fontWeight:"500" }}>{selectedConditions.length > 0 ? `${selectedConditions.length} selected` : "Select at least one, or continue"}</span>
              <button style={S.btn} onClick={() => setStep(2)}>Continue →</button>
            </div>
          </div>
        )}

        {/* STEP 2: DIET */}
        {step === 2 && (
          <div>
            <h2 style={S.sectionTitle}>Dietary needs & restrictions</h2>
            <p style={S.sectionSub}>Select everything that applies — your menu will be filtered to exclude anything that doesn't work for you.</p>
            <div style={S.grid}>
              {DIETARY.filter((d,i,a) => a.findIndex(x=>x.id===d.id)===i).map(d => (
                <div key={d.id} style={S.chip(selectedDiet.includes(d.id))} onClick={() => toggleItem(selectedDiet, setSelectedDiet, d.id)}>
                  <span style={{ fontSize:"17px" }}>{d.emoji}</span><span>{d.label}</span>
                </div>
              ))}
            </div>
            {selectedDiet.length > 0 && (
              <div style={{ ...S.warningBanner, marginBottom:"20px" }}>
                ✓ Active filters: {selectedDiet.map(d => DIETARY.find(x=>x.id===d)?.label).join(", ")} — meals containing these ingredients will be excluded.
              </div>
            )}
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <button style={S.btnOutline} onClick={() => setStep(1)}>← Back</button>
              <button style={S.btn} onClick={buildMenu}>Build My 30-Day Menu →</button>
            </div>
          </div>
        )}

        {/* CYCLE COMPLETE MODAL */}
        {showCycleComplete && (
          <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.7)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:200, padding:"20px" }}>
            <div style={{ background:"linear-gradient(145deg,#1e1a15,#251f18)", borderRadius:"28px", padding:"40px 32px", maxWidth:"420px", width:"100%", textAlign:"center", border:"1px solid rgba(143,184,147,0.25)", boxShadow:"0 40px 100px rgba(0,0,0,0.4)" }}>
              <div style={{ fontSize:"56px", marginBottom:"16px" }}>🌿</div>
              <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"32px", fontWeight:"400", color:"#f0ebe2", marginBottom:"12px" }}>Cycle {planCycle} Complete</h2>
              <p style={{ color:"#9c8e7e", fontSize:"15px", lineHeight:1.6, marginBottom:"8px" }}>You've completed 30 days of nourishing your mind and body. That's something to be genuinely proud of.</p>
              <p style={{ color:"#8fb893", fontSize:"14px", marginBottom:"28px", fontStyle:"italic" }}>Your new Cycle {planCycle + 1} menu is ready — fresh meals, same personalisation.</p>
              <div style={{ display:"flex", gap:"12px", justifyContent:"center", flexWrap:"wrap" }}>
                <button onClick={startNewCycle} style={{ background:"linear-gradient(135deg,#7a9e7e,#5a7d5e)", color:"#fff", border:"none", padding:"14px 28px", borderRadius:"50px", fontSize:"14px", fontWeight:"600", cursor:"pointer", boxShadow:"0 4px 20px rgba(90,125,94,0.3)" }}>
                  Start Cycle {planCycle + 1} 🌱
                </button>
                <button onClick={() => setShowCycleComplete(false)} style={{ background:"transparent", color:"#9c8e7e", border:"1px solid rgba(160,140,110,0.3)", padding:"14px 24px", borderRadius:"50px", fontSize:"14px", cursor:"pointer" }}>
                  Stay on This Menu
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: 30-DAY MENU */}
        {step === 3 && menu30 && (
          <div>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"6px", flexWrap:"wrap", gap:"10px" }}>
              <div>
                <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"6px" }}>
                  <h2 style={{ ...S.sectionTitle, marginBottom:"0" }}>Your 30-Day Menu</h2>
                  <span style={{ background:"rgba(143,184,147,0.15)", border:"1px solid rgba(143,184,147,0.3)", color:"#8fb893", fontSize:"11px", fontWeight:"600", letterSpacing:"1.5px", padding:"4px 12px", borderRadius:"20px", textTransform:"uppercase" }}>
                    Cycle {planCycle}
                  </span>
                </div>
                <p style={S.sectionSub}>Tap any meal to see why it's on your plan or get the recipe.</p>
              </div>
              <button style={S.btnOutline} onClick={startNewCycle}>↺ New Cycle</button>
            </div>

            {/* Progress bar */}
            {cycleStartDate && (
              <div style={{ ...S.card, marginBottom:"14px", padding:"14px 18px" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"8px" }}>
                  <span style={{ fontSize:"12px", color:"#9c8e7e", fontWeight:"500" }}>Cycle {planCycle} Progress</span>
                  <span style={{ fontSize:"12px", color:"#8fb893", fontWeight:"600" }}>Day {daysElapsed} of 30</span>
                </div>
                <div style={{ height:"6px", background:"rgba(160,140,110,0.15)", borderRadius:"10px", overflow:"hidden" }}>
                  <div style={{ height:"100%", width:`${(daysElapsed/30)*100}%`, background:"linear-gradient(90deg,#7a9e7e,#a8c5a0)", borderRadius:"10px", transition:"width 0.5s ease" }} />
                </div>
                <div style={{ marginTop:"8px", fontSize:"11px", color:"#9c8e7e" }}>
                  {30 - daysElapsed > 0 ? `${30 - daysElapsed} days remaining in this cycle — your next menu auto-generates at day 30` : "🌿 Cycle complete! Start your next 30 days whenever you're ready."}
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
                <div style={{ fontSize:"11px", fontWeight:"700", color:"#9c8e7e", letterSpacing:"1px", textTransform:"uppercase", marginBottom:"8px" }}>Active filters</div>
                {selectedDiet.map(d => { const item = DIETARY.find(x=>x.id===d); return <span key={d} style={S.tag}>{item?.emoji} {item?.label}</span>; })}
              </div>
            )}

            {/* Week tabs */}
            <div style={{ display:"flex", gap:"8px", marginBottom:"14px" }}>
              {WEEKS.map((w,i) => (
                <button key={w} onClick={() => { setSelectedWeek(i); setSelectedDayIdx(0); }} style={{ flex:1, padding:"10px 4px", borderRadius:"12px", border: selectedWeek===i ? "2px solid #7a9e7e" : "1px solid rgba(160,140,110,0.18)", background: selectedWeek===i ? "#7a9e7e" : "rgba(255,248,235,0.04)", color: selectedWeek===i ? "#fff" : "#9c8e7e", fontSize:"12px", fontWeight:"700", cursor:"pointer", transition:"all 0.15s", boxShadow: selectedWeek===i ? "none" : "0 1px 3px rgba(0,0,0,0.06)" }}>{w}</button>
              ))}
            </div>

            {/* Day tabs */}
            <div style={{ display:"flex", gap:"6px", marginBottom:"20px" }}>
              {weekDays.map((d, i) => (
                <button key={d.day} onClick={() => setSelectedDayIdx(i)} style={{ flex:1, padding:"10px 4px", borderRadius:"12px", border: selectedDayIdx===i ? "2px solid #8fb893" : "1px solid rgba(160,140,110,0.14)", background: selectedDayIdx===i ? "rgba(143,184,147,0.12)" : "rgba(255,248,235,0.04)", color: selectedDayIdx===i ? "#a8c5a0" : "#9c8e7e", fontSize:"11px", fontWeight: selectedDayIdx===i ? "700" : "500", cursor:"pointer", transition:"all 0.15s", textAlign:"center", boxShadow: selectedDayIdx===i ? "none" : "0 1px 3px rgba(0,0,0,0.05)" }}>
                  <div>{DAY_NAMES[i]}</div>
                  <div style={{ fontSize:"10px", marginTop:"2px", opacity:0.7 }}>Day {d.day}</div>
                </button>
              ))}
            </div>

            {/* Day header */}
            {currentDay && (
              <>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"16px" }}>
                  <div style={{ fontSize:"17px", color:"#f0ebe2", fontWeight:"700", letterSpacing:"-0.3px" }}>Day {currentDay.day} <span style={{ color:"#9c8e7e", fontWeight:"400" }}>— {DAY_NAMES[selectedDayIdx]}</span></div>
                  <div style={{ display:"flex", gap:"8px" }}>
                    <button style={S.btnSm} onClick={() => { const prev = globalDayIdx - 1; if(prev>=0) { setSelectedWeek(Math.floor(prev/7)); setSelectedDayIdx(prev%7); } }}>← Prev</button>
                    <button style={S.btnSm} onClick={() => { const next = globalDayIdx + 1; if(next<30) { setSelectedWeek(Math.floor(next/7)); setSelectedDayIdx(next%7); } }}>Next →</button>
                  </div>
                </div>

                {[{ key:"breakfast", label:"🌅 Breakfast" },{ key:"lunch", label:"☀️ Lunch" },{ key:"dinner", label:"🌙 Dinner" },{ key:"snacks", label:"🍎 Snack" }].map(({ key, label }) => (
                  <div key={key} style={S.card}>
                    <div style={S.mealLabel}>{label}</div>
                    <div style={{ display:"flex", alignItems:"flex-start", gap:"10px", marginBottom:"14px" }}>
                      <span style={{ color:"#8fb893", marginTop:"2px", flexShrink:0, fontSize:"8px" }}>●</span>
                      <span style={{ flex:1, color:"#f0ebe2", fontSize:"15px", fontWeight:"600", lineHeight:1.5 }}>{currentDay[key]}</span>
                    </div>
                    {altMeal[currentDay[key]] && (
                      <div style={{ marginBottom:"12px", padding:"10px 12px", borderRadius:"10px", background:"rgba(122,158,126,0.08)", border:"1px solid rgba(122,158,126,0.2)" }}>
                        <div style={{ color:"#8fb893", fontSize:"11px", fontWeight:"700", letterSpacing:"0.5px", marginBottom:"4px" }}>ALTERNATIVE</div>
                        <div style={{ color:"#f0ebe2", fontSize:"14px", fontWeight:"600" }}>{altMeal[currentDay[key]]}</div>
                      </div>
                    )}
                    <div style={{ display:"flex", gap:"8px", flexWrap:"wrap" }}>
                      <button
                        onClick={() => openExplain(currentDay[key], label)}
                        style={{ flex:1, padding:"9px 10px", borderRadius:"10px", border:"1px solid rgba(160,140,110,0.2)", background:"rgba(160,140,110,0.07)", color:"#a8c5a0", fontSize:"12px", fontWeight:"600", cursor:"pointer", transition:"all 0.15s" }}
                        onMouseEnter={e => e.currentTarget.style.background="rgba(143,184,147,0.15)"}
                        onMouseLeave={e => e.currentTarget.style.background="rgba(143,184,147,0.07)"}
                      >🧠 Why this?</button>
                      <button
                        onClick={() => openRecipe(currentDay[key], label)}
                        style={{ flex:1, padding:"9px 10px", borderRadius:"10px", border:"1.5px solid rgba(122,158,126,0.3)", background:"rgba(122,158,126,0.07)", color:"#8fb893", fontSize:"12px", fontWeight:"600", cursor:"pointer", transition:"all 0.15s" }}
                        onMouseEnter={e => e.currentTarget.style.background="rgba(122,158,126,0.14)"}
                        onMouseLeave={e => e.currentTarget.style.background="rgba(122,158,126,0.07)"}
                      >🍳 Recipe</button>
                      <button
                        onClick={() => getAltMeal(currentDay[key], label)}
                        style={{ flex:1, padding:"9px 10px", borderRadius:"10px", border:"1.5px solid rgba(160,140,110,0.25)", background:"rgba(160,140,110,0.06)", color:"#c4a882", fontSize:"12px", fontWeight:"600", cursor:"pointer", transition:"all 0.15s" }}
                        onMouseEnter={e => e.currentTarget.style.background="rgba(160,140,110,0.14)"}
                        onMouseLeave={e => e.currentTarget.style.background="rgba(160,140,110,0.06)"}
                      >✨ Alternative</button>
                    </div>
                  </div>
                ))}
              </>
            )}

            {/* Week at a glance */}
            <details style={{ marginTop:"8px", marginBottom:"20px" }}>
              <summary style={{ color:"#9c8e7e", cursor:"pointer", fontSize:"13px", fontWeight:"600", listStyle:"none", display:"flex", alignItems:"center", gap:"6px", padding:"8px 0" }}>
                <span style={{ color:"#8fb893" }}>▸</span> View full week at a glance
              </summary>
              <div style={{ marginTop:"12px", display:"grid", gap:"8px" }}>
                {weekDays.map((day, i) => (
                  <div key={day.day} onClick={() => setSelectedDayIdx(i)} style={{ padding:"14px 16px", borderRadius:"14px", background: selectedDayIdx===i ? "rgba(122,158,126,0.1)" : "rgba(255,248,235,0.04)", border: selectedDayIdx===i ? "1px solid rgba(143,184,147,0.35)" : "1px solid rgba(160,140,110,0.12)", cursor:"pointer", boxShadow:"0 1px 4px rgba(0,0,0,0.04)", transition:"all 0.15s" }}>
                    <div style={{ color:"#8fb893", fontSize:"10px", letterSpacing:"1.5px", textTransform:"uppercase", fontWeight:"700", marginBottom:"6px" }}>Day {day.day} — {DAY_NAMES[i]}</div>
                    <div style={{ color:"#8a9e8a", fontSize:"12px", lineHeight:1.8 }}>🌅 {day.breakfast}<br/>☀️ {day.lunch}<br/>🌙 {day.dinner}</div>
                  </div>
                ))}
              </div>
            </details>

            {/* Full 30-day overview */}
            <details style={{ marginBottom:"24px" }}>
              <summary style={{ color:"#9c8e7e", cursor:"pointer", fontSize:"13px", fontWeight:"600", listStyle:"none", display:"flex", alignItems:"center", gap:"6px", padding:"8px 0" }}>
                <span style={{ color:"#8fb893" }}>▸</span> View all 30 days
              </summary>
              <div style={{ marginTop:"12px", display:"grid", gap:"6px" }}>
                {menu30.map((day, i) => (
                  <div key={day.day} onClick={() => { setSelectedWeek(Math.floor(i/7)); setSelectedDayIdx(i%7); }} style={{ padding:"10px 14px", borderRadius:"12px", background:"rgba(255,248,235,0.04)", border:"1px solid rgba(160,140,110,0.12)", cursor:"pointer", transition:"all 0.15s" }}
                    onMouseEnter={e => e.currentTarget.style.background="rgba(143,184,147,0.07)"}
                    onMouseLeave={e => e.currentTarget.style.background="rgba(255,248,235,0.04)"}
                  >
                    <div style={{ color:"#8fb893", fontSize:"10px", fontWeight:"700", marginBottom:"3px" }}>Day {day.day}</div>
                    <div style={{ color:"#9c8e7e", fontSize:"11px", lineHeight:1.6 }}>🌅 {day.breakfast} · ☀️ {day.lunch} · 🌙 {day.dinner}</div>
                  </div>
                ))}
              </div>
            </details>

            <div style={{ display:"flex", gap:"12px", justifyContent:"flex-end" }}>
              <button style={S.btnOutline} onClick={() => setStep(2)}>← Adjust Filters</button>
              <button style={S.btnAccent} onClick={() => setStep(4)}>Log Today's Mood →</button>
            </div>
          </div>
        )}

        {/* STEP 4: JOURNAL */}
        {step === 4 && (
          <div>
            <h2 style={S.sectionTitle}>Daily Wellness Log</h2>
            <p style={S.sectionSub}>Track how your body and mind feel. Over time, patterns emerge — and patterns become power.</p>
            {logSaved && <div style={S.successBanner}>✓ Today's log saved! Every entry matters.</div>}
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
              <textarea
                style={S.textarea}
                placeholder="How did eating feel today? Any changes you noticed? Be kind to yourself..."
                value={todayNote}
                onChange={evt => setTodayNote(evt.target.value)}
              />
              <button
                style={{
                  background: (todayMood && todayEnergy) ? "linear-gradient(135deg,#7a9e7e,#5a7d5e)" : "rgba(160,140,110,0.15)",
                  color: (todayMood && todayEnergy) ? "#fff" : "#9c8e7e",
                  border: "none",
                  padding: "14px",
                  borderRadius: "50px",
                  fontSize: "14px",
                  fontWeight: "700",
                  cursor: (todayMood && todayEnergy) ? "pointer" : "default",
                  width: "100%",
                  transition: "all 0.2s",
                }}
                onClick={() => {
                  if (!todayMood || !todayEnergy) return;
                  const entry = {
                    date: new Date().toLocaleDateString("en-US", { weekday:"short", month:"short", day:"numeric" }),
                    mood: todayMood,
                    energy: todayEnergy,
                    note: todayNote,
                  };
                  setLogs(prev => [entry, ...prev]);
                  setTodayMood(null);
                  setTodayEnergy(null);
                  setTodayNote("");
                  setLogSaved(true);
                  setTimeout(() => setLogSaved(false), 3000);
                }}
              >
                {(todayMood && todayEnergy) ? "Save Today's Log ✓" : "Select mood & energy to save"}
              </button>
            </div>
            {logs.length > 0 && (
              <>
                <div style={S.divider} />
                <div style={S.mealLabel}>Past entries</div>
                {logs.map((log, idx) => (
                  <div key={idx} style={{ padding:"16px 18px", borderRadius:"14px", background:"rgba(255,248,235,0.05)", border:"1px solid rgba(160,140,110,0.14)", marginBottom:"10px" }}>
                    <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"6px" }}>
                      <span style={{ color:"#8fb893", fontSize:"13px", fontWeight:"700" }}>{log.date}</span>
                      <span style={{ fontSize:"13px", color:"#9c8e7e" }}>
                        {MOOD_EMOJIS.find(mood => mood.val===log.mood)?.emoji} · {ENERGY_EMOJIS.find(energy => energy.val===log.energy)?.emoji}
                      </span>
                    </div>
                    {log.note && <p style={{ color:"#a8b8a4", fontSize:"13px", margin:0, lineHeight:1.5 }}>{log.note}</p>}
                  </div>
                ))}
              </>
            )}
            <div style={{ display:"flex", justifyContent:"flex-end", marginTop:"18px" }}>
              <button style={S.btn} onClick={() => setStep(5)}>Affirmations →</button>
            </div>
          </div>
        )}

        {/* STEP 5: AFFIRMATIONS */}
        {step === 5 && (
          <div>
            <h2 style={S.sectionTitle}>Words for You</h2>
            <p style={S.sectionSub}>On the hard days and the hopeful ones — these are for you.</p>
            <div style={S.affirmCard}>
              <div style={{ position:"absolute", top:"24px", left:"28px", fontSize:"72px", lineHeight:1, color:"rgba(143,184,147,0.2)", fontFamily:"'Cormorant Garamond',serif" }}>"</div>
              <p style={{ fontSize:"22px", lineHeight:1.55, color:"#f0ebe2", fontStyle:"italic", marginBottom:"20px", opacity:animating?0:1, transition:"opacity 0.3s", position:"relative", zIndex:1, fontWeight:"300" }}>{AFFIRMATIONS[affirmIdx].text}</p>
              <div style={{ fontSize:"12px", color:"#8fb893", letterSpacing:"2px", textTransform:"uppercase", fontWeight:"700" }}>— {AFFIRMATIONS[affirmIdx].author}</div>
            </div>
            <div style={{ display:"flex", justifyContent:"center", gap:"12px", marginBottom:"32px" }}>
              <button style={S.btnOutline} onClick={prevAffirm}>← Prev</button>
              <button style={S.btnAccent} onClick={nextAffirm}>Next →</button>
            </div>
            <div style={S.divider} />
            <div style={{ display:"grid", gap:"10px" }}>
              {AFFIRMATIONS.map((a,i) => (
                <div key={i} onClick={() => setAffirmIdx(i)} style={{ padding:"16px 20px", borderRadius:"16px", cursor:"pointer", border: affirmIdx===i ? "1.5px solid #8fb893" : "1px solid rgba(160,140,110,0.14)", background: affirmIdx===i ? "rgba(122,158,126,0.1)" : "rgba(255,248,235,0.04)", boxShadow:"none", transition:"all 0.15s" }}>
                  <p style={{ margin:0, fontSize:"14px", color:"#d8cfc4", fontStyle:"italic", lineHeight:1.6 }}>"{a.text}"</p>
                </div>
              ))}
            </div>
            <div style={{ textAlign:"center", marginTop:"36px" }}>
              <button style={S.btnOutline} onClick={() => setStep(3)}>← Back to Menu</button>
            </div>
          </div>
        )}
      </div>

      {/* EXPLANATION + RECIPE MODAL */}
      {explainModal && (
        <div onClick={() => setExplainModal(null)} style={{ position:"fixed", inset:0, zIndex:1000, background:"rgba(26,26,26,0.6)", backdropFilter:"blur(8px)", display:"flex", alignItems:"center", justifyContent:"center", padding:"20px" }}>
          <div onClick={e => e.stopPropagation()} style={{ background:"linear-gradient(145deg,#1e1a15,#251f18)", borderRadius:"24px", padding:"28px", maxWidth:"560px", width:"100%", maxHeight:"85vh", overflowY:"auto", position:"relative", boxShadow:"0 32px 80px rgba(0,0,0,0.25)" }}>
            <button onClick={() => setExplainModal(null)} style={{ position:"absolute", top:"16px", right:"16px", background:"rgba(255,255,255,0.07)", border:"none", borderRadius:"50%", width:"32px", height:"32px", color:"#a8b8a4", cursor:"pointer", fontSize:"16px", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:"700" }}>×</button>

            {/* Meal type badge + name */}
            <div style={{ display:"inline-block", padding:"4px 12px", borderRadius:"20px", background:"rgba(122,158,126,0.12)", color:"#8fb893", fontSize:"10px", letterSpacing:"2px", textTransform:"uppercase", fontWeight:"700", marginBottom:"10px" }}>{explainModal.mealType}</div>
            <h3 style={{ fontSize:"18px", color:"#f0ebe2", fontWeight:"700", letterSpacing:"-0.3px", marginBottom:"18px", lineHeight:1.3, paddingRight:"32px" }}>{explainModal.meal}</h3>

            {/* Tabs */}
            <div style={{ display:"flex", gap:"8px", marginBottom:"20px" }}>
              <button onClick={() => setModalTab("why")} style={{ flex:1, padding:"10px", borderRadius:"12px", border: modalTab==="why" ? "1.5px solid #8fb893" : "1px solid rgba(160,140,110,0.18)", background: modalTab==="why" ? "rgba(143,184,147,0.15)" : "rgba(255,248,235,0.04)", color: modalTab==="why" ? "#a8c5a0" : "#9c8e7e", fontSize:"13px", fontWeight:"700", cursor:"pointer", transition:"all 0.15s" }}>🧠 Why This?</button>
              <button onClick={() => setModalTab("recipe")} style={{ flex:1, padding:"10px", borderRadius:"12px", border: modalTab==="recipe" ? "1.5px solid #7a9e7e" : "1px solid rgba(160,140,110,0.18)", background: modalTab==="recipe" ? "#7a9e7e" : "rgba(255,248,235,0.04)", color: modalTab==="recipe" ? "#fff" : "#9c8e7e", fontSize:"13px", fontWeight:"700", cursor:"pointer", transition:"all 0.15s" }}>🍳 Recipe</button>
            </div>

            <div style={{ height:"1px", background:"rgba(160,140,110,0.12)", marginBottom:"18px" }} />

            {/* WHY TAB */}
            {modalTab === "why" && (
              <div style={{ color:"#d8cfc4", fontSize:"14px", lineHeight:1.9, whiteSpace:"pre-wrap" }}>{explainText}</div>
            )}

            {/* RECIPE TAB */}
            {modalTab === "recipe" && (() => {
              const recipe = getRecipe(explainModal.meal);
              return (
                <div>
                  <div style={{ display:"flex", gap:"12px", marginBottom:"22px" }}>
                    <div style={{ padding:"10px 18px", borderRadius:"12px", background:"rgba(255,248,235,0.06)", border:"1px solid rgba(160,140,110,0.16)", textAlign:"center", boxShadow:"0 1px 4px rgba(0,0,0,0.05)" }}>
                      <div style={{ fontSize:"10px", color:"#9c8e7e", letterSpacing:"1.5px", textTransform:"uppercase", fontWeight:"700" }}>Serves</div>
                      <div style={{ fontSize:"18px", color:"#f0ebe2", fontWeight:"700", marginTop:"2px" }}>{recipe.serves}</div>
                    </div>
                    <div style={{ padding:"10px 18px", borderRadius:"12px", background:"rgba(255,248,235,0.06)", border:"1px solid rgba(160,140,110,0.16)", textAlign:"center", boxShadow:"0 1px 4px rgba(0,0,0,0.05)" }}>
                      <div style={{ fontSize:"10px", color:"#9c8e7e", letterSpacing:"1.5px", textTransform:"uppercase", fontWeight:"700" }}>Time</div>
                      <div style={{ fontSize:"18px", color:"#f0ebe2", fontWeight:"700", marginTop:"2px" }}>{recipe.time}</div>
                    </div>
                  </div>

                  <div style={{ marginBottom:"22px" }}>
                    <div style={{ fontSize:"10px", textTransform:"uppercase", letterSpacing:"2px", color:"#8fb893", fontWeight:"700", marginBottom:"12px" }}>Ingredients</div>
                    {recipe.ingredients.map((ing, i) => (
                      <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:"10px", padding:"8px 0", borderBottom:"1px solid rgba(160,140,110,0.1)", color:"#d8cfc4", fontSize:"14px" }}>
                        <span style={{ color:"#8fb893", flexShrink:0, fontWeight:"700" }}>•</span>
                        {ing}
                      </div>
                    ))}
                  </div>

                  <div style={{ marginBottom:"20px" }}>
                    <div style={{ fontSize:"10px", textTransform:"uppercase", letterSpacing:"2px", color:"#8fb893", fontWeight:"700", marginBottom:"12px" }}>Instructions</div>
                    {recipe.steps.map((step, i) => (
                      <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:"12px", marginBottom:"14px" }}>
                        <div style={{ minWidth:"24px", height:"24px", borderRadius:"50%", background:"#7a9e7e", color:"#fff", fontSize:"11px", fontWeight:"800", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:"1px" }}>{i+1}</div>
                        <div style={{ color:"#c8d8c0", fontSize:"14px", lineHeight:1.7 }}>{step}</div>
                      </div>
                    ))}
                  </div>

                  {recipe.tip && (
                    <div style={{ padding:"14px 18px", borderRadius:"14px", background:"rgba(143,184,147,0.07)", border:"1.5px solid rgba(143,184,147,0.18)" }}>
                      <div style={{ fontSize:"10px", textTransform:"uppercase", letterSpacing:"1.5px", color:"#8fb893", fontWeight:"700", marginBottom:"6px" }}>💡 Pro Tip</div>
                      <div style={{ color:"#a8b8a4", fontSize:"13px", lineHeight:1.65 }}>{recipe.tip}</div>
                    </div>
                  )}
                </div>
              );
            })()}

            <div style={{ marginTop:"24px", textAlign:"center" }}>
              <button onClick={() => setExplainModal(null)} style={{ background:"#7a9e7e", color:"#fff", border:"none", padding:"11px 28px", borderRadius:"50px", fontSize:"13px", fontWeight:"700", cursor:"pointer", letterSpacing:"0.3px" }}>Done ✓</button>
            </div>
          </div>
        </div>
      )}

        {/* ─────────── STEP 6: SUPPLEMENTS ─────────── */}
        {step === 6 && (
          <div>
            <h2 style={S.sectionTitle}>Supplements</h2>
            <p style={S.sectionSub}>Evidence-based supplements matched to your conditions. Always consult your doctor before starting anything new.</p>

            {/* Disclaimer */}
            <div style={{ background:"rgba(200,190,160,0.08)", border:"1px solid rgba(200,190,160,0.2)", borderRadius:"14px", padding:"14px 18px", marginBottom:"24px" }}>
              <div style={{ fontSize:"11px", textTransform:"uppercase", letterSpacing:"2px", color:"#9c8e7e", fontWeight:"600", marginBottom:"6px" }}>⚕️ Wellness Information Only</div>
              <p style={{ color:"#9c8e7e", fontSize:"13px", lineHeight:1.7, margin:0 }}>
                These suggestions are based on peer-reviewed research and are provided for educational purposes only. They are <strong style={{color:"#d8cfc4"}}>not medical advice</strong> and are not intended to diagnose, treat, or replace any prescribed medication. Always speak with your healthcare provider before starting supplements, especially if you take medication or have a health condition.
              </p>
            </div>

            {(() => {
              const conditionKey = selectedConditions.length > 0
                ? (SUPPLEMENT_CONDITION_MAP[selectedConditions[0]] || "default")
                : "default";
              const supps = SUPPLEMENTS[conditionKey] || SUPPLEMENTS.default;
              const condLabel = selectedConditions.length > 0
                ? MENTAL_CONDITIONS.find(c => c.id === selectedConditions[0])?.label
                : null;
              return (
                <div>
                  {condLabel && (
                    <div style={{ ...S.card, marginBottom:"20px", padding:"12px 18px" }}>
                      <span style={{ fontSize:"11px", color:"#9c8e7e", textTransform:"uppercase", letterSpacing:"2px" }}>Personalised for: </span>
                      <span style={{ color:"#8fb893", fontWeight:"600", fontSize:"13px" }}>{condLabel}</span>
                    </div>
                  )}
                  {supps.map((s, i) => (
                    <details key={i} style={{ ...S.card, marginBottom:"12px", padding:"0", overflow:"hidden" }}>
                      <summary style={{ padding:"18px 20px", cursor:"pointer", display:"flex", alignItems:"center", gap:"14px", listStyle:"none" }}>
                        <span style={{ fontSize:"26px", flexShrink:0 }}>{s.emoji}</span>
                        <div style={{ flex:1 }}>
                          <div style={{ color:"#f0ebe2", fontSize:"15px", fontWeight:"500", fontFamily:"'Cormorant Garamond',serif", marginBottom:"3px" }}>{s.name}</div>
                          <div style={{ color:"#8fb893", fontSize:"12px", fontWeight:"500" }}>{s.dose}</div>
                        </div>
                        <span style={{ color:"#9c8e7e", fontSize:"18px", flexShrink:0 }}>+</span>
                      </summary>
                      <div style={{ padding:"0 20px 20px 20px", borderTop:"1px solid rgba(160,140,110,0.12)", paddingTop:"16px" }}>
                        <div style={{ marginBottom:"12px" }}>
                          <div style={{ fontSize:"10px", color:"#8fb893", textTransform:"uppercase", letterSpacing:"2px", fontWeight:"600", marginBottom:"6px" }}>The Science</div>
                          <p style={{ color:"#d8cfc4", fontSize:"13px", lineHeight:1.75, margin:0 }}>{s.science}</p>
                        </div>
                        <div style={{ display:"flex", gap:"12px", flexWrap:"wrap", marginBottom:"12px" }}>
                          <div style={{ flex:1, minWidth:"140px", padding:"10px 14px", borderRadius:"10px", background:"rgba(143,184,147,0.07)", border:"1px solid rgba(143,184,147,0.15)" }}>
                            <div style={{ fontSize:"10px", color:"#8fb893", textTransform:"uppercase", letterSpacing:"1.5px", marginBottom:"4px" }}>⏰ When to Take</div>
                            <div style={{ color:"#d8cfc4", fontSize:"12px", lineHeight:1.6 }}>{s.timing}</div>
                          </div>
                          <div style={{ flex:1, minWidth:"140px", padding:"10px 14px", borderRadius:"10px", background:"rgba(200,160,100,0.06)", border:"1px solid rgba(200,160,100,0.15)" }}>
                            <div style={{ fontSize:"10px", color:"#c4a87e", textTransform:"uppercase", letterSpacing:"1.5px", marginBottom:"4px" }}>⚠️ Caution</div>
                            <div style={{ color:"#d8cfc4", fontSize:"12px", lineHeight:1.6 }}>{s.caution}</div>
                          </div>
                        </div>
                        {s.link && (
                          <a href={s.link} target="_blank" rel="noopener noreferrer" style={{ fontSize:"11px", color:"#8fb893", textDecoration:"none", borderBottom:"1px solid rgba(143,184,147,0.3)" }}>
                            📄 View Research →
                          </a>
                        )}
                      </div>
                    </details>
                  ))}
                  <div style={{ ...S.card, marginTop:"8px", padding:"14px 18px", textAlign:"center" }}>
                    <p style={{ color:"#9c8e7e", fontSize:"12px", margin:0, lineHeight:1.7 }}>
                      🔬 All supplement suggestions are linked to peer-reviewed research. NeuroThrive does not sell supplements or receive compensation for these recommendations.
                    </p>
                  </div>
                </div>
              );
            })()}
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:"24px", flexWrap:"wrap", gap:"12px" }}>
              <button style={S.btnOutline} onClick={() => setStep(5)}>← Affirmations</button>
              <button style={S.btnAccent} onClick={() => setStep(7)}>Set Meal Reminders →</button>
            </div>
          </div>
        )}

        {/* ─────────── STEP 7: REMINDERS ─────────── */}
        {step === 7 && (
          <div>
            <h2 style={S.sectionTitle}>Meal Reminders</h2>
            <p style={S.sectionSub}>Let NeuroThrive gently remind you when it's time to eat. Especially helpful when focus mode kicks in and hunger goes unnoticed.</p>

            {/* Permission card */}
            <div style={{ ...S.card, marginBottom:"24px", textAlign:"center", padding:"28px 24px" }}>
              <div style={{ fontSize:"40px", marginBottom:"12px" }}>🔔</div>
              {notifPermission === "granted" ? (
                <div>
                  <div style={{ color:"#8fb893", fontSize:"15px", fontWeight:"500", marginBottom:"6px" }}>Notifications enabled ✓</div>
                  <p style={{ color:"#9c8e7e", fontSize:"13px", margin:0 }}>Reminders are active while this tab is open. For persistent reminders, add the app to your home screen.</p>
                </div>
              ) : notifPermission === "denied" ? (
                <div>
                  <div style={{ color:"#c4a87e", fontSize:"15px", fontWeight:"500", marginBottom:"6px" }}>Notifications blocked</div>
                  <p style={{ color:"#9c8e7e", fontSize:"13px", margin:"0 0 14px 0" }}>Please enable notifications for this site in your browser settings, then refresh.</p>
                </div>
              ) : (
                <div>
                  <p style={{ color:"#9c8e7e", fontSize:"14px", lineHeight:1.7, marginBottom:"18px" }}>Enable browser notifications so NeuroThrive can remind you to eat at the times you choose. You can turn this off anytime.</p>
                  <button onClick={requestNotifPermission} style={{ background:"linear-gradient(135deg,#7a9e7e,#5a7d5e)", color:"#fff", border:"none", padding:"12px 28px", borderRadius:"50px", fontSize:"14px", fontWeight:"600", cursor:"pointer", boxShadow:"0 4px 16px rgba(90,125,94,0.3)" }}>
                    Enable Notifications
                  </button>
                </div>
              )}
            </div>

            {/* Reminder time pickers */}
            <div style={{ marginBottom:"20px" }}>
              {[
                { key:"breakfast", label:"Breakfast", emoji:"🌅" },
                { key:"lunch", label:"Lunch", emoji:"☀️" },
                { key:"snack", label:"Afternoon Snack", emoji:"🍎" },
                { key:"dinner", label:"Dinner", emoji:"🌙" },
              ].map(({ key, label, emoji }) => (
                <div key={key} style={{ ...S.card, display:"flex", alignItems:"center", gap:"14px", padding:"16px 20px", marginBottom:"10px" }}>
                  <span style={{ fontSize:"22px" }}>{emoji}</span>
                  <div style={{ flex:1 }}>
                    <div style={{ color:"#f0ebe2", fontSize:"14px", fontWeight:"500", marginBottom:"4px" }}>{label}</div>
                    <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
                      <input
                        type="time"
                        value={reminderTimes[key]}
                        onChange={e => setReminderTimes(prev => ({ ...prev, [key]: e.target.value }))}
                        style={{ background:"rgba(255,248,235,0.08)", border:"1px solid rgba(160,140,110,0.25)", borderRadius:"10px", color:"#f0ebe2", padding:"8px 12px", fontSize:"15px", fontFamily:"'Jost',sans-serif", cursor:"pointer", outline:"none", minWidth:"110px" }}
                      />
                      <span style={{ color:"#9c8e7e", fontSize:"11px" }}>tap to change</span>
                    </div>
                  </div>
                  <div
                    onClick={() => setReminderActive(prev => ({ ...prev, [key]: !prev[key] }))}
                    style={{ width:"44px", height:"24px", borderRadius:"12px", background: reminderActive[key] ? "#7a9e7e" : "rgba(160,140,110,0.2)", cursor:"pointer", position:"relative", transition:"background 0.2s", flexShrink:0 }}
                  >
                    <div style={{ position:"absolute", top:"3px", left: reminderActive[key] ? "22px" : "3px", width:"18px", height:"18px", borderRadius:"50%", background:"#fff", transition:"left 0.2s", boxShadow:"0 1px 4px rgba(0,0,0,0.2)" }} />
                  </div>
                </div>
              ))}
            </div>

            {/* ADHD tip */}
            <div style={{ background:"rgba(143,184,147,0.07)", border:"1px solid rgba(143,184,147,0.18)", borderRadius:"14px", padding:"14px 18px", marginBottom:"24px" }}>
              <div style={{ fontSize:"11px", color:"#8fb893", textTransform:"uppercase", letterSpacing:"2px", fontWeight:"600", marginBottom:"6px" }}>🧠 ADHD Tip</div>
              <p style={{ color:"#9c8e7e", fontSize:"13px", lineHeight:1.7, margin:0 }}>
                Time blindness is real. Many people with ADHD don't feel hunger cues until they're well past the point of low blood sugar — which worsens focus and mood. Gentle meal reminders are a simple, effective accommodation.
              </p>
            </div>

            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"12px" }}>
              <button style={S.btnOutline} onClick={() => setStep(6)}>← Supplements</button>
              <div style={{ display:"flex", alignItems:"center", gap:"12px" }}>
                {reminderSaved && <span style={{ color:"#8fb893", fontSize:"13px", fontWeight:"500" }}>✓ Reminders saved!</span>}
                <button style={S.btnAccent} onClick={saveReminders}>Save Reminders ✓</button>
              </div>
            </div>
          </div>
        )}

    </div>
  );
}
