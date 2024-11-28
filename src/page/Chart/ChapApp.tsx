import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import {
    Avatar,
    Box,
    Button,
    Card,
    Container,
    CssBaseline,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    InputAdornment,
    Modal,
    Paper,
    Stack,
    TextField,
    ThemeProvider,
    Typography,
    createTheme,
    useMediaQuery,
    useTheme
} from "@mui/material";
import { styled } from "@mui/system";
import { arrayUnion, collection, doc, getDoc, getDocs, onSnapshot, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { IoSearch, IoSend } from "react-icons/io5";
import { db } from "../../Config/firebase";
import { AppContext } from "../../context/AppContext";
import { participants } from '../../models/Interface';
import { getParticipants } from '../../service/ApiService';
import { log } from 'console';
import { ModalAddChat } from './ModalAddChat';
import CircularProgress from '@mui/material/CircularProgress';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const StyledChatContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    height: "90vh",
    gap: 2,
    padding: theme.spacing(2),
    backgroundColor: theme.palette.mode === "dark" ? "#1a1a1a" : "#f5f5f5",
    [theme.breakpoints.down("md")]: {
        padding: theme.spacing(1),
        height: "calc(100vh - 70px)",
    },
}));

const SidePanel = styled(Paper)(({ theme }) => ({
    width: "300px",
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
    backgroundColor: theme.palette.mode === "dark" ? "#2d2d2d" : "#ffffff",
    [theme.breakpoints.down("md")]: {
        width: "100%",
    },
}));

const ChatArea = styled(Paper)(({ theme }) => ({
    flex: 1,
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
    backgroundColor: theme.palette.mode === "dark" ? "#2d2d2d" : "#ffffff",
}));

const MessageContainer = styled(Box)(({ sent }) => ({
    display: "flex",
    justifyContent: sent ? "flex-end" : "flex-start",
    marginBottom: "8px",
}));

const MessageBubble = styled(Card)(({ theme, sent }) => ({
    maxWidth: "70%",
    padding: "12px 16px",
    backgroundColor: sent
        ? theme.palette.mode === "dark" ? "#0d47a1" : "#1976d2"
        : theme.palette.mode === "dark" ? "#424242" : "#fff",
    color: sent ? "#fff" : theme.palette.mode === "dark" ? "#fff" : "inherit",
    borderRadius: "16px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    transition: "transform 0.2s",
    "&:hover": {
        transform: "scale(1.02)",
    },
}));

