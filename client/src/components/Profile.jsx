// import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
// import useGetUseProfile from "@/hooks/userGetUserProfile";
// import { Link, useParams } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { Button } from "./ui/button";
// import { Badge } from "./ui/badge";
// import { AtSign, Heart, MessageCircle } from "lucide-react";
// import { useState } from "react";
// //  pratap
// export const Profile = () => {
//   const params = useParams();
//   const userId = params.id;
//   useGetUseProfile(userId);

//   const { userProfile, user } = useSelector((store) => store.auth);
//   const profileP = userProfile?.profilePicture || "";
//   const isLoggedInUserProfile = user?.data.user._id === userProfile?._id;
//   const isFollowing = false; // You might want to replace this with actual logic
//   const [activeTab, setActiveTab] = useState("posts");

//   const handleTabChange = (tab) => {
//     setActiveTab(tab);
//   };

//   const displayedPost =
//     activeTab === "posts" ? userProfile?.posts : userProfile?.bookmarks;
//   console.log(userProfile);
//   // Guard clause to handle loading state
//   if (!userProfile) {
//     return <div>Loading...</div>; // Or any loading component
//   }

//   return (
//     <div className="flex max-w-8xl justify-center mx-auto p-4 sm:p-8">
//       <div className="flex flex-col gap-10 sm:gap-20 w-full max-w-5xl">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* Profile Picture Section */}
//           <section className="flex justify-center items-center">
//             <Avatar className="h-24 w-24 sm:h-32 sm:w-32">
//               {profileP.startsWith("data:image/") ? (
//                 <AvatarImage src={profileP} alt="profile_photo" />
//               ) : (
//                 <AvatarFallback className="text-black">CN</AvatarFallback>
//               )}
//             </Avatar>
//           </section>

//           {/* Profile Info Section */}
//           <section>
//             <div className="flex flex-col gap-4 sm:gap-6">
//               <div className="flex flex-col sm:flex-row gap-2 items-center">
//                 <span className="text-lg sm:text-xl font-semibold">
//                   {userProfile?.username}
//                 </span>
//                 {isLoggedInUserProfile ? (
//                   <div className="flex gap-2">
//                     <Link to={"/account/edit"}>
//                       <Button variant="secondary" className="bg-gray-200 h-8">
//                         Edit profile
//                       </Button>
//                     </Link>
//                     <Button variant="secondary" className="bg-gray-200 h-8">
//                       View Archive
//                     </Button>
//                     <Button variant="secondary" className="bg-gray-200 h-8">
//                       Add Tools
//                     </Button>
//                   </div>
//                 ) : isFollowing ? (
//                   <div className="flex gap-2">
//                     <Button variant="secondary" className="h-8">
//                       Unfollow
//                     </Button>
//                     <Button variant="secondary" className="h-8">
//                       Message
//                     </Button>
//                   </div>
//                 ) : (
//                   <Button className="bg-[#0095F6] hover:bg-[#1e85ca] h-8">
//                     Follow
//                   </Button>
//                 )}
//               </div>
//               {/* Profile Stats */}
//               <div className="flex items-center gap-4">
//                 <p>
//                   <span className="font-semibold">
//                     {userProfile.posts.length}
//                   </span>{" "}
//                   Posts
//                 </p>
//                 <p>
//                   <span className="font-semibold">
//                     {userProfile.followers.length}
//                   </span>{" "}
//                   Followers
//                 </p>
//                 <p>
//                   <span className="font-semibold">
//                     {userProfile.following.length}
//                   </span>{" "}
//                   Following
//                 </p>
//               </div>
//               {/* Bio and Badges */}
//               <div className="flex flex-col gap-1">
//                 <span className="font-semibold">
//                   {userProfile.Bio || "Bio here..."}
//                 </span>
//                 <Badge className="w-fit" variant="secondary">
//                   <AtSign />
//                   <span className="pl-1">{userProfile.username}</span>
//                 </Badge>
//                 <span>Learn chai with code</span>
//               </div>
//             </div>
//           </section>
//         </div>

