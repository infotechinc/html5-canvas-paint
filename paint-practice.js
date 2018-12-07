import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-icons/iron-icons.js';

import {injectShapes} from './injectShapes.js';


/**
 * `paint-practice`
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class PaintPractice extends PolymerElement {
  static get template() {
    return html`

        <style> 
    
          .myCanvas{
            margin-left: 20px;
            margin-top:0px;

          }
          .icon-bar {
            width: 130px;
            margin-top: 0px;
            margin-left: auto;
                        overflow: auto
          }
          .icon-bar a {
            float: left; 
            text-align: center;
            width: 25%;
            color: white; 
            font-size: 35px;
            margin-bottome: 0px;
          }  
          .icon-bar a:hover {
            background-color: #4CAF50;
          }
          h3, h1 {
            display:inline;
          }

          #checkbox{
            margin-top: 1px;
          } 
          h3{
            font-size: 15px;
          }  
          h1{
            font-size:15px;
          } 
          h4{
            font-size:15px;
          }  
          h4, #file{
            display: inline;
          } 
          .colorSel{
            margin-top:0px;
          } 
          .fileUpld{
            margin-top: 5px;
          }
          #checkBox{
            margin-top: 7px;
          }
          #dropdown{
            margin-left: 2px;
          }
        </style>

      <canvas id="myCanvas" ></canvas>

      <div class = "icon-bar" >
          <a  href="#" title = "Create Square" id="rectSel" style= "background-color: black" on-click= "activateAndSelectSquare"><iron-icon  style = "color: white" icon = "check-box-outline-blank" ></iron-icon></a>
          <a href="#" id="arrowSel"  title = "Create Arrow" style= "background-color: black" on-click= "activateAndSelectArrow">  <iron-icon style = "color: white" icon = "arrow-forward"></iron-icon> </a>
          <a href="#" id="switchSel" title = "Switch Tools" style= "background-color: black" on-click= "activateAndSelectSwitch" >  <iron-icon style = "color: white" icon = "swap-horiz" ></iron-icon> </a>
          <a href = "#" id = "delIcon" title = "Delete" style= "background-color: black" on-click= "activateAndSelectDelete"> <iron-icon style = "color:white" icon = "delete"></iron-icon></a>
       </div>

      <div class = "colorSel">
        <h3>Currently drawing in </h3> <h1> <h1>
        <select on-change = "updateColor" id= "dropdown" name="colors">
          <option value="blue">Blue</option>
          <option value="red">Red</option>
          <option value="green">Green</option>
          <option value="purple">Purple</option>
        </select>
      </div> 

      <div class = "fileUpld">
        <h4>Upload an image to canvas</h4>
        <input type="file" id="file" on-change = "userUpload"><br />
      </div>

      <h3> Display user info </h3><input type="checkbox" id= "checkBox" name="onInfo" on-click = "displayInfo">
       
    `;
  }
  static get properties() {
    return {
      selectedTool: {
        type: String,
        value: 'rectangle',
      }
    };
  }

  ready(){
    super.ready();
    const canvas = this.shadowRoot.querySelector('canvas');
    injectShapes(this);
    var self = this;
    this.canvas = new fabric.Canvas(canvas, {width: 500, height: 500});
    const path = './shapesToLoad.json';
    fetch(path).then(function(r){
      return r.json();
    }).then(function(r){
      this.canvas.loadFromJSON(r);
      this.canvas.renderAll();
    }.bind(this));

    this.updateColor();

   
  }
  
  makeIconNeutral(){
    var icons = [ this.shadowRoot.querySelector('#switchSel'),  this.shadowRoot.querySelector('#delIcon'),
    this.shadowRoot.querySelector('#arrowSel'), this.shadowRoot.querySelector('#rectSel') ];
    var x;
    for( x in icons){
      icons[x].style.cssText = "background-color:  black;"
    }
  }

  updateColor(){
    const color = this.shadowRoot.querySelector('#dropdown').value;
    const h1 = this.shadowRoot.querySelector('h1');
    h1.innerHTML = color.toUpperCase();
    h1.style.color = color;
  }
  makeIconActive(icon){
    icon.style.cssText = "background-color: blue;"
  }

  activateAndSelectSquare(){
    this.activateSquare();
    this.rectToolSelected();
  }

  activateAndSelectArrow(){
    this.activateArrow();
    this.arrowToolSelected();
  }
  activateAndSelectSwitch(){
    this.activateSwitch();
    this.selectToolSelected();
  }
  activateAndSelectDelete(){
    this.activateDelete();
    this.deleteSquare();
  }
  activateSquare(){
   this.makeIconNeutral();
   this.makeIconActive(this.shadowRoot.querySelector('#rectSel'));
  }
  activateArrow(){
   this.makeIconNeutral();
   this.makeIconActive(this.shadowRoot.querySelector('#arrowSel'))
  }
  activateSwitch(){ 
   this.makeIconNeutral();
   this.makeIconActive(this.shadowRoot.querySelector('#switchSel'))
  }
  activateDelete(){
  this.makeIconNeutral();
  this.makeIconActive(this.shadowRoot.querySelector('#delIcon'));
  }

  listenersOn(){
    this.canvas.on('mouse:down', this.mouseDown.bind(this));
    this.canvas.on('mouse:move', this.mouseMove.bind(this));
    this.canvas.on('mouse:up', this.mouseUp.bind(this));
    document.body.addEventListener('keydown', this.deleteListener.bind(this), false);
  }

  deleteListener(e){
    const key = e.keyCode;
    if(key == '8'){
      this.canvas.remove(this.canvas.getActiveObject());
    }
  }
  displayInfo(){
    const checkbox = this.shadowRoot.querySelector('#checkBox');

    if(checkbox.checked == true){
      this.canvas.on('after:render', this.infoOn.bind(this));
      this.canvas.renderAll();
    }
    else{
      this.canvas.off('after:render');
      this.canvas.renderAll();
    }

  }
  userUpload(e){
    const self = this;
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onload = function(f) {
      var data = f.target.result;
      fabric.Image.fromURL(data, function(img) {
        console.log(self.canvas.width);
        if(img.width >=500 ||img.height >= 500){
          img.set({
            scaleX: .1,
            scaleY: .1
          })
          self.canvas.add(img);
          self.canvas.setActiveObject(img);

        }
        else{
          self.canvas.add(img.set({ 
          left: 80, top: 95}));
          self.canvas.setActiveObject(img);
        }   
      });
    };
    reader.readAsDataURL(file);
    

  }
  uploadImg(){
    
    var imgURL = 'testImg.jpg';
    var myImg = new Image();
    const self = this;
    myImg.onload = function (img) {    
    var img = new fabric.Image(myImg, {
       
        left: 100,
        top: 80,
        scaleX: self.canvas.width/img.width,
        scaleY: self.canvas.height/img.height
    });
    
    self.canvas.add(img);
    };
    myImg.src = imgURL;
  

  }

  mouseDown(e){
    this.isMouseDown = true;

    const color = this.shadowRoot.querySelector('#dropdown').value;
    console.log(color);
    
    const pointer = this.canvas.getPointer(e.e);
    const shape = this[this.selectedTool].getShapeAtPointer(this, pointer);
    shape.set("fill", color);
    shape.set("stroke", color);
    this.canvas.add(shape);
    this.currentShape = shape;
    this.downX = shape.left;
    this.downY = shape.top;
  }

  infoOn(e){
    const elements = this.canvas.getObjects();
    var x;
    const ctx = this.canvas.getContext('2d');
    const date = new Date();
    var displayDate;
    const name = 'Sydney';
    
    //date.getMonth()+' '+ date.getDate()+' '+date.getFullYear()+' '+date.getHours()+':'+date.getMinutes()+ ' ' +date.getSeconds():
    for(x in elements){
      console.log(this);
      this.displayDate = this.displayDate ? this.displayDate : date.getMonth()+' '+ date.getDate()+' '+date.getFullYear()+' '+date.getHours()+':'+date.getMinutes();
      
      var displayStr = name + ' ' + this.displayDate;
      ctx.fillStyle = 'black';
      ctx.font = "13px Arial";
      ctx.fillText(displayStr, elements[x].left, (elements[x].top -2));
    }
   
  }
  
  mouseMove(e){
    this.inMouseUp = true;
    this.inMouseMove = true;
    if(this.isMouseDown != true) return;
    
    const pointer = this.canvas.getPointer(e.e);
    const currentShape = this.currentShape;
    this[this.selectedTool].mouseMove(this , pointer);
    this.canvas.renderAll();
  }

  mouseUp(e){
    this.currentShape = null;
    this.isMouseDown = false;
    this.selectToolSelected();
  }
  
  rectToolSelected(){
     this.selectedTool = 'rectangle';
     this.canvas.selection = false;
     this.listenersOn();
     this.canvas.renderAll();
  }

  arrowToolSelected(){
     this.canvas.selection = false;
     this.selectedTool = 'arrow';
     this.listenersOn();
     this.canvas.renderAll();

  }
  
  selectToolSelected(){
     this.inSelect = true;
     this.canvas.selection = true;
     this.selectedTool = "switchSel";
     this.canvas.off('mouse:down');
  }
  
  addSquare(e){
    const rect = new fabric.Rect(this.rectangle);
    this.canvas.add(rect);
    this.canvas.setActiveObject(rect);
    this.canvas.renderAll(); 
  }

  deleteSquare(){
    if( this.canvas.getActiveObject() == null){
      window.alert("Please select shape you wish to delete.\n");
      return;
    }
    this.canvas.remove(this.canvas.getActiveObject());
  }
}
window.customElements.define('paint-practice', PaintPractice);
