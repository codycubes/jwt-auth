// src/components/ProfileEdit.tsx
import React, { useState, useEffect } from "react";
import { useUpdateUserMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { Link } from "react-router-dom";


// interface ProfileData {
//   name: string;
//   email: string;
//   password: string;
//   confirmPassword: string;
// }

const ProfileEdit: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const dispatch = useDispatch();
  const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
  const { userInfo } = useTypedSelector((state) => state.auth);

  const [updateProfile, { isLoading }] = useUpdateUserMutation();

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo]);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          password,
        }).unwrap();
        console.log(res);
        dispatch(setCredentials(res));
        toast.success('Profile updated successfully');
      } catch (err: any) {
        toast.error(err?.data?.message || err.message);
      }
    }
  };

  return (
    <div className="min-h-screen  text-white flex flex-col p-6">
      {/* Back Arrow */}
      <Link to={'/'}>
      <button className="w-10 h-10 bg-gray-800 rounded-full flex justify-center items-center mb-6">
        <span  className="text-5xl hover:scale-150">←</span>
      </button>

      </Link>

      {/* Title */}
      <h1 className="text-8xl font-bold mb-8">Edit Profile</h1>

      {/* Form */}
      <form className="space-y-6" onSubmit={submitHandler}>
        {/* Username */}
        <div>
          <label className="block text-sm font-medium mb-2" htmlFor="username">
            Name
          </label>
          <input
              id="name"
              name="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-gray-800 p-2 rounded border border-white focus:outline-none focus:ring-2 focus:ring-white"
            />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-gray-800 p-2 rounded border border-white focus:outline-none focus:ring-2 focus:ring-white"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium mb-2" htmlFor="email">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-gray-800 p-2 rounded border border-white focus:outline-none focus:ring-2 focus:ring-white"
          />
        </div>

          {/* Confirm Password */}
                <div>
          <label className="block text-sm font-medium mb-2" htmlFor="email">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full bg-gray-800 p-2 rounded border border-white focus:outline-none focus:ring-2 focus:ring-white"
          />
        </div>

        <button
          type="submit"
          className="flex justify-center w-full px-4 py-2 font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default ProfileEdit;
