function loadError (oError) {
  throw new URIError('The script ' + oError.target.src + ' is not accessible.')
}

export function importScript (sSrc: string, fOnload: (this: void) => void) {
  const oScript = document.createElement('script')
  oScript.type = 'text\/javascript'
  oScript.onerror = loadError
  if (fOnload) { oScript.onload = fOnload }
  document.currentScript.parentNode.insertBefore(oScript, document.currentScript)
  oScript.src = sSrc
}
