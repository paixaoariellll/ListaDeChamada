import {
  FaClipboardList,
  FaUserAlt,
  FaUsers,
} from "react-icons/fa";
import Link from "next/link";
import React from "react";

function DashboardLinks() {
  return (
    <div className="text-lg py-5 px-3">
      <ul className="flex flex-col mt-3 text-center align-middle items-center">
        <Link href="/profile">
          <li className="card py-0 hover:scale-125 !rounded-full text-[#b20000]" title="Perfil">
            <span>
              <FaUserAlt />
            </span>
          </li>
        </Link>
        <hr className="mt-1 mb-4 w-full flex flex-1" />
        <Link href="/teacher/classes">
          <li
            className="card px-2 py-2 cursor-pointer !rounded-full hover:scale-125 text-[#b20000]"
            title="Aulas"
          >
            <span>
              <FaClipboardList />
            </span>
          </li>
        </Link>
        <hr className="mt-1 mb-4 w-full flex flex-1" />
        <Link href="/teacher/users">
          <li
            className="card px-2 py-2 cursor-pointer !rounded-full hover:scale-125 text-[#b20000]"
            title="Usuários"
          >
            <span>
              <FaUsers />
            </span>
          </li>
        </Link>
        <hr className="mt-1 mb-4 w-full flex flex-1" />
      </ul>
    </div>
  );
}

export default DashboardLinks;
