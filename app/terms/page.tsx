import { termsData } from "@/constants/termsData";
import { Content, Title } from "@/components/ui";

export const metadata = {
  title: "Terms and Conditions | Bedia Pottery",
  description:
    "Read the terms and conditions for booking workshops with Bedia Pottery.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-secondary-dark">
      <div className="page-wrapper py-24">
        <Title className="mb-4">{termsData.title}</Title>
        <Content>{termsData.subtitle}</Content>
        <div className="mt-[40px] bg-white p-10 rounded-[40px] ">
          {termsData.sections.map((section, index) => (
            <div key={index}>
              <Content className="font-semibold mb-4">
                {section.heading}
              </Content>
              <div className="mb-6">
                {section.content?.map((text, i) => (
                  <Content key={i} className="leading-[150%]">
                    {text}
                  </Content>
                ))}

                {section.points && (
                  <ul className="list-decimal  pl-5">
                    {section.points.map((item, i) => (
                      <Content key={i} className="leading-[150%]">
                        <li>{item}</li>
                      </Content>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
