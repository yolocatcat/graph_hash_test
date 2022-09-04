<template>
  <div class="panel-div">
    <div class="head">
      <h1>🌈B20</h1>
      <p>
        STEP1.输入一组数据:根据用户输入的数据创建一个负载因子为0.7的哈希表。<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（负载因子=数据个数/哈希表长度）<br>STEP2.可以对生成的哈希表进行插入元素、查找元素、删除元素的操作。<br>STEP3.也可以选择扩容当前哈希表或者生成一个空的哈希表。
      </p>
      <div class="explain-div" style="top: 50px;">
        <div style="background-color: rgba(60, 192, 115, 0.849);display: inline-block;"></div>--操作成功<br>
        <div style="background-color: #F44336;display: inline-block;"></div>--操作失败<br>（数据重复插入）
      </div>
    </div>
    <div id="hash-main">
      <div id="cover-div">
        <div id="dialog-div">
          <p style="text-align: center;">
            <label
              style="font-size: 22px;color: #000;font-family:'黑体' , Arial;font-weight: 600;">初始化哈希表<br></label>
            <label style="color: rgb(135, 137, 137);">请输入一组范围在0~999的数据，每个数据之间用英文逗号分隔。<br><br></label>
          </p>

          <form id="formH1">
            <div style="display:flex;align-items: center;margin: 20px;"><textarea v-model="inputArray" style="color: white;" placeholder="多个数据之间以英文逗号‘,’分割"
                class="array-input" />
              <button
                style="border-radius:15px;color: #fff;background-color: #000;outline-style: none;border: 0;padding: 6px;margin-left: 8px;cursor: pointer;"
                @click="arrRandom">
                <span class="icon-spinner11"></span>
              </button>
            </div>
            <label id="errMsg0" style="opacity: 0;;margin-left: 30px ;"></label>
            <input class="button-input" type="button" value="确定" @click="initHash" style="margin-left: 90%;">
          </form>
        </div>
      </div>
      <div id="display-div">
        <button id="back-button" @click="back"
          style="width:fit-content; border: none;outline: none;position:absolute;background:none;color:#FFCC99;font-weight: 600;font-size: 20px;top:0;left: -20px;">返回</button>
        <div id="hash-options">
          <div id="form-options">
            <div class="horizontal-option">
              <input type="button" value="创建空表" @click="unfoldOption(0)">
              <div class="element">
                <p>请输入表长：</p>
                <input type="number" v-model="emptySize" :min="3" :max="20" style="width: 80px;display: block;margin-bottom: 10px;">
                <input type="button" value="确定" @click="generateEmpty">
              </div>
            </div>
            <div class="horizontal-option">
              <input type="button" value="插入元素" @click="unfoldOption(1)">
              <div class="element">
                <p>请输入要添加的元素：</p>
                <button
                  style="border-radius:15px;color: #fff;background-color: #000;outline-style: none;border: 0;padding: 6px;margin-left: 10px;cursor: pointer;"
                  @click="arrRandom">
                  <span class="icon-spinner11"></span>
                </button>
                <input type="text" v-model="inputArray" style="width: 130px;margin-bottom: 5px;">
                <label id="errMsg1" style="font-weight: bolder;"></label>
                <input type="button" value="确定" @click="insertData">
              </div>
            </div>
            <div class="horizontal-option">
              <input type="button" value="查找元素" @click="unfoldOption(2)">
              <div class="element">
                <p>请输入要查找的元素：</p>
                <button
                  style="border-radius:15px;color: #fff;background-color: #000;outline-style: none;border: 0;padding: 6px;margin-left: 10px;cursor: pointer;"
                  @click="arrRandom">
                  <span class="icon-spinner11"></span>
                </button>
                <input type="text" v-model="inputArray" style="width: 130px;margin-bottom: 5px;">
                <label id="errMsg2" style="font-weight: bolder;"></label>
                <input type="button" value="确定" @click="searchData">
              </div>
            </div>
            <div class="horizontal-option">
              <input type="button" value="删除元素" @click="unfoldOption(3)">
              <div class="element">
                <p>请输入要删除的元素：</p>
                <button
                  style="border-radius:15px;color: #fff;background-color: #000;outline-style: none;border: 0;padding: 6px;margin-left: 10px;cursor: pointer;"
                  @click="arrRandom">
                  <span class="icon-spinner11"></span>
                </button>
                <input type="text" v-model="inputArray" style="width: 130px;margin-bottom: 5px;">
                <label id="errMsg3" style="font-weight: bolder;"></label>
                <input type="button" value="确定" @click="deleteData">
              </div>
            </div>
            <div class="horizontal-option">
              <input type="button" value="扩容此表" @click="unfoldOption(4)">
              <div class="element">
                <p>请输入扩容后的表长：</p>
                <input type="number" v-model="newSize" :min="minSize" :max="25" style="width: 80px;display: block; margin-bottom: 10px;">
                <input type="button" value="确定" @click="resize">
              </div>
            </div>
          </div>
        </div>
        <p></p>
        <div id="hash-display">
          <div id="display-table"></div>
        </div>
        <div style="display:flex;justify-content: space-around; align-items: center;">
          <div id="output-info" style="display: flex;flex-direction: column;align-items: center;margin-bottom: 50px;margin-left: 100px;">
            <input id="beginLog" style="background-color: #000;font-size: 15px;color: #fff;margin-bottom: 10px;">
            <input id="completeLog" style="background-color: #000;font-size: 15px;color: #fff;">
          </div>
          <p id="speed-text">1X</p>
          <div style="display: flex;flex-direction: column;align-items: center;">
          <div id="speed-ctrl">
            <button @click="ctrlSpeed('0.5X')">0.5X</button>
            <button @click="ctrlSpeed('1X')">1X</button>
            <button @click="ctrlSpeed('2X')">2X</button>
            <button @click="ctrlSpeed('4X')">4X</button>
          </div>
          <p style="color: #FFCC99;">速度调整将会在下一个操作生效</p>
          </div>
          <div id="control-btns"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import anime from 'animejs';
