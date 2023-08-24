import { Fragment } from 'react'
import {
  provideComponent,
  WidgetTag,
  connect,
  Obj,
  LinkTag,
  ImageTag,
  isInPlaceEditingActive,
} from 'scrivito'
import { AddressWidget } from './AddressWidgetClass'
import { Homepage } from '../../Objs/Homepage/HomepageObjClass'

provideComponent(AddressWidget, ({ widget }) => (
  <WidgetTag>
    {widget.get('showLogo') && <Logo />}
    <address>
      <Address addressWidget={widget} />
      <Table
        phone={widget.get('phone')}
        fax={widget.get('fax')}
        email={widget.get('email')}
      />
    </address>
  </WidgetTag>
))

const Logo = connect(() => {
  const root: unknown = Obj.root()
  if (!(root instanceof Homepage)) return null

  const logo = root.get('siteLogoDark')
  if (!logo) return null

  return (
    <div className="mb-2">
      <LinkTag to={root} className="navbar-brand" aria-label="Logo">
        <ImageTag content={logo} className="navbar-brand-logo" alt="Logo" />
      </LinkTag>
    </div>
  )
})

const Address = connect(
  ({
    addressWidget,
  }: {
    addressWidget: InstanceType<typeof AddressWidget>
  }) => {
    let localityRegionPostalCode: string[]

    if (addressWidget.get('addressFormat') === 'GER') {
      localityRegionPostalCode = [
        addressWidget.get('locationPostalCode'),
        addressWidget.get('locationLocality'),
        addressWidget.get('locationRegion'),
      ]
    } else {
      localityRegionPostalCode = [
        addressWidget.get('locationLocality'),
        addressWidget.get('locationRegion'),
        addressWidget.get('locationPostalCode'),
      ]
    }

    const lines = [
      addressWidget.get('locationName'),
      addressWidget.get('locationStreetAddress'),
      localityRegionPostalCode.filter((n) => n).join(' '),
      addressWidget.get('locationCountry'),
    ].filter((n) => n)

    if (!lines.length) {
      if (isInPlaceEditingActive()) {
        return <>Provide the location in the address widget properties.</>
      }

      return null
    }

    return (
      <p>
        {lines.map((line, index) => (
          <Fragment key={index}>
            {line}
            <br />
          </Fragment>
        ))}
      </p>
    )
  },
)

function Table({
  phone,
  fax,
  email,
}: {
  phone: string
  fax: string
  email: string
}) {
  const lines: ['phone' | 'fax' | 'email', string][] = []

  if (phone) lines.push(['phone', phone])
  if (fax) lines.push(['fax', fax])
  if (email) lines.push(['email', email])

  if (!lines.length) return null

  return (
    <table>
      <tbody>
        {lines.map(([name, value]) => (
          <tr key={name}>
            <td>{`${LOCALIZATION[name]}: `}</td>
            <td className="text-break">
              <a href={`${LINK_PREFIXES[name]}:${value}`}>{value}</a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

const LOCALIZATION = {
  phone: 'Phone',
  fax: 'Fax',
  email: 'Email',
}

const LINK_PREFIXES = {
  phone: 'tel',
  fax: 'tel',
  email: 'mailto',
}
