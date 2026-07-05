import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('index.html infrastructure', () => {
    it('should include the Umami analytics script with the correct configuration', () => {
        const htmlPath = path.resolve(__dirname, '../index.html');
        const htmlContent = fs.readFileSync(htmlPath, 'utf-8');
        
        expect(htmlContent).toContain('https://cloud.umami.is/script.js');
        expect(htmlContent).toContain('data-website-id="34126708-11ab-4a4f-9433-d305a68d141a"');
        expect(htmlContent).toMatch(/<script[^>]*defer[^>]*src="https:\/\/cloud\.umami\.is\/script\.js"/);
    });

    it('should use synchronous stylesheet for fonts and preload critical fonts', () => {
        const htmlPath = path.resolve(__dirname, '../index.html');
        const htmlContent = fs.readFileSync(htmlPath, 'utf-8');
        
        // Should not use the onload hack
        expect(htmlContent).not.toContain('onload="this.onload=null;this.rel=\'stylesheet\'"');
        
        // Should have preload tags for the self-hosted fonts
        const hasFontPreload = /<link[^>]*rel="preload"[^>]*href="\/fonts\/[^"]*\.woff2"[^>]*as="font"[^>]*crossorigin/i.test(htmlContent);
        
        expect(hasFontPreload).toBe(true);
    });
});
