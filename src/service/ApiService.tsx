import axios from "../utils/axiosCustomiz"

const getDataExam = () => {
    return axios.get("QuestionExam")
}

const getAnswerForQuestionExam = () => {
    return axios.get("answer")
}

const getExamList = () => {
    return axios.get("Examination")
}

export { getDataExam, getAnswerForQuestionExam, getExamList } 