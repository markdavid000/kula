"use client";

import Image from "next/image";
import { useActionState } from "react";

import { submitContactForm, type ContactFormState } from "@/app/contact/actions";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/cn";
import {
  reachUs,
  reachUsChannels,
  reachUsFields,
  type ReachUsChannel,
  type ReachUsField,
} from "@/content/home-reach-us";

/**
 * Need to Reach us? — Figma node 574:2843 (1440 x 819, at page y 7930).
 *
 * A cream-light band, 80px of padding on all four sides, holding one horizontal
 * auto-layout (574:2844): a 577-wide column of contact details and a 501-wide
 * contact form, 202px apart and centred against each other. The form column is
 * 521 tall against the left column's 658.55, which is where its 68.78px offset
 * in the design comes from — it is `items-center`, not a hand-placed y.
 *
 * Below the canvas width the two columns stack; the composition needs 1280px of
 * content to hold its 202px gutter and there is nowhere sensible to put it in
 * between.
 *
 * The band's own gutter is 80px, not the 100px the rest of the site uses, so
 * this section sets its own rather than reaching for `Container`.
 *
 * This is a Client Component because the form reports its outcome: the design
 * draws only the resting state, and `submitContactForm` returns per-field
 * errors that would otherwise be dropped on the floor. See the deviation log.
 */

const initialState: ContactFormState = { status: "idle" };

/** Inter 18/27, -0.09 — the detail line under every contact title (574:2863). */
const detailType = "text-grey-mid text-[clamp(16px,1.25vw,18px)] leading-[1.5] tracking-[-0.005em]";

/** 574:2855 / 574:2864 / 574:2872 — 505 x 100, radius 12, 16px of padding. */
function Channel({ channel }: { channel: ReachUsChannel }) {
  return (
    <li className="bg-cream-light flex gap-4 rounded-[12px] py-4">
      {/* 574:2856 — a 40 x 40 box centring the 32 x 32 icon frame. */}
      <span className="flex h-10 w-10 shrink-0 items-center justify-center">
        <Icon
          src={channel.icon.src}
          size={32}
          insetX={channel.icon.insetX}
          insetY={channel.icon.insetY}
        />
      </span>

      {/* 574:2861 — gap 8. */}
      <div className="flex flex-col gap-2">
        {/* Gelica SemiBold 28/33.18. */}
        <h3 className="text-ink-soft text-[clamp(19px,1.9444vw,28px)] leading-[1.185] font-semibold">
          {channel.title}
        </h3>
        {channel.href ? (
          /*
           * DIRECTED: the address and phone number are linked. The design draws
           * them as plain text, and Tailwind's preflight strips the underline
           * from anchors, so this changes no pixel — it only makes a tap on a
           * phone number do the obvious thing.
           */
          <a href={channel.href} className={detailType}>
            {channel.detail}
          </a>
        ) : (
          <p className={detailType}>{channel.detail}</p>
        )}
      </div>
    </li>
  );
}

