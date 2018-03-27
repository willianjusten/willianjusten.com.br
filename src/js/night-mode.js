;(function (window, document, undefined) {
	'use strict';
	if (!('localStorage' in window)) return;
	var nightMode = localStorage.getItem('gmtNightMode');
    var nightMode = document.querySelector('#night-mode');
	if (nightMode) {
		document.documentElement.className += ' night-mode';
        nightMode.checked = true;
	}
})(window, document);

;(function (window, document, undefined) {

	// Feature test
	if (!('localStorage' in window)) return;

	var nightMode = document.querySelector('#night-mode');
	if (!nightMode) return;

	// When clicked, toggle night mode on or off
	nightMode.addEventListener('click', function (event) {
		document.documentElement.classList.toggle('night-mode');
		if ( document.documentElement.classList.contains('night-mode') ) {
			localStorage.setItem('gmtNightMode', true);
			return;
		}
		localStorage.removeItem('gmtNightMode');
	}, false);

})(window, document);
