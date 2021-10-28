import {
  Settings, Speed, ListAlt, AccessTimeFilledRounded,
  DoneAllRounded, EmojiEventsRounded, Face
} from "@mui/icons-material"

export const keys = [
  {id: 1, label: 'q'},
  {id: 2, label: 'w'},
  {id: 3, label: 'e'},
  {id: 4, label: 'r'},
  {id: 5, label: 't'},
  {id: 6, label: 'y'},
  {id: 7, label: 'u'},
  {id: 8, label: 'i'},
  {id: 9, label: 'o'},
  {id: 10, label: 'p'},
  {id: 11, label: 'a'},
  {id: 12, label: 's'},
  {id: 13, label: 'd'},
  {id: 14, label: 'f'},
  {id: 15, label: 'g'},
  {id: 16, label: 'h'},
  {id: 17, label: 'j'},
  {id: 18, label: 'k'},
  {id: 19, label: 'l'},
  {id: 20, label: 'z'},
  {id: 21, label: 'x'},
  {id: 22, label: 'c'},
  {id: 23, label: 'v'},
  {id: 24, label: 'b'},
  {id: 25, label: 'n'},
  {id: 26, label: 'm'},
  {id: 27, label: ''},
]


export const sentences = [
  { author: 'Ellen DeGeneres',
    quote: 'never follow anyone elses path unless youre in the woods and youre lost and you see a path when by all means follow that path'
  },
  { author: 'Bobby Boucher',
    quote: 'my mama says that alligators are ornery because they got all them teeth and no toothbrush be awesome be a book nut'
  },
  { author: "Dory, ‘Finding Dory.’",
    quote: 'i remember it like it was yesterday of course o dont really remember yesterday all that well he who laughs lasts'
  },
  { author: "Roald Dahl",
    quote: 'so please oh please we beg we pray go throw your tv set away and in its place you can install a lovely bookshelf on the wall all it takes is faith and trust'
  },
  { author: "Erma Bombeck",
    quote: 'have you any idea how many children it takes to turn off one light in the kitchen three tt takes one to say  What light and two more to say i didnt turn it on'
  },
  { author: "Erma Bombeck",
    quote: 'the odds of going to the store for a loaf of bread and coming out with only a loaf of bread are three billion to one even miracles take a little time'
  },
  { author: "Unknown",
    quote: 'preferably the laugh out loud one since as adults we generally dont laugh enough i really thought you already knew mothers words of wisdom answer me dont talk with food in your mouth'
  },
  { author: "Erma Bombeck",
    quote: 'when your mother asks do you want a piece of advice its a mere formality it doesnt matter if you answer yes or no you are going to get it anyway'
  },
  { author: "Phyllis Diller",
    quote: 'cleaning your house while your kids are still growing is like shoveling the sidewalk before it stops snowing the more you give away the more happy you become why fit in when you were born to stand out'
  },
  { author: "Alice Munro",
    quote: 'row row row your boat gently down the stream merrily merrily merrily merrily life is but a dream be kind whenever possible it is always possible the secret of getting ahead is getting started'
  },
  { author: "Art Linkletter",
    quote: 'do a little more than you are paid to give a little more than you have to try a little harder than you want to aim a little higher than you think possible and give a lot of thanks to God for health family and friends'
  },
]

export const configItems = [
  {
    Icon: Settings,
    title: 'LEVEL',
    color: '#42A7DF',
    name: 'level',
    options: [
      {
        values: ['Normal', {id: '1', label: 'Level 1 | Easy Level'},
          {id: '2', label: 'Level 2 | Medium Level'}]
      },
      {
        values: ['Advanced',  {id: '3', label: 'Level 3 | Hard Level'}]
      }
    ]
  },
  {
    Icon: Speed,
    title: 'WORD APPEARING RATE',
    color: '#7DB700',
    readOnly: true,
    name: 'speed',
    options: [
      {
        values: [
          'Slow and Avarage Pace',
          {id: '1', label: '1 word/ 2sec'},
          {id: '2', label: '1 words/sec'}
        ]
      },
      {
        values: ['Fast',  {id: '3', label: '1 words/.1sec'}]
      }
    ]
  },
  {
    Icon: ListAlt,
    title: 'STACK SPACE LENGTH',
    color: '#8F63D7',
    readOnly: true,
    name: 'stack',
    options: [
      {
        values: [
          'Few Words',
          {id: '1', label: '20 Words + 2 bonus words'},
          {id: '2', label: '30 Words + 4 bonus words'}
        ]
      },
      {
        values: ['Many Words',  {id: '3', label: '40 Words + 6 bunus words'}]
      }
    ]
  }
]

export const headers = [
  {
    label: 'About',
    href: '/about'
  },
  {
    label: 'Race',
    href: '/race'
  },
  {
    label: 'Sign Up',
    href: '/signup',
  },
  {
    label: 'Login',
    href: '/login',
  }
]

export const scoreList = [
  {
    Icon: Speed,
    label: 'Your Speed:',
    value: '29 WPM'
  },
  {
    Icon: AccessTimeFilledRounded,
    label: 'Time',
    value: '2:20'
  },
  {
    Icon: DoneAllRounded,
    label: 'Accuracy:',
    value: '98%'
  },
  {
    Icon: EmojiEventsRounded,
    label: 'Points:',
    value: '15'
  }
]

