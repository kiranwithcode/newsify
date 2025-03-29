// src/lib/features/payoutSlice.ts
import { getFromLocalStorage, saveToLocalStorage } from '@/utils/storage'
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

interface PayoutItem {
  author: string
  articles: number
  blogs: number
  total: number
}

interface PayoutState {
  data: PayoutItem[]
  rates: {
    article: number
    blog: number
  }
  loading: boolean
  error: string | null
}

const initialState: PayoutState = {
  data: [],
  rates: getFromLocalStorage('payoutRates') || {
    article: 10,
    blog: 15
  },
  loading: false,
  error: null
}

export const fetchPayoutData = createAsyncThunk(
  'payouts/fetchData',
  async (_, { rejectWithValue }) => {
    try {
      // Simulate API call - in a real app, this would fetch from your backend
      await new Promise(resolve => setTimeout(resolve, 500))
      return [
        { author: 'John Doe', articles: 5, blogs: 2, total: 80 },
        { author: 'Jane Smith', articles: 3, blogs: 4, total: 90 },
        { author: 'Mike Johnson', articles: 7, blogs: 1, total: 85 }
      ]
    } catch (error) {
      return rejectWithValue('')
    }
  }
)

const payoutSlice = createSlice({
  name: 'payouts',
  initialState,
  reducers: {
    setRates(state, action: PayloadAction<{ article: number; blog: number }>) {
      state.rates = action.payload
      saveToLocalStorage('payoutRates', action.payload)
    },
    calculatePayouts(state) {
      state.data = state.data.map(item => ({
        ...item,
        total: (item.articles * state.rates.article) + (item.blogs * state.rates.blog)
      }))
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPayoutData.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchPayoutData.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload.map(item => ({
          ...item,
          total: (item.articles * state.rates.article) + (item.blogs * state.rates.blog)
        }))
      })
      .addCase(fetchPayoutData.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  }
})

export const { setRates, calculatePayouts } = payoutSlice.actions
export default payoutSlice.reducer