import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchFilteredNews, NewsArticle, NewsFilters } from '../api/news';

interface NewsState {
  articles: NewsArticle[];
  loading: boolean;
  error: string | null;
}

const initialState: NewsState = {
  articles: [],
  loading: false,
  error: null,
};

// Async Thunk to fetch news
export const fetchNews = createAsyncThunk(
  'news/fetchNews',
  async (filters: NewsFilters, { rejectWithValue }) => {
    try {
      return await fetchFilteredNews(filters);
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch news');
    }
  }
);

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default newsSlice.reducer;
