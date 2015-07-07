/**
 * Created by Parth Mistry on 28-03-2015.
 */

function CalculateCost(jumps) {
  var cost = [0];
  var stairs = jumps.length;
  for (var i = 0; i< stairs; i++) {
    var range = jumps[i];
    for (var r = 1; r <= range; r++) {
      if (!cost[i+r]) {
        cost[i+r] = cost[i] + 1;
      }
    }
    if (cost[stairs-1]) {
      console.log('Cost for ', jumps, 'is ', cost,' in ', i+1 ,'iteration');
      return cost[stairs-1];
    }
  }
  return -1;
}

var j = [1,3,5,8,9,2,6,7,6,8,9]; //=> 3
//var j = [2,0,1,3];  //=> 2
//var j = [2,4,1,5,3,4,1,5,3,6];
//function calculateCost(){
//  var jump = j;
//  var cost = 0;
//  var stairsLength = jump.length;
//  for (var i = 0; i < stairsLength ; ) {
//    if (jump[i] == 0) {
//      return -1;
//    }
//    var temp = i;
//    var maxJump = jump[i];
//    for (var tempJump = 1; tempJump <= maxJump; tempJump++ ) {
//      if (i+tempJump < stairsLength) {
//        if (jump[i+tempJump] >= maxJump) {
//          maxJump = i+tempJump;
//        }
//      } else      {
//        break;
//      }
//    }
//    i = i+ tempJump;
//    console.log('I is: ', i+1);
//    cost++;
//    if (i > stairsLength) {
//      return cost;
//    }
//  }
//}
//console.log('Cost for stair', j, 'is :',calculateCost(j));


//function CalculateCost(jumps) {
//  var stairs = jumps.length;
//  var cost = 0;
//  for (var i=0; i<stairs;) {
//    if (jumps[i] == 0) {
//      return -1;
//    }
//    var jFactor = jumps[i];
//    var nextI,
//      maxJumpValue = jumps[i+1];
//    for (var j=1; j<=jFactor;j++) {
//      if (!(i+j >= stairs)) {
//        if (jumps[i+j] >= maxJumpValue) {
//          nextI = i+j;
//          maxJumpValue = jumps[nextI];
//        }
//      } else {
//        break;
//      }
//    }
//    i = nextI;
//    cost++;
//    if (i >= stairs) {
//      console.log('Cost for ',jumps,'is ',cost);
//      return cost;
//    }
//  }
//}
//CalculateCost(j);

