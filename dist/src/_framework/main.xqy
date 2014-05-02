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
      <root><test>ad9bbe2bbeb3534b8f05e0ca2d90c62d769f9a30</test></root>
    </doc>
    <doc uri="two.xml">
      <root><test>0.0.27</test></root>
    </doc>
  </docs>;
