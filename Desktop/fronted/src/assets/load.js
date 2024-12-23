// export const loadView = (url) => import((`@/views/${url}.vue`))
export default (url) =>()=>require(`@/views/${url}.vue`)
