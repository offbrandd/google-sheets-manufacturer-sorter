  function onEdit(e) {
  //SortByManufacturer();
}
  
  function SortByManufacturer() {

    var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var data=activeSpreadsheet.getSheetByName("Source").getDataRange().getValues();

    var appleSheet = InsertNewSheet(data, activeSpreadsheet, "Apple");
    var dellSheet = InsertNewSheet(data, activeSpreadsheet, "Dell");
    var hpSheet = InsertNewSheet(data, activeSpreadsheet, "HP");
    var lenovoSheet = InsertNewSheet(data, activeSpreadsheet, "Lenovo");
    var microsoftSheet = InsertNewSheet(data, activeSpreadsheet, "Microsoft");
    var acerSheet = InsertNewSheet(data, activeSpreadsheet, "Acer");
    var otherSheet = InsertNewSheet(data, activeSpreadsheet, "Other");

    nameCol = GetNameCol(data[0]);
    for(var i=1;i<data.length;i++)
    {
      //Grabs asset name using column number we found earlier
      var Name=data[i][nameCol];
      var row = data[i];
      if (Name.indexOf("Apple") != -1){
        appleSheet.appendRow(row);
      }
      else if (Name.indexOf("Dell") != -1 || Name.indexOf("Alienware") != -1) {
        dellSheet.appendRow(row);
      }
      else if (Name.indexOf("HP") != -1) {
        hpSheet.appendRow(row);
      }
      else if (Name.indexOf("Lenovo") != -1) {
        lenovoSheet.appendRow(row);
      }
      else if (Name.indexOf("Microsoft") != -1) {
        microsoftSheet.appendRow(row);
      }
      else if (Name.indexOf("Acer") != -1) {
        acerSheet.appendRow(row);
      }
      else {
        otherSheet.appendRow(row);
      }
      i++;
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
        activeSpreadsheet.deleteSheet(newSheet);
    }
    newSheet = activeSpreadsheet.insertSheet();
    newSheet.setName(name);
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