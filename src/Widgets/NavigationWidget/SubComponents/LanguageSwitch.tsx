import { NavDropdown } from 'react-bootstrap'
import { connect } from 'scrivito'

export const LanguageSwitch = connect(function LanguageSwitch() {
  return (
    <NavDropdown
      title={
        <>
          <i className="bi bi-flag-en" aria-label="Language English"></i>
          <span className="hidden-md hidden-lg">English</span>
        </>
      }
    >
      <NavDropdown.Item active>
        <i className="bi bi-flag-en" aria-hidden="true"></i>English
      </NavDropdown.Item>
      <NavDropdown.Item>
        <i className="bi bi-flag-de" aria-hidden="true"></i>German
      </NavDropdown.Item>
    </NavDropdown>
  )
})
