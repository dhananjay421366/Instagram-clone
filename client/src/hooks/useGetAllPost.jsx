import { setPost } from "@/redux/postSlice"
import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

const getAllPost = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchAllPost = async () => {
            try {
                const res = await axios.get("/api/v1/posts/", {
                    withCredentials: true
                })
                if (res.data.success) {
                    // console.log("this ia an all posts  message", res.data.message);
                    // console.log("this ia an all posts", res.data.data);
                    dispatch(setPost(res.data.data))
                    // console.log("this an gets all posts ", res.data.data);
                }
            } catch (error) {
                console.log(error.message);

            }
        }
        fetchAllPost()
    }, [])
}
export default getAllPost