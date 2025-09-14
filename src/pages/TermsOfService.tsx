import React from "react";

const TermsOfService: React.FC = () => (
  <div className="terms-page">
    <h1>Gathbandhan – Terms &amp; Policies</h1>
    <p>
      Welcome to Gathbandhan – your go-to place for digital wedding invites. Please take a moment to review our simplified terms to ensure a smooth experience.
    </p>

    <h2>1. Delivery Policy</h2>
    <ul>
 
      <li>Custom Orders  Delivered within 72 working hours.</li>
      <li>Working Hours: Monday to Sunday, 10 AM to 6:30 PM (IST).</li>
      <li>Urgent Orders: Need it faster? Urgent processing is available at an extra cost of ₹299.</li>
      <li><strong>Note:</strong> Delivery time may be slightly longer during peak seasons or festivals.</li>
    </ul>

    <h2>2. Payment &amp; Pricing</h2>
    <ul>
      <li>30% or 50% advance payment is required.</li>
      <li>All prices are fixed and already discounted — no bargaining.</li>
      {/* <li>18% GST is applicable on all orders.</li> */}
    </ul>

    <h2>3. Revisions &amp; Edits</h2>
    <ul>
      <li>1 free revision is included for custom orders after the first draft.</li>
      <li>Additional changes will cost:
        <ul>
          {/* <li>₹199 per revision (E-card)</li> */}
          <li>₹199 per revision</li>
        </ul>
      </li>
      <li>Font color, background, or frame changes are extra: ₹499 per customization.</li>
      <li>No major edits (e.g. rearranging video frames) unless paid for.</li>
    </ul>

    <h2>4. What could be Customized</h2>
    <ul>
      <li>Changes like Text, music (1 song only), and images based on the template.</li>
      <li>Cannot change Video structure, animations, or request open/template files.</li>
      <li>Share your content carefully — we will copy-paste exactly as submitted.</li>
      <li>No content changes after final approval.</li>
    </ul>

    <h2>5. Refund Policy</h2>
    <ul>
      <li>As this is a digital product, all sales are final.</li>
      <li>No refunds for:
        <ul>
          <li>Incorrect details submitted</li>
          <li>Change of mind</li>
          <li>Disliking the design after approval</li>
        </ul>
      </li>
      <li>Refunds are only possible if:
        <ul>
          <li>Product was not delivered within specified time and no communication was made.</li>
          <li>You were charged twice for the same order.</li>
        </ul>
      </li>
    </ul>

    <h2>  6. File Format Policy</h2>
    <ul>
      <li>Final delivery is in HD video (1080x1920 px) format.</li>
      <li>No raw or source files will be shared.</li>
      <li>We do not offer printing services, but we can provide PDF files for print use upon request (₹100 per page).</li>
    </ul>

    <h2>7. Usage &amp; Portfolio</h2>
    <ul>
      <li>We may showcase your invite/video in our portfolio.</li>
      <li>If you don’t want this, you can let us know at the time of ordering or email us later to remove it.</li>
    </ul>

    <h2>8. Contact Us</h2>
    <ul>
      <li><strong>Phone:</strong> <a href="tel:+917017835443">+91 70178 35443</a></li>
      <li><strong>Email:</strong> <a href="mailto:gathbandhhan@gmail.com">gathbandhhan@gmail.com</a></li>
    </ul>
  </div>
);

export default TermsOfService;