'use client';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from 'chart.js';
import { useEffect, useState } from 'react';
import { data as fallbackData } from '@/data';
import { useAppSelector } from '@/lib/hooks';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement);

export default function DashboardCharts() {
  const { articles, loading, error } = useAppSelector((state) => state.news);

  const finalArticles = articles.length > 0 ? articles : fallbackData.articles;

  const authorCounts = finalArticles.reduce((acc: Record<string, number>, article) => {
    acc[article.author as any] = (acc[article.author as any] || 0) + 1;
    return acc;
  }, {});

  const sourceCounts = finalArticles.reduce((acc: Record<string, number>, article) => {
    acc[article.source.name] = (acc[article.source.name] || 0) + 1;
    return acc;
  }, {});

  const dateCounts = finalArticles.reduce((acc: Record<string, number>, article) => {
    const date = article.publishedAt.split('T')[0]; 
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    setChartData({
      bar: {
        labels: Object.keys(authorCounts),
        datasets: [{ label: 'Articles per Author', data: Object.values(authorCounts), backgroundColor: 'rgba(54, 162, 235, 0.5)' }],
      },
      pie: {
        labels: Object.keys(sourceCounts),
        datasets: [{ label: 'Articles by Source', data: Object.values(sourceCounts), backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50'] }],
      },
      line: {
        labels: Object.keys(dateCounts),
        datasets: [{ label: 'Articles Over Time', data: Object.values(dateCounts), borderColor: '#42A5F5', fill: false }],
      },
    });
  }, [articles]); 

  if (loading) return <p>Loading Charts...</p>;
  if (!chartData) return <p>No Data Available</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-3">Articles per Author</h2>
        <Bar data={chartData.bar} />
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-3">Articles by Source</h2>
        <Pie data={chartData.pie} />
      </div>
      <div className="bg-white p-4 rounded shadow md:col-span-2">
        <h2 className="text-lg font-semibold mb-3">Article Trends Over Time</h2>
        <Line data={chartData.line} />
      </div>
    </div>
  );
}
