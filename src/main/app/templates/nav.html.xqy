declare default element namespace "http://www.w3.org/1999/xhtml";
<div class="navbar navbar-inverse navbar-fixed-top">
    <div class="navbar-inner">
        <div class="container">
            <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
                <span class="icon-bar">&nbsp;</span>
                <span class="icon-bar">&nbsp;</span>
                <span class="icon-bar">&nbsp;</span>
            </a>
            <a class="brand" href="#">XQuerrail Demo</a>
           <a ui-sref="state1">State 1</a>
            <a ui-sref="state2">State 2</a>

            <?ng-controller-list?>
        </div>
    </div>
</div>

