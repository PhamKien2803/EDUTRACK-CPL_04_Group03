import { UserAnswer, answerQuestionSlot, replies } from "../models/Interface"
import axios from "../utils/axiosCustomiz"


const getDataExam = () => {
  return axios.get("QuestionExam");
};
const getQuestionByExID = (exId: any) => {
  return axios.get(`QuestionExam?exId=${exId}`);
};

const getAnswerForQuestionExam = () => {
  return axios.get("AnswerQuestionExam");
};

const getExamList = () => {
  return axios.get("Examination");
};

const getExamByID = (id: any) => {
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
}

const getQuestionSlotBySlotId = (id: string) => {
  return axios.get(`QuestionSLot/${id}`)
}


const getAnswerQuestionSlot = () => {
  return axios.get("AnswerQuestionSlot");
}

const getAnswerQuestionSlotByQuestionId = (id: string) => {
  return axios.get(`AnswerQuestionSlot/${id}`);
}

const getCommentByQuestionId = (id: string) => {
  return axios.get(`AnswerQuestionSlot/${id}`);
}

const getRepliesContent = () => {
  return axios.get(`Replies`);
}

const getClass = () => {
  return axios.get("Class");
};

const getCourseSemesterByUserId = (useId: string) => {
  return axios.get(`CourseSemester?StudentID=${useId}`);
};

const getSemester = () => {
  return axios.get("Semester");
};

const postAnswer = (ua: UserAnswer) => {
  return axios.post('UserAnswer', {
    answer: ua.answer,
    QuestionID: ua.QuestionID,
    UserID: ua.UserID
  })
}

const getAnswerByUserId = (id: any) => {
  return axios.get(`UserAnswer?UserID=${id}`);

}

const postComment = (user: answerQuestionSlot) => {
  return axios.post("AnswerQuestionSlot", {
    comment: user?.comment,
    QuestionID: user?.QuestionID,
    UserID: user?.UserID,
    Replies: user?.Replies,
  });
};

// Updating a comment
const updateComment = (comment: answerQuestionSlot) => {
  return axios.put(`AnswerQuestionSlot/${comment.id}`, {
    comment: comment?.comment,
    QuestionID: comment?.QuestionID,
    UserID: comment?.UserID,
    Replies: comment?.Replies,
  });
};

// Deleting a comment along with its replies
const deleteComment = (id: string) => {
  return axios.delete(`AnswerQuestionSlot/${id}`);
};


const postReply = async (answerID: string, replyContent: string, userID: string) => {
  try {
    const response = await axios.post(`Replies`, {
      ReplyContent: replyContent,
      UserID: userID,
      answerID: answerID,

    });
    return response.data;
  } catch (error) {
    console.error("Error posting reply:", error);
    throw error;
  }
};

const updateReply = async (replies: replies) => {
  return axios.put(`Replies/${replies.id}`, {
    ReplyContent: replies.ReplyContent,
    UserID: replies.UserID,
    answerID: replies.answerID
  });
}


const deleteReply = async (replies: replies) => {
  return axios.delete(`Replies/${replies.id}`);
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
  getQuestionByExID,
  getExamByID,
  getAnswerByUserId,
  postComment,
  updateComment,
  deleteComment,
  getRepliesContent,
  postReply,
  updateReply,
  deleteReply,
  // postReplyContent,
};
