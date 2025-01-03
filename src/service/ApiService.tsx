import { update } from "@react-spring/web";
import {
  NewSemester,
  Semester,
  UserAnswer,
  answerAssignmentSlot,
  answerQuestionSlot,
  assignmentSlot,
  classRoom,
  participants,
  questionSlot,
  replies,
} from "../models/Interface";
import axios from "../utils/axiosCustomiz";

const getDataExam = () => {
  return axios.get("QuestionExam");
};
export const getQuestionByExID = (exId: any) => {
  return axios.get(`QuestionExam?exId=${exId}`);
};

const getAnswerForQuestionExam = () => {
  return axios.get("AnswerQuestionExam");
};

const getExamList = () => {
  return axios.get("Examination");
};

export const getExamByID = (id: any) => {
  return axios.get(`Examination?examID=${id}`);
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

const getCourseSemesterById = (id: any) => {
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
};

const getQuestionSlotBySlotId = (id: string) => {
  return axios.get(`QuestionSLot/${id}`);
};

const getAnswerQuestionSlot = () => {
  return axios.get("AnswerQuestionSlot");
};

const getAnswerQuestionSlotByUserId = (id: string) => {
  return axios.get("AnswerQuestionSlot?UserID=" + id);
};

const getAnswerQuestionSlotByQuestionId = (id: string) => {
  return axios.get(`AnswerQuestionSlot/${id}`);
};

const getCommentByQuestionId = (id: string) => {
  return axios.get(`AnswerQuestionSlot/${id}`);
};

const getRepliesContent = () => {
  return axios.get(`Replies`);
};

const getClass = () => {
  return axios.get(`Class`);
};

export const updateClass = (id: string, updatedData: { ClassName: string }) => {
  return axios.patch(`/Class/${id}`, updatedData);
};

// Cập nhật danh sách học sinh của lớp
export const updateClassStudents = (classId: string, updatedStudents: string[]) => {
  return axios.patch(`/Class/${classId}`, {
    Student: updatedStudents,
  });
};

export const deleteStudentinClass = (id: string, updatedClass: classRoom) => {
  return axios.patch(`Class/${id}`, updatedClass);
};


export const updateClassStatus = (id: string, status: boolean) => {
  return axios.patch(`/Class/${id}`, { Status: status });
};

export const updateAccountStatus = (id: string, newStatus: boolean) => {
  return axios.patch(`/Participants/${id}`, { Status: newStatus });
};
const getCourseSemesterByUserId = (clasId: string) => {
  return axios.get(`CourseSemester?ClassID=${clasId}`);
};

const getCourseSemesterByLecturersID = (LecturersID: string) => {
  return axios.get(`CourseSemester?LecturersID=${LecturersID}`);
};

const getSemester = () => {
  return axios.get("Semester");
};

export const updateSemester = (
  id: string,
  updatedData: { SemesterName: string; StartDate: string; EndDate: string }
) => {
  return axios.patch(`/Semester/${id}`, updatedData);
};

export const updateSemesterStatus = (id: string, status: boolean) => {
  return axios.patch(`/Semester/${id}`, { Status: status });
};

export const createNewSemester = (newSemester: NewSemester) => {
  return axios.post("Semester", {
    SemesterID: newSemester.SemesterID,
    SemesterName: newSemester.SemesterName,
    StartDate: newSemester.StartDate,
    EndDate: newSemester.EndDate,
    Status: "true",
  });
};

const updateProfile = (
  id: string,
  name: string,
  address: string,
  age: number,
  gender: boolean,
  email: string,
  password: string,
  image: string,
  rating: number,
  role: number,
  isOnline: boolean,
  status: boolean
) => {
  return axios.put(`Participants/${id}`, {
    UserName: name,
    Age: age,
    Gender: gender,
    Address: address,
    Password: password,
    Image: image,
    rating: rating,
    Role: role,
    isOnline: isOnline,
    Status: status,
    Email: email,
  });
};

export const addCourse = (course: courses) => {
  return axios.post("Course", { ...course });
};

export const updateCourse = async (id: string, updatedCourse: courses) => {
  const response = await fetch(`http://localhost:9999/Course/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedCourse),
  });
  return response.json();
};

export const deleteCourse = async (id: string) => {
  await fetch(`http://localhost:9999/Course/${id}`, {
    method: "DELETE",
  });
};

export const resetPassword = (id: string, password: string) => {
  return axios.patch(`Participants/${id}`, {
    Password: password,
  });
};

