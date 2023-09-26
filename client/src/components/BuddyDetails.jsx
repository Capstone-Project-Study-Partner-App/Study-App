import { useEffect, useState } from 'react';
import { getUserById } from '../fetching';
import { useParams } from 'react-router-dom';


export default function BuddyDetails (){

const { user_id } = useParams();

const [userId, setUserId] = useState('');

useEffect(() => {
async function fetchData() {
    const users = await getUserById(userId);
    setUserId(users);
}
fetchData();
}, [user_id]);

return (
<div>
    <div className="flex-1 p-4">
        <h1 className="text-2xl font-semibold mb-4">All Buddies</h1>
        <div className="flex flex-wrap">
                <div key={user_id} className="border rounded-md p-4 hover:bg-gray-100">
                <img src={photo} alt={`${first_name} ${last_name}`} />
                <p>{first_name} {last_name}</p>
                <p>Gender: {gender}</p>
                <p>Age: {dob}</p>
                <p>Level of Education: {education_level}</p>
                </div>
        </div>
    </div>
</div>
);
}