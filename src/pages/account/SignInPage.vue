<template>
  <div id="sign">
    <van-row>
      <van-col id="tcl" span="24">TCL</van-col>
    </van-row>
    <van-row>
      <van-col id="pcba" span="24">IMES-PCBA</van-col>
    </van-row>
    <van-cell-group title="用户登录">
      <van-field
        v-model="username"
        left-icon="user-o"
        clearable
        label="账号"
        icon="question-o"
        placeholder="请输入账号"
        bind:click-icon="onClickIcon"
      />
      <van-field
        v-model="password"
        left-icon="closed-eye"
        type="password"
        label="密码"
        placeholder="请输入密码"
        clearable
        :border="false"
        :error-message="sign_error"
      />
      <van-cell style="padding: 0 16px;margin-top: 5px;">
        <van-button
          type="info"
          size="large"
          :loading="loading"
          @click="handlerSignInClick"
          >登录</van-button
        >
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
  import { Toast } from 'vant'
  import launchApp from '@/utils/app-launch'
  import queryPath from '@/utils/query-path'
  // import { parse } from 'qs'

  export default {
    methods: {
      handlerSignInClick() {
        if (!this.username || !this.password) {
          Toast.fail('请输入账号和密码.')
          return
        }
        this.loading = true
        // this.$store
        //   .dispatch('split/getList', {
        //   })

        this.$store
          .dispatch('accountSignIn', {
            userName: this.username,
            password: this.password
          })
          .then(() => {
            this.loading = false
            if(this.$store.getters.signed)
              setTimeout(() => {
                  this.$router.replace(queryPath())
              }, 200)
          })
      }
    },
    mounted(){
      launchApp()
      // if(this.$store.getters.signed){
      //   this.$router.replace('home')
      // }
    },
    data() {
      return {
        username: '',
        password: '',
        sign_error: '',
        loading: false
      }
    }
  }
</script>

<style lang="less">
  #sign {
    padding-top: 1.65rem;
    #tcl {
      padding-left: 1.8rem;
      font-size: 25px;
      color: rgb(0, 119, 255);
    }
    #pcba {
      text-align: center;
      font-size: 21px;
      color: rgb(19, 130, 233);
    }
  }
</style>
