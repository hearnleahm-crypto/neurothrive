import { useState, useEffect, useRef } from "react";

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
    { name: "Ground Beef Breakfast Bowl with Cherries & Orange Slices", tags: ["meat"], conditions: ["adhd","default"] },
    { name: "Chicken Sausage with Sliced Nectarine & Mixed Berries", tags: ["meat"], conditions: ["adhd","default"] },
    { name: "Turkey Patties with Sliced Kiwi, Mango & Pineapple Bowl", tags: ["meat"], conditions: ["adhd","default"] },
    { name: "Sirloin Strips with Watermelon, Mint & Lime Side", tags: ["meat"], conditions: ["adhd","default"] },
    { name: "Chicken Thigh with Grilled Pineapple & Coconut Flakes", tags: ["meat"], conditions: ["adhd","default"] },
    { name: "Ground Turkey with Papaya, Lime & Blueberry Bowl", tags: ["meat"], conditions: ["adhd","default"] },
    { name: "Steak & Veggie Hash with Fresh Peach & Raspberry Side", tags: ["meat"], conditions: ["adhd","default"] },
    { name: "Chicken Sausage with Sliced Plum & Honeydew Melon", tags: ["meat"], conditions: ["adhd","default"] },
    { name: "Turkey Sauté with Strawberry, Banana & Sunflower Seeds", tags: ["meat"], conditions: ["adhd","default"] },
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
    { name: "Spinach & Mushroom Omelette with Toast", tags: ["egg","gluten"], conditions: ["depression","default"] },
    { name: "Whole Grain Pancakes with Fresh Berries", tags: ["egg","gluten","dairy"], conditions: ["depression","default"] },
    { name: "Greek Yogurt Bowl with Granola & Banana", tags: ["dairy","gluten"], conditions: ["depression","anxiety","default"] },
    { name: "Oatmeal with Sliced Banana & Chia Seeds", tags: ["gluten"], conditions: ["depression","bipolar","default"] },
    { name: "Veggie Omelette with Whole Grain Toast & OJ", tags: ["egg","gluten"], conditions: ["depression","schizophrenia","default"] },
    { name: "Turkey & Veggie Breakfast Skillet", tags: ["meat"], conditions: ["depression","default"] },
    { name: "Chicken Sausage with Roasted Peppers & Zucchini", tags: ["meat"], conditions: ["depression","default"] },
    { name: "Lentil & Veggie Breakfast Bowl", tags: [], conditions: ["depression","anxiety","default"] },
    { name: "Oatmeal with Flaxseed, Berries & Honey", tags: ["gluten"], conditions: ["bipolar","default"] },
    { name: "Scrambled Eggs & Whole Grain Toast with Sliced Banana", tags: ["egg","gluten"], conditions: ["bipolar","default"] },
    { name: "Smoothie Bowl with Spinach, Mango & Granola", tags: ["gluten"], conditions: ["bipolar","default"] },
    { name: "Whole Grain Toast with Avocado & Poached Egg", tags: ["egg","gluten"], conditions: ["bipolar","default"] },
    { name: "Banana Oat Pancakes with Maple Syrup & Blueberries", tags: ["egg","gluten","dairy"], conditions: ["bipolar","bpd","default"] },
    { name: "Overnight Oats with Chia, Banana & Almond Milk", tags: ["gluten","nuts"], conditions: ["bipolar","default"] },
    { name: "Quinoa Porridge with Berries & Honey", tags: [], conditions: ["bipolar","default"] },
    { name: "Turkey Sausage with Roasted Sweet Potato Hash", tags: ["meat"], conditions: ["bipolar","default"] },
    { name: "Chia Seed Pudding with Mango & Coconut", tags: [], conditions: ["bipolar","anxiety","default"] },
    { name: "Oatmeal with Walnuts & Blueberries", tags: ["gluten","nuts"], conditions: ["schizophrenia","default"] },
    { name: "Whole Grain Cereal with Milk & Sliced Banana", tags: ["gluten","dairy"], conditions: ["schizophrenia","default"] },
    { name: "Greek Yogurt Parfait with Granola & Berries", tags: ["dairy","gluten"], conditions: ["schizophrenia","ptsd","default"] },
    { name: "Warm Oatmeal with Banana & Honey", tags: ["gluten"], conditions: ["ptsd","did","default"] },
    { name: "Smoothie with Spinach, Banana & Almond Milk", tags: ["nuts"], conditions: ["ptsd","default"] },
    { name: "Whole Grain Toast with Peanut Butter & Sliced Banana", tags: ["gluten","nuts"], conditions: ["ptsd","ocd","default"] },
    { name: "Oatmeal with Cinnamon, Apple & Walnuts", tags: ["gluten","nuts"], conditions: ["ptsd","ocd","default"] },
    { name: "Egg & Cheese Breakfast Burrito", tags: ["egg","dairy","gluten"], conditions: ["did","default"] },
    { name: "Oatmeal with Brown Sugar & Cinnamon", tags: ["gluten"], conditions: ["did","default"] },
    { name: "Smoothie with Banana, Peanut Butter & Oat Milk", tags: ["gluten","nuts"], conditions: ["did","default"] },
    { name: "Overnight Oats with Banana & Almond Butter", tags: ["gluten","nuts"], conditions: ["did","bpd","default"] },
    { name: "Eggs Any Style with Whole Grain Toast & Fruit", tags: ["egg","gluten"], conditions: ["bpd","default"] },
    { name: "Greek Yogurt with Granola & Fresh Berries", tags: ["dairy","gluten"], conditions: ["bpd","anxiety","default"] },
    { name: "Overnight Oats with Chia & Mixed Berries", tags: ["gluten"], conditions: ["bpd","ocd","default"] },
    { name: "Whole Grain Waffles with Sliced Strawberries & Honey", tags: ["egg","gluten","dairy"], conditions: ["bpd","default"] },
    { name: "Whole Grain Toast with Peanut Butter & Banana", tags: ["gluten","nuts"], conditions: ["ocd","default"] },
    { name: "Scrambled Eggs & Avocado on Toast", tags: ["egg","gluten"], conditions: ["ocd","default"] },
    { name: "Greek Yogurt Parfait with Granola & Blueberries", tags: ["dairy","gluten"], conditions: ["ocd","default"] },
    { name: "Overnight Oats with Chia, Berries & Honey", tags: ["gluten"], conditions: ["ocd","default"] },
    { name: "Plain Scrambled Eggs with Toast", tags: ["egg","gluten"], conditions: ["autism","default"] },
    { name: "Smooth Peanut Butter Oatmeal", tags: ["gluten","nuts"], conditions: ["autism","default"] },
    { name: "Banana & Vanilla Yogurt Parfait", tags: ["dairy"], conditions: ["autism","default"] },
    { name: "Oatmeal with Honey & Sliced Banana", tags: ["gluten"], conditions: ["autism","default"] },
    { name: "Pancakes with Maple Syrup & Sliced Banana", tags: ["egg","gluten","dairy"], conditions: ["autism","default"] },
    { name: "Soft Scrambled Eggs with Buttered Toast", tags: ["egg","gluten","dairy"], conditions: ["autism","default"] },
  ],
  lunch: [
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
    { name: "Grilled Chicken & Spinach Salad", tags: ["meat"], conditions: ["anxiety","default"] },
    { name: "Turkey & Veggie Soup with Whole Grain Roll", tags: ["meat","gluten"], conditions: ["anxiety","default"] },
    { name: "Grilled Chicken Wrap with Avocado & Lettuce", tags: ["meat","gluten"], conditions: ["anxiety","default"] },
    { name: "Turkey & Avocado Salad with Lemon Dressing", tags: ["meat"], conditions: ["anxiety","default"] },
    { name: "Chicken & Veggie Soup with Crusty Bread", tags: ["meat","gluten"], conditions: ["anxiety","depression","default"] },
    { name: "Lentil & Roasted Veggie Bowl", tags: [], conditions: ["anxiety","depression","default"] },
    { name: "Chickpea & Spinach Salad with Lemon Tahini", tags: [], conditions: ["anxiety","default"] },
    { name: "Veggie & Black Bean Burrito Bowl", tags: [], conditions: ["anxiety","depression","default"] },
    { name: "Butternut Squash Soup with Crusty Bread", tags: ["gluten"], conditions: ["anxiety","default"] },
    { name: "BLT Wrap with Avocado", tags: ["meat","gluten","dairy"], conditions: ["depression","default"] },
    { name: "Turkey & Avocado Club Sandwich", tags: ["meat","gluten"], conditions: ["depression","ptsd","ocd","default"] },
    { name: "Grilled Chicken Caesar Salad", tags: ["meat","dairy"], conditions: ["depression","ptsd","ocd","default"] },
    { name: "Turkey & Lentil Soup with Whole Grain Roll", tags: ["meat","gluten"], conditions: ["depression","default"] },
    { name: "Roasted Veggie & Quinoa Salad", tags: [], conditions: ["depression","anxiety","default"] },
    { name: "White Bean & Kale Soup", tags: [], conditions: ["depression","default"] },
    { name: "Grilled Chicken & Brown Rice Bowl", tags: ["meat"], conditions: ["bipolar","default"] },
    { name: "Turkey & Cheese Sandwich on Whole Grain Bread", tags: ["meat","gluten","dairy"], conditions: ["bipolar","default"] },
    { name: "Grilled Chicken Salad with Strawberries & Balsamic", tags: ["meat"], conditions: ["bipolar","default"] },
    { name: "Turkey & Veggie Wrap with Side Fruit", tags: ["meat","gluten"], conditions: ["bipolar","default"] },
    { name: "Chicken & Lentil Soup with Crusty Bread", tags: ["meat","gluten"], conditions: ["bipolar","default"] },
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
    { name: "Plain Turkey Sandwich on Whole Grain Bread", tags: ["meat","gluten"], conditions: ["autism","default"] },
    { name: "Buttered Pasta with Mild Chicken", tags: ["meat","gluten","dairy"], conditions: ["autism","default"] },
    { name: "Chicken Nuggets with Plain Rice & Corn", tags: ["meat","corn","gluten"], conditions: ["autism","default"] },
    { name: "Grilled Cheese Sandwich with Plain Chicken Soup", tags: ["meat","gluten","dairy"], conditions: ["autism","default"] },
    { name: "Turkey & Cheese Roll-Up with Apple Slices", tags: ["meat","dairy"], conditions: ["autism","default"] },
    { name: "Plain Pasta with Mild Tomato Sauce & Chicken", tags: ["meat","gluten"], conditions: ["autism","default"] },
  ],
  dinner: [
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
    { name: "Baked Chicken Breast with Roasted Veggies", tags: ["meat"], conditions: ["anxiety","default"] },
    { name: "Lean Ground Turkey Taco Bowls", tags: ["meat"], conditions: ["anxiety","default"] },
    { name: "Grilled Chicken Thighs with Roasted Zucchini & Rice", tags: ["meat"], conditions: ["anxiety","default"] },
    { name: "Lean Ground Beef Stir-Fry with Mixed Veggies & Brown Rice", tags: ["meat"], conditions: ["anxiety","default"] },
    { name: "Oven-Roasted Chicken Breast with Cauliflower Mash", tags: ["meat"], conditions: ["anxiety","default"] },
    { name: "Roasted Veggie & Chickpea Curry with Brown Rice", tags: [], conditions: ["anxiety","depression","default"] },
    { name: "Black Bean & Sweet Potato Tacos", tags: [], conditions: ["anxiety","depression","default"] },
    { name: "Grilled Steak with Roasted Potatoes & Broccoli", tags: ["meat"], conditions: ["depression","bipolar","default"] },
    { name: "Lemon Herb Chicken with Rice Pilaf", tags: ["meat"], conditions: ["depression","default"] },
    { name: "Ground Beef & Vegetable Stew with Crusty Bread", tags: ["meat","gluten"], conditions: ["depression","default"] },
    { name: "Baked Chicken Thighs with Roasted Root Vegetables", tags: ["meat"], conditions: ["depression","schizophrenia","default"] },
    { name: "Lentil Soup with Whole Grain Bread", tags: ["gluten"], conditions: ["depression","anxiety","default"] },
    { name: "Oven-Baked Chicken Thighs with Roasted Root Vegetables", tags: ["meat"], conditions: ["bipolar","default"] },
    { name: "Lean Ground Beef Tacos with Black Beans", tags: ["meat"], conditions: ["bipolar","default"] },
    { name: "Sirloin Steak with Roasted Potatoes & Green Beans", tags: ["meat"], conditions: ["bipolar","bpd","default"] },
    { name: "Baked Chicken Breast with Quinoa & Roasted Zucchini", tags: ["meat"], conditions: ["bipolar","default"] },
    { name: "Ground Turkey Stuffed Bell Peppers with Brown Rice", tags: ["meat"], conditions: ["bipolar","default"] },
    { name: "Chicken & White Bean Stew", tags: ["meat"], conditions: ["bipolar","default"] },
    { name: "Baked Chicken Breast with Roasted Veggies & Brown Rice", tags: ["meat"], conditions: ["schizophrenia","default"] },
    { name: "Lean Beef Stir-Fry with Mixed Veggies & Noodles", tags: ["meat","gluten"], conditions: ["schizophrenia","default"] },
    { name: "Grilled Chicken Thighs with Roasted Sweet Potato", tags: ["meat"], conditions: ["schizophrenia","default"] },
    { name: "Ground Beef Pasta with Marinara & Side Salad", tags: ["meat","gluten"], conditions: ["schizophrenia","default"] },
    { name: "Baked Lemon Herb Chicken with Roasted Potatoes", tags: ["meat"], conditions: ["ptsd","default"] },
    { name: "Grilled Steak & Veggie Skewers with Rice", tags: ["meat"], conditions: ["ptsd","default"] },
    { name: "Baked Chicken Thighs with Roasted Sweet Potato & Broccoli", tags: ["meat"], conditions: ["ptsd","default"] },
    { name: "Lean Beef Tacos with Avocado & Pico de Gallo", tags: ["meat"], conditions: ["ptsd","default"] },
    { name: "Oven-Roasted Chicken with Root Vegetables & Quinoa", tags: ["meat"], conditions: ["ptsd","default"] },
    { name: "Baked Chicken with Mashed Potatoes & Green Beans", tags: ["meat"], conditions: ["did","default"] },
    { name: "Ground Beef Pasta with Marinara Sauce", tags: ["meat","gluten"], conditions: ["did","default"] },
    { name: "Grilled Steak with Mashed Potatoes & Green Beans", tags: ["meat"], conditions: ["did","default"] },
    { name: "Ground Turkey Taco Bowl with Brown Rice & Beans", tags: ["meat"], conditions: ["did","default"] },
    { name: "Baked Chicken Breast with Sweet Potato & Corn", tags: ["meat","corn"], conditions: ["did","default"] },
    { name: "Grilled Steak with Roasted Sweet Potato & Broccoli", tags: ["meat"], conditions: ["bpd","default"] },
    { name: "Baked Chicken Thighs with Garlic Mashed Potatoes", tags: ["meat","dairy"], conditions: ["bpd","default"] },
    { name: "Ground Beef Burrito Bowl with Brown Rice & Avocado", tags: ["meat"], conditions: ["bpd","default"] },
    { name: "Baked Chicken Thighs with Roasted Cauliflower & Wild Rice", tags: ["meat"], conditions: ["bpd","default"] },
    { name: "Oven-Roasted Chicken with Vegetables & Quinoa", tags: ["meat"], conditions: ["ocd","default"] },
    { name: "Lean Beef Stir-Fry with Noodles & Mixed Veggies", tags: ["meat","gluten"], conditions: ["ocd","default"] },
    { name: "Chicken & Veggie Stir-Fry with Brown Rice", tags: ["meat"], conditions: ["ocd","default"] },
    { name: "Grilled Steak with Roasted Potatoes & Asparagus", tags: ["meat"], conditions: ["ocd","default"] },
    { name: "Baked Chicken Thighs with Wild Rice & Broccoli", tags: ["meat"], conditions: ["ocd","default"] },
    { name: "Baked Chicken Tenders with Rice & Corn", tags: ["meat","corn"], conditions: ["autism","default"] },
    { name: "Mild Beef Meatballs with Pasta & Butter", tags: ["meat","gluten","dairy"], conditions: ["autism","default"] },
    { name: "Ground Beef & Noodle Casserole", tags: ["meat","gluten"], conditions: ["autism","default"] },
    { name: "Mild Chicken Stir-Fry with Plain Noodles", tags: ["meat","gluten"], conditions: ["autism","default"] },
    { name: "Baked Chicken Breast with Corn & Mashed Potatoes", tags: ["meat","corn","dairy"], conditions: ["autism","default"] },
    { name: "Grilled Salmon with Asparagus & Quinoa", tags: ["fish"], conditions: ["anxiety","default"] },
    { name: "Baked Salmon with Mashed Sweet Potato & Green Beans", tags: ["fish"], conditions: ["depression","default"] },
    { name: "Pan-Seared Salmon with Quinoa & Roasted Asparagus", tags: ["fish"], conditions: ["depression","ptsd","ocd","default"] },
    { name: "Baked Salmon with Sweet Potato & Green Beans", tags: ["fish"], conditions: ["anxiety","default"] },
    { name: "Grilled Salmon with Brown Rice & Steamed Broccoli", tags: ["fish"], conditions: ["ocd","bipolar","default"] },
    { name: "Lemon Butter Salmon with Rice & Snap Peas", tags: ["fish","dairy"], conditions: ["bpd","default"] },
  ],
  snacks: [
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
    { name: "Celery & Hummus", tags: [], conditions: ["anxiety","default"] },
    { name: "Handful of Cashews & Dried Cranberries", tags: ["nuts"], conditions: ["anxiety","default"] },
    { name: "Greek Yogurt with Honey & Berries", tags: ["dairy"], conditions: ["anxiety","depression","default"] },
    { name: "Chamomile Tea & Whole Grain Crackers", tags: ["gluten"], conditions: ["anxiety","default"] },
    { name: "Kiwi Slices + a Handful of Almonds", tags: ["nuts"], conditions: ["anxiety","default"] },
    { name: "Cucumber Slices & Hummus", tags: [], conditions: ["anxiety","default"] },
    { name: "Rice Cakes with Avocado", tags: [], conditions: ["anxiety","default"] },
    { name: "Coconut Yogurt with Berries", tags: [], conditions: ["anxiety","depression","default"] },
    { name: "Dark Chocolate & Strawberries", tags: [], conditions: ["depression","default"] },
    { name: "Peanut Butter on Whole Grain Crackers", tags: ["gluten","nuts"], conditions: ["depression","default"] },
    { name: "Mango & Mixed Berries", tags: [], conditions: ["depression","default"] },
    { name: "Banana with Walnut Butter", tags: ["nuts"], conditions: ["depression","default"] },
    { name: "Trail Mix with Dark Chocolate Chips", tags: ["nuts"], conditions: ["depression","adhd","default"] },
    { name: "Apple Slices & Almond Butter", tags: ["nuts"], conditions: ["depression","ptsd","default"] },
    { name: "Dates & Pumpkin Seeds", tags: [], conditions: ["depression","default"] },
    { name: "Sliced Pear & Sunflower Seed Butter", tags: [], conditions: ["depression","anxiety","default"] },
    { name: "Roasted Chickpeas", tags: [], conditions: ["depression","anxiety","default"] },
    { name: "Apple & Peanut Butter", tags: ["nuts"], conditions: ["bipolar","default"] },
    { name: "Hummus with Carrot & Cucumber Sticks", tags: [], conditions: ["bipolar","anxiety","default"] },
    { name: "Banana with a Handful of Walnuts", tags: ["nuts"], conditions: ["bipolar","default"] },
    { name: "Greek Yogurt with Mixed Berries", tags: ["dairy"], conditions: ["bipolar","default"] },
    { name: "Apple Slices & Cheese", tags: ["dairy"], conditions: ["bipolar","default"] },
    { name: "Edamame with Sea Salt", tags: ["soy"], conditions: ["bipolar","default"] },
    { name: "Baby Carrots & Guacamole", tags: [], conditions: ["bipolar","anxiety","default"] },
    { name: "Walnuts & Apple Slices", tags: ["nuts"], conditions: ["schizophrenia","default"] },
    { name: "Yogurt with Honey & Granola", tags: ["dairy","gluten"], conditions: ["schizophrenia","default"] },
    { name: "Whole Grain Crackers with Cheese", tags: ["gluten","dairy"], conditions: ["schizophrenia","ocd","default"] },
    { name: "Banana & Peanut Butter", tags: ["nuts"], conditions: ["schizophrenia","did","bpd","ocd","default"] },
    { name: "Mixed Nuts & Dried Fruit", tags: ["nuts"], conditions: ["schizophrenia","bpd","default"] },
    { name: "Orange Slices & Almonds", tags: ["nuts"], conditions: ["schizophrenia","bpd","default"] },
    { name: "Chamomile Tea & Honey with Whole Grain Toast", tags: ["gluten"], conditions: ["ptsd","default"] },
    { name: "Mixed Berries with a Dollop of Yogurt", tags: ["dairy"], conditions: ["ptsd","default"] },
    { name: "Handful of Almonds", tags: ["nuts"], conditions: ["ptsd","default"] },
    { name: "Banana & a Few Walnuts", tags: ["nuts"], conditions: ["ptsd","default"] },
    { name: "Trail Mix with Dried Mango", tags: ["nuts"], conditions: ["ptsd","default"] },
    { name: "Peanut Butter & Jelly on Whole Grain Bread", tags: ["gluten","nuts"], conditions: ["did","default"] },
    { name: "Cheese & Crackers", tags: ["dairy","gluten"], conditions: ["did","default"] },
    { name: "Banana & a Glass of Milk", tags: ["dairy"], conditions: ["did","autism","default"] },
    { name: "Apple Slices & Peanut Butter", tags: ["nuts"], conditions: ["did","autism","ocd","default"] },
    { name: "Greek Yogurt with Honey", tags: ["dairy"], conditions: ["did","bpd","ocd","default"] },
    { name: "Celery & Peanut Butter", tags: ["nuts"], conditions: ["did","bipolar","default"] },
    { name: "Sliced Banana", tags: [], conditions: ["autism","default"] },
    { name: "Plain Crackers with Peanut Butter", tags: ["gluten","nuts"], conditions: ["autism","default"] },
    { name: "Cheese Cubes & Apple Slices", tags: ["dairy"], conditions: ["autism","default"] },
    { name: "Sliced Strawberries", tags: [], conditions: ["autism","default"] },
    { name: "Vanilla Yogurt & Granola", tags: ["dairy","gluten"], conditions: ["autism","default"] },
    { name: "Peeled Orange Slices", tags: [], conditions: ["autism","default"] },
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
  halal: ["pork"],
  kosher: ["pork"],
};

