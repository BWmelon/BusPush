package com.bwmelon.buspush;

import com.bwmelon.buspush.slice.PageAbilityPermissionSlice;
import ohos.aafwk.ability.Ability;
import ohos.aafwk.content.Intent;
import ohos.bundle.IBundleManager;
import ohos.security.SystemPermission;
import ohos.utils.zson.ZSONObject;
import java.util.HashMap;
import java.util.Map;

public class PageAbilityPermission extends Ability {

    final int MY_PERMISSIONS_REQUEST_LOCATION = 999;

    @Override
    public void onStart(Intent intent) {
        super.onStart(intent);
        super.setMainRoute(PageAbilityPermissionSlice.class.getName());
        // 在新的Ability中设置要返回的结果
        Intent resultIntent = new Intent();



        if (canRequestPermission(SystemPermission.LOCATION)) {
            // 可以发起申请授权弹窗
            requestPermissionsFromUser(
                    new String[] { "ohos.permission.LOCATION" } , MY_PERMISSIONS_REQUEST_LOCATION);
        } else {
            // 结束该Ability并返回结果
            Map<String, Object> result = new HashMap<String, Object>();
            result.put("resultValue", 2); // 无法弹窗
            result.put("resultMsg", "无法发起授权弹窗，请在设置中开启定位权限");
            resultIntent.setParam("result", ZSONObject.toZSONString(result));
            setResult(0, resultIntent);
            terminateAbility();
        }
    }

    @Override
    public void onRequestPermissionsFromUserResult (int requestCode, String[] permissions, int[] grantResults) {
        Intent resultIntent = new Intent();
        switch (requestCode) {
            case MY_PERMISSIONS_REQUEST_LOCATION:
                // 匹配requestPermissions的requestCode
                Map<String, Object> result = new HashMap<String, Object>();
                if (grantResults.length > 0 && grantResults[0] == IBundleManager.PERMISSION_GRANTED) {
                    // 权限被授予
                    // 注意：因时间差导致接口权限检查时有无权限，所以对那些因无权限而抛异常的接口进行异常捕获处理
                    // 结束该Ability并返回结果
                    result.put("resultValue", 0); // 已授权
                    result.put("resultMsg", "授权成功");

                } else {
                    // 权限被拒绝
                    // 结束该Ability并返回结果
                    result.put("resultValue", 1); // 已拒绝
                    result.put("resultMsg", "用户已拒绝");
                }
                resultIntent.setParam("result", ZSONObject.toZSONString(result));
                setResult(0, resultIntent);
                terminateAbility();
            break;
        }
    }
}
