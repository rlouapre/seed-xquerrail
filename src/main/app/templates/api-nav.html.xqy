declare default element namespace "http://www.w3.org/1999/xhtml";
import module namespace response = "http://xquerrail.com/response";
declare variable $response as map:map external;
response:initialize($response),
<div class="row-fluid">
   <h3><span class="icon-search"></span>API Browser</h3>
   <select name="applications">
      <option value="_framework">XQuerrail</option>
      {
          for $app in response:get-data("applications")
          return
            <option value="{$app/@uri}">{fn:data($app/@name)}</option>

      }
   </select>
   <ul class="nav nav-list">
    {
     let $group := ""
     let $apidocs := for $doc in response:body()//*:apidoc order by $doc/*:header,$doc/*:title return $doc
     return
       if($apidocs) then
        for $doc in $apidocs
        let $header := function() {
            let $value := $doc/*:header
            let $size := fn:string-length($value)
            return
              fn:string-join(
                for $s in (1 to $size)
                let $string :=  fn:substring($value,$s,1)
                return 
                  if($s = 1) then fn:upper-case($string) else $string,
              "")
       }()
        return ( 
            if($group = $header) then () else <li><h5>{fn:data($header)}</h5></li>,xdmp:set($group,$header),
            <li>
            {if(response:data("link") = $doc/*:link) then attribute class {"active","api-link"} else attribute class {"api-link"}}
            <a href="/api/_/{$doc/*:link}">{fn:data($doc/*:title)}</a></li>
            )
        else  
            <div class="alert">
              <button type="button" class="close" data-dismiss="alert">&times;</button>
              <strong>Document not available.</strong> Would you like to generate now?
              <a id="generate-docs" href="/api/generate.html">Generate</a>
            </div>
     }   
   </ul>
</div>