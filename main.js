const resultBox = document.getElementById("result");
const preview = document.getElementById("preview");
var array = [0];
var main = "";
const operator = ["+", "-", "/", "*"];
var flag = true;
var dotStatus = false;
var zeroStatus = false;

document.addEventListener("keydown", (e) => {
  // console.log(e.keyCode);
  var value = e.keyCode;
  switch (true) {
    case value == 107:
      fn('+');
      break;
    case value == 109:
      fn('-');
      break;
    case value == 106:
      fn('*');
      break;

    case value == 111:
      fn('/');
      break;
    case value == 8:
      fn('C');
      break;
    case value == 13:
      fn('=');
      break;
    case value == 96:
      fn(0);
      break;
    case value == 97:
      fn(1);
      break;
    case value == 98:
      fn(2);
      break;
    case value == 99:
      fn(3);
      break;
    case value == 100:
      fn(4);
      break;
    case value == 101:
      fn(5);
      break;
    case value == 102:
      fn(6);
      break;
    case value == 103:
      fn(7);
      break;
    case value == 104:
      fn(8);
      break;
    case value == 105:
      fn(9);
      break;

    case value == 110:
      fn('.');
      break;


    default:

      break;
  }
})


function fn(param) {
  console.log(array);
  switch (param) {
    case "+":
      if (checkOperator(array)) {
        array.push(param);
      }
      break;
    case "-":
      if (checkOperator(array)) {
        array.push(param);
      }
      break;
    case "*":
      if (checkOperator(array)) {
        array.push(param);
      }
      break;
    case "/":
      if (checkOperator(array)) {
        array.push(param);
      }
      break;
    case "C":
      preview.innerText = "";
      dotStatus = false;
      zeroStatus = false;
      array.pop();
      if (array[0] == undefined) {
        array[0] = 0;
      }
      break;
    case "AC":
      preview.innerText = "";
      dotStatus = false;
      zeroStatus = false;
      array = [0];
      break;

    case ".":
      var lastArray = array[array.length - 1];

      if (!lastArray.toString().includes(".")) {
        dotStatus = true;
        zeroStatus = true;
        // console.log(dotStatus);
      }

      break;
    case "00":
      checkNumber(param);
      break;
    case "000":
      checkNumber(param);
      break;
    case "=":
      // dotStatus = false;
      // zeroStatus = false;
      priorityOperator(array);
      secondPriorityOperator(array);
      preview.innerText = main + " = " + eval(main);

      break;
    default:
      checkNumber(param);

      break;
  }
  resultBox.innerText = array.join("");

}

function checkNumber(param) {
  preview.innerHTML = "";
  var temp = param;
  var lastArray = array[array.length - 1];
  if (typeof lastArray === "number" || zeroStatus) {
    if (dotStatus) {
      if (
        typeof array[array.length - 1] === "string" &&
        array[array.length - 1].length === 1
      ) {
        array.push(0);
        lastArray = 0;
      }
      if (param == 0) {
        temp = parseFloat(
          lastArray + "." + param.toString()
        ).toFixed(zeroAddToDecimail(array, param));
      } else {
        temp = +(lastArray + "." + param.toString());
      }
      dotStatus = false;
    } else {
      if (param == 0 && zeroStatus) {
        temp = parseFloat(lastArray + param.toString()).toFixed(
          zeroAddToDecimail(array, param)
        );
      } else {
        temp = +(lastArray + param.toString());
      }
    }

    array[array.length - 1] = temp;
  } else {
    if (param !== "000" && param !== "00" && param !== "0") {

      array.push(temp);
    }
  }
}

function priorityOperator(arr, opt1 = "*", opt2 = "/") {
  // آخرین خانه نباید عملگر باشد
  if (
    arr[arr.length - 1].toString().length === 1 &&
    typeof arr[arr.length - 1] === "string"
  ) {
    arr.pop();
  }

  main = [...arr].join("");

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == opt1) {
      arr[i - 1] *= arr[i + 1];

      arr.splice(i, 2);
      i--;
    } else if (arr[i] == opt2) {
      arr[i - 1] /= arr[i + 1];

      arr.splice(i, 2);
      i--;
    }
  }
}
function secondPriorityOperator(arr, opt1 = "+", opt2 = "-") {

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == opt1) {
      arr[i - 1] = parseFloat(arr[i - 1]) + parseFloat(arr[i + 1]);

      arr.splice(i, 2);
      i -= 1;
    } else if (arr[i] == opt2) {
      arr[i - 1] -= arr[i + 1];

      arr.splice(i, 2);
      i -= 1;
    }
  }
}

function checkOperator(arr) {
  preview.innerHTML = "";
  // برای اینکه طول آرایه بزرگتر از صفر باشد
  if (!arr.length) {
    flag = false;
  }else{
    for (i = 0; i < operator.length; i++) {
      // اگر بعد از دات عملگر زدیم باید false بشه
      dotStatus = false;
      zeroStatus = false;
      if (operator[i] === arr[arr.length - 1]) {
        flag = false;
        break;
      }
      flag = true;
    }
  }
  
  
  return flag;
}

function zeroAddToDecimail(arr, value) {
  var temp = arr[arr.length - 1].toString().split(".");
  if (temp.length <= 1) {
    return value.toString().length;
  } else {
    return temp[1].length + value.toString().length;
  }
}
