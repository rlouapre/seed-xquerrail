xquery version "1.0-ml";
(:~
: Documentation Controller
: @author garyvidal@hotmail.com
 :)
module namespace controller = "http://xquerrail.com/app/controller/docs";

import module namespace request = "http://xquerrail.com/request";
import module namespace response = "http://xquerrail.com/response";
import module namespace domain = "http://xquerrail.com/domain";
import module namespace base = "http://xquerrail.com/model/base";

declare function model() {
  domain:get-model("document")
};

declare function index() {
   response:set-template("two-columns"),
   response:set-title("Documentation"),
   response:set-slot("sidebar",<?template name="docs-nav"?>),
   response:set-data("doclist",base:list(domain:get-model("document"),request:params())),
   response:flush()
};

declare function details() {
   response:set-template("two-columns"),
   response:set-slot("sidebar",<?template name="docs-nav"?>),
   response:add-data("link",request:param("link")),
   response:add-data("doclist",base:list(domain:get-model("document"),request:params())),
   response:set-body(base:find(domain:get-model("document"),request:params())),
   response:flush()
};

declare function save() {
  let $save := base:create-or-update(model(),request:params())
  return
     xdmp:redirect-response("/docs/_/" || $save/*:link)
};