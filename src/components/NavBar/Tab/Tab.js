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

export default Tab;
// const TabList = ({ menusData, children }) => {
//     const [ activeTab, setActiveTab ] = useState(menusData[ 0 ].title)
//
//     const onTabClick = (tab) => {
//         setActiveTab(tab)
//     }
//
//     console.info(menusData)
//     return (
//         <div className={styles.Tabs}>
//             <ol className={styles.TabList}>
//                 {menusData && menusData.map((menu) => <Tab data={menu} activeTab={activeTab} key={menu.title} label={menu.title} onClick={onTabClick} />)}
//             </ol>
//             <div className={styles.TabContent}>
//                 {children.map((child) => {
//                     if (child.props.label !== activeTab) {
//                         return undefined
//                     }
//                     return child.props.children
//                 })}
//             </div>
//         </div>
//     )
// }
//
// export { TabList }
