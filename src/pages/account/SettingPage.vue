<template>
  <div>
    <van-nav-bar
      left-arrow
      left-text="返回"
      title="设置"
      @click-left="onBack"
    >
      <van-icon name="warning-o" slot="right" color="#de7f2d" size="20" @click="onShowErrors" />
    </van-nav-bar>
    <van-cell-group title="本机设置">
      <van-cell title="打印机配置" :value="printer.name" is-link icon="printer" to='printer' />
      <van-cell title="清除缓存" value="1.24M" is-link icon="clear" @click="onClear" />
      <van-cell title="应用升级" :value="version" is-link icon="gift" @click="onUpgrade" />
    </van-cell-group>
    <van-cell-group title="账号设置">
      <van-cell title="修改密码" value="" is-link icon="manager" to="account/reset"  />
      <van-cell title="退出登录" value="" is-link icon="share" @click="onQuit" />
    </van-cell-group>    
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    data() {
      return {
        showPopMenu: false,
        showUserSetting: false,
        username: '',
        password: '',
        version: '版本:' + window.app_version,
        printer: {name:'sdw2-02', type:'printer', status:'已连接', mac:'4E:AC:33:05:46'}
      }
    },
    computed: {
      ...mapGetters(['profile'])
    },
    methods: {
      onSubmit(values) {
        console.log('submit', values);
      },
      onBack(){
        this.$router.back()
      },
      onShowErrors(){
        //this.$router.push('errors')
      },
      onClear(){

      },
      onUpgrade(){
        window.api.rebootApp()
      },
      onResetPassword(){
        this.$router.push('account/reset')
      },
      onQuit(){
        this.$store.commit('saveLogoff')
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
