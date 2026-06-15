# ---- base ----
FROM node:22-alpine AS base
RUN corepack enable && corepack prepare pnpm@latest --activate

# ---- dependencies ----
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile

# ---- build ----
FROM base AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build

# ---- runner ----
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./
COPY --from=build /app/vite.config.ts ./
EXPOSE 3000
CMD ["pnpm", "start"]
