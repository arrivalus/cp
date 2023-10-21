import moment from "moment";

export const converterDate = (date, needTime = false) => {
    const initial_date = moment(date)
    const convertWithoutTime = `${initial_date.date() >= 10 ? initial_date.date() : `0${initial_date.date()}`}.${initial_date.month() + 1 >= 10 ? initial_date.month() + 1 : `0${initial_date.month() + 1}`}.${initial_date.year()}`
    const covertWithTime = `${convertWithoutTime}, ${initial_date.hour() >= 10 ? initial_date.hour() : `0${initial_date.hour()}`}:${initial_date.minute() >= 10 ? initial_date.minute() : `0${initial_date.minute()}`}`
    return needTime ? covertWithTime : convertWithoutTime
}
