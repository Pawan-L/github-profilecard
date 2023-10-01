import React, { useState, useEffect } from "react";
import axios from "axios";

const ProfileCard = () => {
    const [username, setUsername] = useState("");
    const [userData, setUserData] = useState(null);

    const fetchGitHubData = async () => {
        try {
            const response = await axios.get(`https://api.github.com/users/${username}`);
            setUserData(response.data);
        } catch (error) {
            console.error("Error fetching GitHub data:", error);
            setUserData(null);
        }
    };

    useEffect(() => {
        if (username) {
            fetchGitHubData();
        }
    }, [username]);
    return (
        <div className="container m-auto w-1/3 mt-24 bg-teal-500 text-white text-extrabold rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4 text-center">GitHub Profile Card</h2>
                <div className="mb-4 form">
                    <label htmlFor="username" className="block font-medium text-extrabold text-white text-center">
                        GitHub Username:
                    </label>
                    <input
                        type="text"
                        id="username"
                        className="w-full p-2 border rounded-md text-black w-96 ml-12"
                        placeholder="Enter GitHub Username"
                        value={username}
                        onChange={(e)=>setUsername(e.target.value)}
                    />
                </div>

            {
                userData && (
                    <div>
                        <img
                            src={userData.avatar_url}
                            alt={`${userData.login}'s Avatar`}
                            className="mx-auto w-48 h-48 rounded-full "
                        />
                        <h2 className="text-xl font-semibold mt-4 text-center text-white text-bold">{userData.login}</h2>
                        <p className="text-gray-500 text-center text-white text-bold">{userData.name}</p>
                        <ul className="mt-4">
                            <li className="flex justify-center items-center text-white text-bold">
                                Public Repos: {userData.public_repos}
                            </li>
                            <li className="flex justify-center items-center text-white text-bold mt-2 text-center ">
                                Public Gists: {userData.public_gists}
                            </li>
                            <li className="flex justify-center items-center text-white text-bold mt-2 text-center">
                                Profile Created At: {new Date(userData.created_at).toLocaleDateString("en-US")}
                            </li>
                        </ul>
                    </div>
                )
            }
        </div >
    );
};

export default ProfileCard;
