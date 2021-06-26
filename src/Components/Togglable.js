// Componente reutilizable que cuenta con un botón con un label editable, que al presionarse muestra
// el children y un botón con un label editable que al presionarse oculta el children.
// Para ocultar el children utiliza la clase css 'display' con un valor 'none'

import { forwardRef, useImperativeHandle, useState } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef(({ children, showButtonLabel = 'Show', hideButtonLabel = 'Hide' }, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' } // lo que queremos ocultar cuando visible sea true
  const showWhenVisible = { display: visible ? '' : 'none' } // lo que queremos mostrar cuando visible sea true

  const toggleVisibility = () => setVisible(!visible) // método para cambiar la visibilidad cada vez que se lo llame

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{showButtonLabel}</button>
      </div>

      <div style={showWhenVisible}>
        {children}
        <button onClick={toggleVisibility}>{hideButtonLabel}</button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  showButtonLabel: PropTypes.string,
  hideButtonLabel: PropTypes.string
}

export default Togglable
