<template>
  <view class="cart-container" v-if="cart.length !== 0">
    <!-- 收货地址组件 -->
    <my-address></my-address>
    
    
    
    <!-- 购物车商品列表的标题区域 -->
    <view class="cart-title">
      <!-- 左侧的图标 -->
      <uni-icons type="shop" size="18"></uni-icons>
      <!-- 描述文本 -->
      <text class="cart-title-text">购物车</text>
    </view>
    
    
    <!-- 商品列表区域 -->
    
    <uni-swipe-action>
      <block v-for="(goods, i) in cart" :key="i">
        <uni-swipe-action-item :right-options="options" @click="swipeItemClickHandler(goods)">
          <my-goods :goods="goods" :show-radio="true" :show-num='true' @radio-change="radioChangHandler" @num-change="numberChangeHandler"></my-goods>
        </uni-swipe-action-item>
      </block>
    </uni-swipe-action>
    
    <my-settle></my-settle>
  </view>
  <!-- 空白购物车区域 -->
  <view class="empty-cart" v-else>
    <image src="/static/cart_empty@2x.png" class="empty-img"></image>
    <text class="tip-text">空空如也~</text>
  </view>
</template>

<script>
  import badgeMix from '@/mixins/tabbar-badge.js'
  import { mapState ,mapMutations} from 'vuex'
  export default {
    mixins: [badgeMix],
    computed: {
        // 将 m_cart 模块中的 cart 数组映射到当前页面中使用
        ...mapState('m_cart', ['cart']),
      },
    watch:{
      total(){
        this.setBadge()
        },
    },
    data() {
      return {
        options:[{
          text: '删除',
          style: {
            backgroundColor: '#C00000'
          }
        }]
      };
    },
    methods:{
      ...mapMutations('m_cart',['updateGoodsState','updateGoodsCount','removeGoodsById']),
      radioChangHandler(e){
        // console.log(e)
        this.updateGoodsState(e)
        // console.log(e)
      },
      numberChangeHandler(e){
        this.updateGoodsCount(e)
      },
      swipeItemClickHandler(goods){
        this.removeGoodsById(goods.goods_id)
      },
    }
  }
</script>

<style lang="scss">
.cart-title {
  height: 40px;
  display: flex;
  align-items: center;
  font-size: 14px;
  padding-left: 5px;
  border-bottom: 1px solid #efefef;
  .cart-title-text {
    margin-left: 10px;
  }
}
.cart-container {
  padding-bottom: 50px;
}
.empty-cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 150px;

  .empty-img {
    width: 90px;
    height: 90px;
  }

  .tip-text {
    font-size: 12px;
    color: gray;
    margin-top: 15px;
  }
}
</style>
