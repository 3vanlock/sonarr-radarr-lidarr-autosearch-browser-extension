var settingsPort = chrome.runtime.connect({ name: 'settings' });

settingsPort.onMessage.addListener(function(response) {
    init(response.settings);
});

var init = function (settings) {
    $.each(settings.sites,
        function (i, site) {
            if (window.location.href.includes(site.domain)) {
                var search = window.location.href.replace(/(.+\/)/g, '');

                if (search.trim() !== '') {
                    // use jquery selector and then retrieve the DOM element
                    var searchInput = $(site.searchInputSelector)[0];

                    if (searchInput) {
                        // jquery can't be used to trigger the input event here so rely on vanilla js for event triggering
                        searchInput.value = decodeURIComponent(search.trim());

                        var event = document.createEvent('Event');
                        event.initEvent('input', true, true);

                        searchInput.dispatchEvent(event);
                    }
                }
            }
        });
};

settingsPort.postMessage({ method: 'get' });