interface Props {
    open: boolean,
    toggleModal: () => void
}
const ChatUI: React.FC<Props> = ({ open, toggleModal }) => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [mode, setMode] = useState("light");
    const theme = useTheme();
    const [partticipaint, setParticipant] = useState<participants[]>([])
    const { userData, chatData, messageId, setMessageId, chatUser, setChatUser, messages, setMessages } = useContext(AppContext);
    const [user, setUser] = useState(null);
    const [showSearch, setShowSearch] = useState(true);
    const [loading, setLoadding] = useState(true);
    const [input, setInput] = useState("");
    const [image, setImage] = useState('');
    const [opens, setOpen] = React.useState(false);
    const handleChangeOpen = () => {
        setOpen(!opens);
        setShowSearch(false)
    }

    useEffect(() => {
        fetchParticipaint();
    }, [])

    const fetchParticipaint = async () => {
        const res = await getParticipants();
        if (Array.isArray(res)) {
            setParticipant(res)
        }
    }

    useEffect(() => {
        if (chatData && userData && partticipaint) {
            setLoadding(false)
        }
        if (messageId) {
            const unSub = onSnapshot(doc(db, 'messages', messageId), res => {
                setMessages(res.data().message)
                console.log(res.data().message);
            })
        }
    }, [chatData, userData, messageId, partticipaint])

    const inputHandler = async (e) => {
        try {
            const input = e.target.value;
            if (input) {
                setShowSearch(true);
                const userRef = collection(db, 'users');
                const q = query(userRef, where("username", "==", input.toLowerCase()));
                const querySnap = await getDocs(q);
                if (!querySnap.empty && userData && querySnap.docs[0].data().id !== userData.id) {
                    let userExit = false;
                    setUser(querySnap.docs[0].data());
                } else {
                    setUser(null);
                }
            } else {
                setShowSearch(false)
            }

        }
        catch (error) {
            console.log(error);
        }
    }

    const addChat = async () => {
        try {
            if (!user || !user.id || !userData) {
                console.error("User data or recipient is invalid.");
                return;
            }

            // Create a new message document
            const newMessageRef = doc(collection(db, 'messages'));
            await setDoc(newMessageRef, {
                createAt: serverTimestamp(),
                message: [],
            });
            console.log("New message created with ID:", newMessageRef.id);

            // Define chat references
            const chatRef1 = doc(db, 'chats', userData.id);
            const chatRef2 = doc(db, 'chats', user.id);


            // Chat data to be added
            const chatData = {
                messageId: newMessageRef.id,
                lastMessage: "",
                rID: user.id,
                updateAt: Date.now(),
                messageSeen: true,
            };

            // Update both user's chat references
            await updateDoc(chatRef1, { chatsData: arrayUnion(chatData) });
            await updateDoc(chatRef2, {
                chatsData: arrayUnion({
                    ...chatData,
                    rID: userData.id,
                }),
            });
            setInput('')
            console.log("Chat added successfully.");
        } catch (error) {
            console.error("Error in addChat:", error);
        }
    };



    const setChat = async (item) => {
        setMessageId(item.messageId);
        setChatUser(item)
        if (item.messageSeen == false) {
            try {
                const userChatRef = doc(db, 'chats', userData.id)
                const userChatsSnapShot = await getDoc(userChatRef);
                const userChatsData = userChatsSnapShot.data();
                const chatIndex = userChatsData.chatsData.findIndex(c => c.messageId === item.messageId)
                userChatsData.chatsData[chatIndex].messageSeen = true;
                console.log(userChatsData.chatsData);
                await updateDoc(userChatRef, {
                    chatsData: userChatsData.chatsData
                })
            } catch (error) {
                console.log(error);
            }



        }


    }

    const sendMessage = async () => {
        try {
            if (!input || !messageId) {
                console.log("No message content or message ID available.");
                return;
            }

            const messageRef = doc(db, "messages", messageId);

            await updateDoc(messageRef, {
                message: arrayUnion({
                    sId: userData.id,
                    text: input,
                    createdAt: new Date(),
                }),
            });

            const userIDs = [chatUser.rID, userData.id];
            for (const id of userIDs) {
                const userChatRef = doc(db, "chats", id);
                const userChatSnapShot = await getDoc(userChatRef);

                if (userChatSnapShot.exists()) {
                    const userChatData = userChatSnapShot.data();
                    const chatIndex = userChatData.chatsData.findIndex(
                        (c) => c.messageId === messageId
                    );

                    if (chatIndex !== -1) {

                        userChatData.chatsData[chatIndex].lastMessage = input.substring(0, 30);
                        userChatData.chatsData[chatIndex].updatedAt = Date.now();
                        if (userChatData.chatsData[chatIndex].rID === userData.id) {
                            userChatData.chatsData[chatIndex].messageSeen = false;
                        }
                        await updateDoc(userChatRef, {
                            chatsData: userChatData.chatsData,
                        });
                    }
                }
            }


            setInput("");
        } catch (error) {
            console.error("Error sending message: ", error);
        }
    };

    const convertTimestamp = (time) => {
        const date = time.toDate();

        const hours = date.getHours();
        const minutes = date.getMinutes();
        if (hours > 12) {
            return `${hours}:${minutes} PM`;
        } else {
            return `${hours}:${minutes} AM`;
        }

    };


    const customTheme = createTheme({
        palette: {
            mode: mode,
        },
    });




    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const contactsList = (
        <>
            <Box display={'flex'} alignItems="center">
                <TextField
                    fullWidth
                    placeholder="Search contacts"
                    size="small"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <IoSearch />
                            </InputAdornment>
                        ),
                    }}
                />
                <IconButton aria-label="Add contact" sx={{ width: '30px' }} onClick={handleChangeOpen}>
                    <PersonAddIcon />
                </IconButton>
            </Box>
            <Stack spacing={2}>

                {chatData.map((item, index) => (
                    item.messageSeen ?
                        <Box
                            key={index}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                                cursor: "pointer",
                                p: 1,
                                borderRadius: 1,
                                "&:hover": { backgroundColor: theme.palette.action.hover },
                            }}
                            onClick={() => setChat(item)}
                        >
                            {partticipaint.find(p => p.uid == item.userData.id)?.Image ?
                                <Avatar src={partticipaint.find(p => p.uid == item.userData.id)?.Image} sx={{ marginRight: '10px' }}></Avatar> :
                                <Avatar sx={{ marginRight: '10px' }}>{item.userData.name.charAt(0).toUpperCase()}</Avatar>
                            }
                            <Box>
                                <Typography variant="subtitle1" fontWeight="bold">
                                    {partticipaint.find(p => p.uid == item.userData.id)?.UserName}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {item.lastMessage.length > 15 ? <>{item.lastMessage.substring(0, 15)}...</> : item.lastMessage}

                                </Typography>
                            </Box>
                        </Box> :
                        <Box
                            key={index}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                                cursor: "pointer",
                                p: 1,
                                borderRadius: 1,
                                "&:hover": { backgroundColor: theme.palette.action.hover },
                                position: "relative"
                            }}
                            onClick={() => setChat(item)}
                        >
                            {item.userData.avatar ? <Avatar src={item.userData.avatar} sx={{ marginRight: '10px' }}></Avatar> :
                                <Avatar sx={{ marginRight: '10px' }}>{item.userData.name.charAt(0).toUpperCase()}</Avatar>
                            }
                            <Box >
                                <Typography variant="subtitle1" fontWeight="bold">
                                    {item.userData.name}
                                </Typography>

                                <Typography variant="body2" >
                                    {item.lastMessage.length > 15 ? <>{item.lastMessage.substring(0, 15)}...</> : item.lastMessage}
                                </Typography>


                            </Box>
                            <FiberManualRecordIcon sx={{ fontSize: 17, position: "absolute", right: 0 }} color="error" />
                        </Box>
                ))
                }
            </Stack>
        </>
    );
    return (
        <>
            {loading ? <CircularProgress /> :
                <Dialog fullScreen open={open} onClose={toggleModal}
                    sx={{
                        "& .MuiDialog-paper": {
                            width: "66.666%",
                            height: "auto",
                        },
                    }}>
                    <DialogTitle>
                        Chat Application
                        <Button onClick={toggleModal} sx={{ float: "right" }}>
                            Close
                        </Button>
                    </DialogTitle>
                    <DialogContent>
                        <ThemeProvider theme={customTheme}>
                            <CssBaseline />
                            <Container maxWidth="lg"
                                sx={{
                                    width: "100%",
                                    height: "90vh", // Chiều cao giới hạn
                                    padding: { xs: 0, md: 2 },
                                }}>
                                <StyledChatContainer>

                                    <SidePanel elevation={2}>{contactsList}</SidePanel>

                                    {chatUser ? <ChatArea elevation={2}>
                                        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                                            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>

                                                {partticipaint.find(p => p.uid == chatUser.userData.id)?.Image ? <Avatar src={partticipaint.find(p => p.uid == chatUser.userData.id)?.Image} sx={{ marginRight: '10px' }}></Avatar> :
                                                    <Avatar sx={{ marginRight: '10px' }}>{chatUser.userData.name.charAt(0).toUpperCase()}</Avatar>
                                                }
                                                <Typography variant="h6">{partticipaint.find(p => p.uid == chatUser.userData.id)?.UserName}</Typography>
                                                {
                                                    Date.now() - chatUser.userData.lastSeen < 300000 ? (  // 5 minutes 
                                                        <FiberManualRecordIcon sx={{ fontSize: 17 }} color="success" />
                                                    ) : null
                                                }
                                            </Box>
                                        </Box>
                                        <Box
                                            sx={{
                                                flex: 1,
                                                overflowY: "auto",
                                                display: "flex",
                                                flexDirection: "column",
                                                gap: 1,
                                                mb: 2,
                                                p: 1,
                                            }}
                                        >
                                            {messages.map((message, index) => (

                                                <MessageContainer key={index} sent={message.sId == userData.id}>
                                                    <MessageBubble sent={message.sId == userData.id}>
                                                        <Typography variant="body1">{message.text}</Typography>
                                                        <Typography
                                                            variant="caption"
                                                            sx={{ display: "block", mt: 0.5, opacity: 0.7 }}
                                                        >
                                                            {convertTimestamp(message.createdAt)}
                                                        </Typography>
                                                    </MessageBubble>
                                                </MessageContainer>
                                            ))}
                                        </Box>

                                        <Box sx={{ display: "flex", gap: 1 }}>
                                            <TextField
                                                fullWidth
                                                placeholder="Type a message"
                                                value={input}
                                                onChange={e => setInput(e.target.value)}
                                                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                                            />
                                            <IconButton
                                                color="primary"
                                                sx={{ width: '80px' }}
                                                onClick={() => sendMessage()}
                                                aria-label="send message"
                                            >
                                                <IoSend />
                                            </IconButton>
                                        </Box>
                                    </ChatArea> : <>hello</>}
                                </StyledChatContainer>
                            </Container>
                        </ThemeProvider>
                    </DialogContent>
                    <Modal
                        open={opens}
                        onClose={handleChangeOpen}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <TextField
                                variant="standard"
                                fullWidth
                                placeholder='Enter The Email'
                                onChange={(e) => inputHandler(e)}
                            />
                            {showSearch && user ? (
                                <Box

                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 2,
                                        cursor: "pointer",
                                        p: 1,
                                        borderRadius: 1,
                                        "&:hover": { backgroundColor: theme.palette.action.hover },
                                    }}
                                    onClick={() => addChat()}
                                >
                                    {partticipaint.find(p => p.uid == user.id)?.Image ? <Avatar sx={{ marginRight: '10px' }} src={partticipaint.find(p => p.uid == user.id)?.Image}>
                                    </Avatar> : <Avatar sx={{ marginRight: '10px' }}>
                                        {user?.name?.charAt(0).toUpperCase()}
                                    </Avatar>}
                                    <Box>
                                        <Typography variant="subtitle1" fontWeight="bold">
                                            {user?.name || 'Unknown'}
                                        </Typography>

                                    </Box>
                                </Box>
                            ) : <>Not found</>}
                        </Box>
                    </Modal>
                </Dialog>}
        </>

    );
};

export default ChatUI;