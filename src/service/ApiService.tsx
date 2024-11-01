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

const getSLot = () => {
    return axios.get("Slot")
}


const getSLotById = (id: string) => {
    return axios.get(`Slot/${id}`)
}

const getCourseById = (id: string) => {
    return axios.get(`Course/${id}`)
}

const getCourseSemester = () => {
    return axios.get("CourseSemester")
}

const getCourseSemesterById = (id: string) => {
    return axios.get(`CourseSemester/${id}`)
}

const getParticipantsById = (id: string) => {
    return axios.get(`Participants/${id}`)
}

const getParticipants = () => {
    return axios.get("Participants")
}

const getQuestionSLot = () => {
    return axios.get("QuestionSLot")
}

const getQuestionSlotBySlotId = (id:string) => {
    return axios.get(`QuestionSLot/${id}`)
}

const getClass = () => {
    return axios.get("Class")
}

export {
    getDataExam, getAnswerForQuestionExam, getExamList, getSLot,
    getCourseSemester, getCourseSemesterById, getParticipantsById, getParticipants,
    getSLotById, getCourseById, getQuestionSLot, getClass, getQuestionSlotBySlotId
} 
