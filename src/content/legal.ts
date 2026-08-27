/**
 * Legal documents, transcribed verbatim from the Kula Figma document.
 *
 * Legal copy is never paraphrased, summarised or generated — every string below
 * is the design's own text. If a clause needs to change, change it here and
 * nowhere else.
 */

export interface LegalBlock {
  /** Numbered clause heading, e.g. "1. Introduction". */
  heading: string;
  /** Body paragraphs, in order. */
  paragraphs?: readonly string[];
  /** Optional lead-in sentence for a list, e.g. "We may collect:". */
  listIntro?: string;
  items?: readonly string[];
}

export interface LegalDocument {
  title: string;
  summary: string;
  blocks: readonly LegalBlock[];
}

export const termsDocument: LegalDocument = {
  title: "Terms and Conditions",
  summary: "Please read these terms and conditions carefully before using our service.",
  blocks: [
    {
      heading: "1. Introduction",
      paragraphs: [
        'Welcome to Kula App, operated by KulaApp Limited ("we," "our," or "us").',
        'These Terms and Conditions govern your use of our website, mobile application, and related services (collectively, the "Service").',
        "By accessing or using the Kula App, you agree to comply with and be bound by these Terms. If you do not agree, please do not use our Service.",
      ],
    },
    {
      heading: "2. Our Service",
      paragraphs: [
        "Kula App is a food delivery and logistics platform connecting customers to restaurants, food vendors, and delivery riders within Benue State, Nigeria. We facilitate ordering, payment, and delivery of food and groceries from our listed partners.",
      ],
    },
    {
      heading: "3. User Eligibility",
      listIntro: "To use Kula App, you must:",
      items: [
        "Be at least 18 years old or have parental consent.",
        "Provide accurate registration details.",
        "Use the Service for lawful purposes only.",
      ],
    },
    {
      heading: "4. Account Registration",
      paragraphs: [
        "You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account. We reserve the right to suspend or terminate any account that violates our Terms or is suspected of fraudulent activity.",
      ],
    },
    {
      heading: "5. Orders and Payments",
      items: [
        "Orders placed through the app are binding once confirmed.",
        "Payment can be made via local card, bank transfer, or in-app wallet.",
        "Prices displayed include applicable charges unless otherwise stated.",
        "We reserve the right to reject or cancel any order due to unavailability, pricing errors, or technical issues.",
      ],
    },
    {
      heading: "6. Delivery Policy",
      items: [
        "Deliveries are made within Benue State and nearby areas covered by Kula riders.",
        "Estimated delivery time is provided but may vary due to traffic, weather, or vendor delays.",
        "Once an order is dispatched, ownership and risk transfer to the customer upon delivery.",
      ],
    },
    {
      heading: "7. User Conduct",
      listIntro: "Users agree not to:",
      items: [
        "Misuse the platform or impersonate others.",
        "Post or share false, abusive, or unlawful content.",
        "Attempt to disrupt the app's operation or security.",
      ],
    },
    {
      heading: "8. Vendor and Rider Relationship",
      paragraphs: [
        "Vendors and riders are independent contractors. KulaApp Limited is not responsible for their actions, negligence, or product quality beyond reasonable verification.",
      ],
    },
    {
      heading: "9. Limitation of Liability",
      paragraphs: [
        "Kula App shall not be liable for any indirect, incidental, or consequential damages arising from the use of our Service. We do not guarantee uninterrupted access, error-free service, or availability of all listed products.",
      ],
    },
    {
      heading: "10. Intellectual Property",
      paragraphs: [
        "All logos, trademarks, content, and app design are owned by KulaApp Limited. You may not copy, reproduce, or distribute our materials without prior written consent.",
      ],
    },
    {
      heading: "11. Termination",
      paragraphs: [
        "We may suspend or terminate your access if you breach these Terms or engage in activities harmful to our business or partners.",
      ],
    },
    {
      heading: "12. Governing Law",
      paragraphs: ["These Terms are governed by the laws of the Federal Republic of Nigeria."],
    },
  ],
};

