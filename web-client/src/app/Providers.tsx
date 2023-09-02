import { FC, ReactNode, StrictMode } from 'react'
import { ApolloProvider } from '@apollo/client'
import { client } from './apollo-client.ts'
import { NextUIProvider } from '@nextui-org/react'

interface Props {
  children: ReactNode
}

export const Providers: FC<Props> = ({ children }) => {
  return (
    <StrictMode>
      <ApolloProvider client={client}>
        <NextUIProvider>

          { children }

        </NextUIProvider>
      </ApolloProvider>
    </StrictMode>
  )
}