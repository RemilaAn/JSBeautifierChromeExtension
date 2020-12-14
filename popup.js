chrome.tabs.executeScript({
    code: null
}, function() {
    var container = document.getElementById("output");
    var dummy = document.getElementById("inputContainer");
    var formattedOutput = document.getElementById("formattedOutput");

    var beautifyOptions = {
        "indent_size": "4",
        "indent_char": " ",
        "max_preserve_newlines": "5",
        "preserve_newlines": true,
        "keep_array_indentation": false,
        "break_chained_methods": false,
        "indent_scripts": "normal",
        "brace_style": "collapse",
        "space_before_conditional": true,
        "unescape_strings": false,
        "jslint_happy": false,
        "end_with_newline": false,
        "wrap_line_length": "0",
        "indent_inner_html": false,
        "comma_first": false,
        "e4x": false,
        "indent_empty_lines": false
    };

    try {
        dummy.focus();
        document.execCommand("Paste");
        var actData = unquoted(dummy.value); //decodeURIComponent(selection[0]).replace(/\s+/gm,'');

        var beautifiedText = js_beautify(actData, beautifyOptions)
        formattedOutput.innerHTML = beautifiedText
        copyClipboard(formattedOutput)
    } catch (error) {
        container.innerHTML = error.stack;
    }
});

// Source: https://edupala.com/copy-div-content-clipboard/
function copyClipboard(elm) {
    // for Internet Explorer
    if (document.body.createTextRange) {
        var range = document.body.createTextRange();
        range.moveToElementText(elm);
        range.select();
        document.execCommand("Copy");
    } else if (window.getSelection) {
        // other browsers
        var selection = window.getSelection();
        var range = document.createRange();
        range.selectNodeContents(elm);
        selection.removeAllRanges();
        selection.addRange(range);
        document.execCommand("Copy");
    }
}

function unquoted(str) {
    return str.replace (/(^")|("$)/g, '');
}
