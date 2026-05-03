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

const TIME_BY_MOOD = {
  breakfast: 'Subah 8-10',
  late_night: 'Raat 10 ke baad',
  rooftop: 'Sunset ke aas-paas',
  scenic: 'Golden hour',
  work: 'Weekday morning',
  study: 'Weekday morning',
  legendary: 'Subah ya early evening',
  date: 'Evening',
  solo: 'Late afternoon',
  budget: 'Anytime',
}

const AVOID_BY_MOOD = {
  breakfast: 'Late mat jaana, best cheezein khatam ho sakti hain.',
  late_night: 'Weekend rush mein backup rakho.',
  rooftop: 'Dhoop tez ho toh skip karo.',
  scenic: 'Dark ke baad view ka charm kam ho jaata hai.',
  work: 'Peak lunch hours mein focus mushkil ho sakta hai.',
  legendary: 'Sunday family rush mein patience leke jaana.',
  date: 'Too-loud group hours avoid karo.',
  budget: 'Cash/change rakhna smart rahega.',
}

const PERFECT_FOR = {
  date: 'low-pressure date',
  solo: 'solo reset',
  budget: 'paisa-vasool hangout',
  squad: 'group plan',
  insta: 'photo-worthy outing',
  work: 'focused cafe session',
}

const getFirstMatch = (tags, map, fallback) => {
  const key = tags.find(t => map[t])
  return key ? map[key] : fallback
}

export const SPOTS = rawSpots.map(s => {
  const designMoods = s.moods.map(m => MOOD_TO_DESIGN[m] || m)
  const mainMood = designMoods[0] || 'date'
  const signatureOrder = typeof s.mustTry === 'string'
    ? s.mustTry.split(',').map(t => t.trim()).filter(Boolean)[0]
    : (Array.isArray(s.mustTry) ? s.mustTry[0] : 'House special')
  const bestTime = getFirstMatch(designMoods, TIME_BY_MOOD, s.hours?.includes('12AM') ? 'Late evening' : 'Evening')
  const avoidWhen = getFirstMatch(designMoods, AVOID_BY_MOOD, 'Weekend peak pe bheed ho sakti hai.')
  const perfectFor = getFirstMatch(designMoods, PERFECT_FOR, 'easy Bhopal plan')
  return {
    ...s,
    moodId: mainMood,
    tags: designMoods,
    mustTry: typeof s.mustTry === 'string'
      ? s.mustTry.split(',').map(t => t.trim()).filter(Boolean)
      : (Array.isArray(s.mustTry) ? s.mustTry : ['House special']),
    diet: s.veg ? 'Pure Veg' : 'Veg + Non-Veg',
    bar: 'Ask staff',
    legend: s.moods.includes('legendary'),
    bestTime,
    avoidWhen,
    perfectFor,
    signatureOrder,
    insiderTip: `${bestTime} jao, ${signatureOrder} order karo, aur jaldi mat nikalna.`,
    shareLine: `${s.name} for ${perfectFor} in ${s.area}. Bawa-approved.`,
    planScore: Math.round((s.rating * 18) + Math.min(s.reviews || 0, 1200) / 80 + (s.moods.includes('legendary') ? 7 : 0)),
  }
})
