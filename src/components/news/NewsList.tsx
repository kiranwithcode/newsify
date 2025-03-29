// 'use client';

// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { AppDispatch, RootState } from '@/lib/store';
// import { fetchNewsData, setFilters } from '@/lib/features/newsSlice';

// export default function NewsList() {
//   const dispatch = useDispatch<AppDispatch>();
//   const { items, filteredItems, filters, loading, error } = useSelector((state: RootState) => state.news);

//   useEffect(() => {
//     dispatch(fetchNewsData());
//   }, [dispatch]);

//   const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     dispatch(setFilters({ [name]: value }));
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4 rounded-lg">
//         <div className="flex">
//           <div className="flex-shrink-0">
//             <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
//               <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//             </svg>
//           </div>
//           <div className="ml-3">
//             <p className="text-sm text-red-700">{error}</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-8">
//       {/* Filters Section */}
//       <div className="bg-white shadow rounded-lg p-6">
//         <h2 className="text-lg font-semibold mb-4">Filter Articles</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {/* Search Filter */}
//           <div>
//             <label htmlFor="searchQuery" className="block text-sm font-medium text-gray-700 mb-2">Search</label>
//             <input
//               type="text"
//               name="searchQuery"
//               id="searchQuery"
//               value={filters.searchQuery}
//               onChange={handleFilterChange}
//               className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
//               placeholder="Search articles..."
//             />
//           </div>

//           {/* Author Filter */}
//           <div>
//             <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">Author</label>
//             <input
//               type="text"
//               name="author"
//               id="author"
//               value={filters.author}
//               onChange={handleFilterChange}
//               className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
//               placeholder="Filter by author..."
//             />
//           </div>

//           {/* Type Filter */}
//           <div>
//             <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">Type</label>
//             <select
//               name="type"
//               id="type"
//               value={filters.type}
//               onChange={handleFilterChange}
//               className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
//             >
//               <option value="all">All Types</option>
//               <option value="article">Articles</option>
//               <option value="blog">Blogs</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* Articles Section */}
//       <div className="bg-white shadow rounded-lg overflow-hidden p-6 space-y-4">
//         <h2 className="text-lg font-semibold">Articles</h2>
//         <div className="divide-y divide-gray-200">
//           {filteredItems.length === 0 ? (
//             <div className="text-center text-gray-500">No articles found matching your filters</div>
//           ) : (
//             filteredItems.map((item) => (
//               <div key={item.id} className="py-4 hover:bg-gray-50">
//                 <div className="flex justify-between">
//                   <h3 className="text-lg font-medium text-gray-900">{item.title}</h3>
//                   <span className={`px-3 py-1 text-xs rounded-full ${item.type === 'article'
//                       ? 'bg-blue-100 text-blue-800'
//                       : 'bg-green-100 text-green-800'
//                     }`}>
//                     {item.type}
//                   </span>
//                 </div>
//                 <div className="mt-2 flex items-center text-sm text-gray-500">
//                   <span>{item.author}</span>
//                   <span className="mx-2">•</span>
//                   <span>{new Date(item.publishedAt).toLocaleDateString()}</span>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>

//     </div>
//   );
// }
