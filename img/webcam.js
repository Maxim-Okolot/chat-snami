function setquery(a,b,c,d,e) {
	for(b=/([^=?&]+)=([^&]*)/g,c={},e=decodeURIComponent;d=b.exec(a.replace(/\+/g,' '));c[e(d[1])]=e(d[2])); return c;}
var modalnom=0; var zznew=5;
function loadmodal(content,settings,test)
	{
		var obj,title,t,l,w,h,b,r,drug,res,ch_st_load,ch_st_close,minmax;
		var q=setquery(settings);
		if(q.obj) obj=q.obj; else obj="newmodal"+ ++modalnom;
		if(q.title) title=q.title; else title='Заголовок';
		if(q.res) res=q.res; else res='false';
		if(q.drug) drug=q.drug; else drug='false';
		if(q.minmax) minmax=q.minmax; else minmax='false';
		if(q.t) t=(parseFloat(q.t) + 'px'); else t="";
		if(q.l) l=(parseFloat(q.l) + 'px'); else l="";
		if(q.b) b=(parseFloat(q.b) + 'px'); else b="";
		if(q.r) r=(parseFloat(q.r) + 'px'); else r="";
		if(q.w) w=(parseFloat(q.w) + 'px'); else w="235px";
		if(q.h) h=(parseFloat(q.h) + 'px'); else h="200px";
		if(q.l && q.r) w="auto";
		if(q.t && q.b) h="auto";
		if(q.ch_st_load) ch_st_load=parseFloat(q.ch_st_load);
		if(q.ch_st_close) ch_st_close=parseFloat(q.ch_st_close);
		var obj1=document.getElementById(obj);
		var obj2="#"+obj;
		var dv='false';
		var speed='slow';
		var s_drug='cdiv_title';
		var tit_right=30;
		if(minmax=='true') tit_right+=19;
		tit_right+="px";
		var closebtn="<div onclick=\"loadmodal('','setting?obj="+obj+"');\" class='div_close'></div>"
		if(parseFloat(ch_st_close)>=0)  closebtn="<div onclick=\"parent.gettime=new Date().getTime(); parent.setstatus("+ch_st_close+"); loadmodal('','setting?obj="+obj+"');\" class='div_close'></div>"
		if(drug=='true') s_drug='ccdiv_title';
		var minim=""
		if(minmax=='true') minim="<div class='win_min_max'></div>";
		if(!obj1)
			{
				obj1=document.createElement('DIV');
				obj1.id=obj;
				obj1.className="cdiv_up";
				if(drug) obj1.className='cdiv_up ccdiv_up'
				document.getElementsByTagName("body")[0].appendChild(obj1);
				obj1.style.position="absolute";
				obj1.style.top="-100px";
				obj1.style.left="-4000px";
				obj1.style.width="2px";
				obj1.style.height="2px";
			}
		else
			{
				t=obj1.style.top;
				l=obj1.style.left;
				b=obj1.style.bottom;
				r=obj1.style.right;
				w=obj1.style.width;
				h=obj1.style.height;
			}
		if(!dv) speed='fast';
		$(obj2).hide(speed, function ()
			{				
						obj1.style.position="absolute";
						obj1.style.top=t;
						obj1.style.left=l;
						obj1.style.width=w;
						obj1.style.height=h;
						obj1.style.bottom=b;
						obj1.style.right=r;
				if(content=="")
					{
						var flashobj=document.getElementById("flash"+obj); if(flashobj) flashobj.close(); 
						obj1.innerHTML="&nbsp;";
						obj1.style.display="none";
						return;
					}
				obj1.innerHTML="<div class='cdiv_container' style='width: 100%; height: 100%; '><div class='cdiv_header'><div style='right:"+tit_right+"' class='"+s_drug+"'>"+title+"</div>"+closebtn+minim+"</div><div class='div_content'>"+content+"</div></div>";
				zznew++;
				$(obj2).css({ "z-index":zznew}); 
				$(obj2).show("slow", function(){if(test) test();});
				if(parseFloat(ch_st_load)>=0){ parent.gettime=new Date().getTime(); parent.setstatus(ch_st_load); }	
				if(res=='true') $(obj2).resizers();
				if(drug=='true') $(obj2).drugers('.ccdiv_title');
			});
	}

