const deletableLocations = ["Quarantine", "Wholesale", "Clean & Pack", "Lost and Found", "CUST", "G2", "H2"];
const deletableAppleModels = ["A1286", "A1278", "A1369","A1398","A1418","A1419","A1425","A1465","A1466","A1502","A1706","A1707","A1708"]
const deletableDellModels = ["Latitude 5580","Latitude 5590","Latitude 7480","Latitude E5270","Latitude E7450","Precision 5510","Precision 5520","XPS 13 9350","XPS 13 9360","XPS 13 9365","XPS 15 9570"];

/*
* this seems redudant, but was necessary. Whether due to google sheets being annoying or my lack knowledge, I am not sure.
* var sheet was defined in sort.gs, however any call to it in this file came back as undefined.
* trying to redeclare it gave error saying it was already declared
* by my understanding, google sheets basically treats different files as if they are one at compile
* so the sheet var simutaneously existed and didn't exist. quantum variable.
*/

var sheet1 = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Source");


function trimAndPrune() {
  trimColumns();
  prune();
}
function prune() {
  var data=sheet1.getDataRange().getValues();
  var modelCol = GetColByName(data[0], "name");
  var locationCol = GetColByName(data[0], "location");
  var length = data.length;
  var indexesToDelete = [];

  for (var i=0;i < length; i++) {
    var model = data[i][modelCol];
    var location = data[i][locationCol];
    if (isLocationDeletable(location) || isModelDeletable(model)) {
      indexesToDelete.push(i + 1); //array starts at 0, sheets starts at 1. add 1 to account for difference
    } else {
        addToList(model, data[i]);

    }
  }
  deleteRows(indexesToDelete);
  writeListToSheet();
}

function deleteRows(indexes) {
  var amountDeleted = 0;
  for(var i = 0; i < indexes.length; i++) {
    sheet1.deleteRow(indexes[i] - amountDeleted);
    amountDeleted++;
  }

}

function isModelDeletable(model) {
  if (model.indexOf("Apple") != -1) { //checks whether unit is Apple or Dell, assigns appropriate list of blacklisted models
    list = deletableAppleModels;
  }
  else if (model.indexOf("Dell") != -1) {
    list = deletableDellModels;
  } 
  else { //black list does not contain any other manufacturers at time of writing; return false
    return false;
  }

  for(var i = 0; i < list.length; i++) { //loop through assigned list, check if our 'model' contains any of predefined strings
      if (model.indexOf(list[i]) != -1) {
        return true
      }
    }
    return false;

}

function isLocationDeletable(location) {
  if (location.indexOf("eCom") != -1 && location.indexOf("eCom-WS15-To-Be-Listed") == -1) {
    return true;
  }
  for(var i = 0; i < deletableLocations.length; i++) {
    if (location.indexOf(deletableLocations[i]) != -1) {
      return true
    }
  }
  return false;
}
function GetColByName(data, name) {
  for(var i = 0; i < data.length; i++) {
    if(data[i] == name) {
      return i;
    }
  }
  return -1
}

function trimColumns() {
  var data=sheet1.getDataRange().getValues();
  var length = data[0].length;
  var deletedColumns = 0;
  for(var i=0; i< length;i++) {
    if(isColumnDeletable(data[0][i])) {
      sheet1.deleteColumn(i+1 - deletedColumns);
      deletedColumns++;
      length = data[0].length;
    }
  }
}

function isColumnDeletable(string) {
  switch(string) {
    case "warehouse":
    case "wh_check":
    case "r2_classification":
    case "cosmetic_grade":
    case "tested_at_gmt":
    case "warehouse_id":
    case "shift":
      return true;
    default:
      return false;
  }
}
