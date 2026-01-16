import { Assignment, GradeData, Module } from './types';

export const COURSE_INFO = {
  code: "T567",
  name: "Advanced Human-AI Systems",
  instructor: "Dr. Elena Vance",
  email: "evance@university.edu",
  officeHours: "Tue/Thu 2:00 PM - 4:00 PM (Room 304)",
  description: "This course explores the theoretical and practical intersections of human cognition and artificial intelligence. Students will design, implement, and evaluate systems where humans and AI agents collaborate to solve complex problems.",
};

export const ANNOUNCEMENTS = [
  {
    id: 1,
    date: "Oct 24, 2023",
    title: "Midterm Grades Released",
    content: "The midterm grades have been posted to the portal. Great job everyone on the Systems Architecture section.",
  },
  {
    id: 2,
    date: "Oct 20, 2023",
    title: "Guest Lecturer on Tuesday",
    content: "Please welcome Dr. S. Chen from DeepMind this coming Tuesday. Attendance is mandatory.",
  }
];

export const ASSIGNMENTS: Assignment[] = [
  { id: '1', title: 'A1: User Needs Analysis', dueDate: 'Sep 15, 2023', points: 100, status: 'Graded' },
  { id: '2', title: 'A2: Model Fine-tuning Lab', dueDate: 'Oct 01, 2023', points: 100, status: 'Graded' },
  { id: '3', title: 'Midterm Project', dueDate: 'Oct 20, 2023', points: 200, status: 'Submitted' },
  { id: '4', title: 'A3: Ethics in AI Essay', dueDate: 'Nov 10, 2023', points: 100, status: 'Pending' },
  { id: '5', title: 'Final Capstone', dueDate: 'Dec 05, 2023', points: 300, status: 'Pending' },
];

export const GRADE_DATA: GradeData[] = [
  { assignment: 'A1', avg: 85, yours: 92 },
  { assignment: 'A2', avg: 78, yours: 88 },
  { assignment: 'Midterm', avg: 82, yours: 79 },
  { assignment: 'Quiz 1', avg: 90, yours: 95 },
];

export const MODULES: Module[] = [
  {
    week: 1,
    title: "Introduction to HAI",
    description: "Overview of the history of Human-AI Interaction and core definitions.",
    topics: ["History of AI", "Human-in-the-loop", "Agency vs. Automation"],
    resources: [{ title: "Lecture Slides", type: "pdf" }, { title: "Reading: Amershi et al.", type: "link" }]
  },
  {
    week: 2,
    title: "Prompt Engineering & Interaction",
    description: "Understanding how humans communicate intent to large language models.",
    topics: ["Zero-shot vs Few-shot", "Chain of Thought", "Interface Design Patterns"],
    resources: [{ title: "OpenAI Guide", type: "link" }, { title: "Lab 2 Notebook", type: "link" }]
  },
  {
    week: 3,
    title: "Trust & Explainability (XAI)",
    description: "How to build trust in black-box systems through explainability techniques.",
    topics: ["SHAP values", "LIME", "User Trust Models"],
    resources: [{ title: "Explainable AI Video", type: "video" }]
  },
  {
    week: 4,
    title: "Ethics & Bias",
    description: "Critical analysis of bias in training data and deployment.",
    topics: ["Fairness metrics", "Societal impact", "Regulation"],
    resources: [{ title: "Bias Case Study", type: "pdf" }]
  }
];