"use client";

import '../app/globals.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
//////////////////////////////////////////////////

export default function Loader() {
  return (
    <div className="w-full h-full fixed top-0 left-0 bg-white opacity-75 z-50">
      <div className="flex justify-center items-center mt-[50vh] w-full h-full">
        <FontAwesomeIcon icon={faCircleNotch} spin className="text-violet-600" style={{ fontSize: '3rem' }} />
      </div>
    </div>
  );
}
