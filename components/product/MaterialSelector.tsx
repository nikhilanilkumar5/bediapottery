'use client'

import { WorkshopOption } from '@/services/workshop.service'
import React from 'react'


/**
 * MaterialSelector Component
 * Single Responsibility: Handle material type selection only
 * Interface Segregation: Only depends on MaterialOption interface
 */
interface MaterialSelectorProps {
  materials: WorkshopOption[]
  selectedMaterialId: string
  onMaterialSelect: (materialId: string) => void
  className?: string
}

const MaterialSelector: React.FC<MaterialSelectorProps> = ({
  materials,
  selectedMaterialId,
  onMaterialSelect,
  className = '',
}) => {
  if (materials.length === 0) {
    return null
  }

  return (
    <div className={`space-y-3  mb-6 ${className}`}>
    <div className="flex gap-3 w-full">
  {materials.map((material) => (
    <button
      key={material._id}
      onClick={() => onMaterialSelect(material._id)}
      className={`flex-1 px-6 2xl:py-5 py-4 font-medium transition-colors duration-200 ${
        selectedMaterialId === material._id
          ? 'bg-primary text-secondary-dark  '
        : 'bg-[#0D463D1A] text-primary  hover:bg-primary hover:text-secondary-dark'
      }`}
    >
      {material.title}
    </button>
  ))}
</div>
    </div>
  )
}

export default MaterialSelector
