import React from "react";
import PropTypes from "prop-types";

// якщо функція відразу щось повертає то можна упростить і викинуть return:
const Qualitie = ({ color, name, _id }) => (
    <span key={_id} className={`badge m-1  bg-${color}`}>
        {name}
    </span>
);
// в navBar, bookmark і тд файлах теж саме
Qualitie.propTypes = {
    color: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
};
export default Qualitie;
