import './App.css'
import { Routes, Route } from 'react-router'
import Homepage from './pages/Homepage.jsx'
import Loginpage from './pages/Loginpage.jsx'
import Notificationpage from './pages/Notificationspage.jsx'
import Onboardingpage from './pages/Onboardingpage.jsx'
import Signuppage from './pages/Signuppage.jsx'
import Chatpage from './pages/Chatpage.jsx'
import Callpage from './pages/Callpage.jsx'
import React from 'react'
import axios from 'axios'
import { axiosInstance } from './lib/axiosInstance.js'

import { Toaster, toast } from 'react-hot-toast'
import { useQuery } from '@tanstack/react-query'
function App() {
  // Set the base URL for axios
  const { data, error, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const response = await axiosInstance.get('https://localhost:5173/api/auth/me')
      return response.data
    },
    refetchOnWindowFocus: false,   
  })

  return (
    <>
    
      <div className='h-screen' data-theme='coffee'>
        <button onClick={()=> toast.success("Hello!!!!")}>Create a toast</button>
        <Routes>
          <Route path='/' element={<Homepage/>} />
          <Route path='/login' element={<Loginpage />} />
          <Route path='/notifications' element={<Notificationpage />} />
          <Route path='/onboarding' element={<Onboardingpage />} />
          <Route path='/signup' element={<Signuppage />} />
          <Route path='/chat' element={<Chatpage />} />
          <Route path='/call' element={<Callpage />} />

        </Routes>
        <Toaster />
      </div>
    </>
  )
}

export default App
