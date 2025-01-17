import { action } from 'mobx'
import React, { useEffect, useMemo } from 'react'

import { generateScreenId } from '../utils'
import {
  ScreenInstanceInfoProvider,
  ScreenInstanceOptionsProvider,
} from './contexts'
import { ScreenComponentProps } from './ScreenComponentProps'
import store, { NavbarOptions } from './store'

interface Props {
  /**
   * 해당 스크린의 URL Path
   */
  path: string

  /**
   * 해당 스크린에 표시할 컴포넌트
   */
  component?: React.ComponentType<ScreenComponentProps>
}
const Screen: React.FC<Props> = (props) => {
  const Component = props.component

  const id = useMemo(() => generateScreenId(), [])

  useEffect(() => {
    if (!props.children && !props.component) {
      console.warn('component props, children 중 하나는 반드시 필요합니다')
      return
    }

    store.screens.set(id, {
      id,
      path: props.path,
      Component: ({ screenInstanceId, isTop, isRoot, as }) => {
        /**
         * ScreenContext를 통해 유저가 navbar를 바꿀때마다
         * 실제 ScreenInstance의 navbar를 변경
         */
        const setNavbar = action((navbar: NavbarOptions) => {
          store.screenInstanceOptions.set(screenInstanceId, {
            navbar,
          })
        })

        return (
          <ScreenInstanceInfoProvider
            value={{
              screenInstanceId,
              as,
              path: props.path,
            }}
          >
            <ScreenInstanceOptionsProvider
              value={{
                setNavbar,
              }}
            >
              {Component ? (
                <Component isTop={isTop} isRoot={isRoot} />
              ) : (
                props.children
              )}
            </ScreenInstanceOptionsProvider>
          </ScreenInstanceInfoProvider>
        )
      },
    })
  }, [])

  return null
}

export default Screen
