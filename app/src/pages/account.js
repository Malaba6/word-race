import Link from 'next/link'
import {AppBarLayout} from '../layout/AppBarLayout'

export default function Account() {
  return <div>
    <p>This is the Account Page</p>
    <p>
      <Link href='/profile'>
        <a  href='/profile'>Go: Profile</a>
      </Link>
    </p>
  </div>
}

Account.Layout = AppBarLayout
