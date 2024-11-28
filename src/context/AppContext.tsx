import { getDoc, doc, updateDoc, onSnapshot } from 'firebase/firestore';
import React, { createContext, useEffect, useState } from 'react';
import { auth, db } from '../Config/firebase';
import { useNavigate } from 'react-router-dom';

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);
    const [chatData, setChatData] = useState([]);
    const [messageId, setMessageId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [chatUser, setChatUser] = useState(null);


    const navigate = useNavigate();

    const loadUserData = async (uid: string) => {
        try {
            const userRef = doc(db, 'users', uid);
            const userSnap: any = await getDoc(userRef);

            const userData = userSnap.data();
            setUserData(userData);

            await updateDoc(userRef, { lastSeen: Date.now() });

            const intervalId = setInterval(async () => {
                if (auth.chatUser) {
                    await updateDoc(userRef, { lastSeen: Date.now() });
                }
            }, 60000);

            return () => clearInterval(intervalId);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    useEffect(() => {
        if (!userData) return;
        console.log(userData);
        const chatRef = doc(db, 'chats', userData.id);
        const unSub = onSnapshot(chatRef, async (res) => {
            try {

                const chatItem = res.data()?.chatsData || [];
                console.log('chatIten', userData.id);
                const tempData = await Promise.all(chatItem.map(async (item) => {
                    const userRef = doc(db, 'users', item.rID);
                    const userSnap = await getDoc(userRef);
                    return { ...item, userData: userSnap.data() };
                }));
                setChatData(tempData.sort((a, b) => b.updatedAt - a.updatedAt));
                console.log('data', tempData);
            } catch (error) {
                console.error('Error fetching chat data:', error);
            }
        });

        return () => unSub();
    }, [userData]);

    const value = {
        userData,
        setUserData,
        chatData,
        setChatData,
        loadUserData,
        messageId,
        setMessageId,
        messages,
        setMessages,
        chatUser,
        setChatUser
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
