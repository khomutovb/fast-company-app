import React from "react";
import PropTypes from "prop-types";

const GroupList = ({
    items,
    derictionProperty,
    onItemSelect,
    selectedItem,
}) => {
    return (
        <ul className={"list-group " + derictionProperty}>
            {Object.entries(items).map(([, item]) => (
                <li
                    style={{ borderWidth: "1px", borderRadius: "4px" }}
                    className={
                        "list-group-item m-1 " +
                        (item === selectedItem ? "active" : "")
                    }
                    role="button"
                    key={item._id}
                    onClick={() => onItemSelect(item)}
                >
                    {item.name}
                </li>
            ))}
        </ul>
    );
};
GroupList.propTypes = {
    items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    derictionProperty: PropTypes.string,
    onItemSelect: PropTypes.func.isRequired,
    selectedItem: PropTypes.object,
};

export default GroupList;
