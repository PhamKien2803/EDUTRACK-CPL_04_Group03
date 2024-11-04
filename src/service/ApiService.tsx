import { UserAnswer } from "../models/Interface"
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
};
