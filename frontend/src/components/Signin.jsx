import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';

const SignIn = () => {
  
    const [email,setemail] = useState("")
    const [pass,setpass] = useState("")
    const navigate = useNavigate()


   const createUser = async(e)=>{
    e.preventDefault()
    console.log("Hello")
    const response = await axios.post("http://localhost:5000/user/signin",{name,email,pass})
    localStorage.setItem("token",response.data.token)
    if(response.status==201)  navigate("/home")
    console.log(response)
    setemail("")
    setpass("")
    
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-[#070b14] relative overflow-hidden">
      {/* Dynamic Background Element */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute w-[500px] h-[500px] bg-blue-900/20 blur-[100px] rounded-full"
      />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md z-10 p-[1px] rounded-3xl bg-gradient-to-tr from-[#4f27d9] via-blue-500/20 to-transparent"
      >
        <div className="bg-[#0f121d]/90 backdrop-blur-xl rounded-[calc(1.5rem-1px)] p-10">
          <div className="mb-10">
            <h2 className="text-3xl font-extrabold text-white">Welcome Back</h2>
            <div className="h-1 w-12 bg-blue-600 mt-2 rounded-full" />
          </div>

          <form onSubmit={createUser} className="space-y-6">
            <div>
              <input 
                value={email}
                onChange={(e)=>setemail(e.target.value)}
                type="email" 
                placeholder="Email Address"
                className="w-full bg-[#161b2a] border border-gray-800 text-white placeholder-gray-500 px-4 py-3.5 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-[#1c2235] transition-all"
              />
            </div>
            
            <div>
              <input 
                value={pass}
                onChange={(e)=>setpass(e.target.value)}
                type="password" 
                placeholder="Password"
                className="w-full bg-[#161b2a] border border-gray-800 text-white placeholder-gray-500 px-4 py-3.5 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-[#1c2235] transition-all"
              />
            </div>

            <div className="flex justify-between items-center px-1">
              <label className="flex items-center text-sm text-gray-400 cursor-pointer">
                <input type="checkbox" className="mr-2 accent-blue-600" /> Remember me
              </label>
              <a href="#" className="text-sm text-blue-500 hover:text-blue-400">Forgot?</a>
            </div>

            <motion.button 
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold py-4 rounded-xl shadow-[0_10px_20px_-10px_rgba(0,123,255,0.5)]"
            >
              Sign In
            </motion.button>
          </form>

          <p className="mt-8 text-center text-gray-500 text-sm">
            Don't have an account? <span className="text-blue-500 cursor-pointer hover:underline"><Link to='/signup'>Sign up</Link></span>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignIn;