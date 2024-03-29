var fs = require('fs');
fs.readFile('IntegerArray.txt','utf-8',function(err,data){
  if(err) {console.log(err)}
  if(data){
    var numbers = data.split('\n').map(function(x){return parseInt(x)});
    console.log(numbers.length);
    console.log('Beginning with value ' + numbers[0]);
    console.log('Counting inversions...');
    console.log('Final value: ' + countInversions(numbers));
  }
});

function countInversions(array){

  // Note: this uses a variant of merge sort

  //input handlers
  if (array === undefined) throw new Error("Array must be defined to count inversions");
  if (array.length === 0 || array.length === 1) return 0;
  
  var tally = 0; // count for inversions
  sort(array); // merge sort the array and increment tally when there are crossovers
  return tally;


  function sort(arr) {
    if (arr.length === 1) return arr;
    var right = arr.splice(Math.floor(arr.length/2), arr.length - 1);
    return merge(sort(arr), sort(right));
  }
  function merge(left, right){
    var merged = [];
    var l = 0, r = 0;
    var multiplier = 0;
    while (l < left.length || r < right.length){
      if (l === left.length){
        merged.push(right[r]);
        r++;
      } else if (r === right.length){
        merged.push(left[l]);
        l++;
        tally += multiplier;
        process.stdout.write("Tally: " + tally + "\r");
      } else if (left[l] < right[r]) {
        merged.push(left[l]);
        tally += multiplier;
        process.stdout.write("Tally: " + tally + "\r");
        l++;
      } else {
        merged.push(right[r]);
        r++;
        multiplier++;
      } 
    }
    return merged;
  }
}

//tests to run in console
/*
console.assert(countInversions([1, 2, 3]) === 0, "Zero inversions for 1, 2, 3");
console.assert(countInversions([1, 3, 2]) === 1, "One inversion for 1, 3, 2");
console.assert(countInversions([1, 3, 2, 4]) === 1, "One inversion for 1, 3, 2, 4");
console.assert(countInversions([1, 3, 2, 4, 5]) === 1, "One inversions for 1, 3, 2, 4, 5");
console.assert(countInversions([3, 1, 2, 4, 5]) === 2, "Two inversions for 3, 1, 2, 4, 5");
console.assert(countInversions([3, 2, 1, 4, 5]) === 3, "Three inversions for 3, 2, 1, 4, 5");
console.assert(countInversions([3, 2, 1, 4, 5, 6]) === 3, "Three inversions for 3, 2, 1, 4, 5, 6");
console.assert(countInversions([6, 5, 4, 3, 2, 1]) === 15, "Fifteen inversions for 654321");
*/