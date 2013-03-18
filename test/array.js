describe('Array', function() {
  describe('Array.from()', function() {
    it('should create correct array from iterable', function() {
      (function() {
        expect(Array.from(arguments)).to.eql([0, 1, 2])
      })(0, 1, 2);

      expect(Array.from([null, undefined, 0.1248, -0, 0])).to.eql(
        [null, undefined, 0.1248, -0, 0]
      );
    });

    it('should handle empty iterables correctly', function() {
      (function() {
        expect(Array.from(arguments)).to.eql([]);
      })();
    });
  });

  describe('Array.of()', function() {
    it('should create correct array from arguments', function() {
      expect(Array.of(1, null, void 0)).to.eql([1, null, void 0])
    });
  });

  describe('Array#find()', function() {
    var find = Array.prototype.find;

    it('throws a TypeError if not given a function predicate', function() {
      expect(function() {
        return [].find();
      }).not.to.throw(TypeError);
      expect(function() {
        return [1, 2, 3].find();
      }).to.throw(TypeError);
    });

    it('finds the first item', function () {
      var numbers = [1, 2, 3, 4, 5];
      numbers = numbers.concat(numbers);
      numbers.forEach(function (number) {
        var calls = 0;
        var predicate = function (item) {
          calls += 1;
          return item === number;
        };
        expect(numbers.find(predicate)).to.equal(number);
        expect(calls).to.equal(number);
      });
    });

    it('returns undefined if length is not greater than zero', function() {
      [[], null, undefined, {}, '', NaN, 5].forEach(function (item) {
        expect(find.call(item, function() { return true; })).to.equal(undefined);
      });
    });

    it('returns undefined if not found', function() {
      expect([1, 2, 3].find(function (item) { return item === 4; })).to.equal(undefined);
      expect(find.call({ length: 2 }, function (item) { return item === 4; })).to.equal(undefined);
    });

    it('has a length property of 1', function() {
      expect(find.length).to.equal(1);
    });
  });
});
