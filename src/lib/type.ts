// Types
export interface Whisper {
  id: string;
  user: string;
  content: string;
  timeAgo: string;
  likes: number;
  comments: number;
  userInitials: string;
  userColor: string;
}

export interface PopularWhisper {
  id: string;
  content: string;
  timeAgo: string;
  userInitials: string;
  userColor: string;
}

export interface activeNavType {
  activeNav: string;
}