/* Ресайз и драг */
// создаём плагин druger
jQuery.fn.drugers = function(mover)
	{
		return this.each(function()
			{
				var me = jQuery(this);
				jQuery(mover).live('mousedown', function(e)
					{
						if(e.which!=1) return;
						var me = jQuery(this).parent().parent().parent();
						zznew=zznew+1; me.css('z-index',zznew);
						if (me.css("position")=="relative") return false;
						$('body').append('<div id="cdrugresisehelp" style="position:absolute; top:0px; bottom:0px; left:0px; right:0px;z-index:'+zznew+2+'; cursor:move;"></div>');
						if( e.preventDefault ) e.preventDefault(); 
						else e.returnValue = false;
						var ph = me.offset().top;
						var pw = me.offset().left;
						var h = me.height()+parseInt(me.css("border-top-width"))+parseInt(me.css("border-bottom-width"))+parseInt(me.css("padding-top"))+parseInt(me.css("padding-bottom"));
						var w = me.width()+parseInt(me.css("border-left-width"))+parseInt(me.css("border-right-width"))+parseInt(me.css("padding-left"))+parseInt(me.css("padding-right"));
						var y = e.clientY;
						var x = e.clientX;
						var moveHandler = function(e)
							{
								var nntop=Math.max(0, e.clientY + ph - y);
								var nnleft=Math.max(0, e.clientX + pw - x);
								if(nntop+h>=$(window).height()) nntop=$(window).height()-h;
								if(nnleft+w>=$(window).width()) nnleft=$(window).width()-w;
								me.offset({top:nntop, left:nnleft});
							};
						var upHandler = function(e) {$('#cdrugresisehelp').remove(); document.body.onselectstart = null;  jQuery('html').die('mousemove',moveHandler).die('mouseup',upHandler); };
						jQuery('html').live('mousemove', moveHandler).live('mouseup', upHandler);
					});
			});
	}
// создаём плагин resizer me.append('<div class="resizehandle"></div>');
jQuery.fn.resizers = function()
	{
		return this.each(function()
			{
				var me = jQuery(this);
				if (!me.children('.resizehandle').attr('class')) me.append('<div class="resizehandle"></div>');
				jQuery('.resizehandle').live('mousedown', function(e)
					{
						if(e.which!=1) return;
						var me = jQuery(this).parent();
						me.css({"max-width":"","max-height":""});
						zznew=zznew+1; me.css('z-index',zznew);
						if (me.css("position")=="relative") return false;
						$('body').append('<div id="drugresisehelp" style="position:absolute; top:0px; bottom:0px; left:0px; right:0px; z-index:'+zznew+2+';cursor:se-resize;"></div>');
						if( e.preventDefault ) e.preventDefault();
						else e.returnValue = false;
						var h = me.height();
						var w = me.width();
						var y = e.clientY;
						var x = e.clientX;
						var hpad = parseInt(me.css("border-top-width"))+parseInt(me.css("border-bottom-width"))+parseInt(me.css("padding-top"))+parseInt(me.css("padding-bottom"));
						var wpad = parseInt(me.css("border-left-width"))+parseInt(me.css("border-right-width"))+parseInt(me.css("padding-left"))+parseInt(me.css("padding-right"));
						var hmin = 135 -hpad;
						var wmin = 135 - wpad;
						me.offset({top:me.offset().top, left:me.offset().left});
						var ph = me.offset().top+hpad;
						var pw = me.offset().left+wpad;
						var moveHandler = function(e)
							{
								var nnh = Math.max(hmin, e.clientY + h - y);
								var nnw = Math.max(wmin, e.clientX + w - x);
								if(nnh+ph>=$(window).height()) nnh=$(window).height()-ph;
								if(nnw+pw >=$(window).width()) nnw=$(window).width()-pw;
								me.height(nnh);
								me.width(nnw);
							};
						var upHandler = function(e) {$('#drugresisehelp').remove(); document.body.onselectstart = null;  jQuery('html').die('mousemove',moveHandler).die('mouseup',upHandler); };
						jQuery('html').live('mousemove', moveHandler).live('mouseup', upHandler);
					});
			});
	}
