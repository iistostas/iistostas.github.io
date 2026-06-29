(function(){
function H(s){var h=2166136261;for(var i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619);}return ("00000000"+(h>>>0).toString(16)).slice(-8);}
function esc(s){return String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");}
function canvasFP(){try{var c=document.createElement("canvas");c.width=260;c.height=64;var x=c.getContext("2d");
  x.textBaseline="top";x.font="16px 'Arial'";x.fillStyle="#f60";x.fillRect(2,2,150,24);
  x.fillStyle="#069";x.fillText("BitBrowser fp 比特浏览器 1.0",6,4);
  x.fillStyle="rgba(0,128,160,0.7)";x.fillText("BitBrowser fp 比特浏览器 1.0",8,18);
  return H(c.toDataURL());}catch(e){return "na";}}
function webgl(){try{var c=document.createElement("canvas");var g=c.getContext("webgl")||c.getContext("experimental-webgl");
  if(!g)return["na","na"];var d=g.getExtension("WEBGL_debug_renderer_info");
  var v=d?g.getParameter(d.UNMASKED_VENDOR_WEBGL):g.getParameter(g.VENDOR);
  var r=d?g.getParameter(d.UNMASKED_RENDERER_WEBGL):g.getParameter(g.RENDERER);
  return[String(v),String(r)];}catch(e){return["na","na"];}}
function fontsCount(){try{var base=["monospace","sans-serif","serif"];
  var list=["Arial","Verdana","Times New Roman","Courier New","Georgia","Comic Sans MS","Tahoma","Impact",
            "Trebuchet MS","Arial Black","Microsoft YaHei","SimSun","SimHei","KaiTi","MS Gothic","Meiryo",
            "Yu Gothic","Malgun Gothic","Calibri","Cambria","Consolas","Segoe UI","Roboto","Helvetica Neue",
            "Palatino Linotype","Garamond","Franklin Gothic Medium","Century Gothic","Lucida Console"];
  var s=document.createElement("span");s.style.cssText="position:absolute;left:-9999px;top:-9999px;font-size:72px";
  s.textContent="mmmmmmmmmmlli__";document.body.appendChild(s);
  var def={};for(var i=0;i<base.length;i++){s.style.fontFamily=base[i];def[base[i]]=[s.offsetWidth,s.offsetHeight];}
  var n=0;for(var j=0;j<list.length;j++){var hit=false;for(var k=0;k<base.length;k++){
    s.style.fontFamily="'"+list[j]+"',"+base[k];
    if(s.offsetWidth!==def[base[k]][0]||s.offsetHeight!==def[base[k]][1]){hit=true;break;}}
    if(hit)n++;}
  document.body.removeChild(s);return n;}catch(e){return 0;}}
function audioRate(){try{var A=window.AudioContext||window.webkitAudioContext;if(!A)return "na";
  var c=new A();var r=c.sampleRate;if(c.close)c.close();return String(r);}catch(e){return "na";}}
function run(){
  var L=window.FPL||{};var D=L.dim||{};
  var nav=navigator,scr=screen;
  var wg=webgl();
  var tz="na";try{tz=Intl.DateTimeFormat().resolvedOptions().timeZone||"na";}catch(e){}
  var langs="na";try{langs=(nav.languages||[nav.language]).join(",");}catch(e){langs=nav.language||"na";}
  var rows=[
    ["ua",nav.userAgent],
    ["platform",nav.platform||"na"],
    ["langs",langs],
    ["screen",scr.width+"x"+scr.height+" @"+(scr.colorDepth||"?")+"bit, dpr "+(window.devicePixelRatio||1)],
    ["tz",tz],
    ["cpu",(nav.hardwareConcurrency!=null?nav.hardwareConcurrency:"na")],
    ["mem",(nav.deviceMemory!=null?nav.deviceMemory+" GB":"na")],
    ["touch",(nav.maxTouchPoints!=null?nav.maxTouchPoints:"na")],
    ["canvas",canvasFP()],
    ["webglv",wg[0]],
    ["webglr",wg[1]],
    ["fonts",String(fontsCount())],
    ["audio",audioRate()],
    ["cookie",(nav.cookieEnabled?(L.yes||"yes"):(L.no||"no"))],
    ["dnt",(nav.doNotTrack||window.doNotTrack||"na")]
  ];
  var blob=rows.map(function(r){return r[0]+"="+r[1];}).join("|");
  var id=H(blob)+H(blob.split("").reverse().join(""));
  var html='<div class="tool"><div class="k">'+esc(L.idlbl||"Fingerprint ID")+'</div>'+
           '<div class="fpid">'+esc(id)+'</div>'+
           '<div class="note">'+esc(L.uniq||"Uniqueness")+': '+esc(L.uniqval||"")+'</div></div>';
  for(var i=0;i<rows.length;i++){
    html+='<div class="row"><span class="k">'+esc(D[rows[i][0]]||rows[i][0])+'</span>'+
          '<span class="v">'+esc(rows[i][1])+'</span></div>';
  }
  document.getElementById("fp").innerHTML=html;
}
var b=document.getElementById("run");if(b)b.addEventListener("click",run);
})();
