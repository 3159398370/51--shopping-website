// 1.按键盘S键光标定位在搜索框，并且搜索框中的文本要删除。
document.addEventListener('keydown', function (event) {
  if (event.key === 's' || event.key === 'S') {
    event.preventDefault(); // 阻止默认行为
    document.querySelector('.sousuo input').focus(); // 将焦点移动到搜索框

  }
});
// (2) Tab栏切换功能
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    document.querySelector('.tab-button.active').classList.remove('active');
    document.querySelector('.tab-content.active').classList.remove('active');
    button.classList.add('active');
    const tabId = button.getAttribute('data-tab');
    document.getElementById(tabId).classList.add('active');
  });
});
