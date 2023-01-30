import React from "react";
import classes from "./ContactModal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";

const ContactModal = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  return (
    <div className={classesList}>
      <h2 className={classes.title}>Neil Barry</h2>
      <div className={classes.icons}>
        <a href="https://www.neilbarry.com/" target="_blank" rel="noreferrer">
          <div className={classes.iconGroup}>
            <FontAwesomeIcon icon={faGlobe} />
            <h5>neilbarry.com</h5>
          </div>
        </a>
        <a
          href="https://github.com/neilmbarry"
          target="_blank"
          rel="noreferrer"
        >
          <div className={classes.iconGroup}>
            <FontAwesomeIcon icon={faGithub} />
            <h5>github.com/neilmbarry</h5>
          </div>
        </a>
        <a
          href="https://www.linkedin.com/in/neilmbarry/"
          target="_blank"
          rel="noreferrer"
        >
          <div className={classes.iconGroup}>
            <FontAwesomeIcon icon={faLinkedin} />
            <h5>linkedin.com/in/neilmbarry</h5>
          </div>
        </a>
      </div>
    </div>
  );
};

export default ContactModal;
