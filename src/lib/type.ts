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

export interface User {
  id: number;
  email?: string;
  uniqueLink: string;
  name: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AnonymousMessageSenderProps {
  uniqueLink: string;
  user: User;
}
