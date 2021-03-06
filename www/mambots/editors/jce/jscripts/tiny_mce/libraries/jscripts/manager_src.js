// JavaScript Document
jce.set('showProperties', true);
jce.set('fileSelected', false);
function setIframeSrc(s){
	getObj('manager').src = 'index2.php?option=com_jce&no_html=1&task=plugin&plugin='+jce.getPlugin()+'&file=files.php' + s;
};
function getDir(){
	return getSelectValue('dirPath');
};
function changeDir(newDir){
    Cookie.set("jce_" + jce.getPlugin() + '_dir', newDir, 1);
	setIframeSrc('&dir=' + encodeURIComponent(newDir));
	showMessage(jce.getLang('loading', false, 'Loading...'), 'load.gif', 'msg');
};
function updateDir(){
	changeDir(getDir());
};
function goUpDir(){
   var currentDir = getDir();
    if(currentDir.length < 2)
        return false;
    var dirs = currentDir.split('/');
    var search = '';
    for(var i = 0; i < dirs.length-1; i++){
        search += dirs[i]+'/';
    }
    search = search.substr(0, search.length-1);
    changeDir(search);
};
function newFolder(){
	new Prompt(jce.getLang('new_folder', false, 'New Folder'), {
		onConfirm: function(){
			var dir = getDir();
			var folder = getValue('prompt_value');
			if(folder){
				setIframeSrc('&dir=' + encodeURIComponent(getDir()) + '&opt=new_folder&newd=' + makeSafe(folder));
				this.close();
			}
		}
	});
};
function renameFile(){
	new Prompt(jce.getLang('rename_file', false, 'Rename File'), {
		value : basename(stripExtension(getValue('itemsList'))),
		onConfirm: function(){
			var name = makeSafe(getValue('prompt_value'));
			new Confirm(jce.getLang('rename_alert', false, 'Renaming files/folders will break existing links. Continue?'), {
				onConfirm: function(){
					setIframeSrc('&dir=' + encodeURIComponent(getDir()) + '&opt=rename_file&renf='+getValue('itemsList')+'&newf='+name);
					this.close();
				}
			});
			this.close();
		}
	});
};
function renameFolder(){
	new Prompt(jce.getLang('rename_folder', false, 'Rename Folder'), {
		value : basename(getValue('itemsList')),
		onConfirm: function(){
			var name = makeSafe(getValue('prompt_value'));
			new Confirm(jce.getLang('rename_alert', false, 'Renaming files/folders will break existing links. Continue?'), {
				onConfirm: function(){
					setIframeSrc('&dir=' + encodeURIComponent(getDir()) + '&opt=rename_folder&rend='+getValue('itemsList')+'&newd='+name);
					this.close();
				}
			});
			this.close();
		}
	});
};
function setUploadName(v){
	setValue('upload_name', stripExtension(makeSafe(basename(v))));
};
function iframeInit(){
	jce.iframeFunction();
};
function uploadFile(){
	var html = '<table>';
		//Main
		html += '<tr><td class="column1"><label>' + jce.getLang('file', false, 'File') + '</label></td>';
		html += '<td><input type="file" name="upload" id="upload" size="40" value="" onchange="setUploadName(this.value);" /></td></tr>';
		html += '<tr><td class="column1"><span class="label">' + jce.getLang('name', false, 'Name') + '</label></td>';
		html += '<td ><input type="text" name="upload_name" id="upload_name" size="40" /></td></tr>';
		//Upload Select
		html += '<tr><td style="text-align:center;" colspan="2"><input type="checkbox" class="checkbox" name="upload_select" id="upload_select" style="vertical-align:middle;" />&nbsp;';
		html += '<span class="label">' + jce.getLang('upload_select', false, 'Select File After Upload') + '</span></td></tr>';
		//Overwrite Conditions		
		html += '<tr><td style="text-align:center;" colspan="2"><input type="radio" class="checkbox" id="overwrite" name="overwrite" style="vertical-align:middle;" value="1" checked="checked" /><label>' + jce.getLang('overwrite', false, 'Overwrite Existing File') + '</label>&nbsp;';		
		html += '<input type="radio" class="checkbox" id="unique" name="overwrite" style="vertical-align:middle;" value="0" /><span class="label">' + jce.getLang('unique', false, 'Create Unique File') + '</label></td></tr></table>';
	
	new basicDialog(jce.getLang('upload', false, 'Upload'), html, {
		width: 360,
		parent: 'form',
		modal: true,
		onConfirm: function(){
			showMessage(jce.getLang('uploading', false, 'Uploading...'), 'load.gif', 'msg');
			getObj('uploadForm').submit();
			if(ischecked('upload_select')){
				var file = makePath(getDir(), getValue('upload_name') + '.' + makeSafe(getExtension(getValue('upload'))));
				jce.iframeFunction = function(){
					setReturnFile(file, true);
				};
			}
			this.close();
		}
	});
};
function refreshAction(){
    updateDir(getDir());
};
function copyFile(){
	setValue('clipboard', getValue('itemsList'));
    show('pasteIcon');
	jce.set('paste_action', 'copy');
};
function cutFile(){
	setValue('clipboard', getValue('itemsList'));
    show('pasteIcon');
	jce.set('paste_action', 'cut');
};
function pasteFile(){
	var dir = getDir();
   	var file = getValue('clipboard');
   	var opt = '&opt=';
   	switch( jce.get('paste_action') ){
        case 'copy':
            opt += 'copy_file&copyf=' + file;
        break;
        case 'cut':
            opt += 'move_file&movef=' + file;
        break;
    }
   	setIframeSrc('&dir=' + encodeURIComponent(dir) + opt + '&dest=' + encodeURIComponent(dir));
	setValue('clipboard', '');
   	hide('pasteIcon');
};
function deleteFile(){
	new Confirm(jce.getLang('delete_file_alert', false, 'Delete File?'), {
		onConfirm: function(){
			setIframeSrc('&dir=' + encodeURIComponent(getDir()) + '&opt=del_file&delf=' + getValue('itemsList'));
			this.close();
		}
	});
};
function deleteFolder(){
	new Confirm(jce.getLang('delete_folder_alert', false, 'Delete Folder?'), {
		onConfirm: function(){
			setIframeSrc('&dir=' + encodeURIComponent(getDir()) + '&opt=del_folder&deld=' + getValue('itemsList'));
			this.close();
		}
	});
};
function createFileIFrame(dir, file) {
	dir = (dir != '') ? '&dir='+dir : '';
    file = (file != '') ? '&ret_file='+file : '';
	
	setImg('load.gif');	
    setHTML('fileContainer', '<iframe class="fileFrame" id="manager" name="manager" src="index2.php?option=com_jce&no_html=1&task=plugin&plugin='+ jce.getPlugin() +'&file=files.php' + dir + file + '" frameborder="0"></iframe>');
};
function setLoader(){
	setHTML('fileProperties', '<div><img style="vertical-align:middle;" src="' + jce.getLibImg('load.gif') + '" /><span style="margin-left:5px;">'+ jce.getLang('loader', false, 'Loading...') +'</span></div>');
};
function setIcons(s){
	switch(s){
		//Hide All
		case 0 :			
			var icons = getElementsByClassName('editIcon');
			for(var i=0; i<icons.length; i++){
				if(icons[i].id != 'pasteIcon'){
					hide(icons[i].id);	
				}
			}			
			break;
		//Show single selection icons
		case 1:
			setIcons(0);
			show('delIcon');
			show('renIcon');
			show('cutIcon');
			show('copyIcon');
			break;
		//Show multiple selection icons
		case 2:
			setIcons(0);
			show('delIcon');
			show('cutIcon');
			show('copyIcon');
			break;
		//Show Folder selection icons
		case 3:
			setIcons(0);
			show('delDirIcon');
			show('renDirIcon');
			break;
	}
};
var Sortlist = new Class({
	getOptions : function(){
		return {
			type: 'name',
			onSort: Class.empty
		};
	},
	initialize : function(element, list, options){
		this.setOptions(this.getOptions(), options);
		if (this.options.initialize) this.options.initialize.call(this);
		this.element = element;
		this.list = ($type(list) != 'array') ? new Array(list) : list;		
		$(element).addEvent('click', function(){
			this.sortList();
		}.bind(this));
	},
	sortList : function(){
		if($(this.element).hasClass('sortDesc')){
			s = 'desc';	
			$(this.element).className = 'sortAsc';
		}else{
			s = 'asc';
			$(this.element).className = 'sortDesc';
		}
		this.list.each(function(list){
			this.sortItems(list, s);
		}.bind(this));
	},
	sortItems : function(o, s)
	{
		var a = this.getCache(o);	
		a.sort(this.sortCompare);
	
		if (s == 'desc') a.reverse();
	
		if(this.options.type == 'ext') a.reverse();
	
		// remove from doc
		o.getChildren().each(function(el){
			o.removeChild(el);   
		});		
		// insert in the new order
		a.each(function(el){
			o.appendChild(el.element);
		});
		this.destroyCache(a);
		this.fireEvent('onSort');
	},
	sortCompare : function(n1, n2) {
		if (n1.value < n2.value)
			return -1;
		if (n2.value < n1.value)
			return 1;
		return 0;
	},
	getCache : function(o){
		var a = new Array();
		var v;
		var x = 0;
		o.getChildren().each(function(el){
			if(el.nodeName == 'DIV'){
				v = el.title.toLowerCase();
				if(this.options.type == 'ext'){
					v = this.getExt(v);
				}
				a[x] = {
					value:   v,
					element: el
				};
				x++;
		  }   
		}.bind(this));
		return a;
	},
	destroyCache : function(o)
	{
		o.each(function(el){
			el.value = null;
			el.element = null;
			el = null;
		});
	},
	getExt : function(file)
	{
		var parts = file.split(/\/|\\/);
		var name = parts[parts.length-1].split(".");
		if (name.length <= 1) {
			return false;
		}
		return name[name.length-1].toLowerCase();
	}	
});
Sortlist.implement(new Options);
Sortlist.implement(new Events);

