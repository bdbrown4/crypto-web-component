interface CryptoData {
  id: string;
  name: string;
}

interface CryptoTicker {
  price?: number;
  message?: string;
}

// Template is parsed once at module load and cloned per instance — fast & zero-cost reuse.
const TEMPLATE = document.createElement('template');
TEMPLATE.innerHTML = `<style>
  :host {
    /* Customisable design tokens — override on the element to theme the component */
    --_container-bg: var(--cwc-container-bg, antiquewhite);
    --_form-bg:      var(--cwc-form-bg, #fff);
    --_input-color:  var(--cwc-input-color, #333);
    --_border-color: var(--cwc-border-color, #ccc);
    display: block;
    font-family: Arial, Helvetica, sans-serif;
    box-sizing: border-box;
  }
  .container {
    background: var(--_container-bg);
    border-radius: 25px;
    padding: 20px;
    text-align: center;
    width: clamp(260px, 100%, 500px);
    box-sizing: border-box;
    margin: 0 auto;
  }
  .btc-icon { width: 72px; height: 72px; }
  .form {
    background: var(--_form-bg);
    border-radius: 25px;
    padding: 16px 12px;
    margin-top: 16px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 12px;
  }
  .field { position: relative; display: inline-flex; }
  label {
    position: absolute;
    left: 14px;
    top: -8px;
    /* Must match form background so the floating label "cuts" the input border cleanly */
    background: var(--_form-bg);
    color: var(--_input-color);
    font-size: 12px;
    padding: 0 3px;
    pointer-events: none;
  }
  input {
    background: var(--_form-bg);
    color: var(--_input-color);
    border: 1.5px solid var(--_border-color);
    border-radius: 25px;
    padding: 9px 12px;
    font-size: 15px;
    font-weight: 600;
    font-family: inherit;
    outline: none;
    width: 160px;
    transition: border-color 0.15s;
  }
  input:focus { border-color: #f7931a; }
  button {
    background: #f7931a;
    border: none;
    border-radius: 25px;
    color: #fff;
    font-family: inherit;
    font-size: 15px;
    font-weight: bold;
    padding: 9px 22px;
    cursor: pointer;
    transition: opacity 0.15s;
  }
  button:disabled { opacity: 0.45; cursor: not-allowed; }
  #result {
    width: 100%;
    font-size: 24px;
    color: #f7931a;
    margin: 8px 0 0;
  }
  #result[data-error] {
    color: #c0392b;
    font-size: 15px;
  }
</style>
<div class="container" part="container">
  <svg class="btc-icon" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
    <circle cx="32" cy="32" r="32" fill="#f7931a"/>
    <path fill="#fff" d="M46.1 27.4c.6-4-2.5-6.2-6.7-7.6l1.4-5.5-3.3-.8-1.3 5.3c-.9-.2-1.8-.4-2.7-.6l1.3-5.4-3.3-.8-1.4 5.5c-.7-.2-1.4-.3-2.1-.5l-4.5-1.1-.9 3.5s2.5.6 2.4.6c1.3.3 1.6 1.1 1.5 1.8l-1.5 6.1c.1 0 .2.1.3.1-.1 0-.2-.1-.3-.1l-2.2 8.6c-.2.4-.6 1-1.5.8 0 .1-2.4-.6-2.4-.6l-1.7 3.8 4.3 1.1 2.4.6-1.4 5.6 3.3.8 1.4-5.5c.9.2 1.8.5 2.7.7l-1.4 5.5 3.3.8 1.4-5.6c5.6 1.1 9.8.6 11.6-4.4 1.4-4-.1-6.3-3-7.8 2.1-.5 3.7-1.9 4.1-4.9zm-7.4 10.4c-1 4-7.8 1.8-10 1.3l1.8-7.1c2.2.6 9.3 1.6 8.2 5.8zm1-10.5c-.9 3.7-6.6 1.8-8.5 1.4l1.6-6.4c1.9.5 7.9 1.3 6.9 5z"/>
  </svg>
  <div class="form" part="form">
    <div class="field">
      <label for="crypto-input">Cryptocurrency</label>
      <input id="crypto-input" list="crypto-list" autocomplete="off" part="input">
      <datalist id="crypto-list"></datalist>
    </div>
    <button id="fetch-btn" disabled part="button">Fetch USD Value</button>
    <p id="result" hidden part="result" role="status"></p>
  </div>
</div>`;

