/**
 * 関数ボタン　コンポーネント登録
 */
var functionButton = Vue.extend({
    props : ['path'],
    template : '<button type="button" class="btn btn-primary" @click="showDetail">Detail</button>',
    methods : {
        showDetail : function(){

            var csv = convertCsvToObject(execSyncAjax(this.path));
            if (csv) {
                // 書き換え処理
                functionBody.paramHeaders = getParamHeaderContents(csv[0]);
                functionData = getFunctionDetail(csv);
                functionBody.requestParams = functionData[REQUEST_TYPE_NAME];
                functionBody.responseParams = functionData[RESPONSE_TYPE_NAME];
                functionBody.functionName = functionData[TITLE_TYPE_NAME];
                functionBody.descriptions = functionData[DESCRIPTION_TYPE_NAME];
                functionBody.show = !functionBody.show;
                contents.show = !contents.show;
                window.scrollTo(0,0);
            }
        }
    }
});
/**
 * Description　コンポーネント登録
 */
var descriptionRow = Vue.extend({
    props : ['description', 'description2', 'classname'],
    template : '<span v-if="description" class="col-md-12 " :class="classname">{{ description }}<br></span>'+
                '<span v-else-if="description2" class="col-md-11 col-md-offset-1">{{ description2 }}<br></span>'+
                '<span v-else>&nbsp;<br></span>',
});
/**
 * 関数詳細　Vueオブジェクト
 */
var functionBody = new Vue({
    el : '#functionbody',
    data : {
        paramHeaders : [],
        responseParams : [],
        requestParams : [],
        descriptions : [],
        show : false,
        functionName : 'not yet'
    },
    components : {
        'description-row' : descriptionRow
    }
});
/**
 * 本体リスト　Vueオブジェクト
 */
var contents = new Vue({
    el : '#mainbody',
    data : {
        show : true,
        // フィルター変数
        filterId : '',
        filterCategory1 : '',
        filterCategory2 : '',
        filterDescription : '',
        filterUrl : '',
        filterWebController : '',
        filterAplController : '',
        filterView : '',
        filterJs : '',
    },
    created : function(){
        convertCsvEncordingToUtf8();
        var csv = convertCsvToObject(execSyncAjax('csv/functions.csv'));
        this.contents = csv;
        this.filteredContents = csv;
    },
    components : {
        'function-button' : functionButton
    },
    watch : {
        filterId : function(val) {
            this.listFilter();
        },
        filterCategory1 : function(val) {
            this.listFilter();
        },
        filterCategory2 : function(val) {
            this.listFilter();
        },
        filterDescription : function(val) {
            this.listFilter();
        },
        filterUrl : function(val) {
            this.listFilter();
        },
        filterWebController : function(val) {
            this.listFilter();
        },
        filterAplController : function(val) {
            this.listFilter();
        },
        filterView : function(val) {
            this.listFilter();
        },
        filterJs : function(val) {
            this.listFilter();
        },
    },
    methods : {
        listFilter : function() {
            var self = this;
            this.filteredContents = this.contents.filter(function(content, idx, origin){
                var ret = true;
                if (String(content.id).toLowerCase().match(new RegExp(self.filterId.toLowerCase())) === null) ret = false;
                if (String(content.category1).toLowerCase().match(new RegExp(self.filterCategory1.toLowerCase())) === null) ret = false;
                if (String(content.category2).toLowerCase().match(new RegExp(self.filterCategory2.toLowerCase())) === null) ret = false;
                if (String(content.description).toLowerCase().match(new RegExp(self.filterDescription)) === null) ret = false;
                if (String(content.url).toLowerCase().match(new RegExp(self.filterUrl.toLowerCase())) === null) ret = false;
                if (String(content.webcontroller).toLowerCase().match(new RegExp(self.filterWebController.toLowerCase())) === null) ret = false;
                if (String(content.aplcontroller).toLowerCase().match(new RegExp(self.filterAplController.toLowerCase())) === null) ret = false;
                if (String(content.view).toLowerCase().match(new RegExp(self.filterView.toLowerCase())) === null) ret = false;
                if (String(content.js).toLowerCase().match(new RegExp(self.filterJs.toLowerCase())) === null) ret = false;
                return ret;
            });
        },
        clearFilter : function(name) {
            this[name] = '';
        }

    }
});

$("button.back").on("click", function(){
    functionBody.show = !functionBody.show;
    contents.show = !contents.show;
});
