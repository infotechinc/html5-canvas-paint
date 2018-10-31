const injectShapes = function(injectionTarget){
  injectionTarget.rectangle = {
    top: 100,
    left: 100,
    width: 50,
    height: 50,
    fill: 'red',
    getShapeAtPointer: function(pointer){
    
      const posX = pointer.x, posY = pointer.y;
      const toConstruct = this[this.selectedTool];
      const shape = new fabric.Rect(toConstruct);
      shape.left = posX;
      shape.top = posY;
      return shape;
    },
    mouseMove: function(pointer, currentShape, downX, downY){
      
      if(currentShape.left > pointer.x ) 
      currentShape.left = pointer.x;
      if(currentShape.top >pointer.y) 
      currentShape.top = pointer.y;

      const width = (Math.abs(pointer.x - downX)), 
      height = (Math.abs(pointer.y - downY));
      currentShape.set({width: width, height: height});
      currentShape.setCoords();
    }
  }

  injectionTarget.arrow = { 
    left: 100,
    top: 100,
    stroke: 'black',
    strokeWidth: 5,
    fill: false,
    path: 'M0 0 L100.1 0 M 100 0 L75 20 M100 0 L75 -20',

    getShapeAtPointer: function(pointer){
      const posX = pointer.x, posY = pointer.y;
      const path = new fabric.Path(injectionTarget.arrow.path, {
       left: 100,
       top: 100,
       stroke: 'red',
       strokeWidth: 5,
       fill: false
      });
     console.log(path);
      path.left = posX;
      path.top = posY;
      return path;
    },
    
    mouseMove: function(pointer, currentShape, downX, downY){
    
      if(currentShape.left > pointer.x ) 
      currentShape.left = pointer.x;
      if(currentShape.top >pointer.y) 
      currentShape.top = pointer.y;

      const width = (Math.abs(pointer.x - downX)), 
      height = (Math.abs(pointer.y - downY));
      currentShape.set({width: width, height: height});
      currentShape.setCoords();
    }
  }
}

export { injectShapes };
