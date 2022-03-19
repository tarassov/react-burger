import React from "react";
import PropTypes from "prop-types";
import styles from './navigation-link.module.css'

export default function NavigationLink(props) {
    return(        
        <div className={"mt-4 mb-4 pl-5"}>
           <div className={styles.link}>
            {props.logo}<p className={"text text_type_main-default ml-2" }>{props.text}</p>
           </div>
        </div>
    )
}

NavigationLink.propTypes = {
    logo: PropTypes.object,
    text: PropTypes.string
}

