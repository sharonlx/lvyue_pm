const windowReady = (callback) => {
    if(document.addEventListener) {
        document.addEventListener("DOMContentLoaded", callback, false);
        window.addEventListener("load", callback, false);
    } else {
        document.attachEvent("onreadystatechange", callback);
        window.attachEvent("onload", callback);
    }
}

export default () => {

return (function(){

    var GA = function(){
        this.param = {};
    };

    var cache = null,
        domains = document.location.host.split("."),
        commonDomain = domains.slice(domains.length - (domains[0] !== "www" ? 3 : 2)).join('.'),
        BI_REG = /(?:^|; )(bi[^=]+)=([^;]*)/ig;

    GA.prototype.cookie = function( key , value , options ){

        if (arguments.length > 1 && String(value) !== "[object Object]") {
            options = options || {};

            if (value === null || value === undefined) {
                options.expires = -1;
            }

            if (typeof options.expires === 'number') {
                var days = options.expires, t = options.expires = new Date();
                t.setDate(t.getDate() + days);
            }

            value = String(value);

            return (document.cookie = [
                encodeURIComponent(key), '=',
                options.raw ? value : encodeURIComponent(value),
                options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                options.path ? '; path=' + options.path : '; path=/',
                options.domain ? '; domain=' + options.domain : '',
                options.secure ? '; secure' : ''
            ].join(''));
        }

        // key and possibly options given, get cookie...
        options = value || {};
        var result, decode = options.raw ? function (s) { return s; } : decodeURIComponent;
        return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null;

    };

    GA.prototype.add = function(key,value){
        if ( value != null ) {
            this.param[key] = value;
        }
    };

    GA.prototype.getHashString = function(key){
        var uri = window.location.hash.toString();
        var re = new RegExp("" +key+ "=([^&?]*)", "ig");
        return ((uri.match(re))?decodeURIComponent((uri.match(re)[0].substr(key.length+1))):"");
    };

    GA.prototype.getQueryString = function(key){
        var uri = window.location.search.toString();
        var re = new RegExp("" +key+ "=([^&?]*)", "ig");
        return ((uri.match(re))?decodeURIComponent((uri.match(re)[0].substr(key.length+1))):"");
    };

    GA.prototype.send = function(){
        var l = this.get_location();
        var img = new Image();
        img.src = "http://bc.qunar.com/" + l + "?" + this._collect_params();
    };

    GA.prototype._collect_params = function(){
        var s = [];
        var p = this.param;
        for( var k in p ) {
            s.push( k + '=' + encodeURIComponent(p[k]) );
        }
        return s.join('&');
    };

    GA.prototype.getDomain = function( _domain ){
        return (_domain||"").replace(/^.+\.(.+?\..+)$/,'$1');
    };

    GA.prototype.get_location = function(){
        return 'tg';
    };

    GA.prototype.getReferrer = function(refer){
        var referrer;
        if(cache && refer){
            var temp = cache;
            cache = refer;
            return temp;
        }
        !cache && refer && (cache = refer);
        referrer = document.referrer;

        //IE8下window.open会丢失referrer信息, 同域名下通过该方式获取来源url
        if(!referrer && window.opener){
            try{
                referrer = window.opener.location.href;
            }catch(e){}
        }
        return referrer || "-1";
    };

    GA.prototype.getSessionId = function(){
        var sessionId = this.cookie('QNT1');
        if(!sessionId){
            this.cookie('QNT1', sessionId = this.cookie('QN1'));
        }
        return sessionId;
    };

    GA.prototype.addBIParam = function(){
        var param = this.param;
        document.cookie.replace(BI_REG, function($, $1, $2){
            param[$1] = $2;
        });
    };

    //------------------
    /**
     * 页面统计
     * 存在sid时的调用:
     *     require "DesUtilBeacon" (sid, Object)
     * 不存在sid时的调用:
     *     require "DesUtilBeacon" (Object)
     */
    var addBeacon=function(arg){

        if(typeof arg=='number'||typeof arg=='string'){
            var id=arg;
            arg={};
            if(arguments.length==2){
                for( var method in arguments[1]){

                    var v=arguments[1][method];
                    arg[method]=v;

                }
            }
            arg['s']=id;
        }

        var ga = new GA();
        //站内外监测cookie
        var _domain = ga.getDomain( document.domain );
        var in_track = ga.getHashString("in_track") || ga.getQueryString("in_track");
        var ex_track = ga.getHashString("ex_track") || ga.getQueryString("ex_track");
        var ex_sub_track = ga.getHashString("ex_sub_track") || ga.getQueryString("ex_sub_track") || ga.cookie('QNT2');

        if( in_track ) {  ga.cookie('QN5',in_track,{ domain : _domain });  }
        if( ex_track ) {  ga.cookie('QN6',ex_track,{ domain : _domain });  }

        //版本号，当前0.1
        ga.add('utmwv','0.1');
        //当前唯一ID号，防止GIF被缓存
        ga.add('t',Math.random());
        //屏幕分辨率
        ga.add('utmsr', screen.availWidth + "*" + screen.availHeight );
        //当前页的reference
        ga.add('utmr', ga.getReferrer(arg && arg.refer));
        //当前页面的URI
        ga.add('utmp', window.location.href.toString() );
        //访问域名
        ga.add('utmhn', window.location.host.toString() );

        //增加子渠道参数
        if(ex_sub_track){
            ga.cookie('QNT2',ex_sub_track,{ domain : _domain });
            ga.add('d', ex_sub_track);
        }
        //增加bi统计参数
        ga.addBIParam();
        // http://wiki.corp.qunar.com/pages/viewpage.action?pageId=4360522&focusedCommentId=28575542
        ga.add('c', ga.cookie('QN48'));
        //当前页面在Beacon系统中ID

        for( var method in arg){
            ga.add(method,arg[method]);
        }

        //session级别的唯一标识
        ga.add('e', ga.getSessionId());
        ga.send();
    };

    /**
     * 点击统计
     * 存在sid的时候支持两种方式:
     *     require "DesUtilBeacon" .clk(sid, Array|Object)
     *     require "DesUtilBeacon" .clk(Object) Object中有s值
     * 不存在sid的时候持两种方式:
     *     require "DesUtilBeacon" .clk(Array|Object)
     *     require "DesUtilBeacon" .clk(String|Interger|Boolean, String|Interger|Boolean ...)
     */
    addBeacon.clk= function() {
        if(!arguments.length) {
            return;
        }

        var params = [], toString = ({}).toString;

        function foreach(o){
            if(toString.call(o) == '[object Object]'){
                for(var method in o ) {
                    params.push(encodeURIComponent(method)+'='+encodeURIComponent((o[method]||'')+''));
                }
            }else if(toString.call(o) == '[object Array]'){
                for(var i=0; i<o.length; i++) {
                    params.push(String.fromCharCode(96+i)+'='+encodeURIComponent((o[i]||'')+''));
                }
            }
        }

        if(arguments.length == 1){
            foreach(arguments[0]);
        }else if(arguments.length == 2){
            if( typeof arguments[0]=="number"|| typeof arguments[0]=="string") {
                //sid
                id=(parseInt(arguments[0],10)||0);
                params.push('s='+id);
            }
            foreach(arguments[1]);
        }else{
            foreach(arguments);
        }

        //当前唯一ID号，防止GIF被缓存
        params.push('t=' + Math.random());

        //session级别的唯一标识
        var ga = new GA();

        params.push('c=' + ga.cookie('QN48'));
        //点击统计
        var img=new Image();

        //session级别的唯一标识
       params.push('e=' + ga.getSessionId());
       img.src='http://bc.qunar.com/clk?'+params.join('&');
    };

    /**
     * 跟踪统计
     * 存在sid的时候支持两种方式:
     *     require "DesUtilBeacon" .track(sid, Array|Object)                      Array时指ids,如果是Object的话则需包含ids
     *     require "DesUtilBeacon" .track(Object)                                 Object中有s值和ids值
     * 不存在sid的时候持两种方式:
     *     require "DesUtilBeacon" .track(Array|Object)                           Array时指ids,如果是Object的话则需包含ids
     *     require "DesUtilBeacon" .track(String|Interger, String|Interger ...)   ids值
     * @return {[type]} [description]
     */
    addBeacon.track= function() {
        if(!arguments.length) {
            return;
        }

        var params = [], toString = ({}).toString;

        function foreach(o){
            if(toString.call(o) == '[object Object]'){
                for(var method in o ) {
                    params.push(encodeURIComponent(method)+'='+encodeURIComponent((o[method]||'')+''));
                }
            }else if(toString.call(o) == '[object Array]'){
                var ids = [];
                for(var i=0; i<o.length; i++) {
                    ids.push(o[i]);
                }
                params.push('ids=' + ids.join(','));
            }
        }

        if(arguments.length == 1){
            foreach(arguments[0]);
        }else if(arguments.length == 2){
            if( typeof arguments[0]=="number"|| typeof arguments[0]=="string") {
                //sid
                id=(parseInt(arguments[0],10)||0);
                params.push('s='+id);
            }
            foreach(arguments[1]);
        }else{
            foreach(arguments);
        }

        //当前唯一ID号，防止GIF被缓存
        params.push('t=' + Math.random());

        //session级别的唯一标识
        var ga = new GA();

        params.push('c=' + ga.cookie('QN48'));

        var img=new Image();

        //session级别的唯一标识
       params.push('e=' + ga.getSessionId());
       img.src='http://bc.qunar.com/tg_b.html?'+params.join('&');
    };

    /**
     * 点击统计标签属性触发
     * @param {Eleemnt}container=document.body   监控节点，默认是document.body
     * @param {String}tgIdt="tg-bclk"            标签属性名称，默认是tg-bclk
     * @param {Boolean}bind                      监控方式：代理和绑定，默认是代理
     */
    windowReady(function() {
        if( window.$ && (window.$ === window.jQuery || window.$ === window.Zepto)) {
            addBeacon.trackClk = function(container, tgIdt, bind){
                var $dom = $(container || document.body);
                if(typeof tgIdt == 'boolean'){
                    bind = tgIdt;
                }

                !tgIdt && (tgIdt = 'tg-bclk');

                if(!bind){
                    if($dom.data('trackClk')){
                        return;
                    }
                    $dom.on("click", "[" + tgIdt + "]", function(){
                        addBeacon.clk({a: $(this).attr(tgIdt)});
                    });
                    $dom.data('trackClk', true);
                    return;
                }

                $dom.find("[" + tgIdt + "]").each(function(){
                    var $this = $(this);

                    if($this.data('trackClk')){
                        return;
                    }
                    //点击统计
                    $this.bind("click",function(){
                        addBeacon.clk({a: $this.attr(tgIdt)});
                    });
                    $this.data('trackClk', true);
                });
            };
        }
    });

    return addBeacon;
})();


};
