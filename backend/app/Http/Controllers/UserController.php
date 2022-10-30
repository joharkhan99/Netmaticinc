<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function login(Request $request)
    {
        $message = "";
        $stat = false;
        if (trim($request->email) == "") {
            $message = "Enter Email Field";
        } elseif ($request->password == "") {
            $message = "Fill Password Field";
        } else {

            $email = $request->email;
            $password = $request->password;

            $user = DB::table('users')->where('email', $email)->first();

            if ($user == null) {
                $message = "User doesn't exist";
            } elseif (!Hash::check($password, $user->password)) {
                $message =  "Invalid Password";
            } else {
                $message = "Login Successfull";
                $stat = true;
            }
        }
        return ['message' => $message, 'stat' => $stat];
    }


    public function signup(Request $request)
    {
        $message = "";
        $stat = false;
        if (trim($request->name) == "") {
            $message = "Enter Name Field";
        } elseif (trim($request->email) == "") {
            $message = "Enter Email Field";
        } elseif ($request->password == "" || $request->password2 == "") {
            $message = "Fill Password Fields";
        } elseif ($request->password != $request->password2) {
            $message = "Passwords do not match";
        } else {
            $name = $request->name;
            $email = $request->email;
            $password = Hash::make($request->password);
            DB::table('users')->insert([
                'name' =>   $name,
                'email' =>  $email,
                'password' => $password
            ]);
            $message = "Sign up Successfull";
            $stat = true;
        }
        return ['message' => $message, 'stat' => $stat];
    }
}
