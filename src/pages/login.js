import {Login} from "../common/components/auth/login";

export default function LoginPage (props) {
  return <Login {...props} />
}

// export async function getServerSideProps (ctx) {
//   const {req, res} = ctx
//   console.log('****** ',  req?.headers?.host)
//   return {
//     props: {}
//   }
// } 
