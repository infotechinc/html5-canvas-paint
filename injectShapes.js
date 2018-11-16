const injectShapes = function(injectionTarget){
  injectionTarget.rectangle = {
    top: 100,
    left: 100,
    width: 50,
    height: 50,
    fill: 'red',
    getShapeAtPointer: function(paint, pointer){
    
      const posX = pointer.x, posY = pointer.y;
      const toConstruct = paint[paint.selectedTool];
      const shape = new fabric.Rect(toConstruct);
      shape.left = posX;
      shape.top = posY;
      return shape;
    },

    mouseMove: function(paint, pointer){
      
      if(paint.currentShape.left > pointer.x) 
      paint.currentShape.left = pointer.x;
      if(paint.currentShape.top > pointer.y) 
      paint.currentShape.top = pointer.y;

      const width = (Math.abs(pointer.x - downX)), 
      height = (Math.abs(pointer.y - downY));
      paint.currentShape.set({width: width, height: height});
      paint.currentShape.setCoords();
    }
  }

  injectionTarget.arrow = { 
    left: 100,
    top: 100,
    stroke: 'black',
    strokeWidth: 5,
    fill: false,
    path: 'M0 0 L100.1 0 M 100 0 L75 20 M100 0 L75 -20',

    getShapeAtPointer: function(paint, pointer){
      const posX = pointer.x, posY = pointer.y;
      const path = new fabric.Path(injectionTarget.arrow.path, {
       left: 100,
       top: 100,
       stroke: 'red',
       strokeWidth: 5,
       fill: false
      });
      path.left = posX;
      path.top = posY;
      return path;
    },
    
    mouseMove: function(paint, pointer){

      paint.currentShape.originX = paint.currentShape.oCoords.bl;
      paint.currentShape.originY = paint.currentShape.oCoords.tl;

      const deltaX = (pointer.x - paint.downX);
      const deltaY = (pointer.y - paint.downY);
      const angle = Math.atan2(deltaY, deltaX) *180/ Math.PI;
     
      const width2 = Math.sqrt( ( Math.pow(deltaX,2) + Math.pow(deltaY,2) ) );
      const height1 = paint.currentShape.height;
      const width1 = paint.currentShape.width;

      paint.currentShape.scaleX = width2/width1;
     
      paint.currentShape.rotate(angle);
      paint.currentShape.setCoords();
     
    }
  }
}

export { injectShapes };
