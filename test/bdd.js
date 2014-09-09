
var timer, exitCode;

function format(type, str, fn){

  var test, badge;
  try {
    test = (fn || function(){})() || 'passed';
  } catch(e){
    test = 'err';
  }

  if(str === void 0 || str === null || str.trim() === '')
    badge = ' (pending)';
  else if(test === 'passed')
    badge = '  \033[36m✔\033[0m  ';
  else if(test === 'err')
    badge = '  \033[31m✗ ➜\033[0m ';

  str = type === 'describe' ? '   ▼\n   ▼ '+str+'' : ' '+badge+str;
  exitCode = exitCode === 1 ? 1 : (test === 'err' ? 1 : 0);

  if(timer)
    clearTimeout(timer);

  timer = setTimeout(function(){
    process.exit(exitCode);
  });

  return str + '\n';
}

function describe(/* arguments */){

  var args = [].slice.call(arguments);
  var fn = args.pop();
  var str = args.map(function(arg){
    return ''+arg;
  }).join(' ');

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
