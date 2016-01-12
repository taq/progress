/**
 * Progress border circle renderer class
 *
 */
ProgressBorderCircle = function(context) {
   this.parent = context;

   /**
    * Draw the outer circle (not completed)
    *
    * @param {CanvasRenderingContext2D} context
    *
    */
   this.outer = function(ctx) {
      ctx.beginPath();
      ctx.strokeStyle = this.parent.empty_color;
      ctx.lineWidth   = this.parent.stroke_width;
      ctx.arc((this.parent.width-this.parent.stroke_width)/2, (this.parent.height-this.parent.stroke_width)/2, (this.parent.width-(this.parent.stroke_width*2))/2, 0, 2 * Math.PI);
      ctx.stroke();
   };

   /**
    * Draw the inner circle (completed)
    *
    * @param {CanvasRenderingContext2D} context
    *
    */
   this.inner = function(ctx) {
      var filled = parseInt(360 / (100/this.parent.percent()));
      var angle  = filled * Math.PI / 180;
      ctx.beginPath();
      ctx.strokeStyle = this.parent.avail_complete_color();
      ctx.lineWidth   = this.parent.stroke_width;
      ctx.arc((this.parent.width-this.parent.stroke_width)/2, (this.parent.height-this.parent.stroke_width)/2, (this.parent.width-(this.parent.stroke_width*2))/2, 0, angle);
      ctx.stroke();
   };

   /**
    * Render text
    *
    * @param {CanvasRenderingContext2D} context
    *
    */
   this.text = function(ctx) {
      ctx.font      = this.parent.font;
      ctx.fillStyle = this.parent.font_color;
      ctx.textAlign = "center";
      ctx.fillText(this.parent.percent()+"%", (this.parent.width-5)/2, (this.parent.height-5)/2);
   };

   /**
    * Render component
    *
    */
   this.render = function() {
      var ctx = this.parent.context();
      ctx.clearRect(0, 0, this.parent.width, this.parent.height);
      this.outer(ctx);
      this.inner(ctx);
      this.text(ctx);
   };
};
