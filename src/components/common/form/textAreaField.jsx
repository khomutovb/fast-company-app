import React from "react";
import PropTypes from "prop-types";

const TextField = ({ label, name, value, onChange, error }) => {
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };
    const getInputClasses = () => {
        return "form-control" + (error ? " is-invalid" : "");
    };
    return (
        <div className="mb-4">
            <label htmlFor={name}>{label}</label>
            <div className="input-group has-valitation">
                <textarea
                    id={name}
                    rows="3"
                    name={name}
                    value={value}
                    onChange={handleChange}
                    className={getInputClasses()}
                ></textarea>
                {error && <div className="invalid-feedback">{error}</div>}
            </div>
        </div>
    );
};
TextField.defaulrProps = {
    type: "text",
};
TextField.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string,
};
export default TextField;
