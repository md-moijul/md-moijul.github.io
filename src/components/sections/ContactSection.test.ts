import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import ContactSection from '@/components/sections/ContactSection.vue';
import emailjs from '@emailjs/browser';
import { contactData } from '@/assets/data';

vi.mock('@emailjs/browser', () => ({
	default: {
		send: vi.fn().mockResolvedValue({ text: 'OK' }),
		init: vi.fn(),
	},
}));

describe('ContactSection', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('submits the form with all fields in a single step', async () => {
		const wrapper = mount(ContactSection);

		const emailInput = wrapper.find('input[type="email"]');
		const nameInput = wrapper.find('input[aria-label="Full Name"]');
		const messageInput = wrapper.find('textarea');
		
		await emailInput.setValue('test@example.com');
		await nameInput.setValue('John Doe');
		await messageInput.setValue('Hello there!');
		await wrapper.find('form').trigger('submit');

		expect(emailjs.send).toHaveBeenCalledWith(
			import.meta.env.VITE_EMAILJS_SERVICE_ID,
			import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
			{
				user_email: 'test@example.com',
				from_name: 'John Doe',
				message: 'Hello there!',
			}
		);
	});

	it('shows sending state while submitting', async () => {
		let resolveSend: (value: any) => void = () => {};
		(emailjs.send as any).mockReturnValue(new Promise((resolve) => {
			resolveSend = resolve;
		}));

		const wrapper = mount(ContactSection);
		
		await wrapper.find('input[type="email"]').setValue('test@example.com');
		await wrapper.find('input[aria-label="Full Name"]').setValue('John Doe');
		await wrapper.find('textarea').setValue('Hello!');
		await wrapper.find('form').trigger('submit');

		const button = wrapper.find('button[type="submit"]');
		expect(button.text()).toBe(contactData.buttons.sending);
		expect(button.attributes('disabled')).toBeDefined();

		await resolveSend({ text: 'OK' });
		await wrapper.vm.$nextTick();

		expect(wrapper.text()).toContain(contactData.successMessage);
	});

	it('shows success message and removes form on success', async () => {
		const wrapper = mount(ContactSection);
		
		await wrapper.find('input[type="email"]').setValue('test@example.com');
		await wrapper.find('input[aria-label="Full Name"]').setValue('John Doe');
		await wrapper.find('textarea').setValue('Hello!');
		await wrapper.find('form').trigger('submit');

		await wrapper.vm.$nextTick(); // Wait for promise to resolve

		expect(wrapper.text()).toContain(contactData.successMessage);
		expect(wrapper.find('form').exists()).toBe(false);
	});

	it('shows error message and allows retry on failure', async () => {
		(emailjs.send as any).mockRejectedValue(new Error('Failed'));

		const wrapper = mount(ContactSection);
		
		await wrapper.find('input[type="email"]').setValue('test@example.com');
		await wrapper.find('input[aria-label="Full Name"]').setValue('John Doe');
		await wrapper.find('textarea').setValue('Hello!');
		await wrapper.find('form').trigger('submit');

		await wrapper.vm.$nextTick();

		expect(wrapper.text()).toContain(contactData.errorMessage);
		// Should still show the form
		expect(wrapper.find('input[type="email"]').exists()).toBe(true);
		expect((wrapper.find('input[type="email"]').element as HTMLInputElement).value).toBe('test@example.com');
	});
});
