<template>
  <Page 
    title="异常记录" 
    :errorIcon="false" 
    rightText="上报异常" 
    @rightClick="onSubmit">
    <van-cell-group title="异常图片">
      <van-cell>
        <template #title>
          <van-uploader v-model="fileList" multiple :max-count="3" accept />
        </template>
      </van-cell>
    </van-cell-group>
    <van-cell-group>
    <van-field label="来源" :value="source" disabled />
    <van-field
      v-model="message"
      rows="2"
      autosize
      label="说明"
      type="textarea"
      maxlength="120"
      placeholder="请输入异常重新操作步骤"
      show-word-limit
    />
  </van-cell-group>
  </Page>
</template>

<script>
  import Page from '@/components/Page'
  //import { mapGetters } from 'vuex'

  export default {
    components:{
      Page
    },
    data() {
      return {
        scan_code : '',
        message: '',
        source: window.location.href.split('?')[1],
        fileList: [

        ]
      }
    },
    // computed: {
    //   ...mapGetters(['profile'])
    // },
    methods: {
      onSubmit(){

      },
      onScanInputSubmit(code){
        console.log(code)
      },
      onChange(val){
        console.log(val)
        this.scan_code = val
      },
      onShowErrors(){
        this.$router.push('errors')
      }
    }
  }
</script>

<style lang="less">
  .user {
    &-poster {
      width: 100%;
    }
  }
</style>
