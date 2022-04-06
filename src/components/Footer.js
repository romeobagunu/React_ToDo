import React from 'react'

export default function Footer() {
  return (
    <footer className="container p-5">
        <hr />
        <p className="py-3 text-muted">
        &copy; {new Date().getFullYear()} Romeo Bagunu All Rights Reserved</p>
    </footer>
  )
}
