

<?php $__env->startSection('content'); ?>
<div class="container">
    <div class="row">
        <div class="title_left" style="text-align: center;">
            <h3>Ticket's</h3>
        </div><br>

        <?php if(Session::has('message')): ?>
            <div class="alert alert-info"><?php echo e(Session::get('message')); ?></div>
        <?php endif; ?>

        <?php if(Session::has('danger')): ?>
            <div class="alert alert-danger"><?php echo e(Session::get('danger')); ?></div>
        <?php endif; ?>

        <div class="row">
            <div class="col-xs-5">
                <div>
                    <a href="<?php echo e(route('admin.tickets.create')); ?>" type="button btn btn-primary" style="color: black">
                        <button class="btn btn-primary"> <i class="fa fa-ticket" aria-hidden="true"></i> Crear
                            Ticket</button></a>
                </div>
            </div><br>
            <div class="col-xs-7">
                <div class="title_right">
                    
                </div>
            </div>
        </div>
    </div>

    <div class="clearfix"></div><br>
    <div class="row" style="display: block;">
        <div class="col-md col-sm">
            <div class="x_panel">
                <div class="x_title">
                    <h2>Tabla de Tickets</h2>
                    <ul class="nav navbar-right panel_toolbox">
                        <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
                        </li>
                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button"
                                aria-expanded="false"><i class="fa fa-wrench"></i></a>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a class="dropdown-item" href="#">Settings 1</a>
                                <a class="dropdown-item" href="#">Settings 2</a>
                            </div>
                        </li>
                        <li><a class="close-link"><i class="fa fa-close"></i></a>
                        </li>
                    </ul>
                    <div class="clearfix"></div>
                </div>
                <div class="x_content table-responsive">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Ticket</th>
                                <th>Fecha Hora</th>
                                <th>Prioridad</th>
                                <th>Servicio</th>
                                <th>De Quien</th>
                                <th>Asignado A:</th>
                                <th>Estado</th>
                            </tr>
                        </thead>

                        <tbody>
                            <?php $__currentLoopData = $ticket; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $tickets): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                                <tr>
                                    <td class="row1" scope="row"><?php echo e($tickets->ticket_id); ?></td>
                                    <td scope="row"><?php echo e($tickets->created_at); ?></td>
                                    <td scope="row"><?php echo e($tickets->priority_id); ?></td>
                                    <td scope="row"><?php echo e($tickets->helptopic); ?></td>
                                    <td scope="row"><?php echo e($tickets->staff_id); ?></td>
                                    <td scope="row"><?php echo e($tickets->staff_id1); ?></td>

                                    <td scope="row" style="text-align:center;">
                                        <a href="<?php echo e(route('admin.tickets.show', $tickets->ticket_id)); ?>" style="color: black">
                                            <button class="btn btn-gray"><i class="fa fa-eye" aria-hidden="true"></i>
                                                Ver</button></a>
                                        
                                      
                                        
                                    </td>
                                    
                                    
                                </tr>
                            <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                        </tbody>
                    </table>
                </div>
            </div>
            <div style="text-align: center;">
                <?php echo e($ticket->links()); ?>

            </div>
        </div>
    </div>
</div>

<?php $__env->stopSection(); ?>
<?php echo $__env->make('admin.layouts.admin', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH C:\laragon\www\ticketsLaravel\resources\views/admin/tickets/index.blade.php ENDPATH**/ ?>