  //pulls main sheet into an array, in this case "Source". Name of sheet MUST match in Google Sheets
  var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = activeSpreadsheet.getSheetByName("Source");
  var data=sheet.getDataRange().getValues();
  
  //define arrays for each MFG sheet
  var appleList = [];
  var dellList = [];
  var hpList = [];
  var lenovoList = [];
  var microsoftList = [];
  var acerList = [];
  var otherList = [];

  //define MFG sheets if not already made. If already exists, clears them.
  var appleSheet;
  var dellSheet;
  var hpSheet;
  var lenovoSheet;
  var microsoftSheet;
  var acerSheet;
  var otherSheet;

  function createMFGSheets() {
    //define MFG sheets if not already made. If already exists, clears them.
    appleSheet = InsertNewSheet(data, activeSpreadsheet, "Apple");
    dellSheet = InsertNewSheet(data, activeSpreadsheet, "Dell");
    hpSheet = InsertNewSheet(data, activeSpreadsheet, "HP");
    lenovoSheet = InsertNewSheet(data, activeSpreadsheet, "Lenovo");
    microsoftSheet = InsertNewSheet(data, activeSpreadsheet, "Microsoft");
    acerSheet = InsertNewSheet(data, activeSpreadsheet, "Acer");
    otherSheet = InsertNewSheet(data, activeSpreadsheet, "Other");
  }


  //given a model name/number and a row of data, assign row of data to corresponding MFG array
  function addToList(name, row) {
    if (name.indexOf("Apple") != -1) {
            appleList.push(row);
    }
    else if (name.indexOf("Dell") != -1 || name.indexOf("Alienware") != -1) {
      dellList.push(row);
    }
    else if (name.indexOf("HP") != -1) {
      hpList.push(row);
    }
    else if (name.indexOf("Lenovo") != -1) {
      lenovoList.push(row);
    }
    else if (name.indexOf("Microsoft") != -1) {
      microsoftList.push(row);

    }
    else if (name.indexOf("Acer") != -1) {
      acerList.push(row);
    }
    else {
      otherList.push(row);
    }
}
  //Once sorting into arrays is done, writes array in batch to corresponding Sheet
  //Note it specifically ignore this first row. This is the header row and is handled on Sheet creation.
  function writeModelListToSheets() {
    if(appleList.length > 0) {
      var range = appleSheet.getRange(2,1,appleList.length, appleList[0].length);
      range.setValues(appleList);
    }
    if(dellList.length > 0) {
      range = dellSheet.getRange(2,1, dellList.length, dellList[0].length);
      range.setValues(dellList);
    }
    if(hpList.length > 0) {
      range = hpSheet.getRange(2,1, hpList.length, hpList[0].length);
      range.setValues(hpList);
    }
    if(lenovoList.length > 0) {
      range = lenovoSheet.getRange(2,1, lenovoList.length, lenovoList[0].length);
      range.setValues(lenovoList);
    }
    if(microsoftList.length > 0) {
      range = microsoftSheet.getRange(2,1, microsoftList.length, microsoftList[0].length);
      range.setValues(microsoftList);
    }
    if(acerList.length > 0) {
      range = acerSheet.getRange(2,1, acerList.length, acerList[0].length);
      range.setValues(acerList);
    }
    if(otherList.length > 0) {
      range = otherSheet.getRange(2,1, otherList.length, otherList[0].length);
      range.setValues(otherList);
    }

    appleSheet.protect();
    acerSheet.protect();
    dellSheet.protect();
    hpSheet.protect();
    lenovoSheet.protect();
    microsoftSheet.protect();
    otherSheet.protect();
}

//given an array from source sheet, the entire Spreadsheet, and a name: checks if given sheet already exists
//if exists, clears and sets up to receive data
//if does not exist, creates it
function InsertNewSheet(data, activeSpreadsheet, name) {
  var newSheet = activeSpreadsheet.getSheetByName(name);
    if (newSheet != null) {
        var range = newSheet.getRange("A:AC");
        range.clearContent();
    } else {
      newSheet = activeSpreadsheet.insertSheet();
      newSheet.setName(name);
    }
    newSheet.appendRow(data[0]);
    return newSheet;
}


