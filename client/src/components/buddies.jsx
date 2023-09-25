import { useState, useEffect } from 'react';
import { getAllUsers } from '../fetching';
import { Link } from 'react-router-dom'; // Import Link


export default function Buddies(){
    const [allUsers, setAllUsers] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const users = await getAllUsers();
      setAllUsers(users);
    }
    fetchData();
  }, []);


    return (
        <div className="flex">
        {/* Sidebar */}
        <div className="w-1/4 bg-gray-800 text-white p-4">
            <h2 className="text-xl font-semibold mb-4">Filter</h2>
            <div className="space-y-2">
            <label className="flex items-center">
                <input type="checkbox" className="form-checkbox text-indigo-600" />
                <span className="ml-2">Option 1</span>
            </label>
            <label className="flex items-center">
                <input type="checkbox" className="form-checkbox text-indigo-600" />
                <span className="ml-2">Option 2</span>
            </label>
            <label className="flex items-center">
                <input type="checkbox" className="form-checkbox text-indigo-600" />
                <span className="ml-2">Option 3</span>
            </label>
            </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4">
            <h1 className="text-2xl font-semibold mb-4">All Buddies</h1>
            <div className="flex flex-wrap">
            {allUsers ? (
                allUsers.map(({ user_id, photo, first_name, last_name, gender, dob, education_level }) => (
                <Link key={user_id} to={`/users/${user_id}`} className="w-1/4 p-4">
                    <div key={user_id} className="border rounded-md p-4 hover:bg-gray-100">
                    <img src={photo} alt={`${first_name} ${last_name}`} />
                    <p>{first_name} {last_name}</p>
                    <p>Gender: {gender}</p>
                    <p>Age: {dob}</p>
                    <p>Level of Education: {education_level}</p>
                    </div>
                </Link>
                ))
            ) : (
                <p>No buddies available.</p>
            )}
            </div>
        </div>
        
        </div>
  );
}
        
        
        
        
        
        
        
        
        
        
        
    //     <div>
    //   <h1 style={{ textAlign: 'center' }}>All Buddies</h1>
    //   <div style={{ display: 'flex', flexWrap: 'wrap' }}>
    //     {allUsers ? (
    //       allUsers.map(({ user_id, photo, first_name, last_name, gender, dob, education_level }) => (
    //         <Link key={user_id} to={`/users/${user_id}`}>
    //           <div key={user_id}>
    //             <img src={photo} />
    //             <p>{first_name} {last_name}</p>
    //             <p>Gender: {gender}</p>
    //             <p>Age: {dob}</p>
    //             <p>Level of Education: {education_level}</p>
    //           </div>
    //         </Link>
    //       ))
    //     ) : (
    //       <p>No buddies available.</p>
    //     )}
    //   </div>
    // </div>



Buddies.propTypes = {
};