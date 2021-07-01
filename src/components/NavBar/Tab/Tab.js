import React from "react";
import classnames from "classnames";
import styles from "./Tab.module.scss";

const Tab = ({ menu, activeMenu, setActiveMenu, setActiveRef }) => {
  const isActiveTab = menu?.id === activeMenu?.id;
  return (
    <div
      ref={isActiveTab ? (node) => setActiveRef(node) : null}
      className={classnames(styles.Tab, isActiveTab && styles.Active)}
      onClick={() => setActiveMenu(menu)}
    >
      {menu.title}
    </div>
  );
}

const TabButton = ({handleClick, menu, activeMenu, setActiveRef}) => {
  const isActiveTab = menu?.id === activeMenu?.id
  return (
      <button
          type={'button'}
          ref={isActiveTab ? (node) => setActiveRef(node) : null}
          className={classnames(styles.Tab, isActiveTab && styles.Active)}
          onClick={handleClick}>+</button>
  )
}

export default Tab
export { TabButton }