import axios from "../utils/axiosCustomiz"

const getDataExam = () => {
    return axios.get("QuestionExam")
}

const getAnswerForQuestionExam = () => {
    return axios.get("AnswerQuestionExam")
}

const getExamList = () => {
    return axios.get("Examination")
}

const getPaticipants = () => {
    return axios.get("Participants")
}

export { getDataExam, getAnswerForQuestionExam, getExamList, getPaticipants }