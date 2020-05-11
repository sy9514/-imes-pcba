<template>
  <van-field 
    :label="label" 
    :value="value_val" 
    @click-right-icon="onSwitch"
    @input="onInput"
    right-icon="graphic"
    :readonly="!keyboard_val"
    ref="input"
    clearable
    label-width="40px"
    />
</template>

<script>
  export default {
    props: {
        label : {
          type: String,
          require:true,
          default:'页面标题'
        },
        value : {
          type: String,
          require: true,
          default: ''
        },
        keyboard:{
          type: Boolean,
          require: true,
          default: false
        },
        submit:{
          type: Function,
          require: true
        },
        change:{
          type: Function,
          require: false
        }
    },
    watch:{
      keyboard(v){
        this.keyboard_val = v
      },
      value(v){
        this.value_val = v
      }
    },
    data() {
      return {
        keyboard_val : this.keyboard,
        value_val: ''
      }
    },
    mounted(){
      window.document.addEventListener('keydown', this.onKeyDown)
    },
    destroyed(){
      window.document.removeEventListener('keydown', this.onKeyDown)
    },
    methods: {
      onInput(val){
        this.value_val = val
        this.$emit('change', val)
      },
      onKeyDown(event){
        const e =  event || window.event
        const act = window.document.activeElement
        
        if(e.key == 'Enter')
          setTimeout(()=>{
            this.$emit('submit', this.value_val)
            this.value_val = ''
          }, 200)
        else{
          if(act.tagName != 'INPUT' && e.key.length === 1)
            this.value_val += e.key
        }
          
      },
      onSwitch(){
        this.keyboard_val = !this.keyboard_val
        setTimeout(()=>{
          if(this.keyboard_val)
            this.$refs.input.focus()
          else
            this.$refs.input.blur()
        }, 200)
      },
    }
  }
</script>

<style lang="less">
  .van-field__label{

  }
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
