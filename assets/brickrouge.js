!function(){function n(t){var n=t.get(e);if(!n)throw new Error("The "+e+" attribute is not defined.");var r=Brickrouge.Widget[n];if(!r)throw new Error("Undefined constructor: "+n);t.store("widget",!0);var i=new r(t,t.get("dataset"));return t.store("widget",i),i}function r(e){e=e||document.body;var r=e.getElements(t),i=[];e.match(t)&&r.unshift(e),r.reverse().each(function(e){if(e.retrieve("widget"))return;n(e),i.push(e)}),i.length&&window.fireEvent("brickrouge.construct",{constructed:i})}var e="data-widget-constructor",t="["+e+"]";Element.Properties.widget={get:function(){var e=this.retrieve("widget");return e||(e=n(this),window.fireEvent("brickrouge.construct",{constructed:[this]})),e}};var i=function(){var e=null,t=null;return function(n,r){var i=new Array,s=new Array,o;e===null&&(e=[],typeof brickrouge_cached_css_assets!="undefined"&&(e=brickrouge_cached_css_assets),document.id(document.head).getElements('link[type="text/css"]').each(function(t){e.push(t.get("href"))})),t===null&&(t=[],typeof brickrouge_cached_js_assets!="undefined"&&(t=brickrouge_cached_js_assets),document.id(document.html).getElements("script").each(function(e){var n=e.get("src");n&&t.push(n)})),n.css.each(function(t){if(e.indexOf(t)!=-1)return;i.push(t)}),i.each(function(t){new Asset.css(t),e.push(t)}),n.js.each(function(e){if(t.indexOf(e)!=-1)return;s.push(e)}),o=s.length;if(!o){r();return}s.each(function(e){new Asset.javascript(e,{onload:function(){t.push(e),--o||r()}})})}}();this.Brickrouge={Utils:{Busy:new Class({startBusy:function(){if(++this.busyNest==1)return;this.element.addClass("busy")},finishBusy:function(){if(--this.busyNest)return;this.element.removeClass("busy")}})},Widget:{},updateDocument:function(e){e=e||document.body,window.fireEvent("brickrouge.update",{target:e}),r(e)},updateAssets:i}}(),Request.API&&(Request.Element=new Class({Extends:Request.API,onSuccess:function(e,t){var n=Elements.from(e.rc).shift();if(!e.assets){this.parent(n,e,t);return}Brickrouge.updateAssets(e.assets,function(){this.fireEvent("complete",[e,t]).fireEvent("success",[n,e,t]).callChain()}.bind(this))}}),Request.Widget=new Class({Extends:Request.Element,initialize:function(e,t,n){n==undefined&&(n={}),n.url="widgets/"+e,n.onSuccess=t,this.parent(n)}})),Element.Properties.dataset={get:function(){var e={},t=this.attributes,n=0,r=t.length,i;for(;n<r;n++){i=t[n];if(!i.name.match(/^data-/))continue;e[i.name.substring(5).camelCase()]=i.value}return e}},document.id(document.body),Browser.ie&&document.body.addEvent("click",function(e){window.fireEvent("click",e)}),window.addEvent("domready",function(){Brickrouge.updateDocument(document.body)}),Brickrouge.Form=new Class({Implements:[Options,Events],options:{url:null,useXHR:!1,replaceOnSuccess:!1},initialize:function(e,t){this.element=document.id(e),this.setOptions(t),(this.options.useXHR||t&&(t.onRequest||t.onComplete||t.onFailure||t.onSuccess))&&this.element.addEvent("submit",function(e){e.stop(),this.submit()}.bind(this))},alert:function(e,t){var n=e,r=this.element.getElement("div.alert-"+t)||new Element("div.alert.alert-"+t,{html:'<a href="#close" class="close">×</a>'});typeOf(e)=="string"?e=[e]:typeOf(e)=="object"&&(e=[],Object.each(n,function(t,n){if(typeOf(n)=="string"&&n!="_base"){var r,i,s=document.id(this.element.elements[n]),o;if(typeOf(s)=="collection"){r=document.id(s[0]).getParent("div.radio-group"),i=r.getParent(".field");if(r)r.addClass("error");else for(o=0,j=s.length;o<j;o++)document.id(s[o]).addClass("error")}else s.addClass("error"),i=s.getParent(".field");i&&i.addClass("error")}if(!t||t===!0)return;e.push(t)},this));if(!e.length)return;e.each(function(e){r.adopt(new Element("p",{html:e}))}),this.insertAlert(r)},insertAlert:function(e){e.hasClass("alert-success")&&this.options.replaceOnSuccess?(e.inject(this.element,"before"),this.element.addClass("hidden")):e.getParent()||e.inject(this.element,"top")},clearAlert:function(){var e=this.element.getElements("div.alert");e&&e.destroy(),this.element.getElements(".error").removeClass("error")},submit:function(){this.fireEvent("submit",{}),this.getOperation().send(this.element)},getOperation:function(){return this.operation?this.operation:this.operation=new Request.JSON({url:this.options.url||this.element.action,onRequest:this.request.bind(this),onComplete:this.complete.bind(this),onSuccess:this.success.bind(this),onFailure:this.failure.bind(this)})},request:function(){this.clearAlert(),this.fireEvent("request",arguments)},complete:function(){this.fireEvent("complete",arguments)},success:function(e){e.success&&this.alert(e.success,"success"),this.onSuccess(e)},onSuccess:function(e){this.fireEvent("success",arguments)},failure:function(e){try{var t=JSON.decode(e.responseText);t&&t.errors&&this.alert(t.errors,"error"),t.exception&&alert(t.exception)}catch(n){}this.fireEvent("failure",arguments)}}),Brickrouge.Form.STORED_KEY_NAME="_brickrouge_form_key",document.body.addEvent("click:relay(.alert a.close)",function(e,t){var n=t.getParent("form");e.stop(),n&&n.getElements(".error").removeClass("error"),t.getParent(".alert").destroy()}),!function(){function n(){$$(e).getParent().removeClass("open")}function r(){var e=this.get("data-target")||this.get("href"),t=document.id(e)||this.getParent(),r;return r=t.hasClass("open"),n(),!r&&t.toggleClass("open"),!1}var e='[data-toggle="dropdown"]',t=!1;window.addEvent("click:relay("+e+")",function(e,n){if(e.rightClick)return;e.stop(),t=!0,r.apply(n)}),window.addEvent("click",function(e){if(t){t=!1;return}n()})}(),document.body.addEvent("click:relay(.tabbable .nav-tabs a)",function(e,t){var n=t.get("href"),r,i;if(n=="#"){var s=t.getParent(".nav-tabs").getElements("a").indexOf(t);r=t.getParent(".tabbable").getElement(".tab-content").getChildren()[s]}else r=document.id(n.substring(1));e.preventDefault();if(!r)throw new Error("Invalid pane id: "+n);i=t.getParent(".nav-tabs").getFirst(".active"),i&&i.removeClass("active"),t.getParent("li").addClass("active"),i=r.getParent(".tab-content").getFirst(".active"),i&&i.removeClass("active"),r.addClass("active")}),Brickrouge.Popover=new Class({Implements:[Events,Options],options:{anchor:null,animate:!1,placement:null,visible:!1,fitContent:!1,loveContent:!1,iframe:null},initialize:function(e,t){this.element=document.id(e),this.setOptions(t),this.arrow=this.element.getElement(".arrow"),this.actions=this.element.getElement(".popover-actions"),this.repositionCallback=this.reposition.bind(this,!1),this.quickRepositionCallback=this.reposition.bind(this,!0),e=this.element,t=this.options,this.iframe=t.iframe,t.anchor&&this.attachAnchor(t.anchor),this.tween=null,t.animate&&(this.tween=new Fx.Tween(e,{property:"opacity",link:"cancel",duration:"short"})),(t.fitContent||t.loveContent)&&e.addClass("fit-content"),t.loveContent&&e.addClass("love-content"),e.addEvent("click:relay(.popover-actions [data-action])",function(e,t){this.fireAction({action:t.get("data-action"),popover:this,event:e})}.bind(this)),t.visible&&this.show()},fireAction:function(e){this.fireEvent("action",arguments)},attachAnchor:function(e){this.anchor=document.id(e),this.anchor||(this.anchor=document.body.getElement(e)),this.reposition(!0)},changePlacement:function(e){this.element.removeClass("before").removeClass("after").removeClass("above").removeClass("below").addClass(e)},show:function(){this.element.setStyles({display:"block",visibility:"hidden"}),window.addEvents({load:this.quickRepositionCallback,resize:this.quickRepositionCallback,scroll:this.repositionCallback}),this.iframe&&document.id(this.iframe.contentWindow).addEvents({load:this.quickRepositionCallback,resize:this.quickRepositionCallback,scroll:this.repositionCallback}),document.body.appendChild(this.element),Brickrouge.updateDocument(this.element),this.reposition(!0),this.options.animate?(this.tween.set(0),this.element.setStyle("visibility","visible"),this.tween.start(1)):this.element.setStyle("visibility","visible")},hide:function(){var e=function(){this.element.setStyle("display",""),this.element.dispose()}.bind(this);window.removeEvent("load",this.quickRepositionCallback),window.removeEvent("resize",this.quickRepositionCallback),window.removeEvent("scroll",this.repositionCallback);if(this.iframe){var t=document.id(this.iframe.contentWindow);t.removeEvent("load",this.quickRepositionCallback),t.removeEvent("resize",this.quickRepositionCallback),t.removeEvent("scroll",this.repositionCallback)}this.options.animate?this.tween.start(0).chain(e):e()},isVisible:function(){return this.element.getStyle("visibility")=="visible"&&this.element.getStyle("display")!="none"},computeAnchorBox:function(){var e=this.anchor,t,n=this.iframe,r,i,s,o,u,a;return n?(r=n.getCoordinates(),i=n.contentDocument.documentElement,aX=e.offsetLeft,aY=e.offsetTop,aW=e.offsetWidth,aH=e.offsetHeight,s=i.clientHeight,u=i.scrollTop,aY-=u,aY<0&&(aH+=aY),aY=Math.max(aY,0),aH=Math.min(aH,s),o=i.clientWidth,a=i.scrollLeft,aX-=a,aX<0&&(aW+=aX),aX=Math.max(aX,0),aW=Math.min(aW,o),aX+=r.left,aY+=r.top):(t=e.getCoordinates(),aX=t.left,aY=t.top,aH=t.height,aW=t.width),{x:aX,y:aY,w:aW,h:aH}},computeBestPlacement:function(e,t,n){function l(){return s+1>t+f*2}function c(){return i-(s+1+u)>t+f*2}function h(){return o+1>n+f*2}var r=document.body.parentNode,i=r.scrollWidth,s=e.x,o=e.y,u=e.w,a,f=20;a=this.options.placement;switch(a){case"after":if(c())return a;break;case"before":if(l())return a;break;case"above":if(h())return a;break;case"below":return a}return c()?"after":l()?"before":h()?"above":"below"},reposition:function(e){if(!this.anchor)return;e===undefined&&(e=this.element.getStyle("visibility")!="visible");var t=20,n=this.actions,r,i,s,o,u,a,f,l=this.element.getSize(),c=l.x,h=l.y,p,d,v,m=document.id(document.body),g=m.getSize(),y=m.getScroll(),b=y.x,w=y.y,E=g.x,S=g.y,x={top:null,left:null},T,N;r=this.computeAnchorBox(),i=r.x,s=r.y,o=r.w,u=r.h,a=i+o/2-1,f=s+u/2-1,v=this.computeBestPlacement(r,c,h),this.changePlacement(v),v=="before"||v=="after"?(d=Math.round(s+(u-h)/2-1),p=v=="before"?i-c+1:i+o-1,p=p.limit(b+t-1,b+E-(c+t)-1),d=d.limit(w+t-1,w+S-(h+t)-1)):(p=Math.round(i+(o-c)/2-1),d=v=="above"?s-h+1:s+u-1,p=p.limit(b+t-1,b+E-(c+t)-1)),h>t*2&&(v=="before"||v=="after"?(N=s+u/2-1-d,N=Math.min(h-(n?n.getSize().y:t)-10,N),N=Math.max(t,N),N+d-1!=f&&(d-=d+N-f),x.top=N):(T=(i+o/2-1-p).limit(t,c-t),T+c-1!=a&&(p-=p+T-a),x.left=T)),e?(this.element.setStyles({left:p,top:d}),this.arrow.setStyles(x)):(this.element.morph({left:p,top:d}),this.arrow.morph(x))}}),Brickrouge.Popover.from=function(e){var t,n=e.title,r=e.content,i=e.actions,s=new Element("div.popover-inner");return n&&s.adopt(new Element("h3.popover-title",{html:n})),typeOf(r)=="string"?s.adopt(new Element("div.popover-content",{html:r})):(s.adopt((new Element("div.popover-content")).adopt(r)),e.fitContent===undefined&&(e.fitContent=!0)),i=="boolean"&&(i=[new Element('button.btn.btn-cancel[data-action="cancel"]',{html:Locale.get("Popover.cancel")||"Cancel"}),new Element('button.btn.btn-primary[data-action="ok"]',{html:Locale.get("Popover.ok")||"Ok"})]),i&&s.adopt((new Element("div.popover-actions")).adopt(i)),t=(new Element("div.popover")).adopt([new Element("div.arrow"),s]),new Brickrouge.Popover(t,e)},Brickrouge.Widget.Popover=Brickrouge.Popover,document.body.addEvents({'mouseenter:relay([rel="popover"])':function(e,t){var n=t.retrieve("popover"),r;n||(r=t.get("dataset"),r.anchor=t,n=Brickrouge.Popover.from(r),t.store("popover",n)),n.show()},'mouseleave:relay([rel="popover"])':function(e,t){var n=t.retrieve("popover");if(!n)return;n.hide()}}),!function(){var e=[];Brickrouge.Tooltip=new Class({Implements:[Options],options:{animation:!0,placement:"top",selector:!1,template:'<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover",title:"",delay:0,html:!0},initialize:function(e,t){this.setOptions(t),this.anchor=document.id(e),this.element=Elements.from(this.options.template).shift(),this.setContent(e.get("data-tooltip-content"))},setContent:function(e){this.element.getElement(".tooltip-inner").set(this.options.html?"html":"text",e),["fade","in","top","bottom","left","right"].each(this.element.removeClass,this.element)},getPosition:function(e){var t=this.anchor,n=0,r=0,i=t.offsetWidth,s=t.offsetHeight;if(!e){var o=t.getPosition();n=o.y,r=o.x}if(t.tagName=="AREA"){var u=null,a=null,f=null,l=null,c=t.getParent(),h=c.id||c.name,p=document.body.getElement('[usemap="#'+h+'"]');o=p.getPosition(),n=o.y,r=o.x,t.coords.match(/\d+\s*,\s*\d+/g).each(function(e){var t=e.match(/(\d+)\s*,\s*(\d+)/),n=t[1],r=t[2];u=u===null?n:Math.min(u,n),a=a===null?n:Math.max(a,n),f=f===null?r:Math.min(f,r),l=l===null?r:Math.max(l,r)}),n+=f,r+=u,i=a-u+1,s=l-f+1}return Object.append({},{y:n,x:r},{width:i,height:s})},show:function(){var t=this.element,n=this.options,r=n.placement,i,s,o,u,a={};n.animation&&t.addClass("fade"),typeOf(r)=="function"&&(r=r.call(this,t,anchor)),i=/in/.test(r),t.dispose().setStyles({top:0,left:0,display:"block"}).inject(i?this.anchor:document.body),o=t.offsetWidth,u=t.offsetHeight,s=this.getPosition(i);switch(i?r.split(" ")[1]:r){case"bottom":a={top:s.y+s.height,left:s.x+s.width/2-o/2};break;case"top":a={top:s.y-u,left:s.x+s.width/2-o/2};break;case"left":a={top:s.y+s.height/2-u/2,left:s.x-o};break;case"right":a={top:s.y+s.height/2-u/2,left:s.x+s.width}}e.unshift(this),t.setStyles(a).addClass(r).addClass("in")},hide:function(){var t=this.element;e.erase(this),t.removeClass("in"),t.dispose()}}),Brickrouge.Tooltip.hideAll=function(){Array.slice(e).each(function(e){e.hide()})}}(),document.body.addEvent("mouseenter:relay([data-tooltip-content])",function(e,t){var n=t.retrieve("tooltip");n||(n=new Brickrouge.Tooltip(t,Brickrouge.extractDataset(t,"tooltip")),t.store("tooltip",n)),n.show()}),document.body.addEvent("mouseleave:relay([data-tooltip-content])",function(e,t){try{t.retrieve("tooltip").hide()}catch(n){}}),Brickrouge.Widget.Searchbox=new Class({Implements:Brickrouge.Utils.Busy,initialize:function(e,t){this.element=document.id(e)}}),Brickrouge.Carousel=new Class({Implements:[Options,Events],options:{autodots:!1,autoplay:!1,delay:6e3,method:"fade"},initialize:function(e,t){this.element=e=document.id(e),this.setOptions(t),this.inner=e.getElement(".carousel-inner"),this.slides=this.inner.getChildren(),this.limit=this.slides.length,this.position=0,this.timer=null,this.options.method&&(this.setMethod(this.options.method),this.method.initialize&&this.method.initialize.apply(this)),this.options.autodots&&this.setDots(this.slides.length),this.dots=e.getElements(".carousel-dots .dot"),this.dots.length||(this.dots=null),this.dots&&this.dots[0].addClass("active"),e.addEvents({'click:relay([data-slide="prev"])':function(e){e.stop(),this.prev()}.bind(this),'click:relay([data-slide="next"])':function(e){e.stop(),this.next()}.bind(this),"click:relay([data-position])":function(e,t){e.stop(),this.setPosition(t.get("data-position"))}.bind(this),"click:relay([data-link])":function(e,t){var n=t.get("data-link");if(!n)return;document.location=n},mouseenter:this.pause.bind(this),mouseleave:this.resume.bind(this)}),this.resume()},setDots:function(e){var t=new Element("div.carousel-dots"),n=this.element.getElement(".carousel-dots");for(var r=0;r<e;r++)t.adopt(new Element("div.dot",{html:"&bull;","data-position":r}));n?t.replaces(n):this.element.adopt(t)},setMethod:function(e){if(typeOf(e)=="string"){var t=Brickrouge.Carousel.Methods[e];if(t===undefined)throw new Error("Carousel method is not defined: "+e);e=t}this.method=e,e.next&&(this.next=e.next),e.prev&&(this.prev=e.prev)},play:function(){if(this.timer)return;this.timer=function(){this.setPosition(this.position+1)}.periodical(this.options.delay,this),this.fireEvent("play",{position:this.position,slide:this.slides[this.position]})},pause:function(){if(!this.timer)return;clearInterval(this.timer),this.timer=null,this.fireEvent("pause",{position:this.position,slide:this.slides[this.position]})},resume:function(){if(!this.options.autoplay)return;this.play()},setPosition:function(e,t){e%=this.limit;if(e==this.position)return;this.method.go.apply(this,[e,t]),this.dots&&(this.dots.removeClass("active"),this.dots[e].addClass("active")),this.fireEvent("position",{position:this.position,slide:this.slides[this.position]})},prev:function(){this.setPosition(this.position?this.position-1:this.limit-1,-1)},next:function(){this.setPosition(this.position==this.limit?0:this.position+1,1)}}),Brickrouge.Carousel.Methods={fade:{initialize:function(){this.slides.each(function(e,t){e.setStyles({left:0,top:0,position:"absolute",opacity:t?0:1,visibility:t?"hidden":"visible"})})},go:function(e){var t=this.slides[this.position],n=this.slides[e];n.setStyles({opacity:0,visibility:"visible"}).inject(t,"after").fade("in"),this.position=e}},slide:{initialize:function(){var e=this.inner.getSize(),t=e.x,n=e.y,r=new Element("div",{styles:{position:"absolute",left:0,top:0,width:t*2,height:n}});this.w=t,this.h=n,this.view=r,r.adopt(this.slides),r.set("tween",{property:"left",onComplete:Brickrouge.Carousel.Methods.slide.onComplete.bind(this)}),this.slides.each(function(e,n){e.setStyles({position:"absolute",left:t*n,top:0}),n&&e.setStyle("display","none")}),this.inner.adopt(r)},go:function(e,t){var n=this.slides[e],r=this.slides[this.position];t||(t=e-this.position),this.view.setStyle("left",0),r.setStyle("left",0),n.setStyles({display:"",left:t>0?this.w:-this.w}),this.view.tween(t>0?-this.w:this.w),this.position=e},onComplete:function(e){var t=this.slides[this.position];this.slides.each(function(e){if(e==t)return;e.setStyle("display","none")})}},columns:{initialize:function(){this.working=!1,this.fitting=0,this.childWidth=0;var e=0,t=0,n=0,r=this.element.getSize().x;this.view=new Element("div",{styles:{position:"absolute",top:0,left:0,height:this.element.getStyle("height")}}),this.view.adopt(this.slides),this.view.inject(this.inner),this.view.set("tween",{property:"left"}),this.slides.each(function(r){r.get("data-url")&&r.setStyle("cursor","pointer");var i=r.getSize().x+r.getStyle("margin-left").toInt()+r.getStyle("margin-right").toInt();r.setStyles({position:"absolute",top:0,left:e}),e+=i,t+=i,n=Math.max(n,i)},this),this.childWidth=n,this.fitting=(r/n).floor(),this.view.setStyle("width",t)},go:function(e){var t=this.limit,n=this.position-e,r=null,i=0;if(this.working)return;this.working=!0,r=n<0?this.position+this.fitting:this.position-n,r<0?r=t+r:r>t-1&&(r-=t),e<0?e=t-n:e%=t,this.position=e,i=n<0?this.childWidth*this.fitting:-this.childWidth,this.slides[r].setStyle("left",i),this.view.get("tween").start(this.childWidth*n).chain(function(){var n=e,r=0,i=this.childWidth;for(;n<t;n++,r+=i)this.slides[n].setStyle("left",r);for(n=0;n<e;n++,r+=i)this.slides[n].setStyle("left",r);this.view.setStyle("left",0),this.working=!1}.bind(this))},next:function(){this.setPosition(this.position+1)},prev:function(){this.setPosition(this.position-1)}}},Brickrouge.Widget.Carousel=new Class({Extends:Brickrouge.Carousel})