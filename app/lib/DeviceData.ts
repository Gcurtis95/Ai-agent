
// Hardcoded data representing user device information

type UserProfile = {
  name: string;
  age: number;
  gender: string;
  profession: string;
  email: string;
  location: {
    home: { city: string; country: string; coordinates: { latitude: number; longitude: number } };
    work: { city: string; country: string; coordinates: { latitude: number; longitude: number } };
  };
  previous_notifications: { date: string; time: string; message: string }[];
  app_usage: {
    most_used_apps: { name: string; usage_time: string }[];
    last_opened_app: string;
    screen_time: string;
  };
  contacts: { name: string; phone: string; email: string }[];
  purchases: { item: string; date: string; price: string; store: string }[];
  fitness_data: {
    steps_today: number;
    last_workout: { type: string; distance_km: number; felt: string };
    sleep: { last_night: string; quality: string };
  };
};

type SocialMedia = {
  twitter: {
    handle: string;
    recent_posts: string[];
    followers_count: number;
    following_count: number;
  };
};

type SpotifyPlaylists = {
  playlists: { name: string; tracks: string[] }[];
};

type CalendarEntry = {
  date: string; 
  time: string; 
  event: string;
  duration_hours: number;
  location: string;
};

type LocationEntry = {
  timestamp: string; 
  latitude: string;
  longitude: string;
  location: string;
};

// user_profile.json
export const userProfile: UserProfile = {
  "name": "Dan",
  "age": 31,
  "gender": "male",
  "profession": "software engineer",
  "email": "dan.clarke.dev@gmail.com",
  "location": {
    "home": {
      "city": "London",
      "country": "United Kingdom",
      "coordinates": {
        "latitude": 51.5074,
        "longitude": -0.1278
      }
    },
    "work": {
      "city": "London",
      "country": "United Kingdom",
      "coordinates": {
        "latitude": 51.5144,
        "longitude": -0.0931
      }
    }
  },
  "previous_notifications": [
    { "date": "2024-05-14", "time": "17:30", "message": "SLACK: Sarah - tomorrow's code review moved to 11am" },
    { "date": "2024-05-14", "time": "20:15", "message": "WhatsApp: Tom - pub quiz tomorrow at Crown & Shuttle?" },
    { "date": "2024-05-15", "time": "08:45", "message": "CALENDAR: Team standup in 15 mins" },
    { "date": "2024-05-15", "time": "15:30", "message": "GITHUB: PR #247 approved, ready to merge" },
    { "date": "2024-05-15", "time": "18:45", "message": "CITYMAPPER: 12 min walk to The Ten Bells" }
  ],
  "app_usage": {
    "most_used_apps": [
      { "name": "Reddit", "usage_time": "2h 45m" },
      { "name": "Terminal", "usage_time": "4h 20m" },
      { "name": "Spotify", "usage_time": "6h 15m" },
      { "name": "Chrome", "usage_time": "7h 30m" },
      { "name": "Slack", "usage_time": "4h 50m" }
    ],
    "last_opened_app": "Terminal",
    "screen_time": "12h 20m"
  },
  "contacts": [
    { "name": "Tom Walsh", "phone": "+44 7894 123456", "email": "tom.walsh@gmail.com" },
    { "name": "Sarah Kim", "phone": "+44 7875 234567", "email": "sarah@company.com" },
    { "name": "Mike Chen", "phone": "+44 7833 456789", "email": "mchen.runner@gmail.com" }
  ],
  "purchases": [
    { "item": "Mechanical Keyboard (Cherry MX)", "date": "2024-05-10", "price": "£180", "store": "Amazon" },
    { "item": "USB-C Hub (because dongles)", "date": "2024-05-12", "price": "£45", "store": "Currys" },
    { "item": "Coffee (oat flat white)", "date": "2024-05-14", "price": "£3.20", "store": "Monmouth Coffee" }
  ],
  "fitness_data": {
    "steps_today": 6800,
    "last_workout": { "type": "Run", "distance_km": 4.2, "felt": "sluggish" },
    "sleep": { "last_night": "6h 20m", "quality": "poor - phone notifications" }
  }
};

// social_media.json
export const socialMedia: SocialMedia = {
  "twitter": {
    "handle": "@dandev_",
    "recent_posts": [
      "Borough Market lunch. £12 for a sandwich. London prices are mental.",
      "Code review took 2 hours. Still found 3 bugs. How did this pass CI?",
      "Pub quiz tonight. We came 4th out of 6 teams. At least the pints were good.",
      "Morning standup: 'quick sync' that lasted 45 minutes. Classic."
    ],
    "followers_count": 187,
    "following_count": 312
  }
};

// spotify_playlists.json
export const spotifyPlaylists: SpotifyPlaylists = {
  "playlists": [
    { "name": "Commute", "tracks": ["Radiohead - Paranoid Android", "Massive Attack - Teardrop", "Portishead - Glory Box"] },
    { "name": "Focus", "tracks": ["Boards of Canada - Roygbiv", "Aphex Twin - Xtal", "Burial - Archangel"] },
    { "name": "Late Night", "tracks": ["Nine Inch Nails - Hurt", "Thom Yorke - Hearing Damage", "Autechre - Rae"] }
  ]
};

