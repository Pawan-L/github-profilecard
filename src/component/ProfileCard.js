import React, { useState, useEffect } from "react";
import axios from "axios";

const ProfileCard = () => {
    const [username, setUsername] = useState("");
    const [userData, setUserData] = useState(null);

    const fetchGitHubData = async (username) => {
        try {
            const response = await axios.get(`https://api.github.com/users/${username}`);
            setUserData(response.data);
        } catch (error) {
            console.error("Error fetching GitHub data:", error);
            setUserData(null);
        }
    };

    useEffect(() => {
    }, [username]);
    function handleSubmit(){
        fetchGitHubData(username);
    }
    return (
        <div className="container mt-24 max-w-xs m-auto bg-teal-500 text-white text-extrabold rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4 text-center">GitHub Profile Card</h2>
                <div className="mb-4 form">
                    <label htmlFor="username" className="block font-medium text-extrabold text-white text-center">
                        GitHub Username:
                    </label>
                    <input
                        type="text"
                        id="username"
                        className="p-2 border rounded-md text-black w-full"
                        placeholder="Enter GitHub Username"
                        value={username}
                        onChange={(e)=>{if(e.target.value===""){
                            setUsername("")
                        }else{
                            setUsername(e.target.value)
                        }
                    }}
                    />
                </div>
                <button className="bg-black p-1 px-2 rounded" onClick={handleSubmit}>Submit</button>

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
