<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Transaction;

class BalanceController extends Controller
{
    public function index()
    {
        $transactions = Transaction::where('user_id', auth()->id())
            ->latest()
            ->paginate(10);

        $currentBalance = auth()->user()->balance;


        return Inertia::render('Balance/Index', [
            'transactions' => $transactions,
            'currentBalance' => $currentBalance
        ]);
    }
}
