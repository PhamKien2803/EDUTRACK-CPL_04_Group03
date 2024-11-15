import { Answer, Exam, Question } from "../models/Interface"
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