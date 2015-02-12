// __tests__/date-utils-test.js
jest.dontMock('../date-utils');
var DateUtils = require('../date-utils');

describe('date utils', function() {

  describe('#stripChars', function() {
    it('strips out characters except numbers', function() {
      expect(new DateUtils("12s").stripChars()).toBe("12");
      expect(new DateUtils("s12").stripChars()).toBe("12");
      expect(new DateUtils("s12dsd??345").stripChars()).toBe("12345");
    });

    it('supports negative numbers', function() {
      expect(new DateUtils("-12").stripChars()).toBe("-12");
    })
  });

  describe('#isTimestamp', function() {
    it('returns true for valid timestamps', function() {
      expect(new DateUtils("123123123").isTimestamp()).toBe(true);
    });

    it('return false for invalid timestamps', function() {
      expect(new DateUtils("12/12/2014").isTimestamp()).toBe(false);
    });
  });

  describe('#dateObject', function() {
    it('returns a new date object from short timestamp', function() {
      var date = new DateUtils("0").dateObject();
      expect(date.getDate()).toBe(1);
      expect(date.getMonth()).toBe(0);
      expect(date.getFullYear()).toBe(1970);
      expect(date.getTime()).toBe(0);
      expect(date instanceof Date).toBe(true);
    });

    it('returns a new date object from short timestamp', function() {
      var date = new DateUtils("-12").dateObject();
      expect(date.getDate()).toBe(31);
      expect(date.getMonth()).toBe(11);
      expect(date.getFullYear()).toBe(1969);
      expect(date.getTime()/1000).toBe(-12);
      expect(date instanceof Date).toBe(true);
    });

    it('returns a new date object from timestamp', function() {
      var date = new DateUtils("1423252800").dateObject();
      expect(date.getTime()/1000).toBe(1423252800);
      expect(date instanceof Date).toBe(true);
    });

    it('returns a new date object from a string', function() {
      var date = new DateUtils("12/12/2014").dateObject();
      expect(date.getMonth()).toBe(11);
      expect(date.getDate()).toBe(12);
      expect(date.getFullYear()).toBe(2014);
      expect(date instanceof Date).toBe(true);
    });

    it('returns a new date object from a string', function() {
      var date = new DateUtils("12-12-2014").dateObject();
      expect(date.getMonth()).toBe(11);
      expect(date.getDate()).toBe(12);
      expect(date.getFullYear()).toBe(2014);
      expect(date instanceof Date).toBe(true);
    });

    it('returns null when invalid', function() {
      expect(new DateUtils("aksjdhkasjhd").dateObject()).toBe(null);
      expect(new DateUtils("").dateObject()).toBe(null);
    });
  });

});