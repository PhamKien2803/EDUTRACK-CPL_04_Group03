import { EXAM_SAVE } from "./types";

interface Data {
    id: string;
    content: string;
    image: string;
    answer: { id: string; isSelected: boolean }[];
    exId: string;
}

export const saveDoingExam = (time: any, exID: any, userId: any) => {
    console.log(exID, time, userId);

    return {
        type: EXAM_SAVE,
        exid: exID,
        time: time,
        userId: userId
    }

}