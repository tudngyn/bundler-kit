import format from "date-fns/format";

const formatDate = (date, newFormat, opts) => {
  let newDate = null;
  if (date) {
    newDate = format(date, newFormat, opts);
  }
  return newDate;
};

const secondToTime = (second, getDay = false) => {
  let timeDiffTemp = second;
  let daysString = "";
  let days = Math.floor(second / (24 * 3600 * 1000));
  if (!getDay) {
    days = 0;
  }
  timeDiffTemp = second - days * 24 * 3600 * 1000;
  let hours = Math.floor(timeDiffTemp / (3600 * 1000));
  timeDiffTemp = timeDiffTemp - hours * 3600 * 1000;
  let minutes = Math.floor(timeDiffTemp / (60 * 1000));
  timeDiffTemp = timeDiffTemp - minutes * 60 * 1000;
  let seconds = Math.floor(timeDiffTemp / 1000);
  if (days > 0) {
    daysString = days >= 10 ? days.toString() : "0" + days;
  }
  hours = hours >= 10 ? hours.toString() : "0" + hours;
  minutes = minutes >= 10 ? minutes.toString() : "0" + minutes;
  seconds = seconds >= 10 ? seconds.toString() : "0" + seconds;

  return {
    days: daysString,
    hours,
    minutes,
    seconds
  };
};

const getStartDate = (dateString = new Date()) => {
  const date = new Date(dateString);
  const result = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    0,
    0,
    0
  );
  return result;
};

const getEndDate = dateString => {
  const date = new Date(dateString);
  const result = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    23,
    59,
    59
  );
  return result;
};

export { formatDate, secondToTime, getStartDate, getEndDate };
