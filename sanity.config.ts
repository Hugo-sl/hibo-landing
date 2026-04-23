import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { table } from '@sanity/table'
import { schema } from './sanity/schema'

export default defineConfig({
  basePath: '/studio',
  projectId: 'zf5gduph',
  dataset: 'production',
  title: 'Hibo Studio',
  plugins: [structureTool(), visionTool(), table()],
  schema: {
    types: schema,
  },
})
