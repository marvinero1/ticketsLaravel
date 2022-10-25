<?php

namespace App\Http\Controllers\Admin;

use App\Models\Tickets;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class TicketsController extends Controller{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(){
        return view('admin.tickets.index');
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
