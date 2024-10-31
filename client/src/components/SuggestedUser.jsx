import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

// Utility function to shuffle an array
const shuffleArray = (array) => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

export const SuggestedUser = () => {
  const { suggestedUser, user } = useSelector((store) => store.auth); // Ensure `user` is the logged-in user
  const [showAll, setShowAll] = useState(false);
  const [shuffledUsers, setShuffledUsers] = useState([]);
  const [followStatus, setFollowStatus] = useState({}); // Track follow status for each user

  useEffect(() => {
    if (suggestedUser && suggestedUser.users && suggestedUser.users.length > 0) {
      // Shuffle users and set follow status on mount or when suggestedUser changes
      setShuffledUsers(shuffleArray(suggestedUser.users));

      const initialStatus = suggestedUser.users.reduce((acc, user) => {
        acc[user._id] = user.isFollowed; // Assume `isFollowed` indicates follow status from the API
        return acc;
      }, {});
      setFollowStatus(initialStatus);
    }
  }, [suggestedUser]);

  if (!shuffledUsers || shuffledUsers.length === 0) {
    return null;
  }

  const handleFollowToggle = async (targetUserId) => {
    try {
      // Send follow/unfollow request
      const response = await axios.post(
        `/api/v1/users/followunfollow/${targetUserId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`, // Include auth token if required
          },
        }
      );

      // Toggle follow status in UI based on API response
      setFollowStatus((prevStatus) => ({
        ...prevStatus,
        [targetUserId]: !prevStatus[targetUserId],
      }));
    } catch (error) {
      console.error("Error following/unfollowing user:", error);
    }
  };

  const displayedUsers = showAll ? shuffledUsers : shuffledUsers.slice(0, 5);

  return (
    <div className="my-10">
      <div className="flex justify-between gap-2 items-center text-sm">
        <h1 className="font-semibold text-gray-500">Suggested for you</h1>
        <button
          className="font-semibold text-gray-500"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "Show Less" : "See All"}
        </button>
      </div>
      {displayedUsers.map((user) => (
        <div className="my-4" key={user?._id}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Link to={`/${user?._id}/profile`}>
                <Avatar>
                  {user?.profilePicture ? (
                    <AvatarImage
                      src={user?.profilePicture}
                      alt="profile_image"
                      loading="lazy"
                    />
                  ) : (
                    <AvatarFallback>CN</AvatarFallback>
                  )}
                </Avatar>
              </Link>
              <div className="flex flex-col">
                <h1 className="font-semibold text-sm">
                  <Link to={`/${user?._id}/profile`}>{user?.username}</Link>
                </h1>
                <span className="text-sm">{user?.Bio || "No bio available"}</span>
              </div>
            </div>
            <button
              className={`text-xs font-bold cursor-pointer ${
                followStatus[user._id] ? "text-red-500" : "text-[#6aadda]"
              } hover:text-[#3b9bdb]`}
              onClick={() => handleFollowToggle(user._id)}
            >
              {followStatus[user._id] ? "Unfollow" : "Follow"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
