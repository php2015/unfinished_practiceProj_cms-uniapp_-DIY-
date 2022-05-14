<?php
namespace app\controller;

use app\BaseController;
use app\model\One;
use app\model\Sortable;
use app\model\SystemConfig;
use app\model\Two;
use app\Request;
use think\Exception;
use think\exception\ErrorException;
use think\facade\Db;

class Index extends BaseController
{
    public function index()
    {

        $dat = new Obj('sort-1');

        $sort = array();
        $sort[0]['sorts'] = 3;
        $sort[0]['disable'] = false;
        $sort[0]['child_id'] = 'sort-2';
        $sort[0]['child'][0]['sorts'] = 3;
        $sort[0]['child'][0]['disable'] = false;
        $sort[0]['child'][1]['sorts'] = 2;
        $sort[0]['child'][1]['disable'] = false;
        $sort[0]['child'][2]['sorts'] = 1;
        $sort[0]['child'][2]['disable'] = false;
        $sort[0]['child'][3]['sorts'] = 4;
        $sort[0]['child'][3]['disable'] = false;
        $sort[0]['child'][4]['sorts'] = 5;
        $sort[0]['child'][4]['disable'] = false;
        $sort[0]['child'][5]['sorts'] = 6;
        $sort[0]['child'][5]['disable'] = false;

        $sort[1]['sorts'] = 1;
        $sort[1]['disable'] = false;
        $sort[1]['child_id'] = '';
        $sort[1]['child'] = [];

        $sort[2]['sort'] = 2;
        $sort[2]['disable'] = false;
        $sort[2]['child_id'] = '';
        $sort[2]['child'] = [];

        $dat->child = $sort;
//        dump($sort);

        return json($dat);
    }


//    保存数据
    public function setData()
    {
        $dat = input('post.');
        Sortable::create([
            'path'      =>  $dat['path'],
            'name'      =>  $dat['name'],
            'sortable'  =>  $dat['sortable'],
        ]);
        return json($dat);
    }

//    获取数据
    public function getData()
    {
        $prame = input('get.');
        if(count($prame) > 0) {
            $dat = Sortable::find($prame['id']);
        }
        else {
            $dat = Sortable::select();
        }

        return json($dat);
    }
//    更新数据
    public function updateData()
    {
        $dat = input('post.');

        if(array_key_exists('path', $dat) && array_key_exists('name', $dat)) {
            $condition = [
                'id'    =>  $dat['id'],
                'path'  =>  $dat['path'],
                'name'  =>  $dat['name'],
                'sortable'  =>  $dat['sortable']
            ];
        }
        else {
            $condition = [
                'id'    =>  $dat['id'],
                'sortable'  =>  $dat['sortable']
            ];
        }

        Sortable::update($condition);
        return json(1);
    }
//    设置页面信息
    public function setPage()
    {
        $dat = input('post.');

        $condition = [
            'id'    =>  $dat['id'],
            'page_name' =>  $dat['page_name'],
            'page_background_color' =>  $dat['page_background_color']
        ];
        try {
            Sortable::update($condition);
            return json(1);
        } catch (\Exception $e) {
            return json($e);
        }
    }

//    设置主题
    public function setTheme()
    {
        $dat = input('post.');
        //这里自行修改即可，仅演示
        try {
            SystemConfig::where('id',1)->update(['page_theme'=>"#ffffff"]);
            return json(['status'=>200,'data'=>[]]);
        } catch (\Exception $e) {
            return json($e);
        }
    }

 //    获取主题
    public function getTheme()
    {
        $dat = SystemConfig::select();
        return json($dat);
    }
}

class Obj {
    var $id;
    var $child;
    var $disable;

    public function __construct($id = '', $child = [], $disable = false)
    {
        $this->id = $id;
        $this->child = $child;
        $this->disable = $disable;
    }
}
