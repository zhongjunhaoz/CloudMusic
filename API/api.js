const API_BASE_URL = 'http://neteasecloudmusicapi.zhaoboy.com';
const request = (url, data) => { 
  let _url = API_BASE_URL  + url;
  return new Promise((resolve, reject) => {
    wx.request({
      url: _url,
      method: "get",
      data: data,
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success(request) {
        resolve(request.data)
      },
      fail(error) {
        reject(error)
      }
    })
  });
}
module.exports ={
  gethotsongs:(data) =>{
    return request('/search/hot',data)
  },
  searchSuggest:(data)=>{
    return request('/search/suggest',data)
  },
  searchResult:(data)=>{
    return request('/search',data)
  },
  getBanner:(data)=>{
    return request('/banner',data)
  },
  getsongsheet:(data)=>{
    return request('/top/playlist',data)
  },
  getNewSong:(data)=>{
    return request('/personalized/newsong',data)
  }
}