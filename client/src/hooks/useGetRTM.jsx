
import { setMessages } from "@/redux/chatSlice"
import axios from "axios"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

const useGetRTM = () => {
    const dispatch = useDispatch();
    const { selectedUser } = useSelector((store) => store.auth);
    const { socket } = useSelector((store) => store.socket);
    // useEffect(() => {
    //     const fetchRTM = async () => {




    //         fetchRTM();
    //     }); // Add selectedUser as a dependency
    useEffect(() => {
        const fetchRTM = async () => {

        }
    }, [])
}

export default useGetRTM;
