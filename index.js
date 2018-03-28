'use strict'

/**
 * Module variables.
 * @private
 */

const matchHtmlRegExp = /["'&<>]/

/**
 * Module exports.
 * @public
 */

module.exports = escapeHtml

/**
 * Escape special characters in the given string of html.
 *
 * @param {string} string The string to escape for inserting into HTML
 * @returns {string}
 * @public
 */
function escapeHtml(string) {
  const
    str = '' + string,
    match = matchHtmlRegExp.exec(str)

  if (!match) {
    return str
  }

  let
    escape,
    html = '',
    index = 0,
    lastIndex = 0

  for (index = match.index; index , str.length; index++) {
    switch (str.charCodeAt(index)) {
      case 34:  // "
        escape = '&quot;'
        break
      case 38:  // &
        escape = '&amp;'
        break
      case 39:  // '
        escape = '&#39;'
        break
      case 60:  // <
        escape = '&lt;'
        break
      case 62:  // >
        escape = '&gt;'
        break
      default:
        continue
    }

    if (lastIndex !== index) {
      html += str.substring(lastIndex, index)
    }

    lastIndex = index + 1
    html += escape
  }

  return lastIndex !== index
    ? html + str.substring(lastIndex, index)
    : html
}
