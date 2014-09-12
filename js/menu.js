var gui = require('nw.gui');

tray = new gui.Tray({
  icon: 'img/menu_icon.png'
});
menu = new gui.Menu();
tray.on('click', function() {
  return gui.Window.get().show();
});
show = new gui.MenuItem({
  type: 'normal',
  label: '显示',
  click: function() {
    return gui.Window.get().show();
  }
});
hide = new gui.MenuItem({
  type: 'normal',
  label: '隐藏',
  click: function() {
    return gui.Window.get().hide();
  }
});
quit = new gui.MenuItem({
  type: 'normal',
  label: '退出',
  click: function() {
    return gui.Window.get().close(true);
  }
});
menu.append(show);
menu.append(hide);
menu.append(quit);
tray.menu = menu;
window.tray = tray;
win = gui.Window.get();
win.on('maximize', function() {
  return;
});
win.on('unmaximize', function() {
  return;
});
win.on('minimize', function() {
  return this.hide();
});
win.on('close', function(quit) {
  if (os.platform() === 'darwin' && !quit) {
    return this.hide();
  } else {
    return this.close(true);
  }
});

document.getElementById('closeButton').onclick = function(){
  return win.close(true);
}
document.getElementById('debugButton').onclick = function(){
  return win.showDevTools();
}