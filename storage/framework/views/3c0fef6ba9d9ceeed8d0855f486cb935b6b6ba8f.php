

<?php $__env->startSection('content'); ?>
<div class="row"><br>
    <div class="col-xs-5">
        <div>
            <a href="<?php echo e(route('admin.tickets.create')); ?>" type="button btn btn-primary" style="color: black">
                <button class="btn btn-primary"> <i class="fa fa-ticket" aria-hidden="true"></i> Crear
                    Ticket</button></a>
        </div>
    </div>
    <div class="col-xs-7">
        <div class="title_right">
            
        </div>
    </div>
</div>
<?php $__env->stopSection(); ?>
<?php echo $__env->make('admin.layouts.admin', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH C:\laragon\www\ticketsLaravel\resources\views/admin/tickets/index.blade.php ENDPATH**/ ?>