/** 574:2884 / 574:2888 / 574:2892 — label over control, gap 8. */
function Field({ field, error }: { field: ReachUsField; error?: string }) {
  const id = `reach-us-${field.name}`;
  const errorId = `${id}-error`;

  /*
   * 574:2886 — radius 12 on Cream Soft, 16px of padding, and a 1px #E5E5E5
   * stroke that Figma aligns INSIDE. An inset ring, not a border: a border
   * would displace the 16px padding by its own width, an inside stroke does
   * not.
   */
  const control = cn(
    "bg-cream-soft inset-ring-rule w-full rounded-[12px] p-4 inset-ring-1",
    "text-ink placeholder:text-grey-mid text-[14px] leading-[21px] tracking-[-0.07px]",
  );

  return (
    <div className="flex flex-col gap-2">
      {/* Inter SemiBold 16/24, -0.5. */}
      <label
        htmlFor={id}
        className="text-ink text-[16px] leading-6 font-semibold tracking-[-0.5px]"
      >
        {field.label}
      </label>

      {field.multiline ? (
        /* 574:2894 — 160 tall, and top-aligned: this row has no counter-axis
           centring, unlike the two single-line fields. */
        <textarea
          id={id}
          name={field.name}
          placeholder={field.placeholder}
          className={cn(control, "h-[160px] resize-none")}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
        />
      ) : (
        <input
          id={id}
          name={field.name}
          type={field.type ?? "text"}
          placeholder={field.placeholder}
          autoComplete={field.autoComplete}
          className={cn(control, "h-[64px]")}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
        />
      )}

      {/* NOT FROM FIGMA — see the deviation log. */}
      {error ? (
        <p id={errorId} className="text-brand text-[14px] leading-[21px] tracking-[-0.07px]">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function ReachUs() {
  const [state, formAction, pending] = useActionState(submitContactForm, initialState);

  return (
    <section
      aria-labelledby="reach-us-heading"
      className="bg-cream-light canvas:h-[819px] canvas:py-20 overflow-hidden py-14"
    >
      {/* 574:2844 — 1280 of content inside an 80px gutter, gap 202, centred. */}
      <div className="canvas:flex-row canvas:items-center canvas:gap-[202px] canvas:px-20 mx-auto flex w-full max-w-(--width-canvas) flex-col items-stretch gap-12 px-(--spacing-gutter)">
        {/* 574:2845 — 577 wide, gap 24. */}
        <div className="canvas:w-[577px] canvas:max-w-[577px] flex w-full flex-col gap-6">
          {/* 574:2846 — gap 24. */}
          <div className="flex flex-col gap-6">
            {/*
              574:2847 "Bubbles 2" — a 240 x 110.55 frame whose 13px white
              strokes paint 6.54px past it on every side, so the artwork is
              placed at its render bounds (253.07 x 123.63) and offset back into
              the frame box. Sizing it to the frame box instead would scale the
              whole drawing down by 5%.
            */}
            <div
              aria-hidden
              className="relative h-[clamp(69px,7.6771vw,110.55px)] w-[clamp(150px,16.6667vw,240px)] shrink-0"
            >
              <Image
                src="/icons/reach-us-bubbles.svg"
                alt=""
                width={254}
                height={124}
                className="absolute -top-[5.9%] -left-[2.7%] h-[111.8%] w-[105.4%] max-w-none"
              />
            </div>

            {/*
              574:2851 / 574:2852 — Gelica SemiBold 60/63. The Heading-Stack
              frame holds this one text node, so its 8px gap never applies.
            */}
            <h2
              id="reach-us-heading"
              className="text-ink text-[clamp(30px,4.1667vw,60px)] leading-[1.05] font-semibold"
            >
              {reachUs.heading}
            </h2>

            {/* 574:2853 — Inter 18/27, -0.09, over the full 577. */}
            <p className={detailType}>{reachUs.intro}</p>
          </div>

          {/* 574:2854 — 505 wide inside the 577 column, gap 16. */}
          <ul className="canvas:w-[505px] flex w-full flex-col gap-4">
            {reachUsChannels.map((channel) => (
              <Channel key={channel.title} channel={channel} />
            ))}
          </ul>
        </div>

        {/* 574:2882 — 501 wide, gap 33. */}
        <form
          action={formAction}
          noValidate
          className="canvas:w-[501px] canvas:max-w-[501px] canvas:gap-[33px] flex w-full flex-col gap-8"
        >
          {/*
            NOT FROM FIGMA. The outcome of a submission has to be announced, not
            only coloured, or it does not exist for a screen-reader user
            (WCAG 3.3.1).
          */}
          <div aria-live="polite" className="sr-only">
            {state.status === "success" ? reachUs.success : state.message}
          </div>

          {/* 574:2883 — gap 16. */}
          <div className="flex flex-col gap-4">
            {reachUsFields.map((field) => (
              <Field key={field.name} field={field} error={state.fieldErrors?.[field.name]} />
            ))}
          </div>

          {/* Honeypot — hidden from users, irresistible to bots. Matches the
              field `submitContactForm` checks. */}
          <div aria-hidden="true" className="hidden">
            <label htmlFor="reach-us-company">Company</label>
            <input id="reach-us-company" name="company" tabIndex={-1} autoComplete="off" />
          </div>

          {/*
            574:2896 — the shared Button (148:7465), stretched to the column and
            fixed at 72 tall. The design sets that height explicitly; the
            component's own 14px padding would leave it 56.
          */}
          <Button type="submit" disabled={pending} className="h-[72px] w-full">
            {pending ? reachUs.sending : reachUs.submit}
          </Button>

          {/* NOT FROM FIGMA — see the deviation log. */}
          {state.status === "error" && state.message ? (
            <p className="text-brand text-[14px] leading-[21px] tracking-[-0.07px]">
              {state.message}
            </p>
          ) : null}
          {state.status === "success" ? (
            <p className="text-forest text-[14px] leading-[21px] tracking-[-0.07px]">
              {reachUs.success}
            </p>
          ) : null}
        </form>
      </div>
    </section>
  );
}
