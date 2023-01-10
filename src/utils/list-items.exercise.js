import {useQuery, useMutation, queryCache} from 'react-query'
import {client} from './api-client'
function useListItems(user) {
  const {data: listItems} = useQuery({
    queryKey: 'list-items',
    queryFn: () =>
      client('list-items', {token: user.token}).then(data => data.listItems),
  })
  return listItems ?? []
}

function useListItem(user, bookId) {
  const listItems = useListItems(user)
  return listItems.find(item => item.bookId === bookId) ?? null
}

function useUpdateListItem(user) {
  return useMutation(
    updates =>
      client(`list-items/${updates.id}`, {
        method: 'PUT',
        token: user.token,
        data: updates,
      }),
    {onSettled: () => queryCache.invalidateQueries('list-items')},
  )
}

export {useListItems, useListItem, useUpdateListItem}
