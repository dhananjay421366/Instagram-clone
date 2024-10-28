// import React, { useRef, useState } from 'react';
// import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { Textarea } from './ui/textarea';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
// import { Button } from './ui/button';
// import axios from 'axios';
// import { Loader2 } from 'lucide-react';
// import { toast } from 'sonner';
// import { setAuthUser } from '@/redux/AuthSlice';
// import { readFileAsDataURI } from '@/lib/utils';

// export const EditProfile = () => {
//   const { user } = useSelector((store) => store.auth);
//   const imageref = useRef();
//   const [loading, setLoading] = useState(false);
//   const [input, setInput] = useState({
//     profilePhoto: user?.data?.user?.profilePicture || '',
//     Bio: user?.data?.user?.Bio || '',
//     gender: user?.data?.user?.gender || 'Male',
//   });

//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   // Store the actual file for upload
//   const [profilePictureFile, setProfilePictureFile] = useState(null);

//   const fileChangeHandler = async (e) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setProfilePictureFile(file);
//       const dataURL = await readFileAsDataURI(file);
//       setInput((prev) => ({ ...prev, profilePhoto: dataURL }));
//     }
//   };

//   const editProfileHandler = async () => {
//     try {
//       const formData = new FormData();

//       // Append the file only if a new one is selected
//       if (profilePictureFile) {
//         formData.append('profilePicture', profilePictureFile); // Attach the actual file
//       }

//       formData.append('Bio', input.Bio);
//       formData.append('gender', input.gender);
//       setLoading(true);

//       // Patch request to update profile
//       const response = await axios.patch(`/api/v1/users/update-account`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data', // Ensure correct content type
//         },
//       });

//       if (response?.data?.success) {
//         const updatedUser = response.data.data; // Expect the updated user from the backend

