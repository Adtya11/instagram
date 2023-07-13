import { useEffect, useState, useContext, SyntheticEvent } from 'react';
import { Link, Routes, useNavigate } from 'react-router-dom';
import FirebaseContext from '../context/firebase';
import { doesEmailAddressExists, doesUsernameExists } from '../services/firebase';

import * as ROUTES from '../constants/routes';

export default function Signup() {
  const history = useNavigate();
  const { firebaseApp } = useContext(FirebaseContext);
  const [username, setUsername] = useState('');
  const [fullname, setFullname] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [usernameValid, setUsernameValid] = useState(false);
  const [emailAddressValid, setEmailAddressValid] = useState(false);

  const isInvalid = password === '' || !emailAddressValid || !usernameValid || fullname === '';

  const handleUsernameChange = async (username: string) => {
    setUsername(username);
    const userNameExists = await doesUsernameExists(username);
    if (userNameExists.length > 0) {
      setUsernameValid(false);
      setError('Username already exists!');
    } else {
      setUsernameValid(true);
    }
  };

  const handleEmailChange = async (email: string) => {
    setEmailAddress(email);
    const emailExists = await doesEmailAddressExists(email);
    if (emailExists.length > 0) {
      setEmailAddressValid(false);
      setError('Email already exists!');
    } else {
      setEmailAddressValid(true);
    }
  };

  const handleSignup = async (event: SyntheticEvent) => {
    event.preventDefault();
    const element = document.getElementById('SignupButton');
    (element as HTMLElement).innerHTML = 'Loading ...';
    console.log(emailAddress);

    try {
      const createdUserResult = await firebaseApp
        .auth()
        .createUserWithEmailAndPassword(emailAddress, password);

      await firebaseApp.firestore().collection('users').add({
        userId: createdUserResult.user.uid,
        username: username.toLowerCase(),
        fullName: fullname,
        emailAddress: emailAddress.toLocaleLowerCase(),
        following: [],
        dateCreated: Date.now(),
      });
      history(ROUTES.DASHBOARD);
    } catch (error: any) {
      setEmailAddress('');
      setPassword('');
      setError('Please try again in some time :(');
    }
    (element as HTMLElement).innerHTML = 'Sign up';
  };

  useEffect(() => {
    document.title = 'Login - Instagram';
  }, []);

  return (
    <div className='container flex mx-auto max-w-screen-md items-center h-screen'>
      <div className='flex w-3/5'>
        <img src='/images/iphone-with-profile.jpg' />
      </div>
      <div className='flex flex-col w-2/5'>
        <h1 className='flex justify-center w-full'>
          <img src='/images/logo.png' alt='Instagram' className='mt-2 w-6/12 mb-4' />
        </h1>
        <div className='p-4 outline outline-gray-outline shadow-md'>
          <p className='text-sm text-red-600'>{error}</p>
          <form onSubmit={handleSignup} method='POST'>
            <input
              aria-label='Enter username'
              type='text'
              placeholder='Enter Username'
              className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border-gray-primary rounded mb-2 outline outline-gray-300'
              onChange={({ target }) => handleUsernameChange(target.value)}
            />
            <input
              aria-label='Enter fullname'
              type='text'
              placeholder='Enter Full Name'
              className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border-gray-primary rounded mb-2 outline outline-gray-300'
              onChange={({ target }) => setFullname(target.value)}
            />
            <input
              aria-label='Enter your email address'
              type='text'
              placeholder='Enter Email Address'
              className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border-gray-primary rounded mb-2 outline outline-gray-300'
              onChange={({ target }) => handleEmailChange(target.value)}
            />
            <input
              aria-label='Enter password'
              type='password'
              placeholder='Enter password'
              className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border-gray-primary rounded mb-2 outline outline-gray-300'
              onChange={({ target }) => setPassword(target.value)}
            />
            <button
              id='SignupButton'
              disabled={isInvalid}
              type='submit'
              className={`bg-blue-500 w-full rounded font-bold text-white p-1.5 ${
                isInvalid && 'opacity-50'
              }`}
            >
              Create new account
            </button>
          </form>
        </div>
        <div className='outline outline-gray-outline shadow-md text-center p-2 w-full my-8'>
          <p>
            Already have an account ?{' '}
            <Link to={ROUTES.LOGIN} className='font-bold text-blue-medium'>
              Log In
            </Link>{' '}
            instead
          </p>
        </div>
      </div>
    </div>
  );
}
