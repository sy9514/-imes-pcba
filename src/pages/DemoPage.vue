<template>
  <Page title="扫码测试">
  <van-cell-group>
    <ScanInput label="扫码" @submit="onScanInputSubmit" @change="onChange" />
  </van-cell-group>
  </Page>
</template>

<script>
  import Page from '@/components/Page'
  import ScanInput from '@/components/ScanInput'
  //import { mapGetters } from 'vuex'

  export default {
    components:{
      Page,
      ScanInput
    },
    data() {
      return {
        scan_code : ''
      }
    },
    // computed: {
    //   ...mapGetters(['profile'])
    // },
    methods: {
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
