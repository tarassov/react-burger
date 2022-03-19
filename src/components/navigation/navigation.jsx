import React from "react";
import styles from './navigation.module.css'

export default function Navigation(props) {
    return(        
        <nav className={styles.navigation + " ml-5 mt-4 mb-4"}>
           {props.children}
        </nav>
    )
}
