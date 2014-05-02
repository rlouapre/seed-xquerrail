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
      <root><test>71137a2c8e4030f2bbf4fdc913f5a1e97c6ced0f</test></root>
    </doc>
    <doc uri="two.xml">
      <root><test>0.0.6</test></root>
    </doc>
  </docs>;