export const changePassword = async (id: string, data: { Password: string }) => {
  const response = await axios.patch(`Participants/${id}`, data);
  return response.data;
};

export const createClass = (newClass: classRoom) => {
  return axios.post("Class", {
    ClassID: newClass.ClassID,
    ClassName: newClass.ClassName,
    Student: newClass.Student,
    Status: newClass.Status,
  });
};
export const updateClassByClassID = (
  ClassID: string,
  data: { ClassName: string; Status: boolean }
) => {
  return axios.patch(`/Class/${ClassID}`, data);
};

export const createStudent = (newStudent: participants) => {
  return axios.post(`/Participants`, {
    id: newStudent.id,
    UserName: newStudent.UserName,
    Email: newStudent.Email,
    Age: newStudent.Age,
    Gender: newStudent.Gender,
    Address: newStudent.Address,
    Password: newStudent.Password,
    Image: newStudent.Image,
    Role: newStudent.Role,
    isOnline: newStudent.isOnline,
    Status: newStudent.Status,
    createAt: new Date().toISOString(),
  });
};
export const deleteParticipant = async (id: string) => {
  try {
    const response = await axios.delete(`/Participants/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting participant:", error);
    throw error;
  }
};
const postAnswer = (ua: UserAnswer) => {
  return axios.post("UserAnswer", {
    answer: ua.answer,
    QuestionID: ua.QuestionID,
    UserID: ua.UserID,
  });
};

export const getAnswerByUserId = (id: any) => {
  return axios.get(`UserAnswer?UserID=${id}`);
};

const postComment = (user: answerQuestionSlot) => {
  return axios.post("AnswerQuestionSlot", {
    comment: user?.comment,
    QuestionID: user?.QuestionID,
    UserID: user?.UserID,
    Rating: user?.Rating,
    Replies: user?.Replies,
    Timestamped: new Date().toISOString(),
  });
};

export const createQuestionSlot = (question: questionSlot) => {
  return axios.post("QuestionSLot", {
    UserID: question.UserID,
    content: question.content,
    TimeStart: question.TimeStart,
    TimeEnd: question.TimeEnd,
    Slotid: question.Slotid,
    Status: question.Status,
    SettingStatus: question.SettingStatus,
  });
};

export const updateStatusQuestionSLot = (status: questionSlot) => {
  return axios.put(`QuestionSLot/${status.id}`, {
    UserID: status.UserID,
    QuestionID: status.QuestionID,
    Status: status.Status, //Chỉ Update Status
    content: status.content,
    TimeStart: status.TimeStart,
    TimeEnd: status.TimeEnd,
    Slotid: status.Slotid,
    SettingStatus: status.SettingStatus,
  });
};

export const createAssignmentSlot = (assignment: assignmentSlot) => {
  return axios.post("AssignmentSlot", {
    AssignmentID: assignment.AssignmentID,
    UserID: assignment.UserID,
    title: assignment.title,
    description: assignment.description,
    urlfile: assignment.urlfile,
    TimeStart: assignment.TimeStart,
    TimeEnd: assignment.TimeEnd,
    Slotid: assignment.Slotid,
    Status: assignment.Status,
  });
};

export const updateQuestionSLot = (question: questionSlot) => {
  return axios.put(`QuestionSLot/${question.id}`, {
    id: question.id,
    QuestionID: question.QuestionID,
    UserID: question.UserID,
    content: question.content,
    TimeStart: question.TimeStart,
    TimeEnd: question.TimeEnd,
    Slotid: question.Slotid,
    Status: question.Status,
    SettingStatus: question.SettingStatus,
  });
};

export const updateAssignmentSlot = (assignment: assignmentSlot) => {
  return axios.put(`AssignmentSlot/${assignment.id}`, {
    id: assignment.id,
    AssignmentID: assignment.AssignmentID,
    UserID: assignment.UserID,
    title: assignment.title,
    description: assignment.description,
    urlfile: assignment.urlfile,
    TimeStart: assignment.TimeStart,
    TimeEnd: assignment.TimeEnd,
    Slotid: assignment.Slotid,
    Status: assignment.Status,
  });
};

export const updateStatusAssignmentSlot = (status: assignmentSlot) => {
  return axios.put(`AssignmentSlot/${status.id}`, {
    UserID: status.UserID,
    AssignmentID: status.AssignmentID,
    title: status.title,
    description: status.description,
    urlfile: status.urlfile,
    TimeStart: status.TimeStart,
    TimeEnd: status.TimeEnd,
    Slotid: status.Slotid,
    Status: status.Status, //Chỉ Update Status
  });
};

export const deleteQuestionSlot = (id: string) => {
  return axios.delete(`QuestionSLot/${id}`);
};

export const deleteAssignmentSlot = (id: string) => {
  return axios.delete(`AssignmentSlot/${id}`);
};

//AnswerAssignmentSlot

export const getAnswerAssignmentSlot = () => {
  return axios.get("AnswerAssignmentSlot");
};

export const getAnswerAssignmentSlot2 = (
  userID: string,
  assignmentID: string
) => {
  return axios.get("AnswerAssignmentSlot", {
    params: { UserID: userID, AssignmentID: assignmentID },
  });
};

export const postAnswerAssignmentSlot = (user: answerAssignmentSlot) => {
  return axios.post("AnswerAssignmentSlot", {
    id: user?.id,
    AssignmentID: user?.AssignmentID,
    UserID: user?.UserID,
    urlfile: user?.urlfile,
    score: user?.score,
    Timestamped: new Date().toISOString(),
    Status: user?.Status,
  });
};

export const updateAnswerAssignmentSlot = (user: answerAssignmentSlot) => {
  return axios.put(`AnswerAssignmentSlot/${user.id}`, {
    id: user?.id,
    AssignmentID: user?.AssignmentID,
    UserID: user?.UserID,
    urlfile: user?.urlfile, //Only Update urlfile
    score: user?.score,
    Timestamped: new Date().toISOString(),
    Status: user?.Status,
  });
};

export const updateScoreAssignmentSlot = (user: answerAssignmentSlot) => {
  return axios.put(`AnswerAssignmentSlot/${user.id}`, {
    id: user?.id,
    AssignmentID: user?.AssignmentID,
    UserID: user?.UserID,
    urlfile: user?.urlfile,
    score: user?.score, //Only Update score
    Timestamped: new Date().toISOString(),
    Status: user?.Status,
  });
};

export const deleteAnswerAssignmentSlot = (id: string) => {
  return axios.delete(`AnswerAssignmentSlot/${id}`);
};

// Updating a comment
export const updateComment = (comment: answerQuestionSlot) => {
  return axios.put(`AnswerQuestionSlot/${comment.id}`, {
    comment: comment?.comment,
    QuestionID: comment?.QuestionID,
    UserID: comment?.UserID,
    Replies: comment?.Replies,
    Rating: comment?.Rating,
    Timestamped: new Date().toISOString(),
  });
};

// Deleting a comment along with its replies
export const deleteComment = (id: string) => {
  return axios.delete(`AnswerQuestionSlot/${id}`);
};

export const postReply = async (
  answerID: string,
  replyContent: string,
  userID: string,
  timestamp: string
) => {
  try {
    const response = await axios.post(`Replies`, {
      ReplyContent: replyContent,
      UserID: userID,
      answerID: answerID,
      Timestamped: timestamp,
    });
    return response.data;
  } catch (error) {
    console.error("Error posting reply:", error);
    throw error;
  }
};

export const updateReply = async (replies: replies) => {
  return axios.put(`Replies/${replies?.id}`, {
    ReplyContent: replies?.ReplyContent,
    UserID: replies?.UserID,
    answerID: replies?.answerID,
    Timestamped: new Date().toISOString(),
  });
};

export const deleteReply = async (replies: replies) => {
  return axios.delete(`Replies/${replies.id}`);
};

export const updateRating = (rating: answerQuestionSlot) => {
  return axios.put(`AnswerQuestionSlot/${rating.id}`, {
    comment: rating?.comment,
    QuestionID: rating?.QuestionID,
    UserID: rating?.UserID,
    Replies: rating?.Replies,
    Rating: rating?.Rating,
    Timestamped: new Date().toISOString(),
  });
};

export const getAssignmentSlot = () => {
  return axios.get("AssignmentSlot");
};

export const getAssignmentSlotById = (id: string) => {
  return axios.get(`AssignmentSlot/${id}`);
};
export const getCouseraInLecturers = (cid: any, sid: any, lid: string) => {
  return axios.get(
    `CourseSemester?CourseID=${cid}&SemesterID=${sid}&LecturersID=${lid}`
  );
};

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
  postComment,
  getCourseSemesterByLecturersID,
  getAnswerQuestionSlotByUserId,
};
