//Arrays of predefined locations and models that cannot be pulled.
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

function trimColumns() { //iterates through header, calls isColumnDeletable() to check if column is necessary. If it isn't, delete
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

function isColumnDeletable(string) { //if argument matches any of these predefined unnecessary columns, return true
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
function prune() {
  var data=sheet1.getDataRange().getValues();
  var modelCol = GetColByName(data[0], "name");
  var locationCol = GetColByName(data[0], "location");
  var length = data.length;
  var goodRows = [];

  for (var i=1;i < length; i++) {
    var model = data[i][modelCol];
    var location = data[i][locationCol];
    if (isLocationDeletable(location) || isModelDeletable(model)) {
      //do nothing (i know logical operators exist to not have an empty if statement, but I also don't care!)
    } else { //adds row you want to keep to array goodRows, also calls addToList() to add it to the appropriate MFG array
      goodRows.push(data[i]);
      addToList(model, data[i]);
    }
  }
  replaceRows(goodRows);
  writeModelListToSheets();
}

function replaceRows(list) { //clears source sheet, writes array of good rows to it in batch
  
  sheet1.getRange(2,1,sheet1.getLastRow(), sheet1.getLastColumn()).clear();
  sheet1.getRange(2,1,list.length,list[0].length).setValues(list);
}

function isModelDeletable(model) { //checks if model matches any units from predefined list at top. if it does, return true
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

function isLocationDeletable(location) { //checks if location matches any units from predefined list at top. if it does, return true
  if (location.indexOf("eCom") != -1 && location.indexOf("eCom-WS15-To-Be-Listed") == -1) { //there are many eCom locations. need to delete all but one of these. easier to do this then predefine every possible ecom location
    return true;
  }
  for(var i = 0; i < deletableLocations.length; i++) { //checks against predefined list
    if (location.indexOf(deletableLocations[i]) != -1) {
      return true
    }
  }
  return false;
}
function GetColByName(data, name) { //give a data array and a name, searches for the corresponding column to that name and returns its index
  for(var i = 0; i < data.length; i++) {
    if(data[i] == name) {
      return i;
    }
  }
  return -1
}
