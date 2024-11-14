import { UserAnswer, answerAssignmentSlot, answerQuestionSlot, assignmentSlot, questionSlot, replies } from "../models/Interface"
import axios from "../utils/axiosCustomiz"


const getDataExam = () => {
  return axios.get("QuestionExam");
};
export const getQuestionByExID = (exId: any) => {
  return axios.get(`QuestionExam?exId=${exId}`);
};

const getAnswerForQuestionExam = () => {
  return axios.get("AnswerQuestionExam");
};

const getExamList = () => {
  return axios.get("Examination");
};

export const getExamByID = (id: any) => {
  return axios.get(`Examination?examID=${id}`);
};

const getSLot = () => {
  return axios.get("Slot");
};

const getSLotById = (id: string) => {
  return axios.get(`Slot/${id}`);
};

const getCourseById = (id: string) => {
  return axios.get(`Course/${id}`);
};

const getCourse = () => {
  return axios.get(`Course`);
};

const getCourseSemester = () => {
  return axios.get("CourseSemester");
};

const getCourseSemesterById = (id: string) => {
  return axios.get(`CourseSemester/${id}`);
};

const getParticipantsById = (id: string) => {
  return axios.get(`Participants/${id}`);
};

const getParticipants = () => {
  return axios.get("Participants");
};

const getQuestionSLot = () => {
  return axios.get("QuestionSLot");
};

const getQuestionSlotById = (id: string) => {
  return axios.get(`QuestionSLot/${id}`);
};

const getQuestionSlotBySlotId = (id: string) => {
  return axios.get(`QuestionSLot/${id}`);
};

const getAnswerQuestionSlot = () => {
  return axios.get("AnswerQuestionSlot");
};

const getAnswerQuestionSlotByQuestionId = (id: string) => {
  return axios.get(`AnswerQuestionSlot/${id}`);
};

const getCommentByQuestionId = (id: string) => {
  return axios.get(`AnswerQuestionSlot/${id}`);
};

const getRepliesContent = () => {
  return axios.get(`Replies`);
};

const getClass = () => {
  return axios.get("Class");
};

const getCourseSemesterByUserId = (useId: string) => {
  return axios.get(`CourseSemester?StudentID=${useId}`);
};

const getCourseSemesterByLecturersID = (LecturersID: string) => {
  return axios.get(`CourseSemester?LecturersID=${LecturersID}`);
};

const getSemester = () => {
  return axios.get("Semester");
};


const updateProfile = (id: string, name: string, address: string, age: number, gender: boolean, email: string, password: string,
    image: string, rating: number, role: number, isOnline: boolean, status: boolean
  ) => {
    return axios.put(`Participants/${id}`, {
      UserName: name,
      Age: age,
      Gender: gender,
      Address: address,
      Password: password,
      Image: image,
      rating: rating,
      Role: role,
      isOnline: isOnline,
      Status: status,
      Email: email,
    });
  };

const postAnswer = (ua: UserAnswer) => {
  return axios.post("UserAnswer", {
    answer: ua.answer,
    QuestionID: ua.QuestionID,
    UserID: ua.UserID,
  });
};

export const getAnswerByUserId = (id: any) => {
  return axios.get(`UserAnswer?UserID=${id}`);
};

const postComment = (user: answerQuestionSlot) => {
  return axios.post("AnswerQuestionSlot", {
    comment: user?.comment,
    QuestionID: user?.QuestionID,
    UserID: user?.UserID,
    Rating: user?.Rating,
    Replies: user?.Replies,
    Timestamped: new Date().toISOString(),
  });
};

export const createQuestionSlot = (question: questionSlot) => {
  return axios.post("QuestionSLot", {
    UserID: question.UserID,
    content: question.content,
    image: question.image,
    TimeStart: question.TimeStart,
    TimeEnd: question.TimeEnd,
    Slotid: question.Slotid,
    Status: question.Status,
    SettingStatus: question.SettingStatus
  });
}



export const updateStatusQuestionSLot = (status: questionSlot) => {
  return axios.put(`QuestionSLot/${status.id}`, {
    UserID: status.UserID,
    QuestionID: status.QuestionID,
    Status: status.Status, //Chỉ Update Status
    content: status.content,
    image: status.image,
    TimeStart: status.TimeStart,
    TimeEnd: status.TimeEnd,
    Slotid: status.Slotid,
    SettingStatus: status.SettingStatus
  });
}



export const createAssignmentSlot = (assignment: assignmentSlot) => {
  return axios.post("AssignmentSlot", {
    AssignmentID: assignment.AssignmentID,
    UserID: assignment.UserID,
    title: assignment.title,
    description: assignment.description,
    urlfile: assignment.urlfile,
    TimeStart: assignment.TimeStart,
    TimeEnd: assignment.TimeEnd,
    Slotid: assignment.Slotid,
    Status: assignment.Status
  });
}


export const updateQuestionSLot = (question: questionSlot) => {
  return axios.put(`QuestionSLot/${question.id}`, {
    id: question.id,
    QuestionID: question.QuestionID,
    UserID: question.UserID,
    content: question.content,
    image: question.image,
    TimeStart: question.TimeStart,
    TimeEnd: question.TimeEnd,
    Slotid: question.Slotid,
    Status: question.Status,
    SettingStatus: question.SettingStatus
  });
}


