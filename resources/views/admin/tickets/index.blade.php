@extends('admin.layouts.admin')

@section('content')
<div class="row"><br>
    <div class="col-xs-5">
        <div>
            <a href="{{ route('admin.tickets.create') }}" type="button btn btn-primary" style="color: black">
                <button class="btn btn-primary"> <i class="fa fa-ticket" aria-hidden="true"></i> Crear
                    Ticket</button></a>
        </div>
    </div>
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
@endsection