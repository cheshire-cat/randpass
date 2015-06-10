var numbers = ["3", "4", "6", "7", "8", "9"];
var unfriendlyNumbers = ["0", "1", "2", "5"];
var lowercase = ["a", "b", "c", "d", "e", "f", "g", "h", "j", "k", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var unfriendlyLowercase = ["l", "i"];
var uppercase = ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "M", "N", "P", "Q", "R", "T", "U", "V", "W", "X", "Y"];
var unfriendlyUppercase = ["I", "O", "S", "Z"];
var symbols = ["@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "=", "+", "?", "/", "~"];
var unfriendlySymbols = ["!", "[", "]", "{", "}", ";", ":", ",", ".", "|", "_"];

var allSymbols = symbols.concat(unfriendlySymbols);
var allNumbers = numbers.concat(unfriendlyNumbers);
var allLowercase = lowercase.concat(unfriendlyLowercase);
var allUppercase = uppercase.concat(unfriendlyUppercase);

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

function generatePassowords(passwordLength, count) {
  for (var i = 1, passwords = ""; i <= count; i++ ) {
    var alphabet = [];
    var currentPasswordLength = 0;
    var password = "";

    if ($("#readable").is(":checked"))  {
      if ($("#symbols").is(":checked")) {
        alphabet = alphabet.concat(symbols);
        password += symbols[getRandomInt(0, symbols.length - 1)];
        currentPasswordLength = currentPasswordLength + 1;
      }
      if ($("#numbers").is(":checked")) {
        alphabet = alphabet.concat(numbers);
        password += numbers[getRandomInt(0, numbers.length - 1)];
        currentPasswordLength = currentPasswordLength + 1;
      }
      if ($("#lowercase").is(":checked")) {
        alphabet = alphabet.concat(lowercase);
        password += lowercase[getRandomInt(0, lowercase.length - 1)];
        currentPasswordLength = currentPasswordLength + 1;
      }
      if ($("#uppercase").is(":checked")) {
        alphabet = alphabet.concat(uppercase);
        password += uppercase[getRandomInt(0, uppercase.length - 1)];
        currentPasswordLength = currentPasswordLength + 1;
      }
    } else {
      if ($("#symbols").is(":checked")) {
        alphabet = alphabet.concat(allSymbols);
        password += allSymbols[getRandomInt(0, allSymbols.length - 1)];
        currentPasswordLength = currentPasswordLength + 1;
      }
      if ($("#numbers").is(":checked")) {
        alphabet = alphabet.concat(allNumbers);
        password += allNumbers[getRandomInt(0, allNumbers.length - 1)];
        currentPasswordLength = currentPasswordLength + 1;
      }
      if ($("#lowercase").is(":checked")) {
        alphabet = alphabet.concat(allLowercase);
        password += allLowercase[getRandomInt(0, allLowercase.length - 1)];
        currentPasswordLength = currentPasswordLength + 1;
      }
      if ($("#uppercase").is(":checked")) {
        alphabet = alphabet.concat(allUppercase);
        password += allUppercase[getRandomInt(0, allUppercase.length - 1)];
        currentPasswordLength = currentPasswordLength + 1;
      }

    }

    for (var j = 1; j <= (passwordLength - currentPasswordLength); j++) {
      password += alphabet[getRandomInt(0, alphabet.length - 1)];
    }
    password = shuffleArray(password.split('')).join("");
    passwords += "<a class='password'>" + password + "</a>";
  }
  return passwords.toString();
}

function fillPasswords() {
  var passwords = generatePassowords($("#lenSlider").slider("value"), $("#countSlider").slider("value"));
  $("#passwordsBox").html(passwords);
}

$(document).ready(function() {
  fillPasswords();

  $(document).on("change", ".alphOpts", function() {
    if ($(".alphOpts:checked").length == 0) {
      $(".alphOpts").each(function() {
        $(this).trigger("click");
      });
    }
    fillPasswords();
  });

  $(document).on("change", ".otherOpts", function() {
    fillPasswords();
  });

  $("#lenSlider").slider({
    stop: function(event, ui) {
      fillPasswords();
    }
  });

  $("#countSlider").slider({
    stop: function(event, ui) {
      fillPasswords();
    }
  });

  $(document).on("click", "#more", function(event) {
    fillPasswords();
    $('html,body').animate({scrollTop: $("#options").offset().top});
  });


  $(document).on("click", ".password", function(event) {
    window.prompt("Copy to clipboard: Ctrl+C, Enter", $(this).text());
  });

  $(document).on("click", "#copyAllPasswords", function() {
    var allPasswords = "";
    $('#passwordsBox').children().each(function(index) {
      allPasswords += $(this).text() + "\n";
    });
    window.prompt("Copy to clipboard: Ctrl+C, Enter", allPasswords.toString());
  });
});
