export const getEnvVar = (name: string) => {
  const envVar = process.env[name]
  if (!envVar) {
    throw new Error(`Environment variable ${name} is not set`)
  }
  return envVar
}