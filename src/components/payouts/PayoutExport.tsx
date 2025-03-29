// src/components/payouts/PayoutExport.tsx
'use client'

import { useState } from 'react'
import { FiDownload, FiChevronDown } from 'react-icons/fi'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { jsPDF } from 'jspdf'
import 'jspdf-autotable'
import * as XLSX from 'xlsx'

export default function PayoutExport() {
  const [isOpen, setIsOpen] = useState(false)
  const { data } = useSelector((state: RootState) => state.payouts)

  const exportPDF = () => {
    const doc = new jsPDF()
    
    // Title
    doc.text('Payout Report', 14, 15)
    
    // Table
    doc.autoTable({
      head: [['Author', 'Articles', 'Blogs', 'Total Payout']],
      body: data.map(item => [
        item.author,
        item.articles.toString(),
        item.blogs.toString(),
        `$${item.total.toFixed(2)}`
      ]),
      startY: 20,
      styles: {
        cellPadding: 3,
        fontSize: 10,
        valign: 'middle',
        halign: 'center'
      },
      headStyles: {
        fillColor: [59, 130, 246],
        textColor: 255,
        fontStyle: 'bold'
      }
    })
    
    doc.save('payout-report.pdf')
    setIsOpen(false)
  }

  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data.map(item => ({
      Author: item.author,
      Articles: item.articles,
      Blogs: item.blogs,
      'Total Payout': `$${item.total.toFixed(2)}`
    })))
    
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Payout Report')
    XLSX.writeFile(workbook, 'payout-report.xlsx')
    setIsOpen(false)
  }

  const exportCSV = () => {
    const csvContent = [
      ['Author', 'Articles', 'Blogs', 'Total Payout'],
      ...data.map(item => [
        item.author,
        item.articles,
        item.blogs,
        `$${item.total.toFixed(2)}`
      ])
    ].map(e => e.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'payout-report.csv')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    setIsOpen(false)
  }

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          onClick={() => setIsOpen(!isOpen)}
        >
          <FiDownload className="mr-2 h-5 w-5" />
          Export
          <FiChevronDown className="ml-2 -mr-1 h-5 w-5" />
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
          <div className="py-1">
            <button
              onClick={exportPDF}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Export as PDF
            </button>
            <button
              onClick={exportExcel}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Export as Excel
            </button>
            <button
              onClick={exportCSV}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Export as CSV
            </button>
          </div>
        </div>
      )}
    </div>
  )
}