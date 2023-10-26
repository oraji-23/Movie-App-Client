import React from "react";
import { Link, Outlet } from "react-router-dom";
import { MdMovie, MdSpaceDashboard } from "react-icons/md";

const AuthLayout = () => {
  return (
    <div>
      <Link>
        <MdMovie className="fs-1 custom-text-red my-5" />
      </Link>

      <Outlet />
    </div>
  );
};

export default AuthLayout;
