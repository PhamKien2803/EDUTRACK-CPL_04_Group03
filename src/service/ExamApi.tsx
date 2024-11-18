import { Answer, Exam, Question, ResultExam } from "../models/Interface"
import axios from "../utils/axiosCustomiz"

export const postExam = (Exam: Exam) => {
    return axios.post('Examination', { ...Exam })
}

export const postAnswerQs = (Answer: Answer) => {
    return axios.post('AnswerQuestionExam', { ...Answer })

}

export const postQuestion = (Question: Question) => {
    return axios.post('QuestionExam', { ...Question })
}

export const getResultExam = (exId: any) => {
    return axios.get(`resultExam?examId=${exId}`)
}
export const getResultExamList = () => {
    return axios.get(`resultExam`)
}

export const getExamListByID = (csID: any) => {
    return axios.get(`Examination?courseSemesterID=${csID}`);
};

export const getResultExamListByUserId = (userId: any) => {
    return axios.get(`resultExam?userId=${userId}`)
}

export const postResultExam = (ResultExam: ResultExam) => {
    return axios.post(`resultExam`, { ...ResultExam })
}