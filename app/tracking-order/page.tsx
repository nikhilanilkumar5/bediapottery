import React from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Copy,
  Calendar,
  Clock,
  Phone,
  Mail,
  Check,
  Sun,
  MapPin,
  Heart,
  Info,
  PackageCheck,
  ShoppingBag,
  AlertCircle,
  House,
  SearchX,
  ShieldCheck,
  ChevronLeft,
} from 'lucide-react';
import { getWorkshopTracking } from '@/services/tracking.service';
import { Title } from '@/components/ui';
import Image from 'next/image';
import { TrackingTimeline } from '@/components/tracking/TrackingTimeline';

interface TrackingPageProps {
  searchParams: Promise<{
    ref?: string;
  }>;
}

export default async function TerracottaTrackingPage({ searchParams }: TrackingPageProps) {
  const resolvedParams = await searchParams;
  const trackingRef = resolvedParams.ref;

  if (!trackingRef) {
    return (
      <ErrorStateUI
        title="No tracking ID provided."
        description="Please check your booking confirmation email for the tracking link or make sure the URL includes your order reference number."
        statusText="Missing Order Reference"
      />
    );
  }

  let trackingData;
  try {
    console.log("Fetching tracking data for ID:", trackingRef);
    trackingData = await getWorkshopTracking(trackingRef);
  } catch (error) {
    return (
      <ErrorStateUI
        title="Unable to locate your order."
        description="We could not find any pottery creation records associated with this tracking ID. The reference number may be incorrect or expired."
        statusText="Order Tracking Failed"
      />
    );
  }

  const steps = trackingData.steps.map((step: any, index: number) => ({
    ...step,
    id: index + 1,
    name: step.label,
    subtext: step.date ? new Date(step.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : (step.status === 'current' ? 'In progress' : 'Upcoming'),
    icon: step.status === 'completed' ? Check : step.status === 'current' ? Sun : step.status === 'ready' ? PackageCheck : ShoppingBag,
  }));

  return (
    <main className="min-h-screen bg-secondary-dark text-slate-800 font-sans page-wrapper">
      <div className="space-y-6  md:py-16 py-8 ">
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <Title className="mb-2.5 font-normal capitalize !text-black">{trackingData.clayCategory} Tracking</Title>
            
            <p className="text-slate-500 text-base font-normal mt-1">
              Track the progress of your pottery creation.
            </p>
          </div>
        </div>

        {/* Order Info & Support Card */}
        <div className="bg-white  border border-slate-200/80 p-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-slate-100">
            
            {/* Workshop Item Info */}
            <div className="flex gap-4 pr-0 md:pr-4 items-start">
               <div className="w-24 h-auto sm:w-28 md:h-28 bg-gray-200 rounded-sm shrink-0 overflow-hidden">
                             <Image
                               src={
                                 "/images/product/1.png"
                               }
                               alt="Beginners pottery"
                               width={112}
                               height={112}
                               unoptimized
                               className="w-full h-full object-cover"
                             />
                           </div>
              <div className="space-y-1">
               <h3 className="font-normal text-base text-black mb-2 leading-tight ">
                           {trackingData.workshopTitle} </h3>
                <p className="text-base font-normal !mb-2 text-gray-500">{trackingData.totalPeople} × {trackingData.currency} {trackingData.totalAmount}</p>
                <span className="inline-block mt-1 px-3 py-0.5 text-xs font-normal capitalize text-amber-800 bg-[#f5eee6]  border border-[#f5eee6]">
                  {trackingData.clayCategory || 'Terracotta'}
                </span>
              </div>
            </div>

            {/* Order Details */}
            <div className="pt-4 md:pt-0 pl-0 md:pl-6 pr-0 md:pr-4 space-y-2.5">
              <div className="flex items-center gap-2">
                <span className="font-normal text-slate-900 text-base">Item code: {trackingData.itemCodes}</span>
               
              </div>
              <div className="space-y-1.5 text-sm font-normal text-slate-500">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>{new Date(trackingData.bookingDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>2:00 PM – 3:30 PM</span>
                </div>
              </div>
            </div>

            {/* Support Info */}
            <div className="pt-4 md:pt-0 pl-0 md:pl-6 space-y-2">
              <div className="flex items-center gap-2 text-slate-900 font-normal text-base">
                <Info className="w-4 h-4 text-slate-400" />
                <span>Need help?</span>
              </div>
              <div className="space-y-1 text-sm font-normal text-slate-600 pt-1">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <a href="tel:+971569569088" className="hover:underline text-slate-700">
                   +971 56 956 9088
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <a href="mailto:booking@bediapottery.ae" className="hover:underline text-slate-700">
                    booking@bediapottery.ae
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Pottery Journey Progress Timeline */}
        <div className="bg-white  border border-slate-200/80 p-6 md:p-8 shadow-sm space-y-8">
          <h2 className="text-xl font-normal text-slate-900">Your Pottery Journey</h2>

          {/* Stepper Timeline */}
          <TrackingTimeline steps={steps} status={trackingData.status} />

          {/* Current Status Box */}
          <div className="bg-[#fef8ec] border border-[#facc70] rounded-md p-4 md:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="p-2.5 bg-[#fef8ec] rounded-full text-[#bf8d29]">
                <Sun className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-normal text-slate-900 text-base">{trackingData.statusLabel || "Currently Drying"}</h4>
                <p className="text-sm font-normal text-slate-600 mt-0.5">
                  {trackingData.description || "Your item is currently drying and will be ready for collection in approximately 2–3 weeks."}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white/90 border border-[#facc70] rounded-md px-4 py-2.5 shadow-xs w-full md:w-auto flex-shrink-0">
              <Calendar className="w-5 h-5 text-slate-700" />
              <div>
                <p className="text-xs uppercase tracking-wider text-slate-400 font-normal">
                  Estimated Ready Date
                </p>
                <p className="text-base font-normal text-slate-900">
                  {new Date(trackingData.estimatedReadyFrom).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })} – {new Date(trackingData.estimatedReadyTo).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Details Grid (3 Columns matching design) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          
          {/* Box 1: Important Dates */}
          <div className="bg-white  border border-white p-5 shadow-sm flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-4 h-4 text-slate-700" />
                <h3 className="font-normal text-slate-900 text-base">Important Dates</h3>
              </div>

              <div className="space-y-3 text-sm font-normal">
                <div className="flex justify-between items-center text-slate-600">
                  <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                   Created Date:
                  </span>
                  <span className="font-normal text-slate-900">
                    {new Date(trackingData.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </span>
                </div>
                {trackingData.clayCategory == 'ceramic' && (
                <div className="flex justify-between items-center text-slate-600">
                  <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                    Painting
                  </span>
                  <span className="font-normal text-slate-900">
                    {new Date(trackingData.paintingWindowEnd).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </span>
                </div>
                )}

                <div className="flex justify-between items-center text-slate-600">
                  <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                   Estimated Collection Date:
                  </span>
                  <span className="font-normal text-slate-900">
                    {new Date(trackingData.estimatedReadyFrom).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })} – {new Date(trackingData.estimatedReadyTo).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </span>
                </div>

                <div className="flex justify-between items-center text-rose-700">
                  <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                    Collection Deadline
                  </span>
                  <span className="font-normal">
                    {trackingData.collectionDeadline ? new Date(trackingData.collectionDeadline).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '18 July 2026'}
                  </span>
                </div>
              </div>
            </div>

            <p className="text-sm font-normal text-slate-400 leading-relaxed pt-3 border-t border-slate-200/50">
              Please collect your item by the collection deadline. Uncollected items after this date may be discarded according to our studio policy.
            </p>
          </div>

          {/* Box 2: Collection Information */}
          <div className="bg-white  border border-white p-5 shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-slate-700" />
              <h3 className="font-normal text-slate-900 text-base">Collection Information</h3>
            </div>
            <p className="text-sm font-normal text-slate-500 leading-relaxed">
              Once your item is ready, we’ll notify you by email or WhatsApp
            </p>

            <div className="space-y-2 pt-1">
              <div className="bg-white rounded-xl border border-slate-200/60 p-3 flex items-start gap-3 shadow-2xs">
                <Clock className="w-4 h-4 text-slate-400 mt-0.5" />
                <div>
                  <p className="text-xs text-slate-400 font-normal">Collection Hours</p>
                  <p className="text-sm font-normal text-slate-800">{trackingData.collection.hours}</p>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200/60 p-3 flex items-start gap-3 shadow-2xs">
                <MapPin className="w-4 h-4 text-slate-400 mt-0.5" />
                <div>
                  <p className="text-xs text-slate-400 font-normal">Studio Location</p>
                  <p className="text-sm font-normal text-slate-800">{trackingData.collection.address}</p>
                </div>
              </div>
            </div>

            <a
              href={trackingData.collection.mapUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-sm font-normal text-slate-700 hover:text-indigo-700 transition-colors pt-1"
            >
              View Studio Location on Map →
            </a>
          </div>


        </div>

        {/* Footer Disclaimer */}
        <div className="flex items-center justify-center gap-1.5 text-xs text-slate-800 py-3">
          <ShieldCheck className="w-3.5 h-3.5 text-slate-800 lg:block hidden" />
          <span>All dates are estimates and may vary depending on the drying and firing process. Kindly notify us at least <b>1 hour</b> before your arrival so we can have your item ready for pickup.</span>
        </div>

      </div>
    </main>
  );
}

// Reusable Error UI component
function ErrorStateUI({
  title,
  description,
  statusText,
}: {
  title: string;
  description: string;
  statusText: string;
}) {
  return (
    <main className="min-h-screen bg-[#fcfbf9] text-[#0D463D] overflow-hidden flex items-center justify-center p-4">
      <section className="relative w-full max-w-5xl py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-12 items-center">
          
          {/* Left Info Column */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#e0c4bf] bg-white/70 px-4 py-2 text-sm font-medium shadow-sm">
              <AlertCircle className="h-4 w-4 text-[#8d2f1b]" />
              Tracking Verification Failed
            </div>

            <h1 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-serif leading-tight tracking-tight">
              {title}
            </h1>

            <p className="mt-5 max-w-xl text-base sm:text-lg text-gray-600 leading-7">
              {description}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#0D463D] px-6 py-3.5 font-medium text-[#0D463D] transition-colors hover:bg-[#0D463D] hover:text-white"
              >
                <House className="h-4 w-4" />
                Back to home
              </Link>
            </div>
          </div>

          {/* Right Status Card Column */}
          <div className="relative">
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-[#fde8e8] to-[#fef2f2] blur-2xl opacity-70 translate-y-6" />

            <div className="relative rounded-[2rem] border border-red-100 bg-white/80 p-6 sm:p-8 shadow-[0_20px_60px_rgba(127,29,29,0.12)] backdrop-blur">
              <div className="flex items-center justify-between border-b border-red-100 pb-5">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-red-500">
                    Order Search
                  </p>

                  <h2 className="mt-2 text-2xl font-semibold text-gray-900">
                    Tracking Error
                  </h2>
                </div>

                <div className="h-14 w-14 rounded-full bg-red-500 text-white flex items-center justify-center shadow-md">
                  <SearchX className="h-6 w-6" />
                </div>
              </div>

              <div className="mt-6 space-y-4 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Checked Date</span>
                  <span className="font-medium">
                    {new Date().toLocaleDateString('en-GB')}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Status</span>
                  <span className="font-medium text-red-600">
                    {statusText}
                  </span>
                </div>
              </div>

              <div className="mt-8 rounded-xl bg-red-50 border border-red-100 p-5">
                <p className="text-sm text-gray-700 leading-6">
                  Please verify the link in your original booking confirmation email or SMS. If you believe this is a technical error, please contact our support team.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}