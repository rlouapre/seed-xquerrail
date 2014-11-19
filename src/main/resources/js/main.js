function getParameterByName(url,name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(url);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

$(function() {
  //We want to expand the correct path based on the navigation.
  //Also we want to match a base controller to a given sub-action
  var split_path= /\//gi
  var controller_match = /\/\w+(\/\w+\.*)/
  var path = window.location.pathname;
  var base_controller = path.split(split_path)[1]
  var navigation = $("#sidebar  li a");

  $.each(navigation,function(i,e) {
    var href = $(e).attr('href');
    var controller = href.split(split_path)[1]
    if(path  === href) {
        $(e).parent().addClass("active");
        $(e).parentsUntil("has-sub").addClass("active");
    } else if(path.match(controller_match) && base_controller === controller ) {
        $(e).parent().addClass("active");
        $(e).parentsUntil("has-sub").addClass("active");
    } else if(base_controller == "classes") {
        var locationType = getParameterByName(location.search,"type")
        var hrefType = getParameterByName(href,"type");
        if(locationType !== "" && hrefType === locationType) {
            $(e).parent().addClass("active");
            $(e).parentsUntil("has-sub").addClass("active");
        }

    }
  });
});
