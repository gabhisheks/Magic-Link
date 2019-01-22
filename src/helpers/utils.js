// All Util functions here.

const _ = require('lodash');
const mongoose = require('mongoose');
const geoLib = require('geo-lib');
const config = require('./../config/config');

/**
 * Pass Object Or Array Or String Or Number and find if it is empty or not, Null Or Undefined also gives false
 * @param  {Any} data data to be checked against
 * @param  {function} cb callback
 * @return {Any} data which is given if it exists or False
 */
exports.checkIfDataExists = (data) => {
  let flagDataExists;
  if (data === 0 ? '0' : data) {
    switch (data.constructor) {
      case Object:
        flagDataExists = Object.keys(data).length ? true : false;
        break;
      case Array:
        flagDataExists = data.length ? true : false;
        break;
      default:
        flagDataExists = true;
        break;
    }
    if (flagDataExists) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * randomize array list
 * @param  {Array} inputList can also be Array of Objects
 * @param  {String} uniqueCheck if Array of objects is there this is check unique value in array of object
 * @return {Array} outputList
 */
exports.randomizeList = (inputList, uniqueCheck = '_id') => {
  const outputList = [];
  let runLoop = true;

  while(runLoop) {
    let randomNumber = getRandomNumber(0, inputList.length - 1);
    if (uniqueCheck) {
      if (!outputList.find(element => element._id === inputList[randomNumber]._id)) {
        outputList.push(inputList[randomNumber]);
      }
    }
    else {
      if (!outputList.find(element => element === inputList[randomNumber])) {
        outputList.push(inputList[randomNumber]);
      }
    }
    if (outputList.length === inputList.length) {
      runLoop = false;
    }
  }
  return outputList;
};

exports.checkRequiredFieldsObject = ({ requiredArrayFields, objectToCheckFrom }) => {

  const objectAllProps = Object.keys(objectToCheckFrom);

  // Check if the reqquired fields are sent in reqObject
  const requiredPropsPresent = objectAllProps.reduce(
    (
      flagDataExists,
      objectProp) => {
      let propRequired = requiredArrayFields.find(requiredProp => requiredProp === objectProp && exports.checkIfDataExists(objectToCheckFrom[objectProp]));
      return flagDataExists && propRequired;
    },
    true
  );

  return requiredPropsPresent;

};

exports.mapObjects = ({
  inputData,
  mappingRule,
  modelName
}) => {

  function mapObject(inputObject, mapRule) {
    for (let prop in mapRule) {
      if (exports.checkIfDataExists(inputObject[prop])) {
        inputObject[mapRule[prop]] = inputObject[prop];
      }
      delete inputObject[prop];
    }
    mongoose.model(modelName).collection.save(inputObject);
  }

  let outPutData;
  if (inputData.constructor === Array) {
    outPutData = inputData.forEach(
      element => {
        mapObject(element, mappingRule);
      }
    );
  } else if (inputData.constructor === Object) {
    mapObject(inputData, mappingRule);
  }
};

/**
 * merges two arrays and removes duplicate also
 * @param  {Array}  array1
 * @param  {Array}  array2
 * @return {Array}
 */
exports.mergeArrays = (array1 = [], array2 = []) => {

  let mergedArray = array1.concat(array2);

  for (var i = 0; i < mergedArray.length; ++i) {
    for (var j = i + 1; j < mergedArray.length; ++j) {
      if (mergedArray[i] === mergedArray[j]) {

        mergedArray.splice(j--, 1);
      }
    }
  }

  return mergedArray;

};

/**
 * deep search a prop in the object
 * @param  {Object} obj the parant object
 * @param  {String} key the key to search
 * @return {array}  the result in the array, return an empty array if the key is not found the the parent object
 */
exports.deepSearchObjectKey = (obj, key) => {
  if (_.has(obj, key) && exports.checkIfDataExists(obj[key])) { // or just (key in obj)
    return [obj];
  }
  var ress = [];
  _.forEach(obj, function(v) {
    if (_.has(obj, key)) {
      // or just (key in obj)
      return [obj];
    }
    if (typeof v === 'object' && (v = exports.deepSearchObjectKey(v, key)).length) {
      ress.push.apply(ress, v);
    }
  });
  return ress;
};

/**
 *
 * @param {String} modelName
 * @param {Object} updateQuery
 * @param {Object} updateDoc
 */
exports.updateAllModels = (modelName, updateQuery, updateDoc) => {
  return mongoose
    .model(modelName)
    .updateMany(updateQuery, updateDoc)
    .exec();
};

exports.consoleLogger = ({
  message
}) => {
  console.log(`Info Message ----> Date ---> ${new Date()} ---->`);
  console.log(message);
};

//sort object according to property name
exports.sortObject = (obj) => {
  var keys = Object.keys(obj);
  keys.sort(function (a, b) {
    return a - b;
  });
  let sortedObj = {};
  keys.forEach(function (item) {
    sortedObj[item] = obj[item];
  });
  return sortedObj;
};

//pointOneCord and pointTwoCord must be an array with latitude as first element and longitude as second.
exports.getDistanceBetweenTwoCoordinates = (pointOneCord, pointTwoCord) => {
  let result = geoLib.distance([
    pointOneCord, pointTwoCord
  ]);
  return result.distance * config.milesPerKilometer; // distance is returned in miles
};
