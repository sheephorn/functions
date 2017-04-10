/**
 * Request/Responseに関係のあるカラム番号
 */
const vailParams = [0,1,2,3,4];

var inArray = function(array, param) {
    return (array[param] !== undefined) ? true : false;
};

/**
 * 指定csvからデータ配列の取得
 * 最終項目は使用しないが、調整に必要な項目(adjust)
 * @param  String path csvファイルパス
 * @return Array        データ配列
 */
var convertCsvToObject = function(csvData) {
    var returnArray = [];
    var header = [];
    csvData = convertToUtf8(csvData);
    var csvData = csvData.split("\n");
    csvData.pop();
    $.each(csvData, function(idx, row){
        var newRow = {};
        if (idx === 0) {
            // header読み込み
            $.each(row.split(','), function(i, val){
                header.push(val);
            });
        } else {
            $.each(row.split(','), function(i, val){
                newRow[header[i]] = val;
            });
            returnArray.push(newRow);
        }
    });
    return returnArray;
};

var getParamHeaderContents = function(csvData) {
    var resultArray = [];
    var count = 0;
    $.each(csvData, function(key, col){
        if (inArray(vailParams, count)) {
            resultArray.push(key);
        } else {
            //
        }
        count ++;
    });
    return resultArray;
};

var convertToObjectFromArray = function(array) {

};
var convertToUtf8 = function(str) {
    var str_array = str.split('');//1文字ずつ配列に入れる
    var utf8Array = Encoding.convert(str_array, 'UTF8', 'AUTO');//UTF-8に変換
    var convert = utf8Array.join('');//配列を文字列に戻す
    return convert
};

/**
 * ajax通信 非同期
 **/
var execAjax = function(url, callback) {
    var self = this;
    var process = $.ajax({
      url : url,
      type : "POST",
      timeout : 10000,
      contentType : 'application/json; charset=utf-8',
      mimeType: 'application/json',
    });

    // 通信完了コールバック
    process.done(function(data) {
      funcCallack(data);
    });

    // fail
    process.fail(function(data) {
      console.log("failed");
    });

    // 通信後(finally)コールバック
    process.always(function(data) {
        //
    });
};

/**
 * ajax通信 同期
 **/
var execSyncAjax = function(url) {
    var self = this;
    var process = $.ajax({
      url : url,
      type : "GET",
      timeout : 10000,
      async : false
  }).responseText;
  return process;
};
