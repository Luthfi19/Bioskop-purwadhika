const INITIAL_STATE = {id : 0 , username : '' , password : '' , IS_ADMIN : false, cart : []}

export default (state = INITIAL_STATE , action) => {
    if(action.type === 'LOGIN_SUCCESS'){
        return action.payload
    }else if(action.type === 'LOG_OUT'){
        return INITIAL_STATE
    }else if( action.type === 'ADMIN_SUCCESS'){
        return {...state, id:action.payload.id ,isAdmin : true, username : action.payload.username, password : action.payload.password}
    }
    else{
        return state
    }
}