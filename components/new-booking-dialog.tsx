'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Plus } from 'lucide-react'

export function NewBookingDialog({ onAddBooking }: { onAddBooking: (booking: any) => void }) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    customer: {
      name: '',
      phone: '',
      email: '',
      address: ''
    },
    package: {
      name: '',
      price: 0,
      duration: 60
    },
    pets: [
      { name: '', breed: '', size: 'Medium', age: '' }
    ],
    notes: '',
    status: 'awaiting',
    scheduledTime: null
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAddBooking(formData)
    setOpen(false)
    // Reset form
    setFormData({
      customer: { name: '', phone: '', email: '', address: '' },
      package: { name: '', price: 0, duration: 60 },
      pets: [{ name: '', breed: '', size: 'Medium', age: '' }],
      notes: '',
      status: 'awaiting',
      scheduledTime: null
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Booking
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Booking</DialogTitle>
          <DialogDescription>
            Enter the customer and pet details for the new appointment.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="space-y-4">
            <h3 className="font-medium">Customer Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input 
                  id="name" 
                  required
                  value={formData.customer.name}
                  onChange={(e) => setFormData({...formData, customer: {...formData.customer, name: e.target.value}})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input 
                  id="phone" 
                  required
                  value={formData.customer.phone}
                  onChange={(e) => setFormData({...formData, customer: {...formData.customer, phone: e.target.value}})}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email"
                value={formData.customer.email}
                onChange={(e) => setFormData({...formData, customer: {...formData.customer, email: e.target.value}})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input 
                id="address" 
                required
                value={formData.customer.address}
                onChange={(e) => setFormData({...formData, customer: {...formData.customer, address: e.target.value}})}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Pet Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="petName">Pet Name</Label>
                <Input 
                  id="petName" 
                  required
                  value={formData.pets[0].name}
                  onChange={(e) => {
                    const newPets = [...formData.pets]
                    newPets[0].name = e.target.value
                    setFormData({...formData, pets: newPets})
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="breed">Breed</Label>
                <Input 
                  id="breed" 
                  required
                  value={formData.pets[0].breed}
                  onChange={(e) => {
                    const newPets = [...formData.pets]
                    newPets[0].breed = e.target.value
                    setFormData({...formData, pets: newPets})
                  }}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="size">Size</Label>
                <Select 
                  value={formData.pets[0].size}
                  onValueChange={(value) => {
                    const newPets = [...formData.pets]
                    newPets[0].size = value
                    setFormData({...formData, pets: newPets})
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Small">Small</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Large">Large</SelectItem>
                    <SelectItem value="X-Large">X-Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input 
                  id="age" 
                  value={formData.pets[0].age}
                  onChange={(e) => {
                    const newPets = [...formData.pets]
                    newPets[0].age = e.target.value
                    setFormData({...formData, pets: newPets})
                  }}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Service Details</h3>
            <div className="space-y-2">
              <Label htmlFor="package">Package</Label>
              <Select 
                onValueChange={(value) => {
                  const pkg = value === 'premium' 
                    ? { name: 'Premium Grooming', price: 85, duration: 90 }
                    : { name: 'Basic Bath & Trim', price: 55, duration: 60 }
                  setFormData({...formData, package: pkg})
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select package" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">Basic Bath & Trim ($55)</SelectItem>
                  <SelectItem value="premium">Premium Grooming ($85)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea 
                id="notes" 
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="submit">Create Booking</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
