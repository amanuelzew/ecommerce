'use client'

import { PropsWithChildren, useMemo } from 'react'
import {
  UrqlProvider,
  ssrExchange,
  fetchExchange,
  createClient,
} from '@urql/next'

import { cacheExchange } from '@urql/exchange-graphcache'

import { getToken } from '@/utils/token'

export default function GQLProvider({ children }: PropsWithChildren) {
  const url = process.env.APP_URL ?? 'https://3000-idx-ecommerce-1741264807708.cluster-rcyheetymngt4qx5fpswua3ry4.cloudworkstations.dev/api/graphql'
  const [client, ssr] = useMemo(() => {
    const ssr = ssrExchange({
      isClient: typeof window !== 'undefined',
    })

    const client = createClient({
      url,
      exchanges: [cacheExchange({}), ssr, fetchExchange],
      fetchOptions: () => {
        const token = getToken()

        return token
          ? {
              headers: { authorization: `Bearer ${token}` },
            }
          : {}
      },
    })

    return [client, ssr]
  }, [])

  return (
    <UrqlProvider client={client} ssr={ssr}>
      {children}
    </UrqlProvider>
  )
}


