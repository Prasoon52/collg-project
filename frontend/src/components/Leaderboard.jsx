import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { serverUrl } from "../App";
import {
  FaCrown,
  FaMedal,
  FaTrophy,
  FaFire,
  FaUserCircle,
} from "react-icons/fa";
import { motion } from "framer-motion";

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const { data } = await axios.get(`${serverUrl}/api/user/leaderboard`);
        setUsers(data || []);
      } catch (error) {
        console.error("Leaderboard Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [userData?.xp]);

  const sortedUsers = [...users].sort((a, b) => (b.xp || 0) - (a.xp || 0));

  const getRankStyle = (index) => {
    if (index === 0)
      return "bg-gradient-to-r from-yellow-50 to-amber-100 border-amber-300 shadow-amber-100";
    if (index === 1)
      return "bg-gradient-to-r from-slate-50 to-gray-200 border-slate-300 shadow-slate-100";
    if (index === 2)
      return "bg-gradient-to-r from-orange-50 to-red-100 border-orange-300 shadow-orange-100";
    return "bg-white border-slate-100 hover:bg-blue-50";
  };

  const getRankIcon = (index) => {
    if (index === 0)
      return (
        <FaCrown className="text-amber-500 text-3xl drop-shadow-md animate-bounce" />
      );
    if (index === 1) return <FaMedal className="text-slate-400 text-2xl" />;
    if (index === 2) return <FaMedal className="text-orange-700 text-2xl" />;
    return (
      <span className="font-black text-slate-400 text-lg">#{index + 1}</span>
    );
  };

  const getBadgeStyle = (rank) => {
    switch (rank) {
      case "Terminator":
        return "bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-red-200";
      case "Master":
        return "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-purple-200";
      case "Expert":
        return "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-blue-200";
      case "Apprentice":
        return "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-emerald-200";
      default:
        return "bg-slate-100 text-slate-500 border border-slate-200";
    }
  };

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className="w-full max-w-3xl mx-auto my-12 font-sans">
      <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden relative">
        {/* --- Header --- */}
        <div className="bg-[#0f172a] p-8 md:p-10 relative overflow-hidden text-center md:text-left">
          {/* Decor */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-[80px] -mr-16 -mt-16" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-500/10 rounded-full blur-[60px] -ml-10 -mb-10" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-2">
                Global{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-500">
                  Leaderboard
                </span>
              </h2>
              <p className="text-blue-200 font-medium">
                Top Terminators dominating the arena.
              </p>
            </div>
            <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/10 shadow-xl transform rotate-3">
              <FaTrophy className="text-amber-400 text-3xl drop-shadow-lg" />
            </div>
          </div>
        </div>

        {/* --- List Body --- */}
        <div className="p-4 md:p-8 bg-slate-50/50 min-h-[400px]">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">
                Loading Ranks...
              </p>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-4">
              {sortedUsers.slice(0,5).map((user, index) => (
                <motion.div
                  key={user._id}
                  variants={itemVariants}
                  whileHover={{ scale: window.innerWidth >= 640 ? 1.02 : 1 }}
                  className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 sm:p-5 rounded-3xl border-2 transition-all shadow-sm
                ${getRankStyle(index)}
                ${user._id === userData?._id ? "ring-2 ring-blue-500 ring-offset-2" : ""}
              `}>
                  {/* LEFT */}
                  <div className="flex items-center gap-3 sm:gap-6 min-w-0">
                    {/* Rank */}
                    <div className="w-10 sm:w-12 flex justify-center shrink-0">
                      {getRankIcon(index)}
                    </div>

                    {/* Avatar */}
                    <div className="relative shrink-0">
                      {index === 0 && (
                        <FaCrown className="absolute -top-3 -right-2 text-amber-400 text-sm sm:text-lg animate-pulse" />
                      )}
                      {user.photoUrl ? (
                        <img
                          src={user.photoUrl}
                          alt={user.name}
                          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-4 border-white shadow-md"
                        />
                      ) : (
                        <FaUserCircle className="w-12 h-12 sm:w-14 sm:h-14 text-slate-300 bg-white rounded-full border-4 border-white shadow-md" />
                      )}
                    </div>

                    {/* Name & Badge */}
                    <div className="min-w-0">
                      <h3 className="font-bold text-slate-800 text-sm sm:text-lg flex items-center gap-2 truncate">
                        <span className="truncate max-w-[140px] sm:max-w-[220px]">
                          {user.name}
                        </span>
                        {user._id === userData?._id && (
                          <span className="bg-blue-100 text-blue-700 text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0">
                            You
                          </span>
                        )}
                      </h3>

                      <span
                        className={`inline-block mt-1 text-[8px] sm:text-[9px] px-2 sm:px-3 py-1 rounded-lg font-black uppercase tracking-widest shadow-sm ${getBadgeStyle(
                          user.rank,
                        )}`}>
                        {user.rank || "Novice"}
                      </span>
                    </div>
                  </div>

                  {/* RIGHT (XP) */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center text-right">
                    <div className="text-lg sm:text-2xl font-black text-slate-900 flex items-center gap-1">
                      {user.xp || 0}
                      <FaFire className="text-amber-500 text-sm" />
                    </div>
                    <div className="text-[9px] sm:text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                      Total XP
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;