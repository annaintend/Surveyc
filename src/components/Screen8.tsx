import { useState } from 'react';
import { Check } from 'lucide-react';
import { motion } from 'motion/react';
import imgSugarnologooo1 from "figma:asset/90d0b2808b9f2d4ad23a49432895256cef99dbdf.png";

interface Screen8Props {
  onNext: (data: Record<string, any>) => void;
}

export function Screen8({ onNext }: Screen8Props) {
  const [selected, setSelected] = useState<string[]>([]);

  const options = [
    { id: 'quick-scan', label: '📸 Quick scan + simple verdict' },
    { id: 'portion-guidance', label: '🚫 Portion guidance (when to stop)' },
    { id: 'better-swaps', label: '🍱 Better swaps (what to order instead)' },
    { id: 'confidence-restaurants', label: '💡 Confidence at new restaurants' },
    { id: 'lower-sugar', label: '🍬 Lower-sugar options & tips' },
    { id: 'post-meal-guidance', label: '🌱 Post-meal feel-better guidance' }
  ];

  const toggleOption = (id: string) => {
    setSelected(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const handleNext = () => {
    if (selected.length > 0) {
      onNext();
    }
  };

  return (
    <div className="h-full bg-[#f5f5f5] flex flex-col overflow-hidden">
      <div className="h-full flex flex-col max-w-[450px] mx-auto w-full relative">
        {/* Logo at top */}
        <div className="absolute top-0 left-0 right-0 h-[53.33px] backdrop-blur-[2px] z-10 flex items-end justify-center flex-shrink-0">
          <img 
            alt="sugar.no logo" 
            className="h-[38px] w-auto object-contain" 
            src={imgSugarnologooo1} 
          />
        </div>

        {/* Content area */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="flex-1 flex flex-col px-6 pt-20 pb-28 min-h-0"
        >
          {/* Question title */}
          <div className="mb-2 flex-shrink-0">
            <h1 className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[28px] leading-[28.8px] tracking-[0.4px] text-black text-center">
              What kind of help do you need?
            </h1>
          </div>

          {/* Subtitle */}
          <div className="mb-6 flex-shrink-0">
            <p className="font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[18px] text-gray-500 text-center">
              Please select one or more options
            </p>
          </div>

          {/* Options */}
          <div className="flex-1 min-h-0 overflow-y-auto -mr-2 pr-2">
            <div className="space-y-3 pb-2">
              {options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => toggleOption(option.id)}
                  className={`bg-white h-[70px] rounded-[24px] w-full relative transition-all hover:shadow-sm ${
                    selected.includes(option.id) ? 'ring-2 ring-[#f14e58] ring-inset' : ''
                  }`}
                >
                  <div className="absolute inset-0 flex items-center gap-[14px] px-[19px]">
                    <div className={`shrink-0 size-[22px] rounded-[4px] border-2 flex items-center justify-center transition-all ${
                      selected.includes(option.id)
                        ? 'bg-[#f14e58] border-[#f14e58]'
                        : 'bg-white border-[#e5e5e5]'
                    }`}>
                      {selected.includes(option.id) && (
                        <Check className="w-[14px] h-[14px] text-white" strokeWidth={2.5} />
                      )}
                    </div>
                    <p className="flex-1 font-['Inter:Regular',sans-serif] font-normal text-[18px] leading-[22px] tracking-[-0.2px] text-black text-left">
                      {option.label}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Button */}
        <div className="fixed bottom-0 left-0 right-0 px-6 pb-8 pt-4 bg-[#f5f5f5] pointer-events-none" style={{ paddingBottom: 'max(2rem, env(safe-area-inset-bottom))' }}>
          <div className="max-w-[450px] mx-auto pointer-events-auto">
            <button
              onClick={handleNext}
              disabled={selected.length === 0}
              className={`w-full h-[56px] rounded-[32px] text-white font-['Roboto:SemiBold','Noto_Sans_Symbols:SemiBold',sans-serif] font-semibold text-[18px] leading-[22px] uppercase transition-all ${
                selected.length > 0
                  ? 'bg-[#f14e58] hover:bg-[#e03d47]'
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}