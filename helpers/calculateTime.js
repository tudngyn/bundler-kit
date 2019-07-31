import React from 'react';
import moment from 'moment';

export const getCurrentDate = (format = '') =>
  moment()
    .utc()
    .format(format);
export const getCurrentDay = () => moment().date();
export const getCurrentMonth = () =>
  moment()
    .month(moment().month())
    .format('MM');
export const getCurrentYear = () => moment().year();
export const getMonthFromDate = (date, format = '') =>
  moment(date, format).format('MM');
export const getYearFromDate = (date, format = '') =>
  moment(date, format).year();
export const compareBetween = (currenDate, startDate, endDate) =>
  moment(currenDate).isBetween(startDate, endDate);
export const isBefore = (currentDate, targetDate, options = '') =>
  moment(currentDate).isBefore(targetDate, options);
export const isSameOrBefore = (currentDate, targetDate, options = '') =>
  moment(currentDate).isSameOrBefore(targetDate, options);
export const isAfter = (currentDate, targetDate, options = '') =>
  moment(currentDate).isAfter(targetDate, options);
export const isSameOrAfter = (currentDate, targetDate, options = '') =>
  moment(currentDate).isSameOrAfter(targetDate, options);
export const isEqual = (currentDate, targetDate, dateFormat = 'DD-MM-YYYY') =>
  moment(currentDate, dateFormat).isSame(moment(targetDate, dateFormat));
export const formatDate = (date, format = '', exportFormat = '') =>
  moment(date, format).format(exportFormat);
export const getDaysInMonth = (date = '', format = '') =>
  moment(date, format).daysInMonth();
export const getCurrentDaysInMonth = () => moment().daysInMonth();
export const subtract = (date, number, option = '', format = '') =>
  moment(date)
    .subtract(number, option)
    .format(format);
export const add = (date, number, option = '', format = '') =>
  moment(date)
    .add(number, option)
    .format(format);

export const formatMidnightTo24Hour = hourString => {
  if (hourString === '00:00') {
    return '24:00';
  }

  return hourString;
};

export const getZeroBasedFromMonth = (index, format = '') =>
  moment()
    .month(index)
    .format(format);

export const monthList = () => {
  var months = [];
  for (let i = 0; i < 12; i++) {
    months.push(getZeroBasedFromMonth(i, 'MM'));
  }

  return months.map((month, index) => (
    <option key={index} value={month}>
      {month}
    </option>
  ));
};

export const yearList = () => {
  var years = [];
  const thisYear = getCurrentYear();
  var start = parseInt(thisYear, 10) - 1;
  var end = parseInt(thisYear, 10) + 1;
  for (let i = start; i <= end; i++) {
    years.push(i);
  }
  return years.map((year, index) => (
    <option key={index} value={year}>
      {year}
    </option>
  ));
};
