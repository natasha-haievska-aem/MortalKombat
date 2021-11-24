const normalizeTime = (num) => num >= 10 ? num : `0${num}`;

const dateFormatter = () => {
    const date = new Date();
    return `${normalizeTime(date.getHours())}:${normalizeTime(date.getMinutes())}`
}

export default dateFormatter;