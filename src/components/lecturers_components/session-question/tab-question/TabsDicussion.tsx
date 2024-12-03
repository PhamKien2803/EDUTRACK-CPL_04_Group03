import { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Comment from './../comment-question/Comment';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { answerQuestionSlot, participants } from '../../../../models/Interface';
import { getAnswerQuestionSlot, getParticipants } from '../../../../service/ApiService';
import { useTranslation } from 'react-i18next';

function TabsDicussion() {
  const userid = useSelector((state: { account: { account: { UserID: string } } }) => state.account.account.UserID);
  const [searchParams] = useSearchParams();
  const questionID = searchParams.get("questionId");
  const [answerQuestionSlots, setAnswerQuestionSlots] = useState<answerQuestionSlot[]>([]);
  const [participants, setParticipants] = useState<participants[]>([]);

  const [value, setValue] = useState<string>('one');
  const [loading, setLoading] = useState<boolean>(false);
  const { t } = useTranslation();
  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setLoading(true);
    setValue(newValue);

    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    fetchAnswerQuestionSlot();
    fetchParticipants();
  }, [userid]);

  const fetchAnswerQuestionSlot = async () => {
    try {
      const res: answerQuestionSlot[] = await getAnswerQuestionSlot();
      setAnswerQuestionSlots(res);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchParticipants = async () => {
    try {
      const res: participants[] = await getParticipants();
      setParticipants(res);
    } catch (error) {
      console.log(error);
    }
  };

  const getUsernameById = (userID: string) => {
    const user = participants.find((participant) => participant.id === userID);
    return user ? user.UserName : t('Unknown User', { defaultValue: 'Unknown User' });
  };

  const filterCommentQuestion = answerQuestionSlots.filter(
    (comment) => comment?.QuestionID === questionID
  );
  console.log(filterCommentQuestion);

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs style={{ margin: '20px' }}
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
      >
        <Tab value="one" label={t('Discussion', { defaultValue: 'Discussion' })} />
        <Tab value="two" label={t('Score', { defaultValue: 'Score' })} />
        <Tab value="three" label={t('Message to student', { defaultValue: 'Message to student' })} />
      </Tabs>

      {loading && <LinearProgress color="secondary" />}

      {!loading && value === 'one' && filterCommentQuestion.map((comment) => (
        <Box key={comment.id} sx={{ marginTop: '20px' }}>
          <Comment
            userIds={comment?.UserID}
            username={getUsernameById(comment?.UserID)}
            rating={comment?.Rating}
            text={comment?.comment}
            questionID={comment?.QuestionID}
            timestamp={comment?.Timestamped}
            answerId={comment?.id} />
        </Box>
      ))}
    </Box>
  );
}

export default TabsDicussion;
