xquery version "1.0-ml";

module namespace ng-engine = "http://xquerrail.com/engine/html/ng";

import module namespace engine  = "http://xquerrail.com/engine";
import module namespace config = "http://xquerrail.com/config";
import module namespace request = "http://xquerrail.com/request";
import module namespace response = "http://xquerrail.com/response";
import module namespace domain = "http://xquerrail.com/domain";

declare namespace search = "http://marklogic.com/appservices/search";

declare option xdmp:mapping "false";
declare option xdmp:output "method=xml";

(:~
 : You initialize your variables
 :)
declare variable $request := map:map() ;
declare variable $response := map:map();
declare variable $context := map:map();

(:~
   Initialize  Any custom tags your engine handles so the system can call
   your custom transform functions
 :)
declare variable $custom-engine-tags as xs:QName* :=
(
  xs:QName("ng-engine:include-ng-templates"),
  xs:QName("ng-engine:ng-controller-list")
);

(:~
 : The Main Controller will call your initialize method
 : and register your engine with the engine.base.xqy
 :)
declare function ng-engine:initialize($response, $request) {
  engine:register-tags($custom-engine-tags)
};

declare function ng-engine:transform-include-ng-templates($node)
{
  let $template-directory := config:application-templates-path(response:application())
  let $ng-templates :=
    if(xdmp:modules-database() eq 0) then (
      let $template-directory := fn:concat(xdmp:modules-root(), $template-directory)
      for $file in xdmp:filesystem-directory($template-directory)/*:entry
      let $filename := xs:string($file/*:filename)
      where $file/*:type eq "file" and fn:starts-with($filename, "ng-")
      return fn:substring($filename, 1, fn:string-length($filename) - fn:string-length(".html.xqy"))
    )
    else (
      xdmp:eval('declare variable $uri as xs:string external ;
      for $file in xdmp:directory($uri)
        let $filename := fn:tokenize(xdmp:node-uri($file), "/")[fn:last()]
        return
          if (fn:ends-with($filename, ".html.xqy")) then fn:substring-before($filename, ".html.xqy")
          else ()
      ',
      (fn:QName("","uri"), $template-directory),
         <options xmlns="xdmp:eval">
            <database>{xdmp:modules-database()}</database>
         </options>
      )
    )

   return $ng-templates ! (
      engine:transform(
        processing-instruction{"template"} {
          "name='" || . || "'"
        }
      )
    )
};

declare function ng-engine:transform-ng-controller-list($node)
{
  let $attributes := xdmp:value(fn:concat("<attributes ", fn:data($node),"/>"))
  return
  <ul class="list-inline"> {
    if($attributes/@uiclass) then attribute class {$attributes/@uiclass} else (),
    if($attributes/@id) then $attributes/@id else (),
    if($attributes/@class) then
      for $controller in domain:get-controllers(response:application())[@class = $attributes/@class]
      return
        <li>
          {if($attributes/@itemclass) then attribute class {$attributes/@itemclass} else ()}
          <a ui-sref="controller.{$controller/@name}">{(fn:data($controller/@label),fn:data($controller/@name))[1]}</a>
        </li>
    else
      for $controller in domain:get-controllers(response:application())
      return
        <li>
          {if($attributes/@itemclass) then attribute class {$attributes/@itemclass} else ()}
          <a ui-sref="controller.detail({{model: '{$controller/@name}'}})">{(fn:data($controller/@label),fn:data($controller/@name))[1]}</a>
          <!-- a ui-sref="state2">{(fn:data($controller/@label),fn:data($controller/@name))[1]}</a -->
        </li>
   } </ul>
};

(:~
  Handle your custom tags in this method or the method you have assigned
  initialized with the base.engine
  It is important that you only handle your custom tags and
  any content that is required to be consumed by your tags
 :)
declare function ng-engine:custom-transform($node as item())
{
  typeswitch($node)
  case processing-instruction("include-ng-templates") return ng-engine:transform-include-ng-templates($node)
  case processing-instruction("ng-controller-list") return ng-engine:transform-ng-controller-list($node)
  default return engine:transform($node)
};
