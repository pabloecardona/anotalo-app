// Componente reutilizable que cuenta con un botón con un label editable, que al presionarse muestra
// el children y un botón con un label editable que al presionarse oculta el children.
// Para ocultar el children utiliza la clase css 'display' con un valor 'none'

import { useState } from 'react'

export default function Togglable ({ children, showButtonLabel, hideButtonLabel }) {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' } // lo que queremos ocultar cuando visible sea true
  const showWhenVisible = { display: visible ? '' : 'none' } // lo que queremos mostrar cuando visible sea true

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={() => setVisible(true)}>{showButtonLabel}</button>
      </div>

      <div style={showWhenVisible}>
        {children}
        <button onClick={() => setVisible(false)}>{hideButtonLabel}</button>
      </div>
    </div>
  )
}
