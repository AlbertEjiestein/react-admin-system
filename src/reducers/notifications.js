import actionsType from '../actions/actionTypes'

const initState = {
  isLoading: false,
  list: [{
    id: 1,
    title: 'Ant Design Title 1',
    desc: 'Abstract—With the increasing amount of data in the marine environment and the user’s affluent requirements for visualization, traditional CPU-based visualization is becoming more and more difficult to complete specific tasks. ',
    hasRead: true  
  },{
    id: 2,
    title: 'Ant Design Title 2',
    desc: 'Abstract—With the increasing amount of data in the marine environment and the user’s affluent requirements for visualization, traditional CPU-based visualization is becoming more and more difficult to complete specific tasks. ',
    hasRead: false
  }]
}


export default (state=initState, action) => {
  switch (action.type){
    case actionsType.RECEIVED_NOTIFICATIONS:
      return {
        ...state,
        list: action.payload.list
      }
    case actionsType.START_NOTIFICATION_POST:
      return {
        ...state,
        isLoading: true
      }
    case actionsType.FINISH_NOTIFICATION_POST:
      return {
        ...state,
        isLoading: false
      }
    case actionsType.MARK_NOTIFICATION_AS_READ_BY_ID:
      const newList = state.list.map(item => {
        if(item.id === action.payload.id){
          item.hasRead = true
        }
        return item
      })
      return {
        ...state,
        list: newList
      }
    case actionsType.MARK_ALL_NOTIFICATIONS_AS_READ:
      return {
        ...state,
        list: state.list.map(item => {
          item.hasRead = true
          return item
        })
      }
    default:
      return state
  }
}