"use strict";

//insert into flower (flowerId, name, site, farmer, unitPrice)
const toInsertArray = (flower) => [
  +flower.flowerId,
  flower.name,
  flower.site,
  flower.farmer,
  +flower.unitPrice,
];

//update flower set name=?, site=?, farmer=?, unitPrice=?",
// "where id=?"

const toUpdateArray = (flower) => [
  flower.name,
  flower.site,
  flower.farmer,
  +flower.unitPrice,
  +flower.flowerId,
];

module.exports = { toInsertArray, toUpdateArray };
