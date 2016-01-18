app.filter('range', function() {
  return function(input,start,end) {    
    for(var i = start; i <= end && i <= 30; i++) {
        input.push(i);
    }
    return input;
  };
});