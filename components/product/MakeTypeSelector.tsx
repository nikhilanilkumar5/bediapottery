'use client'

import React from 'react'
import { Content } from '../ui'

export type MakeType = 'wheel' | 'handbuilding'

interface MakeTypeSelectorProps {
  selectedType: MakeType
  onTypeChange: (type: MakeType) => void
}

const descriptions: Record<MakeType, { title: string; body: string }> = {
  wheel: {
    title: 'Wheel Throwing',
    body: 'Have fun creating pottery on a spinning pottery wheel. Perfect for beginners who want to experience the joy of making clay on the wheel.',
  },
  handbuilding: {
    title: 'Handbuilding',
    body: 'Create pottery using just your hands, without a wheel. Perfect for beginners who enjoy making unique, creative shapes with clay.',
  },
}

const MakeTypeSelector: React.FC<MakeTypeSelectorProps> = ({
  selectedType,
  onTypeChange,
}) => {
  return (
    <div className="space-y-4">
      <div className=" border border-gray-200 bg-white p-4">
        <div className="text-sm font-semibold text-gray-900 mb-3">
          Choose Your Make Type
        </div>
        <div className="grid grid-cols-2 gap-3">
          {(['wheel', 'handbuilding'] as MakeType[]).map((type) => {
            const active = selectedType === type
            return (
              <button
                key={type}
                type="button"
                onClick={() => onTypeChange(type)}
                className={` border px-4 py-3 text-sm font-medium transition-colors ${
                  active
                    ? 'border-primary bg-primary text-white'
                    : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                }`}
              >
                {type === 'wheel' ? 'Wheel Throwing': 'Handbuilding'}
              </button>
            )
          })}
        </div>
          <Content className="mt-3 text-sm text-gray-600">
          {descriptions[selectedType].body}
        </Content>
      </div>

      
    </div>
  )
}

export default MakeTypeSelector
