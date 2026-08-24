import { Content, Title } from "@/components/ui";

export const metadata = {
  title: "Cancellation, Rescheduling, Refund & No-Show Policy | Bedia Pottery",
  description: "Read the cancellation, rescheduling, refund, and no-show policy for Bedia Pottery.",
};

export default function CancellationPage() {
  return (
    <main className="min-h-screen bg-secondary-dark">
      <div className="page-wrapper px-[17px] lg:py-24 md:py-12 py-8">
        <Title className="mb-4">Cancellation, Rescheduling, Refund &amp; No-Show Policy</Title>
        <Content className="mb-6">
          At Bedia Pottery LLC, each workshop booking reserves a dedicated seat, instructor time, studio resources, and materials prepared specifically for your session. As workshop capacities are limited, we kindly ask all participants to carefully review the following policy before making a reservation.
        </Content>

        <div className="mt-[40px] bg-white p-5 lg:p-10 shadow-lg text-[#0D463D] leading-[1.8]">
          <div className="space-y-8">
            <section>
              <Content className="font-semibold text-xl mb-4">1. Customer Cancellations</Content>
              <Content>
                All workshop bookings are considered <strong>final</strong> once confirmed. If a participant chooses to cancel their booking for any reason, the booking fee is generally <strong>non-refundable</strong>.
              </Content>
              <Content>
                As workshop reservations involve the immediate allocation of studio capacity, instructors, materials, and administrative resources through our integrated online booking system, Bedia Pottery LLC does not generally provide monetary refunds for customer-initiated cancellations.
              </Content>
              <Content>
                Where appropriate and subject to this policy, the Studio may, at its sole discretion, offer a rescheduling option or issue a Studio Credit Voucher instead of a cash refund.
              </Content>
              <Content>
                Nothing in this policy limits any rights that participants may have under applicable UAE law.
              </Content>
            </section>

            <section>
              <Content className="font-semibold text-xl mb-4">2. Rescheduling Requests</Content>
              <Content>
                Participants who are unable to attend their scheduled workshop may request to reschedule their booking by providing <strong>at least forty-eight (48) hours' written notice</strong> before the scheduled workshop.
              </Content>
              <ul className="list-disc pl-6 space-y-3">
                <li>subject to workshop availability;</li>
                <li>limited to <strong>one (1) complimentary reschedule</strong> per booking;</li>
                <li>available only for the same or equivalent workshop value unless any price difference is paid by the participant.</li>
              </ul>
              <Content>
                Requests received less than forty-eight (48) hours before the scheduled workshop may not be accommodated.
              </Content>
            </section>

            <section>
              <Content className="font-semibold text-xl mb-4">3. Studio Credit Vouchers</Content>
              <Content>
                Where Bedia Pottery LLC approves a cancellation or rescheduling request, the Studio may issue a <strong>Studio Credit Voucher</strong> in place of a monetary refund.
              </Content>
              <ul className="list-disc pl-6 space-y-3">
                <li>are valid for <strong>twelve (12) months</strong> from the date of issue;</li>
                <li>may be redeemed against eligible workshops or services offered by Bedia Pottery LLC;</li>
                <li>are non-refundable and cannot be exchanged for cash;</li>
                <li>may not be transferred without the Studio's prior written approval;</li>
                <li>cannot be extended after their expiry date unless required by applicable law.</li>
              </ul>
            </section>

            <section>
              <Content className="font-semibold text-xl mb-4">4. Late Cancellations</Content>
              <Content>
                Cancellation requests received <strong>within forty-eight (48) hours</strong> of the scheduled workshop are considered late cancellations.
              </Content>
              <Content>
                As the Studio would have already committed instructor time, prepared workshop materials, and reserved a limited workshop space, late cancellations are <strong>not eligible for rescheduling or Studio Credit</strong>, except where otherwise agreed by Bedia Pottery LLC or required under applicable UAE law.
              </Content>
            </section>

            <section>
              <Content className="font-semibold text-xl mb-4">5. No-Show Policy</Content>
              <Content>
                Participants who fail to attend a confirmed workshop without prior notice will be considered a <strong>No-Show</strong>.
              </Content>
              <ul className="list-disc pl-6 space-y-3">
                <li>the booking will be deemed fully utilised;</li>
                <li>no refund, Studio Credit, or replacement session will be provided; and</li>
                <li>participants arriving significantly late may be refused entry where joining the workshop is no longer practical or would disrupt the experience for other participants.</li>
              </ul>
            </section>

            <section>
              <Content className="font-semibold text-xl mb-4">6. Cancellations by Bedia Pottery LLC</Content>
              <Content>
                If Bedia Pottery LLC is required to cancel or postpone a workshop due to operational requirements, instructor unavailability, health and safety considerations, insufficient participant numbers, force majeure, or circumstances beyond the Studio's reasonable control, participants will be offered either:
              </Content>
              <ul className="list-disc pl-6 space-y-3">
                <li>an alternative workshop date; or</li>
                <li>a Studio Credit Voucher valid for twelve (12) months.</li>
              </ul>
              <Content>
                Where required by applicable UAE law, an appropriate refund will be provided.
              </Content>
              <Content>
                Bedia Pottery LLC shall not be responsible for any indirect or consequential expenses incurred by participants, including travel, accommodation, parking, or loss of income.
              </Content>
            </section>

            <section>
              <Content className="font-semibold text-xl mb-4">7. Promotional Bookings</Content>
              <Content>
                Bookings made under promotional offers, discounted packages, gift vouchers, seasonal campaigns, or special events may be subject to additional conditions and may not qualify for rescheduling or Studio Credit unless expressly stated at the time of booking.
              </Content>
            </section>

            <section>
              <Content className="font-semibold text-xl mb-4">8. General</Content>
              <Content>
                Bedia Pottery LLC reserves the right to assess requests on a case-by-case basis and to make reasonable exceptions where appropriate. Any exception granted on one occasion shall not create an obligation to grant similar exceptions in future.
              </Content>
              <Content>
                By completing a booking, participants confirm that they have read, understood, and agreed to this Cancellation, Rescheduling, Refund, and No-Show Policy.
              </Content>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
