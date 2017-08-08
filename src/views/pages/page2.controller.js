'use strict';

app.controller('page2Controller', ['$scope', function($scope) {
	function randint(min, max) {
		return Math.floor(Math.random() * (max - min)) + min;
	}

	var a = 'a'.charCodeAt(0), z = 'z'.charCodeAt(0) + 1;

	function randchr() {
		return String.fromCharCode(randint(a, z));
	}

	function toTitleCase(s) {
		return s.replace(/^./, function(c) { return c.toUpperCase(); });
	}

	function word(minLength, maxLength) {
		var length = randint(minLength, maxLength);
		var ret = [];
		for(var i = 0; i < length; ret.push(randchr()), ++i);
		return ret.join('');
	}

	function sentence(minLength, maxLength, minWordLength, maxWordLength) {
		var length = randint(minLength, maxLength);
		if(!length) {
			return '';
		}
		var ret = [toTitleCase(word(minWordLength, maxWordLength))];
		--length;
		for(var i = 0; i < length; ++i) {
			ret.push(word(minWordLength, maxWordLength));
		}
		return ret.join(' ') + '.';
	}

	function text(
		minSentences, maxSentences,
		minSentenceLength, maxSentenceLength,
		minWordLength, maxWordLength
	) {
		var length = randint(minSentences, maxSentences);
		var ret = [];
		for(var i = 0; i < length; ++i) {
			ret.push(sentence(
				minSentenceLength, maxSentenceLength,
				minWordLength, maxWordLength
			));
		}
		return ret.join(' ');
	}

	$scope.text = text(128, 256, 4, 16, 2, 8);
}]);
