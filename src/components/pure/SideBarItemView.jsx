import React from "react";
import { classNames } from "../../models/classes";
import { NavLink, useLocation } from "react-router-dom";

const SideBarItemView = ({
  item,
  isOpen,
}) => {

  const location = useLocation()
  let active = location.pathname === item.url

  return (
    <div className={classNames("text-left flex justify-start items-center", active ? 'bg-gradient-to-r from-secondary to-transparent' : null)}>
      <NavLink to={item.url} className={classNames('flex items-center hover:text-blue', active ? 'text-blue' : 'text-slate')}>
        <div className={classNames('h-12 w-1 rounded-full', active ? 'bg-blue' : 'bg-transparent')}></div>
        <div className={classNames("flex flex-row items-center overflow-hidden whitespace-nowrap w-12 transition-all ml-5", isOpen ? "expanded w-32" : null)}>
          <div >
            <item.icon size="32"></item.icon>
          </div>
          <span className="ml-4 font-semibold">{item.label}</span>
        </div>
      </NavLink>
    </div>
  );
};

export default SideBarItemView;
