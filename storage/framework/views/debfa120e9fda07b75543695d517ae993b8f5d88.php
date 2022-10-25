

<?php $__env->startSection('content'); ?>
<div>
    <?php if($errors->any()): ?>
        <div class="alert alert-danger">
            <ul>
                <?php $__currentLoopData = $errors->all(); $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $error): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                <li><?php echo e($error); ?></li>
                <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
            </ul>
        </div><br/>
    <?php endif; ?>
    
    <form action="<?php echo e(route('admin.tickets.store')); ?>" method="POST" enctype="multipart/form-data">
        <?php echo e(csrf_field()); ?>

        <div class="row" style="border: outset;"><br>
            <div class="col-md-12 col-sm-12  form-group">
                <h3><strong>Crear Tickets</strong></h3>
                <p><strong>Los campos (*) son obligatorios</strong></p>
            </div>

            <div class="col-md-12 col-sm-12" style="padding-block-end: 15px;">
                <div class="col-md-4 col-sm-12  form-group">
                    <label for="nombre">Agencia Origen *</label>
                    <select name="dept_id" class="form-control">
                        <option> -- Seleccione Uno --</option>
                        <?php $__currentLoopData = $dpto; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $dptos): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                            <option value="<?php echo e($dptos->dept_id); ?>"><?php echo e($dptos->dept_name); ?></option>
                        <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?> 
                    </select>
                </div>

                <div class="col-md-4 col-sm-12  form-group">
                    <label for="nombre">Solicita <?php echo e(Auth::user()->name); ?> con ID:</label>
                    <input type="text" class="form-control" readonly name="staff_id" value="<?php echo e(Auth::user()->id); ?>" >
                </div>

                <div class="col-md-4 col-sm-12  form-group">
                    <label for="nombre">Servicio Solicitado *</label>
                    <select name="helptopic" class="form-control">
                        <option > -- Seleccione Uno --</option>
                        <?php $__currentLoopData = $servicio; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $servicios): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                            <option value="<?php echo e($servicios->topic); ?>"><?php echo e($servicios->topic); ?></option>
                        <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?> 
                    </select>
                </div>
            </div>
        </div><br><br>

        <div class="col-md-12 col-sm-12" style="padding-block-end: 7px;">
            <div class="col-md-4 col-sm-12 form-group">
                <label>Asignar a:</label>
                <select name="staff_id" class="form-control">
                    <option> -- Asigne el Ticket a un Personal --</option>
                    <?php $__currentLoopData = $user; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $users): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                        <option value="<?php echo e($users->staff_id); ?>"><?php echo e($users->lastname); ?></option>
                    <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?> 
                </select>
            </div>

            <div class="col-md-4 col-sm-12 form-group">
                <label>Asunto</label>
                <input type="text" class="form-control" name="subject" placeholder="Asunto">
            </div>

            <div class="col-md-2 col-sm-12 form-group">
                <label>N. Remision que Revertio</label>
                <input type="text" class="form-control" name="nroid_nr" placeholder="# Remision">
            </div>
            <div class="col-md-2 col-sm-12 form-group">
                <label>Prioridad</label>
                <select class="form-control" name="priority_id">
                    <option value=""> -- Prioridad --</option>
                    <option value="1">Baja</option>
                    <option value="2">Normal</option>
                    <option value="3">Alta</option>
                    <option value="4">Urgente</option>
                  </select>
            </div>
        </div>

        <div class="col-md-12 col-sm-12" style="padding-block-end: 7px;">
            <div class="col-md-4 col-sm-12  form-group">
                <label><strong>Adjuntar Archivo </strong></label>
                <label for="file-upload-portada" class="custom-file-upload" style="text-align: center;">
                    <i class="fa fa-cloud-upload" aria-hidden="true"></i>&nbsp;
                    <strong>Archivo</strong>
                </label>
                <p><strong>Sugerencia:</strong>Se admiten archivos con un peso max. de<strong> 100 MB</strong></p>
                <input id="file-upload-portada" type="file" name="imagen_portada">
            </div>

            <div class="col-md-8 col-sm-12  form-group">
                <label for="nombre">Mensaje</label>
                <textarea  type="text-area" class="form-control" name="mensaje" placeholder="Mensaje"></textarea>
            </div>
        </div>

        <input type="hidden" value="Pendiente" name="estado">

        <div class="footer" style="padding: 15px 15px 5px 5px; float: right;">
            <a type="button" class="btn btn-warning float-right" href="<?php echo e(url('/admin/producto')); ?>" style="color: black">
                <i class="fa fas fa-arrow-left"></i> Cerrar</a>
            <button type="submit" class="btn btn-primary float-right mr-2"><i class="fa fas fa-save"></i>
                Guardar</button>
        </div>
    </form>
</div>
<style>
    input[type="file"]{
        display: none;
    }
    input, textarea, select{
        text-transform: uppercase !important;
    }
    .custom-file-upload {
        width: 100%;
        border: 1px solid #ccc;
        display: inline-block;
        padding: 6px 12px;
        cursor: pointer;
    }
</style>
<?php $__env->stopSection(); ?>
<?php echo $__env->make('admin.layouts.admin', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH C:\laragon\www\ticketsLaravel\resources\views/admin/tickets/create.blade.php ENDPATH**/ ?>