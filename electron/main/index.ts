import { app, BrowserWindow, shell, ipcMain , Menu, MenuItem,dialog} from 'electron'
import { release } from 'node:os'
import { join } from 'node:path'
import path from "node:path";

// The built directory structure
//
// ├─┬ dist-electron
// │ ├─┬ main
// │ │ └── index.js    > Electron-Main
// │ └─┬ preload
// │   └── index.js    > Preload-Scripts
// ├─┬ dist
// │ └── index.html    > Electron-Renderer
//
process.env.DIST_ELECTRON = join(__dirname, '..')
process.env.DIST = join(process.env.DIST_ELECTRON, '../dist')
process.env.VITE_PUBLIC = process.env.VITE_DEV_SERVER_URL
  ? join(process.env.DIST_ELECTRON, '../public')
  : process.env.DIST

// Disable GPU Acceleration for Windows 7
if (release().startsWith('6.1')) app.disableHardwareAcceleration()

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName())

if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}

// ipcMain.handle('get-database-path', () => path.join(app.getPath('userData'), 'database.sqlite3'))
ipcMain.handle('get-database-path', () => path.join(__dirname, '../../easy-erp.sqlite3'))

// Remove electron security warnings
// This warning only shows in development mode
// Read more on https://www.electronjs.org/docs/latest/tutorial/security
// process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

let win: BrowserWindow | null = null
// Here, you can also use other preload
const preload = join(__dirname, '../preload/index.js')
const url = process.env.VITE_DEV_SERVER_URL
const indexHtml = join(process.env.DIST, 'index.html')

async function createWindow(options?: Electron.PopupOptions) {
  win = new BrowserWindow({
    title: 'Main window',
    backgroundColor:'#fafafc',
    icon: join(process.env.VITE_PUBLIC, 'favicon.ico'),
    webPreferences: {
      preload,
      // Warning: Enable nodeIntegration and disable contextIsolation is not secure in production
      // Consider using contextBridge.exposeInMainWorld
      // Read more on https://www.electronjs.org/docs/latest/tutorial/context-isolation
      nodeIntegration: true,
      // 是否在独立 JavaScript 环境中运行 Electron API和指定的preload 脚本. 默认为 true。
      // 预加载脚本所运行的上下文环境只能访问其自身专用的文档和全局窗口，其自身一系列内置的JavaScript (Array, Object, JSON, 等等) 也是如此，
      // 这些对于已加载的内容都是不可见的。 Electron API 将只在预加载脚本中可用，在已加载页面中不可用。
      // 这个选项应被用于加载可能不被信任的远程内容时来确保加载的内容无法篡改预加载脚本和任何正在使用的Electron api。
      // 该选项使用的是与Chrome内容脚本相同的技术。
      // 你可以在开发者工具Console选项卡内顶部组合框中选择 'Electron Isolated Context'条目来访问这个上下文
      contextIsolation: false,
      webSecurity:true, // 允许跨域请求
      scrollBounce:true, // 启用滚动回弹（橡皮筋）效果,mac 下有效
    },
  })

  // 右键菜单
  const contextMenu = new Menu();
  contextMenu.append(new MenuItem({ label: '刷新', role: 'reload' }));

  // win.webContents.on('context-menu', (event, params) => {
  //   contextMenu.popup(win, params.x, params.y);
  // });

  if (process.env.VITE_DEV_SERVER_URL) { // electron-vite-vue#298
    win.loadURL(url)
    // Open devTool if the app is not packaged
    win.webContents.openDevTools()
  } else {
    win.loadFile(indexHtml)
  }

  // Test actively push message to the Electron-Renderer
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', new Date().toLocaleString())
  })

  // Make all links open with the browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:')) shell.openExternal(url)
    return { action: 'deny' }
  })
  // win.webContents.on('will-navigate', (event, url) => { }) #344
  ipcMain.handle('open-directory-dialog', async () => {
    const result = await dialog.showOpenDialog(win, {
      properties: ['openDirectory'],
    });

    // Return the selected directory path to the renderer process
    return result.filePaths[0];
  });
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  win = null
  if (process.platform !== 'darwin') app.quit()
})

app.on('second-instance', () => {
  if (win) {
    // Focus on the main window if the user tried to open another
    if (win.isMinimized()) win.restore()
    win.focus()
  }
})

app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows()
  if (allWindows.length) {
    allWindows[0].focus()
  } else {
    createWindow()
  }
})

// New window example arg: new windows url
ipcMain.handle('open-win', (_, arg) => {
  const childWindow = new BrowserWindow({
    webPreferences: {
      preload,
      nodeIntegration: true,
      contextIsolation: false,
    },
  })

  if (process.env.VITE_DEV_SERVER_URL) {
    childWindow.loadURL(`${url}#${arg}`)
  } else {
    childWindow.loadFile(indexHtml, { hash: arg })
  }
})