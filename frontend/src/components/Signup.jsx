import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios'

import { useNavigate } from "react-router-dom";
import { Link} from 'react-router-dom';
const SignUp = () => {
  
      const navigate = useNavigate()
  const [name,setname] = useState("")
  const [email,setemail] = useState("")
  const [pass,setpass] = useState("")

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.1 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  };

  const createUser = async(e)=>{
    e.preventDefault()
    console.log("Hello")
    const res = await axios.post("http://localhost:5000/user/signup",{name,email,pass})
    console.log(res)
    if(res.status==201)  navigate("/signin")
    setname("")
    setemail("")
    setpass("")
    
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#070b14] overflow-hidden relative">
      {/* Decorative Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full" />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md z-10 p-[1.5px] rounded-3xl bg-gradient-to-b from-[#4f27d9] to-transparent shadow-[0_0_50px_-12px_rgba(79,39,217,0.3)]"
      >
        <div className="bg-[#0f121d] rounded-[calc(1.5rem-1px)] p-10">
          <motion.div variants={itemVariants} className="mb-10 text-center">
            <h2 className="text-3xl font-extrabold text-white tracking-tight">Join Us</h2>
            <p className="text-gray-400 mt-2 text-sm">Start your professional journey today.</p>
          </motion.div>

          <form onSubmit={createUser} className="space-y-6">

            <motion.div variants={itemVariants} key="Full Name">
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 ml-1">
                  Full Name
                </label>
                <input 
                  value={name}
                  onChange={(e)=>setname(e.target.value)}
                  placeholder="Full Name"
                  className="w-full bg-[#161b2a] border border-gray-800 text-white placeholder-gray-500 px-4 py-3.5 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300"
                />
              </motion.div>

              <motion.div variants={itemVariants} key="Email Address">
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 ml-1">
                  Email Address
                </label>
                <input 
                value={email}
                onChange={(e)=>setemail(e.target.value)}
                  placeholder="Email Address"
                  className="w-full bg-[#161b2a] border border-gray-800 text-white placeholder-gray-500 px-4 py-3.5 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300"
                />
              </motion.div>

              <motion.div variants={itemVariants} key="Password">
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 ml-1">
                  Password
                </label>
                <input 
                value={pass}
                onChange={(e)=>setpass(e.target.value)}
                  placeholder="Password"
                  className="w-full bg-[#161b2a] border border-gray-800 text-white placeholder-gray-500 px-4 py-3.5 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300"
                />
              </motion.div>


            <motion.button 
              variants={itemVariants}
              whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(0, 123, 255, 0.4)" }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-[#007bff] text-white font-bold py-4 rounded-xl shadow-lg transition-all"
            >
              Create Account
            </motion.button>
          </form>
          <p className="mt-8 text-center text-gray-500 text-sm">
            Don you have an account? <span className="text-blue-500 cursor-pointer hover:underline"><Link to='/signin'>Sign in</Link></span>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUp;