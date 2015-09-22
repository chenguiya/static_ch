/*! config 2.0.0 pub 2014-10-24 15:23 by shuangzhu */
/*! http://cca.mbaobao.com/static/mod/mobile/config/2.0.0/sea-config.js*/
seajs.config({
alias:{
zepto:"zepto/1.1.2/zepto",
$:"zepto/1.1.2/zepto",
jquery:"jquery/2.1.1/jquery.min"
},
map:[[/^(.*\/mobile\/page\/album\/1\.0\.1\/.*\.(?:css|js))(?:.*)$/i,"$1?20140310"],[/^(.*\/mbb\/region\/2\.0\.1\/.*\.(?:css|js))(?:.*)$/i,"$1?20140808"],[/^(.*\/mobile\/page\/address\/1\.0\.1\/.*\.(?:css|js))(?:.*)$/i,"$1?20140313"],[/^(.*\/mobile\/ipad\/cart\/1\.0\.0\/.*\.(?:css|js))(?:.*)$/i,"$1?20140922"],[/^(.*\/mobile\/global\/2\.0\.0\/.*\.(?:css|js))(?:.*)$/i,"$1?20140820"],[/^(.*\/mobile\/mtouch\/cart\/1\.0\.0\/.*\.(?:css|js))(?:.*)$/i,"$1?20141024"],[/^(.*\/mobile\/mtouch\/home\/1\.0\.0\/.*\.(?:css|js))(?:.*)$/i,"$1?20141101"],[/^(.*\/mobile\/mtouch\/item\/1\.0\.0\/.*\.(?:css|js))(?:.*)$/i,"$1?20140929"],[/^(.*\/mobile\/mtouch\/list\/1\.0\.0\/.*\.(?:css|js))(?:.*)$/i,"$1?20140929"],[/^(.*\/mobile\/mtouch\/choice\/1\.0\.0\/.*\.(?:css|js))(?:.*)$/i,"$1?20140929"],[/^(.*\/mobile\/secondHandBag\/item\/1\.0\.0\/.*\.(?:css|js))(?:.*)$/i,"$1?20140813"],[/^(.*\/mobile\/secondHandBag\/cart\/1\.0\.0\/.*\.(?:css|js))(?:.*)$/i,"$1?20140813"]],
debug:window.debug||!1,base:"http://static.chenhua.cc/mbb_static/mod/"
});