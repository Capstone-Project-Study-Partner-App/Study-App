import { useState, useEffect } from "react";
import { AuthError, getProfile, getRsvpByUserId } from "../fetching";
import { LOGIN_ROUTE } from "./login";





export default function UserDashboard() {
    const [user, setUser] = useState(null);
    const [rsvps, setRsvps] = useState([]);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        async function fetchData() {
          try {
            const { current_user } = await getProfile();
            setUser(current_user);
          } catch (err) {
            if (err instanceof AuthError) {
              navigate(LOGIN_ROUTE);
            } else {
              throw err;
            }
          }
        }
        fetchData();
      }, []);

      useEffect(() => {
        async function getAllEvents() {
          try {
            if (user) {
              
              const response = await getRsvpByUserId(user.user_id);
              setRsvps(response);
              console.log("API Response:", response);
            }
          } catch (error) {
            setError(error.message); 
          }
        }
        getAllEvents();
      }, [user]);
    return (

<div className="h-screen  bg-white mt-16">
{user && (
	<div className="grid grid-cols-1 gap-4 lg:grid-cols-3 md:grid-cols-2 lg:gap-8">
		<div className="post p-5 lg:p-1 rounded-md">
			<div className="lg:fixed lg:top-7 lg:left-14 lg:w-3/12 md:fixed md:w-5/12">
				<div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full mb-4 mt-16">
					{/* <!-- Banner Profile --> */}
					<div className="relative">
						<img src="https://prod-website-cdn.studysmarter.de/sites/5/us/Study-with-Me-dark-2048x1152-1-1536x864-min.png" alt="Banner Profile" className="w-full rounded-t-lg"/>
						<img src={user.photo} alt="Profile Picture" className="absolute bottom-0 left-2/4 transform -translate-x-1/2 translate-y-1/2 w-24 h-24 rounded-full border-4 border-white"/>
					</div>
					{/* <!-- User Info with Verified Button --> */}
					<div className="flex items-center mt-4">
						<h2 className="text-xl font-bold text-gray-800">{user.first_name}</h2>
					</div>
					{/* <!-- Bio --> */}
					<p className="text-gray-700 mt-2"> {user.about_me} </p>
				</div>
				<div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
					<form>
						{/* <!-- Post Content Section --> */}
						<div className="mb-6">
							<label htmlFor="postContent" className="block text-gray-700 text-sm font-bold mb-2">Daily Check in:</label>
							
<h3 className="mb-4 font-semibold text-gray-900 dark:text-white">whatever</h3>
<ul className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
    <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
        <div className="flex items-center pl-3">
            <input id="vue-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
            <label htmlFor="vue-checkbox" className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">option 1</label>
        </div>
    </li>
    <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
        <div className="flex items-center pl-3">
            <input id="react-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
            <label htmlFor="react-checkbox" className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">option 2</label>
        </div>
    </li>
    <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
        <div className="flex items-center pl-3">
            <input id="angular-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
            <label htmlFor="angular-checkbox" className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">option 3</label>
        </div>
    </li>
    <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
        <div className="flex items-center pl-3">
            <input id="laravel-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
            <label htmlFor="laravel-checkbox" className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">option 4</label>
        </div>
    </li>
</ul>

						</div>
						{/* <!-- Submit Button and Character Limit Section --> */}
						<div className="flex items-center justify-between">
							<button type="submit" className="flex justify-center items-center bg-blue-500 hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue text-white py-2 px-4 rounded-md transition duration-300 gap-2"> Submit <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" id="send" fill="#fff">
									<path fill="none" d="M0 0h24v24H0V0z"></path>
									<path d="M3.4 20.4l17.45-7.48c.81-.35.81-1.49 0-1.84L3.4 3.6c-.66-.29-1.39.2-1.39.91L2 9.12c0 .5.37.93.87.99L17 12 2.87 13.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91z"></path>
								</svg>
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
		<div className="lg:col-span-2 p-4 bg-white mt-3" id="posted">
        {rsvps.map((event) => ( 
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-4" key={event.event_id}>
				{/* <!-- First Column / EVENT INFO--> */}
				<div className="bg-white p-8 rounded-lg shadow-md max-w-md">
					{/* <!-- User Info with Three-Dot Menu --> */}
					<div className="flex items-center justify-between mb-4">
						<div className="flex items-center space-x-2">
							<img src="https://img.freepik.com/free-vector/boy-student-sitting-stack-books-with-laptop-flat-icon-illustration_1284-64037.jpg" alt="User Avatar" className="w-24 h-24 rounded-full"/>
							<div>
								<p className="text-gray-800 font-semibold">Events:</p>
								<p className="text-gray-500 text-sm">upcoming/past events</p>
							</div>
						</div>
						<div className="text-gray-500 cursor-pointer">
							{/* <!-- Three-dot menu icon --> */}
							<button className="hover:bg-gray-50 rounded-full p-1">
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
									<circle cx="12" cy="7" r="1" />
									<circle cx="12" cy="12" r="1" />
									<circle cx="12" cy="17" r="1" />
								</svg>
							</button>
						</div>
					</div>
					{/* <!-- Message --> */}
					<div className="mb-4">
                        <a href={`/events/${event.event_id}`} className="text-blue-600">{event.title}</a>
						<p className="text-gray-800">{new Date(event.datetime).toLocaleString()}{" "} {event.timezone}</p>
                        {!event.location && !event.address && event.virtual && (
                        <p className="text-gray-800">Virtual {event.virtual}</p> 
                        )}
					</div>
                    					{/* <!-- Image --> */}
					<div className="mb-4">
						<img src="https://i.scdn.co/image/ab67616d00001e02da3d7774dfff7799598fa07b" alt="Post Image" className="w-full h-48 object-cover rounded-md"/>
					</div>
		
				</div>
				
                
				{/* <!-- Second Column / RATING--> */}
				<div className="bg-white p-8 shadow-md rounded-lg max-w-md">
					{/* <!-- User Info with Three-Dot Menu --> */}
					<div className="flex items-center justify-between mb-4">
						<div className="flex items-center space-x-2">
							<img src="https://cdn-icons-png.flaticon.com/512/4001/4001136.png" alt="User Avatar" className="w-24 h-24 rounded-full"/>
							<div>
								<p className="text-gray-800 font-semibold">Ratings:</p>
								<p className="text-gray-500 text-sm">current ratings</p>
							</div>
						</div>
						<div className="text-gray-500 cursor-pointer">
							{/* <!-- Three-dot menu icon --> */}
							<button className="hover:bg-gray-50 rounded-full p-1">
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
									<circle cx="12" cy="7" r="1" />
									<circle cx="12" cy="12" r="1" />
									<circle cx="12" cy="17" r="1" />
								</svg>
							</button>
						</div>
					</div>
					{/* <!-- Message --> */}
					<div className="mb-4">
                        <a href="" className="text-blue-600">user?</a>
						<p className="text-gray-800">rating?</p>
					</div>
					{/* <!-- Image --> */}
					<div className="mb-4">
						<img src="https://i.scdn.co/image/ab67616d00001e02da3d7774dfff7799598fa07b" alt="Post Image" className="w-full h-48 object-cover rounded-md"/>
					</div>
					
				</div>
		
				{/* <!-- First Column / PARTNERS--> */}
				<div className="bg-white p-8 rounded-lg shadow-md max-w-md">
					{/* <!-- User Info with Three-Dot Menu --> */}
					<div className="flex items-center justify-between mb-4">
						<div className="flex items-center space-x-2">
							<img src="https://img.pikbest.com/png-images/20211011/focused-people-studying-in-online-school_6139981.png!bw700" alt="User Avatar" className="w-24 h-24 rounded-full"/>
							<div>
								<p className="text-gray-800 font-semibold">Partners:</p>
								<p className="text-gray-500 text-sm">past partners</p>
							</div>
						</div>
						<div className="text-gray-500 cursor-pointer">
							{/* <!-- Three-dot menu icon --> */}
							<button className="hover:bg-gray-50 rounded-full p-1">
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
									<circle cx="12" cy="7" r="1" />
									<circle cx="12" cy="12" r="1" />
									<circle cx="12" cy="17" r="1" />
								</svg>
							</button>
						</div>
					</div>
{/* <!-- Message --> */}
<div className="mb-4">
                        <a href="" className="text-blue-600">user</a>
						<p className="text-gray-800">info</p>
					</div>
					{/* <!-- Image --> */}
					<div className="mb-4">
						<img src="https://i.scdn.co/image/ab67616d00001e02da3d7774dfff7799598fa07b" alt="Post Image" className="w-full h-48 object-cover rounded-md"/>
					</div>
				</div>
				{/* <!-- Second Column --> */}
				<div className="bg-white p-8 shadow-md rounded-lg max-w-md">
					{/* <!-- User Info with Three-Dot Menu --> */}
					<div className="flex items-center justify-between mb-4">
						<div className="flex items-center space-x-2">
							<img src="https://banner2.cleanpng.com/20180916/stl/kisspng-learning-reading-comprehension-study-skills-educat-5b9e58993816a4.9541511015371040252298.jpg" alt="User Avatar" className="w-24 h-24 rounded-full"/>
							<div>
								<p className="text-gray-800 font-semibold">Something else?</p>
								<p className="text-gray-500 text-sm">idk</p>
							</div>
						</div>
						<div className="text-gray-500 cursor-pointer">
							{/* <!-- Three-dot menu icon --> */}
							<button className="hover:bg-gray-50 rounded-full p-1">
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
									<circle cx="12" cy="7" r="1" />
									<circle cx="12" cy="12" r="1" />
									<circle cx="12" cy="17" r="1" />
								</svg>
							</button>
						</div>
					</div>
{/* <!-- Message --> */}
<div className="mb-4">
                        <a href="" className="text-blue-600">???</a>
						<p className="text-gray-800">maybe not</p>
					</div>
					{/* <!-- Image --> */}
					<div className="mb-4">
						<img src="https://i.scdn.co/image/ab67616d00001e02da3d7774dfff7799598fa07b" alt="Post Image" className="w-full h-48 object-cover rounded-md"/>
					</div>
				</div>
				
					
			
			</div>
		))}
        </div>
	</div>
)}
</div>
    );

    }
