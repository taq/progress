/**
 * Main class of the Progress component
 *
 * This replaces a PROGRESS HTML5 element with the custom canvas element.
 * No need to use jQuery.
 *
 */
Progress = function(id) {
   this.id              = id;                      // original element id
   this.container       = null;                    // original element
   this.width           = 100;                     // element width
   this.height          = 100;                     // element height
   this.canvas          = null;                    // current canvas
   this.context         = null;                    // current canvas context
   this.min             = 0;                       // minimum value (from progress element)
   this.max             = 0;                       // maximum value (from progress element)
   this.curval          = 0;                       // current value
   this.stroke_width    = 10;                      // the width of the line used to draw the component
   this.empty_color     = "#ddd";                  // color used to draw empty sections
   this.complete_color  = "#00c000";               // color used to draw completed sections
   this.complete_colors = [];                      // colors used to draw completed sections, avail by percentage
   this.style           = "border_circle";         // component style
   this.font            = "bold 1em Monospaced";   // componenent font to show percentage
   this.font_color      = "black";                 // font color
   this.renderer        = null;                    // what renderer to use

   // registered renderers
   this.renderers = { "border_circle" : "ProgressBorderCircle" };

   /**
    * Constructor
    *
    */
   this.main = function() {
      this.container = document.getElementById(this.id);
      this.inspect();
      this.insert();
   };

   /**
    * Set value
    *
    * @param {number} value
    */
   this.value = function(value) {
      this.curval = value;
      this.render();
   };

   /**
    * Inspect the current element values
    *
    */
   this.inspect = function() {
      this.min    = parseInt(this.container.attributes.min.value);
      this.max    = parseInt(this.container.attributes.max.value);
      this.curval = parseInt(this.container.value);
      this.min    = isNaN(this.min) ? 0 : this.min;
      this.max    = isNaN(this.max) ? 0 : this.max;
   };

   /**
    * Return the canvas context
    *
    * @returns {CanvasRenderingContext2D} context
    *
    */
   this.context = function() {
      return this.canvas.getContext("2d");
   };

   /**
    * Find the current renderer
    *
    * @returns {Object} renderer
    *
    */
   this.find_renderer = function() {
      try {
         var cls = this.renderers[this.style];
         if (cls == null) {
            return null;
         }
         this.renderer = new window[cls](this);
      } catch (e) {
         return null;
      }
   };

   /**
    * Render component
    *
    */
   this.render = function() {
      if (this.renderer == null) {
         this.find_renderer();
      }
      if (this.renderer != null) {
         this.renderer.render();
      }
   };

   /**
    * Insert component, replacing the progress element
    *
    */
   this.insert = function() {
      this.canvas = document.createElement("canvas");
      this.canvas.id = this.id + "_progress_";
      this.container.parentNode.replaceChild(this.canvas, this.container);
   };

   /**
    * Calculate the current percentual
    *
    * @returns {integer} percent
    *
    */
   this.percent = function() {
      return parseInt((this.curval / (this.max - this.min)) * 100);
   };

   /**
    * Returns the complete color
    *
    * @returns {String} complete color, based on the current percentage
    *
    */
   this.avail_complete_color = function() {
      if (this.complete_colors.length < 1) {
         return this.complete_color;
      }
      var prop = 100 / this.complete_colors.length;
      var pos  = -1;
      var perc = this.percent();
      for (var i = 0, start = 0, t = this.complete_colors.length; i < t; i ++, start += prop) {
         if (perc >= start && perc <= start + prop) {
            pos = i;
            break;
         }
      }
      return pos >= 0 ? this.complete_colors[pos] : this.complete_color;
   };

   // call the main method
   this.main();
};
