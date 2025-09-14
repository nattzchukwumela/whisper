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
  _count?: {
    messages: number;
  };
  name: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AnonymousMessageSenderProps {
  uniqueLink: string;
  user: User;
}

export interface message {
  id: number;
  text: string;
  timestamp: string;
  likes?: number;
  bookmarks?: number;
  category: string;
}

export type newMessage = {
  id?: number;
  content: string;
  category: string;
  timestamp?: string;
};

export interface cat {
  name: string;
  emoji: string;
  color: string;
}

export interface messagesTypes {
  id: number;
  category: string;
  text: string;
  createdAt: string;
}

export type WhispersUIProps = {
  user: User;
  link: string;
};

export type platformsTypes = "Twitter" | "Copy Link" | "WhatsApp" | "Facebook";

export type SideBarProps = {
  activeFilter: string;
  onFilterChange: React.Dispatch<React.SetStateAction<string>>;
};

export type sendMessageProp = (newMessage: newMessage) => void;
