<template>
  <div>
    <van-nav-bar
      left-arrow
      :left-text="leftText"
      :title="title"
      @click-left="onBack"
      :right-text="rightText"
      @click-right="onRightClick"
    >
      <van-icon v-if="errorIcon" name="bulb-o" color="#ed5f0c" slot="right" size="20" @click="onShowErrors" />
    </van-nav-bar>
    <slot></slot>  
  </div>
</template>

<script>
  //import { mapGetters } from 'vuex'

  export default {
    props: {
        title : { 
          type : String,
          require : false,
          default : '标题'
        },
        errorIcon : {
          type: Boolean,
          require: false,
          default: true
        },
        rightText : {
          type: String,
          require: false,
          default: ''
        },
        rightClick:{
          type: Function,
          require: false,
          
        },
        //自定义返回事件
        leftText: {
          type: String,
          require: false,
          default: '返回'
        },
        leftClick:{
          type: Function,
          require: false,
        }
    },
    data() {
      return {
      }
    },
    // computed: {
    //   ...mapGetters(['profile'])
    // },
    methods: {
      onBack(e){
        if(this.leftText === '返回')
          this.$router.back()
        else this.$emit('leftClick', e)
      },
      onShowErrors(){
        this.$router.push('errors?' + window.location.href.split('#')[1].substring(1))
      },
      onRightClick(e){
        this.$emit('rightClick', e)
      }
    }
  }
</script>

<style lang="less">
  .user {
    &-poster {
      width: 100%;
      height: 53vw;
      display: block;
    }
    &-group {
      margin-bottom: 15px;
    }
    &-links {
      padding: 15px 0;
      font-size: 12px;
      text-align: center;
      background-color: #fff;
      .van-icon {
        display: block;
        font-size: 24px;
      }
    }
  }
</style>
