export interface lession {
  id: string;
  SemesterID: string;
  SlotID: string[];
  CourseID: string;
  StudentID: string;
  LecturersID: string;
  ClassID: string;
}

export interface slot {
  id: string;
  SlotName: string;
  Description: string;
  TimeStart: string;
  TimeEnd: string;
  Status: boolean;
}

export interface participants {
    id: string,
    UserName: string,
    Age: number,
    Gender: true,
    Address: string,
    Email: string,
    Password: string,
    Image: string,
    rating: number,
    Role: number,
    isOnline: boolean,
    Status: boolean,
    createdAt: string
}

export interface questionSlot {
  id: string;
  QuestionID: string;
  UserID: string;
  content: string;
  TimeStart: string;
  TimeEnd: string;
  Slotid: string;
  Status: number;
  SettingStatus: number;
}

export interface classRoom {
  ClassID: string;
  ClassName: string;
  Student: string[];
  Status: boolean;
}
export interface UserAnswer {
  id: string;
  answer: string[];
  QuestionID: string;
  UserID: string;
}
export interface answerQuestionSlot {
  id: string;
  comment: string;
  QuestionID: string;
  UserID: string;
  Rating: number;
  Replies: string[];
  Timestamped: string;
}

export interface replies {
  id: string;
  answerID: string;
  UserID: string;
  ReplyContent: string;
  Timestamped: string;
}

export interface assignmentSlot {
  id: string;
  AssignmentID: string;
  UserID: string;
  title: string;
  description: string;
  urlfile: string[];
  TimeStart: string;
  TimeEnd: string;
  Slotid: string;
  Status: number;
}

export interface answerAssignmentSlot {
  id: string;
  AssignmentID: string;
  UserID: string;
  urlfile: string;
  score: number;
  Timestamped: string;
  Status: number;
}
export interface courses {
  id: string;
  CourseName: string;
  Status: number;
}

export interface CourseSemester {
  id: string;
  SemesterID: string;
  SlotID: string[];
  CourseID: string;
  LecturersID: string;
  ClassID: string;
}

export interface Question {
  id: string;
  content: string;
  image: string;
  answer: string[];
  exId: string;
}

export interface Answer {
  id: string;
  content: string;
  isCorrect: boolean;
}
export interface Exam {
  examID: string;
  examContent: string;
  courseSemesterID: string;
  timeLimit: string;
  image: string;
  status: boolean;
  createdAt: string;
  display: boolean;
  dateOfBooking: string;
}

export interface ResultExam {
  id: string;
  userId: string;
  numberCorrect: string;
  totalQuestion: string;
  examId: string;
}

export interface Semester {
  SemesterID: string;
  SemesterName: string;
  StartDate: string;
  EndDate: string;
  Status: boolean;
  id: string;
}
