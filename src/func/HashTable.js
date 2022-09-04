import $ from 'jquery'
import anime from 'animejs'

export class HashTable {
  constructor(len,displayDiv) {
    this.size = len                           //哈希表初始长度
    this.storage = new Array(this.size);
    this.count = 0;                           //插入表中的数据个数
    this.displayTable = displayDiv            //展示哈希表的div
  }
  creatTimeline () {
    var tl = anime.timeline({
      //动画事件线，保证动画顺序进行
      easing: 'easeOutExpo'
    });
    document.querySelector('#play').onclick = tl.play;
    document.querySelector('#pause').onclick = tl.pause;
    document.querySelector('#restart').onclick = tl.restart;
    return tl
  }
  getSpeed () {
    var speedText = $('#speed-text').text()
    switch (speedText) {
      case '0.5X': {
        return 1200;
      }
      case '1X': {
        return 500;
      }
      case '2X': {
        return 200;
      }
      case '4X': {
        return 100;
      }
    }
    return 500          //如果都不是,就返回正常速度
  }


  getSize () {
    return this.size
  }

  //哈希函数
  hashKey (value) {
    var key = value % this.size; //除留余数法构造
    return key;
  }

  display () {
    var table = '<div id="hash-table">';
    for (let i = 0; i < this.size; i++) {
      table +=
        '<div id="hash-data' +
        i.toString() +
        '" style="width:2.5em; height:2.5em;color:black;text-align:center;margin:3px">' +
        i +
        '<div id="data' +
        i.toString() +
        '" style=" width:100%;height:100%; box-sizing:border-box; text-align:center;padding-top:23%; border-radius:3px; background: #ff0081" ></div></div>';
    }
    table += '</div>';
    $(this.displayTable).html(table)
    this.selectAnimation()
    for (let i = 0; i < this.size; i++) {
    $('#data' + i.toString()).fadeIn(500);
    }
  }

  //根据数据初始化哈希表
  initHashTable (sourceArray) { 
    this.size = Math.ceil(sourceArray.length / 0.7)        //根据数组大小扩容哈希表，装填因子为0.7
    this.display()
    return this.setHs(sourceArray)                                    //插入数据

  }

  selectAnimation (tl) {
    var elements = []
    for (let i = 0; i < this.size; i++) {
      elements.push('#data'+i.toString())
    }
    if(tl)
    tl.add({
      targets: elements,
      background: '#ff0081',
      border: '0px',
      easing: 'easeInQuint',
      duration: this.getSpeed(),
    });
  }


  //线性探测再散列法
  setHs (array) {
    var tl = this.creatTimeline()
    var beginLog = document.querySelector('#beginLog');
    var completeLog = document.querySelector('#completeLog');
    if (this.count + 1 >= this.size) {
      tl.add({
        targets: '#completeLog',
        easing: 'easeOutQuart',
        color: '#fff',
        complete: function () {
          completeLog.value = '插入失败！哈希表负载过大！';
        },
        duration: this.getSpeed(),
      });
      return 
    }
    else {
      for (let i = 0; i < array.length; i++) {
        
        if (this.count + 1 == this.size)
        {
          tl.add({
            targets: '#completeLog',
            easing: 'easeOutQuart',
            color: '#fff',
            complete: function () {
              completeLog.value = '插入失败！哈希表负载过大！';
            },
            duration: this.getSpeed(),
          });
          return;
        }
        
        let key = array[i]
        let hsKey = this.hashKey(key)

        for (let j = 0; j < this.size-1; j++) {
          this.selectAnimation(tl)
          
          tl.add({
            targets: '#data' + hsKey,
            border: '3px solid black',
            easing: 'easeOutQuart',
            begin: function () {
              beginLog.value = '正在插入元素 ' + key + '...';
              completeLog.value = '';
            },
            duration: this.getSpeed(),
          });
          
          if (this.storage[hsKey] == undefined) {
          this.storage[hsKey] = key;
          $('#data' + hsKey.toString()).html('<label style="opacity:0;color:white;font-weight:bolder">'+key+'</label>')
          
          tl.add({
            targets: '#data' + hsKey.toString(),
            easing: 'easeOutExpo',
            background: 'rgba(60, 192, 115, 0.849)',
            display: 'block',
            duration: this.getSpeed(),
          }).add({
            targets: '#data' + hsKey.toString() + ' label',
            easing: 'easeOutExpo',
            opacity: 1,
            complete: function () {
              completeLog.value = '元素' + array[i] + '插入成功！';
            },
            duration: this.getSpeed(),
          });
            
          this.count++
          break
          }
          
        else if (this.storage[hsKey] == key) {
          tl.add({
            targets: '#data' + hsKey.toString(),
            easing: 'easeOutQuart',
            background: 'rgb(250,20,10)',
            display: 'block',
            complete: function () {
              completeLog.value = '元素' + array[i] + '已存在！';
            },
            duration: this.getSpeed(),
          });
            
          break
          }
            
        else {
          hsKey = (hsKey + 1) % this.size;        //防止越界
        }
          
        }
        
      }
    }
    
  }

