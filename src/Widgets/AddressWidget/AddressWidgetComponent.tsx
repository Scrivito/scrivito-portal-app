import { Fragment } from 'react'
import {
  provideComponent,
  WidgetTag,
  connect,
  Obj,
  ImageTag,
  isInPlaceEditingActive,
  ContentTag,
} from 'scrivito'
import { AddressWidget, AddressWidgetInstance } from './AddressWidgetClass'
import { Homepage } from '../../Objs/Homepage/HomepageObjClass'
import { alternativeTextForObj } from '../../utils/alternativeTextForObj'

provideComponent(AddressWidget, ({ widget }) => (
  <WidgetTag>
    {widget.get('showLogo') && <Logo />}
    <address>
      <Address addressWidget={widget} />
      <Table widget={widget} />
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
      <ImageTag
        content={logo}
        className="navbar-brand-logo"
        alt={alternativeTextForObj(logo)}
      />
    </div>
  )
})

const Address = connect(
  ({ addressWidget }: { addressWidget: AddressWidgetInstance }) => {
    const postalCodeLocalityRegion = [
      addressWidget.get('locationPostalCode'),
      addressWidget.get('locationLocality'),
      addressWidget.get('locationRegion'),
    ]

    const lines = [
      addressWidget.get('locationName'),
      addressWidget.get('locationStreetAddress'),
      postalCodeLocalityRegion.filter((n) => n).join(' '),
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

const Table = connect(function Table({
  widget,
}: {
  widget: AddressWidgetInstance
}) {
  const phone = widget.get('phone')
  const fax = widget.get('fax')
  const email = widget.get('email')

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
            <td>
              <ContentTag
                tag="span"
                content={widget}
                attribute={`${name}Label`}
              />
              :{' '}
            </td>
            <td className="text-break">
              <ContentTag
                tag="a"
                content={widget}
                attribute={name}
                href={`${LINK_PREFIXES[name]}:${value}`}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
})

const LINK_PREFIXES = {
  phone: 'tel',
  fax: 'tel',
  email: 'mailto',
}
