"use client";
import { SignInButton, SignOutButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import Link from "next/link";
import { useUser } from "@clerk/clerk-react";

const Navbar = () => {
  const { isLoading, isAuthenticated } = useConvexAuth();
  const { user } = useUser();

  return (
    <nav className='bg-gray-800 py-4'>
      <div className='container flex justify-between items-center gap-4'>
        <Link href={"/"}>
          <h1 className='text-2xl font-bold text-white'>BlogsApp</h1>
        </Link>
        <ul className='flex gap-4 text-white items-center justify-center'>
          {user?.fullName && (
            <li>
              Hello. <strong>{user?.fullName}</strong>
            </li>
          )}
          <li>
            <Link href={"/"}>Home</Link>
          </li>

          {isAuthenticated ? (
            <>
              <li>
                <Link href={"/create"}>Create</Link>
              </li>
              <li>
                <SignOutButton>
                  <button className='bg-blue-500 text-white rounded py-2 px-4'>
                    Logout
                  </button>
                </SignOutButton>
              </li>
            </>
          ) : (
            <>
              <SignInButton mode='modal'>
                <button className='bg-blue-500 text-white rounded py-2 px-4'>
                  Register/Login
                </button>
              </SignInButton>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
