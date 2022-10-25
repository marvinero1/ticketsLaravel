<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tickets extends Model
{
    use HasFactory;
    protected $auditTimestamps = true;
    protected $auditStrict = true;
    protected $auditThreshold = 100;

    protected $auditEvents = [
        'created',
        'saved',
        'deleted',
        'restored',
        'updated'
    ];
    
    protected $fillable = [ 'dept_id',
                            'staff_id',
                            'helptopic',
                            'staff_id',
                            'subject',
                            'nroid_nr',
                            'priority_id',
                            'file',
                            'mensaje',
                            'estado',];
}
