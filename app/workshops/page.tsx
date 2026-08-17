import { redirect } from 'next/navigation'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pottery Workshops - Bedia Pottery',
  description: 'Explore our wide range of pottery workshops and classes. From beginners to advanced, we have something for everyone.',
}

export default function WorkshopsPage() {
  // Redirect to the home page immediately
  redirect('/')
}