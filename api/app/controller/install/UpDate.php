<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2019/12/9 0009
 * Time: 10:10
 */

namespace app\controller\install;


use ruhua\bases\BaseCommon;
use ruhua\bases\BaseController;
use ruhua\exceptions\BaseException;
use think\facade\Log;
use think\facade\Request;

class UpDate extends BaseController
{

    /**
     * 获取更新包
     * @return mixed
     */
    public function getRhFile(){
        $domain=Request::domain();

        $res= (new BaseCommon())->curl_post(VERSION_URL.'project/user/down_rh',['domain'=>$domain]);
        if(!$res){
            return app('json')->fail();
        }
        $res=json_decode($res,true);

        if($res['result_code']=='fail'){
            return app('json')->fail($res['err_code_des']);
        }
        if($res['result_code']=='success'){
            return app('json')->success($res);
        }
    }

    /**
     * 获取版本号
     * @return mixed
     */
    public function getVersion(){
        $res= (new BaseCommon())->curl_post(VERSION_URL.'project/user/get_version',
            ['domain'=>Request::domain()]);
        if(!$res){
            return app('json')->fail();
        }
        $res=json_decode($res,true);
        if($res['result_code']=='fail'){
            return app('json')->fail($res['err_code_des']);
        }
        if($res['result_code']=='success'){
            $res['now']=VAE_VERSION;
            return app('json')->success($res);
        }
    }



    /**
     * 获取多版本号
     * @return mixed
     */
    public function getVersionMore(){
        $domain=Request::domain();
        Log::error($domain);
        $res= (new BaseCommon())->curl_post(VERSION_URL.'project/user/get_versionMore',
            ['domain'=>$domain]);
        if(!$res) {
            return app('json')->fail();
        }

        $res=json_decode($res,true);
        Log::error($res);
        if($res!=null&&!isset($res['result_code']))
            foreach ($res as $k=>$v){
                $v['now_version']=VAE_VERSION;
                $res[$k]=$v;
            }
        else{
            throw new BaseException(['msg'=>$res['err_code_des']]);
        }

        return app('json')->go($res);
    }

    /**
     * 获取
     * @return mixed
     */
    public function getResource(){
        $res= (new BaseCommon())->curl_post(VERSION_URL.'project/user/get_resource',['domain'=>Request::domain()]);
        if(!$res){
            return app('json')->fail();
        }
        $res=json_decode($res,true);
        if($res['result_code']=='fail'){
            return app('json')->fail($res['err_code_des']);
        }
        if($res['result_code']=='success'){
            return app('json')->success($res);
        }
    }

    /**
     * 获取多版本url
     * @return mixed
     */
    public function getResourceMore($id){

        $res= (new BaseCommon())->curl_post(VERSION_URL."project/user/get_resourceMore",['domain'=>Request::domain(),'id'=>$id]);
        if(!$res){
            return app('json')->fail();
        }
        $res=json_decode($res,true);

        if(isset($res['error_code'])){
            throw new BaseException(['msg'=>$res['msg']]);
        }else{
            return app('json')->go($res);
        }
    }

}