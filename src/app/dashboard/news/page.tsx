'use client';
import { data } from '@/data';
import { fetchNews } from '@/lib/features/newsSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { useEffect, useState } from 'react';

const NewsPage = () => {
  const dispatch = useAppDispatch();
  const { articles, loading, error } = useAppSelector((state) => state.news);

  const [filters, setFilters] = useState({
    searchQuery: '',
    dateFrom: '',
    dateTo: '',
    type: 'all',
  });

  const [author, setAuthor] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(filters.searchQuery);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(filters.searchQuery);
    }, 1000);

    return () => clearTimeout(handler);
  }, [filters.searchQuery]);

  useEffect(() => {
    dispatch(fetchNews({ ...filters, searchQuery: debouncedSearchQuery }));
  }, [dispatch, filters, debouncedSearchQuery]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'author') {
      setAuthor(value);
    } else {
      setFilters((prev) => ({ ...prev, [name]: value }));
    }
  };

  const displayData = articles?.length > 0 ? articles : data?.articles || [];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">News Dashboard</h1>

      {/* Filters Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
        <input
          name="searchQuery"
          placeholder="Search by keyword"
          value={filters.searchQuery}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          name="author"
          placeholder="Author"
          value={author}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          name="dateFrom"
          type="date"
          value={filters.dateFrom}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          name="dateTo"
          type="date"
          value={filters.dateTo}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <select
          name="type"
          value={filters.type}
          onChange={handleChange}
          className="p-2 border rounded"
        >
          <option value="all">All</option>
          <option value="news">News</option>
          <option value="blogs">Blogs</option>
        </select>
      </div>

      {loading && <p className="text-blue-500">Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayData
          ?.filter((article: any) =>
            author ? article.author?.toLowerCase().includes(author.toLowerCase()) : true
          )
          .map((article: any, index: any) => (
            <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
              {article.urlToImage && (
                <img
                  src={article.urlToImage}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {new Date(article.publishedAt).toLocaleDateString()}
                  </span>
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      article.type === 'blogs'
                        ? 'bg-blue-100 text-blue-500'
                        : 'bg-green-100 text-green-500'
                    }`}
                  >
                    {article.type === 'blogs' ? 'Blog' : 'News'}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mt-2">{article.title}</h3>
                <p className="text-gray-600 mt-2 line-clamp-3">{article.description}</p>
                <p className="text-sm mt-2 text-gray-500">By: {article.author || 'Unknown'}</p>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block text-blue-600 font-semibold"
                >
                  Read More →
                </a>
              </div>
            </div>
          ))}
      </div>

      {/* No Data Message */}
      {!loading && !error && displayData.length === 0 && (
        <p className="text-gray-500">No articles available at the moment.</p>
      )}
    </div>
  );
};

export default NewsPage;
