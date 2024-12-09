/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { useState } from 'react';
import { url } from '../api/url.ts';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(''); // For error handling

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(''); 
  
    try {
      const response = await axios.post(`${url}login`, { email:email, password:password });
      const token = response.data.accessToken; 
      localStorage.setItem('authToken', token); 
      console.log(token)
      navigate('/dashboard'); 
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.msg) {
        setError(err.response.data.msg); 
      } else {
        setError('មានបញ្ហា! សូមសាកល្បងម្ដងទៀត។'); 
      }
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <div className="bg-gray-100 select-none">
      <div className="flex items-center justify-center">
        <div className="w-[90%] md:w-[40%] lg:w-[30%] xl:w-[20%] h-[450px] bg-white shadow-sm p-5 mt-44">
          <div className="flex justify-center">
            <h1 className="text-2xl font-bold text-center font-NotoSansKhmer">
              ហាងលក់ <br /> ទំនិញចែប៊ីម៉ាត
            </h1>
          </div>
          <form onSubmit={handleLogin} className="mt-3 space-y-3">
            <div className="space-y-1">
              <label htmlFor="email" className="text-lg font-bold font-NotoSansKhmer">
                អុីម៉ែល:*
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input_text"
                required
                placeholder="អុីម៉ែលរបស់អ្នក"
              />
            </div>
            <div className="relative space-y-1">
              <label htmlFor="password" className="text-lg font-bold font-NotoSansKhmer">
                ពាក្យសម្ងាត់:*
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input_text"
                required
                placeholder="ពាក្យសម្ងាត់របស់អ្នក"
              />
              <div
                className="absolute cursor-pointer top-10 right-2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                )}
              </div>
            </div>
            {error && (
              <p className="text-sm text-red-500 font-NotoSansKhmer">{error}</p>
            )}
            <div className="flex justify-center">
              <button
                type="submit"
                className={`mt-3 button_only_submit font-NotoSansKhmer ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={loading}
              >
                {loading ? 'កំពុងចូលប្រើ...' : 'ចូលប្រើប្រាស់'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
