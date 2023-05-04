package com.bwmelon.buspush;
// ohos相关接口包
import ohos.bundle.IBundleManager;
import ohos.event.notification.NotificationRequest;
import ohos.location.LocatorCallback;
import ohos.location.Locator;
import ohos.location.Location;
import ohos.location.RequestParam;
import ohos.aafwk.ability.Ability;
import ohos.aafwk.content.Intent;
import ohos.hiviewdfx.HiLog;
import ohos.hiviewdfx.HiLogLabel;
import ohos.rpc.IRemoteBroker;
import ohos.rpc.IRemoteObject;
import ohos.rpc.RemoteObject;
import ohos.rpc.MessageParcel;
import ohos.rpc.MessageOption;
import ohos.utils.zson.ZSONObject;

import java.util.HashMap;
import java.util.Map;

public class ServiceAbility extends Ability {
    // 定义日志标签
    private static final HiLogLabel LABEL = new HiLogLabel(HiLog.LOG_APP, 0, "MY_TAG");

    private MyRemote remote = new MyRemote();
    RequestParam requestParam = new RequestParam(RequestParam.PRIORITY_ACCURACY, 0, 0);


    public static final int MY_PERMISSIONS_REQUEST_LOCATION = 999;

    String resultMsg = "resultMsg";
    Boolean resultValue = false;

    @Override
    public void onStart(Intent intent) {
        super.onStart(intent);
    }


// java pa打开java fa
//    private void openNewPageAbility() {
//        Intent intent = new Intent();
//        Operation operation = new Intent.OperationBuilder()
//                .withDeviceId("")
//                .withBundleName("com.bwmelon.buspush")
//                .withAbilityName("com.bwmelon.buspush.PageAbilityPermission")
//                .build();
//        intent.setOperation(operation);
//        startAbility(intent);
//    }

// startAbilityForResult回调
//    @Override
//    protected void onAbilityResult(int requestCode, int resultCode, Intent resultData) {
//        if (requestCode == 100) {
//            if (resultCode == AbilitySlice.RESULT_OK) {
//                // Permission granted, do something
//            } else {
//                // Permission denied, do something else or terminate ability
//            }
//            resultMsg = "测试";
//        }
//        new ToastDialog(getContext()).setText("'测试'").show();
//    }

    // FA在请求PA服务时会调用Ability.connectAbility连接PA，连接成功后，需要在onConnect返回一个remote对象，供FA向PA发送消息
    @Override
    protected IRemoteObject onConnect(Intent intent) {
        super.onConnect(intent);
        return remote.asObject();
    }
    class MyRemote extends RemoteObject implements IRemoteBroker {
        private static final int SUCCESS = 0;
        private static final int ERROR = 1;
        private static final int CHECK = 1000; // 验证授权
        private static final int START = 1001; // 定位开始
        private static final int STOP = 1002; // 定位结束

        MyRemote() {
            super("MyService_MyRemote");
        }

        Locator locator = new Locator(ServiceAbility.this);

        public  class MyLocatorCallback implements LocatorCallback {
            public void onLocationReport(Location location) {
                resultMsg = "onLocationReport";
            }

            public void onStatusChanged(int type) {
                resultMsg = "onStatusChanged";
            }

            public void onErrorReport(int type) {
                resultMsg = "onErrorReport";
            }
        }



        @Override
        public boolean onRemoteRequest(int code, MessageParcel data, MessageParcel reply, MessageOption option) {
            // --------------------
            MyRemote.MyLocatorCallback locatorCallback = new MyRemote.MyLocatorCallback();

            // 创建通知，其中1005为notificationId
            NotificationRequest request = new NotificationRequest(1005);
            NotificationRequest.NotificationNormalContent content = new NotificationRequest.NotificationNormalContent();
            // --------------------

            switch (code) {
                case CHECK: {
                    if (verifySelfPermission("ohos.permission.LOCATION") != IBundleManager.PERMISSION_GRANTED) {
                        resultValue = false;
                        resultMsg = "位置信息未授权";
                    } else  {
                        resultValue = true;
                        resultMsg = "位置信息已授权";
                    }
                    // 返回结果当前仅支持String，对于复杂结构可以序列化为ZSON字符串上报
                    Map<String, Object> result = new HashMap<String, Object>();
                    result.put("code", SUCCESS);
                    result.put("resultValue", resultValue);
                    result.put("resultMsg", resultMsg);
                    reply.writeString(ZSONObject.toZSONString(result));
                    break;
                }
                case START: {
                    locator.startLocating(requestParam, locatorCallback);

//                    content.setTitle("提示").setText("后台运行中");
//                    request.setContent(notificationContent);

                    // 绑定通知，1005为创建通知时传入的notificationId
                    keepBackgroundRunning(1005, request);
                    resultMsg = "开始定位";
                    resultValue = true;

                    // ------------------------------------

                    // 返回结果当前仅支持String，对于复杂结构可以序列化为ZSON字符串上报
                    Map<String, Object> result = new HashMap<String, Object>();
                    result.put("code", SUCCESS);
                    result.put("resultMsg", resultMsg);
                    result.put("resultValue", resultValue);
                    reply.writeString(ZSONObject.toZSONString(result));
                    break;
                }
                case STOP: {
                    locator.stopLocating(locatorCallback);
                    cancelBackgroundRunning();
                    resultMsg = "结束定位";
                    resultValue = true;

                    // 返回结果当前仅支持String，对于复杂结构可以序列化为ZSON字符串上报
                    Map<String, Object> result = new HashMap<String, Object>();
                    result.put("code", SUCCESS);
                    result.put("resultMsg", resultMsg);
                    result.put("resultValue", resultValue);
                    reply.writeString(ZSONObject.toZSONString(result));
                    break;
                }
                default: {
                    Map<String, Object> result = new HashMap<String, Object>();
                    result.put("abilityError", ERROR);
                    reply.writeString(ZSONObject.toZSONString(result));
                    return false;
                }
            }
            return true;
        }

        @Override
        public IRemoteObject asObject() {
            return this;
        }
    }
}