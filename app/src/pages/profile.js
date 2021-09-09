import Link from 'next/link'
import {AppBarLayout} from '../layout/AppBarLayout'

export default function Profile() {
  return <div style={{ marginTop: '5em', border: 'solid red thin', width: '100%'}}>
    <p>This is the prifile Page</p>
    <p>
      <Link href='/account'>
        <a href='/account'>Go: Account</a>
      </Link>
    </p>
  </div>
}

Profile.Layout = AppBarLayout
