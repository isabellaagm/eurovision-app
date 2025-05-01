// src/components/dashboard/ProjectsByStatusChart.tsx
'use client'

import React from 'react'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts'

interface DataItem {
  name: string
  value: number
}

interface Props {
  data: DataItem[]
}

export default function ProjectsByStatusChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" name="Projetos" />
      </BarChart>
    </ResponsiveContainer>
  )
}
