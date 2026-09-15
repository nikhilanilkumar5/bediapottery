import React from 'react';
import { Check, Flame, PackageCheck, ShoppingBag, Sun, Sparkles,Palette } from 'lucide-react';

export interface TrackingStep {
  status: string; // 'created' | 'drying' | 'firing' | 'ready' | 'collected' | 'painting'
  label: string;
  state: 'completed' | 'current' | 'in_progress' | 'upcoming' | string;
  date?: string | null;
}

interface TrackingTimelineProps {
  steps: TrackingStep[];
}

// Icon mapper for step status
const getStepIcon = (status: string) => {
  switch (status.toLowerCase()) {
    case 'created':
      return Check;
    case 'drying':
      return Sun;
    case 'firing':
    case 'glaze_firing':
      return Flame;
    case 'ready':
      return PackageCheck;
    case 'collected':
      return ShoppingBag;
    case 'painting':
      return Palette;
    default:
      return Sparkles;
  }
};

// Date formatter helper
const formatDate = (isoString?: string | null) => {
  if (!isoString) return null;
  try {
    const date = new Date(isoString);
    const formattedDate = date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
    const formattedTime = date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
    return { formattedDate, formattedTime };
  } catch (e) {
    return null;
  }
};

export function TrackingTimeline({ steps }: TrackingTimelineProps) {
  const trackingColumns = Math.max(steps.length, 1);

  return (
    <div className="relative px-2 py-4">
      <div
        className="grid grid-cols-2 md:grid-cols-[var(--tracking-columns)] gap-6 relative z-10"
        style={{
          '--tracking-columns': `repeat(${trackingColumns}, minmax(0, 1fr))`,
        } as React.CSSProperties}
      >
        {steps.map((step, idx) => {
          const isCompleted = step.state === 'completed';
          const isCurrent = step.state === 'current' || step.state === 'in_progress';
          
          // Completed steps display Check icon; active/upcoming steps show their specific status icon
          const StepIcon = isCompleted ? Check : getStepIcon(step.status);
          const dateObj = formatDate(step.date);

          return (
            <div key={idx} className="flex flex-col items-center text-center relative">
              {/* Connecting progress line */}
              {idx < steps.length - 1 && (
                <div
                  className={`hidden md:block absolute top-5 left-1/2 w-full h-[2px] -z-10 ${
                    isCompleted
                      ? 'bg-emerald-600'
                      : 'border-t-2 border-dashed border-slate-200'
                  }`}
                />
              )}

              {/* Step Status Circle */}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  isCompleted
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : isCurrent
                    ? 'bg-emerald-600 text-white ring-8 ring-emerald-100 shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-400'
                }`}
              >
                <StepIcon className="w-5 h-5" />
              </div>

              {/* Labels & Dates */}
              <div className="mt-3 space-y-0.5">
                <p className={`text-sm md:text-base font-normal ${isCurrent || isCompleted ? 'text-slate-900' : 'text-slate-600'}`}>
                  {step.label}
                </p>

                {/* Completed State */}
                {isCompleted && (
                  <div className="text-xs text-emerald-600 font-normal leading-tight">
                    {dateObj ? (
                      <>
                        <p>{dateObj.formattedDate}</p>
                        <p className="text-xs text-slate-400 font-normal">{dateObj.formattedTime}</p>
                      </>
                    ) : (
                      <p>Completed</p>
                    )}
                  </div>
                )}

                {/* Current / In Progress State */}
                {isCurrent && (
                  <div className="text-xs">
                    {dateObj ? (
                      <>
                        <p className="text-slate-700 font-normal">{dateObj.formattedDate}</p>
                        <p className="text-amber-600 font-normal">In progress</p>
                      </>
                    ) : (
                      <p className="text-amber-600 font-normal">In progress</p>
                    )}
                  </div>
                )}

                {/* Upcoming State */}
                {!isCompleted && !isCurrent && (
                  <p className="text-xs text-slate-400 font-normal">
                    Upcoming
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}