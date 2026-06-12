import { cva, type VariantProps } from 'class-variance-authority'

export { default as Badge } from './Badge.vue'

export const badgeVariants = cva(
    'inline-flex items-center justify-center rounded-full border px-3 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden',
    {
        variants: {
            variant: {
                default:
                    'border-transparent bg-white/20 text-primary-foreground [a&]:hover:bg-primary/20',
                secondary:
                    'border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90',
                destructive:
                    'border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
                outline:
                    'text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground',
                sparkly:
                    'relative overflow-hidden bg-background text-foreground border-white/60 z-0 before:absolute before:inset-[-1000%] before:animate-[spin_4s_linear_infinite] before:bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,rgba(255,255,255,0.3)_50%,transparent_100%)] before:-z-10 after:absolute after:inset-[1px] after:rounded-full after:bg-background after:-z-10 hover:after:bg-secondary/20 transition-colors cursor-pointer',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    },
)
export type BadgeVariants = VariantProps<typeof badgeVariants>
