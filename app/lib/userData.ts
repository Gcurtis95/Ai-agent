
import {
  userProfile,
  socialMedia,
  spotifyPlaylists,
  calendar,
  locationHistory,
} from './DeviceData'; 

export function userData(): string {
  const user = userProfile;

  // User profile

  const profileInfo = `
    Name: ${user.name}
    Age: ${user.age}
    Gender: ${user.gender}
    Profession: ${user.profession}
    Email: ${user.email}    
    Home: ${user.location.home.city}, ${user.location.home.country}
    Work: ${user.location.work.city}, ${user.location.work.country}`.trim();

 
  const notifications = user.previous_notifications
    .map(n => `• ${n.date} ${n.time} — ${n.message}`)
    .join('\n');


  const appsUsed = user.app_usage.most_used_apps
    .map(app => `• ${app.name}: ${app.usage_time}`)
    .join('\n');

  const appStats = `
    Total Screen Time: ${user.app_usage.screen_time}
    Last Opened App: ${user.app_usage.last_opened_app}
    Most Used Apps:
    ${appsUsed}`.trim();

  // Contacts
  const contacts = user.contacts
    .map(c => `• ${c.name} (${c.email})`)
    .join('\n');

  // Purchases
  const purchases = user.purchases
    .map(p => `• ${p.date} — ${p.item} from ${p.store} for ${p.price}`)
    .join('\n');

  // Fitness
  const fitness = `
    Steps Today: ${user.fitness_data.steps_today}
    Last Workout: ${user.fitness_data.last_workout.type}, ${user.fitness_data.last_workout.distance_km} km (felt: ${user.fitness_data.last_workout.felt})
    Sleep Last Night: ${user.fitness_data.sleep.last_night} (Quality: ${user.fitness_data.sleep.quality})`.trim();

  // Social media
  const tweets = socialMedia.twitter.recent_posts
    .map(p => `• ${p}`)
    .join('\n');

  // Spotify
  const allTracks = spotifyPlaylists.playlists
    .map(p => `🎵 ${p.name}:\n  ${p.tracks.join(', ')}`)
    .join('\n\n');

  // Calender
  const calFormatted = calendar
    .map(event => {
      const [hourStr, minuteStr] = event.time.split(':');
      const startHour = parseInt(hourStr, 10);
      const startMinute = parseInt(minuteStr, 10);
      const duration = event.duration_hours;

      const endHour = Math.floor(startHour + duration);
      const endMinute = Math.round((startMinute + (duration % 1) * 60) % 60);

      const start = `${String(startHour).padStart(2, '0')}:${String(startMinute).padStart(2, '0')}`;
      const end = `${String(endHour).padStart(2, '0')}:${String(endMinute).padStart(2, '0')}`;

      return `• ${event.date} ${start}-${end}: ${event.event} @ ${event.location}`;
    })
    .join('\n');

  // Location
  const locFormatted = locationHistory
    .map(loc => `• ${loc.timestamp}: ${loc.location}`)
    .join('\n');

  return `
USER PROFILE
${profileInfo}

NOTIFICATIONS
${notifications}

APP USAGE
${appStats}

CONTACTS
${contacts}

PURCHASE HISTORY
${purchases}

FITNESS
${fitness}

SOCIAL MEDIA
${tweets}

SPOTIFY PLAYLISTS
${allTracks}

CALENDAR EVENTS
${calFormatted}

LOCATION HISTORY
${locFormatted}

You are Dan's personal AI assistant. Based on this complete digital context, provide helpful, context-aware recommendations that improve his current moment or well-being.
`.trim();
}
