import { spots as rawSpots } from './spots.js'

export const MOODS = [
  { id: 'date',   name: 'Date Night',        big: 'DATE',   accent: '#e85d75', grad: 'linear-gradient(135deg, #ffd4de, #f5a3b5)' },
  { id: 'solo',   name: 'Solo Chill',         big: 'SOLO',   accent: '#4a6fa5', grad: 'linear-gradient(135deg, #d4e2f5, #a8c2e8)' },
  { id: 'budget', name: 'Budget Friendly',    big: 'BUDGET', accent: '#c49a2a', grad: 'linear-gradient(135deg, #faecc0, #efd185)' },
  { id: 'squad',  name: 'Squad Hangout',      big: 'SQUAD',  accent: '#2a9a5a', grad: 'linear-gradient(135deg, #cfedd8, #9ad6b2)' },
  { id: 'insta',  name: 'Instagram Worthy',   big: 'PICS',   accent: '#9a4ac4', grad: 'linear-gradient(135deg, #e4d2f2, #c29ae0)' },
  { id: 'work',   name: 'Get Work Done',      big: 'WORK',   accent: '#2a8aaa', grad: 'linear-gradient(135deg, #cfe4ec, #94c4d5)' },
]

export const BAWA_TIPS = [
  "Chai order karo, jaldi mat karo — baithne mein hi asli maza hai bawa.",
  "Shyamla Hills pe sunset dekhna ho toh 5 baje pahunch jaao. Crowd se pehle.",
  "MP Nagar ke cafes mein weekday morning mein jaao. Weekend pe alag hi duniya hoti hai.",
  "Best cafe woh jisme samose ke saath chai aaye aur waiter rush mein na ho.",
  "Bhopal mein kaam karna ho toh quiet cafe dhundho. Loud music waale se bhaago.",
  "Old Bhopal ki koi bhi chai Arera Colony ke fancy drinks se zyada honest hoti hai.",
  "Arera Colony pe raat ko bhi spots milte hain — bas dhundhna padte hain bawa.",
]

const MOOD_TO_DESIGN = { friends: 'squad', instagram: 'insta' }

export const SPOTS = rawSpots.map(s => {
  const designMoods = s.moods.map(m => MOOD_TO_DESIGN[m] || m)
  return {
    ...s,
    moodId: designMoods[0] || 'date',
    tags: designMoods,
    mustTry: typeof s.mustTry === 'string'
      ? s.mustTry.split(',').map(t => t.trim()).filter(Boolean)
      : (Array.isArray(s.mustTry) ? s.mustTry : ['House special']),
    diet: s.veg ? 'Pure Veg' : 'Veg + Non-Veg',
    bar: 'Ask staff',
    legend: s.moods.includes('legendary'),
  }
})
