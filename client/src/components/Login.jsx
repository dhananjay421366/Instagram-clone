
import React, { useState } from 'react'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Button } from './ui/button'
import axios from 'axios'
import { toast } from 'sonner'
import { Link, useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { setAuthUser } from '@/redux/AuthSlice'
import { selectedPost, setPost } from '@/redux/postSlice'


export const Login = () => {
    const [form, setFormData] = useState({
        email: "",
        password: ""
    })
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const HandleSubmit = async (e) => {
        e.preventDefault()
        // console.log(form);
        try {
            // console.log(form)
            setLoading(true)
            const res = await axios.post('/api/v1/users/login', form, {
                Headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            })
            if (res.data.success) {
                dispatch(setAuthUser(res.data))
                navigate("/home")
                toast.success(res.data.message, {
                    duration: 2000, // 2 seconds
                })



            }
        } catch (error) {
            console.log(error);
            toast.error(error.res.data.message, {
                duration: 2000, // 2 seconds
            });
        } finally {
            setLoading(false);
            setFormData({
                email: "",
                password: "",
            });
        }
    }
    return (

        <div className="md:flex items-center p-12 ml-2 w-screen h-screen gap-4 justify-center">
            <div class="xamitd3 xm2v1qs object-cover  hidden md:flex x322q5f xx54hvc x1vk3w4 xuyhj88 xod5an3 x1gja9t xcd7kps xkxfa8k">
                <div class="x1qjc9v5 x972fbf xcfux6l x1qhh985 xm0m39n x9f619 x78zum5 xdt5ytf x2lah0s xk390pu x18mmtl5 x1rcfgkt xexx8yu x4uap5 x18d9i69 xkhd6sd x1n2onr6 x11njtxf">
                    <img
                        alt=""
                        class="x972fbf xcfux6l x1qhh985 xm0m39n xk390pu xns55qn xu96u03 xdj266r x11i5rnm xat24cr x1mh8g0r xexx8yu x4uap5 x18d9i69 xkhd6sd x10l6tqk x13vifvy x11njtxf xqyf9gi xg01cxk x1rkc77x x19991ni x9lcvmn xnpuxes"
                        src="/public/loginpageImages.jpg"
                    />
                    <img
                        alt=""
                        class="x972fbf xcfux6l x1qhh985 xm0m39n xk390pu xns55qn xu96u03 xdj266r x11i5rnm xat24cr x1mh8g0r xexx8yu x4uap5 x18d9i69 xkhd6sd x10l6tqk x13vifvy x11njtxf xqyf9gi x1hc1fzr x1rkc77x x19991ni x1lizcpb xnpuxes xhtitgo"
                        src="/images/instagram/xig/homepage/screenshots/screenshot2-2x.png?__d=www"
                    />
                    <img
                        alt=""
                        class="x972fbf xcfux6l x1qhh985 xm0m39n xk390pu xns55qn xu96u03 xdj266r x11i5rnm xat24cr x1mh8g0r xg01cxk xexx8yu x4uap5 x18d9i69 xkhd6sd x10l6tqk x13vifvy x11njtxf xlshs6z xqyf9gi"
                        src="/images/instagram/xig/homepage/screenshots/screenshot3-2x.png?__d=www"
                    />
                    <img
                        alt=""
                        class="x972fbf xcfux6l x1qhh985 xm0m39n xk390pu xns55qn xu96u03 xdj266r x11i5rnm xat24cr x1mh8g0r xg01cxk xexx8yu x4uap5 x18d9i69 xkhd6sd x10l6tqk x13vifvy x11njtxf xlshs6z xqyf9gi"
                        src="/images/instagram/xig/homepage/screenshots/screenshot4-2x.png?__d=www"
                    />
                </div>
            </div>

            <form action="" className='shadow-lg shadow-white flex flex-col gap-5 p-8'>
                <div className=''>
                    <h1 className='text-center font-bold text-xl'>Logo</h1>
                    <p className='text-sm text-center'>Login to see photos & videos from your friend</p>
                </div>
                <div className="">
                    <Label className=" font-medium">Email</Label>
                    <Input type="email"
                        value={form.email}
                        name="email"
                        className="focus-visible:ring-transparent text-black  my-2"
                        placeholder="Email"
                        onChange={(e) => setFormData({ ...form, email: e.target.value })}
                    />

                </div>
                <div className="">
                    <Label className=" font-medium">Password</Label>
                    <Input type="password"
                        className="focus-visible:ring-transparent text-black  my-2"
                        placeholder="password"
                        id="password"
                        value={form.password}
                        name="password"
                        onChange={(e) => setFormData({ ...form, password: e.target.value })}
                    />
                </div>
                {
                    loading ? <Button>
                        <Loader2 className="mr-2 h-4" />
                    </Button> :
                        <Button onClick={HandleSubmit} type="submit">Login</Button>
                }
                <span className='text-center'>Dosen't have an  account ? <Link className='text-blue-600' to={"/signup"}>Signup</Link></span>
            </form>
        </div>
    )
}
