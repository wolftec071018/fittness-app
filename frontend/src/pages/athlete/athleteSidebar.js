import {
    faHome,
    faEnvelope,
    faRunning,
    faChartLine,
    faRulerVertical,
    faComments
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

function AthleteSidebar() {
    return (
    <div>
        <div className = "welcomebg h-full min-h-screen max-w-lg fixed px-5 w-56 rounded-r-3xl">
        <div  className="mt-10">
        <Link
            className="text-sm font-bold leading-relaxed inline-block whitespace-nowrap uppercase text-white hover:opacity-75"
            to="/athleteDashboard"
          >
            <div className="">
              <FontAwesomeIcon icon={faHome} size="lg" />
            </div>
             Dashboard
        </Link>
         </div>

          {/* <div className="mt-10">
          <Link
            className="text-sm font-bold leading-relaxed whitespace-nowrap uppercase text-white hover:opacity-75"
            to="/emailInvite"
          >
            <div className="">
              <FontAwesomeIcon icon={faEnvelope} size="lg" />
            </div>
             Email Invites
          </Link>
          </div> */}

          <div className="mt-10">
          <Link
            className="text-sm font-bold leading-relaxed whitespace-nowrap uppercase text-white hover:opacity-75"
            to="/clientWorkout"
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
            to="/measurement"
          >
            <div className="">
              <FontAwesomeIcon icon={faRulerVertical} size="lg" />
            </div>
             Measurements
          </Link>
          </div>

          <div className="mt-10">
          <Link
            className="text-sm font-bold leading-relaxed whitespace-nowrap uppercase text-white hover:opacity-75"
            to="/bodyProgression"
          >
            <div className="">
              <FontAwesomeIcon icon={faChartLine} size="lg" />
            </div>
             Progress
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

export default AthleteSidebar;