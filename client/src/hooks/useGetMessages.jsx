

import { setMessages } from "@/redux/chatSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetAllMessages = () => {
    const dispatch = useDispatch();
    const { selectedUser } = useSelector((store) => store.auth);

    useEffect(() => {
        const fetchAllMessages = async () => {
            if (!selectedUser?._id) return; // Ensure selectedUser exists

            try {
                const res = await axios.get(`/api/v1/message/all/${selectedUser._id}`, {
                    withCredentials: true
                });
                console.log("Fetched messages:", res.data);

                // Update messages in Redux if response contains an array in data
                if (res.data.success && Array.isArray(res.data.data)) {
                    dispatch(setMessages(res.data.data));
                } else {
                    console.error("Unexpected API response:", res.data);
                }
            } catch (error) {
                console.error("Failed to fetch messages:", error);
            }
        };

        fetchAllMessages();
    }, [selectedUser?._id, dispatch]); // Re-fetch when selectedUser._id changes
};

export default useGetAllMessages;

