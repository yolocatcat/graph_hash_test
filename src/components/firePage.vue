<template>
  <div class="panel-div">
    <div class="head">
      <h1>🌈A16</h1>
      <p>STEP1.输入测试样例:指定测试样例的行列数，据此生成指定大小的测试样例。<br>STEP2.指定测试样例可以遍历的位置。<br>STEP3.输出任意位置开始一次点火能燃烧的最大草坪数量。</p>
      <div class="explain-div" style="right:10px">
        <div style="background-color: #26A19A;display: inline-block;"></div>--可以访问的位置<br>
        <div style="background-color: #FFE145;display: inline-block;"></div>--无法访问的位置<br>
        <div style="background-color: #F44336;display: inline-block;"></div>--已经访问的位置<br><br>（每个位置只能访问自己上下左右的位置）
      </div>
    </div>
    <div>
      <div id="input-div" class="input-bar">
        <form id="form">
          <p style="background-color: transparent;"><label>生成草坪的行数m：</label><input class="num-input" min="1" max="11" type="number" v-model="row" /></p>
          <p style="background-color: transparent;"><label>生成草坪的列数n：</label><input class="num-input" min="1" max="20" type="number" v-model="col" /></p>
          <input class="button-input" type="button" value="确定" @click="generateTable">
        </form>
      </div>
      <div id="output-div" class="output-zone">
        <div id="div-table" style="position:relative;">
          <div id="tips" style="font-weight: bolder;margin-top: 20px;text-align: center;"></div>
          <div id="table"></div>
          <div id="buttons-div"></div>
        </div>
      </div>
    </div>
    <div id="setting-div" class="setting-bar"></div>
  </div>
</template>

<script>
  import $ from 'jquery'
  import anime from 'animejs';
  import {getDfsMaxNodes} from '@/func/getDfsMaxNodes.js'
  export default {
    data() {
      return {
        row: 1,
        col: 1,
        lawn: []
      }
    },
    mounted () {
      window.dataSubmit = this.dataSubmit
      window.radioRandom = this.radioRandom
      window.radioReset = this.radioReset
      window.getNodes = this.getNodes
    },
    methods: {
      generateTable() {
        var table = ''
        for (var i = 0; i < this.row; i++) {
          console.log(this.row)
          table += '<div id="row' + i + '" class="row" style="text-align:center;width:100%;height:2em auto;display:flex;justify-content:center;align-items:center; ">'
          for (var j = 0; j < this.col; j++) {
            /*if (j == 0) {
              table += '<div id="col' + j + '" class="col" style="clear:left;"><input class="cell" type="radio"></div>'
            } else */
              table += '<div id="col' + j + '" class="col"><input class="cell" type="radio"></div>'
            
          }
          table += '</div>'
        }
        $('#table').html(table)
        $('#buttons-div').html('<div id="buttons-div"><input type="button" onclick="radioReset()" value="重置"><input id="resetInput" type="button" onclick="radioRandom()" value="随机"><input id="confirmInput" type="button" onclick="dataSubmit()" value="确定"></div>')
        anime({
          targets: '.col, #buttons-div',
          translateX:[10,-10],
          opacity:[0,1]
        })
      },
      radioReset() {
        this.generateTable()
      },
      //根据用户输入的数据生成对应二维数组（代表此测试样例）
      dataSubmit() {
        var confirmInput = document.getElementById('confirmInput')
        var resetInput = document.getElementById('resetInput')
        var parent = confirmInput.parentNode
        parent.removeChild(confirmInput)
        parent.removeChild(resetInput)
        var inputs = document.querySelectorAll('.cell')
        this.lawn = new Array(this.row).fill(1).map(() => new Array(this.col).fill(1))
        for (let i = 0; i < this.row; i++) {
          for (let j = 0; j < this.col; j++) {
            if (inputs[i * this.col + j].checked == false) {
              this.lawn[i][j] = 0
            }
          }
        }
        console.log(this.lawn)
        this.showResult()
      },
      radioRandom() {
        var inputs = document.querySelectorAll('.cell')
        var ran = Math.random()
        for (let i = 0; i < this.row; i++) {
          for (let j = 0; j < this.col; j++) {
            ran = Math.random()
            if (ran >= 0.5) {
              inputs[i * this.col + j].checked = true
            } else {
              inputs[i * this.col + j].checked = false
            }
          }

        }
      },
      //界面右侧展示对应生成的草坪
      showResult() {
        var items = document.querySelectorAll('.col')
        for (var i = 0; i < this.row; i++) {
          for (var j = 0; j < this.col; j++) {
            items[i*this.col + j ].removeChild(items[i*this.col + j ].childNodes[0])
            anime({
            targets: items[i*this.col + j],
            easing: 'easeInOutQuad',
            translateX: [10,-10],
            translateY: -30,
            })
            if (this.lawn[i][j] == 0) {
              anime({
                targets: items[i*this.col + j],
                background: '#FFE145',
                opacity: 0.5
              }, 0)
              //items[i * this.col + j].classList.add()
            } else {
              anime({
              targets: items[i*this.col + j],
              background: '#26A19A'
              }, 0)
              //items[i * this.col + j].classList.add()
            }
          }
        }
        $('#tips').html('<input type="button" value="运行" id="start-btn" onclick="getNodes()">')
        anime({
          targets:'#start-btn',
          translateY: 5,
          easing:'easeInOutCirc',
          background: '#ff0081',
          color: '#000'
        })
      },
      //调用封装的函数，得到最长路径，通过CSS展示
      getNodes() {
        anime({
          targets: '#tips',
          opacity: [0,50,100],
          translateX: -20,
          translateY:10,
          easing: 'easeInOutCirc',
        })
        var nodes = getDfsMaxNodes(this.lawn)
        var allItems = document.getElementsByClassName('col')
        $('#buttons-div').html('<input type="button" class="play" value="继续"><input type="button" class="pause" value="暂停"><input type="button" class="restart" value="重来">')
        anime({
          targets:'#buttons-div input',
          opacity: [0,50,100],
          translateX: -50,
          easing: 'easeInOutCirc',
          background: '#ff0081',
          color: '#fff'
        })
        var tl = anime.timeline({
          easing: 'easeOutSine'
        });
        for (var i = 0; i < nodes.length; i++) {
          console.log(this.row)
          var num = nodes[i][0] * this.col + nodes[i][1]
          console.log(num)
          if (allItems[num]) {
            tl.add({
            targets: allItems[num],
            translateX: [-5,-10],
            easing: 'easeInOutQuad',
            translateY: [-25,-30],
            background: '#F44336'
            }, '+=100')
          }
        }
        document.querySelector('.play').onclick = tl.play;
        document.querySelector('.pause').onclick = tl.pause;
        document.querySelector('.restart').onclick = tl.restart;
        this.show = true
        $('#tips').html('<p>输出结果：一次点火最多能烧的草坪数量为 '+ nodes.length+'</p>')
      },
      
    },
  }
