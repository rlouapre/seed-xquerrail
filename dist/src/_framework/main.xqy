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
      <root><test>a06e868c3acdd5c7f03f6ce15d014547f37a2dec</test></root>
    </doc>
    <doc uri="two.xml">
      <root><test>0.0.20</test></root>
    </doc>
  </docs>;
