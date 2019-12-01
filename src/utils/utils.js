const BASE_URL = 'https://api.douban.com'
export default function request (options) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: BASE_URL + options.url, // 开发者服务器接口地址",
      data: options.data,
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      // 请求的参数",
      success: res => {
        resolve(res)
      },
      fail: res => {
        reject(res)
      }
    })
  })
}
