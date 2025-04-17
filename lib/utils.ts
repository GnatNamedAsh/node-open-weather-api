import fs from 'node:fs'
import { type Express } from 'express'

export const getEnvVar = (name: string) => {
  const envVar = process.env[name]
  if (!envVar) {
    throw new Error(`Environment variable ${name} is not set`)
  }
  return envVar
}

// Alright, so here's the plan
// 1. We're going to traverse the `/routes` file directory
// 2. We'll look for `handlers` and another sub-directory
// 2a. If we find a `handlers.ts` file, we'll see if it exports a `get` and `post` file
// 2b. If we have another sub-directory, recursively go into it
// 3. repeat step 2 until we do not find anymore sub-directories
export const registerRoutes = (app: Express, path: string) => {
  
}
