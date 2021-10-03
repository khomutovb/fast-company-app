import React from 'react'
import PropTypes from 'prop-types'

// стосовно неймінгу
// valueProperty, contentProperty, derictionProperty - і так зрозуміло що це проперті) value, content досить
// onItemSelect, краще просто onSelect, бо тут він один цей селект

// через те що ти юзааєш Object.keys в тебе появляється items[item][valueProperty], це не ок
// спробуй переписать через Object.entries - буде набагто читабильніше та простіше написано без конструкцій типу items[][]
// якщо вийде після Object.entries в мапі деструктурізацію заюзай (може буть не зрозуміло тут = якщо що обговоримо це)
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
