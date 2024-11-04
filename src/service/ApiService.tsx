<<<<<<< HEAD
import { UserAnswer } from "../models/Interface"
import axios from "../utils/axiosCustomiz"
=======
import axios from "../utils/axiosCustomiz";
>>>>>>> caa07acd7d93e8873d96bd6bbf4152580e3cebb9

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

const getQuestionSlotBySlotId = (id: string) => {
<<<<<<< HEAD
    return axios.get(`QuestionSLot/${id}`)
}
=======
  return axios.get(`QuestionSLot/${id}`);
};
>>>>>>> caa07acd7d93e8873d96bd6bbf4152580e3cebb9

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
<<<<<<< HEAD
    getDataExam, getAnswerForQuestionExam, getExamList, getSLot,
    getCourseSemester, getCourseSemesterById, getParticipantsById, getParticipants,
    getSLotById, getCourseById, getQuestionSLot, getClass, getQuestionSlotBySlotId,
    postAnswer
} 
=======
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
};
>>>>>>> caa07acd7d93e8873d96bd6bbf4152580e3cebb9
