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
      <root><test>b408904b75f32118a5ff1e1139b502c4ddf71f38</test></root>
    </doc>
    <doc uri="two.xml">
      <root><test>0.0.22</test></root>
    </doc>
  </docs>;
