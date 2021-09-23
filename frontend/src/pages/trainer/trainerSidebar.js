import {
    faHome,
    faEnvelope,
    faRunning,
    faComments
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

function TrainerSidebar() {
    return (
    <div>
        <div className = "bg-mypurple-500 h-full min-h-screen max-w-lg fixed px-5 w-56 rounded-r-3xl">
        <div  className="mt-10">
        <Link
            className="text-sm font-bold leading-relaxed inline-block whitespace-nowrap uppercase text-white hover:opacity-75"
            to="/TrainerDashboard"
          >
            <div className="">
              <FontAwesomeIcon icon={faHome} size="lg" />
            </div>
             Home
          </Link>
          </div>

          <div className="mt-10">
          <Link
            className="text-sm font-bold leading-relaxed whitespace-nowrap uppercase text-white hover:opacity-75"
            to="/emailInvite"
          >
            <div className="">
              <FontAwesomeIcon icon={faEnvelope} size="lg" />
            </div>
             Email Invites
          </Link>
          </div>

          <div className="mt-10">
          <Link
            className="text-sm font-bold leading-relaxed whitespace-nowrap uppercase text-white hover:opacity-75"
            to="/workoutList"
          >
            <div className="">
              <FontAwesomeIcon icon={faRunning} size="lg" />
            </div>
             Workouts
          </Link>
          </div>

          <div className="mt-10">
          <Link
            className="text-sm font-bold leading-relaxed whitespace-nowrap uppercase text-white hover:opacity-75"
            to="/chat"
          >
            <div className="">
              <FontAwesomeIcon icon={faComments} size="lg" />
            </div>
             Chat
          </Link>
          </div>

        </div>
    </div>);
}

export default TrainerSidebar;