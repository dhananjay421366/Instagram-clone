import { setSuggestedUser } from "@/redux/AuthSlice"
import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

const useGetSuggestedUser = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchSuggestedUser = async () => {
            try {
                const res = await axios.get("/api/v1/users/suggested_user", {
                    withCredentials: true
                })
                if (res.data.success) {
                    // console.log("this ia an all posts  message", res.data.message);
                    // console.log("this ia an all posts", res.data.data);
                    dispatch(setSuggestedUser(res.data.data))
                    // console.log("this an gets all suggested user ", res.data);


                }
            } catch (error) {
                console.log(error.message);

            }
        }
        fetchSuggestedUser()
    }, [])
}
export default useGetSuggestedUser