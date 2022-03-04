/**
 * The Auto Width plugin when bound to a `Ext.grid.Grid` allows to automatically
 * adjust the width of text columns based on it's header and cell content.
 *
 * This plugin is only suited for text only cells!
 *
 * To enable auto width, you must add the `autoWidth: true` property to the
 * column.
 *
 * Adding the `autoWidthSame: true` property to a column will specify that the
 * content of all cells are expected to have the same width, this means that
 * only the width of the title and the first cell will be used, increasing
 * performance.
 *
 * @example
 *     Ext.define('MyGrid', {
 *        extend  : 'Ext.grid.Grid',
 *        store   : 'my_store',
 *        plugins : [{ type: 'autowidth' }],
 *        columns: [{
 *           text          : 'Date',
 *           dataIndex     : 'date',
 *           xtype         : 'datecolumn',
 *           format        : 'Y-m-d H:i:s',
 *           autoWidth     : true,
 *           autoWidthSame : true,
 *        }, {
 *           text      : 'Text',
 *           autoWidth : true,
 *        }
 *     });
 */
Ext.define('MYPROJ.grid.plugin.AutoWidth', {
   extend : 'Ext.plugin.Abstract',
   alias  : 'plugin.autowidth',

   init(grid) {
      grid.on({ refresh : this.onRefresh, scope: this });
   },

   /**
    * Called every time the grid is refreshed.
    * Sets the grid column width.
    *
    * @param {Ext.grid.Grid} grid - The grid this plugin is attached to.
    *
    * @private
    */
   onRefresh(grid) {
      for (const col of grid.getColumns()) {
         if (!col.autoWidth)    continue;

         const titleEl   = col.textElement.parent().parent().dom;
         const titleText = col.getText() || '';

         let largest = this.measureWidth(titleEl, titleText);

         for (const cell of col.getCells()) {
            const cellEl    = cell.el.dom;
            const cellText  = cell._rawValue || '';
            const cellWidth = this.measureWidth(cellEl, cellText);

            if (cellWidth > largest)    largest = cellWidth;

            if (col.autoWidthSame)    break;
         }

         col.setWidth(largest);
      }
   },

   /**
    * Measures the width of a element containing a text, only the text, it's
    * font and element padding are used to determine the width.
    *
    * @param {Element} el - The HTML element.
    * @param {string} text - The text contained in the element.
    *
    * @return {number} The width of the element.
    *
    * @private
    */
   measureWidth(el, text) {
      const tWidth = (t, f) => Ext.draw.TextMeasurer.measureText(t, f).width;

      const getStyles  = el  => window.getComputedStyle(el);
      const getPadding = sty => parseFloat(sty.paddingRight)
                              + parseFloat(sty.paddingLeft);

      const styles = getStyles(el);

      return tWidth(text, styles.font) + getPadding(styles);
   }
});
