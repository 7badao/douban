<template>
  <div>
    <!-- 头部 -->
    <div class="header">
      <span class="headerText">豆瓣</span>
      <icon class="iconSearch" type="search" size="15" color="#42bd56" />
      <button class="AppBtn">打开豆瓣App</button>
    </div>
    <!-- 更多部分 -->
    <div class="moreBox">
      <span>影院热映</span>
      <span class="moreText">更多</span>
    </div>
    <!-- 影片展示区域 -->
    <scroll-view class="scroll-view_H" scroll-x="true" style="width: 100%">
      <view class="scroll-view-item_H" v-for="item in moveList" :key="item.id">
        <img :src="item.images.large" alt />
        <p class="moveName">{{item.title}}</p>
        <!-- 评分星星 -->
        <div class="score">
          <div class="imgBox" v-if="item.rating.average">
            <img
              class="scoreStar"
              v-for="(item2,index2) in 5"
              :key="index2"
              src="../../../static/images/star.svg"
              alt
            />
          </div>
          <span class="commentScore">{{item.rating.average?item.rating.average:'暂无评分'}}</span>
        </div>
      </view>
    </scroll-view>
  </div>
</template>

<script>
export default {
  data () {
    return {
      moveList: []
    }
  },
  methods: {
    getMoveList () {
      wx.request({
        url: 'https://api.douban.com/v2/movie/in_theaters', // 开发者服务器接口地址",
        data: {
          apikey: '0df993c66c0c636e29ecbb5344252a4a'
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        // 请求的参数",
        success: res => {
          console.log(res)
          // 将返回的数据添加到数组
          this.moveList = res.data.subjects
        }
      })
    }
  },
  created () {
    this.getMoveList()
  }
}
</script>

<style lang="less">
.header {
  display: flex;
  color: #42bd56;
  padding: 0 36rpx;
  height: 94rpx;
  align-items: center;
  border-bottom: 1px solid #eee;
  .headerText {
    font-size: 50rpx;
  }
  .iconSearch {
    flex: 1;
    margin-left: 28px;
  }
  .AppBtn {
    width: 200rpx;
    height: 58rpx;
    background-color: #42bd56;
    font-size: 30rpx;
    color: white;
    line-height: 58rpx;
  }
}
.moreBox {
  display: flex;
  justify-content: space-between;
  height: 87rpx;
  line-height: 87rpx;
  margin: 28rpx 0;
  font-size: 40rpx;
  padding: 0 36rpx;
  .moreText {
    color: #42bd56;
  }
}
.scroll-view_H {
  padding: 0 20rpx;
  width: 200rpx;
  white-space: nowrap;
  .scroll-view-item_H {
    width: 200rpx;
    display: inline-block;
    margin-left: 18rpx;
    img {
      width: 200rpx;
      height: 286rpx;
    }
    .moveName {
      word-break: keep-all;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: center;
    }
    .score {
      display: flex;
      justify-content: center;
      align-items: center;
      .scoreStar {
        width: 20rpx;
        height: 20rpx;
      }
      .commentScore {
        color: #aaa;
        margin-left: 6rpx;
      }
    }
  }
}
</style>