export class CryptoWebComponent extends HTMLElement {
  private _ticker = '';
  private _currencies: CryptoData[] = [];
  private readonly _fmt = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
  private _input!: HTMLInputElement;
  private _button!: HTMLButtonElement;
  private _result!: HTMLParagraphElement;
  private _datalist!: HTMLElement;

  constructor() {
    super();
    const root = this.attachShadow({ mode: 'open' });
    root.appendChild(TEMPLATE.content.cloneNode(true));
    this._input = root.querySelector<HTMLInputElement>('#crypto-input')!;
    this._button = root.querySelector<HTMLButtonElement>('#fetch-btn')!;
    this._result = root.querySelector<HTMLParagraphElement>('#result')!;
    this._datalist = root.querySelector<HTMLElement>('#crypto-list')!;
  }

  connectedCallback(): void {
    this._input.addEventListener('input', this._onInput);
    this._input.addEventListener('blur', this._onBlur);
    this._button.addEventListener('click', this._onFetch);
    this._loadCurrencies();
  }

  disconnectedCallback(): void {
    this._input.removeEventListener('input', this._onInput);
    this._input.removeEventListener('blur', this._onBlur);
    this._button.removeEventListener('click', this._onFetch);
  }

  // Arrow function class fields capture `this` and maintain a stable reference,
  // which is required for addEventListener/removeEventListener to work correctly.
  private _onInput = (event: Event): void => {
    this._ticker = this._input.value.trim().toUpperCase();
    // Normalise display to uppercase so option values (lowercase) always differ
    // from the input value — this guarantees the browser fires 'input' on the
    // first datalist click regardless of whether the value appears to match.
    this._input.value = this._ticker;
    this._button.disabled = this._ticker.length === 0;
    this._result.hidden = true;
    this._result.removeAttribute('data-error');
    this._result.textContent = '';
    // When the user picks from the datalist the browser fires 'input' with an
    // empty inputType (vs 'insertText' / 'deleteContentBackward' for keyboard).
    // Dismiss suggestions immediately so the dropdown doesn't re-open.
    if ((event as InputEvent).inputType === '') {
      this._datalist.innerHTML = '';
      return;
    }
    this._filterDatalist(this._ticker);
  };

  // Dismiss suggestions when focus leaves the input and a valid ticker is present
  // (covers the tab-to-button case).
  private _onBlur = (): void => {
    if (this._ticker && this._currencies.some(c => c.id === this._ticker)) {
      this._datalist.innerHTML = '';
    }
  };

  private _onFetch = async (): Promise<void> => {
    if (!this._ticker) return;
    this._button.disabled = true;
    this._result.hidden = true;

    try {
      const res = await fetch(
        `https://api.exchange.coinbase.com/products/${this._ticker}-USD/ticker`
      );
      const data: CryptoTicker = await res.json();
      if (data.message) {
        this._result.setAttribute('data-error', '');
        this._result.textContent = `Could not find "${this._ticker}" on Coinbase.`;
      } else {
        this._result.removeAttribute('data-error');
        this._result.textContent = this._fmt.format(data.price!);
      }
    } catch {
      this._result.setAttribute('data-error', '');
      this._result.textContent = 'Failed to fetch data. Please try again.';
    }

    this._result.hidden = false;
    this._button.disabled = false;
  };

  // Fetches all currencies once and stores them; the datalist is populated
  // lazily via _filterDatalist so the dropdown never shows an overwhelming list.
  private async _loadCurrencies(): Promise<void> {
    try {
      const res = await fetch('https://api.exchange.coinbase.com/currencies');
      if (!res.ok) return;
      this._currencies = await res.json();
    } catch { /* non-fatal — datalist is an optional UX enhancement */ }
  }

  // Caps suggestions at 15 results to keep the dropdown usable.
  // Option values are stored lowercase so they always differ from the uppercased
  // input value — this ensures the browser fires 'input' on the first datalist
  // click even when the user has typed an exact ticker match.
  private _filterDatalist(query: string): void {
    const q = query.toLowerCase();
    const matches = q
      ? this._currencies
          .filter(c => c.id.toLowerCase().startsWith(q) || c.name.toLowerCase().startsWith(q))
          .slice(0, 15)
      : [];

    this._datalist.innerHTML = '';
    if (matches.length === 0) return;

    const frag = document.createDocumentFragment();
    for (const { id, name } of matches) {
      const opt = document.createElement('option');
      opt.value = id.toLowerCase(); // lowercase so it always differs from the uppercase input
      opt.label = `${name} \u2013 ${id}`;
      frag.appendChild(opt);
    }
    this._datalist.appendChild(frag);
  }
}

customElements.define('crypto-web-component', CryptoWebComponent);
