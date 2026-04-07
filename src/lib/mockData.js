// ---------------------------------------------------------------------------
// DriveTheApex — Mock Data (F1 2025 season)
// ---------------------------------------------------------------------------

export const MOCK_ARTICLES = [
  {
    id: 1,
    slug: 'verstappen-dominates-bahrain-gp-opening-round',
    title: 'Verstappen Dominates Bahrain GP in Championship-Opening Statement',
    excerpt:
      'Max Verstappen delivered a masterclass performance in Bahrain, leading from pole to flag and setting the tone for what could be another dominant Red Bull season.',
    category: 'Race Report',
    author: 'James Mitchell',
    publishedAt: '2025-03-02T18:30:00Z',
    readTime: 6,
    premium: false,
    heroImage: 'https://picsum.photos/seed/bahrain-gp/1200/675',
    tags: ['Verstappen', 'Red Bull', 'Bahrain GP', 'Race Report'],
  },
  {
    id: 2,
    slug: 'hamilton-mercedes-contract-extension-confirmed',
    title: "Hamilton's Shock Move to Ferrari Sends Shockwaves Through the Paddock",
    excerpt:
      'Seven-time world champion Lewis Hamilton confirmed his bombshell switch to Scuderia Ferrari, ending a hugely successful 12-year partnership with Mercedes.',
    category: 'News',
    author: 'Sofia Reyes',
    publishedAt: '2025-02-14T10:00:00Z',
    readTime: 4,
    premium: false,
    heroImage: 'https://picsum.photos/seed/hamilton-ferrari/1200/675',
    tags: ['Hamilton', 'Ferrari', 'Transfer', 'News'],
  },
  {
    id: 3,
    slug: 'norris-mclaren-2025-title-charge',
    title: "Norris and McLaren: The Title Charge That Has F1 Buzzing",
    excerpt:
      'After a breakthrough 2024 campaign, Lando Norris arrives in 2025 as a genuine championship favourite. We take an in-depth look at whether McLaren can sustain their momentum.',
    category: 'Analysis',
    author: 'Tom Clarke',
    publishedAt: '2025-03-10T09:00:00Z',
    readTime: 9,
    premium: true,
    heroImage: 'https://picsum.photos/seed/norris-mclaren/1200/675',
    tags: ['Norris', 'McLaren', 'Analysis', 'Championship'],
  },
  {
    id: 4,
    slug: 'new-technical-regulations-2026-preview',
    title: '2026 Technical Regulations Explained: Everything You Need to Know',
    excerpt:
      'F1 is on the cusp of its biggest technical overhaul in a generation. Smaller cars, new power units, and active aerodynamics — our engineers break it all down.',
    category: 'Technical',
    author: 'Dr. Elena Vasquez',
    publishedAt: '2025-03-18T14:00:00Z',
    readTime: 12,
    premium: true,
    heroImage: 'https://picsum.photos/seed/f1-tech-2026/1200/675',
    tags: ['Technical', 'Regulations', '2026', 'Power Unit'],
  },
  {
    id: 5,
    slug: 'monaco-gp-preview-2025',
    title: 'Monaco Grand Prix Preview: Can Anyone Tame the Streets of Monte Carlo?',
    excerpt:
      'The jewel in Formula 1\'s crown returns. We preview the contenders, the strategy scenarios, and the unique challenges the Principality throws up every year.',
    category: 'Preview',
    author: 'James Mitchell',
    publishedAt: '2025-05-22T08:00:00Z',
    readTime: 7,
    premium: false,
    heroImage: 'https://picsum.photos/seed/monaco-preview/1200/675',
    tags: ['Monaco', 'Preview', 'Street Circuit', 'Strategy'],
  },
  {
    id: 6,
    slug: 'pirelli-tyre-compounds-silverstone-guide',
    title: 'The Silverstone Tyre Puzzle: Pirelli Breaks Down Compound Selection',
    excerpt:
      'High-speed corners, abrasive tarmac, and unpredictable British weather — Silverstone is one of the hardest circuits on tyres. Pirelli\'s chief engineer walks us through the strategy.',
    category: 'Technical',
    author: 'Dr. Elena Vasquez',
    publishedAt: '2025-07-01T11:00:00Z',
    readTime: 8,
    premium: false,
    heroImage: 'https://picsum.photos/seed/pirelli-silverstone/1200/675',
    tags: ['Tyres', 'Pirelli', 'Silverstone', 'Strategy'],
  },
  {
    id: 7,
    slug: 'leclerc-ferrari-redemption-story',
    title: "Leclerc's Redemption Arc: Why 2025 Feels Different at Ferrari",
    excerpt:
      'Charles Leclerc has come tantalisingly close to the world championship before, only for Ferrari to falter. With a new team-mate in Hamilton and an upgraded car, this could finally be his year.',
    category: 'Feature',
    author: 'Sofia Reyes',
    publishedAt: '2025-03-28T16:00:00Z',
    readTime: 10,
    premium: true,
    heroImage: 'https://picsum.photos/seed/leclerc-ferrari/1200/675',
    tags: ['Leclerc', 'Ferrari', 'Feature', 'Championship'],
  },
  {
    id: 8,
    slug: 'f1-academy-rising-stars-2025',
    title: 'F1 Academy 2025: The Rising Stars Who Could Shape the Future of the Grid',
    excerpt:
      "Formula 1's all-female feeder series enters its third season with more talent and higher stakes than ever. Meet the drivers tipped for the top.",
    category: 'Feature',
    author: 'Amara Osei',
    publishedAt: '2025-04-05T12:00:00Z',
    readTime: 6,
    premium: false,
    heroImage: 'https://picsum.photos/seed/f1-academy-2025/1200/675',
    tags: ['F1 Academy', 'Feature', 'Diversity', 'Junior Series'],
  },
];

