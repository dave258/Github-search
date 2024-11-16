import React, { useState } from "react";
import axios from "axios";
import Background from "./components/background";
import { Oval } from "react-loader-spinner";
import { FaTelegramPlane, FaGithub, FaLinkedin } from "react-icons/fa";

interface UserProfile {
  login: string;
  avatar_url: string;
  name: string;
  bio: string;
  public_repos: number;
  followers: number;
  location: string;
  html_url: string;
}

const App: React.FC = () => {
  const [username, setUsername] = useState("");
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!username) {
      setError("Please enter a GitHub username");
      return;
    }
    setLoading(true);
    setError("");
    setUserProfile(null);

    try {
      const response = await axios.get(
        `https://api.github.com/users/${username}`
      );
      setUserProfile(response.data);
    } catch (err: any) {
      setError(
        err.response?.status === 404 ? "User not found" : "An error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white">
      <Background />
      <h1 className="text-4xl font-bold mb-8">GitHub User Search</h1>

      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username"
          className="px-4 py-2 text-black rounded-md focus:outline-none"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700 transition"
        >
          Search
        </button>
      </div>

      {loading && (
        <div className="mt-4">
          <Oval height={50} width={50} color="#4fa94d" visible={true} />
        </div>
      )}

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {userProfile && (
        <div className="mt-8 p-6 bg-gray-900 rounded-lg shadow-lg max-w-md w-full">
          <img
            src={userProfile.avatar_url}
            alt={userProfile.login}
            className="w-24 h-24 rounded-full mx-auto"
          />
          <h2 className="text-2xl text-center mt-4">
            {userProfile.name || userProfile.login}
          </h2>
          <p className="text-center text-sm mt-2">{userProfile.bio}</p>
          <div className="flex justify-around mt-4 text-gray-400">
            <span>Repos: {userProfile.public_repos}</span>
            <span>Followers: {userProfile.followers}</span>
            <span>{userProfile.location || "No Location"}</span>
          </div>
          <a
            href={userProfile.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="block mt-4 text-center text-blue-400 hover:underline"
          >
            View Profile
          </a>
        </div>
      )}

      {/* Footer Component */}
      <footer className="mt-10 text-gray-400 text-sm flex flex-col items-center">
        <p>
          Developed by{" "}
          <span className="text-white font-semibold">Dawit_Tesfaye</span>
        </p>
        <div className="flex space-x-4 mt-2">
          <a
            href="https://t.me/Davidlvmak"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTelegramPlane
              size={24}
              className="hover:text-blue-500 transition"
            />
          </a>
          <a
            href="https://github.com/dave258"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub size={24} className="hover:text-gray-300 transition" />
          </a>
          <a
            href="www.linkedin.com/in/dawit-tech"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin size={24} className="hover:text-blue-700 transition" />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default App;
