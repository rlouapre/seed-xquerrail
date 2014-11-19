$(function() {
  angular.module('xq.app', ['ngAnimate', 'ui.bootstrap', 'ui.router'])
    .config(function($stateProvider, $urlRouterProvider) {
    //
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/state1");
    //
    // Now set up the states
    $stateProvider
      .state('controller', {
        url: "/controller",
        // templateUrl: "partials/state1.html"
        template: '<ui-view/>',
        abstract: true
      })
      .state('controller.detail', {
        url: "/:model",
        templateUrl: 'ng.controller.index.html',
        controller: 'DefaultEntityCtrl'
      })
      .state('state1', {
        url: "/state1",
        templateUrl: "partials/state1.html"
      })
      .state('state1.list', {
        url: "/list",
        templateUrl: "partials/state1.list.html",
        controller: function($scope) {
          $scope.items = ["A", "List", "Of", "Items"];
        }
      })
      .state('state2', {
        url: "/state2",
        templateUrl: "partials/state2.html"
      })
      .state('state2.list', {
        url: "/list",
        templateUrl: "partials/state2.list.html",
        controller: function($scope) {
          $scope.things = ["A", "Set", "Of", "Things"];
        }
      });
    })
    .controller('DefaultEntityCtrl', ['$log', '$stateParams', function($log, $stateParams) {
      $log.log($stateParams);
      this.model = $stateParams.model;
    }]);

});

var indexGrid = null;

function arrayFormatter(cellValue, options, rowObject) {
  var values = [];
  var colValues = $(rowObject).find(options.colModel.name)
  if(colValues === null || colValues === undefined) {
    return "&nbsp;"
  } else {
      $(colValues).each(function(i,e) {
         values.push($(e).text());
      });
      if(values.length == 0) {
      return "&nbsp;";
      } else {
        return "(" + values.join("; ") + ")";
      }
   }
}

function binaryFormatter(cellValue, options, rowObject) {
   return   "<a href='./binary?name=" + options.colModel.name + "&uuid=" + options.rowId + "' class='download-link' style='color:blue'><span class='ui-icon ui-icon-link' style='display:inline-block'></a>" + $(rowObject).find(options.colModel.name).attr("filename");
}

var langStringFormatter = function(cellValue,options,rowObject) {
  var lang = $(rowObject).find(options.colModel.name).attr("xml:lang");
  var string = $(rowObject).find(options.colModel.name).text();
  if(lang !== undefined && lang !== null) {
    return "<span>" +  string + "[" +       lang + "]</span>"
  } else return "";
};
function initToolbar(props) {
  var id = jQuery(indexGrid).jqGrid('getGridParam', 'selrow');
  if(props["new"] == true){
     jQuery("#toolbar").append("<a id='new-button' class='btn btn-success'><b class='icon-plus icon-white'></b> New</a>");
     jQuery("#new-button").click(function() {newForm();});
  }
  if(props['edit'] == true) {
     jQuery("#toolbar").append("<a id='edit-button' class='btn btn-success'><b class='icon-edit icon-white'></b> Edit</a>");
     jQuery("#edit-button").click(function() {editForm();});
  }
  if(props['details'] == true) {
     jQuery("#toolbar").append("<a id='details-button' class='btn btn-success'><b class='icon-eye-open icon-white'></b> Details</a>");
     jQuery("#details-button").click(function() {detailsForm();});
  }
  if(props["delete"] == true) {
     jQuery("#toolbar").append("<a id='delete-button' class='btn btn-success'><b class='fa fa-trash'></b> Delete</a>");
     jQuery("#delete-button").click(function() {deleteForm();});
  }
  if(props['show'] == true){
     jQuery("#toolbar").append("<a id='show-button' class='btn btn-success'><b class='icon-eye-open icon-white'></b> Show</a>");
     jQuery("#show-button").click(function() {showForm();});
  }
  if(props['search'] == true) {
     jQuery("#toolbar").append("<a id='search-button' class='btn btn-success'><b class='icon-filter icon-white'></b> Filter</a>");
     jQuery("#search-button").click(function() {jQuery(indexGrid).jqGrid('searchGrid',{multipleSearch:true});});
  }
  if(props['export'] == true) {
     jQuery("#toolbar").append("<a id='export-button' class='btn btn-success'><b class='icon-download icon-white'></b> Export</a>");
     jQuery("#export-button").click(function() {exportForm();});
  }
  if(props['import'] == true) {
     jQuery("#toolbar").append("<a id='import-button' class='btn btn-success'><b class='icon-upload icon-white'></b> Import</a>");
     jQuery("#import-button").click(function() {importForm();});
  }
  //jQuery("#toolbar").buttonset();
}
//new Form
function newForm() {
   window.location.href = "/" + context.controller + "/new.html";
}

function editForm() {
   if(context.currentId != null) {
            window.location.href = "/" + context.controller + "/edit.html?" + context.modelId + "=" + context.currentId;
   } else if(context.currentId == null ){
     alert("Please select a record");
   }
}

