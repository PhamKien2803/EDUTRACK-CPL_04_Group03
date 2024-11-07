import { participants } from "../models/Interface";
import { UserAnswer, answerQuestionSlot } from "../models/Interface"
import axios from "../utils/axiosCustomiz"


const getDataExam = () => {
  return axios.get("QuestionExam");
};

const getAnswerForQuestionExam = () => {
  return axios.get("AnswerQuestionExam");
};

const getExamList = () => {
  return axios.get("Examination");
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
  return axios.get(`QuestionSLot/${id}`);
};

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
  return axios.get(`AnswerQuestionSlot`);
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


const updateProfile = (id: string, name: string, adds: string, age: number, gender: boolean) => {
  return axios.put(`Participants/${id}`, {
    UserName: name,
    Age: age,
    Gender: gender,
    Address: adds
  })
}

const postAnswer = (ua: UserAnswer) => {
  return axios.post('UserAnswer', {
    answer: ua.answer,
    QuestionID: ua.QuestionID,
    UserID: ua.UserID
  })
}

const postComment = (user: answerQuestionSlot) => {
  return axios.post("AnswerQuestionSlot", {
    comment: user.comment,
    QuestionID: user.QuestionID,
    UserID: user.UserID,
    replies: user.replies
  });
};

const postReplyContent = (reply: answerQuestionSlot) => {
  return axios.post("AnswerQuestionSlot", {
    comment: reply.comment,
    QuestionID: reply.QuestionID,
    UserID: reply.UserID,
    replies: reply.replies
  });
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
  postReplyContent,
  postComment,

};