export const scoreColumns = [
  {
    id: 'race',
    label: 'Race',
  },
  {
    id: 'speed',
    align: 'center',
    label: 'Speed\u00a0(WPM)',
  },
  {
    id: 'time',
    label: 'Time',
    align: 'right'
  },
  {
    id: 'accuracy',
    label: 'Accuracy\u00a0(%)',
    align: 'right',
    format: (value) => value.toFixed(1)
  },
  {
    id: 'points',
    label: 'Points',
    align: 'right'
  },
  {
    id: 'when',
    label: 'When',
    align: 'right'
  }
]

export const topScoreColumns = [
  {
    id: 'rank',
    label: '#',
  },
  {
    id: 'name',
    align: 'left',
    label: 'Name',
  },
  {
    id: 'speed',
    align: 'center',
    label: 'Speed\u00a0(WPM)',
  },
  {
    id: 'points',
    label: 'Points',
    align: 'right'
  },
  {
    id: 'when',
    label: 'When',
    align: 'right'
  }
]

export const users = [
  {
    id: 1,
    name: 'John Doe',
    averageSpeed: 67,
    lastRace: 170,
    bestRace: 170,
    points: 50,
    races: 2,
    country: 'Canada',
    avatar: Face,
    experienceLevel: 'intermediate'
  },
  {
    id: 2,
    name: 'Jane Does',
    averageSpeed: 67,
    lastRace: 170,
    bestRace: 170,
    points: 50,
    races: 2,
    country: 'Canada',
    avatar: Face,
    experienceLevel: 'intermediate'
  },
  {
    id: 3,
    name: 'James Smith',
    averageSpeed: 67,
    lastRace: 170,
    bestRace: 170,
    points: 50,
    races: 2,
    country: 'Canada',
    avatar: Face,
    experienceLevel: 'intermediate'
  },
  {
    id: 4,
    name: 'Will Arnold',
    averageSpeed: 67,
    lastRace: 170,
    bestRace: 170,
    points: 50,
    races: 2,
    country: 'Canada',
    avatar: Face,
    experienceLevel: 'intermediate'
  },
  {
    id: 5,
    name: 'Willock Brand',
    averageSpeed: 67,
    lastRace: 170,
    bestRace: 170,
    points: 50,
    races: 2,
    country: 'Canada',
    avatar: Face,
    experienceLevel: 'intermediate'
  },
  {
    id: 6,
    name: 'Diane Scott',
    averageSpeed: 67,
    lastRace: 170,
    bestRace: 170,
    points: 50,
    races: 2,
    country: 'Canada',
    avatar: Face,
    experienceLevel: 'intermediate'
  },
  {
    id: 7,
    name: 'Idris Magales Madragule',
    averageSpeed: 67,
    lastRace: 170,
    bestRace: 170,
    points: 50,
    races: 2,
    country: 'Canada',
    avatar: Face,
    experienceLevel: 'intermediate'
  },
  {
    id: 8,
    name: 'Kawembe Richard',
    averageSpeed: 67,
    lastRace: 170,
    bestRace: 170,
    points: 50,
    races: 2,
    country: 'Canada',
    avatar: Face,
    experienceLevel: 'intermediate'
  },
  {
    id: 9,
    name: 'Sawa Njin',
    averageSpeed: 67,
    lastRace: 170,
    bestRace: 170,
    points: 50,
    races: 2,
    country: 'Canada',
    avatar: Face,
    experienceLevel: 'intermediate'
  },
  {
    id: 10,
    name: 'Evarist Kawaya',
    averageSpeed: 67,
    lastRace: 170,
    bestRace: 170,
    points: 50,
    races: 2,
    country: 'Canada',
    avatar: Face,
    experienceLevel: 'intermediate'
  }
]

const createData = (race, speed, time, accuracy, points, when) => ({
  race, speed, time, accuracy, points, when
})
const topData = (rank, name, speed, points, when) => ({
  rank, name, speed, points, when
})

export const myRecentScores = [
  createData(1, 25, '2:57', 99.4, 20, '1 min ago'),
  createData(2, 20, '2:20', 98, 15, '20 min ago'),
]

export const topScoresRows = [
  topData(1, {name: 'John Doe', avatar: Face}, 170, 89, '50 min ago'),
  topData(2, {name: 'Jane Does', avatar: Face}, 165, 88, '1 hour ago'),
  topData(3, {name: 'James Smith', avatar: Face}, 160, 85, '1 min ago'),
  topData(4, {name: 'Will Arnold', avatar: Face}, 150, 78, '21 min ago'),
  topData(5, {name: 'Willock Brand', avatar: Face}, 130, 70, '2 hours ago'),
  topData(7, {name: 'Diane Scott', avatar: Face}, 129, 68, '5 min ago'),
  topData(8, {name: 'Idris Magales Madragule', avatar: Face}, 128, 66, '7 hours ago'),
  topData(9, {name: 'Kawembe Richard', avatar: Face}, 125, 65, '50 min ago'),
  topData(10, {name: 'Sawa Njin', avatar: Face}, 123, 63, '2 min ago'),
  topData(11, {name: 'Evarist Kawaya', avatar: Face}, 100, 55, '2 days ago'),
]
