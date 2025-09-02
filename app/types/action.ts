
export type Action =
  | {
      type: 'reminder';
      title: string;
      time?: string;
    }
  | {
      type: 'suggest playlist';
      playlist_name: string;
      'song name': string;
    };
