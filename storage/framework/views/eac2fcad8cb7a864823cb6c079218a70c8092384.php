<div class="top_nav">
    <div class="nav_menu">
        <nav>
            <div class="nav toggle" style="padding-right: 3px;color:#093070;">
                <a id="menu_toggle"><i class="fa fa-bars"></i></a>
            </div>
           
            <ul class="nav navbar-nav navbar-right">
                <li class="">
                    <a href="javascript:;" class="user-profile dropdown-toggle" data-toggle="dropdown"
                       aria-expanded="false">
                        <i class="fa fa-user"></i>
                        <span class=" fa fa-angle-down"></span>
                    </a>
                    <ul class="dropdown-menu dropdown-usermenu pull-right">
                        <li>
                            <a href="<?php echo e(route('logout')); ?>">
                                <i class="fa fa-sign-out pull-right"></i> <?php echo e(__('views.backend.section.header.menu_0')); ?>

                            </a>
                        </li>
                    </ul>
                </li>

                
                <li style="padding: 20px 0px 0px 0px;"><span><?php echo e(\Carbon\Carbon::now()->format('F j, Y')); ?></span></li>
            </ul>
        </nav>
    </div>
</div>
<?php /**PATH C:\laragon\www\ticketsLaravel\resources\views/admin/sections/header.blade.php ENDPATH**/ ?>