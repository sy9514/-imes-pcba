<template>
  <Page 
    title="打印机设置" 
    :errorIcon="false"
    :rightText="scanning?'停止扫描':'扫描设备'"
    @rightClick="onScan"
    leftText="返回 "
    @leftClick="onBack"
    >
  <van-pull-refresh 
    pulling-text="下拉即可扫描"
    loosing-text="释放开始扫描"
    loading-text="扫描中..."
    success-text="扫描完成"
    v-model="scanning" @refresh="onPull">
    <van-list
      v-model="scanning"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-panel
        class="printer-device"
        v-for="item in list" 
        :key="item.mac" 
        :title="item.name + '_' + item.mac" 
        :desc="item.type" 
        :status="item.status"
        @click="onClick(item)"
        >
      </van-panel>
    </van-list>
  </van-pull-refresh>
  </Page>
</template>

<script>
  import Page from '@/components/Page'
  import {Toast} from 'vant'
  export default {
    components:{
      Page
    },
    data() {
      return {
        scanning: false,
        finished: true,
        list: [
          {name:'xjis-04', type:'printer', status:'', mac:'4E:AC:33:05:46'},
          {name:'sdw2-02', type:'printer', status:'已连接', mac:'4E:AC:33:05:46'},
          {name:'wdwwe-02', type:'printer', status:'', mac:'4E:AC:33:05:46'},
        ]
      }
    },
    // computed: {
    //   ...mapGetters(['profile'])
    // },
    methods: {
      onBack(){
        if(this.scanning)
          Toast('正在扫描中')
        else
          this.$router.back()
      },
      onScan(){
         window.alert(JSON.stringify(window.api.require('mam')))
        //  var privacy = window.api.require('ble');
        //       privacy.sysAuth(function(ret, err) {
        //           if (ret.status) {
        //               alert(JSON.stringify(ret));
        //           } else {
        //               alert(JSON.stringify(err));
        //           }
        //       });
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
      },
      onLoad(){
        
      },
      onPull(){
        if(this.scanning) return
        this.scanning = true
      },
      onClick(item){
        console.log(item)
      }
    }
  }
</script>

<style lang="less">
  .printer-device {
    .van-cell__title {
      flex-grow: 3
    }
  }
</style>
