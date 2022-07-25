<template>
  <view class="goods-item">
    <!-- 左侧的盒子 -->
    <view class="goods-item-left">
       <radio :checked="goods.goods_state" color="#C00000" v-if="showRadio" @click="radioClickHandler"></radio>
      <image :src="goods.goods_small_logo" class="goods-pic"></image>
    </view>
    <!-- 右侧的盒子 -->
    <view class="goods-item-right">
      <!-- 商品的名字 -->
      <view class="goods-name">{{goods.goods_name}}</view>
      <view class="goods-info-box">
        <view class="goods-price">￥{{goods.goods_price | tofixed}}</view>
        <uni-number-box :min="1" :value="goods.goods_count" v-if="showNum" @change="numChangeHandler"></uni-number-box>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name:"my-goods",
    props:{
      goods:{
        type: Object,
        default: {}
      },
      showRadio:{
        type:Boolean,
        default:false,
      },
      showNum:{
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        
      };
    },
    methods:{
      //这是radio组件的点击事件处理函数
      radioClickHandler(){
        this.$emit('radio-change',{
          goods_id: this.goods.goods_id,
          goods_state: !this.goods.goods_state
        })
      },
      // 监听到了NumberBox组件数量变化的事件
      numChangeHandler(val){
        // console.log(val)
        this.$emit('num-change',{
          goods_id: this.goods.goods_id,
          goods_count: +val
        })
      }
    },
    filters:{
      tofixed(num){
        return Number(num).toFixed(2)
      }
    }
  }
</script>

<style lang="scss">
.goods-item{
  width: 750rpx;
  box-sizing: border-box;
  display: flex;
  padding: 10px 5px;
  border-bottom: 1px solid #f0f0f0;
  
  .goods-item-left{
    margin-right: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    .goods-pic{
      width: 100px;
      height: 100px;
      display: block;
    }
  }
  .goods-item-right{
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
    .goods-name{
      font-size: 13px;
    }
    .goods-info-box{
      display: flex;
      align-items: center;
      justify-content: space-between;
      .goods-price{
        color: #C00000;
        font-size: 16px;
      }
    }
  }
}
</style>
