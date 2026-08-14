
import { Users, Store, Smile, Utensils, Sparkles } from "lucide-react";

export default function FeatureBanner() {
  const features = [
    { icon: Users, label: "Expert Guidance" },
    { icon: Store, label: "Premium Space" },
    { icon: Smile, label: "Fun Pottery Experience" },
    { icon: Utensils, label: "Cake & Food Allowed" },
    { icon: Sparkles, label: "Beginner Friendly" },
  ];

  return (
    <section className="py-12 font-sans page-wrapper bg-[#f5f1eb]">
      <div className="bg-white py-10 shadow-sm border border-gray-100">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-10 lg:gap-y-0 lg:divide-x divide-gray-300/60">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center justify-center px-4"
              >
                <div className="text-[#0D463D] mb-4 h-12 flex items-center justify-center">
                  <Icon size={36} strokeWidth={1.2} />
                </div>

                <span className="text-[#0D463D] text-[13px] md:text-[14px] font-medium text-center whitespace-nowrap">
                  {feature.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}