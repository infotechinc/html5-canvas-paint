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
          }
          .icon-bar {
            width: 120px;
            margin-top: 17px;
            margin-left: auto;
            margin-right: auto; 
            
            overflow: auto
          }
          .icon-bar a {
            float: left; 
            text-align: center;
            width: 25%;
            color: white; 
            font-size: 35px;
          }  
          .icon-bar a:hover {
            background-color: #4CAF50;
          }
          
              
        </style>

       <canvas id="myCanvas" style="border:3px solid black";></canvas>

       <div class = "icon-bar" >
          <a  href="#" title = "Create Square" id="rectSel" style= "background-color:#555" on-click= "activateAndSelectSquare"><iron-icon  style = "color: white" icon = "check-box-outline-blank" ></iron-icon></a>
          <a href="#" id="arrowSel"  title = "Create Arrow" style= "background-color:#555" on-click= "activateAndSelectArrow">  <iron-icon style = "color: white" icon = "arrow-forward"></iron-icon> </a>
          <a href="#" id="switchSel" title = "Switch Tools" style= "background-color:#555" on-click= "activateAndSelectSwitch" >  <iron-icon style = "color: white" icon = "swap-horiz" ></iron-icon> </a>
          <a href = "#" id = "delIcon" title = "Delete" style= "background-color:#555" on-click= "activateAndSelectDelete"> <iron-icon style = "color:white" icon = "delete"></iron-icon></a>
       </div>
       
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
    this.canvas = new fabric.Canvas(canvas, {width: 500, height: 500});
    this.canvas.renderAll(); 
  }
  
  makeIconNeutral(){
    var icons = [ this.shadowRoot.querySelector('#switchSel'),  this.shadowRoot.querySelector('#delIcon'),
    this.shadowRoot.querySelector('#arrowSel'), this.shadowRoot.querySelector('#rectSel') ];
    var x;
    for( x in icons){
      icons[x].style.cssText = "background-color:  #555;"
    }
  }

  makeIconActive(icon){
    icon.style.cssText = "background-color: #4CAF50;"
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
  
  mouseDown(e){
    this.isMouseDown = true;
    const pointer = this.canvas.getPointer(e.e);
    const shape =this[this.selectedTool].getShapeAtPointer(pointer)
    this.canvas.add(shape);
    this.currentShape = shape;
    this.downX = shape.left;
    this.downY = shape.top;
  }
  
  mouseMove(e){
    this.inMouseUp = true;
    this.inMouseMove = true;
    if(this.isMouseDown != true) return;
    const that = this;
    const pointer = this.canvas.getPointer(e.e);
    const currentShape = this.currentShape;
    this[this.selectedTool].mouseMove( that , pointer);
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
