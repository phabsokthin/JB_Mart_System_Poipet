import { useState } from 'react';

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="bg-gray-100 select-none">
      <div className="flex justify-center items-center">
        <div className="w-[90%] md:w-[40%] lg:w-[30%] xl:w-[20%] h-[400px] bg-white shadow-sm p-5 mt-44">
          <div className="flex justify-center">
            <h1 className="font-NotoSansKhmer font-bold text-2xl text-center">ហាងលក់ <br /> ទំនិញចែប៊ីម៉ាត</h1>
          </div>
          <form action="" className="mt-3 space-y-3">
            <div className="space-y-1">
              <label htmlFor="email" className="font-NotoSansKhmer font-bold text-lg">អុីម៉ែល:*</label>
              <input type="email"  className="input_text" required placeholder="អុីម៉ែលរបស់អ្នក" />
            </div>
            <div className="space-y-1 relative">
              <label htmlFor="password" className="font-NotoSansKhmer font-bold text-lg">ពាក្យសម្ងាត់:*</label>
              <input
                type={showPassword ? 'text' : 'password'}
              
                className="input_text"
                required
                placeholder="ពាក្យសម្ងាត់របស់អ្នក"
              />
              <div
                className="absolute top-10 right-2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                )}
              </div>
            </div>
            <div className="flex justify-center">
              <button className="button_only_submit font-NotoSansKhmer mt-3">ចូលប្រើប្រាស់</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
