import { create } from 'zustand';

type State = {
    data: string
}

export type T_SampleActions = {
    setData: (val: State['data']) => void
}

export const useSampleStore = create<State & T_SampleActions>(set => ({
    data: null,
    setData: (val) => set({ data: val }),
})); 