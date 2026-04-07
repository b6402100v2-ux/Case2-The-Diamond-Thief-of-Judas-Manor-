function doPost(e) {
  try {
    var payload = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();

    // 1. ระบบเช็คสถานะเพื่อนในทีม (Live Sync)
    if (payload.action === "getSync") {
      var syncSheet = ss.getSheetByName("LiveSync");
      if (!syncSheet) return ContentService.createTextOutput(JSON.stringify({ status: "success", data: ["Pending","Pending","Pending","Pending"] })).setMimeType(ContentService.MimeType.JSON);

      var data = syncSheet.getDataRange().getValues();
      var statuses = ["Pending", "Pending", "Pending", "Pending"];
      for (var i = 1; i < data.length; i++) {
        if (data[i][0] === payload.teamId) {
          statuses = [data[i][1], data[i][2], data[i][3], data[i][4]];
          break;
        }
      }
      return ContentService.createTextOutput(JSON.stringify({ status: "success", data: statuses })).setMimeType(ContentService.MimeType.JSON);
    }

    // 2. ระบบบันทึกเมื่อมีคนสอบเสร็จ (Update Status)
    else if (payload.action === "updateSync") {
      var syncSheet = ss.getSheetByName("LiveSync");
      if (!syncSheet) {
        syncSheet = ss.insertSheet("LiveSync"); // สร้างหน้าต่างใหม่ให้อัตโนมัติ
        syncSheet.appendRow(["TeamID", "P1", "P2", "P3", "P4"]);
      }
      var data = syncSheet.getDataRange().getValues();
      var rowIndex = -1;
      for (var i = 1; i < data.length; i++) {
        if (data[i][0] === payload.teamId) {
          rowIndex = i + 1;
          break;
        }
      }

      if (rowIndex === -1) { // ถ้าเป็นทีมใหม่ที่เพิ่งมีคนทำเสร็จคนแรก
        var newRow = [payload.teamId, "Pending", "Pending", "Pending", "Pending"];
        newRow[payload.pIndex + 1] = payload.status;
        syncSheet.appendRow(newRow);
      } else { // อัปเดตข้อมูลของทีมเดิม
        syncSheet.getRange(rowIndex, payload.pIndex + 2).setValue(payload.status);
      }
      return ContentService.createTextOutput(JSON.stringify({ status: "success" })).setMimeType(ContentService.MimeType.JSON);
    }

    // 3. ระบบส่งผลคะแนนตอนเล่นจบ (อันเดิมของครู)
    else {
      var mainSheet = ss.getSheetByName("Judas Manor Data") || ss.getActiveSheet();
      mainSheet.appendRow([
        new Date(), payload.groupName, payload.players, payload.avatar,
        payload.score, payload.timeUsed, payload.votedCulprit
      ]);
      return ContentService.createTextOutput(JSON.stringify({ status: "success" })).setMimeType(ContentService.MimeType.JSON);
    }

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: error.toString() })).setMimeType(ContentService.MimeType.JSON);
  }
}
