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

const anonymousMessages = [
  {
    id: 1,
    text: "I'm so tired of pretending to be okay. It's exhausting.",
    timestamp: "Jan 22, 2024",
    likes: 1200,
    bookmarks: 34,
    category: "venting",
  },
  {
    id: 2,
    text: "Sometimes I sit in my car after work for 20 minutes just to have a moment of silence before facing everyone at home.",
    timestamp: "Jan 21, 2024",
    likes: 856,
    bookmarks: 67,
    category: "confessions",
  },
  {
    id: 3,
    text: "I've been wearing the same hoodie for three days because it still smells like someone who made me feel safe.",
    timestamp: "Jan 21, 2024",
    likes: 2341,
    bookmarks: 189,
    category: "lonely",
  },
  {
    id: 4,
    text: "I delete messages before sending them more often than I actually send them. The fear of being too much is paralyzing.",
    timestamp: "Jan 20, 2024",
    likes: 1567,
    bookmarks: 203,
    category: "venting",
  },
  {
    id: 5,
    text: "I pretend to be asleep when my roommate comes home so I don't have to explain why I'm crying.",
    timestamp: "Jan 20, 2024",
    likes: 934,
    bookmarks: 78,
    category: "lonely",
  },
  {
    id: 6,
    text: "I've been secretly taking care of a stray cat for months. It's the highlight of my day but I can't tell anyone because pets aren't allowed in my building.",
    timestamp: "Jan 19, 2024",
    likes: 3422,
    bookmarks: 445,
    category: "confessions",
  },
  {
    id: 7,
    text: "Every time someone asks 'How are you?' I want to scream. But I just say 'fine' and smile.",
    timestamp: "Jan 19, 2024",
    likes: 2108,
    bookmarks: 156,
    category: "venting",
  },
  {
    id: 8,
    text: "I still check their social media every day even though we broke up 6 months ago. I know it's not healthy but I can't stop.",
    timestamp: "Jan 18, 2024",
    likes: 1789,
    bookmarks: 234,
    category: "confessions",
  },
  {
    id: 9,
    text: "I eat lunch alone in my car because the break room feels too overwhelming. Everyone seems to have their groups.",
    timestamp: "Jan 18, 2024",
    likes: 1456,
    bookmarks: 98,
    category: "lonely",
  },
  {
    id: 10,
    text: "I practice conversations in the mirror before important meetings because I'm terrified of saying the wrong thing.",
    timestamp: "Jan 17, 2024",
    likes: 1823,
    bookmarks: 167,
    category: "venting",
  },
];

const emergingCommunities = ["Mental Health", "Self Care", "Gratitude"];
const trendingTopics = ["venting", "confessions", "lonely"];

export {
  whispers,
  trendingTopics,
  emergingCommunities,
  popularWhispers,
  anonymousMessages,
};
