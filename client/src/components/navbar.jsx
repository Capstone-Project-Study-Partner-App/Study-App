import {Link} from 'react-router-dom';


export default function Navbar (){
    return (
        <div>
            <Link to='/'>Home</Link>
            <Link to='/users'>Buddies</Link>
            <Link to='/events'>Events</Link>
            <Link to='/:id/messages'>Messages</Link>
        </div>
    )

}