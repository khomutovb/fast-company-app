export function getBageClasses(number) {
    let classes = 'badge m-1  bg-'
    classes += number === 0 ? 'danger' : 'primary'
    return classes
}
export function getBageText(number) {
    const char = findLastChar(number) === 1 || findLastChar(number) >= 5 ? '' : 'а'
    return number === 0 ? `Никто с тобой не тусанёт :(` : `${number} человек${char} тусанёт с тобой сегодня`
}
function findLastChar(number) {
    if (number > 20) {
        const numberToString = number.toString()
        const lastChar = numberToString[numberToString.length - 1]
        return Number(lastChar)
    }
    return number
}