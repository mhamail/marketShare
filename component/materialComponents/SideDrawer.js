import React from 'react'
import Link from 'next/link';
import {CaretRightOutlined} from '@ant-design/icons';
import { withRouter } from 'next/router'

const MaterialSideDrawer = ({router,link,name}) => {
    let isActive = (path) => {
         if (router.asPath == link) return "active"
        // else ""
      }
  return (
    <div>
    <Link href={link}>
          <a
            className={`list-group-item list-group-item-action ${isActive(link)}`}
            aria-current="true">
            <div className='d-flex justify-content-between'>
              <div>
                <span className='ms-3'>{name}</span>
              </div>
              <span><CaretRightOutlined /></span>
            </div>
          </a>
        </Link>
        </div>
  )
}

export default withRouter(MaterialSideDrawer)