// ---------------------------------------------------------------------------

export const MOCK_NEWS = [
  {
    id: 1,
    headline: 'Red Bull Unveils Significant Floor Upgrade for Spanish GP',
    body: 'Red Bull Racing has brought a substantial aerodynamic package to Barcelona, featuring a revised floor edge and updated bargeboard configurations designed to improve downforce efficiency.',
    source: 'Autosport',
    tag: 'Technical',
    publishedAt: '2025-06-01T07:45:00Z',
  },
  {
    id: 2,
    headline: 'Sainz Secures Surprise Pole in Wet Qualifying at Imola',
    body: "Carlos Sainz delivered a stunning lap in treacherous wet conditions to claim pole position at Imola, denying championship leader Verstappen in the dying seconds of Q3.",
    source: 'The Race',
    tag: 'Qualifying',
    publishedAt: '2025-05-17T16:20:00Z',
  },
  {
    id: 3,
    headline: "FIA Clears McLaren's Double-DRS System After Protest",
    body: 'The FIA technical department has ruled McLaren\'s innovative double-DRS deployment system to be within regulations following a protest lodged by rival teams after the Miami Grand Prix.',
    source: 'RaceFans',
    tag: 'Regulations',
    publishedAt: '2025-05-07T11:00:00Z',
  },
  {
    id: 4,
    headline: 'Aston Martin Confirms Alonso Will Race On Into 2026',
    body: 'Fernando Alonso has signed a contract extension with Aston Martin that will keep the two-time world champion on the grid into the 2026 regulation cycle, according to a team statement.',
    source: 'Formula1.com',
    tag: 'Transfer',
    publishedAt: '2025-04-22T09:30:00Z',
  },
  {
    id: 5,
    headline: 'Virtual Safety Car Controversy Clouds Australian GP Result',
    body: 'The deployment of a Virtual Safety Car in the final ten laps of the Australian Grand Prix has been called into question after data suggested the incident had already been cleared from the circuit.',
    source: 'Motorsport.com',
    tag: 'Race',
    publishedAt: '2025-03-24T21:00:00Z',
  },
  {
    id: 6,
    headline: 'Mercedes Targets Podium Consistency With Revised Suspension Concept',
    body: 'Mercedes have overhauled their rear suspension geometry ahead of the European swing, as team principal Toto Wolff admits the W16 has lacked mechanical grip compared to its predecessors.',
    source: 'Sky Sports F1',
    tag: 'Technical',
    publishedAt: '2025-05-29T13:15:00Z',
  },
];

// ---------------------------------------------------------------------------

export const MOCK_VIDEOS = [
  {
    id: 1,
    youtubeId: 'dQw4w9WgXcQ',
    title: 'RACE HIGHLIGHTS: 2025 Bahrain Grand Prix',
    thumbnail: 'https://picsum.photos/seed/video-bahrain/640/360',
    publishedAt: '2025-03-02T21:00:00Z',
    description:
      "Watch all the action from the opening round of the 2025 Formula 1 World Championship at Bahrain International Circuit. Verstappen leads from lights to flag but there's drama behind him.",
  },
  {
    id: 2,
    youtubeId: 'oHg5SJYRHA0',
    title: "TECH EXPLAINER: McLaren's Secret Weapon for 2025",
    thumbnail: 'https://picsum.photos/seed/video-mclaren-tech/640/360',
    publishedAt: '2025-03-14T10:00:00Z',
    description:
      "Our technical team breaks down the key aerodynamic innovations McLaren have brought to the 2025 MCL39. Is this the car that finally topples Verstappen's dominance?",
  },
  {
    id: 3,
    youtubeId: 'StTqXEQ2l-Y',
    title: 'ONBOARD LAP: Hamilton\'s First Flying Lap in the Ferrari SF-25',
    thumbnail: 'https://picsum.photos/seed/video-hamilton-ferrari/640/360',
    publishedAt: '2025-02-19T14:30:00Z',
    description:
      "Exclusive onboard footage of Lewis Hamilton's first flying lap in the Ferrari SF-25 during the Fiorano shakedown. Listen to that engine note.",
  },
];

// ---------------------------------------------------------------------------

