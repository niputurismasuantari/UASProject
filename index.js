const electron = require('electron');
const uuid = require("uuid");
const { v4 } = uuid;
const{app, BrowserWindow, Menu, ipcMain} = electron;
let indexWindow;
let allAppointment = [];

app.on("ready", () =>{
  indexWindow = new BrowserWindow({
      webPreferences:{
          nodeIntegration: true
      },
      width: 1000,
      height: 500,
      title: "Aplikasi Kasir Sederhana"
  });

  indexWindow.loadURL(`file://${__dirname}/index.html`);
  indexWindow.on("closed", ()=>{
      app.quit();
      indexWindow = null;
  });
  
});
ipcMain.on("appointment:creates", (event, appointment) =>{
  appointment["id"] = uuid.v1();
  appointment["done"] = 0;
  allAppointment.push(appointment);
  indexWindow.reload();
});

ipcMain.on("appointment:request:list", event => {
  indexWindow.webContents.send('appointment:response:list', allAppointment);
});