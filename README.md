# ExtJS Grid Auto Column Width Plugin

The Auto Width plugin when bound to a `Ext.grid.Grid` allows to automatically
adjust the width of text columns based on it's header and cell content.

This plugin is only suited for text only cells!

Please note that this was only tested on ExtJS modern version 6.2.1.167. If you
would like to use it on newer versions you may need to make changes to the
plugin.

## Setup

### Enable the ExtJS charts module

The Auto Column Width Plugin makes use of the ExtJS charts module. If you don't
have it already active in your project, then edit your `app.json` and add it:
```js
/**
 * The list of required packages (with optional versions; default is "latest").
 * ...
 */
"requires": [
    "charts"
],
```

### Grid Auto Column Width Plugin

Copy the `grid` directory into your `app` directory. Example: `MYPROJ/app/grid`.

Edit `MYPROJ/app/grid/plugin/AutoWidth.js` and replace `MYPROJ` in
`Ext.define('MYPROJ.grid.plugin.AutoWidth', {` by your own project name.

## Usage

To enable auto width, you must add the `autoWidth: true` property to the column.

Adding the `autoWidthSame: true` property to a column will specify that the
content of all cells are expected to have the same width, this means that only
the width of the title and the first cell will be used, increasing performance.

Example:
```js
Ext.define('MyGrid', {
   extend  : 'Ext.grid.Grid',
   store   : 'my_store',
   plugins : [{ type: 'autowidth' }],
   columns: [{
      text          : 'Date',
      dataIndex     : 'date',
      xtype         : 'datecolumn',
      format        : 'Y-m-d H:i:s',
      autoWidth     : true,
      autoWidthSame : true,
   }, {
      text      : 'Text',
      autoWidth : true,
   }
});
```

Please check the plugin source comments and code for more details.
