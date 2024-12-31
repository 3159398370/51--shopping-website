// 获取三个复选框和底部全选框
const topCheckboxes = document.querySelectorAll('.ck'); // 商品行复选框
const allCheckbox = document.getElementById('ck_all'); // 底部全选复选框
const deleteButtons = document.querySelectorAll('.sc');
// 监听顶部三个复选框的状态变化，更新底部全选框状态
topCheckboxes.forEach(checkbox => {
  checkbox.addEventListener('change', () => {
    if (topCheckboxes[0].checked && topCheckboxes[1].checked && topCheckboxes[2].checked) {
      allCheckbox.checked = true;
    } else {
      allCheckbox.checked = false;
    }
  });
});
// 监听底部全选框的状态变化，更新顶部复选框状态
allCheckbox.addEventListener('change', () => {
  if (allCheckbox.checked) {
    topCheckboxes.forEach(cb => cb.checked = true);
  } else {
    topCheckboxes.forEach(cb => cb.checked = false);
  }
});
// 删除功能：点击删除按钮删除所在行
deleteButtons.forEach(button => {
  button.addEventListener('click', (event) => {
    event.preventDefault();
    const row = button.closest('tr');
    row.parentNode.removeChild(row);
  });
});
// 动态更新金额功能
// 获取总计标签的元素
const selectedItemCountElement = document.querySelector('.tr7-td-p2'); // "已选商品"和"合计金额"所在标签
const calculateTotals = () => {
  let selectedItemCount = 0; // 已选商品数量
  let totalAmount = 0; // 合计金额

  // 遍历每一行，根据复选框是否勾选计算总计
  topCheckboxes.forEach((checkbox, index) => {
    if (checkbox.checked) {
      selectedItemCount++; // 增加已选商品数量
      const row = checkbox.closest('tr'); // 当前商品行
      const totalPriceElement = row.querySelector('td[align="center"][style*="padding-top"]'); // 金额标签
      const totalPrice = parseFloat(totalPriceElement.textContent) || 0; // 获取金额
      totalAmount += totalPrice; // 累加总金额
    }
  });

  // 更新页面中的已选商品数量和合计金额
  selectedItemCountElement.innerHTML = `已选商品&nbsp;&nbsp; ${selectedItemCount}&nbsp;&nbsp;件&nbsp;&nbsp;合计:<em>￥${totalAmount.toFixed(2)}</em>`;
};

// 监听复选框状态变化
topCheckboxes.forEach(checkbox => {
  checkbox.addEventListener('change', () => {
    calculateTotals(); // 每次复选框变化重新计算总计
  });
});
// 监听加减按钮及数量输入框，动态更新金额并联动总计
document.querySelectorAll('.tr3-td5').forEach(row => {
  const decrementButton = row.querySelector('.btn-decrement'); // 减号按钮
  const incrementButton = row.querySelector('.btn-increment'); // 加号按钮
  const qtyInput = row.querySelector('.input-qty'); // 数量输入框
  const totalPriceElement = row.parentElement.querySelector('td[align="center"][style*="padding-top"]'); // 金额标签
  const basePrice = 2399; // 商品单价

  const updateTotalPrice = () => {
    const qty = parseInt(qtyInput.value) || 1; // 当前数量
    const totalPrice = qty * basePrice; // 计算金额
    totalPriceElement.textContent = totalPrice.toFixed(2); // 更新金额标签
    calculateTotals(); // 同步更新总计
  };

  decrementButton.addEventListener('click', () => {
    let qty = parseInt(qtyInput.value) || 1;
    if (qty > 1) {
      qtyInput.value = qty - 1;
      updateTotalPrice(); // 更新金额
    }
  });

  incrementButton.addEventListener('click', () => {
    let qty = parseInt(qtyInput.value) || 1;
    qtyInput.value = qty + 1;
    updateTotalPrice(); // 更新金额
  });

  qtyInput.addEventListener('input', () => {
    const qty = parseInt(qtyInput.value);
    if (!isNaN(qty) && qty > 0) {
      updateTotalPrice(); // 输入有效时更新金额
    } else {
      qtyInput.value = 1;
      updateTotalPrice(); // 重置为1并更新金额
    }
  });
});

// 初始化计算总计
calculateTotals();
const button = document.querySelector('.js');
button.addEventListener('click', () => {
  alert('加入购物车成功，但是结算页面还没有做哦~');
})


