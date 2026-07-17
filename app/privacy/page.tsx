import { Content, Title } from "@/components/ui";

export const metadata = {
  title: "Privacy Policy | Bedia Pottery",
  description: "Read the privacy policy for Bedia Pottery.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-secondary-dark">
      <div className="page-wrapper px-[17px] py-24">
        <Title className="mb-4">Privacy Policy</Title>
        <Content className="mb-6">
          At <strong>Bedia Pottery LLC</strong> (<strong>Bedia Pottery</strong>, <strong>we</strong>, <strong>our</strong>, or <strong>us</strong>), we are committed to protecting your privacy and handling your personal information responsibly. This Privacy Policy explains how we collect, use, store, and protect your personal data when you visit our website, make a booking, purchase our products or services, or otherwise interact with us.
        </Content>

        <div className="mt-[40px] bg-white p-5 lg:p-10 rounded-[20px] shadow-lg">
          <div className="space-y-8 text-[#113224] leading-[1.8]">
            <div>
              <Content className="font-semibold text-xl mb-4">Information We Collect</Content>
              <Content>
                We may collect personal information including your name, contact details, billing information, booking details, and any information you voluntarily provide to us. We may also collect limited technical information, such as your IP address, browser type, device information, and website usage data through cookies and similar technologies.
              </Content>
            </div>

            <div>
              <Content className="font-semibold text-xl mb-4">How We Use Your Information</Content>
              <ul className="list-disc pl-6 space-y-3">
                <li>Process bookings, orders, and payments.</li>
                <li>Provide our workshops, products, and services.</li>
                <li>Communicate with you regarding your bookings or enquiries.</li>
                <li>Improve our website and customer experience.</li>
                <li>Send promotional communications where you have provided your consent or where permitted by applicable law.</li>
                <li>Comply with legal and regulatory obligations.</li>
              </ul>
            </div>

            <div>
              <Content className="font-semibold text-xl mb-4">Sharing Your Information</Content>
              <Content>
                We do not sell or rent your personal information. We may share your information with trusted third-party service providers, including payment processors, booking platform providers, IT service providers, and government authorities where required by applicable law or where necessary to provide our services.
              </Content>
            </div>

            <div>
              <Content className="font-semibold text-xl mb-4">Data Security</Content>
              <Content>
                We implement reasonable technical and organisational measures to safeguard your personal information against unauthorised access, loss, misuse, alteration, or disclosure. While we strive to protect your information, no method of electronic transmission or storage can be guaranteed to be completely secure.
              </Content>
            </div>

            <div>
              <Content className="font-semibold text-xl mb-4">Your Rights</Content>
              <Content>
                Subject to applicable laws of the United Arab Emirates, you may request access to, correction of, or deletion of your personal information, or withdraw your consent where applicable. Requests may be submitted using the contact details provided below.
              </Content>
            </div>

            <div>
              <Content className="font-semibold text-xl mb-4">Photography &amp; Videography</Content>
              <Content>
                Photographs or videos may occasionally be taken during workshops or events for promotional, educational, or marketing purposes. If you do not wish to appear in any photographs or recordings, please notify a member of our team before your workshop begins, and we will make reasonable efforts to accommodate your request.
              </Content>
            </div>

            <div>
              <Content className="font-semibold text-xl mb-4">Contact Us</Content>
              <Content>
                If you have any questions regarding this Privacy Policy or how we handle your personal information, please contact us at:
              </Content>
              <div className="mt-3 space-y-2">
                <p className="font-semibold">Bedia Pottery LLC</p>
                <p>
                  <span className="font-semibold">Email: </span>
                  <a href="mailto:booking@bediapottery.ae" className="text-primary underline">
                    booking@bediapottery.ae
                  </a>
                </p>
              </div>
            </div>

            <div>
              <Content className="font-semibold text-xl mb-4">Updates to this Policy</Content>
              <Content>
                We may update this Privacy Policy from time to time. Any changes will be published on our website and will take effect upon posting.
              </Content>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
