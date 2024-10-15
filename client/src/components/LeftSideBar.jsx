import {
  Heart,
  Home,
  LogOut,
  MenuIcon,
  MessageCircle,
  PlusSquare,
  Search,
  TrendingUp,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { toast } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser } from "@/redux/AuthSlice";
// import { CreatePost } from "./CreatePost";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { CreatePost } from "./CreatePost";

export const LeftSideBar = () => {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth) || {}; // Ensure 'user' is defined
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  // Check if user is authenticated; if not, redirect to login
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const username = user?.data?.user?.username || "Profile";
  const completedUsername = username.slice(0, 10); // Limit username to 10 characters
  const profileName = user ? `${completedUsername}` : "Profile";

  const logoutHandle = async () => {
    try {
      const response = await axios.get("/api/v1/users/logout", {
        withCredentials: true,
      });
      if (response.data.success) {
        dispatch(setAuthUser(null));
        navigate("/login");
        toast.success(response.data.message, {
          duration: 2000, // 2 seconds
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred", {
        duration: 2000, // 2 seconds
      });
    } finally {
      navigate("/login");
    }
  };

  const sideBarHandler = (textType) => {
    if (textType === "Logout") {
      logoutHandle();
    } else if (textType === "Create") {
      setOpen(true);
    } else if (textType === "Shorts") {
      navigate("/reels");
    } else if (textType === "Home") {
      navigate("/home");
    } else if (textType === profileName) {
      navigate(`/${user?.data.user._id}/profile`);
    }
    else if (textType === "Messages") {
      navigate("/chat");
    } 
  };

  console.log(user?.data)
  const sidebarItems = [
    {
      icon: <Home />,
      text: "Home",
    },
    {
      icon: <Search />,
      text: "Search",
    },
    {
      icon: <TrendingUp />,
      text: "Explore",
    },
    {
      icon: <MessageCircle />,
      text: "Messages",
    },
    {
      icon: <Heart />,
      text: "Notification",
    },
    {
      icon: <PlusSquare />,
      text: "Create",
    },
    {
      icon: (
        <Avatar className="w-6 h-6 text-black">
          <AvatarImage
            src={user?.data.user.profilePicture || ""}
            alt={user?.data.user.username || "Profile"}
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      ),
      text: profileName,
    },
    {
      icon: <FontAwesomeIcon icon={faPlay} size="2x" />,
      text: "Shorts",
    },
  ];

  return (
    <>
      <div className="md:fixed hidden md:block top-0 z-10 mt-20 left-0 md:px-4 border-r-[1px] border-gray-700 h-screen md:w-[16%]">
        <div className="flex flex-col">
          <div>
            {sidebarItems.map((item, index) => (
              <div
                onClick={() => sideBarHandler(item.text)}
                key={index}
                className="flex items-center gap-3 relative hover:bg-gray-900 cursor-pointer rounded-lg p-3 my-3"
              >
                {item.icon}
                <span className="hidden md:flex">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3 threads left-0 bottom-0 py-4 md:px-3 mb-4">
          <div className="hidden md:flex hover:bg-gray-900 cursor-pointer rounded-lg md:p-3 items-center gap-3 w-[210px]">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button>
                  <MenuIcon />
                  <span>More</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logoutHandle}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        {/* Uncomment the line below if you have the CreatePost component */}
        <CreatePost open={open} setOpen={setOpen} />
      </div>
    </>
  );
};
