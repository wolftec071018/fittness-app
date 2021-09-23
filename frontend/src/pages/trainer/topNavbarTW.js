import React from "react";
import { Link } from 'react-router-dom';
import {
  faHome,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function TopNavbar() {
  // const [navbarOpen, setNavbarOpen] = React.useState(false);
  return (
    <>
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-mypurple-500">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <a
              className="text-md font-bold leading-relaxed inline-block mr-4 whitespace-nowrap uppercase text-mywhite-500"
              href="/"
            >
              Fitness Workout Log
            </a>
          </div>
            <div className="justify-items-end">
          <Link
            className="text-sm font-bold leading-relaxed inline-block mr-4 whitespace-nowrap uppercase text-mywhite-500 hover:text-mywhite-900"
            to="/"
          >
            Logout
          </Link>
          </div>
          </div>
      </nav>
    </>
  );
}