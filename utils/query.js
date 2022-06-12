const Op = require('sequelize').Op;
const BadRequestError = require('../errors/badRequest.error');

const buildWhere = (filters) =>{
  let where = {};
  
  // Filter from date
  if(filters.startDate && !filters.endDate){
    where = {
      createdAt :{
        [Op.gte]: new Date(filters.startDate).toISOString()
      }
    }
    delete filters.startDate;
  }

  // Filter until date
  if(filters.endDate && !filters.startDate){
    const nextDate = new Date(filters.endDate);
    nextDate.setDate(nextDate.getDate() + 1);
    where = {
      createdAt :{
        [Op.lte]: nextDate.toISOString()
      }
    }
    delete filters.endDate;
  }

  // Filter between dates
  if(filters.startDate && filters.endDate){

    // Check if range between dates is correct
    if(!isInRange(filters.startDate, filters.endDate)){
      throw new BadRequestError('startDate must be before endDate');
    }

    const nextDate = new Date(filters.endDate);
    nextDate.setDate(nextDate.getDate() + 1);
    where = {
      createdAt :{
        [Op.between]: [new Date(filters.startDate).toISOString(), nextDate.toISOString()]
      }
    }
    delete filters.startDate;
    delete filters.endDate;
  }

  // Other filters
  for (const [key, value] of Object.entries(filters)) {
    // Value is boolean -> true
    if( value.toLowerCase() === 'true' ){
      where[[key]] = true;
    }
    // Value is boolean -> false
    else if( value.toLowerCase() === 'false' ){
      where[[key]] = false;
    }
    // Value is number
    else if( isNumber(value) ){
      where[[key]] = +value;
    }
    // Value is string
    else{
      where[[key]] = {
        [Op.like] : '%' + value + '%'
      };
    }
  }

  return where;
}

const isDate = function(date) {
  return (new Date(date) !== "Invalid Date") && !isNaN(new Date(date));
}

const isNumber = (str) => {
  const pattern = /^\d+\.?\d*$/;
  return pattern.test(str);  // returns a boolean
}

const isInRange = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (!isDate(start) || !isDate(end)) {
    return false;
  }

  if (start > end) {
    return false;
  }
  return true;
};


module.exports = {
  buildWhere,
  isInRange
}