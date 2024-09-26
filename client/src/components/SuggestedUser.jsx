import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

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
  const { suggestedUser } = useSelector((store) => store.auth)
  const [showAll, setShowAll] = useState(false)
  const [shuffledUsers, setShuffledUsers] = useState([])

  useEffect(() => {
    if (suggestedUser && suggestedUser.users && suggestedUser.users.length > 0) {
      setShuffledUsers(shuffleArray(suggestedUser.users)) // Shuffle users on component mount or when suggestedUser changes
    }
  }, [suggestedUser])

  if (!shuffledUsers || shuffledUsers.length === 0) {
    return null; // Handle case where no suggested users are available
  }

  // Toggle between 5 users and all users
  const displayedUsers = showAll ? shuffledUsers : shuffledUsers.slice(0, 5)

  return (
    <div className='my-10'>
      <div className="flex justify-between gap-2 items-center text-sm">
        <h1 className='font-semibold text-gray-500'>Suggested for you</h1>
        <button
          className='font-semibold text-gray-500'
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? 'Show Less' : 'See All'}
        </button>
      </div>
      {
        displayedUsers.map((user) => (
          <div className="my-4" key={user?._id}>
            <div className="flex items-center justify-between ">
              <div className="flex items-center   gap-2">
                <Link to={`/${user?._id}/profile`}>
                  <Avatar>
                    <AvatarImage
                      src={user?.profilePicture}
                      alt="profile_image"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </Link>
                <div className='flex flex-col'>
                  <h1 className='font-semibold text-sm'>
                    <Link to={`/${user?._id}/profile`}>
                      {user?.username}
                    </Link>
                  </h1>
                  <span className='text-sm'>
                    {user?.Bio || 'No bio available'}
                  </span>
                </div>
              </div>
              <span className='text-[#6aadda] text-xs font-bold cursor-pointer hover:text-[#3b9bdb]'>Follow</span>
            </div>

          </div>
        ))
      }
    </div>
  )
}
