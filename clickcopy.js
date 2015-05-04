(function() {
    'use strict';

    var clickCopyBtn = document.querySelector('.click-copy');
    var pasteCopyBtn = document.querySelector('.click-paste');
    var selectionNode = document.querySelector('.selection-area');
    var textarea = document.querySelector('textarea');
    var range = document.createRange();

    var clipboardValue = '';

    document.addEventListener('copy', function(event) {
        var text = window.getSelection().toString();
        event.clipboardData.setData('text/plain', text);
        clipboardValue = event.clipboardData.getData('text/plain');
    });

    clickCopyBtn.addEventListener('click', function(event) {
        var selection = window.getSelection();
        var noSelection = selection.isCollapsed;

        if (noSelection) {
            selection.removeAllRanges();
            range.selectNode(selectionNode);
            selection.addRange(range);
        }

        try {
            var copied = document.execCommand('copy');
            var copyMessage = copied ? 'copied' : 'cannot copy';
        } catch(err) {
            console.warn("document.execCommand('copy') not supported");
        }

        if (noSelection) {
            selection.removeAllRanges();
        }
    });

    // Fake paste. Currently execCommand('paste') isn't well supported
    pasteCopyBtn.addEventListener('click', function(event) {
        textarea.focus();
        textarea.value = clipboardValue;
    });

}());