// 1.1放大镜效果
window.addEventListener('load', function () {
  // 1. 获取元素
  var left = document.querySelector('.left');
  var mask = document.querySelector('.mask');
  var bigDiv = document.querySelector('.bigDiv');
  var bigImg = document.querySelector('.bigImg');

  // 2. 鼠标移到left元素上方的时候，显示mask元素和bigDiv元素
  left.addEventListener('mouseover', function () {
    mask.style.display = 'block';
    bigDiv.style.display = 'block';
  });
  // 3. 鼠标离开left元素的时候，隐藏mask元素和bigDiv元素
  left.addEventListener('mouseout', function () {
    mask.style.display = 'none';
    bigDiv.style.display = 'none';
  });
  // 4. 鼠标在left元素内部移动的时候，mask元素和bigImg元素跟着移动
  left.addEventListener('mousemove', function (e) {
    // (1) 获取鼠标在盒子内的坐标
    var maskX = e.pageX - left.offsetLeft;
    var maskY = e.pageY - left.offsetTop;
    // 重新计算鼠标的位置，使mask元素的中心对准鼠标
    maskX = maskX - mask.offsetWidth / 2;
    maskY = maskY - mask.offsetHeight / 2;
    // (2) 限制mask元素在left盒子中的移动范围
    var maskMax = left.offsetWidth - mask.offsetWidth;
    if (maskX < 0) {
      maskX = 0;
    } else if (maskX > maskMax) {
      maskX = maskMax;
    }
    if (maskY < 0) {
      maskY = 0;
    } else if (maskY > maskMax) {
      maskY = maskMax;
    }
    // (3) 设置mask元素的最终位置
    mask.style.top = maskY + 'px';
    mask.style.left = maskX + 'px';
    // (4) 获取bigImg元素在bigDiv元素中的坐标
    var bigImgMax = bigImg.offsetWidth - bigDiv.offsetWidth;
    var bigImgX = (maskX * bigImgMax) / maskMax;
    var bigImgY = (maskY * bigImgMax) / maskMax;
    // (5) 把bigImg元素在bigDiv元素中的坐标移动到bigImg的top属性和left属性
    bigImg.style.top = -bigImgY + 'px';
    bigImg.style.left = -bigImgX + 'px';
    // bigImg要设置定位
  });


});
// 2.tab动态切换
document.addEventListener('DOMContentLoaded', function () {
  const tabs = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');
  tabs.forEach(tab => {
    tab.addEventListener('click', function () {
      // 移除所有按钮的 active 类
      tabs.forEach(t => t.classList.remove('active'));
      // 移除所有内容的 active 类
      tabContents.forEach(content => content.classList.remove('active'));
      // 添加 active 类到当前按钮和对应的内容
      this.classList.add('active');
      document.getElementById(this.dataset.tab).classList.add('active');
    });
  });
});

