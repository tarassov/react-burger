import React from "react";
import styles from './navigation.module.css'

export default function Navigation(props) {
    console.log(props)
    return(                
        <ul className={`ml-5 mt-4 mb-4 ${styles.navigation} ${props.className}`}>
            {props.children}
        </ul>
    )
}
