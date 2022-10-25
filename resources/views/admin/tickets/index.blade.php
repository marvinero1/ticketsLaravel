@extends('admin.layouts.admin')

@section('content')
<div class="container">
    <div class="row">
        <div class="title_left" style="text-align: center;">
            <h3>Ticket's</h3>
        </div><br>

        @if (Session::has('message'))
            <div class="alert alert-info">{{ Session::get('message') }}</div>
        @endif

        @if (Session::has('danger'))
            <div class="alert alert-danger">{{ Session::get('danger') }}</div>
        @endif

        <div class="row">
            <div class="col-xs-5">
                <div>
                    <a href="{{ route('admin.tickets.create') }}" type="button btn btn-primary" style="color: black">
                        <button class="btn btn-primary"> <i class="fa fa-ticket" aria-hidden="true"></i> Crear
                            Ticket</button></a>
                </div>
            </div><br>
            <div class="col-xs-7">
                <div class="title_right">
                    {{-- <form
                        style="display: contents !important;margin-top: 0em !important;margin-block-end: 0em !important">
                        <div class="form-group pull-right top_search">
                            <div class="input-group">
                                <input type="text" class="form-control" placeholder="Buscar por Nombre Producto" name="buscarpor"
                                    style="border: 1px #093070 solid;">
                                <span class="input-group-btn">
                                    <button class="btn btn-default" type="button" style="border: 1px #093070 solid;">
                                        <i class="fa fa-search"></i> Buscar</button>
                                </span>
                            </div>
                        </div>
                    </form> --}}
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
                            @foreach($ticket as $tickets)
                                <tr>
                                    <td class="row1" scope="row">{{ $tickets->ticket_id }}</td>
                                    <td scope="row">{{ $tickets->created_at }}</td>
                                    <td scope="row">{{ $tickets->priority_id }}</td>
                                    <td scope="row">{{ $tickets->helptopic }}</td>
                                    <td scope="row">{{ $tickets->staff_id }}</td>
                                    <td scope="row">{{ $tickets->staff_id1 }}</td>

                                    <td scope="row" style="text-align:center;">
                                        <a href="{{ route('admin.tickets.show', $tickets->ticket_id) }}" style="color: black">
                                            <button class="btn btn-gray"><i class="fa fa-eye" aria-hidden="true"></i>
                                                Ver</button></a>
                                        {{-- <a href="{{ route('admin.tickets.edit', $tickets->ticket_id) }}" style="color: black">
                                            <button class="btn btn-primary"><i class="fa fa-pencil" aria-hidden="true"></i>
                                                Editar</button></a> --}}
                                      
                                        {{-- <form action="{{ route('admin.tickets.destroy', $tickets->ticket_id ) }}" method="POST"
                                            accept-charset="UTF-8" style="display:inline">
                                            @csrf
                                            @method('DELETE')
                                            <button type="submit" class="btn btn-danger btn-sm" title="Delete Image"
                                                onclick="return confirm(&quot;¿Desea eliminar?&quot;)"><i
                                                    class="fa fas fa-trash" aria-hidden="true"></i> Eliminar</button>
                                        </form> --}}
                                    </td>
                                    
                                    {{-- <div class="modal fade" id="myModal{{$tickets->id}}" role="dialog">
                                        <div class="modal-dialog">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <button type="button" class="close"
                                                        data-dismiss="modal">&times;</button>
                                                    <h4 class="modal-title">Producto a Promoción</h4>
                                                    <h5><strong>{{ strtoupper($tickets->nombre_producto) }}</strong></h5>
                                                </div>
                                                <div class="modal-body">
                                                    <form
                                                        action="{{route( 'admin.productos.productoPromocion', $tickets->id )}}"
                                                        method="POST" style="margin-block-end:-1em !important;">
                                                        {{ csrf_field() }}
                                                        {{ method_field('PUT') }}
                                                        <input type="hidden" name="promocion" value="si">
                                                        <h4>Agregar a Lista de Promoción </h4>
                                                        <div class="form-group">
                                                            <label for="exampleFormControlTextarea1">Descripción Promoción</label>
                                                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="5" name="descripcion_promocion"></textarea>
                                                        </div>
                                                        <div class="row" style="display: block;">
                                                            <div class="modal-footer">
                                                                <button type="submit" class="btn btn-primary" style="width: 100% !important;">
                                                                    <i class="fa fa-star"></i>&nbsp; Añadir Promoción</button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div> --}}
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
            </div>
            <div style="text-align: center;">
                {{ $ticket->links() }}
            </div>
        </div>
    </div>
</div>

@endsection