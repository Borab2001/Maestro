/* eslint-disable */

"use client"
import { cn } from "@/lib/utils"
import { AnimatePresence, motion, useInView } from "framer-motion"
import type { TargetAndTransition, Transition, Variant, Variants } from "framer-motion"
import React, { useMemo, useRef } from "react"

export type PresetType = "blur" | "fade-in-blur" | "scale" | "fade" | "slide"

export type PerType = "word" | "char" | "line"

export type TextEffectProps = {
  children: string
  per?: PerType
  as?: keyof React.JSX.IntrinsicElements
  variants?: {
    container?: Variants
    item?: Variants
  }
  className?: string
  preset?: PresetType
  delay?: number
  speedReveal?: number
  speedSegment?: number
  trigger?: boolean
  onAnimationComplete?: () => void
  onAnimationStart?: () => void
  segmentWrapperClassName?: string
  containerTransition?: Transition
  segmentTransition?: Transition
  style?: React.CSSProperties
  useInViewTrigger?: boolean
  inViewOptions?: {
    once?: boolean
    margin?: string
    amount?: number | "some" | "all"
  }
  mountWhileHidden?: boolean
}

const defaultStaggerTimes: Record<PerType, number> = {
  char: 0.03,
  word: 0.05,
  line: 0.1,
}

const defaultContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
  exit: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
}

const defaultItemVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
  },
  exit: { opacity: 0 },
}

const presetVariants: Record<PresetType, { container: Variants; item: Variants }> = {
  blur: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, filter: "blur(12px)" },
      visible: { opacity: 1, filter: "blur(0px)" },
      exit: { opacity: 0, filter: "blur(12px)" },
    },
  },
  "fade-in-blur": {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, y: 20, filter: "blur(12px)" },
      visible: { opacity: 1, y: 0, filter: "blur(0px)" },
      exit: { opacity: 0, y: 20, filter: "blur(12px)" },
    },
  },
  scale: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, scale: 0 },
      visible: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0 },
    },
  },
  fade: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
      exit: { opacity: 0 },
    },
  },
  slide: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 20 },
    },
  },
}

const AnimationComponent: React.FC<{
  segment: string
  variants: Variants
  per: "line" | "word" | "char"
  segmentWrapperClassName?: string
  index: number
}> = React.memo(({ segment, variants, per, segmentWrapperClassName, index }) => {
  const content = useMemo(() => {
    if (per === "line") {
      return (
        <motion.span variants={variants} className="block">
          {segment}
        </motion.span>
      )
    }

    if (per === "word") {
      return (
        <motion.span aria-hidden="true" variants={variants} className="inline-block whitespace-pre">
          {segment}
        </motion.span>
      )
    }

    // per === 'char'
    return (
      <motion.span className="inline-block whitespace-pre">
        {segment.split("").map((char, charIndex) => (
          <motion.span
            key={`char-${index}-${charIndex}`}
            aria-hidden="true"
            variants={variants}
            className="inline-block whitespace-pre"
          >
            {char}
          </motion.span>
        ))}
      </motion.span>
    )
  }, [segment, variants, per, index])

  if (!segmentWrapperClassName) {
    return content
  }

  const defaultWrapperClassName = per === "line" ? "block" : "inline-block"

  return <span className={cn(defaultWrapperClassName, segmentWrapperClassName)}>{content}</span>
})

AnimationComponent.displayName = "AnimationComponent"

const splitText = (text: string, per: PerType): string[] => {
  if (per === "line") return text.split("\n")
  return text.split(/(\s+)/)
}

const hasTransition = (variant?: Variant): variant is TargetAndTransition & { transition?: Transition } => {
  if (!variant) return false
  return typeof variant === "object" && "transition" in variant
}

const createVariantsWithTransition = (
  baseVariants: Variants,
  transition?: Transition & { exit?: Transition },
): Variants => {
  if (!transition) return baseVariants

  const { exit: _, ...mainTransition } = transition

  return {
    ...baseVariants,
    visible: {
      ...baseVariants.visible,
      transition: {
        ...(hasTransition(baseVariants.visible) ? baseVariants.visible.transition : {}),
        ...mainTransition,
      },
    },
    exit: {
      ...baseVariants.exit,
      transition: {
        ...(hasTransition(baseVariants.exit) ? baseVariants.exit.transition : {}),
        ...mainTransition,
        staggerDirection: -1,
      },
    },
  }
}

export const TextEffect = React.memo<TextEffectProps>(
  ({
    children,
    per = "word",
    as = "p",
    variants,
    className,
    preset = "fade",
    delay = 0,
    speedReveal = 1,
    speedSegment = 1,
    trigger = true,
    onAnimationComplete,
    onAnimationStart,
    segmentWrapperClassName,
    containerTransition,
    segmentTransition,
    style,
    useInViewTrigger = false,
    inViewOptions = { once: true, margin: "0px 0px -10px 0px", amount: 0.1 },
    mountWhileHidden = false,
  }) => {
    const ref = useRef<HTMLElement>(null)
    const isInView = useInView(ref, {
      once: inViewOptions.once ?? true,
      margin: inViewOptions.margin as any,
      amount: inViewOptions.amount ?? 0.1,
    })

    const segments = useMemo(() => splitText(children, per), [children, per])
    const MotionTag = motion[as as keyof typeof motion] as typeof motion.div

    const computedVariants = useMemo(() => {
      const baseVariants = preset
        ? presetVariants[preset]
        : { container: defaultContainerVariants, item: defaultItemVariants }

      const stagger = defaultStaggerTimes[per] / speedReveal
      const baseDuration = 0.3 / speedSegment

      const customStagger = hasTransition(variants?.container?.visible ?? {})
        ? (variants?.container?.visible as TargetAndTransition).transition?.staggerChildren
        : undefined

      const customDelay = hasTransition(variants?.container?.visible ?? {})
        ? (variants?.container?.visible as TargetAndTransition).transition?.delayChildren
        : undefined

      return {
        container: createVariantsWithTransition(variants?.container || baseVariants.container, {
          staggerChildren: customStagger ?? stagger,
          delayChildren: customDelay ?? delay,
          ...containerTransition,
          exit: {
            staggerChildren: customStagger ?? stagger,
            staggerDirection: -1,
          },
        }),
        item: createVariantsWithTransition(variants?.item || baseVariants.item, {
          duration: baseDuration,
          ...segmentTransition,
        }),
      }
    }, [preset, variants, per, speedReveal, speedSegment, delay, containerTransition, segmentTransition])

    const shouldAnimate = useInViewTrigger ? isInView : trigger

    return (
      <MotionTag
        ref={ref as any}
        initial="hidden"
        animate={shouldAnimate ? "visible" : "hidden"}
        exit="exit"
        variants={computedVariants.container}
        className={className}
        onAnimationComplete={onAnimationComplete}
        onAnimationStart={onAnimationStart}
        aria-label={children}
        style={{
          ...(mountWhileHidden && !shouldAnimate ? { visibility: "hidden" } : {}),
          ...style,
        }}
      >
        {segments.map((segment, index) => (
          <AnimationComponent
            key={`${per}-${index}-${segment}`}
            segment={segment}
            variants={computedVariants.item}
            per={per}
            segmentWrapperClassName={segmentWrapperClassName}
            index={index}
          />
        ))}
      </MotionTag>
    )
  },
)

TextEffect.displayName = "TextEffect"
