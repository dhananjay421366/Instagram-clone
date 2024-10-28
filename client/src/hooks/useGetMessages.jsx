// // import { setMessages } from "@/redux/chatSlice"
// // import { setPost } from "@/redux/postSlice"
// // import axios from "axios"
// // import { useEffect } from "react"
// // import { useDispatch, useSelector } from "react-redux"

// // const useGetAllMessages = () => {
// //     const dispatch = useDispatch()
// //     const {  selectedUser } = useSelector((store) => store.auth);
// //     useEffect(() => {
// //         const fetchAllMessages = async () => {
// //             try {
// //                 const res = await axios.get(`/api/v1/message/all/${selectedUser?._id}`, {
// //                     withCredentials: true
// //                 })
// //                 console.log(res  ,"the message s are ");
// //                 if (res.data.success) {
// //                     // console.log("this ia an all posts  message", res.data.message);
// //                     // console.log("this ia an all posts", res.data.data);
// //                     dispatch(setMessages(res.data.data))
// //                     // console.log("this an gets all posts ", res.data.data);
// //                 }
// //             } catch (error) {
// //                 console.log(error.message);

// //             }
// //         }
// //         fetchAllMessages()
// //     }, [])
// // }
// // // export default useGetAllMessages

// // import { setMessages } from "@/redux/chatSlice"
// // import axios from "axios"
// // import { useEffect } from "react"
// // import { useDispatch, useSelector } from "react-redux"

// // const useGetAllMessages = () => {
// //     const dispatch = useDispatch();
// //     const { selectedUser } = useSelector((store) => store.auth);

// //     useEffect(() => {
// //         const fetchAllMessages = async () => {
// //             if (!selectedUser?._id) return; // Ensure selectedUser exists

// //             try {
// //                 const res = await axios.get(`/api/v1/message/all/${selectedUser._id}`, {
// //                     withCredentials: true
// //                 });
// //                 console.log(res.data, "The all messages");
// //                 if (res.data.success) {
// //                     dispatch(setMessages(res.data.data));
// //                 }
// //             } catch (error) {
// //                 console.error("Failed to fetch messages:", error.message);
// //             }
// //         };

// //         fetchAllMessages();
// //     }, [selectedUser, dispatch]); // Add selectedUser as a dependency
// // }

// // export default useGetAllMessages;
// import { setMessages } from "@/redux/chatSlice";
// import axios from "axios";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";

// const useGetAllMessages = () => {
//     const dispatch = useDispatch();
//     const { selectedUser } = useSelector((store) => store.auth);

//     useEffect(() => {
//         const fetchAllMessages = async () => {
//             if (!selectedUser?._id) return; // Ensure selectedUser exists before making the request

//             try {
//                 const res = await axios.get(`/api/v1/message/all/${selectedUser._id}`, {
//                     withCredentials: true
//                 });
//                 console.log("Fetched messages:", res.data);
                
//                 if (res.data.success) {
//                     dispatch(setMessages(res.data)); // Update messages in Redux
//                 } else {
//                     console.error("Failed to fetch messages: API did not return success");
//                 }
//             } catch (error) {
//                 console.error("Failed to fetch messages:", error);
//             }
//         };

//         fetchAllMessages();
//     }, [selectedUser?._id, dispatch]); // Depend on selectedUser._id to re-fetch on change
// };

// export default useGetAllMessages;

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

