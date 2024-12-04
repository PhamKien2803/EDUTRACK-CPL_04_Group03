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
    Menu,
    MenuItem,
    Modal,
    Paper,
    Stack,
    TextField,
    ThemeProvider,
    Typography,
    createTheme,
    useTheme
} from "@mui/material";
import { styled } from "@mui/system";
import { arrayUnion, collection, doc, getDoc, getDocs, onSnapshot, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import React, { useContext, useEffect, useRef, useState } from "react";
import { IoSearch, IoSend } from "react-icons/io5";
import { db } from "../../Config/firebase";
import { AppContext } from "../../context/AppContext";
import { participants } from '../../models/Interface';
import { getParticipants } from '../../service/ApiService';
import CircularProgress from '@mui/material/CircularProgress';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';

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
    const [opens, setOpen] = useState(false);

    const [anchorEl, setAnchorEl] = useState(null); // Điều khiển menu màu nền
    const [chatBackgroundColor, setChatBackgroundColor] = useState("#ffffff");

    const messagesEndRef = useRef(null);

    // Xử lý click vào icon cài đặt để mở menu màu
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleColorChange = (color) => {
        setChatBackgroundColor(color);
        handleClose(); // Đóng menu khi đã chọn màu
    };

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

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
                    console.log(querySnap.docs[0].data().id);

                    if (chatData.find(e => e.rID !== querySnap.docs[0].data().id)) {
                        setUser(querySnap.docs[0].data());
                    }

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
            handleChangeOpen()
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
            <Box display="flex" alignItems="center" sx={{ gap: 1, mb: 2 }}>
                <TextField
                    fullWidth
                    placeholder="Search contacts"
                    size="small"
                    variant="outlined"
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '12px',
                            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                        },
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <IoSearch style={{ color: '#00796b' }} />
                            </InputAdornment>
                        ),
                    }}
                />
                <IconButton
                    aria-label="Add contact"
                    sx={{
                        width: '40px',
                        height: '40px',
                        backgroundColor: '#e0f7fa',
                        color: '#00796b',
                        '&:hover': { backgroundColor: '#b2ebf2' },
                    }}
                    onClick={handleChangeOpen}
                >
                    <PersonAddIcon />
                </IconButton>
            </Box>
            <Stack spacing={2}>
                {chatData.map((item, index) => (
                    <Box
                        key={index}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                            cursor: 'pointer',
                            p: 2,
                            borderRadius: '16px',
                            backgroundColor: item.messageSeen ? '#ffffff' : '#f9fbe7',
                            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                            '&:hover': {
                                backgroundColor: item.messageSeen ? 'rgba(0, 0, 0, 0.05)' : '#f1f8e9',
                                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                            },
                            transition: 'background-color 0.3s, box-shadow 0.3s',
                            position: 'relative',
                        }}
                        onClick={() => setChat(item)}
                    >
                        {partticipaint.find((p) => p.uid === item.userData.id)?.Image ? (
                            <Avatar
                                src={partticipaint.find((p) => p.uid === item.userData.id)?.Image}
                                sx={{ width: 48, height: 48, transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.1)' } }}
                            />
                        ) : (
                            <Avatar
                                sx={{
                                    width: 48,
                                    height: 48,
                                    backgroundColor: '#ffcc80',
                                    fontWeight: 'bold',
                                    fontSize: '1.25rem',
                                    transition: 'transform 0.3s',
                                    '&:hover': { transform: 'scale(1.1)' },
                                }}
                            >
                                {item.userData.name.charAt(0).toUpperCase()}
                            </Avatar>
                        )}
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                            <Typography
                                variant="subtitle1"
                                fontWeight="600"
                                sx={{
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    color: '#37474f',
                                }}
                            >
                                {partticipaint.find((p) => p.uid === item.userData.id)?.UserName || item.userData.name}
                            </Typography>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                }}
                            >
                                {item.lastMessage.length > 15 ? (
                                    <>{item.lastMessage.substring(0, 15)}...</>
                                ) : (
                                    item.lastMessage
                                )}
                            </Typography>
                        </Box>
                        {!item.messageSeen && (
                            <FiberManualRecordIcon
                                sx={{
                                    fontSize: 14,
                                    color: '#e53935',
                                    position: 'absolute',
                                    right: 16,
                                }}
                            />
                        )}
                    </Box>
                ))}
            </Stack>
        </>
    );



    return (
        <>
            {loading ? (
                <CircularProgress />
            ) : (
                <Dialog
                    fullScreen
                    open={open}
                    onClose={toggleModal}
                    sx={{
                        '& .MuiDialog-paper': {
                            width: '70%',
                            borderRadius: 2,
                            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                            overflow: 'hidden',
                        },
                    }}
                >
                    <DialogTitle
                        sx={{
                            backgroundColor: '#7e57c2',
                            color: '#ffffff',
                            fontWeight: 'bold',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: 2,
                        }}
                    >
                        Chat Application
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <IconButton
                                onClick={handleClick}
                                sx={{
                                    backgroundColor: '#ffffff',
                                    color: '#1976d2',
                                    '&:hover': { backgroundColor: '#e3f2fd' },
                                }}
                            >
                                <SettingsSuggestIcon />
                            </IconButton>
                            <Button
                                onClick={toggleModal}
                                sx={{
                                    backgroundColor: '#ffffff',
                                    color: '#1976d2',
                                    '&:hover': { backgroundColor: '#e3f2fd' },
                                }}
                            >
                                Close
                            </Button>
                        </Box>
                    </DialogTitle>

                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem
                            sx={{ backgroundColor: '#FFEB3B', borderRadius: '8px', margin: '5px' }}
                            onClick={() => handleColorChange('#FFEB3B')}
                        >
                            <Typography variant="body2">Yellow</Typography>
                        </MenuItem>
                        <MenuItem
                            sx={{ backgroundColor: '#8BC34A', borderRadius: '8px', margin: '5px' }}
                            onClick={() => handleColorChange('#8BC34A')}
                        >
                            <Typography variant="body2">Green</Typography>
                        </MenuItem>
                        <MenuItem
                            sx={{ backgroundColor: '#64B5F6', borderRadius: '8px', margin: '5px' }}
                            onClick={() => handleColorChange('#64B5F6')}
                        >
                            <Typography variant="body2">Blue</Typography>
                        </MenuItem>
                        <MenuItem
                            sx={{ backgroundColor: '#FF7043', borderRadius: '8px', margin: '5px' }}
                            onClick={() => handleColorChange('#FF7043')}
                        >
                            <Typography variant="body2">Orange</Typography>
                        </MenuItem>
                    </Menu>

                    <DialogContent>
                        <ThemeProvider theme={customTheme}>
                            <CssBaseline />
                            <Container
                                maxWidth="lg"
                                sx={{
                                    width: '100%',
                                    height: '90vh',
                                    padding: { xs: 0, md: 2 },
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 2,
                                }}
                            >
                                <StyledChatContainer>
                                    <SidePanel elevation={2} sx={{ borderRadius: 2, backgroundColor: '#f5f5f5' }}>
                                        {contactsList}
                                    </SidePanel>

                                    {chatUser ? (
                                        <ChatArea
                                            elevation={2}
                                            sx={{
                                                borderRadius: 2,
                                                backgroundColor: chatBackgroundColor,
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    mb: 2,
                                                    p: 2,
                                                    borderBottom: '1px solid #e0e0e0',
                                                }}
                                            >
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                    {partticipaint.find((p) => p.uid === chatUser.userData.id)?.Image ? (
                                                        <Avatar
                                                            src={partticipaint.find((p) => p.uid === chatUser.userData.id)?.Image}
                                                        />
                                                    ) : (
                                                        <Avatar
                                                            sx={{
                                                                backgroundColor: '#64b5f6',
                                                                color: '#ffffff',
                                                            }}
                                                        >
                                                            {chatUser.userData.name.charAt(0).toUpperCase()}
                                                        </Avatar>
                                                    )}
                                                    <Typography variant="h6" fontWeight="bold">
                                                        {partticipaint.find((p) => p.uid === chatUser.userData.id)?.UserName}
                                                    </Typography>
                                                    {Date.now() - chatUser.userData.lastSeen < 300000 && (
                                                        <FiberManualRecordIcon sx={{ fontSize: 17 }} color="success" />
                                                    )}
                                                </Box>
                                            </Box>

                                            <Box
                                                sx={{
                                                    flex: 1,
                                                    overflowY: 'auto',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    gap: 2,
                                                    p: 2,
                                                }}
                                            >
                                                {messages.map((message, index) => (
                                                    <MessageContainer key={index} sent={message.sId === userData.id}>
                                                        <MessageBubble
                                                            sent={message.sId === userData.id}
                                                            sx={{
                                                                borderRadius: '12px',
                                                                padding: 1,
                                                                backgroundColor: message.sId === userData.id ? '#3949ab' : '#f5f5f5',
                                                            }}
                                                        >
                                                            <Typography variant="body1">{message.text}</Typography>
                                                            <Typography
                                                                variant="caption"
                                                                sx={{ display: 'block', mt: 0.5, opacity: 0.7 }}
                                                            >
                                                                {convertTimestamp(message.createdAt)}
                                                            </Typography>
                                                        </MessageBubble>
                                                    </MessageContainer>
                                                ))}
                                                <div ref={messagesEndRef}></div>
                                            </Box>

                                            <Box sx={{ display: 'flex', gap: 1, p: 2 }}>
                                                <TextField
                                                    fullWidth
                                                    placeholder="Type a message"
                                                    value={input}
                                                    onChange={(e) => setInput(e.target.value)}
                                                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                                                    sx={{
                                                        borderRadius: 2,
                                                        '& .MuiOutlinedInput-root': {
                                                            borderRadius: '12px',
                                                        },
                                                    }}
                                                />
                                                <IconButton
                                                    color="primary"
                                                    onClick={() => sendMessage()}
                                                    aria-label="send message"
                                                    sx={{
                                                        backgroundColor: '#1976d2',
                                                        color: '#ffffff',
                                                        '&:hover': { backgroundColor: '#1565c0' },
                                                    }}
                                                >
                                                    <IoSend />
                                                </IconButton>
                                            </Box>
                                        </ChatArea>
                                    ) : (
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                color: '#757575',
                                                fontSize: '1.25rem',
                                                fontWeight: 'bold',
                                                backgroundColor: '#f5f5f5',
                                                borderRadius: 2,
                                            }}
                                        >
                                            <span style={{ marginLeft: "2erm" }}>Start a conversation by selecting a contact!</span>
                                        </Box>
                                    )}
                                </StyledChatContainer>
                            </Container>
                        </ThemeProvider>
                    </DialogContent>
                    <Modal open={opens} onClose={handleChangeOpen}>
                        <Box sx={{ ...style, borderRadius: 2, backgroundColor: "#ffffff", p: 3 }}>
                            <TextField variant="standard" fullWidth placeholder="Enter The Email" onChange={(e) => inputHandler(e)} />
                            {showSearch && user &&
                                <Box

                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 2,
                                        cursor: 'pointer',
                                        p: 2,
                                        borderRadius: '16px',
                                        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                                        '&:hover': {
                                            backgroundColor: 'rgba(0, 0, 0, 0.05)',
                                            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                                        },
                                        transition: 'background-color 0.3s, box-shadow 0.3s',
                                        position: 'relative',
                                    }}
                                    onClick={addChat}

                                >
                                    <Avatar
                                        sx={{
                                            backgroundColor: '#64b5f6',
                                            color: '#ffffff',
                                        }}
                                    >
                                        {user.name.charAt(0).toUpperCase()}
                                    </Avatar>
                                    <Typography>{user.name}</Typography>
                                </Box>}
                        </Box>
                    </Modal>
                </Dialog>
            )}
        </>
    );


};

export default ChatUI;