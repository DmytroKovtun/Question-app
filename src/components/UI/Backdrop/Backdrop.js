import React from "react";
import  classses from "./Backdrop.module.css";

const Backdrop = props => {
    return <div
        className={classses.Backdrop}
        onClick={props.onClick}
    >

    </div>
}

export default Backdrop