import { useLocation } from "react-router-dom";
import RoutePaths from "./RoutePaths";


export const toggleLinkClass = (
  path: string,
  activeClass: string = active,
  inactiveClass: string = inactive
) => {
  const currentLink = useLocation().pathname;

  return currentLink === path ? activeClass : inactiveClass;
};

export const getItem = (keymane: string) => {
  return localStorage.getItem(keymane);
};

export const setItem = (keyname: string, value: string | Object) => {
  if (typeof value !== "string" && !(value instanceof String)) {
    value = JSON.stringify(value);
  }
  return localStorage.setItem(keyname, value as string);
};

export const removeItem = (keyname: string) => {
  return localStorage.removeItem(keyname);
};


// export const link = (url : string) : string => BASE_STORAGE_URL + url;

export const checkLogin = () => {
  const isLogged = localStorage.getItem(RoutePaths.token);
  return !!isLogged;
};



export const BASE_URL = "http://localhost:3000"; // BASE URL FOR API FETCHING

const active = "d-block p-3 fd-nav-active"; // WHERE MENU IS ACTIVE CLASS

const inactive = "d-block p-3 text-black"; // WHERE MENU IS NOT ACTIVE CLASS