import * as Scrivito from 'scrivito'
import { PersonCardWidget } from './PersonCardWidgetClass'
import { Person } from '../../Objs/Person/PersonObjClass'

Scrivito.provideComponent(PersonCardWidget, ({ widget }) => {
  const person: InstanceType<typeof Person> | unknown = widget.get('person')
  if (!(person instanceof Person)) {
    if (Scrivito.isInPlaceEditingActive()) {
      return (
        <div className="alert alert-warning d-flex m-auto">
          <i className="bi bi-exclamation-circle bi-2x" aria-hidden="true"></i>
          <div className="my-auto mx-2">
            Please select a person in the widget properties.
          </div>
        </div>
      )
    }

    return null
  }

  return (
    <Scrivito.WidgetTag className="card mb-2 bg-secondary max-width-350">
      <Scrivito.InPlaceEditingOff>
        <div className="card-body p-3">
          <div className="row">
            <div className="col-3">
              <Scrivito.ImageTag
                content={person}
                attribute="image"
                className="editor-img"
              />
            </div>
            <div className="col-9">
              <Scrivito.ContentTag
                content={person}
                attribute="name"
                className="h5 text-break"
              />
              <Scrivito.ContentTag
                content={person}
                attribute="jobTitle"
                className="text-bold opacity-60 text-extra-small text-uppercase"
              />
              <table className="table-extra-small">
                <tbody>
                  <tr>
                    <th className="align-top">Tel:</th>
                    <td>
                      <a href={`tel:${person.get('telephone')}`}>
                        <Scrivito.ContentTag
                          content={person}
                          attribute="telephone"
                          className="text-break"
                        />
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <th className="align-top">Fax:</th>
                    <td>
                      <a href={`tel:${person.get('fax')}`}>
                        <Scrivito.ContentTag content={person} attribute="fax" className="text-break"/>
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <th className="align-top">eMail:</th>
                    <td>
                      <a href={`mailto:${person.get('email')}`}>
                        <Scrivito.ContentTag
                          content={person}
                          attribute="email"
                          className="text-break"
                        />
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Scrivito.InPlaceEditingOff>
    </Scrivito.WidgetTag>
  )
})
