/* eslint-disable */

var timeOffset;

function onSubmit(event) {
  event.preventDefault();
  var username = event.target.username.value;
  $.getJSON('/login', { username: username }, function (data) {
    if (data.error) {
      setMessage(data.error);
    } else {
      setMessage(
        data.existed
          ? 'Welcome back, ' + username + '!'
          : 'Nice to meet you, ' + username + '!'
      );
      $('.username').text(username);
      setTimeout(function () {
        $('.page').toggle();
        timeOffset = Date.now();
        addNext();
      }, 1000);
    }
  });
}

function save() {
  var data = [];
  $('tr').each(function () {
    var $inputs = $(this).children().children();
    if ($inputs.length > 0) {
      var time = +$inputs.eq(0).val();
      var location = +$inputs.eq(1).val();
      data.push({time: time, location: location});
    }
  });
  $.post('/save', {
    username: $('.username').text(),
    data: JSON.stringify(data),
   });
}

function load() {
  $.getJSON('/load', { username: $('.username').text() }, function (data) {
    clean(data.length === 0);
    for (var i = 0; i < data.length; i++) {
      addNext(undefined, data[i].time, data[i].location);
    }
  });
}

function clean(add) {
  $('tbody').empty();
  timeOffset = Date.now();
  if (add !== false) {
    addNext();
  }
}

function setMessage(messageText) {
  document.getElementById('login-message').innerText = messageText;
}

function addNext(event, time, location) {
  var tr = document.createElement('tr');
  tr.appendChild(createElement('td', '<input type="text" value="' + (time || (Date.now() - timeOffset)) + '" />'));
  tr.appendChild(createElement('td', '<input type="text" value="' + (location || 0) + '" />'));
  tr.appendChild(createElement('td', '<input type="button" value="Next" onclick="addNext(event)" />'));
  if (event) {
    $(event.target).closest('tr').after(tr);
  } else {
    $('tbody').append(tr);
  }
}

function createElement(tagName, innerHTML) {
  var element = document.createElement(tagName);
  element.innerHTML = innerHTML;
  return element;
}
