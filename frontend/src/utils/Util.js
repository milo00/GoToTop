import React from "react";
import moment from "moment";


    function getDateFromString(time) {
        time = time.split(':');
        let now = new Date();
        return new Date(now.getFullYear(), now.getMonth(), now.getDate(), ... time);
    }

    function customTheme(theme) {
        return {
            ...theme,
            colors: {
                ...theme.colors,
                primary25: "#57b42f",
                primary: "#57b42f",
            },
        };
    }


export default getDateFromString;
