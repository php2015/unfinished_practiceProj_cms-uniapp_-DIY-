<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006~2018 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: liu21st <liu21st@gmail.com>
// +----------------------------------------------------------------------
use think\facade\Route;

Route::get('', function () {
    echo 'DIY拖拽'.VAE_VERSION;
});

//系统安装
Route::group('install', function () {
    Route::get('', 'install.Index/step1');
    Route::get('step2', 'install.Index/step2');
    Route::get('step3', 'install.Index/step3');
    Route::post('create_data', 'install.Index/createData');
});

Route::get('/', 'Index/index');
Route::get('selectAll', 'Index/selectAll');
Route::get('getTwo', 'Index/getTwoAll');
Route::get('getOne', 'Index/getOneAll');
Route::get('getOneCount', 'Index/getOneCount');
Route::get('cms/login', 'Index/login');



// sortable
Route::post('set_data', 'Index/setData');
Route::get('get_data', 'Index/getData');
Route::post('update_data', 'Index/updateData');
Route::post('set_page', 'Index/setPage');
Route::post('set_theme', 'Index/setTheme');
Route::get('get_theme', 'Index/getTheme');