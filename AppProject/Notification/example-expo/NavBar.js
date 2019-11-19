/* eslint jsx-a11y/accessible-emoji: 0 */
import React from 'react'
import { Text, Platform } from 'react-native'
import NavBar, { NavTitle, NavButton } from 'react-native-nav'

export default function NavBarCustom() {
  if (Platform.OS === 'web') {
    return null
  }
  return (
    <NavBar>
      <NavButton />
      <NavTitle>
        💬 ChatRoom{'\n'}
      </NavTitle>
      <NavButton />
    </NavBar>
  )
}