import '@/assets/icomoon/style.css'
import {HashTable} from '@/func/HashTable'

export default {
  data() {
    return {
      inputArray:'',
      array:[],
      optionsFlag:[false,false,false,false,false],
      hashObject: {},
      emptySize:3,
      newSize:3,
      minSize:1
    }
  },
  watch: {
  hashObject: function(){
  this.minSize = this.hashObject.getSize()
  this.newSize = this.minSize

  }
  },
  methods: {
    ctrlSpeed(speed){
      $('#speed-text').text(speed)
    },
    warnMsg(index){
      anime({
        targets: '#errMsg'+index,
        color: '#FF1336',
        opacity:[0,1],
      })
    },
    toArray(index) {
      var input = this.inputArray
      this.inputArray=''
      console.log(input)
      if(input){
        if(input == ''){
          $('#errMsg'+index).text('你还没有输入！')
          this.warnMsg(index)
          return false
        }
        for (let i = 0; i < input.length; i++) {
          if(input[i] == '，'){
            $('#errMsg'+index).text('请使用英文逗号！')
            this.warnMsg(index)
            return false
          }
          if((input[i].charCodeAt() < 48 || input[i].charCodeAt() > 57) && input[i] !=','){
            $('#errMsg'+index).text('请输入在0~999以内的整数！')
            this.warnMsg(index)
            return false
          }
        }
        this.array = input.split(',').filter((x) => x !== '')
        if(this.array.length > 26 || this.array.length < 1){
          $('#errMsg'+index).text('请输入1~18个数据！')
            this.warnMsg(index)
          return false
        }
      }
      else{
        $('#errMsg'+index).text('你还没有输入！')
        this.warnMsg(index)
        return false
      }
        return true
    },
    slideCover(flag){
      if(flag){
        anime({
        targets: '#cover-div',
        translateY: 800,
        easing: 'easeInOutQuad'
        })
        setTimeout(()=>{
          $('#cover-div').css('display','none')
        },1000)
        setTimeout(()=>{
          $('#display-div').css('display','flex')
        },800)
        anime({
          targets: '#display-div',
          translateY:[1000,0],
          easing: 'easeInOutQuad'
        })
    }
    else{
      setTimeout(()=>{$('#cover-div').css('display','flex')},0)
      anime({
      targets: '#cover-div',
      translateY: [800,0],
      easing: 'easeInOutQuad'
      })
      anime({
        targets: '#display-div',
        translateY:[0,1000],
        easing: 'easeInOutQuad'
      })
      setTimeout(()=>{$('#display-div').css('display','none')},500)
    }
    },
    initHash(){
      if(this.toArray(0)){
        this.slideCover(true)
        $('#control-btns').html('<input type="button" id="play" value="继续"><input type="button" id="pause" value="暂停"><input type="button" id="restart" value="重来">')
        this.hashObject = new HashTable(this.array.length, '#display-table')
        this.hashObject.initHashTable(this.array)
        
        anime({
        targets:'#control-btns input',
        opacity: [0,50,100],
        translateX: -50,
        easing: 'easeInOutCirc',
        background: '#FFCC99',
        color: '#000'
        })
      }
      else{
        //this.slideCover(false)
        return
      }
    },
    arrRandom() {
    var len = Math.floor(Math.random() * 20)
    while(len > 18 || len < 2){
      len = Math.floor(Math.random() * 20)
    }
    var arr = new Array(len)
    var rand = 0
    for (var i = 0; i < len; i++) { 
      rand=Math.floor(Math.random() * 1000)
      arr[i] = rand
    } 
      this.inputArray = arr.join(',') 
    },
    unfoldOption(flag){
    let elements = document.querySelectorAll('.element')
      if(this.optionsFlag[flag] == false){
        for (let i = 0; i < this.optionsFlag.length; i++) {
          if(i == flag){
            this.optionsFlag[flag] = true
            anime({
              targets: elements[flag],
              visibility: 'visible',
              opacity: 1,
              height:[0,155],
              easing: 'easeInOutQuad'
            })
            continue
          }
          else{
            if(this.optionsFlag[i] == true)
            {
              this.optionsFlag[i] = false
              anime({
                targets: elements[i],
                opacity: 0,
                height:[155,0],
                easing: 'easeInOutCirc'
              })
            }
          }
          
        }
      }
      else{
        this.optionsFlag[flag] = false
        anime({
          targets: elements[flag],
          opacity:0,
          height:[155,0],
          easing: 'easeInOutCirc'
        })
      }
    },
    generateEmpty(){
      this.unfoldOption(0)
      this.hashObject = new HashTable(this.emptySize,'#display-table')
      this.hashObject.display()
    },
    insertData(){
      if(this.toArray(1))
      {  this.hashObject.setHs(this.array)
        this.unfoldOption(1)}
    },
    searchData(){
      if(this.toArray(2))
      {this.hashObject.searchHs(this.array)
      this.unfoldOption(2)}
    },
    deleteData(){
      if(this.toArray(3))
      {this.hashObject.deleteHs(this.array)
      this.unfoldOption(3)}
    },
    resize(){
      this.unfoldOption(4)
      this.hashObject.resize(this.newSize)
    },
    back(){
      this.slideCover(false)
    }

  },
}
</script>

