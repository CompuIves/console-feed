"use strict";
exports.__esModule = true;
var string_utils_1 = require("./string-utils");
function createAppend(s) {
    var container = document.createDocumentFragment();
    container.appendChild(document.createTextNode(s));
    return container;
}
/**
 * @param {string} format
 * @param {!Array.<!SDK.RemoteObject>} parameters
 * @param {!Element} formattedResult
 */
function formatWithSubstitutionString(format, parameters, formattedResult) {
    var formatters = {};
    function stringFormatter(obj) {
        return obj;
    }
    function floatFormatter(obj) {
        if (typeof obj !== 'number')
            return 'NaN';
        return obj;
    }
    function integerFormatter(obj) {
        if (typeof obj !== 'number')
            return 'NaN';
        return Math.floor(obj);
    }
    function bypassFormatter(obj) {
        return obj instanceof Node ? obj : '';
    }
    var currentStyle = null;
    function styleFormatter(obj) {
        currentStyle = {};
        var buffer = document.createElement('span');
        buffer.setAttribute('style', obj);
        for (var i = 0; i < buffer.style.length; i++) {
            var property = buffer.style[i];
            if (isWhitelistedProperty(property))
                currentStyle[property] = buffer.style[property];
        }
    }
    function isWhitelistedProperty(property) {
        var prefixes = [
            'background',
            'border',
            'color',
            'font',
            'line',
            'margin',
            'padding',
            'text',
            '-webkit-background',
            '-webkit-border',
            '-webkit-font',
            '-webkit-margin',
            '-webkit-padding',
            '-webkit-text'
        ];
        for (var i = 0; i < prefixes.length; i++) {
            if (property.startsWith(prefixes[i]))
                return true;
        }
        return false;
    }
    formatters.s = stringFormatter;
    formatters.f = floatFormatter;
    // Firebug allows both %i and %d for formatting integers.
    formatters.i = integerFormatter;
    formatters.d = integerFormatter;
    // Firebug uses %c for styling the message.
    formatters.c = styleFormatter;
    // formatters._ = bypassFormatter
    function append(a, b) {
        if (b instanceof Node) {
            a.appendChild(b);
        }
        else if (typeof b !== 'undefined') {
            var toAppend = createAppend(String(b));
            if (currentStyle) {
                var wrapper = document.createElement('span');
                wrapper.appendChild(toAppend);
                applyCurrentStyle(wrapper);
                for (var i = 0; i < wrapper.children.length; ++i)
                    applyCurrentStyle(wrapper.children[i]);
                toAppend = wrapper;
            }
            a.appendChild(toAppend);
        }
        return a;
    }
    /**
     * @param {!Element} element
     */
    function applyCurrentStyle(element) {
        for (var key in currentStyle)
            element.style[key] = currentStyle[key];
    }
    // String.format does treat formattedResult like a Builder, result is an object.
    return string_utils_1.String.format(format, parameters, formatters, formattedResult, append);
}
exports["default"] = formatWithSubstitutionString;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWF0LW1lc3NhZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvQ29tcG9uZW50L2RldnRvb2xzLXBhcnNlci9mb3JtYXQtbWVzc2FnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtDQUFzRDtBQUV0RCxzQkFBc0IsQ0FBUztJQUM3QixJQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsc0JBQXNCLEVBQUUsQ0FBQTtJQUNuRCxTQUFTLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUVqRCxPQUFPLFNBQVMsQ0FBQTtBQUNsQixDQUFDO0FBRUQ7Ozs7R0FJRztBQUNILHNDQUNFLE1BQVcsRUFDWCxVQUFlLEVBQ2YsZUFBb0I7SUFFcEIsSUFBTSxVQUFVLEdBQVEsRUFBRSxDQUFBO0lBRTFCLHlCQUF5QixHQUFRO1FBQy9CLE9BQU8sR0FBRyxDQUFBO0lBQ1osQ0FBQztJQUVELHdCQUF3QixHQUFRO1FBQzlCLElBQUksT0FBTyxHQUFHLEtBQUssUUFBUTtZQUFFLE9BQU8sS0FBSyxDQUFBO1FBQ3pDLE9BQU8sR0FBRyxDQUFBO0lBQ1osQ0FBQztJQUVELDBCQUEwQixHQUFRO1FBQ2hDLElBQUksT0FBTyxHQUFHLEtBQUssUUFBUTtZQUFFLE9BQU8sS0FBSyxDQUFBO1FBQ3pDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUN4QixDQUFDO0lBRUQseUJBQXlCLEdBQVE7UUFDL0IsT0FBTyxHQUFHLFlBQVksSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQTtJQUN2QyxDQUFDO0lBRUQsSUFBSSxZQUFZLEdBQVEsSUFBSSxDQUFBO0lBQzVCLHdCQUF3QixHQUFRO1FBQzlCLFlBQVksR0FBRyxFQUFFLENBQUE7UUFDakIsSUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFN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