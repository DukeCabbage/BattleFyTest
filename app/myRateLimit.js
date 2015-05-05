exports.createQueue = createQueue;

function createQueue(rateLimit) {
    var funcQueue = [];
    var urlQueue = [];
    var callbackQueue = [];
    var resQueue = [];
    var gap = rateLimit.interval;
    var timeOfNextRequest = 0;
    var waiting = false;
    
    function next() {
        if (funcQueue.length === 0) {
            waiting = false;
            return;
        }
        
        var now = getNow();
        if (now >= timeOfNextRequest) {
            timeOfNextRequest = now + gap;
            var func = funcQueue.shift();
            var url = urlQueue.shift();
            var callback = callbackQueue.shift();
            var res = resQueue.shift();
            if (res==undefined){
                func(url, callback);
            }else{
                func(url, callback, res);
            }
        }
        setTimeout(next, timeOfNextRequest - now);
        waiting = true;
    }
    
    function add(func, url, callback, res) {
        funcQueue.push(func);
        urlQueue.push(url);
        callbackQueue.push(callback);
        resQueue.push(res);
        if (!waiting) {
            next();
        }
    }
    
    return {
        add: add
    }
}

function getNow() {
    return new Date().getTime();
}