<?php

namespace App\Http\Controllers\Admin;

use App\Models\Tickets;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use DB;
use File;
use Session;

class TicketsController extends Controller{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request){

       
        $ticket = Tickets::latest()->orderBy('created_at')->paginate(30);

        return view('admin.tickets.index', ['ticket'=>$ticket]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(){
        $dpto = \DB::table('pertec_department') ->orderBy('dept_name', 'asc')->get();
        $servicio = \DB::table('pertec_help_topic') ->orderBy('topic_id', 'asc')->get();
        $user = \DB::table('pertec_staff') ->orderBy('lastname', 'desc')->get();
        
        return view('admin.tickets.create', ['dpto' => $dpto, 'servicio'=>$servicio, 'user'=>$user]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request){
        $requestData = $request->all();

        $validator = Validator::make($requestData, [
            'dept_id' => 'required|max:191',
            'staff_id' => 'required|max:191',
            'helptopic' => 'required|max:191',
            'staff_id' => 'required|max:191',
            'subject' => 'required|max:191',    
            'nroid_nr' => 'required|max:191',
            'priority_id' => 'required|max:10500',
            'file' => 'nullable',
            'mensaje' => 'nullable',
            'estado' => 'nullable',
        ]); 

        DB::beginTransaction();

        if ($validator->fails()){
            return redirect('admin/tickets/create')
                        ->withErrors($validator)
                        ->withInput();
        }else{
            if($request->imagen){
                $data = $request->imagen;
                $file = file_get_contents($request->imagen);
                $info = $data->getClientOriginalExtension();
                $extension = explode('archivos/tickets', mime_content_type('archivos/tickets'))[0];
                $image = File::make($file);
                $fileName = rand(0,10)."-".date('his')."-".rand(0,10).".".$info;
                $path  = 'archivos/tickets';
                if (!file_exists($path)) {
                    mkdir($path, 0777, true);
                }
                $img = $path.'/'.$fileName;
                if($image->save($img)){
                    $requestData['file'] = $img;
                    $mensaje = "Ticket's Registrado Correctamente";
                }else{
                    $mensaje = "Error al guardar la imagen";
                }
            }

            $ticket = Tickets::create($requestData);

            if($ticket){
                DB::commit();
            }else{
                DB::rollback();
            }
        }

        Session::flash('message','Ticket Creado Exisitosamente!');
        return redirect()->route('admin.tickets.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\cr  $cr
     * @return \Illuminate\Http\Response
     */
    public function show(Tickets $cr){
        
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\cr  $cr
     * @return \Illuminate\Http\Response
     */
    public function edit(Tickets $cr){
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\cr  $cr
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Tickets $cr){
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\cr  $cr
     * @return \Illuminate\Http\Response
     */
    public function destroy(Tickets $cr){
        //
    }
}