function setSortables(){
	var w = document.getElementById('manager').contentWindow.document;
	var list = new Array(
		w.getElementById('fileList'), 
		w.getElementById('dirList')
	);
	new Sortlist('sortNameDiv', list, {type: 'name'});
	new Sortlist('sortTypeDiv', w.getElementById('fileList'), {type: 'ext'});
};
function resetManager(){
	setIcons(0);
	setHTML('fileDetails', '');
	setValue('itemsList', '');
};
var Scroll = {
	 /* This function from prototype.js, slightly modified.
	 *  (c) 2005 Sam Stephenson <sam@conio.net>
	 *  Prototype is freely distributable under the terms of an MIT-style license.
	 *  For details, see the Prototype web site: http://prototype.conio.net/
	/*--------------------------------------------------------------------------*/
	cumulativeOffset : function(el) {
		var valueT = 0, valueL = 0;
		do {
			valueT += el.offsetTop  || 0;
			valueL += el.offsetLeft || 0;
			el = el.offsetParent;
		} while (el);
		return [valueL, valueT];
	},
	/*This function from moo.fx.pack.js, slightly modified.
	* by Valerio Proietti (http://mad4milk.net) MIT-style LICENSE
	* for more info visit (http://moofx.mad4milk.net).
	*/
	doScroll : function(el) {
		var w = getObj('manager').contentWindow;
		var dest = this.cumulativeOffset(el)[1];
		var client = w.window.innerHeight || w.document.documentElement.clientHeight;
		var full = w.document.documentElement.scrollHeight;
		var top = w.window.pageYOffset || w.document.body.scrollTop || w.document.documentElement.scrollTop;
		if (dest+client > full) 
			var y = dest - client + (full-dest);
		else 
			var y = dest;
		
		w.window.scroll(0, y);
	}
};
function setupIframe(s){
	var path = '', file = '';
	if(s.indexOf(tinyMCE.getParam('document_base_url') != -1)){
		path = dirname(s).replace(makePath(tinyMCE.getParam('document_base_url'), jce.get('base_url')), '', 'g');
		if(path == ''){
			var cookie = Cookie.get("jce_" + jce.getPlugin() + '_dir');
			if(cookie){
				path = cookie;	
			}	
		}
		if(path.charAt(0) != '/') path = '/' + path;
		var file = basename(s);
	}
	window.setTimeout('createFileIFrame("' + path + '","' + file + '");', 10);	
};
function showNumFiles(elms)
{
    setHTML('fileDetails', '<div style="font-weight:bold">' + elms.length + ' ' + jce.getLang('files_select', false, 'files selected') + '.</div>');	
	setIcons(2);
    
    var dir = getDir();
    var names = new Array();
	var paths = new Array();
    for(var i=0; i<elms.length; i++){
		names[i] = getObj('manager').contentWindow.document.getElementById(elms[i].id).title;
		paths[i] = makePath(dir, names[i]);
    }
    setValue('itemsList', paths.join(','));
};
function showFolderDetails(id)
{
	setIcons(3);

	var dir = getDir();
    var name = getObj('manager').contentWindow.document.getElementById(id).title;
	var path = makePath(dir, name);

    var html = '';
    html += '<div style="font-weight:bold">' + name + '</div>';
    html += '<div>' + jce.getLang('folder', false, 'Folder') + '</div>';
   	setHTML('fileDetails', html);
    setValue('itemsList', path);
};
//File Search
function searchFile(s){
	setHTML('fileDetails', '');
	var elms = new Array();
	var w = getObj('manager').contentWindow;
	var c = w.document.getElementById('fileList').childNodes;
	
	for(var i = 0; i < c.length; i++){
		if(c[i].nodeName == 'DIV'){
			if(s != '' && c[i].title.substring(0, s.length) == s){
				elms.push(c[i]);
				jce.sf.selectItem(c[i]);
			}else{
				jce.sf.removeItem(c[i]);
			}
		}
	}
	if(elms.length > 1){
    	showNumFiles(elms);
	}
	if(elms.length == 1){
		showFileDetails(elms[0].id);	
	}
    if(elms.length > 0){
		Scroll.doScroll(w.document.getElementById(elms[0].id));
	}
	if(!s){
		w.window.scroll(0, 0);
		resetManager();
		jce.sf.selectNone();
	}	
};
function setReturnFile(file, sel){
	var w = getObj('manager').contentWindow.document;
	var elm = w.getElementById('fileList');
	if(elm){
		var child = ( elm.childNodes );
		for ( var i = 0; i < child.length; i++ ) {
			if( child[i].tagName == 'DIV' ){
				var v = child[i].getAttribute('title');
				var id = child[i].getAttribute('id');
				if( basename(file) == v ){
					jce.sf.selectItem(child[i]);
					Scroll.doScroll(w.getElementById(id));
					setValue('itemsList', file);
					if(sel){
						selectFile(id);	
					}
				}
			}
		}
	}
};