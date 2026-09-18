# Snag Chrome Extension

> Browser extension that intercepts visits to user-blacklisted sites with a 'why are you here?' prompt.

A lightweight Chrome Extension (Manifest V3) designed to curb mindless social media browsing by enforcing intentionality through custom site blacklists and timed active windows.

---

## 📋 Prerequisites

* **Node.js & npm** (required for running unit tests)

---

## 🚀 How to Run (Development)

To load and test the extension locally in Google Chrome:

1. Clone this repository to your local machine.
2. Open Google Chrome and navigate to `chrome://extensions`.
3. Enable **Developer mode** using the toggle switch in the top-right corner.
4. Click the **Load unpacked** button in the top-left corner.
5. Select the root directory of this project (where `manifest.json` is located).
6. The extension is now active. Whenever you make code changes, click the **Refresh (🔄)** icon on the extension card in `chrome://extensions`.

---

## 🧪 Running Tests

Unit tests are written using Vitest and mock the `chrome.storage` API. Test files live under `test/`, named `*.test.js`.

```bash
# Run the test suite
npm test
