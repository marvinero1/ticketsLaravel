@extends('admin.layouts.admin')

@section('content')
<div>
    @if ($errors->any())
        <div class="alert alert-danger">
            <ul>
                @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div><br/>
    @endif
    
    <form action="{{route('admin.tickets.store')}}" method="POST" enctype="multipart/form-data">
        {{ csrf_field() }}
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
                        @foreach ($dpto as $dptos)
                            <option value="{{ $dptos->dept_id }}">{{ $dptos->dept_name }}</option>
                        @endforeach 
                    </select>
                </div>

                <div class="col-md-4 col-sm-12  form-group">
                    <label for="nombre">Solicita {{ Auth::user()->name }} con ID:</label>
                    <input type="text" class="form-control" readonly name="staff_id" value="{{ Auth::user()->id }}" >
                </div>

                <div class="col-md-4 col-sm-12  form-group">
                    <label for="nombre">Servicio Solicitado *</label>
                    <select name="helptopic" class="form-control">
                        <option > -- Seleccione Uno --</option>
                        @foreach ($servicio as $servicios)
                            <option value="{{ $servicios->topic }}">{{ $servicios->topic }}</option>
                        @endforeach 
                    </select>
                </div>
            </div>
        </div><br><br>

        <div class="col-md-12 col-sm-12" style="padding-block-end: 7px;">
            <div class="col-md-4 col-sm-12 form-group">
                <label>Asignar a:</label>
                <select name="staff_id" class="form-control">
                    <option> -- Asigne el Ticket a un Personal --</option>
                    @foreach ($user as $users)
                        <option value="{{ $users->staff_id }}">{{ $users->lastname }}</option>
                    @endforeach 
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
                <input id="file-upload-portada" type="file" name="file">
            </div>

            <div class="col-md-8 col-sm-12  form-group">
                <label for="nombre">Mensaje</label>
                <textarea  type="text-area" class="form-control" name="mensaje" placeholder="Mensaje"></textarea>
            </div>
        </div>

        <input type="hidden" value="Pendiente" name="estado">

        <div class="footer" style="padding: 15px 15px 5px 5px; float: right;">
            <a type="button" class="btn btn-warning float-right" href="{{url('/admin/producto')}}" style="color: black">
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
@endsection