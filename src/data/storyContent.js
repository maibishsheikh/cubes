// src/data/storyContent.js
// 4 Widescreen Story Panels for CubeQuest (Dev & Xin Yi's Cube Craft Co.)

export const STORY_PANELS = [
  {
    panel: 0,
    title: "A Cube-Shaped Order 📦",
    text: "Dev and Xin Yi opened the workshop doors at Cube Craft Co. with their mascot, Bo the Beaver. A new client contract had just arrived: a precision batch of gaming dice! But there was a twist: the client only specified the space each die must take up — a volume of 216 cm³. \"How do we cut each block if we don't know the edge length?\" Dev asked, scratching his pencil behind his ear. Bo tapped the wooden workbench excitedly.",
    highlight: "🧊 Target volume = 216 cm³ · How do we find the unknown edge length?",
    character: "Dev & Bo",
    characterEmoji: "🧑🏽‍🔧",
    imageBg: "radial-gradient(circle, #38bdf8 0%, #0369a1 100%)",
    imageEmoji: "🎲",
  },
  {
    panel: 1,
    title: "Every Side the Same 📐",
    text: "Xin Yi rolled out fresh blueprint paper. \"A cube is special! Unlike other boxes where length, width, and height are all different, every edge of a cube is identical!\" She sketched a clean 3D cube. \"Volume is edge × edge × edge. If an edge were 6 cm, the volume would be 6 × 6 × 6 = 216 cm³. And each of its six faces is a square with area equal to edge × edge = 36 cm². When you know one edge, you know the entire cube!\"",
    highlight: "📐 Cube has only 1 unknown edge · Volume = edge³ · Face Area = edge²",
    character: "Xin Yi",
    characterEmoji: "👧🏻‍🔧",
    imageBg: "radial-gradient(circle, #f472b6 0%, #be185d 100%)",
    imageEmoji: "🧊",
  },
  {
    panel: 2,
    title: "Roots at the Workbench 🔍",
    text: "Dev brought out the workshop formula guide. \"So how do we work backward from the client's order? We use roots!\" Dev explained. \"To find the edge from a face area, we take the square root: √36 = 6 cm. To find the edge from the total volume, we take the cube root: ∛216 = 6 cm! The square root undoes two matching factors; the cube root undoes three matching factors! Both tools give us the exact 6 cm edge we need to craft the dice!\"",
    highlight: "🔍 Face Area = 36 cm² ➔ √36 = 6 cm · Volume = 216 cm³ ➔ ∛216 = 6 cm",
    character: "Dev",
    characterEmoji: "🧑🏽‍🔧",
    imageBg: "radial-gradient(circle, #fb923c 0%, #c2410c 100%)",
    imageEmoji: "🔧",
  },
  {
    panel: 3,
    title: "Filling the Tank 🐠",
    text: "For their grand opening centerpiece, the workshop crafted a crystal-clear cube aquarium with an edge of 30 cm. \"Let's calculate how much water it holds,\" Xin Yi suggested. The volume was 30 × 30 × 30 = 27,000 cm³. Bo pointed to the liquid capacity gauge: 1 litre = 1,000 cm³. Dividing 27,000 cm³ by 1,000 gave exactly 27 litres! The water poured in smoothly, and Cube Craft Co. officially opened for business!",
    highlight: "🐠 Edge = 30 cm · Volume = 27,000 cm³ · 27,000 ÷ 1,000 = 27 Litres! 🏆",
    character: "Dev, Xin Yi & Bo",
    characterEmoji: "🌟",
    imageBg: "radial-gradient(circle, #34d399 0%, #047857 100%)",
    imageEmoji: "🌊",
  },
];
