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
  'corona virus is serious and kills',
  'if you go on typing you will win prizes surprises and many more things that can be won just do what you gotta do',
  'this sentence should take you less than a minute to type keep typing to improve your typing speed'
]

export const configItems = [
  {
    Icon: Settings,
    title: 'LEVEL',
    color: '#42A7DF',
    options: [
      {
        values: ['Normal', {id: '1', label: 'Level 1'},  {id: '2', label: 'Level 2'}]
      },
      {
        values: ['Advanced',  {id: '3', label: 'Level 3'}]
      }
    ]
  },
  {
    Icon: Speed,
    title: 'WORD APPEARING RATE',
    color: '#7DB700',
    disabled: true,
    options: [
      {
        values: [
          'Slow and Avarage Pace',
          {id: '1', label: '1 word/sec'},
          {id: '2', label: '2 words/sec'}
        ]
      },
      {
        values: ['Fast',  {id: '3', label: '3 words/sec'}]
      }
    ]
  },
  {
    Icon: ListAlt,
    title: 'STACK SPACE LENGTH',
    color: '#8F63D7',
    disabled: true,
    options: [
      {
        values: [
          'Few Words',
          {id: '1', label: '20 Words'},
          {id: '2', label: '30 Words'}
        ]
      },
      {
        values: ['Many Words',  {id: '3', label: '40 Words'}]
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
