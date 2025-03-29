import axios from 'axios';

const apiKey = 'd522d2df90ca43d0b74bc7bac83d4433';
const BASE_URL = 'https://newsapi.org/v2/everything';

export interface NewsFilters {
  searchQuery?: string;
  author?: string;
  dateFrom?: string;
  dateTo?: string;
  type?: string;
  sortBy?: string;
  page?: number;
  pageSize?: number;
  language?: string;
}

export interface NewsArticle {
  source: {
    id: string | null;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

export const fetchFilteredNews = async (filters: NewsFilters): Promise<NewsArticle[]> => {
  const {
    searchQuery = '',
    author,
    dateFrom,
    dateTo,
    type,
    sortBy = 'publishedAt',
    page = 1,
    pageSize = 10,
    language = 'en',
  } = filters;

  // Construct Search Query
  let query = searchQuery ? encodeURIComponent(searchQuery) : 'article';
  
  // Advanced Search with Author, Type, and Boolean Operators
  if (author) query += ` AND author:${encodeURIComponent(author)}`;
  if (type && type !== 'all') query += ` AND ${encodeURIComponent(type)}`;

  const params: Record<string, any> = {
    apiKey,
    q: query,
    from: dateFrom || undefined,
    to: dateTo || undefined,
    language,
    sortBy,
    page,
    pageSize,
  };

  try {
    const response = await axios.get(BASE_URL, { params });
    return response.data.articles;
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
};
