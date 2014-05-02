xquery version "1.0-ml";

module namespace main = "http://github.com/robwhitby/xray/main";

(:
  optional setup function evaluated first
  add any test docs used by the tests in this module
:)

declare private variable $test-docs :=
  <docs>
    <doc uri="one.xml">
      <root><test><%= lastcommit %></test></root>
    </doc>
    <doc uri="two.xml">
      <root><test><%= version %></test></root>
    </doc>
  </docs>;
