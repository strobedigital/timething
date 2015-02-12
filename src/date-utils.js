var DateUtils = function(str) {
  this.str = str;
};

DateUtils.prototype = {
  stripChars: function() {
    return "" + parseInt(this.str.replace(/[^\d-]/g, ""), null);
  },
  isTimestamp: function() {
    return this.str.length == this.stripChars().length;
  },
  dateObject: function() {
    var date;
    if(this.str.length == 0) return null
    if(this.isTimestamp()) {
      date = new Date(parseInt(this.str, null)*1000);
    } else {
      date = Date.parse(this.str);
    }
    if(date == "Invalid Date") return null;
    return date;
  }
};

module.exports = DateUtils;