import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// <div className="space-y-2">
//                   <label htmlFor="">កាលបរិច្ឆេតបង់ប្រាក់</label>
//                   <input
//                     type="date"
//                     placeholder="0.0"
//                     min={1}
//                     className="input_text"
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <label htmlFor="">វិធីសាទូទាត់</label>
//                   <select name="" id="" className="input_text">
//                     <option value="">--ជ្រើសរើស--</option>
//                     <option value="abA">QR Code</option>
//                     <option value="បង់ផ្ទាល់">បង់ផ្ទាល់</option>
//                   </select>
//                 </div>

//                 <div className="space-y-2">
//                   <label htmlFor="">គណនី</label>
//                   <select name="" id="" className="input_text">
//                     <option value="">--ជ្រើសរើស--</option>
//                     <option value="aba">ABA</option>
//                     <option value="AC Lida">AC Lida</option>
//                   </select>
//                 </div>


{/*
   <div className="space-y-2">
<label htmlFor="" className="font-bold font-NotoSansKhmer">
  កាលបរិច្ឆេតទិញ
</label>
<input type="date" required className="input_text  p-[7px]" />
</div>
<div className="space-y-2">
<label htmlFor="" className="font-bold font-NotoSansKhmer">
  ស្ថានភាព: *
</label>
<select name="" id="" className="input_text font-NotoSansKhmer">
  <option value="" selected disabled>
    --ជ្រើសរើស--
  </option>
  <option value={1}>បានទទួល</option>
  <option value={2}>រងចាំ</option>
  <option value={3}>បានបញ្ជាទិញ</option>
</select>
</div> '*/}