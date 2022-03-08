const callContainer = (data) => {
  return wx.cloud.callContainer({
    config: {
      env: 'prod-8ggizqhy874c9b5a', // 微信云托管的环境ID
    },
    path: data.url, // 填入业务自定义路径和参数，根目录，就是 / 
    method: data.method, // 按照自己的业务开发，选择对应的方法
    header: {
      'X-WX-SERVICE': 'bus-push-api', // xxx中填入服务名称（微信云托管 - 服务管理 - 服务列表 - 服务名称）
      // 其他header参数
    }
    // 其余参数同 wx.request
  });
}

module.exports = callContainer