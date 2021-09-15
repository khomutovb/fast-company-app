import React from 'react'
import PropTypes from 'prop-types'

const GroupList = ({ items, valueProperty, contentProperty, derictionProperty, onItemSelect, selectedItem }) => {
    return (
        <ul className={"list-group " + derictionProperty}>
            {Object.keys(items).map((item) => (
                <li
                    style={{ borderWidth: '1px', borderRadius: '4px' }}
                    className={"list-group-item m-1 " + (items[item] === selectedItem ? 'active' : '')}
                    role="button"
                    key={items[item][valueProperty]}
                    onClick={() => onItemSelect(items[item])}
                >
                    {items[item][contentProperty]}
                </li>
            ))}
        </ul>
    )
}
GroupList.defaultProps = {
    valueProperty: '_id',
    contentProperty: 'name'
}
GroupList.propTypes = {
    items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    valueProperty: PropTypes.string.isRequired,
    contentProperty: PropTypes.string.isRequired,
    derictionProperty: PropTypes.string,
    onItemSelect: PropTypes.func.isRequired,
    selectedItem: PropTypes.object,
}
export default GroupList