function loadError (oError) {
  throw new URIError('The script ' + oError.target.src + ' is not accessible.')
}

export function importScript (sSrc: string, fOnload: (this: void) => void) {
  // console.debug('import script called with: ' + sSrc)
  const oScript = document.createElement('script')
  // console.debug(1)
  oScript.type = 'text\/javascript'
  // console.debug(2)
  oScript.onerror = loadError
  // console.debug(3)
  if (fOnload) { oScript.onload = fOnload }
  // console.debug(4)
  // document.currentScript.parentNode.insertBefore(oScript, document.currentScript)
  document.head.appendChild(oScript)
  // console.debug(5)
  oScript.src = sSrc
  // console.debug('import script finished')
}
