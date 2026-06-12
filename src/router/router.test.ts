import { describe, it, expect } from 'vitest';
import { router } from './index';

describe('Router', () => {
  it('should redirect unknown paths to home', async () => {
    await router.push('/some-random-path');
    expect(router.currentRoute.value.path).toBe('/');
  });

  it('should redirect nested unknown paths to home', async () => {
    await router.push('/nested/unknown/path');
    expect(router.currentRoute.value.path).toBe('/');
  });

  it('should allow valid path /archive', async () => {
    await router.push('/archive');
    expect(router.currentRoute.value.path).toBe('/archive');
  });

  it('should allow valid path /', async () => {
    await router.push('/');
    expect(router.currentRoute.value.path).toBe('/');
  });

  describe('Query Parameter Sanitization', () => {
    it('should remove "from" query parameter from the URL', async () => {
      // Navigate to a route with "from" parameter
      await router.push({ path: '/', query: { from: 'linkedin', other: 'param' } });
      
      // The router.replace in afterEach is async, so we wait for the next navigation
      await new Promise(resolve => setTimeout(resolve, 0));

      // Check if "from" is removed but "other" is kept
      expect(router.currentRoute.value.query.from).toBeUndefined();
      expect(router.currentRoute.value.query.other).toBe('param');
    });

    it('should remove "from" query parameter when navigating to /archive', async () => {
      await router.push({ path: '/archive', query: { from: 'github' } });
      await new Promise(resolve => setTimeout(resolve, 0));
      
      expect(router.currentRoute.value.path).toBe('/archive');
      expect(router.currentRoute.value.query.from).toBeUndefined();
    });
  });
});
