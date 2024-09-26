import { setUserProfile } from "@/redux/AuthSlice"
import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

const useGetUseProfile = (userID) => {
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const res = await axios.get(`/api/v1/users/${userID}/profile`, {
                    withCredentials: true
                })
                if (res.data.success) {
                    // console.log("this ia an all posts  message", res.data.message);
                    // console.log("this ia an all posts", res.data.data);
                    dispatch(setUserProfile(res.data.data))
                    console.log(res.data)
                    // console.log("this an gets all suggested user ", res.data);


                }
            } catch (error) {
                console.log(error.message);

            }
        }
        fetchUserProfile()
    }, [userID])
}
export default useGetUseProfile 