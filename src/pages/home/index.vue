<template>
  <div>
    <!-- 头部 -->
    <div class="header">
      <span class="headerText">豆瓣</span>
      <icon class="iconSearch" type="search" size="15" color="#42bd56" />
      <button class="AppBtn">打开豆瓣App</button>
    </div>
    <!-- 影院热映部分 -->
    <div v-if="cateMoveList[0].list.length&&cateMoveList[1].list.length">
      <div v-for="(cate,i) in cateMoveList" :key="i">
        <div class="moreBox">
          <span>{{cate.name}}</span>
          <!-- 给更多按钮添加点击事件 -->
          <span class="moreText" @click="tomore(cate.param)">更多</span>
        </div>
        <!-- 影片展示区域 -->
        <div>
          <scroll-view class="scroll-view_H" scroll-x="true" style="width: 100%">
            <view class="scroll-view-item_H" v-for="item in cate.list" :key="item.id">
              <img :src="item.images.large" alt />
              <p class="moveName">{{item.title}}</p>
              <!-- 评分星星 -->
              <div class="score">
                <div class="imgBox" v-if="item.rating.average">
                  <img
                    class="scoreStar"
                    v-for="(item2,index2) in item.starNum"
                    :key="index2"
                    src="../../../static/images/star.svg"
                    alt
                  />
                  <img
                    class="scoreStar"
                    v-for="(item2,index2) in 5- item.starNum"
                    :key="index2"
                    src="../../../static/images/unstar.svg"
                    alt
                  />
                </div>
                <span class="commentScore">{{item.rating.average?item.rating.average:'暂无评分'}}</span>
              </div>
            </view>
          </scroll-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      cateMoveList: [
        {
          name: '影院热映',
          param: 'in_theaters',
          list: []
        },
        {
          name: '豆瓣电影top250',
          param: 'top250',
          list: []
        }
      ]
    }
  },
  methods: {
    getMoveList (cate) {
      wx.request({
        url: `https://api.douban.com/v2/movie/${cate.param}`, // 开发者服务器接口地址",
        data: {
          apikey: '0df993c66c0c636e29ecbb5344252a4a'
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        // 请求的参数",
        success: res => {
          // console.log(res)
          let subjects = res.data.subjects
          subjects.forEach(v => {
            v.starNum = Math.ceil(v.rating.average / 2)
          })
          // 将返回的数据添加到数组
          cate.list = res.data.subjects
        }
      })
    },
    // 点击更多跳转页面
    tomore (param) {
      wx.navigateTo({ url: '/pages/more/main?param=' + param })
    }
  },
  created () {
    // 遍历数组判断是热映还是250
    this.cateMoveList.forEach(v => {
      this.getMoveList(v)
    })
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