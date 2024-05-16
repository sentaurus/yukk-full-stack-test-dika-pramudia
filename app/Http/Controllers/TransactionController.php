<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Inertia\Inertia;

class TransactionController extends Controller
{
    public function index()
    {
        return Inertia::render('Transactions/Index');
    }

    public function store(Request $request)
    {
        $request->validate([
            'type' => 'required|in:topup,transaction',
            'amount' => 'required|numeric',
            'description' => 'nullable|string',
            'proof' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $proofPath = $request->file('proof') ? $request->file('proof')->store('proofs', 'public') : null;

        $transaction = Transaction::create([
            'user_id' => Auth::id(),
            'type' => $request->type,
            'amount' => $request->amount,
            'description' => $request->description,
            'proof' => $proofPath,
            'transaction_code' => Str::uuid(),
        ]);

        if ($request->type == 'topup') {
            User::where('id', Auth::id())->increment('balance', $request->amount);
        } else {
            User::where('id', Auth::id())->decrement('balance', $request->amount);
        }

        return redirect()->back()->with('success', 'Transaction completed successfully!');
    }
}
