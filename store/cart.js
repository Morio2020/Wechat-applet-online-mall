export default {
  namespaced :true,
  
  state: ()=>({
    // 购物车的数组，用来存储购物车中每个商品的信息对象
    // 每个商品的信息对象，都包含如下 6 个属性：
    // { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
    cart:JSON.parse(uni.getStorageSync('cart') || '[]')
  }),
  
  mutations:{
    addToCart(state, goods) {
          // 根据提交的商品的Id，查询购物车中是否存在这件商品
          // 如果不存在，则 findResult 为 undefined；否则，为查找到的商品信息对象
          const findResult = state.cart.find((x) => x.goods_id === goods.goods_id)

          if (!findResult) {
            // 如果购物车中没有这件商品，则直接 push
            state.cart.push(goods)
          } else {
            // 如果购物车中有这件商品，则只更新数量即可
            findResult.goods_count++
          }
          
          this.commit('m_cart/saveToStorage')
        },
    saveToStorage(state){
      uni.setStorageSync('cart',JSON.stringify(state.cart))
    },
    // 更新购物车中商品的勾选状态
    updateGoodsState(state,goods){
      const findResult = state.cart.find(x =>x.goods_id ===goods.goods_id)
      
      if (findResult){
        findResult.goods_state = goods.goods_state
        
        this.commit('m_cart/saveToStorage')
      }
    },
    //更新商品数量
    updateGoodsCount(state,goods){
      const findResult = state.cart.find(x =>x.goods_id ===goods.goods_id)
      if (findResult){
        findResult.goods_count = goods.goods_count
        
        this.commit('m_cart/saveToStorage')
      }
    },
    // 根据ID删除对应的商品
    removeGoodsById(state,goods_id){
      state.cart = state.cart.filter(x => x.goods_id !== goods_id)
      
      this.commit('m_cart/saveToStorage')
    },
    // 更新所有商品的勾选状态
    updateAllGoodsState(state, newState) {
      // 循环更新购物车中每件商品的勾选状态
      state.cart.forEach(x => x.goods_state = newState)
      // 持久化存储到本地
      this.commit('m_cart/saveToStorage')
    }
    
  },
  
  
  getters:{
    // 统计购物车中商品的总数量
       total(state) {
          let c = 0
          // 循环统计商品的数量，累加到变量 c 中
          state.cart.forEach(goods => c += goods.goods_count)
          return c
       },
       // 勾选的商品的总数量
       checkedCount(state) {
         // 先使用 filter 方法，从购物车中过滤器已勾选的商品
         // 再使用 reduce 方法，将已勾选的商品总数量进行累加
         // reduce() 的返回值就是已勾选的商品的总数量
         return state.cart.filter(x => x.goods_state).reduce((total, item) => total += item.goods_count, 0)
       },
       // 更新所有商品的勾选状态
       updateAllGoodsState(state, newState) {
         // 循环更新购物车中每件商品的勾选状态
         state.cart.forEach(x => x.goods_state = newState)
         // 持久化存储到本地
         this.commit('m_cart/saveToStorage')
       },
       // 已勾选的商品的总价
       checkedGoodsAmount(state) {
         // 先使用 filter 方法，从购物车中过滤器已勾选的商品
         // 再使用 reduce 方法，将已勾选的商品数量 * 单价之后，进行累加
         // reduce() 的返回值就是已勾选的商品的总价
         // 最后调用 toFixed(2) 方法，保留两位小数
         return state.cart.filter(x => x.goods_state)
                          .reduce((total, item) => total += item.goods_count * item.goods_price, 0)
                          .toFixed(2)
       }
  }
}