import { enableFetchMocks } from 'jest-fetch-mock';
import '../crypto-web-component';

enableFetchMocks();

// Flush the microtask queue so async operations in the component settle.
const flushPromises = (): Promise<void> => new Promise(resolve => setTimeout(resolve, 0));

describe('CryptoWebComponent', () => {
  let el: HTMLElement;

  beforeEach(() => {
    fetchMock.resetMocks();
    // Mock the /currencies endpoint called during connectedCallback.
    fetchMock.mockResponseOnce(
      JSON.stringify([
        { id: 'BTC', name: 'Bitcoin' },
        { id: 'ETH', name: 'Ethereum' },
      ])
    );
    el = document.createElement('crypto-web-component');
    document.body.appendChild(el);
  });

  afterEach(() => {
    document.body.removeChild(el);
  });

  it('should register as a custom element', () => {
    expect(customElements.get('crypto-web-component')).toBeDefined();
  });

  it('renders an input and a disabled button', () => {
    const input = el.shadowRoot!.querySelector('input');
    const button = el.shadowRoot!.querySelector<HTMLButtonElement>('button');
    expect(input).not.toBeNull();
    expect(button).not.toBeNull();
    // Use hasAttribute because Happy DOM v2 does not fully implement the disabled IDL attribute.
    expect(button!.hasAttribute('disabled')).toBe(true);
  });

  it('populates the datalist with filtered results after typing', async () => {
    await flushPromises(); // let _loadCurrencies settle
    const input = el.shadowRoot!.querySelector<HTMLInputElement>('input')!;
    const datalist = el.shadowRoot!.querySelector('datalist')!;
    input.value = 'B';
    input.dispatchEvent(new Event('input'));
    expect(datalist.children.length).toBeGreaterThan(0);
    expect(datalist.children.length).toBeLessThanOrEqual(15);
  });

  it('enables the button when the input has a value', () => {
    const input = el.shadowRoot!.querySelector<HTMLInputElement>('input')!;
    const button = el.shadowRoot!.querySelector<HTMLButtonElement>('button')!;
    input.value = 'BTC';
    input.dispatchEvent(new Event('input'));
    expect(button.disabled).toBe(false);
  });

  it('displays a USD price on a successful fetch', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ price: 50000 }));
    const input = el.shadowRoot!.querySelector<HTMLInputElement>('input')!;
    const button = el.shadowRoot!.querySelector<HTMLButtonElement>('button')!;
    const result = el.shadowRoot!.querySelector<HTMLParagraphElement>('#result')!;

    input.value = 'BTC';
    input.dispatchEvent(new Event('input'));
    button.click();
    await flushPromises();

    expect(result.hidden).toBe(false);
    expect(result.textContent).toContain('$');
    expect(result.hasAttribute('data-error')).toBe(false);
  });

  it('shows an error when the coin is not found', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ message: 'NotFound' }));
    const input = el.shadowRoot!.querySelector<HTMLInputElement>('input')!;
    const button = el.shadowRoot!.querySelector<HTMLButtonElement>('button')!;
    const result = el.shadowRoot!.querySelector<HTMLParagraphElement>('#result')!;

    input.value = 'NOTACOIN';
    input.dispatchEvent(new Event('input'));
    button.click();
    await flushPromises();

    expect(result.hidden).toBe(false);
    expect(result.hasAttribute('data-error')).toBe(true);
  });
});
