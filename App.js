import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
    const [clanData, setClanData] = useState(null);
    const [membersData, setMembersData] = useState([]);
    const [warlogData, setWarlogData] = useState([]);
    const clanTag = 'YOUR_CLAN_TAG';

    useEffect(() => {
        const fetchClanData = async () => {
            const response = await axios.get(`http://localhost:5000/clan/${clanTag}`);
            setClanData(response.data);
        };

        const fetchMembersData = async () => {
            const response = await axios.get(`http://localhost:5000/clan/${clanTag}/members`);
            setMembersData(response.data.items);
        };

        const fetchWarlogData = async () => {
            const response = await axios.get(`http://localhost:5000/clan/${clanTag}/warlog`);
            setWarlogData(response.data.items);
        };

        fetchClanData();
        fetchMembersData();
        fetchWarlogData();
    }, [clanTag]);

    return (
        <div>
            <h1>Clan Info</h1>
            {clanData && (
                <div>
                    <h2>{clanData.name}</h2>
                    <p>{clanData.description}</p>
                    <p>Members: {clanData.members}</p>
                </div>
            )}
            <h2>Members</h2>
            <ul>
                {membersData.map(member => (
                    <li key={member.tag}>{member.name} - {member.role}</li>
                ))}
            </ul>
            <h2>War Log</h2>
            <ul>
                {warlogData.map(war => (
                    <li key={war.attackerTag}>{war.attackerName} vs {war.defenderName}</li>
                ))}
            </ul>
        </div>
    );
};

export default App;
