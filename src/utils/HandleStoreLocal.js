const HashString = {
  encrypt: (text) => {
    return window.btoa(text);
  },
  decrypt: (text) => {
    return window.atob(text);
  }
}

export default HashString;