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
      <root><test>7a189fa85199f1992fcc2b6eb85366628f05de22</test></root>
    </doc>
    <doc uri="two.xml">
      <root><test>0.0.18</test></root>
    </doc>
  </docs>;
