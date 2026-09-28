# Privacy Policy — Gmail Gold Important Marker

**Last updated:** 2026-09-28

Gmail Gold Important Marker is a local, visual-only browser customization.

## What this extension does

- Applies CSS color overrides to two small icon elements in Gmail's web
  UI (the "Important" marker and, optionally, the star icon) so they
  render gold/yellow instead of Gmail's current blue.
- Stores your preferences (on/off, which features are enabled, and your
  chosen gold color) using Chrome's built-in `chrome.storage.sync`.

## What this extension does NOT do

- It does **not** collect, read, transmit, sell, or share any user data.
- It does **not** access, read, parse, store, log, or otherwise process
  email content — no subject lines, sender/recipient addresses, message
  bodies, labels, attachments, or search queries are ever read.
- It does **not** call the Gmail API, the Google API, or any other web
  service or endpoint.
- It does **not** make any network requests of any kind. There is no
  remote code, analytics, telemetry, or tracking of any kind in this
  extension.
- It does **not** use cookies.
- It does **not** run on any site other than `mail.google.com`.

## Data storage

The only data this extension stores is your own preference settings:

- Whether the extension is enabled
- Whether "Recolor Important markers" is on
- Whether "Recolor Stars" is on
- Your chosen gold color (a hex value)

These are stored using `chrome.storage.sync`, which is provided by
Chrome itself. If you are signed into Chrome with sync enabled, Chrome
may sync these preference values across your own devices, subject to
your own Chrome Sync configuration — this extension has no visibility
into or control over that beyond calling the standard `chrome.storage`
API. No preference data is ever sent anywhere by this extension.

## Scope

All behavior described above is scoped strictly to pages served from
`https://mail.google.com/*`. The extension has no permissions to act on
any other site.

## Contact

This extension is open source and locally installed; review the source
files (`content.js`, `content.css`, `popup.js`) directly to verify these
claims — there is no bundled or minified code to obscure.