  searchHs (array) {
    var tl = this.creatTimeline()
    var flag = false
    var beginLog = document.querySelector('#beginLog')
    var completeLog = document.querySelector('#completeLog');
    if(array)
      for (let i = 0; i < array.length; i++) {
      let key = array[i];
      let hsKey = this.hashKey(key);
      for (let j = 0; j < this.size - 1; j++) {
        this.selectAnimation(tl);
        flag = false
        tl.add({
          targets: '#data' + hsKey,
          border: '3px solid black',
          easing: 'easeOutQuart',
          begin: function () {
            beginLog.value = '正在查找元素 ' + key + '...';
            completeLog.value = '';
          },
          duration: this.getSpeed(),
        });
        if (this.storage[hsKey] == key) {
          tl.add({
            targets: '#data' + hsKey.toString(),
            easing: 'easeOutQuart',
            background: 'rgba(60, 192, 115, 0.849)',
            complete: function () {
              completeLog.value = '元素' + array[i] + '查找成功！';
            },
            duration: this.getSpeed(),
          });
          flag = true                       //标志已查找到
          break;
        }
        else {
          hsKey = (hsKey + 1) % this.size; //防止越界
        }
        }
        if (flag == false) {
          tl.add({
            targets: '#completeLog',
            color: '#fff',
            easing: 'easeOutQuart',
            complete: function () {
              completeLog.value = '元素' + array[i] + '查找失败！';
            },
            duration: this.getSpeed(),
          });
        }
    }
  }


  deleteHs (array) {
    var tl = this.creatTimeline();
    var flag = false
    var beginLog = document.querySelector('#beginLog');
    var completeLog = document.querySelector('#completeLog');
    if(array)
    for (let i = 0; i < array.length; i++) {
      let key = array[i];
      let hsKey = this.hashKey(key);
      for (let j = 0; j < this.size - 1; j++)
      {
        flag = false
        this.selectAnimation(tl);
        tl.add({
          targets: '#data' + hsKey,
          border: '3px solid black',
          easing: 'easeOutQuart',
          begin: function () {
            beginLog.value = '正在查找元素 ' + key + '...';
            completeLog.value = '';
          },
          duration: this.getSpeed(),
        });
        if (this.storage[hsKey] == key) {
          tl.add({
            targets: '#data' + hsKey.toString(),
            background: 'rgba(60, 192, 115, 0.849)',
            easing: 'easeOutQuart',
            duration: this.getSpeed(),
          }).add({
            targets: '#data' + hsKey.toString() + ' label',
            translateY: 20,
            translateX: 10,
            opacity: 0,
            complete: function () {
              completeLog.value = '元素' + array[i] + '删除成功！';
            },
            duration: this.getSpeed(),
          });
          flag = true
          delete this.storage[hsKey];
          this.count--;
          break
        } else {
          hsKey = (hsKey + 1) % this.size; //防止越界
      }
      }
      if (flag == false) {
        tl.add({
          targets: '#completeLog',
          easing:'easeOutQuart',
          color: '#ff1336',
          complete: function () {
            completeLog.value = '元素' + array[i] + '不存在！';
          },
          duration: this.getSpeed(),
        });
      }
    }
  }


    //扩容现有的哈希表
  resize (newSize) {
      let oldStorage = this.storage
      this.storage = new Array(newSize)
      this.size = newSize
      this.count = 0
      let array = []
      for (let i = 0; i < oldStorage.length; i++) {
        if (oldStorage[i] != undefined) {
          array.push(oldStorage[i])
        }
      }
      this.display()
      console.log(this.setHs(array))
    }
}
