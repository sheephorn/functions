/**
 * Request/Responseに関係のあるカラム番号
 */
const VALID_PARAMS_NUMBERS = [0,1,2,3,4];
const TYPE_COL_NAME = 'Type'
const NAME_COL_NAME = 'name';
const REQUEST_TYPE_NAME = 'Request';
const RESPONSE_TYPE_NAME = 'Response';
const TITLE_TYPE_NAME = 'Title';
const DESCRIPTION_TYPE_NAME = 'Description';

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
        if (inArray(VALID_PARAMS_NUMBERS, count)) {
            resultArray.push(key);
        } else {
            //
        }
        count ++;
    });
    return resultArray;
};

/**
 * 関数詳細csvデータから各種類のパラメータを取り出し分類する
 * @param  Array csvData 整形済みcsvデータ
 * @return Object           分類済みデータ
 */
var getFunctionDetail = function(csvData) {
    var resultObject = {};
    var requestArray = [];
    var responseArray = [];
    var descriptionArray = [];

    $.each(csvData, function(idx, row){
        if (row[TYPE_COL_NAME] === REQUEST_TYPE_NAME) {
            var newRow = {};
            var count = 0;
            $.each(row, function(key, col){
                if (inArray(VALID_PARAMS_NUMBERS, count)) {
                    newRow[key] = col;
                } else {
                    //
                }
                count ++;
            });
            requestArray.push(newRow);
        } else if (row[TYPE_COL_NAME] === RESPONSE_TYPE_NAME) {
            var newRow = {};
            var count = 0;
            $.each(row, function(key, col){
                if (inArray(VALID_PARAMS_NUMBERS, count)) {
                    newRow[key] = col;
                } else {
                    //
                }
                count ++;
            });
            responseArray.push(newRow);
        } else if (row[TYPE_COL_NAME] === TITLE_TYPE_NAME) {
            resultObject[TITLE_TYPE_NAME] = row[NAME_COL_NAME];
        }
    });
    resultObject[REQUEST_TYPE_NAME] = requestArray;
    resultObject[RESPONSE_TYPE_NAME] = responseArray;
    resultObject[DESCRIPTION_TYPE_NAME] = descriptionArray;
    return resultObject;

}

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
      async : false,
      cache : false
  }).responseText;
  return process;
};