</script>

<style>

  .input-bar {
    text-align: center;
    margin-left: 70px;
    background-color: #fff;
    box-shadow: 1px 1px 2px rgba(0,0,0,0.2);
  }

  .setting-bar {
    width: 80%;
    height: 60px;
    border-radius: 15px;
    bottom: 50px;
  }

  .output-zone {
    height: 90%;
    width: 100%;
  }

  .num-input {
    width: 50px;
    margin-right: 50px;
  }

#buttons-div{
  text-align: center;
  position: absolute;
  bottom: 0;
  right: 80px;
  margin-bottom: 50px;
}
#buttons-div input{
  margin: 10px;
  background-color: #fff;
  color:#ff0081;
  cursor: pointer;
}
#div-table p{
  color:#ff0081;
  text-align: center;
}

  .col {
    background: #ff0081;
    display: inline-block;
    border-radius: 5%;
    overflow: hidden;
    position: relative;
    width: 1.8em;
    height: 1.8em;
    margin: 0.2em;
    border-radius: 6px;
  }

  #table {
    overflow: hidden;
    margin-left: auto;
    margin-right: auto;
    height: 520px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  input[type="radio"] {
    box-sizing: border-box;
    padding: 0;
    font-family: inherit;
    font-size: 100%;
    margin: 0;
    appearance: none;
    position: relative;
    right: 0;
    bottom: 0;
    left: 0;
    height: 20px;
    width: 20px;
    vertical-align: -0.8rem;
    transition: all .15s ease-out 0s;
    color: #fff;
    cursor: pointer;
    display: inline-block;
    margin: .2rem;
    outline: none;
    border-radius: 10%;
    border-radius: 50%;
  }

  input[type=radio]:checked:before {
    transform: scale(1);
    background-image: linear-gradient(25deg, #005122, #01762c, #019e36, #00c840);
  }

  input[type=radio]:before {
    content: "";
    display: block;
    height: 100%;
    width: 100%;
    border-radius: 3px;
    transform: scale(0);
    margin-left: 2px;
    transition: all ease-out 250ms;
  }
  #form p{
  background: #fff;
  color: #000;
  width: 280px;
  display: inline-block;
  margin: 10px;
  }
  #form input{
  background: #000;
  color: #fff;
  border: none;
  }
  #form label{
  padding-right: 10px;
  }
</style>