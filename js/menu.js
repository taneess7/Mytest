document.addEventListener("DOMContentLoaded", function() {
  // 選取所有下拉選單開關
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
  
  // 為每個下拉選單添加點擊事件
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      // 關閉非當前路徑上的所有選單
      const currentPath = e.composedPath();
      dropdownToggles.forEach(otherToggle => {
        if (!currentPath.includes(otherToggle) && !currentPath.includes(otherToggle.parentElement)) {
          const menu = otherToggle.nextElementSibling;
          if (menu && menu.classList.contains('show')) {
            menu.classList.remove('show');
          }
        }
      });
      
      // 切換當前選單
      const menu = this.nextElementSibling;
      menu.classList.toggle('show');
    });
  });
  
  // 點擊文檔其他區域時關閉所有選單
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.dropdown')) {
      const openMenus = document.querySelectorAll('.dropdown-menu.show');
      openMenus.forEach(menu => {
        menu.classList.remove('show');
      });
    }
  });
  
  // 防止點擊選單內容時關閉選單
  const dropdownMenus = document.querySelectorAll('.dropdown-menu');
  dropdownMenus.forEach(menu => {
    menu.addEventListener('click', function(e) {
      // 只有當點擊的不是下拉開關時才阻止事件冒泡
      if (!e.target.classList.contains('dropdown-toggle')) {
        e.stopPropagation();
      }
    });
  });
});
// 檢測並處理選單邊界溢出
function adjustMenuPosition() {
  const dropdowns = document.querySelectorAll('.dropdown-menu .dropdown');
  
  dropdowns.forEach(dropdown => {
    const submenu = dropdown.querySelector('.submenu');
    if (!submenu) return;
    
    // 重設之前的調整
    dropdown.classList.remove('edge');
    
    // 計算子選單是否會溢出視窗
    const rect = submenu.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    
    if (rect.right > windowWidth) {
      dropdown.classList.add('edge');
    }
  });
}

// 在選單顯示時檢查位置
document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
  toggle.addEventListener('click', function() {
    // 延遲執行以確保選單已經顯示
    setTimeout(adjustMenuPosition, 10);
  });
});

// 視窗大小變化時重新調整
window.addEventListener('resize', adjustMenuPosition);
