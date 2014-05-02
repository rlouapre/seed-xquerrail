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
      <root><test>a9bfc8ef1c27c55369aa7f5ffa6dbc4e0dfeea4e</test></root>
    </doc>
    <doc uri="two.xml">
      <root><test>0.0.7</test></root>
    </doc>
  </docs>;
