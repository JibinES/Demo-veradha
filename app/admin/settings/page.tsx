'use client'

import { useState } from 'react'
import { Save, Key, Store, Bell, CreditCard } from 'lucide-react'
import { useAdminStore } from '@/store/useAdminStore'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

export default function SettingsPage() {
  const { adminPassword } = useAdminStore()
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match!')
      return
    }
    if (newPassword.length < 6) {
      setMessage('Password must be at least 6 characters!')
      return
    }

    // Note: In a real app, this would update the password in the backend
    setMessage('Password updated successfully! (Demo mode - not actually saved)')
    setNewPassword('')
    setConfirmPassword('')

    setTimeout(() => setMessage(''), 3000)
  }

  const settingsSections = [
    {
      title: 'Store Information',
      icon: Store,
      description: 'Manage your store details and branding',
      fields: [
        { label: 'Store Name', value: 'Verde Fashion', type: 'text' },
        { label: 'Store Email', value: 'contact@verdefashion.com', type: 'email' },
        { label: 'Store Phone', value: '+91 98765 43210', type: 'tel' },
        { label: 'Store Address', value: 'Mumbai, Maharashtra, India', type: 'text' },
      ]
    },
    {
      title: 'Notifications',
      icon: Bell,
      description: 'Configure email and push notifications',
      fields: [
        { label: 'Order Notifications', value: 'Enabled', type: 'checkbox' },
        { label: 'Low Stock Alerts', value: 'Enabled', type: 'checkbox' },
        { label: 'Customer Reviews', value: 'Enabled', type: 'checkbox' },
      ]
    },
    {
      title: 'Payment Settings',
      icon: CreditCard,
      description: 'Manage payment methods and gateways',
      fields: [
        { label: 'Payment Gateway', value: 'Razorpay (Demo Mode)', type: 'select' },
        { label: 'Currency', value: 'INR (₹)', type: 'select' },
        { label: 'Tax Rate', value: '18%', type: 'text' },
      ]
    },
  ]

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">Manage your store settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Settings */}
        <div className="lg:col-span-2 space-y-6">
          {settingsSections.map((section) => {
            const Icon = section.icon
            return (
              <div key={section.title} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-verde-100 rounded-lg flex items-center justify-center">
                    <Icon className="w-5 h-5 text-verde-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">{section.title}</h2>
                    <p className="text-sm text-gray-600">{section.description}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {section.fields.map((field, index) => (
                    <div key={index}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {field.label}
                      </label>
                      {field.type === 'checkbox' ? (
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            defaultChecked={field.value === 'Enabled'}
                            className="w-4 h-4 text-verde-600 rounded focus:ring-verde-500"
                          />
                          <span className="ml-2 text-sm text-gray-600">{field.value}</span>
                        </div>
                      ) : field.type === 'select' ? (
                        <select className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-verde-500">
                          <option>{field.value}</option>
                        </select>
                      ) : (
                        <Input
                          type={field.type}
                          defaultValue={field.value}
                          readOnly
                        />
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex justify-end">
                  <Button variant="outline" size="sm">
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Sidebar - Security */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <Key className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">Security</h2>
                <p className="text-sm text-gray-600">Change admin password</p>
              </div>
            </div>

            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Password
                </label>
                <Input
                  type="text"
                  value={adminPassword}
                  readOnly
                  className="bg-gray-50"
                />
                <p className="text-xs text-gray-500 mt-1">Current: {adminPassword}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                </label>
                <Input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                />
              </div>

              {message && (
                <div className={`p-3 rounded-md text-sm ${
                  message.includes('successfully')
                    ? 'bg-green-50 text-green-700'
                    : 'bg-red-50 text-red-700'
                }`}>
                  {message}
                </div>
              )}

              <Button type="submit" variant="primary" fullWidth>
                Update Password
              </Button>
            </form>

            <div className="mt-6 p-4 bg-yellow-50 rounded-md">
              <p className="text-xs text-yellow-800">
                <strong>Note:</strong> This is demo mode. Password changes are simulated and not persisted.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