//свернуть / развернуть
$(".win_min_max").live('mousedown',function(e)
	{
		if(e.which!=1) return;
		document.body.onselectstart = function() { return false; }
		var btn = $(this);
		var obj = btn.parent().parent().parent();
		
		//obj.css({"height":obj.height()+"px","width":obj.width()+"px","top":obj.offset().top+"px","left":obj.offset().left+"px","bottom":"auto","right":""});
		var b=document.getElementById(obj.attr('id')).style.bottom;
		var t=document.getElementById(obj.attr('id')).style.top;
		var l=document.getElementById(obj.attr('id')).style.left;
		var r=document.getElementById(obj.attr('id')).style.right;
		if(r && !l) obj.css({"left":obj.offset().left+"px","right":""});
		if(b && !t) obj.css({"top":obj.offset().top+"px","bottom":""});
		
		var tt = '';
		if(obj.children(".cdiv_container").children(".cdiv_header").children(".cdiv_title").attr('class')) tt=obj.children(".cdiv_container").children(".cdiv_header").children(".cdiv_title");
		else tt=obj.children(".cdiv_container").children(".cdiv_header").children(".ccdiv_title");
		var hpad = parseInt(tt.css("border-top-width"))+parseInt(tt.css("border-bottom-width"))+parseInt(tt.css("padding-top"))+parseInt(tt.css("padding-bottom"));
		var wpad = parseInt(obj.css("border-left-width"))+parseInt(obj.css("border-right-width"))+parseInt(obj.css("padding-left"))+parseInt(obj.css("padding-right"));
		var wmin = 135 - wpad;
		var ttpadh =parseInt(tt.css("height"))+hpad;
		var ttpadw =parseInt(tt.css("width"));
		if(!parseInt(obj.css("min-width")) || parseInt(obj.css("min-width"))>=ttpadw)
			obj.css("min-width",wmin,+"px");
		obj.css("min-height",ttpadh+"px");
		if (parseInt(obj.css("min-height"))>=parseInt(obj.css("height")))
			{ 
				obj.css({"height":obj.css("max-height"),"width":obj.css("max-width"),"min-height":"","min-width":""});
				
				if(parseInt(obj.css("max-height")))
					{
						if(parseInt(obj.outerHeight())+parseInt(obj.offset().top)>=parseInt($(window).height()))
							obj.offset({top:parseInt($(window).height())-parseInt(obj.outerHeight())});
						if(parseInt(obj.offset().top)<0)
							obj.offset({top:0});
						if(parseInt(obj.outerHeight())+parseInt(obj.offset().top)>parseInt($(window).height()))
							{obj.css({"top":"0px","height":"","bottom":"0px"});}
						else obj.css({"max-height":"","bottom":""});
					}
				else obj.css({"height":""});
				if(parseInt(obj.css("max-width")))
					{
						if(parseInt(obj.outerWidth())+parseInt(obj.offset().left)>=parseInt($(window).width()))
							obj.offset({left:parseInt($(window).width())-parseInt(obj.outerWidth())});
						if(parseInt(obj.offset().left)<0) obj.offset({left:0});
						if(parseInt(obj.outerWidth())+parseInt(obj.offset().left)>parseInt($(window).width()))
							{obj.css({"left":"0px","width":"","right":"0px"});}
						else obj.css({"max-width":"","right":""});
					}
				else obj.css({"width":""});
				if(obj.children(".resizehandle")) obj.children(".resizehandle").css("display","block");
				obj.children(".cdiv_container").children(".div_content").css("overflow","inherit");
			}
		else
			{
				if(!(r && l)) obj.css({"max-width":obj.css("width")});
				if(!(t && b)) obj.css({"max-height":obj.css("height")});
				obj.css({"height":obj.css("min-height"),"width":obj.css("min-width")});
				if(parseInt(obj.offset().top)<0)
					obj.offset({top:0});
				if(parseInt(obj.offset().left)<0)
					obj.offset({left:0});
				if(obj.children(".resizehandle")) obj.children(".resizehandle").css("display","none");
				obj.children(".cdiv_container").children(".div_content").css("overflow","hidden");
			}
	}).live('mouseup',function() { document.body.onselectstart = null; });
/* удаление элемента по ID */
function deletewid(id)
	{
		var tr=document.getElementById(id);
		var par = tr.parentNode;
		par.removeChild(tr); 
	}
//закрытие вебкамеры у просматривающих
function close_webcam(web_nick)
	{
		var vata = 'webcam'+web_nick;
		vata = vata.replace(/[@]/g,"sabakaka").replace(/[®]/g,"righkaka").replace(/[©]/g,"copykaka").replace(/[™]/g,"tmkaka");
		if (document.getElementById(vata)) deletewid(vata);
	}
//запуск камер
function loadvideo(obj,host,share,rec,key)
	{
		var obj1=document.getElementById(obj);
		var objid = obj.replace(/[@]/g,"sabakaka").replace(/[®]/g,"righkaka").replace(/[©]/g,"copykaka").replace(/[™]/g,"tmkaka");
		if(host=="")
			{
				if(obj1)
					{
						var flashobj=document.getElementById("flash"+obj); if(flashobj) flashobj.close(); 
						obj1.innerHTML="&nbsp;";
						obj1.style.display="none";
					}
			}
		else
			{
				var sharekey="";
				var nickid=0;
				if(share)
					{
						sharekey=share;
						if(key) sharekey+="_"+key;
						for(var i=0; i< sharekey.length; i++) nickid=(nickid*31+sharekey.charCodeAt(i))|0; nickid=Math.abs(nickid);
					}
				var camid="mpchat-"+parent.chatlogin+"_"+nickid;
				var streamtitle="Просмотр: "+share;
				var closestream="";
				if(rec)
					{
						streamtitle="<font color=#000000>Моя Камера</font>";
						closestream="&ch_st_close=0";
					}	else
					parent.hidden.location.href = "index.php?inc=write&"+ parent.yourkey+"&text=/privat "+ share +": iseeyourcam";			
				var flashw="100%";
				var flashh="100%";
				var flashvars='host='+host+'&m=4&q=80&r=12&sharefile='+camid+'&sharelive='+camid+'&shareplay='+camid;
				if(!(/MSIE/i).test(navigator.userAgent)) flashvars+='&buf=0.1';
				if(rec==1) flashvars+='&rec=1';
				loadmodal("<div id='flash"+obj+"'><a href='http://get.adobe.com/flashplayer/' target='_blank'><font size='1'>Установите Flash Player!</font></a><br></div>","setting?obj="+objid+"&title="+streamtitle+"&t=100&l=400&w=235&h=200&minmax=true&drug=true&res=true"+closestream, function(){swfobject.embedSWF("webcam.swf", "flash"+obj, flashw, flashh, "9", "http://mpchat.com/blank/expressInstall.swf", {}, {allowfullscreen:"true",wmode:"transparent",flashvars:flashvars},{});});
			}		
	}
