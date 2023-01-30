import React from "react";
import classes from "./RulesSection.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

const RulesSection = ({
  className,
  togglePage,
  currentPage,
  title,
  children,
  sectionNumber,
}) => {
  const classesList = `${classes.main} ${className}`;
  const open = currentPage === sectionNumber;
  return (
    <div className={classes.section}>
      <div
        className={classes.sectionTitle}
        onClick={() => togglePage(sectionNumber)}
      >
        <FontAwesomeIcon
          icon={open ? faChevronDown : faChevronRight}
          className={classes.icon + " " + classes["icon" + sectionNumber]}
        />
        <h3 className={`${open && classes.gold}`}>{title}</h3>
      </div>
      <div className={classes.sectionContent + " " + (open && classes.open)}>
        {children}
      </div>
    </div>
  );
};

export default RulesSection;
