import { IPage } from '../shared/types/router.ts'
import { FC } from 'react'
import { useQuery } from '@apollo/client'
import { GET_PRODUCTS } from '../graphql/queries.ts'

export const MainPage: FC<IPage> = () => {
  const { loading, error, data } = useQuery(GET_PRODUCTS);

  if (loading) {
    return <h1>LOADING</h1>
  }

  if (error) {
    return <h1>ERROR</h1>
  }

  return (
    <div>
      <h1>

        {JSON.stringify(data.products)}

        Main page
      </h1>
    </div>
  )
}