<style>
#cover-div{
padding-top: 50px;
height: 100%;
width: 100%;
display: flex;
justify-content: center;
flex-direction: column;
align-items: center;
box-sizing: border-box;
}
#dialog-div{
width: fit-content;
box-shadow: 1px 2px 3px rgba(0,0,0,0.2);
background-color: #fff;
}
#formH1 p{
background: #fff;
color: #ffcc99;
padding: 10px;
}
#formH1 input, #formH1 textarea{
background: #000;
color: #fff;
border: none;
display: inline;
}
#formH1 textarea{
width: 493px;
height: 100px;
}
#formH1 label{
padding-right: 10px;
float: left;
}
#display-div{
  width: 90%;
  margin-left: 80px;
  height: 100%;
  position: relative;
  display: none;
  justify-content: center;
  flex-direction: column;
}
#hash-table{
  height: 200px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: stretch;
}

#form-options{
  display: flex;
  align-items:flex-start;
  justify-content: center;
}
.horizontal-option{
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-left: 20px;
  width: 160px;
}
.horizontal-option input:first-child{
  background:#FFCC99;
  border: none;
  outline: none;
}
.element{
  background-color: #000;
  color: #fff;
  padding: 5px;
  opacity: 0;
  border-radius: 5px;
}
#control-btns input{
  margin: 5px;
}
#back-button:before{
  content: "◄";
  color: #FFCC99;
  height: 10px;
  width: 20px;
  display: inline-block;
}

#speed-ctrl{
display: flex;
flex-direction: row;
}
#speed-ctrl button{
background-color: none;
outline: none;
border: none;
color: #fdb369;
margin-right:5px ;
}
#speed-ctrl button:hover{
box-shadow:1px 2px 4px coral;
}
</style>