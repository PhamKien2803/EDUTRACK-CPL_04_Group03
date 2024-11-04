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
    content: string,
    TimeLimit?: number,
    Slotid: string,
    Status: number
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
}