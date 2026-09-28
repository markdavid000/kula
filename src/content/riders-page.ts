/**
 * Riders page copy, transcribed verbatim from the Kula Figma file
 * (FfC9ofVeF8u6tnMm1M57lz, node 441:6478 "Riders"). Every string carries the id
 * of the text node it comes from, so a change in the design traces back to one
 * line here.
 *
 * Nothing in this file is rewritten, tidied or shortened. Where the design
 * gives a node a name that disagrees with its own `characters` — 441:6848 is
 * named "What are you\ncraving today?" but reads "With Kula, you control
 * orders…" — the `characters` win, because that is what the frame renders.
 *
 * The only strings NOT from the design are the `*Alt` fields: Figma has no
 * alternative text, and an <img> that carries meaning needs one. They are
 * marked DIRECTED individually.
 */

/** 517:1265 — the dark hero. */
export const ridersHero = {
  /** I517:1265;516:1192 — Gelica SemiBold 60/72, -1.2, centred, white. */
  title: "Ride. Earn. Own Your Schedule",
  /** I517:1265;516:1193 — Inter 18/27, -0.09, centred, white. */
  subtitle:
    "Join Kula riders across Benue, earning money on their own terms. Daily cash-outs, free insurance, and a team that has your back.",
  /** I517:1265;516:1194;148:7462 — the node is named "Order Now " but reads: */
  cta: "Become a Kula Rider",
} as const;

/** 441:6800 — the Accent Yellow "Stay in control" card. */
export interface RiderBenefit {
  /** Figma node id of the text node. */
  readonly node: string;
  readonly text: string;
}

export const ridersControl = {
  /** 441:6821 — Gelica Bold 70/82.95, rotated -5.27°. */
  heading: "Stay in control of your time.",
  /** 441:6849 — three white pills, Gelica Medium 20/20. */
  benefits: [
    { node: "441:6855", text: "No minimum hours or mandatory shifts" },
    { node: "441:6861", text: "Earn per delivery — the more you ride, the more you make" },
    { node: "441:6867", text: "Use your existing motorcycle, no investment required" },
  ] as readonly RiderBenefit[],
  /** 441:6848 — Gelica Medium 48/64, centred. */
  body: "With Kula, you control orders. Log in anytime and cash out daily. Kula adapts to you.",
  /** 441:6823 — Roboto Flex 20/28, centred. */
  appLabel: "Get the Kula app for riders on:",
} as const;

/** 441:6517 — "We take care of our riders" and its three cards. */
export interface RiderCareCard {
  /** Figma node id of the card frame. */
  readonly node: string;
  readonly title: string;
  readonly body: string;
  /** Card surface, matched to a token by hex. */
  readonly surface: string;
  /** The card's illustration, an exported vector group. */
  readonly icon: {
    readonly src: string;
    /** The group's layout box in the auto-layout column (absoluteBoundingBox). */
    readonly boxWidth: number;
    readonly boxHeight: number;
    /**
     * absoluteRenderBounds. The artwork carries a thick outline in the card's
     * own colour, so it paints past its layout box; these are the painted size
     * and its offset from the box's top-left.
     */
    readonly artWidth: number;
    readonly artHeight: number;
    readonly artLeft: number;
    readonly artTop: number;
  };
}

export const ridersCare = {
  /** 441:6518 — Gelica Black 60/71.1, centred, over a hard Orange shadow. */
  heading: "We take care of our riders",
  cards: [
    {
      node: "441:6520",
      /** 441:6546 */
      title: "Daily Cash-Outs",
      /** 441:6547 */
      body: "Don't wait for payday. Withdraw your earnings every day, straight to your bank account or mobile money wallet.",
      surface: "bg-sky",
      /** 441:6523 "Hands 2" */
      icon: {
        src: "/icons/riders-icon-cash-outs.svg",
        boxWidth: 64,
        boxHeight: 69.01,
        artWidth: 73.5,
        artHeight: 73.76,
        artLeft: -4.75,
        artTop: 0,
      },
    },
    {
      node: "441:6548",
      /** 441:6575 */
      title: "Priority Dispatching",
      /** 441:6576 */
      body: "The more you ride, the higher your priority score. Top riders get first pick of nearby high-value orders.",
      surface: "bg-apricot",
      /** 441:6551 "Hands 1" */
      icon: {
        src: "/icons/riders-icon-priority.svg",
        boxWidth: 64,
        boxHeight: 85.78,
        artWidth: 74.73,
        artHeight: 96.19,
        artLeft: -5.37,
        artTop: -5.16,
      },
    },
    {
      node: "441:6577",
      /** 441:6604 */
      title: "Rider Community",
      /** 441:6605 */
      body: "Join hundreds of Kula riders. Access exclusive WhatsApp groups, monthly meetups, and peer support.",
      surface: "bg-bubblegum",
      /** 441:6580 "Hands 3" */
      icon: {
        src: "/icons/riders-icon-community.svg",
        boxWidth: 64,
        boxHeight: 82.46,
        artWidth: 73.42,
        artHeight: 92.04,
        artLeft: -4.71,
        artTop: -4.83,
      },
    },
  ] as readonly RiderCareCard[],
} as const;