const filterMeals = (meals, selectedDiet, condition) => {
  const excludedTags = new Set();
  selectedDiet.forEach(d => { (DIET_EXCLUSIONS[d] || []).forEach(t => excludedTags.add(t)); });
  const conditionId = condition || "default";
  return meals.filter(m => {
    if (m.tags.some(t => excludedTags.has(t))) return false;
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
  default:     { breakfast: "Banana Oatmeal with Honey & Cinnamon", lunch: "Grilled Chicken & Spinach Salad", dinner: "Baked Chicken Breast with Roasted Veggies", snacks: "Greek Yogurt with Honey & Berries" },
};

const LENTIL_KEYWORDS = ["lentil", "Lentil"];

const build30DayMenu = (condition, selectedDiet) => {
  const breakfastPool = filterMeals(ALL_MEALS.breakfast, selectedDiet, condition);
  const lunchPool = filterMeals(ALL_MEALS.lunch, selectedDiet, condition);
  const dinnerPool = filterMeals(ALL_MEALS.dinner, selectedDiet, condition);
  const snackPool = filterMeals(ALL_MEALS.snacks, selectedDiet, condition);
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
  return Array.from({ length: 30 }, (_, i) => {
    if (i === 0) return { day: 1, breakfast: d1b, lunch: d1l, dinner: d1d, snacks: d1s };
    if (i <= 6)  return { day: i+1, breakfast: breakfastsEarly[i-1], lunch: lunchesEarly[i-1], dinner: dinnersEarly[i-1], snacks: snacksEarly[i-1] };
    return { day: i+1, breakfast: breakfastsLate[i-7], lunch: lunchesLate[i-7], dinner: dinnersLate[i-7], snacks: snacksLate[i-7] };
  });
};

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

const getRecipe = (meal) => {
  const allRecipes = { ...RECIPES, ...RECIPES_EXTENDED };
  if (allRecipes[meal]) return allRecipes[meal];
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
  ],
};

const SUPPLEMENT_CONDITION_MAP = {
  adhd:"adhd", anxiety:"anxiety", depression:"depression", ptsd:"ptsd",
  bipolar_disorder:"bipolar", ocd:"ocd", bipolar_i:"bipolar", bipolar_ii:"bipolar",
  mdd:"depression", gad:"anxiety", social_anxiety:"anxiety", panic_disorder:"anxiety",
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
      bipolar: "multiple RCTs show 2-4g daily EPA+DHA reduces bipolar depressive episodes; salmon is the most bioavailable dietary source",
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
      depression: "niacin ensures tryptophan converts to serotonin rather than neurotoxic kynurenine — a clinically significant pathway in depression",
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

function buildMealExplanation(meal, conditionId) {
  const condLabel = MENTAL_CONDITIONS.find(c => c.id === conditionId)?.label || "general wellness";
  const ingredients = parseIngredients(meal);

  // Condition-specific intros explaining WHY this meal for THIS condition
  const intros = {
    adhd:          `This is a great meal for ADHD because it directly targets the dopamine and norepinephrine systems that ADHD affects most. Every ingredient was chosen to provide steady brain energy, neurotransmitter precursors, and the nutrients that focus and impulse control depend on.`,
    anxiety:       `This is a great meal for Anxiety because each ingredient works to calm the nervous system from the inside out — lowering cortisol, supporting GABA production, and reducing the neuroinflammation that keeps the brain in a heightened threat state.`,
    depression:    `This is a great meal for Depression because it delivers the specific nutrients — serotonin precursors, B vitamins, anti-inflammatory compounds, and BDNF boosters — that depression depletes and that antidepressant treatment depends on.`,
    bipolar:       `This is a great meal for Bipolar Disorder because it stabilizes blood glucose (a key trigger for mood cycling), provides omega-3s and magnesium for neurological stability, and delivers the neurotransmitter precursors both mood phases require.`,
    schizophrenia: `This is a great meal for Schizophrenia because it targets the dopamine pathway regulation, oxidative stress, and neuroinflammation that are the three most documented neurological features of schizophrenia — through whole food sources your body can use directly.`,
    autism:        `This is a great meal for Autism Spectrum because it supports the gut-brain axis (where much of the serotonin relevant to autism is produced), provides B6 for neurotransmitter synthesis, and delivers omega-3s for brain cell membrane health — all in sensory-friendly forms.`,
    ptsd:          `This is a great meal for PTSD because it works to lower the chronically elevated cortisol baseline, rebuild the serotonin and dopamine that trauma depletes, and support the hippocampal repair that PTSD's physical effects on the brain require.`,
    did:           `This is a great meal for DID because it provides stable, consistent brain fuel that supports grounding and prevents the blood sugar swings that can increase dissociation and destabilize the system's sense of internal consistency.`,
    bpd:           `This is a great meal for Borderline Personality Disorder because it stabilizes blood sugar — one of the most accessible and direct dietary tools for reducing emotional reactivity — while delivering serotonin precursors and magnesium that support the calm the nervous system needs.`,
    npd:           `This is a great meal for general brain health because it delivers complete protein, anti-inflammatory compounds, and B vitamins that support healthy dopamine regulation, stress resilience, and cognitive function.`,
    hpd:           `This is a great meal for general brain health because its combination of protein, complex carbohydrates, and micronutrients supports steady neurotransmitter production, emotional regulation, and consistent brain energy.`,
    aspd:          `This is a great meal for general brain health because it provides the amino acids, B vitamins, and anti-inflammatory nutrients that support healthy prefrontal cortex function and impulse regulation.`,
    ocd:           `This is a great meal for OCD because it feeds the serotonin pathway directly — OCD is fundamentally a serotonin-dysregulation disorder, and the tryptophan, folate, and B vitamins in this meal are the exact building blocks serotonin synthesis requires.`,
    eating:        `This is a nourishing, balanced meal that provides complete nutrition — protein for muscle and brain repair, complex carbohydrates for steady energy, and micronutrients that support mood stability and reduce the anxiety that often accompanies eating disorder recovery.`,
    phobia:        `This is a great meal for managing Phobias and anxiety because it supports GABA production and cortisol regulation — the two neurological levers most directly involved in the physiological fear response that phobias trigger.`,
    bfrb:          `This is a great meal for Body-Focused Repetitive Behaviors because it delivers magnesium and B vitamins that reduce the nervous system hyperarousal and anxiety that BFRB urges are often driven by.`,
    ppd:           `This is a great meal for general brain health because its anti-inflammatory nutrients, B vitamins, and complete protein support the neurochemical balance and stress regulation that support clearer, calmer thinking.`,
    spd:           `This is a great meal for general brain health because it delivers omega-3s, B vitamins, and complete protein that support dopamine regulation and the social motivation circuits that schizoid personality affects.`,
    default:       `This meal was specifically chosen for your mental health plan because each ingredient delivers targeted nutrients — neurotransmitter precursors, anti-inflammatory compounds, and brain-essential vitamins and minerals — that support your neurological wellbeing.`,
  };

  const intro = intros[conditionId] || intros.default;

  if (ingredients.length === 0) {
    return `${intro}\n\nEvery food on this plan was chosen with your neurological needs in mind — you're nourishing yourself with intention.`;
  }

  const bullets = ingredients.map(key => {
    const data = INGREDIENT_SCIENCE[key];
    if (!data) return null;
    const condNote = data.conditions[conditionId] || data.conditions["default"] || data.what_it_does;
    const name = key === "sweetpotato" ? "Sweet potato"
      : key === "brownrice" ? "Brown rice"
      : key === "chiaseeds" ? "Chia seeds"
      : key === "hempseeds" ? "Hemp seeds"
      : key === "greekyogurt" ? "Greek yogurt"
      : key === "darkchocolate" ? "Dark chocolate"
      : key === "peanutbutter" ? "Peanut butter"
      : key.charAt(0).toUpperCase() + key.slice(1);
    return `• ${name}: contains ${data.nutrient}. ${condNote.charAt(0).toUpperCase() + condNote.slice(1)}.`;
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

  return intro + "\n\n" + bullets.join("\n\n") + "\n\n" + (closings[conditionId] || closings.default);
}

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
  const [explainLoading, setExplainLoading] = useState(false);
  const [modalTab, setModalTab] = useState("why");
  const [altMeal, setAltMeal] = useState({});
  const [planCycle, setPlanCycle] = useState(1);
  const [cycleStartDate, setCycleStartDate] = useState(null);
  const [showCycleComplete, setShowCycleComplete] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [remindersEnabled, setRemindersEnabled] = useState(false);
  const [notifPermission, setNotifPermission] = useState("default");
  const [reminderTimes, setReminderTimes] = useState({ breakfast:"08:00", lunch:"12:30", dinner:"18:30", snack:"15:00" });
  const [reminderActive, setReminderActive] = useState({ breakfast:true, lunch:true, dinner:true, snack:false });
  const [reminderSaved, setReminderSaved] = useState(false);

  // Cache for AI explanations — persists in session without re-renders
  const explanationCache = useRef({});

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
      } catch(e) {}
      setDataLoaded(true);
    };
    load();
  }, []);

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

  useEffect(() => {
    if (!cycleStartDate || !menu30) return;
    const start = new Date(cycleStartDate);
    const now = new Date();
    const daysSinceStart = Math.floor((now - start) / (1000 * 60 * 60 * 24));
    if (daysSinceStart >= 30 && !showCycleComplete) setShowCycleComplete(true);
  }, [cycleStartDate, menu30]);

  // ── Build explanation — instant, local, always specific ─────────────────
  const openExplain = (meal, mealType) => {
    const conditionLabel = MENTAL_CONDITIONS.find(c => c.id === (selectedConditions[0] || "default"))?.label || "general wellness";
    const text = buildMealExplanation(meal, selectedConditions[0] || "default");
    setExplainModal({ meal, mealType, conditionLabel });
    setModalTab("why");
    setExplainText(text);
    setExplainLoading(false);
  };

  // ── Open modal on Recipe tab ──────────────────────────────────────────────
  const openRecipe = (meal, mealType) => {
    const conditionLabel = MENTAL_CONDITIONS.find(c => c.id === (selectedConditions[0] || "default"))?.label || "general wellness";
    setExplainModal({ meal, mealType, conditionLabel });
    setModalTab("recipe");
    setExplainText("");
    setExplainLoading(false);
  };

  // ── Switch tab inside open modal ──────────────────────────────────────────
  const handleModalTab = (tab) => {
    setModalTab(tab);
    if (tab === "why" && explainModal) {
      const text = buildMealExplanation(explainModal.meal, selectedConditions[0] || "default");
      setExplainText(text);
    }
  };

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
    const interval = setInterval(() => setAffirmIdx(i => (i+1) % AFFIRMATIONS.length), 8000);
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

  useEffect(() => {
    if ("Notification" in window) setNotifPermission(Notification.permission);
  }, []);

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
  };

  const saveReminders = () => {
    if (remindersEnabled) scheduleReminders();
    setReminderSaved(true);
    setTimeout(() => setReminderSaved(false), 2500);
  };

  const daysElapsed = cycleStartDate
    ? Math.min(30, Math.floor((new Date() - new Date(cycleStartDate)) / (1000 * 60 * 60 * 24)) + 1)
    : 1;

  const getAltMeal = (currentMeal, mealType) => {
    const label = mealType.toLowerCase();
    const typeKey = label.includes("breakfast") ? "breakfast" : label.includes("lunch") ? "lunch" : label.includes("dinner") ? "dinner" : "snacks";
    const condition = selectedConditions[0] || "default";
    const pool = filterMeals(ALL_MEALS[typeKey], selectedDiet, condition).map(m => m.name).filter(n => n !== currentMeal);
    if (pool.length === 0) return;
    const pick = pool[Math.floor(Math.random() * pool.length)];
    setAltMeal(prev => ({ ...prev, [currentMeal]: pick }));
  };

  const saveLog = () => {
    if (!todayMood || !todayEnergy) return;
    const entry = {
      date: new Date().toLocaleDateString("en-US", { weekday:"short", month:"short", day:"numeric" }),
      mood: todayMood, energy: todayEnergy, note: todayNote,
    };
    setLogs(prev => [entry, ...prev]);
    setTodayMood(null); setTodayEnergy(null); setTodayNote("");
    setLogSaved(true); setTimeout(() => setLogSaved(false), 3000);
  };

  const nextAffirm = () => { setAnimating(true); setTimeout(() => { setAffirmIdx(i => (i+1)%AFFIRMATIONS.length); setAnimating(false); }, 300); };
  const prevAffirm = () => { setAnimating(true); setTimeout(() => { setAffirmIdx(i => (i-1+AFFIRMATIONS.length)%AFFIRMATIONS.length); setAnimating(false); }, 300); };

  const weekDays = menu30 ? menu30.slice(selectedWeek*7, selectedWeek*7+7) : [];
  const currentDay = weekDays[selectedDayIdx] || null;
  const globalDayIdx = selectedWeek*7+selectedDayIdx;

  const S = {
    app: { minHeight:"100vh", background:"linear-gradient(160deg,#1c1814 0%,#231f1a 50%,#171310 100%)", fontFamily:"'Jost',system-ui,sans-serif", color:"#f0ebe2" },
    nav: { background:"rgba(22,18,14,0.97)", borderBottom:"1px solid rgba(160,140,110,0.15)", padding:"0 24px", display:"flex", alignItems:"center", justifyContent:"space-between", position:"sticky", top:0, zIndex:100, backdropFilter:"blur(12px)", height:"56px" },
    logo: { fontSize:"17px", fontWeight:"700", color:"#f0ebe2", letterSpacing:"-0.2px", display:"flex", alignItems:"center", gap:"8px" },
    navTabs: { display:"flex", gap:"2px", flexWrap:"wrap" },
    navTab: (a) => ({ padding:"7px 14px", borderRadius:"8px", border:"none", cursor:"pointer", fontSize:"12px", fontWeight:a?"600":"400", background:a?"rgba(143,184,147,0.15)":"transparent", color:a?"#a8c5a0":"#9c8e7e", transition:"all 0.2s", letterSpacing:"0.1px" }),
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
    chip: (sel) => ({ padding:"12px 14px", borderRadius:"14px", border:sel?"1.5px solid #7a9e7e":"1px solid rgba(160,140,110,0.18)", background:sel?"rgba(122,158,126,0.15)":"rgba(255,248,235,0.04)", cursor:"pointer", fontSize:"13px", fontWeight:sel?"600":"400", color:sel?"#a8c5a0":"#9c8e7e", display:"flex", alignItems:"center", gap:"8px", transition:"all 0.15s" }),
    card: { background:"rgba(255,248,235,0.05)", border:"1px solid rgba(160,140,110,0.14)", borderRadius:"16px", padding:"20px", marginBottom:"14px" },
    mealLabel: { fontSize:"10px", textTransform:"uppercase", letterSpacing:"2.5px", color:"#7a9e7e", marginBottom:"10px", fontWeight:"700" },
    tag: { display:"inline-block", padding:"4px 12px", borderRadius:"20px", background:"rgba(122,158,126,0.15)", color:"#a8c5a0", fontSize:"12px", fontWeight:"500", marginRight:"6px", marginBottom:"6px" },
    divider: { height:"1px", background:"rgba(160,140,110,0.12)", margin:"22px 0" },
    moodRow: { display:"flex", gap:"10px", flexWrap:"wrap", marginBottom:"20px" },
    moodBtn: (sel) => ({ flex:1, minWidth:"55px", padding:"12px 6px", borderRadius:"14px", border:sel?"1.5px solid #7a9e7e":"1px solid rgba(160,140,110,0.18)", background:sel?"rgba(122,158,126,0.15)":"rgba(255,248,235,0.04)", cursor:"pointer", textAlign:"center", transition:"all 0.15s", color:sel?"#a8c5a0":"#9c8e7e", fontWeight:sel?"600":"400" }),
    textarea: { width:"100%", background:"rgba(255,248,235,0.05)", border:"1px solid rgba(160,140,110,0.18)", borderRadius:"12px", color:"#f0ebe2", fontFamily:"'Jost',system-ui,sans-serif", fontSize:"14px", padding:"14px", resize:"vertical", minHeight:"80px", outline:"none", boxSizing:"border-box", marginBottom:"16px" },
    affirmCard: { textAlign:"center", padding:"56px 36px", background:"rgba(143,184,147,0.07)", border:"1px solid rgba(143,184,147,0.18)", borderRadius:"24px", marginBottom:"20px", position:"relative", overflow:"hidden" },
    successBanner: { background:"rgba(80,180,120,0.12)", border:"1px solid rgba(80,180,120,0.25)", borderRadius:"12px", padding:"12px 18px", color:"#7ab87e", fontSize:"13px", fontWeight:"600", textAlign:"center", marginBottom:"16px" },
    dot: (a,d) => ({ width:"6px", height:"6px", borderRadius:"50%", background:a?"#7a9e7e":d?"rgba(122,158,126,0.4)":"rgba(160,140,110,0.2)", transition:"all 0.3s" }),
    warningBanner: { background:"rgba(143,184,147,0.07)", border:"1px solid rgba(143,184,147,0.18)", borderRadius:"12px", padding:"12px 18px", color:"#a8c5a0", fontSize:"13px", fontWeight:"500", marginBottom:"18px" },
  };

  const STEPS = ["Welcome","Conditions","Diet","Menu","Journal","Affirmations","Supplements","Reminders"];

  const mealActionBtn = (onClick, color, text) => ({
    style: { flex:1, padding:"9px 10px", borderRadius:"10px", border:`1.5px solid ${color}33`, background:`${color}11`, color, fontSize:"12px", fontWeight:"600", cursor:"pointer", transition:"all 0.15s", whiteSpace:"nowrap" },
    onClick,
  });

  return (
    <div style={S.app}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Jost:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; background: #1c1814; }
        * { -webkit-font-smoothing: antialiased; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        @keyframes pulse { 0%,100% { opacity:0.6; } 50% { opacity:1; } }
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
          {step > 0 && STEPS.slice(1).map((s, i) => (
            <button key={s} style={S.navTab(step===i+1)} onClick={() => setStep(i+1)}>{s}</button>
          ))}
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
            <h1 style={S.heroTitle}>Eat for your<br/><span style={S.heroAccent}>mind.</span></h1>
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
              <p style={{ color:"#8fb893", fontSize:"14px", marginBottom:"28px", fontStyle:"italic" }}>Your new Cycle {planCycle+1} menu is ready — fresh meals, same personalisation.</p>
              <div style={{ display:"flex", gap:"12px", justifyContent:"center", flexWrap:"wrap" }}>
                <button onClick={startNewCycle} style={{ background:"linear-gradient(135deg,#7a9e7e,#5a7d5e)", color:"#fff", border:"none", padding:"14px 28px", borderRadius:"50px", fontSize:"14px", fontWeight:"600", cursor:"pointer" }}>Start Cycle {planCycle+1} 🌱</button>
                <button onClick={() => setShowCycleComplete(false)} style={{ background:"transparent", color:"#9c8e7e", border:"1px solid rgba(160,140,110,0.3)", padding:"14px 24px", borderRadius:"50px", fontSize:"14px", cursor:"pointer" }}>Stay on This Menu</button>
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
                  <span style={{ background:"rgba(143,184,147,0.15)", border:"1px solid rgba(143,184,147,0.3)", color:"#8fb893", fontSize:"11px", fontWeight:"600", letterSpacing:"1.5px", padding:"4px 12px", borderRadius:"20px", textTransform:"uppercase" }}>Cycle {planCycle}</span>
                </div>
                <p style={S.sectionSub}>Tap any meal to see why each ingredient is on your plan, or get the recipe.</p>
              </div>
              <button style={S.btnOutline} onClick={startNewCycle}>↺ New Cycle</button>
            </div>

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
                <div style={{ fontSize:"11px", fontWeight:"700", color:"#9c8e7e", letterSpacing:"1px", textTransform:"uppercase", marginBottom:"8px" }}>Active filters</div>
                {selectedDiet.map(d => { const item = DIETARY.find(x=>x.id===d); return <span key={d} style={S.tag}>{item?.emoji} {item?.label}</span>; })}
              </div>
            )}

            {/* Week tabs */}
            <div style={{ display:"flex", gap:"8px", marginBottom:"14px" }}>
              {WEEKS.map((w,i) => (
                <button key={w} onClick={() => { setSelectedWeek(i); setSelectedDayIdx(0); }} style={{ flex:1, padding:"10px 4px", borderRadius:"12px", border:selectedWeek===i?"2px solid #7a9e7e":"1px solid rgba(160,140,110,0.18)", background:selectedWeek===i?"#7a9e7e":"rgba(255,248,235,0.04)", color:selectedWeek===i?"#fff":"#9c8e7e", fontSize:"12px", fontWeight:"700", cursor:"pointer", transition:"all 0.15s" }}>{w}</button>
              ))}
            </div>

            {/* Day tabs */}
            <div style={{ display:"flex", gap:"6px", marginBottom:"20px" }}>
              {weekDays.map((d,i) => (
                <button key={d.day} onClick={() => setSelectedDayIdx(i)} style={{ flex:1, padding:"10px 4px", borderRadius:"12px", border:selectedDayIdx===i?"2px solid #8fb893":"1px solid rgba(160,140,110,0.14)", background:selectedDayIdx===i?"rgba(143,184,147,0.12)":"rgba(255,248,235,0.04)", color:selectedDayIdx===i?"#a8c5a0":"#9c8e7e", fontSize:"11px", fontWeight:selectedDayIdx===i?"700":"500", cursor:"pointer", transition:"all 0.15s", textAlign:"center" }}>
                  <div>{DAY_NAMES[i]}</div>
                  <div style={{ fontSize:"10px", marginTop:"2px", opacity:0.7 }}>Day {d.day}</div>
                </button>
              ))}
            </div>

            {currentDay && (
              <>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"16px" }}>
                  <div style={{ fontSize:"17px", color:"#f0ebe2", fontWeight:"700", letterSpacing:"-0.3px" }}>Day {currentDay.day} <span style={{ color:"#9c8e7e", fontWeight:"400" }}>— {DAY_NAMES[selectedDayIdx]}</span></div>
                  <div style={{ display:"flex", gap:"8px" }}>
                    <button style={S.btnSm} onClick={() => { const prev=globalDayIdx-1; if(prev>=0){setSelectedWeek(Math.floor(prev/7));setSelectedDayIdx(prev%7);} }}>← Prev</button>
                    <button style={S.btnSm} onClick={() => { const next=globalDayIdx+1; if(next<30){setSelectedWeek(Math.floor(next/7));setSelectedDayIdx(next%7);} }}>Next →</button>
                  </div>
                </div>

                {[
                  { key:"breakfast", label:"🌅 Breakfast" },
                  { key:"lunch",     label:"☀️ Lunch" },
                  { key:"dinner",    label:"🌙 Dinner" },
                  { key:"snacks",    label:"🍎 Snack" },
                ].map(({ key, label }) => {
                  const mainMeal = currentDay[key];
                  const alt = altMeal[mainMeal];
                  return (
                    <div key={key} style={S.card}>
                      <div style={S.mealLabel}>{label}</div>

                      {/* Main meal */}
                      <div style={{ display:"flex", alignItems:"flex-start", gap:"10px", marginBottom:"14px" }}>
                        <span style={{ color:"#8fb893", marginTop:"2px", flexShrink:0, fontSize:"8px" }}>●</span>
                        <span style={{ flex:1, color:"#f0ebe2", fontSize:"15px", fontWeight:"600", lineHeight:1.5 }}>{mainMeal}</span>
                      </div>

                      {/* Main meal buttons */}
                      <div style={{ display:"flex", gap:"7px", flexWrap:"wrap", marginBottom: alt ? "12px" : "0" }}>
                        <button
                          style={{ flex:1, padding:"9px 10px", borderRadius:"10px", border:"1px solid rgba(160,140,110,0.2)", background:"rgba(160,140,110,0.07)", color:"#a8c5a0", fontSize:"12px", fontWeight:"600", cursor:"pointer", transition:"all 0.15s" }}
                          onClick={() => openExplain(mainMeal, label)}
                        >🧠 Why this?</button>
                        <button
                          style={{ flex:1, padding:"9px 10px", borderRadius:"10px", border:"1.5px solid rgba(122,158,126,0.3)", background:"rgba(122,158,126,0.07)", color:"#8fb893", fontSize:"12px", fontWeight:"600", cursor:"pointer", transition:"all 0.15s" }}
                          onClick={() => openRecipe(mainMeal, label)}
                        >🍳 Recipe</button>
                        <button
                          style={{ flex:1, padding:"9px 10px", borderRadius:"10px", border:"1.5px solid rgba(160,140,110,0.25)", background:"rgba(160,140,110,0.06)", color:"#c4a882", fontSize:"12px", fontWeight:"600", cursor:"pointer", transition:"all 0.15s" }}
                          onClick={() => getAltMeal(mainMeal, label)}
                        >✨ Swap</button>
                      </div>

                      {/* Alternative meal (if swapped) */}
                      {alt && (
                        <div style={{ marginTop:"4px", padding:"12px 14px", borderRadius:"12px", background:"rgba(122,158,126,0.06)", border:"1px solid rgba(122,158,126,0.18)" }}>
                          <div style={{ color:"#8fb893", fontSize:"10px", fontWeight:"700", letterSpacing:"1.5px", textTransform:"uppercase", marginBottom:"6px" }}>Alternative</div>
                          <div style={{ color:"#f0ebe2", fontSize:"14px", fontWeight:"600", lineHeight:1.4, marginBottom:"10px" }}>{alt}</div>
                          <div style={{ display:"flex", gap:"7px", flexWrap:"wrap" }}>
                            <button
                              style={{ flex:1, padding:"8px 10px", borderRadius:"9px", border:"1px solid rgba(160,140,110,0.2)", background:"rgba(160,140,110,0.07)", color:"#a8c5a0", fontSize:"11px", fontWeight:"600", cursor:"pointer" }}
                              onClick={() => openExplain(alt, label)}
                            >🧠 Why this?</button>
                            <button
                              style={{ flex:1, padding:"8px 10px", borderRadius:"9px", border:"1.5px solid rgba(122,158,126,0.3)", background:"rgba(122,158,126,0.07)", color:"#8fb893", fontSize:"11px", fontWeight:"600", cursor:"pointer" }}
                              onClick={() => openRecipe(alt, label)}
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
              <summary style={{ color:"#9c8e7e", cursor:"pointer", fontSize:"13px", fontWeight:"600", listStyle:"none", display:"flex", alignItems:"center", gap:"6px", padding:"8px 0" }}>
                <span style={{ color:"#8fb893" }}>▸</span> View full week at a glance
              </summary>
              <div style={{ marginTop:"12px", display:"grid", gap:"8px" }}>
                {weekDays.map((day,i) => (
                  <div key={day.day} onClick={() => setSelectedDayIdx(i)} style={{ padding:"14px 16px", borderRadius:"14px", background:selectedDayIdx===i?"rgba(122,158,126,0.1)":"rgba(255,248,235,0.04)", border:selectedDayIdx===i?"1px solid rgba(143,184,147,0.35)":"1px solid rgba(160,140,110,0.12)", cursor:"pointer", transition:"all 0.15s" }}>
                    <div style={{ color:"#8fb893", fontSize:"10px", letterSpacing:"1.5px", textTransform:"uppercase", fontWeight:"700", marginBottom:"6px" }}>Day {day.day} — {DAY_NAMES[i]}</div>
                    <div style={{ color:"#8a9e8a", fontSize:"12px", lineHeight:1.8 }}>🌅 {day.breakfast}<br/>☀️ {day.lunch}<br/>🌙 {day.dinner}</div>
                  </div>
                ))}
              </div>
            </details>

            <details style={{ marginBottom:"24px" }}>
              <summary style={{ color:"#9c8e7e", cursor:"pointer", fontSize:"13px", fontWeight:"600", listStyle:"none", display:"flex", alignItems:"center", gap:"6px", padding:"8px 0" }}>
                <span style={{ color:"#8fb893" }}>▸</span> View all 30 days
              </summary>
              <div style={{ marginTop:"12px", display:"grid", gap:"6px" }}>
                {menu30.map((day,i) => (
                  <div key={day.day} onClick={() => { setSelectedWeek(Math.floor(i/7)); setSelectedDayIdx(i%7); }} style={{ padding:"10px 14px", borderRadius:"12px", background:"rgba(255,248,235,0.04)", border:"1px solid rgba(160,140,110,0.12)", cursor:"pointer", transition:"all 0.15s" }}>
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
              <textarea style={S.textarea} placeholder="How did eating feel today? Any changes you noticed? Be kind to yourself..." value={todayNote} onChange={evt => setTodayNote(evt.target.value)} />
              <button
                style={{ background:(todayMood && todayEnergy)?"linear-gradient(135deg,#7a9e7e,#5a7d5e)":"rgba(160,140,110,0.15)", color:(todayMood && todayEnergy)?"#fff":"#9c8e7e", border:"none", padding:"14px", borderRadius:"50px", fontSize:"14px", fontWeight:"700", cursor:(todayMood && todayEnergy)?"pointer":"default", width:"100%", transition:"all 0.2s" }}
                onClick={saveLog}
              >{(todayMood && todayEnergy) ? "Save Today's Log ✓" : "Select mood & energy to save"}</button>
            </div>
            {logs.length > 0 && (
              <>
                <div style={S.divider} />
                <div style={S.mealLabel}>Past entries</div>
                {logs.map((log, idx) => (
                  <div key={idx} style={{ padding:"16px 18px", borderRadius:"14px", background:"rgba(255,248,235,0.05)", border:"1px solid rgba(160,140,110,0.14)", marginBottom:"10px" }}>
                    <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"6px" }}>
                      <span style={{ color:"#8fb893", fontSize:"13px", fontWeight:"700" }}>{log.date}</span>
                      <span style={{ fontSize:"13px", color:"#9c8e7e" }}>{MOOD_EMOJIS.find(m=>m.val===log.mood)?.emoji} · {ENERGY_EMOJIS.find(e=>e.val===log.energy)?.emoji}</span>
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
                <div key={i} onClick={() => setAffirmIdx(i)} style={{ padding:"16px 20px", borderRadius:"16px", cursor:"pointer", border:affirmIdx===i?"1.5px solid #8fb893":"1px solid rgba(160,140,110,0.14)", background:affirmIdx===i?"rgba(122,158,126,0.1)":"rgba(255,248,235,0.04)", transition:"all 0.15s" }}>
                  <p style={{ margin:0, fontSize:"14px", color:"#d8cfc4", fontStyle:"italic", lineHeight:1.6 }}>"{a.text}"</p>
                </div>
              ))}
            </div>
            <div style={{ textAlign:"center", marginTop:"36px" }}>
              <button style={S.btnOutline} onClick={() => setStep(3)}>← Back to Menu</button>
            </div>
          </div>
        )}

        {/* STEP 6: SUPPLEMENTS */}
        {step === 6 && (
          <div>
            <h2 style={S.sectionTitle}>Supplements</h2>
            <p style={S.sectionSub}>Evidence-based supplements matched to your conditions. Always consult your doctor before starting anything new.</p>
            <div style={{ background:"rgba(200,190,160,0.08)", border:"1px solid rgba(200,190,160,0.2)", borderRadius:"14px", padding:"14px 18px", marginBottom:"24px" }}>
              <div style={{ fontSize:"11px", textTransform:"uppercase", letterSpacing:"2px", color:"#9c8e7e", fontWeight:"600", marginBottom:"6px" }}>⚕️ Wellness Information Only</div>
              <p style={{ color:"#9c8e7e", fontSize:"13px", lineHeight:1.7, margin:0 }}>These suggestions are based on peer-reviewed research and are provided for educational purposes only. They are <strong style={{color:"#d8cfc4"}}>not medical advice</strong> and are not intended to diagnose, treat, or replace any prescribed medication. Always speak with your healthcare provider before starting supplements, especially if you take medication or have a health condition.</p>
            </div>
            {(() => {
              const conditionKey = selectedConditions.length > 0 ? (SUPPLEMENT_CONDITION_MAP[selectedConditions[0]] || "default") : "default";
              const supps = SUPPLEMENTS[conditionKey] || SUPPLEMENTS.default;
              const condLabel = selectedConditions.length > 0 ? MENTAL_CONDITIONS.find(c=>c.id===selectedConditions[0])?.label : null;
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
                          <div style={{ color:"#f0ebe2", fontSize:"15px", fontWeight:"500", marginBottom:"3px" }}>{s.name}</div>
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
                        {s.link && <a href={s.link} target="_blank" rel="noopener noreferrer" style={{ fontSize:"11px", color:"#8fb893", textDecoration:"none", borderBottom:"1px solid rgba(143,184,147,0.3)" }}>📄 View Research →</a>}
                      </div>
                    </details>
                  ))}
                </div>
              );
            })()}
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:"24px", flexWrap:"wrap", gap:"12px" }}>
              <button style={S.btnOutline} onClick={() => setStep(5)}>← Affirmations</button>
              <button style={S.btnAccent} onClick={() => setStep(7)}>Set Meal Reminders →</button>
            </div>
          </div>
        )}

        {/* STEP 7: REMINDERS */}
        {step === 7 && (
          <div>
            <h2 style={S.sectionTitle}>Meal Reminders</h2>
            <p style={S.sectionSub}>Let NeuroThrive gently remind you when it's time to eat. Especially helpful when focus mode kicks in and hunger goes unnoticed.</p>
            <div style={{ ...S.card, marginBottom:"24px", textAlign:"center", padding:"28px 24px" }}>
              <div style={{ fontSize:"40px", marginBottom:"12px" }}>🔔</div>
              {notifPermission === "granted" ? (
                <div>
                  <div style={{ color:"#8fb893", fontSize:"15px", fontWeight:"500", marginBottom:"6px" }}>Notifications enabled ✓</div>
                  <p style={{ color:"#9c8e7e", fontSize:"13px", margin:0 }}>Reminders are active while this tab is open.</p>
                </div>
              ) : notifPermission === "denied" ? (
                <div>
                  <div style={{ color:"#c4a87e", fontSize:"15px", fontWeight:"500", marginBottom:"6px" }}>Notifications blocked</div>
                  <p style={{ color:"#9c8e7e", fontSize:"13px", margin:"0 0 14px 0" }}>Please enable notifications for this site in your browser settings, then refresh.</p>
                </div>
              ) : (
                <div>
                  <p style={{ color:"#9c8e7e", fontSize:"14px", lineHeight:1.7, marginBottom:"18px" }}>Enable browser notifications so NeuroThrive can remind you to eat at the times you choose.</p>
                  <button onClick={requestNotifPermission} style={{ background:"linear-gradient(135deg,#7a9e7e,#5a7d5e)", color:"#fff", border:"none", padding:"12px 28px", borderRadius:"50px", fontSize:"14px", fontWeight:"600", cursor:"pointer" }}>Enable Notifications</button>
                </div>
              )}
            </div>
            <div style={{ marginBottom:"20px" }}>
              {[{ key:"breakfast", label:"Breakfast", emoji:"🌅" },{ key:"lunch", label:"Lunch", emoji:"☀️" },{ key:"snack", label:"Afternoon Snack", emoji:"🍎" },{ key:"dinner", label:"Dinner", emoji:"🌙" }].map(({ key, label, emoji }) => (
                <div key={key} style={{ ...S.card, display:"flex", alignItems:"center", gap:"14px", padding:"16px 20px", marginBottom:"10px" }}>
                  <span style={{ fontSize:"22px" }}>{emoji}</span>
                  <div style={{ flex:1 }}>
                    <div style={{ color:"#f0ebe2", fontSize:"14px", fontWeight:"500", marginBottom:"4px" }}>{label}</div>
                    <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
                      <input type="time" value={reminderTimes[key]} onChange={e => setReminderTimes(prev => ({ ...prev, [key]:e.target.value }))} style={{ background:"rgba(255,248,235,0.08)", border:"1px solid rgba(160,140,110,0.25)", borderRadius:"10px", color:"#f0ebe2", padding:"8px 12px", fontSize:"15px", fontFamily:"'Jost',sans-serif", cursor:"pointer", outline:"none", minWidth:"110px" }} />
                      <span style={{ color:"#9c8e7e", fontSize:"11px" }}>tap to change</span>
                    </div>
                  </div>
                  <div onClick={() => setReminderActive(prev => ({ ...prev, [key]:!prev[key] }))} style={{ width:"44px", height:"24px", borderRadius:"12px", background:reminderActive[key]?"#7a9e7e":"rgba(160,140,110,0.2)", cursor:"pointer", position:"relative", transition:"background 0.2s", flexShrink:0 }}>
                    <div style={{ position:"absolute", top:"3px", left:reminderActive[key]?"22px":"3px", width:"18px", height:"18px", borderRadius:"50%", background:"#fff", transition:"left 0.2s", boxShadow:"0 1px 4px rgba(0,0,0,0.2)" }} />
                  </div>
                </div>
              ))}
            </div>
            <div style={{ background:"rgba(143,184,147,0.07)", border:"1px solid rgba(143,184,147,0.18)", borderRadius:"14px", padding:"14px 18px", marginBottom:"24px" }}>
              <div style={{ fontSize:"11px", color:"#8fb893", textTransform:"uppercase", letterSpacing:"2px", fontWeight:"600", marginBottom:"6px" }}>🧠 ADHD Tip</div>
              <p style={{ color:"#9c8e7e", fontSize:"13px", lineHeight:1.7, margin:0 }}>Time blindness is real. Many people with ADHD don't feel hunger cues until they're well past the point of low blood sugar — which worsens focus and mood. Gentle meal reminders are a simple, effective accommodation.</p>
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

      {/* ── MEAL EXPLANATION + RECIPE MODAL ────────────────────────────────── */}
      {explainModal && (
        <div onClick={() => setExplainModal(null)} style={{ position:"fixed", inset:0, zIndex:1000, background:"rgba(26,26,26,0.65)", backdropFilter:"blur(8px)", display:"flex", alignItems:"center", justifyContent:"center", padding:"20px" }}>
          <div onClick={e => e.stopPropagation()} style={{ background:"linear-gradient(145deg,#1e1a15,#251f18)", borderRadius:"24px", padding:"28px", maxWidth:"560px", width:"100%", maxHeight:"85vh", overflowY:"auto", position:"relative", boxShadow:"0 32px 80px rgba(0,0,0,0.3)" }}>
            <button onClick={() => setExplainModal(null)} style={{ position:"absolute", top:"16px", right:"16px", background:"rgba(255,255,255,0.07)", border:"none", borderRadius:"50%", width:"32px", height:"32px", color:"#a8b8a4", cursor:"pointer", fontSize:"16px", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:"700" }}>×</button>

            <div style={{ display:"inline-block", padding:"4px 12px", borderRadius:"20px", background:"rgba(122,158,126,0.12)", color:"#8fb893", fontSize:"10px", letterSpacing:"2px", textTransform:"uppercase", fontWeight:"700", marginBottom:"10px" }}>{explainModal.mealType}</div>
            <h3 style={{ fontSize:"18px", color:"#f0ebe2", fontWeight:"700", letterSpacing:"-0.3px", marginBottom:"18px", lineHeight:1.3, paddingRight:"32px" }}>{explainModal.meal}</h3>

            {/* Tabs */}
            <div style={{ display:"flex", gap:"8px", marginBottom:"20px" }}>
              <button onClick={() => handleModalTab("why")} style={{ flex:1, padding:"10px", borderRadius:"12px", border:modalTab==="why"?"1.5px solid #8fb893":"1px solid rgba(160,140,110,0.18)", background:modalTab==="why"?"rgba(143,184,147,0.15)":"rgba(255,248,235,0.04)", color:modalTab==="why"?"#a8c5a0":"#9c8e7e", fontSize:"13px", fontWeight:"700", cursor:"pointer", transition:"all 0.15s" }}>🧠 Why This?</button>
              <button onClick={() => handleModalTab("recipe")} style={{ flex:1, padding:"10px", borderRadius:"12px", border:modalTab==="recipe"?"1.5px solid #7a9e7e":"1px solid rgba(160,140,110,0.18)", background:modalTab==="recipe"?"#7a9e7e":"rgba(255,248,235,0.04)", color:modalTab==="recipe"?"#fff":"#9c8e7e", fontSize:"13px", fontWeight:"700", cursor:"pointer", transition:"all 0.15s" }}>🍳 Recipe</button>
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
                    <div style={{ padding:"10px 18px", borderRadius:"12px", background:"rgba(255,248,235,0.06)", border:"1px solid rgba(160,140,110,0.16)", textAlign:"center" }}>
                      <div style={{ fontSize:"10px", color:"#9c8e7e", letterSpacing:"1.5px", textTransform:"uppercase", fontWeight:"700" }}>Serves</div>
                      <div style={{ fontSize:"18px", color:"#f0ebe2", fontWeight:"700", marginTop:"2px" }}>{recipe.serves}</div>
                    </div>
                    <div style={{ padding:"10px 18px", borderRadius:"12px", background:"rgba(255,248,235,0.06)", border:"1px solid rgba(160,140,110,0.16)", textAlign:"center" }}>
                      <div style={{ fontSize:"10px", color:"#9c8e7e", letterSpacing:"1.5px", textTransform:"uppercase", fontWeight:"700" }}>Time</div>
                      <div style={{ fontSize:"18px", color:"#f0ebe2", fontWeight:"700", marginTop:"2px" }}>{recipe.time}</div>
                    </div>
                  </div>
                  <div style={{ marginBottom:"22px" }}>
                    <div style={{ fontSize:"10px", textTransform:"uppercase", letterSpacing:"2px", color:"#8fb893", fontWeight:"700", marginBottom:"12px" }}>Ingredients</div>
                    {recipe.ingredients.map((ing, i) => (
                      <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:"10px", padding:"8px 0", borderBottom:"1px solid rgba(160,140,110,0.1)", color:"#d8cfc4", fontSize:"14px" }}>
                        <span style={{ color:"#8fb893", flexShrink:0, fontWeight:"700" }}>•</span>{ing}
                      </div>
                    ))}
                  </div>
                  <div style={{ marginBottom:"20px" }}>
                    <div style={{ fontSize:"10px", textTransform:"uppercase", letterSpacing:"2px", color:"#8fb893", fontWeight:"700", marginBottom:"12px" }}>Instructions</div>
                    {recipe.steps.map((s, i) => (
                      <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:"12px", marginBottom:"14px" }}>
                        <div style={{ minWidth:"24px", height:"24px", borderRadius:"50%", background:"#7a9e7e", color:"#fff", fontSize:"11px", fontWeight:"800", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:"1px" }}>{i+1}</div>
                        <div style={{ color:"#c8d8c0", fontSize:"14px", lineHeight:1.7 }}>{s}</div>
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
              <button onClick={() => setExplainModal(null)} style={{ background:"#7a9e7e", color:"#fff", border:"none", padding:"11px 28px", borderRadius:"50px", fontSize:"13px", fontWeight:"700", cursor:"pointer" }}>Done ✓</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
