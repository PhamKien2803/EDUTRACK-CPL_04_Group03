import axios from "../utils/axiosCustomiz"

const getDataExam = () => {
    return axios.get("QuestionExam")
}

const getAnswerForQuestionExam = () => {
    return axios.get("answer")
}

export { getDataExam, getAnswerForQuestionExam } 