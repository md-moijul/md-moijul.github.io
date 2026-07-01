import { describe, it, expect } from 'vitest';
import { sortProjectsByStackAndDate } from './project';
import { type Project } from '@/assets/data';

describe('sortProjectsByStackAndDate', () => {
    const projects: Project[] = [
        { name: 'Older', desc: '', date: new Date('2022-01-01'), stack: ['Vue'], sourceCode: '', liveUrl: '', featured: false },
        { name: 'Newer', desc: '', date: new Date('2023-01-01'), stack: ['React'], sourceCode: '', liveUrl: '', featured: false },
        { name: 'Match Stack', desc: '', date: new Date('2020-01-01'), stack: ['TypeScript'], sourceCode: '', liveUrl: '', featured: false }
    ];

    it('sorts by date descending when no stacks are active', () => {
        const sorted = sortProjectsByStackAndDate(projects, []);
        expect(sorted[0].name).toBe('Newer');
        expect(sorted[1].name).toBe('Older');
        expect(sorted[2].name).toBe('Match Stack');
    });

    it('prioritizes stack match over date', () => {
        const sorted = sortProjectsByStackAndDate(projects, ['TypeScript']);
        expect(sorted[0].name).toBe('Match Stack');
        expect(sorted[1].name).toBe('Newer');
        expect(sorted[2].name).toBe('Older');
    });
});
