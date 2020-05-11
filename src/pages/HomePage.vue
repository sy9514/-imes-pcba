<template>
  <div>
    <van-nav-bar
      title="PCBA工作台"
      @click-left="handleLogout"
    >
      <template #left>
        <van-icon name="user-o" slot="left" size="20"/>
        {{profile.nick}}
      </template>
      <van-icon name="bars" slot="right" size="20" @click="()=>this.$router.push('/settings')" />
    </van-nav-bar>
    <div style="height: 5px;"></div>
    <van-notice-bar :scrollable="true">
      重要通知：保持一颗赤子之心，负重前行，你可以被打倒，绝不可以被打趴。
    </van-notice-bar>
    <van-tabs>
      <van-tab>
        <template #title style="font-size: 25px;">{{'物料'}}</template>
        <div style="height: 15px;"></div>
        <van-grid :gutter="8" :clickable="true" :border="false">
          <van-grid-item icon="setting-o" text="扫码测试" to="/demo" />
          <van-grid-item icon="exchange" text="拆盘" to="/settings" />
          <van-grid-item icon="points" text="合盘"  />
          <van-grid-item icon="cluster-o" text="分拣" />
          <van-grid-item icon="peer-pay" text="上线" />
          <van-grid-item icon="down" text="下线" />
        </van-grid>
      </van-tab>
      <van-tab>
        <template #title style="font-size: 25px;">{{'成品'}}</template>
        <div style="height: 15px;"></div>
        <van-grid :gutter="8" :clickable="true" :border="false">
          <van-grid-item icon="setting-o" text="出库" />
          <van-grid-item icon="setting-o" text="送检" />
          <van-grid-item icon="setting-o" text="出货" />
        </van-grid>
      </van-tab>
      <van-tab>
        <template #title style="font-size: 25px;">{{'返工'}}</template>
        <div style="height: 15px;"></div>
        <van-grid :gutter="8" :clickable="true" :border="false">
          <van-grid-item icon="setting-o" text="测试" />
          <van-grid-item icon="setting-o" text="检验" />
        </van-grid>
      </van-tab>
      <van-tab>
        <template #title style="font-size: 25px;">{{'质检'}}</template>
        <div style="height: 15px;"></div>
        <van-grid :gutter="8" :clickable="true" :border="false">
          <van-grid-item icon="setting-o" text="首件检验" />
          <van-grid-item icon="setting-o" text="检验" />
        </van-grid>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { Dialog } from 'vant'
  import launchApp from '@/utils/app-launch'

  export default {
    data() {
      return {
        showPopMenu: false,
        showUserSetting: false,
        username: '',
        password: '',
      }
    },
    computed: {
      ...mapGetters(['profile'])
    },
    created(){
      launchApp()
    },
    methods: {
      onSubmit(values) {
        console.log('submit', values);
      },
      handlerUserInfo() {
        this.showUserSetting = true
      },
      handleLogout(){
        Dialog.confirm({
          title: '确认',
          message: '是否退出登录?'
        })
                .then(() => {
                  this.$store.commit('saveLogoff')
                })
                .catch(() => {
                  Dialog.close()
                })
      },
      handlerMenuShow() {
        this.showPopMenu = true
      },
      handlerMenuClose() {
        this.showPopMenu = false
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
