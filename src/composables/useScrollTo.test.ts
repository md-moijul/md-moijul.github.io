import { describe, it, expect, vi, beforeEach } from "vitest";
import { useScrollTo } from "./useScrollTo";
import { lenisInstance } from "./useLenis";
import { nextTick } from "vue";

const mockPush = vi.fn();
let mockPath = "/";

vi.mock("vue-router", () => ({
	useRouter: () => ({
		push: mockPush,
	}),
	useRoute: () => ({
		get path() {
			return mockPath;
		},
	}),
}));

vi.mock("./useLenis", () => ({
	lenisInstance: {
		value: {
			scrollTo: vi.fn(),
			resize: vi.fn(),
		},
	},
}));

describe("useScrollTo", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		mockPath = "/";
	});

	it("should call lenis.scrollTo with -2rem offset", async () => {
		const { scrollToSection } = useScrollTo();

		// Mock getComputedStyle
		const originalGetComputedStyle = window.getComputedStyle;
		window.getComputedStyle = vi.fn().mockReturnValue({
			fontSize: "16px",
		});

		await scrollToSection("experience");

		expect(lenisInstance.value?.scrollTo).toHaveBeenCalledWith(
			"#experience",
			expect.objectContaining({
				offset: -32,
			}),
		);

		window.getComputedStyle = originalGetComputedStyle;
	});

	it("should work correctly when on a different route", async () => {
		mockPath = "/archive";
		const { scrollToSection } = useScrollTo();

		// Mock getComputedStyle
		const originalGetComputedStyle = window.getComputedStyle;
		window.getComputedStyle = vi.fn().mockReturnValue({
			fontSize: "16px",
		});

		await scrollToSection("projects");

		expect(mockPush).toHaveBeenCalledWith("/");
		await nextTick();
		await nextTick();

		expect(lenisInstance.value?.scrollTo).toHaveBeenCalledWith(
			"#projects",
			expect.objectContaining({
				offset: -32,
			}),
		);

		window.getComputedStyle = originalGetComputedStyle;
	});
});
