import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useLocation, Link } from "react-router-dom";

const navigation = [
  { name: "Inicio", href: "/" },
  { name: "Watchlist", href: "/watchlist" },
  { name: "Diario", href: "/diario" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const location = useLocation();

  return (
    <Disclosure
      as="nav"
      className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-white/10 shadow-lg"
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              {/* Mobile button */}
              <div className="flex items-center sm:hidden">
                <DisclosureButton className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-800 hover:text-white transition">
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </DisclosureButton>
              </div>

              {/* Logo + nav */}
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex shrink-0 items-center">
                  <img
                    alt="Logo"
                    src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                    className="h-8 w-auto"
                  />
                  <span className="ml-3 text-white font-semibold text-lg tracking-wide">
                    TradeJournal
                  </span>
                </div>

                {/* Desktop menu */}
                <div className="hidden sm:ml-10 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => {
                      const isActive = location.pathname === item.href;
                      return (
                        <Link
                          key={item.name}
                          to={item.href}
                          className={classNames(
                            isActive
                              ? "bg-indigo-600 text-white shadow-sm"
                              : "text-gray-300 hover:text-white hover:bg-white/10",
                            "rounded-md px-3 py-2 text-sm font-medium transition"
                          )}
                        >
                          {item.name}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right side */}
              <div className="flex items-center">
                <button
                  type="button"
                  className="relative rounded-full p-2 text-gray-400 hover:text-white hover:bg-white/10 transition"
                >
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                  <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-indigo-500 ring-2 ring-gray-900" />
                </button>

                {/* Dropdown perfil */}
                <Menu as="div" className="relative ml-3">
                  <MenuButton className="relative flex rounded-full focus:outline-none">
                    <img
                      alt="User"
                      src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?q=80&w=256&h=256&fit=facearea&facepad=2"
                      className="h-8 w-8 rounded-full ring-2 ring-indigo-500/30"
                    />
                  </MenuButton>

                  <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-xl bg-gray-800/90 backdrop-blur-md shadow-lg ring-1 ring-white/10 focus:outline-none">
                    {[
                      { name: "Perfil", href: "#" },
                      { name: "Configuración", href: "#" },
                      { name: "Cerrar sesión", href: "#" },
                    ].map((option) => (
                      <MenuItem key={option.name}>
                        {({ active }) => (
                          <a
                            href={option.href}
                            className={classNames(
                              active
                                ? "bg-indigo-500/20 text-white"
                                : "text-gray-300",
                              "block px-4 py-2 text-sm rounded-md transition"
                            )}
                          >
                            {option.name}
                          </a>
                        )}
                      </MenuItem>
                    ))}
                  </MenuItems>
                </Menu>
              </div>
            </div>
          </div>

          {/* Menú móvil */}
          <DisclosurePanel className="sm:hidden border-t border-white/10 bg-gray-900/80 backdrop-blur-md">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <DisclosureButton
                    key={item.name}
                    as={Link}
                    to={item.href}
                    className={classNames(
                      isActive
                        ? "bg-indigo-600 text-white"
                        : "text-gray-300 hover:bg-white/10 hover:text-white",
                      "block rounded-md px-3 py-2 text-base font-medium transition"
                    )}
                  >
                    {item.name}
                  </DisclosureButton>
                );
              })}
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}
