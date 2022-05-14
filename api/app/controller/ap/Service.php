<?php


namespace app\controller\ap;


use app\BaseController;
use app\model\One;

class Service extends BaseController
{
    public function logEff()
    {
        $res = One::select();
        dump($res->toArray());
    }
}