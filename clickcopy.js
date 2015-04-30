(function() {
    'use strict';

    var clickCopyBtn = document.querySelector('.click-copy');
    var selectionNode = document.querySelector('.selection-area');
    var message = document.querySelector('.message');
    var range = document.createRange();

    message.style.display = 'none';

    clickCopyBtn.addEventListener('click', function(event) {
        var selection = window.getSelection();
        var noSelection = selection.isCollapsed;

        if (noSelection) {
            range.selectNode(selectionNode);
            selection.addRange(range);
        }

        try {
            var copied = document.execCommand('copy');
            var copyMessage = copied ? 'copied' : 'cannot copy';
            message.textContent = copyMessage;
            message.style.display = '';

            setTimeout(function() {
                message.style.display = 'none';
            },2000);
        } catch(err) {
            console.warn("document.execCommand('copy') not supported");
        }

        selection.removeAllRanges();
    });

}());