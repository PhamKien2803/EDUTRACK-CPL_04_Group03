export interface lession {
    id: string,
    SemesterID: string,
    SlotID: string[]
    CourseID: string,
    StudentID: string,
    LecturersID: string,
    ClassID: string
}

export interface slot {
    id: string,
    SlotName: string,
    Description: string,
    TimeStart: string,
    TimeEnd: string,
    Status: boolean
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
    Status: boolean
}

export interface questionSlot {
    QuestionID: string,
    UserID: string,
    content: string,
    image: string,
    TimeStart: string,
    TimeEnd: string,
    Slotid: string,
    Status: number,
    SettingStatus: number
}



export interface classRoom {
    ClassID: string,
    ClassName: string,
    Student: string[],
    Status: boolean
}
export interface UserAnswer {
    id: string,
    answer: string[],
    QuestionID: string,
    UserID: string
}
export interface answerQuestionSlot {
    id: string,
    comment: string,
    QuestionID: string,
    UserID: string,
    Rating: number,
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
    AssignmentID: string,
    UserID: string,
    title: string,
    description: string,
    urlfile: string[],
    TimeStart: string,
    TimeEnd: string,
    Slotid: string,
    Status: number
}

export interface answerAssignmentSlot {
    id: string,
    AssignmentID: string,
    UserID: string,
    urlfile: string,
    Timestamped: string,
    Status: number
}
export interface courses {
    id: string,
    CourseName: string,
    Status: number
}