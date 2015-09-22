define(function(require,exports,module){

    require.async("jquery", function($) {
        $.fn.hello = function() {
            console.log($(this).context);
        };
    });

    var $ = require("jquery");
    $.fn.hello = function() {
        console.log($(this).context);
    };

    exports.hello = function() {
        console.log("exports: hello star!");
    };
    
    module.exports = {
        hello: function() {
            console.log("module.exports: hello star!");
        },
        more_status: function() {
            console.log("module.exports: more status!");
        }
    };
    
})