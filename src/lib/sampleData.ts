import { PopularWhisper, Whisper } from "./type";

// Sample data
const whispers: Whisper[] = [
  {
    id: "1",
    user: "u1",
    content: "I'm so tired of pretending to be okay. It's exhausting.",
    timeAgo: "3h ago",
    likes: 1200,
    comments: 34,
    userInitials: "u1",
    userColor: "#3b82f6",
  },
  {
    id: "2",
    user: "u2",
    content: "Sometimes I just want to disappear and start over somewhere new.",
    timeAgo: "4h ago",
    likes: 987,
    comments: 21,
    userInitials: "u2",
    userColor: "#ef4444",
  },
  {
    id: "3",
    user: "u3",
    content: "I wish I could go back in time and change so many things.",
    timeAgo: "6h ago",
    likes: 812,
    comments: 15,
    userInitials: "u3",
    userColor: "#8b5cf6",
  },
];

const popularWhispers: PopularWhisper[] = [
  {
    id: "1",
    content: "I'm so grateful for the little things in life.",
    timeAgo: "12h ago",
    userInitials: "u4",
    userColor: "#3b82f6",
  },
  {
    id: "2",
    content: "I'm trying to focus on the present moment.",
    timeAgo: "14h ago",
    userInitials: "u5",
    userColor: "#06b6d4",
  },
  {
    id: "3",
    content: "I'm learning to be kinder to myself.",
    timeAgo: "16h ago",
    userInitials: "u6",
    userColor: "#8b5cf6",
  },
];

const emergingCommunities = ["Mental Health", "Self Care", "Gratitude"];
const trendingTopics = ["venting", "confessions", "lonely"];

export { whispers, trendingTopics, emergingCommunities, popularWhispers };
