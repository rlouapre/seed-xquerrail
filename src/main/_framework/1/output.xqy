xquery version "1.0-ml";

module namespace output = "http://github.com/robwhitby/xray/1";

(:
  optional setup function evaluated first
  add any test docs used by the tests in this module
:)

declare private variable $test-docs :=
  <docs>
    <doc uri="one.xml">
      <root><test></test></root>
    </doc>
    <doc uri="two.xml">
      <root><test></test></root>
    </doc>
  </docs>;
