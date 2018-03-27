;(function (window, document, undefined) {
	var nightModeStorage = localStorage.getItem('gmtNightMode');
	var nightMode = document.querySelector('#night-mode');

	if (nightModeStorage) {
		document.documentElement.classList.add('night-mode');
        nightMode.checked = true;
	}

	var nightMode = document.querySelector('#night-mode');
	var metaThemeColor = document.querySelector("meta[name=theme-color]");

	// When clicked, toggle night mode on or off
	nightMode.addEventListener('click', function (event) {
		document.documentElement.classList.toggle('night-mode');

		if ( document.documentElement.classList.contains('night-mode') ) {
			localStorage.setItem('gmtNightMode', true);
			metaThemeColor.setAttribute("content", '#2b2b2b');
			return;
		}
		localStorage.removeItem('gmtNightMode');
		metaThemeColor.setAttribute("content", '#005f97');
	}, false);

})(window, document);
