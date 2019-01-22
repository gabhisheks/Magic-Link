const utils = require('./utils');

/**
 * get age from date
 * @param  {Date} birthday Has to be a date object
 * @return {Number}        returns Age
 */
exports.calculateAge = function (birthday) { // birthday is a date
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
};

exports.getDateDifference = function ({ firstDate, secondDate }, cb) {

    // Convert both dates to milliseconds
    let date1Ms = firstDate.getTime();
    let date2Ms = secondDate.getTime();

    // Calculate the difference in milliseconds
    let differenceMs = date2Ms - date1Ms;

    return cb(differenceMs);
};
/*
 * converts Date to YYYY/MM/DD format
 * @param  {Date}   date
 * @param  {String} seperator
 * @return {String}
 */
exports.toStandardDate = (date = new Date(), seperator = "/") => {
    let day = date.getDate();
    let month = date.getMonth() + 1;

  if(month.toString().length < 2) {
    month = '0' + month;
  }
  if(day.toString().length < 2) {
    day = '0' + day;
  }

    let year = date.getFullYear();

    return `${year}${seperator}${month}${seperator}${day}`;
};

/**
 * Converts dateString format to Date
 * @param  {Date}   dateString
 * @return {Date}
 */
exports.toDateObject = (dateString, hours, minutes, seconds) => {
	if (utils.checkIfDataExists(dateString)) {
		const currentDate = new Date();
		return new Date(new Date(dateString).setHours(hours || currentDate.getHours(), minutes || currentDate.getMinutes(), seconds || currentDate.getSeconds()));
	}
	return new Date();
};

exports.isValidDate = (date) => {
	if (Object.prototype.toString.call(date) === "[object Date]") {
		// it is a date
		if (isNaN(date.getTime())) { // d.valueOf() could also work
			// date is not valid
			return false;
		} else {
			// date is valid
			return true;
		}
	} else {
		// not a date
		return false;
	}
};

//returns date as a string in required form
exports.getTheDate = (date) => {
	let dateForm = new Date(date);
	let onlyDate = dateForm.getUTCDate();
	let month = dateForm.getUTCMonth() + 1;
	if (month.toString().length < 2) {
		month = '0' + month;
	}
	if (onlyDate.toString().length < 2) {
		onlyDate = '0' + onlyDate;
	}
	let year = dateForm.getUTCFullYear();
	return `${month}-${onlyDate}-${year}`;
};

//return time as a string in required form
exports.getTheTime = (date) => {
	date = new Date(date);
	let minutes = date.getUTCMinutes();
	let hours = date.getUTCHours();
	if (minutes.toString().length < 2) {
		minutes = '0' + minutes;
	}
	if (hours.toString().length < 2) {
		hours = '0' + hours;
	}
	return `${hours}:${minutes}`;
};

//return time in 12 hour format
exports.formatAMPM = (date, notUTC) => {
	date = new Date(date);
	let hours;
	let minutes;
	let ampm;
	if (notUTC) {
		hours = date.getHours();
		minutes = date.getMinutes();
		ampm = hours < 12 ? 'AM' : 'PM';
	} else {
		hours = date.getUTCHours();
		minutes = date.getUTCMinutes();
		ampm = hours <= 12 ? 'AM' : 'PM';
	}
	hours = hours % 12;
	hours = hours ? hours : 12; // the hour '0' should be '12'
	minutes = minutes < 10 ? '0' + minutes : minutes;
	let strTime = hours + ':' + minutes + ' ' + ampm;
	return strTime;
};

exports.getDateIfFuture = (dateString) => {
	const currentDate = new Date();
	const date = exports.toDateObject(dateString);
	return date >= currentDate ? date : currentDate;
};

exports.addZeroToMinutes = (timeStr) => {
	if (timeStr.length === 1) {
		return timeStr + '0';
	}
	return timeStr;
};
