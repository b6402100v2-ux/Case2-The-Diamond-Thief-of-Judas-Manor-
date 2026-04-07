function doPost(e) {
  var headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  };
  
  try {
    // รับข้อมูลที่ส่งมาจากเกม (text/plain) แล้วแปลงกลับเป็น JSON
    var payload = JSON.parse(e.postData.contents);
    
    // เลือก Sheet ที่เปิดใช้งานอยู่
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // บันทึกข้อมูลลงคอลัมน์ตามลำดับ (รวม Timestamp เป็นคอลัมน์แรก)
    sheet.appendRow([
      new Date(), 
      payload.groupName, 
      payload.players, 
      payload.avatar, 
      payload.score, 
      payload.timeUsed, 
      payload.votedCulprit
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ "status": "success" }))
                         .setMimeType(ContentService.MimeType.JSON);
                         
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ "status": "error", "message": error.toString() }))
                         .setMimeType(ContentService.MimeType.JSON);
  }
}
