// Jest setup file for DOM polyfills

// Polyfill replaceChildren for test environment
Element.prototype.replaceChildren = Element.prototype.replaceChildren || function(...nodes) {
  while (this.lastChild) {
    this.removeChild(this.lastChild);
  }
  this.append(...nodes);
};

// Mock HTML input validation methods
if (typeof HTMLInputElement !== 'undefined') {
  Object.defineProperty(HTMLInputElement.prototype, 'setCustomValidity', {
    value: function() {},
    writable: true
  });

  Object.defineProperty(HTMLInputElement.prototype, 'reportValidity', {
    value: function() { return true; },
    writable: true
  });
}

// Load progress-bar component for tests
(async () => {
  try {
    if (typeof customElements !== 'undefined') {
      await import('@botandrose/progress-bar');
    }
  } catch (e) {
    console.warn('Could not load progress-bar component:', e.message);
  }
})();