function detailsForm() {
   if(context.currentId != null) {
            window.location.href = "/" + context.controller + "/details.html?" + context.modelId + "=" + context.currentId;
   } else if(context.currentId == null ){
     alert("Please select a record");
   }
}

function deleteForm() {

   if(context.currentId != null) {
      var c = confirm("Delete '" + context.currentLabel +"' ?");
      if(c) {
        window.location.href = "/" + context.controller + "/remove.html?" + context.modelId + "=" + context.currentId;
      }
   } else if(context.currentId == null ){
     alert("Please select a record");
   }
};

function showForm() {
  detailsForm();
  // if(context.currentId != null) {
  //  var url = "/" + context.controller + "/show.html?_partial=true&" + context.modelId + "=" + context.currentId;
  //  jQuery('#popup').html("<div class='loading'>...</div>");
  //  jQuery.get(url, function (data) {
  //        jQuery('#popup').html(data);
  //  });
  //  jQuery("#popup").dialog({
  //     width: 800,
  //     height: 600,
  //     autoOpen: true,
  //     resizable:false,
  //     modal:true,
  //     zIndex:999999,
  //     title:'Show ' + _id
  //  });
  // } else {
  //   alert("Please select a record");
  // }
}

// Sends the partial form back to UI
function importForm() {
 var url = "/" + context.controller + "/import.html?_partial=true";
 jQuery('#popup').html("<div class='loading'>...</div>");
  jQuery.get(url, function (data) {
        jQuery('#popup').html(data);
  });
  jQuery("#popup").dialog({
     width: 1000,
     height: 600,
     autoOpen: true,
     resizable:false,
     modal:true,
     zIndex:999999,
     title:'Import Options'
  });
}

//Popup Dialog Form
function exportForm() {
  var url = "/" + context.controller + "/export.html?_partial=true";
  var dialog = $("<div id='popup'></div>");
  dialog.html("<div class='loading'>...</div>");
  jQuery.get(url, function (data) {
        jQuery(dialog).html(data);

  });
  jQuery(dialog).dialog({
     width: 1000,
     height: 600,
     autoOpen: true ,
     modal:true ,
     title:'Export Options'
  });
}
/*Grid Helper */
// var gridHelper = window.gridHelper || {}
// gridHelper = {
//     "_this" : this,
//     multiselect: false,
//     enableMultiSelect :  function (isEnable) {
//     $(this).jqGrid('setGridParam', {multiselect: (isEnable ? true : false)});
//     },
//     _context : {},
//     context  : function(context) {this._context = context},
//     init : function() { /*Globals*/
//          jQuery.extend(jQuery.jgrid.defaults, {
//              prmNames: {
//                  oper    : "_oper",
//                  page    : "page",
//                  sidx    : "sb",
//                  sord    : "sort",
//                  page    : "pg",
//                  rows    : "rows",
//                  search  : "search",
//                  filters : "filter"
//              }
//          });
//     },
//     resizeGrid : function () {
//         $("#list-wrapper").height($(window).height() - $("#list-wrapper").offset().top - 20   );
//         jQuery(indexGrid).setGridWidth(jQuery("#list-wrapper").outerWidth() );
//         jQuery(indexGrid).setGridHeight(jQuery("#list-wrapper").innerHeight()- 80);
//     },
//     reloadGrid : function() {
//        jQuery(gridId).trigger("reloadGrid");
//     },
//     xmlListReaderSettings : function() {
//         return  {
//             root: 'list',
//             row: context.modelName,
//             id: context.modelIdSelector,
//             page: 'list>currentpage',
//             total: 'list>totalpages',
//             records: 'list>totalrecords',
//             repeatitems: false
//         };
//    },

//    jsonListReaderSettings : function() {
//        return {
//             root: 'list',
//             id: context.modelId,
//             page: 'currentpage',
//             total: 'totalpages',
//             records: 'totalrecords',
//             repeatitems: false
//         };
//     },
//     initListGrid : function(gridId, gridParams) {
//         indexGrid = gridId;
//         for(i = 0; i < gridParams.colModel.length;i++) {
//             var col = gridParams.colModel[i];
//             var formatter = col.formatter;
//             switch(formatter){
//               case "arrayFormatter" :
//               col.formatter = arrayFormatter;
//               break;
//               case "binaryFormatter":
//                 col.formatter = arrayFormatter;
//                 break;
//               case "langStringFormatter" :
//                 col.formatter = langStringFormatter;
//                 break;
//             }
//         }

