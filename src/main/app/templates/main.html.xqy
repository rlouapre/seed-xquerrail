declare default element namespace "http://www.w3.org/1999/xhtml";
<template>
  <!--[if IE 8]> <html lang="en" class="ie8"> <![endif]-->
  <!--[if !IE]><!-->
  <html lang="en" ng-app="xq.app">
  <!--<![endif]-->
  <?template name="head"?>
  <?controller-stylesheet?>
  <body>
    <!--[if lt IE 7]>
      <p class="chromeframe">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">activate Google Chrome Frame</a> to improve your experience.</p>
    <![endif]-->
    <div class="navbar navbar-default navbar-fixed-top" role="navigation">
      <?template name="nav"?>
    </div>
    <div class="container">
      <!-- Page Content Here -->
      <!-- <?view?> -->
      <div ui-view=""></div>
    </div>
  </body>
  <?include-ng-templates?>

  <?template name="scripts"?>
  <?controller-script?>
</html>
</template>/(comment()|node())
