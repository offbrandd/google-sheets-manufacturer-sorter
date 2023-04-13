  function onEdit(e) {
  //SortByManufacturer();
}
  
  function sort() {

    var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = activeSpreadsheet.getSheetByName("Source");
    var data=sheet.getDataRange().getValues();

    var appleSheet = InsertNewSheet(data, activeSpreadsheet, "Apple");
    var appleList = [];
    var dellSheet = InsertNewSheet(data, activeSpreadsheet, "Dell");
    var dellList = [];
    var hpSheet = InsertNewSheet(data, activeSpreadsheet, "HP");
    var hpList = [];
    var lenovoSheet = InsertNewSheet(data, activeSpreadsheet, "Lenovo");
    var lenovoList = [];
    var microsoftSheet = InsertNewSheet(data, activeSpreadsheet, "Microsoft");
    var microsoftList = [];
    var acerSheet = InsertNewSheet(data, activeSpreadsheet, "Acer");
    var acerList = [];
    var otherSheet = InsertNewSheet(data, activeSpreadsheet, "Other");
    var otherList = [];

    nameCol = GetNameCol(data[0]);
    for(var i=1;i<data.length;i++)
    {
      //Grabs asset name using column number we found earlier
      var Name=data[i][nameCol];
      var row = data[i];
      if (Name.indexOf("Apple") != -1){
        //appleSheet.appendRow(row);
        appleList.push(row);
      }
      else if (Name.indexOf("Dell") != -1 || Name.indexOf("Alienware") != -1) {
        //dellSheet.appendRow(row);
        dellList.push(row);
      }
      else if (Name.indexOf("HP") != -1) {
        //hpSheet.appendRow(row);
        hpList.push(row);
      }
      else if (Name.indexOf("Lenovo") != -1) {
        //lenovoSheet.appendRow(row);
        lenovoList.push(row);
      }
      else if (Name.indexOf("Microsoft") != -1) {
        //microsoftSheet.appendRow(row);
        microsoftList.push(row);

      }
      else if (Name.indexOf("Acer") != -1) {
        //acerSheet.appendRow(row);
        acerList.push(row);
      }
      else {
        //otherSheet.appendRow(row);
        otherList.push(row);
      }
      i++;
    }
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

function GetNameCol(data) {
  for(var i = 0; i < data.length; i++) {
    if(data[i] == "name") {
      return i;
    }
  }
  return -1
}


