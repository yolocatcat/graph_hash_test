<template>
  <div class="panel-div">
    <div class="head">
      <h1>🌞简介</h1>
    </div>
    <div class="container">
      <div class="container-column">
        <img src="../img/A16.jpg" alt="图片加载失败..." >
        <div class="container-content">
          <h2>A类题目16<br>
          </h2>
          <p>
            给你一块n*m的草坪，问如果只点一次火，最多能烧多少块草坪。可以从n*m的草地中任意一个地方开始点火，火只能往上下左右传递，没有草的地方不能燃烧。
          </p>
        </div>

        <input type="button" value="start" onclick="document.getElementById('link-A16').click()">
      </div>
      <div class="container-column">
        <img src="../img/B20.jpg" alt="图片加载失败...">
        <div class="container-content">
          <h2>B类题目20<br>
          </h2>
          <p>
            利用哈希表进行存储。针对一组数据进行初始化哈希表，可以进行显示哈希表，查找元素，插入元素，删除元素，退出程序操作。
          </p>
        </div>
        <input type="button" value="start" onclick="document.getElementById('link-B20').click()">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style>
.container {
display: flex;
justify-content: space-evenly;
}

.container-column {
width: 330px;
display: flex;
flex-direction: column;
align-items: center;
padding: 5px;
border-radius: 0.4rem;
box-shadow: 1px 1px 2px rgba(0,0,0,0.2);
}
.container-column img{
  height: 18em;
  width: 22em;
  border-radius: 0.5rem;
}
.container-column input{
  width: fit-content;
}
.container-content{
  padding: 0 20px;
}
.container-content h2{
text-align: center;
font-size: 22px;
color: #000;
font-family:'黑体' , Arial;
font-weight: 600;
}
.container-content p{
  font-size: 15px;
  color: #000;
  text-indent:2em;
  font-family:'Microsoft Yahei' , Arial;
  margin-bottom: 10px;
}
</style>