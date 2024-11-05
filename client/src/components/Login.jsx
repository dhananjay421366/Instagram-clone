
import React, { useState } from 'react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import axios from 'axios';
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setAuthUser } from '@/redux/AuthSlice';
import '../css/login.css'

export const Login = () => {
    const [form, setFormData] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const HandleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post('/api/v1/users/login', form, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setAuthUser(res.data));
                navigate("/home");
                toast.success(res.data.message, { duration: 2000 });
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Login failed", { duration: 2000 });
        } finally {
            setLoading(false);
            setFormData({ email: "", password: "" });
        }
    };

    return (
        <div id="wrapper" className="flex items-center justify-center h-screen">
            <div className="main-content shadow-lg p-10 bg-white rounded-lg max-w-sm w-full text-center">
                <div className="header mb-8">
                    <p className="text-gray-500 mt-2">Log in to your account</p>
                </div>
                <div className="l-part">
                    <Input
                        type="email"
                        className="input-1 w-full p-3 border border-gray-300 rounded-lg mb-4  input-black-text"
                        placeholder="Email"
                        value={form.email}
                        onChange={(e) => setFormData({ ...form, email: e.target.value })}
                        
                    />
                    <div className="overlap-text relative mb-6">
                        <Input
                            type="password"
                            className="input-2 w-full p-3 border border-gray-300 rounded-lg input-black-text"
                            placeholder="Password"
                            value={form.password}
                            onChange={(e) => setFormData({ ...form, password: e.target.value })}
                        />
                        <Link to="/forgot-password" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-blue-500">Forgot?</Link>
                    </div>
                    <Button
                        className="btn w-full bg-blue-500 text-white font-bold py-3 rounded-lg hover:bg-blue-600 transition-all"
                        onClick={HandleSubmit}
                        disabled={loading}
                    >
                        {loading ? <Loader2 className="mr-2 h-4 animate-spin" /> : "Log in"}
                    </Button>
                </div>
                <div className="sub-content mt-4 text-gray-500">
                    Don’t have an account? <Link to="/signup" className="text-blue-500">Sign up</Link>
                </div>
            </div>
        </div>
    );
};
