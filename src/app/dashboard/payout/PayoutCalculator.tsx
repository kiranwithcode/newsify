'use client';
import { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import Papa from 'papaparse';
import { gapi } from 'gapi-script';

const PayoutCalculator = () => {
  const [articlePayout, setArticlePayout] = useState<number>(() => Number(localStorage.getItem('articlePayout') || 0));
  const [blogPayout, setBlogPayout] = useState<number>(() => Number(localStorage.getItem('blogPayout') || 0));
  const [totalPayout, setTotalPayout] = useState<number>(0);

  useEffect(() => {
    const start = () => {
      gapi.client.init({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
        clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
        scope: 'https://www.googleapis.com/auth/spreadsheets',
      }).then(() => {
        console.log('GAPI initialized successfully');
      }).catch((error: any) => {
        console.error('GAPI initialization failed', error);
      });
    };
  
    gapi.load('client:auth2', start);
  }, []);
  

  useEffect(() => {
    calculateTotalPayout();
  }, [articlePayout, blogPayout]);
  
  const calculateTotalPayout = () => {
    const articles = Number(localStorage.getItem('articleCount')) || 0;
    const blogs = Number(localStorage.getItem('blogCount')) || 0;
    const total = articles * articlePayout + blogs * blogPayout;
    setTotalPayout(total);
  };

  const handlePayoutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const payoutValue = Math.max(0, Number(value));

    if (name === 'articlePayout') {
      setArticlePayout(payoutValue);
      localStorage.setItem('articlePayout', String(payoutValue));
    } else if (name === 'blogPayout') {
      setBlogPayout(payoutValue);
      localStorage.setItem('blogPayout', String(payoutValue));
    }
    calculateTotalPayout();
  };

  const exportToPDF = () => {
    const doc = new jsPDF('p', 'mm', 'a4');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.text('Payout Report', 105, 20, { align: 'center' });

    const currentDate = new Date().toLocaleDateString();
    doc.setFontSize(12);
    doc.text(`Generated on: ${currentDate}`, 10, 30);

    const tableData = [
      ['Metric', 'Value'],
      ['Article Payout', articlePayout.toFixed(2)],
      ['Blog Payout', blogPayout.toFixed(2)],
      ['Total Payout', totalPayout.toFixed(2)],
    ];

    let startY = 50;
    doc.setFontSize(14);
    doc.setTextColor(33, 37, 41);
    doc.setDrawColor(200, 200, 200);

    tableData.forEach(([key, value], index) => {
      const y = startY + index * 10;
      doc.rect(10, y - 5, 90, 10);
      doc.rect(100, y - 5, 90, 10);
      doc.text(key, 15, y);
      doc.text(value.toString(), 105, y);
    });

    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text('This is an auto-generated report.', 10, 140);
    doc.save('payout-report.pdf');
  };

  const exportToCSV = () => {
    const csvData = [
      ['Metric', 'Value'],
      ['Article Payout', articlePayout],
      ['Blog Payout', blogPayout],
      ['Total Payout', totalPayout.toFixed(2)],
    ];
    const csv = Papa.unparse(csvData);

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'payout-report.csv');
    link.click();
  };

  const exportToGoogleSheets = async () => {
    try {
      if (!gapi.auth2.getAuthInstance()) {
        console.error('Initializing Google Auth...');
        await gapi.auth2.init({
          clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        });
      }
  
      const authInstance = gapi.auth2.getAuthInstance();
      if (!authInstance.isSignedIn.get()) {
        await authInstance.signIn();
      }
  
      const spreadsheetId = process.env.NEXT_PUBLIC_GOOGLE_SPREADSHEET_ID;
      const values = [
        ['Metric', 'Value'],
        ['Article Payout', articlePayout],
        ['Blog Payout', blogPayout],
        ['Total Payout', totalPayout.toFixed(2)],
      ];
  
      const resource = { values };
  
      const response = await gapi.client.sheets.spreadsheets.values.append({
        spreadsheetId,
        range: 'Sheet1!A1',
        valueInputOption: 'RAW',
        resource,
      });
  
      console.log('Data exported to Google Sheets:', response);
      alert('Data exported to Google Sheets successfully!');
    } catch (error) {
      console.error('Error exporting to Google Sheets:', error);
      alert('Failed to export to Google Sheets.');
    }
  };
  

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Set Payout Rates</h2>
      <label className="block mb-4">
        Article Payout (₹ per article):
        <input
          type="number"
          name="articlePayout"
          value={articlePayout}
          onChange={handlePayoutChange}
          className="p-2 border rounded w-full"
        />
      </label>
      <label className="block mb-4">
        Blog Payout (₹ per blog):
        <input
          type="number"
          name="blogPayout"
          value={blogPayout}
          onChange={handlePayoutChange}
          className="p-2 border rounded w-full"
        />
      </label>
      <p className="text-xl font-bold mb-4">Total Payout: ₹{totalPayout.toFixed(2)}</p>

      <div className="space-x-4">
        <button onClick={exportToPDF} className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">
          Export to PDF
        </button>
        <button onClick={exportToCSV} className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer">
          Export to CSV
        </button>
        <button onClick={exportToGoogleSheets} className="bg-yellow-500 text-white px-4 py-2 rounded cursor-pointer">
          Export to Google Sheets
        </button>
      </div>
    </div>
  );
};

export default PayoutCalculator;