export const MOCK_GALLERIES = [
  {
    id: 1,
    slug: 'bahrain-gp-2025-gallery',
    title: '2025 Bahrain Grand Prix — In Pictures',
    coverImage: 'https://picsum.photos/seed/gallery-bahrain-cover/1200/675',
    photoCount: 42,
    publishedAt: '2025-03-03T09:00:00Z',
    photos: [
      { id: 1, url: 'https://picsum.photos/seed/gallery-bah-1/1200/800', caption: 'Verstappen on the formation lap' },
      { id: 2, url: 'https://picsum.photos/seed/gallery-bah-2/1200/800', caption: 'Pit lane atmosphere before the start' },
      { id: 3, url: 'https://picsum.photos/seed/gallery-bah-3/1200/800', caption: 'Hamilton in the new Ferrari livery' },
      { id: 4, url: 'https://picsum.photos/seed/gallery-bah-4/1200/800', caption: 'Norris battles through the midfield' },
      { id: 5, url: 'https://picsum.photos/seed/gallery-bah-5/1200/800', caption: 'The podium celebrations' },
    ],
  },
  {
    id: 2,
    slug: 'f1-car-launches-2025',
    title: '2025 Car Launches — Every Team Revealed',
    coverImage: 'https://picsum.photos/seed/gallery-launches-cover/1200/675',
    photoCount: 28,
    publishedAt: '2025-02-10T12:00:00Z',
    photos: [
      { id: 1, url: 'https://picsum.photos/seed/gallery-launch-1/1200/800', caption: 'Red Bull RB21 reveal in Milton Keynes' },
      { id: 2, url: 'https://picsum.photos/seed/gallery-launch-2/1200/800', caption: "McLaren MCL39 — Papaya and Chrome" },
      { id: 3, url: 'https://picsum.photos/seed/gallery-launch-3/1200/800', caption: 'Ferrari SF-25 with Hamilton and Leclerc' },
      { id: 4, url: 'https://picsum.photos/seed/gallery-launch-4/1200/800', caption: 'Mercedes W16 in the studio' },
      { id: 5, url: 'https://picsum.photos/seed/gallery-launch-5/1200/800', caption: 'Alpine A525 — New era, new look' },
    ],
  },
];

// ---------------------------------------------------------------------------

export const MOCK_RACE_WEEKEND = {
  raceName: 'British Grand Prix',
  circuit: 'Silverstone Circuit',
  country: 'United Kingdom',
  flag: '🇬🇧',
  date: '2025-07-06T14:00:00Z',
  round: 12,
  season: 2025,
  sessions: {
    fp1: '2025-07-04T11:30:00Z',
    fp2: '2025-07-04T15:00:00Z',
    fp3: '2025-07-05T10:30:00Z',
    qualifying: '2025-07-05T14:00:00Z',
    race: '2025-07-06T14:00:00Z',
  },
};

// ---------------------------------------------------------------------------

export const MOCK_STANDINGS = [
  {
    position: 1,
    driver: 'Max Verstappen',
    team: 'Red Bull Racing',
    points: 161,
    wins: 6,
    teamColor: '#3671C6',
  },
  {
    position: 2,
    driver: 'Lando Norris',
    team: 'McLaren',
    points: 148,
    wins: 3,
    teamColor: '#FF8000',
  },
  {
    position: 3,
    driver: 'Charles Leclerc',
    team: 'Ferrari',
    points: 132,
    wins: 2,
    teamColor: '#E8002D',
  },
  {
    position: 4,
    driver: 'Lewis Hamilton',
    team: 'Ferrari',
    points: 115,
    wins: 1,
    teamColor: '#E8002D',
  },
  {
    position: 5,
    driver: 'Carlos Sainz',
    team: 'Williams',
    points: 98,
    wins: 0,
    teamColor: '#64C4FF',
  },
];

// ---------------------------------------------------------------------------

export const MOCK_LAST_PODIUM = [
  {
    position: 1,
    driver: 'Max Verstappen',
    team: 'Red Bull Racing',
    time: '1:32:47.421',
    teamColor: '#3671C6',
  },
  {
    position: 2,
    driver: 'Lando Norris',
    team: 'McLaren',
    time: '+8.734s',
    teamColor: '#FF8000',
  },
  {
    position: 3,
    driver: 'Charles Leclerc',
    team: 'Ferrari',
    time: '+15.219s',
    teamColor: '#E8002D',
  },
];

// ---------------------------------------------------------------------------

export const BREAKING_NEWS_ITEMS = [
  'BREAKING: Verstappen takes pole at Silverstone with new track record',
  'Hamilton admits Ferrari are "not yet at the level" of Red Bull',
  'FIA confirms new cost cap rules will take effect from 2026 season',
  'Norris penalised 5 seconds for unsafe release in Canadian GP pit stop',
  "Mercedes confirms Kimi Antonelli for full 2025 season alongside Russell",
  'Pirelli to trial new 2026 tyre compound at Abu Dhabi test',
  'Aston Martin lodges formal protest against Red Bull floor concept',
  'F1 CEO confirms Las Vegas GP contract extended until 2030',
];
