# Performance Baseline Report
**Date:** 2026-07-01
**URL:** `http://localhost:4173/`
**Device:** Desktop (via Lighthouse CLI & Chrome DevTools MCP)

## Overall Score
* **Performance Score:** 38 / 100

## Core Web Vitals & Key Metrics
* **Largest Contentful Paint (LCP):** 22.4 s ⚠️
* **Total Blocking Time (TBT):** 7,180 ms ⚠️
* **Cumulative Layout Shift (CLS):** 0.043 ✅
* **First Contentful Paint (FCP):** 0.87 s ✅

## Primary Bottlenecks & Opportunities
Based on the Lighthouse audit and performance trace insights, the following areas require immediate attention:

### 1. Main-Thread Work & High TBT
* **Issue:** Total Blocking Time is incredibly high (~7.18 seconds), severely penalizing the overall score. This indicates long tasks blocking the main thread during the initial load.
* **Action:** Investigate large JavaScript bundles, expensive component rendering, or synchronous heavy computations.

### 2. Severe LCP Delay
* **Issue:** LCP took 22.4s to render. The trace indicates a massive **Render Delay** (meaning the resource was downloaded quickly, but the browser could not render it promptly).
* **Action:** Ensure the LCP element is discoverable early and not dependent on complex client-side rendering logic or blocked by long main-thread tasks.

### 3. Forced Reflow & Layout Thrashing
* **Issue:** The performance trace identified "Forced Reflow" events, which occur when JavaScript queries geometric properties (e.g., `offsetWidth`, `getBoundingClientRect()`) immediately after styles or DOM state have been invalidated.
* **Action:** Audit components for synchronous DOM reads and writes. Batch reads and writes or use `requestAnimationFrame` to avoid layout thrashing.

### 4. Render-Blocking Requests & Network Dependencies
* **Issue:** Network requests are blocking the page's initial render, and there are long chains in the network dependency tree.
* **Action:** Defer non-critical CSS/JS, avoid deep import chaining, and review enormous network payloads.

### 5. Back/Forward Cache (bfcache) Prevention
* **Issue:** The page is currently preventing back/forward cache restoration.
* **Action:** Remove `unload` event listeners or other conflicting features that make the page ineligible for the bfcache to improve cross-page navigation performance.
