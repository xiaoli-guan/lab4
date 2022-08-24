// pages/detail/detail.js
var common = require('../../utils/common.js') //引用公共JS文件
Page({

  /**
   * 页面的初始数据
   */
  data: {
    article:{}
  },

  /**
   * 
   * 自定义函数--跳转新页面浏览新闻内容
   */
  goToDetail:function(e){
    //获取携带的data-id数据
    let id = e.currentTarget.dataset.id;
    //携带新闻的ID进行页面的跳转
    wx.navigateTo({
      url: '../detail/detail?id='+id
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //获取页面跳转来时携带的数据
    let id = options.id

    //检查当前新闻是否在收藏夹中
    var article = wx.getStorageSync(id)
    //已存在
    if(article != ''){
      this.setData({
        article:article,
        isAdd:true
      })
    }
    //不存在
    else{
      let result = common.getNewsDetail(id)
      //获取到新闻内容
      if(result.code == "200"){
        this.setData({
          article:result.news,
          isAdd:false
        })
      }
    }
  },

  /**
   * 添加到收藏夹
   */
  addFavorites:function(options){
    let article = this.data.article;
    wx.setStorageSync(article.id,article);
    this.setData({isAdd:true});
  },
  //取消收藏
  cancelFavorites:function()
  {
    let article = this.data.article;
    wx.removeStorageSync('article.id');
    this.setData({isAdd:false});
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})