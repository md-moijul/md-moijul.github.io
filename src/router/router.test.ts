import { describe, it, expect } from 'vitest';
import { createRouter, createWebHistory } from 'vue-router';
import { routes } from './index';

describe('Router', () => {
  const router = createRouter({
    history: createWebHistory(),
    routes,
  });

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
});
