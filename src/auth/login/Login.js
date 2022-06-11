import React, { useCallback} from 'react'
import {VscAccount} from 'react-icons/vsc'
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/auth-slice/authSlice';

const Login = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const {loading,message} = useSelector(state => state.auth);
   

    const handleSubmit =useCallback((e)=>{
        e.preventDefault();
        dispatch(loginUser({email,password}));
    },[email,password,dispatch]);
    



  return (
    <div className='flex justify-center items-center w-full h-[100vh]'>
         <form className="container sm:w-[500px] w-[400px] mx-auto border-2 border-gray-200 flex justify-center items-center flex-col shadow-xl"  onSubmit={handleSubmit}>
            <div className="header border-b-2 w-full text-center p-3">
               <div className='flex justify-center items-center'>
                   <VscAccount className='text-3xl text-blue-700'/>
                    <span className='text-3xl font-serif text-gray-800'>Login
                    </span>
               </div>
            </div>
             <div className="email-container w-full p-3 mt-3">
                    <input 
                    name='email'
                    type="email" 
                    placeholder="Enter your email" 
                    value={email}
                    className="border-2 rounded-lg border-gray-200 p-4 w-full"
                    onChange={(e) => setEmail(e.target.value)}
                    />
             </div>
            <div className="password-container w-full p-2 mt-3">
                    <input type="password" 
                    name='password'
                    placeholder="Enter your password"
                    className='border-2 rounded-lg border-gray-200 p-4 w-full' 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
             </div>
              {/* error message */}
                {message && <div className='text-red-600 text-center'>{message}</div>}
            <div className="login-btn-container w-full">
                 <button 
                 className="login-button bg-[blue] hover:bg-blue-600 text-white font-bold py-4 px-3 mt-12 block w-full" 
                 type='submit'>
                   {
                        loading? <span className='text-white'>Loading...</span> :
                        <span className='text-white'>Login</span>
                   }
                 </button>
            </div>
         </form>

    </div>
  )
}

export default Login