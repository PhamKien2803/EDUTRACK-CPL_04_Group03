import { EXAM_SAVE } from "../action/types";

const INITIAL_STATE = {
    exam: {
        id: "",
        time: "",
    },
    userId: ""
};
const examReducer = (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case EXAM_SAVE:

            return {
                ...state,
                exam: {
                    id: action.exid,
                    time: action.time,
                }
                ,
                userId: action.userId
            };
        default: return state;
    }
};

export default examReducer;