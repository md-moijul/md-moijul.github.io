import { test, expect } from '@playwright/test';

test.describe('Scroll and Navigation', () => {
  test('clicking a navigation link smoothly scrolls the page to the correct section', async ({ page }) => {
    await page.goto('/');

    // Wait for the about link to be active initially
    const desktopNav = page.locator('div.md\\:h-screen nav.hidden');
    await expect(desktopNav.locator('a[href="#about"]')).toHaveClass(/active-link/);

    // Get the experience link and click it
    const experienceLink = desktopNav.locator('a[href="#experience"]');
    await experienceLink.click();

    // The experience link should become active
    await expect(experienceLink).toHaveClass(/active-link/);

    // The experience section should be in the viewport
    const experienceSection = page.locator('#experience');
    await expect(experienceSection).toBeInViewport();
  });

  test('manual scrolling updates the active section highlight in the navigation panel', async ({ page }) => {
    await page.goto('/');

    // Ensure the about link is initially active
    const desktopNav = page.locator('div.md\\:h-screen nav.hidden');
    await expect(desktopNav.locator('a[href="#about"]')).toHaveClass(/active-link/);

    // Get the projects section and scroll to it
    const projectsSection = page.locator('#projects');
    await projectsSection.scrollIntoViewIfNeeded();

    // The intersection observer should update the active link to projects
    await expect(desktopNav.locator('a[href="#projects"]')).toHaveClass(/active-link/);
  });

  test.describe('Cross-route navigation on mobile', () => {
    test.use({ viewport: { width: 375, height: 812 } });

    test('starting on /archive, clicking a section link, routing to /, and scrolling to the target', async ({ page }) => {
      await page.goto('/archive');

      // Make sure we are on the archive page
      await expect(page.locator('h1', { hasText: 'All Projects' })).toBeVisible();

      // Open the mobile menu
      const menuButton = page.locator('button[aria-label="Toggle Menu"]');
      await menuButton.click();

      // Click the projects link in the mobile menu
      const projectsLink = page.locator('.md\\:hidden nav a', { hasText: /projects/i });
      await projectsLink.click();

      // Should navigate to home and scroll to projects
      await expect(page).toHaveURL(/.*\/$/);
      
      // Wait for scroll animation to complete and projects section to be in viewport
      const projectsSection = page.locator('#projects');
      await expect(projectsSection).toBeInViewport();
    });
  });
});
