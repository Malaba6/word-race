import HomePage from '../common/components/pages/home'
import {AppBarLayout} from '../layout/AppBarLayout'

export default function Home() {
  // console.log('*** ', cookies)
  return <HomePage />
}

// export async function getServerSideProps (ctx) {
//   const {req, res} = ctx
//   // const { cookies } = res
//   console.log('****** ',  res?.cookies)
//   return {
//     props: { }
//   }
// } 

Home.Layout = AppBarLayout
