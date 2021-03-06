// Copyright (c) 2012 Kiran Kumar. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.


chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    if (request.method == "getSelection") {
	var select = getSelectionHTML();
	var cssStyle = getCSS();
	sendResponse({ urlData: select, css: cssStyle });
    }
    else
	sendResponse({});
});


function getCSS(){
    var css;
    var active = document.activeElement;
    // this should get all the style elements that 
    css = window.getComputedStyle(active);
}

function getSelectionHTML() {
    var userSelection;
    if (window.getSelection) {
        // W3C Ranges
        userSelection = window.getSelection();
        var range = document.createRange();
	if (userSelection.anchorOffset <= userSelection.focusOffset)  {
            range.setStart(userSelection.anchorNode, userSelection.anchorOffset);
            range.setEnd(userSelection.focusNode, userSelection.focusOffset);
	}
	else {
	    range.setEnd(userSelection.anchorNode, userSelection.anchorOffset);
            range.setStart(userSelection.focusNode, userSelection.focusOffset);
	}
        var clonedSelection = range.cloneContents();
        var div = document.createElement ('div');
        div.appendChild (clonedSelection);
        return div.innerHTML;
    }
    else if (document.getSelection) {
        userSelection = document.getSelection();
	return userSelection;
    } 

    else if (document.selection) {
        // Explorer selection, return the HTML
        userSelection = document.selection.createRange ();
        return userSelection;
    } else {
        return 'failed';
    }
}