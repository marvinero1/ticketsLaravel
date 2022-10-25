

<?php $__env->startSection('content'); ?>
<!-- page content -->
    <div class="row" style="padding-top: 55px;">
        <div>
            <h1 class="font" style="text-align: center;"><i class="fa fa-ticket"></i> <strong> Ticket's</strong></h1>        
        </div>

        <div id="myCarousel" class="carousel slide" data-ride="carousel">
            <!-- Indicators -->
            <ol class="carousel-indicators">
              <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
              <li data-target="#myCarousel" data-slide-to="1"></li>
              <li data-target="#myCarousel" data-slide-to="2"></li>
            </ol>
        
            <!-- Wrapper for slides -->
            <div class="carousel-inner">
        
              <div class="item active">
                <img src="<?php echo e(url('assets/images/neon.jpg')); ?>" alt="Tickets" style="width:100%;">
                <div class="carousel-caption">
                  
                </div>
              </div>
    
            
              <div class="item">
                <img src="<?php echo e(url("assets/images/icon3.png")); ?>" alt="Tickets" style="width:100%;">
                <div class="carousel-caption">
                  
                </div>
              </div>
          
            </div>
        
            <!-- Left and right controls -->
            <a class="left carousel-control" href="#myCarousel" data-slide="prev">
              <span class="glyphicon glyphicon-chevron-left"></span>
              <span class="sr-only">Previous</span>
            </a>
            <a class="right carousel-control" href="#myCarousel" data-slide="next">
              <span class="glyphicon glyphicon-chevron-right"></span>
              <span class="sr-only">Next</span>
            </a>
          </div>









       

        
    </div><br><br><br><hr><br>


    <div class="row tile_count text-center">
        <div class="col-md-4 col-sm-4 col-xs-6 tile_stats_count">
            <span class="count_top"><i class="fa fa-users"></i> <?php echo e(__('views.admin.dashboard.count_0')); ?></span>
            <div class="count green"><?php echo e($counts['users']); ?></div>
        </div>
        <div class="col-md-4 col-sm-4 col-xs-6 tile_stats_count">
            <span class="count_top"><i class="fa fa-address-card"></i> <?php echo e(__('views.admin.dashboard.count_1')); ?></span>
            <div>
                <span class="count green"><?php echo e($counts['users'] - $counts['users_unconfirmed']); ?></span>
                <span class="count">/</span>
                <span class="count red"><?php echo e($counts['users_unconfirmed']); ?></span>
            </div>
        </div>
        <div class="col-md-4 col-sm-4 col-xs-6 tile_stats_count">
            <span class="count_top"><i class="fa fa-user-times "></i> <?php echo e(__('views.admin.dashboard.count_2')); ?></span>
            <div>
                <span class="count green"><?php echo e($counts['users'] - $counts['users_inactive']); ?></span>
                <span class="count">/</span>
                <span class="count red"><?php echo e($counts['users_inactive']); ?></span>
            </div>
        </div>
        
    </div>
<?php $__env->stopSection(); ?>

<?php $__env->startSection('scripts'); ?>
    <?php echo \Illuminate\View\Factory::parentPlaceholder('scripts'); ?>
    <?php echo e(Html::script(mix('assets/admin/js/dashboard.js'))); ?>

<?php $__env->stopSection(); ?>

<?php $__env->startSection('styles'); ?>
    <?php echo \Illuminate\View\Factory::parentPlaceholder('styles'); ?>
    <?php echo e(Html::style(mix('assets/admin/css/dashboard.css'))); ?>

<?php $__env->stopSection(); ?>
<?php echo $__env->make('admin.layouts.admin', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH C:\laragon\www\ticketsLaravel\resources\views/index.blade.php ENDPATH**/ ?>