<template>
  <div class="layout">
    <div id="left_menu" class="header">
      <h1>课程设计<br>A&B题</h1>
      <ul id="navigation">
        <li><a id="link-home" href="#home">Home</a></li>
        <li><a id="link-A16" href="#A16">A16</a></li>
        <li><a id="link-B20" href="#B20">B20</a></li>
      </ul>
    </div>
    <div id="right_main" class="main">
      <div id="home" class="panel">
        <homePage></homePage>
      </div>
      <div id="A16" class="panel" style="background-color: #ffebebc1;">
        <firePage></firePage>
      </div>
      <div id="B20" class="panel" style="background-color: rgba(240, 248, 255, 0.869);">
        <hashPage></hashPage>
      </div>
    </div>
  </div>
</template>

<script>
  import firePage from './firePage'
  import hashPage from './hashPage'
  import homePage from './homePage'
  export default {
    components: {
      firePage,
      hashPage,
      homePage
    },
    mounted () {
      document.getElementById('link-home').click()
    },
    data() {
      return {
        
      }
    },
    methods: {
      
    }
  }
</script>

<style>
input{
outline-style: none ;
border: 0;
border-radius: 3px;
padding: 10px 10px;
font-size: 14px;
font-weight: 700;
font-family: Arial, Helvetica, sans-serif;
cursor: pointer;
}
input:focus{
border-color: #f5f9fd;
outline: 0;
-webkit-box-shadow: inset 0 1px 1px rgba(251, 245, 245, 0.075),0 0 8px rgba(245, 247, 248, 0.6);
box-shadow: inset 0 1px 1px rgba(253, 249, 249, 0.075),0 0 8px rgba(227, 237, 246, 0.6)
}


.main{
  height: 1000px;
}
#layout{
  overflow: hidden;
}
.header{
position: absolute;
z-index: 2000;
width: 240px;
top: 50px;
}
.header h1{
font-size: 30px;
font-weight: 400;
text-transform: uppercase;
color: rgba(246, 242, 242, 0.985);
text-shadow: 0px 1px 1px rgba(0,0,0,0.3);
padding: 20px;
background: #FF9999;
}
#navigation {
margin-top: 20px;
width: 180px;
display:block;
list-style:none;
z-index:3;
}
#navigation a{
color: #444;
display: block;
background: #fff;
background: rgba(255,255,255,0.9);
line-height: 50px;
padding: 0px 20px;
text-transform: uppercase;
margin-bottom: 6px;
box-shadow: 1px 1px 2px rgba(0,0,0,0.2);
font-size: 14px;
}
#navigation a:hover {
background: #ddd;
}
.panel{
width: 100%;
min-height: 100%;
background-color: #fff;
position: absolute;
box-shadow: 4px -4px 4px rgba(0,0,0,0.2);
margin-left: -102%;
z-index:2;
-webkit-transition: all .6s ease-in-out;
-moz-transition: all .6s ease-in-out;
-o-transition: all .6s ease-in-out;
-ms-transition: all .6s ease-in-out;
transition: all .6s ease-in-out;
}
.panel:target{
margin-left: 0%;
}
#home:target ~ #header #navigation #link-home,
#A16:target ~ #header #navigation #link-A16{
background: #000;
color: #fff;
}
ul {
list-style:none;
margin-block-start: 1em;
margin-block-end: 1em;
margin-inline-start: 0px;
margin-inline-end: 0px;
padding-inline-start: 30px;
}

@-webkit-keyframes slideOut{
0%{top:-30px; opacity: 0;}
100%{top:0px; opacity: 1;}
}
@-moz-keyframes slideOut{
0%{top:-30px; opacity: 0;}
100%{top:0px; opacity: 1;}
}
@-o-keyframes slideOut{
0%{top:-30px; opacity: 0;}
100%{top:0px; opacity: 1;}
}
@-ms-keyframes slideOut{
0%{top:-30px; opacity: 0;}
100%{top:0px; opacity: 1;}
}
@keyframes slideOut{
0%{top:-30px; opacity: 0;}
100%{top:0px; opacity: 1;}
}

.panel-div {
height: 100%;
width: 80%;
margin-left: 220px;
}
.head {
color: #ff0081;
}
.head h1{
display: inline-block;
font-size: 70px;
padding: 10px 0px 30px 0px;
margin-top: 50px;
margin-left: 100px;
margin-bottom: 50px;
color: #ffcc99;
text-shadow: 2px 2px 4px rgba(158, 154, 154, 0.436);
}
.head p{
display: inline-block;
background-color: #99CCCC;
margin-left: 80px;
color: #fff;
padding: 10px;
}

.explain-div{
width: 300px;
position: absolute;
right: 40px;
top:40px;
border-radius: 2px;
color: #0099cc;
text-align: center;
}
.explain-div div{
width: 1.5em;
height: 1.5em;
margin: 0.2em;
border-radius: 6px;
}
.button-input {
  background: white;
  margin: 0 80px;
  }

  .button-input:hover {
  color: #fff;
  background-color: #ff0081;
  box-shadow: 0 5px 16px 0 rgba(247, 247, 247, 0.5);
  }
</style>