<?php $__env->startSection('content'); ?>
    <div class="title m-b-md">
        <?php echo e(config('app.name')); ?>

    </div>
    <div class="description m-b-md">
        Sample users:<br/>
        Admin user: admin.laravel@labs64.com / password: admin<br/>
        Demo user: demo.laravel@labs64.com / password: demo
    </div>
<?php $__env->stopSection(); ?>

<?php echo $__env->make('layouts.welcome', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH C:\laragon\www\laravel-boilerplate-master\resources\views/welcome.blade.php ENDPATH**/ ?>