import { useEffect, useState, useContext, SyntheticEvent } from 'react';
import { Link, Routes, useNavigate } from 'react-router-dom';
import FirebaseContext from '../context/firebase';
import * as ROUTES from '../constants/routes';

export default function Login() {
  const history = useNavigate();
  const { firebaseApp } = useContext(FirebaseContext);
  console.log(firebaseApp);
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const isInvalid = password === '' || emailAddress === '';

  const handleLogin = async (event: SyntheticEvent) => {
    event.preventDefault();
    const element = document.getElementById('LoginButton');
    (element as HTMLElement).innerHTML = 'Loading ...';
    try {
      await firebaseApp.auth().signInWithEmailAndPassword(emailAddress, password);
      history(ROUTES.DASHBOARD);
    } catch (error: any) {
      setEmailAddress('');
      setPassword('');
      setError('Username or password is invalid');
    }
    (element as HTMLElement).innerHTML = 'Log In';
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
          <form onSubmit={handleLogin} method='POST'>
            <input
              aria-label='Enter your email address'
              type='text'
              placeholder='Enter Email Address'
              className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border-gray-primary rounded mb-2 outline outline-gray-300'
              onChange={({ target }) => setEmailAddress(target.value)}
            />
            <input
              aria-label='Enter password'
              type='password'
              placeholder='Enter password'
              className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border-gray-primary rounded mb-2 outline outline-gray-300'
              onChange={({ target }) => setPassword(target.value)}
            />
            <button
              id='LoginButton'
              disabled={isInvalid}
              type='submit'
              className={`bg-blue-500 w-full rounded font-bold text-white p-1.5 ${
                isInvalid && 'opacity-50'
              }`}
            >
              Log In
            </button>
          </form>
        </div>
        <div className='outline outline-gray-outline shadow-md text-center p-2 w-full my-8'>
          <p>
            Don&#39;t have an account ?{' '}
            <Link to={ROUTES.SIGN_UP} className='font-bold text-blue-medium'>
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
