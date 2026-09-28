/**
 * Home — "Need to Reach us?" copy, transcribed verbatim from the Kula Figma
 * file (FfC9ofVeF8u6tnMm1M57lz, node 574:2843). Node ids are recorded against
 * each string so a change in the design can be traced to the exact line here.
 *
 * Strings are stored exactly as they appear in Figma's `characters`, including
 * the lower-case street address and the straight apostrophe in "we'd".
 */

export const reachUs = {
  /** 574:2852 */
  heading: "Need to Reach us?",
  /** 574:2853 */
  intro:
    "Whether you have questions about our service, need support, or want to partner with us, we'd love to hear from you. Our team is ready to assist you with any inquiries.",
  /** I574:2896;148:7462 */
  submit: "Submit",
  /**
   * Not in the design — the form is drawn in its resting state only. Needed
   * once it becomes a real form: a submission whose outcome is never announced
   * is invisible to screen readers (WCAG 3.3.1). See the deviation log.
   */
  sending: "Sending…",
  success: "Thanks — we've got your message and will be in touch.",
} as const;

/** One row of the contact list — 574:2855 / 574:2864 / 574:2872. */
export interface ReachUsChannel {
  /** 574:2862 / 574:2870 / 574:2880 */
  readonly title: string;
  /** 574:2863 / 574:2871 / 574:2881 */
  readonly detail: string;
  /**
   * `mailto:` / `tel:` target. Absent for the address, which the design draws
   * as plain text with nothing to link to.
   */
  readonly href?: string;
  /** Exported icon, and its inset inside the 32 x 32 Figma frame in percent. */
  readonly icon: {
    readonly src: string;
    readonly insetX: number;
    readonly insetY: number;
  };
}

export const reachUsChannels: readonly ReachUsChannel[] = [
  {
    title: "Send us a mail",
    detail: "thekulaapp.info@gmail.com",
    href: "mailto:thekulaapp.info@gmail.com",
    // 574:2857 `si:mail-duotone` — a 28.17 x 22.83 glyph in a 32 x 32 box.
    //
    // Insets are 0 on all three: each file is the whole 32 x 32 frame with the
    // glyph already placed inside it. Insetting it again padded it twice — and
    // the mail's unequal 5.99 / 14.32 squashed the envelope to 28 x 23.
    icon: { src: "/icons/contact-mail.svg", insetX: 0, insetY: 0 },
  },
  {
    title: "Call us",
    detail: "+234 (0)8169134590",
    href: "tel:+2348169134590",
    // 574:2866 `si:phone-add-call-duotone` — 26.00 x 26.01 in a 32 x 32 box.
    icon: { src: "/icons/contact-phone.svg", insetX: 0, insetY: 0 },
  },
  {
    title: "Visit us",
    detail: "11 victor malu road new GRA makurdi",
    // 574:2874 `line-md:my-location-twotone` — 29.33 square in a 32 x 32 box.
    icon: { src: "/icons/contact-location.svg", insetX: 0, insetY: 0 },
  },
];

/** One labelled form control — 574:2884 / 574:2888 / 574:2892. */
export interface ReachUsField {
  /** Submitted key. Matches `submitContactForm`, which reads these names. */
  readonly name: "name" | "email" | "message";
  /** 574:2885 / 574:2889 / 574:2893 */
  readonly label: string;
  /** 574:2887 / 574:2891 / 574:2895 */
  readonly placeholder: string;
  readonly type?: "text" | "email";
  readonly autoComplete?: string;
  /** 574:2894 is a 160-tall box rather than the 64-tall single-line field. */
  readonly multiline?: boolean;
}

export const reachUsFields: readonly ReachUsField[] = [
  { name: "name", label: "Name", placeholder: "Tell us your name", autoComplete: "name" },
  {
    name: "email",
    label: "Email Address",
    placeholder: "Enter your email address",
    type: "email",
    autoComplete: "email",
  },
  { name: "message", label: "Message", placeholder: "Write your message here", multiline: true },
];
