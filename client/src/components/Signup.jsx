
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import axios from "axios";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import '../css/signup.css';
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

export const Signup = () => {
    const [form, setFormData] = useState({
        email: "",
        username: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleGoogleLoginSuccess = async (credentialResponse) => {
        console.log("Google login success", credentialResponse);
        // Process Google login response (e.g., send credential to your backend)
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post("/api/v1/users/register", form, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });
            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message, { duration: 2000 });
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Signup failed", { duration: 2000 });
        } finally {
            setLoading(false);
            setFormData({
                email: "",
                username: "",
                password: "",
            });
        }
    };

    return (
        <GoogleOAuthProvider clientId="1046899819868-3gpeq1fko89aeaa2sntvmpcrqlgf52k7.apps.googleusercontent.com">
            <div className="signup-container md:ml-[400px] ">
                <div className="signup-box">
                    <header>
                        <h2>VisualSnap</h2>
                        <p>Sign up to see photos and videos from your friends.</p>
                        <GoogleLogin
                            onSuccess={handleGoogleLoginSuccess}
                            onError={() => toast.error("Google login failed")}
                            render={(renderProps) => (
                                <button
                                    className="google-login"
                                    onClick={renderProps.onClick}
                                    disabled={renderProps.disabled}
                                >
                                    <i className="fab fa-google"></i> Log in with Google
                                </button>
                            )}
                        />
                    </header>
                    <div className="separator">
                        <hr /> OR <hr />
                    </div>
                    <form onSubmit={handleSubmit}>
                        <Input
                            type="text"
                            name="email"
                            placeholder="Email"
                            value={form.email}
                            onChange={handleInputChange}
                            className="input-black-text"
                        />
                        <Input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={form.username}
                            onChange={handleInputChange}
                            className="input-black-text"
                        />
                        <Input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={form.password}
                            onChange={handleInputChange}
                            className="input-black-text"
                        />
                        <Button type="submit" className="signup-button" disabled={loading}>
                            {loading ? <Loader2 className="loader" /> : "Sign up"}
                        </Button>
                    </form>
                    <footer>
                        <p>
                            By signing up, you agree to our{" "}
                            <a href="#">Terms, Data Policy</a> and <a href="#">Cookies Policy</a>.
                        </p>
                    </footer>
                </div>
                <div className="bottom-container">
                    <p>
                        Have an account? <Link to="/login">Log in</Link>
                    </p>
                </div>
                <div className="apps-container">
                    <p>Get the app.</p>
                    <img src="https://i.postimg.cc/Vkm7D9Xd/appstore.png" alt="App Store" />
                    <img src="https://i.postimg.cc/R00gzMsm/playstore.png" alt="Play Store" />
                </div>
            </div>
        </GoogleOAuthProvider>
    );
};


