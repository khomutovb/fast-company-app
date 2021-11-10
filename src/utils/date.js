export function calculateDate(time) {
    let finalDate = "";
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const dateComment = new Date(Number(time));
    const commentYear = dateComment.getFullYear();
    const difference = currentDate - Number(time);
    const sec = difference / 1000;
    const min = sec / 60;
    const hours = min / 60;
    const days = hours / 24;

    if (hours > 1) {
        let options = { hour: "numeric", minute: "numeric" };
        if (days >= 1) {
            options = { day: "numeric", month: "long" };
        }
        if (currentYear > commentYear) {
            options = { day: "numeric", month: "long", year: "numeric" };
        }
        return dateComment.toLocaleString("ru", options);
    }
    if (min >= 30) {
        finalDate = "оставлен 30 минут назад";
    } else if (min >= 10) {
        finalDate = "оставлен 10 минут назад";
    } else if (min >= 5) {
        finalDate = "оставлен 5 минут назад";
    } else {
        finalDate = "оставлен 1 минуту назад";
    }
    return finalDate;
}