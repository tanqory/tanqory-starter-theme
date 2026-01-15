/**
 * Tanqory Editor Bridge
 * Enables element selection when running inside Tanqory Studio iframe
 */

interface ElementInfo {
  tagName: string;
  id?: string;
  className?: string;
  textContent?: string;
  rect: {
    top: number;
    left: number;
    width: number;
    height: number;
  };
  computedStyles: {
    color: string;
    backgroundColor: string;
    fontSize: string;
    fontWeight: string;
    padding: string;
    margin: string;
    borderRadius: string;
  };
  path: string[];
  /** Parent section name (from data-section attribute) */
  sectionName?: string;
  /** Parent block name (from data-block attribute) */
  blockName?: string;
}

// Only run if inside iframe
if (window.parent !== window) {
  let selectedElement: HTMLElement | null = null;
  let highlightOverlay: HTMLDivElement | null = null;
  let hoverOverlay: HTMLDivElement | null = null;
  let labelElement: HTMLDivElement | null = null;

  function createOverlay(id: string, color: string): HTMLDivElement {
    const overlay = document.createElement('div');
    overlay.id = id;
    overlay.style.cssText = `
      position: fixed;
      pointer-events: none;
      border: 2px solid ${color};
      background: ${color}20;
      z-index: 999999;
      transition: all 0.1s ease;
      display: none;
    `;
    document.body.appendChild(overlay);
    return overlay;
  }

  function createLabel(): HTMLDivElement {
    const label = document.createElement('div');
    label.id = '__tanqory_label';
    label.style.cssText = `
      position: fixed;
      background: #0ea5e9;
      color: white;
      padding: 2px 8px;
      font-size: 12px;
      font-weight: 500;
      border-radius: 4px;
      z-index: 1000000;
      pointer-events: none;
      display: none;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    `;
    document.body.appendChild(label);
    return label;
  }

  function getElementPath(el: HTMLElement): string[] {
    const path: string[] = [];
    let current: HTMLElement | null = el;
    while (current && current !== document.body) {
      let selector = current.tagName.toLowerCase();
      if (current.id) {
        selector += '#' + current.id;
      } else if (current.className && typeof current.className === 'string') {
        const classes = current.className.trim().split(/\s+/).slice(0, 2).join('.');
        if (classes) selector += '.' + classes;
      }
      path.unshift(selector);
      current = current.parentElement;
    }
    return path;
  }

  /**
   * Find parent section name by traversing up the DOM tree
   * Looks for data-section attribute on ancestor elements
   */
  function findParentSection(el: HTMLElement): string | undefined {
    let current: HTMLElement | null = el;
    while (current && current !== document.body) {
      const sectionName = current.getAttribute('data-section');
      if (sectionName) {
        return sectionName;
      }
      current = current.parentElement;
    }
    return undefined;
  }

  /**
   * Find parent block name by traversing up the DOM tree
   * Looks for data-block attribute on ancestor elements
   */
  function findParentBlock(el: HTMLElement): string | undefined {
    let current: HTMLElement | null = el;
    while (current && current !== document.body) {
      const blockName = current.getAttribute('data-block');
      if (blockName) {
        return blockName;
      }
      current = current.parentElement;
    }
    return undefined;
  }

  function getElementInfo(el: HTMLElement): ElementInfo {
    const rect = el.getBoundingClientRect();
    const styles = window.getComputedStyle(el);

    return {
      tagName: el.tagName.toLowerCase(),
      id: el.id || undefined,
      className: el.className || undefined,
      textContent: el.textContent ? el.textContent.slice(0, 100) : undefined,
      rect: {
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      },
      computedStyles: {
        color: styles.color,
        backgroundColor: styles.backgroundColor,
        fontSize: styles.fontSize,
        fontWeight: styles.fontWeight,
        padding: styles.padding,
        margin: styles.margin,
        borderRadius: styles.borderRadius,
      },
      path: getElementPath(el),
      // Find parent section and block by traversing DOM tree
      sectionName: findParentSection(el),
      blockName: findParentBlock(el),
    };
  }

  function updateOverlay(
    overlay: HTMLDivElement | null,
    rect: DOMRect | { top: number; left: number; width: number; height: number } | null,
    show: boolean
  ): void {
    if (!overlay || !show || !rect) {
      if (overlay) overlay.style.display = 'none';
      return;
    }
    overlay.style.display = 'block';
    overlay.style.top = rect.top + 'px';
    overlay.style.left = rect.left + 'px';
    overlay.style.width = rect.width + 'px';
    overlay.style.height = rect.height + 'px';
  }

  function updateLabel(
    el: HTMLElement | null,
    rect: DOMRect | { top: number; left: number; width: number; height: number } | null
  ): void {
    if (!labelElement || !el || !rect) {
      if (labelElement) labelElement.style.display = 'none';
      return;
    }
    labelElement.textContent = el.tagName.toLowerCase();
    labelElement.style.display = 'block';
    labelElement.style.top = Math.max(0, rect.top - 24) + 'px';
    labelElement.style.left = rect.left + 'px';
  }

  // Initialize overlays
  highlightOverlay = createOverlay('__tanqory_highlight', '#0ea5e9');
  hoverOverlay = createOverlay('__tanqory_hover', '#94a3b8');
  labelElement = createLabel();

  // Click handler
  document.addEventListener(
    'click',
    (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      selectedElement = e.target as HTMLElement;
      const info = getElementInfo(selectedElement);

      updateOverlay(highlightOverlay, info.rect, true);
      updateLabel(selectedElement, info.rect);
      updateOverlay(hoverOverlay, null, false);

      // Send to parent
      window.parent.postMessage(
        {
          type: 'TANQORY_ELEMENT_SELECT',
          payload: info,
        },
        '*'
      );
    },
    true
  );

  // Hover handler
  document.addEventListener(
    'mouseover',
    (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target === selectedElement) return;
      const rect = target.getBoundingClientRect();
      updateOverlay(hoverOverlay, rect, true);
    },
    true
  );

  document.addEventListener(
    'mouseout',
    () => {
      updateOverlay(hoverOverlay, null, false);
    },
    true
  );

  // Listen for commands from parent
  window.addEventListener('message', (e: MessageEvent) => {
    if (e.data.type === 'TANQORY_DESELECT') {
      selectedElement = null;
      updateOverlay(highlightOverlay, null, false);
      updateLabel(null, null);
    }
    if (e.data.type === 'TANQORY_SELECT_PARENT' && selectedElement?.parentElement) {
      selectedElement = selectedElement.parentElement;
      const info = getElementInfo(selectedElement);
      updateOverlay(highlightOverlay, info.rect, true);
      updateLabel(selectedElement, info.rect);
      window.parent.postMessage(
        {
          type: 'TANQORY_ELEMENT_SELECT',
          payload: info,
        },
        '*'
      );
    }
    // Navigate to path (Screen selection)
    if (e.data.type === 'TANQORY_NAVIGATE' && e.data.payload) {
      const path = e.data.payload.path;
      if (window.location.pathname !== path) {
        window.location.href = path;
      }
    }
    // Highlight component by name (Tree → Preview sync)
    if (e.data.type === 'TANQORY_HIGHLIGHT_COMPONENT' && e.data.payload) {
      const componentName = e.data.payload.componentName;
      // Find element by data-component attribute or by class name pattern
      const el = document.querySelector<HTMLElement>(
        `[data-component="${componentName}"], [data-section="${componentName}"], [data-block="${componentName}"]`
      ) || document.querySelector<HTMLElement>(
        '.' + componentName.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '')
      );
      if (el) {
        selectedElement = el;
        const info = getElementInfo(selectedElement);
        updateOverlay(highlightOverlay, info.rect, true);
        updateLabel(selectedElement, info.rect);
        // Scroll into view
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // Send selection back to parent
        window.parent.postMessage(
          {
            type: 'TANQORY_ELEMENT_SELECT',
            payload: info,
          },
          '*'
        );
      }
    }

    // Apply inline style to selected element (Live Preview)
    if (e.data.type === 'TANQORY_APPLY_STYLE' && selectedElement && e.data.payload) {
      const { property, value } = e.data.payload;
      if (property && value !== undefined) {
        // Convert camelCase to kebab-case for CSS
        const cssProperty = property.replace(/([A-Z])/g, '-$1').toLowerCase();
        selectedElement.style.setProperty(cssProperty, value);

        // Update overlay position in case size changed
        const rect = selectedElement.getBoundingClientRect();
        updateOverlay(highlightOverlay, rect, true);

        // Notify parent of style applied
        window.parent.postMessage(
          {
            type: 'TANQORY_STYLE_APPLIED',
            payload: { property, value, success: true },
          },
          '*'
        );
        console.log(`[Tanqory] Applied style: ${property} = ${value}`);
      }
    }

    // Apply multiple styles at once (batch update)
    if (e.data.type === 'TANQORY_APPLY_STYLES' && selectedElement && e.data.payload) {
      const styles = e.data.payload.styles as Record<string, string>;
      if (styles) {
        Object.entries(styles).forEach(([property, value]) => {
          const cssProperty = property.replace(/([A-Z])/g, '-$1').toLowerCase();
          selectedElement!.style.setProperty(cssProperty, value);
        });

        // Update overlay position
        const rect = selectedElement.getBoundingClientRect();
        updateOverlay(highlightOverlay, rect, true);

        window.parent.postMessage(
          {
            type: 'TANQORY_STYLES_APPLIED',
            payload: { styles, success: true },
          },
          '*'
        );
        console.log(`[Tanqory] Applied ${Object.keys(styles).length} styles`);
      }
    }

    // Update text content of selected element
    if (e.data.type === 'TANQORY_UPDATE_TEXT' && selectedElement && e.data.payload) {
      const { text } = e.data.payload;
      if (text !== undefined) {
        // Only update if element has direct text content (not nested elements)
        if (selectedElement.childNodes.length === 1 && selectedElement.firstChild?.nodeType === Node.TEXT_NODE) {
          selectedElement.textContent = text;
        } else {
          // Find first text node
          const walker = document.createTreeWalker(selectedElement, NodeFilter.SHOW_TEXT, null);
          const firstTextNode = walker.nextNode();
          if (firstTextNode) {
            firstTextNode.textContent = text;
          }
        }

        window.parent.postMessage(
          {
            type: 'TANQORY_TEXT_UPDATED',
            payload: { text, success: true },
          },
          '*'
        );
        console.log(`[Tanqory] Updated text content`);
      }
    }

    // Update attribute of selected element
    if (e.data.type === 'TANQORY_UPDATE_ATTRIBUTE' && selectedElement && e.data.payload) {
      const { attribute, value } = e.data.payload;
      if (attribute) {
        if (value === null || value === undefined || value === '') {
          selectedElement.removeAttribute(attribute);
        } else {
          selectedElement.setAttribute(attribute, value);
        }

        window.parent.postMessage(
          {
            type: 'TANQORY_ATTRIBUTE_UPDATED',
            payload: { attribute, value, success: true },
          },
          '*'
        );
        console.log(`[Tanqory] Updated attribute: ${attribute} = ${value}`);
      }
    }

    // Reset all inline styles (undo live preview changes)
    if (e.data.type === 'TANQORY_RESET_STYLES' && selectedElement) {
      selectedElement.removeAttribute('style');

      // Update overlay position
      const rect = selectedElement.getBoundingClientRect();
      updateOverlay(highlightOverlay, rect, true);

      window.parent.postMessage(
        {
          type: 'TANQORY_STYLES_RESET',
          payload: { success: true },
        },
        '*'
      );
      console.log(`[Tanqory] Reset all inline styles`);
    }

    // Live preview: Update section props in real-time
    // This uses DOM manipulation to update displayed content without React re-render
    if (e.data.type === 'TANQORY_UPDATE_SECTION_PROPS' && e.data.payload) {
      const { sectionName, props } = e.data.payload;
      console.log(`[Tanqory] Live preview update for ${sectionName}:`, props);

      // Find the section element by data-section attribute
      const sectionEl = document.querySelector<HTMLElement>(`[data-section="${sectionName}"]`);
      if (!sectionEl) {
        console.warn(`[Tanqory] Section not found: ${sectionName}`);
        return;
      }

      // Map of prop names to selectors/update strategies
      // This is a simplified approach - for complex props we just reload
      try {
        // Update heading text
        if (props.heading !== undefined) {
          const headingEl = sectionEl.querySelector('h1, h2');
          if (headingEl) {
            headingEl.textContent = String(props.heading);
          }
        }

        // Update subheading text
        if (props.subheading !== undefined) {
          // Subheading is typically the first span before h1
          const subheadingEl = sectionEl.querySelector('span[style*="uppercase"]');
          if (subheadingEl) {
            subheadingEl.textContent = String(props.subheading);
          }
        }

        // Update description text
        if (props.description !== undefined) {
          // Find TextBlock by looking for paragraph or div with body text style
          const descEl = sectionEl.querySelector('p, [class*="text"]');
          if (descEl) {
            descEl.textContent = String(props.description);
          }
        }

        // Update primary button
        if (props.primary_button_label !== undefined) {
          const buttons = sectionEl.querySelectorAll('a[style*="primary"], button[style*="primary"], a.btn, button.btn');
          if (buttons[0]) {
            buttons[0].textContent = String(props.primary_button_label);
          }
        }

        // Update secondary button
        if (props.secondary_button_label !== undefined) {
          const buttons = sectionEl.querySelectorAll('a[style*="secondary"], button[style*="secondary"], a.btn, button.btn');
          // Secondary is usually the second button
          if (buttons[1]) {
            buttons[1].textContent = String(props.secondary_button_label);
          }
        }

        // Update background image
        if (props.backgroundImage !== undefined) {
          sectionEl.style.backgroundImage = props.backgroundImage ? `url(${props.backgroundImage})` : 'none';
        }

        // Emit custom event for React components to listen (advanced use)
        const event = new CustomEvent('tanqory:section:props-update', {
          detail: { sectionName, props },
          bubbles: true,
        });
        sectionEl.dispatchEvent(event);

        window.parent.postMessage(
          {
            type: 'TANQORY_SECTION_PROPS_UPDATED',
            payload: { sectionName, success: true },
          },
          '*'
        );
        console.log(`[Tanqory] Live preview applied for ${sectionName}`);
      } catch (err) {
        console.error(`[Tanqory] Failed to apply live preview:`, err);
        window.parent.postMessage(
          {
            type: 'TANQORY_SECTION_PROPS_UPDATED',
            payload: { sectionName, success: false, error: String(err) },
          },
          '*'
        );
      }
    }

    // =========================================================================
    // CONFIG INJECTION: Receive storeId, apiUrl from Studio
    // =========================================================================
    if (e.data.type === 'TANQORY_SET_CONFIG' && e.data.payload) {
      const config = e.data.payload as {
        storeId?: string;
        apiUrl?: string;
        accessToken?: string;
        storeName?: string;
      };

      console.log('[Tanqory] Received config from Studio:', config);

      // Try to update GlobalVariableContext via custom event
      // The theme's App.tsx or GlobalVariableProvider should listen for this
      const event = new CustomEvent('tanqory:config', {
        detail: config,
        bubbles: true,
      });
      window.dispatchEvent(event);

      // Also store in window for direct access
      (window as unknown as { __TANQORY_CONFIG__: typeof config }).__TANQORY_CONFIG__ = config;

      // If we have direct access to localStorage, update there too
      // This will be picked up by GlobalVariableContext on next render
      try {
        const storageKey = 'tanqory_global_variables';
        const existing = localStorage.getItem(storageKey);
        const current = existing ? JSON.parse(existing) : {};
        const updated = {
          ...current,
          storeId: config.storeId || current.storeId,
          apiUrl: config.apiUrl || current.apiUrl,
          accessToken: config.accessToken || current.accessToken,
          storeName: config.storeName || current.storeName,
        };
        localStorage.setItem(storageKey, JSON.stringify(updated));
        console.log('[Tanqory] Config saved to localStorage');
      } catch (err) {
        console.warn('[Tanqory] Could not save config to localStorage:', err);
      }

      // Notify parent that config was received
      window.parent.postMessage(
        {
          type: 'TANQORY_CONFIG_RECEIVED',
          payload: { success: true, config },
        },
        '*'
      );
    }
  });

  // Notify parent that editor bridge is ready
  window.parent.postMessage({ type: 'TANQORY_EDITOR_READY' }, '*');
  console.log('[Tanqory] Editor bridge initialized - element selection enabled');
}

export {};