//         // Update Redux store with the new profile data
//         const updatedUserData = {
//           ...user,
//           data: {
//             ...user.data,
//             user: {
//               ...user.data.user,
//               Bio: response.data.data.Bio,
//               profilePicture: response.data.data.profilePicture,
//               gender: response.data.data.gender,
//             },
//           },
//         };
//         dispatch(setAuthUser(updatedUserData));
//         navigate(`/${user?.data?.user?._id}/profile`);
//         toast.success(response.data.message);
//       } else {
//         throw new Error(response?.data?.message || 'Failed to update profile.');
//       }
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex max-w-2xl mx-auto pl-10">
//       <section className="flex flex-col gap-6 w-full my-8">
//         <h1 className="font-bold text-xl">Edit Profile</h1>
//         <div className="flex items-center justify-between bg-gray-100 rounded-xl p-4">
//           <div className="flex items-center gap-3">
//             <Avatar>
//               <AvatarImage src={input.profilePhoto} alt="profile_image" />
//               <AvatarFallback>CN</AvatarFallback>
//             </Avatar>
//             <div>
//               <h1 className="font-bold text-gray-600 text-sm">{user?.data?.user?.username}</h1>
//               <span className="text-sm text-gray-600">{input.Bio || 'bio here'}</span>
//             </div>
//           </div>
//           <input
//             onChange={fileChangeHandler}
//             ref={imageref}
//             type="file"
//             accept="image/*" // Ensure that only images can be selected
//             className="hidden"
//           />
//           <button
//             onClick={() => imageref.current.click()}
//             className="text-white bg-blue-500 hover:bg-blue-700 rounded-xl px-4 py-2"
//           >
//             Change Profile Picture
//           </button>
//         </div>
//         <div>
//           <h1 className="font-bold text-xl mb-2">Bio</h1>
//           <Textarea
//             onChange={(e) => setInput({ ...input, Bio: e.target.value })}
//             value={input.Bio}
//             className="focus-visible:ring-transparent text-gray-600"
//             name="bio"
//           />
//         </div>
//         <div>
//           <h1 className="font-bold text-xl mb-2">Gender</h1>
//           <Select
//             className="text-gray-600"
//             defaultValue={input?.gender}
//             onValueChange={(value) => setInput({ ...input, gender: value })}
//           >
//             <SelectTrigger className="w-[180px]">
//               <SelectValue placeholder="Gender" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="Male">Male</SelectItem>
//               <SelectItem value="Female">Female</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//         <div className="flex justify-end">
//           {loading ? (
//             <Button className="w-fit bg-blue-500">
//               <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
//             </Button>
//           ) : (
//             <Button className="w-fit bg-blue-500" onClick={editProfileHandler}>
//               Submit
//             </Button>
//           )}
//         </div>
//       </section>
//     </div>
//   );
// };
import React, { useRef, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { setAuthUser } from '@/redux/AuthSlice';
import { readFileAsDataURI } from '@/lib/utils';

export const EditProfile = () => {
  const { user } = useSelector((store) => store.auth);
  const imageref = useRef();
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    profilePhoto: user?.data?.user?.profilePicture || '',
    Bio: user?.data?.user?.Bio || '',
    gender: user?.data?.user?.gender || 'Male',
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Store the actual file for upload
  const [profilePictureFile, setProfilePictureFile] = useState(null);

  const fileChangeHandler = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePictureFile(file);
      const dataURL = await readFileAsDataURI(file);
      setInput((prev) => ({ ...prev, profilePhoto: dataURL }));
    }
  };

  const editProfileHandler = async () => {
    try {
      const formData = new FormData();

      // Append the file only if a new one is selected
      if (profilePictureFile) {
        formData.append('profilePicture', profilePictureFile);
      }

      formData.append('Bio', input.Bio);
      formData.append('gender', input.gender);
      setLoading(true);

      // Patch request to update profile
      const response = await axios.patch(`/api/v1/users/update-account`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Log the entire response to see the structure
      console.log('Response data:', response.data);

      // Ensure the success condition is properly evaluated
      if (response?.data?.success) {  // Adjust this based on actual API response structure
        const updatedUser = response.data.data;

        // Update Redux store with the new profile data
        const updatedUserData = {
          ...user,
          data: {
            ...user.data,
            user: {
              ...user.data.user,
              Bio: updatedUser.Bio,
              profilePicture: updatedUser.profilePicture,
              gender: updatedUser.gender,
            },
          },
        };

        dispatch(setAuthUser(updatedUserData));
        navigate(`/${user?.data?.user?._id}/profile`);
        // toast.success(response.data.message || 'Profile updated successfully!');
      } else {
        throw new Error(response?.data?.message || 'Failed to update profile.');
      }
    } catch (error) {
      //console.error(error.message); // Log the actual error for debugging
      toast.error(error.message || 'An error occurred while updating the profile.');
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="flex max-w-2xl mx-auto pl-10">
      <section className="flex flex-col gap-6 w-full my-8">
        <h1 className="font-bold text-xl">Edit Profile</h1>
        <div className="flex items-center justify-between bg-gray-100 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={input.profilePhoto} alt="profile_image" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="font-bold text-gray-600 text-sm">{user?.data?.user?.username}</h1>
              <span className="text-sm text-gray-600">{input.Bio || 'bio here'}</span>
            </div>
          </div>
          <input
            onChange={fileChangeHandler}
            ref={imageref}
            type="file"
            accept="image/*" // Ensure that only images can be selected
            className="hidden"
          />
          <button
            onClick={() => imageref.current.click()}
            className="text-white bg-blue-500 hover:bg-blue-700 rounded-xl px-4 py-2"
          >
            Change Profile Picture
          </button>
        </div>
        <div>
          <h1 className="font-bold text-xl mb-2">Bio</h1>
          <Textarea
            onChange={(e) => setInput({ ...input, Bio: e.target.value })}
            value={input.Bio}
            className="focus-visible:ring-transparent text-gray-600"
            name="bio"
          />
        </div>
        <div>
          <h1 className="font-bold text-xl mb-2">Gender</h1>
          <Select
            className="text-gray-600"
            defaultValue={input?.gender}
            onValueChange={(value) => setInput({ ...input, gender: value })}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex justify-end">
          {loading ? (
            <Button className="w-fit bg-blue-500">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </Button>
          ) : (
            <Button className="w-fit bg-blue-500" onClick={editProfileHandler}>
              Submit
            </Button>
          )}
        </div>
      </section>
    </div>
  );
};


