import React from "react";
import styles from './navigation.module.css'

export default function Navigation(props) {
    return(        
        <ul className={`ml-5 mt-4 mb-4 ${styles.navigation}`}>
            {props.children}
        </ul>
    )
}