export const updateAssignmentSlot = (assignment: assignmentSlot) => {
  return axios.put(`AssignmentSlot/${assignment.id}`, {
    id: assignment.id,
    AssignmentID: assignment.AssignmentID,
    UserID: assignment.UserID,
    title: assignment.title,
    description: assignment.description,
    urlfile: assignment.urlfile,
    TimeStart: assignment.TimeStart,
    TimeEnd: assignment.TimeEnd,
    Slotid: assignment.Slotid,
    Status: assignment.Status
  });
}

export const updateStatusAssignmentSlot = (status: assignmentSlot) => {
  return axios.put(`AssignmentSlot/${status.id}`, {
    UserID: status.UserID,
    AssignmentID: status.AssignmentID,
    title: status.title,
    description: status.description,
    urlfile: status.urlfile,
    TimeStart: status.TimeStart,
    TimeEnd: status.TimeEnd,
    Slotid: status.Slotid,
    Status: status.Status, //Chỉ Update Status
  });
}

export const deleteQuestionSlot = (id: string) => {
  return axios.delete(`QuestionSLot/${id}`);
}

export const deleteAssignmentSlot = (id: string) => {
  return axios.delete(`AssignmentSlot/${id}`);
}

//AnswerAssignmentSlot

export const getAnswerAssignmentSlot = () => {
  return axios.get("AnswerAssignmentSlot");
};

export const getAnswerAssignmentSlot2 = (userID: string, assignmentID: string) => {
  return axios.get("AnswerAssignmentSlot", {
    params: { UserID: userID, AssignmentID: assignmentID }
  });
};


export const postAnswerAssignmentSlot = (user: answerAssignmentSlot) => {
  return axios.post("AnswerAssignmentSlot", {
    id: user?.id,
    AssignmentID: user?.AssignmentID,
    UserID: user?.UserID,
    urlfile: user?.urlfile,
    score: user?.score,
    Timestamped: new Date().toISOString(),
    Status: user?.Status
  });
}

export const updateAnswerAssignmentSlot = (user: answerAssignmentSlot) => {
  return axios.put(`AnswerAssignmentSlot/${user.id}`, {
    id: user?.id,
    AssignmentID: user?.AssignmentID,
    UserID: user?.UserID,
    urlfile: user?.urlfile,
    score: user?.score,
    Timestamped: new Date().toISOString(),
    Status: user?.Status
  });
}

export const deleteAnswerAssignmentSlot = (id: string) => {
  return axios.delete(`AnswerAssignmentSlot/${id}`);
}


// Updating a comment
export const updateComment = (comment: answerQuestionSlot) => {
  return axios.put(`AnswerQuestionSlot/${comment.id}`, {
    comment: comment?.comment,
    QuestionID: comment?.QuestionID,
    UserID: comment?.UserID,
    Replies: comment?.Replies,
    Rating: comment?.Rating,
    Timestamped: new Date().toISOString(),
  });
};

// Deleting a comment along with its replies
export const deleteComment = (id: string) => {
  return axios.delete(`AnswerQuestionSlot/${id}`);
};

export const postReply = async (
  answerID: string,
  replyContent: string,
  userID: string,
  timestamp: string
) => {
  try {
    const response = await axios.post(`Replies`, {
      ReplyContent: replyContent,
      UserID: userID,
      answerID: answerID,
      Timestamped: timestamp,
    });
    return response.data;
  } catch (error) {
    console.error("Error posting reply:", error);
    throw error;
  }
};

export const updateReply = async (replies: replies) => {
  return axios.put(`Replies/${replies?.id}`, {
    ReplyContent: replies?.ReplyContent,
    UserID: replies?.UserID,
    answerID: replies?.answerID,
    Timestamped: new Date().toISOString(),
  });
};

export const deleteReply = async (replies: replies) => {
  return axios.delete(`Replies/${replies.id}`);
};

export const updateRating = (rating: answerQuestionSlot) => {
  return axios.put(`AnswerQuestionSlot/${rating.id}`, {
    comment: rating?.comment,
    QuestionID: rating?.QuestionID,
    UserID: rating?.UserID,
    Replies: rating?.Replies,
    Rating: rating?.Rating,
    Timestamped: new Date().toISOString(),
  });
};

export const getAssignmentSlot = () => {
  return axios.get("AssignmentSlot");
};

export const getAssignmentSlotById = (id: string) => {
  return axios.get(`AssignmentSlot/${id}`);
};
export const getCouseraInLecturers = (cid: any, sid: any, lid: string) => {
  return axios.get(`CourseSemester?CourseID=${cid}&SemesterID=${sid}&LecturersID=${lid}`);
}


export {
  getDataExam,
  getAnswerForQuestionExam,
  getExamList,
  getSLot,
  getCourseSemester,
  getCourseSemesterById,
  getParticipantsById,
  getParticipants,
  getSLotById,
  getCourseById,
  getQuestionSLot,
  getClass,
  getQuestionSlotBySlotId,
  getCourseSemesterByUserId,
  getSemester,
  postAnswer,
  getCourse,
  getAnswerQuestionSlotByQuestionId,
  getAnswerQuestionSlot,
  getQuestionSlotById,
  getCommentByQuestionId,
  updateProfile,
  getRepliesContent,
  postComment,
  getCourseSemesterByLecturersID,

};
