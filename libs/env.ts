export const ENV = (process.env["NEXT_PUBLIC_ENV"] || "prod") as "beta" | "prod";

export const isBeta = ENV == 'beta'
export const isProd = ENV == 'prod'