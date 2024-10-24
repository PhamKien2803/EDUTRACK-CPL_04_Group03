import axios from "../utils/axiosCustomiz"

const getDataExam = () => {
    return axios.get("QuestionExam")
}
export { getDataExam } 