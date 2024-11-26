import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Button, Paper, Modal, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow
} from '@mui/material';
import Swal from 'sweetalert2';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { postAnswerAssignmentSlot, updateAnswerAssignmentSlot, getAnswerAssignmentSlot, getParticipants, deleteAnswerAssignmentSlot, getAssignmentSlot } from "../../../../service/ApiService";
import { answerAssignmentSlot, assignmentSlot, participants } from "../../../../models/Interface";
import { useTranslation } from 'react-i18next';

const Submited: React.FC = () => {
  const { t } = useTranslation();
  const userid = useSelector((state: { account: { account: { UserID: string } } }) => state.account.account.UserID);
  const [searchParams] = useSearchParams();
  const assignmentID = searchParams.get('assignmentid');
  const [file, setFile] = useState<string[] | null>(null);
  const [fileMetadata, setFileMetadata] = useState<File | null>(null);
  const [link, setLink] = useState('');
  const [selection, setSelection] = useState<'file' | 'link'>('file');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timestamp, setTimestamp] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [assignmentSlotID, setAssignmentSlotID] = useState<string | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const [submissionHistory, setSubmissionHistory] = useState<answerAssignmentSlot[]>([]);
  console.log(assignmentSlotID)
  const [currentSubmission, setCurrentSubmission] = useState<answerAssignmentSlot | null>(null);
  const [participants, setParticipants] = useState<participants[]>([]);

  const [assignmentStatus, setAssignmentStatus] = useState<number>(0);

  useEffect(() => {
    const fetchSubmissionHistory = async () => {
      try {
        const res: answerAssignmentSlot[] = await getAnswerAssignmentSlot();
        if (Array.isArray(res)) {
          const response = res.filter((submission) => submission.UserID === userid);
          setSubmissionHistory(response);
        }
      } catch (error) {
        console.error('Error fetching submission history:', error);
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

    const fetchAssignmentStatus = async () => {
      try {
        const res: assignmentSlot[] = await getAssignmentSlot();
        const currentSlot = res.find((slot) => slot.AssignmentID === assignmentID);
        if (currentSlot) setAssignmentStatus(currentSlot.Status);
      } catch (error) {
        console.error('Error fetching assignment slot:', error);
      }
    };

    fetchSubmissionHistory();
    fetchParticipants();
    fetchAssignmentStatus();
  }, [userid]);

  const getUsernameById = (userID: string) => {
    const user = participants.find((participant) => participant.id === userID);
    return user ? user.UserName : "Unknown User";
  };

  // Chuyển base64 sang file
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFile = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64File = reader.result as string;
        const [header, data] = base64File.split(",");
        sessionStorage.setItem("fileHeader", header);
        sessionStorage.setItem("fileData", data);
        setFile([header + "," + data]);
        setFileMetadata(selectedFile);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const openInNewTab = (url: string) => {
    const header = sessionStorage.getItem("fileHeader") || "";
    const data = sessionStorage.getItem("fileData") || "";

    const fullBase64 = header && data ? `${header},${data}` : url;

    if (fullBase64.startsWith("data:")) {
      const newTab = window.open();
      if (newTab) {
        newTab.document.write(
          `<iframe src="${fullBase64}" frameborder="0" style="width:100%;height:100%;"></iframe>`
        );
      } else {
        alert("Failed to open a new tab. Please allow pop-ups for this site.");
      }
    } else {
      alert("Invalid Base64 data.");
    }
  };

  const handleSubmitAssignment = async () => {

    if (!file && !link) {
      Swal.fire({
        icon: 'error',
        title: t("submission_error"),
        text: t("submission_error_message"),
      });
      return;
    }

    const submissionTimestamp = new Date().toISOString();
    const newID = 'as' + Math.floor(100 + Math.random() * 900);
    const formData: answerAssignmentSlot = {
      id: newID,
      AssignmentID: assignmentID || '',
      UserID: userid,
      urlfile: file ? file[0] : link,
      score: 0,
      Timestamped: submissionTimestamp,
      Status: assignmentStatus === 2 ? 2 : 1, // Ghi lại trạng thái nếu trễ
    };

    try {
      await postAnswerAssignmentSlot(formData);
      setIsSubmitted(true);
      setTimestamp(submissionTimestamp);
      setAssignmentSlotID(newID);
      setScore(0);
      setSubmissionHistory((prevHistory) => [...prevHistory, formData]);
      Swal.fire({
        icon: 'success',
        title: t("submission_success"),
        // text: 'Your assignment has been submitted successfully.',
        text: assignmentStatus === 2 ? t("late_submission_message") : t("submission_success_message"),
      });
    } catch (error) {
      console.error('Error submitting assignment:', error);
    }
  };

  const handleOpenUpdateModal = (submission: answerAssignmentSlot) => {
    setCurrentSubmission(submission);
    setFile([submission.urlfile]); // set base64 cho file
    setLink(submission.urlfile);  // set link cho file
    setSelection('link');
    setIsModalOpen(true);
  };

  const handleUpdateAssignment = async () => {
    if (!file && !link) {
      Swal.fire({
        icon: 'error',
        title: t("update_error"),
        text: t("update_error_message"),
      });
      return;
    }

    if ((file || link) && currentSubmission) {
      const updatedFormData: answerAssignmentSlot = {
        ...currentSubmission,
        urlfile: file ? file[0] : link,
        Timestamped: new Date().toISOString(),
      };

      try {
        await updateAnswerAssignmentSlot(updatedFormData);
        setIsModalOpen(false);
        setSubmissionHistory((prevHistory) =>
          prevHistory.map((submission) =>
            submission.id === updatedFormData.id ? updatedFormData : submission
          )
        );
        Swal.fire({
          icon: 'success',
          title: t("updated_success"),
          text: t("updated_success_message"),
        });
      } catch (error) {
        console.error('Error updating assignment:', error);
      }
    }
  };

  // Handle deleting a submission
  const handleDeleteAssignment = async (submissionID: string) => {
    const result = await Swal.fire({
      title: t("delete_confirmation"),
      text: t("delete_confirmation_message"),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: t("delete"),
    });
    if (result.isConfirmed) {
      try {
        await deleteAnswerAssignmentSlot(submissionID);
        setSubmissionHistory((prevHistory) => prevHistory.filter((submission) => submission.id !== submissionID));
        Swal.fire({
          icon: 'success',
          title: t("delete_success"),
          text: t("delete_success_message"),
        });
      } catch (error) {
        console.error('Error deleting assignment:', error);
      }
    }
  };

  return (
    <Box sx={{ maxWidth: 850, mx: 'auto', mt: 4 }}>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Paper elevation={2} sx={{ flex: 1, p: 2, textAlign: 'center' }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{t("submission_status")}</Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            
            {assignmentStatus === 2 ? t("late_submission") : isSubmitted ? t("submitted") : t("not_submitted")}

          </Typography>
        </Paper>
        <Paper elevation={2} sx={{ flex: 1, p: 2, textAlign: 'center' }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{t("submission_time")}</Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            {timestamp ? new Date(timestamp).toLocaleString('en-US', { timeZone: 'Asia/Bangkok' }) : '(GMT+07)'}
          </Typography>
        </Paper>
        <Paper elevation={2} sx={{ flex: 1, p: 2, textAlign: 'center' }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{t("link_file_assignment")}</Typography>
          <Box sx={{ mt: 2 }}>
            {selection === 'file' && !isSubmitted && (
              <Button variant="contained" color="primary" component="label" sx={{ fontSize: '1rem', py: 1.5, width: '100%' }}>
                {t("choose_file")}
                <input type="file" hidden onChange={handleFileUpload} />
              </Button>
            )}
            {file && (
              <Typography sx={{ mt: 2, fontSize: '0.9rem' }}>
                <strong>{t("file_upload")}:</strong> {fileMetadata ? fileMetadata.name : 'No file selected'}
              </Typography>
            )}
          </Box>
        </Paper>
        <Paper elevation={2} sx={{ flex: 1, p: 2, textAlign: 'center' }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{t("your_score")}</Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            {score !== null ? score : 'Not graded yet'}
          </Typography>
        </Paper>
      </Box>

      <Box sx={{ mt: 3 }}>
        <Button
          variant="outlined"
          color="secondary"
          sx={{ fontWeight: 'bold', fontSize: '1rem', py: 1.2, px: 3 }}
          onClick={handleSubmitAssignment}
        >
          {t("submit_assignment")}
        </Button>
      </Box>

      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Box sx={{ ...modalStyle }}>
          <Typography variant="h6" sx={{ mb: 2 }}>{t("update_submission")}</Typography>
          <Button variant="contained" component="label" color="primary" fullWidth>
            {t("choose_file")}
            <input type="file" hidden onChange={handleFileUpload} />
          </Button>
          <Button variant="contained" sx={{ mt: 2 }} color="secondary" onClick={handleUpdateAssignment}>
            {t("update_assignment")}
          </Button>
        </Box>
      </Modal>


      {submissionHistory.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>{t("submission_history")}</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{t("student_name")}</TableCell>
                  <TableCell>{t("link_file")}</TableCell>
                  <TableCell>{t("score")}</TableCell>
                  <TableCell>{t("submission_time_column")}</TableCell>
                  {assignmentStatus !== 2 && <TableCell>{t("actions")}</TableCell>}
                </TableRow>
              </TableHead>
              <TableBody>
                {submissionHistory?.map((submission) => (
                  <TableRow key={submission?.id}>
                    <TableCell>{getUsernameById(submission?.UserID)}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => openInNewTab(submission?.urlfile)}
                      >
                        {t("your_assign")}
                      </Button>
                    </TableCell>
                    <TableCell>{submission?.score}</TableCell>
                    <TableCell>
                      {new Date(submission?.Timestamped).toLocaleString('en-US', { timeZone: 'Asia/Bangkok' })}
                    </TableCell>


                    {assignmentStatus !== 2 && (
                      <TableCell>
                        <Button variant="outlined" color="error" onClick={() => handleDeleteAssignment(submission?.id)}>
                          {t("delete")}
                        </Button>
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={() => handleOpenUpdateModal(submission)}
                        >
                          {t("update")}
                        </Button>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>

          </TableContainer>
        </Box>
      )}
    </Box>
  );
};

export default Submited;

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};