/** 441:6792 + 510:25744 + 510:25764 — "Start earning in 3 steps". */
export interface RiderStep {
  /** Figma node id of the `faq-item-container`. */
  readonly node: string;
  readonly title: string;
  /**
   * Present only on the step the design draws open (510:25745). The two closed
   * steps are AUTHORED — the steps are interactive now, so each needs copy.
   */
  readonly answer?: string;
  /** Row surface, matched to a token by hex. */
  readonly surface: string;
}

export const ridersSteps = {
  /** 441:6793 — Gelica Black 72/85.32, centred, over a hard Orange shadow. */
  heading: "Start earning in 3 steps",
  /** I441:6794;148:7462 — the node is named "Order Now " but reads: */
  cta: "Become a Kula Rider",
  steps: [
    {
      node: "510:25745",
      /** 510:25747 */
      title: "Register as a Rider",
      /** 510:25751 */
      answer:
        "Download the rider application. Takes 5 minutes. You need a valid ID, phone number, and a working motorcycle.",
      surface: "bg-mint-bright",
    },
    {
      node: "510:25752",
      /** 510:25754 */
      title: "Brief Training",
      // NOT FROM FIGMA — authored; the design draws this step collapsed.
      answer:
        "One short session, in person or on a call. We cover the rider app, collecting from a busy kitchen, road safety and how to keep food hot in the insulated bag we give you.",
      surface: "bg-orchid",
    },
    {
      node: "510:25758",
      /** 510:25760 */
      title: "Start Earning",
      // NOT FROM FIGMA — authored; the design draws this step collapsed.
      answer:
        "Go online and accept your first trip. You are paid per delivery plus distance, you keep your tips, and you can cash out your earnings at the end of your very first day.",
      surface: "bg-lemon-bright",
    },
  ] as readonly RiderStep[],
  /**
   * DIRECTED — not from the design. 510:25766 is a photograph that carries
   * meaning, so it needs alternative text; Figma has none.
   */
  photoAlt: "A delivery rider on a motorcycle, waiting in traffic with an insulated top box.",
} as const;

/** 441:6606 — the FAQ panel. */
export interface RiderFaqItem {
  /** Figma node id of the `faq-item-container`. */
  readonly node: string;
  readonly question: string;
  /**
   * Present only on the row the design draws open (441:6638). The remaining five
   * answers are AUTHORED — the rows are interactive now, so each needs copy.
   */
  readonly answer?: string;
}

export const ridersFaq = {
  /** 441:6635 — Gelica SemiBold 60/63. */
  title: "Frequently Asked Questions",
  /** 441:6636 — Inter 18/27, -0.09. */
  subtitle: "Everything you need to know about getting started as a Kula rider.",
  items: [
    {
      // 441:6638 — the open row: Orange fill, radius 12, question in Young Serif.
      node: "441:6638",
      /** 441:6640 */
      question: "What type of motorcycle do I need?",
      /*
       * DIRECTED — replaces the design's 441:6644, which is the Home FAQ's
       * ordering answer pasted under a motorcycle question. Written to agree
       * with the design's own requirement in 510:25751: "a valid ID, phone
       * number, and a working motorcycle".
       */
      answer:
        "Any working, roadworthy motorcycle will do. Bring it along with a valid ID and a phone number when you register. We check the bike before your first trip and give you an insulated Kula delivery bag.",
    },
    // 441:6645 / 441:6647
    {
      node: "441:6645",
      answer:
        "Completely. Go online when it suits you and stop when you are done — there is no roster and no shift to claim. Most riders work the lunch and evening peaks.",
      question: "Can I choose my own working hours?",
    },
    // 441:6652 / 441:6654
    {
      node: "441:6652",
      answer:
        "A typical trip runs 20 to 40 minutes door to door. Where two orders are heading the same way we batch them, so you earn twice on one run.",
      question: "How long does delivery typically take?",
    },
    // 441:6659 / 441:6661
    {
      node: "441:6659",
      answer:
        "You earn a fee per delivery plus distance, and you keep every tip. Earnings show in the app as you ride, and you can cash out every day to your bank account or mobile money wallet.",
      question: "How does payment work?",
    },
    // 441:6666 / 441:6668
    {
      node: "441:6666",
      answer:
        "No quota and no penalty for a quiet week. The more you ride, though, the higher your priority score, and top riders get first pick of nearby high-value orders.",
      question: "Is there a minimum number of deliveries?",
    },
    // 441:6673 / 441:6675
    {
      node: "441:6673",
      answer:
        "No. Kula riders deliver across Makurdi, Gboko and Otukpo. We are opening more towns across Benue, so sign up anyway and we will reach out when yours goes live.",
      question: "Do I need to be in Makurdi?",
    },
  ] as readonly RiderFaqItem[],
} as const;
