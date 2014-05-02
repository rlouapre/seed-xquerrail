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
      <root><test>59a9db1b3a683f2a1ed598a8cf23ae53e7c18aa5</test></root>
    </doc>
    <doc uri="two.xml">
      <root><test>0.0.4</test></root>
    </doc>
  </docs>;
