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
  text: string;
  category: string;
  timestamp?: string;
};

export type SideBarProps = {
  activeFilter: string;
  onFilterChange: React.Dispatch<React.SetStateAction<string>>;
};

export type sendMessageProp = (newMessage: newMessage) => void;
