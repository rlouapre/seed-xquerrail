(:
Copyright 2014 MarkLogic Corporation

XQuerrail - blabla
:)

xquery version "1.0-ml";

module namespace main = "http://github.com/robwhitby/xray/main";

(:
  optional setup function evaluated first
  add any test docs used by the tests in this module
:)

declare private variable $test-docs :=
  <docs>
    <doc uri="one.xml">
      <root><test>e85ee5ef33029a073a21c8ba11c8a30a42c1bf0c</test></root>
    </doc>
    <doc uri="two.xml">
      <root><test>0.0.1</test></root>
    </doc>
  </docs>;
