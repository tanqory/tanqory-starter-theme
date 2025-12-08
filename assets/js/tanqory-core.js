/**
 * Tanqory Core JavaScript
 *
 * Core functionality for cart, forms, and utilities
 * No dependencies - Vanilla JavaScript
 */

(function() {
  'use strict';

  // ============================================
  // Configuration
  // ============================================
  const CONFIG = {
    cartDrawerSelector: '[data-cart-drawer]',
    cartToggleSelector: '[data-cart-toggle]',
    cartCloseSelector: '[data-cart-close]',
    cartContentSelector: '[data-cart-content]',
    cartSubtotalSelector: '[data-cart-subtotal]',
    overlaySelector: '[data-overlay]',
    addToCartSelector: '[data-add-to-cart]',
    quantityInputSelector: '.qty-input',
    quantityDecreaseSelector: '[data-qty-decrease]',
    quantityIncreaseSelector: '[data-qty-increase]',
    mobileMenuToggleSelector: '[data-mobile-menu-toggle]',
    searchToggleSelector: '[data-search-toggle]',
  };

  // ============================================
  // Utilities
  // ============================================
  const utils = {
    /**
     * Format price with currency
     */
    formatMoney(cents, format = '{{amount}}') {
      const value = (cents / 100).toFixed(2);
      return format.replace('{{amount}}', value);
    },

    /**
     * Debounce function
     */
    debounce(func, wait) {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    },

    /**
     * Throttle function
     */
    throttle(func, limit) {
      let inThrottle;
      return function(...args) {
        if (!inThrottle) {
          func.apply(this, args);
          inThrottle = true;
          setTimeout(() => (inThrottle = false), limit);
        }
      };
    },

    /**
     * Fetch with error handling
     */
    async fetchJSON(url, options = {}) {
      try {
        const response = await fetch(url, {
          ...options,
          headers: {
            'Content-Type': 'application/json',
            ...options.headers,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
      } catch (error) {
        console.error('Fetch error:', error);
        throw error;
      }
    },

    /**
     * Create element with attributes
     */
    createElement(tag, attributes = {}, children = []) {
      const element = document.createElement(tag);

      Object.entries(attributes).forEach(([key, value]) => {
        if (key === 'className') {
          element.className = value;
        } else if (key === 'innerHTML') {
          element.innerHTML = value;
        } else if (key.startsWith('data')) {
          element.setAttribute(key.replace(/([A-Z])/g, '-$1').toLowerCase(), value);
        } else {
          element.setAttribute(key, value);
        }
      });

      children.forEach(child => {
        if (typeof child === 'string') {
          element.appendChild(document.createTextNode(child));
        } else {
          element.appendChild(child);
        }
      });

      return element;
    },

    /**
     * Show element
     */
    show(element) {
      element.hidden = false;
      element.removeAttribute('aria-hidden');
    },

    /**
     * Hide element
     */
    hide(element) {
      element.hidden = true;
      element.setAttribute('aria-hidden', 'true');
    },

    /**
     * Toggle element visibility
     */
    toggle(element) {
      if (element.hidden) {
        this.show(element);
      } else {
        this.hide(element);
      }
    },
  };

  // ============================================
  // Cart Module
  // ============================================
  const cart = {
    state: {
      items: [],
      totalPrice: 0,
      itemCount: 0,
    },

    /**
     * Initialize cart
     */
    init() {
      this.bindEvents();
      this.loadCart();
    },

    /**
     * Bind cart events
     */
    bindEvents() {
      // Cart toggle
      document.querySelectorAll(CONFIG.cartToggleSelector).forEach(btn => {
        btn.addEventListener('click', () => this.openDrawer());
      });

      // Cart close
      document.querySelectorAll(CONFIG.cartCloseSelector).forEach(btn => {
        btn.addEventListener('click', () => this.closeDrawer());
      });

      // Overlay click
      const overlay = document.querySelector(CONFIG.overlaySelector);
      if (overlay) {
        overlay.addEventListener('click', () => this.closeDrawer());
      }

      // Add to cart (delegated)
      document.addEventListener('click', (e) => {
        const addBtn = e.target.closest(CONFIG.addToCartSelector);
        if (addBtn) {
          e.preventDefault();
          this.addItem(addBtn);
        }
      });

      // Escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          this.closeDrawer();
        }
      });
    },

    /**
     * Load cart from API
     */
    async loadCart() {
      try {
        const data = await utils.fetchJSON('/api/cart');
        this.state = data;
        this.render();
      } catch (error) {
        console.error('Failed to load cart:', error);
      }
    },

    /**
     * Add item to cart
     */
    async addItem(button) {
      const productId = button.dataset.productId;
      const variantId = button.dataset.variantId;
      const quantity = parseInt(button.dataset.quantity || '1', 10);

      // Disable button
      button.disabled = true;
      const originalText = button.textContent;
      button.textContent = 'Adding...';

      try {
        const data = await utils.fetchJSON('/api/cart/add', {
          method: 'POST',
          body: JSON.stringify({
            productId,
            variantId,
            quantity,
          }),
        });

        this.state = data;
        this.render();
        this.openDrawer();

        // Success feedback
        button.textContent = 'Added!';
        setTimeout(() => {
          button.textContent = originalText;
          button.disabled = false;
        }, 1500);
      } catch (error) {
        console.error('Failed to add item:', error);
        button.textContent = 'Error';
        setTimeout(() => {
          button.textContent = originalText;
          button.disabled = false;
        }, 1500);
      }
    },

    /**
     * Update item quantity
     */
    async updateItem(lineId, quantity) {
      try {
        const data = await utils.fetchJSON('/api/cart/update', {
          method: 'POST',
          body: JSON.stringify({
            lineId,
            quantity,
          }),
        });

        this.state = data;
        this.render();
      } catch (error) {
        console.error('Failed to update item:', error);
      }
    },

    /**
     * Remove item from cart
     */
    async removeItem(lineId) {
      await this.updateItem(lineId, 0);
    },

    /**
     * Open cart drawer
     */
    openDrawer() {
      const drawer = document.querySelector(CONFIG.cartDrawerSelector);
      const overlay = document.querySelector(CONFIG.overlaySelector);

      if (drawer) {
        utils.show(drawer);
        drawer.classList.add('open');
      }

      if (overlay) {
        utils.show(overlay);
      }

      // Prevent body scroll
      document.body.style.overflow = 'hidden';

      // Focus trap
      const firstFocusable = drawer?.querySelector('button, [href], input');
      if (firstFocusable) {
        firstFocusable.focus();
      }
    },

    /**
     * Close cart drawer
     */
    closeDrawer() {
      const drawer = document.querySelector(CONFIG.cartDrawerSelector);
      const overlay = document.querySelector(CONFIG.overlaySelector);

      if (drawer) {
        drawer.classList.remove('open');
        setTimeout(() => utils.hide(drawer), 300);
      }

      if (overlay) {
        utils.hide(overlay);
      }

      // Restore body scroll
      document.body.style.overflow = '';
    },

    /**
     * Render cart content
     */
    render() {
      const content = document.querySelector(CONFIG.cartContentSelector);
      const subtotal = document.querySelector(CONFIG.cartSubtotalSelector);
      const cartCount = document.querySelectorAll('.cart-count');

      // Update count badges
      cartCount.forEach(el => {
        el.textContent = this.state.itemCount;
        if (this.state.itemCount > 0) {
          utils.show(el);
        } else {
          utils.hide(el);
        }
      });

      // Update subtotal
      if (subtotal) {
        subtotal.textContent = utils.formatMoney(this.state.totalPrice);
      }

      // Update items
      if (content) {
        if (this.state.items.length === 0) {
          content.innerHTML = `
            <div class="cart-empty">
              <p>Your cart is empty</p>
              <a href="/collections/all" class="btn">Continue Shopping</a>
            </div>
          `;
        } else {
          content.innerHTML = this.state.items.map(item => `
            <div class="cart-item" data-line-id="${item.id}">
              <img src="${item.image}" alt="${item.title}" class="cart-item-image" />
              <div class="cart-item-details">
                <h4 class="cart-item-title">${item.title}</h4>
                <p class="cart-item-variant">${item.variantTitle || ''}</p>
                <p class="cart-item-price">${utils.formatMoney(item.price)}</p>
                <div class="cart-item-quantity">
                  <button type="button" class="qty-btn" data-action="decrease">-</button>
                  <input type="number" value="${item.quantity}" min="1" max="99" />
                  <button type="button" class="qty-btn" data-action="increase">+</button>
                </div>
              </div>
              <button type="button" class="cart-item-remove" data-action="remove">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          `).join('');

          // Bind item events
          content.querySelectorAll('.cart-item').forEach(item => {
            const lineId = item.dataset.lineId;
            const input = item.querySelector('input');

            item.querySelector('[data-action="decrease"]')?.addEventListener('click', () => {
              const newQty = Math.max(1, parseInt(input.value, 10) - 1);
              this.updateItem(lineId, newQty);
            });

            item.querySelector('[data-action="increase"]')?.addEventListener('click', () => {
              const newQty = Math.min(99, parseInt(input.value, 10) + 1);
              this.updateItem(lineId, newQty);
            });

            item.querySelector('[data-action="remove"]')?.addEventListener('click', () => {
              this.removeItem(lineId);
            });

            input?.addEventListener('change', (e) => {
              const newQty = parseInt(e.target.value, 10);
              if (newQty > 0 && newQty <= 99) {
                this.updateItem(lineId, newQty);
              }
            });
          });
        }
      }
    },
  };

  // ============================================
  // Forms Module
  // ============================================
  const forms = {
    /**
     * Initialize forms
     */
    init() {
      this.bindQuantitySelectors();
      this.bindNewsletterForms();
      this.bindContactForms();
    },

    /**
     * Bind quantity selectors
     */
    bindQuantitySelectors() {
      document.addEventListener('click', (e) => {
        const decrease = e.target.closest(CONFIG.quantityDecreaseSelector);
        const increase = e.target.closest(CONFIG.quantityIncreaseSelector);

        if (decrease || increase) {
          const wrapper = e.target.closest('.quantity-selector');
          const input = wrapper?.querySelector(CONFIG.quantityInputSelector);

          if (input) {
            const currentVal = parseInt(input.value, 10) || 1;

            if (decrease && currentVal > 1) {
              input.value = currentVal - 1;
            } else if (increase && currentVal < 99) {
              input.value = currentVal + 1;
            }

            input.dispatchEvent(new Event('change', { bubbles: true }));
          }
        }
      });
    },

    /**
     * Bind newsletter forms
     */
    bindNewsletterForms() {
      document.querySelectorAll('[data-newsletter-form]').forEach(form => {
        form.addEventListener('submit', async (e) => {
          e.preventDefault();

          const email = form.querySelector('input[name="email"]').value;
          const successEl = form.querySelector('[data-success-message]');
          const errorEl = form.querySelector('[data-error-message]');
          const submitBtn = form.querySelector('button[type="submit"]');

          // Disable submit
          if (submitBtn) {
            submitBtn.disabled = true;
          }

          try {
            await utils.fetchJSON('/api/newsletter/subscribe', {
              method: 'POST',
              body: JSON.stringify({ email }),
            });

            if (successEl) utils.show(successEl);
            if (errorEl) utils.hide(errorEl);
            form.reset();
          } catch (error) {
            if (successEl) utils.hide(successEl);
            if (errorEl) utils.show(errorEl);
          } finally {
            if (submitBtn) {
              submitBtn.disabled = false;
            }
          }
        });
      });
    },

    /**
     * Bind contact forms
     */
    bindContactForms() {
      document.querySelectorAll('[data-contact-form]').forEach(form => {
        form.addEventListener('submit', async (e) => {
          e.preventDefault();

          const formData = new FormData(form);
          const data = Object.fromEntries(formData.entries());
          const submitBtn = form.querySelector('button[type="submit"]');

          if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
          }

          try {
            await utils.fetchJSON('/api/contact', {
              method: 'POST',
              body: JSON.stringify(data),
            });

            form.innerHTML = '<p class="success">Thank you! Your message has been sent.</p>';
          } catch (error) {
            const errorEl = form.querySelector('.form-error');
            if (errorEl) {
              errorEl.textContent = 'Failed to send. Please try again.';
              utils.show(errorEl);
            }
          } finally {
            if (submitBtn) {
              submitBtn.disabled = false;
              submitBtn.textContent = 'Send';
            }
          }
        });
      });
    },
  };

  // ============================================
  // Navigation Module
  // ============================================
  const navigation = {
    /**
     * Initialize navigation
     */
    init() {
      this.bindMobileMenu();
      this.bindSearch();
      this.bindStickyHeader();
    },

    /**
     * Bind mobile menu toggle
     */
    bindMobileMenu() {
      document.querySelectorAll(CONFIG.mobileMenuToggleSelector).forEach(btn => {
        btn.addEventListener('click', () => {
          const nav = document.querySelector('.header-nav');
          if (nav) {
            nav.classList.toggle('open');
          }
        });
      });
    },

    /**
     * Bind search toggle
     */
    bindSearch() {
      document.querySelectorAll(CONFIG.searchToggleSelector).forEach(btn => {
        btn.addEventListener('click', () => {
          const searchOverlay = document.querySelector('[data-search-overlay]');
          if (searchOverlay) {
            utils.toggle(searchOverlay);
            const input = searchOverlay.querySelector('input');
            if (input && !searchOverlay.hidden) {
              input.focus();
            }
          }
        });
      });
    },

    /**
     * Bind sticky header
     */
    bindStickyHeader() {
      const header = document.querySelector('.site-header');
      if (!header) return;

      let lastScrollY = 0;

      const handleScroll = utils.throttle(() => {
        const scrollY = window.scrollY;

        if (scrollY > 100) {
          header.classList.add('scrolled');

          if (scrollY > lastScrollY) {
            header.classList.add('hidden');
          } else {
            header.classList.remove('hidden');
          }
        } else {
          header.classList.remove('scrolled', 'hidden');
        }

        lastScrollY = scrollY;
      }, 100);

      window.addEventListener('scroll', handleScroll, { passive: true });
    },
  };

  // ============================================
  // Initialize
  // ============================================
  document.addEventListener('DOMContentLoaded', () => {
    cart.init();
    forms.init();
    navigation.init();

    console.log('Tanqory Core initialized');
  });

  // Expose to global scope
  window.TanqoryCore = {
    cart,
    forms,
    navigation,
    utils,
  };

})();
