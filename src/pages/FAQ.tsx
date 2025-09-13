import React from "react";

const faqs = [
  {
    question: "How will I receive my invitation?",
    answer:
      "You will receive your digital invite via email or WhatsApp, usually within 1–2 working days.",
  },
  {
    question: "Can I make changes after submitting my content?",
    answer:
      "Basic edits are allowed only once after the first draft. Further changes will be charged based on the type of edit. Please double-check your content before submitting.",
  },
  {
    question: "Can I change the font, color, or background of the template?",
    answer:
      "Yes, but it will be considered a customization and will cost ₹499. Be sure to request this before the design is started.",
  },
  {
    question: "What happens if I need my invite urgently?",
    answer:
      "We offer an urgent delivery option for an extra fee of ₹299. Let us know at the time of placing your order.",
  },
  {
    question: "Can I get a refund if I change my mind?",
    answer:
      "No, all sales are final and non-refundable. Refunds are only applicable in rare cases like duplicate payments or non-delivery",
  },
  {
    question: "Can I remove or change the music in the video?",
    answer:
      "Yes! You can request to change the background music. We allow one song per invite, and you’ll need to share the song link or name.",
  },
  {
    question: "Can I order different versions of the same invite (e.g., for bride/groom side)?",
    answer:
      "Yes, but each additional version will cost 30% of the original template price.",
  },
  {
    question: "Will I get the editable or open file?",
    answer:
      "No. We do not share open or source files under any condition.",
  },
  {
    question: "Do you provide printed invitations or only digital?",
    answer:
      "We only provide digital invitations. However, you can request a high-quality PDF file (₹100/page) to print on your own.",
  },
  {
    question: "Will you use my invite in your portfolio?",
    answer:
      "We may showcase it in our portfolio. If you prefer not to, you can opt out during your order or let us know anytime by email.",
  },
];

const FAQPage: React.FC = () => (
	<div className="faq-page">
		<h1>Frequently Asked Questions</h1>
		<ul>
			{faqs.map((faq, idx) => (
				<li key={idx} className="faq-item">
					<strong>{faq.question}</strong>
					<p>{faq.answer}</p>
				</li>
			))}
		</ul>
	</div>
);

export default FAQPage;