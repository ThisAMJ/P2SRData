String.prototype.padByDelim = function(d) {
  var target = this, out = [], split = [], maxes = [];
  this.split("\n").forEach(s => {split.push(s.split(d))});
  split.forEach(e => {
    if (e.length == 1) return;
    for (let i = 0; i < e.length; i++) {
      if (i < e.length - 1) {
        let k = e[i].length;
        maxes[i] = maxes.length < i + 1 ? k : Math.max(maxes[i], k);
      } else {
        maxes[i] = Math.max(maxes[i], 0);
      }
    }
  }); // get maximums
  split.forEach(e => {
    if (e.length == 1) {
      out.push(e[0]);
      return;
    }
    for (let i = 0; i < e.length; i += 2) {
      let j = i > 0 ? maxes[i - 1] - e[i - 1].length : 0;
      e[i] = " ".repeat(j) + e[i] + " ".repeat(maxes[i] - e[i].length);
    }
    out.push(e.join(d));
  }); // pad args with space
  return out.join("\n");
}

String.prototype.encases = function(s, e) {
  return this.startsWith(s) && this.endsWith(e);
}

String.prototype.replaceEvery = function(s, r) {
  let string = this.valueOf(), checker = 0;
  if (r.indexOf(s) > -1) return string;
  while (string.indexOf(s) > -1) {
    string = string.replaceAll(s,r);
  }
  return string;
}

String.prototype.clip = function() {
  let dummy = document.createElement("textarea");
  document.body.appendChild(dummy);
  dummy.value = this;
  dummy.select();
  document.execCommand("copy");
  document.body.removeChild(dummy);
}

function formatBytes(a, b = 2) {
  // Modified version of https://stackoverflow.com/a/18650828/13192876
  if (0 === a) return "0 Bytes";
  let c = 0 > b ? 0 : b, d = Math.floor(Math.log(a) / Math.log(1024));
  return parseFloat((a / Math.pow(1024, d)).toFixed(c)) + " " + ["","K","M","G","T","P","E","Z","Y"][d] + "B";
}

function queryAPI(url) {
  // thank you https://stackoverflow.com/a/48969580/13192876
  return new Promise(function(resolve, reject) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onload = function() {
      if (this.readyState == 4 && this.status == 200) {
        resolve(this.response);
      } else {
        if (this.status == 404) {
          resolve("404 NOT FOUND");
        }
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      }
    }
    xhr.onerror = function() {
      reject({
        status: this.status,
        statusText: xhr.statusText
      });
    }
    xhr.send();
  });
}
const delay = ms => new Promise(res => setTimeout(res, ms));