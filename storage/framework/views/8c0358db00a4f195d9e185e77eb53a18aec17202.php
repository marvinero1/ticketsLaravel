<div class="col-md-3 left_col">
    <div class="left_col scroll-view">
        <div class="navbar nav_title text-center" style="border: 0; margin: 1px 0 0 0px !important;">
            <a href="<?php echo e(route('admin.dashboard')); ?>" class="site_title">
                <h3><i class="fa fa-ticket" style="margin: 1px 0 0 0px !important;"></i> Ticket's Pertec</h3>
            </a>
        </div>

        <div class="clearfix"></div>

        <!-- menu profile quick info -->
        <div class="profile clearfix"><br>
            <div class="profile_pic">
                <img src="<?php echo e(auth()->user()->avatar); ?>" alt="Profile" class="img-circle profile_img">
            </div>
            <div class="profile_info">
                <h2><?php echo e(auth()->user()->name); ?></h2>
            </div>
        </div><br/>
        <!-- /menu profile quick info -->      

        <!-- sidebar menu -->
        <div id="sidebar-menu" class="main_menu_side hidden-print main_menu">
            <div class="menu_section">
                <h3><?php echo e(__('views.backend.section.navigation.sub_header_0')); ?></h3>
                <ul class="nav side-menu">
                    <li>
                        <a href="<?php echo e(route('admin.dashboard')); ?>">
                            <i class="fa fa-home" aria-hidden="true"></i>
                            <?php echo e(__('views.backend.section.navigation.menu_0_1')); ?>

                        </a>
                    </li>
                    <li>
                        <a>
                            <i class="fa fa-ticket"></i>
                            <?php echo e(__('views.backend.section.navigation.menu_2_1')); ?>

                            <span class="fa fa-chevron-down"></span>
                        </a>
                        <ul class="nav child_menu">
                            <li>
                                <a href="<?php echo e(route('admin.tickets.index')); ?>">
                                    Mis Ticket's
                                </a>
                            </li>
                            <li>
                                <a href="<?php echo e(route('log-viewer::logs.list')); ?>">
                                   Tus Pendientes
                                </a>
                            </li>
                            <li>
                                <a href="<?php echo e(route('log-viewer::logs.list')); ?>">
                                   Pendientes de Verificacion
                                </a>
                            </li>
                            <li>
                                <a href="<?php echo e(route('log-viewer::logs.list')); ?>">
                                    Ticket's Cerrados
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="<?php echo e(route('admin.users')); ?>">
                            <i class="fa fa-id-card" aria-hidden="true"></i>
                            Lista del Personal
                        </a>
                    </li>
                    <li>
                        <a href="<?php echo e(route('admin.users')); ?>">
                            <i class="fa fa-cubes" aria-hidden="true"></i>
                            Lista de Servicios
                        </a>
                    </li>
                </ul>
            </div>

            

            
            

            <div class="menu_section">
                <h3><?php echo e(__('views.backend.section.navigation.sub_header_3')); ?></h3>
                <ul class="nav side-menu">
                  <li>
                      <a href="https://pertec.com.bo/" target="_blank" title="Pertec">
                        <i class="fa fa-home" aria-hidden="true"></i>Pertec Sitio Web</a>
                  </li>
                  
                </ul>
            </div>
        </div>
        <!-- /sidebar menu -->
    </div>
</div>
<?php /**PATH C:\laragon\www\ticketsLaravel\resources\views/admin/sections/navigation.blade.php ENDPATH**/ ?>