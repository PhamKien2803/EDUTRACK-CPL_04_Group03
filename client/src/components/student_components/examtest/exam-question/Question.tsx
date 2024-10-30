import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import '../../../../Sass/QestionQuiz.scss';

interface QuestionData {
    id: string;
    content: string;
    image?: string;
    answer: { id: string; isSelected: boolean }[];
    exId: string;
}

interface Answer {
    id: string;
    content: string;
    isCorrect: boolean;
}

interface Props {
    index: number;
    data: QuestionData;
    answer: Answer[];
    handleCheckbox: (aid: string, qid: string) => void;
}

const Question: React.FC<Props> = ({ index, data, answer, handleCheckbox }) => {
    const handleChecked = (answerId: string) => {
        handleCheckbox(answerId, data.id);
    };

    return (
        <div className="Question-container">
            <div className="title">
                <h5>Question {index + 1}</h5>
            </div>
            <div className="q-content">
                <div className="image">
                    {data.image ? <img src={data.image} alt="question" /> : <div className="img-2"></div>}
                </div>
                <div className="q-description">
                    <h6>{data.content}</h6>
                </div>
                <div className="q-answer">
                    <FormGroup>
                        {data.answer.map((ans, ins) => (
                            <FormControlLabel
                                key={`q-${ins}`}
                                control={
                                    <Checkbox
                                        checked={ans.isSelected}
                                        onChange={() => handleChecked(ans.id)}
                                    />
                                }
                                label={answer.find(item => item.id === ans.id)?.content || 'N/A'}
                            />
                        ))}
                    </FormGroup>
                </div>
            </div>
        </div>
    );
};

export default Question;