export const privacyDocument: LegalDocument = {
  title: "Privacy Policy",
  summary: "Your privacy is important to us. Learn how we collect and use your information.",
  blocks: [
    {
      heading: "1. Introduction",
      paragraphs: [
        "KulaApp Limited respects your privacy and is committed to protecting your personal information in accordance with the Nigeria Data Protection Regulation (NDPR).",
      ],
    },
    {
      heading: "2. Information We Collect",
      listIntro: "We may collect:",
      items: [
        "Personal Information – Name, email, phone number, delivery address.",
        "Payment Data – Transaction records (handled securely via third-party processors).",
        "Location Data – For delivery tracking and service accuracy.",
        "Usage Data – Device type, IP address, and app activity for analytics.",
      ],
    },
    {
      heading: "3. How We Use Your Information",
      listIntro: "We use your data to:",
      items: [
        "Process and deliver your orders.",
        "Provide customer support.",
        "Improve app performance and user experience.",
        "Send updates, promotions, and service notifications.",
        "Comply with legal obligations.",
      ],
    },
    {
      heading: "4. Data Protection and Security",
      paragraphs: [
        "We implement strong security measures to protect user data from unauthorized access, disclosure, or misuse. Payment details are encrypted and handled by trusted gateways (e.g., Flutterwave or Paystack).",
      ],
    },
    {
      heading: "5. Sharing of Information",
      listIntro: "We may share information with:",
      items: [
        "Partner vendors and riders to fulfill orders.",
        "Payment processors for transactions.",
        "Law enforcement when required by law.",
      ],
      paragraphs: ["We do not sell or rent user data to third parties."],
    },
    {
      heading: "6. User Rights",
      listIntro: "You have the right to:",
      items: [
        "Access, update, or delete your personal data.",
        "Withdraw consent to data processing.",
        "Request a copy of your stored information.",
      ],
      paragraphs: ["To exercise these rights, contact thekulaapp.info@gmail.com"],
    },
    {
      heading: "7. Cookies and Tracking",
      paragraphs: [
        "Our website/app uses cookies to enhance user experience, analytics, and targeted promotions. You may disable cookies in your browser settings.",
      ],
    },
    {
      heading: "8. Data Retention",
      paragraphs: [
        "We retain your information only as long as necessary for business or legal reasons, after which it is securely deleted.",
      ],
    },
    {
      heading: "9. Updates to this Policy",
      paragraphs: [
        "KulaApp Limited may update this policy periodically. Users will be notified of significant changes through the app or email.",
      ],
    },
  ],
};

export const refundDocument: LegalDocument = {
  title: "Refund Policy",
  summary: "We want you to be completely satisfied with your purchase.",
  blocks: [
    {
      heading: "1. Eligibility for Refund",
      listIntro: "Refunds apply under the following conditions:",
      items: [
        "The wrong item was delivered.",
        "The food arrived spoiled or damaged.",
        "The vendor failed to deliver due to unavailability.",
        "Payment was made but order not processed.",
      ],
    },
    {
      heading: "2. Non-Refundable Cases",
      listIntro: "Refunds are not applicable when:",
      items: [
        "Customer entered an incorrect delivery address.",
        "Customer is unavailable at the time of delivery.",
        "The food was consumed before complaint.",
        "Order cancellation occurs after preparation.",
      ],
    },
    {
      heading: "3. Refund Process",
      items: [
        "Submit a refund request within 24 hours of delivery through the app or via thekulaapp.info@gmail.com.",
        "Refunds are processed within 3–7 business days after verification.",
        "Payment is returned via the same channel used for the original transaction.",
      ],
    },
    {
      heading: "4. Dispute Resolution",
      paragraphs: [
        "Any refund or order dispute will be investigated fairly. Our decision will be based on vendor and rider reports, and may involve evidence such as photos or timestamps.",
      ],
    },
  ],
};
