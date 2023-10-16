import { Disclosure, Menu, Transition } from "@headlessui/react";
import { PlusIcon, XIcon } from "@heroicons/react/outline";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Fragment } from "react";
import { logOutUser } from "../fetching";
import { LOGIN_ROUTE } from "./login";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar({ loggedIn, setLoggedIn }) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="-ml-2 mr-2 flex items-center md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <PlusIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="h-12 w-15"
                    src="https://cdn-icons-png.flaticon.com/128/763/763789.png"
                    alt="Study Buddy"
                  />
                </div>
                <div className="hidden md:ml-6 md:flex md:space-x-8">
                  <Link
                    to="/"
                    className={classNames(
                      location.pathname === "/"
                        ? "border-indigo-500 text-gray-900"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                      "inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium"
                    )}
                  >
                    Home
                  </Link>
                  <Link
                    to="/users"
                    className={classNames(
                      location.pathname === "/users"
                        ? "border-indigo-500 text-gray-900"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                      "inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium"
                    )}
                  >
                    Buddies
                  </Link>
                  <Link
                    to="/events"
                    className={classNames(
                      location.pathname === "/events"
                        ? "border-indigo-500 text-gray-900"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                      "inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium"
                    )}
                  >
                    Events
                  </Link>
                </div>
              </div>

              <div className="flex items-center">
                {loggedIn && (
                  <div className="hidden md:ml-4 md:flex md:flex-shrink-0 md:items-center">
                    <Link
                      to="/:id/messages"
                      className="ml-3 p-1 rounded-full bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <img
                        className="h-8 w-8 rounded"
                        src="https://cdn-icons-png.flaticon.com/512/8080/8080565.png"
                        // src="https://cdn-icons-png.flaticon.com/128/3159/3159054.png"
                        alt=""
                      />
                    </Link>

                    {/* Profile dropdown */}
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="ml-3 p-1 rounded-full bg-white hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500">
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-9 w-10 rounded-full"
                            src="https://icon-library.com/images/pngtree-user-icon-vector-illustration-in-flat-style-for-any-purpose-png-image_975471.jpg"
                            alt=""
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focuse:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/dashboard"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Dashboard
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/profile"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Edit Profile
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                className={classNames(
                                  "block px-4 py-2 text-sm text-gray-700",
                                  active ? "bg-gray-100" : "",
                                  "focus:outline-none"
                                )}
                                onClick={async () => {
                                  await logOutUser();
                                  setLoggedIn(false);
                                  navigate(LOGIN_ROUTE);
                                }}
                              >
                                Sign Out
                              </button>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}