// calendar.csv
export const calendar: CalendarEntry[] = [
  { "date": "2024-05-15", "time": "09:00", "event": "Team standup", "duration_hours": 0.5, "location": "Office - Shoreditch" },
  { "date": "2024-05-15", "time": "11:00", "event": "Code review session", "duration_hours": 2.0, "location": "Office - Shoreditch" },
  { "date": "2024-05-15", "time": "14:00", "event": "Lunch at Borough Market", "duration_hours": 1.0, "location": "Borough Market" },
  { "date": "2024-05-15", "time": "16:00", "event": "Client demo prep", "duration_hours": 1.5, "location": "Office - Shoreditch" },
  { "date": "2024-05-15", "time": "19:00", "event": "Drinks with mates", "duration_hours": 2.0, "location": "The Ten Bells" },
  { "date": "2024-05-16", "time": "08:30", "event": "Morning run", "duration_hours": 0.5, "location": "Regent's Park" },
  { "date": "2024-05-16", "time": "10:00", "event": "Product planning meeting", "duration_hours": 2.0, "location": "Office - Shoreditch" },
  { "date": "2024-05-16", "time": "13:00", "event": "Grab sandwich", "duration_hours": 0.5, "location": "Pret nearby" },
  { "date": "2024-05-16", "time": "15:00", "event": "Deep work - feature dev", "duration_hours": 3.0, "location": "Office - Shoreditch" },
  { "date": "2024-05-16", "time": "20:00", "event": "Pub quiz", "duration_hours": 2.0, "location": "The Crown & Shuttle" },
  { "date": "2024-05-17", "time": "11:00", "event": "Weekend farmers market", "duration_hours": 1.0, "location": "Broadway Market" }
];

// location.csv
export const locationHistory: LocationEntry[] = [
  {"timestamp":"2024-05-15 07:00:00","latitude":"51.5074","longitude":"-0.1278","location":"Home"},
  {"timestamp":"2024-05-15 08:00:00","latitude":"51.5074","longitude":"-0.1278","location":"Home"},
  {"timestamp":"2024-05-15 09:00:00","latitude":"51.5144","longitude":"-0.0931","location":"Office - Shoreditch"},
  {"timestamp":"2024-05-15 10:00:00","latitude":"51.5144","longitude":"-0.0931","location":"Office - Shoreditch"},
  {"timestamp":"2024-05-15 11:00:00","latitude":"51.5144","longitude":"-0.0931","location":"Office - Shoreditch"},
  {"timestamp":"2024-05-15 12:00:00","latitude":"51.5144","longitude":"-0.0931","location":"Office - Shoreditch"},
  {"timestamp":"2024-05-15 13:00:00","latitude":"51.5144","longitude":"-0.0931","location":"Office - Shoreditch"},
  {"timestamp":"2024-05-15 14:00:00","latitude":"51.5055","longitude":"-0.0754","location":"Borough Market"},
  {"timestamp":"2024-05-15 15:00:00","latitude":"51.5055","longitude":"-0.0754","location":"Borough Market"},
  {"timestamp":"2024-05-15 16:00:00","latitude":"51.5144","longitude":"-0.0931","location":"Office - Shoreditch"},
  {"timestamp":"2024-05-15 17:00:00","latitude":"51.5144","longitude":"-0.0931","location":"Office - Shoreditch"},
  {"timestamp":"2024-05-15 18:00:00","latitude":"51.5074","longitude":"-0.1278","location":"Home"},
  {"timestamp":"2024-05-15 19:00:00","latitude":"51.5184","longitude":"-0.0751","location":"The Ten Bells"},
  {"timestamp":"2024-05-15 20:00:00","latitude":"51.5184","longitude":"-0.0751","location":"The Ten Bells"},
  {"timestamp":"2024-05-15 21:00:00","latitude":"51.5074","longitude":"-0.1278","location":"Home"},
  {"timestamp":"2024-05-16 12:00:00","latitude":"51.5144","longitude":"-0.0931","location":"Office - Shoreditch"},
  {"timestamp":"2024-05-16 13:00:00","latitude":"51.5150","longitude":"-0.0935","location":"Pret nearby"},
  {"timestamp":"2024-05-16 14:00:00","latitude":"51.5144","longitude":"-0.0931","location":"Office - Shoreditch"},
  {"timestamp":"2024-05-16 15:00:00","latitude":"51.5144","longitude":"-0.0931","location":"Office - Shoreditch"},
  {"timestamp":"2024-05-16 16:00:00","latitude":"51.5144","longitude":"-0.0931","location":"Office - Shoreditch"},
  {"timestamp":"2024-05-16 17:00:00","latitude":"51.5144","longitude":"-0.0931","location":"Office - Shoreditch"},
  {"timestamp":"2024-05-16 18:00:00","latitude":"51.5074","longitude":"-0.1278","location":"Home"},
  {"timestamp":"2024-05-16 20:00:00","latitude":"51.5184","longitude":"-0.0751","location":"The Crown & Shuttle"},
  {"timestamp":"2024-05-16 21:00:00","latitude":"51.5184","longitude":"-0.0751","location":"The Crown & Shuttle"},
  {"timestamp":"2024-05-16 22:00:00","latitude":"51.5074","longitude":"-0.1278","location":"Home"},
  {"timestamp":"2024-05-17 10:00:00","latitude":"51.5074","longitude":"-0.1278","location":"Home"},
  {"timestamp":"2024-05-17 11:00:00","latitude":"51.5334","longitude":"-0.0235","location":"Broadway Market"},
  {"timestamp":"2024-05-17 12:00:00","latitude":"51.5334","longitude":"-0.0235","location":"Broadway Market"},
  {"timestamp":"2024-05-17 13:00:00","latitude":"51.5074","longitude":"-0.1278","location":"Home"}
];


export default {
  userProfile,
  socialMedia,
  spotifyPlaylists,
  calendar,
  locationHistory
};
