@extends('auth.layouts.auth')

@section('body_class','login')

@section('content')
<div class="content" style="height: 100%;">
    <div class="row" style="height: 100%; margin: 0;">
        <div class="col-md-6 right" style="height: 100%;">
            <div style="height: 90%;">
                <div class="login_wrapper" style="height: 100%; position: relative;">
                    <div class="animate form login_form" style="position: absolute; top: 13%;">
                        <section class="login_content login_content-login">
                            <a href="/"><img src="../assets/images/icon.png" alt="logo" width="100px"></a><br>
                            @if(config('auth.users.registration'))
                                <div>
                                    <div class="clearfix"></div>
                                    <br/>
                                    <div><div class="h1">{{ config('app.name') }}</div></div>
                                </div>
                            @endif

                            {{ Form::open(['route' => 'login']) }}
                                <h1>{{ __('views.auth.login.header') }}</h1>
                                <div>
                                    <input id="email" type="email" class="form-control" name="email" value="{{ old('email') }}"
                                           placeholder="{{ __('views.auth.login.input_0') }}" required autofocus>
                                </div>
                                <div>
                                    <input id="password" type="password" class="form-control" name="password"
                                           placeholder="{{ __('views.auth.login.input_1') }}" required>
                                </div>
                                <div class="checkbox al_left">
                                    <label>
                                        <input type="checkbox"
                                               name="remember" {{ old('remember') ? 'checked' : '' }}> {{ __('views.auth.login.input_2') }}
                                    </label>
                                </div>

                                @if (session('status'))
                                    <div class="alert alert-success">
                                        {{ session('status') }}
                                    </div>
                                @endif

                                @if (!$errors->isEmpty())
                                    <div class="alert alert-danger" role="alert">
                                        {!! $errors->first() !!}
                                    </div>
                                @endif

                                {{-- {!! htmlFormSnippet([
                                    "theme" => "light",
                                    "size" => "normal",
                                    "tabindex" => "4",
                                    "callback" => "callbackFunction",
                                    "expired-callback" => "expiredCallbackFunction",
                                    "error-callback" => "errorCallbackFunction",
                                ]) !!} --}}

                                <div>
                                    <button class="btn btn-default submit" type="submit">{{ __('views.auth.login.action_0') }}</button>
                                    <a class="reset_pass" href="{{ route('password.request') }}">
                                        {{ __('views.auth.login.action_1') }}
                                    </a>
                                </div>

                                <div class="clearfix"></div>
                                {{-- <div class="separator">
                                    <span>{{ __('views.auth.login.message_0') }}</span>
                                    <div>
                                        <a href="{{ route('social.redirect', ['facebook']) }}" class="btn btn-success btn-facebook">
                                            <i class="fa fa-facebook"></i>
                                            Facebook
                                        </a>
                                        <a href="{{ route('social.redirect', ['twitter']) }}" class="btn btn-success btn-twitter">
                                            <i class="fa fa-twitter"></i>
                                            Twitter
                                        </a>
                                    </div>
                                </div> --}}
                                @if(config('auth.users.registration'))
                                    <div class="separator">
                                        <p class="change_link">{{ __('views.auth.login.message_1') }}
                                            <a href="{{ route('register') }}" class="to_register"> {{ __('views.auth.login.action_2') }} </a>
                                        </p>
                                        <div class="clearfix"></div>
                                        <br/>
                                        <div>
                                            <p>&copy; {{ date('Y') }} {{ config('app.name') }}. {{ __('views.auth.login.copyright') }}</p>
                                        </div>
                                    </div>
                                @endif
                                {{-- @if(config('auth.users.registration'))
                                    <div class="separator">
                                        <p class="change_link">{{ __('views.auth.login.message_1') }}
                                            <a href="{{ route('register') }}" class="to_register"> {{ __('views.auth.login.action_2') }} </a>
                                        </p>

                                        <div class="clearfix"></div>
                                        <br/>

                                        <div>
                                            <div class="h1">{{ config('app.name') }}</div>
                                            <p>&copy; {{ date('Y') }} {{ config('app.name') }}. {{ __('views.auth.login.copyright') }}</p>
                                        </div>
                                    </div>
                                @endif --}}
                            {{ Form::close() }}
                        </section>
                    </div>
                </div>
            </div>
        </div>
        {{-- <img src="../assets/images/icon.png" alt="logo" width="90px"> --}}
        <div class="col-md-6" id="bg-cover-login" style="height: 100%;">
            <div class="bgImgCoverPages"></div>
        </div>
    </div>
</div>

<style>
    .login{
        background: #093070 !important;
    }
    #bg-cover-login{
        background: url(assets/images/bg.jpg);
        background-repeat: no-repeat;
        background-position: center center;
        background-size: cover;
        padding: 0;
        /* box-shadow: 5px -5px 5px 0px #FFCB00; */
    }
    a{
        color: white;
    }
    .bgImgCoverPages{
        width: 100%;
        height: 100%;
        position: relative;
        background: rgb(2,0,36);
        background: linear-gradient(0deg, rgba(2,0,36,0.039653361344537785) 2%, rgba(9,48,112,0.37298669467787116) 82%);
    }
    .right{
        color: white;
        text-shadow: 0 1px 0 rgb(9 45 116) !important;
        background: rgb(252,218,1);
        background: linear-gradient(177deg, rgba(252,218,1,1) 0%, rgba(130,131,59,1) 50%, rgba(9,45,116,1) 100%);
    }
    .login_content-login{
        margin: 0 auto;
        padding: 25px 0 0;
        position: relative;
        text-align: center;
        text-shadow: 0 1px 0 rgba(9,45,116,1) !important;
        min-width: 280px;
    }
</style>
@endsection

