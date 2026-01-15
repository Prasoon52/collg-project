import React from 'react'
import home from "../assets/home1.jpg"
import Nav from '../components/Nav'
import { SiViaplay } from "react-icons/si";
import Logos from '../components/Logos';
import Cardspage from '../components/Cardspage';
import ExploreCourses from '../components/ExploreCourses';
import About from '../components/About';
import ai from '../assets/ai.png'
import ai1 from '../assets/SearchAi.png'
import ReviewPage from '../components/ReviewPage';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate()

  return (
    <div className='w-full overflow-x-hidden bg-slate-50'>
      
      {/* --- HERO SECTION --- */}
      <div className='w-full lg:h-[90vh] h-[80vh] relative'>
        
        <div className="absolute top-0 left-0 w-full z-50">
           <Nav/>
        </div>

        {/* Background Image with Blue Overlay */}
        <div className="w-full h-full relative">
           <img 
              src={home} 
              className='w-full h-full object-cover md:object-fill' 
              alt="Background" 
           />
           {/* Blue Gradient Overlay for Theme */}
           <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-blue-900/50 to-slate-50"></div>
        </div>

        {/* Hero Text Content */}
        <div className='absolute inset-0 flex flex-col items-center justify-center text-center px-4 pt-16'>
            
            <h1 className='text-3xl md:text-5xl lg:text-7xl font-extrabold text-white tracking-tight drop-shadow-2xl mb-4'>
              Grow Your Skills to Advance
            </h1>
            
            <h2 className='text-xl md:text-3xl lg:text-5xl font-bold text-blue-200 drop-shadow-lg mb-10'>
              Your Career Path
            </h2>

            {/* Buttons Section */}
            <div className='flex flex-col md:flex-row items-center gap-6 w-full justify-center'>
              
              <button 
                className='px-8 py-3 border-2 border-white text-white rounded-xl text-lg font-medium flex items-center gap-3 hover:bg-white hover:text-blue-900 transition-all duration-300 backdrop-blur-sm' 
                onClick={() => navigate("/allcourses")}
              >
                View all Courses 
                <SiViaplay className='w-6 h-6' />
              </button>

              <button 
                className='px-8 py-3 bg-blue-600 text-white rounded-xl text-lg font-medium flex items-center gap-3 shadow-lg shadow-blue-500/50 hover:bg-blue-700 hover:scale-105 transition-all duration-300' 
                onClick={() => navigate("/searchwithai")}
              >
                Search with AI 
                <img src={ai} className='w-8 h-8 rounded-full hidden lg:block border border-blue-400' alt="AI" />
                <img src={ai1} className='w-8 h-8 rounded-full lg:hidden border border-blue-400' alt="AI" />
              </button>

            </div>
        </div>
      </div>

      {/* --- PAGE COMPONENTS --- */}
      <div className='bg-white'>
         <Logos/>
      </div>
      
      <ExploreCourses/>
      <Cardspage/>
      <About/>
      <ReviewPage/>
      <Footer/>

    </div>
  ) 
}

export default Home