//         {/* Tabs Section */}
//         <div className="border-t border-gray-200 pt-4">
//           <div className="flex justify-center items-center gap-6 text-sm">
//             <span
//               className={`py-2 cursor-pointer ${
//                 activeTab === "posts" ? "font-bold" : ""
//               }`}
//               onClick={() => handleTabChange("posts")}
//             >
//               POSTS
//             </span>
//             <span
//               className={`py-2 cursor-pointer ${
//                 activeTab === "saved" ? "font-bold" : ""
//               }`}
//               onClick={() => handleTabChange("saved")}
//             >
//               SAVED
//             </span>
//             <span
//               className={`py-2 cursor-pointer ${
//                 activeTab === "reels" ? "font-bold" : ""
//               }`}
//               onClick={() => handleTabChange("reels")}
//             >
//               REELS
//             </span>
//             <span
//               className={`py-2 cursor-pointer ${
//                 activeTab === "tags" ? "font-bold" : ""
//               }`}
//               onClick={() => handleTabChange("tags")}
//             >
//               TAGS
//             </span>
//           </div>

//           {/* Post Grid */}
//           <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4">
//             {displayedPost?.map((post) => (
//               <div className="relative group p-2 cursor-pointer" key={post._id}>
//                 <img
//                   className="rounded-sm w-full h-auto aspect-square object-cover"
//                   src={post.image}
//                   alt="post_image"
//                   loading="lazy"
//                 />
//                 <div className="absolute inset-0 flex items-center justify-center opacity-0 bg-opacity-50 group-hover:opacity-100 transition-opacity duration-300">
//                   <div className="flex items-center text-white space-x-4">
//                     <button className="flex items-center gap-2 hover:text-gray-300">
//                       <Heart />
//                       <span>{post.likes.length}</span>
//                     </button>
//                     <Button className="flex items-center gap-2 hover:text-gray-300">
//                       <MessageCircle />
//                       <span>{post?.comments?.length}</span>
//                     </Button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
// //   );
// // };
// import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
// import useGetUseProfile from "@/hooks/userGetUserProfile";
// import { Link, useParams } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { Button } from "./ui/button";
// import { Badge } from "./ui/badge";
// import { AtSign, Heart, MessageCircle } from "lucide-react";
// import { useState } from "react";

// export const Profile = () => {
//   const params = useParams();
//   const userId = params.id;
//   useGetUseProfile(userId);

//   const { userProfile, user } = useSelector((store) => store.auth);
//   const profileP = userProfile?.profilePicture || "";
//   const isLoggedInUserProfile = user?.data.user._id === userProfile?._id;
//   const isFollowing = false; // You might want to replace this with actual logic
//   const [activeTab, setActiveTab] = useState("posts");

//   const handleTabChange = (tab) => {
//     setActiveTab(tab);
//   };

//   const displayedPost =
//     activeTab === "posts" ? userProfile?.posts : userProfile?.bookmarks;

//   // Guard clause to handle loading state
//   if (!userProfile) {
//     return <div>Loading...</div>; // Or any loading component
//   }

//   return (
//     <div className="flex max-w-8xl justify-center mx-auto p-4 sm:p-8">
//       <div className="flex flex-col gap-10 sm:gap-20 w-full max-w-5xl">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* Profile Picture Section */}
//           <section className="flex justify-center items-center">
//             <Avatar className="h-24 w-24 sm:h-32 sm:w-32">
//               {profileP ? (
//                 <AvatarImage
//                   src={profileP}
//                   alt={userProfile?.username || "Profile Photo"}
//                   loading="lazy"
//                 />
//               ) : (
//                 <AvatarFallback className="text-black">CN</AvatarFallback>
//               )}
//             </Avatar>
//           </section>

//           {/* Profile Info Section */}
//           <section>
//             <div className="flex flex-col gap-4 sm:gap-6">
//               <div className="flex flex-col sm:flex-row gap-2 items-center">
//                 <span className="text-lg sm:text-xl font-semibold">
//                   {userProfile?.username}
//                 </span>
//                 {isLoggedInUserProfile ? (
//                   <div className="flex gap-2">
//                     <Link to={"/account/edit"}>
//                       <Button variant="secondary" className="bg-gray-200 h-8">
//                         Edit profile
//                       </Button>
//                     </Link>
//                     <Button variant="secondary" className="bg-gray-200 h-8">
//                       View Archive
//                     </Button>
//                     <Button variant="secondary" className="bg-gray-200 h-8">
//                       Add Tools
//                     </Button>
//                   </div>
//                 ) : isFollowing ? (
//                   <div className="flex gap-2">
//                     <Button variant="secondary" className="h-8">
//                       Unfollow
//                     </Button>
//                     <Button variant="secondary" className="h-8">
//                       Message
//                     </Button>
//                   </div>
//                 ) : (
//                   <Button className="bg-[#0095F6] hover:bg-[#1e85ca] h-8">
//                     Follow
//                   </Button>
//                 )}
//               </div>
//               {/* Profile Stats */}
//               <div className="flex items-center gap-4">
//                 <p>
//                   <span className="font-semibold">
//                     {userProfile.posts.length}
//                   </span>{" "}
//                   Posts
//                 </p>
//                 <p>
//                   <span className="font-semibold">
//                     {userProfile.followers.length}
//                   </span>{" "}
//                   Followers
//                 </p>
//                 <p>
//                   <span className="font-semibold">
//                     {userProfile.following.length}
//                   </span>{" "}
//                   Following
//                 </p>
//               </div>
//               {/* Bio and Badges */}
//               <div className="flex flex-col gap-1">
//                 <span className="font-semibold">
//                   {userProfile.Bio || "Bio here..."}
//                 </span>
//                 <Badge className="w-fit" variant="secondary">
//                   <AtSign />
//                   <span className="pl-1">{userProfile.username}</span>
//                 </Badge>
//                 <span>Learn chai with code</span>
//               </div>
//             </div>
//           </section>
//         </div>

//         {/* Tabs Section */}
//         <div className="border-t border-gray-200 pt-4">
//           <div className="flex justify-center items-center gap-6 text-sm">
//             <span
//               className={`py-2 cursor-pointer ${activeTab === "posts" ? "font-bold" : ""
//                 }`}
//               onClick={() => handleTabChange("posts")}
//             >
//               POSTS
//             </span>
//             <span
//               className={`py-2 cursor-pointer ${activeTab === "saved" ? "font-bold" : ""
//                 }`}
//               onClick={() => handleTabChange("saved")}
//             >
//               SAVED
//             </span>
//             <span
//               className={`py-2 cursor-pointer ${activeTab === "reels" ? "font-bold" : ""
//                 }`}
//               onClick={() => handleTabChange("reels")}
//             >
//               REELS
//             </span>
//             <span
//               className={`py-2 cursor-pointer ${activeTab === "tags" ? "font-bold" : ""
//                 }`}
//               onClick={() => handleTabChange("tags")}
//             >
//               TAGS
//             </span>
//           </div>

//           {/* Post Grid */}
//           <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4">
//             {displayedPost?.map((post) => (
//               <div className="relative group p-2 cursor-pointer" key={post._id}>
//                 {post.image ? (
//                   post.image.endsWith(".mp4") ? (
//                     <video
//                       className="rounded-sm my-2 w-full aspect-square object-cover"
//                       src={post?.image}
//                       controls
//                       loop

//                     />
//                   ) : (
//                     <img
//                       className="rounded-sm my-2 w-full aspect-square object-cover"
//                       src={post?.image}
//                       alt="post_img"
//                     />
//                   )
//                 ) : null}
//                 <div className="absolute inset-0 flex items-center justify-center opacity-0 bg-opacity-50 group-hover:opacity-100 transition-opacity duration-300">
//                   <div className="flex items-center text-white space-x-4">
//                     <button className="flex items-center gap-2 hover:text-gray-300">
//                       <Heart />
//                       <span>{post.likes.length}</span>
//                     </button>
//                     <Button className="flex items-center gap-2 hover:text-gray-300">
//                       <MessageCircle />
//                       <span>{post?.comments?.length}</span>
//                     </Button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import useGetUseProfile from "@/hooks/userGetUserProfile";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { AtSign, Heart, MessageCircle } from "lucide-react";
import { useState, useRef } from "react";

export const Profile = () => {
  const params = useParams();
  const userId = params.id;
  useGetUseProfile(userId);

  const { userProfile, user } = useSelector((store) => store.auth);
  const profileP = userProfile?.profilePicture || "";
  const isLoggedInUserProfile = user?.data.user._id === userProfile?._id;
  const isFollowing = false; // You might want to replace this with actual logic
  const [activeTab, setActiveTab] = useState("posts");
  const videoRefs = useRef([]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const displayedPost =
    activeTab === "posts" ? userProfile?.posts : userProfile?.bookmarks;

  const handleVideoClick = (index) => {
    const currentVideo = videoRefs.current[index];
    if (currentVideo) {
      if (currentVideo.paused) {
        currentVideo.play();
      } else {
        currentVideo.pause();
      }
    }
  };

  // Guard clause to handle loading state
  if (!userProfile) {
    return <div>Loading...</div>; // Or any loading component
  }

  return (
    <div className="flex max-w-8xl justify-center mx-auto p-4 sm:p-8">
      <div className="flex flex-col gap-10 sm:gap-20 w-full max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Profile Picture Section */}
          <section className="flex justify-center items-center">
            <Avatar className="h-24 w-24 sm:h-32 sm:w-32">
              {profileP ? (
                <AvatarImage
                  src={profileP}
                  alt={userProfile?.username || "Profile Photo"}
                  loading="lazy"
                />
              ) : (
                <AvatarFallback className="text-black">CN</AvatarFallback>
              )}
            </Avatar>
          </section>

          {/* Profile Info Section */}
          <section>
            <div className="flex flex-col gap-4 sm:gap-6">
              <div className="flex flex-col sm:flex-row gap-2 items-center">
                <span className="text-lg sm:text-xl font-semibold">
                  {userProfile?.username}
                </span>
                {isLoggedInUserProfile ? (
                  <div className="flex gap-2">
                    <Link to={"/account/edit"}>
                      <Button variant="secondary" className="bg-gray-200 h-8">
                        Edit profile
                      </Button>
                    </Link>
                    <Button variant="secondary" className="bg-gray-200 h-8">
                      View Archive
                    </Button>
                    <Button variant="secondary" className="bg-gray-200 h-8">
                      Add Tools
                    </Button>
                  </div>
                ) : isFollowing ? (
                  <div className="flex gap-2">
                    <Button variant="secondary" className="h-8">
                      Unfollow
                    </Button>
                    <Button variant="secondary" className="h-8">
                      Message
                    </Button>
                  </div>
                ) : (
                  <Button className="bg-[#0095F6] hover:bg-[#1e85ca] h-8">
                    Follow
                  </Button>
                )}
              </div>
              {/* Profile Stats */}
              <div className="flex items-center gap-4">
                <p>
                  <span className="font-semibold">
                    {userProfile.posts.length}
                  </span>{" "}
                  Posts
                </p>
                <p>
                  <span className="font-semibold">
                    {userProfile.followers.length}
                  </span>{" "}
                  Followers
                </p>
                <p>
                  <span className="font-semibold">
                    {userProfile.following.length}
                  </span>{" "}
                  Following
                </p>
              </div>
              {/* Bio and Badges */}
              <div className="flex flex-col gap-1">
                <span className="font-semibold">
                  {userProfile.Bio || "Bio here..."}
                </span>
                <Badge className="w-fit" variant="secondary">
                  <AtSign />
                  <span className="pl-1">{userProfile.username}</span>
                </Badge>
                <span>Learn chai with code</span>
              </div>
            </div>
          </section>
        </div>

        {/* Tabs Section */}
        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-center items-center gap-6 text-sm">
            <span
              className={`py-2 cursor-pointer ${activeTab === "posts" ? "font-bold" : ""
                }`}
              onClick={() => handleTabChange("posts")}
            >
              POSTS
            </span>
            <span
              className={`py-2 cursor-pointer ${activeTab === "saved" ? "font-bold" : ""
                }`}
              onClick={() => handleTabChange("saved")}
            >
              SAVED
            </span>
            <span
              className={`py-2 cursor-pointer ${activeTab === "reels" ? "font-bold" : ""
                }`}
              onClick={() => handleTabChange("reels")}
            >
              REELS
            </span>
            <span
              className={`py-2 cursor-pointer ${activeTab === "tags" ? "font-bold" : ""
                }`}
              onClick={() => handleTabChange("tags")}
            >
              TAGS
            </span>
          </div>

          {/* Post Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4">
            {displayedPost?.map((post, index) => (
              <div className="relative group p-2 cursor-pointer" key={post._id}>
                {post.image ? (
                  post.image.endsWith(".mp4") ? (
                    <video
                      className="rounded-sm my-2 w-full aspect-square object-cover"
                      src={post?.image}
                      controls
                      loop
                      ref={(el) => (videoRefs.current[index] = el)} // Store each video ref
                      onClick={() => handleVideoClick(index)} // Handle video click to play/pause
                    />
                  ) : (
                    <img
                      className="rounded-sm my-2 w-full aspect-square object-cover"
                      src={post?.image}
                      alt="post_img"
                    />
                  )
                ) : null}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 bg-opacity-50 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex items-center text-white space-x-4">
                    <button className="flex items-center gap-2 hover:text-gray-300">
                      <Heart />
                      <span>{post.likes.length}</span>
                    </button>
                    <Button className="flex items-center gap-2 hover:text-gray-300">
                      <MessageCircle />
                      <span>{post?.comments?.length}</span>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