//         extendParams = {
//             url : gridParams.url,
//             pager : gridParams.pager,
//             id : gridParams.id,
//             colModel : gridParams.colModel,
//             sortname : gridParams.sortname,
//             emptyrecords : gridParams.emptyrecords,
//             loadtext : gridParams.loadtext,
//             xmlReader : gridParams.xmlReader,
//             jsonReader : gridParams.jsonReader,
//             datatype: "xml",
//             sortorder: gridParams.sortorder,
//             loadonce:false,
//             /*scroll:1,*/
//             shrinkToFit : false,
//             pgbuttons: true,
//             gridview: true,
//             altRows : true,
//             pgbuttons:true,
//             viewrecords :true,
//             navigator:true,
//             sortable:true,
//             rowNum:20,
//             rownumbers:true,
//             rowList: [20,50,100,200],
//             width: '500',
//             height: '500',
//             multiselect: gridParams.multiselect ? gridParams.multiselect : false,
//             onSelectRow   : function(rowid,e) {
//                 var gsr = jQuery(this).jqGrid('getGridParam','selrow');
//     		    if(gsr){
//     			   var rowData = jQuery(this).getRowData(gsr);
//                    context.currentId = rowid;
//                    context.currentLabel = rowData[context.modelKeyLabel];
//                    if(gridParams.selectAction !== undefined && gridParams.selectAction !== null) {
//                         return gridParams.selectAction(rowid);
//                    } else return true
//                 }
//             },
//             ondblClickRow : function(rowid) {
//                 gridParams.editAction(rowid);
//             }
//         };
//         jQuery(gridId).jqGrid(extendParams)
//         .navGrid(gridId + '_pager',{edit: false, add: false, del: false, search: false, reload: true})
//         .navButtonAdd(gridId +'_pager',{
//             caption:"","buttonicon": "ui-icon-calculator",
//             onClickButton : function() {
//             jQuery(gridId).columnChooser({
//                 caption: "Select Columns",
//                 done : function() {
//                     gridHelper.resizeGrid();
//                 }
//             });
//             }
//         });
//         jQuery ("table.ui-jqgrid-btable tr", jQuery(gridId)).css ("height", 28);
//         jQuery ("ui-pg-table .ui-pg-selbox").css("height",24);
//         jQuery(gridId).trigger("reloadGrid");
//         $(window).on("resize","", function(e) {
//             gridHelper.resizeGrid();
//         });
//     },
//     initListGridAndPager : function(gridId, pagerId, gridParams) {
//         indexGrid = gridId;
//         jQuery(gridId).jqGrid(gridParams)
//         .navGrid(pagerId,{edit: false, add: false, del: false, search: false, reload: false});
//         jQuery ("table.ui-jqgrid-btable tr", jQuery(gridId)).css ("height", 22);
//         jQuery(gridId).trigger("reloadGrid");
//         $(window).on("resize","", function(e) {
//             gridHelper.resizeGrid();
//         });
//         gridHelper.resizeGrid();
//     },
//     /*Grid Formatter for binary Output*/
//     binaryFormatter : function (cellValue, options, rowObject) {
//          return $(rowObject).find(options.colModel.name).attr("filename");
//     },
//     /* Grid Formatter for array or repeater elements*/
//     arrayFormatter : function(cellValue, options, rowObject) {
//           var values = [];
//           $(rowObject).find(options.colModel.name).each(function(i,e) {
//              values.push($(e).text());
//           });
//           if(values.length == 0) {
//           return "&nbsp;";
//           } else {
//             return "(" + values.join("; ") + ")";
//           }
//    },
//    langStringFormatter : function(cellValue,options,rowObject) {
//         var lang = $(rowObject).find(options.colModel.name).attr("xml:lang");
//         var string = $(rowObject).find(options.colModel.name).text();
//         if(lang !== undefined && lang !== null) {
//           return "<span>"+ string +"(" + lang + ")</span>"
//         } else return "&nbsp;";



// },
//    /*Helper Function to create xmlReaderSettings*/
//    buildXmlReaderSettings : function(rowName,idName) {
//      return {
//         root: 'list',
//         row: rowName,
//         id: idName,
//         page: 'list>currentpage',
//         total: 'list>totalpages',
//         records: 'list>totalrecords',
//         repeatitems: false
//      };
//   } /*End gridHelper*/

// }

/*
  Initializes any controls that are loaded using specific plugins
  To ensure all controls are rendered within the context then
  make sure to call this after loading a form from a partial call
*/
function initControls() {
    $("input.binary").fileupload();
    $("input.time").timepicker();
    $("div.dateTime").datetimepicker({autoclose:true});
    $("input.date").datepicker({autoclose :true});
};
$(function() {
    /*Initialize Grids if present*/
    // if(window.gridModel != undefined) {
    //     gridModel.xmlReader = gridHelper.xmlListReaderSettings();
    //     gridModel.jsonReader = gridHelper.jsonListReaderSettings();
    //     gridHelper.initListGrid("#" + context.controller + "_table",gridModel);
    //     gridHelper.resizeGrid();
    // }
    if(window.toolbarMode != undefined) {
        initToolbar(toolbarMode);
        if (window.plugin !== undefined && window.plugin.updateToolbar !== undefined) {
          window.plugin.updateToolbar(toolbarMode);
        }
    }
/*    $(".nav-tabs").tab();*/
    //Initialize any dynamic form controls
    //initControls();
    var readonlyTags = $('.tags[readonly="readonly"]').parent().find('.tagsinput');
    $(readonlyTags).find('.icon-remove').remove();
    $(readonlyTags).find('input').remove();

    $(window).on("resize","", function(e) {

    });
});
