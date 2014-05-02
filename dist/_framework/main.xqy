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
      <root><test>13f285ada8c37ce7dcabcd6ce4d005bb8d3dbd75</test></root>
    </doc>
    <doc uri="two.xml">
      <root><test>0.0.28</test></root>
    </doc>
  </docs>;
