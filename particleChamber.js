// moves a single particle on a fieldArr
const moveParticle = function(fieldArr, position, direction, speed) {
  // determine the new position
  const newPosition = direction === 'R' ? position + speed : position - speed;
  // determine if the new position is on the field
  if (newPosition >= 0 && newPosition < fieldArr.length) {
    // if the new position is blank, add the direction marker to that position
    if (fieldArr[newPosition] === '.') {
      fieldArr[newPosition] = direction;
    // if there is a direction marker already there, change the direction marker to 'B' as in Both directions
    } else {
      fieldArr[newPosition] = 'B';
    }
  }
  return fieldArr;
}

// displays the field in the '..X..X..' pattern instead of the '..R..L..' pattern given the fieldArr
const displayfieldArr = function(fieldArr) {
  // makes a copy of the fieldArr
  const copy = [...fieldArr];
  for (let i = 0; i < copy.length; i++) {
    // if the position is not blank, turn it into an 'X'
    if (copy[i] !== '.') {
      copy[i] = 'X';
    }
  }
  return copy.join('');
}

const animate = function(initialPosition, speed) {
  let resArr = [];
  let length = initialPosition.length;
  let finalStr = '';
  let currentStr = initialPosition;
  // create a final blank field string
  for (let i = 0; i < length; i++) {
    finalStr += '.';
  }
  // display the initial field and push it into the result array
  resArr.push(displayfieldArr(initialPosition.split('')));
  // loop until the current field looks like a blank field
  while (currentStr !== finalStr) {
    let positionArr = currentStr.split('');
    let blankArr = finalStr.split('');
    for (let i = 0; i < length; i++) {
      // move one particle in its respective direction
      if (positionArr[i] === 'L' || positionArr[i] === 'R') {
        blankArr = moveParticle(blankArr, i, positionArr[i], speed);
      // move both particles
      } else if (positionArr[i] === 'B') {
        blankArr = moveParticle(blankArr, i, 'L', speed);
        blankArr = moveParticle(blankArr, i, 'R', speed);
      }
    }
    resArr.push(displayfieldArr(blankArr));
    currentStr = blankArr.join('');
  }
  return resArr;
}


// an array comparison I found on stackoverflow
Array.prototype.equals = function (array) {
  if (!array)
      return false;
  if (this.length != array.length)
      return false;

  for (var i = 0, l=this.length; i < l; i++) {
      if (this[i] instanceof Array && array[i] instanceof Array) {
          if (!this[i].equals(array[i]))
              return false;
      }
      else if (this[i] != array[i]) {
          return false;
      }
  }
  return true;
}

const test1 = animate('..R....', 2);
const test2 = animate('RR..LRL', 3);
const test3 = animate('LRLR.LRLR', 2);
const test4 = animate('RLRLRLRLRL', 10);

// all tests should return true
console.log(test1.equals(["..X....", "....X..", "......X", "......."]));
console.log(test2.equals(["XX..XXX", ".X.XX..", "X.....X", "......."]));
console.log(test3.equals([ "XXXX.XXXX", "X..X.X..X", ".X.X.X.X.", ".X.....X.", "........."]));
console.log(test4.equals([ "XXXXXXXXXX", ".........."]));