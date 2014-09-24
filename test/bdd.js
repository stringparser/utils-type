var ansiJS = require('ansi-highlight');
var timer, exitCode;

function format(type, str, fn){

  var test, badge;
  try {
    test = (fn || function(){})() || 'passed';
  } catch(err){
    test = err;
    console.log();
    console.log(err.stack);
  }

  exitCode = exitCode === 1 ? 1 : (test === 'err' ? 1 : 0);

  str = ansiJS(str);

  if(str === void 0 || str === null || str.trim() === ''){
    badge = ' (pending)';
  } else if(test === 'passed'){
    badge = '  \033[36m✔\033[0m  ';
  } else if(test instanceof Error){
    badge = '  \033[31m✗ ➜\033[0m ';
  }

  if(type !== 'describe'){
    str = ' '+badge+str;
  } else if(exitCode === 1){
    str = '   \033[31m►\033[0m  '+str;
  } else {
    str = '   \033[36m►\033[0m  '+str;
  }

  if(timer){
    clearTimeout(timer);
  }

  timer = setTimeout(function(){
    process.exit(exitCode);
  });

  return '\n' + str;
}

function describe(/* arguments */){

  var args = [].slice.call(arguments);
  var fn = args.pop();
  var str = args.map(function(arg){
    return ''+arg;
  }).join(' ');

  process.stdout.write('   '+str);
  process.stdout.write(format('describe', str, fn));
}
exports.describe = describe;

function it(/* arguments */){

  var args = [].slice.call(arguments);
  var fn = args.pop();
  var str = args.map(function(arg){
    return ''+arg;
  }).join(' ');

  process.stdout.write(format('it', str, fn));
}
exports.it = it;
